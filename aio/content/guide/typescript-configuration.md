# TypeScript configuration

# TypeScript 配置

TypeScript is a primary language for Angular application development.
It is a superset of JavaScript with design-time support for type safety and tooling.

TypeScript 是 Angular 应用开发中使用的主语言。
它是 JavaScript 的“方言”之一，为类型安全和工具化而做了设计期支持。

Browsers can't execute TypeScript directly.
Typescript must be "transpiled" into JavaScript using the *tsc* compiler, which requires some configuration.

浏览器不能直接执行 TypeScript。它得先用 *tsc* 编译器转译(transpile)成 JavaScript，而且编译器需要进行一些配置。

This page covers some aspects of TypeScript configuration and the TypeScript environment
that are important to Angular developers, including details about the following files:

本页面会涵盖 TypeScript 配置与环境的某些方面，这些对 Angular 开发者是很重要的。具体来说包括下列文件：

* [tsconfig.json](guide/typescript-configuration#tsconfig)&mdash;TypeScript compiler configuration.

   [tsconfig.json](guide/typescript-configuration#tsconfig) - TypeScript 编译器配置。

* [typings](guide/typescript-configuration#typings)&mdash;TypesScript declaration files.

   [typings](guide/typescript-configuration#typings) - TypesScript 类型声明文件。

{@a tsconfig}

## TypeScript configuration

## TypeScript 配置

A TypeScript configuration file called `tsconfig.json` guides the compiler as it generates JavaScript files for a project.
This file contains options and flags that are essential for Angular applications.
Typically, the file is found at the [root level of the workspace](guide/file-structure).

一个名为 `tsconfig.json` 的 TypeScript 配置文件会指导编译器如何为项目生成 JavaScript 文件。
该文件包含对 Angular 应用程序必不可少的选项和标志。
通常，该文件位于[工作区的根目录](guide/file-structure)中。

<div class="alert is-helpful">

For details about `tsconfig.json`, see the official
[TypeScript wiki](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

要了解关于 `tsconfig.json` 的详情，请参阅官方提供的
[TypeScript wiki](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。

</div>

The initial `tsconfig.json` for an Angular app typically looks like the following example.

Angular 应用的初始 `tsconfig.json` 通常是这样的。

<code-example lang="json" header="tsconfig.json" linenums="false">
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "strictTemplates": true,
    "strictInjectionParameters": true
  }
}
</code-example>

{@a noImplicitAny}

### *noImplicitAny* and *suppressImplicitAnyIndexErrors*

### *noImplicitAny* 与 *suppressImplicitAnyIndexErrors*

TypeScript developers disagree about whether the `noImplicitAny` flag should be `true` or `false`.
There is no correct answer and you can change the flag later.
But your choice now can make a difference in larger projects, so it merits discussion.

TypeScript 开发者们在 `noImplicitAny` 标志应该是 `true` 还是 `false` 上存在分歧。
这没有标准答案，你以后还可以修改这个标志。
但是你的选择会在大项目中产生显著差异，所以它值得讨论一番。

When the `noImplicitAny` flag is `false` (the default), and if
the compiler cannot infer the variable type based on how it's used,
the compiler silently defaults the type to `any`. That's what is meant by *implicit `any`*.

当 `noImplicitAny` 标志是 `false`(默认值)时，
如果编译器无法根据变量的用途推断出变量的类型，它就会悄悄的把变量类型默认为 `any`。这就是*隐式 `any`*的含义。

When the `noImplicitAny` flag is `true` and the TypeScript compiler cannot infer
the type, it still generates the JavaScript files, but it also **reports an error**.
Many seasoned developers prefer this stricter setting because type checking catches more
unintentional errors at compile time.

当 `noImplicitAny` 标志是 `true` 并且 TypeScript 编译器无法推断出类型时，它仍然会生成 JavaScript 文件。
但是它也会**报告一个错误**。
很多饱经沧桑的程序员更喜欢这种严格的设置，因为类型检查能在编译期间捕获更多意外错误。

You can set a variable's type to `any` even when the `noImplicitAny` flag is `true`.

即使 `noImplicitAny` 标志被设置成了 `true`，你也可以把变量的类型设置为 `any`。

When the `noImplicitAny` flag is `true`, you may get *implicit index errors* as well.
Most developers feel that *this particular error* is more annoying than helpful.
You can suppress them with the following additional flag:

如果把 `noImplicitAny` 标志设置为了 `true`，你可能会得到*隐式索引错*。
大多数程序员可能觉得*这种错误*是个烦恼而不是助力。
你可以使用另一个标志来禁止它们。

<code-example>

  "suppressImplicitAnyIndexErrors": true

</code-example>

<div class="alert is-helpful">

For more information about how the TypeScript configuration affects compilation, see [Angular Compiler Options](guide/angular-compiler-options) and [Template Type Checking](guide/template-typecheck).

要了解 TypeScript 配置如何影响编译的更多信息，请参见 [Angular 编译器选项](guide/angular-compiler-options)和[模板类型检查](guide/template-typecheck) 两章。

</div>

{@a typings}

## TypeScript typings

## TypeScript 类型定义(typings)

Many JavaScript libraries, such as jQuery, the Jasmine testing library, and Angular,
extend the JavaScript environment with features and syntax
that the TypeScript compiler doesn't recognize natively.
When the compiler doesn't recognize something, it throws an error.

很多 JavaScript 库，比如 jQuery、Jasmine 测试库和 Angular，会通过新的特性和语法来扩展 JavaScript 环境。
而 TypeScript 编译器并不能原生的识别它们。
当编译器不能识别时，它就会抛出一个错误。

Use [TypeScript type definition files](https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)&mdash;`d.ts files`&mdash;to tell the compiler about the libraries you load.

可以使用[TypeScript 类型定义文件](https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)
—— `.d.ts` 文件 —— 来告诉编译器你要加载的库的类型定义。

TypeScript-aware editors leverage these same definition files to display type information about library features.

TypeScript 敏感的编辑器借助这些定义文件来显示这些库中各个特性的类型定义。

Many libraries include definition files in their npm packages where both the TypeScript compiler and editors
can find them. Angular is one such library.
The `node_modules/@angular/core/` folder of any Angular application contains several `d.ts` files that describe parts of Angular.

很多库在自己的 npm 包中都包含了它们的类型定义文件，TypeScript 编译器和编辑器都能找到它们。Angular 库也是这样的。
任何 Angular 应用程序的 `node_modules/@angular/core/` 目录下，都包含几个 `d.ts` 文件，它们描述了 Angular 的各个部分。

<div class="alert is-helpful">

You don't need to do anything to get *typings* files for library packages that include `d.ts` files.
Angular packages include them already.

你不需要为那些包含了 `d.ts` 文件的库获取*类型定义*文件 —— Angular 的所有包都是如此。

</div>

### lib.d.ts

### lib.d.ts 文件

TypeScript includes a special declaration file called `lib.d.ts`. This file contains the ambient declarations for various common JavaScript constructs present in JavaScript runtimes and the DOM.

TypeScript 带有一个特殊的声明文件，名为 `lib.d.ts`。该文件包含了 JavaScript 运行库和 DOM 的各种常用 JavaScript 环境声明。

Based on the `--target`, TypeScript adds _additional_ ambient declarations
like `Promise` if the target is `es6`.

基于 `--target`，TypeScript 添加*额外*的环境声明，例如如果目标为 `es6` 时将添加 `Promise`。

By default, the target is `es2015`. If you are targeting `es5`, you still have newer type declarations due to the list of declaration files included:

默认情况下，目标是 `es2015`。如果你把目标改为 `es5`，那么由于包含了声明文件列表，你仍然拥有较新的类型声明：

<code-example path="getting-started/tsconfig.0.json" header="tsconfig.json (lib excerpt)" region="lib">

</code-example>

### Installable typings files

### 安装类型定义文件

Many libraries&mdash;jQuery, Jasmine, and Lodash among them&mdash;do *not* include `d.ts` files in their npm packages.
Fortunately, either their authors or community contributors have created separate `d.ts` files for these libraries and
published them in well-known locations.

遗憾的是，很多库 —— jQuery、Jasmine 和 Lodash 等库 —— 都*没有*在它们自己的 npm 包中包含 `d.ts` 文件。
  幸运的是，它们的作者或社区中的贡献者已经为这些库创建了独立的 `d.ts` 文件，并且把它们发布到了一个众所周知的位置。

You can install these typings via `npm` using the
[`@types/*` scoped package](http://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)
and Typescript, starting at 2.0, automatically recognizes them.

你还可以通过 `npm` 来使用[`@types/*` 范围化包](http://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)来安装这些类型信息，
而 TypeScript 自从 2.0 开始，可以自动识别它们。

For instance, to install typings for `jasmine` you run `npm install @types/jasmine --save-dev`.

比如，要安装 `jasmine` 的类型信息，你可以执行 `npm install @types/jasmine --save-dev`。

{@a target}

### *target*

### *编译目标（target）*

By default, the target is `es2015`, which is supported only in modern browsers. You can configure the target to `es5` to specifically support legacy browsers. [Differential loading](guide/deployment#differential-loading) is also provided by the Angular CLI to support modern, and legacy browsers with separate bundles.

默认情况下，编译目标是 `es2015`，只有现代浏览器才支持它。
你可以把编译目标配置为 `es5` 以指定支持老式浏览器。
Angular CLI 还提供了[差异化加载](guide/deployment#differential-loading)功能，以便使用不同的包来分别支持现代浏览器和老式浏览器。