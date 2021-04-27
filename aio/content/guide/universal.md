# Server-side rendering (SSR) with Angular Universal

# Angular Universal：Angular 统一平台简介

This guide describes **Angular Universal**, a technology that renders Angular applications on the server.

本指南讲的是**Angular Universal（统一平台）**，一项在服务端运行 Angular 应用的技术。

A normal Angular application executes in the _browser_, rendering pages in the DOM in response to user actions.
Angular Universal executes on the _server_, generating _static_ application pages that later get bootstrapped on
the client. This means that the application generally renders more quickly, giving users a chance to view the application
layout before it becomes fully interactive.

标准的 Angular 应用会运行在*浏览器*中，它会在 DOM 中渲染页面，以响应用户的操作。
而**Angular Universal** 会在*服务端*运行，生成一些*静态*的应用页面，稍后再通过客户端进行启动。
这意味着该应用的渲染通常会更快，让用户可以在应用变得完全可交互之前，先查看应用的布局。

For a more detailed look at different techniques and concepts surrounding SSR, please check out this
[article](https://developers.google.com/web/updates/2019/02/rendering-on-the-web).

要了解 SSR 的其它技术和概念的详细信息，请参阅[这篇文章](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)。

You can easily prepare an app for server-side rendering using the [Angular CLI](guide/glossary#cli).
The CLI schematic `@nguniversal/express-engine` performs the required steps, as described below.

你可以使用 [Angular CLI](guide/glossary#cli) 来轻松为应用做好服务端渲染的准备。CLI 的 `@nguniversal/express-engine` 模板会执行下面所讲的必要步骤。

<div class="alert is-helpful">

  **Note:** <live-example downloadOnly>Download the finished sample code</live-example>,
  which runs in a [Node.js® Express](https://expressjs.com/) server.

  **注意：** <live-example downloadOnly>下载已完成的范例代码</live-example>，并将其运行在一个 [Node.js® Express](https://expressjs.com/) 服务器中。

</div>

{@a the-example}

## Universal tutorial

## Universal 教程

The [Tour of Heroes tutorial](tutorial) is the foundation for this walkthrough.

这次演练的基础是[“英雄之旅”教程](tutorial)。

In this example, the Angular CLI compiles and bundles the Universal version of the app with the
[Ahead-of-Time (AOT) compiler](guide/aot-compiler).
A Node.js Express web server compiles HTML pages with Universal based on client requests.

在这个例子中，Angular CLI 使用 [预先（AoT）编译器](guide/aot-compiler)编译并打包了该应用的 Universal 版本。Node.js Express Web 服务器则会根据客户端的请求，利用 Universal 编译 HTML 页面。

To create the server-side app module, `app.server.module.ts`, run the following CLI command.

要创建服务端应用模块 `app.server.module.ts`，请运行以下 CLI 命令。

<code-example language="bash">

ng add @nguniversal/express-engine

</code-example>

The command creates the following folder structure.

该命令会创建如下文件夹结构。

<code-example language="none">
src/
  index.html                 <i>app web page</i>
  main.ts                    <i>bootstrapper for client app</i>
  main.server.ts             <i>* bootstrapper for server app</i>
  style.css                  <i>styles for the app</i>
  app/ ...                   <i>application code</i>
    app.server.module.ts     <i>* server-side application module</i>
server.ts                    <i>* express web server</i>
tsconfig.json                <i>TypeScript base configuration</i>
tsconfig.app.json            <i>TypeScript browser application configuration</i>
tsconfig.server.json         <i>TypeScript server application configuration</i>
tsconfig.spec.json           <i>TypeScript tests configuration</i>
</code-example>

The files marked with `*` are new and not in the original tutorial sample.

标有 `*` 的文件都是新增的，不在原始的教程范例中。

### Universal in action

### Universal 实战

To start rendering your app with Universal on your local system, use the following command.

要使用 Universal 在本地系统中渲染你的应用，请使用如下命令。

<code-example language="bash">
npm run dev:ssr
</code-example>

Open a browser and navigate to http://localhost:4200/.
You should see the familiar Tour of Heroes dashboard page.

打开浏览器，导航到 http://localhost:4200/。你会看到熟悉的“英雄之旅”仪表盘页面。

Navigation via `routerLinks` works correctly because they use the native anchor (`<a>`) tags.
You can go from the Dashboard to the Heroes page and back.
You can click a hero on the Dashboard page to display its Details page.

通过 `routerLinks` 导航时能正常工作，因为它们使用的是原生的链接标签（`<a>`）。你可以从仪表盘进入 英雄列表页面，然后返回。你可以点击仪表盘页面上的一个英雄来显示他的详情页面。

If you throttle your network speed so that the client-side scripts take longer to download (instructions below),
you'll notice:

如果你限制下网速（稍后会讲操作步骤），让客户端脚本下载时间变长，你会注意到：

* Clicking a hero on the Heroes page does nothing.

  点击英雄列表页面上的英雄没有反应。

* You can't add or delete a hero.

  你无法添加或删除英雄。

* The search box on the Dashboard page is ignored.

  仪表盘页面上的搜索框会被忽略。

* The *Back* and *Save* buttons on the Details page don't work.

  “详情”页面上的*后退*和*保存*按钮不起作用。

User events other than `routerLink` clicks aren't supported.
You must wait for the full client app to bootstrap and run, or buffer the events using libraries like
[preboot](https://github.com/angular/preboot), which allow you to replay these events once the client-side scripts load.

不支持除了点击 `routerLink` 以外的任何用户事件。你必须等待完整的客户端应用启动并运行，或者使用 [preboot 之类的](https://github.com/angular/preboot)库来缓冲这些事件，这样你就可以在客户端脚本加载完毕后重放这些事件。

The transition from the server-rendered app to the client app happens quickly on a development machine, but you should
always test your apps in real-world scenarios.

在开发机器上，从服务端渲染的应用过渡到客户端应用的过程会很快，但是你还是应该在实际场景中测试一下你的应用。

You can simulate a slower network to see the transition more clearly as follows:

你可以通过模拟速度较慢的网络来更清晰地看到这种转换，如下所示：

1. Open the Chrome Dev Tools and go to the Network tab.

   打开 Chrome 开发者工具，进入 Network 标签页。

1. Find the [Network Throttling](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling)
   dropdown on the far right of the menu bar.

   找一下菜单栏最右侧的 [Network Throttling](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling) 下拉菜单。

1. Try one of the "3G" speeds.

   尝试一下 “3G” 的速度吧。

The server-rendered app still launches quickly but the full client app may take seconds to load.

服务端渲染的应用仍然可以快速启动，但完整的客户端应用可能需要几秒钟才能加载完。

{@a why-do-it}
## Why use server-side rendering?

## 为何需要服务端渲染？

There are three main reasons to create a Universal version of your app.

有三个主要的理由来为你的应用创建一个 Universal 版本。

1. Facilitate web crawlers through [search engine optimization (SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)

  通过[搜索引擎优化(SEO)](https://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf)来帮助网络爬虫。

1. Improve performance on mobile and low-powered devices

   提升在手机和低功耗设备上的性能

1. Show the first page quickly with a [first-contentful paint (FCP)](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint)

   迅速显示出第一个支持[首次内容绘制(FCP)](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint)的页面

{@a seo}

{@a web-crawlers}

### Facilitate web crawlers (SEO)

### 帮助网络爬虫（SEO）

Google, Bing, Facebook, Twitter, and other social media sites rely on web crawlers to index your application content and
make that content searchable on the web.

Google、Bing、Facebook、Twitter 和其它社交媒体网站都依赖网络爬虫去索引你的应用内容，并且让它的内容可以通过网络搜索到。

These web crawlers may be unable to navigate and index your highly interactive Angular application as a human user could do.

这些网络爬虫可能不会像人类那样导航到你的具有高度交互性的 Angular 应用，并为其建立索引。

Angular Universal can generate a static version of your app that is easily searchable, linkable, and navigable without JavaScript.
Universal also makes a site preview available since each URL returns a fully rendered page.

Angular Universal 可以为你生成应用的静态版本，它易搜索、可链接，浏览时也不必借助 JavaScript。
它也让站点可以被预览，因为每个 URL 返回的都是一个完全渲染好的页面。

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
Pages that load faster perform better, [even with changes as small as 100ms](https://web.dev/shopping-for-speed-on-ebay/).
Your app may have to launch faster to engage these users before they decide to do something else.

快速显示第一页对于吸引用户是至关重要的。
加载速度更快的页面效果更好，即使其差异只有 100 毫秒也是如此（https://web.dev/shopping-for-speed-on-ebay/）。
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

  **Note:** _Any_ web server technology can serve a Universal app as long as it can call Universal's `renderModule()` function.
  The principles and decision points discussed here apply to any web server technology.

  **注意：** **任何一种** Web 服务器技术都可以作为 Universal 应用的服务器，只要它能调用 Universal 的 `renderModule()` 函数。
  这里所讨论的这些原则和决策点也适用于任何 Web 服务器技术。

</div>

Universal applications use the Angular `platform-server` package (as opposed to `platform-browser`), which provides
server implementations of the DOM, `XMLHttpRequest`, and other low-level features that don't rely on a browser.

Universal 应用使用 `platform-server` 包（而不是 `platform-browser`），它提供了 DOM 的服务端实现、`XMLHttpRequest` 以及其它不依赖浏览器的底层特性。

The server ([Node.js Express](https://expressjs.com/) in this guide's example)
passes client requests for application pages to the NgUniversal `ngExpressEngine`. Under the hood, this
calls Universal's `renderModule()` function, while providing caching and other helpful utilities.

服务器（这个例子中使用的是 [Node.js Express](https://expressjs.com/) 服务器）会把客户端对应用页面的请求传给 NgUniversal 的 `ngExpressEngine`。在内部实现上，它会调用 Universal 的 `renderModule()` 函数，它还提供了缓存等有用的工具函数。

The `renderModule()` function takes as inputs a *template* HTML page (usually `index.html`),
an Angular *module* containing components, and a *route* that determines which components to display.

`renderModule()` 函数接受一个*模板* HTML 页面（通常是 `index.html`）、一个包含组件的 Angular *模块*和一个用于决定该显示哪些组件的*路由*作为输入。

The route comes from the client's request to the server.

该路由从客户端的请求中传给服务器。

Each request results in the appropriate view for the requested route.

每次请求都会给出所请求路由的一个适当的视图。

The `renderModule()` function renders the view within the `<app>` tag of the template,
creating a finished HTML page for the client.

`renderModule()` 在模板中的 `<app>` 标记中渲染出这个视图，并为客户端创建一个完成的 HTML 页面。

Finally, the server returns the rendered page to the client.

最后，服务器就会把渲染好的页面返回给客户端。

### Working around the browser APIs

### 使用浏览器 API

Because a Universal app doesn't execute in the browser, some of the browser APIs and capabilities may be missing on the server.

由于 Universal 应用并没有运行在浏览器中，因此该服务器上可能会缺少浏览器的某些 API 和其它能力。

For example, server-side applications can't reference browser-only global objects such as `window`, `document`, `navigator`, or `location`.

比如，服务端应用不能引用浏览器独有的全局对象，比如 `window`、`document`、`navigator` 或 `location`。

Angular provides some injectable abstractions over these objects, such as [`Location`](api/common/Location)
or [`DOCUMENT`](api/common/DOCUMENT); it may substitute adequately for these APIs.
If Angular doesn't provide it, it's possible to write new abstractions that delegate to the browser APIs while in the browser
and to an alternative implementation while on the server (aka shimming).

Angular 提供了一些这些对象的可注入的抽象层，比如 [`Location`](api/common/Location) 或 [`DOCUMENT`](api/common/DOCUMENT)，它可以作为你所调用的 API 的等效替身。
如果 Angular 没有提供它，你也可以写一个自己的抽象层，当在浏览器中运行时，就把它委托给浏览器 API，当它在服务器中运行时，就提供一个符合要求的代用实现（也叫垫片 - shimming）。

Similarly, without mouse or keyboard events, a server-side app can't rely on a user clicking a button to show a component.
The app must determine what to render based solely on the incoming client request.
This is a good argument for making the app [routable](guide/router).

同样，由于没有鼠标或键盘事件，因此 Universal 应用也不能依赖于用户点击某个按钮来显示某个组件。
Universal 应用必须仅仅根据客户端过来的请求决定要渲染的内容。
把该应用做成[可路由的](guide/router)，就是一种好方案。

{@a universal-engine}

### Universal template engine

### Universal 模板引擎

The important bit in the `server.ts` file is the `ngExpressEngine()` function.

`server.ts` 文件中最重要的部分是 `ngExpressEngine()` 函数：

<code-example path="universal/server.ts" header="server.ts" region="ngExpressEngine">
</code-example>

The `ngExpressEngine()` function is a wrapper around Universal's `renderModule()` function which turns a client's
requests into server-rendered HTML pages. It accepts an object with the following properties:

`ngExpressEngine()` 是对 Universal 的 `renderModule()` 函数的封装。它会把客户端请求转换成服务端渲染的 HTML 页面。
它接受一个具有下列属性的对象：

* `bootstrap`: The root `NgModule` or `NgModule` factory to use for bootstraping the app when rendering on the server. For the example app, it is `AppServerModule`. It's the bridge between the Universal server-side renderer and the Angular application.

   `bootstrap`：在服务器上渲染时用于引导应用程序的根 `NgModule` 或 `NgModule` 工厂。对于这个范例应用，它是 `AppServerModule`。它是 Universal 服务端渲染器和 Angular 应用之间的桥梁。

* `extraProviders`: This is optional and lets you specify dependency providers that apply only when rendering the app on the server. You can do this when your app needs information that can only be determined by the currently running server instance.

   `extraProviders`：这是可选的，可以让你指定仅在服务器渲染应用程序时才适用的依赖提供者。当你的应用需要某些只能由当前运行的服务器实例确定的信息时，可以执行此操作。

The `ngExpressEngine()` function returns a `Promise` callback that resolves to the rendered page.
It's up to the engine to decide what to do with that page.
This engine's `Promise` callback returns the rendered page to the web server,
which then forwards it to the client in the HTTP response.

`ngExpressEngine()` 函数返回了一个会解析成渲染好的页面的*承诺（Promise）*。
接下来你的引擎要决定拿这个页面做点什么。
在*这个引擎*的 `Promise` 回调函数中，把渲染好的页面返回给了 Web 服务器，然后服务器通过 HTTP 响应把它转发给了客户端。

<div class="alert is-helpful">

  **Note:**  These wrappers help hide the complexity of the `renderModule()` function. There are more wrappers
  for different backend technologies at the [Universal repository](https://github.com/angular/universal).

  **注意：** 这个包装器帮助隐藏了 `renderModule()` 的复杂性。
  在 [Universal 代码库中](https://github.com/angular/universal)还有更多针对其它后端技术的包装器。

</div>

### Filtering request URLs

### 过滤请求的 URL

NOTE: The basic behavior described below is handled automatically when using the NgUniversal Express schematic. This
is helpful when trying to understand the underlying behavior or replicate it without using the schematic.

注意：当使用 NgUniversal Express 原理图时，将自动处理稍后描述的基本行为。当你要尝试理解其底层行为或在不使用原理图的情况下自行实现它时，这一节会很有用。

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
All static asset requests have a file extension (such as `main.js` or `/node_modules/zone.js/bundles/zone.umd.js`).

幸运的是，应用的路由具有一些共同特征：它们的 URL 一般不带文件扩展名。
（数据请求也可能缺少扩展名，但是它们很容易识别出来，因为它们总是以 `/api` 开头，所有的静态资源的请求都会带有一个扩展名，比如 `main.js` 或 `/node_modules/zone.js/dist/zone.js`）。

Because we use routing, we can easily recognize the three types of requests and handle them differently.

由于使用了路由，所以我们可以轻松的识别出这三种类型的请求，并分别处理它们。

1. **Data request**: request URL that begins `/api`.

   **数据请求**：请求的 URL 用 `/api` 开头

1. **App navigation**: request URL with no file extension.

   **应用导航**：请求的 URL 不带扩展名

1. **Static asset**: all other requests.

   **静态资源**：所有其它请求。

A Node.js Express server is a pipeline of middleware that filters and processes requests one after the other.
You configure the Node.js Express server pipeline with calls to `server.get()` like this one for data requests.

Node.js Express 服务器是一系列中间件构成的管道，它会挨个对 URL 请求进行过滤和处理。
你可以调用 `app.get()` 来配置 Express 服务器的管道，就像下面这个数据请求一样：

<code-example path="universal/server.ts" header="server.ts (data URL)" region="data-request"></code-example>

<div class="alert is-helpful">

  **Note:** This sample server doesn't handle data requests.
  
  **注意：**这个范例服务器不会处理数据请求。

  The tutorial's "in-memory web API" module, a demo and development tool, intercepts all HTTP calls and
  simulates the behavior of a remote data server.
  In practice, you would remove that module and register your web API middleware on the server here.

  本教程的“内存 Web API” 模块（一个演示及开发工具）拦截了所有 HTTP 调用，并且模拟了远端数据服务器的行为。
  在实践中，你应该移除这个模块，并且在服务器上注册你的 Web API 中间件。

</div>

The following code filters for request URLs with no extensions and treats them as navigation requests.

下列代码会过滤出不带扩展名的 URL，并把它们当做导航请求进行处理。

<code-example path="universal/server.ts" header="server.ts (navigation)" region="navigation-request"></code-example>

### Serving static files safely

### 安全的提供静态文件

A single `server.use()` treats all other URLs as requests for static assets
such as JavaScript, image, and style files.

单独的 `server.use()` 会处理所有其它 URL，比如对 JavaScript 、图片和样式表等静态资源的请求。

To ensure that clients can only download the files that they are permitted to see, put all client-facing asset files in
the `/dist` folder and only honor requests for files from the `/dist` folder.

要保证客户端只能下载那些*允许*他们访问的文件，你应该把所有面向客户端的资源文件都放在 `/dist` 目录下，并且只允许客户端请求来自 `/dist` 目录下的文件。

The following Node.js Express code routes all remaining requests to `/dist`, and returns a `404 - NOT FOUND` error if the
file isn't found.

下列 Node.js Express 代码会把剩下的所有请求都路由到 `/dist` 目录下，如果文件未找到，就会返回 `404 - NOT FOUND`。

<code-example path="universal/server.ts" header="server.ts (static files)" region="static"></code-example>

### Using absolute URLs for HTTP (data) requests on the server

### 在服务端使用绝对 URL 进行 HTTP（数据）请求

The tutorial's `HeroService` and `HeroSearchService` delegate to the Angular `HttpClient` module to fetch application data.
These services send requests to _relative_ URLs such as `api/heroes`.
In a server-side rendered app, HTTP URLs must be _absolute_ (for example, `https://my-server.com/api/heroes`).
This means that the URLs must be somehow converted to absolute when running on the server and be left relative when running in the browser.

本教程的 `HeroService` 和 `HeroSearchService` 都委托 Angular 的 `HttpClient` 模块来获取应用数据。这些服务会向 `api/heroes` 之类的*相对* URL 发送请求。在服务端渲染的应用中，HTTP URL 必须是*绝对的*（例如，`https://my-server.com/api/heroes` ）。这意味着当在服务器上运行时，URL 必须以某种方式转换为绝对 URL，而在浏览器中运行时，它们是相对 URL。

If you are using one of the `@nguniversal/*-engine` packages (such as `@nguniversal/express-engine`), this is taken care for you automatically.
You don't need to do anything to make relative URLs work on the server.

如果你正在使用 `@nguniversal/*-engine` 包之一（例如 `@nguniversal/express-engine`），就会自动为帮你做这件事。你无需再做任何事情来让相对 URL 能在服务器上运行。

If, for some reason, you are not using an `@nguniversal/*-engine` package, you may need to handle it yourself.

如果出于某种原因，你没有使用 `@nguniversal/*-engine` 包，你可能需要亲自处理它。

The recommended solution is to pass the full request URL to the `options` argument of [renderModule()](api/platform-server/renderModule) or [renderModuleFactory()](api/platform-server/renderModuleFactory) (depending on what you use to render `AppServerModule` on the server).
This option is the least intrusive as it does not require any changes to the app.
Here, "request URL" refers to the URL of the request as a response to which the app is being rendered on the server.
For example, if the client requested `https://my-server.com/dashboard` and you are rendering the app on the server to respond to that request, `options.url` should be set to `https://my-server.com/dashboard`.

建议的解决方案是将完整的请求 URL 传给 [renderModule()](api/platform-server/renderModule) 或 [renderModuleFactory()](api/platform-server/renderModuleFactory) 的 `options` 参数（具体取决于你在服务器上渲染 `AppServerModule` 的目的）。此选项的侵入性最小，因为它不需要对应用进行任何更改。这里的“请求 URL” 是指当应用在服务器上渲染时的地址。例如，如果客户端请求了 `https://my-server.com/dashboard` 并且要在服务器上渲染该应用以响应该请求，那么 `options.url` 应设置为 `https://my-server.com/dashboard`。

Now, on every HTTP request made as part of rendering the app on the server, Angular can correctly resolve the request URL to an absolute URL, using the provided `options.url`.

现在，作为在服务端渲染应用的一部分，每次发送 HTTP 请求时，Angular 都可以使用这里提供的 `options.url` 正确地将请求 URL 解析为绝对 URL。
