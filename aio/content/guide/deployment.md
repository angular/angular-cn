# Deployment

# 部署

When you are ready to deploy your Angular application to a remote server, you have various options for deployment.

当你准备把 Angular 应用部署到远程服务器上时，有很多可选的部署方式。

{@a dev-deploy}

{@a copy-files}

## Simple deployment options

## 最简单的部署选项

Before fully deploying your application, you can test the process, build configuration, and deployed behavior by using one of these interim techniques.

在完整部署应用之前，你可以先临时用一种技术来测试流程、构建配置和部署行为。

### Building and serving from disk

### 从磁盘构建和提供服务

During development, you typically use the `ng serve` command to build, watch, and serve the application from local memory, using [webpack-dev-server](https://webpack.js.org/guides/development/#webpack-dev-server).
When you are ready to deploy, however, you must use the `ng build` command to build the app and deploy the build artifacts elsewhere.

在开发过程中，你通常会使用 `ng serve` 命令来借助 [webpack-dev-server](https://webpack.js.org/guides/development/#webpack-dev-server) 在本地内存中构建、监控和提供服务。但是，当你打算部署它时，就必须使用 `ng build` 命令来构建应用并在其它地方部署这些构建成果。

Both `ng build` and `ng serve` clear the output folder before they build the project, but only the `ng build` command writes the generated build artifacts to the output folder.

`ng build` 和 `ng serve` 在构建项目之前都会清除输出文件夹，但只有 `ng build` 命令会把生成的构建成果写入输出输出文件夹中。

<div class="alert is-helpful">

The output folder is  `dist/project-name/` by default.
To output to a different folder, change the `outputPath` in `angular.json`.

默认情况下，输出目录是 `dist/project-name/`。要输出到其它文件夹，就要修改 `angular.json` 中的 `outputPath`。

</div>

As you near the end of the development process, serving the contents of your output folder from a local web server can give you a better idea of how your application will behave when it is deployed to a remote server.
You will need two terminals to get the live-reload experience.

当开发临近收尾时，让本地 Web 服务器使用输出文件夹中的内容提供服务可以让你更好地了解当应用部署到远程服务器时的行为。你需要用两个终端才能体验到实时刷新的特性。

* On the first terminal, run the [`ng build` command](cli/build) in *watch* mode to compile the application to the `dist` folder.

  在第一个终端上，在*监控（watch）*模式下执行 [`ng build` 命令](cli/build)把该应用编译进 `dist` 文件夹。

  <code-example language="none" class="code-shell">

   ng build --watch

  </code-example>

  Like the `ng serve` command, this regenerates output files when source files change.

  与 `ng serve` 命令一样，当源文件发生变化时，就会重新生成输出文件。

* On the second terminal, install a web server (such as [lite-server](https://github.com/johnpapa/lite-server)), and run it against the output folder. For example:

  在第二个终端上，安装一个 Web 服务器（比如 [lite-server](https://github.com/johnpapa/lite-server) ），然后使用输出文件夹中的内容运行它。例如：

  <code-example language="none" class="code-shell">

   lite-server --baseDir="dist/project-name"

  </code-example>

   The server will automatically reload your browser when new files are output.

   每当输出了新文件时，服务器就会自动刷新你的浏览器。

<div class="alert is-critical">

This method is for development and testing only, and is not a supported or secure way of deploying an application.

该方法只能用于开发和测试，在部署应用时，它不受支持，也不是安全的方式。

</div>

### Automatic deployment with the CLI

### 使用 CLI 进行自动部署

The Angular CLI command `ng deploy` (introduced in version 8.3.0) executes the `deploy` [CLI builder](guide/cli-builder) associated with your project. A number of third-party builders implement deployment capabilities to different platforms. You can add any of them to your project by running `ng add [package name]`.

Angular CLI 命令 `ng deploy`（在版本 8.3.0 中引入）执行与你的项目关联的 `deploy` [CLI 构建器](guide/cli-builder)。有许多第三方构建器实现了到不同平台的部署功能。你可以通过运行 `ng add [package name]` 把它们中的任何一个添加到项目中。

When you add a package with deployment capability, it'll automatically update your workspace configuration (`angular.json` file) with a `deploy` section for the selected project. You can then use the `ng deploy` command to deploy that project.

添加具有部署功能的程序包时，它将为所选项目自动更新自动更新工作区配置（`angular.json` 文件）中的 `deploy` 部分。然后，你就可以使用 `ng deploy` 命令来部署该项目了。

For example, the following command automatically deploys a project to Firebase.

例如，以下命令将项目自动部署到 Firebase。

<code-example language="none" class="code-shell">
ng add @angular/fire
ng deploy
</code-example>

The command is interactive. In this case, you must have or create a Firebase account, and authenticate using that account. The command prompts you to select a Firebase project for deployment

该命令是交互式的。在这种情况下，你必须拥有或创建 Firebase 帐户，并使用该帐户进行身份验证。该命令提示你选择要部署的 Firebase 项目。

After the command produces an optimal build of your application (equivalent to `ng deploy --prod`), it'll upload the production assets to Firebase.

该命令会为你的应用程序生成最佳构建（等效于 `ng deploy --prod`）后，将生产环境下的资产文件上传到 Firebase。

In the table below, you can find a list of packages which implement deployment functionality to different platforms. The `deploy` command for each package may require different command line options. You can read more by following the links associated with the package names below:

在下表中，你可以找到实现了到不同平台部署功能的软件包列表。每个软件包的 `deploy` 命令可能需要不同的命令行选项。你可以通过以下与包名称相关的链接来阅读更多内容：

| Deployment to                                                 | Package                                                                        |
|---------------------------------------------------------------|--------------------------------------------------------------------------------|
| 部署到                                                 | NPM 包                                                                        |
| [Firebase hosting](https://firebase.google.com/docs/hosting)  | [`@angular/fire`](https://npmjs.org/package/@angular/fire)                     |
| [Azure](https://azure.microsoft.com/en-us/)                   | [`@azure/ng-deploy`](https://npmjs.org/package/@azure/ng-deploy)               |
| [Now](https://zeit.co/now)                                    | [`@zeit/ng-deploy`](https://npmjs.org/package/@zeit/ng-deploy)                 |
| [Netlify](https://www.netlify.com/)                           | [`@netlify-builder/deploy`](https://npmjs.org/package/@netlify-builder/deploy) |
| [GitHub pages](https://pages.github.com/)                     | [`angular-cli-ghpages`](https://npmjs.org/package/angular-cli-ghpages)         |
| [NPM](https://npmjs.com/)                                     | [`ngx-deploy-npm`](https://npmjs.org/package/ngx-deploy-npm)                   |
| [Amazon Cloud S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_st_s3) | [`@jefiozie/ngx-aws-deploy`](https://www.npmjs.com/package/@jefiozie/ngx-aws-deploy) |

If you're deploying to a self-managed server or there's no builder for your favorite cloud platform, you can either create a builder that allows you to use the `ng deploy` command, or read through this guide to learn how to manually deploy your app.

如果要部署到自己管理的服务器上，或者缺少针对你喜欢的云平台的构建器，则可以创建支持你使用 `ng deploy` 命令的构建器，或者通读本指南以了解如何手动部署应用程序。

### Basic deployment to a remote server

### 最简化的部署方式

For the simplest deployment, create a production build and copy the output directory to a web server.

最简化的部署方式就是为开发环境构建，并把其输出复制到 Web 服务器上。

1. Start with the production build:

   使用开发环境进行构建

  <code-example language="none" class="code-shell">

    ng build --prod

  </code-example>

2. Copy _everything_ within the output folder (`dist/` by default) to a folder on the server.

   把输出目录（默认为 `dist/`）下的*每个文件*都复制到到服务器上的某个目录下。

3. Configure the server to redirect requests for missing files to `index.html`.
Learn more about server-side redirects [below](#fallback).

   配置服务器，让缺失的文件都重定向到 `index.html` 上。
   欲知详情，参见[稍后](#fallback)的服务端重定向部分。

This is the simplest production-ready deployment of your application.

这是对应用进行生产环境部署的最简方式。

{@a deploy-to-github}

### Deploy to GitHub pages

### 发布到 GitHub pages（页面服务）

Another simple way to deploy your Angular app is to use [GitHub Pages](https://help.github.com/articles/what-is-github-pages/).

另一种发布 Angular 应用的简单途径是使用 [GitHub Pages](https://help.github.com/articles/what-is-github-pages/)。

1. You need to [create a GitHub account](https://github.com/join) if you don't have one, and then [create a repository](https://help.github.com/articles/create-a-repo/) for your project.
Make a note of the user name and project name in GitHub.

   你需要[创建一个 GitHub 账号](https://github.com/join)（如果没有的话），然后为你的项目[创建一个仓库](https://help.github.com/articles/create-a-repo/)。记下 GitHub 中的用户名和项目名。

1. Build your project using Github project name, with the Angular CLI command [`ng build`](cli/build) and the options shown here:

   使用 Angular CLI 命令 [`ng build`](cli/build) 来构建这个 GitHub 项目，选项如下：

   <code-example language="none" class="code-shell">
     ng build --prod --output-path docs --base-href /&lt;project_name&gt;/

  </code-example>

1. When the build is complete, make a copy of `docs/index.html` and name it `docs/404.html`.

   当构建完成时，把 `docs/index.html` 复制为 `docs/404.html`。

1. Commit your changes and push.

   提交你的更改，并推送。

1. On the GitHub project page, configure it to [publish from the docs folder](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch).

   在 GitHub 的项目页中，把该项目配置为[从 docs 目录下发布](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)。

You can see your deployed page at `https://<user_name>.github.io/<project_name>/`.

你可以到 `https://<user_name>.github.io/<project_name>/` 中查看部署好的页面。

<div class="alert is-helpful">

Check out [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages), a full featured package that does all this for you and has extra functionality.

 参见 [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages)，这个包用到了全部这些特性，还提供了一些额外功能。

</div>

<hr>

{@a server-configuration}

## Server configuration

## 服务端配置

This section covers changes you may have to make to the server or to files deployed on the server.

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

* [Apache](https://httpd.apache.org/): add a
[rewrite rule](http://httpd.apache.org/docs/current/mod/mod_rewrite.html) to the `.htaccess` file as shown
  (https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/):

   [Apache](https://httpd.apache.org/)：在 `.htaccess` 文件中添加一个[重写规则](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)，
代码如下（[出处](https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/)）：

  <code-example>
    RewriteEngine On
    &#35 If an existing asset or directory is requested go to it as it is
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]<br>
    &#35 If the requested resource doesn't exist, use index.html
    RewriteRule ^ /index.html
  </code-example>

* [Nginx](http://nginx.org/): use `try_files`, as described in
[Front Controller Pattern Web Apps](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps),
modified to serve `index.html`:

   [NGinx](http://nginx.org/)：使用 `try_files` 指向 `index.html`，详细描述见[Web 应用的前端控制器模式](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps)。

  ```

  try_files $uri $uri/ /index.html;

* [Ruby](https://www.ruby-lang.org/): create a Ruby server using ([sinatra](http://sinatrarb.com/)) with a basic Ruby file that configures the server `server.rb`:

  [Ruby](https://www.ruby-lang.org/)：使用 [sinatra](http://sinatrarb.com/) 和用来配置服务器的基础 Ruby 文件 `server.rb` 创建一个 Ruby 服务器：

  ``` ruby
  require 'sinatra'

  # Folder structure

  # .

  # -- server.rb

  # -- public

  #    |-- dist

  #        |-- index.html

  get '/' do
      folderDir = settings.public_folder + '/dist'  # ng build output folder
      send_file File.join(folderDir, 'index.html')
  end

  ```

* [IIS](https://www.iis.net/): add a rewrite rule to `web.config`, similar to the one shown
[here](http://stackoverflow.com/a/26152011/2116927):

   [IIS](https://www.iis.net/)：往 `web.config` 中添加一条重写规则，类似于[这里](http://stackoverflow.com/a/26152011/2116927)：

  <code-example format='.' language="xml">
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

  <code-example language="json">
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

<hr>

{@a optimize}

## Production optimizations

## 为生产环境优化

The `--prod` _meta-flag_ engages the following build optimization features.

`--prod` 标志具有如下优化特性。

* [Ahead-of-Time (AOT) Compilation](guide/aot-compiler): pre-compiles Angular component templates.

  [预先(AOT)编译](guide/aot-compiler)：预编译 Angular 的组件模板。

* [Production mode](#enable-prod-mode): deploys the production environment which enables _production mode_.

  [生产模式](#enable-prod-mode)：部署到启用了*生产模式*的生产环境。

* Bundling: concatenates your many application and library files into a few bundles.

  打包：把你的多个应用于库文件拼接到少量包（bundle）中。

* Minification: removes excess whitespace, comments, and optional tokens.

  最小化：删除多余的空格、注释和可选令牌。

* Uglification: rewrites code to use short, cryptic variable and function names.

  混淆/丑化：重写代码，使用简短的、不容易理解的变量名和函数名。

* Dead code elimination: removes unreferenced modules and much unused code.

  消除死代码：删除未引用过的模块和很多未用到的代码。

See [`ng build`](cli/build) for more about CLI build options and what they do.

要了解关于 CLI 构建选项及其作用的更多知识，参见 [`ng build`](cli/build)。

{@a enable-prod-mode}

### Enable runtime production mode

### 启用生产模式

In addition to build optimizations, Angular also has a runtime production mode. Angular apps run in development mode by default, as you can see by the following message on the browser console:

除了构建期优化之外，Angular 还支持运行期生产模式。Angular 应用默认运行在开发模式下，你可以在浏览器的控制台中看到如下信息：

<code-example format="nocode">

  Angular is running in development mode. Call enableProdMode() to enable production mode.

</code-example>

Switching to _production mode_ makes it run faster by disabling development specific checks such as the dual change detection cycles.

切换到*生产模式*可以通过禁用开发阶段特有的检查（比如双重变更检测周期）来让它运行得更快。

When you enable production builds via `--prod` command line flag, the runtime production mode is enabled as well.

如果在构建时添加了 `--prod` 标识，也会同时启用*运行期生产模式*。

{@a lazy-loading}

### Lazy loading

### 惰性加载

You can dramatically reduce launch time by only loading the application modules that
absolutely must be present when the app starts.

通过只加载应用启动时绝对必须的那些模块，你可以极大缩短应用启动的时间。

Configure the Angular Router to defer loading of all other modules (and their associated code), either by
[waiting until the app has launched](guide/router#preloading  "Preloading")
or by [_lazy loading_](guide/router#lazy-loading "Lazy loading")
them on demand.

可以配置 Angular 的路由器，来推迟所有其它模块（及其相关代码）的加载时机，方法有[一直等到应用启动完毕](guide/router#preloading  "Preloading")，或者当用到时才按需[*惰性加载*](guide/router#asynchronous-routing "Lazy loading")。

<div class="callout is-helpful">

<header>Don't eagerly import something from a lazy-loaded module</header>

<header>不要急性（eagerly）导入来自惰性加载模块中的任何东西</header>

If you mean to lazy-load a module, be careful not import it
in a file that's eagerly loaded when the app starts (such as the root `AppModule`).
If you do that, the module will be loaded immediately.

如果要惰性加载某个模块，就要小心别在应用启动时要急性加载的模块（比如根模块 `AppModule`）中导入它。
如果那么做，该模块就会立刻加载起来。

The bundling configuration must take lazy loading into consideration.
Because lazy-loaded modules aren't imported in JavaScript, bundlers exclude them by default.
Bundlers don't know about the router configuration and can't create separate bundles for lazy-loaded modules.
You would have to create these bundles manually.

配置打包方式时必须考虑惰性加载。
因为默认情况下惰性加载的模块没有在 JavaScript 中导入过，因此打包器默认会排除它们。
打包器不认识路由器配置，也就不能为惰性加载的模块创建独立的包。
你必须手动创建这些包。

The CLI runs the
[Angular Ahead-of-Time Webpack Plugin](https://github.com/angular/angular-cli/tree/master/packages/ngtools/webpack)
which automatically recognizes lazy-loaded `NgModules` and creates separate bundles for them.

CLI 会运行 [Angular Ahead-of-Time Webpack 插件](https://github.com/angular/angular-cli/tree/master/packages/ngtools/webpack)，它会自动识别出惰性加载的 `NgModules`，并为它们创建独立的包。

</div>

{@a measure}

### Measure performance

### 测量性能

You can make better decisions about what to optimize and how when you have a clear and accurate understanding of
what's making the application slow.
The cause may not be what you think it is.
You can waste a lot of time and money optimizing something that has no tangible benefit or even makes the app slower.
You should measure the app's actual behavior when running in the environments that are important to you.

如果你对哪些东西拖慢了应用有更加清晰、精确的了解，就可以更好地决定优化什么以及如何优化。
慢的原因可能和你所想的不一样。
你可能花费了大量的时间和金钱来优化一些实际上无关紧要的东西，甚至可能让应用变得更慢。
你应该测量应用在运行环境中的实际行为，这才是最重要的。

<p>
The
<a href="https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing" title="Chrome DevTools Network Performance">
Chrome DevTools Network Performance page</a> is a good place to start learning about measuring performance.
</p>

<p><a href="https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing" title="Chrome DevTools Network Performance">
Chrome DevTools 的网络和性能页</a>是你开始学习如何测量性能的好地方。</p>

The [WebPageTest](https://www.webpagetest.org/) tool is another good choice
that can also help verify that your deployment was successful.

[WebPageTest](https://www.webpagetest.org/)工具是另一个不错的选择，它还能帮你验证这次部署是否成功。

{@a inspect-bundle}

### Inspect the bundles

### 检查发布包

The <a href="https://github.com/danvk/source-map-explorer/blob/master/README.md">source-map-explorer</a>
tool is a great way to inspect the generated JavaScript bundles after a production build.

<a href="https://github.com/danvk/source-map-explorer/blob/master/README.md">source-map-explorer</a> 工具可以帮你在生产环境构建之后探查 JavaScript 包。

Install `source-map-explorer`:

安装 `source-map-explorer`：

<code-example language="none" class="code-shell">

  npm install source-map-explorer --save-dev

</code-example>

Build your app for production _including the source maps_

为生产环境构建应用，包括源码映射表（source map）

<code-example language="none" class="code-shell">

  ng build --prod --source-map

</code-example>

List the generated bundles in the `dist/` folder.

在 `dist/` 目录下列出生成的包。

<code-example language="none" class="code-shell">

  ls dist/*.bundle.js

</code-example>

Run the explorer to generate a graphical representation of one of the bundles.
The following example displays the graph for the _main_ bundle.

运行浏览器来生成其中一个包的图形化表示。
下面的例子展示了 `main` 包的图表。

<code-example language="none" class="code-shell">

  node_modules/.bin/source-map-explorer dist/main.*.bundle.js

</code-example>

The `source-map-explorer` analyzes the source map generated with the bundle and draws a map of all dependencies,
showing exactly which classes are included in the bundle.

`source-map-explorer` 会分析与包一起生成的 source map，并画出所有依赖的地图，精确展示哪些类包含在哪个包中。

Here's the output for the _main_ bundle of an example app called `cli-quickstart`.

下面是范例应用 `cli-quickstart` 中 `main` 包的输出。

<div class="lightbox">

  <img src="generated/images/guide/deployment/quickstart-sourcemap-explorer.png" alt="quickstart sourcemap explorer">

</div>

{@a base-tag}

## The `base` tag

## `base` 标签

The HTML [_&lt;base href="..."/&gt;_](/guide/router)
specifies a base path for resolving relative URLs to assets such as images, scripts, and style sheets.
For example, given the `<base href="/my/app/">`, the browser resolves a URL such as `some/place/foo.jpg`
into a server request for `my/app/some/place/foo.jpg`.
During navigation, the Angular router uses the _base href_ as the base path to component, template, and module files.

HTML 的 [_&lt;base href="..."/&gt;_](/guide/router) 标签指定了用于解析静态文件（如图片、脚本和样式表）相对地址的基地址。
比如，对于 `<base href="/my/app/">`，浏览器就会把 `some/place/foo.jpg` 这样的 URL 解析成到 `my/app/some/place/foo.jpg` 的请求。
在导航期间，Angular 路由器使用 *base href* 作为到组件模板文件和模块文件的基地址。

<div class="alert is-helpful">

See also the [*APP_BASE_HREF*](api/common/APP_BASE_HREF "API: APP_BASE_HREF") alternative.

另一种方式参见 [*APP_BASE_HREF*](api/common/APP_BASE_HREF "API: APP_BASE_HREF")。

</div>

In development, you typically start the server in the folder that holds `index.html`.
That's the root folder and you'd add `<base href="/">` near the top of `index.html` because `/` is the root of the app.

在开发期间，你通常会在存有 `index.html` 的目录下启动开发服务器。
那就是根目录，你要在 `index.html` 的顶部附近添加 `<base href="/">`，因为 `/` 就是该应用的根路径。

But on the shared or production server, you might serve the app from a subfolder.
For example, when the URL to load the app is something like `http://www.mysite.com/my/app/`,
the subfolder is `my/app/` and you should add `<base href="/my/app/">` to the server version of the `index.html`.

但是在共享或生产服务器上，你可能会在子目录下启动服务器。
比如，当前应用的加载地址可能类似于 `http://www.mysite.com/my/app/`，这里的子目录就是 `my/app/`。所以你就要往服务端版本的 `index.html` 中添加 `<base href="/my/app/">`。

When the `base` tag is mis-configured, the app fails to load and the browser console displays `404 - Not Found` errors
for the missing files. Look at where it _tried_ to find those files and adjust the base tag appropriately.

这里如果不配置 `base` 标签，应用就会失败，并在浏览器的控制台中为缺失的文件显示一个 `404 - Not Found` 错误。看看它*试图*从哪里去查找那些文件，并据此调整 base 标签。

{@a differential-loading}

## Differential Loading

## 差异化加载

When building web applications, you want to make sure your application is compatible with the majority of browsers.
Even as JavaScript continues to evolve, with new features being introduced, not all browsers are updated with support for these new features at the same pace.

在构建 Web 应用时，你肯定想确保你的应用与大多数浏览器兼容。JavaScript 在不断发展，新功能不断推出，不是所有浏览器都能以同样的进度实现这些新功能。

The code you write in development using TypeScript is compiled and bundled into ES2015, the JavaScript syntax that is compatible with most browsers.
All modern browsers support ES2015 and beyond, but in most cases, you still have to account for users accessing your application from a browser that doesn't.
When targeting older browsers, [polyfills](guide/browser-support#polyfills) can bridge the gap by providing functionality that doesn't exist in the older versions of JavaScript supported by those browsers.

你在开发过程中使用 TypeScript 编写的代码会被编译并打包成 ES2015，这种 JavaScript
 语法兼容大多数浏览器。
 所有现代浏览器都支持 ES2015 和更新的版本，但是大多数情况下，你仍然要让用户能从不支持它的浏览器中访问你的应用。
 当以老式浏览器为目标时，[腻子脚本（polyfills）](guide/browser-support#polyfills)可以提供一些老式浏览器中不存在的功能，从而抹平这种差距。

To maximize compatibility, you could ship a single bundle that includes all your compiled code, plus any polyfills that may be needed.
Users with modern browsers, however, shouldn't have to pay the price of increased bundle size that comes with polyfills they don't need.
Differential loading, which is supported in Angular CLI version 8 and higher, can help solve this problem.

为了最大限度地提高兼容性，你可以发布一个包含所有已编译代码的发布包（bundle），以及所有可能会用到的腻子脚本。用户如果在支持大量最新 JavaScript 特性的现代浏览器中使用此应用，就不应该为这些他们用不到的包带来的额外体积付出代价。差异化加载可以帮你解决这个问题。Angular CLI 8 及更高版本就支持它。

Differential loading is a strategy that allows your web application to support multiple browsers, but only load the necessary code that the browser needs. When differential loading is enabled the CLI builds two separate bundles as part of your deployed application.

差异化加载是一种策略，它能让你的应用支持多种浏览器，但是只加载当前浏览器必须用到的代码。
当启用了差异化加载时，CLI 会构建出两个单独的包，作为你要发布的应用的一部分。

* The first bundle contains modern ES2015 syntax. This bundle takes advantage of built-in support in modern browsers, ships fewer polyfills, and results in a smaller bundle size.

  第一个包是使用现代的 ES2015 语法，它能发挥现代浏览器内置支持的优势，发布更少的腻子脚本，因此打包尺寸更小。

* The second bundle contains code in the old ES5 syntax, along with all necessary polyfills. This second bundle is larger, but supports older browsers.

  第二个包使用老式的 ES5 语法，包含所有必要的腻子脚本。第二个包的尺寸更大，但是支持老式浏览器。

### Differential builds

### 差异化构建

When you deploy using the Angular CLI build process, you can choose how and when to support differential loading.
The [`ng build` CLI command](cli/build) queries the browser configuration and the configured build target to determine if support for legacy browsers is required, and whether the build should produce the necessary bundles used for differential loading.

使用 Angular CLI 构建过程进行部署时，可以选择如何以及何时支持差异化加载。[`ng build` CLI 命令](cli/build)会查询浏览器配置和配置的构建目标，以确定是否需要支持旧版浏览器，以及该构建是否应产生用于差异化加载的必要捆绑包。

The following configurations determine your requirements.

会根据下列配置确定你的要求。

* Browserslist

  浏览器列表

   The Browserslist configuration file is included in your application [project structure](guide/file-structure#application-configuration-files) and provides the minimum browsers your application supports. See the [Browserslist spec](https://github.com/browserslist/browserslist) for complete configuration options.

   `browserslist` 配置文件包含在应用的[项目结构中](guide/file-structure#application-configuration-files)，它提供了本应用打算支持的最低浏览器版本。有关完整的配置选项，请参阅 [Browserslist 规范](https://github.com/browserslist/browserslist)。

* TypeScript configuration

  TypeScript 配置

  In the TypeScript configuration file, the "target" option in the `compilerOptions` section determines the ECMAScript target version that the code is compiled to.
   Modern browsers support ES2015 natively, while ES5 is more commonly used to support legacy browsers.

  在 TypeScript 配置文件中，`compilerOptions` 区的 `target` 选项会决定编译后代码的 ECMAScript 目标版本。现代浏览器原生支持 ES2015，而 ES5 则更常用于支持老式浏览器。

<div class="alert is-helpful">

   Differential loading is currently only supported when using `es2015` as a compilation target. When used with targets higher than `es2015`, the build process emits a warning.

   当前仅在将 `es2015` 用作编译目标时才支持差异化加载。当目标高于 `es2015` 时，构建过程将发出警告。

</div>

For a development build, the output produced by `ng build` is simpler and easier to debug, allowing you to rely less on sourcemaps of compiled code.

对于开发版本，由 `ng build` 生成的输出更简单且易于调试，从而减小你对编译代码的 sourcemaps 的依赖。

For a production build, your configuration determines which bundles are created for deployment of your application.
When needed, the `index.html` file is also modified during the build process to include script tags that enable differential loading, as shown in the following example.

对于生产版本，你的配置将决定创建哪些捆绑软件来部署你的应用程序。必要时，还会在构建过程中修改 `index.html` 文件，以包括启用差异化加载的脚本标签，如以下示例所示。

<code-example language="html" header="index.html">
&lt;body>
  &lt;app-root>&lt;/app-root>
  &lt;script src="runtime-es2015.js" type="module">&lt;/script>
  &lt;script src="runtime-es5.js" nomodule>&lt;/script>
  &lt;script src="polyfills-es2015.js" type="module">&lt;/script>
  &lt;script src="polyfills-es5.js" nomodule>&lt;/script>
  &lt;script src="styles-es2015.js" type="module">&lt;/script>
  &lt;script src="styles-es5.js" nomodule>&lt;/script>
  &lt;script src="vendor-es2015.js" type="module">&lt;/script>
  &lt;script src="vendor-es5.js" nomodule>&lt;/script>
  &lt;script src="main-es2015.js" type="module">&lt;/script>
  &lt;script src="main-es5.js" nomodule>&lt;/script>
&lt;/body>
</code-example>

Each script tag has a `type="module"` or `nomodule` attribute. Browsers with native support for ES modules only load the scripts with the `module` type attribute and ignore scripts with the `nomodule` attribute. Legacy browsers only load the scripts with the `nomodule` attribute, and ignore the script tags with the `module` type that load ES modules.

每个 script 标签都有一个 `type="module"` 或 `nomodule` 属性。原生支持 ES 模块的浏览器只会加载带有该类型属性的脚本，而忽略那些带有 `nomodule` 属性的脚本。而老式浏览器只会加载带有 `nomodule` 属性的脚本，而忽略那些 type 为 `module` 的脚本标签。

<div class="alert is-helpful">

   Some legacy browsers still download both bundles, but only execute the appropriate scripts based on the attributes mentioned above. You can read more on the issue [here](https://github.com/philipwalton/webpack-esnext-boilerplate/issues/1).

  一些旧版浏览器仍会下载两个捆绑包，但只会根据上述属性执行适当的脚本。你可以在[此处](https://github.com/philipwalton/webpack-esnext-boilerplate/issues/1)阅读有关此问题的更多[信息](https://github.com/philipwalton/webpack-esnext-boilerplate/issues/1)。

</div>

### Configuring differential loading

### 配置差异化加载

To include differential loading in your application builds, you must configure the Browserslist and TypeScript configuration files in your application project.

要想在构建应用时包含差异化加载特性，你必须修改项目中的 Browserslist 和 TypeScript 配置文件。

The following examples show a `browserlistrc` and `tsconfig.json` file for a newly created Angular application. In this configuration, legacy browsers such as IE 9-11 are ignored, and the compilation target is ES2015.

下面的例子展示了新创建的 Angular 应用的 `browserlistrc` 和 `tsconfig.json` 文件。
在这份配置中，老式浏览器（比如 IE 9-11）都被忽略了，其编译目标是 ES2015。 

<code-example language="none" header="browserslistrc">
# This file is used by the build system to adjust CSS and JS output to support the specified browsers below.
# For additional information regarding the format and rule options, please see:
# https://github.com/browserslist/browserslist#queries

# For the full list of supported browsers by the Angular framework, please see:
# https://angular.io/guide/browser-support

# You can see what browsers were selected by your queries by running:
#   npx browserslist

last 1 Chrome version
last 1 Firefox version
last 2 Edge major versions
last 2 Safari major version
last 2 iOS major versions
Firefox ESR
not IE 9-11 # For IE 9-11 support, remove 'not'.
</code-example>

<code-example language="json" header="tsconfig.json">

{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "esnext",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  }
}

</code-example>

<div class="alert is-important">

   To see which browsers are supported and determine which settings meet to your browser support requirements, see the [Browserslist compatibility page](https://browserl.ist/?q=%3E+0.5%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead%2C+not+IE+9-11).

   要查看浏览器的支持度，以决定哪些设置适合你要支持的浏览器，请参阅“ [浏览器列表兼容性”页面](https://browserl.ist/?q=%3E+0.5%25%2C+last+2+versions%2C+Firefox+ESR%2C+Chrome+41%2C+not+dead%2C+not+IE+9-11)。

</div>

The Browserslist configuration allows you to ignore browsers without ES2015 support. In this case, a single build is produced.

Browserslist 配置允许你忽略不支持 ES2015 的浏览器。在这种情况下，将只生成一个版本。

If your Browserslist configuration includes support for any legacy browsers, the build target in the TypeScript configuration determines whether the build will support differential loading.

如果你的 Browserslist 配置包括对所有旧版浏览器的支持，则 TypeScript 配置中的构建目标将确定该构建是否将支持差异化加载。

{@a configuration-table }

| Browserslist | ES target | Build result |
| -------- | -------- | -------- |
| 浏览器列表 | ES 目标 | 构建结果 |
| ES5 support disabled | es2015  | Single build, ES5 not required |
| 禁用 ES5 支持 | es2015  | 单一构建，不行可 ES5 |
| ES5 support enabled  | es5     | Single build w/conditional polyfills for ES5 only |
| 启用 ES5 支持  | es5     | 单一构建，按需附带只供 ES5 使用的腻子脚本  |
| ES5 support enabled  | es2015  | Differential loading (two builds w/conditional polyfills) |

{@a test-and-serve}

## Local development in older browsers

## 旧版浏览器中的本地开发

In Angular CLI version 8 and higher, differential loading is enabled by default for the `ng build` command.
The `ng serve`, `ng test`, and `ng e2e` commands, however, generate a single ES2015 build which cannot run in older browsers that don't support the modules, such as IE 11.

在 Angular CLI 版本 8 和更高版本中，默认情况下会为 `ng build` 命令启用差异化加载。但是，`ng serve`，`ng test` 和 `ng e2e` 命令只会生成一个 ES2015 版本，该版本无法在不支持该模块的旧版浏览器（例如 IE 11）中运行。

If you want to run ES5 code during development, you could disable differential loading completely.
To maintain the benefits of differential loading, however, a better option is to define multiple configurations for `ng serve`, `ng e2e`, and `ng test`.

如果要在开发期间运行 ES5 代码，则可以完全禁用差异化加载。但是，为了保持差异化加载的好处，更好的选择是为 `ng serve`，`ng e2e` 和 `ng test` 定义多个配置。

{@a differential-serve}

### Configuring serve for ES5

### 为 ES5 配置服务

To do this for `ng serve`, create a new file, `tsconfig-es5.app.json` next to `tsconfig.app.json` with the following content.

要让 `ng serve` 做到这一点，就要在 `tsconfig.app.json` 后面创建一个新的文件 `tsconfig-es5.app.json`，包含以下内容。

<code-example language="json">

{
 "extends": "./tsconfig.app.json",
 "compilerOptions": {
     "target": "es5"
  }
}

</code-example>

In `angular.json` add two new configuration sections under the `build` and `serve` targets to point to the new TypeScript configuration.

在 `angular.json` 中，在 `build` 和 `serve` 下添加两个新的配置节，其目标指向新的 TypeScript 配置。

<code-example language="json">

"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
      ...
  },
  "configurations": {
    "production": {
        ...
    },
    "es5": {
      "tsConfig": "./tsconfig-es5.app.json"
    }
  }
},
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
      ...
  },
  "configurations": {
    "production": {
     ...
    },
    "es5": {
      "browserTarget": "&lt;app-name&gt;:build:es5"
    }
  }
},

</code-example>

You can then run the `ng serve` command with this configuration. Make sure to replace `<app-name>` (in `"<app-name>:build:es5"`) with the actual name of the app, as it appears under `projects` in `angular.json`. For example, if your app name is `myAngularApp` the config will become `"browserTarget": "myAngularApp:build:es5"`.

然后，你可以使用此配置运行 `ng serve` 命令。务必确保将 `<app-name>`（在 `"<app-name>:build:es5"` 中）替换为应用程序的实际名称，因为它也会出现在 `angular.json` 的 `projects` 中。例如，如果你的应用程序名称为 `myAngularApp` 则配置要变成 `"browserTarget": "myAngularApp:build:es5"`。

<code-example language="none" class="code-shell">

ng serve --configuration es5

</code-example>

{@a differential-test}

### Configuring the test command

### 配置 `test` 命令

Create a new file, `tsconfig-es5.spec.json` next to `tsconfig.spec.json` with the following content.

创建一个新的文件，在 `tsconfig.spec.json` 后面 `tsconfig-es5.spec.json`，包含以下内容。

<code-example language="json">

{
 "extends": "./tsconfig.spec.json",
 "compilerOptions": {
     "target": "es5"
  }
}

</code-example>

<code-example language="json">

"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
      ...
  },
  "configurations": {
    "es5": {
      "tsConfig": "./tsconfig-es5.spec.json"
    }
  }
},

</code-example>

You can then run the tests with this configuration

然后，你可以使用此配置运行测试了

<code-example language="none" class="code-shell">

ng test --configuration es5

</code-example>

### Configuring the e2e command

### 配置 `e2e` 命令

Create an [ES5 serve configuration](guide/deployment#configuring-serve-for-es5) as explained above, and configuration an ES5 configuration for the E2E target.

如上所述创建 [ES5 serve 配置](guide/deployment#configuring-serve-for-es5)，并为 E2E 目标配置上 ES5 配置。

<code-example language="json">

"e2e": {
  "builder": "@angular-devkit/build-angular:protractor",
  "options": {
      ...
  },
  "configurations": {
	  "production": {
		  ...
	  },
    "es5": {
      "devServerTarget": "&lt;app-name&gt;:serve:es5"
    }
  }
},

</code-example>

You can then run the `ng e2e` command with this configuration. Make sure to replace `<app-name>` (in `"<app-name>:serve:es5"`) with the actual name of the app, as it appears under `projects` in `angular.json`. For example, if your app name is `myAngularApp` the config will become `"devServerTarget": "myAngularApp:serve:es5"`.

然后，你就可以使用此配置运行 `ng e2e` 命令了。务必确保将 `<app-name>`（在 `"<app-name>:serve:es5"` 中）替换为应用程序的实际名称，因为它也出现在 `angular.json` 的 `projects` 中。例如，如果你的应用程序名称为 `myAngularApp` 则配置要变成 `"devServerTarget": "myAngularApp:serve:es5"`。

<code-example language="none" class="code-shell">

ng e2e --configuration es5

</code-example>
