# Angular service worker introduction

# Angular 的 Service Worker 简介

Service workers augment the traditional web deployment model and empower applications to deliver a user experience with the reliability and performance on par with natively-installed code.

Service Worker 可以增强传统的 Web 发布模式，并使应用程序能够提供可与本机代码媲美的高可靠、高性能的用户体验。

At its simplest, a service worker is a script that runs in the web browser and manages caching for an application.

简单来说，Service Worker 就是一段运行在 Web 浏览器中，并为应用管理缓存的脚本。

Service workers function as a network proxy. They intercept all outgoing HTTP requests made by the application and can choose how to respond to them. For example, they can query a local cache and deliver a cached response if one is available. Proxying isn't limited to requests made through programmatic APIs, such as `fetch`; it also includes resources referenced in HTML and even the initial request to `index.html`. Service worker-based caching is thus completely programmable and doesn't rely on server-specified caching headers.

Service Worker 的功能就像一个网络代理。它们会拦截所有由应用发出的 HTTP 请求，并选择如何给出响应。
比如，它们可以查询局部缓存，如果有缓存的响应数据，就用它做出响应。
这种代理行为不会局限于通过程序调用 API（比如`fetch`）发起的请求，还包括 HTML 中对资源的引用，甚至对 `index.html` 的首次请求。
 基于 Service Worker 的缓存是完全可编程的，并且不依赖于服务端指定的那些控制缓存策略的头。

Unlike the other scripts that make up an application, such as the Angular app bundle, the service worker is preserved after the user closes the tab. The next time that browser loads the application, the service worker loads first, and can intercept every request for resources to load the application. If the service worker is designed to do so, it can *completely satisfy the loading of the application, without the need for the network*. 

不像应用中的其它脚本（如 Angular 的应用包），Service Worker 在用户关闭浏览器页标签时仍然会被保留。
下次浏览器加载本应用时，Service Worker 会首先加载，然后拦截加载本应用时的对每一项资源的请求。
如果这个 Service Worker 就是为此而设计的，它就能*完全满足应用加载时的需求，而不需要依赖网络*。

Even across a fast reliable network, round-trip delays can introduce significant latency when loading the application. Using a service worker to reduce dependency on the network can significantly improve the user experience. 

即使在快速可靠的网络中，往返延迟也可能在加载应用程序时产生显著的延迟。使用 Service Worker 来减少对网络的依赖可以显着改善用户体验。

## Service workers in Angular

## Angular 中的 Service Worker

Angular applications, as single-page applications, are in a prime position to benefit from the advantages of service workers. Starting with version 5.0.0, Angular ships with a service worker implementation. Angular developers can take advantage of this service worker and benefit from the increased reliability and performance it provides, without needing to code against low-level APIs.

作为单页面应用，Angular 应用位于从 Service Worker 中受益的首要位置。
从 Angular v5.0.0 开始，Angular 提供了一份 Service Worker 的实现。
Angular 开发人员可以从这个 Service Worker 加强的可靠性和性能中获益，而不用再针对底层 API 写代码。

Angular's service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content. 

Angular 的 Service Worker 的设计目标是优化那些使用慢速、不可靠网络的最终用户的体验，同时还要尽可能减小提供过期内容的风险。

The Angular service worker's behavior follows that design goal:

Angular 的 Service Worker 的行为遵循下列设计目标：

* Caching an application is like installing a native application. The application is cached as one unit, and all files update together.

   像安装原生应用一样缓存应用。该应用作为整体被缓存，它的所有文件作为整体进行更新。

* A running application continues to run with the same version of all files. It does not suddenly start receiving cached files from a newer version, which are likely incompatible.

   正在运行的应用使用所有文件的同一版本继续运行。不要突然开始接收来自新版本的、可能不兼容的缓存文件。

* When users refresh the application, they see the latest fully cached version. New tabs load the latest cached code.

   当用户刷新本应用时，他们会看到最新的被完全缓存的版本。新的页标签中会加载最新的缓存代码。

* Updates happen in the background, relatively quickly after changes are published. The previous version of the application is served until an update is installed and ready.

   在更改发布之后，相对较快的在后台进行更新。在一次完整的更新完成之前，仍然使用应用的上一个版本。

* The service worker conserves bandwidth when possible. Resources are only downloaded if they've changed.

   只要有可能，Service Worker 就会尽量节省带宽。它只会下载那些发生了变化的资源。

To support these behaviors, the Angular service worker loads a *manifest* file from the server. The manifest describes the resources to cache and includes hashes of every file's contents. When an update to the application is deployed, the contents of the manifest change, informing the service worker that a new version of the application should be downloaded and cached. This manifest is generated from a CLI-generated configuration file called `ngsw-config.json`.

要支持这些行为，Angular 的 Service Worker 会从服务器上下载一个 `manifest` 文件。
这个 `manifest` 文件描述要缓存的资源，并包含每个文件内容的哈希值。
当发布了应用的一个新版本时，`manifest` 的内容就会改变，通知 Service Worker 应该下载并缓存应用的一个新版本了。
这个 manifest 是从 CLI 生成的一个名叫 `ngsw-config.json` 的文件中生成的。


Installing the Angular service worker is as simple as including an `NgModule`. In addition to registering the Angular service worker with the browser, this also makes a few services available for injection which interact with the service worker and can be used to control it. For example, an application can ask to be notified when a new update becomes available, or an application can ask the service worker to check the server for available updates.

安装 Angular 的 Service Worker 就像引入一个 `NgModule` 一样简单。
除了使用浏览器注册 Angular 的 Service Worker 之外，还要制作一些可供注入的服务，它们可以与 Service Worker 交互，并控制它。
比如，应用可以要求当新的更新已经就绪时通知自己，或要求 Service Worker 检查服务器，看是否有可用的更新。

## Prerequisites

## 前提条件

Your application must run in a web browser that supports service workers. Currently, the latest versions of Chrome and Firefox are supported. To learn about other browsers that are service worker ready, see the [Can I Use](http://caniuse.com/#feat=serviceworkers) page.

你的应用必须运行在支持 Service Worker 的 Web 浏览器中。目前，Chrome 和 Firefox 的最新版本 都已经支持了。
要想知道其它浏览器是否支持，参见 [Can I Use](http://caniuse.com/#feat=serviceworkers) 页。

## Related resources

## 相关资源

For more information about service workers in general, see [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers/). 

要了解更多关于 Service Worker 的普遍性信息，参见 [Service Worker 简介](https://developers.google.com/web/fundamentals/primers/service-workers/)。

For more information about browser support, see the [browser support](https://developers.google.com/web/fundamentals/primers/service-workers/#browser_support) section of [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers/), Jake Archibald's [Is Serviceworker ready?](https://jakearchibald.github.io/isserviceworkerready/), and 
[Can I Use](http://caniuse.com/#feat=serviceworkers). 

要了解关于浏览器支持度的更多信息，参见 [Service Worker 简介](https://developers.google.com/web/fundamentals/primers/service-workers/) 中的[浏览器支持](https://developers.google.com/web/fundamentals/primers/service-workers/#browser_support)部分、Jake Archibald 写的[Serviceworker 好了吗？](https://jakearchibald.github.io/isserviceworkerready/)和 [Can I Use](http://caniuse.com/#feat=serviceworkers)。

The remainder of this Angular documentation specifically addresses the Angular implementation of service workers. 

本文档的其余部分会专注于讲 Angular 中的 Service Worker 实现。

## More on Angular service workers

## 关于 Angular Service Worker 的更多信息

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Getting Started with service workers](guide/service-worker-getting-started).

   [Service Worker 快速起步](guide/service-worker-getting-started)。
