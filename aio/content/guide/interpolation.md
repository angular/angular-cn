# Text interpolation

# 文本插值

Text interpolation allows you to incorporate dynamic string values into your HTML templates.
With interpolation, you can dynamically change what appears in an application view, such as displaying a custom greeting that includes the user's name.

文本插值允许你将动态字符串值合并到 HTML 模板中。通过插值，你可以动态更改应用视图中显示的内容，例如显示包含用户名的自定义问候语。

<div class="alert is-helpful">

See the <live-example></live-example> for all of the syntax and code snippets in this guide.

要了解本指南中涉及的语法和代码片段，请参阅 <live-example></live-example>。

</div>

## Displaying values with interpolation

## 使用插值语法显示值

Interpolation refers to embedding expressions into marked up text.
By default, interpolation uses the double curly braces `{{` and `}}`  as delimiters.

插值是指将表达式嵌入到被标记的文本中。默认情况下，插值使用双花括号 `{{` 和 `}}` 作为定界符。

To illustrate how interpolation works, consider an Angular component that contains a `currentCustomer` variable:

为了说明插值的工作原理，请考虑一个包含 `currentCustomer` 变量的 Angular 组件：

<code-example path="interpolation/src/app/app.component.ts" region="customer" header="src/app/app.component.ts"></code-example>

You can use interpolation to display the value of this variable in the corresponding component template:

你可以使用插值在相应的组件模板中显示此变量的值：

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1" header="src/app/app.component.html"></code-example>

Angular replaces `currentCustomer` with the string value of the corresponding component property.
In this case, the value is `Maria`.

Angular 会用相应组件属性的字符串值替换掉 `currentCustomer`。在这里，它的值是 `Maria`。

In the following example, Angular evaluates the `title` and `itemImageUrl` properties to display some title text and an image.

在以下示例中，Angular 会求出 `title` 和 `itemImageUrl` 属性的值，以显示一些标题文本和图像。

<code-example path="interpolation/src/app/app.component.html" region="component-property" header="src/app/app.component.html"></code-example>

## Template expressions

## 模板表达式

A template **expression** produces a value and appears within double curly braces, `{{ }}`.
Angular resolves the expression and assigns it to a property of a binding target.
The target could be an HTML element, a component, or a directive.

模板**表达式**会产生一个值，它出现在双花括号 `{{ }}` 中。 Angular 解析该表达式并将其赋值给绑定目标的某个属性。目标可以是 HTML 元素、组件或指令。

### Resolving expressions with interpolation

### 用插值解析表达式

More generally, the text between the braces is a template expression that Angular first evaluates and then converts to a string.
The following interpolation illustrates the point by adding two numbers:

一般来说，括号间的文本是一个模板表达式，Angular 先对它求值，再把它转换成字符串。
  下列插值通过把括号中的两个数字相加说明了这一点：

<code-example path="interpolation/src/app/app.component.html" region="convert-string" header="src/app/app.component.html"></code-example>

Expressions can also invoke methods of the host component such as `getVal()` in the following example:

这些表达式也可以调用宿主组件的方法，就像下面用的 `getVal()`：

<code-example path="interpolation/src/app/app.component.html" region="invoke-method" header="src/app/app.component.html"></code-example>

With interpolation, Angular performs the following tasks:

通过插值，Angular 执行以下任务：

1. Evaluates all expressions in double curly braces.

   计算所有位于双花括号中的表达式。

1. Converts the expression results to strings.

   将这些表达式的结果转换为字符串。

1. Links the results to any adjacent literal strings.

   将这些结果融入相邻的字符串文本中。

1. Assigns the composite to an element or directive property.

   将融合后的结果赋值给元素或指令的属性。

<div class="alert is-helpful">

You can configure the interpolation delimiter with the [interpolation](api/core/Component#interpolation) option in the `@Component()` metadata.

如果你想用别的分隔符来代替 `{{` 和 `}}`，也可以通过 `@Component()` 元数据中的 [interpolation](api/core/Component#interpolation) 选项来配置插值分隔符。

</div>

### Syntax

### 语法

Template expressions are similar to JavaScript.
Many JavaScript expressions are legal template expressions, with the following exceptions.

模板表达式和 JavaScript 很相似。许多 JavaScript 表达式都是合法的模板表达式，但以下情况除外。

You can't use JavaScript expressions that have or promote side effects, including:

你不能使用那些具有或可能引发副作用的 JavaScript 表达式，包括：

* Assignments (`=`, `+=`, `-=`, `...`)

  赋值 (`=`, `+=`, `-=`, `...`)

* Operators such as `new`, `typeof`, or `instanceof`

  运算符，比如 `new`、`typeof` 或 `instanceof` 等。

* Chaining expressions with <code>;</code> or <code>,</code>

   使用 <code>;</code> 或 <code>,</code> 串联起来的表达式

* The increment and decrement operators `++` and `--`

   自增和自减运算符：`++` 和 `--`

* Some of the ES2015+ operators

   一些 ES2015+ 版本的运算符

Other notable differences from JavaScript syntax include:

和 JavaScript 语法的其它显著差异包括：

* No support for the bitwise operators such as `|` and `&`

   不支持位运算，比如 `|` 和 `&`

* New [template expression operators](guide/template-expression-operators), such as `|`, `?.` and `!`

  新的[模板表达式运算符](guide/template-expression-operators)，例如 `|`，`?.` 和 `!`

## Expression context

## 表达式上下文

Interpolated expressions have a context&mdash;a particular part of the application to which the expression belongs.
Typically, this context is the component instance.

插值表达式具有上下文 —— 表达式所属应用中的特定部分。通常，此上下文就是组件实例。

In the following snippet, the expression `recommended` and the expression `itemImageUrl2` refer to properties of the `AppComponent`.

在下面的代码片段中，表达式 `recommended` 和 `itemImageUrl2` 表达式所引用的都是 `AppComponent` 中的属性。

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

An expression can also refer to properties of the _template's_ context such as a [template input variable](guide/structural-directives#shorthand) or a [template reference variable](guide/template-reference-variables).

表达式也可以引用*模板*上下文中的属性，例如[模板输入变量](guide/structural-directives#shorthand)或[模板引用变量](guide/template-reference-variables)。

The following example uses a template input variable of `customer`.

下面的例子就使用了模板输入变量 `customer`。

<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (template input variable)"></code-example>

This next example features a template reference variable, `#customerInput`.

接下来的例子使用了模板引用变量 `#customerInput`。

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (template reference variable)"></code-example>

<div class="alert is-helpful">

Template expressions cannot refer to anything in the global namespace, except `undefined`.
They can't refer to `window` or `document`.
Additionally, they can't call `console.log()` or `Math.max()` and they are restricted to referencing members of the expression context.

模板表达式不能引用全局命名空间中的任何东西，比如 `window` 或 `document`。它们也不能调用 `console.log` 或 `Math.max`。
它们只能引用表达式上下文中的成员。

</div>

### Preventing name collisions

### 防止命名冲突

The context against which an expression evaluates is the union of the template variables, the directive's context object&mdash;if it has one&mdash;and the component's members.
If you reference a name that belongs to more than one of these namespaces, Angular applies the following logic to determine the context:

表达式求值的上下文是模板变量、指令的上下文对象（如果有的话）以及组件成员的并集。如果所引用的名称在多个命名空间都有，则 Angular 将应用以下逻辑来确定上下文：

1. The template variable name.

   模板变量的名称。

1. A name in the directive's context.

   指令上下文中的名称。

1. The component's member names.

   组件成员的名称。

To avoid variables shadowing variables in another context, keep variable names unique.
In the following example, the `AppComponent` template greets the `customer`, Padma.

为避免变量遮盖另一个上下文中的变量，请保持变量名称唯一。在以下示例中，`AppComponent` 模板在问候 `customer` Padma。

An `ngFor` then lists each `customer` in the `customers` array.

然后，一个 `ngFor` 列出了 `customers` 数组中的每个 `customer`。

<code-example path="interpolation/src/app/app.component.1.ts" region="var-collision" header="src/app/app.component.ts"></code-example>

The `customer` within the `ngFor` is in the context of an `<ng-template>` and so refers to the `customer` in the `customers` array, in this case Ebony and Chiho.
This list does not feature Padma because `customer` outside of the `ngFor` is in a different context.
Conversely, `customer` in the `<h1>` doesn't include Ebony or Chiho because the context for this `customer` is the class and the class value for `customer` is Padma.

`ngFor` 中的 `customer` 处于一个 `<ng-template>` 的上下文中，所以它指向的是 `customers` 数组中的 `customer`，在这里是 Ebony 和 Chiho。此列表中不包含 Padma，因为那个 `customer` 位于 `ngFor` 以外的另一个上下文中。反之，`<h1>` 中的 `customer` 不包括 Ebony 或 Chiho，因为该 `customer` 的上下文是组件类，而这个类中 `customer` 的值是 Padma。

## Expression best practices

## 表达式最佳实践

When using template expressions, follow these best practices:

使用模板表达式时，请遵循以下最佳实践：

* **Use short expressions**

  **使用短表达式**

  Use property names or method calls whenever possible.
  Keep application and business logic in the component, where it is easier to develop and test.

  尽可能使用属性名称或方法调用。将应用和业务逻辑保留在易于开发和测试的组件中。

* **Quick execution**

  **快速执行**

  Angular executes template expressions after every [change detection](guide/glossary#change-detection) cycle.
  Many asynchronous activities trigger change detection cycles, such as promise resolutions, HTTP results, timer events, key presses and mouse moves.

  Angular 会在每个[变更检测](guide/glossary#change-detection)周期之后执行模板表达式。许多异步活动都会触发变更检测周期，例如解析 Promise、HTTP 结果、计时器事件、按键和鼠标移动。

  Expressions should finish quickly to keep the user experience as efficient as possible, especially on slower devices.
  Consider caching values when their computation requires greater resources.

  表达式应尽快完成，以保持用户体验的性能，尤其是在速度较慢的设备上。当计算值需要更多资源时，请考虑缓存值。

* **No visible side effects**

  **没有可见的副作用**

    According to Angular's [unidirectional data flow model](guide/glossary#unidirectional-data-flow), a template expression should not change any application state other than the value of the target property.
    Reading a component value should not change some other displayed value.
    The view should be stable throughout a single rendering pass.

    根据 Angular 的[单向数据流模型](guide/glossary#unidirectional-data-flow)，除了目标属性的值之外，模板表达式不应更改任何应用状态。读取组件值不应更改其他显示值。该视图应在整个渲染过程中保持稳定。

    <div class="callout is-important">
      <header>Idempotent expressions reduce side effects</header>
      <header>幂等表达式能减少副作用</header>

    An [idempotent](https://en.wikipedia.org/wiki/Idempotence) expression is free of side effects and improves Angular's change detection performance.
    In Angular terms, an idempotent expression always returns *exactly the same thing* until one of its dependent values changes.

    [幂等](https://en.wikipedia.org/wiki/Idempotence)的表达式是最理想的，因为它没有副作用，并且可以提高 Angular 的变更检测性能。
用 Angular 术语来说，幂等表达式总会返回*完全相同的东西*，除非其依赖值之一发生了变化。

Dependent values should not change during a single turn of the event loop.
If an idempotent expression returns a string or a number, it returns the same string or number if you call it twice consecutively.
    If the expression returns an object, including an `array`, it returns the same object *reference* if you call it twice consecutively.

  在单独的一次事件循环中，被依赖的值不应该改变。
  如果幂等的表达式返回一个字符串或数字，如果连续调用它两次，会返回相同的字符串或数字。
  如果幂等的表达式返回一个对象（包括 `Date` 或 `Array`），如果连续调用它两次，会返回同一个对象的*引用*。

</div>

  <div class="alert is-important">

  There is one exception to this behavior that applies to `*ngFor`.
  `*ngFor` has `trackBy` functionality that can deal with changing values in objects when iterating over them.
  See [*ngFor with `trackBy`](guide/built-in-directives#ngfor-with-trackby) for details.

  对于 `*ngFor`，这种行为有一个例外。`*ngFor` 具有 `trackBy` 功能，在迭代对象时它可以正确处理对象值的变化。详情参见 [带 `trackBy` 的 *ngFor](guide/built-in-directives#ngfor-with-trackby)。

</div>
