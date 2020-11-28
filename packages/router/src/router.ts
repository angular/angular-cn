/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location, PopStateEvent} from '@angular/common';
import {Compiler, Injectable, Injector, NgModuleFactoryLoader, NgModuleRef, NgZone, Type, ɵConsole as Console} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of, Subject, SubscriptionLike} from 'rxjs';
import {catchError, filter, finalize, map, switchMap, tap} from 'rxjs/operators';

import {QueryParamsHandling, Route, Routes} from './config';
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
import {ActivatedRoute, createEmptyState, RouterState, RouterStateSnapshot} from './router_state';
import {isNavigationCancelingError, navigationCancelingError, Params} from './shared';
import {DefaultUrlHandlingStrategy, UrlHandlingStrategy} from './url_handling_strategy';
import {containsTree, createEmptyUrlTree, UrlSerializer, UrlTree} from './url_tree';
import {standardizeConfig, validateConfig} from './utils/config';
import {Checks, getAllRouteGuards} from './utils/preactivation';
import {isUrlTree} from './utils/type_guards';



/**
 * @description
 *
 * Options that modify the `Router` URL.
 * Supply an object containing any of these properties to a `Router` navigation function to
 * control how the target URL should be constructed.
 *
 * @see [Router.navigate() method](api/router/Router#navigate)
 * @see [Router.createUrlTree() method](api/router/Router#createurltree)
 * @see [Routing and Navigation guide](guide/router)
 *
 * 用于修订导航策略的额外选项。
 * @publicApi
 */
export interface UrlCreationOptions {
  /**
   * Specifies a root URI to use for relative navigation.
   *
   * 允许从当前激活的路由进行相对导航。
   *
   * For example, consider the following route configuration where the parent route
   * has two children.
   *
   * 比如，考虑下列路由器配置，parent 路由拥有两个子路由。
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
   * The following `go()` function navigates to the `list` route by
   * interpreting the destination URI as relative to the activated `child`  route
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
   * How to handle query parameters in the router link for the next navigation.
   * One of:
   * * `preserve` : Preserve current parameters.
   * * `merge` : Merge new with current parameters.
   *
   * The "preserve" option discards any new query params:
   * ```
   * // from /view1?page=1 to/view2?page=1
   * this.router.navigate(['/view2'], { queryParams: { page: 2 },  queryParamsHandling: "preserve"
   * });
   * ```
   * The "merge" option appends new query params to the params from the current URL:
   * ```
   * // from /view1?page=1 to/view2?page=1&otherKey=2
   * this.router.navigate(['/view2'], { queryParams: { otherKey: 2 },  queryParamsHandling: "merge"
   * });
   * ```
   * In case of a key collision between current parameters and those in the `queryParams` object,
   * the new value is used.
   *
   */
  queryParamsHandling?: QueryParamsHandling|null;

  /**
   * When true, preserves the URL fragment for the next navigation
   *
   * 在后续导航时保留`#`片段
   *
   * ```
   * // Preserve fragment from /results#top to /view#top
   * this.router.navigate(['/view'], { preserveFragment: true });
   * ```
   */
  preserveFragment?: boolean;
}

/**
 * @description
 *
 * Options that modify the `Router` navigation strategy.
 * Supply an object containing any of these properties to a `Router` navigation function to
 * control how the navigation should be handled.
 *
 * @see [Router.navigate() method](api/router/Router#navigate)
 * @see [Router.navigateByUrl() method](api/router/Router#navigatebyurl)
 * @see [Routing and Navigation guide](guide/router)
 *
 * @publicApi
 */
export interface NavigationBehaviorOptions {
  /**
   * When true, navigates without pushing a new state into history.
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
   * When true, navigates while replacing the current state in history.
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
   * Developer-defined state that can be passed to any navigation.
   * Access this value through the `Navigation.extras` object
   * returned from the [Router.getCurrentNavigation()
   * method](api/router/Router#getcurrentnavigation) while a navigation is executing.
   *
   * After a navigation completes, the router writes an object containing this
   * value together with a `navigationId` to `history.state`.
   * The value is written when `location.go()` or `location.replaceState()`
   * is called before activating this route.
   *
   * Note that `history.state` does not pass an object equality test because
   * the router adds the `navigationId` on each navigation.
   *
   */
  state?: {[k: string]: any};
}

/**
 * @description
 *
 * Options that modify the `Router` navigation strategy.
 * Supply an object containing any of these properties to a `Router` navigation function to
 * control how the target URL should be constructed or interpreted.
 *
 * @see [Router.navigate() method](api/router/Router#navigate)
 * @see [Router.navigateByUrl() method](api/router/Router#navigatebyurl)
 * @see [Router.createUrlTree() method](api/router/Router#createurltree)
 * @see [Routing and Navigation guide](guide/router)
 * @see UrlCreationOptions
 * @see NavigationBehaviorOptions
 *
 * @publicApi
 */
export interface NavigationExtras extends UrlCreationOptions, NavigationBehaviorOptions {}

/**
 * Error handler that is invoked when a navigation error occurs.
 *
 * 错误处理器会在导航出错时调用。
 *
 * If the handler returns a value, the navigation Promise is resolved with this value.
 * If the handler throws an exception, the navigation Promise is rejected with
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
 * Information about a navigation operation.
 * Retrieve the most recent navigation object with the
 * [Router.getCurrentNavigation() method](api/router/Router#getcurrentnavigation) .
 *
 * * *id* : The unique identifier of the current navigation.
 * * *initialUrl* : The target URL passed into the `Router#navigateByUrl()` call before navigation.
 * This is the value before the router has parsed or applied redirects to it.
 * * *extractedUrl* : The initial target URL after being parsed with `UrlSerializer.extract()`.
 * * *finalUrl* : The extracted URL after redirects have been applied.
 * This URL may not be available immediately, therefore this property can be `undefined`.
 * It is guaranteed to be set after the `RoutesRecognized` event fires.
 * * *trigger* : Identifies how this navigation was triggered.
 * -- 'imperative'--Triggered by `router.navigateByUrl` or `router.navigate`.
 * -- 'popstate'--Triggered by a popstate event.
 * -- 'hashchange'--Triggered by a hashchange event.
 * * *extras* : A `NavigationExtras` options object that controlled the strategy used for this
 * navigation.
 * * *previousNavigation* : The previously successful `Navigation` object. Only one previous
 * navigation is available, therefore this previous `Navigation` object has a `null` value for its
 * own `previousNavigation`.
 *
 * @publicApi
 */
export type Navigation = {
  /**
   * The unique identifier of the current navigation.
   */
  id: number;
  /**
   * The target URL passed into the `Router#navigateByUrl()` call before navigation. This is
   * the value before the router has parsed or applied redirects to it.
   */
  initialUrl: string | UrlTree;
  /**
   * The initial target URL after being parsed with `UrlSerializer.extract()`.
   */
  extractedUrl: UrlTree;
  /**
   * The extracted URL after redirects have been applied.
   * This URL may not be available immediately, therefore this property can be `undefined`.
   * It is guaranteed to be set after the `RoutesRecognized` event fires.
   */
  finalUrl?: UrlTree;
  /**
   * Identifies how this navigation was triggered.
   *
   * * 'imperative'--Triggered by `router.navigateByUrl` or `router.navigate`.
   * * 'popstate'--Triggered by a popstate event.
   * * 'hashchange'--Triggered by a hashchange event.
   */
  trigger: 'imperative' | 'popstate' | 'hashchange';
  /**
   * Options that controlled the strategy used for this navigation.
   * See `NavigationExtras`.
   */
  extras: NavigationExtras;
  /**
   * The previously successful `Navigation` object. Only one previous navigation
   * is available, therefore this previous `Navigation` object has a `null` value
   * for its own `previousNavigation`.
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
  restoredState: RestoredState|null,
  currentSnapshot: RouterStateSnapshot,
  targetSnapshot: RouterStateSnapshot|null,
  currentRouterState: RouterState,
  targetRouterState: RouterState|null,
  guards: Checks,
  guardsResult: boolean|UrlTree|null,
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
  return of(null) as any;
}

/**
 * Information related to a location change, necessary for scheduling follow-up Router navigations.
 */
type LocationChangeInfo = {
  source: 'popstate'|'hashchange',
  urlTree: UrlTree,
  state: RestoredState|null,
  transitionId: number
};

/**
 * @description
 *
 * A service that provides navigation among views and URL manipulation capabilities.
 *
 * 一个提供导航和操纵 URL 能力的 NgModule。
 *
 * @see `Route`.
 * @see [Routing and Navigation Guide](guide/router).
 *
 * [路由与导航](guide/router)。
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Injectable()
export class Router {
  private currentUrlTree: UrlTree;
  private rawUrlTree: UrlTree;
  private browserUrlTree: UrlTree;
  private readonly transitions: BehaviorSubject<NavigationTransition>;
  private navigations: Observable<NavigationTransition>;
  private lastSuccessfulNavigation: Navigation|null = null;
  private currentNavigation: Navigation|null = null;

  private locationSubscription?: SubscriptionLike;
  /**
   * Tracks the previously seen location change from the location subscription so we can compare
   * the two latest to see if they are duplicates. See setUpLocationChangeListener.
   */
  private lastLocationChangeInfo: LocationChangeInfo|null = null;
  private navigationId: number = 0;
  private configLoader: RouterConfigLoader;
  private ngModule: NgModuleRef<any>;
  private console: Console;
  private isNgZoneEnabled: boolean = false;

  /**
   * An event stream for routing events in this NgModule.
   */
  public readonly events: Observable<Event> = new Subject<Event>();
  /**
   * The current state of routing in this NgModule.
   */
  public readonly routerState: RouterState;

  /**
   * A handler for navigation errors in this NgModule.
   *
   * 本模块中的导航错误处理器。
   *
   */
  errorHandler: ErrorHandler = defaultErrorHandler;

  /**
   * A handler for errors thrown by `Router.parseUrl(url)`
   * when `url` contains an invalid character.
   * The most common case is a `%` sign
   * that's not encoded and is not part of a percent encoded sequence.
   *
   * uri 格式无效错误的处理器，在 `Router.parseUrl(url)` 由于 `url` 包含无效字符而报错时调用。
   * 最常见的情况可能是 `%` 本身既没有被编码，又不是正常 `%` 编码序列的一部分。
   */
  malformedUriErrorHandler:
      (error: URIError, urlSerializer: UrlSerializer,
       url: string) => UrlTree = defaultMalformedUriErrorHandler;

  /**
   * True if at least one navigation event has occurred,
   * false otherwise.
   *
   * 如果为 True 则表示是否发生过至少一次导航，反之为 False。
   */
  navigated: boolean = false;
  private lastSuccessfulId: number = -1;

  /**
   * Hooks that enable you to pause navigation,
   * either before or after the preactivation phase.
   * Used by `RouterModule`.
   *
   * @internal
   */
  hooks: {
    beforePreactivation: RouterHook,
    afterPreactivation: RouterHook
  } = {beforePreactivation: defaultRouterHook, afterPreactivation: defaultRouterHook};

  /**
   * A strategy for extracting and merging URLs.
   * Used for AngularJS to Angular migrations.
   *
   * 提取并合并 URL。在 AngularJS 向 Angular 迁移时会用到。
   */
  urlHandlingStrategy: UrlHandlingStrategy = new DefaultUrlHandlingStrategy();

  /**
   * A strategy for re-using routes.
   */
  routeReuseStrategy: RouteReuseStrategy = new DefaultRouteReuseStrategy();

  /**
   * How to handle a navigation request to the current URL. One of:
   *
   * 定义当路由器收到一个导航到当前 URL 的请求时应该怎么做。可取下列值之一：
   *
   * - `'ignore'` :  The router ignores the request.
   *
   *   `'ignore'`：路由器会忽略此请求。
   *
   * - `'reload'` : The router reloads the URL. Use to implement a "refresh" feature.
   *
   *   `'reload'`：路由器会重新加载当前 URL。用来实现"刷新"功能。
   *
   */
  onSameUrlNavigation: 'reload'|'ignore' = 'ignore';

  /**
   * How to merge parameters, data, and resolved data from parent to child
   * routes. One of:
   *
   * 如何从父路由向子路由合并参数、数据和解析到的数据。可取下列值之一：
   *
   * - `'emptyOnly'` : Inherit parent parameters, data, and resolved data
   * for path-less or component-less routes.
   *
   *   `'emptyOnly'`：让无路径或无组件的路由继承父级的参数、数据和解析到的数据。
   *
   * - `'always'` : Inherit parent parameters, data, and resolved data
   * for all child routes.
   *
   *   `'always'`：让所有子路由都继承父级的参数、数据和解析到的数据。
   *
   */
  paramsInheritanceStrategy: 'emptyOnly'|'always' = 'emptyOnly';

  /**
   * Determines when the router updates the browser URL.
   * By default (`"deferred"`), updates the browser URL after navigation has finished.
   * Set to `'eager'` to update the browser URL at the beginning of navigation.
   * You can choose to update early so that, if navigation fails,
   * you can show an error message with the URL that failed.
   */
  urlUpdateStrategy: 'deferred'|'eager' = 'deferred';

  /**
   * Enables a bug fix that corrects relative link resolution in components with empty paths.
   * @see `RouterModule`
   */
  relativeLinkResolution: 'legacy'|'corrected' = 'corrected';

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
               map(t =>
                       ({...t, extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl)} as
                        NavigationTransition)),

               // Using switchMap so we cancel executing navigations when a new one comes in
               switchMap(t => {
                 let completed = false;
                 let errored = false;
                 return of(t).pipe(
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
                     switchMap(t => {
                       const urlTransition = !this.navigated ||
                           t.extractedUrl.toString() !== this.browserUrlTree.toString();
                       const processCurrentUrl =
                           (this.onSameUrlNavigation === 'reload' ? true : urlTransition) &&
                           this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl);

                       if (processCurrentUrl) {
                         return of(t).pipe(
                             // Fire NavigationStart event
                             switchMap(t => {
                               const transition = this.transitions.getValue();
                               eventsSubject.next(new NavigationStart(
                                   t.id, this.serializeUrl(t.extractedUrl), t.source,
                                   t.restoredState));
                               if (transition !== this.transitions.getValue()) {
                                 return EMPTY;
                               }
                               return [t];
                             }),

                             // This delay is required to match old behavior that forced navigation
                             // to always be async
                             switchMap(t => Promise.resolve(t)),

                             // ApplyRedirects
                             applyRedirects(
                                 this.ngModule.injector, this.configLoader, this.urlSerializer,
                                 this.config),

                             // Update the currentNavigation
                             tap(t => {
                               this.currentNavigation = {
                                 ...this.currentNavigation!,
                                 finalUrl: t.urlAfterRedirects
                               };
                             }),

                             // Recognize
                             recognize(
                                 this.rootComponentType, this.config,
                                 (url) => this.serializeUrl(url), this.paramsInheritanceStrategy,
                                 this.relativeLinkResolution),

                             // Update URL if in `eager` update mode
                             tap(t => {
                               if (this.urlUpdateStrategy === 'eager') {
                                 if (!t.extras.skipLocationChange) {
                                   this.setBrowserUrl(
                                       t.urlAfterRedirects, !!t.extras.replaceUrl, t.id,
                                       t.extras.state);
                                 }
                                 this.browserUrlTree = t.urlAfterRedirects;
                               }
                             }),

                             // Fire RoutesRecognized
                             tap(t => {
                               const routesRecognized = new RoutesRecognized(
                                   t.id, this.serializeUrl(t.extractedUrl),
                                   this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot!);
                               eventsSubject.next(routesRecognized);
                             }));
                       } else {
                         const processPreviousUrl = urlTransition && this.rawUrlTree &&
                             this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree);
                         /* When the current URL shouldn't be processed, but the previous one was,
                          * we handle this "error condition" by navigating to the previously
                          * successful URL, but leaving the URL intact.*/
                         if (processPreviousUrl) {
                           const {id, extractedUrl, source, restoredState, extras} = t;
                           const navStart = new NavigationStart(
                               id, this.serializeUrl(extractedUrl), source, restoredState);
                           eventsSubject.next(navStart);
                           const targetSnapshot =
                               createEmptyState(extractedUrl, this.rootComponentType).snapshot;

                           return of({
                             ...t,
                             targetSnapshot,
                             urlAfterRedirects: extractedUrl,
                             extras: {...extras, skipLocationChange: false, replaceUrl: false},
                           });
                         } else {
                           /* When neither the current or previous URL can be processed, do nothing
                            * other than update router's internal reference to the current "settled"
                            * URL. This way the next navigation will be coming from the current URL
                            * in the browser.
                            */
                           this.rawUrlTree = t.rawUrl;
                           this.browserUrlTree = t.urlAfterRedirects;
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
                       return this.hooks.beforePreactivation(targetSnapshot!, {
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
                           t.id, this.serializeUrl(t.extractedUrl),
                           this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot!);
                       this.triggerEvent(guardsStart);
                     }),

                     map(t => ({
                           ...t,
                           guards: getAllRouteGuards(
                               t.targetSnapshot!, t.currentSnapshot, this.rootContexts)
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
                           t.id, this.serializeUrl(t.extractedUrl),
                           this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot!,
                           !!t.guardsResult);
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
                         return of(t).pipe(
                             tap(t => {
                               const resolveStart = new ResolveStart(
                                   t.id, this.serializeUrl(t.extractedUrl),
                                   this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot!);
                               this.triggerEvent(resolveStart);
                             }),
                             switchMap(t => {
                               let dataResolved = false;
                               return of(t).pipe(
                                   resolveData(
                                       this.paramsInheritanceStrategy, this.ngModule.injector),
                                   tap({
                                     next: () => dataResolved = true,
                                     complete: () => {
                                       if (!dataResolved) {
                                         const navCancel = new NavigationCancel(
                                             t.id, this.serializeUrl(t.extractedUrl),
                                             `At least one route resolver didn't emit any value.`);
                                         eventsSubject.next(navCancel);
                                         t.resolve(false);
                                       }
                                     }
                                   }),
                               );
                             }),
                             tap(t => {
                               const resolveEnd = new ResolveEnd(
                                   t.id, this.serializeUrl(t.extractedUrl),
                                   this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot!);
                               this.triggerEvent(resolveEnd);
                             }));
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
                       return this.hooks.afterPreactivation(targetSnapshot!, {
                         navigationId,
                         appliedUrlTree,
                         rawUrlTree,
                         skipLocationChange: !!skipLocationChange,
                         replaceUrl: !!replaceUrl,
                       });
                     }),

                     map((t: NavigationTransition) => {
                       const targetRouterState = createRouterState(
                           this.routeReuseStrategy, t.targetSnapshot!, t.currentRouterState);
                       return ({...t, targetRouterState});
                     }),

                     /* Once here, we are about to activate syncronously. The assumption is this
                        will succeed, and user code may read from the Router service. Therefore
                        before activation, we need to update router properties storing the current
                        URL and the RouterState, as well as updated the browser URL. All this should
                        happen *before* activating. */
                     tap((t: NavigationTransition) => {
                       this.currentUrlTree = t.urlAfterRedirects;
                       this.rawUrlTree =
                           this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl);

                       (this as {routerState: RouterState}).routerState = t.targetRouterState!;

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

                     tap({
                       next() {
                         completed = true;
                       },
                       complete() {
                         completed = true;
                       }
                     }),
                     finalize(() => {
                       /* When the navigation stream finishes either through error or success, we
                        * set the `completed` or `errored` flag. However, there are some situations
                        * where we could get here without either of those being set. For instance, a
                        * redirect during NavigationStart. Therefore, this is a catch-all to make
                        * sure the NavigationCancel
                        * event is fired when a navigation gets cancelled but not caught by other
                        * means. */
                       if (!completed && !errored) {
                         // Must reset to current URL tree here to ensure history.state is set. On a
                         // fresh page load, if a new navigation comes in before a successful
                         // navigation completes, there will be nothing in
                         // history.state.navigationId. This can cause sync problems with AngularJS
                         // sync code which looks for a value here in order to determine whether or
                         // not to handle a given popstate event or to leave it to the Angualr
                         // router.
                         this.resetUrlToCurrentUrlTree();
                         const navCancel = new NavigationCancel(
                             t.id, this.serializeUrl(t.extractedUrl),
                             `Navigation ID ${t.id} is not equal to the current navigation id ${
                                 this.navigationId}`);
                         eventsSubject.next(navCancel);
                         t.resolve(false);
                       }
                       // currentNavigation should always be reset to null here. If navigation was
                       // successful, lastSuccessfulTransition will have already been set. Therefore
                       // we can safely set currentNavigation to null here.
                       this.currentNavigation = null;
                     }),
                     catchError((e) => {
                       errored = true;
                       /* This error type is issued during Redirect, and is handled as a
                        * cancellation rather than an error. */
                       if (isNavigationCancelingError(e)) {
                         const redirecting = isUrlTree(e.url);
                         if (!redirecting) {
                           // Set property only if we're not redirecting. If we landed on a page and
                           // redirect to `/` route, the new navigation is going to see the `/`
                           // isn't a change from the default currentUrlTree and won't navigate.
                           // This is only applicable with initial navigation, so setting
                           // `navigated` only when not redirecting resolves this scenario.
                           this.navigated = true;
                           this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                         }
                         const navCancel = new NavigationCancel(
                             t.id, this.serializeUrl(t.extractedUrl), e.message);
                         eventsSubject.next(navCancel);

                         // When redirecting, we need to delay resolving the navigation
                         // promise and push it to the redirect navigation
                         if (!redirecting) {
                           t.resolve(false);
                         } else {
                           // setTimeout is required so this navigation finishes with
                           // the return EMPTY below. If it isn't allowed to finish
                           // processing, there can be multiple navigations to the same
                           // URL.
                           setTimeout(() => {
                             const mergedTree =
                                 this.urlHandlingStrategy.merge(e.url, this.rawUrlTree);
                             const extras = {
                               skipLocationChange: t.extras.skipLocationChange,
                               replaceUrl: this.urlUpdateStrategy === 'eager'
                             };

                             return this.scheduleNavigation(
                                 mergedTree, 'imperative', null, extras,
                                 {resolve: t.resolve, reject: t.reject, promise: t.promise});
                           }, 0);
                         }

                         /* All other errors should reset to the router's internal URL reference to
                          * the pre-error state. */
                       } else {
                         this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                         const navError =
                             new NavigationError(t.id, this.serializeUrl(t.extractedUrl), e);
                         eventsSubject.next(navError);
                         try {
                           t.resolve(this.errorHandler(e));
                         } catch (ee) {
                           t.reject(ee);
                         }
                       }
                       return EMPTY;
                     }));
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

  private getTransition(): NavigationTransition {
    const transition = this.transitions.value;
    // This value needs to be set. Other values such as extractedUrl are set on initial navigation
    // but the urlAfterRedirects may not get set if we aren't processing the new URL *and* not
    // processing the previous URL.
    transition.urlAfterRedirects = this.browserUrlTree;
    return transition;
  }

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
   * Sets up the location change listener. This listener detects navigations triggered from outside
   * the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
   * navigation so that the correct events, guards, etc. are triggered.
   */
  setUpLocationChangeListener(): void {
    // Don't need to use Zone.wrap any more, because zone.js
    // already patch onPopState, so location change callback will
    // run into ngZone
    if (!this.locationSubscription) {
      this.locationSubscription = this.location.subscribe(event => {
        const currentChange = this.extractLocationChangeInfoFromEvent(event);
        if (this.shouldScheduleNavigation(this.lastLocationChangeInfo, currentChange)) {
          // The `setTimeout` was added in #12160 and is likely to support Angular/AngularJS
          // hybrid apps.
          setTimeout(() => {
            const {source, state, urlTree} = currentChange;
            const extras: NavigationExtras = {replaceUrl: true};
            if (state) {
              const stateCopy = {...state} as Partial<RestoredState>;
              delete stateCopy.navigationId;
              if (Object.keys(stateCopy).length !== 0) {
                extras.state = stateCopy;
              }
            }
            this.scheduleNavigation(urlTree, source, state, extras);
          }, 0);
        }
        this.lastLocationChangeInfo = currentChange;
      });
    }
  }

  /** Extracts router-related information from a `PopStateEvent`. */
  private extractLocationChangeInfoFromEvent(change: PopStateEvent): LocationChangeInfo {
    return {
      source: change['type'] === 'popstate' ? 'popstate' : 'hashchange',
      urlTree: this.parseUrl(change['url']!),
      // Navigations coming from Angular router have a navigationId state
      // property. When this exists, restore the state.
      state: change.state?.navigationId ? change.state : null,
      transitionId: this.getTransition().id
    } as const;
  }

  /**
   * Determines whether two events triggered by the Location subscription are due to the same
   * navigation. The location subscription can fire two events (popstate and hashchange) for a
   * single navigation. The second one should be ignored, that is, we should not schedule another
   * navigation in the Router.
   */
  private shouldScheduleNavigation(previous: LocationChangeInfo|null, current: LocationChangeInfo):
      boolean {
    if (!previous) return true;

    const sameDestination = current.urlTree.toString() === previous.urlTree.toString();
    const eventsOccurredAtSameTime = current.transitionId === previous.transitionId;
    if (!eventsOccurredAtSameTime || !sameDestination) {
      return true;
    }

    if ((current.source === 'hashchange' && previous.source === 'popstate') ||
        (current.source === 'popstate' && previous.source === 'hashchange')) {
      return false;
    }

    return true;
  }

  /** The current URL.
   *
   * 当前 URL
   */
  get url(): string {
    return this.serializeUrl(this.currentUrlTree);
  }

  /** The current Navigation object if one exists */
  getCurrentNavigation(): Navigation|null {
    return this.currentNavigation;
  }

  /** @internal */
  triggerEvent(event: Event): void {
    (this.events as Subject<Event>).next(event);
  }

  /**
   * Resets the route configuration used for navigation and generating links.
   *
   * 重置供导航和生成链接使用的配置项。
   *
   * @param config The route array for the new configuration.
   *
   * 新配置中的路由定义数组。
   *
   * @usageNotes
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

  /** @nodoc */
  ngOnDestroy(): void {
    this.dispose();
  }

  /** Disposes of the router.
   *
   * 销毁路由器
   *
   */
  dispose(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
      this.locationSubscription = undefined;
    }
  }

  /**
   * Appends URL segments to the current URL tree to create a new URL tree.
   *
   * @param commands An array of URL fragments with which to construct the new URL tree.
   * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
   * segments, followed by the parameters for each segment.
   * The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
   * property of the options object, if supplied.
   * @param navigationExtras Options that control the navigation strategy.
   * @returns The new URL tree.
   *
   * 新的 URL Tree。
   *
   * @usageNotes
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
   * // If the first segment can contain slashes, and you do not want the router to split it,
   * // you can do the following:
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
  createUrlTree(commands: any[], navigationExtras: UrlCreationOptions = {}): UrlTree {
    const {relativeTo, queryParams, fragment, queryParamsHandling, preserveFragment} =
        navigationExtras;
    const a = relativeTo || this.routerState.root;
    const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
    let q: Params|null = null;
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
    if (q !== null) {
      q = this.removeEmptyProps(q);
    }
    return createUrlTree(a, this.currentUrlTree, commands, q!, f!);
  }

  /**
   * Navigates to a view using an absolute route path.
   *
   * 基于所提供的 URL 进行导航，必须使用绝对路径。
   *
   * @param url An absolute path for a defined route. The function does not apply any delta to the
   *     current URL.
   *
   * 一个绝对 URL。该函数不会对当前 URL 做任何修改。
   *
   * @param extras An object containing properties that modify the navigation strategy.
   *
   * 一个包含一组属性的对象，它会修改导航策略。
   * 该函数会忽略 `NavigationExtras` 中任何可能会改变所提供的 URL 的属性
   *
   * @returns A Promise that resolves to 'true' when navigation succeeds,
   * to 'false' when navigation fails, or is rejected on error.
   *
   *   一个 Promise，当导航成功时，它会解析成 `true`；导航失败或出错时，它会解析成 `false`。
   *
   * @usageNotes
   *
   * The following calls request navigation to an absolute path.
   *
   * ```
   * router.navigateByUrl("/team/33/user/11");
   *
   * // Navigate without updating the URL
   * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
   * ```
   *
   * @see [Routing and Navigation guide](guide/router)
   *
   */
  navigateByUrl(url: string|UrlTree, extras: NavigationBehaviorOptions = {
    skipLocationChange: false
  }): Promise<boolean> {
    if (typeof ngDevMode === 'undefined' ||
        ngDevMode && this.isNgZoneEnabled && !NgZone.isInAngularZone()) {
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
   * @param commands An array of URL fragments with which to construct the target URL.
   * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
   * segments, followed by the parameters for each segment.
   * The fragments are applied to the current URL or the one provided  in the `relativeTo` property
   * of the options object, if supplied.
   * @param extras An options object that determines how the URL should be constructed or
   *     interpreted.
   *
   * @returns A Promise that resolves to `true` when navigation succeeds, to `false` when navigation
   *     fails,
   * or is rejected on error.
   *
   * @usageNotes
   *
   * The following calls request navigation to a dynamic route path relative to the current URL.
   *
   * ```
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
   *
   * // Navigate without updating the URL, overriding the default behavior
   * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
   * ```
   *
   * @see [Routing and Navigation guide](guide/router)
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
  serializeUrl(url: UrlTree): string {
    return this.urlSerializer.serialize(url);
  }

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
        e => {
          this.console.warn(`Unhandled Navigation Error: `);
        });
  }

  private scheduleNavigation(
      rawUrl: UrlTree, source: NavigationTrigger, restoredState: RestoredState|null,
      extras: NavigationExtras,
      priorPromise?: {resolve: any, reject: any, promise: Promise<boolean>}): Promise<boolean> {
    // * Imperative navigations (router.navigate) might trigger additional navigations to the same
    //   URL via a popstate event and the locationChangeListener. We should skip these duplicate
    //   navs. Duplicates may also be triggered by attempts to sync AngularJS and Angular router
    //   states.
    // * Imperative navigations can be cancelled by router guards, meaning the URL won't change. If
    //   the user follows that with a navigation using the back/forward button or manual URL change,
    //   the destination may be the same as the previous imperative attempt. We should not skip
    //   these navigations because it's a separate case from the one above -- it's not a duplicate
    //   navigation.
    const lastNavigation = this.getTransition();
    // We don't want to skip duplicate successful navs if they're imperative because
    // onSameUrlNavigation could be 'reload' (so the duplicate is intended).
    const browserNavPrecededByRouterNav =
        source !== 'imperative' && lastNavigation?.source === 'imperative';
    const lastNavigationSucceeded = this.lastSuccessfulId === lastNavigation.id;
    // If the last navigation succeeded or is in flight, we can use the rawUrl as the comparison.
    // However, if it failed, we should compare to the final result (urlAfterRedirects).
    const lastNavigationUrl = (lastNavigationSucceeded || this.currentNavigation) ?
        lastNavigation.rawUrl :
        lastNavigation.urlAfterRedirects;
    const duplicateNav = lastNavigationUrl.toString() === rawUrl.toString();
    if (browserNavPrecededByRouterNav && duplicateNav) {
      return Promise.resolve(true);  // return value is not used
    }

    let resolve: any;
    let reject: any;
    let promise: Promise<boolean>;
    if (priorPromise) {
      resolve = priorPromise.resolve;
      reject = priorPromise.reject;
      promise = priorPromise.promise;

    } else {
      promise = new Promise<boolean>((res, rej) => {
        resolve = res;
        reject = rej;
      });
    }

    const id = ++this.navigationId;
    this.setTransition({
      id,
      source,
      restoredState,
      currentUrlTree: this.currentUrlTree,
      currentRawUrl: this.rawUrlTree,
      rawUrl,
      extras,
      resolve,
      reject,
      promise,
      currentSnapshot: this.routerState.snapshot,
      currentRouterState: this.routerState
    });

    // Make sure that the error is propagated even though `processNavigations` catch
    // handler does not rethrow
    return promise.catch((e: any) => {
      return Promise.reject(e);
    });
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
    (this as {routerState: RouterState}).routerState = storedState;
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
