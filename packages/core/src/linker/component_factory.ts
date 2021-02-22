/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef} from '../change_detection/change_detection';
import {Injector} from '../di/injector';
import {Type} from '../interface/type';

import {ElementRef} from './element_ref';
import {NgModuleRef} from './ng_module_factory';
import {ViewRef} from './view_ref';

/**
 * Represents a component created by a `ComponentFactory`.
 * Provides access to the component instance and related objects,
 * and provides the means of destroying the instance.
 *
 * 表示由 `ComponentFactory` 创建的组件。提供对组件实例和相关对象的访问，并提供销毁实例的方法。
 *
 * @publicApi
 */
export abstract class ComponentRef<C> {
  /**
   * The host or anchor [element](guide/glossary#element) for this component instance.
   *
   * 此组件实例的宿主或锚点[元素](guide/glossary#element)。
   *
   */
  abstract get location(): ElementRef;

  /**
   * The [dependency injector](guide/glossary#injector) for this component instance.
   *
   * 此组件实例的[依赖项注入器](guide/glossary#injector)。
   *
   */
  abstract get injector(): Injector;

  /**
   * This component instance.
   *
   * 该组件实例。
   *
   */
  abstract get instance(): C;

  /**
   * The [host view](guide/glossary#view-tree) defined by the template
   * for this component instance.
   *
   * 模板为此组件实例定义的[宿主视图](guide/glossary#view-tree)。
   *
   */
  abstract get hostView(): ViewRef;

  /**
   * The change detector for this component instance.
   *
   * 此组件实例的变更检测器。
   *
   */
  abstract get changeDetectorRef(): ChangeDetectorRef;

  /**
   * The type of this component (as created by a `ComponentFactory` class).
   *
   * 此组件的类型（由 `ComponentFactory` 类创建）。
   *
   */
  abstract get componentType(): Type<any>;

  /**
   * Destroys the component instance and all of the data structures associated with it.
   *
   * 销毁组件实例以及与其关联的所有数据结构。
   *
   */
  abstract destroy(): void;

  /**
   * A lifecycle hook that provides additional developer-defined cleanup
   * functionality for the component.
   *
   * 一个生命周期钩子，为组件提供其他由开发人员定义的清理功能。
   *
   * @param callback A handler function that cleans up developer-defined data
   * associated with this component. Called when the `destroy()` method is invoked.
   *
   * 一个处理器函数，用于清理与此组件关联的由开发人员定义的数据。在调用 `destroy()` 方法时调用。
   *
   */
  abstract onDestroy(callback: Function): void;
}

/**
 * Base class for a factory that can create a component dynamically.
 * Instantiate a factory for a given type of component with `resolveComponentFactory()`.
 * Use the resulting `ComponentFactory.create()` method to create a component of that type.
 *
 * 可用来动态创建组件的工厂的基类。`resolveComponentFactory()` 实例化给定类型的组件的工厂。使用生成的 `ComponentFactory.create()` 方法创建该类型的组件。
 *
 * @see [Dynamic Components](guide/dynamic-component-loader)
 *
 * [动态组件](guide/dynamic-component-loader)
 *
 * @publicApi
 */
export abstract class ComponentFactory<C> {
  /**
   * The component's HTML selector.
   *
   * 组件的 HTML 选择器。
   *
   */
  abstract get selector(): string;
  /**
   * The type of component the factory will create.
   *
   * 工厂将创建的组件的类型。
   *
   */
  abstract get componentType(): Type<any>;
  /**
   * Selector for all <ng-content> elements in the component.
   *
   * 组件中所有 <ng-content> 元素的选择器。
   *
   */
  abstract get ngContentSelectors(): string[];
  /**
   * The inputs of the component.
   *
   * 组件的输入。
   *
   */
  abstract get inputs(): {propName: string, templateName: string}[];
  /**
   * The outputs of the component.
   *
   * 组件的输出。
   *
   */
  abstract get outputs(): {propName: string, templateName: string}[];
  /**
   * Creates a new component.
   *
   * 创建一个新组件。
   *
   */
  abstract create(
      injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string|any,
      ngModule?: NgModuleRef<any>): ComponentRef<C>;
}
