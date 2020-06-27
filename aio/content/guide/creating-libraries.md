# Creating libraries

# 创建库

This page provides a conceptual overview of how you can create and publish new libraries to extend Angular functionality.

对于如何创建和发布新库，以扩展 Angular 的功能，本页面提供了一个概念性的总览

If you find that you need to solve the same problem in more than one app (or want to share your solution with other developers), you have a candidate for a library.
A simple example might be a button that sends users to your company website, that would be included in all apps that your company builds.

如果你发现自己要在多个应用中解决同样的问题（或者要把你的解决方案分享给其它开发者），你就有了一个潜在的库。
简单的例子就是一个用来把用户带到你公司网站上的按钮，该按钮会包含在你公司构建的所有应用中。

## Getting started

## 快速上手

Use the Angular CLI to generate a new library skeleton in a new workspace with the following commands.

使用 Angular CLI，用以下命令在新的工作空间中生成一个新库的骨架：

<code-example language="bash">
 ng new my-workspace --create-application=false
 cd my-workspace
 ng generate library my-lib
</code-example>

The `ng generate` command creates the `projects/my-lib` folder in your workspace, which contains a component and a service inside an NgModule.

<div class="alert is-helpful">

     For more details on how a library project is structured, refer to the [Library project files](guide/file-structure#library-project-files) section of the [Project File Structure guide](guide/file-structure).
     
     要了解关于库项目的目录结构的详细信息，参见[项目文件结构](guide/file-structure)中的[库项目文件](guide/file-structure#library-project-files)部分。

     You can use the monorepo model to use the same workspace for multiple projects.
     See [Setting up for a multi-project workspace](guide/file-structure#multiple-projects).

     你可以使用单一仓库（monorepo）模式将同一个工作空间用于多个项目。参见[建立多项目型工作区](guide/file-structure#multiple-projects)。

</div>

When you generate a new library, the workspace configuration file, `angular.json`, is updated with a project of type 'library'.

当你生成一个新库时，该工作区的配置文件 `angular.json` 中也增加了一个 'library' 类型的项目。

<code-example format="json">
"projects": {
  ...
  "my-lib": {
    "root": "projects/my-lib",
    "sourceRoot": "projects/my-lib/src",
    "projectType": "library",
    "prefix": "lib",
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-ng-packagr:build",
        ...
</code-example>

You can build, test, and lint the project with CLI commands:

你可以使用 CLI 命令来构建、测试和 lint 这个项目：

<code-example language="bash">
 ng build my-lib
 ng test my-lib
 ng lint my-lib
</code-example>

Notice that the configured builder for the project is different from the default builder for app projects.
This builder, among other things, ensures that the library is always built with the [AOT compiler](guide/aot-compiler), without the need to specify the `--prod` flag.

注意，该项目配置的构建器与应用类项目的默认构建器不同。此构建器可以确保库永远使用 [AoT 编译器](guide/aot-compiler)构建，而不必再指定 `--prod` 标志。

To make library code reusable you must define a public API for it. This "user layer" defines what is available to consumers of your library. A user of your library should be able to access public functionality (such as NgModules, service providers and general utility functions) through a single import path.

要让库代码可以复用，你必须为它定义一个公共的 API。这个“用户层”定义了库中消费者的可用内容。该库的用户应该可以通过单个的导入路径来访问公共功能（如 NgModules、服务提供者和工具函数）。

The public API for your library is maintained in the `public-api.ts` file in your library folder.
Anything exported from this file is made public when your library is imported into an application.
Use an NgModule to expose services and components.

库的公共 API 是在库文件夹下的 `public-api.ts` 文件中维护的。当你的库被导入应用时，从该文件导出的所有内容都会公开。请使用 NgModule 来暴露这些服务和组件。

Your library should supply documentation (typically a README file) for installation and maintenance.

你的库里应该提供一些文档（通常是 README 文件）来指导别人安装和维护。

## Refactoring parts of an app into a library

## 把应用中的部分内容重构成一个库

To make your solution reusable, you need to adjust it so that it does not depend on app-specific code.
Here are some things to consider in migrating application functionality to a library.

为了让你的解决方案可供复用，你需要对它进行调整，以免它依赖应用特有的代码。在将应用的功能迁移到库中时，需要注意以下几点。

* Declarations such as components and pipes should be designed as stateless, meaning they don’t rely on or alter external variables. If you do rely on state, you need to evaluate every case and decide whether it is application state or state that the library would manage.

    组件和管道之类的可声明对象应该设计成无状态的，这意味着它们不依赖或修改外部变量。如果确实依赖于状态，就需要对每种情况进行评估，以决定它是应用的状态还是库要管理的状态。

* Any observables that the components subscribe to internally should be cleaned up and disposed of during the lifecycle of those components.

    组件内部订阅的所有可观察对象都应该在这些组件的生命周期内进行清理和释放。

* Components should expose their interactions through inputs for providing context, and outputs for communicating events to other components.

    组件对外暴露交互方式时，应该通过输入参数来提供上下文，通过输出参数来将事件传给其它组件。

* Check all internal dependencies.

    检查所有内部依赖。

   * For custom classes or interfaces used in components or service, check whether they depend on additional classes or interfaces that also need to be migrated.

        对于在组件或服务中使用的自定义类或接口，检查它们是否依赖于其它类或接口，它们也需要一起迁移。

   * Similarly, if your library code depends on a service, that service needs to be migrated.

        同样，如果你的库代码依赖于某个服务，则需要迁移该服务。

   * If your library code or its templates depend on other libraries (such as Angular Material, for instance), you must configure your library with those dependencies.

     如果你的库代码或其模板依赖于其它库（比如 Angular Material ），你就必须把它们配置为该库的依赖。

* Consider how you provide services to client applications.

  考虑如何为客户端应用提供服务。

  * Services should declare their own providers (rather than declaring providers in the NgModule or a component), so that they are *tree-shakable*. This allows the compiler to leave the service out of the bundle if it never gets injected into the application that imports the library. For more about this, see [Tree-shakable providers](guide/dependency-injection-providers#tree-shakable-providers).

    服务应该自己声明提供者（而不是在 NgModule 或组件中声明提供者），以便它们是*可摇树优化的* 。这样，如果服务器从未被注入到导入该库的应用中，编译器就会把该服务从该 bundle 中删除。有关这方面的更多信息，请参阅[Tree-shakable 提供者](guide/dependency-injection-providers#tree-shakable-providers) 。

  * If you register global service providers or share providers across multiple NgModules, use the [`forRoot()` and `forChild()` design patterns](guide/singleton-services) provided by the [RouterModule](api/router/RouterModule).

    如果您在多个 NgModules 注册全局服务供应商或供应商共享，使用[`forRoot()` 和 `forChild()` 设计模式](guide/singleton-services)由提供[RouterModule](api/router/RouterModule) 。

  * If your library provides optional services that might not be used by all client applications, support proper tree-shaking for that case by using the [lightweight token design pattern](guide/lightweight-injection-tokens).

    如果你的库中提供的可选服务可能并没有被所有的客户端应用所使用，那么就可以通过[轻量级令牌设计模式](guide/lightweight-injection-tokens)为这种情况支持正确的树状[结构了](guide/lightweight-injection-tokens) 。


{@a integrating-with-the-cli}

{@a integration with the the cli}


## Integrating with the CLI using code-generation schematics

## 使用代码生成原理图与 CLI 集成


A library typically includes *reusable code* that defines components, services, and other Angular artifacts (pipes, directives, and so on) that you simply import into a project.
A library is packaged into an npm package for publishing and sharing.
This package can also include [schematics](guide/glossary#schematic) that provide instructions for generating or transforming code directly in your project, in the same way that the CLI creates a generic new component with `ng generate component`.
A schematic that is packaged with a library can, for example, provide the Angular CLI with the information it needs to generate a component that configures and uses a particular feature, or set of features, defined in that library.
One example of this is Angular Material's navigation schematic which configures the CDK's `BreakpointObserver` and uses it with Material's `MatSideNav` and `MatToolbar` components.

库中的库通常都包含*可复用的代码* ，用于定义组件，服务，以及你刚才导入到项目中的其他 Angular 工件（管道，指令等等）。库被打包成一个 npm 包，用于发布和共享。这个包还可以包含一些[原理图](guide/glossary#schematic) ，它提供直接在项目中生成或转换代码的指令，就像 CLI 用 `ng generate component` 创建一个通用的新 `ng generate component` 。例如，用库打包的原理图可以为 Angular CLI 提供生成组件所需的信息，该组件用于配置和使用该库中定义的特定特性或一组特性。这方面的一个例子是 Angular Material 的导航原理图，它用来配置 CDK 的 `BreakpointObserver` 并把它与 Material 的 `MatSideNav` 和 `MatToolbar` 组件一起使用。


You can create and include the following kinds of schematics.

你可以创建并包含以下几种原理图。


* Include an installation schematic so that `ng add` can add your library to a project.

  包含一个安装原理图，以便 `ng add` 可以把你的库添加到项目中。

* Include generation schematics in your library so that `ng generate` can scaffold your defined artifacts (components, services, tests, and so on) in a project.

  在库中包含了生成原理图，以便 `ng generate` 可以为项目中的已定义工件（组件，服务，测试等）提供支持。

* Include an update schematic so that `ng update` can update your library’s dependencies and provide migrations for breaking changes in new releases.

  包含一个更新的原理图，以便 `ng update` 可以更新你的库的依赖，并提供一些迁移来破坏新版本中的更改。

What you include in your library depends on your task.
For example, you could define a schematic to create a dropdown that is pre-populated with canned data to show how to add it to an app.
If you want a dropdown that would contain different passed-in values each time, your library could define a schematic to create it with a given configuration. Developers could then use `ng generate` to configure an instance for their own app.

你在图书馆中所包含的内容取决于你的任务。例如，你可以定义一个原理图来创建一个预先填充了固定数据的下拉列表，以展示如何把它添加到一个应用中。如果你想要一个每次包含不同传入值的下拉列表，那么你的库可以定义一个原理图来用指定的配置创建它。然后，开发人员可以使用 `ng generate` 为自己的应用配置一个实例。

Suppose you want to read a configuration file and then generate a form based on that configuration.
If that form will need additional customization by the developer who is using your library, it might work best as a schematic.
However, if the forms will always be the same and not need much customization by developers, then you could create a dynamic component that takes the configuration and generates the form.
In general, the more complex the customization, the more useful the schematic approach.

假设你要读取配置文件，然后根据该配置生成表单。如果该表单需要库的用户进行额外的自定义，它可能最适合用作 schematic。但是，如果这些表单总是一样的，开发人员不需要做太多自定义工作，那么你就可以创建一个动态的组件来获取配置并生成表单。通常，自定义越复杂，schematic 方式就越有用。

To learn more, see [Schematics Overview](guide/schematics) and [Schematics for Libraries](guide/schematics-for-libraries).

要了解更多信息，参见 [原理图概览](guide/schematics) 和 [供库使用的原理图](guide/schematics-for-libraries)。

## Publishing your library

## 发布你的库

Use the Angular CLI and the npm package manager to build and publish your library as an npm package.

Before publishing a library to NPM, build it using the `--prod` flag which will use the older compiler and runtime known as View Engine instead of Ivy.

使用 Angular CLI 和 npm 包管理器来把你的库构建并发布成 npm 包。不建议把 Ivy 格式的库发布到 NPM 仓库。在把某个库发布到 NPM 之前，使用 `--prod` 标志构建它，此标志会使用老的编译器和运行时，也就是视图引擎（View Engine），以代替 Ivy.

<code-example language="bash">
ng build my-lib --prod
cd dist/my-lib
npm publish
</code-example>

If you've never published a package in npm before, you must create a user account. Read more in [Publishing npm Packages](https://docs.npmjs.com/getting-started/publishing-npm-packages).

如果你之前从未在 npm 中发布过包，就必须创建一个用户帐号。[点此阅读发布 npm 包](https://docs.npmjs.com/getting-started/publishing-npm-packages)的更多信息。

<div class="alert is-important">

For now, it is not recommended to publish Ivy libraries to NPM because Ivy generated code is not backward compatible with View Engine, so apps using View Engine will not be able to consume them. Furthermore, the internal Ivy instructions are not yet stable, which can potentially break consumers using a different Angular version from the one used to build the library.

When a published library is used in an Ivy app, the Angular CLI will automatically convert it to Ivy using a tool known as the Angular compatibility compiler (`ngcc`). Thus, by publishing your libraries using the View Engine compiler ensures that they can be transparently consumed by both View Engine and Ivy apps.

</div>

{@a lib-assets}

## Managing assets in a library

## 管理库中的资产（assets）

Starting with version 9.x of the [ng-packagr](https://github.com/ng-packagr/ng-packagr/blob/master/README.md) tool, you can configure the tool to automatically copy assets into your library package as part of the build process.
You can use this feature when your library needs to publish optional theming files, Sass mixins, or documentation (like a changelog).

从 [ng-packagr](https://github.com/ng-packagr/ng-packagr/blob/master/README.md) 工具的 9.x 版本开始，你可以配置它，以便在构建过程中自动把资产复制到库的发布包里。
如果你的库需要发布一些可选的主题文件、Sass mixins 或文档（比如变更记录），可以使用这个特性。

* Learn how to [copy assets into your library as part of the build](https://github.com/ng-packagr/ng-packagr/blob/master/docs/copy-assets.md).

  你可以学习如何[把资产复制到你的发布库中](https://github.com/ng-packagr/ng-packagr/blob/master/docs/copy-assets.md)。

* Learn more about how to use the tool to [embed assets in CSS](https://github.com/ng-packagr/ng-packagr/blob/master/docs/embed-assets-css.md).

  你还可以学习如何使用本工具[把资产内联到 CSS 中](https://github.com/ng-packagr/ng-packagr/blob/master/docs/embed-assets-css.md)。

## Linked libraries

## 链接库

While working on a published library, you can use [npm link](https://docs.npmjs.com/cli/link) to avoid reinstalling the library on every build.

在开发要发布的库时，可以使用 [npm link](https://docs.npmjs.com/cli/link) 来避免每次构建时都被迫重新安装库。

The library must be rebuilt on every change.
When linking a library, make sure that the build step runs in watch mode, and that the library's `package.json` configuration points at the correct entry points.
For example, `main` should point at a JavaScript file, not a TypeScript file.

必须在每次修改时都重新构建这个库。在链接库时，确保构建步骤在监视模式下运行，并且该库的 `package.json` 配置指向了正确的入口点。例如，`main` 应该指向一个 JavaScript 文件，而不是一个 TypeScript 文件。

## Use TypeScript path mapping for peer dependencies

## 对同级依赖使用 TypeScript 路径映射

Angular libraries should list all `@angular/*` dependencies as peer dependencies.
This ensures that when modules ask for Angular, they all get the exact same module.
If a library lists `@angular/core` in `dependencies` instead of `peerDependencies`, it might get a different Angular module instead, which would cause your application to break.

Angular 库应该把所有 `@angular/*` 依赖项都列为同级依赖。这确保了当各个模块请求 Angular 时，都会得到完全相同的模块。如果某个库在 `dependencies` 列出 `@angular/core` 而不是用 `peerDependencies`，它可能会得到一个不同的 Angular 模块，这会破坏你的应用。

While developing a library, you must install all peer dependencies through `devDependencies` to ensure that the library compiles properly.
A linked library will then have its own set of Angular libraries that it uses for building, located in its `node_modules` folder.
However, this can cause problems while building or running your application.

在开发库的过程中，你必须通过 `devDependencies` 安装所有的同级依赖，以确保库能够正确编译。这样，一个链接过的库就会拥有自己的一组用于构建的 Angular 库，它们位于 `node_modules` 文件夹中。但是，这会在构建或运行应用程序时引发问题。

To get around this problem you can use TypeScript path mapping to tell TypeScript that it should load some modules from a specific location.
List all the peer dependencies that your library uses in the workspace TypeScript configuration file `./tsconfig.json`, and point them at the local copy in the app's `node_modules` folder.

为了解决此问题，你可以使用 TypeScript 路径映射来告诉 TypeScript 它应该从指定的位置加载某些模块。在 TypeScript 配置文件 `./tsconfig.json` 中列出该库使用的所有同级依赖，并把它们指向应用的 `node_modules` 文件夹中的本地副本。

```
{
  "compilerOptions": {
    // ...
    // paths are relative to `baseUrl` path.
    "paths": {
      "@angular/*": [
        "./node_modules/@angular/*"
      ]
    }
  }
}
```

This mapping ensures that your library always loads the local copies of the modules it needs.

此映射可确保你的库始终加载所需模块的本地副本。

## Using your own library in apps

## 在应用中使用自己的库

You don't have to publish your library to the npm package manager in order to use it in your own apps, but you do have to build it first.

你不必把库发布到 npm 包管理器上就可以在自己的应用中使用它，但必须先构建它。

To use your own library in an app:

要想在应用中使用你自己的库：

* Build the library. You cannot use a library before it is built.

  构建该库。在构建之前，无法使用库。

 <code-example language="bash">
 ng build my-lib
 </code-example>

* In your apps, import from the library by name:

  在你的应用中，按名字从库中导入：

 ```
 import { myExport } from 'my-lib';
 ```
### Building and rebuilding your library

### 构建和重建你的库

The build step is important if you haven't published your library as an npm package and then installed the package back into your app from npm.
For instance, if you clone your git repository and run `npm install`, your editor will show the `my-lib` imports as missing if you haven't yet built your library.

如果你没有把库发布为 npm 包，然后把它从 npm 安装到你的应用中，那么构建步骤就是必要的。例如，如果你克隆了 git 仓库并运行了 `npm install`，编辑器就会把 `my-lib` 的导入显示为缺失状态（如果你还没有构建过该库）。

<div class="alert is-helpful">

When you import something from a library in an Angular app, Angular looks for a mapping between the library name and a location on disk.
When you install a library package, the mapping is in the `node_modules` folder. When you build your own library, it has to find the mapping in your `tsconfig` paths.

当你在 Angular 应用中从某个库导入一些东西时，Angular 就会寻找库名和磁盘上某个位置之间的映射关系。当你用 npm 包安装该库时，它就映射到 `node_modules` 目录下。当你自己构建库时，它就会在 `tsconfig` 路径中查找这个映射。

Generating a library with the Angular CLI automatically adds its path to the `tsconfig` file.
The Angular CLI uses the `tsconfig` paths to tell the build system where to find the library.

用 Angular CLI 生成库时，会自动把它的路径添加到 `tsconfig` 文件中。Angular CLI 使用 `tsconfig` 路径告诉构建系统在哪里寻找这个库。

</div>

If you find that changes to your library are not reflected in your app, your app is probably using an old build of the library.

如果你发现库中的更改没有反映到应用中，那么你的应用很可能正在使用这个库的旧版本。

You can rebuild your library whenever you make changes to it, but this extra step takes time.
*Incremental builds* functionality improves the library-development experience.
Every time a file is changed a partial build is performed that emits the amended files.

每当你对它进行修改时，都可以重建你的库，但这个额外的步骤需要时间。*增量构建*功能可以改善库的开发体验。每当文件发生变化时，都会执行局部构建，并修补一些文件。

Incremental builds can be run as a background process in your dev environment. To take advantage of this feature add the `--watch` flag to the build command:

增量构建可以作为开发环境中的后台进程运行。要启用这个特性，可以在构建命令中加入 `--watch` 标志：

<code-example language="bash">
ng build my-lib --watch
</code-example>

<div class="alert is-important">

The CLI `build` command uses a different builder and invokes a different build tool for libraries than it does for applications.

CLI 的 `build` 命令为库使用与应用程序不同的构建器，并调用不同的构建工具。

* The build system for apps, `@angular-devkit/build-angular`, is based on `webpack`, and is included in all new Angular CLI projects.

  应用程序的构建体系（`@angular-devkit/build-angular`）基于 `webpack`，并被包含在所有新的 Angular CLI 项目中。

* The build system for libraries is based on `ng-packagr`. It is only added to your dependencies when you add a library using `ng generate library my-lib`.

  库的构建体系基于 `ng-packagr`。只有在使用 `ng generate library my-lib` 添加库时，它才会添加到依赖项中。

The two build systems support different things, and even where they support the same things, they do those things differently.
This means that the TypeScript source can result in different JavaScript code in a built library than it would in a built application.

这两种构建体系支持不同的东西，即使它们支持相同的东西，它们的执行方式也不同。
这意味着同一套 TypeScript 源码在生成库时生成的 JavaScript 代码可能与生成应用时生成的 JavaScript 代码也不同。

For this reason, an app that depends on a library should only use TypeScript path mappings that point to the *built library*.
TypeScript path mappings should *not* point to the library source `.ts` files.

因此，依赖于库的应用应该只使用指向*内置库*的 TypeScript 路径映射。
TypeScript 的路径映射*不应该*指向库的 `.ts` 源文件。

</div>
