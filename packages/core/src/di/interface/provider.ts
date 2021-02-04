/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Type} from '../../interface/type';

/**
 * Configures the `Injector` to return a value for a token.
 * Base for `ValueProvider` decorator.
 *
 * 配置 `Injector` 以返回令牌的值。是 `ValueProvider` 装饰器的基接口。
 *
 * @publicApi
 */
export interface ValueSansProvider {
  /**
   * The value to inject.
   *
   * 要注入的值。
   *
   */
  useValue: any;
}

/**
 * Configures the `Injector` to return a value for a token.
 *
 * 配置此 `Injector` 以返回令牌的值。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * {@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export interface ValueProvider extends ValueSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   *
   * 注入令牌。通常是 `Type` 或 `InjectionToken` 的实例，但也可以是 `any` 实例。
   *
   */
  provide: any;

  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * 如果为 true，则注入器返回实例数组。这对于允许多个提供者散布在多个文件中以向公共令牌提供配置信息很有用。
   *
   */
  multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * Base for `StaticClassProvider` decorator.
 *
 * 配置 `Injector` 以返回 `useClass` 的令牌实例。这是 `StaticClassProvider` 装饰器的基接口。
 *
 * @publicApi
 */
export interface StaticClassSansProvider {
  /**
   * An optional class to instantiate for the `token`. By default, the `provide`
   * class is instantiated.
   *
   * 供 `token` 实例化的可选类。默认情况下，会把 `provide` 类实例化。
   *
   */
  useClass: Type<any>;

  /**
   * A list of `token`s to be resolved by the injector. The list of values is then
   * used as arguments to the `useClass` constructor.
   *
   * 由注入器解析的 `token` 列表。将这个值列表用作 `useClass` 构造函数的参数。
   *
   */
  deps: any[];
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * 配置 `Injector` 以返回 `useClass` 的令牌实例。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export interface StaticClassProvider extends StaticClassSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   *
   * 注入令牌。通常是 `Type` 或 `InjectionToken` 的实例，但也可以是 `any` 实例。
   *
   */
  provide: any;

  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * 如果为 true，则注入器返回实例数组。这在允许多个提供者散布在多个文件中，以向某个公共令牌提供配置信息时很有用。
   *
   */
  multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * 配置此 `Injector` 以返回令牌的实例。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 * @usageNotes
 *
 * ```ts
 * @Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * @publicApi
 */
export interface ConstructorSansProvider {
  /**
   * A list of `token`s to be resolved by the injector.
   *
   * 注入器要解析的 `token` 列表。
   *
   */
  deps?: any[];
}

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * 配置此 `Injector`，以返回令牌的实例。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export interface ConstructorProvider extends ConstructorSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   *
   * 注入令牌。通常是 `Type` 或 `InjectionToken` 的实例，但也可以是 `any` 实例。
   *
   */
  provide: Type<any>;

  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * 如果为 true，则注入器返回实例数组。这对于允许多个提供者散布在多个文件中，以向某个公共令牌提供配置信息很有用。
   *
   */
  multi?: boolean;
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * 配置此 `Injector` 以返回另一个 `useExisting` 令牌的值。
 *
 * @see `ExistingProvider`
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @publicApi
 */
export interface ExistingSansProvider {
  /**
   * Existing `token` to return. (Equivalent to `injector.get(useExisting)`)
   *
   * 返回现有的 `token`。 （等效于 `injector.get(useExisting)` ）
   *
   */
  useExisting: any;
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * 配置此 `Injector` 以返回另一个 `useExisting` 令牌的值。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export interface ExistingProvider extends ExistingSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   *
   * 注入令牌。通常是 `Type` 或 `InjectionToken` 的实例，但也可以是 `any` 实例。
   *
   */
  provide: any;

  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * 如果为 true，则注入器返回实例数组。这对于允许多个提供者散布在多个文件中，以向某个公共令牌提供配置信息很有用。
   *
   */
  multi?: boolean;
}

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * 把此 `Injector` 配置为调用 `useFactory` 函数返回一个值。
 *
 * @see `FactoryProvider`
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @publicApi
 */
export interface FactorySansProvider {
  /**
   * A function to invoke to create a value for this `token`. The function is invoked with
   * resolved values of `token`s in the `deps` field.
   *
   * 供调用，来为此 `token` 创建值的函数。调用该函数时，会在 `deps` 字段中的传入 `token` 的解析结果。。
   *
   */
  useFactory: Function;

  /**
   * A list of `token`s to be resolved by the injector. The list of values is then
   * used as arguments to the `useFactory` function.
   *
   * 供注入器解析的 `token` 列表。然后，将值列表将用作 `useFactory` 函数的参数。
   *
   */
  deps?: any[];
}

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * 配置此 `Injector` 以便调用 `useFactory` 函数返回一个值。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export interface FactoryProvider extends FactorySansProvider {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   *
   * 注入令牌。（通常是 `Type` 或 `InjectionToken` 的实例，但也可以是 `any` 实例）。
   *
   */
  provide: any;

  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * 如果为 true，则注入器返回实例数组。这对于允许多个提供者散布在多个文件中，以向某个公共令牌提供配置信息很有用。
   *
   */
  multi?: boolean;
}

/**
 * Describes how an `Injector` should be configured as static (that is, without reflection).
 * A static provider provides tokens to an injector for various types of dependencies.
 *
 * 描述如何将 `Injector` 配置为静态的（即不需要反射）。静态提供者为各种类型的依赖项提供令牌给注入器。
 *
 * @see [Injector.create()](/api/core/Injector#create).
 * @see ["Dependency Injection Guide"](guide/dependency-injection-providers).
 *
 * [“依赖注入指南”](guide/dependency-injection-providers) 。
 *
 * @publicApi
 */
export type StaticProvider =
    ValueProvider|ExistingProvider|StaticClassProvider|ConstructorProvider|FactoryProvider|any[];


/**
 * Configures the `Injector` to return an instance of `Type` when `Type' is used as the token.
 *
 * 配置此 `Injector`，以将“类型”用作令牌时返回 `Type` 的实例。
 *
 * Create an instance by invoking the `new` operator and supplying additional arguments.
 * This form is a short form of `TypeProvider`;
 *
 * 通过调用 `new` 运算符并提供其他参数来创建实例。这种形式是 `TypeProvider` 的缩写形式；
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * 欲知详情，请参见[“依赖项注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='TypeProvider'}
 *
 * @publicApi
 */
export interface TypeProvider extends Type<any> {}

/**
 * Configures the `Injector` to return a value by invoking a `useClass` function.
 * Base for `ClassProvider` decorator.
 *
 * 配置 `Injector` 以通过调用 `useClass` 函数返回某个值。是 `ClassProvider` 装饰器的基接口。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @publicApi
 */
export interface ClassSansProvider {
  /**
   * Class to instantiate for the `token`.
   *
   * 用于将此 `token` 实例化的类。
   *
   */
  useClass: Type<any>;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * 配置此 `Injector` 以便为令牌返回 `useClass` 的实例。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export interface ClassProvider extends ClassSansProvider {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   *
   * 注入令牌。（通常是 `Type` 或 `InjectionToken` 的实例，但也可以是 `any` 实例）。
   *
   */
  provide: any;

  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * 如果为 true，则注入器返回实例数组。这对于允许多个提供者散布在多个文件中，以向某个公共令牌提供配置信息时很有用。
   *
   */
  multi?: boolean;
}

/**
 * Describes how the `Injector` should be configured.
 *
 * 描述应该如何配置 `Injector`。
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * [“依赖注入指南”](guide/dependency-injection) 。
 *
 * @see `StaticProvider`
 *
 * @publicApi
 */
export type Provider = TypeProvider|ValueProvider|ClassProvider|ConstructorProvider|
    ExistingProvider|FactoryProvider|any[];

/**
 * Describes a function that is used to process provider lists (such as provider
 * overrides).
 */
export type ProcessProvidersFunction = (providers: Provider[]) => Provider[];
