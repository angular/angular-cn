/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector, Type} from '@angular/core';
import {Subscription} from 'rxjs';

import {ComponentNgElementStrategyFactory} from './component-factory-strategy';
import {NgElementStrategy, NgElementStrategyFactory} from './element-strategy';
import {createCustomEvent, getComponentInputs, getDefaultAttributeToPropertyInputs} from './utils';

/**
 * Prototype for a class constructor based on an Angular component
 * that can be used for custom element registration. Implemented and returned
 * by the {@link createCustomElement createCustomElement() function}.
 *
 * 基于 Angular 组件的类构造函数的原型，该原型可用于自定义元素注册。由 {@link createCustomElement createCustomElement() 函数} 实现并返回。
 *
 * @see [Angular Elements Overview](guide/elements "Turning Angular components into custom elements")
 *
 * [Angular 元素概述](guide/elements "将 Angular 组件变成自定义元素")
 *
 * @publicApi
 */
export interface NgElementConstructor<P> {
  /**
   * An array of observed attribute names for the custom element,
   * derived by transforming input property names from the source component.
   *
   * 被监视的自定义元素的属性名称的数组，该属性名称是通过转换源组件中的输入属性名称而得出的。
   *
   */
  readonly observedAttributes: string[];

  /**
   * Initializes a constructor instance.
   *
   * 初始化构造函数实例。
   *
   * @param injector If provided, overrides the configured injector.
   *
   * 如果提供，将覆盖已配置的注入器。
   *
   */
  new(injector?: Injector): NgElement&WithProperties<P>;
}

/**
 * Implements the functionality needed for a custom element.
 *
 * 实现自定义元素所需的功能。
 *
 * @publicApi
 */
export abstract class NgElement extends HTMLElement {
  /**
   * The strategy that controls how a component is transformed in a custom element.
   *
   * 控制如何把组件转换为自定义元素的策略。
   *
   */
  protected abstract ngElementStrategy: NgElementStrategy;
  /**
   * A subscription to change, connect, and disconnect events in the custom element.
   *
   * 在自定义元素中的对更改，连接和断开事件的订阅。
   *
   */
  protected ngElementEventsSubscription: Subscription|null = null;

  /**
   * Prototype for a handler that responds to a change in an observed attribute.
   *
   * 本处理器原型用于响应观察到的属性更改。
   *
   * @param attrName The name of the attribute that has changed.
   *
   * 更改的属性的名称。
   *
   * @param oldValue The previous value of the attribute.
   *
   * 属性的先前值。
   *
   * @param newValue The new value of the attribute.
   *
   * 属性的新值。
   *
   * @param namespace The namespace in which the attribute is defined.
   *
   * 定义属性的名称空间。
   *
   * @returns Nothing.
   *
   * 无。
   *
   */
  abstract attributeChangedCallback(
      attrName: string, oldValue: string|null, newValue: string, namespace?: string): void;
  /**
   * Prototype for a handler that responds to the insertion of the custom element in the DOM.
   *
   * 本处理器原型用来响应自定义元素在 DOM 中插入。
   *
   * @returns Nothing.
   *
   * 无。
   *
   */
  abstract connectedCallback(): void;
  /**
   * Prototype for a handler that responds to the deletion of the custom element from the DOM.
   *
   * 本处理器原型用来响应自 DOM 中删除自定义元素。
   *
   * @returns Nothing.
   *
   * 无。
   *
   */
  abstract disconnectedCallback(): void;
}

/**
 * Additional type information that can be added to the NgElement class,
 * for properties that are added based
 * on the inputs and methods of the underlying component.
 *
 * 可以添加到 NgElement 类的其他类型信息，用于基于基础组件的输入和方法添加的属性。
 *
 * @publicApi
 */
export type WithProperties<P> = {
  [property in keyof P]: P[property]
};

/**
 * A configuration that initializes an NgElementConstructor with the
 * dependencies and strategy it needs to transform a component into
 * a custom element class.
 *
 * 一种配置，它使用将组件转换为自定义元素类所需的依赖项和策略来初始化 NgElementConstructor。
 *
 * @publicApi
 */
export interface NgElementConfig {
  /**
   * The injector to use for retrieving the component's factory.
   *
   * 本注入器用于检索组件工厂。
   *
   */
  injector: Injector;
  /**
   * An optional custom strategy factory to use instead of the default.
   * The strategy controls how the transformation is performed.
   *
   * 要使用的可选自定义策略工厂，而不是默认工厂。该策略控制转换的执行方式。
   *
   */
  strategyFactory?: NgElementStrategyFactory;
}

/**
 *  @description Creates a custom element class based on an Angular component.
 *
 * 基于 Angular 组件创建自定义元素类。
 *
 * Builds a class that encapsulates the functionality of the provided component and
 * uses the configuration information to provide more context to the class.
 * Takes the component factory's inputs and outputs to convert them to the proper
 * custom element API and add hooks to input changes.
 *
 * 构建一个类，该类封装给定组件的功能，并使用配置信息为该类提供更多上下文。获取组件工厂的输入和输出，以将它们转换为适当的自定义元素 API，并为输入变更添加钩子。
 *
 * The configuration's injector is the initial injector set on the class,
 * and used by default for each created instance.This behavior can be overridden with the
 * static property to affect all newly created instances, or as a constructor argument for
 * one-off creations.
 *
 * 这里配置的注入器是在类上设置的初始注入器，默认情况下用于每个创建的实例。此行为可以用静态属性覆盖以影响所有新创建的实例，也可以用作一次性创建的构造函数参数。
 *
 * @see [Angular Elements Overview](guide/elements "Turning Angular components into custom elements")
 *
 * [Angular 元素概述](guide/elements "将 Angular 组件变成自定义元素")
 *
 * @param component The component to transform.
 *
 * 要转换的组件。
 *
 * @param config A configuration that provides initialization information to the created class.
 *
 * 为创建的类提供初始化信息的配置。
 *
 * @returns The custom-element construction class, which can be registered with
 * a browser's `CustomElementRegistry`.
 *
 * 自定义元素的构造类，可以注册到浏览器的 `CustomElementRegistry` 中。
 *
 * @publicApi
 */
export function createCustomElement<P>(
    component: Type<any>, config: NgElementConfig): NgElementConstructor<P> {
  const inputs = getComponentInputs(component, config.injector);

  const strategyFactory =
      config.strategyFactory || new ComponentNgElementStrategyFactory(component, config.injector);

  const attributeToPropertyInputs = getDefaultAttributeToPropertyInputs(inputs);

  class NgElementImpl extends NgElement {
    // Work around a bug in closure typed optimizations(b/79557487) where it is not honoring static
    // field externs. So using quoted access to explicitly prevent renaming.
    static readonly['observedAttributes'] = Object.keys(attributeToPropertyInputs);

    protected get ngElementStrategy(): NgElementStrategy {
      // NOTE:
      // Some polyfills (e.g. `document-register-element`) do not call the constructor, therefore
      // it is not safe to set `ngElementStrategy` in the constructor and assume it will be
      // available inside the methods.
      //
      // TODO(andrewseguin): Add e2e tests that cover cases where the constructor isn't called. For
      // now this is tested using a Google internal test suite.
      if (!this._ngElementStrategy) {
        const strategy = this._ngElementStrategy =
            strategyFactory.create(this.injector || config.injector);

        // Re-apply pre-existing input values (set as properties on the element) through the
        // strategy.
        inputs.forEach(({propName}) => {
          if (!this.hasOwnProperty(propName)) {
            // No pre-existing value for `propName`.
            return;
          }

          // Delete the property from the instance and re-apply it through the strategy.
          const value = (this as any)[propName];
          delete (this as any)[propName];
          strategy.setInputValue(propName, value);
        });
      }

      return this._ngElementStrategy!;
    }

    private _ngElementStrategy?: NgElementStrategy;

    constructor(private readonly injector?: Injector) {
      super();
    }

    attributeChangedCallback(
        attrName: string, oldValue: string|null, newValue: string, namespace?: string): void {
      const propName = attributeToPropertyInputs[attrName]!;
      this.ngElementStrategy.setInputValue(propName, newValue);
    }

    connectedCallback(): void {
      // For historical reasons, some strategies may not have initialized the `events` property
      // until after `connect()` is run. Subscribe to `events` if it is available before running
      // `connect()` (in order to capture events emitted suring inittialization), otherwise
      // subscribe afterwards.
      //
      // TODO: Consider deprecating/removing the post-connect subscription in a future major version
      //       (e.g. v11).

      let subscribedToEvents = false;

      if (this.ngElementStrategy.events) {
        // `events` are already available: Subscribe to it asap.
        this.subscribeToEvents();
        subscribedToEvents = true;
      }

      this.ngElementStrategy.connect(this);

      if (!subscribedToEvents) {
        // `events` were not initialized before running `connect()`: Subscribe to them now.
        // The events emitted during the component initialization have been missed, but at least
        // future events will be captured.
        this.subscribeToEvents();
      }
    }

    disconnectedCallback(): void {
      // Not using `this.ngElementStrategy` to avoid unnecessarily creating the `NgElementStrategy`.
      if (this._ngElementStrategy) {
        this._ngElementStrategy.disconnect();
      }

      if (this.ngElementEventsSubscription) {
        this.ngElementEventsSubscription.unsubscribe();
        this.ngElementEventsSubscription = null;
      }
    }

    private subscribeToEvents(): void {
      // Listen for events from the strategy and dispatch them as custom events.
      this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(e => {
        const customEvent = createCustomEvent(this.ownerDocument!, e.name, e.value);
        this.dispatchEvent(customEvent);
      });
    }
  }

  // Add getters and setters to the prototype for each property input.
  inputs.forEach(({propName}) => {
    Object.defineProperty(NgElementImpl.prototype, propName, {
      get(): any {
        return this.ngElementStrategy.getInputValue(propName);
      },
      set(newValue: any): void {
        this.ngElementStrategy.setInputValue(propName, newValue);
      },
      configurable: true,
      enumerable: true,
    });
  });

  return (NgElementImpl as any) as NgElementConstructor<P>;
}
