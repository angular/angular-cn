{@a top}

# Testing

# 测试

Testing your Angular application helps you check that your app is working as you expect.

测试你的 Angular 应用可以帮助你检查此应用是否正常运行。

## Prerequisites

## 先决条件

Before writing tests for your Angular app, you should have a basic understanding of the following concepts:

在为 Angular 应用编写测试之前，你应该对这些概念有一个基本的了解：

* Angular fundamentals

  Angular 的基本原理

* JavaScript
* HTML
* CSS
* [Angular CLI](/cli)

<hr>

The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the [Angular CLI](cli).
This sample application is much like the one in the [_Tour of Heroes_ tutorial](tutorial).

本测试文档通过使用 [Angular CLI](cli) 创建的范例应用，为对 Angular 应用进行单元测试和集成测试提供了技巧和方法。这个范例应用很像[*“英雄之旅”*教程](tutorial)中的应用。

<div class="alert is*helpful">

  For the sample app that the testing guides describe, see the <live-example noDownload>sample app</live-example>.

  对于本测试指南中所讲的范例应用，参阅<live-example noDownload>范例应用</live-example>。

  For the tests features in the testing guides, see <live-example stackblitz="specs" noDownload>tests</live-example>.

  要了解本测试指南中涉及的各种测试特性，请参阅<live-example stackblitz="specs" noDownload>测试</live-example>。

</div>

{@a setup}

## Set up testing

## 建立环境

The Angular CLI downloads and installs everything you need to test an Angular application with the [Jasmine test framework](https://jasmine.github.io/).

Angular CLI 会下载并安装试用 [Jasmine 测试框架](https://jasmine.github.io/) 测试 Angular 应用时所需的一切。

The project you create with the CLI is immediately ready to test.
Just run the [`ng test`](cli/test) CLI command:

你使用 CLI 创建的项目是可以立即用于测试的。
运行 CLI 命令 [`ng test`](cli/test) 即可：

<code-example language="sh" class="code-shell">
  ng test
</code-example>

The `ng test` command builds the app in _watch mode_,
and launches the [Karma test runner](https://karma-runner.github.io).

`ng test` 命令在*监视模式*下构建应用，并启动 [karma 测试运行器](https://karma-runner.github.io)。

The console output looks a bit like this:

它的控制台输出一般是这样的：

<code-example language="sh" class="code-shell">
10% building modules 1/1 modules 0 active
...INFO [karma]: Karma v1.7.1 server started at http://0.0.0.0:9876/
...INFO [launcher]: Launching browser Chrome ...
...INFO [launcher]: Starting browser Chrome
...INFO [Chrome ...]: Connected on socket ...
Chrome ...: Executed 3 of 3 SUCCESS (0.135 secs / 0.205 secs)
</code-example>

The last line of the log is the most important.
It shows that Karma ran three tests that all passed.

最后一行很重要。它表示 Karma 运行了三个测试，而且这些测试都通过了。

A Chrome browser also opens and displays the test output in the "Jasmine HTML Reporter" like this.

它还会打开 Chrome 浏览器并在“ Jasmine HTML 报告器”中显示测试输出，就像这样：

<div class="lightbox">
  <img src='generated/images/guide/testing/initial-jasmine-html-reporter.png' alt="Jasmine HTML Reporter in the browser">
</div>

Most people find this browser output easier to read than the console log.
You can click on a test row to re-run just that test or click on a description to re-run the tests in the selected test group ("test suite").

大多数人都会觉得浏览器中的报告比控制台中的日志更容易阅读。
你可以点击一行测试，来单独重跑这个测试，或者点击一行描述信息来重跑所选测试组（“测试套件”）中的那些测试。

Meanwhile, the `ng test` command is watching for changes.

同时，`ng test` 命令还会监听这些变化。

To see this in action, make a small change to `app.component.ts` and save.
The tests run again, the browser refreshes, and the new test results appear.

要查看它的实际效果，就对 `app.component.ts` 做一个小修改，并保存它。
这些测试就会重新运行，浏览器也会刷新，然后新的测试结果就出现了。

## Configuration

## 配置

The CLI takes care of Jasmine and Karma configuration for you.

CLI 会为你生成 Jasmine 和 Karma 的配置文件。

You can fine-tune many options by editing the `karma.conf.js` in the root folder of the project and
the `test.ts` files in the `src/` folder.

不过你也可以通过编辑 `src/` 目录下的 `karma.conf.js` 和 `test.ts` 文件来微调很多选项。

The `karma.conf.js` file is a partial Karma configuration file.
The CLI constructs the full runtime configuration in memory, based on application structure specified in the `angular.json` file, supplemented by `karma.conf.js`.

`karma.conf.js` 文件是 karma 配置文件的一部分。
CLI 会基于 `angular.json` 文件中指定的项目结构和 `karma.conf.js` 文件，来在内存中构建出完整的运行时配置。

Search the web for more details about Jasmine and Karma configuration.

要进一步了解 Jasmine 和 Karma 的配置项，请搜索网络。

### Other test frameworks

### 其他测试框架

You can also unit test an Angular app with other testing libraries and test runners.
Each library and runner has its own distinctive installation procedures, configuration, and syntax.

你还可以使用其它的测试库和测试运行器来对 Angular 应用进行单元测试。
每个库和运行器都有自己特有的安装过程、配置项和语法。

Search the web to learn more.

要了解更多，请搜索网络。

### Test file name and location

### 测试文件名及其位置

Look inside the `src/app` folder.

查看 `src/app` 文件夹。

The CLI generated a test file for the `AppComponent` named `app.component.spec.ts`.

CLI 为 `AppComponent` 生成了一个名叫 `app.component.spec.ts` 的测试文件。

<div class="alert is-important">

The test file extension **must be `.spec.ts`** so that tooling can identify it as a file with tests (AKA, a _spec_ file).

测试文件的扩展名**必须是 `.spec.ts`**，这样工具才能识别出它是一个测试文件，也叫规约（spec）文件。

</div>

The `app.component.ts` and `app.component.spec.ts` files are siblings in the same folder.
The root file names (`app.component`) are the same for both files.

`app.component.ts` 和 `app.component.spec.ts` 文件位于同一个文件夹中，而且相邻。
其根文件名部分（`app.component`）都是一样的。

Adopt these two conventions in your own projects for _every kind_ of test file.

请在你的项目中对*任意类型*的测试文件都坚持这两条约定。

{@a q-spec-file-location}

#### Place your spec file next to the file it tests

#### 把测试规约（spec）文件放在它要测试的文件旁边

It's a good idea to put unit test spec files in the same folder
as the application source code files that they test:

最好把单元测试规约文件放到与它们测试的应用源码文件相同的文件夹中：

- Such tests are easy to find.

  这些测试很容易找到。

- You see at a glance if a part of your application lacks tests.

  你一眼就能看到应用中是否缺少一些测试。

- Nearby tests can reveal how a part works in context.

  临近的测试可以揭示一个部件会如何在上下文中工作。

- When you move the source (inevitable), you remember to move the test.

  当移动源代码时（在所难免），你不会忘了同时移动测试。

- When you rename the source file (inevitable), you remember to rename the test file.

  当重命名源文件时（在所难免），你不会忘了重命名测试文件。

{@a q-specs-in-test-folder}

#### Place your spec files in a test folder

#### 把 spec 文件放到 test 目录下

Application integration specs can test the interactions of multiple parts
spread across folders and modules.
They don't really belong to any part in particular, so they don't have a
natural home next to any one file.

应用的集成测试规范可以测试跨文件夹和模块的多个部分之间的交互。它们并不属于任何一个特定的部分，所以把它们放在任何一个文件旁都很不自然。

It's often better to create an appropriate folder for them in the `tests` directory.

最好在 `tests` 目录下为它们创建一个合适的文件夹。

Of course specs that test the test helpers belong in the `test` folder,
next to their corresponding helper files.

当然，用来测试那些测试助手的规约也位于 `test` 目录下，紧挨着相应的测试助手文件。

{@a ci}

## Set up continuous integration

## 建立持续集成环境

One of the best ways to keep your project bug-free is through a test suite, but it's easy to forget to run tests all the time.
Continuous integration (CI) servers let you set up your project repository so that your tests run on every commit and pull request.

避免项目出 BUG 的最佳方式之一，就是使用测试套件。但是很容易忘了一直运行它。
持续集成（CI）服务器让你可以配置项目的代码仓库，以便每次提交和收到 Pull Request 时就会运行你的测试。

There are paid CI services like Circle CI and Travis CI, and you can also host your own for free using Jenkins and others.
Although Circle CI and Travis CI are paid services, they are provided free for open source projects.
You can create a public project on GitHub and add these services without paying.
Contributions to the Angular repo are automatically run through a whole suite of Circle CI tests.

已经有一些像 Circle CI 和 Travis CI 这样的付费 CI 服务器，你还可以使用 Jenkins 或其它软件来搭建你自己的免费 CI 服务器。
虽然 Circle CI 和 Travis CI 是收费服务，但是它们也会为开源项目提供免费服务。
你可以在 GitHub 上创建公开项目，并免费享受这些服务。
当你为 Angular 仓库贡献代码时，就会自动用  Circle CI 和 Travis CI 运行整个测试套件。

This article explains how to configure your project to run Circle CI and Travis CI, and also update your test configuration to be able to run tests in the Chrome browser in either environment.

本文档解释了如何配置你的项目，来运行  Circle CI 和 Travis CI，以及如何修改你的测试配置，以便能在这两个环境下用 Chrome 浏览器来运行测试。

### Configure project for Circle CI

### 为 Circle CI 配置项目

Step 1: Create a folder called `.circleci` at the project root.

步骤一：在项目的根目录下创建一个名叫 `.circleci` 的目录。

Step 2: In the new folder, create a file called `config.yml` with the following content:

步骤二：在这个新建的目录下，创建一个名为 `config.yml` 的文件，内容如下：

```
version: 2
jobs:
  build:
    working_directory: ~/my-project
    docker:
      - image: circleci/node:10-browsers
    steps:
      - checkout
      - restore_cache:
          key: my-project-{{ .Branch }}-{{ checksum "package-lock.json" }}
      - run: npm install
      - save_cache:
          key: my-project-{{ .Branch }}-{{ checksum "package-lock.json" }}
          paths:
            - "node_modules"
      - run: npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI
      - run: npm run e2e -- --protractor-config=e2e/protractor-ci.conf.js
```

This configuration caches `node_modules/` and uses [`npm run`](https://docs.npmjs.com/cli/run-script) to run CLI commands, because `@angular/cli` is not installed globally.
The double dash (`--`) is needed to pass arguments into the `npm` script.

该配置会缓存 `node_modules/` 并使用 [`npm run`](https://docs.npmjs.com/cli/run-script) 来运行 CLI 命令，因为 `@angular/cli` 并没有装到全局。
要把参数传给 `npm` 脚本，这个单独的双中线（`--`）是必须的。

Step 3: Commit your changes and push them to your repository.

步骤三：提交你的修改，并把它们推送到你的代码仓库中。

Step 4: [Sign up for Circle CI](https://circleci.com/docs/2.0/first-steps/) and [add your project](https://circleci.com/add-projects).
Your project should start building.

步骤四：[注册 Circle CI](https://circleci.com/docs/2.0/first-steps/)，并[添加你的项目](https://circleci.com/add-projects)。你的项目将会开始构建。

* Learn more about Circle CI from [Circle CI documentation](https://circleci.com/docs/2.0/).

  欲知详情，参阅 [Circle CI 文档](https://circleci.com/docs/2.0/)。

### Configure project for Travis CI

### 为 Travis CI 配置项目

Step 1: Create a file called `.travis.yml` at the project root, with the following content:

步骤一：在项目根目录下创建一个名叫 `.travis.yml` 的文件，内容如下：

```
dist: trusty
sudo: false

language: node_js
node_js:
  - "10"
addons:
  apt:
    sources:
      - google-chrome
    packages:
      - google-chrome-stable

cache:
  directories:
     - ./node_modules

install:
  - npm install

script:
  - npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI
  - npm run e2e -- --protractor-config=e2e/protractor-ci.conf.js
```

This does the same things as the CircleCI configuration, except that Travis doesn't come with Chrome, so use Chromium instead.

它做的事情和 Circle CI 的配置文件一样，只是 Travis 不用 Chrome，而是用 Chromium 代替。

Step 2: Commit your changes and push them to your repository.

步骤二：提交你的更改，并把它们推送到你的代码仓库。

Step 3: [Sign up for Travis CI](https://travis-ci.org/auth) and [add your project](https://travis-ci.org/profile).
You'll need to push a new commit to trigger a build.

步骤三：[注册 Travis CI](https://travis-ci.org/auth) 并[添加你的项目](https://travis-ci.org/profile)。
你需要推送一个新的提交，以触发构建。

* Learn more about Travis CI testing from [Travis CI documentation](https://docs.travis-ci.com/).

  欲知详情，参阅 [Travis CI 文档](https://docs.travis-ci.com/)。

### Configure CLI for CI testing in Chrome

### 为在 Chrome 中运行 CI 测试而配置 CLI

When the CLI commands `ng test` and `ng e2e` are generally running the CI tests in your environment, you might still need to adjust your configuration to run the Chrome browser tests.

当 CLI 命令 `ng test` 和 `ng e2e` 经常要在你的环境中运行 CI 测试时，你可能需要再调整一下配置，以运行 Chrome 浏览器测试。

There are configuration files for both the [Karma JavaScript test runner](https://karma-runner.github.io/latest/config/configuration-file.html)
and [Protractor](https://www.protractortest.org/#/api-overview) end-to-end testing tool,
which you must adjust to start Chrome without sandboxing.

有一些文件是给 [Karma（直译 "报应"）](https://karma-runner.github.io/latest/config/configuration-file.html)测试运行器和 [Protractor（直译 "量角器"）](https://www.protractortest.org/#/api-overview) 端到端测试运行器使用的，你必须改为不用沙箱的 Chrome 启动方式。

We'll be using [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome#cli) in these examples.

这个例子中我们将使用[无头 Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome#cli)。

* In the Karma configuration file, `karma.conf.js`, add a custom launcher called ChromeHeadlessCI below browsers:

  在 Karma 配置文件 `karma.conf.js` 中，浏览器的紧下方，添加自定义的启动器，名叫 ChromeNoSandbox。
```
browsers: ['ChromeHeadlessCI'],
customLaunchers: {
  ChromeHeadlessCI: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  }
},
```

* In the root folder of your e2e tests project, create a new file named `protractor-ci.conf.js`. This new file extends the original `protractor.conf.js`.

  在 e2e 测试项目的根目录下创建一个新文件 `protractor-ci.conf.js`，它扩展了原始的 `protractor.conf.js`：

```
const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox']
  }
};

exports.config = config;
```

Now you can run the following commands to use the `--no-sandbox` flag:

现在你可以运行下列带有 `--no-sandbox` 标志的命令了：

<code-example language="sh" class="code-shell">
  ng test --no-watch --no-progress --browsers=ChromeHeadlessCI
  ng e2e --protractor-config=e2e/protractor-ci.conf.js
</code-example>

<div class="alert is-helpful">

   **Note:** Right now, you'll also want to include the `--disable-gpu` flag if you're running on Windows. See [crbug.com/737678](https://crbug.com/737678).

   **注意：**目前，如果你正运行在 Windows 中，还要包含 `--disable-gpu` 标志。参阅 [crbug.com/737678](https://crbug.com/737678)。

</div>

<hr />

## More info on testing

## 关于测试的更多信息

After you've set up your app for testing, you may find the following testing  guides useful.

当你设置准备好测试环境之后，可能会发现以下测试指南很有用。

* [Code coverage](guide/testing-code-coverage)&mdash;find out how much of your app your tests are covering and how to specify required amounts.

  [代码覆盖](guide/testing-code-coverage) - 找出你的测试覆盖了多少应用，以及如何指定所需的数量。

* [Testing services](guide/testing-services)&mdash;learn how to test the services your app uses.

  [测试服务](guide/testing-services) - 了解如何测试应用中所用的服务。

* [Basics of testing components](guide/testing-components-basics)&mdash;discover the basics of testing Angular components.

  [测试组件的基础知识](guide/testing-components-basics) - 了解测试 Angular 组件的基础知识。

* [Component testing scenarios](guide/testing-components-scenarios)&mdash;read about the various kinds of component testing scenarios and use cases.

  [组件测试场景](guide/testing-components-scenarios) - 了解各种组件测试场景和用例。

* [Testing attribute directives](guide/testing-attribute-directives)&mdash;learn about how to test your attribute directives.

  [测试属性型指令](guide/testing-attribute-directives) - 了解如何测试你的属性型指令。

* [Testing pipes](guide/testing-pipes)&mdash;find out how to test attribute directives.

  [测试管道](guide/testing-pipes) - 了解测试管道的方法。

* [Debugging tests](guide/testing-attribute-directives)&mdash;uncover common testing bugs.

  [调试测试代码](guide/testing-attribute-directives) - 发现测试代码的常见 BUG。

* [Testing utility APIs](guide/testing-utility-apis)&mdash;get familiar with Angular testing features.

  [测试实用工具 API](guide/testing-utility-apis) - 了解 Angular 的测试特性。

