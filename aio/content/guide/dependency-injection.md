# Dependency injection in Angular

# Angular 中的依赖注入

Dependencies are services or objects that a class needs to perform its function.
Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them.

依赖项是指某个类执行其功能所需的服务或对象。依赖项注入（DI）是一种设计模式，在这种设计模式中，类会从外部源请求依赖项而不是创建它们。

Angular's DI framework provides dependencies to a class upon instantiation.
You can use Angular DI to increase flexibility and modularity in your applications.

Angular 的 DI 框架会在实例化某个类时为其提供依赖。你可以使用 Angular DI 来提高应用程序的灵活性和模块化程度。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中代码片段的可工作示例，请参见<live-example></live-example>。

</div>

## Creating an injectable service

## 创建可注入服务

To generate a new `HeroService` class in the `src/app/heroes` folder use the following [Angular CLI](cli) command.

要想在 `src/app/heroes` 目录下生成一个新的 `HeroService` 类，请使用下列 [Angular CLI](cli) 命令。

<code-example language="sh">
ng generate service heroes/hero
</code-example>

This command creates the following default `HeroService`.

下列命令会创建默认的 `HeroService`。

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts" header="src/app/heroes/hero.service.ts (CLI-generated)">
</code-example>

The `@Injectable()` decorator specifies that Angular can use this class in the DI system.
The metadata, `providedIn: 'root'`, means that the `HeroService` is visible throughout the application.

`@Injectable()` 装饰器会指定 Angular 可以在 DI 体系中使用此类。元数据 `providedIn: 'root'` 表示 `HeroService` 在整个应用程序中都是可见的。

Next, to get the hero mock data, add a `getHeroes()` method that returns the heroes from `mock.heroes.ts`.

接下来，要获取英雄的模拟数据，请添加一个 `getHeroes()` 方法，该方法会从 `mock.heroes.ts` 中返回英雄。

<code-example path="dependency-injection/src/app/heroes/hero.service.3.ts" header="src/app/heroes/hero.service.ts">
</code-example>

For clarity and maintainability, it is recommended that you define components and services in separate files.

为了清晰和可维护性，建议你在单独的文件中定义组件和服务。

If you do combine a component and service in the same file, it is important to define the service first, and then the component.
If you define the component before the service, Angular returns a run-time null reference error.

如果你确实要将组件和服务合并在同一个文件中，则必须先定义服务，再定义组件，这一点很重要。如果在服务之前定义组件，Angular 将返回运行时的空引用错误。

{@a injector-config}
{@a bootstrap}

## Injecting services

## 注入服务

Injecting services results in making them visible to a component.

注入某些服务会使它们对组件可见。

To inject a dependency in a component's `constructor()`, supply a constructor argument with the dependency type.
The following example specifies the `HeroService` in the `HeroListComponent` constructor.
The type of `heroService` is `HeroService`.

要将依赖项注入组件的 `constructor()` 中，请提供具有此依赖项类型的构造函数参数。下面的示例在 `HeroListComponent` 的构造函数中指定了 `HeroService`。`heroService` 的类型是 `HeroService`。

<code-example header="src/app/heroes/hero-list.component (constructor signature)" path="dependency-injection/src/app/heroes/hero-list.component.ts"
region="ctor-signature">
</code-example>

For more information, see [Providing dependencies in modules](guide/providers) and [Hierarchical injectors](guide/hierarchical-dependency-injection).

有关更多信息，请参阅[在模块中提供依赖](guide/providers)和[分层注入器](guide/hierarchical-dependency-injection)。

{@a service-needs-service}

## Using services in other services

## 在其他服务中使用这些服务

When a service depends on another service, follow the same pattern as injecting into a component.
In the following example `HeroService` depends on a `Logger` service to report its activities.

当某个服务依赖于另一个服务时，请遵循与注入组件相同的模式。在这里，`HeroService` 要依靠 `Logger` 服务来报告其活动。

First, import the `Logger` service.
Next, inject the `Logger` service in the `HeroService` `constructor()` by specifying `private logger: Logger` within the parentheses.

首先，导入 `Logger` 服务。接下来，通过在括号中指定 `private logger: Logger`，来在 `HeroService` 的 `constructor()` 中注入 `Logger` 服务。

When you create a class whose `constructor()` has parameters, specify the type and metadata about those parameters so that Angular can inject the correct service.

当创建一个其 `constructor()` 带有参数的类时，请指定其类型和关于这些参数的元数据，以便 Angular 可以注入正确的服务。

Here, the `constructor()` specifies a type of `Logger` and stores the instance of `Logger` in a private field called `logger`.

在这里，`constructor()` 指定了 `Logger` 的类型，并把 `Logger` 的实例存储在名叫 `logger` 的私有字段中。

The following code tabs feature the `Logger` service and two versions of `HeroService`.
The first version of `HeroService` does not depend on the `Logger` service.
The revised second version does depend on `Logger` service.

下列代码具有 `Logger` 服务和两个版本的 `HeroService`。`HeroService` 的第一个版本不依赖于 `Logger` 服务。修改后的第二个版本依赖于 `Logger` 服务。

<code-tabs>

  <code-pane header="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">
  </code-pane>

  <code-pane header="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">
  </code-pane>

  <code-pane header="src/app/logger.service"
  path="dependency-injection/src/app/logger.service.ts">
  </code-pane>

</code-tabs>

In this example, the `getHeroes()` method uses the `Logger` service by logging a message when fetching heroes.

在这个例子中，`getHeroes()` 方法通过在获取英雄时通过 `Logger` 来记录一条消息。

## What's next

## 下一步是什么？

* [Dependency providers](guide/dependency-injection-providers)

  [依赖提供者](guide/dependency-injection-providers)

* [DI tokens and providers](guide/dependency-injection-providers)

  [DI 令牌和提供者](guide/dependency-injection-providers)

* [Dependency Injection in Action](guide/dependency-injection-in-action)

  [依赖注入实战](guide/dependency-injection-in-action) 
