# CLI Overview and Command Reference

# CLI 概览与命令参考手册

The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications. You can use the tool directly in a command shell, or indirectly through an interactive UI such as [Angular Console](https://angularconsole.com).

Angular CLI 是一个命令行界面工具，可用于初始化、开发、构建和维护 Angular 应用。
你可以在命令行窗口中直接使用此工具，也可以通过 [Angular Console](https://angularconsole.com) 这样的交互式界面来间接使用。

## Installing Angular CLI

## 安装 Angular CLI

Major versions of Angular CLI follow the supported major version of Angular, but minor versions can be released separately.

Angular CLI 的主版本会跟随它所支持的 Angular 主版本，不过其小版本可能会独立发布。

Install the CLI using the `npm` package manager:

使用 `npm` 包管理器来安装 CLI：

<code-example language="bash">
npm install -g @angular/cli
</code-example>

For details about changes between versions, and information about updating from previous releases,
see the Releases tab on GitHub: https://github.com/angular/angular-cli/releases

有关版本变更的详情，以及如何从以前版本升级的信息，参见 GitHub 上的 Releases 页：<https://github.com/angular/angular-cli/releases>

## Basic workflow

## 基本工作流

Invoke the tool on the command line through the `ng` executable.
Online help is available on the command line.
Enter the following to list commands or options for a given command (such as [generate](cli/generate)) with a short description.

通过 `ng` 可执行文件可以在命令行上调用此工具。
命令行中还提供了联机帮助。
输入下列命令列出命令或指定命令（如 [generate](cli/generate)）选项的简短说明。

<code-example language="bash">
ng help
ng generate --help
</code-example>

To create, build, and serve a new, basic Angular project on a development server, go to the parent directory of your new workspace use the following commands:

要想创建、构建或在开发服务器上运行一个新的、基本的 Angular 项目，请到这个新工作区的上级目录中运行下列命令：

<code-example language="bash">
ng new my-first-project
cd my-first-project
ng serve
</code-example>

In your browser, open http://localhost:4200/ to see the new app run.
When you use the [ng serve](cli/serve) command to build an app and serve it locally, the server automatically rebuilds the app and reloads the page when you change any of the source files.

在浏览器中，打开 <http://localhost:4200/> 查看运行效果。
当你使用 [ng serve](cli/serve) 命令来构建应用并在本地启动开发服务器时，服务器会自动重新构建此应用，并在修改源码时重新加载此页面。

<div class="alert is-helpful">

When you run `ng new my-first-project` a new folder, named `my-first-project`, will be created in the current working directory. Since you want to be able to create files inside that folder, make sure you have sufficient rights in the current working directory before running the command.

当你运行 `ng new my-first-project` 时，将在当前工作目录中创建一个名为 `my-first-project` 的新文件夹。由于你希望在该文件夹中创建文件，因此在运行命令之前，请确保你在当前工作目录中具有足够的权限。

If the current working directory is not the right place for your project, you can change to a more appropriate directory by running `cd <path-to-other-directory>` first.

如果当前工作目录不适合放你的项目，可以先运行 `cd <path-to-other-directory>` 来切换到更合适的目录。

</div>

## Workspaces and project files

## 工作区与项目文件

The [ng new](cli/new) command creates an *Angular workspace* folder and generates a new app skeleton.
A workspace can contain multiple apps and libraries.
The initial app created by the [ng new](cli/new) command is at the top level of the workspace.
When you generate an additional app or library in a workspace, it goes into a `projects/` subfolder.

[ng new](cli/new) 命令会创建一个 *Angular 工作区*目录，并生成一个新的应用骨架。
每个工作区中可以包含多个应用和库。
由 [ng new](cli/new) 命令创建的初始应用位于工作区的顶层。
你在工作区中生成的其它应用或库，会放在 `projects/` 子目录下。

A newly generated app contains the source files for a root module, with a root component and template.
Each app has a `src` folder that contains the logic, data, and assets.

新生成的应用中包含根模块的源码，还有根组件和模板。
每个应用都有一个 `src` 目录，其中包含逻辑、数据和静态文件。

You can edit the generated files directly, or add to and modify them using CLI commands.
Use the [ng generate](cli/generate) command to add new files for additional components and services, and code for new pipes, directives, and so on.
Commands such as [add](cli/add) and [generate](cli/generate), which create or operate on apps and libraries, must be executed from within a workspace or project folder.

你可以直接编辑这些生成的文件，也可以使用 CLI 命令来添加或修改它们。
使用 [ng generate](cli/generate) 命令也可以添加其它组件和服务，以及管道、指令的源码等。
必须在工作区或项目目录下才能执行 [add](cli/add) 或 [generate](cli/generate) 之类的命令，因为这些命令需要在应用或库上进行创建或其它操作。

* See more about the [Workspace file structure](guide/file-structure).

  欲知详情，参见[工作区的文件结构](guide/file-structure)。

### Workspace and project configuration

### 工作区与项目的配置

A single workspace configuration file, `angular.json`, is created at the top level of the workspace.
This is where you can set per-project defaults for CLI command options, and specify configurations to use when the CLI builds a project for different targets.

工作区的配置文件 `angular.json` 位于此工作区的顶层。
在这里，你可以设置全工作区范围的默认值，并指定当 CLI 为不同目标构建项目时要用到的配置。

The [ng config](cli/config) command lets you set and retrieve configuration values from the command line, or you can edit the `angular.json` file directly.
Note that option names in the configuration file must use [camelCase](guide/glossary#case-types), while option names supplied to commands can use either camelCase or dash-case.

[ng config](cli/config) 让你可以从命令行中设置和获取配置项的值。你也可以直接编辑 `angular.json` 文件。
注意，此配置文件中的选项名称必须使用[小驼峰(camelCase)形式](guide/glossary#case-types)，不过当在命令行中提供它是可以使用小驼峰和中线分隔(dash-case)两种形式。

* See more about [Workspace Configuration](guide/workspace-config).

  参见 [工作区配置](guide/workspace-config)。

* See the [complete schema](https://github.com/angular/angular-cli/wiki/angular-workspace) for `angular.json`.

  参见 `angular.json` 的[完整 schema](https://github.com/angular/angular-cli/wiki/angular-workspace)。

## CLI command-language syntax

## CLI 命令语法

Command syntax is shown as follows:

命令语法如下：

`ng` *commandNameOrAlias* *requiredArg* [*optionalArg*] `[options]`

* Most commands, and some options, have aliases. Aliases are shown in the syntax statement for each command.

  大多数命令以及少量选项，会有别名。别名会显示在每个命令的语法描述中。

* Option names are prefixed with a double dash (--).
    Option aliases are prefixed with a single dash (-).
    Arguments are not prefixed.
    For example:
    <code-example language="bash">
        ng build my-app -c production
    </code-example>

  选项名带有双中线前缀（--）。
  选项别名带有单中线前缀（-）。
  参数没有前缀。
  比如：
  <code-example format="." language="bash">
      ng build my-app -c production
  </code-example>

* Typically, the name of a generated artifact can be given as an argument to the command or specified with the --name option.

  通常，生成的工件（artifact）名称可以作为命令的参数进行指定，也可以使用 --name 选项。

* Argument and option names can be given in either
[camelCase or dash-case](guide/glossary#case-types).
`--myOptionName` is equivalent to `--my-option-name`.

  参数和选项的名称可以用[小驼峰或中线分隔的格式](guide/glossary#case-types)给出。
  `--myOptionName` 等价于 `--my-option-name`。

### Boolean and enumerated options

### 逻辑型与枚举型选项

Boolean options have two forms: `--thisOption` sets the flag, `--noThisOption` clears it.
If neither option is supplied, the flag remains in its default state, as listed in the reference documentation.

逻辑型选项有两种形式：`--thisOption` 可以设置标志，而 `--noThisOption` 可以清除标志。
如果没有提供选项，该标志就会留在文档中所列出的默认状态。

Allowed values are given with each enumerated option description, with the default value in **bold**.

每个枚举选项的描述都给出了允许的值，其默认值是**加粗显示的**。

### Relative paths

### 相对路径

Options that specify files can be given as absolute paths, or as paths relative to the current working directory, which is generally either the workspace or project root.

用来指定文件的选项可以用绝对路径，也可以用相对于当前目录的相对路径，当前目录通常是工作区或项目的根目录。

### Schematics

### 原理图（schematics）

The [ng generate](cli/generate) and  [ng add](cli/add) commands take as an argument the artifact or library to be generated or added to the current project.
In addition to any general options, each artifact or library defines its own options in a *schematic*.
Schematic options are supplied to the command in the same format as immediate command options.

[ng generate](cli/generate) 和 [ng add](cli/add) 命令会把要生成或要添加到当前项目中的工件或库作为参数。
除了通用选项之外，每个工件或库还可以用*原理图*定义自己的选项。
原理图的选项和内置命令的选项使用同样的格式。
