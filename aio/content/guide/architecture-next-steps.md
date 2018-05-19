# Next steps: tools and techniques

# 后续步骤：工具与技巧

Once you have understood the basic building blocks, you can begin to learn more about the features and tools that are available to help you develop and deliver Angular applications.  Angular provides a lot more features and services that are covered in this documentation.

一旦你理解了这些基本构造块，就可以开始学习更多能帮你开发和交付 Angular 应用的特性和工具了。
Angular 提供了本文档中所包含的很多特性和服务。

#### Responsive programming tools

#### 响应式编程工具

   * [Lifecycle hooks](guide/lifecycle-hooks): Tap into key moments in the lifetime of a component, from its creation to its destruction, by implementing the lifecycle hook interfaces.

      [生命周期钩子](guide/lifecycle-hooks)：通过实现生命周期钩子接口，可以窃听组件生命周期中的一些关键时刻 —— 从创建到销毁。

   * [Observables and event processing](guide/observables): How to use observables with components and services to publish and subscribe to messages of any type, such as user-interaction events and asynchronous operation results.

      [可观察对象（Observable）和事件处理](guide/observables)：如何在组件和服务中使用可观察对象来发布和订阅任意类型的消息，比如用户交互事件和异步操作结果。

#### Client-server interaction tools

#### 客户端与服务器的交互工具

  * [HTTP](guide/http): Communicate with a server to get data, save data, and invoke server-side actions with an HTTP client.

     [HTTP](guide/http)：用 HTTP 客户端与服务器通讯，以获取数据、保存数据或执行服务端动作。

  * [Server-side Rendering](guide/universal): Angular Universal generates static application pages on the server through server-side rendering (SSR). This allows you to run your Angular app on the server in order to improve performance and show the first page quickly on mobile and low-powered devices, and also facilitate web crawlers.

     [服务端渲染](guide/universal)：Angular Universal 会通过服务端渲染（SSR）技术在服务器上生成静态的应用页面。
    这让你可以在服务器上运行 Angular 应用，以提升性能并在手机或低功耗设备上快速显示首屏，并为 Web 爬虫提供帮助（SEO）。

  * [Service Workers](guide/service-worker-intro): A service worker is a script that runs in the web browser and manages caching for an application. Service workers function as a network proxy. They intercept outgoing HTTP requests and can, for example, deliver a cached response if one is available. You can significantly improve the user experience by using a service worker to reduce dependency on the network.

     [Service Worker](guide/service-worker-intro)：Service Worker 是一个运行在浏览器中并为应用管理缓存的脚本。
    Service Worker 的功能类似于网络代理。它们会拦截发出的 HTTP 请求，如果存在已缓存的响应，则直接返回它。通过使用 Service Worker 来减轻对网络的依赖，你可以显著提升用户体验。

#### Domain-specific libraries

#### 特定领域的库

   * [Animations](guide/animations): Animate component behavior
without deep knowledge of animation techniques or CSS with Angular's animation library.

      [动画](guide/animations)：使用 Angular 的动画库，你可以让组件支持动画行为，而不用深入了解动画技术或 CSS。

   * [Forms](guide/forms): Support complex data entry scenarios with HTML-based validation and dirty checking.

      [Forms](guide/forms)：通过基于 HTML 的验证和脏数据检查，来支持复杂的数据输入场景。

#### Support for the development cycle

#### 为开发周期提供支持

   * [Testing Platform](guide/testing): Run unit tests on your application parts as they interact with the Angular framework.

      [测试平台](guide/testing)：对应用的各个部件运行单元测试，让它们好像在和 Angular 框架交互一样。

   * [Internationalization](guide/i18n):  Angular's internationalization (i18n) tools can help you make your app available in multiple languages.

      [国际化](guide/i18n)：Angular 的国际化工具可以帮助你让应用可用于多种语言中。

   * [Compilation](guide/aot-compiler): Angular provides just-in-time (JIT) compilation for the development environment, and ahead-of-time (AOT) compilation for the production environment.

      [编译](guide/aot-compiler)：Angular 为开发环境提供了 JIT（即时）编译方式，为生产环境提供了 AOT（预先）编译方式。

   * [Security guidelines](guide/security): Learn about Angular's built-in protections against common web-app vulnerabilities and attacks such as cross-site scripting attacks.

      [安全指南](guide/security)：学习 Angular 对常见 Web 应用的弱点和工具（比如跨站脚本攻击）提供的内置防护措施。

#### Setup and deployment tools

#### 环境搭建和发布工具

   * [Setup for local development](guide/setup): Learn how to set up a new project for development with QuickStart.

      [搭建本地开发环境](guide/setup)：学习如何搭建用来开发《快速起步》的新项目。

   * [Installation](guide/npm-packages): The [Angular CLI](https://cli.angular.io/), Angular applications, and Angular itself depend on features and functionality provided by libraries that are available as [npm](https://docs.npmjs.com/) packages.

      [安装](guide/npm-packages)：[Angular CLI](https://cli.angular.io/) 应用和 Angular 本身依赖于一些由库提供的特性和功能，这些库都是以 [npm](https://docs.npmjs.com/) 包的形式发布的。

   * [Typescript Configuration](guide/typescript-configuration): TypeScript is the primary language for Angular application development.

      [TypeScript 配置](guide/typescript-configuration)：TypeScript 是 Angular 应用开发的主要语言。

   * [Browser support](guide/browser-support): Learn how to make your apps compatible across a wide range of browsers.

      [浏览器支持](guide/browser-support)：学习如何让你的应用能和各种浏览器兼容。

   * [Deployment](guide/deployment): Learn techniques for deploying your Angular application to a remote server.

      [发布](guide/deployment)：学习把你的应用发布到远端服务器的技巧。

<hr/>
