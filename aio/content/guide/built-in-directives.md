# Built-in directives

# 内置指令

Angular offers two kinds of built-in directives: [_attribute_ directives](guide/attribute-directives) and [_structural_ directives](guide/structural-directives).

Angular 提供了两种内置指令[*属性型*指令](guide/attribute-directives)和[*结构型*指令](guide/structural-directives)。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

要查看包含本指南中代码的可工作范例，请参阅<live-example></live-example>。

</div>

For more detail, including how to build your own custom directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives).

欲知详情，包括如何构建你自己的自定义指令，请参阅[属性型指令](guide/attribute-directives)和[结构型指令](guide/structural-directives)。

<hr/>

{@a attribute-directives}

## Built-in attribute directives

## 内置属性型指令

Attribute directives listen to and modify the behavior of
other HTML elements, attributes, properties, and components.
You usually apply them to elements as if they were HTML attributes, hence the name.

属性型指令会监听并修改其它 HTML 元素和组件的行为、Attribute 和 Property。
它们通常被应用在元素上，就好像它们是 HTML 属性一样，因此得名属性型指令。

Many NgModules such as the [`RouterModule`](guide/router "Routing and Navigation")
and the [`FormsModule`](guide/forms "Forms") define their own attribute directives.
The most common attribute directives are as follows:

许多 NgModule（例如 [`RouterModule`](guide/router "路由和导航") 和 [`FormsModule`](guide/forms "表单") 都定义了自己的属性型指令。最常见的属性型指令如下：

* [`NgClass`](guide/built-in-directives#ngClass)&mdash;adds and removes a set of CSS classes.

  [`NgClass`](guide/built-in-directives#ngClass) —— 添加和删除一组 CSS 类。

* [`NgStyle`](guide/built-in-directives#ngStyle)&mdash;adds and removes a set of HTML styles.

  [`NgStyle`](guide/built-in-directives#ngStyle) —— 添加和删除一组 HTML 样式。

* [`NgModel`](guide/built-in-directives#ngModel)&mdash;adds two-way data binding to an HTML form element.

  [`NgModel`](guide/built-in-directives#ngModel) —— 将数据双向绑定添加到 HTML 表单元素。

<hr/>

{@a ngClass}

## `NgClass`

Add or remove several CSS classes simultaneously with `ngClass`.

用 `ngClass` 同时添加或删除几个 CSS 类。

<code-example path="built-in-directives/src/app/app.component.html" region="special-div" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

To add or remove a *single* class, use [class binding](guide/attribute-binding#class-binding) rather than `NgClass`.

要添加或删除*单个*类，请使用[类绑定](guide/attribute-binding#class-binding)而不是 `NgClass`。

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

## `NgStyle`

Use `NgStyle` to set many inline styles simultaneously and dynamically, based on the state of the component.

使用 `NgStyle` 根据组件的状态同时动态设置多个内联样式。

### Without `NgStyle`

### 不用 `NgStyle`

For context, consider setting a *single* style value with [style binding](guide/attribute-binding#style-binding), without `NgStyle`.

有些情况下，要考虑使用[样式绑定](guide/attribute-binding#style-binding)来设置*单个*样式值，而不使用 `NgStyle`。

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

## `[(ngModel)]`: Two-way binding

## `[(ngModel)]` ：双向绑定

The `NgModel` directive allows you to display a data property and
update that property when the user makes changes. Here's an example:

`NgModel` 指令允许你显示数据属性并在用户进行更改时更新该属性。这是一个例子：

<code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel example)" region="NgModel-1"></code-example>

### Import `FormsModule` to use `ngModel`

### 导入 `FormsModule` 以使用 `ngModel`

Before using the `ngModel` directive in a two-way data binding,
you must import the `FormsModule` and add it to the NgModule's `imports` list.
Learn more about the `FormsModule` and `ngModel` in [Forms](guide/forms#ngModel).

要想在双向数据绑定中使用 `ngModel` 指令，必须先导入 `FormsModule` 并将其添加到 NgModule 的 `imports` 列表中。要了解关于 `FormsModule` 和 `ngModel` 的更多信息，参阅[表单](guide/forms#ngModel)一章。

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

### `NgModel` and value accessors

### `NgModel` 和值访问器

The details are specific to each kind of element and therefore the `NgModel` directive only works for an element
supported by a [ControlValueAccessor](api/forms/ControlValueAccessor)
that adapts an element to this protocol.
Angular provides *value accessors* for all of the basic HTML form elements and the
[Forms](guide/forms) guide shows how to bind to them.

这些技术细节是针对每种具体元素的，因此 `NgModel` 指令仅适用于通过 [ControlValueAccessor](api/forms/ControlValueAccessor) 适配过这种协议的元素。Angular 已经为所有基本的 HTML 表单元素提供了*值访问器*，[表单](guide/forms)一章示范了如何绑定到它们。

You can't apply `[(ngModel)]` to a non-form native element or a
third-party custom component until you write a suitable value accessor. For more information, see
the API documentation on [DefaultValueAccessor](api/forms/DefaultValueAccessor).

在编写适当的值访问器之前，不能将 `[(ngModel)]` 应用于非表单的原生元素或第三方自定义组件。欲知详情，参阅[DefaultValueAccessor](api/forms/DefaultValueAccessor)上的 API 文档。

You don't need a value accessor for an Angular component that
you write because you can name the value and event properties
to suit Angular's basic [two-way binding syntax](guide/two-way-binding)
and skip `NgModel` altogether.
The `sizer` in the
[Two-way Binding](guide/two-way-binding) section is an example of this technique.

你不一定非用为所编写的 Angular 组件提供值访问器，因为你还可以把值属性和事件属性命名为符合 Angular 的基本[双向绑定语法](guide/two-way-binding)的形式，并完全跳过 `NgModel`。[双向绑定](guide/two-way-binding)部分的 `sizer` 是此技术的一个范例。

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

* [`NgIf`](guide/built-in-directives#ngIf)&mdash;conditionally creates or destroys subviews from the template.

  [`NgIf`](guide/built-in-directives#ngIf) —— 从模板中创建或销毁子视图。

* [`NgFor`](guide/built-in-directives#ngFor)&mdash;repeat a node for each item in a list.

  [`NgFor`](guide/built-in-directives#ngFor) —— 为列表中的每个条目重复渲染一个节点。

* [`NgSwitch`](guide/built-in-directives#ngSwitch)&mdash;a set of directives that switch among alternative views.

  [`NgSwitch`](guide/built-in-directives#ngSwitch) —— 一组在备用视图之间切换的指令。

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

* Why you [can only apply one structural directive](guide/structural-directives#one-per-element "one per host element") to an element.

   为什么你[只能往一个元素上应用一个结构型指令](guide/structural-directives#one-per-element "one per host element")。

</div>

<hr/>

{@a ngIf}

## NgIf

You can add or remove an element from the DOM by applying an `NgIf` directive to
a host element.
Bind the directive to a condition expression like `isActive` in this example.

你可以通过将 `NgIf` 指令应用在宿主元素上来从 DOM 中添加或删除元素。在此范例中，将指令绑定到了条件表达式，例如 `isActive`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Don't forget the asterisk (`*`) in front of `ngIf`. For more information
on the asterisk, see the [asterisk (*) prefix](guide/structural-directives#the-asterisk--prefix) section of
[Structural Directives](guide/structural-directives).

不要忘了 `ngIf` 前面的星号（`*`）。关于星号的更多信息，请参阅 [结构型指令](guide/structural-directives)中的[星号（\*）前缀](guide/structural-directives#the-asterisk--prefix)部分。

</div>

When the `isActive` expression returns a truthy value, `NgIf` adds the
`ItemDetailComponent` to the DOM.
When the expression is falsy, `NgIf` removes the `ItemDetailComponent`
from the DOM, destroying that component and all of its sub-components.

当 `isActive` 表达式返回真值时，`NgIf` 会把 `ItemDetailComponent` 添加到 DOM 中。当表达式为假值时，`NgIf` 将从 DOM 中删除 `ItemDetailComponent`，从而销毁该组件及其所有子组件。

### Show/hide vs. `NgIf`

### 显示/隐藏与 `NgIf`

Hiding an element is different from removing it with `NgIf`.
For comparison, the following example shows how to control
the visibility of an element with a
[class](guide/attribute-binding#class-binding) or [style](guide/attribute-binding#style-binding) binding.

隐藏元素与使用 `NgIf` 删除元素不同。为了进行比较，下面的范例演示如何使用[类](guide/attribute-binding#class-binding)或[样式](guide/attribute-binding#style-binding)绑定来控制元素的可见性。

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

关于 `NgIf` 和 `ngIfElse` 的更多信息，请参阅 [关于 NgIf 的 API 文档](api/common/NgIf)。

</div>

### Guard against null

### 防范空指针错误

Another advantage of `ngIf` is that you can use it to guard against null. Show/hide
is best suited for very simple use cases, so when you need a guard, opt instead for `ngIf`. Angular will throw an error if a nested expression tries to access a property of `null`.

`ngIf` 另一个优点是你可以使用它来防范空指针错误。显示/隐藏就是最合适的极简用例，当你需要防范时，请改用 `ngIf` 代替。如果其中嵌套的表达式尝试访问 `null` 的属性，Angular 将引发错误。

The following shows `NgIf` guarding two `<div>`s.
The `currentCustomer` name appears only when there is a `currentCustomer`.
The `nullCustomer` will not be displayed as long as it is `null`.

下面的例子中 `NgIf` 保护着两个 `<div>`。仅当存在 `currentCustomer` 时，才会显示 `currentCustomer` 名称。除非它为 `null` 否则不会显示 `nullCustomer`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>

<hr/>

{@a ngFor}

## `NgFor`

`NgFor` is a repeater directive&mdash;a way to present a list of items.
You define a block of HTML that defines how a single item should be displayed
and then you tell Angular to use that block as a template for rendering each item in the list.
The text assigned to `*ngFor` is the instruction that guides the repeater process.

`NgFor` 是一个重复器指令 —— 一种用来显示条目列表的方法。你定义了一个 HTML 块，该 HTML 块定义了应如何显示单个条目，然后告诉 Angular 以该块为模板来渲染列表中的每个条目。赋值给 `*ngFor` 的文本是用来指导重复器工作过程的指令。

The following example shows `NgFor` applied to a simple `<div>`.

以下范例显示了如何将 `NgFor` 应用于简单的 `<div>`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Don't forget the asterisk (`*`) in front of `ngFor`. For more information
on the asterisk, see the [asterisk (*) prefix](guide/structural-directives#the-asterisk--prefix) section of
[Structural Directives](guide/structural-directives).

不要忘了 `ngFor` 前面的星号（`*`）。关于星号的更多信息，请参阅[结构型指令](guide/structural-directives)中的[星号（\*）前缀](guide/structural-directives#the-asterisk--prefix)部分。

</div>

You can also apply an `NgFor` to a component element, as in the following example.

你还可以将 `NgFor` 应用于组件元素，如以下范例所示。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>

{@a microsyntax}

<div class="callout is-critical">

<header>*ngFor microsyntax</header>

<header>`*ngFor` 微语法</header>

The string assigned to `*ngFor` is not a [template expression](guide/interpolation). Rather,
it's a *microsyntax*&mdash;a little language of its own that Angular interprets.
The string `"let item of items"` means:

赋值给 `*ngFor` 的字符串不是[模板表达式](guide/interpolation)。而是一个*微语法* —— 由 Angular 解释的一种小型语言。字符串 `"let item of items"` 的意思是：

> *Take each item in the `items` array, store it in the local `item` looping variable, and
make it available to the templated HTML for each iteration.*

> *将 `items` 数组中的每个条目存储在局部循环变量 `item` 中，并使其可用于每次迭代的模板 HTML 中。*

Angular translates this instruction into an `<ng-template>` around the host element,
then uses this template repeatedly to create a new set of elements and bindings for each `item`
in the list.
For more information about microsyntax, see the [Structural Directives](guide/structural-directives#microsyntax) guide.

Angular 将该指令转换为包裹着宿主元素的 `<ng-template>`，然后反复使用此模板为列表中的每个 `item` 创建一组新的元素和绑定。关于微语法的更多信息，请参阅[结构型指令](guide/structural-directives#microsyntax)一章。

</div>

{@a template-input-variable}

{@a template-input-variables}

### Template input variables

### 模板输入变量

The `let` keyword before `item` creates a template input variable called `item`.
The `ngFor` directive iterates over the `items` array returned by the parent component's `items` property
and sets `item` to the current item from the array during each iteration.

`item` 前面的 `let` 关键字创建了一个名为 `item` 的模板输入变量。`ngFor` 指令迭代父组件的 `items` 属性所返回的 `items` 数组，并在每次迭代期间将 `item` 设置为该数组中的当前条目。

Reference `item` within the `ngFor` host element
as well as within its descendants to access the item's properties.
The following example references `item` first in an interpolation
and then passes in a binding to the `item` property of the `<app-item-detail>` component.

`ngFor` 的宿主元素及其后代中可引用 `item`，来访问该条目的属性。以下范例首先在插值中引用 `item`，然后把一个绑定表达式传入 `<app-item-detail>` 组件的 `item` 属性。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

For more information about template input variables, see
[Structural Directives](guide/structural-directives#template-input-variable).

关于模板输入变量的更多信息，请参阅[结构型指令](guide/structural-directives#template-input-variable)。

### `*ngFor` with `index`

### `*ngFor` 与 `index`

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

### *ngFor with `trackBy`

### 带 `trackBy` 的 `*ngFor`

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

`NgSwitch` 实际上是三个协作指令的集合： `NgSwitch`，`NgSwitchCase` 和 `NgSwitchDefault`，如以下范例所示。

 <code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch" header="src/app/app.component.html"></code-example>

<div class="lightbox">

  <img src="generated/images/guide/built-in-directives/ngswitch.gif" alt="Animation of NgSwitch">

</div>

`NgSwitch` is the controller directive. Bind it to an expression that returns
the *switch value*, such as `feature`. Though the `feature` value in this
example is a string, the switch value can be of any type.

`NgSwitch` 是控制器指令。把它绑定到一个返回*开关值*的表达式，例如 `feature`。尽管此范例中的 `feature` 值是字符串，但开关值可以是任何类型。

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
Each component has an `item` [input property](guide/inputs-outputs#input "Input property")
which is bound to the `currentItem` of the parent component.

开关指令对于添加和删除*组件元素*特别有用。本范例在 `item-switch.components.ts` 文件中定义的四个 `item` 组件之间切换。每个组件都有一个名叫 `item` 的[输入属性](guide/inputs-outputs "输入属性")，它会绑定到父组件的 `currentItem`。

Switch directives work as well with native elements and web components too.
For example, you could replace the `<app-best-item>` switch case with the following.

开关指令也同样适用于原生元素和 Web Component。
比如，你可以把 `<app-best-item>` 分支替换为如下代码。

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch-div" header="src/app/app.component.html"></code-example>

<hr/>
