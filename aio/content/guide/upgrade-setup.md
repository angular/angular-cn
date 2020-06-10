# Setup for upgrading from AngularJS

# 准备从 AngularJS 升级

<!--
Question: Can we remove this file and instead direct readers to https://github.com/angular/quickstart/blob/master/README.md
-->

<div class="alert is-critical">

**Audience:** Use this guide **only** in the context of  [Upgrading from AngularJS](guide/upgrade "Upgrading from AngularJS to Angular") or [Upgrading for Performance](guide/upgrade-performance "Upgrading for Performance").
Those Upgrade guides refer to this Setup guide for information about using the [deprecated QuickStart GitHub repository](https://github.com/angular/quickstart "Deprecated Angular QuickStart GitHub repository"), which was created prior to the current Angular [CLI](cli "CLI Overview").

**注意：**本指南**仅仅**适用于[从 AngularJS 升级](guide/upgrade "Upgrading from AngularJS to Angular")和[注重性能的升级](guide/upgrade-performance "Upgrading for Performance")。
本指南中提到的升级指南使用的是[已弃用的快速上手 Github 仓库](https://github.com/angular/quickstart "Deprecated Angular QuickStart GitHub repository")，它是在 Angular [CLI](cli "CLI Overview") 推出之前创建的。

**For all other scenarios,** see the current instructions in [Setting up the Local Environment and Workspace](guide/setup-local "Setting up for Local Development").

**对于所有其它场景**，请参见[建立本地开发环境](guide/setup-local "Setting up for Local Development")中的步骤。

</div>

<!--
The <live-example name=quickstart>QuickStart live-coding</live-example> example is an Angular _playground_.
There are also some differences from a local app, to simplify that live-coding experience.
In particular, the QuickStart live-coding example shows just the AppComponent file; it creates the equivalent of app.module.ts and main.ts internally for the playground only.
-->

This guide describes how to develop locally on your own machine.
Setting up a new project on your machine is quick and easy with the [QuickStart seed on github](https://github.com/angular/quickstart "Install the github QuickStart repo").

本指南讲的是如何在你自己的机器上进行本地化开发。
利用 [github 上的**《快速上手》种子**](https://github.com/angular/quickstart "安装 github 《快速上手》库")在你的电脑上搭建一个新项目是很快很容易的。

**Prerequisite:** Make sure you have [Node.js® and npm installed](guide/setup-local#prerequisites "Angular prerequisites").

**前提条件：**确保你已经安装好了 [Node.js® 和 npm](guide/setup-local#prerequisites "Angular prerequisites")。

{@a clone}
## Clone

## 克隆

Perform the _clone-to-launch_ steps with these terminal commands.

运行下列命令来执行*克隆并启动*步骤。

<code-example language="sh" class="code-shell">
  git clone https://github.com/angular/quickstart.git quickstart
  cd quickstart
  npm install
  npm start

</code-example>

<div class="alert is-important">

`npm start` fails in _Bash for Windows_ in versions earlier than the Creator's Update (April 2017).

在*Bash for Windows*中 `npm start` 可能会失败，因为到 2017-04 为止它还不支持访问网络上的服务器。

</div>

{@a download}

## Download

## 下载

<a href="https://github.com/angular/quickstart/archive/master.zip" title="Download the QuickStart seed repository">Download the QuickStart seed</a>
and unzip it into your project folder. Then perform the remaining steps with these terminal commands.

<a href="https://github.com/angular/quickstart/archive/master.zip" title="下载《快速上手》种子库">下载《快速上手》种子</a>
并解压到你的项目目录中。然后执行下面的命令完成剩余步骤。

<code-example language="sh" class="code-shell">
  cd quickstart
  npm install
  npm start

</code-example>

<div class="alert is-important">

`npm start` fails in _Bash for Windows_ in versions earlier than the Creator's Update (April 2017).

在*Bash for Windows*中 `npm start` 可能会失败，因为到 2017-01 为止它还不支持访问网络上的服务器。

</div>

{@a non-essential}

## Delete _non-essential_ files (optional)

## 删除*非必需*文件（可选）

You can quickly delete the _non-essential_ files that concern testing and QuickStart repository maintenance
(***including all git-related artifacts*** such as the `.git` folder and `.gitignore`!).

你可以快速删除一些涉及到测试和维护快速开始版本库的 *非必需* 文件
（***包括所有 git 相关的文件***如 `.git` 文件夹和 `.gitignore`！）。

<div class="alert is-important">

Do this only in the beginning to avoid accidentally deleting your own tests and git setup!

请只在开始时执行此删除操作，以防你自己的测试和 git 文件被意外删除！

</div>

Open a terminal window in the project folder and enter the following commands for your environment:

在项目目录下打开一个终端窗口，并根据你的操作系统执行以下命令：

### OS/X (bash)

<code-example language="sh" class="code-shell">
  xargs rm -rf &lt; non-essential-files.osx.txt
  rm src/app/*.spec*.ts
  rm non-essential-files.osx.txt

</code-example>

### Windows

<code-example language="sh" class="code-shell">
  for /f %i in (non-essential-files.txt) do del %i /F /S /Q
  rd .git /s /q
  rd e2e /s /q

</code-example>

{@a seed}

## What's in the QuickStart seed?

## 《快速上手》种子库里都有什么？

The **QuickStart seed** provides a basic QuickStart playground application and other files necessary for local development.
Consequently, there are many files in the project folder on your machine,
most of which you can [learn about later](guide/file-structure).

**《快速上手》种子** 提供了一个基本的《快速上手》游乐场应用，以及进行本地开发的其它必要文件。
所以，你电脑里的项目目录中有*更多文件*，其中的大部分你都会[在稍后学到](guide/file-structure)。

<div class="alert is-helpful">

**Reminder:** The "QuickStart seed" example was created prior to the Angular CLI, so there are some differences between what is described here and an Angular CLI application.

</div>

{@a app-files}

Focus on the following three TypeScript (`.ts`) files in the **`/src`** folder.

注意**`/src`**目录中以下三个 TypeScript (`.ts`) 文件：

<div class='filetree'>

  <div class='file'>

    src

  </div>

  <div class='children'>

    <div class='file'>

      app

    </div>

    <div class='children'>

      <div class='file'>

        app.component.ts

      </div>

      <div class='file'>

        app.module.ts

      </div>

    </div>

    <div class='file'>

      main.ts

    </div>

  </div>

</div>

<code-tabs>

  <code-pane header="src/app/app.component.ts" path="setup/src/app/app.component.ts">

  </code-pane>

  <code-pane header="src/app/app.module.ts" path="setup/src/app/app.module.ts">

  </code-pane>

  <code-pane header="src/main.ts" path="setup/src/main.ts">

  </code-pane>

</code-tabs>

All guides and cookbooks have _at least these core files_.
Each file has a distinct purpose and evolves independently as the application grows.

所有指南和烹饪书都至少有*这几个核心文件*。每个文件都有独特的用途，并且随着应用的成长各自独立演变。

Files outside `src/` concern building, deploying, and testing your app.
They include configuration files and external dependencies.

`src/` 目录之外的文件为构建、部署和测试 app 相关的文件，他们只包括配置文件和外部依赖。

Files inside `src/` "belong" to your app.
Add new Typescript, HTML and CSS files inside the `src/` directory, most of them inside `src/app`,
unless told to do otherwise.

`src/` 目录下的文件才“属于”你的 app。
除非明确指出，否则教程中添加的 TypeScript，HTML 和 CSS 文件都在 `src/` 目录下，
大多数在 `src/app` 目录中。

The following are all in `src/`

`src/` 目录文件详情如下：

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">

  <col width="20%">

  </col>

  <col width="80%">

  </col>

  <tr>

    <th>

      File

      文件

    </th>

    <th>

      Purpose

      用途

    </th>

  </tr>

  <tr>

    <td>

      <code>app/app.component.ts</code>

    </td>

    <td>

      Defines the same `AppComponent` as the one in the QuickStart playground.
      It is the **root** component of what will become a tree of nested components
      as the application evolves.

      定义与《快速上手》游乐场同样的 `AppComponent`。
      它是**根**组件，随着应用的演变，它将变成一颗嵌套组件树。

    </td>

  </tr>

  <tr>

    <td>

      <code>app/app.module.ts</code>

    </td>

    <td>

      Defines `AppModule`, the  [root module](guide/bootstrapping "AppModule: the root module") that tells Angular how to assemble the application.
      When initially created, it declares only the `AppComponent`.
      Over time, you add more components to declare.

      定义 `AppModule`，[根模块](guide/bootstrapping "AppModule: 根模块")为 Angular 描述如何组装应用。
      目前，它只声明了 `AppComponent`。
      不久，它将声明更多组件。
    </td>

  </tr>

  <tr>

    <td>

      <code>main.ts</code>

    </td>

    <td>

      Compiles the application with the [JIT compiler](guide/glossary#jit) and
      [bootstraps](guide/bootstrapping)
      the application's main module (`AppModule`) to run in the browser.
      The JIT compiler is a reasonable choice during the development of most projects and
      it's the only viable choice for a sample running in a _live-coding_ environment such as Stackblitz.
      Alternative [compilation](guide/aot-compiler), [build](guide/build), and [deployment](guide/deployment) options are available.

      使[即时 (JIT) 编译器](guide/glossary#jit)用编译应用并且在浏览器中[启动](guide/bootstrapping "启动应用")并运行应用。
      对于大多数项目的开发，这都是合理的选择。而且它是在像 Stackblitz 这样的*在线编程*环境中运行例子的唯一选择。
      你将在本文档中学习其它编译和开发选择。

    </td>

  </tr>

</table>

## Appendix: Develop locally with IE

## 附录：用 IE 进行本地化开发

If you develop angular locally with `ng serve`, a `websocket` connection is set up automatically between browser and local dev server, so when your code changes, the browser can automatically refresh.

如果你使用 `ng serve` 进行本地化 Angular 开发，就会自动在浏览器和本地开发服务器之间建立一个 `websocket` 连接，这样，在代码发生变化时，浏览器就会自动刷新。

In Windows, by default, one application can only have 6 websocket connections, <a href="https://msdn.microsoft.com/library/ee330736%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396#websocket_maxconn" title="MSDN WebSocket settings">MSDN WebSocket Settings</a>.
So when IE is refreshed (manually or automatically by `ng serve`), sometimes the websocket does not close properly. When websocket connections exceed the limitations, a `SecurityError` will be thrown. This error will not affect the angular application, you can just restart IE to clear this error, or modify the windows registry to update the limitations.

在 Windows 上，默认情况下，每个应用最多只能有 6 个 websocket 连接，参见 <a href="https://msdn.microsoft.com/library/ee330736%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396#websocket_maxconn" title="MSDN WebSocket settings">MSDN 上的 WebSocket 设置</a>。
所以，当 IE 刷新时（手动刷新或由 `ng serve` 自动刷新），websocket 可能无法正常关闭。当 websocket 连接数超过上限时，就会抛出一个 `SecurityError` 异常。这种错误不会影响 Angular 应用，你可以重启 IE 来清除此异常或在 Windows 注册表中加大这个上限。

## Appendix: Test using `fakeAsync()/async()`

## 附录：使用 `fakeAsync()/async()` 进行测试

If you use the `fakeAsync()/async()` helper function to run unit tests (for details, read the [Testing guide](guide/testing#async-test-with-fakeasync)), you need to import `zone.js/dist/zone-testing` in your test setup file.

如果你使用 `fakeAsync()/async()` 辅助函数来运行单元测试（详情参见[测试指南](guide/testing#async-test-with-fakeasync)），就要在测试的准备文件中导入 `zone.js/dist/zone-testing`。

<div class="alert is-important">

If you create project with `Angular/CLI`, it is already imported in `src/test.ts`.

如果你是用 `Angular/CLI` 创建的项目，那么它已经在 `src/test.ts` 中导入过了。

</div>

And in the earlier versions of `Angular`, the following files were imported or added in your html file:

在以前版本的 `Angular` 中，下列文件曾被导入或添加到 html 文件中：

```
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
```

You can still load those files separately, but the order is important, you must import `proxy` before `sync-test`, `async-test`, `fake-async-test` and `jasmine-patch`. And you also need to import `sync-test` before `jasmine-patch`, so it is recommended to just import `zone-testing` instead of loading those separated files.

你仍然可以分别导入这些文件，不过导入顺序很重要，你必须在 `sync-test`、`async-test`、`fake-async-test` 和 `jasmine-patch` 之前导入 `proxy`。还要注意在 `jasmine-patch` 之前导入 `sync-test`。所以，建议你只导入 `zone-testing` 而不要分别加载那些文件。
