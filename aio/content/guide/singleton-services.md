# Singleton services

# 单例服务

A singleton service is a service for which only one instance exists in an app.

单例服务是指在应用中只存在一个实例的服务。

For a sample app using the app-wide singleton service that this page describes, see the
<live-example name="ngmodules"></live-example> showcasing all the documented features of NgModules.

本页中描述的这种全应用级单例服务的例子位于<live-example name="ngmodules"></live-example>，它示范了 NgModule 的所有已文档化的特性。

## Providing a singleton service

## 提供单例服务

There are two ways to make a service a singleton in Angular:

在 Angular 中有两种方式来生成单例服务：

* Declare `root` for the value of the `@Injectable()` `providedIn` property

  把 `@Injectable()` 的 `providedIn` 属性声明为 `root`。

* Include the service in the `AppModule` or in a module that is only imported by the `AppModule`

  把该服务包含在 `AppModule` 或某个只会被 `AppModule` 导入的模块中。

{@a providedIn}

### Using `providedIn`

### 使用 `providedIn`

Beginning with Angular 6.0, the preferred way to create a singleton service is to set `providedIn` to `root` on the service's `@Injectable()` decorator. This tells Angular
to provide the service in the application root.

从 Angular 6.0 开始，创建单例服务的首选方式就是在那个服务类的 `@Injectable` 装饰器上把 `providedIn` 设置为 `root`。这会告诉 Angular 在应用的根上提供此服务。

<code-example path="providers/src/app/user.service.0.ts"  header="src/app/user.service.ts"></code-example>

For more detailed information on services, see the [Services](tutorial/toh-pt4) chapter of the
[Tour of Heroes tutorial](tutorial).

要想深入了解关于服务的信息，参见[《英雄指南》教程](tutorial)中的[服务](tutorial/toh-pt4)一章。

### NgModule `providers` array

### NgModule 的 `providers` 数组

In apps built with Angular versions prior to 6.0, services are registered NgModule `providers` arrays as follows:

在基于 Angular 6.0 以前的版本构建的应用中，服务是注册在 NgModule 的 `providers` 数组中的，就像这样：

```ts
@NgModule({
  ...
  providers: [UserService],
  ...
})

```

If this NgModule were the root `AppModule`, the `UserService` would be a singleton and available
throughout the app. Though you may see it coded this way, using the `providedIn` property of the `@Injectable()` decorator on the service itself is preferable as of Angular 6.0 as it makes your services tree-shakable.

如果这个 NgModule 是根模块 `AppModule`，此 `UserService` 就会是单例的，并且在整个应用中都可用。虽然你可能会看到这种形式的代码，但是最好使用在服务自身的 `@Injectable()` 装饰器上设置 `providedIn` 属性的形式，因为 Angular 6.0 可以对这些服务进行摇树优化。

{@a forRoot}

## The `forRoot()` pattern

## `forRoot()` 模式

Generally, you'll only need `providedIn` for providing services and `forRoot()`/`forChild()` for routing. However, understanding how `forRoot()` works to make sure a service is a singleton will inform your development at a deeper level.

通常，你只需要用 `providedIn` 提供服务，用 `forRoot()`/`forChild()` 提供路由即可。
不过，理解 `forRoot()` 为何能够确保服务只有单个实例，可以让你学会更深层次的开发知识。

If a module defines both providers and declarations (components, directives, pipes),
then loading the module in multiple feature modules would duplicate the registration of the service. This could result in multiple service instances and the service would no longer behave as a singleton.

如果模块同时定义了 providers（服务）和 declarations（组件、指令、管道），那么，当你同时在多个特性模块中加载此模块时，这些服务就会被注册在多个地方。这会导致出现多个服务实例，并且该服务的行为不再像单例一样。

There are multiple ways to prevent this:

有多种方式来防止这种现象：

* Use the [`providedIn` syntax](guide/singleton-services#providedIn) instead of registering the service in the module.

  用 [`providedIn` 语法](guide/singleton-services#providedIn)代替在模块中注册服务的方式。

* Separate your services into their own module.

  把你的服务分离到它们自己的模块中。

* Define `forRoot()` and `forChild()` methods in the module.

  在模块中分别定义 `forRoot()` 和 `forChild()` 方法。

<div class="alert is-helpful">

**Note:** There are two example apps where you can see this scenario; the more advanced <live-example noDownload name="ngmodules">NgModules live example</live-example>, which contains `forRoot()` and `forChild()` in the routing modules and the `GreetingModule`, and the simpler <live-example name="lazy-loading-ngmodules" noDownload>Lazy Loading live example</live-example>. For an introductory explanation see the [Lazy Loading Feature Modules](guide/lazy-loading-ngmodules) guide.

**注意：**有两个范例应用可以让你查看这种情况，更高级的方式参见 <live-example noDownload name="ngmodules">NgModules 现场演练</live-example>，它在路由模块中包含 `forRoot()` 和 `forChild()`，而 `GreetingModule` 是一个比较简单的<live-example name="lazy-loading-ngmodules" noDownload>惰性加载范例</live-example>。在[惰性加载模块](guide/lazy-loading-ngmodules)中有简要的解释。

</div>


Use `forRoot()` to
separate providers from a module so you can import that module into the root module
with `providers` and child modules without `providers`.

使用 `forRoot()` 来把提供者从该模块中分离出去，这样你就能在根模块中导入该模块时带上 `providers` ，并且在子模块中导入它时不带 `providers`。

1. Create a static method `forRoot()` on the module.

   在该模块中创建一个静态方法 `forRoot()`。

2. Place the providers into the `forRoot()` method.

   把这些提供者放进 `forRoot()` 方法中。

<code-example path="ngmodules/src/app/greeting/greeting.module.ts" region="for-root" header="src/app/greeting/greeting.module.ts"></code-example>


{@a forRoot-router}

### `forRoot()` and the `Router`

### `forRoot()` 和 `Router`

`RouterModule` provides the `Router` service, as well as router directives, such as `RouterOutlet` and `routerLink`. The root application module imports `RouterModule` so that the application has a `Router` and the root application components can access the router directives. Any feature modules must also import `RouterModule` so that their components can place router directives into their templates.

`RouterModule` 中提供了 `Router` 服务，同时还有一些路由指令，比如 `RouterOutlet` 和 `routerLink` 等。应用的根模块导入了 `RouterModule`，以便应用中有一个 `Router` 服务，并且让应用的根组件可以访问各个路由器指令。任何一个特性模块也必须导入 `RouterModule`，这样它们的组件模板中才能使用这些路由器指令。

If the `RouterModule` didn’t have `forRoot()` then each feature module would instantiate a new `Router` instance, which would break the application as there can only be one `Router`. By using the `forRoot()` method, the root application module imports `RouterModule.forRoot(...)` and gets a `Router`, and all feature modules import `RouterModule.forChild(...)` which does not instantiate another `Router`.

如果 `RouterModule` 没有 `forRoot()`，那么每个特性模块都会实例化一个新的 `Router` 实例，而这会破坏应用的正常逻辑，因为应用中只能有一个 `Router` 实例。通过使用 `forRoot()` 方法，应用的根模块中会导入 `RouterModule.forRoot(...)`，从而获得一个 `Router` 实例，而所有的特性模块要导入 `RouterModule.forChild(...)`，它就不会实例化另外的 `Router`。

<div class="alert is-helpful">

**Note:** If you have a module which has both providers and declarations,
you _can_ use this
technique to separate them out and you may see this pattern in legacy apps.
However, since Angular 6.0, the best practice for providing services is with the
`@Injectable()` `providedIn` property.

**注意：**如果你的某个模块也同时有 providers 和 declarations，你也*可以*使用这种技巧来把它们分开。你可能会在某些传统应用中看到这种模式。
不过，从 Angular 6.0 开始，提供服务的最佳实践是使用 `@Injectable()` 的 `providedIn` 属性。

</div>

### How `forRoot()` works

### `forRoot()` 的工作原理

`forRoot()` takes a service configuration object and returns a
[ModuleWithProviders](api/core/ModuleWithProviders), which is
a simple object with the following properties:

`forRoot()` 会接受一个服务配置对象，并返回一个 [ModuleWithProviders](api/core/ModuleWithProviders) 对象，它带有下列属性：

* `ngModule`: in this example, the `GreetingModule` class.

  `ngModule`：在这个例子中，就是 `GreetingModule` 类。

* `providers`: the configured providers.

   `providers` - 配置好的服务提供者

In the <live-example name="ngmodules">live example</live-example>
the root `AppModule` imports the `GreetingModule` and adds the
`providers` to the `AppModule` providers. Specifically,
Angular accumulates all imported providers
before appending the items listed in `@NgModule.providers`.
This sequence ensures that whatever you add explicitly to
the `AppModule` providers takes precedence over the providers
of imported modules.

在这个 <live-example name="ngmodules">现场演练</live-example>中，根模块 `AppModule` 导入了 `GreetingModule`，并把它的 `providers` 添加到了 `AppModule` 的服务提供者列表中。特别是，Angular 会把所有从其它模块导入的提供者追加到本模块的 `@NgModule.providers` 中列出的提供者之前。这种顺序可以确保你在 `AppModule` 的 `providers` 中显式列出的提供者，其优先级高于导入模块中给出的提供者。

The sample app imports `GreetingModule` and uses its `forRoot()` method one time, in `AppModule`. Registering it once like this prevents multiple instances.

在这个范例应用中，导入 `GreetingModule`，并只在 `AppModule` 中调用一次它的 `forRoot()` 方法。像这样注册它一次就可以防止出现多个实例。

You can also add a `forRoot()` method in the `GreetingModule` that configures
the greeting `UserService`.

你还可以在 `GreetingModule` 中添加一个用于配置 `UserService` 的 `forRoot()` 方法。

In the following example, the optional, injected `UserServiceConfig`
extends the greeting `UserService`. If a `UserServiceConfig` exists, the `UserService` sets the user name from that config.

在下面的例子中，可选的注入 `UserServiceConfig` 扩展了 `UserService`。如果 `UserServiceConfig` 存在，就从这个配置中设置用户名。

<code-example path="ngmodules/src/app/greeting/user.service.ts" region="ctor" header="src/app/greeting/user.service.ts (constructor)"></code-example>

Here's `forRoot()` that takes a `UserServiceConfig` object:

下面是一个接受 `UserServiceConfig` 参数的 `forRoot()` 方法：

<code-example path="ngmodules/src/app/greeting/greeting.module.ts" region="for-root" header="src/app/greeting/greeting.module.ts (forRoot)"></code-example>

Lastly, call it within the `imports` list of the `AppModule`. In the following
snippet, other parts of the file are left out. For the complete file, see the <live-example name="ngmodules"></live-example>, or continue to the next section of this document.

最后，在 `AppModule` 的 `imports`*列表*中调用它。在下面的代码片段中，省略了文件的另一部分。要查看完整文件，参见 <live-example name="ngmodules"></live-example> 或继续阅读本文档的后续章节。

<code-example path="ngmodules/src/app/app.module.ts" region="import-for-root" header="src/app/app.module.ts (imports)"></code-example>

The app displays "Miss Marple" as the user instead of the default "Sherlock Holmes".

该应用不再显示默认的 “Sherlock Holmes”，而是用 “Miss Marple” 作为用户名称。

Remember to import `GreetingModule` as a Javascript import at the top of the file and don't add it to more than one `@NgModule` `imports` list.

记住：在本文件的顶部要以 JavaScript  import 形式导入 `GreetingModule`，并且不要把它多次加入到本 `@NgModule` 的 `imports` 列表中。

## Prevent reimport of the `GreetingModule`

## 防止重复导入 `GreetingModule`

Only the root `AppModule` should import the `GreetingModule`. If a
lazy-loaded module imports it too, the app can generate
[multiple instances](guide/ngmodule-faq#q-why-bad) of a service.

只有根模块 `AppModule` 才能导入 `GreetingModule`。如果一个惰性加载模块也导入了它，
该应用就会为服务生成[多个实例](guide/ngmodule-faq#q-why-bad)。

To guard against a lazy loaded module re-importing `GreetingModule`, add the following `GreetingModule` constructor.

要想防止惰性加载模块重复导入 `GreetingModule`，可以添加如下的 `GreetingModule` 构造函数。

<code-example path="ngmodules/src/app/greeting/greeting.module.ts" region="ctor" header="src/app/greeting/greeting.module.ts"></code-example>

The constructor tells Angular to inject the `GreetingModule` into itself.
The injection would be circular if Angular looked for
`GreetingModule` in the _current_ injector, but the `@SkipSelf()`
decorator means "look for `GreetingModule` in an ancestor
injector, above me in the injector hierarchy."

该构造函数要求 Angular 把 `GreetingModule` 注入它自己。
如果 Angular 在*当前*注入器中查找 `GreetingModule`，这次注入就会导致死循环，但是 `@SkipSelf()` 装饰器的意思是 "在注入器树中层次高于我的祖先注入器中查找 `GreetingModule`。"

If the constructor executes as intended in the `AppModule`,
there would be no ancestor injector that could provide an instance of `CoreModule` and the injector should give up.

如果该构造函数如预期般执行在 `AppModule` 中，那就不会有任何祖先注入器可以提供 `CoreModule` 的实例，所以该注入器就会放弃注入。

By default, the injector throws an error when it can't
find a requested provider.
The `@Optional()` decorator means not finding the service is OK.
The injector returns `null`, the `parentModule` parameter is null,
and the constructor concludes uneventfully.

默认情况下，当注入器找不到想找的提供者时，会抛出一个错误。
但 `@Optional()` 装饰器表示找不到该服务也无所谓。
于是注入器会返回 `null`，`parentModule` 参数也就被赋成了空值，而构造函数没有任何异常。

It's a different story if you improperly import `GreetingModule` into a lazy loaded module such as `CustomersModule`.

但如果你把 `GreetingModule` 导入到像 `CustomerModule` 这样的惰性加载模块中，事情就不一样了。

Angular creates a lazy loaded module with its own injector,
a child of the root injector.
`@SkipSelf()` causes Angular to look for a `GreetingModule` in the parent injector, which this time is the root injector.
Of course it finds the instance imported by the root `AppModule`.
Now `parentModule` exists and the constructor throws the error.

Angular 创建惰性加载模块时会给它一个自己的注入器，它是根注入器的*子注入器*。
`@SkipSelf()` 让 Angular 在其父注入器中查找 `GreetingModule`，这次，它的父注入器是根注入器（而上次的父注入器是空）。
当然，这次它找到了由根模块 `AppModule` 导入的实例。
该构造函数检测到存在 `parentModule`，于是抛出一个错误。

Here are the two files in their entirety for reference:

以下这两个文件仅供参考：

<code-tabs>
 <code-pane header="app.module.ts" path="ngmodules/src/app/app.module.ts">
 </code-pane>
 <code-pane header="greeting.module.ts" region="whole-greeting-module" path="ngmodules/src/app/greeting/greeting.module.ts">
 </code-pane>
</code-tabs>

<hr />

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
