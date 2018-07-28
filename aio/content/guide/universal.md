# Angular Universal: server-side rendering

# Angular Universal：服务端渲染

This guide describes **Angular Universal**, a technology that runs your Angular application on the server.

本指南讲的是**Angular Universal（统一平台）**，一项在服务端运行 Angular 应用的技术。

A normal Angular application executes in the _browser_, rendering pages in the DOM in response to user actions.

标准的 Angular 应用会运行在*浏览器*中，它会在 DOM 中渲染页面，以响应用户的操作。

**Angular Universal** generates _static_ application pages on the _server_
through a process called **server-side rendering (SSR)**.

而**Angular Universal** 会在*服务端*通过一个名叫**服务端渲染（server-side rendering - SSR）的过程**生成*静态*的应用页面。

It can generate and serve those pages in response to requests from browsers.
It can also pre-generate pages as HTML files that you serve later.

它可以生成这些页面，并在浏览器请求时直接用它们给出响应。
也可以把页面预先生成为 HTML 文件，然后把它们作为静态文件供服务器使用。

This guide describes a Universal sample application that launches quickly as a server-rendered page.
Meanwhile, the browser downloads the full client version and switches to it automatically after the code loads.

本指南讲的是一个 Universal 的范例应用，它启动得和在服务端渲染好的页面一样快。
稍后，浏览器就会下载完整的客户端版本，并在代码加载完之后自动切换过去。

<div class="alert is-helpful">

[Download the finished sample code](generated/zips/universal/universal.zip),
which runs in a [Node.js® Express](https://expressjs.com/) server.

你可以[下载最终的范例代码](generated/zips/universal/universal.zip)，并将其运行在一个 [Node.js® Express](https://expressjs.com/) 服务器中。

</div>

{@a why-do-it}

### Why Universal

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

#### Facilitate web crawlers

#### 帮助网络爬虫

Google, Bing, Facebook, Twitter and other social media sites rely on web crawlers to index your application content and make that content searchable on the web.

Google、Bing、Facebook、Twitter 和其它社交媒体网站都依赖网络爬虫去索引你的应用内容，并且让它的内容可以通过网络搜索到。

These web crawlers may be unable to navigate and index your highly-interactive, Angular application as a human user could do.

这些网络爬虫可能不会像人类那样导航到你的具有高度交互性的 Angular 应用，并为其建立索引。

Angular Universal can generate a static version of your app that is easily searchable, linkable, and navigable without JavaScript.
It also makes a site preview available since each URL returns a fully-rendered page.

Angular Universal 可以为你生成应用的静态版本，它易搜索、可链接，浏览时也不必借助 JavaScript。
它也让站点可以被预览，因为每个 URL 返回的都是一个完全渲染好的页面。

Enabling web crawlers is often referred to as
[Search Engine Optimization (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf).

启用对网络爬虫的支持通常也称作[搜索引擎优化 (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)。

{@a no-javascript}

#### Performance on mobile and low performance devices

#### 提升手机和低功耗设备上的性能

Some devices don't support JavaScript or execute JavaScript so poorly that the user experience is unacceptable.
For these cases, you may require a server-rendered, no-JavaScript version of the app.
This version, however limited, may be the only practical alternative for
people who otherwise would not be able to use the app at all.

有些设备不支持 JavaScript 或 JavaScript 执行得很差，导致用户体验不可接受。
对于这些情况，你可能会需要该应用的服务端渲染的、无 JavaScript 的版本。
虽然有一些限制，不过这个版本可能是那些完全没办法使用该应用的人的唯一选择。

{@a startup-performance}

#### Show the first page quickly

#### 快速显示第一页

Displaying the first page quickly can be critical for user engagement.

快速显示第一页对于吸引用户是至关重要的。

[53% of mobile site visits are abandoned](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) if pages take longer than 3 seconds to load.
Your app may have to launch faster to engage these users before they decide to do something else.

如果页面加载超过了三秒钟，那么 [53% 的移动网站会被放弃](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)。
你的应用要启动得更快一点，以便在用户决定做别的事情之前吸引他们的注意力。

With Angular Universal, you can generate landing pages for the app that look like the complete app.
The pages are pure HTML, and can display even if JavaScript is disabled.
The pages do not handle browser events, but they _do_ support navigation through the site using [routerLink](guide/router.html#router-link).

使用 Angular Universal，你可以为应用生成“着陆页”，它们看起来就和完整的应用一样。
这些着陆页是纯 HTML，并且即使 JavaScript 被禁用了也能显示。
这些页面不会处理浏览器事件，不过它们*可以*用 [routerLink](guide/router.html#router-link) 在这个网站中导航。

In practice, you'll serve a static version of the landing page to hold the user's attention.
At the same time, you'll load the full Angular app behind it in the manner [explained below](#transition).
The user perceives near-instant performance from the landing page
and gets the full interactive experience after the full app loads.

在实践中，你可能要使用一个着陆页的静态版本来保持用户的注意力。
同时，你也会在幕后加载完整的 Angular 应用，就像[稍后解释的那样](#transition)。
用户会觉得着陆页几乎是立即出现的，而当完整的应用加载完之后，又可以获得完整的交互体验。

{@a how-does-it-work}

### How it works

### 工作原理

To make a Universal app, you install the `platform-server` package.
The `platform-server` package has server implementations of the DOM, `XMLHttpRequest`, and other low-level features that do not rely on a browser.

要制作一个 Universal 应用，就要安装 `platform-server` 包。
`platform-server` 包提供了服务端的 DOM 实现、`XMLHttpRequest` 和其它底层特性，但不再依赖浏览器。

You compile the client application with the `platform-server` module instead of the `platform-browser` module.
and run the resulting Universal app on a web server.

你要使用 `platform-server` 模块而不是 `platform-browser` 模块来编译这个客户端应用，并且在一个 Web 服务器上运行这个 Universal 应用。

The server (a [Node Express](https://expressjs.com/) server in _this_ guide's example)
passes client requests for application pages to Universal's `renderModuleFactory` function.

服务器（这个例子中使用的是 [Node Express](https://expressjs.com/) 服务器）会把客户端对应用页面的请求传给 `renderModuleFactory` 函数。

The `renderModuleFactory` function takes as inputs a *template* HTML page (usually `index.html`),
an Angular *module* containing components,
and a *route* that determines which components to display.

`renderModuleFactory` 函数接受一个*模板* HTML 页面（通常是 `index.html`）、一个包含组件的 Angular *模块*和一个用于决定该显示哪些组件的*路由*作为输入。

The route comes from the client's request to the server.
Each request results in the appropriate view for the requested route.

该路由从客户端的请求中传给服务器。
每次请求都会给出所请求路由的一个适当的视图。

The `renderModuleFactory` renders that view within the `<app>` tag of the template, creating a finished HTML page for the client.

`renderModuleFactory` 在模板中的 `<app>` 标记中渲染出哪个视图，并为客户端创建一个完成的 HTML 页面。

Finally, the server returns the rendered page to the client.

最后，服务器就会把渲染好的页面返回给客户端。

### Working around the browser APIs

### 使用浏览器 API

Because a Universal `platform-server` app doesn't execute in the browser, you may have to work around some of the browser APIs and capabilities that are missing on the server.

由于 Universal 的 `platform-server` 应用并没有运行在浏览器中，因此那些与浏览器 API 有关的工作都没法在这个服务器中使用。

You won't be able reference browser-only native objects such as `window`, `document`, `navigator` or `location`.
If you don't need them on the server-rendered page, side-step them with conditional logic.

你不能引用浏览器独有的原生对象，比如 `window`、`document`、`navigator` 或 `location`。
如果你在服务端渲染的页面中不需要它们，就可以使用条件逻辑跳过它们。

Alternatively, look for an injectable Angular abstraction over the object you need such as `Location` or `Document`;
it may substitute adequately for the specific API that you're calling.
If Angular doesn't provide it, you may be able to write your own abstraction that delegates to the browser API while in the browser and to a satisfactory alternative implementation while on the server.

另一种方式是查找一个可注入的 Angular 对所需对象的抽象服务，比如 `Location` 或 `Document`，它可能作为你调用的指定 API 的等价替身。
如果 Angular 没有提供它，你也可以写一个自己的抽象层，当在浏览器中运行时，就把它委托给浏览器 API，挡在服务器中运行时，就提供一个符合要求的代用实现。

Without mouse or keyboard events, a universal app can't rely on a user clicking a button to show a component.
A universal app should determine what to render based solely on the incoming client request.
This is a good argument for making the app [routeable](guide/router).

由于没有鼠标或键盘事件，因此 Universal 应用也不能依赖于用户点击某个按钮来显示每个组件。
Universal 应用应该仅仅根据客户端过来的请求决定要渲染的内容。
把该应用做成[可路由的](guide/router)，就是一种好方案。

Because the user of a server-rendered page can't do much more than click links,
you should [swap in the real client app](#transition) as quickly as possible for a proper interactive experience.

由于服务端渲染页面的用户只能点击链接，所以你应该尽快让它[切换到真正的客户端应用](#transition)，以提供正常的交互体验。

{@a the-example}

## The example

## 例子

The _Tour of Heroes_ tutorial is the foundation for the Universal sample described in this guide.

《英雄指南》教程是本章所讲的 Universal 范例的基础。

The core application files are mostly untouched, with a few exceptions described below.
You'll add more files to support building and serving with Universal.

除了下面讲的少量修改之外，应用中的核心文件几乎不用动。
你只需要添加一些额外的文件来支持使用 Universal 进行构建和提供服务。

In this example, the Angular CLI compiles and bundles the Universal version of the app with the
[AOT (Ahead-of-Time) compiler](guide/aot-compiler).
A Node.js® Express web server turns client requests into the HTML pages rendered by Universal.

在这个例子中，Angular CLI 会使用 [AOT (预先) 编译器](guide/aot-compiler)对该应用的 Universal 版本进行编译和打包。
Node.js® 的 Express Web 服务器会把客户端请求转换成由 Universal 渲染出的页面。

You will create:

你将会创建：

 * a server-side app module, `app.server.module.ts`

    一个服务端的 app 模块 `app.server.module.ts`

 * an entry point for the server-side, `main.server.ts`

    一个服务端的入口点 `main.server.ts`

 * an express web server to handle requests, `server.ts`

    一个用于处理请求的 express Web 服务器

 * a TypeScript config file, `tsconfig.server.json`

    一个 TypeScript 配置文件 `tsconfig.server.json`

 * a Webpack config file for the server, `webpack.server.config.js`

    一个供服务器使用的 Webpack 配置文件 `webpack.server.config.js`

When you're done, the folder structure will look like this:

当做完这些后，文件夹的结构是这样的：

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
webpack.server.config.js     <t><i>* Webpack server configuration</i></t><t>* Webpack 的服务端配置</t>
</code-example>

The files marked with `*` are new and not in the original tutorial sample.
This guide covers them in the sections below.

那些标有 `*` 的文件都是新的，而不是来自原来的范例应用。
本文稍后的部分会涉及它们。

{@a preparation}

## Preparation

## 准备工作

Download the [Tour of Heroes](generated/zips/toh-pt6/toh-pt6.zip) project and install the dependencies from it.

下载[《英雄指南》](generated/zips/toh-pt6/toh-pt6.zip)项目，并为它安装依赖。

{@a install-the-tools}

### Install the tools

### 安装工具

To get started, install these packages.

在开始之前，要安装下列包。

 * `@angular/platform-server` - Universal server-side components.

    `@angular/platform-server` - Universal 的服务端元件。

 * `@nguniversal/module-map-ngfactory-loader` - For handling lazy-loading in the context of a server-render.

    `@nguniversal/module-map-ngfactory-loader` - 用于处理服务端渲染环境下的惰性加载。

 * `@nguniversal/express-engine` - An express engine for Universal applications.

    `@nguniversal/express-engine` - Universal 应用的 Express 引擎。

 * `ts-loader` - To transpile the server application

    `ts-loader` - 用于对服务端应用进行转译。

Install them with the following commands:

使用下列命令安装它们：

<code-example format="." language="bash">
npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine
</code-example>

{@a transition}

## Modify the client app

### 修改客户端应用

A Universal app can act as a dynamic, content-rich "splash screen" that engages the user.
It gives the appearance of a near-instant application.

Universal 应用可以扮演一个动态的、内容丰富的 “封面页”，以吸引用户。
它能让应用看上去几乎是立即呈现出来的。

Meanwhile, the browser downloads the client app scripts in background.
Once loaded, Angular transitions from the static server-rendered page to the dynamically rendered views of the interactive client app.

同时，浏览器会在后台下载客户端应用的脚本。
一旦加载完毕，Angular 就会从静态的服务端渲染的页面无缝转换成动态渲染的可交互的客户端应用。

You must make a few changes to your application code to support both server-side rendering and the transition to the client app.

你要对应用代码做少量修改，以支持服务端渲染，并无缝转换成客户端应用。

{@a root-app-module}

### The root `AppModule`

### 根模块 `AppModule`

Open file `src/app/app.module.ts` and find the `BrowserModule` import in the `NgModule` metadata.
Replace that import with this one:

打开 `src/app/app.module.ts` 文件，并在 `NgModule` 的元数据中找到对 `BrowserModule` 的导入。
把该导入改成这样:

<code-example path="universal/src/app/app.module.ts" region="browsermodule" title="src/app/app.module.ts (withServerTransition)">
</code-example>

Angular adds the `appId` value (which can be _any_ string) to the style-names of the server-rendered pages,
so that they can be identified and removed when the client app starts.

Angular 会把 `appId` 值（它可以是*任何*字符串）添加到服务端渲染页面的样式名中，以便在客户端应用启动时可以找到并移除它们。

You can get runtime information about the current platform and the `appId` by injection.

你可以通过依赖注入取得关于当前平台和 `appId` 的运行时信息。

<code-example path="universal/src/app/app.module.ts" region="platform-detection" title="src/app/app.module.ts (platform detection)">
</code-example>

{@a cli-output}

### Build Destination

A Universal app is distributed in two parts: the server-side code that serves up the initial application, and the client-side code that's loaded in dynamically.

The Angular CLI outputs the client-side code in the `dist` directory by default, so you modify the `outputPath` for the __build__ target in the `angular.json` to keep the client-side build outputs separate from the server-side code. The client-side build output will be served by the Express server.

```
...
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "outputPath": "dist/browser",
    ...
  }
}
...
```

{@a http-urls}

### Absolute HTTP URLs

#### 在 HTTP 中使用绝对地址

The tutorial's `HeroService` and `HeroSearchService` delegate to the Angular `HttpClient` module to fetch application data.
These services send requests to _relative_ URLs such as `api/heroes`.

教程中的 `HeroService` 和 `HeroSearchService` 都委托了 Angular 的 `HttpClient` 模块来获取应用数据。
那些服务都把请求发送到了*相对* URL，比如 `api/heroes`。

In a Universal app, HTTP URLs must be _absolute_, for example, `https://my-server.com/api/heroes`
even when the Universal web server is capable of handling those requests.

在 Universal 应用中，HTTP 的 URL 必须是*绝对地址*（比如 `https://my-server.com/api/heroes`），
只有这样，Universal 的 Web 服务器才能处理那些请求。

You'll have to change the services to make requests with absolute URLs when running on the server
and with relative URLs when running in the browser.

你还要修改这些需要发起请求的服务，当它运行在服务端时使用绝对地址，运行在浏览器中时用相对地址。

One solution is to provide the server's runtime origin under the Angular [`APP_BASE_HREF` token](api/common/APP_BASE_HREF),
inject it into the service, and prepend the origin to the request URL.

解决方案之一是通过 Angular 的 [`APP_BASE_HREF` 令牌](api/common/APP_BASE_HREF)来提供服务器的源地址（origin），把它注入到服务中，并把这个源地址添加到所请求的 URL 之前。

Start by changing the `HeroService` constructor to take a second `origin` parameter that is optionally injected via the `APP_BASE_HREF` token.

先为 `HeroService` 的构造函数添加第二个 `origin` 参数，它是可选的，并通过 `APP_BASE_HREF` 令牌进行注入。

<code-example path="universal/src/app/hero.service.ts" region="ctor" title="src/app/hero.service.ts (constructor with optional origin)">
</code-example>

Note how the constructor prepends the origin (if it exists) to the `heroesUrl`.

注意，这个构造函数是如何把这个 `origin`（如果存在）添加到 `heroesUrl` 的前面的。

You don't provide `APP_BASE_HREF` in the browser version, so the `heroesUrl` remains relative.

在浏览器版本中，你不用提供 `APP_BASE_HREF`，因此 `heroesUrl` 仍然是相对的。

<div class="alert is-helpful">

You can ignore `APP_BASE_HREF` in the browser if you've specified `<base href="/">` in the `index.html`
to satisfy the router's need for a base address, as the tutorial sample does.

如果你在 `index.html` 中为了满足路由器的需求已经指定过了 `<base href="/">`，那就可以在浏览器中忽略 `APP_BASE_HREF`。参见教程的例子。

</div>

{@a server-code}

## Server code

## 服务端代码

To run an Angular Universal application, you'll need a server that accepts client requests and returns rendered pages.

要想运行 Angular 的 Universal 应用，你需要一个服务器，用它来接受客户端的请求，并返回渲染好的页面。

{@a app-server-module}

### App server module

### 服务端应用模块

The app server module class (conventionally named `AppServerModule`) is an Angular module that wraps the application's root module (`AppModule`) so that Universal can mediate between your application and the server.
`AppServerModule` also tells Angular how to bootstrap your application when running as a Universal app.

服务端应用模块（习惯上叫作 `AppServerModule`）是一个 Angular 模块，它包装了应用的根模块 `AppModule`，以便 Universal 可以在你的应用和服务器之间进行协调。
`AppServerModule` 还会告诉 Angular 在把你的应用以 Universal 方式运行时，该如何引导它。

Create an `app.server.module.ts` file in the `src/app/` directory with the following `AppServerModule` code:

在 `src/app/` 目录下创建 `app.server.module.ts` 文件，代码如下：

<code-example path="universal/src/app/app.server.module.ts" title="src/app/app.server.module.ts">
</code-example>

Notice that it imports first the client app's `AppModule`, the Angular Universal's `ServerModule` and the `ModuleMapLoaderModule`.

注意它首先导入了客户端应用的 `AppModule` 和来自 Angular Universal 的 `ServerModule`、`ModuleMapLoaderModule`。

The `ModuleMapLoaderModule` is a server-side module that allows lazy-loading of routes.

`ModuleMapLoaderModule` 是一个服务端模块，用于实现路由的惰性加载。

This is also the place to register providers that are specific to running your app under Universal.

这里还可以注册那些在 Universal 环境下运行应用时特有的服务提供商。

{@a app-server-entry-point}

### App server entry point

### 应用服务器的入口点

The `Angular CLI` uses the `AppServerModule` to build the server-side bundle.

Angular CLI 使用 `AppServerModule` 来构建服务端发布包。

Create a `main.server.ts` file in the `src/` directory that exports the `AppServerModule`:

在 `src/` 目录下创建一个 `main.server.ts` 文件，并导出 `AppServerModule`：

<code-example path="universal/src/main.server.ts" title="src/main.server.ts">
</code-example>

The `main.server.ts` will be referenced later to add a `server` target to the `Angular CLI` configuration.

稍后，这个 `main.server.ts` 文件将会被引用，以便往 Angular CLI 的配置中添加一个名为 `server` 的目标（target）。

{@a web-server}

### Universal web server

### Universal Web 服务器

A _Universal_ web server responds to application _page_ requests with static HTML rendered by the [Universal template engine](#universal-engine).

*Universal* Web 服务器负责响应对本应用的*页面*请求。它使用的是由 [Universal 模板引擎](#universal-engine)渲染出的 HTML。

It receives and responds to HTTP requests from clients (usually browsers).
It serves static assets such as scripts, css, and images.
It may respond to data requests, perhaps directly or as a proxy to a separate data server.

它接受并响应来自客户端（通常是浏览器）的 HTTP 请求。
它还会提供那些静态文件，比如脚本、css 和图片。
它还可以响应数据请求，可能直接响应也可能将其代理到一个独立的数据服务器。

The sample web server for _this_ guide is based on the popular [Express](https://expressjs.com/) framework.

本文中的范例 Web 服务器基于常见的 [Express](https://expressjs.com/) 框架。

<div class="alert is-helpful">

  _Any_ web server technology can serve a Universal app as long as it can call Universal's `renderModuleFactory`.
  The principles and decision points discussed below apply to any web server technology that you chose.

  *任何* Web 服务器技术都可以作为 Universal 应用的服务器，只要它能调用 Universal 的 `renderModuleFactory` 即可。
  下面讨论的这些原则和决策要点适用于你选择的任何 Web 服务器技术。

</div>

Create a `server.ts` file in the root directory and add the following code:

在根目录下创建 `server.ts` 文件，并添加下列代码：

<code-example path="universal/server.ts" title="server.ts">
</code-example>

<div class="alert is-critical">

  **This sample server is not secure!**
  Be sure to add middleware to authenticate and authorize users
  just as you would for a normal Angular application server.

  **这个范例服务器是不安全的！**
  如果你要把它作为正式的 Angular 应用服务器，别忘了添加中间件来对用户进行认证和授权。

</div>

{@a universal-engine}

#### Universal template engine

#### Universal 模板引擎

The important bit in this file is the `ngExpressEngine` function:

这个文件中最重要的部分是 `ngExpressEngine` 函数：

<code-example path="universal/server.ts" title="server.ts" region="ngExpressEngine">
</code-example>

The `ngExpressEngine` is a wrapper around the universal's `renderModuleFactory` function that turns a client's requests into server-rendered HTML pages.
You'll call that function within a _template engine_ that's appropriate for your server stack.

`ngExpressEngine` 是对 Universal 的 `renderModuleFactory` 函数的封装。它会把客户端请求转换成服务端渲染的 HTML 页面。
你还要在某个适用于你服务端技术栈的*模板引擎*中调用这个函数。

The first parameter is the `AppServerModule` that you wrote [earlier](#app-server-module).
It's the bridge between the Universal server-side renderer and your application.

第一个参数是你[以前](#app-server-module)写过的 `AppServerModule`。
它是 Universal 服务端渲染器和你的应用之间的桥梁。

The second parameter is the `extraProviders`. It is an optional Angular dependency injection providers, applicable when running on this server.

第二个参数是 `extraProviders`。它是在这个服务器上运行时才需要的一些可选的 Angular 依赖注入提供商。

{@a provide-origin}

You supply `extraProviders` when your app needs information that can only be determined by the currently running server instance.

当你的应用需要那些只有当运行在服务器实例中才需要的信息时，就要提供 `extraProviders` 参数。

The required information in this case is the running server's origin, provided under the `APP_BASE_HREF` token, so that the app can [calculate absolute HTTP URLs](#http-urls).

这里所需的信息就是正在运行的服务器的源地址，它通过 `APP_BASE_HREF` 令牌提供，以便应用可以 [计算出 HTTP URL 的绝对地址](#http-urls)。

The `ngExpressEngine` function returns a _promise_ that resolves to the rendered page.

`ngExpressEngine` 函数返回了一个会解析成渲染好的页面的*承诺（Promise）*。

It's up to your engine to decide what to do with that page.
_This engine's_ promise callback returns the rendered page to the [web server](#web-server),
which then forwards it to the client in the HTTP response.

接下来你的引擎要决定拿这个页面做点什么。
*现在这个引擎*的回调函数中，把渲染好的页面返回给了 [Web 服务器](#web-server)，然后服务器通过 HTTP 响应把它转发给了客户端。

<div class="alert is-helpful">

  This wrappers are very useful to hide the complexity of the `renderModuleFactory`. There are more wrappers for different backend technologies
  at the [Universal repository](https://github.com/angular/universal).

  这个包装器对于隐藏 `renderModuleFactory` 的复杂性非常有帮助。
  在 [Universal 代码库中](https://github.com/angular/universal)还有更多针对其它后端技术的包装器。

</div>

#### Filter request URLs

#### 过滤请求的 URL

The web server must distinguish _app page requests_ from other kinds of requests.

Web 服务器必须把*对应用页面的请求*和其它类型的请求区分开。

It's not as simple as intercepting a request to the root address `/`.
The browser could ask for one of the application routes such as `/dashboard`, `/heroes`, or `/detail:12`.
In fact, if the app were _only_ rendered by the server, _every_ app link clicked would arrive at the server
as a navigation URL intended for the router.

这可不像拦截对根路径 `/` 的请求那么简单。
浏览器可以请求应用中的任何一个路由地址，比如 `/dashboard`、`/heroes` 或 `/detail:12`。
事实上，如果应用*只*会通过服务器渲染，那么应用中点击的*任何一个*链接都会发到服务器，就像导航时的地址会发到路由器一样。

Fortunately, application routes have something in common: their URLs lack file extensions.

幸运的是，应用的路由具有一些共同特征：它们的 URL 一般不带文件扩展名。

Data requests also lack extensions but they're easy to recognize because they always begin with `/api`.

数据请求也可能不带扩展名，不过他们很容易识别出来，因为它们总是用 `/api` 开头。

All static asset requests have a file extension (e.g., `main.js` or `/node_modules/zone.js/dist/zone.js`).

所有静态资源请求都具有一个扩展名（比如 `main.js` 或 `/node_modules/zone.js/dist/zone.js`）。

So we can easily recognize the three types of requests and handle them differently.

所以，我们很容易识别出这三种类型的请求，并用不同的方式处理它们。

1. data request -  request URL that begins `/api`

   数据请求 - 请求的 URL 用 `/api` 开头

2. app navigation - request URL with no file extension

   应用导航 - 请求的 URL 不带扩展名

3. static asset - all other requests.

   静态资源 - 所有其它请求。

An Express server is a pipeline of middleware that filters and processes URL requests one after the other.

Express 服务器是一系列中间件构成的管道，它会挨个对 URL 请求进行过滤和处理。

You configure the Express server pipeline with calls to `app.get()` like this one for data requests.

你通过通过调用 `app.get()` 来配置 Express 服务器的管道，就像下面这个数据请求一样：

<code-example path="universal/server.ts" title="server.ts (data URL)" region="data-request" linenums="false">
</code-example>

<div class="alert is-helpful">

This sample server doesn't handle data requests.

这个范例服务器并没有处理数据请求。

The tutorial's "in-memory web api" module, a demo and development tool, intercepts all HTTP calls and
simulates the behavior of a remote data server.
In practice, you would remove that module and register your web api middleware on the server here.

本教程的“内存 Web API” 模块（一个演示及开发工具）拦截了所有 HTTP 调用，并且模拟了远端数据服务器的行为。
在实践中，你应该移除这个模块，并且在服务器上注册你的 Web API 中间件。

</div>

<div class="alert is-critical">

**Universal HTTP requests have different security requirements**

**Universal HTTP 请求具有不同的安全需求**

HTTP requests issued from a browser app are not the same as when issued by the universal app on the server.

从浏览器的应用中发起 HTTP 请求和从服务器的 Universal 应用中发起请求是不一样的。

When a browser makes an HTTP request, the server can make assumptions about cookies, XSRF headers, etc.

当浏览器发起 HTTP 请求时，服务器可以假设存在 Cookie、XSRF 头等等。

For example, the browser automatically sends auth cookies for the current user.
Angular Universal cannot forward these credentials to a separate data server.
If your server handles HTTP requests, you'll have to add your own security plumbing.

比如，浏览器会自动发送当前用户的认证 Cookie。
但 Angular Universal 不能把这些凭证发送给独立的数据服务器。
如果你的服务器要处理 HTTP 请求，你就得自行添加安全装置。

</div>

The following code filters for request URLs with no extensions and treats them as navigation requests.

下列代码会过滤出不带扩展名的 URL，并把它们当做导航请求进行处理。

<code-example path="universal/server.ts" title="server.ts (navigation)" region="navigation-request" linenums="false">
</code-example>

#### Serve static files safely

#### 安全的提供静态文件

A single `app.use()` treats all other URLs as requests for static assets
such as JavaScript, image, and style files.

单独的 `app.use()` 会处理所有其它 URL，比如对 JavaScript 、图片和样式表等静态资源的请求。

To ensure that clients can only download the files that they are _permitted_ to see, you will [put all client-facing asset files in the `/dist` folder](#universal-webpack-configuration)
and will only honor requests for files from the `/dist` folder.

要保证客户端只能下载那些*允许*他们访问的文件，你应该[把所有面向客户端的资源文件都放在 `/dist` 目录下](#universal-webpack-configuration)，并且只允许客户端请求来自 `/dist` 目录下的文件。

The following express code routes all remaining requests to `/dist`; it returns a `404 - NOT FOUND` if the file is not found.

下列 Express 代码会把剩下的所有请求都路由到 `/dist` 目录下，如果文件未找到，就会返回 `404 - NOT FOUND`。

<code-example path="universal/server.ts" title="server.ts (static files)" region="static" linenums="false">
</code-example>

{@a universal-configuration}

## Configure for Universal

## 配置 Universal

The server application requires its own build configuration.

这个服务端应用需要自己的构建配置。

{@a universal-typescript-configuration}

### Universal TypeScript configuration

### Universal 的 TypeScript 配置

Create a `tsconfig.server.json` file in the project root directory to configure TypeScript and AOT compilation of the universal app.

在项目的根目录下创建一个 `tsconfig.server.json` 文件来配置 TypeScript 和这个 Universal 应用的 AOT 编译选项。

<code-example path="universal/src/tsconfig.server.json" title="src/tsconfig.server.json">
</code-example>

This config extends from the root's `tsconfig.json` file. Certain settings are noteworthy for their differences.

这个配置扩展了根目录下的 `tsconfig.json` 文件，注意它们在某些设置上的差异。

* The `module` property must be **commonjs** which can be required into our server application.

   `module` 属性必须是 **commonjs**，这样它才能被 `require()` 进你的服务端应用。

* The `angularCompilerOptions` section guides the AOT compiler:

   `angularCompilerOptions` 部分有一些面向 AOT 编译器的选项：

  * `entryModule` - the root module of the server application, expressed as `path/to/file#ClassName`.

     `entryModule` - 服务端应用的根模块，其格式为 `path/to/file#ClassName`。

{@a universal-webpack-configuration}

### Universal Webpack configuration

### Universal 的 Webpack 配置

Universal applications doesn't need any extra Webpack configuration, the CLI takes care of that for you,
but since the server is a typescript application, you will use Webpack to transpile it.

Universal 应用不需要任何额外的 Webpack 配置，CLI 会帮你处理它们，但是由于这个服务器是 TypeScript 应用，所以你要使用 Webpack 来转译它。

Create a `webpack.server.config.js` file in the project root directory with the following code.

在项目的根目录下创建一个 `webpack.server.config.js` 文件，代码如下：

<code-example path="universal/webpack.server.config.js" title="webpack.server.config.js">
</code-example>

**Webpack configuration** is a rich topic beyond the scope of this guide.

**Webpack** 配置超出了本文的讨论范围。

{@a universal-cli-configuration}

### Angular CLI configuration

### Angular CLI 配置

The CLI provides builders for different types of __targets__. Commonly known targets such as `build` and `serve` already exist in the `angular.json` configuration. To target a server-side build, add a `server` target to the `architect` configuration object.

CLI 提供了针对不同**目标**的构建器。常见的目标，如 `build` 和 `serve` 都已经存在于 `angular.json` 的配置中了。要指定一个服务端渲染的构建，请在 `architect` 配置对象中添加一个 `server` 目标。

* The `outputPath` tells where the resulting build will be created.

   `outputPath` 表明要把构建结果放到哪里。

* The `main` provides the main entry point to the previously created `main.server.ts`

   `main` 提供了主入口点，指向前面创建的 `main.server.ts`。

* The `tsConfig` uses the `tsconfig.server.json` as configuration for the TypeScript and AOT compilation.

   `tsConfig` 表明要用 `tsconfig.server.json` 作为供 TypeScript 和 AOT 编译器使用的配置。

```
"architect": {
  ...
  "server": {
    "builder": "@angular-devkit/build-angular:server",
    "options": {
      "outputPath": "dist/server",
      "main": "src/main.server.ts",
      "tsConfig": "src/tsconfig.server.json"
    }
  }
  ...
}
```

## Build and run with universal

## 使用 Universal 构建和运行

Now that you've created the TypeScript and Webpack config files and configured the Angular CLI, you can build and run the Universal application.

现在，你已经创建了 TypeScript 和 Webpack 的配置文件并配置好了 Angular CLI，可以构建并运行这个 Universal 应用了。

First add the _build_ and _serve_ commands to the `scripts` section of the `package.json`:

```
"scripts": {
    ...
    "build:ssr": "npm run build:client-and-server-bundles && npm run webpack:server",
    "serve:ssr": "node dist/server",
    "build:client-and-server-bundles": "ng build --prod && ng run angular.io-example:server",
    "webpack:server": "webpack --config webpack.server.config.js --progress --colors"
    ...
}
```

{@a build}

#### Build

#### 构建

From the command prompt, type

在命令行提示中输入

<code-example format="." language="bash">
npm run build:ssr
</code-example>

The Angular CLI compiles and bundles the universal app into two different folders, `browser` and `server`.
Webpack transpiles the `server.ts` file into Javascript.

Angular CLI 就会把这个 Universal 应用编译进两个目录：`browser` 和 `server`。
Webpack 会把 `server.ts` 文件转译成 JavaScript。

{@a serve}

#### Serve

#### 启动服务器

After building the application, start the server.

构建完应用之后，启动服务器。

<code-example format="." language="bash">
npm run serve:ssr
</code-example>

The console window should say

在控制台窗口中应该看到

<code-example format="." language="bash">
Node server listening on http://localhost:4000
</code-example>

## Universal in action

## Universal 实战

Open a browser to http://localhost:4000/.
You should see the familiar Tour of Heroes dashboard page.

打开浏览器，访问 http://localhost:4000/。
你会看到熟悉的《英雄指南》仪表盘页。

Navigation via `routerLinks` works correctly.
You can go from the Dashboard to the Heroes page and back.
You can click on a hero on the Dashboard page to display its Details page.

通过 `routerLink` 能进行正常导航。
你可以从仪表盘导航到英雄列表页，还可以返回。
你可以在仪表盘页点击一个英雄，以显示他的详情页。

But clicks, mouse-moves, and keyboard entries are inert.

但是点击、鼠标移动和键盘操作都不行。

* Clicking a hero on the Heroes page does nothing.

   点击英雄列表页中的英雄没反应。

* You can't add or delete a hero.

   你也不能添加或删除英雄。

* The search box on the Dashboard page is ignored.

   仪表盘页面上的搜索框不理你。

* The _back_ and _save_ buttons on the Details page don't work.

   详情页中的 *Back* 和 *Save* 按钮也没反应。

User events other than `routerLink` clicks aren't supported.
The user must wait for the full client app to arrive.

除了点击 `RouterLink` 之外的用户事件都不支持。用户必须等待完整的客户端应用就绪。

It will never arrive until you compile the client app
and move the output into the `dist/` folder,
a step you'll take in just a moment.

直到你编译出客户端应用，并把它们的输出移到 `dist/` 目录下，这个客户端应用才会就绪。
你自己稍微花点时间完成这步就可以了。

## Throttling

## 限流

The transition from the server-rendered app to the client app happens quickly on a development machine.
You can simulate a slower network to see the transition more clearly and
better appreciate the launch-speed advantage of a universal app running on a low powered, poorly connected device.

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

{@a summary}

## Summary

## 小结

This guide showed you how to take an existing Angular application and make it into a Universal app that does server-side rendering.
It also explained some of the key reasons for doing so.

本文为你演示了如何把一个现有 Angular 应用转换成支持服务端渲染的 Universal 应用。
还解释了为何要这么做的一些关键原因。

 - Facilitate web crawlers (SEO)

    帮助网络爬虫（SEO）

 - Support low-bandwidth or low-power devices

    支持低带宽或低功耗设备

 - Fast first page load

    快速加载首屏

Angular Universal can greatly improve the perceived startup performance of your app.
The slower the network, the more advantageous it becomes to have Universal display the first page to the user.

Angular Universal 可以大幅提升应用的启动性能观感。
在越是慢速的网络下，使用 Universal 来为用户展现首屏就越能体现出更大的优势。
