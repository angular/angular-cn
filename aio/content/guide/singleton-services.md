# Singleton services

# 单例应用

#### Prerequisites:

#### 前提条件：

* A basic understanding of [Bootstrapping](guide/bootstrapping).

   对[引导](guide/bootstrapping)有基本的了解。

* Familiarity with [Providers](guide/providers).

   熟悉[服务提供商](guide/providers)。

For a sample app using the app-wide singleton service that this page describes, see the
<live-example name="ngmodules"></live-example> showcasing all the documented features of NgModules.

本页中描述的这种全应用级单例服务的例子位于<live-example name="ngmodules"></live-example>，它示范了 NgModule 的所有已文档化的特性。

<hr />

## Providing a singleton service

## 提供单例服务

There are two ways to make a service a singleton in Angular:

在 Angular 中有两种方式来生成单例服务：

* Declare that the service should be provided in the application root.

  声明该服务应该在应用的根上提供。

* Include the service in the `AppModule` or in a module that is only imported by the `AppModule`.

  把该服务包含在 `AppModule` 或某个只会被 `AppModule` 导入的模块中。

Beginning with Angular 6.0, the preferred way to create a singleton services is to specify on the service that it should be provided in the application root. This is done by setting `providedIn` to `root` on the service's `@Injectable` decorator:

从 Angular 6.0 开始，创建单例服务的首选方式是在那个服务类上指定它应该在应用的根上提供。只要在该服务的 `@Injectable` 装饰器上把 `providedIn` 设置为 `root` 就可以了：

<code-example path="providers/src/app/user.service.0.ts"  title="src/app/user.service.0.ts" linenums="false"> </code-example>

For more detailed information on services, see the [Services](tutorial/toh-pt4) chapter of the
[Tour of Heroes tutorial](tutorial).

要想深入了解关于服务的信息，参见[《英雄指南》教程](tutorial)中的[服务](tutorial/toh-pt4)一章。

## `forRoot()`

If a module provides both providers and declarations (components, directives, pipes) then loading it in a child injector such as a route, would duplicate the provider instances. The duplication of providers would cause issues as they would shadow the root instances, which are probably meant to be singletons. For this reason Angular provides a way to separate providers out of the module so that same module can be imported into the root module with `providers` and child modules without `providers`.

如果某个模块同时提供了服务提供商和可声明对象（组件、指令、管道），那么当在某个子注入器中加载它的时候（比如路由），就会生成多个该服务提供商的实例。
而存在多个实例会导致一些问题，因为这些实例会屏蔽掉根注入器中该服务提供商的实例，而它的本意可能是作为单例对象使用的。
因此，Angular 提供了一种方式来把服务提供商从该模块中分离出来，以便该模块既可以带着 `providers` 被根模块导入，也可以不带 `providers` 被子模块导入。

1. Create a static method `forRoot()` (by convention) on the module.

   在该模块上创建一个静态方法 `forRoot()`（习惯名称）。

2. Place the providers into the `forRoot` method as follows.

   把那些服务提供商放进 `forRoot` 方法中，参见下面的例子。

<!-- MH: show a simple example how to do that without going to deep into it. -->

To make this more concrete, consider the `RouterModule` as an example. `RouterModule` needs to provide the `Router` service, as well as the `RouterOutlet` directive. `RouterModule` has to be imported by the root application module so that the application has a `Router` and the application has at least one `RouterOutlet`. It also must be imported by the individual route components so that they can place `RouterOutlet` directives into their template for sub-routes.

以 `RouterModule` 为例具体说说。`RouterModule` 要提供 `Router` 服务，还要提供 `RouterOutlet` 指令。
`RouterModule` 要由根应用模块导入，以便该应用拥有一个路由器，而且它还需要至少一个 `RouterOutlet`。
`RouterModule` 还必须由各个独立的路由组件导入，让它们能在自己的模板中使用 `RouterOutlet` 指令来支持其子路由。

If the `RouterModule` didn’t have `forRoot()` then each route component would instantiate a new `Router` instance, which would break the application as there can only be one `Router`. For this reason, the `RouterModule` has the `RouterOutlet` declaration so that it is available everywhere, but the `Router` provider is only in the `forRoot()`. The result is that the root application module imports `RouterModule.forRoot(...)` and gets a `Router`, whereas all route components import `RouterModule` which does not include the `Router`.

如果 `RouterModule` 没有 `forRoot()`，那么每个路由组件都会创建一个新的 `Router` 实例。这将会破坏整个应用，因为应用中只能有一个 `Router`。
`RouterModule` 拥有 `RouterOutlet` 指令，它应该随处可用，但是 `Router` 只能有一个，它应该在 `forRoot()` 中提供。
最终的结果就是，应用的根模块导入了 `RouterModule.forRoot(...)` 以获取 `Router`，而所有路由组件都导入了 `RouterModule`，它不包括这个 `Router` 服务。

If you have a module which provides both providers and declarations, use this pattern to separate them out.

如果你有一个同时提供服务提供商和可声明对象的模块，请使用下面的模式把它们分离开。

A module that adds providers to the application can offer a
facility for configuring those providers as well through the
`forRoot()` method.

那些需要把服务提供商加到应用中的模块可以通过某种类似 `forRoot()` 方法的方式配置那些服务提供商。

`forRoot()` takes a service configuration object and returns a
[ModuleWithProviders](api/core/ModuleWithProviders), which is
a simple object with the following properties:

`forRoot()` 接收一个服务配置对象，然后返回一个 [ModuleWithProviders](api/core/ModuleWithProviders) ，它是一个带有下列属性的简单对象：

* `ngModule`: in this example, the `CoreModule` class.

   `ngModule`： 在这个例子中就是 `CoreModule` 类

* `providers`: the configured providers.

   `providers` - 配置好的服务提供商

In the <live-example name="ngmodules">live example</live-example>
the root `AppModule` imports the `CoreModule` and adds the
`providers` to the `AppModule` providers. Specifically,
Angular accumulates all imported providers
before appending the items listed in `@NgModule.providers`.
This sequence ensures that whatever you add explicitly to
the `AppModule` providers takes precedence over the providers
of imported modules.

在这个<live-example name="ngmodules"></live-example>中，根 `AppModule` 导入了 `CoreModule`，并把它的 `providers` 添加到了 `AppModule` 的服务提供商中。
特别是，Angular 会在 `@NgModule.providers` 前面添加这些导入的服务提供商。
这种顺序保证了 `AppModule` 中的服务提供商总是会优先于那些从其它模块中导入的服务提供商。

Import `CoreModule` and use its `forRoot()` method one time, in `AppModule`, because it registers services and you only want to register those services one time in your app. If you were to register them more than once, you could end up with multiple instances of the service and a runtime error.

应该只在 `AppModule` 中导入 `CoreModule` 并只使用一次 `forRoot()` 方法，因为该方法中会注册服务，而你希望那些服务在该应用中只注册一次。
如果你多次注册它们，就可能会得到该服务的多个实例，并导致运行时错误。

You can also add a `forRoot()` method in the `CoreModule` that configures
the core `UserService`.

你还可以在 `CoreModule` 中添加一个用于配置 `UserService` 的 `forRoot()` 方法。

In the following example, the optional, injected `UserServiceConfig`
extends the core `UserService`. If a `UserServiceConfig` exists, the `UserService` sets the user name from that config.

在下面的例子中，可选的注入 `UserServiceConfig` 扩展了 `Core` 模块中的 `UserService`。如果 `UserServiceConfig` 存在，就从这个配置中设置用户名。

<code-example path="ngmodules/src/app/core/user.service.ts" region="ctor" title="src/app/core/user.service.ts (constructor)" linenums="false">

</code-example>

Here's `forRoot()` that takes a `UserServiceConfig` object:

下面是一个接受 `UserServiceConfig` 参数的 `forRoot()` 方法：

<code-example path="ngmodules/src/app/core/core.module.ts" region="for-root" title="src/app/core/core.module.ts (forRoot)" linenums="false">

</code-example>

Lastly, call it within the `imports` list of the `AppModule`.

最后，在 `AppModule` 的 `imports`*列表*中调用它。

<code-example path="ngmodules/src/app/app.module.ts" region="import-for-root" title="src/app/app.module.ts (imports)" linenums="false">

</code-example>

The app displays "Miss Marple" as the user instead of the default "Sherlock Holmes".

该应用不再显示默认的 “Sherlock Holmes”，而是用 “Miss Marple” 作为用户名称。

Remember to _import_ `CoreModule` as a Javascript import at the top of the file; don't add it to more than one `@NgModule` `imports` list.

记住，在文件顶部使用 JavaScript 的 `import` 语句*导入* `CoreModule`，但不要在多于一个 `@NgModule` 的 `imports` 列表中添加它。

<!-- KW--Does this mean that if we need it elsewhere we only import it at the top? I thought the services would all be available since we were importing it into `AppModule` in `providers`. -->

## Prevent reimport of the `CoreModule`

## 防止重复导入 `CoreModule`

Only the root `AppModule` should import the `CoreModule`. If a
lazy-loaded module imports it too, the app can generate
[multiple instances](guide/ngmodule-faq#q-why-bad) of a service.

只有根模块 `AppModule` 才能导入 `CoreModule`。如果一个惰性加载模块也导入了它，
该应用就会为服务生成[多个实例](guide/ngmodule-faq#q-why-bad)。

To guard against a lazy-loaded module re-importing `CoreModule`, add the following `CoreModule` constructor.

要想防止惰性加载模块重复导入 `CoreModule`，可以添加如下的 `CoreModule` 构造函数。

<code-example path="ngmodules/src/app/core/core.module.ts" region="ctor" title="src/app/core/core.module.ts" linenums="false">

</code-example>

The constructor tells Angular to inject the `CoreModule` into itself.
The injection would be circular if Angular looked for
`CoreModule` in the _current_ injector. The `@SkipSelf`
decorator means "look for `CoreModule` in an ancestor
injector, above me in the injector hierarchy."

这个构造函数要求 Angular 把 `CoreModule` 注入到它自己。
如果 Angular 在*当前*注入器中查找 `CoreModule`，这个注入过程就会陷入死循环。
而 `@SkipSelf` 装饰器表示 “在注入器树中那些高于我的祖先注入器中查找 `CoreModule`”。

If the constructor executes as intended in the `AppModule`,
there would be no ancestor injector that could provide an instance of `CoreModule` and the injector should give up.

如果构造函数在 `AppModule` 中执行，那就没有祖先注入器能提供 `CoreModule` 的实例，于是注入器就会放弃查找。

By default, the injector throws an error when it can't
find a requested provider.
The `@Optional` decorator means not finding the service is OK.
The injector returns `null`, the `parentModule` parameter is null,
and the constructor concludes uneventfully.

默认情况下，当注入器找不到想找的提供商时，会抛出一个错误。
但 `@Optional` 装饰器表示找不到该服务也无所谓。
于是注入器会返回 `null`，`parentModule` 参数也就被赋成了空值，而构造函数没有任何异常。

It's a different story if you improperly import `CoreModule` into a lazy-loaded module such as `CustomersModule`.

但如果你把 `CoreModule` 导入到像 `CustomerModule` 这样的惰性加载模块中，事情就不一样了。

Angular creates a lazy-loaded module with its own injector,
a _child_ of the root injector.
`@SkipSelf` causes Angular to look for a `CoreModule` in the parent injector, which this time is the root injector.
Of course it finds the instance imported by the root `AppModule`.
Now `parentModule` exists and the constructor throws the error.

Angular 会创建一个惰性加载模块，它具有自己的注入器，它是根注入器的*子注入器*。
`@SkipSelf` 让 Angular 在其父注入器中查找 `CoreModule`，这次，它的父注入器却是根注入器了（而上次的父注入器是空）。
当然，这次它找到了由根模块 `AppModule` 导入的实例。
该构造函数检测到存在 `parentModule`，于是抛出一个错误。

Here are the two files in their entirety for reference:

以下这两个文件仅供参考：

<code-tabs linenums="false">
 <code-pane
   title="app.module.ts"
   path="ngmodules/src/app/app.module.ts">
 </code-pane>
 <code-pane
   title="core.module.ts"
   region="whole-core-module"
   path="ngmodules/src/app/core/core.module.ts">
 </code-pane>
</code-tabs>

<hr>

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in:

你还可能对下列内容感兴趣：

* [Sharing Modules](guide/sharing-ngmodules), which elaborates on the concepts covered on this page.

   [共享模块](guide/sharing-ngmodules)解释了本页中涉及的这些概念。

* [Lazy Loading Modules](guide/lazy-loading-ngmodules).

   [惰性加载模块](guide/lazy-loading-ngmodules)。

* [NgModule FAQ](guide/ngmodule-faq).

   [NgModule 常见问题](guide/ngmodule-faq)。
