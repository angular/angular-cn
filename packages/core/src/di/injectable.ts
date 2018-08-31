/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {R3_COMPILE_INJECTABLE} from '../ivy_switch';
import {ReflectionCapabilities} from '../reflection/reflection_capabilities';
import {Type} from '../type';
import {makeDecorator, makeParamDecorator} from '../util/decorators';
import {getClosureSafeProperty} from '../util/property';

import {InjectableDef, InjectableType, defineInjectable} from './defs';
import {inject, injectArgs} from './injector';
import {ClassSansProvider, ConstructorProvider, ConstructorSansProvider, ExistingProvider, ExistingSansProvider, FactoryProvider, FactorySansProvider, StaticClassProvider, StaticClassSansProvider, ValueProvider, ValueSansProvider} from './provider';

const GET_PROPERTY_NAME = {} as any;
const USE_VALUE = getClosureSafeProperty<ValueProvider>(
    {provide: String, useValue: GET_PROPERTY_NAME}, GET_PROPERTY_NAME);

/**
 * Injectable providers used in `@Injectable` decorator.
 *
 * `@Injectable` 装饰器中使用的可注入对象提供商。
 *
 * @experimental
 */
export type InjectableProvider = ValueSansProvider | ExistingSansProvider |
    StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;

/**
 * Type of the Injectable decorator / constructor function.
 *
 * Injectable 装饰器的类型和构造函数
 */
export interface InjectableDecorator {
  /**
   * A marker metadata that marks a class as available to `Injector` for creation.
   *
   * 标记性元数据，表示一个类可以由 `Injector` 进行创建。
   *
   * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
   *
   * 欲知详情，参见["依赖注入"](guide/dependency-injection)。
   *
   * @usageNotes
   * ### Example
   *
   * ### 范例
   *
   * {@example core/di/ts/metadata_spec.ts region='Injectable'}
   *
   * `Injector` will throw an error when trying to instantiate a class that
   * does not have `@Injectable` marker, as shown in the example below.
   *
   * `Injector`在试图实例化一个不带 `@Injectable` 标记的类时，就会抛出一个错误，如下面的例子所示。
   *
   * {@example core/di/ts/metadata_spec.ts region='InjectableThrows'}
   *
   */
  (): any;
  (options?: {providedIn: Type<any>| 'root' | null}&InjectableProvider): any;
  new (): Injectable;
  new (options?: {providedIn: Type<any>| 'root' | null}&InjectableProvider): Injectable;
}

/**
 * Type of the Injectable metadata.
 *
 * Injectable 元数据的类型。
 *
 * @experimental
 */
export interface Injectable { providedIn?: Type<any>|'root'|null; }

const EMPTY_ARRAY: any[] = [];

export function convertInjectableProviderToFactory(
    type: Type<any>, provider?: InjectableProvider): () => any {
  if (!provider) {
    const reflectionCapabilities = new ReflectionCapabilities();
    const deps = reflectionCapabilities.parameters(type);
    // TODO - convert to flags.
    return () => new type(...injectArgs(deps as any[]));
  }

  if (USE_VALUE in provider) {
    const valueProvider = (provider as ValueSansProvider);
    return () => valueProvider.useValue;
  } else if ((provider as ExistingSansProvider).useExisting) {
    const existingProvider = (provider as ExistingSansProvider);
    return () => inject(existingProvider.useExisting);
  } else if ((provider as FactorySansProvider).useFactory) {
    const factoryProvider = (provider as FactorySansProvider);
    return () => factoryProvider.useFactory(...injectArgs(factoryProvider.deps || EMPTY_ARRAY));
  } else if ((provider as StaticClassSansProvider | ClassSansProvider).useClass) {
    const classProvider = (provider as StaticClassSansProvider | ClassSansProvider);
    let deps = (provider as StaticClassSansProvider).deps;
    if (!deps) {
      const reflectionCapabilities = new ReflectionCapabilities();
      deps = reflectionCapabilities.parameters(type);
    }
    return () => new classProvider.useClass(...injectArgs(deps));
  } else {
    let deps = (provider as ConstructorSansProvider).deps;
    if (!deps) {
      const reflectionCapabilities = new ReflectionCapabilities();
      deps = reflectionCapabilities.parameters(type);
    }
    return () => new type(...injectArgs(deps !));
  }
}

/**
 * Supports @Injectable() in JIT mode for Render2.
 *
 * 在 JIT 模式下为 Render2 提供 `@Injectable()` 支持。
 */
function preR3InjectableCompile(
    injectableType: InjectableType<any>,
    options: {providedIn?: Type<any>| 'root' | null} & InjectableProvider): void {
  if (options && options.providedIn !== undefined && injectableType.ngInjectableDef === undefined) {
    injectableType.ngInjectableDef = defineInjectable({
      providedIn: options.providedIn,
      factory: convertInjectableProviderToFactory(injectableType, options),
    });
  }
}

/**
* Injectable decorator and metadata.
*
* Injectable 的装饰器和元数据。
*
* @Annotation
*/
export const Injectable: InjectableDecorator = makeDecorator(
    'Injectable', undefined, undefined, undefined,
    (type: Type<any>, meta: Injectable) =>
        (R3_COMPILE_INJECTABLE || preR3InjectableCompile)(type, meta));

/**
 * Type representing injectable service.
 *
 * 表示可注入服务的类型。
 *
 * @experimental
 */
export interface InjectableType<T> extends Type<T> { ngInjectableDef: InjectableDef<T>; }
