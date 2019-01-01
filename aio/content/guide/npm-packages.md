# Workspace npm dependencies

# Npm 包

 The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?") and distributed via the [npm registry](https://docs.npmjs.com/).

 Angular 框架、[**Angular CLI**](https://cli.angular.io/)、Angular 应用程序所用到的组件都打包成 [npm packages](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?")，并通过 [npm registry](https://docs.npmjs.com/) 进行分发。

You can download and install these npm packages by using the [npm CLI client](https://docs.npmjs.com/cli/install), which is installed with and runs as a [Node.js®](https://nodejs.org "Nodejs.org") application. By default, the Angular CLI uses the npm client.

你可以使用 [npm CLI client](https://docs.npmjs.com/cli/install) 来下载并安装这些 npm 包，它通过 [Node.js®](https://nodejs.org "Nodejs.org") 安装并运行。默认情况下，Angular CLI 会使用 npm 客户端。

Alternatively, you can use the [yarn client](https://yarnpkg.com/) for downloading and installing npm packages. 

另外，你还可以使用 [**yarn** 客户端](https://yarnpkg.com/en/) 来下载并安装 npm 包。

<div class="alert is-helpful">

See [Getting Started](guide/quickstart#prerequisites) for information about the required versions and installation of Node.js and npm.

参见[快速起步](guide/quickstart#prerequisites)，以了解所需的 Node.js 和 npm 版本。

If you already have projects running on your machine that use other versions of Node.js and npm, consider using [nvm](https://github.com/creationix/nvm) to manage the multiple versions of Node.js and npm. 

如果你的电脑上已经有了使用其它 Node.js 和 npm 版本的项目，可考虑使用 [nvm](https://github.com/creationix/nvm) 来管理 Node.js 和 npm 的多个版本。

</div>


## `package.json`

Both `npm` and `yarn` install the packages that are identified in a [`package.json`](https://docs.npmjs.com/files/package.json) file.

无论使用 `npm` 还是 `yarn` 安装的包，都会记录在 [`package.json`](https://docs.npmjs.com/files/package.json) 文件中。

The CLI command `ng new` creates a `package.json` file when it creates the new workspace. 
This `package.json` is used by all projects in the workspace, including the initial app project that is  created by the CLI when it creates the workspace.   

CLI 的 `ng new` 命令会在创建新的工作空间的同时创建一个 `package.json`。
这个 `package.json` 用于此工作空间中的所有项目，包括由 CLI 在创建工作空间时创建的那个初始项目。

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
The `dependencies` section of `package.json` contains:

应用程序的 `package.json` 文件中，`dependencies` 下包括：

* [**Angular packages**](#angular-packages): Angular core and optional modules; their package names begin `@angular/`.

   *[*Angular 包**：Angular 的核心和可选模块，它们的包名以 `@angular/` 开头。

* **Support packages**](#support-packages): 3rd party libraries that must be present for Angular apps to run.

   *[*支持包**：那些 Angular 应用运行时必需的第三方库。

* **Polyfill packages**](#polyfills): Polyfills plug gaps in a browser's JavaScript implementation.

   **腻子脚本**：腻子脚本负责抹平不同浏览器的 JavaScript 实现之间的差异。

To add a new dependency, use the [`ng add`](cli/add) command.

要想添加新的依赖，请使用 [`ng add`](cli/add) 命令。

{@a angular-packages}
### Angular packages

### Angular 包

The following Angular packages are included as dependencies in the default `package.json` file for a new Angular workspace.
For a complete list of Angular packages, see the [API reference](http://angular.io/api?type=package). 

新的 Angular 工作空间的 `package.json` 文件中默认包含下列 Angular 包。
要了解 Angular 包的完整列表，参见 [API 参考手册](http://angular.io/api?type=package)。

<!-- TODO: Translate -->
Package name                               | Description
----------------------------------------   | --------------------------------------------------
[**@angular/animations**](api/animations) | Angular's animations library makes it easy to define and apply animation effects such as page and list transitions. For more information, see the [Animations guide](guide/animations).
[**@angular/common**](api/common) | The commonly-needed services, pipes, and directives provided by the Angular team. The [`HttpClientModule`](api/common/http/HttpClientModule) is also here, in the [`@angular/common/http`](api/common/http) subfolder. For more information, see the [HttpClient guide](guide/http).
**@angular/compiler** | Angular's template compiler. It understands templates and can convert them to code that makes the application run and render. Typically you don’t interact with the compiler directly; rather, you use it indirectly via `platform-browser-dynamic` when JIT compiling in the browser. For more information, see the [Ahead-of-time Compilation guide](guide/aot-compiler).
[**@angular/common**：由 Angular 开发组提供的常用服务、管道和指令。
[`HttpClientModule`](guide/http)也在这里，位于'@angular/common/http'子目录下。

**@angular/core**](api/core) | Critical runtime parts of the framework that are needed by every application. Includes all metadata decorators, `Component`, `Directive`,  dependency injection, and the component lifecycle hooks.
[**@angular/forms**](api/forms) | Support for both [template-driven](guide/forms) and [reactive forms](guide/reactive-forms). For information about choosing the best forms approach for your app, see [Introduction to forms](guide/forms-overview).
[**@angular/http**](api/http) | Angular's legacy HTTP client, which was deprecated in version 5.0 in favor of [@angular/common/http](api/common/http).
[**@angular/<br />platform&#8209;browser**](api/platform-browser) | Everything DOM and browser related, especially the pieces that help render into the DOM. This package also includes the `bootstrapModuleFactory()` method for bootstrapping applications for production builds that pre-compile with [AOT](guide/aot-compiler).
[**@angular/<br />platform&#8209;browser&#8209;dynamic**](api/platform-browser-dynamic) | Includes [providers](api/core/Provider) and methods to compile and run the app on the client using the [JIT compiler](guide/aot-compiler).
[**@angular/router**](api/router) | The router module navigates among your app pages when the browser URL changes. For more information, see [Routing and Navigation](guide/router).


{@a support-packages}
### Support packages

### 支持包

The following support packages are included as dependencies in the default `package.json` file for a new Angular workspace. 

新的 Angular 工作空间的 `package.json` 文件中默认包含下列支持包。

Package name                               | Description
----------------------------------------   | --------------------------------------------------
[**rxjs**](https://github.com/ReactiveX/rxjs) | Many Angular APIs return [_observables_](guide/glossary#observable). RxJS is an implementation of the proposed [Observables specification](https://github.com/tc39/proposal-observable) currently before the [TC39](https://www.ecma-international.org/memento/tc39-m.htm) committee, which determines standards for the JavaScript language.
[**zone.js**](https://github.com/angular/zone.js) | Angular relies on zone.js to run Angular's change detection processes when native JavaScript operations raise events.  Zone.js is an implementation of a [specification](https://gist.github.com/mhevery/63fdcdf7c65886051d55) currently before the [TC39](http://www.ecma-international.org/memento/TC39.htm) committee that determines standards for the JavaScript language.

**@angular/router**: The [router module](/guide/router) navigates among your app pages when the browser URL changes.

**@angular/upgrade**: Set of utilities for upgrading AngularJS applications to Angular.

**@angular/upgrade**: 一组用来把 AngularJS 应用升级到 Angular 的工具。

{@a polyfills}
### Polyfill packages

### 腻子脚本包

Many browsers lack native support for some features in the latest HTML standards,
features that Angular requires.
[_Polyfills_](https://en.wikipedia.org/wiki/Polyfill) can emulate the missing features.
The [Browser Support](guide/browser-support) guide explains which browsers need polyfills and 
how you can add them.

很多浏览器欠缺对 Angular 所需的某些最新 HTML 标准、特性的原生支持。
[腻子脚本](https://en.wikipedia.org/wiki/Polyfill) 可以模拟这些缺失的特性。
[浏览器支持](guide/browser-support)一章中解释了哪些浏览器分别需要哪些腻子脚本，以及如何添加它们。

The `package.json` for a new Angular workspace installs the [core-js](https://github.com/zloirock/core-js) package, 
which polyfills missing features for several popular browser.

默认的 `package.json` 会安装 **[core-js](https://github.com/zloirock/core-js)** 包，它会弥补很多常用浏览器缺失的特性。

{@a dev-dependencies}

## DevDependencies

The packages listed in the `devDependencies` section of `package.json` help you develop the application on your local machine. You don't deploy them with the production application.

`package.json` 的 *devDependencies* 区列出的这些包可以帮助你在本机开发应用。
你不必把它们部署到生产环境中。

To add a new `devDependency`, use either one of the following commands:

要想添加新的 `devDependency`，请使用下列命令之一：

<code-example language="sh" class="code-shell">
  npm install --dev &lt;package-name&gt;
</code-example>

<code-example language="sh" class="code-shell">
  yarn add --dev &lt;package-name&gt;
</code-example>

The following `devDependencies` are provided in the default `package.json` file for a new Angular workspace. 

新 Angular 工作空间的默认 `package.json` 中包含下列 `devDependencies` 

Package name                               | Description
----------------------------------------   | -----------------------------------
包名                               | 说明
[**@angular&#8209;devkit/<br />build&#8209;angular**](https://github.com/angular/angular-cli/) | The Angular build tools.
[**@angular/cli**](https://github.com/angular/angular-cli/) | The Angular CLI tools.
**@angular/<br />compiler&#8209;cli** | The Angular compiler, which is invoked by the Angular CLI's `ng build` and `ng serve` commands.
**@angular/<br />language&#8209;service** | The [Angular language service](guide/language-service) analyzes component templates and provides type and error information that TypeScript-aware editors can use to improve the developer's experience. For example, see the [Angular language service extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).
**@types/... ** | TypeScript definition files for 3rd party libraries such as Jasmine and Node.js.
[**codelyzer**](https://www.npmjs.com/package/codelyzer) | A linter for Angular apps whose rules conform to the Angular [style guide](guide/styleguide).
**jasmine/... ** | Packages to support the [Jasmine](https://jasmine.github.io/) test library.
**karma/... ** | Packages to support the [karma](https://www.npmjs.com/package/karma) test runner.
[**protractor**](https://www.npmjs.com/package/protractor) | An end-to-end (e2e) framework for Angular apps. Built on top of [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs).
[**ts-node**](https://www.npmjs.com/package/ts-node) | TypeScript execution environment and REPL for Node.js.
[**tslint**](https://www.npmjs.com/package/tslint) | A static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors.
[**typescript**](https://www.npmjs.com/package/typescript) | The TypeScript language server, including the *tsc* TypeScript compiler.

## Related information

## 相关信息

 For information about how the Angular CLI handles packages see the following guides: 
 
 要了解 Angular CLI 如何处理包的更多信息，请参见下列章节：
 
 * [Building and serving](guide/build) describes how packages come together to create a development build.
 
   [Building and serving](guide/build) 描述了这些包如何协作，以进行开发期构建。
 
 * [Deployment](guide/deployment) describes how packages come together to create a production build.

   [Deployment](guide/deployment) 中描述了这些包如何协作，以创建一个生产环境构建。