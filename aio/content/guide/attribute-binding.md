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

When the expression resolves to `null` or `undefined`, Angular removes the attribute altogether.

当表达式解析为 `null` 或 `undefined` 时，Angular 会完全删除该 Attribute。

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
The expression can be one of:

要绑定到多个类，请使用 `[class]` 来设置表达式 - 例如，`[class]="classExpression"`，此表达式可以取如下值：

* A space-delimited string of class names.

  用空格分隔的类名字符串

* An object with class names as the keys and truthy or falsy expressions as the values.

  以类名作为键名并将真或假表达式作为值的对象。

* An array of class names.

  类名的数组。

With the object format, Angular adds a class only if its associated value is truthy.

对于对象格式，Angular 会在其关联的值为真时才添加类。

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
    <td><code>Record&lt;string, boolean | undefined | null&gt;</code></td>
    <td><code>{foo: true, bar: false}</code></td>
  </tr>
  <tr>
    <td><code>Array</code><<code>string</code>></td>
    <td><code>['foo', 'bar']</code></td>
  </tr>
</table>

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

<code-example language="html">
  &lt;nav [style.background-color]="expression"&gt;&lt;/nav&gt;

  &lt;nav [style.backgroundColor]="expression"&gt;&lt;/nav&gt;
</code-example>

</div>

### Binding to multiple styles

### 绑定到多个样式

To toggle multiple styles, bind to the `[style]` attribute&mdash;for example, `[style]="styleExpression"`.
The `styleExpression` can be one of:

要切换多个样式，请绑定到 `[style]` Attribute，例如 `[style]="styleExpression"` 。`styleExpression` 可以是如下格式之一：

* A string list of styles such as `"width: 100px; height: 100px; background-color: cornflowerblue;"`.

  样式的字符串列表，例如 `"width: 100px; height: 100px; background-color: cornflowerblue;"`。

* An object with style names as the keys and style values as the values, such as `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`.

  一个对象，其键名是样式名，其值是样式值，比如 `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`。

Note that binding an array to `[style]` is not supported.

注意，不支持把数组绑定给 `[style]`。

<div class="alert is-important">

When binding `[style]` to an object expression, the identity of the object must change for Angular to update the class list.
Updating the property without changing object identity has no effect.

当把 `[style]` 绑定到对象表达式时，该对象的引用必须改变，这样 Angular 才能更新这个类列表。在不改变对象引用的情况下更新其属性值是不会生效的。

</div>

#### Single and multiple-style binding example

#### 单样式和多样式绑定示例

<code-example path="attribute-binding/src/app/single-and-multiple-style-binding.component.ts" header="nav-bar.component.ts">
</code-example>

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
    <td rowspan=2>Multi-style binding</td>
    <td rowspan=2><code>[style]="styleExpression"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
    <tr>
    <td rowspan=2>多重样式绑定</td>
    <td rowspan=2><code>[style]="styleExpression"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
  <tr>
    <td><code>Record&lt;string, string | undefined | null&gt;</code></td>
    <td><code>{width: '100px', height: '100px'}</code></td>
  </tr>
</table>

<div class="alert is-helpful">

The [NgStyle](guide/built-in-directives/#ngstyle) directive can be used as an alternative to direct `[style]` bindings.
However, using the above style binding syntax without `NgStyle` is preferred because due to improvements in style binding in Angular, `NgStyle` no longer provides significant value, and might eventually be removed in the future.

[NgStyle](guide/built-in-directives/#ngstyle)指令可以用作代替直接绑定 `[style]` 的方法。但是，最好使用上述不用 `NgStyle` 的绑定语法，因为由于 Angular 中样式绑定的改进，`NgStyle` 不再提供显著价值，将来可能会被删除。

</div>

{@a styling-precedence}
## Styling Precedence

## 样式优先级

A single HTML element can have its CSS class list and style values bound to multiple sources (for example, host bindings from multiple directives).

一个 HTML 元素可以将其 CSS 类列表和样式值绑定到多个源（例如，来自多个指令的宿主绑定）。

When there are multiple bindings to the same class name or style property, Angular uses a set of precedence rules to resolve conflicts and determine which classes or styles are ultimately applied to the element.

当有多个到相同的类名或样式属性的绑定时，Angular 使用一组优先规则来解决冲突并确定最终将哪些类或样式应用于元素。

<div class="alert is-helpful">
<h4>Styling precedence (highest to lowest)</h4>
<h4>样式优先级（从高到低）</h4>

1. Template bindings

   模板绑定

    1. Property binding (for example, `<div [class.foo]="hasFoo">` or `<div [style.color]="color">`)

       属性绑定（例如，`<div [class.foo]="hasFoo">` 或 `<div [style.color]="color">` ）

    1. Map binding (for example, `<div [class]="classExpr">` or `<div [style]="styleExpr">`)

       映射表绑定（例如，`<div [class]="classExpr">` 或 `<div [style]="styleExpr">` ）

    1. Static value (for example, `<div class="foo">` or `<div style="color: blue">`)

       静态值（例如 `<div class="foo">` 或 `<div style="color: blue">` ）

1. Directive host bindings

   指令宿主绑定

    1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)

       属性绑定（例如，`host: {'[class.foo]': 'hasFoo'}` 或 `host: {'[style.color]': 'color'}` ）

    1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)

       映射表绑定（例如，`host: {'[class]': 'classExpr'}` 或 `host: {'[style]': 'styleExpr'}` ）

    1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)

       静态值（例如，`host: {'class': 'foo'}` 或 `host: {'style': 'color: blue'}` ）

1. Component host bindings

   组件宿主绑定

    1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)

       属性绑定（例如，`host: {'[class.foo]': 'hasFoo'}` 或 `host: {'[style.color]': 'color'}` ）

    1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)

       映射表绑定（例如，`host: {'[class]': 'classExpr'}` 或 `host: {'[style]': 'styleExpr'}` ）

    1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)

       静态值（例如，`host: {'class': 'foo'}` 或 `host: {'style': 'color: blue'}` ）

</div>

The more specific a class or style binding is, the higher its precedence.

总之，类或样式绑定越具体，其优先级就越高。

A binding to a specific class (for example, `[class.foo]`) will take precedence over a generic `[class]` binding, and a binding to a specific style (for example, `[style.bar]`) will take precedence over a generic `[style]` binding.

绑定到具体类（例如 `[class.foo]` ）将优先于不特定 `[class]` 的绑定，并且绑定到特定样式（例如 `[style.bar]` ）将优先于不特定 `[style]` 的绑定。

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

Specificity rules also apply when it comes to bindings that originate from different sources.
It's possible for an element to have bindings in the template where it's declared, from host bindings on matched directives, and from host bindings on matched components.

当涉及不同来源的绑定时，也适用这些特异性规则。元素可能具有在其声明的模板中的绑定、在其匹配的指令中的宿主绑定、在其匹配的组件中的宿主绑定。

Template bindings are the most specific because they apply to the element directly and exclusively, so they have the highest precedence.

模板绑定是最具体的，因为它们会直接且排他地应用于元素，因此它们具有最高的优先级。

Directive host bindings are considered less specific because directives can be used in multiple locations, so they have a lower precedence than template bindings.

指令宿主绑定被认为不太具体，因为指令可以在多个位置使用，因此它们的优先级低于模板绑定。

Directives often augment component behavior, so host bindings from components have the lowest precedence.

指令通常会增强组件的行为，因此组件的宿主绑定具有最低的优先级。

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

In addition, bindings take precedence over static attributes.

此外，绑定会优先于静态属性。

In the following case, `class` and `[class]` have similar specificity, but the `[class]` binding will take precedence because it is dynamic.

在这里，`class` 和 `[class]` 具有相似的特异性，但是 `[class]` 绑定更优先一些，因为它是动态的。

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>

{@a styling-delegation}
### Delegating to styles with lower precedence

### 委托给优先级较低的样式

It is possible for higher precedence styles to "delegate" to lower precedence styles using `undefined` values.
Whereas setting a style property to `null` ensures the style is removed, setting it to `undefined` will cause Angular to fall back to the next-highest precedence binding to that style.

可以用 `undefined` 值来把高优先级的样式“委托”给较低优先级的样式。将样式属性设置为 `null` 可以确保样式被删除，而将其设置为 `undefined` 将导致 Angular 回退到该样式的次高优先级绑定。

For example, consider the following template:

例如，考虑以下模板：

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

Imagine that the `dirWithHostBinding` directive and the `comp-with-host-binding` component both have a `[style.width]` host binding.
In that case, if `dirWithHostBinding` sets its binding to `undefined`, the `width` property will fall back to the value of the `comp-with-host-binding` host binding.
However, if `dirWithHostBinding` sets its binding to `null`, the `width` property will be removed entirely.

假设 `dirWithHostBinding` 指令和 `comp-with-host-binding` 组件都具有 `[style.width]` 宿主绑定。在这里，如果 `dirWithHostBinding` 将其绑定设置为 `undefined` ，则 `width` 属性将回退到 `comp-with-host-binding` 宿主绑定的值。但是，如果 `dirWithHostBinding` 将其绑定设置为 `null` ，则会完全删除 `width`

## Injecting attribute values

## 注入属性值

There are cases where you need to differentiate the behavior of a [Component](api/core/Component) or [Directive](api/core/Directive) based on a static value set on the host element as an HTML attribute. For example, you might have a directive that needs to know the `type` of a `<button>` or `<input>` element.

在某些情况下，你需要根据在 host 元素上以 HTML 属性的形式设置的静态值来区分[组件](api/core/Component)或[指令](api/core/Directive)的行为。例如，你可能有一个指令，需要知道 `<button>` 或 `<input>` 元素的 `type` 值。

The [Attribute](api/core/Attribute) parameter decorator is great for passing the value of an HTML attribute to a component/directive constructor via [dependency injection](guide/dependency-injection).

[Attribute](api/core/Attribute)参数装饰器非常适合通过[依赖注入](guide/dependency-injection)来将 HTML 属性的值传递给组件/指令构造函数。

<div class="alert is-helpful">

  The injected value captures the value of the specified HTML attribute at that moment.
  Future updates to the attribute value are not reflected in the injected value.

  这里注入的值将捕获指定 HTML 属性的当前值。将来对属性值的修改不会反映到注入的值中。

</div>

<code-example
  path="attribute-binding/src/app/my-input-with-attribute-decorator.component.ts"
  header="src/app/my-input-with-attribute-decorator.component.ts">
</code-example>

<code-example
  path="attribute-binding/src/app/app.component.html"
  region="attribute-decorator"
  header="src/app/app.component.html">
</code-example>

In the preceding example, the result of `app.component.html` is **The type of the input is: number**.

在前面的示例中，`app.component.html`的结果为：**The type of the input is: number**。

Another example is the [RouterOutlet](api/router/RouterOutlet) directive, which makes use of the [Attribute](api/core/Attribute) decorator to retrieve the unique [name](api/router/RouterOutlet#description) on each outlet.

另一个示例是[RouterOutlet](api/router/RouterOutlet)指令，该指令利用 [Attribute](api/core/Attribute) 装饰器检索每个路由插座上的唯一[名称。](api/router/RouterOutlet#description)

<div class="callout is-helpful">

  <header>@Attribute() vs @Input()</header>

  Remember, use [@Input()](api/core/Input) when you want to keep track of the attribute value and update the associated property. Use [@Attribute()](api/core/Attribute) when you want to inject the value of an HTML attribute to a component or directive constructor.

  请记住，要持续跟踪 Attribute 的值并更新关联的 Property 时，请使用 [@Input()](api/core/Input)。若要将 HTML 属性的值注入到组件或指令的构造函数中，请使用[@Attribute()](api/core/Attribute)。

</div>
