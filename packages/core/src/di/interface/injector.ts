/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Injection flags for DI.
 *
 * DI 的注入标志。
 *
 * @publicApi
 */
export enum InjectFlags {
  // TODO(alxhub): make this 'const' when ngc no longer writes exports of it into ngfactory files.

  /**
   * Check self and check parent injector if needed
   *
   * 检查自身并检查父注入器（如果需要）
   *
   */
  Default = 0b0000,
  /**
   * Specifies that an injector should retrieve a dependency from any injector until reaching the
   * host element of the current component. (Only used with Element Injector)
   *
   * 指定注入器应从任何注入器中检索依赖项，直到到达当前组件的宿主元素为止。（仅与元素注入器一起使用）
   *
   */
  Host = 0b0001,
  /**
   * Don't ascend to ancestors of the node requesting injection.
   *
   * 不要上升到请求注入的节点的祖先去处理。
   *
   */
  Self = 0b0010,
  /**
   * Skip the node that is requesting injection.
   *
   * 跳过请求注入的节点。
   *
   */
  SkipSelf = 0b0100,
  /**
   * Inject `defaultValue` instead if token not found.
   *
   * 如果找不到令牌，则注入 `defaultValue`
   *
   */
  Optional = 0b1000,
}
