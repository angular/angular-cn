/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Defines template and style encapsulation options available for Component's {@link Component}.
 *
 * 定义可用于 Component 的 {@link Component} 的模板和样式封装选项。
 *
 * See {@link Component#encapsulation encapsulation}.
 *
 * 请参阅 {@link Component#encapsulation encapsulation}。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * {@example core/ts/metadata/encapsulation.ts region='longform'}
 *
 * @publicApi
 */
export enum ViewEncapsulation {
  /**
   * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
   * Element and pre-processing the style rules provided via {@link Component#styles styles} or
   * {@link Component#styleUrls styleUrls}, and adding the new Host Element attribute to all
   * selectors.
   *
   * 通过向宿主元素添加包含替代 ID 的属性并预处理通过 {@link Component#styles styles} 或 {@link Component#styleUrls styleUrls} 提供的样式规则，来模拟 `Native` 所有选择器。
   *
   * This is the default option.
   *
   * 这是默认选项。
   */
  Emulated = 0,

  // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.

  /**
   * Don't provide any template or style encapsulation.
   *
   * 不要提供任何模板或样式封装。
   *
   */
  None = 2,

  /**
   * Use Shadow DOM to encapsulate styles.
   *
   * 使用 Shadow DOM 封装样式。
   *
   * For the DOM this means using modern [Shadow
   * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
   * creating a ShadowRoot for Component's Host Element.
   *
   * 对于 DOM，这意味着使用现代的 [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) 并为组件的 Host 元素创建 ShadowRoot。
   *
   */
  ShadowDom = 3
}
