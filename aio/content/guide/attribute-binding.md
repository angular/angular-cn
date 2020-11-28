# Attribute, class, and style bindings

# Attribute 绑定、类绑定和样式绑定

Attribute binding in Angular helps you set values for attributes directly.
With attribute binding, you can improve accessibility, style your application dynamically, and manage multiple CSS classes or styles simultaneously.

Angular 中的 Attribute 绑定可帮助你直接设置 Attribute 值。使用 Attribute 绑定，你可以提升无障碍性、动态设置应用程序样式以及同时管理多个 CSS 类或样式。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码片段的可工作示例，请参阅<live-example></live-example>。

</div>

## Binding to an attribute

## 绑定到 Attribute

It is recommended that you set an element property with a [property binding](guide/property-binding) whenever possible.
However, sometimes you don't have an element property to bind.
In those situations, you can use attribute binding.

建议你尽可能设置带有 [Property 绑定](guide/property-binding)的元素的 Property。但是，有时你没有可绑定的元素 Property。在这种情况下，可以使用 Attribute 绑定。

For example, [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) and
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) are purely attributes.
Neither ARIA nor SVG correspond to element properties and don't set element properties.
In these cases, you must use attribute binding because there are no corresponding property targets.

例如，[ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)和[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) 只有 Attribute。 ARIA 和 SVG 都不对应于元素的 Property，也不设置元素的 Property。在这些情况下，必须使用 Attribute 绑定，因为没有相应的目标 Property。

## Syntax

## 语法

Attribute binding syntax resembles [property binding](guide/property-binding), but instead of an element property between brackets, you precede the name of the attribute with the prefix `attr`, followed by a dot.
Then, you set the attribute value with an expression that resolves to a string.

Attribute 绑定语法类似于 [Property 绑定](guide/property-binding)，但不是直接在方括号之间放置元素的 Property，而是在 Attribute 名称前面加上前缀 `attr`，后跟一个点 `.`。然后，使用解析为字符串的表达式设置 Attribute 值。

<code-example language="html">

 &lt;p [attr.attribute-you-are-targeting]="expression"&gt;&lt;/p&gt;

</code-example>

<div class="alert is-helpful">

When the expression resolves to `null`, Angular removes the attribute altogether.

当表达式解析为 `null` 时，Angular 会完全删除该 Attribute。

</div>

## Binding ARIA attributes

## 绑定 ARIA Attribute

One of the primary use cases for attribute binding
is to set ARIA attributes, as in this example:

Attribute 绑定的主要用例之一是设置 ARIA Attribute，如下所示：

<code-example path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria" header="src/app/app.component.html"></code-example>

{@a colspan}

## Binding to `colspan`

## 绑定到 `colspan`

Another common use case for attribute binding is with the `colspan` attribute in tables.
Binding to the `colspan` attribute helps you keep your tables programmatically dynamic.
Depending on the amount of data that your application populates a table with, the number of columns that a row spans could change.

Attribute 绑定的另一个常见用例是绑定到表格中的 `colspan` Attribute。`colspan` Attribute 可帮助你以编程方式让表格保持动态。根据应用中用来填充表的数据量，某一行要跨越的列数可能会发生变化。

To use attribute binding with the `<td>` attribute `colspan`:

要将 Attribute 绑定到 `<td>` 的 `colspan` Attribute：

1. Specify the `colspan` attribute by using the following syntax: `[attr.colspan]`.

   使用以下语法指定 `colspan`：`[attr.colspan]` 。

1. Set `[attr.colspan]` equal to an expression.

   将 `[attr.colspan]` 设置为等于某个表达式。

In the following example, we bind the `colspan` attribute to the expression `1 + 1`.

在下面的示例中，我们将 `colspan` Attribute 绑定到表达式 `1 + 1`。

<code-example path="attribute-binding/src/app/app.component.html" region="colspan" header="src/app/app.component.html"></code-example>

This binding causes the `<tr>` to span two columns.

此绑定会导致 `<tr>` 跨越两列。

<div class="alert is-helpful">

Sometimes there are differences between the name of property and an attribute.

有时，Property 名和 Attribute 名之间存在差异。

`colspan` is an attribute of `<tr>`, while `colSpan`  with a capital "S" is a property.
When using attribute binding, use `colspan` with a lowercase "s".
For more information on how to bind to the `colSpan` property, see the [`colspan` and `colSpan`](guide/property-binding#colspan) section of [Property Binding](guide/property-binding).

`colspan` 是 `<tr>` 的 Attribute，而 `colSpan`（注意 “S” 是大写）是 Property。使用 Attribute 绑定时，请使用带小写 “s” 的 `colspan`。有关如何绑定到 `colSpan` Property 的更多信息，请参见 [Property 绑定](guide/property-binding) 中的 [`colspan` 和 `colSpan`](guide/property-binding#colspan) 部分。

</div>

<hr/>

{@a class-binding}

## Binding to the `class` attribute

## 绑定到 `class` Attribute

You can use class binding to add and remove CSS class names from an element's `class` attribute.

你可以使用类绑定从元素的 `class` Attribute 中添加和删除 CSS 类名称。

### Binding to a single CSS `class`

### 绑定到单个 CSS `class`

To create a single class binding, use the prefix `class` followed by a dot and the name of the CSS class&mdash;for example, `[class.sale]="onSale"`.
Angular adds the class when the bound expression, `onSale` is truthy, and it removes the class when the expression is falsy&mdash;with the exception of `undefined`.
See [styling delegation](guide/style-precedence#styling-delegation) for more information.

要创建单个类绑定，请使用前缀 `class` 后跟一个点和 CSS 类的名称，例如 `[class.sale]="onSale"`。`onSale` 为真值时添加类，在表达式为假值时（`undefined` 除外）删除类。欲知详情，请参见[样式委托](guide/style-precedence#styling-delegation)部分。

### Binding to multiple CSS classes

### 绑定到多个 CSS 类

To bind to multiple classes, use `[class]` set to an expression&mdash;for example, `[class]="classExpression"`.
The expression can be a space-delimited string of class names, or an object with class names as the keys and truthy or falsy expressions as the values.
With an object format, Angular adds a class only if its associated value is truthy.

要绑定到多个类，请使用 `[class]` 来设置表达式 - 例如，`[class]="classExpression"`。表达式可以是用空格分隔的类名字符串，也可以是将类名作为键并将真或假表达式作为值的对象。对于对象格式，Angular 会在其关联的值为真时才添加类。

<div class="alert is-important">

With any object-like expression&mdash;such as `object`, `Array`, `Map`, or `Set`&mdash;the identity of the object must change for Angular to update the class list.
Updating the property without changing object identity has no effect.

对于任何类似对象的表达式（例如 `object`、`Array`、`Map` 或 `Set`，必须更改对象的引用，Angular 才能更新类列表。在不更改对象引用的情况下只更新其 Attribute 是不会生效的。

</div>

If there are multiple bindings to the same class name, Angular uses [styling precedence](guide/style-precedence) to determine which binding to use.

如果同一类名有多个绑定，Angular 会根据[样式优先级](guide/style-precedence)来确定要使用的绑定。

The following table summarizes class binding syntax.

下表是各种类绑定语法的小结。

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
      范例输入值
    </th>
  </tr>
  <tr>
    <td>Single class binding</td>
    <td><code>[class.sale]="onSale"</code></td>
    <td><code>boolean | undefined | null</code></td>
    <td><code>true</code>, <code>false</code></td>
  </tr>
  <tr>
    <td>单一类绑定</td>
    <td><code>[class.sale]="onSale"</code></td>
    <td><code>boolean | undefined | null</code></td>
    <td><code>true</code>, <code>false</code></td>
  </tr>
  <tr>
    <td rowspan=3>Multi-class binding</td>
    <td rowspan=3><code>[class]="classExpression"</code></td>
    <td><code>string</code></td>
    <td><code>"my-class-1 my-class-2 my-class-3"</code></td>
  </tr>
  <tr>
    <td rowspan=3>多重类绑定</td>
    <td rowspan=3><code>[class]="classExpression"</code></td>
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

<hr/>

{@a style-binding}

## Binding to the style attribute

## 绑定到 style Attribute

You can use style binding to set styles dynamically.

你可以使用样式绑定来动态设置样式。

### Binding to a single style

### 绑定到单一样式

To create a single style binding, use the prefix `style` followed by a dot and the name of the CSS style property&mdash;for example, `[style.width]="width"`.
Angular sets the property to the value of the bound expression, which is usually a string.
Optionally, you can add a unit extension like `em` or `%`, which requires a number type.

要创建对单个样式的绑定，请使用前缀 `style` 后跟一个点和 CSS style Attribute 的名称，例如 `[style.width]="width"`。 Angular 会将该 Attribute 设置为绑定表达式的值，这个值通常是一个字符串。（可选）你还可以添加单位扩展，例如 `em` 或 `%` ，它的值需要数字类型。

<div class="alert is-helpful">

You can write a style property name in either [dash-case](guide/glossary#dash-case), or
[camelCase](guide/glossary#camelcase).

你可以用[中线格式](guide/glossary#dash-case)或 [camelCase 格式](guide/glossary#camelcase)编写样式 Attribute 名。

</div>

### Binding to multiple styles

### 绑定到多个样式

To toggle multiple styles, bind to the `[style]` attribute&mdash;for example, `[style]="styleExpression"`.
The expression is often a string list of styles such as `"width: 100px; height: 100px;"`.

要切换多个样式，请绑定到 `[style]` Attribute，例如 `[style]="styleExpression"` 。该表达式通常是样式的字符串列表，例如 `"width: 100px; height: 100px;"` 。

You can also format the expression as an object with style names as the keys and style values as the values, such as `{width: '100px', height: '100px'}`.

你还可以将表达式格式化为对象，此对象以样式名作为键、以样式值作为值，例如 `{width: '100px', height: '100px'}`。

<div class="alert is-important">

With any object-like expression&mdash;such as `object`, `Array`, `Map`, or `Set`&mdash;the identity of the object must change for Angular to update the class list.
Updating the property without changing object identity has no effect.

对于任何类似对象的表达式（例如 `object`、`Array`、`Map` 或 `Set`，必须更改对象的引用，Angular 才能更新类列表。在不更改对象引用的情况下更新其 Attribute 值是不会生效的。

</div>

If there are multiple bindings to the same style attribute, Angular uses [styling precedence](guide/style-precedence) to determine which binding to use.

如果同一个样式 Attribute 有多个绑定，Angular 将使用[样式优先级](guide/style-precedence)来确定要使用的绑定。

The following table summarizes style binding syntax.

下表是各种样式绑定语法的小结。

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
      输入属性
    </th>
    <th>
      范例输入值
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
    <td rowspan=3><code>[style]="styleExpression"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
    <tr>
    <td rowspan=3>多重样式绑定</td>
    <td rowspan=3><code>[style]="styleExpression"</code></td>
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
