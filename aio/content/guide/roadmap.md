# Angular Roadmap

# Angular 路线图

Angular receives a large number of feature requests, both from inside Google and from the broader open-source community. At the same time, our list of projects contains plenty of maintenance tasks, code refactorings, potential performance improvements, and so on. We bring together representatives from developer relations, product management, and engineering to prioritize this list. As new projects come into the queue, we regularly position them based on relative priority to other projects. As work gets done, projects will move up in the queue.

Angular 从 Google 内部和更广泛的开源社区都收到了大量的特性请求。与此同时，我们的项目列表包含大量维护任务、代码重构、潜在的性能提升等等。我们汇集了来自来自开发者关系部门、产品管理部门和工程部门的代表，以确定此列表的优先顺序。当新项目进入队列时，我们会根据其它项目的相对优先级定期对它们进行排位。当工作完成后，项目就会在队列中向上移动。

The projects below are not associated with a particular Angular version. We'll release them on completion, and they will be part of a specific version based on our release schedule, following semantic versioning. For example, features are released in the next minor after they are complete, or the next major if they include breaking changes.

下面这些项目并没有关联到特定的 Angular 版本。我们会在完成时发布它们，它们会根据我们的发布计划，并遵循语义化版本规范，变成特定版本的一部分。例如，当完成各种特性后会在下一个次要版本中发布，如果包含重大变更，则会到下一个主版本中发布。

## In Progress

## 进展中

### Faster apps by inlining critical styles in Universal applications

### 通过在 Universal 应用中内联关键样式来加速应用的速度

Loading external stylesheets is a blocking operation, which means that the browser can’t start rendering your application until it loads all the referenced CSS. Having render-blocking resources in the header of a page can significantly impact its load performance, for example, its [first contentful paint](https://web.dev/first-contentful-paint/). To make apps faster, we’ve been collaborating with the Google Chrome team on inlining critical CSS and loading the rest of the styles asynchronously.

加载外部样式表是一种阻塞性操作，这意味着在加载完所有引用的 CSS 之前，浏览器无法开始渲染你的应用。在页头中使用阻塞渲染的资源会对其加载性能产生很大的影响，例如，它的[首次内容绘制](https://web.dev/first-contentful-paint/)。为了让应用更快，我们一直在与谷歌 Chrome 团队合作，以内联关键性 CSS，并异步加载其他样式。

### Improve debugging with better Angular error messages

### 使用更好的 Angular 错误信息改进调试体验

Error messages often bring limited actionable information to help developers resolve them. We’ve been working on making error messages more discoverable by adding associated codes, developing guides, and other materials to ensure a smoother debugging experience.

错误信息通常会带来有限的可操作信息，以帮助开发者解决问题。我们一直致力于通过添加相关代码、开发指南和其他材料来让错误信息更容易被发现，以确保更顺畅的调试体验。

### Revamp performance dashboards to detect regressions

### 改进性能仪表盘来检测性能退化

We have a set of benchmarks that we run against every code change to ensure Angular aligns with our performance standards. To ensure the framework’s runtime does not regress after a code change, we need to refine some of the existing infrastructure the dashboards step on.

针对每次代码更改，我们都会运行一组基准来确保 Angular 符合我们的性能标准。为确保框架的运行时部分在代码更改后不会退化，我们需要优化仪表盘中的一些现有基础架构。

### Update our e2e testing strategy

### 更新我们的 e2e 测试策略

To ensure we provide a future-proof e2e testing strategy, we want to evaluate the state of Protractor, community innovations, e2e best practices, and explore novel opportunities.

为了确保我们能提供面向未来的 e2e 测试策略，我们希望评估 Protractor 的状态、社区的创新、e2e 最佳实践，并探索新的机会。

### Angular libraries use Ivy

### Angular 库使用 Ivy

Earlier in 2020, we shared an [RFC](https://github.com/angular/angular/issues/38366) for Ivy library distribution. After invaluable feedback from the community, we developed a design of the project. We are now investing in the development of Ivy library distribution, including an update of the library package format to use Ivy compilation, unblock the deprecation of the View Engine library format, and [ngcc](https://angular.io/guide/glossary#ngcc). 

在 2020 年早些时候，我们共享了一个用于 Ivy 库发布方式[的 RFC](https://github.com/angular/angular/issues/38366)。经过社区的宝贵反馈，我们开发出了该项目的设计方案。我们现在正致力于 Ivy 库发布方式开发，包括更新库包的格式，以便使用 Ivy 编译，继续推进弃用 View Engine 库格式以及 [ngcc](https://angular.io/guide/glossary#ngcc)。

### Ensure smooth adoption for future RxJS changes (v7 and beyond)

### 确保顺利采用 RxJS（v7 及更高版本）

We want to ensure Angular developers are taking advantage of the latest capabilities of RxJS and have a smooth transition to the next major releases of the framework. For this purpose, we will explore and document the scope of the changes in v7 and beyond of RxJS and plan an update strategy.

我们希望确保 Angular 开发人员能够充分利用 RxJS 的最新功能，顺利过渡到本框架的下一个主要版本。为此，我们将探索并记录 RxJS 中 v7 及更高版本的变更范围，并制定更新策略。

### Transition the Angular language service to Ivy

### 将 Angular 语言服务过渡到 Ivy

The goal of this project is to improve the experience and remove legacy dependency by transitioning the language service to Ivy. Today the language service still uses the View Engine compiler and type checking, even for Ivy applications. We want to use the Ivy template parser and improved type checking for the Angular Language service to match application behavior. This migration will also be a step towards unblocking the removal of View Engine, which will simplify Angular, reduce the npm package size, and improve the framework's maintainability.

该项目的目标是通过将语言服务过渡到 Ivy 来改善体验并消除旧的依赖。目前，语言服务仍然使用 View Engine 的编译器和类型检查工具，即使对于 Ivy 应用也是如此。我们希望使用 Ivy 模板解析器和改进过的 Angular Language 服务类型检查来适配应用的行为。这次迁移也是推进移除 View Engine 的一步，它可以简化 Angular，减少 npm 的包大小，提高框架的可维护性。

### Increased security with native [Trusted Types](https://web.dev/trusted-types/) in Angular

### 使用 Angular 中的原生[可信类型](https://web.dev/trusted-types/)提高安全性

In collaboration with Google's security team, we're adding support for the new Trusted Types API. This web platform API will help developers build more secure web applications.

我们正在与 Google 的安全团队合作，为新的可信任类型（Trusted Types） API 添加支持。这个网络平台 API 将帮助开发人员构建更安全的 Web 应用。

### Enhanced Angular Material components by integrating [MDC Web](https://material.io/develop/web/)

### [通过集成 MDC Web](https://material.io/develop/web/)改进 Angular Material 组件

MDC Web is a library created by Google's Material Design team that provides reusable primitives for building Material Design components. The Angular team is incorporating these primitives into Angular Material. Using MDC Web will align Angular Material more closely with the Material Design specification, expand accessibility, improve component quality, and improve our team's velocity.

MDC Web 是由 Google 的 Material Design 团队创建的库，它为构建 Material Design 组件提供了可复用的原语。 Angular 团队正在把这些原语融入 Angular Material 中。使用 MDC Web 可以让 Angular Material 与 Material Design 规范更紧密地对齐，提升无障碍性，提高组件的质量，并提高我们团队的开发速度。

### Offer Google engineers better integration with Angular and Google's internal server stack

### 为 Google 工程师提供更好的与 Angular 和 Google 内部服务端堆栈集成方式

This is an internal project to add support for Angular front-ends to Google's internal integrated server stack.

这是一个内部项目，它为 Angular 前端添加了对 Google 内部集成服务端堆栈的支持。

### Streamline releases with consolidated Angular versioning & branching

### 使用统一的 Angular 版本控制和分支策略来简化版本发布

We want to consolidate release management tooling between Angular's multiple GitHub repositories ([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), and [angular/components](https://github.com/angular/components)). This effort will allow us to reuse infrastructure, unify and simplify processes, and improve our release process's reliability.

我们希望在 Angular 的多个 GitHub 仓库（ [angular/angular](https://github.com/angular/angular)、[angular/angular-cli](https://github.com/angular/angular-cli) 和 [angular/components](https://github.com/angular/components) ）之间整合发布管理工具。这项工作将使我们能够复用基础架构，统一和简化流程，并提高发布流程的可靠性。

### Optimized build speed and bundle sizes with Angular CLI webpack 5

### 在 Angular CLI 中使用 webpack 5 来优化构建速度和发布包体积

As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI. To ensure stability, we’ll continue iterating on the implementation to enable build speed and bundle size improvements.

作为 v11 发行版的一部分，我们在 Angular CLI 中引入了 webpack 5 的可选预览版。为了确保稳定性，我们将继续迭代这些实现，以提高构建速度和包大小。

### Higher developer consistency with commit message standardization

### 对提交信息进行标准化，以提高开发人员的一致性

We want to unify commit message requirements and conformance across Angular repositories ([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli)) to bring consistency to our development process and reuse infrastructure tooling.

我们希望统一 Angular 存储库中的对提交信息的要求和一致性（ [angular/angular](https://github.com/angular/angular) ， [angular/components](https://github.com/angular/components) ， [angular/angular-cli](https://github.com/angular/angular-cli) ），以便为我们的开发过程带来一致性，并推进基础设施工具的复用。

### Accelerated debugging and performance profiling with Angular DevTools

### 利用 Angular DevTools 加速调试和性能分析

We are working on development tooling for Angular that will provide utilities for debugging and performance profiling. This project aims to help developers understand the component structure and the change detection in an Angular application.

我们正致力于增强 Angular 的开发工具，它将为调试和性能分析提供实用工具。该项目旨在帮助开发人员理解 Angular 应用中的组件结构和变更检测。

### Improved developer onboarding with refreshed introductory documentation

### 利用新的入门文档改进开发人员的入门培训

We will redefine the user learning journeys and refresh the introductory documentation. We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.

我们将重新定义用户的学习之旅，并刷新入门文档。我们将清楚地说明 Angular 的优点、告诉你如何探索它的功能并提供一些指导，以便开发人员能够在尽可能短的时间内熟练掌握该框架。

## Future

## 未来

### Better developer ergonomics with strict typing for `@angular/forms`

### 通过为 `@angular/forms` 实现严格类型化来提升开发效率

We will work on implementing stricter type checking for reactive forms. This way, we will allow developers to catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.

我们将努力为响应式表单实现更严格的类型检查。这样，我们就可以让开发人员在开发期间捕获更多的问题，提供更好的文本编辑器和 IDE 支持，并改进对响应式表单的类型检查。

### Leverage full framework capabilities with Zone.js opt-out

### 提升无 Zone.js 方案的完整框架能力

We are going to design and implement a plan to make Zone.js optional from Angular applications. This way, we will simplify the framework, improve debugging, and reduce application bundle size. Additionally, this will allow us to take advantage of native async/await syntax, which currently Zone.js does not support.

我们将设计并实现一个让 Angular 应用中的 Zone.js 变成可选项的计划。这样，我们就可以简化框架，改进调试，减少应用包的大小。这将使我们能够利用原生的 async / await 语法，这是目前的 Zone.js 方案无法支持的。

### Reduce framework overhead by removing legacy [View Engine](https://angular.io/guide/ivy)

### 移除旧版 [View Engine](https://angular.io/guide/ivy) 以减少框架开销

After the transition of all our internal tooling to Ivy has completed, we want to remove the legacy View Engine for smaller Angular conceptual overhead, smaller package size, lower maintenance cost, and lower complexity of the codebase.

把所有内部工具都转换成 Ivy 之后，我们希望删除旧版的 View Engine，以减少 Angular 的概念负担，缩小封装尺寸，降低维护成本，降低代码库的复杂性。

### Improved test times and debugging with automatic test environment tear down

### 将测试环境拆除工作自动化，以缩短测试和调试时间

To improve test time and create better isolation across tests, we want to change `TestBed` to automatically clean up and tear down the test environment after each test run.

为了改善测试时间并在各个测试之中实现更好的隔离，我们希望 `TestBed` 自动清理并拆除测试环境。

### Improved build performance with ngc as a tsc plugin distribution

### 将 ngc 作为 tsc 的插件，以提高构建性能

Distributing the Angular compiler as a plugin of the TypeScript compiler will substantially improve developers' build performance and reduce maintenance costs.

将 Angular 编译器作为 TypeScript 编译器的插件进行发布，可以大大提高开发人员的构建性能，降低维护成本。

### Support adding directives to host elements

### 支持向宿主元素添加指令

A long-standing feature request is to add the ability to add directives to host elements. The feature will allow developers to augment their own components with additional behaviors without using inheritance. The project will require substantial effort in terms of the definition of APIs, semantics, and implementation.

一项由来已久的特性请求是增加为宿主元素添加指令的能力。该特性允许开发人员使用额外的行为来扩展自己的组件，而不必使用继承。该项目在定义 API、语义和实现方面都需要付出巨大的努力。

### Simplified Angular mental model with optional NgModules

### 通过可选 NgModule 来简化 Angular 的心智模型

To simplify the Angular mental model and learning journey, we’ll be working on making NgModules optional. This work will allow developers to develop standalone components and implement an alternative API for declaring the component’s compilation scope.

为了简化 Angular 的心智模型和学习之旅，我们将努力让 NgModule 成为可选项。这项工作将允许开发人员开发独立的组件，并实现另一种 API 来声明组件的编译范围。

### Ergonomic component level code-splitting APIs

### 更符合工效学的组件级代码分割 API

A common problem of web applications is their slow initial load time. A way to improve it is to apply more granular code-splitting on a component level. To encourage this practice, we’ll be working on more ergonomic code-splitting APIs.

Web 应用最常见的问题之一是它们的初始加载时间很慢。改进它的方式之一是在组件级别进行更精细的代码分割。为了鼓励这种做法，我们将致力于设计更符合工效学的代码分割 API。

