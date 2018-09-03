/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../di/injector';
import {ComponentFactory, ComponentRef} from './component_factory';
import {ElementRef} from './element_ref';
import {NgModuleRef} from './ng_module_factory';
import {TemplateRef} from './template_ref';
import {EmbeddedViewRef, ViewRef} from './view_ref';


/**
 * Represents a container where one or more Views can be attached.
 *
 * 代表一个容器，可以在里面附加一个或多个视图。
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {@link Component} via {@link #createComponent}, and Embedded Views, created by instantiating an
 * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
 *
 * 此容器可以包含两种不同的视图。宿主视图，在通过 {@link #createComponent} 实例化 {@link Component} 时创建；
 * 内嵌视图，在通过 {@link #createEmbeddedView} 实例化 {@link TemplateRef 内嵌模板} 时创建。
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * ViewContainer（视图容器）在父容器视图中的位置由锚点元素 `element` 决定。
 * 每个 ViewContainer  只能有一个锚点元素，而且每个锚点元素中只能有一个 ViewContainer。
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * 在渲染出的视图中，这些附加到该容器中的视图的根元素会成为锚点元素的兄弟。
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via a {@link ViewChild} query.
 *
 * 要想访问元素的 `ViewContainerRef`，你可以放一个 {@link Directive}，并把该元素的 `ViewContainerRef` 注入进去，
 * 也可以通过 {@link ViewChild} 查询来取到它。
 *
 */
export abstract class ViewContainerRef {
  /**
   * Anchor element that specifies the location of this container in the containing View.
   *
   * 锚点元素用来指定本容器在父容器视图中的位置。
   * <!-- TODO: rename to anchorElement -->
   */
  abstract get element(): ElementRef;

  abstract get injector(): Injector;

  abstract get parentInjector(): Injector;

  /**
   * Destroys all Views in this container.
   *
   * 销毁本容器中的所有视图。
   */
  abstract clear(): void;

  /**
   * Returns the {@link ViewRef} for the View located in this container at the specified index.
   *
   * 返回本容器中指定序号的视图的 {@link ViewRef}。
   */
  abstract get(index: number): ViewRef|null;

  /**
   * Returns the number of Views currently attached to this container.
   *
   * 返回目前附加到本容器的视图的数量。
   */
  abstract get length(): number;

  /**
   * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
   * into this container at the specified `index`.
   *
   * 根据 {@link TemplateRef `templateRef`} 实例化一个内嵌视图，并把它插入在本容器的指定 `index` 处。
   *
   * If `index` is not specified, the new View will be inserted as the last View in the container.
   *
   * 如果没有指定 `index`，则这个新视图将会被插入在本容器的末尾处。
   *
   * Returns the {@link ViewRef} for the newly created View.
   *
   * 返回新建视图的 {@link ViewRef}。
   */
  abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number):
      EmbeddedViewRef<C>;

  /**
   * Instantiates a single {@link Component} and inserts its Host View into this container at the
   * specified `index`.
   *
   * 实例化一个 {@link Component} 并把它的宿主视图插入到本容器的指定 `index` 处。
   *
   * The component is instantiated using its {@link ComponentFactory} which can be obtained via
   * {@link ComponentFactoryResolver#resolveComponentFactory resolveComponentFactory}.
   *
   * 该组件使用它的 {@link ComponentFactory} 进行实例化。`ComponentFactory` 可以通过 {@link ComponentFactoryResolver#resolveComponentFactory resolveComponentFactory} 拿到。
   *
   * If `index` is not specified, the new View will be inserted as the last View in the container.
   *
   * 如果没有指定 `index` 则这个新视图将会被插入在本容器的末尾处。
   *
   * You can optionally specify the {@link Injector} that will be used as parent for the Component.
   *
   * 你还可以指定一个可选的 {@link Injector}，它将被用作本组件的父注入器。
   *
   * Returns the {@link ComponentRef} of the Host View created for the newly instantiated Component.
   *
   * 返回新实例化的组件的宿主视图的 {@link ComponentRef}。
   */
  abstract createComponent<C>(
      componentFactory: ComponentFactory<C>, index?: number, injector?: Injector,
      projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;

  /**
   * Inserts a View identified by a {@link ViewRef} into the container at the specified `index`.
   *
   * 把一个由 {@link ViewRef} 标识的视图插入到容器中的指定 `index` 处。
   *
   * If `index` is not specified, the new View will be inserted as the last View in the container.
   *
   * 如果没有指定 `index` 则这个新视图将会被插入在本容器的末尾处。
   *
   * Returns the inserted {@link ViewRef}.
   *
   * 返回所插入的 {@link ViewRef}。
   */
  abstract insert(viewRef: ViewRef, index?: number): ViewRef;

  /**
   * Moves a View identified by a {@link ViewRef} into the container at the specified `index`.
   *
   * 把一个由 {@link ViewRef} 标记的视图移入容器中指定的 `index` 处。
   *
   * Returns the inserted {@link ViewRef}.
   *
   * 返回所插入的 {@link ViewRef}。
   */
  abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;

  /**
   * Returns the index of the View, specified via {@link ViewRef}, within the current container or
   * `-1` if this container doesn't contain the View.
   *
   * 返回本视图在其容器中的索引，如果没找到，则返回 `-1`。
   */
  abstract indexOf(viewRef: ViewRef): number;

  /**
   * Destroys a View attached to this container at the specified `index`.
   *
   * 销毁一个位于容器中指定 `index` 处的视图。
   *
   * If `index` is not specified, the last View in the container will be removed.
   *
   * 如果不指定 `index`，则移除容器中的最后一个视图。
   */
  abstract remove(index?: number): void;

  /**
   * Use along with {@link #insert} to move a View within the current container.
   *
   * 和 {@link #insert} 一起使用，把某个视图移入当前容器。
   *
   * If the `index` param is omitted, the last {@link ViewRef} is detached.
   *
   * 如果省略 `index` 参数，则拆出最后一个 {@link ViewRef}。
   */
  abstract detach(index?: number): ViewRef|null;
}
