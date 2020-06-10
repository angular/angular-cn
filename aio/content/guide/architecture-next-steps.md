# Next steps: tools and techniques

# 后续步骤：工具与技巧

After you understand the basic Angular building blocks, you can learn more
about the features and tools that can help you develop and deliver Angular applications.

在了解了基本的 Angular 构建块之后，你可以进一步了解可以帮助你开发和交付 Angular 应用的特性和工具。

* Work through the [Tour of Heroes](tutorial) tutorial to get a feel for how to fit the basic building blocks together to create a well-designed application.

  参考“[英雄指南”](tutorial/index)教程，了解如何将这些基本构建块放在一起，来创建设计精良的应用。

* Check out the [Glossary](guide/glossary) to understand Angular-specific terms and usage.

  查看[词汇表](guide/glossary)，了解 Angular 特有的术语和用法。

* Use the documentation to learn about key features in more depth, according to your stage of development and areas of interest.

  根据你的开发阶段和感兴趣的领域，使用该文档更深入地学习某些关键特性。

## Application architecture

## 应用架构

* The [Components and templates](guide/displaying-data) guide explains how to connect the application data in your [components](guide/glossary#component) to your page-display [templates](guide/glossary#template), to create a complete interactive application.

  [组件与模板](guide/displaying-data)一章中介绍了如何把组件中的应用数据与页面显示[模板](guide/glossary#template)联系起来，以创建一个完整的交互式应用。

* The [NgModules](guide/ngmodules) guide provides in-depth information on the modular structure of an Angular application.

  [NgModules](guide/ngmodules)一章中提供了关于 Angular 应用模块化结构的深度信息。

* The [Routing and navigation](guide/router) guide provides in-depth information on how to construct applications that allow a user to navigate to different [views](guide/glossary#view) within your single-page app.

  [路由与导航](guide/router)一章中提供了一些深度信息，教你如何构造出一个允许用户导航到单页面应用中不同[视图](guide/glossary#view) 的应用。

* The [Dependency injection](guide/dependency-injection) guide provides in-depth information on how to construct an application such that each component class can acquire the services and objects it needs to perform its function.

  [依赖注入](guide/dependency-injection)一章提供了一些深度信息，教你如何让每个组件类都可以获取实现其功能所需的服务和对象。

## Responsive programming

## 响应式编程

The **Components and Templates** guide provides guidance and details of the [template syntax](guide/template-syntax) that you use to display your component data when and where you want it within a view, and to collect input from users that you can respond to.

**“组件和模板”**一章提供了[模板语法](guide/template-syntax)的指南和详细信息，用于在视图中随时随地显示组件数据，并从用户那里收集输入，以便做出响应。

Additional pages and sections describe some basic programming techniques for Angular apps.

其它页面和章节则描述了 Angular 应用的一些基本编程技巧。

* [Lifecycle hooks](guide/lifecycle-hooks): Tap into key moments in the lifetime of a component, from its creation to its destruction, by implementing the lifecycle hook interfaces.

  [生命周期钩子](guide/lifecycle-hooks)：通过实现生命周期钩子接口，可以窃听组件生命周期中的一些关键时刻 —— 从创建到销毁。

* [Observables and event processing](guide/observables): How to use observables with components and services to publish and subscribe to messages of any type, such as user-interaction events and asynchronous operation results.

  [可观察对象（Observable）和事件处理](guide/observables)：如何在组件和服务中使用可观察对象来发布和订阅任意类型的消息，比如用户交互事件和异步操作结果。

* [Angular elements](guide/elements): How to package components as *custom elements* using Web Components, a web standard for defining new HTML elements in a framework-agnostic way.

  [Angular 自定义元素](guide/elements)：如何使用 Web Components 把组件打包成*自定义元素*，Web Components 是一种以框架无关的方式定义新 HTML 元素的 Web 标准。

* [Forms](guide/forms-overview): Support complex data entry scenarios with HTML-based input validation.

  [表单](guide/forms-overview)：通过基于 HTML 的输入验证，来支持复杂的数据录入场景。

* [Animations](guide/animations): Use Angular's animation library to animate component behavior
without deep knowledge of animation techniques or CSS.

  [动画](guide/animations)：使用 Angular 的动画库，你可以让组件支持动画行为，而不用深入了解动画技术或 CSS。

## Client-server interaction

## “客户端-服务器”交互

Angular provides a framework for single-page apps, where most of the logic and data resides on the client.
Most apps still need to access a server using the `HttpClient` to access and save data.
For some platforms and applications, you might also want to use the PWA (Progressive Web App) model to improve the user experience.

Angular 为单页面应用提供了一个框架，其中的大多数逻辑和数据都留在客户端。大多数应用仍然需要使用 `HttpClient` 来访问服务器，以访问和保存数据。对于某些平台和应用，你可能还希望使用 PWA（渐进式 Web 应用）模型来改善用户体验。

* [HTTP](guide/http): Communicate with a server to get data, save data, and invoke server-side actions with an HTTP client.

  [HTTP](guide/http)：与服务器通信，通过 HTTP 客户端来获取数据、保存数据，并调用服务端的动作。

* [Server-side rendering](guide/universal): Angular Universal generates static application pages on the server through server-side rendering (SSR). This allows you to run your Angular app on the server in order to improve performance and show the first page quickly on mobile and low-powered devices, and also facilitate web crawlers.

  [服务器端渲染](guide/universal)：Angular Universal 通过服务器端渲染（SSR）在服务器上生成静态应用页面。这允许你在服务器上运行 Angular 应用，以提高性能，并在移动设备和低功耗设备上快速显示首屏，同时也方便了网页抓取工具。

* [Service workers and PWA](guide/service-worker-intro): Use a service worker to reduce dependency on the network and significantly improve the user experience.

  [Service Worker 和 PWA](guide/service-worker-intro)：使用 Service Worker 来减少对网络的依赖，并显著改善用户体验。

* [Web workers](guide/web-worker): Learn how to run CPU-intensive computations in a background thread.

  [Web worker](guide/web-worker)：学习如何在后台线程中运行 CPU 密集型的计算。

## Support for the development cycle

## 为开发周期提供支持

The **Development Workflow** section describes the tools and processes you use to compile, test, and  and deploy Angular applications.

**“开发工作流”**部分描述了用于编译、测试和部署 Angular 应用的工具和过程。

* [CLI Command Reference](cli): The Angular CLI is a command-line tool that you use to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

  [CLI 命令参考手册](cli)：Angular CLI 是一个命令行工具，可用于创建项目、生成应用和库代码，以及执行各种持续开发任务，如测试、打包和部署。

* [Compilation](guide/aot-compiler): Angular provides just-in-time (JIT) compilation for the development environment, and ahead-of-time (AOT) compilation for the production environment.

  [编译](guide/aot-compiler)：Angular 为开发环境提供了 JIT（即时）编译方式，为生产环境提供了 AOT（预先）编译方式。

* [Testing platform](guide/testing): Run unit tests on your application parts as they interact with the Angular framework.

  [测试平台](guide/testing)：对应用的各个部件运行单元测试，让它们好像在和 Angular 框架交互一样。

* [Deployment](guide/deployment): Learn techniques for deploying your Angular application to a remote server.

  [部署](guide/deployment)：学习如何把 Angular 应用部署到远端服务器上。

* [Security guidelines](guide/security): Learn about Angular's built-in protections against common web-app vulnerabilities and attacks such as cross-site scripting attacks.

  [安全指南](guide/security)：学习 Angular 对常见 Web 应用的弱点和工具（比如跨站脚本攻击）提供的内置防护措施。

* [Internationalization](guide/i18n): Make your app available in multiple languages with Angular's internationalization (i18n) tools.

  [国际化](guide/i18n) ：借助 Angular 的国际化（i18n）工具，可以让你的应用支持多语言环境。

* [Accessibility](guide/accessibility): Make your app accessible to all users.

  [无障碍性](guide/accessibility)：让所有用户都能访问你的应用。

## File structure, configuration, and dependencies

## 文件结构、配置和依赖

* [Workspace and file structure](guide/file-structure): Understand the structure of Angular workspace and project folders.

 [工作区与文件结构](guide/file-structure)：理解 Angular 工作区与项目文件夹的结构。

* [Building and serving](guide/build): Learn to define different build and proxy server configurations for your project, such as development, staging, and production.

  [构建与运行](guide/build)：学习为项目定义不同的构建和代理服务器设置的配置方式，比如开发、预生产和生产。

* [npm packages](guide/npm-packages): The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm](https://docs.npmjs.com/) packages and distributed via the npm registry. The Angular CLI creates a default `package.json` file, which specifies a starter set of packages that work well together and jointly support many common application scenarios.

  [npm 包](guide/npm-packages)：Angular 框架、Angular CLI 和 Angular 应用中用到的组件都是用 [npm](https://docs.npmjs.com/) 打包的，并通过 npm 注册服务器进行发布。Angular CLI 会创建一个默认的 `package.json` 文件，它会指定一组初始的包，它们可以一起使用，共同支持很多常见的应用场景。

* [TypeScript configuration](guide/typescript-configuration): TypeScript is the primary language for Angular application development.

  [TypeScript 配置](guide/typescript-configuration)：TypeScript 是 Angular 应用开发的主要语言。

* [Browser support](guide/browser-support): Make your apps compatible across a wide range of browsers.

  [浏览器支持](guide/browser-support)：让你的应用能和各种浏览器兼容。

## Extending Angular

## 扩展 Angular

* [Angular libraries](guide/libraries): Learn about using and creating re-usable libraries.

  [Angular 库](guide/libraries)：学习如何使用和创建可复用的库。

* [Schematics](guide/schematics): Learn about customizing and extending the CLI's generation capabilities.

  学习[原理图](guide/schematics) ：学习如何自定义和扩展 CLI 的生成（`generate`）能力。

* [CLI builders](guide/cli-builder): Learn about customizing and extending the CLI's ability to apply tools to perform complex tasks, such as building and testing applications.

  [CLI 构建器](guide/cli-builder)：学习如何自定义和扩展 CLI 的能力，让它使用工具来执行复杂任务，比如构建和测试应用。
