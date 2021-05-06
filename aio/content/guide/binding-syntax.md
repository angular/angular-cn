# Binding syntax

# 绑定语法：概述

Data binding automatically keeps your page up-to-date based on your application's state.
You use data binding to specify things such as the source of an image, the state of a button, or data for a particular user.

数据绑定会根据应用程序的状态自动使你的页面保持最新状态。你可以使用数据绑定来指定诸如图像源、按钮状态或特定用户的数据之类的内容。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码段的工作示例，请参阅<live-example></live-example>。

</div>

## Data binding and HTML

## 数据绑定和 HTML

Developers can customize HTML by specifying attributes with string values.
In the following example, `class`, `src`, and `disabled` modify the `<div>`, `<img>`, and `<button>` elements respectively.

开发人员可以使用字符串值指定属性来定制 HTML。在以下示例中，`class`、`src` 和 `disabled` 修饰了 `<div>`、`<img>` 和 `<button>` 元素。

```html
<div class="special">Plain old HTML</div>
<img src="images/item.png">
<button disabled>Save</button>
```

Use data binding to control things like the state of a button:

可以使用数据绑定来控制按钮状态等：

<code-example path="binding-syntax/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Notice that the binding is to the `disabled` property of the button's DOM element, not the attribute.
Data binding works with properties of DOM elements, components, and directives, not HTML attributes.

请注意，绑定是绑定到 `disabled` 这个 Property（属性），而不是 Attribute（属性）。数据绑定使用的是 DOM 元素、组件和指令的 Property，而不是 HTML Attribute。

{@a html-attribute-vs-dom-property}

### HTML attributes and DOM properties

### HTML Attribute 和 DOM Property

Angular binding distinguishes between HTML attributes and DOM properties.

对于 Angular 绑定来说，HTML Attribute 和 DOM Property 是有显著区别的。

Attributes initialize DOM properties and you can configure them to modify an element's behavior.
Properties are features of DOM nodes.

Attribute 会初始化 DOM Property，你可以配置它们以修改元素的行为。Property 则是 DOM 节点的特性。

* A few HTML attributes have 1:1 mapping to properties; for example, `id`.

  少数 HTML Attribute 可以 1:1 映射到同名的 Property。例如 `id`。

* Some HTML attributes don't have corresponding properties; for example, `aria-*`.

  某些 HTML Attribute 没有相应的 Property。例如，`aria-*`。

* Some DOM properties don't have corresponding attributes; for example, `textContent`.

  某些 DOM Property 没有相应的 Attribute。例如，`textContent`。

<div class="alert is-important">

Remember that HTML attributes and DOM properties are different things, even when they have the same name.

请记住，即使 HTML Attribute 和 DOM Property 具有相同的名称，它们也仍然是不同的。

</div>

In Angular, the only role of HTML attributes is to initialize element and directive state.

在 Angular 中，HTML Attribute 的唯一作用是初始化元素和指令的状态。

When you write a data binding, you're dealing exclusively with the DOM properties and events of the target object.

编写数据绑定时，你只是在处理 DOM Property 和目标对象的事件。

#### Example 1: an `<input>`

#### 范例 1：`<input>`

When the browser renders `<input type="text" value="Sarah">`, it creates a
corresponding DOM node with a `value` property and initializes that `value` to "Sarah".

当浏览器渲染 `<input type="text" value="Sarah">` 时，它将创建一个具有 `value` 这个 Property 的相应 DOM 节点，并将其 `value` 初始化为 “Sarah”。

```html
<input type="text" value="Sarah">
```

When the user enters `Sally` into the `<input>`, the DOM element `value` property becomes `Sally`.
However, if you look at the HTML attribute `value` using `input.getAttribute('value')`, you can see that the attribute remains unchanged&mdash;it returns "Sarah".

当用户将 `Sally` 输入到 `<input>` 时，DOM 元素的 `value` Property 会变为 `Sally`。但是，如果使用 `input.getAttribute('value')` 读取 `value`，你会看到该 Attribute 保持不变 - 它仍然会返回 “Sarah”。

The HTML attribute `value` specifies the initial value; the DOM `value` property is the current value.

作为 HTML Attribute 的 `value` 会指定初始值； 而 DOM 的 Property `value` 则是当前值。

To see attributes versus DOM properties in a functioning app, see the <live-example name="binding-syntax"></live-example> especially for binding syntax.

要在运行的应用程序中查看 Attribute 与 DOM Property，请参阅<live-example name="binding-syntax"></live-example>，请特别关注绑定语法的信息。

#### Example 2: a disabled button

#### 范例 2：禁用按钮

A button's `disabled` property is `false` by default so the button is enabled.

默认情况下，按钮的 `disabled` Property 为 `false`，因此启用了此按钮。

When you add the `disabled` attribute, you are initializing the button's `disabled` property to `true` which disables the button.

当添加 `disabled` Attribute 时，你正在将按钮的 `disabled` Property 初始化为 `true`，这将禁用该按钮。

```html
<button disabled>Test Button</button>
```

Adding and removing the `disabled` attribute disables and enables the button.
However, the value of the attribute is irrelevant, which is why you cannot enable a button by writing `<button disabled="false">Still Disabled</button>`.

添加或删除 `disabled` 这个 Attribute 将禁用或启用该按钮。但是，该 Attribute 的值无关紧要，这就是为什么你无法通过编写 `<button disabled="false">Still Disabled</button>` 来启用按钮的原因。

To control the state of the button, set the `disabled` property instead.

要控制按钮的状态，请设置 `disabled` 这个 Property。

#### Property and attribute comparison

#### Property 和 Attribute 的比较

Though you could technically set the `[attr.disabled]` attribute binding, the values are different in that the property binding must be a boolean value, while its corresponding attribute binding relies on whether the value is `null` or not.
Consider the following:

尽管从技术角度上说，可以设置 `[attr.disabled]` Attribute 这个绑定，但是它的值是不同的，差异在于其 Property 绑定必须是布尔值，而其相应的 Attribute 绑定则取决于该值是否为 `null`。考虑以下情况：

```html
<input [disabled]="condition ? true : false">
<input [attr.disabled]="condition ? 'disabled' : null">
```

The first line, which uses the `disabled` property, uses a boolean value.
The second line, which uses the disabled attribute checks for `null`.

第一行使用 `disabled` 这个 Property，要使用布尔值。第二行使用 `disabled` 这个 Attribute，要判定是否为 `null`。

Generally, use property binding over attribute binding as a boolean value is easy to read, the syntax is shorter, and a property is more performant.

通常，要使用 Property 绑定而不是 Attribute 绑定。因为布尔值很容易阅读，语法较短，并且 Property 绑定的性能更高。

To see the `disabled` button example in a functioning application, see the <live-example></live-example>.
This example shows you how to toggle the disabled property from the component.

要在运行的应用程序中查看 `disabled` 按钮，请参见<live-example></live-example>。本示例说明如何从组件中切换 disabled 这个 Property。

## Types of data binding

## 数据绑定的类型

Angular provides three categories of data binding according to the direction of data flow:

Angular 根据数据流的方向提供三种类型的数据绑定：

* From the source to view

  从源到视图

* From view to source

  从视图到源

* In a two way sequence of view to source to view

  双向，从视图到源再到视图

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

Binding types other than interpolation have a target name to the left of the equal sign.
The target of a binding is a property or event, which you surround with square brackets, `[]`, parentheses, `()`, or both, `[()]`.

除插值以外的绑定类型，在等号的左侧会有一个目标名称。绑定目标是一个 Property 或事件名称，被方括号 `[]`、圆括号 `()` 或两者共同 `[()]` 包裹起来。

The binding punctuation of `[]`, `()`, `[()]`, and the prefix specify the direction of data flow.

`[]`、`()`、`[()]` 这些绑定标点以及前缀，用来指定数据流的方向。

* Use `[]` to bind from source to view.

  使用 `[]` 从源绑定到视图。

* Use `()` to bind from view to source.

  使用 `()` 从视图绑定到源。

* Use `[()]` to bind in a two way sequence of view to source to view.

  使用 `[()]` 进行双向绑定，将视图绑定到源再绑定到视图。

Place the expression or statement to the right of the equal sign within double quotes, `""`.
For more information see [Interpolation](guide/interpolation) and [Template statements](guide/template-statements).

将表达式或语句放在双引号 `""` 中等号的右侧。有关更多信息，请参见[插值](guide/interpolation)和[模板语句](guide/template-statements)。

## Binding types and targets

## 绑定类型和目标

The target of a data binding can be a property, an event, or an attribute name.
Every public member of a source directive is automatically available for binding in a template expression or statement.
The following table summarizes the targets for the different binding types.

数据绑定的目标可以是 Property、事件或 Attribute 的名称。源指令的每个 public 成员都可以自动用于绑定模板表达式或模板语句中。下表总结了不同绑定类型的目标。

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
    </th>
    <th>
      Target
    </th>
    <th>
      Examples
    </th>
  </tr>
  <tr>
    <th>
      类型
    </th>
    <th>
      目标
    </th>
    <th>
      范例
    </th>
  </tr>
  <tr>
    <td>
      Property
    </td>
    <td>
      Element&nbsp;property<br>
      Component&nbsp;property<br>
      Directive&nbsp;property
    </td>
    <td>
      <code>src</code>, <code>hero</code>, and <code>ngClass</code> in the following:
      <code-example path="template-syntax/src/app/app.component.html" region="property-binding-syntax-1"></code-example>
      <!-- For more information, see [Property Binding](guide/property-binding). -->
    </td>
  </tr>
  <tr>
    <td>
      属性
    </td>
    <td>
      元素属性<br>
      组件属性<br>
      指令属性
    </td>
    <td>
      <code>src</code>、<code>hero</code> 和 <code>ngClass</code>，代码如下:
      <code-example path="template-syntax/src/app/app.component.html" region="property-binding-syntax-1"></code-example>
      <!-- For more information, see [Property Binding](guide/property-binding). -->
    </td>
  </tr>
  <tr>
    <td>
      Event
    </td>
    <td>
      Element&nbsp;event<br>
      Component&nbsp;event<br>
      Directive&nbsp;event
    </td>
    <td>
      <code>click</code>, <code>deleteRequest</code>, and <code>myClick</code> in the following:
      <code-example path="template-syntax/src/app/app.component.html" region="event-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      事件
    </td>
    <td>
      元素事件<br>
      组件事件<br>
      指令事件
    </td>
    <td>
      <code>click</code>、<code>deleteRequest</code> 和 <code>myClick</code>，代码如下：
      <code-example path="template-syntax/src/app/app.component.html" region="event-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      Two-way
    </td>
    <td>
      Event and property
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="2-way-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      双向
    </td>
    <td>
      事件与属性
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
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="attribute-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      Attribute
    </td>
    <td>
      Attribute
      (少数特例情况)
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="attribute-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      Class
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
      类
    </td>
    <td>
      <code>class</code> 属性
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="class-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      Style
    </td>
    <td>
      <code>style</code> property
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="style-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      样式
    </td>
    <td>
      <code>style</code> 属性
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="style-binding-syntax-1"></code-example>
    </td>
  </tr>
</table>
