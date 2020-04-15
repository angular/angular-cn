# Workspace npm dependencies

# Npm 包

The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?") and distributed via the [npm registry](https://docs.npmjs.com/).

Angular 框架、[**Angular CLI**](https://cli.angular.io/)、Angular 应用程序所用到的组件都打包成 [npm packages](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?")，并通过 [npm registry](https://docs.npmjs.com/) 进行分发。

You can download and install these npm packages by using the [npm CLI client](https://docs.npmjs.com/cli/install), which is installed with and runs as a [Node.js®](https://nodejs.org "Nodejs.org") application. By default, the Angular CLI uses the npm client.

你可以使用 [npm CLI client](https://docs.npmjs.com/cli/install) 来下载并安装这些 npm 包，它通过 [Node.js®](https://nodejs.org "Nodejs.org") 安装并运行。默认情况下，Angular CLI 会使用 npm 客户端。

Alternatively, you can use the [yarn client](https://yarnpkg.com/) for downloading and installing npm packages.

另外，你还可以使用 [**yarn** 客户端](https://yarnpkg.com/en/) 来下载并安装 npm 包。

<div class="alert is-helpful">

See [Local Environment Setup](guide/setup-local "Setting up for Local Development") for information about the required versions and installation of `Node.js` and `npm`.

参见[建立本地开发环境](guide/setup-local "Setting up for Local Development")，以了解所需的 `Node.js` 和 `npm` 版本。

If you already have projects running on your machine that use other versions of Node.js and npm, consider using [nvm](https://github.com/creationix/nvm) to manage the multiple versions of Node.js and npm.

如果你的电脑上已经有了使用其它 Node.js 和 npm 版本的项目，可考虑使用 [nvm](https://github.com/creationix/nvm) 来管理 Node.js 和 npm 的多个版本。

</div>


## `package.json`

Both `npm` and `yarn` install the packages that are identified in a [`package.json`](https://docs.npmjs.com/files/package.json) file.

无论使用 `npm` 还是 `yarn` 安装的包，都会记录在 [`package.json`](https://docs.npmjs.com/files/package.json) 文件中。

The CLI command `ng new` creates a `package.json` file when it creates the new workspace.
This `package.json` is used by all projects in the workspace, including the initial app project that is created by the CLI when it creates the workspace.

CLI 的 `ng new` 命令会在创建新的工作区的同时创建一个 `package.json`。
这个 `package.json` 用于此工作区中的所有项目，包括由 CLI 在创建工作区时创建的那个初始项目。

Initially, this `package.json` includes _a starter set of packages_, some of which are required by Angular and others that support common application scenarios.
You add packages to `package.json` as your application evolves.
You may even remove some.

最初，这个 `package.json` 包括*一组初始包*，其中有些是 Angular 自身需要的，另一些是用来支持一些常见的应用场景。
随着应用的演化，你可能会往 `package.json` 中添加甚至移除一些包。

The `package.json` is organized into two groups of packages:

`package.json` 文件中的包被分成了两组：

* [Dependencies](guide/npm-packages#dependencies) are essential to *running* applications.

  [dependencies](guide/npm-packages#dependencies) 是*运行*应用的基础。

* [DevDependencies](guide/npm-packages#dev-dependencies) are only necessary to *develop* applications.

  [devDependencies](guide/npm-packages#dev-dependencies) 只有在*开发*应用时才会用到。

<div class="alert is-helpful">

**Library developers:** By default, the CLI command [`ng generate library`](cli/generate) creates a `package.json` for the new library. That `package.json` is used when publishing the library to npm.
For more information, see the CLI wiki page [Library Support](https://github.com/angular/angular-cli/wiki/stories-create-library). 

**代码库开发者：**默认情况下，CLI 命令 [`ng generate library`](cli/generate) 会为新的代码库项目创建一个 `package.json`。这个 `package.json` 会在把该代码库发布到 npm 时用到。
要了解更多信息，参见 CLI 的 wiki 页面[代码库支持](https://github.com/angular/angular-cli/wiki/stories-create-library)。
</div>


{@a dependencies}
## Dependencies

The packages listed in the `dependencies` section of `package.json` are essential to *running* applications.

`package.json` 文件的 `dependencies` 区列出的包都是运行应用时必备的。

The `dependencies` section of `package.json` contains:

 `package.json` 的 `dependencies` 区包括：

* [**Angular packages**](#angular-packages): Angular core and optional modules; their package names begin `@angular/`.

   [**Angular 包**：Angular 的核心和可选模块，它们的包名以 `@angular/` 开头。

* [**Support packages**](#support-packages): 3rd party libraries that must be present for Angular apps to run.

   [**支持包**](#support-packages)：那些 Angular 应用运行时必需的第三方库。

* [**Polyfill packages**](#polyfills): Polyfills plug gaps in a browser's JavaScript implementation.

   [**腻子脚本**](#polyfills)：腻子脚本负责抹平不同浏览器的 JavaScript 实现之间的差异。

To add a new dependency, use the [`ng add`](cli/add) command.

要想添加新的依赖，请使用 [`ng add`](cli/add) 命令。

{@a angular-packages}
### Angular packages

### Angular 包

The following Angular packages are included as dependencies in the default `package.json` file for a new Angular workspace.
For a complete list of Angular packages, see the [API reference](http://angular.io/api?type=package).

新 Angular 工作区的 `package.json` 文件中默认包含下列 Angular 包。
要了解 Angular 包的完整列表，参见 [API 参考手册](http://angular.io/api?type=package)。

Package name                               | Description
----------------------------------------   | --------------------------------------------------
包名                               | 说明
[**@angular/animations**](api/animations) | Angular's animations library makes it easy to define and apply animation effects such as page and list transitions. For more information, see the [Animations guide](guide/animations).
[**@angular/animations**](api/animations) | Angular 的动画库能让你更容易地定义和应用页面和列表的动画效果。欲知详情，参见[动画](guide/animations)。
[**@angular/common**](api/common) | The commonly-needed services, pipes, and directives provided by the Angular team. The [`HttpClientModule`](api/common/http/HttpClientModule) is also here, in the [`@angular/common/http`](api/common/http) subfolder. For more information, see the [HttpClient guide](guide/http).
[**@angular/common**](api/common) | Angular 开发组提供的常用服务、管道和指令。[`HttpClientModule`](api/common/http/HttpClientModule) 也位于这里的 [`@angular/common/http`](api/common/http) 子目录下。欲知详情，参见 [HttpClient](guide/http)。
**@angular/compiler** | Angular's template compiler. It understands templates and can convert them to code that makes the application run and render. Typically you don’t interact with the compiler directly; rather, you use it indirectly via `platform-browser-dynamic` when JIT compiling in the browser. For more information, see the [Ahead-of-time Compilation guide](guide/aot-compiler).
**@angular/compiler** | Angular的模板编译器。它能理解模板并把模板转换成代码，这些代码可以运行并渲染应用程序。通常，你不必直接与这个编译器打交道，而是当浏览器进行 JIT 编译时，通过 `platform-browser-dynamic` 间接使用它。欲知详情，参见 [AOT （预先）编译](guide/aot-compiler)。
[**@angular/core**](api/core) | Critical runtime parts of the framework that are needed by every application. Includes all metadata decorators, `Component`, `Directive`,  dependency injection, and the component lifecycle hooks.
[**@angular/core**](api/core) | 本框架最关键的运行时部件，每个应用都需要它们。包括全部元数据装饰器（比如 `Component`, `Directive`）、依赖注入和组件生命周期等。
[**@angular/forms**](api/forms) | Support for both [template-driven](guide/forms) and [reactive forms](guide/reactive-forms). For information about choosing the best forms approach for your app, see [Introduction to forms](guide/forms-overview).
[**@angular/forms**](api/forms) | 用于支持[模板驱动表单](guide/forms)和[响应式表单](guide/reactive-forms)。要想了解你的应用最好选择哪种方式，请参见[表单简介](guide/forms-overview)。
[**@angular/<br />platform&#8209;browser**](api/platform-browser) | Everything DOM and browser related, especially the pieces that help render into the DOM. This package also includes the `bootstrapModuleFactory()` method for bootstrapping applications for production builds that pre-compile with [AOT](guide/aot-compiler).
[**@angular/<br />platform&#8209;browser**](api/platform-browser) | 与 DOM 和浏览器有关的一切，特别是那些帮助往 DOM 中渲染的部分。这个包中还包括 `bootstrapModuleFactory()` 方法，该方法可以使用 [AOT](guide/aot-compiler) 编译器构建的生产环境发布包来引导应用。
[**@angular/<br />platform&#8209;browser&#8209;dynamic**](api/platform-browser-dynamic) | Includes [providers](api/core/Provider) and methods to compile and run the app on the client using the [JIT compiler](guide/aot-compiler).
[**@angular/<br />platform&#8209;browser&#8209;dynamic**](api/platform-browser-dynamic) | 包含那些用来在 [JIT 编译器](guide/aot-compiler)的客户端上编译并运行应用的[提供者](api/core/Provider)和方法。
[**@angular/router**](api/router) | The router module navigates among your app pages when the browser URL changes. For more information, see [Routing and Navigation](guide/router).
[**@angular/router**](api/router) | 当浏览器的 URL 变化时，路由器模块可以在应用的页面之间进行导航。欲知详情，参见[路由与导航](guide/router)。


{@a support-packages}
### Support packages

### 支持包

The following support packages are included as dependencies in the default `package.json` file for a new Angular workspace.

新的 Angular 工作区的 `package.json` 文件中默认包含下列支持包。

Package name                               | Description
----------------------------------------   | --------------------------------------------------
包名                               | 说明
[**rxjs**](https://github.com/ReactiveX/rxjs) | Many Angular APIs return [_observables_](guide/glossary#observable). RxJS is an implementation of the proposed [Observables specification](https://github.com/tc39/proposal-observable) currently before the [TC39](https://www.ecma-international.org/memento/tc39.htm) committee, which determines standards for the JavaScript language.
[**rxjs**](https://github.com/ReactiveX/rxjs) | 很多 Angular API 都会返回[*可观察对象*](guide/glossary#observable)。RxJS 是对计划中的 [Observable 规范的实现](https://github.com/tc39/proposal-observable)，它正在等待 [TC39](http://www.ecma-international.org/memento/TC39.htm) 委员会来决定是否将其纳入语言规范。
[**zone.js**](https://github.com/angular/zone.js) | Angular relies on zone.js to run Angular's change detection processes when native JavaScript operations raise events. Zone.js is an implementation of a [specification](https://gist.github.com/mhevery/63fdcdf7c65886051d55) currently before the [TC39](https://www.ecma-international.org/memento/tc39.htm) committee that determines standards for the JavaScript language.
[**zone.js**](https://github.com/angular/zone.js) | 当原生 JavaScript 操作发生事件时，Angular 要依靠 zone.js 来运行 Angular 的变更检测过程。 Zone.js 是对一个[规范](https://gist.github.com/mhevery/63fdcdf7c65886051d55)的实现，它正在等待 [TC39](http://www.ecma-international.org/memento/TC39.htm) 委员会来决定是否将其纳入语言规范。

{@a polyfills}
### Polyfill packages

### 腻子脚本包

Many browsers lack native support for some features in the latest HTML standards,
features that Angular requires.
[_Polyfills_](https://en.wikipedia.org/wiki/Polyfill_(programming)) can emulate the missing features.
The [Browser Support](guide/browser-support) guide explains which browsers need polyfills and
how you can add them.

很多浏览器欠缺对 Angular 所需的某些最新 HTML 标准、特性的原生支持。
[腻子脚本](https://en.wikipedia.org/wiki/Polyfill_(programming) 可以模拟这些缺失的特性。
[浏览器支持](guide/browser-support)一章中解释了哪些浏览器分别需要哪些腻子脚本，以及如何添加它们。

The `package.json` for a new Angular workspace installs the [core-js](https://github.com/zloirock/core-js) package,
which polyfills missing features for several popular browser.

默认的 `package.json` 会为新的 Angular 工作区安装 **[core-js](https://github.com/zloirock/core-js)** 包，它会弥补很多常用浏览器缺失的特性。

{@a dev-dependencies}

## DevDependencies

The packages listed in the `devDependencies` section of `package.json` help you develop the application on your local machine. You don't deploy them with the production application.

`package.json` 的 *devDependencies* 区列出的这些包可以帮助你在本机开发应用。
你不必把它们部署到生产环境中。

To add a new `devDependency`, use either one of the following commands:

要想添加新的 `devDependency`，请使用下列命令之一：

<code-example language="sh" class="code-shell">
  npm install --save-dev &lt;package-name&gt;
</code-example>

<code-example language="sh" class="code-shell">
  yarn add --dev &lt;package-name&gt;
</code-example>

The following `devDependencies` are provided in the default `package.json` file for a new Angular workspace.

新 Angular 工作区的默认 `package.json` 中包含下列 `devDependencies` 

Package name                               | Description
----------------------------------------   | -----------------------------------
包名                               | 说明
[**@angular&#8209;devkit/<br />build&#8209;angular**](https://github.com/angular/angular-cli/) | The Angular build tools.
[**@angular&#8209;devkit/<br />build&#8209;angular**](https://github.com/angular/angular-cli/) | Angular 构建工具。
[**@angular/cli**](https://github.com/angular/angular-cli/) | The Angular CLI tools.
[**@angular/cli**](https://github.com/angular/angular-cli/) | Angular CLI 工具。
**@angular/<br />compiler&#8209;cli** | The Angular compiler, which is invoked by the Angular CLI's `ng build` and `ng serve` commands.
**@angular/<br />compiler&#8209;cli** | Angular 编译器，Angular CLI 的 `ng build` 和 `ng serve` 命令会调用它。
**@angular/<br />language&#8209;service** | The [Angular language service](guide/language-service) analyzes component templates and provides type and error information that TypeScript-aware editors can use to improve the developer's experience. For example, see the [Angular language service extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).
**@angular/<br />language&#8209;service** | [Angular 语言服务](guide/language-service)会分析组件模板并给出类型信息和错误信息，支持 TypeScript 的编辑器可以使用它来提升开发体验。具体的例子可参见 [VS Code 的 Angular 语言服务扩展](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)。
**@types/... ** | TypeScript definition files for 3rd party libraries such as Jasmine and Node.js.
**@types/... ** | 第三方库（如 Jasmine、Node.js）的 TypeScript 类型定义文件。
[**codelyzer**](https://www.npmjs.com/package/codelyzer) | A linter for Angular apps whose rules conform to the Angular [style guide](guide/styleguide).
[**codelyzer**](https://www.npmjs.com/package/codelyzer) | Angular 应用的风格检查器（linter），它可以为满足 Angular [风格指南](guide/styleguide)中的规则提供保障。
**jasmine/... ** | Packages to support the [Jasmine](https://jasmine.github.io/) test library.
**jasmine/... ** | 用于支持 [Jasmine](https://jasmine.github.io/) 测试库的包。
**karma/... ** | Packages to support the [karma](https://www.npmjs.com/package/karma) test runner.
**karma/... ** | 用于支持 [karma](https://www.npmjs.com/package/karma) 测试运行器的包。
[**protractor**](https://www.npmjs.com/package/protractor) | An end-to-end (e2e) framework for Angular apps. Built on top of [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs).
[**protractor**](https://www.npmjs.com/package/protractor) | 一个针对 Angular 应用的端到端 (e2e) 测试框架。基于 [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) 构建。
[**ts-node**](https://www.npmjs.com/package/ts-node) | TypeScript execution environment and REPL for Node.js.
[**ts-node**](https://www.npmjs.com/package/ts-node) | 供 Node.js 使用的 TypeScript 运行环境和 REPL。
[**tslint**](https://www.npmjs.com/package/tslint) | A static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors.
[**tslint**](https://www.npmjs.com/package/tslint) | 一个静态分析工具，它可以检查 TypeScript 代码的可读性、可维护性和功能性方面的错误。
[**typescript**](https://www.npmjs.com/package/typescript) | The TypeScript language server, including the *tsc* TypeScript compiler.
[**typescript**](https://www.npmjs.com/package/typescript) | TypeScript 语言的服务提供者，包括 TypeScript 编译器 *tsc*。

## Related information

## 相关信息

 For information about how the Angular CLI handles packages see the following guides: 

 要了解 Angular CLI 如何处理包的更多信息，请参见下列章节：
 * [Building and serving](guide/build) describes how packages come together to create a development build.

   [Building and serving](guide/build) 描述了这些包如何协作，以进行开发期构建。

 * [Deployment](guide/deployment) describes how packages come together to create a production build.

   [Deployment](guide/deployment) 中描述了这些包如何协作，以创建一个生产环境构建。