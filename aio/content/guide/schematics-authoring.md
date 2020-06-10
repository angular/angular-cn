# Authoring schematics

# 创作原理图

You can create your own schematics to operate on Angular projects.
Library developers typically package schematics with their libraries in order to integrate them with the Angular CLI.
You can also create stand-alone schematics to manipulate the files and constructs in Angular applications as a way of customizing them for your development environment and making them conform to your standards and constraints.
Schematics can be chained, running other schematics to perform complex operations.

你可以创建自己的原理图来对 Angular 项目进行操作。库开发人员通常会把这些原理图与他们的库打包在一起，以便把它们与 Angular CLI 集成在一起。你也可以创建独立的原理图来操作 Angular 应用中的文件和目录结构，以便为你的开发环境定制它们，并让它们符合你的标准和约束。多个原理图还可以串联起来，通过运行其它原理图来完成复杂的操作。

Manipulating the code in an application has the potential to be both very powerful and correspondingly dangerous.
For example, creating a file that already exists would be an error, and if it was applied immediately, it would discard all the other changes applied so far.
The Angular Schematics tooling guards against side effects and errors by creating a virtual file system.
A schematic describes a pipeline of transformations that can be applied to the virtual file system.
When a schematic runs, the transformations are recorded in memory, and only applied in the real file system once they're confirmed to be valid.

在应用程序中操作代码可能既强大又危险。例如，创建一个已存在的文件会出错，如果出现这种情况，就应该放弃已应用的所有其它更改。Angular 原理图工具通过创建虚拟文件系统来防止副作用和错误。原理图描述了一个可应用于虚拟文件系统的转换管道。当原理图运行时，转换就会被记录在内存中，只有当这些更改被确认有效时，才会应用到实际的文件系统中。

## Schematics concepts

## 原理图的概念

The public API for schematics defines classes that represent the basic concepts.

原理图的公共 API 定义了表达其基本概念的类。

* The virtual file system is represented by a `Tree`.   The `Tree` data structure contains a *base* (a set of files that already exists) and a *staging area* (a list of changes to be applied to the base).
When making modifications, you don't actually change the base, but add those modifications to the staging area.

  虚拟文件系统用 `Tree`（树）表示。`Tree` 数据结构包含一个*基础状态 base*（一组已经存在的文件）和一个 *暂存区 staging*（需要应用到 base 的更改列表）。在进行修改的过程中，你并没有真正改变它的 base，而是把那些修改添加到了暂存区。

* A `Rule` object defines a function that takes a `Tree`, applies transformations, and returns a new `Tree`. The main file for a schematic, `index.ts`, defines a set of rules that implement the schematic's logic.

  `Rule`（规则）对象定义了一个函数，它接受 `Tree`，进行转换，并返回一个新的 `Tree`。原理图的主文件 `index.ts` 定义了一组实现原理图逻辑的规则。

* A transformation is represented by an `Action`. There are four action types: `Create`, `Rename`, `Overwrite`, and `Delete`.

  转换由 `Action`（动作）表示。有四种动作类型：`Create`、`Rename`、`Overwrite` 和 `Delete`。

* Each schematic runs in a context, represented by a `SchematicContext` object.

  每个原理图都在一个上下文中运行，上下文由一个 `SchematicContext` 对象表示。

The context object passed into a rule provides access to utility functions and metadata that the schematic may need to work with, including a logging API to help with debugging.
The context also defines a *merge strategy* that determines how changes are merged from the staged tree into the base tree. A change can be accepted or ignored, or throw an exception.

传给规则的上下文对象可以访问该原理图可能会用到的工具函数和元数据，包括一个帮助调试的日志 API。上下文还定义了一个*合并策略*，用于确定如何将这些更改从暂存树合并到基础树中。可以接受或忽略某个更改，也可以抛出异常。

### Defining rules and actions

### 定义规则和动作

When you create a new blank schematic with the [Schematics CLI](#cli), the generated entry function is a *rule factory*.
A `RuleFactory` object defines a higher-order function that creates a `Rule`.

当你使用 [Schematics CLI](#cli) 创建一个新的空白原理图时，它所生成的入口函数就是一个*规则工厂*。`RuleFactory` 对象定义了一个用于创建 `Rule` 的高阶函数。

<code-example language="TypeScript" header="index.ts">
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// You don't have to export the function as default.
// You can also have more than one rule factory per file.
export function helloWorld(_options: any): Rule {
 return (tree: Tree, _context: SchematicContext) => {
   return tree;
 };
}
</code-example>

Your rules can make changes to your projects by calling external tools and implementing logic.
You need a rule, for example, to define how a template in the schematic is to be merged into the hosting project.

你的这些规则可以通过调用外部工具和实现逻辑来修改你的项目。比如，你需要一个规则来定义如何将原理图中的模板合并到宿主项目中。

Rules can make use of utilities provided with the `@schematics/angular` package. Look for helper functions for working with modules, dependencies, TypeScript, AST, JSON, Angular CLI workspaces and projects, and more.

规则可以利用 `@schematics/angular` 包提供的实用工具。寻求辅助函数来处理模块、依赖、TypeScript、AST、JSON、Angular CLI 工作空间和项目等等。

<code-example language="TypeScript" header="index.ts">

import {
  JsonAstObject,
  JsonObject,
  JsonValue,
  Path,
  normalize,
  parseJsonAst,
  strings,
} from '&#64;angular-devkit/core';

</code-example>

### Defining input options with a schema and interfaces

### 利用模式和接口来定义输入选项

Rules can collect option values from the caller and inject them into templates.
The options available to your rules, with their allowed values and defaults, are defined in the schematic's JSON schema file, `<schematic>/schema.json`.
You can define variable or enumerated data types for the schema using TypeScript interfaces.

规则可以从调用者那里收集选项值，并把它们注入到模板中。规则可用的选项及其允许的值和默认值是在原理图的 JSON 模式文件 `<schematic>/schema.json` 中定义的。你可以使用 TypeScript 接口来为这个模式定义变量或枚举的数据类型。

The schema defines the types and default values of variables used in the schematic.
For example, the hypothetical "Hello World" schematic might have the following schema.

该模式定义了原理图中使用的变量的类型和默认值。例如，假设的 “Hello World” 原理图可能具有以下模式定义（schema）。

<code-example language="json" header="src/hello-world/schema.json">

{
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1,
            "default": "world"
        },
        "useColor": {
            "type": "boolean"
        }
    }
}
</code-example>

You can see examples of schema files for the Angular CLI command schematics in [`@schematics/angular`](https://github.com/angular/angular-cli/blob/7.0.x/packages/schematics/angular/application/schema.json).

你可以在 [`@schematics/angular`](https://github.com/angular/angular-cli/blob/7.0.x/packages/schematics/angular/application/schema.json) 中看到 Angular CLI 命令原理图的模式文件示例。

### Schematic prompts

### 原理图提示

Schematic *prompts* introduce user interaction into schematic execution.
You can configure schematic options to display a customizable question to the user.
The prompts are displayed before the execution of the schematic, which then uses the response as the value for the option.
This allows users to direct the operation of the schematic without requiring in-depth knowledge of the full spectrum of available options.

原理图*提示*能将用户交互引入到原理图执行过程中。你可以配置原理图选项，以向用户显示可自定义的问题。
在执行原理图之前会显示提示，然后将用户的响应用作选项的值。这使得用户可以指导原理图的操作，而无需深入了解可用选项的全部范围。

The "Hello World" schematic might, for example, ask the user for their name, and display that name in place of the default name "world". To define such a prompt, add an `x-prompt` property to the schema for the `name` variable.

例如，这个 “Hello World” 原理图可能会要求用户提供他的名字，并显示该名字以代替默认名字 “world”。要定义这样的提示，请将 `x-prompt` 属性添加到 `name` 变量的模式中。

Similarly, you can add a prompt to allow the user to decide whether the schematic will use color when executing its hello action. The schema with both prompts would be as follows.

类似地，你可以添加一个提示，以允许用户确定原理图在执行其 hello 操作时是否将使用颜色。带有两个提示的模式如下。

<code-example language="json" header="src/hello-world/schema.json">

{
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1,
            "default": "world",
            "x-prompt": "What is your name?"
        },
        "useColor": {
            "type": "boolean",
            "x-prompt": "Would you like the response in color?"
        }
    }
}
</code-example>

#### Prompt short-form syntax

#### 提示的简写语法

These examples use a shorthand form of the prompt syntax, supplying only the text of the question.
In most cases, this is all that is required.
Notice however, that the two prompts expect different types of input.
When using the shorthand form, the most appropriate type is automatically selected based on the property's schema.
In the example, the `name` prompt uses the `input` type because it it is a string property.
The `useColor` prompt uses a `confirmation` type because it is a Boolean property.
In this case, "yes" corresponds to `true` and "no" corresponds to `false`.

这些示例使用提示语法的简写形式，仅提供问题的文本。在大多数情况下，这就是所需要的。但是请注意，这两个提示要求使用不同类型的输入。使用简写形式时，将根据属性的模式自动选择最合适的类型。在该示例中，`name` 提示使用 `input` 类型，因为它是一个字符串属性。`useColor` 提示使用 `confirmation` 类型，因为它是布尔属性。在这种情况下，“是” 对应于 `true` 而 “否” 对应于 `false`。

There are three supported input types.

支持三种输入类型。

| Input type | Description |
| :--------- | :---------- |
| 输入类型 | 描述 |
| confirmation | A yes or no question; ideal for Boolean options. |
| 确认 | 是或否的问题；布尔选项的理想选择。|
| input | Textual input; ideal for string or number options. |
| 输入 | 文字输入；字符串或数字选项的理想选择。|
| list | A predefined set of allowed values. |
| 清单 | 预定义的一组允许值。|

In the short form, the type is inferred from the property's type and constraints.

简而言之，类型是根据属性的类型和约束来推断的。

| Property Schema | Prompt Type |
| :-------------- | :---------- |
| 属性模式 | 提示类型 |
| "type": "boolean" | confirmation ("yes"=`true`, "no"=`false`) |
| "type": "boolean" | 确认（“yes” = `true`，“no” = `false` ） |
| "type": "string" | input |
| "type": "string" | 输入 |
| "type": "number" | input (only valid numbers accepted) |
| "type": "number" | 输入（仅接受有效数字） |
| "type": "integer" | input (only valid numbers accepted) |
| "type": "integer" | 输入（仅接受有效数字） |
| "enum": [...] | list 	(enum members become list selections) |
| "enum": [...] | 列表（枚举成员成为列表中的选择项） |

In the following example, the property takes an enumerated value, so the schematic automatically chooses the list type, and creates a menu from the possible values.

在以下示例中，该属性采用枚举值，因此原理图将自动选择列表类型，并根据可能的值创建菜单。

<code-example language="json" header="schema.json">

    "style": {
      "description": "The file extension or preprocessor to use for style files.",
      "type": "string",
      "default": "css",
      "enum": [
        "css",
        "scss",
        "sass",
        "less",
        "styl"
      ],
      "x-prompt": "Which stylesheet format would you like to use?"
    }

</code-example>

The prompt runtime automatically validates the provided response against the constraints provided in the JSON schema.
If the value is not acceptable, the user is prompted for a new value.
This ensures that any values passed to the schematic meet the expectations of the schematic's implementation, so that you do not need to add additional checks within the schematic's code.

提示运行时会根据 JSON 模式中提供的约束条件自动验证提供的响应。如果该值不可接受，则提示用户输入新值。这样可以确保传递到原理图的任何值都符合原理图实现的期望，因此你无需在原理图的代码中添加其它检查。

#### Prompt long-form syntax

#### 提示的长格式语法

The `x-prompt` field syntax supports a long form for cases where you require additional customization and control over the prompt.
In this form, the `x-prompt` field value is a JSON object with subfields that customize the behavior of the prompt.

在需要对提示进行其它自定义和控制情况下，`x-prompt` 字段也支持长格式语法。在这种形式下，`x-prompt` 字段值是带有子字段的 JSON 对象，这些子字段可自定义提示的行为。

| Field | Data Value |
| :---- | :--------- |
| 字段 | 数据值 |
| type | `confirmation`, `input`, or `list` (selected automatically in short form) |
| type | `confirmation`，`input` 或 `list` （以简短形式自动选择） |
| message | string (required) |
| message | 字符串（必填） |
| items | string and/or label/value object pair (only valid with type `list`) |
| items | 字符串和/或“标签/值”对象（仅对 `list` 类型有效） |

The following example of the long form is from the JSON schema for the schematic that the CLI uses to [generate applications](https://github.com/angular/angular-cli/blob/ba8a6ea59983bb52a6f1e66d105c5a77517f062e/packages/schematics/angular/application/schema.json#L56).
It defines the prompt that allows users to choose which style preprocessor they want to use for the application being created.
By using the long form, the schematic can provide more explicit formatting of the menu choices.

下面的长格式示例来自 CLI 用来[生成应用程序](https://github.com/angular/angular-cli/blob/ba8a6ea59983bb52a6f1e66d105c5a77517f062e/packages/schematics/angular/application/schema.json#L56)的原理图的 JSON 模式。它定义提示，允许用户选择要用于正在创建的应用程序的样式预处理器。通过使用长格式，原理图可以为菜单选项提供更明确的格式。

<code-example language="json" header="package/schematics/angular/application/schema.json">

    "style": {
      "description": "The file extension or preprocessor to use for style files.",
      "type": "string",
      "default": "css",
      "enum": [
        "css",
        "scss",
        "sass",
        "less",
        "styl"
      ],
      "x-prompt": {
        "message": "Which stylesheet format would you like to use?",
        "type": "list",
        "items": [
          { "value": "css",  "label": "CSS" },
          { "value": "scss", "label": "SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]" },
          { "value": "sass", "label": "Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]" },
          { "value": "less", "label": "Less   [ http://lesscss.org                                             ]" },
          { "value": "styl", "label": "Stylus [ http://stylus-lang.com                                         ]" }
        ]
      },
    },
</code-example>

#### x-prompt schema

#### `x-prompt` 模式

The JSON schema that defines a schematic's options supports extensions to allow the declarative definition of prompts and their respective behavior.
No additional logic or changes are required to the code of a schematic to support the prompts.
The following JSON schema is a complete description of the long-form syntax for the `x-prompt` field.

定义原理图选项的 JSON 模式支持扩展，以允许对提示及其相应行为进行声明式定义。无需其它逻辑或更改原理图代码即可支持提示。以下 JSON 模式是 `x-prompt` 字段的长格式语法的完整描述。

<code-example language="json" header="x-prompt schema">

{
    "oneOf": [
        { "type": "string" },
        {
            "type": "object",
            "properties": {
                "type": { "type": "string" },
                "message": { "type": "string" },
                "items": {
                    "type": "array",
                    "items": {
                        "oneOf": [
                            { "type": "string" },
                            {
                                "type": "object",
                                "properties": {
                                    "label": { "type": "string" },
                                    "value": { }
                                },
                                "required": [ "value" ]
                            }
                        ]
                    }
                }
            },
            "required": [ "message" ]
        }
    ]
}

</code-example>

{@a cli}

## Schematics CLI

## 原理图 CLI

Schematics come with their own command-line tool.
Using Node 6.9 or above, install the Schematics command line tool globally:

原理图有自己的命令行工具。使用 Node 6.9 或以上版本，全局安装 Schematics 命令行工具：

<code-example language="bash">
npm install -g @angular-devkit/schematics-cli
</code-example>

This installs the `schematics` executable, which you can use to create a new schematics collection in its own project folder, add a new schematic to an existing collection, or extend an existing schematic.

这将安装可执行文件 `schematics`，你可以用它在自己的项目文件夹中创建一个新的原理图集合、把一个新的原理图添加到一个现有的集合中，或者扩展一个现有的原理图。

In the following sections, we will create a new schematics collection using the CLI in order to introduce the files and file structure, and some of the basic concepts.

在下面的章节中，我们将使用 CLI 创建一个新的原理图集合，以介绍文件和目录结构，以及一些基本概念。

The most common use of schematics, however, is to integrate an Angular library with the Angular CLI.
You can do this by creating the schematic files directly within the library project in an Angular workspace, without using the Schematics CLI.
See [Schematics for Libraries](guide/schematics-for-libraries).

但是，原理图的最常见用途是将 Angular 库与 Angular CLI 集成在一起。你可以直接在 Angular 工作空间的库项目中创建原理图文件，而无需使用 Schematics CLI。参见[库的原理图](guide/schematics-for-libraries)。

### Creating a schematics collection

### 创建一个原理图的集合

The following command creates a new schematic named `hello-world` in a new project folder of the same name.

下列命令用来在同名的新项目文件夹中创建一个名为 `hello-world` 的新原理图。

<code-example language="bash">
schematics blank --name=hello-world
</code-example>

The `blank` schematic is provided by the Schematics CLI. The command creates a new project folder (the root folder for the collection) and an initial named schematic in the collection.

`blank` 原理图是由 Schematics CLI 提供的。该命令用于创建一个新的项目文件夹（该集合的根文件夹），并在该集合中创建一个最初的命名原理图。

Go to the collection folder, install your npm dependencies, and open your new collection in your favorite editor to see the generated files. For example, if you are using VSCode:

转到 collection 文件夹，安装你的 npm 依赖，然后在常用的编辑器中打开这个新集合，看看所生成的文件。例如，如果你正在使用 VSCode：

<code-example language="bash">
cd hello-world
npm install
npm run build
code .
</code-example>

The initial schematic gets the same name as the project folder, and is generated in `src/hello-world`.
You can add related schematics to this collection, and modify the generated skeleton code to define your schematic's functionality.
Each schematic name must be unique within the collection.

最初的原理图与项目文件夹的名字相同，是在 `src/hello-world` 中生成的。你可以把相关的原理图添加到这个集合中，并修改所生成的骨架代码来定义原理图的功能。每个原理图的名称在集合中都必须是唯一的。

### Running a schematic

### 运行原理图

Use the `schematics` command to run a named schematic.
Provide the path to the project folder, the schematic name, and any mandatory options, in the following format.

使用 `schematics` 命令运行一个命名原理图。按以下格式提供项目文件夹的路径、原理图名称和所有必选项。

<code-example language="bash">
schematics &lt;path-to-schematics-project&gt;:&lt;schematics-name&gt; --&lt;required-option&gt;=&lt;value&gt;
</code-example>

The path can be absolute or relative to the current working directory where the command is executed.
For example, to run the schematic we just generated (which has no required options), use the following command.

该路径可以是绝对路径，也可以是执行该命令的当前工作目录的相对路径。例如，要运行我们刚生成的原理图（它没有必选项），请使用下面的命令。

<code-example language="bash">
schematics .:hello-world
</code-example>

### Adding a schematic to a collection

### 把原理图添加到集合中

To add a schematic to an existing collection, use the same command you use to start a new schematics project, but run the command inside the project folder.

要把一个原理图添加到现有的集合中，请使用和新建原理图项目相同的命令，不过要改为在该项目的文件夹下运行该命令。

<code-example language="bash">
cd hello-world
schematics blank --name=goodbye-world
</code-example>

The command generates the new named schematic inside your collection, with a main `index.ts` file and its associated test spec.
It also adds the name, description, and factory function for the new schematic to the collection's schema in the `collection.json` file.

该命令会在你的集合中生成一个新的命名原理图，它包含一个主文件 `index.ts` 及其相关的测试规约。它还会把这个新原理图的名字（name），说明（description）和工厂函数（factory function）添加到 `collection.json` 文件中此集合的 JSON 模式中。

## Collection contents

## 集合的内容

The top level of the root project folder for a collection contains configuration files, a `node_modules` folder, and a `src/` folder.
The `src/` folder contains subfolders for named schematics in the collection, and a schema, `collection.json`, which describes the collected schematics.
Each schematic is created with a name, description, and factory function.

集合的根文件夹中包含一些配置文件、`node_modules` 文件夹和 `src/` 文件夹。`src/` 文件夹包含该集合中各个命名原理图的子文件夹，以及一个模式文件（`collection.json`），它是集合中各个原理图的模式定义。每个原理图都是用名称，描述和工厂函数创建的。

<code-example language="none">
{
  "$schema":
     "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "hello-world": {
      "description": "A blank schematic.",
      "factory": "./hello-world/index#helloWorld"
    }
  }
}
</code-example>

* The `$schema` property specifies the schema that the CLI uses for validation.

  `$schema` 属性指定了 CLI 进行验证时所用的模式。

* The `schematics` property lists named schematics that belong to this collection.
   Each schematic has a plain-text description, and points to the generated entry function in the main file.

  `schematics` 属性列出了属于这个集合的各个命名原理图。每个原理图都有一个纯文本格式的描述，以及指向主文件中自动生成的那个入口函数。

* The `factory` property points to the generated entry function. In this example, you invoke the `hello-world` schematic by calling the `helloWorld()` factory function.

  `factory` 属性指向自动生成的那个入口函数。在这个例子中，你会通过调用 `helloWorld()` 工厂函数来调用 `hello-world` 原理图。

* The optional  `schema` property points to a JSON schema file that defines the command-line options available to the schematic.

  可选属性 `schema` 是一个 JSON 模式文件，它定义了本原理图中可用的命令行参数。

* The optional `aliases` array specifies one or more strings that can be used to invoke the schematic.
   For example, the schematic for the Angular CLI “generate” command has an alias “g”, allowing you to use the command `ng g`.

  可选数组属性 `aliases` 指定了一个或多个可用来调用此原理图的字符串。比如，Angular CLI “generate” 命令的原理图有一个别名 “g”，这就可以让你使用命令 `ng g`。

### Named schematics

### 命名原理图

When you use the Schematics CLI to create a blank schematics project, the new blank schematic is the first member of the collection, and has the same name as the collection.
When you add a new named schematic to this collection, it is automatically added to the  `collection.json`  schema.

当你使用 Schematics CLI 创建空白原理图项目时，该集合的第一个成员是一张与该集合同名的空白原理图。当你把这个新的命名原理图添加到本集合中时，它会自动添加到 `collection.json` 模式中。

In addition to the name and description, each schematic has a `factory` property that identifies the schematic’s entry point.
In the example, you invoke the schematic's defined functionality by calling the `helloWorld()` function in the main file,  `hello-world/index.ts`.

除了名称和描述外，每个原理图还有一个 `factory` 属性，用于标识此原理图的入口点。在本例中，你通过在主文件 `hello-world/index.ts` 中调用 `helloWorld()` 函数来调用此原理图中定义的功能。

<div class="lightbox">
  <img src="generated/images/guide/schematics/collection-files.gif" alt="overview">
</div>

Each named schematic in the collection has the following main parts.

该集合中每个命名原理图都有以下主要部分。

|               |                                                                   |
| :------------ | :---------------------------------------------------------------- |
| `index.ts`    | Code that defines the transformation logic for a named schematic. |
| `index.ts`    | 定义命名原理图中转换逻辑的代码。                                       |
| `schema.json` | Schematic variable definition.                                    |
| `schema.json` | 原理图变量定义。                                                 |
| `schema.d.ts` | Schematic variables.                                              |
| `schema.d.ts` | 原理图变量。                                                     |
| `files/`      | Optional component/template files to replicate.                   |
| `files/`      | 要复制的可选组件/模板文件。                                      |

It is possible for a schematic to provide all of its logic in the `index.ts` file, without additional templates.
You can create dynamic schematics for Angular, however, by providing components and templates in the `files/` folder, like those in standalone Angular projects.
The logic in the index file configures these templates by defining rules that inject data and modify variables.

原理图可以在 `index.ts` 文件中提供它全部的逻辑，不需要额外的模板。你也可以在 `files/` 文件夹中提供组件和模板来为 Angular 创建动态原理图，比如那些独立的 Angular 项目。这个 index 文件中的逻辑会通过定义一些用来注入数据和修改变量的规则来配置这些模板。

