# Getting started 

# 快速上手

Welcome to Angular! Angular helps you build modern applications for the web, mobile, or desktop.  

欢迎使用 Angular！Angular 可以帮助你为 Web、移动端或桌面构建现代应用程序。

This guide shows you how to build and run a simple Angular
app. You'll use the [Angular CLI tool](cli "CLI command reference") to accelerate development, 
while adhering to the [Style Guide](guide/styleguide "Angular style guide") recommendations that
benefit _every_ Angular project.

本指南会介绍如何构建并运行一个简单的 Angular 应用。
你将使用 [Angular CLI 工具](cli "CLI command reference")来加速开发，同时学着遵守[风格指南](guide/styleguide "Angular style guide")中的建议，这些建议将使*每一个* Angular 应用受益。

This guide takes less than 30 minutes to complete. 
At the end of this guide&mdash;as part of final code review&mdash;there is a link to download a copy of the final application code. (If you don't execute the commands in this guide, you can still download the final application code.)


本指南只要不到 30 分钟即可完成。本指南的末尾（作为最终代码回顾的一部分）提供了一个链接，你可以去下载最终应用代码的一份复本。（即使你不执行本章的这些命令，仍然可以直接下载这份最终版的应用代码）

{@a devenv}
{@a prerequisites}
## Prerequisites 

## 先决条件

Before you begin, make sure your development environment includes `Node.js®` and an npm package manager. 

在开始之前，请确保你的开发环境已经包含了 `Node.js®` 和 npm 包管理器。

{@a nodejs}
### Node.js

Angular requires `Node.js` version 8.x or 10.x.

Angular 需要 `Node.js` 的 8.x 或 10.x 版本。

* To check your version, run `node -v` in a terminal/console window.

  要想检查你的版本，请在终端/控制台窗口中运行 `node -v` 命令。

* To get `Node.js`, go to [nodejs.org](https://nodejs.org "Nodejs.org").

  要想安装 `Node.js`，请访问 [nodejs.org](https://nodejs.org "Nodejs.org")。

{@a npm}
### npm package manager

### npm 包管理器

Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm). To download and install npm packages, you must have an npm package manager. 

Angular、Angular CLI 和 Angular 应用都依赖于由一些库所提供的特性和功能，它们主要是 [npm 包](https://docs.npmjs.com/getting-started/what-is-npm)。要下载和安装 npm 包，你必须拥有一个 npm 包管理器。

This Quick Start uses the [npm client](https://docs.npmjs.com/cli/install) command line interface, which is installed with `Node.js` by default. 

本 "快速上手" 中使用的是 [npm 客户端](https://docs.npmjs.com/cli/install)命令行界面，它已经在安装 `Node.js` 时默认安装上了。

To check that you have the npm client installed, run `npm -v` in a terminal/console window.

要想检查你是否已经安装了 npm 客户端，请在终端/控制台窗口中运行 `npm -v` 命令。

{@a install-cli}

## Step 1: Install the Angular CLI

## 第一步：安装 Angular CLI

You use the Angular CLI 
to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

你要用 Angular CLI 来创建项目、创建应用和库代码，并执行多种开发任务，比如测试、打包和发布。

Install the Angular CLI globally. 

全局安装 Angular CLI。

To install the CLI using `npm`, open a terminal/console window and enter the following command:

要想使用 `npm` 来安装 CLI，请打开终端/控制台窗口，并输入下列命令：

<code-example language="sh" class="code-shell">
  npm install -g @angular/cli

</code-example>



{@a create-proj}

## Step 2: Create a workspace and initial application

## 第二部：创建工作空间和初始应用

You develop apps in the context of an Angular [**workspace**](guide/glossary#workspace). A workspace contains the files for one or more [**projects**](guide/glossary/#project). A project is the set of files that comprise an app, a library, or end-to-end (e2e) tests. 

Angular [**工作空间**](guide/glossary#workspace)就是你开发应用的上下文环境。
每个工作空间包含一些供一个或多个[**项目**](guide/glossary/#project)使用的文件。
每个项目都是一组由应用、库或端到端（e2e）测试构成的文件。

To create a new workspace and initial app project: 

要想创建工作空间和初始应用项目：

1. Run the CLI command `ng new` and provide the name `my-app`, as shown here: 

   运行 CLI 命令 `ng new`，并提供一个名字 `my-app`，如下所示：

    <code-example language="sh" class="code-shell">
      ng new my-app

    </code-example>

2. The `ng new` command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key. 

   `ng new` 会提示你要把哪些特性包含在初始的应用项目中。请按 Enter 或 Return 键接受默认值。

The Angular CLI installs the necessary Angular npm packages and other dependencies. This can take a few minutes. 

Angular CLI 会安装必要的 Angular npm 包及其它依赖。这可能要花几分钟。

It also creates the following workspace and starter project files: 

还将创建下列工作空间和初始项目文件：

* A new workspace, with a root folder named `my-app`

  一个新的工作空间，根目录名叫 `my-app`

* An initial skeleton app project, also called `my-app` (in the `src` subfolder)

  一个初始的骨架应用项目，也叫 `my-app`（但位于 `src` 子目录下）

* An end-to-end test project (in the `e2e` subfolder)

  一个端到端测试项目（位于 `e2e` 子目录下）

* Related configuration files

  相关的配置文件

The initial app project contains a simple Welcome app, ready to run. 

初始的应用项目是一个简单的 "欢迎" 应用，随时可以运行它。

{@a serve}

## Step 3: Serve the application

## 步骤 3：启动开发服务器

Angular includes a server, so that you can easily build and serve your app locally.

Angular 包含一个开发服务器，以便你能在本地轻松地构建应用和启动开发服务器。

1. Go to the workspace folder (`my-app`).

   进入工作空间目录（`my-app`）。

1. Launch the server by using the CLI command `ng serve`, with the `--open` option.

   使用 CLI 命令 `ng serve` 启动开发服务器，并带上 `--open` 选项。

<code-example language="sh" class="code-shell">
  cd my-app
  ng serve --open
</code-example>

The `ng serve` command launches the server, watches your files,
and rebuilds the app as you make changes to those files.

`ng serve` 命令会自动开发服务器，并监视你的文件变化，当你修改这些文件时，它就会重新构建应用。

The `--open` (or just `-o`) option automatically opens your browser
to `http://localhost:4200/`.

`--open`（或只用 `-o`）选项会自动打开浏览器，并访问 `http://localhost:4200/`。

Your app greets you with a message:

看，你的应用使用一条消息在欢迎你：

<figure>
  <img src='generated/images/guide/cli-quickstart/app-works.png' alt="Welcome to my-app!">
</figure>



{@a first-component}

## Step 4: Edit your first Angular component

## 步骤 4：编辑你的第一个 Angular 组件

[**_Components_**](guide/glossary#component) are the fundamental building blocks of Angular applications. 
They display data on the screen, listen for user input, and take action based on that input. 

[**组件**](guide/glossary#component) 是 Angular 应用中的基本构造块。
它们在屏幕上显示数据、监听用户输入，并根据这些输入采取行动。 

As part of the initial app, the CLI created the first Angular component for you. It is the _root component_, and it is named `app-root`. 

作为初始应用的一部分，CLI 也会为你创建第一个 Angular 组件。它就是*根组件*，名叫 `app-root`。

1. Open `./src/app/app.component.ts`. 

   打开 `./src/app/app.component.ts`。

2. Change the `title` property from `'my-app'` to `'My First Angular App'`.

   把 `title` 属性从 `'my-app'` 修改成 `'My First Angular App'`。

    <code-example path="cli-quickstart/src/app/app.component.ts" region="component" header="src/app/app.component.ts" linenums="false"></code-example>

    The browser reloads automatically with the revised title. That's nice, but it could look better.

    浏览器将会用修改过的标题自动刷新。不错，但是还可以更好看。

3. Open `./src/app/app.component.css` and give the component some style.

   打开 `./src/app/app.component.css` 并给这个组件提供一些样式。

    <code-example path="cli-quickstart/src/app/app.component.css" header="src/app/app.component.css" linenums="false"></code-example>

Looking good! 

看起来不错！

<figure>
  <img src='generated/images/guide/cli-quickstart/my-first-app.png' alt="Output of Getting Started app">
</figure>




{@a project-file-review}

## Final code review

## 最终代码回顾

You can <a href="generated/zips/cli-quickstart/cli-quickstart.zip" target="_blank">download an example</a> of the app that you created in this Getting Started guide. 

你可以<a href="generated/zips/cli-quickstart/cli-quickstart.zip" target="_blank">下载</a>在本章中创建的这个例子。

<div class="alert is-helpful">

**Tip:** Most Angular guides include links to download example files and run live examples in [Stackblitz](http://www.stackblitz.com), so that you can see Angular concepts and code in action. 

**提示：** 这里的大多数章节中都包含同时下载范例文件和通过 [Stackblitz](http://www.stackblitz.com) 在线运行它的链接，这样你就能在实战中观察这些 Angular 的概念和代码。

</div>


For more information about Angular project files and the file structure, see [Workspace and project file struture](guide/file-structure).

要了解关于 Angular 项目文件和文件结构的更多信息，请参见[工作空间与项目的文件结构](guide/file-structure)。


## Next steps

## 下一步

Now that you've seen the essentials of an Angular app and the Angular CLI, continue with these other introductory materials: 

现在，你已经了解了 Angular 和 Angular CLI 的基本元素，请访问下列介绍性素材以继续：

* The [Tour of Heroes tutorial](tutorial "Tour of Heroes tutorial") provides additional hands-on learning. It walks you through the steps to build an app that helps a staffing agency manage a group of superhero employees. 
It has many of the features you'd expect to find in a data-driven application: 

  [英雄指南教程](tutorial "Tour of Heroes tutorial")提供了更多手动练习。它将引导你完成构建应用程序的那些步骤。该应用程序可以帮助管理机构管理一些身为超级英雄的员工。
  它具有你期望在数据驱动的应用中能找到的许多特性：

  - Acquiring and displaying a list of items

    获取与显示条目的列表

  - Editing a selected item's detail

    编辑所选条目的详情

  - Navigating among different views of the data

    在数据的不同视图之间导航

* The [Architecture guide](guide/architecture "Architecture guide") describes key concepts such as modules, components, services, and dependency injection (DI). It provides a foundation for more in-depth guides about specific Angular concepts and features.  

  [架构](guide/architecture "Architecture guide")描述了一些关键概念，比如模块、组件、服务和依赖注入（DI）。它为你深入了解一些 Angular 专属的概念和特性奠定了基础。

After the Tutorial and Architecture guide, you'll be ready to continue exploring Angular on your own through the other guides and references in this documentation set, focusing on the features most important for your apps. 

在读完 "英雄指南" 和 "架构" 之后，你还可以通过本文档中的其它指南和参考资料自行探索 Angular，可以重点关注那些对你的应用至关重要的特性。
