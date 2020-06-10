# Getting started with service workers

# Service Worker 快速上手

This document explains how to enable Angular service worker support in projects that you created with the [Angular CLI](cli). It then uses a simple example to show you a service worker in action, demonstrating loading and basic caching.

本文档解释了如何在 [Angular CLI](cli) 项目中启用对 Angular Service Worker 的支持。稍后它会用一个简单的范例来向你展示 Service Worker 实践，包括加载和基础的缓存功能。

#### Prerequisites

#### 前提条件

A basic understanding of the information in [Introduction to Angular service workers](guide/service-worker-intro).

对 [Angular Service Worker 简介](guide/service-worker-intro)中的信息有了基本的了解。

## Adding a service worker to your project

## 为你的项目添加 Service Worker

To set up the Angular service worker in your project, use the CLI command `ng add @angular/pwa`. It takes care of configuring your app to use service workers by adding the `service-worker` package along
with setting up the necessary support files.

要让你的项目支持 Angular Service Worker，可以使用 CLI 命令 `ng add @angular/pwa`。它会添加 `service-worker` 包，并建立必要的支持文件，小心翼翼地配置你的应用，以便使用 Service Worker。

```sh

ng add @angular/pwa --project *project-name*
```

The above command completes the following actions:

上述命令完成了如下步骤：

1. Adds the `@angular/service-worker` package to your project. 

   把 @angular/service-worker 添加到你的项目中。

2. Enables service worker build support in the CLI.

   在 CLI 中启用 Service Worker 的构建支持。

3. Imports and registers the service worker in the app module.

   在应用模块中导入并注册 Service Worker。

4. Updates the `index.html` file:

   修改 `index.html` 文件：

    * Includes a link to add the `manifest.json` file.

       包含要添加到 `manifest.json` 文件中的链接。

    * Adds meta tags for `theme-color`.

       为 `theme-color` 添加 meta 标签。

5. Installs icon files to support the installed Progressive Web App (PWA).

   创建图标文件，以支持安装渐进式应用（PWA）。

6. Creates the service worker configuration file called [`ngsw-config.json`](/guide/service-worker-config), which specifies the caching behaviors and other settings.

   创建一个名叫 [`ngsw-config.json`](/guide/service-worker-config) 的 Service Worker 配置文件，它会用来指定缓存的行为以及其它设定。

Now, build the project:

现在，构建本项目：

```sh

ng build --prod

```

The CLI project is now set up to use the Angular service worker.

现在，这个 CLI 项目就可以使用 Angular Service Worker 了。

## Service worker in action: a tour

## Service Worker 实战：向导

This section demonstrates a service worker in action,
using an example application.

本节用一个范例应用来演示一下 Service Worker 实战。

### Serving with `http-server`

### 用 `http-server` 启动开发服务器

Because `ng serve` does not work with service workers, you must use a separate HTTP server to test your project locally. You can use any HTTP server. The example below uses the [http-server](https://www.npmjs.com/package/http-server) package from npm. To reduce the possibility of conflicts and avoid serving stale content, test on a dedicated port and disable caching.

由于 `ng serve` 对 Service Worker 无效，所以必须用一个独立的 HTTP 服务器在本地测试你的项目。
你可以使用任何 HTTP 服务器。下面这个例子使用来自 npm 中的 [http-server](https://www.npmjs.com/package/http-server) 包。
为了减小端口冲突的可能性，我们在一个专用端口上进行测试。

To serve the directory containing your web files with `http-server`, run the following command:

要想使用 `http-server` 在包含这些 web 文件的目录上启动服务，运行下列命令：

```sh
http-server -p 8080 -c-1 dist/<project-name>
```

### Initial load

### 最初的加载

With the server running, you can point your browser at http://localhost:8080/. Your application should load normally.

在服务器运行起来之后，你可以在浏览器中访问 http://localhost:8080/。你的应用像通常一样加载。

**Tip:** When testing Angular service workers, it's a good idea to use an incognito or private window in your browser to ensure the service worker doesn't end up reading from a previous leftover state, which can cause unexpected behavior.

**提示：** 当测试 Angular Service Worker 时，最好使用浏览器中的隐身或隐私窗口，以确保 Service Worker 不会从以前的残留状态中读取数据，否则可能导致意外的行为。

<div class="alert is-helpful">

**Note:**
If you are not using HTTPS, the service worker will only be registered when accessing the app on `localhost`.

**注意：**
如果没有使用 HTTPS，那么 Service Worker 只会在 `localhost` 上的应用中进行注册。
</div>

### Simulating a network issue

### 模拟网络出问题

To simulate a network issue, disable network interaction for your application. In Chrome:

要想模拟网络出问题的情况，可以为你的应用禁用网络交互。在 Chrome 中：

1. Select **Tools** > **Developer Tools** (from the Chrome menu located at the top right corner).

   选择 **Tools** > **Developer Tools** （从右上角的 Chrome 菜单）。

2. Go to the **Network tab**.

   进入 **Network 页**。

3. Check the **Offline box**.

   勾选 **Offline** 复选框。

<div class="lightbox">
  <img src="generated/images/guide/service-worker/offline-checkbox.png" alt="The offline checkbox in the Network tab is checked">
</div>

Now the app has no access to network interaction.

现在，本应用不能再和网络进行交互了。

For applications that do not use the Angular service worker, refreshing now would display Chrome's Internet disconnected page that says "There is no Internet connection".

对于那些不使用 Angular Service Worker 的应用，现在刷新将会显示 Chrome 的“网络中断”页，提示“没有可用的网络连接”。

With the addition of an Angular service worker, the application behavior changes. On a refresh, the page loads normally.

有了 Angular Service Worker，本应用的行为就不一样了。刷新时，页面会正常加载。

If you look at the Network tab, you can verify that the service worker is active.

如果你看看 Network 页，就会发现 Service Worker 是激活的。

<div class="lightbox">
  <img src="generated/images/guide/service-worker/sw-active.png" alt="Requests are marked as from ServiceWorker">
</div>

Notice that under the "Size" column, the requests state is `(from ServiceWorker)`. This means that the resources are not being loaded from the network. Instead, they are being loaded from the service worker's cache.

注意，在 “Size” 列中，请求的状态是 `(from ServiceWorker)`。
这表示该资源不是从网络上加载的，而是从 Service Worker 的缓存中。

### What's being cached?

### 什么被缓存了？

Notice that all of the files the browser needs to render this application are cached. The `ngsw-config.json` boilerplate configuration is set up to cache the specific resources used by the CLI:

注意，浏览器要渲染的所有这些文件都被缓存了。
`ngsw-config.json` 样板文件被配置成了要缓存 CLI 用到的那些文件：

* `index.html`.

* `favicon.ico`.

* Build artifacts (JS and CSS bundles).

   构建结果（JS 和 CSS 包）。

* Anything under `assets`.

  `assets` 下的一切。

* Images and fonts directly under the configured `outputPath` (by default `./dist/<project-name>/`) or `resourcesOutputPath`. See [`ng build`](cli/build) for more information about these options.

  图片和字体直接位于所配置的 `outputPath` (默认为 `./dist/<project-name>/`) 或 `resourcesOutputPath` 下。
  关于这些配置的更多信息，请参见 [`ng build`](cli/build)。

<div class="alert is-helpful">

Pay attention to two key points:

注意如下两个关键点：

1. The generated `ngsw-config.json` includes a limited list of cachable fonts and images extentions. In some cases, you might want to modify the glob pattern to suit your needs.

   所生成的 `ngsw-config.json` 包括一个可缓存字体和图像的有限列表。在某些情况下，你可能要按需修改这些 glob 模式。

1. If `resourcesOutputPath` or `assets` paths are modified after the generation of configuration file, you need to change the paths manually in `ngsw-config.json`.

   如果在生成了配置文件之后修改了 `resourcesOutputPath` 或 `assets` 的路径，那么就要在 `ngsw-config.json` 中手动修改这些路径。

</div>

### Making changes to your application

### 修改你的应用

Now that you've seen how service workers cache your application, the
next step is understanding how updates work.

现在，你已经看到了 Service Worker 如何缓存你的应用，接下来的步骤讲它如何进行更新。

1. If you're testing in an incognito window, open a second blank tab. This will keep the incognito and the cache state alive during your test.

   如果你正在隐身窗口中测试，请打开第二个空白页。这会让该隐身窗口和缓存的状态在测试期间持续活着。

2. Close the application tab, but not the window. This should also close the Developer Tools.

   关闭该应用的页面，而不是整个窗口。这也会同时关闭开发者工具。

3. Shut down `http-server`.

   关闭 `http-server`。

4. Next, make a change to the application, and watch the service worker install the update.

   接下来，对应用进行一些修改，并且观察 Service Worker 安装这些更新。

5. Open `src/app/app.component.html` for editing.

   打开 `src/app/app.component.html` 供编辑。

6. Change the text `Welcome to {{title}}!` to `Bienvenue à {{title}}!`.

   把文本 `Welcome to {{title}}!` 改为 `Bienvenue à {{title}}!`。

7. Build and run the server again:

   再次构建并运行此服务器：

```sh
ng build --prod
http-server -p 8080 -c-1 dist/<project-name>
```

### Updating your application in the browser

### 在浏览器中更新你的应用

Now look at how the browser and service worker handle the updated application.

现在，看看浏览器和 Service Worker 如何处理这个更新后的应用。

1. Open http://localhost:8080 again in the same window. What happens?

   再次在同一个窗口中打开 <http://localhost:8080>，发生了什么？

<div class="lightbox">
  <img src="generated/images/guide/service-worker/welcome-msg-en.png" alt="It still says Welcome to Service Workers!">
</div>

What went wrong? Nothing, actually. The Angular service worker is doing its job and serving the version of the application that it has **installed**, even though there is an update available. In the interest of speed, the service worker doesn't wait to check for updates before it serves the application that it has cached.

错在哪里？哪里也没错，真的。Angular Service Worker 正在做自己的工作，并且用它**已经安装过**的版本提供服务，虽然，已经有新版本可用了。由于更关注速度，所以 Service Worker 并不会在启动它已经缓存过的版本之前先等待检查更新。

If you look at the `http-server` logs, you can see the service worker requesting `/ngsw.json`. This is how the service worker checks for updates.

如果你看看 `http-server` 的 log，就会发现 Service Worker 请求了 `/ngsw.json` 文件，这是 Service Worker 正在检查更新。

2. Refresh the page.

   刷新页面。

<div class="lightbox">
  <img src="generated/images/guide/service-worker/welcome-msg-fr.png" alt="The text has changed to say Bienvenue à app!">
</div>

The service worker installed the updated version of your app *in the background*, and the next time the page is loaded or reloaded, the service worker switches to the latest version.

Service Worker *在后台*安装好了这个更新后的版本，下次加载或刷新页面时，Service Worker 就切换到最新的版本了。

<hr />

## More on Angular service workers

## 关于 Angular Service Worker 的更多信息

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Communicating with service workers](guide/service-worker-communications).

   [与 Service Worker 通讯](guide/service-worker-communications)。

