# The Ahead-of-Time (AOT) compiler

# 预先（AOT）编译器

An Angular application consists mainly of components and their HTML templates. Because the components and templates provided by Angular cannot be understood by the browser directly, Angular applications require a compilation process before they can run in a browser.

Angular 应用主要由组件及其 HTML 模板组成。由于浏览器无法直接理解 Angular 所提供的组件和模板，因此 Angular 应用程序需要先进行编译才能在浏览器中运行。

The Angular Ahead-of-Time (AOT) compiler converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase _before_ the browser downloads and runs that code. Compiling your application during the build process provides a faster rendering in the browser.

在浏览器下载和运行代码*之前*的编译阶段，Angular 预先（AOT）编译器会先把你的 Angular HTML 和 TypeScript 代码转换成高效的 JavaScript 代码。
在构建期间编译应用可以让浏览器中的渲染更快速。

This guide explains how to specify metadata and apply available compiler options to compile your applications efficiently using the AOT compiler.

本指南中解释了如何指定元数据，并通过一些编译器选项来借助 AOT 编译器来更有效的编译应用。

<div class="alert is-helpful">

  <a href="https://www.youtube.com/watch?v=kW9cJsvcsGo">Watch compiler author Tobias Bosch explain the Angular compiler</a> at AngularConnect 2016.

  观看编译器作者 Tobias Bosch 在 AngularConnect 2016 大会里，对<a href="http://v.youku.com/v_show/id_XMTc1NTE4NTkwOA==.html?from=y1.7-1.4" target="_blank">Angular 编译器</a>的演讲。

</div>

{@a overview}

## Angular compilation

## Angular 中的编译

Angular offers two ways to compile your application:

Angular 提供了两种方式来编译你的应用：

1. **_Just-in-Time_ (JIT)**, which compiles your app in the browser at runtime.

   ***即时编译* (JIT)**，它会在运行期间在浏览器中编译你的应用。

1. **_Ahead-of-Time_ (AOT)**, which compiles your app at build time.

   **预先（AOT）编译**，它会在构建时编译你的应用。

JIT compilation is the default when you run the [`ng build`](cli/build) (build only) or [`ng serve`](cli/serve)  (build and serve locally) CLI commands: 

当你运行 [`ng build`](cli/build)（仅编译）或 [`ng serve`](cli/serve)（编译并启动本地服务器） 这两个 CLI 命令时 JIT 编译是默认选项：

<code-example language="sh" class="code-shell">
  ng build
  ng serve
</code-example>

{@a compile}

For AOT compilation, include the `--aot` option with the `ng build` or `ng serve` command:

要进行 AOT 编译只要给 `ng build` 或 `ng serve` 命令添加 `--aot` 标志就行了：

<code-example language="sh" class="code-shell">
  ng build --aot
  ng serve --aot
</code-example>

<div class="alert is-helpful">

The `ng build` command with the `--prod` meta-flag (`ng build --prod`) compiles with AOT by default.

带有 `--prod` 标志的 `ng build` 命令 (`ng build --prod`) 会默认使用 AOT 编译。

See the [CLI command reference](cli) and [Building and serving Angular apps](guide/build) for more information.

要了解更多，请参见[CLI 文档](cli)，和 [构建与运行](guide/build)。

</div>

{@a why-aot}

## Why compile with AOT?

## 为什么需要 AOT 编译？

*Faster rendering*

**渲染得更快**

With AOT, the browser downloads a pre-compiled version of the application.
The browser loads executable code so it can render the application immediately, without waiting to compile the app first.

使用 AOT，浏览器下载预编译版本的应用程序。
浏览器直接加载运行代码，所以它可以立即渲染该应用，而不用等应用完成首次编译。

*Fewer asynchronous requests*

**需要的异步请求更少**

The compiler _inlines_ external HTML templates and CSS style sheets within the application JavaScript,
eliminating separate ajax requests for those source files.

编译器把外部 HTML 模板和 CSS 样式表*内联*到了该应用的 JavaScript 中。
消除了用来下载那些源文件的 Ajax 请求。

*Smaller Angular framework download size*

**需要下载的 Angular 框架体积更小**

There's no need to download the Angular compiler if the app is already compiled.
The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.

如果应用已经编译过了，自然不需要再下载 Angular 编译器了。
该编译器差不多占了 Angular 自身体积的一半儿，所以，省略它可以显著减小应用的体积。

*Detect template errors earlier*

**提早检测模板错误**

The AOT compiler detects and reports template binding errors during the build step
before users can see them.

AOT 编译器在构建过程中检测和报告模板绑定错误，避免用户遇到这些错误。

*Better security*

**更安全**

AOT compiles HTML templates and components into JavaScript files long before they are served to the client.
With no templates to read and no risky client-side HTML or JavaScript evaluation,
there are fewer opportunities for injection attacks.

AOT 方式会在发给客户端之前就把 HTML 模板和组件编译成 JavaScript 文件。
不需要读取模板，也没有客户端组装 HTML 或执行 JavaScript 的危险操作，受到注入类攻击的机会也比较少。

## Controlling app compilation

## 控制应用的编译方式

When you use the Angular AOT compiler, you can control your app compilation in two ways:

当使用 AOT 编译器时，你可以通过两种方式来控制应用的编译方式：

* By providing template compiler options in the `tsconfig.json` file.

  在 `tsconfig.json` 文件中提供模板编译选项。

  For more information, see [Angular template compiler options](#compiler-options).

  欲知详情，参见 [Angular 模板编译器选项](#compiler-options)。

* By [specifying Angular metadata](#metadata-aot).

  通过[指定 Angular 元数据](#metadata-aot)。


{@a metadata-aot}
## Specifying Angular metadata

## 指定 Angular 元数据

Angular metadata tells Angular how to construct instances of your application classes and interact with them at runtime.
The Angular **AOT compiler** extracts **metadata** to interpret the parts of the application that Angular is supposed to manage.

Angular 的元数据会告诉 Angular 如何创建应用中类的实例以及如何在运行期间与它们交互。
Angular 的 **AOT 编译器**会把**元数据**提取出来，以告诉 Angular 应该管理应用程序的哪些部分。

You can specify the metadata with **decorators** such as `@Component()` and `@Input()` or implicitly in the constructor declarations of these decorated classes.

你通过**装饰器**来指定元数据，比如 `@Component()` 和 `@Input()`。
你还可以在这些带装饰器的类的构造函数中隐式指定元数据。

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

## Metadata restrictions

## 元数据的限制

You write metadata in a _subset_ of TypeScript that must conform to the following general constraints:

你只能使用 TypeScript 的一个**子集**书写元数据，它必须满足下列限制：

1. Limit [expression syntax](#expression-syntax) to the supported subset of JavaScript.

   [表达式语法](#expression-syntax)只支持 JavaScript 的一个有限的子集。

2. Only reference exported symbols after [code folding](#folding).

   只能引用[代码收缩](#folding)后导出的符号。

3. Only call [functions supported](#supported-functions) by the compiler.

   只能调用编译器[支持的那些函数](#supported-functions)。

4. Decorated and data-bound class members must be public.

   被装饰和用于数据绑定的类成员必须是公共（public）的。

The next sections elaborate on these points.

下一节将会详细解释这些问题。

## How AOT works

## AOT 工作原理

It helps to think of the AOT compiler as having two phases: a code analysis phase in which it simply records a representation of the source; and a code generation phase in which the compiler's `StaticReflector` handles the interpretation as well as places restrictions on what it interprets.

可以把 AOT 编译器看做两个阶段：在代码分析阶段，它只记录源代码，而在代码生成阶段，编译器的 `StaticReflector` 会解释这些结果，并为这些结果加上限制。

## Phase 1: analysis

## 阶段 1：分析

The TypeScript compiler does some of the analytic work of the first phase. It emits the `.d.ts` _type definition files_ with type information that the AOT compiler needs to generate application code.

TypeScript 编译器会做一些初步的分析工作，它会生成**类型定义文件**`.d.ts`，其中带有类型信息，Angular 编译器需要借助它们来生成代码。

At the same time, the AOT **_collector_** analyzes the metadata recorded in the Angular decorators and outputs metadata information in **`.metadata.json`** files, one per `.d.ts` file.

同时，AOT **收集器（collector）** 会记录 Angular 装饰器中的元数据，并把它们输出到**`.metadata.json`**文件中，和每个 `.d.ts` 文件相对应。

You can think of `.metadata.json` as a diagram of the overall structure of a decorator's metadata, represented as an [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

你可以把 `.metadata.json` 文件看做一个包括全部装饰器的元数据的全景图，就像[抽象语法树 (AST) ](https://en.wikipedia.org/wiki/Abstract_syntax_tree)一样。

<div class="alert is-helpful">

Angular's [schema.ts](https://github.com/angular/angular/blob/master/packages/compiler-cli/src/metadata/schema.ts)
describes the JSON format as a collection of TypeScript interfaces.

Angular 的 [schema.ts](https://github.com/angular/angular/blob/master/packages/compiler-cli/src/metadata/schema.ts) 把这个 JSON 格式表示成了一组 TypeScript 接口。

</div>

{@a expression-syntax}

### Expression syntax

### 表达式语法

The _collector_ only understands a subset of JavaScript.
Define metadata objects with the following limited syntax:

*收集器*只能理解 JavaScript 的一个子集。
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


If an expression uses unsupported syntax, the _collector_ writes an error node to the `.metadata.json` file. The compiler later reports the error if it needs that
piece of metadata to generate the application code.

如果表达式使用了不支持的语法，**收集器**就会往 `.metadata.json` 文件中写入一个错误节点。稍后，如果编译器用到元数据中的这部分内容来生成应用代码，它就会报告这个错误。

<div class="alert is-helpful">

 If you want `ngc` to report syntax errors immediately rather than produce a `.metadata.json` file with errors, set the `strictMetadataEmit` option in `tsconfig`.

 如果你希望 `ngc` 立即汇报这些语法错误，而不要生成带有错误信息的 `.metadata.json` 文件，可以到 `tsconfig` 中设置 `strictMetadataEmit` 选项。

```

  "angularCompilerOptions": {
   ...
   "strictMetadataEmit" : true
 }

 ```

Angular libraries have this option to ensure that all Angular `.metadata.json` files are clean and it is a best practice to do the same when building your own libraries.

Angular 库通过这个选项来确保所有的 `.metadata.json` 文件都是干净的。当你要构建自己的代码库时，这也同样是一项最佳实践。

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

The AOT _collector_ does not support the arrow function, `() => new Server()`, in a metadata expression.
It generates an error node in place of the function.

AOT 的*收集器*不支持在元数据表达式中出现箭头函数 `() => new Server()`。
它会在该函数中就地生成一个错误节点。

When the compiler later interprets this node, it reports an error that invites you to turn the arrow function into an _exported function_.

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

Beginning in version 5, the compiler automatically performs this rewriting while emitting the `.js` file.

从 Angular v5 开始，编译器会在生成 `.js` 文件时自动执行这种改写。

{@a function-calls}

### Limited function calls

### 受限函数调用

The _collector_ can represent a function call or object creation with `new` as long as the syntax is valid. The _collector_ only cares about proper syntax.

只要语法有效，*收集器*就可以支持函数调用或使用 `new` 来创建对象。*收集器*只在乎语法是否正确。

But beware. The compiler may later refuse to generate a call to a _particular_ function or creation of a _particular_ object.
The compiler only supports calls to a small set of functions and will use `new` for only a few designated classes. These functions and classes are in a table of [below](#supported-functions).

但要注意。编译器稍后可能拒绝调用*特定的*函数或拒绝创建*特定的*对象。
编译器值仅支持调用一小部分函数，也只能 `new` 一小部分类。这些函数和类列在了[后面](#supported-functions)的表格中。

### Folding

### 折叠（fold）

{@a exported-symbols}

The compiler can only resolve references to **_exported_** symbols.
Fortunately, the _collector_ enables limited use of non-exported symbols through _folding_.

编译器只能解析对***导出***的符号的引用。
幸运的是，*收集器*支持通过*折叠*来有限的使用那些未导出的符号。

The _collector_ may be able to evaluate an expression during collection and record the result in the `.metadata.json` instead of the original expression.

*收集器*可以在收集期间执行表达式，并用其结果代替原始表达式，记录到 `.metadata.json` 中。

For example, the _collector_ can evaluate the expression `1 + 2 + 3 + 4` and replace it with the result, `10`.

比如，*收集器*可以执行表达式 `1 + 2 + 3 + 4`，并使用它的结果 `10` 替换它。

This process is called _folding_. An expression that can be reduced in this manner is _foldable_.

这个过程被称为*折叠*。能用这种方式进行简化的表达式就是*可折叠的*。

{@a var-declaration}

The collector can evaluate references to
module-local `const` declarations and initialized `var` and `let` declarations, effectively removing them from the `.metadata.json` file.

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

编译器不能引用 `template` 常量，因为它是未导出的。

But the _collector_ can _fold_ the `template` constant into the metadata definition by inlining its contents.
The effect is the same as if you had written:

但是*折叠器*可以通过内联 `template` 常量的方式把它*折叠*进元数据定义中。
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

这里没有对 `template` 的引用，因此，当编译器稍后对位于 `.metadata.json` 中的*收集器*输出进行解释时，不会再出问题。

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

The _collector_ reduces this expression to its equivalent _folded_ string:

*收集器*把该表达式缩减成其等价的*已折叠*字符串：

`'<div>{{hero.name}}</div><div>{{hero.title}}</div>'`.

#### Foldable syntax

#### 可折叠的语法

The following table describes which expressions the _collector_ can and cannot fold:

下表中描述了*收集器*可以折叠以及不能折叠哪些表达式：

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

The _collector_ makes no attempt to understand the metadata that it collects and outputs to `.metadata.json`. It represents the metadata as best it can and records errors when it detects a metadata syntax violation.

*收集器*不会试图理解它收集并输出到 `.metadata.json` 中的元数据，它所能做的只是尽可能准确的表述这些元数据，并在检测到元数据中的语法违规时记录这些错误。

It's the compiler's job to interpret the `.metadata.json` in the code generation phase.

解释这些 `.metadata.json` 是编译器在代码生成阶段要承担的工作。

The compiler understands all syntax forms that the _collector_ supports, but it may reject _syntactically_ correct metadata if the _semantics_ violate compiler rules.

编译器理解*收集器*支持的所有语法形式，但是它也可能拒绝那些虽然*语法正确*但*语义*违反了编译器规则的元数据。

The compiler can only reference _exported symbols_.

编译器只能引用*已导出的符号*。

Decorated component class members must be public. You cannot make an `@Input()` property private or internal.

带有装饰器的类成员必须是公开的。你不可能制作一个私有或内部使用的 `@Input()` 属性。

Data bound properties must also be public.

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

Most importantly, the compiler only generates code to create instances of certain classes, support certain decorators, and call certain functions from the following lists.

最重要的是，编译器生成代码时，只支持为下面列出的某些类创建实例、只支持某些装饰器、只会调用某些函数。

### New instances

### 新建实例

The compiler only allows metadata that create instances of the class `InjectionToken` from `@angular/core`.

编译器只允许创建来自 `@angular/core` 的 `InjectionToken` 类创建实例。

### Annotations/Decorators

### 注解 / 装饰器

The compiler only supports metadata for these Angular decorators.

编译器只支持下列 Angular 装饰器中的元数据。

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
  <th>

  Decorator

  装饰器

  </th>
  <th>

  Module

  模块

  </th>
  </tr>
    <tr>
    <td><code>Attribute</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Component</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>ContentChild</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>ContentChildren</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Directive</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Host</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>HostBinding</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>HostListner</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Inject</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Injectable</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Input</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>NgModule</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Optional</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Output</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Pipe</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Self</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>SkipSelf</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>ViewChild</code></td>
    <td><code>@angular/core</code></td>
  </tr>

</table>


### Macro-functions and macro-static methods

### 宏函数或静态宏函数

The compiler also supports _macros_ in the form of functions or static
methods that return an expression.

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

The collector is simplistic in its determination of what qualifies as a macro
function; it can only contain a single `return` statement.

收集器决定哪些函数是宏函数是很简单的 —— 它只能包含一个 `return` 语句。

The Angular [`RouterModule`](api/router/RouterModule) exports two macro static methods, `forRoot` and `forChild`, to help declare root and child routes.
Review the [source code](https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L139 "RouterModule.forRoot source code")
for these methods to see how macros can simplify configuration of complex [NgModules](guide/ngmodules).

Angular 的 [`RouterModule`](api/router/RouterModule) 导出了两个静态宏函数 `forRoot` 和 `forChild`，以帮助声明根路由和子路由。
查看这些方法的[源码](https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L139 "RouterModule.forRoot source code")，以了解宏函数是如何简化复杂的 [NgModule](guide/ngmodules) 配置的。

{@a metadata-rewriting}

### Metadata rewriting

### 元数据重写

The compiler treats object literals containing the fields `useClass`, `useValue`, `useFactory`, and `data` specially. The compiler converts the expression initializing one of these fields into an exported variable, which replaces the expression. This process of rewriting these expressions removes all the restrictions on what can be in them because
the compiler doesn't need to know the expression's value&mdash;it just needs to be able to generate a reference to the value.

编译器会对含有 `useClass`、`useValue`、`useFactory` 和 `data` 的对象字面量进行特殊处理。
编译器会把用这些字段之一初始化的表达式转换成一个导出的变量，并用它替换该表达式。
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

如果不重写，这就是无效的，因为这里不支持 Lambda 表达式，而且 `TypicalServer` 也没有被导出。

To allow this, the compiler automatically rewrites this to something like:

为了允许这种写法，编译器自动把它重写成了这样：

```typescript

class TypicalServer {

}

export const ɵ0 = () => new TypicalServer();

@NgModule({
  providers: [{provide: SERVER, useFactory: ɵ0}]
})
export class TypicalModule {}

```

This allows the compiler to generate a reference to `ɵ0` in the
factory without having to know what the value of `ɵ0` contains.

这就让编译器能在工厂中生成一个对 `ɵ0` 的引用，而不用知道 `ɵ0` 中包含的值到底是什么。

The compiler does the rewriting during the emit of the `.js` file. This doesn't rewrite the `.d.ts` file, however, so TypeScript doesn't recognize it as being an export. Thus, it does not pollute the ES module's exported API.

编译器会在生成 `.js` 文件期间进行这种重写。它不会重写 `.d.ts` 文件，所以 TypeScript 也不会把这个变量当做一项导出，因此也就不会污染 ES 模块中导出的 API。

## Metadata errors

## 元数据错误

The following are metadata errors you may encounter, with explanations and suggested corrections.

你可能遇到一些元数据错误，下面是对它们的解释和纠正建议。

[<t>Expression form not supported</t><t>不支持此表达式格式</t>](#expression-form-not-supported)<br>
[<t>Reference to a local (non-exported) symbol</t><t>引用了局部（未导出的）符号</t>](#reference-to-a-local-symbol)<br>
[<t>Only initialized variables and constants</t><t>只允许初始化过的变量和常量</t>](#only-initialized-variables)<br>
[<t>Reference to a non-exported class</t><t>引用了未导出的类</t>](#reference-to-a-non-exported-class)<br>
[<t>Reference to a non-exported function</t><t>引用了未导出的函数</t>](#reference-to-a-non-exported-function)<br>
[<t>Function calls are not supported</t><t>不支持函数调用</t>](#function-calls-not-supported)<br>
[<t>Destructured variable or constant not supported</t><t>不支持解构变量或常量</t>](#destructured-variable-not-supported)<br>
[<t>Could not resolve type</t><t>不能解析此类型</t>](#could-not-resolve-type)<br>
[<t>Name expected</t><t>期待是名字</t>](#name-expected)<br>
[<t>Unsupported enum member name</t><t>不支持的枚举成员名</t>](#unsupported-enum-member-name)<br>
[<t>Tagged template expressions are not supported</t><t>不支持带标签函数的模板表达式</t>](#tagged-template-expressions-not-supported)<br>
[<t>Symbol reference expected</t><t>期待是符号引用</t>](#symbol-reference-expected)<br>

<hr>

<h3 class="no-toc">Expression form not supported</h3>

<h3 class="no-toc">不支持这种表达式格式</h3>

The compiler encountered an expression it didn't understand while evaluating Angular metadata.

编译器在对 Angular 元数据求值时遇到了一个它不能理解的表达式。

Language features outside of the compiler's [restricted expression syntax](#expression-syntax)
can produce this error, as seen in the following example:

除编译器[允许的表达式语法](#expression-syntax)之外的语言特性可能导致这个错误，比如下面的例子：

```

// ERROR
export class Fooish { ... }
...
const prop = typeof Fooish; // typeof is not valid in metadata
  ...
  // bracket notation is not valid in metadata
  { provide: 'token', useValue: { [prop]: 'value' } };
  ...

```

You can use `typeof` and bracket notation in normal application code.
You just can't use those features within expressions that define Angular metadata.

你可以在普通的应用代码中使用 `typeof` 和方括号标记法来指定属性名，但是这些特性不能在定义 Angular 元数据的表达式中使用。

Avoid this error by sticking to the compiler's [restricted expression syntax](#expression-syntax)
when writing Angular metadata
and be wary of new or unusual TypeScript features.

在写 Angular 的元数据时，严格遵循编译器的[受限表达式语法](#expression-syntax)可以避免这个错误，此外还要小心那些新的或罕见的 TypeScript 特性。

<hr>

{@a reference-to-a-local-symbol}

<h3 class="no-toc">Reference to a local (non-exported) symbol</h3>

<h3 class="no-toc">引用了局部（未导出的）符号</h3>

<div class="alert is-helpful">

_Reference to a local (non-exported) symbol 'symbol name'. Consider exporting the symbol._

*如果要引用局部（未导出的）符号 'symbol name'，请考虑导出它。*

</div>

The compiler encountered a referenced to a locally defined symbol that either wasn't exported or wasn't initialized.

编译器遇到了局部定义的未导出或未初始化的符号。

Here's a `provider` example of the problem.

下面就是存在该问题的 `provider` 范例。

```

// ERROR
let foo: number; // neither exported nor initialized

@Component({
  selector: 'my-component',
  template: ... ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

```

The compiler generates the component factory, which includes the `useValue` provider code, in a separate module. _That_ factory module can't reach back to _this_ source module to access the local (non-exported) `foo` variable.

编译器会在单独的模块中生成这个 `userValue` 提供商的代码。*那个*工厂模块不能访问*这个*源码模块，无法访问这个（未导出的）`foo` 变量。

You could fix the problem by initializing `foo`.

你可以通过初始化 `foo` 来修正这个错误。

```

let foo = 42; // initialized

```

The compiler will [fold](#folding) the expression into the provider as if you had written this.

编译器将会把这个表达式[折叠](#folding)进 `providers` 中，就像你以前的写法一样。

```

  providers: [
    { provide: Foo, useValue: 42 }
  ]

```

Alternatively, you can fix it by exporting `foo` with the expectation that `foo` will be assigned at runtime when you actually know its value.

另外，你也可以通过导出 `foo` 来解决它，这样 `foo` 将会在运行期间你真正知道它的值的时候被赋值。

```

// CORRECTED
export let foo: number; // exported

@Component({
  selector: 'my-component',
  template: ... ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}

```

Adding `export` often works for variables referenced in metadata such as `providers` and `animations` because the compiler can generate _references_ to the exported variables in these expressions. It doesn't need the _values_ of those variables.

添加 `export` 的方式通常用于需要在元数据中引用变量时，如 `providers` 和 `animations`，这样编译器就可以在这些表达式中生成对已导出变量的引用了。它不需要知道这些变量的*值*。

Adding `export` doesn't work when the compiler needs the _actual value_
in order to generate code.
For example, it doesn't work for the `template` property.

当编译器需要知道*真正的值*以生成代码时，添加 `export` 的方式就是无效的。比如这里的 `template` 属性。

```

// ERROR
export let someTemplate: string; // exported but not initialized

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

```

The compiler needs the value of the `template` property _right now_ to generate the component factory.
The variable reference alone is insufficient.
Prefixing the declaration with `export` merely produces a new error, "[`Only initialized variables and constants can be referenced`](#only-initialized-variables)".

编译器*现在就*需要 `template` 属性的值来生成组件工厂。
仅仅有对该变量的引用是不够的。
给这个声明加上 `export` 前缀只会生成一个新的错误 "[`Only initialized variables and constants can be referenced`【只能引用初始化过的变量和常量】](#only-initialized-variables)"。

<hr>

{@a only-initialized-variables}

<h3 class="no-toc">Only initialized variables and constants</h3>

<h3 class="no-toc">只允许使用初始化过的变量和常量</h3>

<div class="alert is-helpful">

_Only initialized variables and constants can be referenced because the value of this variable is needed by the template compiler._

*只能引用已初始化过的变量和常量，因为模板编译器需要该变量的值。*

</div>

The compiler found a reference to an exported variable or static field that wasn't initialized.
It needs the value of that variable to generate code.

编译器发现某个到已导出的变量或静态字段的引用是没有初始化过的。而它需要根据那个变量的值来生成代码。

The following example tries to set the component's `template` property to the value of
the exported `someTemplate` variable which is declared but _unassigned_.

下面的例子试图把组件的 ` template` 属性设置为已导出的 `someTemplate` 变量的值，而这个值虽然声明过，却没有初始化过。

```

// ERROR
export let someTemplate: string;

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

```

You'd also get this error if you imported `someTemplate` from some other module and neglected to initialize it there.

如果你从其它模块中导入了 `someTemplate`，但那个模块中忘了初始化它，就会看到这个错误。

```

// ERROR - not initialized there either
import { someTemplate } from './config';

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

```

The compiler cannot wait until runtime to get the template information.
It must statically derive the value of the `someTemplate` variable from the source code
so that it can generate the component factory, which includes
instructions for building the element based on the template.

编译器不能等到运行时才得到该模板的信息。
它必须从源码中静态获得这个 `someTemplate` 变量的值，以便生成组件工厂，组件工厂中需要包含根据这个模板来生成元素的代码。

To correct this error, provide the initial value of the variable in an initializer clause _on the same line_.

要纠正这个错误，请在*同一行*的初始化子句中初始化这个变量的值。

```

// CORRECTED
export let someTemplate = '<h1>Greetings from Angular</h1>';

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

```

<hr>

<h3 class="no-toc">Reference to a non-exported class</h3>

<h3 class="no-toc">引用了未导出的类</h3>

<div class="alert is-helpful">

_Reference to a non-exported class <class name>. Consider exporting the class._

*如果要引用未导出的类 <class name>，请考虑导出它。*

</div>

Metadata referenced a class that wasn't exported.

元数据引用了一个未导出的类。

For example, you may have defined a class and used it as an injection token in a providers array
but neglected to export that class.

比如，你可能定义了一个类并在某个 `providers` 数组中把它用作了依赖注入令牌，但是忘了导出这个类。

```

// ERROR
abstract class MyStrategy { }

  ...
  providers: [
    { provide: MyStrategy, useValue: ... }
  ]
  ...

```

Angular generates a class factory in a separate module and that
factory [can only access exported classes](#exported-symbols).
To correct this error, export the referenced class.

Angular 会在一个单独的模块中生成类工厂，而那个工厂[只能访问已导出的类](#exported-symbols)。
要纠正这个问题，就要导出所引用的类。

```

// CORRECTED
export abstract class MyStrategy { }

  ...
  providers: [
    { provide: MyStrategy, useValue: ... }
  ]
  ...

```

<hr>

<h3 class="no-toc">Reference to a non-exported function</h3>

<h3 class="no-toc">引用了未导出的函数</h3>

Metadata referenced a function that wasn't exported.

元数据中引用了未导出的函数。

For example, you may have set a providers `useFactory` property to a locally defined function that you neglected to export.

比如，你可能已经把某个服务提供商的 `useFactory` 属性设置成了一个局部定义但忘了导出的函数。

```

// ERROR
function myStrategy() { ... }

  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  ...

```

Angular generates a class factory in a separate module and that
factory [can only access exported functions](#exported-symbols).
To correct this error, export the function.

Angular 会在一个单独的模块中生成类工厂，那个工厂[只能访问已导出的函数](#exported-symbols)。
要纠正这个错误，请导出该函数。

```

// CORRECTED
export function myStrategy() { ... }

  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  ...

```

<hr>

{@a function-calls-not-supported}

<h3 class="no-toc">Function calls are not supported</h3>

<h3 class="no-toc">不支持函数调用</h3>

<div class="alert is-helpful">

_Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function._

*不支持函数调用。考虑把这个函数或 lambda 表达式替换成一个对已导出函数的引用。*

</div>

The compiler does not currently support [function expressions or lambda functions](#function-expression).
For example, you cannot set a provider's `useFactory` to an anonymous function or arrow function like this.

编译器目前不支持[函数表达式或 Lambda 表达式](#function-expression)。
比如，你不能把某个服务提供商的 `useFactory` 设置成如下匿名函数或函数表达式。

```

// ERROR
  ...
  providers: [
    { provide: MyStrategy, useFactory: function() { ... } },
    { provide: OtherStrategy, useFactory: () => { ... } }
  ]
  ...

```

You also get this error if you call a function or method in a provider's `useValue`.

如果你在某个提供商的 `useValue` 中调用函数或方法，也会导致这个错误。

```

// ERROR
import { calculateValue } from './utilities';

  ...
  providers: [
    { provide: SomeValue, useValue: calculateValue() }
  ]
  ...

```

To correct this error, export a function from the module and refer to the function in a `useFactory` provider instead.

要改正这个问题，就要从模块中导出这个函数，并改成在服务提供商的 `useFactory` 中引用该函数。

<code-example linenums="false">
// CORRECTED
import { calculateValue } from './utilities';

export function myStrategy() { ... }
export function otherStrategy() { ... }
export function someValueFactory() {
  return calculateValue();
}
  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy },
    { provide: OtherStrategy, useFactory: otherStrategy },
    { provide: SomeValue, useFactory: someValueFactory }
  ]
  ...
</code-example>

<hr>

{@a destructured-variable-not-supported}

<h3 class="no-toc">Destructured variable or constant not supported</h3>

<h3 class="no-toc">不支持解构变量或常量</h3>

<div class="alert is-helpful">

_Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring._

*模板编译器不支持引用导出的解构语法的变量或常量。考虑简化这一点，以避免解构语法。*

</div>

The compiler does not support references to variables assigned by [destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring).

编译器不支持引用通过[解构](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring)赋值的方式得到的变量。

For example, you cannot write something like this:

比如，你不能这么写：

<code-example linenums="false">
// ERROR
import { configuration } from './configuration';

// destructured assignment to foo and bar
const {foo, bar} = configuration;
  ...
  providers: [
    {provide: Foo, useValue: foo},
    {provide: Bar, useValue: bar},
  ]
  ...
</code-example>

To correct this error, refer to non-destructured values.

要纠正这个错误，就要引用非解构方式的变量。

<code-example linenums="false">
// CORRECTED
import { configuration } from './configuration';
  ...
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  ...
</code-example>

<hr>

<h3 class="no-toc">Could not resolve type</h3>

<h3 class="no-toc">不能解析类型</h3>

The compiler encountered a type and can't determine which module exports that type.

编译器遇到了某个类型，但是不知道它是由哪个模块导出的。

This can happen if you refer to an ambient type.
For example, the `Window` type is an ambient type declared in the global `.d.ts` file.

这通常会发生在你引用环境类型时。
比如，`Window` 类型就是在全局 `.d.ts` 文件中声明的环境类型。

You'll get an error if you reference it in the component constructor,
which the compiler must statically analyze.

如果你在组件的构造函数中引用它就会导致一个错误，因为编译器必须对构造函数进行静态分析。

```

// ERROR
@Component({ })
export class MyComponent {
  constructor (private win: Window) { ... }
}

```

TypeScript understands ambient types so you don't import them.
The Angular compiler does not understand a type that you neglect to export or import.

TypeScript 能理解这些环境类型，所以你不用导入它们。
但 Angular 编译器不理解你没有导入或导出过的类型。

In this case, the compiler doesn't understand how to inject something with the `Window` token.

这种情况下，编译器就无法理解如何使用这个 `Window` 令牌来进行注入。

Do not refer to ambient types in metadata expressions.

不要在元数据表达式中引用环境类型。

If you must inject an instance of an ambient type,
you can finesse the problem in four steps:

如果你必须注入某个环境类型的实例，可以用以下四步来巧妙解决这个问题：

1. Create an injection token for an instance of the ambient type.

   为环境类型的实例创建一个注入令牌。

1. Create a factory function that returns that instance.

   创建一个返回该实例的工厂函数。

1. Add a `useFactory` provider with that factory function.

   使用该工厂函数添加一个 `useFactory` 提供商。

1. Use `@Inject` to inject the instance.

   使用 `@Inject` 来注入这个实例。

Here's an illustrative example.

下面的例子说明了这一点。

<code-example linenums="false">
// CORRECTED
import { Inject } from '@angular/core';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

@Component({
  ...
  providers: [
    { provide: WINDOW, useFactory: _window }
  ]
})
export class MyComponent {
  constructor (@Inject(WINDOW) private win: Window) { ... }
}
</code-example>

The `Window` type in the constructor is no longer a problem for the compiler because it
uses the `@Inject(WINDOW)` to generate the injection code.

对于编译器来说，构造函数中出现 `Window` 类型已不再是个问题，因为它现在使用 `@Inject(WINDOW)` 来生成注入代码。

Angular does something similar with the `DOCUMENT` token so you can inject the browser's `document` object (or an abstraction of it, depending upon the platform in which the application runs).

Angular 也用 `DOCUMENT` 令牌做了类似的事情，所以你也可以注入浏览器的 `document` 对象（或它的一个抽象层，取决于该应用运行在哪个平台）。

<code-example linenums="false">
import { Inject }   from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({ ... })
export class MyComponent {
  constructor (@Inject(DOCUMENT) private doc: Document) { ... }
}
</code-example>

<hr>

<h3 class="no-toc">Name expected</h3>

<h3 class="no-toc">期待是名字</h3>

The compiler expected a name in an expression it was evaluating.
This can happen if you use a number as a property name as in the following example.

编译器期待它正在求值的表达式中是一个名字。
如果你像下面的例子中这样用一个数字作为属性名，就会导致这个问题。

```

// ERROR
provider: [{ provide: Foo, useValue: { 0: 'test' } }]

```

Change the name of the property to something non-numeric.

把该属性的名字改为非数字类型。

```

// CORRECTED
provider: [{ provide: Foo, useValue: { '0': 'test' } }]

```

<hr>

<h3 class="no-toc">Unsupported enum member name</h3>

<h3 class="no-toc">不支持的枚举成员名</h3>

Angular couldn't determine the value of the [enum member](https://www.typescriptlang.org/docs/handbook/enums.html)
that you referenced in metadata.

Angular 不能确定你在元数据中引用的[枚举成员](https://www.typescriptlang.org/docs/handbook/enums.html)的值。

The compiler can understand simple enum values but not complex values such as those derived from computed properties.

编译器可以理解简单的枚举值，但不能理解复杂的，比如从那些计算属性中派生出来的。

<code-example linenums="false">
// ERROR
enum Colors {
  Red = 1,
  White,
  Blue = "Blue".length // computed
}

  ...
  providers: [
    { provide: BaseColor,   useValue: Colors.White } // ok
    { provide: DangerColor, useValue: Colors.Red }   // ok
    { provide: StrongColor, useValue: Colors.Blue }  // bad
  ]
  ...
</code-example>

Avoid referring to enums with complicated initializers or computed properties.

避免引用那些使用了复杂初始化对象或计算属性的枚举。

<hr>

{@a tagged-template-expressions-not-supported}

<h3 class="no-toc">Tagged template expressions are not supported</h3>

<h3 class="no-toc">不支持带标签函数的模板表达式</h3>

<div class="alert is-helpful">

_Tagged template expressions are not supported in metadata._

*元数据中不支持带标签函数的模板表达式。*

</div>

The compiler encountered a JavaScript ES2015 [tagged template expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) such as,

当编译器遇到这样的[带标签函数的模板表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) 时：

```

// ERROR
const expression = 'funky';
const raw = String.raw`A tagged template ${expression} string`;
 ...
 template: '<div>' + raw + '</div>'
 ...

```

[`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw)
is a _tag function_ native to JavaScript ES2015.

[`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw) 是一个 ES2015 原生的*标签函数*。

The AOT compiler does not support tagged template expressions; avoid them in metadata expressions.

AOT 编译器不支持带标签函数的模板表达式，避免在元数据表达式中使用它们。

<hr>

<h3 class="no-toc">Symbol reference expected</h3>

<h3 class="no-toc">期待是符号引用</h3>

The compiler expected a reference to a symbol at the location specified in the error message.

编译器期待在错误信息指出的位置是一个符号引用。

This error can occur if you use an expression in the `extends` clause of a class.

当你在类的 `extends` 子句中使用表达式时就会出现这个错误。

<!--

Chuck: After reviewing your PR comment I'm still at a loss. See [comment there](https://github.com/angular/angular/pull/17712#discussion_r132025495).

-->

{@a binding-expression-validation}
  ## Phase 3: binding expression validation

  ## 阶段 3：验证绑定表达式

  In the validation phase, the Angular template compiler uses the TypeScript compiler to validate the
  binding expressions in templates. Enable this phase explicitly by adding the compiler
  option `"fullTemplateTypeCheck"` in the `"angularCompilerOptions"` of the project's `tsconfig.json` (see
  [Angular Compiler Options](#compiler-options)).

  在验证阶段，Angular 的模板编译器会使用 TypeScript 编译器来验证模板中的绑定表达式。
  通过在项目的 `tsconfig.json`（参见 [Angular Compiler Options](#compiler-options)）的 `"angularCompilerOptions"` 中添加编译选项 `"fullTemplateTypeCheck"` 可以启用这个阶段。

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

  This will produce the following error:

  这会生成如下错误：

  ```

  my.component.ts.MyComponent.html(1,1): : Property 'addresss' does not exist on type 'Person'. Did you mean 'address'?

  ```

  The file name reported in the error message, `my.component.ts.MyComponent.html`, is a synthetic file
  generated by the template compiler that holds contents of the `MyComponent` class template.
  Compiler never writes this file to disk. The line and column numbers are relative to the template string
  in the `@Component` annotation of the class, `MyComponent` in this case. If a component uses
  `templateUrl` instead of `template`, the errors are reported in the HTML file referenced by the
  `templateUrl` instead of a synthetic file.

  错误信息中汇报的文件名 `my.component.ts.MyComponent.html` 是一个由模板编译器生成出的合成文件，
  用于保存 `MyComponent` 类的模板内容。
  编译器永远不会把这个文件写入磁盘。这个例子中，这里的行号和列号都是相对于 `MyComponent` 的 `@Component` 注解中的模板字符串的。
  如果组件使用 `templateUrl` 来代替 `template`，这些错误就会在 `templateUrl` 引用的 HTML 文件中汇报，而不是这个合成文件中。

  The error location is the beginning of the text node that contains the interpolation expression with
  the error. If the error is in an attribute binding such as `[value]="person.address.street"`, the error
  location is the location of the attribute that contains the error.

  错误的位置是从包含出错的插值表达式的那个文本节点开始的。
  如果错误是一个属性绑定，比如 `[value]="person.address.street"` ，错误的位置就是那个包含错误的属性的位置。

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
  比如，要在上述模板中消除 `Object is possibly 'undefined'` 错误，可以把它改成只在 `person` 的值初始化过的时候才生成这个插值表达式。

  ```typescript

  @Component({
    selector: 'my-component',
    template: '<span *ngIf="person"> {{person.addresss.street}} </span>'
  })
  class MyComponent {
    person?: Person;
  }

  ```

  Using `*ngIf` allows the TypeScript compiler to infer that the `person` used in the
  binding expression will never be `undefined`.

  使用 `*ngIf` 能让 TypeScript 编译器推断出这个绑定表达式中使用的 `person` 永远不会是 `undefined`。

  #### Custom `ngIf` like directives

  #### 类似于的 `ngIf` 的自定义指令

  Directives that behave like `*ngIf` can declare that they want the same treatment by including
  a static member marker that is a signal to the template compiler to treat them
  like `*ngIf`. This static member for `*ngIf` is:

  那些行为与 `*ngIf` 类似的指令可以通过包含一个静态成员作为标记，来告诉模板编译器它们希望和 `*ngIf` 享受同等待遇。这个 `*ngIf` 的静态成员就是：

  ```typescript

    public static ngIfUseIfTypeGuard: void;

  ```

  This declares that the input property `ngIf` of the `NgIf` directive should be treated as a
  guard to the use of its template, implying that the template will only be instantiated if
  the `ngIf` input property is true.

  它声明了 `NgIf` 指令的 `ngIf` 属性应该在用到它的模板中看做一个守卫，以表明只有当 `ngIf` 这个输入属性为 `true` 时，才应该生成那个模板。

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

  The non-null assertion operator should be used sparingly as refactoring of the component
  might break this constraint.

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

  ### Disabling type checking using `$any()`

  ### 使用 `$any()` 禁用类型检查

  Disable checking of a binding expression by surrounding the expression
  in a call to the [`$any()` cast pseudo-function](guide/template-syntax).
  The compiler treats it as a cast to the `any` type just like in TypeScript when a `<any>`
  or `as any` cast is used.

  可以通过把绑定表达式包含在[类型转换伪函数 `$any()` ](guide/template-syntax) 中来禁用类型检查。
  编译器会像在 TypeScript 中使用 `<any>` 或 `as any` 进行类型转换一样对待它。

  In the following example, the error `Property addresss does not exist` is suppressed
  by casting `person` to the `any` type.

  下面的例子中，通过把 `person` 转换成 `any` 类型，忽略了 `Property addresss does not exist` 错误。

  ```typescript

  @Component({
    selector: 'my-component',
    template: '{{$any(person).addresss.street}}'
  })
  class MyComponent {
    person?: Person;
  }

  ```

{@a tsconfig-extends}
## Configuration inheritance with extends

## 用 `extends` 语法配置继承方式

Similar to TypeScript Compiler, Angular Compiler also supports `extends` in the `tsconfig.json` on `angularCompilerOptions`. A tsconfig file can inherit configurations from another file using the `extends` property.
 The `extends` is a top level property parallel to `compilerOptions` and `angularCompilerOptions`. 
 The configuration from the base file are loaded first, then overridden by those in the inheriting config file.
 Example:

像 TypeScript 编译器相似，Angular 编译器也支持在 `tsconfig.json` 的 `angularCompilerOptions` 中使用 `extends` 语法。
tsconfig 文件可以 使用 `extends` 属性从其它文件中继承配置。
`extends` 位于顶级，和 `compilerOptions`、`angularCompilerOptions` 同级。
首先加载 base 文件中的配置，然后用当前配置文件中的选项进行覆盖。比如：

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    ...
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "preserveWhitespaces": true,
    ...
  }
}
```

More information about tsconfig extends can be found in the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

关于 tsconfig `extends` 语法的更多知识，参见 [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。

{@a compiler-options}
## Angular template compiler options

## Angular 模板编译器选项

The template compiler options are specified as members of the `"angularCompilerOptions"` object in the `tsconfig.json` file. Specify template compiler options along with the options supplied to the TypeScript compiler as shown here:

模板编译器的选项通过 `tsconfig.json` 文件中 `"angularCompilerOptions"` 对象的成员来指定。
给模板编译器的选项随着给 TypeScript 选项一起提供，如下所示：

  ```json
    {
      "compilerOptions": {
        "experimentalDecorators": true,
                  ...
      },
      "angularCompilerOptions": {
        "fullTemplateTypeCheck": true,
        "preserveWhitespaces": true,
                  ...
      }
  }
  ```

The following section describes the Angular's template compiler options.

下面的部分会讲解 Angular 模板编译器的选项。

### *enableResourceInlining*

This option instructs the compiler to replace the `templateUrl` and `styleUrls` property in all `@Component` decorators with inlined contents in `template` and `styles` properties.
When enabled, the `.js` output of `ngc` will have no lazy-loaded `templateUrl` or `styleUrls`.

该选项指示编译器将所有 `@Component` 装饰器中的 `templateUrl` 和 `styleUrls` 属性替换成内联在 `template` 和 `styles` 属性中的常量。
当启用时，`ngc` 输出的 `.js` 文件中就没有惰性加载的 `templateUrl` 或 `styleUrls`。

### *skipMetadataEmit*

This option tells the compiler not to produce `.metadata.json` files.
The option is `false` by default.

该选项告诉编译器不要生成 `.metadata.json` 文件。默认为 `false`。

`.metadata.json` files contain information needed by the template compiler from a `.ts`
file that is not included in the `.d.ts` file produced by the TypeScript compiler. This information contains,
for example, the content of annotations (such as a component's template), which TypeScript
emits to the `.js` file but not to the `.d.ts` file.

`.metadata.json` 文件中包含模板编译器需要从 `.ts` 文件中获取的信息，但它没有包含在由 TypeScript 编译器生成的 `.d.ts` 文件中。
比如，该信息包含注解的内容（比如组件的模板），TypeScript 会把它放进 `.js` 文件里，但不会放进 `.d.ts` 文件里。

This option should be set to `true` if you are using TypeScript's `--outFile` option, because the metadata files
are not valid for this style of TypeScript output. It is not recommended to use `--outFile` with
Angular. Use a bundler, such as [webpack](https://webpack.js.org/), instead.

如果你要使用 TypeScript 的 `--outFile` 选项，则该选项应该设置为 `true`，因为 TypeScript 的这种输出形式中没有包含元数据。不建议在 Angular 中使用 `--outFile` 选项。请改用像 [webpack](https://webpack.js.org/) 这样的打包器。

This option can also be set to `true` when using factory summaries because the factory summaries
include a copy of the information that is in the `.metadata.json` file.

当使用工厂摘要（factory summaries）时，该选项也可以设置为 `true`，因为工厂摘要包含了 `.metadata.json` 中那些信息的副本。

### *strictMetadataEmit*

This option tells the template compiler to report an error to the `.metadata.json`
file if `"skipMetadataEmit"` is `false`. This option is `false` by default. This should only be used when `"skipMetadataEmit"` is `false` and `"skipTemplateCodeGen"` is `true`.

该选项告诉模板编译器，，当 `"skipMetadataEmit"` 为 `false` 时，就要向 `.metadata.json` 中报告一个错误。该选项默认为 `false`。只有当 `"skipMetadataEmit"` 为 `false`，而且 `"skipTemplateCodeGen"` 为 `true` 时才应该开启该选项。

This option is intended to validate the `.metadata.json` files emitted for bundling with an `npm` package. The validation is strict and can emit errors for metadata that would never produce an error when used by the template compiler. You can choose to suppress the error emitted by this option for an exported symbol by including `@dynamic` in the comment documenting the symbol.

该选项是为了验证为生成 `npm` 包而产生的 `.metadata.json` 文件。这种验证是严格的，并且会报告元数据中的错误，以免当模板编译器使用它时再出错。你可以通过在某个导出符号的注释文档中使用 `@dynamic` 注释来暂时防止（suppress）该选项报告错误。

It is valid for `.metadata.json` files to contain errors. The template compiler reports these errors
if the metadata is used to determine the contents of an annotation. The metadata
collector cannot predict the symbols that are designed for use in an annotation, so it will preemptively
include error nodes in the metadata for the exported symbols. The template compiler can then use the error
nodes to report an error if these symbols are used. If the client of a library intends to use a symbol in an annotation, the template compiler will not normally report
this until the client uses the symbol. This option allows detecting these errors during the build phase of
the library and is used, for example, in producing Angular libraries themselves.

即使 `.metadata.json` 中包含错误，如果该元数据只是用来确定注解的内容，那么它仍然可能是有效的。
元数据收集器无法预知哪些符号是为了用作注解而设计的，所以它会先在导出符号的元数据中包含这些错误节点。然后，如果模板编译器真的用到了这些符号，它就能使用这个错误节点来报告错误。如果库的使用者想要在注解中使用某个符号，则直到客户代码使用了该符号时，模板编译器才会报告该错误。此选项能让你在库的构建阶段就检测出这类错误，比如，Angular 本身的这些库就是这么干的。

### *skipTemplateCodegen*

This option tells the compiler to suppress emitting `.ngfactory.js` and `.ngstyle.js` files. When set,
this turns off most of the template compiler and disables reporting template diagnostics.
This option can be used to instruct the
template compiler to produce `.metadata.json` files for distribution with an `npm` package while
avoiding the production of `.ngfactory.js` and `.ngstyle.js` files that cannot be distributed to
`npm`.

该选项告诉编译器不要生成 `.ngfactory.js` 和 `.ngstyle.js` 文件。
如果设置了，则它会关闭大多数模板编译器，并禁止报告对模板的诊断信息。
该选项可用于指示模板编译器生成 `.metadata.json` 文件，以便作为 `npm` 包进行分发，同时，避免生成那些无法分发到 `npm` 的 `.ngfactory.js` 和 `.ngstyle.js` 文件。

### *strictInjectionParameters*

When set to `true`, this options tells the compiler to report an error for a parameter supplied
whose injection type cannot be determined. When this option is not provided or is `false`, constructor parameters of classes marked with `@Injectable` whose type cannot be resolved will
produce a warning.

当设置为 `true` 时，该选项告诉编译器对那些无法确定类型的注入参数报错。
当不提供该选项或为 `false` 时，对于标记为 `@Injectable` 的类的构造函数中那些无法确定类型的参数将生成一个警告。 

*Note*: It is recommended to change this option explicitly to `true` as this option will default to `true` in the future.

**注意**：建议将此选项显式更改为 `true`，因为此选项将来将会默认为 `true`。

### *flatModuleOutFile*

When set to `true`, this option tells the template compiler to generate a flat module
index of the given file name and the corresponding flat module metadata. Use this option when creating
flat modules that are packaged similarly to `@angular/core` and `@angular/common`. When this option
is used, the `package.json` for the library should refer
to the generated flat module index instead of the library index file. With this
option only one `.metadata.json` file is produced, which contains all the metadata necessary
for symbols exported from the library index. In the generated `.ngfactory.js` files, the flat
module index is used to import symbols that includes both the public API from the library index
as well as shrowded internal symbols.

如果为 `true`，则该选项告诉模板编译器为指定的文件名生成一个扁平模块索引和相应的扁平模块元数据。当创建打包形式类似于 `@angular/core` 和 `@angular/common` 这样的扁平模块时，请使用该选项。
使用此选项，只会生成一个 `.metadata.json` 文件，其中包含从库索引中导出的符号所需的全部元数据。在生成的 `.ngfactory.js` 文件中，扁平模块索引用于导入所有符号，包括库索引中的公共 API，和那些受限的内部符号。

By default the `.ts` file supplied in the `files` field is assumed to be the library index.
If more than one `.ts` file is specified, `libraryIndex` is used to select the file to use.
If more than one `.ts` file is supplied without a `libraryIndex`, an error is produced. A flat module
index `.d.ts` and `.js` will be created with the given `flatModuleOutFile` name in the same
location as the library index `.d.ts` file. For example, if a library uses the
`public_api.ts` file as the library index of the module, the `tsconfig.json` `files` field
would be `["public_api.ts"]`. The `flatModuleOutFile` options could then be set to, for
example `"index.js"`, which produces `index.d.ts` and  `index.metadata.json` files. The
library's `package.json`'s `module` field would be `"index.js"` and the `typings` field
would be `"index.d.ts"`.

默认情况下，`files` 字段中提供的 `.ts` 文件会被当做库索引。如果指定了多个 `.ts` 文件，则使用 `libraryIndex` 来选择要使用的索引文件。如果提供了多个 `.ts` 文件但没有指定 `libraryIndex`，就会产生错误。
编译器会用 `flatModuleOutFile` 所指定的名称在与库索引的 `.d.ts` 文件相同的位置创建平面模块索引的 `.d.ts` 和 `.js` 文件。比如，如果库使用 `public_api.ts` 文件作为模块的库索引，则 `tsconfig.json` 的 `files` 字段应该是 `["public_api.ts"]`。
`flatModuleOutFile`。然后还可以将 `flatModuleOutFile` 选项设置为 `index.js`，它将会生成 `index.d.ts` 和  `index.metadata.json` 文件。这个库的 `package.json` 的 `module` 字段将会是 `"inex.js"`，而 `typings` 字段将会是 `"index.d.ts"`。

### *flatModuleId*

This option specifies the preferred module id to use for importing a flat module.
References generated by the template compiler will use this module name when importing symbols
from the flat module.
This is only meaningful when `flatModuleOutFile` is also supplied. Otherwise the compiler ignores
this option.

该选项可以指定用于导入平面模块的首选模块 ID。从平面模块中导入符号时，模板编译器所生成的引用将使用此模块名称。只有在同时提供了 `flatModuleOutFile` 选项时，该选项才有意义，否则编译器会忽略它。

### *generateCodeForLibraries*

This option tells the template compiler to generate factory files (`.ngfactory.js` and `.ngstyle.js`)
for `.d.ts` files with a corresponding `.metadata.json` file. This option defaults to
`true`. When this option is `false`, factory files are generated only for `.ts` files.

该选项告诉模板编译器，为 `.d.ts` 文件生成与 `.metadata.json` 对应的工厂文件（`.ngfactory.js` 和 `.ngstyle.js`）。该选项默认为 `true`。如果为 `false`，则只会为 `.ts` 文件生成工厂文件。

This option should be set to `false` when using factory summaries.

当使用工厂摘要（factory summaries）时，该选项应该设置为 `false`。

### *fullTemplateTypeCheck*

This option tells the compiler to enable the [binding expression validation](#binding-expression-validation)
phase of the template compiler which uses TypeScript to validate binding expressions.

该选项告诉编译器，为模板编译器开启[绑定表达式校验](#binding-expression-validation)阶段，它使用 TypeScript 来验证各个绑定表达式。

This option is `false` by default.

该选项默认为 `false`。

*Note*: It is recommended to set this to `true` because this option will default to `true` in the future.

*注意*：建议把它设置为 `true`，因为该选项将来会默认为 `true`。

### *annotateForClosureCompiler*

This option tells the compiler to use [Tsickle](https://github.com/angular/tsickle) to annotate the emitted
JavaScript with [JSDoc](http://usejsdoc.org/) comments needed by the
[Closure Compiler](https://github.com/google/closure-compiler). This option defaults to `false`.

该选项会告诉编译器使用 [Tsickle](https://github.com/angular/tsickle) 来为所生成的 JavaScript 文件添加 [JSDoc](http://usejsdoc.org/) 注释，供 [Closure Compiler](https://github.com/google/closure-compiler) 使用。该选项默认为 `false`。

### *annotationsAs*

Use this option to modify how the Angular specific annotations are emitted to improve tree-shaking. Non-Angular
annotations and decorators are unaffected. Default is `static fields`.

使用该选项可以修改 Angular 特有的注解的生成方式，以改善摇树优化。对非 Angular 的注解和装饰器无效。默认为 `static fields`

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
  <th>

  Value

  值

  </th>
  <th>

  Description

  说明

  </th>
  </tr>
  <tr>
    <td><code>decorators</code></td>
  <td>

  Leave the decorators in place. This makes compilation faster. TypeScript will emit calls to the __decorate helper.  Use <code>--emitDecoratorMetadata</code> for runtime reflection.  However, the resulting code will not properly tree-shake.

  把装饰器留在原地。这会让编译更快。TypeScript 会调用 __decorate 助手。使用 <code>--emitDecoratorMetadata</code> 来支持运行时反射。但是，这会导致代码无法被正确的摇树优化。

  </td>
  </tr>
  <tr>
    <td><code>static fields</code></td>
  <td>

  Replace decorators with a static field in the class. Allows advanced tree-shakers like
  <a href="https://github.com/google/closure-compiler">Closure compiler</a> to remove unused classes.

  用类中的静态字段替换装饰器，允许使用 <a href="https://github.com/google/closure-compiler">Closure compiler</a> 等高级摇树优化器来删除未使用的类。

  </td>
  </tr>
  </table>


### *trace*

This tells the compiler to print extra information while compiling templates.

这会告诉编译器在编译模板时打印出额外的信息。

### *enableLegacyTemplate*

Use of  the `<template>` element was deprecated starting in Angular 4.0 in favor of using
`<ng-template>` to avoid colliding with the DOM's element of the same name. Setting this option to
`true` enables the use of the deprecated `<template>` element. This option
is `false` by default. This option might be required by some third-party Angular libraries.

从 Angular 4.0 开始，不建议再使用 `<template>`，而是改用 `<ng-template>` 来避免与 DOM 中的同名元素发生冲突。把该选项设置为 `true` 可以让你继续使用已废弃的 `<template>` 元素。
该选项默认为 `false`。某些第三方 Angular 库可能需要此选项。

### *disableExpressionLowering*

The Angular template compiler transforms code that is used, or could be used, in an annotation
to allow it to be imported from template factory modules. See
[metadata rewriting](#metadata-rewriting) for more information.

Angular 模板编译器会转换注解中用到或可能用到的代码，以允许从模板工厂模块中导入代码。详情参见[元数据重写](#metadata-rewriting)。

Setting this option to `false` disables this rewriting, requiring the rewriting to be
done manually.

把该选项设置为 `false` 会禁用这种重写，必要时可以手动重写。

### *disableTypeScriptVersionCheck*

When `true`, this option tells the compiler not to check the TypeScript version.
The compiler will skip checking and will not error out when an unsupported version of TypeScript is used.
Setting this option to `true` is not recommended because unsupported versions of TypeScript might have undefined behaviour.

当为 `true` 时，该选项告诉编译器不要检查 TypeScript 的版本。
当时用了不支持的 TypeScript 版本时，该选项将会跳过检查，并且不会报错。
不建议把该选项设置为 `true`，因为不支持的 TypeScript 版本可能会带来未定义的行为。

This option is `false` by default.

该选项默认为 `false`。

### *preserveWhitespaces*

This option tells the compiler whether to remove blank text nodes from compiled templates.
As of v6, this option is `false` by default, which results in smaller emitted template factory modules.

该选项会告诉编译器是否要从已编译的模板中删除空白的文本节点（为 `false` 则删除）。从 v6 开始，该选项默认为 `false`，这会生成较小的模板工厂模块。

### *allowEmptyCodegenFiles*

Tells the compiler to generate all the possible generated files even if they are empty. This option is
`false` by default. This is an option used by the Bazel build rules and is needed to simplify
how Bazel rules track file dependencies. It is not recommended to use this option outside of the Bazel
rules.

告诉编译器生成所有可能生成的文件，即使它们是空的。默认情况下，该选项为 `false`。这是供 Bazel 构建规则使用的选项，用于简化 Bazel 规则跟踪文件依赖的方式。
建议不要在 Bazel 规则之外使用该选项。
