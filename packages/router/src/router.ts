/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location} from '@angular/common';
import {Compiler, Injector, NgModuleFactoryLoader, NgModuleRef, NgZone, Type, isDevMode, ɵConsole as Console} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, Subject, Subscription, defer, of } from 'rxjs';
import {catchError, filter, finalize, map, switchMap, tap} from 'rxjs/operators';

import {QueryParamsHandling, Route, Routes, standardizeConfig, validateConfig} from './config';
import {createRouterState} from './create_router_state';
import {createUrlTree} from './create_url_tree';
import {Event, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, NavigationTrigger, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, RoutesRecognized} from './events';
import {activateRoutes} from './operators/activate_routes';
import {applyRedirects} from './operators/apply_redirects';
import {checkGuards} from './operators/check_guards';
import {recognize} from './operators/recognize';
import {resolveData} from './operators/resolve_data';
import {switchTap} from './operators/switch_tap';
import {DefaultRouteReuseStrategy, RouteReuseStrategy} from './route_reuse_strategy';
import {RouterConfigLoader} from './router_config_loader';
import {ChildrenOutletContexts} from './router_outlet_context';
import {ActivatedRoute, RouterState, RouterStateSnapshot, createEmptyState} from './router_state';
import {Params, isNavigationCancelingError, navigationCancelingError} from './shared';
import {DefaultUrlHandlingStrategy, UrlHandlingStrategy} from './url_handling_strategy';
import {UrlSerializer, UrlTree, containsTree, createEmptyUrlTree} from './url_tree';
import {Checks, getAllRouteGuards} from './utils/preactivation';
import {isUrlTree} from './utils/type_guards';



/**
 * @description
 *
 * Represents the extra options used during navigation.
 *
 * 表示在导航时用到的额外选项。
 * @publicApi
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
  /**
   * State passed to any navigation. This value will be accessible through the `extras` object
   * returned from `router.getCurrentNavigation()` while a navigation is executing. Once a
   * navigation completes, this value will be written to `history.state` when the `location.go`
   * or `location.replaceState` method is called before activating of this route. Note that
   * `history.state` will not pass an object equality test because the `navigationId` will be
   * added to the state before being written.
   *
   * While `history.state` can accept any type of value, because the router adds the `navigationId`
   * on each navigation, the `state` must always be an object.
   */
  state?: {[k: string]: any};
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
 * @publicApi
 */
export type ErrorHandler = (error: any) => any;

function defaultErrorHandler(error: any): any {
  throw error;
}

function defaultMalformedUriErrorHandler(
    error: URIError, urlSerializer: UrlSerializer, url: string): UrlTree {
  return urlSerializer.parse('/');
}

export type RestoredState = {
  [k: string]: any; navigationId: number;
};

/**
 * @description
 *
 * Information about any given navigation. This information can be gotten from the router at
 * any time using the `router.getCurrentNavigation()` method.
 *
 * @publicApi
 */
export type Navigation = {
  /**
   * The ID of the current navigation.
   */
  id: number;
  /**
   * Target URL passed into the {@link Router#navigateByUrl} call before navigation. This is
   * the value before the router has parsed or applied redirects to it.
   */
  initialUrl: string | UrlTree;
  /**
   * The initial target URL after being parsed with {@link UrlSerializer.extract()}.
   */
  extractedUrl: UrlTree;
  /**
   * Extracted URL after redirects have been applied. This URL may not be available immediately,
   * therefore this property can be `undefined`. It is guaranteed to be set after the
   * {@link RoutesRecognized} event fires.
   */
  finalUrl?: UrlTree;
  /**
   * Identifies the trigger of the navigation.
   *
   * * 'imperative'--triggered by `router.navigateByUrl` or `router.navigate`.
   * * 'popstate'--triggered by a popstate event
   * * 'hashchange'--triggered by a hashchange event
   */
  trigger: 'imperative' | 'popstate' | 'hashchange';
  /**
   * The NavigationExtras used in this navigation. See {@link NavigationExtras} for more info.
   */
  extras: NavigationExtras;
  /**
   * Previously successful Navigation object. Only a single previous Navigation is available,
   * therefore this previous Navigation will always have a `null` value for `previousNavigation`.
   */
  previousNavigation: Navigation | null;
};

export type NavigationTransition = {
  id: number,
  currentUrlTree: UrlTree,
  currentRawUrl: UrlTree,
  extractedUrl: UrlTree,
  urlAfterRedirects: UrlTree,
  rawUrl: UrlTree,
  extras: NavigationExtras,
  resolve: any,
  reject: any,
  promise: Promise<boolean>,
  source: NavigationTrigger,
  restoredState: RestoredState | null,
  currentSnapshot: RouterStateSnapshot,
  targetSnapshot: RouterStateSnapshot | null,
  currentRouterState: RouterState,
  targetRouterState: RouterState | null,
  guards: Checks,
  guardsResult: boolean | UrlTree | null,
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
 * @publicApi
 */
export class Router {
  private currentUrlTree: UrlTree;
  private rawUrlTree: UrlTree;
  private browserUrlTree: UrlTree;
  private readonly transitions: BehaviorSubject<NavigationTransition>;
  private navigations: Observable<NavigationTransition>;
  private lastSuccessfulNavigation: Navigation|null = null;
  private currentNavigation: Navigation|null = null;

  // TODO(issue/24571): remove '!'.
  private locationSubscription !: Subscription;
  private navigationId: number = 0;
  private configLoader: RouterConfigLoader;
  private ngModule: NgModuleRef<any>;
  private console: Console;
  private isNgZoneEnabled: boolean = false;

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
    this.console = injector.get(Console);
    const ngZone = injector.get(NgZone);
    this.isNgZoneEnabled = ngZone instanceof NgZone;

    this.resetConfig(config);
    this.currentUrlTree = createEmptyUrlTree();
    this.rawUrlTree = this.currentUrlTree;
    this.browserUrlTree = this.currentUrlTree;

    this.configLoader = new RouterConfigLoader(loader, compiler, onLoadStart, onLoadEnd);
    this.routerState = createEmptyState(this.currentUrlTree, this.rootComponentType);

    this.transitions = new BehaviorSubject<NavigationTransition>({
      id: 0,
      currentUrlTree: this.currentUrlTree,
      currentRawUrl: this.currentUrlTree,
      extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
      urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
      rawUrl: this.currentUrlTree,
      extras: {},
      resolve: null,
      reject: null,
      promise: Promise.resolve(true),
      source: 'imperative',
      restoredState: null,
      currentSnapshot: this.routerState.snapshot,
      targetSnapshot: null,
      currentRouterState: this.routerState,
      targetRouterState: null,
      guards: {canActivateChecks: [], canDeactivateChecks: []},
      guardsResult: null,
    });
    this.navigations = this.setupNavigations(this.transitions);

    this.processNavigations();
  }

  private setupNavigations(transitions: Observable<NavigationTransition>):
      Observable<NavigationTransition> {
    const eventsSubject = (this.events as Subject<Event>);
    return transitions.pipe(
        filter(t => t.id !== 0),

        // Extract URL
        map(t => ({
              ...t, extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl)
            } as NavigationTransition)),

        // Store the Navigation object
        tap(t => {
          this.currentNavigation = {
            id: t.id,
            initialUrl: t.currentRawUrl,
            extractedUrl: t.extractedUrl,
            trigger: t.source,
            extras: t.extras,
            previousNavigation: this.lastSuccessfulNavigation ?
                {...this.lastSuccessfulNavigation, previousNavigation: null} :
                null
          };
        }),

        // Using switchMap so we cancel executing navigations when a new one comes in
        switchMap(t => {
          let completed = false;
          let errored = false;
          return of (t).pipe(
              switchMap(t => {
                const urlTransition =
                    !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString();
                const processCurrentUrl =
                    (this.onSameUrlNavigation === 'reload' ? true : urlTransition) &&
                    this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl);

                if (processCurrentUrl) {
                  return of (t).pipe(
                      // Fire NavigationStart event
                      switchMap(t => {
                        const transition = this.transitions.getValue();
                        eventsSubject.next(new NavigationStart(
                            t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState));
                        if (transition !== this.transitions.getValue()) {
                          return EMPTY;
                        }
                        return [t];
                      }),

                      // This delay is required to match old behavior that forced navigation to
                      // always be async
                      switchMap(t => Promise.resolve(t)),

                      // ApplyRedirects
                      applyRedirects(
                          this.ngModule.injector, this.configLoader, this.urlSerializer,
                          this.config),

                      // Update the currentNavigation
                      tap(t => {
                        this.currentNavigation = {
                          ...this.currentNavigation !,
                          finalUrl: t.urlAfterRedirects
                        };
                      }),

                      // Recognize
                      recognize(
                          this.rootComponentType, this.config, (url) => this.serializeUrl(url),
                          this.paramsInheritanceStrategy, this.relativeLinkResolution),

                      // Update URL if in `eager` update mode
                      tap(t => {
                        if (this.urlUpdateStrategy === 'eager') {
                          if (!t.extras.skipLocationChange) {
                            this.setBrowserUrl(t.urlAfterRedirects, !!t.extras.replaceUrl, t.id);
                          }
                          this.browserUrlTree = t.urlAfterRedirects;
                        }
                      }),

                      // Fire RoutesRecognized
                      tap(t => {
                        const routesRecognized = new RoutesRecognized(
                            t.id, this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot !);
                        eventsSubject.next(routesRecognized);
                      }), );
                } else {
                  const processPreviousUrl = urlTransition && this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree);
                  /* When the current URL shouldn't be processed, but the previous one was, we
                   * handle this "error condition" by navigating to the previously successful URL,
                   * but leaving the URL intact.*/
                  if (processPreviousUrl) {
                    const {id, extractedUrl, source, restoredState, extras} = t;
                    const navStart = new NavigationStart(
                        id, this.serializeUrl(extractedUrl), source, restoredState);
                    eventsSubject.next(navStart);
                    const targetSnapshot =
                        createEmptyState(extractedUrl, this.rootComponentType).snapshot;

                    return of ({
                      ...t,
                      targetSnapshot,
                      urlAfterRedirects: extractedUrl,
                      extras: {...extras, skipLocationChange: false, replaceUrl: false},
                    });
                  } else {
                    /* When neither the current or previous URL can be processed, do nothing other
                     * than update router's internal reference to the current "settled" URL. This
                     * way the next navigation will be coming from the current URL in the browser.
                     */
                    this.rawUrlTree = t.rawUrl;
                    t.resolve(null);
                    return EMPTY;
                  }
                }
              }),

              // Before Preactivation
              switchTap(t => {
                const {
                  targetSnapshot,
                  id: navigationId,
                  extractedUrl: appliedUrlTree,
                  rawUrl: rawUrlTree,
                  extras: {skipLocationChange, replaceUrl}
                } = t;
                return this.hooks.beforePreactivation(targetSnapshot !, {
                  navigationId,
                  appliedUrlTree,
                  rawUrlTree,
                  skipLocationChange: !!skipLocationChange,
                  replaceUrl: !!replaceUrl,
                });
              }),

              // --- GUARDS ---
              tap(t => {
                const guardsStart = new GuardsCheckStart(
                    t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects),
                    t.targetSnapshot !);
                this.triggerEvent(guardsStart);
              }),

              map(t => ({
                    ...t,
                    guards:
                        getAllRouteGuards(t.targetSnapshot !, t.currentSnapshot, this.rootContexts)
                  })),

              checkGuards(this.ngModule.injector, (evt: Event) => this.triggerEvent(evt)),
              tap(t => {
                if (isUrlTree(t.guardsResult)) {
                  const error: Error&{url?: UrlTree} = navigationCancelingError(
                      `Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                  error.url = t.guardsResult;
                  throw error;
                }
              }),

              tap(t => {
                const guardsEnd = new GuardsCheckEnd(
                    t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects),
                    t.targetSnapshot !, !!t.guardsResult);
                this.triggerEvent(guardsEnd);
              }),

              filter(t => {
                if (!t.guardsResult) {
                  this.resetUrlToCurrentUrlTree();
                  const navCancel =
                      new NavigationCancel(t.id, this.serializeUrl(t.extractedUrl), '');
                  eventsSubject.next(navCancel);
                  t.resolve(false);
                  return false;
                }
                return true;
              }),

              // --- RESOLVE ---
              switchTap(t => {
                if (t.guards.canActivateChecks.length) {
                  return of (t).pipe(
                      tap(t => {
                        const resolveStart = new ResolveStart(
                            t.id, this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot !);
                        this.triggerEvent(resolveStart);
                      }),
                      resolveData(
                          this.paramsInheritanceStrategy,
                          this.ngModule.injector),  //
                      tap(t => {
                        const resolveEnd = new ResolveEnd(
                            t.id, this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot !);
                        this.triggerEvent(resolveEnd);
                      }), );
                }
                return undefined;
              }),

              // --- AFTER PREACTIVATION ---
              switchTap((t: NavigationTransition) => {
                const {
                  targetSnapshot,
                  id: navigationId,
                  extractedUrl: appliedUrlTree,
                  rawUrl: rawUrlTree,
                  extras: {skipLocationChange, replaceUrl}
                } = t;
                return this.hooks.afterPreactivation(targetSnapshot !, {
                  navigationId,
                  appliedUrlTree,
                  rawUrlTree,
                  skipLocationChange: !!skipLocationChange,
                  replaceUrl: !!replaceUrl,
                });
              }),

              map((t: NavigationTransition) => {
                const targetRouterState = createRouterState(
                    this.routeReuseStrategy, t.targetSnapshot !, t.currentRouterState);
                return ({...t, targetRouterState});
              }),

              /* Once here, we are about to activate syncronously. The assumption is this will
                 succeed, and user code may read from the Router service. Therefore before
                 activation, we need to update router properties storing the current URL and the
                 RouterState, as well as updated the browser URL. All this should happen *before*
                 activating. */
              tap((t: NavigationTransition) => {
                this.currentUrlTree = t.urlAfterRedirects;
                this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl);

                (this as{routerState: RouterState}).routerState = t.targetRouterState !;

                if (this.urlUpdateStrategy === 'deferred') {
                  if (!t.extras.skipLocationChange) {
                    this.setBrowserUrl(
                        this.rawUrlTree, !!t.extras.replaceUrl, t.id, t.extras.state);
                  }
                  this.browserUrlTree = t.urlAfterRedirects;
                }
              }),

              activateRoutes(
                  this.rootContexts, this.routeReuseStrategy,
                  (evt: Event) => this.triggerEvent(evt)),

              tap({next() { completed = true; }, complete() { completed = true; }}),
              finalize(() => {
                /* When the navigation stream finishes either through error or success, we set the
                 * `completed` or `errored` flag. However, there are some situations where we could
                 * get here without either of those being set. For instance, a redirect during
                 * NavigationStart. Therefore, this is a catch-all to make sure the NavigationCancel
                 * event is fired when a navigation gets cancelled but not caught by other means. */
                if (!completed && !errored) {
                  // Must reset to current URL tree here to ensure history.state is set. On a fresh
                  // page load, if a new navigation comes in before a successful navigation
                  // completes, there will be nothing in history.state.navigationId. This can cause
                  // sync problems with AngularJS sync code which looks for a value here in order
                  // to determine whether or not to handle a given popstate event or to leave it
                  // to the Angualr router.
                  this.resetUrlToCurrentUrlTree();
                  const navCancel = new NavigationCancel(
                      t.id, this.serializeUrl(t.extractedUrl),
                      `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`);
                  eventsSubject.next(navCancel);
                  t.resolve(false);
                }
                // currentNavigation should always be reset to null here. If navigation was
                // successful, lastSuccessfulTransition will have already been set. Therefore we
                // can safely set currentNavigation to null here.
                this.currentNavigation = null;
              }),
              catchError((e) => {
                errored = true;
                /* This error type is issued during Redirect, and is handled as a cancellation
                 * rather than an error. */
                if (isNavigationCancelingError(e)) {
                  const redirecting = isUrlTree(e.url);
                  if (!redirecting) {
                    // Set property only if we're not redirecting. If we landed on a page and
                    // redirect to `/` route, the new navigation is going to see the `/` isn't
                    // a change from the default currentUrlTree and won't navigate. This is
                    // only applicable with initial navigation, so setting `navigated` only when
                    // not redirecting resolves this scenario.
                    this.navigated = true;
                    this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                  }
                  const navCancel =
                      new NavigationCancel(t.id, this.serializeUrl(t.extractedUrl), e.message);
                  eventsSubject.next(navCancel);
                  t.resolve(false);

                  if (redirecting) {
                    this.navigateByUrl(e.url);
                  }

                  /* All other errors should reset to the router's internal URL reference to the
                   * pre-error state. */
                } else {
                  this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                  const navError = new NavigationError(t.id, this.serializeUrl(t.extractedUrl), e);
                  eventsSubject.next(navError);
                  try {
                    t.resolve(this.errorHandler(e));
                  } catch (ee) {
                    t.reject(ee);
                  }
                }
                return EMPTY;
              }), );
          // TODO(jasonaden): remove cast once g3 is on updated TypeScript
        })) as any as Observable<NavigationTransition>;
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

  private getTransition(): NavigationTransition { return this.transitions.value; }

  private setTransition(t: Partial<NavigationTransition>): void {
    this.transitions.next({...this.getTransition(), ...t});
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
        // Navigations coming from Angular router have a navigationId state property. When this
        // exists, restore the state.
        const state = change.state && change.state.navigationId ? change.state : null;
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

  /** The current Navigation object if one exists */
  getCurrentNavigation(): Navigation|null { return this.currentNavigation; }

  /** @internal */
  triggerEvent(event: Event): void { (this.events as Subject<Event>).next(event); }

  /**
   * Resets the configuration used for navigation and generating links.
   *
   * 重置供导航和生成链接使用的配置项。
   *
   * @usageNotes
   *
   * ### Example
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
   * @usageNotes
   *
   * ### Example
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
   * @usageNotes
   *
   * ### Example
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
   * Since `navigateByUrl()` takes an absolute URL as the first parameter,
   * it will not apply any delta to the current URL and ignores any properties
   * in the second parameter (the `NavigationExtras`) that would change the
   * provided URL.
   *
   * 由于 `navigateByUrl()` 要求必须用绝对地址作为第一个参数，所以它不会在当前 URL 上做增量修改，
   * 并且会忽略第二个参数 `NavigationExtras` 中所有可能会更改 URL 的属性。
   *
   */
  navigateByUrl(url: string|UrlTree, extras: NavigationExtras = {skipLocationChange: false}):
      Promise<boolean> {
    if (isDevMode() && this.isNgZoneEnabled && !NgZone.isInAngularZone()) {
      this.console.warn(
          `Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?`);
    }

    const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
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
   * @usageNotes
   *
   * ### Example
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
   * The first parameter of `navigate()` is a delta to be applied to the current URL
   * or the one provided in the `relativeTo` property of the second parameter (the
   * `NavigationExtras`).
   *
   * `navigate()` 的第一个参数是相对于当前 URL 或第二参数 `NavigationExtras` 中 `relativeTo` 属性所指定的 URL 的增量修改。
   *
   * In order to affect this browser's `history.state` entry, the `state`
   * parameter can be passed. This must be an object because the router
   * will add the `navigationId` property to this object before creating
   * the new history item.
   *
   * 要想影响到浏览器的 `history.state` 结构，还可以传入一个 `state` 参数。它必须是一个对象，因为路由器会在创建新的历史记录之前为该对象添加 `navigationId` 属性。
   *
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
    if (isUrlTree(url)) {
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
    this.navigations.subscribe(
        t => {
          this.navigated = true;
          this.lastSuccessfulId = t.id;
          (this.events as Subject<Event>)
              .next(new NavigationEnd(
                  t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree)));
          this.lastSuccessfulNavigation = this.currentNavigation;
          this.currentNavigation = null;
          t.resolve(true);
        },
        e => { this.console.warn(`Unhandled Navigation Error: `); });
  }

  private scheduleNavigation(
      rawUrl: UrlTree, source: NavigationTrigger, restoredState: RestoredState|null,
      extras: NavigationExtras): Promise<boolean> {
    const lastNavigation = this.getTransition();
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
    this.setTransition({
      id,
      source,
      restoredState,
      currentUrlTree: this.currentUrlTree,
      currentRawUrl: this.rawUrlTree, rawUrl, extras, resolve, reject, promise,
      currentSnapshot: this.routerState.snapshot,
      currentRouterState: this.routerState
    });

    // Make sure that the error is propagated even though `processNavigations` catch
    // handler does not rethrow
    return promise.catch((e: any) => { return Promise.reject(e); });
  }

  private setBrowserUrl(
      url: UrlTree, replaceUrl: boolean, id: number, state?: {[key: string]: any}) {
    const path = this.urlSerializer.serialize(url);
    state = state || {};
    if (this.location.isCurrentPathEqualTo(path) || replaceUrl) {
      // TODO(jasonaden): Remove first `navigationId` and rely on `ng` namespace.
      this.location.replaceState(path, '', {...state, navigationId: id});
    } else {
      this.location.go(path, '', {...state, navigationId: id});
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

function validateCommands(commands: string[]): void {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new Error(`The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
