# Deploying an application

# 部署应用

Deploying your application is the process of compiling, or building, your code and hosting the JavaScript, CSS, and HTML on a web server.

部署应用是指编译或构建代码并将生成的 JavaScript、CSS 和 HTML 托管到 Web 服务器上的过程。

This section builds on the previous steps in the [Getting Started](start "Try it: A basic application") tutorial and shows you how to deploy your application.

本节基于[“入门”](start "尝试：基本应用")教程中的前序步骤，并向你展示如何部署应用。

## Prerequisites

## 先决条件

A best practice is to run your project locally before you deploy it. To run your project locally, you need the following installed on your computer:

这里的最佳实践是在部署项目之前先在本地运行项目。要在本地运行项目，你需要在计算机上安装以下软件：

* [Node.js](https://nodejs.org/en/).
* The [Angular CLI](https://cli.angular.io/).
    From the terminal, install the Angular CLI globally with:

  [Angular CLI](https://cli.angular.io/)。在终端上，使用以下命令全局安装 Angular CLI：

  ```sh
  npm install -g @angular/cli
  ```

    With the Angular CLI, you can use the command `ng` to create new workspaces, new projects, serve your application during development, or produce builds to share or distribute.

  借助 Angular CLI，你可以使用 `ng` 命令创建新的工作区、新项目、在开发过程中启动开发服务器，或生成要共享或分发的构建成果。

## Running your application locally

## 在本地运行你的应用

1. Download the source code from your StackBlitz project by clicking the `Download Project` icon in the left menu, across from `Project`, to download your files.

   在左边的菜单中点击  `Project` 后面的 `Download Project` 图标，以下载你的 StackBlitz 项目的源代码。

1. Create a new Angular CLI workspace using the [`ng new`](cli/new "CLI ng new command reference") command, where `my-project-name` is what you would like to call your project:

   用 [`ng new`](cli/new "CLI ng 新命令参考")命令创建一个新的 Angular CLI 工作区，其中的 `my-project-name` 就是你要生成的项目名：

   ```sh
   ng new my-project-name
   ```

   This command displays a series of configuration prompts. For this tutorial, accept the default settings for each prompt.

   此命令会显示一系列配置提示。对于本教程，请接受每个提示的默认设置。

1. In your newly CLI-generated application, replace the `/src` folder with the `/src` folder from your `StackBlitz` download.

   在新建 CLI 生成的应用中，用从 `StackBlitz` 中下载的 `/src` 文件夹替换原来的 `/src` 文件夹。

1. Use the following CLI command to run your application locally:

   使用以下 CLI 命令在本地运行你的应用：

   ```sh
   ng serve
   ```

1. To see your application in the  browser, go to <http://localhost:4200/>.
   If the default port 4200 is not available, you can specify another port with the port flag as in the following example:

   要在浏览器中查看你的应用，请访问 <http://localhost:4200/>。如果默认端口 4200 不可用，则可以使用端口标志指定另一个端口，如下所示：

   ```sh
   ng serve --port 4201
   ```

   While serving your application, you can edit your code and see the changes update automatically in the browser.
   To stop the `ng serve` command, press `Ctrl`+`c`.

   当启动了应用的开发服务器时，你可以编辑代码并在浏览器中查看对此更改的自动更新。要停止此 `ng serve` 命令，请按 `Ctrl` + `c` 键。

{@a building}
## Building and hosting your application

## 构建和托管你的应用

1. To build your application for production, use the `build` command. By default, this command uses the `production` build configuration.

   要构建用于生产的应用，请使用 `build` 命令。默认情况下，此命令使用 `production` 构建配置。

   ```sh
   ng build
   ```

   This command creates a `dist` folder in the application root directory with all the files that a hosting service needs for serving your application.

   此命令会创建一个 `dist` 文件夹，其中包含把你的应用部署到托管服务时所需的全部文件。

   <div class="alert is-helpful">

   If the above `ng build` command throws an error about missing packages, append the missing dependencies in your local project's `package.json` file to match the one in the downloaded StackBlitz project.

   如果上述 `ng build` 命令引发了“缺少软件包”之类的错误，请将缺失的依赖项附加到本地项目的 `package.json` 文件中，以匹配从 StackBlitz 下载的项目中的依赖项。

   </div>

1. Copy the contents of the `dist/my-project-name` folder to your web server.
   Because these files are static, you can host them on any web server capable of serving files; such as `Node.js`, Java, .NET, or any backend such as [Firebase](https://firebase.google.com/docs/hosting), [Google Cloud](https://cloud.google.com/solutions/web-hosting), or [App Engine](https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website).
   For more information, see [Building & Serving](guide/build "Building and Serving Angular Apps") and [Deployment](guide/deployment "Deployment guide").

   把 `dist/my-project-name` 文件夹的内容复制到 Web 服务器。由于这些文件是静态的，因此你可以将它们托管在任何支持静态文件的 Web 服务器上。（例如 `Node.js`、Java、.NET 或任何后端（例如[Firebase](https://firebase.google.com/docs/hosting)，[Google Cloud](https://cloud.google.com/solutions/web-hosting) 或 [App Engine](https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website)）。有关更多信息，请参阅[构建与服务](guide/build "构建与服务 Angular 应用")以及[部署](guide/deployment "部署指南")部分。

## What's next

## 下一步是什么

In this tutorial, you've laid the foundation to explore the Angular world in areas such as mobile development, UX/UI development, and server-side rendering.
You can go deeper by studying more of Angular's features, engaging with the vibrant community, and exploring the robust ecosystem.

在本教程中，你奠定了在移动开发、UX/UI 开发和服务器端渲染等领域探索 Angular 世界的基础。你可以通过研究 Angular 的更多特性、与充满活力的社区互动，以及探索其健壮的生态系统，来更深入地了解 Angular。

### Learning more Angular

### 了解更多 Angular

For a more in-depth tutorial that leads you through building an application locally and exploring many of Angular's most popular features, see [Tour of Heroes](tutorial).

一份更深入的教程可以指导你在本地构建应用并探索 Angular 许多最受欢迎的功能，请参阅[《英雄之旅》](tutorial) 。

To explore Angular's foundational concepts, see the guides in the Understanding Angular section such as [Angular Components Overview](guide/component-overview) or [Template syntax](guide/template-syntax).

要探索 Angular 的基础概念，请参阅“了解 Angular” 部分的指南，例如 [Angular 组件概览](guide/component-overview)或[模板语法](guide/template-syntax)。

### Joining the community

### 加入社区

[Tweet that you've completed this tutorial](https://twitter.com/intent/tweet?url=https://angular.io/start&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Angular on Twitter"), tell us what you think, or submit [suggestions for future editions](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form").

[去 Tweet 表示你已经完成了本教程](https://twitter.com/intent/tweet?url=https://angular.io/start&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Twitter 上的 Angular")、告诉我们你的想法，或者[为以后的版本](https://github.com/angular/angular/issues/new/choose "Angular GitHub 存储库的新建 Issue 表单")提出建议。

Keep current by following the [Angular blog](https://blog.angular.io/ "Angular blog").

通过关注 [Angular 博客](https://blog.angular.io/ "Angular 博客")来保持更新。

### Exploring the Angular ecosystem

### 探索 Angular 的生态系统

To support your UX/UI development, see [Angular Material](https://material.angular.io/ "Angular Material web site").

要支持你的 UX/UI 开发，请参阅 [Angular Material](https://material.angular.cn/ "Angular Material 网站") 。

The Angular community also has an extensive [network of third-party tools and libraries](resources "Angular resources list").

Angular 社区还拥有广泛的[第三方工具和库网络](resources "Angular 资源列表")。
