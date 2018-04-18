# QuickStart

# 快速上手

Good tools make application development quicker and easier to maintain than
if you did everything by hand.

好的工具能让开发更加简单快捷。

The [**Angular CLI**](https://cli.angular.io/) is a **_command line interface_** tool
that can create a project, add files, and perform a variety of ongoing development tasks such
as testing, bundling, and deployment.

[**Angular CLI**](https://cli.angular.io/)是一个**命令行界面**工具，它可以创建项目、添加文件以及执行一大堆开发任务，比如测试、打包和发布。

The goal in this guide is to build and run a simple Angular
application in TypeScript, using the Angular CLI
while adhering to the [Style Guide](guide/styleguide) recommendations that
benefit _every_ Angular project.

本章的目标是构建并运行一个超级简单的 TypeScript Angular 应用。使用 Angular CLI 来让*每个* Angular 应用从[风格指南](guide/styleguide)的那些建议中获益。

By the end of the chapter, you'll have a basic understanding of development with the CLI
and a foundation for both these documentation samples and for real world applications.

在本章的末尾，你会对用 CLI 进行开发有一个最基本的理解，并将其作为其它文档范例以及真实应用的基础。

And you can also <a href="generated/zips/cli-quickstart/cli-quickstart.zip" target="_blank">download the example.</a>

你还可以 <a href="generated/zips/cli-quickstart/cli-quickstart.zip" target="_blank">下载这个例子。</a>

<h2 id='devenv'>Step 1. Set up the Development Environment</h2>

<h2 id='devenv'>步骤 1. 设置开发环境</h2>

You need to set up your development environment before you can do anything.

在开始工作之前，你必须设置好开发环境。

Install **[Node.js® and npm](https://nodejs.org/en/download/)**
if they are not already on your machine.

如果你的电脑里没有 Node.js®和 npm，请安装**[它们](https://nodejs.org/en/download/)**。

<div class="l-sub-section">

**Verify that you are running at least node `6.9.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors, but newer versions are fine.

请先在终端/控制台窗口中运行命令 `node -v` 和 `npm -v`，
**来验证一下你正在运行 node `6.9.x` 和 npm `3.x.x` 以上的版本。**
更老的版本可能会出现错误，更新的版本则没问题。

</div>

Then **install the [Angular CLI](https://github.com/angular/angular-cli)** globally.

然后全局安装 **[Angular CLI](https://github.com/angular/angular-cli)** 。

<code-example language="sh" class="code-shell">
  npm install -g @angular/cli

</code-example>

<h2 id='create-proj'>Step 2. Create a new project</h2>

<h2 id='create-proj'>步骤 2. 创建新项目</h2>

Open a terminal window.

打开终端窗口。

Generate a new project and skeleton application by running the following commands:

运行下列命令来生成一个新项目以及应用的骨架代码：

<code-example language="sh" class="code-shell">
  ng new my-app

</code-example>

<div class="l-sub-section">

Patience, please.
It takes time to set up a new project; most of it is spent installing npm packages.

请耐心等待。
创建新项目需要花费很多时间，大多数时候都是在安装那些 npm 包。

</div>

<h2 id='serve'>Step 3: Serve the application</h2>

<h2 id='serve'>步骤 3. 启动开发服务器</h2>

Go to the project directory and launch the server.

进入项目目录，并启动服务器。

<code-example language="sh" class="code-shell">
  cd my-app
  ng serve --open
</code-example>

The `ng serve` command launches the server, watches your files,
and rebuilds the app as you make changes to those files.

`ng serve` 命令会启动开发服务器，监听文件变化，并在修改这些文件时重新构建此应用。

Using the `--open` (or just `-o`) option will automatically open your browser
on `http://localhost:4200/`.

使用 `--open`（或 `-o`）参数可以自动打开浏览器并访问 `http://localhost:4200/`。

Your app greets you with a message:

本应用会用一条消息来跟你打招呼：

<figure>
  <img src='generated/images/guide/cli-quickstart/app-works.png' alt="The app works!">
</figure>

<h2 id='first-component'>Step 4: Edit your first Angular component</h2>

<h2 id='first-component'>步骤 4. 编辑你的第一个 Angular 组件</h2>

The CLI created the first Angular component for you.
This is the _root component_ and it is named `app-root`.
You can find it in `./src/app/app.component.ts`.

这个 CLI 为你创建了第一个 Angular 组件。
它就是名叫 `app-root` 的*根组件*。
你可以在 `./src/app/app.component.ts` 目录下找到它。

Open the component file and change the `title` property from `'app'` to `'My First Angular App!'`.

打开这个组件文件，并且把 `title` 属性从 `'app'` 改为 `'My First Angular App!'`：

<code-example path="cli-quickstart/src/app/app.component.ts" region="title" title="src/app/app.component.ts" linenums="false"></code-example>

The browser reloads automatically with the revised title. That's nice, but it could look better.

浏览器会自动刷新，并具有修改之后的标题。不错，不过它还可以更好看一点。

Open `src/app/app.component.css` and give the component some style.

打开 `src/app/app.component.css` 并给这个组件设置一些样式

<code-example path="cli-quickstart/src/app/app.component.css" title="src/app/app.component.css" linenums="false"></code-example>

<figure>
  <img src='generated/images/guide/cli-quickstart/my-first-app.png' alt="Output of QuickStart app">
</figure>

Looking good!

漂亮！

## What's next?

## 接下来呢？

That's about all you'd expect to do in a "Hello, World" app.

这就是你期待这个 “Hello, World” 应用要做的。

You're ready to take the [Tour of Heroes Tutorial](tutorial) and build
a small application that demonstrates the great things you can build with Angular.

现在，你可以开始[英雄指南](tutorial)教程，通过构建一个小型应用来学习如何用 Angular 构建各种大型应用了。

Or you can stick around a bit longer to learn about the files in your brand new project.

或者，你也可以稍等一会儿，学学在这个新项目中的文件都是干什么用的。

## Project file review

## 项目文件概览

An Angular CLI project is the foundation for both quick experiments and enterprise solutions.

Angular CLI 项目是做快速试验和开发企业解决方案的基础。

The first file you should check out is `README.md`.
It has some basic information on how to use CLI commands.
Whenever you want to know more about how Angular CLI works make sure to visit
[the Angular CLI repository](https://github.com/angular/angular-cli) and
[Wiki](https://github.com/angular/angular-cli/wiki).

你首先要看的文件是 `README.md`。
它提供了一些如何使用 CLI 命令的基础信息。
如果你想了解 Angular CLI 的工作原理，请访问 [Angular CLI 的仓库](https://github.com/angular/angular-cli)及其 
  [Wiki](https://github.com/angular/angular-cli/wiki)。

Some of the generated files might be unfamiliar to you.

有些生成的文件你可能觉得陌生。

### The `src` folder

### `src` 文件夹

Your app lives in the `src` folder.
All Angular components, templates, styles, images, and anything else your app needs go here.
Any files outside of this folder are meant to support building your app.

你的应用代码位于 `src` 文件夹中。
所有的 Angular 组件、模板、样式、图片以及你的应用所需的任何东西都在那里。
这个文件夹之外的文件都是为构建应用提供支持用的。

<div class='filetree'>

  <div class='file'>src</div>

  <div class='children'>

    <div class='file'>app</div>

    <div class='children'>

      <div class='file'>app.component.css</div>

      <div class='file'>app.component.html</div>

      <div class="file">app.component.spec.ts</div>

      <div class="file">app.component.ts</div>

      <div class="file">app.module.ts</div>

    </div>

    <div class="file">assets</div>

    <div class='children'>

      <div class="file">.gitkeep</div>

    </div>

    <div class="file">environments</div>

    <div class='children'>

      <div class="file">environment.prod.ts</div>

      <div class="file">environment.ts</div>

    </div>

    <div class="file">favicon.ico</div>

    <div class="file">index.html</div>

    <div class="file">main.ts</div>

    <div class="file">polyfills.ts</div>

    <div class="file">styles.css</div>

    <div class="file">test.ts</div>

    <div class="file">tsconfig.app.json</div>

    <div class="file">tsconfig.spec.json</div>

  </div>

</div>

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="20%">
  </col>
  <col width="80%">
  </col>
  <tr>

    <th>

      File

      文件

    </th>

    <th>

      Purpose

      用途

    </th>

  </tr>
  <tr>

    <td>

      `app/app.component.{ts,html,css,spec.ts}`

    </td>

    <td>

      Defines the `AppComponent` along with an HTML template, CSS stylesheet, and a unit test.
      It is the **root** component of what will become a tree of nested components
      as the application evolves.

      使用 HTML 模板、CSS 样式和单元测试定义 `AppComponent` 组件。
      它是**根**组件，随着应用的成长它会成为一棵组件树的根节点。

    </td>

  </tr>
  <tr>

    <td>

      `app/app.module.ts`

    </td>

    <td>

      Defines `AppModule`, the [root module](guide/bootstrapping "AppModule: the root module") that tells Angular how to assemble the application.
      Right now it declares only the `AppComponent`.
      Soon there will be more components to declare.

      定义 `AppModule`，[根模块](guide/bootstrapping "AppModule: 根模块")为 Angular 描述如何组装应用。
      目前，它只声明了 `AppComponent`。
      不久，它将声明更多组件。

    </td>

  </tr>
  <tr>

    <td>

      `assets/*`

    </td>

    <td>

      A folder where you can put images and anything else to be copied wholesale
      when you build your application.

      这个文件夹下你可以放图片等任何东西，在构建应用时，它们全都会拷贝到发布包中。

    </td>

  </tr>
  <tr>

    <td>

      `environments/*`

    </td>

    <td>

      This folder contains one file for each of your destination environments,
      each exporting simple configuration variables to use in your application.
      The files are replaced on-the-fly when you build your app.
      You might use a different API endpoint for development than you do for production
      or maybe different analytics tokens.
      You might even use some mock services.
      Either way, the CLI has you covered.

      这个文件夹中包括为各个目标环境准备的文件，它们导出了一些应用中要用到的配置变量。
      这些文件会在构建应用时被替换。
      比如你可能在生产环境中使用不同的 API 端点地址，或使用不同的统计 Token 参数。
      甚至使用一些模拟服务。
      所有这些，CLI 都替你考虑到了。

    </td>

  </tr>
  <tr>

    <td>

      `favicon.ico`

    </td>

    <td>

      Every site wants to look good on the bookmark bar.
      Get started with your very own Angular icon.

      每个网站都希望自己在书签栏中能好看一点。
      请把它换成你自己的图标。

    </td>

  </tr>
  <tr>

    <td>

      `index.html`

    </td>

    <td>

      The main HTML page that is served when someone visits your site.
      Most of the time you'll never need to edit it.
      The CLI automatically adds all `js` and `css` files when building your app so you
      never need to add any `<script>` or `<link>` tags here manually.

      这是别人访问你的网站是看到的主页面的 HTML 文件。
      大多数情况下你都不用编辑它。
      在构建应用时，CLI 会自动把所有 `js` 和 `css` 文件添加进去，所以你不必在这里手动添加任何 `<script>` 或 `<link>` 标签。

    </td>

  </tr>
  <tr>

    <td>

      `main.ts`

    </td>

    <td>

      The main entry point for your app.
      Compiles the application with the [JIT compiler](guide/glossary#jit)
      and bootstraps the application's root module (`AppModule`) to run in the browser.
      You can also use the [AOT compiler](guide/aot-compiler)
      without changing any code by appending the`--aot` flag to the `ng build` and `ng serve` commands.

      这是应用的主要入口点。
      使用[JIT 编译器](guide/glossary#jit)编译本应用，并启动应用的根模块 `AppModule`，使其运行在浏览器中。
      你还可以使用[AOT 编译器](guide/glossary#ahead-of-time-aot-compilation)，而不用修改任何代码 —— 只要给 `ng build` 或 `ng serve` 传入 `--aot` 参数就可以了。

    </td>

  </tr>
  <tr>

    <td>

      `polyfills.ts`

    </td>

    <td>

      Different browsers have different levels of support of the web standards.
      Polyfills help normalize those differences.
      You should be pretty safe with `core-js` and `zone.js`, but be sure to check out
      the [Browser Support guide](guide/browser-support) for more information.

      不同的浏览器对 Web 标准的支持程度也不同。
      腻子脚本（polyfill）能把这些不同点进行标准化。
      你只要使用 `core-js` 和 `zone.js` 通常就够了，不过你也可以查看[浏览器支持指南](guide/browser-support)以了解更多信息。

    </td>

  </tr>
  <tr>

    <td>

      `styles.css`

    </td>

    <td>

      Your global styles go here.
      Most of the time you'll want to have local styles in your components for easier maintenance,
      but styles that affect all of your app need to be in a central place.

      这里是你的全局样式。
      大多数情况下，你会希望在组件中使用局部样式，以利于维护，不过那些会影响你整个应用的样式你还是需要集中存放在这里。

    </td>

  </tr>
  <tr>

    <td>

      `test.ts`

    </td>

    <td>

      This is the main entry point for your unit tests.
      It has some custom configuration that might be unfamiliar, but it's not something you'll
      need to edit.

      这是单元测试的主要入口点。
      它有一些你不熟悉的自定义配置，不过你并不需要编辑这里的任何东西。

    </td>

  </tr>
  <tr>

    <td>

      `tsconfig.{app|spec}.json`

    </td>

    <td>

      TypeScript compiler configuration for the Angular app (`tsconfig.app.json`)
      and for the unit tests (`tsconfig.spec.json`).

      TypeScript 编译器的配置文件。`tsconfig.app.json` 是为 Angular 应用准备的，而 `tsconfig.spec.json` 是为单元测试准备的。

    </td>

  </tr>
</table>

### The root folder

### 根目录

The `src/` folder is just one of the items inside the project's root folder.
Other files help you build, test, maintain, document, and deploy the app.
These files go in the root folder next to `src/`.

`src/` 文件夹是项目的根文件夹之一。
其它文件是用来帮助你构建、测试、维护、文档化和发布应用的。它们放在根目录下，和 `src/` 平级。

<div class='filetree'>

  <div class="file">my-app</div>

  <div class='children'>

    <div class="file">e2e</div>

    <div class='children'>

      <div class="file">app.e2e-spec.ts</div>

      <div class="file">app.po.ts</div>

      <div class="file">tsconfig.e2e.json</div>

    </div>

    <div class="file">node_modules/...</div>

    <div class="file">src/...</div>

    <div class="file">.angular-cli.json</div>

    <div class="file">.editorconfig</div>

    <div class="file">.gitignore</div>

    <div class="file">karma.conf.js</div>

    <div class="file">package.json</div>

    <div class="file">protractor.conf.js</div>

    <div class="file">README.md</div>

    <div class="file">tsconfig.json</div>

    <div class="file">tslint.json</div>

  </div>

</div>

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="20%">
  </col>
  <col width="80%">
  </col>
  <tr>

    <th>

      File

      文件

    </th>

    <th>

      Purpose

      用途

    </th>

  </tr>
  <tr>

    <td>

      `e2e/`

    </td>

    <td>

      Inside `e2e/` live the end-to-end tests.
      They shouldn't be inside `src/` because e2e tests are really a separate app that
      just so happens to test your main app.
      That's also why they have their own `tsconfig.e2e.json`.

      在 `e2e/` 下是端到端（end-to-end）测试。
      它们不在 `src/` 下，是因为端到端测试实际上和应用是相互独立的，它只适用于测试你的应用而已。
      这也就是为什么它会拥有自己的 `tsconfig.json`。

    </td>

  </tr>
  <tr>

    <td>

      `node_modules/`

    </td>

    <td>

      `Node.js` creates this folder and puts all third party modules listed in
      `package.json` inside of it.

      `Node.js` 创建了这个文件夹，并且把 `package.json` 中列举的所有第三方模块都放在其中。

    </td>

  </tr>
  <tr>

    <td>

      `.angular-cli.json`

    </td>

    <td>

      Configuration for Angular CLI.
      In this file you can set several defaults and also configure what files are included
      when your project is built.
      Check out the official documentation if you want to know more.

      Angular CLI 的配置文件。
      在这个文件中，你可以设置一系列默认值，还可以配置项目编译时要包含的那些文件。
      要了解更多，请参阅它的官方文档。

    </td>

  </tr>
  <tr>

    <td>

      `.editorconfig`

    </td>

    <td>

      Simple configuration for your editor to make sure everyone that uses your project
      has the same basic configuration.
      Most editors support an `.editorconfig` file.
      See http://editorconfig.org for more information.

      给你的编辑器看的一个简单配置文件，它用来确保参与你项目的每个人都具有基本的编辑器配置。
      大多数的编辑器都支持 `.editorconfig` 文件，详情参见 http://editorconfig.org 。

    </td>

  </tr>
  <tr>

    <td>

      `.gitignore`

    </td>

    <td>

      Git configuration to make sure autogenerated files are not commited to source control.

      一个 Git 的配置文件，用来确保某些自动生成的文件不会被提交到源码控制系统中。

    </td>

  </tr>
  <tr>

    <td>

      `karma.conf.js`

    </td>

    <td>

      Unit test configuration for the [Karma test runner](https://karma-runner.github.io),
      used when running `ng test`.

      给[Karma](https://karma-runner.github.io)的单元测试配置，当运行 `ng test` 时会用到它。

    </td>

  </tr>
  <tr>

    <td>

      `package.json`

    </td>

    <td>

      `npm` configuration listing the third party packages your project uses.
      You can also add your own [custom scripts](https://docs.npmjs.com/misc/scripts) here.

      `npm` 配置文件，其中列出了项目使用到的第三方依赖包。
      你还可以在这里添加自己的[自定义脚本](https://docs.npmjs.com/misc/scripts)。

    </td>

  </tr>
  <tr>

    <td>

      `protractor.conf.js`

    </td>

    <td>

      End-to-end test configuration for [Protractor](http://www.protractortest.org/),
      used when running `ng e2e`.

      给[Protractor](http://www.protractortest.org/)使用的端到端测试配置文件，当运行 `ng e2e` 的时候会用到它。

    </td>

  </tr>
  <tr>

    <td>

      `README.md`

    </td>

    <td>

      Basic documentation for your project, pre-filled with CLI command information.
      Make sure to enhance it with project documentation so that anyone
      checking out the repo can build your app!

      项目的基础文档，预先写入了 CLI 命令的信息。
      别忘了用项目文档改进它，以便每个查看此仓库的人都能据此构建出你的应用。

    </td>

  </tr>
  <tr>

    <td>

      `tsconfig.json`

    </td>

    <td>

      TypeScript compiler configuration for your IDE to pick up and give you helpful tooling.

      TypeScript 编译器的配置，你的 IDE 会借助它来给你提供更好的帮助。

    </td>

  </tr>
  <tr>

    <td>

      `tslint.json`

    </td>

    <td>

      Linting configuration for [TSLint](https://palantir.github.io/tslint/) together with
      [Codelyzer](http://codelyzer.com/), used when running `ng lint`.
      Linting helps keep your code style consistent.

      给[TSLint](https://palantir.github.io/tslint/)和[Codelyzer](http://codelyzer.com/)用的配置信息，当运行 `ng lint` 时会用到。
      Lint 功能可以帮你保持代码风格的统一。

    </td>

  </tr>
</table>

<div class="l-sub-section">

### Next Step

### 下一步

If you're new to Angular, continue with the
[tutorial](tutorial "Tour of Heroes tutorial").
You can skip the "Setup" step since you're already using the Angular CLI setup.

如果你刚刚开始使用 Angular，请继续这个[教程](tutorial "《英雄指南》教程")。
你可以跳过“环境设置”一章，因为你已经在使用 Angular CLI 设置好环境了。

</div>
