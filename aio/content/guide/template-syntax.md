# Template syntax

# 模板语法

In Angular, a *template* is a chunk of HTML.
Within a template, you can use special syntax to leverage many of Angular's features.

在 Angular 中，*模板*就是一块 HTML。在模板中，你可以通过一种特殊语法来使用 Angular 的许多功能。

## Prerequisites

## 先决条件

Before learning template syntax, you should be familiar with the following:

在学习模板语法之前，你应该熟悉下列内容：

* [Angular concepts](guide/architecture)

  [Angular 的概念](guide/architecture)

* JavaScript
* HTML
* CSS


<!-- Do we still need the following section? It seems more relevant to those coming from AngularJS, which is now 7 versions ago. -->
<!-- You may be familiar with the component/template duality from your experience with model-view-controller (MVC) or model-view-viewmodel (MVVM).
In Angular, the component plays the part of the controller/viewmodel, and the template represents the view. -->

<hr />

Each Angular template in your app is a section of HTML that you can include as a part of the page that the browser displays.
An Angular HTML template renders a view, or user interface, in the browser, just like regular HTML, but with a lot more functionality.

应用程序中的每个 Angular 模板都是一块 HTML，你可以将其包含在浏览器显示的页面中。 Angular 中的 HTML 模板与常规 HTML 一样，可以在浏览器中渲染视图或用户界面，但功能要多得多。

When you generate an Angular app with the Angular CLI, the `app.component.html` file is the default template containing placeholder HTML.

使用 Angular CLI 生成 Angular 应用时， `app.component.html` 文件是一个包含占位符 HTML 的默认模板。

The template syntax guides show you how you can control the UX/UI by coordinating data between the class and the template.

本模板语法指南向你展示了如何通过协调类和模板之间的数据来控制 UX/UI。

<div class="is-helpful alert">

Most of the Template Syntax guides have dedicated working example apps that demonstrate the individual topic of each guide.
To see all of them working together in one app, see the comprehensive <live-example title="Template Syntax Live Code"></live-example>.

大多数模板语法指南都有专门的可工作的范例应用，这些应用程序演示了每个指南中的各个主题。要查看把所有应用合在一起时的工作情况，请参阅综合<live-example title="Template Syntax Live Code"></live-example>。

</div>

## Empower your HTML

## 增强你的 HTML

With special Angular syntax in your templates, you can extend the HTML vocabulary of your apps.
For example, Angular helps you get and set DOM (Document Object Model) values dynamically with features such as built-in template functions, variables, event listening, and data binding.

通过在模板中使用 Angular 的特有语法，你可以扩展应用程序的 HTML 词汇表。例如，Angular 可以通过内置的模板函数、变量、事件监听和数据绑定等功能来帮助你动态获取和设置 DOM（文档对象模型）中的值。

Almost all HTML syntax is valid template syntax.
However, because an Angular template is part of an overall webpage, and not the entire page, you don't need to include elements such as `<html>`, `<body>`, or `<base>`.
You can focus exclusively on the part of the page you are developing.

几乎所有的 HTML 语法都是有效的模板语法。但是，由于 Angular 模板只是整个网页的一部分，而不是整个网页，因此你不需要包含诸如 `<html>` ， `<body>` 或 `<base>` 元素。这样你可以专注于正在开发的那部分页面。

<div class="alert is-important">

To eliminate the risk of script injection attacks, Angular does not support the `<script>` element in templates.
Angular ignores the `<script>` tag and outputs a warning to the browser console.
For more information, see the [Security](guide/security) page.

为了消除脚本注入攻击的风险，Angular 不支持模板中使用 `<script>` 元素。Angular 会忽略 `<script>` 标记，并向浏览器控制台输出一条警告。欲知详情，参阅[“安全性”](guide/security)页面。

</div>

<hr />

## More on template syntax

## 关于模板语法的更多信息

You may also be interested in the following:

你可能也对以下内容感兴趣：

* [Interpolation](guide/interpolation)&mdash;learn how to use interpolation and expressions in HTML.

  [插值](guide/interpolation) - 学习如何在 HTML 中使用插值和表达式。

* [Template statements](guide/template-statements)&mdash;respond to events in your templates.

  [模板语句](guide/template-statements) - 响应模板中的事件。

* [Binding syntax](guide/binding-syntax)&mdash;use binding to coordinate values in your app.

  [绑定语法](guide/binding-syntax) - 使用绑定来协调应用程序中的值。

* [Property binding](guide/property-binding)&mdash;set properties of target elements or directive `@Input()` decorators.

  [属性绑定](guide/property-binding) - 设置目标元素的属性或指令中带 `@Input()` 装饰器的属性。

* [Attribute, class, and style bindings](guide/attribute-binding)&mdash;set the value of attributes, classes, and styles.

  [属性（Attribute），类和样式绑定](guide/attribute-binding) - 设置属性、类和样式的值。

* [Event binding](guide/event-binding)&mdash;listen for events and your HTML.

  [事件绑定](guide/event-binding) - 监听事件和 HTML。

* [Two-way binding](guide/two-way-binding)&mdash;share data between a class and its template.

  [双向绑定](guide/two-way-binding) - 在类及其模板之间共享数据。

* [Built-in directives](guide/built-in-directives)&mdash;listen to and modify the behavior and layout of HTML.

  [内置指令](guide/built-in-directives) - 监听和修改 HTML 的行为和布局。

* [Template reference variables](guide/template-reference-variables)&mdash;use special variables to reference a DOM element within a template.

  [模板引用变量](guide/template-reference-variables) - 使用特殊变量来引用模板中的 DOM 元素。

* [Inputs and Outputs](guide/inputs-outputs)&mdash;share data between the parent context and child directives or components

  [输入和输出](guide/inputs-outputs) - 在父级上下文和子指令或组件之间共享数据

* [Template expression operators](guide/template-expression-operators)&mdash;learn about the pipe operator, `|`, and protect against `null` or `undefined` values in your HTML.

  [模板表达式运算符](guide/template-expression-operators) - 了解管道运算符 `|` ，以及如何防范空值 `null` 或 `undefined`。

* [SVG in templates](guide/svg-in-templates)&mdash;dynamically generate interactive graphics.

  [模板中的 SVG](guide/svg-in-templates) - 动态生成交互式图形。

