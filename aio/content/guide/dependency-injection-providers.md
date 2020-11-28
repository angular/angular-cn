# Dependency providers

# 依赖提供者

By configuring providers, you can make services available to the parts of your application that need them.

通过配置提供者，你可以把服务提供给那些需要它们的应用部件。

A dependency [provider](guide/glossary#provider) configures an injector with a [DI token](guide/glossary#di-token), which that injector uses to provide the runtime version of a dependency value.

依赖[提供者](guide/glossary#provider)会使用 [DI 令牌](guide/glossary#di-token)来配置注入器，注入器会用它来提供这个依赖值的具体的、运行时版本。

## Specifying a provider token

## 指定提供者令牌

If you specify the service class as the provider token, the default behavior is for the injector to instantiate that class with `new`.

如果你把服务类指定为提供者令牌，那么注入器的默认行为是用 `new` 来实例化那个类。

In the following example, the `Logger` class provides a `Logger` instance.

在下面这个例子中，`Logger` 类提供了 `Logger` 的实例。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger">
</code-example>

You can, however, configure an injector with an alternative provider in order to deliver some other object that provides the needed logging functionality.

不过，你也可以用一个替代提供者来配置注入器，这样就可以指定另一些同样能提供日志功能的对象。

You can configure an injector with a service class, you can provide a substitute class, an object, or a factory function.

你可以使用服务类来配置注入器，也可以提供一个替代类、一个对象或一个工厂函数。

{@a provide}

## Defining providers

## 定义提供者

The class provider syntax is a shorthand expression that expands into a provider configuration, defined by the [`Provider` interface](api/core/Provider).
The following example is the class provider syntax for providing a `Logger` class in the `providers` array.

类提供者的语法实际上是一种简写形式，它会扩展成一个由 [`Provider` 接口](api/core/Provider)定义的提供者配置对象。
下面的代码片段展示了 `providers` 中给出的类会如何扩展成完整的提供者配置对象。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger">
</code-example>

Angular expands the `providers` value into a full provider object as follows.

Angular 把这个 `providers` 值扩展为一个完整的提供者对象，如下所示。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-3" >
</code-example>

The expanded provider configuration is an object literal with two properties.

扩展的提供者配置是一个具有两个属性的对象字面量。

1. The `provide` property holds the [token](guide/dependency-injection#token) that serves as the key for both locating a dependency value and configuring the injector.

  `provide` 属性存有[令牌](guide/dependency-injection#token)，它作为一个 key，在定位依赖值和配置注入器时使用。

2. The second property is a provider definition object, which tells the injector how to create the dependency value.
The provider-definition key can be `useClass`, as in the example.
It can also be `useExisting`, `useValue`, or `useFactory`.
Each of these keys provides a different type of dependency, as discussed below.

  第二个属性是一个提供者定义对象，它告诉注入器要如何创建依赖值。
  提供者定义对象中的 key 可以是 `useClass` —— 就像这个例子中一样。
  也可以是 `useExisting`、`useValue` 或 `useFactory`。
  每一个 key 都用于提供一种不同类型的依赖，我们稍后会讨论。

{@a class-provider}

## Configuring the injector to use alternative class providers

## 配置该注入器以使用替代类提供者

To configure the injector to return a different class that provides the same service, you can use the `useClass` property.
In this example, the injector returns a `BetterLogger` instance when using the `Logger` token.

为了让注入器能够返回提供同一服务的另一个类，你可以使用 `useClass` 属性。在这个例子中，当使用 `Logger` 令牌时，注入器会返回一个 `BetterLogger` 的实例。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-4" >
</code-example>

{@a class-provider-dependencies}

### Configuring class providers with dependencies

### 配置带依赖的类提供者

If the alternative class providers have their own dependencies, specify both providers in the `providers` metadata property of the parent module or component.

如果替代类提供者有自己的依赖，那就在父模块或组件的元数据属性 `providers` 中指定那些依赖。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-5"></code-example>

In this example, `EvenBetterLogger` displays the user name in the log message.
This logger gets the user from an injected `UserService` instance.

在这个例子中，`EvenBetterLogger` 会在日志信息里显示用户名。
这个 logger 要从注入的 `UserService` 实例中来获取该用户。

<code-example path="dependency-injection/src/app/providers.component.ts" region="EvenBetterLogger"></code-example>

The injector needs providers for both this new logging service and its dependent `UserService`.

注入器需要提供这个新的日志服务以及该服务所依赖的 `UserService` 对象。

{@a aliased-class-providers}

### Aliasing class providers

### 别名类提供者

To alias a class provider, specify the alias and the class provider in the `providers` array with the `useExisting` property.

要为类提供者设置别名，请在 `providers` 数组中使用 `useExisting` 属性指定别名和类提供程序。

In the following example, the injector injects the singleton instance of `NewLogger` when the component asks for either the new or the old logger.
In this way, `OldLogger` is an alias for `NewLogger`.

在下面的例子中，当组件请求新的或旧的记录器时，注入器都会注入一个 `NewLogger` 的实例。
通过这种方式， `OldLogger` 就成了 `NewLogger` 的别名。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6b"></code-example>

Be sure you don't alias `OldLogger` to `NewLogger` with `useClass`, as this creates two different `NewLogger` instances.

请确保你没有使用 `useClass` 来把 `OldLogger` 设为 `NewLogger` 的别名，因为如果这样做它就会创建两个不同的 `NewLogger` 实例。

{@a provideparent}

## Aliasing a class interface

## 为类接口指定别名

Generally, writing variations of the same parent alias provider uses [forwardRef](guide/dependency-injection-in-action#forwardref) as follows.

通常，编写同一个父组件别名提供者的变体时会使用[forwardRef](guide/dependency-injection-in-action#forwardref)，如下所示。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>

To streamline your code, you can extract that logic into a helper function using the `provideParent()` helper function.

为简化你的代码，可以使用辅助函数 `provideParent()` 来把这个逻辑提取到一个辅助函数中。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="provide-the-parent" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>

Now you can add a parent provider to your components that's easier to read and understand.

现在，你可以为组件添加一个更容易阅读和理解的父提供者。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alice-providers" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>

### Aliasing multiple class interfaces

### 为多个类接口指定别名

To alias multiple parent types, each with its own class interface token, configure `provideParent()` to accept more arguments.

要为多个父类型指定别名（每个类型都有自己的类接口令牌），请配置 `provideParent()` 以接受更多的参数。

Here's a revised version that defaults to `parent` but also accepts an optional second parameter for a different parent class interface.

这是一个修订版本，默认值为 `parent` 但同时也接受另一个父类接口作为可选的第二参数。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="provide-parent" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>

Next, to use `provideParent()` with a different parent type, provide a second argument, here `DifferentParent`.

接下来，要使用 `provideParent()` ，请传入第二参数，这里是 `DifferentParent` 。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="beth-providers" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>


{@a value-provider}

## Injecting an object

## 注入一个对象

To inject an object, configure the injector with the `useValue` option.
The following provider object uses the `useValue` key to associate the variable with the `Logger` token.

要注入一个对象，可以用 `useValue` 选项来配置注入器。
下面的提供者定义对象使用 `useValue` 作为 key 来把该变量与 `Logger` 令牌关联起来。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-7"></code-example>

In this example, `SilentLogger` is an object that fulfills the logger role.

在这个例子中，`SilentLogger` 是一个充当记录器角色的对象。

<code-example path="dependency-injection/src/app/providers.component.ts" region="silent-logger"></code-example>

{@a non-class-dependencies}

### Injecting a configuration object

### 注入一个配置对象

A common use case for object literals is a configuration object.
The following configuration object includes the title of the application and the address of a web API endpoint.

常用的对象字面量是配置对象。下列配置对象包括应用的标题和 Web API 的端点地址。

<code-example path="dependency-injection/src/app/app.config.ts" region="config" header="src/app/app.config.ts (excerpt)"></code-example>

To provide and inject the configuration object, specify the object in the `@NgModule()` `providers` array.

要提供并注入配置对象，请在 `@NgModule()` 的 `providers` 数组中指定该对象。

<code-example path="dependency-injection/src/app/app.module.ts" region="providers" header="src/app/app.module.ts (providers)"></code-example>

{@a injectiontoken}

### Using an `InjectionToken` object

### 使用 `InjectionToken` 对象

You can define and use an `InjectionToken` object for choosing a provider token for non-class dependencies.
The following example defines a token, `APP_CONFIG` of the type `InjectionToken`.

你可以定义和使用一个 `InjectionToken` 对象来为非类的依赖选择一个提供者令牌。下列例子定义了一个类型为 `InjectionToken` 的 `APP_CONFIG` 。

<code-example path="dependency-injection/src/app/app.config.ts" region="token" header="src/app/app.config.ts"></code-example>

The optional type parameter, `app.config`, and the token description, `<AppConfig>` specify the token's purpose.

可选的参数 `app.config` 和令牌类型 `<AppConfig>` 指出了令牌的用途。

Next, register the dependency provider in the component using the `InjectionToken` object of `APP_CONFIG`.

接着，用 `APP_CONFIG` 这个 `InjectionToken` 对象在组件中注册依赖提供者。

<code-example path="dependency-injection/src/app/providers.component.ts" header="src/app/providers.component.ts" region="providers-9"></code-example>

Now you can inject the configuration object into the constructor with `@Inject()` parameter decorator.

现在，借助参数装饰器 `@Inject()`，你可以把这个配置对象注入到构造函数中。

<code-example path="dependency-injection/src/app/app.component.2.ts" region="ctor" header="src/app/app.component.ts"></code-example>

{@a di-and-interfaces}

#### Interfaces and dependency injection

#### 接口和依赖注入

Though the TypeScript `AppConfig` interface supports typing within the class, the `AppConfig` interface plays no role in dependency injection.
In TypeScript, an interface is a design-time artifact, and doesn't have a runtime representation, or token, that the DI framework can use.

虽然 TypeScript 的 `AppConfig` 接口可以在类中提供类型支持，但它在依赖注入时却没有任何作用。在 TypeScript 中，接口是一项设计期工件，它没有可供 DI 框架使用的运行时表示形式或令牌。

When the transpiler changes TypeScript to JavaScript, the interface disappears because JavaScript doesn't have interfaces.

当转译器把 TypeScript 转换成 JavaScript 时，接口就会消失，因为 JavaScript 没有接口。

Since there is no interface for Angular to find at runtime, the interface cannot be a token, nor can you inject it.

由于 Angular 在运行期没有接口，所以该接口不能作为令牌，也不能注入它。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9-interface"></code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-9-ctor-interface"></code-example>

{@a factory-provider}
{@a factory-providers}

## Using factory providers

## 使用工厂提供者

To create a changeable, dependent value based on information unavailable before run time, you can use a factory provider.

要想根据运行前尚不可用的信息创建可变的依赖值，可以使用工厂提供者。

In the following example, only authorized users should see secret heroes in the `HeroService`.
Authorization can change during the course of a single application session, as when a different user logs in .

在下面的例子中，只有授权用户才能看到 `HeroService` 中的秘密英雄。授权可能在单个应用会话期间发生变化，比如改用其他用户登录。

To keep security-sensitive information in `UserService` and out of `HeroService`, give the `HeroService` constructor a boolean flag to control display of secret heroes.

要想在 `UserService` 和 `HeroService` 中保存敏感信息，就要给 `HeroService` 的构造函数传一个逻辑标志来控制秘密英雄的显示。

<code-example path="dependency-injection/src/app/heroes/hero.service.ts" region="internals" header="src/app/heroes/hero.service.ts (excerpt)"></code-example>

To implement the `isAuthorized` flag, use a factory provider to create a new logger instance for `HeroService`.

要实现 `isAuthorized` 标志，可以用工厂提供者来为 `HeroService` 创建一个新的 logger 实例。

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="factory" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

The factory function has access to `UserService`.
You inject both `Logger` and `UserService` into the factory provider so the injector can pass them along to the factory function.

这个工厂函数可以访问 `UserService`。你可以同时把 `Logger` 和 `UserService` 注入到工厂提供者中，这样注入器就可以把它们传给工厂函数了。

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="provider" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

* The `useFactory` field specifies that the provider is a factory function whose implementation is `heroServiceFactory`.

  `useFactory` 字段指定该提供程序是一个工厂函数，其实现代码是 `heroServiceFactory` 。

* The `deps` property is an array of [provider tokens](guide/dependency-injection#token).
The `Logger` and `UserService` classes serve as tokens for their own class providers.
The injector resolves these tokens and injects the corresponding services into the matching `heroServiceFactory` factory function parameters.

  `deps` 属性是一个[提供者令牌](guide/dependency-injection#token)数组。 `Logger` 和 `UserService` 类都是自己类提供者的令牌。该注入器解析了这些令牌，并把相应的服务注入到 `heroServiceFactory` 工厂函数的参数中。

Capturing the factory provider in the exported variable, `heroServiceProvider`, makes the factory provider reusable.

通过把工厂提供者导出为变量 `heroServiceProvider`，就能让工厂提供者变得可复用。

The following side-by-side example shows how `heroServiceProvider` replaces `HeroService` in the `providers` array.

下面这两个并排的例子展示了在 `providers` 数组中，如何用 `heroServiceProvider` 替换 `HeroService`

<code-tabs>

  <code-pane header="src/app/heroes/heroes.component (v3)" path="dependency-injection/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component (v2)" path="dependency-injection/src/app/heroes/heroes.component.1.ts">
  </code-pane>

</code-tabs>
