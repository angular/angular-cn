# Angular workspace configuration

# Angular 工作区配置

A file named `angular.json` at the root level of an Angular [workspace](guide/glossary#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools provided by the Angular CLI.
Path values given in the configuration are relative to the root workspace folder.

Angular [工作区](guide/glossary#workspace)根目录下的 `angular.json` 文件提供了全工作区级的配置和具体项目的默认配置，供 Angular CLI 中的构建工具和开发工具使用。
此配置中所提供的路径值都是相对于工作区根目录的。

## Overall JSON structure

## JSON 的总体结构

At the top level of `angular.json`, a few properties configure the workspace, and a `projects` section contains the remaining per-project configuration options. CLI defaults set at the workspace level can be overridden by defaults set at the project level, and defaults set at the project level can be overridden on the command line.

在 `angular.json` 的顶层，一些属性用于配置工作区，其中的 `projects` 区则包含其余的针对每个项目的配置项。CLI 在工作空间级的默认设置可以被项目级的设置所覆盖，而项目级的设置可以被命令行中的设置所覆盖。

The following properties, at the top level of the file, configure the workspace.

下列属性位于文件的顶层，用于配置工作空间。

* `version`: The configuration-file version.

  `version`：该配置文件的版本。

* `newProjectRoot`: Path where new projects are created. Absolute or relative to the workspace folder.

  `newProjectRoot`：用来创建新工程的位置。绝对路径或相对于工作区目录的路径。

* `defaultProject`: Default project name to use in commands, where not provided as an argument. When you use `ng new` to create a new app in a new workspace, that app is the default project for the workspace until you change it here.

  `defaultProject`：当命令中没有指定参数时，要使用的默认工程名。当你用 `ng new` 在新的工作区中创建新应用时，该应用就会一直作为此工作区的默认项目，除非你到这里修改它。

* `schematics` : A set of [schematics](guide/glossary#schematic) that customize the `ng generate` sub-command option defaults for this workspace. See [Generation schematics](#schematics) below.

   `schematics`：一组[原理图](guide/glossary#schematic)，用于定制 `ng generate` 子命令在本工作空间中的默认选项。参见稍后的[生成器原理图](#schematics)。

* `projects` : Contains a subsection for each project (library or application) in the workspace, with the per-project configuration options.

  `projects`：对于工作区中的每个项目（应用或库）都会包含一个子分区，子分区中是每个项目的配置项。

The initial app that you create with `ng new app_name` is listed under "projects":

你通过 `ng new app_name` 命令创建的初始应用会列在 `projects` 目录下：

<code-example language="json">
"projects": {
  "app_name": {
    ...
  }
  ...
}

</code-example>

Each additional app that you create with `ng generate application` has a corresponding end-to-end test project, with its own configuration section.
When you create a library project with `ng generate library`, the library project is also added to the `projects` section.

你使用 `ng generate application` 创建的每个应用都有相应的端到端测试项目，它有自己的配置节。当你使用 `ng generate library` 创建库项目时，库项目也会添加到 `projects` 节。

<div class="alert is-helpful">

  Note that the `projects` section of the configuration file does not correspond exactly to the workspace file structure.

  请注意，配置文件的 `projects` 节与工作区的文件结构并不完全对应。

  * The initial app created by `ng new` is at the top level of the workspace file structure.

    `ng new` 创建的这个初始应用位于工作区文件结构的顶层。

  * Additional applications and libraries go into a `projects` folder in the workspace.

    其它应用和库位于工作区的 `projects` 文件夹中。

  For more information, see [Workspace and project file structure](guide/file-structure).

  欲知详情，参见[工作区和项目文件结构](guide/file-structure)。

</div>

## Project configuration options

## 项目配置选项

The following top-level configuration properties are available for each project, under `projects:<project_name>`.

每个项目的 `projects:<project_name>`  下都有以下顶层配置属性。

<code-example language="json">
    "my-app": {
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
| 属性 | 说明 |
| `root`          | The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace. |
| `root`        | 该项目的根文件夹，相对于工作区文件夹的路径。初始应用的值为空，因为它位于工作区的顶层。                                                                                                                            |
| `sourceRoot`    | The root folder for this project's source files. |
| `sourceRoot`  | 该项目源文件的根文件夹。                                                                                                                                                             |
| `projectType`   | One of "application" or "library". An application can run independently in a browser, while a library cannot.|
| `projectType` | "application" 或 "library" 之一。应用可以在浏览器中独立运行，而库则不行。|
| `prefix`        | A string that Angular prepends to generated selectors. Can be customized to identify an app or feature area. |
| `prefix`      | Angular 所生成的选择器的前缀字符串。可以自定义它，以作为应用或功能区的标识。                                                                                                                                  |
| `schematics`    | A set of schematics that customize the `ng generate` sub-command option defaults for this project. See [Generation schematics](#schematics) below.  |
| `schematics`  | 一组原理图（schematic），它可以为该项目自定义 `ng generate` 子命令的默认选项。|
| `architect`     | Configuration defaults for Architect builder targets for this project. |
| `architect`     | 为本项目的各个构建器目标配置默认值。|

{@a schematics}

## Generation schematics

## 生成器原理图

Angular generation [schematics](guide/glossary#schematic) are instructions for modifying a project by adding files or modifying existing files.
Individual schematics for the default Angular CLI `ng generate` sub-commands are collected in the package `@angular`.
Specify the schematic name for a subcommand in the format `schematic-package:schematic-name`;
for example, the schematic for generating a component is `@angular:component`.

Angular 生成器的[原理图](guide/glossary#schematic)是一组用来修改项目的指南，包括添加新文件或修改现有文件。
默认情况下，Angular CLI 的 `ng generate` 子命令会从 `@angular` 包中收集原理图。
可以用 `schematic-package:schematic-name` 格式来为子命令指定原理图名称；比如，用来生成组件的原理图名叫 `@angular:component`。

The JSON schemas for the default schematics used by the CLI to generate projects and parts of projects are collected in the package [`@schematics/angular`](https://github.com/angular/angular-cli/blob/7.0.x/packages/schematics/angular/application/schema.json).
The schema describes the options available to the CLI for each of the `ng generate` sub-commands, as shown in the `--help` output.

供 CLI 生成项目及其部件的默认原理图的 JSON 模式（schema）位于 [`@schematics/angular`](https://github.com/angular/angular-cli/blob/7.0.x/packages/schematics/angular/application/schema.json) 包中。
这个模式描述了 CLI `ng generate` 子命令的每个选项，它们会显示在 `--help` 的输出中。

The fields given in the schema correspond to the allowed argument values and defaults for the CLI sub-command options.
You can update your workspace schema file to set a different default for a sub-command option.

这个模式中的每个字段都对应于 CLI 子命令选项的参数取值范围和默认值。
你可以修改此命名空间的模式文件，来为某个子命令选项指定另外的默认值。

{@a architect}

## Project tool configuration options

## 项目工具的配置选项

Architect is the tool that the CLI uses to perform complex tasks, such as compilation and test running.
Architect is a shell that runs a specified [builder](guide/glossary#builder) to perform a given task, according to a [target](guide/glossary#target) configuration.
You can define and configure new builders and targets to extend the CLI.
See [Angular CLI Builders](guide/cli-builder).

建筑师（Architect）是 CLI 用来执行复杂任务（例如编译和测试运行）的工具。
Architect 是一个根据[目标](guide/glossary#target)配置运行指定的[构建器](guide/glossary#builder)以完成指定任务的外壳。你可以定义和配置新的构建器和目标以扩展 CLI。请参阅 [Angular CLI 构建器](guide/cli-builder)。

{@a default-build-targets}

### Default Architect builders and targets

### 默认的建筑师构建器和目标

Angular defines default builders for use with specific CLI commands, or with the general `ng run` command.
The JSON schemas that the define the options and defaults for each of these default builders are collected in the [`@angular-devkit/build-angular`](https://github.com/angular/angular-cli/blob/8.0.x/packages/angular/cli/lib/config/schema.json) package.
The schemas configure options for the following builders.

Angular 定义了用于特定 CLI 命令或常规 `ng run` 命令的默认构建器。为每个默认构建器定义选项和默认值的 JSON 模式收集在[`@angular-devkit/build-angular`](https://github.com/angular/angular-cli/blob/8.0.x/packages/angular/cli/lib/config/schema.json)包中。这些架构为以下构建器配置选项。

* app-shell

* browser

* dev-server

* extract-i18n

* karma

* protractor

* server

* tslint

### Configuring builder targets

### 配置构建器目标

The `architect` section of `angular.json` contains a set of Architect targets.
Many of the targets correspond to the CLI commands that run them.
Some additional predefined targets can be run using the `ng run` command, and you can define your own targets.

`angular.json` 的 `architect` 部分包含一组建筑目标。很多目标都对应于运行它们的 CLI 命令。使用 `ng run` 命令可以运行一些额外的预定义目标，并可以定义自己的目标。

Each target object specifies the `builder` for that target, which is the npm package for the tool that Architect runs.
In addition, each target has an `options` section that configures default options for the target, and a `configurations` section that names and specifies alternative configurations for the target.
See the example in [Build target](#build-target) below.

每个目标对象都指定了该目标的 `builder`，它是建筑师所运行工具的 npm 包。此外，每个目标都有一个 `options` 部分，用于配置该目标的默认选项，`configurations` 部分可以为目标命名并指定备用配置。参见稍后的[构建目标](#build-target)部分的例子。

<code-example language="json">
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

* The `architect/build` section configures defaults for options of the `ng build` command.
See [Build target](#build-target) below for more information.

  `architect/build` 节会为 `ng build` 命令的选项配置默认值。更多信息，参见稍后的[构建目标](#build-target)部分。

* The `architect/serve` section overrides build defaults and supplies additional serve defaults for the `ng serve` command. In addition to the options available for the `ng build` command, it adds options related to serving the app.

  `architect/serve` 节会覆盖构建默认值，并为 `ng serve` 命令提供额外的服务器默认值。除了 `ng build` 命令的可用选项之外，还增加了与开发服务器有关的选项。

* The `architect/e2e` section overrides build-option defaults for building end-to-end testing apps using the `ng e2e` command.

  `architect/e2e` 节覆盖了构建选项默认值，以便用 `ng e2e` 命令构建端到端测试应用。

* The `architect/test` section overrides build-option defaults for test builds and supplies additional test-running defaults for the `ng test` command.

  `architect/test` 节会覆盖测试时的构建选项默认值，并为 `ng test` 命令提供额外的默认值以供运行测试。

* The `architect/lint` section configures defaults for options of the `ng lint` command, which performs code analysis on project source files. The default linting tool for Angular is [TSLint](https://palantir.github.io/tslint/).

  `architect/lint` 节为 `ng lint` 命令配置了默认值，用于对项目源文件进行代码分析。Angular 默认的 linting 工具为 [TSLint](https://palantir.github.io/tslint/)。

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

`architect/build` 节会为 `ng build` 命令的选项配置默认值。它具有下列顶层属性。

| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| 属性               | 说明                                                                                                                                                                                                                                                                           |
| `builder`        | The npm package for the build tool used to create this target. The default builder for an application (`ng build myApp`)is `@angular-devkit/build-angular:browser`, which uses the [webpack](https://webpack.js.org/) package bundler.                                                                                    Note that a different builder is used for building a library (`ng build myLib`). |
| `builder`        | 用于构建此目标的构建工具的 npm 包。默认为 `@angular-devkit/build-angular:browser`，它使用的是 [webpack](https://webpack.js.org/) 打包器。                                                                                                                                                           |
| `options`        | This section contains default build target options, used when no named alternative configuration is specified. See [Default build targets](#default-build-targets) below.                                                                                                                |
| `options`        | 本节包含构建选项的默认值，当没有指定命名的备用配置时使用。参见下面的[默认构建选项](#build-props)。                                                                                                                                                                                                   |
| `configurations` | This section defines and names alternative configurations for different intended destinations. It contains a section for each named configuration, which sets the default options for that intended environment. See [Alternate build configurations](#build-configs) below. |
| `configurations` | 本节定义并命名针对不同目标的备用配置。它为每个命名配置都包含一节，用于设置该目标环境的默认选项。参见下面的[备用的构建配置](#build-configs)。                                                                                                                                                                                 |

{@a build-configs}

### Alternate build configurations

### 备用的构建配置

By default, a `production` configuration is defined, and the `ng build` command has `--prod` option that builds using this configuration. The `production` configuration sets defaults that optimize the app in a number of ways, such as bundling files, minimizing excess whitespace, removing comments and dead code, and rewriting code to use short, cryptic names ("minification").

默认情况下，会定义一个 `production` 配置，`ng build` 命令会使用该配置下的 `--prod` 选项。这里的 `production` 配置会设置各种默认值来优化应用，例如打包文件、最小化多余空格、移除注释和死代码，以及重写代码以使用简短的名字（“minification”）。

You can define and name additional alternate configurations (such as `stage`, for instance) appropriate to your development process. Some examples of different build configurations are `stable`, `archive` and `next` used by AIO itself, and the individual locale-specific configurations required for building localized versions of an app. For details, see [Internationalization (i18n)](guide/i18n#merge-aot).

你可以定义和命名适用于你的开发过程的其它备用配置（例如 `stage`）。其它构建配置的一些例子是 AIO 自己使用的 `stable`、`archive`、`next`，以及构建本地化版本应用所需的各个与区域有关的配置置。欲知详情，参见[国际化（i18n）](guide/i18n#merge-aot)。

You can select an alternate configuration by passing its name to the `--configuration` command line flag.

你可以通过将它们的名称传给 `--configuration` 命令行标志来选择替代配置。

You can also pass in more than one configuration name as a comma-separated list. For example, to apply both `stage` and `fr` build configurations, use the command `ng build --configuration stage,fr`. In this case,  the command parses the named configurations from left to right. If multiple configurations change the same setting, the last-set value is the final one.

你还可以用逗号分隔的列表传入多个配置名称。例如，要同时应用 `stage` 和 `fr` 构建配置，请使用命令 `ng build --configuration stage,fr`。在这种情况下，该命令从左到右解析命名的配置。如果多个配置更改了同一个设置，则最后设置的值生效。

If the `--prod` command line flag is also used, it is applied first, and its settings can be overridden by any configurations specified via the `--configuration` flag.

如果还使用了 `--prod` 命令行标志，则将首先应用它，并且可以通过 `--configuration` 标志指定的任何配置覆盖其设置。

{@a build-props}

### Additional build and test options

### 额外的构建和测试选项

The configurable options for a default or targeted build generally correspond to the options available for the [`ng build`](cli/build), [`ng serve`](cli/serve), and [`ng test`](cli/test) commands. For details of those options and their possible values, see the [CLI Reference](cli).

[`ng build`](cli/build)、[`ng serve`](cli/serve) 和 [`ng test`](cli/test) 命令的可配置选项通常与 [`ng build`](cli/build)、[`ng serve`](cli/serve) 和 [`ng test`](cli/test) 命令的可用选项一一对应。有关这些选项及其取值范围的更多信息，参见“ [CLI 参考手册”](cli)。

Some additional options can only be set through the configuration file, either by direct editing or with the [`ng config`](cli/config) command.

一些额外的选项（如下所列）只能通过配置文件来设置，可以直接编辑，也可以使用 [`ng config`](cli/config) 命令。

| OPTIONS PROPERTIES | DESCRIPTION |
| :------------------------- | :---------------------------- |
| 选项属性                    | 说明   |
| `assets`                   | An object containing paths to static assets to add to the global context of the project. The default paths point to the project's icon file and its `assets` folder. See more in [Assets configuration](#asset-config) below. |
| `assets`                   | 一个对象，包含一些用于添加到项目的全局上下文中的静态文件路径。它的默认路径指向项目的图标文件及项目的 `assets` 文件夹。参见稍后的[项目资产（asset）配置](#asset-config)部分。                 |
| `styles`                   | An array of style files to add to the global context of the project. Angular CLI supports CSS imports and all major CSS preprocessors: [sass/scss](http://sass-lang.com/), [less](http://lesscss.org/), and [stylus](http://stylus-lang.com/). See more in [Styles and scripts configuration](#style-script-config) below. |
| `styles`                   | 一个对象，包含一些要添加到项目全局上下文中的样式文件。Angular CLI 支持 CSS 导入和所有主要的 CSS 预处理器： [sass/scss](http://sass-lang.com/)、[less](http://lesscss.org/) 和 [stylus](http://stylus-lang.com/)。参见稍后的 [样式和脚本配置](#style-script-config)部分。               |
| `stylePreprocessorOptions` | An object containing option-value pairs to pass to style preprocessors. See more in [Styles and scripts configuration](#style-script-config) below. |
| `stylePreprocessorOptions` | 一个对象，包含要传给样式预处理器的选项"值-对"。参见稍后的 [样式和脚本配置](#style-script-config) 部分。                            |
| `scripts`                  | An object containing JavaScript script files to add to the global context of the project. The scripts are loaded exactly as if you had added them in a `<script>` tag inside `index.html`. See more in [Styles and scripts configuration](#style-script-config) below. |
| `scripts`                  | 一个对象，包含一些 JavaScript 脚本文件，用于添加到项目的全局上下文中。这些脚本的加载方式和在 `index.html` 的 `<script>` 标签中添加是完全一样的。参见稍后的 [样式和脚本配置](#style-script-config) 部分。|
| `budgets`                  | Default size-budget type and threshholds for all or parts of your app. You can configure the builder to report a warning or an error when the output reaches or exceeds a threshold size. See [Configure size budgets](guide/build#configure-size-budgets). (Not available in `test` section.) |
| `budgets`                  | 全部或部分应用的默认尺寸预算的类型和阈值。当构建的输出达到或超过阈值大小时，你可以将构建器配置为报告警告或错误。参见[配置尺寸预算](guide/build#configure-size-budgets)。（不适用于 `test` 部分。）|
| `fileReplacements`         | An object containing files and their compile-time replacements. See more in [Configure target-specific file replacements](guide/build#configure-target-specific-file-replacements).|
| `fileReplacements`         | 一个对象，包含一些文件及其编译时替代品。参见[为指定的目标配置文件替换规则](guide/build#configure-target-specific-file-replacements) 部分。|

{@a complex-config}

## Complex configuration values

## 复杂配置的值

The options `assets`, `styles`, and `scripts` can have either simple path string values, or object values with specific fields.
The `sourceMap` and `optimization` options can be set to a simple Boolean value with a command flag, but can also be given a complex value using the configuration file.
The following sections provide more details of how these complex values are used in each case.

选项 `assets`，`styles` 和 `scripts` 的值可以是简单的路径字符串，也可以是带有特定字段的对象值。可以使用命令标志将 `sourceMap` 和 `optimization` 选项设置为简单的布尔值，但也可以使用配置文件为其指定复杂的值。以下各节提供了在每种情况下如何使用这些复数值的详细信息。

{@a asset-config}

### Assets configuration

### 项目资产（asset）配置

Each `build` target configuration can include an `assets` array that lists files or folders you want to copy as-is when building your project.
By default, the `src/assets/` folder and `src/favicon.ico` are copied over.

每个 `build` 目标配置都可以包含一个 `assets` 数组，它列出了当你构建项目时要复制的文件或文件夹。默认情况下，会复制 `src/assets/` 文件夹和 `src/favicon.ico`。

<code-example language="json">
"assets": [
  "src/assets",
  "src/favicon.ico"
]

</code-example>

To exclude an asset, you can remove it from the assets configuration.

要排除某个资产，可以从这份资产配置中删除它。

You can further configure assets to be copied by specifying assets as objects, rather than as simple paths relative to the workspace root.
A asset specification object can have the following fields.

你可以通过把资产指定为对象的形式来进一步配置要复制的资产，而不仅是相对于工作空间根目录的路径。一个资产对象可以包含如下字段。

* `glob`:  A [node-glob](https://github.com/isaacs/node-glob/blob/master/README.md) using `input` as base directory.

  `glob`：一个 [node-glob](https://github.com/isaacs/node-glob/blob/master/README.md) 它使用 `input` 作为基准目录。

* `input`: A path relative to the workspace root.

  `input`：相对于工作空间根目录的路径。

* `output`: A path relative to `outDir` (default is `dist/`*project-name*). Because of the security implications, the CLI never writes files outside of the project output path.

  `output`：相对于 `outDir` 的路径（默认为 `dist/`*project-name* ）。为了杜绝安全隐患，CLI 永远不会在项目输出路径之外写文件。

* `ignore`: A list of globs to exclude.

  `ignore`：要排除的 glob 列表。

For example, the default asset paths can be represented in more detail using the following objects.

例如，可以使用如下对象来更详细地表达默认的资产路径。

<code-example language="json">
"assets": [
  { "glob": "**/*", "input": "src/assets/", "output": "/assets/" },
  { "glob": "favicon.ico", "input": "src/", "output": "/" }
]

</code-example>

You can use this extended configuration to copy assets from outside your project.
For example, the following configuration copies assets from a node package:

你可以使用此扩展配置从项目外部复制资产。例如，以下配置会从 node 包中复制资产：

<code-example language="json">
"assets": [
 { "glob": "**/*", "input": "./node_modules/some-package/images", "output": "/some-package/" },
]

</code-example>

The contents of `node_modules/some-package/images/` will be available in `dist/some-package/`.

`node_modules/some-package/images/` 中的内容将会复制到 `dist/some-package/` 中。

The following example uses the `ignore` field to exclude certain files in the assets folder from being copied into the build:

下面的例子使用 `ignore` 字段排除了 assets 文件夹中的某些特定文件，防止它们被复制到 build 中：

<code-example language="json">
"assets": [
 { "glob": "**/*", "input": "src/assets/", "ignore": ["**/*.svg"], "output": "/assets/" },
]

</code-example>

{@a style-script-config}

### Styles and scripts configuration

### 样式和脚本配置

An array entry for the `styles` and `scripts` options can be a simple path string, or an object that points to an extra entry-point file.
The associated builder will load that file and its dependencies as a separate bundle during the build.
With a configuration object, you have the option of naming the bundle for the entry point, using a `bundleName` field.

`styles` 和 `scripts` 选项的数组型条目可以是简单的路径字符串，也可以是指向额外入口点文件的对象。
其关联的构建器将在构建过程中将该文件及其依赖项作为单独的捆绑包进行加载。
对于配置对象，你可以选择使用 `bundleName` 字段为该入口点命名捆绑包。

The bundle is injected by default, but you can set `inject` to false to exclude the bundle from injection.
For example, the following object values create and name a bundle that contains styles and scripts, and excludes it from injection:

默认情况下捆绑包会被注入这里，但是你可以将 `inject` 设置为 false，以将捆绑包从注入中排除。例如，以下对象值将创建并命名包含样式和脚本的包，并将其从注入中排除：

<code-example language="json">

   "styles": [
     { "input": "src/external-module/styles.scss", "inject": false, "bundleName": "external-module" }
   ],
   "scripts": [
     { "input": "src/external-module/main.js", "inject": false, "bundleName": "external-module" }
   ]

</code-example>

You can mix simple and complex file references for styles and scripts.

你可以混合使用简单和复杂的文件引用来获取样式和脚本。

<code-example language="json">

"styles": [
  "src/styles.css",
  "src/more-styles.css",
  { "input": "src/lazy-style.scss", "inject": false },
  { "input": "src/pre-rename-style.scss", "bundleName": "renamed-style" },
]

</code-example>

{@a style-preprocessor}

#### Style preprocessor options

#### 样式预处理器选项

In Sass and Stylus you can make use of the `includePaths` functionality for both component and global styles, which allows you to add extra base paths that will be checked for imports.

在 Sass 和 Stylus 中，你可以同时使用组件样式和全局样式的 `includePaths` 功能，从而可以添加将用来检查导入的额外基本路径。

To add paths, use the `stylePreprocessorOptions` option:

要添加路径，请使用 `stylePreprocessorOptions` 选项：

<code-example language="json">

"stylePreprocessorOptions": {
  "includePaths": [
    "src/style-paths"
  ]
}

</code-example>

Files in that folder, such as `src/style-paths/_variables.scss`, can be imported from anywhere in your project without the need for a relative path:

该文件夹中的文件，例如 `src/style-paths/_variables.scss`，可以从项目中的任何位置导入，而无需相对路径：

```ts

// src/app/app.component.scss
// A relative path works
@import '../style-paths/variables';
// But now this works as well
@import 'variables';

```

Note that you will also need to add any styles or scripts to the `test` builder if you need them for unit tests.
See also [Using runtime-global libraries inside your app](guide/using-libraries#using-runtime-global-libraries-inside-your-app).

请注意，如果需要将其用于单元测试，则还需要将这些样式或脚本添加到 `test` 构建器。另请参阅[在应用程序内部使用运行时全局库](guide/using-libraries#using-runtime-global-libraries-inside-your-app)。

{@a optimize-and-srcmap}

### Optimization and source map configuration

### 优化和 sourceMap 配置

The `optimization` and `sourceMap` command options are simple Boolean flags.
You can supply an object as a configuration value for either of these to provide more detailed instruction.

`optimization` 和 `sourceMap` 命令选项是简单的布尔标志。你可以为这些对象中的任何一个提供对象作为配置值，以提供更详细的说明。

* The flag `--optimization="true"` applies to both scripts and styles. You can supply a value such as the following to apply optimization to one or the other:

  标志 `--optimization="true"` 适用于脚本和样式。你可以提供如下值来对一个或另一个进行优化：

<code-example language="json">

   "optimization": { "scripts": true, "styles": false }

</code-example>

* The flag `--sourceMap="true"` outputs source maps for both scripts and styles.
You can configure the option to apply to one or the other.
You can also choose to output hidden source maps, or resolve vendor package source maps.
For example:

  标志 `--sourceMap="true"` 输出脚本和样式的源码映射。你可以配置该选项以将其应用于一个或另一个。你还可以选择输出隐藏的源码映射，或解析供应商软件包的源码映射。例如：

<code-example language="json">

   "sourceMap": { "scripts": true, "styles": false, "hidden": true, "vendor": true }

</code-example>

<div class="alert is-helpful">

   When using hidden source maps, source maps will not be referenced in the bundle.
   These are useful if you only want source maps to map error stack traces in error reporting tools,
   but don't want to expose your source maps in the browser developer tools.

   使用隐藏的源码映射时，捆绑包中不会引用源码映射。如果仅希望源映射在错误报告工具中映射错误堆栈跟踪，而又不想在浏览器开发人员工具中公开源映射，则这些选项很有用。

For [Universal](guide/glossary#universal), you can reduce the code rendered in the HTML page by
   setting styles optimization to `true` and styles source maps to `false`.

   对于 [Universal](guide/glossary#universal)，可以通过将样式优化设置为 `true` 和将样式的源码映射设置为 `false` 来减少 HTML 页面中渲染的代码。

</div>
