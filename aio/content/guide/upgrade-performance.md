# Upgrading for performance

# 更关注性能的升级方式

<div class="alert is-helpful">

  _Angular_ is the name for the Angular of today and tomorrow.<br />
  _AngularJS_ is the name for all 1.x versions of Angular.

  *Angular* 是当前以及未来的 Angular 名称。<br />
  *AngularJS* 特指 Angular 的所有 1.x 版本。

</div>

This guide describes some of the built-in tools for efficiently migrating AngularJS projects over to
the Angular platform, one piece at a time. It is very similar to
[Upgrading from AngularJS](guide/upgrade) with the exception that this one uses the {@link
downgradeModule downgradeModule()} helper function instead of the {@link UpgradeModule
UpgradeModule} class. This affects how the app is bootstrapped and how change detection is
propagated between the two frameworks. It allows you to upgrade incrementally while improving the
speed of your hybrid apps and leveraging the latest of Angular in AngularJS apps early in the
process of upgrading.

本指南介绍了一些用来将 AngularJS 项目高效地逐块迁移到 Angular 平台上的工具。
本章和[从 AngularJS 升级](guide/upgrade)很像，但是这里会用辅助函数 {@link downgradeModule downgradeModule()} 取代 {@link UpgradeModule UpgradeModule}。这会影响到应用如何启动，以及变更检测事件如何在两个框架之间传播。
它能让你逐步升级，并提高混合式应用的运行速度，并让你能在升级过程中尽早用上 Angular 中的最新特性。

## Preparation

## 准备工作

Before discussing how you can use `downgradeModule()` to create hybrid apps, there are things that
you can do to ease the upgrade process even before you begin upgrading. Because the steps are the
same regardless of how you upgrade, refer to the [Preparation](guide/upgrade#preparation) section of
[Upgrading from AngularJS](guide/upgrade).

在讨论你应该如何用 `downgradeModule()` 来创建混合式应用之前，你可以先采取一些措施来简化升级过程，甚至在开始升级之前就可以做。
无论你用哪种方式升级，这些步骤都是一样的，请参考[从 AngularJS 升级](guide/upgrade)的[准备工作](guide/upgrade#preparation)部分。

## Upgrading with `ngUpgrade`

## 使用 `ngUpgrade` 升级

With the `ngUpgrade` library in Angular you can upgrade an existing AngularJS app incrementally by
building a hybrid app where you can run both frameworks side-by-side. In these hybrid apps you can
mix and match AngularJS and Angular components and services and have them interoperate seamlessly.
That means you don't have to do the upgrade work all at once as there is a natural coexistence
between the two frameworks during the transition period.

使用 Angular 中的 `ngUpgrade` 库，你可以通过构建混合式应用来逐步升级现有的 AngularJS 应用。在这些混合式应用中，你可以混用 AngularJS 和 Angular 的组件与服务，并让它们天衣无缝地进行互操作。
这意味着你不用一次性完成迁移工作，因为在过渡阶段两个框架可以自然共存。

### How `ngUpgrade` Works

### `ngUpgrade` 的工作原理

Regardless of whether you choose `downgradeModule()` or `UpgradeModule`, the basic principles of
upgrading, the mental model behind hybrid apps, and how you use the {@link upgrade/static
upgrade/static} utilities remain the same. For more information, see the
[How `ngUpgrade` Works](guide/upgrade#how-ngupgrade-works) section of
[Upgrading from AngularJS](guide/upgrade).

无论选择 `downgradeModule()` 还是 `UpgradeModule`，升级的基本原则都是一样的：无论是混合式应用背后的心智模型，还是 {@link upgrade/static upgrade/static} 的用法。
要了解更多，参见[从 AngularJS 升级](guide/upgrade)的 [`ngUpgrade` 工作原理](guide/upgrade#how-ngupgrade-works)部分。

<div class="alert is-helpful">

  The [Change Detection](guide/upgrade#change-detection) section of
  [Upgrading from AngularJS](guide/upgrade) only applies to apps that use `UpgradeModule`. Though
  you handle change detection differently with `downgradeModule()`, which is the focus of this
  guide, reading the [Change Detection](guide/upgrade#change-detection) section provides helpful
  context for what follows.

  [从 AngularJS 升级](guide/upgrade)中的[变更检测](guide/upgrade#change-detection)部分仅仅适用于使用 `UpgradeModule` 的应用。
  虽然你处理变更检测的方式和 `downgradeModule()`（本章的重点）不同，不过读一下[变更检测](guide/upgrade#change-detection)部分还是能为后续内容提供一些有用的上下文知识。

</div>

#### Change Detection with `downgradeModule()`

#### 使用 `downgradeModule()` 进行变更检测

As mentioned before, one of the key differences between `downgradeModule()` and `UpgradeModule` has
to do with change detection and how it is propagated between the two frameworks.

如前所述，`downgradeModule()` 和 `UpgradeModule` 之间的一个关键区别，就是如何进行变更检测，以及检测结果如何在两个框架之间传播。

With `UpgradeModule`, the two change detection systems are tied together more tightly. Whenever
something happens in the AngularJS part of the app, change detection is automatically triggered on
the Angular part and vice versa. This is convenient as it ensures that neither framework misses an
important change. Most of the time, though, these extra change detection runs are unnecessary.

使用 `UpgradeModule`，两套变更检测系统绑得更紧密一些。
一旦应用中的 AngularJS 部分发生了某些变化，变更检测就会自动在 Angular 部分触发它，反之亦然。
这很方便，因为它保证了任何一个框架都不会丢失重要的变更。不过，其实大多数情况下并不需要运行这些额外的变更检测。

`downgradeModule()`, on the other side, avoids explicitly triggering change detection unless it
knows the other part of the app is interested in the changes. For example, if a downgraded component
defines an `@Input()`, chances are that the app needs to be aware when that value changes. Thus,
`downgradeComponent()` automatically triggers change detection on that component.

而 `downgradeModule()` 会避免显式触发变更检测，除非它确信应用的其它部分对此感兴趣。
比如，如果被降级的组件定义了 `@Input()`，当那个值发生变化时，应用就可能需要知道。
因此，`downgradeComponent()` 就会自动在该组件上触发变更检测。

In most cases, though, the changes made locally in a particular component are of no interest to the
rest of the app. For example, if the user clicks a button that submits a form, the component usually
handles the result of this action. That being said, there _are_ cases where you want to propagate
changes to some other part of the app that may be controlled by the other framework. In such cases,
you are responsible for notifying the interested parties by manually triggering change detection.

但是，大多数情况下，应用的其它地方并不会关心某个组件中进行的局部更改。
比如，如果用户点击了某个表单的提交按钮，通常会由组件自行处理这个操作的结果。
话虽如此，但在某些情况下，你可能希望把这些变化传播到应用中由另一个框架控制的部分。
这时候，你就有责任通过手动触发变更检测来通知相关方。

If you want a particular piece of code to trigger change detection in the AngularJS part of the app,
you need to wrap it in
[scope.$apply()](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply). Similarly, for
triggering change detection in Angular you would use {@link NgZone#run ngZone.run()}.

如果你希望某些代码片段在应用的 AngularJS 部分触发变更检测，就要把它包在 [scope.$apply()](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply) 中。
同样，要想在 Angular 中触发变更检测，就要调用 {@link NgZone#run ngZone.run()}。

In many cases, a few extra change detection runs may not matter much. However, on larger or
change-detection-heavy apps they can have a noticeable impact. By giving you more fine-grained
control over the change detection propagation, `downgradeModule()` allows you to achieve better
performance for your hybrid apps.

很多情况下，是否运行额外的变更检测可能并不重要。不过，在较大或变更检测较多的应用中，它们可能会产生显著地影响。
通过让你更精细的控制变更检测的传播方式，`downgradeModule()` 可以让你的混合式应用达到更好地性能。

## Using `downgradeModule()`

## 使用 `downgradeModule()`

Both AngularJS and Angular have their own concept of modules to help organize an app into cohesive
blocks of functionality.

AngularJS 和 Angular 都有自己的模块概念，来帮你把应用按功能组织成内聚的代码块。

Their details are quite different in architecture and implementation. In AngularJS, you create a
module by specifying its name and dependencies with
[angular.module()](https://docs.angularjs.org/api/ng/function/angular.module). Then you can add
assets using its various methods. In Angular, you create a class adorned with an {@link NgModule
NgModule} decorator that describes assets in metadata.

它们在架构和实现方面的细节有很大不同。在 AngularJS 中，你可以用 [angular.module()](https://docs.angularjs.org/api/ng/function/angular.module) 指定名字和依赖，以创建一个模块。
然后，你可以使用它的各种方法添加资产。在 Angular 中，你要创建一个带有 {@link NgModule NgModule} 装饰器的类，靠这个装饰器的元数据来描述这些资产。

In a hybrid app you run both frameworks at the same time. This means that you need at least one
module each from both AngularJS and Angular.

在混合式应用中，你同时运行着两个框架。这意味着你至少需要一个来自 AngularJS 的模块和一个来自 Angular 的模块。

For the most part, you specify the modules in the same way you would for a regular app. Then, you
use the `upgrade/static` helpers to let the two frameworks know about assets they can use from each
other. This is known as "upgrading" and "downgrading".

大多数情况下，你可以使用与常规应用程序相同的方式来指定模块。然后，使用 `upgrade/static` 辅助函数来让两个框架了解对方使用的资产。这叫做"升级（upgrading）"和"降级（downgrading）"。

<div class="alert is-helpful">

  <b>Definitions:</b>

  <b>定义：</b>

  - _Upgrading_: The act of making an AngularJS asset, such as a component or service, available to
    the Angular part of the app.

    *升级*：让 AngularJS 中的资产，比如组件或服务，可用于应用中的 Angular 部分。

  - _Downgrading_: The act of making an Angular asset, such as a component or service, available to
    the AngularJS part of the app.

    *降级*：让 Angular 中的资产，比如组件或服务，可用于应用中的 AngularJS 部分

</div>

An important part of inter-linking dependencies is linking the two main modules together. This is
where `downgradeModule()` comes in. Use it to create an AngularJS module&mdash;one that you can use
as a dependency in your main AngularJS module&mdash;that will bootstrap your main Angular module and
kick off the Angular part of the hybrid app. In a sense, it "downgrades" an Angular module to an
AngularJS module.

依赖互联中最重要的部分之一是把两个主模块联结在一起。这就是 `downgradeModule()` 的用武之地。使用它来创建 AngularJS 模块（你可以在 AngularJS 主模块中把这个模块用作依赖项），该模块将引导你的 Angular 主模块，并启动混合式应用中的 Angular 部分。从某种意义上说，它把 NgModule "降级"成了 AngularJS 模块。

There are a few things to note, though:

有几点需要注意：

1. You don't pass the Angular module directly to `downgradeModule()`. All `downgradeModule()` needs
   is a "recipe", for example, a factory function, to create an instance for your module.

   你不必把 Angular 模块直接传给 `downgradeModule()`。`downgradeModule()` 所需要的只是一个用来创建模块实例 "配方"（比如工厂函数）。

2. The Angular module is not instantiated until the app actually needs it.

   除非应用实际用到了，否则不会初始化这个 Angular 模块。

The following is an example of how you can use `downgradeModule()` to link the two modules.

下面是如何使用 `downgradeModule()` 来联结两个模块的例子。

```ts
// Import `downgradeModule()`.
import { downgradeModule } from '@angular/upgrade/static';

// Use it to downgrade the Angular module to an AngularJS module.
const downgradedModule = downgradeModule(MainAngularModuleFactory);

// Use the downgraded module as a dependency to the main AngularJS module.
angular.module('mainAngularJsModule', [
  downgradedModule
]);
```

#### Specifying a factory for the Angular module

#### 为 Angular 模块指定一个工厂

As mentioned earlier, `downgradeModule()` needs to know how to instantiate the Angular module. It
needs a recipe. You define that recipe by providing a factory function that can create an instance
of the Angular module. `downgradeModule()` accepts two types of factory functions:

如前所述，`downgradeModule()` 需要知道如何实例化 Angular 模块。你可以通过提供可以创建 Angular 模块实例的工厂函数来定义该配方。
`downgradeModule()` 接受两种类型的工厂函数：

1. `NgModuleFactory`
2. `(extraProviders: StaticProvider[]) => Promise<NgModuleRef>`

When you pass an `NgModuleFactory`, `downgradeModule()` uses it to instantiate the module using
{@link platformBrowser platformBrowser}'s {@link PlatformRef#bootstrapModuleFactory
bootstrapModuleFactory()}, which is compatible with ahead-of-time (AOT) compilation. AOT compilation
helps make your apps load faster. For more about AOT and how to create an `NgModuleFactory`, see the
[Ahead-of-Time Compilation](guide/aot-compiler) guide.

当传入 `NgModuleFactory` 时，`downgradeModule()` 会把它传给 {@link platformBrowser platformBrowser} 的 {@link PlatformRef#bootstrapModuleFactory bootstrapModuleFactory()} 来实例化模块。它与预先（AOT）编译模式兼容。
预先编译能让你的应用加载更快。要了解预先编译的更多知识，以及如何创建 `NgModuleFactory`，参见 [预先编译](guide/aot-compiler) 章。

Alternatively, you can pass a plain function, which is expected to return a promise resolving to an
{@link NgModuleRef NgModuleRef} (i.e. an instance of your Angular module). The function is called
with an array of extra {@link StaticProvider Providers} that are expected to be available on the
returned `NgModuleRef`'s {@link Injector Injector}. For example, if you are using {@link
platformBrowser platformBrowser} or {@link platformBrowserDynamic platformBrowserDynamic}, you can
pass the `extraProviders` array to them:

另外，你还可以传入一个普通函数，它要返回一个解析为 {@link NgModuleRef NgModuleRef}（比如你的 Angular 模块） 的 Promise。该函数接收一个额外 {@link StaticProvider Providers} 的数组，这个数组可以在所返回 `NgModuleRef` 的 {@link Injector Injector} 中可用。
例如，如果你在使用 {@link platformBrowser platformBrowser} 或 {@link platformBrowserDynamic platformBrowserDynamic}，就可以把 `extraProviders` 数组传给它们：

```ts
const bootstrapFn = (extraProviders: StaticProvider[]) => {
  const platformRef = platformBrowserDynamic(extraProviders);
  return platformRef.bootstrapModule(MainAngularModule);
};
// or
const bootstrapFn = (extraProviders: StaticProvider[]) => {
  const platformRef = platformBrowser(extraProviders);
  return platformRef.bootstrapModuleFactory(MainAngularModuleFactory);
};
```

Using an `NgModuleFactory` requires less boilerplate and is a good default option as it supports AOT
out-of-the-box. Using a custom function requires slightly more code, but gives you greater
flexibility.

使用 `NgModuleFactory` 需要更少的样板代码，并且是一个很好的默认选项，因为它支持 AOT 开箱即用。
使用自定义函数需要稍多的代码，但是给你提供了更大的灵活性。

#### Instantiating the Angular module on-demand

#### 按需实例化 Angular 模块

Another key difference between `downgradeModule()` and `UpgradeModule` is that the latter requires
you to instantiate both the AngularJS and Angular modules up-front. This means that you have to pay
the cost of instantiating the Angular part of the app, even if you don't use any Angular assets
until later. `downgradeModule()` is again less aggressive. It will only instantiate the Angular part
when it is required for the first time; that is, as soon as it needs to create a downgraded
component.

`downgradeModule()` 和 `UpgradeModule` 之间的另一个关键区别，就是后者要求你预先实例化 AngularJS 和 Angular 的模块。
这意味着你必须为实例化应用中的 Angular 而付出代价 —— 即使你以后不会用到任何 Angular 资产。
`downgradeModule()` 则不那么激进。它只会在第一次用到时才实例化 Angular 部分，也就是说，当它需要实例化一个降级后的组件时。

You could go a step further and not even download the code for the Angular part of the app to the
user's browser until it is needed. This is especially useful when you use Angular on parts of the
hybrid app that are not necessary for the initial rendering or that the user doesn't reach.

你还可以更进一步，甚至不必将应用程序中 Angular 部分的代码下载到用户的浏览器中 —— 直到需要它的那一刻。
当不需要初始渲染或用户尚未访问到混合式应用中的 Angular 部分时，这特别有用。

A few examples are:

举一些例子：

- You use Angular on specific routes only and you don't need it until/if a user visits such a route.

  你只想在特定的路由上使用 Angular，除非用户访问此路由，否则你不需要它。

- You use Angular for features that are only visible to specific types of users; for example,
  logged-in users, administrators, or VIP members. You don't need to load Angular until a user is
  authenticated.

  你可以将 Angular 用于仅对特定类型的用户可见的特性，比如：登录用户、管理员或 VIP 成员。这样在用户通过了身份验证之前，你都无需加载 Angular。

- You use Angular for a feature that is not critical for the initial rendering of the app and you
  can afford a small delay in favor of better initial load performance.

  你可以把 Angular 用于应用中那些在初始渲染时不太重要的特性，并且愿意为了更好地初始加载性能，而忍受加载该特性时的一点延迟。

### Bootstrapping with `downgradeModule()`

### 通过 `downgradeModule()` 启动

As you might have guessed, you don't need to change anything in the way you bootstrap your existing
AngularJS app. Unlike `UpgradeModule`&mdash;which requires some extra steps&mdash;
`downgradeModule()` is able to take care of bootstrapping the Angular module, as long as you provide
the recipe.

你可能已经猜到了，你不需要修改引导现有 AngularJS 应用的方式。`UpgradeModule` 需要一些额外的步骤，但 `downgradeModule()` 能自行引导 Angular 模块，你只要为它提供配方即可。

In order to start using any `upgrade/static` APIs, you still need to load the Angular framework as
you would in a normal Angular app. You can see how this can be done with SystemJS by following the
instructions in the [Upgrade Setup](guide/upgrade-setup "Setup for Upgrading from AngularJS") guide, selectively copying code from the
[QuickStart github repository](https://github.com/angular/quickstart).

要开始使用任何 `upgrade/static` API，你仍然要像在普通 Angular 应用中一样加载 Angular 框架。要想用 SystemJS 做到这一点，你可以遵循[升级的准备工作](guide/upgrade-setup "Setup for Upgrading from AngularJS")中的指导，有选择的从[快速上手项目的 Github 仓库](https://github.com/angular/quickstart)中复制代码。

You also need to install the `@angular/upgrade` package via `npm install @angular/upgrade --save`
and add a mapping for the `@angular/upgrade/static` package:

你还需要用 `npm install @angular/upgrade --save` 安装 `@angular/upgrade` 包，并添加一个指向 `@angular/upgrade/static` 包的映射：

<code-example header="system.config.js">
'@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
</code-example>

Next, create an `app.module.ts` file and add the following `NgModule` class:

接下来，创建一个 `app.module.ts` 文件，并添加如下 `NgModule` 类：

<code-example header="app.module.ts">
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ]
})
export class MainAngularModule {
  // Empty placeholder method to satisfy the `Compiler`.
  ngDoBootstrap() {}
}
</code-example>

This bare minimum `NgModule` imports `BrowserModule`, the module every Angular browser-based app
must have. It also defines an empty `ngDoBootstrap()` method, to prevent the {@link Compiler
Compiler} from returning errors. This is necessary because the module will not have a `bootstrap`
declaration on its `NgModule` decorator.

这个最小的 `NgModule` 导入了 `BrowserModule`，Angular 每个基于浏览器的应用都会导入该模块。
它还定义了一个空的 `ngDoBootstrap()` 方法，来防止 {@link Compiler Compiler} 返回错误。
在这里它是必要的，因为 `NgModule` 装饰器上还没有声明 `bootstrap`。

<div class="alert is-important">

  You do not add a `bootstrap` declaration to the `NgModule` decorator since AngularJS owns the root
  template of the app and `ngUpgrade` bootstraps the necessary components.

  你不用把 `bootstrap` 声明加到 `NgModule` 装饰器上，因为 AngularJS 拥有应用的根组件，并且 `ngUpgrade` 会负责启动必要的组件。

</div>

You can now link the AngularJS and Angular modules together using `downgradeModule()`.

现在你可以用 `downgradeModule()` 把 AngularJS 和 Angular 的模块联结在一起。

<code-example header="app.module.ts">
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { downgradeModule } from '@angular/upgrade/static';

const bootstrapFn = (extraProviders: StaticProvider[]) => {
  const platformRef = platformBrowserDynamic(extraProviders);
  return platformRef.bootstrapModule(MainAngularModule);
};
const downgradedModule = downgradeModule(bootstrapFn);

angular.module('mainAngularJsModule', [
  downgradedModule
]);
</code-example>

The existing AngularJS code works as before _and_ you are ready to start adding Angular code.

现有的 AngularJS 代码仍然在和以前一样正常工作，但你已经可以开始添加新的 Angular 代码了。

### Using Components and Injectables

### 使用组件与可注入对象

The differences between `downgradeModule()` and `UpgradeModule` end here. The rest of the
`upgrade/static` APIs and concepts work in the exact same way for both types of hybrid apps.
See [Upgrading from AngularJS](guide/upgrade) to learn about:

`downgradeModule()` 和 `UpgradeModule` 之间的区别就是这些。
其余的 `upgrade/static` API 和概念的工作方式在不同的混合式应用中都完全一样了。
欲知详情，参见[从 AngularJS 升级](guide/upgrade)。

- [Using Angular Components from AngularJS Code](guide/upgrade#using-angular-components-from-angularjs-code).<br />
  _NOTE: If you are downgrading multiple modules, you need to specify the name of the downgraded
  module each component belongs to, when calling `downgradeComponent()`._

  [从 AngularJS 代码中使用 Angular 组件](guide/upgrade#using-angular-components-from-angularjs-code)。<br />
  *注意：如果你要降级多个模块，就要在调用 `downgradeComponent()` 时为每个组件所属的降级后模块指定一个模块名。*

- [Using AngularJS Component Directives from Angular Code](guide/upgrade#using-angularjs-component-directives-from-angular-code).

  [如何从 Angular 代码中使用 AngularJS 组件和指令](guide/upgrade#using-angularjs-component-directives-from-angular-code)

- [Projecting AngularJS Content into Angular Components](guide/upgrade#projecting-angularjs-content-into-angular-components).

  [把 AngularJS 的内容投影进 Angular 组件中](guide/upgrade#projecting-angularjs-content-into-angular-components)。

- [Transcluding Angular Content into AngularJS Component Directives](guide/upgrade#transcluding-angular-content-into-angularjs-component-directives).

  [把 Angular 的内容透传进 AngularJS 组件和指令中](guide/upgrade#transcluding-angular-content-into-angularjs-component-directives)。

- [Making AngularJS Dependencies Injectable to Angular](guide/upgrade#making-angularjs-dependencies-injectable-to-angular).

  [让 AngularJS 的依赖可注入到 Angular 中](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)。

- [Making Angular Dependencies Injectable to AngularJS](guide/upgrade#making-angular-dependencies-injectable-to-angularjs).<br />
  _NOTE: If you are downgrading multiple modules, you need to specify the name of the downgraded
  module each injectable belongs to, when calling `downgradeInjectable()`._

  [让 Angular 的依赖可注入到 AngularJS 中](guide/upgrade#making-angular-dependencies-injectable-to-angularjs)。
  *注意：如果你正在降级多个模块，就要在调用 `downgradeInjectable()` 时为每个包含可注入对象的模块指定降级后的模块名。*

<div class="alert is-important">

  While it is possible to downgrade injectables, downgraded injectables will not be available until
  the Angular module that provides them is instantiated. In order to be safe, you need to ensure
  that the downgraded injectables are not used anywhere _outside_ the part of the app where it is
  guaranteed that their module has been instantiated.

  虽然可以降级可注入对象，但在实例化 Angular 模块之前，无法使用降级后的可注入对象。
  安全起见，你需要确保降级后的可注入对象不会用于应用中*不受* Angular 控制的任何地方。

  For example, it is _OK_ to use a downgraded service in an upgraded component that is only used
  from a downgraded Angular component provided by the same Angular module as the injectable, but it
  is _not OK_ to use it in an AngularJS component that may be used independently of Angular or use
  it in a downgraded Angular component from a different module.

  比如，在只使用 Angular 组件的已升级组件中*可以*使用降级后的服务，但是，*不能*在那些不依赖 Angular 的 AngularJS 组件中使用它，也不能从其它模块中使用降级过的 Angular 组件。

</div>

## Using ahead-of-time compilation with hybrid apps

## 使用混合式应用进行预先编译

You can take advantage of ahead-of-time (AOT) compilation in hybrid apps just like in any other
Angular app. The setup for a hybrid app is mostly the same as described in the
[Ahead-of-Time Compilation](guide/aot-compiler) guide save for differences in `index.html` and
`main-aot.ts`.

你可以像在任何其它 Angular 应用中一样，利用混合式应用的预先（AOT）编译功能。
混合式应用的设置与[预先（AOT）编译](guide/aot-compiler)一章所讲的大致相同，但 `index.html` 和 `main-aot.ts` 略有差异。

AOT needs to load any AngularJS files that are in the `<script>` tags in the AngularJS `index.html`.
An easy way to copy them is to add each to the `copy-dist-files.js` file.

AOT 需要在 AngularJS 的 `index.html` 中的 `<script>` 标签中加载所有 AngularJS 文件。

You also need to pass the generated `MainAngularModuleFactory` to `downgradeModule()` instead of the
custom bootstrap function:

你还要将所生成的 `MainAngularModuleFactory` 传给 `downgradeModule()` 函数，而不是自定义引导函数。

<code-example header="app/main-aot.ts">
import { downgradeModule } from '@angular/upgrade/static';
import { MainAngularModuleNgFactory } from '../aot/app/app.module.ngfactory';

const downgradedModule = downgradeModule(MainAngularModuleNgFactory);

angular.module('mainAngularJsModule', [
  downgradedModule
]);
</code-example>

And that is all you need to do to get the full benefit of AOT for hybrid Angular apps.

这就是当你想让混合式应用受益于 AOT 时所要做的一切。

## Conclusion

## 总结

This page covered how to use the {@link upgrade/static upgrade/static} package to incrementally
upgrade existing AngularJS apps at your own pace and without impeding further development of the app
for the duration of the upgrade process.

该页面介绍了如何借助 {@link upgrade/static upgrade/static} 包，来按照你自己的节奏逐步升级现有的 AngularJS 应用。并且升级过程中不会方案此应用的进一步开发。

Specifically, this guide showed how you can achieve better performance and greater flexibility in
your hybrid apps by using {@link downgradeModule downgradeModule()} instead of {@link UpgradeModule
UpgradeModule}.

具体来说，本章介绍了如何使用 {@link downgradeModule downgradeModule()} 来代替 {@link UpgradeModule UpgradeModule}，为混合式应用提供更好的性能和更大的灵活性。

To summarize, the key differentiating factors of `downgradeModule()` are:

总结，`downgradeModule()` 中的关键差异性因素是：

1. It allows instantiating or even loading the Angular part lazily, which improves the initial
   loading time. In some cases this may waive the cost of running a second framework altogether.

   它允许实例化甚至惰性加载 Angular 部分，这能改善初始加载时间。某些情况下，这可能会完全免除启动第二个框架的成本。

2. It improves performance by avoiding unnecessary change detection runs while giving the developer
   greater ability to customize.

   通过避免运行不必要的变更检测，它提高了性能，给开发人员提供了更大的自定义能力。

3. It does not require you to change how you bootstrap your AngularJS app.

   它不需要你更改引导 AngularJS 应用的方式。

Using `downgradeModule()` is a good option for hybrid apps when you want to keep the AngularJS and
Angular parts less coupled. You can still mix and match components and services from both
frameworks, but you might need to manually propagate change detection. In return,
`downgradeModule()` offers more control and better performance.

当你希望混合式应用的 AngularJS 部分和 Angular 部分保持松耦合时，使用 `downgradeModule()` 是个很好的选择。
你仍然可以混用并匹配两个框架中的组件和服务。作为回报，`downgradeModule()` 为你提供了更大的控制权和更好的性能。
