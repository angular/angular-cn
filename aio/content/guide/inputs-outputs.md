# Sharing data between child and parent directives and components

# 在父子指令及组件之间共享数据

A common pattern in Angular is sharing data between a parent component and one or more child components.
You can implement this pattern by using the `@Input()` and `@Output()` directives.

Angular 中的一个常见模式就是在父组件和一个或多个子组件之间共享数据。你可以用 `@Input()` 和 `@Output()` 来实现这个模式。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

本章包含代码片段的可工作实例参阅<live-example></live-example>。

</div>

Consider the following hierarchy:

考虑以下层次结构：

```html
<parent-component>
  <child-component></child-component>
</parent-component>
```

The `<parent-component>` serves as the context for the `<child-component>`.

`<parent-component>` 充当了 `<child-component>` 的上下文。

`@Input()` and `@Output()` give a child component a way to communicate with its parent component.
`@Input()` allows a parent component to update data in the child component.
Conversely, `@Output() allows the child to send data to a parent component.

`@Input()` 和 `@Output()` 为子组件提供了一种与其父组件通信的方法。 `@Input()` 允许父组件更新子组件中的数据。相反，`@Output()` 允许子组件向父组件发送数据。

{@a input}

## Sending data to a child component

## 把数据发送到子组件

The `@Input()` decorator in a child component or directive signifies that the property can receive its value from its parent component.

子组件或指令中的 `@Input()` 装饰器表示该属性可以从其父组件中获取值。

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input.svg" alt="Input data flow diagram">
</div>

To use `@Input()`, you must configure the parent and child.

要使用 `@Input()`，就必须对父组件和子组件进行配置。

### Configuring the child component

### 配置子组件

To use the `@Input()` decorator in a child component class, first import `Input` and then decorate the property with `@Input()`, as in the following example.

要使用 `@Input()` 装饰器，首先要导入 `Input`，然后用 `@Input()` 装饰该属性，如下例所示。

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.ts" region="use-input" header="src/app/item-detail/item-detail.component.ts"></code-example>


In this case, `@Input()` decorates the property <code class="no-auto-link">item</code>, which has a type of `string`, however, `@Input()` properties can have any type, such as `number`, `string`, `boolean`, or `object`.
The value for `item` comes from the parent component.

在这个例子中， `@Input()` 会修饰属性 <code class="no-auto-link">item</code>，它的类型为 `string`，但 `@Input()` 属性可以是任意类型，比如 `number`、`string`、`boolean` 或 `object`。`item` 的值来自父组件。

Next, in the child component template, add the following:

接下来，在子组件模板中添加以下内容：

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.html" region="property-in-template" header="src/app/item-detail/item-detail.component.html"></code-example>

### Configuring the parent component

### 配置父组件

The next step is to bind the property in the parent component's template.
In this example, the parent component template is `app.component.html`.

下一步是在父组件的模板中绑定该属性。在这个例子中，父组件模板是 `app.component.html` 。

1. Use the child's selector, here `<app-item-detail>`, as a directive within the
parent component template.

   使用子组件的 selector (`<app-item-detail>`) 作为父组件模板中的指令。

2. Use [property binding](guide/property-binding) to bind the `item` property in the child to the `currentItem` property of the parent.

   使用[属性绑定](guide/property-binding)把子组件的 `item` 属性绑定到父组件的 `currentItem` 属性上。

<code-example path="inputs-outputs/src/app/app.component.html" region="input-parent" header="src/app/app.component.html"></code-example>

3. In the parent component class, designate a value for `currentItem`:

   在父组件类中，为 `currentItem` 指定一个值：

<code-example path="inputs-outputs/src/app/app.component.ts" region="parent-property" header="src/app/app.component.ts"></code-example>

With `@Input()`, Angular passes the value for `currentItem` to the child so that `item` renders as `Television`.

通过 `@Input()`，Angular 把 `currentItem` 的值传给子组件，以便 `item` 渲染为 `Television` 。

The following diagram shows this structure:

下图展示了这种结构：

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-diagram-target-source.svg" alt="Property binding diagram">
</div>

The target in the square brackets, `[]`, is the property you decorate with `@Input()` in the child component.
The binding source, the part to the right of the equal sign, is the data that the parent component passes to the nested component.

方括号 `[]` 中的目标就是子组件中用 `@Input()` 装饰的那个属性。绑定源（等号的右边部分）则是父组件传给内嵌组件的数据。

### Watching for `@Input()` changes

### 监视 `@Input()` 的变更

To watch for changes on an `@Input()` property, you can use `OnChanges`, one of Angular's [lifecycle hooks](guide/lifecycle-hooks).
See the [`OnChanges`](guide/lifecycle-hooks#onchanges) section of the [Lifecycle Hooks](guide/lifecycle-hooks) guide for more details and examples.

要想监视 `@Input()` 属性的变化，你可以使用 Angular 的[生命周期钩子](guide/lifecycle-hooks)`OnChanges` 。更多详情和范例，请参阅[生命周期钩子](guide/lifecycle-hooks) 一章的 [`OnChanges`](guide/lifecycle-hooks#onchanges)部分。

{@a output}

## Sending data to a parent component

## 把数据发送到父组件

The `@Output()` decorator in a child component or directive allows data to flow from the child to the parent.

子组件或指令中的 `@Output()` 装饰器允许数据从子组件传给父组件。

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/output.svg" alt="Output diagram">
</div>

`@Output()` marks a property in a child component as a doorway through which data can travel from the child to the parent.

`@Output()` 在子组件中标记了一个属性，作为数据从子组件传递到父组件的途径。

The child component uses the `@Output()` property to raise an event to notify the parent of the change.
To raise an event, an `@Output()` must have the type of `EventEmitter`, which is a class in `@angular/core` that you use to emit custom events.

子组件使用 `@Output()` 属性来引发事件，以通知父组件这一变化。为了引发事件， `@Output()` 必须是 `EventEmitter` 类型，它是 `@angular/core` 中用来发出自定义事件的类。

The following example shows how to set up an `@Output()` in a child component that pushes data from an HTML `<input>` to an array in the parent component.

下面的例子给出了如何在组件中设置 `@Output()`，来把数据从 HTML 的 `<input>` 推送到父组件的数组中。

To use `@Output()`, you must configure the parent and child.

要使用 `@Output()` ，就必须配置父组件和子组件。

### Configuring the child component

### 配置子组件

The following example features an `<input>` where a user can enter a value and click a `<button>` that raises an event. The `EventEmitter` then relays the data to the parent component.

下面的例子中有一个 `<input>` ，用户可以输入一个值，然后点击一个引发事件 `<button>` 然后， `EventEmitter` 数据中继到父组件。

1. Import `Output` and `EventEmitter` in the child component class:

   在子组件类中导入 `Output` 和 `EventEmitter`

  ```js
  import { Output, EventEmitter } from '@angular/core';

  ```

1. In the component class, decorate a property with `@Output()`.
  The following example `newItemEvent` `@Output()` has a type of `EventEmitter`, which means it's an event.

   在组件类中，用 `@Output()` 装饰一个属性。下面的例子中 `newItemEvent` 这个 `@Output()` 的类型为 `EventEmitter` ，这意味着它是一个事件。

  <code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output" header="src/app/item-output/item-output.component.ts"></code-example>

  The different parts of the above declaration are as follows:

  上述声明中的差异点如下：


    * `@Output()`&mdash;a decorator function marking the property as a way for data to go from the child to the parent

       `@Output()` - 一个装饰器函数，它把该属性标记为数据从子组件进入父组件的一种途径

    * `newItemEvent`&mdash;the name of the `@Output()`

      `newItemEvent` - 这个 `@Output()` 的名字

    * `EventEmitter<string>`&mdash;the `@Output()`'s type

      `EventEmitter<string>` - 这个 `@Output()` 的类型

    * `new EventEmitter<string>()`&mdash;tells Angular to create a new event emitter and that the data it emits is of type string.

      `new EventEmitter<string>()` - 使用 Angular 来创建一个新的事件发射器，它发出的数据是 `string` 类型的。

  For more information on `EventEmitter`, see the [EventEmitter API documentation](api/core/EventEmitter).

  关于 `EventEmitter` 的详细信息，请参阅 [EventEmitter API 文档](api/core/EventEmitter)。

1. Create an `addNewItem()` method in the same component class:

   在同一个组件类中创建一个 `addNewItem()` 方法：

  <code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output-class" header="src/app/item-output/item-output.component.ts"></code-example>

  The `addNewItem()` function uses the `@Output()`, `newItemEvent`, to raise an event with the value the user types into the `<input>`.

  `addNewItem()` 函数使用  `newItemEvent` 这个 `@Output()` 来引发一个事件，该事件带有用户输入到 `<input>` 中的值。

### Configuring the child's template

### 配置子组件的模板

The child's template has two controls.
The first is an HTML `<input>` with a [template reference variable](guide/template-reference-variables) , `#newItem`, where the user types in an item name.
The `value` property of the `#newItem` variable stores what the user types into the `<input>`.

子组件的模板有两个控件。第一个是带有[模板引用变量](guide/template-reference-variables) `#newItem` 的 `<input>`，用户可在其中输入条目名称。 `#newItem` 变量的 `value` 属性存储了用户输入到 `<input>` 中的值。

<code-example path="inputs-outputs/src/app/item-output/item-output.component.html" region="child-output" header="src/app/item-output/item-output.component.html"></code-example>

The second element is a `<button>` with a `click` [event binding](guide/event-binding).

第二个元素是带有 `click` [事件绑定](guide/event-binding) 的 `<button>` 元素。

The `(click)` event is bound to the `addNewItem()` method in the child component class.
The `addNewItem()` method takes as its argument the value of the `#newItem.value` property.

`(click)` 事件绑定到了子组件类中 `addNewItem()` 方法。`addNewItem()` 方法接受一个 `#newItem.value` 属性的值作为参数。

### Configuring the parent component

### 配置父组件

The `AppComponent` in this example features a list of `items` in an array and a method for adding more items to the array.

此范例中的 `AppComponent` 有一个 `items` 列表，以及一个向数组中添加更多条目的方法。

<code-example path="inputs-outputs/src/app/app.component.ts" region="add-new-item" header="src/app/app.component.ts"></code-example>

The `addItem()` method takes an argument in the form of a string and then adds that string to the `items` array.

`addItem()` 方法接受一个字符串形式的参数，然后把该字符串添加到 `items` 数组中。

### Configuring the parent's template

### 配置父组件的模板

1. In the parent's template, bind the parent's method to the child's event.

   在父模板中，把父组件的方法绑定到子组件的事件上。

1. Put the child selector, here `<app-item-output>`, within the parent component's template, `app.component.html`.

   把子组件选择器（`<app-item-output>`）放在父组件的模板 `app.component.html` 中。

   <code-example path="inputs-outputs/src/app/app.component.html" region="output-parent" header="src/app/app.component.html"></code-example>

  The event binding, `(newItemEvent)='addItem($event)'`, connects the event in the child, `newItemEvent`, to the method in the parent, `addItem()`.

   事件绑定 `(newItemEvent)='addItem($event)'` 会把子组件中的 `newItemEvent` 事件连接到父组件的 `addItem()` 方法。

  The `$event` contains the data that the user types into the `<input>` in the child template UI.

  `$event` 中包含用户在子组件模板上的 `<input>` 中键入的数据。

   To see the `@Output()` working, you can add the following to the parent's template:

   要了解 `@Output()` 的工作方式，你可以把以下内容添加到父组件的模板中：

   ```html
     <ul>
       <li *ngFor="let item of items">{{item}}</li>
     </ul>
   ```

   The `*ngFor` iterates over the items in the `items` array.
   When you enter a value in the child's `<input>` and click the button, the child emits the event and the parent's `addItem()` method pushes the value to the `items` array and new item renders in the list.

   `*ngFor` 会迭代 `items` 数组中的条目。当你在子组件的 `<input>` 中输入一个值并单击该按钮时，子组件就会发出该事件，而父组件的 `addItem()` 方法会把这个值追加到其 `items` 数组中，并且列表中会渲染出这个新条目。

## Using `@Input()` and `@Output()` together

## 同时使用 `@Input()` 和 `@Output()`

You can use `@Input()` and `@Output()` on the same child component as follows:

你可以在同一个子组件上使用 `@Input()` 和 `@Output()`，范例如下：

<code-example path="inputs-outputs/src/app/app.component.html" region="together" header="src/app/app.component.html"></code-example>

The target, `item`, which is an `@Input()` property in the child component class, receives its value from the parent's property, `currentItem`.
When you click delete, the child component raises an event, `deleteRequest`, which is the argument for the parent's `crossOffItem()` method.

目标 `item` 是子组件类中的一个 `@Input()` 属性，它会从父组件的 `currentItem` 属性中获取它的值。当你单击“删除”时，子组件就会引发一个事件 `deleteRequest` ，它会作为父组件中 `crossOffItem()` 方法的参数。

The following diagram shows the different parts of the `@Input()` and `@Output()` on the `<app-input-output>` child component.

下图展示了子组件 `<app-input-output>` 中 `@Input()` 和 `@Output()` 的各个部分。

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-output-diagram.svg" alt="Input/Output diagram">
</div>

The child selector is `<app-input-output>` with `item` and `deleteRequest` being `@Input()` and `@Output()`
properties in the child component class.
The property `currentItem` and the method `crossOffItem()` are both in the parent component class.

这里的子选择器是 `<app-input-output>`，它所带的 `item` 和 `deleteRequest` 是子组件类中的 `@Input()` 和 `@Output()` 属性。而 `currentItem` 属性和 `crossOffItem()` 方法都位于父组件类中。

To combine property and event bindings using the banana-in-a-box
syntax, `[()]`, see [Two-way Binding](guide/two-way-binding).

要想用“盒子里的香蕉” `[()]` 语法来组合属性和事件绑定，参阅[双向绑定](guide/two-way-binding)。
