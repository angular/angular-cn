# Deployment

# 部署

This page describes tools and techniques for deploy and optimize your Angular application.

本章会描述部署和优化Angular应用的工具与技术。


{@a toc}

{@a overview}



## Overview

## 概览

This guide describes techniques for preparing and deploying an Angular application to a server running remotely.
The techniques progress from _easy but suboptimal_ to _more optimal and more involved_.

本章描述把Angular应用发布到远端服务器时所需的准备与部署技术。从*简单却未优化*的版本到*充分优化但涉及更多知识*的版本。

* The [simple way](guide/deployment#dev-deploy "Simplest deployment possible") is to copy the development environment to the server.

  [最简单的方式](guide/deployment#dev-deploy "Simplest deployment possible")只是把文件拷贝到服务器上的部署环境

* [_Ahead of Time_ compilation (AOT)](guide/deployment#aot "AOT Compilation") is the first of
[several optimization strategies](guide/deployment#optimize).
You'll also want to read the [detailed instructions in the AOT Cookbook](guide/aot-compiler "AOT Cookbook").

  [*预编译*(AOT)](guide/deployment#aot "AOT Compilation")是第一种[优化策略](guide/deployment#optimize)。
详情参见[烹饪宝典中的AOT章节](guide/aot-compiler "AOT Cookbook")。

* [Webpack](guide/deployment#webpack "Webpack Optimization") is a popular general purpose packaging tool with a rich ecosystem, including plugins for AOT.
The Angular [webpack guide](guide/webpack "Webpack: an introduction") can get you started and
_this_ page provides additional optimization advice, but you'll probably have to learn more about webpack on your own.

  [Webpack](guide/deployment#webpack "Webpack Optimization")是具有完善生态系统的常用通用打包工具，包括为AOT准备的插件。
  你可以从[Webpack章](guide/webpack "Webpack: an introduction")开始，它提供了更多优化建议，但是你可能要自己去学习更多Webpack的知识。

* The [Angular configuration](guide/deployment#angular-configuration "Angular configuration") section calls attention to
specific client application changes that could improve performance.

  [Angular配置](guide/deployment#angular-configuration "Angular configuration")一节专注于如何修改应用程序来提高性能。

* The [Server configuration](guide/deployment#server-configuration "Server configuration") section describes
server-side changes that may be necessary, _no matter how you deploy the application_.

  [服务端配置](guide/deployment#server-configuration "Server configuration")一节描述了服务端的修改，*无论我们打算如何部署本应用*。



{@a dev-deploy}


## Simplest deployment possible

## 最简化的部署方式

The simplest way to deploy the app is to publish it to a web server
directly out of the development environment.

部署应用最简化的方式是直接把它发布到开发环境之外的Web服务器上。

It's already running locally. You'll just copy it, almost _as is_,
to a non-local server that others can reach.

它已经在本地运行过了。我们基本上只要把它原封不动的复制到别人能访问到的非本地服务器上就可以了。

1. Copy _everything_ (or [_almost_ everything](guide/deployment#node-modules "Loading npm packages from the web"))
from the local project folder to a folder on the server.

  把一切文件（或[*几乎*一切文件](guide/deployment#node-modules "Loading npm packages from the web")）从本地项目目录下复制到服务器的目录下。

1. If you're serving the app out of a subfolder,
edit a version of `index.html` to set the `<base href>` appropriately.
For example, if the URL to `index.html` is `www.mysite.com/my/app/`, set the _base href_  to
`<base href="/my/app/">`.
Otherwise, leave it alone.
[More on this below](guide/deployment#base-tag).

  如果准备把该应用放在子目录下，就要编辑`index.html`，并适当设置`<base href>`。
  比如，如果到`index.html`的URL是`www.mysite.com/my/app/`，就把*基地址*设置为`<base href="/my/app/">`。如果是放在根路径下就不用动它。
  详情参见[稍后](guide/deployment#base-tag)。

1. Configure the server to redirect requests for missing files to `index.html`.
[More on this below](guide/deployment#fallback).

  把服务器上缺失的文件重定向到`index.html`，详情参见[稍后](guide/deployment#fallback)。

1. Enable production mode as [described below](guide/deployment#enable-prod-mode) (optional).

  按照[稍后](guide/deployment#enable-prod-mode)的描述启用生产模式（可选）。

That's the simplest deployment you can do.

这就是最简化的部署方式。


<div class="alert is-helpful">



This is _not_ a production deployment. It's not optimized and it won't be fast for users.
It might be good enough for sharing your progress and ideas internally with managers, teammates, and other stakeholders.
Be sure to read about [optimizing for production](guide/deployment#optimize "Optimizing for production") below.

这不是生产级部署。它没有优化过，并且对用户来说也不够快。
但是当你向经理、团队成员或其它利益相关者内部分享你的进度和想法时它是足够的。
一定要读读稍后的[为生产环境优化](guide/deployment#optimize "Optimizing for production")



</div>



{@a node-modules}


### Load npm package files from the web (SystemJS)

### 从Web上加载npm包（SystemJS）

The `node_modules` folder of _npm packages_ contains much more code
than is needed to actually run your app in the browser.
The `node_modules` for the Quickstart installation is typically 20,500+ files and 180+ MB.
The application itself requires a tiny fraction of that to run.

`node_modules`文件夹包含着在浏览器中运行应用时所需的更多代码。
"快速上手"项目中所需的`node_modules`通常由20,500+个文件和180+ MB的体积。
运行应用时其实只需要其中很小的一部分。

It takes a long time to upload all of that useless bulk and
users will wait unnecessarily while library files download piecemeal.

上传这些不需要的文件需要很长时间，而在库的下载期间，用户得进行不必要的等待。

Load the few files you need from the web instead.

我们可以转而从网上下载所需的这少量文件。

(1) Make a copy of `index.html` for deployment and replace all `node_module` scripts
with versions that load from the web. It might look like this.

(1) 复制一份专用于部署的`index.html`，并把所有的`node_module`脚本替换成加载网上的版本。代码如下：


<code-example path="deployment/src/index.html" region="node-module-scripts" linenums="false">

</code-example>



(2) Replace the `systemjs.config.js` script with a script that
loads `systemjs.config.server.js`.

(2) 把`systemjs.config.js`脚本改为加载`systemjs.config.server.js`。


<code-example path="deployment/src/index.html" region="systemjs-config" linenums="false">

</code-example>



(3) Add `systemjs.config.server.js` (shown in the code sample below) to the `src/` folder.
This alternative version configures _SystemJS_ to load _UMD_ versions of Angular
(and other third-party packages) from the web.

(3) 把 `systemjs.config.server.js`（稍后有代码）复制到`src/`文件夹。
这个版本会从网上加载Angular的*UMD*版本（和其它第三方包）。

Modify `systemjs.config.server.js` as necessary to stay in sync with changes
you make to `systemjs.config.js`.

把对`systemjs.config.js`的修改也随时同步到`systemjs.config.server.js`文件。

Notice the `paths` key:

注意`paths`属性：


<code-example path="deployment/src/systemjs.config.server.js" region="paths" linenums="false">

</code-example>



In the standard SystemJS config, the `npm` path points to the `node_modules/`.
In this server config, it points to
<a href="https://unpkg.com/" title="unpkg.com">https://unpkg.com</a>,
a site that hosts _npm packages_,
and loads them from the web directly.
There are other service providers that do the same thing.

在标准的SystemJS配置中，`npm`路径指向`node_modules/`。
在服务器端的配置中，它指向<a href="https://unpkg.com/" target="_blank" title="unpkg.com">https://unpkg.com</a>（一个专门存放*npm包*的服务器），
并从网上直接加载它们。
还有另一些服务提供商做同样的事。

If you are unwilling or unable to load packages from the open web,
the inventory in `systemjs.config.server.js` identifies the files and folders that
you would copy to a library folder on the server.
Then change the config's  `'npm'` path to point to that folder.

如果你不想或无法从公网上加载这些包，也可以把`systemjs.config.server.js`中所指出的这些文件或文件夹复制到服务器上的一个库目录。
然后修改配置中的`'npm'`路径指向该文件夹。

### Practice with an example

### 用一个例子实践一下

The following trivial router sample app shows these changes.

下面这个例子展示了所有的修改。


<code-tabs>

  <code-pane title="index.html" path="deployment/src/index.html">

  </code-pane>

  <code-pane title="systemjs.config.server.js" path="deployment/src/systemjs.config.server.js">

  </code-pane>

  <code-pane title="main.ts" path="deployment/src/main.ts">

  </code-pane>

  <code-pane title="app/app.module.ts" path="deployment/src/app/app.module.ts">

  </code-pane>

  <code-pane title="app/app.component.ts" path="deployment/src/app/app.component.ts">

  </code-pane>

  <code-pane title="app/crisis-list.component.ts" path="deployment/src/app/crisis-list.component.ts">

  </code-pane>

  <code-pane title="app/hero-list.component.ts" path="deployment/src/app/hero-list.component.ts">

  </code-pane>

</code-tabs>



Practice with this sample before attempting these techniques on your application.

在真实应用中尝试这些技术之前，先用这个例子实践一下。

1. Follow the [setup instructions](guide/setup "Angular QuickStart setup") for creating a new project
named <code>simple-deployment</code>.

  遵循[设置步骤](guide/setup "Angular QuickStart setup")创建一个名叫`simple-deployment`的新项目。

1. Add the "Simple deployment" sample files shown above.

  添加上述的“简单部署”范例文件。

1. Run it with `npm start` as you would any project.

  像其它项目一样使用`npm start`来运行它。

1. Inspect the network traffic in the browser developer tools.
Notice that it loads all packages from the web.
You could delete the `node_modules` folder and the app would still run
(although you wouldn't be able to recompile or launch `lite-server`
until you restored it).

  在浏览器的开发者工具中审查网络包。注意，它从网上加载了所有包。
  我们可以删除`node_modules`文件夹，该应用仍然可以正常工作（但没办法再重新编译它或者启动`lite-server`了）。

1. Deploy the sample to the server (minus the `node_modules` folder!).

  把范例工程部署到服务器上（但`node_modules`文件夹除外）

When you have that working, try the same process on your application.

掌握这些之后，就可以在你的真实项目中试用这些过程了。


{@a optimize}



## Optimize for production

## 为生产环境优化

Although deploying directly from the development environment works, it's far from optimal.

虽然可以直接从开发环境下部署，但是它还远远没有优化。

The client makes many small requests for individual application code and template files,
a fact you can quickly confirm by looking at the network tab in a browser's developer tools.
Each small file download can spend more time communicating with the server than transferring data.

客户端发起了很多小的请求来取得一个个单独的应用代码和模板文件，从浏览器开发工具的Network标签中就可以确认这一点。
每个小文件都会花费很多时间在与服务器建立通讯而不是传输内容上。

Development files are full of comments and whitespace for easy reading and debugging.
The browser downloads entire libraries, instead of just the parts the app needs.
The volume of code passed from server to client (the "payload")
can be significantly larger than is strictly necessary to execute the application.

开发环境下的文件有很多注释和空格，以便于阅读和调试。
浏览器会下载整个库，而不只是应用需要的那部分。
从服务器传到客户端的代码（即有效载荷）的数量会显著大于应用运行时真正需要的那部分。

The many requests and large payloads mean
the app takes longer to launch than it would if you optimized it.
Several seconds may pass (or worse) before the user can see or do anything useful.

大量请求和载荷意味着应用相对于优化过的版本会花更多时间进行启动。
当用户看到什么或做什么有用的事情之前，就已经过去了（浪费了）很多秒。

Does it matter? That depends upon business and technical factors you must evaluate for yourself.

这重要吗？取决于很多业务和技术方面的因素，我们必须自己评估它们。

If it _does_ matter, there are tools and techniques to reduce the number of requests and the size of responses.

如果重要，那么有很多工具和技术可以减少请求数和体积。

* Ahead-of-Time (AOT) Compilation: pre-compiles Angular component templates.

  预编译（AOT）：预编译Angular的组件模板。
  
* Bundling: concatenates modules into a single file (bundle).

  打捆（Bundle）：把这些模块串接成一个单独的捆文件（bundle）。
  
* Inlining: pulls template html and css into the components.

  内联：把模板html和css拉到组件中。
  
* Minification: removes excess whitespace, comments, and optional tokens.

  最小化：移除不必要的空格、注释和可选令牌（Token）。
  
* Uglification: rewrites code to use short, cryptic variable and function names.

  混淆：使用短的、无意义的变量名和函数名来重写代码。
  
* Dead code elimination: removes unreferenced modules and unused code.

  消除死代码：移除未引用过的模块和未使用过的代码。
  
* Pruned libraries: drop unused libraries and pare others down to the features you need.

  修剪库：移除未使用过的库，并把其它库裁剪到只剩下你需要的那些特性。
  
* Performance measurement: focus on optimizations that make a measurable difference.

  性能度量：集中精力做那些能产生可测量差异的优化。

Each tool does something different.
They work best in combination and are mutually reinforcing.

每个工具做的事情都不一样，但它们结合起来会相辅相成。

You can use any build system you like.
Whatever system you choose, be sure to automate it so that
building for production is a single step.

我们也可以使用任何喜欢的构建系统。
无论选择的是什么，都务必把它自动化，以便可以一步构建出产品。


{@a aot}


### Ahead-of-Time (AOT) compilation

### 预编译（AOT）

The Angular _Ahead-of-Time_ compiler pre-compiles application components and their templates
during the build process.

Angular的*预编译*器会在构建过程中预先编译应用的组件及其模板。

Apps compiled with AOT launch faster for several reasons.

预编译过的应用启动更快，原因如下：

* Application components execute immediately, without client-side compilation.

  应用组件会立即执行，不需要客户端编译过程。
  
* Templates are embedded as code within their components so there is no client-side request for template files.

  模板会被内嵌在组件中，因此不会再从客户端请求模板文件。
  
* You don't download the Angular compiler, which is pretty big on its own.

  我们不用再下载Angular编译器模块，它本身太大了。
  
* The compiler discards unused Angular directives that a tree-shaking tool can then exclude.

  编译器会丢弃那些摇树优化（tree-shaking）工具能排除的代码。

Learn more about AOT Compilation in the [AOT Cookbook](guide/aot-compiler "AOT Cookbook")
which describes running the AOT compiler from the command line
and using [_rollup_](guide/deployment#rollup) for bundling, minification, uglification and tree shaking.

要了解AOT编译器的更多知识，参见[烹饪宝典中的AOT一章](guide/aot-compiler "AOT Cookbook")，
它描述了如何在命令行中执行AOT编译器，并使用[_rollup_](guide/deployment#rollup)进行构建、最小化、混淆和摇树优化。


{@a webpack}


### Webpack (and AOT)

### Webpack（与AOT）

<a href="https://webpack.js.org/" title="Webpack 2">Webpack 2</a> is another
great option for inlining templates and style-sheets, for bundling, minifying, and uglifying the application.
The "[Webpack: an introduction](guide/webpack "Webpack: an introduction")" guide will get you started
using webpack with Angular.

<a href="https://webpack.js.org/" target="_blank" title="Webpack 2">Webpack 2</a>是另一个选项，它可以内联模板、样式表、打包、最小化和混淆应用。
"[Webpack简介](guide/webpack "Webpack: an introduction")"一章中将会教你如何配合Angular使用Webpack。

Consider configuring _Webpack_ with the official
<a href="https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack" title="Ahead-of-Time Webpack Plugin">
Angular Ahead-of-Time Webpack Plugin</a>.
This plugin transpiles the TypeScript application code,
bundles lazy loaded `NgModules` separately,
and performs AOT compilation &mdash; without any changes to the source code.

考虑使用官方的<a href="https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack" target="_blank" title="Ahead-of-Time Webpack Plugin">
Angular预编译插件</a>来配置*Webpack*。
这个插件会转译TypeScript代码、独立打包延迟加载的`NgModules`，而且不用对源码做任何修改就能执行AOT编译。


{@a rollup}


### Dead code elimination with _rollup_

### 使用`rollup`消除死代码

Any code that you don't call is _dead code_.
You can reduce the total size of the application substantially by removing dead code from the application and from third-party libraries.

任何永远不会调到的代码就是*死代码*。
通过移除应用和第三方库中的死代码，可以实质性减小应用的总大小。

_Tree shaking_ is a _dead code elimination_ technique that removes entire exports from JavaScript modules.
If a library exports something that the application doesn't import, a tree shaking tool removes it from the code base.

*摇树优化*是一种*消除死代码*的技术，它会从JavaScript模块中移除导出。
如果一个库导出了一些东西，但是应用代码没有导入过它，摇树工具就会从代码中移除它。

Tree shaking was popularized by
<a href="http://rollupjs.org/" title="Rollup">Rollup</a>, a popular tool with an ecosystem of
plugins for bundling, minification, and uglification.
Learn more about tree shaking and dead code elmination in
<a href="https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.15ih9cyvl" title="Tree-shaking and Dead Code Elimination">
this post</a> by rollup-creator, Rich Harris.

<a href="http://rollupjs.org/" target="_blank" title="Rollup">Rollup</a>普及了摇树优化，它拥有打包、最小化和混淆的插件生态系统，是一个广受欢迎的构建工具。
要了解关于摇树优化和消除死代码技术的更多知识，参见<a href="https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.15ih9cyvl" target="_blank" title="Tree-shaking and Dead Code Elimination">这个帖子</a>，它的作者就是rollup之父Rich Harris。


{@a prune}


### Pruned libraries

### 修剪库

Don't count on automation to remove all dead code.

不要指望自动移除所有死代码。

Remove libraries that you don't use, especially unnecessary scripts in `index.html`.
Consider smaller alternatives to the libraries that you do use.

手动移除不用的库，特别是`index.html`中不用的脚本。
为实际使用的那些库则努力选择更小的代用库。

Some libraries offer facilities for building a custom, skinny version with just the features you need.
Other libraries let you import features _a la carte_.
**RxJS** is a good example; import RxJS `Observable` operators individually instead of the entire library.

有些库可以构建出只带所需特性的、自定义的、带皮肤的版本。另一些库则可以让你按需导入它的特性。
**RxJS**就是一个很好的例子，我们会单独导入`Observable`的操作符（operator），而不是导入整个库。


{@a measure}


### Measure performance first

### 首先，度量性能

You can make better decisions about what to optimize and how when you have a clear and accurate understanding of
what's making the application slow.
The cause may not be what you think it is.
You can waste a lot of time and money optimizing something that has no tangible benefit or even makes the app slower.
You should measure the app's actual behavior when running in the environments that are important to you.

如果我们能对“是什么导致了应用变慢”的问题有一个清晰、准确的理解，那就可以对优化什么、如何优化做出更好地决策了。
真正的原因可能并不是你所想的那样。
我们可能花费大量的时间和金钱去优化一些东西，但它却无法产生可感知的效果甚至让应用变得更慢。
我们应该在那些最重要的环境中实际运行，来度量应用的实际行为。

The
<a href="https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing" title="Chrome DevTools Network Performance">
Chrome DevTools Network Performance page</a> is a good place to start learning about measuring performance.

<a href="https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing" target="_blank" title="Chrome DevTools Network Performance">
  Chrome开发工具的网络性能页</a>是开始学习度量性能的好地方。

The [WebPageTest](https://www.webpagetest.org/) tool is another good choice
that can also help verify that your deployment was successful.

[WebPageTest](https://www.webpagetest.org/)工具是另一个不错的选择，它能帮你验证你的部署是否成功了。


{@a angular-configuration}



## Angular configuration

## Angular配置

Angular configuration can make the difference between whether the app launches quickly or doesn't load at all.

修改Angular配置可以显示出快速启动应用和完全不加载之间的差异。


{@a base-tag}


### The `base` tag

### `base`标签

The HTML [_&lt;base href="..."/&gt;_](/guide/router)
specifies a base path for resolving relative URLs to assets such as images, scripts, and style sheets.
For example, given the `<base href="/my/app/">`, the browser resolves a URL such as `some/place/foo.jpg`
into a server request for `my/app/some/place/foo.jpg`.
During navigation, the Angular router uses the _base href_ as the base path to component, template, and module files.

HTML中的[_&lt;base href="..."/&gt;_](https://angular.io/docs/ts/latest/guide/router.html#!)用于指定一个解析相对路径的基地址，如图片、脚本和样式表。
比如，指定`<base href="/my/app/">`时，浏览器就会把`some/place/foo.jpg`这样的URL解析成到`my/app/some/place/foo.jpg`的服务端请求。
在浏览期间，Angular路由器会使用*base href*作为组件、模板和模块文件的基地址。


<div class="l-sub-section">



See also the [*APP_BASE_HREF*](api/common/APP_BASE_HREF "API: APP_BASE_HREF") alternative.

参见另一种备选方案[*APP_BASE_HREF*](api/common/APP_BASE_HREF "API: APP_BASE_HREF")。


</div>



In development, you typically start the server in the folder that holds `index.html`.
That's the root folder and you'd add `<base href="/">` near the top of `index.html` because `/` is the root of the app.

在开发期间，我们通常会在`index.html`所在的目录中启动服务器。这个目录就是根目录，因为`/`就是本应用的根，所以我们要在`index.html`的顶部添加`<base href="/">`。

But on the shared or production server, you might serve the app from a subfolder.
For example, when the URL to load the app is something like `http://www.mysite.com/my/app/`,
the subfolder is `my/app/` and you should add `<base href="/my/app/">` to the server version of the `index.html`.

但是在共享服务器或生产服务器上，我们可能得从子目录下启动服务器。
比如，当加载本应用的URL是`http://www.mysite.com/my/app/`时，子目录就是`my/app/`，而我们就要在服务器版的`index.html`中添加`<base href="/my/app/">`。

When the `base` tag is misconfigured, the app fails to load and the browser console displays `404 - Not Found` errors
for the missing files. Look at where it _tried_ to find those files and adjust the base tag appropriately.

当`base`标签没有正确配置时，该应用会加载失败，并且浏览器的控制台会对这些缺失的文件显示`404 - Not Found`错误。
看看它在尝试从哪里查找那些文件，并据此调整base标签。


{@a enable-prod-mode}


### Enable production mode

### 启用生产模式

Angular apps run in development mode by default, as you can see by the following message on the browser
console:

Angular应用默认运行在开发模式下，正如在浏览器控制台中看到的如下信息：


<code-example format="nocode">
  Angular is running in the development mode. Call enableProdMode() to enable the production mode.
  （Angular正运行在开发模式下。调用enableProdMode()来启用生产模式）

</code-example>



Switching to production mode can make it run faster by disabling development specific checks such as the dual change detection cycles.

切换到生产模式可以通过禁用开发环境下特有的检查（比如双重变更检测周期）来让应用运行得更快。

To enable [production mode](api/core/enableProdMode) when running remotely, add the following code to the `main.ts`.

要在远程运行时启用[生产模式](api/core/enableProdMode)，请把下列代码添加到`main.ts`中。


<code-example path="deployment/src/main.ts" region="enableProdMode" title="src/main.ts (enableProdMode)" linenums="false">

</code-example>



{@a lazy-loading}


### Lazy loading

### 惰性加载

You can dramatically reduce launch time by only loading the application modules that
absolutely must be present when the app starts.

通过只加载应用启动时必须展示的那些应用模块，我们可以显著缩减启动时间。

Configure the Angular Router to defer loading of all other modules (and their associated code), either by
[waiting until the app has launched](guide/router#preloading  "Preloading")
or by [_lazy loading_](guide/router#asynchronous-routing "Lazy loading")
them on demand.

配置Angular路由器可以延迟加载所有其它模块（以及与它们相关的代码），无论是[等应用启动](guide/router#preloading  "Preloading")，
还是在需要时才[惰性加载](guide/router#asynchronous-routing "Lazy loading")。

#### Don't eagerly import something from a lazy loaded module

#### 不要立即导入惰性加载模块中的任何东西

It's a common mistake.
You've arranged to lazy load a module.
But you unintentionally import it, with a JavaScript `import` statement,
in a file that's eagerly loaded when the app starts, a file such as the root `AppModule`.
If you do that, the module will be loaded immediately.

这是一种常犯的错误。
我们本打算惰性加载一个模块，但可能无意中在根模块`AppModule`文件中使用一个JavaScript的`import`语句导入了它。
这样一来，该模块就被立即加载了。


The bundling configuration must take lazy loading into consideration.
Because lazy loaded modules aren't imported in JavaScript (as just noted), bundlers exclude them by default.
Bundlers don't know about the router configuration and won't create separate bundles for lazy loaded modules.
You have to create these bundles manually.

关于打包（bundle）方式的配置必须考虑到惰性加载问题。
因为惰性加载模块不能在JavaScript中导入（就像刚才说明的），打包器应该默认排除它们。
打包器不知道路由器的配置，并且不会为延迟加载模块创建单独的包。
我们不得不手动创建这些包。

The
[Angular Ahead-of-Time Webpack Plugin](https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack)
automatically recognizes lazy loaded `NgModules` and creates separate bundles for them.

[Angular预编译插件](https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack)会自动识别惰性加载的`NgModules`，并为它们创建单独的包。



{@a server-configuration}



## Server configuration

## 服务端配置

This section covers changes you may have make to the server or to files deployed to the server.

这一节涵盖了我们对服务器或准备部署到服务器的文件要做的那些修改。


{@a fallback}


### Routed apps must fallback to `index.html`

### 带路由的应用必须以`index.html`作为后备页面

Angular apps are perfect candidates for serving with a simple static HTML server.
You don't need a server-side engine to dynamically compose application pages because
Angular does that on the client-side.

Angular应用很适合用简单的静态HTML服务器提供服务。
我们不需要服务端引擎来动态合成应用页面，因为Angular会在客户端完成这件事。

If the app uses the Angular router, you must configure the server
to return the application's host page (`index.html`) when asked for a file that it does not have.

如果该应用使用Angular路由器，我们就必须配置服务器，让它对不存在的文件返回应用的宿主页(`index.html`)。


{@a deep-link}


A routed application should support "deep links".
A _deep link_ is a URL that specifies a path to a component inside the app.
For example, `http://www.mysite.com/heroes/42` is a _deep link_ to the hero detail page
that displays the hero with `id: 42`.

带路由的应用应该支持“深链接”。
所谓*深链接*就是指一个URL，它用于指定到应用内某个组件的路径。
比如，`http://www.mysite.com/heroes/42`就是一个到英雄详情页面的*深链接*，用于显示`id: 42`的英雄。

There is no issue when the user navigates to that URL from within a running client.
The Angular router interprets the URL and routes to that page and hero.

当用户从运行中的客户端应用导航到这个URL时，这没问题。
Angular路由器会拦截这个URL，并且把它路由到正确的页面。

But clicking a link in an email, entering it in the browser address bar,
or merely refreshing the browser while on the hero detail page &mdash;
all of these actions are handled by the browser itself, _outside_ the running application.
The browser makes a direct request to the server for that URL, bypassing the router.

但是，当从邮件中点击链接或在浏览器地址栏中输入它或仅仅在英雄详情页刷新下浏览器时，所有这些操作都是由浏览器本身处理的，在应用的控制范围之外。
浏览器会直接向服务器请求那个URL，路由器没机会插手。

A static server routinely returns `index.html` when it receives a request for `http://www.mysite.com/`.
But it rejects `http://www.mysite.com/heroes/42` and returns a `404 - Not Found` error *unless* it is
configured to return `index.html` instead.

静态服务器会在收到对`http://www.mysite.com/`的请求时返回`index.html`，但是会拒绝对`http://www.mysite.com/heroes/42`的请求，
并返回一个`404 - Not Found`错误，除非，我们把它配置成转而返回`index.html`。

#### Fallback configuration examples

#### 后备页面配置范例

There is no single configuration that works for every server.
The following sections describe configurations for some of the most popular servers.
The list is by no means exhaustive, but should provide you with a good starting point.

没有一种配置可以适用于所有服务器。
后面这些部分会描述对常见服务器的配置方式。
这个列表虽然不够详尽，但可以为你提供一个良好的起点。

#### Development servers

#### 开发服务器

* [Lite-Server](https://github.com/johnpapa/lite-server): the default dev server installed with the
[Quickstart repo](https://github.com/angular/quickstart) is pre-configured to fallback to `index.html`.

  [Lite-Server](https://github.com/johnpapa/lite-server)是["快速上手"仓库](https://github.com/angular/quickstart)中安装的默认开发服务器，它被预先配置为回退到`index.html`。

* [Webpack-Dev-Server](https://github.com/webpack/webpack-dev-server):  setup the
`historyApiFallback` entry in the dev server options as follows:

  [Webpack-Dev-Server](https://github.com/webpack/webpack-dev-server)在开发服务器的配置中设置了`historyApiFallback`，代码如下：


<code-example>
  historyApiFallback: {
    disableDotRule: true,
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
  }

</code-example>



#### Production servers

#### 生产服务器

* [Apache](https://httpd.apache.org/): add a
[rewrite rule](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)
to the `.htaccess` file as show
[here](https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/):

  [Apache](https://httpd.apache.org/)：在`.htaccess`文件中添加一个[重写规则](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)，
代码如下（[出处](https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/)）：


<code-example format=".">
  RewriteEngine On
  # If an existing asset or directory is requested go to it as it is
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
  RewriteRule ^ - [L]

  # If the requested resource doesn't exist, use index.html
  RewriteRule ^ /index.html

</code-example>



* [NGinx](http://nginx.org/): use `try_files`, as described in
[Front Controller Pattern Web Apps](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps),
modified to serve `index.html`:

  [NGinx](http://nginx.org/)：使用`try_files`指向`index.html`，详细描述见[Web应用的前端控制器模式](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps)。


<code-example format=".">
  try_files $uri $uri/ /index.html;

</code-example>



* [IIS](https://www.iis.net/): add a rewrite rule to `web.config`, similar to the one shown
[here](http://stackoverflow.com/a/26152011/2116927):

  [IIS](https://www.iis.net/)：往`web.config`中添加一条重写规则，类似于[这里](http://stackoverflow.com/a/26152011/2116927)：


<code-example format='.'>
  &lt;system.webServer&gt;
    &lt;rewrite&gt;
      &lt;rules&gt;
        &lt;rule name="Angular Routes" stopProcessing="true"&gt;
          &lt;match url=".*" /&gt;
          &lt;conditions logicalGrouping="MatchAll"&gt;
            &lt;add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /&gt;
            &lt;add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /&gt;
          &lt;/conditions&gt;
          &lt;action type="Rewrite" url="/src/" /&gt;
        &lt;/rule&gt;
      &lt;/rules&gt;
    &lt;/rewrite&gt;
  &lt;/system.webServer&gt;

</code-example>



* [GitHub Pages](https://pages.github.com/): you can't
[directly configure](https://github.com/isaacs/github/issues/408)
the GitHub Pages server, but you can add a 404 page.
Copy `index.html` into `404.html`.
It will still be served as the 404 response, but the browser will process that page and load the app properly.
It's also a good idea to
[serve from `docs/` on master](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)
and to
[create a `.nojekyll` file](https://www.bennadel.com/blog/3181-including-node-modules-and-vendors-folders-in-your-github-pages-site.htm)

  [GitHub页面服务](https://pages.github.com/)：我们没办法[直接配置](https://github.com/isaacs/github/issues/408) Github的页面服务，但可以添加一个404页，只要把`index.html`复制到`404.html`就可以了。
  它仍然会给出一个404响应，但是浏览器将会正确处理该页，并正常加载该应用。
  使用[在主分支的`docs/`下启动服务](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)
  并[创建一个`.nojekyll`文件](https://www.bennadel.com/blog/3181-including-node-modules-and-vendors-folders-in-your-github-pages-site.htm)也是一个好办法。

* [Firebase hosting](https://firebase.google.com/docs/hosting/): add a
[rewrite rule](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites).

  [Firebase主机服务](https://firebase.google.com/docs/hosting/)：添加一条[重写规则](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites)。


<code-example format=".">
  "rewrites": [ {
    "source": "**",
    "destination": "/index.html"
  } ]

</code-example>



{@a cors}



### Requesting services from a different server (CORS)

### 请求来自另一个服务器的服务（CORS）

Angular developers may encounter a
<a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" title="Cross-origin resource sharing">
<i>cross-origin resource sharing</i></a> error when making a service request (typically a data service request).
to a server other than the application's own host server.
Browsers forbid such requests unless the server permits them explicitly.

Angular开发者在向与该应用的宿主服务器不同域的服务器发起请求时，可能会遇到一种<a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" target="_blank" title="Cross-origin resource sharing"><i>跨域资源共享（CORS）</i></a>错误。
浏览器会阻止该请求，除非得到那台服务器的明确许可。

There isn't anything the client application can do about these errors.
The server must be configured to accept the application's requests.
Read about how to enable CORS for specific servers at
<a href="http://enable-cors.org/server.html" title="Enabling CORS server">enable-cors.org</a>.

客户端应用对这种错误无能为力。
服务器必须配置成可以接受来自该应用的请求。
要了解如何对特定的服务器开启CORS，参见<a href="http://enable-cors.org/server.html" target="_blank" title="Enabling CORS server">enable-cors.org</a>。


{@a next-steps}



## Next steps

## 下一步
 
If you want to go beyond the [simple _copy-deploy_](guide/deployment#dev-deploy "Simplest deployment possible") approach,
read the [AOT Cookbook](guide/aot-compiler "AOT Cookbook") next.

如果我们准备超越[简单*复制*部署](guide/deployment#dev-deploy "Simplest deployment possible")的方式，请参阅[烹饪宝典中的AOT部分](guide/aot-compiler "AOT Cookbook")。