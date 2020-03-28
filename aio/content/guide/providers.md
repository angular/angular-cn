# Providers

# 服务提供商

A provider is an instruction to the [Dependency Injection](/guide/dependency-injection) system on how to obtain a value for a dependency. Most of the time, these dependencies are services that you create and provide.

提供商就是一本说明书，用来指导[依赖注入](/guide/dependency-injection)系统该如何获取某个依赖的值。
大多数情况下，这些依赖就是你要创建和提供的那些服务。

For the final sample app using the provider that this page describes,
see the <live-example></live-example>.

要想查看本页提到的这个带有特性模块的范例应用，参见 <live-example></live-example>。

## Providing a service

## 提供服务

If you already have an app that was created with the [Angular CLI](cli), you can create a service using the [`ng generate`](cli/generate) CLI command in the root project directory. Replace _User_ with the name of your service.

如果你是用 [Angular CLI](cli) 创建的应用，那么可以使用下列 CLI 的 [`ng generate`](cli/generate) 命令在项目根目录下创建一个服务。把其中的 `User` 替换成你的服务名。

```sh

ng generate service User

```

This command creates the following `UserService` skeleton:

该命令会创建下列 `UserService` 骨架：

<code-example path="providers/src/app/user.service.0.ts"  header="src/app/user.service.ts"></code-example>

You can now inject `UserService` anywhere in your application.

现在，你就可以在应用中到处注入 `UserService` 了。

The service itself is a class that the CLI generated and that's decorated with `@Injectable()`. By default, this decorator has a `providedIn` property, which creates a provider for the service. In this case, `providedIn: 'root'` specifies that Angular should provide the service in the root injector.

该服务本身是 CLI 创建的一个类，并且加上了 `@Injectable()` 装饰器。默认情况下，该装饰器是用 `providedIn` 属性进行配置的，它会为该服务创建一个提供商。在这个例子中，`providedIn: 'root'` 指定 Angular 应该在根注入器中提供该服务。

## Provider scope

## 提供商的作用域

When you add a service provider to the root application injector, it’s available throughout the app. Additionally, these providers are also available to all the classes in the app as long they have the lookup token.

当你把服务提供商添加到应用的根注入器中时，它就在整个应用程序中可用了。
另外，这些服务提供商也同样对整个应用中的类是可用的 —— 只要它们有供查找用的服务令牌。

You should always provide your service in the root injector unless there is a case where you want the service to be available only if the consumer imports a particular `@NgModule`.

你应该始终在根注入器中提供这些服务 —— 除非你希望该服务只有在消费方要导入特定的 `@NgModule` 时才生效。

## `providedIn` and NgModules

## `providedIn` 与 NgModule

It's also possible to specify that a service should be provided in a particular `@NgModule`. For example, if you don't want `UserService` to be available to applications unless they import a `UserModule` you've created, you can specify that the service should be provided in the module:

也可以规定某个服务只有在特定的 `@NgModule` 中提供。比如，如果你希望只有当消费方导入了你创建的 `UserModule` 时才让 `UserService` 在应用中生效，那就可以指定该服务要在该模块中提供：

<code-example path="providers/src/app/user.service.1.ts"  header="src/app/user.service.ts"></code-example>

The example above shows the preferred way to provide a service in a module. This method is preferred because it enables tree-shaking of the service if nothing injects it. If it's not possible to specify in the service which module should provide it, you can also declare a provider for the service within the module:

上面的例子展示的就是在模块中提供服务的首选方式。之所以推荐该方式，是因为当没有人注入它时，该服务就可以被摇树优化掉。如果没办法指定哪个模块该提供这个服务，你也可以在那个模块中为该服务声明一个提供商：

<code-example path="providers/src/app/user.module.ts"  header="src/app/user.module.ts"></code-example>

## Limiting provider scope by lazy loading modules

## 使用惰性加载模块限制提供商的作用域

In the basic CLI-generated app, modules are eagerly loaded which means that they are all loaded when the app launches. Angular uses an injector system to make things available between modules. In an eagerly loaded app, the root application injector makes all of the providers in all of the modules available throughout the app.

在 CLI 生成的基本应用中，模块是急性加载的，这意味着它们都是由本应用启动的，Angular 会使用一个依赖注入体系来让一切服务都在模块间有效。对于急性加载式应用，应用中的根注入器会让所有服务提供商都对整个应用有效。

This behavior necessarily changes when you use lazy loading. Lazy loading is when you load modules only when you need them; for example, when routing. They aren’t loaded right away like with eagerly loaded modules. This means that any services listed in their provider arrays aren’t available because the root injector doesn’t know about these modules.

当使用惰性加载时，这种行为需要进行改变。惰性加载就是只有当需要时才加载模块，比如路由中。它们没办法像急性加载模块那样进行加载。这意味着，在它们的 `providers` 数组中列出的服务都是不可用的，因为根注入器并不知道这些模块。

<!-- KW--Make diagram here -->

<!-- KW--per Misko: not clear if the lazy modules are siblings or grand-children. They are both depending on router structure. -->

When the Angular router lazy-loads a module, it creates a new injector. This injector is a child of the root application injector. Imagine a tree of injectors; there is a single root injector and then a child injector for each lazy loaded module. The router adds all of the providers from the root injector to the child injector. When the router creates a component within the lazy-loaded context, Angular prefers service instances created from these providers to the service instances of the application root injector.

当 Angular 的路由器惰性加载一个模块时，它会创建一个新的注入器。这个注入器是应用的根注入器的一个子注入器。想象一棵注入器树，它有唯一的根注入器，而每一个惰性加载模块都有一个自己的子注入器。路由器会把根注入器中的所有提供商添加到子注入器中。如果路由器在惰性加载时创建组件， Angular 会更倾向于使用从这些提供商中创建的服务实例，而不是来自应用的根注入器的服务实例。

Any component created within a lazy loaded module’s context, such as by router navigation, gets the local instance of the service, not the instance in the root application injector. Components in external modules continue to receive the instance created for the application root.

任何在惰性加载模块的上下文中创建的组件（比如路由导航），都会获取该服务的局部实例，而不是应用的根注入器中的实例。而外部模块中的组件，仍然会收到来自于应用的根注入器创建的实例。

Though you can provide services by lazy loading modules, not all services can be lazy loaded. For instance, some modules only work in the root module, such as the Router. The Router works with the global location object in the browser.

虽然你可以使用惰性加载模块来提供实例，但不是所有的服务都能惰性加载。比如，像路由之类的模块只能在根模块中使用。路由器需要使用浏览器中的全局对象 `location` 进行工作。

## Limiting provider scope with components

## 使用组件限定服务提供商的作用域

Another way to limit provider scope is by adding the service you want to limit to the component’s
`providers` array. Component providers and NgModule providers are independent of each other. This
method is helpful when you want to eagerly load a module that needs a service all to itself.
Providing a service in the component limits the service only to that component (other components in
the same module can’t access it).

另一种限定提供商作用域的方式是把要限定的服务添加到组件的 `providers` 数组中。组件中的提供商和 NgModule 中的提供商是彼此独立的。
当你要急性加载一个自带了全部所需服务的模块时，这种方式是有帮助的。
在组件中提供服务，会限定该服务只能在该组件中有效（同一模块中的其它组件不能访问它）。

<code-example path="providers/src/app/app.component.ts" region="component-providers" header="src/app/app.component.ts"></code-example>

## Providing services in modules vs. components

## 在模块中提供服务还是在组件中？

Generally, provide services the whole app needs in the root module and scope services by providing them in lazy loaded modules.

通常，要在根模块中提供整个应用都需要的服务，在惰性加载模块中提供限定范围的服务。

The router works at the root level so if you put providers in a component, even `AppComponent`, lazy loaded modules, which rely on the router, can’t see them.

路由器工作在根级，所以如果你把服务提供商放进组件（即使是 `AppComponent`）中，那些依赖于路由器的惰性加载模块，将无法看到它们。

<!-- KW--Make a diagram here -->

Register a provider with a component when you must limit a service instance to a component and its component tree, that is, its child components. For example, a user editing component, `UserEditorComponent`, that needs a private copy of a caching `UserService` should register the `UserService` with the `UserEditorComponent`. Then each new instance of the `UserEditorComponent` gets its own cached service instance.

当你必须把一个服务实例的作用域限定到组件及其组件树中时，可以使用组件注册一个服务提供商。
比如，用户编辑组件 `UserEditorComponent`，它需要一个缓存 `UserService` 实例，那就应该把 `UserService` 注册进 `UserEditorComponent` 中。
然后，每个 `UserEditorComponent` 的实例都会获取它自己的缓存服务实例。

<hr>

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in:

你还可能对下列内容感兴趣：

* [Singleton Services](guide/singleton-services), which elaborates on the concepts covered on this page.

   [单例服务](guide/singleton-services)详细解释了本页包含的那些概念。

* [Lazy Loading Modules](guide/lazy-loading-ngmodules).

   [惰性加载模块](guide/lazy-loading-ngmodules)。

* [Tree-shakable Providers](guide/dependency-injection-providers#tree-shakable-providers).

   [可摇树优化的服务提供商](guide/dependency-injection-providers#tree-shakable-providers)。

* [NgModule FAQ](guide/ngmodule-faq).

   [NgModule 常见问题](guide/ngmodule-faq)。
