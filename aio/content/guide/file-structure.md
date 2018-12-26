# Workspace and project file structure

# 工作空间与项目文件的结构

You develop apps in the context of an Angular [workspace](guide/glossary#workspace). A workspace contains the files for one or more [projects](guide/glossary#project). A project is the set of files that comprise a standalone app, a library, or a set of end-to-end (e2e) tests. 

你要在 Angular [工作空间](guide/glossary#workspace)的上下文环境中开发应用。每个工作空间中包括一个或多个[项目](guide/glossary#project)的文件。每个项目是一组文件，由标准应用、库或一组端到端（e2e）测试组成。

The Angular CLI command `ng new <project_name>` gets you started. 
When you run this command, the CLI installs the necessary Angular npm packages and other dependencies in a new workspace, with a root folder named *project_name*. 
It also creates the following workspace and starter project files:

Angular CLI 命令 `ng new <project_name>` 可以帮你开始项目。
当你运行该命令时，CLI 会在新建的工作空间（以 *project_name* 为根目录）中，安装必要的 Angular npm 包和其它依赖。
它还会创建如下的工作空间和最初的项目文件：

* An initial skeleton app project, also called *project_name* (in the `src/` subfolder).

  一个初始的骨架应用项目，也叫 *project_name*（位于 `src/` 子目录下）。

* An end-to-end test project (in the `e2e/` subfolder).

  一个端到端测试项目（位于 `e2e/` 子目录下）。

* Related configuration files.

  相关配置文件。

The initial app project contains a simple Welcome app, ready to run. 

初始的应用项目包含一个简单的 Welcome 应用，随时可以运行。

## Workspace files

## 工作空间文件

The top level of the workspace contains a number of workspace-wide configuration files.

工作空间的顶级包含一系列工作空间级的配置文件。

| <t>WORKSPACE CONFIG FILES</t><t>工作空间配置文件</t>    | <t>PURPOSE</t><t>用途</t> |
| :--------------------- | :------------------------------------------|
| `.editorconfig`         | <t>Configuration for code editors. See [EditorConfig](https://editorconfig.org/). </t><t>代码编辑器配置。参见 [EditorConfig](https://editorconfig.org/)</t> |
| `.gitignore`            | <t>Specifies intentionally untracked files that [Git](https://git-scm.com/) should ignore. </t><t>指定 [Git](https://git-scm.com/) 要忽略的非跟踪的文件。</t> |
| `angular.json`         | <t>CLI configuration for all projects in the workspace, including configuration options for build, serve, and test tools that the CLI uses, such as [Karma](https://karma-runner.github.io/) and [Protractor](http://www.protractortest.org/).  </t><t>工作区中所有项目的 CLI 配置，包括 CLI 使用的构建选项、运行选项、测试工具选项（比如 [Karma](https://karma-runner.github.io/)、[Protractor](http://www.protractortest.org/)）等</t> |
| `node_modules`          | <t>Provides [npm packages](guide/npm-packages) to the entire workspace. </t><t>提供给整个工作空间的 [npm 包](guide/npm-packages)。</t> |
| `package.json`         | <t>Lists package dependencies. See [npm documentation](https://docs.npmjs.com/files/package.json) for the specific format and contents of this file.</t><t>列出包依赖项。有关此文件的特有格式和内容，参见 [npm 文档](https://docs.npmjs.com/files/package.json)。</t> |
| `tsconfig.app.json`    | <t>Default [TypeScript](https://www.typescriptlang.org/) configuration for apps in the workspace. </t><t>工作空间中所有应用的默认 [TypeScript](https://www.typescriptlang.org/) 配置。</t> |
| `tsconfig.spec.json`   | <t>Default TypeScript configuration for e2e test apps in the workspace. </t><t>工作空间中所有端到端测试类应用的默认 TypeScript 配置。</t> |
| `tslint.json`          | <t>Default [TSLint](https://palantir.github.io/tslint/) configuration for apps in the workspace. </t><t>工作空间中所有应用的默认 [TSLint](https://palantir.github.io/tslint/) 配置。</t> |
| `README.md`             | <t>Introductory documentation. </t><t>介绍文档</t> |
| `package-lock.json`     | <t>Provides version information for all packages installed into `node_modules` by the npm client. See [npm documentation](https://docs.npmjs.com/files/package-lock.json) for details. If you use the yarn client, this file will be [yarn.lock](https://yarnpkg.com/lang/en/docs/yarn-lock/) instead. </t><t>为 npm 客户端安装到 `node_modules` 中的所有软件包提供版本信息。详情参见 [npm documentation](https://docs.npmjs.com/files/package-lock.json)。如果你使用 yarn 客户端，此文件会由 [yarn.lock](https://yarnpkg.com/lang/en/docs/yarn-lock/) 代替。</t> |

All projects within a workspace share this configuration context. 
Project-specific [TypeScript](https://www.typescriptlang.org/) configuration files inherit from the workspace-wide `tsconfig.*.json`, and app-specific [TSLint](https://palantir.github.io/tslint/) configuration files inherit from the workspace-wide `tslint.json`.

工作空间中的所有项目都共享这个配置上下文。
每个项目自己的 [TypeScript](https://www.typescriptlang.org/) 配置文件继承自工作空间级的 `tsconfig.*.json`，而每个项目自己的 [TSLint](https://palantir.github.io/tslint/) 配置文件也继承自工作空间级的 `tslint.json`。

### Default app project files

### 默认应用工程文件

The CLI command `ng new my-app` creates a workspace folder named "my-app" and generates a new app skeleton. 
This initial app is the *default app* for CLI commands (unless you change the default after creating additional apps). 

CLI 命令 `ng new my-app` 创建了一个名叫 "my-app" 的工作空间目录，并生成了一个新应用的骨架。
这个初始应用是 CLI 命令的*默认应用*（除非你在创建了其它应用之后修改了默认应用）。

A newly generated app contains the source files for a root module, with a root component and template. 
When the workspace file structure is in place, you can use the `ng generate` command on the command line to add functionality and data to the initial app.

新生成的应用包含根模块和一个根组件及其模板的代码。
当工作空间的文件结构就绪之后，你可以在命令行上运行 `ng generate` 命令，来给这个初始应用添加功能和数据。

<div class="alert is-helpful>

除了在命令行上使用 CLI 之外，你还可以使用像 <a href="https://angularconsole.com" target="_blank">Angular Console</a> 这样的交互开发环境，或者直接操纵应用的源码目录中的源码文件和配置文件。

</div>

The `src/` subfolder contains the source files (app logic, data, and assets), along with configuration files for the initial app.
Workspace-wide `node_modules` dependencies are visible to this project.

`src/` 子目录包含该初始应用的源文件（应用逻辑、数据和资源）以及配置文件。
工作空间级的 `node_modules` 依赖，对于这个项目也是可见的。

| <t>APP SOURCE & CONFIG FILES</t><t>应用源码与配置文件</t>    | <t>PURPOSE</t><t>用途</t> |
| :--------------------- | :------------------------------------------|
| `app/`                  | <t>Contains the component files in which your app logic and data are defined. See details in [App source folder](#app-src) below. </t><t>包含组件文件，其中定义了应用逻辑和数据。详情参见稍后的[应用源码目录](#app-src)。</t> |
| `assets/`               | <t>Contains image files and other asset files to be copied as-is when you build your application. </t><t>包含图像文件和其它文件，当构建应用时会被原样赋值到构建目标中。</t> |
| `environments/`         | <t>Contains build configuration options for particular target environments. By default there is an unnamed standard development environment and a production ("prod") environment. You can define additional target environment configurations. </t><t>包含针对特定目标环境的配置选项。默认情况下有一个未命名的标准开发环境和一个名叫 "prod" 的产品环境。你可以定义一些额外的目标环境配置。</t> |
| `browserlist`           | <t>Configures sharing of target browsers and Node.js versions among various front-end tools. See [Browserlist on GitHub](https://github.com/browserslist/browserslist) for more information.  </t><t>配置各个目标浏览器和 Node.js 版本之间的市场占有率，供各种前端工具使用。详情参见 [GitHub 上的 Browserlist](https://github.com/browserslist/browserslist)。</t> |
| `favicon.ico`           | <t>An icon to use for this app in the bookmark bar. </t><t>一个用在书签栏上的应用图标。</t> |
| `index.html`            | <t>The main HTML page that is served when someone visits your site. The CLI automatically adds all JavaScript and CSS files when building your app, so you typically don't need to add any `<script>` or` <link>` tags here manually. </t><t>当有人访问你的应用时给出的主 HTML 文件，你通常不用手动在这里添加任何 `<script>` 或` <link>` 标签。</t> |
| `main.ts`               | <t>The main entry point for your app. Compiles the application with the [JIT compiler](https://angular.io/guide/glossary#jit) and bootstraps the application's root module (AppModule) to run in the browser. You can also use the [AOT compiler](https://angular.io/guide/aot-compiler) without changing any code by appending the `--aot` flag to the CLI `build` and `serve` commands. </t><t>应用的主入口点。使用 [JIT 编译器](https://angular.cn/guide/glossary#jit)编译应用，并引导应用的根模块 AppModule 来运行在浏览器中。你也可以为 CLI 的 `build` 和 `serve` 命令添加 `--aot` 标志，来使用 [AOT 编译器](https://angular.cn/guide/aot-compiler) 而不必修改任何代码。</t> |
| `polyfills.ts`          | <t>Provides polyfill scripts for browser support. </t><t>为浏览器支持提供腻子脚本（polyfill）。</t> |
| `styles.sass`           | <t>Lists CSS files that supply styles for a project. The extension reflects the style preprocessor you have configured for the project. </t><t>列出为项目提供样式的 CSS 文件。其扩展名和你为项目配置的样式预处理器保持一致。</t> |
| `test.ts`               | <t>The main entry point for your unit tests, with some Angular-specific configuration. You don't typically need to edit this file. </t><t>单元测试的主入口点，其中带有一些特定于 Angular 的配置。一般来说你不必编辑这个问题。</t> |
| `tsconfig.app.json`    | <t>Inherits from the workspace-wide `tsconfig.json` file. </t><t>继承自工作空间级的 `tsconfig.json` 文件。</t> |
| `tsconfig.spec.json`   | <t>Inherits from the workspace-wide `tsconfig.json` file. </t><t>继承自工作空间级的 `tsconfig.json` 文件。</t> |
| `tslint.json`          | <t>Inherits from the workspace-wide `tslint.json` file. </t><t>继承自工作空间级的 `tsconfig.json` 文件。</t> |

### Default app project e2e files

### 默认应用项目的 e2e 测试文件

An `e2e/` subfolder contains configuration and source files for a set of end-to-end tests that correspond to the initial app.
Workspace-wide `node_modules` dependencies are visible to this project.

`e2e/` 子目录包含一组初始应用所对应的端到端测试的配置文件和源文件。

<code-example language="none" linenums="false">
my-app/
  e2e/                  (end-to-end test app for my-app)
    src/                (app source files)
    protractor.conf.js  (test-tool config)
    tsconfig.e2e.json   (TypeScript config inherits from workspace tsconfig.json)
</code-example>

### Project folders for additional apps and libraries

### 其它应用和库的项目目录

When you generate new projects in a workspace, 
the CLI creates a new *workspace*`/projects` folder, and adds the generated files there.

当你在工作空间中生成新项目时，CLI 会在*工作空间*目录下创建一个新的 `/projects` 目录，并把生成的文件添加到那里。

When you generate an app (`ng generate application my-other-app`), the CLI adds folders under `projects/` for both the app and its corresponding end-to-end tests. Newly generated libraries are also added under `projects/`.

当你生成应用时（`ng generate application my-other-app`），CLI 会在 `/projects` 下创建应用及其端到端测试的目录。新生成的库也同样会放在 `/projects` 目录下。

<code-example language="none" linenums="false">
my-app/
  ...
  projects/           (additional apps and libs)
    my-other-app/     (a second app)
      src/
      (config files)
    my-other-app-e2e/  (corresponding test app) 
      src/
      (config files)
    my-lib/            (a generated library)
      (config files)
</code-example>

{@a app-src}
## App source folder

## 应用源码目录

Inside the `src/` folder, the `app/` folder contains your app's logic and data. Angular components, templates, and styles go here. An `assets/` subfolder contains images and anything else your app needs. Files at the top level of `src/` support testing and running your app.

在 `src/` 目录下，`app/` 目录包含你的应用逻辑和数据。Angular 组件、模板和样式都在这里。
`assets/` 子目录包含图片和应用所需的其它文件。`src/` 顶层的文件用于支持测试和运行你的应用。

<code-example language="none" linenums="false">
   src/
    app/
        app.component.css
        app.component.html
        app.component.spec.ts
        app.component.ts
        app.module.ts
        assets/...
    ...
</code-example>

| <t>APP SOURCE FILES</t><t>应用源文件</t> | <t>PURPOSE</t><t>用途</t> |
| :-------------------------- | :------------------------------------------|
| `app/app.component.ts`       | <t>Defines the logic for the app's root component, named `AppComponent`. The view associated with this root component becomes the root of the [view hierarchy](guide/glossary#view-hierarchy) as you add components and services to your app. </t><t>定义应用程序根组件（名叫 `AppComponent`）的逻辑代码。当你往应用中添加组件和服务时，根组件所关联的视图会作为 [view hierarchy](guide/glossary#view-hierarchy) 视图树的根。</t> |
| `app/app.component.html`     | <t>Defines the HTML template associated with the root `AppComponent`. </t><t>定义与根组件 `AppComponent` 关联的模板。</t> |
| `app/app.component.css`      | <t>Defines the base CSS stylesheet for the root `AppComponent`. </t><t>定义根组件 `AppComponent` 的 CSS 样式表。</t> |
| `app/app.component.spec.ts`  | <t>Defines a unit test for the root `AppComponent`. </t><t>定义根组件 `AppComponent` 的单元测试文件。</t> |
| `app/app.module.ts`          | <t>Defines the root module, named `AppModule`, that tells Angular how to assemble the application. Initially declares only the `AppComponent`. As you add more components to the app, they must be declared here. </t><t>定义根模块（名叫 `AppModule`），它告诉 Angular 如何组装应用。其初始声明中只有 `AppComponent`。当你往应用中添加更多组件时，它们必须声明在这里。</t> |
| `assets/*`                   | <t>Contains image files and other asset files to be copied as-is when you build your application. </t><t>包含图片文件和其它资源，当构建应用时，它们将被原样复制到目标目录中。</t> |
