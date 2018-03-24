# Getting started with service workers

# Service Worker 快速起步

#### Prerequisites

#### 前提条件

A basic understanding of the following:

对下列知识有基本的了解：

* [Introduction to Angular service workers](guide/service-worker-intro).

   [Angular Service Worker 简介](guide/service-worker-intro).

<hr />

Beginning in Angular 5.0.0, you can easily enable Angular service worker support in any CLI project. This document explains how to enable Angular service worker support in new and existing projects. It then uses a simple example to show you a service worker in action, demonstrating loading and basic caching.  

从 Angular 5.0.0 开始，你就可以轻松为任何 CLI 项目启用 Angular Service Worker 的支持了。
这个文档解释了你要如何在新项目和现有项目中启用 Angular Service Worker 的支持。
然后使用一个简单的例子为你展示 Service Worker 实战，以演示加载和基本的缓存功能。

## Adding a service worker to a new application

## 为新项目添加 Service Worker

If you're generating a new CLI project, you can use the CLI to set up the Angular service worker as part of creating the project. To do so, add the `--service-worker` flag to the `ng new`  command:

如果你正在生成一个新的 CLI 项目，可以 使用 CLI 在创建项目时就准备好 Angular Service Worker。
只要在 `ng new` 命令中添加 `--service-worker` 标志就可以了：

```sh

ng new my-project --service-worker 

```

The `--service-worker` flag takes care of configuring your app to 
use service workers by adding the `service-worker` package along 
with setting up the necessary files to support service workers. 
For information on the details, see the following section 
which covers the process in detail as it shows you how to add a 
service worker manually to an existing app.

`--service-worker` 标志会通过添加 `service-worker` 包及其它必须的文件，来帮你配置好 Service Worker。
这个过程的细节和向现有项目中手动添加 Service Worker 的支持是一样的。要了解详情，参见下面的部分。

## Adding a service worker to an existing app

## 向现有工程中添加 Service Worker

To add a service worker to an existing app:

要把 Service Worker 添加到现有应用中，就要：

1. Add the service worker package.

   添加 Service Worker 包。

2. Enable service worker build support in the CLI.

   在 CLI 中启用 Service Worker 的构建支持。

3. Import and register the service worker.

   导入并注册这个 Service Worker。

4. Create the service worker configuration file, which specifies the caching behaviors and other settings. 

   创建 Service Worker 的配置文件，它指定了缓存行为和其它设置。

5. Build the project.

   构建该项目。

### Step 1: Add the service worker package

### 步骤 1：添加 Service Worker 包

Add the package `@angular/service-worker`, using the yarn utility as shown here:

添加 `@angular/service-worker` 包，使用 yarn 工具时的用法如下：

```sh

yarn add @angular/service-worker

```

### Step 2: Enable service worker build support in the CLI

### 步骤 2：在 CLI 中启用 Service Worker 的构建支持

To enable the Angular service worker, the CLI must generate an Angular service worker manifest at build time. To cause the CLI to generate the manifest for an existing project, set the `serviceWorker` flag to `true` in the project's `.angular-cli.json` file as shown here:

要启用 Angular Service Worker，CLI 必须在构建时生成一个 Angular Service Worker 的 `manifest` 文件。
要让 CLI 为现有项目生成 `manifest`，就要在该项目的 `.angular-cli.json` 文件中 `serviceWorker` 标识设置为 `true`。命令如下：

```sh

ng set apps.0.serviceWorker=true

```

### Step 3: Import and register the service worker

### 步骤 3：导入并注册 Service Worker

To import and register the Angular service worker:

要导入并注册 Angular Service Worker 就要：

At the top of the root module, `src/app/app.module.ts`, import `ServiceWorkerModule` and `environment`.

在根模块 `src/app/app.module.ts` 的顶部导入 `ServiceWorkerModule` 和 `environment`。

<code-example path="service-worker-getting-started/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts" region="sw-import"> </code-example>

Add `ServiceWorkerModule` to the `@NgModule` `imports` array. Use the `register()` helper to take care of registering the service worker, taking care to disable the service worker when not running in production mode.

把 `ServiceWorkerModule` 添加到 `@NgModule` 的 `imports` 数组中。使用 `register()` 来帮助管理 Service Worker 的注册并在非产品环境下运行时禁用 Service Worker。

<code-example path="service-worker-getting-started/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts" region="sw-module"> </code-example>

The file `ngsw-worker.js` is the name of the prebuilt service worker script, which the CLI copies into `dist/` to deploy along with your server.

`ngsw-worker.js` 文件是内置的 Service Worker 脚本的名字，CLI 会把它复制到 `dist/` 目录下，让它随你的服务器一起发布。

### Step 4: Create the configuration file, `ngsw-config.json`

### 步骤 4：创建配置文件 `ngsw-config.json`

The Angular CLI needs a service worker configuration file, called `ngsw-config.json`. The configuration file controls how the service worker caches files and data 
resources.

Angular CLI 需要一个名叫 `ngsw-config.json` 的 Service Worker 配置文件。
这个配置文件会控制 Service Worker 如何缓存各个文件和数据资源。

You can begin with the boilerplate version from the CLI, which configures sensible defaults for most applications.

你可以从 CLI 创建的样板项目开始，它已经配置好了适合大多数应用的默认选项。

Alternately, save the following as `src/ngsw-config.json`:

另外，你也可以把下列内容保存为 `src/ngsw-config.json`：

<code-example path="service-worker-getting-started/src/ngsw-config.json" linenums="false" title="src/ngsw-config.json"> </code-example>

### Step 5: Build the project

### 步骤 5：构建本项目

Finally, build the project: 

最后，构建本项目：

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

Because `ng serve` does not work with service workers, you must use a seperate HTTP server to test your project locally. You can use any HTTP server. The example below uses the [http-server](https://www.npmjs.com/package/http-server) package from npm. To reduce the possibility of conflicts, test on a dedicated port.

由于 `ng serve` 对 Service Worker 无效，所以必须用一个独立的 HTTP 服务器在本地测试你的项目。
你可以使用任何 HTTP 服务器。下面这个例子使用来自 npm 中的 [http-server](https://www.npmjs.com/package/http-server) 包。
为了减小端口冲突的可能性，我们在一个专用端口上进行测试。

To serve with `http-server`, change to the directory containing your web files and start the web server: 

要想使用 `http-server` 服务器，进入包含这些 web 文件的目录，并启动开发服务器：

```sh

cd dist
http-server -p 8080

```

### Initial load

### 最初的加载

With the server running, you can point your browser at http://localhost:8080/. Your application should load normally.

在服务器运行起来之后，你可以在浏览器中访问 http://localhost:8080/。你的应用像通常一样加载。

**Tip:** When testing Angular service workers, it's a good idea to use an incognito or private window in your browser to ensure the service worker doesn't end up reading from a previous leftover state, which can cause unexpected behavior.

**提示：** 当测试 Angular Service Worker 时，最好使用浏览器中的隐身或隐私窗口，以确保 Service Worker 不会从以前的残留状态中读取数据，否则可能导致意外的行为。

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

<figure>
  <img src="generated/images/guide/service-worker/offline-checkbox.png" alt="The offline checkbox in the Network tab is checked">
</figure>

Now the app has no access to network interaction.

现在，本应用不能再和网络进行交互了。

For applications that do not use the Angular service worker, refreshing now would display Chrome's Internet disconnected page that says "There is no Internet connection". 

对于那些不使用 Angular Service Worker 的应用，现在刷新将会显示 Chrome 的“网络中断”页，提示“没有可用的网络连接”。

With the addition of an Angular service worker, the application behavior changes. On a refresh, the page loads normally. 

有了 Angular Service Worker，本应用的行为就不一样了。刷新时，页面会正常加载。

If you look at the Network tab, you can verify that the service worker is active.

如果你看看 Network 页，就会发现 Service Worker 是激活的。

<figure>
  <img src="generated/images/guide/service-worker/sw-active.png" alt="Requests are marked as from ServiceWorker">
</figure>

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

   `assets` 下的所有文件。

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
cd dist
http-server -p 8080

```

### Updating your application in the browser

### 在浏览器中更新你的应用

Now look at how the browser and service worker handle the updated application.

现在，看看浏览器和 Service Worker 如何处理这个更新后的应用。

1. Open http://localhost:8080 again in the same window. What happens?

   再次在同一个窗口中打开 <http://localhost:8080>，发生了什么？

<figure>
  <img src="generated/images/guide/service-worker/welcome-msg-en.png" alt="It still says Welcome to Service Workers!">
</figure>

What went wrong? Nothing, actually. The Angular service worker is doing its job and serving the version of the application that it has **installed**, even though there is an update available. In the interest of speed, the service worker doesn't wait to check for updates before it serves the application that it has cached.

错在哪里？哪里也没错，真的。Angular Service Worker 正在做自己的工作，并且用它**已经安装过**的版本提供服务，虽然，已经有新版本可用了。由于更关注速度，所以 Service Worker 并不会在启动它已经缓存过的版本之前先等待检查更新。

If you look at the `http-server` logs, you can see the service worker requesting `/ngsw.json`. This is how the service worker checks for updates.

如果你看看 `http-server` 的 log，就会发现 Service Worker 请求了 `/ngsw.json` 文件，这是 Service Worker 正在检查更新。

2. Refresh the page.

   刷新页面。

<figure>
  <img src="generated/images/guide/service-worker/welcome-msg-fr.png" alt="The text has changed to say Bienvenue à app!">
</figure>

The service worker installed the updated version of your app *in the background*, and the next time the page is loaded or reloaded, the service worker switches to the latest version.

Service Worker *在后台*安装好了这个更新后的版本，下次加载或刷新页面时，Service Worker 就切换到最新的版本了。

<hr />

## More on Angular service workers

## 关于 Angular Service Worker 的更多信息

You may also be interested in the following:

你可能对下列内容感兴趣：

* [Communicating with service workers](guide/service-worker-communications).

  [与 Service Worker 通讯](guide/service-worker-communications).
