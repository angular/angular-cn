/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Type} from '../interface/type';
import {makeDecorator, TypeDecorator} from '../util/decorators';

import {getInjectableDef, InjectableType, ɵɵdefineInjectable} from './interface/defs';
import {ClassSansProvider, ConstructorSansProvider, ExistingSansProvider, FactorySansProvider, StaticClassSansProvider, ValueSansProvider} from './interface/provider';
import {compileInjectable as render3CompileInjectable} from './jit/injectable';
import {convertInjectableProviderToFactory} from './util';



/**
 * Injectable providers used in `@Injectable` decorator.
 *
 * `@Injectable` 装饰器中使用的可注入对象提供者。
 *
 * @publicApi
 */
export type InjectableProvider = ValueSansProvider|ExistingSansProvider|StaticClassSansProvider|
    ConstructorSansProvider|FactorySansProvider|ClassSansProvider;

/**
 * Type of the Injectable decorator / constructor function.
 *
 * Injectable 装饰器的类型和构造函数
 *
 * @publicApi
 */
export interface InjectableDecorator {
  /**
   * Decorator that marks a class as available to be
   * provided and injected as a dependency.
   *
   * 标记性元数据，表示一个类可以由 `Injector` 进行创建。
   *
   * @see [Introduction to Services and DI](guide/architecture-services)
   *
   * [服务和 DI 简介](guide/architecture-services)
   *
   * @see [Dependency Injection Guide](guide/dependency-injection)
   *
   * [依赖注入指南](guide/dependency-injection)
   *
   * @usageNotes
   *
   * Marking a class with `@Injectable` ensures that the compiler
   * will generate the necessary metadata to create the class's
   * dependencies when the class is injected.
   *
   * 使用 `@Injectable` 标记一个类可确保编译器将在注入类时生成必要的元数据，以创建类的依赖项。
   *
   * The following example shows how a service class is properly
   *  marked so that a supporting service can be injected upon creation.
   *
   * 下面的例子展示了如何正确的把服务类标记为可注入的（Injectable）。
   *
   * <code-example path="core/di/ts/metadata_spec.ts" region="Injectable"></code-example>
   *
   */
  (): TypeDecorator;
  (options?: {providedIn: Type<any>|'root'|'platform'|'any'|null}&
   InjectableProvider): TypeDecorator;
  new(): Injectable;
  new(options?: {providedIn: Type<any>|'root'|'platform'|'any'|null}&
      InjectableProvider): Injectable;
}

/**
 * Type of the Injectable metadata.
 *
 * Injectable 元数据的类型。
 *
 * @publicApi
 */
export interface Injectable {
  /**
   * Determines which injectors will provide the injectable,
   * by either associating it with an `@NgModule` or other `InjectorType`,
   * or by specifying that this injectable should be provided in one of the following injectors:
   *
   * 通过与 `@NgModule` 或其他 `InjectorType` 关联，或通过指定应在以下注入器之一中提供此可注入对象，来确定将提供该对象的注入器：
   *
   * - 'root' : The application-level injector in most apps.
   *
   *   'root'：在大多数应用程序中是指应用程序级注入器。
   *
   * - 'platform' : A special singleton platform injector shared by all
   * applications on the page.
   *
   *     'platform' ：页面上所有应用程序共享的平台注入器的特殊单例。
   *
   * - 'any' : Provides a unique instance in each lazy loaded module while all eagerly loaded
   * modules share one instance.
   *
   *     'any'：在每个惰性加载的模块中提供一个唯一的实例，而所有急性加载的模块共享一个实例。
   */
  providedIn?: Type<any>|'root'|'platform'|'any'|null;
}

/**
 * Injectable decorator and metadata.
 *
 * Injectable 的装饰器和元数据。
*
* @Annotation
 * @publicApi
 */
export const Injectable: InjectableDecorator = makeDecorator(
    'Injectable', undefined, undefined, undefined,
    (type: Type<any>, meta: Injectable) => SWITCH_COMPILE_INJECTABLE(type as any, meta));


/**
 * Supports @Injectable() in JIT mode for Render2.
 */
function render2CompileInjectable(
    injectableType: Type<any>,
    options?: {providedIn?: Type<any>|'root'|'platform'|'any'|null}&InjectableProvider): void {
  if (options && options.providedIn !== undefined && !getInjectableDef(injectableType)) {
    (injectableType as InjectableType<any>).ɵprov = ɵɵdefineInjectable({
      token: injectableType,
      providedIn: options.providedIn,
      factory: convertInjectableProviderToFactory(injectableType, options),
    });
  }
}

export const SWITCH_COMPILE_INJECTABLE__POST_R3__ = render3CompileInjectable;
const SWITCH_COMPILE_INJECTABLE__PRE_R3__ = render2CompileInjectable;
const SWITCH_COMPILE_INJECTABLE: typeof render3CompileInjectable =
    SWITCH_COMPILE_INJECTABLE__PRE_R3__;
