# Angular CLI builders

# Angular CLI 构建器（Builder）

A number of Angular CLI commands run a complex process on your code, such as linting, building, or testing.
The commands use an internal tool called Architect to run *CLI builders*, which apply another tool to accomplish the desired task.

很多 Angular CLI 命令都要在你的代码上执行一些复杂的处理，比如风格检查（lint）构建或测试。这些命令会通过一个叫做建筑师（Architect）的内部工具来运行 *CLI 构建器*，而这些构建器会运用一些第三方工具来完成目标任务。

With Angular version 8, the CLI Builder API is stable and available to developers who want to customize the Angular CLI by adding or modifying commands. For example, you could supply a builder to perform an entirely new task, or to change which third-party tool is used by an existing command.

在 Angular 的版本 8 中，CLI 构建器的 API 是稳定的，想要通过添加或修改命令来自定义 Angular CLI 的开发人员可以使用它。例如，你可以提供一个构建器来执行全新的任务，或者更改一个现有命令所使用的第三方工具。

This document explains how CLI builders integrate with the workspace configuration file, and shows how you can create your own builder.

本文档介绍了 CLI 构建器是如何与工作区配置文件集成的，还展示了如何创建你自己的构建器。

<div class="alert is-helpful">

   You can find the code from the examples used here in [this GitHub repository](https://github.com/mgechev/cli-builders-demo).

   你可以在[这个 GitHub 仓库](https://github.com/mgechev/cli-builders-demo)中的例子中找到代码。

</div>

## CLI builders

## CLI 构建器

The internal Architect tool delegates work to handler functions called [*builders*](guide/glossary#builder).
A builder handler function receives two arguments; a set of input `options` (a JSON object), and a `context` (a `BuilderContext` object).

内部建筑师工具会把工作委托给名叫[*构建器*](guide/glossary#builder)的处理器函数。处理器函数接收两个参数：一组 `options` 输入（JSON 对象）和一个 `context`（`BuilderContext` 对象）。

The separation of concerns here is the same as with [schematics](guide/glossary#schematic), which are used for other CLI commands that touch your code (such as `ng generate`).

这里对关注点的分离和[原理图](guide/glossary#schematic)中是一样的，它也适用于其它要接触（touch）代码的 CLI 命令（例如 `ng generate`）。

* Options are given by the CLI user, context is provided by and provides access to the CLI Builder API, and the developer provides the behavior.

  选项由 CLI 用户提供，上下文由 CLI 构建器提供，并提供对 CLI 构建器 API 的访问，而开发人员提供了处理函数的行为。

* The `BuilderContext` object provides access to the scheduling method, `BuilderContext.scheduleTarget()`. The scheduler executes the builder handler function with a given [target configuration](guide/glossary#target).

  `BuilderContext` 对象提供了访问调度方法 `BuilderContext.scheduleTarget()` 的途径。调度器会用指定的[目标配置](guide/glossary#target)来执行构建器处理函数。

The builder handler function can be synchronous (return a value) or asynchronous (return a Promise), or it can watch and return multiple values (return an Observable).
The return value or values must always be of type `BuilderOutput`.
This object contains a Boolean `success` field and an optional `error` field that can contain an error message.

这个构建器处理函数可以是同步的（返回一个值）或异步的（返回一个 Promise），也可以监视并返回多个值（返回一个 Observable）。最终返回的值全都是 `BuilderOutput` 类型的。该对象包含一个逻辑字段 `success` 和一个可以包含错误信息的可选字段 `error`。

Angular provides some builders that are used by the CLI for commands such as `ng build`, `ng test`, and `ng lint`.
Default target configurations for these and other built-in CLI builders can be found (and customized) in the "architect" section of the [workspace configuration file](guide/workspace-config), `angular.json`.
You can also extend and customize Angular by creating your own builders, which you can run using the [`ng run` CLI command](cli/run).

Angular 提供了一些构建器，供 CLI 命令使用，如 `ng build`、`ng test` 和 `ng lint` 等。这些内置 CLI 构建器的默认目标配置可以在[工作空间配置文件](guide/workspace-config) `angular.json` 的 `architect` 部分找到（并进行自定义）。可以通过创建自己的构建器来扩展和自定义 Angular，你可以使用 [`ng run` CLI 命令](cli/run)来运行你自己的构建器。

### Builder project structure

### 构建器的项目结构

A builder resides in a "project" folder that is similar in structure to an Angular workspace, with global configuration files at the top level, and more specific configuration in a source folder with the code files that define the behavior.
For example, your `myBuilder` folder could contain the following files.

构建器位于一个 `project` 文件夹中，该文件夹的结构类似于 Angular 工作区，包括位于顶层的全局配置文件，以及位于工作代码所在源文件夹中的更具体的配置。例如，`myBuilder` 文件夹中可能包含如下文件。

| FILES                    | PURPOSE                                                                                      |
| :----------------------- | :------------------------------------------------------------------------------------------- |
| 文件                     | 目的                                                                                         |
| `src/my-builder.ts`      | Main source file for the builder definition.                                                 |
| `src/my-builder.ts`      | 这个构建器定义的主要源码。                                                                |
| `src/my-builder.spec.ts` | Source file for tests.                                                                       |
| `src/my-builder.spec.ts` | 测试的源码。                                                                              |
| `src/schema.json`        | Definition of builder input options.                                                         |
| `src/schema.json`        | 构建器输入选项的定义。                                                                     |
| `builders.json`          | Testing configuration.                                                                       |
| `builders.json`          | 测试配置。                                                                                  |
| `package.json`           | Dependencies. See <https://docs.npmjs.com/files/package.json>.                               |
| `package.json`           | 依赖包。参见<https://docs.npmjs.com/files/package.json>。                                  |
| `tsconfig.json`          | [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). |
| `tsconfig.json`          | [TypeScript 配置文件](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)        |

You can publish the builder to `npm` (see [Publishing your Library](https://angular.io/guide/creating-libraries#publishing-your-library)). If you publish it as `@example/my-builder`, you can install it using the following command.

你可以把构建器发布到 `npm`（请参阅[发布你的库](guide/creating-libraries#publishing-your-library)）。如果把它发布成了 `@example/my-builder`，就可以使用下面的命令来安装它。

<code-example language="sh">

npm install @example/my-builder

</code-example>

## Creating a builder

## 创建构建器

As an example, let's create a builder that executes a shell command.
To create a builder, use the `createBuilder()` CLI Builder function, and return a `Promise<BuilderOutput>` object.

举个例子，让我们创建一个用来执行 shell 命令的构建器。要创建构建器，请使用 CLI 构建器函数 `createBuilder()`，并返回一个 `Promise<BuilderOutput>` 对象。

<code-example 
  path="cli-builder/src/my-builder.ts" 
  header="src/my-builder.ts (builder skeleton)" 
  region="builder-skeleton">
</code-example>

Now let’s add some logic to it.
The following code retrieves the command and arguments from the user options, spawns the new process, and waits for the process to finish.
If the process is successful (returns a code of 0), it resolves the return value.

现在，让我们为它添加一些逻辑。下列代码会从用户选项中检索命令和参数、生成新进程，并等待该进程完成。如果进程成功（返回代码为 0），就会解析成返回的值。

<code-example 
  path="cli-builder/src/my-builder.ts" 
  header="src/my-builder.ts (builder)" 
  region="builder">
</code-example>

### Handling output

### 处理输出

By default, the `spawn()` method outputs everything to the process standard output and error.
To make it easier to test and debug, we can forward the output to the CLI Builder logger instead.
This also allows the builder itself to be executed in a separate process, even if the standard output and error are deactivated (as in an [Electron app](https://electronjs.org/)).

默认情况下，`spawn()` 方法会把所有内容输出到进程标准输出（stdout）和标准错误（stderr）中。为了便于测试和调试，我们可以把输出转发给 CLI 构建器的 Logger。这样还能让构建器本身可以在一个单独的进程中执行，即使其标准输出和标准错误被停用了也无所谓（就像在 [Electron 应用中一样](https://electronjs.org/)）。

We can retrieve a Logger instance from the context.

我们可以从上下文中检索一个 Logger 实例。

<code-example 
  path="cli-builder/src/my-builder.ts" 
  header="src/my-builder.ts (handling output)" 
  region="handling-output">
</code-example>

### Progress and status reporting

### 进度和状态报告

The CLI Builder API includes progress and status reporting tools, which can provide hints for certain functions and interfaces.

CLI 构建器 API 包含一些进度报告和状态报告工具，可以为某些函数和接口提供提示信息。

To report progress, use the `BuilderContext.reportProgress()` method, which takes a current value, (optional) total, and status string as arguments.
The total can be any number; for example, if you know how many files you have to process, the total could be the number of files, and current should be the number processed so far.
The status string is unmodified unless you pass in a new string value.

要报告进度，请使用 `BuilderContext.reportProgress()` 方法，它接受一个当前值（value）、一个（可选的）总值（total）和状态（status）字符串作为参数。总值可以是任意数字，例如，如果你知道有多少个文件需要处理，那么总值可能是这些文件的数量，而当前值是已处理过的数量。除非传入了新的字符串，否则这个状态字符串不会改变。

You can see an [example](https://github.com/angular/angular-cli/blob/ba21c855c0c8b778005df01d4851b5a2176edc6f/packages/angular_devkit/build_angular/src/tslint/index.ts#L107) of how the `tslint` builder reports progress.

你可以看看 `tslint` 构建器如何报告进度的[例子](https://github.com/angular/angular-cli/blob/ba21c855c0c8b778005df01d4851b5a2176edc6f/packages/angular_devkit/build_angular/src/tslint/index.ts#L107)。

In our example, the shell command either finishes or is still executing, so there’s no need for a progress report, but we can report status so that a parent builder that called our builder would know what’s going on.
Use the `BuilderContext.reportStatus()` method to generate a status string of any length.
(Note that there’s no guarantee that a long string will be shown entirely; it could be cut to fit the UI that displays it.)
Pass an empty string to remove the status.

在我们的例子中，shell 命令或者已完成或者正在执行，所以不需要进度报告，但是可以报告状态，以便调用此构建器的父构建器知道发生了什么。可以用 `BuilderContext.reportStatus()` 方法生成一个任意长度的状态字符串。（注意，无法保证长字符串会完全显示出来，可以裁剪它以适应界面显示。）传入一个空字符串可以移除状态。

<code-example 
  path="cli-builder/src/my-builder.ts" 
  header="src/my-builder.ts (progess reporting)" 
  region="progress-reporting">
</code-example>

## Builder input

## 构建器的输入

You can invoke a builder indirectly through a CLI command, or directly with the Angular CLI `ng run` command.
In either case, you must provide required inputs, but can allow other inputs to default to values that are pre-configured for a specific [*target*](guide/glossary#target), provide a pre-defined, named override configuration, and provide further override option values on the command line.

你可以通过 CLI 命令间接调用一个构建器，也可以直接用 Angular CLI 的 `ng run` 命令来调用它。无论哪种情况，你都必须提供所需的输入，但是可以用特定[*目标*](guide/glossary#target)中预配置的值作为其默认值，然后指定一个预定义的、指定的配置进行覆盖，最后在命令行中进一步覆盖这些选项的值。

### Input validation

### 对输入的验证

You define builder inputs in a JSON schema associated with that builder.
The Architect tool collects the resolved input values into an `options` object, and validates their types against the schema before passing them to the builder function.
(The Schematics library does the same kind of validation of user input).

你可以在该构建器的相关 JSON 模式中定义构建器都有哪些输入。建筑师工具会把解析后的输入值收集到一个 `options` 对象中，并在将其传给构建器函数之前先根据这个模式验证它们的类型。（Schematics 库也对用户输入做了同样的验证）。

For our example builder, we expect the `options` value to be a `JsonObject` with two keys: a `command` that is a string, and an `args` array of string values.

对于这个示例构建器，我们希望 `options` 值是带有两个键的 `JsonObject`：一个是字符串型的 `command`，一个是字符串数组型的 `args`。

We can provide the following schema for type validation of these values.

我们可以提供如下模式来对这些值的类型进行验证。

<code-example language="json" header="command/schema.json">
{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "properties": {
    "command": {
      "type": "string"
    },
    "args": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}

</code-example>

<div class="alert is-helpful">

This is a very simple example, but the use of a schema for validation can be very powerful.
For more information, see the [JSON schemas website](http://json-schema.org/).

这是一个非常简单的例子，但这种模式验证也可以非常强大。要了解更多信息，请参阅 [JSON 模式网站](http://json-schema.org/)。

</div>

To link our builder implementation with its schema and name, we need to create a *builder definition* file, which we can point to in `package.json`.

要把构建器的实现与它的模式和名称关联起来，我们需要创建一个*构建器定义*文件，可以在 `package.json` 中指向该文件。

Create a file named `builders.json` file that looks like this.

创建一个名为 `builders.json` 文件，它看起来像这样。

<code-example language="json" header="builders.json">

{
  "builders": {
    "command": {
      "implementation": "./command",
      "schema": "./command/schema.json",
      "description": "Runs any command line in the operating system."
    }
  }
}

</code-example>

In the `package.json` file, add a `builders` key that tells the Architect tool where to find our builder definition file.

在 `package.json` 文件中，添加一个 `builders` 键，告诉建筑师工具可以在哪里找到这个构建器定义文件。

<code-example language="json" header="package.json">

{
  "name": "@example/command-runner",
  "version": "1.0.0",
  "description": "Builder for Command Runner",
  "builders": "builders.json",
  "devDependencies": {
    "@angular-devkit/architect": "^1.0.0"
  }
}

</code-example>

The official name of our builder is now ` @example/command-runner:command`.
The first part of this is the package name (resolved using node resolution), and the second part is the builder name (resolved using the `builders.json` file).

现在，这个构建器的正式名字是 `@example/command-runner:command`。第一部分是包名（使用 node 方案进行解析），第二部分是构建器名称（使用 `builders.json` 文件进行解析）。

Using one of our `options` is very straightforward, we did this in the previous section when we accessed `options.command`.

使用某个 `options` 是非常简单的。在上一节，我们就曾访问过 `options.command`。

<code-example 
  path="cli-builder/src/my-builder.ts" 
  header="src/my-builder.ts (report status)" 
  region="report-status">
</code-example>

### Target configuration

### 目标配置

A builder must have a defined target that associates it with a specific input configuration and [project](guide/glossary#project).

构建器必须有一个已定义的目标，此目标会把构建器与特定的输入配置和[项目](guide/glossary#project)关联起来。

Targets are defined in the `angular.json` [CLI configuration file](guide/workspace-config).
A target specifies the builder to use, its default options configuration, and named alternative configurations.
The Architect tool uses the target definition to resolve input options for a given run.

目标是在 [CLI 配置文件](guide/workspace-config) `angular.json` 中定义的。目标用于指定要使用的构建器、默认的选项配置，以及指定的备用配置。建筑师工具使用目标定义来为一次特定的执行解析输入选项。

The  `angular.json` file has a section for each project, and the "architect" section of each project configures targets for builders used by CLI commands such as 'build', 'test', and 'lint'.
By default, for example, the `build` command runs the builder  `@angular-devkit/build-angular:browser` to perform the build task, and passes in default option values as specified for the `build` target in   `angular.json`.

`angular.json` 文件中为每个项目都有一节配置，每个项目的 `architect` 部分都会为 CLI 命令（例如 `build`、`test` 和 `lint`）配置构建器目标。默认情况下，`build` 命令会运行 `@angular-devkit/build-angular:browser` 构建器来执行 `build` 任务，并传入 `angular.json` 中为 `build` 目标指定的默认选项值。

<code-example language="json" header="angular.json">
{
  "myApp": {
    ...
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
          "outputPath": "dist/myApp",
          "index": "src/index.html",
          ...
        },
        "configurations": {
          "production": {
            "fileReplacements": [
              {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }
            ],
            "optimization": true,
            "outputHashing": "all",
            ...
          }
        }
      },
      ...

</code-example>

The command passes the builder the set of default options specified in the "options" section.
If you pass the `--configuration=production` flag, it uses the override values specified in the `production` alternative configuration.
You can specify further option overrides individually on the command line.
You might also add more alternative configurations to the `build` target, to define other environments such as `stage` or `qa`.

该命令会给构建器传递 `options` 节中指定的一组默认选项。如果你传入了 `--configuration=production` 标志，它就会使用 `production` 备用配置中指定的值进行覆盖。你可以在命令行中单独指定其它选项进行覆盖，还可以为 `build` 目标添加更多备用配置，以定义其它环境，比如 `stage` 或 `qa`。

#### Target strings

#### 目标字符串

The generic `ng run` CLI command takes as its first argument a target string of the form *project:target[:configuration]*.

通用的 `ng run` CLI 命令的第一个参数是形如 *project:target[:configuration]* 的目标字符串。

* *project*: The name of the Angular CLI project that the target is associated with.

  *project*：与此目标关联的 Angular CLI 项目的名称。

* *target*: A named builder configuration from the `architect` section of the `angular.json` file.

  *target*：`angular.json` 文件 `architect` 下的指定构建器配置。

* *configuration*: (optional) The name of a specific configuration override for the given target, as defined in the `angular.json` file.

  *configuration*：（可选）用于覆盖指定目标的具体配置名称，如 `angular.json` 文件中的定义。

If your builder calls another builder, it may need to read a passed target string.
You can parse this string into an object by using the `targetFromTargetString()` utility function from `@angular-devkit/architect`.

如果你的构建器调用另一个构建器，它可能需要读取一个传入的目标字符串。你可以使用 `@angular-devkit/architect` 中的工具函数 `targetFromTargetString()` 把这个字符串解析成一个对象。

## Schedule and run

## 调度并运行

Architect runs builders asynchronously.
To invoke a builder, you schedule a task to be run when all configuration resolution is complete.

建筑师会异步运行构建器。要调用某个构建器，就要在所有配置解析完成之后安排一个要运行的任务。

The builder function is not executed until the scheduler returns a `BuilderRun` control object.
The CLI typically schedules tasks by calling the `BuilderContext.scheduleTarget()` function, and then resolves input options using the target definition in the `angular.json` file.

在调度器返回 `BuilderRun` 控件对象之前，不会执行该构建器函数。CLI 通常会通过调用 `BuilderContext.scheduleTarget()` 函数来调度任务，然后使用 `angular.json` 文件中的目标定义来解析输入选项。

Architect resolves input options for a given target by taking the default options object, then overwriting values from the configuration used (if any), then further overwriting values from the overrides object passed to `BuilderContext.scheduleTarget()`.
For the Angular CLI, the overrides object is built from command line arguments.

建筑师会接受默认的选项对象来解析指定目标的输入选项，然后覆盖所用配置中的值（如果有的话），然后再从传给 `BuilderContext.scheduleTarget()` 的覆盖对象中覆盖这些值。对于 Angular CLI，覆盖对象是从命令行参数中构建的。

Architect validates the resulting options values against the schema of the builder.
If inputs are valid, Architect creates the context and executes the builder.

建筑师会根据构建器的模式对生成的选项值进行验证。如果输入有效，建筑师会创建上下文并执行该构建器。

For more information see [Workspace Configuration](guide/workspace-config).

欲知详情，请参阅[工作空间配置](guide/workspace-config)。

<div class="alert is-helpful">

   You can also invoke a builder directly from another builder or test by calling `BuilderContext.scheduleBuilder()`.
   You pass an `options` object directly to the method, and those option values are validated against the schema of the builder without further adjustment.

   你还可以通过调用 `BuilderContext.scheduleBuilder()` 从另一个构建器或测试中调用某个构建器。你可以直接把 `options` 对象传给该方法，并且这些选项值会根据这个构建器的模式进行验证，而无需进一步调整。

   Only the  `BuilderContext.scheduleTarget()` method resolves the configuration and overrides through the `angular.json` file.

   只有 `BuilderContext.scheduleTarget()` 方法来解析这些配置和并通过 `angular.json` 文件进行覆盖。

</div>

### Default architect configuration

### 默认建筑师配置

Let’s create a simple `angular.json` file that puts target configurations into context.

让我们创建一个简单的 `angular.json` 文件，它会把目标配置放到上下文中。

We can publish the builder to npm (see [Publishing your Library](guide/creating-libraries#publishing-your-library)), and install it using the following command:

我们可以把这个构建器发布到 npm（请参阅[发布你的库](guide/creating-libraries#publishing-your-library)），并使用如下命令来安装它：

<code-example language="sh">

npm install @example/command-runner

</code-example>

If we create a new project with `ng new builder-test`, the generated `angular.json` file looks something like this, with only default builder configurations.

如果我们使用 `ng new builder-test` 创建一个新项目，那么生成的 `angular.json` 文件就是这样的，它只有默认的构建器参数。

<code-example language="json" header="angular.json">

{
  // ...
  "projects": {
    // ...
    "builder-test": {
      // ...
      "architect": {
        // ...
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            // ... more options...
            "outputPath": "dist/builder-test",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json"
          },
          "configurations": {
            "production": {
              // ... more options...
              "optimization": true,
              "aot": true,
              "buildOptimizer": true
            }
          }
        }
      }
    }
  }
  // ...
}

</code-example>

### Adding a target

### 添加一个目标

Let's add a new target that will run our builder to execute a particular command.
This target will tell the builder to run `touch` on a file, in order to update its modified date.

让我们添加一个新的目标来运行我们的构建器执行一个特定的命令。这个目标会告诉构建器在文件上运行 `touch`，以便更新修改过的日期。

We need to update the `angular.json` file to add a target for this builder to the "architect" section of our new project.

我们需要更新 `angular.json` 文件，把这个构建器的目标添加到新项目的 `architect` 部分。

* We'll add a new target section to the "architect" object for our project.

  我们会为项目的 `architect` 对象添加一个新的目标小节。

* The target named "touch" uses our builder, which we published to `@example/command-runner`. (See [Publishing your Library](guide/creating-libraries#publishing-your-library))

  名为 `touch` 的目标使用了我们的构建器，它发布到了 `@example/command-runner`。（参见[发布你的库](guide/creating-libraries#publishing-your-library) ）

* The options object provides default values for the two inputs that we defined; `command`, which is the Unix command to execute, and `args`, an array that contains the file to operate on.

  这个配置对象为我们定义的两个输入提供了默认值：`command`（要执行的 Unix 命令）和 `args` （包含要操作的文件的数组）。

* The configurations key is optional, we'll leave it out for now.

  这些配置键都是可选的，但我们先不展开。

<code-example language="json" header="angular.json">

{
  "projects": {
    "builder-test": {
      "architect": {
        "touch": {
          "builder": "@example/command-runner:command",
          "options": {
            "command": "touch",
            "args": [
              "src/main.ts"
            ]
          }
        },
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/builder-test",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json"
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "aot": true,
              "buildOptimizer": true
            }
          }
        }
      }
    }
  }
}

</code-example>

### Running the builder

### 运行这个构建器

To run our builder with the new target's default configuration, use the following CLI command in a Linux shell.

要想使用这个新目标的默认配置运行我们的构建器，请在 Linux shell 中使用以下 CLI 命令。

<code-example language="sh">

   ng run builder-test:touch

</code-example>

This will run the `touch` command on the `src/main.ts` file.

这将在 `src/main.ts` 文件上运行 `touch` 命令。

You can use command-line arguments to override the configured defaults.
For example, to run with a different `command` value, use the following CLI command.

你可以使用命令行参数来覆盖已配置的默认值。例如，要改用其它 `command` 值运行，请使用以下 CLI 命令。

<code-example language="sh">

ng run builder-test:touch --command=ls

</code-example>

This will call the `ls` command instead of the `touch` command.
Because we did not override the *args* option, it will list information about the `src/main.ts` file (the default value provided for the target).

这将调用 `ls` 命令而不是 `touch` 命令。因为我们没有覆盖 *args* 选项，所以它会列出 `src/main.ts` 文件的信息（提供给该目标的默认值）。

## Testing a builder

## 测试一个构建器

Use integration testing for your builder, so that you can use the Architect scheduler to create a context, as in this [example](https://github.com/mgechev/cli-builders-demo).

对构建器进行集成测试，以便你可以使用建筑师的调度器来创建一个上下文，就像这个[例子](https://github.com/mgechev/cli-builders-demo)中一样。

* In the builder source directory, we have created a new test file `my-builder.spec.ts`. The code creates new instances of `JsonSchemaRegistry` (for schema validation), `TestingArchitectHost` (an in-memory implementation of `ArchitectHost`), and `Architect`.

  在构建器的源码目录下，我们创建了一个新的测试文件 `index.spec.ts`。该代码创建了 `JsonSchemaRegistry`（用于模式验证）、`TestingArchitectHost`（对 `ArchitectHost` 的内存实现）和 `Architect` 的新实例。

* We've added a `builders.json` file next to the builder's [`package.json` file](https://github.com/mgechev/cli-builders-demo/blob/master/command-builder/builders.json), and modified the package file to point to it.

  我们紧挨着这个构建器的 [`package.json`](https://github.com/mgechev/cli-builders-demo/blob/master/command-builder/builders.json) 文件添加了一个 `builders.json` 文件，并修改了 `package.json` 文件以指向它。

Here’s an example of a test that runs the command builder.
The test uses the builder to run the `node --print 'foo'` command, then validates that the `logger` contains an entry for `foo`.

下面是运行该命令构建器的测试范例。该测试使用该构建器来运行 `node --print 'foo'` 命令，然后验证 `logger` 中是否包含一条 `foo` 记录。

<code-example 
  path="cli-builder/src/my-builder.spec.ts" 
  header="src/my-builder.spec.ts">
</code-example>

<div class="alert is-helpful">

   When running this test in your repo, you need the [`ts-node`](https://github.com/TypeStrong/ts-node) package. You can avoid this by renaming `my-builder.spec.ts` to `my-builder.spec.js`.

   在你的仓库中运行这个测试时，需要使用 [`ts-node`](https://github.com/TypeStrong/ts-node) 包。你可以把 `index.spec.ts` 重命名为 `index.spec.js` 来回避它。

</div>

### Watch mode

### 监视（watch）模式

Architect expects builders to run once (by default) and return.
This behavior is not entirely compatible with a builder that watches for changes (like Webpack, for example).
Architect can support watch mode, but there are some things to look out for.

建筑师希望构建器运行一次（默认情况下）并返回。这种行为与那些需要监视文件更改的构建器（例如 Webpack）并不完全兼容。建筑师可以支持监视模式，但要注意一些问题。

* To be used with watch mode, a builder handler function should return an Observable. Architect subscribes to the Observable until it completes and might reuse it if the builder is scheduled again with the same arguments.

  要在监视模式下使用，构建器处理函数应返回一个 Observable。建筑师会订阅这个 Observable，直到这个 Observable 完成（complete）为止。此外，如果使用相同的参数再次调度这个构建器，建筑师还能重用这个 Observable。

* The builder should always emit a `BuilderOutput` object after each execution. Once it’s been executed, it can enter a watch mode, to be triggered by an external event. If an event triggers it to restart, the builder should execute the `BuilderContext.reportRunning()` function to tell Architect that it is running again. This prevents Architect from stopping the builder if another run is scheduled.

  这个构建器应该总是在每次执行后发出一个 `BuilderOutput` 对象。一旦它被执行，就会进入一个由外部事件触发的监视模式。如果一个事件导致它重启，那么此构建器应该执行 `BuilderContext.reportRunning()` 函数来告诉建筑师再次运行它。如果调度器还计划了另一次运行，就会阻止建筑师停掉这个构建器。

When your builder calls `BuilderRun.stop()` to exit watch mode, Architect unsubscribes from the builder’s Observable and calls the builder’s teardown logic to clean up.
(This behavior also allows for long running builds to be stopped and cleaned up.)

当你的构建器通过调用 `BuilderRun.stop()` 来退出监视模式时，建筑师会从构建器的 Observable 中取消订阅，并调用构建器的退出逻辑进行清理。（这种行为也允许停止和清理运行时间过长的构建。）

In general, if your builder is watching an external event, you should separate your run into three phases.

一般来说，如果你的构建器正在监视一个外部事件，你应该把你的运行分成三个阶段。

1. **Running**
   For example, webpack compiles. This ends when webpack finishes and your builder emits a `BuilderOutput` object.

   **运行**，例如 webpack 编译。这会在 webpack 完成并且你的构建器发出 `BuilderOutput` 对象时结束。

1. **Watching**
   Between two runs, watch an external event stream. For example, webpack watches the file system for any changes. This ends when webpack restarts building, and `BuilderContext.reportRunning()` is called. This goes back to step 1.

   **监视**，在两次运行之间监视外部事件流。例如，webpack 会监视文件系统是否发生了任何变化。这会在 webpack 重启构建时结束，并调用 `BuilderContext.reportRunning()`。这样就会再回到第 1 步。

1. **Completion**
   Either the task is fully completed (for example, webpack was supposed to run a number of times), or the builder run was stopped (using `BuilderRun.stop()`). Your teardown logic is executed, and Architect unsubscribes from your builder’s Observable.

   **完成**，任务完全完成（例如，webpack 应运行多次），或者构建器停止运行（使用 `BuilderRun.stop()`）。你的退出逻辑被调用了，建筑师也从你的构建器的 Observable 中取消了订阅。

## Summary

## 总结

The CLI Builder API provides a new way of changing the behavior of the Angular CLI by using builders to execute custom logic.

CLI 构建器 API 提供了一种通过构建器执行自定义逻辑，以改变 Angular CLI 行为的新方式。

* Builders can be synchronous or asynchronous, execute once or watch for external events, and can schedule other builders or targets.

  构建器既可以是同步的，也可以是异步的，它可以只执行一次也可以监视外部事件，还可以调度其它构建器或目标。

* Builders have option defaults specified in the `angular.json` configuration file, which can be overwritten by an alternate configuration for the target, and further overwritten by command line flags.

  构建器在 `angular.json` 配置文件中指定了选项的默认值，它可以被目标的备用配置覆盖，还可以进一步被命令行标志所覆盖。

* We recommend that you use integration tests to test Architect builders. You can use unit tests to validate the logic that the builder executes.

  我们建议你使用集成测试来测试建筑师的构建器。你还可以使用单元测试来验证这个构建器的执行逻辑。

* If your builder returns an Observable, it should clean up in the teardown logic of that Observable.

  如果你的构建器返回一个 Observable，你应该在那个 Observable 的退出逻辑中进行清理。
