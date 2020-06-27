# Service worker communication

# 与 Service Worker 通讯

Importing `ServiceWorkerModule` into your `AppModule` doesn't just register the service worker, it also provides a few services you can use to interact with the service worker and control the caching of your app.

把 `ServiceWorkerModule` 导入到你的 `AppModule` 中不仅会注册 Service Worker，还会提供一些服务，让你能和 Service Worker 通讯，并控制你的应用缓存。

#### Prerequisites

#### 前提条件

A basic understanding of the following:

对下列知识有基本的了解：

* [Getting Started with Service Workers](guide/service-worker-getting-started).

   [Service Worker 快速上手](guide/service-worker-getting-started)。

<hr />

## `SwUpdate` service

## `SwUpdate` 服务

The `SwUpdate` service gives you access to events that indicate when the service worker has discovered an available update for your app or when it has activated such an update&mdash;meaning it is now serving content from that update to your app.

`SwUpdate` 服务让你能访问一些事件，这些事件会指出 Service Worker 何时发现了可用的更新或者一个更新何时可以被激活 —— 这意味着它现在可以通过更新后的版本提供服务了。

The `SwUpdate` service supports four separate operations:

`SwUpdate` 服务支持四个独立的操作：

* Getting notified of *available* updates. These are new versions of the app to be loaded if the page is refreshed.

   获取出现*可用*更新的通知。如果要刷新页面，这些就是可加载的新版本。

* Getting notified of update *activation*. This is when the service worker starts serving a new version of the app immediately.

   获取更新*被激活*的通知。这时候 Service Worker 就可以立即使用这些新版本提供服务了。

* Asking the service worker to check the server for new updates.

   要求 Service Worker 向服务器查询是否有新版本。

* Asking the service worker to activate the latest version of the app for the current tab.

   要求 Service Worker 为当前标签页激活该应用的最新版本。

### Available and activated updates

### 有可用更新及已激活更新

The two update events, `available` and `activated`, are `Observable` properties of `SwUpdate`:

这两个更新事件 `available` 和 `activated`，都是 `SwUpdate` 的 `Observable` 属性：

<code-example path="service-worker-getting-started/src/app/log-update.service.ts" header="log-update.service.ts" region="sw-update"></code-example>

You can use these events to notify the user of a pending update or to refresh their pages when the code they are running is out of date.

你可以使用这些事件来通知用户有一个待做更新或当它们运行的代码已经过期时刷新页面。

### Checking for updates

### 检查更新

It's possible to ask the service worker to check if any updates have been deployed to the server.
The service worker checks for updates during initialization and on each navigation request&mdash;that is, when the user navigates from a different address to your app.
However, you might choose to manually check for updates if you have a site that changes frequently or want updates to happen on a schedule.

可以要求 Service Worker 检查是否有任何更新已经发布到了服务器上。
Service Worker 会在初始化和每次导航请求（也就是用户导航到应用中的另一个地址）时检查更新。
不过，如果你的站点更新非常频繁，或者需要按计划进行更新，你可能会选择手动检查更新。

Do this with the `checkForUpdate()` method:

通过调用 `checkForUpdate()` 方法来实现：

<code-example path="service-worker-getting-started/src/app/check-for-update.service.ts" header="check-for-update.service.ts"></code-example>

This method returns a `Promise` which indicates that the update check has completed successfully, though it does not indicate whether an update was discovered as a result of the check. Even if one is found, the service worker must still successfully download the changed files, which can fail. If successful, the `available` event will indicate availability of a new version of the app.

该方法返回一个用来表示检查更新已经成功完成的 `Promise`，不过它不会指出是否确实发现了一个更新。
即使找到了一个，Service Worker 还必须成功下载更新过的文件，而这可能会失败。如果成功了，就会通过一个 `available` 事件来表明当前应用有一个可用的新版本。

<div class="alert is-important">

In order to avoid negatively affecting the initial rendering of the page, `ServiceWorkerModule` waits for up to 30 seconds by default for the app to stabilize, before registering the ServiceWorker script.
Constantly polling for updates, for example, with [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) or RxJS' [interval()](https://rxjs.dev/api/index/function/interval), will prevent the app from stabilizing and the ServiceWorker script will not be registered with the browser until the 30 seconds upper limit is reached.

为了避免影响页面的首次渲染，在注册 ServiceWorker 脚本之前，`ServiceWorkerModule` 默认会在应用程序达到稳定态之前等待最多 30 秒。如果不断轮询更新（比如调用 [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) 或 RxJS 的 [interval()](https://rxjs.dev/api/index/function/interval)）就会阻止应用程序达到稳定态，则直到 30 秒结束之前都不会往浏览器中注册 ServiceWorker 脚本。

Note that this is true for any kind of polling done by your application.
Check the {@link ApplicationRef#isStable isStable} documentation for more information.

请注意，应用中所执行的各种轮询都会阻止它达到稳定态。欲知详情，参见 {@link ApplicationRef#isStable isStable} 文档。

You can avoid that delay by waiting for the app to stabilize first, before starting to poll for updates, as shown in the example above.
Alternatively, you might want to define a different {@link SwRegistrationOptions#registrationStrategy registration strategy} for the ServiceWorker.

你可以通过在开始轮询更新之前先等应用达到稳定态来消除这种延迟，如下面的例子所示。
另外，你还可以为 ServiceWorker 定义不一样的 {@link SwRegistrationOptions#registrationStrategy 注册策略}。

</div>

### Forcing update activation

### 强制激活更新

If the current tab needs to be updated to the latest app version immediately, it can ask to do so with the `activateUpdate()` method:

如果当前标签页需要立即更新到最新的应用版本，可以通过 `activateUpdate()` 方法来要求立即这么做：

<code-example path="service-worker-getting-started/src/app/prompt-update.service.ts" header="prompt-update.service.ts" region="sw-activate"></code-example>

<div class="alert is-important">

Calling `activateUpdate()` without reloading the page could break lazy-loading in a currently running app, especially if the lazy-loaded chunks use filenames with hashes, which change every version.
Therefore, it is recommended to reload the page once the promise returned by `activateUpdate()` is resolved.

如果调用 `activateUpdate()` 而不刷新页面，可能会破坏正在运行的应用中的惰性加载模块，特别是如果惰性加载的模块文件名中使用了哈希时，就会改变每一个版本。
所以，建议每当 `activateUpdate()` 返回的 Promise 被解析时，都刷新一次页面。

</div>

## More on Angular service workers

## 关于 Angular Service Worker 的更多信息

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Service Worker in Production](guide/service-worker-devops).

   [生产环境下的 Service Worker](guide/service-worker-devops)。
