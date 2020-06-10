# Building with Bazel

# 用 Bazel 进行构建

This guide explains how to build and test Angular apps with Bazel.

本章讲解了如何使用 Bazel 来构建和测试 Angular 应用。

<div class="alert is-helpful">

This guide assumes you are already familiar with developing and building Angular applications using the [CLI](cli).

本指南假设你已经熟悉如何使用 [CLI](cli) 来开发和构建 Angular 应用了。

It describes features which are part of Angular Labs, and are not considered a stable, supported API.

这里描述的这些特性是 Angular Labs 的一部分，因此不是稳定的、受支持的 API。

</div>

## Using Bazel with the Angular CLI

## 在 Angular CLI 中使用 Bazel

The `@angular/bazel` package provides a builder that allows Angular CLI to use Bazel as the build tool.

`@angular/bazel` 包提供了一个构建器，允许 Angular CLI 使用 Bazel 作为构建工具。

To opt-in an existing application, run

要有选择的为现有应用添加它，请运行

```sh
ng add @angular/bazel
```

To use Bazel in a new application, first install `@angular/bazel` globally

要在新的应用中使用 Bazel，首先要全局安装 `@angular/bazel`

```sh
npm install -g @angular/bazel
```

then create the new application with

然后使用下列命令创建新的应用

```sh
ng new --collection=@angular/bazel
```

Now when you use Angular CLI build commands such as `ng build` and `ng serve`,
Bazel is used behind the scenes.
Outputs from Bazel appear in the `dist/bin` folder.

当你使用 Angular CLI 的构建类命令时（比如 `ng build` 和 `ng serve`），Bazel 会在幕后工作。Bazel 的输出会显示在 `dist/bin` 文件夹中。

> The command-line output includes extra logging from Bazel.
> We plan to reduce this in the future.
>
> 命令行输出中还包括来自 Bazel 的额外日志记录。我们计划在未来减少这种情况。
>

### Removing Bazel

### 去掉 Bazel

If you need to opt-out from using Bazel, you can restore the backup files:

如果你不想使用 Bazel，你可以恢复备份文件：

- `/angular.json.bak` replaces `/angular.json`

  用 `/angular.json.bak` 替换 `/angular.json`

## Advanced configuration

## 高级配置

<div class="alert is-helpful">

Editing the Bazel configuration may prevent you opting out of Bazel.
Custom behaviors driven by Bazel won't be available in other Builders.

编辑这份 Bazel 配置可以防止你有选择的退出 Bazel。Bazel 驱动的自定义行为在其它构建器中是无用的。

This section assumes you are familiar with [Bazel](https://docs.bazel.build).

本节假设你熟悉 [Bazel](https://docs.bazel.build)。

</div>

You can manually adjust the Bazel configuration to:

你可以手动把 Bazel 配置调整为：

* customize the build steps

  自定义构建步骤

* parallellize the build for scale and incrementality

  构建过程并行化，以支持可延展性和增量构建

Create the initial Bazel configuration files by running the following command:

运行以下命令，创建初始的 Bazel 配置文件：

```sh
ng build --leaveBazelFilesOnDisk
```

Now you'll find new files in the Angular workspace:

在 Angular 工作区中，你会找到一些新文件：

* `/WORKSPACE` tells Bazel how to download external dependencies.

  `/WORKSPACE` 会告诉 Bazel 要如何下载外部依赖。

* `/BUILD.bazel` and `/src/BUILD.bazel` tell Bazel about your source code.

  `/BUILD.bazel` 和 `/src/BUILD.bazel` 会告诉 Bazel 你的源代码在哪里。

You can find a full-featured example with custom Bazel configurations at https://github.com/bazelbuild/rules_nodejs/tree/master/examples/angular.

你可以在 <https://github.com/bazelbuild/rules_nodejs/tree/master/examples/angular> 找到一个全功能的 Bazel 配置示例。

Documentation for using Bazel for frontend projects is linked from https://docs.bazel.build/versions/master/bazel-and-javascript.html.

<https://docs.bazel.build/versions/master/bazel-and-javascript.html> 则是一个关于如何使用 Bazel 进行前端项目的文档链接。

## Running Bazel directly

## 直接运行 Bazel

In some cases you'll want to bypass the Angular CLI builder, and run the Bazel CLI directly.
The Bazel tool is managed by the `@bazel/bazelisk` package (similar to how Node.js can be managed by `nvm`).
You can install it globally to get the `bazelisk` command in your path, or use `$(npm bin)/bazelisk` in place of bazelisk below.

在某些情况下，你会想要绕过 Angular CLI 的构建器，并直接运行 Bazel CLI。Bazel CLI 位于 `@bazel/bazel` npm 包中。你可以全局安装它，以便你能通过路径获取 `bazel` 命令，或者用 `$(npm bin)/bazel` 代替下面的 bazel。

The common commands in Bazel are:

Bazel 的常用命令有：

* `bazelisk build [targets]`: Compile the default output artifacts of the given targets.

  `bazel build [targets]`：编译指定目标的默认输出成果。

* `bazelisk test [targets]`: For whichever `*_test` targets are found in the patterns, run the tests.

  `bazel test [targets]`：对于那些符合 `*_test` 模式的目标，运行测试。

* `bazelisk run [target]`: Compile the program represented by target, and then run it.

  `bazel run [target]`：编译目标所代表的程序，然后运行它。

To repeat the command any time the inputs change (watch mode), replace `bazelisk` with `ibazel` in these commands.

要想在输入发生变化时重复执行此命令（即 watch 模式），请把这些命令中的 `bazel` 替换为 `ibazel`。

The output locations are printed in the output.

在输出中打印了输出到的位置。

Full documentation for the Bazel CLI is at https://docs.bazel.build/versions/master/command-line-reference.html.

Bazel CLI 的完整文档位于 <https://docs.bazel.build/versions/master/command-line-reference.html>。

## Querying the build graph

## 查询构建图谱

Because Bazel constructs a graph out of your targets, you can find lots of useful information.

Bazel 会根据你的目标构造一个图谱，你可以从中找到很多有用的信息。

Using the graphviz optional dependency, you'll have a program `dot`, which you can use with `bazel query`:

使用一个名叫 graphviz 的可选依赖，可以得到一个名叫 `dot` 的程序，这样你就可以用它来进行 `bazel query` 了：

```bash
$ bazel query --output=graph ... | dot -Tpng > graph.png
```

See https://docs.bazel.build/versions/master/query-how-to.html for more details on `bazel query`.

关于 `bazel query` 的详细信息，参见 <https://docs.bazel.build/versions/master/query-how-to.html>。

## Customizing `BUILD.bazel` files

## 自定义 `BUILD.bazel` 文件

"Rules" are like plugins for Bazel. Many rule sets are available. This guide documents the ones maintained by the Angular team at Google.

“规则（Rules）”就好比 Bazel 的插件。有很多可用的规则集。本指南记录了 Angular 开发组在 Google 所做的一部分工作。

Rules are used in `BUILD.bazel` files, which are markers for the packages in your workspace. Each `BUILD.bazel` file declares a separate package to Bazel, though you can have more coarse-grained distributions so that the packages you publish (for example, to `npm`) can be made up of many Bazel packages.

`BUILD.bazel` 文件中用到了一些规则，这些规则都是工作空间中各个包的标记。每个 `BUILD.bazel` 文件都会向 Bazel 声明一个单独的包。你也可以使用更粗粒度的发布方式，但这样一来你发布的包（例如，到 `npm` ）就会由很多个 Bazel 包组合而成。

In the `BUILD.bazel` file, each rule must first be imported, using the `load` statement. Then the rule is called with some attributes, and the result of calling the rule is that you've declared to Bazel how it can derive some outputs given some inputs and dependencies. Then later, when you run a `bazel` command line, Bazel loads all the rules you've declared to determine an absolute ordering of what needs to be run. Note that only the rules needed to produce the requested output will actually be executed.

在 `BUILD.bazel` 文件中，必须首先使用 `load` 语句导入每个规则。然后用一些属性调用此规则，调用此规则的结果就是向 Bazel 中声明了：当给定一些输入和依赖的时候该如何得到一些输出。然后，当你运行一个 `bazel` 命令时，Bazel 就会加载你声明过的所有规则，以确定它们在运行期间的绝对顺序。注意，只有那些在产生输出时真正起作用的规则才会被执行。

A list of common rules for frontend development is documented in the README at https://github.com/bazelbuild/rules_nodejs/.

在 [https://github.com/bazelbuild/rules_nodejs/](https://github.com/bazelbuild/rules_nodejs/) 上的 README 文件中记录了前端开发中要用到的通用规则列表。
