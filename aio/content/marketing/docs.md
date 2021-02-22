<h1 class="no-toc">Introduction to the Angular Docs</h1>

<h1 class="no-toc">Angular 文档简介</h1>

Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.

Angular 是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用。

These Angular docs help you learn and use the Angular framework and development platform, from your first application to optimizing complex single-page apps for enterprises.
Tutorials and guides include downloadable examples to accelerate your projects.

这份 Angular 文档会帮助你学习和使用 Angular 框架与开发平台，从你的第一个应用开始，一直到优化复杂的企业级单页面应用。
这些教程和指南中都包含可下载的范例，以加速你的学习。

<div class="card-container">
  <a href="guide/setup-local" class="docs-card"
    title="Angular Local Environment Setup">
      <section>Get Started</section>
      <section>开始工作</section>
      <p>Set up your local environment for development with the Angular CLI.</p>
      <p>使用 Angular CLI 搭建本地开发环境</p>
      <p class="card-footer">Local setup</p>
      <p class="card-footer">开始搭建</p>
  </a>
  <a href="guide/architecture" class="docs-card" title="Angular Concepts">
      <section>Learn and Explore</section>
      <section>深入探索</section>
      <p>Learn about the fundamental design concepts and architecture of Angular apps.</p>
      <p>学习 Angular 应用的更多知识及架构特性</p>
      <p class="card-footer">Introduction to Angular concepts</p>
      <p class="card-footer">架构</p>
  </a>
  <a href="start" class="docs-card" title="Try out Angular">
      <section>Take a Look</section>
      <section>走马观花</section>
      <p>Examine and work with a small ready-made Angular app, without any setup.</p>
      <p>零设置，试用一个现成的 Angular 应用</p>
      <p class="card-footer">Try it now</p>
      <p class="card-footer">现在试试</p>
  </a>
  <a href="tutorial" class="docs-card" title="Create an app">
      <section>Hello World</section>
      <p>Work through a full tutorial to create your first app.</p>
      <p>一个完整教程，带你从头到尾创建首个应用</p>
      <p class="card-footer">Tour of Heroes tutorial</p>
      <p class="card-footer">英雄之旅教程</p>
  </a>

</div>

## Assumptions

## 基本假设

These docs assume that you are already familiar with [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML "Learn HTML"), [CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps "Learn CSS"), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript "Learn JavaScript"),
and some of the tools from the [latest standards](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources "Latest JavaScript standards"), such as [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes "ES2015 Classes") and [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import "ES2015 Modules").
The code samples are written using [TypeScript](https://www.typescriptlang.org/ "TypeScript").
Most Angular code can be written with just the latest JavaScript, using [types](https://www.typescriptlang.org/docs/handbook/classes.html "TypeScript Types") for dependency injection, and using [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html "Decorators") for metadata.

本文档假设你已经熟悉了 [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML "Learn HTML")，[CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps "Learn CSS")，[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript "Learn JavaScript") 和来自 [最新标准](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources "Latest JavaScript standards") 的一些知识，比如  [类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes "ES2015 Classes") 和 [模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import "ES2015 Modules")。
下列代码范例都是用最新版本的 [TypeScript](https://www.typescriptlang.org/ "TypeScript") 写的。
大多数 Angular 代码都只能用最新的 JavaScript 编写，它会用 [类型](https://www.typescriptlang.org/docs/handbook/classes.html "TypeScript Types") 实现依赖注入，还会用[装饰器](https://www.typescriptlang.org/docs/handbook/decorators.html "Decorators")来提供元数据。

## 私有化部署本文档（译者）

有些企业内部的防火墙比较严格，如果无法打开 <https://angular.cn>，你可以在企业内部进行私有化部署。步骤如下：

本文档的预编译版本位于 [Github](https://github.com/ng-docs/latest.angular.live) 上，如果你想进行私有化部署，请把它 Clone 下来，在 nginx 等服务器上按照静态网站的形式做部署即可，除此之外不需要任何服务端环境。

以 Nginx 为例，你需要在 nginx 上做如下改动：

```
server {
    root /path/to/ng-docs.github.io/;
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

注意其中的 `$uri.html`，这是本文档相对于常规 Angular 应用的主要差别，因为本文档进行了预先渲染（Prerender），这项工作可以让你在不需要 Node 服务器的情况下获得等同于服务端渲染的体验改善。

## Feedback

## 反馈

<h3>You can sit with us!</h3>

<h3>你也可以和我们一起做贡献！</h4>

We want to hear from you. [Report problems or submit suggestions for future docs](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form").

我们希望听到你的声音！[欢迎报告问题或为文档的未来提交建议](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form")。

Contribute to Angular docs by creating
[pull requests](https://github.com/angular/angular/pulls "Angular Github pull requests")
on the Angular Github repository.
See [Contributing to Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md "Contributing guide")
for information about submission guidelines.

请到 Github 上的仓库中创建 [Pull Requests](https://github.com/angular/angular/pulls "Angular Github pull requests") 来为 Angular 文档做出贡献。
[贡献者指南](https://github.com/angular/angular/blob/master/CONTRIBUTING.md "贡献者指南")将会帮助你更好的为社区做贡献。

Our community values respectful, supportive communication.
Please consult and adhere to the [Code of Conduct](https://github.com/angular/code-of-conduct/blob/master/CODE_OF_CONDUCT.md "Contributor code of conduct").

我们的社区提倡相互尊重、相互支持。
参阅[社区行为规范](https://github.com/angular/code-of-conduct/blob/master/CODE_OF_CONDUCT.md "contributor code of conduct")。
