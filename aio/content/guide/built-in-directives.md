# Built-in directives

# 内置指令

Directives are classes that add additional behavior to elements
in your Angular applications.
With Angular's built-in directives, you can manage forms, lists, styles, and what users see.

指令是为 Angular 应用程序中的元素添加额外行为的类。使用 Angular 的内置指令，你可以管理表单、列表、样式以及要让用户看到的任何内容。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

要查看包含本指南中代码的可工作范例，请参阅<live-example></live-example>。

</div>

The different types of Angular directives are as follows:

Angular 指令的不同类型如下：

1. [Components](guide/component-overview)&mdash;directives with a template.
  This type of directive is the most common directive type.

   [组件](guide/component-overview) —— 带有模板的指令。这种指令类型是最常见的指令类型。

1. [Attribute directives](guide/built-in-directives#built-in-attribute-directives)&mdash;directives that change the appearance or behavior of an element, component, or another directive.

   [属性型指令](guide/built-in-directives#built-in-attribute-directives) —— 更改元素、组件或其他指令的外观或行为的指令。

1. [Structural directives](guide/built-in-directives#built-in-structural-directives)&mdash;directives that change the DOM layout by adding and removing DOM elements.

   [结构型指令](guide/built-in-directives#built-in-structural-directives) —— 通过添加和删除 DOM 元素来更改 DOM 布局的指令。

This guide covers built-in [attribute directives](guide/built-in-directives#built-in-attribute-directives) and [structural directives](guide/built-in-directives#built-in-structural-directives).

本指南涵盖了内置的[属性型指令](guide/built-in-directives#built-in-attribute-directives)和[结构型指令](guide/built-in-directives#built-in-structural-directives)。

{@a attribute-directives}

## Built-in attribute directives

## 内置属性型指令

Attribute directives listen to and modify the behavior of other HTML elements, attributes, properties, and components.

属性型指令会监听并修改其它 HTML 元素和组件的行为、Attribute 和 Property。

Many NgModules such as the [`RouterModule`](guide/router "Routing and Navigation") and the [`FormsModule`](guide/forms "Forms") define their own attribute directives.
The most common attribute directives are as follows:

许多 NgModule（例如 [`RouterModule`](guide/router "路由和导航") 和 [`FormsModule`](guide/forms "表单") 都定义了自己的属性型指令。最常见的属性型指令如下：

* [`NgClass`](guide/built-in-directives#ngClass)&mdash;adds and removes a set of CSS classes.

  [`NgClass`](guide/built-in-directives#ngClass) —— 添加和删除一组 CSS 类。

* [`NgStyle`](guide/built-in-directives#ngstyle)&mdash;adds and removes a set of HTML styles.

  [`NgStyle`](guide/built-in-directives#ngstyle) —— 添加和删除一组 HTML 样式。

* [`NgModel`](guide/built-in-directives#ngModel)&mdash;adds two-way data binding to an HTML form element.

  [`NgModel`](guide/built-in-directives#ngModel) —— 将数据双向绑定添加到 HTML 表单元素。

{@a ngClass}
## Adding and removing classes with `NgClass`

## 用 `NgClass` 添加和删除类

You can add or remove multiple CSS classes simultaneously with `ngClass`.

用 `ngClass` 同时添加或删除多个 CSS 类。

<div class="alert is-helpful">

To add or remove a *single* class, use [class binding](guide/attribute-binding#class-binding) rather than `NgClass`.

要添加或删除*单个*类，请使用[类绑定](guide/attribute-binding#class-binding)而不是 `NgClass`。

</div>

### Using `NgClass` with an expression

### 将 `NgClass` 与表达式一起使用

On the element you'd like to style, add `[ngClass]` and set it equal to an expression.
In this case, `isSpecial` is a boolean set to `true` in `app.component.ts`.
Because `isSpecial` is true, `ngClass` applies the class of `special` to the `<div>`.

在要设置样式的元素上，添加 `[ngClass]` 并将其设置为等于某个表达式。在这里，是在 `app.component.ts` 中将 `isSpecial` 设置为布尔值 `true`。因为 `isSpecial` 为 true，所以 `ngClass` 就会把 `special` 类应用于此 `<div>` 上。

<code-example path="built-in-directives/src/app/app.component.html" region="special-div" header="src/app/app.component.html"></code-example>

### Using `NgClass` with a method

### 将 `NgClass` 与方法一起使用

1. To use `NgClass` with a method, add the method to the component class.
  In the following example, `setCurrentClasses()` sets the property `currentClasses` with an object that adds or removes three classes based on the `true` or `false` state of three other component properties.

   要将 `NgClass` 与方法一起使用，请将方法添加到组件类中。在下面的示例中，`setCurrentClasses()` 使用一个对象来设置属性 `currentClasses`，该对象根据另外三个组件属性为 `true` 或 `false` 来添加或删除三个 CSS 类。

  Each key of the object is a CSS class name.
  If a key is `true`, `ngClass` adds the class.
  If a key is `false`, `ngClass` removes the class.

  该对象的每个键（key）都是一个 CSS 类名。如果键为 `true`，则 `ngClass` 添加该类。如果键为 `false`，则 `ngClass` 删除该类。

<code-example path="built-in-directives/src/app/app.component.ts" region="setClasses" header="src/app/app.component.ts"></code-example>

1. In the template, add the `ngClass` property binding to `currentClasses` to set the element's classes:

   在模板中，把 `ngClass` 属性绑定到 `currentClasses`，根据它来设置此元素的 CSS 类：

<code-example path="built-in-directives/src/app/app.component.html" region="NgClass-1" header="src/app/app.component.html"></code-example>

For this use case, Angular applies the classes on initialization and in case of changes.
The full example calls `setCurrentClasses()` initially with `ngOnInit()` and when the dependent properties change through a button click.
These steps are not necessary to implement `ngClass`.
For more information, see the <live-example></live-example> `app.component.ts` and `app.component.html`.

在这个例子中，Angular 会在初始化以及发生更改的情况下应用这些类。完整的示例会在 `ngOnInit()` 中进行初始化以及通过单击按钮更改相关属性时调用 `setCurrentClasses()`。这些步骤对于实现 `ngClass` 不是必需的。有关更多信息，请参见<live-example></live-example>中的 `app.component.ts` 和 `app.component.html`。

{@a ngstyle}
## Setting inline styles with `NgStyle`

## 用 `NgStyle` 设置内联样式

You can use `NgStyle` to set multiple inline styles simultaneously, based on the state of the component.

你可以使用 `NgStyle` 根据组件的状态同时设置多个内联样式。

1. To use `NgStyle`, add a method to the component class.

   要使用 `NgStyle`，请向组件类添加一个方法。

  In the following example, `setCurrentStyles()` sets the property `currentStyles` with an object that defines three styles, based on the state of three other component properties.

  在下面的例子中，`setCurrentStyles()` 方法基于该组件另外三个属性的状态，用一个定义了三个样式的对象设置了 `currentStyles` 属性。

<code-example path="built-in-directives/src/app/app.component.ts" region="setStyles" header="src/app/app.component.ts"></code-example>

1. To set the element's styles, add an `ngStyle` property binding to `currentStyles`.

   要设置元素的样式，请将 `ngStyle` 属性绑定到 `currentStyles`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgStyle-2" header="src/app/app.component.html"></code-example>

For this use case, Angular applies the styles upon initialization and in case of changes.
To do this, the full example calls `setCurrentStyles()` initially with `ngOnInit()` and when the dependent properties change through a button click.
However, these steps are not necessary to implement `ngStyle` on its own.
See the <live-example></live-example> `app.component.ts` and `app.component.html` for this optional implementation.

在这个例子中，Angular 会在初始化以及发生更改的情况下应用这些类。完整的示例会在 `ngOnInit()` 中进行初始化以及通过单击按钮更改相关属性时调用 `setCurrentClasses()`。这些步骤对于实现 `ngClass` 不是必需的。有关更多信息，请参见<live-example></live-example>中的 `app.component.ts` 和 `app.component.html`。

{@a ngModel}

## Displaying and updating properties with `ngModel`

## 用 `ngModel` 显示和更新属性

You can use the `NgModel` directive to display a data property and update that property when the user makes changes.

你可以使用 `NgModel` 指令显示数据属性，并在用户进行更改时更新该属性。

1. Import `FormsModule`  and add it to the NgModule's `imports` list.

   导入 `FormsModule`，并将其添加到 NgModule 的 `imports` 列表中。

<code-example path="built-in-directives/src/app/app.module.ts" header="src/app/app.module.ts (FormsModule import)" region="import-forms-module"></code-example>

1. Add an `[(ngModel)]` binding on an HTML `<form>` element and set it equal to the property, here `name`.

   在 HTML 的 `<form>` 元素上添加 `[(ngModel)]` 绑定，并将其设置为等于此属性，这里是 `name`。

<code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel example)" region="NgModel-1"></code-example>

  This `[(ngModel)]` syntax can only set a data-bound property.

  此 `[(ngModel)]` 语法只能设置数据绑定属性。

To customize your configuration, you can write the expanded form, which separates the property and event binding.
Use [property binding](guide/property-binding) to set the property and [event binding](guide/event-binding) to respond to changes.
The following example changes the `<input>` value to uppercase:

要自定义配置，你可以编写可展开的表单，该表单将属性绑定和事件绑定分开。使用[属性绑定](guide/property-binding)来设置属性，并使用[事件绑定](guide/event-binding)来响应更改。以下示例将 `<input>` 值更改为大写：

<code-example path="built-in-directives/src/app/app.component.html" region="uppercase" header="src/app/app.component.html"></code-example>

Here are all variations in action, including the uppercase version:

这里是所有这些变体的动画，包括这个大写转换的版本：

<div class="lightbox">

  <img src='generated/images/guide/built-in-directives/ng-model-anim.gif' alt="NgModel variations">

</div>

### `NgModel` and value accessors

### `NgModel` 和值访问器

The `NgModel` directive works for an element supported by a [ControlValueAccessor](api/forms/ControlValueAccessor).
Angular provides *value accessors* for all of the basic HTML form elements.
For more information, see [Forms](guide/forms).

`NgModel` 指令适用于[ControlValueAccessor](api/forms/ControlValueAccessor)支持的元素。Angular 为所有基本 HTML 表单元素提供了*值访问器。*有关更多信息，请参见[Forms](guide/forms)。

To apply `[(ngModel)]` to a non-form native element or a third-party custom component, you have to write a value accessor.
For more information, see the API documentation on [DefaultValueAccessor](api/forms/DefaultValueAccessor).

要将 `[(ngModel)]` 应用于非格式本机元素或第三方自定义组件，必须编写一个值访问器。有关更多信息，请参见[DefaultValueAccessor](api/forms/DefaultValueAccessor)上的 API 文档。

<div class="alert is-helpful">

When you write an Angular component, you don't need a value accessor or `NgModel` if you  name the value and event properties according to Angular's [two-way binding syntax](guide/two-way-binding#how-two-way-binding-works).

编写 Angular 组件时，如果根据 Angular 的[双向绑定语法](guide/two-way-binding#how-two-way-binding-works)命名 value 和 event 属性，则不需要用值访问器（ControlValueAccessor）或 `NgModel`。

</div>

{@a structural-directives}

## Built-in structural directives

## 内置结构型指令

Structural directives are responsible for HTML layout.
They shape or reshape the DOM's structure, typically by adding, removing, and manipulating the host elements to which they are attached.

结构型指令的职责是 HTML 布局。
它们塑造或重塑 DOM 的*结构*，这通常是通过添加、移除和操纵它们所附加到的宿主元素来实现的。

This section introduces the most common built-in structural directives:

本节会介绍最常见的内置结构型指令：

* [`NgIf`](guide/built-in-directives#ngIf)&mdash;conditionally creates or disposes of subviews from the template.

  [`NgIf`](guide/built-in-directives#ngIf) —— 从模板中创建或销毁子视图。

* [`NgFor`](guide/built-in-directives#ngFor)&mdash;repeat a node for each item in a list.

  [`NgFor`](guide/built-in-directives#ngFor) —— 为列表中的每个条目重复渲染一个节点。

* [`NgSwitch`](guide/built-in-directives#ngSwitch)&mdash;a set of directives that switch among alternative views.

  [`NgSwitch`](guide/built-in-directives#ngSwitch) —— 一组在备用视图之间切换的指令。

For more information, see [Structural Directives](guide/structural-directives).

要了解更多信息，参阅[结构型指令](guide/structural-directives)。

{@a ngIf}

## Adding or removing an element with `NgIf`

## 用 `NgIf` 添加或删除元素

You can add or remove an element by applying an `NgIf` directive to a host element.

你可以通过将 `NgIf` 指令应用于宿主元素来添加或删除元素。

When `NgIf` is `false`, Angular removes an element and its descendants from the DOM.
Angular then disposes of their components, which frees up memory and resources.

如果 `NgIf` 为 `false`，则 Angular 将从 DOM 中移除一个元素及其后代。然后，Angular 会销毁其组件，从而释放内存和资源。

To add or remove an element, bind `*ngIf` to a condition expression such as `isActive` in the following example.

要添加或删除元素，请在以下示例 `*ngIf` 绑定到条件表达式，例如 `isActive`

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-1" header="src/app/app.component.html"></code-example>

When the `isActive` expression returns a truthy value, `NgIf` adds the `ItemDetailComponent` to the DOM.
When the expression is falsy, `NgIf` removes the `ItemDetailComponent` from the DOM and disposes of the component and all of its sub-components.

当 `isActive` 表达式返回真值时，`NgIf` 会把 `ItemDetailComponent` 添加到 DOM 中。当表达式为假值时，`NgIf` 会从 DOM 中删除 `ItemDetailComponent` 并销毁该组件及其所有子组件。

For more information on `NgIf` and `NgIfElse`, see the [NgIf API documentation](api/common/NgIf).

关于 `NgIf` 和 `NgIfElse` 的更多信息，请参见[NgIf API 文档](api/common/NgIf)。

### Guarding against `null`

### 防止 `null`

By default, `NgIf` prevents display of an element bound to a null value.

默认情况下，`NgIf` 会阻止显示已绑定到空值的元素。

To use `NgIf` to guard a `<div>`, add `*ngIf="yourProperty"` to the `<div>`.
In the following example, the `currentCustomer` name appears because there is a `currentCustomer`.

要使用 `NgIf` 保护 `<div>`，请将 `*ngIf="yourProperty"` 添加到此 `<div>`。在下面的例子中，`currentCustomer` 名字出现了，是因为确实存在一个 `currentCustomer`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

However, if the property is `null`, Angular does not display the `<div>`.
In this example, Angular does not display the `nullCustomer` because it is `null`.

但是，如果该属性为 `null`，则 Angular 就不会显示 `<div>`。在这个例子中，Angular 就不会显示 `nullCustomer`，因为它为 `null`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>

{@a ngFor}

## Listing items with `NgFor`

## `NgFor` 条目列表

You can use the `NgFor` directive to present a list of items.

你可以使用 `NgFor` 来指令显示条目列表。

1. Define a block of HTML that determines how Angular renders a single item.

   定义一个 HTML 块，该块会决定 Angular 如何渲染单个条目。

1. To list your items, assign the short hand `let item of items` to `*ngFor`.

   要列出你的条目，请把一个简写形式 `let item of items` 赋值给 `*ngFor`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

The string `"let item of items"` instructs Angular to do the following:

字符串 `"let item of items"` 会指示 Angular 执行以下操作：

  * Store each item in the `items` array in the local `item` looping variable
  
    将 `items` 中的每个条目存储在局部循环变量 `item` 中
  
  * Make each item available to the templated HTML for each iteration
  
    让每个条目都可用于每次迭代时的模板 HTML 中
  
  * Translate `"let item of items"` into an `<ng-template>` around the host element
  
    将 `"let item of items"` 转换为环绕宿主元素的 `<ng-template>`
  
  * Repeat the `<ng-template>` for each `item` in the list
  
    对列表中的每个 `item` 复写这个 `<ng-template>`

For more information see the [Structural directive shorthand](guide/structural-directives#shorthand) section of [Structural directives](guide/structural-directives).

欲知详情，请参阅[结构型指令](guide/structural-directives)中的[结构型指令的简写形式](guide/structural-directives#shorthand)部分。

### Repeating a component view

### 复写组件视图

To repeat a component element, apply `*ngFor` to the selector.
In the following example, the selector is `<app-item-detail>`.

要复写某个组件元素，请将 `*ngFor` 应用于其选择器。在以下示例中，选择器为 `<app-item-detail>`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>

You can reference a template input variable, such as `item`, in the following locations:

你可以在以下位置引用模板输入变量，例如 `item`：

  * within the `ngFor` host element
  
    在 `ngFor` 的宿主元素中
  
  * within the host element descendants to access the item's properties

    在宿主元素的后代中，用以访问条目的属性
  
The following example references `item` first in an interpolation and then passes in a binding to the `item` property of the `<app-item-detail>` component.

以下示例首先在插值中引用 `item`，然后将它通过绑定传递给 `<app-item-detail>` 组件的 `item` 属性。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

For more information about template input variables, see [Structural directive shorthand](guide/structural-directives#shorthand).

有关模板输入变量的更多信息，请参见《结构型指令简写形式》](guide/structural-directives#shorthand)。

### Getting the `index` of `*ngFor`

### 获取 `*ngFor` 的 `index`

You can get the `index` of `*ngFor` in a template input variable and use it in the template.

你可以获取 `*ngFor` 的 `index`，并在模板中使用它。

In the `*ngFor`, add a semicolon and `let i=index` to the short hand.
The following example gets the `index` in a variable named `i` and displays it with the item name.

在 `*ngFor` 中，添加一个分号和 `let i=index` 简写形式。下面的例子中把 `index` 取到一个名为 `i` 的变量中，并将其与条目名称一起显示。

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-3" header="src/app/app.component.html"></code-example>

The index property of the `NgFor` directive context returns the zero-based index of the item in each iteration.

`NgFor` 指令上下文的 `index` 属性在每次迭代中都会返回该条目的从零开始的索引号。

Angular translates this instruction into an `<ng-template>` around the host element,
then uses this template repeatedly to create a new set of elements and bindings for each `item`
in the list.
For more information about shorthand, see the [Structural Directives](guide/structural-directives#shorthand) guide.

Angular 会将此指令转换为 `<ng-template>`，然后反复使用此模板为列表中的每个 `item` 创建一组新的元素和绑定。有关简写形式的更多信息，请参见[《结构型指令》](guide/structural-directives#shorthand)指南。

{@a one-per-element}
## Repeating elements when a condition is true

## 当条件为真时复写元素

To repeat a block of HTML when a particular condition is true, put the `*ngIf` on a container element that wraps an `*ngFor` element.
One or both elements can be an `<ng-container>` so you don't have to introduce extra levels of HTML.

要在特定条件为 true 时复写 HTML 块，请将 `*ngIf` 放在 `*ngFor` 元素的容器元素上。它们之一或两者都可以是 `<ng-container>`，这样你就不必引入额外的 HTML 层次了。

Because structural directives add and remove nodes from the DOM, apply only one structural directive per element.

由于结构型指令会在 DOM 中添加和删除节点，因此每个元素只能应用一个结构型指令。

For more information about `NgFor` see the [NgForOf API reference](api/common/NgForOf).

有关 `NgFor` 的更多信息，请参见[NgForOf API 参考](api/common/NgForOf)。

{@a ngfor-with-trackby}
### Tracking items with `*ngFor` `trackBy`

### 用 `*ngFor` 的 `trackBy` 跟踪条目

By tracking changes to an item list, you can reduce the number of calls your application makes to the server.
With the `*ngFor` `trackBy` property, Angular can change and re-render only those items that have changed, rather than reloading the entire list of items.

通过跟踪对条目列表的更改，可以减少应用程序对服务器的调用次数。使用 `*ngFor` 的 `trackBy` 属性，Angular 只能更改和重新渲染已更改的条目，而不必重新加载整个条目列表。

1. Add a method to the component that returns the value `NgFor` should track.
  In this example, the value to track is the item's `id`.
  If the browser has already rendered `id`, Angular keeps track of it and doesn't re-query the server for the same `id`.

   向该组件添加一个方法，该方法返回 `NgFor` 应该跟踪的值。这个例子中，该值是英雄的 `id`。如果浏览器已经渲染过此 `id`，Angular 就会跟踪它，而不会重新向服务器查询相同的 `id`。

<code-example path="built-in-directives/src/app/app.component.ts" region="trackByItems" header="src/app/app.component.ts"></code-example>

1. In the short hand expression, set `trackBy` to the `trackByItems()` method.

   在简写表达式中，将 `trackBy` 设置为 `trackByItems()` 方法。

<code-example path="built-in-directives/src/app/app.component.html" region="trackBy" header="src/app/app.component.html"></code-example>

**Change ids** creates new items with new `item.id`s.
In the following illustration of the `trackBy` effect, **Reset items** creates new items with the same `item.id`s.

**更改这些 ID** 会使用新的 `item.id` 创建新的条目。在下面的 `trackBy` 效果演示中，**Reset items** 会创建一些具有和以前相同的 `item.id` 的新条目。

* With no `trackBy`, both buttons trigger complete DOM element replacement.

   如果没有 `trackBy`，这些按钮都会触发完全的 DOM 元素替换。

* With `trackBy`, only changing the `id` triggers element replacement.

   有了 `trackBy`，则只有修改了 `id` 的按钮才会触发元素替换。

<div class="lightbox">

  <img src="generated/images/guide/built-in-directives/ngfor-trackby.gif" alt="Animation of trackBy">

</div>

<div class="alert is-helpful">

Built-in directives use only public APIs.
They do not have special access to any private APIs that other directives can't access.

内置指令仅仅使用了公共 API。它们没有用到任何其它指令无权访问的私有 API。

</div>

{@a ngcontainer}

## Hosting a directive without a DOM element

## 为没有 DOM 元素的指令安排宿主

The Angular `<ng-container>` is a grouping element that doesn't interfere with styles or layout because Angular doesn't put it in the DOM.

Angular 的 `<ng-container>` 是一个分组元素，它不会干扰样式或布局，因为 Angular 不会将其放置在 DOM 中。

You can use `<ng-container>` when there's no single element to host the directive.

当没有单个元素承载指令时，可以使用 `<ng-container>`。

Here's a conditional paragraph using `<ng-container>`.

这是使用 `<ng-container>` 的条件化段落。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-ngcontainer)" region="ngif-ngcontainer"></code-example>


<div class="lightbox">
  <img src='generated/images/guide/structural-directives/good-paragraph.png' alt="ngcontainer paragraph with proper style">
</div>

1. Import the `ngModel` directive from `FormsModule`.

   从 `FormsModule` 中导入 `ngModel` 指令。

1. Add `FormsModule` to the imports section of the relevant Angular module.

   将 `FormsModule` 添加到相关 Angular 模块的 imports 部分。

1. To conditionally exclude an `<option>`, wrap the `<option>` in an `<ng-container>`.

   要有条件地排除 `<option>`，请将 `<option>` 包裹在 `<ng-container>` 中。

  <code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (select-ngcontainer)" region="select-ngcontainer"></code-example>

  <div class="lightbox">
    <img src='generated/images/guide/structural-directives/select-ngcontainer-anim.gif' alt="ngcontainer options work properly">
  </div>

{@a ngSwitch}

## Switching cases with `NgSwitch`

## 用 `NgSwitch`

Like the JavaScript `switch` statement, `NgSwitch` displays one element from among several possible elements, based on a switch condition.
Angular puts only the selected element into the DOM.

就像 JavaScript 的 `switch` 语句一样。`NgSwitch` 会根据切换条件显示几个可能的元素中的一个。Angular 只会将选定的元素放入 DOM。

<!-- API Flagged -->

`NgSwitch` is a set of three directives:

`NgSwitch` 是一组指令（共三个）：

  * `NgSwitch`&mdash;an attribute directive that changes the behavior of its companion directives.
  
    `NgSwitch` —— 一个属性型指令，它更改其伴生指令的行为。
  
  * `NgSwitchCase`&mdash;structural directive that adds its element to the DOM when its bound value equals the switch value and removes its bound value when it doesn't equal the switch value.
  
    `NgSwitchCase` —— 结构型指令，当其绑定值等于开关值时将其元素添加到 DOM 中，而在其不等于开关值时将其绑定值移除。
  
  * `NgSwitchDefault`&mdash;structural directive that adds its element to the DOM when there is no selected `NgSwitchCase`.

    `NgSwitchDefault` —— 结构型指令，当没有选中的 `NgSwitchCase` 时，将其宿主元素添加到 DOM 中。
  
1. On an element, such as a `<div>`, add `[ngSwitch]` bound to an expression that returns the switch value, such as `feature`.
  Though the `feature` value in this example is a string, the switch value can be of any type.

   在每个元素（比如`<div>`）上，把 `[ngSwitch]` 绑定到一个返回开关值的表达式（例如 `feature`）。尽管这个例子中 `feature` 值是字符串，但此开关值可以是任何类型。

1. Bind to `*ngSwitchCase` and `*ngSwitchDefault` on the elements for the cases.

   将各个分支元素绑定到 `*ngSwitchCase` 和 `*ngSwitchDefault`。

   <code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch" header="src/app/app.component.html"></code-example>

1. In the parent component, define `currentItem` so you can use it in the `[ngSwitch]` expression.

   在父组件中，定义 `currentItem` 以便可以在 `[ngSwitch]` 表达式中使用它。

   <code-example path="built-in-directives/src/app/app.component.ts" region="item" header="src/app/app.component.ts"></code-example>

1. In each child component, add an `item` [input property](guide/inputs-outputs#input "Input property") which is bound to the `currentItem` of the parent component.
  The following two snippets show the parent component and one of the child components.
  The other child components are identical to `StoutItemComponent`.

   在每个子组件中，添加一个[输入属性](guide/inputs-outputs#input "输入属性") `item`，该属性会绑定到父组件的 `currentItem`。以下两个片段显示了父组件和其中一个子组件。其他子组件与 `StoutItemComponent` 中的相同。

   <code-example path="built-in-directives/src/app/item-switch.component.ts" region="input" header="In each child component, here StoutItemComponent"></code-example><div class="lightbox">

  <img src="generated/images/guide/built-in-directives/ngswitch.gif" alt="Animation of NgSwitch">

</div>

Switch directives also work with native HTML elements and web components.
For example, you could replace the `<app-best-item>` switch case with a `<div>` as follows.

Switch 指令也同样适用于原生 HTML 元素和 Web Component。
比如，你可以像下面的例子中一样把 `<app-best-item>` 分支替换为 `<div>`。

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch-div" header="src/app/app.component.html"></code-example>

## What's next

## 接下来呢？

For information on how to build your own custom directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives).

有关如何构建自己的自定义指令的信息，请参见[“属性型指令”](guide/attribute-directives)和[“结构型指令”](guide/structural-directives)。
