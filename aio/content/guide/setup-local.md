# Setting up the local environment and workspace

# 搭建本地开发环境和工作空间

This guide explains how to set up your environment for Angular development using the [Angular CLI tool](cli "CLI command reference").
It includes information about prerequisites, installing the CLI, creating an initial workspace and starter app, and running that app locally to verify your setup.

本指南讲解了如何使用 [Angular CLI 工具](cli "CLI 命令参考：")搭建你的 Angular 开发环境。包括：前提条件、安装 CLI、创建初始工作空间和入门应用，以及在本地运行这个应用来验证你的搭建成果。

<div class="callout is-helpful">

<header>Learning Angular</header>

<header>学习 Angular</header>

If you are new to Angular, see [Getting Started](start). Getting Started helps you quickly learn the essentials of Angular, in the context of building a basic online store app. It leverages the [StackBlitz](https://stackblitz.com/) online development environment, so you don't need to set up your local environment until you're ready.

如果你不熟悉 Angular，请参阅[快速上手](start)。在构建基本版在线商店应用的过程中，快速上手可以帮助你快速学习 Angular 的基本知识。它充分利用了 [StackBlitz](https://stackblitz.com/) 在线开发环境，因此在你准备就绪之前，都不需要建立本地环境。

</div>

{@a devenv}
{@a prerequisites}
## Prerequisites

## 前提条件

Before you begin, make sure your development environment includes `Node.js®` and an npm package manager.

在开始之前，请确保你的开发环境中包括 `Node.js®` 和 npm 包管理器。

{@a nodejs}
### Node.js

Angular requires a [current, active LTS, or maintenance LTS](https://nodejs.org/about/releases/) version of `Node.js`. See the `engines` key for the specific version requirements in our [package.json](https://unpkg.com/@angular/cli/package.json).

Angular 需要 `Node.js` 版本 10.9.0 或更高版本。

* To check your version, run `node -v` in a terminal/console window.

  要检查你的版本，请在终端/控制台窗口中运行 `node -v` 。

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

要检查你是否安装了 npm 客户端，请在终端/控制台窗口中运行 `npm -v` 。

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

Angular CLI 会安装必要的 Angular npm 包和其他依赖包。这可能要花几分钟的时间。

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

* If you are new to Angular, see the [Getting Started](start) tutorial. Getting Started helps you quickly learn the essentials of Angular, in the context of building a basic online store app.

  如果你不熟悉 Angular，请参阅[快速起步](start)教程。在构建基本的在线商店应用的过程中，快速起步可以帮助你快速学习 Angular 的基本知识。

<div class="alert is-helpful">

  Getting Started assumes the [StackBlitz](https://stackblitz.com/) online development environment.
  To learn how to export an app from StackBlitz to your local environment, skip ahead to the [Deployment](start/deployment "Getting Started: Deployment") section.

  “快速起步”假设以 [StackBlitz](https://stackblitz.com/) 作为在线开发环境 。要了解如何将应用从 StackBlitz 导出到本地环境，请跳到[部署](start/deployment "入门：部署")部分。

</div>

* To learn more about using the Angular CLI, see the [CLI Overview](cli "CLI Overview"). In addition to creating the initial workspace and app scaffolding, you can use the CLI to generate Angular code such as components and services. The CLI supports the full development cycle, including building, testing, bundling, and deployment.

  要了解关于使用 Angular CLI 的更多信息，请参阅 [CLI 概述](cli "CLI 概述") 。除了创建初始工作空间和应用搭建之外，你还可以使用 CLI 来生成 Angular 代码，比如组件和服务。 CLI 支持完整的开发周期，包括构建、测试、打包和部署。

* For more information about the Angular files generated by `ng new`, see [Workspace and Project File Structure](guide/file-structure).

  要了解更多关于 `ng new` 生成的 Angular 文件的信息，请参阅[工作区和项目文件结构](guide/file-structure) 。

