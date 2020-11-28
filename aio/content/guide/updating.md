# Keeping your Angular projects up-to-date

# 持续更新你的 Angular 项目

Just like Web and the entire web ecosystem, Angular is continuously improving. Angular balances continuous improvement with a strong focus on stability and making updates easy. Keeping your Angular app up-to-date enables you to take advantage of leading-edge new features, as well as optimizations and bug fixes.

就像 Web 及其整个生态系统一样，Angular 也在持续改进中。Angular 平衡了持续改进与强调稳定性之间的冲突，努力让升级变得更简单。让 Angular 应用始终保持最新，可以让你获得前沿的新特性所带来的好处，还有各种优化和 Bug 修复。

This document contains information and resources to help you keep your Angular apps and libraries up-to-date.

本文档包含一些信息和资源，来帮助你持续更新 Angular 的应用和库。

For information about our versioning policy and practices&mdash;including
support and deprecation practices, as well as the release schedule&mdash;see [Angular versioning and releases](guide/releases "Angular versioning and releases").

要了解我们的版本策略和实践（包括支持或废弃某些特性时的做法，以及发布计划），请参阅 [Angular 的版本与发布](guide/releases "Angular versioning and releases")。

<div class="alert is-helpful">

If you are currently using AngularJS, see [Upgrading from AngularJS](guide/upgrade "Upgrading from Angular JS"). _AngularJS_ is the name for all v1.x versions of Angular.

如果你正在使用 AngularJS，参阅[从 AngularJS 升级](guide/upgrade "Upgrading from Angular JS")。*AngularJS* 是专用于 Angular v1.x 的名字。

</div>

{@a announce}

## Getting notified of new releases

## 获得新版本的发布通知

To be notified when new releases are available, follow [@angular](https://twitter.com/angular "@angular on Twitter") on Twitter or subscribe to the [Angular blog](https://blog.angular.io "Angular blog").

要想获得新版本发布通知，请关注 Twitter 上的 [@angular](https://twitter.com/angular "@angular on Twitter") 或订阅 [Angular 官方博客](https://blog.angular.io "Angular blog")。

{@a learn}

## Learning about new features

## 了解最新特性

What's new? What's changed? We share the most important things you need to know on the Angular blog in [release announcements]( https://blog.angular.io/tagged/release%20notes "Angular blog - release announcements").

有什么新特性？有哪些变化？我们会在 Angular 官方博客的[发布声明]( https://blog.angular.io/tagged/release%20notes "Angular blog - release announcements")中和你共享那些最重要的信息。

To review a complete list of changes, organized by version, see the [Angular change log](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log").

要查看完整的按版本组织的变更列表，参阅 [Angular 更改记录](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log")。

{@a checking-version-app}

## Checking your version of Angular

## 检查你的 Angular 版本

To check your app's version of Angular: From within your project directory, use the `ng version` command. 

要检查你的应用的 Angular 版本，就到项目目录下执行 `ng version` 命令。

{@a checking-version-angular}

## Finding the current version of Angular

## 查看 Angular 的当前版本

The most recent stable released version of Angular appears in the [Angular documentation](https://angular.io/docs "Angular documentation") at the bottom of the left side navigation. For example, `stable (v5.2.9)`.

在 [Angular 文档站](https://angular.cn/docs "Angular documentation")左侧导航栏的底部可以看到 Angular 最新的稳定版版本号。比如 `stable (v5.2.9)`。

You can also find the most current version of Angular by using the CLI command [`ng update`](cli/update). By default, [`ng update`](cli/update)(without additional arguments) lists the updates that are available to you.

你还可以使用 [CLI 命令 `ng update`](https://github.com/angular/angular-cli/wiki/update "Angular CLI update documentation") 发现 Angular 的最新版本。默认情况下，[`ng update`](cli/update)（不带其它参数）会列出你可用的所有更新。

{@a updating}

## Updating your environment and apps

## 升级你的环境和应用

To make updating easy, we provide complete instructions in the interactive [Angular Update Guide](https://update.angular.io/ "Angular Update Guide").

为了让升级更简单，我们在交互式 [Angular 升级指南](https://update.angular.io/ "Angular Update Guide")中提供了完整的操作指令。

The Angular Update Guide provides customized update instructions, based on the current and target versions that you specify. It includes basic and advanced update paths, to match the complexity of your applications. It also includes troubleshooting information and any recommended manual changes to help you get the most out of the new release.

Angular 升级指南提供了自定义的升级指令，基于当前版本和你指定的目标版本。它包括简单的和高级的升级路径，以适应你应用中的各种复杂情况。它还包括诊断信息和建议的手动修改动作，以帮助你获得最新版本。

For simple updates, the CLI command [`ng update`](cli/update) is all you need. Without additional arguments, [`ng update`](cli/update) lists the updates that are available to you and provides recommended steps to update your application to the most current version.

对于简单的升级工作，你所要做的一切就是执行一下 CLI 命令 [`ng update`](cli/update)。不带额外参数时，[`ng update`](cli/update) 会列出你可用的更新版本，并提供建议的升级步骤，来把你的应用升级到最新版本上来。

[Angular Versioning and Releases](guide/releases#versioning "Angular Release Practices, Versioning") describes the level of change that you can expect based a release's version number. It also describes supported update paths.

[Angular 版本与发布](guide/releases#versioning "Angular Release Practices, Versioning")中描述了你要如何根据版本号来推测所发生的更改等级。它还讲了建议的升级路径。

{@a resources}

## Resource summary

## 资源汇总

* Release announcements: [Angular blog - release announcements](https://blog.angular.io/tagged/release%20notes "Angular blog announcements about recent releases")

   发布声明：[Angular 博客 - 发布声明](https://blog.angular.io/tagged/release%20notes "Angular blog announcements about recent releases")

* Release announcements (older): [Angular blog - announcements about releases prior to August 2017](https://blog.angularjs.org/search?q=available&by-date=true "Angular blog announcements about releases prior to August 2017")

   发布声明（旧的）：[Angular 博客 - 2017 年 8 月以前的](https://blog.angularjs.org/search?q=available&by-date=true "Angular blog announcements about releases prior to August 2017")

* Release details: [Angular change log](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log")

   发布详情：[Angular 变更记录](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log")

* Update instructions: [Angular Update Guide](https://update.angular.io/ "Angular Update Guide")

   升级指南：[Angular 升级向导](https://update.angular.io/ "Angular Update Guide")

* Update command reference: [Angular CLI `ng update` command reference](cli/update)

   升级命令参考文档：[Angular CLI `ng update` 命令参考手册](cli/update)

* Versioning, release, support, and deprecation practices: [Angular versioning and releases](guide/releases "Angular versioning and releases")

   版本、发布、支持与废弃的实践：[Angular 的版本与发布](guide/releases "Angular versioning and releases")
