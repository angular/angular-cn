# Deployment

# 部署

This page describes techniques for deploying your Angular application to a remote server.

本章会描述在远程服务器上部署 Angular 应用的工具与技术。

{@a dev-deploy}

{@a copy-files}

## Simplest deployment possible

## 最简化的部署方式

For the simplest deployment, build for development and copy the output directory to a web server.

最简化的部署方式就是为开发环境构建，并把其输出复制到 Web 服务器上。

1. Start with the development build

   使用开发环境进行构建

  <code-example language="none" class="code-shell">
    ng build
  </code-example>

2. Copy _everything_ within the output folder (`dist/` by default) to a folder on the server.

   把输出目录（默认为 `dist/`）下的*每个文件*都复制到到服务器上的某个目录下。

3. If you copy the files into a server _sub-folder_, append the build flag, `--base-href` and set the `<base href>` appropriately.<br><br>

   如果要把文件部署到服务器上的*某个子路径*下，构建时还要添加 `--base-href`（基地址）标识，并设置合适的 `<base href>`。<br><br>

  For example, if the `index.html` is on the server at `/my/app/index.html`, set the _base href_  to
  `<base href="/my/app/">` like this.

  比如，如果 `index.html` 位于服务器上的 `/my/app/index.html` 路径下，就要把 *base href* 设置为 `<base href="/my/app/">`，就像这样：

  <code-example language="none" class="code-shell">
    ng build --base-href=/my/app/
  </code-example>

  You'll see that the `<base href>` is set properly in the generated `dist/index.html`.<br><br>
  If you copy to the server's root directory, omit this step and leave the `<base href>` alone.<br><br>
  Learn more about the role of `<base href>` [below](guide/deployment#base-tag).

  你会看到在生成的 `dist/index.html` 中 `<base href>` 已经被设置好了。<br><br>
  如果复制到服务器的根目录下，就省略这个步骤，并且让 `<base href>` 保持原样。<br><br> 
  要了解 `<base href>` 的作用，参见 [下面](guide/deployment#base-tag) 的内容。

4. Configure the server to redirect requests for missing files to `index.html`.
Learn more about server-side redirects [below](guide/deployment#fallback).

   配置服务器，使其在找不到文件时把请求重定向到 `index.html`。要了解服务端重定向的更多知识，参见 [下面](guide/deployment#fallback) 的内容。

This is _not_ a production deployment. It's not optimized and it won't be fast for users.
It might be good enough for sharing your progress and ideas internally with managers, teammates, and other stakeholders.

这不是生产级部署。它没有优化过，并且对用户来说也不够快。
但是当你向经理、团队成员或其它利益相关者内部分享你的进度和想法时它是足够的。

{@a optimize}

## Optimize for production

## 为生产环境优化

Although deploying directly from the development environment works, 
you can generate an optimized build with additional CLI command line flags,
starting with `--prod`.

虽然也可以直接用开发环境的设置进行部署，不过你也可以使用 CLI 命令的其它标志生成一个优化过的构建成果。
先来看 `--prod`。

### Build with _--prod_

### 使用 `--prod` 构建。

<code-example language="none" class="code-shell">
  ng build --prod
</code-example>

The `--prod` _meta-flag_ engages the following optimization features.

`--prod` *元标志*包括下列优化特性。

* [Ahead-of-Time (AOT) Compilation](guide/aot-compiler): pre-compiles Angular component templates.

   [预(AOT)编译](guide/aot-compiler)：预编译 Angular 组件的模板。

* [Production mode](#enable-prod-mode): deploys the production environment which enables _production mode_.

   [生产模式](#enable-prod-mode)：启用生产模式部署到生产环境。

* Bundling: concatenates your many application and library files into a few bundles.

   打捆（Bundle）：把这些模块串接成一个单独的捆文件（bundle）。

* Minification: removes excess whitespace, comments, and optional tokens.

   最小化：移除不必要的空格、注释和可选令牌（Token）。

* Uglification: rewrites code to use short, cryptic variable and function names.

   混淆：使用短的、无意义的变量名和函数名来重写代码。

* Dead code elimination: removes unreferenced modules and much unused code.

   消除死代码：移除未引用过的模块和未使用过的代码。

The remaining [copy deployment steps](#copy-files) are the same as before.

剩下的 [拷贝部署步骤](#copy-files) 和以前的方式是一样的。

You may further reduce bundle sizes by adding the `build-optimizer` flag.

你还可以添加 `build-optimizer` 标志来进一步缩减打包体积。

<code-example language="none" class="code-shell">
  ng build --prod --build-optimizer
</code-example>

See the [CLI Documentation](https://github.com/angular/angular-cli/wiki/build) 
for details about available build options and what they do.

参见 [CLI 文档](https://github.com/angular/angular-cli/wiki/build)，来了解可用的构建选项及其用途的详细信息。

{@a enable-prod-mode}

### Enable production mode

### 启用生产模式

Angular apps run in development mode by default, as you can see by the following message on the browser
console:

Angular 应用默认运行在开发模式下，正如在浏览器控制台中看到的如下信息：

<code-example format="nocode">
  Angular is running in the development mode. Call enableProdMode() to enable the production mode.
</code-example>

Switching to _production mode_ can make it run faster by disabling development specific checks such as the dual change detection cycles.

切换到生产模式可以通过禁用开发环境下特有的检查（比如双重变更检测周期）来让应用运行得更快。

Building for production (or appending the `--environment=prod` flag) enables _production mode_
Look at the CLI-generated `main.ts` to see how this works.

为生产环境构建（或添加 `--environment=prod` 标志）可以启用*生产模式*。
查看 CLI 自动生成的 `main.ts` 文件来了解它的工作原理。

{@a lazy-loading}

### Lazy loading

### 惰性加载

You can dramatically reduce launch time by only loading the application modules that
absolutely must be present when the app starts.

通过只加载应用启动时必须展示的那些应用模块，你可以显著缩减启动时间。

Configure the Angular Router to defer loading of all other modules (and their associated code), either by
[waiting until the app has launched](guide/router#preloading  "Preloading")
or by [_lazy loading_](guide/router#asynchronous-routing "Lazy loading")
them on demand.

配置 Angular 路由器可以延迟加载所有其它模块（以及与它们相关的代码），无论是[等应用启动](guide/router#preloading  "Preloading")，
还是在需要时才[惰性加载](guide/router#asynchronous-routing "Lazy loading")。

#### Don't eagerly import something from a lazy loaded module

#### 不要立即导入惰性加载模块中的任何东西

It's a common mistake.
You've arranged to lazy load a module.
But you unintentionally import it, with a JavaScript `import` statement,
in a file that's eagerly loaded when the app starts, a file such as the root `AppModule`.
If you do that, the module will be loaded immediately.

这是一种常犯的错误。
你本打算惰性加载一个模块，但可能无意中在根模块 `AppModule` 文件中使用一个 JavaScript 的 `import` 语句导入了它。
这样一来，该模块就被立即加载了。

The bundling configuration must take lazy loading into consideration.
Because lazy loaded modules aren't imported in JavaScript (as just noted), bundlers exclude them by default.
Bundlers don't know about the router configuration and won't create separate bundles for lazy loaded modules.
You have to create these bundles manually.

关于打包（bundle）方式的配置必须考虑到惰性加载问题。
因为惰性加载模块不能在 JavaScript 中导入（就像刚才说明的），打包器应该默认排除它们。
打包器不知道路由器的配置，并且不会为延迟加载模块创建单独的包。
你不得不手动创建这些包。

The CLI runs the
[Angular Ahead-of-Time Webpack Plugin](https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack)
which automatically recognizes lazy loaded `NgModules` and creates separate bundles for them.

CLI 会运行 [Angular  AOT 编译 Webpack 插件](https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack)，它会自动识别出那些需要惰性加载的 `NgModule`，并为它们创建单独的文件包。

{@a measure}

### Measure performance

### 性能测量

You can make better decisions about what to optimize and how when you have a clear and accurate understanding of
what's making the application slow.
The cause may not be what you think it is.
You can waste a lot of time and money optimizing something that has no tangible benefit or even makes the app slower.
You should measure the app's actual behavior when running in the environments that are important to you.

如果你能对“是什么导致了应用变慢”的问题有一个清晰、准确的理解，那就可以对优化什么、如何优化做出更好地决策了。
真正的原因可能并不是你所想的那样。
你可能花费大量的时间和金钱去优化一些东西，但它却无法产生可感知的效果甚至让应用变得更慢。
你应该在那些最重要的环境中实际运行，来度量应用的实际行为。

The
<a href="https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing" title="Chrome DevTools Network Performance">
Chrome DevTools Network Performance page</a> is a good place to start learning about measuring performance.

<p><a href="https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing" target="_blank" title="Chrome DevTools Network Performance">
  Chrome 开发工具的网络性能页</a>是开始学习度量性能的好地方。</p>

The [WebPageTest](https://www.webpagetest.org/) tool is another good choice
that can also help verify that your deployment was successful.

[WebPageTest](https://www.webpagetest.org/)工具是另一个不错的选择，它能帮你验证你的部署是否成功了。

{@a inspect-bundle}

### Inspect the bundles

### 深入探查文件包（bundle）

The <a href="https://github.com/danvk/source-map-explorer/blob/master/README.md">source-map-explorer</a>
tool is a great way to inspect the generated JavaScript bundles after a production build.

<a href="https://github.com/danvk/source-map-explorer/blob/master/README.md">source-map-explorer</a> 是在生产环境构建中深入探查所生成的文件包的好工具。

Install `source-map-explorer`:

安装 `source-map-explorer`：

<code-example language="none" class="code-shell">
  npm install source-map-explorer --save-dev
</code-example>

Build your app for production _including the source maps_

构建*带源码映射*的生产版本

<code-example language="none" class="code-shell">
  ng build --prod --source-map
</code-example>

List the generated bundles in the `dist/` folder.

列出 `dist/` 文件夹中生成的文件包。

<code-example language="none" class="code-shell">
  ls dist/*.bundle.js
</code-example>

Run the explorer to generate a graphical representation of one of the bundles.
The following example displays the graph for the _main_ bundle.

运行这个源码映射浏览器，以生成文件包之一的图形化表示。
下面的例子中就是 `main` 这个文件包的图形。

<code-example language="none" class="code-shell">
  node_modules/.bin/source-map-explorer dist/main.*.bundle.js
</code-example>

The `source-map-explorer` analyzes the source map generated with the bundle and draws a map of all dependencies,
showing exactly which classes are included in the bundle.

`source-map-explorer` 分析了文件包生成的源码映射信息，并画出了所有这些依赖的地图，准确的展示了这个包中包含了哪些类。

Here's the output for the _main_ bundle of the QuickStart.

下面是《快速起步》一章生成的 `main` 文件包的输出。

<figure>
  <img src="generated/images/guide/cli-quickstart/quickstart-sourcemap-explorer.png" alt="quickstart sourcemap explorer">
</figure>

{@a base-tag}

## The `base` tag

## `base` 标签

The HTML [_&lt;base href="..."/&gt;_](/guide/router)
specifies a base path for resolving relative URLs to assets such as images, scripts, and style sheets.
For example, given the `<base href="/my/app/">`, the browser resolves a URL such as `some/place/foo.jpg`
into a server request for `my/app/some/place/foo.jpg`.
During navigation, the Angular router uses the _base href_ as the base path to component, template, and module files.

HTML 中的[_&lt;base href="..."/&gt;_](/guide/router)用于指定一个解析相对路径的基地址，如图片、脚本和样式表。
比如，指定 `<base href="/my/app/">` 时，浏览器就会把 `some/place/foo.jpg` 这样的 URL 解析成到 `my/app/some/place/foo.jpg` 的服务端请求。
在浏览期间，Angular 路由器会使用*base href*作为组件、模板和模块文件的基地址。

<div class="alert is-helpful">

See also the [*APP_BASE_HREF*](api/common/APP_BASE_HREF "API: APP_BASE_HREF") alternative.

参见另一种备选方案[*APP_BASE_HREF*](api/common/APP_BASE_HREF "API: APP_BASE_HREF")。

</div>

In development, you typically start the server in the folder that holds `index.html`.
That's the root folder and you'd add `<base href="/">` near the top of `index.html` because `/` is the root of the app.

在开发期间，你通常会在 `index.html` 所在的目录中启动服务器。这个目录就是根目录，因为 `/` 就是本应用的根，所以你要在 `index.html` 的顶部添加 `<base href="/">`。

But on the shared or production server, you might serve the app from a subfolder.
For example, when the URL to load the app is something like `http://www.mysite.com/my/app/`,
the subfolder is `my/app/` and you should add `<base href="/my/app/">` to the server version of the `index.html`.

但是在共享服务器或生产服务器上，你可能得从子目录下启动服务器。
比如，当加载本应用的 URL 是 `http://www.mysite.com/my/app/` 时，子目录就是 `my/app/`，而你就要在服务器版的 `index.html` 中添加 `<base href="/my/app/">`。

When the `base` tag is mis-configured, the app fails to load and the browser console displays `404 - Not Found` errors
for the missing files. Look at where it _tried_ to find those files and adjust the base tag appropriately.

当没有配置 `base` 标签时，加载应用就会失败，浏览器的控制台中会为这些缺失的文件显示一些 `404 - Not Found` 错误。
看看浏览器*试图*从哪里找这些文件，然后调整出合适的 base 标签。

## _build_ vs. _serve_

## *构建*与*服务*

You'll probably prefer `ng build` for deployments.

你会更喜欢用 `ng build` 进行部署。

The **ng build** command is intended for building the app and deploying the build artifacts elsewhere.
The **ng serve** command is intended for fast, local, iterative development.

**ng build** 命令的设计意图是构建该应用，并且把构建成果部署到别处。
而**ng serve** 命令的设计意图是快速进行本地的迭代式开发。

Both `ng build` and `ng serve` **clear the output folder** before they build the project.
The `ng build` command writes generated build artifacts to the output folder.
The `ng serve` command does not.
It serves build artifacts from memory instead for a faster development experience.

在开始构建项目之前，`ng build` 和 `ng serve` **都会清空输出文件夹**。
`ng build` 命令会把生成的构建成果写入输出文件夹中，但 `ng serve` 命令并不会如此。
它会用内存中的构建成果提供服务，以获得更快速的开发体验。

<div class="alert is-helpful">

The output folder is  `dist/` by default.
To output to a different folder, change the `outputPath` in `angular.json`.

默认的输出文件夹是 `dist/`。
要输出到其它文件夹中，请修改 `angular.json` 中的 `outputPath`。

</div>

The `ng serve` command builds, watches, and serves the application from a local CLI development server.

`ng serve` 命令会构建、监听并使用本地的 CLI 开发服务器作为服务器。

The `ng build` command generates output files just once and does not serve them.
The `ng build --watch` command will regenerate output files when source files change.
This `--watch` flag is useful if you're building during development and 
are automatically re-deploying changes to another server.

`ng build` 命令只会生成一次这些输出文件，而不会用它们提供服务。
`ng build --watch` 命令会在源码变化的时候重新生成输出文件。
当你在开发期间需要不断构建并自动把修改后的版本发布到另一台服务器的时候，这个 `--watch` 标志会很有用。

See the [CLI `build` topic](https://github.com/angular/angular-cli/wiki/build) for more details and options.

参见 [CLI 中的 `build` 主题](https://github.com/angular/angular-cli/wiki/build)以了解详情以及其它选项。

<hr>

{@a server-configuration}

## Server configuration

## 服务端配置

This section covers changes you may have make to the server or to files deployed to the server.

这一节涵盖了你可能对服务器或准备部署到服务器的文件要做的那些修改。

{@a fallback}

### Routed apps must fallback to `index.html`

### 带路由的应用必须以 `index.html` 作为后备页面

Angular apps are perfect candidates for serving with a simple static HTML server.
You don't need a server-side engine to dynamically compose application pages because
Angular does that on the client-side.

Angular 应用很适合用简单的静态 HTML 服务器提供服务。
你不需要服务端引擎来动态合成应用页面，因为 Angular 会在客户端完成这件事。

If the app uses the Angular router, you must configure the server
to return the application's host page (`index.html`) when asked for a file that it does not have.

如果该应用使用 Angular 路由器，你就必须配置服务器，让它对不存在的文件返回应用的宿主页(`index.html`)。

{@a deep-link}

A routed application should support "deep links".
A _deep link_ is a URL that specifies a path to a component inside the app.
For example, `http://www.mysite.com/heroes/42` is a _deep link_ to the hero detail page
that displays the hero with `id: 42`.

带路由的应用应该支持“深链接”。
所谓*深链接*就是指一个 URL，它用于指定到应用内某个组件的路径。
比如，`http://www.mysite.com/heroes/42` 就是一个到英雄详情页面的*深链接*，用于显示 `id: 42` 的英雄。

There is no issue when the user navigates to that URL from within a running client.
The Angular router interprets the URL and routes to that page and hero.

当用户从运行中的客户端应用导航到这个 URL 时，这没问题。
Angular 路由器会拦截这个 URL，并且把它路由到正确的页面。

But clicking a link in an email, entering it in the browser address bar,
or merely refreshing the browser while on the hero detail page &mdash;
all of these actions are handled by the browser itself, _outside_ the running application.
The browser makes a direct request to the server for that URL, bypassing the router.

但是，当从邮件中点击链接或在浏览器地址栏中输入它或仅仅在英雄详情页刷新下浏览器时，所有这些操作都是由浏览器本身处理的，在应用的控制范围之外。
浏览器会直接向服务器请求那个 URL，路由器没机会插手。

A static server routinely returns `index.html` when it receives a request for `http://www.mysite.com/`.
But it rejects `http://www.mysite.com/heroes/42` and returns a `404 - Not Found` error *unless* it is
configured to return `index.html` instead.

静态服务器会在收到对 `http://www.mysite.com/` 的请求时返回 `index.html`，但是会拒绝对 `http://www.mysite.com/heroes/42` 的请求，
并返回一个 `404 - Not Found` 错误，除非，它被配置成了返回 `index.html`。

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

   [Lite-Server](https://github.com/johnpapa/lite-server)是["快速上手"仓库](https://github.com/angular/quickstart)中安装的默认开发服务器，它被预先配置为回退到 `index.html`。

* [Webpack-Dev-Server](https://github.com/webpack/webpack-dev-server):  setup the
`historyApiFallback` entry in the dev server options as follows:

   [Webpack-Dev-Server](https://github.com/webpack/webpack-dev-server)在开发服务器的配置中设置了 `historyApiFallback`，代码如下：

  <code-example>
    historyApiFallback: {
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
    }
  </code-example>

#### Production servers

#### 生产服务器

* [Apache](https://httpd.apache.org/): add a
[rewrite rule](http://httpd.apache.org/docs/current/mod/mod_rewrite.html) to the `.htaccess` file as shown
  (https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/):

   [Apache](https://httpd.apache.org/)：在 `.htaccess` 文件中添加一个[重写规则](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)，
代码如下（[出处](https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/)）：

  <code-example format=".">
    RewriteEngine On
    &#35 If an existing asset or directory is requested go to it as it is
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]

    &#35 If the requested resource doesn't exist, use index.html
    RewriteRule ^ /index.html
  </code-example>

* [NGinx](http://nginx.org/): use `try_files`, as described in
[Front Controller Pattern Web Apps](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps),
modified to serve `index.html`:

   [NGinx](http://nginx.org/)：使用 `try_files` 指向 `index.html`，详细描述见[Web 应用的前端控制器模式](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps)。

  <code-example format=".">
    try_files $uri $uri/ /index.html;
  </code-example>

* [IIS](https://www.iis.net/): add a rewrite rule to `web.config`, similar to the one shown
[here](http://stackoverflow.com/a/26152011/2116927):

   [IIS](https://www.iis.net/)：往 `web.config` 中添加一条重写规则，类似于[这里](http://stackoverflow.com/a/26152011/2116927)：

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
            &lt;action type="Rewrite" url="/index.html" /&gt;
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

   [GitHub 页面服务](https://pages.github.com/)：你没办法[直接配置](https://github.com/isaacs/github/issues/408) Github 的页面服务，但可以添加一个 404 页，只要把 `index.html` 复制到 `404.html` 就可以了。
  它仍然会给出一个 404 响应，但是浏览器将会正确处理该页，并正常加载该应用。
  使用[在主分支的 `docs/` 下启动服务](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)
  并[创建一个 `.nojekyll` 文件](https://www.bennadel.com/blog/3181-including-node-modules-and-vendors-folders-in-your-github-pages-site.htm)也是一个好办法。

* [Firebase hosting](https://firebase.google.com/docs/hosting/): add a
[rewrite rule](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites).

   [Firebase 主机服务](https://firebase.google.com/docs/hosting/)：添加一条[重写规则](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites)。

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
<i>cross-origin resource sharing</i></a> error when making a service request (typically a data service request)
to a server other than the application's own host server.
Browsers forbid such requests unless the server permits them explicitly.

Angular 开发者在向与该应用的宿主服务器不同域的服务器发起请求时，可能会遇到一种<a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" target="_blank" title="Cross-origin resource sharing"><i>跨域资源共享（CORS）</i></a>错误。
浏览器会阻止该请求，除非得到那台服务器的明确许可。

There isn't anything the client application can do about these errors.
The server must be configured to accept the application's requests.
Read about how to enable CORS for specific servers at
<a href="http://enable-cors.org/server.html" title="Enabling CORS server">enable-cors.org</a>.

客户端应用对这种错误无能为力。
服务器必须配置成可以接受来自该应用的请求。
要了解如何对特定的服务器开启 CORS，参见<a href="http://enable-cors.org/server.html" target="_blank" title="Enabling CORS server">enable-cors.org</a>。
