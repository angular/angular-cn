/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../di/injector';
import {assertNodeInjector} from '../render3/assert';
import {getParentInjectorLocation, NodeInjector} from '../render3/di';
import {addToViewTree, createLContainer} from '../render3/instructions/shared';
import {CONTAINER_HEADER_OFFSET, LContainer, NATIVE, VIEW_REFS} from '../render3/interfaces/container';
import {NodeInjectorOffset} from '../render3/interfaces/injector';
import {TContainerNode, TDirectiveHostNode, TElementContainerNode, TElementNode, TNodeType} from '../render3/interfaces/node';
import {RComment, RElement} from '../render3/interfaces/renderer_dom';
import {isLContainer} from '../render3/interfaces/type_checks';
import {LView, PARENT, RENDERER, T_HOST, TVIEW} from '../render3/interfaces/view';
import {assertTNodeType} from '../render3/node_assert';
import {addViewToContainer, destroyLView, detachView, getBeforeNodeForView, insertView, nativeInsertBefore, nativeNextSibling, nativeParentNode} from '../render3/node_manipulation';
import {getCurrentTNode, getLView} from '../render3/state';
import {getParentInjectorIndex, getParentInjectorView, hasParentInjector} from '../render3/util/injector_utils';
import {getNativeByTNode, unwrapRNode, viewAttachedToContainer} from '../render3/util/view_utils';
import {ViewRef as R3ViewRef} from '../render3/view_ref';
import {addToArray, removeFromArray} from '../util/array_utils';
import {assertEqual, assertGreaterThan, assertLessThan} from '../util/assert';
import {noop} from '../util/noop';
import {ComponentFactory, ComponentRef} from './component_factory';
import {createElementRef, ElementRef} from './element_ref';
import {NgModuleRef} from './ng_module_factory';
import {TemplateRef} from './template_ref';
import {EmbeddedViewRef, ViewRef} from './view_ref';


export const SWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ = injectViewContainerRef;
const SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__ = noop as typeof injectViewContainerRef;
const SWITCH_VIEW_CONTAINER_REF_FACTORY: typeof injectViewContainerRef =
    SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__;

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

  /**
   * @deprecated No replacement
   *
   * 无替代品
   *
   */
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
  static __NG_ELEMENT_ID__: () => ViewContainerRef = SWITCH_VIEW_CONTAINER_REF_FACTORY;
}

/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @returns The ViewContainerRef instance to use
 */
export function injectViewContainerRef(): ViewContainerRef {
  const previousTNode = getCurrentTNode() as TElementNode | TElementContainerNode | TContainerNode;
  return createContainerRef(previousTNode, getLView());
}

const VE_ViewContainerRef = ViewContainerRef;

const R3ViewContainerRef = class ViewContainerRef extends VE_ViewContainerRef {
  constructor(
      private _lContainer: LContainer,
      private _hostTNode: TElementNode|TContainerNode|TElementContainerNode,
      private _hostLView: LView) {
    super();
  }

  get element(): ElementRef {
    return createElementRef(this._hostTNode, this._hostLView);
  }

  get injector(): Injector {
    return new NodeInjector(this._hostTNode, this._hostLView);
  }

  /** @deprecated No replacement */
  get parentInjector(): Injector {
    const parentLocation = getParentInjectorLocation(this._hostTNode, this._hostLView);
    if (hasParentInjector(parentLocation)) {
      const parentView = getParentInjectorView(parentLocation, this._hostLView);
      const injectorIndex = getParentInjectorIndex(parentLocation);
      ngDevMode && assertNodeInjector(parentView, injectorIndex);
      const parentTNode =
          parentView[TVIEW].data[injectorIndex + NodeInjectorOffset.TNODE] as TElementNode;
      return new NodeInjector(parentTNode, parentView);
    } else {
      return new NodeInjector(null, this._hostLView);
    }
  }

  clear(): void {
    while (this.length > 0) {
      this.remove(this.length - 1);
    }
  }

  get(index: number): ViewRef|null {
    const viewRefs = getViewRefs(this._lContainer);
    return viewRefs !== null && viewRefs[index] || null;
  }

  get length(): number {
    return this._lContainer.length - CONTAINER_HEADER_OFFSET;
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number):
      EmbeddedViewRef<C> {
    const viewRef = templateRef.createEmbeddedView(context || <any>{});
    this.insert(viewRef, index);
    return viewRef;
  }

  createComponent<C>(
      componentFactory: ComponentFactory<C>, index?: number|undefined,
      injector?: Injector|undefined, projectableNodes?: any[][]|undefined,
      ngModuleRef?: NgModuleRef<any>|undefined): ComponentRef<C> {
    const contextInjector = injector || this.parentInjector;
    if (!ngModuleRef && (componentFactory as any).ngModule == null && contextInjector) {
      // DO NOT REFACTOR. The code here used to have a `value || undefined` expression
      // which seems to cause internal google apps to fail. This is documented in the
      // following internal bug issue: go/b/142967802
      const result = contextInjector.get(NgModuleRef, null);
      if (result) {
        ngModuleRef = result;
      }
    }

    const componentRef =
        componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
    this.insert(componentRef.hostView, index);
    return componentRef;
  }

  insert(viewRef: ViewRef, index?: number): ViewRef {
    const lView = (viewRef as R3ViewRef<any>)._lView!;
    const tView = lView[TVIEW];

    if (ngDevMode && viewRef.destroyed) {
      throw new Error('Cannot insert a destroyed View in a ViewContainer!');
    }

    if (viewAttachedToContainer(lView)) {
      // If view is already attached, detach it first so we clean up references appropriately.

      const prevIdx = this.indexOf(viewRef);

      // A view might be attached either to this or a different container. The `prevIdx` for
      // those cases will be:
      // equal to -1 for views attached to this ViewContainerRef
      // >= 0 for views attached to a different ViewContainerRef
      if (prevIdx !== -1) {
        this.detach(prevIdx);
      } else {
        const prevLContainer = lView[PARENT] as LContainer;
        ngDevMode &&
            assertEqual(
                isLContainer(prevLContainer), true,
                'An attached view should have its PARENT point to a container.');


        // We need to re-create a R3ViewContainerRef instance since those are not stored on
        // LView (nor anywhere else).
        const prevVCRef = new R3ViewContainerRef(
            prevLContainer, prevLContainer[T_HOST] as TDirectiveHostNode, prevLContainer[PARENT]);

        prevVCRef.detach(prevVCRef.indexOf(viewRef));
      }
    }

    // Logical operation of adding `LView` to `LContainer`
    const adjustedIdx = this._adjustIndex(index);
    const lContainer = this._lContainer;
    insertView(tView, lView, lContainer, adjustedIdx);

    // Physical operation of adding the DOM nodes.
    const beforeNode = getBeforeNodeForView(adjustedIdx, lContainer);
    const renderer = lView[RENDERER];
    const parentRNode = nativeParentNode(renderer, lContainer[NATIVE] as RElement | RComment);
    if (parentRNode !== null) {
      addViewToContainer(tView, lContainer[T_HOST], renderer, lView, parentRNode, beforeNode);
    }

    (viewRef as R3ViewRef<any>).attachToViewContainerRef(this);
    addToArray(getOrCreateViewRefs(lContainer), adjustedIdx, viewRef);

    return viewRef;
  }

  move(viewRef: ViewRef, newIndex: number): ViewRef {
    if (ngDevMode && viewRef.destroyed) {
      throw new Error('Cannot move a destroyed View in a ViewContainer!');
    }
    return this.insert(viewRef, newIndex);
  }

  indexOf(viewRef: ViewRef): number {
    const viewRefsArr = getViewRefs(this._lContainer);
    return viewRefsArr !== null ? viewRefsArr.indexOf(viewRef) : -1;
  }

  remove(index?: number): void {
    const adjustedIdx = this._adjustIndex(index, -1);
    const detachedView = detachView(this._lContainer, adjustedIdx);

    if (detachedView) {
      // Before destroying the view, remove it from the container's array of `ViewRef`s.
      // This ensures the view container length is updated before calling
      // `destroyLView`, which could recursively call view container methods that
      // rely on an accurate container length.
      // (e.g. a method on this view container being called by a child directive's OnDestroy
      // lifecycle hook)
      removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx);
      destroyLView(detachedView[TVIEW], detachedView);
    }
  }

  detach(index?: number): ViewRef|null {
    const adjustedIdx = this._adjustIndex(index, -1);
    const view = detachView(this._lContainer, adjustedIdx);

    const wasDetached =
        view && removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx) != null;
    return wasDetached ? new R3ViewRef(view!) : null;
  }

  private _adjustIndex(index?: number, shift: number = 0) {
    if (index == null) {
      return this.length + shift;
    }
    if (ngDevMode) {
      assertGreaterThan(index, -1, `ViewRef index must be positive, got ${index}`);
      // +1 because it's legal to insert at the end.
      assertLessThan(index, this.length + 1 + shift, 'index');
    }
    return index;
  }
};

function getViewRefs(lContainer: LContainer): ViewRef[]|null {
  return lContainer[VIEW_REFS] as ViewRef[];
}

function getOrCreateViewRefs(lContainer: LContainer): ViewRef[] {
  return (lContainer[VIEW_REFS] || (lContainer[VIEW_REFS] = [])) as ViewRef[];
}

/**
 * Creates a ViewContainerRef and stores it on the injector.
 *
 * @param ViewContainerRefToken The ViewContainerRef type
 * @param ElementRefToken The ElementRef type
 * @param hostTNode The node that is requesting a ViewContainerRef
 * @param hostLView The view to which the node belongs
 * @returns The ViewContainerRef instance to use
 */
export function createContainerRef(
    hostTNode: TElementNode|TContainerNode|TElementContainerNode,
    hostLView: LView): ViewContainerRef {
  ngDevMode && assertTNodeType(hostTNode, TNodeType.AnyContainer | TNodeType.AnyRNode);

  let lContainer: LContainer;
  const slotValue = hostLView[hostTNode.index];
  if (isLContainer(slotValue)) {
    // If the host is a container, we don't need to create a new LContainer
    lContainer = slotValue;
  } else {
    let commentNode: RComment;
    // If the host is an element container, the native host element is guaranteed to be a
    // comment and we can reuse that comment as anchor element for the new LContainer.
    // The comment node in question is already part of the DOM structure so we don't need to append
    // it again.
    if (hostTNode.type & TNodeType.ElementContainer) {
      commentNode = unwrapRNode(slotValue) as RComment;
    } else {
      // If the host is a regular element, we have to insert a comment node manually which will
      // be used as an anchor when inserting elements. In this specific case we use low-level DOM
      // manipulation to insert it.
      const renderer = hostLView[RENDERER];
      ngDevMode && ngDevMode.rendererCreateComment++;
      commentNode = renderer.createComment(ngDevMode ? 'container' : '');

      const hostNative = getNativeByTNode(hostTNode, hostLView)!;
      const parentOfHostNative = nativeParentNode(renderer, hostNative);
      nativeInsertBefore(
          renderer, parentOfHostNative!, commentNode, nativeNextSibling(renderer, hostNative),
          false);
    }

    hostLView[hostTNode.index] = lContainer =
        createLContainer(slotValue, hostLView, commentNode, hostTNode);

    addToViewTree(hostLView, lContainer);
  }

  return new R3ViewContainerRef(lContainer, hostTNode, hostLView);
}
