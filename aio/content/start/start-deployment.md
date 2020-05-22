# Try it: Deployment

# 部署

To deploy your application, you have to compile it, and then host the JavaScript, CSS, and HTML on a web server. Built Angular applications are very portable and can live in any environment or served by any technology, such as Node, Java, .NET, PHP, and many others.

要部署应用，你必须先编译它，然后在 Web 服务器上托管 JavaScript、CSS 和 HTML。构建后的 Angular 应用程序非常容易移植，它可以在任何环境中运行，也可以用任何技术提供服务，比如 Node，Java，.NET，PHP 等等。

<div class="alert is-helpful">

Whether you came here directly from [Part 1](start "Try it: A basic app"), or completed the entire online store application through the [In-app navigation](start/start-routing "Try it: In-app navigation"), [Manage data](start/start-data "Try it: Manage data"), and [Forms for user input](start/start-forms "Try it: Forms for user input") sections, you have an application that you can deploy by following the instructions in this section. 

无论你是从[你的第一个应用](start "入门：你的第一个应用")直接来到这里，还是经过[路由](start/start-routing "入门：路由")、[管理数据](start/start-data "入门：管理数据")和[表单](start/start-forms "入门：表单")部分，完成了整个在线商店应用之后来到这里，都可以按照本节中的说明进行部署。

</div>

## Share your application

## 从 StackBlitz 开始部署

StackBlitz projects are public by default, allowing you to share your Angular app via the project URL. Keep in mind that this is a great way to share ideas and prototypes, but it is not intended for production hosting.

StackBlitz 项目默认是公开的，你可以通过项目的 URL 来共享你的应用。记住，虽然这是一种共享思路和原型的良好途径，但并不适合承载产品环境。

1. In your StackBlitz project, make sure you have forked or saved your project.

   在你的 StackBlitz 项目中，请先确保你已经分支或保存了项目。

1. In the preview page, you should see a URL that looks like `https://<Project ID>.stackblitz.io`.

   在预览窗格，你会看到一个形如 `https://<Project ID>.stackblitz.io` 的 URL。

1. Share this URL with a friend or colleague.

   把这个 URL 共享给朋友或同事。

1. Users that visit your URL will see a development server start up, and then your application will load.

   访问你的 URL 的用户会看到启动了一个开发服务器，然后就会加载你的应用。

## Building locally

## 本地构建

To build your application locally or for production, download the source code from your StackBlitz project by clicking the `Download Project` icon in the left menu across from `Project` to download your files.

要在本地构建应用或未生产环境构建应用，你需要从 StackBlitz 项目中下载源代码。单击左侧菜单中的 `Download Project` 图标以下载文件。

Once you have the source code downloaded and unzipped, use the [Angular Console](https://angularconsole.com "Angular Console web site") to serve the application, or install `Node.js` and serve your app with the Angular CLI.

下载并解压源代码后，就可以使用 [Angular Console](https://angularconsole.com "Angular Console 的网站") 来启动开发服务器了，也可以先安装 `Node.js` 再安装 Angular CLI。

From the terminal, install the Angular CLI globally with:

在终端上，全局安装 Angular CLI：

```sh
npm install -g @angular/cli
```

This installs the command `ng` on your system, which is the command you use to create new workspaces, new projects, serve your application during development, or produce builds to share or distribute.

这会把命令 `ng` 安装到你的系统中，你可以用它的命令来创建新工作区或新项目、启动开发服务器、或构建那些可以共享或分发的版本。

Create a new Angular CLI workspace using the [`ng new`](cli/new "CLI ng new command reference") command:

[`ng new`](cli/new "在 CLI 中输入新的命令参考") 命令用来创建一个新的 Angular CLI 工作空间：

```sh
ng new my-project-name
```

In your new CLI generated app, replace the `/src` folder with the one from your `StackBlitz` download, and then perform a build.

进入你从 `StackBlitz` 下载的 `/src` 文件夹，然后执行 build 命令。

```sh
ng build --prod
```

This will produce the files that you need to deploy.

这会产生你要部署的文件。

<div class="alert is-helpful">

If the above `ng build` command throws an error about missing packages, append the missing dependencies in your local project's `package.json` file to match the one in the downloaded StackBlitz project.

如果上述 `ng build` 命令抛出缺少软件包的错误，请将缺少的依赖项添加到本地项目的 `package.json` 文件中，以便和下载的 StackBlitz 项目的依赖项保持一致。

</div>

#### Hosting the built project

#### 托管已构建的项目

The files in the `dist/my-project-name` folder are static. This means you can host them on any web server capable of serving files (such as `Node.js`, Java, .NET), or any backend (such as Firebase, Google Cloud, or App Engine).

`dist/my-project-name` 文件夹中的文件都是静态的，可以托管在任何能够提供文件服务的 Web 服务器上（`Node.js`，Java，.NET），也可以是任何后端（Firebase，Google Cloud，App Engine 等）。

### Hosting an Angular app on Firebase

### 在 Firebase 上托管一个 Angular 应用

One of the easiest ways to get your site live is to host it using Firebase.

要想让你的网站上线，最简单的办法之一就是使用 Firebase 托管它。

1. Sign up for a firebase account on [Firebase](https://firebase.google.com/ "Firebase web site").

   在 [Firebase](https://firebase.google.com/ "Firebase 网站") 上注册一个 firebase 账号。

1. Create a new project, giving it any name you like.

   创建一个新项目，给它任意名字。

1. Add the `@angular/fire` schematics that will handle your deployment using `ng add @angular/fire`.

   使用 `npm install -g firebase-tools` 安装 `firebase-tools` CLI 来处理你的部署。
1. Connect your CLI to your Firebase account and initialize the connection to your project using `firebase login` and `firebase init`.

   把你的 CLI 和 Firebase 帐户联系起来，使用 `firebase login` 和 `firebase init` 来初始化这个联系。

1. Follow the prompts to select the `Firebase` project you are creating for hosting.

   遵照下列提示选择你为托管它而创建的 `Firebase` 项目。

  - Select the `Hosting` option on the first prompt.
  
    在第一个提示中选择 `Hosting` 选项。
  
  - Select the project you previously created on Firebase.
  
    选择你以前在 Firebase 中创建的项目。
  
  - Select `dist/my-project-name` as the public directory.
  
    选择 `dist/my-project-name` 作为公开目录。
  
1. Deploy your application with `ng deploy`.

   用 `firebase deploy` 命令部署你的应用，这是因为 `firebase init` 命令已经创建了一个 `firebase.json`，它会告诉 Firebase 如何用你的应用提供服务。
1. Once deployed, visit https://your-firebase-project-name.firebaseapp.com to see it live!

   部署之后，访问 <https://your-firebase-project-name.firebaseapp.com> 进行实时查看！

### Hosting an Angular app anywhere else

### 在其它地方托管 Angular 应用

To host an Angular app on another web host, upload or send the files to the host.
Because you are building a single page application, you'll also need to make sure you redirect any invalid URLs to your `index.html` file.
Read more about development and distribution of your application in the [Building & Serving](guide/build "Building and Serving Angular Apps") and [Deployment](guide/deployment "Deployment guide") guides.

要在其它网络主机上托管 Angular 应用，你需要上传文件或把它们发送到那台主机。由于你正在构建一个单页面应用，所以你还要确保把所有无效的 URL 都重定向到 `index.html` 文件。在[构建与服务](guide/build "构建和提供 Angular 应用服务")和[部署](guide/deployment "部署指南")指南”中可以找到关于开发和部署应用的更多信息。

## Join the Angular community

## 加入我们的社区

You are now an Angular developer! [Share this moment](https://twitter.com/intent/tweet?url=https://angular.io/start&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Angular on Twitter"), tell us what you thought of this get-started exercise, or submit [suggestions for future editions](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form").

你现在是一位 Angular 的开发者了！[分享这一刻](https://twitter.com/intent/tweet?url=https://next.angular.io/getting-started&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Angular on Twitter")，告诉我们你对这份“入门文档”的看法，或者[为今后的版本](https://github.com/angular/angular/issues/new/choose "Angular GitHub 存储库中的新问题表单")提交[建议](https://github.com/angular/angular/issues/new/choose "Angular GitHub 存储库中的新问题表单")。

Angular offers many more capabilities, and you now have a foundation that empowers you to build an application and explore those other capabilities:

Angular 还提供了更多功能，不过你现在已经有了基础，可以让你构建一个应用并探索其它的能力：

* Angular provides advanced capabilities for mobile apps, animation, internationalization, server-side rendering, and more. 

  Angular 为移动应用、动画、国际化、服务器端渲染等提供了先进的功能。

* [Angular Material](https://material.angular.io/ "Angular Material web site") offers an extensive library of Material Design components. 

  [Angular Material](https://material.angular.io/ "Angular Material 网站") 提供了丰富的 Material Design 组件库。

* [Angular Protractor](https://protractor.angular.io/ "Angular Protractor web site") offers an end-to-end testing framework for Angular apps. 

  [Angular Protractor](https://protractor.angular.io/ "Angular Protractor 网站") 为 Angular 应用提供了一个端到端的测试框架。

* Angular also has an extensive [network of 3rd-party tools and libraries](https://angular.io/resources "Angular resources list"). 

  Angular 还拥有广泛的[第三方工具和库](https://angular.cn/resources "Angular 资源列表")互助网。

Keep current by following the [Angular blog](https://blog.angular.io/ "Angular blog").

敬请关注 [Angular 官方博客](https://blog.angular.io/ "Angular 的博客")。
