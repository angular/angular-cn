# Dependency providers

# 依赖提供者

A dependency [provider](guide/glossary#provider) configures an injector
with a [DI token](guide/glossary#di-token),
which that injector uses to provide the concrete, runtime version of a dependency value.
The injector relies on the provider configuration to create instances of the dependencies
that it injects into components, directives, pipes, and other services.

依赖[提供者](guide/glossary#provider)会使用 [DI 令牌](guide/glossary#di-token)来配置注入器，注入器会用它来提供这个依赖值的具体的、运行时版本。
注入器依靠 "提供者配置" 来创建依赖的实例，并把该实例注入到组件、指令、管道和其它服务中。

You must configure an injector with a provider, or it won't know how to create the dependency.
The most obvious way for an injector to create an instance of a service class is with the class itself.
If you specify the service class itself as the provider token, the default behavior is for the injector to instantiate that class with `new`.

你必须使用提供者来配置注入器，否则注入器就无法知道如何创建此依赖。
注入器创建服务实例的最简单方法，就是用这个服务类本身来创建它。
如果你把服务类作为此服务的 DI 令牌，注入器的默认行为就是 `new` 出这个类实例。

In the following typical example, the `Logger` class itself provides a `Logger` instance.

在下面这个典型的例子中，`Logger` 类自身提供了 `Logger` 的实例。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger">
</code-example>

You can, however, configure an injector with an alternative provider,
in order to deliver some other object that provides the needed logging functionality.
For instance:

不过，你也可以用一个替代提供者来配置注入器，这样就可以指定另一些同样能提供日志功能的对象。
比如：

* You can provide a substitute class.

  你可以提供一个替代类。

* You can provide a logger-like object.

  你可以提供一个类似于 Logger 的对象。

* Your provider can call a logger factory function.

  你的提供者可以调用一个工厂函数来创建 logger。

{@a provide}

## The `Provider` object literal

## `Provider` 对象字面量

The class-provider syntax is a shorthand expression that expands
into a provider configuration, defined by the [`Provider` interface](api/core/Provider).
The following code snippets shows how a class that is given as the `providers` value is expanded into a full provider object.

类提供者的语法实际上是一种简写形式，它会扩展成一个由 [`Provider` 接口](api/core/Provider)定义的提供者配置对象。
下面的代码片段展示了 `providers` 中给出的类会如何扩展成完整的提供者配置对象。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger">
</code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-3" >
</code-example>

The expanded provider configuration is an object literal with two properties.

扩展的提供者配置是一个具有两个属性的对象字面量。

* The `provide` property holds the [token](guide/dependency-injection#token)
that serves as the key for both locating a dependency value and configuring the injector.

  `provide` 属性存有[令牌](guide/dependency-injection#token)，它作为一个 key ，在定位依赖值和配置注入器时使用。

* The second property is a provider definition object, which tells the injector how to create the dependency value.
The provider-definition key can be `useClass`, as in the example.
It can also be `useExisting`, `useValue`, or `useFactory`.
Each of these keys provides a different type of dependency, as discussed below.

  第二个属性是一个提供者定义对象，它告诉注入器要如何创建依赖值。
  提供者定义对象中的 key 可以是 `useClass` —— 就像这个例子中一样。
  也可以是 `useExisting`、`useValue` 或 `useFactory`。
  每一个 key 都用于提供一种不同类型的依赖，我们稍后会讨论。

{@a class-provider}

## Alternative class providers

## 替代类提供者

Different classes can provide the same service.
For example, the following code tells the injector
to return a `BetterLogger` instance when the component asks for a logger
using the `Logger` token.

不同的类都可用于提供相同的服务。
比如，下面的代码告诉注入器，当组件使用 `Logger` 令牌请求日志对象时，给它返回一个 `BetterLogger` 实例。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-4" >
</code-example>

{@a class-provider-dependencies}

### Class providers with dependencies

### 带依赖的类提供者

Another class, `EvenBetterLogger`, might display the user name in the log message.
This logger gets the user from an injected `UserService` instance.

另一个类 `EvenBetterLogger` 可能要在日志信息里显示用户名。
这个 logger 要从注入的 `UserService` 实例中来获取该用户。

<code-example path="dependency-injection/src/app/providers.component.ts" region="EvenBetterLogger"></code-example>

The injector needs providers for both this new logging service and its dependent `UserService`. Configure this alternative logger with the `useClass` provider-definition key, like `BetterLogger`. The following array specifies both providers in the `providers` metadata option of the parent module or component.

注入器需要提供这个新的日志服务以及该服务所依赖的 `UserService` 对象。
使用 `useClass` 作为提供者定义对象的 key ，来配置一个 logger 的替代品，比如 `BetterLogger`。
下面的数组同时在父模块和组件的 `providers` 元数据选项中指定了这些提供者。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-5"></code-example>

{@a aliased-class-providers}

### Aliased class providers

### 别名类提供者

Suppose an old component depends upon the `OldLogger` class.
`OldLogger` has the same interface as `NewLogger`, but for some reason
you can't update the old component to use it.

假设老的组件依赖于 `OldLogger` 类。`OldLogger` 和 `NewLogger` 的接口相同，但是由于某种原因，我们没法修改老的组件来使用 `NewLogger`。

When the old component logs a message with `OldLogger`,
you want the singleton instance of `NewLogger` to handle it instead.
In this case, the dependency injector should inject that singleton instance
when a component asks for either the new or the old logger.
`OldLogger` should be an *alias* for `NewLogger`.

当老的组件要使用 `OldLogger` 记录信息时，你可能希望改用 `NewLogger` 的单例来处理它。
在这种情况下，无论某个组件请求老的 logger 还是新的 logger，依赖注入器都应该注入这个 `NewLogger` 的单例。
也就是说 `OldLogger` 应该是 `NewLogger` 的*别名*。

If you try to alias `OldLogger` to `NewLogger` with `useClass`, you end up with two different `NewLogger` instances in your app.

如果你试图用 `useClass` 为 `OldLogger` 指定一个别名 `NewLogger`，就会在应用中得到 `NewLogger` 的两个不同的实例。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6a"></code-example>

To make sure there is only one instance of `NewLogger`, alias `OldLogger` with the `useExisting` option.

要确保只有一个 `NewLogger` 实例，就要用 `useExisting` 来为 `OldLogger` 指定别名。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6b"></code-example>

{@a value-provider}

## Value providers

## 值提供者

Sometimes it's easier to provide a ready-made object rather than ask the injector to create it from a class.
To inject an object you have already created,
configure the injector with the `useValue` option

有时候，提供一个现成的对象会比要求注入器从类去创建更简单一些。
如果要注入一个你已经创建过的对象，请使用 `useValue` 选项来配置该注入器。

The following code defines a variable that creates such an object to play the logger role.

下面的代码定义了一个变量，用来创建这样一个能扮演 logger 角色的对象。

<code-example path="dependency-injection/src/app/providers.component.ts" region="silent-logger"></code-example>

The following provider object uses the `useValue` key to associate the variable with the `Logger` token.

下面的提供者定义对象使用 `useValue` 作为 key 来把该变量与 `Logger` 令牌关联起来。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-7"></code-example>

{@a non-class-dependencies}

### Non-class dependencies

### 非类依赖

Not all dependencies are classes.
Sometimes you want to inject a string, function, or object.

并非所有的依赖都是类。
有时候你会希望注入字符串、函数或对象。

Apps often define configuration objects with lots of small facts,
like the title of the application or the address of a web API endpoint.
These configuration objects aren't always instances of a class.
They can be object literals, as shown in the following example.

应用通常会用大量的小型参数来定义配置对象，比如应用的标题或 Web API 端点的地址。
这些配置对象不一定总是类的实例。
它们还可能是对象字面量，如下例所示。

<code-example path="dependency-injection/src/app/app.config.ts" region="config" header="src/app/app.config.ts (excerpt)"></code-example>

{@a interface-not-valid-token}

**TypeScript interfaces are not valid tokens**

**TypeScript 接口不是有效的令牌**

The `HERO_DI_CONFIG` constant conforms to the `AppConfig` interface.
Unfortunately, you cannot use a TypeScript interface as a token.
In TypeScript, an interface is a design-time artifact, and doesn't have a runtime representation (token) that the DI framework can use.

`HERO_DI_CONFIG` 常量满足 `AppConfig` 接口的要求。
不幸的是，你不能用 TypeScript 的接口作为令牌。
在 TypeScript 中，接口是一个设计期的概念，无法用作 DI 框架在运行期所需的令牌。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9-interface"></code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-9-ctor-interface"></code-example>

<div class="alert is-helpful">

This might seem strange if you're used to dependency injection in strongly typed languages where an interface is the preferred dependency lookup key.
However, JavaScript, doesn't have interfaces, so when TypeScript is transpiled to JavaScript, the interface disappears.
There is no interface type information left for Angular to find at runtime.

如果你曾经在强类型语言中使用过依赖注入功能，这一点可能看起来有点奇怪，那些语言都优先使用接口作为查找依赖的 key。
不过，JavaScript 没有接口，所以，当 TypeScript 转译成 JavaScript 时，接口也就消失了。
在运行期间，没有留下任何可供 Angular 进行查找的接口类型信息。

</div>

One alternative is to provide and inject the configuration object in an NgModule like `AppModule`.

替代方案之一是以类似于 `AppModule` 的方式，在 NgModule 中提供并注入这个配置对象。

<code-example path="dependency-injection/src/app/app.module.ts" region="providers" header="src/app/app.module.ts (providers)"></code-example>

Another solution to choosing a provider token for non-class dependencies is
to define and use an `InjectionToken` object.
The following example shows how to define such a token.

另一个为非类依赖选择提供者令牌的解决方案是定义并使用 `InjectionToken` 对象。
下面的例子展示了如何定义那样一个令牌。

<code-example path="dependency-injection/src/app/app.config.ts" region="token" header="src/app/app.config.ts"></code-example>

The type parameter, while optional, conveys the dependency's type to developers and tooling.
The token description is another developer aid.

虽然类型参数在这里是可选的，不过还是能把此依赖的类型信息传达给开发人员和开发工具。
这个令牌的描述则是开发人员的另一个助力。

Register the dependency provider using the `InjectionToken` object:

使用 `InjectionToken` 对象注册依赖提供者：

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9"></code-example>

Now you can inject the configuration object into any constructor that needs it, with
the help of an `@Inject()` parameter decorator.

现在，借助参数装饰器 `@Inject()`，你可以把这个配置对象注入到任何需要它的构造函数中。

<code-example path="dependency-injection/src/app/app.component.2.ts" region="ctor" header="src/app/app.component.ts"></code-example>

<div class="alert is-helpful">

Although the `AppConfig` interface plays no role in dependency injection,
it supports typing of the configuration object within the class.

虽然 `AppConfig` 接口在依赖注入时没有任何作用，但它可以为该组件类中的这个配置对象指定类型信息。

</div>


{@a factory-provider}
{@a factory-providers}

## Factory providers

## 工厂提供者

Sometimes you need to create a dependent value dynamically,
based on information you won't have until run time.
For example, you might need information that changes repeatedly in the course of the browser session.
Also, your injectable service might not have independent access to the source of the information.

有时候你需要动态创建依赖值，创建时需要的信息你要等运行期间才能拿到。
比如，你可能需要某个在浏览器会话过程中会被反复修改的信息，而且这个可注入服务还不能独立访问这个信息的源头。

In cases like this you can use a *factory provider*.
Factory providers can also be useful when creating an instance of a dependency from a third-party library that wasn't designed to work with DI.

这种情况下，你可以使用*工厂提供者*。
当需要从第三方库创建依赖项实例时，工厂提供者也很有用，因为第三方库不是为 DI 而设计的。

For example, suppose `HeroService` must hide *secret* heroes from normal users.
Only authorized users should see secret heroes.

比如，假设 `HeroService` 必须对普通用户隐藏*秘密*英雄，只有得到授权的用户才能看到他们。

Like  `EvenBetterLogger`, `HeroService` needs to know if the user is authorized to see secret heroes.
That authorization can change during the course of a single application session,
as when you log in a different user.

像 `EvenBetterLogger` 一样，`HeroService` 需要知道该用户是否有权查看秘密英雄。
而认证信息可能会在应用的单个会话中发生变化，比如你改用另一个用户登录。

Let's say you don't want to inject `UserService` directly into `HeroService`, because you don't want to complicate that service with security-sensitive information.
`HeroService` won't have direct access to the user information to decide
who is authorized and who isn't.

假设你不希望直接把 `UserService` 注入到 `HeroService` 中，因为你不希望把这个服务与那些高度敏感的信息牵扯到一起。
这样 `HeroService` 就无法直接访问到用户信息，来决定谁有权访问，谁没有。

To resolve this, we give the `HeroService` constructor a boolean flag to control display of secret heroes.

要解决这个问题，我们给 `HeroService` 的构造函数一个逻辑型标志，以控制是否显示秘密英雄。

<code-example path="dependency-injection/src/app/heroes/hero.service.ts" region="internals" header="src/app/heroes/hero.service.ts (excerpt)"></code-example>

You can inject `Logger`, but you can't inject the  `isAuthorized` flag. Instead, you can use a factory provider to create a new logger instance for `HeroService`.

你可以注入 `Logger` 但是不能注入 `isAuthorized` 标志。不过你可以改用工厂提供者来为 `HeroService` 创建一个新的 logger 实例。

A factory provider needs a factory function.

工厂提供者需要一个工厂函数。

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="factory" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

Although `HeroService` has no access to `UserService`, the factory function does.
You inject both `Logger` and `UserService` into the factory provider
and let the injector pass them along to the factory function.

虽然 `HeroService` 不能访问 `UserService`，但是工厂函数可以。
你把 `Logger` 和 `UserService` 注入到了工厂提供者中，并让注入器把它们传给这个工厂函数。

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="provider" header="src/app/heroes/hero.service.provider.ts (excerpt)"></code-example>

* The `useFactory` field tells Angular that the provider is a factory function whose implementation is `heroServiceFactory`.

  `useFactory` 字段告诉 Angular 该提供者是一个工厂函数，该函数的实现代码是 `heroServiceFactory`。 

* The `deps` property is an array of [provider tokens](guide/dependency-injection#token).
The `Logger` and `UserService` classes serve as tokens for their own class providers.
The injector resolves these tokens and injects the corresponding services into the matching factory function parameters.

  `deps` 属性是一个[提供者令牌](guide/dependency-injection#token)数组。
  `Logger` 和 `UserService` 类作为它们自己的类提供者令牌使用。
  注入器解析这些令牌，并把与之对应的服务注入到相应的工厂函数参数表中。

Notice that you captured the factory provider in an exported variable, `heroServiceProvider`.
This extra step makes the factory provider reusable.
You can configure a provider of `HeroService` with this variable wherever you need it.
In this sample, you need it only in `HeroesComponent`,
where `heroServiceProvider` replaces `HeroService` in the metadata `providers` array.

注意，你把这个工厂提供者保存到了一个导出的变量 `heroServiceProvider` 中。
这个额外的步骤让工厂提供者可被复用。
你可以在任何需要它的地方用这个变量来配置 `HeroService` 的提供者。
在这个例子中，你只在 `HeroesComponent` 中用到了它。你在该组件元数据的 `providers` 数组中用 `heroServiceProvider` 替换了 `HeroService`。

The following shows the new and the old implementations side-by-side.

下面并列显示了新旧实现。

<code-tabs>

  <code-pane header="src/app/heroes/heroes.component (v3)" path="dependency-injection/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component (v2)" path="dependency-injection/src/app/heroes/heroes.component.1.ts">
  </code-pane>

</code-tabs>

## Predefined tokens and multiple providers

## 预定义令牌与多提供者

Angular provides a number of built-in injection-token constants that you can use to customize the behavior of
various systems.

Angular 提供了一些内置的注入令牌常量，你可以用它们来自定义系统的多种行为。

For example, you can use the following built-in tokens as hooks into the framework’s bootstrapping and initialization process.
A provider object can associate any of these injection tokens with one or more callback functions that take app-specific initialization actions.

比如，你可以使用下列内置令牌来切入 Angular 框架的启动和初始化过程。
提供者对象可以把任何一个注入令牌与一个或多个用来执行应用初始化操作的回调函数关联起来。

* [PLATFORM_INITIALIZER](api/core/PLATFORM_INITIALIZER): Callback is invoked when a platform is initialized.

  [PLATFORM_INITIALIZER](api/core/PLATFORM_INITIALIZER)：平台初始化之后调用的回调函数。

* [APP_BOOTSTRAP_LISTENER](api/core/APP_BOOTSTRAP_LISTENER): Callback is invoked for each component that is bootstrapped. The handler function receives the ComponentRef instance of the bootstrapped component.

  [APP_BOOTSTRAP_LISTENER](api/core/APP_BOOTSTRAP_LISTENER)：每个启动组件启动完成之后调用的回调函数。这个处理器函数会收到这个启动组件的 ComponentRef 实例。

* [APP_INITIALIZER](api/core/APP_INITIALIZER): Callback is invoked before an app is initialized. All registered initializers can optionally return a Promise. All initializer functions that return Promises must be resolved before the application is bootstrapped. If one of the initializers fails to resolves, the application is not bootstrapped.

  [APP_INITIALIZER](api/core/APP_INITIALIZER)：应用初始化之前调用的回调函数。注册的所有初始化器都可以（可选地）返回一个 Promise。所有返回 Promise 的初始化函数都必须在应用启动之前解析完。如果任何一个初始化器失败了，该应用就不会继续启动。

The provider object can have a third option, `multi: true`, which you can use with `APP_INITIALIZER`
to register multiple handlers for the provide event.

该提供者对象还有第三个选项 `multi: true`，把它和 `APP_INITIALIZER` 一起使用可以为特定的事件注册多个处理器。

For example, when bootstrapping an application, you can register many initializers using the same token.

比如，当启动应用时，你可以使用同一个令牌注册多个初始化器。

```
export const APP_TOKENS = [
 { provide: PLATFORM_INITIALIZER, useFactory: platformInitialized, multi: true    },
 { provide: APP_INITIALIZER, useFactory: delayBootstrapping, multi: true },
 { provide: APP_BOOTSTRAP_LISTENER, useFactory: appBootstrapped, multi: true },
];
```

Multiple providers can be associated with a single token in other areas as well.
For example, you can register a custom form validator using the built-in [NG_VALIDATORS](api/forms/NG_VALIDATORS) token,
and provide multiple instances of a given validator provider by using the `multi: true` property in the provider object.
Angular adds your custom validators to the existing collection.

在其它地方，多个提供者也同样可以和单个令牌关联起来。
比如，你可以使用内置的 [NG_VALIDATORS](api/forms/NG_VALIDATORS) 令牌注册自定义表单验证器，还可以在提供者定义对象中使用 `multi: true` 属性来为指定的验证器令牌提供多个验证器实例。
Angular 会把你的自定义验证器添加到现有验证器的集合中。

The Router also makes use of multiple providers associated with a single token.
When you provide multiple sets of routes using [RouterModule.forRoot](api/router/RouterModule#forroot)
and [RouterModule.forChild](api/router/RouterModule#forchild) in a single module,
the [ROUTES](api/router/ROUTES) token combines all the different provided sets of routes into a single value.

路由器也同样用多个提供者关联到了一个令牌。
当你在单个模块中用 [RouterModule.forRoot](api/router/RouterModule#forroot) 和 [RouterModule.forChild](api/router/RouterModule#forchild) 提供了多组路由时，[ROUTES](api/router/ROUTES) 令牌会把这些不同的路由组都合并成一个单一值。

<div class="alert is-helpful">

Search for [Constants in API documentation](api?type=const) to find more built-in tokens.

搜索 [API 文档中的常量](api?type=const)以了解更多内置令牌。

</div>

{@a tree-shakable-provider}
{@a tree-shakable-providers}

## Tree-shakable providers

## 可摇树优化的提供者

Tree shaking refers to a compiler option that removes code from the final bundle if the app doesn't reference that code.
When providers are tree-shakable, the Angular compiler removes the associated
services from the final output when it determines that your application doesn't use those services.
This significantly reduces the size of your bundles.

摇树优化是指一个编译器选项，意思是把应用中未引用过的代码从最终生成的包中移除。
如果提供者是可摇树优化的，Angular 编译器就会从最终的输出内容中移除应用代码中从未用过的服务。
这会显著减小你的打包体积。

<div class="alert is-helpful">

Ideally, if an application isn't injecting a service, Angular shouldn't include it in the final output.
However, Angular has to be able to identify at build time whether the app will require the service or not.
Because it's always possible to inject a service directly using `injector.get(Service)`,
Angular can't identify all of the places in your code where this injection could happen,
so it has no choice but to include the service in the injector.
Thus, services in the NgModule `providers` array or at component level are not tree-shakable.

理想情况下，如果应用没有注入服务，它就不应该包含在最终输出中。
不过，Angular 要能在构建期间识别出该服务是否需要。
由于还可能用 `injector.get(Service)` 的形式直接注入服务，所以 Angular 无法准确识别出代码中可能发生此注入的全部位置，因此为保险起见，只能把服务包含在注入器中。 
因此，在 NgModule 或 组件级别提供的服务是无法被摇树优化掉的。

</div>

The following example of non-tree-shakable providers in Angular configures a service provider for the injector of an NgModule.

下面这个不可摇树优化的 Angular 提供者的例子为 NgModule 注入器配置了一个服务提供者。

<code-example path="dependency-injection/src/app/tree-shaking/service-and-module.ts"  header="src/app/tree-shaking/service-and-modules.ts"></code-example>

You can then import this module into your application module
to make the service available for injection in your app,
as in the following example.

你可以把该模块导入到你的应用模块中，以便该服务可注入到你的应用中，例子如下。

<code-example path="dependency-injection/src/app/tree-shaking/app.module.ts"  header="src/app/tree-shaking/app.modules.ts"></code-example>

When `ngc` runs, it compiles `AppModule` into a module factory, which contains definitions for all the providers declared in all the modules it includes. At runtime, this factory becomes an injector that instantiates these services.

当运行 `ngc` 时，它会把 `AppModule` 编译到模块工厂中，工厂包含该模块及其导入的所有模块中声明的所有提供者。在运行时，该工厂会变成负责实例化所有这些服务的注入器。

Tree-shaking doesn't work here because Angular can't decide to exclude one chunk of code (the provider definition for the service within the module factory) based on whether another chunk of code (the service class) is used. To make services tree-shakable, the information about how to construct an instance of the service (the provider definition) needs to be a part of the service class itself.

这里摇树优化不起作用，因为 Angular 无法根据是否用到了其它代码块（服务类），来决定是否能排除这块代码（模块工厂中的服务提供者定义）。要让服务可以被摇树优化，关于如何构建该服务实例的信息（即提供者定义），就应该是服务类本身的一部分。

### Creating tree-shakable providers

### 创建可摇树优化的提供者

You can make a provider tree-shakable by specifying it in the `@Injectable()` decorator on the service itself, rather than in the metadata for the NgModule or component that depends on the service.

只要在服务本身的 `@Injectable()` 装饰器中指定，而不是在依赖该服务的 NgModule 或组件的元数据中指定，你就可以制作一个可摇树优化的提供者。

The following example shows the tree-shakable equivalent to the `ServiceModule` example above.

下面的例子展示了与上面的 `ServiceModule` 例子等价的可摇树优化的版本。

<code-example path="dependency-injection/src/app/tree-shaking/service.ts"  header="src/app/tree-shaking/service.ts"></code-example>

The service can be instantiated by configuring a factory function, as in the following example.

该服务还可以通过配置工厂函数来实例化，如下例所示。

<code-example path="dependency-injection/src/app/tree-shaking/service.0.ts"  header="src/app/tree-shaking/service.0.ts"></code-example>

<div class="alert is-helpful">

To override a tree-shakable provider, configure the injector of a specific NgModule or component with another provider, using the `providers: []` array syntax of the `@NgModule()` or `@Component()` decorator.

要想覆盖可摇树优化的提供者，请使用其它提供者来配置指定的 NgModule 或组件的注入器，只要使用 `@NgModule()` 或 `@Component()` 装饰器中的 `providers: []` 数组就可以了。

</div>
