/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {R3_COMPILE_INJECTABLE} from '../ivy_switch/compiler/index';
import {Type} from '../type';
import {makeDecorator} from '../util/decorators';

import {InjectableDef, InjectableType} from './defs';
import {ClassSansProvider, ConstructorSansProvider, ExistingSansProvider, FactorySansProvider, StaticClassSansProvider, ValueProvider, ValueSansProvider} from './provider';

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

/**
* Injectable decorator and metadata.
*
* Injectable 的装饰器和元数据。
*
* @Annotation
*/
export const Injectable: InjectableDecorator = makeDecorator(
    'Injectable', undefined, undefined, undefined,
    (type: Type<any>, meta: Injectable) => R3_COMPILE_INJECTABLE(type, meta));

/**
 * Type representing injectable service.
 *
 * 表示可注入服务的类型。
 *
 * @experimental
 */
export interface InjectableType<T> extends Type<T> { ngInjectableDef: InjectableDef<T>; }
