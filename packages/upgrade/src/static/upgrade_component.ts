/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DoCheck, ElementRef, EventEmitter, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges, ɵlooseIdentical as looseIdentical} from '@angular/core';
import * as angular from '../common/angular1';
import {$SCOPE} from '../common/constants';
import {IBindingDestination, IControllerInstance, UpgradeHelper} from '../common/upgrade_helper';
import {isFunction} from '../common/util';

const NOT_SUPPORTED: any = 'NOT_SUPPORTED';
const INITIAL_VALUE = {
  __UNINITIALIZED__: true
};

class Bindings {
  twoWayBoundProperties: string[] = [];
  twoWayBoundLastValues: any[] = [];

  expressionBoundProperties: string[] = [];

  propertyToOutputMap: {[propName: string]: string} = {};
}

/**
 * @whatItDoes
 *
 * *Part of the [upgrade/static](api?query=upgrade%2Fstatic)
 * library for hybrid upgrade apps that support AoT compilation*
 *
 * Allows an AngularJS component to be used from Angular.
 *
 * @howToUse
 *
 * Let's assume that you have an AngularJS component called `ng1Hero` that needs
 * to be made available in Angular templates.
 *
 * {@example upgrade/static/ts/module.ts region="ng1-hero"}
 *
 * We must create a {@link Directive} that will make this AngularJS component
 * available inside Angular templates.
 *
 * {@example upgrade/static/ts/module.ts region="ng1-hero-wrapper"}
 *
 * In this example you can see that we must derive from the {@link UpgradeComponent}
 * base class but also provide an {@link Directive `@Directive`} decorator. This is
 * because the AoT compiler requires that this information is statically available at
 * compile time.
 *
 * Note that we must do the following:
 * * specify the directive's selector (`ng1-hero`)
 * * specify all inputs and outputs that the AngularJS component expects
 * * derive from `UpgradeComponent`
 * * call the base class from the constructor, passing
 *   * the AngularJS name of the component (`ng1Hero`)
 *   * the {@link ElementRef} and {@link Injector} for the component wrapper
 *
 * @description
 *
 * A helper class that should be used as a base class for creating Angular directives
 * that wrap AngularJS components that need to be "upgraded".
 *
 * @experimental
 */
export class UpgradeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  private helper: UpgradeHelper;

  private $injector: angular.IInjectorService;

  private element: Element;
  private $element: angular.IAugmentedJQuery;
  private $componentScope: angular.IScope;

  private directive: angular.IDirective;
  private bindings: Bindings;

  private controllerInstance: IControllerInstance;
  private bindingDestination: IBindingDestination;

  // We will be instantiating the controller in the `ngOnInit` hook, when the first `ngOnChanges`
  // will have been already triggered. We store the `SimpleChanges` and "play them back" later.
  private pendingChanges: SimpleChanges|null;

  private unregisterDoCheckWatcher: Function;

  /**
   * Create a new `UpgradeComponent` instance. You should not normally need to do this.
   * Instead you should derive a new class from this one and call the super constructor
   * from the base class.
   *
   * {@example upgrade/static/ts/module.ts region="ng1-hero-wrapper" }
   *
   * * The `name` parameter should be the name of the AngularJS directive.
   * * The `elementRef` and `injector` parameters should be acquired from Angular by dependency
   *   injection into the base class constructor.
   *
   * Note that we must manually implement lifecycle hooks that call through to the super class.
   * This is because, at the moment, the AoT compiler is not able to tell that the
   * `UpgradeComponent`
   * already implements them and so does not wire up calls to them at runtime.
   */
  constructor(private name: string, private elementRef: ElementRef, private injector: Injector) {
    this.helper = new UpgradeHelper(injector, name, elementRef);

    this.$injector = this.helper.$injector;

    this.element = this.helper.element;
    this.$element = this.helper.$element;

    this.directive = this.helper.directive;
    this.bindings = this.initializeBindings(this.directive);

    // We ask for the AngularJS scope from the Angular injector, since
    // we will put the new component scope onto the new injector for each component
    const $parentScope = injector.get($SCOPE);
    // QUESTION 1: Should we create an isolated scope if the scope is only true?
    // QUESTION 2: Should we make the scope accessible through `$element.scope()/isolateScope()`?
    this.$componentScope = $parentScope.$new(!!this.directive.scope);

    this.initializeOutputs();
  }

  ngOnInit() {
    // Collect contents, insert and compile template
    const attachChildNodes: angular.ILinkFn|undefined = this.helper.prepareTransclusion();
    const linkFn = this.helper.compileTemplate();

    // Instantiate controller
    const controllerType = this.directive.controller;
    const bindToController = this.directive.bindToController;
    if (controllerType) {
      this.controllerInstance = this.helper.buildController(controllerType, this.$componentScope);
    } else if (bindToController) {
      throw new Error(
          `Upgraded directive '${this.directive.name}' specifies 'bindToController' but no controller.`);
    }

    // Set up outputs
    this.bindingDestination = bindToController ? this.controllerInstance : this.$componentScope;
    this.bindOutputs();

    // Require other controllers
    const requiredControllers =
        this.helper.resolveAndBindRequiredControllers(this.controllerInstance);

    // Hook: $onChanges
    if (this.pendingChanges) {
      this.forwardChanges(this.pendingChanges);
      this.pendingChanges = null;
    }

    // Hook: $onInit
    if (this.controllerInstance && isFunction(this.controllerInstance.$onInit)) {
      this.controllerInstance.$onInit();
    }

    // Hook: $doCheck
    if (this.controllerInstance && isFunction(this.controllerInstance.$doCheck)) {
      const callDoCheck = () => this.controllerInstance.$doCheck !();

      this.unregisterDoCheckWatcher = this.$componentScope.$parent.$watch(callDoCheck);
      callDoCheck();
    }

    // Linking
    const link = this.directive.link;
    const preLink = (typeof link == 'object') && (link as angular.IDirectivePrePost).pre;
    const postLink = (typeof link == 'object') ? (link as angular.IDirectivePrePost).post : link;
    const attrs: angular.IAttributes = NOT_SUPPORTED;
    const transcludeFn: angular.ITranscludeFunction = NOT_SUPPORTED;
    if (preLink) {
      preLink(this.$componentScope, this.$element, attrs, requiredControllers, transcludeFn);
    }

    linkFn(this.$componentScope, null !, {parentBoundTranscludeFn: attachChildNodes});

    if (postLink) {
      postLink(this.$componentScope, this.$element, attrs, requiredControllers, transcludeFn);
    }

    // Hook: $postLink
    if (this.controllerInstance && isFunction(this.controllerInstance.$postLink)) {
      this.controllerInstance.$postLink();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.bindingDestination) {
      this.pendingChanges = changes;
    } else {
      this.forwardChanges(changes);
    }
  }

  ngDoCheck() {
    const twoWayBoundProperties = this.bindings.twoWayBoundProperties;
    const twoWayBoundLastValues = this.bindings.twoWayBoundLastValues;
    const propertyToOutputMap = this.bindings.propertyToOutputMap;

    twoWayBoundProperties.forEach((propName, idx) => {
      const newValue = this.bindingDestination[propName];
      const oldValue = twoWayBoundLastValues[idx];

      if (!looseIdentical(newValue, oldValue)) {
        const outputName = propertyToOutputMap[propName];
        const eventEmitter: EventEmitter<any> = (this as any)[outputName];

        eventEmitter.emit(newValue);
        twoWayBoundLastValues[idx] = newValue;
      }
    });
  }

  ngOnDestroy() {
    if (isFunction(this.unregisterDoCheckWatcher)) {
      this.unregisterDoCheckWatcher();
    }
    if (this.controllerInstance && isFunction(this.controllerInstance.$onDestroy)) {
      this.controllerInstance.$onDestroy();
    }
    this.$componentScope.$destroy();
  }

  private initializeBindings(directive: angular.IDirective) {
    const btcIsObject = typeof directive.bindToController === 'object';
    if (btcIsObject && Object.keys(directive.scope !).length) {
      throw new Error(
          `Binding definitions on scope and controller at the same time is not supported.`);
    }

    const context = (btcIsObject) ? directive.bindToController : directive.scope;
    const bindings = new Bindings();

    if (typeof context == 'object') {
      Object.keys(context).forEach(propName => {
        const definition = context[propName];
        const bindingType = definition.charAt(0);

        // QUESTION: What about `=*`? Ignore? Throw? Support?

        switch (bindingType) {
          case '@':
          case '<':
            // We don't need to do anything special. They will be defined as inputs on the
            // upgraded component facade and the change propagation will be handled by
            // `ngOnChanges()`.
            break;
          case '=':
            bindings.twoWayBoundProperties.push(propName);
            bindings.twoWayBoundLastValues.push(INITIAL_VALUE);
            bindings.propertyToOutputMap[propName] = propName + 'Change';
            break;
          case '&':
            bindings.expressionBoundProperties.push(propName);
            bindings.propertyToOutputMap[propName] = propName;
            break;
          default:
            let json = JSON.stringify(context);
            throw new Error(
                `Unexpected mapping '${bindingType}' in '${json}' in '${this.name}' directive.`);
        }
      });
    }

    return bindings;
  }

  private initializeOutputs() {
    // Initialize the outputs for `=` and `&` bindings
    this.bindings.twoWayBoundProperties.concat(this.bindings.expressionBoundProperties)
        .forEach(propName => {
          const outputName = this.bindings.propertyToOutputMap[propName];
          (this as any)[outputName] = new EventEmitter();
        });
  }

  private bindOutputs() {
    // Bind `&` bindings to the corresponding outputs
    this.bindings.expressionBoundProperties.forEach(propName => {
      const outputName = this.bindings.propertyToOutputMap[propName];
      const emitter = (this as any)[outputName];

      this.bindingDestination[propName] = (value: any) => emitter.emit(value);
    });
  }

  private forwardChanges(changes: SimpleChanges) {
    // Forward input changes to `bindingDestination`
    Object.keys(changes).forEach(
        propName => this.bindingDestination[propName] = changes[propName].currentValue);

    if (isFunction(this.bindingDestination.$onChanges)) {
      this.bindingDestination.$onChanges(changes);
    }
  }
}
