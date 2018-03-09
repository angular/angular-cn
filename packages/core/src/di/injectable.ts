/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ReflectionCapabilities} from '../reflection/reflection_capabilities';
import {Type} from '../type';
import {makeDecorator, makeParamDecorator} from '../util/decorators';
import {getClosureSafeProperty} from '../util/property';

import {inject, injectArgs} from './injector';
import {ClassSansProvider, ConstructorProvider, ConstructorSansProvider, ExistingProvider, ExistingSansProvider, FactoryProvider, FactorySansProvider, StaticClassProvider, StaticClassSansProvider, ValueProvider, ValueSansProvider} from './provider';

const GET_PROPERTY_NAME = {} as any;
const USE_VALUE = getClosureSafeProperty<ValueProvider>(
    {provide: String, useValue: GET_PROPERTY_NAME}, GET_PROPERTY_NAME);

/**
 * Injectable providers used in `@Injectable` decorator.
 *
 * @experimental
 */
export type InjectableProvider = ValueSansProvider | ExistingSansProvider |
    StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;

/**
 * Type of the Injectable decorator / constructor function.
 *
 * @stable
 */
export interface InjectableDecorator {
  /**
   * @whatItDoes A marker metadata that marks a class as available to {@link Injector} for creation.
   * @howToUse
   * ```
   * @Injectable()
   * class Car {}
   * ```
   *
   * @description
   * For more details, see the {@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
   *
   * ### Example
   *
   * {@example core/di/ts/metadata_spec.ts region='Injectable'}
   *
   * {@link Injector} will throw an error when trying to instantiate a class that
   * does not have `@Injectable` marker, as shown in the example below.
   *
   * {@example core/di/ts/metadata_spec.ts region='InjectableThrows'}
   *
   * @stable
   */
  (): any;
  (options?: {scope: Type<any>}&InjectableProvider): any;
  new (): Injectable;
  new (options?: {scope: Type<any>}&InjectableProvider): Injectable;
}

/**
 * Type of the Injectable metadata.
 *
 * @experimental
 */
export interface Injectable {
  scope?: Type<any>;
  factory: () => any;
}

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
* Define injectable
*
* @experimental
*/
export function defineInjectable(opts: Injectable): Injectable {
  return opts;
}

/**
* Injectable decorator and metadata.
*
* @stable
* @Annotation
*/
export const Injectable: InjectableDecorator = makeDecorator(
    'Injectable', undefined, undefined, undefined,
    (injectableType: Type<any>, options: {scope: Type<any>} & InjectableProvider) => {
      if (options && options.scope) {
        (injectableType as InjectableType<any>).ngInjectableDef = defineInjectable({
          scope: options.scope,
          factory: convertInjectableProviderToFactory(injectableType, options)
        });
      }
    });


/**
 * Type representing injectable service.
 *
 * @experimental
 */
export interface InjectableType<T> extends Type<T> { ngInjectableDef?: Injectable; }
