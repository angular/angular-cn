# Two-way binding

# 双向绑定

Two-way binding gives components in your application a way to share data.
Use two-way binding binding to listen for events and update values simultaneously between parent and child components.

双向绑定为应用中的组件提供了一种共享数据的方式。使用双向绑定绑定来侦听事件并在父组件和子组件之间同步更新值。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码片段的可工作示例参见<live-example></live-example>。

</div>

## Prerequisites

## 先决条件

To get the most out of two-way binding, you should have a basic understanding of the following concepts:

为了充分利用双向绑定，你应该对以下概念有基本的了解：

* [Property binding](guide/property-binding)

  [属性绑定](guide/property-binding)

* [Event binding](guide/event-binding)

  [事件绑定](guide/event-binding)

* [Inputs and Outputs](guide/inputs-outputs)

  [输入和输出](guide/inputs-outputs)

<hr>

Two-way binding combines property binding with event binding:

双向绑定将属性绑定与事件绑定结合在一起：

* [Property binding](guide/property-binding) sets a specific element property.

  [属性绑定](guide/property-binding)设置特定的元素属性。

* [Event binding](guide/event-binding) listens for an element change event.

  [事件绑定](guide/event-binding)侦听元素更改事件。

## Adding two-way data binding

## 添加双向数据绑定

Angular's two-way binding syntax is a combination of square brackets and parentheses, `[()]`.
The `[()]` syntax combines the brackets of property binding, `[]`, with the parentheses of event binding, `()`, as follows.

Angular 的双向绑定语法是方括号和圆括号的组合 `[()]`。`[]` 进行属性绑定，`()` 进行事件绑定，如下所示。

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html" region="two-way-syntax"></code-example>

## How two-way binding works

## 双向绑定工作原理

For two-way data binding to work, the `@Output()` property must use the pattern, `inputChange`, where `input` is the name of the `@Input()` property.
For example, if the `@Input()` property is `size`, the `@Output()` property must be `sizeChange`.

为了使双向数据绑定有效，`@Output()` 属性的名字必须遵循 `inputChange` 模式，其中 `input` 是相应 `@Input()` 属性的名字。例如，如果 `@Input()` 属性为 `size` ，则 `@Output()` 属性必须为 `sizeChange` 。

The following `sizerComponent` has a `size` value property and a `sizeChange` event.
The `size` property is an `@Input()`, so data can flow into the `sizerComponent`.
The `sizeChange` event is an `@Output()`, which allows data to flow out of the `sizerComponent` to the parent component.

后面的 `sizerComponent` 具有值属性 `size` 和事件属性 `sizeChange`。 `size` 属性是 `@Input()`，因此数据可以流入 `sizerComponent` 。 `sizeChange` 事件是一个 `@Output()` ，它允许数据从 `sizerComponent` 流出到父组件。

Next, there are two methods, `dec()` to decrease the font size and `inc()` to increase the font size.
These two methods use `resize()` to change the value of the `size` property within min/max value constraints, and to emit an event that conveys the new `size` value.

接下来，有两个方法， `dec()` 用于减小字体大小， `inc()` 用于增大字体大小。这两种方法使用 `resize()` 在最小/最大值的约束内更改 `size` 属性的值，并发出带有新 `size` 值的事件。

<code-example path="two-way-binding/src/app/sizer/sizer.component.ts" region="sizer-component" header="src/app/sizer.component.ts"></code-example>

The `sizerComponent` template has two buttons that each bind the click event to the `inc()` and `dec()` methods.
When the user clicks one of the buttons, the `sizerComponent` calls the corresponding method.
Both methods, `inc()` and `dec()`, call the `resize()` method with a `+1` or `-1`, which in turn raises the `sizeChange` event with the new size value.

`sizerComponent` 模板有两个按钮，分别将 click 事件绑定到 `inc()` 和 `dec()` 方法。当用户单击按钮之一时， `sizerComponent` 调用相应的方法。 `inc()` 和 `dec()` 这两个方法分别使用 `+1` 或 `-1` 调用 `resize()` 方法，它使用新的 size 值引发 `sizeChange` 事件。

<code-example path="two-way-binding/src/app/sizer/sizer.component.html" header="src/app/sizer.component.html"></code-example>


In the `AppComponent` template, `fontSizePx` is two-way bound to the `SizerComponent`.

在 `AppComponent` 模板中， `fontSizePx` 被双向绑定到 `SizerComponent` 。

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html" region="two-way-1"></code-example>

In the `AppComponent`, `fontSizePx` establishes the initial `SizerComponent.size` value by setting the value to `16`.

在 `AppComponent` 中，通过将 `fontSizePx` 的值设置为 `16` 来设置初始 `SizerComponent.size` 值。

<code-example path="two-way-binding/src/app/app.component.ts" header="src/app/app.component.ts" region="font-size"></code-example>

Clicking the buttons updates the `AppComponent.fontSizePx`.
The revised `AppComponent.fontSizePx` value updates the style binding, which makes the displayed text bigger or smaller.

单击这些按钮将更新 `AppComponent.fontSizePx`。修改后的 `AppComponent.fontSizePx` 值将更新样式绑定，从而使显示的文本变大或变小。

The two-way binding syntax is shorthand for a combination of property binding and event binding.
The `SizerComponent` binding as separate property binding and event binding is as follows.

双向绑定语法是属性绑定和事件绑定的组合的简写形式。拆成单独的属性绑定和事件绑定形式的 `SizerComponent` 代码如下：

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (expanded)" region="two-way-2"></code-example>

The `$event` variable contains the data of the `SizerComponent.sizeChange` event.
Angular assigns the `$event` value to the `AppComponent.fontSizePx` when the user clicks the buttons.

`$event` 变量包含 `SizerComponent.sizeChange` 事件的数据。当用户单击按钮时，Angular 将 `$event` 赋值给 `AppComponent.fontSizePx`。

<div class="callout is-helpful">

  <header>Two-way binding in forms</header>
  
  <header>表单中的双向绑定</header>

  Because no native HTML element follows the `x` value and `xChange` event pattern, two-way binding with form elements requires `NgModel`.
  For more information on how to use two-way binding in forms, see Angular [NgModel](guide/built-in-directives#ngModel).

  因为没有任何原生 HTML 元素遵循了 `x` 值和 `xChange` 事件的命名模式，所以与表单元素进行双向绑定需要使用 `NgModel`。关于如何在表单中使用双向绑定的更多信息，请参见 Angular [NgModel](guide/built-in-directives#ngModel) 。

</div>
