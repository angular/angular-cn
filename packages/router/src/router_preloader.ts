/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Compiler, Injectable, Injector, NgModuleFactoryLoader, NgModuleRef, OnDestroy} from '@angular/core';
import {from, Observable, of, Subscription} from 'rxjs';
import {catchError, concatMap, filter, map, mergeAll, mergeMap} from 'rxjs/operators';

import {LoadedRouterConfig, Route, Routes} from './config';
import {Event, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart} from './events';
import {Router} from './router';
import {RouterConfigLoader} from './router_config_loader';


/**
 * @description
 *
 * Provides a preloading strategy.
 *
 * 提供预加载策略。
 *
 * @publicApi
 */
export abstract class PreloadingStrategy {
  abstract preload(route: Route, fn: () => Observable<any>): Observable<any>;
}

/**
 * @description
 *
 * Provides a preloading strategy that preloads all modules as quickly as possible.
 *
 * 提供一种预加载策略，以尽快预加载所有模块。
 *
 * ```
 * RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
 * ```
 *
 * @publicApi
 */
export class PreloadAllModules implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return fn().pipe(catchError(() => of(null)));
  }
}

/**
 * @description
 *
 * Provides a preloading strategy that does not preload any modules.
 *
 * 提供不预加载任何模块的预加载策略。
 *
 * This strategy is enabled by default.
 *
 * 默认情况下启用此策略。
 *
 * @publicApi
 */
export class NoPreloading implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return of(null);
  }
}

/**
 * The preloader optimistically loads all router configurations to
 * make navigations into lazily-loaded sections of the application faster.
 *
 * 预加载器会乐观加载所有路由器配置，以使导航到应用程序的惰性加载部分的速度更快。
 *
 * The preloader runs in the background. When the router bootstraps, the preloader
 * starts listening to all navigation events. After every such event, the preloader
 * will check if any configurations can be loaded lazily.
 *
 * 预加载器在后台运行。路由器引导时，预加载器开始监听所有导航事件。在每个此类事件之后，预加载器将检查是否可以惰性加载任何配置。
 *
 * If a route is protected by `canLoad` guards, the preloaded will not load it.
 *
 * 如果路由受 `canLoad` 保护器保护，则预加载的路由不会加载该路由。
 *
 * @publicApi
 */
@Injectable()
export class RouterPreloader implements OnDestroy {
  private loader: RouterConfigLoader;
  private subscription?: Subscription;

  constructor(
      private router: Router, moduleLoader: NgModuleFactoryLoader, compiler: Compiler,
      private injector: Injector, private preloadingStrategy: PreloadingStrategy) {
    const onStartLoad = (r: Route) => router.triggerEvent(new RouteConfigLoadStart(r));
    const onEndLoad = (r: Route) => router.triggerEvent(new RouteConfigLoadEnd(r));

    this.loader = new RouterConfigLoader(moduleLoader, compiler, onStartLoad, onEndLoad);
  }

  setUpPreloading(): void {
    this.subscription =
        this.router.events
            .pipe(filter((e: Event) => e instanceof NavigationEnd), concatMap(() => this.preload()))
            .subscribe(() => {});
  }

  preload(): Observable<any> {
    const ngModule = this.injector.get(NgModuleRef);
    return this.processRoutes(ngModule, this.router.config);
  }

  /** @nodoc */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private processRoutes(ngModule: NgModuleRef<any>, routes: Routes): Observable<void> {
    const res: Observable<any>[] = [];
    for (const route of routes) {
      // we already have the config loaded, just recurse
      if (route.loadChildren && !route.canLoad && route._loadedConfig) {
        const childConfig = route._loadedConfig;
        res.push(this.processRoutes(childConfig.module, childConfig.routes));

        // no config loaded, fetch the config
      } else if (route.loadChildren && !route.canLoad) {
        res.push(this.preloadConfig(ngModule, route));

        // recurse into children
      } else if (route.children) {
        res.push(this.processRoutes(ngModule, route.children));
      }
    }
    return from(res).pipe(mergeAll(), map((_) => void 0));
  }

  private preloadConfig(ngModule: NgModuleRef<any>, route: Route): Observable<void> {
    return this.preloadingStrategy.preload(route, () => {
      const loaded$ = this.loader.load(ngModule.injector, route);
      return loaded$.pipe(mergeMap((config: LoadedRouterConfig) => {
        route._loadedConfig = config;
        return this.processRoutes(config.module, config.routes);
      }));
    });
  }
}
