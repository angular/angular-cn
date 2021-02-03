/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef} from '../change_detection/change_detector_ref';

/**
 * Represents an Angular [view](guide/glossary#view "Definition").
 *
 * 表示一个 Angular [视图](guide/glossary#view "Definition")。
 *
 * @see {@link ChangeDetectorRef#usage-notes Change detection usage}
 *
 * @publicApi
 */
export abstract class ViewRef extends ChangeDetectorRef {
  /**
   * Destroys this view and all of the data structures associated with it.
   *
   * 销毁该视图以及与之关联的所有数据结构。
   *
   */
  abstract destroy(): void;

  /**
   * Reports whether this view has been destroyed.
   *
   * 报告此视图是否已被销毁。
   *
   * @returns True after the `destroy()` method has been called, false otherwise.
   *
   * 调用 `destroy()` 方法后为 true，否则为 false。
   *
   */
  abstract get destroyed(): boolean;

  /**
   * A lifecycle hook that provides additional developer-defined cleanup
   * functionality for views.
   *
   * 生命周期钩子，为视图提供其他由开发人员定义的清理功能。
   *
   * @param callback A handler function that cleans up developer-defined data
   * associated with a view. Called when the `destroy()` method is invoked.
   *
   * 处理函数，用于清理与视图关联的由开发人员定义的数据。在调用 `destroy()` 方法时调用。
   *
   */
  abstract onDestroy(callback: Function): any /** TODO #9100 */;
}

/**
 * Represents an Angular [view](guide/glossary#view) in a view container.
 * An [embedded view](guide/glossary#view-tree) can be referenced from a component
 * other than the hosting component whose template defines it, or it can be defined
 * independently by a `TemplateRef`.
 *
 * 表示视图容器中的 Angular [视图](guide/glossary#view)。[嵌入视图](guide/glossary#view-tree)可以从在模板中定义它的宿主组件之外的组件中引用，也可以由 `TemplateRef` 进行独立定义。
 *
 * Properties of elements in a view can change, but the structure (number and order) of elements in
 * a view cannot. Change the structure of elements by inserting, moving, or
 * removing nested views in a view container.
 *
 * 视图中元素的属性可以更改，但是视图中元素的结构（数量和顺序）不能更改。通过在视图容器中插入，移动或删除嵌套视图来更改元素的结构。
 *
 * @see `ViewContainerRef`
 *
 * @usageNotes
 *
 * The following template breaks down into two separate `TemplateRef` instances,
 * an outer one and an inner one.
 *
 * 以下模板分为两个单独的 `TemplateRef` 实例，一个外部实例和一个内部实例。
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * This is the outer `TemplateRef`:
 *
 * 这是外部 `TemplateRef` ：
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * This is the inner `TemplateRef`:
 *
 * 这是内部的 `TemplateRef` ：
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * The outer and inner `TemplateRef` instances are assembled into views as follows:
 *
 * 外部和内部 `TemplateRef` 实例按如下方式组装到视图中：
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @publicApi
 */
export abstract class EmbeddedViewRef<C> extends ViewRef {
  /**
   * The context for this view, inherited from the anchor element.
   *
   * 该视图的上下文，继承自锚点元素。
   *
   */
  abstract get context(): C;

  /**
   * The root nodes for this embedded view.
   *
   * 此嵌入式视图的根节点。
   *
   */
  abstract get rootNodes(): any[];
}

export interface InternalViewRef extends ViewRef {
  detachFromAppRef(): void;
  attachToAppRef(appRef: ViewRefTracker): void;
}

/**
 * Interface for tracking root `ViewRef`s in `ApplicationRef`.
 *
 * NOTE: Importing `ApplicationRef` here directly creates circular dependency, which is why we have
 * a subset of the `ApplicationRef` interface `ViewRefTracker` here.
 */
export interface ViewRefTracker {
  detachView(viewRef: ViewRef): void;
}
