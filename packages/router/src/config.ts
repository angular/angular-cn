/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModuleFactory, NgModuleRef, Type} from '@angular/core';
import {Observable} from 'rxjs';

import {ActivatedRouteSnapshot} from './router_state';
import {UrlSegment, UrlSegmentGroup} from './url_tree';


/**
 * Represents a route configuration for the Router service.
 * An array of `Route` objects, used in `Router.config` and for nested route configurations
 * in `Route.children`.
 *
 * 表示路由器服务的路由配置。是一个 `Route` 对象的数组，用作 `Router.config` 和 `Route.children` 中的嵌套路由配置。
 *
 * @see `Route`
 * @see `Router`
 * @see [Router configuration guide](guide/router#configuration)
 *
 * [路由器配置指南](guide/router#configuration)
 *
 * @publicApi
 */
export type Routes = Route[];

/**
 * Represents the result of matching URLs with a custom matching function.
 *
 * 表示使用自定义匹配函数时的 URL 匹配结果。
 *
 * * `consumed` is an array of the consumed URL segments.
 *
 *    `consumed` 是一个表示已消费的 URL 片段的数组。
 *
 * * `posParams` is a map of positional parameters.
 *
 *   `posParams` 是一个位置型参数的映射表。
 *
 * @see `UrlMatcher()`
 * @publicApi
 */
export type UrlMatchResult = {
  consumed: UrlSegment[];
  posParams?: {[name: string]: UrlSegment};
};

/**
 * A function for matching a route against URLs. Implement a custom URL matcher
 * for `Route.matcher` when a combination of `path` and `pathMatch`
 * is not expressive enough. Cannot be used together with `path` and `pathMatch`.
 *
 * 一个用于匹配路由和 URL 的函数。
 * 当 `path` 和 `pathMatch` 的组合不足以表达时，可以为 `Route.matcher` 实现一个自定义的 URL 匹配器。
 *
 * The function takes the following arguments and returns a `UrlMatchResult` object.
 *
 * 该函数采用以下参数，并返回一个 `UrlMatchResult` 对象。
 *
 * * *segments* : An array of URL segments.
 *
 *   *segment* ：URL 段的数组。
 *
 * * *group* : A segment group.
 *
 *   *group* ：段组。
 *
 * * *route* : The route to match against.
 *
 *   *route* ：要匹配的路由。
 *
 * The following example implementation matches HTML files.
 *
 * 下列例子中实现的匹配器会匹配 HTML 文件。
 *
 * ```
 * export function htmlFiles(url: UrlSegment[]) {
 *   return url.length === 1 && url[0].path.endsWith('.html') ? ({consumed: url}) : null;
 * }
 *
 * export const routes = [{ matcher: htmlFiles, component: AnyComponent }];
 * ```
 *
 * @publicApi
 */
export type UrlMatcher = (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) =>
    UrlMatchResult|null;

/**
 *
 * Represents static data associated with a particular route.
 *
 * 表示与特定路由关联的静态数据。
 *
 * @see `Route#data`
 *
 * @publicApi
 */
export type Data = {
  [name: string]: any
};

/**
 *
 * Represents the resolved data associated with a particular route.
 *
 * 表示与特定路由关联的已解析数据。
 *
 * @see `Route#resolve`.
 *
 * @publicApi
 */
export type ResolveData = {
  [name: string]: any
};

/**
 *
 * A function that is called to resolve a collection of lazy-loaded routes.
 * Must be an arrow function of the following form:
 * `() => import('...').then(mod => mod.MODULE)`
 *
 * 调用此函数以解析惰性加载的路由集合。必须是以下形式的箭头函数： `() => import('...').then(mod => mod.MODULE)`
 *
 * For example:
 *
 * 例如：
 *
 * ```
 * [{
 *   path: 'lazy',
 *   loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule),
 * }];
 * ```
 *
 * @see [Route.loadChildren](api/router/Route#loadChildren)
 * @publicApi
 */
export type LoadChildrenCallback = () => Type<any>|NgModuleFactory<any>|Observable<Type<any>>|
    Promise<NgModuleFactory<any>|Type<any>|any>;

/**
 *
 * A function that returns a set of routes to load.
 *
 * 本函数返回一组要加载的路由。
 *
 * The string form of `LoadChildren` is deprecated (see `DeprecatedLoadChildren`). The function
 * form (`LoadChildrenCallback`) should be used instead.
 *
 * 不推荐使用 `LoadChildren` 的字符串形式（参见 `DeprecatedLoadChildren`）。应该改用函数形式（`LoadChildrenCallback`）。
 *
 * @see `loadChildrenCallback`
 * @publicApi
 */
export type LoadChildren = LoadChildrenCallback|DeprecatedLoadChildren;

/**
 * A string of the form `path/to/file#exportName` that acts as a URL for a set of routes to load.
 *
 * 格式为 `path/to/file#exportName` ，用作要加载的一组路由的 URL。
 *
 * @see `loadChildrenCallback`
 * @publicApi
 * @deprecated The `string` form of `loadChildren` is deprecated in favor of the
 * `LoadChildrenCallback` function which uses the ES dynamic `import()` expression.
 * This offers a more natural and standards-based mechanism to dynamically
 * load an ES module at runtime.
 *
 * 不推荐使用 `loadChildren` 的 `string` 形式，而推荐使用使用 ES 的动态 `import()` 表达式 `LoadChildrenCallback`。这提供了一种更自然且基于标准的机制，可在运行时动态加载 ES 模块。
 *
 */
export type DeprecatedLoadChildren = string;

/**
 *
 * How to handle query parameters in a router link.
 * One of:
 *
 * 如何处理路由器链接中的查询参数。为下列值之一：
 *
 * - `merge` : Merge new with current parameters.
 *
 *   `merge` ：合并新的当前参数。
 *
 * - `preserve` : Preserve current parameters.
 *
 *   `preserve` ：保留当前参数。
 *
 * @see `UrlCreationOptions#queryParamsHandling`
 * @see `RouterLink`
 * @publicApi
 */
export type QueryParamsHandling = 'merge'|'preserve'|'';

/**
 *
 * A policy for when to run guards and resolvers on a route.
 *
 * 何时在路由上运行守卫（guard）和解析器（resolver）的策略。
 *
 * @see [Route.runGuardsAndResolvers](api/router/Route#runGuardsAndResolvers)
 * @publicApi
 */
export type RunGuardsAndResolvers =
    'pathParamsChange'|'pathParamsOrQueryParamsChange'|'paramsChange'|'paramsOrQueryParamsChange'|
    'always'|((from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot) => boolean);

/**
 * A configuration object that defines a single route.
 * A set of routes are collected in a `Routes` array to define a `Router` configuration.
 * The router attempts to match segments of a given URL against each route,
 * using the configuration options defined in this object.
 *
 * 定义单个路由的配置对象。在 `Routes` 数组中收集了一组路由定义，以用作 `Router` 的配置。路由器会尝试使用此对象中定义的配置选项，将给定 URL 段与每个路由进行匹配。
 *
 * Supports static, parameterized, redirect, and wildcard routes, as well as
 * custom route data and resolve methods.
 *
 * 支持静态、参数化、重定向和通配符路由，以及自定义路由数据和解析方法。
 *
 * For detailed usage information, see the [Routing Guide](guide/router).
 *
 * 欲知详情，请参阅[《路由指南》](guide/router) 。
 *
 * @usageNotes
 *
 * ### Simple Configuration
 *
 * ### 简单配置
 *
 * The following route specifies that when navigating to, for example,
 * `/team/11/user/bob`, the router creates the 'Team' component
 * with the 'User' child component in it.
 *
 * 以下路由指定在导航到 `/team/11/user/bob` 时，路由器会在其中创建带有 'User' 子组件的 'Team' 组件。
 *
 * ```
 * [{
 *   path: 'team/:id',
  *  component: Team,
 *   children: [{
 *     path: 'user/:name',
 *     component: User
 *   }]
 * }]
 * ```
 *
 * ### Multiple Outlets
 *
 * ### 多重出口
 *
 * The following route creates sibling components with multiple outlets.
 * When navigating to `/team/11(aux:chat/jim)`, the router creates the 'Team' component next to
 * the 'Chat' component. The 'Chat' component is placed into the 'aux' outlet.
 *
 * 以下路由创建具有多个出口的兄弟组件。当导航到 `/team/11(aux:chat/jim)` 时，路由器会在 'Chat' 组件旁边创建 'Team' 组件。 'Chat' 组件放置在 'aux' 出口中。
 *
 * ```
 * [{
 *   path: 'team/:id',
 *   component: Team
 * }, {
 *   path: 'chat/:user',
 *   component: Chat
 *   outlet: 'aux'
 * }]
 * ```
 *
 * ### Wild Cards
 *
 * ### 通配符
 *
 * The following route uses wild-card notation to specify a component
 * that is always instantiated regardless of where you navigate to.
 *
 * 以下路由使用通配符表示法来指定始终实例化的组件，无论你导航到何处。
 *
 * ```
 * [{
 *   path: '**',
 *   component: WildcardComponent
 * }]
 * ```
 *
 * ### Redirects
 *
 * ### 重定向
 *
 * The following route uses the `redirectTo` property to ignore a segment of
 * a given URL when looking for a child path.
 *
 * 当寻找子路径时，以下路由使用 `redirectTo` 属性忽略给定 URL 的一部分。
 *
 * When navigating to '/team/11/legacy/user/jim', the router changes the URL segment
 * '/team/11/legacy/user/jim' to '/team/11/user/jim', and then instantiates
 * the Team component with the User child component in it.
 *
 * 导航到 '/team/11/legacy/user/jim' 时，路由器将 URL 段 '/team/11/legacy/user/jim' 更改为 '/team/11/user/jim'，然后实例化 Team 组件以及其中的 User 子组件。
 *
 * ```
 * [{
 *   path: 'team/:id',
 *   component: Team,
 *   children: [{
 *     path: 'legacy/user/:name',
 *     redirectTo: 'user/:name'
 *   }, {
 *     path: 'user/:name',
 *     component: User
 *   }]
 * }]
 * ```
 *
 * The redirect path can be relative, as shown in this example, or absolute.
 * If we change the `redirectTo` value in the example to the absolute URL segment '/user/:name',
 * the result URL is also absolute, '/user/jim'.
 *
 * 重定向路径可以是相对的（如本示例所示），也可以是绝对的。 `redirectTo` 值更改为绝对 URL 段 '/user/:name'，则结果 URL 也是绝对 URL，'/user/jim'。
 *

 * ### Empty Path
 *
 * ### 空路径
 *
 * Empty-path route configurations can be used to instantiate components that do not 'consume'
 * any URL segments.
 *
 * 空路径路由可用来实例化一些不"消费"任何 url 区段的组件。
 *
 * In the following configuration, when navigating to
 * `/team/11`, the router instantiates the 'AllUsers' component.
 *
 * 在下列配置中，当导航到 `/team/11` 时，路由器会实例化 'AllUsers' 组件。
 *
 * ```
 * [{
 *   path: 'team/:id',
 *   component: Team,
 *   children: [{
 *     path: '',
 *     component: AllUsers
 *   }, {
 *     path: 'user/:name',
 *     component: User
 *   }]
 * }]
 * ```
 *
 * Empty-path routes can have children. In the following example, when navigating
 * to `/team/11/user/jim`, the router instantiates the wrapper component with
 * the user component in it.
 *
 * 空路径路由可以有子路由。在以下示例中，当导航到 `/team/11/user/jim` 时，路由器会实例化带有用户组件的包装器组件。
 *
 * Note that an empty path route inherits its parent's parameters and data.
 *
 * 请注意，空路径路由会继承其父级的参数和数据。
 *
 * ```
 * [{
 *   path: 'team/:id',
 *   component: Team,
 *   children: [{
 *     path: '',
 *     component: WrapperCmp,
 *     children: [{
 *       path: 'user/:name',
 *       component: User
 *     }]
 *   }]
 * }]
 * ```
 *
 * ### Matching Strategy
 *
 * ### 匹配策略
 *
 * The default path-match strategy is 'prefix', which means that the router
 * checks URL elements from the left to see if the URL matches a specified path.
 * For example, '/team/11/user' matches 'team/:id'.
 *
 * 默认的路径匹配策略是 'prefix'，这意味着路由器从左开始检查 URL 元素以查看 URL 是否与指定的路径匹配。例如，'/team/11/user' 与 'team/:id' 匹配。
 *
 * ```
 * [{
 *   path: '',
 *   pathMatch: 'prefix', //default
 *   redirectTo: 'main'
 * }, {
 *   path: 'main',
 *   component: Main
 * }]
 * ```
 *
 * You can specify the path-match strategy 'full' to make sure that the path
 * covers the whole unconsumed URL. It is important to do this when redirecting
 * empty-path routes. Otherwise, because an empty path is a prefix of any URL,
 * the router would apply the redirect even when navigating to the redirect destination,
 * creating an endless loop.
 *
 * 你可以将路径匹配策略指定为 'full'，以确保路径覆盖整个未使用的 URL。重定向到空路径路由时，这样做很重要。否则，因为空路径是任何 URL 的前缀，所以路由器即使在导航到重定向目标时又会被再次重定向，从而造成无限循环。
 *
 * In the following example, supplying the 'full' `pathMatch` strategy ensures
 * that the router applies the redirect if and only if navigating to '/'.
 *
 * 在以下示例中，提供 'full' `pathMatch` 策略可确保路由器仅在导航到 '/' 时才应用重定向。
 *
 * ```
 * [{
 *   path: '',
 *   pathMatch: 'full',
 *   redirectTo: 'main'
 * }, {
 *   path: 'main',
 *   component: Main
 * }]
 * ```
 *
 * ### Componentless Routes
 *
 * ### 无组件路由
 *
 * You can share parameters between sibling components.
 * For example, suppose that two sibling components should go next to each other,
 * and both of them require an ID parameter. You can accomplish this using a route
 * that does not specify a component at the top level.
 *
 * 你可以在同级组件之间共享参数。例如，假设两个同级组件应该彼此相邻，并且它们两个都需要 ID 参数。你可以使用不在顶层指定组件的路由来完成此操作。
 *
 * In the following example, 'MainChild' and 'AuxChild' are siblings.
 * When navigating to 'parent/10/(a//aux:b)', the route instantiates
 * the main child and aux child components next to each other.
 * For this to work, the application component must have the primary and aux outlets defined.
 *
 * 在以下示例中，'MainChild' 和 'AuxChild' 是同级。当导航到 'parent/10/(a//aux:b)' 时，该路由会实例化彼此相邻的主要子组件和 aux 子组件。为此，应用程序组件必须定义主要和辅助出口。
 *
 * ```
 * [{
 *    path: 'parent/:id',
 *    children: [
 *      { path: 'a', component: MainChild },
 *      { path: 'b', component: AuxChild, outlet: 'aux' }
 *    ]
 * }]
 * ```
 *
 * The router merges the parameters, data, and resolve of the componentless
 * parent into the parameters, data, and resolve of the children.
 *
 * 路由器将无组件父级的参数、数据和解析结果合并为子级的参数、数据和解析结果。
 *
 * This is especially useful when child components are defined
 * with an empty path string, as in the following example.
 * With this configuration, navigating to '/parent/10' creates
 * the main child and aux components.
 *
 * 当用空路径字符串定义子组件时，这特别有用，如以下示例所示。使用此配置，导航到 '/parent/10' 将创建主要子组件和 aux 组件。
 *
 * ```
 * [{
 *    path: 'parent/:id',
 *    children: [
 *      { path: '', component: MainChild },
 *      { path: '', component: AuxChild, outlet: 'aux' }
 *    ]
 * }]
 * ```
 *
 * ### Lazy Loading
 *
 * ### 惰性加载
 *
 * Lazy loading speeds up application load time by splitting the application
 * into multiple bundles and loading them on demand.
 * To use lazy loading, provide the `loadChildren` property in the `Route` object,
 * instead of the `children` property.
 *
 * 惰性加载通过将应用程序拆分为多个包并按需加载它们来加快应用程序加载时间。要使用惰性加载，请在 `Route` 中提供 `loadChildren` 属性，而不是 `children` 属性。
 *
 * Given the following example route, the router will lazy load
 * the associated module on demand using the browser native import system.
 *
 * 给定以下示例路由，路由器将使用浏览器原生导入体系按需惰性加载相关模块。
 *
 * ```
 * [{
 *   path: 'lazy',
 *   loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule),
 * }];
 * ```
 *
 * @publicApi
 */
export interface Route {
  /**
   * The path to match against. Cannot be used together with a custom `matcher` function.
   * A URL string that uses router matching notation.
   * Can be a wild card (`**`) that matches any URL (see Usage Notes below).
   * Default is "/" (the root path).
   *
   * 匹配的路径。不能与自定义 `matcher` 功能一起使用。使用路由器匹配表示法的 URL 字符串。可以是与任何 URL 匹配的通配符（`**`）（请参阅下面的使用说明）。默认值为 “/”（根路径）。
   *
   */
  path?: string;
  /**
   * The path-matching strategy, one of 'prefix' or 'full'.
   * Default is 'prefix'.
   *
   * 路径匹配策略，为 “prefix” 或 “full” 之一。默认为“prefix”。
   *
   * By default, the router checks URL elements from the left to see if the URL
   * matches a given  path, and stops when there is a match. For example,
   * '/team/11/user' matches 'team/:id'.
   *
   * 默认情况下，路由器会从左边开始检查 URL 中的各个元素，以查看此 URL 是否匹配给定的路径，遇到任何一个匹配的，就停止。比如，'/team/11/user' 能匹配 'team/:id'。
   *
   * The path-match strategy 'full' matches against the entire URL.
   * It is important to do this when redirecting empty-path routes.
   * Otherwise, because an empty path is a prefix of any URL,
   * the router would apply the redirect even when navigating
   * to the redirect destination, creating an endless loop.
   *
   * 路径匹配策略 “full” 表示与整个 URL 匹配。重定向空路径路由时，执行此操作很重要。否则，因为空路径是任何 URL 的前缀，所以路由器即使在导航到重定向目标时也会进行重定向，从而造成无限循环。
   *
   */
  pathMatch?: string;
  /**
   * A custom URL-matching function. Cannot be used together with `path`.
   *
   * 自定义 URL 匹配功能。不能与 `path` 一起使用。
   *
   */
  matcher?: UrlMatcher;
  /**
   * The component to instantiate when the path matches.
   * Can be empty if child routes specify components.
   *
   * 路径匹配时实例化的组件。如果要由其子路由指定组件，则可以为空。
   *
   */
  component?: Type<any>;
  /**
   * A URL to redirect to when the path matches.
   * Absolute if the URL begins with a slash (/), otherwise relative to the path URL.
   * When not present, router does not redirect.
   *
   * 路径匹配时重定向到的 URL。如果 URL 以斜杠（/）开头，则为绝对值，否则相对于当前路径 URL。如果不存在，则路由器不会重定向。
   *
   */
  redirectTo?: string;
  /**
   * Name of a `RouterOutlet` object where the component can be placed
   * when the path matches.
   *
   * `RouterOutlet` 对象的名字，当路径匹配时会把组件放置在其中。
   */
  outlet?: string;
  /**
   * An array of dependency-injection tokens used to look up `CanActivate()`
   * handlers, in order to determine if the current user is allowed to
   * activate the component. By default, any user can activate.
   *
   * 一组依赖项注入令牌，用于查找 `CanActivate()` 处理器，以确定是否允许当前用户激活该组件。默认情况下，任何用户都可以激活。
   *
   */
  canActivate?: any[];
  /**
   * An array of DI tokens used to look up `CanActivateChild()` handlers,
   * in order to determine if the current user is allowed to activate
   * a child of the component. By default, any user can activate a child.
   *
   * DI 令牌数组，用于查找 `CanActivateChild()` 处理器，以确定是否允许当前用户激活组件的子级。默认情况下，任何用户都可以激活子路由。
   *
   */
  canActivateChild?: any[];
  /**
   * An array of DI tokens used to look up `CanDeactivate()`
   * handlers, in order to determine if the current user is allowed to
   * deactivate the component. By default, any user can deactivate.
   *
   * DI 令牌数组，用于查找 `CanDeactivate()` 处理器，以确定是否允许当前用户停用该组件。默认情况下，任何用户都可以停用。
   *
   */
  canDeactivate?: any[];
  /**
   * An array of DI tokens used to look up `CanLoad()`
   * handlers, in order to determine if the current user is allowed to
   * load the component. By default, any user can load.
   *
   * DI 令牌数组，用于查找 `CanLoad()` 处理器，以确定是否允许当前用户加载组件。默认情况下，任何用户都可以加载。
   *
   */
  canLoad?: any[];
  /**
   * Additional developer-defined data provided to the component via
   * `ActivatedRoute`. By default, no additional data is passed.
   *
   * `ActivatedRoute` 提供给组件的由开发人员定义的额外数据。默认情况下，不传递任何额外数据。
   *
   */
  data?: Data;
  /**
   * A map of DI tokens used to look up data resolvers. See `Resolve`.
   *
   * DI 令牌的映射，用于查找数据解析器。请参阅 `Resolve` 。
   *
   */
  resolve?: ResolveData;
  /**
   * An array of child `Route` objects that specifies a nested route
   * configuration.
   *
   * 一个子 `Route` 对象数组，用于指定嵌套路由配置。
   *
   */
  children?: Routes;
  /**
   * An object specifying lazy-loaded child routes.
   *
   * 一个对象，指定要惰性加载的子路由。
   *
   */
  loadChildren?: LoadChildren;
  /**
   * Defines when guards and resolvers will be run. One of
   *
   * 定义何时运行守卫（guard）和解析器（resolver）。为下列值之一
   *
   * - `paramsOrQueryParamsChange` : Run when query parameters change.
   *
   *   `paramsOrQueryParamsChange` ：当查询参数发生变化时运行。
   *
   * - `always` : Run on every execution.
   * By default, guards and resolvers run only when the matrix
   * parameters of the route change.
   *
   *     `always` ：在每次执行时运行。默认情况下，仅当路由的矩阵参数发生更改时，守卫和解析器才会运行。
   */
  runGuardsAndResolvers?: RunGuardsAndResolvers;
  /**
   * Filled for routes with `loadChildren` once the module has been loaded
   *
   * 模块加载后，使用 `loadChildren` 填充进来的路由
   *
   * @internal
   */
  _loadedConfig?: LoadedRouterConfig;
}

export class LoadedRouterConfig {
  constructor(public routes: Route[], public module: NgModuleRef<any>) {}
}
