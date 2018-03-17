# NgModules

# Angular模块 (NgModule)

#### Prerequisites

#### 前提条件

A basic understanding of the following concepts:

对下列概念有基本的理解：

* [Bootstrapping](guide/bootstrapping).

* [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

  [JavaScript 模块与 NgModules](guide/ngmodule-vs-jsmodule).

<hr>

**NgModules** configure the injector and the compiler and help organize related things together.

An NgModule is a class marked by the `@NgModule` decorator.
`@NgModule` takes a metadata object that describes how to compile a component's template and how to create an injector at runtime.
It identifies the module's own components, directives, and pipes,
making some of them public, through the `exports` property, so that external components can use them.
`@NgModule` can also add service providers to the application dependency injectors.

For an example app showcasing all the techniques that NgModules related pages
cover, see the <live-example></live-example>. For explanations on the individual techniques, visit the relevant NgModule pages under the NgModules
section.

## Angular modularity

## Angular 模块化

Modules are a great way to organize an application and extend it with capabilities from external libraries.

模块是组织应用和使用外部库扩展应用的最佳途径。

Angular libraries are NgModules, such as `FormsModule`, `HttpClientModule`, and `RouterModule`.
Many third-party libraries are available as NgModules such as
<a href="https://material.angular.io/">Material Design</a>,
<a href="http://ionicframework.com/">Ionic</a>, and
<a href="https://github.com/angular/angularfire2">AngularFire2</a>.

NgModules consolidate components, directives, and pipes into
cohesive blocks of functionality, each focused on a
feature area, application business domain, workflow, or common collection of utilities.

Angular 模块把组件、指令和管道打包成内聚的功能块，每个模块聚焦于一个特性区域、业务领域、工作流或通用工具。

Modules can also add services to the application.
Such services might be internally developed, like something you'd develop yourself or come from outside sources, such as the Angular router and HTTP client.

Modules can be loaded eagerly when the application starts or lazy loaded asynchronously by the router.

NgModule metadata does the following:

* Declares which components, directives, and pipes belong to the module.

* Makes some of those components, directives, and pipes public so that other module's component templates can use them.

* Imports other modules with the components, directives, and pipes that components in the current module need.

* Provides services that the other application components can use.

Every Angular app has at least one module, the root module.
You [bootstrap](guide/bootstrapping) that module to launch the application.

The root module is all you need in a simple application with a few components.
As the app grows, you refactor the root module into [feature modules](guide/feature-modules)
that represent collections of related functionality.
You then import these modules into the root module.

## The basic NgModule

The CLI generates the following basic app module when creating a new app.

<code-example path="bootstrapping/src/app/app.module.ts" region="whole-ngmodule" title="src/app/app.module.ts" linenums="false">

</code-example>

At the top are the import statements. The next section is where you configure the `@NgModule` by stating what components and directives belong to it (`declarations`) as well as which other modules it uses (`imports`). This page builds on [Bootstrapping](guide/bootstrapping), which covers the structure of an NgModule in detail. If you need more information on the structure of an `@NgModule`, be sure to read [Bootstrapping](guide/bootstrapping).

<hr />

## More on NgModules

You may also be interested in the following:

* [Feature Modules](guide/feature-modules).

* [Entry Components](guide/entry-components).

* [Providers](guide/providers).

* [Types of NgModules](guide/module-types).
