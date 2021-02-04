/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ComponentRef} from '@angular/core';

import {OutletContext} from './router_outlet_context';
import {ActivatedRoute, ActivatedRouteSnapshot} from './router_state';
import {TreeNode} from './utils/tree';

/**
 * @description
 *
 * Represents the detached route tree.
 *
 * 表示已分离的路由树。
 *
 * This is an opaque value the router will give to a custom route reuse strategy
 * to store and retrieve later on.
 *
 * 这是路由器提供给自定义路由复用策略的不透明值，以便以后存储和检索。
 *
 * @publicApi
 */
export type DetachedRouteHandle = {};

/** @internal */
export type DetachedRouteHandleInternal = {
  contexts: Map<string, OutletContext>,
  componentRef: ComponentRef<any>,
  route: TreeNode<ActivatedRoute>,
};

/**
 * @description
 *
 * Provides a way to customize when activated routes get reused.
 *
 * 提供一种自定义复用已激活路由的方式。
 *
 * @publicApi
 */
export abstract class RouteReuseStrategy {
  /**
   * Determines if this route (and its subtree) should be detached to be reused later
   *
   * 确定是否应分离此路由（及其子树）以便以后复用
   *
   */
  abstract shouldDetach(route: ActivatedRouteSnapshot): boolean;

  /**
   * Stores the detached route.
   *
   * 存储分离的路由。
   *
   * Storing a `null` value should erase the previously stored value.
   *
   * 存储 `null` 值应清除先前存储的值。
   *
   */
  abstract store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle|null): void;

  /**
   * Determines if this route (and its subtree) should be reattached
   *
   * 确定是否应重新连接此路由（及其子树）
   *
   */
  abstract shouldAttach(route: ActivatedRouteSnapshot): boolean;

  /**
   * Retrieves the previously stored route
   *
   * 检索以前存储的路由
   *
   */
  abstract retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null;

  /**
   * Determines if a route should be reused
   *
   * 确定是否应复用路由
   *
   */
  abstract shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
}

/**
 * @description
 *
 * This base route reuse strategy only reuses routes when the matched router configs are
 * identical. This prevents components from being destroyed and recreated
 * when just the fragment or query parameters change
 * (that is, the existing component is _reused_).
 *
 * 此基本路由复用策略仅在匹配的路由器配置完全相同时复用路由。这样可以防止仅在片段或查询参数发生更改时销毁和重新创建组件（也就是*复用*现有组件）。
 *
 * This strategy does not store any routes for later reuse.
 *
 * 此策略不存储任何路由供以后复用。
 *
 * Angular uses this strategy by default.
 *
 * Angular 默认使用此策略。
 *
 * It can be used as a base class for custom route reuse strategies, i.e. you can create your own
 * class that extends the `BaseRouteReuseStrategy` one.
 *
 * 它可以用作自定义路由复用策略的基类，即，你可以创建自己的类来扩展 `BaseRouteReuseStrategy` 。
 *
 * @publicApi
 */
export abstract class BaseRouteReuseStrategy implements RouteReuseStrategy {
  /**
   * Whether the given route should detach for later reuse.
   * Always returns false for `BaseRouteReuseStrategy`.
   *
   * 给定的路由是否应该分离以便以后复用。`BaseRouteReuseStrategy` 始终返回 false。
   *
   * */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   *
   * 无操作；永远不会存储该路由，因为此策略永远不会分离路由以供以后复用。
   *
   */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}

  /**
   * Returns `false`, meaning the route (and its subtree) is never reattached
   *
   * 返回 `false` ，表示路由（及其子树）从不重新连接
   *
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * Returns `null` because this strategy does not store routes for later re-use.
   *
   * 返回 `null`，因为此策略不存储路由供以后复用。
   *
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    return null;
  }

  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are
   * identical.
   *
   * 确定是否应复用路由。当将来的路由配置和当前的路由配置相同时，此策略将返回 `true`
   *
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

export class DefaultRouteReuseStrategy extends BaseRouteReuseStrategy {}
