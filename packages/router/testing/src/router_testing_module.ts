/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location, LocationStrategy} from '@angular/common';
import {MockLocationStrategy, SpyLocation} from '@angular/common/testing';
import {Compiler, Injectable, Injector, ModuleWithProviders, NgModule, NgModuleFactory, NgModuleFactoryLoader, Optional} from '@angular/core';
import {ChildrenOutletContexts, ExtraOptions, NoPreloading, PreloadingStrategy, provideRoutes, Route, Router, ROUTER_CONFIGURATION, RouterModule, ROUTES, Routes, UrlHandlingStrategy, UrlSerializer, ɵassignExtraOptionsToRouter as assignExtraOptionsToRouter, ɵflatten as flatten, ɵROUTER_PROVIDERS as ROUTER_PROVIDERS} from '@angular/router';



/**
 * @description
 *
 * Allows to simulate the loading of ng modules in tests.
 *
 * 允许模拟测试中 ng 模块的加载。
 *
 * ```
 * const loader = TestBed.inject(NgModuleFactoryLoader);
 *
 * @Component({template: 'lazy-loaded'})
 * class LazyLoadedComponent {}
 * @NgModule({
 *   declarations: [LazyLoadedComponent],
 *   imports: [RouterModule.forChild([{path: 'loaded', component: LazyLoadedComponent}])]
 * })
 *
 * class LoadedModule {}
 *
 * // sets up stubbedModules
 * loader.stubbedModules = {lazyModule: LoadedModule};
 *
 * router.resetConfig([
 *   {path: 'lazy', loadChildren: 'lazyModule'},
 * ]);
 *
 * router.navigateByUrl('/lazy/loaded');
 * ```
 *
 * @publicApi
 */
@Injectable()
export class SpyNgModuleFactoryLoader implements NgModuleFactoryLoader {
  /**
   * @docsNotRequired
   */
  private _stubbedModules: {[path: string]: Promise<NgModuleFactory<any>>} = {};

  /**
   * @docsNotRequired
   */
  set stubbedModules(modules: {[path: string]: any}) {
    const res: {[path: string]: any} = {};
    for (const t of Object.keys(modules)) {
      res[t] = this.compiler.compileModuleAsync(modules[t]);
    }
    this._stubbedModules = res;
  }

  /**
   * @docsNotRequired
   */
  get stubbedModules(): {[path: string]: any} {
    return this._stubbedModules;
  }

  constructor(private compiler: Compiler) {}

  load(path: string): Promise<NgModuleFactory<any>> {
    if (this._stubbedModules[path]) {
      return this._stubbedModules[path];
    } else {
      return <any>Promise.reject(new Error(`Cannot find module ${path}`));
    }
  }
}

function isUrlHandlingStrategy(opts: ExtraOptions|
                               UrlHandlingStrategy): opts is UrlHandlingStrategy {
  // This property check is needed because UrlHandlingStrategy is an interface and doesn't exist at
  // runtime.
  return 'shouldProcessUrl' in opts;
}

/**
 * Router setup factory function used for testing.
 *
 * 用于测试的路由器设置工厂函数。
 *
 * @publicApi
 */
export function setupTestingRouter(
    urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts, location: Location,
    loader: NgModuleFactoryLoader, compiler: Compiler, injector: Injector, routes: Route[][],
    opts?: ExtraOptions, urlHandlingStrategy?: UrlHandlingStrategy): Router;

/**
 * Router setup factory function used for testing.
 *
 * 用于测试的路由器设置工厂函数。
 *
 * @deprecated As of v5.2. The 2nd-to-last argument should be `ExtraOptions`, not
 * `UrlHandlingStrategy`
 *
 * 从 v5.2 开始。倒数第二个参数应该是 `ExtraOptions` ，而不是 `UrlHandlingStrategy`
 *
 * @publicApi
 */
export function setupTestingRouter(
    urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts, location: Location,
    loader: NgModuleFactoryLoader, compiler: Compiler, injector: Injector, routes: Route[][],
    urlHandlingStrategy?: UrlHandlingStrategy): Router;

/**
 * Router setup factory function used for testing.
 *
 * 用于测试的路由器设置工厂函数。
 *
 * @publicApi
 */
export function setupTestingRouter(
    urlSerializer: UrlSerializer, contexts: ChildrenOutletContexts, location: Location,
    loader: NgModuleFactoryLoader, compiler: Compiler, injector: Injector, routes: Route[][],
    opts?: ExtraOptions|UrlHandlingStrategy, urlHandlingStrategy?: UrlHandlingStrategy) {
  const router = new Router(
      null!, urlSerializer, contexts, location, injector, loader, compiler, flatten(routes));
  if (opts) {
    // Handle deprecated argument ordering.
    if (isUrlHandlingStrategy(opts)) {
      router.urlHandlingStrategy = opts;
    } else {
      // Handle ExtraOptions
      assignExtraOptionsToRouter(opts, router);
    }
  }

  if (urlHandlingStrategy) {
    router.urlHandlingStrategy = urlHandlingStrategy;
  }
  return router;
}

/**
 * @description
 *
 * Sets up the router to be used for testing.
 *
 * 设置要用于测试的路由器。
 *
 * The modules sets up the router to be used for testing.
 * It provides spy implementations of `Location`, `LocationStrategy`, and {@link
 * NgModuleFactoryLoader}.
 *
 * 这些模块会设置用于测试的路由器。它提供 `Location`、`LocationStrategy` 和 {@link NgModuleFactoryLoader} 的间谍实现。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```
 * beforeEach(() => {
 *   TestBed.configureTestingModule({
 *     imports: [
 *       RouterTestingModule.withRoutes(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
 *       )
 *     ]
 *   });
 * });
 * ```
 *
 * @publicApi
 */
@NgModule({
  exports: [RouterModule],
  providers: [
    ROUTER_PROVIDERS, {provide: Location, useClass: SpyLocation},
    {provide: LocationStrategy, useClass: MockLocationStrategy},
    {provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader}, {
      provide: Router,
      useFactory: setupTestingRouter,
      deps: [
        UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
        ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
      ]
    },
    {provide: PreloadingStrategy, useExisting: NoPreloading}, provideRoutes([])
  ]
})
export class RouterTestingModule {
  static withRoutes(routes: Routes, config?: ExtraOptions):
      ModuleWithProviders<RouterTestingModule> {
    return {
      ngModule: RouterTestingModule,
      providers: [
        provideRoutes(routes),
        {provide: ROUTER_CONFIGURATION, useValue: config ? config : {}},
      ]
    };
  }
}
