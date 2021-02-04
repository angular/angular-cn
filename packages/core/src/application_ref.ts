/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import './util/ng_jit_mode';

import {merge, Observable, Observer, Subscription} from 'rxjs';
import {share} from 'rxjs/operators';

import {ApplicationInitStatus} from './application_init';
import {APP_BOOTSTRAP_LISTENER, PLATFORM_INITIALIZER} from './application_tokens';
import {getCompilerFacade} from './compiler/compiler_facade';
import {Console} from './console';
import {Injectable} from './di/injectable';
import {InjectionToken} from './di/injection_token';
import {Injector} from './di/injector';
import {StaticProvider} from './di/interface/provider';
import {INJECTOR_SCOPE} from './di/scope';
import {ErrorHandler} from './error_handler';
import {DEFAULT_LOCALE_ID} from './i18n/localization';
import {LOCALE_ID} from './i18n/tokens';
import {Type} from './interface/type';
import {ivyEnabled} from './ivy_switch';
import {COMPILER_OPTIONS, CompilerFactory, CompilerOptions} from './linker/compiler';
import {ComponentFactory, ComponentRef} from './linker/component_factory';
import {ComponentFactoryBoundToModule, ComponentFactoryResolver} from './linker/component_factory_resolver';
import {InternalNgModuleRef, NgModuleFactory, NgModuleRef} from './linker/ng_module_factory';
import {InternalViewRef, ViewRef} from './linker/view_ref';
import {isComponentResourceResolutionQueueEmpty, resolveComponentResources} from './metadata/resource_loading';
import {assertNgModuleType} from './render3/assert';
import {ComponentFactory as R3ComponentFactory} from './render3/component_ref';
import {setLocaleId} from './render3/i18n/i18n_locale_id';
import {setJitOptions} from './render3/jit/jit_options';
import {NgModuleFactory as R3NgModuleFactory} from './render3/ng_module_ref';
import {publishDefaultGlobalUtils as _publishDefaultGlobalUtils} from './render3/util/global_utils';
import {Testability, TestabilityRegistry} from './testability/testability';
import {isDevMode} from './util/is_dev_mode';
import {isPromise} from './util/lang';
import {scheduleMicroTask} from './util/microtask';
import {stringify} from './util/stringify';
import {NgZone, NoopNgZone} from './zone/ng_zone';

let _platform: PlatformRef;

let compileNgModuleFactory:
    <M>(injector: Injector, options: CompilerOptions, moduleType: Type<M>) =>
        Promise<NgModuleFactory<M>> = compileNgModuleFactory__PRE_R3__;

function compileNgModuleFactory__PRE_R3__<M>(
    injector: Injector, options: CompilerOptions,
    moduleType: Type<M>): Promise<NgModuleFactory<M>> {
  const compilerFactory: CompilerFactory = injector.get(CompilerFactory);
  const compiler = compilerFactory.createCompiler([options]);
  return compiler.compileModuleAsync(moduleType);
}

export function compileNgModuleFactory__POST_R3__<M>(
    injector: Injector, options: CompilerOptions,
    moduleType: Type<M>): Promise<NgModuleFactory<M>> {
  ngDevMode && assertNgModuleType(moduleType);

  const moduleFactory = new R3NgModuleFactory(moduleType);

  // All of the logic below is irrelevant for AOT-compiled code.
  if (typeof ngJitMode !== 'undefined' && !ngJitMode) {
    return Promise.resolve(moduleFactory);
  }

  const compilerOptions = injector.get(COMPILER_OPTIONS, []).concat(options);

  // Configure the compiler to use the provided options. This call may fail when multiple modules
  // are bootstrapped with incompatible options, as a component can only be compiled according to
  // a single set of options.
  setJitOptions({
    defaultEncapsulation: _lastDefined(compilerOptions.map(opts => opts.defaultEncapsulation)),
    preserveWhitespaces: _lastDefined(compilerOptions.map(opts => opts.preserveWhitespaces)),
  });

  if (isComponentResourceResolutionQueueEmpty()) {
    return Promise.resolve(moduleFactory);
  }

  const compilerProviders = _mergeArrays(compilerOptions.map(o => o.providers!));

  // In case there are no compiler providers, we just return the module factory as
  // there won't be any resource loader. This can happen with Ivy, because AOT compiled
  // modules can be still passed through "bootstrapModule". In that case we shouldn't
  // unnecessarily require the JIT compiler.
  if (compilerProviders.length === 0) {
    return Promise.resolve(moduleFactory);
  }

  const compiler = getCompilerFacade();
  const compilerInjector = Injector.create({providers: compilerProviders});
  const resourceLoader = compilerInjector.get(compiler.ResourceLoader);
  // The resource loader can also return a string while the "resolveComponentResources"
  // always expects a promise. Therefore we need to wrap the returned value in a promise.
  return resolveComponentResources(url => Promise.resolve(resourceLoader.get(url)))
      .then(() => moduleFactory);
}

// the `window.ng` global utilities are only available in non-VE versions of
// Angular. The function switch below will make sure that the code is not
// included into Angular when PRE mode is active.
export function publishDefaultGlobalUtils__PRE_R3__() {}
export function publishDefaultGlobalUtils__POST_R3__() {
  ngDevMode && _publishDefaultGlobalUtils();
}

let publishDefaultGlobalUtils: () => any = publishDefaultGlobalUtils__PRE_R3__;

let isBoundToModule: <C>(cf: ComponentFactory<C>) => boolean = isBoundToModule__PRE_R3__;

export function isBoundToModule__PRE_R3__<C>(cf: ComponentFactory<C>): boolean {
  return cf instanceof ComponentFactoryBoundToModule;
}

export function isBoundToModule__POST_R3__<C>(cf: ComponentFactory<C>): boolean {
  return (cf as R3ComponentFactory<C>).isBoundToModule;
}

export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>('AllowMultipleToken');



/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * 本令牌可以在 NgProbe 中注册自己的第三方组件。
 *
 * @publicApi
 */
export class NgProbeToken {
  constructor(public name: string, public token: any) {}
}

/**
 * Creates a platform.
 * Platforms must be created on launch using this function.
 *
 * 创建一个平台。必须使用此函数在启动时创建平台。
 *
 * @publicApi
 */
export function createPlatform(injector: Injector): PlatformRef {
  if (_platform && !_platform.destroyed &&
      !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
    throw new Error(
        'There can be only one platform. Destroy the previous one to create a new one.');
  }
  publishDefaultGlobalUtils();
  _platform = injector.get(PlatformRef);
  const inits = injector.get(PLATFORM_INITIALIZER, null);
  if (inits) inits.forEach((init: any) => init());
  return _platform;
}

/**
 * Creates a factory for a platform. Can be used to provide or override `Providers` specific to
 * your applciation's runtime needs, such as `PLATFORM_INITIALIZER` and `PLATFORM_ID`.
 *
 * 为平台创建工厂。可用于提供或覆盖针对你的应用程序的运行时需求的 `Providers`，比如 `PLATFORM_INITIALIZER` 和 `PLATFORM_ID` 。
 *
 * @param parentPlatformFactory Another platform factory to modify. Allows you to compose factories
 * to build up configurations that might be required by different libraries or parts of the
 * application.
 *
 * 要修改的另一个平台工厂。允许你组合多个工厂来构建一些配置，其它库或应用程序的其它部分可能需要的它们。
 *
 * @param name Identifies the new platform factory.
 *
 * 标识新的平台工厂。
 *
 * @param providers A set of dependency providers for platforms created with the new factory.
 *
 * 使用新工厂创建的平台的一组依赖项提供者。
 *
 * @publicApi
 */
export function createPlatformFactory(
    parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef)|null, name: string,
    providers: StaticProvider[] = []): (extraProviders?: StaticProvider[]) => PlatformRef {
  const desc = `Platform: ${name}`;
  const marker = new InjectionToken(desc);
  return (extraProviders: StaticProvider[] = []) => {
    let platform = getPlatform();
    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
      if (parentPlatformFactory) {
        parentPlatformFactory(
            providers.concat(extraProviders).concat({provide: marker, useValue: true}));
      } else {
        const injectedProviders: StaticProvider[] =
            providers.concat(extraProviders).concat({provide: marker, useValue: true}, {
              provide: INJECTOR_SCOPE,
              useValue: 'platform'
            });
        createPlatform(Injector.create({providers: injectedProviders, name: desc}));
      }
    }
    return assertPlatform(marker);
  };
}

/**
 * Checks that there is currently a platform that contains the given token as a provider.
 *
 * 检查当前是否存在以给定令牌为提供者的平台。
 *
 * @publicApi
 */
export function assertPlatform(requiredToken: any): PlatformRef {
  const platform = getPlatform();

  if (!platform) {
    throw new Error('No platform exists!');
  }

  if (!platform.injector.get(requiredToken, null)) {
    throw new Error(
        'A platform with a different configuration has been created. Please destroy it first.');
  }

  return platform;
}

/**
 * Destroys the current Angular platform and all Angular applications on the page.
 * Destroys all modules and listeners registered with the platform.
 *
 * 销毁页面上的当前 Angular 平台和所有 Angular 应用程序。销毁在平台上注册的所有模块和监听器。
 *
 * @publicApi
 */
export function destroyPlatform(): void {
  if (_platform && !_platform.destroyed) {
    _platform.destroy();
  }
}

/**
 * Returns the current platform.
 *
 * 返回当前平台。
 *
 * @publicApi
 */
export function getPlatform(): PlatformRef|null {
  return _platform && !_platform.destroyed ? _platform : null;
}

/**
 * Provides additional options to the bootstraping process.
 *
 *
 */
export interface BootstrapOptions {
  /**
   * Optionally specify which `NgZone` should be used.
   *
   * - Provide your own `NgZone` instance.
   * - `zone.js` - Use default `NgZone` which requires `Zone.js`.
   * - `noop` - Use `NoopNgZone` which does nothing.
   */
  ngZone?: NgZone|'zone.js'|'noop';

  /**
   * Optionally specify coalescing event change detections or not.
   * Consider the following case.
   *
   * <div (click)="doSomething()">
   *   <button (click)="doSomethingElse()"></button>
   * </div>
   *
   * When button is clicked, because of the event bubbling, both
   * event handlers will be called and 2 change detections will be
   * triggered. We can colesce such kind of events to only trigger
   * change detection only once.
   *
   * By default, this option will be false. So the events will not be
   * coalesced and the change detection will be triggered multiple times.
   * And if this option be set to true, the change detection will be
   * triggered async by scheduling a animation frame. So in the case above,
   * the change detection will only be triggered once.
   */
  ngZoneEventCoalescing?: boolean;

  /**
   * Optionally specify if `NgZone#run()` method invocations should be coalesced
   * into a single change detection.
   *
   * Consider the following case.
   *
   * for (let i = 0; i < 10; i ++) {
   *   ngZone.run(() => {
   *     // do something
   *   });
   * }
   *
   * This case triggers the change detection multiple times.
   * With ngZoneRunCoalescing options, all change detections in an event loop trigger only once.
   * In addition, the change detection executes in requestAnimation.
   *
   */
  ngZoneRunCoalescing?: boolean;
}

/**
 * The Angular platform is the entry point for Angular on a web page.
 * Each page has exactly one platform. Services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 * A page's platform is initialized implicitly when a platform is created using a platform
 * factory such as `PlatformBrowser`, or explicitly by calling the `createPlatform()` function.
 *
 * Angular 平台是 Angular 在网页上的入口点。每个页面只有一个平台。页面上运行的每个 Angular 应用程序所共有的服务（例如反射）都在其范围内绑定。当使用 `PlatformBrowser` 这样的平台工厂创建平台时，将隐式初始化此页面的平台；也可以通过调用 `createPlatform()` 函数来显式初始化此页面的平台。
 *
 * @publicApi
 */
@Injectable()
export class PlatformRef {
  private _modules: NgModuleRef<any>[] = [];
  private _destroyListeners: Function[] = [];
  private _destroyed: boolean = false;

  /** @internal */
  constructor(private _injector: Injector) {}

  /**
   * Creates an instance of an `@NgModule` for the given platform for offline compilation.
   *
   * 为给定的平台创建 `@NgModule` 的实例，以进行离线编译。
   *
   * @usageNotes
   *
   * The following example creates the NgModule for a browser platform.
   *
   * 以下示例为浏览器平台创建 NgModule。
   *
   * ```typescript
   * my_module.ts:
   *
   * @NgModule({
   *   imports: [BrowserModule]
   * })
   * class MyModule {}
   *
   * main.ts:
   * import {MyModuleNgFactory} from './my_module.ngfactory';
   * import {platformBrowser} from '@angular/platform-browser';
   *
   * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
   * ```
   */
  bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions):
      Promise<NgModuleRef<M>> {
    // Note: We need to create the NgZone _before_ we instantiate the module,
    // as instantiating the module creates some providers eagerly.
    // So we create a mini parent injector that just contains the new NgZone and
    // pass that as parent to the NgModuleFactory.
    const ngZoneOption = options ? options.ngZone : undefined;
    const ngZoneEventCoalescing = (options && options.ngZoneEventCoalescing) || false;
    const ngZoneRunCoalescing = (options && options.ngZoneRunCoalescing) || false;
    const ngZone = getNgZone(ngZoneOption, {ngZoneEventCoalescing, ngZoneRunCoalescing});
    const providers: StaticProvider[] = [{provide: NgZone, useValue: ngZone}];
    // Note: Create ngZoneInjector within ngZone.run so that all of the instantiated services are
    // created within the Angular zone
    // Do not try to replace ngZone.run with ApplicationRef#run because ApplicationRef would then be
    // created outside of the Angular zone.
    return ngZone.run(() => {
      const ngZoneInjector = Injector.create(
          {providers: providers, parent: this.injector, name: moduleFactory.moduleType.name});
      const moduleRef = <InternalNgModuleRef<M>>moduleFactory.create(ngZoneInjector);
      const exceptionHandler: ErrorHandler|null = moduleRef.injector.get(ErrorHandler, null);
      if (!exceptionHandler) {
        throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
      }
      moduleRef.onDestroy(() => remove(this._modules, moduleRef));
      ngZone!.runOutsideAngular(() => ngZone!.onError.subscribe({
        next: (error: any) => {
          exceptionHandler.handleError(error);
        }
      }));
      return _callAndReportToErrorHandler(exceptionHandler, ngZone!, () => {
        const initStatus: ApplicationInitStatus = moduleRef.injector.get(ApplicationInitStatus);
        initStatus.runInitializers();
        return initStatus.donePromise.then(() => {
          if (ivyEnabled) {
            // If the `LOCALE_ID` provider is defined at bootstrap then we set the value for ivy
            const localeId = moduleRef.injector.get(LOCALE_ID, DEFAULT_LOCALE_ID);
            setLocaleId(localeId || DEFAULT_LOCALE_ID);
          }
          this._moduleDoBootstrap(moduleRef);
          return moduleRef;
        });
      });
    });
  }

  /**
   * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
   *
   * 使用给定的运行时编译器为给定的平台创建 `@NgModule` 的实例。
   *
   * @usageNotes
   *
   * ### Simple Example
   *
   * ### 简单的例子
   *
   * ```typescript
   * @NgModule({
   *   imports: [BrowserModule]
   * })
   * class MyModule {}
   *
   * let moduleRef = platformBrowser().bootstrapModule(MyModule);
   * ```
   *
   */
  bootstrapModule<M>(
      moduleType: Type<M>,
      compilerOptions: (CompilerOptions&BootstrapOptions)|
      Array<CompilerOptions&BootstrapOptions> = []): Promise<NgModuleRef<M>> {
    const options = optionsReducer({}, compilerOptions);
    return compileNgModuleFactory(this.injector, options, moduleType)
        .then(moduleFactory => this.bootstrapModuleFactory(moduleFactory, options));
  }

  private _moduleDoBootstrap(moduleRef: InternalNgModuleRef<any>): void {
    const appRef = moduleRef.injector.get(ApplicationRef) as ApplicationRef;
    if (moduleRef._bootstrapComponents.length > 0) {
      moduleRef._bootstrapComponents.forEach(f => appRef.bootstrap(f));
    } else if (moduleRef.instance.ngDoBootstrap) {
      moduleRef.instance.ngDoBootstrap(appRef);
    } else {
      throw new Error(
          `The module ${
              stringify(
                  moduleRef.instance
                      .constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
          `Please define one of these.`);
    }
    this._modules.push(moduleRef);
  }

  /**
   * Registers a listener to be called when the platform is destroyed.
   *
   * 注册销毁平台时要调用的监听器。
   *
   */
  onDestroy(callback: () => void): void {
    this._destroyListeners.push(callback);
  }

  /**
   * Retrieves the platform {@link Injector}, which is the parent injector for
   * every Angular application on the page and provides singleton providers.
   *
   * 检索平台 {@link Injector}，该平台是页面上每个 Angular 应用程序的父注入器，并提供单例提供者。
   *
   */
  get injector(): Injector {
    return this._injector;
  }

  /**
   * Destroys the current Angular platform and all Angular applications on the page.
   * Destroys all modules and listeners registered with the platform.
   *
   * 销毁页面上的当前 Angular 平台和所有 Angular 应用程序。销毁在平台上注册的所有模块和监听器。
   *
   */
  destroy() {
    if (this._destroyed) {
      throw new Error('The platform has already been destroyed!');
    }
    this._modules.slice().forEach(module => module.destroy());
    this._destroyListeners.forEach(listener => listener());
    this._destroyed = true;
  }

  get destroyed() {
    return this._destroyed;
  }
}

function getNgZone(
    ngZoneOption: NgZone|'zone.js'|'noop'|undefined,
    extra?: {ngZoneEventCoalescing: boolean, ngZoneRunCoalescing: boolean}): NgZone {
  let ngZone: NgZone;

  if (ngZoneOption === 'noop') {
    ngZone = new NoopNgZone();
  } else {
    ngZone = (ngZoneOption === 'zone.js' ? undefined : ngZoneOption) || new NgZone({
               enableLongStackTrace: isDevMode(),
               shouldCoalesceEventChangeDetection: !!extra?.ngZoneEventCoalescing,
               shouldCoalesceRunChangeDetection: !!extra?.ngZoneRunCoalescing
             });
  }
  return ngZone;
}

function _callAndReportToErrorHandler(
    errorHandler: ErrorHandler, ngZone: NgZone, callback: () => any): any {
  try {
    const result = callback();
    if (isPromise(result)) {
      return result.catch((e: any) => {
        ngZone.runOutsideAngular(() => errorHandler.handleError(e));
        // rethrow as the exception handler might not do it
        throw e;
      });
    }

    return result;
  } catch (e) {
    ngZone.runOutsideAngular(() => errorHandler.handleError(e));
    // rethrow as the exception handler might not do it
    throw e;
  }
}

function optionsReducer<T extends Object>(dst: any, objs: T|T[]): T {
  if (Array.isArray(objs)) {
    dst = objs.reduce(optionsReducer, dst);
  } else {
    dst = {...dst, ...(objs as any)};
  }
  return dst;
}

/**
 * A reference to an Angular application running on a page.
 *
 * 对页面上运行的 Angular 应用程序的引用。
 *
 * @usageNotes
 *
 * {@a is-stable-examples}
 * ### isStable examples and caveats
 *
 * Note two important points about `isStable`, demonstrated in the examples below:
 * - the application will never be stable if you start any kind
 * of recurrent asynchronous task when the application starts
 * (for example for a polling process, started with a `setInterval`, a `setTimeout`
 * or using RxJS operators like `interval`);
 * - the `isStable` Observable runs outside of the Angular zone.
 *
 * Let's imagine that you start a recurrent task
 * (here incrementing a counter, using RxJS `interval`),
 * and at the same time subscribe to `isStable`.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *      filter(stable => stable)
 *   ).subscribe(() => console.log('App is stable now');
 *   interval(1000).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, `isStable` will never emit `true`,
 * and the trace "App is stable now" will never get logged.
 *
 * If you want to execute something when the app is stable,
 * you have to wait for the application to be stable
 * before starting your polling process.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     tap(stable => console.log('App is stable now')),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, the trace "App is stable now" will be logged
 * and then the counter starts incrementing every second.
 *
 * Note also that this Observable runs outside of the Angular zone,
 * which means that the code in the subscription
 * to this Observable will not trigger the change detection.
 *
 * Let's imagine that instead of logging the counter value,
 * you update a field of your component
 * and display it in its template.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => this.value = counter);
 * }
 * ```
 * As the `isStable` Observable runs outside the zone,
 * the `value` field will be updated properly,
 * but the template will not be refreshed!
 *
 * You'll have to manually trigger the change detection to update the template.
 *
 * ```
 * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => {
 *     this.value = counter;
 *     cd.detectChanges();
 *   });
 * }
 * ```
 *
 * Or make the subscription callback run inside the zone.
 *
 * ```
 * constructor(appRef: ApplicationRef, zone: NgZone) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => zone.run(() => this.value = counter));
 * }
 * ```
 *
 * @publicApi
 */
@Injectable()
export class ApplicationRef {
  /** @internal */
  private _bootstrapListeners: ((compRef: ComponentRef<any>) => void)[] = [];
  private _views: InternalViewRef[] = [];
  private _runningTick: boolean = false;
  private _enforceNoNewChanges: boolean = false;
  private _stable = true;

  /**
   * Get a list of component types registered to this application.
   * This list is populated even before the component is created.
   *
   * 获取注册到该应用程序的组件类型的列表。在创建组件之前，会填充此列表。
   *
   */
  public readonly componentTypes: Type<any>[] = [];

  /**
   * Get a list of components registered to this application.
   *
   * 获取已注册到该应用中的组件的列表。
   *
   */
  public readonly components: ComponentRef<any>[] = [];

  /**
   * Returns an Observable that indicates when the application is stable or unstable.
   *
   * 返回一个 Observable，指示应用程序何时变得稳定或不稳定。
   *
   * @see  [Usage notes](#is-stable-examples) for examples and caveats when using this API.
   *
   * [用法说明](#is-stable-examples)的例子和使用此 API 时的注意事项。
   *
   */
  // TODO(issue/24571): remove '!'.
  public readonly isStable!: Observable<boolean>;

  /** @internal */
  constructor(
      private _zone: NgZone, private _console: Console, private _injector: Injector,
      private _exceptionHandler: ErrorHandler,
      private _componentFactoryResolver: ComponentFactoryResolver,
      private _initStatus: ApplicationInitStatus) {
    this._enforceNoNewChanges = isDevMode();

    this._zone.onMicrotaskEmpty.subscribe({
      next: () => {
        this._zone.run(() => {
          this.tick();
        });
      }
    });

    const isCurrentlyStable = new Observable<boolean>((observer: Observer<boolean>) => {
      this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks &&
          !this._zone.hasPendingMicrotasks;
      this._zone.runOutsideAngular(() => {
        observer.next(this._stable);
        observer.complete();
      });
    });

    const isStable = new Observable<boolean>((observer: Observer<boolean>) => {
      // Create the subscription to onStable outside the Angular Zone so that
      // the callback is run outside the Angular Zone.
      let stableSub: Subscription;
      this._zone.runOutsideAngular(() => {
        stableSub = this._zone.onStable.subscribe(() => {
          NgZone.assertNotInAngularZone();

          // Check whether there are no pending macro/micro tasks in the next tick
          // to allow for NgZone to update the state.
          scheduleMicroTask(() => {
            if (!this._stable && !this._zone.hasPendingMacrotasks &&
                !this._zone.hasPendingMicrotasks) {
              this._stable = true;
              observer.next(true);
            }
          });
        });
      });

      const unstableSub: Subscription = this._zone.onUnstable.subscribe(() => {
        NgZone.assertInAngularZone();
        if (this._stable) {
          this._stable = false;
          this._zone.runOutsideAngular(() => {
            observer.next(false);
          });
        }
      });

      return () => {
        stableSub.unsubscribe();
        unstableSub.unsubscribe();
      };
    });

    (this as {isStable: Observable<boolean>}).isStable =
        merge(isCurrentlyStable, isStable.pipe(share()));
  }

  /**
   * Bootstrap a new component at the root level of the application.
   *
   * 在应用程序的根级引导新组件。
   *
   * @usageNotes
   *
   * ### Bootstrap process
   *
   * ### 引导过程
   *
   * When bootstrapping a new root component into an application, Angular mounts the
   * specified application component onto DOM elements identified by the componentType's
   * selector and kicks off automatic change detection to finish initializing the component.
   *
   * 将新的根组件引导到应用程序时，Angular 将指定的应用程序组件安装到由 componentType 的选择器标识的 DOM 元素上，并启动自动变更检测以完成组件的初始化。
   *
   * Optionally, a component can be mounted onto a DOM element that does not match the
   * componentType's selector.
   *
   * （可选）可以将组件安装到与 componentType 的选择器不匹配的 DOM 元素上。
   *
   * ### Example
   *
   * ### 例子
   *
   * {@example core/ts/platform/platform.ts region='longform'}
   */
  bootstrap<C>(componentOrFactory: ComponentFactory<C>|Type<C>, rootSelectorOrNode?: string|any):
      ComponentRef<C> {
    if (!this._initStatus.done) {
      throw new Error(
          'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
    }
    let componentFactory: ComponentFactory<C>;
    if (componentOrFactory instanceof ComponentFactory) {
      componentFactory = componentOrFactory;
    } else {
      componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(componentOrFactory)!;
    }
    this.componentTypes.push(componentFactory.componentType);

    // Create a factory associated with the current module if it's not bound to some other
    const ngModule =
        isBoundToModule(componentFactory) ? undefined : this._injector.get(NgModuleRef);
    const selectorOrNode = rootSelectorOrNode || componentFactory.selector;
    const compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);

    compRef.onDestroy(() => {
      this._unloadComponent(compRef);
    });
    const testability = compRef.injector.get(Testability, null);
    if (testability) {
      compRef.injector.get(TestabilityRegistry)
          .registerApplication(compRef.location.nativeElement, testability);
    }

    this._loadComponent(compRef);
    if (isDevMode()) {
      this._console.log(
          `Angular is running in development mode. Call enableProdMode() to enable production mode.`);
    }
    return compRef;
  }

  /**
   * Invoke this method to explicitly process change detection and its side-effects.
   *
   * 调用此方法可以显式处理变更检测及其副作用。
   *
   * In development mode, `tick()` also performs a second change detection cycle to ensure that no
   * further changes are detected. If additional changes are picked up during this second cycle,
   * bindings in the app have side-effects that cannot be resolved in a single change detection
   * pass.
   * In this case, Angular throws an error, since an Angular application can only have one change
   * detection pass during which all change detection must complete.
   *
   * 在开发模式下，`tick()` 还会执行第二个变更检测周期，以确保没有检测到其他更改。如果在第二个周期内获取了其他更改，则应用程序中的绑定就会产生副作用，这些副作用无法通过一次变更检测过程解决。在这种情况下，Angular 就会引发错误，因为 Angular 应用程序只能进行一次变更检测遍历，在此过程中必须完成所有变更检测。
   *
   */
  tick(): void {
    if (this._runningTick) {
      throw new Error('ApplicationRef.tick is called recursively');
    }

    try {
      this._runningTick = true;
      for (let view of this._views) {
        view.detectChanges();
      }
      if (this._enforceNoNewChanges) {
        for (let view of this._views) {
          view.checkNoChanges();
        }
      }
    } catch (e) {
      // Attention: Don't rethrow as it could cancel subscriptions to Observables!
      this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
    } finally {
      this._runningTick = false;
    }
  }

  /**
   * Attaches a view so that it will be dirty checked.
   * The view will be automatically detached when it is destroyed.
   * This will throw if the view is already attached to a ViewContainer.
   *
   * 附加视图，以便对其进行脏检查。视图销毁后将自动分离。如果视图已附加到 ViewContainer，则会抛出此错误。
   *
   */
  attachView(viewRef: ViewRef): void {
    const view = (viewRef as InternalViewRef);
    this._views.push(view);
    view.attachToAppRef(this);
  }

  /**
   * Detaches a view from dirty checking again.
   *
   * 再次从脏检查中分离视图。
   *
   */
  detachView(viewRef: ViewRef): void {
    const view = (viewRef as InternalViewRef);
    remove(this._views, view);
    view.detachFromAppRef();
  }

  private _loadComponent(componentRef: ComponentRef<any>): void {
    this.attachView(componentRef.hostView);
    this.tick();
    this.components.push(componentRef);
    // Get the listeners lazily to prevent DI cycles.
    const listeners =
        this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
    listeners.forEach((listener) => listener(componentRef));
  }

  private _unloadComponent(componentRef: ComponentRef<any>): void {
    this.detachView(componentRef.hostView);
    remove(this.components, componentRef);
  }

  /** @internal */
  ngOnDestroy() {
    // TODO(alxhub): Dispose of the NgZone.
    this._views.slice().forEach((view) => view.destroy());
  }

  /**
   * Returns the number of attached views.
   *
   * 返回已附加视图的数量。
   *
   */
  get viewCount() {
    return this._views.length;
  }
}

function remove<T>(list: T[], el: T): void {
  const index = list.indexOf(el);
  if (index > -1) {
    list.splice(index, 1);
  }
}

function _lastDefined<T>(args: T[]): T|undefined {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== undefined) {
      return args[i];
    }
  }
  return undefined;
}

function _mergeArrays(parts: any[][]): any[] {
  const result: any[] = [];
  parts.forEach((part) => part && result.push(...part));
  return result;
}
