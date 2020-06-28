# Glossary

# Angular 词汇表

Angular has its own vocabulary.
Most Angular terms are common English words or computing terms
that have a specific meaning within the Angular system.

Angular 有自己的词汇表。
虽然大多数 Angular 短语都是日常用语或计算机术语，但是在 Angular 体系中，它们有特别的含义。

This glossary lists the most prominent terms
and a few less familiar ones with unusual or
unexpected definitions.

本词汇表列出了常用术语和少量具有反常或意外含义的不常用术语。

[A](#A) [B](#B) [C](#C) [D](#D) [E](#E) [F](#F) [G](#G) [H](#H) [I](#I)
[J](#J) [K](#K) [L](#L) [M](#M) [N](#N) [O](#O) [P](#P) [Q](#Q) [R](#R)
[S](#S) [T](#T) [U](#U) [V](#V) [W](#W) [X](#X) [Y](#Y) [Z](#Z)

{@a A}

{@a aot}

## ahead-of-time (AOT) compilation

## 预 (ahead-of-time, AOT) 编译

The Angular ahead-of-time (AOT) compiler converts Angular HTML and TypeScript code
into efficient JavaScript code during the build phase, before the browser downloads
and runs that code.
This is the best compilation mode for production environments, with decreased load time and increased performance compared to [just-in-time (JIT) compilation](#jit).

Angular 的预先（AOT）编译器可以在编译期间把 Angular 的 HTML 代码和 TypeScript 代码转换成高效的 JavaScript 代码，这样浏览器就可以直接下载并运行它们。
对于产品环境，这是最好的编译模式，相对于[即时 (JIT) 编译](#jit)而言，它能减小加载时间，并提高性能。

By compiling your application using the `ngc` command-line tool, you can bootstrap directly to a module factory, so you don't need to include the Angular compiler in your JavaScript bundle.

使用命令行工具 `ngc` 来编译你的应用之后，就可以直接启动一个模块工厂，这意味着你不必再在 JavaScript 打包文件中包含 Angular 编译器。

{@a angular-element}

## Angular element

## Angular 元素（element）

An Angular [component](#component) packaged as a [custom element](#custom-element).

被包装成[自定义元素](#custom-element)的 Angular [组件](#component)。

Learn more in [Angular Elements Overview](guide/elements).

参见 [_Angular 元素 _](guide/elements) 一文。

{@a annotation}

## Annotation

## 注解（Annotation）

A structure that provides metadata for a class. See [decorator](#decorator).

一种为类提供元数据的结构。参见 [装饰器](#decorator)。

{@a app-shell}

## app-shell

## 应用外壳（app-shell）

App shell is a way to render a portion of your application via a route at build time.
This gives users a meaningful first paint of your application that appears quickly because the browser can render static HTML and CSS without the need to initialize JavaScript.

应用外壳是一种在构建期间通过路由为应用渲染出部分内容的方式。
这样就能为用户快速渲染出一个有意义的首屏页面，因为浏览器可以在初始化脚本之前渲染出静态的 HTML 和 CSS。

Learn more in [The App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell).

欲知详情，参见[应用外壳模型](https://developers.google.com/web/fundamentals/architecture/app-shell)。

You can use the Angular CLI to [generate](cli/generate#appshell) an app shell.
This can improve the user experience by quickly launching a static rendered page (a skeleton common to all pages) while the browser downloads the full client version and switches to it automatically after the code loads.

你可以使用 Angular CLI 来[生成](cli/generate#appshell)一个应用外壳。
它可以在浏览器下载完整版应用之前，先快速启动一个静态渲染页面（所有页面的公共骨架）来增强用户体验，等代码加载完毕后再自动切换到完整版。

See also [Service Worker and PWA](guide/service-worker-intro).

参见 [Service Worker 与 PWA](guide/service-worker-intro)。

{@a architect}

## Architect

## 建筑师（Architect）

The tool that the CLI uses to perform complex tasks such as compilation and test running, according to a provided configuration.
Architect is a shell that runs a [builder](#builder) (defined in an [npm package](#npm-package)) with a given [target configuration](#target).

CLI 用来根据所提供的配置执行复杂任务（比如编译和执行测试）的工具。
建筑师是一个外壳，它用来对一个指定的[目标配置](#target)来执行一个[构建器（builder）](#builder) (定义在一个 [npm 包](#npm-package)中)。

In the [workspace configuration file](guide/workspace-config#project-tool-configuration-options), an "architect" section provides configuration options for Architect builders.

在[工作空间配置文件](guide/workspace-config#project-tool-configuration-options)中，"architect" 区可以为建筑师的各个构建器提供配置项。

For example, a built-in builder for linting is defined in the package `@angular-devkit/build_angular:tslint`, which uses the [TSLint](https://palantir.github.io/tslint/) tool to perform linting, with a configuration specified in a `tslint.json` file.

比如，内置的 linting 构建器定义在 `@angular-devkit/build_angular:tslint` 包中，它使用 [TSLint](https://palantir.github.io/tslint/) 工具来执行 linting 操作，其配置是在 `tslint.json` 文件中指定的。

Use the [CLI command `ng run`](cli/run) to invoke a builder by specifying a [target configuration](#target) associated with that builder.
Integrators can add builders to enable tools and workflows to run through the Angular CLI. For example, a custom builder can replace the third-party tools used by the built-in implementations for CLI commands such as `ng build` or `ng test`.

使用 [CLI 命令 `ng run`](cli/run)可以通过指定与某个构建器相关联的[目标配置](#target)来调用此构建器。
整合器（Integrator）可以添加一些构建器来启用某些工具和工作流，以便通过 Angular CLI 来运行它。比如，自定义构建器可以把 CLI 命令（如 `ng build` 或 `ng test`）的内置实现替换为第三方工具。

{@a attribute-directive}

{@a attribute-directives}

## attribute directives

## 属性型指令（attribute directives）

A category of [directive](#directive) that can listen to and modify the behavior of
other HTML elements, attributes, properties, and components. They are usually represented
as HTML attributes, hence the name.

[指令 (directive)](#directive)的一种。可以监听或修改其它 HTML 元素、特性 (attribute)、属性 (property)、组件的行为。通常用作 HTML 属性，就像它的名字所暗示的那样。

Learn more in [Attribute Directives](guide/attribute-directives).

要了解更多，参见[*属性型指令*](guide/attribute-directives)

{@a B}

{@a binding}

## binding

## 绑定 (binding)

Generally, the practice of setting a variable or property to a data value.
Within Angular, typically refers to [data binding](#data-binding),
which coordinates DOM object properties with data object properties.

广义上是指把变量或属性设置为某个数据值的一种实践。
在 Angular 中，一般是指[数据绑定](#data-binding)，它会根据数据对象属性的值来设置 DOM 对象的属性。

Sometimes refers to a [dependency-injection](#dependency-injection) binding
between a [token](#token) and a dependency [provider](#provider).

有时也会指在“[令牌（Token）](#token)”和依赖[提供者（Provider）](#provider)
之间的[依赖注入](#dependency-injection) 绑定。

{@a bootstrap}

## bootstrap

## 启动/引导 (bootstrap)

A way to initialize and launch an app or system.

一种用来初始化和启动应用或系统的途径。

In Angular, an app's root NgModule (`AppModule`) has a `bootstrap` property that identifies the app's top-level [components](#component).
During the bootstrap process, Angular creates and inserts these components into the `index.html` host web page.
You can bootstrap multiple apps in the same `index.html`. Each app contains its own components.

在 Angular 中，应用的根模块（`AppModule`）有一个 `bootstrap` 属性，用于指出该应用的的顶层[组件](#component)。
在引导期间，Angular 会创建这些组件，并插入到宿主页面 `index.html` 中。
你可以在同一个 `index.html` 中引导多个应用，每个应用都有一些自己的组件。

Learn more in [Bootstrapping](guide/bootstrapping).

要了解更多，参见[*引导*](guide/bootstrapping)一章。

{@a builder}

## builder

## 构建器（Builder）

A function that uses the [Architect](#architect) API to perform a complex process such as "build" or "test".
The builder code is defined in an [npm package](#npm-package).

一个函数，它使用 [Architect](#architect) API 来执行复杂的过程，比如构建或测试。
构建器的代码定义在一个 [npm 包](#npm-package)中。

For example, [BrowserBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/browser) runs a [webpack](https://webpack.js.org/) build for a browser target and [KarmaBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/karma) starts the Karma server and runs a webpack build for unit tests.

比如，[BrowserBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/browser) 针对某个浏览器目标运行 [webpack](https://webpack.js.org/) 构建，而 [KarmaBuilder](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/karma) 则启动 Karma 服务器，并且针对单元测试运行 webpack 构建。

The [CLI command `ng run`](cli/run) invokes a builder with a specific [target configuration](#target).
The [workspace configuration](guide/workspace-config) file, `angular.json`, contains default configurations for built-in builders.

[CLI 命令 `ng run`](cli/run) 使用一个特定的[目标配置](#target)来调用构建器。
[工作空间配置](guide/workspace-config)文件 `angular.json` 中包含这些内置构建器的默认配置。

{@a C}

{@a case-conventions}

{@a dash-case}

{@a camelcase}

{@a kebab-case}

## case types

## 大小写类型（case types）

Angular uses capitalization conventions to distinguish the names of various types, as described in the [naming guidelines section](guide/styleguide#02-01) of the Style Guide. Here's a summary of the case types:

Angular 使用大小写约定来区分多种名字，详见[风格指南中的 "命名" 一节](guide/styleguide#02-01)。下面是这些大小写类型的汇总表：

* camelCase : Symbols, properties, methods, pipe names, non-component directive selectors, constants.
Standard or lower camel case uses lowercase on the first letter of the item. For example, "selectedHero".

  小驼峰形式（camelCase）：符号、属性、方法、管道名、非组件指令的选择器、常量。
  小驼峰（也叫标准驼峰）形式的第一个字母要使用小写形式。比如 "selectedHero"。

* UpperCamelCase (or PascalCase): Class names, including classes that define components, interfaces, NgModules, directives, and pipes,
Upper camel case uses uppercase on the first letter of the item. For example, "HeroListComponent".

  大驼峰形式（UpperCamelCase）或叫帕斯卡形式（PascalCase）：类名（包括用来定义组件、接口、NgModule、指令、管道等的类）。
  大驼峰形式的第一个字母要使用大写形式。比如 "HeroListComponent"。

* dash-case (or "kebab-case"): Descriptive part of file names, component selectors. For example, "app-hero-list".

  中线形式（dash-case）或叫烤串形式（kebab-case）：文件名中的描述部分，组件的选择器。比如 "app-hero-list"。

* underscore_case (or "snake_case"): Not typically used in Angular. Snake case uses words connected with underscores.
For example, "convert_link_mode".

  下划线形式（underscore_case）或叫蛇形形式（snake_case）：在 Angular 中没有典型用法。蛇形形式使用下划线连接各个单词。
  比如 "convert_link_mode"。

* UPPER_UNDERSCORE_CASE (or UPPER_SNAKE_CASE, or SCREAMING_SNAKE_CASE): Traditional for constants (acceptable, but prefer camelCase).
Upper snake case uses words in all capital letters connected with underscores. For example, "FIX_ME".

  大写下划线形式（UPPER_UNDERSCORE_CASE）或叫大写蛇形形式（UPPER_SNAKE_CASE）：传统的常量写法（可以接受，但更推荐用小驼峰形式（camelCase））
  大蛇形形式使用下划线分隔的全大写单词。比如 "FIX_ME"。

{@a change-detection}
## change detection

## 变更检测（change detection）

The mechanism by which the Angular framework synchronizes the state of an application's UI with the state of the data.
The change detector checks the current state of the data model whenever it runs, and maintains it as the previous state to compare on the next iteration.

Angular 框架会通过此机制将应用程序 UI 的状态与数据的状态同步。变更检测器在运行时会检查数据模型的当前状态，并在下一轮迭代时将其和先前保存的状态进行比较。

As the application logic updates component data, values that are bound to DOM properties in the view can change.
The change detector is responsible for updating the view to reflect the current data model.
Similarly, the user can interact with the UI, causing events that change the state of the data model.
These events can trigger change detection.

当应用逻辑更改组件数据时，绑定到视图中 DOM 属性上的值也要随之更改。变更检测器负责更新视图以反映当前的数据模型。类似地，用户也可以与 UI 进行交互，从而引发要更改数据模型状态的事件。这些事件可以触发变更检测。

Using the default ("CheckAlways") change-detection strategy, the change detector goes through the [view hierarchy](#view-tree) on each VM turn to check every [data-bound property](#data-binding) in the template. In the first phase, it compares the current state of the dependent data with the previous state, and collects changes.
In the second phase, it updates the page DOM to reflect any new data values.

使用默认的（“CheckAlways”）变更检测策略，变更检测器将遍历每个视图模型上的[视图层次结构](#view-tree)，以检查模板中的每个[数据绑定属性](#data-binding)。在第一阶段，它将所依赖的数据的当前状态与先前状态进行比较，并收集更改。在第二阶段，它将更新页面上的 DOM 以反映出所有新的数据值。

If you set the `OnPush` ("CheckOnce") change-detection strategy, the change detector runs only when [explicitly invoked](api/core/ChangeDetectorRef), or when it is triggered by an `Input` reference change or event handler. This typically improves performance. For more information, see [Optimize Angular's change detection](https://web.dev/faster-angular-change-detection/).

如果设置了 `OnPush`（“CheckOnce”）变更检测策略，则变更检测器仅在[显式调用](api/core/ChangeDetectorRef)它或由 `@Input` 引用的变化或触发事件处理程序时运行。这通常可以提高性能。欲知详情，参见[优化 Angular 的变更检测](https://web.dev/faster-angular-change-detection/)。

{@a class-decorator}

## class decorator

## 类装饰器（class decorator）

A [decorator](#decorator) that appears immediately before a class definition, which declares the class to be of the given type, and provides metadata suitable to the type.

[装饰器](#decorator)会出现在类定义的紧前方，用来声明该类具有指定的类型，并且提供适合该类型的元数据。

The following decorators can declare Angular class types:

可以用下列装饰器来声明 Angular 的类：

* `@Component()`

* `@Directive()`

* `@Pipe()`

* `@Injectable()`

* `@NgModule()`

{@a class-field-decorator}

## class field decorator

## 类字段装饰器（class field decorator）

A [decorator](#decorator) statement immediately before a field in a class definition that declares the type of that field. Some examples are `@Input` and `@Output`.

出现在类定义中属性紧前方的[装饰器](#decorator)语句用来声明该字段的类型。比如 `@Input` 和 `@Output`。

{@a collection}

## collection

## 集合（collection）

In Angular, a set of related [schematics](#schematic) collected in an [npm package](#npm-package).

在 Angular 中，是指收录在同一个 [npm 包](#npm-package) 中的[一组原理图（schematics）](#schematic)。

{@a cli}

## command-line interface (CLI)

## 命令行界面（CLI）

The [Angular CLI](cli) is a command-line tool for managing the Angular development cycle. Use it to create the initial filesystem scaffolding for a [workspace](#workspace) or [project](#project), and to run [schematics](#schematic) that add and modify code for initial generic versions of various elements. The CLI supports all stages of the development cycle, including building, testing, bundling, and deployment.

[Angular CLI](cli) 是一个命令行工具，用于管理 Angular 的开发周期。它用于为[工作区](#workspace)或[项目](#project)创建初始的脚手架，并且运行[生成器（schematics）](#schematic)来为初始生成的版本添加或修改各类代码。
CLI 支持开发周期中的所有阶段，比如构建、测试、打包和部署。

* To begin using the CLI for a new project, see [Local Environment Setup](guide/setup-local "Setting up for Local Development").

  要开始使用 CLI 来创建新项目，参见[建立本地开发环境](guide/setup-local "Setting up for Local Development")。
  
* To learn more about the full capabilities of the CLI, see the [CLI command reference](cli).

  要了解 CLI 的全部功能，参见 [CLI 命令参考手册](cli)。

See also [Schematics CLI](#schematics-cli).

参见 [Schematics CLI](#schematics-cli)。

{@a component}

## component

## 组件 (component)

A class with the `@Component()` [decorator](#decorator) that associates it with a companion [template](#template). Together, the component class and template define a [view](#view).

一个带有 `@Component()` [装饰器](#decorator)的类，和它的伴生[模板](#template)关联在一起。组件类及其模板共同定义了一个[视图](#view)。

A component is a special type of [directive](#directive).
The `@Component()` decorator extends the `@Directive()` decorator with template-oriented features.

组件是[指令](#directive)的一种特例。`@Component()` 装饰器扩展了 `@Directive()` 装饰器，增加了一些与模板有关的特性。

An Angular component class is responsible for exposing data and handling most of the view's display and user-interaction logic through [data binding](#data-binding).

Angular 的组件类负责暴露数据，并通过[数据绑定机制](#data-binding)来处理绝大多数视图的显示和用户交互逻辑。

Read more about component classes, templates, and views in [Introduction to Angular concepts](guide/architecture).

要了解更多关于组件类、模板和视图的知识，参见 [架构概览](guide/architecture) 一章。

## configuration

## 配置（configuration）

See  [workspace configuration](#cli-config)

参见[工作空间配置](#cli-config)

{@a content-projection}

## content projection

## 内容投影

A way to insert DOM content from outside a component into the component's view in a designated spot.

一种从组件外把 DOM 内容插入到当前组件视图的特定位置上的方式。

For more information, see [Responding to changes in content](guide/lifecycle-hooks#content-projection).

欲知详情，参见[内容变化的应对方式](guide/lifecycle-hooks#content-projection)。

{@a custom-element}

## custom element

## 自定义元素（Custom element）

A web platform feature, currently supported by most browsers and available in other browsers through polyfills (see [Browser support](guide/browser-support)).

一种 Web 平台的特性，目前已经被绝大多数浏览器支持，在其它浏览器中也可以通过腻子脚本获得支持（参见[浏览器支持](guide/browser-support)）。

The custom element feature extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. A custom element (also called a *web component*) is recognized by a browser when it's added to the [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry).

这种自定义元素特性通过允许你定义标签（其内容是由 JavaScript 代码来创建和控制的）来扩展 HTML。当自定义元素（也叫 *Web Component*）被添加到 [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) 之后就会被浏览器识别。

You can use the API to transform an Angular component so that it can be registered with the browser and used in any HTML that you add directly to the DOM within an Angular app. The custom element tag inserts the component's view, with change-detection and data-binding functionality, into content that would otherwise be displayed without Angular processing.

你可以使用 API 来转换 Angular 组件，以便它能够注册进浏览器中，并且可以用在你往 DOM 中添加的任意 HTML 中。
自定义元素标签可以把组件的视图（包括变更检测和数据绑定功能）插入到不受 Angular 控制的内容中。

See [Angular element](#angular-element).

参见 [Angular 元素](#angular-element)。

See also [dynamic component loading](#dynamic-components).

参见[加载动态组件](#dynamic-components)。

{@a D}

{@a data-binding}

## data binding

## 数据绑定 (data binding)

A process that allows apps to display data values to a user and respond to user
actions (such as clicks, touches, and keystrokes).

这个过程可以让应用程序将数据展示给用户，并对用户的操作（点击、触屏、按键）做出回应。

In data binding, you declare the relationship between an HTML widget and a data source
and let the framework handle the details.
Data binding is an alternative to manually pushing application data values into HTML, attaching
event listeners, pulling changed values from the screen, and
updating application data values.

在数据绑定机制下，你只要声明一下 HTML 部件和数据源之间的关系，把细节交给框架去处理。
而以前的手动操作过程是：将数据推送到 HTML 页面中、添加事件监听器、从屏幕获取变化后的数据，并更新应用中的值。

Read about the following forms of binding in [Template Syntax](guide/template-syntax):

更多的绑定形式，见[模板语法](guide/template-syntax)：

 * [Interpolation](guide/template-syntax#interpolation)

    [插值](guide/template-syntax#interpolation)

 * [Property binding](guide/template-syntax#property-binding)

    [property 绑定](guide/template-syntax#property-binding)

 * [Event binding](guide/template-syntax#event-binding)

    [事件绑定](guide/template-syntax#event-binding)

 * [Attribute binding](guide/template-syntax#attribute-binding)

    [attribute 绑定](guide/template-syntax#attribute-binding)

 * [Class binding](guide/template-syntax#class-binding)

    [CSS 类绑定](guide/template-syntax#class-binding)

 * [Style binding](guide/template-syntax#style-binding)

    [样式绑定](guide/template-syntax#style-binding)

 * [Two-way data binding with ngModel](guide/template-syntax#ngModel)

    [基于 ngModel 的双向数据绑定](guide/template-syntax#ngModel)

{@a declarable}

## declarable

## 可声明对象（declarable）

A class type that you can add to the `declarations` list of an [NgModule](#ngmodule).
You can declare [components](#component), [directives](#directive), and [pipes](#pipe).

类的一种类型，你可以把它们添加到 [NgModule](#ngmodule) 的 `declarations` 列表中。
你可以声明[组件](#component)、[指令](#directive)和[管道](#pipe)。

Don't declare the following:

*不要*声明：

* A class that's already declared in another NgModule

   已经在其它 NgModule 中声明过的类

* An array of directives imported from another package. For example, don't declare `FORMS_DIRECTIVES` from `@angular/forms`

   从其它包中导入的指令数组。比如，不要再次声明来自 `@angular/forms` 中的 `FORMS_DIRECTIVES`

* NgModule classes

   NgModule 类

* Service classes

   服务类

* Non-Angular classes and objects, such as strings, numbers, functions, entity models, configurations, business logic, and helper classes

   非 Angular 的类和对象，比如：字符串、数字、函数、实体模型、配置、业务逻辑和辅助类

{@a decorator}

{@a decoration}

## decorator | decoration

## 装饰器（decorator | decoration）

A function that modifies a class or property definition. Decorators (also called *annotations*) are an experimental (stage 2) [JavaScript language feature](https://github.com/wycats/javascript-decorators).
TypeScript adds support for decorators.

一个函数，用来修饰紧随其后的类或属性定义。
装饰器（也叫注解）是 JavaScript 的一种语言[特性](https://github.com/wycats/javascript-decorators)，是一项位于阶段 2（stage 2）的试验特性。

Angular defines decorators that attach metadata to classes or properties
so that it knows what those classes or properties mean and how they should work.

Angular 定义了一些装饰器，用来为类或属性附加元数据，来让自己知道那些类或属性的含义，以及该如何处理它们。

See [class decorator](#class-decorator), [class field decorator](#class-field-decorator).

参见 [类装饰器](#class-decorator)、[类属性装饰器](#class-field-decorator)。

{@a di}

{@a dependency-injection}

## dependency injection (DI)

## 依赖注入（dependency injection）

A design pattern and mechanism for creating and delivering some parts of an application (dependencies) to other parts of an application that require them.

依赖注入既是设计模式，同时又是一种机制：当应用程序的一些部件（即一些依赖）需要另一些部件时，
利用依赖注入来创建被请求的部件，并将它们注入到需要它们的部件中。

In Angular, dependencies are typically services, but they also can be values, such as strings or functions.
An [injector](#injector) for an app (created automatically during bootstrap) instantiates dependencies when needed, using a configured [provider](#provider) of the service or value.

在 Angular 中，依赖通常是服务，但是也可以是值，比如字符串或函数。应用的[注入器](#injector)（它是在启动期间自动创建的）会使用该服务或值的配置好的[提供者](#provider)来按需实例化这些依赖。各个不同的提供者可以为同一个服务提供不同的实现。

Learn more in [Dependency Injection in Angular](guide/dependency-injection).

要了解更多，参见[Angular 中的依赖注入](guide/dependency-injection)一章。

{@a di-token}

## DI token

## DI 令牌（Token）

A lookup token associated with a dependency [provider](#provider), for use with the [dependency injection](#di) system.

一种用来查阅的令牌，它关联到一个依赖[提供者](#provider)，用于[依赖注入](#di)系统中。
{@a differential-loading}

## differential loading

## 差异化加载

A build technique that creates two bundles for an application. One smaller bundle is for modern browsers. A second, larger bundle allows the application to run correctly in older browsers (such as IE11) that do not support all modern browser APIs.

一种构建技术，它会为同一个应用创建两个发布包。一个是较小的发布包，是针对现代浏览器的。另一个是较大的发布包，能让该应用正确的运行在像 IE 11 这样的老式浏览器上，这些浏览器不能支持全部现代浏览器的 API。

For more information, see the [Deployment](guide/deployment#differential-loading) guide.

欲知详情，参见 [Deployment](guide/deployment#differential-loading) 一章。

{@a directive}
{@a directives}

## directive

## 指令 (directive)

A class that can modify the structure of the DOM or modify attributes in the DOM and component data model. A directive class definition is immediately preceded by a `@Directive()` [decorator](#decorator) that supplies metadata.

一个可以修改 DOM 结构或修改 DOM 和组件数据模型中某些属性的类。
指令类的定义紧跟在 `@Directive()` [装饰器](#decorator)之后，以提供元数据。

A directive class is usually associated with an HTML element or attribute, and that element or attribute is often referred to as the directive itself. When Angular finds a directive in an HTML [template](#template), it creates the matching directive class instance and gives the instance control over that portion of the browser DOM.

指令类几乎总与 HTML 元素或属性 (attribute) 相关。
通常会把这些 HTML 元素或者属性 (attribute) 当做指令本身。
当 Angular 在 HTML [模板中](#template)发现某个指令时，会创建与之相匹配的指令类的实例，并且把这部分 DOM 的控制权交给它。

There are three categories of directive:

指令分为三类：

* [Components](#component) use `@Component()` (an extension of `@Directive()`) to associate a template with a class.

   [组件](#component)使用 `@Component()`（继承自 `@Directive()`）为某个类关联一个模板。

* [Attribute directives](#attribute-directive) modify behavior and appearance of page elements.

   [属性型指令](#attribute-directive)修改页面元素的行为和外观。

* [Structural directives](#structural-directive) modify the structure of the DOM.

   [结构型指令](#structural-directive)修改 DOM 的结构。

Angular supplies a number of built-in directives that begin with the `ng` prefix.
You can also create new directives to implement your own functionality.
You associate a *selector* (an HTML tag such as `<my-directive>`) with a custom directive, thereby extending the [template syntax](guide/template-syntax) that you can use in your apps.

Angular 提供了一些以 `ng` 为前缀的内置指令。你也可以创建新的指令来实现自己的功能。
你可以为自定义指令关联一个*选择器*（一种形如 `<my-directive>` 的 HTML 标记），以扩展[模板语法](guide/template-syntax)，从而让你能在应用中使用它。

{@a dom}

## domain-specific language (DSL)

## 领域特定语言（DSL)

A special-purpose library or API; see [Domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language).

一种特殊用途的库或 API，参见[领域特定语言](https://en.wikipedia.org/wiki/Domain-specific_language)词条。

Angular extends TypeScript with domain-specific languages for a number of domains relevant to Angular apps, defined in NgModules such as [animations](guide/animations), [forms](guide/forms), and [routing and navigation](guide/router).

Angular 使用领域特定语言扩展了 TypeScript，用于与 Angular 应用相关的许多领域。这些 DSL 都定义在 NgModule 中，比如 [动画](guide/animations)、[表单](guide/forms)和[路由与导航](guide/router)。

{@a dynamic-components}

## dynamic component loading

## 动态组件加载（dynamic component loading）

A technique for adding a component to the DOM at run time. Requires that you exclude the component from compilation and then connect it to Angular's change-detection and event-handling framework when you add it to the DOM.

一种在运行期间把组件添加到 DOM 中的技术，它需要你从编译期间排除该组件，然后，当你把它添加到 DOM 中时，再把它接入 Angular 的变更检测与事件处理框架。

See also [custom element](#custom-element), which provides an easier path with the same result.

参见[自定义元素](#custom-element)，它提供了一种更简单的方式来达到相同的效果。

{@a E}

{@a eager-loading}

## eager loading

## 急性加载（Eager Loading）

NgModules or components that are loaded on launch are called eager-loaded, to distinguish them from those
that are loaded at run time (lazy-loaded).
See [lazy loading](#lazy-load).

在启动时加载的 NgModule 和组件被称为急性加载，与之相对的是那些在运行期间才加载的方式（惰性加载）。
参见[惰性加载](#lazy-load)。

{@a ecma}

## ECMAScript

## ECMAScript 语言

The [official JavaScript language specification](https://en.wikipedia.org/wiki/ECMAScript).

[官方 JavaScript 语言规范](https://en.wikipedia.org/wiki/ECMAScript)

Not all browsers support the latest ECMAScript standard, but you can use a [transpiler](#transpile) (like [TypeScript](#typescript)) to write code using the latest features, which will then be transpiled to code that runs on versions that are supported by browsers.

并不是所有浏览器都支持最新的 ECMAScript 标准，不过你可以使用[转译器](#transpile)（比如[TypeScript](#typescript)）来用最新特性写代码，然后它会被转译成可以在浏览器的其它版本上运行的代码。

To learn more, see [Browser Support](guide/browser-support).

要了解更多，参见[浏览器支持](guide/browser-support)页。

{@a element}

## element

## 元素（Element）

Angular defines an `ElementRef` class to wrap render-specific native UI elements.
In most cases, this allows you to use Angular templates and data binding to access DOM elements
without reference to the native element.

Angular 定义了 `ElementRef` 类来包装与渲染有关的原生 UI 元素。这让你可以在大多数情况下使用 Angular 的模板和数据绑定机制来访问 DOM 元素，而不必再引用原生元素。

The documentation generally refers to *elements* (`ElementRef` instances), as distinct from  *DOM elements*
(which can be accessed directly if necessary).

本文档中一般会使用**元素（Element）**来指代 `ElementRef` 的实例，注意与 **DOM 元素**（你必要时你可以直接访问它）区分开。

Compare to [custom element](#custom-element).

可以对比下[自定义元素](#custom-element)。

{@a entry-point}

## entry point

## 入口点（Entry Point）

A [JavaScript module](#module) that is intended to be imported by a user of [an
npm package](guide/npm-packages). An entry-point module typically re-exports
symbols from other internal modules. A package can contain multiple
entry points. For example, the `@angular/core` package has two entry-point
modules, which can be imported using the module names `@angular/core` and
`@angular/core/testing`.

[JavaScript 模块](#module)的目的是供 [npm 包](guide/npm-packages)的用户进行导入。入口点模块通常会重新导出来自其它内部模块的一些符号。每个包可以包含多个入口点。比如 `@angular/core` 就有两个入口点模块，它们可以使用名字 `@angular/core` 和 `@angular/core/testing` 进行导入。

{@a F}

{@a form-control}

## form control

## 表单控件（form control）

A instance of `FormControl`, which is a fundamental building block for Angular forms. Together with `FormGroup` and `FormArray`, tracks the value, validation, and status of a form input element.

一个 `FormControl` 实例，它是 Angular 表单的基本构造块。它会和 `FormGroup` 和 `FormArray` 一起，跟踪表单输入元素的值、有效性和状态。

Read more forms in the [Introduction to forms in Angular](guide/forms-overview).

欲知详情，参见 [Angular 表单简介](guide/forms-overview)。

{@a form-model}

## form model

## 表单模型（form model）

The "source of truth" for the value and validation status of a form input element at a given point in time. When using [reactive forms](#reactive-forms), the form model is created explicitly in the component class. When using [template-driven forms](#template-driven-forms), the form model is implicitly created by directives.

是指在指定的时间点，表单输入元素的值和验证状态的"事实之源"。当使用[响应式表单](#reactive-forms)时，表单模型会在组件类中显式创建。当使用[模板驱动表单](#template-driven-forms)时，表单模型是由一些指令隐式创建的。

Learn more about reactive and template-driven forms in the [Introduction to forms in Angular](guide/forms-overview).

要深入了解响应式表单和模板驱动表单，参见 [Angular 表单简介](guide/forms-overview)。

{@a form-validation}

## form validation

## 表单验证（form validation）

A check that runs when form values change and reports whether the given values are correct and complete, according to the defined constraints. Reactive forms apply [validator functions](guide/form-validation#adding-to-reactive-forms). Template-driven forms use [validator directives](guide/form-validation#adding-to-template-driven-forms).

一种检查，当表单值发生变化时运行，并根据预定义的约束来汇报指定的这些值是否正确并完全。响应式表单使用[验证器函数](guide/form-validation#adding-to-reactive-forms)，而模板驱动表单则使用[验证器指令](guide/form-validation#adding-to-template-driven-forms)。

To learn more, see [Form Validation](guide/form-validation).

要了解更多，参见[表单验证器](guide/form-validation)。

{@a G}

{@a H}

{@a I}

{@a immutability}

## immutability

## 不可变性（immutability）

The ability to alter the state of a value after its creation. [Reactive forms](#reactive-forms) perform immutable changes in that
each change to the data model produces a new data model rather than modifying the existing one. [Template-driven forms](#template-driven-forms) perform mutable changes with `NgModel` and [two-way data binding](#data-binding) to modify the existing data model in place.

是否能够在创建之后修改值的状态。[响应式表单](#reactive-forms)会执行不可变性的更改，每次更改数据模型都会生成一个新的数据模型，而不是修改现有的数据模型。
[模板驱动表单](#template-driven-forms)则会执行可变的更改，它通过 `NgModel` 和[双向数据绑定](#data-binding)来就地修改现有的数据模型。

{@a injectable}

## injectable

## 可注入对象（injectable）

An Angular class or other definition that provides a dependency using the [dependency injection](#di) mechanism. An injectable [service](#service) class must be marked by the `@Injectable()` [decorator](#decorator). Other items, such as constant values, can also be injectable.

Angular 中的类或其它概念使用[依赖注入](#di)机制来提供依赖。
可供注入的[服务](#service)类必须使用 `@Injectable()` [装饰器](#decorator)标出来。其它条目，比如常量值，也可用于注入。

{@a injector}

## injector

## 注入器 (injector)

An object in the Angular [dependency-injection](#dependency-injection) system
that can find a named dependency in its cache or create a dependency
using a configured [provider](#provider).
Injectors are created for NgModules automatically as part of the bootstrap process
and are inherited through the component hierarchy.

Angular [依赖注入系统](#dependency-injection)中可以在缓存中根据名字查找依赖，也可以通过配置过的[提供者](#provider)来创建依赖。
启动过程中会自动为每个模块创建一个注入器，并被组件树继承。

* An injector provides a singleton instance of a dependency, and can inject this same instance in multiple components.

   注入器会提供依赖的一个单例，并把这个单例对象注入到多个组件中。

* A hierarchy of injectors at the NgModule and component level can provide different instances of a dependency to their own components and child components.

   模块和组件级别的注入器树可以为它们拥有的组件及其子组件提供同一个依赖的不同实例。

* You can configure injectors with different providers that can provide different implementations of the same dependency.

   你可以为同一个依赖使用不同的提供者来配置这些注入器，这些提供者可以为同一个依赖提供不同的实现。

Learn more about the injector hierarchy in [Hierarchical Dependency Injectors](guide/hierarchical-dependency-injection).

要了解关于多级注入器的更多知识，参见[多级依赖注入](guide/hierarchical-dependency-injection)一章。

{@a input}

## input

## 输入属性 (input)

When defining a [directive](#directive), the `@Input()` decorator on a directive property
makes that property available as a *target* of a [property binding](guide/template-syntax#property-binding).
Data values flow into an input property from the data source identified
in the [template expression](#template-expression) to the right of the equal sign.

当定义[指令](#directive)时，指令属性上的 `@Input()` 装饰器让该属性可以作为[属性绑定](guide/template-syntax#property-binding)的*目标*使用。
数据值会从等号右侧的[模板表达式](#template-expression)所指定的数据源流入组件的输入属性。

To learn more, see [input and output properties](guide/template-syntax#inputs-outputs).

要了解更多，参见[输入与输出属性](guide/template-syntax#inputs-outputs)。

{@a interpolation}

## interpolation

## 插值 (interpolation)

A form of property [data binding](#data-binding) in which a [template expression](#template-expression) between double-curly braces renders as text.
That text can be concatenated with neighboring text before it is assigned to an element property
or displayed between element tags, as in this example.

[属性数据绑定 (property data binding)](#data-binding) 的一种形式，位于双花括号中的[模板表达式 (template expression)](#template-expression)会被渲染成文本。
在被赋值给元素属性或者显示在元素标签中之前，这些文本可能会先与周边的文本合并，参见下面的例子。

```html
<label>My current hero is {{hero.name}}</label>
```

Read more about [interpolation](guide/template-syntax#interpolation) in [Template Syntax](guide/template-syntax).

更多信息，见[模板语法](guide/template-syntax)中的[插值](guide/template-syntax#interpolation)。

{@a ivy}

## Ivy

## 常春藤引擎（Ivy）

Ivy is the code name for Angular's [next-generation compilation and rendering pipeline](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7).
With the version 9 release of Angular, the new compiler and runtime instructions are used by default instead of the older compiler and runtime, known as [View Engine](#ve).

Ivy 是 Angular 的[下一代编译和渲染管道](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7)的代号。在 Angular 的版本 9 中，默认情况下使用新的编译器和运行时，而不再用旧的编译器和运行时，也就是 [View Engine](#ve)。

See [Angular Ivy](guide/ivy).

参见 [Angular Ivy](guide/ivy)。

{@a J}

{@a javascript}

## JavaScript

See [ECMAScript](#ecma), [TypeScript](#typescript).

参见 [ECMAScript](#ecma) 和 [TypeScript](#typescript)。

{@a jit}

## just-in-time (JIT) compilation

## 即时 (just-in-time, JIT) 编译

The Angular just-in-time (JIT) compiler converts your Angular HTML and TypeScript code into
efficient JavaScript code at run time, as part of bootstrapping.

在启动期间，Angular 的即时编译器（JIT)会在运行期间把你的 Angular HTML 和 TypeScript 代码转换成高效的 JavaScript 代码。

JIT compilation is the default (as opposed to AOT compilation) when you run Angular's `ng build` and `ng serve` CLI commands, and is a good choice during development.
JIT mode is strongly discouraged for production use
because it results in large application payloads that hinder the bootstrap performance.

当你运行 Angular 的 CLI 命令 `ng build` 和 `ng serve` 时，JIT 编译是默认选项，而且是开发期间的最佳实践。但是强烈建议你不要在生产环境下使用 JIT 模式，因为它会导致巨大的应用负担，从而拖累启动时的性能。

Compare to [ahead-of-time (AOT) compilation](#aot).

参见[预先 (AOT) 编译](#aot)。

{@a K}

{@a L}

{@a lazy-load}

## lazy loading

## 惰性加载（Lazy loading）

A process that speeds up application load time by splitting the application into multiple bundles and loading them on demand.
For example, dependencies can be lazy loaded as needed&mdash;as opposed to [eager-loaded](#eager-loading) modules that are required by the root module and are thus loaded on launch.

惰性加载过程会把应用拆分成多个包并且按需加载它们，从而提高应用加载速度。
比如，一些依赖可以根据需要进行惰性加载，与之相对的是那些 [急性加载](#eager-loading) 的模块，它们是根模块所要用的，因此会在启动期间加载。

The [router](#router) makes use of lazy loading to load child views only when the parent view is activated.
Similarly, you can build custom elements that can be loaded into an Angular app when needed.

[路由器](#router)只有当父视图激活时才需要加载子视图。同样，你还可以构建一些自定义元素，它们也可以在需要时才加载进 Angular 应用。

{@a library}

## library

## 库（Library）

In Angular, a [project](#project) that provides functionality that can be included in other Angular apps.
A library isn't a complete Angular app and can't run independently.
(To add re-usable Angular functionality to non-Angular web apps, you can use Angular [custom elements](#angular-element).)

一种 Angular [项目](#project)。用来让其它 Angular 应用包含它，以提供各种功能。库不是一个完整的 Angular 应用，不能独立运行。（要想为非 Angular 应用添加可复用的 Angular 功能，你可以使用 Angular 的[自定义元素](#angular-element)。）

* Library developers can use the [Angular CLI](#cli) to `generate` scaffolding for a new library in an existing [workspace](#workspace), and can publish a library as an `npm` package.

  库的开发者可以使用 [CLI](#cli) 在现有的 [工作区](#workspace) 中 `generate` 新库的脚手架，还能把库发布为 `npm` 包。

* Application developers can use the [Angular CLI](#cli) to `add` a published library for use with an application in the same [workspace](#workspace).

   应用开发者可以使用 [CLI](#cli) 来把一个已发布的库 `add` 进这个应用所在的[工作区](#workspace)。

See also [schematic](#schematic).

参见 [原理图（schematic）](#schematic)。

{@a lifecycle-hook}

## lifecycle hook

## 生命周期钩子（Lifecycle hook）

An interface that allows you to tap into the lifecycle of [directives](#directive) and [components](#component) as they are created, updated, and destroyed.

一种接口，它允许你监听[指令](#directive)和[组件](#component)的生命周期，比如创建、更新和销毁等。

Each interface has a single hook method whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit`.

每个接口只有一个钩子方法，方法名是接口名加前缀 `ng`。例如，`OnInit` 接口的钩子方法名为 `ngOnInit`。

Angular calls these hook methods in the following order:

Angular 会按以下顺序调用钩子方法：

* `ngOnChanges`: When an [input](#input)/[output](#output) binding value changes.

   `ngOnChanges` - 在[输入属性 (input)](#input)/[输出属性 (output)](#output)的绑定值发生变化时调用。
* `ngOnInit`: After the first `ngOnChanges`.

   `ngOnInit` - 在第一次 `ngOnChanges` 完成后调用。

* `ngDoCheck`: Developer's custom change detection.

   `ngDoCheck` - 开发者自定义变更检测。

* `ngAfterContentInit`: After component content initialized.

   `ngAfterContentInit` - 在组件内容初始化后调用。

* `ngAfterContentChecked`: After every check of component content.

   `ngAfterContentChecked` - 在组件内容每次检查后调用。

* `ngAfterViewInit`: After a component's views are initialized.

   `ngAfterViewInit` - 在组件视图初始化后调用。

* `ngAfterViewChecked`: After every check of a component's views.

   `ngAfterViewChecked` - 在组件视图每次检查后调用。

* `ngOnDestroy`: Just before the directive is destroyed.

   `ngOnDestroy` - 在指令销毁前调用。

To learn more, see [Lifecycle Hooks](guide/lifecycle-hooks).

要了解更多，参见[生命周期钩子](guide/lifecycle-hooks)页。

{@a M}

{@a module}

## module

## 模块 (module)

In general, a module collects a block of code dedicated to a single purpose. Angular uses standard JavaScript modules and also defines an Angular module, `NgModule`.

通常，模块会收集一组专注于单一目的的代码块。Angular 既使用 JavaScript 的标准模块，也定义了 Angular 自己的模块，也就是 `NgModule`。

In JavaScript (ECMAScript), each file is a module and all objects defined in the file belong to that module. Objects can exported, making them public, and public objects can be imported for use by other modules.

在 JavaScript (ECMAScript) 中，每个文件都是一个模块，该文件中定义的所有对象都属于这个模块。这些对象可以导出为公共对象，而这些公共对象可以被其它模块导入后使用。

Angular ships as a collection of JavaScript modules (also called libraries). Each Angular library name begins with the `@angular` prefix. Install Angular libraries with the [npm package manager](https://docs.npmjs.com/getting-started/what-is-npm) and import parts of them with JavaScript `import` declarations.

Angular 就是用一组 JavaScript 模块（也叫库）的形式发布的。每个 Angular 库都带有 `@angular` 前缀。
使用 [NPM 包管理器](https://docs.npmjs.com/getting-started/what-is-npm)安装它们，并且使用 JavaScript 的 `import` 声明语句从中导入各个部件。

Compare to [NgModule](#ngmodule).

参见 [NgModule](#ngmodule)。

{@a N}

{@a ngcc}
## ngcc

Angular compatibility compiler.
If you build your app using [Ivy](#ivy), but it depends on libraries that have not been compiled with Ivy, the CLI uses `ngcc` to automatically update the dependent libraries to use Ivy.

Angular 兼容性编译器。如果使用 [Ivy](#ivy) 构建应用程序，但依赖未用 Ivy 编译的库，则 CLI 将使用 `ngcc` 自动更新依赖库以使用 Ivy。

{@a ngmodule}
## NgModule

A class definition preceded by the `@NgModule()` [decorator](#decorator), which declares and serves as a manifest for a block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.

一种带有 `@NgModule()` [装饰器](#decorator)的类定义，它会声明并提供一组专注于特定功能的代码块，比如业务领域、工作流或一组紧密相关的能力集等。

Like a [JavaScript module](#module), an NgModule can export functionality for use by other NgModules and import public functionality from other NgModules.
The metadata for an NgModule class collects components, directives, and pipes that the application uses along with the list of imports and exports. See also [declarable](#declarable).

像 [JavaScript 模块](#module)一样，NgModule 能导出那些可供其它 NgModule 使用的功能，也可以从其它 NgModule 中导入其公开的功能。
NgModule 类的元数据中包括一些供应用使用的组件、指令和管道，以及导入、导出列表。参见[可声明对象](#declarable)。

NgModules are typically named after the file in which the exported thing is defined. For example, the Angular [DatePipe](api/common/DatePipe) class belongs to a feature module named `date_pipe` in the file `date_pipe.ts`. You import them from an Angular [scoped package](#scoped-package) such as `@angular/core`.

NgModule 通常会根据它导出的内容决定其文件名，比如，Angular 的 [DatePipe](api/common/DatePipe) 类就属于 `date_pipe.ts` 文件中一个名叫 `date_pipe` 的特性模块。
你可以从 Angular 的[范围化包](#scoped-package)中导入它们，比如 `@angular/core`。

Every Angular application has a root module. By convention, the class is called `AppModule` and resides in a file named `app.module.ts`.

每个 Angular 应用都有一个根模块。通常，这个类会命名为 `AppModule`，并且位于一个名叫 `app.module.ts` 的文件中。

To learn more, see [NgModules](guide/ngmodules).

要了解更多，参见 [NgModules](guide/ngmodules)。

{@a npm-package}

## npm package

## npm 包

The [npm package manager](https://docs.npmjs.com/getting-started/what-is-npm) is used to distribute and load Angular modules and libraries.

[npm 包管理器](https://docs.npmjs.com/getting-started/what-is-npm)用于分发与加载 Angular 的模块和库。

Learn more about how Angular uses [Npm Packages](guide/npm-packages).

你还可以了解 Angular 如何使用 [Npm 包](guide/npm-packages) 的更多知识。

{@a O}

{@a observable}

## observable

## 可观察对象（Observable）

A producer of multiple values, which it pushes to [subscribers](#subscriber). Used for asynchronous event handling throughout Angular. You execute an observable by subscribing to it with its `subscribe()` method, passing callbacks for notifications of new values, errors, or completion.

一个多值生成器，这些值会被推送给[订阅者](#subscriber)。
Angular 中到处都会用到异步事件处理。你要通过调用可观察对象的 `subscribe()` 方法来订阅它，从而让这个可观察对象得以执行，你还要给该方法传入一些回调函数来接收 "有新值"、"错误" 或 "完成" 等通知。

Observables can deliver single or multiple values of any type to subscribers, either synchronously (as a function delivers a value to its caller) or on a schedule. A subscriber receives notification of new values as they are produced and notification of either normal completion or error completion.

可观察对象可以把任意类型的一个或多个值传给订阅者，无论是同步（就像函数把值返回给它的调用者一样）还是异步。
订阅者会在生成了新值时收到包含这个新值的通知，以及正常结束或错误结束时的通知。

Angular uses a third-party library called [Reactive Extensions (RxJS)](http://reactivex.io/rxjs/).

Angular 使用一个名叫[响应式扩展 (RxJS)](http://reactivex.io/rxjs/)的第三方包来实现这些功能。

To learn more, see [Observables](guide/observables).

要了解更多，参见[可观察对象](guide/observables)。

{@a observer}

## observer

## 观察者（Observer）

An object passed to the `subscribe()` method for an [observable](#observable). The object defines the callbacks for the [subscriber](#subscriber).

传给[可观察对象](#observable) 的 `subscribe()` 方法的一个对象，其中定义了[订阅者](#subscriber)的一组回调函数。

{@a output}

## output

## 输出属性 (output)

When defining a [directive](#directive), the `@Output{}` decorator on a directive property
makes that property available as a *target* of [event binding](guide/template-syntax#event-binding).
Events stream *out* of this property to the receiver identified
in the [template expression](#template-expression) to the right of the equal sign.

当定义[指令](#directive)时，指令属性上的 `@Output()` 装饰器会让该属性可用作[事件绑定](guide/template-syntax#event-binding)的*目标*。
事件从该属性流*出*到等号右侧指定的[模板表达式](#template-expression)中。

To learn more, see [Input and Output Properties](guide/template-syntax#inputs-outputs).

要了解更多，参见[输入与输出属性](guide/template-syntax#inputs-outputs)。

{@a P}

{@a pipe}

## pipe

## 管道（pipe）

A class which is preceded by the `@Pipe{}` decorator and which defines a function that transforms input values to output values for display in a [view](#view). Angular defines various pipes, and you can define new pipes.

一个带有 `@Pipe{}` 装饰器的类，它定义了一个函数，用来把输入值转换成输出值，以显示在[视图](#view)中。
Angular 定义了很多管道，并且你还可可以自定义新的管道。

To learn more, see [Pipes](guide/pipes).

要了解更多，参见[管道](guide/pipes)页。

{@a platform}

## platform

## 平台（platform）

In Angular terminology, a platform is the context in which an Angular application runs.
The most common platform for Angular applications is a web browser, but it can also be an operating system for a mobile device, or a web server.

在 Angular 术语中，平台是供 Angular 应用程序在其中运行的上下文。Angular 应用程序最常见的平台是 Web 浏览器，但它也可以是移动设备的操作系统或 Web 服务器。

Support for the various Angular run-time platforms is provided by the `@angular/platform-*` packages. These packages allow applications that make use of `@angular/core` and `@angular/common` to execute in different environments by providing implementation for gathering user input and rendering UIs for the given platform. Isolating platform-specific functionality allows the developer to make platform-independent use of the rest of the framework.

`@angular/platform-*` 软件包提供了对各种 Angular 运行时平台的支持。这些软件包通过提供用于收集用户输入和渲染指定平台 UI 的实现，以允许使用 `@angular/core` 和 `@angular/common` 的应用程序在不同的环境中执行。隔离平台相关的功能使开发人员可以独立于平台使用框架的其余部分。

* When running in a web browser, [`BrowserModule`](api/platform-browser/BrowserModule) is imported from the `platform-browser` package, and supports services that simplify security and event processing, and allows applications to access browser-specific features, such as interpreting keyboard input and controlling the title of the document being displayed. All applications running in the browser use the same platform service.

  在 Web 浏览器中运行时，[`BrowserModule`](api/platform-browser/BrowserModule) 是从 `platform-browser` 软件包中导入的，并支持简化安全性和事件处理的服务，并允许应用程序访问浏览器专有的功能，例如解释键盘输入和控制文档要显示的标题。浏览器中运行的所有应用程序都使用同一个平台服务。

* When [server-side rendering](#server-side-rendering) (SSR) is used, the [`platform-server`](api/platform-server) package provides web server implementations of the `DOM`, `XMLHttpRequest`, and other low-level features that don't rely on a browser.

  使用[服务端渲染](#server-side-rendering)（SSR）时，[`platform-server`](api/platform-server) 包将提供 `DOM`、`XMLHttpRequest` 和其它不依赖浏览器的其它底层功能的 Web 服务器端实现。

{@a polyfill}
## polyfill

## 腻子脚本（polyfill）

An [npm package](guide/npm-packages) that plugs gaps in a browser's JavaScript implementation.
See [Browser Support](guide/browser-support) for polyfills that support particular functionality for particular platforms.

一个 [NPM 包](guide/npm-packages)，它负责弥补浏览器 JavaScript 实现与最新标准之间的 "缝隙"。参见[浏览器支持](guide/browser-support)页，以了解要在特定平台支持特定功能时所需的腻子脚本。

{@a project}

## project

## 项目（project）

In the Angular CLI, a standalone application or [library](#library) that can be created or modified by a CLI command.

在 Angular CLI 中，CLI 命令可能会创建或修改独立应用或[库](#library)。

A project, as generated by the [`ng new`](cli/new), contains the set of source files, resources, and configuration files that you need to develop and test the application using the CLI. Projects can also be created with the `ng generate application` and `ng generate library` commands.

由 [`ng new`](cli/new) 创建的项目中包含一组源文件、资源和配置文件，当你用 CLI 开发或测试此应用时就会用到它们。此外，还可以用 `ng generate application` 或 `ng generate library` 命令创建项目。

For more information, see [Project File Structure](guide/file-structure).

欲知详情，参见[项目文件结构](guide/file-structure)。

The [`angular.json`](guide/workspace-config) file configures all projects in a [workspace](#workspace).

[`angular.json`](guide/workspace-config) 文件可以配置某个[工作空间](#workspace) 中的所有项目。

{@a provider}

## provider

## 提供者 (provider)

An object that implements one of the [`Provider`](api/core/Provider) interfaces. A provider object defines how to obtain an injectable dependency associated with a [DI token](#token).
An [injector](#injector) uses the provider to create a new instance of a dependency
for a class that requires it.

一个实现了 [`Provider`](api/core/Provider) 接口的对象。一个提供者对象定义了如何获取与 [DI 令牌（token）](#token) 相关联的可注入依赖。
[注入器](#injector)会使用这个提供者来创建它所依赖的那些类的实例。

Angular registers its own providers with every injector, for services that Angular defines.
You can register your own providers for services that your app needs.

Angular 会为每个注入器注册一些 Angular 自己的服务。你也可以注册应用自己所需的服务提供者。

See also [service](#service), [dependency injection](#di).

参见[服务](#service)和[依赖注入](#di)。

Learn more in [Dependency Injection](guide/dependency-injection).

欲知详情，参见[依赖注入](guide/dependency-injection)。

{@a Q}

{@a R}

{@a reactive-forms}

## reactive forms

## 响应式表单 (reactive forms)

A framework for building Angular forms through code in a component.
The alternative is a [template-driven form](#template-driven-forms).

通过组件中代码构建 Angular 表单的一个框架。
另一种技术是[模板驱动表单](#template-driven-forms)

When using reactive forms:

构建响应式表单时：

* The "source of truth", the form model, is defined in the component class.

  "事实之源"（表单模型）定义在组件类中。

* Validation is set up through validation functions rather than valdation directives.

  表单验证在组件代码而不是验证器指令中定义。

* Each control is explicitly created in the component class by creating a `FormControl` instance manually or with `FormBuilder`.

   在组件类中，使用 `new FormControl()` 或者 `FormBuilder` 显性地创建每个控件。

* The template input elements do *not* use `ngModel`.

   模板中的 `input` 元素**不**使用 `ngModel`。

* The associated Angular directives are prefixed with `form`, such as `formControl`, `formGroup`, and `formControlName`.

   相关联的 Angular 指令全部以 `Form` 开头，例如 `FormGroup()`、`FormControl()` 和 `FormControlName()`。

The alternative is a template-driven form. For an introduction and comparison of both forms approaches, see [Introduction to Angular Forms](guide/forms-overview).

另一种方式是模板驱动表单。模板驱动表单的简介和这两种方式的比较，参见 [Angular 表单简介](guide/forms-overview)。

{@a router}
{@a router-module}

## router

## 路由器 (router)

A tool that configures and implements navigation among states and [views](#view) within an Angular app.

一种工具，用来配置和实现 Angular 应用中各个状态和[视图](#view)之间的导航。

The `Router` module is an [NgModule](#ngmodule) that provides the necessary service providers and directives for navigating through application views. A [routing component](#routing-component) is one that imports the `Router` module and whose template contains a `RouterOutlet` element where it can display views produced by the router.

`Router` 模块是一个 [NgModule](#ngmodule)，它提供在应用视图间导航时需要的服务提供者和指令。[路由组件](#routing-component)是一种组件，它导入了 `Router` 模块，并且其模板中包含 `RouterOutlet` 元素，路由器生成的视图就会被显示在那里。

The router defines navigation among views on a single page, as opposed to navigation among pages. It interprets URL-like links to determine which views to create or destroy, and which components to load or unload. It allows you to take advantage of [lazy loading](#lazy-load) in your Angular apps.

路由器定义了在单页面中的各个视图之间导航的方式，而不是在页面之间。它会解释类似 URL 的链接，以决定该创建或销毁哪些视图，以及要加载或卸载哪些组件。它让你可以在 Angular 应用中获得[惰性加载](#lazy-load)的好处。

To learn more, see [Routing and Navigation](guide/router).

要了解更多，参见[路由与导航](guide/router)。

{@a router-outlet}

## router outlet

## 路由出口（router outlet）

A [directive](#directive) that acts as a placeholder in a routing component's template. Angular dynamically renders the template based on the current router state.

一种[指令](#directive)，它在路由组件的模板中扮演占位符的角色，Angular 会根据当前的路由状态动态填充它。

{@a router-component}

## routing component

## 路由组件 (routing component)

An Angular [component](#component) with a `RouterOutlet` directive in its template that displays views based on router navigations.

一个模板中带有 `RouterOutlet` 指令的 Angular [组件](#component)，用于根据路由器的导航显示相应的视图。

For more information, see [Routing and Navigation](guide/router).

要了解更多，参见[路由与导航](guide/router)。
{@a rule}

## rule

## 规则（rule）

In [schematics](#schematic), a function that operates on a [file tree](#file-tree) to create, delete, or modify files in a specific manner.

在[原理图](#schematic) 中，是指一个在[文件树](#file-tree)上运行的函数，用于以指定方式创建、删除或修改文件，并返回一个新的 `Tree` 对象。

{@a S}

{@a schematic}

## schematic

## 原理图（schematic）

A scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code.
A schematic defines [rules](#rule) that operate on a virtual file system called a [tree](#file-tree).

脚手架库会定义如何借助创建、修改、重构或移动文件和代码等操作来生成或转换某个项目。每个原理图定义了[一些规则](#rule)，以操作一个被称为[文件树](#file-tree)的虚拟文件系统。

The [Angular CLI](#cli) uses schematics to generate and modify [Angular projects](#project) and parts of projects.

Angular [CLI](#cli) 使用原理图来生成和修改 [Angular 项目](#project)及其部件。

* Angular provides a set of schematics for use with the CLI. See the [Angular CLI command reference](cli). The [`ng add`](cli/add) command runs schematics as part of adding a library to your project. The [`ng generate`](cli/generate) command runs schematics to create apps, libraries, and Angular code constructs.

  Angular 提供了一组用于 CLI 的原理图。参见 [Angular CLI 命令参考手册](cli)。当 [`ng add`](cli/add) 命令向项目中添加某个库时，就会运行原理图。[`ng generate`](cli/generate) 命令则会运行原理图，来创建应用、库和 Angular 代码块。

* [Library](#library) developers can create schematics that enable the Angular CLI to add and update their published libraries, and to generate artifacts the library defines.
Add these schematics to the npm package that you use to publish and share your library.

  公共库的开发者可以创建原理图，来让 CLI 生成他们自己的发布的库。欲知详情，参见 [devkit 文档](https://www.npmjs.com/package/@angular-devkit/schematics)。

For more information, see [Schematics](guide/schematics) and [Integrating Libraries with the CLI](guide/creating-libraries#integrating-with-the-cli).

欲知详情，参见[原理图](guide/schematics)和[把库与 CLI 集成](guide/creating-libraries#integrating-with-the-cli)。

{@a schematics-cli}

## Schematics CLI

Schematics come with their own command-line tool.
Using Node 6.9 or above, install the Schematics CLI globally:

Schematics 自带了一个命令行工具。
使用 Node 6.9 或更高版本，可以全局安装这个 Schematics CLI：

<code-example language="bash">
npm install -g @angular-devkit/schematics-cli
</code-example>

This installs the `schematics` executable, which you can use to create a new schematics [collection](#collection) with an initial named schematic. The collection folder is a workspace for schematics. You can also use the `schematics` command to add a new schematic to an existing collection, or extend an existing schematic.

这会安装可执行文件 `schematics`，你可以用它来创建新工程、往现有工程中添加新的 schematic，或扩展某个现有的 schematic。

{@a scoped-package}

## scoped package

## 范围化包 (scoped package)

A way to group related [npm packages](guide/npm-packages).
NgModules are delivered within scoped packages whose names begin with the Angular *scope name* `@angular`. For example, `@angular/core`, `@angular/common`, `@angular/forms`, and `@angular/router`.

一种把相关的 [npm 包](guide/npm-packages)分组到一起的方式。
Angular 的 NgModule 都是在一些以 `@angular` 为范围名的*范围化包*中发布的。比如 `@angular/core`、`@angular/common`、`@angular/forms` 和 `@angular/router`。

Import a scoped package in the same way that you import a normal package.

和导入普通包相同的方式导入范围化包。

<code-example path="architecture/src/app/app.component.ts" header="architecture/src/app/app.component.ts (import)" region="import">

</code-example>

{@a server-side-rendering}

## server-side rendering

## 服务端渲染

A technique that generates static application pages on the server, and can generate and serve those pages in response to requests from browsers.
It can also pre-generate pages as HTML files that you serve later.

一项在服务端生成静态应用页面的技术，它可以在对来自浏览器的请求进行响应时生成这些页面或用它们提供服务。
它还可以提前把这些页面生成为 HTML 文件，以便稍后用它们来提供服务。

This technique can improve performance on mobile and low-powered devices and improve the user experience by showing a static first page quickly while the client-side app is loading.
The static version can also make your app more visible to web crawlers.

该技术可以增强手机和低功耗设备的性能，而且会在应用加载通过快速展示一个静态首屏来提升用户体验。这个静态版本还能让你的应用对网络蜘蛛更加友好。

You can easily prepare an app for server-side rendering by using the [CLI](#cli) to run the [Angular Universal](#universal) tool, using the `@nguniversal/express-engine` [schematic](#schematic).

你可以通过 [CLI](#cli) 运行 [Angular Universal](#universal) 工具，借助 `@nguniversal/express-engine` [schematic](#schematic) 原理图来更轻松的让应用支持服务端渲染。

{@a service}

## service

## 服务 (service)

In Angular, a class with the [@Injectable()](#injectable) decorator that encapsulates non-UI logic and code that can be reused across an application.
Angular distinguishes components from services to increase modularity and reusability.

在 Angular 中，服务就是一个带有 [@Injectable](#injectable) 装饰器的类，它封装了可以在应用程序中复用的非 UI 逻辑和代码。
Angular 把组件和服务分开，是为了增进模块化程度和可复用性。

The `@Injectable()` metadata allows the service class to be used with the [dependency injection](#di) mechanism.
The injectable class is instantiated by a [provider](#provider).
[Injectors](#injector) maintain lists of providers and use them to provide service instances when they are required by components or other services.

`@Injectable` 元数据让服务类能用于[依赖注入](#di)机制中。可注入的类是用[提供者](#provider)进行实例化的。
[各个注入器](#injector)会维护一个提供者的列表，并根据组件或其它服务的需要，用它们来提供服务的实例。

To learn more, see [Introduction to Services and Dependency Injection](guide/architecture-services).

要了解更多，参见[服务与依赖注入简介](guide/architecture-services)。

{@a structural-directive}
{@a structural-directives}

## structural directives

## 结构型指令（Structural directives）

A category of [directive](#directive) that is responsible for shaping HTML layout by modifying the DOM&mdashthat is, adding, removing, or manipulating elements and their children.

一种[指令](#directive)类型，它能通过修改 DOM （添加、删除或操纵元素及其子元素）来修整或重塑 HTML 的布局。

To learn more, see [Structural Directives](guide/structural-directives).

要了解更多，参见[结构型指令](guide/structural-directives)页。

{@a subscriber}

## subscriber

## 订阅者（Subscriber）

A function that defines how to obtain or generate values or messages to be published. This function is executed when a consumer calls the `subscribe()` method of an [observable](#observable).

一个函数，用于定义如何获取或生成要发布的值或消息。
当有消费者调用[可观察对象](#observable)的 `subscribe()` 方法时，该函数就会执行。

The act of subscribing to an observable triggers its execution, associates callbacks with it, and creates a `Subscription` object that lets you unsubscribe.

订阅一个可观察对象就会触发该对象的执行、为该对象关联一些回调函数，并创建一个 `Subscription`（订阅记录）对象来让你能取消订阅。

The `subscribe()` method takes a JavaScript object (called an [observer](#observer)) with up to three callbacks, one for each type of notification that an observable can deliver:

`subscribe()` 方法接收一个 JavaScript 对象（叫做[观察者（observer）](#observer)），其中最多可以包含三个回调，分别对应可观察对象可以发出的几种通知类型：

* The `next` notification sends a value such as a number, a string, or an object.

   `next`（下一个）通知会发送一个值，比如数字、字符串、对象。

* The `error` notification sends a JavaScript Error or exception.

   `error`（错误）通知会发送 JavaScript 错误或异常。

* The `complete` notification doesn't send a value, but the handler is called when the call completes. Scheduled values can continue to be returned after the call completes.

   `complete`（完成）通知不会发送值，但是当调用结束时会调用这个处理器。异步的值可能会在调用了完成之后继续发送过来。

{@a T}

{@a target}

## target

## 目标

A buildable or runnable subset of a [project](#project), configured as an object in the [workspace configuration file](guide/workspace-config#project-tool-configuration-options), and executed by an [Architect](#architect) [builder](#builder).

[项目](#project)的一个可构建或可运行的子集，它是[工作空间配置文件](guide/workspace-config#project-tool-configuration-options)中的一个子对象，它会被[建筑师（Architect）](#architect)的[构建器（Builder）](#builder)执行。

In the `angular.json` file, each project has an "architect" section that contains targets which configure builders. Some of these targets correspond to [CLI commands](#cli), such as `build`, `serve`, `test`, and `lint`.

在 `angular.json` 文件中，每个项目都有一个 `architect` 分区，其中包含一些用于配置构建器的目标。其中一些目标对应于 [CLI 命令](#cli)，比如 `build`、`serve`、`test` 和 `lint`。

For example, the Architect builder invoked by the `ng build` command to compile a project uses a particular build tool, and has a default configuration whose values can be overridden on the command line. The `build` target also defines an alternate configuration for a "production" build, that can be invoked with the `--prod` flag on the `build` command.

比如，`ng build` 命令用来编译项目时所调用的构建器会使用一个特定的构建工具，并且具有一份默认配置，此配置中的值可以通过命令行参数进行覆盖。目标 `build` 还为 "生产环境" 构建定义了另一个配置，可以通过在 `build` 命令上添加 `--prod` 标志来调用它。

The Architect tool provides a set of builders. The [`ng new` command](cli/new) provides a set of targets for the initial application project. The [`ng generate application`](cli/generate#application) and [`ng generate library`](cli/generate#library) commands provide a set of targets for each new [project](#project). These targets, their options and configurations, can be customized to meet the needs of your project. For example, you may want to add a "staging" or "testing" configuration to a project's "build" target.

建筑师工具提供了一组构建器。[`ng new` 命令](cli/new)为初始应用项目提供了一组目标。[`ng generate application`](cli/generate#application) 和 [`ng generate library`](cli/generate#library) 命令则为每个新[项目](#project)提供了一组目标。这些目标的选项和配置都可以进行自定义，以便适应你项目的需求。比如，你可能会想为项目的 "build" 目标添加一个 "staging" 或 "testing" 配置。

You can also define a custom builder, and add a target to the project configuration that uses your custom builder. You can then run the target using the [`ng run`](cli/run) CLI command.

你还可以定义一个自定义构建器，并且往项目配置中添加一个目标，来使用你的自定义构建器。然后你就可以通过 [`ng run`](cli/run) 命令来运行此目标。

{@a template}

## template

## 模板 (template)

Code that defines how to render a component's [view](#view).

用来定义要如何在 HTML 中渲染组件[视图](#view)的代码。

A template combines straight HTML with Angular [data-binding](#data-binding) syntax, [directives](#directive),
and [template expressions](#template-expression) (logical constructs).
The Angular elements insert or calculate values that modify the HTML elements before the page is displayed. Learn more about Angular template language in the [Template Syntax](guide/template-syntax) guide.

模板会把纯 HTML 和 Angular 的[数据绑定](#data-binding)语法、[指令](#directive)和[模板表达式](#template-expression)组合起来。Angular 的元素会插入或计算那些值，以便在页面显示出来之前修改 HTML 元素。

A template is associated with a [component class](#component) through the `@Component()` [decorator](#decorator). The template code can be provided inline, as the value of the `template` property, or in a separate HTML file linked through the `templateUrl` property. 

模板通过 `@Component()` [装饰器](#decorator)与[组件类](#component)类关联起来。模板代码可以作为 `template` 属性的值用内联的方式提供，也可以通过 `templateUrl` 属性链接到一个独立的 HTML 文件。

Additional templates, represented by `TemplateRef` objects, can define alternative or *embedded* views, which can be referenced from multiple components.

用 `TemplateRef` 对象表示的其它模板用来定义一些备用视图或*内嵌*视图，它们可以来自多个不同的组件。

{@a template-driven-forms}

## template-driven forms

## 模板驱动表单（template-driven forms）

A format for building Angular forms using HTML forms and input elements in the view.
The alternative format uses the [reactive forms](#reactive-forms) framework.

一种在视图中使用 HTML 表单和输入类元素构建 Angular 表单的格式。
它的替代方案是[响应式表单](#reactive-forms)框架。

When using template-driven forms:

当构建模板驱动表单时：

* The "source of truth" is the template. The validation is defined using attributes on the individual input elements.

   模板是“事实之源”。使用属性 (attribute) 在单个输入元素上定义验证规则。

* [Two-way binding](#data-binding) with `ngModel` keeps the component model synchronized with the user's entry into the input elements.

   使用 `ngModel` 进行[双向绑定](#data-binding)，保持组件模型和用户输入之间的同步。
* Behind the scenes, Angular creates a new control for each input element, provided you have set up a `name` attribute and two-way binding for each input.

   在幕后，Angular 为每个带有 `name` 属性和双向绑定的输入元素创建了一个新的控件。

* The associated Angular directives are prefixed with `ng` such as `ngForm`, `ngModel`, and `ngModelGroup`.

   相关的 Angular 指令都带有 `ng` 前缀，例如 `ngForm`、`ngModel` 和 `ngModelGroup`。

The alternative is a reactive form. For an introduction and comparison of both forms approaches, see [Introduction to Angular Forms](guide/forms-overview).

另一种方式是响应式表单。响应式表单的简介和两种方式的比较参见 [Angular 表单简介](guide/forms-overview)。

{@a template-expression}

## template expression

## 模板表达式（template expression）

A TypeScript-like syntax that Angular evaluates within a [data binding](#data-binding).

一种类似 TypeScript 的语法，Angular 用它对[数据绑定 (data binding)](#data-binding)进行求值。

Read about how to write template expressions in  [Template expressions](guide/template-syntax#template-expressions).

到[模板表达式](guide/template-syntax#template-expressions)部分了解更多模板表达式的知识。

{@a token}

## token

## 令牌（Token）

An opaque identifier used for efficient table lookup. In Angular, a [DI token](#di-token) is used to find [providers](#provider) of dependencies in the [dependency injection](#di) system.

用于高效查表的不透明标识符（译注：不透明是指你不必了解其细节）。在 Angular 中，[DI 令牌](#di-token)用于在[依赖注入](#di)系统中查找[服务提供者](#provider)。

{@a transpile}

## transpile

## 转译（transpile)

The translation process that transforms one version of JavaScript to another version; for example, down-leveling ES2015 to the older ES5 version.

一种翻译过程，它会把一个版本的 JavaScript 转换成另一个版本，比如把下一版的 ES2015 转换成老版本的 ES5。
{@a file-tree}

## tree

## 目录树（tree）

In [schematics](#schematic), a virtual file system represented by the `Tree` class.
Schematic [rules](#rule) take a tree object as input, operate on them, and return a new tree object.

在 [schematics](#schematic) 中，一个用 `Tree` 类表示的虚拟文件系统。
Schematic [规则](#rule)以一个 `tree` 对象作为输入，对它们进行操作，并且返回一个新的 `tree` 对象。

{@a typescript}

## TypeScript

A programming language based on JavaScript that is notable for its optional typing system.
TypeScript provides compile-time type checking and strong tooling support (such as
code completion, refactoring, inline documentation, and intelligent search).
Many code editors and IDEs support TypeScript either natively or with plug-ins.

TypeScript 是一种基于 JavaScript 的程序设计语言，以其可选类型系统著称。
TypeScript 提供了编译时类型检查和强大的工具支持（比如代码补齐、重构、内联文档和智能搜索等）。
许多代码编辑器和 IDE 都原生支持 TypeScript 或通过插件提供支持。

TypeScript is the preferred language for Angular development.
Read more about TypeScript at [typescriptlang.org](http://www.typescriptlang.org/).

TypeScript 是 Angular 的首选语言。要了解更多，参见 [typescriptlang.org](http://www.typescriptlang.org/)。

## TypeScript configuration file

## TypeScript 配置文件

A file specifies the root files and the compiler options required to compile a TypeScript project. For more information, see [TypeScript configuration](/guide/typescript-configuration).

一个文件，用来指定编译 TypeScript 项目时的根文件和编译器选项。欲知详情，参见 [TypeScript 配置](/guide/typescript-configuration)。

{@a U}

{@a unidirectional-data-flow}

## unidirectional data flow

## 单向数据流

A data flow model where the component tree is always checked for changes in one direction (parent to child), which prevents cycles in the change detection graph.

一种数据流模型，它总是在一个方向（从父到子）上检查组件树是否有变化，以防止在变更检测图中出现循环。

In practice, this means that data in Angular flows downward during change detection.
A parent component can easily change values in its child components because the parent is checked first.
A failure could occur, however, if a child component tries to change a value in its parent during change detection (inverting the expected data flow), because the parent component has already been rendered.
In development mode, Angular throws the `ExpressionChangedAfterItHasBeenCheckedError` error if your app attempts to do this, rather than silently failing to render the new value.

在实践中，这意味着 Angular 中的数据会在变更检测过程中向下流动。父组件可以很容易地改变子组件中的值，因为父组件是先检查的。但是，如果子组件在更改检测期间（反转预期的数据流）尝试更改其父组件中的值，则可能会导致错误，因为父组件已经渲染过了。在开发模式下，如果你的应用尝试这样做，Angular 会抛出 `ExpressionChangedAfterItHasBeenCheckedError` 错误，而不是沉默地渲染新值。

To avoid this error, a [lifecycle hook](guide/lifecycle-hooks) method that seeks to make such a change should trigger a new change detection run. The new run follows the same direction as before, but succeeds in picking up the new value.

为了避免这个错误，进行此类更改的[生命周期钩子](guide/lifecycle-hooks)方法中就要触发一次新的变更检测。这次新的变更检测与之前那次的方向一样，但可以成功获得新值。

{@a universal}

## Universal

A tool for implementing [server-side rendering](#server-side-rendering) of an Angular application.
When integrated with an app, Universal generates and serves static pages on the server in response to requests from browsers.
The initial static page serves as a fast-loading placeholder while the full application is being prepared for normal execution in the browser.

用来帮 Angular 应用实现[服务端渲染](#server-side-rendering)的工具。
当与应用集成在一起时，Universal 可以在服务端生成静态页面并用它们来响应来自浏览器的请求。
当浏览器正准备运行完整版应用的时候，这个初始的静态页可以用作一个可快速加载的占位符。

To learn more, see [Angular Universal: server-side rendering](guide/universal).

欲知详情，参见 [Angular Universal: 服务端渲染](guide/universal)。

{@a V}

{@a view}

## view

## 视图 (view)

The smallest grouping of display elements that can be created and destroyed together.
Angular renders a view under the control of one or more [directives](#directive).

视图是可显示元素的最小分组单位，它们会被同时创建和销毁。
Angular 在一个或多个[指令 (directive)](#directive) 的控制下渲染视图。

A [component](#component) class and its associated [template](#template) define a view.
A view is specifically represented by a `ViewRef` instance associated with a component.
A view that belongs immediately to a component is called a *host view*.
Views are typically collected into [view hierarchies](#view-tree).

[组件 (component)](#component) 类及其关联的[模板 (template)](#template)定义了一个视图。
具体实现上，视图由一个与该组件相关的 `ViewRef` 实例表示。
直属于某个组件的视图叫做*宿主视图*。
通常会把视图组织成一些[视图树（view hierarchies）](#view-tree)。

Properties of elements in a view can change dynamically, in response to user actions;
the structure (number and order) of elements in a view can't.
You can change the structure of elements by inserting, moving, or removing nested views within their view containers.

视图中各个元素的属性可以动态修改以响应用户的操作，而这些元素的结构（数量或顺序）则不能。你可以通过在它们的视图容器中插入、移动或移除内嵌视图来修改这些元素的结构。

View hierarchies can be loaded and unloaded dynamically as the user navigates through the application, typically under the control of a [router](#router).

当用户在应用中导航时（比如使用[路由器](#router)），视图树可以动态加载或卸载。

{@a ve}

## View Engine

## 视图引擎（View Engine）

The compilation and rendering pipeline used by Angular before version 9. Compare [Ivy](#ivy).

Angular 9 之前的版本使用的编译和渲染管道。可对比 [Ivy](#ivy)。

{@a view-tree}

## view hierarchy

## 视图树（View hierarchy）

A tree of related views that can be acted on as a unit. The root view is a component's *host view*.  A host view can be the root of a tree of *embedded views*, collected in a *view container* (`ViewContainerRef`) attached to an anchor element in the hosting component. The view hierarchy is a key part of Angular [change detection](#change-detection).

一棵相关视图的树，它们可以作为一个整体行动。其根视图就是组件的*宿主视图*。宿主视图可以是*内嵌视图*树的根，它被收集到了宿主组件上的一个*视图容器（`ViewContainerRef`）*中<!-- 再校对 -->。视图树是 Angular [变更检测](#change-detection)的关键部件之一。

The view hierarchy doesn't imply a component hierarchy. Views that are embedded in the context of a particular hierarchy can be host views of other components. Those components can be in the same NgModule as the hosting component, or belong to other NgModules.

视图树和组件树并不是一一对应的。那些嵌入到指定视图树上下文中的视图也可能是其它组件的宿主视图。那些组件可能和宿主组件位于同一个 NgModule 中，也可能属于其它 NgModule。

{@a W}
{@a web-component}

## web component

## Web 组件

See [custom element](#custom-element).

参见[自定义元素](#custom-element)

{@a workspace}

## workspace

## 工作空间（Workspace）

A collection of Angular [projects](#project) (that is, applications and libraries) powered by the [Angular CLI] (#cli) that are typically co-located in a single source-control repository (such as [git](https://git-scm.com/)).

一组基于 [Angular CLI] (#cli) 的 Angular [项目](#project)（也就是说应用或库），它们通常共同位于一个单一的源码仓库（比如 [git](https://git-scm.com/)）中。

The [CLI](#cli) [`ng new` command](cli/new) creates a file system directory (the "workspace root").
In the workspace root, it also creates the workspace [configuration file](#configuration) (`angular.json`) and, by default, an initial application project with the same name.

[CLI](#cli) 的 [`ng new` 命令](cli/new)会在文件系统中创建一个目录（也就是工作空间的根目录）。
在工作空间根目录下，还会创建此工作空间的[配置文件](#configuration)（`angular.json`），并且还会默认初始化一个同名的应用项目。

Commands that create or operate on apps and libraries (such as `add` and `generate`) must be executed from within a workspace folder.

而用来创建或操作应用和库的命令（比如 `add` 和 `generate`）必须在工作区目录下才能执行。

For more information, see [Workspace Configuration](guide/workspace-config).

欲知详情，参见[工作空间配置](guide/workspace-config)。

{@a cli-config}

{@a config}

## workspace configuration

## 工作空间配置（Workspace configuration）

A file named `angular.json` at the root level of an Angular [workspace](#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools that are provided by or integrated with the [Angular CLI](#cli).

一个名叫 `angular.json` 的文件，它位于 Angular [工作空间](#workspace) 的根目录下，并为 [Angular CLI](#cli) 提供的或集成的各个构建/开发工具提供工作空间级和项目专属的默认配置项。

For more information, see [Workspace Configuration](guide/workspace-config).

欲知详情，参见[工作空间配置](guide/workspace-config)。

Additional project-specific configuration files are used by tools, such as `package.json` for the [npm package manager](#npm-package), `tsconfig.json` for [TypeScript transpilation](#transpile), and `tslint.json` for [TSLint](https://palantir.github.io/tslint/).

还有一些项目专属的配置文件是给某些工具使用的。比如 `package.json` 是给 [npm 包管理器](#npm-package)使用的，`tsconfig.json` 是给 [TypeScript 转译器](#transpile)使用的，而 `tslint.json` 是给 [TSLint](https://palantir.github.io/tslint/) 使用的。

For more information, see [Workspace and Project File Structure](guide/file-structure).

欲知详情，参见[工作空间和项目文件结构](guide/file-structure)。

{@a X}

{@a Y}

{@a Z}
{@a zone}

## zone

## 区域 (zone)

An execution context for a set of asynchronous tasks. Useful for debugging, profiling, and testing apps that include asynchronous operations such as event processing, promises, and calls to remote servers.

一组异步任务的执行上下文。它对于调试、性能分析和测试那些包含了异步操作（如事件处理、承诺、远程服务器调用等）的应用是非常有用的。

An Angular app runs in a zone where it can respond to asynchronous events by checking for data changes and updating the information it displays by resolving [data bindings](#data-binding).

Angular 应用会运行在一个 Zone 区域中，在这里，它可以对异步事件做出反应，可以通过检查数据变更、利用[数据绑定 (data bindings)](#data-binding) 来更新信息显示。

A zone client can take action before and after an async operation completes.

Zone 的使用方可以在异步操作完成之前或之后采取行动。

Learn more about zones in this
[Brian Ford video](https://www.youtube.com/watch?v=3IqtmUscE_U).

要了解更多，参见 [Brian Ford 的视频](https://www.youtube.com/watch?v=3IqtmUscE_U)。
