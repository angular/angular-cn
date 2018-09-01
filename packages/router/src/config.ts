/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModuleFactory, NgModuleRef, Type} from '@angular/core';
import {Observable} from 'rxjs';
import {EmptyOutletComponent} from './components/empty_outlet';
import {PRIMARY_OUTLET} from './shared';
import {UrlSegment, UrlSegmentGroup} from './url_tree';

/**
 * @description
 *
 * Represents router configuration.
 *
 * 表示路由器配置。
 *
 * `Routes` is an array of route configurations. Each one has the following properties:
 *
 * `Routes` 是个表示路由配置的数组。每一个都具有下列属性：
 *
 * - `path` is a string that uses the route matcher DSL.
 *
 *   `path` 是一个用于路由匹配 DSL 中的字符串。
 *
 * - `pathMatch` is a string that specifies the matching strategy.
 *
 *   `pathMatch`是一个用来指定路由匹配策略的字符串。
 *
 * - `matcher` defines a custom strategy for path matching and supersedes `path` and `pathMatch`.
 *
 *   `matcher` 定义了一个用于路径匹配的自定义策略，指定了它就会代替 `path` 和 `pathMatch`。
 *
 * - `component` is a component type.
 *
 *   `component` 是一个组件类型。
 *
 * - `redirectTo` is the url fragment which will replace the current matched segment.
 *
 *   `redirectTo` 是一个 URL 片段，它将会代替当前匹配的 URL 片段。
 *
 * - `outlet` is the name of the outlet the component should be placed into.
 *
 *   `outlet` 是该组件要放进的出口的名字。
 *
 * - `canActivate` is an array of DI tokens used to look up CanActivate handlers. See
 *   `CanActivate` for more info.
 *
 *   `canActivate` 是一个 DI 令牌的数组，用于查阅 `CanActivate` 处理器，欲知详情，参见 `CanActivate`。
 *
 * - `canActivateChild` is an array of DI tokens used to look up CanActivateChild handlers. See
 *   `CanActivateChild` for more info.
 *
 *   `canActivateChild` 是一个 DI 令牌的数组，用于查阅 `CanActivateChild` 处理器，欲知详情，参见 `CanActivateChild`。
 *
 * - `canDeactivate` is an array of DI tokens used to look up CanDeactivate handlers. See
 *   `CanDeactivate` for more info.
 *
 *   `canDeactivate` 是一个 DI 令牌的数组，用于查阅 `CanDeactivate` 处理器，欲知详情，参见 `CanDeactivate`。
 *
 * - `canLoad` is an array of DI tokens used to look up CanLoad handlers. See
 *   `CanLoad` for more info.
 *
 *   `canLoad` 是一个 DI 令牌的数组，用于查阅 `CanLoad` 处理器，欲知详情，参见 `CanLoad`。
 *
 * - `data` is additional data provided to the component via `ActivatedRoute`.
 *
 *   `data` 是一个可通过 `ActivatedRoute` 提供给组件的附加数据。
 *
 * - `resolve` is a map of DI tokens used to look up data resolvers. See `Resolve` for more
 *   info.
 *
 *   `resolve` 是一个 DI 令牌的映射表，用于查阅数据解析器。欲知详情，参见 `Resolve`。
 *
 * - `runGuardsAndResolvers` defines when guards and resolvers will be run. By default they run only
 *    when the matrix parameters of the route change. When set to `paramsOrQueryParamsChange` they
 *    will also run when query params change. And when set to `always`, they will run every time.
 *
 *   `runGuardsAndResolvers` 定义了路由守卫和解析器的运行时机。默认情况下，它们只会在路由的矩阵参数（`#`）变化时才会执行。
 *   当设置为 `paramsOrQueryParamsChange` 时，它们在查询参数（`?`）变化时也会执行。当设置为 `always` 时，它们每次都会执行。
 *
 * - `children` is an array of child route definitions.
 *
 *   `children` 是一个子路由定义构成的数组。
 *
 * - `loadChildren` is a reference to lazy loaded child routes. See `LoadChildren` for more
 *   info.
 *
 *   `loadChildren` 是一个用于惰性加载子路由的引用。欲知详情，参见 `LoadChildren`。
 *
 * ### Simple Configuration
 *
 * ### 简单配置
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
 * When navigating to `/team/11/user/bob`, the router will create the team component with the user
 * component in it.
 *
 * 当导航到 `/team/11/user/bob` 时，路由器将会创建一个 Team 组件，其中包含一个 User 组件。
 *
 * ### Multiple Outlets
 *
 * ### 多重路由出口
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
 * When navigating to `/team/11(aux:chat/jim)`, the router will create the team component next to
 * the chat component. The chat component will be placed into the aux outlet.
 *
 * 在导航到 `/team/11(aux:chat/jim)` 时，路由器将会在创建了 Chat 组件之后创建一个 Team 组件。Chat 组件会被放进 `aux` 路由出口中。
 *
 * ### Wild Cards
 *
 * ### 通配符
 *
 * ```
 * [{
 *   path: '**',
 *   component: Sink
 * }]
 * ```
 *
 * Regardless of where you navigate to, the router will instantiate the sink component.
 *
 * 无论你导航到哪里，路由器都会实例化这个 Sink 组件。
 *
 * ### Redirects
 *
 * ### 重定向
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
 * When navigating to '/team/11/legacy/user/jim', the router will change the url to
 * '/team/11/user/jim', and then will instantiate the team component with the user component
 * in it.
 *
 * 当导航到 '/team/11/legacy/user/jim' 时，路由器将会把 URL 改成 '/team/11/user/jim'，然后实例化一个 Team 组件，其中包含一个 User 组件。
 *
 * If the `redirectTo` value starts with a '/', then it is an absolute redirect. E.g., if in the
 * example above we change the `redirectTo` to `/user/:name`, the result url will be '/user/jim'.
 *
 * 如果 `redirectTo` 的值是以 `/` 开头的，则会执行一次绝对导航。比如，如果上面的例子中我们把 `redirectTo` 改为 `/user/:name`，
 * 那么最终的 url 就会是 `'/user/jim'`。
 *
 * ### Empty Path
 *
 * ### 空路径
 *
 * Empty-path route configurations can be used to instantiate components that do not 'consume'
 * any url segments. Let's look at the following configuration:
 *
 * 空路径路由可用来实例化一些不"消费"任何 url 区段的组件。来看下列配置：
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
 * When navigating to `/team/11`, the router will instantiate the AllUsers component.
 *
 * 当导航到 `/team/11` 时，路由器就会实例化 AllUsers 组件。
 *
 * Empty-path routes can have children.
 *
 * 空路径路由还可以有子路由。
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
 * When navigating to `/team/11/user/jim`, the router will instantiate the wrapper component with
 * the user component in it.
 *
 * 当导航到 `/team/11/user/jim` 时，路由器将会实例化 `WrapperCmp`，其中还有一个 `User` 组件。
 *
 * An empty path route inherits its parent's params and data. This is because it cannot have its
 * own params, and, as a result, it often uses its parent's params and data as its own.
 *
 * 空路径路由会继承它的父路由的参数和数据。这是因为它不能拥有自己的参数，所以，它通常会把其父路由的参数和数据当做自己的使用。
 *
 * ### Matching Strategy
 *
 * ### 匹配策略
 *
 * By default the router will look at what is left in the url, and check if it starts with
 * the specified path (e.g., `/team/11/user` starts with `team/:id`).
 *
 * 默认情况下，路由器会查看当前 URL 中还剩下什么，并检查它是否以指定的路径开头（比如 `/team/11/user` 就是用 `team/:id` 开头的）。
 *
 * We can change the matching strategy to make sure that the path covers the whole unconsumed url,
 * which is akin to `unconsumedUrl === path` or `$` regular expressions.
 *
 * 我们可以修改匹配策略，以确保该路径匹配所有尚未消费的 url，它相当于 `unconsumedUrl === path` 或正则表达式中的 `$`。
 *
 * This is particularly important when redirecting empty-path routes.
 *
 * 如果要把空路径路由重定向到别处，这尤其重要。
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
 * Since an empty path is a prefix of any url, even when navigating to '/main', the router will
 * still apply the redirect.
 *
 * 由于空路径是任何 url 的前缀，所以即使想导航到 '/main'，路由器仍然会执行这次跳转。
 *
 * If `pathMatch: full` is provided, the router will apply the redirect if and only if navigating to
 * '/'.
 *
 * 如果指定了 `pathMatch: full`，则路由器只有在导航到 `'/'` 时才会执行这次跳转。
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
 * It is useful at times to have the ability to share parameters between sibling components.
 *
 * 当需要在兄弟组件之间共享参数时，这非常有用。
 *
 * Say we have two components--ChildCmp and AuxCmp--that we want to put next to each other and both
 * of them require some id parameter.
 *
 * 假设我们有两个组件 `ChildCmp` 和 `AuxCmp`，它们彼此相邻，并且都需要一个 `id` 参数。
 *
 * One way to do that would be to have a bogus parent component, so both the siblings can get the id
 * parameter from it. This is not ideal. Instead, you can use a componentless route.
 *
 * 解决方案之一就是伪造一个父组件，这样一来，这些兄弟组件就可以通过它获取同一个 id 参数了。但这还不理想。我们要改用无组件路由。
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
 * So when navigating to `parent/10/(a//aux:b)`, the route will instantiate the main child and aux
 * child components next to each other. In this example, the application component
 * has to have the primary and aux outlets defined.
 *
 * 这样当导航到 `parent/10/(a//aux:b)` 时，该路由将会先后实例化主要的子控件和辅助子控件。在这个例子中，应用组件必须定义主路由出口和 `aux` 出口。
 *
 * The router will also merge the `params`, `data`, and `resolve` of the componentless parent into
 * the `params`, `data`, and `resolve` of the children. This is done because there is no component
 * that can inject the activated route of the componentless parent.
 *
 * 路由器还会把这个无组件父路由的 `params`、`data` 和 `resolve` 结果合并到子路由的 `params`、`data` 和 `resolve` 中。
 * 之所以能这样，是因为这里没有组件能接收这个无组件父路由的激活路由信息，所以只能合并到子路由中。
 *
 * This is especially useful when child components are defined as follows:
 *
 * 当用如下方式定义子组件时，这会非常有用：
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
 * With this configuration in place, navigating to '/parent/10' will create the main child and aux
 * components.
 *
 * 使用这种配置，导航到 '/parent/10' 时就会创建主要的子组件和辅助子组件。
 *
 * ### Lazy Loading
 *
 * ### 惰性加载
 *
 * Lazy loading speeds up our application load time by splitting it into multiple bundles, and
 * loading them on demand. The router is designed to make lazy loading simple and easy. Instead of
 * providing the children property, you can provide the `loadChildren` property, as follows:
 *
 * 惰性加载可以通过把应用拆分成多个发布包，并按需加载它们，来加速应用的启动时间。
 * 路由器的设计让惰性加载非常简易。只要用 `loadChildren` 属性代替 `children` 属性就可以了，例如：
 *
 * ```
 * [{
 *   path: 'team/:id',
 *   component: Team,
 *   loadChildren: 'team'
 * }]
 * ```
 *
 * The router will use registered NgModuleFactoryLoader to fetch an NgModule associated with 'team'.
 * Then it will extract the set of routes defined in that NgModule, and will transparently add
 * those routes to the main configuration.
 *
 * 路由器会使用已注册的 `NgModuleFactoryLoader` 来获取与 `team` 相关的 NgModule。
 * 然后，它就会提取出那个 NgModule 中定义的一组路由，并透明的把那些路由添加到主路由配置中。
 *
 */
export type Routes = Route[];

/**
 * @description Represents the results of the URL matching.
 *
 * 表示 URL 匹配的结果。
 *
 * * `consumed` is an array of the consumed URL segments.
 *
 *   `consumed` 是一个已消费的 URL 区段的数组。
 *
 * * `posParams` is a map of positional parameters.
 *
 *   `posParams` 是位置参数的映射表。
 *
 * @experimental
 */
export type UrlMatchResult = {
  consumed: UrlSegment[]; posParams?: {[name: string]: UrlSegment};
};

/**
 * @description
 *
 * A function matching URLs
 *
 * 用于匹配 URL 的函数
 *
 * A custom URL matcher can be provided when a combination of `path` and `pathMatch` isn't
 * expressive enough.
 *
 * 当 `path` 和 `pathMatch` 的组合无法满足需求时，可以提供一个自定义的 URL 匹配器。
 *
 * For instance, the following matcher matches html files.
 *
 * 比如，下列匹配器会匹配 html 文件。
 *
 * ```
 * export function htmlFiles(url: UrlSegment[]) {
 *   return url.length === 1 && url[0].path.endsWith('.html') ? ({consumed: url}) : null;
 * }
 *
 * export const routes = [{ matcher: htmlFiles, component: AnyComponent }];
 * ```
 *
 * @experimental
 */
export type UrlMatcher = (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) =>
    UrlMatchResult;

/**
 * @description
 *
 * Represents the static data associated with a particular route.
 *
 * 表示与特定路由相关的静态数据。
 *
 * See `Routes` for more details.
 *
 * 欲知详情，参见 `Routes`。
 *
 */
export type Data = {
  [name: string]: any
};

/**
 * @description
 *
 * Represents the resolved data associated with a particular route.
 *
 * 表示与特定路由相关的解析出来的数据。
 *
 * See `Routes` for more details.
 *
 * 欲知详情，参见 `Routes`。
 *
 */
export type ResolveData = {
  [name: string]: any
};

/**
 * @description
 *
 * The type of `loadChildren`.
 *
 * `loadChildren` 的类型定义。
 *
 * See `Routes` for more details.
 *
 * 欲知详情，参见 `Routes`。
 *
 */
export type LoadChildrenCallback = () =>
    Type<any>| NgModuleFactory<any>| Promise<Type<any>>| Observable<Type<any>>;

/**
 * @description
 *
 * The type of `loadChildren`.
 *
 * `loadChildren` 的类型定义。
 *
 * See `Routes` for more details.
 *
 * 欲知详情，参见 `Routes`。
 */
export type LoadChildren = string | LoadChildrenCallback;

/**
 * @description
 *
 * The type of `queryParamsHandling`.
 *
 * `queryParamsHandling` 的类型定义。
 *
 * See `RouterLink` for more details.
 *
 * 欲知详情，参见 `RouterLink`。
 */
export type QueryParamsHandling = 'merge' | 'preserve' | '';

/**
 * @description
 *
 * The type of `runGuardsAndResolvers`.
 *
 * `runGuardsAndResolvers` 的类型定义。
 *
 * See `Routes` for more details.
 *
 * 欲知详情，参见 `Routes`。
 *
 * @experimental
 */
export type RunGuardsAndResolvers = 'paramsChange' | 'paramsOrQueryParamsChange' | 'always';

/**
 * See `Routes` for more details.
 *
 * 欲知详情，参见 `Routes`。
 *
 */
export interface Route {
  path?: string;
  pathMatch?: string;
  matcher?: UrlMatcher;
  component?: Type<any>;
  redirectTo?: string;
  outlet?: string;
  canActivate?: any[];
  canActivateChild?: any[];
  canDeactivate?: any[];
  canLoad?: any[];
  data?: Data;
  resolve?: ResolveData;
  children?: Routes;
  loadChildren?: LoadChildren;
  runGuardsAndResolvers?: RunGuardsAndResolvers;
  /**
   * Filled for routes with `loadChildren` once the module has been loaded
   * @internal
   */
  _loadedConfig?: LoadedRouterConfig;
}

export class LoadedRouterConfig {
  constructor(public routes: Route[], public module: NgModuleRef<any>) {}
}

export function validateConfig(config: Routes, parentPath: string = ''): void {
  // forEach doesn't iterate undefined values
  for (let i = 0; i < config.length; i++) {
    const route: Route = config[i];
    const fullPath: string = getFullPath(parentPath, route);
    validateNode(route, fullPath);
  }
}

function validateNode(route: Route, fullPath: string): void {
  if (!route) {
    throw new Error(`
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
  }
  if (Array.isArray(route)) {
    throw new Error(`Invalid configuration of route '${fullPath}': Array cannot be specified`);
  }
  if (!route.component && !route.children && !route.loadChildren &&
      (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
  }
  if (route.redirectTo && route.children) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
  }
  if (route.redirectTo && route.loadChildren) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
  }
  if (route.children && route.loadChildren) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
  }
  if (route.redirectTo && route.component) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': redirectTo and component cannot be used together`);
  }
  if (route.path && route.matcher) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
  }
  if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
    throw new Error(
        `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, redirectTo, children or loadChildren`);
  }
  if (route.path === void 0 && route.matcher === void 0) {
    throw new Error(
        `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
  }
  if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
    throw new Error(`Invalid configuration of route '${fullPath}': path cannot start with a slash`);
  }
  if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
    const exp =
        `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
    throw new Error(
        `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
  }
  if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
    throw new Error(
        `Invalid configuration of route '${fullPath}': pathMatch can only be set to 'prefix' or 'full'`);
  }
  if (route.children) {
    validateConfig(route.children, fullPath);
  }
}

function getFullPath(parentPath: string, currentRoute: Route): string {
  if (!currentRoute) {
    return parentPath;
  }
  if (!parentPath && !currentRoute.path) {
    return '';
  } else if (parentPath && !currentRoute.path) {
    return `${parentPath}/`;
  } else if (!parentPath && currentRoute.path) {
    return currentRoute.path;
  } else {
    return `${parentPath}/${currentRoute.path}`;
  }
}

/**
 * Makes a copy of the config and adds any default required properties.
 *
 * 制作此配置的一个副本，并补齐所有必要（required）属性的默认值。
 *
 */
export function standardizeConfig(r: Route): Route {
  const children = r.children && r.children.map(standardizeConfig);
  const c = children ? {...r, children} : {...r};
  if (!c.component && (children || c.loadChildren) && (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
    c.component = EmptyOutletComponent;
  }
  return c;
}
