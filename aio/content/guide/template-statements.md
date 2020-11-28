# Template statements

# 模板语句

Template statements are methods or properties that you can use in your HTML to respond to user events.
With template statements, your application can engage users through actions such as displaying dynamic content or submitting forms.

模板语句是可在 HTML 中用于响应用户事件的方法或属性。使用模板语句，你的应用可以通过诸如显示动态内容或提交表单之类的动作吸引用户。

<div class="alert is-helpful">

See the <live-example name="template-syntax">Template syntax</live-example> for
the syntax and code snippets in this guide.

关于本指南中的语法和代码段的信息，请参阅<live-example name="template-syntax">Template syntax</live-example>。

</div>

In the following example, the template statement `deleteHero()` appears in quotes to the right of the `=`&nbsp;symbol as in `(event)="statement"`.

在以下示例中，模板语句 `deleteHero()` 出现在 `=` 号右侧的引号中，`(event)="statement"` 。

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

When the user clicks the **Delete hero** button, Angular calls the `deleteHero()` method in the component class.

当用户单击 **Delete hero** 按钮时，Angular 就会调用组件类中 `deleteHero()` 方法。

You can use template statements with elements, components, or directives in response to events.

你可以将模板语句与元素、组件或指令一起使用以响应事件。

<div class="alert is-helpful">

Responding to events is an aspect of Angular's [unidirectional data flow](guide/glossary#unidirectional-data-flow).
You can change anything in your application during a single event loop.

响应事件是 Angular [单向数据流](guide/glossary#unidirectional-data-flow)的一个方面。你可以在单个事件循环中更改应用程序中的任何内容。

</div>

## Syntax

## 语法

Like [template expressions](guide/interpolation), template statements use a language that looks like JavaScript.
However, the parser for template statements differs from the parser for template expressions.
In addition, the template statements parser specifically supports both basic assignment, `=`, and chaining expressions with semicolons, `;`.

与[模板表达式](guide/interpolation)一样，模板语句使用类似于 JavaScript 的语言。但是，模板语句的解析器与模板表达式的解析器有所不同。此外，模板语句解析器特别支持基本赋值 `=` 和带有分号 `;` 的串联表达式。

The following JavaScript and template expression syntax is not allowed:

不允许使用以下 JavaScript 和模板表达式语法：

* `new`
* increment and decrement operators, `++` and `--`

  递增和递减运算符 `++` 和 `--`

* operator assignment, such as `+=` and `-=`

  赋值运算符，例如 `+=` 和 `-=`

* the bitwise operators, such as `|` and `&`

  按位运算符，例如 `|` 和 `&`

* the [pipe operator](guide/pipes)

  [管道操作符](guide/pipes)

## Statement context

## 语句的上下文

Statements have a context&mdash;a particular part of the application to which the statement belongs.

语句具有上下文 - 也就是语句所属应用中的特定部分。

Statements can refer only to what's in the statement context, which is typically the component instance.
For example, `deleteHero()` of `(click)="deleteHero()"` is a method of the component in the following snippet.

语句只能引用语句上下文中的内容，通常是组件实例。例如，`(click)="deleteHero()"` 中的 `deleteHero()` 就是下面代码段中的组件方法之一。

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

The statement context may also refer to properties of the template's own context.
In the following example, the component's event handling method, `onSave()` takes the template's own `$event` object as an argument.
On the next two lines, the `deleteHero()` method takes a [template input variable](guide/built-in-directives#template-input-variable), `hero`, and `onSubmit()` takes a [template reference variable](guide/template-reference-variables), `#heroForm`.

语句上下文还可以引用模板自身的上下文属性。在下面的示例中，组件的事件处理方法 `onSave()` 将模板自己的 `$event` 对象用作参数。在接下来的两行中， `deleteHero()` 方法接收了[模板输入变量](guide/built-in-directives#template-input-variable) `hero` 作为参数，而 `onSubmit()` 接收了[模板引用变量](guide/template-reference-variables) `#heroForm` 作为参数。

<code-example path="template-syntax/src/app/app.component.html" region="context-var-statement" header="src/app/app.component.html"></code-example>

In this example, the context of the `$event` object, `hero`, and `#heroForm` is the template.

在此示例中， `$event` 对象、`hero` 和 `#heroForm` 的上下文都是其模板。

Template context names take precedence over component context names.
In the preceding `deleteHero(hero)`, the `hero` is the template input variable, not the component's `hero` property.

模板上下文中的名称优先于组件上下文中的名称。前面 `deleteHero(hero)` 中的 `hero` 是模板输入变量，而不是组件的 `hero` 属性。

## Statement best practices

## 模板语句最佳实践

* **Conciseness**

  **简明**

  Keep template statements minimal by using method calls or basic property assignments.

  通过只使用方法调用或基本属性赋值，让模板语句最少化。

* **Work within the context**

  **在上下文中工作**

  The context of a template statement can be the component class instance or the template.
  Because of this, template statements cannot refer to anything in the global namespace such as `window` or `document`.
  For example, template statements can't call `console.log()` or `Math.max()`.

  模板语句的上下文可以是组件类实例或模板。因此，模板语句无法引用全局名称空间中的任何内容，例如 `window` 或 `document`。例如，模板语句不能调用 `console.log()` 或 `Math.max()` 。
