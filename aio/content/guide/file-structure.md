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

| WORKSPACE CONFIG FILES | PURPOSE |
| :--------------------- | :------------------------------------------|
| 工作空间配置文件 | 用途 |
| `.editorconfig` | Configuration for code editors. See [EditorConfig](https://editorconfig.org/).  |
| `.editorconfig` | 代码编辑器配置。参见 [EditorConfig](https://editorconfig.org/) |
| `.gitignore` | Specifies intentionally untracked files that [Git](https://git-scm.com/) should ignore.  |
| `.gitignore` | 指定 [Git](https://git-scm.com/) 要忽略的非跟踪的文件。 |
| `angular.json` | CLI configuration defaults for all projects in the workspace, including configuration options for build, serve, and test tools that the CLI uses, such as [TSLint](https://palantir.github.io/tslint/), [Karma](https://karma-runner.github.io/), and [Protractor](http://www.protractortest.org/). For details, see [Angular Workspace Configuration](guide/workspace-config).  |
| `angular.json` | 工作区中所有项目的默认 CLI 配置，包括 CLI 使用的构建选项、运行选项、测试工具选项（比如 [TSLint](https://palantir.github.io/tslint/)、[Karma](https://karma-runner.github.io/)、[Protractor](http://www.protractortest.org/)）等。欲知详情，参见 [Angular 工作空间配置](guide/workspace-config)。 |
| `node_modules` | Provides [npm packages](guide/npm-packages) to the entire workspace.  |
| `node_modules` | 提供给整个工作空间的 [npm 包](guide/npm-packages)。 |
| `package.json` | Configures [npm package dependencies](guide/npm-packages) that are available to all projects in the workspace. See [npm documentation](https://docs.npmjs.com/files/package.json) for the specific format and contents of this file. |
| `package.json` | 配置用于工作空间中所有项目的包依赖项。有关此文件的特有格式和内容，参见 [npm 文档](https://docs.npmjs.com/files/package.json)。 |
| `package-lock.json` | Provides version information for all packages installed into `node_modules` by the npm client. See [npm documentation](https://docs.npmjs.com/files/package-lock.json) for details. If you use the yarn client, this file will be [yarn.lock](https://yarnpkg.com/lang/en/docs/yarn-lock/) instead.  |
| `package-lock.json` | 为 npm 客户端安装到 `node_modules` 中的所有软件包提供版本信息。详情参见 [npm documentation](https://docs.npmjs.com/files/package-lock.json)。如果你使用 yarn 客户端，此文件会由 [yarn.lock](https://yarnpkg.com/lang/en/docs/yarn-lock/) 代替。 |
| `tsconfig.json` | Default [TypeScript](https://www.typescriptlang.org/) configuration for apps in the workspace, including TypeScript and Angular template compiler options. See [TypeScript Configuration](guide/typescript-configuration).  |
| `tsconfig.json` | 工作空间中所有应用的默认 [TypeScript](https://www.typescriptlang.org/) 配置。包括 TypeScript 选项和 Angular 模板编译器选项。参见 [TypeScript 配置](guide/typescript-configuration)。 |
| `tslint.json` | Default [TSLint](https://palantir.github.io/tslint/) configuration for apps in the workspace.  |
| `tslint.json` | 工作空间中所有应用的默认 [TSLint](https://palantir.github.io/tslint/) 配置。 |
| `README.md` | Introductory documentation.  |
| `README.md` | 介绍文档 |

All projects within a workspace share a [CLI configuration context](guide/workspace-config). 
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

<div class="alert is-helpful">

Besides using the CLI on the command line, you can also use an interactive development environment like [Angular Console](https://angularconsole.com/), or manipulate files directly in the app's source folder and configuration files.

除了在命令行上使用 CLI 之外，你还可以使用像 [Angular Console](https://angularconsole.com/) 这样的交互开发环境，或者直接操纵应用的源码目录中的源码文件和配置文件。

</div>

The `src/` subfolder contains the source files (app logic, data, and assets), along with configuration files for the initial app.
Workspace-wide `node_modules` dependencies are visible to this project.

`src/` 子目录包含该初始应用的源文件（应用逻辑、数据和资源）以及配置文件。
工作空间级的 `node_modules` 依赖，对于这个项目也是可见的。

| APP SOURCE & CONFIG FILES | PURPOSE |
| :--------------------- | :------------------------------------------|
| 应用源码与配置文件 | 用途 |
| `app/` | Contains the component files in which your app logic and data are defined. See details in [App source folder](#app-src) below.  |
| `app/` | 包含组件文件，其中定义了应用逻辑和数据。详情参见稍后的[应用源码目录](#app-src)。 |
| `assets/` | Contains image files and other asset files to be copied as-is when you build your application.  |
| `assets/` | 包含图像文件和其它文件，当构建应用时会被原样复制到构建目标中。 |
| `environments/` | Contains build configuration options for particular target environments. By default there is an unnamed standard development environment and a production ("prod") environment. You can define additional target environment configurations.  |
| `environments/` | 包含针对特定目标环境的配置选项。默认情况下有一个未命名的标准开发环境和一个名叫 "prod" 的产品环境。你可以定义一些额外的目标环境配置。 |
| `browserlist` | Configures sharing of target browsers and Node.js versions among various front-end tools. See [Browserlist on GitHub](https://github.com/browserslist/browserslist) for more information.   |
| `browserlist` | 配置各个目标浏览器和 Node.js 版本之间的市场占有率，供各种前端工具使用。详情参见 [GitHub 上的 Browserlist](https://github.com/browserslist/browserslist)。 |
| `favicon.ico` | An icon to use for this app in the bookmark bar.  |
| `favicon.ico` | 一个用在书签栏上的应用图标。 |
| `index.html` | The main HTML page that is served when someone visits your site. The CLI automatically adds all JavaScript and CSS files when building your app, so you typically don't need to add any `<script>` or` <link>` tags here manually.  |
| `index.html` | 当有人访问你的应用时给出的主 HTML 文件，你通常不用手动在这里添加任何 `<script>` 或` <link>` 标签。 |
| `main.ts` | The main entry point for your app. Compiles the application with the [JIT compiler](https://angular.io/guide/glossary#jit) and bootstraps the application's root module (AppModule) to run in the browser. You can also use the [AOT compiler](https://angular.io/guide/aot-compiler) without changing any code by appending the `--aot` flag to the CLI `build` and `serve` commands.  |
| `main.ts` | 应用的主入口点。使用 [JIT 编译器](https://angular.cn/guide/glossary#jit)编译应用，并引导应用的根模块 AppModule 来运行在浏览器中。你也可以为 CLI 的 `build` 和 `serve` 命令添加 `--aot` 标志，来使用 [AOT 编译器](https://angular.cn/guide/aot-compiler) 而不必修改任何代码。 |
| `polyfills.ts` | Provides polyfill scripts for browser support.  |
| `polyfills.ts` | 为浏览器支持提供腻子脚本（polyfill）。 |
| `styles.sass` | Lists CSS files that supply styles for a project. The extension reflects the style preprocessor you have configured for the project.  |
| `styles.sass` | 列出为项目提供样式的 CSS 文件。其扩展名和你为项目配置的样式预处理器保持一致。 |
| `test.ts` | The main entry point for your unit tests, with some Angular-specific configuration. You don't typically need to edit this file.  |
| `test.ts` | 单元测试的主入口点，其中带有一些特定于 Angular 的配置。一般来说你不必编辑这个问题。 |
| `tsconfig.app.json` | Inherits from the workspace-wide `tsconfig.json` file.  |
| `tsconfig.app.json` | 继承自工作空间级的 `tsconfig.json` 文件。 |
| `tsconfig.spec.json` | Inherits from the workspace-wide `tsconfig.json` file.  |
| `tsconfig.spec.json` | 继承自工作空间级的 `tsconfig.json` 文件。 |
| `tslint.json` | Inherits from the workspace-wide `tslint.json` file.  |
| `tslint.json` | 继承自工作空间级的 `tsconfig.json` 文件。 |

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

| APP SOURCE FILES | PURPOSE |
| :-------------------------- | :------------------------------------------|
| 应用源文件 | 用途 |
| `app/app.component.ts` | Defines the logic for the app's root component, named `AppComponent`. The view associated with this root component becomes the root of the [view hierarchy](guide/glossary#view-hierarchy) as you add components and services to your app.  |
| `app/app.component.ts` | 定义应用程序根组件（名叫 `AppComponent`）的逻辑代码。当你往应用中添加组件和服务时，根组件所关联的视图会作为 [view hierarchy](guide/glossary#view-hierarchy) 视图树的根。 |
| `app/app.component.html` | Defines the HTML template associated with the root `AppComponent`.  |
| `app/app.component.html` | 定义与根组件 `AppComponent` 关联的模板。 |
| `app/app.component.css` | Defines the base CSS stylesheet for the root `AppComponent`.  |
| `app/app.component.css` | 定义根组件 `AppComponent` 的 CSS 样式表。 |
| `app/app.component.spec.ts` | Defines a unit test for the root `AppComponent`.  |
| `app/app.component.spec.ts` | 定义根组件 `AppComponent` 的单元测试文件。 |
| `app/app.module.ts` | Defines the root module, named `AppModule`, that tells Angular how to assemble the application. Initially declares only the `AppComponent`. As you add more components to the app, they must be declared here.  |
| `app/app.module.ts` | 定义根模块（名叫 `AppModule`），它告诉 Angular 如何组装应用。其初始声明中只有 `AppComponent`。当你往应用中添加更多组件时，它们必须声明在这里。 |
| `assets/*` | Contains image files and other asset files to be copied as-is when you build your application.  |
| `assets/*` | 包含图片文件和其它资源，当构建应用时，它们将被原样复制到目标目录中。 |
