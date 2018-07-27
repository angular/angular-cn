# Npm Packages

# Npm 包

 The [**Angular CLI**](https://cli.angular.io/), Angular applications, and Angular itself depend upon features and functionality provided by libraries that are available as [**npm**](https://docs.npmjs.com/) packages.

 [**Angular CLI**](https://cli.angular.io/)、Angular 应用程序以及 Angular 本身都依赖于很多第三方包(包括 Angular 自己)提供的特性和功能。这些都是 [**npm**](https://docs.npmjs.com/) 包。

You can download and install these npm packages with the [**npm client**](https://docs.npmjs.com/cli/install), which runs as a Node.js® application.

你可以使用 [**npm**](https://docs.npmjs.com/cli/install) 来安装这些 npm 包，npm 命令也是一个 Node.js® 应用。

The [**yarn client**](https://yarnpkg.com/en/) is a popular alternative for downloading and installing npm packages.
The Angular CLI uses `yarn` by default to install npm packages when you create a new project.

[**yarn**](https://yarnpkg.com/en/) 是另一个下载和安装 npm 包的工具。
当创建新项目时，Angular CLI 默认使用 `yarn` 来安装 npm 包。

<div class="alert is-helpful">

Node.js and npm are essential to Angular development.

Node.js 和 npm 是做 Angular 开发的基础。

[Get them now](https://docs.npmjs.com/getting-started/installing-node "Installing Node.js and updating npm")
if they're not already installed on your machine.

如果你的电脑上还没有装过，请 [立即获取它们](https://docs.npmjs.com/getting-started/installing-node "Installing Node.js and updating npm")！

**Verify that you are running Node.js `v8.x` or higher and npm `5.x` or higher**
by running the commands `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

在终端/控制器窗口运行命令 `node -v` 和 `npm -v`，来**确认你运行的 node 是 `v8.x` 或更高，npm 为 `5.x` 或更高。**
老版本会产生错误。

Consider using [nvm](https://github.com/creationix/nvm) for managing multiple
versions of Node.js and npm. You may need [nvm](https://github.com/creationix/nvm) if
you already have projects running on your machine that use other versions of Node.js and npm.

建议使用[nvm](https://github.com/creationix/nvm)来管理 node 和 npm 的多个版本。如果你机器上已经有某些项目运行了 Node.js 和 npm 的其它版本，你就会需要[nvm](https://github.com/creationix/nvm)了。

</div>

## _package.json_

Both `npm` and `yarn` install packages that are identified in a [**package.json**](https://docs.npmjs.com/files/package.json) file.

无论是 `npm` 还是 `yarn`，所安装的包都记录在 [**package.json**](https://docs.npmjs.com/files/package.json) 文件中。

The CLI `ng new` command creates a default `package.json` file for your project.
This `package.json` specifies _a starter set of packages_ that work well together and 
jointly support many common application scenarios.

CLI 的 `ng new` 命令会给项目创建一个默认的 `package.json` 文件。
这个 `package.json` 中带有一些起步包，这些包可以很好地协同，并可用于大量常见的应用场景。

You will add packages to `package.json` as your application evolves.
You may even remove some.

随着应用的成长，你还会往 `package.json` 中添加更多包，甚至可能会移除一些。

This guide focuses on the most important packages in the starter set.

本指南中会集中讲解这些初始包中的重点部分。

#### *dependencies* and *devDependencies*

#### *dependencies* 和 *devDependencies*

The `package.json` includes two sets of packages,
[dependencies](guide/npm-packages#dependencies) and [devDependencies](guide/npm-packages#dev-dependencies).

`package.json` 包括两组包：[dependencies](guide/npm-packages#dependencies) 和 [devDependencies](guide/npm-packages#dev-dependencies)

The *dependencies* are essential to *running* the application.
The *devDependencies* are only necessary to *develop* the application.

**dependencies** 是**运行**应用的基础，而 **devDependencies** 只有在**开发**应用时才会用到。

{@a dependencies}

## *Dependencies*

The `dependencies` section of `package.json` contains:

应用程序的 `package.json` 文件中，`dependencies` 下包括：

* **Angular packages**: Angular core and optional modules; their package names begin `@angular/`.

   **Angular 包**：Angular 的核心和可选模块，它们的包名以 `@angular/` 开头。

* **Support packages**: 3rd party libraries that must be present for Angular apps to run.

   **支持包**：那些 Angular 应用运行时必需的第三方库。

* **Polyfill packages**: Polyfills plug gaps in a browser's JavaScript implementation.

   **腻子脚本**：腻子脚本负责抹平不同浏览器的 JavaScript 实现之间的差异。

### Angular Packages

### Angular 包

**@angular/animations**: Angular's animations library makes it easy to define and apply animation effects such as page and list transitions.
Read about it in the [Animations guide](guide/animations).

**@angular/animations**：Angular 的动画库，它能让你更容易定义和使用动画效果，比如页面和列表的转场动画。要了解更多，请参见 [动画指南](guide/animations)。

**@angular/common**: The commonly needed services, pipes, and directives provided by the Angular team.
The [`HttpClientModule`](guide/http) is also here, in the '@angular/common/http' subfolder.

**@angular/common**：由 Angular 开发组提供的常用服务、管道和指令。
[`HttpClientModule`](guide/http)也在这里，位于'@angular/common/http'子目录下。

**@angular/core**: Critical runtime parts of the framework needed by every application.
Includes all metadata decorators, `Component`, `Directive`,  dependency injection, and the component lifecycle hooks.

**@angular/core**：本框架的每个应用都需要的关键运行部件。包括元数据装饰器，如 `Component` 和 `Directive`、依赖注入以及组件生命周期钩子。

**@angular/compiler**: Angular's *Template Compiler*.
It understands templates and can convert them to code that makes the application run and render.
Typically you don’t interact with the compiler directly; rather, you use it indirectly via `platform-browser-dynamic` when [JIT compiling](guide/aot-compiler) in the browser.

**@angular/compiler**：Angular 的*模板编译器*。
它会理解模板，并且把模板转化成代码，以供应用程序运行和渲染。
开发人员通常不会直接跟这个编译器打交道，而是当在浏览器中使用 [JIT 编译](guide/aot-compiler) 时通过 `platform-browser-dynamic` 间接使用它。

**@angular/forms**: support for both [template-driven](guide/forms) and [reactive forms](guide/reactive-forms).

**@angular/forms**：支持 [template-driven](guide/forms) 和 [reactive forms](guide/reactive-forms)。

**@angular/http**: Angular's old, soon-to-be-deprecated, HTTP client.

**@angular/http**：Angular 的老的、很快就会废弃的 HTTP 客户端库。

**@angular/platform-browser**: Everything DOM and browser related, especially
the pieces that help render into the DOM.
This package also includes the `bootstrapStatic()` method
for bootstrapping applications for production builds that pre-compile with [AOT](guide/aot-compiler).

**@angular/platform-browser**：与 DOM 和浏览器相关的每样东西，特别是帮助往 DOM 中渲染的那部分。
这个包还包含 bootstrapStatic 方法，用来引导那些在产品构建时要用 [AOT](guide/aot-compiler) 进行编译的应用程序。

**@angular/platform-browser-dynamic**: Includes [Providers](api/core/Provider)
and methods to compile and run the app on the client 
using the [JIT compiler](guide/aot-compiler).

**@angular/platform-browser-dynamic**： 为应用程序提供一些[提供商](api/core/Provider)和方法，以便在客户端使用 [JIT 编译器](guide/aot-compiler)运行本应用。

**@angular/router**: The [router module](/guide/router) navigates among your app pages when the browser URL changes.

**@angular/router**: [router 模块](/guide/router) 可以在浏览器的 URL 变化时在应用的页面之间导航。

**@angular/upgrade**: Set of utilities for upgrading AngularJS applications to Angular.

**@angular/upgrade**: 一组用来把 AngularJS 应用升级到 Angular 的工具。

{@a polyfills}

### Polyfill packages

### 腻子脚本包

Many browsers lack native support for some features in the latest HTML standards,
features that Angular requires.
"[Polyfills](https://en.wikipedia.org/wiki/Polyfill)" can emulate the missing features.
The [Browser Support](guide/browser-support) guide explains which browsers need polyfills and 
how you can add them.

很多浏览器欠缺对 Angular 所需的某些最新 HTML 标准、特性的原生支持。
[腻子脚本](https://en.wikipedia.org/wiki/Polyfill) 可以模拟这些缺失的特性。
[浏览器支持](guide/browser-support)一章中解释了哪些浏览器分别需要哪些腻子脚本，以及如何添加它们。

The default `package.json` installs the **[core-js](https://github.com/zloirock/core-js)** package
which polyfills missing features for several popular browser.

默认的 `package.json` 会安装 **[core-js](https://github.com/zloirock/core-js)** 包，它会弥补很多常用浏览器缺失的特性。

### Support packages

### 支持包

**[rxjs](https://github.com/benlesh/RxJS)**: Many Angular APIs return _observables_. RxJS is an implementation of the proposed [Observables specification](https://github.com/zenparsing/es-observable) currently before the
[TC39](http://www.ecma-international.org/memento/TC39.htm) committee that determines standards for the JavaScript language.

**[rxjs](https://github.com/benlesh/RxJS)**：很多 Angular API 都会返回**可观察对象（Observable）**。RxJS 是个对[Observables 规范](https://github.com/zenparsing/es-observable)的当前实现。[TC39](http://www.ecma-international.org/memento/TC39.htm)委员会将来会决定它是否成为 JavaScript 语言标准的一部分。

**[zone.js](https://github.com/angular/zone.js)**: Angular relies on zone.js to run Angular's change detection processes when native JavaScript operations raise events.  Zone.js is an implementation of a [specification](https://gist.github.com/mhevery/63fdcdf7c65886051d55) currently before the
[TC39](http://www.ecma-international.org/memento/TC39.htm) committee that determines standards for the JavaScript language.

**[zone.js](https://github.com/angular/zone.js)**：Angular 依赖 zone.js，以便在原生 JavaScript 操作触发事件时运行 Angular 的变更检测过程。Zone.js 是对 [这个规范](https://gist.github.com/mhevery/63fdcdf7c65886051d55) 的当前实现。[TC39](http://www.ecma-international.org/memento/TC39.htm)委员会将来会决定它是否成为 JavaScript 语言标准的一部分。

{@a dev-dependencies}

## *DevDependencies*

The packages listed in the *devDependencies* section of the `package.json` help you develop the application on your local machine.

`package.json` 的 *devDependencies* 区列出的这些包可以帮助你在本机开发应用。

You don't deploy them with the production application although there is no harm in doing so.

你不必在生产环境的应用中部署它们，当然，就算部署了也没什么坏处。

**[@angular/cli](https://github.com/angular/angular-cli/)**: The Angular CLI tools.

**[@angular/cli](https://github.com/angular/angular-cli/)**：Angular 的命令行工具。

**[@angular/compiler-cli](https://github.com/angular/angular/blob/master/packages/compiler-cli/README.md)**: The Angular compiler, which is invoked by the Angular CLI's `build` and `serve` commands.

**[@angular/compiler-cli](https://github.com/angular/angular/blob/master/packages/compiler-cli/README.md)**：Angular 的编译器，它会被 Angular CLI 的 `build` 和 `serve` 命令调用。

**[@angular/language-service](https://github.com/angular/angular-cli/)**: The Angular language service analyzes component templates and provides type and error information that TypeScript-aware editors can use to improve the developer's experience.
For example, see the [Angular language service extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

**[@angular/language-service](https://github.com/angular/angular-cli/)**：Angular 的语言服务会分析组件模板，并且提供类型信息和错误信息，那些支持 TypeScript 的编辑机器可以使用它们来提升开发体验。比如这个：[VS Code 的 Angular 语言服务扩展包](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

**@types/... **: TypeScript definition files for 3rd party libraries such as Jasmine and Node.js.

**@types/... **：第三方库（比如 Jasmine 和 Node.js）的 TypeScript 类型定义文件。

**[codelyzer](https://www.npmjs.com/package/codelyzer)**: A linter for Angular apps whose rules conform to the Angular [style guide](guide/styleguide).

**[codelyzer](https://www.npmjs.com/package/codelyzer)**：专用于 Angular 应用的 linter，它的规则适用于 Angular 的[风格指南](guide/styleguide)。

**jasmine/... **: packages to support the [Jasmine](https://jasmine.github.io/) test library.

**jasmine/... **：[Jasmine](https://jasmine.github.io/) 测试库的支持包。

**karma/... **: packages to support the [karma](https://www.npmjs.com/package/karma) test runner.

**karma/... **：[karma](https://www.npmjs.com/package/karma) 测试运行器的支持包。

**[protractor](https://www.npmjs.com/package/protractor)**: an end-to-end (e2e) framework for Angular apps. 
Built on top of [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs).

**[protractor](https://www.npmjs.com/package/protractor)**：适用于 Angular 应用的端到端（e2e）框架。基于 [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) 构建。

**[ts-node](https://www.npmjs.com/package/ts-node)**: TypeScript execution environment and REPL for Node.js.

**[ts-node](https://www.npmjs.com/package/ts-node)**：TypeScript 的运行环境以及在 Node.js 环境下用的 REPL。

**[tslint](https://www.npmjs.com/package/tslint)**: a static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors.

**[tslint](https://www.npmjs.com/package/tslint)**：一个静态分析器，用来检查 TypeScript 代码的可读性、可维护性和功能方面的错误。

**[typescript](https://www.npmjs.com/package/typescript)**:
the TypeScript language server, including the *tsc* TypeScript compiler.

**[typescript](https://www.npmjs.com/package/typescript)**：TypeScript 语言服务，包括 TypeScript 编译器 *tsc*。

## So many packages! So many files!

## 那么多包！那么多文件！

The default `package.json` installs more packages than you'll need for your project.

默认的 `package.json` 所安装的包比项目实际需要的多。

A given package may contain tens, hundreds, even thousands of files,
all of them in your local machine's `node_modules` directory.
The sheer volume of files is intimidating, 

某个指定的包可能包含十个、上百个甚至上千个文件，它们都位于本机的 `node_modules` 目录下。简直令人生畏。

You can remove packages that you don't need but how can you be sure that you won't need it?
As a practical matter, it's better to install a package you don't need than worry about it.
Extra packages and package files on your local development machine are harmless.

你可以移除这些不需要的包，不过你怎么知道哪些是不需要的呢？
实际上，安装不需要的包好过担心缺少某个包。
在你本机开发环境下存在无用的包和文件并没有害处。

By default the Angular CLI build process bundles into a single file just the few "vendor" library files that your application actually needs.
The browser downloads this bundle, not the original package files.

默认情况下，Angular CLI 的构建过程只会把应用程序中实际用到的那些第三方库文件打包到结果中。
浏览器要下载的是这个包，而不是原始的包文件。

See the [Deployment](guide/deployment) to learn more.

参见[部署](guide/deployment)一章了解详情。
