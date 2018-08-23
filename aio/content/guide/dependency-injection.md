# Angular Dependency Injection

# Angular 依赖注入

**Dependency Injection (DI)** is a way to create objects that depend upon other objects.
A Dependency Injection system supplies the dependent objects (called the _dependencies_)
when it creates an instance of an object.

**依赖注入（DI）**是用来创建对象及其依赖的其它对象的一种方式。
当依赖注入系统创建某个对象实例时，会负责提供该对象所依赖的对象（称为该对象的*依赖*）。

The [Dependency Injection pattern](guide/dependency-injection-pattern) page describes this general approach.
_The guide you're reading now_ explains how Angular's own Dependency Injection system works.

[依赖注入模式](guide/dependency-injection-pattern)中讲解了这种通用的方法。
*这里*解释的是 Angular 依赖注入系统本身的工作原理。

## DI by example

## DI 的例子

You'll learn Angular Dependency Injection through a discussion of the sample app that accompanies this guide.
Run the <live-example></live-example> anytime.

在这篇指南中，你将会通过对一个范例应用的讨论来学习 Angular 的依赖注入技术。

Start by reviewing this simplified version of the _heroes_ feature
from the [The Tour of Heroes](tutorial/).

先从[《英雄指南》](tutorial/)中*英雄*特性区的一个简化版本开始。

<code-tabs>
  <code-pane title="src/app/heroes/heroes.component.ts" path="dependency-injection/src/app/heroes/heroes.component.1.ts"
  region="v1">
  </code-pane>

  <code-pane title="src/app/heroes/hero-list.component.ts" path="dependency-injection/src/app/heroes/hero-list.component.1.ts">
  </code-pane>

  <code-pane title="src/app/heroes/hero.ts" path="dependency-injection/src/app/heroes/hero.ts">
  </code-pane>

  <code-pane title="src/app/heroes/mock-heroes.ts" path="dependency-injection/src/app/heroes/mock-heroes.ts">
  </code-pane>

</code-tabs>

The `HeroesComponent` is the top-level heroes component.
Its only purpose is to display the `HeroListComponent`
which displays a list of hero names.

`HeroesComponent` 是位于顶级的组件。
它唯一的用途是显示 `HeroListComponent`，它显示一个英雄名字的列表。

This version of the `HeroListComponent` gets its `heroes` from the `HEROES` array, an in-memory collection
defined in a separate `mock-heroes` file.

这个版本的 `HeroListComponent` 从 `HEROES` 数组（定义在 `mock-heroes` 文件中的内存数组）中获取 `heroes`。

<code-example title="src/app/heroes/hero-list.component.ts (class)" path="dependency-injection/src/app/heroes/hero-list.component.1.ts"
region="class">
</code-example>

That may suffice in the early stages of development, but it's far from ideal.
As soon as you try to test this component or get heroes from a remote server,
you'll have to change the implementation of `HerosListComponent` and
replace every other use of the `HEROES` mock data.

在开发的早期阶段，这就够用了，不过还很不理想。
当要测试这个组件或者要从远端服务器获取英雄数据时，你就不得不去修改 `HeroesListComponent` 的实现，并要替换所有使用了 `HEROES` 模拟数据的地方。

It's better to hide these details inside a _service_ class, 
[defined in its own file](#one-class-per-file).

最好隐藏服务类的这些内部实现细节，那就先[把它定义在自己的文件中](#one-class-per-file)。

## Create an injectable _HeroService_

## 创建一个可注入的 `HeroService`

The [**Angular CLI**](https://cli.angular.io/) can generate a new `HeroService` class in the `src/app/heroes` folder with this command.

[**Angular CLI**](https://cli.angular.io/) 可以使用下列命令在 `src/app/heroes` 目录下新建一个 `HeroService` 类。

<code-example language="sh" class="code-shell">
ng generate service heroes/hero
</code-example>

The command above creates the following `HeroService` skeleton.

上述命令会创建如下的 `HeroService` 骨架代码：

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" title="src/app/heroes/hero.service.ts (CLI-generated)">
</code-example>

The `@Injectable` decorator is an essential ingredient in every Angular service definition.
The rest of the class has been rewritten to expose a `getHeroes` method 
that returns the same mock data as before.

`@Injectable` 装饰器是定义每个 Angular 服务时的必备部分。
把该类的其它部分改写为暴露一个返回和以前一样的 mock 数据的 `getHeroes` 方法。

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" title="src/app/heroes/hero.service.3.ts">
</code-example>

Of course, this isn't a real data service.
If the app were actually getting data from a remote server, 
the `getHeroes` method signature would have to be asynchronous.

当然，这还不是真正的数据服务。
如果该应用真的从远端服务器获取数据，那么 `getHeroes` 的方法签名就应该是异步形式的。

That's a defect we can safely ignore in this guide where our focus is on
_injecting the service_ into the `HeroList` component.

我们可以放心地忽略这个问题，因为这里的焦点在于*把服务注入*到 `HeroListComponent` 组件中。

{@a injector-config}

{@a bootstrap}

## Injectors

## 注入器

A _service_ like `HeroService` is just a class in Angular until you register it with an Angular dependency injector.

在你把 Angular 中的*服务类*（比如 `HeroService` ）注册进依赖注入器（injector）之前，它只是个普通类而已。

An Angular injector is responsible for creating service instances and injecting them into classes like the `HeroListComponent`.

Angular 的依赖注入器负责创建服务的实例，并把它们注入到像 `HeroListComponent` 这样的类中。

You rarely create an Angular injector yourself.
Angular creates injectors for you as it executes the app,
starting with the _root injector_ that it creates during the [bootstrap process](guide/bootstrapping).

你很少需要自己创建 Angular 的依赖注入器。
当 Angular 运行本应用时，它会为你创建这些注入器，首先会在[引导过程](guide/bootstrapping)中创建一个*根注入器*。

Angular doesn't automatically know how you want to create instances of your services or the injector to create your service. You must configure it by specifying providers for every service.

Angular 本身没法自动判断你是打算自行创建服务类的实例，还是等注入器来创建它。你必须通过为每个服务指定服务提供商来配置它。

**Providers** tell the injector _how to create the service_.
Without a provider, the injector would not know
that it is responsible for injecting the service
nor be able to create the service.

**提供商**会告诉注入器*如何创建该服务*。
如果没有提供商，注入器既不知道它该负责创建该服务，也不知道如何创建该服务。

<div class="alert is-helpful">

You'll learn much more about _providers_ [below](#providers).
For now, it is sufficient to know that they configure where and how services are created.

你可以在[稍后的部分](#providers)学到更多关于*提供商*的知识。
不过目前，你只要知道它们是用来配置服务应该在哪里创建以及如何创建的就够了。

</div>

There are many ways to register a service provider with an injector. This section shows the most common ways 
of configuring a provider for your services.

有很多方式可以为注入器注册服务提供商。本节会展示为你的服务配置提供商最常见的途径。

{@a register-providers-injectable}

## @Injectable providers

## @Injectable 的 providers 数组

The `@Injectable` decorator identifies services and other classes that are intended to be injected. It can also be used to configure a provider for those services.

`@Injectable` 装饰器会指出这些服务或其它类是用来注入的。它还能用于为这些服务提供配置项。

Here we configure a provider for `HeroService` using the `@Injectable` decorator on the class.

这里我们使用类上的 `@Injectable` 装饰器来为 `HeroService` 配置了一个提供商。

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts"  title="src/app/heroes/heroes.service.ts" linenums="false"> </code-example> 

`providedIn` tells Angular that the root injector is responsible for creating an instance of the `HeroService` (by invoking its constructor) and making it available across the application. The CLI sets up this kind of a provider automatically for you when generating a new service.

`providedIn` 告诉 Angular，它的根注入器要负责调用 `HeroService` 类的构造函数来创建一个实例，并让它在整个应用中都是可用的。在使用 CLI 生成新服务时，会默认帮你设置为这种提供商。

Sometimes it's not desirable to have a service always be provided in the application root injector. Perhaps users should explicitly opt-in to using the service, or the service should be provided in a lazily-loaded context. In this case, the provider should be associated with a specific `@NgModule` class, and will be used by whichever injector includes that module.

有时，你不希望只在应用的根注入器中提供服务。有可能用户希望显式选择要使用的服务，或者应该在一个惰性加载的环境下提供该服务。这种情况下，服务提供商应该关联到一个特定的 `@NgModule` 类，而且应该用于该模块包含的任何一个注入器中。

In the following excerpt, the `@Injectable` decorator is used to configure a provider that will be available in any injector that includes the HeroModule.

下面这段代码中，`@Injectable` 装饰器用来配置一个服务提供商，它可以用在任何包含了 HeroModule 的注入器中。

<code-example path="dependency-injection/src/app/heroes/hero.service.4.ts"  title="src/app/heroes/hero.service.ts" linenums="false"> </code-example>

{@a register-providers-ngmodule}

### _@NgModule_ providers

### `@NgModule` 中的 `providers`

In the following excerpt, the root `AppModule` registers two providers in its `providers` array.

在下面的代码片段中，根模块 `AppModule` 在自己的 `providers` 数组中注册了两个提供商。

<code-example path="dependency-injection/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts (providers)" region="providers">
</code-example>

The first entry registers the `UserService` class (_not shown_) under the `UserService` _injection token_.
The second registers a value (`HERO_DI_CONFIG`) under the `APP_CONFIG` _injection token_.

第一条使用 `UserService` 这个*注入令牌（injection token）*注册了 `UserService` 类（代码中未显示）。
第二条使用 `APP_CONFIG` 这个注入令牌注册了一个值（`HERO_DI_CONFIG`）。

With the above registrations, Angular can inject the `UserService` or the `HERO_DI_CONFIG` value
into any class that it creates.

借助这些注册语句，Angular 现在可以向它创建的任何类中注册 `UserService` 或 `HERO_DI_CONFIG` 值了。

<div class="alert is-helpful">

You'll learn about _injection tokens_ and _provider_ syntax [below](#providers).

[稍后](#providers)你就会学到关于*注入令牌*和服务提供商语法的知识。

</div>

{@a register-providers-component}

### _@Component_ providers

### 在组件中注册提供商

In addition to providing the service application-wide or within a particular `@NgModule`, services can also be provided in specific components. Services provided in component-level is only available within that component injector or in any of its child components.

除了提供给全应用级或特定的 `@NgModule` 中之外，服务还可以提供给指定的组件。在组件级提供的服务职能在该组件及其子组件的注入器中使用。

The example below shows a revised `HeroesComponent` that registers the `HeroService` in its `providers` array.

下面的例子展示了一个修改过的 `HeroesComponent`，它在自己的 `providers` 数组中注册了 `HeroService`。

<code-example path="dependency-injection/src/app/heroes/heroes.component.1.ts" title="src/app/heroes/heroes.component.ts" linenums="false">
</code-example>

{@a ngmodule-vs-comp}

### @Injectable, _@NgModule_ or _@Component_?

### @Injectable、_@NgModule_ 还是 _@Component_ ？

Should you provide a service with an `@Injectable` decorator, in an `@NgModule`, or within an `@Component`?
The choices lead to differences in the final bundle size, service _scope_, and service _lifetime_.

你该使用 `@Injectable` 装饰器、`@NgModule`还是 `@Component` 来提供服务呢？
这几个选择的差别在于最终的打包体积、服务的*范围*和服务的*生命周期*。

When you register providers in the **@Injectable** decorator of the service itself, optimization tools such as those used by the CLI's production builds can perform tree shaking, which removes services that aren't used by your app. Tree shaking results in smaller bundle sizes.

当你在服务本身的 **@Injectable** 装饰器中注册提供商时，优化工具（比如 CLI 产品模式构建时所用的）可以执行摇树优化，这会移除所有没在应用中使用过的服务。摇树优化会导致更小的打包体积。

**Angular module providers** (`@NgModule.providers`) are registered with the application's root injector.
Angular can inject the corresponding services in any class it creates.
Once created, a service instance lives for the life of the app and Angular injects this one service instance in every class that needs it.

**Angular 模块中的 `providers`**（`@NgModule.providers`）是注册在应用的根注入器下的。
因此，Angular 可以往它所创建的任何类中注入相应的服务。 
一旦创建，服务的实例就会存在于该应用的全部生存期中，Angular 会把这一个服务实例注入到需求它的每个类中。

You're likely to inject the `UserService` in many places throughout the app
and will want to inject the same service instance every time.
Providing the `UserService` with an Angular module is a good choice if an `@Injectable` provider is not an option.

你可能想要把这个 `UserService` 注入到应用中的很多地方，并期望每次注入的都是同一个服务实例。
这时候如果不能用 `@Injectable`，那么就可以在 Angular 的模块中提供 `UserService`。

<div class="alert is-helpful">

To be precise, Angular module providers are registered with the root injector
_unless the module is_ [lazy loaded](guide/lazy-loading-ngmodules).
In this sample, all modules are _eagerly loaded_ when the application starts,
so all module providers are registered with the app's root injector.

严格来说，Angular 模块中的服务提供商会注册到根注入器上，但是，[惰性加载](guide/lazy-loading-ngmodules)的模块是例外。
在这个例子中，所有模块都是在应用启动时*立即加载*的，因此模块上的所有服务提供商都注册到了应用的根注入器上。

</div><br>

<hr>

**A component's providers** (`@Component.providers`) are registered with each component instance's own injector.

**组件的提供商**（`@Component.providers`）会注册到每个组件实例自己的注入器上。

Angular can only inject the corresponding services in that component instance or one of its descendant component instances.
Angular cannot inject the same service instance anywhere else.

因此 Angular 只能在该组件及其各级子组件的实例上注入这个服务实例，而不能在其它地方注入这个服务实例。

Note that a component-provided service may have a limited lifetime. Each new instance of the component gets its own instance of the service
and, when the component instance is destroyed, so is that service instance.

注意，由组件提供的服务，也同样具有有限的生命周期。组件的每个实例都会有它自己的服务实例，并且，当组件实例被销毁的时候，服务的实例也同样会被销毁。

In this sample app, the `HeroComponent` is created when the application starts
and is never destroyed so the `HeroService` created for the `HeroComponent` also live for the life of the app.

在这个范例应用中，`HeroComponent` 会在应用启动时创建，并且它从未销毁，因此，由 `HeroComponent` 创建的 `HeroService` 也同样会活在应用的整个生命周期中。

If you want to restrict `HeroService` access to the `HeroComponent` and its nested `HeroListComponent`,
providing the `HeroService` in the `HeroComponent` may be a good choice.

如果你要把 `HeroService` 的访问权限定在 `HeroesComponent` 及其嵌套的 `HeroListComponent` 中，那么在 `HeroesComponent` 中提供这个 `HeroService` 就是一个好选择。

<div class="alert is-helpful">

The scope and lifetime of component-provided services is a consequence of [the way Angular creates component instances](#component-child-injectors). 

由组件提供的服务，其范围和生命周期是 [Angular 如何创建组件实例](#component-child-injectors) 的必然结果。

</div>

{@a providers}

## Providers

## 服务提供商们

A service provider *provides* the concrete, runtime version of a dependency value.
The injector relies on **providers** to create instances of the services
that the injector injects into components, directives, pipes, and other services.

服务提供商*提供*依赖值的一个具体的、运行时的版本。
注入器依靠**提供商**来创建服务的实例，注入器再将服务的实例注入组件、管道或其它服务。

You must register a service *provider* with an injector, or it won't know how to create the service.

必须为注入器注册一个服务的*提供商*，否则它就不知道该如何创建该服务。

The next few sections explain the many ways you can specify a provider.

在下面的几节中会解释指定提供商的多种方式。

### The class as its own provider

### 把类作为它自己的提供商

There are many ways to *provide* something that looks and behaves like a `Logger`.
The `Logger` class itself is an obvious and natural provider.

有很多方式可以*提供*一些实现 `Logger` 类的东西。
  `Logger` 类本身是一个显而易见而且自然而然的提供商。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger">
</code-example>

But it's not the only way.

但它不是唯一的途径。

You can configure the injector with alternative providers that can deliver an object that behaves like a `Logger`.
You could provide a substitute class. You could provide a logger-like object.
You could give it a provider that calls a logger factory function.
Any of these approaches might be a good choice under the right circumstances.

可以用其它备选提供商来配置注入器，只要它们能交付一个行为类似于 `Logger` 的对象就可以了。
可以提供一个替代类。你可以提供一个类似日志的对象。
可以给它一个提供商，让它调用可以创建日志服务的工厂函数。
所有这些方法，只要用在正确的场合，都可能是一个好的选择。

What matters is that the injector has a provider to go to when it needs a `Logger`.

重点是，当注入器需要一个 `Logger` 时，它得先有一个提供商。

{@a provide}

### The _provide_ object literal

### *provide* 对象字面量

Here's the class-provider syntax again.

下面是类提供商的另一种语法。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger">
</code-example>

This is actually a shorthand expression for a provider registration
using a _provider_ object literal with two properties:

这其实是用于注册提供商的简写表达式。
  使用的是一个带有两个属性的*提供商*对象字面量：

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-3" >
</code-example>

The `provide` property holds the [token](guide/dependency-injection#token) that serves as the key for both locating a dependency value
and registering the provider.

`provide` 属性保存的是[令牌 (token)](guide/dependency-injection#token)，它作为键值 (key) 使用，用于定位依赖值和注册提供商。

The second property is always a provider definition object,
which you can think of as a *recipe* for creating the dependency value.
There are many ways to create dependency values just as there are many ways to write a recipe.

第二个是一个提供商定义对象。
可以把它看做是指导如何创建依赖值的*配方*。
有很多方式创建依赖值…… 也有很多方式可以写配方。

{@a class-provider}

### Alternative class providers

### 备选的类提供商

Occasionally you'll ask a different class to provide the service.
The following code tells the injector
to return a `BetterLogger` when something asks for the `Logger`.

某些时候，你会请求一个不同的类来提供服务。
下列代码告诉注入器，当有人请求 `Logger` 时，返回 `BetterLogger`。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-4" >
</code-example>

{@a class-provider-dependencies}

### Class provider with dependencies

### 带依赖的类提供商

Maybe an `EvenBetterLogger` could display the user name in the log message.
This logger gets the user from the injected `UserService`,
which is also injected at the application level.

假设 `EvenBetterLogger` 可以在日志消息中显示用户名。
这个日志服务从注入的 `UserService` 中取得用户，
`UserService` 通常也会在应用级注入。

<code-example path="dependency-injection/src/app/providers.component.ts" region="EvenBetterLogger"  linenums="false">
</code-example>

Configure it like `BetterLogger`.

就像之前在 `BetterLogger` 中那样配置它。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-5"  linenums="false">
</code-example>

{@a aliased-class-providers}

### Aliased class providers

### 别名类提供商

Suppose an old component depends upon an `OldLogger` class.
`OldLogger` has the same interface as the `NewLogger`, but for some reason
you can't update the old component to use it.

假设某个旧组件依赖一个 `OldLogger` 类。
`OldLogger` 和 `NewLogger` 具有相同的接口，但是由于某些原因，
你不能升级这个旧组件并使用它。

When the *old* component logs a message with `OldLogger`,
you'd like the singleton instance of `NewLogger` to handle it instead.

当*旧*组件想使用 `OldLogger` 记录消息时，你希望改用 `NewLogger` 的单例对象来记录。

The dependency injector should inject that singleton instance
when a component asks for either the new or the old logger.
The `OldLogger` should be an alias for `NewLogger`.

不管组件请求的是新的还是旧的日志服务，依赖注入器注入的都应该是同一个单例对象。
  也就是说，`OldLogger` 应该是 `NewLogger` 的别名。

You certainly do not want two different `NewLogger` instances in your app.
Unfortunately, that's what you get if you try to alias `OldLogger` to `NewLogger` with `useClass`.

你当然不会希望应用中有两个不同的 `NewLogger` 实例。
不幸的是，如果尝试通过 `useClass` 来把 `OldLogger` 作为 `NewLogger` 的别名，就会导致这样的后果。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6a"  linenums="false">
</code-example>

The solution: alias with the `useExisting` option.

解决方案：使用 `useExisting` 选项指定别名。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6b" linenums="false">
</code-example>

{@a value-provider}

### Value providers

### 值提供商

Sometimes it's easier to provide a ready-made object rather than ask the injector to create it from a class.

有时，提供一个预先做好的对象会比请求注入器从类中创建它更容易。

<code-example path="dependency-injection/src/app/providers.component.ts" region="silent-logger"  linenums="false">
</code-example>

Then you register a provider with the `useValue` option,
which makes this object play the logger role.

于是可以通过 `useValue` 选项来注册提供商，它会让这个对象直接扮演 logger 的角色。

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-7" linenums="false">
</code-example>

See more `useValue` examples in the
[Non-class dependencies](guide/dependency-injection#non-class-dependencies) and
[InjectionToken](guide/dependency-injection#injection-token) sections.

查看更多 `useValue` 的例子，见[非类依赖](guide/dependency-injection#non-class-dependencies)和 [InjectionToken](guide/dependency-injection#injection-token)部分。

{@a factory-provider}

### Factory providers

### 工厂提供商

Sometimes you need to create the dependent value dynamically,
based on information you won't have until the last possible moment.
Maybe the information changes repeatedly in the course of the browser session.

有时，你需要动态创建这个依赖值，因为它所需要的信息直到最后一刻才能确定。
也许这个信息会在浏览器的会话中不停地变化。

Suppose also that the injectable service has no independent access to the source of this information.

还假设这个可注入的服务没法通过独立的源访问此信息。

This situation calls for a **factory provider**.

这种情况下，请调用**工厂提供商**。

To illustrate the point, add a new business requirement:
the `HeroService` must hide *secret* heroes from normal users.
Only authorized users should see secret heroes.

下面通过添加新的业务需求来说明这一点：
`HeroService` 必须对普通用户隐藏掉*秘密*英雄。
只有授权用户才能看到秘密英雄。

Like the `EvenBetterLogger`, the `HeroService` needs a fact about the user.
It needs to know if the user is authorized to see secret heroes.
That authorization can change during the course of a single application session,
as when you log in a different user.

就像 `EvenBetterLogger` 那样，`HeroService` 需要了解此用户的身份。
它需要知道，这个用户是否有权看到隐藏英雄。
这个授权可能在单一的应用会话中被改变，例如，改用另一个用户的身份登录时。

Unlike `EvenBetterLogger`, you can't inject the `UserService` into the `HeroService`.
The `HeroService` won't have direct access to the user information to decide
who is authorized and who is not.

与 `EvenBetterLogger` 不同，不能把 `UserService` 注入到 `HeroService` 中。
  `HeroService` 无权访问用户信息，来决定谁有授权谁没有授权。

Instead, the `HeroService` constructor takes a boolean flag to control display of secret heroes.

让 `HeroService` 的构造函数带上一个布尔型的标志，来控制是否显示隐藏的英雄。

<code-example path="dependency-injection/src/app/heroes/hero.service.ts" region="internals" title="src/app/heroes/hero.service.ts (excerpt)" linenums="false">
</code-example>

You can inject the `Logger`, but you can't inject the  boolean `isAuthorized`.
You'll have to take over the creation of new instances of this `HeroService` with a factory provider.

你可以注入 `Logger`，但是不能注入逻辑型的 `isAuthorized`。
你不得不通过通过工厂提供商创建这个 `HeroService` 的新实例。

A factory provider needs a factory function:

工厂提供商需要一个工厂方法：

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="factory" title="src/app/heroes/hero.service.provider.ts (excerpt)" linenums="false">
</code-example>

Although the `HeroService` has no access to the `UserService`, the factory function does.

虽然 `HeroService` 不能访问 `UserService`，但是工厂方法可以。

You inject both the `Logger` and the `UserService` into the factory provider
and let the injector pass them along to the factory function:

同时把 `Logger` 和 `UserService` 注入到工厂提供商中，并且让注入器把它们传给工厂方法：

<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="provider" title="src/app/heroes/hero.service.provider.ts (excerpt)" linenums="false">
</code-example>

<div class="alert is-helpful">

The `useFactory` field tells Angular that the provider is a factory function
whose implementation is the `heroServiceFactory`.

`useFactory` 字段告诉 Angular：这个提供商是一个工厂方法，它的实现是 `heroServiceFactory`。

The `deps` property is an array of [provider tokens](guide/dependency-injection#token).
The `Logger` and `UserService` classes serve as tokens for their own class providers.
The injector resolves these tokens and injects the corresponding services into the matching factory function parameters.

`deps` 属性是[提供商令牌](guide/dependency-injection#token)数组。
    `Logger` 和 `UserService` 类作为它们自身类提供商的令牌。
    注入器解析这些令牌，把相应的服务注入到工厂函数中相应的参数中去。

</div>

Notice that you captured the factory provider in an exported variable, `heroServiceProvider`.
This extra step makes the factory provider reusable.
You can register the `HeroService` with this variable wherever you need it.

注意，你在一个导出的变量中捕获了这个工厂提供商：`heroServiceProvider`。
这个额外的步骤让工厂提供商可被复用。
无论哪里需要，都可以使用这个变量注册 `HeroService`。

In this sample, you need it only in the `HeroesComponent`,
where it replaces the previous `HeroService` registration in the metadata `providers` array.
Here you see the new and the old implementation side-by-side:

在这个例子中，只在 `HeroesComponent` 中需要它，
  这里，它代替了元数据 `providers` 数组中原来的 `HeroService` 注册。
  对比一下新的和旧的实现：

<code-tabs>

  <code-pane title="src/app/heroes/heroes.component (v3)" path="dependency-injection/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane title="src/app/heroes/heroes.component (v2)" path="dependency-injection/src/app/heroes/heroes.component.1.ts">
  </code-pane>

</code-tabs>

{@a tree-shakable-provider}

### Tree-shakable providers

### 可以被摇树优化的提供商

Tree shaking is the ability to remove code that is not referenced in an application from the final bundle. Tree-shakable providers give Angular the ability to remove services that are not used in your application from the final output. This significantly reduces the size of your bundles.

摇树优化可以在最终打包时移除应用中从未引用过的代码。可摇树优化的提供商可以让 Angular 从结果中移除应用中那些从未使用过的服务。这可以显著减小打包体积。

Ideally, if an application is not injecting a service, it should not be included in the final output. However, it turns out that the Angular compiler cannot identify at build time if the service will be required or not. Because it's always possible to inject a service directly using `injector.get(Service)`, Angular cannot identify all of the places in your code where this injection could happen, so it has no choice but to include the service in the injector regardless. Thus, services provided in modules are not tree-shakeable.

理想情况下，如果应用没有注入过某个服务，它就不应该被包含在最终结果中。不过，问题在于 Angular 的编译器无法在构建期间识别出该服务是不是必要的。
因为总是可以使用 `injector.get(Service)` 的形式直接注入某个服务，而 Angular 不能从你的代码中识别出所有能够进行这种注入的地方。所以，Angular 别无选择，只能把这个服务包含到注入器中。因此，在模块中提供的服务也就无法进行摇树优化了。

Let us consider an example of non-tree-shakable providers in Angular.

来看一个 Angular 无法对提供商进行摇树优化的例子。

In this example, to provide services in Angular, you include them in an `@NgModule`:

在这个例子中，为了在 Angular 中提供服务，你把它们都包含进了 `@NgModule` 中：

<code-example path="dependency-injection/src/app/tree-shaking/service-and-module.ts"  title="src/app/tree-shaking/service-and-modules.ts" linenums="false"> </code-example>

This module can then be imported into your application module, to make the service available for injection in your app:

接着，该模块可以导入到你的应用模块中，以便让该服务在整个应用中可用：

<code-example path="dependency-injection/src/app/tree-shaking/app.module.ts"  title="src/app/tree-shaking/app.modules.ts" linenums="false"> </code-example>

When `ngc` runs, it compiles AppModule into a module factory, which contains definitions for all the providers declared in all the modules it includes. At runtime, this factory becomes an injector that instantiates these services.

当运行 `ngc` 时，它会把 AppModule 编译进一个模块工厂里，该工厂中含有它包含的所有子模块中声明过的所有提供商。在运行期间，该工厂会编程一个用于实例化这些服务的注入器。

Tree-shaking doesn't work in the method above because Angular cannot decide to exclude one chunk of code (the provider definition for the service within the module factory) based on whether another chunk of code (the service class) is used. To make services tree-shakeable, the information about how to construct an instance of the service (the provider definition) needs to be a part of the service class itself.

在这种方式下，摇树优化无法工作，因为 Angular 无法根据该代码（服务类）是否被其它代码块使用过（比如该服务的提供商就定义在了模块工厂里）来排除它。
要让这些服务可以被摇树优化，所有关于如何构建该服务的实例的信息（提供商定义）就应该是该服务类本身的一部分。

#### Creating tree-shakable providers

#### 创建可摇树优化的服务提供商

To create providers that are tree-shakable, the information that used to be specified in the module should be specified in the `@Injectable` decorator on the service itself.

要想创建可摇树优化的服务提供商，那些原本要通过模块来指定的信息就要改为在服务自身的 `@Injectable` 装饰器中提供。

The following example shows the tree-shakeable equivalent to the `ServiceModule` example above:

下面的例子展示了一个与上面的 `ServiceModule` 范例等价的可摇树的优化版本：

<code-example path="dependency-injection/src/app/tree-shaking/service.ts"  title="src/app/tree-shaking/service.ts" linenums="false"> </code-example>

In the example above, `providedIn` allows you to declare the injector which injects this service. Unless there is a special case, the value should always be root. Setting the value to root ensures that the service is scoped to the root injector, without naming a particular module that is present in that injector.

上面这个例子中，`providedIn` 允许你声明要由哪个注入器来注入该服务。除了一些特殊情况外，这个值应该始终是 root（根注入器）。把该值设置为 root 可以确保该服务的范围是根注入器，而不是该注入器所在的那个特定模块。

The service can be instantiated by configuring a factory function as shown below:

该服务也可以通过配置一个工厂函数来实例化，例子如下：

<code-example path="dependency-injection/src/app/tree-shaking/service.0.ts"  title="src/app/tree-shaking/service.0.ts" linenums="false"> </code-example>

<div class="alert is-helpful">

To override tree-shakable providers, register the provider using the `providers: []` array syntax of any Angular decorator that supports it.

要想改写（override）一个可摇树优化的提供商，可以在任何支持 `providers: []` 数组的 Angular 装饰器中注册该提供商。

</div>

{@a injector-config} 

{@a bootstrap}

## Inject a service

## 注入某个服务

The `HeroListComponent` should get heroes from the `HeroService`.

`HeroListComponent` 应该从 `HeroService` 中获取这些英雄数据。

The component shouldn't create the `HeroService` with `new`.
It should ask for the `HeroService` to be injected.

该组件不应该使用 `new` 来创建 `HeroService`。
它应该要求注入 `HeroService`。

You can tell Angular to inject a dependency in the component's constructor by specifying a **constructor parameter with the dependency type**.
Here's the `HeroListComponent` constructor, asking for the `HeroService` to be injected.

你可以通过**在构造函数中添加一个带有该依赖类型的参数**来要求 Angular 把这个依赖注入到组件的构造函数中。
下面是 `HeroListComponent` 的构造函数，它要求注入 `HeroService`。

<code-example title="src/app/heroes/hero-list.component (constructor signature)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>

Of course, the `HeroListComponent` should do something with the injected `HeroService`.
Here's the revised component, making use of the injected service, side-by-side with the previous version for comparison.

当然，`HeroListComponent` 还应该使用注入的这个 `HeroService` 做点什么。
下面输出修改过的组件，改用注入的服务，与前一个版本对比一下。

<code-tabs>
  <code-pane title="hero-list.component (with DI)" path="dependency-injection/src/app/heroes/hero-list.component.2.ts">
  </code-pane>

  <code-pane title="hero-list.component (without DI)" path="dependency-injection/src/app/heroes/hero-list.component.1.ts">
  </code-pane>
</code-tabs>

Notice that the `HeroListComponent` doesn't know where the `HeroService` comes from.
_You_ know that it comes from the parent `HeroesComponent`.
If you decided instead to provide the `HeroService` in the `AppModule`,
the `HeroListComponent` wouldn't change at all.
The _only thing that matters_ is that the `HeroService` is provided in some parent injector.

注意，`HeroListComponent` 并不知道 `HeroService` 来自哪里。
不过，**你**知道它来自其父组件 `HeroesComponent`。
如果你决定改为在 `AppModule` 中提供这个 `HeroService`，`HeroListComponent` 不需要做任何改动。
**唯一需要关心的问题**是，`HeroService` 是由某个父注入器提供的。

{@a singleton-services}

## Singleton services

## 单例服务

Services are singletons _within the scope of an injector_.
There is at most one instance of a service in a given injector.

服务*在每个注入器的范围内*是单例的。
在任何一个注入器中，最多只会有同一个服务的一个实例。

There is only one root injector, and the `UserService` is registered with that injector.
Therefore, there can be just one `UserService` instance in the entire app,
and every class that injects `UserService` get this service instance.

这里只有一个根注入器，而 `UserService` 就是在该注入器中注册的。
所以，在整个应用中只能有一个 `UserService` 实例，每个要求注入 `UserService` 的类都会得到这个服务实例。

However, Angular DI is a 
[hierarchical injection system](guide/hierarchical-dependency-injection), 
which means that nested injectors can create their own service instances.
Angular creates nested injectors all the time.

不过，Angular DI 是一个 [多级注入系统](guide/hierarchical-dependency-injection)，这意味着各级注入器都可以创建它们自己的服务实例。
Angular 总会创建多级注入器。

{@a component-child-injectors}

## Component child injectors

## 组件的子注入器

Component injectors are independent of each other and
each of them creates its own instances of the component-provided services.

组件注入器是彼此独立的，每一个都会为这些组件提供的服务创建单独的实例。

For example, when Angular creates a new instance of a component that has `@Component.providers`,
it also creates a new _child injector_ for that instance.

例如，当 Angular 创建一个带有 `@Component.providers` 的组件实例时，也会同时为这个实例创建一个新的*子注入器*。

When Angular destroys one of these component instances, it also destroys the
component's injector and that injector's service instances. 

当 Angular 销毁某个组件实例时，也会同时销毁该组件的注入器，以及该注入器中的服务实例。

Because of [injector inheritance](guide/hierarchical-dependency-injection),
you can still inject application-wide services into these components.
A component's injector is a child of its parent component's injector,
and a descendent of its parent's parent's injector, and so on all the way back to the application's _root_ injector.
Angular can inject a service provided by any injector in that lineage.

由于是[多层注入器](guide/hierarchical-dependency-injection)，因此你仍然可以把全应用级的服务注入到这些组件中。
组件的注入器是其父组件注入器的孩子，也是其爷爷注入器的孙子，以此类推，直到该应用的**根**注入器。
Angular 可以注入这条线上的任何注入器所提供的服务。

For example, Angular could inject a `HeroListComponent`
with both the `HeroService` provided in `HeroComponent`
and the `UserService` provided in `AppModule`.

比如，Angular 可以把由 `HeroComponent` 提供的 `HeroService` 和由 `AppModule` 提供的 `UserService` 注入到 `HeroService` 中。

{@a testing-the-component}

## Testing the component

## 测试组件

Earlier you saw that designing a class for dependency injection makes the class easier to test.
Listing dependencies as constructor parameters may be all you need to test application parts effectively.

前面强调过，设计一个适合依赖注入的类，可以让这个类更容易测试。
要有效的测试应用中的一部分，只需要在构造函数的参数中列出依赖。

For example, you can create a new `HeroListComponent` with a mock service that you can manipulate
under test:

例如，新建的 `HeroListComponent` 实例使用一个模拟 (mock) 服务，以便可以在测试中操纵它：

<code-example path="dependency-injection/src/app/test.component.ts" region="spec" title="src/app/test.component.ts" linenums="false">
</code-example>

<div class="alert is-helpful">

Learn more in the [Testing](guide/testing) guide.

要学习更多知识，参见[测试](guide/testing)一章。

</div>

{@a service-needs-service}

## When the service needs a service

## 当服务需要别的服务时

The `HeroService` is very simple. It doesn't have any dependencies of its own.

这个 `HeroService` 非常简单。它本身不需要任何依赖。

What if it had a dependency? What if it reported its activities through a logging service?
You'd apply the same *constructor injection* pattern,
adding a constructor that takes a `Logger` parameter.

如果它也有依赖，该怎么办呢？例如，它需要通过日志服务来汇报自己的活动。
你同样用*构造函数注入*模式，来添加一个带有 `Logger` 参数的构造函数。

Here is the revised `HeroService` that injects the `Logger`, side-by-side with the previous service for comparison.

下面是修改后的 `HeroService`，它注入了 `Logger`，对比前后这两个版本：

<code-tabs>

  <code-pane title="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">
  </code-pane>

  <code-pane title="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">
  </code-pane>

</code-tabs>

The constructor asks for an injected instance of a `Logger` and stores it in a private field called `logger`.
The `getHeroes()` method logs a message when asked to fetch heroes.

这个构造函数要求注入一个 `Logger` 类的实例，并把它存到名为 `logger` 的私有字段中。
  当请求英雄数据时，`getHeroes()` 中就会记录一个消息。

{@a logger-service}

#### The dependent _Logger_ service

#### 被依赖的 `Logger` 服务

The sample app's `Logger` service is quite simple:

这个范例应用的 `Logger` 服务非常简单：

<code-example path="dependency-injection/src/app/logger.service.ts" title="src/app/logger.service.ts">
</code-example>

If the app didn't provide this `Logger`,
Angular would throw an exception when it looked for a `Logger` to inject
into the `HeroService`.

如果该应用没有提供这个 `Logger` 服务，当 Angular 试图把 `Logger` 注入到 `HeroService` 中时，就会抛出一个异常。

<code-example language="sh" class="code-shell">
  ERROR Error: No provider for Logger!
</code-example>

Because a singleton logger service is useful everywhere,
it's provided in the root `AppModule`.

因为 `Logger` 服务的单例应该随处可用，所以要在根模块 `AppModule` 中提供它。

<code-example path="dependency-injection/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts (providers)" region="providers-2">
</code-example>

{@a token}

## Dependency injection tokens

## 依赖注入令牌

When you register a provider with an injector, you associate that provider with a dependency injection token.
The injector maintains an internal *token-provider* map that it references when
asked for a dependency. The token is the key to the map.

当向注入器注册提供商时，实际上是把这个提供商和一个 DI 令牌关联起来了。
注入器维护一个内部的*令牌-提供商*映射表，这个映射表会在请求依赖时被引用到。
令牌就是这个映射表中的键值。

In all previous examples, the dependency value has been a class *instance*, and
the class *type* served as its own lookup key.
Here you get a `HeroService` directly from the injector by supplying the `HeroService` type as the token:

在前面的所有例子中，依赖值都是一个类*实例*，并且类的*类型*作为它自己的查找键值。
在下面的代码中，`HeroService` 类型作为令牌，直接从注入器中获取 `HeroService` 实例：

<code-example path="dependency-injection/src/app/injector.component.ts" region="get-hero-service" title="src/app/injector.component.ts" linenums="false">
</code-example>

You have similar good fortune when you write a constructor that requires an injected class-based dependency.
When you define a constructor parameter with the `HeroService` class type,
Angular knows to inject the
service associated with that `HeroService` class token:

编写需要基于类的依赖注入的构造函数对你来说是很幸运的。
只要定义一个 `HeroService` 类型的构造函数参数，
Angular 就会知道把跟 `HeroService` 类令牌关联的服务注入进来：

<code-example path="dependency-injection/src/app/heroes/hero-list.component.ts" region="ctor-signature" title="src/app/heroes/hero-list.component.ts">
</code-example>

This is especially convenient when you consider that most dependency values are provided by classes.

这是一个特殊的规约，因为大多数依赖值都是以类的形式提供的。

{@a non-class-dependencies}

### Non-class dependencies

### 非类依赖

What if the dependency value isn't a class? Sometimes the thing you want to inject is a
string, function, or object.

如果依赖值不是一个类呢？有时候想要注入的东西是一个字符串，函数或者对象。

Applications often define configuration objects with lots of small facts
(like the title of the application or the address of a web API endpoint)
but these configuration objects aren't always instances of a class.
They can be object literals such as this one:

应用程序经常为很多很小的因素定义配置对象（例如应用程序的标题或网络 API 终点的地址）。
  但是这些配置对象不总是类的实例，它们可能是对象，如下面这个：

<code-example path="dependency-injection/src/app/app.config.ts" region="config" title="src/app/app.config.ts (excerpt)" linenums="false">
</code-example>

What if you'd like to make this configuration object available for injection?
You know you can register an object with a [value provider](guide/dependency-injection#value-provider).

如果想让这个配置对象在注入时可用该怎么办？你知道你可以用[值提供商](guide/dependency-injection#value-provider)来注册一个对象。

But what should you use as the token?
You don't have a class to serve as a token.
There is no `AppConfig` class.

但是，这种情况下用什么作令牌呢？
你没办法找一个类来当作令牌，因为没有 `Config` 类。

<div class="alert is-helpful">

### TypeScript interfaces aren't valid tokens

### TypeScript 接口不是一个有效的令牌

The `HERO_DI_CONFIG` constant conforms to the `AppConfig` interface. 
Unfortunately, you cannot use a TypeScript interface as a token:

`HERO_DI_CONFIG` 常量有一个接口：`AppConfig`。不幸的是，不能把 TypeScript 接口用作令牌：

<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9-interface"  linenums="false">
</code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-9-ctor-interface"  linenums="false">
</code-example>

That seems strange if you're used to dependency injection in strongly typed languages, where
an interface is the preferred dependency lookup key.

对于习惯于在强类型的语言中使用依赖注入的开发人员，这会看起来很奇怪，
因为在强类型语言中，接口是首选的用于查找依赖的主键。

It's not Angular's doing. An interface is a TypeScript design-time artifact. JavaScript doesn't have interfaces.
The TypeScript interface disappears from the generated JavaScript.
There is no interface type information left for Angular to find at runtime.

这不是 Angular 的错。接口只是 TypeScript 设计时 (design-time) 的概念。JavaScript 没有接口。
TypeScript 接口不会出现在生成的 JavaScript 代码中。
在运行期，没有接口类型信息可供 Angular 查找。

</div>

{@a injection-token}

### _InjectionToken_

### _InjectionToken_ 值

One solution to choosing a provider token for non-class dependencies is
to define and use an [*InjectionToken*](api/core/InjectionToken).
The definition of such a token looks like this:

解决方案是为非类依赖定义和使用<a href="../api/core/InjectionToken"><b>InjectionToken</b></a>作为提供商令牌。
定义方式是这样的：

<code-example>
import { InjectionToken } from '@angular/core';
export const TOKEN = new InjectionToken('desc');
</code-example>

You can directly configure a provider when creating an `InjectionToken`. The provider configuration determines which injector provides the token and how the value will be created.  This is similar to using `@Injectable`, except that you cannot define standard providers (such as `useClass` or `useFactory`) with `InjectionToken`. Instead, you specify a factory function which returns the value to be provided directly.

你可以在创建 `InjectionToken` 时直接配置一个提供商。该提供商的配置会决定由哪个注入器来提供这个令牌，以及如何创建它的值。
这和 `@Injectable` 的用法很像，不过你没法用 `InjectionToken` 来定义标准提供商（比如 `useClass` 或 `useFactory`），而要指定一个工厂函数，该函数直接返回想要提供的值。

<code-example>
export const TOKEN = 
  new InjectionToken('desc', { providedIn: 'root', factory: () => new AppConfig(), })
</code-example>

Now you can inject the configuration object into any constructor that needs it, with
the help of an `@Inject` decorator:

现在，在 `@Inject` 装饰器的帮助下，这个配置对象可以注入到任何需要它的构造函数中：

<code-example>
constructor(@Inject(TOKEN));
</code-example>

If the factory function needs access to other DI tokens, it can use the inject function from `@angular/core` to request dependencies.

如果工厂函数需要访问其它的 DI 令牌，它可以使用来自 `@angular/core` 中的 `inject` 函数来申请它的依赖。

<code-example>
const TOKEN = 
  new InjectionToken('tree-shakeable token', 
    { providedIn: 'root', factory: () => 
        new AppConfig(inject(Parameter1), inject(Paremeter2)), });
</code-example>

{@a optional}

## Optional dependencies

## 可选依赖

You can tell Angular that the dependency is optional by annotating the constructor argument with null:

可以把构造函数的参数标记为 `null` 来告诉 Angular 该依赖是可选的：

<code-example>
constructor(@Inject(Token, null));
</code-example>

When using optional dependencies, your code must be prepared for a null value.

如果要使用可选依赖，你的代码就必须准备好处理空值。

## Summary

## 小结

You learned the basics of Angular dependency injection in this page.
You can register various kinds of providers,
and you know how to ask for an injected object (such as a service) by
adding a parameter to a constructor.

本章，你学习了 Angular 依赖注入的基础知识。
你可以注册很多种类的提供商，知道如何通过添加构造函数的参数来请求一个注入对象（例如一个服务）。

Angular dependency injection is more capable than this guide has described.
You can learn more about its advanced features, beginning with its support for
nested injectors, in
[Hierarchical Dependency Injection](guide/hierarchical-dependency-injection).

Angular 依赖注入比前面描述的更能干。
学习更多高级特性，如对嵌套注入器的支持，见[多级依赖注入](guide/hierarchical-dependency-injection)一章。

{@a explicit-injector}

## Appendix: Working with injectors directly

## 附录：直接使用注入器

Developers rarely work directly with an injector, but
here's an `InjectorComponent` that does.

这里的 `InjectorComponent` 直接使用了注入器，
但开发者很少直接使用它。

<code-example path="dependency-injection/src/app/injector.component.ts" region="injector" title="src/app/injector.component.ts">
</code-example>

An `Injector` is itself an injectable service.

`Injector` 本身是可注入的服务。

In this example, Angular injects the component's own `Injector` into the component's constructor.
The component then asks the injected injector for the services it wants in `ngOnInit()`.

在这个例子中，Angular 把组件自身的 `Injector` 注入到了组件的构造函数中。
然后，组件在 `ngOnInit()` 中向注入的注入器请求它所需的服务。

Note that the services themselves are not injected into the component.
They are retrieved by calling `injector.get()`.

注意，这些服务本身没有注入到组件，它们是通过调用 `injector.get()` 获得的。

The `get()` method throws an error if it can't resolve the requested service.
You can call `get()` with a second parameter, which is the value to return if the service
is not found. Angular can't find the service if it's not registered with this or any ancestor injector.

`get()` 方法如果不能解析所请求的服务，会抛出异常。
调用 `get()` 时，还可以使用第二个参数，一旦获取的服务没有在当前或任何祖先注入器中注册过，
就把它作为返回值。

<div class="alert is-helpful">

The technique is an example of the
[service locator pattern](https://en.wikipedia.org/wiki/Service_locator_pattern).

刚描述的这项技术是[服务定位器模式](https://en.wikipedia.org/wiki/Service_locator_pattern)的一个范例。

**Avoid** this technique unless you genuinely need it.
It encourages a careless grab-bag approach such as you see here.
It's difficult to explain, understand, and test.
You can't know by inspecting the constructor what this class requires or what it will do.
It could acquire services from any ancestor component, not just its own.
You're forced to spelunk the implementation to discover what it does.

要**避免使用**此技术，除非确实需要它。
它会鼓励鲁莽的方式，就像在这里看到的。
它难以解释、理解和测试。
仅通过阅读构造函数，没法知道这个类需要什么或者它将做什么。
它可以从任何祖先组件中获得服务，而不仅仅是它自己。
会迫使你深入它的实现，才可能明白它都做了啥。

Framework developers may take this approach when they
must acquire services generically and dynamically.

框架开发人员必须采用通用的或者动态的方式获取服务时，可能采用这个方法。

</div>

{@a one-class-per-file}

## Appendix: one class per file

## 附录：为什么建议每个文件只放一个类

Having multiple classes in the same file is confusing and best avoided.
Developers expect one class per file. Keep them happy.

在同一个文件中有多个类容易造成混淆，最好避免。
开发人员期望每个文件只放一个类。这会让他们开心点。

If you combine the `HeroService` class with
the `HeroesComponent` in the same file,
**define the component last**.
If you define the component before the service,
you'll get a runtime null reference error.

如果你要把 `HeroService` 和 `HeroesComponent` 组合在同一个文件里，
  **就得把组件定义放在最后面！**
  如果把组件定义在了服务的前面，
  在运行时它就会抛出空指针错误。

<div class="alert is-helpful">

You actually can define the component first with the help of the `forwardRef()` method as explained
in this [blog post](http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html).

在 `forwardRef()` 方法的帮助下，实际上也可以先定义组件，
具体说明见这篇[博客](http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html)。

But it's best to avoid the problem altogether by defining components and services in separate files.

但是为什么要先给自己找麻烦呢？
还是通过在独立的文件中定义组件和服务，完全避免此问题吧。

</div>
