/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location} from '@angular/common';
import {Compiler, Injector, NgModuleFactoryLoader, NgModuleRef, Type, isDevMode} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription, of } from 'rxjs';
import {concatMap, map, mergeMap} from 'rxjs/operators';

import {applyRedirects} from './apply_redirects';
import {LoadedRouterConfig, QueryParamsHandling, Route, Routes, standardizeConfig, validateConfig} from './config';
import {createRouterState} from './create_router_state';
import {createUrlTree} from './create_url_tree';
import {ActivationEnd, ChildActivationEnd, Event, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, NavigationTrigger, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, RoutesRecognized} from './events';
import {PreActivation} from './pre_activation';
import {recognize} from './recognize';
import {DefaultRouteReuseStrategy, DetachedRouteHandleInternal, RouteReuseStrategy} from './route_reuse_strategy';
import {RouterConfigLoader} from './router_config_loader';
import {ChildrenOutletContexts} from './router_outlet_context';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, advanceActivatedRoute, createEmptyState, inheritedParamsDataResolve} from './router_state';
import {Params, isNavigationCancelingError} from './shared';
import {DefaultUrlHandlingStrategy, UrlHandlingStrategy} from './url_handling_strategy';
import {UrlSerializer, UrlTree, containsTree, createEmptyUrlTree} from './url_tree';
import {forEach} from './utils/collection';
import {TreeNode, nodeChildrenAsMap} from './utils/tree';


/**
 * @description
 *
 * Represents the extra options used during navigation.
 *
 * 表示在导航时用到的额外选项。
 */
export interface NavigationExtras {
  /**
   * Enables relative navigation from the current ActivatedRoute.
   *
   * 允许从当前激活的路由进行相对导航。
   *
   * Configuration:
   *
   * 配置：
   *
   * ```
   * [{
  *   path: 'parent',
  *   component: ParentComponent,
  *   children: [{
  *     path: 'list',
  *     component: ListComponent
  *   },{
  *     path: 'child',
  *     component: ChildComponent
  *   }]
  * }]
   * ```
   *
   * Navigate to list route from child route:
   *
   * 从 `child` 路由导航到 `list` 路由：
   *
   * ```
   *  @Component({...})
   *  class ChildComponent {
  *    constructor(private router: Router, private route: ActivatedRoute) {}
  *
  *    go() {
  *      this.router.navigate(['../list'], { relativeTo: this.route });
  *    }
  *  }
   * ```
   */
  relativeTo?: ActivatedRoute|null;

  /**
   * Sets query parameters to the URL.
   *
   * 设置 URL 的查询参数。
   *
   * ```
   * // Navigate to /results?page=1
   * this.router.navigate(['/results'], { queryParams: { page: 1 } });
   * ```
   */
  queryParams?: Params|null;

  /**
   * Sets the hash fragment for the URL.
   *
   * 设置 URL 的哈希片段（`#`）。
   *
   * ```
   * // Navigate to /results#top
   * this.router.navigate(['/results'], { fragment: 'top' });
   * ```
   */
  fragment?: string;

  /**
   * Preserves the query parameters for the next navigation.
   *
   * 在后续导航时保留查询（`?`）参数。
   *
   * deprecated, use `queryParamsHandling` instead
   *
   * 已废弃，请用 `queryParamsHandling` 代替
   *
   * ```
   * // Preserve query params from /results?page=1 to /view?page=1
   * this.router.navigate(['/view'], { preserveQueryParams: true });
   * ```
   *
   * @deprecated since v4
   */
  preserveQueryParams?: boolean;

  /**
   *  config strategy to handle the query parameters for the next navigation.
   *
   *  配置后续导航时对查询（`?`）参数的处理策略。
   *
   * ```
   * // from /results?page=1 to /view?page=1&page=2
   * this.router.navigate(['/view'], { queryParams: { page: 2 },  queryParamsHandling: "merge" });
   * ```
   */
  queryParamsHandling?: QueryParamsHandling|null;
  /**
   * Preserves the fragment for the next navigation
   *
   * 在后续导航时保留`#`片段
   *
   * ```
   * // Preserve fragment from /results#top to /view#top
   * this.router.navigate(['/view'], { preserveFragment: true });
   * ```
   */
  preserveFragment?: boolean;
  /**
   * Navigates without pushing a new state into history.
   *
   * 导航时不要把新状态记入历史
   *
   * ```
   * // Navigate silently to /view
   * this.router.navigate(['/view'], { skipLocationChange: true });
   * ```
   */
  skipLocationChange?: boolean;
  /**
   * Navigates while replacing the current state in history.
   *
   * 导航时不要把当前状态记入历史
   *
   * ```
   * // Navigate to /view
   * this.router.navigate(['/view'], { replaceUrl: true });
   * ```
   */
  replaceUrl?: boolean;
}

/**
 * @description
 *
 * Error handler that is invoked when a navigation errors.
 *
 * 错误处理器会在导航出错时调用。
 *
 * If the handler returns a value, the navigation promise will be resolved with this value.
 * If the handler throws an exception, the navigation promise will be rejected with
 * the exception.
 *
 * 如果该处理器返回一个值，那么本次导航返回的 Promise 就会使用这个值进行解析（resolve）。
 * 如果该处理器抛出异常，那么本次导航返回的 Promise 就会使用这个异常进行拒绝（reject）。
 *
 */
export type ErrorHandler = (error: any) => any;

function defaultErrorHandler(error: any): any {
  throw error;
}

function defaultMalformedUriErrorHandler(
    error: URIError, urlSerializer: UrlSerializer, url: string): UrlTree {
  return urlSerializer.parse('/');
}

type NavStreamValue =
    boolean | {appliedUrl: UrlTree, snapshot: RouterStateSnapshot, shouldActivate?: boolean};

type NavigationParams = {
  id: number,
  rawUrl: UrlTree,
  extras: NavigationExtras,
  resolve: any,
  reject: any,
  promise: Promise<boolean>,
  source: NavigationTrigger,
  state: {navigationId: number} | null
};

/**
 * @internal
 */
export type RouterHook = (snapshot: RouterStateSnapshot, runExtras: {
  appliedUrlTree: UrlTree,
  rawUrlTree: UrlTree,
  skipLocationChange: boolean,
  replaceUrl: boolean,
  navigationId: number
}) => Observable<void>;

/**
 * @internal
 */
function defaultRouterHook(snapshot: RouterStateSnapshot, runExtras: {
  appliedUrlTree: UrlTree,
  rawUrlTree: UrlTree,
  skipLocationChange: boolean,
  replaceUrl: boolean,
  navigationId: number
}): Observable<void> {
  return of (null) as any;
}

/**
 * @description
 *
 * Provides the navigation and url manipulation capabilities.
 *
 * 提供导航和操纵 URL 的能力。
 *
 * See `Routes` for more details and examples.
 *
 * 查看 `Routes` 以了解详情和范例。
 *
 * @ngModule RouterModule
 *
 *
 */
export class Router {
  private currentUrlTree: UrlTree;
  private rawUrlTree: UrlTree;
  private navigations = new BehaviorSubject<NavigationParams>(null !);

  // TODO(issue/24571): remove '!'.
  private locationSubscription !: Subscription;
  private navigationId: number = 0;
  private configLoader: RouterConfigLoader;
  private ngModule: NgModuleRef<any>;

  public readonly events: Observable<Event> = new Subject<Event>();
  public readonly routerState: RouterState;

  /**
   * Error handler that is invoked when a navigation errors.
   *
   * 当导航发生错误时要调用的错误处理器。
   *
   * See `ErrorHandler` for more information.
   *
   * 欲知详情，参见 `ErrorHandler`。
   */
  errorHandler: ErrorHandler = defaultErrorHandler;

  /**
   * Malformed uri error handler is invoked when `Router.parseUrl(url)` throws an
   * error due to containing an invalid character. The most common case would be a `%` sign
   * that's not encoded and is not part of a percent encoded sequence.
   *
   * uri 格式无效错误的处理器，在 `Router.parseUrl(url)` 由于 `url` 包含无效字符而报错时调用。
   * 最常见的情况可能是 `%` 本身既没有被编码，又不是正常 `%` 编码序列的一部分。
   */
  malformedUriErrorHandler:
      (error: URIError, urlSerializer: UrlSerializer,
       url: string) => UrlTree = defaultMalformedUriErrorHandler;

  /**
   * Indicates if at least one navigation happened.
   *
   * 表示是否发生过至少一次导航。
   */
  navigated: boolean = false;
  private lastSuccessfulId: number = -1;

  /**
   * Used by RouterModule. This allows us to
   * pause the navigation either before preactivation or after it.
   * @internal
   */
  hooks: {beforePreactivation: RouterHook, afterPreactivation: RouterHook} = {
    beforePreactivation: defaultRouterHook,
    afterPreactivation: defaultRouterHook
  };

  /**
   * Extracts and merges URLs. Used for AngularJS to Angular migrations.
   *
   * 提取并合并 URL。在 AngularJS 向 Angular 迁移时会用到。
   */
  urlHandlingStrategy: UrlHandlingStrategy = new DefaultUrlHandlingStrategy();

  routeReuseStrategy: RouteReuseStrategy = new DefaultRouteReuseStrategy();

  /**
   * Define what the router should do if it receives a navigation request to the current URL.
   * By default, the router will ignore this navigation. However, this prevents features such
   * as a "refresh" button. Use this option to configure the behavior when navigating to the
   * current URL. Default is 'ignore'.
   *
   * 定义当路由器收到一个导航到当前 URL 的请求时应该怎么做。
   * 默认情况下，路由器将会忽略这次导航。但这样会阻止类似于 "刷新" 按钮的特性。
   * 使用该选项可以配置导航到当前 URL 时的行为。默认值为 'ignore'。
   */
  onSameUrlNavigation: 'reload'|'ignore' = 'ignore';

  /**
   * Defines how the router merges params, data and resolved data from parent to child
   * routes. Available options are:
   *
   * 定义路由器如何从父路由向子路由合并参数、数据。可用选项为：
   *
   * - `'emptyOnly'`, the default, only inherits parent params for path-less or component-less
   *   routes.
   *
   *   `'emptyOnly'`，默认值，只从无路径或无组件的路由继承父级参数。
   *
   * - `'always'`, enables unconditional inheritance of parent params.
   *
   *   `'always'`，允许无条件地继承父级参数。
   *
   */
  paramsInheritanceStrategy: 'emptyOnly'|'always' = 'emptyOnly';

  /**
   * Defines when the router updates the browser URL. The default behavior is to update after
   * successful navigation. However, some applications may prefer a mode where the URL gets
   * updated at the beginning of navigation. The most common use case would be updating the
   * URL early so if navigation fails, you can show an error message with the URL that failed.
   * Available options are:
   *
   * 定义路由器要何时更新浏览器的 URL。默认行为是在每次成功的导航之后更新。
   * 不过，有些应用会更愿意在导航开始时就更新。最常见的情况是尽早更新 URL，这样当导航失败时，你就可以在出错的 URL 上显示一条错误信息了。
   * 可用的选项包括：
   *
   * - `'deferred'`, the default, updates the browser URL after navigation has finished.
   *
   *   `'deferred'`，默认值，在导航完毕后更新浏览器 URL。
   *
   * - `'eager'`, updates browser URL at the beginning of navigation.
   *
   *   `'eager'`，在导航开始时更新浏览器的 URL。
   */
  urlUpdateStrategy: 'deferred'|'eager' = 'deferred';

  /**
   * See {@link RouterModule} for more information.
   *
   * 欲知详情，参见 {@link RouterModule}。
   */
  relativeLinkResolution: 'legacy'|'corrected' = 'legacy';

  /**
   * Creates the router service.
   *
   * 创建路由器服务。
   */
  // TODO: vsavkin make internal after the final is out.
  constructor(
      private rootComponentType: Type<any>|null, private urlSerializer: UrlSerializer,
      private rootContexts: ChildrenOutletContexts, private location: Location, injector: Injector,
      loader: NgModuleFactoryLoader, compiler: Compiler, public config: Routes) {
    const onLoadStart = (r: Route) => this.triggerEvent(new RouteConfigLoadStart(r));
    const onLoadEnd = (r: Route) => this.triggerEvent(new RouteConfigLoadEnd(r));

    this.ngModule = injector.get(NgModuleRef);

    this.resetConfig(config);
    this.currentUrlTree = createEmptyUrlTree();
    this.rawUrlTree = this.currentUrlTree;

    this.configLoader = new RouterConfigLoader(loader, compiler, onLoadStart, onLoadEnd);
    this.routerState = createEmptyState(this.currentUrlTree, this.rootComponentType);
    this.processNavigations();
  }

  /**
   * @internal
   * TODO: this should be removed once the constructor of the router made internal
   */
  resetRootComponentType(rootComponentType: Type<any>): void {
    this.rootComponentType = rootComponentType;
    // TODO: vsavkin router 4.0 should make the root component set to null
    // this will simplify the lifecycle of the router.
    this.routerState.root.component = this.rootComponentType;
  }

  /**
   * Sets up the location change listener and performs the initial navigation.
   *
   * 设置位置变化监听器，并执行首次导航。
   */
  initialNavigation(): void {
    this.setUpLocationChangeListener();
    if (this.navigationId === 0) {
      this.navigateByUrl(this.location.path(true), {replaceUrl: true});
    }
  }

  /**
   * Sets up the location change listener.
   *
   * 设置位置变化监听器。
   */
  setUpLocationChangeListener(): void {
    // Don't need to use Zone.wrap any more, because zone.js
    // already patch onPopState, so location change callback will
    // run into ngZone
    if (!this.locationSubscription) {
      this.locationSubscription = <any>this.location.subscribe((change: any) => {
        let rawUrlTree = this.parseUrl(change['url']);
        const source: NavigationTrigger = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
        const state = change.state && change.state.navigationId ?
            {navigationId: change.state.navigationId} :
            null;
        setTimeout(
            () => { this.scheduleNavigation(rawUrlTree, source, state, {replaceUrl: true}); }, 0);
      });
    }
  }

  /** The current url
   *
   * 当前 URL
   */
  get url(): string { return this.serializeUrl(this.currentUrlTree); }

  /** @internal */
  triggerEvent(e: Event): void { (this.events as Subject<Event>).next(e); }

  /**
   * Resets the configuration used for navigation and generating links.
   *
   * 重置供导航和生成链接使用的配置项。
   *
   * ### Usage
   *
   * ### 用法
   *
   * ```
   * router.resetConfig([
   *  { path: 'team/:id', component: TeamCmp, children: [
   *    { path: 'simple', component: SimpleCmp },
   *    { path: 'user/:name', component: UserCmp }
   *  ]}
   * ]);
   * ```
   */
  resetConfig(config: Routes): void {
    validateConfig(config);
    this.config = config.map(standardizeConfig);
    this.navigated = false;
    this.lastSuccessfulId = -1;
  }

  /** @docsNotRequired */
  ngOnDestroy(): void { this.dispose(); }

  /** Disposes of the router
   *
   * 销毁路由器
   */
  dispose(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
      this.locationSubscription = null !;
    }
  }

  /**
   * Applies an array of commands to the current url tree and creates a new url tree.
   *
   * 把一个命令数组应用于当前的 URL 树，并创建一个新的 URL 树。
   *
   * When given an activate route, applies the given commands starting from the route.
   * When not given a route, applies the given command starting from the root.
   *
   * 如果指定了激活路由，就以该路由为起点应用这些命令。
   * 如果没有指定激活路由，就以根路由为起点应用这些命令。
   *
   * ### Usage
   *
   * ### 用法
   *
   * ```
   * // create /team/33/user/11
   * router.createUrlTree(['/team', 33, 'user', 11]);
   *
   * // create /team/33;expand=true/user/11
   * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
   *
   * // you can collapse static segments like this (this works only with the first passed-in value):
   * router.createUrlTree(['/team/33/user', userId]);
   *
   * // If the first segment can contain slashes, and you do not want the router to split it, you
   * // can do the following:
   *
   * router.createUrlTree([{segmentPath: '/one/two'}]);
   *
   * // create /team/33/(user/11//right:chat)
   * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
   *
   * // remove the right secondary node
   * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
   *
   * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
   *
   * // navigate to /team/33/user/11/details
   * router.createUrlTree(['details'], {relativeTo: route});
   *
   * // navigate to /team/33/user/22
   * router.createUrlTree(['../22'], {relativeTo: route});
   *
   * // navigate to /team/44/user/22
   * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
   * ```
   */
  createUrlTree(commands: any[], navigationExtras: NavigationExtras = {}): UrlTree {
    const {relativeTo,          queryParams,         fragment,
           preserveQueryParams, queryParamsHandling, preserveFragment} = navigationExtras;
    if (isDevMode() && preserveQueryParams && <any>console && <any>console.warn) {
      console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
    }
    const a = relativeTo || this.routerState.root;
    const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
    let q: Params|null = null;
    if (queryParamsHandling) {
      switch (queryParamsHandling) {
        case 'merge':
          q = {...this.currentUrlTree.queryParams, ...queryParams};
          break;
        case 'preserve':
          q = this.currentUrlTree.queryParams;
          break;
        default:
          q = queryParams || null;
      }
    } else {
      q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams || null;
    }
    if (q !== null) {
      q = this.removeEmptyProps(q);
    }
    return createUrlTree(a, this.currentUrlTree, commands, q !, f !);
  }

  /**
   * Navigate based on the provided url. This navigation is always absolute.
   *
   * 基于所提供的 url 进行导航。这种导航永远使用绝对路径。
   *
   * Returns a promise that:
   *
   * 返回一个 Promise：
   *
   * - resolves to 'true' when navigation succeeds,
   *
   *   当导航成功时解析为 `'true'`，
   *
   * - resolves to 'false' when navigation fails,
   *
   *   当导航失败时解析为 `'false'`，
   *
   * - is rejected when an error happens.
   *
   *   当出错时拒绝（reject）。
   *
   * ### Usage
   *
   * ### 用法
   *
   * ```
   * router.navigateByUrl("/team/33/user/11");
   *
   * // Navigate without updating the URL
   * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
   * ```
   *
   * In opposite to `navigate`, `navigateByUrl` takes a whole URL
   * and does not apply any delta to the current one.
   *
   * 与 `navigate` 不同，`navigateByUrl` 只接收完整的 URL，而不会管当前 URL。
   */
  navigateByUrl(url: string|UrlTree, extras: NavigationExtras = {skipLocationChange: false}):
      Promise<boolean> {
    const urlTree = url instanceof UrlTree ? url : this.parseUrl(url);
    const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);

    return this.scheduleNavigation(mergedTree, 'imperative', null, extras);
  }

  /**
   * Navigate based on the provided array of commands and a starting point.
   * If no starting route is provided, the navigation is absolute.
   *
   * 基于所提供的命令数组和起点路由进行导航。
   * 如果没有指定起点路由，则从根路由开始进行绝对导航。
   *
   * Returns a promise that:
   *
   * 返回一个 Promise：
   *
   * - resolves to 'true' when navigation succeeds,
   *
   *   当导航成功时解析为 `'true'`，
   *
   * - resolves to 'false' when navigation fails,
   *
   *   当导航失败时解析为 `'false'`，
   *
   * - is rejected when an error happens.
   *
   *   当出错时拒绝（reject）。
   *
   * ### Usage
   *
   * ### 用法
   *
   * ```
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
   *
   * // Navigate without updating the URL
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
   * ```
   *
   * In opposite to `navigateByUrl`, `navigate` always takes a delta that is applied to the current
   * URL.
   */
  navigate(commands: any[], extras: NavigationExtras = {skipLocationChange: false}):
      Promise<boolean> {
    validateCommands(commands);
    return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
  }

  /** Serializes a `UrlTree` into a string
   *
   * 把 `UrlTree` 序列化为字符串
   */
  serializeUrl(url: UrlTree): string { return this.urlSerializer.serialize(url); }

  /** Parses a string into a `UrlTree`
   *
   * 把字符串解析为 `UrlTree`
   */
  parseUrl(url: string): UrlTree {
    let urlTree: UrlTree;
    try {
      urlTree = this.urlSerializer.parse(url);
    } catch (e) {
      urlTree = this.malformedUriErrorHandler(e, this.urlSerializer, url);
    }
    return urlTree;
  }

  /** Returns whether the url is activated
   *
   * 返回指定的 `url` 是否处于激活状态
   */
  isActive(url: string|UrlTree, exact: boolean): boolean {
    if (url instanceof UrlTree) {
      return containsTree(this.currentUrlTree, url, exact);
    }

    const urlTree = this.parseUrl(url);
    return containsTree(this.currentUrlTree, urlTree, exact);
  }

  private removeEmptyProps(params: Params): Params {
    return Object.keys(params).reduce((result: Params, key: string) => {
      const value: any = params[key];
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
      return result;
    }, {});
  }

  private processNavigations(): void {
    this.navigations
        .pipe(concatMap((nav: NavigationParams) => {
          if (nav) {
            this.executeScheduledNavigation(nav);
            // a failed navigation should not stop the router from processing
            // further navigations => the catch
            return nav.promise.catch(() => {});
          } else {
            return <any>of (null);
          }
        }))
        .subscribe(() => {});
  }

  private scheduleNavigation(
      rawUrl: UrlTree, source: NavigationTrigger, state: {navigationId: number}|null,
      extras: NavigationExtras): Promise<boolean> {
    const lastNavigation = this.navigations.value;
    // If the user triggers a navigation imperatively (e.g., by using navigateByUrl),
    // and that navigation results in 'replaceState' that leads to the same URL,
    // we should skip those.
    if (lastNavigation && source !== 'imperative' && lastNavigation.source === 'imperative' &&
        lastNavigation.rawUrl.toString() === rawUrl.toString()) {
      return Promise.resolve(true);  // return value is not used
    }

    // Because of a bug in IE and Edge, the location class fires two events (popstate and
    // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
    // flicker. Handles the case when a popstate was emitted first.
    if (lastNavigation && source == 'hashchange' && lastNavigation.source === 'popstate' &&
        lastNavigation.rawUrl.toString() === rawUrl.toString()) {
      return Promise.resolve(true);  // return value is not used
    }
    // Because of a bug in IE and Edge, the location class fires two events (popstate and
    // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
    // flicker. Handles the case when a hashchange was emitted first.
    if (lastNavigation && source == 'popstate' && lastNavigation.source === 'hashchange' &&
        lastNavigation.rawUrl.toString() === rawUrl.toString()) {
      return Promise.resolve(true);  // return value is not used
    }

    let resolve: any = null;
    let reject: any = null;

    const promise = new Promise<boolean>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const id = ++this.navigationId;
    this.navigations.next({id, source, state, rawUrl, extras, resolve, reject, promise});

    // Make sure that the error is propagated even though `processNavigations` catch
    // handler does not rethrow
    return promise.catch((e: any) => Promise.reject(e));
  }

  private executeScheduledNavigation({id, rawUrl, extras, resolve, reject, source,
                                      state}: NavigationParams): void {
    const url = this.urlHandlingStrategy.extract(rawUrl);
    const urlTransition = !this.navigated || url.toString() !== this.currentUrlTree.toString();

    if ((this.onSameUrlNavigation === 'reload' ? true : urlTransition) &&
        this.urlHandlingStrategy.shouldProcessUrl(rawUrl)) {
      if (this.urlUpdateStrategy === 'eager' && !extras.skipLocationChange) {
        this.setBrowserUrl(rawUrl, !!extras.replaceUrl, id);
      }
      (this.events as Subject<Event>)
          .next(new NavigationStart(id, this.serializeUrl(url), source, state));
      Promise.resolve()
          .then(
              (_) => this.runNavigate(
                  url, rawUrl, !!extras.skipLocationChange, !!extras.replaceUrl, id, null))
          .then(resolve, reject);

      // we cannot process the current URL, but we could process the previous one =>
      // we need to do some cleanup
    } else if (
        urlTransition && this.rawUrlTree &&
        this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
      (this.events as Subject<Event>)
          .next(new NavigationStart(id, this.serializeUrl(url), source, state));
      Promise.resolve()
          .then(
              (_) => this.runNavigate(
                  url, rawUrl, false, false, id,
                  createEmptyState(url, this.rootComponentType).snapshot))
          .then(resolve, reject);

    } else {
      this.rawUrlTree = rawUrl;
      resolve(null);
    }
  }

  private runNavigate(
      url: UrlTree, rawUrl: UrlTree, skipLocationChange: boolean, replaceUrl: boolean, id: number,
      precreatedState: RouterStateSnapshot|null): Promise<boolean> {
    if (id !== this.navigationId) {
      (this.events as Subject<Event>)
          .next(new NavigationCancel(
              id, this.serializeUrl(url),
              `Navigation ID ${id} is not equal to the current navigation id ${this.navigationId}`));
      return Promise.resolve(false);
    }

    return new Promise((resolvePromise, rejectPromise) => {
      // create an observable of the url and route state snapshot
      // this operation do not result in any side effects
      let urlAndSnapshot$: Observable<NavStreamValue>;
      if (!precreatedState) {
        const moduleInjector = this.ngModule.injector;
        const redirectsApplied$ =
            applyRedirects(moduleInjector, this.configLoader, this.urlSerializer, url, this.config);

        urlAndSnapshot$ = redirectsApplied$.pipe(mergeMap((appliedUrl: UrlTree) => {
          return recognize(
                     this.rootComponentType, this.config, appliedUrl, this.serializeUrl(appliedUrl),
                     this.paramsInheritanceStrategy, this.relativeLinkResolution)
              .pipe(map((snapshot: any) => {
                (this.events as Subject<Event>)
                    .next(new RoutesRecognized(
                        id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot));

                return {appliedUrl, snapshot};
              }));
        }));
      } else {
        urlAndSnapshot$ = of ({appliedUrl: url, snapshot: precreatedState});
      }

      const beforePreactivationDone$ =
          urlAndSnapshot$.pipe(mergeMap((p): Observable<NavStreamValue> => {
            if (typeof p === 'boolean') return of (p);
            return this.hooks
                .beforePreactivation(p.snapshot, {
                  navigationId: id,
                  appliedUrlTree: url,
                  rawUrlTree: rawUrl, skipLocationChange, replaceUrl,
                })
                .pipe(map(() => p));
          }));

      // run preactivation: guards and data resolvers
      let preActivation: PreActivation;

      const preactivationSetup$ = beforePreactivationDone$.pipe(map((p): NavStreamValue => {
        if (typeof p === 'boolean') return p;
        const {appliedUrl, snapshot} = p;
        const moduleInjector = this.ngModule.injector;
        preActivation = new PreActivation(
            snapshot, this.routerState.snapshot, moduleInjector,
            (evt: Event) => this.triggerEvent(evt));
        preActivation.initialize(this.rootContexts);
        return {appliedUrl, snapshot};
      }));

      const preactivationCheckGuards$ =
          preactivationSetup$.pipe(mergeMap((p): Observable<NavStreamValue> => {
            if (typeof p === 'boolean' || this.navigationId !== id) return of (false);
            const {appliedUrl, snapshot} = p;

            this.triggerEvent(new GuardsCheckStart(
                id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot));

            return preActivation.checkGuards().pipe(map((shouldActivate: boolean) => {
              this.triggerEvent(new GuardsCheckEnd(
                  id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot,
                  shouldActivate));
              return {appliedUrl: appliedUrl, snapshot: snapshot, shouldActivate: shouldActivate};
            }));
          }));

      const preactivationResolveData$ =
          preactivationCheckGuards$.pipe(mergeMap((p): Observable<NavStreamValue> => {
            if (typeof p === 'boolean' || this.navigationId !== id) return of (false);

            if (p.shouldActivate && preActivation.isActivating()) {
              this.triggerEvent(new ResolveStart(
                  id, this.serializeUrl(url), this.serializeUrl(p.appliedUrl), p.snapshot));
              return preActivation.resolveData(this.paramsInheritanceStrategy).pipe(map(() => {
                this.triggerEvent(new ResolveEnd(
                    id, this.serializeUrl(url), this.serializeUrl(p.appliedUrl), p.snapshot));
                return p;
              }));
            } else {
              return of (p);
            }
          }));

      const preactivationDone$ =
          preactivationResolveData$.pipe(mergeMap((p): Observable<NavStreamValue> => {
            if (typeof p === 'boolean' || this.navigationId !== id) return of (false);
            return this.hooks
                .afterPreactivation(p.snapshot, {
                  navigationId: id,
                  appliedUrlTree: url,
                  rawUrlTree: rawUrl, skipLocationChange, replaceUrl,
                })
                .pipe(map(() => p));
          }));


      // create router state
      // this operation has side effects => route state is being affected
      const routerState$ = preactivationDone$.pipe(map((p) => {
        if (typeof p === 'boolean' || this.navigationId !== id) return false;
        const {appliedUrl, snapshot, shouldActivate} = p;
        if (shouldActivate) {
          const state = createRouterState(this.routeReuseStrategy, snapshot, this.routerState);
          return {appliedUrl, state, shouldActivate};
        } else {
          return {appliedUrl, state: null, shouldActivate};
        }
      }));


      this.activateRoutes(
          routerState$, this.routerState, this.currentUrlTree, id, url, rawUrl, skipLocationChange,
          replaceUrl, resolvePromise, rejectPromise);
    });
  }

  /**
   * Performs the logic of activating routes. This is a synchronous process by default. While this
   * is a private method, it could be overridden to make activation asynchronous.
   *
   * 执行激活路由的逻辑。默认情况下这是一个同步过程。虽然这是一个私有方法，但仍然可以覆盖它，以进行异步激活。
   */
  private activateRoutes(
      state: Observable<false|
                        {appliedUrl: UrlTree, state: RouterState|null, shouldActivate?: boolean}>,
      storedState: RouterState, storedUrl: UrlTree, id: number, url: UrlTree, rawUrl: UrlTree,
      skipLocationChange: boolean, replaceUrl: boolean, resolvePromise: any, rejectPromise: any) {
    // applied the new router state
    // this operation has side effects
    let navigationIsSuccessful: boolean;

    state
        .forEach((p) => {
          if (typeof p === 'boolean' || !p.shouldActivate || id !== this.navigationId || !p.state) {
            navigationIsSuccessful = false;
            return;
          }
          const {appliedUrl, state} = p;
          this.currentUrlTree = appliedUrl;
          this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);

          (this as{routerState: RouterState}).routerState = state;

          if (this.urlUpdateStrategy === 'deferred' && !skipLocationChange) {
            this.setBrowserUrl(this.rawUrlTree, replaceUrl, id);
          }

          new ActivateRoutes(
              this.routeReuseStrategy, state, storedState, (evt: Event) => this.triggerEvent(evt))
              .activate(this.rootContexts);

          navigationIsSuccessful = true;
        })
        .then(
            () => {
              if (navigationIsSuccessful) {
                this.navigated = true;
                this.lastSuccessfulId = id;
                (this.events as Subject<Event>)
                    .next(new NavigationEnd(
                        id, this.serializeUrl(url), this.serializeUrl(this.currentUrlTree)));
                resolvePromise(true);
              } else {
                this.resetUrlToCurrentUrlTree();
                (this.events as Subject<Event>)
                    .next(new NavigationCancel(id, this.serializeUrl(url), ''));
                resolvePromise(false);
              }
            },
            (e: any) => {
              if (isNavigationCancelingError(e)) {
                this.navigated = true;
                this.resetStateAndUrl(storedState, storedUrl, rawUrl);
                (this.events as Subject<Event>)
                    .next(new NavigationCancel(id, this.serializeUrl(url), e.message));

                resolvePromise(false);
              } else {
                this.resetStateAndUrl(storedState, storedUrl, rawUrl);
                (this.events as Subject<Event>)
                    .next(new NavigationError(id, this.serializeUrl(url), e));
                try {
                  resolvePromise(this.errorHandler(e));
                } catch (ee) {
                  rejectPromise(ee);
                }
              }
            });
  }

  private setBrowserUrl(url: UrlTree, replaceUrl: boolean, id: number) {
    const path = this.urlSerializer.serialize(url);
    if (this.location.isCurrentPathEqualTo(path) || replaceUrl) {
      this.location.replaceState(path, '', {navigationId: id});
    } else {
      this.location.go(path, '', {navigationId: id});
    }
  }

  private resetStateAndUrl(storedState: RouterState, storedUrl: UrlTree, rawUrl: UrlTree): void {
    (this as{routerState: RouterState}).routerState = storedState;
    this.currentUrlTree = storedUrl;
    this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);
    this.resetUrlToCurrentUrlTree();
  }

  private resetUrlToCurrentUrlTree(): void {
    this.location.replaceState(
        this.urlSerializer.serialize(this.rawUrlTree), '', {navigationId: this.lastSuccessfulId});
  }
}

class ActivateRoutes {
  constructor(
      private routeReuseStrategy: RouteReuseStrategy, private futureState: RouterState,
      private currState: RouterState, private forwardEvent: (evt: Event) => void) {}

  activate(parentContexts: ChildrenOutletContexts): void {
    const futureRoot = this.futureState._root;
    const currRoot = this.currState ? this.currState._root : null;

    this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
    advanceActivatedRoute(this.futureState.root);
    this.activateChildRoutes(futureRoot, currRoot, parentContexts);
  }

  // De-activate the child route that are not re-used for the future state
  private deactivateChildRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>|null,
      contexts: ChildrenOutletContexts): void {
    const children: {[outletName: string]: TreeNode<ActivatedRoute>} = nodeChildrenAsMap(currNode);

    // Recurse on the routes active in the future state to de-activate deeper children
    futureNode.children.forEach(futureChild => {
      const childOutletName = futureChild.value.outlet;
      this.deactivateRoutes(futureChild, children[childOutletName], contexts);
      delete children[childOutletName];
    });

    // De-activate the routes that will not be re-used
    forEach(children, (v: TreeNode<ActivatedRoute>, childName: string) => {
      this.deactivateRouteAndItsChildren(v, contexts);
    });
  }

  private deactivateRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>,
      parentContext: ChildrenOutletContexts): void {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;

    if (future === curr) {
      // Reusing the node, check to see if the children need to be de-activated
      if (future.component) {
        // If we have a normal route, we need to go through an outlet.
        const context = parentContext.getContext(future.outlet);
        if (context) {
          this.deactivateChildRoutes(futureNode, currNode, context.children);
        }
      } else {
        // if we have a componentless route, we recurse but keep the same outlet map.
        this.deactivateChildRoutes(futureNode, currNode, parentContext);
      }
    } else {
      if (curr) {
        // Deactivate the current route which will not be re-used
        this.deactivateRouteAndItsChildren(currNode, parentContext);
      }
    }
  }

  private deactivateRouteAndItsChildren(
      route: TreeNode<ActivatedRoute>, parentContexts: ChildrenOutletContexts): void {
    if (this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
      this.detachAndStoreRouteSubtree(route, parentContexts);
    } else {
      this.deactivateRouteAndOutlet(route, parentContexts);
    }
  }

  private detachAndStoreRouteSubtree(
      route: TreeNode<ActivatedRoute>, parentContexts: ChildrenOutletContexts): void {
    const context = parentContexts.getContext(route.value.outlet);
    if (context && context.outlet) {
      const componentRef = context.outlet.detach();
      const contexts = context.children.onOutletDeactivated();
      this.routeReuseStrategy.store(route.value.snapshot, {componentRef, route, contexts});
    }
  }

  private deactivateRouteAndOutlet(
      route: TreeNode<ActivatedRoute>, parentContexts: ChildrenOutletContexts): void {
    const context = parentContexts.getContext(route.value.outlet);

    if (context) {
      const children: {[outletName: string]: any} = nodeChildrenAsMap(route);
      const contexts = route.value.component ? context.children : parentContexts;

      forEach(children, (v: any, k: string) => this.deactivateRouteAndItsChildren(v, contexts));

      if (context.outlet) {
        // Destroy the component
        context.outlet.deactivate();
        // Destroy the contexts for all the outlets that were in the component
        context.children.onOutletDeactivated();
      }
    }
  }

  private activateChildRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>|null,
      contexts: ChildrenOutletContexts): void {
    const children: {[outlet: string]: any} = nodeChildrenAsMap(currNode);
    futureNode.children.forEach(c => {
      this.activateRoutes(c, children[c.value.outlet], contexts);
      this.forwardEvent(new ActivationEnd(c.value.snapshot));
    });
    if (futureNode.children.length) {
      this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
    }
  }

  private activateRoutes(
      futureNode: TreeNode<ActivatedRoute>, currNode: TreeNode<ActivatedRoute>,
      parentContexts: ChildrenOutletContexts): void {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;

    advanceActivatedRoute(future);

    // reusing the node
    if (future === curr) {
      if (future.component) {
        // If we have a normal route, we need to go through an outlet.
        const context = parentContexts.getOrCreateContext(future.outlet);
        this.activateChildRoutes(futureNode, currNode, context.children);
      } else {
        // if we have a componentless route, we recurse but keep the same outlet map.
        this.activateChildRoutes(futureNode, currNode, parentContexts);
      }
    } else {
      if (future.component) {
        // if we have a normal route, we need to place the component into the outlet and recurse.
        const context = parentContexts.getOrCreateContext(future.outlet);

        if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
          const stored =
              (<DetachedRouteHandleInternal>this.routeReuseStrategy.retrieve(future.snapshot));
          this.routeReuseStrategy.store(future.snapshot, null);
          context.children.onOutletReAttached(stored.contexts);
          context.attachRef = stored.componentRef;
          context.route = stored.route.value;
          if (context.outlet) {
            // Attach right away when the outlet has already been instantiated
            // Otherwise attach from `RouterOutlet.ngOnInit` when it is instantiated
            context.outlet.attach(stored.componentRef, stored.route.value);
          }
          advanceActivatedRouteNodeAndItsChildren(stored.route);
        } else {
          const config = parentLoadedConfig(future.snapshot);
          const cmpFactoryResolver = config ? config.module.componentFactoryResolver : null;

          context.route = future;
          context.resolver = cmpFactoryResolver;
          if (context.outlet) {
            // Activate the outlet when it has already been instantiated
            // Otherwise it will get activated from its `ngOnInit` when instantiated
            context.outlet.activateWith(future, cmpFactoryResolver);
          }

          this.activateChildRoutes(futureNode, null, context.children);
        }
      } else {
        // if we have a componentless route, we recurse but keep the same outlet map.
        this.activateChildRoutes(futureNode, null, parentContexts);
      }
    }
  }
}

function advanceActivatedRouteNodeAndItsChildren(node: TreeNode<ActivatedRoute>): void {
  advanceActivatedRoute(node.value);
  node.children.forEach(advanceActivatedRouteNodeAndItsChildren);
}

function parentLoadedConfig(snapshot: ActivatedRouteSnapshot): LoadedRouterConfig|null {
  for (let s = snapshot.parent; s; s = s.parent) {
    const route = s.routeConfig;
    if (route && route._loadedConfig) return route._loadedConfig;
    if (route && route.component) return null;
  }

  return null;
}

function validateCommands(commands: string[]): void {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new Error(`The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
