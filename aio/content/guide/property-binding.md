# Property binding

# 属性绑定

Property binding in Angular helps you set values for properties of HTML elements or directives.
With property binding, you can do things such as toggle button functionality, set paths programmatically, and share values between components.

Angular 中的属性绑定可帮助你设置 HTML 元素或指令的属性值。使用属性绑定，你可以执行诸如切换按钮、以编程方式设置路径，以及在组件之间共享值之类的功能。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码片段的工作示例，请参阅<live-example></live-example>。

</div>

## Prerequisites

## 先决条件

To get the most out of property binding, you should be familiar with the following:

为了充分理解属性绑定，你应该熟悉以下内容：

* [Basics of components](guide/architecture-components)

  [组件基础](guide/architecture-components)

* [Basics of templates](guide/glossary#template)

  [模板基础](guide/glossary#template)

* [Binding syntax](guide/binding-syntax)

  [绑定语法](guide/binding-syntax)

<hr />

## Understanding the flow of data

## 理解数据流

Property binding moves a value in one direction, from a component's property into a target element property.

属性绑定在单一方向上将值从组件的属性送到目标元素的属性。

<div class="alert is-helpful">

For more information on listening for events, see [Event binding](guide/event-binding).

有关侦听事件的更多信息，请参阅[事件绑定](guide/event-binding)。

</div>

To read a target element property or call one of its methods, see the API reference for [ViewChild](api/core/ViewChild) and [ContentChild](api/core/ContentChild).

要读取目标元素的属性或调用其方法，请参阅 [ViewChild](api/core/ViewChild) 和 [ContentChild](api/core/ContentChild) 的 API 参考手册。

## Binding to a property

## 绑定到属性

To bind to an element's property, enclose it in square brackets, `[]`, which identifies the property as a target property.
A target property is the DOM property to which you want to assign a value.
For example, the target property in the following code is the image element's `src` property.

要绑定到元素的属性，请将其括在方括号 `[]` 内，该括号会将属性标为目标属性。目标属性就是你要对其进行赋值的 DOM 属性。例如，以下代码中的目标属性是 img 元素的 `src` 属性。

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>


In most cases, the target name is the name of a property, even when it appears to be the name of an attribute.
In this example, `src` is the name of the `<img>` element property.

在大多数情况下，目标的名称就是 Property 的名称，哪怕它看起来像 Attribute 的名称。在此示例中，`src` 就是 `<img>` 元素的 Property 名称。

The brackets, `[]`, cause Angular to evaluate the right-hand side of the assignment as a dynamic expression.
Without the brackets, Angular treats the the right-hand side as a string literal and sets the property to that static value.

方括号 `[]` 使 Angular 将等号的右侧看作动态表达式进行求值。如果不使用方括号，Angular 就会将右侧视为字符串字面量并将此属性设置为该静态值。

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

Omitting the brackets renders the string `parentItem`, not the value of `parentItem`.

省略方括号就会渲染出字符串 `parentItem`，而不是 `parentItem` 的值。

## Setting an element property to a component property value

## 将元素的属性设置为组件属性的值

To bind the `src` property of an `<img>` element to a component's property, place the target, `src`, in square brackets followed by an equal sign and then the property.
The property here is `itemImageUrl`.

要将 `<img>` 的 `src` 属性绑定到组件的属性，请将目标 `src` 放在方括号中，后跟等号，然后是组件的属性。在这里组件的属性是 `itemImageUrl`。

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

Declare the `itemImageUrl` property in the class, in this case `AppComponent`.

在组件类 `AppComponent` 中声明 `itemImageUrl` 属性。

<code-example path="property-binding/src/app/app.component.ts" region="item-image" header="src/app/app.component.ts"></code-example>

{@a colspan}

#### `colspan` and `colSpan`

#### `colspan` 和 `colSpan`

A common point of confusion is between the attribute, `colspan`, and the property, `colSpan`.
Notice that these two names differ by only a single letter.

最容易混淆的地方是 `colspan` 这个 Attribute 和 `colSpan` 这个 Property。请注意，这两个名称只有一个字母的大小写不同。

If you wrote something like this:

如果你这样写：

<code-example language="html">
  &lt;tr&gt;&lt;td colspan="{{1 + 1}}"&gt;Three-Four&lt;/td&gt;&lt;/tr&gt;
</code-example>

You'd get this error:

你会收到此错误：

<code-example language="bash">
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property
</code-example>

As the message says, the `<td>` element does not have a `colspan` property. This is true
because `colspan` is an attribute&mdash;`colSpan`, with a capital `S`, is the
corresponding property. Interpolation and property binding can set only *properties*, not attributes.

如消息中所示，`<td>` 元素没有 `colspan` Property。这是正确的，因为 `colspan` 是一个 Attribute — `colSpan`（带大写 `S`）才是相应的 Property。插值和 Property 绑定只能设置 *Property*，不能设置 Attribute。

Instead, you'd use property binding and write it like this:

相反，你应该使用 Property 绑定并将其编写为：

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>


Another example is disabling a button when the component says that it `isUnchanged`:

另一个示例是在组件说它自己 `isUnchanged` 时禁用按钮：

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Another is setting a property of a directive:

另一个是设置指令的属性：

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

Yet another is setting the model property of a custom component&mdash;a great way
for parent and child components to communicate:

还有一个是设置自定义组件的模型属性，这是父组件和子组件进行通信的一种好办法：

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>


## Toggling button functionality

## 切换按钮功能

To disable a button's functionality depending on a Boolean value, bind the DOM `disabled` property to a property in the class that is `true` or `false`.

若要根据布尔值禁用按钮的功能，请将 DOM 的 `disabled` Property 设置为类中的源属性（可能为 `true` 或 `false`）。

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Because the value of the property `isUnchanged` is `true` in the `AppComponent`, Angular disables the button.

由于 `AppComponent` 中属性 `isUnchanged` 的值是 `true`，Angular 会禁用该按钮。

<code-example path="property-binding/src/app/app.component.ts" region="boolean" header="src/app/app.component.ts"></code-example>


## Setting a directive property

## 设置指令的属性

To set a property of a directive, place the directive within square brackets , such as `[ngClass]`, followed by an equal sign and the property.
Here, the property is `classes`.

要设置指令的属性，请将指令放在方括号中，例如 `[ngClass]`，后跟等号和一个源属性。在这里，这个源属性的值是 `classes` 。

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

To use the property, you must declare it in the class, which in this example is `AppComponent`.
The value of `classes` is `special`.

要使用该属性，必须在组件类中声明它，在这里是 `AppComponent`。其 `classes` 的值是 `special` 。

<code-example path="property-binding/src/app/app.component.ts" region="directive-property" header="src/app/app.component.ts"></code-example>

Angular applies the class `special` to the `<p>` element so that you can use `special` to apply CSS styles.

Angular 会将 `special` 类应用到 `<p>` 元素，以便你可以通过 `special` 来应用 CSS 样式。

## Bind values between components

## 在组件之间绑定值

To set the model property of a custom component, place the target, here `childItem`, between square brackets `[]` followed by an equal sign and the property.
Here, the property is `parentItem`.

要设置自定义组件的模型属性，请将目标属性（此处为 `childItem`）放在方括号 `[]` 中，其后跟着等号与源属性。在这里，这个源属性是 `parentItem` 。

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

To use the target and the property, you must declare them in their respective classes.

要使用目标和源属性，必须在它们各自的类中声明它们。

Declare the target of `childItem` in its component class, in this case `ItemDetailComponent`.

在组件类（这里是 `ItemDetailComponent`）中声明 `childItem` 的目标。

For example, the following code declares the target of `childItem` in its component class, in this case `ItemDetailComponent`.

例如，以下代码在其组件类（这里是 `ItemDetailComponent`）中声明了 `childItem` 的目标。

Then, the code contains an `@Input()` decorator with the `childItem` property so data can flow into it.

然后，代码包含一个带有 `@Input()` 装饰器的 `childItem` 属性，这样才能让数据流入其中。

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts"></code-example>

Next, the code declares the property of `parentItem` in its component class, in this case `AppComponent`.
In this example the type of `childItem` is `string`, so `parentItem` needs to be a string.
Here, `parentItem` has the string value of `lamp`.

接下来，代码在其组件类（这里是 `AppComponent`）中声明属性 `parentItem`。在此示例中， `childItem` 的类型为 `string` ，因此 `parentItem` 也必须为字符串。在这里，`parentItem` 的字符串值为 `lamp`。

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

With this configuration, the view of `<app-item-detail>` uses the value of `lamp` for `childItem`.

这种配置方式下，`<app-item-detail>` 的视图使用来自 `childItem` 的值 `lamp`。

## Property binding and security

## 属性绑定与安全性

Property binding can help keep content secure.
For example, consider the following malicious content.

属性绑定可以帮助确保内容的安全。例如，考虑以下恶意内容。

<code-example path="property-binding/src/app/app.component.ts" region="malicious-content" header="src/app/app.component.ts"></code-example>

The component template interpolates the content as follows:

组件模板对内容进行插值，如下所示：

<code-example path="property-binding/src/app/app.component.html" region="malicious-interpolated" header="src/app/app.component.html"></code-example>

The browser doesn't process the HTML and instead displays it raw, as follows.

浏览器不会处理 HTML，而是原样显示它，如下所示。

<code-example language="bash">
"Template &lt;script&gt;alert("evil never sleeps")&lt;/script&gt; Syntax" is the interpolated evil title.
</code-example>


Angular does not allow HTML with `<script>` tags, neither with [interpolation](guide/interpolation) nor property binding, which prevents the JavaScript from running.

Angular 不允许带有 `<script>` 标记的 HTML，既不能用于[插值](guide/interpolation)也不能用于属性绑定，这样就会阻止运行 JavaScript。

In the following example, however, Angular [sanitizes](guide/security#sanitization-and-security-contexts) the values before displaying them.

但是，在以下示例中，Angular 在显示值之前会先对它们进行[无害化处理](guide/security#sanitization-and-security-contexts)。

<code-example path="property-binding/src/app/app.component.html" region="malicious-content" header="src/app/app.component.html"></code-example>

Interpolation handles the `<script>` tags differently than property binding, but both approaches render the content harmlessly.
The following is the browser output of the sanitized `evilTitle` example.

插值处理 `<script>` 标记的方式与属性绑定的方式不同，但这两种方法都可以使内容无害。以下是经过无害化处理的 `evilTitle` 示例的浏览器输出。

<code-example language="bash">
"Template Syntax" is the property bound evil title.
</code-example>

## Property binding and interpolation

## 属性绑定和插值

Often [interpolation](guide/interpolation) and property binding can achieve the same results.
The following binding pairs do the same thing.

通常，[插值](guide/interpolation)和属性绑定可以达到相同的结果。以下绑定会做相同的事。

<code-example path="property-binding/src/app/app.component.html" region="property-binding-interpolation" header="src/app/app.component.html"></code-example>

You can use either form when rendering data values as strings, though interpolation is preferable for readability.
However, when setting an element property to a non-string data value, you must use property binding.

将数据值渲染为字符串时，可以使用任一种形式，只是插值形式更易读。但是，要将元素属性设置为非字符串数据值时，必须使用属性绑定。

<hr />

## What's next

## 下一步是什么

* [Property binding best practices](guide/property-binding-best-practices)

  [属性绑定的最佳实践](guide/property-binding-best-practices)

