# Types of Feature Modules

#### Prerequisites

#### 前提条件

A basic understanding of the following concepts:

对下列概念有基本的理解：

* [Feature Modules](guide/feature-modules).

* [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

  [JavaScript 模块与 NgModules](guide/ngmodule-vs-jsmodule).

* [Frequently Used Modules](guide/frequent-ngmodules).

<hr>

There are five general categories of feature modules which
tend to fall into the following groups:

* Domain feature modules.

* Routed feature modules.

* Routing modules.

* Service feature modules.

* Widget feature modules.

While the following guidelines describe the use of each type and their
typical characteristics, in real world apps, you may see hybrids.

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

     They typically have a top component that acts as the feature root and private, supporting sub-components descend from it.

     Domain feature modules consist mostly of declarations. Only the top component is exported.

     Domain feature modules rarely have providers. When they do, the lifetime of the provided services should be the same as the lifetime of the module.

     Domain feature modules are typically imported exactly once by a larger feature module.

     They might be imported by the root `AppModule` of a small application that lacks routing.

     对于缺少路由的小型应用，它们可能只会被根模块`AppModule`导入一次。

   </td>

 </tr>

 <tr>

   <td>

       Routed

       路由

   </td>

   <td>

     Routed feature modules are domain feature modules whose top components are the targets of router navigation routes.

     All lazy-loaded modules are routed feature modules by definition.

     根据这个定义，所有惰性加载的模块都是路由特性模块。

     Routed feature modules don’t export anything because their components never appear in the template of an external component.

     A lazy-loaded routed feature module should not be imported by any module. Doing so would trigger an eager load, defeating the purpose of lazy loading.That means you won’t see them mentioned among the `AppModule` imports. An eager loaded routed feature module must be imported by another module so that the compiler learns about its components.

     Routed feature modules rarely have providers for reasons explained in [Lazy Loading Feature Modules](/guide/lazy-loading-ngmodules). When they do, the lifetime of the provided services should be the same as the lifetime of the module. Don't provide application-wide singleton services in a routed feature module or in a module that the routed module imports.

   </td>

 </tr>

 <tr>

   <td>

       Routing

       路由

   </td>

   <td>

     A routing module provides routing configuration for another module and separates routing concerns from its companion module.

     A routing module typically does the following:

     路由模块通常会做这些：

     <ul>

     <li>

         Defines routes.

     </li>

     <li>

         Adds router configuration to the module's imports.

     </li>

     <li>

         Adds guard and resolver service providers to the module's providers.

     </li>

     <li>

         The name of the routing module should parallel the name of its companion module, using the suffix "Routing". For example, <code>FooModule</code> in <code>foo.module.ts</code> has a routing module named <code>FooRoutingModule</code> in <code>foo-routing.module.ts</code>. If the companion module is the root <code>AppModule</code>, the <code>AppRoutingModule</code> adds router configuration to its imports with <code>RouterModule.forRoot(routes)</code>. All other routing modules are children that import <code>RouterModule.forChild(routes)</code>.

     </li>

     <li>

         A routing module re-exports the <code>RouterModule</code> as a convenience so that components of the companion module have access to router directives such as <code>RouterLink</code> and <code>RouterOutlet</code>.

     </li>

     <li>

         A routing module does not have its own declarations. Components, directives, and pipes are the responsibility of the feature module, not the routing module.

     </li>

     </ul>

     A routing module should only be imported by its companion module.

   </td>

 </tr>

 <tr>

   <td>

       Service

       服务

   </td>

   <td>

     Service modules provide utility services such as data access and messaging. Ideally, they consist entirely of providers and have no declarations. Angular's `HttpClientModule` is a good example of a service module.

     The root `AppModule` is the only module that should import service modules.

   </td>

 </tr>

 <tr>

   <td>

       Widget

       窗口部件

   </td>

   <td>

     A widget module makes components, directives, and pipes available to external modules. Many third-party UI component libraries are widget modules.

     A widget module should consist entirely of declarations, most of them exported.

     A widget module should rarely have providers.

     Import widget modules in any module whose component templates need the widgets.

     如果任何模块的组件模板中需要用到这些窗口部件，就请导入相应的窗口部件模块。

   </td>

 </tr>

</table>

The following table summarizes the key characteristics of each feature module group.

<table>

 <tr>

   <th style="vertical-align: top">

     Feature Module

     特性模块

   </th>

   <th style="vertical-align: top">

     Declarations

     声明`declarations`

   </th>

   <th style="vertical-align: top">

     Providers

     提供商`providers`

   </th>

   <th style="vertical-align: top">

     Exports

     导出什么

   </th>

   <th style="vertical-align: top">

     Imported by

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

       顶级组件

   </td>

   <td>

       Feature, AppModule

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

   </td>

   <td>

       RouterModule

   </td>

   <td>

       Feature (for routing)

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

You may also be interested in the following:

* [Lazy Loading Modules with the Angular Router](guide/lazy-loading-ngmodules).

* [Providers](guide/providers).
