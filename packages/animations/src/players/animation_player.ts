/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {scheduleMicroTask} from '../util';

/**
 * Provides programmatic control of a reusable animation sequence,
 * built using the `build()` method of `AnimationBuilder`. The `build()` method
 * returns a factory, whose `create()` method instantiates and initializes this interface.
 *
 * 提供对可复用动画序列的编程控制，该动画序列是使用 `AnimationBuilder` 的 `build()` 方法构建的。 `build()` 方法返回一个工厂，其 `create()` 方法将实例化并初始化此接口。
 *
 * @see `AnimationBuilder`
 * @see `AnimationFactory`
 * @see `animate()`
 *
 * @publicApi
 */
export interface AnimationPlayer {
  /**
   * Provides a callback to invoke when the animation finishes.
   *
   * 提供当动画结束时要调用的回调。
   *
   * @param fn The callback function.
   *
   * 回调函数。
   *
   * @see `finish()`
   */
  onDone(fn: () => void): void;
  /**
   * Provides a callback to invoke when the animation starts.
   *
   * 提供当动画启动时要调用的回调。
   *
   * @param fn The callback function.
   *
   * 回调函数。
   *
   * @see `run()`
   */
  onStart(fn: () => void): void;
  /**
   * Provides a callback to invoke after the animation is destroyed.
   *
   * 提供当动画销毁后要调用的回调。
   *
   * @param fn The callback function.
   *
   * 回调函数。
   *
   * @see `destroy()`
   * @see `beforeDestroy()`
   */
  onDestroy(fn: () => void): void;
  /**
   * Initializes the animation.
   *
   * 初始化本动画。
   *
   */
  init(): void;
  /**
   * Reports whether the animation has started.
   *
   * 报告动画是否已开始。
   *
   * @returns True if the animation has started, false otherwise.
   *
   * 如果动画已开始，则为 true，否则为 false。
   *
   */
  hasStarted(): boolean;
  /**
   * Runs the animation, invoking the `onStart()` callback.
   *
   * 运行动画，并调用 `onStart()` 回调。
   *
   */
  play(): void;
  /**
   * Pauses the animation.
   *
   * 暂停动画。
   *
   */
  pause(): void;
  /**
   * Restarts the paused animation.
   *
   * 重新开始已暂停的动画。
   *
   */
  restart(): void;
  /**
   * Ends the animation, invoking the `onDone()` callback.
   *
   * 结束动画，并调用 `onDone()` 回调。
   *
   */
  finish(): void;
  /**
   * Destroys the animation, after invoking the `beforeDestroy()` callback.
   * Calls the `onDestroy()` callback when destruction is completed.
   *
   * 在调用 `beforeDestroy()` 回调后销毁动画。销毁完成时调用 `onDestroy()`。
   *
   */
  destroy(): void;
  /**
   * Resets the animation to its initial state.
   *
   * 将动画重置为其初始状态。
   *
   */
  reset(): void;
  /**
   * Sets the position of the animation.
   *
   * 设置动画的位置。
   *
   * @param position A 0-based offset into the duration, in milliseconds.
   *
   * 持续时间中从 0 开始的偏移量，以毫秒为单位。
   *
   */
  setPosition(position: any /** TODO #9100 */): void;
  /**
   * Reports the current position of the animation.
   *
   * 报告动画的当前位置。
   *
   * @returns A 0-based offset into the duration, in milliseconds.
   *
   * 持续时间中从 0 开始的偏移量，以毫秒为单位。
   *
   */
  getPosition(): number;
  /**
   * The parent of this player, if any.
   *
   * 此播放器的父项（如果有）。
   *
   */
  parentPlayer: AnimationPlayer|null;
  /**
   * The total run time of the animation, in milliseconds.
   *
   * 动画的总运行时间（以毫秒为单位）。
   *
   */
  readonly totalTime: number;
  /**
   * Provides a callback to invoke before the animation is destroyed.
   *
   * 提供在动画销毁之前要调用的回调。
   *
   */
  beforeDestroy?: () => any;
  /**
   * @internal
   * Internal
   */
  triggerCallback?: (phaseName: string) => void;
  /**
   * @internal
   * Internal
   */
  disabled?: boolean;
}

/**
 * An empty programmatic controller for reusable animations.
 * Used internally when animations are disabled, to avoid
 * checking for the null case when an animation player is expected.
 *
 * 用于可复用动画的空白程序控制器。当禁用动画时在内部使用，以免在要用动画播放器时检查其是否为 null。
 *
 * @see `animate()`
 * @see `AnimationPlayer`
 * @see `GroupPlayer`
 *
 * @publicApi
 */
export class NoopAnimationPlayer implements AnimationPlayer {
  private _onDoneFns: Function[] = [];
  private _onStartFns: Function[] = [];
  private _onDestroyFns: Function[] = [];
  private _started = false;
  private _destroyed = false;
  private _finished = false;
  public parentPlayer: AnimationPlayer|null = null;
  public readonly totalTime: number;
  constructor(duration: number = 0, delay: number = 0) {
    this.totalTime = duration + delay;
  }
  private _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(fn => fn());
      this._onDoneFns = [];
    }
  }
  onStart(fn: () => void): void {
    this._onStartFns.push(fn);
  }
  onDone(fn: () => void): void {
    this._onDoneFns.push(fn);
  }
  onDestroy(fn: () => void): void {
    this._onDestroyFns.push(fn);
  }
  hasStarted(): boolean {
    return this._started;
  }
  init(): void {}
  play(): void {
    if (!this.hasStarted()) {
      this._onStart();
      this.triggerMicrotask();
    }
    this._started = true;
  }

  /** @internal */
  triggerMicrotask() {
    scheduleMicroTask(() => this._onFinish());
  }

  private _onStart() {
    this._onStartFns.forEach(fn => fn());
    this._onStartFns = [];
  }

  pause(): void {}
  restart(): void {}
  finish(): void {
    this._onFinish();
  }
  destroy(): void {
    if (!this._destroyed) {
      this._destroyed = true;
      if (!this.hasStarted()) {
        this._onStart();
      }
      this.finish();
      this._onDestroyFns.forEach(fn => fn());
      this._onDestroyFns = [];
    }
  }
  reset(): void {}
  setPosition(position: number): void {}
  getPosition(): number {
    return 0;
  }

  /** @internal */
  triggerCallback(phaseName: string): void {
    const methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
    methods.forEach(fn => fn());
    methods.length = 0;
  }
}
