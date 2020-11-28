# Template variables

# 模板变量

Template variables help you use data from one part of a template in another part of the template.
With template variables, you can perform tasks such as respond to user input or finely tune your application's forms.

模板变量可以帮助你在模板的另一部分使用这个部分的数据。使用模板变量，你可以执行某些任务，比如响应用户输入或微调应用的表单。

A template variable can refer to the following:

模板变量可以引用这些东西：

* a DOM element within a template

  模板中的 DOM 元素

* a directive

  指令

* an element

  元素

* [TemplateRef](api/core/TemplateRef)
* a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">web component</a>

  [Web 组件](https://developer.mozilla.org/en-US/docs/Web/Web_Components "MDN：Web Components")

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

本章包含代码片段的工作实例参阅<live-example></live-example>。

</div>

## Syntax

## 语法

In the template, you use the hash symbol, `#`, to declare a template variable.
The following template variable, `#phone`, declares a `phone` variable on an `<input>` element.

在模板中，要使用井号 `#` 来声明一个模板变量。下列模板变量 `#phone` 语法在 `<input>` 元素上声明了一个名为 `phone` 的变量

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

You can refer to a template variable anywhere in the component's template.
Here, a `<button>` further down the template refers to the `phone` variable.

你可以在组件模板中的任何地方引用某个模板变量。这里的 `<button>` 就引用了 `phone` 变量。

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-phone" header="src/app/app.component.html"></code-example>

## How Angular assigns values to template variables

## Angular 是如何为模板变量赋值的

Angular assigns a template variable a value based on where you declare the variable:

Angular 根据你所声明的变量的位置给模板变量赋值：

* If you declare the variable on a component, the variable refers to the component instance.

  如果在组件上声明变量，该变量就会引用该组件实例。

* If you declare the variable on a standard HTML tag, the variable refers to the element.

  如果在标准的 HTML 标记上声明变量，该变量就会引用该元素。

* If you declare the variable on an `<ng-template>` element, the variable refers to a `TemplateRef` instance, which represents the template.
  For more information on `<ng-template>`, see the [ng-template](guide/structural-directives#the-ng-template) section of [Structural directives](guide/structural-directives).

  如果你在 `<ng-template>` 元素上声明变量，该变量就会引用一个 `TemplateRef` 实例来代表此模板。关于 `<ng-template>` 的更多信息，请参阅[结构型指令](guide/structural-directives) 中的 [ng-template](guide/structural-directives#the-ng-template) 部分。

* If the variable specifies a name on the right-hand side, such as `#var="ngModel"`, the variable refers to the directive or component on the element with a matching `exportAs` name.

  如果该变量在右侧指定了一个名字，比如 `#var="ngModel"` ，那么该变量就会引用所在元素上具有这个 `exportAs` 名字的指令或组件。

<!-- What does the second half of this mean?^^ Can we explain this more fully? Could I see a working example? -kw -->

### Using `NgForm` with template variables

### 将 `NgForm` 与模板变量一起使用

In most cases, Angular sets the template variable's value to the element on which it occurs.
In the previous example, `phone` refers to the phone number `<input>`.
The button's click handler passes the `<input>` value to the component's `callPhone()` method.

在大多数情况下，Angular 会把模板变量的值设置为它所在的元素。在前面的例子中， `phone` 引用的是电话号码 `<input>` 。该按钮的 click 处理程序会把这个 `<input>` 的值传给该组件的 `callPhone()` 方法。

The `NgForm` directive demonstrates getting a reference to a different value by reference a directive's `exportAs` name.
In the following example, the template variable, `itemForm`, appears three times separated by HTML.

这里的 `NgForm` 指令演示了如何通过引用指令的的 `exportAs` 名字来引用不同的值。在下面的例子中，模板变量 `itemForm` 在 HTML 中分别出现了三次。

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

Without the `ngForm` attribute value, the reference value of `itemForm` would be
the [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement), `<form>`.
There is, however, a difference between a `Component` and a `Directive` in that Angular references a `Component` without specifying the attribute value, and a `Directive` does not change the implicit reference, or the element.

如果没有 `ngForm` 这个属性值，`itemForm` 引用的值将是 [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement) 也就是 `<form>` 元素。而 `Component` 和 `Directive` 之间的差异在于 Angular 在没有指定属性值的情况下，Angular 会引用 `Component`，而 `Directive` 不会改变这种隐式引用（即它的宿主元素）。

<!-- What is the train of thought from talking about a form element to the difference between a component and a directive? Why is the component directive conversation relevant here?  -kw -->

With `NgForm`, `itemForm` is a reference to the [NgForm](api/forms/NgForm "API: NgForm") directive with the ability to track the value and validity of every control in the form.

而使用了 `NgForm` 之后，`itemForm` 就是对 [NgForm](api/forms/NgForm "API：NgForm") 指令的引用，可以用它来跟踪表单中每一个控件的值和有效性。

Unlike the native `<form>` element, the `NgForm` directive has a `form` property.
The `NgForm` `form` property allows you to disable the submit button if the `itemForm.form.valid` is invalid.

与原生的 `<form>` 元素不同， `NgForm` 指令有一个 `form` 属性。如果 `itemForm.form.valid` 无效，那么 `NgForm` 的 `form` 属性就会让你禁用提交按钮。

## Template variable scope

## 模板变量的作用域

You can refer to a template variable anywhere within its surrounding template.
[Structural directives](guide/built-in-directives), such as `*ngIf` and `*ngFor`, or `<ng-template>` act as a template boundary.
You cannot access template variables outside of these boundaries.

你可以在包含此模板变量的模板中的任何地方引用它。而 [结构型指令](guide/built-in-directives)（如 `*ngIf` 和 `*ngFor` 或 `<ng-template>` 同样充当了模板的边界。你不能在这些边界之外访问其中的模板变量。

<div class="alert is-helpful">

Define a variable only once in the template so the runtime value remains predictable.

同名变量在模板中只能定义一次，这样运行时它的值就是可预测的。

</div>

### Accessing in a nested template

### 在嵌套模板中访问

An inner template can access template variables that the outer template defines.

内部模板可以访问外模板定义的模板变量。

In the following example, changing the text in the `<input>` changes the value in the `<span>` because Angular immediately updates changes through the template variable, `ref1`.

在下面的例子中，修改 `<input>` 中的文本值也会改变 `<span>` 中的值，因为 Angular 会立即通过模板变量 `ref1` 来更新这种变化。

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref-vars-scope1" header="src/app/app.component.html"></code-example>

In this case, there is an implied `<ng-template>` around the `<span>` and the definition of the variable is outside of it.
Accessing a template variable from the parent template works because the child template inherits the context from the parent template.

在这种情况下，有一个包含这个 `<span>` 的隐式 `<ng-template>`，而该变量的定义在该隐式模板之外。访问父模板中的模板变量是可行的，因为子模板会从父模板继承上下文。

Rewriting the above code in a more verbose form explicitly shows the `<ng-template>`.

我们用更啰嗦的形式重写上述的代码，可以明确地显示出 `<ng-template>`。

```html
<input #ref1 type="text" [(ngModel)]="firstExample" />

<!-- New template -->
<ng-template [ngIf]="true">
  <!-- Since the context is inherited, the value is available to the new template -->
  <span>Value: {{ ref1.value }}</span>
</ng-template>
```

However, accessing a template variable from outside the parent template doesn't work.

但是，从外部的父模板访问本模板中的变量是行不通的。

```html
  <input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
  <span>Value: {{ ref2?.value }}</span> <!-- doesn't work -->
```

The verbose form shows that `ref2` is outside the parent template.

这个更啰嗦的形式表明 `ref2` 位于外部的父模板中。

```
<ng-template [ngIf]="true">
  <!-- The reference is defined within a template -->
  <input #ref2 type="text" [(ngModel)]="secondExample" />
</ng-template>
<!-- ref2 accessed from outside that template doesn't work -->
<span>Value: {{ ref2?.value }}</span>
```

Consider the following example that uses `*ngFor`.

考虑下面这个带 `*ngFor` 的使用范例。

```
<ng-container *ngFor="let i of [1,2]">
  <input #ref type="text" [value]="i" />
</ng-container>
{{ ref.value }}
```

Here, `ref.value` doesn't work.
The structural directive, `*ngFor` instantiates the template twice because `*ngFor` iterates over the two items in the array.
It is impossible to define what the `ref.value` reference signifies.

这里，`ref.value` 不起作用。结构型指令 `*ngFor` 将模板实例化了两次，因为 `*ngFor` 在对数组中的两个条目进行迭代。因此不可能定义出 `ref.value` 指向的是谁。

With structural directives, such as `*ngFor` or `*ngIf`, there is no way for Angular to know if a template is ever instantiated.

对于结构型指令，比如 `*ngFor` 或 `*ngIf` ，Angular 也无法知道模板是否曾被实例化过。

As a result, Angular isn't able to access the value and returns an error.

结果，Angular 无法访问该值并返回错误。

### Accessing a template variable within `<ng-template>`

### 访问 `<ng-template>` 的模板变量

When you declare the variable on an `<ng-template>`, the variable refers to a `TemplateRef` instance, which represents the template.

在 `<ng-template>` 上声明变量时，该变量会引用一个 `TemplateRef` 实例来表示该模板。

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref" header="src/app/app.component.html"></code-example>

In this example, clicking the button calls the `log()` function, which outputs the value of `#ref3` to the console.
Because the `#ref` variable is on an `<ng-template>`, the value is `TemplateRef`.

在这个例子中，单击该按钮会调用 `log()` 函数，它把 `#ref3` 的值输出到控制台。因为 `#ref` 变量在 `<ng-template>` 上，所以它的值是一个 `TemplateRef`。

The following is the expanded browser console output of the `TemplateRef()` function with the name of `TemplateRef`.

下面是一个名为 `TemplateRef` 的 `TemplateRef()` 函数在浏览器控制台中展开时的输出。

<code-example language="sh">

&#9660; ƒ TemplateRef()
name: "TemplateRef"
__proto__: Function

</code-example>
