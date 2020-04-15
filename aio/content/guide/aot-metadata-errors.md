# AOT metadata errors

# AOT 元数据错误


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

{@a expression-form-not-supported}

## Expression form not supported

## 不支持表达形式 (Expression form not supported)


<div class="alert is-helpful">

*The compiler encountered an expression it didn't understand while evaluating Angular metadata.*

编译器在对 Angular 元数据求值时遇到了一个它不能理解的表达式。

</div>

Language features outside of the compiler's [restricted expression syntax](guide/aot-compiler#expression-syntax)
can produce this error, as seen in the following example:

如以下示例所示，使用了编译器的[受限表达式语法](guide/aot-compiler#expression-syntax)之外的语言特性可能会产生此错误：

```ts

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

Avoid this error by sticking to the compiler's [restricted expression syntax](guide/aot-compiler#expression-syntax)
when writing Angular metadata
and be wary of new or unusual TypeScript features.

通过在编写 Angular 元数据时坚持使用编译器的[受限表达式语法](guide/aot-compiler#expression-syntax)来避免此错误，并小心新的或不常用的 TypeScript 功能。


<hr>

{@a reference-to-a-local-symbol}

## Reference to a local (non-exported) symbol

## 引用本地（未导出的）符号 (Reference to a local (non-exported) symbol)


<div class="alert is-helpful">

_Reference to a local (non-exported) symbol 'symbol name'. Consider exporting the symbol._

*如果要引用局部（未导出的）符号 'symbol name'，请考虑导出它。*

</div>

The compiler encountered a referenced to a locally defined symbol that either wasn't exported or wasn't initialized.

编译器遇到了局部定义的未导出或未初始化的符号。

Here's a `provider` example of the problem.

下面就是存在该问题的 `provider` 范例。

```ts

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

编译器会在单独的模块中生成这个 `userValue` 提供者的代码。*那个*工厂模块不能访问*这个*源码模块，无法访问这个（未导出的）`foo` 变量。

You could fix the problem by initializing `foo`.

你可以通过初始化 `foo` 来修正这个错误。

```ts

let foo = 42; // initialized

```

The compiler will [fold](guide/aot-compiler#code-folding) the expression into the provider as if you had written this.

编译器会将表达式[折叠](guide/aot-compiler#code-folding)到提供者中，就像你自己写的一样。


```ts

  providers: [
    { provide: Foo, useValue: 42 }
  ]

```

Alternatively, you can fix it by exporting `foo` with the expectation that `foo` will be assigned at runtime when you actually know its value.

另外，你也可以通过导出 `foo` 来解决它，这样 `foo` 将会在运行期间你真正知道它的值的时候被赋值。

```ts

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

```ts

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

## Only initialized variables and constants

## 只支持初始化过的变量和常量 (Only initialized variables and constants)


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

```ts

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

```ts

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

```ts

// CORRECTED
export let someTemplate = '<h1>Greetings from Angular</h1>';

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}

```

<hr>

{@a reference-to-a-non-exported-class}

## Reference to a non-exported class

## 引用未导出过的类 (Reference to a non-exported class)


<div class="alert is-helpful">

_Reference to a non-exported class <class name>. Consider exporting the class._

*如果要引用未导出的类 <class name>，请考虑导出它。*

</div>

Metadata referenced a class that wasn't exported.

元数据引用了一个未导出的类。

For example, you may have defined a class and used it as an injection token in a providers array
but neglected to export that class.

比如，你可能定义了一个类并在某个 `providers` 数组中把它用作了依赖注入令牌，但是忘了导出这个类。

```ts

// ERROR
abstract class MyStrategy { }

  ...
  providers: [
    { provide: MyStrategy, useValue: ... }
  ]
  ...

```

Angular generates a class factory in a separate module and that
factory [can only access exported classes](guide/aot-compiler#exported-symbols).
To correct this error, export the referenced class.

Angular 在单独的模块中生成类工厂，并且该工厂[只能访问导出的类](guide/aot-compiler#exported-symbols)。要更正此错误，请导出所引用的类。


```ts

// CORRECTED
export abstract class MyStrategy { }

  ...
  providers: [
    { provide: MyStrategy, useValue: ... }
  ]
  ...

```

<hr>

{@a reference-to-a-non-exported-function}

## Reference to a non-exported function

## 引用未导出过的函数 (Reference to a non-exported function)


<div class="alert is-helpful">

*Metadata referenced a function that wasn't exported.*

元数据中引用了未导出的函数。

</div>

For example, you may have set a providers `useFactory` property to a locally defined function that you neglected to export.

比如，你可能已经把某个服务提供者的 `useFactory` 属性设置成了一个局部定义但忘了导出的函数。

```ts

// ERROR
function myStrategy() { ... }

  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  ...

```

Angular generates a class factory in a separate module and that
factory [can only access exported functions](guide/aot-compiler#exported-symbols).
To correct this error, export the function.

Angular 在单独的模块中生成类工厂，该工厂[只能访问导出的函数](guide/aot-compiler#exported-symbols) 。要更正此错误，请导出此函数。


```ts

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

## Function calls are not supported

## 不支持函数调用 (Function calls are not supported)


<div class="alert is-helpful">

_Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function._

*不支持函数调用。考虑把这个函数或 lambda 表达式替换成一个对已导出函数的引用。*

</div>

The compiler does not currently support [function expressions or lambda functions](guide/aot-compiler#function-expression).
For example, you cannot set a provider's `useFactory` to an anonymous function or arrow function like this.

编译器当前不支持[函数表达式或 lambda 函数](guide/aot-compiler#function-expression) 。例如，您不能将提供者的 `useFactory` 设置为这样的匿名函数或箭头函数。


```ts

// ERROR
  ...
  providers: [
    { provide: MyStrategy, useFactory: function() { ... } },
    { provide: OtherStrategy, useFactory: () => { ... } }
  ]
  ...

```

You also get this error if you call a function or method in a provider's `useValue`.

如果你在某个提供者的 `useValue` 中调用函数或方法，也会导致这个错误。

```ts

// ERROR
import { calculateValue } from './utilities';

  ...
  providers: [
    { provide: SomeValue, useValue: calculateValue() }
  ]
  ...

```

To correct this error, export a function from the module and refer to the function in a `useFactory` provider instead.

要改正这个问题，就要从模块中导出这个函数，并改成在服务提供者的 `useFactory` 中引用该函数。

```ts

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

```

<hr>

{@a destructured-variable-not-supported}

## Destructured variable or constant not supported

## 不支持解构变量或常量 (Destructured variable or constant not supported)


<div class="alert is-helpful">

_Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring._

*模板编译器不支持引用导出的解构语法的变量或常量。考虑简化这一点，以避免解构语法。*

</div>

The compiler does not support references to variables assigned by [destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring).

编译器不支持引用通过[解构](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring)赋值的方式得到的变量。

For example, you cannot write something like this:

比如，你不能这么写：

```ts

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

```

To correct this error, refer to non-destructured values.

要纠正这个错误，就要引用非解构方式的变量。

```ts

// CORRECTED
import { configuration } from './configuration';
  ...
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  ...

```

<hr>

{@a could-not-resolve-type}

## Could not resolve type

## 无法解析类型 (Could not resolve type)


<div class="alert is-helpful">

*The compiler encountered a type and can't determine which module exports that type.*

编译器遇到了某个类型，但是不知道它是由哪个模块导出的。

</div>

This can happen if you refer to an ambient type.
For example, the `Window` type is an ambient type declared in the global `.d.ts` file.

这通常会发生在你引用环境类型时。
比如，`Window` 类型就是在全局 `.d.ts` 文件中声明的环境类型。

You'll get an error if you reference it in the component constructor,
which the compiler must statically analyze.

如果你在组件的构造函数中引用它就会导致一个错误，因为编译器必须对构造函数进行静态分析。

```ts

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

   使用该工厂函数添加一个 `useFactory` 提供者。

1. Use `@Inject` to inject the instance.

   使用 `@Inject` 来注入这个实例。

Here's an illustrative example.

下面的例子说明了这一点。

```ts

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

```

The `Window` type in the constructor is no longer a problem for the compiler because it
uses the `@Inject(WINDOW)` to generate the injection code.

对于编译器来说，构造函数中出现 `Window` 类型已不再是个问题，因为它现在使用 `@Inject(WINDOW)` 来生成注入代码。

Angular does something similar with the `DOCUMENT` token so you can inject the browser's `document` object (or an abstraction of it, depending upon the platform in which the application runs).

Angular 也用 `DOCUMENT` 令牌做了类似的事情，所以你也可以注入浏览器的 `document` 对象（或它的一个抽象层，取决于该应用运行在哪个平台）。

```ts

import { Inject }   from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({ ... })
export class MyComponent {
  constructor (@Inject(DOCUMENT) private doc: Document) { ... }
}

```

<hr>

{@a name-expected}

## Name expected

## 期望的名字 (Name expected)


<div class="alert is-helpful">

*The compiler expected a name in an expression it was evaluating.*

*编译器在正在计算的表达式中期望有一个名字。*


</div>

This can happen if you use a number as a property name as in the following example.

如果将数字用作属性名称，则可能发生这种情况，如以下示例所示。


```ts

// ERROR
provider: [{ provide: Foo, useValue: { 0: 'test' } }]

```

Change the name of the property to something non-numeric.

把该属性的名字改为非数字类型。

```ts

// CORRECTED
provider: [{ provide: Foo, useValue: { '0': 'test' } }]

```

<hr>

{@a unsupported-enum-member-name}

## Unsupported enum member name

## 不支持的枚举成员名称 (Unsupported enum member name)


<div class="alert is-helpful">

*Angular couldn't determine the value of the [enum member](https://www.typescriptlang.org/docs/handbook/enums.html) that you referenced in metadata.*

Angular 不能确定你在元数据中引用的[枚举成员](https://www.typescriptlang.org/docs/handbook/enums.html)的值。

</div>

The compiler can understand simple enum values but not complex values such as those derived from computed properties.

编译器可以理解简单的枚举值，但不能理解复杂的，比如从那些计算属性中派生出来的。

```ts

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

```

Avoid referring to enums with complicated initializers or computed properties.

避免引用那些使用了复杂初始化对象或计算属性的枚举。

<hr>

{@a tagged-template-expressions-not-supported}

## Tagged template expressions are not supported

## 不支持带标签的模板表达式 (Tagged template expressions are not supported)


<div class="alert is-helpful">

_Tagged template expressions are not supported in metadata._

*元数据中不支持带标签函数的模板表达式。*

</div>

The compiler encountered a JavaScript ES2015 [tagged template expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) such as the following.

编译器遇到了 JavaScript ES2015 [带标记的模板表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) ，如下所示。


```ts

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

{@a symbol-reference-expected}

## Symbol reference expected

## 期待符号的引用 (Symbol reference expected)


<div class="alert is-helpful">

*The compiler expected a reference to a symbol at the location specified in the error message.*

编译器期待在错误信息指出的位置是一个符号引用。

</div>

This error can occur if you use an expression in the `extends` clause of a class.

当你在类的 `extends` 子句中使用表达式时就会出现这个错误。

<!--

Chuck: After reviewing your PR comment I'm still at a loss. See [comment there](https://github.com/angular/angular/pull/17712#discussion_r132025495).

-->
