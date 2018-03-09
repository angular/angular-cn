/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, DoCheck, ElementRef, EventEmitter, Inject, Injector, OnChanges, OnInit, SimpleChange, SimpleChanges, Type} from '@angular/core';

import * as angular from '../common/angular1';
import {$SCOPE} from '../common/constants';
import {IBindingDestination, IControllerInstance, UpgradeHelper} from '../common/upgrade_helper';
import {isFunction, strictEquals} from '../common/util';


const CAMEL_CASE = /([A-Z])/g;
const INITIAL_VALUE = {
  __UNINITIALIZED__: true
};
const NOT_SUPPORTED: any = 'NOT_SUPPORTED';


export class UpgradeNg1ComponentAdapterBuilder {
  type: Type<any>;
  inputs: string[] = [];
  inputsRename: string[] = [];
  outputs: string[] = [];
  outputsRename: string[] = [];
  propertyOutputs: string[] = [];
  checkProperties: string[] = [];
  propertyMap: {[name: string]: string} = {};
  directive: angular.IDirective|null = null;
  template: string;

  constructor(public name: string) {
    const selector =
        name.replace(CAMEL_CASE, (all: string, next: string) => '-' + next.toLowerCase());
    const self = this;

    // Note: There is a bug in TS 2.4 that prevents us from
    // inlining this into @Directive
    // TODO(tbosch): find or file a bug against TypeScript for this.
    const directive = {selector: selector, inputs: this.inputsRename, outputs: this.outputsRename};

    @Directive(directive)
    class MyClass {
      directive: angular.IDirective;
      constructor(
          @Inject($SCOPE) scope: angular.IScope, injector: Injector, elementRef: ElementRef) {
        const helper = new UpgradeHelper(injector, name, elementRef, this.directive);
        return new UpgradeNg1ComponentAdapter(
            helper, scope, self.template, self.inputs, self.outputs, self.propertyOutputs,
            self.checkProperties, self.propertyMap) as any;
      }
      ngOnInit() { /* needs to be here for ng2 to properly detect it */
      }
      ngOnChanges() { /* needs to be here for ng2 to properly detect it */
      }
      ngDoCheck() { /* needs to be here for ng2 to properly detect it */
      }
      ngOnDestroy() { /* needs to be here for ng2 to properly detect it */
      }
    }
    this.type = MyClass;
  }

  extractBindings() {
    const btcIsObject = typeof this.directive !.bindToController === 'object';
    if (btcIsObject && Object.keys(this.directive !.scope !).length) {
      throw new Error(
          `Binding definitions on scope and controller at the same time are not supported.`);
    }

    const context = (btcIsObject) ? this.directive !.bindToController : this.directive !.scope;

    if (typeof context == 'object') {
      Object.keys(context).forEach(propName => {
        const definition = context[propName];
        const bindingType = definition.charAt(0);
        const bindingOptions = definition.charAt(1);
        const attrName = definition.substring(bindingOptions === '?' ? 2 : 1) || propName;

        // QUESTION: What about `=*`? Ignore? Throw? Support?

        const inputName = `input_${attrName}`;
        const inputNameRename = `${inputName}: ${attrName}`;
        const outputName = `output_${attrName}`;
        const outputNameRename = `${outputName}: ${attrName}`;
        const outputNameRenameChange = `${outputNameRename}Change`;

        switch (bindingType) {
          case '@':
          case '<':
            this.inputs.push(inputName);
            this.inputsRename.push(inputNameRename);
            this.propertyMap[inputName] = propName;
            break;
          case '=':
            this.inputs.push(inputName);
            this.inputsRename.push(inputNameRename);
            this.propertyMap[inputName] = propName;

            this.outputs.push(outputName);
            this.outputsRename.push(outputNameRenameChange);
            this.propertyMap[outputName] = propName;

            this.checkProperties.push(propName);
            this.propertyOutputs.push(outputName);
            break;
          case '&':
            this.outputs.push(outputName);
            this.outputsRename.push(outputNameRename);
            this.propertyMap[outputName] = propName;
            break;
          default:
            let json = JSON.stringify(context);
            throw new Error(
                `Unexpected mapping '${bindingType}' in '${json}' in '${this.name}' directive.`);
        }
      });
    }
  }

  /**
   * Upgrade ng1 components into Angular.
   */
  static resolve(
      exportedComponents: {[name: string]: UpgradeNg1ComponentAdapterBuilder},
      $injector: angular.IInjectorService): Promise<string[]> {
    const promises = Object.keys(exportedComponents).map(name => {
      const exportedComponent = exportedComponents[name];
      exportedComponent.directive = UpgradeHelper.getDirective($injector, name);
      exportedComponent.extractBindings();

      return Promise
          .resolve(UpgradeHelper.getTemplate($injector, exportedComponent.directive, true))
          .then(template => exportedComponent.template = template);
    });

    return Promise.all(promises);
  }
}

class UpgradeNg1ComponentAdapter implements OnInit, OnChanges, DoCheck {
  private controllerInstance: IControllerInstance|null = null;
  destinationObj: IBindingDestination|null = null;
  checkLastValues: any[] = [];
  private directive: angular.IDirective;
  element: Element;
  $element: any = null;
  componentScope: angular.IScope;

  constructor(
      private helper: UpgradeHelper, scope: angular.IScope, private template: string,
      private inputs: string[], private outputs: string[], private propOuts: string[],
      private checkProperties: string[], private propertyMap: {[key: string]: string}) {
    this.directive = helper.directive;
    this.element = helper.element;
    this.$element = helper.$element;
    this.componentScope = scope.$new(!!this.directive.scope);

    const controllerType = this.directive.controller;

    if (this.directive.bindToController && controllerType) {
      this.controllerInstance = this.helper.buildController(controllerType, this.componentScope);
      this.destinationObj = this.controllerInstance;
    } else {
      this.destinationObj = this.componentScope;
    }

    for (let i = 0; i < inputs.length; i++) {
      (this as any)[inputs[i]] = null;
    }
    for (let j = 0; j < outputs.length; j++) {
      const emitter = (this as any)[outputs[j]] = new EventEmitter<any>();
      if (this.propOuts.indexOf(outputs[j]) === -1) {
        this.setComponentProperty(
            outputs[j], (emitter => (value: any) => emitter.emit(value))(emitter));
      }
    }
    for (let k = 0; k < propOuts.length; k++) {
      this.checkLastValues.push(INITIAL_VALUE);
    }
  }

  ngOnInit() {
    // Collect contents, insert and compile template
    const attachChildNodes: angular.ILinkFn|undefined = this.helper.prepareTransclusion();
    const linkFn = this.helper.compileTemplate(this.template);

    // Instantiate controller (if not already done so)
    const controllerType = this.directive.controller;
    const bindToController = this.directive.bindToController;
    if (controllerType && !bindToController) {
      this.controllerInstance = this.helper.buildController(controllerType, this.componentScope);
    }

    // Require other controllers
    const requiredControllers =
        this.helper.resolveAndBindRequiredControllers(this.controllerInstance);

    // Hook: $onInit
    if (this.controllerInstance && isFunction(this.controllerInstance.$onInit)) {
      this.controllerInstance.$onInit();
    }

    // Linking
    const link = this.directive.link;
    const preLink = (typeof link == 'object') && (link as angular.IDirectivePrePost).pre;
    const postLink = (typeof link == 'object') ? (link as angular.IDirectivePrePost).post : link;
    const attrs: angular.IAttributes = NOT_SUPPORTED;
    const transcludeFn: angular.ITranscludeFunction = NOT_SUPPORTED;
    if (preLink) {
      preLink(this.componentScope, this.$element, attrs, requiredControllers, transcludeFn);
    }

    linkFn(this.componentScope, null !, {parentBoundTranscludeFn: attachChildNodes});

    if (postLink) {
      postLink(this.componentScope, this.$element, attrs, requiredControllers, transcludeFn);
    }

    // Hook: $postLink
    if (this.controllerInstance && isFunction(this.controllerInstance.$postLink)) {
      this.controllerInstance.$postLink();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const ng1Changes: any = {};
    Object.keys(changes).forEach(name => {
      const change: SimpleChange = changes[name];
      this.setComponentProperty(name, change.currentValue);
      ng1Changes[this.propertyMap[name]] = change;
    });

    if (isFunction(this.destinationObj !.$onChanges)) {
      this.destinationObj !.$onChanges !(ng1Changes);
    }
  }

  ngDoCheck() {
    const destinationObj = this.destinationObj;
    const lastValues = this.checkLastValues;
    const checkProperties = this.checkProperties;
    const propOuts = this.propOuts;
    checkProperties.forEach((propName, i) => {
      const value = destinationObj ![propName];
      const last = lastValues[i];
      if (!strictEquals(last, value)) {
        const eventEmitter: EventEmitter<any> = (this as any)[propOuts[i]];
        eventEmitter.emit(lastValues[i] = value);
      }
    });

    if (this.controllerInstance && isFunction(this.controllerInstance.$doCheck)) {
      this.controllerInstance.$doCheck();
    }
  }

  ngOnDestroy() {
    if (this.controllerInstance && isFunction(this.controllerInstance.$onDestroy)) {
      this.controllerInstance.$onDestroy();
    }
  }

  setComponentProperty(name: string, value: any) {
    this.destinationObj ![this.propertyMap[name]] = value;
  }
}
