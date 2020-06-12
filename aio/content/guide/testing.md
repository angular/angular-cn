{@a top}

# Testing

# 测试

This guide offers tips and techniques for unit and integration testing Angular applications.

该指南提供了对 Angular 应用进行单元测试和集成测试的技巧和提示。

The guide presents tests of a sample application created with the [Angular CLI](cli). This sample application is much like the one created in the [_Tour of Heroes_ tutorial](tutorial).
The sample application and all tests in this guide are available for inspection and experimentation:

该指南中的测试针对的是一个很像[《英雄指南》教程](tutorial)的 [Angular CLI](cli) 范例应用。
这个范例应用及其所有测试都可以在下面的链接中进行查看和试用：

- <live-example embedded-style noDownload>Sample app</live-example>

   <live-example embedded-style noDownload>范例应用</live-example>

- <live-example stackblitz="specs" noDownload>Tests</live-example>

   <live-example stackblitz="specs" noDownload>测试</live-example>

<hr>

## Setup

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

A chrome browser also opens and displays the test output in the "Jasmine HTML Reporter" like this.

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

#### Configuration

#### 配置

The CLI takes care of Jasmine and Karma configuration for you.

CLI 会为你生成 Jasmine 和 Karma 的配置文件。

You can fine-tune many options by editing the `karma.conf.js` and
the `test.ts` files in the `src/` folder.

不过你也可以通过编辑 `src/` 目录下的 `karma.conf.js` 和 `test.ts` 文件来微调很多选项。

The `karma.conf.js` file is a partial Karma configuration file.
The CLI constructs the full runtime configuration in memory, based on application structure specified in the `angular.json` file, supplemented by `karma.conf.js`.

`karma.conf.js` 文件是 karma 配置文件的一部分。
CLI 会基于 `angular.json` 文件中指定的项目结构和 `karma.conf.js` 文件，来在内存中构建出完整的运行时配置。

Search the web for more details about Jasmine and Karma configuration.

要进一步了解 Jasmine 和 Karma 的配置项，请搜索网络。

#### Other test frameworks

#### 其它测试框架

You can also unit test an Angular app with other testing libraries and test runners.
Each library and runner has its own distinctive installation procedures, configuration, and syntax.

你还可以使用其它的测试库和测试运行器来对 Angular 应用进行单元测试。
每个库和运行器都有自己特有的安装过程、配置项和语法。

Search the web to learn more.

要了解更多，请搜索网络。

#### Test file name and location

#### 测试文件名及其位置

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

{@a ci}

## Set up continuous integration

## 建立持续集成环境

One of the best ways to keep your project bug free is through a test suite, but it's easy to forget to run tests all the time.
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

  欲知详情，参见 [Circle CI 文档](https://circleci.com/docs/2.0/)。

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

This does the same things as the Circle CI configuration, except that Travis doesn't come with Chrome, so we use Chromium instead.

它做的事情和 Circle CI 的配置文件一样，只是 Travis 不用 Chrome，而是用 Chromium 代替。

Step 2: Commit your changes and push them to your repository.

步骤二：提交你的更改，并把它们推送到你的代码仓库。

Step 3: [Sign up for Travis CI](https://travis-ci.org/auth) and [add your project](https://travis-ci.org/profile).
You'll need to push a new commit to trigger a build.

步骤三：[注册 Travis CI](https://travis-ci.org/auth) 并[添加你的项目](https://travis-ci.org/profile)。
你需要推送一个新的提交，以触发构建。

* Learn more about Travis CI testing from [Travis CI documentation](https://docs.travis-ci.com/).

  欲知详情，参见 [Travis CI 文档](https://docs.travis-ci.com/)。

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
browsers: ['Chrome'],
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

   **注意：**目前，如果你正运行在 Windows 中，还要包含 `--disable-gpu` 标志。参见 [crbug.com/737678](https://crbug.com/737678)。

</div>

{@a code-coverage}

## Enable code coverage reports

## 启用代码覆盖率报告

The CLI can run unit tests and create code coverage reports.
Code coverage reports show you any parts of our code base that may not be properly tested by your unit tests.

CLI 可以运行单元测试，并创建代码覆盖率报告。
代码覆盖率报告会向你展示代码库中有哪些可能未使用单元测试正常测试过的代码。

To generate a coverage report run the following command in the root of your project.

要生成覆盖率报告，请在项目的根目录下运行下列命令。

<code-example language="sh" class="code-shell">
  ng test --no-watch --code-coverage
</code-example>

When the tests are complete, the command creates a new `/coverage` folder in the project. Open the `index.html` file to see a report with your source code and code coverage values.

当测试完成时，该命令会在项目中创建一个新的 `/coverage` 目录。打开其 `index.html` 文件以查看带有源码和代码覆盖率值的报告。

If you want to create code-coverage reports every time you test, you can set the following option in the CLI configuration file, `angular.json`:

如果你要在每次运行测试时都创建代码覆盖率报告，可以在 CLI 的配置文件 `angular.json` 中设置下列选项：

```
  "test": {
    "options": {
      "codeCoverage": true
    }
  }
```

### Code coverage enforcement

### 代码覆盖率实施

The code coverage percentages let you estimate how much of your code is tested.
If your team decides on a set minimum amount to be unit tested, you can enforce this minimum with the Angular CLI.

代码覆盖率能让你估计要测试的代码量。
如果你的开发组决定要设置单元测试的最小数量，就可以使用 Angular CLI 来守住这条底线。

For example, suppose you want the code base to have a minimum of 80% code coverage.
To enable this, open the [Karma](https://karma-runner.github.io) test platform configuration file, `karma.conf.js`, and add the following in the `coverageIstanbulReporter:` key.

比如，假设你希望代码有最少 80% 的代码覆盖率。
要启用它，请打开 [Karma](https://karma-runner.github.io) 测试平台的配置文件 `karma.conf.js`，并添加键 `coverageIstanbulReporter:` 如下。

```
coverageIstanbulReporter: {
  reports: [ 'html', 'lcovonly' ],
  fixWebpackSourcePaths: true,
  thresholds: {
    statements: 80,
    lines: 80,
    branches: 80,
    functions: 80
  }
}
```

The `thresholds` property causes the tool to enforce a minimum of 80% code coverage when the unit tests are run in the project.

这里的 `thresholds` 属性会让此工具在项目中运行单元测试时强制保证至少达到 80% 的测试覆盖率。

## Service Tests

## 对服务的测试

Services are often the easiest files to unit test.
Here are some synchronous and asynchronous unit tests of the `ValueService`
written without assistance from Angular testing utilities.

服务通常是单元测试中最简单的文件类型。
下面是一些针对 `ValueService` 的同步和异步单元测试，
编写它们时没有借助来自 Angular 测试工具集的任何协助。

<code-example path="testing/src/app/demo/demo.spec.ts" region="ValueService" header="app/demo/demo.spec.ts"></code-example>

{@a services-with-dependencies}

#### Services with dependencies

#### 带有依赖的服务

Services often depend on other services that Angular injects into the constructor.
In many cases, it's easy to create and _inject_ these dependencies by hand while
calling the service's constructor.

服务通常会依赖于一些 Angular 注入到其构造函数中的其它服务。
多数情况下，创建并在调用该服务的构造函数时，手工创建并注入这些依赖也是很容易的。

The `MasterService` is a simple example:

`MasterService` 就是一个简单的例子：

<code-example path="testing/src/app/demo/demo.ts" region="MasterService" header="app/demo/demo.ts"></code-example>

`MasterService` delegates its only method, `getValue`, to the injected `ValueService`.

`MasterService` 把它唯一的方法 `getValue` 委托给了注入进来的 `ValueService`。

Here are several ways to test it.

这里是几种测试它的方法。

<code-example path="testing/src/app/demo/demo.spec.ts" region="MasterService" header="app/demo/demo.spec.ts"></code-example>

The first test creates a `ValueService` with `new` and passes it to the `MasterService` constructor.

第一个测试使用 `new` 创建了 `ValueService`，然后把它传给了 `MasterService` 的构造函数。

However, injecting the real service rarely works well as most dependent services are difficult to create and control.

不过，对于大多数没这么容易创建和控制的依赖项来说，注入真实的服务很容易出问题。

Instead you can mock the dependency, use a dummy value, or create a
[spy](https://jasmine.github.io/2.0/introduction.html#section-Spies)
on the pertinent service method.

你可以改用模拟依赖的方式，你可以使用虚值或在相关的服务方法上创建一个[间谍（spy）](https://jasmine.github.io/2.0/introduction.html#section-Spies)。

<div class="alert is-helpful">

Prefer spies as they are usually the easiest way to mock services.

优先使用间谍，因为它们通常是 Mock 服务时最简单的方式。

</div>

These standard testing techniques are great for unit testing services in isolation.

这些标准的测试技巧对于在隔离的环境下对服务进行单元测试非常重要。

However, you almost always inject services into application classes using Angular
dependency injection and you should have tests that reflect that usage pattern.
Angular testing utilities make it easy to investigate how injected services behave.

不过，你几乎迟早要用 Angular 的依赖注入机制来把服务注入到应用类中去，而且你应该已经有了这类测试。
Angular 的测试工具集可以让你轻松探查这种注入服务的工作方式。

#### Testing services with the _TestBed_

#### 使用 `TestBed`（测试机床）测试服务

Your app relies on Angular [dependency injection (DI)](guide/dependency-injection)
to create services.
When a service has a dependent service, DI finds or creates that dependent service.
And if that dependent service has its own dependencies, DI finds-or-creates them as well.

你的应用中会依赖 Angular 的[依赖注入 (DI)](guide/dependency-injection) 来创建服务。
当某个服务依赖另一个服务时，DI 就会找到或创建那个被依赖的服务。
如果那个被依赖的服务还有它自己的依赖，DI 也同样会找到或创建它们。

As service _consumer_, you don't worry about any of this.
You don't worry about the order of constructor arguments or how they're created.

作为服务的*消费方*，你不需要关心这些细节。
你不用关心构造函数中的参数顺序或如何创建它们。

As a service _tester_, you must at least think about the first level of service dependencies
but you _can_ let Angular DI do the service creation and deal with constructor argument order
when you use the `TestBed` testing utility to provide and create services.

但对于服务的*测试方*来说，你就至少要考虑服务的第一级依赖了。
不过你*可以*让 Angular DI 来负责服务的创建工作，但当你使用 `TestBed` 测试工具来提供和创建服务时，你仍然需要关心构造函数中的参数顺序。

{@a testbed}

#### Angular _TestBed_

The `TestBed` is the most important of the Angular testing utilities.
The `TestBed` creates a dynamically-constructed Angular _test_ module that emulates
an Angular [@NgModule](guide/ngmodules).

`TestBed` 是 Angular 测试工具中最重要的部分。
`TestBed` 会动态创建一个用来模拟 [@NgModule](guide/ngmodules) 的 Angular *测试*模块。

The `TestBed.configureTestingModule()` method takes a metadata object that can have most of the properties of an [@NgModule](guide/ngmodules).

`TestBed.configureTestingModule()` 方法接收一个元数据对象，其中具有 [@NgModule](guide/ngmodules) 中的绝大多数属性。

To test a service, you set the `providers` metadata property with an
array of the services that you'll test or mock.

要测试某个服务，就要在元数据的 `providers` 属性中指定一个将要进行测试或模拟的相关服务的数组。

<code-example
  path="testing/src/app/demo/demo.testbed.spec.ts"
  region="value-service-before-each"
  header="app/demo/demo.testbed.spec.ts (provide ValueService in beforeEach)">
</code-example>

Then inject it inside a test by calling `TestBed.inject()` with the service class as the argument.

然后通过调用 `TestBed.inject()`（参数为该服务类）把它注入到一个测试中。

<div class="alert is-helpful">

**Note:** We used to have `TestBed.get()` instead of `TestBed.inject()`.
The `get` method wasn't type safe, it always returned `any`, and this is error prone.
We decided to migrate to a new function instead of updating the existing one given
the large scale use that would have an immense amount of breaking changes.

**注意：** 我们以前使用的是 `TestBed.get()`，而不是 `TestBed.inject()`。
`get` 方法不是类型安全的，它总是返回 `any`，这很容易出错。
考虑到大规模使用时会产生大量重大变更，我们决定将其迁移到新功能，而不是修改现有功能。

</div>

<code-example
  path="testing/src/app/demo/demo.testbed.spec.ts"
  region="value-service-inject-it">
</code-example>

Or inside the `beforeEach()` if you prefer to inject the service as part of your setup.

或者，如果你更倾向于把该服务作为环境准备过程的一部分，就把它放在 `beforeEach()` 中。

<code-example
  path="testing/src/app/demo/demo.testbed.spec.ts"
  region="value-service-inject-before-each">
</code-example>

When testing a service with a dependency, provide the mock in the `providers` array.

如果要测试一个带有依赖项的服务，那就把模拟对象放在 `providers` 数组中。

In the following example, the mock is a spy object.

在下面的例子中，模拟对象是一个间谍（spy）对象。

<code-example
  path="testing/src/app/demo/demo.testbed.spec.ts"
  region="master-service-before-each"></code-example>

The test consumes that spy in the same way it did earlier.

该测试会像以前一样消费这个间谍对象。

<code-example
  path="testing/src/app/demo/demo.testbed.spec.ts"
  region="master-service-it">
</code-example>

{@a no-before-each}

#### Testing without _beforeEach()_

#### 不使用 `beforeEach` 进行测试

Most test suites in this guide call `beforeEach()` to set the preconditions for each `it()` test
and rely on the `TestBed` to create classes and inject services.

本指南中的大多数的测试套件都会调用 `beforeEach()` 来为每个 `it()` 测试准备前置条件，并依赖 `TestBed` 来创建类和注入服务。

There's another school of testing that never calls `beforeEach()` and prefers to create classes explicitly rather than use the `TestBed`.

另一些测试教程中也可能让你不要调用 `beforeEach()`，并且更倾向于显式创建类，而不要借助 `TestBed`。

Here's how you might rewrite one of the `MasterService` tests in that style.

下面的例子教你如何把 `MasterService` 的测试改写成那种风格。

Begin by putting re-usable, preparatory code in a _setup_ function instead of `beforeEach()`.

通过把可复用的准备代码放进一个单独的 `setup` 函数来代替 `beforeEach()`。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup"
  header="app/demo/demo.spec.ts (setup)"></code-example>

The `setup()` function returns an object literal
with the variables, such as `masterService`, that a test might reference.
You don't define _semi-global_ variables (e.g., `let masterService: MasterService`)
in the body of the `describe()`.

`setup()` 函数返回一个带有一些变量的对象字面量，比如 `masterService`，测试中可以引用它。
这样你就不用在 `describe()` 中定义一些*半全局性的*变量了（比如 `let masterService: MasterService` ）。

Then each test invokes `setup()` in its first line, before continuing
with steps that manipulate the test subject and assert expectations.

然后，每个测试都会在第一行调用 `setup()`，然后再操纵被测主体以及对期望值进行断言。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-test"></code-example>

Notice how the test uses
[_destructuring assignment_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
to extract the setup variables that it needs.

注意这些测试是如何使用 [解构赋值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
来提取出所需变量的。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup-call">
</code-example>

Many developers feel this approach is cleaner and more explicit than the
traditional `beforeEach()` style.

很多开发者觉得这种方式相比传统的 `beforeEach()` 风格更加干净、更加明确。

Although this testing guide follows the traditional style and
the default [CLI schematics](https://github.com/angular/angular-cli)
generate test files with `beforeEach()` and `TestBed`,
feel free to adopt _this alternative approach_ in your own projects.

虽然本章会遵循传统的风格，并且 [CLI](https://github.com/angular/devkit) 生成的默认测试文件也用的是
`beforeEach()` 和 `TestBed`，不过你可以在自己的项目中自由选择*这种可选方式*。

#### Testing HTTP services

#### 测试 HTTP 服务

Data services that make HTTP calls to remote servers typically inject and delegate
to the Angular [`HttpClient`](guide/http) service for XHR calls.

那些会向远端服务器发起 HTTP 调用的数据服务，通常会注入 Angular 的 [`HttpClient`](guide/http) 服务并委托它进行 XHR 调用。

You can test a data service with an injected `HttpClient` spy as you would
test any service with a dependency.

你可以像测试其它带依赖的服务那样，通过注入一个 `HttpClient` 间谍来测试这种数据服务。

<code-example
  path="testing/src/app/model/hero.service.spec.ts"
  region="test-with-spies"
  header="app/model/hero.service.spec.ts (tests with spies)">
</code-example>

<div class="alert is-important">

The `HeroService` methods return `Observables`. You must
_subscribe_ to an observable to (a) cause it to execute and (b)
assert that the method succeeds or fails.

`HttpService` 中的方法会返回 `Observables`。*订阅*这些方法返回的可观察对象会让它开始执行，并且断言这些方法是成功了还是失败了。

The `subscribe()` method takes a success (`next`) and fail (`error`) callback.
Make sure you provide _both_ callbacks so that you capture errors.
Neglecting to do so produces an asynchronous uncaught observable error that
the test runner will likely attribute to a completely different test.

`subscribe()` 方法接受一个成功回调 (`next`) 和一个失败 (`error`) 回调。
你要确保同时提供了这两个回调，以便捕获错误。
如果忽略这些异步调用中未捕获的错误，测试运行器可能会得出截然不同的测试结论。

</div>

#### _HttpClientTestingModule_

Extended interactions between a data service and the `HttpClient` can be complex
and difficult to mock with spies.

如果将来 `HttpClient` 和数据服务之间有更多的交互，则可能会变得复杂，而且难以使用间谍进行模拟。

The `HttpClientTestingModule` can make these testing scenarios more manageable.

`HttpClientTestingModule` 可以让这些测试场景变得更加可控。

While the _code sample_ accompanying this guide demonstrates `HttpClientTestingModule`,
this page defers to the [Http guide](guide/http#testing-http-requests),
which covers testing with the `HttpClientTestingModule` in detail.

本章的*代码范例*要示范的是 `HttpClientTestingModule`，所以把部分内容移到了 [Http](guide/http#testing-http-requests) 一章，那里会详细讲解如何用 `HttpClientTestingModule` 进行测试。

## Component Test Basics

## 组件测试基础

A component, unlike all other parts of an Angular application,
combines an HTML template and a TypeScript class.
The component truly is the template and the class _working together_. To adequately test a component, you should test that they work together
as intended.

组件与 Angular 应用中的其它部分不同，它是由 HTML 模板和 TypeScript 类组成的。
组件其实是指模板加上与其合作的类。
要想对组件进行充分的测试，就要测试它们能否如预期的那样协作。

Such tests require creating the component's host element in the browser DOM,
as Angular does, and investigating the component class's interaction with
the DOM as described by its template.

这些测试需要在浏览器的 DOM 中创建组件的宿主元素（就像 Angular 所做的那样），然后检查组件类和 DOM 的交互是否如同它在模板中所描述的那样。

The Angular `TestBed` facilitates this kind of testing as you'll see in the sections below.
But in many cases, _testing the component class alone_, without DOM involvement,
can validate much of the component's behavior in an easier, more obvious way.

Angular 的 `TestBed` 为所有这些类型的测试提供了基础设施。
但是很多情况下，可以*单独测试组件类本身*而不必涉及 DOM，就已经可以用一种更加简单、清晰的方式来验证该组件的大多数行为了。

### Component class testing

### 单独测试组件类

Test a component class on its own as you would test a service class.

你可以像测试服务类一样测试组件类。

Consider this `LightswitchComponent` which toggles a light on and off
(represented by an on-screen message) when the user clicks the button.

考虑下面这个 `LightswitchComponent`，当用户点击按钮时，它会切换灯的开关状态（用屏幕上的消息展现出来）。

<code-example
  path="testing/src/app/demo/demo.ts"
  region="LightswitchComp"
  header="app/demo/demo.ts (LightswitchComp)"></code-example>

You might decide only to test that the `clicked()` method
toggles the light's _on/off_ state and sets the message appropriately.

你可能要测试 `clicked()` 方法能否正确切换灯的开关状态并设置合适的消息。

This component class has no dependencies. To test these types of classes, follow the same steps as you would for a service that has no dependencies:

该组件类没有依赖。要测试这些类，请遵循与测试那些无依赖服务相同的步骤：

1. Create a component using the new keyword.

   使用 `new` 关键子创建一个组件。

2. Poke at its API.

   测试其 API。

3. Assert expectations on its public state.

   对其期望的公开状态进行断言。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="Lightswitch"
  header="app/demo/demo.spec.ts (Lightswitch tests)"></code-example>

Here is the `DashboardHeroComponent` from the _Tour of Heroes_ tutorial.

下面这段代码是来自《英雄指南》教程的 `DashboardHeroComponent`。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.ts"
  region="class"
  header="app/dashboard/dashboard-hero.component.ts (component)"></code-example>

It appears within the template of a parent component,
which binds a _hero_ to the `@Input` property and
listens for an event raised through the _selected_ `@Output` property.

它渲染在父组件的模板中，那里把一个英雄绑定到了 `@Input` 属性上，并且通过 `@Output` 属性监听*选中英雄*时的事件。

You can test that the class code works without creating the `DashboardHeroComponent`
or its parent component.

你可以测试 `DashboardHeroComponent` 类，而不用完整创建它或其父组件。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="class-only"
  header="app/dashboard/dashboard-hero.component.spec.ts (class tests)"></code-example>

When a component has dependencies, you may wish to use the `TestBed` to both
create the component and its dependencies.

当组件有依赖时，你可能要使用 `TestBed` 来同时创建该组件及其依赖。

The following `WelcomeComponent` depends on the `UserService` to know the name of the user to greet.

下面的 `WelcomeComponent` 依赖于 `UserService`，并通过它知道要打招呼的那位用户的名字。

<code-example
  path="testing/src/app/welcome/welcome.component.ts"
  region="class"
  header="app/welcome/welcome.component.ts"></code-example>

You might start by creating a mock of the `UserService` that meets the minimum needs of this component.

你可能要先创建一个满足本组件最小需求的模拟版 `UserService`。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="mock-user-service"
  header="app/welcome/welcome.component.spec.ts (MockUserService)"></code-example>

Then provide and inject _both the_ **component** _and the service_ in the `TestBed` configuration.

然后在 `TestBed` 的配置中提供并同时注入该**组件**和该**服务**。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-before-each"
  header="app/welcome/welcome.component.spec.ts (class-only setup)"></code-example>

Then exercise the component class, remembering to call the [lifecycle hook methods](guide/lifecycle-hooks) as Angular does when running the app.

然后使用这个组件类，别忘了像 Angular 运行本应用时那样调用它的[生命周期钩子方法](guide/lifecycle-hooks)。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-tests"
  header="app/welcome/welcome.component.spec.ts (class-only tests)"></code-example>

### Component DOM testing

### 组件 DOM 的测试

Testing the component _class_ is as easy as testing a service.

测试组件*类*就像测试服务那样简单。

But a component is more than just its class.
A component interacts with the DOM and with other components.
The _class-only_ tests can tell you about class behavior.
They cannot tell you if the component is going to render properly,
respond to user input and gestures, or integrate with its parent and child components.

但组件不仅是这个类。
组件还要和 DOM 以及其它组件进行交互。
*只涉及类*的测试可以告诉你组件类的行为是否正常，
但是不能告诉你组件是否能正常渲染出来、响应用户的输入和查询或与它的父组件和子组件相集成。

None of the _class-only_ tests above can answer key questions about how the
components actually behave on screen.

上述*只涉及类*的测试没办法回答这些组件在屏幕上的行为之类的关键性问题：

- Is `Lightswitch.clicked()` bound to anything such that the user can invoke it?

   `Lightswitch.clicked()` 是否真的绑定到了某些用户可以接触到的东西？

- Is the `Lightswitch.message` displayed?

   `Lightswitch.message` 是否真的显示出来了？

- Can the user actually select the hero displayed by `DashboardHeroComponent`?

   用户真的可以选择 `DashboardHeroComponent` 中显示的某个英雄吗？

- Is the hero name displayed as expected (i.e, in uppercase)?

   英雄的名字是否如预期般显示出来了？（比如是否大写）

- Is the welcome message displayed by the template of `WelcomeComponent`?

   `WelcomeComponent` 的模板是否显示了欢迎信息？

These may not be troubling questions for the simple components illustrated above.
But many components have complex interactions with the DOM elements
described in their templates, causing HTML to appear and disappear as
the component state changes.

这些问题对于上面这种简单的组件来说当然没有问题，
不过很多组件和它们模板中所描述的 DOM 元素之间会有复杂的交互，当组件的状态发生变化时，会导致一些 HTML 出现和消失。

To answer these kinds of questions, you have to create the DOM elements associated
with the components, you must examine the DOM to confirm that component state
displays properly at the appropriate times, and you must simulate user interaction
with the screen to determine whether those interactions cause the component to
behave as expected.

要回答这类问题，你就不得不创建那些与组件相关的 DOM 元素了，你必须检查 DOM 来确认组件的状态能在恰当的时机正常显示出来，并且必须通过屏幕来仿真用户的交互，以判断这些交互是否如预期的那般工作。

To write these kinds of test, you'll use additional features of the `TestBed`
as well as other testing helpers.

要想写这类测试，你就要用到 `TestBed` 的附加功能以及其它测试助手了。

#### CLI-generated tests

#### CLI 生成的测试

The CLI creates an initial test file for you by default when you ask it to
generate a new component.

当你用 CLI 生成新的组件时，它也会默认创建最初的测试文件。

For example, the following CLI command generates a `BannerComponent` in the `app/banner` folder (with inline template and styles):

比如，下列 CLI 命令会在 `app/banner` 文件夹中生成带有内联模板和内联样式的 `BannerComponent`：

<code-example language="sh" class="code-shell">
ng generate component banner --inline-template --inline-style --module app
</code-example>

It also generates an initial test file for the component, `banner-external.component.spec.ts`, that looks like this:

它也会为组件生成最初的测试文件 `banner-external.component.spec.ts`，代码如下：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v1"
  header="app/banner/banner-external.component.spec.ts (initial)"></code-example>

<div class="alert is-helpful">

Because `compileComponents` is asynchronous, it uses
the [`async`](api/core/testing/async) utility
function imported from `@angular/core/testing`.

由于 `compileComponents` 是异步的，所以它要使用从 `@angular/core/testing` 中导入的工具函数 [`async`](api/core/testing/async)。

Please refer to the [async](#async) section for more details.

欲知详情，请参见 [async](#async) 部分。

</div>

#### Reduce the setup

#### 缩减环境准备代码

Only the last three lines of this file actually test the component
and all they do is assert that Angular can create the component.

这个文件中只有最后三行是真正测试组件的，它们用来断言 Angular 可以创建该组件。

The rest of the file is boilerplate setup code anticipating more advanced tests that _might_ become necessary if the component evolves into something substantial.

文件的其它部分都是为更高级的测试二准备的样板代码，当组件逐渐演变成更加实质性的东西时，它们才*可能*变成必备的。

You'll learn about these advanced test features below.
For now, you can radically reduce this test file to a more manageable size:

稍后你将学到这些高级的测试特性。
不过目前，你可以先把这些测试文件缩减成更加可控的大小，以便理解：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v2"
  header="app/banner/banner-initial.component.spec.ts (minimal)"></code-example>

In this example, the metadata object passed to `TestBed.configureTestingModule`
simply declares `BannerComponent`, the component to test.

在这个例子中，传给 `TestBed.configureTestingModule` 的元数据对象中只声明了 `BannerComponent` —— 待测试的组件。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="configureTestingModule">
</code-example>

<div class="alert is-helpful">

There's no need to declare or import anything else.
The default test module is pre-configured with
something like the `BrowserModule` from `@angular/platform-browser`.

不用声明或导入任何其它的东西。
默认的测试模块中已经预先配置好了一些东西，比如来自 `@angular/platform-browser` 的 `BrowserModule`。

Later you'll call `TestBed.configureTestingModule()` with
imports, providers, and more declarations to suit your testing needs.
Optional `override` methods can further fine-tune aspects of the configuration.

稍后你将会调用带有导入模块、服务提供者和更多可声明对象的 `TestBed.configureTestingModule()` 来满足测试所需。
将来还可以用可选的 `override` 方法对这些配置进行微调。

</div>

{@a create-component}

#### _createComponent()_

After configuring `TestBed`, you call its `createComponent()` method.

在配置好 `TestBed` 之后，你还可以调用它的 `createComponent()` 方法。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="createComponent">
</code-example>

`TestBed.createComponent()` creates an instance of the `BannerComponent`,
adds a corresponding element to the test-runner DOM,
and returns a [`ComponentFixture`](#component-fixture).

`TestBed.createComponent()` 会创建一个 `BannerComponent` 的实例，把相应的元素添加到测试运行器的 DOM 中，然后返回一个 [`ComponentFixture`](#component-fixture) 对象。

<div class="alert is-important">

Do not re-configure `TestBed` after calling `createComponent`.

在调用了 `createComponent` 之后就不能再重新配置 `TestBed` 了。

The `createComponent` method freezes the current `TestBed` definition,
closing it to further configuration.

`createComponent` 方法冻结了当前的 `TestBed` 定义，关闭它才能再进行后续配置。

You cannot call any more `TestBed` configuration methods, not `configureTestingModule()`,
nor `get()`, nor any of the `override...` methods.
If you try, `TestBed` throws an error.

你不能再调用任何 `TestBed` 的后续配置方法了，不能调 `configureTestingModule()`、不能调 `get()`，
也不能调用任何 `override...` 方法。
如果试图这么做，`TestBed` 就会抛出错误。

</div>

{@a component-fixture}

#### _ComponentFixture_

The [ComponentFixture](api/core/testing/ComponentFixture) is a test harness for interacting with the created component and its corresponding element.

[ComponentFixture](api/core/testing/ComponentFixture) 是一个测试挽具（就像马车缰绳），用来与所创建的组件及其 DOM 元素进行交互。

Access the component instance through the fixture and confirm it exists with a Jasmine expectation:

可以通过测试夹具（fixture）来访问该组件的实例，并用 Jasmine 的 `expect` 语句来确保其存在。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="componentInstance">
</code-example>

#### _beforeEach()_

You will add more tests as this component evolves.
Rather than duplicate the `TestBed` configuration for each test,
you refactor to pull the setup into a Jasmine `beforeEach()` and some supporting variables:

随着该组件的成长，你将会添加更多测试。
除了为每个测试都复制一份 `TestBed` 测试之外，你还可以把它们重构成 Jasmine 的 `beforeEach()` 中的准备语句以及一些支持性变量：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v3"
 ></code-example>

Now add a test that gets the component's element from `fixture.nativeElement` and
looks for the expected text.

现在，添加一个测试，用它从 `fixture.nativeElement` 中获取组件的元素，并查找是否存在所预期的文本内容。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-2">
</code-example>

{@a native-element}

#### _nativeElement_

The value of `ComponentFixture.nativeElement` has the `any` type.
Later you'll encounter the `DebugElement.nativeElement` and it too has the `any` type.

`ComponentFixture.nativeElement` 的值是 `any` 类型的。
稍后你将遇到的 `DebugElement.nativeElement` 也同样是 `any` 类型的。

Angular can't know at compile time what kind of HTML element the `nativeElement` is or
if it even is an HTML element.
The app might be running on a _non-browser platform_, such as the server or a
[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API),
where the element may have a diminished API or not exist at all.

Angular 在编译期间没办法知道 `nativeElement` 是哪种 HTML 元素，甚至是否 HTML 元素（译注：比如可能是 SVG 元素）。
本应用还可能运行在*非浏览器平台上*，比如服务端渲染或 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 那里的元素可能只有一些缩水过的 API，甚至根本不存在。

The tests in this guide are designed to run in a browser so a
`nativeElement` value will always be an `HTMLElement` or
one of its derived classes.

本指南中的测试都是为运行在浏览器中而设计的，因此 `nativeElement` 的值一定会是 `HTMLElement` 或其派生类。

Knowing that it is an `HTMLElement` of some sort, you can use
the standard HTML `querySelector` to dive deeper into the element tree.

如果知道了它是某种 `HTMLElement`，你就可以用标准的 `querySelector` 在元素树中进行深挖了。

Here's another test that calls `HTMLElement.querySelector` to get the paragraph element and look for the banner text:

下面这个测试就会调用 `HTMLElement.querySelector` 来获取 `<p>` 元素，并在其中查找 Banner 文本：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-3">
</code-example>

{@a debug-element}

#### _DebugElement_

The Angular _fixture_ provides the component's element directly through the `fixture.nativeElement`.

Angular 的*夹具*可以通过 `fixture.nativeElement` 直接提供组件的元素。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="nativeElement">
</code-example>

This is actually a convenience method, implemented as `fixture.debugElement.nativeElement`.

它实际上是 `fixture.debugElement.nativeElement` 的一个便利方法。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="debugElement-nativeElement">
</code-example>

There's a good reason for this circuitous path to the element.

这种访问元素的迂回方式有很好的理由。

The properties of the `nativeElement` depend upon the runtime environment.
You could be running these tests on a _non-browser_ platform that doesn't have a DOM or
whose DOM-emulation doesn't support the full `HTMLElement` API.

`nativeElement` 的属性取决于运行环境。
你可以在没有 DOM，或者其 DOM 模拟器无法支持全部 `HTMLElement` API 的平台上运行这些测试。

Angular relies on the `DebugElement` abstraction to work safely across _all supported platforms_.
Instead of creating an HTML element tree, Angular creates a `DebugElement` tree that wraps the _native elements_ for the runtime platform.
The `nativeElement` property unwraps the `DebugElement` and returns the platform-specific element object.

Angular 依赖于 `DebugElement` 这个抽象层，就可以安全的横跨*其支持的所有平台*。
Angular 不再创建 HTML 元素树，而是创建 `DebugElement` 树，其中包裹着相应运行平台上的*原生元素*。
`nativeElement` 属性会解开 `DebugElement`，并返回平台相关的元素对象。

Because the sample tests for this guide are designed to run only in a browser,
a `nativeElement` in these tests is always an `HTMLElement`
whose familiar methods and properties you can explore within a test.

因为本章的这些测试都设计为只运行在浏览器中，因此这些测试中的 `nativeElement` 总是 `HTMLElement`，
你可以在测试中使用那些熟悉的方法和属性进行浏览。

Here's the previous test, re-implemented with `fixture.debugElement.nativeElement`:

下面是对上一个测试改用 `fixture.debugElement.nativeElement` 进行的重新实现：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-4">
</code-example>

The `DebugElement` has other methods and properties that
are useful in tests, as you'll see elsewhere in this guide.

`DebugElement` 还有其它的方法和属性，它们在测试中也很有用，你将在本章的其它测试中看到它们。

You import the `DebugElement` symbol from the Angular core library.

你要从 Angular 核心库中导入 `DebugElement` 符号。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-debug-element">
</code-example>

{@a by-css}

#### _By.css()_

Although the tests in this guide all run in the browser,
some apps might run on a different platform at least some of the time.

虽然本章中的测试都是运行在浏览器中的，不过有些应用可能会运行在其它平台上（至少一部分时间是这样）。

For example, the component might render first on the server as part of a strategy to make the application launch faster on poorly connected devices. The server-side renderer might not support the full HTML element API.
If it doesn't support `querySelector`, the previous test could fail.

比如，作为加快慢速网络设备上应用启动速度的一种策略，组件可能要先在服务器上渲染。服务端渲染可能无法支持完全的 HTML API。
如果它不支持 `querySelector`，那么前一个测试就会失败。

The `DebugElement` offers query methods that work for all supported platforms.
These query methods take a _predicate_ function that returns `true` when a node in the `DebugElement` tree matches the selection criteria.

`DebugElement` 提供了可以工作在所有受支持的平台上的查询方法。
这些查询方法接受一个谓词（predicate）函数，如果 `DebugElement` 树中的节点满足某个筛选条件，它就返回 `true`。

You create a _predicate_ with the help of a `By` class imported from a
library for the runtime platform. Here's the `By` import for the browser platform:

你可以在从库中导入的 `By` 类的帮助下为该运行平台创建谓词函数。下面这个 `By` 是从浏览器平台导入的：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-by">
</code-example>

The following example re-implements the previous test with
`DebugElement.query()` and the browser's `By.css` method.

下面这个例子使用 `DebugElement.query()` 和浏览器的 `By.css` 方法重新实现了前一个测试。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-5">
</code-example>

Some noteworthy observations:

值得注意的地方有：

- The `By.css()` static method selects `DebugElement` nodes
  with a [standard CSS selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors 'CSS selectors').

   `By.css()` 静态方法使用[标准 CSS 选择器](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors 'CSS selectors')选择了一些 `DebugElement` 节点。

- The query returns a `DebugElement` for the paragraph.

   这次查询返回了 `<p>` 元素的一个 `DebugElement`。

- You must unwrap that result to get the paragraph element.

   你必须解包此结果，以获取这个 `<p>` 元素。

When you're filtering by CSS selector and only testing properties of a browser's _native element_, the `By.css` approach may be overkill.

当你要通过 CSS 选择器过滤，并且只打算测试浏览器的*原生元素*的属性时，`By.css` 这种方法就有点多余了。

It's often easier and more clear to filter with a standard `HTMLElement` method
such as `querySelector()` or `querySelectorAll()`,
as you'll see in the next set of tests.

使用标准的 `HTMLElement` 方法，比如 `querySelector()` 或 `querySelectorAll()` 通常会更简单、更清晰。
你在下一组测试中就会体会到这一点。

<hr>

## Component Test Scenarios

## 组件测试场景

The following sections, comprising most of this guide, explore common
component testing scenarios

下面这些部分构成了本指南的大部分内容，它们将探讨一些常见的组件测试场景。

### Component binding

### 组件绑定

The current `BannerComponent` presents static title text in the HTML template.

当前的 `BannerComponent` 在 HTML 模板中展示了静态标题内容。

After a few changes, the `BannerComponent` presents a dynamic title by binding to
the component's `title` property like this.

稍作修改之后，`BannerComponent` 也可以通过绑定到组件的 `title` 属性来展示动态标题。就像这样：

<code-example
  path="testing/src/app/banner/banner.component.ts"
  region="component"
  header="app/banner/banner.component.ts"></code-example>

Simple as this is, you decide to add a test to confirm that component
actually displays the right content where you think it should.

很简单，你决定添加一个测试来确定这个组件真的像你预期的那样显示出了正确的内容。

#### Query for the _&lt;h1&gt;_

#### 查询 `<h1>`

You'll write a sequence of tests that inspect the value of the `<h1>` element
that wraps the _title_ property interpolation binding.

你将会写一系列测试来探查 `<h1>` 元素的值，这个值包含在了带有 `title` 属性的插值绑定中。

You update the `beforeEach` to find that element with a standard HTML `querySelector`
and assign it to the `h1` variable.

你要修改 `beforeEach` 来使用标准的 HTML `querySelector` 来找到该元素，并把它赋值给 `h1` 变量。

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="setup"
  header="app/banner/banner.component.spec.ts (setup)"></code-example>

{@a detect-changes}

#### _createComponent()_ does not bind data

#### `createComponent()` 函数不会绑定数据

For your first test you'd like to see that the screen displays the default `title`.
Your instinct is to write a test that immediately inspects the `<h1>` like this:

你的第一个测试希望看到屏幕显示出了默认的 `title`。
你本能的写出如下测试来立即审查这个 `<h1>` 元素：

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="expect-h1-default-v1">
</code-example>

_That test fails_ with the message:

但*测试失败了*，给出如下信息：

```javascript

expected '' to contain 'Test Tour of Heroes'.

```

Binding happens when Angular performs **change detection**.

因为绑定是在 Angular 执行**变更检测**时才发生的。

In production, change detection kicks in automatically
when Angular creates a component or the user enters a keystroke or
an asynchronous activity (e.g., AJAX) completes.

在产品阶段，当 Angular 创建组件、用户输入或者异步动作（比如 AJAX）完成时，会自动触发变更检测。

The `TestBed.createComponent` does _not_ trigger change detection; a fact confirmed in the revised test:

但 `TestBed.createComponent` *不能*触发变更检测。
可以在这个修改后的测试中确定这一点：

<code-example
  path="testing/src/app/banner/banner.component.spec.ts" region="test-w-o-detect-changes"></code-example>

#### _detectChanges()_

You must tell the `TestBed` to perform data binding by calling `fixture.detectChanges()`.
Only then does the `<h1>` have the expected title.

你必须通过调用 `fixture.detectChanges()` 来要求 `TestBed` 执行数据绑定。
然后 `<h1>` 中才会具有所期望的标题。

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="expect-h1-default">
</code-example>

Delayed change detection is intentional and useful.
It gives the tester an opportunity to inspect and change the state of
the component _before Angular initiates data binding and calls [lifecycle hooks](guide/lifecycle-hooks)_.

这种迟到的变更检测是故意设计的，而且很有用。
它给了测试者一个机会，*在 Angular 初始化数据绑定以及调用[生命周期钩子](guide/lifecycle-hooks)之前*探查并改变组件的状态。

Here's another test that changes the component's `title` property _before_ calling `fixture.detectChanges()`.

下面这个测试中，会在调用 `fixture.detectChanges()` *之前*修改组件的 `title` 属性。

<code-example 
  path="testing/src/app/banner/banner.component.spec.ts" 
  region="after-change">
</code-example>

{@a auto-detect-changes}

#### Automatic change detection

#### 自动变更检测

The `BannerComponent` tests frequently call `detectChanges`.
Some testers prefer that the Angular test environment run change detection automatically.

`BannerComponent` 的这些测试需要频繁调用 `detectChanges`。
有些测试者更喜欢让 Angular 测试环境自动运行变更检测。

That's possible by configuring the `TestBed` with the `ComponentFixtureAutoDetect` provider.
First import it from the testing utility library:

使用 `ComponentFixtureAutoDetect` 服务提供者来配置 `TestBed` 就可以做到这一点。
首先从测试工具库中导入它：

<code-example path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="import-ComponentFixtureAutoDetect" header="app/banner/banner.component.detect-changes.spec.ts (import)"></code-example>

Then add it to the `providers` array of the testing module configuration:

然后把它添加到测试模块配置的 `providers` 数组中：

<code-example path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect" header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect)"></code-example>

Here are three tests that illustrate how automatic change detection works.

这三个测试阐明了自动变更检测的工作原理。

<code-example path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect-tests" header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect Tests)"></code-example>

The first test shows the benefit of automatic change detection.

第一个测试程序展示了自动检测的好处。

The second and third test reveal an important limitation.
The Angular testing environment does _not_ know that the test changed the component's `title`.
The `ComponentFixtureAutoDetect` service responds to _asynchronous activities_ such as promise resolution, timers, and DOM events.
But a direct, synchronous update of the component property is invisible.
The test must call `fixture.detectChanges()` manually to trigger another cycle of change detection.

第二和第三个测试程序显示了它重要的局限性。
Angular 测试环境**不会**知道测试程序改变了组件的 `title` 属性。
自动检测只对异步行为比如承诺的解析、计时器和 DOM 事件作出反应。
但是直接修改组件属性值的这种同步更新是不会触发**自动检测**的。
测试程序必须手动调用 `fixture.detectChange()`，来触发新一轮的变更检测周期。

<div class="alert is-helpful">

Rather than wonder when the test fixture will or won't perform change detection,
the samples in this guide _always call_ `detectChanges()` _explicitly_.
There is no harm in calling `detectChanges()` more often than is strictly necessary.

相比于受测试工具有没有执行变更检测的困扰，本章中的例子更愿意**总是显式**调用 `detectChanges()`。
即使是在不需要的时候，频繁调用 `detectChanges()` 也没有任何坏处。

</div>

<hr>

{@a dispatch-event}

#### Change an input value with _dispatchEvent()_

#### 使用 `dispatchEvent()` 修改输入值

To simulate user input, you can find the input element and set its `value` property.

要想模拟用户输入，你就要找到 `<input>` 元素并设置它的 `value` 属性。

You will call `fixture.detectChanges()` to trigger Angular's change detection.
But there is an essential, intermediate step.

你要调用 `fixture.detectChanges()` 来触发 Angular 的变更检测。
但那只是一个基本的中间步骤。

Angular doesn't know that you set the input element's `value` property.
It won't read that property until you raise the element's `input` event by calling `dispatchEvent()`.
_Then_ you call `detectChanges()`.

Angular 不知道你设置了这个 `<input>` 元素的 `value` 属性。
在你通过调用 `dispatchEvent()` 触发了该输入框的 `input` 事件之前，它不能读到那个值。
*调用完之后*你再调用 `detectChanges()`。

The following example demonstrates the proper sequence.

下面的例子演示了这个调用顺序。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe" header="app/hero/hero-detail.component.spec.ts (pipe test)"></code-example>

<hr>

### Component with external files

### 带有外部文件的组件

The `BannerComponent` above is defined with an _inline template_ and _inline css_, specified in the `@Component.template` and `@Component.styles` properties respectively.

上面的 `BannerComponent` 定义了一个*内联模板*和*内联 CSS*，分别是在 `@Component.template` 和 `@Component.styles` 属性中指定的。

Many components specify _external templates_ and _external css_ with the
`@Component.templateUrl` and `@Component.styleUrls` properties respectively,
as the following variant of `BannerComponent` does.

很多组件会分别用 `@Component.templateUrl` 和 `@Component.styleUrls` 属性来指定*外部模板*和*外部 CSS*，就像下面这个 `BannerComponent` 的变体中所做的一样：

<code-example
  path="testing/src/app/banner/banner-external.component.ts"
  region="metadata"
  header="app/banner/banner-external.component.ts (metadata)"></code-example>

This syntax tells the Angular compiler to read the external files during component compilation.

这个语法告诉 Angular 编译器在编译期间读取外部文件。

That's not a problem when you run the CLI `ng test` command because it
_compiles the app before running the tests_.

当你运行 CLI 的 `ng test` 命令的时候这毫无问题，因为它会*在运行测试之前先编译该应用*。

However, if you run the tests in a **non-CLI environment**,
tests of this component may fail.
For example, if you run the `BannerComponent` tests in a web coding environment such as [plunker](https://plnkr.co/), you'll see a message like this one:

不过，如果你在**非 CLI 环境下**运行这些测试，那么对该组件的测试就可能失败。
比如，如果你在像 [plunker](http://plnkr.co/) 这样的 Web 编程环境下运行 `BannerComponent` 的测试，就会看到如下信息：

<code-example language="sh" class="code-shell" hideCopy>
Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.
</code-example>

You get this test failure message when the runtime environment
compiles the source code _during the tests themselves_.

如果在*测试自身期间*，运行环境试图编译源码，就会出现这个测试错误信息。

To correct the problem, call `compileComponents()` as explained [below](#compile-components).

要解决这个问题，可以像[稍后](#compile-components)解释的那样调用一次 `compileComponents()`。

{@a component-with-dependency}

### Component with a dependency

### 带依赖的组件

Components often have service dependencies.

组件经常依赖其它服务。

The `WelcomeComponent` displays a welcome message to the logged in user.
It knows who the user is based on a property of the injected `UserService`:

`WelcomeComponent` 为登陆的用户显示一条欢迎信息。它从注入的 `UserService` 的属性得知用户的身份：

<code-example path="testing/src/app/welcome/welcome.component.ts" header="app/welcome/welcome.component.ts"></code-example>

The `WelcomeComponent` has decision logic that interacts with the service, logic that makes this component worth testing.
Here's the testing module configuration for the spec file, `app/welcome/welcome.component.spec.ts`:

`WelcomeComponent` 带有与服务交互的决策逻辑，这些逻辑让该组件值得测试。
下面是 `app/welcome/welcome.component.spec.ts` 中的测试模块配置：

<code-example path="testing/src/app/welcome/welcome.component.spec.ts" region="config-test-module" header="app/welcome/welcome.component.spec.ts"></code-example>

This time, in addition to declaring the _component-under-test_,
the configuration adds a `UserService` provider to the `providers` list.
But not the real `UserService`.

这次，在测试配置里不但声明了被测试的组件，而且在 `providers` 数组中添加了 `UserService` 依赖。但不是真实的 `UserService`。

{@a service-test-doubles}

#### Provide service test doubles

#### 提供服务的测试替身

A _component-under-test_ doesn't have to be injected with real services.
In fact, it is usually better if they are test doubles (stubs, fakes, spies, or mocks).
The purpose of the spec is to test the component, not the service,
and real services can be trouble.

被测试的组件不一定要注入真正的服务。实际上，服务的替身（Stub - 桩, Fake - 假冒品, Spy - 间谍或者 Mock - 模拟对象）通常会更加合适。
spec 的主要目的是测试组件，而不是服务。真实的服务可能连自身都有问题，不应该让它干扰对组件的测试。

Injecting the real `UserService` could be a nightmare.
The real service might ask the user for login credentials and
attempt to reach an authentication server.
These behaviors can be hard to intercept.
It is far easier and safer to create and register a test double in place of the real `UserService`.

注入真实的 `UserService` 有可能很麻烦。真实的服务可能询问用户登录凭据，也可能试图连接认证服务器。
可能很难处理这些行为。所以在真实的 `UserService` 的位置创建和注册 `UserService` 替身，会让测试更加容易和安全。

This particular test suite supplies a minimal mock of the `UserService` that satisfies the needs of the `WelcomeComponent` and its tests:

这个测试套件提供了 `UserService` 的一个最小化模拟对象，它能满足 `WelcomeComponent` 及其测试的需求：

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="user-service-stub"
  header="app/welcome/welcome.component.spec.ts"></code-example>

{@a get-injected-service}

#### Get injected services

#### 获取注入的服务

The tests need access to the (stub) `UserService` injected into the `WelcomeComponent`.

测试程序需要访问被注入到 `WelcomeComponent` 中的 `UserService`（stub 类）。

Angular has a hierarchical injection system.
There can be injectors at multiple levels, from the root injector created by the `TestBed`
down through the component tree.

Angular 的注入系统是层次化的。
可以有很多层注入器，从根 `TestBed` 创建的注入器下来贯穿整个组件树。

The safest way to get the injected service, the way that **_always works_**,
is to **get it from the injector of the _component-under-test_**.
The component injector is a property of the fixture's `DebugElement`.

最安全并**总是有效**的获取注入服务的方法，是**从被测组件的注入器获取**。
组件注入器是 fixture 的 `DebugElement` 的属性之一。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="injected-service"
  header="WelcomeComponent's injector">
</code-example>

{@a testbed-inject}

#### _TestBed.inject()_

You _may_ also be able to get the service from the root injector via `TestBed.inject()`.
This is easier to remember and less verbose.
But it only works when Angular injects the component with the service instance in the test's root injector.

你也可能通过 `TestBed.inject()` 来使用根注入器获取该服务。
这样更容易记住而且不那么啰嗦。
不过这只有当 Angular 组件需要的恰好是该测试的根注入器时才能正常工作。

In this test suite, the _only_ provider of `UserService` is the root testing module,
so it is safe to call `TestBed.inject()` as follows:

在这个测试套件中，`UserService` *唯一*的提供者就是根测试模块中的，因此调用 `TestBed.inject()` 就是安全的，代码如下：

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="inject-from-testbed"
  header="TestBed injector">
</code-example>

<div class="alert is-helpful">

For a use case in which `TestBed.inject()` does not work,
see the [_Override component providers_](#component-override) section that
explains when and why you must get the service from the component's injector instead.

对于那些不能用 `TestBed.inject()` 的测试用例，请参见[改写组件的提供者](#component-override)一节，那里解释了何时以及为何必须改从组件自身的注入器中获取服务。

</div>

{@a welcome-spec-setup}

#### Final setup and tests

#### 最终的准备及测试代码

Here's the complete `beforeEach()`, using `TestBed.inject()`:

下面是使用 `TestBed.inject()` 的完整的 `beforeEach()`：

<code-example path="testing/src/app/welcome/welcome.component.spec.ts" region="setup" header="app/welcome/welcome.component.spec.ts"></code-example>

And here are some tests:

下面是一些测试程序:

<code-example path="testing/src/app/welcome/welcome.component.spec.ts" region="tests" header="app/welcome/welcome.component.spec.ts"></code-example>

The first is a sanity test; it confirms that the stubbed `UserService` is called and working.

第一个测试程序是合法测试程序，它确认这个被模拟的 `UserService` 是否被调用和工作正常。

<div class="alert is-helpful">

The second parameter to the Jasmine matcher (e.g., `'expected name'`) is an optional failure label.
If the expectation fails, Jasmine appends this label to the expectation failure message.
In a spec with multiple expectations, it can help clarify what went wrong and which expectation failed.

Jasmine 匹配器的第二个参数（比如 `'expected name'`）是一个可选的失败标签。
如果这个期待语句失败了，Jasmine 就会把这个标签追加显示到这条个期待语句的失败信息后面。
对于具有多个期待语句的规约，它可以帮助澄清到底什么出错了，以及哪个期待语句失败了。

</div>

The remaining tests confirm the logic of the component when the service returns different values.
The second test validates the effect of changing the user name.
The third test checks that the component displays the proper message when there is no logged-in user.

接下来的测试程序确认当服务返回不同的值时组件的逻辑是否工作正常。
第二个测试程序验证变换用户名字的效果。
第三个测试程序检查如果用户没有登录，组件是否显示正确消息。

<hr>

{@a component-with-async-service}

### Component with async service

### 带有异步服务的组件

In this sample, the `AboutComponent` template hosts a `TwainComponent`.
The `TwainComponent` displays Mark Twain quotes.

在这个例子中，`AboutComponent` 的模板中还有一个 `TwainComponent`。
`TwainComponent` 用于显示引自马克·吐温的话。

<code-example
  path="testing/src/app/twain/twain.component.ts"
  region="template"
  header="app/twain/twain.component.ts (template)"></code-example>

Note that the value of the component's `quote` property passes through an `AsyncPipe`.
That means the property returns either a `Promise` or an `Observable`.

注意该组件的 `quote` 属性的值是通过 `AsyncPipe` 传进来的。
这意味着该属性或者返回 `Promise` 或者返回 `Observable`。

In this example, the `TwainComponent.getQuote()` method tells you that
the `quote` property returns an `Observable`.

在这个例子中，`TwainComponent.getQuote()` 方法告诉你 `quote` 方法返回的是 `Observable`。

<code-example
  path="testing/src/app/twain/twain.component.ts"
  region="get-quote"
  header="app/twain/twain.component.ts (getQuote)"></code-example>

The `TwainComponent` gets quotes from an injected `TwainService`.
The component starts the returned `Observable` with a placeholder value (`'...'`),
before the service can return its first quote.

`TwainComponent` 会从一个注入进来的 `TwainService` 来获取这些引文。
在服务返回第一条引文之前，该组件会先返回一个占位值（`'...'`）的 `Observable`。

The `catchError` intercepts service errors, prepares an error message,
and returns the placeholder value on the success channel.
It must wait a tick to set the `errorMessage`
in order to avoid updating that message twice in the same change detection cycle.

`catchError` 会拦截服务中的错误，准备错误信息，并在成功分支中返回占位值。
它必须等一拍（tick）才能设置 `errorMessage`，以免在同一个变更检测周期中两次修改这个消息而导致报错。

These are all features you'll want to test.

这就是你要测试的全部特性。

#### Testing with a spy

#### 使用间谍（Spy）进行测试

When testing a component, only the service's public API should matter.
In general, tests themselves should not make calls to remote servers.
They should emulate such calls. The setup in this `app/twain/twain.component.spec.ts` shows one way to do that:

当测试组件时，只应该关心服务的公共 API。
通常来说，测试不应该自己向远端服务器发起调用。
它们应该对这些调用进行仿真。`app/twain/twain.component.spec.ts` 中的准备代码展示了实现方式之一：

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="setup"
  header="app/twain/twain.component.spec.ts (setup)"></code-example>

{@a service-spy}

Focus on the spy.

重点看这个间谍对象（spy）。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="spy">
</code-example>

The spy is designed such that any call to `getQuote` receives an observable with a test quote.
Unlike the real `getQuote()` method, this spy bypasses the server
and returns a synchronous observable whose value is available immediately.

这个间谍的设计是：任何对 `getQuote` 的调用都会收到一个包含测试引文的可观察对象。
和真正的 `getQuote()` 方法不同，这个间谍跳过了服务器，直接返回了一个能立即解析出值的同步型可观察对象。

You can write many useful tests with this spy, even though its `Observable` is synchronous.

虽然它的 `Observable` 是同步的，不过你仍然可以使用这个间谍对象写出很多有用的测试。

{@a sync-tests}

#### Synchronous tests

#### 同步测试

A key advantage of a synchronous `Observable` is that
you can often turn asynchronous processes into synchronous tests.

同步 `Observable` 的一大优点就是你可以把那些异步的流程转换成同步测试。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="sync-test">
</code-example>

Because the spy result returns synchronously, the `getQuote()` method updates
the message on screen immediately _after_
the first change detection cycle during which Angular calls `ngOnInit`.

因为间谍对象的结果是同步返回的，所以 `getQuote()` 方法会在 Angular 调用 `ngOnInit` 时触发的首次变更检测周期后立即修改屏幕上的消息。

You're not so lucky when testing the error path.
Although the service spy will return an error synchronously,
the component method calls `setTimeout()`.
The test must wait at least one full turn of the JavaScript engine before the
value becomes available. The test must become _asynchronous_.

但测试出错路径的时候就没这么幸运了。
虽然该服务的间谍也会返回一个同步的错误对象，但是组件的那个方法中调用了 `setTimeout()`。
这个测试必须至少等待 JavaScript 引擎的一个周期，那个值才会变成可用状态。因此这个测试变成了*异步的*。

{@a fake-async}

#### Async test with _fakeAsync()_

#### 使用 `fakeAsync()` 进行异步测试

To use `fakeAsync()` functionality, you must import `zone.js/dist/zone-testing` in your test setup file.
If you created your project with the Angular CLI, `zone-testing` is already imported in `src/test.ts`.

要使用 `fakeAsync()` 功能，你必须导入 `zone.js/dist/zone-testing`。
如果你是用 Angular CLI 创建的项目，那么 `src/test.ts` 中就已经导入好了 `zone-testing`。

The following test confirms the expected behavior when the service returns an `ErrorObservable`.

下列测试用于确保当服务返回 `ErrorObservable` 的时候也能有符合预期的行为。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="error-test">
</code-example>

Note that the `it()` function receives an argument of the following form.

注意这个 `it()` 函数接收了一个如下形式的参数。

```javascript

fakeAsync(() => { /* test body */ })
```

The `fakeAsync()` function enables a linear coding style by running the test body in a special `fakeAsync test zone`.
The test body appears to be synchronous.
There is no nested syntax (like a `Promise.then()`) to disrupt the flow of control.

`fakeAsync` 函数通过在一个特殊的*`fakeAsync` 测试区域（zone）*中运行测试体来启用线性代码风格。
测试体看上去是同步的。
这里没有嵌套式语法（如 `Promise.then()`）来打断控制流。

<div class="alert is-helpful">

Limitation: The `fakeAsync()` function won't work if the test body makes an `XMLHttpRequest` (XHR) call.
XHR calls within a test are rare, but if you need to call XHR, see [`async()`](#async), below.

限制：如果测试体中发起了 `XMLHttpRequest`（XHR）调用，则 `fakeAsync()` 函数将不起作用。
测试中很少进行 XHR 调用，但是如果你需要调用 XHR，请参见下面的 [`async()`](#async) 部分。

</div>

{@a tick}

#### The _tick()_ function

#### `tick()` 函数

You do have to call [tick()](api/core/testing/tick) to advance the (virtual) clock.

你必须调用 `tick()` 函数来向前推动（虚拟）时钟。

Calling [tick()](api/core/testing/tick) simulates the passage of time until all pending asynchronous activities finish.
In this case, it waits for the error handler's `setTimeout()`.

调用 [`tick()`](api/core/testing/tick) 会模拟时光的流逝，直到所有未决的异步活动都结束为止。
在这个例子中，它会等待错误处理器中的 `setTimeout()`。

The [tick()](api/core/testing/tick) function accepts milliseconds and tickOptions as parameters, the millisecond (defaults to 0 if not provided) parameter represents how much the virtual clock advances. For example, if you have a `setTimeout(fn, 100)` in a `fakeAsync()` test, you need to use tick(100) to trigger the fn callback. The tickOptions is an optional parameter with a property called `processNewMacroTasksSynchronously` (defaults to true) represents whether to invoke new generated macro tasks when ticking.

[tick()](api/core/testing/tick) 函数接受一个毫秒值和一个 `tickOptions` 作为参数（如果没有提供毫秒值则默认为 0）。该参数表示虚拟时钟要前进多少。
比如，如果你的 `fakeAsync()` 测试中有一个 `setTimeout(fn, 100)` 函数，你就需要用 `tick(100)` 来触发它的 fn 回调。
`tickOptions` 是一个可选参数，具有名为 `processNewMacroTasksSynchronously`（默认为 `true`）的属性，表示是否要在滴答时调用新生成的宏任务。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-tick">
</code-example>

The [tick()](api/core/testing/tick) function is one of the Angular testing utilities that you import with `TestBed`.
It's a companion to `fakeAsync()` and you can only call it within a `fakeAsync()` body.

[tick()](api/core/testing/tick) 函数是你从 `TestBed` 中导入的 Angular 测试实用工具之一。
它和 `fakeAsync()` 一同使用，并且你只能在 `fakeAsync()` 体中调用它。

#### tickOptions

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-tick-new-macro-task-sync">
</code-example>

In this example, we have a new macro task (nested setTimeout), by default, when we `tick`, the setTimeout `outside` and `nested` will both be triggered.

在这个例子中，我们有一个新的宏任务（嵌套的 setTimeout），默认情况下，当我们 `tick` 时，`setTimeout` 的 `outside` 和 `nested` 都会被触发。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-tick-new-macro-task-async">
</code-example>

And in some case, we don't want to trigger the new macro task when ticking, we can use `tick(milliseconds, {processNewMacroTasksSynchronously: false})` to not invoke new macro task.

某些情况下，我们在 ticking 时可能不希望触发新的宏任务，这时可以使用 `tick(milliseconds, {processNewMacroTasksSynchronously: false})` 来阻止。

#### Comparing dates inside fakeAsync()

#### 在 `fakeAsync()` 中比较日期（date）

`fakeAsync()` simulates passage of time, which allows you to calculate the difference between dates inside `fakeAsync()`.

`fakeAsync()` 可以模拟时光的流逝，它允许你在 `fakeAsync()` 中计算日期之间的差异。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-date">
</code-example>

#### jasmine.clock with fakeAsync()

#### `jasmine.clock` 与 `fakeAsync()`

Jasmine also provides a `clock` feature to mock dates. Angular automatically runs tests that are run after
`jasmine.clock().install()` is called inside a `fakeAsync()` method until `jasmine.clock().uninstall()` is called. `fakeAsync()` is not needed and throws an error if nested.

Jasmine 也提供了 `clock` 特性来模拟日期。在 `fakeAsync()` 方法内，Angular 会自动运行那些调用 `jasmine.clock().install()` 和调用 `jasmine.clock().uninstall()` 之间的测试。`fakeAsync()` 不是必须的，而且如果嵌套它会抛出错误。

By default, this feature is disabled. To enable it, set a global flag before importing `zone-testing`.

默认情况下，该特性是禁用的。要启用它，请在导入 `zone-testing` 之前设置一个全局标志。

If you use the Angular CLI, configure this flag in `src/test.ts`.

如果你使用 Angular CLI，请在 `src/test.ts` 中配置此标志。

```
(window as any)['__zone_symbol__fakeAsyncPatchLock'] = true;
import 'zone.js/dist/zone-testing';
```

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-clock">
</code-example>

#### Using the RxJS scheduler inside fakeAsync()

#### 在 `fakeAsync()` 内使用 RxJS 调度器（scheduler）

You can also use RxJS scheduler in `fakeAsync()` just like using `setTimeout()` or `setInterval()`, but you need to import `zone.js/dist/zone-patch-rxjs-fake-async` to patch RxJS scheduler.

你还可以在 `fakeAsync()` 中使用 RxJS 调度器，就像 `setTimeout()` 或 `setInterval()` 一样，但是你要导入 `zone.js/dist/zone-patch-rxjs-fake-async` 来 patch 掉 RxJS 的调度器。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-rxjs">
</code-example>

#### Support more macroTasks

#### 支持更多宏任务（macroTasks）

By default, `fakeAsync()` supports the following macro tasks.

默认情况下，`fakeAsync()` 支持下列 `macroTasks`。

- `setTimeout`
- `setInterval`
- `requestAnimationFrame`
- `webkitRequestAnimationFrame`
- `mozRequestAnimationFrame`

If you run other macro tasks such as `HTMLCanvasElement.toBlob()`, an _"Unknown macroTask scheduled in fake async test"_ error will be thrown.

如果你运行其它 `macroTasks`（比如 `HTMLCanvasElement.toBlob()`）就会抛出一条 `Unknown macroTask scheduled in fake async test` 错误。

<code-tabs>
  <code-pane
    header="src/app/shared/canvas.component.spec.ts (failing)"
    path="testing/src/app/shared/canvas.component.spec.ts"
    region="without-toBlob-macrotask">
  </code-pane>
  <code-pane
    header="src/app/shared/canvas.component.ts"
    path="testing/src/app/shared/canvas.component.ts"
    region="main">
  </code-pane>
</code-tabs>

If you want to support such a case, you need to define the macro task you want to support in `beforeEach()`.
For example:

如果你要支持这种情况，就要在 `beforeEach()` 中定义你要支持的宏任务。比如：

<code-example
  header="src/app/shared/canvas.component.spec.ts (excerpt)"
  path="testing/src/app/shared/canvas.component.spec.ts"
  region="enable-toBlob-macrotask">
</code-example>

Note that in order to make the `<canvas>` element Zone.js-aware in your app, you need to import the `zone-patch-canvas` patch (either in `polyfills.ts` or in the specific file that uses `<canvas>`):

注意，为了让 `<canvas>` 元素变成支持 Zone.js 的，你需要导入 `zone-patch-canvas` 补丁（无论是在 `polyfills.ts` 中还是在用到了 `<canvas>` 的具体文件中）：

<code-example
  header="src/polyfills.ts or src/app/shared/canvas.component.ts"
  path="testing/src/app/shared/canvas.component.ts"
  region="import-canvas-patch">
</code-example>

#### Async observables

#### 异步的可观察对象

You might be satisfied with the test coverage of these tests.

你可能对这些测试的覆盖率已经很满足了。

However, you might be troubled by the fact that the real service doesn't quite behave this way.
The real service sends requests to a remote server.
A server takes time to respond and the response certainly won't be available immediately
as in the previous two tests.

不过你可能会因为真实的服务没有按这种方式工作而困扰。
真实的服务器会把请求发送给远端服务器。
服务需要花一些时间来作出响应，它的响应当然也不会真的像前面两个测试中那样立即可用。

Your tests will reflect the real world more faithfully if you return an _asynchronous_ observable
from the `getQuote()` spy like this.

如果你在 `getQuote()` 间谍中返回一个*异步*可观察对象，那它就能更忠诚的反映出真实的世界了。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="async-setup">
</code-example>

#### Async observable helpers

#### 可观察对象的异步助手

The async observable was produced by an `asyncData` helper.
The `asyncData` helper is a utility function that you'll have to write yourself, or you can copy this one from the sample code.

这个异步的可观察对象是用 `asyncData` 辅助函数生成的。
`asyncData` 助手是一个工具函数，你可以自己写一个，也可以从下面的范例代码中复制一份。

<code-example
  path="testing/src/testing/async-observable-helpers.ts"
  region="async-data"
  header="testing/async-observable-helpers.ts">
</code-example>

This helper's observable emits the `data` value in the next turn of the JavaScript engine.

这个辅助函数的可观察对象会在 JavaScript 引擎的下一个工作周期中发出 `data` 的值。

The [RxJS `defer()` operator](http://reactivex.io/documentation/operators/defer.html) returns an observable.
It takes a factory function that returns either a promise or an observable.
When something subscribes to _defer_'s observable,
it adds the subscriber to a new observable created with that factory.

[RxJS 的 `defer()` （延期）操作符](http://reactivex.io/documentation/operators/defer.html) 会返回一个可观察对象。
它获取一个工厂函数，这个工厂函数或者返回 Promise 或者返回 Observable。
当有人订阅了这个 `defer` 的可观察对象时，它就会把这个订阅者添加到由那个工厂函数创建的新的可观察对象中。

The `defer()` operator transforms the `Promise.resolve()` into a new observable that,
like `HttpClient`, emits once and completes.
Subscribers are unsubscribed after they receive the data value.

`defer()` 操作符会把 `Promise.resolve()` 转换成一个新的可观察对象，然后像 `HttpClient` 那样的发出一个值，然后结束。
订阅者将会在接收到这个数据值之后自动被取消订阅。

There's a similar helper for producing an async error.

下面是一个类似的用于产生异步错误的辅助函数。

<code-example
  path="testing/src/testing/async-observable-helpers.ts"
  region="async-error">
</code-example>

#### More async tests

#### 更多异步测试

Now that the `getQuote()` spy is returning async observables,
most of your tests will have to be async as well.

现在，`getQuote()` 间谍会返回一个异步的可观察对象，你的大多数测试也同样要变成异步的。

Here's a `fakeAsync()` test that demonstrates the data flow you'd expect
in the real world.

下面这个 `fakeAsync()` 测试演示了你所期待的和真实世界中一样的数据流。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="fake-async-test">
</code-example>

Notice that the quote element displays the placeholder value (`'...'`) after `ngOnInit()`.
The first quote hasn't arrived yet.

注意，这个 `<quote>` 元素应该在 `ngOnInit()` 之后显示占位值（`'...'`），
但第一个引文却没有出现。

To flush the first quote from the observable, you call [tick()](api/core/testing/tick).
Then call `detectChanges()` to tell Angular to update the screen.

要刷出可观察对象中的第一个引文，你就要先调用 `tick()`，然后调用 `detectChanges()` 来要求 Angular 刷新屏幕。

Then you can assert that the quote element displays the expected text.

然后你就可以断言这个 `<quote>` 元素应该显示所预期的文字了。

{@a async}

#### Async test with _async()_

#### 使用 `async()` 进行异步测试

To use `async()` functionality, you must import `zone.js/dist/zone-testing` in your test setup file.
If you created your project with the Angular CLI, `zone-testing` is already imported in `src/test.ts`.

要使用 `async()` 功能，你必须导入 `zone.js/dist/zone-testing`。
如果你是用 Angular CLI 创建的项目，那么 `src/test.ts` 中就已经导入好了 `zone-testing`。

The `fakeAsync()` utility function has a few limitations.
In particular, it won't work if the test body makes an `XMLHttpRequest` (XHR) call.
XHR calls within a test are rare so you can generally stick with [`fakeAsync()`](#fake-async).
But if you ever do need to call `XMLHttpRequest`, you'll want to know about `async()`.

`fakeAsync()` 工具函数有一些限制。
特别是，如果测试中发起了 `XMLHttpRequest`（XHR） 调用，它就没用了。
测试中的 `XHR` 调用比较罕见，所以你通常会使用 [`fakeAsync()`](#fake-async)。
不过你可能迟早会需要调用 `XMLHttpRequest`，那就来了解一些 `async()` 的知识吧。

<div class="alert is-helpful">

The `TestBed.compileComponents()` method (see [below](#compile-components)) calls `XHR`
to read external template and css files during "just-in-time" compilation.
Write tests that call `compileComponents()` with the `async()` utility.

`TestBed.compileComponents()` 方法（参见[稍后](#compile-components)）就会在 JIT 编译期间调用 `XHR` 来读取外部模板和 CSS 文件。
如果写调用了 `compileComponents()` 的测试，就要用到 `async()` 工具函数了。

</div>

Here's the previous `fakeAsync()` test, re-written with the `async()` utility.

下面是用 `async()` 工具函数重写的以前的 `fakeAsync()` 测试。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="async-test">
</code-example>

The `async()` utility hides some asynchronous boilerplate by arranging for the tester's code
to run in a special _async test zone_.
You don't need to pass Jasmine's `done()` into the test and call `done()` because it is `undefined` in promise or observable callbacks.

`async()` 工具函数通过把测试人员的代码放进在一个特殊的*async 测试区域*中，节省了一些用于异步调用的样板代码。
你不必把 Jasmine 的 `done()` 传给这个测试，并在承诺（Promise）或可观察对象的回调中调用 `done()`。

But the test's asynchronous nature is revealed by the call to `fixture.whenStable()`,
which breaks the linear flow of control.

但是对 `fixture.whenStable()` 的调用揭示了该测试的异步本性，它将会打破线性的控制流。

When using an `intervalTimer()` such as `setInterval()` in `async()`, remember to cancel the timer with `clearInterval()` after the test, otherwise the `async()` never ends.

当要在 `async()` 中使用 `setInterval()` 之类的 `intervalTimer()` 时，别忘了在测试完成之后调用 `clearInterval()` 来取消定时器，否则 `async()` 永远不会结束。

{@a when-stable}

#### _whenStable_

The test must wait for the `getQuote()` observable to emit the next quote.
Instead of calling [tick()](api/core/testing/tick), it calls `fixture.whenStable()`.

该测试必须等待 `getQuote()` 的可观察对象发出下一条引言。
它不再调用 `tick()`，而是调用 `fixture.whenStable()`。

The `fixture.whenStable()` returns a promise that resolves when the JavaScript engine's
task queue becomes empty.
In this example, the task queue becomes empty when the observable emits the first quote.

`fixture.whenStable()` 返回一个承诺，这个承诺会在 JavaScript 引擎的任务队列变为空白时被解析。
在这个例子中，一旦这个可观察对象发出了第一条引言，这个任务队列就会变为空。

The test resumes within the promise callback, which calls `detectChanges()` to
update the quote element with the expected text.

该测试在这个承诺的回调中继续执行，它会调用 `detectChanges()` 来用预期的文本内容修改 `<quote>` 元素。

{@a jasmine-done}

#### Jasmine _done()_

While the `async()` and `fakeAsync()` functions greatly
simplify Angular asynchronous testing,
you can still fall back to the traditional technique
and pass `it` a function that takes a
[`done` callback](https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support).

虽然 `async` 和 `fakeAsync` 函数极大地简化了 Angular 的异步测试，不过你仍然可以回退到传统的技术中。
也就是说给 `it` 额外传入一个函数型参数，这个函数接受一个 [`done` 回调](http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support)。

You can't call `done()` in `async()` or `fakeAsync()` functions, because the `done parameter`
is `undefined`.

但你不能在 `async()` 或 `fakeAsync()` 函数中调用 `done()`，因为它的 `done` 参数是 `undefined`。

Now you are responsible for chaining promises, handling errors, and calling `done()` at the appropriate moments.

现在，你就要负责对 Promise 进行链接、处理错误，并在适当的时机调用 `done()` 了。

Writing test functions with `done()`, is more cumbersome than `async()`and `fakeAsync()`, but it is occasionally necessary when code involves the `intervalTimer()` like `setInterval`.

写带有 `done()` 的测试函数会比 `async` 和 `fakeAsync` 方式更加冗长。
不过有些时候它是必要的。
比如，你不能在那些涉及到 `intervalTimer()` 或 RxJS 的 `delay()` 操作符时调用 `async` 或 `fakeAsync` 函数。

Here are two more versions of the previous test, written with `done()`.
The first one subscribes to the `Observable` exposed to the template by the component's `quote` property.

下面是对前面的测试用 `done()` 重写后的两个版本。
第一个会订阅由组件的 `quote` 属性暴露给模板的那个 `Observable`。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="quote-done-test"></code-example>

The RxJS `last()` operator emits the observable's last value before completing, which will be the test quote.
The `subscribe` callback calls `detectChanges()` to
update the quote element with the test quote, in the same manner as the earlier tests.

RxJS 的 `last()` 操作符会在结束之前发出这个可观察对象的最后一个值，也就是那条测试引文。
`subscribe` 回调中会像以前一样调用 `detectChanges()` 用这条测试引文更新 `<quote>` 元素。

In some tests, you're more interested in how an injected service method was called and what values it returned,
than what appears on screen.

有些测试中，相对于在屏幕上展示了什么，你可能会更关心所注入服务的某个方法是如何被调用的，以及它的返回值是什么。

A service spy, such as the `qetQuote()` spy of the fake `TwainService`,
can give you that information and make assertions about the state of the view.

服务的间谍，比如假冒服务 `TwainService` 的 `getQuote()` 间谍，可以给你那些信息，并且对视图的状态做出断言。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="spy-done-test"></code-example>

<hr>

{@a marble-testing}

### Component marble tests

### 组件的弹珠测试

The previous `TwainComponent` tests simulated an asynchronous observable response
from the `TwainService` with the `asyncData` and `asyncError` utilities.

前面的 `TwainComponent` 测试中使用 `TwainService` 中的 `asyncData` 和 `asyncError` 工具函数仿真了可观察对象的异步响应。

These are short, simple functions that you can write yourself.
Unfortunately, they're too simple for many common scenarios.
An observable often emits multiple times, perhaps after a significant delay.
A component may coordinate multiple observables
with overlapping sequences of values and errors.

那些都是你自己写的简短函数。
很不幸，它们对于很多常见场景来说都太过简单了。
可观察对象通常会发出很多次值，还可能会在显著的延迟之后。
组件可能要协调多个由正常值和错误值组成的重叠序列的可观察对象。

**RxJS marble testing** is a great way to test observable scenarios,
both simple and complex.
You've likely seen the [marble diagrams](http://rxmarbles.com/)
that illustrate how observables work.
Marble testing uses a similar marble language to
specify the observable streams and expectations in your tests.

**RxJS 的弹珠测试**是测试各种可观察对象场景的最佳方式 —— 无论简单还是复杂。
你可以看看[弹珠图](http://rxmarbles.com/)，它揭示了可观察对象的工作原理。
弹珠测试使用类似的弹珠语言来在你的测试中指定可观察对象流和对它们的期待。

The following examples revisit two of the `TwainComponent` tests
with marble testing.

下面的例子使用弹珠测试重写了 `TwainComponent` 的两个测试。

Start by installing the `jasmine-marbles` npm package.
Then import the symbols you need.

首先安装 `jasmine-marbles` 这个 npm 包，然后倒入所需的符号。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="import-marbles"
  header="app/twain/twain.component.marbles.spec.ts (import marbles)"></code-example>

Here's the complete test for getting a quote:

下面是对获取引文功能的完整测试：

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="get-quote-test"></code-example>

Notice that the Jasmine test is synchronous. There's no `fakeAsync()`.
Marble testing uses a test scheduler to simulate the passage of time
in a synchronous test.

注意，这个 Jasmine 测试是同步的。没有调用 `fakeAsync()`。
弹珠测试使用了一个测试调度程序来用同步的方式模拟时间的流逝。

The beauty of marble testing is in the visual definition of the observable streams.
This test defines a [_cold_ observable](#cold-observable) that waits
three [frames](#marble-frame) (`---`),
emits a value (`x`), and completes (`|`).
In the second argument you map the value marker (`x`) to the emitted value (`testQuote`).

弹珠测试的美妙之处在于它给出了可观察对象流的可视化定义。
这个测试定义了一个[*冷的*可观察对象](#cold-observable)，它等待三[帧](#marble-frame) (`---`)，然后发出一个值（`x`），然后结束（`|`）。
在第二个参数中，你把值标记（`x`）换成了实际发出的值（`testQuote`）。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="test-quote-marbles"></code-example>

The marble library constructs the corresponding observable, which the
test sets as the `getQuote` spy's return value.

这个弹珠库会构造出相应的可观察对象，测试代码会把它当做 `getQuote` 间谍的返回值。

When you're ready to activate the marble observables,
you tell the `TestScheduler` to _flush_ its queue of prepared tasks like this.

当你已经准备好激活这个弹珠库构造出的可观察对象时，只要让 `TestScheduler` 去*刷新*准备好的任务队列就可以了。代码如下：

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="test-scheduler-flush"></code-example>

This step serves a purpose analogous to [tick()](api/core/testing/tick) and `whenStable()` in the
earlier `fakeAsync()` and `async()` examples.
The balance of the test is the same as those examples.

这个步骤的目的类似于前面的 `fakeAsync()` 和 `async()` 范例中的 `tick()` 和 `whenStable()`。
这种测试的权衡方式也和那些例子中是一样的。

#### Marble error testing

#### 弹珠错误测试

Here's the marble testing version of the `getQuote()` error test.

下面是 `getQuote()` 错误测试的弹珠测试版本。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="error-test"></code-example>

It's still an async test, calling `fakeAsync()` and [tick()](api/core/testing/tick), because the component itself
calls `setTimeout()` when processing errors.

它仍然是异步测试，要调用 `fakeAsync()` 和 `tick()`，这是因为组件自身在处理错误的时候调用 `setTimeout()`。

Look at the marble observable definition.

看看弹珠库生成的可观察对象的定义。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="error-marbles"></code-example>

This is a _cold_ observable that waits three frames and then emits an error,
The hash (`#`) indicates the timing of the error that is specified in the third argument.
The second argument is null because the observable never emits a value.

它是一个*冷的*可观察对象，它等待三帧，然后发出一个错误。
井号（`#`）标记出了发出错误的时间点，这个错误是在第三个参数中指定的。
第二个参数是空的，因为这个可观察对象永远不会发出正常值。

#### Learn about marble testing

#### 深入学习弹珠测试

{@a marble-frame}

A _marble frame_ is a virtual unit of testing time.
Each symbol (`-`, `x`, `|`, `#`) marks the passing of one frame.

*弹珠帧*是测试时序中的虚拟单元。
每个符号（`-`，`x`，`|`，`#`）都表示一帧过去了。

{@a cold-observable}

A _cold_ observable doesn't produce values until you subscribe to it.
Most of your application observables are cold.
All [_HttpClient_](guide/http) methods return cold observables.

*冷的*可观察对象不会生成值，除非你订阅它。
应用中的大多数可观察对象都是冷的。
所有 [`HttpClient`](guide/http)的方法返回的都是冷的可观察对象。

A _hot_ observable is already producing values _before_ you subscribe to it.
The [_Router.events_](api/router/Router#events) observable,
which reports router activity, is a _hot_ observable.

*热的*可观察对象在你订阅它之前就会生成值。
[`Router.events`](api/router/Router#events) 可观察对象会主动汇报路由器的活动，它就是个*热的*可观察对象。

RxJS marble testing is a rich subject, beyond the scope of this guide.
Learn about it on the web, starting with the
[official documentation](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md).

RxJS 的弹珠测试是一个内容丰富的主题，超出了本章的范围。
要想在网络上进一步学习它，可以从 [official documentation](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md) 开始。

<hr>

{@a component-with-input-output}

### Component with inputs and outputs

### 带有输入输出参数的组件

A component with inputs and outputs typically appears inside the view template of a host component.
The host uses a property binding to set the input property and an event binding to
listen to events raised by the output property.

带有导入和导出的组件通常出现在宿主组件的视图模板中。
宿主使用属性绑定来设置输入属性，使用事件绑定来监听输出属性触发的事件。

The testing goal is to verify that such bindings work as expected.
The tests should set input values and listen for output events.

测试的目的是验证这样的绑定和期待的那样正常工作。
测试程序应该设置导入值并监听导出事件。

The `DashboardHeroComponent` is a tiny example of a component in this role.
It displays an individual hero provided by the `DashboardComponent`.
Clicking that hero tells the `DashboardComponent` that the user has selected the hero.

`DashboardHeroComponent` 是非常小的这种类型的例子组件。
它显示由 `DashboardCompoent` 提供的英雄个体。
点击英雄告诉 `DashbaordComponent` 用户已经选择了这个英雄。

The `DashboardHeroComponent` is embedded in the `DashboardComponent` template like this:

`DashboardHeroComponent` 是这样内嵌在 `DashboardCompoent` 的模板中的：

<code-example
  path="testing/src/app/dashboard/dashboard.component.html"
  region="dashboard-hero"
  header="app/dashboard/dashboard.component.html (excerpt)"></code-example>

The `DashboardHeroComponent` appears in an `*ngFor` repeater, which sets each component's `hero` input property
to the looping value and listens for the component's `selected` event.

`DashboardHeroComponent` 在 `*ngFor` 循环中出现，把每个组件的 `hero` input 属性设置为迭代的值，并监听组件的 `selected` 事件。

Here's the component's full definition:

下面是该组件的完整定义：

{@a dashboard-hero-component}

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.ts"
  region="component"
  header="app/dashboard/dashboard-hero.component.ts (component)"></code-example>

While testing a component this simple has little intrinsic value, it's worth knowing how.
You can use one of these approaches:

虽然测试这么简单的组件没有什么内在价值，但是它的测试程序是值得学习的。
  有下列候选测试方案：

- Test it as used by `DashboardComponent`.

   把它当作被 `DashbaordComponent` 使用的组件来测试

- Test it as a stand-alone component.

   把它当作独立的组件来测试

- Test it as used by a substitute for `DashboardComponent`.

   把它当作被 `DashbaordComponent` 的替代组件使用的组件来测试

A quick look at the `DashboardComponent` constructor discourages the first approach:

简单看看 `DashbaordComponent` 的构造函数就否决了第一种方案：

<code-example
  path="testing/src/app/dashboard/dashboard.component.ts"
  region="ctor"
  header="app/dashboard/dashboard.component.ts (constructor)"></code-example>

The `DashboardComponent` depends on the Angular router and the `HeroService`.
You'd probably have to replace them both with test doubles, which is a lot of work.
The router seems particularly challenging.

`DashbaordComponent` 依赖 Angular 路由器和 `HeroService` 服务。
你必须使用测试替身替换它们两个，似乎过于复杂了。
路由器尤其具有挑战性。

<div class="alert is-helpful">

The [discussion below](#routing-component) covers testing components that require the router.

[稍后的讨论](#routing-component)涵盖了那些需要路由器的测试组件。

</div>

The immediate goal is to test the `DashboardHeroComponent`, not the `DashboardComponent`,
so, try the second and third options.

当前的任务是测试 `DashboardHeroComponent` 组件，而非 `DashbaordComponent`，所以无需做不必要的努力。
那就试试第二和第三种方案。

{@a dashboard-standalone}

#### Test _DashboardHeroComponent_ stand-alone

#### 单独测试 `DashboardHeroComponent`

Here's the meat of the spec file setup.

下面是 spec 文件的准备语句中的重点部分。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="setup"
  header="app/dashboard/dashboard-hero.component.spec.ts (setup)"></code-example>

Note how the setup code assigns a test hero (`expectedHero`) to the component's `hero` property,
emulating the way the `DashboardComponent` would set it
via the property binding in its repeater.

注意代码是如何将模拟英雄（`expectedHero`）赋值给组件的 `hero` 属性的，模拟了 `DashbaordComponent` 在它的迭代器中通过属性绑定的赋值方式。

The following test verifies that the hero name is propagated to the template via a binding.

下面的测试会验证英雄的名字已经通过绑定的方式传播到模板中了。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="name-test">
</code-example>

Because the [template](#dashboard-hero-component) passes the hero name through the Angular `UpperCasePipe`,
the test must match the element value with the upper-cased name.

因为[模板](#dashboard-hero-component)通过 Angular 的 `UpperCasePipe` 传入了英雄的名字，所以这个测试必须匹配该元素的值中包含了大写形式的名字。

<div class="alert is-helpful">

This small test demonstrates how Angular tests can verify a component's visual
representation&mdash;something not possible with
[component class tests](#component-class-testing)&mdash;at
low cost and without resorting to much slower and more complicated end-to-end tests.

这个小测试示范了 Angular 的测试如何以较低的成本验证组件的视觉表现（它们不能通过[组件类测试](#component-class-testing)进行验证）。
而不用借助那些更慢、更复杂的端到端测试。

</div>

#### Clicking

#### 点击

Clicking the hero should raise a `selected` event that
the host component (`DashboardComponent` presumably) can hear:

点击这个英雄将会发出一个 `selected` 事件，而宿主元素（可能是 `DashboardComponent`）可能会听到它：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="click-test">
</code-example>

The component's `selected` property returns an `EventEmitter`,
which looks like an RxJS synchronous `Observable` to consumers.
The test subscribes to it _explicitly_ just as the host component does _implicitly_.

该组件的 `selected` 属性返回一个 `EventEmitter`，对消费者来说它和 RxJS 的同步 `Observable` 很像。
该测试会*显式*订阅它，而宿主组件会*隐式*订阅它。

If the component behaves as expected, clicking the hero's element
should tell the component's `selected` property to emit the `hero` object.

如果该组件的行为符合预期，点击英雄所在的元素就会告诉组件的 `selected` 属性发出这个 `hero` 对象。

The test detects that event through its subscription to `selected`.

这个测试会通过订阅 `selected` 来检测是否确实如此。

{@a trigger-event-handler}

#### _triggerEventHandler_

The `heroDe` in the previous test is a `DebugElement` that represents the hero `<div>`.

前面测试中的 `heroDe` 是一个指向英雄条目 `<div>` 的 `DebugElement`。

It has Angular properties and methods that abstract interaction with the native element.
This test calls the `DebugElement.triggerEventHandler` with the "click" event name.
The "click" event binding responds by calling `DashboardHeroComponent.click()`.

它有一些用于抽象与原生元素交互的 Angular 属性和方法。
这个测试会使用事件名称 `click` 来调用 `DebugElement.triggerEventHandler`。
`click` 的事件绑定到了 `DashboardHeroComponent.click()`。

The Angular `DebugElement.triggerEventHandler` can raise _any data-bound event_ by its _event name_.
The second parameter is the event object passed to the handler.

Angular 的 `DebugElement.triggerEventHandler` 可以用**事件的名字**触发**任何数据绑定事件**。
第二个参数是传给事件处理器的事件对象。

The test triggered a "click" event with a `null` event object.

该测试使用事件对象 `null` 触发了一次 `click` 事件。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="trigger-event-handler">
</code-example>

The test assumes (correctly in this case) that the runtime
event handler&mdash;the component's `click()` method&mdash;doesn't
care about the event object.

测试程序假设（在这里应该这样)运行时间的事件处理器（组件的 `click()` 方法）不关心事件对象。

<div class="alert is-helpful">

Other handlers are less forgiving. For example, the `RouterLink`
directive expects an object with a `button` property
that identifies which mouse button (if any) was pressed during the click.
The `RouterLink` directive throws an error if the event object is missing.

其它处理器的要求比较严格。比如，`RouterLink` 指令期望一个带有 `button` 属性的对象，该属性用于指出点击时按下的是哪个鼠标按钮。
如果不给出这个事件对象，`RouterLink` 指令就会抛出一个错误。

</div>

#### Click the element

#### 点击该元素

The following test alternative calls the native element's own `click()` method,
which is perfectly fine for _this component_.

下面这个测试改为调用原生元素自己的 `click()` 方法，它对于*这个组件*来说相当完美。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="click-test-2">
</code-example>

{@a click-helper}

#### _click()_ helper

#### _click()_ 辅助函数

Clicking a button, an anchor, or an arbitrary HTML element is a common test task.

点击按钮、链接或者任意 HTML 元素是很常见的测试任务。

Make that consistent and easy by encapsulating the _click-triggering_ process
in a helper such as the `click()` function below:

把*点击事件*的处理过程包装到如下的 `click()` 辅助函数中，可以让这项任务更一致、更简单：

<code-example
  path="testing/src/testing/index.ts"
  region="click-event"
  header="testing/index.ts (click helper)"></code-example>

The first parameter is the _element-to-click_. If you wish, you can pass a
custom event object as the second parameter. The default is a (partial)
<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button">left-button mouse event object</a>
accepted by many handlers including the `RouterLink` directive.

第一个参数是**用来点击的元素**。如果你愿意，可以将自定义的事件对象传给第二个参数。
默认的是（局部的）<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button" target="_blank">鼠标左键事件对象</a>，
它被许多事件处理器接受，包括 `RouterLink` 指令。

<div class="alert is-important">

The `click()` helper function is **not** one of the Angular testing utilities.
It's a function defined in _this guide's sample code_.
All of the sample tests use it.
If you like it, add it to your own collection of helpers.

`click()` 辅助函数**不是**Angular 测试工具之一。
它是在**本章的例子代码**中定义的函数方法，被所有测试例子所用。
如果你喜欢它，将它添加到你自己的辅助函数集。

</div>

Here's the previous test, rewritten using the click helper.

下面是把前面的测试用 `click` 辅助函数重写后的版本。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="click-test-3"
  header="app/dashboard/dashboard-hero.component.spec.ts (test with click helper)">
</code-example>

<hr>

{@a component-inside-test-host}

### Component inside a test host

### 位于测试宿主中的组件

The previous tests played the role of the host `DashboardComponent` themselves.
But does the `DashboardHeroComponent` work correctly when properly data-bound to a host component?

前面的这些测试都是自己扮演宿主元素 `DashboardComponent` 的角色。
但是当 `DashboardHeroComponent` 真的绑定到某个宿主元素时还能正常工作吗？

You could test with the actual `DashboardComponent`.
But doing so could require a lot of setup,
especially when its template features an `*ngFor` repeater,
other components, layout HTML, additional bindings,
a constructor that injects multiple services,
and it starts interacting with those services right away.

固然，你也可以测试真实的 `DashboardComponent`。
但要想这么做需要做很多准备工作，特别是它的模板中使用了某些特性，如 `*ngFor`、
其它组件、布局 HTML、附加绑定、注入了多个服务的构造函数、如何用正确的方式与那些服务交互等。

Imagine the effort to disable these distractions, just to prove a point
that can be made satisfactorily with a _test host_ like this one:

想出这么多需要努力排除的干扰，只是为了证明一点 —— 可以造出这样一个令人满意的*测试宿主*：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="test-host"
  header="app/dashboard/dashboard-hero.component.spec.ts (test host)"
 ></code-example>

This test host binds to `DashboardHeroComponent` as the `DashboardComponent` would
but without the noise of the `Router`, the `HeroService`, or the `*ngFor` repeater.

这个测试宿主像 `DashboardComponent` 那样绑定了 `DashboardHeroComponent`，但是没有 `Router`、
没有 `HeroService`，也没有 `*ngFor`。

The test host sets the component's `hero` input property with its test hero.
It binds the component's `selected` event with its `onSelected` handler,
which records the emitted hero in its `selectedHero` property.

这个测试宿主使用其测试用的英雄设置了组件的输入属性 `hero`。
它使用 `onSelected` 事件处理器绑定了组件的 `selected` 事件，其中把事件中发出的英雄记录到了 `selectedHero` 属性中。

Later, the tests will be able to easily check `selectedHero` to verify that the
`DashboardHeroComponent.selected` event emitted the expected hero.

稍后，这个测试就可以轻松检查 `selectedHero` 以验证 `DashboardHeroComponent.selected` 事件确实发出了所期望的英雄。

The setup for the _test-host_ tests is similar to the setup for the stand-alone tests:

这个*测试宿主*中的准备代码和独立测试中的准备过程类似：

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host-setup" header="app/dashboard/dashboard-hero.component.spec.ts (test host setup)"></code-example>

This testing module configuration shows three important differences:

这个测试模块的配置信息有三个重要的不同点：

1. It _declares_ both the `DashboardHeroComponent` and the `TestHostComponent`.

   它同时**声明**了 `DashboardHeroComponent` 和 `TestHostComponent`。

1. It _creates_ the `TestHostComponent` instead of the `DashboardHeroComponent`.

   它**创建**了 `TestHostComponent`，而非 `DashboardHeroComponent`。

1. The `TestHostComponent` sets the `DashboardHeroComponent.hero` with a binding.

   `TestHostComponent` 通过绑定机制设置了 `DashboardHeroComponent.hero`。

The `createComponent` returns a `fixture` that holds an instance of `TestHostComponent` instead of an instance of `DashboardHeroComponent`.

`createComponent` 返回的 `fixture` 里有 `TestHostComponent` 实例，而非 `DashboardHeroComponent` 组件实例。

Creating the `TestHostComponent` has the side-effect of creating a `DashboardHeroComponent`
because the latter appears within the template of the former.
The query for the hero element (`heroEl`) still finds it in the test DOM,
albeit at greater depth in the element tree than before.

当然，创建 `TestHostComponent` 有创建 `DashboardHeroComponent` 的副作用，因为后者出现在前者的模板中。
英雄元素（`heroEl`)的查询语句仍然可以在测试 DOM 中找到它，尽管元素树比以前更深。

The tests themselves are almost identical to the stand-alone version:

这些测试本身和它们的孤立版本几乎相同：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="test-host-tests"
  header="app/dashboard/dashboard-hero.component.spec.ts (test-host)"></code-example>

Only the selected event test differs. It confirms that the selected `DashboardHeroComponent` hero
really does find its way up through the event binding to the host component.

只有 selected 事件的测试不一样。它确保被选择的 `DashboardHeroComponent` 英雄确实通过事件绑定被传递到宿主组件。

<hr>

{@a routing-component}

### Routing component

### 路由组件

A _routing component_ is a component that tells the `Router` to navigate to another component.
The `DashboardComponent` is a _routing component_ because the user can
navigate to the `HeroDetailComponent` by clicking on one of the _hero buttons_ on the dashboard.

所谓*路由组件*就是指会要求 `Router` 导航到其它组件的组件。
`DashboardComponent` 就是一个*路由组件*，因为用户可以通过点击仪表盘中的某个*英雄按钮*来导航到 `HeroDetailComponent`。

Routing is pretty complicated.
Testing the `DashboardComponent` seemed daunting in part because it involves the `Router`,
which it injects together with the `HeroService`.

路由确实很复杂。
测试 `DashboardComponent` 看上去有点令人生畏，因为它牵扯到和 `HeroService` 一起注入进来的 `Router`。

<code-example
  path="testing/src/app/dashboard/dashboard.component.ts"
  region="ctor"
  header="app/dashboard/dashboard.component.ts (constructor)"></code-example>

Mocking the `HeroService` with a spy is a [familiar story](#component-with-async-service).
But the `Router` has a complicated API and is entwined with other services and application preconditions. Might it be difficult to mock?

使用间谍来 Mock `HeroService` 是一个[熟悉的故事](#component-with-async-service)。
但是 `Router` 的 API 很复杂，并且与其它服务和应用的前置条件纠缠在一起。它应该很难进行 Mock 吧？

Fortunately, not in this case because the `DashboardComponent` isn't doing much with the `Router`

庆幸的是，在这个例子中不会，因为 `DashboardComponent` 并没有深度使用 `Router`。

<code-example
  path="testing/src/app/dashboard/dashboard.component.ts"
  region="goto-detail"
  header="app/dashboard/dashboard.component.ts (goToDetail)">
</code-example>

This is often the case with _routing components_.
As a rule you test the component, not the router,
and care only if the component navigates with the right address under the given conditions.

这是*路由组件*中的通例。
一般来说，你应该测试组件而不是路由器，应该只关心组件有没有根据给定的条件导航到正确的地址。

Providing a router spy for _this component_ test suite happens to be as easy
as providing a `HeroService` spy.

为*这个组件*的测试套件提供路由器的间谍就像提供 `HeroService` 的间谍一样简单。

<code-example
  path="testing/src/app/dashboard/dashboard.component.spec.ts"
  region="router-spy"
  header="app/dashboard/dashboard.component.spec.ts (spies)"></code-example>

The following test clicks the displayed hero and confirms that
`Router.navigateByUrl` is called with the expected url.

下面这个测试会点击正在显示的英雄，并确认 `Router.navigateByUrl` 曾用所期待的 URL 调用过。

<code-example
  path="testing/src/app/dashboard/dashboard.component.spec.ts"
  region="navigate-test"
  header="app/dashboard/dashboard.component.spec.ts (navigate test)"></code-example>

{@a routed-component-w-param}

### Routed components

### 路由目标组件

A _routed component_ is the destination of a `Router` navigation.
It can be trickier to test, especially when the route to the component _includes parameters_.
The `HeroDetailComponent` is a _routed component_ that is the destination of such a route.

*路由目标组件*是指 `Router` 导航到的目标。
它测试起来可能很复杂，特别是当路由到的这个组件*包含参数*的时候。
`HeroDetailComponent` 就是一个*路由目标组件*，它是某个路由定义指向的目标。

When a user clicks a _Dashboard_ hero, the `DashboardComponent` tells the `Router`
to navigate to `heroes/:id`.
The `:id` is a route parameter whose value is the `id` of the hero to edit.

当用户点击*仪表盘*中的英雄时，`DashboardComponent` 会要求 `Router` 导航到 `heroes/:id`。
`:id` 是一个路由参数，它的值就是所要编辑的英雄的 `id`。

The `Router` matches that URL to a route to the `HeroDetailComponent`.
It creates an `ActivatedRoute` object with the routing information and
injects it into a new instance of the `HeroDetailComponent`.

该 `Router` 会根据那个 URL 匹配到一个指向 `HeroDetailComponent` 的路由。
它会创建一个带有路由信息的 `ActivatedRoute` 对象，并把它注入到一个 `HeroDetailComponent` 的新实例中。

Here's the `HeroDetailComponent` constructor:

下面是 `HeroDetailComponent` 的构造函数：

<code-example path="testing/src/app/hero/hero-detail.component.ts" region="ctor" header="app/hero/hero-detail.component.ts (constructor)"></code-example>

The `HeroDetail` component needs the `id` parameter so it can fetch
the corresponding hero via the `HeroDetailService`.
The component has to get the `id` from the `ActivatedRoute.paramMap` property
which is an `Observable`.

`HeroDetailComponent` 组件需要一个 `id` 参数，以便通过 `HeroDetailService` 获取相应的英雄。
该组件只能从 `ActivatedRoute.paramMap` 属性中获取这个 `id`，这个属性是一个 `Observable`。

It can't just reference the `id` property of the `ActivatedRoute.paramMap`.
The component has to _subscribe_ to the `ActivatedRoute.paramMap` observable and be prepared
for the `id` to change during its lifetime.

它不能仅仅引用 `ActivatedRoute.paramMap` 的 `id` 属性。
该组件不得不*订阅* `ActivatedRoute.paramMap` 这个可观察对象，要做好它在生命周期中随时会发生变化的准备。

<code-example path="testing/src/app/hero/hero-detail.component.ts" region="ng-on-init" header="app/hero/hero-detail.component.ts (ngOnInit)"></code-example>

<div class="alert is-helpful">

The [ActivatedRoute in action](guide/router#activated-route-in-action) section of the [Router](guide/router) guide covers `ActivatedRoute.paramMap` in more detail.

[路由与导航](guide/router#route-parameters)一章的 [ActivatedRoute 实战](guide/router#activated-route-in-action)部分详细讲解了 `ActivatedRoute.paramMap`。

</div>

Tests can explore how the `HeroDetailComponent` responds to different `id` parameter values
by manipulating the `ActivatedRoute` injected into the component's constructor.

通过操纵注入到组件构造函数中的这个 `ActivatedRoute`，测试可以探查 `HeroDetailComponent` 是如何对不同的 `id` 参数值做出响应的。

You know how to spy on the `Router` and a data service.

你已经知道了如何给 `Router` 和数据服务安插间谍。

You'll take a different approach with `ActivatedRoute` because

不过对于 `ActivatedRoute`，你要采用另一种方式，因为：

- `paramMap` returns an `Observable` that can emit more than one value 
during a test.

   在测试期间，`paramMap` 会返回一个能发出多个值的 `Observable`。

- You need the router helper function, `convertToParamMap()`, to create a `ParamMap`.

   你需要路由器的辅助函数 `convertToParamMap()` 来创建 `ParamMap`。

- Other _routed component_ tests need a test double for `ActivatedRoute`.

   针对*路由目标组件*的其它测试需要一个 `ActivatedRoute` 的测试替身。

These differences argue for a re-usable stub class.

这些差异表明你需要一个可复用的桩类（stub）。

#### _ActivatedRouteStub_

The following `ActivatedRouteStub` class serves as a test double for `ActivatedRoute`.

下面的 `ActivatedRouteStub` 类就是作为 `ActivatedRoute` 类的测试替身使用的。

<code-example
  path="testing/src/testing/activated-route-stub.ts"
  region="activated-route-stub"
  header="testing/activated-route-stub.ts (ActivatedRouteStub)"></code-example>

Consider placing such helpers in a `testing` folder sibling to the `app` folder.
This sample puts `ActivatedRouteStub` in `testing/activated-route-stub.ts`.

考虑把这类辅助函数放进一个紧邻 `app` 文件夹的 `testing` 文件夹。
这个例子把 `ActivatedRouteStub` 放在了 `testing/activated-route-stub.ts` 中。

<div class="alert is-helpful">

Consider writing a more capable version of this stub class with
the [_marble testing library_](#marble-testing).

  可以考虑使用[弹珠测试库](#marble-testing)来为此测试桩编写一个更强力的版本。

</div>

{@a tests-w-test-double}

#### Testing with _ActivatedRouteStub_

#### 使用 `ActivatedRouteStub` 进行测试

Here's a test demonstrating the component's behavior when the observed `id` refers to an existing hero:

下面的测试程序是演示组件在被观察的 `id` 指向现有英雄时的行为：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-good-id" header="app/hero/hero-detail.component.spec.ts (existing id)"></code-example>

<div class="alert is-helpful">

The `createComponent()` method and `page` object are discussed [below](#page-object).
Rely on your intuition for now.

`createComponent()` 方法和 `page` 对象会在[稍后](#page-object)进行讨论。
不过目前，你只要凭直觉来理解就行了。

</div>

When the `id` cannot be found, the component should re-route to the `HeroListComponent`.

当找不到 `id` 的时候，组件应该重新路由到 `HeroListComponent`。

The test suite setup provided the same router spy [described above](#routing-component) which spies on the router without actually navigating.

测试套件的准备代码提供了一个和[前面](#routing-component)一样的路由器间谍，它会充当路由器的角色，而不用发起实际的导航。

This test expects the component to try to navigate to the `HeroListComponent`.

这个测试中会期待该组件尝试导航到 `HeroListComponent`。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-bad-id" header="app/hero/hero-detail.component.spec.ts (bad id)"></code-example>

While this app doesn't have a route to the `HeroDetailComponent` that omits the `id` parameter, it might add such a route someday.
The component should do something reasonable when there is no `id`.

虽然本应用没有在缺少 `id` 参数的时候，继续导航到 `HeroDetailComponent` 的路由，但是，将来它可能会添加这样的路由。
当没有 `id` 时，该组件应该作出合理的反应。

In this implementation, the component should create and display a new hero.
New heroes have `id=0` and a blank `name`. This test confirms that the component behaves as expected:

在本例中，组件应该创建和显示新英雄。
新英雄的 `id` 为零，`name` 为空。本测试程序确认组件是按照预期的这样做的：

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="route-no-id"
  header="app/hero/hero-detail.component.spec.ts (no id)"></code-example>

<hr>

### Nested component tests

### 对嵌套组件的测试

Component templates often have nested components, whose templates
may contain more components.

组件的模板中通常还会有嵌套组件，嵌套组件的模板还可能包含更多组件。

The component tree can be very deep and, most of the time, the nested components
play no role in testing the component at the top of the tree.

这棵组件树可能非常深，并且大多数时候在测试这棵树顶部的组件时，这些嵌套的组件都无关紧要。

The `AppComponent`, for example, displays a navigation bar with anchors and their `RouterLink` directives.

比如，`AppComponent` 会显示一个带有链接及其 `RouterLink` 指令的导航条。

<code-example
  path="testing/src/app/app.component.html"
  header="app/app.component.html"></code-example>

While the `AppComponent` _class_ is empty,
you may want to write unit tests to confirm that the links are wired properly
to the `RouterLink` directives, perhaps for the reasons [explained below](#why-stubbed-routerlink-tests).

虽然 `AppComponent` *类*是空的，不过，由于[稍后解释的原因](#why-stubbed-routerlink-tests)，你可能会希望写个单元测试来确认这些链接是否正确使用了 `RouterLink` 指令。

To validate the links, you don't need the `Router` to navigate and you don't
need the `<router-outlet>` to mark where the `Router` inserts _routed components_.

要想验证这些链接，你不必用 `Router` 进行导航，也不必使用 `<router-outlet>` 来指出 `Router` 应该把*路由目标组件*插入到什么地方。

The `BannerComponent` and `WelcomeComponent`
(indicated by `<app-banner>` and `<app-welcome>`) are also irrelevant.

而 `BannerComponent` 和 `WelcomeComponent`（写作 `<app-banner>` 和 `<app-welcome>`）也同样风马牛不相及。

Yet any test that creates the `AppComponent` in the DOM will also create instances of
these three components and, if you let that happen,
you'll have to configure the `TestBed` to create them.

然而，任何测试，只要能在 DOM 中创建 `AppComponent`，也就同样能创建这三个组件的实例。如果要创建它们，你就要配置 `TestBed`。

If you neglect to declare them, the Angular compiler won't recognize the
`<app-banner>`, `<app-welcome>`, and `<router-outlet>` tags in the `AppComponent` template
and will throw an error.

如果你忘了声明它们，Angular 编译器就无法在 `AppComponent` 模板中识别出 `<app-banner>`、`<app-welcome>` 和 `<router-outlet>` 标记，并抛出一个错误。

If you declare the real components, you'll also have to declare _their_ nested components
and provide for _all_ services injected in _any_ component in the tree.

如果你声明的这些都是真实的组件，那么也同样要声明*它们*的嵌套组件，并要为这棵组件树中的*任何*组件提供要注入的*所有*服务。

That's too much effort just to answer a few simple questions about links.

如果只是想回答有关链接的一些简单问题，做这些显然就太多了。

This section describes two techniques for minimizing the setup.
Use them, alone or in combination, to stay focused on the testing the primary component.

本节会讲减少此类准备工作的两项技术。
单独使用或组合使用它们，可以让这些测试聚焦于要测试的主要组件上。

{@a stub-component}

##### Stubbing unneeded components

##### 对不需要的组件提供桩（stub）

In the first technique, you create and declare stub versions of the components
and directive that play little or no role in the tests.

这项技术中，你要为那些在测试中无关紧要的组件或指令创建和声明一些测试桩。

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="component-stubs"
  header="app/app.component.spec.ts (stub declaration)"></code-example>

The stub selectors match the selectors for the corresponding real components.
But their templates and classes are empty.

这些测试桩的选择器要和其对应的真实组件一致，但其模板和类是空的。

Then declare them in the `TestBed` configuration next to the
components, directives, and pipes that need to be real.

然后在 `TestBed` 的配置中那些真正有用的组件、指令、管道之后声明它们。

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="testbed-stubs"
  header="app/app.component.spec.ts (TestBed stubs)"></code-example>

The `AppComponent` is the test subject, so of course you declare the real version.

`AppComponent` 是该测试的主角，因此当然要用它的真实版本。

The `RouterLinkDirectiveStub`, [described later](#routerlink), is a test version
of the real `RouterLink` that helps with the link tests.

而 `RouterLinkDirectiveStub`（[稍后讲解](#routerlink)）是一个真实的 `RouterLink` 的测试版，它能帮你对链接进行测试。

The rest are stubs.

其它都是测试桩。

{@a no-errors-schema}

#### _NO_ERRORS_SCHEMA_

In the second approach, add `NO_ERRORS_SCHEMA` to the `TestBed.schemas` metadata.

第二种办法就是把 `NO_ERRORS_SCHEMA` 添加到 `TestBed.schemas` 的元数据中。

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="no-errors-schema"
  header="app/app.component.spec.ts (NO_ERRORS_SCHEMA)"></code-example>

The `NO_ERRORS_SCHEMA` tells the Angular compiler to ignore unrecognized elements and attributes.

`NO_ERRORS_SCHEMA` 会要求 Angular 编译器忽略不认识的那些元素和属性。

The compiler will recognize the `<app-root>` element and the `routerLink` attribute
because you declared a corresponding `AppComponent` and `RouterLinkDirectiveStub`
in the `TestBed` configuration.

编译器将会识别出 `<app-root>` 元素和 `RouterLink` 属性，因为你在 `TestBed` 的配置中声明了相应的
`AppComponent` 和 `RouterLinkDirectiveStub`。

But the compiler won't throw an error when it encounters `<app-banner>`, `<app-welcome>`, or `<router-outlet>`.
It simply renders them as empty tags and the browser ignores them.

但编译器在遇到 `<app-banner>`、`<app-welcome>` 或 `<router-outlet>` 时不会报错。
它只会把它们渲染成空白标签，而浏览器会忽略这些标签。

You no longer need the stub components.

你不用再提供桩组件了。

#### Use both techniques together

#### 同时使用这两项技术

These are techniques for _Shallow Component Testing_ ,
so-named because they reduce the visual surface of the component to just those elements
in the component's template that matter for tests.

这些是进行*浅层*测试要用到的技术，之所以叫浅层测试是因为只包含本测试所关心的这个组件模板中的元素。

The `NO_ERRORS_SCHEMA` approach is the easier of the two but don't overuse it.

`NO_ERRORS_SCHEMA` 方法在这两者中比较简单，但也不要过度使用它。

The `NO_ERRORS_SCHEMA` also prevents the compiler from telling you about the missing
components and attributes that you omitted inadvertently or misspelled.
You could waste hours chasing phantom bugs that the compiler would have caught in an instant.

`NO_ERRORS_SCHEMA` 还会阻止编译器告诉你因为的疏忽或拼写错误而缺失的组件和属性。
你如果人工找出这些 bug 可能要浪费几个小时，但编译器可以立即捕获它们。

The _stub component_ approach has another advantage.
While the stubs in _this_ example were empty,
you could give them stripped-down templates and classes if your tests
need to interact with them in some way.

*桩组件*方式还有其它优点。
虽然*这个*例子中的桩是空的，但你如果想要和它们用某种形式互动，也可以给它们一些裁剪过的模板和类。

In practice you will combine the two techniques in the same setup,
as seen in this example.

在实践中，你可以在准备代码中组合使用这两种技术，例子如下：

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="mixed-setup"
  header="app/app.component.spec.ts (mixed setup)"></code-example>

The Angular compiler creates the `BannerComponentStub` for the `<app-banner>` element
and applies the `RouterLinkStubDirective` to the anchors with the `routerLink` attribute,
but it ignores the `<app-welcome>` and `<router-outlet>` tags.

Angular 编译器会为 `<app-banner>` 元素创建 `BannerComponentStub`，并把 `RouterLinkStubDirective` 应用到带有 `routerLink` 属性的链接上，不过它会忽略 `<app-welcome>` 和 `<router-outlet>` 标签。

<hr>

{@a routerlink}

### Components with _RouterLink_

### 带有 `RouterLink` 的组件

The real `RouterLinkDirective` is quite complicated and entangled with other components
and directives of the `RouterModule`.
It requires challenging setup to mock and use in tests.

真实的 `RouterLinkDirective` 太复杂了，而且与 `RouterModule` 中的其它组件和指令有着千丝万缕的联系。
要在准备阶段 Mock 它以及在测试中使用它具有一定的挑战性。

The `RouterLinkDirectiveStub` in this sample code replaces the real directive
with an alternative version designed to validate the kind of anchor tag wiring
seen in the `AppComponent` template.

这段范例代码中的 `RouterLinkDirectiveStub` 用一个代用品替换了真实的指令，这个代用品用来验证 `AppComponent` 中所用链接的类型。

<code-example
  path="testing/src/testing/router-link-directive-stub.ts"
  region="router-link"
  header="testing/router-link-directive-stub.ts (RouterLinkDirectiveStub)"></code-example>

The URL bound to the `[routerLink]` attribute flows in to the directive's `linkParams` property.

这个 URL 被绑定到了 `[routerLink]` 属性，它的值流入了该指令的 `linkParams` 属性。

The `HostListener` wires the click event of the host element
(the `<a>` anchor elements in `AppComponent`) to the stub directive's `onClick` method.

它的元数据中的 `host` 属性把宿主元素（即 `AppComponent` 中的 `<a>` 元素）的 `click` 事件关联到了这个桩指令的 `onClick` 方法。

Clicking the anchor should trigger the `onClick()` method,
which sets the stub's telltale `navigatedTo` property.
Tests inspect `navigatedTo` to confirm that clicking the anchor
set the expected route definition.

点击这个链接应该触发 `onClick()` 方法，其中会设置该桩指令中的警示器属性 `navigatedTo`。
测试中检查 `navigatedTo` 以确认点击该链接确实如预期的那样根据路由定义设置了该属性。

<div class="alert is-helpful">

Whether the router is configured properly to navigate with that route definition is a
question for a separate set of tests.

路由器的配置是否正确和是否能按照那些路由定义进行导航，是测试中一组独立的问题。

</div>

{@a by-directive}

{@a inject-directive}

#### _By.directive_ and injected directives

#### `By.directive` 与注入的指令

A little more setup triggers the initial data binding and gets references to the navigation links:

再一步配置触发了数据绑定的初始化，获取导航链接的引用：

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="test-setup"
  header="app/app.component.spec.ts (test setup)"></code-example>

Three points of special interest:

有三点特别重要：

1.  You can locate the anchor elements with an attached directive using `By.directive`.

   你可以使用 `By.directive` 来定位一个带附属指令的链接元素。

1.  The query returns `DebugElement` wrappers around the matching elements.

   该查询返回包含了匹配元素的 `DebugElement` 包装器。

1.  Each `DebugElement` exposes a dependency injector with the
    specific instance of the directive attached to that element.

   每个 `DebugElement` 都会导出该元素中的一个依赖注入器，其中带有指定的指令实例。

The `AppComponent` links to validate are as follows:

`AppComponent` 中要验证的链接如下：

<code-example
  path="testing/src/app/app.component.html"
  region="links"
  header="app/app.component.html (navigation links)"></code-example>

{@a app-component-tests}

Here are some tests that confirm those links are wired to the `routerLink` directives
as expected:

下面这些测试用来确认那些链接是否如预期般连接到了 `RouterLink` 指令中：

<code-example path="testing/src/app/app.component.spec.ts" region="tests" header="app/app.component.spec.ts (selected tests)"></code-example>

<div class="alert is-helpful">

The "click" test _in this example_ is misleading.
It tests the `RouterLinkDirectiveStub` rather than the _component_.
This is a common failing of directive stubs.

其实*这个例子中*的“click”测试误入歧途了。
它测试的重点其实是 `RouterLinkDirectiveStub`，而不是该组件。
这是写桩指令时常见的错误。

It has a legitimate purpose in this guide.
It demonstrates how to find a `RouterLink` element, click it, and inspect a result,
without engaging the full router machinery.
This is a skill you may need to test a more sophisticated component, one that changes the display,
re-calculates parameters, or re-arranges navigation options when the user clicks the link.

在本章中，它有存在的必要。
它演示了如何在不涉及完整路由器机制的情况下，如何找到 `RouterLink` 元素、点击它并检查结果。
要测试更复杂的组件，你可能需要具备这样的能力，能改变视图和重新计算参数，或者当用户点击链接时，有能力重新安排导航选项。

</div>

{@a why-stubbed-routerlink-tests}

#### What good are these tests?

#### 这些测试有什么优点？

Stubbed `RouterLink` tests can confirm that a component with links and an outlet is setup properly,
that the component has the links it should have, and that they are all pointing in the expected direction.
These tests do not concern whether the app will succeed in navigating to the target component when the user clicks a link.

用 `RouterLink` 的桩指令进行测试可以确认带有链接和 outlet 的组件的设置的正确性，确认组件有应该有的链接，确认它们都指向了正确的方向。
这些测试程序不关心用户点击链接时，也不关心应用是否会成功的导航到目标组件。

Stubbing the RouterLink and RouterOutlet is the best option for such limited testing goals.
Relying on the real router would make them brittle.
They could fail for reasons unrelated to the component.
For example, a navigation guard could prevent an unauthorized user from visiting the `HeroListComponent`.
That's not the fault of the `AppComponent` and no change to that component could cure the failed test.

对于这些有限的测试目标，使用 RouterLink 桩指令和 RouterOutlet 桩组件 是最佳选择。
依靠真正的路由器会让它们很脆弱。
它们可能因为与组件无关的原因而失败。
例如，一个导航守卫可能防止没有授权的用户访问 `HeroListComponent`。
这并不是 `AppComponent` 的过错，并且无论该组件怎么改变都无法修复这个失败的测试程序。

A _different_ battery of tests can explore whether the application navigates as expected
in the presence of conditions that influence guards such as whether the user is authenticated and authorized.

一组不同的测试程序可以探索当存在影响守卫的条件时（比如用户是否已认证和授权），该应用是否如期望般导航。

<div class="alert is-helpful">

A future guide update will explain how to write such
tests with the `RouterTestingModule`.

未来对本章的更新将介绍如何使用 `RouterTestingModule` 来编写这样的测试程序。

</div>

<hr>

{@a page-object}

### Use a _page_ object

### 使用页面（page）对象

The `HeroDetailComponent` is a simple view with a title, two hero fields, and two buttons.

`HeroDetailComponent` 是带有标题、两个英雄字段和两个按钮的简单视图。

<div class="lightbox">
  <img src='generated/images/guide/testing/hero-detail.component.png' alt="HeroDetailComponent in action">
</div>

But there's plenty of template complexity even in this simple form.

但即使是这么简单的表单，其模板中也涉及到不少复杂性。

<code-example
  path="testing/src/app/hero/hero-detail.component.html" header="app/hero/hero-detail.component.html"></code-example>

Tests that exercise the component need ...

这些供练习用的组件需要 ……

- to wait until a hero arrives before elements appear in the DOM.

   等获取到英雄之后才能让元素出现在 DOM 中。

- a reference to the title text. 

   一个对标题文本的引用。

- a reference to the name input box to inspect and set it.

   一个对 name 输入框的引用，以便对它进行探查和修改。

- references to the two buttons so they can click them.

   引用两个按钮，以便点击它们。

- spies for some of the component and router methods.

   为组件和路由器的方法安插间谍。

Even a small form such as this one can produce a mess of tortured conditional setup and CSS element selection.

即使是像这样一个很小的表单，也能产生令人疯狂的错综复杂的条件设置和 CSS 元素选择。

Tame the complexity with a `Page` class that handles access to component properties
and encapsulates the logic that sets them.

可以使用 `Page` 类来征服这种复杂性。`Page` 类可以处理对组件属性的访问，并对设置这些属性的逻辑进行封装。

Here is such a `Page` class for the `hero-detail.component.spec.ts`

下面是一个供 `hero-detail.component.spec.ts` 使用的 `Page` 类

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="page"
  header="app/hero/hero-detail.component.spec.ts (Page)"></code-example>

Now the important hooks for component manipulation and inspection are neatly organized and accessible from an instance of `Page`.

现在，用来操作和检查组件的重要钩子都被井然有序的组织起来了，可以通过 `page` 实例来使用它们。

A `createComponent` method creates a `page` object and fills in the blanks once the `hero` arrives.

`createComponent` 方法会创建一个 `page` 对象，并在 `hero` 到来时自动填补空白。

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="create-component"
  header="app/hero/hero-detail.component.spec.ts (createComponent)"></code-example>

The [_HeroDetailComponent_ tests](#tests-w-test-double) in an earlier section demonstrate how `createComponent` and `page`
keep the tests short and _on message_.
There are no distractions: no waiting for promises to resolve and no searching the DOM for element values to compare.

前面小节中的 [`HeroDetailComponent` 测试](#tests-w-test-double)示范了如何 `createComponent`，而 `page` 让这些测试保持简短而富有表达力。
而且还不用分心：不用等待承诺被解析，不必在 DOM 中找出元素的值才能进行比较。

Here are a few more `HeroDetailComponent` tests to reinforce the point.

还有更多的 `HeroDetailComponent` 测试可以证明这一点。

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="selected-tests"
  header="app/hero/hero-detail.component.spec.ts (selected tests)"></code-example>

<hr>

{@a compile-components}

### Calling _compileComponents()_

### 调用 `compileComponents()`

<div class="alert is-helpful">

You can ignore this section if you _only_ run tests with the CLI `ng test` command
because the CLI compiles the application before running the tests.

如果你*只想*使用 CLI 的 `ng test` 命令来运行测试，那么可以忽略这一节。

</div>

If you run tests in a **non-CLI environment**, the tests may fail with a message like this one:

如果你在**非 CLI 环境**中运行测试，这些测试可能会报错，错误信息如下：

<code-example language="sh" class="code-shell" hideCopy>
Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.
</code-example>

The root of the problem is at least one of the components involved in the test
specifies an external template or CSS file as
the following version of the `BannerComponent` does.

问题的根源在于这个测试中至少有一个组件引用了外部模板或外部 CSS 文件，就像下面这个版本的 `BannerComponent` 所示：

<code-example
  path="testing/src/app/banner/banner-external.component.ts"
  header="app/banner/banner-external.component.ts (external template & css)"></code-example>

The test fails when the `TestBed` tries to create the component.

当 `TestBed` 视图创建组件时，这个测试失败了：

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="configure-and-create"
  header="app/banner/banner.component.spec.ts (setup that fails)"
  avoid></code-example>

Recall that the app hasn't been compiled.
So when you call `createComponent()`, the `TestBed` compiles implicitly.

回想一下，这个应用从未编译过。
所以当你调用 `createComponent()` 的时候，`TestBed` 就会进行隐式编译。

That's not a problem when the source code is in memory.
But the `BannerComponent` requires external files
that the compiler must read from the file system,
an inherently _asynchronous_ operation.

当它的源码都在内存中的时候，这样做没问题。
不过 `BannerComponent` 需要一些外部文件，编译时必须从文件系统中读取它，而这是一个天生的*异步*操作。

If the `TestBed` were allowed to continue, the tests would run and fail mysteriously
before the compiler could finished.

如果 `TestBed` 继续执行，这些测试就会继续运行，并在编译器完成这些异步工作之前导致莫名其妙的失败。

The preemptive error message tells you to compile explicitly with `compileComponents()`.

这些错误信息告诉你要使用 `compileComponents()` 进行显式的编译。

#### _compileComponents()_ is async

#### `compileComponents()` 是异步的

You must call `compileComponents()` within an asynchronous test function.

你必须在异步测试函数中调用 `compileComponents()`。

<div class="alert is-critical">

If you neglect to make the test function async
(e.g., forget to use `async()` as described below),
you'll see this error message

如果你忘了把测试函数标为异步的（比如忘了像稍后的代码中那样使用 `async()`），就会看到下列错误。

<code-example language="sh" class="code-shell" hideCopy>
Error: ViewDestroyedError: Attempt to use a destroyed view
</code-example>

</div>

A typical approach is to divide the setup logic into two separate `beforeEach()` functions:

典型的做法是把准备逻辑拆成两个独立的 `beforeEach()` 函数：

1.  An async `beforeEach()` that compiles the components

   异步的 `beforeEach()` 负责编译组件

1.  A synchronous `beforeEach()` that performs the remaining setup.

   同步的 `beforeEach()` 负责执行其余的准备代码。

To follow this pattern, import the `async()` helper with the other testing symbols.

要想使用这种模式，就要和其它符号一起从测试库中导入 `async()` 辅助函数。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="import-async">
</code-example>

#### The async _beforeEach_

#### 异步的 `beforeEach`

Write the first async `beforeEach` like this.

像下面这样编写第一个异步的 `beforeEach`。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="async-before-each"
  header="app/banner/banner-external.component.spec.ts (async beforeEach)"></code-example>

The `async()` helper function takes a parameterless function with the body of the setup.

`async()` 辅助函数接受一个无参函数，其内容是环境准备代码。

The `TestBed.configureTestingModule()` method returns the `TestBed` class so you can chain
calls to other `TestBed` static methods such as `compileComponents()`.

`TestBed.configureTestingModule()` 方法返回 `TestBed` 类，所以你可以链式调用其它 `TestBed` 中的静态方法，比如 `compileComponents()`。

In this example, the `BannerComponent` is the only component to compile.
Other examples configure the testing module with multiple components
and may import application modules that hold yet more components.
Any of them could be require external files.

在这个例子中，`BannerComponent` 是仅有的待编译组件。
其它例子中可能会使用多个组件来配置测试模块，并且可能引入某些具有其它组件的应用模块。
它们中的任何一个都可能需要外部文件。

The `TestBed.compileComponents` method asynchronously compiles all components configured in the testing module.

`TestBed.compileComponents` 方法会异步编译测试模块中配置过的所有组件。

<div class="alert is-important">

Do not re-configure the `TestBed` after calling `compileComponents()`.

在调用了 `compileComponents()` 之后就不能再重新配置 `TestBed` 了。

</div>

Calling `compileComponents()` closes the current `TestBed` instance to further configuration.
You cannot call any more `TestBed` configuration methods, not `configureTestingModule()`
nor any of the `override...` methods. The `TestBed` throws an error if you try.

调用 `compileComponents()` 会关闭当前的 `TestBed` 实例，不再允许进行配置。
你不能再调用任何 `TestBed` 中的配置方法，既不能调 `configureTestingModule()`，也不能调用任何 `override...` 方法。如果你试图这么做，`TestBed` 就会抛出错误。

Make `compileComponents()` the last step
before calling `TestBed.createComponent()`.

确保 `compileComponents()` 是调用 `TestBed.createComponent()` 之前的最后一步。

#### The synchronous _beforeEach_

#### 同步的 `beforeEach`

The second, synchronous `beforeEach()` contains the remaining setup steps,
which include creating the component and querying for elements to inspect.

第二个同步 `beforeEach()` 的例子包含剩下的准备步骤，
包括创建组件和查询那些要检查的元素。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="sync-before-each"
  header="app/banner/banner-external.component.spec.ts (synchronous beforeEach)"></code-example>

You can count on the test runner to wait for the first asynchronous `beforeEach` to finish before calling the second.

测试运行器（runner）会先等待第一个异步 `beforeEach` 函数执行完再调用第二个。

#### Consolidated setup

#### 整理过的准备代码

You can consolidate the two `beforeEach()` functions into a single, async `beforeEach()`.

你可以把这两个 `beforeEach()` 函数重整成一个异步的 `beforeEach()`。

The `compileComponents()` method returns a promise so you can perform the
synchronous setup tasks _after_ compilation by moving the synchronous code
into a `then(...)` callback.

`compileComponents()` 方法返回一个承诺，所以你可以通过把同步代码移到 `then(...)` 回调中，
以便在编译完成*之后* 执行那些同步准备任务。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="one-before-each"
  header="app/banner/banner-external.component.spec.ts (one beforeEach)"></code-example>

#### _compileComponents()_ is harmless

#### `compileComponents()` 是无害的

There's no harm in calling `compileComponents()` when it's not required.

在不需要 `compileComponents()` 的时候调用它也不会有害处。

The component test file generated by the CLI calls `compileComponents()`
even though it is never required when running `ng test`.

虽然在运行 `ng test` 时永远都不需要调用 `compileComponents()`，但 CLI 生成的组件测试文件还是会调用它。

The tests in this guide only call `compileComponents` when necessary.

但这篇指南中的这些测试只会在必要时才调用 `compileComponents`。

<hr>

{@a import-module}

### Setup with module imports

### 准备模块的 `imports`

Earlier component tests configured the testing module with a few `declarations` like this:

此前的组件测试程序使用了一些 `declarations` 来配置模块，就像这样：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="config-testbed"
  header="app/dashboard/dashboard-hero.component.spec.ts (configure TestBed)">
</code-example>

The `DashboardComponent` is simple. It needs no help.
But more complex components often depend on other components, directives, pipes, and providers
and these must be added to the testing module too.

`DashbaordComponent` 非常简单。它不需要帮助。
但是更加复杂的组件通常依赖其它组件、指令、管道和提供者，
所以这些必须也被添加到测试模块中。

Fortunately, the `TestBed.configureTestingModule` parameter parallels
the metadata passed to the `@NgModule` decorator
which means you can also specify `providers` and `imports`.

幸运的是，`TestBed.configureTestingModule` 参数与传入 `@NgModule` 装饰器的元数据一样，也就是所你也可以指定 `providers` 和 `imports`.

The `HeroDetailComponent` requires a lot of help despite its small size and simple construction.
In addition to the support it receives from the default testing module `CommonModule`, it needs:

虽然 `HeroDetailComponent` 很小，结构也很简单，但是它需要很多帮助。
  除了从默认测试模块 `CommonModule` 中获得的支持，它还需要：

- `NgModel` and friends in the `FormsModule` to enable two-way data binding.

   `FormsModule` 里的 `NgModel` 和其它，来进行双向数据绑定

- The `TitleCasePipe` from the `shared` folder.

   `shared` 目录里的 `TitleCasePipe`

- Router services (which these tests are stubbing).

   一些路由器服务（测试程序将 stub 伪造它们）

- Hero data access services (also stubbed).

   英雄数据访问服务（同样被 stub 伪造了）

One approach is to configure the testing module from the individual pieces as in this example:

一种方法是从各个部分配置测试模块，就像这样：

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="setup-forms-module"
  header="app/hero/hero-detail.component.spec.ts (FormsModule setup)"></code-example>

<div class="alert is-helpful">

Notice that the `beforeEach()` is asynchronous and calls `TestBed.compileComponents`
because the `HeroDetailComponent` has an external template and css file.

注意，`beforeEach()` 是异步的，它调用 `TestBed.compileComponents` 是因为 `HeroDetailComponent` 有外部模板和 CSS 文件。

As explained in [_Calling compileComponents()_](#compile-components) above,
these tests could be run in a non-CLI environment
where Angular would have to compile them in the browser.

如前面的[调用 `compileComponents()`](#compile-components) 中所解释的那样，这些测试可以运行在非 CLI 环境下，那里 Angular 并不会在浏览器中编译它们。

</div>

#### Import a shared module

#### 导入共享模块

Because many app components need the `FormsModule` and the `TitleCasePipe`, the developer created
a `SharedModule` to combine these and other frequently requested parts.

因为很多应用组件都需要 `FormsModule` 和 `TitleCasePipe`，所以开发者创建了 `SharedModule` 来把它们及其它常用的部分组合在一起。

The test configuration can use the `SharedModule` too as seen in this alternative setup:

这些测试配置也可以使用 `SharedModule`，如下所示：

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="setup-shared-module"
  header="app/hero/hero-detail.component.spec.ts (SharedModule setup)"></code-example>

It's a bit tighter and smaller, with fewer import statements (not shown).

它的导入声明少一些（未显示），稍微干净一些，小一些。

{@a feature-module-import}

#### Import a feature module

#### 导入特性模块

The `HeroDetailComponent` is part of the `HeroModule` [Feature Module](guide/feature-modules) that aggregates more of the interdependent pieces
including the `SharedModule`.
Try a test configuration that imports the `HeroModule` like this one:

`HeroDetailComponent` 是 `HeroModule` 这个[特性模块](guide/feature-modules)的一部分，它聚合了更多相互依赖的片段，包括 `SharedModule`。
试试下面这个导入了 `HeroModule` 的测试配置：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-hero-module" header="app/hero/hero-detail.component.spec.ts (HeroModule setup)"></code-example>

That's _really_ crisp. Only the _test doubles_ in the `providers` remain. Even the `HeroDetailComponent` declaration is gone.

这样特别清爽。只有 `providers` 里面的测试替身被保留。连 `HeroDetailComponent` 声明都消失了。

In fact, if you try to declare it, Angular will throw an error because
`HeroDetailComponent` is declared in both the `HeroModule` and the `DynamicTestModule`
created by the `TestBed`.

事实上，如果你试图声明它，Angular 就会抛出一个错误，因为 `HeroDetailComponent` 同时声明在了 `HeroModule` 和 `TestBed` 创建的 `DynamicTestModule` 中。

<div class="alert is-helpful">

Importing the component's feature module can be the easiest way to configure tests
when there are many mutual dependencies within the module and
the module is small, as feature modules tend to be.

如果模块中有很多共同依赖，并且该模块很小（这也是特性模块的应有形态），那么直接导入组件的特性模块可以成为配置这些测试的简易方式。

</div>

<hr>

{@a component-override}

### Override component providers

### 改写组件的服务提供者

The `HeroDetailComponent` provides its own `HeroDetailService`.

`HeroDetailComponent` 提供自己的 `HeroDetailService` 服务。

<code-example path="testing/src/app/hero/hero-detail.component.ts" region="prototype" header="app/hero/hero-detail.component.ts (prototype)"></code-example>

It's not possible to stub the component's `HeroDetailService` in the `providers` of the `TestBed.configureTestingModule`.
Those are providers for the _testing module_, not the component. They prepare the dependency injector at the _fixture level_.

在 `TestBed.configureTestingModule` 的 `providers` 中 stub 伪造组件的 `HeroDetailService` 是不可行的。
这些是**测试模块**的提供者，而非组件的。组件级别的供应商应该在**fixture 级别**准备的依赖注入器。

Angular creates the component with its _own_ injector, which is a _child_ of the fixture injector.
It registers the component's providers (the `HeroDetailService` in this case) with the child injector.

Angular 会使用自己的注入器来创建这些组件，这个注入器是夹具的注入器的子注入器。
它使用这个子注入器注册了该组件服务提供者（这里是 `HeroDetailService` ）。

A test cannot get to child injector services from the fixture injector.
And `TestBed.configureTestingModule` can't configure them either.

测试没办法从测试夹具的注入器中获取子注入器中的服务，而 `TestBed.configureTestingModule` 也没法配置它们。

Angular has been creating new instances of the real `HeroDetailService` all along!

Angular 始终都在创建真实 `HeroDetailService` 的实例。

<div class="alert is-helpful">

These tests could fail or timeout if the `HeroDetailService` made its own XHR calls to a remote server.
There might not be a remote server to call.

如果 `HeroDetailService` 向远程服务器发出自己的 XHR 请求，这些测试可能会失败或者超时。
这个远程服务器可能根本不存在。

Fortunately, the `HeroDetailService` delegates responsibility for remote data access to an injected `HeroService`.

幸运的是，`HeroDetailService` 将远程数据访问的责任交给了注入进来的 `HeroService`。

<code-example path="testing/src/app/hero/hero-detail.service.ts" region="prototype" header="app/hero/hero-detail.service.ts (prototype)"></code-example>

The [previous test configuration](#feature-module-import) replaces the real `HeroService` with a `TestHeroService`
that intercepts server requests and fakes their responses.

[前面的测试配置](#feature-module-import)使用 `TestHeroService` 替换了真实的 `HeroService`，它拦截了发往服务器的请求，并伪造了服务器的响应。

</div>

What if you aren't so lucky. What if faking the `HeroService` is hard?
What if `HeroDetailService` makes its own server requests?

如果你没有这么幸运怎么办？如果伪造 `HeroService` 很难怎么办？如果 `HeroDetailService` 自己发出服务器请求怎么办？

The `TestBed.overrideComponent` method can replace the component's `providers` with easy-to-manage _test doubles_
as seen in the following setup variation:

`TestBed.overrideComponent` 方法可以将组件的 `providers` 替换为容易管理的**测试替身**，参见下面的变体准备代码：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-override" header="app/hero/hero-detail.component.spec.ts (Override setup)"></code-example>

Notice that `TestBed.configureTestingModule` no longer provides a (fake) `HeroService` because it's [not needed](#spy-stub).

注意，`TestBed.configureTestingModule` 不再提供（伪造的）`HeroService`，因为[并不需要](#spy-stub)。

{@a override-component-method}

#### The _overrideComponent_ method

#### `overrideComponent` 方法

Focus on the `overrideComponent` method.

注意这个 `overrideComponent` 方法。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-component-method" header="app/hero/hero-detail.component.spec.ts (overrideComponent)"></code-example>

It takes two arguments: the component type to override (`HeroDetailComponent`) and an override metadata object.
The [override metadata object](#metadata-override-object) is a generic defined as follows:

它接受两个参数：要改写的组件类型（`HeroDetailComponent`），以及用于改写的元数据对象。
[用于改写的元数据对象](#metadata-override-object)是一个泛型，其定义如下：

<code-example language="javascript">
  type MetadataOverride&lt;T&gt; = {
    add?: Partial&lt;T&gt;;
    remove?: Partial&lt;T&gt;;
    set?: Partial&lt;T&gt;;
  };
</code-example>

A metadata override object can either add-and-remove elements in metadata properties or completely reset those properties.
This example resets the component's `providers` metadata.

元数据重载对象可以添加和删除元数据属性的项目，也可以彻底重设这些属性。
这个例子重新设置了组件的 `providers` 元数据。

The type parameter, `T`, is the kind of metadata you'd pass to the `@Component` decorator:

这个类型参数 `T` 就是你传给 `@Component` 装饰器的元数据：

<code-example language="javascript">
  selector?: string;
  template?: string;
  templateUrl?: string;
  providers?: any[];
  ...
</code-example>

{@a spy-stub}

#### Provide a _spy stub_ (_HeroDetailServiceSpy_)

#### 提供 ` 间谍桩 ` (`HeroDetailServiceSpy`)

This example completely replaces the component's `providers` array with a new array containing a `HeroDetailServiceSpy`.

这个例子把组件的 `providers` 数组完全替换成了一个包含 `HeroDetailServiceSpy` 的新数组。

The `HeroDetailServiceSpy` is a stubbed version of the real `HeroDetailService`
that fakes all necessary features of that service.
It neither injects nor delegates to the lower level `HeroService`
so there's no need to provide a test double for that.

`HeroDetailServiceSpy` 是实际 `HeroDetailService` 服务的桩版本，它伪造了该服务的所有必要特性。
但它既不需要注入也不会委托给低层的 `HeroService` 服务，因此不用为 `HeroService` 提供测试替身。

The related `HeroDetailComponent` tests will assert that methods of the `HeroDetailService`
were called by spying on the service methods.
Accordingly, the stub implements its methods as spies:

通过对该服务的方法进行刺探，`HeroDetailComponent` 的关联测试将会对 `HeroDetailService` 是否被调用过进行断言。
因此，这个桩类会把它的方法实现为刺探方法：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="hds-spy" header="app/hero/hero-detail.component.spec.ts (HeroDetailServiceSpy)"></code-example>

{@a override-tests}

#### The override tests

#### 改写测试

Now the tests can control the component's hero directly by manipulating the spy-stub's `testHero`
and confirm that service methods were called.

现在，测试程序可以通过操控这个 spy-stub 的 `testHero`，直接控制组件的英雄，并确认那个服务方法被调用过。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-tests" header="app/hero/hero-detail.component.spec.ts (override tests)"></code-example>

{@a more-overrides}

#### More overrides

#### 更多的改写

The `TestBed.overrideComponent` method can be called multiple times for the same or different components.
The `TestBed` offers similar `overrideDirective`, `overrideModule`, and `overridePipe` methods
for digging into and replacing parts of these other classes.

`TestBed.overrideComponent` 方法可以在相同或不同的组件中被反复调用。
`TestBed` 还提供了类似的 `overrideDirective`、`overrideModule` 和 `overridePipe` 方法，用来深入并重载这些其它类的部件。

Explore the options and combinations on your own.

自己探索这些选项和组合。

<hr>

{@a attribute-directive}

## Attribute Directive Testing

## 属性型指令的测试

An _attribute directive_ modifies the behavior of an element, component or another directive.
Its name reflects the way the directive is applied: as an attribute on a host element.

**属性型指令**修改元素、组件和其它指令的行为。正如它们的名字所示，它们是作为宿主元素的属性来被使用的。

The sample application's `HighlightDirective` sets the background color of an element
based on either a data bound color or a default color (lightgray).
It also sets a custom property of the element (`customProperty`) to `true`
for no reason other than to show that it can.

本例子应用的 `HighlightDirective` 使用数据绑定的颜色或者默认颜色来设置元素的背景色。
它同时设置元素的 `customProperty` 属性为 `true`，这里仅仅是为了显示它能这么做而已，并无其它原因。

<code-example path="testing/src/app/shared/highlight.directive.ts" header="app/shared/highlight.directive.ts"></code-example>

It's used throughout the application, perhaps most simply in the `AboutComponent`:

它的使用贯穿整个应用，也许最简单的使用在 `AboutComponent` 里：

<code-example path="testing/src/app/about/about.component.ts" header="app/about/about.component.ts"></code-example>

Testing the specific use of the `HighlightDirective` within the `AboutComponent` requires only the
techniques explored above (in particular the ["Shallow test"](#nested-component-tests) approach).

要想在 `AboutComponent` 中测试 `HighlightDirective` 的具体用法，只要使用在[“浅层测试”](#nested-component-tests)部分用过的技术即可。

<code-example path="testing/src/app/about/about.component.spec.ts" region="tests" header="app/about/about.component.spec.ts"></code-example>

However, testing a single use case is unlikely to explore the full range of a directive's capabilities.
Finding and testing all components that use the directive is tedious, brittle, and almost as unlikely to afford full coverage.

但是，测试单一的用例一般无法探索该指令的全部能力。
查找和测试所有使用该指令的组件非常繁琐和脆弱，并且通常无法覆盖所有组件。

_Class-only tests_ might be helpful,
but attribute directives like this one tend to manipulate the DOM.
Isolated unit tests don't touch the DOM and, therefore,
do not inspire confidence in the directive's efficacy.

*只针对类的测试*可能很有用，
但是像这个一样的属性型指令肯定要操纵 DOM。
隔离出的单元测试不能接触 DOM，因此也就没办法证明该指令的有效性。

A better solution is to create an artificial test component that demonstrates all ways to apply the directive.

更好的方法是创建一个能展示该指令所有用法的人造测试组件。

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="test-component" header="app/shared/highlight.directive.spec.ts (TestComponent)"></code-example>

<div class="lightbox">
  <img src='generated/images/guide/testing/highlight-directive-spec.png' alt="HighlightDirective spec in action">
</div>

<div class="alert is-helpful">

The `<input>` case binds the `HighlightDirective` to the name of a color value in the input box.
The initial value is the word "cyan" which should be the background color of the input box.

`<input>` 用例将 `HighlightDirective` 绑定到输入框里输入的颜色名字。
初始只是单词“cyan”，所以输入框的背景色应该是 cyan。

</div>

Here are some tests of this component:

下面是一些该组件的测试程序：

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="selected-tests" header="app/shared/highlight.directive.spec.ts (selected tests)"></code-example>

A few techniques are noteworthy:

一些技巧值得注意：

- The `By.directive` predicate is a great way to get the elements that have this directive _when their element types are unknown_.

   当**已知元素类型**时，`By.directive` 是一种获取拥有这个指令的元素的好方法。

- The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not">`:not` pseudo-class</a>
in `By.css('h2:not([highlight])')` helps find `<h2>` elements that _do not_ have the directive.
`By.css('*:not([highlight])')` finds _any_ element that does not have the directive.

   `By.css('h2:not([highlight])')` 里的<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not" target="_blank">`:not` 伪类（pseudo-class）</a>帮助查找**不带**该指令的 `<h2>` 元素。`By.css('*:not([highlight])')` 查找**所有**不带该指令的元素。

- `DebugElement.styles` affords access to element styles even in the absence of a real browser, thanks to the `DebugElement` abstraction.
But feel free to exploit the `nativeElement` when that seems easier or more clear than the abstraction.

   `DebugElement.styles` 甚至不用借助真实的浏览器也可以访问元素的样式，感谢 `DebugElement` 提供的这层抽象！
  但是如果直接使用 `nativeElement` 会比这层抽象更简单、更清晰，也可以放心大胆的使用它。

- Angular adds a directive to the injector of the element to which it is applied.
The test for the default color uses the injector of the second `<h2>` to get its `HighlightDirective` instance
and its `defaultColor`.

   Angular 将指令添加到它的元素的注入器中。默认颜色的测试程序使用第二个 `<h2>` 的注入器来获取它的 `HighlightDirective` 实例以及它的 `defaultColor`。

- `DebugElement.properties` affords access to the artificial custom property that is set by the directive.

   `DebugElement.properties` 让你可以访问由指令设置的自定义属性。

<hr>

## Pipe Testing

## 管道测试

Pipes are easy to test without the Angular testing utilities.

管道很容易测试，无需 Angular 测试工具。

A pipe class has one method, `transform`, that manipulates the input
value into a transformed output value.
The `transform` implementation rarely interacts with the DOM.
Most pipes have no dependence on Angular other than the `@Pipe`
metadata and an interface.

管道类有一个方法，`transform`，用来转换输入值到输出值。
`transform` 的实现很少与 DOM 交互。
除了 `@Pipe` 元数据和一个接口外，大部分管道不依赖 Angular。

Consider a `TitleCasePipe` that capitalizes the first letter of each word.
Here's a naive implementation with a regular expression.

假设 `TitleCasePipe` 将每个单词的第一个字母变成大写。
下面是使用正则表达式实现的简单代码：

<code-example path="testing/src/app/shared/title-case.pipe.ts" header="app/shared/title-case.pipe.ts"></code-example>

Anything that uses a regular expression is worth testing thoroughly.
Use simple Jasmine to explore the expected cases and the edge cases.

任何使用正则表达式的类都值得彻底的进行测试。
使用 Jasmine 来探索预期的用例和极端的用例。

<code-example path="testing/src/app/shared/title-case.pipe.spec.ts" region="excerpt" header="app/shared/title-case.pipe.spec.ts"></code-example>

{@a write-tests}

#### Write DOM tests too

#### 也能编写 DOM 测试

These are tests of the pipe _in isolation_.
They can't tell if the `TitleCasePipe` is working properly as applied in the application components.

有些管道的测试程序是**孤立的**。
它们不能验证 `TitleCasePipe` 是否在应用到组件上时是否工作正常。

Consider adding component tests such as this one:

考虑像这样添加组件测试程序：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe" header="app/hero/hero-detail.component.spec.ts (pipe test)"></code-example>

<hr>

{@a test-debugging}

## Test debugging

## 测试程序的调试

Debug specs in the browser in the same way that you debug an application.

在浏览器中，像调试应用一样调试测试程序 spec。

  1. Reveal the Karma browser window (hidden earlier).

     显示 `Karma` 的浏览器窗口（之前被隐藏了）。

  1. Click the **DEBUG** button; it opens a new browser tab and re-runs the tests.

     点击“DEBUG”按钮；它打开一页新浏览器标签并重新开始运行测试程序

  1. Open the browser's “Developer Tools” (`Ctrl-Shift-I` on Windows; `Command-Option-I` in macOS).

     打开浏览器的“Developer Tools”(Windows 上的 Ctrl-Shift-I 或者 macOS 上的 Command-Option-I)。

  1. Pick the "sources" section.

     选择“sources”页

  1. Open the `1st.spec.ts` test file (Control/Command-P, then start typing the name of the file).

     打开 `1st.spec.ts` 测试文件（Control/Command-P, 然后输入文件名字）。

  1. Set a breakpoint in the test.

     在测试程序中设置断点。

  1. Refresh the browser, and it stops at the breakpoint.

     刷新浏览器...然后它就会停在断点上。

<div class="lightbox">
  <img src='generated/images/guide/testing/karma-1st-spec-debug.png' alt="Karma debugging">
</div>

<hr>

{@a atu-apis}

## Testing Utility APIs

## 测试工具 API

This section takes inventory of the most useful Angular testing features and summarizes what they do.

本节将最有用的 Angular 测试功能提取出来，并总结了它们的作用。

The Angular testing utilities include the `TestBed`, the `ComponentFixture`, and a handful of functions that control the test environment.
The [_TestBed_](#testbed-api-summary) and [_ComponentFixture_](#component-fixture-api-summary) classes are covered separately.

Angular 的测试工具集包括 `TestBed`、`ComponentFixture` 和一些用来控制测试环境的便捷函数。
[`TestBed`](#testbed-api-summary) 和 [`ComponentFixture`](#component-fixture-api-summary) 部分单独讲过它们。

Here's a summary of the stand-alone functions, in order of likely utility:

下面是一些独立函数的总结，以使用频率排序：

<table>
  <tr>

    <th>

      Function

      函数

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>async</code>

    </td>

    <td>

      Runs the body of a test (`it`) or setup (`beforeEach`) function within a special _async test zone_.
      See [discussion above](#async).

      在一个特殊的* async 测试区域*中运行测试（`it`）的函数体或准备函数（`beforeEach`）。
      参见[前面的讨论](#async)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>fakeAsync</code>

    </td>

    <td>

      Runs the body of a test (`it`) within a special _fakeAsync test zone_, enabling
      a linear control flow coding style. See [discussion above](#fake-async).

      在一个特殊的* fakeAsync 测试区域*中运行测试（`it`）的函数体，以便启用线性风格的控制流。
      参见[前面的讨论](#fake-async)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>tick</code>

    </td>

    <td>

      Simulates the passage of time and the completion of pending asynchronous activities
      by flushing both _timer_ and _micro-task_ queues within the _fakeAsync test zone_.

      通过在* fakeAsync 测试区域*中刷新定时器和微任务（micro-task）队列来仿真时间的流逝以及异步活动的完成。

      <div class="alert is-helpful">

      The curious, dedicated reader might enjoy this lengthy blog post,
      ["_Tasks, microtasks, queues and schedules_"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/).

      好奇和执着的读者可能会喜欢这篇长博客：
      "<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/"
      target="_blank">_Tasks, microtasks, queues and schedules_</a>".

      </div>

      Accepts an optional argument that moves the virtual clock forward
      by the specified number of milliseconds,
      clearing asynchronous activities scheduled within that timeframe.
      See [discussion above](#tick).

      接受一个可选参数，它可以把虚拟时钟往前推进特定的微秒数。
      清除调度到那个时间帧中的异步活动。
      参见[前面的讨论](#tick)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

       <code>inject</code>

    </td>

    <td>

      Injects one or more services from the current `TestBed` injector into a test function.
      It cannot inject a service provided by the component itself.
      See discussion of the [debugElement.injector](#get-injected-services).

      从当前的 `TestBed` 注入器中把一个或多个服务注入到一个测试函数中。
      它不能用于注入组件自身提供的服务。
      参见 [`debugElement.injector`](#get-injected-services) 部分的讨论。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>discardPeriodicTasks</code>

    </td>

    <td>

      When a `fakeAsync()` test ends with pending timer event _tasks_ (queued `setTimeOut` and `setInterval` callbacks),
      the test fails with a clear error message.

      当 `fakeAsync` 测试程序以正在运行的计时器事件**任务**（排队中的 `setTimeOut` 和 `setInterval` 的回调）结束时，
      测试会失败，并显示一条明确的错误信息。

      In general, a test should end with no queued tasks.
      When pending timer tasks are expected, call `discardPeriodicTasks` to flush the _task_ queue
      and avoid the error.

      一般来讲，测试程序应该以无排队任务结束。
      当待执行计时器任务存在时，调用 `discardPeriodicTasks` 来触发**任务**队列，防止该错误发生。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>flushMicrotasks</code>

    </td>

    <td>

      When a `fakeAsync()` test ends with pending _micro-tasks_ such as unresolved promises,
      the test fails with a clear error message.

      当 `fakeAsync` 测试程序以待执行**微任务**（比如未解析的承诺）结束时，测试会失败并显示明确的错误信息。

      In general, a test should wait for micro-tasks to finish.
      When pending microtasks are expected, call `flushMicrotasks` to flush the  _micro-task_ queue
      and avoid the error.

      一般来说，测试应该等待微任务结束。
      当待执行微任务存在时，调用 `flushMicrotasks` 来触发**微任务**队列，防止该错误发生。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>ComponentFixtureAutoDetect</code>

    </td>

    <td>

      A provider token for a service that turns on [automatic change detection](#automatic-change-detection).

      一个服务提供者令牌，用于开启[自动变更检测](#automatic-change-detection)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>getTestBed</code>

    </td>

    <td>

      Gets the current instance of the `TestBed`.
      Usually unnecessary because the static class methods of the `TestBed` class are typically sufficient.
      The `TestBed` instance exposes a few rarely used members that are not available as
      static methods.

      获取当前 `TestBed` 实例。
      通常用不上，因为 `TestBed` 的静态类方法已经够用。
      `TestBed` 实例有一些很少需要用到的方法，它们没有对应的静态方法。

    </td>

  </tr>
</table>

<hr>

{@a testbed-class-summary}

#### _TestBed_ class summary

#### `TestBed` 类小结

The `TestBed` class is one of the principal Angular testing utilities.
Its API is quite large and can be overwhelming until you've explored it,
a little at a time. Read the early part of this guide first
to get the basics before trying to absorb the full API.

`TestBed` 类是 Angular 测试工具的主要类之一。它的 API 很庞大，可能有点过于复杂，直到你一点一点的探索它们。
阅读本章前面的部分，了解了基本的知识以后，再试着了解完整 API。

The module definition passed to `configureTestingModule`
is a subset of the `@NgModule` metadata properties.

传给 `configureTestingModule` 的模块定义是 `@NgModule` 元数据属性的子集。

<code-example language="javascript">
  type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array&lt;SchemaMetadata | any[]&gt;;
  };
</code-example>

{@a metadata-override-object}

Each override method takes a `MetadataOverride<T>` where `T` is the kind of metadata
appropriate to the method, that is, the parameter of an `@NgModule`,
`@Component`, `@Directive`, or `@Pipe`.

每一个重载方法接受一个 `MetadataOverride<T>`，这里 `T` 是适合这个方法的元数据类型，也就是 `@NgModule`、`@Component`、`@Directive` 或者 `@Pipe` 的参数。

<code-example language="javascript">
  type MetadataOverride&lt;T&gt; = {
    add?: Partial&lt;T&gt;;
    remove?: Partial&lt;T&gt;;
    set?: Partial&lt;T&gt;;
  };
</code-example>

{@a testbed-methods}

{@a testbed-api-summary}

The `TestBed` API consists of static class methods that either update or reference a _global_ instance of the `TestBed`.

`TestBed` 的 API 包含了一系列静态类方法，它们更新或者引用**全局**的 `TestBed` 实例。

Internally, all static methods cover methods of the current runtime `TestBed` instance,
which is also returned by the `getTestBed()` function.

在内部，所有静态方法在 `getTestBed()` 函数返回的当前运行时间的 `TestBed` 实例上都有对应的方法。

Call `TestBed` methods _within_ a `beforeEach()` to ensure a fresh start before each individual test.

在 `BeforeEach()` 内调用 `TestBed` 方法，以确保在运行每个单独测试时，都有崭新的开始。

Here are the most important static methods, in order of likely utility.

这里列出了最重要的静态方法，以使用频率排序：

<table>
  <tr>

    <th>

      Methods

      方法

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>configureTestingModule</code>

    </td>

    <td>

      The testing shims (`karma-test-shim`, `browser-test-shim`)
      establish the [initial test environment](guide/testing) and a default testing module.
      The default testing module is configured with basic declaratives and some Angular service substitutes that every tester needs.

      测试垫片（`karma-test-shim`, `browser-test-shim`）创建了[初始测试环境](guide/testing)和默认测试模块。
      默认测试模块是使用基本声明和一些 Angular 服务替代品，它们是所有测试程序都需要的。

      Call `configureTestingModule` to refine the testing module configuration for a particular set of tests
      by adding and removing imports, declarations (of components, directives, and pipes), and providers.

      调用 `configureTestingModule` 来为一套特定的测试定义测试模块配置，添加和删除导入、（组件、指令和管道的）声明和服务提供者。
    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>compileComponents</code>

    </td>

    <td>

      Compile the testing module asynchronously after you've finished configuring it.
      You **must** call this method if _any_ of the testing module components have a `templateUrl`
      or `styleUrls` because fetching component template and style files is necessarily asynchronous.
      See [above](#compile-components).

      在配置好测试模块之后，异步编译它。
      如果测试模块中的*任何一个*组件具有 `templateUrl` 或 `styleUrls`，那么你**必须**调用这个方法，因为获取组件的模板或样式文件必须是异步的。
      参见[前面的讨论](#compile-components)。

      After calling `compileComponents`, the `TestBed` configuration is frozen for the duration of the current spec.

      调用完 `compileComponents` 之后，`TestBed` 的配置就会在当前测试期间被冻结。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>createComponent<T></code>

    </td>

    <td>

      Create an instance of a component of type `T` based on the current `TestBed` configuration.
      After calling `compileComponent`, the `TestBed` configuration is frozen for the duration of the current spec.

      基于当前 `TestBed` 的配置创建一个类型为 T 的组件实例。
      一旦调用，`TestBed` 的配置就会在当前测试期间被冻结。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overrideModule</code>

    </td>

    <td>

      Replace metadata for the given `NgModule`. Recall that modules can import other modules.
      The `overrideModule` method can reach deeply into the current testing module to
      modify one of these inner modules.

      替换指定的 `NgModule` 的元数据。回想一下，模块可以导入其它模块。
      `overrideModule` 方法可以深入到当前测试模块深处，修改其中一个内部模块。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overrideComponent</code>

    </td>

    <td>

      Replace metadata for the given component class, which could be nested deeply
      within an inner module.

      替换指定组件类的元数据，该组件类可能嵌套在一个很深的内部模块中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overrideDirective</code>

    </td>

    <td>

      Replace metadata for the given directive class, which could be nested deeply
      within an inner module.

      替换指定指令类的元数据，该指令可能嵌套在一个很深的内部模块中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overridePipe</code>

    </td>

    <td>

      Replace metadata for the given pipe class, which could be nested deeply
      within an inner module.

      替换指定管道类的元数据，该管道可能嵌套在一个很深的内部模块中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      {@a testbed-inject}

      <code>inject</code>
    </td>

    <td>

      Retrieve a service from the current `TestBed` injector.

      从当前 `TestBed` 注入器获取一个服务。

      The `inject` function is often adequate for this purpose.
      But `inject` throws an error if it can't provide the service.

      `inject` 函数通常都能胜任这项工作，但是如果它没法提供该服务时就会抛出一个异常。

      What if the service is optional?

      如果该服务是可选的呢？

      The `TestBed.inject()` method takes an optional second parameter,
      the object to return if Angular can't find the provider
      (`null` in this example):

      `TestBed.inject()` 方法可以接受可选的第二参数，当 Angular 找不到指定的服务提供者时，就会返回该对象（下面这个例子中是 `null` ）：

      <code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="testbed-get-w-null" header="app/demo/demo.testbed.spec.ts"></code-example>

      After calling `TestBed.inject`, the `TestBed` configuration is frozen for the duration of the current spec.

      调用了 `TestBed.inject` 之后然后通过调用，`TestBed` 的配置就会在当前测试期间被冻结。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      {@a testbed-initTestEnvironment}

      <code>initTestEnvironment</code>

    </td>

    <td>

      Initialize the testing environment for the entire test run.

      为整套测试的运行初始化测试环境。

      The testing shims (`karma-test-shim`, `browser-test-shim`) call it for you
      so there is rarely a reason for you to call it yourself.

      测试垫片(`karma-test-shim`, `browser-test-shim`)会为你调用它，所以你很少需要自己调用它。

      You may call this method _exactly once_. If you must change
      this default in the middle of your test run, call `resetTestEnvironment` first.

      这个方法只能被调用**一次**。如果确实需要在测试程序运行期间改变这个默认设置，那么先调用 `resetTestEnvironment`。

      Specify the Angular compiler factory, a `PlatformRef`, and a default Angular testing module.
      Alternatives for non-browser platforms are available in the general form
      `@angular/platform-<platform_name>/testing/<platform_name>`.

      指定 Angular 编译器工厂，`PlatformRef`，和默认 Angular 测试模块。
      以 `@angular/platform-<platform_name>/testing/<platform_name>` 的形式提供非浏览器平台的替代品。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>resetTestEnvironment</code>

    </td>

    <td>

      Reset the initial test environment, including the default testing module.

      重设初始测试环境，包括默认测试模块在内。

    </td>

  </tr>
</table>

A few of the `TestBed` instance methods are not covered by static `TestBed` _class_ methods.
These are rarely needed.

少数 `TestBed` 实例方法没有对应的静态方法。它们很少被使用。

{@a component-fixture-api-summary}

#### The _ComponentFixture_

#### `ComponentFixture` 类

The `TestBed.createComponent<T>`
creates an instance of the component `T`
and returns a strongly typed `ComponentFixture` for that component.

`TestBed.createComponent<T>` 会创建一个组件 `T` 的实例，并为该组件返回一个强类型的 `ComponentFixture`。

The `ComponentFixture` properties and methods provide access to the component,
its DOM representation, and aspects of its Angular environment.

`ComponentFixture` 的属性和方法提供了对组件、它的 DOM 和它的 Angular 环境方面的访问。

{@a component-fixture-properties}

#### _ComponentFixture_ properties

#### `ComponentFixture` 的属性

Here are the most important properties for testers, in order of likely utility.

下面是对测试最重要的属性，以使用频率排序：

<table>
  <tr>

    <th>

      Properties

      属性

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>componentInstance</code>

    </td>

    <td>

      The instance of the component class created by `TestBed.createComponent`.

      被 `TestBed.createComponent` 创建的组件类实例。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>debugElement</code>

    </td>

    <td>

      The `DebugElement` associated with the root element of the component.

      与组件根元素关联的 `DebugElement`。

      The `debugElement` provides insight into the component and its DOM element during test and debugging.
      It's a critical property for testers. The most interesting members are covered [below](#debug-element-details).

      `debugElement` 提供了在测试和调试期间深入探查组件及其 DOM 元素的功能。
      它对于测试者是一个极其重要的属性。它的大多数主要成员在[后面](#debug-element-details)都有讲解。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>nativeElement</code>

    </td>

    <td>

      The native DOM element at the root of the component.

      组件的原生根 DOM 元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>changeDetectorRef</code>

    </td>

    <td>

      The `ChangeDetectorRef` for the component.

      组件的 `ChangeDetectorRef`。

      The `ChangeDetectorRef` is most valuable when testing a
      component that has the `ChangeDetectionStrategy.OnPush` method
      or the component's change detection is under your programmatic control.

      在测试一个拥有 `ChangeDetectionStrategy.OnPush` 的组件，或者在组件的变化测试在你的程序控制下时，`ChangeDetectorRef` 是最重要的。

    </td>

  </tr>
</table>

{@a component-fixture-methods}

#### _ComponentFixture_ methods

#### `ComponentFixture` 的方法

The _fixture_ methods cause Angular to perform certain tasks on the component tree.
Call these method to trigger Angular behavior in response to simulated user action.

**fixture** 方法使 Angular 对组件树执行某些任务。
在触发 Angular 行为来模拟的用户行为时，调用这些方法。

Here are the most useful methods for testers.

下面是对测试最有用的方法。

<table>
  <tr>

    <th>

      Methods

      方法

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>detectChanges</code>

    </td>

    <td>

      Trigger a change detection cycle for the component.

      为组件触发一轮变化检查。

      Call it to initialize the component (it calls `ngOnInit`) and after your
      test code, change the component's data bound property values.
      Angular can't see that you've changed `personComponent.name` and won't update the `name`
      binding until you call `detectChanges`.

      调用它来初始化组件（它调用 `ngOnInit`）。或者在你的测试代码改变了组件的数据绑定属性值后调用它。
      Angular 不能检测到你已经改变了 `personComponent.name` 属性，也不会更新 `name` 的绑定，直到你调用了 `detectChanges`。

      Runs `checkNoChanges` afterwards to confirm that there are no circular updates unless
      called as `detectChanges(false)`;

      之后，运行 `checkNoChanges`，来确认没有循环更新，除非它被这样调用：`detectChanges(false)`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>autoDetectChanges</code>

    </td>

    <td>

      Set this to `true` when you want the fixture to detect changes automatically.

      如果你希望这个夹具自动检测变更，就把这个设置为 `true`。

      When autodetect is `true`, the test fixture calls `detectChanges` immediately
      after creating the component. Then it listens for pertinent zone events
      and calls `detectChanges` accordingly.
      When your test code modifies component property values directly,
      you probably still have to call `fixture.detectChanges` to trigger data binding updates.

      当自动检测打开时，测试 fixture 监听 **zone** 事件，并调用 `detectChanges`。
      当你的测试代码直接修改了组件属性值时，你还是要调用 `fixture.detectChanges` 来触发数据绑定更新。

      The default is `false`. Testers who prefer fine control over test behavior
      tend to keep it `false`.

      默认值是 `false`，喜欢对测试行为进行精细控制的测试者一般保持它为 `false`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>checkNoChanges</code>

    </td>

    <td>

      Do a change detection run to make sure there are no pending changes.
      Throws an exceptions if there are.

      运行一次变更检测来确认没有待处理的变化。如果有未处理的变化，它将抛出一个错误。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>isStable</code>

    </td>

    <td>

      If the fixture is currently _stable_, returns `true`.
      If there are async tasks that have not completed, returns `false`.

      如果 fixture 当前是**稳定的**，则返回 `true`。
      如果有异步任务没有完成，则返回 `false`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>whenStable</code>

    </td>

    <td>

      Returns a promise that resolves when the fixture is stable.

      返回一个承诺，在 fixture 稳定时解析。

      To resume testing after completion of asynchronous activity or
      asynchronous change detection, hook that promise.
      See [above](#when-stable).

      要想在完成了异步活动或异步变更检测之后再继续测试，可以对那个承诺对象进行挂钩。
      参见 [前面](#when-stable)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>destroy</code>

    </td>

    <td>

      Trigger component destruction.

      触发组件的销毁。

    </td>

  </tr>
</table>

{@a debug-element-details}

#### _DebugElement_

The `DebugElement` provides crucial insights into the component's DOM representation.

`DebugElement` 提供了对组件的 DOM 的访问。

From the test root component's `DebugElement` returned by `fixture.debugElement`,
you can walk (and query) the fixture's entire element and component subtrees.

`fixture.debugElement` 返回测试根组件的 `DebugElement`，通过它你可以访问（查询）fixture 的整个元素和组件子树。

Here are the most useful `DebugElement` members for testers, in approximate order of utility:

下面是 `DebugElement` 最有用的成员，以使用频率排序。

<table>
  <tr>

    <th>

      Member

      成员

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>nativeElement</code>

    </td>

    <td>

      The corresponding DOM element in the browser (null for WebWorkers).

      与浏览器中 DOM 元素对应（WebWorkers 时，值为 null）。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>query</code>

    </td>

    <td>

      Calling `query(predicate: Predicate<DebugElement>)` returns the first `DebugElement`
      that matches the [predicate](#query-predicate) at any depth in the subtree.

      调用 `query(predicate: Predicate<DebugElement>)` 会在子树的任意深度中查找并返回能和[谓词函数](#query-predicate)匹配的第一个 `DebugElement`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>queryAll</code>

    </td>

    <td>

      Calling `queryAll(predicate: Predicate<DebugElement>)` returns all `DebugElements`
      that matches the [predicate](#query-predicate) at any depth in subtree.

      调用 `queryAll(predicate: Predicate<DebugElement>)` 会在子树的任意深度中查找能和[谓词函数](#query-predicate)匹配的所有 `DebugElement`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>injector</code>

    </td>

    <td>

      The host dependency injector.
      For example, the root element's component instance injector.

      宿主依赖注入器。
      比如，根元素的组件实例注入器。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>componentInstance</code>

    </td>

    <td>

      The element's own component instance, if it has one.

      元素自己的组件实例（如果有）。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>context</code>

    </td>

    <td>

      An object that provides parent context for this element.
      Often an ancestor component instance that governs this element.

      为元素提供父级上下文的对象。
      通常是控制该元素的祖级组件实例。

      When an element is repeated within `*ngFor`, the context is an `NgForRow` whose `$implicit`
      property is the value of the row instance value.
      For example, the `hero` in `*ngFor="let hero of heroes"`.

      当一个元素被 `*ngFor` 重复，它的上下文为 `NgForRow`，它的 `$implicit` 属性值是该行的实例值。
      比如，`*ngFor="let hero of heroes"` 里的 `hero`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>children</code>

    </td>

    <td>

      The immediate `DebugElement` children. Walk the tree by descending through `children`.

      `DebugElement` 的直接子元素。可以通过继续深入 `children` 来遍历这棵树。

      <div class="alert is-helpful">

      `DebugElement` also has `childNodes`, a list of `DebugNode` objects.
      `DebugElement` derives from `DebugNode` objects and there are often
      more nodes than elements. Testers can usually ignore plain nodes.

      `DebugElement` 还有 `childNodes`，即 `DebugNode` 对象列表。
      `DebugElement` 从 `DebugNode` 对象衍生，而且通常节点（node）比元素多。测试者通常忽略赤裸节点。

      </div>

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>parent</code>

    </td>

    <td>

      The `DebugElement` parent. Null if this is the root element.

      `DebugElement` 的父级。如果 `DebugElement` 是根元素，`parent` 为 null。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>name</code>

    </td>

    <td>

      The element tag name, if it is an element.

      元素的标签名字，如果它是一个元素的话。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>triggerEventHandler</code>

    </td>

    <td>

      Triggers the event by its name if there is a corresponding listener
      in the element's `listeners` collection.
      The second parameter is the _event object_ expected by the handler.
      See [above](#trigger-event-handler).

      如果在该元素的 `listeners` 集合中有相应的监听器，就根据名字触发这个事件。
      第二个参数是该处理器函数所需的*事件对象*。参见[前面](#trigger-event-handler)。

      If the event lacks a listener or there's some other problem,
      consider calling `nativeElement.dispatchEvent(eventObject)`.

      如果事件缺乏监听器，或者有其它问题，考虑调用 `nativeElement.dispatchEvent(eventObject)`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>listeners</code>

    </td>

    <td>

      The callbacks attached to the component's `@Output` properties and/or the element's event properties.

      元素的 `@Output` 属性以及/或者元素的事件属性所附带的回调函数。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>providerTokens</code>

    </td>

    <td>

      This component's injector lookup tokens.
      Includes the component itself plus the tokens that the component lists in its `providers` metadata.

      组件注入器的查询令牌。
      包括组件自己的令牌和组件的 `providers` 元数据中列出来的令牌。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>source</code>

    </td>

    <td>

      Where to find this element in the source component template.

      source 是在源组件模板中查询这个元素的处所。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>references</code>

    </td>

    <td>

      Dictionary of objects associated with template local variables (e.g. `#foo`),
      keyed by the local variable name.

      与模板本地变量（比如 `#foo`）关联的词典对象，关键字与本地变量名字配对。

    </td>

  </tr>
</table>

{@a query-predicate}

The `DebugElement.query(predicate)` and `DebugElement.queryAll(predicate)` methods take a
predicate that filters the source element's subtree for matching `DebugElement`.

`DebugElement.query(predicate)` 和 `DebugElement.queryAll(predicate)` 方法接受一个条件方法，
它过滤源元素的子树，返回匹配的 `DebugElement`。

The predicate is any method that takes a `DebugElement` and returns a _truthy_ value.
The following example finds all `DebugElements` with a reference to a template local variable named "content":

这个条件方法是任何接受一个 `DebugElement` 并返回真值的方法。
下面的例子查询所有拥有名为 `content` 的模块本地变量的所有 `DebugElement`：

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="custom-predicate" header="app/demo/demo.testbed.spec.ts"></code-example>

The Angular `By` class has three static methods for common predicates:

Angular 的 `By` 类为常用条件方法提供了三个静态方法：

- `By.all` - return all elements.

   `By.all` - 返回所有元素

- `By.css(selector)` - return elements with matching CSS selectors.

   `By.css(selector)` - 返回符合 CSS 选择器的元素。

- `By.directive(directive)` - return elements that Angular matched to an instance of the directive class.

   `By.directive(directive)` - 返回 Angular 能匹配一个指令类实例的所有元素。

<code-example path="testing/src/app/hero/hero-list.component.spec.ts" region="by" header="app/hero/hero-list.component.spec.ts"></code-example>

<hr>

{@a useful-tips}

## Useful tips

## 常见问题

{@a q-spec-file-location}

#### Place your spec file next to the file it tests

#### 为什么要把测试文件和被测文件放在一起？

It's a good idea to put unit test spec files in the same folder
as the application source code files that they test:

将单元测试的 spec 配置文件放到与应用程序源代码文件所在的同一个文件夹中是个好主意，因为：

- Such tests are easy to find.

   这样的测试程序很容易被找到

- You see at a glance if a part of your application lacks tests.

   你可以一眼看出应用程序的哪些部分缺乏测试程序。

- Nearby tests can reveal how a part works in context.

   临近的测试程序可以展示代码是如何在上下文中工作的

- When you move the source (inevitable), you remember to move the test.

   当你移动代码（无可避免）时，你记得一起移动测试程序

- When you rename the source file (inevitable), you remember to rename the test file.

   当你重命名源代码文件（无可避免），你记得重命名测试程序文件。

{@a q-specs-in-test-folder}

#### Place your spec files in a test folder

#### 把测试文件放进 `test` 文件夹中

Application integration specs can test the interactions of multiple parts
spread across folders and modules.
They don't really belong to any part in particular, so they don't have a
natural home next to any one file.

应用程序的集成测试 spec 文件可以测试横跨多个目录和模块的多个部分之间的互动。
它们不属于任何部分，自然也没有专门的地方存放它们。

It's often better to create an appropriate folder for them in the `tests` directory.

通常，在 `test` 目录中为它们创建一个合适的目录比较好。

Of course specs that test the test helpers belong in the `test` folder,
next to their corresponding helper files.

当然，**测试助手对象**的测试 spec 文件也属于 `test` 目录，与它们对应的助手文件相邻。

{@a q-kiss}

#### Keep it simple

#### 保持简单

[Component class testing](#component-class-testing) should be kept very clean and simple.
It should test only a single unit. On a first glance, you should be able to understand
what the test is testing. If it's doing more, then it doesn't belong here.

[组件类测试](#component-class-testing)应该保持非常干净和简单。它应该只测试一个单元。应该一眼就能了解测试的内容。如果还要做更多事，那它就不属于这里。

{@a q-end-to-end}

#### Use E2E (end-to-end) to test more than a single unit

#### 使用 E2E（端到端）来测试多个单元

E2E tests are great for high-level validation of the entire system.
But they can't give you the comprehensive test coverage that you'd expect from unit tests.

E2E 测试对于整个系统的高层验证非常好用。
但是它们没法给你像单元测试这样全面的测试覆盖率。

E2E tests are difficult to write and perform poorly compared to unit tests.
They break easily, often due to changes or misbehavior far removed from the site of breakage.

E2E 测试很难写，并且执行性能也赶不上单元测试。
它们很容易被破坏，而且经常是因为某些远离故障点的修改或不当行为而导致的。

E2E tests can't easily reveal how your components behave when things go wrong,
such as missing or bad data, lost connectivity, and remote service failures.

当出错时，E2E 测试不能轻松揭露你的组件出了什么问题，
比如丢失或错误的数据、网络失去连接或远端服务器挂了。

E2E tests for apps that update a database,
send an invoice, or charge a credit card require special tricks and back-doors to prevent
accidental corruption of remote resources.
It can even be hard to navigate to the component you want to test.

如果 E2E 的测试对象要更新数据库、发送发票或收取信用卡，就需要一些特殊的技巧和后门来防止远程资源被意外破坏。
它甚至可能都难以导航到你要测试的组件。

Because of these many obstacles, you should test DOM interaction
with unit testing techniques as much as possible.

由于存在这么多障碍，你应该尽可能使用单元测试技术来测试 DOM 交互。
