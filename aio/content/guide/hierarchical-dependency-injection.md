# Hierarchical Dependency Injectors

# 多级依赖注入器

The Angular dependency injection system is _hierarchical_.
There is a tree of injectors that parallel an app's component tree.
You can reconfigure the injectors at any level of that component tree.

Angular 的依赖注入系统是*多级的*。
实际上，应用程序中有一个与组件树平行的注入器树（译注：平行是指结构完全相同且一一对应）。
你可以在组件树中的任何级别上重新配置注入器。

This guide explores this system and how to use it to your advantage.
It uses examples based on this <live-example></live-example>.

本文将带你浏览这个体系，并告诉你要如何善用它。
这里用到的例子基于这个<live-example></live-example>。

{@a ngmodule-vs-comp}
{@a where-to-register}

## Where to configure providers

## 在哪里配置提供商

You can configure providers for different injectors in the injector hierarchy.
An internal platform-level injector is shared by all running apps.
The `AppModule` injector is the root of an app-wide injector hierarchy, and within
an NgModule, directive-level injectors follow the structure of the component hierarchy.

你可以为注入器树中不同的注入器分别配置提供商。
所有运行中的应用都会共享同一个内部的平台级注入器。
`AppModule` 上的注入器是全应用级注入器树的根节点，在 NgModule 中，指令级的注入器会遵循组件树的结构。

The choices you make about where to configure providers lead to differences in the final bundle size, service _scope_, and service _lifetime_.

关于在哪里配置提供商的不同选择将导致一些差异：最终包的大小、服务的*范围*和服务的*生命周期*。

When you specify providers in the `@Injectable()` decorator of the service itself (typically at the app root level), optimization tools such as those used by the CLI's production builds can perform *tree shaking*, which removes services that aren't used by your app. Tree shaking results in smaller bundle sizes. 

当你在服务自身的 `@Injectable()` 装饰器中指定提供商时（通常在应用的根一级），CLI 生产模式构建时所用的优化工具可以执行*摇树优化*，它会移除没有用过的那些服务。摇树优化生成的包会更小。

* Learn more about [tree-shakable providers](guide/dependency-injection-providers#tree-shakable-providers).

  要了解更多，参见[可摇树优化的提供商](guide/dependency-injection-providers#tree-shakable-providers)。

You're likely to inject `UserService` in many places throughout the app and will want to inject the same service instance every time. Providing `UserService` through the `root` injector is a good choice, and is the default that the [Angular CLI](cli) uses when you generate a service for your app.

你可能会在应用程序的许多地方注入 `UserService`，并希望每次注入的都是服务的同一个实例。这种情况下，通过 `root` 来提供 `UserService` 就是不错的选择，而且这也是 [Angular CLI](cli) 为应用生成服务时的默认选项。

<div class="alert is-helpful">

<header>Platform injector</header>

<header>平台注入器</header>

When you use `providedIn:'root'`, you are configuring the root injector for the _app_, which is the injector for `AppModule`.
The actual root of the entire injector hierarchy is a _platform injector_ that is the parent of app-root injectors. 
This allows multiple apps to share a platform configuration. For example, a browser has only one URL bar, no matter how many apps you have running.

当使用 `providedIn:'root'` 时，你是在配置*应用*的根注入器，也就是 `AppModule` 的注入器。
整个注入器树的真正的根是*平台注入器*，它是根注入器的父节点。
这可以让多个应用共享同一套平台配置。比如，无论你正在运行多少个应用，一个浏览器窗口都只有一个地址栏。

The platform injector is used internally during bootstrap, to configure platform-specific dependencies. You can configure additional platform-specific providers at the platform level by supplying `extraProviders` using the `platformBrowser()` function. 

平台注入器是在启动期间内部使用的，用于配置与平台相关的依赖项。通过在调用 `platformBrowser()` 函数时提供 `extraProviders` 参数，你可以在平台级配置更多与平台相关的提供商。

Learn more about dependency resolution through the injector hierarchy: 
[What you always wanted to know about Angular Dependency Injection tree](https://blog.angularindepth.com/angular-dependency-injection-and-tree-shakeable-tokens-4588a8f70d5d)

要了解借助注入器树解析依赖项的更多信息，参见[你所不知道的 Angular 依赖注入树](https://blog.angularindepth.com/angular-dependency-injection-and-tree-shakeable-tokens-4588a8f70d5d)。

</div>

*NgModule-level* providers can be specified with `@NgModule()` `providers` metadata option, or in the `@Injectable()` `providedIn` option (with some module other than the root `AppModule`).

*NgModule 级*的提供商可以在 `@NgModule()` `providers` 元数据中指定，也可以在 `@Injectable()` 的 `providedIn` 选项中指定某个模块类（但根模块 `AppModule` 除外）。

Use the `@NgModule()` `provides` option if a module is [lazy loaded](guide/lazy-loading-ngmodules). The module's own injector is configured with the provider when that module is loaded, and Angular can inject the corresponding services in any class it creates in that module. If you use the `@Injectable()` option `providedIn: MyLazyloadModule`, the provider could be shaken out at compile time, if it is not used anywhere else in the app. 

如果某个模块是[惰性加载](guide/lazy-loading-ngmodules)的，那么请使用 `@NgModule()` 的 `provides` 选项。加载那个模块时，就会用这里的提供商来配置模块本身的注入器，而 Angular 会为该模块中创建的任何类注入相应的服务。如果你使用了 `@Injectable()` 中的 `providedIn: MyLazyloadModule` 选项，那么如果该提供商没有在别处用过，就可以在编译期间把它摇树优化掉。

* Learn more about [tree-shakable providers](guide/dependency-injection-providers#tree-shakable-providers).

  欲知详情，参见[可摇树优化的提供商](guide/dependency-injection-providers#tree-shakable-providers)。

For both root-level and module-level injectors, a service instance lives for the life of the app or module, and Angular injects this one service instance in every class that needs it.

无论对于根级注入器还是模块级注入器，服务实例的生命周期都和应用或模块本身相同。Angular 可以把服务实例注入给任何需要它的类中。

*Component-level* providers configure each component instance's own injector. 
Angular can only inject the corresponding services in that component instance or one of its descendant component instances. 
Angular can't inject the same service instance anywhere else. 

*组件级*提供商为每个组件实例配置自己的注入器。
Angular 只能把相应的服务注入到该组件实例或其下级组件实例中，而不能把这个服务实例注入到其它地方。

A component-provided service may have a limited lifetime. 
Each new instance of the component gets its own instance of the service. 
When the component instance is destroyed, so is that service instance.

组件提供的服务具有受限的生命周期。
该组件的每个新实例都会获得自己的一份服务实例。
当销毁组件实例时，服务实例也会被同时销毁。

In our sample app, `HeroComponent` is created when the application starts 
and is never destroyed,
so the `HeroService` instance created for `HeroComponent` lives for the life of the app. 
If you want to restrict `HeroService` access to `HeroComponent` and its nested 
`HeroListComponent`, provide `HeroService` at the component level, in `HeroComponent` metadata.

在这个范例应用中，应用一启动就会创建 `HeroComponent` 的实例，而且永不销毁，所以由 `HeroComponent` 创建的 `HeroService` 的实例的生命周期也和应用相同。
如果你要把 `HeroService` 的访问权限制到 `HeroComponent` 及其内嵌的 `HeroListComponent` 中，可以通过修改 `HeroComponent` 的元数据，来要求在组件级提供 `HeroService`。

* See more [examples of component-level injection](#component-injectors) below.

  参见稍后的[组件级注入的例子](#component-injectors)。

{@a register-providers-injectable}

### @Injectable-level configuration 

### 在 @Injectable 级进行配置

The `@Injectable()` decorator identifies every service class. The `providedIn` metadata option for a service class configures a specific injector (typically `root`)
to use the decorated class as a provider of the service. 
When an injectable class provides its own service to the `root` injector, the service is available anywhere the class is imported. 

`@Injectable()` 装饰器会标出每个服务类。服务类的元数据选项 `providedIn` 会指定一个注入器（通常为 `root` 来用被装饰的类作为该服务的提供商。
当可注入的类向 `root` 注入器提供了自己的服务时，任何导入了该类的地方都能使用这个服务。

The following example configures a provider for `HeroService` using the `@Injectable()` decorator on the class.

下面的例子使用类上的 `@Injectable()` 装饰器为 `HeroService` 配置了提供商。

<code-example path="dependency-injection/src/app/heroes/hero.service.0.ts"  header="src/app/heroes/heroes.service.ts" linenums="false"> </code-example> 

This configuration tells Angular that the app's root injector is responsible for creating an 
instance of `HeroService` by invoking its constructor,
and for making that instance available across the application. 

这个配置项告诉 Angular，要由此应用的根注入器负责通过调用 `HeroService` 的构造函数来创建它的实例。
并让该实例在整个应用程序中可用。

Providing a service with the app's root injector is a typical case,
and the CLI sets up this kind of a provider automatically for you
when generating a new service. 
However, you might not always want to provide your service at the root level.
You might, for instance, want users to explicitly opt-in to using the service.

典型的方式是通过应用的根注入器来提供服务，当 CLI 生成新的服务时，也会自动为你设置为这种方式。
不过，你有时候可能不希望通过根注入器提供服务。比如，你可能会希望用户显式的选择如何使用该服务。

Instead of specifying the `root` injector, you can set `providedIn` to a specific NgModule. 

除了指定给 `root` 注入器之外，你还可以把 `providedIn` 设置为某个特定的 NgModule。

For example, in the following excerpt, the `@Injectable()` decorator configures a provider
that is available in any injector that includes the `HeroModule`.

比如，在下面的代码片段中，`@Injectable()` 装饰器配置了一个提供商，它能用于 `HeroModule` 包含的所有注入器中。

<code-example path="dependency-injection/src/app/heroes/hero.service.4.ts"  header="src/app/heroes/hero.service.ts" linenums="false"> </code-example>

This is generally no different from configuring the injector of the NgModule itself,
except that the service is tree-shakable if the NgModule doesn't use it.
It can be useful for a library that offers a particular service that some
components *might* want to inject optionally,
and leave it up to the app whether to provide the service.

一般来说，这和在 NgModule 本身的装饰器上配置注入器没有多少不同，主要的区别是如果 NgModule 没有用到该服务，那么它就是可以被摇树优化掉的。
对于某个提供特定服务的库而言，有些组件*可能*会希望注入器是可选的，等使用该库的应用程序来决定是否要提供该服务。

* Learn more about [tree-shakable providers](guide/dependency-injection-providers#tree-shakable-providers).

  欲知详情，参见[可摇树优化的提供商](guide/dependency-injection-providers#tree-shakable-providers)。

### @NgModule-level injectors

### @NgModule 级注入器

You can configure a provider at the module level using the `providedIn` metadata option for a non-root NgModule, in order to limit the scope of the provider to that module.
This is the equivalent of specifying the non-root module in the `@Injectable()` metadata, except that the service provided this way is not tree-shakable.

你还可以在非根 NgModule 元数据的 `providedIn` 选项中配置一个模块级的提供商，以便把该服务的范围限定到该模块一级。
这和在 `@Injectable()` 元数据中指定一个非根模块是基本等效的，但以这种方式提供的服务无法被摇树优化掉。

You generally don't need to specify `AppModule` with `providedIn`, because the app's `root` injector is the `AppModule` injector. 
However, if you configure a app-wide provider in the`@NgModule()` metadata for `AppModule`,
it overrides one configured for `root` in the `@Injectable()` metadata. 
You can do this to configure a non-default provider of a service that is shared with multiple apps. 

一般来说，你不必在 `providedIn` 中指定 `AppModule`，因为应用中的 `root` 注入器就是 `AppModule` 注入器。
不过，如果你在 `AppModule` 的 `@NgModule()` 元数据中配置了全应用级的提供商，它就会覆盖通过 `@Injectable()` 配置的那一个。
你可以用这种方式来为那些供多个应用使用的服务指定非默认的提供商。

Here is an example of the case where the component router configuration includes
a non-default [location strategy](guide/router#location-strategy) by listing its provider
in the `providers` list of the `AppModule`.

下面的例子中，通过把 [location 策略](guide/router#location-strategy) 的提供商添加到 `AppModule` 的 `providers` 列表中，为路由器配置了非默认的 [location 策略](guide/router#location-strategy)。

<code-example path="dependency-injection-in-action/src/app/app.module.ts" region="providers" header="src/app/app.module.ts (providers)" linenums="false">

</code-example>


{@a register-providers-component}

### @Component-level injectors

### @Component 级注入器

Individual components within an NgModule have their own injectors.
You can limit the scope of a provider to a component and its children
by configuring the provider at the component level using the `@Component` metadata.

NgModule 中每个组件都有它自己的注入器。
通过使用 `@Component` 元数据在组件级配置某个提供商，你可以把这个提供商的范围限定到该组件及其子组件。

The following example is a revised `HeroesComponent` that specifies `HeroService` in its `providers` array. `HeroService` can provide heroes to instances of this component, or to any child component instances. 

下面的例子是修改过的 `HeroesComponent`，它在 `providers` 数组中指定了 `HeroService`。`HeroService` 可以像该组件的实例以及任意子组件的实例提供英雄列表。

<code-example path="dependency-injection/src/app/heroes/heroes.component.1.ts" header="src/app/heroes/heroes.component.ts" linenums="false">
</code-example>

### Element injectors

### 元素注入器

An injector does not actually belong to a component, but rather to the component instance's anchor element in the DOM. A different component instance on a different DOM element uses a different injector.

注入器本质上并不属于组件，而是 DOM 中该组件实例所附着到的元素。另一个 DOM 元素上的其它组件实例则会使用另一个注入器。

Components are a special type of directive, and the `providers` property of
`@Component()` is inherited from `@Directive()`. 
Directives can also have dependencies, and you can configure providers
in their `@Directive()` metadata. 
When you configure a provider for a component or directive using the `providers` property, that provider belongs to the injector for the anchor DOM element. Components and directives on the same element share an injector.

组件是一种特殊的指令，`@Component()` 中的 `providers` 属性是从 `@Directive()` 中继承来的。
指令也能拥有依赖，并且你也可以在它们的 `@Directive()` 元数据中配置提供商。
当你使用 `providers` 属性为组件或指令配置提供商时，该提供商属于所在 DOM 元素的那个注入器。
同一个元素上的组件与指令共享同一个注入器。

<!--- TBD with examples
* For an example of how this works, see [Element-level providers](guide/dependency-injection-in-action#directive-level-providers).
--->

* Learn more about [Element Injectors in Angular](https://blog.angularindepth.com/a-curios-case-of-the-host-decorator-and-element-injectors-in-angular-582562abcf0a).


  欲知详情，参见[Angular 中的元素注入器](https://blog.angularindepth.com/a-curios-case-of-the-host-decorator-and-element-injectors-in-angular-582562abcf0a)。

## Injector bubbling

## 注入器冒泡

Consider this guide's variation on the Tour of Heroes application.
At the top is the `AppComponent` which has some subcomponents, such as the `HeroesListComponent`.
The `HeroesListComponent` holds and manages multiple instances of the `HeroTaxReturnComponent`.
The following diagram represents the state of this  three-level component tree when there are three instances of `HeroTaxReturnComponent`
open simultaneously.

考虑《英雄指南》应用的一个简单变种。它的顶层是 `AppComponent` 组件，它还有一些子组件，比如 `HeroesListComponent`。
`HeroesListComponent` 组件保存和管理着 `HeroTaxReturnComponent` 的多个实例。
下图展示了当 `HeroesCardComponent` 的三个 `HeroTaxReturnComponent` 实例同时展开时的三级组件树状态。

<figure>
  <img src="generated/images/guide/dependency-injection/component-hierarchy.png" alt="injector tree">
</figure>

When a component requests a dependency, Angular tries to satisfy that dependency with a provider registered in that component's own injector.
If the component's injector lacks the provider, it passes the request up to its parent component's injector.
If that injector can't satisfy the request, it passes the request along to the next parent injector up the tree.
The requests keep bubbling up until Angular finds an injector that can handle the request or runs out of ancestor injectors.
If it runs out of ancestors, Angular throws an error. 

当一个组件申请获得一个依赖时，Angular 先尝试用该组件自己的注入器来满足它。
如果该组件的注入器没有找到对应的提供商，它就把这个申请转给它父组件的注入器来处理。
如果那个注入器也无法满足这个申请，它就继续转给它在注入器树中的父注入器。
这个申请继续往上冒泡 —— 直到找到了一个能处理此申请的注入器或者超出了组件树中的祖先位置为止。
如果超出了组件树中的祖先还未找到，Angular 就会抛出一个错误。

If you have registered a provider for the same DI token at different levels, the first one Angular encounters is the one it uses to provide the dependency. If, for example, a provider is registered locally in the component that needs a service, Angular doesn't look for another provider of the same service.  

如果你在不同的层级上为同一个 DI 令牌注册了提供商，那么 Angular 所碰到的第一个注入器就会用来提供该依赖。
比如，如果提供商注册在该组件的本地注入器上，那么当该组件需要这个服务时，Angular 就不会去找能提供同一服务的其它提供商。

<div class="alert is-helpful">

You can cap the bubbling by adding the `@Host()` parameter decorator on the dependant-service parameter
in a component's constructor. 
The hunt for providers stops at the injector for the host element of the component. 

你可以通过在构造函数的依赖项参数上添加参数装饰器 `@Host()` 来限制冒泡。
当搜索提供商时，就会在组件宿主元素的注入器处停下。

* See an [example](guide/dependency-injection-in-action#qualify-dependency-lookup) of using `@Host` together with `@Optional`, another parameter decorator that lets you handle the null case if no provider is found.

  参见这个同时使用 `@Host` 和 `@Optional` 的[例子](guide/dependency-injection-in-action#qualify-dependency-lookup)，另一个参数装饰器 `@Optional` 让你能在没有找到提供商时把参数置为 null。

* Learn more about the [`@Host` decorator and Element Injectors](https://blog.angularindepth.com/a-curios-case-of-the-host-decorator-and-element-injectors-in-angular-582562abcf0a).

  到 [`@Host` 装饰器与元素注入器](https://blog.angularindepth.com/a-curios-case-of-the-host-decorator-and-element-injectors-in-angular-582562abcf0a) 中了解更多。

</div>

If you only register providers with the root injector at the top level (typically the root `AppModule`), the tree of injectors appears to be flat.
All requests bubble up to the root injector, whether you configured it with the `bootstrapModule` method, or registered all providers with `root` in their own services.

如果你只在顶级的根注入器（通常为根模块 `AppModule`）上注册提供商，则注入器树看起来就是扁平的。
无论你使用 `bootstrapModule` 方法配置它，还是在自己的服务中使用 `root` 注册了这些提供商，所有的请求都会冒泡到根注入器上。

{@a component-injectors}

## Component injectors

## 组件注入器

The ability to configure one or more providers at different levels opens up interesting and useful possibilities.
The guide sample offers some scenarios where you might want to do so.

在不同层次上重新配置一个或多个提供商的能力，开启了一些既有趣又有用的可能性。
本指南中的例子提供了一些你可能会用到它的场景。

### Scenario: service isolation

### 场景：服务隔离

Architectural reasons may lead you to restrict access to a service to the application domain where it belongs.

出于架构方面的考虑，可能会让你决定把一个服务限制到只能在它所属的特定领域中访问。

For example, the guide sample includes a `VillainsListComponent` that displays a list of villains.
It gets those villains from a `VillainsService`.

比如，这个例子中包括一个用于显示反派列表的 `VillainsListComponent`，它会从 `VillainsService` 中获得反派列表数据。

If you provide `VillainsService` in the root `AppModule` (where you registered the `HeroesService`),
that would make the `VillainsService` available everywhere in the application, including the _Hero_ workflows. If you later modified the `VillainsService`, you could break something in a hero component somewhere. Providing the service in the root `AppModule` creates that risk.

如果你在根模块 `AppModule` 中（也就是你注册 `HeroesService` 的地方）提供 `VillainsService`，就会让应用中的任何地方都能访问到 `VillainsService`，包括针对英雄的工作流。如果你稍后修改了 `VillainsService`，就可能破坏了英雄组件中的某些地方。在根模块 `AppModule` 中提供该服务将会引入此风险。

Instead, you can provide the `VillainsService` in the `providers` metadata of the `VillainsListComponent` like this:

该怎么做呢？你可以在 `VillainsListComponent` 的 `providers` 元数据中提供 `VillainsService`，就像这样：

<code-example path="hierarchical-dependency-injection/src/app/villains-list.component.ts" linenums="false" header="src/app/villains-list.component.ts (metadata)" region="metadata">

</code-example>

By providing `VillainsService` in the `VillainsListComponent` metadata and nowhere else,
the service becomes available only in the `VillainsListComponent` and its sub-component tree.
It's still a singleton, but it's a singleton that exist solely in the _villain_ domain.

在 `VillainsListComponent` 的元数据中而不是其它地方提供 `VillainsService` 服务，该服务就会只在 `VillainsListComponent` 及其子组件树中可用。
它仍然是单例，但是这个单例只存在于*反派（villain）*这个领域中。

Now you know that a hero component can't access it. You've reduced your exposure to error.

现在，你可以确信英雄组件不会访问它，因此减少了犯错误的机会。

### Scenario: multiple edit sessions

### 场景：多重编辑会话

Many applications allow users to work on several open tasks at the same time.
For example, in a tax preparation application, the preparer could be working on several tax returns,
switching from one to the other throughout the day.

很多应用允许用户同时进行多个任务。
比如，在纳税申报应用中，申报人可以打开多个报税单，随时可能从一个切换到另一个。

This guide demonstrates that scenario with an example in the Tour of Heroes theme.
Imagine an outer `HeroListComponent` that displays a list of super heroes.

本章要示范的场景仍然是基于《英雄指南》的。
想象一个外层的 `HeroListComponent`，它显示一个超级英雄的列表。

To open a hero's tax return, the preparer clicks on a hero name, which opens a component for editing that return.
Each selected hero tax return opens in its own component and multiple returns can be open at the same time.

要打开一个英雄的报税单，申报者点击英雄名，它就会打开一个组件来编辑那个申报单。
每个选中的申报单都会在自己的组件中打开，并且可以同时打开多个申报单。

Each tax return component has the following characteristics:

每个报税单组件都有下列特征：

* Is its own tax return editing session.

   属于它自己的报税单会话。

* Can change a tax return without affecting a return in another component.

   可以修改一个报税单，而不会影响另一个组件中的申报单。

* Has the ability to save the changes to its tax return or cancel them.

   能把所做的修改保存到它的报税单中，或者放弃它们。

<figure>
  <img src="generated/images/guide/dependency-injection/hid-heroes-anim.gif" alt="Heroes in action">
</figure>

Suppose that the `HeroTaxReturnComponent` has logic to manage and restore changes.
That would be a pretty easy task for a simple hero tax return.
In the real world, with a rich tax return data model, the change management would be tricky.
You could delegate that management to a helper service, as this example does.

假设 `HeroTaxReturnComponent` 还有一些管理并还原这些更改的逻辑。
这对于简单的报税单来说是很容易的。
不过，在现实世界中，报税单的数据模型非常复杂，对这些修改的管理可能不得不投机取巧。
你可以把这种管理任务委托给一个辅助服务，就像这个例子中所做的。

Here is the `HeroTaxReturnService`.
It caches a single `HeroTaxReturn`, tracks changes to that return, and can save or restore it.
It also delegates to the application-wide singleton `HeroService`, which it gets by injection.

这是一个报税单服务 `HeroTaxReturnService`。
它缓存了单条 `HeroTaxReturn`，用于跟踪那个申报单的变更，并且可以保存或还原它。
它还委托给了全应用级的单例服务 `HeroService`，它是通过依赖注入机制取得的。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.service.ts" header="src/app/hero-tax-return.service.ts">

</code-example>

Here is the `HeroTaxReturnComponent` that makes use of it.

下面是正在使用它的 `HeroTaxReturnComponent` 组件。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.component.ts" header="src/app/hero-tax-return.component.ts">

</code-example>


The _tax-return-to-edit_ arrives via the input property which is implemented with getters and setters.
The setter initializes the component's own instance of the `HeroTaxReturnService` with the incoming return.
The getter always returns what that service says is the current state of the hero.
The component also asks the service to save and restore this tax return.

通过输入属性可以得到*要编辑的报税单*，这个属性被实现成了读取器（getter）和设置器（setter）。
设置器根据传进来的报税单初始化了组件自己的 `HeroTaxReturnService` 实例。
读取器总是返回该服务所存英雄的当前状态。
组件也会请求该服务来保存或还原这个报税单。

This won't work if the service is an application-wide singleton.
Every component would share the same service instance, and each component would overwrite the tax return that belonged to another hero.

但如果该服务是一个全应用范围的单例就不行了。
每个组件就都会共享同一个服务实例，每个组件也都会覆盖属于其他英雄的报税单。

To prevent this, we configure the component-level injector of `HeroTaxReturnComponent` to provide the service, using the  `providers` property in the component metadata.

要防止这一点，我们就要在 `HeroTaxReturnComponent` 元数据的 `providers` 属性中配置组件级的注入器，来提供该服务。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.component.ts" linenums="false" header="src/app/hero-tax-return.component.ts (providers)" region="providers">

</code-example>

The `HeroTaxReturnComponent` has its own provider of the `HeroTaxReturnService`.
Recall that every component _instance_ has its own injector.
Providing the service at the component level ensures that _every_ instance of the component gets its own, private instance of the service, and no tax return gets overwritten.

`HeroTaxReturnComponent` 有它自己的 `HeroTaxReturnService` 提供商。
回忆一下，每个组件的*实例*都有它自己的注入器。
在组件级提供服务可以确保组件的*每个*实例都得到一个自己的、私有的服务实例，而报税单也不会再被意外覆盖了。

<div class="alert is-helpful">


The rest of the scenario code relies on other Angular features and techniques that you can learn about elsewhere in the documentation.
You can review it and download it from the <live-example></live-example>.

该场景代码中的其它部分依赖另一些 Angular 的特性和技术，你将会在本文档的其它章节学到。
你可以到<live-example></live-example>查看代码和下载它。

</div>

### Scenario: specialized providers

### 场景：专门的提供商

Another reason to re-provide a service at another level is to substitute a _more specialized_ implementation of that service, deeper in the component tree.

在其它层级重新提供服务的另一个理由，是在组件树的深层中把该服务替换为一个*更专门化的*实现。

Consider a Car component that depends on several services.
Suppose you configured the root injector (marked as A) with _generic_ providers for
`CarService`, `EngineService` and `TiresService`.

考虑一个依赖于一系列服务的 Car 组件。
假设你在根注入器（代号 A）中配置了*通用的*提供商：`CarService`、`EngineService` 和 `TiresService`。

You create a car component (A) that displays a car constructed from these three generic services.

你创建了一个车辆组件（A），它显示一个从另外三个通用服务构造出的车辆。

Then you create a child component (B) that defines its own, _specialized_ providers for `CarService` and `EngineService`
that have special capabilities suitable for whatever is going on in component (B).

然后，你创建一个子组件（B），它为 `CarService` 和 `EngineService` 定义了自己的*特殊的*提供商，它们具有更特殊的能力，适用于组件 B 的。

Component (B) is the parent of another component (C) that defines its own, even _more specialized_ provider for `CarService`.

组件 B 是另一个组件 C 的父组件，而组件 C 又定义了自己的，*更特殊的*`CarService` 提供商。

<figure>
  <img src="generated/images/guide/dependency-injection/car-components.png" alt="car components">
</figure>

Behind the scenes, each component sets up its own injector with zero, one, or more providers defined for that component itself.

在幕后，每个组件都有自己的注入器，这个注入器带有为组件本身准备的 0 个、1 个或多个提供商。

When you resolve an instance of `Car` at the deepest component (C),
its injector produces an instance of `Car` resolved by injector (C) with an `Engine` resolved by injector (B) and
`Tires` resolved by the root injector (A).

当你在最深层的组件 C 解析 `Car` 的实例时，它使用注入器 C 解析生成了一个 `Car` 的实例，使用注入器 B 解析了 `Engine`，而 `Tires` 则是由根注入器 A 解析的。

<figure>
  <img src="generated/images/guide/dependency-injection/injector-tree.png" alt="car injector tree">
</figure>

<div class="alert is-helpful">


The code for this _cars_ scenario is in the `car.components.ts` and `car.services.ts` files of the sample
which you can review and download from the <live-example></live-example>.

*车辆*场景下的代码位于 `car.components.ts` 和 `car.services.ts` 文件中，这个例子你可以在<live-example></live-example>查看和下载。

</div>
