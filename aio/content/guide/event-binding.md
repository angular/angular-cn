# Event binding

# 事件绑定

Event binding allows you to listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches.

通过事件绑定，你可以侦听并响应用户操作，例如击键、鼠标移动、点击和触摸。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

包含本指南中的代码段的工作示例，参见<live-example></live-example>。

</div>

## Binding to events

## 绑定到事件

To bind to an event you use the Angular event binding syntax.
This syntax consists of a target event name within parentheses to the left of an equal sign, and a quoted template statement to the right.
In the following example, the target event name is `click` and the template statement is `onSave()`.

要绑定到事件，请使用 Angular 的事件绑定语法。此语法由等号左侧括号内的目标事件名和右侧引号内的模板语句组成。在下面的示例中，目标事件名是 `click` ，模板语句是 `onSave()` 。

<code-example language="html" header="Event binding syntax">
&lt;button (click)="onSave()"&gt;Save&lt;/button&gt;
</code-example>

The event binding listens for the button's click events and calls the component's `onSave()` method whenever a click occurs.

事件绑定侦听按钮的单击事件，并在发生单击时调用组件的 `onSave()`。

<div class="lightbox">
  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">
</div>

## Custom events with `EventEmitter`

## 使用 `EventEmitter` 自定义事件

[Directives](guide/built-in-directives) typically raise custom events with an Angular [EventEmitter](api/core/EventEmitter) as follows.

[指令](guide/built-in-directives)通常使用 Angular 的 [EventEmitter](api/core/EventEmitter) 引发自定义事件，如下所示。

1. The directive creates an `EventEmitter` and exposes it as a property.

   该指令创建一个 `EventEmitter` 并将其对外暴露为属性。

1. The directive then calls `EventEmitter.emit(data)` to emit an event, passing in message data, which can be anything.

   然后，该指令调用 `EventEmitter.emit(data)` 发出事件，传入消息数据，该消息数据可以是任何东西。

1. Parent directives listen for the event by binding to this property and accessing the data through the `$event` object.

   父指令通过绑定到该属性来监听事件，并通过传入的 `$event` 对象接收数据。

Consider an `ItemDetailComponent` that presents item information and responds to user actions.
Although the `ItemDetailComponent` has a delete button, it doesn't contain the functionality to delete the hero.
It can only raise an event reporting the user's delete request.

考虑一个 `ItemDetailComponent` ，它会显示条目信息并响应用户操作。尽管 `ItemDetailComponent` 显示了一个删除按钮，但它并不包含删除英雄的功能。它只会引发一个报告用户要求删除的事件。

<code-example path="event-binding/src/app/item-detail/item-detail.component.html" header="src/app/item-detail/item-detail.component.html (template)" region="line-through"></code-example>

The component defines a `deleteRequest` property that returns an `EventEmitter`.
When the user clicks **Delete**, the component invokes the `delete()` method, telling the `EventEmitter` to emit an `Item` object.

该组件定义了一个 `deleteRequest` 返回 `EventEmitter` 的属性。当用户单击 **Delete** 时，该组件将调用 `delete()` 方法，让这个 `EventEmitter` 发出 `Item` 对象。

<code-example path="event-binding/src/app/item-detail/item-detail.component.ts" header="src/app/item-detail/item-detail.component.ts (deleteRequest)" region="deleteRequest"></code-example>

The hosting parent component binds to the `deleteRequest` event of the `ItemDetailComponent` as follows.

宿主父组件将绑定到 `ItemDetailComponent` 的 `deleteRequest` 事件，如下所示。

<code-example path="event-binding/src/app/app.component.html" header="src/app/app.component.html (event-binding-to-component)" region="event-binding-to-component"></code-example>

When the `deleteRequest` event fires, Angular calls the parent component's `deleteItem()` method with the item.

当 `deleteRequest` 事件触发时，Angular 就会以该条目为参数调用其父组件的 `deleteItem()`。

### Determining an event target

### 确定事件目标（target）

To determine an event target, Angular checks if the name of the target event matches an event property of a known directive.
In the following example, Angular checks to see if `myClick` is an event on the custom `ClickDirective`.

为了确定事件的目标，Angular 会检查目标事件的名称是否与已知指令的事件属性匹配。在以下示例中，Angular 会检查 `myClick` 是否来自自定义指令 `ClickDirective` 的事件。

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

If the target event name, `myClick` fails to match an element event or an output property of `ClickDirective`, Angular reports an "unknown directive" error.

如果目标事件名称 `myClick` 未能匹配元素上的事件或 `ClickDirective` 的输出属性，则 Angular 将报告“未知指令”错误。

<hr />

## What's next

## 下一步是什么

For more information on how event binding works, see [How event binding works](guide/event-binding-concepts).

关于事件绑定工作原理的更多信息，请参阅[事件绑定工作原理](guide/event-binding-concepts)。
