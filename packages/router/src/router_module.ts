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
 * @usageNotes
 *
 * RouterModule can be imported multiple times: once per lazily-loaded bundle.
 * Since the router deals with a global shared resource--location, we cannot have
 * more than one router service active.
 *
 * RouterModule 可能会被多次导入：每个惰性加载的发布包都会导入一次。
 * 但由于路由器要和全局共享的资源 - location 打交道，所以不能同时激活一个以上的 `Router` 服务。
 *
 * That is why there are two ways to create the module: `RouterModule.forRoot` and
 * `RouterModule.forChild`.
 *
 * 这就是需要两种方式来创建本模块的原因：`RouterModule.forRoot` 和 `RouterModule.forChild`。
 *
 * * `forRoot` creates a module that contains all the directives, the given routes, and the router
 *   service itself.
 *
 *   `forRoot` 创建一个包含所有指令、指定的路由和 `Router` 服务本身的模块。
 *
 * * `forChild` creates a module that contains all the directives and the given routes, but does not
 *   include the router service.
 *
 *   `forChild` 会创建一个包含所有指令、指定的路由，但不含 `Router` 服务的模块。
 *
 * When registered at the root, the module should be used as follows
 *
 * 当注册在根模块时，该模块应该这样用：
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forRoot(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * For submodules and lazy loaded submodules the module should be used as follows:
 *
 * 对于子模块和惰性加载的子模块，该模块应该这样用：
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forChild(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * @description
 *
 * Adds router directives and providers.
 *
 * 添加路由器指令和服务提供商。
 *
 * Managing state transitions is one of the hardest parts of building applications. This is
 * especially true on the web, where you also need to ensure that the state is reflected in the URL.
 * In addition, we often want to split applications into multiple bundles and load them on demand.
 * Doing this transparently is not trivial.
 *
 * 在构建应用时，管理状态的转换是最难的任务之一。对 Web 来说尤其如此，你还要确保这个状态同时在 URL 中反映出来。
 * 另外，我们通常会希望把应用拆分成多个发布包，并按需加载。要让这些工作透明化，可没那么简单。
 *
 * The Angular router service solves these problems. Using the router, you can declaratively specify
 * application states, manage state transitions while taking care of the URL, and load bundles on
 * demand.
 *
 * Angular 的路由器解决了这些问题。使用路由器，你可以声明式的指定应用的状态、管理状态的转换，还可以处理好 URL，还可以按需加载发布包。
 *
 * @see [Routing and Navigation](guide/router.html) for an
 * overview of how the router service should be used.
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
   * @param routes An array of `Route` objects that define the navigation paths for the application.
   * @param config An `ExtraOptions` configuration object that controls how navigation is performed.
   * @return The new router module.
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
   * Creates a module with all the router directives and a provider registering routes.
   *
   * 创建一个具有所有路由器指令和一个用于注册路由的提供商。
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
  if (router) {
    throw new Error(
        `RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.`);
  }
  return 'guarded';
}

/**
 * Registers a [DI provider](guide/glossary#provider) for a set of routes.
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
 * * 'enabled' - The initial navigation starts before the root component is created.
 * The bootstrap is blocked until the initial navigation is complete. This value is required
 * for [server-side rendering](guide/universal) to work.
 * * 'disabled' - The initial navigation is not performed. The location listener is set up before
 * the root component gets created. Use if there is a reason to have
 * more control over when the router starts its initial navigation due to some complex
 * initialization logic.
 * * 'legacy_enabled'- (Default, for compatibility.) The initial navigation starts after the root
 * component has been created. The bootstrap is not blocked until the initial navigation is
 * complete. @deprecated
 * * 'legacy_disabled'- The initial navigation is not performed. The location listener is set up
 * after the root component gets created. @deprecated since v4
 * * `true` - same as 'legacy_enabled'. @deprecated since v4
 *
 *   `true` - 同 'legacy_enabled'. @deprecated since v4
 *
 * * `false` - same as 'legacy_disabled'. @deprecated since v4
 *
 *   `false` - 同 'legacy_disabled'. @deprecated since v4
 *
 * The 'legacy_enabled' and 'legacy_disabled' should not be used for new applications.
 *
 * @see `forRoot()`
 *
 * @publicApi
 */
export type InitialNavigation = true|false|'enabled'|'disabled'|'legacy_enabled'|'legacy_disabled';

/**
 * A set of configuration options for a router module, provided in the
 * `forRoot()` method.
 *
 * 表示路由器的配置项。
 *
 * @publicApi
 */
export interface ExtraOptions {
  /**
   * When true, log all internal navigation events to the console.
   * Use for debugging.
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
   * One of `enabled` or `disabled`.
   * When set to `enabled`, the initial navigation starts before the root component is created.
   * The bootstrap is blocked until the initial navigation is complete. This value is required for
   * [server-side rendering](guide/universal) to work.
   * When set to `disabled`, the initial navigation is not performed.
   * The location listener is set up before the root component gets created.
   * Use if there is a reason to have more control over when the router
   * starts its initial navigation due to some complex initialization logic.
   *
   * Legacy values are deprecated since v4 and should not be used for new applications:
   *
   * * `legacy_enabled` - Default for compatibility.
   * The initial navigation starts after the root component has been created,
   * but the bootstrap is not blocked until the initial navigation is complete.
   * * `legacy_disabled` - The initial navigation is not performed.
   * The location listener is set up after the root component gets created.
   * * `true` - same as `legacy_enabled`.
   * * `false` - same as `legacy_disabled`.
   *
   * 禁用首次导航
   */
  initialNavigation?: InitialNavigation;

  /**
   * A custom error handler for failed navigations.
   *
   * 自定义的错误处理器。
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
   * Anchor scrolling does not happen on 'popstate'. Instead, we restore the position
   * that we stored or scroll to the top.
   *
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
   * In other words, you're required to use `../` rather than `./`. This is currently the default
   * behavior. Setting this option to `corrected` enables the fix.
   *
   * 换句话说，要使用 `../` 而不是 `./`。它是当前版本的默认行为。把该选项设置为 `corrected` 可以启用这项修正。
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

  if (opts.errorHandler) {
    router.errorHandler = opts.errorHandler;
  }

  if (opts.malformedUriErrorHandler) {
    router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
  }

  if (opts.enableTracing) {
    const dom = getDOM();
    router.events.subscribe((e: Event) => {
      dom.logGroup(`Router Event: ${(<any>e.constructor).name}`);
      dom.log(e.toString());
      dom.log(e);
      dom.logGroupEnd();
    });
  }

  if (opts.onSameUrlNavigation) {
    router.onSameUrlNavigation = opts.onSameUrlNavigation;
  }

  if (opts.paramsInheritanceStrategy) {
    router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
  }

  if (opts.urlUpdateStrategy) {
    router.urlUpdateStrategy = opts.urlUpdateStrategy;
  }

  if (opts.relativeLinkResolution) {
    router.relativeLinkResolution = opts.relativeLinkResolution;
  }

  return router;
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

      if (this.isLegacyDisabled(opts) || this.isLegacyEnabled(opts)) {
        resolve(true);

      } else if (opts.initialNavigation === 'disabled') {
        router.setUpLocationChangeListener();
        resolve(true);

      } else if (opts.initialNavigation === 'enabled') {
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
        throw new Error(`Invalid initialNavigation options: '${opts.initialNavigation}'`);
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

    if (this.isLegacyEnabled(opts)) {
      router.initialNavigation();
    } else if (this.isLegacyDisabled(opts)) {
      router.setUpLocationChangeListener();
    }

    preloader.setUpPreloading();
    routerScroller.init();
    router.resetRootComponentType(ref.componentTypes[0]);
    this.resultOfPreactivationDone.next(null!);
    this.resultOfPreactivationDone.complete();
  }

  private isLegacyEnabled(opts: ExtraOptions): boolean {
    return opts.initialNavigation === 'legacy_enabled' || opts.initialNavigation === true ||
        opts.initialNavigation === undefined;
  }

  private isLegacyDisabled(opts: ExtraOptions): boolean {
    return opts.initialNavigation === 'legacy_disabled' || opts.initialNavigation === false;
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
