# Dependency injection in Angular

# Angular 中的依赖注入

Dependency injection (DI), is an important application design pattern.
Angular has its own DI framework, which is typically
used in the design of Angular applications to increase their efficiency and modularity.

依赖注入（DI）是一种重要的应用设计模式。
Angular 有自己的 DI 框架，在设计应用时常会用到它，以提升它们的开发效率和模块化程度。

Dependencies are services or objects that a class needs to perform its function.
DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself.

依赖，是当类需要执行其功能时，所需要的服务或对象。
DI 是一种编码模式，其中的类会从外部源中请求获取依赖，而不是自己创建它们。

In Angular, the DI framework provides declared dependencies to a class when that class is instantiated. This guide explains how DI works in Angular, and how you use it to make your apps flexible, efficient, and robust, as well as testable and maintainable.

在 Angular 中，DI 框架会在实例化该类时向其提供这个类所声明的依赖项。本指南介绍了 DI 在 Angular 中的工作原理，以及如何借助它来让你的应用更灵活、高效、健壮，以及可测试、可维护。

<div class="alert is-helpful">

 You can run the <live-example></live-example> of the sample app that accompanies this guide.

 你可以运行本章这个范例应用的<live-example></live-example>。

</div>

Start by reviewing this simplified version of the _heroes_ feature
from the [The Tour of Heroes](tutorial/). This simple version doesn't use DI; we'll walk through converting it to do so.

我们先看一下[英雄指南](tutorial/)中*英雄管理*特性的简化版。这个简化版不使用 DI，我们将逐步把它转换成使用 DI 的。

<code-tabs>
  <code-pane header="src/app/heroes/heroes.component.ts" path="dependency-injection/src/app/heroes/heroes.component.1.ts" region="v1">
  </code-pane>

  <code-pane header="src/app/heroes/hero-list.component.ts" path="dependency-injection/src/app/heroes/hero-list.component.1.ts">
  </code-pane>

  <code-pane header="src/app/heroes/hero.ts" path="dependency-injection/src/app/heroes/hero.ts">
  </code-pane>

  <code-pane header="src/app/heroes/mock-heroes.ts" path="dependency-injection/src/app/heroes/mock-heroes.ts">
  </code-pane>

</code-tabs>

`HeroesComponent` is the top-level heroes component.
Its only purpose is to display `HeroListComponent`, which displays a list of hero names.

`HeroesComponent` 是顶层英雄管理组件。
它唯一的目的是显示 `HeroListComponent`，该组件会显示一个英雄名字的列表。

This version of the `HeroListComponent` gets heroes from the `HEROES` array, an in-memory collection
defined in a separate `mock-heroes` file.

`HeroListComponent` 的这个版本从 `HEROES` 数组（它在一个独立的 `mock-heroes` 文件中定义了一个内存集合）中获取英雄。

<code-example header="src/app/heroes/hero-list.component.ts (class)" path="dependency-injection/src/app/heroes/hero-list.component.1.ts" region="class">
</code-example>

This approach works for prototyping, but is not robust or maintainable.
As soon as you try to test this component or get heroes from a remote server,
you have to change the implementation of `HeroesListComponent` and
replace every use of the `HEROES` mock data.


这种方法在原型阶段有用，但是不够健壮、不利于维护。
一旦你想要测试该组件或想从远程服务器获得英雄列表，就不得不修改 `HeroesListComponent` 的实现，并且替换每一处使用了 `HEROES` 模拟数据的地方。

## Create and register an injectable service

## 创建和注册可注入的服务

The DI framework lets you supply data to a component from an injectable _service_ class, defined in its own file. To demonstrate, we'll create an injectable service class that provides a list of heroes, and register that class as a provider of that service.

DI 框架让你能从一个可注入的*服务*类（独立文件）中为组件提供数据。为了演示，我们还会创建一个用来提供英雄列表的、可注入的服务类，并把它注册为该服务的提供者。

<div class="alert is-helpful">

Having multiple classes in the same file can be confusing. We generally recommend that you define components and services in separate files.

在同一个文件中放多个类容易让人困惑。我们通常建议你在单独的文件中定义组件和服务。

If you do combine a component and service in the same file,
it is important to define the service first, and then the component. If you define the component before the service, you get a run-time null reference error.

如果你把组件和服务都放在同一个文件中，请务必先定义服务，然后再定义组件。如果在服务之前定义组件，则会在运行时收到一个空引用错误。

It is possible to define the component first with the help of the `forwardRef()` method as explained in this [blog post](http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html).

也可以借助 `forwardRef()` 方法来先定义组件，就像[这个博客](http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html)中解释的那样。

You can also use forward references to break circular dependencies.
See an example in the [DI Cookbook](guide/dependency-injection-in-action#forwardref).

你还可以使用前向引用来打破循环依赖，参见 [DI 一章](guide/dependency-injection-in-action#forwardref)中的例子。

</div>

### Create an injectable service class

### 创建可注入的服务类

The [Angular CLI](cli) can generate a new `HeroService` class in the `src/app/heroes` folder with this command.

[Angular CLI](cli) 可以用下列命令在 `src/app/heroes` 目录下生成一个新的 `HeroService` 类。

<code-example language="sh" class="code-shell">
ng generate service heroes/hero
</code-example>

The command creates the following `HeroService` skeleton.

下列命令会创建 `HeroService` 的骨架。

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" header="src/app/heroes/hero.service.ts (CLI-generated)">
</code-example>

The `@Injectable()` is an essential ingredient in every Angular service definition. The rest of the class has been written to expose a `getHeroes` method that returns the same mock data as before. (A real app would probably get its data asynchronously from a remote server, but we'll ignore that to focus on the mechanics of injecting the service.)

`@Injectable()` 是每个 Angular 服务定义中的基本要素。该类的其余部分导出了一个 `getHeroes` 方法，它会返回像以前一样的模拟数据。（真实的应用可能会从远程服务器中异步获取这些数据，不过这里我们先忽略它，专心实现服务的注入机制。）

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" header="src/app/heroes/hero.service.ts">
</code-example>


{@a injector-config}
{@a bootstrap}

### Configure an injector with a service provider

### 用服务提供者配置注入器

The class we have created provides a service. The `@Injectable()` decorator marks it as a service
that can be injected, but Angular can't actually inject it anywhere until you configure
an Angular [dependency injector](guide/glossary#injector) with a [provider](guide/glossary#provider) of that service.

我们创建的类提供了一个服务。`@Injectable()` 装饰器把它标记为可供注入的服务，不过在你使用该服务的 [provider](guide/glossary#provider) 提供者配置好 Angular 的[依赖注入器](guide/glossary#injector)之前，Angular 实际上无法将其注入到任何位置。

The injector is responsible for creating service instances and injecting them into classes like `HeroListComponent`.
You rarely create an Angular injector yourself. Angular creates injectors for you as it executes the app, starting with the _root injector_ that it creates during the [bootstrap process](guide/bootstrapping).

该注入器负责创建服务实例，并把它们注入到像 `HeroListComponent` 这样的类中。
你很少需要自己创建 Angular 的注入器。Angular 会在执行应用时为你创建注入器，第一个注入器是*根注入器*，创建于[启动过程](guide/bootstrapping)中。

A provider tells an injector _how to create the service_.
You must configure an injector with a provider before that injector can create a service (or provide any other kind of dependency).

提供者会告诉注入器*如何创建该服务*。
要想让注入器能够创建服务（或提供其它类型的依赖），你必须使用某个提供者配置好注入器。

A provider can be the service class itself, so that the injector can use `new` to create an instance.
You might also define more than one class to provide the same service in different ways,
and configure different injectors with different providers.

提供者可以是服务类本身，因此注入器可以使用 `new` 来创建实例。
你还可以定义多个类，以不同的方式提供同一个服务，并使用不同的提供者来配置不同的注入器。

<div class="alert is-helpful">

Injectors are inherited, which means that if a given injector can't resolve a dependency,
it asks the parent injector to resolve it.
A component can get services from its own injector,
from the injectors of its component ancestors,
from the injector of its parent NgModule, or from the `root` injector.

注入器是可继承的，这意味着如果指定的注入器无法解析某个依赖，它就会请求父注入器来解析它。
组件可以从它自己的注入器来获取服务、从其祖先组件的注入器中获取、从其父 NgModule 的注入器中获取，或从 `root` 注入器中获取。

* Learn more about the [different kinds of providers](guide/dependency-injection-providers).

  更多知识，参见 [提供者的不同类型](guide/dependency-injection-providers)。

* Learn more about how the [injector hierarchy](guide/hierarchical-dependency-injection) works.

  更多知识，参见[层次化注入器](guide/hierarchical-dependency-injection)的工作原理。

</div>

You can configure injectors with providers at different levels of your app, by setting a metadata value in one of three places:

你可以在三种位置之一设置元数据，以便在应用的不同层级使用提供者来配置注入器：

* In the `@Injectable()` decorator for the service itself.

  在服务本身的 `@Injectable()` 装饰器中。

* In the `@NgModule()` decorator for an NgModule.

  在 NgModule 的 `@NgModule()` 装饰器中。

* In the `@Component()` decorator for a component.

  在组件的 `@Component()` 装饰器中。

The `@Injectable()` decorator has the `providedIn` metadata option, where you can specify the provider of the decorated service class with the `root` injector, or with the injector for a specific NgModule.

`@Injectable()` 装饰器具有一个名叫 `providedIn` 的元数据选项，在那里你可以指定把被装饰类的提供者放到 `root` 注入器中，或某个特定 NgModule 的注入器中。

The `@NgModule()` and `@Component()` decorators have the `providers` metadata option, where you can configure providers for NgModule-level or component-level injectors.

`@NgModule()` 和 `@Component()` 装饰器都有用一个 `providers` 元数据选项，在那里你可以配置 NgModule 级或组件级的注入器。

<div class="alert is-helpful">

Components are directives, and the `providers` option is inherited from `@Directive()`. You can also configure providers for directives and pipes at the same level as the component.

所有组件都是指令，而 `providers` 选项是从 `@Directive()` 中继承来的。
你也可以与组件一样的级别为指令、管道配置提供者。

Learn more about [where to configure providers](guide/hierarchical-dependency-injection).

欲知详情，参见[该在哪里配置提供者](guide/hierarchical-dependency-injection)。

</div>

{@a injector-config}
{@a bootstrap}

## Injecting services

## 注入服务

In order for `HeroListComponent` to get heroes from `HeroService`, it needs to ask for `HeroService` to be injected, rather than creating its own `HeroService` instance with `new`.

`HeroListComponent` 要想从 `HeroService` 中获取英雄列表，就得要求注入 `HeroService`，而不是自己使用 `new` 来创建自己的 `HeroService` 实例。

You can tell Angular to inject a dependency in a component's constructor by specifying a **constructor parameter with the dependency type**. Here's the `HeroListComponent` constructor, asking for the `HeroService` to be injected.

你可以通过制定**带有依赖类型的构造函数参数**来要求 Angular 在组件的构造函数中注入依赖项。下面的代码是 `HeroListComponent` 的构造函数，它要求注入 `HeroService`。

<code-example header="src/app/heroes/hero-list.component (constructor signature)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>

Of course, `HeroListComponent` should do something with the injected `HeroService`.
Here's the revised component, making use of the injected service, side-by-side with the previous version for comparison.

当然，`HeroListComponent` 还应该使用注入的这个 `HeroService` 做一些事情。
这里是修改过的组件，它转而使用注入的服务。与前一版本并列显示，以便比较。

<code-tabs>
  <code-pane header="hero-list.component (with DI)" path="dependency-injection/src/app/heroes/hero-list.component.2.ts">
  </code-pane>

  <code-pane header="hero-list.component (without DI)" path="dependency-injection/src/app/heroes/hero-list.component.1.ts">
  </code-pane>
</code-tabs>

`HeroService` must be provided in some parent injector. The code in `HeroListComponent` doesn't depend on where `HeroService` comes from.
If you decided to provide `HeroService` in `AppModule`, `HeroListComponent` wouldn't change.

必须在某些父注入器中提供 `HeroService`。`HeroListComponent` 并不关心 `HeroService` 来自哪里。
如果你决定在 `AppModule` 中提供 `HeroService`，也不必修改 `HeroListComponent`。

{@a singleton-services}
{@a component-child-injectors}

### Injector hierarchy and service instances

### 注入器树与服务实例

Services are singletons _within the scope of an injector_. That is, there is at most one instance of a service in a given injector.

*在某个注入器*的范围内，服务是单例的。也就是说，在指定的注入器中最多只有某个服务的最多一个实例。

There is only one root injector for an app. Providing `UserService` at the `root` or `AppModule` level means it is registered with the root injector. There is just one `UserService` instance in the entire app and every class that injects `UserService` gets this service instance _unless_ you configure another provider with a _child injector_.

应用只有一个根注入器。在 `root` 或 `AppModule` 级提供 `UserService` 意味着它注册到了根注入器上。
在整个应用中只有一个 `UserService` 实例，每个要求注入 `UserService` 的类都会得到这一个服务实例，*除非*你在*子注入器*中配置了另一个提供者。

Angular DI has a [hierarchical injection system](guide/hierarchical-dependency-injection), which means that nested injectors can create their own service instances.
Angular regularly creates nested injectors. Whenever Angular creates a new instance of a component that has `providers` specified in `@Component()`, it also creates a new _child injector_ for that instance.
Similarly, when a new NgModule is lazy-loaded at run time, Angular can create an injector for it with its own providers.

Angular DI 具有[分层注入体系](guide/hierarchical-dependency-injection)，这意味着下级注入器也可以创建它们自己的服务实例。
Angular 会有规律的创建下级注入器。每当 Angular 创建一个在 `@Component()` 中指定了 `providers` 的组件实例时，它也会为该实例创建一个新的*子注入器*。
类似的，当在运行期间加载一个新的 NgModule 时，Angular 也可以为它创建一个拥有自己的提供者的注入器。

Child modules and component injectors are independent of each other, and create their own separate instances of the provided services. When Angular destroys an NgModule or component instance, it also destroys that injector and that injector's service instances.

子模块和组件注入器彼此独立，并且会为所提供的服务分别创建自己的实例。当 Angular 销毁 NgModule 或组件实例时，也会销毁这些注入器以及注入器中的那些服务实例。

Thanks to [injector inheritance](guide/hierarchical-dependency-injection),
you can still inject application-wide services into these components.
A component's injector is a child of its parent component's injector, and inherits from all ancestor injectors all the way back to the application's _root_ injector. Angular can inject a service provided by any injector in that lineage.

借助[注入器继承机制](guide/hierarchical-dependency-injection)，你仍然可以把全应用级的服务注入到这些组件中。
组件的注入器是其父组件注入器的子节点，它会继承所有的祖先注入器，其终点则是应用的*根*注入器。
Angular 可以注入该继承谱系中任何一个注入器提供的服务。

For example, Angular can inject `HeroListComponent` with both the `HeroService` provided in `HeroComponent` and the `UserService` provided in `AppModule`.

比如，Angular 既可以把 `HeroComponent` 中提供的 `HeroService`  注入到 `HeroListComponent`，也可以注入 `AppModule` 中提供的 `UserService`。

{@a testing-the-component}

## Testing components with dependencies

## 测试带有依赖的组件

Designing a class with dependency injection makes the class easier to test.
Listing dependencies as constructor parameters may be all you need to test application parts effectively.

基于依赖注入设计一个类，能让它更易于测试。
要想高效的测试应用的各个部分，你所要做的一切就是把这些依赖列到构造函数的参数表中而已。

For example, you can create a new `HeroListComponent` with a mock service that you can manipulate
under test.

比如，你可以使用一个可在测试期间操纵的模拟服务来创建新的 `HeroListComponent`。

<code-example path="dependency-injection/src/app/test.component.ts" region="spec" header="src/app/test.component.ts"></code-example>

<div class="alert is-helpful">

Learn more in the [Testing](guide/testing) guide.

欲知详情，参见[测试](guide/testing)一章。

</div>

{@a service-needs-service}

## Services that need other services

## 那些需要其它服务的服务

Services can have their own dependencies. `HeroService` is very simple and doesn't have any dependencies of its own. Suppose, however, that you want it to report its activities through a logging service. You can apply the same *constructor injection* pattern,
adding a constructor that takes a `Logger` parameter.

服务还可以具有自己的依赖。`HeroService` 非常简单，没有自己的依赖。不过，如果你希望通过日志服务来报告这些活动，那么就可以使用同样的*构造函数注入*模式，添加一个构造函数来接收一个 `Logger` 参数。

Here is the revised `HeroService` that injects `Logger`, side by side with the previous service for comparison.

这是修改后的 `HeroService`，它注入了 `Logger`，我们把它和前一个版本的服务放在一起进行对比。

<code-tabs>

  <code-pane header="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">
  </code-pane>

  <code-pane header="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">
  </code-pane>

  <code-pane header="src/app/logger.service"
  path="dependency-injection/src/app/logger.service.ts">
  </code-pane>

</code-tabs>

The constructor asks for an injected instance of `Logger` and stores it in a private field called `logger`. The `getHeroes()` method logs a message when asked to fetch heroes.

该构造函数请求注入一个 `Logger` 的实例，并把它保存在一个名叫 `logger` 的私有字段中。
当要求获取英雄列表时，`getHeroes()` 方法就会记录一条消息。

Notice that the `Logger` service also has the `@Injectable()` decorator, even though it might not need its own dependencies. In fact, the `@Injectable()` decorator is **required for all services**.

注意，虽然 `Logger` 服务没有自己的依赖项，但是它同样带有 `@Injectable()` 装饰器。实际上，`@Injectable()` **对所有服务都是必须的**。

When Angular creates a class whose constructor has parameters, it looks for type and injection metadata about those parameters so that it can inject the correct service.
If Angular can't find that parameter information, it throws an error.
Angular can only find the parameter information _if the class has a decorator of some kind_.
The `@Injectable()` decorator is the standard decorator for service classes.

当 Angular 创建一个构造函数中有参数的类时，它会查找有关这些参数的类型，和供注入使用的元数据，以便找到正确的服务。
如果 Angular 无法找到参数信息，它就会抛出一个错误。
*只有当类具有某种装饰器时*，Angular 才能找到参数信息。
`@Injectable()` 装饰器是所有服务类的标准装饰器。

<div class="alert is-helpful">

 The decorator requirement is imposed by TypeScript. TypeScript normally discards parameter type information when it [transpiles](guide/glossary#transpile) the code to JavaScript. TypeScript preserves this information if the class has a decorator and the `emitDecoratorMetadata` compiler option is set `true` in TypeScript's `tsconfig.json` configuration file. The CLI configures `tsconfig.json` with `emitDecoratorMetadata: true`.

 装饰器是 TypeScript 强制要求的。当 TypeScript 把代码[转译](guide/glossary#transpile)成 JavaScript 时，一般会丢弃参数的类型信息。只有当类具有装饰器，并且 `tsconfig.json` 中的编译器选项 `emitDecoratorMetadata` 为 `true` 时，TypeScript 才会保留这些信息。CLI 所配置的 `tsconfig.json` 就带有 `emitDecoratorMetadata: true`。
 
 This means you're responsible for putting `@Injectable()` on your service classes.

 这意味着你有责任给所有服务类加上 `@Injectable()`。

</div>

{@a token}

{@a injection-token}

### Dependency injection tokens

### 依赖注入令牌

When you configure an injector with a provider, you associate that provider with a [DI token](guide/glossary#di-token).
The injector maintains an internal *token-provider* map that it references when
asked for a dependency. The token is the key to the map.

当使用提供者配置注入器时，就会把提供者和一个 [DI 令牌](guide/glossary#di-token)关联起来。
注入器维护一个内部*令牌-提供者*的映射表，当请求一个依赖项时就会引用它。令牌就是这个映射表的键。

In simple examples, the dependency value is an *instance*, and
the class *type* serves as its own lookup key.
Here you get a `HeroService` directly from the injector by supplying the `HeroService` type as the token:

在简单的例子中，依赖项的值是一个*实例*，而类的*类型*则充当键来查阅它。
通过把 `HeroService` 类型作为令牌，你可以直接从注入器中获得一个 `HeroService` 实例。

<code-example path="dependency-injection/src/app/injector.component.ts" region="get-hero-service" header="src/app/injector.component.ts"></code-example>

The behavior is similar when you write a constructor that requires an injected class-based dependency.
When you define a constructor parameter with the `HeroService` class type,
Angular knows to inject the service associated with that `HeroService` class token:

当你编写的构造函数中需要注入基于类的依赖项时，其行为也类似。
当你使用 `HeroService` 类的类型来定义构造函数参数时，Angular 就会知道要注入与 `HeroService` 类这个令牌相关的服务。

<code-example path="dependency-injection/src/app/heroes/hero-list.component.ts" region="ctor-signature" header="src/app/heroes/hero-list.component.ts">
</code-example>

Many dependency values are provided by classes, but not all. The expanded *provide* object lets you associate different kinds of providers with a DI token.

很多依赖项的值都是通过类来提供的，但不是全部。扩展的 *provide* 对象让你可以把多种不同种类的提供者和 DI 令牌关联起来。

* Learn more about [different kinds of providers](guide/dependency-injection-providers).

  欲知详情，参见[不同种类的提供者](guide/dependency-injection-providers)。

{@a optional}

### Optional dependencies

### 可选依赖

`HeroService` *requires* a logger, but what if it could get by without
one?

`HeroService` *需要*一个记录器，但是如果找不到它会怎么样？

When a component or service declares a dependency, the class constructor takes that dependency as a parameter.
You can tell Angular that the dependency is optional by annotating the
constructor parameter with `@Optional()`.

当组件或服务声明某个依赖项时，该类的构造函数会以参数的形式接收那个依赖项。
通过给这个参数加上 `@Optional()` 注解，你可以告诉 Angular，该依赖是可选的。

<code-example path="dependency-injection/src/app/providers.component.ts" region="import-optional">
</code-example>

<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-10-ctor"></code-example>

When using `@Optional()`, your code must be prepared for a null value. If you
don't register a logger provider anywhere, the injector sets the
value of `logger` to null.

当使用 `@Optional()` 时，你的代码必须能正确处理 null 值。如果你没有在任何地方注册过 logger 提供者，那么注入器就会把 `logger` 的值设置为 null。

<div class="alert is-helpful">

`@Inject()` and `@Optional()` are _parameter decorators_. They alter the way the DI framework provides a dependency, by annotating the dependency parameter on the constructor of the class that requires the dependency.

`@Inject()` 和 `@Optional()` 都是*参数装饰器*。它们通过在需要依赖项的类的构造函数上对参数进行注解，来改变 DI 框架提供依赖项的方式。

Learn more about parameter decorators in [Hierarchical Dependency Injectors](guide/hierarchical-dependency-injection).

欲知详情，参见[多级注入器](guide/hierarchical-dependency-injection)。

</div>

## Summary

## 小结

You learned the basics of Angular dependency injection in this page.
You can register various kinds of providers,
and you know how to ask for an injected object (such as a service) by
adding a parameter to a constructor.

本页中你学到了 Angular 依赖注入的基础知识。
你可以注册多种提供者，并且知道了如何通过为构造函数添加参数来请求所注入的对象（比如服务）。

Dive deeper into the capabilities and advanced feature of the Angular DI system in the following pages:

在以下页面中可以深入了解 Angular DI 体系的能力及高级特性：

* Learn more about nested injectors in
[Hierarchical Dependency Injection](guide/hierarchical-dependency-injection).

  要深入了解嵌套注入器，参见[多级依赖注入](guide/hierarchical-dependency-injection)

* Learn more about [DI tokens and providers](guide/dependency-injection-providers).

  到 [DI 令牌与提供者](guide/dependency-injection-providers)中学习更多知识。

* [Dependency Injection in Action](guide/dependency-injection-in-action) is a cookbook for some of the interesting things you can do with DI.

  [依赖注入实战](guide/dependency-injection-in-action)中讲了一些你能用 DI 做的一些有意思的事。  
