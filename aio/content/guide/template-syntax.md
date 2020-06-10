# Template syntax

# 模板语法

<style>
  h4 {font-size: 17px !important; text-transform: none !important;}
  .syntax { font-family: Consolas, 'Lucida Sans', Courier, sans-serif; color: black; font-size: 85%; }
  h4 .syntax { font-size: 100%; }
</style>

The Angular application manages what the user sees and can do, achieving this through the interaction of a component class instance (the *component*) and its user-facing template.

Angular 应用管理着用户之所见和所为，并通过 Component 类的实例（*组件*）和面向用户的模板交互来实现这一点。

You may be familiar with the component/template duality from your experience with model-view-controller (MVC) or model-view-viewmodel (MVVM).
In Angular, the component plays the part of the controller/viewmodel, and the template represents the view.

从使用模型-视图-控制器 (MVC) 或模型-视图-视图模型 (MVVM) 的经验中，很多开发人员都熟悉了组件和模板这两个概念。
  在 Angular 中，组件扮演着控制器或视图模型的角色，模板则扮演视图的角色。

This page is a comprehensive technical reference to the Angular template language.
It explains basic principles of the template language and describes most of the syntax that you'll encounter elsewhere in the documentation.

这是一篇关于 Angular 模板语言的技术大全。
它解释了模板语言的基本原理，并描述了你将在文档中其它地方遇到的大部分语法。

Many code snippets illustrate the points and concepts, all of them available
in the <live-example title="Template Syntax Live Code"></live-example>.

这里还有很多代码片段用来解释技术点和概念，它们全都在<live-example title="模板语法的现场演练"></live-example>中。

{@a html}

## HTML in templates

## 模板中的 HTML

HTML is the language of the Angular template.
Almost all HTML syntax is valid template syntax.
The `<script>` element is a notable exception;
it is forbidden, eliminating the risk of script injection attacks.
In practice, `<script>` is ignored and a warning appears in the browser console.
See the [Security](guide/security) page for details.

HTML 是 Angular 模板的语言。几乎所有的 HTML 语法都是有效的模板语法。
但值得注意的例外是 `<script>` 元素，它被禁用了，以阻止脚本注入攻击的风险。（实际上，`<script>` 只是被忽略了。）
参见[安全](guide/security)页了解详情。

Some legal HTML doesn't make much sense in a template.
The `<html>`, `<body>`, and `<base>` elements have no useful role.
Pretty much everything else is fair game.

有些合法的 HTML 被用在模板中是没有意义的。`<html>`、`<body>` 和 `<base>` 元素这个舞台上中并没有扮演有用的角色。剩下的所有元素基本上就都一样用了。

You can extend the HTML vocabulary of your templates with components and directives that appear as new elements and attributes.
In the following sections, you'll learn how to get and set DOM (Document Object Model) values dynamically through data binding.

可以通过组件和指令来扩展模板中的 HTML 词汇。它们看上去就是新元素和属性。接下来将学习如何通过数据绑定来动态获取/设置 DOM（文档对象模型）的值。

Begin with the first form of data binding&mdash;interpolation&mdash;to see how much richer template HTML can be.

首先看看数据绑定的第一种形式 —— 插值，它展示了模板的 HTML 可以有多丰富。

<hr/>

{@a interpolation}

## Interpolation and Template Expressions

## 插值与模板表达式

Interpolation allows you to incorporate calculated strings into the text
between HTML element tags and within attribute assignments. Template
expressions are what you use to calculate those strings.

插值能让你把计算后的字符串合并到 HTML 元素标签之间和属性赋值语句内的文本中。模板表达式则是用来供你求出这些字符串的。

The interpolation <live-example></live-example> demonstrates all of
the syntax and code snippets described in this section.

这个关于插值的<live-example></live-example>演示了本节所讲的全部语法和代码片段。

### Interpolation `{{...}}`

### 插值 `{{...}}`

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

### Template expressions

### 模板表达式

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

* New [template expression operators](guide/template-syntax#expression-operators), such as `|`, `?.` and `!`

  新的[模板表达式运算符](guide/template-syntax#expression-operators)，例如 `|`，`?.` 和 `!`

### Expression context

### 表达式上下文

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

### Expression guidelines

### 表达式使用指南

When using template expressions follow these guidelines:

当使用模板表达式时，请遵循下列指南：

* [Simplicity](guide/template-syntax#simplicity)

   [非常简单](guide/template-syntax#simplicity)

* [Quick execution](guide/template-syntax#quick-execution)

   [执行迅速](guide/template-syntax#quick-execution)

* [No visible side effects](guide/template-syntax#no-visible-side-effects)

   [没有可见的副作用](guide/template-syntax#no-visible-side-effects)

#### Simplicity

#### 简单

Although it's possible to write complex template expressions, it's a better
practice to avoid them.

虽然也可以写复杂的模板表达式，不过最好避免那样做。

A property name or method call should be the norm, but an occasional Boolean negation, `!`, is OK.
Otherwise, confine application and business logic to the component,
where it is easier to develop and test.

属性名或方法调用应该是常态，但偶然使用逻辑取反 `!` 也是可以的。
其它情况下，应该把应用程序和业务逻辑限制在组件中，这样它才能更容易开发和测试。

#### Quick execution

#### 快速执行

Angular executes template expressions after every change detection cycle.
Change detection cycles are triggered by many asynchronous activities such as
promise resolutions, HTTP results, timer events, key presses and mouse moves.

Angular 会在每个变更检测周期后执行模板表达式。
变更检测周期会被多种异步活动触发，比如 Promise 解析、HTTP 结果、定时器时间、按键或鼠标移动。

Expressions should finish quickly or the user experience may drag, especially on slower devices.
Consider caching values when their computation is expensive.

表达式应该快速结束，否则用户就会感到拖沓，特别是在较慢的设备上。
当计算代价较高时，应该考虑缓存那些从其它值计算得出的值。

#### No visible side effects

#### 没有可见的副作用

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

There is one exception to this behavior that applies to `*ngFor`. `*ngFor` has `trackBy` functionality that can deal with referential inequality of objects when iterating over them. See [*ngFor with `trackBy`](guide/template-syntax#ngfor-with-trackby) for details.

对于 `*ngFor`，这种行为有一个例外。`*ngFor` 具有 `trackBy` 功能，在迭代对象时它可以处理对象的相等性。详情参见 [带 `trackBy` 的 *ngFor](guide/template-syntax#ngfor-with-trackby)。

</div>

<!-- end of Interpolation doc -->

<hr/>

{@a template-statements}

## Template statements

## 模板语句

A template **statement** responds to an **event** raised by a binding target
such as an element, component, or directive.
You'll see template statements in the [event binding](guide/template-syntax#event-binding) section,
appearing in quotes to the right of the `=`&nbsp;symbol as in `(event)="statement"`.

模板**语句**用来响应由绑定目标（如 HTML 元素、组件或指令）触发的**事件**。
模板语句将在[事件绑定](guide/template-syntax#event-binding)一节看到，它出现在 `=` 号右侧的引号中，就像这样：`(event)="statement"`。

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

A template statement *has a side effect*.
That's the whole point of an event.
It's how you update application state from user action.

模板语句*有副作用*。
这是事件处理的关键。因为你要根据用户的输入更新应用状态。

Responding to events is the other side of Angular's "unidirectional data flow".
You're free to change anything, anywhere, during this turn of the event loop.

响应事件是 Angular 中“单向数据流”的另一面。
    在一次事件循环中，可以随意改变任何地方的任何东西。

Like template expressions, template *statements* use a language that looks like JavaScript.
The template statement parser differs from the template expression parser and
specifically supports both basic assignment (`=`) and chaining expressions with <code>;</code>.

和模板表达式一样，模板*语句*使用的语言也像 JavaScript。
  模板语句解析器和模板表达式解析器有所不同，特别之处在于它支持基本赋值 (`=`) 和表达式链 (`;` 和 `,`)。

However, certain JavaScript and template expression syntax is not allowed:

然而，某些 JavaScript 语法仍然是不允许的：

* <code>new</code>

   `new` 运算符

* increment and decrement operators, `++` and `--`

   自增和自减运算符：`++` 和 `--`

* operator assignment, such as `+=` and `-=`

   操作并赋值，例如 `+=` 和 `-=`

* the bitwise operators, such as `|` and `&`

   位运算符 `|` 和 `&`

* the [pipe operator](guide/template-syntax#pipe)

   [模板表达式运算符](guide/template-syntax#expression-operators)

### Statement context

### 语句上下文

As with expressions, statements can refer only to what's in the statement context
such as an event handling method of the component instance.

和表达式中一样，语句只能引用语句上下文中 —— 通常是正在绑定事件的那个**组件实例**。

The *statement context* is typically the component instance.
The *deleteHero* in `(click)="deleteHero()"` is a method of the data-bound component.

典型的*语句上下文*就是当前组件的实例。
`(click)="deleteHero()"` 中的 *deleteHero* 就是这个数据绑定组件上的一个方法。

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

The statement context may also refer to properties of the template's own context.
In the following examples, the template `$event` object,
a [template input variable](guide/template-syntax#template-input-variable) (`let hero`),
and a [template reference variable](guide/template-syntax#ref-vars) (`#heroForm`)
are passed to an event handling method of the component.

语句上下文可以引用模板自身上下文中的属性。
在下面的例子中，就把模板的 `$event` 对象、[模板输入变量](guide/template-syntax#template-input-variable) (`let hero`)和[模板引用变量](guide/template-syntax#ref-vars) (`#heroForm`)传给了组件中的一个事件处理器方法。

<code-example path="template-syntax/src/app/app.component.html" region="context-var-statement" header="src/app/app.component.html"></code-example>

Template context names take precedence over component context names.
In `deleteHero(hero)` above, the `hero` is the template input variable,
not the component's `hero` property.

模板上下文中的变量名的优先级高于组件上下文中的变量名。在上面的 `deleteHero(hero)` 中，`hero` 是一个模板输入变量，而不是组件中的 `hero` 属性。

### Statement guidelines

### 语句指南

Template statements cannot refer to anything in the global namespace. They
can't refer to `window` or `document`.
They can't call `console.log` or `Math.max`.

模板语句不能引用全局命名空间的任何东西。比如不能引用 `window` 或 `document`，也不能调用 `console.log` 或 `Math.max`。

As with expressions, avoid writing complex template statements.
A method call or simple property assignment should be the norm.

和表达式一样，避免写复杂的模板语句。
常规是函数调用或者属性赋值。

<hr/>

{@a binding-syntax}

## Binding syntax: an overview

## 绑定语法：概览

Data-binding is a mechanism for coordinating what users see, specifically
with application data values.
While you could push values to and pull values from HTML,
the application is easier to write, read, and maintain if you turn these tasks over to a binding framework.
You simply declare bindings between binding sources, target HTML elements, and let the framework do the rest.

数据绑定是一种机制，用来协调用户可见的内容，特别是应用数据的值。
虽然也可以手动从 HTML 中推送或拉取这些值，但是如果将这些任务转交给绑定框架，应用就会更易于编写、阅读和维护。
你只需声明数据源和目标 HTML 元素之间的绑定关系就可以了，框架会完成其余的工作。

For a demonstration of the syntax and code snippets in this section, see the <live-example name="binding-syntax">binding syntax example</live-example>.

对本节中语法和代码片段的说明，参见<live-example name="binding-syntax">绑定语法范例</live-example>。

Angular provides many kinds of data-binding. Binding types can be grouped into three categories distinguished by the direction of data flow:

Angular 提供了多种数据绑定方式。绑定类型可以分为三类，按数据流的方向分为：

* From the _source-to-view_

  从*数据源到视图*

* From _view-to-source_

  从*视图到数据源*

* Two-way sequence: _view-to-source-to-view_

  双向：*视图到数据源到视图*

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="30%">
  </col>
  <col width="50%">
  </col>
  <col width="20%">
  </col>
  <tr>

    <th>

      Type

      绑定类型

    </th>

    <th>

      Syntax

      语法

    </th>

    <th>

      Category

      分类

    </th>

  </tr>
  <tr>

     <td>

      Interpolation<br>
      Property<br>
      Attribute<br>
      Class<br>
      Style

      插值<br>
      属性<br>
      Attribute<br>
      CSS 类<br>
      样式

     </td>

    <td>

      <code-example>
        {{expression}}
        [target]="expression"
        bind-target="expression"
      </code-example>

    </td>

    <td>

      One-way<br>from data source<br>to view target

      单向<br>从数据源<br>到视图

    </td>

    <tr>

      <td>

        Event

        事件

      </td>

      <td>

        <code-example>
          (target)="statement"
          on-target="statement"
        </code-example>

      </td>

      <td>

        One-way<br>from view target<br>to data source

        从视图到数据源的单向绑定

      </td>

    </tr>
    <tr>

      <td>

        Two-way

        双向

      </td>

      <td>

        <code-example>
          [(target)]="expression"
          bindon-target="expression"
        </code-example>

      </td>

      <td>

        Two-way

        双向

      </td>

    </tr>
  </tr>
</table>

Binding types other than interpolation have a **target name** to the left of the equal sign, either surrounded by punctuation, `[]` or `()`,
or preceded by a prefix: `bind-`, `on-`, `bindon-`.

除插值以外的其它绑定类型在等号的左侧都有一个“目标名称”，由绑定符 `[]` 或 `()` 包起来，
或者带有前缀：`bind-`，`on-`，`bindon-`。

The *target* of a binding is the property or event inside the binding punctuation: `[]`, `()` or `[()]`.

绑定的“目标”是绑定符内部的属性或事件：`[]`、`()` 或 `[()]`。

Every public member of a **source** directive is automatically available for binding.
You don't have to do anything special to access a directive member in a template expression or statement.

在绑定时可以使用**来源**指令的每个公共成员。
你无需进行任何特殊操作即可在模板表达式或语句内访问指令的成员。

### Data-binding and HTML

### 数据绑定与 HTML

In the normal course of HTML development, you create a visual structure with HTML elements, and
you modify those elements by setting element attributes with string constants.

在正常的 HTML 开发过程中，你使用 HTML 元素来创建视觉结构，
通过把字符串常量设置到元素的 attribute 来修改那些元素。

```html

<div class="special">Plain old HTML</div>

<img src="images/item.png">
<button disabled>Save</button>

```

With data-binding, you can control things like the state of a button:

使用数据绑定，你可以控制按钮状态等各个方面：

<code-example path="binding-syntax/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Notice that the binding is to the `disabled` property of the button's DOM element,
**not** the attribute. This applies to data-binding in general. Data-binding works with *properties* of DOM elements, components, and directives, not HTML *attributes*.

请注意，这里绑定到的是按钮的 DOM 元素的 `disabled` 这个 *Property*，而不是 *Attribute*。
这是数据绑定的通用规则。数据绑定使用 DOM 元素、组件和指令的 *Property*，而不是 HTML 的*Attribute*。

### HTML attribute vs. DOM property

### HTML attribute 与 DOM property 的对比

The distinction between an HTML attribute and a DOM property is key to understanding
how Angular binding works. **Attributes are defined by HTML. Properties are accessed from DOM (Document Object Model) nodes.**

理解 HTML 属性和 DOM 属性之间的区别，是了解 Angular 绑定如何工作的关键。**Attribute 是由 HTML 定义的。Property 是从 DOM（文档对象模型）节点访问的。**

* A few HTML attributes have 1:1 mapping to properties; for example, `id`.

  一些 HTML Attribute 可以 1:1 映射到 Property；例如，“ id”。

* Some HTML attributes don't have corresponding properties; for example, `aria-*`.

  某些 HTML Attribute 没有相应的 Property。例如，`aria-*`。

* Some DOM properties don't have corresponding attributes; for example, `textContent`.

  某些 DOM Property 没有相应的 Attribute。例如，`textContent`。

It is important to remember that *HTML attribute* and the *DOM property* are different things, even when they have the same name.
In Angular, the only role of HTML attributes is to initialize element and directive state.

重要的是要记住，*HTML Attribute* 和 *DOM Property* 是不同的，就算它们具有相同的名称也是如此。
在 Angular 中，HTML Attribute 的唯一作用是初始化元素和指令的状态。

**Template binding works with *properties* and *events*, not *attributes*.**

**模板绑定使用的是 *Property* 和*事件*，而不是 *Attribute*。**

When you write a data-binding, you're dealing exclusively with the *DOM properties* and *events* of the target object.

编写数据绑定时，你只是在和目标对象的 *DOM Property* 和*事件*打交道。

<div class="alert is-helpful">

This general rule can help you build a mental model of attributes and DOM properties:
**Attributes initialize DOM properties and then they are done.
Property values can change; attribute values can't.**

该通用规则可以帮助你建立 HTML Attribute 和 DOM Property 的思维模型：
**属性负责初始化 DOM 属性，然后完工。Property 值可以改变；Attribute 值则不能。**

There is one exception to this rule.
Attributes can be changed by `setAttribute()`, which re-initializes corresponding DOM properties.

此规则有一个例外。
可以通过 `setAttribute()` 来更改 Attribute，接着它会重新初始化相应的 DOM 属性。

</div>

For more information, see the [MDN Interfaces documentation](https://developer.mozilla.org/en-US/docs/Web/API#Interfaces) which has API docs for all the standard DOM elements and their properties.
Comparing the [`<td>` attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) attributes to the [`<td>` properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) provides a helpful example for differentiation.
In particular, you can navigate from the attributes page to the properties via "DOM interface" link, and navigate the inheritance hierarchy up to `HTMLTableCellElement`.

欲知详情，参见 [MDN 接口文档](https://developer.mozilla.org/en-US/docs/Web/API#Interfaces)，其中包含所有标准 DOM 元素及其 Property 的 API 文档。
[`<td>` Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) 与 [`<td>` Property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) 之间的比较是一个很有用的例子。
特别是，你可以通过 “DOM 接口” 链接从 Attribute 页面导航到 Property 页面，并在继承层次中导航到 `HTMLTableCellElement`。

#### Example 1: an `<input>`

#### 范例 1：`<input>`

When the browser renders `<input type="text" value="Sarah">`, it creates a
corresponding DOM node with a `value` property initialized to "Sarah".

当浏览器渲染 `<input type="text" value="Sarah">` 时，它会创建一个对应的 DOM 节点，其 `value` Property 已初始化为 “Sarah”。

```html

<input type="text" value="Sarah">

```

When the user enters "Sally" into the `<input>`, the DOM element `value` *property* becomes "Sally".
However, if you look at the HTML attribute `value` using `input.getAttribute('value')`, you can see that the *attribute* remains unchanged&mdash;it returns "Sarah".

当用户在 `<input>` 中输入 `Sally` 时，DOM 元素的 `value` *Property* 将变为 `Sally`。
但是，如果使用 `input.getAttribute('value')` 查看 HTML 的 Attribute `value`，则可以看到该 *attribute* 保持不变 —— 它返回了 `Sarah`。

The HTML attribute `value` specifies the *initial* value; the DOM `value` property is the *current* value.

HTML 的 `value` 这个 attribute 指定了*初始*值；DOM 的 `value` 这个 property 是*当前*值。

To see attributes versus DOM properties in a functioning app, see the <live-example name="binding-syntax"></live-example> especially for binding syntax.

要通过可运行的应用查看 Attribute 和 DOM Property 的差别，请参阅 <live-example name="binding-syntax"></live-example>，特别注意其绑定语法。

#### Example 2: a disabled button

#### 范例 2：禁用按钮

The `disabled` attribute is another example. A button's `disabled`
*property* is `false` by default so the button is enabled.

`disabled` Attribute 是另一个例子。按钮的 `disabled` *Property* 默认为 `false`，因此按钮是启用的。

When you add the `disabled` *attribute*, its presence alone
initializes the button's `disabled` *property* to `true`
so the button is disabled.

当你添加 `disabled` *Attribute* 时，仅仅它的出现就将按钮的 `disabled` *Property* 初始化成了 `true`，因此该按钮就被禁用了。

```html

<button disabled>Test Button</button>

```

Adding and removing the `disabled` *attribute* disables and enables the button.
However, the value of the *attribute* is irrelevant,
which is why you cannot enable a button by writing `<button disabled="false">Still Disabled</button>`.

添加和删​​除 `disabled` *Attribute* 会禁用和启用该按钮。
但是，*Attribute* 的值无关紧要，这就是为什么你不能通过编写 `<button disabled="false">仍被禁用</button>` 来启用此按钮的原因。

To control the state of the button, set the `disabled` *property*,

要控制按钮的状态，请设置 `disabled` *Property*，

<div class="alert is-helpful">

Though you could technically set the `[attr.disabled]` attribute binding, the values are different in that the property binding requires to a boolean value, while its corresponding attribute binding relies on whether the value is `null` or not. Consider the following:

虽然技术上说你可以设置 `[attr.disabled]` 属性绑定，但是它们的值是不同的，Property 绑定要求一个布尔值，而其相应的 Attribute 绑定则取决于该值是否为 `null`。例子如下：

```html

<input [disabled]="condition ? true : false">
<input [attr.disabled]="condition ? 'disabled' : null">

```

Generally, use property binding over attribute binding as it is more intuitive (being a boolean value), has a shorter syntax, and is more performant.

通常，要使用 Property 绑定而不是 Attribute 绑定，因为它更直观（是一个布尔值），语法更短，并且性能更高。

</div>

To see the `disabled` button example in a functioning app, see the <live-example name="binding-syntax"></live-example> especially for binding syntax. This example shows you how to toggle the disabled property from the component.

要通过可运行的应用查看 `disabled` 按钮示例，请参见<live-example name="binding-syntax"></live-example>，特别注意其绑定语法。本示例展示了如何从组件中切换禁用属性。

## Binding types and targets

## 绑定类型与绑定目标

The **target of a data-binding** is something in the DOM.
Depending on the binding type, the target can be a property (element, component, or directive),
an event (element, component, or directive), or sometimes an attribute name.
The following table summarizes the targets for the different binding types.

数据绑定的目标是 DOM 中的对象。
根据绑定类型，该目标可以是 Property 名（元素、组件或指令的）、事件名（元素、组件或指令的），有时是 Attribute 名。下表中总结了不同绑定类型的目标。

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="10%">
  </col>
  <col width="15%">
  </col>
  <col width="75%">
  </col>
  <tr>

    <th>

      Type

      绑定类型

    </th>

    <th>

      Target

      目标

    </th>

    <th>

      Examples

      范例

    </th>

  </tr>
  <tr>

    <td>

      Property

      属性

    </td>

    <td>

      Element&nbsp;property<br>
      Component&nbsp;property<br>
      Directive&nbsp;property

      元素的 property<br>
      组件的 property<br>
      指令的 property

    </td>

    <td>

      <code>src</code>, <code>hero</code>, and <code>ngClass</code> in the following:

      <code>src</code>, <code>hero</code>, 和 <code>ngClass</code> 如下所示:

      <code-example path="template-syntax/src/app/app.component.html" region="property-binding-syntax-1"></code-example>

      <!-- For more information, see [Property Binding](guide/property-binding). -->

    </td>

  </tr>
  <tr>

    <td>

      Event

      事件

    </td>

    <td>

      Element&nbsp;event<br>
      Component&nbsp;event<br>
      Directive&nbsp;event

      元素的事件<br>
      组件的事件<br>
      指令的事件

    </td>

    <td>

      <code>click</code>, <code>deleteRequest</code>, and <code>myClick</code> in the following:

      <code>click</code>, <code>deleteRequest</code>, 和 <code>myClick</code> 如下所示：

      <code-example path="template-syntax/src/app/app.component.html" region="event-binding-syntax-1"></code-example>

      <!-- KW--Why don't these links work in the table? -->

      <!-- <div>For more information, see [Event Binding](guide/event-binding).</div> -->

    </td>

  </tr>
  <tr>

    <td>

      Two-way

      双向

    </td>

    <td>

      Event and property

      事件与 property

    </td>

    <td>

      <code-example path="template-syntax/src/app/app.component.html" region="2-way-binding-syntax-1"></code-example>

    </td>

  </tr>
  <tr>

    <td>

      Attribute

    </td>

    <td>

      Attribute
      (the&nbsp;exception)

      attribute（例外情况）

    </td>

    <td>

      <code-example path="template-syntax/src/app/app.component.html" region="attribute-binding-syntax-1"></code-example>

    </td>

  </tr>
  <tr>

    <td>

      Class

      CSS 类

    </td>

    <td>

      <code>class</code> property

    </td>

    <td>

      <code-example path="template-syntax/src/app/app.component.html" region="class-binding-syntax-1"></code-example>

    </td>

  </tr>
  <tr>

    <td>

      Style

      样式

    </td>

    <td>

      <code>style</code> property

    </td>

    <td>

      <code-example path="template-syntax/src/app/app.component.html" region="style-binding-syntax-1"></code-example>

    </td>

  </tr>
</table>

<!-- end of binding syntax -->

<hr/>

{@a property-binding}

## Property binding `[property]`

## Property 绑定 `[property]`

Use property binding to _set_ properties of target elements or
directive `@Input()` decorators. For an example
demonstrating all of the points in this section, see the
<live-example name="property-binding">property binding example</live-example>.

使用 Property 绑定到目标元素或指令 `@Input()` 装饰器的 set 型属性。
演示本节中所有要点的例子，请参见<live-example name="property-binding"></live-example>。

### One-way in

### 单向*输入*

Property binding flows a value in one direction,
from a component's property into a target element property.

Property 绑定的值在一个方向上流动，从组件的 Property 变为目标元素的 Property。

You can't use property
binding to read or pull values out of target elements. Similarly, you cannot use
property binding to call a method on the target element.
If the element raises events, you can listen to them with an [event binding](guide/template-syntax#event-binding).

你不能使用属性绑定从目标元素读取或拉取值。同样的，你也不能使用属性绑定在目标元素上调用方法。如果元素要引发事件，则可以使用[事件绑定](guide/template-syntax#event-binding)来监听它们。

If you must read a target element property or call one of its methods,
see the API reference for [ViewChild](api/core/ViewChild) and
[ContentChild](api/core/ContentChild).

如果你要读取目标元素的属性或调用其方法，请参阅 [ViewChild](api/core/ViewChild) 和 [ContentChild](api/core/ContentChild) 的 API 参考。

### Examples

### 例子

The most common property binding sets an element property to a component
property value. An example is
binding the `src` property of an image element to a component's `itemImageUrl` property:

最常见的 Property 绑定将元素的 Property 设置为组件的 Property 值。例子之一是将 `img` 元素的 `src`  Property 绑定到组件的 `itemImageUrl`  Property：

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

Here's an example of binding to the `colSpan` property. Notice that it's not `colspan`,
which is the attribute, spelled with a lowercase `s`.

这是绑定到 `colSpan` Property 的示例。请注意，它不是 `colspan`，后者是 Attribute，用小写的 s 拼写。

<code-example path="property-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

For more details, see the [MDN HTMLTableCellElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) documentation.

欲知详情，参见 [MDN HTMLTableCellElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) 文档。

<!-- Add link when Attribute Binding updates are merged:
For more about `colSpan` and `colspan`, see (Attribute Binding)[guide/template-syntax]. -->

Another example is disabling a button when the component says that it `isUnchanged`:

另一个例子是当组件说它 `isUnchanged`（未改变）时禁用按钮：

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Another is setting a property of a directive:

另一个例子是设置指令的属性：

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

Yet another is setting the model property of a custom component&mdash;a great way
for parent and child components to communicate:

另一种方法是设置自定义组件的模型属性 —— 这是一种父级和子级组件进行通信的好办法：

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

### Binding targets

### 绑定目标

An element property between enclosing square brackets identifies the target property.
The target property in the following code is the image element's `src` property.

包裹在方括号中的元素属性名标记着目标属性。下列代码中的目标属性是 image 元素的 `src` 属性。

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

There's also the `bind-` prefix alternative:

还有一种使用 `bind-` 前缀的替代方案：

<code-example path="property-binding/src/app/app.component.html" region="bind-prefix" header="src/app/app.component.html"></code-example>

In most cases, the target name is the name of a property, even
when it appears to be the name of an attribute.
So in this case, `src` is the name of the `<img>` element property.

在大多数情况下，目标名都是 Property 名，虽然它看起来像 Attribute 名。因此，在这个例子中，`src` 是 `<img>` 元素属性的名称。

Element properties may be the more common targets,
but Angular looks first to see if the name is a property of a known directive,
as it is in the following example:

元素属性可能是最常见的绑定目标，但 Angular 会先去看这个名字是否是某个已知指令的属性名，就像下面的例子中一样：

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

Technically, Angular is matching the name to a directive `@Input()`,
one of the property names listed in the directive's `inputs` array
or a property decorated with `@Input()`.
Such inputs map to the directive's own properties.

从技术上讲，Angular 将这个名称与指令的 `@Input()` 进行匹配，它来自指令的 `inputs` 数组中列出的 Property 名称之一或是用 `@Input()` 装饰的属性。这些输入都映射到指令自身的属性。

If the name fails to match a property of a known directive or element, Angular reports an “unknown directive” error.

如果名字没有匹配上已知指令或元素的属性，Angular 就会报告“未知指令”的错误。

<div class="alert is-helpful">

Though the target name is usually the name of a property,
there is an automatic attribute-to-property mapping in Angular for
several common attributes. These include `class`/`className`, `innerHtml`/`innerHTML`, and
`tabindex`/`tabIndex`.

尽管目标名称通常是 Property 的名称，但是在 Angular 中，有几个常见属性会自动将 Attribute 映射为 Property。这些包括 `class` / `className`，`innerHtml` / `innerHTML` 和 `tabindex` / `tabIndex`。

</div>

### Avoid side effects

### 消除副作用

Evaluation of a template expression should have no visible side effects.
The expression language itself, or the way you write template expressions,
helps to a certain extent;
you can't assign a value to anything in a property binding expression
nor use the increment and decrement operators.

模板表达的计算应该没有明显的副作用。表达式语言本身或你编写模板表达式的方式在一定程度上有所帮助。你不能为属性绑定表达式中的任何内容赋值，也不能使用递增和递减运算符。

For example, you could have an expression that invoked a property or method that had
side effects. The expression could call something like `getFoo()` where only you
know what `getFoo()` does. If `getFoo()` changes something
and you happen to be binding to that something,
Angular may or may not display the changed value. Angular may detect the
change and throw a warning error.
As a best practice, stick to properties and to methods that return
values and avoid side effects.

例如，假设你有一个表达式，该表达式调用了具有副作用的属性或方法。该表达式可以调用类似 `getFoo()` 的函数，只有你知道 `getFoo()` 做了什么。如果 `getFoo()` 更改了某些内容，而你恰巧绑定到该内容，则 Angular 可能会也可能不会显示更改后的值。Angular 可能会检测到更改并抛出警告错误。最佳实践是坚持使用属性和返回值并避免副作用的方法。

### Return the proper type

### 返回正确的类型

The template expression should evaluate to the type of value
that the target property expects.
Return a string if the target property expects a string, a number if it
expects a number, an object if it expects an object, and so on.

模板表达式的计算结果应该是目标属性所需要的值类型。如果 `target` 属性需要一个字符串，则返回一个字符串；如果需要一个数字，则返回一个数字；如果需要一个对象，则返回一个对象，依此类推。

In the following example, the `childItem` property of the `ItemDetailComponent` expects a string, which is exactly what you're sending in the property binding:

在下面的例子中，`ItemDetailComponent` 的 `childItem` 属性需要一个字符串，而这正是你要发送给属性绑定的内容：

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

You can confirm this by looking in the `ItemDetailComponent` where the `@Input` type is set to a string:

你可以查看 `ItemDetailComponent` 来确认这一点，它的 `@Input` 类型设为了字符串：

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts (setting the @Input() type)"></code-example>

As you can see here, the `parentItem` in `AppComponent` is a string, which the `ItemDetailComponent` expects:

如你所见，`AppComponent` 中的 `parentItem` 是一个字符串，而 `ItemDetailComponent` 需要的就是字符串：

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

#### Passing in an object

#### 传入对象

The previous simple example showed passing in a string. To pass in an object,
the syntax and thinking are the same.

前面的简单示例演示了传入字符串的情况。要传递对象，其语法和思想是相同的。

In this scenario, `ItemListComponent` is nested within `AppComponent` and the `items` property expects an array of objects.

在这种情况下，`ListItemComponent` 嵌套在 `AppComponent` 中，并且 `item` 属性需要一个对象。

<code-example path="property-binding/src/app/app.component.html" region="pass-object" header="src/app/app.component.html"></code-example>

The `items` property is declared in the `ItemListComponent` with a type of `Item` and decorated with `@Input()`:

`item` 属性是在 `ListItemComponent` 中用 `Item` 类型声明的，并带有 `@Input()` 装饰器：

<code-example path="property-binding/src/app/item-list/item-list.component.ts" region="item-input" header="src/app/item-list.component.ts"></code-example>

In this sample app, an `Item` is an object that has two properties; an `id` and a `name`.

在此示例应用程序中，`Item` 是具有两个属性的对象。一个 `id` 和一个 `name`。

<code-example path="property-binding/src/app/item.ts" region="item-class" header="src/app/item.ts"></code-example>

While a list of items exists in another file, `mock-items.ts`, you can
specify a different item in `app.component.ts` so that the new item will render:

当另一个文件 `mock-items.ts` 中存在一个条目列表时，你可以在 `app.component.ts` 中指定另一个条目，以便渲染新条目：

<code-example path="property-binding/src/app/app.component.ts" region="pass-object" header="src/app.component.ts"></code-example>

You just have to make sure, in this case, that you're supplying an array of objects because that's the type of `Item` and is what the nested component, `ItemListComponent`, expects.

在这个例子中，你只需要确保你所提供的对象的类型，也就是这个 `item` 的类型是嵌套组件 `ListItemComponent` 所需要的类型。

In this example, `AppComponent` specifies a different `item` object
(`currentItems`) and passes it to the nested `ItemListComponent`. `ItemListComponent` was able to use `currentItems` because it matches what an `Item` object is according to `item.ts`. The `item.ts` file is where
`ItemListComponent` gets its definition of an `item`.

在此示例中，`AppComponent` 指定了另一个 `item` 对象（ `currentItem` ）并将其传给嵌套的 `ListItemComponent`。`ListItemComponent` 之所以能够使用 `currentItem` 是因为它与 `item.ts` 中定义的 `Item` 对象的类型相匹配。在 `item.ts` 文件中，`ListItemComponent` 获得了其对 `item` 的定义。

### Remember the brackets

### 别忘了方括号

The brackets, `[]`, tell Angular to evaluate the template expression.
If you omit the brackets, Angular treats the string as a constant
and *initializes the target property* with that string:

方括号 `[]` 告诉 Angular 计算该模板表达式。如果省略括号，Angular 会将字符串视为常量，并使用该字符串*初始化目标属性* ：

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

Omitting the brackets will render the string
`parentItem`, not the value of `parentItem`.

省略方括号将渲染字符串 `parentItem`，而不是 `parentItem` 的值。

### One-time string initialization

### 一次性字符串初始化

You *should* omit the brackets when all of the following are true:

当满足下列条件时，*应该*省略括号：

* The target property accepts a string value.

   目标属性接受字符串值。

* The string is a fixed value that you can put directly into the template.

  字符串是一个固定值，你可以直接将其放入模板中。

* This initial value never changes.

   这个初始值永不改变。

You routinely initialize attributes this way in standard HTML, and it works
just as well for directive and component property initialization.
The following example initializes the `prefix` property of the `StringInitComponent` to a fixed string,
not a template expression. Angular sets it and forgets about it.

你通常会以这种方式在标准 HTML 中初始化属性，并且它对指令和组件的属性初始化同样有效。
下面的示例将 `StringInitComponent` 中的 `prefix` 属性初始化为固定字符串，而不是模板表达式。Angular 设置它，然后就不管它了。

<code-example path="property-binding/src/app/app.component.html" region="string-init" header="src/app/app.component.html"></code-example>

The `[item]` binding, on the other hand, remains a live binding to the component's `currentItems` property.

另一方面，`[item]` 绑定仍然是与组件的 `currentItem` 属性的实时绑定。

### Property binding vs. interpolation

### 属性绑定与插值

You often have a choice between interpolation and property binding.
The following binding pairs do the same thing:

你通常得在插值和属性绑定之间做出选择。
下列这几对绑定做的事情完全相同：

<code-example path="property-binding/src/app/app.component.html" region="property-binding-interpolation" header="src/app/app.component.html"></code-example>

Interpolation is a convenient alternative to property binding in
many cases. When rendering data values as strings, there is no
technical reason to prefer one form to the other, though readability
tends to favor interpolation. However, *when setting an element
property to a non-string data value, you must use property binding*.

在许多情况下，插值是属性绑定的便捷替代法。当要把数据值渲染为字符串时，虽然可读性方面倾向于插值，但没有技术上的理由偏爱一种形式。但是，*将元素属性设置为非字符串的数据值时，必须使用属性绑定*。

### Content security

### 内容安全

Imagine the following malicious content.

假设如下*恶意内容*

<code-example path="property-binding/src/app/app.component.ts" region="malicious-content" header="src/app/app.component.ts"></code-example>

In the component template, the content might be used with interpolation:

在组件模板中，内容可以与插值一起使用：

<code-example path="property-binding/src/app/app.component.html" region="malicious-interpolated" header="src/app/app.component.html"></code-example>

Fortunately, Angular data binding is on alert for dangerous HTML. In the above case,
the HTML displays as is, and the Javascript does not execute. Angular **does not**
allow HTML with script tags to leak into the browser, neither with interpolation
nor property binding.

幸运的是，Angular 数据绑定对于危险的 HTML 高度戒备。在上述情况下，HTML 将按原样显示，而 Javascript 不执行。Angular **不允许**带有 `script` 标签的 HTML 泄漏到浏览器中，无论是插值还是属性绑定。

In the following example, however, Angular [sanitizes](guide/security#sanitization-and-security-contexts)
the values before displaying them.

不过，在下列示例中，Angular 会在显示值之前先对它们进行[无害化处理](guide/security#sanitization-and-security-contexts)。

<code-example path="property-binding/src/app/app.component.html" region="malicious-content" header="src/app/app.component.html"></code-example>

Interpolation handles the `<script>` tags differently than
property binding but both approaches render the
content harmlessly. The following is the browser output
of the `evilTitle` examples.

插值处理 `<script>` 标记与属性绑定的方式不同，但是这两种方法都可以使内容无害。以下是 `evilTitle` 示例的浏览器输出。

<code-example language="bash">
"Template <script>alert('evil never sleeps');</script> Syntax" is the interpolated evil title.
"Template alert("evil never sleeps")Syntax" is the property bound evil title.
</code-example>

<hr/>

{@a other-bindings}

## Attribute, class, and style bindings

## attribute、class 和 style 绑定

The template syntax provides specialized one-way bindings for scenarios less well-suited to property binding.

模板语法为那些不太适合使用属性绑定的场景提供了专门的单向数据绑定形式。

To see attribute, class, and style bindings in a functioning app, see the <live-example name="attribute-binding"></live-example> especially for this section.

要在运行中的应用查看 Attribute 绑定、类绑定和样式绑定，请参见 <live-example name="attribute-binding"></live-example> 特别是对于本节。

### Attribute binding

### attribute 绑定

Set the value of an attribute directly with an **attribute binding**. This is the only exception to the rule that a binding sets a target property and the only binding that creates and sets an attribute.

可以直接使用 **Attribute 绑定**设置 Attribute 的值。一般来说，绑定时设置的是目标的 Property，而 Attribute 绑定是唯一的例外，它创建和设置的是 Attribute。

Usually, setting an element property with a [property binding](guide/template-syntax#property-binding)
is preferable to setting the attribute with a string. However, sometimes
there is no element property to bind, so attribute binding is the solution.

通常，使用 [Property 绑定](guide/template-syntax#property-binding)设置元素的 Property 优于使用字符串设置 Attribute。但是，有时没有要绑定的元素的 Property，所以其解决方案就是 Attribute 绑定。

Consider the [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) and
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). They are purely attributes, don't correspond to element properties, and don't set element properties. In these cases, there are no property targets to bind to.

考虑 [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) 和 [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)。它们都纯粹是 Attribute，不对应于元素的 Property，也不能设置元素的 Property。
在这些情况下，就没有要绑定到的目标 Property。

Attribute binding syntax resembles property binding, but
instead of an element property between brackets, start with the prefix `attr`,
followed by a dot (`.`), and the name of the attribute.
You then set the attribute value, using an expression that resolves to a string,
or remove the attribute when the expression resolves to `null`.

Attribute 绑定的语法类似于 Property 绑定，但其括号之间不是元素的 Property，而是由前缀 `attr`、点（ `.` ）和 Attribute 名称组成。然后，你就可以使用能解析为字符串的表达式来设置该 Attribute 的值，或者当表达式解析为 `null` 时删除该 Attribute。

One of the primary use cases for attribute binding
is to set ARIA attributes, as in this example:

attribute 绑定的主要用例之一是设置 ARIA attribute（译注：ARIA 指无障碍功能，用于给残障人士访问互联网提供便利），
就像这个例子中一样：

<code-example path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

#### `colspan` and `colSpan`

#### `colspan` 和 `colSpan`

Notice the difference between the `colspan` attribute and the `colSpan` property.

注意 `colspan` Attribute 和 `colSpan` Property 之间的区别。

If you wrote something like this:

如果你这样写：

<code-example language="html">
  &lt;tr&gt;&lt;td colspan="{{1 + 1}}"&gt;Three-Four&lt;/td&gt;&lt;/tr&gt;
</code-example>

You'd get this error:

你会收到如下错误：

<code-example language="bash">
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property
</code-example>

As the message says, the `<td>` element does not have a `colspan` property. This is true
because `colspan` is an attribute&mdash;`colSpan`, with a capital `S`, is the
corresponding property. Interpolation and property binding can set only *properties*, not attributes.

如错误消息所示，`<td>` 元素没有 `colspan` 这个 Property。这是正确的，因为 `colspan` 是一个 Attribute，而 `colSpan` （`colSpan` 中的 `S` 是大写）则是相应的 Property。插值和 Property 绑定只能设置 *Property*，不能设置 Attribute。

Instead, you'd use property binding and write it like this:

相反，你可以使用 Property 绑定并将其改写为：

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

</div>

<hr/>

### Class binding

### 类绑定

Here's how to set the `class` attribute without a binding in plain HTML:

下面是在普通 HTML 中不用绑定来设置 `class` Attribute 的方法：

```html

<!-- standard class attribute setting -->

<div class="foo bar">Some text</div>
```

You can also add and remove CSS class names from an element's `class` attribute with a **class binding**.

你还可以使用**类绑定**来为一个元素添加和移除 CSS 类。

To create a single class binding, start with the prefix `class` followed by a dot (`.`) and the name of the CSS class (for example, `[class.foo]="hasFoo"`). 
Angular adds the class when the bound expression is truthy, and it removes the class when the expression is falsy (with the exception of `undefined`, see [styling delegation](#styling-delegation)).

要创建单个类的绑定，请使用 `class` 前缀，紧跟一个点（`.`），再跟上 CSS 类名，比如 `[class.foo]="hasFoo"`。
当绑定表达式为真值的时候，Angular 就会加上这个类，为假值则会移除，但 `undefined` 是假值中的例外，参见[样式委派](#styling-delegation) 部分。

To create a binding to multiple classes, use a generic `[class]` binding without the dot (for example, `[class]="classExpr"`).
The expression can be a space-delimited string of class names, or you can format it as an object with class names as the keys and truthy/falsy expressions as the values. 
With object format, Angular will add a class only if its associated value is truthy. 

要想创建多个类的绑定，请使用通用的 `[class]` 形式来绑定类，而不要带点，比如 `[class]="classExpr"`。
该表达式可以是空格分隔的类名字符串，或者用一个以类名为键、真假值表达式为值的对象。
当使用对象格式时，Angular 只会加上那些相关的值为真的类名。

It's important to note that with any object-like expression (`object`, `Array`, `Map`, `Set`, etc), the identity of the object must change for the class list to be updated.
Updating the property without changing object identity will have no effect.

一定要注意，在对象型表达式中（如 `object`、`Array`、`Map`、`Set` 等），当这个类列表改变时，对象的引用也必须修改。仅仅修改其属性而不修改对象引用是无法生效的。

If there are multiple bindings to the same class name, conflicts are resolved using [styling precedence](#styling-precedence).

如果有多处绑定到了同一个类名，出现的冲突将根据[样式的优先级规则](#styling-precedence)进行解决。

 <style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="15%">
  </col>
  <col width="20%">
  </col>
  <col width="35%">
  </col>
  <col width="30%">
  </col>
  <tr>
    <th>
      Binding Type
    </th>
    <th>
      Syntax
    </th>
    <th>
      Input Type
    </th>
    <th>
      Example Input Values
    </th>
  </tr>
  <tr>
    <th>
      绑定类型
    </th>
    <th>
      语法
    </th>
    <th>
      输入类型
    </th>
    <th>
      输入值范例
    </th>
  </tr>
  <tr>
    <td>Single class binding</td>
    <td><code>[class.foo]="hasFoo"</code></td>
    <td><code>boolean | undefined | null</code></td>
    <td><code>true</code>, <code>false</code></td>
  </tr>
  <tr>
    <td>单个类绑定</td>
    <td><code>[class.foo]="hasFoo"</code></td>
    <td><code>boolean | undefined | null</code></td>
    <td><code>true</code>, <code>false</code></td>
  </tr>
  <tr>
    <td rowspan=3>Multi-class binding</td>
    <td rowspan=3><code>[class]="classExpr"</code></td>
    <td><code>string</code></td>
    <td><code>"my-class-1 my-class-2 my-class-3"</code></td>
  </tr>
  <tr>
    <td rowspan=3>多个类绑定</td>
    <td rowspan=3><code>[class]="classExpr"</code></td>
    <td><code>string</code></td>
    <td><code>"my-class-1 my-class-2 my-class-3"</code></td>
  </tr>
  <tr>
    <td><code>{[key: string]: boolean | undefined | null}</code></td>
    <td><code>{foo: true, bar: false}</code></td>
  </tr>
  <tr>
    <td><code>Array</code><<code>string</code>></td>
    <td><code>['foo', 'bar']</code></td>
  </tr>
</table>

The [NgClass](#ngclass) directive can be used as an alternative to direct `[class]` bindings. 
However, using the above class binding syntax without `NgClass` is preferred because due to improvements in class binding in Angular, `NgClass` no longer provides significant value, and might eventually be removed in the future.

尽管此技术适用于切换单个类名，但在需要同时管理多个类名时请考虑使用 [`NgClass`](guide/template-syntax#ngClass) 指令。

<hr/>

### Style binding

### 样式绑定

Here's how to set the `style` attribute without a binding in plain HTML:

下面演示了如何不通过绑定在普通 HTML 中设置 `style` 属性：

```html
<!-- standard style attribute setting -->
<div style="color: blue">Some text</div>
```

You can also set styles dynamically with a **style binding**.

你还可以通过**样式绑定**来动态设置样式。

To create a single style binding, start with the prefix `style` followed by a dot (`.`) and the name of the CSS style property (for example, `[style.width]="width"`). 
The property will be set to the value of the bound expression, which is normally a string.
Optionally, you can add a unit extension like `em` or `%`, which requires a number type.

要想创建单个样式的绑定，请以 `style` 前缀开头，紧跟一个点（`.`），再跟着 CSS 样式的属性名，比如 `[style.width]="width"`。
该属性将会被设置为绑定表达式的值，该值通常为字符串。
不过你还可以添加一个单位表达式，比如 `em` 或 `%`，这时候该值就要是一个 `number` 类型。

<div class="alert is-helpful">

Note that a _style property_ name can be written in either
[dash-case](guide/glossary#dash-case), as shown above, or
[camelCase](guide/glossary#camelcase), such as `fontSize`.

注意，*样式属性*命名方法可以用[中线命名法](guide/glossary#dash-case)，像上面的一样
    也可以用[驼峰式命名法](guide/glossary#camelcase)，如 `fontSize`。

</div>

If there are multiple styles you'd like to toggle, you can bind to the `[style]` property directly without the dot (for example, `[style]="styleExpr"`).
The expression attached to the `[style]` binding is most often a string list of styles like `"width: 100px; height: 100px;"`. 

如果要切换多个样式，你可以直接绑定到 `[style]` 属性而不用点（比如，`[style]="styleExpr"`）。赋给 `[style]` 的绑定表达式通常是一系列样式组成的字符串，比如 `"width: 100px; height: 100px;"`。

You can also format the expression as an object with style names as the keys and style values as the values, like `{width: '100px', height: '100px'}`. 
It's important to note that with any object-like expression (`object`, `Array`, `Map`, `Set`, etc), the identity of the object must change for the class list to be updated.
Updating the property without changing object identity will have no effect.

你也可以把该表达式格式化成一个以样式名为键、以样式值为值的对象，比如 `{width: '100px', height: '100px'}`。一定要注意，对于任何对象型的表达式（ 如 `object`，`Array`，`Map`，`Set` 等），当这个样式列表改变时，对象的引用也必须修改。仅仅修改其属性而不修改对象引用是无法生效的。。

If there are multiple bindings to the same style property, conflicts are resolved using [styling precedence rules](#styling-precedence).

如果有多处绑定了同一个样式属性，则会使用[样式的优先级规则](#styling-precedence)来解决冲突。

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="15%">
  </col>
  <col width="20%">
  </col>
  <col width="35%">
  </col>
  <col width="30%">
  </col>
  <tr>
    <th>
      Binding Type
    </th>
    <th>
      Syntax
    </th>
    <th>
      Input Type
    </th>
    <th>
      Example Input Values
    </th>
  </tr>
  <tr>
    <th>
      绑定类型
    </th>
    <th>
      语法
    </th>
    <th>
      输入类型
    </th>
    <th>
      输入值范例
    </th>
  </tr>
  <tr>
    <td>Single style binding</td>
    <td><code>[style.width]="width"</code></td>
    <td><code>string | undefined | null</code></td>
    <td><code>"100px"</code></td>
  </tr>
  <tr>
    <td>单一样式绑定</td>
    <td><code>[style.width]="width"</code></td>
    <td><code>string | undefined | null</code></td>
    <td><code>"100px"</code></td>
  </tr>
  <tr>
  <tr>
    <td>Single style binding with units</td>
    <td><code>[style.width.px]="width"</code></td>
    <td><code>number | undefined | null</code></td>
    <td><code>100</code></td>
  </tr>
  <tr>
    <td>带单位的单一样式绑定</td>
    <td><code>[style.width.px]="width"</code></td>
    <td><code>number | undefined | null</code></td>
    <td><code>100</code></td>
  </tr>
    <tr>
    <td rowspan=3>Multi-style binding</td>
    <td rowspan=3><code>[style]="styleExpr"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
    <tr>
    <td rowspan=3>多个样式绑定</td>
    <td rowspan=3><code>[style]="styleExpr"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
  <tr>
    <td><code>{[key: string]: string | undefined | null}</code></td>
    <td><code>{width: '100px', height: '100px'}</code></td>
  </tr>
  <tr>
    <td><code>Array</code><<code>string</code>></td>
    <td><code>['width', '100px']</code></td>
  </tr>
</table>

The [NgStyle](#ngstyle) directive can be used as an alternative to direct `[style]` bindings. 
However, using the above style binding syntax without `NgStyle` is preferred because due to improvements in style binding in Angular, `NgStyle` no longer provides significant value, and might eventually be removed in the future.

[NgStyle](#ngstyle) 指令可以作为 `[style]` 绑定的替代指令。但是，应该把上面这种 `[style]` 样式绑定语法作为首选，因为随着 Angular 中样式绑定的改进，`NgStyle` 将不再提供重要的价值，并最终在未来的某个版本中删除。

<hr/>

{@a styling-precedence}
### Styling Precedence

### 样式的优先级规则

A single HTML element can have its CSS class list and style values bound to multiple sources (for example, host bindings from multiple directives).

一个 HTML 元素可以把它的 CSS 类列表和样式值绑定到多个来源（例如，来自多个指令的宿主 `host` 绑定）。

When there are multiple bindings to the same class name or style property, Angular uses a set of precedence rules to resolve conflicts and determine which classes or styles are ultimately applied to the element.

当对同一个类名或样式属性存在多个绑定时，Angular 会使用一组优先级规则来解决冲突，并确定最终哪些类或样式会应用到该元素中。

<div class="alert is-helpful">

<h4>Styling precedence (highest to lowest)</h4>

<h4>样式的优先级规则（从高到低）</h4>

1. Template bindings

   模板绑定

1. Property binding (for example, `<div [class.foo]="hasFoo">` or `<div [style.color]="color">`)

      属性绑定（例如 `<div [class.foo]="hasFoo">` 或 `<div [style.color]="color">`）

   1. Map binding (for example, `<div [class]="classExpr">` or `<div [style]="styleExpr">`)

      Map 绑定（例如，`<div [class]="classExpr">` 或 `<div [style]="styleExpr">` ）

   1. Static value (for example, `<div class="foo">` or `<div style="color: blue">`) 

      静态值（例如 `<div class="foo">` 或 `<div style="color: blue">` ）

1. Directive host bindings

   指令宿主绑定

1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)

      属性绑定（例如，`host: {'[class.foo]': 'hasFoo'}` 或 `host: {'[style.color]': 'color'}` ）

   1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)

      Map 绑定（例如，`host: {'[class]': 'classExpr'}` 或者 `host: {'[style]': 'styleExpr'}` ）

   1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)    

      静态值（例如，`host: {'class': 'foo'}` 或 `host: {'style': 'color: blue'}` ）

1. Component host bindings

   组件宿主绑定

1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)

      属性绑定（例如，`host: {'[class.foo]': 'hasFoo'}` 或 `host: {'[style.color]': 'color'}` ）

   1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)

      Map 绑定（例如，`host: {'[class]': 'classExpr'}` 或者 `host: {'[style]': 'styleExpr'}` ）

   1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)    

      静态值（例如，`host: {'class': 'foo'}` 或 `host: {'style': 'color: blue'}` ）

</div>

The more specific a class or style binding is, the higher its precedence.

某个类或样式绑定越具体，它的优先级就越高。

A binding to a specific class (for example, `[class.foo]`) will take precedence over a generic `[class]` binding, and a binding to a specific style (for example, `[style.bar]`) will take precedence over a generic `[style]` binding.

对具体类（例如 `[class.foo]` ）的绑定优先于一般化的 `[class]` 绑定，对具体样式（例如 `[style.bar]` ）的绑定优先于一般化的 `[style]` 绑定。

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

Specificity rules also apply when it comes to bindings that originate from different sources. 
It's possible for an element to have bindings in the template where it's declared, from host bindings on matched directives, and from host bindings on matched components.

当处理不同来源的绑定时，也适用这种基于具体度的规则。
某个元素可能在声明它的模板中有一些绑定、在所匹配的指令中有一些宿主绑定、在所匹配的组件中有一些宿主绑定。

Template bindings are the most specific because they apply to the element directly and exclusively, so they have the highest precedence.

模板中的绑定是最具体的，因为它们直接并且唯一地应用于该元素，所以它们具有最高的优先级。

Directive host bindings are considered less specific because directives can be used in multiple locations, so they have a lower precedence than template bindings.

指令的宿主绑定被认为不太具体，因为指令可以在多个位置使用，所以它们的优先级低于模板绑定。

Directives often augment component behavior, so host bindings from components have the lowest precedence. 

指令经常会增强组件的行为，所以组件的宿主绑定优先级最低。

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

In addition, bindings take precedence over static attributes. 

另外，绑定总是优先于静态属性。

In the following case, `class` and `[class]` have similar specificity, but the `[class]` binding will take precedence because it is dynamic.

在下面的例子中，`class` 和 `[class]` 具有相似的具体度，但 `[class]` 绑定优先，因为它是动态的。

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>

{@a styling-delegation}
### Delegating to styles with lower precedence

### 委托优先级较低的样式

It is possible for higher precedence styles to "delegate" to lower precedence styles using `undefined` values.
Whereas setting a style property to `null` ensures the style is removed, setting it to `undefined` will cause Angular to fall back to the next-highest precedence binding to that style.

更高优先级的样式可以使用 `undefined` 值“委托”给低级的优先级样式。虽然把 style 属性设置为 `null` 可以确保该样式被移除，但把它设置为 `undefined` 会导致 Angular 回退到该样式的次高优先级。

For example, consider the following template: 

例如，考虑以下模板：

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

Imagine that the `dirWithHostBinding` directive and the `comp-with-host-binding` component both have a `[style.width]` host binding.
In that case, if `dirWithHostBinding` sets its binding to `undefined`, the `width` property will fall back to the value of the `comp-with-host-binding` host binding.
However, if `dirWithHostBinding` sets its binding to `null`, the `width` property will be removed entirely.

想象一下，`dirWithHostBinding` 指令和 `comp-with-host-binding` 组件都有 `[style.width]` 宿主绑定。在这种情况下，如果 `dirWithHostBinding` 把它的绑定设置为 `undefined`，则 `width` 属性将回退到 `comp-with-host-binding` 主机绑定的值。但是，如果 `dirWithHostBinding` 把它的绑定设置为 `null`，那么 `width` 属性就会被完全删除。

{@a event-binding}

## Event binding `(event)`

## 事件绑定 `(event)`

Event binding allows you to listen for certain events such as
keystrokes, mouse movements, clicks, and touches. For an example
demonstrating all of the points in this section, see the <live-example name="event-binding">event binding example</live-example>.

事件绑定允许你监听某些事件，比如按键、鼠标移动、点击和触屏。要查看本节中所有要点的演示，请参见<live-example name="event-binding">事件绑定范例</live-example>。

Angular event binding syntax consists of a **target event** name
within parentheses on the left of an equal sign, and a quoted
template statement on the right.
The following event binding listens for the button's click events, calling
the component's `onSave()` method whenever a click occurs:

Angular 的事件绑定语法由等号左侧带圆括号的**目标事件**和右侧引号中的[模板语句](guide/template-syntax#template-statements)组成。
下面事件绑定监听按钮的点击事件。每当点击发生时，都会调用组件的 `onSave()` 方法。

<div class="lightbox">

  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">

</div>

### Target event

### 目标事件

As above, the target is the button's click event.

如前所述，其目标就是此按钮的单击事件。

<code-example path="event-binding/src/app/app.component.html" region="event-binding-1" header="src/app/app.component.html"></code-example>

Alternatively, use the `on-` prefix, known as the canonical form:

有些人更喜欢带 `on-` 前缀的备选形式，称之为**规范形式**：

<code-example path="event-binding/src/app/app.component.html" region="event-binding-2" header="src/app/app.component.html"></code-example>

Element events may be the more common targets, but Angular looks first to see if the name matches an event property
of a known directive, as it does in the following example:

元素事件可能是更常见的目标，但 Angular 会先看这个名字是否能匹配上已知指令的事件属性，就像下面这个例子：

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

If the name fails to match an element event or an output property of a known directive,
Angular reports an “unknown directive” error.

如果这个名字没能匹配到元素事件或已知指令的输出属性，Angular 就会报“未知指令”错误。

### *$event* and event handling statements

### *$event* 和事件处理语句

In an event binding, Angular sets up an event handler for the target event.

在事件绑定中，Angular 会为目标事件设置事件处理器。

When the event is raised, the handler executes the template statement.
The template statement typically involves a receiver, which performs an action
in response to the event, such as storing a value from the HTML control
into a model.

当事件发生时，这个处理器会执行模板语句。
典型的模板语句通常涉及到响应事件执行动作的接收器，例如从 HTML 控件中取得值，并存入模型。

The binding conveys information about the event. This information can include data values such as an event object, string, or number named `$event`.

绑定会通过**名叫 `$event` 的事件对象**传递关于此事件的信息（包括数据值）。

The target event determines the shape of the `$event` object.
If the target event is a native DOM element event, then `$event` is a
[DOM event object](https://developer.mozilla.org/en-US/docs/Web/Events),
with properties such as `target` and `target.value`.

事件对象的形态取决于目标事件。如果目标事件是原生 DOM 元素事件，
`$event` 就是 [DOM 事件对象](https://developer.mozilla.org/en-US/docs/Web/Events)，它有像 `target` 和 `target.value` 这样的属性。

Consider this example:

考虑这个范例：

<code-example path="event-binding/src/app/app.component.html" region="event-binding-3" header="src/app/app.component.html"></code-example>

This code sets the `<input>` `value` property by binding to the `name` property.
To listen for changes to the value, the code binds to the `input`
event of the `<input>` element.
When the user makes changes, the `input` event is raised, and the binding executes
the statement within a context that includes the DOM event object, `$event`.

上面的代码在把输入框的 `value` 属性绑定到 `name` 属性。
要监听对值的修改，代码绑定到输入框的 `input` 事件。
当用户造成更改时，`input` 事件被触发，并在包含了 DOM 事件对象 (`$event`) 的上下文中执行这条语句。

To update the `name` property, the changed text is retrieved by following the path `$event.target.value`.

要更新 `name` 属性，就要通过路径 `$event.target.value` 来获取更改后的值。

If the event belongs to a directive&mdash;recall that components
are directives&mdash;`$event` has whatever shape the directive produces.

如果事件属于指令（回想一下，组件是指令的一种），那么 `$event` 具体是什么由指令决定。

### Custom events with `EventEmitter`

### 使用 `EventEmitter` 实现自定义事件

Directives typically raise custom events with an Angular [EventEmitter](api/core/EventEmitter).
The directive creates an `EventEmitter` and exposes it as a property.
The directive calls `EventEmitter.emit(payload)` to fire an event, passing in a message payload, which can be anything.
Parent directives listen for the event by binding to this property and accessing the payload through the `$event` object.

通常，指令使用 Angular [EventEmitter](api/core/EventEmitter) 来触发自定义事件。
指令创建一个 `EventEmitter` 实例，并且把它作为属性暴露出来。
指令调用 `EventEmitter.emit(payload)` 来触发事件，可以传入任何东西作为消息载荷。
父指令通过绑定到这个属性来监听事件，并通过 `$event` 对象来访问载荷。

Consider an `ItemDetailComponent` that presents item information and responds to user actions.
Although the `ItemDetailComponent` has a delete button, it doesn't know how to delete the hero. It can only raise an event reporting the user's delete request.

假设 `ItemDetailComponent` 用于显示英雄的信息，并响应用户的动作。
虽然 `ItemDetailComponent` 包含删除按钮，但它自己并不知道该如何删除这个英雄。
最好的做法是触发事件来报告“删除用户”的请求。

Here are the pertinent excerpts from that `ItemDetailComponent`:

下面的代码节选自 `ItemDetailComponent`：

<code-example path="event-binding/src/app/item-detail/item-detail.component.html" header="src/app/item-detail/item-detail.component.html (template)" region="line-through"></code-example>

<code-example path="event-binding/src/app/item-detail/item-detail.component.ts" header="src/app/item-detail/item-detail.component.ts (deleteRequest)" region="deleteRequest"></code-example>

The component defines a `deleteRequest` property that returns an `EventEmitter`.
When the user clicks *delete*, the component invokes the `delete()` method,
telling the `EventEmitter` to emit an `Item` object.

组件定义了 `deleteRequest` 属性，它是 `EventEmitter` 实例。
当用户点击*删除*时，组件会调用 `delete()` 方法，让 `EventEmitter` 发出一个 `Item` 对象。

Now imagine a hosting parent component that binds to the `deleteRequest` event
of the `ItemDetailComponent`.

现在，假设有个宿主的父组件，它绑定了 `ItemDetailComponent` 的 `deleteRequest` 事件。

<code-example path="event-binding/src/app/app.component.html" header="src/app/app.component.html (event-binding-to-component)" region="event-binding-to-component"></code-example>

When the `deleteRequest` event fires, Angular calls the parent component's
`deleteItem()` method, passing the *item-to-delete* (emitted by `ItemDetail`)
in the `$event` variable.

当 `deleteRequest` 事件触发时，Angular 调用父组件的 `deleteItem` 方法，
在 `$event` 变量中传入*要删除的英雄*（来自 `ItemDetail`）。

### Template statements have side effects

### 模板语句有副作用

Though [template expressions](guide/template-syntax#template-expressions) shouldn't have [side effects](guide/template-syntax#avoid-side-effects), template
statements usually do. The `deleteItem()` method does have
a side effect: it deletes an item.

虽然[模板表达式](guide/template-syntax#template-expressions)不应该有[副作用](guide/template-syntax#avoid-side-effects)，但是模板语句通常会有。这里的 `deleteItem()` 方法就有一个副作用：它删除了一个条目。

Deleting an item updates the model, and depending on your code, triggers
other changes including queries and saving to a remote server.
These changes propagate through the system and ultimately display in this and other views.

删除这个英雄会更新模型，还可能触发其它修改，包括向远端服务器的查询和保存。
这些变更通过系统进行扩散，并最终显示到当前以及其它视图中。

<hr/>

{@a two-way}

## Two-way binding `[(...)]`

## 双向绑定 `[(...)]`

Two-way binding gives your app a way to share data between a component class and
its template.

双向绑定为你的应用程序提供了一种在组件类及其模板之间共享数据的方式。

For a demonstration of the syntax and code snippets in this section, see the <live-example name="two-way-binding">two-way binding example</live-example>.

有关本节中语法和代码段的演示，请参见 <live-example name="two-way-binding">双向绑定范例</live-example>。

### Basics of two-way binding

### 双向绑定的基础知识

Two-way binding does two things:

双向绑定会做两件事：

1. Sets a specific element property.

   设置特定的元素属性。

1. Listens for an element change event.

   监听元素的变更事件。

Angular offers a special _two-way data binding_ syntax for this purpose, `[()]`.
The `[()]` syntax combines the brackets
of property binding, `[]`, with the parentheses of event binding, `()`.

Angular 为此提供了一种特殊*的双向数据绑定*语法 `[()]`。`[()]` 语法将属性绑定的括号 `[]` 与事件绑定的括号 `()` 组合在一起。

<div class="callout is-important">

<header>[( )] = banana in a box</header>

<header>[( )] = 盒子里的香蕉</header>

Visualize a *banana in a box* to remember that the parentheses go _inside_ the brackets.

想象*盒子里的香蕉*来记住方括号套圆括号。

</div>

The `[()]` syntax is easy to demonstrate when the element has a settable
property called `x` and a corresponding event named `xChange`.
Here's a `SizerComponent` that fits this pattern.
It has a `size` value property and a companion `sizeChange` event:

`[()]` 语法很容易想明白：该元素具有名为 `x` 的可设置属性和名为 `xChange` 的相应事件。
`SizerComponent` 就是用的这种模式。它具有一个名为 `size` 的值属性和一个与之相伴的 `sizeChange` 事件：

<code-example path="two-way-binding/src/app/sizer/sizer.component.ts" header="src/app/sizer.component.ts"></code-example>

<code-example path="two-way-binding/src/app/sizer/sizer.component.html" header="src/app/sizer.component.html"></code-example>

The initial `size` is an input value from a property binding.
Clicking the buttons increases or decreases the `size`, within
min/max value constraints,
and then raises, or emits, the `sizeChange` event with the adjusted size.

`size` 的初始值来自属性绑定的输入值。单击按钮可在最小值/最大值范围内增大或减小 `size`，然后带上调整后的大小发出 `sizeChange` 事件。

Here's an example in which the `AppComponent.fontSizePx` is two-way bound to the `SizerComponent`:

下面的例子中，`AppComponent.fontSize` 被双向绑定到 `SizerComponent`：

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (two-way-1)" region="two-way-1"></code-example>

The `AppComponent.fontSizePx` establishes the initial `SizerComponent.size` value.

`AppComponent.fontSizePx` 建立初始 `SizerComponent.size` 值。

<code-example path="two-way-binding/src/app/app.component.ts" header="src/app/app.component.ts" region="font-size"></code-example>

Clicking the buttons updates the `AppComponent.fontSizePx` via the two-way binding.
The revised `AppComponent.fontSizePx` value flows through to the _style_ binding,
making the displayed text bigger or smaller.

单击按钮就会通过双向绑定更新 `AppComponent.fontSizePx`。修改后的 `AppComponent.fontSizePx` 值将传递到*样式*绑定，从而使显示的文本更大或更小。

The two-way binding syntax is really just syntactic sugar for a _property_ binding and an _event_ binding.
Angular desugars the `SizerComponent` binding into this:

双向绑定语法实际上是*属性*绑定和*事件绑定*的语法糖。
Angular 将 `SizerComponent` 的绑定分解成这样：

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (two-way-2)" region="two-way-2"></code-example>

The `$event` variable contains the payload of the `SizerComponent.sizeChange` event.
Angular assigns the `$event` value to the `AppComponent.fontSizePx` when the user clicks the buttons.

`$event` 变量包含了 `SizerComponent.sizeChange` 事件的荷载。
当用户点击按钮时，Angular 将 `$event` 赋值给 `AppComponent.fontSizePx`。

### Two-way binding in forms

### 表单中的双向绑定

The two-way binding syntax is a great convenience compared to
separate property and event bindings. It would be convenient to
use two-way binding with HTML form elements like `<input>` and
`<select>`. However, no native HTML element follows the `x`
value and `xChange` event pattern.

与单独的属性绑定和事件绑定相比，双向绑定语法非常方便。将双向绑定与 HTML 表单元素（例如 `<input>` 和 `<select>`）一起使用会很方便。但是，没有哪个原生 HTML 元素会遵循 `x` 值和 `xChange` 事件的命名模式。

For more on how to use two-way binding in forms, see
Angular [NgModel](guide/template-syntax#ngModel).

要了解如何在表单中使用双向绑定的更多信息，请参见 Angular [NgModel](guide/template-syntax#ngModel)。

<hr/>

{@a directives}

## Built-in directives

## 内置指令

Angular offers two kinds of built-in directives: attribute
directives and structural directives. This segment reviews some of the most common built-in directives,
classified as either [_attribute_ directives](guide/template-syntax#attribute-directives) or [_structural_ directives](guide/template-syntax#structural-directives) and has its own <live-example name="built-in-directives">built-in directives example</live-example>.

Angular 提供了两种内置指令：属性型指令和结构型指令。本节会回顾一些最常见的内置指令，分为[*属性型*指令](guide/template-syntax#attribute-directives)或[*结构型*指令，](guide/template-syntax#structural-directives)并有相应的<live-example name="built-in-directives">内置指令示例</live-example>。

For more detail, including how to build your own custom directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives).

欲知详情，包括如何构建你自己的自定义指令，请参阅[属性型指令](guide/attribute-directives)和[结构型指令](guide/structural-directives)。

<hr/>

{@a attribute-directives}

### Built-in attribute directives

### 内置属性型指令

Attribute directives listen to and modify the behavior of
other HTML elements, attributes, properties, and components.
You usually apply them to elements as if they were HTML attributes, hence the name.

属性型指令会监听并修改其它 HTML 元素和组件的行为、Attribute 和 Property。
它们通常被应用在元素上，就好像它们是 HTML 属性一样，因此得名属性型指令。

Many NgModules such as the [`RouterModule`](guide/router "Routing and Navigation")
and the [`FormsModule`](guide/forms "Forms") define their own attribute directives.
The most common attribute directives are as follows:

许多 NgModule（例如 [`RouterModule`](guide/router "路由和导航") 和 [`FormsModule`](guide/forms "表单") 都定义了自己的属性型指令。最常见的属性型指令如下：

* [`NgClass`](guide/template-syntax#ngClass)&mdash;adds and removes a set of CSS classes.

  [`NgClass`](guide/template-syntax#ngClass) —— 添加和删除一组 CSS 类。

* [`NgStyle`](guide/template-syntax#ngStyle)&mdash;adds and removes a set of HTML styles.

  [`NgStyle`](guide/template-syntax#ngStyle) —— 添加和删除一组 HTML 样式。

* [`NgModel`](guide/template-syntax#ngModel)&mdash;adds two-way data binding to an HTML form element.

  [`NgModel`](guide/template-syntax#ngModel) —— 将数据双向绑定添加到 HTML 表单元素。

<hr/>

{@a ngClass}

### `NgClass`

Add or remove several CSS classes simultaneously with `ngClass`.

用 `ngClass` 同时添加或删除几个 CSS 类。

<code-example path="built-in-directives/src/app/app.component.html" region="special-div" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

To add or remove a *single* class, use [class binding](guide/template-syntax#class-binding) rather than `NgClass`.

要添加或删除*单个*类，请使用[类绑定](guide/template-syntax#class-binding)而不是 `NgClass`。

</div>

Consider a `setCurrentClasses()` component method that sets a component property,
`currentClasses`, with an object that adds or removes three classes based on the
`true`/`false` state of three other component properties. Each key of the object is a CSS class name; its value is `true` if the class should be added,
`false` if it should be removed.

考虑一个 `setCurrentClasses()` 组件方法，该方法设置一个组件属性 `currentClasses`，该对象具有一个根据其它三个组件属性的 `true` / `false` 状态来添加或删除三个 CSS 类的对象。该对象的每个键(key)都是一个 CSS 类名。如果要添加上该类，则其值为 `true`，反之则为 `false`。

<code-example path="built-in-directives/src/app/app.component.ts" region="setClasses" header="src/app/app.component.ts"></code-example>

Adding an `ngClass` property binding to `currentClasses` sets the element's classes accordingly:

把 `NgClass` 属性绑定到 `currentClasses`，根据它来设置此元素的 CSS 类：

<code-example path="built-in-directives/src/app/app.component.html" region="NgClass-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Remember that in this situation you'd call `setCurrentClasses()`,
both initially and when the dependent properties change.

请记住，在这种情况下，你要在初始化时和它依赖的属性发生变化时调用 `setCurrentClasses()`。

</div>

<hr/>

{@a ngStyle}

### `NgStyle`

Use `NgStyle` to set many inline styles simultaneously and dynamically, based on the state of the component.

使用 `NgStyle` 根据组件的状态同时动态设置多个内联样式。

#### Without `NgStyle`

#### 不用 `NgStyle`

For context, consider setting a *single* style value with [style binding](guide/template-syntax#style-binding), without `NgStyle`.

有些情况下，要考虑使用[样式绑定](guide/template-syntax#style-binding)来设置*单个*样式值，而不使用 `NgStyle`。

<code-example path="built-in-directives/src/app/app.component.html" region="without-ng-style" header="src/app/app.component.html"></code-example>

However, to set *many* inline styles at the same time, use the `NgStyle` directive.

但是，如果要同时设置*多个*内联样式，请使用 `NgStyle` 指令。

The following is a `setCurrentStyles()` method that sets a component
property, `currentStyles`, with an object that defines three styles,
based on the state of three other component properties:

下面的例子是一个 `setCurrentStyles()` 方法，它基于该组件另外三个属性的状态，用一个定义了三个样式的对象设置了 `currentStyles` 属性。

<code-example path="built-in-directives/src/app/app.component.ts" region="setStyles" header="src/app/app.component.ts"></code-example>

Adding an `ngStyle` property binding to `currentStyles` sets the element's styles accordingly:

把 `ngStyle` 属性绑定到 `currentStyles`，来根据它设置此元素的样式：

<code-example path="built-in-directives/src/app/app.component.html" region="NgStyle-2" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Remember to call `setCurrentStyles()`, both initially and when the dependent properties change.

请记住，无论是在初始时还是其依赖的属性发生变化时，都要调用 `setCurrentStyles()`。

</div>

<hr/>

{@a ngModel}

### `[(ngModel)]`: Two-way binding

### `[(ngModel)]` ：双向绑定

The `NgModel` directive allows you to display a data property and
update that property when the user makes changes. Here's an example:

`NgModel` 指令允许你显示数据属性并在用户进行更改时更新该属性。这是一个例子：

<code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel example)" region="NgModel-1"></code-example>

#### Import `FormsModule` to use `ngModel`

#### 导入 `FormsModule` 以使用 `ngModel`

Before using the `ngModel` directive in a two-way data binding,
you must import the `FormsModule` and add it to the NgModule's `imports` list.
Learn more about the `FormsModule` and `ngModel` in [Forms](guide/forms#ngModel).

要想在双向数据绑定中使用 `ngModel` 指令，必须先导入 `FormsModule` 并将其添加到 NgModule 的 `imports` 列表中。要了解关于 `FormsModule` 和 `ngModel` 的更多信息，参见[表单](guide/forms#ngModel)一章。

Remember to import the `FormsModule` to make `[(ngModel)]` available as follows:

记住，要导入 `FormsModule` 才能让 `[(ngModel)]` 可用，如下所示：

<code-example path="built-in-directives/src/app/app.module.ts" header="src/app/app.module.ts (FormsModule import)" region="import-forms-module"></code-example>

You could achieve the same result with separate bindings to
the `<input>` element's  `value` property and `input` event:

通过分别绑定到 `<input>` 元素的 `value` 属性和 `input` 事件，可以达到同样的效果：

<code-example path="built-in-directives/src/app/app.component.html" region="without-NgModel" header="src/app/app.component.html"></code-example>

To streamline the syntax, the `ngModel` directive hides the details behind its own `ngModel` input and `ngModelChange` output properties:

为了简化语法，`ngModel` 指令把技术细节隐藏在其输入属性 `ngModel` 和输出属性 `ngModelChange` 的后面：

<code-example path="built-in-directives/src/app/app.component.html" region="NgModelChange" header="src/app/app.component.html"></code-example>

The `ngModel` data property sets the element's value property and the `ngModelChange` event property
listens for changes to the element's value.

`ngModel` 输入属性会设置该元素的值，并通过 `ngModelChange` 的输出属性来监听元素值的变化。

#### `NgModel` and value accessors

#### `NgModel` 和值访问器

The details are specific to each kind of element and therefore the `NgModel` directive only works for an element
supported by a [ControlValueAccessor](api/forms/ControlValueAccessor)
that adapts an element to this protocol.
Angular provides *value accessors* for all of the basic HTML form elements and the
[Forms](guide/forms) guide shows how to bind to them.

这些技术细节是针对每种具体元素的，因此 `NgModel` 指令仅适用于通过 [ControlValueAccessor](api/forms/ControlValueAccessor) 适配过这种协议的元素。Angular 已经为所有基本的 HTML 表单元素提供了*值访问器*，[表单](guide/forms)一章示范了如何绑定到它们。

You can't apply `[(ngModel)]` to a non-form native element or a
third-party custom component until you write a suitable value accessor. For more information, see
the API documentation on [DefaultValueAccessor](https://angular.io/api/forms/DefaultValueAccessor).

在编写适当的值访问器之前，不能将 `[(ngModel)]` 应用于非表单的原生元素或第三方自定义组件。欲知详情，参见[DefaultValueAccessor](https://angular.io/api/forms/DefaultValueAccessor)上的 API 文档。

You don't need a value accessor for an Angular component that
you write because you can name the value and event properties
to suit Angular's basic [two-way binding syntax](guide/template-syntax#two-way)
and skip `NgModel` altogether.
The `sizer` in the
[Two-way Binding](guide/template-syntax#two-way) section is an example of this technique.

你不一定非用为所编写的 Angular 组件提供值访问器，因为你还可以把值属性和事件属性命名为符合 Angular 的基本[双向绑定语法](guide/template-syntax#two-way)的形式，并完全跳过 `NgModel`。[双向绑定](guide/template-syntax#two-way)部分的 `sizer` 是此技术的一个示例。

Separate `ngModel` bindings are an improvement over binding to the
element's native properties, but you can streamline the binding with a
single declaration using the `[(ngModel)]` syntax:

单独的 `ngModel` 绑定是对绑定到元素的原生属性方式的一种改进，但你可以使用 `[(ngModel)]` 语法来通过单个声明简化绑定：

<code-example path="built-in-directives/src/app/app.component.html" region="NgModel-1" header="src/app/app.component.html"></code-example>

This `[(ngModel)]` syntax can only _set_ a data-bound property.
If you need to do something more, you can write the expanded form;
for example, the following changes the `<input>` value to uppercase:

此 `[(ngModel)]` 语法只能*设置*数据绑定属性。如果你要做得更多，可以编写扩展表单。例如，下面的代码将 `<input>` 值更改为大写：

<code-example path="built-in-directives/src/app/app.component.html" region="uppercase" header="src/app/app.component.html"></code-example>

Here are all variations in action, including the uppercase version:

这里是所有这些变体的动画，包括这个大写转换的版本：

<div class="lightbox">

  <img src='generated/images/guide/built-in-directives/ng-model-anim.gif' alt="NgModel variations">

</div>

<hr/>

{@a structural-directives}

## Built-in _structural_ directives

## 内置*结构型*指令

Structural directives are responsible for HTML layout.
They shape or reshape the DOM's structure, typically by adding, removing, and manipulating
the host elements to which they are attached.

结构型指令的职责是 HTML 布局。
它们塑造或重塑 DOM 的*结构*，这通常是通过添加、移除和操纵它们所附加到的宿主元素来实现的。

This section is an introduction to the common built-in structural directives:

本节会介绍常见的内置结构型指令：

* [`NgIf`](guide/template-syntax#ngIf)&mdash;conditionally creates or destroys subviews from the template.

  [`NgIf`](guide/template-syntax#ngIf) —— 从模板中创建或销毁子视图。

* [`NgFor`](guide/template-syntax#ngFor)&mdash;repeat a node for each item in a list.

  [`NgFor`](guide/template-syntax#ngFor) —— 为列表中的每个条目重复渲染一个节点。

* [`NgSwitch`](guide/template-syntax#ngSwitch)&mdash;a set of directives that switch among alternative views.

  [`NgSwitch`](guide/template-syntax#ngSwitch) —— 一组在备用视图之间切换的指令。

<div class="alert is-helpful">

The deep details of structural directives are covered in the
[Structural Directives](guide/structural-directives) guide,
which explains the following:

[结构型指令](guide/structural-directives)一章涵盖了结构型指令的详细内容，它解释了以下内容：

* Why you
[prefix the directive name with an asterisk (\*)](guide/structural-directives#the-asterisk--prefix).

  为什么[在要指令名称前加上星号（\*）](guide/structural-directives#the-asterisk--prefix)。

* Using [`<ng-container>`](guide/structural-directives#ngcontainer "<ng-container>")
to group elements when there is no suitable host element for the directive.

  当指令没有合适的宿主元素时，使用 [`<ng-container>`](guide/structural-directives#ngcontainer "&lt;ng-container>") 对元素进行分组。

* How to write your own structural directive.

   如何写自己的结构型指令。

* That you can only apply [one structural directive](guide/structural-directives#one-per-element "one per host element") to an element.

   你只能往一个元素上应用[一个结构型指令](guide/structural-directives#one-per-element "one per host element")。

</div>

<hr/>

{@a ngIf}

### NgIf

You can add or remove an element from the DOM by applying an `NgIf` directive to
a host element.
Bind the directive to a condition expression like `isActive` in this example.

你可以通过将 `NgIf` 指令应用在宿主元素上来从 DOM 中添加或删除元素。在此示例中，将指令绑定到了条件表达式，例如 `isActive`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Don't forget the asterisk (`*`) in front of `ngIf`. For more information
on the asterisk, see the [asterisk (*) prefix](guide/structural-directives#the-asterisk--prefix) section of
[Structural Directives](guide/structural-directives).

不要忘了 `ngIf` 前面的星号（`*`）。有关星号的更多信息，请参见 [结构型指令](guide/structural-directives)中的[星号（\*）前缀](guide/structural-directives#the-asterisk--prefix)部分。

</div>

When the `isActive` expression returns a truthy value, `NgIf` adds the
`ItemDetailComponent` to the DOM.
When the expression is falsy, `NgIf` removes the `ItemDetailComponent`
from the DOM, destroying that component and all of its sub-components.

当 `isActive` 表达式返回真值时，`NgIf` 会把 `ItemDetailComponent` 添加到 DOM 中。当表达式为假值时，`NgIf` 将从 DOM 中删除 `ItemDetailComponent`，从而销毁该组件及其所有子组件。

#### Show/hide vs. `NgIf`

#### 显示/隐藏与 `NgIf`

Hiding an element is different from removing it with `NgIf`.
For comparison, the following example shows how to control
the visibility of an element with a
[class](guide/template-syntax#class-binding) or [style](guide/template-syntax#style-binding) binding.

隐藏元素与使用 `NgIf` 删除元素不同。为了进行比较，下面的示例演示如何使用[类](guide/template-syntax#class-binding)或[样式](guide/template-syntax#style-binding)绑定来控制元素的可见性。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-3" header="src/app/app.component.html"></code-example>

When you hide an element, that element and all of its descendants remain in the DOM.
All components for those elements stay in memory and
Angular may continue to check for changes.
You could be holding onto considerable computing resources and degrading performance
unnecessarily.

隐藏元素时，该元素及其所有后代仍保留在 DOM 中。这些元素的所有组件都保留在内存中，Angular 会继续做变更检查。它可能会占用大量计算资源，并且会不必要地降低性能。

`NgIf` works differently. When `NgIf` is `false`, Angular removes the element and its descendants from the DOM.
It destroys their components, freeing up resources, which
results in a better user experience.

`NgIf` 工作方式有所不同。如果 `NgIf` 为 `false`，则 Angular 将从 DOM 中删除该元素及其后代。这销毁了它们的组件，释放了资源，从而带来更好的用户体验。

If you are hiding large component trees, consider `NgIf` as a more
efficient alternative to showing/hiding.

如果要隐藏大型组件树，请考虑使用 `NgIf` 作为显示/隐藏的更有效替代方法。

<div class="alert is-helpful">

For more information on `NgIf` and `ngIfElse`, see the [API documentation about NgIf](api/common/NgIf).

有关 `NgIf` 和 `ngIfElse` 的更多信息，请参阅 [关于 NgIf 的 API 文档](api/common/NgIf)。

</div>

#### Guard against null

#### 防范空指针错误

Another advantage of `ngIf` is that you can use it to guard against null. Show/hide
is best suited for very simple use cases, so when you need a guard, opt instead for `ngIf`. Angular will throw an error if a nested expression tries to access a property of `null`.

`ngIf` 另一个优点是你可以使用它来防范空指针错误。显示/隐藏就是最合适的极简用例，当你需要防范时，请改用 `ngIf` 代替。如果其中嵌套的表达式尝试访问 `null` 的属性，Angular 将引发错误。

The following shows `NgIf` guarding two `<div>`s.
The `currentCustomer` name appears only when there is a `currentCustomer`.
The `nullCustomer` will not be displayed as long as it is `null`.

下面的例子中 `NgIf` 保护着两个 `<div>`。仅当存在 `currentCustomer` 时，才会显示 `currentCustomer` 名称。除非它为 `null` 否则不会显示 `nullCustomer`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

See also the
[safe navigation operator](guide/template-syntax#safe-navigation-operator "Safe navigation operator (?.)") below.

另请参见下面的[安全导航运算符](guide/template-syntax#safe-navigation-operator "安全导航运算符（?.）")。

</div>

<hr/>

{@a ngFor}

### `NgFor`

`NgFor` is a repeater directive&mdash;a way to present a list of items.
You define a block of HTML that defines how a single item should be displayed
and then you tell Angular to use that block as a template for rendering each item in the list.
The text assigned to `*ngFor` is the instruction that guides the repeater process.

`NgFor` 是一个重复器指令 —— 一种用来显示条目列表的方法。你定义了一个 HTML 块，该 HTML 块定义了应如何显示单个条目，然后告诉 Angular 以该块为模板来渲染列表中的每个条目。赋值给 `*ngFor` 的文本是用来指导重复器工作过程的指令。

The following example shows `NgFor` applied to a simple `<div>`. (Don't forget the asterisk (`*`) in front of `ngFor`.)

以下示例显示了如何将 `NgFor` 应用于简单的 `<div>`。（不要忘了 `ngFor` 前面的星号（`*`）。）

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Don't forget the asterisk (`*`) in front of `ngFor`. For more information
on the asterisk, see the [asterisk (*) prefix](guide/structural-directives#the-asterisk--prefix) section of
[Structural Directives](guide/structural-directives).

不要忘了 `ngFor` 前面的星号（`*`）。有关星号的更多信息，请参见[结构型指令](guide/structural-directives)中的[星号（\*）前缀](guide/structural-directives#the-asterisk--prefix)部分。

</div>

You can also apply an `NgFor` to a component element, as in the following example.

你还可以将 `NgFor` 应用于组件元素，如以下示例所示。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>

{@a microsyntax}

<div class="callout is-critical">

<header>*ngFor microsyntax</header>

<header>`*ngFor` 微语法</header>

The string assigned to `*ngFor` is not a [template expression](guide/template-syntax#template-expressions). Rather,
it's a *microsyntax*&mdash;a little language of its own that Angular interprets.
The string `"let item of items"` means:

赋值给 `*ngFor` 的字符串不是[模板表达式](guide/template-syntax#template-expressions)。而是一个*微语法* —— 由 Angular 解释的一种小型语言。字符串 `"let item of items"` 的意思是：

> *Take each item in the `items` array, store it in the local `item` looping variable, and
make it available to the templated HTML for each iteration.*

> *将 `items` 数组中的每个条目存储在局部循环变量 `item` 中，并使其可用于每次迭代的模板 HTML 中。*

Angular translates this instruction into an `<ng-template>` around the host element,
then uses this template repeatedly to create a new set of elements and bindings for each `item`
in the list.
For more information about microsyntax, see the [Structural Directives](guide/structural-directives#microsyntax) guide.

Angular 将该指令转换为包裹着宿主元素的 `<ng-template>`，然后反复使用此模板为列表中的每个 `item` 创建一组新的元素和绑定。有关微语法的更多信息，请参见[结构型指令](guide/structural-directives#microsyntax)一章。

</div>

{@a template-input-variable}

{@a template-input-variables}

#### Template input variables

#### 模板输入变量

The `let` keyword before `item` creates a template input variable called `item`.
The `ngFor` directive iterates over the `items` array returned by the parent component's `items` property
and sets `item` to the current item from the array during each iteration.

`item` 前面的 `let` 关键字创建了一个名为 `item` 的模板输入变量。`ngFor` 指令迭代父组件的 `items` 属性所返回的 `items` 数组，并在每次迭代期间将 `item` 设置为该数组中的当前条目。

Reference `item` within the `ngFor` host element
as well as within its descendants to access the item's properties.
The following example references `item` first in an interpolation
and then passes in a binding to the `item` property of the `<app-item-detail>` component.

`ngFor` 的宿主元素及其后代中可引用 `item`，来访问该条目的属性。以下示例首先在插值中引用 `item`，然后把一个绑定表达式传入 `<app-item-detail>` 组件的 `item` 属性。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

For more information about template input variables, see
[Structural Directives](guide/structural-directives#template-input-variable).

有关模板输入变量的更多信息，请参见[结构型指令](guide/structural-directives#template-input-variable)。

#### `*ngFor` with `index`

#### `*ngFor` 与 `index`

The `index` property of the `NgFor` directive context
returns the zero-based index of the item in each iteration.
You can capture the `index` in a template input variable and use it in the template.

`NgFor` 指令上下文中的 `index` 属性在每次迭代中返回该条目的从零开始的索引。
你可以在模板输入变量中捕获 `index`，并在模板中使用它。

The next example captures the `index` in a variable named `i` and displays it with the item name.

下面的例子在名为 `i` 的变量中捕获 `index`，并将其与条目名称一起显示。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-3" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

`NgFor` is implemented by the `NgForOf` directive. Read more about the other `NgForOf` context values such as `last`, `even`,
and `odd` in the [NgForOf API reference](api/common/NgForOf).

要学习更多的*类似 index* 的值，例如 `last`、`even` 和 `odd`，请参阅 [NgFor API 参考](api/common/NgForOf)。

</div>

{@a trackBy}

#### *ngFor with `trackBy`

#### 带 `trackBy` 的 `*ngFor`

If you use `NgFor` with large lists, a small change to one item, such as removing or adding an item, can trigger a cascade of DOM manipulations. For example, re-querying the server could reset a list with all new item objects, even when those items were previously displayed. In this case, Angular sees only a fresh list of new object references and has no choice but to replace the old DOM elements with all new DOM elements.

如果将 `NgFor` 与大型列表一起使用，则对某个条目的较小更改（例如删除或添加一项）就会触发一系列 DOM 操作。
例如，重新查询服务器可能会重置包含所有新条目对象的列表，即使先前已显示这些条目也是如此。在这种情况下，Angular 只能看到由新的对象引用组成的新列表，它别无选择，只能用所有新的 DOM 元素替换旧的 DOM 元素。

You can make this more efficient with `trackBy`.
Add a method to the component that returns the value `NgFor` should track.
In this case, that value is the hero's `id`. If the `id` has already been rendered,
Angular keeps track of it and doesn't re-query the server for the same `id`.

你可以使用 `trackBy` 来让它更加高效。向该组件添加一个方法，该方法返回 `NgFor` 应该跟踪的值。这个例子中，该值是英雄的 `id`。如果 `id` 已经被渲染，Angular 就会跟踪它，而不会重新向服务器查询相同的 `id`。

<code-example path="built-in-directives/src/app/app.component.ts" region="trackByItems" header="src/app/app.component.ts"></code-example>

In the microsyntax expression, set `trackBy` to the `trackByItems()` method.

在微语法表达式中，将 `trackBy` 设置为 `trackByItems()` 方法。

<code-example path="built-in-directives/src/app/app.component.html" region="trackBy" header="src/app/app.component.html"></code-example>

Here is an illustration of the `trackBy` effect.
"Reset items" creates new items with the same `item.id`s.
"Change ids" creates new items with new `item.id`s.

这就是 `trackBy` 效果的说明。“Reset items” 将创建具有相同 `item.id` 的新条目。“Change ids” 将使用新的 `item.id` 创建新条目。

* With no `trackBy`, both buttons trigger complete DOM element replacement.

   如果没有 `trackBy`，这些按钮都会触发完全的 DOM 元素替换。

* With `trackBy`, only changing the `id` triggers element replacement.

   有了 `trackBy`，则只有修改了 `id` 的按钮才会触发元素替换。

<div class="lightbox">

  <img src="generated/images/guide/built-in-directives/ngfor-trackby.gif" alt="Animation of trackBy">

</div>

<div class="alert is-helpful">

Built-in directives use only public APIs; that is,
they do not have special access to any private APIs that other directives can't access.

内置指令仅仅使用了公共 API。也就是说，它们没有用到任何其它指令无权访问的私有 API。

</div>

<hr/>

{@a ngSwitch}

## The `NgSwitch` directives

## `NgSwitch` 指令

NgSwitch is like the JavaScript `switch` statement.
It displays one element from among several possible elements, based on a switch condition.
Angular puts only the selected element into the DOM.

NgSwitch 类似于 JavaScript `switch` 语句。它根据切换条件显示几个可能的元素中的一个。Angular 只会将选定的元素放入 DOM。

<!-- API Flagged -->

`NgSwitch` is actually a set of three, cooperating directives:
`NgSwitch`, `NgSwitchCase`, and `NgSwitchDefault` as in the following example.

`NgSwitch` 实际上是三个协作指令的集合： `NgSwitch`，`NgSwitchCase` 和 `NgSwitchDefault`，如以下示例所示。

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch" header="src/app/app.component.html"></code-example>

<div class="lightbox">

  <img src="generated/images/guide/built-in-directives/ngswitch.gif" alt="Animation of NgSwitch">

</div>

`NgSwitch` is the controller directive. Bind it to an expression that returns
the *switch value*, such as `feature`. Though the `feature` value in this
example is a string, the switch value can be of any type.

`NgSwitch` 是控制器指令。把它绑定到一个返回*开关值*的表达式，例如 `feature`。尽管此示例中的 `feature` 值是字符串，但开关值可以是任何类型。

**Bind to `[ngSwitch]`**. You'll get an error if you try to set `*ngSwitch` because
`NgSwitch` is an *attribute* directive, not a *structural* directive.
Rather than touching the DOM directly, it changes the behavior of its companion directives.

**绑定到 `[ngSwitch]`**。如果试图写成 `*ngSwitch`，就会出现错误，因为 `NgSwitch` 是*属性型*指令，而不是*结构型*指令。它不会直接接触 DOM，而是会更改与之相伴的指令的行为。

**Bind to `*ngSwitchCase` and `*ngSwitchDefault`**.
The `NgSwitchCase` and `NgSwitchDefault` directives are _structural_ directives
because they add or remove elements from the DOM.

**绑定到 `*ngSwitchCase` 和 `*ngSwitchDefault`**
`NgSwitchCase` 和 `NgSwitchDefault` 指令都是*结构型指令*，因为它们会从 DOM 中添加或移除元素。

* `NgSwitchCase` adds its element to the DOM when its bound value equals the switch value and removes
its bound value when it doesn't equal the switch value.

  当 `NgSwitchCase` 的绑定值等于开关值时，就将其元素添加到 DOM 中；否则从 DOM 中删除。

* `NgSwitchDefault` adds its element to the DOM when there is no selected `NgSwitchCase`.

   `NgSwitchDefault` 会在没有任何一个 `NgSwitchCase` 被选中时把它所在的元素加入 DOM 中。

The switch directives are particularly useful for adding and removing *component elements*.
This example switches among four `item` components defined in the `item-switch.components.ts` file.
Each component has an `item` [input property](guide/template-syntax#inputs-outputs "Input property")
which is bound to the `currentItem` of the parent component.

开关指令对于添加和删除*组件元素*特别有用。本示例在 `item-switch.components.ts` 文件中定义的四个 `item` 组件之间切换。每个组件都有一个名叫 `item` 的[输入属性](guide/template-syntax#inputs-outputs "输入属性")，它会绑定到父组件的 `currentItem`。

Switch directives work as well with native elements and web components too.
For example, you could replace the `<app-best-item>` switch case with the following.

开关指令也同样适用于原生元素和 Web Component。
比如，你可以把 `<app-best-item>` 分支替换为如下代码。

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch-div" header="src/app/app.component.html"></code-example>

<hr/>

{@a template-reference-variable}

{@a template-reference-variables--var-}

{@a ref-vars}

{@a ref-var}

## Template reference variables (`#var`)

## 模板引用变量（ `#var` ）

A **template reference variable** is often a reference to a DOM element within a template.
It can also refer to a directive (which contains a component), an element, [TemplateRef](api/core/TemplateRef), or a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">web component</a>.

**模板引用变量**通常是对模板中 DOM 元素的引用。它还可以引用指令（包含组件）、元素、[TemplateRef](api/core/TemplateRef) 或 [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components "MDN：Web Component")。

For a demonstration of the syntax and code snippets in this section, see the <live-example name="template-reference-variables">template reference variables example</live-example>.

有关本节中语法和代码段的演示，请参见<live-example name="template-reference-variables">模板参考变量示例</live-example>。

Use the hash symbol (#) to declare a reference variable.
The following reference variable, `#phone`, declares a `phone` variable on an `<input>` element.

使用井号（#）声明模板引用变量。以下模板引用变量 `#phone` 会在 `<input>` 元素上声明了一个 `phone` 变量。

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

You can refer to a template reference variable anywhere in the component's template.
Here, a `<button>` further down the template refers to the `phone` variable.

你可以在组件模板中的任何位置引用模板引用变量。这个例子中，模板下方的 `<button>` 就引用了 `phone` 变量。

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-phone" header="src/app/app.component.html"></code-example>

<h3 class="no-toc">How a reference variable gets its value</h3>

<h3 class="no-toc">模板引用变量怎么得到它的值？</h3>

In most cases, Angular sets the reference variable's value to the element on which it is declared.
In the previous example, `phone` refers to the phone number `<input>`.
The button's click handler passes the `<input>` value to the component's `callPhone()` method.

在大多数情况下，Angular 会将模板引用变量的值设置为声明该变量的元素。在上一个示例中，`phone` 指的是电话号码的 `<input>`。按钮的单击处理程序将把这个 `<input>` 的值传给组件的 `callPhone()` 方法。

The `NgForm` directive can change that behavior and set the value to something else. In the following example, the template reference variable, `itemForm`, appears three times separated
by HTML.

`NgForm` 指令可以更改该行为并将该值设置为其它值。在以下示例中，模板引用变量 `itemForm` 出现了 3 次，由 HTML 分隔。

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

The reference value of itemForm, without the ngForm attribute value, would be
the [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement).
There is, however, a difference between a Component and a Directive in that a `Component`
will be referenced without specifying the attribute value, and a `Directive` will not
change the implicit reference (that is, the element).

当 itemForm 的引用没有 `"ngForm"` 值时，它将是 [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)。不过，组件和指令之间的区别在于，在不指定属性值的情况下组件将引用自身（隐式引用），而指令不会更改隐式引用（仍为所在元素）。

However, with `NgForm`, `itemForm` is a reference to the [NgForm](api/forms/NgForm "API: NgForm")
directive with the ability to track the value and validity of every control in the form.

但是，带有 `NgForm` 时，`itemForm` 就是对 [NgForm](api/forms/NgForm "API：NgForm") 指令的引用，它能够跟踪表单中每个控件的值和有效性。

The native `<form>` element doesn't have a `form` property, but the `NgForm` directive does, which allows disabling the submit button
if the `itemForm.form.valid` is invalid and passing the entire form control tree
to the parent component's `onSubmit()` method.

原生 `<form>` 元素没有 `form` 属性，但 `NgForm` 指令有，这样就能在 `itemForm.form.valid` 无效的情况下禁用提交按钮，并将整个表单控制树传给父组件的 `onSubmit()` 方法。。

<h3 class="no-toc">Template reference variable considerations</h3>

<h3 class="no-toc">对模板引用变量的思考</h3>

A template _reference_ variable (`#phone`) is not the same as a template _input_ variable (`let phone`) such as in an [`*ngFor`](guide/template-syntax#template-input-variable).
See [_Structural Directives_](guide/structural-directives#template-input-variable) for more information.

模板*引用*变量（`#phone`）与模板*输入*变量（`let phone`）不同，例如 [`*ngFor`](guide/template-syntax#template-input-variable) 中。欲知详情，请参见[*结构型指令*](guide/structural-directives#template-input-variable)。

The scope of a reference variable is the entire template. So, don't define the same variable name more than once in the same template as the runtime value will be unpredictable.

模板引用变量的范围是整个模板。因此，不要在同一模板中多次定义相同的变量名，因为它在运行时的值将不可预测。

#### Alternative syntax

#### 替代语法

You can use the `ref-` prefix alternative to `#`.
This example declares the `fax` variable as `ref-fax` instead of `#fax`.

你也可以用 `ref-` 前缀代替 `#`。
下面的例子中就用把 `fax` 变量声明成了 `ref-fax` 而不是 `#fax`。

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-fax" header="src/app/app.component.html"></code-example>

<hr/>

{@a inputs-outputs}

## `@Input()` and `@Output()` properties

## 输入和输出属性

`@Input()` and `@Output()` allow Angular to share data between the parent context
and child directives or components. An `@Input()` property is writable
while an `@Output()` property is observable.

`@Input()` 和 `@Output()` 允许 Angular 在其父上下文和子指令或组件之间共享数据。`@Input()` 属性是可写的，而 `@Output()` 属性是可观察对象。

Consider this example of a child/parent relationship:

考虑以下父子关系示例：

```html

<parent-component>
  <child-component></child-component>
</parent-component>

```

Here, the `<child-component>` selector, or child directive, is embedded
within a `<parent-component>`, which serves as the child's context.

在这里，`<child-component>` 选择器或子指令嵌入在 `<parent-component>` 中，用作子级上下文。

`@Input()` and `@Output()` act as
the API, or application programming interface, of the child
component in that they allow the child to
communicate with the parent. Think of `@Input()` and `@Output()` like ports
or doorways&mdash;`@Input()` is the doorway into the component allowing data
to flow in while `@Output()` is the doorway out of the component, allowing the
child component to send data out.

`@Input()` 和 `@Output()` 充当子组件的 API 或应用编程接口，因为它们允许子组件与父组件进行通信。可以把 `@Input()` 和 `@Output()` 看做港口或门，`@Input()` 是进入组件的门，允许数据流入，而 `@Output()` 是离开组件的门，允许子组件向外发出数据。

This section about `@Input()` and `@Output()` has its own <live-example name="inputs-outputs"></live-example>. The following subsections highlight
key points in the sample app.

关于 `@Input()` 和 `@Output()` 这一部分有其自己的<live-example name="inputs-outputs"></live-example>。以下小节将重点介绍示例应用程序中的关键点。

<div class="alert is-helpful">

#### `@Input()` and `@Output()` are independent

#### `@Input()` 和 `@Output()` 是独立的

Though `@Input()` and `@Output()` often appear together in apps, you can use
them separately. If the nested
component is such that it only needs to send data to its parent, you wouldn't
need an `@Input()`, only an `@Output()`. The reverse is also true in that if the
child only needs to receive data from the parent, you'd only need `@Input()`.

尽管 `@Input()` 和 `@Output()` 通常在应用程序中同时出现，但是你可以单独使用它们。如果嵌套组件只需要向其父级发送数据，则不需要 `@Input()`，而只需 `@Output()`。反之亦然，如果子级只需要从父级接收数据，则只需要 `@Input()`。

</div>

{@a input}

## How to use `@Input()`

## 如何使用 `@Input()`

Use the `@Input()` decorator in a child component or directive to let Angular know
that a property in that component can receive its value from its parent component.
It helps to remember that the data flow is from the perspective of the
child component. So an `@Input()` allows data to be input _into_ the
child component from the parent component.

在子组件或指令中使用 `@Input()` 装饰器，可以让 Angular 知道该组件中的属性可以从其父组件中接收值。这很好记，因为这种数据流是从子组件的角度来看就是输入。因此，`@Input()` 允许将数据从父组件输入*到*子组件中。

<div class="lightbox">

  <img src="generated/images/guide/inputs-outputs/input.svg" alt="Input data flow diagram">

</div>

To illustrate the use of `@Input()`, edit these parts of your app:

为了说明 `@Input()` 的用法，请编辑应用程序的以下部分：

* The child component class and template

  子组件类及其模板

* The parent component class and template

  父组件类及其模板

### In the child

### 在子组件中

To use the `@Input()` decorator in a child component class, first import
`Input` and then decorate the property with `@Input()`:

要在子组件类中使用 `@Input()` 装饰器，请首先导入 `Input`，然后使用 `@Input()` 来装饰一个属性：

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.ts" region="use-input" header="src/app/item-detail/item-detail.component.ts"></code-example>

In this case, `@Input()` decorates the property <code class="no-auto-link">item</code>, which has
a type of `string`, however, `@Input()` properties can have any type, such as
`number`, `string`, `boolean`, or `object`. The value for `item` will come from the parent component, which the next section covers.

在这个例子中，`@Input()` 装饰具有 `string` 类型的属性 `item`，但是，`@Input()` 属性可以具有任何类型，例如 `number`，`string`，`boolean` 或 `object`。`item` 的值会来自下一部分要介绍的父组件。

Next, in the child component template, add the following:

接下来，在子组件模板中，添加以下内容：

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.html" region="property-in-template" header="src/app/item-detail/item-detail.component.html"></code-example>

### In the parent

### 在父组件中

The next step is to bind the property in the parent component's template.
In this example, the parent component template is `app.component.html`.

下一步是在父组件的模板中绑定该属性。在此示例中，父组件模板是 `app.component.html`。

First, use the child's selector, here `<app-item-detail>`, as a directive within the
parent component template. Then, use [property binding](guide/template-syntax#property-binding)
to bind the property in the child to the property of the parent.

首先，使用子组件的选择器（这里是 `<app-item-detail>` ）作为父组件模板中的指令。然后，使用[属性绑定](guide/template-syntax#property-binding)将子组件中的属性绑定到父组件中的属性。

<code-example path="inputs-outputs/src/app/app.component.html" region="input-parent" header="src/app/app.component.html"></code-example>

Next, in the parent component class, `app.component.ts`, designate a value for `currentItem`:

接下来，在父组件类 `app.component.ts` 中，为 `currentItem` 指定一个值：

<code-example path="inputs-outputs/src/app/app.component.ts" region="parent-property" header="src/app/app.component.ts"></code-example>

With `@Input()`, Angular passes the value for `currentItem` to the child so that `item` renders as `Television`.

借助 `@Input()`，Angular 将 `currentItem` 的值传给子级，以便该 `item` 渲染为 `Television`。

The following diagram shows this structure:

下图显示了这种结构：

<div class="lightbox">

  <img src="generated/images/guide/inputs-outputs/input-diagram-target-source.svg" alt="Property binding diagram">

</div>

The target in the square brackets, `[]`, is the property you decorate
with `@Input()` in the child component. The binding source, the part
to the right of the equal sign, is the data that the parent
component passes to the nested component.

方括号 `[]` 中的目标是子组件中带有 `@Input()` 装饰器的属性。绑定源（等号右边的部分）是父组件要传给内嵌组件的数据。

The key takeaway is that when binding to a child component's property in a parent component&mdash;that is, what's
in square brackets&mdash;you must
decorate the property with `@Input()` in the child component.

关键是，当要在父组件中绑定到子组件中的属性（即方括号中的内容）时，必须在子组件中使用 `@Input()` 来装饰该属性。

<div class="alert is-helpful">

#### `OnChanges` and `@Input()`

#### `OnChanges` 和 `@Input()`

To watch for changes on an `@Input()` property, use
`OnChanges`, one of Angular's [lifecycle hooks](guide/lifecycle-hooks#onchanges).
`OnChanges` is specifically designed to work with properties that have the
`@Input()` decorator. See the [`OnChanges`](guide/lifecycle-hooks#onchanges) section of the [Lifecycle Hooks](guide/lifecycle-hooks) guide for more details and examples.

要监视 `@Input()` 属性的更改，请使用 Angular 的[生命周期钩子](guide/lifecycle-hooks#onchanges)之一 `OnChanges`。`OnChanges` 是专门设计用于具有 `@Input()` 装饰器的属性的。欲知详情，请参见[生命周期钩子](guide/lifecycle-hooks)指南的[`OnChanges`](guide/lifecycle-hooks#onchanges)部分。

</div>

{@a output}

## How to use `@Output()`

## 如何使用 `@Output()`

Use the `@Output()` decorator in the child component or directive to allow data to flow from
the child _out_ to the parent.

在子组件或指令中使用 `@Output()` 装饰器，允许数据从子级*流出*到父级。

An `@Output()` property should normally be initialized to an Angular [`EventEmitter`](api/core/EventEmitter) with values flowing out of the component as [events](#event-binding).

通常应将 `@Output()` 属性初始化为 Angular [`EventEmitter`](api/core/EventEmitter)，并将值作为[事件](#event-binding)从组件中向外流出。

<div class="lightbox">

  <img src="generated/images/guide/inputs-outputs/output.svg" alt="Output diagram">

</div>

Just like with `@Input()`, you can use `@Output()`
on a property of the child component but its type should be
`EventEmitter`.

就像 `@Input()` 一样，你也要在子组件的属性上使用 `@Output()`，但其类型为 `EventEmitter`。

`@Output()` marks a property in a child component as a doorway
through which data can travel from the child to the parent.
The child component then has to raise an event so the
parent knows something has changed. To raise an event,
`@Output()` works hand in hand with `EventEmitter`,
which is a class in `@angular/core` that you
use to emit custom events.

`@Output()` 将子组件中的属性标记为一扇门，数据可以通过这扇门从子组件传到父组件。
然后，子组件必须引发一个事件，以便父组件知道发生了某些变化。为了引发事件，`@Output()` 要和 `EventEmitter` 配合使用，`EventEmitter` 是 `@angular/core` 中的一个类，用于发出自定义事件。

When you use `@Output()`, edit these parts of your app:

要使用 `@Output()`，请编辑应用程序的以下部分：

* The child component class and template

  子组件类及其模板

* The parent component class and template

  父组件类及其模板

The following example shows how to set up an `@Output()` in a child
component that pushes data you enter in an HTML `<input>` to an array in the
parent component.

下面的示例演示了如何在子组件中设置 `@Output()`，以将你在 HTML 的 `<input>` 中输入数据，并将其追加到父组件中的数组里。

<div class="alert is-helpful">

The HTML element `<input>` and the Angular decorator `@Input()`
are different. This documentation is about component communication in Angular as it pertains to `@Input()` and `@Output()`. For more information on the HTML element `<input>`, see the [W3C Recommendation](https://www.w3.org/TR/html5/sec-forms.html#the-input-element).

HTML 元素 `<input>` 和 Angular 装饰器 `@Input()` 是不同的。本文档是讲 Angular 中的组件通信的，因此讲的是 `@Input()` 和 `@Output()`。关于 HTML 元素 `<input>` 的更多信息，请参见 [W3C Recommendation](https://www.w3.org/TR/html5/sec-forms.html#the-input-element)。

</div>

### In the child

### 在子组件中

This example features an `<input>` where a user can enter a value and click a `<button>` that raises an event. The `EventEmitter` then relays the data to the parent component.

此示例有一个 `<input>`，用户可以在其中输入一个值并单击引发事件的 `<button>`。然后，通过 `EventEmitter` 将数据转给父组件。

First, be sure to import `Output` and `EventEmitter`
in the child component class:

首先，请确保在子组件类中导入 `Output` 和 `EventEmitter` ：

```js

import { Output, EventEmitter } from '@angular/core';

```

Next, still in the child, decorate a property with `@Output()` in the component class.
The following example `@Output()` is called `newItemEvent` and its type is
`EventEmitter`, which means it's an event.

接下来，仍然在子组件中，使用组件类中的 `@Output()` 装饰属性。下面例子中的 `@Output()` 名叫 `newItemEvent`，其类型是 `EventEmitter`，这表示它是一个事件。

<code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output" header="src/app/item-output/item-output.component.ts"></code-example>

The different parts of the above declaration are as follows:

上述声明的不同之处如下：

* `@Output()`&mdash;a decorator function marking the property as a way for data to go from the child to the parent

  `@Output()` —— 一个装饰器函数，它将该属性标记为把数据从子级传递到父级的一种方式

* `newItemEvent`&mdash;the name of the `@Output()`

  `newItemEvent` — `@Output()` 的名字

* `EventEmitter<string>`&mdash;the `@Output()`'s type

  `EventEmitter<string>` — `@Output()` 的类型

* `new EventEmitter<string>()`&mdash;tells Angular to create a new event emitter and that the data it emits is of type string. The type could be any type, such as `number`, `boolean`, and so on. For more information on `EventEmitter`, see the [EventEmitter API documentation](api/core/EventEmitter).

  `new EventEmitter<string>()` 告诉 Angular 创建一个新的事件发射器，并且它发射的数据为 `string` 类型。该类型也可以是任何类型，例如 `number`，`boolean` 等。有关 `EventEmitter` 的更多信息，请参阅 [EventEmitter API 文档](api/core/EventEmitter)。

Next, create an `addNewItem()` method in the same component class:

接下来，在同一个组件类中创建一个 `addNewItem()` 方法：

<code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output-class" header="src/app/item-output/item-output.component.ts"></code-example>

The `addNewItem()` function uses the `@Output()`, `newItemEvent`,
to raise an event in which it emits the value the user
types into the `<input>`. In other words, when
the user clicks the add button in the UI, the child lets the parent know
about the event and gives that data to the parent.

`addNewItem()` 函数使用 `@Output()` `newItemEvent` 引发一个事件，在该事件中它将发出用户键入到 `<input>` 中的内容。换句话说，当用户单击 UI 中的 “Add” 按钮时，子组件会让父组件知道该事件，并将该数据传给父组件。

#### In the child's template

#### 在子组件的模板中

The child's template has two controls. The first is an HTML `<input>` with a
[template reference variable](guide/template-syntax#ref-var) , `#newItem`,
where the user types in an item name. Whatever the user types
into the `<input>` gets stored in the `#newItem` variable.

子组件的模板中有两个控件。第一个是带有[模板引用变量](guide/template-syntax#ref-var) `#newItem` 的 HTML `<input>`，用户可在其中键入条目名称。用户键入到 `<input>` 中的内容都存储在 `#newItem` 变量中。

<code-example path="inputs-outputs/src/app/item-output/item-output.component.html" region="child-output" header="src/app/item-output/item-output.component.html"></code-example>

The second element is a `<button>`
with an [event binding](guide/template-syntax#event-binding). You know it's
an event binding because the part to the left of the equal
sign is in parentheses, `(click)`.

第二个元素是带有[事件绑定](guide/template-syntax#event-binding)的 `<button>`。之所以知道这是事件绑定，是因为等号的左侧部分在圆括号中 `(click)`。

The `(click)` event is bound to the `addNewItem()` method in the child component class which
takes as its argument whatever the value of `#newItem` is.

`(click)` 事件绑定到子组件类中的 `addNewItem()` 方法，无论 `#newItem` 的值如何，该子组件类均将其作为参数。

Now the child component has an `@Output()`
for sending data to the parent and a method for raising an event.
The next step is in the parent.

现在，子组件已经有了用于将数据发送到父组件的 `@Output()` 和引发事件的方法。下一步是在父组件中。

### In the parent

### 在父组件中

In this example, the parent component is `AppComponent`, but you could use
any component in which you could nest the child.

在此示例中，父组件是 `AppComponent`，但是你可以使用任何能嵌套子组件的组件。

The `AppComponent` in this example features a list of `items`
in an array and a method for adding more items to the array.

此示例中的 `AppComponent` 具有数组型的 `items` 列表以及将更多条目添加到数组中的方法。

<code-example path="inputs-outputs/src/app/app.component.ts" region="add-new-item" header="src/app/app.component.ts"></code-example>

The `addItem()` method takes an argument in the form of a string
and then pushes, or adds, that string to the `items` array.

`addItem()` 方法接收字符串形式的参数，然后将该字符串添加到 `items` 数组中。

#### In the parent's template

#### 在父组件的模板中

Next, in the parent's template, bind the parent's
method to the child's event. Put the child selector, here `<app-item-output>`,
within the parent component's
template, `app.component.html`.

接下来，在父组件的模板中，将父组件的方法绑定到子组件的事件。将子组件选择器（这里是 `<app-item-output>`）放在父组件的模板 `app.component.html` 中。

<code-example path="inputs-outputs/src/app/app.component.html" region="output-parent" header="src/app/app.component.html"></code-example>

The event binding, `(newItemEvent)='addItem($event)'`, tells
Angular to connect the event in the child, `newItemEvent`, to
the method in the parent, `addItem()`, and that the event that the child
is notifying the parent about is to be the argument of `addItem()`.
In other words, this is where the actual hand off of data takes place.
The `$event` contains the data that the user types into the `<input>`
in the child template UI.

事件绑定 `(newItemEvent)='addItem($event)'` 告诉 Angular 将子组件的 `newItemEvent` 事件连接到父组件中的方法 `addItem()`，以及将子组件通知父组件的事件作为 `addItem()` 的参数。换句话说，这是实际传递数据的地方。`$event` 包含用户在子模板 UI 中键入到 `<input>` 中的数据。

Now, in order to see the `@Output()` working, add the following to the parent's template:

现在，为了查看 `@Output()` 工作情况，请将以下内容添加到父组件的模板中：

```html
  <ul>

    <li *ngFor="let item of items">

        {{item}}

    </li>

  </ul>

  ```

The `*ngFor` iterates over the items in the `items` array. When you enter a value in the child's `<input>` and click the button, the child emits the event and the parent's `addItem()` method pushes the value to the `items` array and it renders in the list.

`*ngFor` 会遍历 `items` 数组中的条目。当你在子组件的 `<input>` 中输入值并单击按钮时，子组件将发出事件，父组件的 `addItem()` 方法将值推送到 `items` 数组，并将其渲染在列表中。

## `@Input()` and `@Output()` together

## `@Input()` 和 `@Output()` 在一起

You can use `@Input()` and `@Output()` on the same child component as in the following:

你可以在和下面代码相同的子组件上使用 `@Input()` 和 `@Output()` ：

<code-example path="inputs-outputs/src/app/app.component.html" region="together" header="src/app/app.component.html"></code-example>

The target, `item`, which is an `@Input()` property in the child component class, receives its value from the parent's property, `currentItem`. When you click delete, the child component raises an event, `deleteRequest`, which is the argument for the parent's `crossOffItem()` method.

目标 `item` 是子组件类中的 `@Input()` 属性，它从父组件的属性 `currentItem` 中接收值。当你单击删除时，子组件将引发事件 `deleteRequest`，它携带的值将作为父组件的 `crossOffItem()` 方法的参数。

The following diagram is of an `@Input()` and an `@Output()` on the same
child component and shows the different parts of each:

下图是同一子组件上的 `@Input()` 和 `@Output()`，并显示了每个子组件的不同部分：

<div class="lightbox">

  <img src="generated/images/guide/inputs-outputs/input-output-diagram.svg" alt="Input/Output diagram">

</div>

As the diagram shows, use inputs and outputs together in the same manner as using them separately. Here, the child selector is `<app-input-output>` with `item` and `deleteRequest` being `@Input()` and `@Output()`
properties in the child component class. The property `currentItem` and the method `crossOffItem()` are both in the parent component class.

如图所示，像分别使用它们那样同时使用输入和输出。在这里，子选择器是 `<app-input-output>`，其中 `item` 和 `deleteRequest` 是子组件类中的 `@Input()` 和 `@Output()` 属性。属性 `currentItem` 和方法 `crossOffItem()` 都位于父组件类中。

To combine property and event bindings using the banana-in-a-box
syntax, `[()]`, see [Two-way Binding](guide/template-syntax#two-way).

要使用“盒子里的香蕉”语法 `[()]` 组合属性和事件绑定，请参见[双向绑定](guide/template-syntax#two-way)。

For more detail on how these work, see the previous sections on [Input](guide/template-syntax#input) and [Output](guide/template-syntax#output). To see it in action, see the <live-example name="inputs-outputs">Inputs and Outputs Example</live-example>.

关于这些工作原理的更多详细信息，请参见前面有关 [Input](guide/template-syntax#input) 和 [Output 的部分](guide/template-syntax#output)。要查看实际效果，参见<live-example name="inputs-outputs">输入和输出范例</live-example>。

## `@Input()` and `@Output()` declarations

## `@Input()` 和 `@Output()` 声明

Instead of using the `@Input()` and `@Output()` decorators
to declare inputs and outputs, you can identify
members in the `inputs` and `outputs` arrays
of the directive metadata, as in this example:

你还可以在指令元数据的 `inputs` 和 `outputs` 数组中标出这些成员，而不是使用 `@Input()` 和 `@Output()` 装饰器来声明输入和输出，如本例所示：

<code-example path="inputs-outputs/src/app/in-the-metadata/in-the-metadata.component.ts" region="metadata" header="src/app/in-the-metadata/in-the-metadata.component.ts"></code-example>

While declaring `inputs` and `outputs` in the `@Directive` and `@Component`
metadata is possible, it is a better practice to use the `@Input()` and `@Output()`
class decorators instead, as follows:

固然可以在 `@Directive` 和 `@Component` 元数据中声明 `inputs` 和 `outputs`，但最好使用 `@Input()` 和 `@Output()` 类修饰符，如下所示：

<code-example path="inputs-outputs/src/app/input-output/input-output.component.ts" region="input-output" header="src/app/input-output/input-output.component.ts"></code-example>

See the [Decorate input and output properties](guide/styleguide#decorate-input-and-output-properties) section of the
[Style Guide](guide/styleguide) for details.

欲知详情，请参见[风格指南](guide/styleguide)的[给输入和输出属性加装饰器](guide/styleguide#decorate-input-and-output-properties)部分。

<div class="alert is-helpful">

If you get a template parse error when trying to use inputs or outputs, but you know that the
properties do indeed exist, double check
that your properties are annotated with `@Input()` / `@Output()` or that you've declared
them in an `inputs`/`outputs` array:

如果在尝试使用输入或输出时收到了模板解析错误，但是你知道该属性一定存在，请仔细检查你的属性是否使用 `@Input()` / `@Output()` 进行了注解，或者是否已在 `inputs` / `outputs` 数组中声明了它们：

<code-example language="bash">
Uncaught Error: Template parse errors:
Can't bind to 'item' since it isn't a known property of 'app-item-detail'
</code-example>

</div>

{@a aliasing-io}

## Aliasing inputs and outputs

## 为输入和输出指定别名

Sometimes the public name of an input/output property should be different from the internal name. While it is a best practice to avoid this situation, Angular does
offer a solution.

有时，输入/输出属性的公共名称应与内部名称不同。虽然最好的方法是避免这种情况，但 Angular 确实提供了一种解决方案。

### Aliasing in the metadata

### 元数据中的别名

Alias inputs and outputs in the metadata using a colon-delimited (`:`) string with
the directive property name on the left and the public alias on the right:

要在元数据中为输入和输出指定别名，请使用冒号分隔（`:`）的字符串，其左边是属性名，右边是别名：

<code-example path="inputs-outputs/src/app/aliasing/aliasing.component.ts" region="alias" header="src/app/aliasing/aliasing.component.ts"></code-example>

### Aliasing with the `@Input()`/`@Output()` decorator

### 使用 `@Input()` / `@Output()` 装饰器指定别名

You can specify the alias for the property name by passing the alias name to the `@Input()`/`@Output()` decorator. The internal name remains as usual.

你可以通过将别名传给 `@Input()` / `@Output()` 装饰器来为属性名指定别名。其内部名称保持不变。

<code-example path="inputs-outputs/src/app/aliasing/aliasing.component.ts" region="alias-input-output" header="src/app/aliasing/aliasing.component.ts"></code-example>

<hr/>

{@a expression-operators}

## Template expression operators

## 模板表达式中的运算符

The Angular template expression language employs a subset of JavaScript syntax supplemented with a few special operators
for specific scenarios. The next sections cover three of these operators:

Angular 模板表达式的语言是 JavaScript 语法的子集，并为特定情况添加了一些特殊的运算符。接下来将介绍其中的三个运算符：

* [pipe](guide/template-syntax#pipe)

  [管道](guide/template-syntax#pipe)

* [safe navigation operator](guide/template-syntax#safe-navigation-operator)

  [安全导航运算符](guide/template-syntax#safe-navigation-operator)

* [non-null assertion operator](guide/template-syntax#non-null-assertion-operator)

  [非空断言运算符](guide/template-syntax#non-null-assertion-operator)

{@a pipe}

### The pipe operator (`|`)

### 管道运算符（ `|` ）

The result of an expression might require some transformation before you're ready to use it in a binding.
For example, you might display a number as a currency, change text to uppercase, or filter a list and sort it.

在准备将其用于绑定之前，表达式的结果可能需要进行一些转换。例如，你可以将数字显示为货币，将文本更改为大写，或过滤列表并对其进行排序。

Pipes are simple functions that accept an input value and return a transformed value.
They're easy to apply within template expressions, using the pipe operator (`|`):

管道是简单的函数，它们接受输入值并返回转换后的值。使用管道运算符（`|`），很容易在模板表达式中使用它们：

<code-example path="template-expression-operators/src/app/app.component.html" region="uppercase-pipe" header="src/app/app.component.html"></code-example>

The pipe operator passes the result of an expression on the left to a pipe function on the right.

管道运算符会把它左侧的表达式结果传给它右侧的管道函数。

You can chain expressions through multiple pipes:

还可以通过多个管道串联表达式：

<code-example path="template-expression-operators/src/app/app.component.html" region="pipe-chain" header="src/app/app.component.html"></code-example>

And you can also [apply parameters](guide/pipes#parameterizing-a-pipe) to a pipe:

你还可以对管道[使用参数](guide/pipes#parameterizing-a-pipe)：

<code-example path="template-expression-operators/src/app/app.component.html" region="date-pipe" header="src/app/app.component.html"></code-example>

The `json` pipe is particularly helpful for debugging bindings:

`json` 管道对调试绑定特别有用：

<code-example path="template-expression-operators/src/app/app.component.html" region="json-pipe" header="src/app/app.component.html"></code-example>

The generated output would look something like this:

生成的输出如下所示：

<code-example language="json">
  { "name": "Telephone",
    "manufactureDate": "1980-02-25T05:00:00.000Z",
    "price": 98 }
</code-example>

<div class="alert is-helpful">

The pipe operator has a higher precedence than the ternary operator (`?:`),
which means `a ? b : c | x` is parsed as `a ? b : (c | x)`.
Nevertheless, for a number of reasons,
the pipe operator cannot be used without parentheses in the first and second operands of `?:`.
A good practice is to use parentheses in the third operand too.

管道运算符的优先级比三元运算符（ `?:` ）高，这意味着 `a ? b : c | x` 将被解析为 `a ? b : (c | x)`。但是，由于多种原因，如果在 `?:` 的第一和第二操作数中没有括号，则不能使用管道运算符。一个较好的做法是在第三个操作数中也使用括号。

</div>

<hr/>

{@a safe-navigation-operator}

### The safe navigation operator ( `?` ) and null property paths

### 安全导航运算符（ `?` ）和空属性路径

The Angular safe navigation operator, `?`, guards against `null` and `undefined`
values in property paths. Here, it protects against a view render failure if `item` is `null`.

Angular 安全导航运算符 `?` 可以对在属性路径中出现 `null` 和 `undefined` 值进行保护。在这里，如果 `item` 为 `null`，它可以防止视图渲染失败。

<code-example path="template-expression-operators/src/app/app.component.html" region="safe" header="src/app/app.component.html"></code-example>

If `item` is `null`, the view still renders but the displayed value is blank; you see only "The item name is:" with nothing after it.

如果 `item` 为 `null`，则视图仍然渲染，但显示的值为空白；你只会看到 “The item name is:”，后面没有任何内容。

Consider the next example, with a `nullItem`.

考虑接下来这个带有 `nullItem` 的例子。

<code-example language="html">
  The null item name is {{nullItem.name}}
</code-example>

Since there is no safe navigation operator and `nullItem` is `null`, JavaScript and Angular would throw a `null` reference error and break the rendering process of Angular:

由于没有安全导航运算符，并且 `nullItem` 为 `null`，因此 JavaScript 和 Angular 会引发空指针错误并中断 Angular 的渲染过程：

<code-example language="bash">
  TypeError: Cannot read property 'name' of null.
</code-example>

Sometimes however, `null` values in the property
path may be OK under certain circumstances,
especially when the value starts out null but the data arrives eventually.

但是，有时在某些情况下，属性路径中的 `null` 值可能是可接受的，尤其是当该值开始时为空但数据最终会到达时。

With the safe navigation operator, `?`, Angular stops evaluating the expression when it hits the first `null` value and renders the view without errors.

使用安全导航运算符 `?`，当 Angular 表达式遇到第一个空值时，它将停止对表达式的求值，并渲染出无错误的视图。

It works perfectly with long property paths such as `a?.b?.c?.d`.

在像 `a?.b?.c?.d` 这样的长属性路径中，它工作得很完美。

<hr/>

{@a non-null-assertion-operator}

### The non-null assertion operator ( `!` )

### 非空断言运算符（`!`）

As of Typescript 2.0, you can enforce [strict null checking](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html "Strict null checking in TypeScript") with the `--strictNullChecks` flag. TypeScript then ensures that no variable is unintentionally `null` or `undefined`.

在 TypeScript 2.0 中，你可以使用 `--strictNullChecks` 标志强制开启[严格空值检查](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html "Strict null checking in TypeScript")。TypeScript 就会确保不存在意料之外的 null 或 undefined。

In this mode, typed variables disallow `null` and `undefined` by default. The type checker throws an error if you leave a variable unassigned or try to assign `null` or `undefined` to a variable whose type disallows `null` and `undefined`.

在这种模式下，有类型的变量默认是不允许 `null` 或 `undefined` 值的，如果有未赋值的变量，或者试图把 `null` 或 `undefined` 赋值给不允许为空的变量，类型检查器就会抛出一个错误。

The type checker also throws an error if it can't determine whether a variable will be `null` or `undefined` at runtime. You tell the type checker not to throw an error by applying the postfix
[non-null assertion operator, !](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator "Non-null assertion operator").

如果无法在运行类型检查器期间确定变量是否 `null` 或 `undefined`，则会抛出错误。你可以通过应用后缀[非空断言运算符!](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator "非空断言运算符")来告诉类型检查器不要抛出错误。

The Angular non-null assertion operator, `!`, serves the same purpose in
an Angular template. For example, you can assert that `item` properties are also defined.

Angular 的非空断言运算符 `!` 在 Angular 模板中具有相同的目的。例如，在使用 [`*ngIf`](guide/template-syntax#ngIf) 检查过 `item` 是否已定义之后，就可以断言 `item` 属性也已定义。

<code-example path="template-expression-operators/src/app/app.component.html" region="non-null" header="src/app/app.component.html"></code-example>

When the Angular compiler turns your template into TypeScript code,
it prevents TypeScript from reporting that `item.color` might be `null` or `undefined`.

当 Angular 编译器把你的模板转换成 TypeScript 代码时，它会防止 TypeScript 不要报告此 `item` 可能为 `null` 或 `undefined` 的错误。

Unlike the [_safe navigation operator_](guide/template-syntax#safe-navigation-operator "Safe navigation operator (?)"),
the non-null assertion operator does not guard against `null` or `undefined`.
Rather, it tells the TypeScript type checker to suspend strict `null` checks for a specific property expression.

与[*安全导航运算符*](guide/template-syntax#safe-navigation-operator "Safe naviation operator (?.)")不同的是，**非空断言运算符**不会防止出现 null 或 undefined。
它只是告诉 TypeScript 的类型检查器对特定的属性表达式，不做 "严格空值检测"。

The non-null assertion operator, `!`, is optional with the exception that you must use it when you turn on strict null checks.

非空断言运算符 `!`，是可选的，但在打开严格空检查选项时必须使用它。

<a href="#top-of-page">back to top</a>

[回到顶部](#top-of-page)

<hr/>

{@a built-in-template-functions}

## Built-in template functions

## 内置模板函数

{@a any-type-cast-function}

### The `$any()` type cast function

### 类型转换函数 `$any()`

Sometimes a binding expression triggers a type error during [AOT compilation](guide/aot-compiler) and it is not possible or difficult to fully specify the type.
To silence the error, you can use the `$any()` cast function to cast
the expression to the [`any` type](http://www.typescriptlang.org/docs/handbook/basic-types.html#any) as in the following example:

有时候，绑定表达式可能会在 [AOT 编译](guide/aot-compiler)时报类型错误，并且它不能或很难指定类型。要消除这种报错，你可以使用 `$any()` 转换函数来把表达式转换成 [`any` 类型](http://www.typescriptlang.org/docs/handbook/basic-types.html#any)，范例如下：

<code-example path="built-in-template-functions/src/app/app.component.html" region="any-type-cast-function-1" header="src/app/app.component.html"></code-example>

When the Angular compiler turns this template into TypeScript code,
it prevents TypeScript from reporting that `bestByDate` is not a member of the `item`
object when it runs type checking on the template.

当 Angular 编译器把模板转换成 TypeScript 代码时，`$any` 表达式可以防止 TypeScript 编译器在进行类型检查时报错说 `bestByDate` 不是 `item` 对象的成员。

The `$any()` cast function also works with `this` to allow access to undeclared members of
the component.

`$any()` 转换函数可以和 `this` 联合使用，以便访问组件中未声明过的成员。

<code-example path="built-in-template-functions/src/app/app.component.html" region="any-type-cast-function-2" header="src/app/app.component.html"></code-example>

The `$any()` cast function works anywhere in a binding expression where a method call is valid.

`$any()` 转换函数可以用在绑定表达式中任何可以进行方法调用的地方。

## SVG in templates

## 模板中的 SVG

It is possible to use SVG as valid templates in Angular. All of the template syntax below is
applicable to both SVG and HTML. Learn more in the SVG [1.1](https://www.w3.org/TR/SVG11/) and
[2.0](https://www.w3.org/TR/SVG2/) specifications.

可以将 SVG 用作 Angular 中的有效模板。以下所有模板语法均适用于 SVG 和 HTML。在 SVG [1.1](https://www.w3.org/TR/SVG11/)和[2.0](https://www.w3.org/TR/SVG2/) 规范中了解更多信息。

Why would you use SVG as template, instead of simply adding it as image to your application?

为什么要用 SVG 作为模板，而不是简单地将其作为图像添加到应用程序中？

When you use an SVG as the template, you are able to use directives and bindings just like with HTML
templates. This means that you will be able to dynamically generate interactive graphics.

当你使用 SVG 作为模板时，就可以像 HTML 模板一样使用指令和绑定。这意味着你将能够动态生成交互式图形。

Refer to the sample code snippet below for a syntax example:

有关语法示例，请参见下面的示例代码片段：

<code-example path="template-syntax/src/app/svg.component.ts" header="src/app/svg.component.ts"></code-example>

Add the following code to your `svg.component.svg` file:

将以下代码添加到你的 `svg.component.svg` 文件中：

<code-example path="template-syntax/src/app/svg.component.svg" header="src/app/svg.component.svg"></code-example>

Here you can see the use of a `click()` event binding and the property binding syntax
(`[attr.fill]="fillColor"`).

在这里，你可以看到事件绑定语法 `click()` 和属性绑定语法（`[attr.fill]="fillColor"`）的用法。

