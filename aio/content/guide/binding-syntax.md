# Binding syntax

# 绑定语法：概述

Data binding automatically keeps your page up-to-date based on your application's state.
You use data binding to specify things such as the source of an image, the state of a button, or data for a particular user.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码段的工作示例，请参阅<live-example></live-example>。

</div>


## Data binding and HTML

Developers can customize HTML by specifying attributes with string values.
In the following example, `class`, `src`, and `disabled` modify the `<div>`, `<img>`, and `<button>` elements respectively.

```html
<div class="special">Plain old HTML</div>
<img src="images/item.png">
<button disabled>Save</button>
```

Use data binding to control things like the state of a button:

<code-example path="binding-syntax/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Notice that the binding is to the `disabled` property of the button's DOM element, not the attribute.
Data binding works with properties of DOM elements, components, and directives, not HTML attributes.

{@a html-attribute-vs-dom-property}

### HTML attributes and DOM properties

Angular binding distinguishes between HTML attributes and DOM properties.

Attributes initialize DOM properties and you can configure them to modify an element's behavior.
Properties are features of DOM nodes.

* A few HTML attributes have 1:1 mapping to properties; for example, `id`.

* Some HTML attributes don't have corresponding properties; for example, `aria-*`.

* Some DOM properties don't have corresponding attributes; for example, `textContent`.

<div class="alert is-important">

Remember that HTML attributes and DOM properties are different things, even when they have the same name.

</div>

In Angular, the only role of HTML attributes is to initialize element and directive state.

When you write a data binding, you're dealing exclusively with the DOM properties and events of the target object.

#### Example 1: an `<input>`

When the browser renders `<input type="text" value="Sarah">`, it creates a
corresponding DOM node with a `value` property and initializes that `value` to "Sarah".

```html
<input type="text" value="Sarah">
```

When the user enters `Sally` into the `<input>`, the DOM element `value` property becomes `Sally`.
However, if you look at the HTML attribute `value` using `input.getAttribute('value')`, you can see that the attribute remains unchanged&mdash;it returns "Sarah".

The HTML attribute `value` specifies the initial value; the DOM `value` property is the current value.

To see attributes versus DOM properties in a functioning app, see the <live-example name="binding-syntax"></live-example> especially for binding syntax.

#### Example 2: a disabled button

A button's `disabled` property is `false` by default so the button is enabled.

When you add the `disabled` attribute, you are initializing the button's `disabled` property to `true` which disables the button.

```html
<button disabled>Test Button</button>
```

Adding and removing the `disabled` attribute disables and enables the button.
However, the value of the attribute is irrelevant, which is why you cannot enable a button by writing `<button disabled="false">Still Disabled</button>`.

To control the state of the button, set the `disabled` property instead.

#### Property and attribute comparison

Though you could technically set the `[attr.disabled]` attribute binding, the values are different in that the property binding must be a boolean value, while its corresponding attribute binding relies on whether the value is `null` or not.
Consider the following:

```html
<input [disabled]="condition ? true : false">
<input [attr.disabled]="condition ? 'disabled' : null">
```

The first line, which uses the `disabled` property, uses a boolean value.
The second line, which uses the disabled attribute checks for `null`.

Generally, use property binding over attribute binding as a boolean value is easy to read, the syntax is shorter, and a property is more performant.

To see the `disabled` button example in a functioning application, see the <live-example></live-example>.
This example shows you how to toggle the disabled property from the component.


## Types of data binding

Angular provides three categories of data binding according to the direction of data flow:

* From the source to view
* From view to source
* In a two way sequence of view to source to view

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

The binding punctuation of `[]`, `()`, `[()]`, and the prefix specify the direction of data flow.

* Use `[]` to bind from source to view.
* Use `()` to bind from view to source.
* Use `[()]` to bind in a two way sequence of view to source to view.


Place the expression or statement to the right of the equal sign within double quotes, `""`.
For more information see [Interpolation](guide/interpolation) and [Template statements](guide/template-statements).

## Binding types and targets

## 绑定类型和目标

The target of a data binding can be a property, an event, or an attribute name.
Every public member of a source directive is automatically available for binding in a template expression or statement.
The following table summarizes the targets for the different binding types.

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
