# JavaScript modules vs. NgModules

# JavaScript 模块 vs. NgModule

JavaScript modules and NgModules can help you modularize your code, but they are very different.
Angular apps rely on both kinds of modules.

JavaScript 模块和 NgModule 都可以帮你模块化你的代码，但它们却有着本质性的不同。 Angular 应用同时依赖这两种模块。

## JavaScript modules: Files containing code

## JavaScript 模块：包含代码的文件

A [JavaScript module](https://javascript.info/modules "JavaScript.Info - Modules") is an individual file with JavaScript code, usually containing a class or a library of functions for a specific purpose within your app.
JavaScript modules let you spread your work across multiple files.

[JavaScript 模块](https://javascript.info/modules "JavaScript.Info  - 模块")是一个带有 JavaScript 代码的单独文件，它通常包含一个应用中特定用途的类或函数库。 JavaScript 模块让你可以跨多个文件进行工作。

<div class="alert is-helpful">

To learn more about JavaScript modules, see [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/).
For the module specification, see the [6th Edition of the ECMAScript standard](https://www.ecma-international.org/ecma-262/6.0/#sec-modules).

要了解更多关于 JavaScript 模块的信息，参阅[深入 ES6：模块](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) 。关于模块规范的更多信息，请参阅[ECMAScript 标准第 6 版](https://www.ecma-international.org/ecma-262/6.0/#sec-modules)。

</div>

To make the code in a JavaScript module available to other modules, use an `export` statement at the end of the relevant code in the module, such as the following:

要让 JavaScript 模块中的代码可用于其它模块，请在模块中相关代码的末尾使用 `export` 导出它，比如：

```typescript
export class AppComponent { ... }
```

When you need that module’s code in another module, use an `import` statement as follows:

如果你在另一个模块中需要来自本模块的代码时，请使用 `import` 语句，如下所示：

```typescript
import { AppComponent } from './app.component';
```

Each module has its own top-level scope.
In other words, top-level variables and functions in a module are not seen in other scripts or modules.
Each module provides a namespace for identifiers to prevent them from clashing with identifiers in other modules.
With multiple modules, you can prevent accidental global variables by creating a single global namespace and adding sub-modules to it.

每个模块都有自己的顶级作用域。换句话说，模块中的顶级变量和函数在其他脚本或模块中是看不到的。每个模块都为其中的标识符提供了一个命名空间，以防止它们与其它模块中的标识符冲突。要想使用多个模块，你可以通过创建一个全局命名空间并为它添加子模块来防止出现意外的全局变量。

The Angular framework itself is loaded as a set of JavaScript modules.

Angular 框架本身就是作为一组 JavaScript 模块加载的。

## NgModules: Classes with metadata for compiling

## NgModule：带有供编译用的元数据的类

An [NgModule](guide/glossary#ngmodule "Definition of NgModule") is a class marked by the `@NgModule` decorator with a metadata object that describes how that particular part of the app fits together with the other parts.
NgModules are specific to Angular.
While classes with an `@NgModule` decorator are by convention kept in their own files, they differ from JavaScript modules because they include this metadata.

[NgModule](guide/glossary#ngmodule "NgModule 的定义") 是带有 `@NgModule` 装饰器标记的类，它带有一个描述该应用里这个特定部分要如何与其他部分配合使用的元数据对象。 NgModule 是 Angular 特有的。虽然带有 `@NgModule` 装饰器的类一般也保存在单独的文件中，但它们与 JavaScript 模块的不同，因为它们包含这种元数据。

The `@NgModule` metadata plays an important role in guiding the Angular compilation process that converts the app code you write into highly performant JavaScript code.
The metadata describes how to compile a component's template and how to create an [injector](guide/glossary#injector "Definition of injector") at runtime.
It identifies the NgModule's [components](guide/glossary#component "Definition of component"), [directives](guide/glossary#directive "Definition of directive"), and [pipes](guide/glossary#pipe "Definition of pipe)"),
and makes some of them public through the `exports` property so that external components can use them.
You can also use an NgModule to add [providers](guide/glossary#provider "Definition of provider") for [services](guide/glossary#service "Definition of a service"), so that the services are available elsewhere in your app.

`@NgModule` 元数据在指导 Angular 编译过程中发挥了重要作用，它把你编写的应用代码转换成高效的 JavaScript 代码。元数据描述了如何编译组件模板以及如何在运行时[创建注入器](guide/glossary#injector "喷油器的定义")。它标出了 NgModule 的[组件](guide/glossary#component "组件的定义")、[指令](guide/glossary#directive "指令的定义")和[管道](guide/glossary#pipe "管子的定义）")，并且通过 `exports` 属性把它们中的一部分标为公开的，以便外部组件可以使用它们。你还可以使用 NgModule 为[服务](guide/glossary#service "服务的定义")[添加服务提供者](guide/glossary#provider "提供者的定义")，以便这些服务可以用在你应用的其他地方。

Rather than defining all member classes in one giant file as a JavaScript module, declare which components, directives, and pipes belong to the NgModule in the `@NgModule.declarations` list.
These classes are called [declarables](guide/glossary#declarable "Definition of a declarable").
An NgModule can export only the declarable classes it owns or imports from other NgModules.
It doesn't declare or export any other kind of class.
Declarables are the only classes that matter to the Angular compilation process.

不要把所有类都作为 JavaScript 模块定义在一个巨型文件中，而应该在 `@NgModule.declarations` 列表中声明哪些组件、指令和管道属于这个 NgModule。这些类叫做[可声明对象](guide/glossary#declarable "可声明的定义") 。NgModule 只能导出它自己拥有的可声明对象类或从其他 NgModule 中导入的类。它不会声明或导出任何其他类型的类。对 Angular 编译过程来说，可声明对象是唯一值得关注的类。

For a complete description of the NgModule metadata properties, see [Using the NgModule metadata](guide/ngmodule-api "Using the NgModule metadata").

关于 NgModule 元数据属性的完整描述，请参阅[使用 NgModule 元数据](guide/ngmodule-api "使用 NgModule 元数据")。

## An example that uses both

## 同时使用两者的例子

The root NgModule `AppModule` generated by the [Angular CLI](cli) for a new app project demonstrates how you use both kinds of modules:

[Angular CLI](cli)为新应用项目生成的根模块 `AppModule` 演示了如何使用这两种模块：

<code-example path="ngmodules/src/app/app.module.1.ts" header="src/app/app.module.ts (default AppModule)"></code-example>

The root NgModule starts with `import` statements to import JavaScript modules.
It then configures the `@NgModule` with the following arrays:

根模块根据 `import` 语句开头导入 JavaScript 模块。然后使用下列数组 `@NgModule`

* `declarations`: The components, directives, and pipes that belong to the NgModule.
  A new app project's root NgModule has only one component, called `AppComponent`.

  `declarations` ：属于该 NgModule 的组件、指令和管道。新应用项目的根模块中只有一个叫做 `AppComponent` 的组件。

* `imports`: Other NgModules you are using, so that you can use their declarables.
  The newly generated root NgModule imports [`BrowserModule`](api/platform-browser/BrowserModule "BrowserModule NgModule") in order to use browser-specific services such as [DOM](https://www.w3.org/TR/DOM-Level-2-Core/introduction.html "Definition of Document Object Model") rendering, sanitization, and location.

  `imports` ：你要用的其他 NgModule，这样你才可以使用它们的可声明对象。新生成的根模块会导入[`BrowserModule`](api/platform-browser/BrowserModule "BrowserModule NgModule") ，以便使用特定于浏览器的服务，比如 [DOM](https://www.w3.org/TR/DOM-Level-2-Core/introduction.html "文档对象模型的定义") 渲染、无害化处理和定位。

* `providers`: Providers of services that components in other NgModules can use.
  There are no providers in a newly generated root NgModule.

  `providers` ：一些服务提供者，可供其他 NgModule 中的组件使用。新生成的根模块中没有提供者。

* `bootstrap`: The [entry component](guide/entry-components "Specifying an entry component") that Angular creates and inserts into the `index.html` host web page, thereby bootstrapping the app.
  This entry component, `AppComponent`, appears in both the `declarations` and the `bootstrap` arrays.

  `bootstrap` ： [Angular 创建的入口组件](guide/entry-components "指定一个入口组件")，Angular 会创建它，并把它插入到宿主页面 `index.html` 中，从而引导该应用。这个入口组件 `AppComponent` 会同时出现在 `declarations` 和 `bootstrap` 数组中。

## Next steps

## 下一步

* For more about NgModules, see [Organizing your app with NgModules](guide/ngmodules "Organizing your app with NgModules").

  关于 NgModule 的更多信息，请参阅[使用 NgModule 组织你的应用](guide/ngmodules "使用 NgModules 整理你的应用")。

* To learn more about the root NgModule, see [Launching an app with a root NgModule](guide/bootstrapping "Launching an app with a root NgModule").

  要了解关于根模块的更多信息，请参阅使用根模块[启动应用](guide/bootstrapping "用 NgModule 根启动一款应用")。

* To learn about frequently used Angular NgModules and how to import them into your app, see [Frequently-used modules](guide/frequent-ngmodules "Frequently-used modules").

  要了解经常使用的那些 Angular NgModule 以及如何将它们导入你的应用，请参阅[常用模块](guide/frequent-ngmodules "经常使用的模块")。

