/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../di/injector';
import {injectViewContainerRef as render3InjectViewContainerRef} from '../render3/view_engine_compatibility';
import {noop} from '../util/noop';

import {ComponentFactory, ComponentRef} from './component_factory';
import {ElementRef} from './element_ref';
import {NgModuleRef} from './ng_module_factory';
import {TemplateRef} from './template_ref';
import {EmbeddedViewRef, ViewRef} from './view_ref';


/**
 * Represents a container where one or more views can be attached to a component.
 *
 * 表示可以将一个或多个视图附着到组件中的容器。
 *
 * Can contain *host views* (created by instantiating a
 * component with the `createComponent()` method), and *embedded views*
 * (created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).
 *
 * 可以包含*宿主视图*（当用 `createComponent()` 方法实例化组件时创建）和*内嵌视图*（当用 `createEmbeddedView()` 方法实例化 `TemplateRef` 时创建）。
 *
 * A view container instance can contain other view containers,
 * creating a [view hierarchy](guide/glossary#view-tree).
 *
 * 视图容器的实例还可以包含其它视图容器，以创建[层次化视图](guide/glossary#view-tree)。
 *
 * @see `ComponentRef`
 * @see `EmbeddedViewRef`
 *
 * @publicApi
 */
export abstract class ViewContainerRef {
  /**
   * Anchor element that specifies the location of this container in the containing view.
   * Each view container can have only one anchor element, and each anchor element
   * can have only a single view container.
   *
   * 锚点元素用来指定本容器在父容器视图中的位置。
   * 每个视图容器都只能有一个锚点元素，每个锚点元素也只能属于一个视图容器。
   *
   * Root elements of views attached to this container become siblings of the anchor element in
   * the rendered view.
   *
   * 视图的根元素会附着到该容器上，在渲染好的视图中会变成锚点元素的兄弟。
   *
   * Access the `ViewContainerRef` of an element by placing a `Directive` injected
   * with `ViewContainerRef` on the element, or use a `ViewChild` query.
   *
   * 可以在元素上放置注入了 `ViewContainerRef` 的 `Directive` 来访问元素的 `ViewContainerRef`。也可以使用 `ViewChild` 进行查询。
   *
   * <!-- TODO: rename to anchorElement -->
   */
  abstract get element(): ElementRef;

  /**
   * The [dependency injector](guide/glossary#injector) for this view container.
   *
   * 该视图容器的[依赖注入器](guide/glossary#injector)。
   */
  abstract get injector(): Injector;

  /** @deprecated No replacement */
  abstract get parentInjector(): Injector;

  /**
   * Destroys all views in this container.
   *
   * 销毁本容器中的所有视图。
   */
  abstract clear(): void;

  /**
   * Retrieves a view from this container.
   *
   * 从该容器中获取一个视图
   *
   * @param index The 0-based index of the view to retrieve.
   *
   * 所要获取视图的从 0 开始的索引。
   *
   * @returns The `ViewRef` instance, or null if the index is out of range.
   *
   * `ViewRef` 实例，如果索引超出范围则为 0。
   */
  abstract get(index: number): ViewRef|null;

  /**
   * Reports how many views are currently attached to this container.
   *
   * 报告目前附加到本容器的视图的数量。
   *
   * @returns The number of views.
   *
   * 视图的数量。
   */
  abstract get length(): number;

  /**
   * Instantiates an embedded view and inserts it
   * into this container.
   *
   * 实例化一个内嵌视图，并把它插入到该容器中。
   *
   * @param templateRef The HTML template that defines the view.
   *
   * 用来定义视图的 HTML 模板。
   *
   * @param index The 0-based index at which to insert the new view into this container.
   * If not specified, appends the new view as the last entry.
   *
   * 从 0 开始的索引，表示新视图要插入到当前容器的哪个位置。
   * 如果没有指定，就把新的视图追加到最后。
   *
   * @returns The `ViewRef` instance for the newly created view.
   *
   * 新创建的这个视图的 `ViewRef` 实例。
   */
  abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number):
      EmbeddedViewRef<C>;

  /**
   * Instantiates a single component and inserts its host view into this container.
   *
   * 实例化一个 {@link Component} 并把它的宿主视图插入到本容器的指定 `index` 处。
   *
   * @param componentFactory The factory to use.
   *
   * 要使用的工厂。
   *
   * @param index The index at which to insert the new component's host view into this container.
   * If not specified, appends the new view as the last entry.
   *
   * 从 0 开始的索引，表示新组件的宿主视图要插入到当前容器的哪个位置。
   * 如果没有指定，就把新的视图追加到最后。
   *
   * @param injector The injector to use as the parent for the new component.
   *
   * 一个注入器，将用作新组件的父注入器。
   *
   * @param projectableNodes
   * @param ngModule
   *
   * @returns The new component instance, containing the host view.
   *
   * 新组件的实例，包含宿主视图。
   *
   *
   */
  abstract createComponent<C>(
      componentFactory: ComponentFactory<C>, index?: number, injector?: Injector,
      projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;

  /**
   * Inserts a view into this container.
   *
   * 把一个视图插入到当前容器中。
   *
   * @param viewRef The view to insert.
   *
   * 要插入的视图。
   *
   * @param index The 0-based index at which to insert the view.
   * If not specified, appends the new view as the last entry.
   *
   * 从 0 开始的索引，表示该视图要插入到当前容器的哪个位置。
   * 如果没有指定，就把新的视图追加到最后。
   *
   * @returns The inserted `ViewRef` instance.
   *
   * 插入后的 `ViewRef` 实例。
   *
   */
  abstract insert(viewRef: ViewRef, index?: number): ViewRef;

  /**
   * Moves a view to a new location in this container.
   *
   * 把一个视图移到容器中的新位置。
   *
   * @param viewRef The view to move.
   *
   * 要移动的视图。
   *
   * @param index The 0-based index of the new location.
   *
   * 从 0 开始索引，用于表示新位置。
   *
   * @returns The moved `ViewRef` instance.
   *
   * 移动后的 `ViewRef` 实例。
   *
   */
  abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;

  /**
   * Returns the index of a view within the current container.
   *
   * 返回某个视图在当前容器中的索引。
   *
   * @param viewRef The view to query.
   *
   * 要查询的视图。
   *
   * @returns The 0-based index of the view's position in this container,
   * or `-1` if this container doesn't contain the view.
   *
   * 本视图在其容器中的从 0 开始的索引，如果没找到，则返回 `-1`。
   */
  abstract indexOf(viewRef: ViewRef): number;

  /**
   * Destroys a view attached to this container
   *
   * 销毁附着在该容器中的某个视图
   *
   * @param index The 0-based index of the view to destroy.
   * If not specified, the last view in the container is removed.
   *
   * 要销毁的视图的从 0 开始的索引。
   * 如果不指定 `index`，则移除容器中的最后一个视图。
   */
  abstract remove(index?: number): void;

  /**
   * Detaches a view from this container without destroying it.
   * Use along with `insert()` to move a view within the current container.
   *
   * 从当前容器中分离某个视图，但不会销毁它。
   * 通常会和 `insert()` 一起使用，在当前容器中移动一个视图。
   *
   * @param index The 0-based index of the view to detach.
   * If not specified, the last view in the container is detached.
   *
   * 要分离的视图的从 0 开始的索引。
   * 如果省略 `index` 参数，则拆出最后一个 {@link ViewRef}。
   */
  abstract detach(index?: number): ViewRef|null;

  /**
   * @internal
   * @nocollapse
   */
  static __NG_ELEMENT_ID__:
      () => ViewContainerRef = () => SWITCH_VIEW_CONTAINER_REF_FACTORY(ViewContainerRef, ElementRef)
}

export const SWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ = render3InjectViewContainerRef;
const SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__ = noop;
const SWITCH_VIEW_CONTAINER_REF_FACTORY: typeof render3InjectViewContainerRef =
    SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__;
