# Binding syntax: an overview

# 绑定语法：概述

Data-binding is a mechanism for coordinating what users see, specifically
with application data values.
While you could push values to and pull values from HTML,
the application is easier to write, read, and maintain if you turn these tasks over to a binding framework.
You simply declare bindings between binding sources, target HTML elements, and let the framework do the rest.

数据绑定是一种机制，用来协调用户可见的内容，特别是应用数据的值。
虽然也可以手动从 HTML 中推送或拉取这些值，但是如果将这些任务转交给绑定框架，应用就会更易于编写、阅读和维护。
你只需声明数据源和目标 HTML 元素之间的绑定关系就可以了，框架会完成其余的工作。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码段的工作示例，请参阅<live-example></live-example>。

</div>

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

{@a html-attribute-vs-dom-property}

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
Comparing the [`<td>` attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) to the [`<td>` properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) provides a helpful example for differentiation.
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

Though you could technically set the `[attr.disabled]` attribute binding, the values are different in that the property binding requires to be a boolean value, while its corresponding attribute binding relies on whether the value is `null` or not. Consider the following:

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

## 绑定类型和目标

The **target of a data-binding** is something in the DOM.
Depending on the binding type, the target can be a property (element, component, or directive),
an event (element, component, or directive), or sometimes an attribute name.
The following table summarizes the targets for the different binding types.

**数据绑定**的目标是 DOM 中的某些东西。根据绑定类型，目标可以是属性（元素，组件或指令），事件（元素，组件或指令）或有时是属性名称。下表总结了不同绑定类型的目标。

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
      <!-- KW--Why don't these links work in the table? -->
      <!-- <div>For more information, see [Event Binding](guide/event-binding).</div> -->
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
      <!-- KW--Why don't these links work in the table? -->
      <!-- <div>For more information, see [Event Binding](guide/event-binding).</div> -->
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

