# Anatomy of the Setup Project

# 搭建项目环境

The documentation [setup](guide/setup) procedures install a _lot_ of files.
Most of them can be safely ignored.

在[搭建](guide/setup)本地开发环境的过程中会安装*很多*文件。它们大部分都可以被忽略掉。

Application files _inside the_ **`src/`** and **`e2e/`** folders matter most to developers.

对程序员来讲最重要的是在 *`src/`* 和 *`e2e/`* 文件夹*之内*的应用文件。

Files _outside_ those folders condition the development environment.
They rarely change and you may never view or modify them.
If you do, this page can help you understand their purpose.

在这两个文件夹*之外*的文件为开发环境设定条件。
这些文件很少会需要变动，你可能永远都不需要阅览或者修改它们。

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">

  <col width="10%">

  </col>

  <col width="90%">

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

      <code>src/app/</code>

    </td>

    <td>

      Angular application files go here.

      你的 Angular 应用文件。

      Ships with the "Hello Angular" sample's
      `AppComponent`, `AppModule`, a component unit test (`app.component.spec.ts`), and
      the bootstrap file, `main.ts`.

      "Hello Angular" 这个例子中有 `AppComponent`、`AppModule`、 一个组件单元测试 (`app.component.spec.ts`) 以及引导文件 `main.ts`。

      Try the <live-example name="setup">sample application</live-example>
      and the <live-example name="setup" stackblitz="quickstart-specs">unit test</live-example>
      as _live examples_.

      在live example中试试<live-example name="setup">范例程序</live-example>和<live-example name="setup" stackblitz="quickstart-specs">单元测试</live-example>

    </td>

  </tr>

  <tr>

    <td>

      <code>e2e/</code>

    </td>

    <td>

      _End-to-end_ (e2e) tests of the application,
      written in Jasmine and run by the
      <a href="http://www.protractortest.org/" title="Protractor: end-to-end testing for Angular">protractor</a>
      e2e test runner.

      应用的*端对端*(e2e)测试，用 Jasmine 写成并用 <a href="http://www.protractortest.org/" target="_blank" title="Protractor:Angular 的端对端测试">protractor</a> 端对端测试运行器测试。

      Initialized with an e2e test for the "Hello Angular" sample.

      初始化后，有个“Hello Angular” 的例子的端对端测试。

    </td>

  </tr>

  <tr>

    <td>

      <code>node_modules/</code>

    </td>

    <td>

      The _npm_ packages installed with the `npm install` command.

      用 `npm install` 命令安装的 *npm* 包。

    </td>

  </tr>

  <tr>

    <td>

      <code>.editorconfig<br>
.git/<br>
.gitignore<br>
.travis.yml</code>

    </td>

    <td>

      Tooling configuration files and folders.
      Ignore them until you have a compelling reason to do otherwise.

      配置文件和文件夹的工具。
      除非你有足够的理由，否则别动它。

    </td>

  </tr>

  <tr>

    <td>

      <code>CHANGELOG.md</code>

    </td>

    <td>

      The history of changes to the _QuickStart_ repository.
      Delete or ignore.

      *快速上手*库的更新历史。
      删除或忽略。

    </td>

  </tr>

  <tr>

    <td>

      <code>favicon.ico</code>

    </td>

    <td>

      The application icon that appears in the browser tab.

      出现在浏览器标签上的应用图标。

    </td>

  </tr>

  <tr>

    <td>

      <code>index.html</code>

    </td>

    <td>

      The application host page.
      It loads a few essential scripts in a prescribed order.
      Then it boots the application, placing the root `AppComponent`
      in the custom `<my-app>` body tag.

      应用的宿主页面。
      它以特定的顺序加载一些基本脚本。
      然后它启动应用，将根`AppComponent`放置到自定义`<my-app>`标签里。

      The same `index.html` satisfies all documentation application samples.

      同一个 `index.html`满足所有文档应用例子。

    </td>

  </tr>

  <tr>

    <td>

      <code>karma.conf.js</code>

    </td>

    <td>

      Configuration for the <a href="https://karma-runner.github.io/1.0/index.html" title="Karma unit test runner">karma</a>
      test runner described in the [Testing](guide/testing) guide.

      在[测试](guide/testing)指南中提到的 <a href="https://karma-runner.github.io/1.0/index.html" target="_blank" title="Karma测试运行器">karma</a> 测试运行器的配置。

    </td>

  </tr>

  <tr>

    <td>

      <code>karma-test-shim.js</code>

    </td>

    <td>

      Script to run <a href="https://karma-runner.github.io/1.0/index.html" title="Karma unit test runner">karma</a>
      with SystemJS as described in the [Testing](guide/testing) guide.

      在[测试](guide/testing)指南中提到的 <a href="https://karma-runner.github.io/1.0/index.html" target="_blank" title="Karma测试运行器">karma</a> 测试运行器的脚本。

    </td>

  </tr>

  <tr>

    <td>

      <code>non-essential-files.txt</code>

    </td>

    <td>

      A list of files that you can delete if you want to purge your setup of the
      original QuickStart Seed testing and git maintenance artifacts.
      See instructions in the optional
      [_Deleting non-essential files_](guide/setup#non-essential "Setup: Deleting non-essential files") section.
      *Do this only in the beginning to avoid accidentally deleting your own tests and git setup!*

      这个列表中的文件在清理时可以删除，它是原始的“快速上手”种子工程中的测试和git维护文件。
      步骤参见可选的[删除非必要文件](guide/setup#non-essential "Setup: Deleting non-essential files")部分。
      *只在最初做这件事，以免不小心删除了你自己的测试文件和git配置！*

    </td>

  </tr>

  <tr>

    <td>

      <code>LICENSE</code>

    </td>

    <td>

      The open source MIT license to use this setup code in your application.

      应用的搭建代码中用到的开源 MIT 许可证。

    </td>

  </tr>

  <tr>

    <td>

      <code>package.json</code>

    </td>

    <td>

      Identifies `npm `package dependencies for the project.

      为项目指定`npm`依赖包。

      Contains command scripts for running the application,
      running tests, and more. Enter `npm run` for a listing.
      <a href="https://github.com/angular/quickstart/blob/master/README.md#npm-scripts"
         title="npm scripts for Angular documentation samples">Read more</a> about them.

      包含了一些命令脚本，用来运行应用、运行测试与其他。输入`npm run`来查看命令列表。
      到<a href="https://github.com/angular/quickstart/blob/master/README.md#npm-scripts" 
         target="_blank" title="Angular 文档例子的 npm 脚本">这里</a>阅读更多关于它们的说明。

    </td>

  </tr>

  <tr>

    <td>

      <code>protractor.config.js</code>

    </td>

    <td>

      Configuration for the
      <a href="http://www.protractortest.org/" title="Protractor: end-to-end testing for Angular">protractor</a>
      _end-to-end_ (e2e) test runner.

      <a href="http://www.protractortest.org/" target="_blank" title="Protractor: Angular 的端对端测试">protractor</a> *端对端* (e2e) 测试器运行器的配置。

    </td>

  </tr>

  <tr>

    <td>

      <code>README.md</code>

    </td>

    <td>

      Instruction for using this git repository in your project.
      Worth reading before deleting.

      项目中使用这个 git 库的说明。
      在删除前值得阅读。

    </td>

  </tr>

  <tr>

    <td>

      <code>styles.css</code>

    </td>

    <td>

      Global styles for the application. Initialized with an `<h1>` style for the QuickStart demo.

      应用的全局样式。初始化后，有个为《快速上手》演示准备的`<h1>`样式。

    </td>

  </tr>

  <tr>

    <td>

      <code>systemjs<br>.config.js</code>

    </td>

    <td>

      Tells the **SystemJS** module loader where to find modules
      referenced in JavaScript `import` statements. For example:

      为 **SystemJS** 模块加载器指定去哪儿查找在 JavaScript 的`import`语句中引用的模块。例如：

      <code-example language="ts">

        import { Component } from '@angular/core;

      </code-example>

      Don't touch this file unless you are fully versed in SystemJS configuration.

      除非你完全理解 SystemJS 的配置，不要修改它。

    </td>

  </tr>

  <tr>

    <td>

      <code>systemjs<br>.config.extras.js</code>

    </td>

    <td>

      Optional extra SystemJS configuration.
      A way to add SystemJS mappings, such as for application _barrels_,
      without changing the original `system.config.js`.

      可选的额外 SystemJS 配置。
      是添加 SystemJS 映射的途径，例如在无需修改原始`systemjs.config.js`的情况下为应用映射*封装桶*。

    </td>

  </tr>

  <tr>

    <td>

      <code>tsconfig.json</code>

    </td>

    <td>

      Tells the TypeScript compiler how to transpile TypeScript source files
      into JavaScript files that run in all modern browsers.

      为 TypeScript 编译器指定如何将 TypeScript 代码转换为 JavaScript 文件，用来在所有现代浏览器中运行。

    </td>

  </tr>

  <tr>

    <td>

      <code>tslint.json</code>

    </td>

    <td>

      The `npm` installed TypeScript linter inspects your TypeScript code
      and complains when you violate one of its rules.

      利用`npm`安装的 TypeScript 语法检查器 (linter) 检测 TypeScript 代码并在你违反它的规则时提示你。

      This file defines linting rules favored by the
      [Angular style guide](guide/styleguide) and by the authors of the documentation.

      该文件定义了 [Angular 风格指南](guide/styleguide)与本文档站作者喜爱的语法检查规则。

    </td>

  </tr>

</table>
