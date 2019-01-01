# Angular Universal: server-side rendering

# Angular Universal：服务端渲染

This guide describes **Angular Universal**, a technology that runs your Angular application on the server.

本指南讲的是**Angular Universal（统一平台）**，一项在服务端运行 Angular 应用的技术。

A normal Angular application executes in the _browser_, rendering pages in the DOM in response to user actions.

标准的 Angular 应用会运行在*浏览器*中，它会在 DOM 中渲染页面，以响应用户的操作。

Angular Universal generates _static_ application pages on the _server_
through a process called _server-side rendering_ (SSR).

而**Angular Universal** 会在*服务端*通过一个名叫**服务端渲染（server-side rendering - SSR）的过程**生成*静态*的应用页面。

When Universal is integrated with your app, it can generate and serve those pages in response to requests from browsers.
It can also pre-generate pages as HTML files that you serve later.

它可以生成这些页面，并在浏览器请求时直接用它们给出响应。
也可以把页面预先生成为 HTML 文件，然后把它们作为静态文件供服务器使用。

You can easily prepare an app for server-side rendering using the [Angular CLI](guide/glossary#cli). The CLI schematic `@nguniversal/express-engine` performs the required steps, as described below. 

你可以使用 [Angular CLI](guide/glossary#cli) 来轻松为应用做好服务端渲染的准备。CLI 的 `@nguniversal/express-engine` 模板会执行下面所讲的必要步骤。

This guide describes a Universal sample application that launches quickly as a server-rendered page.
Meanwhile, the browser downloads the full client version and switches to it automatically after the code loads.

本指南讲的是一个 Universal 的范例应用，它启动得和在服务端渲染好的页面一样快。
稍后，浏览器就会下载完整的客户端版本，并在代码加载完之后自动切换过去。

<div class="alert is-helpful">

  **Note:** [Download the finished sample code](generated/zips/universal/universal.zip),
  which runs in a [Node.js® Express](https://expressjs.com/) server.

你可以[下载最终的范例代码](generated/zips/universal/universal.zip)，并将其运行在一个 [Node.js® Express](https://expressjs.com/) 服务器中。

</div>

{@a why-do-it}

## Why use server-side rendering?

### 为何需要 Universal

There are three main reasons to create a Universal version of your app.

有三个主要的理由来为你的应用创建一个 Universal 版本。

1. Facilitate web crawlers (SEO)

   帮助网络爬虫（SEO）

1. Improve performance on mobile and low-powered devices

   提升在手机和低功耗设备上的性能

1. Show the first page quickly

   迅速显示出第一个页面

{@a seo}

{@a web-crawlers}

### Facilitate web crawlers

### 帮助网络爬虫

Google, Bing, Facebook, Twitter, and other social media sites rely on web crawlers to index your application content and make that content searchable on the web.

Google、Bing、Facebook、Twitter 和其它社交媒体网站都依赖网络爬虫去索引你的应用内容，并且让它的内容可以通过网络搜索到。
These web crawlers may be unable to navigate and index your highly interactive Angular application as a human user could do.

这些网络爬虫可能不会像人类那样导航到你的具有高度交互性的 Angular 应用，并为其建立索引。

Angular Universal can generate a static version of your app that is easily searchable, linkable, and navigable without JavaScript.
Universal also makes a site preview available since each URL returns a fully rendered page.

Angular Universal 可以为你生成应用的静态版本，它易搜索、可链接，浏览时也不必借助 JavaScript。
它也让站点可以被预览，因为每个 URL 返回的都是一个完全渲染好的页面。

Enabling web crawlers is often referred to as
[search engine optimization (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf).

启用对网络爬虫的支持通常也称作[搜索引擎优化 (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)。

{@a no-javascript}

### Improve performance on mobile and low-powered devices

### 提升手机和低功耗设备上的性能

Some devices don't support JavaScript or execute JavaScript so poorly that the user experience is unacceptable.
For these cases, you may require a server-rendered, no-JavaScript version of the app.
This version, however limited, may be the only practical alternative for
people who otherwise couldn't use the app at all.

有些设备不支持 JavaScript 或 JavaScript 执行得很差，导致用户体验不可接受。
对于这些情况，你可能会需要该应用的服务端渲染的、无 JavaScript 的版本。
虽然有一些限制，不过这个版本可能是那些完全没办法使用该应用的人的唯一选择。

{@a startup-performance}

### Show the first page quickly

### 快速显示第一页

Displaying the first page quickly can be critical for user engagement.

快速显示第一页对于吸引用户是至关重要的。

[53percent of mobile site visits are abandoned](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) if pages take longer than 3 seconds to load.
Your app may have to launch faster to engage these users before they decide to do something else.

如果页面加载超过了三秒钟，那么 [53% 的移动网站会被放弃](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)。
你的应用要启动得更快一点，以便在用户决定做别的事情之前吸引他们的注意力。

With Angular Universal, you can generate landing pages for the app that look like the complete app.
The pages are pure HTML, and can display even if JavaScript is disabled.
The pages don't handle browser events, but they _do_ support navigation through the site using [`routerLink`](guide/router#router-link).

使用 Angular Universal，你可以为应用生成“着陆页”，它们看起来就和完整的应用一样。
这些着陆页是纯 HTML，并且即使 JavaScript 被禁用了也能显示。
这些页面不会处理浏览器事件，不过它们*可以*用 `[routerLink](guide/router#router-link)` 在这个网站中导航。

In practice, you'll serve a static version of the landing page to hold the user's attention.
At the same time, you'll load the full Angular app behind it. 
The user perceives near-instant performance from the landing page
and gets the full interactive experience after the full app loads.

在实践中，你可能要使用一个着陆页的静态版本来保持用户的注意力。
同时，你也会在幕后加载完整的 Angular 应用。
用户会觉得着陆页几乎是立即出现的，而当完整的应用加载完之后，又可以获得完整的交互体验。

{@a how-does-it-work}

## Universal web servers

## Universal Web 服务器

A Universal web server responds to application page requests with static HTML rendered by the [Universal template engine](#universal-engine). 
The server receives and responds to HTTP requests from clients (usually browsers), and serves static assets such as scripts, CSS, and images.
It may respond to data requests, either directly or as a proxy to a separate data server.

Universal Web 服务器使用 [Universal 模板引擎](#universal-engine)渲染出的静态 HTML 来响应对应用页面的请求。
服务器接收并响应来自客户端（通常是浏览器）的 HTTP 请求，并回复静态文件，如脚本、CSS 和图片。
它可以直接响应数据请求，也可以作为独立数据服务器的代理进行响应。

The sample web server for this guide is based on the popular [Express](https://expressjs.com/) framework.

这个例子中的范例 Web 服务器是基于常见的 [Express](https://expressjs.com/) 框架的。

<div class="alert is-helpful">

  **Note:** _Any_ web server technology can serve a Universal app as long as it can call Universal's `renderModuleFactory()` function.
  The principles and decision points discussed here apply to any web server technology.

  **注意：** **任何一种** Web 服务器技术都可以作为 Universal 应用的服务器，只要它能调用 Universal 的 `renderModuleFactory()` 函数。
  这里所讨论的这些原则和决策点也适用于任何 Web 服务器技术。

</div>

To make a Universal app, install the `platform-server` package, which provides server implementations 
of the DOM, `XMLHttpRequest`, and other low-level features that don't rely on a browser.
Compile the client application with the `platform-server` module (instead of the `platform-browser` module)
and run the resulting Universal app on a web server.

要制作一个 Universal 应用，就要安装 `platform-server` 包，它提供了 DOM 的服务端实现、`XMLHttpRequest` 以及其它不依赖浏览器的底层特性。
使用 `platform-server` 模块（代替 `platform-browser` 模块）编译客户端应用，并在 Web 服务器上运行其生成的 Universal 应用。

The server ([Node Express](https://expressjs.com/) in this guide's example)
passes client requests for application pages to Universal's `renderModuleFactory()` function.

服务器（这个例子中使用的是 [Node Express](https://expressjs.com/) 服务器）会把客户端对应用页面的请求传给 `renderModuleFactory()` 函数。

The `renderModuleFactory()` function takes as inputs a *template* HTML page (usually `index.html`),
an Angular *module* containing components,
and a *route* that determines which components to display.

`renderModuleFactory()` 函数接受一个*模板* HTML 页面（通常是 `index.html`）、一个包含组件的 Angular *模块*和一个用于决定该显示哪些组件的*路由*作为输入。

The route comes from the client's request to the server.

该路由从客户端的请求中传给服务器。

Each request results in the appropriate view for the requested route.

每次请求都会给出所请求路由的一个适当的视图。

The `renderModuleFactory()` function renders the view within the `<app>` tag of the template, 
creating a finished HTML page for the client. 

`renderModuleFactory()` 在模板中的 `<app>` 标记中渲染出哪个视图，并为客户端创建一个完成的 HTML 页面。

Finally, the server returns the rendered page to the client.

最后，服务器就会把渲染好的页面返回给客户端。

{@a summary}
## Preparing for server-side rendering

## 准备服务端渲染

Before your app can be rendered on a server, you must make changes in the app itself, and also set up the server.

要想让应用可以在服务器上渲染，就要对应用自身做一些修改，然后搭建服务器环境。

1. Install dependencies.

   安装依赖。

1. Prepare your app by modifying both the app code and its configuration.  

   通过修改应用代码及其配置进行准备。

1. Add a build target, and build a Universal bundle using the CLI with the `@nguniversal/express-engine` schematic.

   添加构建目标，并使用 CLI 中的 `@nguniversal/express-engine` 原理图来构建出 Universal 包。

1. Set up a server to run Universal bundles.

   设置服务器，以运行 Universal 包。

1. Pack and run the app on the server.

   打包并在服务器上运行此应用。

The following sections go into each of these main steps in more detail.

下面各节将会更详细的介绍这些主要步骤。

<div class="alert is-helpful">

  **Note:** The [Universal tutorial](#the-example) below walks you through the steps using the Tour of Heroes sample app, and goes into more detail about what you can do and why you might want to do it. 

  **注意：稍后的 **[Universal 教程](#the-example)将引导你基于 "英雄指南" 应用来完成各个步骤，并详细介绍你能做什么以及为什么要那么做。

  To see a working version of an app with server-side rendering, clone the [Angular Universal starter](https://github.com/angular/universal-starter). 

  要亲自体验带服务端渲染功能的应用，请把 [Angular Universal starter](https://github.com/angular/universal-starter) 克隆下来试试。

</div>

<div class="callout is-critical">

<header>Security for server requests</header>

<header>服务端请求的安全性</header>

HTTP requests issued from a browser app aren't the same as those issued by the Universal app on the server.
Universal HTTP requests have different security requirements

应用从浏览器上发出的请求和从服务器上发出的请求是不同的。
Universal 的 HTTP 请求有不同的安全需求。

When a browser makes an HTTP request, the server can make assumptions about cookies, XSRF headers, and so on. 
For example, the browser automatically sends authentication cookies for the current user.
Angular Universal can't forward these credentials to a separate data server.
If your server handles HTTP requests, you'll have to add your own security plumbing.

当浏览器发出 HTTP 请求时，服务器处理时会具有一些假设，比如 Cookie、XSRF 头等等。
例如，浏览器会自动发送当前用户的认证 Cookie。
Angular Universal 却没办法把这些凭证转发给独立的数据服务器。
如果你的服务器要处理 HTTP 请求，你必须另行添加自己的通道来提供安全性。

</div>

## Step 1: Install dependencies

## 步骤一：安装依赖

Install `@angular/platform-server` into your project. Use the same version as the other `@angular` packages in your project. You also need `ts-loader` for your webpack build and `@nguniversal/module-map-ngfactory-loader` to handle lazy-loading in the context of a server-render.

把 `@angular/platform-server` 安装到项目中。在项目中使用与其它 `@angular` 包相同的版本。你还需要 `ts-loader` 供 Webpack 构建时使用，还要安装 `@nguniversal/module-map-ngfactory-loader` 来处理服务端渲染环境下的惰性加载。

```
$ npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader
```

## Step 2: Prepare your app

## 步骤二：准备你的应用

To prepare your app for Universal rendering, take the following steps:

要让你的应用为 Universal 渲染做好准备，要遵循如下步骤：

* Add Universal support to your app.

  为应用添加 Universal 支持。

* Create a server root module.

  创建服务端根模块。

* Create a main file to export the server root module.

  创建一个 main 文件，以导出服务端根模块。

* Configure the server root module.

  配置服务端根模块。

### 2a. Add Universal support to your app

### 2a. 为应用添加 Universal 支持

Make your `AppModule` compatible with Universal by adding `.withServerTransition()` and an application ID to your `BrowserModule` import in `src/app/app.module.ts`.

要想让你的 `AppModule` 与 Universal 兼容，就要在 `src/app/app.module.ts` 中导入时 `BrowserModule` 添加一个 `.withServerTransition()` 并带上应用的 ID。

<code-example format="." language="typescript" linenums="false">
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({appId: 'my-app'}),
    ...
  ],

})
export class AppModule {}
</code-example>

### 2b. Create a server root module

### 2b. 创建服务端根模块

Create a module named `AppServerModule` to act as the root module when running on the server. This example places it alongside `app.module.ts` in a file named `app.server.module.ts`. The new module  imports everything from the root `AppModule`, and adds `ServerModule`. It also adds `ModuleMapLoaderModule` to help make lazy-loaded routes possible during server-side renders with the Angular CLI.

在服务器上运行时，要创建一个名叫 `AppServerModule` 的模块作为根模块。这个例子中把它放在了 `app.module.ts` 附近的 `app.server.module.ts` 文件中。这个新模块从 `AppModule` 中导入了所有东西，并且导入了 `ServerModule`。它还导入了 `ModuleMapLoaderModule` 以帮助在服务端渲染时也能使用惰性加载路由。

Here's an example in `src/app/app.server.module.ts`.

下面是 `src/app/app.server.module.ts` 的例子。

<code-example format="." language="typescript" linenums="false">
import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {}
</code-example>

### 2c. Create a main file to export AppServerModule

### 2c. 创建一个 main 文件，导出 AppServerModule

Create a main file for your Universal bundle in the app `src/` folder  to export your `AppServerModule` instance. This example calls the file `main.server.ts`.

在应用的 `src/` 目录下为你的 Universal 包创建一个 main 文件，以导出 `AppServerModule` 实例。在这个例子里它叫 `main.server.ts`。

<code-example format="." language="typescript" linenums="false">
export { AppServerModule } from './app/app.server.module';
</code-example>

### 2d. Create a configuration file for AppServerModule 

### 2d. 为 AppServerModule 创建配置文件

Copy `tsconfig.app.json` to `tsconfig.server.json` and modify it as follows:

把 `tsconfig.app.json` 复制到 `tsconfig.server.json` 中，并做如下修改：

* In `"compilerOptions"`, set the  `"module"` target to `"commonjs"`.

  在 `"compilerOptions"` 中，把 `"module"` 改为 `"commonjs"`。

* Add a section for `"angularCompilerOptions"` and set `"entryModule"` to point to your `AppServerModule` instance. Use the format `importPath#symbolName`. In this example, the entry module is `app/app.server.module#AppServerModule`.

  添加一个 `"angularCompilerOptions"` 节，并把 `"entryModule"`（入口模块）指向你的 `AppServerModule` 实例，格式为 `importPath#symbolName`。在这个例子中，这个入口模块是 `app/app.server.module#AppServerModule`。


<code-example format="." language="none" linenums="false">
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    // Set the module format to "commonjs":
    "module": "commonjs",
    "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ],
  // Add "angularCompilerOptions" with the AppServerModule you wrote
  // set as the "entryModule".
  "angularCompilerOptions": {
    "entryModule": "app/app.server.module#AppServerModule"
  }
}
</code-example>

## Step 3: Create a new build target and build the bundle

## 步骤三：创建新的构建目标，并打包

Open the Angular configuration file, `angular.json`, for your project, and add a new target in the `"architect"` section for the server build. The following example names the new target `"server"`.

打开本项目的 Angular 配置文件 `angular.json`，并在 `"architect"` 节下添加一个新的目标。下面的例子中把这个新目标命名为 `"server"`。

<code-example format="." language="none" linenums="false">
"architect": {
  "build": { ... }
  "server": {
    "builder": "@angular-devkit/build-angular:server",
    "options": {
      "outputPath": "dist/my-project-server",
      "main": "src/main.server.ts",
      "tsConfig": "src/tsconfig.server.json"
    }
  }
}
</code-example>

To build a server bundle for your application, use the `ng run` command, with the format `projectName#serverTarget`. In our example, there are now two targets configured, `"build"` and `"server"`.

要想为应用程序构建服务包，请使用 `ng run` 命令，格式为 `projectName#serverTarget`。在这个例子中，目前已配置了两个目标 `"build"` 和 `"server"`。

<code-example format="." language="none" linenums="false">
# This builds your project using the server target, and places the output
# in dist/my-project-server/
$ ng run my-project:server

Date: 2017-07-24T22:42:09.739Z
Hash: 9cac7d8e9434007fd8da
Time: 4933ms
chunk {0} main.js (main) 9.49 kB [entry] [rendered]
chunk {1} styles.css (styles) 0 bytes [entry] [rendered]
</code-example>

## Step 4: Set up a server to run Universal bundles

## 步骤四：设置服务器环境，以运行 Universal 包

To run a Universal bundle, you need to send it to a server. 

要想运行 Universal 包，你需要把它发送给服务器。

The following example passes `AppServerModule` (compiled with AoT) to the `PlatformServer` method `renderModuleFactory()`, which serializes the app and returns the result to the browser.

下面的例子中把 `AppServerModule`（用 AOT 编译的）传给了 `PlatformServer` 的 `renderModuleFactory()`，它会序列化该应用，并把结果返回给浏览器。

<code-example format="." language="typescript" linenums="false">
app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // configure DI to make lazy-loading work differently
    // (we need to instantly render the view)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});
</code-example>

This technique gives you complete flexibility. For convenience, you can also use the `@nguniversal/express-engine` tool that has some built-in features.

该技术为你提供了完全的灵活性。方便起见，你还可以使用具有一些内置功能的 `@nguniversal/express-engine` 工具。

<code-example format="." language="typescript" linenums="false">
import { ngExpressEngine } from '@nguniversal/express-engine';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
</code-example>

The following simple example implements a bare-bones Node Express server to fire everything up. 
(Note that this is for demonstration only. In a real production environment, you need to set up additional authentication and security.)

下面的简单例子实现了一个骨架级 Node Express 服务器来解决这些问题。
（注意，它只能用于演示，在实际生产环境中，你还要设置身份验证和安全性。）

At the root level of your project, next to `package.json`, create a file named `server.ts` and add the following content.

在应用的根目录下，紧挨着 `package.json`，创建一个名叫 `server.ts` 的文件，并添加如下内容。

<code-example format="." language="typescript" linenums="false">
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
</code-example>

## Step 5: Pack and run the app on the server

## 步骤五：打包并在服务器上运行此应用

Set up a webpack configuration to handle the Node Express `server.ts` file and serve your application.

设置 webpack 配置，以处理 Node Express 的 `server.ts` 文件，并启动应用服务器。

In your app root directory, create a webpack configuration file (`webpack.server.config.js`) that compiles the `server.ts` file and its dependencies into `dist/server.js`.

在应用的根目录下，创建一个 Webpack 配置文件 `webpack.server.config.js`，它会把 `server.ts` 及其依赖编译到 `dist/server.js` 中。

<code-example format="." language="typescript" linenums="false">
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {  server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for "WARNING Critical dependency: the request of a dependency is an expression"
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}
</code-example>

The project's `dist/` folder now contains both browser and server folders.

项目的 `dist/` 目录现在同时包含 browser 目录和 server 目录。

<code-example format="." language="none" linenums="false">
dist/
   browser/
   server/
</code-example>

To run the app on the server, type the following in a command shell.

要想在服务器上运行该应用，请在命令行窗口运行下列命令：

<code-example format="." language="bash" linenums="false">
node dist/server.js
</code-example>

### Creating scripts

### 创建一些脚本

Now let's create a few handy scripts to help us do all of this in the future.
You can add these in the `"server"` section of the Angular configuration file, `angular.json`.

现在，来创建一些便利脚本，在以后帮助我们完成这些琐事。

<code-example format="." language="none" linenums="false">
"architect": {
  "build": { ... }
  "server": {
    ...
     "scripts": {
      // Common scripts
      "build:ssr": "npm run build:client-and-server-bundles && npm run webpack:server",
      "serve:ssr": "node dist/server.js",

      // Helpers for the scripts
      "build:client-and-server-bundles": "ng build --prod && ng build --prod --app 1 --output-hashing=false",
      "webpack:server": "webpack --config webpack.server.config.js --progress --colors"
    }
   ...
</code-example>

To run a production build of your app with Universal on your local system, use the following command.

要想在本地系统上使用 Universal 运行应用的生产版本，请使用如下命令：

<code-example format="." language="bash" linenums="false">
npm run build:ssr && npm run serve:ssr
</code-example>

### Working around the browser APIs

### 使用浏览器 API

Because a Universal `platform-server` app doesn't execute in the browser, you may have to work around some of the browser APIs and capabilities that are missing on the server.

由于 Universal 的 `platform-server` 应用并没有运行在浏览器中，因此那些与浏览器 API 有关的工作都没法在这个服务器中使用。


For example, your server-side page can't reference browser-only native objects such as `window`, `document`, `navigator`, or `location`. 
If you don't need these on the server-rendered page, you can side-step them with conditional logic.
Alternatively, you can find an injectable Angular abstraction over the object you need such as `Location` or `Document`;
it may substitute adequately for the specific API that you're calling.
If Angular doesn't provide it, you can write your own abstraction that delegates to the browser API while in the browser and to a satisfactory alternative implementation while on the server.

比如，你的服务端渲染页面不能引用浏览器独有的原生对象，比如 `window`、`document`、`navigator` 或 `location`。
如果你在服务端渲染的页面中不需要它们，就可以使用条件逻辑跳过它们。
另一种方式是查找一个可注入的 Angular 对所需对象的抽象服务，比如 `Location` 或 `Document`，它可能作为你调用的指定 API 的等价替身。
如果 Angular 没有提供它，你也可以写一个自己的抽象层，当在浏览器中运行时，就把它委托给浏览器 API，当它在服务器中运行时，就提供一个符合要求的代用实现。


Similarly, without mouse or keyboard events, a server-side app can't rely on a user clicking a button to show a component.
The app must determine what to render based solely on the incoming client request.
This is a good argument for making the app [routable](guide/router).

同样，由于没有鼠标或键盘事件，因此 Universal 应用也不能依赖于用户点击某个按钮来显示每个组件。
Universal 应用必须仅仅根据客户端过来的请求决定要渲染的内容。
把该应用做成[可路由的](guide/router)，就是一种好方案。

Because the user of a server-rendered page can't do much more than click links,
you should swap in the real client app as quickly as possible for a proper interactive experience.

由于服务端渲染页面的用户只能点击链接，所以你应该尽快让它切换到真正的客户端应用，以提供正常的交互体验。

{@a the-example}

## Universal tutorial 

## 例子

The [Tour of Heroes tutorial](tutorial) is the foundation for this walkthrough. 

[《英雄指南》教程](tutorial)是本章所讲的 Universal 范例的基础。

The core application files are mostly untouched, with a few exceptions described below.
You'll add more files to support building and serving with Universal.

除了下面讲的少量修改之外，应用中的核心文件几乎不用动。
你只需要添加一些额外的文件来支持使用 Universal 进行构建和提供服务。

In this example, the Angular CLI compiles and bundles the Universal version of the app with the
[Ahead-of-Time (AoT) compiler](guide/aot-compiler).
A Node Express web server turns client requests into the HTML pages rendered by Universal.

在这个例子中，Angular CLI 会使用 [AOT (预先) 编译器](guide/aot-compiler)对该应用的 Universal 版本进行编译和打包。
Node.js® 的 Express Web 服务器会把客户端请求转换成由 Universal 渲染出的页面。

To create server-side app module, `app.server.module.ts`, run the following CLI command.

要想创建服务端渲染模块 `app.server.module.ts`，请运行下列 CLI 命令。

<code-example format="." language="bash">

ng add @nguniversal/express-engine --clientProject angular.io-example

</code-example>

The command creates the following folder structure.

该命令会创建如下的目录结构。

<code-example format="." language="none" linenums="false">
src/
  index.html                 <t><i>app web page</i></t><t>应用的宿主页</t>
  main.ts                    <t><i>bootstrapper for client app</i></t><t>客户端应用的引导程序</t>
  main.server.ts             <t><i>* bootstrapper for server app</i></t><t>* 服务端应用的引导程序</t>
  tsconfig.app.json          <t><i>TypeScript client configuration</i></t><t>TypeScript 的客户端配置</t>
  tsconfig.server.json       <t><i>* TypeScript server configuration</i></t><t>* TypeScript 的服务端配置</t>
  tsconfig.spec.json         <t><i>TypeScript spec configuration</i></t><t>TypeScript 的测试配置</t>
  style.css                  <t><i>styles for the app</i></t><t>应用的样式表</t>
  app/ ...                   <t><i>application code</i></t><t>应用代码</t>
    app.server.module.ts     <t><i>* server-side application module</i></t><t>* 服务端的应用模块</t>
server.ts                    <t><i>* express web server</i></t><t>* Express 的服务程序</t>
tsconfig.json                <t><i>TypeScript client configuration</i></t><t>TypeScript 的客户端配置</t>
package.json                 <t><i>npm configuration</i></t><t>npm 配置</t>
webpack.server.config.js     <t><i>* webpack server configuration</i></t><t>* Webpack 的服务端配置</t>
</code-example>

The files marked with `*` are new and not in the original tutorial sample.
This guide covers them in the sections below.


那些标有 `*` 的文件都是新的，而不是来自原来的范例应用。
本文稍后的部分会涉及它们。

{@a http-urls}

### Using absolute URLs for server requests

#### 在 HTTP 中使用绝对地址

The tutorial's `HeroService` and `HeroSearchService` delegate to the Angular `HttpClient` module to fetch application data.
These services send requests to _relative_ URLs such as `api/heroes`.
教程中的 `HeroService` 和 `HeroSearchService` 都委托了 Angular 的 `HttpClient` 模块来获取应用数据。
那些服务都把请求发送到了*相对* URL，比如 `api/heroes`。

In a Universal app, HTTP URLs must be _absolute_(for example, `https://my-server.com/api/heroes`) even when the Universal web server is capable of handling relative requests.
This means you need to change your services to make requests with absolute URLs when running on the server and with relative URLs when running in the browser.

在 Universal 应用中，HTTP 的 URL 必须是*绝对地址*（比如 `https://my-server.com/api/heroes`），
只有这样，Universal 的 Web 服务器才能处理那些请求。
这意味着当运行在服务端时，你要修改你的服务，来使用绝对 URL发起请求，而在浏览器中，则使用相对 URL。

One solution is to provide the server's runtime origin under Angular's [`APP_BASE_HREF`](api/common/APP_BASE_HREF) token,
inject it into the service, and prepend the origin to the request URL.

解决方案之一是通过 Angular 的 [`APP_BASE_HREF` 令牌](api/common/APP_BASE_HREF)来提供服务器的源地址（origin），把它注入到服务中，并把这个源地址添加到所请求的 URL 之前。

Start by changing the `HeroService` constructor to take a second `origin` parameter that is optionally injected via the `APP_BASE_HREF` token.

先为 `HeroService` 的构造函数添加第二个参数 `origin`，它是可选的，并通过 `APP_BASE_HREF` 令牌进行注入。

<code-example path="universal/src/app/hero.service.ts" region="ctor" header="src/app/hero.service.ts (constructor with optional origin)">
</code-example>

The constructor uses the `@Optional()` directive to prepend the origin to `heroesUrl` _if it exists_.

这个构造函数使用了 `@Optional()` 指令来为 `heroesUrl` 添加源（如果有的话）。

You don't provide `APP_BASE_HREF` in the browser version, so `heroesUrl` remains relative.

在浏览器版本中，你不用提供 `APP_BASE_HREF`，因此 `heroesUrl` 仍然是相对的。

<div class="alert is-helpful">

  **Note:** You can ignore `APP_BASE_HREF` in the browser if you've specified `<base href="/">` in the `index.html` file to satisfy the router's need for a base address (as the tutorial sample does).

  **注意：** 如果你通过 `index.html` 文件指定了
`<base href="/">` 以满足路由器对基地址的要求（就像教程中示范的那样），那么就可以在浏览器中忽略 `APP_BASE_HREF` 的设置。
</div>

{@a universal-engine}

### Universal template engine

### Universal 模板引擎

The important bit in the `server.ts` file is the `ngExpressEngine()` function.

`server.ts` 文件中最重要的部分是 `ngExpressEngine()` 函数：

<code-example path="universal/server.ts" header="server.ts" region="ngExpressEngine">
</code-example>

The `ngExpressEngine()` function is a wrapper around Universal's `renderModuleFactory()` function which turns a client's requests into server-rendered HTML pages.
You'll call that function within a _template engine_ that's appropriate for your server stack.

`ngExpressEngine()` 是对 Universal 的 `renderModuleFactory()` 函数的封装。它会把客户端请求转换成服务端渲染的 HTML 页面。
你还要在某个适用于你服务端技术栈的*模板引擎*中调用这个函数。

* The first parameter is `AppServerModule`.
It's the bridge between the Universal server-side renderer and your application.

  第一个参数是 `AppServerModule`。
  它是 Universal 服务端渲染器和你的应用之间的桥梁。

* The second parameter, `extraProviders`, is optional. It lets you specify dependency providers that apply only when running on this server.
You can do this when your app needs information that can only be determined by the currently running server instance. 
The required information in this case is the running server's *origin*, provided under the `APP_BASE_HREF` token, so that the app can [calculate absolute HTTP URLs](#http-urls).

  第二个参数 `extraProviders` 是可选的。它能让你指定一些在服务端运行时特有的服务提供商。
  只有当你的应用需要一些运行在服务器中才需要的信息时，才需要这么做。
  这个例子中所需的信息就是正在运行的服务器的*源*地址，它通过 `APP_BASE_HREF` 令牌提供，以便应用可以 [计算出 HTTP URL 的绝对地址](#http-urls)。

The `ngExpressEngine()` function returns a `Promise` callback that resolves to the rendered page.

`ngExpressEngine()` 函数返回了一个会解析成渲染好的页面的*承诺（Promise）*。

It's up to your engine to decide what to do with that page.
This engine's `Promise` callback returns the rendered page to the web server,
which then forwards it to the client in the HTTP response.

接下来你的引擎要决定拿这个页面做点什么。
在*这个引擎*的 `Promise` 回调函数中，把渲染好的页面返回给了 Web 服务器，然后服务器通过 HTTP 响应把它转发给了客户端。

<div class="alert is-helpful">

  **Note:**  These wrappers help hide the complexity of the `renderModuleFactory()` function. There are more wrappers for different backend technologies
  at the [Universal repository](https://github.com/angular/universal).

  **注意：** 这个包装器帮助隐藏了 `renderModuleFactory()` 的复杂性。
  在 [Universal 代码库中](https://github.com/angular/universal)还有更多针对其它后端技术的包装器。

</div>

### Filtering request URLs

#### 过滤请求的 URL

The web server must distinguish _app page requests_ from other kinds of requests.

Web 服务器必须把*对应用页面的请求*和其它类型的请求区分开。

It's not as simple as intercepting a request to the root address `/`.
The browser could ask for one of the application routes such as `/dashboard`, `/heroes`, or `/detail:12`.
In fact, if the app were only rendered by the server, _every_ app link clicked would arrive at the server
as a navigation URL intended for the router.

这可不像拦截对根路径 `/` 的请求那么简单。
浏览器可以请求应用中的任何一个路由地址，比如 `/dashboard`、`/heroes` 或 `/detail:12`。
事实上，如果应用*只*会通过服务器渲染，那么应用中点击的*任何一个*链接都会发到服务器，就像导航时的地址会发到路由器一样。

Fortunately, application routes have something in common: their URLs lack file extensions.
(Data requests also lack extensions but they're easy to recognize because they always begin with `/api`.)
All static asset requests have a file extension (such as `main.js` or `/node_modules/zone.js/dist/zone.js`).

幸运的是，应用的路由具有一些共同特征：它们的 URL 一般不带文件扩展名。
（数据请求也可能缺少扩展名，但是它们很容易识别出来，因为它们总是以 `/api` 开头，所有的静态资源的请求都会带有一个扩展名，比如 `main.js` 或 `/node_modules/zone.js/dist/zone.js`）。

Because we use routing, we can easily recognize the three types of requests and handle them differently.

由于使用了路由，所以我们可以轻松的识别出这三种类型的请求，并分别处理它们。

1. Data request -  request URL that begins `/api`.

   数据请求 - 请求的 URL 用 `/api` 开头

2. App navigation - request URL with no file extension.

   应用导航 - 请求的 URL 不带扩展名

3. Static asset - all other requests.

   静态资源 - 所有其它请求。

A Node Express server is a pipeline of middleware that filters and processes URL requests one after the other. 
You configure the Node Express server pipeline with calls to `app.get()` like this one for data requests.

Node Express 服务器是一系列中间件构成的管道，它会挨个对 URL 请求进行过滤和处理。
你可以调用 `app.get()` 来配置 Express 服务器的管道，就像下面这个数据请求一样：

<code-example path="universal/server.ts" header="server.ts (data URL)" region="data-request" linenums="false">
</code-example>

<div class="alert is-helpful">

  **Note:** This sample server doesn't handle data requests.

  The tutorial's "in-memory web API" module, a demo and development tool, intercepts all HTTP calls and
  simulates the behavior of a remote data server.
  In practice, you would remove that module and register your web API middleware on the server here.

  本教程的“内存 Web API” 模块（一个演示及开发工具）拦截了所有 HTTP 调用，并且模拟了远端数据服务器的行为。
  在实践中，你应该移除这个模块，并且在服务器上注册你的 Web API 中间件。

</div>

The following code filters for request URLs with no extensions and treats them as navigation requests.

下列代码会过滤出不带扩展名的 URL，并把它们当做导航请求进行处理。

<code-example path="universal/server.ts" header="server.ts (navigation)" region="navigation-request" linenums="false">
</code-example>

### Serving static files safely

#### 安全的提供静态文件

A single `app.use()` treats all other URLs as requests for static assets
such as JavaScript, image, and style files.

单独的 `app.use()` 会处理所有其它 URL，比如对 JavaScript 、图片和样式表等静态资源的请求。

To ensure that clients can only download the files that they are permitted to see, put all client-facing asset files in the `/dist` folder and only honor requests for files from the `/dist` folder.

要保证客户端只能下载那些*允许*他们访问的文件，你应该把所有面向客户端的资源文件都放在 `/dist` 目录下，并且只允许客户端请求来自 `/dist` 目录下的文件。

The following Node Express code routes all remaining requests to `/dist`, and returns a `404 - NOT FOUND` error if the file isn't found.

下列 Express 代码会把剩下的所有请求都路由到 `/dist` 目录下，如果文件未找到，就会返回 `404 - NOT FOUND`。

<code-example path="universal/server.ts" header="server.ts (static files)" region="static" linenums="false">
</code-example>


### Universal in action

### Universal 实战

Open a browser to http://localhost:4000/.
You should see the familiar Tour of Heroes dashboard page.

打开浏览器，访问 http://localhost:4000/。
你会看到熟悉的《英雄指南》仪表盘页。

Navigation via `routerLinks` works correctly.
You can go from the Dashboard to the Heroes page and back.
You can click a hero on the Dashboard page to display its Details page.

通过 `routerLinks` 进行导航可以正常工作了。
你可以从仪表盘前往英雄列表页，也可以返回。
也可以点击仪表盘页面上的一位英雄，并显示器详情页。

Notice, however, that clicks, mouse-moves, and keyboard entries are inert.

但要注意，点击、鼠标移动和键盘操作都是不行的。

* Clicking a hero on the Heroes page does nothing.

   点击英雄列表页中的英雄没反应。

* You can't add or delete a hero.

   你也不能添加或删除英雄。

* The search box on the Dashboard page is ignored.

   仪表盘页面上的搜索框不理你。

* The *Back* and *Save* buttons on the Details page don't work.

   详情页中的 *Back* 和 *Save* 按钮也没反应。

User events other than `routerLink` clicks aren't supported.
You must wait for the full client app to arrive.
It won't arrive until you compile the client app
and move the output into the `dist/` folder.

除了点击 `RouterLink` 之外的用户事件都不支持。你必须等待完整的客户端应用就绪。
直到你编译出了客户端应用，并把它们的输出移到 `dist/` 目录下之后，这个客户端应用才会就绪。

The transition from the server-rendered app to the client app happens quickly on a development machine.
You can simulate a slower network to see the transition more clearly and
better appreciate the launch-speed advantage of a Universal app running on a low-powered, poorly connected device.

在开发机上，从服务端渲染应用到客户端应用的转换完成的太快了。
你可以模拟一个慢速网络，来把这个转换过程看得更清楚一点，以便更好地欣赏在性能低、网络烂的设备上 Universal 应用的启动速度优势。

Open the Chrome Dev Tools and go to the Network tab.
Find the [Network Throttling](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling) dropdown on the far right of the menu bar.

打开 Chrome 开发工具，并打开 Network 页。
在菜单栏的最右侧找到 [Network Throttling（网络限流）](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling) 下拉框。

Try one of the "3G" speeds.
The server-rendered app still launches quickly but the full client app may take seconds to load.

随便试一个 “3G” 速度。
服务端渲染的应用将会立即启动，不过加载完整的客户端应用可能要花几秒钟。
