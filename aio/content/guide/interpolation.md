# Interpolation and template expressions

# 插值与模板表达式

Interpolation allows you to incorporate calculated strings into the text
between HTML element tags and within attribute assignments. Template
expressions are what you use to calculate those strings.

插值能让你把计算后的字符串合并到 HTML 元素标签之间和属性赋值语句内的文本中。模板表达式则是用来供你求出这些字符串的。


<div class="alert is-helpful">

See the <live-example></live-example> for all of
the syntax and code snippets in this guide.

要了解本指南中涉及的语法和代码片段，请参阅 <live-example></live-example>。

</div>

## Interpolation `{{...}}`

## 插值 `{{...}}`

Interpolation refers to embedding expressions into marked up text.
By default, interpolation uses as its delimiter the double curly braces, `{{` and `}}`.

所谓 "插值" 是指将表达式嵌入到标记文本中。
默认情况下，插值会用双花括号 `{{` 和 `}}` 作为分隔符。

In the following snippet, `{{ currentCustomer }}` is an example of interpolation.

在下面的代码片段中，`{{ currentCustomer }}` 就是插值的例子。

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1" header="src/app/app.component.html"></code-example>

The text between the braces is often the name of a component
property. Angular replaces that name with the
string value of the corresponding component property.

花括号之间的文本通常是组件属性的名字。Angular 会把这个名字替换为响应组件属性的字符串值。

<code-example path="interpolation/src/app/app.component.html" region="component-property" header="src/app/app.component.html"></code-example>

In the example above, Angular evaluates the `title` and `itemImageUrl` properties
and fills in the blanks, first displaying some title text and then an image.

在上面的示例中，Angular 计算 `title` 和 `itemImageUrl` 属性并填充空白，首先显示一些标题文本，然后显示图像。

More generally, the text between the braces is a **template expression**
that Angular first **evaluates** and then **converts to a string**.
The following interpolation illustrates the point by adding two numbers:

一般来说，括号间的素材是一个**模板表达式**，Angular 先**对它求值**，再把它**转换成字符串**。
  下列插值通过把括号中的两个数字相加说明了这一点：

<code-example path="interpolation/src/app/app.component.html" region="convert-string" header="src/app/app.component.html"></code-example>

The expression can invoke methods of the host component such as `getVal()` in
the following example:

这个表达式可以调用宿主组件的方法，就像下面用的 `getVal()`：

<code-example path="interpolation/src/app/app.component.html" region="invoke-method" header="src/app/app.component.html"></code-example>

Angular evaluates all expressions in double curly braces,
converts the expression results to strings, and links them with neighboring literal strings. Finally,
it assigns this composite interpolated result to an **element or directive property**.

Angular 对所有双花括号中的表达式求值，把求值的结果转换成字符串，并把它们跟相邻的字符串字面量连接起来。最后，把这个组合出来的插值结果赋给**元素或指令的属性**。

You appear to be inserting the result between element tags and assigning it to attributes.
However, interpolation is a special syntax that Angular converts into a *property binding*.

你看上去似乎正在将结果插入元素标签之间，并将其赋值给属性。
但实际上，插值是一种特殊语法，Angular 会将其转换为*属性绑定*。

<div class="alert is-helpful">

If you'd like to use something other than `{{` and `}}`, you can
configure the interpolation delimiter via the
[interpolation](api/core/Component#interpolation)
option in the `Component` metadata.

如果你想用别的分隔符来代替 `{{` 和 `}}`，也可以通过 `Component` 元数据中的 [interpolation](api/core/Component#interpolation) 选项来配置插值分隔符。

</div>

## Template expressions

## 模板表达式

A template **expression** produces a value and appears within the double
curly braces, `{{ }}`.
Angular executes the expression and assigns it to a property of a binding target;
the target could be an HTML element, a component, or a directive.

模板**表达式**会产生一个值，并出现在双花括号 `{{ }}` 中。
  Angular 执行这个表达式，并把它赋值给绑定目标的属性，这个绑定目标可能是 HTML 元素、组件或指令。

The interpolation braces in `{{1 + 1}}` surround the template expression `1 + 1`.
In the property binding,
a template expression appears in quotes to the right of the&nbsp;`=` symbol as in `[property]="expression"`.

`{{1 + 1}}` 中所包含的模板表达式是 `1 + 1`。
  在属性绑定中会再次看到模板表达式，它出现在 `=` 右侧的引号中，就像这样：`[property]="expression"`。

In terms of syntax, template expressions are similar to JavaScript.
Many JavaScript expressions are legal template expressions, with a few exceptions.

在语法上，模板表达式与 JavaScript 很像。很多 JavaScript 表达式都是合法的模板表达式，但也有一些例外。

You can't use JavaScript expressions that have or promote side effects,
including:

你不能使用那些具有或可能引发副作用的 JavaScript 表达式，包括：

* Assignments (`=`, `+=`, `-=`, `...`)

   赋值 (`=`, `+=`, `-=`, `...`)

* Operators such as `new`, `typeof`, `instanceof`, etc.

   `new`、`typeof`、`instanceof` 等运算符。

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

The *expression context* is typically the _component_ instance.
In the following snippets, the `recommended` within double curly braces and the
`itemImageUrl2` in quotes refer to properties of the `AppComponent`.

典型的*表达式上下文*就是这个**组件实例**，它是各种绑定值的来源。
在下面的代码片段中，双花括号中的 `recommended` 和引号中的 `itemImageUrl2` 所引用的都是 `AppComponent` 中的属性。

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

An expression may also refer to properties of the _template's_ context
such as a template input variable,

表达式也可以引用模板中的上下文属性，例如模板输入变量，

<!-- link to built-in-directives#template-input-variables -->

`let customer`, or a template reference variable, `#customerInput`.

`let customer`，或模板引用变量 `#customerInput`。

<!-- link to guide/template-ref-variables -->

<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (template input variable)"></code-example>

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (template reference variable)"></code-example>

The context for terms in an expression is a blend of the _template variables_,
the directive's _context_ object (if it has one), and the component's _members_.
If you reference a name that belongs to more than one of these namespaces,
the template variable name takes precedence, followed by a name in the directive's _context_,
and, lastly, the component's member names.

表达式中的上下文变量是由*模板变量*、指令的*上下文变量*（如果有）和组件的*成员*叠加而成的。
如果你要引用的变量名存在于一个以上的命名空间中，那么，模板变量是最优先的，其次是指令的上下文变量，最后是组件的成员。

The previous example presents such a name collision. The component has a `customer`
property and the `*ngFor` defines a `customer` template variable.

上一个例子中就体现了这种命名冲突。组件具有一个名叫 `customer` 的属性，而 `*ngFor` 声明了一个也叫 `customer` 的模板变量。

<div class="alert is-helpful">

The `customer` in `{{customer.name}}`
refers to the template input variable, not the component's property.

在 `{{customer.name}}` 表达式中的 `customer` 实际引用的是模板变量，而不是组件的属性。

Template expressions cannot refer to anything in
the global namespace, except `undefined`. They can't refer to
`window` or `document`. Additionally, they
can't call `console.log()` or `Math.max()` and they are restricted to referencing
members of the expression context.

模板表达式不能引用全局命名空间中的任何东西，比如 `window` 或 `document`。它们也不能调用 `console.log` 或 `Math.max`。
它们只能引用表达式上下文中的成员。

</div>

## Expression guidelines

## 表达式使用指南

When using template expressions follow these guidelines:

当使用模板表达式时，请遵循下列指南：

* [Simplicity](guide/interpolation#simplicity)

   [非常简单](guide/interpolation#simplicity)

* [Quick execution](guide/interpolation#quick-execution)

   [执行迅速](guide/interpolation#quick-execution)

* [No visible side effects](guide/interpolation#no-visible-side-effects)

   [没有可见的副作用](guide/interpolation#no-visible-side-effects)

### Simplicity

### 简单

Although it's possible to write complex template expressions, it's a better
practice to avoid them.

虽然也可以写复杂的模板表达式，不过最好避免那样做。

A property name or method call should be the norm, but an occasional Boolean negation, `!`, is OK.
Otherwise, confine application and business logic to the component,
where it is easier to develop and test.

属性名或方法调用应该是常态，但偶然使用逻辑取反 `!` 也是可以的。
其它情况下，应该把应用程序和业务逻辑限制在组件中，这样它才能更容易开发和测试。

### Quick execution

### 快速执行

Angular executes template expressions after every change detection cycle.
Change detection cycles are triggered by many asynchronous activities such as
promise resolutions, HTTP results, timer events, key presses and mouse moves.

Angular 会在每个变更检测周期后执行模板表达式。
变更检测周期会被多种异步活动触发，比如 Promise 解析、HTTP 结果、定时器时间、按键或鼠标移动。

Expressions should finish quickly or the user experience may drag, especially on slower devices.
Consider caching values when their computation is expensive.

表达式应该快速结束，否则用户就会感到拖沓，特别是在较慢的设备上。
当计算代价较高时，应该考虑缓存那些从其它值计算得出的值。

### No visible side effects

### 没有可见的副作用

A template expression should not change any application state other than the value of the
target property.

模板表达式除了目标属性的值以外，不应该改变应用的任何状态。

This rule is essential to Angular's "unidirectional data flow" policy.
You should never worry that reading a component value might change some other displayed value.
The view should be stable throughout a single rendering pass.

这条规则是 Angular “单向数据流”策略的基础。
永远不用担心读取组件值可能改变另外的显示值。
在一次单独的渲染过程中，视图应该总是稳定的。

An [idempotent](https://en.wikipedia.org/wiki/Idempotence) expression is ideal because
it is free of side effects and improves Angular's change detection performance.
In Angular terms, an idempotent expression always returns
*exactly the same thing* until one of its dependent values changes.

[幂等](https://en.wikipedia.org/wiki/Idempotence)的表达式是最理想的，因为它没有副作用，并且可以提高 Angular 的变更检测性能。
用 Angular 术语来说，幂等表达式总会返回*完全相同的东西*，除非其依赖值之一发生了变化。

Dependent values should not change during a single turn of the event loop.
If an idempotent expression returns a string or a number, it returns the same string or number when called twice in a row. If the expression returns an object, including an `array`, it returns the same object *reference* when called twice in a row.

在单独的一次事件循环中，被依赖的值不应该改变。
  如果幂等的表达式返回一个字符串或数字，连续调用它两次，也应该返回相同的字符串或数字。
  如果幂等的表达式返回一个对象（包括 `Date` 或 `Array`），连续调用它两次，也应该返回同一个对象的*引用*。

<div class="alert is-helpful">

There is one exception to this behavior that applies to `*ngFor`. `*ngFor` has `trackBy` functionality that can deal with referential inequality of objects when iterating over them. See [*ngFor with `trackBy`](guide/built-in-directives#ngfor-with-trackby) for details.

对于 `*ngFor`，这种行为有一个例外。`*ngFor` 具有 `trackBy` 功能，在迭代对象时它可以处理对象的相等性。详情参见 [带 `trackBy` 的 *ngFor](guide/built-in-directives#ngfor-with-trackby)。

</div>

