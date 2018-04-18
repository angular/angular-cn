# Introduction to services and dependency injection

# 服务与依赖注入简介

<img src="generated/images/guide/architecture/service.png" alt="Service" class="left">

_Service_ is a broad category encompassing any value, function, or feature that an app needs. A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.

*服务*是一个广义的概念，它包括应用所需的任何值、函数或特性。狭义的服务是一个明确定义了用途的类。它应该做一些具体的事，并做好。

<br class="clear">

Angular distinguishes components from services in order to increase modularity and reusability.

Angular 把组件和服务区分开，以提高模块性和复用性。

* By separating a component's view-related functionality from other kinds of processing, you can make your component classes lean and efficient. Ideally, a component's job is to enable the user experience and nothing more.  It should present properties and methods for data binding, in order to mediate between the view (rendered by the template) and the application logic (which often includes some notion of a _model_).

  通过把组件中和视图有关的功能与其他类型的处理分离开，你可以让组件类更加精简、高效。
  理想情况下，组件的工作只管用户体验，而不用顾及其它。
  它应该提供用于数据绑定的属性和方法，以便作为视图（由模板渲染）和应用逻辑（通常包含一些模型的概念）的中介者。

* A component should not need to define things like how to fetch data from the server, validate user input, or log directly to the console. Instead, it can delegate such tasks to services. By defining that kind of processing task in an injectable service class, you make it available to any component. You can also make your app more adaptable by injecting different providers of the same kind of service, as appropriate in different circumstances.

  组件不应该定义任何诸如从服务器获取数据、验证用户输入或直接往控制台中写日志等工作。
  而要把这些任务委托给各种服务。通过把各种处理任务定义到可注入的服务类中，你可以让它可以被任何组件使用。
  通过在不同的环境中注入同一种服务的不同提供商，你还可以让你的应用更具适应性。

Angular doesn't *enforce* these principles. Angular does help you *follow* these principles by making it easy to factor your
application logic into services and make those services available to components through *dependency injection*.

Angular 不会*强制*遵循这些原则。它只会通过*依赖注入*让你能更容易地将应用逻辑分解为服务，并让这些服务可用于各个组件中。

## Service examples

## 服务范例

Here's an example of a service class that logs to the browser console:

下面是一个服务类的范例，用于把日志记录到浏览器的控制台：

<code-example path="architecture/src/app/logger.service.ts" linenums="false" title="src/app/logger.service.ts (class)" region="class"></code-example>

Services can depend on other services. For example, here's a `HeroService` that depends on the `Logger` service, and also uses `BackendService` to get heroes. That service in turn might depend on the `HttpClient` service to fetch heroes asynchronously from a server.

服务也可以依赖其它服务。比如，这里的 `HeroService` 就依赖于 `Logger` 服务，它还用 `BackendService` 来获取英雄数据。`BackendService` 还可能再转而依赖 `HttpClient` 服务来从服务器异步获取英雄列表。

<code-example path="architecture/src/app/hero.service.ts" linenums="false" title="src/app/hero.service.ts (class)" region="class"></code-example>

<hr/>

## Dependency injection

## 依赖注入（dependency injection）

<img src="generated/images/guide/architecture/dependency-injection.png" alt="Service" class="left">

Components consume services; that is, you can *inject* a service into a component, giving the component access to that service class. 

组件是服务的消费者，也就是说，你可以把一个服务*注入*到组件中，让组件类得以访问该服务类。

To define a class as a service in Angular, use the `@Injectable` decorator to provide the metadata that allows Angular to inject it into a component as a *dependency*.  

在 Angular 中，要把一个类定义为服务，就要用 `@Injectable` 装饰器来提供元数据，以便让 Angular 可以把它作为*依赖*注入到组件中。

Similarly, use the `@Injectable` decorator to indicate that a component or other class (such as another service, a pipe, or an NgModule) _has_ a dependency. A dependency doesn't have to be a service&mdash;it could be a function, for example, or a value. 

同样，也要使用 `@Injectable` 装饰器来表明一个组件或其它类（比如另一个服务、管道或 NgModule）*拥有*一个依赖。
依赖并不必然是服务，它也可能是函数或值等等。

*Dependency injection* (often called DI) is wired into the Angular framework and used everywhere to provide new components with the services or other things they need.

*依赖注入*（通常简称 DI）被引入到 Angular 框架中，并且到处使用它，来为新建的组件提供所需的服务或其它东西。

* The *injector* is the main mechanism. You don't have to create an Angular injector. Angular creates an application-wide injector for you during the bootstrap process.

  *注入器*是主要的机制。你不用自己创建 Angular 注入器。Angular 会在启动过程中为你创建全应用级注入器。

* The injector maintains a *container* of dependency instances that it has already created, and reuses them if possible.

  该注入器维护一个包含它已创建的依赖实例的*容器*，并尽可能复用它们。

* A *provider* is a recipe for creating a dependency. For a service, this is typically the service class itself. For any dependency you need in your app, you must register a provider with the app's injector, so that the injector can use it to create new instances.

  *提供商*是一个创建依赖的菜谱。对于服务来说，它通常就是这个服务类本身。你在应用中要用到的任何类都必须使用该应用的注入器注册一个提供商，以便注入器可以使用它来创建新实例。

When Angular creates a new instance of a component class, it determines which services or other dependencies that component needs by looking at the types of its constructor parameters. For example, the constructor of `HeroListComponent` needs a `HeroService`:

当 Angular 创建组件类的新实例时，它会通过查看该组件类的构造函数，来决定该组件依赖哪些服务或其它依赖项。
比如 `HeroListComponent` 的构造函数中需要 `HeroService`：

<code-example path="architecture/src/app/hero-list.component.ts" linenums="false" title="src/app/hero-list.component.ts (constructor)" region="ctor"></code-example>

When Angular discovers that a component depends on a service, it first checks if the injector already has any existing instances of that service. If a requested service instance does not yet exist, the injector makes one using the registered provider, and adds it to the injector before returning the service to Angular.

当 Angular 发现某个组件依赖某个服务时，它会首先检查是否该注入器中已经有了那个服务的任何现有实例。如果所请求的服务尚不存在，注入器就会使用以前注册的服务提供商来制作一个，并把它加入注入器中，然后把该服务返回给 Angular。

When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments.

当所有请求的服务已解析并返回时，Angular 可以用这些服务实例为参数，调用该组件的构造函数。

The process of `HeroService` injection looks something like this:

`HeroService` 的注入过程如下所示：

<figure>
  <img src="generated/images/guide/architecture/injector-injects.png" alt="Service" class="left">
</figure>

### Providing services

### 提供服务

You must register at least one *provider* of any service you are going to use. You can register providers in modules or in components.

对于要用到的任何服务，你必须至少注册一个*提供商*。你可以在模块中或者组件中注册这些提供商。

* When you add providers to the [root module](guide/architecture-modules), the same instance of a service is available to all components in your app.

  当你往[根模块](guide/architecture-modules)中添加服务提供商时，服务的同一个实例会服务于你应用中的所有组件。

<code-example path="architecture/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts (module providers)" region="providers"></code-example>

* When you register a provider at the component level, you get a new instance of the
service with each new instance of that component. At the component level, register a service provider in the `providers` property of the `@Component` metadata:

  当你在组件级注册提供商时，你会为该组件的每一个新实例提供该服务的一个新实例。
  要在组件级注册，就要在 `@Component` 元数据的 `providers` 属性中注册服务提供商。

<code-example path="architecture/src/app/hero-list.component.ts" linenums="false" title="src/app/hero-list.component.ts (component providers)" region="providers"></code-example>

For more detailed information, see the [Dependency Injection](guide/dependency-injection) section.

要了解更多细节，请参见[依赖注入](guide/dependency-injection)一节。

<hr/>
