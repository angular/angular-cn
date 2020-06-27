# Using published libraries

# 使用已发布的库

When building Angular applications you can take advantage of sophisticated first-party libraries, such as [Angular Material](https://material.angular.io/), as well as rich ecosystem of third-party libraries.
See the [Angular Resources](resources) page for links to the most popular ones.

当构建 Angular 应用时，你可以从精致的第一方库，比如 [Angular Material](https://material.angular.cn/)，以及丰富的第三方库生态系统中获益。参见 [Angular 资源集](/resources)页面，了解最常用的库链接。

## Installing libraries

## 安装库

Libraries are published as [npm packages](guide/npm-packages), usually together with schematics that integrate them with the Angular CLI.
To integrate reusable library code into an application, you need to install the package and import the provided functionality where you will use it. For most published Angular libraries, you can use the Angular CLI `ng add <lib_name>` command.

这些库都是作为 [npm 包](guide/npm-packages)发布的，它们通常都带有一些与 Angular CLI 集成好的 schematic。要把可复用的库代码集成到应用中，你需要安装该软件包并在使用时导入它提供的功能。对于大多数已发布的 Angular 库，你可以使用 Angular CLI 的 `ng add <lib_name>` 命令。

The `ng add` command uses the npm package manager or [yarn](https://yarnpkg.com/) to install the library package, and invokes schematics that are included in the package to other scaffolding within the project code, such as adding import statements, fonts, themes, and so on.

`ng add` 命令使用 npm 包管理器或 [yarn](https://yarnpkg.com/) 来安装库包，并调用该包中的 schematic 在项目代码中的添加脚手架，比如添加 import 语句、添加 fonts，添加 themes 等。

A published library typically provides a README or other documentation on how to add that lib to your app.
For an example, see [Angular Material](https://material.angular.io/) docs.

已发布的库通常会提供 README 或者其它文档来介绍如何把该库添加到你的应用中。例子可参见 [Angular Material](https://material.angular.io/) 文档。

### Library typings

### 库的类型

Library packages often include typings in `.d.ts` files; see examples in `node_modules/@angular/material`. If your library's package does not include typings and your IDE complains, you may need to install the library's associated `@types/<lib_name>` package.

库包中通常会在 `.d.ts` 文件中包含类型信息。参见 `node_modules/@angular/material` 中的例子。如果你的库包中没有包含类型信息并且你的 IDE 报错，你可能需要安装与这个库关联的 `@types/<lib_name>` 包。

For example, suppose you have a library named `d3`:

比如，假设你有一个名为 `d3` 的库：

<code-example language="bash">
npm install d3 --save
npm install @types/d3 --save-dev
</code-example>

Types defined in a `@types/` package for a library installed into the workspace are automatically added to the TypeScript configuration for the project that uses that library.
TypeScript looks for types in the `node_modules/@types` folder by default, so you don't have to add each type package individually.

已安装到工作区中的 `@types/` 包中所定义的类型，会自动添加到使用该库的项目的 TypeScript 配置文件中。TypeScript 默认就会在 `node_modules/@types` 文件夹中查找类型，所以你不必单独添加每一个类型包。

If a library doesn't have typings available at `@types/`, you can still use it by manually adding typings for it.
To do this:

如果某个库没有 `@types/` 类型信息，你仍然可以手动为它添加一些类型信息。为此你要：

1. Create a `typings.d.ts` file in your `src/` folder. This file is automatically included as global type definition.

    在 `src/` 文件夹中创建一个 `typings.d.ts` 文件。该文件会自动包含在全局类型定义中。

2. Add the following code in `src/typings.d.ts`.

    在 `src/typings.d.ts` 中添加如下代码。

```
declare module 'host' {
  export interface Host {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(url: string, queryString?: string): Host;
}
```

3. In the component or file that uses the library, add the following code.

    在使用该库的组件或文件中，添加如下代码。

```
import * as host from 'host';
const parsedUrl = host.parse('https://angular.io');
console.log(parsedUrl.hostname);
```

You can define more typings as needed.

你可以按需定义更多类型。

## Updating libraries

## 更新这些库

Libraries can be updated by their publishers, and also have their own dependencies which need to be kept current.
To check for updates to your installed libraries, use the [`ng update` command](cli/update).

库的发布者可以对这些库进行更新，而这些库也有自己的依赖，所有依赖都需要保持最新。要检查已安装库的更新，请使用 [`ng update` 命令](cli/update)。

Use `ng update <lib_name>` to update individual library versions. The Angular CLI checks the latest published release of the library, and if the latest version is newer than your installed version, downloads it and updates your `package.json` to match the latest version.

使用 `ng update <lib_name>` 来单独更新某个库的版本。Angular CLI 会检查库中最新发布的版本，如果最新版本比你已安装的版本新，就会下载它并更新你的 `package.json` 以匹配最新版本。

When you update Angular to a new version, you need to make sure that any libraries you are using are current. If libraries have interdependencies, you might have to update them in a particular order.
See the [Angular Update Guide](https://update.angular.io/) for help.

当把 Angular 更新到新版本时，你需要确保所用的库都是最新的。如果库之间相互依赖，你可能还要按特定的顺序更新它们。请参阅 [Angular 升级指南](https://update.angular.io/)以获取帮助。

## Adding a library to the runtime global scope

## 把某个库添加到运行时的全局范围中

Legacy JavaScript libraries that are not imported into an app can be added to the runtime global scope and loaded as if they were in a script tag.
Configure the CLI to do this at build time using the "scripts" and "styles" options of the build target in the [CLI configuration file](guide/workspace-config), `angular.json`.

那些没有导入到应用中的旧版 JavaScript 库可以添加到运行时的全局作用域中，并像在 script 标签中一样加载。可以在 [CLI 配置文件](guide/workspace-config) `angular.json` 中的构建目标（build target）的 "scripts" 和 "styles" 选项中配置 CLI，以便在构建期间添加这些文件。

For example, to use the [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) library, first install the library and its dependencies using the npm package manager:

例如，要使用 [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)，首先就要使用 npm 包管理器来安装该库及其依赖：

<code-example language="bash">
npm install jquery --save
npm install popper.js --save
npm install bootstrap --save
</code-example>

In the `angular.json` configuration file, add the associated script files to the "scripts" array:

在 `angular.json` 配置文件中，把关联的脚本文件添加到 "scripts" 数组中：

```
"scripts": [
  "node_modules/jquery/dist/jquery.slim.js",
  "node_modules/popper.js/dist/umd/popper.js",
  "node_modules/bootstrap/dist/js/bootstrap.js"
],
```

Add the Bootstrap CSS file to the "styles" array:

把 Bootstrap 的 CSS 文件添加到 "styles" 数组中：

```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "src/styles.css"
],
```

Run or restart `ng serve` to see Bootstrap 4 working in your app.

运行或重启 `ng serve`，看看你的应用是否正在使用 Bootstrap 4。

### Using runtime-global libraries inside your app

### 在你的应用中使用运行时全局库

Once you import a library using the "scripts" array, you should **not** import it using an import statement in your TypeScript code (such as `import * as $ from 'jquery';`).
If you do, you'll end up with two different copies of the library: one imported as a global library, and one imported as a module.
This is especially bad for libraries with plugins, like JQuery, because each copy will have different plugins.

当你用 "scripts" 数组导入一个库后，就**不应该**在你的 TypeScript 代码中再用 import 语句来导入它了（比如：`import * as $ from 'jquery';`）。如果你这样做，就会得到该库两个不同的副本：一个作为全局库导入，另一个作为模块导入。这对于那些带有插件的库来说特别糟糕，比如 JQuery，因为每个副本都会有不同的插件。

Instead, download typings for your library (`npm install @types/jquery`) and follow the library installation steps. This gives you access to the global variables exposed by that library.

相反，为你的库下载类型信息（`npm install @types/jquery`），并按照库的安装步骤进行操作。这让你可以访问该库暴露出来的全局变量。

### Defining typings for runtime-global libraries

### 定义运行时全局库的类型信息

If the global library you need to use does not have global typings, you can declare them manually as `any` in `src/typings.d.ts`. For example:

如果你要用的全局库没有全局类型信息，就可以在 `src/typings.d.ts` 中手动声明它们。例如：

```
declare var libraryName: any;
```

Some scripts extend other libraries; for instance with JQuery plugins:

有些脚本扩展了其它库，例如 JQuery 插件：

```
$('.test').myPlugin();
```

In this case, the installed `@types/jquery` doesn't include `myPlugin`, so you need to add an interface in `src/typings.d.ts`. For example:

在这种情况下，所安装的 `@types/jquery` 就不包含 `myPlugin`，所以你需要在 `src/typings.d.ts` 中添加一个接口。例如：

```
interface JQuery {
  myPlugin(options?: any): any;
}
```

If don't add the interface for the script-defined extension, your IDE shows an error:

如果不为这个由脚本定义的扩展添加接口，IDE 就会显示错误：

```
[TS][Error] Property 'myPlugin' does not exist on type 'JQuery'
```
