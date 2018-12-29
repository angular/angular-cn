/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {compileInjectable as render3CompileInjectable} from '../render3/jit/injectable';
import {Type} from '../type';
import {TypeDecorator, makeDecorator} from '../util/decorators';

import {InjectableDef, InjectableType, defineInjectable, getInjectableDef} from './defs';
import {ClassSansProvider, ConstructorSansProvider, ExistingSansProvider, FactorySansProvider, StaticClassSansProvider, ValueSansProvider} from './provider';
import {convertInjectableProviderToFactory} from './util';


/**
 * Injectable providers used in `@Injectable` decorator.
 *
 * `@Injectable` 装饰器中使用的可注入对象提供商。
 *
 * @publicApi
 */
export type InjectableProvider = ValueSansProvider | ExistingSansProvider |
    StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;

/**
 * Type of the Injectable decorator / constructor function.
 *
 * Injectable 装饰器的类型和构造函数
 *
 * @publicApi
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
  (): TypeDecorator;
  (options?: {providedIn: Type<any>| 'root' | null}&InjectableProvider): TypeDecorator;
  new (): Injectable;
  new (options?: {providedIn: Type<any>| 'root' | null}&InjectableProvider): Injectable;
}

/**
 * Type of the Injectable metadata.
 *
 * Injectable 元数据的类型。
 *
 * @publicApi
 */
export interface Injectable { providedIn?: Type<any>|'root'|null; }

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
 * Type representing injectable service.
 *
 * 表示可注入服务的类型。
 *
 * @publicApi
 */
export interface InjectableType<T> extends Type<T> { ngInjectableDef: InjectableDef<T>; }

/**
 * Supports @Injectable() in JIT mode for Render2.
 */
function render2CompileInjectable(
    injectableType: InjectableType<any>,
    options: {providedIn?: Type<any>| 'root' | null} & InjectableProvider): void {
  if (options && options.providedIn !== undefined && !getInjectableDef(injectableType)) {
    injectableType.ngInjectableDef = defineInjectable({
      providedIn: options.providedIn,
      factory: convertInjectableProviderToFactory(injectableType, options),
    });
  }
}

export const SWITCH_COMPILE_INJECTABLE__POST_R3__ = render3CompileInjectable;
const SWITCH_COMPILE_INJECTABLE__PRE_R3__ = render2CompileInjectable;
const SWITCH_COMPILE_INJECTABLE: typeof render3CompileInjectable =
    SWITCH_COMPILE_INJECTABLE__PRE_R3__;
