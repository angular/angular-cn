# Hierarchical Dependency Injectors

# 多级依赖注入器

You learned the basics of Angular Dependency injection in the
[Dependency Injection](guide/dependency-injection) guide.

在[依赖注入](guide/dependency-injection)一章中，我们已经学过了 Angular 依赖注入的基础知识。

Angular has a _Hierarchical Dependency Injection_ system.
There is actually a tree of injectors that parallel an application's component tree.
You can reconfigure the injectors at any level of that component tree.

Angular 有一个*多级依赖注入系统*。
实际上，应用程序中有一个与组件树平行的注入器树（译注：平行是指结构完全相同且一一对应）。
我们可以在组件树中的任何级别上重新配置注入器，达到一些有趣和有用的效果。

This guide explores this system and how to use it to your advantage.

在本章中，我们将浏览这个体系，并告诉你如何善用它。

Try the <live-example></live-example>.

试试<live-example></live-example>。

## The injector tree

## 注入器树

In the [Dependency Injection](guide/dependency-injection) guide,
you learned how to configure a dependency injector and how to retrieve dependencies where you need them.

在[依赖注入](guide/dependency-injection)一章中，我们学过如何配置依赖注入器，以及如何在我们需要时用它获取依赖。

In fact, there is no such thing as ***the*** injector.
An application may have multiple injectors.
An Angular application is a tree of components. Each component instance has its own injector.
The tree of components parallels the tree of injectors.

实际上，没有***那个（唯一的）***注入器这回事，一个应用中可能有多个注入器。
一个 Angular 应用是一个组件树。每个组件实例都有自己的注入器！
组件的树与注入器的树平行。

<div class="l-sub-section">

The component's injector may be a _proxy_ for an ancestor injector higher in the component tree.
That's an implementation detail that improves efficiency.
You won't notice the difference and
your mental model should be that every component has its own injector.

组件的注入器可能是一个组件树中更高级的祖先注入器的*代理*。
但这只是提升效率的实现细节，我们不用在乎这点差异，在你的脑海里只要想象成每个组件都有自己的注入器就可以了。

</div>

Consider this guide's variation on the Tour of Heroes application.
At the top is the `AppComponent` which has some sub-components.
One of them is the `HeroesListComponent`.
The `HeroesListComponent` holds and manages multiple instances of the `HeroTaxReturnComponent`.
The following diagram represents the state of the this guide's three-level component tree when there are three instances of `HeroTaxReturnComponent`
open simultaneously.

考虑《英雄指南》应用的一个简单变种。它的顶层是`AppComponent`组件，它有一些子组件。
`HeroesListComponent`组件保存和管理着`HeroTaxReturnComponent`的多个实例。
下图展示了当`HeroesCardComponent`的三个 `HeroTaxReturnComponent` 实例同时展开时的三级组件树状态。

<figure>
  <img src="generated/images/guide/dependency-injection/component-hierarchy.png" alt="injector tree">
</figure>

### Injector bubbling

### 注入器冒泡

When a component requests a dependency, Angular tries to satisfy that dependency with a provider registered in that component's own injector.
If the component's injector lacks the provider, it passes the request up to its parent component's injector.
If that injector can't satisfy the request, it passes it along to *its* parent injector.
The requests keep bubbling up until Angular finds an injector that can handle the request or runs out of ancestor injectors.
If it runs out of ancestors, Angular throws an error.

当一个组件申请获得一个依赖时，Angular 先尝试用该组件自己的注入器来满足它。
如果该组件的注入器没有找到对应的提供商，它就把这个申请转给它父组件的注入器来处理。
如果那个注入器也无法满足这个申请，它就继续转给*它的*父组件的注入器。
这个申请继续往上冒泡 —— 直到我们找到了一个能处理此申请的注入器或者超出了组件树中的祖先位置为止。
如果超出了组件树中的祖先还未找到，Angular 就会抛出一个错误。

<div class="l-sub-section">

You can cap the bubbling. An intermediate component can declare that it is the "host" component.
The hunt for providers will climb no higher than the injector for that host component.
This is a topic for another day.

我们还可以“盖住”这次冒泡。一个中层的组件可以声称自己是“宿主”组件。
向上查找提供商的过程会截止于这个“宿主”组件。
我们先保留这个问题，等改天再讨论这个选项。

</div>

### Re-providing a service at different levels

### 在不同层级再次提供同一个服务

You can re-register a provider for a particular dependency token at multiple levels of the injector tree.
You don't *have* to re-register providers. You shouldn't do so unless you have a good reason.
But you *can*.

我们可以在注入器树中的多个层次上为指定的依赖令牌重新注册提供商。
但*并非必须*重新注册，事实上，虽然可以重新注册，但除非有很好的理由，否则不应该这么做。

As the resolution logic works upwards, the first provider encountered wins.
Thus, a provider in an intermediate injector intercepts a request for a service from something lower in the tree.
It effectively "reconfigures" and "shadows" a provider at a higher level in the tree.

服务解析逻辑会自下而上查找，碰到的第一个提供商会胜出。
因此，注入器树中间层注入器上的提供商，可以拦截来自底层的对特定服务的请求。
这导致它可以“重新配置”和者说“遮蔽”高层的注入器。

If you only specify providers at the top level (typically the root `AppModule`), the tree of injectors appears to be flat.
All requests bubble up to the root <code>NgModule</code> injector that you configured with the `bootstrapModule` method.

如果我们只在顶级（通常是根模块`AppModule`），这三个注入器看起来将是“平面”的。
所有的申请都会冒泡到根<code>NgModule</code>进行处理，也就是我们在`bootstrapModule`方法中配置的那个。

## Component injectors

## 组件注入器

The ability to configure one or more providers at different levels opens up interesting and useful possibilities.

在不同层次上重新配置一个或多个提供商的能力，开启了一些既有趣又有用的可能性。

### Scenario: service isolation

### 场景：服务隔离

Architectural reasons may lead you to restrict access to a service to the application domain where it belongs.

出于架构方面的考虑，可能会让你决定把一个服务限制到只能在它所属的特定领域中访问。

The guide sample includes a `VillainsListComponent` that displays a list of villains.
It gets those villains from a `VillainsService`.

本章的范例中包括一个`VillainsListComponent`，它显示一个反派的列表。

While you _could_ provide `VillainsService` in the root `AppModule` (that's where you'll find the `HeroesService`),
that would make the `VillainsService` available everywhere in the application, including the _Hero_ workflows.

虽然我们也可以在根模块`AppModule`中提供`VillainsService`（就像`HeroesService`那样），不过那样一来就会导致在整个应用中到处都能访问到`VillainsService`，包括在*英雄*工作流中。

If you later modified the `VillainsService`, you could break something in a hero component somewhere.
That's not supposed to happen but providing the service in the root `AppModule` creates that risk.

如果我们以后修改了`VillainsService`，那就可能会破坏英雄组件中的某些部分。
这可不妙，但是在根模块`AppModule`中提供这个服务可能会导致这种风险。

Instead, provide the `VillainsService` in the `providers` metadata of the `VillainsListComponent` like this:

我们可以换一种方案：在`VillainsListComponent`元数据的`providers`中提供`VillainsService`，就像这样：

<code-example path="hierarchical-dependency-injection/src/app/villains-list.component.ts" linenums="false" title="src/app/villains-list.component.ts (metadata)" region="metadata">

</code-example>

By providing `VillainsService` in the `VillainsListComponent` metadata and nowhere else,
the service becomes available only in the `VillainsListComponent` and its sub-component tree.
It's still a singleton, but it's a singleton that exist solely in the _villain_ domain.

在`VillainsListComponent`的元数据中而不是其它地方提供`VillainsService`服务，该服务就会只在`VillainsListComponent`及其子组件树中可用。
它仍然是单例，但是这个单例只存在于*反派（villain）*这个领域中。

Now you know that a hero component can't access it. You've reduced your exposure to error.

现在，我们可以确信英雄组件不会访问它，因此减少了犯错误的机会。

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
想象一个外层的`HeroListComponent`，它显示一个超级英雄的列表。

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

One might suppose that the `HeroTaxReturnComponent` has logic to manage and restore changes.
That would be a pretty easy task for a simple hero tax return.
In the real world, with a rich tax return data model, the change management would be tricky.
You might delegate that management to a helper service, as this example does.

实现方式之一就是让`HeroTaxReturnComponent`有逻辑来管理和还原那些更改。
这对于简单的报税单来说是很容易的。
不过，在现实世界中，报税单的数据模型非常复杂，对这些修改的管理可能不得不投机取巧。
于是我们可以把这种管理任务委托给一个辅助服务，就像这个例子中所做的。

Here is the `HeroTaxReturnService`.
It caches a single `HeroTaxReturn`, tracks changes to that return, and can save or restore it.
It also delegates to the application-wide singleton `HeroService`, which it gets by injection.

这是一个报税单服务`HeroTaxReturnService`。
它缓存了单条`HeroTaxReturn`，用于跟踪那个申报单的变更，并且可以保存或还原它。
它还委托给了全应用级的单例服务`HeroService`，它是通过依赖注入机制取得的。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.service.ts" title="src/app/hero-tax-return.service.ts">

</code-example>

Here is the `HeroTaxReturnComponent` that makes use of it.

下面是正在使用它的`HeroTaxReturnComponent`组件。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.component.ts" title="src/app/hero-tax-return.component.ts">

</code-example>

The _tax-return-to-edit_ arrives via the input property which is implemented with getters and setters.
The setter initializes the component's own instance of the `HeroTaxReturnService` with the incoming return.
The getter always returns what that service says is the current state of the hero.
The component also asks the service to save and restore this tax return.

我们通过输入属性得到*要编辑的报税单*，我们把它实现成了读取器（getter）和设置器（setter）。
设置器根据传进来的报税单初始化了组件自己的`HeroTaxReturnService`实例。
读取器总是返回该服务所存英雄的当前状态。
组件也会请求该服务来保存或还原这个报税单。

There'd be big trouble if _this_ service were an application-wide singleton.
Every component would share the same service instance.
Each component would overwrite the tax return that belonged to another hero.
What a mess!

这里有个大问题，那就是如果*这个*服务是一个全应用范围的单例，每个组件就都会共享同一个服务实例，每个组件也都会覆盖属于其他英雄的报税单，真是一团糟！

Look closely at the metadata for the `HeroTaxReturnComponent`. Notice the `providers` property.

但仔细看`HeroTaxReturnComponent`的元数据，注意`providers`属性。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.component.ts" linenums="false" title="src/app/hero-tax-return.component.ts (providers)" region="providers">

</code-example>

The `HeroTaxReturnComponent` has its own provider of the `HeroTaxReturnService`.
Recall that every component _instance_ has its own injector.
Providing the service at the component level ensures that _every_ instance of the component gets its own, private instance of the service.
No tax return overwriting. No mess.

`HeroTaxReturnComponent`有它自己的`HeroTaxReturnService`提供商。
回忆一下，每个组件的*实例*都有它自己的注入器。
在组件级提供服务可以确保组件的*每个*实例都得到一个自己的、私有的服务实例。
报税单不会再被意外覆盖，这下清楚了。

<div class="l-sub-section">

The rest of the scenario code relies on other Angular features and techniques that you can learn about elsewhere in the documentation.
You can review it and download it from the <live-example></live-example>.

该场景代码中的其它部分依赖另一些Angular的特性和技术，我们将会在本文档的其它章节学到。
你可以到<live-example></live-example>查看代码和下载它。

</div>

### Scenario: specialized providers

### 场景：专门的提供商

Another reason to re-provide a service is to substitute a _more specialized_ implementation of that service,
deeper in the component tree.

重新提供服务的另一个原因，是在组件树的深层中把该服务替换为一个*更特殊的*实现。

Consider again the Car example from the [Dependency Injection](guide/dependency-injection) guide.
Suppose you configured the root injector (marked as A) with _generic_ providers for
`CarService`, `EngineService` and `TiresService`.

再次考虑[依赖注入](guide/dependency-injection)一章中车辆（Car）的例子。
假设我们在根注入器（代号A）中配置了*通用的*提供商：`CarService`、`EngineService`和`TiresService`。

You create a car component (A) that displays a car constructed from these three generic services.

我们创建了一个车辆组件（A），它显示一个从另外三个通用服务构造出的车辆。

Then you create a child component (B) that defines its own, _specialized_ providers for `CarService` and `EngineService`
that have special capabilites suitable for whatever is going on in component (B).

然后，我们创建一个子组件（B），它为`CarService`和`EngineService`定义了自己的*特殊的*提供商，它们具有更特殊的能力，适用于组件B的。

Component (B) is the parent of another component (C) that defines its own, even _more specialized_ provider for `CarService`.

组件B是另一个组件C的父组件，而组件C又定义了自己的，*更特殊的*`CarService`提供商。

<figure>
  <img src="generated/images/guide/dependency-injection/car-components.png" alt="car components">
</figure>

Behind the scenes, each component sets up its own injector with zero, one, or more providers defined for that component itself.

在幕后，每个组件都有自己的注入器，这个注入器带有为组件本身准备的0个、1个或多个提供商。

When you resolve an instance of `Car` at the deepest component (C),
its injector produces an instance of `Car` resolved by injector (C) with an `Engine` resolved by injector (B) and
`Tires` resolved by the root injector (A).

当我们在最深层的组件C解析`Car`的实例时，它使用注入器C解析生成了一个`Car`的实例，使用注入器B解析了`Engine`，而`Tires`则是由根注入器A解析的。

<figure>
  <img src="generated/images/guide/dependency-injection/injector-tree.png" alt="car injector tree">
</figure>

<div class="l-sub-section">

The code for this _cars_ scenario is in the `car.components.ts` and `car.services.ts` files of the sample
which you can review and download from the <live-example></live-example>.

*车辆*场景下的代码位于`car.components.ts`和`car.services.ts`文件中，这个例子你可以在<live-example></live-example>查看和下载。

</div>
