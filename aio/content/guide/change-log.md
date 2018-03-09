# Change Log

# 变更记录

The Angular documentation is a living document with continuous improvements.
This log calls attention to recent significant changes.

我们将持续不断的更新和改进Angular文档。本日志记录了近期最重要的变更。

## Updated to Angular 4.0. Documentation for Angular 2.x can be found at [v2.angular.io](https://v2.angular.io).

## 更新到 Angular 4.0 。Angular 2.x 的文档在 [v2.angular.io](https://v2.angular.io) 。

## All mention of moduleId removed. "Component relative paths" guide deleted (2017-03-13)

## 移除了所有的moduleId引用。移除了“组件相对路径” 的烹饪书。(2017-03-13)

We added a new SystemJS plugin (systemjs-angular-loader.js) to our recommended SystemJS configuration.
This plugin dynamically converts "component-relative" paths in templateUrl and styleUrls to "absolute paths" for you.

我们往建议的SystemJS配置中新增了一个SystemJS插件 (systemjs-angular-loader.js) 。
这个插件可以帮你把templateUrl和styleUrls中的组件相对路径动态转换为绝对路径。

We strongly encourage you to only write component-relative paths.
That is the only form of URL discussed in these docs. You no longer need to write @Component({ moduleId: module.id }), nor should you.

我们强烈建议你只写组件相对路径。
这也是本文档中所使用的唯一形式。你不必再写`@Component({ moduleId: module.id })`，而且也不应该再这么写。

## NEW: Downloadable examples for each guide (2017-02-28)

## 新增：每篇指南都增加了可下载的范例程序 (2017-02-28)

Now you can download the sample code for any guide and run it locally.
Look for the new download links next to the "live example" links.

现在你可以为任何一篇指南下载范例程序，并且在本地运行它了。
请在“在线例子”的链接后面查找新的下载链接。

## Template Syntax/Structural Directives: refreshed (2017-02-06)

## 模板语法/结构型指令：更新了 (2017-02-06)

The [_Template-Syntax_](guide/template-syntax) and [_Structural Directives_](guide/structural-directives)
guides were significantly revised for clarity, accuracy, and current recommended practices.
Discusses `<ng-container>`.
Revised samples are more clear and cover all topics discussed.

对[模板语法](guide/template-syntax) 和 [结构型指令](guide/structural-directives)这两篇指南做了大幅修改，来让它们更加清晰、准确，并符合当前的最佳实践。
讨论了`<ng-container>`。
修改了例子，来让它们更清晰，并且涵盖了所有讨论到的主题。

## NEW: Samples re-structured with `src/` folder (2017-02-02)

## 新增：调整了范例程序的结构，移到了`src/`文件夹 (2017-02-02)

All documentation samples have been realigned with the default folder structure of the Angular CLI.
That's a step along the road to basing the sample in the Angular CLI.
But it's also good in its own right.
It helps clearly separate app code from setup and configuration files.

所有的文档范例都已经向Angular CLI的默认文件夹结构看齐了。
这是把范例迁移到Angular CLI过程中的一步。
不过也不仅是为了迁移，它确实能帮我们把应用代码从环境代码和配置代码中分离出来。

All samples now have a `src/` folder at the project root.
The former `app/` folder moves under `src/`.
Read about moving your existing project to this structure in
<a href="https://github.com/angular/quickstart#updating-to-a-newer-version-of-the-quickstart-repo" target="Migrating samples/quickstart app to the src folder">
the QuickStart repo update instructions</a>.

我们已经把所有范例改成了使用项目根目录下的`src/`文件夹。
也就是把以前的`app/`文件夹移到了`src/`文件夹下面。
要了解如何对你的现有工程进行这种迁移，请参阅<a href="https://github.com/angular/quickstart#updating-to-a-newer-version-of-the-quickstart-repo" target="_blank" target="把范例中的应用迁移到src文件夹">QuickStart中的迁移指南</a>。

Notably:

要点：

* `app/main.ts` moved to `src/main.ts`.

   把`app/main.ts`移到`src/main.ts`。

* `app/` moved to `src/app/`.

   把`app/`移到`src/app/`。

* `index.html`, `styles.css` and `tsconfig.json` moved inside `src/`.

   把`index.html`、`styles.css`和`tsconfig.json`移到`src/`中。

* `systemjs.config.js` now imports `main.js` instead of `app`.

   `systemjs.config.js`现在要导入`main.js`而不是`app`。

* Added `lite-server` configuration (`bs-config.json`) to serve `src/`.

   新增了一个`lite-server`配置(`bs-config.json`)以便在`src/`下启动开发服务器。

## NEW: Reactive Forms guide (2017-01-31)

## 新增：响应式（Reactive）表单指南 (2017-01-31)

The new [**Reactive Forms**](guide/reactive-forms) guide explains how and why to build a "reactive form".
"Reactive Forms" are the code-based counterpart to the declarative "Template Driven" forms approach
introduced in the [Forms](guide/forms) guide.
Check it out before you decide how to add forms to your app.
Remember also that you can use both techniques in the same app,
choosing the approach that best fits each scenario.

新的[**响应式表单**](guide/reactive-forms)指南解释了如何以及何时构建“响应式表单”。
“响应式表单”是基于代码的表单构建方式，与[表单](guide/forms)中介绍的声明“模板驱动”表单的方法相对。
在你决定如何往应用中添加表单之前，建议先读读那一章。
同时，别忘了你可以在同一个应用中同时使用这两种技术，根据场景来选择最合适的方法。

## NEW: Deployment guide (2017-01-30)

## 新增：部署指南 (2017-01-30)

The new [Deployment](guide/deployment) guide describes techniques for putting your application on a server.
It includes important advice on optimizing for production.

新的[部署指南](guide/deployment)讲的是如何把应用放到服务器上。
其中包括了为生产环境进行优化的重要建议。

## Hierarchical Dependency Injection: refreshed (2017-01-13)

## 多级依赖注入：更新完毕 (2017-01-13)

[Hierarchical Dependency Injection](guide/hierarchical-dependency-injection) guide is significantly revised.
Closes issue #3086.
Revised samples are clearer and cover all topics discussed.

[多级依赖注入](guide/hierarchical-dependency-injection)做了显著修改。关闭了issue #3086。修改过的范例更加清晰，而且涵盖了讨论到的全部主题。

## Miscellaneous (2017-01-05)

## 杂项 (2017-01-05)

* [Setup](guide/setup) guide:
added (optional) instructions on how to remove _non-essential_ files.

   [环境搭建](guide/setup)指南:
  添加了（可选的）步骤说明，告诉你如何移除*非核心*文件。

* No longer consolidate RxJS operator imports in `rxjs-extensions` file; each file should import what it needs.

   不再在`rxjs-extensions`文件中统一导入RxJS的操作符，每个文件应该各自导入它自己所需的。

* All samples prepend template/style URLs with `./` as a best practice.

   所有范例都在模板/样式的URL之前添加`./`前缀 …… 而且你在实际开发中也应该这么做。

* [Style Guide](guide/styleguide): copy edits and revised rules.

   [风格指南](guide/styleguide)：复制了编辑过的和修改过的规则。

## Router: more detail (2016-12-21)

## 路由：更详细 (2016-12-21)

Added more information to the [Router](guide/router) guide
including sections named outlets, wildcard routes, and preload strategies.

往[路由指南](guide/router)中添加了更多信息，包括“命名出口（Outlet）”、通配符路由和预加载策略。

## HTTP: how to set default request headers (and other request options) (2016-12-14)

## Http：如何设置默认的请求头（以及其它配置项） (2016-12-14)

Added section on how to set default request headers (and other request options) to
HTTP guide.

添加了一节“如何设置默认的请求头（以及其它配置项）”

## Testing: added component test plunkers (2016-12-02)

## 测试：添加了组件测试的plunker范例 (2016-12-02)

Added two plunkers that each test _one simple component_ so you can write a component test plunker of your own: <live-example name="setup" plnkr="quickstart-specs">one</live-example> for the QuickStart seed's `AppComponent` and <live-example name="testing" plnkr="banner-specs">another</live-example> for the Testing guide's `BannerComponent`.
Linked to these plunkers in "Testing" and "Setup anatomy" guides.

添加了两个plunker例子，每个都测试一个简单的组件，以便你可以自己在plunker中写组件测试：<live-example name="setup" plnkr="quickstart-specs">一个</live-example>用于测试快速起步中的`AppComponent`，<live-example name="testing" plnkr="banner-specs">另一个</live-example>用于测试“测试”章节的`BannerComponent`。
并在“测试”和“环境设置剖析”中链接到它们。

## Internationalization: pluralization and _select_ (2016-11-30)

## 国际化：单复数和`select` (2016-11-30)

The [Internationalization (i18n)](guide/i18n) guide explains how to handle pluralization and
translation of alternative texts with `select`.
The sample demonstrates these features too.

[国际化 (i18n)](guide/i18n)解释了如何处理单复数问题，和如何使用`select`来翻译候选内容。
例子中也演示了这些特性。

## Testing: karma file updates (2016-11-30)

## 测试：更新了karma文件 (2016-11-30)

* `karma.config` + `karma-test-shim` can handle multiple spec source paths;
see quickstart issue: [angular/quickstart#294](https://github.com/angular/quickstart/issues/294).

   `karma.config` + `karma-test-shim`可以处理多个测试源文件路径了，参见[angular/quickstart#294](https://github.com/angular/quickstart/issues/294)。

* Displays Jasmine Runner output in the karma-launched browser.

   在启动了karma的浏览器中显示Jasmine的输出。

## QuickStart Rewrite (2016-11-18)

## 全新《快速上手》 (2016-11-18)

The QuickStart is completely rewritten so that it actually is quick.
It references a minimal "Hello Angular" app running in Plunker.
The new [Setup](guide/setup) page tells you how to install a local development environment
by downloading (or cloning) the QuickStart github repository.
You are no longer asked to copy-and-paste code into setup files that were not explained anyway.

完全重写了《快速上手》，变得更加快速。
它使用了在 Plunker 中运行的最小化的 “Hello Angular” 应用。
新添加的[搭建本地开发环境](guide/setup)页面解释了如何通过下载或者克隆 QuickStart github 库来安装本地开发环境。
你将不再需要拷贝粘贴代码到一些并没有对其解释的配置文件中。

## Sync with Angular v.2.2.0 (2016-11-14)

## 与Angular v.2.2.0同步(2016-11-14)

Docs and code samples updated and tested with Angular v.2.2.0.

使用Angular v.2.2.0更新和测试所有文档和代码例子。

## UPDATE: NgUpgrade Guide for the AOT friendly _upgrade/static_ module (2016-11-14)

## 更新：用于AoT的_upgrade/static_模块NgUpgrade指南 (2016-11-14)

The updated [NgUpgrade Guide](guide/upgrade) guide covers the
new AOT friendly `upgrade/static` module
released in v.2.2.0, which is the recommended
facility for migrating from AngularJS to Angular.
The documentation for the version prior to v.2.2.0 has been removed.

更新的[NgUpgrade指南](guide/upgrade)涵盖在v.2.2.0发布的AoT`upgrade/static`模块，
是从AngularJS升级至Angular的推荐工具。
删除早于v.2.2.0版本的文档。

## ES6  described in "TypeScript to JavaScript" (2016-11-14)

## 在“从TypeScript到JavaScript”增加ES6的描述 (2016-11-14)

The updated TypeScript to JavaScript guide explains how to write apps in ES6/7
by translating the common idioms in the TypeScript documentation examples
(and elsewhere on the web) to ES6/7 and ES5.

更新了“从TypeScript到JavaScript”，以解释如何使用ES6/7编写应用。
将TypeScript文档示例中（以及网站其它地方）的习惯用法翻译成ES6/7和ES5。

This was [removed in August 2017](https://github.com/angular/angular/pull/18694) but can still be
viewed in the [v2 documentation](https://v2.angular.io/docs/ts/latest/cookbook/ts-to-js.html).

本章已经 [于2017年8月移除](https://github.com/angular/angular/pull/18694)，
不过仍然可以在[第二版的文档中](https://v2.angular.io/docs/ts/latest/cookbook/ts-to-js.html)看到。

## Sync with Angular v.2.1.1 (2016-10-21)

## 与Angular v.2.1.1 同步(2016-10-21)

Docs and code samples updated and tested with Angular v.2.1.1.

使用Angular v.2.1.1更新和测试所有文档和代码例子。

## npm _@types_ packages replace _typings_ (2016-10-20)

## 使用npm的_@types_包替换_typings_ (2016-10-20)

Documentation samples now get TypeScript type information for 3rd party libraries
from npm `@types` packages rather than with the _typings_ tooling.
The `typings.json` file is gone.

文档例子现在从npm的`@types`第三方库获取TypeScript类型信息，不再使用_typings_。
删除`typings.json`文件。

The [AngularJS Upgrade](guide/upgrade) guide reflects this change.
The `package.json` installs `@types/angular` and several `@types/angular-...`
packages in support of upgrade; these are not needed for pure Angular development.

"[从AngularJS升级](guide/upgrade)"指南反映了这个变化。
`package.json`安装`@types/angular`和一些`@types/angular-...`包来支持升级。它们在纯Angular开发中是不需要的。

## "Template Syntax" explains two-way data binding syntax (2016-10-20)

## "模板语法"添加了双向数据绑定语法的解释(2016-10-20)

Demonstrates how to two-way data bind to a custom Angular component and
re-explains `[(ngModel)]` in terms of the basic `[()]` syntax.

展示了如何在自定义Angular组件中双向数据绑定，用基础`[()]`重新解释`[(ngModel)]`。

## BREAKING CHANGE: `in-memory-web-api` (v.0.1.11) delivered as esm umd (2016-10-19)

## 破坏性变化：`in-memory-web-api` (v.0.1.11) 以esm umd的形式发布 (2016-10-19)

This change supports ES6 developers and aligns better with typical Angular libraries.
It does not affect the module's API but it does affect how you load and import it.
See the <a href="https://github.com/angular/in-memory-web-api/blob/master/CHANGELOG.md#0113-2016-10-20">change note</a>
in the `in-memory-web-api` repo.

这个变化支持ES6开发者，并与典型的Angular库看齐。
它不会影响模块的API，但是它改变了加载和导入它的方式。
参见`in-memory-web-api`库的<a href="https://github.com/angular/in-memory-web-api/blob/master/CHANGELOG.md#0113-2016-10-20" target="_blank">变更记录</a>。

## "Router" _preload_ syntax and _:enter_/_:leave_ animations (2016-10-19)

## "路由器"_预加载_语法和_:enter_/_:leave_动画(2016-10-19)

The router can lazily _preload_ modules _after_ the app starts and
_before_ the user navigates to them for improved perceived performance.

路由器可以在应用启动_之后_和用户导航到惰性加载模块_之前_，预先加载惰性模块，以增强性能。

New `:enter` and `:leave` aliases make animation more natural.

新`:enter`和`:leave`语法，让动画更加自然。

## Sync with Angular v.2.1.0 (2016-10-12)

## 与Angular v.2.1.0同步(2016-10-12)

Docs and code samples updated and tested with Angular v.2.1.0.

使用Angular v.2.1.0更新和测试所有文档和代码例子。

## NEW "Ahead of time (AOT) Compilation" guide (2016-10-11)

## 添加了新的“预编译(AoT)"烹饪书(2016-10-11)

The NEW [Ahead of time (AOT) Compilation](guide/aot-compiler) guide
explains what AOT compilation is and why you'd want it.
It demonstrates the basics with a QuickStart app
followed by the more advanced considerations of compiling and bundling the Tour of Heroes.

全新[预编译(AoT)](guide/aot-compiler)烹饪书介绍了什么是AoT编译和为何你需要它。
它以**快速上手**应用程序开始讲解，接着介绍了编译和构建**英雄指南**的更高级的注意事项。

## Sync with Angular v.2.0.2 (2016-10-6)

## 与Angular v.2.0.2同步 (2016-10-6)

Docs and code samples updated and tested with Angular v.2.0.2.

使用Angular v.2.0.2更新和测试所有文档和代码例子。

## "Routing and Navigation" guide with the _Router Module_ (2016-10-5)

## 在“路由和导航”向导中添加**路由模块** (2016-10-5)

The [Routing and Navigation](guide/router) guide now locates route configuration
in a _Routing Module_.
The _Routing Module_ replaces the previous _routing object_ involving the `ModuleWithProviders`.

[Routing and Navigation](guide/router)现在在**路由模块**中设置路由配置。
**路由模块**替换之前的**路由对象**，使用了`ModuleWithProviders`。

All guided samples with routing use the _Routing Module_ and prose content has been updated,
most conspicuously in the
[NgModule](guide/ngmodules) guide and [NgModule FAQ](guide/ngmodule-faq) guide.

所有使用路由的例子都使用**路由模块**，相关内容也被更新。更新最多的是[Angular模块（NgModule）](guide/ngmodules)章和[Angular模块常见问题](guide/ngmodule-faq)烹饪书。

## New "Internationalization" guide (2016-09-30)

## 全新“国际化”烹饪书(2016-09-30)

Added a new [Internationalization (i18n)](guide/i18n) guide that shows how
to use Angular "i18n" facilities to translate template text into multiple languages.

添加了新的[国际化(i18n)](guide/i18n)烹饪书，展示了如何使用Angular的“i18n”工具来讲模板文本翻译到多种语言。

## "angular-in-memory-web-api" package rename (2016-09-27)

## 重命名“angular-in-memory-web-api”包(2016-09-27)

Many samples use the `angular-in-memory-web-api` to simulate a remote server.
This library is also useful to you during early development before you have a server to talk to.

许多例子使用了`angular-in-memory-web-api`来模拟远程服务器。
这个库在你拥有服务器之前的早期开发阶段也很有用。

The package name was changed from "angular2-in-memory-web-api" which is still frozen-in-time on npm.
The new "angular-in-memory-web-api" has new features.
<a href="https://github.com/angular/in-memory-web-api/blob/master/README.md">Read about them on github</a>.

这个包的名字从“angular2-in-memory-web-api”（仍然有效，但不再更新了）重新命名了。
新的“angular-in-memory-web-api”有新的功能。
<a href="https://github.com/angular/in-memory-web-api/blob/master/README.md" target="_blank">到github获得更多详情</a>.

## "Style Guide" with _NgModules_ (2016-09-27)

## “风格指南”中添加了_NgModules_(2016-09-27)

[StyleGuide](guide/styleguide) explains recommended conventions for NgModules.
Barrels now are far less useful and have been removed from the style guide;
they remain valuable but are not a matter of Angular style.
Also relaxed the rule that discouraged use of the `@Component.host` property.

[StyleGuide](guide/styleguide)解释了我们为Angular模块（NgModule）而推荐的约定。
现在，封装桶不再那么重要，风格指南已经移除了它们。
它们仍然很有价值，但是它们与Angular风格无关。
我们同时对**不推荐使用`@Component.host`属性**的规则有所放宽。

## _moduleId: module.id_ everywhere (2016-09-25)

## moduleId：到处添加module.id(2016-09-25)

Sample components that get their templates or styles with `templateUrl` or `styleUrls`
have been converted to _module-relative_ URLs.
Added the `moduleId: module.id` property-and-value to their `@Component` metadata.

在所有使用`templateUrl`或者`styleUrls`来获取模板或样式的例子组件都被转换为**相对模块**的URL。
我们添加了`moduleId: module.id`到它们的`@Component`元数据。

This change is a requirement for compilation with AOT compiler when the app loads
modules with SystemJS as the samples currently do.

当应用像例子当前使用的方法一样 - 使用SystemJS加载模块时，本更新是AoT编译器的前提条件。

## "Lifecycle Hooks" guide simplified (2016-09-24)

## 简化了“生命周期钩子”章(2016-09-24)

The [Lifecycle Hooks](guide/lifecycle-hooks) guide is shorter, simpler, and
draws more attention to the order in which Angular calls the hooks.


[生命周期钩子](guide/lifecycle-hooks)章现在更加简短，并且对强调了Angular是以什么顺序来调用钩子方法的。
