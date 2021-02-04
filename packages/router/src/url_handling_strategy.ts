/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {UrlTree} from './url_tree';

/**
 * @description
 *
 * Provides a way to migrate AngularJS applications to Angular.
 *
 * 提供一种将 AngularJS 应用程序迁移到 Angular 的方法。
 *
 * @publicApi
 */
export abstract class UrlHandlingStrategy {
  /**
   * Tells the router if this URL should be processed.
   *
   * 告诉路由器是否应处理此 URL。
   *
   * When it returns true, the router will execute the regular navigation.
   * When it returns false, the router will set the router state to an empty state.
   * As a result, all the active components will be destroyed.
   *
   * 当返回 true 时，路由器将执行常规导航。当返回 false 时，路由器会将路由器状态设置为空状态。结果，所有活动组件都将被破坏。
   *
   */
  abstract shouldProcessUrl(url: UrlTree): boolean;

  /**
   * Extracts the part of the URL that should be handled by the router.
   * The rest of the URL will remain untouched.
   *
   * 提取应由路由器处理的 URL 部分。 URL 的其余部分将保持不变。
   *
   */
  abstract extract(url: UrlTree): UrlTree;

  /**
   * Merges the URL fragment with the rest of the URL.
   *
   * 将 URL 片段与 URL 的其余部分合并。
   *
   */
  abstract merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree;
}

/**
 * @publicApi
 */
export class DefaultUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    return true;
  }
  extract(url: UrlTree): UrlTree {
    return url;
  }
  merge(newUrlPart: UrlTree, wholeUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}
