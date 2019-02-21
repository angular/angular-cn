# Angular Workspace Configuration

# Angular 工作区配置

A file named `angular.json` at the root level of an Angular [workspace](guide/glossary#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools provided by the Angular CLI. 
Path values given in the configuration are relative to the root workspace folder. 

Angular [工作区](guide/glossary#workspace)根目录下的 `angular.json` 文件提供了全工作区级的配置和具体项目的默认配置，供 Angular CLI 中的构建工具和开发工具使用。
此配置中所提供的路径值都是相对于工作区根目录的。

## Overall JSON structure

## JSON 的总体结构

At the top level of `angular.json`, a few properties configure the workspace, and a `projects` section contains the remaining per-project configuration options. 

在 `angular.json` 的顶级，一些属性用于配置工作区，其中的 `projects` 区则包含其余的针对每个项目的配置项。

* `version`: The configuration-file version.

  `version`：该配置文件的版本。

* `newProjectRoot`: Path where new projects are created. Absolute or relative to the workspace folder.

  `newProjectRoot`：用来创建新工程的位置。绝对路径或相对于工作区目录的路径。

* `defaultProject`: Default project name to use in commands, where not provided as an argument. When you use `ng new` to create a new app in a new workspace, that app is the default project for the workspace until you change it here.

  `defaultProject`：当命令中没有指定参数时，要使用的默认工程名。当你用 `ng new` 在新的工作区中创建新应用时，该应用就会一直作为此工作区的默认项目，除非你到这里修改它。

* `projects` : Contains a subsection for each project (library, app, e2e test app) in the workspace, with the per-project configuration options. 

  `projects`：对于工作区中的每个项目（库、应用、e2e 测试）都会包含一个子分区，子分区中是每个项目的配置项。

The initial app that you create with `ng new app_name` is listed under "projects", along with its corresponding end-to-end test app: 

你通过 `ng new app_name` 命令创建的初始应用及其对应的端到端测试应用都会列在 `projects` 下：

<code-example format="." language="none" linenums="false">
projects
  app_name
    ...
  app_name-e2e
    ...
</code-example>

Each additional app that you create with `ng generate application` has a corresponding end-to-end test project, with its own configuration section.
When you create a library project with `ng generate library`, the library project is also added to the `projects` section. 

你使用 `ng generate application` 创建的每个应用都有相应的端到端测试项目，它有自己的配置节。当你使用 `ng generate library` 创建库项目时，库项目也会添加到 `projects` 节。

<div class="alert is-helpful">

  Note that the `projects` section of the configuration file does not correspond exactly to the workspace file structure. 

  请注意，配置文件的 `projects` 节与工作区的文件结构并不完全对应。

  * The initial app created by `ng new` is at the top level of the workspace file structure, along with its e2e app.

    `ng new` 创建的这个初始应用和它的 e2e 应用一起位于工作区文件结构的顶层。

  * Additional apps, e2e apps, and libraries go into a `projects` folder in the workspace.

    其它应用、e2e应用和库位于工作区的 `projects` 文件夹中。

  For more information, see [Workspace and project file structure](guide/file-structure).

  欲知详情，参见[工作区和项目文件结构](guide/file-structure)。

</div>

## Project configuration options

## 项目配置选项

The following top-level configuration properties are available for each project, under `projects:<project_name>`.

每个项目的 `projects:<project_name>`  下都有以下顶级配置属性。

<code-example format="." language="json" linenums="false">
    "my-v7-app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {}
    }
</code-example>

| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| 属性            | 描述                                                                                                                                                                        |
| `root`        | The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace.                   |
| `root`        | 该项目的根文件夹，相对于工作区文件夹的路径。初始应用的值为空，因为它位于工作区的顶层。                                                                                                                             |
| `sourceRoot`  | The root folder for this project's source files.                                                                                                                          |
| `sourceRoot`  | 该项目源文件的根文件夹。                                                                                                                                                              |
| `projectType` | One of "application" or "library". An application can run independently in a browser, while a library cannot. Both an app and its e2e test app are of type "application". |
| `projectType` | "application" 或 "library" 之一。应用可以在浏览器中独立运行，而库则不行。应用及其 e2e 测试应用都属于 "application" 类型。                                                                                                                      |
| `prefix`      | A string that Angular prepends to generated selectors. Can be customized to identify an app or feature area.                                                              |
| `prefix`      | Angular 所生成的选择器的前缀字符串。可以自定义它，以作为应用或功能区的标识。                                                                                                                                   |
| `schematics`  | An object containing schematics that customize CLI commands for this project.                                                                                             |
| `schematics`  | 一个包含 schematic 的对象，用于自定义该项目的 CLI 命令。                                                                                                                                                |
| `architect`   | An object containing configuration defaults for Architect builder targets for this project.                                                                               |
| `architect`   | 一个包含默认配置的对象，用于定义此项目构建器的目标。                                                                                                                                        |

## Project tool configuration options

## 项目工具的配置选项

Architect is the tool that the CLI uses to perform complex tasks such as compilation and test running, according to provided configurations. The `architect` section contains a set of Architect *targets*. Many of the targets correspond to the CLI commands that run them. Some additional predefined targets can be run using the `ng run` command, and you can define your own targets.

建筑师（Architect）是指 CLI 用来根据所提供的配置执行复杂任务（如编译和测试运行）的工具。 `architect` 部分包含一组建筑*目标*。很多目标都对应于运行它们的 CLI 命令。使用 `ng run` 命令可以运行一些额外的预定义目标，并可以定义自己的目标。

Each target object specifies the `builder` for that target, which is the npm package for the tool that Architect runs. In addition, each target has an `options` section that configure default options for the target, and a `configurations` section that names and specifies alternative configurations for the target. See the example in [Build target](#build-target) below. 

每个目标对象都指定了该目标的 `builder`，它是建筑师所运行工具的 npm 包。此外，每个目标都有一个 `options` 部分，用于配置该目标的默认选项，`configurations` 部分可以为目标命名并指定备用配置。参见稍后的[构建目标](#build-target)部分的例子。

<code-example format="." language="json" linenums="false">
      "architect": {
        "build": { },
        "serve": { },
        "e2e" : { },
        "test": { },
        "lint": { },
        "extract-i18n": { },
        "server": { },
        "app-shell": { }
      }
</code-example>

* The `architect/build` section configures defaults for options of the `ng build` command. See [Build target](#build-target) below for more information.

  `architect/build` 节会为 `ng build` 命令的选项配置默认值。更多信息，参见稍后的[构建目标](#build-target)部分。

* The `architect/serve` section overrides build defaults and supplies additional serve defaults for the `ng serve` command.  In addition to the options available for the `ng build` command, it adds options related to serving the app.

  `architect/serve` 节会覆盖构建默认值，并为 `ng serve` 命令提供额外的服务器默认值。除了 `ng build` 命令的可用选项之外，还增加了与开发服务器有关的选项。

* The `architect/e2e` section overrides build-option defaults for building end-to-end testing apps using the `ng e2e` command.

  `architect/e2e` 节覆盖了构建选项默认值，以便用 `ng e2e` 命令构建端到端测试应用。

* The `architect/test` section overrides build-option defaults for test builds and supplies additional test-running defaults for the `ng test` command.

  `architect/test` 节会覆盖测试时的构建选项默认值，并为 `ng test` 命令提供额外的默认值以供运行测试。

* The `architect/lint` section configures defaults for options of the `ng lint` command, which performs code analysis on project source files.  The default linting tool for Angular is [TSLint](https://palantir.github.io/tslint/).

  `architect/lint` 节为 `ng lint` 命令配置了默认值，用于对项目源文件进行代码分析。 Angular 默认的 linting 工具为 [TSLint](https://palantir.github.io/tslint/)。

* The `architect/extract-i18n` section configures defaults for options of the `ng-xi18n` tool used by the `ng xi18n` command, which extracts marked message strings from source code and outputs translation files.

  `architect/extract-i18n` 节为 `ng xi18n` 命令所用到的 `ng-xi18n` 工具选项配置了默认值，该命令用于从源代码中提取带标记的消息串，并输出翻译文件。

* The `architect/server` section configures defaults for creating a Universal app with server-side rendering, using the `ng run <project>:server` command. 

  `architect/server` 节用于为使用 `ng run <project>:server` 命令创建带服务器端渲染的 Universal 应用配置默认值。

* The `architect/app-shell` section configures defaults for creating an app shell for a progressive web app (PWA), using the `ng run <project>:app-shell` command.

  `architect/app-shell` 部分使用 `ng run <project>:app-shell` 命令为渐进式 Web 应用（PWA）配置创建应用外壳的默认值。

In general, the options for which you can configure defaults correspond to the command options listed in the [CLI reference page](cli) for each command. 
Note that all options in the configuration file must use [camelCase](guide/glossary#case-conventions), rather than dash-case.

一般来说，可以为 [CLI 参考手册中](cli)列出的每个命令配置相应的默认值。注意，配置文件中的所有选项都必须使用 [camelCase](guide/glossary#case-conventions)，而不是 dash-case。

{@a build-target}

## Build target

## 构建目标

The `architect/build` section configures defaults for options of the `ng build` command. It has the following top-level properties.

`architect/build` 节会为 `ng build` 命令的选项配置默认值。它具有下列顶级属性。

| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| 属性               | 说明                                                                                                                                                                                                                                                                           |
| `builder`        | The npm package for the build tool used to create this target. The default is `@angular-devkit/build-angular:browser`, which uses the [webpack](https://webpack.js.org/) package bundler.                                                                                    |
| `builder`        | 用于构建此目标的构建工具的 npm 包。默认为 `@angular-devkit/build-angular:browser`，它使用的是 [webpack](https://webpack.js.org/) 打包器。                                                                                                                                                            |
| `options`        | This section contains defaults for build options, used when no named alternative configuration is specified. See [Default build options](#build-props) below.                                                                                                                |
| `options`        | 本节包含构建选项的默认值，当没有指定命名的备用配置时使用。参见下面的[默认构建选项](#build-props) 。                                                                                                                                                                                                    |
| `configurations` | This section defines and names alternative configurations for different intended destinations. It contains a section for each named configuration, which sets the default options for that intended environment. See [Alternate build configurations](#build-configs) below. |
| `configurations` | 本节定义并命名针对不同目标的备用配置。它为每个命名配置都包含一节，用于设置该目标环境的默认选项。参见下面的[备用的构建配置](#build-configs) 。                                                                                                                                                                                  |

{@a build-configs}

### Alternate build configurations

### 备用的构建配置

By default, a `production` configuration is defined, and the `ng build` command has `--prod` option that builds using this configuration. The `production` configuration sets defaults that optimize the app in a number of ways, such bundling files, minimizing excess whitespace, removing comments and dead code, and rewriting code to use short, cryptic names ("minification"). 

默认情况下，会定义一个 `production` 配置，`ng build` 命令会使用该配置下的 `--prod` 选项。这里的 `production` 配置会设置各种默认值来优化应用，例如打包文件、最小化多余空格、移除注释和死代码，以及重写代码以使用简短的名字（“minification”）。

You can define and name additional alternate configurations (such as `stage`, for instance) appropriate to your development process. Some examples of different build configurations are `stable`, `archive` and `next` used by AIO itself, and the individual locale-specific configurations required for building localized versions of an app. For details, see [Internationalization (i18n)](guide/i18n#merge-aot). 

你可以定义和命名适用于你的开发过程的其它备用配置（例如`stage`）。其它构建配置的一些例子是 AIO 自己使用的 `stable`、`archive`、`next`，以及构建本地化版本应用所需的各个与区域有关的配置置。欲知详情，参见[国际化（i18n）](guide/i18n#merge-aot) 。

{@a build-props}

### Additional build and test options

### 额外的构建和测试选项

The configurable options for a default or targeted build generally correspond to the options available for the [`ng build`](cli/build), [`ng serve`](cli/serve), and [`ng test`](cli/test) commands. For details of those options and their possible values, see the [CLI Reference](cli). 

[`ng build`](cli/build)、[`ng serve`](cli/serve) 和 [`ng test`](cli/test) 命令的可配置选项通常与 [`ng build`](cli/build)、[`ng serve`](cli/serve) 和 [`ng test`](cli/test) 命令的可用选项一一对应。有关这些选项及其取值范围的更多信息，参见“ [CLI参考手册”](cli)。

Some additional options (listed below) can only be set through the configuration file, either by direct editing or with the [`ng config`](cli/config) command.

一些额外的选项（如下所列）只能通过配置文件来设置，可以直接编辑，也可以使用 [`ng config`](cli/config) 命令。

| OPTIONS PROPERTIES | DESCRIPTION |
| :------------------------- | :---------------------------- |
| 选项属性                    | 说明                                                                                                                                                                                                                                                                                             |
| `fileReplacements`         | An object containing files and their compile-time replacements.                                                                                                                                                                                                                                |
| `fileReplacements`         | 一个对象，包含一些文件及其编译时替代品。                                                                                                                                                                                                                                                                                |
| `stylePreprocessorOptions` | An object containing option-value pairs to pass to style preprocessors.                                                                                                                                                                                                                        |
| `stylePreprocessorOptions` | 一个对象，包含要传递给样式预处理器的选项"值-对"。                                                                                                                                                                                                                                                                       |
| `assets`                   | An object containing paths to static assets to add to the global context of the project. The default paths point to the project's icon file and its `assets` folder.                                                                                                                           |
| `assets`                   | 一个对象，包含一些用于添加到项目的全局上下文中的静态文件路径。它的默认路径指向项目的图标文件及项目的 `assets` 文件夹。                                                                                                                                                                                                                                         |
| `styles`                   | An object containing style files to add to the global context of the project. Angular CLI supports CSS imports and all major CSS preprocessors: [sass/scss](http://sass-lang.com/), [less](http://lesscss.org/), and [stylus](http://stylus-lang.com/).                                        |
| `styles`                   | 一个对象，包含一些要添加到项目全局上下文中的样式文件。 Angular CLI 支持 CSS 导入和所有主要的 CSS 预处理器： [sass/scss](http://sass-lang.com/)、[less](http://lesscss.org/) 和 [stylus](http://stylus-lang.com/)。                                                                                                                                |
| `scripts`                  | An object containing JavaScript script files to add to the global context of the project. The scripts are loaded exactly as if you had added them in a `<script>` tag inside `index.html`.                                                                                                     |
| `scripts`                  | 一个对象，包含一些 JavaScript 脚本文件，用于添加到项目的全局上下文中。这些脚本的加载方式和在 `index.html` 的 `<script>` 标签中添加是完全一样的。                                                                                                                                                                                                            |
| `budgets`                  | Default size-budget type and threshholds for all or parts of your app. You can configure the builder to report a warning or an error when the output reaches or exceeds a threshold size. See [Configure size budgets](guide/build#configure-size-budgets). (Not available in `test` section.) |
| `budgets`                  | 全部或部分应用的默认尺寸预算的类型和阈值。当构建的输出达到或超过阈值大小时，你可以将构建器配置为报告警告或错误。参见[配置尺寸预算](guide/build#configure-size-budgets) 。（不适用于 `test` 部分。）                                                                                                                                                                           |
