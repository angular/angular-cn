/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An instance of this class is returned as an event parameter when an animation
 * callback is captured for an animation either during the start or done phase.
 *
 * 在开始或完成阶段调用已捕获动画的回调时，将此类的实例作为事件参数返回。
 *
 * ```typescript
 * @Component({
 *   host: {
 *     '[@myAnimationTrigger]': 'someExpression',
 *     '(@myAnimationTrigger.start)': 'captureStartEvent($event)',
 *     '(@myAnimationTrigger.done)': 'captureDoneEvent($event)',
 *   },
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *        // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   someExpression: any = false;
 *   captureStartEvent(event: AnimationEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 *
 *   captureDoneEvent(event: AnimationEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export interface AnimationEvent {
  /**
   * The name of the state from which the animation is triggered.
   *
   * 触发动画的状态的名称。
   *
   */
  fromState: string;
  /**
   * The name of the state in which the animation completes.
   *
   * 动画完成状态的名称。
   *
   */
  toState: string;
  /**
   * The time it takes the animation to complete, in milliseconds.
   *
   * 动画完成所花费的时间（以毫秒为单位）。
   *
   */
  totalTime: number;
  /**
   * The animation phase in which the callback was invoked, one of
   * "start" or "done".
   *
   * 调用此回调的动画阶段，是 "start" 或 "done" 之一。
   *
   */
  phaseName: string;
  /**
   * The element to which the animation is attached.
   *
   * 动画附加到的元素。
   *
   */
  element: any;
  /**
   * Internal.
   *
   * 内部。
   *
   */
  triggerName: string;
  /**
   * Internal.
   *
   * 内部。
   *
   */
  disabled: boolean;
}
