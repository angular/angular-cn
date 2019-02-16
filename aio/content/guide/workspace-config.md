# Angular Workspace Configuration

# Angular 工作空间配置

A file named `angular.json` at the root level of an Angular [workspace](guide/glossary#workspace) provides workspace-wide and project-specific configuration defaults for build and development tools provided by the Angular CLI. 
Path values given in the configuration are relative to the root workspace folder. 

Angular [工作空间](guide/glossary#workspace)根目录下的 `angular.json` 文件提供了全工作空间级的配置和具体项目的默认配置，供 Angular CLI 中的构建工具和开发工具使用。
此配置中所提供的路径值都是相对于工作空间根目录的。

## Overall JSON structure

## JSON 的总体结构

At the top level of `angular.json`, a few properties configure the workspace, and a `projects` section contains the remaining per-project configuration options. 

在 `angular.json` 的顶级，一些属性用于配置工作空间，其中的 `projects` 区则包含其余的针对每个项目的配置项。

* `version`: The configuration-file version.

  `version`：该配置文件的版本。

* `newProjectRoot`: Path where new projects are created. Absolute or relative to the workspace folder.

  `newProjectRoot`：用来创建新工程的位置。绝对路径或相对于工作空间目录的路径。

* `defaultProject`: Default project name to use in commands, where not provided as an argument. When you use `ng new` to create a new app in a new workspace, that app is the default project for the workspace until you change it here.

  `defaultProject`：当命令中没有指定参数时，要使用的默认工程名。当你用 `ng new` 在新的工作空间中创建新应用时，该应用就会一直作为此工作空间的默认项目，除非你到这里修改它。

* `projects` : Contains a subsection for each project (library, app, e2e test app) in the workspace, with the per-project configuration options. 

  `projects`：对于工作空间中的每个项目（库、应用、e2e 测试）都会包含一个子分区，子分区中是每个项目的配置项。

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

<div class="alert is-helpful">

  Note that the `projects` section of the configuration file does not correspond exactly to the workspace file structure. 
  * The initial app created by `ng new` is at the top level of the workspace file structure, along with its e2e app.
  * Additional apps, e2e apps, and libraries go into a `projects` folder in the workspace.

  For more information, see [Workspace and project file structure](guide/file-structure).

</div>

## Project configuration options

The following top-level configuration properties are available for each project, under `projects:<project_name>`.

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
| `root`          | The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace. |
| `sourceRoot`    | The root folder for this project's source files. |
| `projectType`   | One of "application" or "library". An application can run independently in a browser, while a library cannot. Both an app and its e2e test app are of type "application".|
| `prefix`        | A string that Angular prepends to generated selectors. Can be customized to identify an app or feature area. |
| `schematics`    | An object containing schematics that customize CLI commands for this project. |
| `architect`     | An object containing configuration defaults for Architect builder targets for this project. |

## Project tool configuration options

Architect is the tool that the CLI uses to perform complex tasks such as compilation and test running, according to provided configurations. The `architect` section contains a set of Architect *targets*. Many of the targets correspond to the CLI commands that run them. Some additional predefined targets can be run using the `ng run` command, and you can define your own targets.

Each target object specifies the `builder` for that target, which is the npm package for the tool that Architect runs. In addition, each target has an `options` section that configure default options for the target, and a `configurations` section that names and specifies alternative configurations for the target. See the example in [Build target](#build-target) below. 

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

* The `architect/serve` section overrides build defaults and supplies additional serve defaults for the `ng serve` command.  In addition to the options available for the `ng build` command, it adds options related to serving the app.

* The `architect/e2e` section overrides build-option defaults for building end-to-end testing apps using the `ng e2e` command.

* The `architect/test` section overrides build-option defaults for test builds and supplies additional test-running defaults for the `ng test` command.

* The `architect/lint` section configures defaults for options of the `ng lint` command, which performs code analysis on project source files.  The default linting tool for Angular is [TSLint](https://palantir.github.io/tslint/).

* The `architect/extract-i18n` section configures defaults for options of the `ng-xi18n` tool used by the `ng xi18n` command, which extracts marked message strings from source code and outputs translation files.

* The `architect/server` section configures defaults for creating a Universal app with server-side rendering, using the `ng run <project>:server` command. 

* The `architect/app-shell` section configures defaults for creating an app shell for a progressive web app (PWA), using the `ng run <project>:app-shell` command.

In general, the options for which you can configure defaults correspond to the command options listed in the [CLI reference page](cli) for each command. 
Note that all options in the configuration file must use [camelCase](guide/glossary#case-conventions), rather than dash-case.

{@a build-target}

## Build target

The `architect/build` section configures defaults for options of the `ng build` command. It has the following top-level properties.

| PROPERTY | DESCRIPTION |
| :-------------- | :---------------------------- |
| `builder`       | The npm package for the build tool used to create this target. The default is `@angular-devkit/build-angular:browser`, which uses the [webpack](https://webpack.js.org/) package bundler. |
| `options`       | This section contains defaults for build options, used when no named alternative configuration is specified. See [Default build options](#build-props) below. |
| `configurations`| This section defines and names alternative configurations for different intended destinations. It contains a section for each named configuration, which sets the default options for that intended environment. See [Alternate build configurations](#build-configs) below. |

{@a build-configs}

### Alternate build configurations

By default, a `production` configuration is defined, and the `ng build` command has `--prod` option that builds using this configuration. The `production` configuration sets defaults that optimize the app in a number of ways, such bundling files, minimizing excess whitespace, removing comments and dead code, and rewriting code to use short, cryptic names ("minification"). 

You can define and name additional alternate configurations (such as `stage`, for instance) appropriate to your development process. Some examples of different build configurations are `stable`, `archive` and `next` used by AIO itself, and the individual locale-specific configurations required for building localized versions of an app. For details, see [Internationalization (i18n)](guide/i18n#merge-aot). 

{@a build-props}

### Additional build and test options

The configurable options for a default or targeted build generally correspond to the options available for the [`ng build`](cli/build), [`ng serve`](cli/serve), and [`ng test`](cli/test) commands. For details of those options and their possible values, see the [CLI Reference](cli). 

Some additional options (listed below) can only be set through the configuration file, either by direct editing or with the [`ng config`](cli/config) command.

| OPTIONS PROPERTIES | DESCRIPTION |
| :------------------------- | :---------------------------- |
| `fileReplacements`         | An object containing files and their compile-time replacements. |
| `stylePreprocessorOptions` | An object containing option-value pairs to pass to style preprocessors. |
| `assets`                   | An object containing paths to static assets to add to the global context of the project. The default paths point to the project's icon file and its `assets` folder. |
| `styles`                   | An object containing style files to add to the global context of the project. Angular CLI supports CSS imports and all major CSS preprocessors: [sass/scss](http://sass-lang.com/), [less](http://lesscss.org/), and [stylus](http://stylus-lang.com/). |
| `scripts`                  | An object containing JavaScript script files to add to the global context of the project. The scripts are loaded exactly as if you had added them in a `<script>` tag inside `index.html`. |
| `budgets`                  | Default size-budget type and threshholds for all or parts of your app. You can configure the builder to report a warning or an error when the output reaches or exceeds a threshold size. See [Configure size budgets](guide/build#configure-size-budgets). (Not available in `test` section.) |
