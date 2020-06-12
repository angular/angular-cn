# Setting up the local environment and workspace

# 搭建本地开发环境和工作空间

This guide explains how to set up your environment for Angular development using the [Angular CLI tool](cli "CLI command reference").
It includes information about prerequisites, installing the CLI, creating an initial workspace and starter app, and running that app locally to verify your setup.

本指南讲解了如何使用 [Angular CLI 工具](cli "CLI 命令参考：")搭建你的 Angular 开发环境。包括：前提条件、安装 CLI、创建初始工作空间和入门应用，以及在本地运行这个应用来验证你的搭建成果。

<div class="callout is-helpful">

<header>Try Angular without local setup</header>

<header>学习 Angular</header>

If you are new to Angular, you might want to start with [Try it now!](start), which introduces the essentials of Angular in the context of a ready-made basic online store app that you can examine and modify. This standalone tutorial takes advantage of the interactive [StackBlitz](https://stackblitz.com/) environment for online development. You don't need to set up your local environment until you're ready.

如果你不熟悉Angular，可能要从[立即尝试！](start)开始，它可以在查看和修改一个现成的基础版在线商店的上下文中介绍 Angular 的要点。这个独立的教程利用交互式的 [StackBlitz](https://stackblitz.com/) 环境进行在线开发。在你准备好这些之前，无需设置本地环境。

</div>

{@a devenv}
{@a prerequisites}
## Prerequisites

## 前提条件

To use the Angular framework, you should be familiar with the following:

要想使用 Angular 框架，你要先熟悉下列技术：

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML)
* [CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps)

Knowledge of [TypeScript](https://www.typescriptlang.org/) is helpful, but not required.

关于 [TypeScript](https://www.typescriptlang.org/) 的知识会很有用，但不是必须的。

{@a nodejs}
### Node.js

Make sure your development environment includes `Node.js®` and an npm package manager.

确保你的开发环境中包括 `Node.js®` 和一个包管理器。

Angular requires a [current, active LTS, or maintenance LTS](https://nodejs.org/about/releases/) version of `Node.js`. See the `engines` key for the specific version requirements in our [package.json](https://unpkg.com/@angular/cli/package.json).

Angular 需要 `Node.js` 版本 10.9.0 或更高版本。

* To check your version, run `node -v` in a terminal/console window.

  要检查你的版本，请在终端/控制台窗口中运行 `node -v`。

* To get `Node.js`, go to [nodejs.org](https://nodejs.org "Nodejs.org").

  要获取 `Node.js`，请转到 [nodejs.org](https://nodejs.org "Nodejs.org")。

{@a npm}
### npm package manager

### npm 包管理器

Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm). To download and install npm packages, you must have an npm package manager.

Angular、Angular CLI 和 Angular 应用都依赖于 [npm 包](https://docs.npmjs.com/getting-started/what-is-npm)中提供的特性和功能。要想下载并安装 npm 包，你必须拥有一个 npm 包管理器。

This setup guide uses the [npm client](https://docs.npmjs.com/cli/install) command line interface, which is installed with `Node.js` by default.

本搭建指南使用 [npm 客户端](https://docs.npmjs.com/cli/install)命令行界面，`Node.js` 已经默认安装了它。

To check that you have the npm client installed, run `npm -v` in a terminal/console window.

要检查你是否安装了 npm 客户端，请在终端/控制台窗口中运行 `npm -v`。

{@a install-cli}

## Step 1: Install the Angular CLI

## 第 1 步：安装 Angular CLI

You use the Angular CLI
to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

你可以使用 Angular CLI 来创建项目、生成应用和库代码，以及执行各种持续开发任务，比如测试、打包和部署。

Install the Angular CLI globally.

全局安装 Angular CLI。

To install the CLI using `npm`, open a terminal/console window and enter the following command:

要使用 `npm` 命令安装 CLI，请打开终端/控制台窗口，输入如下命令：

<code-example language="sh" class="code-shell">
  npm install -g @angular/cli

</code-example>

{@a create-proj}

## Step 2: Create a workspace and initial application

## 第 2 步：创建工作空间和初始应用

You develop apps in the context of an Angular [**workspace**](guide/glossary#workspace).

你要在 Angular [**工作区**](guide/glossary#workspace)的上下文中开发应用。

To create a new workspace and initial starter app:

要创建一个新的工作空间和初始入门应用：

1. Run the CLI command `ng new` and provide the name `my-app`, as shown here:

   运行 CLI 命令 `ng new` 并提供 `my-app` 名称作为参数，如下所示：

    <code-example language="sh" class="code-shell">
      ng new my-app

    </code-example>

2. The `ng new` command prompts you for information about features to include in the initial app. Accept the defaults by pressing the Enter or Return key.

   `ng new` 命令会提示你提供要把哪些特性包含在初始应用中。按 Enter 或 Return 键可以接受默认值。

The Angular CLI installs the necessary Angular npm packages and other dependencies. This can take a few minutes.

Angular CLI 会安装必要的 Angular npm 包和其它依赖包。这可能要花几分钟的时间。

The CLI creates a new workspace and a simple Welcome app, ready to run.

CLI 会创建一个新的工作区和一个简单的欢迎应用，随时可以运行它。

{@a serve}

## Step 3: Run the application

## 第 3 步：运行应用

The Angular CLI includes a server, so that you can easily build and serve your app locally.

Angular CLI 中包含一个服务器，方便你在本地构建和提供应用。

1. Go to the workspace folder (`my-app`).

   转到 workspace 文件夹（`my-app`）。

1. Launch the server by using the CLI command `ng serve`, with the `--open` option.

   使用 CLI 命令 `ng serve` 和 `--open` 选项来启动服务器。

<code-example language="sh" class="code-shell">
  cd my-app
  ng serve --open
</code-example>

The `ng serve` command launches the server, watches your files,
and rebuilds the app as you make changes to those files.

`ng serve` 命令会启动开发服务器、监视文件，并在这些文件发生更改时重建应用。

The `--open` (or just `-o`) option automatically opens your browser
to `http://localhost:4200/`.

`--open`（或者只用 `-o` 缩写）选项会自动打开你的浏览器，并访问 `http://localhost:4200/`。

You will see:

你会看到：

<div class="lightbox">
  <img src='generated/images/guide/setup-local/app-works.png' alt="Welcome to my-app!">
</div>

## Next steps

## 下一步

* For a more thorough introduction to the fundamental concepts and terminology of Angular single-page app architecture and design principles, read the [Angular Concepts](guide/architecture) section.

  关于 Angular 单页应用程序架构和设计原理的基本概念和术语的详尽介绍，参见 [Angular 的基本概念](guide/architecture)部分。

* Work through the [Tour of Heroes Tutorial](tutorial), a complete hands-on exercise that introduces you to the app development process using the Angular CLI and walks through important subsystems.

  过一遍[英雄指南教程](tutorial)，这是一个完整的动手练习题，它将教你使用 Angular CLI 进行应用开发的过程，并逐步介绍重要的子系统。

* To learn more about using the Angular CLI, see the [CLI Overview](cli "CLI Overview"). In addition to creating the initial workspace and app scaffolding, you can use the CLI to generate Angular code such as components and services. The CLI supports the full development cycle, including building, testing, bundling, and deployment.

  要了解关于使用 Angular CLI 的更多信息，请参阅 [CLI 概述](cli "CLI 概述")。除了创建初始工作空间和应用搭建之外，你还可以使用 CLI 来生成 Angular 代码，比如组件和服务。CLI 支持完整的开发周期，包括构建、测试、打包和部署。

* For more information about the Angular files generated by `ng new`, see [Workspace and Project File Structure](guide/file-structure).

  要了解更多关于 `ng new` 生成的 Angular 文件的信息，请参阅[工作区和项目文件结构](guide/file-structure)。

