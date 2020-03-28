# Types of feature modules

# 特性模块的分类

There are five general categories of feature modules which
tend to fall into the following groups:

下面是特性模块的五个常用分类，包括五组：

* Domain feature modules.

   领域特性模块。

* Routed feature modules.

   带路由的特性模块。

* Routing modules.

   路由模块。

* Service feature modules.

   服务特性模块

* Widget feature modules.

   可视部件特性模块。

While the following guidelines describe the use of each type and their
typical characteristics, in real world apps, you may see hybrids.

虽然下面的指南中描述了每种类型的使用及其典型特征，但在实际的应用中，你还可能看到它们的混合体。

<table>

 <tr>

   <th style="vertical-align: top">

     Feature Module

     特性模块

   </th>

   <th style="vertical-align: top">

     Guidelines

     指导原则

   </th>

 </tr>

 <tr>

   <td>

       Domain

       领域

   </td>

   <td>

     Domain feature modules deliver a user experience dedicated to a particular application domain like editing a customer or placing an order.

     领域特性模块用来给用户提供应用程序领域中特有的用户体验，比如编辑客户信息或下订单等。

     They typically have a top component that acts as the feature root and private, supporting sub-components descend from it.

     它们通常会有一个顶层组件来充当该特性的根组件，并且通常是私有的。用来支持它的各级子组件。

     Domain feature modules consist mostly of declarations. Only the top component is exported.

     领域特性模块大部分由 `declarations` 组成，只有顶层组件会被导出。

     Domain feature modules rarely have providers. When they do, the lifetime of the provided services should be the same as the lifetime of the module.

     领域特性模块很少会有服务提供商。如果有，那么这些服务的生命周期必须和该模块的生命周期完全相同。

     Domain feature modules are typically imported exactly once by a larger feature module.

     领域特性模块通常会由更高一级的特性模块导入且只导入一次。

     They might be imported by the root `AppModule` of a small application that lacks routing.

     对于缺少路由的小型应用，它们可能只会被根模块 `AppModule` 导入一次。

   </td>

 </tr>
 <tr>

   <td>

       Routed

       路由

   </td>

   <td>

     Routed feature modules are domain feature modules whose top components are the targets of router navigation routes.

     带路由的特性模块是一种特殊的领域特性模块，但它的顶层组件会作为路由导航时的目标组件。

     All lazy-loaded modules are routed feature modules by definition.

     根据这个定义，所有惰性加载的模块都是路由特性模块。

     Routed feature modules don’t export anything because their components never appear in the template of an external component.

     带路由的特性模块不会导出任何东西，因为它们的组件永远不会出现在外部组件的模板中。

     A lazy-loaded routed feature module should not be imported by any module. Doing so would trigger an eager load, defeating the purpose of lazy loading.That means you won’t see them mentioned among the `AppModule` imports. An eager loaded routed feature module must be imported by another module so that the compiler learns about its components.

     惰性加载的路由特性模块不应该被任何模块导入。如果那样做就会导致它被急性加载，破坏了惰性加载的设计用途。
     也就是说你应该永远不会看到它们在 `AppModule` 的 `imports` 中被引用。
     急性加载的路由特性模块必须被其它模块导入，以便编译器能了解它所包含的组件。

     Routed feature modules rarely have providers for reasons explained in [Lazy Loading Feature Modules](/guide/lazy-loading-ngmodules). When they do, the lifetime of the provided services should be the same as the lifetime of the module. Don't provide application-wide singleton services in a routed feature module or in a module that the routed module imports.

     路由特性模块很少会有服务提供商，原因参见[惰性加载的特性模块](/guide/lazy-loading-ngmodules)中的解释。如果那样做，那么它所提供的服务的生命周期必须与该模块的生命周期完全相同。不要在路由特性模块或被路由特性模块所导入的模块中提供全应用级的单例服务。

   </td>

 </tr>

 <tr>

   <td>

       Routing

       路由

   </td>

   <td>

     A routing module provides routing configuration for another module and separates routing concerns from its companion module.

     路由模块为其它模块提供路由配置，并且把路由这个关注点从它的配套模块中分离出来。

     A routing module typically does the following:

     路由模块通常会做这些：

     <ul>

     <li>

         Defines routes.

         定义路由。

     </li>

     <li>

         Adds router configuration to the module's imports.

         把路由配置添加到该模块的 `imports` 中。

     </li>

     <li>

         Adds guard and resolver service providers to the module's providers.

         把路由守卫和解析器的服务提供商添加到该模块的 `providers` 中。

     </li>

     <li>

         The name of the routing module should parallel the name of its companion module, using the suffix "Routing". For example, <code>FooModule</code> in <code>foo.module.ts</code> has a routing module named <code>FooRoutingModule</code> in <code>foo-routing.module.ts</code>. If the companion module is the root <code>AppModule</code>, the <code>AppRoutingModule</code> adds router configuration to its imports with <code>RouterModule.forRoot(routes)</code>. All other routing modules are children that import <code>RouterModule.forChild(routes)</code>.

         路由模块应该与其配套模块同名，但是加上“Routing”后缀。比如，<code>foo.module.ts</code> 中的 <code>FooModule</code> 就有一个位于 <code>foo-routing.module.ts</code> 文件中的 <code>FooRoutingModule</code> 路由模块。
         如果其配套模块是根模块 `AppModule`，`AppRoutingModule` 就要使用 `RouterModule.forRoot(routes)` 来把路由器配置添加到它的 `imports` 中。
         所有其它路由模块都是子模块，要使用 `RouterModule.forChild(routes)`。

     </li>

     <li>

         A routing module re-exports the <code>RouterModule</code> as a convenience so that components of the companion module have access to router directives such as <code>RouterLink</code> and <code>RouterOutlet</code>.

         按照惯例，路由模块会重新导出这个 <code>RouterModule</code>，以便其配套模块中的组件可以访问路由器指令，比如 `RouterLink` 和 `RouterOutlet`。

     </li>

     <li>

         A routing module does not have its own declarations. Components, directives, and pipes are the responsibility of the feature module, not the routing module.

         路由模块没有自己的可声明对象。组件、指令和管道都是特性模块的职责，而不是路由模块的。

     </li>

     </ul>

     A routing module should only be imported by its companion module.

     路由模块只应该被它的配套模块导入。

   </td>

 </tr>

 <tr>

   <td>

       Service

       服务

   </td>

   <td>

     Service modules provide utility services such as data access and messaging. Ideally, they consist entirely of providers and have no declarations. Angular's `HttpClientModule` is a good example of a service module.

     服务模块提供了一些工具服务，比如数据访问和消息。理论上，它们应该是完全由服务提供商组成的，不应该有可声明对象。Angular 的 `HttpClientModule` 就是一个服务模块的好例子。

     The root `AppModule` is the only module that should import service modules.

     根模块 `AppModule` 是唯一的可以导入服务模块的模块。

   </td>

 </tr>

 <tr>

   <td>

       Widget

       窗口部件

   </td>

   <td>

     A widget module makes components, directives, and pipes available to external modules. Many third-party UI component libraries are widget modules.

     窗口部件模块为外部模块提供组件、指令和管道。很多第三方 UI 组件库都是窗口部件模块。

     A widget module should consist entirely of declarations, most of them exported.

     窗口部件模块应该完全由可声明对象组成，它们中的大部分都应该被导出。

     A widget module should rarely have providers.

     窗口部件模块很少会有服务提供商。

     Import widget modules in any module whose component templates need the widgets.

     如果任何模块的组件模板中需要用到这些窗口部件，就请导入相应的窗口部件模块。

   </td>

 </tr>

</table>

The following table summarizes the key characteristics of each feature module group.

下表中汇总了各种特性模块类型的关键特征。

<table>
 <tr>

   <th style="vertical-align: top">

     Feature Module

     特性模块

   </th>

   <th style="vertical-align: top">

     Declarations

     声明 `declarations`

   </th>

   <th style="vertical-align: top">

     Providers

     提供商 `providers`

   </th>

   <th style="vertical-align: top">

     Exports

     导出什么

   </th>

   <th style="vertical-align: top">

     Imported by

     被谁导入

   </th>

 </tr>

 <tr>

   <td>

       Domain

       领域

   </td>

   <td>

       Yes

       有

   </td>

   <td>

       Rare

       罕见

   </td>

   <td>

       Top component

       顶层组件

   </td>

   <td>

       Feature, AppModule

       特性模块，AppModule

   </td>

 </tr>

 <tr>

   <td>

       Routed

       路由

   </td>

   <td>

       Yes

       有

   </td>

   <td>

       Rare

       罕见

   </td>

   <td>

       No

       无

   </td>

   <td>

       None

       无

   </td>

 </tr>

 <tr>

   <td>

       Routing

       路由

   </td>

   <td>

       No

       无

   </td>

   <td>

       Yes (Guards)

       有（守卫）

   </td>

   <td>

       RouterModule

   </td>

   <td>

       Feature (for routing)

       特性（供路由使用）

   </td>

 </tr>

 <tr>

   <td>

       Service

       服务

   </td>

   <td>

       No

       无

   </td>

   <td>

       Yes

       有

   </td>

   <td>

       No

       无

   </td>

   <td>

       AppModule

   </td>

 </tr>

 <tr>

   <td>

       Widget

       窗口部件

   </td>

   <td>

       Yes

       有

   </td>

   <td>

       Rare

       罕见

   </td>

   <td>

       Yes

       有

   </td>

   <td>

       Feature

       特性

   </td>

 </tr>
</table>

<hr />

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Lazy Loading Modules with the Angular Router](guide/lazy-loading-ngmodules).

   [使用 Angular 路由器惰性加载模块](guide/lazy-loading-ngmodules)。

* [Providers](guide/providers).

   [服务提供商](guide/providers)。
