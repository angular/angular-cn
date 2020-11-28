# Property binding best practices

# 属性绑定的最佳实践

By following a few guidelines, you can use property binding in a way that helps you minimize bugs and keep your code readable.

通过遵循一些指导原则，你可以使用属性绑定来帮助你最大限度地减少错误并让代码保持可读性。

<div class="alert is-helpful">

See the <live-example name="property-binding"></live-example> for a working example containing the code snippets in this guide.

本章包含代码片段的工作实例参阅<live-example name="property-binding"></live-example>。

</div>

## Avoid side effects

## 避免副作用

Evaluation of a template expression should have no visible side effects.
Use the syntax for template expressions to help avoid side effects.
In general, the correct syntax prevents you from assigning a value to anything in a property binding expression.
The syntax also prevents you from using increment and decrement operators.

模板表达式的计算应该没有明显的副作用。使用模板表达式的语法来帮你避免副作用。通常，正确的语法会阻止你为属性绑定表达式中的任何东西赋值。该语法还会阻止你使用递增和递减运算符。

### An example of producing side effects

### 产生副作用的一个例子

If you had an expression that changed the value of something else that you were binding to, that change of value would be a side effect.
Angular might or might not display the changed value.
If Angular does detect the change, it throws an error.

如果你的表达式改变了你所绑定的其它东西的值，那么这种更改就会产生副作用。 Angular 可能显示也可能不显示更改后的值。如果 Angular 确实检测到了这个变化，就会抛出一个错误。

As a best practice, use only properties and methods that return values.

作为一项最佳实践，请只使用属性和仅会返回值的方法。

## Return the proper type

## 返回合适的类型

A template expression should evaluate to the type of value that the target property expects.
For example, return a string if the target property expects a string, a number if it expects a number, or an object if it expects an object.

模板表达式应该求值为目标属性所期望的值类型。例如，如果目标属性需要一个字符串，就返回一个字符串；如果需要一个数字，就返回一个数字；如果需要一个对象，就返回一个对象。

### Passing in a string

### 传入字符串

In the following example, the `childItem` property of the `ItemDetailComponent` expects a string.

在下面的例子中，`ItemDetailComponent` 的 `childItem` 属性需要一个字符串。

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

You can confirm this expectation by looking in the `ItemDetailComponent` where the `@Input()` type is `string`:

你可以通过查看 `ItemDetailComponent` 来确认这种预期，其中的 `@Input()` 类型为 `string` ：

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts (setting the @Input() type)"></code-example>

The `parentItem` in `AppComponent` is a string, which means that the expression, `parentItem` within `[childItem]="parentItem"`, evaluates to a string.

`AppComponent` 中的 `parentItem` 是一个字符串，这意味着 `[childItem]="parentItem"` 中的 `parentItem` 应该求值为一个字符串。

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

If `parentItem` were some other type, you would need to specify `childItem`  `@Input()` as that type as well.

如果 `parentItem` 是其它类型的，你同样应该把 `childItem` 这个 `@Input()` 指定为那个类型。

### Passing in an object

### 传入一个对象

In this example, `ItemListComponent` is a child component of `AppComponent` and the `items` property expects an array of objects.

在这个例子中， `ItemListComponent` 是 `AppComponent` 的子组件，其 `items` 属性需要一个对象数组。

<code-example path="property-binding/src/app/app.component.html" region="pass-object" header="src/app/app.component.html"></code-example>

In the `ItemListComponent` the `@Input()`, `items`, has a type of `Item[]`.

在 `ItemListComponent` 中，`@Input()` `items` 的类型为 `Item[]`。

<code-example path="property-binding/src/app/item-list/item-list.component.ts" region="item-input" header="src/app/item-list.component.ts"></code-example>

Notice that `Item` is an object that it has two properties; an `id` and a `name`.

注意 `Item` 是一个有两个属性的对象。一个是 `id`，一个是 `name`。

<code-example path="property-binding/src/app/item.ts" region="item-class" header="src/app/item.ts"></code-example>

In `app.component.ts`, `currentItems` is an array of objects in the same shape as the `Item` object in `items.ts`, with an `id` and a `name`.

在 `app.component.ts` 中，`currentItems` 是一个对象数组，与 `items.ts` 中的 `Item` 对象具有相同的形态：有一个 `id`，有一个 `name`。

<code-example path="property-binding/src/app/app.component.ts" region="pass-object" header="src/app.component.ts"></code-example>

By supplying an object in the same shape, you satisfy the expectations of `items` when Angular evaluates the expression `currentItems`.

通过提供一个形态相同的对象，你就可以满足 Angular 在计算表达式 `currentItems`  时对 `items` 的期待。
