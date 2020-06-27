# Schematics for libraries

# 库的原理图

When you create an Angular library, you can provide and package it with schematics that integrate it with the Angular CLI.
With your schematics, your users can use `ng add` to install an initial version of your library,
`ng generate` to create artifacts defined in your library, and `ng update` to adjust their project for a new version of your library that introduces breaking changes.

当创建 Angular 库时，你可以为同时为它打包进一组原理图，并把它与 Angular CLI 集成在一起。借助原理图，用户可以用 `ng add` 来安装你这个库的初始版本，可以用 `ng generate` 来创建你在库中定义的一些工件，可以用 `ng update` 来调整他们的项目，以支持你在库的新版本中引入的重大变更。

All three types of schematics can be part of a collection that you package with your library.

这三种原理图都可以作为你打包进库中的集合的一部分。

Download the <live-example downloadOnly>library schematics project</live-example> for a completed example of the steps below.

下载<live-example downloadOnly>库的原理图项目</live-example>以获取一个已完成下列步骤的例子。

## Creating a schematics collection

## 创建一个原理图集合

To start a collection, you need to create the schematic files.
The following steps show you how to add initial support without modifying any project files.

要开始一个集合，你需要创建一些原理图文件。下列步骤说明了如何在不修改任何项目文件的情况下添加初始支持。

1. In your library's root folder, create a `schematics/`  folder.

   在库的根文件夹中，创建一个 `schematics/` 文件夹。

1. In the `schematics/` folder, create an `ng-add/` folder for your first schematic.

   在 `schematics/` 文件夹中，为你的第一个原理图创建一个 `ng-add/` 文件夹。

1. At the root level of the `schematics/` folder, create a `collection.json` file.

   在 `schematics/` 文件夹的根级，创建一个 `collection.json` 文件。

1. Edit the `collection.json` file to define the initial schema for your collection.

   编辑 `collection.json` 文件来定义你的集合的初始模式定义。

<code-example header="projects/my-lib/schematics/collection.json (Schematics Collection)" path="schematics-for-libraries/projects/my-lib/schematics/collection.1.json">
</code-example>

* The `$schema` path is relative to the Angular Devkit collection schema.

  `$schema` 路径是相对于 Angular Devkit 集合模式定义的。

* The `schematics` object describes the named schematics that are part of this collection.

  `schematics` 对象描述了该集合中的命名原理图。

* The first entry is for a schematic named `ng-add`. It contains the description, and points to the factory function that is called when your schematic is executed.

  第一个条目是名为 `ng-add` 的原理图。它包含了描述，并指向执行此原理图时要调用的工厂函数。

1. In your library project's `package.json` file, add a "schematics" entry with the path to your schema file.
   The Angular CLI uses this entry to find named schematics in your collection when it runs commands.

   在这个库项目的 `package.json` 文件中，添加一个 “schematics” 的条目，里面带有你的模式定义文件的路径。当 Angular CLI 运行命令时，会根据这个条目在你的集合中查找指定名字的原理图。

<code-example header="projects/my-lib/package.json (Schematics Collection Reference)" path="schematics-for-libraries/projects/my-lib/package.json" region="collection">
</code-example>

The initial schema that you have created tells the CLI where to find the schematic that supports the `ng add` command.
Now you are ready to create that schematic.

你所创建的初始模式告诉 CLI 在哪里可以找到支持 `ng add` 命令的原理图。现在，你已准备好创建该原理图了。

## Providing installation support

## 提供安装支持

A schematic for the `ng add` command can enhance the initial installation process for your users.
The following steps will define this type of schematic.

`ng add` 命令的原理图可以增强用户的初始安装过程。可以按如下步骤定义这种原理图。

1. Go to the <lib-root>/schematics/ng-add/ folder.

   进入 <lib-root>/schematics/ng-add/ 目录。

1. Create the main file, `index.ts`.

   创建主文件 `index.ts`。

1. Open `index.ts` and add the source code for your schematic factory function.

   打开 `index.ts` 并添加原理图工厂函数的源代码。

<code-example header="projects/my-lib/schematics/ng-add/index.ts (ng-add Rule Factory)" path="schematics-for-libraries/projects/my-lib/schematics/ng-add/index.ts">
</code-example>

The only step needed to provide initial `ng add` support is to trigger an installation task using the `SchematicContext`.
The task uses the user's preferred package manager to add the library to the project's `package.json` configuration file, and install it in the project’s `node_modules` directory.

提供初始 `ng add` 支持所需的唯一步骤是使用 `SchematicContext` 来触发安装任务。该任务会借助用户首选的包管理器将该库添加到宿主项目的 `package.json` 配置文件中，并将其安装到该项目的 `node_modules` 目录下。

In this example, the function receives the current `Tree` and returns it without any modifications.
If you need to, you can do additional setup when your package is installed, such as generating files, updating configuration, or any other initial setup your library requires.

在这个例子中，该函数会接收当前的 `Tree` 并返回它而不作任何修改。如果需要，你也可以在安装软件包时进行额外的设置，例如生成文件、更新配置、或者库所需的任何其它初始设置。

## Building your schematics

## 构建你的原理图

To bundle your schematics together with your library, you must configure the library to build the schematics separately, then add them to the bundle.
You must build your schematics *after* you build your library, so they are placed in the correct directory.

要把你的原理图和库打包到一起，就必须把这个库配置成单独构建原理图，然后再把它们添加到发布包中。你必须*先构建库*再构建原理图，这样才能把它们放到正确的目录下。

* Your library needs a custom Typescript configuration file with instructions on how to compile your schematics into your distributed library.

  你的库需要一个自定义的 Typescript 配置文件，里面带有如何把原理图编译进库的发布版的一些指令。

* To add the schematics to the library bundle, add scripts to the library's `package.json` file.

  要把这些原理图添加到库的发布包中，就要把这些脚本添加到该库的 `package.json` 文件中。

Assume you have a library project `my-lib` in your Angular workspace.
To tell the library how to build the schematics, add a `tsconfig.schematics.json` file next to the generated `tsconfig.lib.json` file that configures the library build.

假设你在 Angular 工作区中有一个库项目 `my-lib`。要想告诉库如何构建原理图，就要在生成的 `tsconfig.lib.json` 库配置文件旁添加一个 `tsconfig.schematics.json` 文件。

1. Edit the `tsconfig.schematics.json` file to add the following content.

   编辑 `tsconfig.schematics.json` 文件，添加如下内容。

<code-example header="projects/my-lib/tsconfig.schematics.json (TypeScript Config)" path="schematics-for-libraries/projects/my-lib/tsconfig.schematics.json">
</code-example>

* The `rootDir` specifies that your `schematics/` folder contains the input files to be compiled.

  `rootDir` 指出在你的 `schematics/` 文件夹中包含要编译的输入文件。

* The `outDir` maps to the library's output folder. By default, this is the `dist/my-lib` folder at the root of your workspace.

  `outDir` 映射到了库的输出目录下。默认情况下，这是工作空间根目录下的 `dist/my-lib` 文件夹。

1. To make sure your schematics source files get compiled into the library bundle, add the following scripts to the `package.json` file in your library project's root folder (`projects/my-lib`).

   要确保你的原理图源文件会被编译进库包中，请把下列脚本添加到库项目的根文件夹（`projects/my-lib`）下的 `package.json` 文件中。

<code-example header="projects/my-lib/package.json (Build Scripts)" path="schematics-for-libraries/projects/my-lib/package.json">
</code-example>

* The `build` script compiles your schematic using the custom `tsconfig.schematics.json` file.

  `build` 脚本使用自定义的 `tsconfig.schematics.json` 文件来编译你的原理图。

* The `copy:*` statements copy compiled schematic files into the proper locations in the library output folder in order to preserve the file structure.

  `copy:*` 语句将已编译的原理图文件复制到库的输出目录下的正确位置，以保持目录的结构。

* The `postbuild` script copies the schematic files after the `build` script completes.

  `postbuild` 脚本会在 `build` 脚本完成后复制原理图文件。

## Providing generation support

## 提供生成器支持

You can add a named schematic to your collection that lets your users use the `ng generate` command to create an artifact that is defined in your library.

你可以把一个命名原理图添加到集合中，让你的用户可以使用 `ng generate` 命令来创建你在库中定义的工件。

We'll assume that your library defines a service, `my-service`, that requires some setup. You want your users to be able to generate it using the following CLI command.

我们假设你的库定义了一项需要进行某些设置的服务 `my-service`。你希望用户能够用下面的 CLI 命令来生成它。

<code-example language="bash">
ng generate my-lib:my-service
</code-example>

To begin, create a new subfolder, `my-service`, in the `schematics` folder.

首先，在 `schematics` 文件夹中新建一个子文件夹 `my-service`。

### Configure the new schematic

### 配置新的原理图

When you add a schematic to the collection, you have to point to it in the collection's schema, and provide configuration files to define options that a user can pass to the command.

当你要把一个原理图添加到集合中时，就必须在该集合的模式中指向它，并提供一些配置文件来定义用户可以传给该命令的选项。

1. Edit the `schematics/collection.json` file to point to the new schematic subfolder, and include a pointer to a schema file that will specify inputs for the new schematic.

   编辑一下 `schematics/collection.json` 文件，指向新的原理图子文件夹，并附上一个指向模式文件的指针，该文件将会指定新原理图的输入。

<code-example header="projects/my-lib/schematics/collection.json (Schematics Collection)" path="schematics-for-libraries/projects/my-lib/schematics/collection.json">
</code-example>

1. Go to the `<lib-root>/schematics/my-service/` folder.

   进入 `<lib-root>/schematics/my-service/` 目录。

1. Create a `schema.json` file and define the available options for the schematic.

   创建一个 `schema.json` 文件并定义该原理图的可用选项。

<code-example header="projects/my-lib/schematics/my-service/schema.json (Schematic JSON Schema)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/schema.json">
</code-example>

* *id*: A unique id for the schema in the collection.

  *id*：这个模式定义在集合中的唯一 id。

* *title*: A human-readable description of the schema.

  *title*：一个人类可读的模式描述。

* *type*: A descriptor for the type provided by the properties.

  *type*：由这些属性提供的类型描述符。

* *properties*: An object that defines the available options for the schematic.

  *properties*：一个定义该原理图可用选项的对象。

Each option associates key with a type, description, and optional alias.
  The type defines the shape of the value you expect, and the description is displayed when the user requests usage help for your schematic.

  每个选项都会把 key 与类型、描述和一个可选的别名关联起来。该类型定义了你所期望的值的形态，并在用户请求你的原理图给出用法帮助时显示这份描述。

See the workspace schema for additional customizations for schematic options.

  关于原理图的更多自定义选项，请参阅工作区的模式定义。

1. Create a `schema.ts` file and define an interface that stores the values of the options defined in the `schema.json` file.

   创建一个 `schema.ts` 文件，并定义一个接口，用于存放 `schema.json` 文件中定义的各个选项的值。

<code-example header="projects/my-lib/schematics/my-service/schema.ts (Schematic Interface)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/schema.ts">
</code-example>

* *name*: The name you want to provide for the created service.

  *name*：你要为创建的这个服务指定的名称。

* *path*: Overrides the path provided to the schematic. The default path value is based on the current working directory.

  *path*：覆盖为原理图提供的路径。默认情况下，路径是基于当前工作目录的。

* *project*: Provides a specific project to run the schematic on. In the schematic, you can provide a default if the option is not provided by the user.

  *project*：提供一个具体项目来运行原理图。在原理图中，如果用户没有给出该选项，你可以提供一个默认值。

### Add template files

### 添加模板文件

To add artifacts to a project, your schematic needs its own template files.
Schematic templates support special syntax to execute code and variable substitution.

要把工件添加到项目中，你的原理图就需要自己的模板文件。原理图模板支持特殊的语法来执行代码和变量替换。

1. Create a `files/` folder inside the `schematics/my-service/` folder.

   在 `schematics/my-service/` 目录下创建一个 `files/` 文件夹。

1. Create a file named `__name@dasherize__.service.ts.template` that defines a template you can use for generating files. This template will generate a service that already has Angular's `HttpClient` injected into its constructor.

   创建一个名叫 `__name@dasherize__.service.ts.template` 的文件，它定义了一个可以用来生成文件的模板。这里的模板会生成一个已把 Angular 的 `HttpClient` 注入到其构造函数中的服务。

<code-example lang="ts" header="projects/my-lib/schematics/my-service/files/__name@dasherize__.service.ts.template (Schematic Template)">

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {
  constructor(private http: HttpClient) { }
}

</code-example>

* The `classify` and `dasherize` methods are utility functions that your schematic will use to transform your source template and filename.

  `classify` 和 `dasherize` 方法是实用函数，你的原理图会用它们来转换你的模板源码和文件名。

* The `name` is provided as a property from your factory function. It is the same `name` you defined in the schema.

  `name` 是工厂函数提供的一个属性。它与你在模式中定义的 `name` 是一样的。

### Add the factory function

### 添加工厂函数

Now that you have the infrastructure in place, you can define the main function that performs the modifications you need in the user's project.

现在，你已经有了基础设施，可以开始定义一个 main 函数来执行要对用户项目做的各种修改了。

The Schematics framework provides a file templating system, which supports both path and content templates.
The system operates on placeholders defined inside files or paths that loaded in the input `Tree`.
It fills these in using values passed into the `Rule`.

Schematics 框架提供了一个文件模板系统，它支持路径和内容模板。系统会操作在这个输入文件树（`Tree`）中加载的文件内或路径中定义的占位符，用传给 `Rule` 的值来填充它们。

For details of these data structures and syntax, see the [Schematics README](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics/README.md).

有关这些数据结构和语法的详细信息，请参见 [Schematics 的 README](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics/README.md)。

1. Create the main file `index.ts` and add the source code for your schematic factory function.

   创建主文件 `index.ts` 并为你的原理图工厂函数添加源代码。

1. First, import the schematics definitions you will need. The Schematics framework offers many utility functions to create and use rules when running a schematic.

   首先，导入你需要的原理图定义。Schematics 框架提供了许多实用函数来创建规则或在执行原理图时和使用规则。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Imports)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="schematics-imports">
</code-example>

1. Import the defined schema interface that provides the type information for your schematic's options.

   导入已定义的模式接口，它会为你的原理图选项提供类型信息。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Schema Import)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="schema-imports">
</code-example>

1. To build up the generation schematic, start with an empty rule factory.

   要想构建 "生成器原理图"，我们从一个空白的规则工厂开始。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Initial Rule)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.1.ts" region="factory">
</code-example>

This simple rule factory returns the tree without modification.
The options are the option values passed through from the `ng generate` command.

这个简单的规则工厂返回树而不做任何修改。这些选项都是从 `ng generate` 命令传过来的选项值。

## Define a generation rule

## 定义一个生成器规则

We now have the framework in place for creating the code that actually modifies the user's application to set it up for the service defined in your library.

我们现在有了一个框架，可用来创建一些真正修改用户程序的代码，以便对库中定义的服务进行设置。

The Angular workspace where the user has installed your library contains multiple projects (applications and libraries).
The user can specify the project on the command line, or allow it to default.
In either case, your code needs to identify the specific project to which this schematic is being applied, so that you can retrieve information from the project configuration.

用户安装过此库的 Angular 工作区中会包含多个项目（应用和库）。用户可以在命令行中指定一个项目，也可以使用它的默认值。在任何一种情况下，你的代码都需要知道应该在哪个项目上应用此原理图，这样才能从该项目的配置中检索信息。

You can do this using the `Tree` object that is passed in to the factory function.
The `Tree` methods give you access to the complete file tree in your workspace, allowing you to read and write files during the execution of the schematic.

你可以使用传给工厂函数的 `Tree` 对象来做到这一点。通过 `Tree` 的一些方法，你可以访问此工作空间的完整文件树，以便在运行原理图时读写文件。

### Get the project configuration

### 获取项目配置

1. To determine the destination project, use the `Tree.read()` method to read the contents of the workspace configuration file, `angular.json`, at the root of the workspace.
   Add the following code to your factory function.

   要确定目标项目，可以使用 `Tree.read()` 方法在工作空间的根目录下读取工作空间配置文件 `angular.json` 的内容。将以下代码添加到工厂函数中。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Schema Import)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="workspace">
</code-example>

* Be sure to check that the context exists and throw the appropriate error.

  一定要检查此上下文是否存在，并抛出相应的错误。

* After reading the contents into a string, parse the configuration into a JSON object, typed to the `WorkspaceSchema`.

  把这些内容读入成字符串后，把配置解析成一个 JSON 对象，把它的类型设置为 `WorkspaceSchema`。

1. The `WorkspaceSchema` contains all the properties of the workspace configuration, including a `defaultProject` value for determining which project to use if not provided.
   We will use that value as a fallback, if no project is explicitly specified in the `ng generate` command.

   `WorkspaceSchema` 包含工作空间配置的所有属性，包括一个 `defaultProject` 值，用来确定如果没有提供该参数，要使用哪个项目。如果 `ng generate` 命令中没有明确指定任何项目，我们就会把它作为后备值。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Default Project)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="project-fallback">
</code-example>

1. Now that you have the project name, use it to retrieve the project-specific configuration information.

   现在你有了项目名称，用它来检索指定项目的配置信息。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Project)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="project-info">
</code-example>

   The `workspace projects` object contains all the project-specific configuration information.

   `workspace projects` 对象包含指定项目的全部配置信息。

1. The `options.path` determines where the schematic template files are moved to once the schematic is applied.

   `options.path` 决定了应用原理图之后，要把原理图模板文件移动到的位置。

   The `path` option in the schematic's schema is substituted by default with the current working directory.
   If the `path` is not defined, use the `sourceRoot` from the project configuration along with the `projectType`.

   原理图模式中的 `path` 选项默认会替换为当前工作目录。如果未定义 `path`，就使用项目配置中的 `sourceRoot` 和 `projectType` 来确定。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Project Info)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="path">
</code-example>

### Define the rule

### 定义规则

A `Rule` can use external template files, transform them, and return another `Rule` object with the transformed template. You can use the templating to generate any custom files required for your schematic.

`Rule` 可以使用外部模板文件，对它们进行转换，并使用转换后的模板返回另一个 `Rule` 对象。你可以使用模板来生成原理图所需的任意自定义文件。

1. Add the following code to your factory function.

   将以下代码添加到工厂函数中。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Template transform)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="template">
</code-example>

* The `apply()` method applies multiple rules to a source and returns the transformed source. It takes 2 arguments, a source and an array of rules.

  `apply()` 方法会把多个规则应用到源码中，并返回转换后的源代码。它需要两个参数，一个源代码和一个规则数组。

* The `url()` method reads source files from your filesystem, relative to the schematic.

  `url()` 方法会从文件系统中相对于原理图的路径下读取源文件。

* The `applyTemplates()` method receives an argument of methods and properties you want make available to the schematic template and the schematic filenames. It returns a `Rule`. This is where you define the `classify()` and `dasherize()` methods, and the `name` property.

  `applyTemplates()` 方法会接收一个参数，它的方法和属性可用在原理图模板和原理图文件名上。它返回一条 `Rule`。你可以在这里定义 `classify()` 和 `dasherize()` 方法，以及 `name` 属性。

* The `classify()` method takes a value and returns the value in title case. For example, if the provided name is `my service`, it is returned as `MyService`

  `classify()` 方法接受一个值，并返回标题格式（title case）的值。比如，如果提供的名字是 `my service`，它就会返回 `MyService`。

* The `dasherize()` method takes a value and returns the value in dashed and lowercase. For example, if the provided name is MyService, it is returned as `my-service`.

  `dasherize()` 方法接受一个值，并以中线分隔并小写的形式返回值。比如，如果提供的名字是 MyService，它就会返回 “my-service” 的形式。

* The `move` method moves the provided source files to their destination when the schematic is applied.

  当应用了此原理图之后，`move` 方法会把所提供的源文件移动到目的地。

1. Finally, the rule factory must return a rule.

   最后，规则工厂必须返回一条规则。

<code-example header="projects/my-lib/schematics/my-service/index.ts (Chain Rule)" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts" region="chain">
</code-example>

  The `chain()` method allows you to combine multiple rules into a single rule, so that you can perform multiple operations in a single schematic.
  Here you are only merging the template rules with any code executed by the schematic.

  `chain()` 方法允许你把多个规则组合到一个规则中，这样就可以在一个原理图中执行多个操作。这里你只是把模板规则和原理图要执行的代码合并在一起。

See a complete exampled of the schematic rule function.

请看原理图规则函数的一个完整例子。

<code-example header="projects/my-lib/schematics/my-service/index.ts" path="schematics-for-libraries/projects/my-lib/schematics/my-service/index.ts">
</code-example>

For more information about rules and utility methods, see [Provided Rules](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/schematics#provided-rules).

有关规则和实用工具方法的详细信息，请参阅[预定义规则](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/schematics#provided-rules)。

## Running your library schematic

## 运行你的库原理图

After you build your library and schematics, you can install the schematics collection to run against your project. The steps below show you how to generate a service using the schematic you created above.

在构建库和原理图之后，你就可以安装一个原理图集合来运行你的项目了。下面的步骤介绍了如何使用上面创建的原理图来生成服务。

### Build your library and schematics

### 构建你的库和原理图

From the root of your workspace, run the `ng build` command for your library.

在工作区的根目录下，运行库的 `ng build` 命令。

<code-example language="bash">

  ng build my-lib

</code-example>

Then, you change into your library directory to build the schematic

然后，进入库目录，构建原理图

<code-example language="bash">

  cd projects/my-lib
  npm run build

</code-example>

### Link the library

### 链接这个库

Your library and schematics are packaged and placed in the `dist/my-lib` folder at the root of your workspace. For running the schematic, you need to link the library into your `node_modules` folder. From the root of your workspace, run the `npm link` command with the path to your distributable library.

这些库和原理图都已打包好了，就放在你工作区根目录下的 `dist/my-lib` 文件夹中。要运行这个原理图，你需要把这个库链接到 `node_modules` 文件夹中。在工作空间的根目录下，运行 `npm link` 命令，并把你的可分发库的路径作为参数。

<code-example language="bash">

npm link dist/my-lib

</code-example>

### Run the schematic

### 运行原理图

Now that your library is installed, you can run the schematic using the `ng generate` command.

现在你的库已经安装完毕，可以使用 `ng generate` 命令来运行原理图了。

<code-example language="bash">

ng generate my-lib:my-service --name my-data

</code-example>

In the console, you will see that the schematic was run and the `my-data.service.ts` file was created in your app folder.

在控制台中，你会看到原理图已经运行过了，`my-data.service.ts` 文件被创建在了你的 app 文件夹中。

<code-example language="bash" hideCopy="true">

CREATE src/app/my-data.service.ts (208 bytes)

</code-example>
