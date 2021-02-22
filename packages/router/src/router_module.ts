/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {APP_BASE_HREF, HashLocationStrategy, Location, LOCATION_INITIALIZED, LocationStrategy, PathLocationStrategy, PlatformLocation, ViewportScroller, ɵgetDOM as getDOM} from '@angular/common';
import {ANALYZE_FOR_ENTRY_COMPONENTS, APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ApplicationRef, Compiler, ComponentRef, Inject, Injectable, InjectionToken, Injector, ModuleWithProviders, NgModule, NgModuleFactoryLoader, NgProbeToken, Optional, Provider, SkipSelf, SystemJsNgModuleLoader} from '@angular/core';
import {of, Subject} from 'rxjs';

import {EmptyOutletComponent} from './components/empty_outlet';
import {Route, Routes} from './config';
import {RouterLink, RouterLinkWithHref} from './directives/router_link';
import {RouterLinkActive} from './directives/router_link_active';
import {RouterOutlet} from './directives/router_outlet';
import {Event} from './events';
import {RouteReuseStrategy} from './route_reuse_strategy';
import {ErrorHandler, Router} from './router';
import {ROUTES} from './router_config_loader';
import {ChildrenOutletContexts} from './router_outlet_context';
import {NoPreloading, PreloadAllModules, PreloadingStrategy, RouterPreloader} from './router_preloader';
import {RouterScroller} from './router_scroller';
import {ActivatedRoute} from './router_state';
import {UrlHandlingStrategy} from './url_handling_strategy';
import {DefaultUrlSerializer, UrlSerializer, UrlTree} from './url_tree';
import {flatten} from './utils/collection';

/**
 * The directives defined in the `RouterModule`.
 */
const ROUTER_DIRECTIVES =
    [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive, EmptyOutletComponent];

/**
 * A [DI token](guide/glossary/#di-token) for the router service.
 *
 * DI 用它来配置路由器。
 * @publicApi
 */
export const ROUTER_CONFIGURATION = new InjectionToken<ExtraOptions>('ROUTER_CONFIGURATION');

/**
 * @docsNotRequired
 */
export const ROUTER_FORROOT_GUARD = new InjectionToken<void>('ROUTER_FORROOT_GUARD');

export const ROUTER_PROVIDERS: Provider[] = [
  Location,
  {provide: UrlSerializer, useClass: DefaultUrlSerializer},
  {
    provide: Router,
    useFactory: setupRouter,
    deps: [
      UrlSerializer, ChildrenOutletContexts, Location, Injector, NgModuleFactoryLoader, Compiler,
      ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()],
      [RouteReuseStrategy, new Optional()]
    ]
  },
  ChildrenOutletContexts,
  {provide: ActivatedRoute, useFactory: rootRoute, deps: [Router]},
  {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
  RouterPreloader,
  NoPreloading,
  PreloadAllModules,
  {provide: ROUTER_CONFIGURATION, useValue: {enableTracing: false}},
];

export function routerNgProbeToken() {
  return new NgProbeToken('Router', Router);
}

/**
 * @description
 *
 * Adds directives and providers for in-app navigation among views defined in an application.
 * Use the Angular `Router` service to declaratively specify application states and manage state
 * transitions.
 *
 * 添加指令和提供者，以便在应用程序中定义的视图之间进行应用内导航。使用 Angular `Router` 服务以声明方式指定应用程序状态并管理状态转换。
 *
 * You can import this NgModule multiple times, once for each lazy-loaded bundle.
 * However, only one `Router` service can be active.
 * To ensure this, there are two ways to register routes when importing this module:
 *
 * 你可以多次导入此 NgModule，对于每个惰性加载的包导入一次。但是，只能有一个 `Router` 服务是活动的。为确保这一点，在导入此模块时有两种方法来注册路由：
 *
 * * The `forRoot()` method creates an `NgModule` that contains all the directives, the given
 * routes, and the `Router` service itself.
 *
 *   `forRoot()` 方法会创建一个 `NgModule`，其中包含所有指令、给定的路由以及 `Router` 服务本身。
 *
 * * The `forChild()` method creates an `NgModule` that contains all the directives and the given
 * routes, but does not include the `Router` service.
 *
 *   `forChild()` 方法会创建一个 `NgModule`，其中包含所有指令和给定的路由，但不包括 `Router` 服务。
 * @see [Routing and Navigation guide](guide/router) for an
 * overview of how the `Router` service should be used.
 *
 * [路由和导航指南](guide/router)，概述了应如何使用 `Router` 服务。
 *
 * @see [路由与导航](guide/router.html) 以获得如何使用路由器服务的概览。
 *
 * @publicApi
 */
@NgModule({
  declarations: ROUTER_DIRECTIVES,
  exports: ROUTER_DIRECTIVES,
  entryComponents: [EmptyOutletComponent]
})
export class RouterModule {
  // Note: We are injecting the Router so it gets created eagerly...
  constructor(@Optional() @Inject(ROUTER_FORROOT_GUARD) guard: any, @Optional() router: Router) {}

  /**
   * Creates and configures a module with all the router providers and directives.
   * Optionally sets up an application listener to perform an initial navigation.
   *
   * 带着所有路由器提供者和指令创建和配置模块。（可选）设置应用程序监听器以执行初始导航。
   *
   * When registering the NgModule at the root, import as follows:
   *
   * 在根目录下注册 NgModule 时，请按以下方式导入：
   *
   * ```
   * @NgModule({
   *   imports: [RouterModule.forRoot(ROUTES)]
   * })
   * class MyNgModule {}
   * ```
   *
   * @param routes An array of `Route` objects that define the navigation paths for the application.
   *
   * `Route` 对象的数组，这些对象定义应用程序的导航路径。
   * @param config An `ExtraOptions` configuration object that controls how navigation is performed.
   *
   * 一个 `ExtraOptions` 配置对象，该对象会控制如何执行导航。
   *
   * @return The new `NgModule`.
   *
   * 新的 `NgModule` 。
   */
  static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RouterModule,
      providers: [
        ROUTER_PROVIDERS,
        provideRoutes(routes),
        {
          provide: ROUTER_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[Router, new Optional(), new SkipSelf()]]
        },
        {provide: ROUTER_CONFIGURATION, useValue: config ? config : {}},
        {
          provide: LocationStrategy,
          useFactory: provideLocationStrategy,
          deps:
              [PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], ROUTER_CONFIGURATION]
        },
        {
          provide: RouterScroller,
          useFactory: createRouterScroller,
          deps: [Router, ViewportScroller, ROUTER_CONFIGURATION]
        },
        {
          provide: PreloadingStrategy,
          useExisting: config && config.preloadingStrategy ? config.preloadingStrategy :
                                                             NoPreloading
        },
        {provide: NgProbeToken, multi: true, useFactory: routerNgProbeToken},
        provideRouterInitializer(),
      ],
    };
  }

  /**
   * Creates a module with all the router directives and a provider registering routes,
   * without creating a new Router service.
   * When registering for submodules and lazy-loaded submodules, create the NgModule as follows:
   *
   * 创建带有所有路由器指令和提供者注册的路由的模块，而无需创建新的路由器服务。注册子模块和惰性加载的子模块时，像这样创建 NgModule：
   *
   * ```
   * @NgModule({
   *   imports: [RouterModule.forChild(ROUTES)]
   * })
   * class MyNgModule {}
   * ```
   *
   * @param routes An array of `Route` objects that define the navigation paths for the submodule.
   *
   * `Route` 对象的数组，它们定义了子模块的导航路径。
   * @return The new NgModule.
   *
   * 新的 NgModule。
   */
  static forChild(routes: Routes): ModuleWithProviders<RouterModule> {
    return {ngModule: RouterModule, providers: [provideRoutes(routes)]};
  }
}

export function createRouterScroller(
    router: Router, viewportScroller: ViewportScroller, config: ExtraOptions): RouterScroller {
  if (config.scrollOffset) {
    viewportScroller.setOffset(config.scrollOffset);
  }
  return new RouterScroller(router, viewportScroller, config);
}

export function provideLocationStrategy(
    platformLocationStrategy: PlatformLocation, baseHref: string, options: ExtraOptions = {}) {
  return options.useHash ? new HashLocationStrategy(platformLocationStrategy, baseHref) :
                           new PathLocationStrategy(platformLocationStrategy, baseHref);
}

export function provideForRootGuard(router: Router): any {
  if ((typeof ngDevMode === 'undefined' || ngDevMode) && router) {
    throw new Error(
        `RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.`);
  }
  return 'guarded';
}

/**
 * Registers a [DI provider](guide/glossary#provider) for a set of routes.
 *
 * 为一组路由注册一个 [DI 提供者。](guide/glossary#provider)
 *
 * @param routes The route configuration to provide.
 *
 * 注册路由。
 *
 * @usageNotes
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forChild(ROUTES)],
 *   providers: [provideRoutes(EXTRA_ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * @publicApi
 */
export function provideRoutes(routes: Routes): any {
  return [
    {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: routes},
    {provide: ROUTES, multi: true, useValue: routes},
  ];
}

/**
 * Allowed values in an `ExtraOptions` object that configure
 * when the router performs the initial navigation operation.
 *
 * `ExtraOptions` 对象中的允许值，用于配置路由器何时执行初始导航操作。
 *
 * * 'enabledNonBlocking' - (default) The initial navigation starts after the
 * root component has been created. The bootstrap is not blocked on the completion of the initial
 * navigation.
 *
 *   'enabledNonBlocking' -（默认值）在创建根组件之后开始初始导航。初始导航完成后，引导程序不会被阻止。
 *
 * * 'enabledBlocking' - The initial navigation starts before the root component is created.
 * The bootstrap is blocked until the initial navigation is complete. This value is required
 * for [server-side rendering](guide/universal) to work.
 *
 *   'enabledBlocking' - 初始导航在创建根组件之前开始。引导程序将被阻止，直到完成初始导航为止。该值是让[服务器渲染](guide/universal)正常工作所必需的。
 *
 * * 'disabled' - The initial navigation is not performed. The location listener is set up before
 * the root component gets created. Use if there is a reason to have
 * more control over when the router starts its initial navigation due to some complex
 * initialization logic.
 *
 *   `false` - 同 'legacy_disabled'. @deprecated since v4
 *
 * The following values have been [deprecated](guide/releases#deprecation-practices) since v11,
 * and should not be used for new applications.
 *
 * [从 v11 开始不推荐使用](guide/releases#deprecation-practices)以下值，并且不应将其用于新应用程序。
 *
 * * 'enabled' - This option is 1:1 replaceable with `enabledNonBlocking`.
 *
 *   'enabled' - 此选项可以 1：1 替换为 `enabledNonBlocking`。
 *
 * @see `forRoot()`
 *
 * @publicApi
 */
export type InitialNavigation = 'disabled'|'enabled'|'enabledBlocking'|'enabledNonBlocking';

/**
 * A set of configuration options for a router module, provided in the
 * `forRoot()` method.
 *
 * 在 `forRoot()` 方法中提供的一组路由器模块配置选项。
 *
 * @see `forRoot()`
 *
 *
 * @publicApi
 */
export interface ExtraOptions {
  /**
   * When true, log all internal navigation events to the console.
   * Use for debugging.
   *
   * 如果为 true，则将所有内部导航事件记录到控制台。用于调试。
   *
   */
  enableTracing?: boolean;

  /**
   * When true, enable the location strategy that uses the URL fragment
   * instead of the history API.
   *
   * 修改位置策略（`LocationStrategy`），用 URL 片段（`#`）代替 `history` API。
   */
  useHash?: boolean;

  /**
   * One of `enabled`, `enabledBlocking`, `enabledNonBlocking` or `disabled`.
   * When set to `enabled` or `enabledBlocking`, the initial navigation starts before the root
   * component is created. The bootstrap is blocked until the initial navigation is complete. This
   * value is required for [server-side rendering](guide/universal) to work. When set to
   * `enabledNonBlocking`, the initial navigation starts after the root component has been created.
   * The bootstrap is not blocked on the completion of the initial navigation. When set to
   * `disabled`, the initial navigation is not performed. The location listener is set up before the
   * root component gets created. Use if there is a reason to have more control over when the router
   * starts its initial navigation due to some complex initialization logic.
   *
   * `enabled`、`enabledBlocking`、`enabledNonBlocking` 或 `disabled` 之一。
   * 设置为 `enabled` 或 `enabledBlocking` ，则初始导航在创建根组件之前开始。引导程序将被阻止，直到完成初始导航为止。
   * 该值是让[服务器端渲染](guide/universal)正常工作所必需的。
   * 设置为 `enabledNonBlocking`，则初始导航在创建根组件之后开始。初始导航完成后，引导程序不会被阻止。
   * 设置为 `disabled`，不执行初始导航。位置监听器是在创建根组件之前设置的。
   * 如果由于某些复杂的初始化逻辑，而有理由对路由器何时开始其初始导航有更多的控制权，请使用它。
   *
   */
  initialNavigation?: InitialNavigation;

  /**
   * A custom error handler for failed navigations.
   * If the handler returns a value, the navigation Promise is resolved with this value.
   * If the handler throws an exception, the navigation Promise is rejected with the exception.
   *
   * 导航失败的自定义错误处理器。如果处理器返回一个值，则导航的 Promise 将使用该值进行解析。如果处理器引发异常，则导航 Promise 将被拒绝，并带有该异常。
   *
   */
  errorHandler?: ErrorHandler;

  /**
   * Configures a preloading strategy.
   * One of `PreloadAllModules` or `NoPreloading` (the default).
   *
   * 配置预加载策略，参见 `PreloadAllModules`。
   */
  preloadingStrategy?: any;

  /**
   * Define what the router should do if it receives a navigation request to the current URL.
   * Default is `ignore`, which causes the router ignores the navigation.
   * This can disable features such as a "refresh" button.
   * Use this option to configure the behavior when navigating to the
   * current URL. Default is 'ignore'.
   *
   * 规定当路由器收到一个导航到当前 URL 的请求时该如何处理。
   * 默认情况下，路由器会忽略本次导航。不过，这会阻止实现类似于"刷新"按钮的功能。
   * 使用该选项可以控制导航到当前 URL 时的行为。默认为 'ignore'。
   */
  onSameUrlNavigation?: 'reload'|'ignore';

  /**
   * Configures if the scroll position needs to be restored when navigating back.
   *
   * 配置是否需要在导航回来的时候恢复滚动位置。
   *
   * * 'disabled'- (Default) Does nothing. Scroll position is maintained on navigation.
   *
   *   'disabled' - 什么也不做（默认）。在导航时，会自动维护滚动位置
   *
   * * 'top'- Sets the scroll position to x = 0, y = 0 on all navigation.
   *
   *   'top' - 在任何一次导航中都把滚动位置设置为 x=0, y=0。
   *
   * * 'enabled'- Restores the previous scroll position on backward navigation, else sets the
   * position to the anchor if one is provided, or sets the scroll position to [0, 0] (forward
   * navigation). This option will be the default in the future.
   *
   *   'enabled' —— 当向后导航时，滚动到以前的滚动位置。当向前导航时，如果提供了锚点，则自动滚动到那个锚点，否则把滚动位置设置为 [0, 0]。该选项将来会变成默认值。
   *
   * You can implement custom scroll restoration behavior by adapting the enabled behavior as
   * in the following example.
   *
   * 你可以像下面的例子一样适配它启用时的行为，来自定义恢复滚动位置的策略：
   *
   * ```typescript
   * class AppModule {
   *   constructor(router: Router, viewportScroller: ViewportScroller) {
   *     router.events.pipe(
   *       filter((e: Event): e is Scroll => e instanceof Scroll)
   *     ).subscribe(e => {
   *       if (e.position) {
   *         // backward navigation
   *         viewportScroller.scrollToPosition(e.position);
   *       } else if (e.anchor) {
   *         // anchor navigation
   *         viewportScroller.scrollToAnchor(e.anchor);
   *       } else {
   *         // forward navigation
   *         viewportScroller.scrollToPosition([0, 0]);
   *       }
   *     });
   *   }
   * }
   * ```
   */
  scrollPositionRestoration?: 'disabled'|'enabled'|'top';

  /**
   * When set to 'enabled', scrolls to the anchor element when the URL has a fragment.
   * Anchor scrolling is disabled by default.
   *
   * 设置为 “enabled” 时，如果 URL 有一个片段，就滚动到锚点元素。默认情况下，锚定滚动是禁用的。
   *
   * Anchor scrolling does not happen on 'popstate'. Instead, we restore the position
   * that we stored or scroll to the top.
   *
   * 锚点滚动不会在 “popstate” 上发生。相反，我们会恢复存储的位置或滚动到顶部。
   *
   */
  anchorScrolling?: 'disabled'|'enabled';

  /**
   * Configures the scroll offset the router will use when scrolling to an element.
   *
   * 配置当滚动到一个元素时，路由器使用的滚动偏移。
   *
   * When given a tuple with x and y position value,
   * the router uses that offset each time it scrolls.
   * When given a function, the router invokes the function every time
   * it restores scroll position.
   *
   * 当给出两个数字时，路由器总会使用它们。
   * 当给出一个函数时，路由器每当要恢复滚动位置时，都会调用该函数。
   */
  scrollOffset?: [number, number]|(() => [number, number]);

  /**
   * Defines how the router merges parameters, data, and resolved data from parent to child
   * routes. By default ('emptyOnly'), inherits parent parameters only for
   * path-less or component-less routes.
   * Set to 'always' to enable unconditional inheritance of parent parameters.
   *
   * 定义路由器如何将参数、数据和已解析的数据从父路由合并到子路由。默认情况下（“emptyOnly”），仅继承无路径或无组件路由的父参数。设置为 “always” 时会始终启用父参数的无条件继承。
   *
   */
  paramsInheritanceStrategy?: 'emptyOnly'|'always';

  /**
   * A custom handler for malformed URI errors. The handler is invoked when `encodedURI` contains
   * invalid character sequences.
   * The default implementation is to redirect to the root URL, dropping
   * any path or parameter information. The function takes three parameters:
   *
   * 一个自定义的 URI 格式无效错误的处理器。每当 encodeURI 包含无效字符序列时，就会调用该处理器。默认的实现是跳转到根路径，抛弃任何路径和参数信息。该函数传入三个参数：
   *
   * - `'URIError'` - Error thrown when parsing a bad URL.
   *
   *   `'URIError'` - 当传入错误的 URL 时抛出的错误。
   *
   * - `'UrlSerializer'` - UrlSerializer that’s configured with the router.
   *
   *   `'UrlSerializer'` - 路由器所配置的 UrlSerializer。
   *
   * - `'url'` -  The malformed URL that caused the URIError
   *
   *   `'url'` - 导致 URIError 的格式无效的 URL
   *
   * */
  malformedUriErrorHandler?:
      (error: URIError, urlSerializer: UrlSerializer, url: string) => UrlTree;

  /**
   * Defines when the router updates the browser URL. By default ('deferred'),
   * update after successful navigation.
   * Set to 'eager' if prefer to update the URL at the beginning of navigation.
   * Updating the URL early allows you to handle a failure of navigation by
   * showing an error message with the URL that failed.
   *
   * 定义路由器要何时更新浏览器 URL。默认情况下（“deferred”），在成功导航后进行更新。如果希望在导航开始时更新 URL，则设置为 “eager” 。
   * 以便早期更新 URL，这样可以通过显示带有失败 URL 的错误消息来处理导航失败。
   *
   */
  urlUpdateStrategy?: 'deferred'|'eager';

  /**
   * Enables a bug fix that corrects relative link resolution in components with empty paths.
   * Example:
   *
   * 启用 BUG 补丁，纠正空路径组件的相对链接解析问题。
   *
   * ```
   * const routes = [
   *   {
   *     path: '',
   *     component: ContainerComponent,
   *     children: [
   *       { path: 'a', component: AComponent },
   *       { path: 'b', component: BComponent },
   *     ]
   *   }
   * ];
   * ```
   *
   * From the `ContainerComponent`, this will not work:
   *
   * 在 `ContainerComponent` 中不能这样用：
   *
   * `<a [routerLink]="['./a']">Link to A</a>`
   *
   * However, this will work:
   *
   * 不过，可以这样用：
   *
   * `<a [routerLink]="['../a']">Link to A</a>`
   *
   * In other words, you're required to use `../` rather than `./`.
   *
   * 换句话说，你需要使用 `../` 而不是 `./` 。
   *
   * The default in v11 is `corrected`.
   *
   * v11 中的默认值是 `corrected`。
   */
  relativeLinkResolution?: 'legacy'|'corrected';
}

export function setupRouter(
    urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts, location: Location,
    injector: Injector, loader: NgModuleFactoryLoader, compiler: Compiler, config: Route[][],
    opts: ExtraOptions = {}, urlHandlingStrategy?: UrlHandlingStrategy,
    routeReuseStrategy?: RouteReuseStrategy) {
  const router = new Router(
      null, urlSerializer, contexts, location, injector, loader, compiler, flatten(config));

  if (urlHandlingStrategy) {
    router.urlHandlingStrategy = urlHandlingStrategy;
  }

  if (routeReuseStrategy) {
    router.routeReuseStrategy = routeReuseStrategy;
  }

  assignExtraOptionsToRouter(opts, router);

  if (opts.enableTracing) {
    const dom = getDOM();
    router.events.subscribe((e: Event) => {
      dom.logGroup(`Router Event: ${(<any>e.constructor).name}`);
      dom.log(e.toString());
      dom.log(e);
      dom.logGroupEnd();
    });
  }

  return router;
}

export function assignExtraOptionsToRouter(opts: ExtraOptions, router: Router): void {
  if (opts.errorHandler) {
    router.errorHandler = opts.errorHandler;
  }

  if (opts.malformedUriErrorHandler) {
    router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
  }

  if (opts.onSameUrlNavigation) {
    router.onSameUrlNavigation = opts.onSameUrlNavigation;
  }

  if (opts.paramsInheritanceStrategy) {
    router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
  }

  if (opts.relativeLinkResolution) {
    router.relativeLinkResolution = opts.relativeLinkResolution;
  }

  if (opts.urlUpdateStrategy) {
    router.urlUpdateStrategy = opts.urlUpdateStrategy;
  }
}

export function rootRoute(router: Router): ActivatedRoute {
  return router.routerState.root;
}

/**
 * Router initialization requires two steps:
 *
 * First, we start the navigation in a `APP_INITIALIZER` to block the bootstrap if
 * a resolver or a guard executes asynchronously.
 *
 * Next, we actually run activation in a `BOOTSTRAP_LISTENER`, using the
 * `afterPreactivation` hook provided by the router.
 * The router navigation starts, reaches the point when preactivation is done, and then
 * pauses. It waits for the hook to be resolved. We then resolve it only in a bootstrap listener.
 */
@Injectable()
export class RouterInitializer {
  private initNavigation: boolean = false;
  private resultOfPreactivationDone = new Subject<void>();

  constructor(private injector: Injector) {}

  appInitializer(): Promise<any> {
    const p: Promise<any> = this.injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    return p.then(() => {
      let resolve: Function = null!;
      const res = new Promise(r => resolve = r);
      const router = this.injector.get(Router);
      const opts = this.injector.get(ROUTER_CONFIGURATION);

      if (opts.initialNavigation === 'disabled') {
        router.setUpLocationChangeListener();
        resolve(true);
      } else if (
          // TODO: enabled is deprecated as of v11, can be removed in v13
          opts.initialNavigation === 'enabled' || opts.initialNavigation === 'enabledBlocking') {
        router.hooks.afterPreactivation = () => {
          // only the initial navigation should be delayed
          if (!this.initNavigation) {
            this.initNavigation = true;
            resolve(true);
            return this.resultOfPreactivationDone;

            // subsequent navigations should not be delayed
          } else {
            return of(null) as any;
          }
        };
        router.initialNavigation();
      } else {
        resolve(true);
      }

      return res;
    });
  }

  bootstrapListener(bootstrappedComponentRef: ComponentRef<any>): void {
    const opts = this.injector.get(ROUTER_CONFIGURATION);
    const preloader = this.injector.get(RouterPreloader);
    const routerScroller = this.injector.get(RouterScroller);
    const router = this.injector.get(Router);
    const ref = this.injector.get<ApplicationRef>(ApplicationRef);

    if (bootstrappedComponentRef !== ref.components[0]) {
      return;
    }

    // Default case
    if (opts.initialNavigation === 'enabledNonBlocking' || opts.initialNavigation === undefined) {
      router.initialNavigation();
    }

    preloader.setUpPreloading();
    routerScroller.init();
    router.resetRootComponentType(ref.componentTypes[0]);
    this.resultOfPreactivationDone.next(null!);
    this.resultOfPreactivationDone.complete();
  }
}

export function getAppInitializer(r: RouterInitializer) {
  return r.appInitializer.bind(r);
}

export function getBootstrapListener(r: RouterInitializer) {
  return r.bootstrapListener.bind(r);
}

/**
 * A [DI token](guide/glossary/#di-token) for the router initializer that
 * is called after the app is bootstrapped.
 *
 * 一个代表路由器初始化器的令牌，应用引导完毕后就会调用它。
 *
 * @publicApi
 */
export const ROUTER_INITIALIZER =
    new InjectionToken<(compRef: ComponentRef<any>) => void>('Router Initializer');

export function provideRouterInitializer() {
  return [
    RouterInitializer,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: getAppInitializer,
      deps: [RouterInitializer]
    },
    {provide: ROUTER_INITIALIZER, useFactory: getBootstrapListener, deps: [RouterInitializer]},
    {provide: APP_BOOTSTRAP_LISTENER, multi: true, useExisting: ROUTER_INITIALIZER},
  ];
}
