/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {AnimationMetadata, AnimationOptions} from './animation_metadata';
import {AnimationPlayer} from './players/animation_player';

/**
 * An injectable service that produces an animation sequence programmatically within an
 * Angular component or directive.
 * Provided by the `BrowserAnimationsModule` or `NoopAnimationsModule`.
 *
 * 一种可注入服务，可在 Angular 组件或指令中以编程的方式生成动画序列。由 `BrowserAnimationsModule` 或 `NoopAnimationsModule` 提供。
 *
 * @usageNotes
 *
 * To use this service, add it to your component or directive as a dependency.
 * The service is instantiated along with your component.
 *
 * 要使用此服务，请将其作为依赖项添加到你的组件或指令中。该服务与你的组件一起实例化。
 *
 * Apps do not typically need to create their own animation players, but if you
 * do need to, follow these steps:
 *
 * 应用通常不需要创建自己的动画播放器，但是如果需要，请按照以下步骤操作：
 *
 * 1. Use the `build()` method to create a programmatic animation using the
 * `animate()` function. The method returns an `AnimationFactory` instance.
 *
 *       使用 `build()` 方法创建一个用 `animate()` 函数创建的程序性动画。该方法返回一个 `AnimationFactory` 实例。
 *
 * 2. Use the factory object to create an `AnimationPlayer` and attach it to a DOM element.
 *
 *    使用工厂对象创建 `AnimationPlayer` 并将其附加到 DOM 元素。
 *
 * 3. Use the player object to control the animation programmatically.
 *
 *    使用播放器对象以编程方式控制动画。
 *
 * For example:
 *
 * 例如：
 *
 * ```ts
 * // import the service from BrowserAnimationsModule
 * import {AnimationBuilder} from '@angular/animations';
 * // require the service as a dependency
 * class MyCmp {
 *   constructor(private _builder: AnimationBuilder) {}
 *
 *   makeAnimation(element: any) {
 *     // first define a reusable animation
 *     const myAnimation = this._builder.build([
 *       style({ width: 0 }),
 *       animate(1000, style({ width: '100px' }))
 *     ]);
 *
 *     // use the returned factory object to create a player
 *     const player = myAnimation.create(element);
 *
 *     player.play();
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export abstract class AnimationBuilder {
  /**
   * Builds a factory for producing a defined animation.
   *
   * 建立一个工厂来产生所定义的动画。
   *
   * @param animation A reusable animation definition.
   *
   * 可复用的动画定义。
   *
   * @returns A factory object that can create a player for the defined animation.
   *
   * 可以为所定义的动画创建播放器的工厂对象。
   *
   * @see `animate()`
   */
  abstract build(animation: AnimationMetadata|AnimationMetadata[]): AnimationFactory;
}

/**
 * A factory object returned from the `AnimationBuilder`.`build()` method.
 *
 * 从 `AnimationBuilder`.`build()` 方法返回的工厂对象。。
 *
 * @publicApi
 */
export abstract class AnimationFactory {
  /**
   * Creates an `AnimationPlayer` instance for the reusable animation defined by
   * the `AnimationBuilder`.`build()` method that created this factory.
   * Attaches the new player a DOM element.
   *
   * 创建一个 `AnimationPlayer` 实例，是由 `AnimationBuilder`.`build()` 方法定义的可复用动画。把这个新的播放器实例附加到一个 DOM 元素上。
   *
   * @param element The DOM element to which to attach the animation.
   *
   * 要将动画附加到的 DOM 元素。
   *
   * @param options A set of options that can include a time delay and
   * additional developer-defined parameters.
   *
   * 一组选项，可以包括延迟时间和其他由开发人员定义的参数。
   *
   */
  abstract create(element: any, options?: AnimationOptions): AnimationPlayer;
}
