# Next steps: tools and techniques

# 后续步骤：工具与技巧

After you understand the basic Angular building blocks, you can begin to learn more
about the features and tools that are available to help you develop and deliver Angular applications.
Here are some key features.

理解了这些基本构造块之后，就可以开始学习更多能帮你开发和交付 Angular 应用的特性和工具了。
这里会讲一些关键特性。

## Responsive programming

## 响应式编程工具

* [Lifecycle hooks](guide/lifecycle-hooks): Tap into key moments in the lifetime of a component, from its creation to its destruction, by implementing the lifecycle hook interfaces.

  [生命周期钩子](guide/lifecycle-hooks)：通过实现生命周期钩子接口，可以窃听组件生命周期中的一些关键时刻 —— 从创建到销毁。

* [Observables and event processing](guide/observables): How to use observables with components and services to publish and subscribe to messages of any type, such as user-interaction events and asynchronous operation results.

  [可观察对象（Observable）和事件处理](guide/observables)：如何在组件和服务中使用可观察对象来发布和订阅任意类型的消息，比如用户交互事件和异步操作结果。

## Client-server interaction

## 客户端与服务器的交互工具

* [HTTP](guide/http): Communicate with a server to get data, save data, and invoke server-side actions with an HTTP client.

  [HTTP](guide/http)：用 HTTP 客户端与服务器通讯，以获取数据、保存数据或执行服务端动作。

* [Server-side Rendering](guide/universal): Angular Universal generates static application pages on the server through server-side rendering (SSR). This allows you to run your Angular app on the server in order to improve performance and show the first page quickly on mobile and low-powered devices, and also facilitate web crawlers.

  [服务端渲染](guide/universal)：Angular Universal 会通过服务端渲染（SSR）技术在服务器上生成静态的应用页面。
这让你可以在服务器上运行 Angular 应用，以提升性能并在手机或低功耗设备上快速显示首屏，并为 Web 爬虫提供帮助（SEO）。

* [Service Workers](guide/service-worker-intro): Use a service worker to reduce dependency on the network
significantly improving the user experience.

  [Service Worker](guide/service-worker-intro)：借助 Service Worker 来减轻对网络的依赖，你可以显著提升用户体验。

## Domain-specific libraries

## 特定领域的库

* [Animations](guide/animations): Use Angular's animation library to animate component behavior
without deep knowledge of animation techniques or CSS.

  [动画](guide/animations)：使用 Angular 的动画库，你可以让组件支持动画行为，而不用深入了解动画技术或 CSS。

* [Forms](guide/forms): Support complex data entry scenarios with HTML-based validation and dirty checking.

  [Forms](guide/forms)：通过基于 HTML 的验证和脏数据检查，来支持复杂的数据输入场景。

## Support for the development cycle

## 为开发周期提供支持

* [Compilation](guide/aot-compiler): Angular provides just-in-time (JIT) compilation for the development environment, and ahead-of-time (AOT) compilation for the production environment.

  [编译](guide/aot-compiler)：Angular 为开发环境提供了 JIT（即时）编译方式，为生产环境提供了 AOT（预先）编译方式。

* [Testing platform](guide/testing): Run unit tests on your application parts as they interact with the Angular framework.

  [测试平台](guide/testing)：对应用的各个部件运行单元测试，让它们好像在和 Angular 框架交互一样。

* [Internationalization](guide/i18n):  Make your app available in multiple languages with Angular's internationalization (i18n) tools.

  [国际化](guide/i18n)：Angular 的国际化工具可以帮助你让应用可用于多种语言中。


* [Security guidelines](guide/security): Learn about Angular's built-in protections against common web-app vulnerabilities and attacks such as cross-site scripting attacks.

  [安全指南](guide/security)：学习 Angular 对常见 Web 应用的弱点和工具（比如跨站脚本攻击）提供的内置防护措施。

## Setup, build, and deployment configuration

## 环境搭建、构建与开发配置

* [CLI Command Reference](cli): The Angular CLI is a command-line tool that you use to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

  [CLI 命令参考手册](cli)：Angular CLI 是一个命令行工具，你可以使用它来创建项目、生成应用及库代码，还能执行很多开发任务，比如测试、打包和发布。

* [Workspace and File Structure](guide/file-structure): Understand the structure of Angular workspace and project folders. 

  [工作空间与文件结构](guide/file-structure)：理解 Angular 工作空间与项目文件夹的结构。

* [npm Packages](guide/npm-packages): The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm](https://docs.npmjs.com/) packages and distributed via the npm registry. The Angular CLI creates a default `package.json` file, which specifies a starter set of packages that work well together and jointly support many common application scenarios.

  [npm 包](guide/npm-packages)：Angular 框架、CLI 和应用中使用的组件都是用 [npm](https://docs.npmjs.com/) 打包的，并通过 npm 注册服务器进行发布。Angular CLI 会创建一个默认的 `package.json` 文件，它会指定一组初始的包，它们可以一起使用，共同支持很多常见的应用场景。

* [TypeScript configuration](guide/typescript-configuration): TypeScript is the primary language for Angular application development.

  [TypeScript 配置](guide/typescript-configuration)：TypeScript 是 Angular 应用开发的主要语言。

* [Browser support](guide/browser-support): Make your apps compatible across a wide range of browsers.

  [浏览器支持](guide/browser-support)：学习如何让你的应用能和各种浏览器兼容。

* [Building and Serving](guide/build): Learn to define different build and proxy server configurations for your project, such as development, staging, and production.

  [构建与运行](guide/build)：学习为项目定义不同的构建和代理服务器设置的配置方式，比如开发、预生产和生产。

* [Deployment](guide/deployment): Learn techniques for deploying your Angular application to a remote server.

  [发布](guide/deployment)：学习把你的应用发布到远端服务器的技巧。
