# NgModules

**NgModules** configure the injector and the compiler and help organize related things together.

**NgModules** 用于配置注入器和编译器，并帮你把那些相关的东西组织在一起。

An NgModule is a class marked by the `@NgModule` decorator.
`@NgModule` takes a metadata object that describes how to compile a component's template and how to create an injector at runtime.
It identifies the module's own components, directives, and pipes,
making some of them public, through the `exports` property, so that external components can use them.
`@NgModule` can also add service providers to the application dependency injectors.

NgModule 是一个带有 `@NgModule` 装饰器的类。
`@NgModule` 的参数是一个元数据对象，用于描述如何编译组件的模板，以及如何在运行时创建注入器。
它会标出该模块自己的组件、指令和管道，通过 `exports` 属性公开其中的一部分，以便外部组件使用它们。
`NgModule` 还能把一些服务提供者添加到应用的依赖注入器中。

For an example app showcasing all the techniques that NgModules related pages
cover, see the <live-example></live-example>. For explanations on the individual techniques, visit the relevant NgModule pages under the NgModules
section.

要想找一个涉及本章所讲的全部技术的范例，参见 <live-example></live-example>。
要想得到针对单项技术的一些讲解，参见本目录下的相关页面。

## Angular modularity

## Angular 模块化

Modules are a great way to organize an application and extend it with capabilities from external libraries.

模块是组织应用和使用外部库扩展应用的最佳途径。

Angular libraries are NgModules, such as `FormsModule`, `HttpClientModule`, and `RouterModule`.
Many third-party libraries are available as NgModules such as
<a href="https://material.angular.io/">Material Design</a>,
<a href="http://ionicframework.com/">Ionic</a>, and
<a href="https://github.com/angular/angularfire2">AngularFire2</a>.

Angular 自己的库都是 NgModule，比如 `FormsModule`、`HttpClientModule` 和 `RouterModule`。
很多第三方库也是 NgModule，比如 <a href="https://material.angular.cn/">Material Design</a>、
<a href="http://ionicframework.com/">Ionic</a> 和
<a href="https://github.com/angular/angularfire2">AngularFire2</a>。

NgModules consolidate components, directives, and pipes into
cohesive blocks of functionality, each focused on a
feature area, application business domain, workflow, or common collection of utilities.

NgModule 把组件、指令和管道打包成内聚的功能块，每个模块聚焦于一个特性区域、业务领域、工作流或通用工具。

Modules can also add services to the application.
Such services might be internally developed, like something you'd develop yourself or come from outside sources, such as the Angular router and HTTP client.

模块还可以把服务加到应用中。
这些服务可能是内部开发的（比如你自己写的），或者来自外部的（比如 Angular 的路由和 HTTP 客户端）。

Modules can be loaded eagerly when the application starts or lazy loaded asynchronously by the router.

模块可以在应用启动时急性加载，也可以由路由器进行异步的惰性加载。

NgModule metadata does the following:

NgModule 的元数据会做这些：

* Declares which components, directives, and pipes belong to the module.

   声明某些组件、指令和管道属于这个模块。

* Makes some of those components, directives, and pipes public so that other module's component templates can use them.

   公开其中的部分组件、指令和管道，以便其它模块中的组件模板中可以使用它们。

* Imports other modules with the components, directives, and pipes that components in the current module need.

   导入其它带有组件、指令和管道的模块，这些模块中的元件都是本模块所需的。

* Provides services that the other application components can use.

   提供一些供应用中的其它组件使用的服务。

Every Angular app has at least one module, the root module.
You [bootstrap](guide/bootstrapping) that module to launch the application.

每个 Angular 应用都至少有一个模块，也就是根模块。
你可以[引导](guide/bootstrapping)那个模块，以启动该应用。

The root module is all you need in a simple application with a few components.
As the app grows, you refactor the root module into [feature modules](guide/feature-modules)
that represent collections of related functionality.
You then import these modules into the root module.

对于那些只有少量组件的简单应用，根模块就是你所需的一切。
随着应用的成长，你要把这个根模块重构成一些[特性模块](guide/feature-modules)，它们代表一组密切相关的功能集。
然后你再把这些模块导入到根模块中。

## The basic NgModule

## 基本的模块

The [Angular CLI](cli) generates the following basic `AppModule` when creating a new app.


[Angular CLI](cli) 在创建新应用时会生成如下基本模块 `AppModule`。

<code-example path="ngmodules/src/app/app.module.1.ts" header="src/app/app.module.ts (default AppModule)">
// @NgModule decorator with its metadata
</code-example>

At the top are the import statements. The next section is where you configure the `@NgModule` by stating what components and directives belong to it (`declarations`) as well as which other modules it uses (`imports`). For more information on the structure of an `@NgModule`, be sure to read [Bootstrapping](guide/bootstrapping).

文件的顶部是一些导入语句。接下来是你配置 `NgModule` 的地方，用于规定哪些组件和指令属于它（`declarations`），以及它使用了哪些其它模块（`imports`）。
如果要进一步了解 `@NgModule` 的结构，参见[引导](guide/bootstrapping)。

<hr />

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Feature Modules](guide/feature-modules).

   [特性模块](guide/feature-modules)

* [Entry Components](guide/entry-components).

   [入口组件](guide/entry-components)

* [Providers](guide/providers).

   [服务提供者](guide/providers)。

* [Types of NgModules](guide/module-types).

   [NgModule 的分类](guide/module-types).
