/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {injectChangeDetectorRef as render3InjectChangeDetectorRef} from '../render3/view_engine_compatibility';

/**
 * Base class for Angular Views, provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be rerendered.
 *
 * Angular 各种视图的基础类，提供变更检测功能。
 * 变更检测树会收集要检查的所有视图。
 * 使用这些方法从树中添加或移除视图、初始化变更检测并显式地把这些视图标记为*脏的*，意思是它们变了、需要重新渲染。
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * 下面的例子演示了如何修改默认的变更检测行为，以便在需要时执行显式变更检测。
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * ### 使用 `markForCheck()` 和 `CheckOnce` 策略
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](http://plnkr.co/edit/GC512b?p=preview).
 *
 * 下面的例子为组件设置了 `OnPush` 变更检测策略（`CheckOnce` 而不是默认的 `CheckAlways`），然后每隔一段时间强制进行第二轮检测。
 * 参见[在线例子](http://plnkr.co/edit/GC512b?p=preview)。
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * ### 分离开变更检测器以限制变更检测的发生频度
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * 下面的例子定义了一个带有只读数据的大型列表，这些数据预计每秒会变化很多次。
 * 为了提高性能，我们检测和更新列表的频率就应该比实际发生的变化少得多。
 * 要解决这个问题，就要分离开变更检测器，并每隔五秒钟显式执行一次变更检查。
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * ### 重新附加一个已分离的组件
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * 下面的例子创建了一个用来显示活动数据的组件。
 * 当 `live` 属性为 `false` 时，该组件就把它的变更检测器从主变更检测器树中分离出来，当该属性变为 `true` 时，则重新附加上它。
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="reattach"></code-example>
 *
 * @publicApi
 */
export abstract class ChangeDetectorRef {
  /**
   * When a view uses the {@link ChangeDetectionStrategy#OnPush OnPush} (checkOnce)
   * change detection strategy, explicitly marks the view as changed so that
   * it can be checked again.
   *
   * 当视图使用 {@link ChangeDetectionStrategy#OnPush OnPush}（`checkOnce`）变更检测策略时，把该视图显式标记为已更改，以便它再次进行检查。
   *
   * Components are normally marked as dirty (in need of rerendering) when inputs
   * have changed or events have fired in the view. Call this method to ensure that
   * a component is checked even if these triggers have not occured.
   *
   * 当输入已更改或视图中发生了事件时，组件通常会标记为脏的（需要重新渲染）。调用此方法会确保即使那些触发器没有被触发，也仍然检查该组件。
   *
   * <!-- TODO: Add a link to a chapter on OnPush components -->
   *
   */
  abstract markForCheck(): void;

  /**
   * Detaches this view from the change-detection tree.
   * A detached view is  not checked until it is reattached.
   * Use in combination with `detectChanges()` to implement local change detection checks.
   *
   * 从变更检测树中分离开视图。
   * 已分离的视图在重新附加上去之前不会被检查。
   * 与 `detectChanges()` 结合使用，可以实现局部变更检测。
   *
   * Detached views are not checked during change detection runs until they are
   * re-attached, even if they are marked as dirty.
   *
   * 即使已分离的视图已标记为脏的，它们在重新附加上去之前也不会被检查。
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   */
  abstract detach(): void;

  /**
   * Checks this view and its children. Use in combination with {@link ChangeDetectorRef#detach
   * detach}
   * to implement local change detection checks.
   *
   * 检查该视图及其子视图。与 {@link ChangeDetectorRef#detach detach} 结合使用可以实现局部变更检测。
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   */
  abstract detectChanges(): void;

  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * 检查变更检测器及其子检测器，如果检测到任何更改，则抛出异常。
   *
   * Use in development mode to verify that running change detection doesn't introduce
   * other changes.
   *
   * 在开发模式下可用来验证正在运行的变更检测器是否引入了其它变更。
   */
  abstract checkNoChanges(): void;

  /**
   * Re-attaches the previously detached view to the change detection tree.
   * Views are attached to the tree by default.
   *
   * 把以前分离开的视图重新附加到变更检测树上。
   * 视图会被默认附加到这棵树上。
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   *
   */
  abstract reattach(): void;

  /**
   * @internal
   * @nocollapse
   */
  static __NG_ELEMENT_ID__: () => ChangeDetectorRef = () => SWITCH_CHANGE_DETECTOR_REF_FACTORY();
}



export const SWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ = render3InjectChangeDetectorRef;
const SWITCH_CHANGE_DETECTOR_REF_FACTORY__PRE_R3__ = (...args: any[]): any => {};
const SWITCH_CHANGE_DETECTOR_REF_FACTORY: typeof render3InjectChangeDetectorRef =
    SWITCH_CHANGE_DETECTOR_REF_FACTORY__PRE_R3__;
