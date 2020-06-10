# Ahead-of-time (AOT) compilation

# 预先（AOT）编译器

An Angular application consists mainly of components and their HTML templates. Because the components and templates provided by Angular cannot be understood by the browser directly, Angular applications require a compilation process before they can run in a browser.

Angular 应用主要由组件及其 HTML 模板组成。由于浏览器无法直接理解 Angular 所提供的组件和模板，因此 Angular 应用程序需要先进行编译才能在浏览器中运行。

The Angular [ahead-of-time (AOT) compiler](guide/glossary#aot) converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase _before_ the browser downloads and runs that code. Compiling your application during the build process provides a faster rendering in the browser.

在浏览器下载和运行代码*之前*的编译阶段，Angular 预先（AOT）编译器会先把你的 Angular HTML 和 TypeScript 代码转换成高效的 JavaScript 代码。
在构建期间编译应用可以让浏览器中的渲染更快速。

This guide explains how to specify metadata and apply available compiler options to compile your applications efficiently using the AOT compiler.

本指南中解释了如何指定元数据，并使用一些编译器选项以借助 AOT 编译器来更有效的编译应用。

<div class="alert is-helpful">

  <a href="https://www.youtube.com/watch?v=anphffaCZrQ">Watch Alex Rickabaugh explain the Angular compiler</a> at AngularConnect 2019.

  观看编译器作者 Tobias Bosch 在 AngularConnect 2016 大会里，对<a href="http://v.youku.com/v_show/id_XMTc1NTE4NTkwOA==.html?from=y1.7-1.4" target="_blank">Angular 编译器</a>的演讲。

</div>

{@a why-aot}

Here are some reasons you might want to use AOT.

下面是你可能要使用 AOT 的部分原因。

* *Faster rendering*
   With AOT, the browser downloads a pre-compiled version of the application.
   The browser loads executable code so it can render the application immediately, without waiting to compile the app first.

  *更快的渲染*。
  借助 AOT，浏览器可以下载应用的预编译版本。浏览器加载的是可执行代码，因此它可以立即渲染应用，而无需等待先编译好应用。

* *Fewer asynchronous requests*
   The compiler _inlines_ external HTML templates and CSS style sheets within the application JavaScript,
   eliminating separate ajax requests for those source files.

  *更少的异步请求*。
  编译器会在应用 JavaScript 中内*联*外部 HTML 模板和 CSS 样式表，从而消除了对那些源文件的单独 ajax 请求。

* *Smaller Angular framework download size*
   There's no need to download the Angular compiler if the app is already compiled.
   The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.

  *较小的 Angular 框架下载大小*。
  如果已编译应用程序，则无需下载 Angular 编译器。编译器大约是 Angular 本身的一半，因此省略编译器会大大减少应用程序的有效载荷。

* *Detect template errors earlier*
   The AOT compiler detects and reports template binding errors during the build step
   before users can see them.

  *尽早检测模板错误*。
  AOT 编译器会在构建步骤中检测并报告模板绑定错误，然后用户才能看到它们。

* *Better security*
   AOT compiles HTML templates and components into JavaScript files long before they are served to the client.
   With no templates to read and no risky client-side HTML or JavaScript evaluation,
   there are fewer opportunities for injection attacks.

  *更高的安全性*。
  AOT 在将 HTML 模板和组件提供给客户端之前就将其编译为 JavaScript 文件。没有要读取的模板，没有潜藏风险的客户端 HTML 或 JavaScript eval，受到注入攻击的机会就更少了。

{@a overview}

## Choosing a compiler

## 选择编译器

Angular offers two ways to compile your application:

Angular 提供了两种方式来编译你的应用：

* **_Just-in-Time_ (JIT)**, which compiles your app in the browser at runtime. This was the default until Angular 8.

  ***即时编译* (JIT)**，它会在运行期间在浏览器中编译你的应用。这是 Angular 8 及更早版本的默认值。

* **_Ahead-of-Time_ (AOT)**, which compiles your app and libraries at build time. This is the default since Angular 9.

   **预先（AOT）编译**，它会在构建时编译你的应用和库。这是 Angular 9 及后续版本的默认值。

When you run the [`ng build`](cli/build) (build only) or [`ng serve`](cli/serve) (build and serve locally) CLI commands, the type of compilation (JIT or AOT) depends on the value of the `aot` property in your build configuration specified in `angular.json`. By default, `aot` is set to `true` for new CLI apps.

当运行 CLI 命令 [`ng build`](cli/build) (只构建) 或 [`ng serve`](cli/serve) (构建并启动本地服务器) 时，编译类型（JIT 或 AOT）取决于你在 `angular.json` 中的构建配置所指定的 `aot` 属性。默认情况下，对于新的 CLI 应用，其 `aot` 为 `true`。

See the [CLI command reference](cli) and [Building and serving Angular apps](guide/build) for more information.

要了解更多，请参见[CLI 文档](cli)，和 [构建与运行 Angular 应用](guide/build)。

## How AOT works

## AOT 工作原理

The Angular AOT compiler extracts **metadata** to interpret the parts of the application that Angular is supposed to manage.
You can specify the metadata explicitly in **decorators** such as `@Component()` and `@Input()`, or implicitly in the constructor declarations of the decorated classes.
The metadata tells Angular how to construct instances of your application classes and interact with them at runtime.

Angular AOT 编译器会提取**元数据**来解释应由 Angular 管理的应用程序部分。你可以在**装饰器**（例如 `@Component()` 和 `@Input()`）中显式指定元数据，也可以在**被装饰的类**的构造函数声明中隐式指定元数据。元数据告诉 Angular 要如何构造应用程序类的实例并在运行时与它们进行交互。

In the following example, the `@Component()` metadata object and the class constructor tell Angular how to create and display an instance of `TypicalComponent`.

在下列范例中，`@Component()` 元数据对象和类的构造函数会告诉 Angular 如何创建和显示 `TypicalComponent` 的实例。

```typescript

@Component({
  selector: 'app-typical',
  template: '<div>A typical component for {{data.name}}</div>'
)}
export class TypicalComponent {
  @Input() data: TypicalData;
  constructor(private someService: SomeService) { ... }
}

```

The Angular compiler extracts the metadata _once_ and generates a _factory_ for `TypicalComponent`.
When it needs to create a `TypicalComponent` instance, Angular calls the factory, which produces a new visual element, bound to a new instance of the component class with its injected dependency.

Angular 编译器只提取**一次**元数据，并且为 `TypicalComponent` 生成一个**工厂**。
当它需要创建 `TypicalComponent` 的实例时，Angular 调用这个工厂，工厂会生成一个新的可视元素，并且把它（及其依赖）绑定到组件类的一个新实例上。

### Compilation phases

### 编译的各个阶段

There are three phases of AOT compilation.

AOT 编译分为三个阶段。

* Phase 1 is *code analysis*.
   In this phase, the TypeScript compiler and  *AOT collector* create a representation of the source. The collector does not attempt to interpret the metadata it collects. It represents the metadata as best it can and records errors when it detects a metadata syntax violation.

  阶段 1 是*代码分析*。
  在此阶段，TypeScript 编译器和 *AOT 收集器*会创建源码的表现层。收集器不会尝试解释其收集到的元数据。它只是尽可能地表达元数据，并在检测到元数据语法冲突时记录错误。

* Phase 2 is *code generation*.
    In this phase, the compiler's `StaticReflector` interprets the metadata collected in phase 1, performs additional validation of the metadata, and throws an error if it detects a metadata restriction violation.

  第二阶段是*代码生成*。
  在此阶段，编译器的 `StaticReflector` 会解释在阶段 1 中收集的元数据，对元数据执行附加验证，如果检测到元数据违反了限制，则抛出错误。

* Phase 3 is *template type checking*.
   In this optional phase, the Angular *template compiler* uses the TypeScript compiler to validate the binding expressions in templates. You can enable this phase explicitly by setting the `fullTemplateTypeCheck` configuration option; see [Angular compiler options](guide/angular-compiler-options).

  阶段 3 是*模板类型检查*。在此可选阶段，Angular *模板编译器*使用 TypeScript 编译器来验证模板中的绑定表达式。你可以通过设置 `fullTemplateTypeCheck` 配置选项来明确启用此阶段。请参阅 [Angular 编译器选项](guide/angular-compiler-options)。

### Metadata restrictions

### 元数据的限制

You write metadata in a _subset_ of TypeScript that must conform to the following general constraints:

你只能使用 TypeScript 的一个**子集**书写元数据，它必须满足下列限制：

* Limit [expression syntax](#expression-syntax) to the supported subset of JavaScript.

   [表达式语法](#expression-syntax)只支持 JavaScript 的一个有限的子集。

* Only reference exported symbols after [code folding](#code-folding).

   只能引用[代码收缩](#code-folding)后导出的符号。

* Only call [functions supported](#supported-functions) by the compiler.

   只能调用编译器[支持的那些函数](#supported-functions)。

* Decorated and data-bound class members must be public.

   被装饰和用于数据绑定的类成员必须是公共（public）的。

For additional guidelines and instructions on preparing an application for AOT compilation, see [Angular: Writing AOT-friendly applications](https://medium.com/sparkles-blog/angular-writing-aot-friendly-applications-7b64c8afbe3f).

有关准备 AOT 编译应用程序的其它准则和说明，请参阅 [Angular：编写 AOT 友好的应用程序](https://medium.com/sparkles-blog/angular-writing-aot-friendly-applications-7b64c8afbe3f)。

<div class="alert is-helpful">

Errors in AOT compilation commonly occur because of metadata that does not conform to the compiler's requirements (as described more fully below).
For help in understanding and resolving these problems, see [AOT Metadata Errors](guide/aot-metadata-errors).

AOT 编译中的错误通常是由于元数据不符合编译器的要求而发生的（下面将更全面地介绍）。为了帮助你理解和解决这些问题，请参阅 [AOT 元数据错误](guide/aot-metadata-errors)。

</div>

### Configuring AOT compilation

### 配置 AOT 编译

You can provide options in the `tsconfig.json` [TypeScript configuration file](guide/typescript-configuration) that control the compilation process. See [Angular compiler options](guide/angular-compiler-options) for a complete list of available options.

你可以在 `tsconfig.json` [TypeScript 配置文件](guide/typescript-configuration)中提供控制编译过程的选项。有关可用选项的完整列表，请参见 [Angular 编译器](guide/angular-compiler-options)选项。

## Phase 1: Code analysis

## 阶段 1：分析

The TypeScript compiler does some of the analytic work of the first phase. It emits the `.d.ts` _type definition files_ with type information that the AOT compiler needs to generate application code.

TypeScript 编译器会做一些初步的分析工作，它会生成**类型定义文件**`.d.ts`，其中带有类型信息，Angular 编译器需要借助它们来生成代码。

At the same time, the AOT **collector** analyzes the metadata recorded in the Angular decorators and outputs metadata information in **`.metadata.json`** files, one per `.d.ts` file.

同时，AOT **收集器（collector）** 会记录 Angular 装饰器中的元数据，并把它们输出到**`.metadata.json`**文件中，和每个 `.d.ts` 文件相对应。

You can think of `.metadata.json` as a diagram of the overall structure of a decorator's metadata, represented as an [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

你可以把 `.metadata.json` 文件看做一个包括全部装饰器的元数据的全景图，就像[抽象语法树 (AST) ](https://en.wikipedia.org/wiki/Abstract_syntax_tree)一样。

<div class="alert is-helpful">

Angular's [schema.ts](https://github.com/angular/angular/blob/master/packages/compiler-cli/src/metadata/schema.ts)
describes the JSON format as a collection of TypeScript interfaces.

Angular 的 [schema.ts](https://github.com/angular/angular/blob/master/packages/compiler-cli/src/metadata/schema.ts) 把这个 JSON 格式表示成了一组 TypeScript 接口。

</div>

{@a expression-syntax}

### Expression syntax limitations

### 表达式语法限制

The AOT collector only understands a subset of JavaScript.
Define metadata objects with the following limited syntax:

AOT 收集器只能理解 JavaScript 的一个子集。
定义元数据对象时要遵循下列语法限制：

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>

  <th>

  Syntax

  语法

  </th>

  <th>

  Example

  范例

  </th>

  </tr>
  <tr>

  <td>

  Literal object 

  对象字面量

  </td>

  <td>

  <code>{cherry: true, apple: true, mincemeat: false}</code>

  </td>

  </tr>
  <tr>

  <td>

  Literal array  

  数组字面量

  </td>

  <td>

  <code>['cherries', 'flour', 'sugar']</code>

  </td>

  </tr>
  <tr>

  <td>

  Spread in literal array

  展开数组字面量

  </td>

  <td>

  <code>['apples', 'flour', ...the_rest]</code>

  </td>

  </tr>
   <tr>

  <td>

  Calls

  函数调用

  </td>

  <td>

  <code>bake(ingredients)</code>

  </td>

  </tr>
   <tr>

  <td>

  New

  新建对象

  </td>

  <td>

  <code>new Oven()</code>

  </td>

  </tr>
   <tr>

  <td>

  Property access

  属性访问

  </td>

  <td>

  <code>pie.slice</code>

  </td>

  </tr>
   <tr>

  <td>

  Array index

  数组索引访问

  </td>

  <td>

  <code>ingredients[0]</code>

  </td>

  </tr>
   <tr>

  <td>

  Identity reference

  引用标识符

  </td>

  <td>

  <code>Component</code>

  </td>

  </tr>
   <tr>

  <td>

  A template string

  模板字符串

  </td>

  <td>

  <code>`pie is ${multiplier} times better than cake`</code>

  </td>

   <tr>

  <td>

  Literal string

  字符串字面量

  </td>

  <td>

  <code>pi</code>

  </td>

  </tr>
   <tr>

  <td>

  Literal number

  数字字面量

  </td>

  <td>

  <code>3.14153265</code>

  </td>

  </tr>
   <tr>

  <td>

  Literal boolean

  逻辑字面量

  </td>

  <td>

  <code>true</code>

  </td>

  </tr>
   <tr>

  <td>

  Literal null

  null 字面量

  </td>

  <td>

  <code>null</code>

  </td>

  </tr>
   <tr>

  <td>

  Supported prefix operator 

  受支持的前缀运算符

  </td>

  <td>

  <code>!cake</code>

  </td>

  </tr>
   <tr>

  <td>

  Supported binary operator 

  受支持的二元运算符

  </td>

  <td>

  <code>a+b</code>

  </td>

  </tr>
   <tr>

  <td>

  Conditional operator

  条件运算符

  </td>

  <td>

  <code>a ? b : c</code>

  </td>

  </tr>
   <tr>

  <td>

  Parentheses

  括号

  </td>

  <td>

  <code>(a+b)</code>

  </td>

  </tr>
</table>

If an expression uses unsupported syntax, the collector writes an error node to the `.metadata.json` file.
The compiler later reports the error if it needs that piece of metadata to generate the application code.

如果表达式使用了不支持的语法，收集器就会往 `.metadata.json` 文件中写入一个错误节点。稍后，如果编译器用到元数据中的这部分内容来生成应用代码，它就会报告这个错误。

<div class="alert is-helpful">

 If you want `ngc` to report syntax errors immediately rather than produce a `.metadata.json` file with errors, set the `strictMetadataEmit` option in the TypeScript configuration file, `tsconfig.json`.

 如果你希望 `ngc` 立即汇报这些语法错误，而不要生成带有错误信息的 `.metadata.json` 文件，可以到 TypeScript 的配置文件 `tsconfig.json` 中设置 `strictMetadataEmit` 选项。

```

  "angularCompilerOptions": {
   ...
   "strictMetadataEmit" : true
 }

 ```

Angular libraries have this option to ensure that all Angular `.metadata.json` files are clean and it is a best practice to do the same when building your own libraries.

Angular 库通过这个选项来确保所有的 Angular `.metadata.json` 文件都是干净的。当你要构建自己的代码库时，这也同样是一项最佳实践。

</div>

{@a function-expression}

{@a arrow-functions}

### No arrow functions

### 不要有箭头函数

The AOT compiler does not support [function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
and [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), also called _lambda_ functions.

AOT 编译器不支持 [函数表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
和 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)（也叫 *Lambda* 函数）。

Consider the following component decorator:

考虑如下组件装饰器：

```typescript

@Component({
  ...
  providers: [{provide: server, useFactory: () => new Server()}]
})

```

The AOT collector does not support the arrow function, `() => new Server()`, in a metadata expression.
It generates an error node in place of the function.
When the compiler later interprets this node, it reports an error that invites you to turn the arrow function into an _exported function_.

AOT 的收集器不支持在元数据表达式中出现箭头函数 `() => new Server()`。
它会在该函数中就地生成一个错误节点。
稍后，当编译器解释该节点时，它就会报告一个错误，让你把这个箭头函数转换成一个*导出的函数*。

You can fix the error by converting to this:

你可以把它改写成这样来修复这个错误：

```typescript

export function serverFactory() {
  return new Server();
}

@Component({
  ...
  providers: [{provide: server, useFactory: serverFactory}]
})

```

In version 5 and later, the compiler automatically performs this rewriting while emitting the `.js` file.

在版本 5 和更高版本中，编译器会在发出 `.js` 文件时自动执行此重写。

{@a exported-symbols}

{@a code-folding}

### Code folding

### 代码折叠

The compiler can only resolve references to **_exported_** symbols.
The collector, however, can evaluate an expression during collection and record the result in the `.metadata.json`, rather than the original expression.
This allows you to make limited use of non-exported symbols within expressions.

编译器只会解析到**_ 已导出 _**符号的引用。
收集器可以在收集期间执行表达式，并用其结果记录到 `.metadata.json` 中（而不是原始表达式中）。
这样可以让你把非导出符号的使用限制在表达式中。

For example, the collector can evaluate the expression `1 + 2 + 3 + 4` and replace it with the result, `10`.

比如，收集器可以执行表达式 `1 + 2 + 3 + 4`，并使用它的结果 `10` 替换它。

This process is called _folding_. An expression that can be reduced in this manner is _foldable_.

这个过程被称为*折叠*。能用这种方式进行简化的表达式就是*可折叠的*。

{@a var-declaration}

The collector can evaluate references to module-local `const` declarations and initialized `var` and `let` declarations, effectively removing them from the `.metadata.json` file.

收集器可以计算对模块局部变量的 `const` 声明和初始化过的 `var` 和 `let` 声明，并从 `.metadata.json` 文件中移除它们。

Consider the following component definition:

考虑下列组件定义：

```typescript

const template = '<div>{{hero.name}}</div>';

@Component({
  selector: 'app-hero',
  template: template
})
export class HeroComponent {
  @Input() hero: Hero;
}

```

The compiler could not refer to the `template` constant because it isn't exported.
The collector, however, can fold the `template` constant into the metadata definition by in-lining its contents.
The effect is the same as if you had written:

编译器不能引用 `template` 常量，因为它是未导出的。
但是收集器可以通过内联 `template` 常量的方式把它*折叠*进元数据定义中。
最终的结果和你以前的写法是一样的：

```typescript

@Component({
  selector: 'app-hero',
  template: '<div>{{hero.name}}</div>'
})
export class HeroComponent {
  @Input() hero: Hero;
}

```

There is no longer a reference to `template` and, therefore, nothing to trouble the compiler when it later interprets the _collector's_ output in `.metadata.json`.

这里没有对 `template` 的引用，因此，当编译器稍后对位于 `.metadata.json` 中的收集器输出进行解释时，不会再出问题。

You can take this example a step further by including the `template` constant in another expression:

你还可以通过把 `template` 常量包含在其它表达式中来让这个例子深入一点：

```typescript

const template = '<div>{{hero.name}}</div>';

@Component({
  selector: 'app-hero',
  template: template + '<div>{{hero.title}}</div>'
})
export class HeroComponent {
  @Input() hero: Hero;
}

```

The collector reduces this expression to its equivalent _folded_ string:

收集器把该表达式缩减成其等价的*已折叠*字符串：

```

'<div>{{hero.name}}</div><div>{{hero.title}}</div>'

```

#### Foldable syntax

#### 可折叠的语法

The following table describes which expressions the collector can and cannot fold:

下表中描述了收集器可以折叠以及不能折叠哪些表达式：

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>

  <th>

  Syntax

  语法

  </th>

  <th>

  Foldable

  可折叠？

  </th>

  </tr>
  <tr>

  <td>

  Literal object 

  对象字面量

  </td>

  <td>

  Yes

  是

  </td>

  </tr>
  <tr>

  <td>

  Literal array  

  数组字面量

  </td>

  <td>

  Yes

  是

  </td>

  </tr>
  <tr>

  <td>

  Spread in literal array

  展开数组字面量

  </td>

  <td>

  no

  否

  </td>

  </tr>
   <tr>

  <td>

  Calls

  函数调用

  </td>

  <td>

  no

  否

  </td>

  </tr>
   <tr>

  <td>

  New

  新建对象

  </td>

  <td>

  no

  否

  </td>

  </tr>
   <tr>

  <td>

  Property access

  属性访问

  </td>

  <td>

  yes, if target is foldable

  如果目标对象也是可折叠的，则是

  </td>

  </tr>
   <tr>

  <td>

  Array index

  数组索引访问

  </td>

  <td>

   yes, if target and index are foldable

   如果目标数组和索引都是可折叠的，则是

  </td>

  </tr>
   <tr>

  <td>

  Identity reference

  引用标识符

  </td>

  <td>

  yes, if it is a reference to a local

  如果引用的是局部标识符，则是

  </td>

  </tr>
   <tr>

  <td>

  A template with no substitutions

  没有替换表达式的模板字符串

  </td>

  <td>

  yes

  是

  </td>

  </tr>
   <tr>

  <td>

  A template with substitutions

  有替换表达式的模板字符串

  </td>

  <td>

  yes, if the substitutions are foldable

  如果替换表达式是可折叠的，则是

  </td>

  </tr>
   <tr>

  <td>

  Literal string

  字符串字面量

  </td>

  <td>

  yes

  是

  </td>

  </tr>
   <tr>

  <td>

  Literal number

  数字字面量

  </td>

  <td>

  yes

  是

  </td>

  </tr>
   <tr>

  <td>

  Literal boolean

  逻辑字面量

  </td>

  <td>

  yes

  是

  </td>

  </tr>
   <tr>

  <td>

  Literal null

  null 字面量

  </td>

  <td>

  yes

  是

  </td>

  </tr>
   <tr>

  <td>

  Supported prefix operator 

  受支持的前缀运算符

  </td>

  <td>

  yes, if operand is foldable

  如果操作数是可折叠的，则是

  </td>

  </tr>
   <tr>

  <td>

  Supported binary operator 

  受支持的二元运算符

  </td>

  <td>

  yes, if both left and right are foldable

  如果左操作数和右操作数都是可折叠的，则是

  </td>

  </tr>
   <tr>

  <td>

  Conditional operator

  条件运算符

  </td>

  <td>

  yes, if condition is foldable 

  如果条件是可折叠的，则是

  </td>

  </tr>
   <tr>

  <td>

  Parentheses

  括号

  </td>

  <td>

  yes, if the expression is foldable

  如果表达式是可折叠的，则是

  </td>

  </tr>
</table>

If an expression is not foldable, the collector writes it to `.metadata.json` as an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) for the compiler to resolve.

如果表达式是不可折叠的，那么收集器就会把它作为一个 [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)（抽象语法树） 写入 `.metadata.json` 中，留给编译器去解析。

## Phase 2: code generation

## 阶段 2：代码生成

The collector makes no attempt to understand the metadata that it collects and outputs to `.metadata.json`. It represents the metadata as best it can and records errors when it detects a metadata syntax violation.

收集器不会试图理解它收集并输出到 `.metadata.json` 中的元数据，它所能做的只是尽可能准确的表述这些元数据，并在检测到元数据中的语法违规时记录这些错误。

It's the compiler's job to interpret the `.metadata.json` in the code generation phase.

解释这些 `.metadata.json` 是编译器在代码生成阶段要承担的工作。

The compiler understands all syntax forms that the collector supports, but it may reject _syntactically_ correct metadata if the _semantics_ violate compiler rules.

编译器理解收集器支持的所有语法形式，但是它也可能拒绝那些虽然*语法正确*但*语义*违反了编译器规则的元数据。

### Public symbols

### 公共符号

The compiler can only reference _exported symbols_.

编译器只能引用*已导出的符号*。

* Decorated component class members must be public. You cannot make an `@Input()` property private or protected.

  带有装饰器的类成员必须是公开的。你不可能把一个私有或内部使用的属性做成 `@Input()`。

* Data bound properties must also be public.

  数据绑定的属性同样必须是公开的。

```typescript

// BAD CODE - title is private
@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>'
})
export class AppComponent {
  private title = 'My App'; // Bad
}

```

{@a supported-functions}

### Supported classes and functions

### 支持的类和函数

The collector can represent a function call or object creation with `new` as long as the syntax is valid.
The compiler, however, can later refuse to generate a call to a _particular_ function or creation of a _particular_ object.

只要语法有效，收集器就可以用 `new` 来表示函数调用或对象创建。但是，编译器在后面可以拒绝生成对*特定*函数的调用或对*特定*对象的创建。

The compiler can only create instances of certain classes, supports only core decorators, and only supports calls to macros (functions or static methods) that return expressions.

编译器只能创建某些类的实例，仅支持核心装饰器，并且仅支持对返回表达式的宏（函数或静态方法）的调用。

* New instances

  新建实例

  The compiler only allows metadata that create instances of the class `InjectionToken` from `@angular/core`.

  编译器只允许创建来自 `@angular/core` 的 `InjectionToken` 类创建实例。

* Supported decorators

  支持的装饰器

   The compiler only supports metadata for the [Angular decorators in the `@angular/core` module](api/core#decorators).

   编译器只支持来自 [`@angular/core` 模块](api/core#decorators)的 Angular 装饰器的元数据。

* Function calls

  函数调用

  Factory functions must be exported, named functions.
   The AOT compiler does not support lambda expressions ("arrow functions") for factory functions.

  工厂函数必须导出为命名函数。
  AOT 编译器不支持用 Lambda 表达式（箭头函数）充当工厂函数。

{@a function-calls}

### Functions and static method calls

### 函数和静态方法调用

The collector accepts any function or static method that contains a single `return` statement.
The compiler, however, only supports macros in the form of functions or static methods that return an *expression*.

收集器接受任何只包含一个 `return` 语句的函数或静态方法。
编译器也支持在返回表达式的函数或静态函数中使用*宏*。

For example, consider the following function:

考虑下面的函数：

```typescript

export function wrapInArray<T>(value: T): T[] {
  return [value];
}

```

You can call the `wrapInArray` in a metadata definition because it returns the value of an expression that conforms to the compiler's restrictive JavaScript subset.

你可以在元数据定义中调用 `wrapInArray`，因为它所返回的表达式的值满足编译器支持的 JavaScript 受限子集。

You might use  `wrapInArray()` like this:

你还可以这样使用 `wrapInArray()`：

```typescript

@NgModule({
  declarations: wrapInArray(TypicalComponent)
})
export class TypicalModule {}

```

The compiler treats this usage as if you had written:

编译器会把这种用法处理成你以前的写法：

```typescript

@NgModule({
  declarations: [TypicalComponent]
})
export class TypicalModule {}

```

The Angular [`RouterModule`](api/router/RouterModule) exports two macro static methods, `forRoot` and `forChild`, to help declare root and child routes.
Review the [source code](https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L139 "RouterModule.forRoot source code")
for these methods to see how macros can simplify configuration of complex [NgModules](guide/ngmodules).

Angular 的 [`RouterModule`](api/router/RouterModule) 导出了两个静态宏函数 `forRoot` 和 `forChild`，以帮助声明根路由和子路由。
查看这些方法的[源码](https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L139 "RouterModule.forRoot source code")，以了解宏函数是如何简化复杂的 [NgModule](guide/ngmodules) 配置的。

{@a metadata-rewriting}

### Metadata rewriting

### 元数据重写

The compiler treats object literals containing the fields `useClass`, `useValue`, `useFactory`, and `data` specially, converting the expression initializing one of these fields into an exported variable that replaces the expression.
This process of rewriting these expressions removes all the restrictions on what can be in them because
the compiler doesn't need to know the expression's value&mdash;it just needs to be able to generate a reference to the value.

编译器会对含有 `useClass`、`useValue`、`useFactory` 和 `data` 的对象字面量进行特殊处理，把用这些字段之一初始化的表达式转换成一个导出的变量，并用它替换该表达式。
这个重写表达式的过程，会消除它们受到的所有限制，因为编译器并不需要知道该表达式的值，它只要能生成对该值的引用就行了。

You might write something like:

你可以这样写：

```typescript

class TypicalServer {

}

@NgModule({
  providers: [{provide: SERVER, useFactory: () => TypicalServer}]
})
export class TypicalModule {}

```

Without rewriting, this would be invalid because lambdas are not supported and `TypicalServer` is not exported.
To allow this, the compiler automatically rewrites this to something like:

如果不重写，这就是无效的，因为这里不支持 Lambda 表达式，而且 `TypicalServer` 也没有被导出。
为了支持这种写法，编译器自动把它重写成了这样：

```typescript

class TypicalServer {

}

export const ɵ0 = () => new TypicalServer();

@NgModule({
  providers: [{provide: SERVER, useFactory: ɵ0}]
})
export class TypicalModule {}

```

This allows the compiler to generate a reference to `ɵ0` in the factory without having to know what the value of `ɵ0` contains.

这就让编译器能在工厂中生成一个对 `ɵ0` 的引用，而不用知道 `ɵ0` 中包含的值到底是什么。

The compiler does the rewriting during the emit of the `.js` file.
It does not, however, rewrite the `.d.ts` file, so TypeScript doesn't recognize it as being an export. and it does not interfere with the ES module's exported API.

编译器会在生成 `.js` 文件期间进行这种重写。它不会重写 `.d.ts` 文件，所以 TypeScript 也不会把这个变量当做一项导出，因此也就不会污染 ES 模块中导出的 API。

{@a binding-expression-validation}

## Phase 3: Template type checking

## 阶段 3：模板类型检查

One of the Angular compiler's most helpful features is the ability to type-check expressions within templates, and catch any errors before they cause crashes at runtime.
In the template type-checking phase, the Angular template compiler uses the TypeScript compiler to validate the binding expressions in templates.

Angular 编译器最有用的功能之一就是能够对模板中的表达式进行类型检查，在由于出错而导致运行时崩溃之前就捕获任何错误。在模板类型检查阶段，Angular 模板编译器会使用 TypeScript 编译器来验证模板中的绑定表达式。

Enable this phase explicitly by adding the compiler option `"fullTemplateTypeCheck"` in the `"angularCompilerOptions"` of the project's `tsconfig.json`
(see [Angular Compiler Options](guide/angular-compiler-options)).

通过在该项目的 `tsconfig.json` 的 `"angularCompilerOptions"` 中添加编译器选项 `"fullTemplateTypeCheck"`，可以显式启用本阶段（见[ Angular 编译器选项](guide/angular-compiler-options) ）。

<div class="alert is-helpful">

In [Angular Ivy](guide/ivy), the template type checker has been completely rewritten to be more capable as well as stricter, meaning it can catch a variety of new errors that the previous type checker would not detect.

在 [Angular Ivy 中](guide/ivy) 中，模板类型检查器已被完全重写，以使其功能更强大，更严格。这意味着它可以捕获以前的类型检查器无法检测到的各种新错误。

As a result, templates that previously compiled under View Engine can fail type checking under Ivy. This can happen because Ivy's stricter checking catches genuine errors, or because application code is not typed correctly, or because the application uses libraries in which typings are inaccurate or not specific enough.

这就导致了，以前在 View Engine 下能通过编译的模板可能无法在 Ivy 下通过类型检查。之所以会发生这种情况，是因为 Ivy 更严格的检查会捕获真正的错误：或者因为应用程序代码中的类型不正确，或者因为应用程序使用的库中的类型不正确或不够具体。

This stricter type checking is not enabled by default in version 9, but can be enabled by setting the `strictTemplates` configuration option.
We do expect to make strict type checking the default in the future.

在版本 9 中，默认未启用此更严格的类型检查，但可以通过设置 `strictTemplates` 配置选项来启用它。我们真的希望将来可以把严格类型检查作为默认值。

For more information about type-checking options, and about improvements to template type checking in version 9 and above, see [Template type checking](guide/template-typecheck).

关于这些类型检查选项的更多信息以及 Angular 9 及后续版本对模板类型检查做出的改进，请参见 [模板类型检查](guide/template-typecheck)。

</div>

Template validation produces error messages when a type error is detected in a template binding
expression, similar to how type errors are reported by the TypeScript compiler against code in a `.ts`
file.

当模板绑定表达式中检测到类型错误时，进行模板验证时就会生成错误。这和 TypeScript 编译器在处理 `.ts` 文件中的代码时报告错误很相似。

For example, consider the following component:

比如，考虑下列组件：

  ```typescript

  @Component({
    selector: 'my-component',
    template: '{{person.addresss.street}}'
  })
  class MyComponent {
    person?: Person;
  }

  ```

This produces the following error:

这会生成如下错误：

```

my.component.ts.MyComponent.html(1,1): : Property 'addresss' does not exist on type 'Person'. Did you mean 'address'?

```

The file name reported in the error message, `my.component.ts.MyComponent.html`, is a synthetic file
generated by the template compiler that holds contents of the `MyComponent` class template.
The compiler never writes this file to disk.
The line and column numbers are relative to the template string in the `@Component` annotation of the class, `MyComponent` in this case.
If a component uses `templateUrl` instead of `template`, the errors are reported in the HTML file referenced by the `templateUrl` instead of a synthetic file.

错误信息中汇报的文件名 `my.component.ts.MyComponent.html` 是一个由模板编译器生成出的合成文件，
  用于保存 `MyComponent` 类的模板内容。
  编译器永远不会把这个文件写入磁盘。这个例子中，这里的行号和列号都是相对于 `MyComponent` 的 `@Component` 注解中的模板字符串的。
  如果组件使用 `templateUrl` 来代替 `template`，这些错误就会在 `templateUrl` 引用的 HTML 文件中汇报，而不是这个合成文件中。

The error location is the beginning of the text node that contains the interpolation expression with
  the error. If the error is in an attribute binding such as `[value]="person.address.street"`, the error
  location is the location of the attribute that contains the error.

错误的位置是从包含出错的插值表达式的那个文本节点开始的。
  如果错误是一个属性绑定，比如 `[value]="person.address.street"`，错误的位置就是那个包含错误的属性的位置。

The validation uses the TypeScript type checker and the options supplied to the TypeScript compiler to control
  how detailed the type validation is. For example, if the `strictTypeChecks` is specified, the error  ```my.component.ts.MyComponent.html(1,1): : Object is possibly 'undefined'``` is reported as well as the above error message.

这个验证过程使用 TypeScript 的类型检查器，这些选项也会提供给 TypeScript 编译器以控制类型验证的详细程度。
  比如，如果指定了 `strictTypeChecks`，就会像上面的错误信息一样报告 ```my.component.ts.MyComponent.html(1,1): : Object is possibly 'undefined'``` 错误。

### Type narrowing

### 类型窄化

The expression used in an `ngIf` directive is used to narrow type unions in the Angular
template compiler, the same way the `if` expression does in TypeScript. For example, to avoid
`Object is possibly 'undefined'` error in the template above, modify it to only emit the
interpolation if the value of `person` is initialized as shown below:

在 `ngIf` 指令中使用的表达式用来在 Angular 模板编译器中窄化联合类型，就像 TypeScript 中的 `if` 表达式一样。
比如，要在上述模板中消除 `Object is possibly 'undefined'` 错误，可以把它改成只在 `person` 的值初始化过的时候才生成这个插值。

```typescript

@Component({
  selector: 'my-component',
  template: '<span *ngIf="person"> {{person.addresss.street}} </span>'
})
class MyComponent {
  person?: Person;
}

```

Using `*ngIf` allows the TypeScript compiler to infer that the `person` used in the binding expression will never be `undefined`.

使用 `*ngIf` 能让 TypeScript 编译器推断出这个绑定表达式中使用的 `person` 永远不会是 `undefined`。

For more information about input type narrowing, see [Input setter coercion](guide/template-typecheck#input-setter-coercion) and [Improving template type checking for custom directives](guide/structural-directives#directive-type-checks).

关于输入类型窄化的更多信息，请参见 [Input setter 的强制类型转换](guide/template-typecheck#input-setter-coercion)和[为自定义指令强化模板类型检查](guide/structural-directives#directive-type-checks)

### Non-null type assertion operator

### 非空类型断言操作符

Use the [non-null type assertion operator](guide/template-syntax#non-null-assertion-operator)
to suppress the `Object is possibly 'undefined'` error when it is inconvenient to use
`*ngIf` or when some constraint in the component ensures that the expression is always
non-null when the binding expression is interpolated.

使用 [非空类型断言操作符](guide/template-syntax#non-null-assertion-operator)可以在不方便使用 `*ngIf` 或
  当组件中的某些约束可以确保这个绑定表达式在求值时永远不会为空时，防止出现 `Object is possibly 'undefined'` 错误。

In the following example, the `person` and `address` properties are always set together,
implying that `address` is always non-null if `person` is non-null. There is no convenient
way to describe this constraint to TypeScript and the template compiler, but the error
is suppressed in the example by using `address!.street`.

在下列例子中，`person` 和 `address` 属性总是一起出现的，如果 `person` 非空，则 `address` 也一定非空。没有一种简便的写法可以向 TypeScript 和模板编译器描述这种约束。但是这个例子中使用 `address!.street` 避免了报错。

  ```typescript

  @Component({
    selector: 'my-component',
    template: '<span *ngIf="person"> {{person.name}} lives on {{address!.street}} </span>'
  })
  class MyComponent {
    person?: Person;
    address?: Address;

    setData(person: Person, address: Address) {
      this.person = person;
      this.address = address;
    }
  }

  ```

The non-null assertion operator should be used sparingly as refactoring of the component might break this constraint.

应该保守点使用非空断言操作符，因为将来对组件的重构可能会破坏这个约束。

In this example it is recommended to include the checking of `address`
in the `*ngIf`as shown below:

这个例子中，更建议在 `*ngIf` 中包含对 `address` 的检查，代码如下：

```typescript

@Component({
  selector: 'my-component',
  template: '<span *ngIf="person && address"> {{person.name}} lives on {{address.street}} </span>'
})
class MyComponent {
  person?: Person;
  address?: Address;

  setData(person: Person, address: Address) {
    this.person = person;
    this.address = address;
  }
}

```
