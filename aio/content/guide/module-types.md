# Guidelines for creating NgModules

# 模块(NgModule)创建指南

This topic provides a conceptual overview of the different categories of [NgModules](guide/glossary#ngmodule "Definition of NgModule") you can create in order to organize your code in a modular structure.
These categories are not cast in stone—they are suggestions.
You may want to create NgModules for other purposes, or combine the characteristics of some of these categories.

本主题提供了一个概念性的概述，讲的是你可以创建不同类别的[模块](guide/glossary#ngmodule "NgModule 的定义") 使用模块化结构来组织代码。这些类别并不是一成不变的，而是建议性的。你可能想为其他目的创建模块，或者把其中某些类别的特征结合在一起。

NgModules are a great way to organize an app and keep code related to a specific functionality or feature separate from other code.
Use NgModules to consolidate [components](guide/glossary#component "Definition of component"), [directives](guide/glossary#directive "Definition of directive"), and [pipes](guide/glossary#pipe "Definition of pipe)") into cohesive blocks of functionality.
Focus each block on a feature or business domain, a workflow or navigation flow, a common collection of utilities, or one or more [providers](guide/glossary#provider "Definition of provider") for [services](guide/glossary#service "Definition of service").

模块是组织应用的好办法，可以让与特定功能或特性有关的代码与其他代码分开。可以使用模块把[组件](guide/glossary#component "组件的定义")，[指令](guide/glossary#directive "指令的定义")和[管道](guide/glossary#pipe "管子的定义）")整合成一些内聚的代码块。专注于某项功能或业务领域、工作流程或导航流程、通用工具集，或者一个或多个[服务](guide/glossary#service "服务定义")[提供者](guide/glossary#provider "提供者的定义")。

For more about NgModules, see [Organizing your app with NgModules](guide/ngmodules "Organizing your app with NgModules").

关于模块的更多信息，请参阅[使用模块组织你的应用](guide/ngmodules "使用 NgModules 整理你的应用")。

<div class="alert is-helpful">

For the example app used in NgModules-related topics, see the <live-example name="ngmodules"></live-example>.

要获得模块相关主题中使用的范例应用，参阅<live-example name="ngmodules"></live-example>。

</div>

## Summary of NgModule categories

## 模块类别汇总

All apps start by [bootstrapping a root NgModule](guide/bootstrapping "Launching an app with a root NgModule").
You can organize your other NgModules any way you wish.

所有的应用都是从[引导一个根模块](guide/bootstrapping "用 NgModule 根启动一款应用")开始的。你可以按照自己喜欢的方式组织其它模块。

This topic provides some guidelines for the following general categories of NgModules:

本主题为下列常见模块类别提供了一些指导：

* [Domain](#domain): A domain NgModule is organized around a feature, business domain, or user experience.

  [领域模块](#domain)：领域模块围绕特性、业务领域或用户体验进行组织。

* [Routed](#routed): The top component of the NgModule acts as the destination of a [router](guide/glossary#router "Definition of router") navigation route.

  [带路由的模块](#routed)：模块的顶层组件充当[路由器](guide/glossary#router "路由器的定义")访问这部分路由时的目的地。

* [Routing](#routing): A routing NgModule provides the routing configuration for another NgModule.

  [路由配置模块](#routing)：路由配置模块为另一个模块提供路由配置。

* [Service](#service): A service NgModule provides utility services such as data access and messaging.

  [服务模块](#service)：服务模块提供实用服务，比如数据访问和消息传递。

* [Widget](#widget): A widget NgModule makes a component, directive, or pipe available to other NgModules.

  [小部件](#widget)：小部件模块可以为其它模块提供某些组件、指令或管道。

* [Shared](#shared): A shared NgModule makes a set of components, directives, and pipes available to other NgModules.

  [共享模块](#shared)：共享模块可以为其它的模块提供组件，指令和管道的集合。

The following table summarizes the key characteristics of each category.

下表总结了每个类别的主要特性。

<table>
 <tr>
   <th style="vertical-align: top">
     NgModule
   </th>

   <th style="vertical-align: top">
     Declarations
   </th>

   <th style="vertical-align: top">
     Providers
   </th>

   <th style="vertical-align: top">
     Exports
   </th>

   <th style="vertical-align: top">
     Imported by
   </th>
 </tr>
 <tr>
   <th style="vertical-align: top">
     模块
   </th>

   <th style="vertical-align: top">
     可声明对象
   </th>

   <th style="vertical-align: top">
     提供者
   </th>

   <th style="vertical-align: top">
     导出
   </th>

   <th style="vertical-align: top">
     被谁导入
   </th>
 </tr>

 <tr>
   <td>Domain</td>
   <td>Yes</td>
   <td>Rare</td>
   <td>Top component</td>
   <td>Another domain, AppModule</td>
 </tr>
 <tr>
   <td>领域模块</td>
   <td>是</td>
   <td>罕见</td>
   <td>顶级组件</td>
   <td>其它领域模块、根模块</td>
 </tr>

 <tr>
   <td>Routed</td>
   <td>Yes</td>
   <td>Rare</td>
   <td>No</td>
   <td>None</td>
 </tr>
 <tr>
   <td>带路由的模块</td>
   <td>是</td>
   <td>罕见</td>
   <td>否</td>
   <td>无</td>
 </tr>

 <tr>
   <td>Routing</td>
   <td>No</td>
   <td>Yes (Guards)</td>
   <td>RouterModule</td>
   <td>Another domain (for routing)</td>
 </tr>
 <tr>
   <td>路由定义模块</td>
   <td>否</td>
   <td>是 (路由守卫)</td>
   <td>RouterModule</td>
   <td>其它领域模块（为获取路由定义）</td>
 </tr>

 <tr>
   <td>Service</td>
   <td>No</td>
   <td>Yes</td>
   <td>No</td>
   <td>AppModule</td>
 </tr>
 <tr>
   <td>服务模块</td>
   <td>否</td>
   <td>是</td>
   <td>否</td>
   <td>AppModule</td>
 </tr>

 <tr>
   <td>Widget</td>
   <td>Yes</td>
   <td>Rare</td>
   <td>Yes</td>
   <td>Another domain</td>
 </tr>
 <tr>
   <td>小部件模块</td>
   <td>是</td>
   <td>罕见</td>
   <td>是</td>
   <td>其它领域模块</td>
 </tr>

 <tr>
   <td>Shared</td>
   <td>Yes</td>
   <td>No</td>
   <td>Yes</td>
   <td>Another domain</td>
 </tr>
 <tr>
   <td>共享模块</td>
   <td>是</td>
   <td>否</td>
   <td>是</td>
   <td>其它领域模块</td>
 </tr>
</table>

{@a domain}

## Domain NgModules

## 领域模块

Use a domain NgModule to deliver a user experience dedicated to a particular feature or app domain, such as editing a customer or placing an order.
One example is `ContactModule` in the <live-example name="ngmodules"></live-example>.

使用领域模块来提供专属于特定功能或应用领域的界面，比如编辑客户或下单。例子之一是 <live-example name="ngmodules"></live-example> 中的 `ContactModule`。

A domain NgModule organizes the code related to a certain function, containing all of the components, routing, and templates that make up the function.
Your top component in the domain NgModule acts as the feature or domain's root, and is the only component you export.
Private supporting subcomponents descend from it.

领域模块用来组织与特定功能有关的代码，里面包含构成此功能的所有组件、路由和模板。领域模块中的顶级组件是该特性或领域的根，是你要导出的唯一组件。各种私有的支撑子组件都是它的后代。

Import a domain NgModule exactly once into another NgModule, such as a domain NgModule, or into the root NgModule (`AppModule`) of an app that contains only a few NgModules.

领域模块要导入到另一个模块中一次并且只能一次，比如一个领域模块，或者一个只包含少量模块的应用的根模块（`AppModule`）中。

Domain NgModules consist mostly of declarations.
You rarely include providers.
If you do, the lifetime of the provided services should be the same as the lifetime of the NgModule.

领域模块主要由可声明对象组成，很少会在此提供服务。如果一定要提供，那么这些服务的生命周期应和该模块的生命周期一致。

<div class="alert is-helpful">

For more information about lifecycles, see [Hooking into the component lifecycle](guide/lifecycle-hooks "Hooking into the component lifecycle").

关于生命周期的详细信息，请参阅[“组件生命周期钩子”](guide/lifecycle-hooks "进入组件的生命周期") 。

</div>

{@a routed}

## Routed NgModules

## 带路由的模块

Use a routed NgModule for all [lazy-loaded NgModules](guide/lazy-loading-ngmodules "Lazy-loading an NgModule").
Use the top component of the NgModule as the destination of a router navigation route.
Routed NgModules don’t export anything because their components never appear in the template of an external component.

所有[惰性加载模块](guide/lazy-loading-ngmodules "懒惰加载一个 NgModule")都要用带路由的模块。使用该模块的顶级组件作为路由器导航路由的目标。带路由的模块不会导出任何内容，因为它们的组件永远不会出现在外部组件的模板中。

Don't import a lazy-loaded routed NgModule into another NgModule, as this would trigger an eager load, defeating the purpose of lazy loading.

不要把惰性加载的带路由的模块导入到另一个模块中，因为这会触发一个急性加载，从而破坏了惰性加载它的目的。

Routed NgModules rarely have providers because you load a routed NgModule only when needed (such as for routing).
Services listed in the NgModules' `provider` array would not be available because the root injector wouldn’t know about the lazy-loaded NgModule.
If you include providers, the lifetime of the provided services should be the same as the lifetime of the NgModule.
Don't provide app-wide [singleton services](guide/singleton-services) in a routed NgModule or in an NgModule that the routed NgModule imports.

带路由的模块很少有提供者，因为你只在需要的时候加载带路由的模块（例如通过路由导航过来时）。 `provider` 数组中列出的服务不可用，因为根注入器不可能预先知道惰性加载的模块。如果你包含了提供者，那么它们所提供的服务的生命周期应该和该模块的生命周期完全一样。不要在带路由的模块及其导入的相关模块中提供全应用范围内的[单例服务。](guide/singleton-services)。

<div class="alert is-helpful">

For more information about providers and lazy-loaded routed NgModules, see [Limiting provider scope](guide/providers#limiting-provider-scope-by-lazy-loading-modules "Providing dependencies: Limiting provider scope").

关于服务提供者和惰性加载的带路由模块的更多信息，请参阅[限制提供者的范围](guide/providers#limiting-provider-scope-by-lazy-loading-modules "提供依赖：限制提供者范围")。

</div>

{@a routing}

## Routing NgModules

## 路由定义模块

Use a routing NgModule to provide the routing configuration for a domain NgModule, thereby separating routing concerns from its companion domain NgModule.
One example is `ContactRoutingModule` in the <live-example name="ngmodules"></live-example>, which provides the routing for its companion domain NgModule `ContactModule`.

使用路由定义模块来为领域模块提供路由配置，从而将路由相关的关注点从其伴生领域模块中分离出来。例子之一是 <live-example name="ngmodules"></live-example> 中的 `ContactRoutingModule`，它为其伴生领域模块 `ContactModule` 提供路由。

<div class="alert is-helpful">

For an overview and details about routing, see [In-app navigation: routing to views](guide/router "In-app navigation: routing to views").

关于路由定义的概述和详细信息，请参阅[应用内导航：路由到视图](guide/router "路由应用内导航：路由到视图")。

</div>

Use a routing NgModule to do the following tasks:

使用路由定义模块来完成如下任务：

* Define routes.

  定义路由。

* Add router configuration to the NgModule's import.

  把路由器配置文件添加到模块的导入表中。

* Add guard and resolver service providers to the NgModule's providers.

  往模块的提供者列表中添加路由守卫和解析器（resolver）提供者。

The name of the routing NgModule should parallel the name of its companion NgModule, using the suffix `Routing`.
For example, <code>ContactModule</code> in <code>contact.module.ts</code> has a routing NgModule named <code>ContactRoutingModule</code> in <code>contact-routing.module.ts</code>.

路由定义模块的名字应该和其伴生模块的名字平行，但使用 `Routing` 后缀。例如， `contact.module.ts` 中的 `ContactModule` 有一个位于 `contact-routing.module.ts` 中的名为 `ContactRoutingModule` 的路由定义模块。

Import a routing NgModule only into its companion NgModule.
If the companion NgModule is the root <code>AppModule</code>, the <code>AppRoutingModule</code> adds router configuration to its imports with <code>RouterModule.forRoot(routes)</code>.
All other routing NgModules are children that import <code>RouterModule.forChild(routes)</code>.

路由定义模块只能导入它的伴生模块中。如果伴生模块是根模块 `AppModule` ，那么 `AppRoutingModule` 就会通过其导入表中的 `RouterModule.forRoot(routes)` 来添加路由器配置。所有其他的子路由定义模块都会导入 `RouterModule.forChild(routes)`。

In your routing NgModule, re-export the <code>RouterModule</code> as a convenience so that components of the companion NgModule have access to router directives such as <code>RouterLink</code> and <code>RouterOutlet</code>.

在路由定义模块中，要重新导出 `RouterModule`，以便其伴生模块中的组件可以访问路由器指令，比如 `RouterLink` 和 `RouterOutlet` 。

Don't use declarations in a routing NgModule.
Components, directives, and pipes are the responsibility of the companion domain NgModule, not the routing NgModule.

不要在路由定义模块中使用可声明对象。组件、指令和管道都是伴生领域模块的责任，而不是路由定义模块的。

{@a service}

## Service NgModules

## 服务模块

Use a service NgModule to provide a utility service such as data access or messaging.
Ideal service NgModules consist entirely of providers and have no declarations.
Angular's `HttpClientModule` is a good example of a service NgModule.

使用服务模块来提供实用工具服务，比如数据访问或消息传递。理想的服务模块完全由提供者组成，没有可声明对象。 Angular 的 `HttpClientModule` 是服务模块的一个典范。

Use only the root `AppModule` to import service NgModules.

只能使用根模块 `AppModule` 来导入各种服务模块。

{@a widget}

## Widget NgModules

## 小部件模块

Use a widget NgModule to make a component, directive, or pipe available to external NgModules.
Import widget NgModules into any NgModules that need the widgets in their templates.
Many third-party UI component libraries are provided as widget NgModules.

使用小部件模块可以把组件、指令或管道提供给外部模块使用。把小部件模块导入到任何需要在模板使用这些小部件的模块中。很多第三方 UI 组件库都是作为小部件模块提供的。

A widget NgModule should consist entirely of declarations, most of them exported.
It would rarely have providers.

小部件模块应该完全由可声明对象组成，其中大部分都是导出的。服务提供者非常罕见。

{@a shared}

## Shared NgModules

## 共享模块

Put commonly used directives, pipes, and components into one NgModule, typically named `SharedModule`, and then import just that NgModule wherever you need it in other parts of your app.
You can import the shared NgModule in your domain NgModules, including [lazy-loaded NgModules](guide/lazy-loading-ngmodules "Lazy-loading an NgModule").
One example is `SharedModule` in the <live-example name="ngmodules"></live-example>, which provides the `AwesomePipe` custom pipe and `HighlightDirective` directive.

把常用的指令、管道和组件放到一个模块中，通常叫做 `SharedModule`，然后在应用的其他部分只需要导入这个模块就可以了。你可以在领域模块（包括[惰性加载模块](guide/lazy-loading-ngmodules "懒惰加载一个 NgModule")）中导入共享模块。例子之一就是<live-example name="ngmodules"></live-example>中的 `SharedModule`，它提供了自定义管道 `AwesomePipe` 和 `HighlightDirective` 指令。

Shared NgModules should not include providers, nor should any of its imported or re-exported NgModules include providers.

共享模块不应该包含服务提供者，它所导入或重新导出的任何模块也都不应该包含提供者。

To learn how to use shared modules to organize and streamline your code, see [Sharing NgModules in an app](guide/sharing-ngmodules "Sharing NgModules in an app").

要了解如何使用共享模块来组织和简化代码，请参阅[在应用中使用共享模块](guide/sharing-ngmodules "在应用中共享 NgModules") 。

## Next steps

## 下一步

You may also be interested in the following:

你可能也对下列内容感兴趣：

* For more about NgModules, see [Organizing your app with NgModules](guide/ngmodules "Organizing your app with NgModules").

  关于 Angular 模块的更多信息，请参阅[使用模块组织你的应用](guide/ngmodules "使用 Angular 模块整理你的应用")。

* To learn more about the root NgModule, see [Launching an app with a root NgModule](guide/bootstrapping "Launching an app with a root NgModule").

  要了解关于根模块的更多信息，请参阅[使用根模块启动应用](guide/bootstrapping "用 NgModule 根启动一款应用")。

* To learn about frequently used Angular NgModules and how to import them into your app, see [Frequently-used modules](guide/frequent-ngmodules "Frequently-used modules").

  要了解最常使用的那些 Angular 模块，以及如何将它们导入你的应用，请参阅[常用模块](guide/frequent-ngmodules "经常使用的模块")。

* For a complete description of the NgModule metadata properties, see [Using the NgModule metadata](guide/ngmodule-api "Using the NgModule metadata").

  关于模块元数据属性的完整描述，请参阅[使用模块元数据](guide/ngmodule-api "使用 NgModule 元数据")。

If you want to manage NgModule loading and the use of dependencies and services, see the following:

如果你想管理模块的加载以及依赖和服务的使用，参阅下列内容：

* To learn about loading NgModules eagerly when the app starts, or lazy-loading NgModules asynchronously by the router, see [Lazy-loading feature modules](guide/lazy-loading-ngmodules).

  要了解如何在应用启动时急性加载模块，或者让路由器异步加载模块，请参阅[惰性加载特性模块](guide/lazy-loading-ngmodules)。

* To understand how to provide a service or other dependency for your app, see [Providing Dependencies for an NgModule](guide/providers "Providing Dependencies for an NgModule").

  要了解如何为你的应用提供服务或其它依赖，请参阅[为模块提供依赖](guide/providers "为 NgModule 提供依赖")。

* To learn how to create a singleton service to use in NgModules, see [Making a service a singleton](guide/singleton-services "Making a service a singleton").

  要了解如何在模块中创建单例服务，请参阅[“使服务成为单例”](guide/singleton-services "使服务成为单例") 。

