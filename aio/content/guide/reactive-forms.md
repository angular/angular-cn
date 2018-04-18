# Reactive Forms

# 响应式表单

_Reactive forms_ is an Angular technique for creating forms in a _reactive_ style.
This guide explains reactive forms as you follow the steps to build a "Hero Detail Editor" form.

*响应式表单*是 Angular 中用*响应式*风格创建表单的技术。
本章会在构建“英雄详情编辑器”的过程中，逐步讲解响应式表单的概念。

{@a toc}

Try the <live-example stackblitz="final" title="Reactive Forms (final) in Stackblitz">Reactive Forms live-example</live-example>.

试试<live-example stackblitz="final" title="Reactive Forms (final) in Stackblitz">响应式表单的在线例子</live-example>。

You can also run the <live-example title="Reactive Forms Demo in Stackblitz">Reactive Forms Demo</live-example> version
and choose one of the intermediate steps from the "demo picker" at the top.

你还可以运行<live-example title="Reactive Forms Demo in Stackblitz">响应式表单的演示程序</live-example>，并从顶部选取一个中间步骤。

{@a intro}

## Introduction to Reactive Forms

## 响应式表单简介

Angular offers two form-building technologies: _reactive_ forms and _template-driven_ forms.
The two technologies belong to the `@angular/forms` library
and share a common set of form control classes.

Angular 提供了两种构建表单的技术：*响应式*表单和*模板驱动*表单。
这两项技术都属于 `@angular/forms` 库，并且共享一组公共的表单控件类。

But they diverge markedly in philosophy, programming style, and technique.
They even have their own modules: the `ReactiveFormsModule` and the `FormsModule`.

但是它们在设计哲学、编程风格和具体技术上有显著区别。
所以，它们都有自己的模块：`ReactiveFormsModule` 和 `FormsModule`。

### Reactive forms

### 响应式表单

Angular _reactive_ forms facilitate a _reactive style_ of programming
that favors explicit management of the data flowing between
a non-UI _data model_ (typically retrieved from a server) and a
UI-oriented _form model_ that retains the states
and values of the HTML controls on screen. Reactive forms offer the ease
of using reactive patterns, testing, and validation.

Angular 的*响应式*表单能让实现*响应式编程风格*更容易，这种编程风格更倾向于在非 UI 的*数据模型*（通常接收自服务器）之间显式的管理数据流，
并且用一个 UI 导向的*表单模型*来保存屏幕上 HTML 控件的状态和值。
响应式表单可以让使用响应式编程模式、测试和校验变得更容易。

With _reactive_ forms, you create a tree of Angular form control objects
in the component class and bind them to native form control elements in the
component template, using techniques described in this guide.

使用*响应式*表单，你可以在组件中创建表单控件的对象树，并使用本章中传授的技巧把它们绑定到组件模板中的原生表单控件元素上。

You create and manipulate form control objects directly in the
component class. As the component class has immediate access to both the data
model and the form control structure, you can push data model values into
the form controls and pull user-changed values back out. The component can
observe changes in form control state and react to those changes.

你可以在组件类中直接创建和维护表单控件对象。由于组件类可以同时访问数据模型和表单控件结构，
因此你可以把表单模型值的变化推送到表单控件中，并把变化后的值拉取回来。
组件可以监听表单控件状态的变化，并对此做出响应。

One advantage of working with form control objects directly is that value and validity updates
are [always synchronous and under your control](guide/reactive-forms#async-vs-sync "Async vs sync").
You won't encounter the timing issues that sometimes plague a template-driven form
and reactive forms can be easier to unit test.

直接使用表单控件对象的优点之一是值和有效性状态的更新[总是同步的，并且在你的控制之下](guide/reactive-forms#async-vs-sync "Async vs sync")。
你不会遇到时序问题，这个问题有时在模板驱动表单中会成为灾难。而且响应式表单更容易进行单元测试。

In keeping with the reactive paradigm, the component
preserves the immutability of the _data model_,
treating it as a pure source of original values.
Rather than update the data model directly,
the component extracts user changes and forwards them to an external component or service,
which does something with them (such as saving them)
and returns a new _data model_ to the component that reflects the updated model state.

在响应式编程范式中，组件会负责维护*数据模型*的不可变性，把模型当做纯粹的原始数据源。
组件不会直接更新数据模型，而是把用户的修改提取出来，把它们转发给外部的组件或服务，外部程序才会使用这些进行处理（比如保存它们），
并且给组件返回一个新的*数据模型*，以反映模型状态的变化。

Using reactive form directives does not require you to follow all reactive priniciples,
but it does facilitate the reactive programming approach should you choose to use it.

使用响应式表单的指令，并不要求你遵循所有的响应式编程原则，但它能让你更容易使用响应式编程方法，从而更愿意使用它。

### Template-driven forms

### 模板驱动表单

_Template-driven_ forms, introduced in the [Template guide](guide/forms), take a completely different approach.

在[模板](guide/forms)一章中介绍过的*模板驱动*表单，是一种完全不同的方式。

You place HTML form controls (such as `<input>` and `<select>`) in the component template and
bind them to _data model_ properties in the component, using directives
like `ngModel`.

你把 HTML 表单控件（比如 `<input>` 和 `<select>`）放进组件模板中，并用 `ngModel` 等指令把它们绑定到组件中*数据模型*的属性上。

You don't create Angular form control objects. Angular directives
create them for you, using the information in your data bindings.
You don't push and pull data values. Angular handles that for you with `ngModel`.
Angular updates the mutable _data model_ with user changes as they happen.

你不用自己创建 Angular 表单控件对象。Angular 指令会使用数据绑定中的信息创建它们。
你不用自己推送和拉取数据。Angular 使用 `ngModel` 来替你管理它们。
当用户做出修改时，Angular 会据此更新可变的*数据模型*。

For this reason, the `ngModel` directive is not part of the ReactiveFormsModule.

因此，`ngModel` 并不是 `ReactiveFormsModule` 模块的一部分。

While this means less code in the component class,
[template-driven forms are asynchronous](guide/reactive-forms#async-vs-sync "Async vs sync")
which may complicate development in more advanced scenarios.

虽然这意味着组件中的代码更少，但是[模板驱动表单是异步工作的](guide/reactive-forms#async-vs-sync "Async vs sync")，这可能在更高级的场景中让开发复杂化。

{@a async-vs-sync}

### Async vs. sync

### 异步 vs. 同步

Reactive forms are synchronous while template-driven forms are asynchronous.

响应式表单是同步的而模板驱动表单是异步的。

In reactive forms, you create the entire form control tree in code.
You can immediately update a value or drill down through the descendants of the parent form
because all controls are always available.

使用响应式表单，你会在代码中创建整个表单控件树。
你可以立即更新一个值或者深入到表单中的任意节点，因为所有的控件都始终是可用的。

Template-driven forms delegate creation of their form controls to directives.
To avoid "_changed after checked_" errors,
these directives take more than one cycle to build the entire control tree.
That means you must wait a tick before manipulating any of the controls
from within the component class.

模板驱动表单会委托指令来创建它们的表单控件。
为了消除“检查完后又变化了”的错误，这些指令需要消耗一个以上的变更检测周期来构建整个控件树。
这意味着在从组件类中操纵任何控件之前，你都必须先等待一个节拍。

For example, if you inject the form control with a `@ViewChild(NgForm)` query and examine it in the
[`ngAfterViewInit` lifecycle hook](guide/lifecycle-hooks#afterview "Lifecycle hooks guide: AfterView"),
you'll discover that it has no children.
You must wait a tick, using `setTimeout`, before you can
extract a value from a control, test its validity, or set it to a new value.

比如，如果你用 `@ViewChild(NgForm)` 查询来注入表单控件，并在[生命周期钩子 `ngAfterViewInit`](guide/lifecycle-hooks#afterview "Lifecycle hooks guide: AfterView")中检查它，就会发现它没有子控件。
你必须使用 `setTimeout` 等待一个节拍才能从控件中提取值、测试有效性，或把它设置为新值。

The asynchrony of template-driven forms also complicates unit testing.
You must wrap your test block in `async()` or `fakeAsync()` to
avoid looking for values in the form that aren't there yet.
With reactive forms, everything is available when you expect it to be.

模板驱动表单的异步性让单元测试也变得复杂化了。
你必须把测试代码包裹在 `async()` 或 `fakeAsync()` 中来解决要查阅的值尚不存在的情况。
使用响应式表单，在所期望的时机一切都是可用的。

### Choosing reactive or template-driven forms

### 选择响应式表单还是模板驱动表单？

Reactive and template-driven forms are
two different architectural paradigms,
with their own strengths and weaknesses.
Choose the approach that works best for you.
You may decide to use both in the same application.

响应式表单和模板驱动表单是两种架构范式，各有优缺点。
请自行选择更合适的方法，甚至可以在同一个应用中同时使用它们。

The rest of this page explores the _reactive_ paradigm and
concentrates exclusively on reactive forms techniques.
For information on _template-driven forms_, see the [_Forms_](guide/forms) guide.

本章其余的部分只专注于*响应式*范式以及响应式表单技术的详情。
要了解关于*模板驱动表单*的更多信息，参见[表单](guide/forms)一章。

In the next section, you'll set up your project for the reactive form demo.
Then you'll learn about the [Angular form classes](guide/reactive-forms#essentials) and how to use them in a reactive form.

在下一节，你要先准备一个响应式表单范例的项目，然后就可以开始学习[Angular 表单类](guide/reactive-forms#essentials)，并在响应式表单中使用它们了。

{@a setup}

## Setup

## 准备工作

Create a new project named <code>angular-reactive-forms</code>:

创建一个名叫<code>angular-reactive-forms</code>的新项目：

<code-example language="sh" class="code-shell">

  ng new angular-reactive-forms

</code-example>

{@a data-model}

## Create a data model

## 创建数据模型

The focus of this guide is a reactive forms component that edits a hero.
You'll need a `hero` class and some hero data.

本章的焦点是响应式表单组件以及编辑一个英雄。
你需要一个 `Hero` 类和一些英雄数据。

Using the CLI, generate a new class named `data-model`:

使用 CLI 创建一个名叫 `data-model` 的新类：

<code-example language="sh" class="code-shell">

  ng generate class data-model

</code-example>

And copy the following into `data-model.ts`:

并把下列内容复制到 `data-model.ts` 中：

<code-example path="reactive-forms/src/app/data-model.ts" title="src/app/data-model.ts" linenums="false">

</code-example>

The file exports two classes and two constants. The `Address`
and `Hero` classes define the application _data model_.
The `heroes` and `states` constants supply the test data.

这个文件导出两个类和两个常量。`Address` 和 `Hero` 类定义应用的*数据模型*。
`heroes` 和 `states` 常量提供测试数据。

{@a create-component}

## Create a _reactive forms_ component

## 创建*响应式表单*组件

Generate a new component named `HeroDetail`:

生成一个名叫 `HeroDetail` 的新组件：

<code-example language="sh" class="code-shell">

  ng generate component HeroDetail

</code-example>

And import:

并导入：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-1.component.ts" region="import" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

Next, update the `HeroDetailComponent` class with a `FormControl`.
`FormControl` is a directive that allows you to create and manage
a `FormControl` instance directly.

接下来，创建并导出一个带 `FormControl` 的 `HeroDetailComponent` 类。
`FormControl` 是一个指令，它允许你直接创建并管理一个 `FormControl` 实例。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-1.component.ts" region="v1" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

This creates a `FormControl` called `name`.
It will be bound in the template to an HTML `<input>` element for the hero name.

这里创建了一个名叫 `name` 的 `FormControl`。
它将会绑定到模板中的一个 `<input>` 元素，表示英雄的名字。

A `FormControl` constructor accepts three, optional arguments:
the initial data value, an array of validators, and an array of async validators.

`FormControl` 构造函数接收三个可选参数：
初始值、验证器数组和异步验证器数组。

<div class="l-sub-section">

This simple control doesn't have data or validators.
In real apps, most form controls have both. For in-depth information on
`Validators`, see the [Form Validation](guide/form-validation) guide.

最简单的控件并不需要数据或验证器，但是在实际应用中，大部分表单控件都会同时具备它们。
要想深入了解 `Validators`，参见[表单验证](guide/form-validation)一章。

</div>

{@a create-template}

## Create the template

## 创建模板

Now update the component's template with the following markup.

现在，把组件的模板文件 `src/app/hero-detail.component.html` 修改为如下内容：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-1.component.html" region="simple-control" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

To let Angular know that this is the input that you want to
associate to the `name` `FormControl` in the class,
you need `[formControl]="name"` in the template on the `<input>`.

要让 Angular 知道你希望把这个输入框关联到类中的 `FormControl` 型属性 `name`，就要在模板中的 `<input>` 上加一句 `[formControl]="name"`。

<div class="l-sub-section">

Disregard the `form-control` CSS class. It belongs to the
<a href="http://getbootstrap.com/" title="Bootstrap CSS">Bootstrap CSS library</a>,
not Angular, and styles the form but in no way impacts the logic.

请忽略 CSS 类 `form-control`，它属于<a href="http://getbootstrap.com/" target="_blank" title="Bootstrap CSS">Bootstrap CSS library</a>而不是 Angular。
它会为表单添加样式，但是对表单的逻辑毫无影响。

</div>

{@a import}

## Import the `ReactiveFormsModule`

## 导入 `ReactiveFormsModule`

The `HeroDetailComponent` template uses the `formControlName`
directive from the `ReactiveFormsModule`.

`HeroDetailComponent` 的模板中使用了来自 `ReactiveFormsModule` 的 `formControlName`。

Do the following two things in `app.module.ts`:

在 `app.module.ts` 中做了下面两件事：

1. Use a JavaScript `import` statement to access
the `ReactiveFormsModule`.

   使用 JavaScript 的 `import` 语句访问 `ReactiveFormsModule` 和 `HeroDetailComponent`。

1. Add `ReactiveFormsModule` to the `AppModule`'s `imports` list.

   把 `ReactiveFormsModule` 添加到 `AppModule` 的 `imports` 列表中。

<code-example path="reactive-forms/src/app/app.module.ts" region="v1" title="src/app/app.module.ts (excerpt)" linenums="false">

</code-example>

{@a update}

## Display the `HeroDetailComponent`

## 显示 `HeroDetailComponent`

Revise the `AppComponent` template so it displays the `HeroDetailComponent`.

修改 `AppComponent` 的模板，以便显示 `HeroDetailComponent`。

<code-example path="reactive-forms/src/app/app.component.1.html" title="src/app/app.component.html" linenums="false">

</code-example>

{@a essentials}

## Essential form classes

## 基础的表单类

This guide uses four fundamental classes to build a reactive form:

本文使用四个基础类来构建响应式表单：

<table>

  <tr>

    <th>

      Class

      CSS 类

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>AbstractControl</code>

    </td>

    <td>

      [`AbstractControl`](api/forms/AbstractControl "API Reference: FormControl") is the abstract base class for the three concrete form control classes;
`FormControl`, `FormGroup`, and `FormArray`.
It provides their common behaviors and properties.

      [`AbstractControl`](api/forms/AbstractControl "API Reference: FormControl")是这三个具体表单类的抽象基类。
  并为它们提供了一些共同的行为和属性。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormControl</code>

    </td>

    <td>

      [`FormControl`](api/forms/FormControl "API Reference: FormControl")
tracks the value and validity status of an individual form control.
It corresponds to an HTML form control such as an `<input>` or `<select>`.

      [_FormControl_](api/forms/FormControl "API Reference: FormControl")
      用于跟踪一个*单独的*表单控件的值和有效性状态。它对应于一个 HTML 表单控件，比如 `<input>` 或 `<select>`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroup</code>

    </td>

    <td>

      [`FormGroup`](api/forms/FormGroup "API Reference: FormGroup")
tracks the value and validity state of a group of `AbstractControl` instances.
The group's properties include its child controls.
The top-level form in your component is a `FormGroup`.

      [`FormGroup`](api/forms/FormGroup "API Reference: FormGroup")用于
      跟踪*一组*`AbstractControl` 的实例的值和有效性状态。
      该组的属性中包含了它的子控件。
      组件中的顶级表单就是一个 `FormGroup`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormArray</code>

    </td>

    <td>

      [`FormArray`](api/forms/FormArray "API Reference: FormArray")
tracks the value and validity state of a numerically indexed array of `AbstractControl` instances.

      [`FormArray`](api/forms/FormArray "API Reference: FormArray")用于跟踪 `AbstractControl` 实例组成的有序数组的值和有效性状态。

    </td>

  </tr>

</table>

## Style the app

## 为应用添加样式

To use the bootstrap CSS classes that are in the template HTML of both the `AppComponent` and the `HeroDetailComponent`,
add the `bootstrap` CSS stylesheet to the head of `styles.css`:

要在 `AppComponent` 和 `HeroDetailComponent` 的模板中使用 Bootstrap 中的 CSS 类。请把 `bootstrap` 的*CSS 样式表文件*添加到 `style.css` 的头部：

<code-example path="reactive-forms/src/styles.1.css" title="styles.css" linenums="false">

</code-example>

Now that everything is wired up, serve the app with:

这些做好之后，启动应用服务器：

<code-example language="sh" class="code-shell">

  ng serve

</code-example>

The browser should display something like this:

浏览器应该显示成这样：

<figure>
  <img src="generated/images/guide/reactive-forms/just-formcontrol.png" alt="Single FormControl">
</figure>

{@a formgroup}

## Add a FormGroup

## 添加 FormGroup

Usually, if you have multiple `FormControls`, you register
them within a parent `FormGroup`.
To add a `FormGroup`, add it to the imports section
of `hero-detail.component.ts`:

通常，如果有多个 `FormControl`，你要把它们都注册进一个父 `FormGroup` 中。
只要把它添加到 `hero-detail.component.ts` 的 `imports` 区就可以了。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

In the class, wrap the `FormControl` in a `FormGroup` called `heroForm` as follows:

在这个类中，把 `FormControl` 包裹进了一个名叫 `heroForm` 的 `FormGroup` 中，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.ts" region="v2" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

Now that you've made changes in the class, they need to be reflected in the
template. Update `hero-detail.component.html` by replacing it with the following.

现在你改完了这个类，该把它映射到模板中了。把 `hero-detail.component.html` 改成这样：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.html" region="basic-form" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

Notice that now the single `<input>` is in a `<form>` element.

注意，现在单行输入框位于一个 `form` 元素中。

`formGroup` is a reactive form directive that takes an existing
`FormGroup` instance and associates it with an HTML element.
In this case, it associates the `FormGroup` you saved as
`heroForm` with the `<form>` element.

`formGroup` 是一个响应式表单的指令，它拿到一个现有 `FormGroup` 实例，并把它关联到一个 HTML 元素上。
这种情况下，它关联到的是 `<form>` 元素上的 `FormGroup` 实例 `heroForm`。

Because the class now has a `FormGroup`, you must update the template
syntax for associating the `<input>` with the corresponding
`FormControl` in the component class.
Without a parent `FormGroup`,
`[formControl]="name"` worked earlier because that directive
can stand alone, that is, it works without being in a `FormGroup`.
With a parent `FormGroup`, the `name` `<input>` needs the syntax
`formControlName=name` in order to be associated
with the correct `FormControl`
in the class. This syntax tells Angular to look for the parent
`FormGroup`, in this case `heroForm`, and then _inside_ that group
to look for a `FormControl` called `name`.

由于现在有了一个 `FormGroup`，因此你必须修改模板语法来把这个 `<input>` 关联到组件类中对应的 `FormControl` 上。
以前没有父 `FormGroup` 的时候，`[formControl]="name"` 也能正常工作，因为该指令可以独立工作，也就是说，不在 `FormGroup` 中时它也能用。
有了 `FormGroup`，`name` 这个 `<input>` 就需要再添加一个语法 `formControlName=name`，以便让它关联到类中正确的 `FormControl` 上。
这个语法告诉 Angular，查阅父 `FormGroup`（这里是 `heroForm`），然后在这个 `FormGroup` 中查阅一个名叫 `name` 的 `FormControl`。

{@a json}

## Taking a look at the form model

## 表单模型概览

When the user enters data into an `<input>`, the value
goes into the **_form model_**.
To see the form model, add the following line after the
closing `<form>` tag in the `hero-detail.component.html`:

当用户在 `<input>` 中输入数据时，它的值就会进入这个**表单模型**。
要想知道表单模型是什么样的，请在 `hero-detail.component.html` 的 `<form>` 标签紧后面添加如下代码：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.html" region="form-value-json" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

The `heroForm.value` returns the _form model_.
Piping it through the `JsonPipe` renders the model as JSON in the browser:

`heroForm.value` 会返回表单模型。
用 `JsonPipe` 管道把这个模型以 JSON 格式渲染到浏览器中。

<figure>
  <img src="generated/images/guide/reactive-forms/json-output.png" alt="JSON output">
</figure>

The initial `name` property value is the empty string.
Type into the name `<input>` and watch the keystrokes appear in the JSON.

最初的 `name` 属性是个空字符串，在 *name* `<input>` 中输入之后，可以看到这些按键出现在了 JSON 中。

In real life apps, forms get big fast.
`FormBuilder` makes form development and maintenance easier.

在真实的应用中，表单很快就会变大。
`FormBuilder` 能让表单开发和维护变得更简单。

{@a formbuilder}

## Introduction to `FormBuilder`

## `FormBuilder` 简介

The `FormBuilder` class helps reduce repetition and
clutter by handling details of control creation for you.

`FormBuilder` 类能通过处理控件创建的细节问题来帮你减少重复劳动。

To use `FormBuilder`, import it into `hero-detail.component.ts`. You can remove `FormControl`:

要使用 `FormBuilder`，就要先把它导入到 `hero-detail.component.ts` 中。你可以删除 `FormControl`：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3a.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Use it to refactor the `HeroDetailComponent` into something that's easier to read and write,
by following this plan:

遵循下列步骤来用 `FormBuilder` 把 `HeroDetailComponent` 重构得更容易读写：

* Explicitly declare the type of the `heroForm` property to be `FormGroup`; you'll initialize it later.

   明确把 `heroForm` 属性的类型声明为 `FormGroup`，稍后你会初始化它。

* Inject a `FormBuilder` into the constructor.

   把 `FormBuilder` 注入到构造函数中。

* Add a new method that uses the `FormBuilder` to define the `heroForm`; call it `createForm()`.

   添加一个名叫 `createForm()` 的新方法，它会用 `FormBuilder` 来定义 `heroForm`。

* Call `createForm()` in the constructor.

   在构造函数中调用 `createForm()`。

The revised `HeroDetailComponent` looks like this:

修改过的 `HeroDetailComponent` 代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3a.component.ts" region="v3a" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

`FormBuilder.group` is a factory method that creates a `FormGroup`. &nbsp;
`FormBuilder.group` takes an object whose keys and values are `FormControl` names and their definitions.
In this example, the `name` control is defined by its initial data value, an empty string.

`FormBuilder.group` 是一个用来创建 `FormGroup` 的工厂方法，它接受一个对象，对象的键和值分别是 `FormControl` 的名字和它的定义。
在这个例子中，`name` 控件的初始值是空字符串。

Defining a group of controls in a single object makes your code more compact and readable because you don't have to write repeated `new FormControl(...)` statements.

把一组控件定义在一个单一对象中，可以让你的代码更加紧凑、易读。
因为你不必写一系列重复的 `new FormControl(...)` 语句。

{@a validators}

### `Validators.required`

Though this guide doesn't go deeply into validations, here is one example that
demonstrates the simplicity of using `Validators.required` in reactive forms.

虽然本章不会深入讲解验证机制，但还是有一个例子来示范如何简单的在响应式表单中使用 `Validators.required`。

First, import the `Validators` symbol.

首先，导入 `Validators` 符号。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

To make the `name` `FormControl` required, replace the `name`
property in the `FormGroup` with an array.
The first item is the initial value for `name`;
the second is the required validator, `Validators.required`.

要想让 `name` 这个 `FormControl` 是必须的，请把 `FormGroup` 中的 `name` 属性改为一个数组。第一个条目是 `name` 的初始值，第二个是 `required` 验证器：`Validators.required`。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3.component.ts" region="required" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

<div class="l-sub-section">

Reactive validators are simple, composable functions.
Configuring validation is different in template-driven forms in that you must wrap validators in a directive.

响应式验证器是一些简单、可组合的函数。
在模板驱动表单中配置验证器有些困难，因为你必须把验证器包装进指令中。

</div>

Update the diagnostic message at the bottom of the template to display the form's validity status.

修改模板底部的诊断信息，以显示表单的有效性状态。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3.component.html" region="form-value-json" title="src/app/hero-detail/hero-detail.component.html (excerpt)" linenums="false">

</code-example>

The browser displays the following:

浏览器会显示下列内容：

<figure>
  <img src="generated/images/guide/reactive-forms/validators-json-output.png" alt="Single FormControl">
</figure>

`Validators.required` is working. The status is `INVALID` because the `<input>` has no value.
Type into the `<input>` to see the status change from `INVALID` to `VALID`.

`Validators.required` 生效了，但状态还是 `INVALID`，因为输入框中还没有值。
在输入框中输入，就会看到这个状态从 `INVALID` 变成了 `VALID`。

In a real app, you'd replace the diagnosic message with a user-friendly experience.

在真实的应用中，你要把这些诊断信息替换成用户友好的信息。

Using `Validators.required` is optional for the rest of the guide.
It remains in each of the following examples with the same configuration.

在本章的其余部分，`Validators.required` 是可有可无的，但在每个与此范例配置相同的范例中都会保留它。

For more on validating Angular forms, see the
[Form Validation](guide/form-validation) guide.

要了解 Angular 表单验证器的更多知识，参见[表单验证器](guide/form-validation)一章。

### More `FormControl`s

### 更多的 `FormControl`

This section adds additional `FormControl`s for the address, a super power, and a sidekick.

本节要添加一些 `FormControl`，用来表示住址、一项超能力，和一个副手。

Additionally, the address has a state property. The user will select a state with a `<select>` and you'll populate
the `<option>` elements with states. So import `states` from `data-model.ts`.

另外，住址中有一个所在州属性，用户将会从 `<select>` 框中选择一个州，你会用 `<option>` 元素渲染各个州。从 `data-model.ts` 中导入 `states`（州列表）。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-4.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Declare the `states` property and add some address `FormControls` to the `heroForm` as follows.

声明 `states` 属性并往 `heroForm` 中添加一些表示住址的 `FormControl`，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-4.component.ts" region="v4" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Then add corresponding markup in `hero-detail.component.html` as follows.

然后把下列代码添加到 `hero-detail.component.html` 文件中。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-4.component.html" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

<div class="alert is-helpful">

*Note*: Ignore the many mentions of `form-group`,
`form-control`, `center-block`, and `checkbox` in this markup.
Those are _bootstrap_ CSS classes that Angular itself ignores.
Pay attention to the `[formGroup]` and `formControlName` attributes.
They are the Angular directives that bind the HTML controls to the
Angular `FormGroup` and `FormControl` properties in the component class.

*注意*：不用管这些脚本中提到的 `form-group`、`form-control`、`center-block` 和 `checkbox` 等。
它们是来自 *Bootstrap* 的 CSS 类，Angular 本身不会管它们。
注意 `formGroupName` 和 `formControlName` 属性。
他们是 Angular 指令，用于把相应的 HTML 控件绑定到组件中的 `FormGroup` 和 `FormControl` 类型的属性上。

</div>

The revised template includes more text `<input>` elements, a `<select>` for the `state`, radio buttons for the `power`,
and a `<checkbox>` for the `sidekick`.

修改过的模板包含更多文本输入框，一个 `state` 选择框，`power`（超能力）的单选按钮和一个 `sidekick` 检查框。

You must bind the value property of the `<option>` with `[value]="state"`.
If you do not bind the value, the select shows the first option from the data model.

你要用 `[value]="state"` 来绑定 `<option>` 的 `value` 属性。
如果不绑定这个值，这个选择框就会显示来自数据模型中的第一个选项。

The component _class_ defines control properties without regard for their representation in the template.
You define the `state`, `power`, and `sidekick` controls the same way you defined the `name` control.
You tie these controls to the template HTML elements in the same way,
specifying the `FormControl` name with the `formControlName` directive.

组件*类*定义了控件属性而不用管它们在模板中的表现形式。
你可以像定义 `name` 控件一样定义 `state`、`power` 和 `sidekick` 控件，并用 `formControlName` 指令来指定 `FormControl` 的名字。

See the API reference for more information about
[radio buttons](api/forms/RadioControlValueAccessor "API: RadioControlValueAccessor"),
[selects](api/forms/SelectControlValueAccessor "API: SelectControlValueAccessor"), and
[checkboxes](api/forms/CheckboxControlValueAccessor "API: CheckboxControlValueAccessor").

参见 API 参考手册中的[radio buttons](api/forms/RadioControlValueAccessor "API: RadioControlValueAccessor")、
  [selects](api/forms/SelectControlValueAccessor "API: SelectControlValueAccessor")和
  [checkboxes](api/forms/CheckboxControlValueAccessor "API: CheckboxControlValueAccessor")

{@a grouping}

### Nested FormGroups

### 多级 `FormGroup`

To manage the size of the form more effectively, you can group some of the related `FormControls`
into a nested `FormGroup`. For example, the `street`, `city`, `state`, and `zip` are ideal properties for an address `FormGroup`.
Nesting groups and controls in this way allows you to
mirror the hierarchical structure of the data model
and helps track validation and state for related sets of controls.

要想更有效的管理这个表单的大小，你可以把一些相关的 `FormControl` 组织到多级 `FormGroup` 中。
比如，`street`、`city`、`state` 和 `zip` 就可以作为一个名叫 `address` 的 `FormGroup` 中的理想属性。
用这种方式，多级表单组和控件可以让你轻松地映射多层结构的数据模型，以帮你跟踪这组相关控件的有效性和状态。

You used the `FormBuilder` to create one `FormGroup` in this component called `heroForm`.
Let that be the parent `FormGroup`.
Use `FormBuilder` again to create a child `FormGroup` that encapsulates the `address` controls;
assign the result to a new `address` property of the parent `FormGroup`.

你用 `FormBuilder` 在这个名叫 `heroForm` 的组件中创建一个 `FormGroup`，并把它用作父 `FormGroup`。
再次使用 `FormBuilder` 创建一个子级 `FormGroup`，其中包括这些住址控件。把结果赋值给父 `FormGroup` 中新的 `address` 属性。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.ts" region="v5" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

When you change the structure of the form controls in the component class,
you must make corresponding adjustments to the component template.

当你修改组件类中表单控件的结构时，还必须对组件模板进行相应的调整。

In `hero-detail.component.html`, wrap the address-related `FormControls` in a `<div>`.
Add a `formGroupName` directive to the `div` and bind it to `"address"`.
That's the property of the `address` child `FormGroup` within the parent `FormGroup` called `heroForm`. Leave the `<div>` with the `name` `<input>`.

在 `hero-detail.component.html` 中，把与住址有关的 `FormControl` 包裹进一个 `div` 中。
往这个 `<div>` 上添加一个 `formGroupName` 指令，并且把它绑定到 `"address"` 上。
这个 `address` 属性是一个 `FormGroup`，它的父 `FormGroup` 就是 `heroForm`。
把这个 `name` `<input>` 留在此 `<div>` 中。

To make this change visually obvious, add an `<h4>` header near the top with the text, _Secret Lair_.
The new address HTML looks like this:

要让这个变化更加明显，在文本的顶部加入一个 `<h4>` 头：*Secret Lair*。
新的住址组的 HTML 如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.html" region="add-group" title="src/app/hero-detail/hero-detail.component.html (excerpt)" linenums="false">

</code-example>

After these changes, the JSON output in the browser shows the revised form model
with the nested address `FormGroup`:

做完这些之后，浏览器中的 JSON 输出就变成了带有多级 `FormGroup` 的表单模型。

<figure>
  <img src="generated/images/guide/reactive-forms/address-group.png" alt="JSON output">
</figure>

This shows that the template
and the form model are talking to one another.

这时模板和表单模型在彼此通讯了。

{@a properties}

## Inspect `FormControl` Properties

## 查看 `FormControl` 的属性

You can inspect an individual `FormControl` within a form by extracting it with the `get()` method.
You can do this within the component class or display it on the
page by adding the following to the template,
immediately after the `{{form.value | json}}` interpolation as follows:

你可以使用 `.get()` 方法来提取表单中一个单独 `FormControl` 的状态。
你可以在组件类中这么做，或者通过往模板中添加下列代码来把它显示在页面中，就添加在 `{{form.value | json}}` 插值表达式的紧后面：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.html" region="inspect-value" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

To get the state of a `FormControl` that’s inside a `FormGroup`, use dot notation to traverse to the control.

要点取得 `FormGroup` 中的 `FormControl` 的状态，使用点语法来指定到控件的路径。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.html" region="inspect-child-control" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

<div class="alert is-helpful">

*Note*: If you're coding along, remember to remove this reference to `address.street` when you get to the section on `FormArray`. In that section, you change the name of address in the component class and it will throw an error if you leave it in the template.

*注意*：如果你正在边看边跟着写代码，当你到达 `FormArray` 那节时，别忘了移除到 `address.street` 的引用。那一节中，你要在组件类中修改这个地址的名字，如果你把它留在模板中，就会抛出一个错误。

</div>

You can use this technique to display any property of a `FormControl`
such as one of the following:

你可以使用此技术来显示 `FromControl` 的任意属性，代码如下：

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">

  <col width="10%">

  </col>

  <col width="90%">

  </col>

  <tr>

    <th>

      Property

      属性

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td>

      <code>myControl.value</code>

    </td>

    <td>

      the value of a `FormControl`.

      `FormControl` 的值。

    </td>

  </tr>

  <tr>

    <td>

      <code>myControl.status</code>

    </td>

    <td>

      the validity of a `FormControl`. Possible values: `VALID`,
       `INVALID`, `PENDING`, or `DISABLED`.

      `FormControl` 的有效性。可能的值有 `VALID`、`INVALID`、`PENDING` 或 `DISABLED`。

    </td>

  </tr>

  <tr>

    <td>

      <code>myControl.pristine</code>

    </td>

    <td>

      `true` if the user has _not_ changed the value in the UI.
      Its opposite is `myControl.dirty`.

      如果用户*尚未*改变过这个控件的值，则为 `true`。它总是与 `myControl.dirty` 相反。

    </td>

  </tr>

  <tr>

    <td>

      <code>myControl.untouched</code>

    </td>

    <td>

      `true` if the control user has not yet entered the HTML control
       and triggered its blur event. Its opposite is `myControl.touched`.

      如果用户尚未进入这个 HTML 控件，也没有触发过它的 `blur`（失去焦点）事件，则为 `true`。
      它是 `myControl.touched` 的反义词。

    </td>

  </tr>

</table>

Read about other `FormControl` properties in the
[_AbstractControl_](api/forms/AbstractControl) API reference.

要了解 `FormControl` 的更多属性，参见 API 参考手册的[_AbstractControl_](api/forms/AbstractControl)部分。

One common reason for inspecting `FormControl` properties is to
make sure the user entered valid values.
Read more about validating Angular forms in the
[Form Validation](guide/form-validation) guide.

检查 `FormControl` 属性的另一个原因是确保用户输入了有效的值。
要了解更多关于 Angular 表单验证的知识，参见[表单验证](guide/form-validation)一章。

{@a data-model-form-model}

## The data model and the form model

## 数据模型与表单模型

At the moment, the form is displaying empty values.
The `HeroDetailComponent` should display values of a hero,
possibly a hero retrieved from a remote server.

此刻，表单显示的是空值。
`HeroDetailComponent` 应该显示一个英雄的值，这个值可能接收自远端服务器。

In this app, the `HeroDetailComponent` gets its hero from a parent `HeroListComponent`.

在这个应用中，`HeroDetailComponent` 从它的父组件 `HeroListComponent` 中取得一个英雄。

The `hero` from the server is the **_data model_**.
The `FormControl` structure is the **_form model_**.

来自服务器的 `hero` 就是**数据模型**，而 `FormControl` 的结构就是**表单模型**。

The component must copy the hero values in the data model into the form model.
There are two important implications:

组件必须把数据模型中的英雄值复制到表单模型中。这里隐含着两个非常重要的点。

1. The developer must understand how the properties of the data model
map to the properties of the form model.

   开发人员必须理解数据模型是如何映射到表单模型中的属性的。

2. User changes flow from the DOM elements to the form model, not to the data model.

   用户修改时的数据流是从 DOM 元素流向表单模型的，而不是数据模型。

The form controls never update the _data model_.

表单控件永远不会修改*数据模型*。

The form and data model structures don't need to match exactly.
You often present a subset of the data model on a particular screen.
But it makes things easier if the shape of the form model is close to the shape of the data model.

表单模型和数据模型的结构并不需要精确匹配。在一个特定的屏幕上，你通常只会展现数据模型的一个子集。
但是表单模型的形态越接近数据模型，事情就会越简单。

In this `HeroDetailComponent`, the two models are quite close.

在 `HeroDetailComponent` 中，这两个模型是非常接近的。

Here are the definitions of `Hero` and `Address` in `data-model.ts`:

回忆一下 `data-model.ts` 中 `Hero` 和 `Address` 的 定义：

<code-example path="reactive-forms/src/app/data-model.ts" region="model-classes" title="src/app/data-model.ts (classes)" linenums="false">

</code-example>

Here, again, is the component's `FormGroup` definition.

这里又是组件的 `FormGroup` 定义。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="hero-form-model" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

There are two significant differences between these models:

在这些模型中有两点显著的差异：

1. The `Hero` has an `id`. The form model does not because you generally don't show primary keys to users.

   `Hero` 有一个 `id`。表单模型中则没有，因为你通常不会把主键展示给用户。

1. The `Hero` has an array of addresses. This form model presents only one address,
which is covered in the section on [`FormArray`](guide/reactive-forms#form-array "Form arrays") below.

   `Hero` 有一个住址数组。这个表单模型只表示了一个住址，稍后的 [`FormArray`] (guide/reactive-forms#form-array "Form arrays")则可以表示多个。

Keeping the two models close in shape facilitates copying the data model properties
to the form model with the `patchValue()` and `setValue()` methods in the next section.

保持这两个模型的形态尽可能接近，可以在下一节中轻松使用 `patchValue()` 和 `setValue()` 方法把数据模型拷贝到表单模型中。

First, refactor the `address` `FormGroup` definition as follows:

首先把 `address` 这个 `FormGroup` 的定义重构成这样：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="address-form-group" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

Also be sure to update the `import` from `data-model` so you can reference the `Hero` and `Address` classes:

为了确保从 `data-model` 中导入，你可以引用 `Hero` 和 `Address` 类：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="import-address" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

{@a set-data}

## Populate the form model with `setValue()` and `patchValue()`

## 使用 `setValue()` 和 `patchValue()` 来操纵表单模型

<div class="alert is-helpful">

*Note*: If you're coding along, this section is optional as the rest of the steps do not rely on it.

*注意*：如果你正在跟着写代码，那么本节是可选的，因为剩下的步骤并不依赖它。

</div>

Previously, you created a control and initialized its value at the same time.
You can also initialize or reset the values later with the
`setValue()` and `patchValue()` methods.

以前，你创建了控件，并同时初始化它的值。
你也可以稍后用 `setValue()` 和 `patchValue()` 来初始化或重置这些值。

### `setValue()`

With `setValue()`, you assign every form control value at once
by passing in a data object whose properties exactly match the form model behind the `FormGroup`.

借助**`setValue()`**，你可以设置每个表单控件的值，只要把与表单模型的属性精确匹配的数据模型传进去就可以了。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="set-value" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

The `setValue()` method checks the data object thoroughly before assigning any form control values.

`setValue()` 方法会在赋值给任何表单控件之前先检查数据对象的值。

It will not accept a data object that doesn't match the `FormGroup` structure or is
missing values for any control in the group. This way, it can return helpful
error messages if you have a typo or if you've nested controls incorrectly.
Conversely, `patchValue()` will fail silently.

它不会接受一个与 `FormGroup` 结构不同或缺少表单组中任何一个控件的数据对象。
这种方式下，如果你有什么拼写错误或控件嵌套的不正确，它就能返回一些有用的错误信息。
反之，`patchValue()` 会默默地失败。

Notice that you can almost use the entire `hero` as the argument to `setValue()`
because its shape is similar to the component's `FormGroup` structure.

注意，你几乎可以直接把这个 `hero` 用作 `setValue()` 的参数，因为它的形态与组件的 `FormGroup` 结构是非常像的。

You can only show the hero's first address and you must account for the possibility that the `hero` has no addresses at all, as in the conditional setting of the `address` property in the data object argument:

你现在只能显示英雄的第一个住址，不过你还必须考虑 `hero` 完全没有住址的可能性。
就像这个在数据对象参数中对 `address` 属性进行有条件的设置：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="set-value-address" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

### `patchValue()`

With **`patchValue()`**, you can assign values to specific controls in a `FormGroup`
by supplying an object of key/value pairs for them.

借助**`patchValue()`**，你可以通过提供一个只包含要更新的控件的键值对象来把值赋给 `FormGroup` 中的指定控件。

This example sets only the form's `name` control.

这个例子只会设置表单的 `name` 控件。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="patch-value" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

With `patchValue()` you have more flexibility to cope with divergent data and form models.
But unlike `setValue()`,  `patchValue()` cannot check for missing control
values and doesn't throw helpful errors.

借助**`patchValue()`**，你可以更灵活地解决数据模型和表单模型之间的差异。
但是和 `setValue()` 不同，`patchValue()` 不会检查缺失的控件值，并且不会抛出有用的错误信息。

{@a hero-list}

## Create the `HeroListComponent` and `HeroService`

## 创建 `HeroListComponent` 和 `HeroService`

To demonstrate further reactive forms techniques, it is helpful to add more functionality to the example by adding a `HeroListComponent` and a `HeroService`.

要更好地演示后面的响应式表单技巧，可以通过加入 `HeroListComponent` 和 `HeroService` 来为这个范例添加更多功能。

The `HeroDetailComponent` is a nested sub-component of the `HeroListComponent` in a _master/detail_ view. Together they look like this:

`HeroDetalComponent` 是一个嵌套在 `HeroListComponent` 的*主从*视图中的子组件。如果把它们放在一起就是这样的：

<figure>
  <img src="generated/images/guide/reactive-forms/hero-list.png" alt="HeroListComponent">
</figure>

First, add a `HeroListComponent` with the following command:

首先使用下列命令添加一个 `HeroListComponent`：

<code-example language="sh" class="code-shell">

  ng generate component HeroList

</code-example>

Give the `HeroListComponent` the following contents:

把 `HeroListComponent` 修改为如下内容：

<code-example path="reactive-forms/src/app/hero-list/hero-list.component.ts" title="hero-list.component.ts" linenums="false">

</code-example>

Next, add a `HeroService` using the following command:

接着使用下列命令添加 `HeroService`：

<code-example language="sh" class="code-shell">

  ng generate service Hero

</code-example>

Then, give it the following contents:

然后，把它的内容改为：

<code-example path="reactive-forms/src/app/hero.service.ts" title="hero.service.ts" linenums="false">

</code-example>

The `HeroListComponent` uses an injected `HeroService` to retrieve heroes from the server
and then presents those heroes to the user as a series of buttons.
The `HeroService` emulates an HTTP service.
It returns an `Observable` of heroes that resolves after a short delay,
both to simulate network latency and to indicate visually
the necessarily asynchronous nature of the application.

`HeroListComponent` 使用一个注入进来的 `HeroService` 来从服务器获取英雄列表，然后用一系列按钮把这些英雄展示给用户。
`HeroService` 模拟了 HTTP 服务。
它返回一个英雄组成的 `Observable` 对象，并会在短暂的延迟之后被解析出来，这是为了模拟网络延迟，并展示应用在自然延迟下的异步效果。

When the user clicks on a hero,
the component sets its `selectedHero` property which
is bound to the `hero` `@Input()` property of the `HeroDetailComponent`.
The `HeroDetailComponent` detects the changed hero and resets its form
with that hero's data values.

当用户点击一个英雄时，组件设置它的 `selectedHero` 属性，它绑定到 `HeroDetailComponent` 的 `@Input()` 属性 `hero` 上。
`HeroDetailComponent` 检测到英雄的变化，并使用当前英雄的值重置此表单。

A refresh button clears the hero list and the current selected hero before refetching the heroes.

"刷新"按钮会清除英雄列表和当前选中的英雄，然后重新获取英雄列表。

Notice that `hero-list.component.ts` imports `Observable` and `finally` while `hero.service.ts` imports `Observable`, `of`,
and `delay` from `rxjs`.

注意，`hero-list.component.ts` 从 `rxjs` 中导入了 `Observable` 和 `finally`，而 `hero.service.ts` 导入了 `Observable`、`of` 和 `delay`。

The remaining `HeroListComponent` and `HeroService` implementation details are beyond the scope of this tutorial.
However, the techniques involved are covered elsewhere in the documentation, including the _Tour of Heroes_
[here](tutorial/toh-pt3 "ToH: Multiple Components") and [here](tutorial/toh-pt4 "ToH: Services").

`HeroListComponent` 和 `HeroService` 的其它实现细节超出了本教程的范围。
不过，它所涉及的技术包含在文档的其它部分，包括《英雄指南》的 [这里](tutorial/toh-pt3 "ToH: Multiple Components") 和 [这里](tutorial/toh-pt4 "ToH: Services")。

To use the `HeroService`, import it into `AppModule` and add it to the `providers` array. To use the `HeroListComponent`, import it, declare it, and export it:

要使用 `HeroService`，就要把它导入到 `AppModule` 中，并添加到 `providers` 数组里。
要使用 `HeroListComponent`，就要导入它、声明它并导出它：

<code-example path="reactive-forms/src/app/app.module.ts" region="hero-service-list" title="app.module.ts (excerpts)" linenums="false">

</code-example>

Next, update the `HeroListComponent` template with the following:

接下来，把 `HeroListComponent` 的模板升级为：

<code-example path="reactive-forms/src/app/hero-list/hero-list.component.html" title="hero-list.component.html" linenums="false">

</code-example>

These changes need to be reflected in the `AppComponent` template. Replace the contents of `app.component.html` with updated markup to use the `HeroListComponent`, instead of the `HeroDetailComponent`:

这些修改需要反映到 `AppComponent` 模板中。把 `app.component.html` 替换为如下内容，以便把 `HeroDetailComponent` 替换为 `HeroListComponent`：

<code-example path="reactive-forms/src/app/app.component.html" title="app.component.html" linenums="false">

</code-example>

Finally, add an `@Input()` property to the `HeroDetailComponent`
so `HeroDetailComponent` can receive the data from `HeroListComponent`. Remember to add the `Input` symbol to the `@angular/core `  `import` statement in the list of JavaScript imports too.

最后，为 `HeroDetailComponent` 添加一个 `@Input()` 属性，让它能从 `HeroListComponent` 中接收数据。
别忘了也要把来自 `@angular/core` 的 `Input` 符号 `import` 进来。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="hero" title="hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Now you should be able to click on a button for a hero and a form renders.

你先，你就可以点击一个按钮并渲染一个表单了。

## When to set form model values (`ngOnChanges`)

## 何时设置表单模型的值（`ngOnChanges`）

When to set form model values depends upon when the component gets the data model values.

何时设置表单模型的值取决于组件何时获得数据模型的值。

The `HeroListComponent` displays hero names to the user.
When the user clicks on a hero, the `HeroListComponent` passes the selected hero into the `HeroDetailComponent`
by binding to its `hero` `@Input()` property.

`HeroListComponent` 会给用户显示英雄的名字。
当用户点击某个英雄时，`HeroListComponent` 会通过绑定到 `hero` 这个输入属性，把选中的英雄传给 `HeroDetailComponent`。

<code-example path="reactive-forms/src/app/hero-list/hero-list.component.1.html" title="hero-list.component.html (simplified)" linenums="false">

</code-example>

In this approach, the value of `hero` in the `HeroDetailComponent` changes
every time the user selects a new hero.
You can call `setValue()` using the [ngOnChanges](guide/lifecycle-hooks#onchanges)
lifecycle hook, which Angular calls whenever the `@Input()` `hero` property changes.

这种方式下，每当用户选择一个新英雄时，`HeroDetailComponent` 的 `hero` 值就会发生变化。
你可以通过 [ngOnChanges](guide/lifecycle-hooks#onchanges) 生命周期钩子来调用 `setValue()`。只要 `hero` 这个输入属性发生了变化，Angular 就会调用这个钩子。

### Reset the form

### 重置表单

First, import the `OnChanges` symbol in `hero-detail.component.ts`.

首先，在 `hero-detail.component.ts` 中导入 `OnChanges` 符号。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="import-input" title="src/app/hero-detail/hero-detail.component.ts (core imports)" linenums="false">

</code-example>

Next, let Angular know that the `HeroDetailComponent` implements `OnChanges`:

接着，让 Angular 知道 `HeroDetailComponent` 实现了 `OnChanges`：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="onchanges-implementation" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Add the `ngOnChanges` method to the class as follows:

向该类中添加 `ngOnChanges` 方法，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="ngOnChanges" title="src/app/hero-detail/hero-detail.component.ts (ngOnchanges)" linenums="false">

</code-example>

Notice that it calls `rebuildForm()`, which is a method where you
can set the values. You can name `rebuildForm()` anything that makes sense to you. It isn't built into Angular, but is a method you create to effectively leverage the `ngOnChanges` lifecycle hook.

注意，它调用了 `rebuildForm()`，该函数是一个方法，在这里你可以对值进行设置。
你可以把 `rebuildForm()` 命名为任何对你有意义的名字。
它不是 Angular 内置的，而是你自己创建的方法，用以更有效的利用 `ngOnChanges` 钩子。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="rebuildForm" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

The `rebuildForm()` method does two things; resets the hero's name and the address.

`rebuildForm()` 方法会做两件事：重置英雄的名字和地址。

{@a form-array}

## Use _FormArray_ to present an array of `FormGroups`

## 使用 `FormArray` 来表示 `FormGroup` 数组

A `FormGroup` is a named object whose property values are `FormControls` and other `FormGroups`.

`FormGroup` 是一个命名对象，它的属性值是 `FormControl` 和其它的 `FormGroup`。

Sometimes you need to present an arbitrary number of controls or groups.
For example, a hero may have zero, one, or any number of addresses.

有时你需要表示任意数量的控件或控件组。
比如，一个英雄可能拥有 0、1 或任意数量的住址。

The `Hero.addresses` property is an array of `Address` instances.
An `address`  `FormGroup` can display one `Address`.
An Angular `FormArray` can display an array of `address`  `FormGroups`.

`Hero.addresses` 属性就是一个 `Address` 实例的数组。
一个 `address` 的 `FormGroup` 可以显示一个 `Address` 对象。
而 `FormArray` 可以显示一个 `address` `FormGroup` 的数组。

To get access to the `FormArray` class, import it into `hero-detail.component.ts`:

要访问 `FormArray` 类，请先把它导入 `hero-detail.component.ts` 中：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

To work with a `FormArray` do the following:

要使用 `FormArray`，就要这么做：

1. Define the items in the array; that is, `FormControls` or `FormGroups`.

   在数组中定义条目 `FormControl` 或 `FormGroup`。

1. Initialize the array with items created from data in the data model.

   把这个数组初始化微一组从*数据模型*中的数据创建的条目。

1. Add and remove items as the user requires.

   根据用户的需求添加或移除这些条目。

Define a `FormArray` for `Hero.addresses` and
let the user add or modify addresses.

为 `Hero.addresses` 定义了一个 `FormArray`，并且让用户添加或修改这些住址。

You’ll need to redefine the form model in the `HeroDetailComponent` `createForm()` method,
which currently only displays the first hero address in an `address` `FormGroup`:

你需要在 `HeroDetailComponent` 的 `createForm()` 中重新定义表单模型，它现在只在 `address` `FormGroup` 中显示第一个英雄住址。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="address-form-group" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

### From `address` to `secretLairs`

### 从 `address`（住址）到 *`secretLairs`（秘密小屋）

From the user's point of view, heroes don't have _addresses_.
Addresses are for mere mortals. Heroes have _secret lairs_!
Replace the address `FormGroup` definition with a `secretLairs`  `FormArray` definition:

在用户看来，英雄们没有*住址*。
只有我们凡人才有*住址*，英雄们拥有的是*秘密小屋*！
把 `FormGroup` 型的住址替换为 `FormArray` 型的 `secretLairs` 定义：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="secretLairs-form-array" title="src/app/hero-detail/hero-detail-8.component.ts" linenums="false">

</code-example>

In `hero-detail.component.html` change `formArrayName="address"` to `formArrayName="secretLairs"`.

在 `hero-detail.component.html` 中 把 `formArrayName="address"` 改为 `formArrayName="secretLairs"`。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="form-array-name" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

<div class="alert is-helpful">

Changing the form control name from `address` to `secretLairs` underscores an important point:
the _form model_ doesn't have to match the _data model_.

把表单的控件名从 `address` 改为 `secretLairs` 时导致了一个重要问题：*表单模型*与*数据模型*不再匹配了。

Obviously, there has to be a relationship between the two.
But it can be anything that makes sense within the application domain.

显然，必须在两者之间建立关联。但它在应用领域中的意义不限于此，它可以用于任何东西。

_Presentation_ requirements often differ from _data_ requirements.
The reactive forms approach both emphasizes and facilitates this distinction.

*展现*的需求经常会与*数据*的需求不同。
响应式表单的方法既强调这种差异，也能为这种差异提供了便利。

</div>

### Initialize the `secretLairs` _FormArray_

### 初始化 `FormArray` 型的 `secretLairs`

The default form displays a nameless hero with no addresses.

默认的表单显示一个无地址的无名英雄。

You need a method to populate (or repopulate) the `secretLairs` with actual hero addresses whenever
the parent `HeroListComponent` sets the `HeroDetailComponent.hero`  `@Input()` property to a new `Hero`.

你需要一个方法来用实际英雄的地址填充（或重新填充）`secretLairs`，
而不用管父组件 `HeroListComponent` 何时把 `@Input()` 属性 `HeroDetailComponent.hero` 设置为一个新的 `Hero`。

The following `setAddresses()` method replaces the `secretLairs`  `FormArray` with a new `FormArray`,
initialized by an array of hero address `FormGroups`. Add this to the `HeroDetailComponent` class:

下面的 `setAddresses()` 方法把 `secretLairs` 这个 `FormArray` 替换为一个新的 `FormArray`，使用一组表示英雄地址的 `FormGroup` 来进行初始化。在 `HeroDetailComponent` 类中添加下列内容：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="set-addresses" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

Notice that you replace the previous `FormArray` with the
`FormGroup.setControl()` method, not with `setValue()`.
You're replacing a _control_, not the _value_ of a control.

注意，你使用 `FormGroup.setControl()` 方法，而不是 `setValue()` 方法来替换前一个 `FormArray`。
你所要替换的是*控件*，而不是控件的*值*。

Notice also that the `secretLairs`  `FormArray` contains `FormGroups`, not `Addresses`.

还要注意，`secretLairs` 数组中包含的是**`FormGroup`，而不是 `Address`。

Next, call `setAddresses()` from within `rebuildForm()`:

接着，在 `rebuildForm()` 中调用 `setAddresses()`：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="rebuildform" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

### Get the _FormArray_

### 获取 `FormArray`

The `HeroDetailComponent` should be able to display, add, and remove items from the `secretLairs`  `FormArray`.

`HeroDetailComponent` 应该能从 `secretLairs` `FormArray` 中显示、添加和删除条目。

Use the `FormGroup.get()` method to acquire a reference to that `FormArray`.
Wrap the expression in a `secretLairs` convenience property for clarity and re-use. Add the following to `HeroDetailComponent`.

使用 `FormGroup.get()` 方法来获取到 `FormArray` 的引用。
把这个表达式包装进一个名叫 `secretLairs` 的便捷属性中来让它更清晰，并供复用。
在 `HeroDetailComponent` 中添加下列内容。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="get-secret-lairs" title="src/app/hero-detail/hero-detail.component.ts (secretLairs property)" linenums="false">

</code-example>

### Display the _FormArray_

### 显示 `FormArray`

The current HTML template displays a single `address` `FormGroup`.
Revise it to display zero, one, or more of the hero's `address`  `FormGroups`.

当前 HTML 模板显示单个的地址 `FormGroup`。
要把它修改成能显示 0、1 或更多个表示英雄地址的 `FormGroup`。

This is mostly a matter of wrapping the previous template HTML for an address in a `<div>` and
repeating that `<div>` with `*ngFor`.

要改的部分主要是把以前表示地址的 HTML 模板包裹进一个 `<div>` 中，并且使用 `*ngFor` 来重复渲染这个 `<div>`。

There are three key points when writing the `*ngFor`:

写这个 `*ngFor` 有三个要点：

1. Add another wrapping `<div>`, around the `<div>` with `*ngFor`, and
set its `formArrayName` directive to `"secretLairs"`.
This step establishes the `secretLairs`  `FormArray` as the context for form controls in the inner, repeated HTML template.

   在 `*ngFor` 的 `<div>` 之外套上另一个包装 `<div>`，并且把它的 `formArrayName` 指令设为 `"secretLairs"`。
  这一步为内部的表单控件建立了一个 `FormArray` 型的 `secretLairs` 作为上下文，以便重复渲染 HTML 模板。

1. The source of the repeated items is the `FormArray.controls`, not the `FormArray` itself.
Each control is an `address`  `FormGroup`, exactly what the previous (now repeated) template HTML expected.

   这些重复条目的数据源是 `FormArray.controls` 而不是 `FormArray` 本身。
  每个控件都是一个 `FormGroup` 型的地址对象，与以前的模板 HTML 所期望的格式完全一样。

1. Each repeated `FormGroup` needs a unique `formGroupName`, which must be the index of the `FormGroup` in the `FormArray`.
You'll re-use that index to compose a unique label for each address.

   每个被重复渲染的 `FormGroup` 都需要一个独一无二的 `formGroupName`，它必须是 `FormGroup` 在这个 `FormArray` 中的索引。
  你将复用这个索引，以便为每个地址组合出一个独一无二的标签。

Here's the skeleton for the secret lairs section of the HTML template:

下面是 HTML 模板中*秘密小屋*部分的代码骨架：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="form-array-skeleton" title="src/app/hero-detail/hero-detail.component.html (*ngFor)" linenums="false">

</code-example>

Here's the complete template for the secret lairs section. Add this to `HeroDetailComponent` template, replacing the `forGroupName=address`  `<div>`:

这里是*秘密小屋*部分的完整模板：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="form-array" title="src/app/hero-detail/hero-detail.component.html (excerpt)">

</code-example>

### Add a new lair to the _FormArray_

### 把新的小屋添加到 `FormArray` 中

Add an `addLair()` method that gets the `secretLairs`  `FormArray` and appends a new `address`  `FormGroup` to it.

添加一个 `addLair()` 方法，它获取 `secretLairs` 数组，并把新的表示地址的 `FormGroup` 添加到其中。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="add-lair" title="src/app/hero-detail/hero-detail.component.ts (addLair method)" linenums="false">

</code-example>

Place a button on the form so the user can add a new _secret lair_ and wire it to the component's `addLair()` method. Put it just before the closing `</div>` of the `secretLairs`  `FormArray`.

把一个按钮放在表单中，以便用户可以添加新的*秘密小屋*，并把它传给组件的 `addLair()` 方法。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="add-lair" title="src/app/hero-detail/hero-detail.component.html (addLair button)" linenums="false">

</code-example>

<div class="alert is-important">

Be sure to add the `type="button"` attribute 
because without an explicit type, the button type defaults to "submit".
When you later add a form submit action, every "submit" button triggers the submit action which
might do something like save the current changes.
You do not want to save changes when the user clicks the _Add a Secret Lair_ button.

务必确保添加了 `type="button"` 属性。
因为如果不明确指定类型，按钮的默认类型就是“submit”（提交）。
当你稍后添加了提交表单的动作时，每个“submit”按钮都是触发一次提交操作，而它将可能会做一些处理，比如保存当前的修改。
你显然不会希望每当用户点击“Add a Secret Lair”按钮时就保存一次。

</div>

### Try it!

### 试试看！

Back in the browser, select the hero named "Magneta".
"Magneta" doesn't have an address, as you can see in the diagnostic JSON at the bottom of the form.

回到浏览器中，选择名叫“Magneta”的英雄。
"Magneta"没有地址，你会在表单底部的诊断用 JSON 中看到这一点。

<figure>
  <img src="generated/images/guide/reactive-forms/addresses-array.png" alt="JSON output of addresses array">
</figure>

Click the "_Add a Secret Lair_" button.
A new address section appears. Well done!

点击“Add a Secret Lair”按钮，一个新的地址区就出现了，干得好！

### Remove a lair

### 移除一个小屋

This example can _add_ addresses but it can't _remove_ them.
For extra credit, write a `removeLair` method and wire it to a button on the repeating address HTML.

这个例子可以*添加*地址，但是还不能*移除*它们。
作为练习，你可以自己写一个 `removeLair` 方法，并且把它关联到地址 HTML 模板的一个按钮上。

{@a observe-control}

## Observe control changes

## 监视控件的变化

Angular calls `ngOnChanges()` when the user picks a hero in the parent `HeroListComponent`.
Picking a hero changes the `HeroDetailComponent.hero`  `@Input()` property.

每当用户在父组件 `HeroListComponent` 中选取了一个英雄，Angular 就会调用一次 `ngOnChanges`。
选取英雄会修改输入属性 `HeroDetailComponent.hero()`。

Angular does _not_ call `ngOnChanges()` when the user modifies the hero's `name` or `secretLairs`.
Fortunately, you can learn about such changes by subscribing to one of the `FormControl` properties
that raises a change event.

当用户修改英雄的*名字*或*秘密小屋*时，Angular*并不会*调用 `ngOnChanges()`。
幸运的是，你可以通过订阅表单控件的属性之一来了解这些变化，此属性会发出变更通知。

These are properties, such as `valueChanges`, that return an RxJS `Observable`.
You don't need to know much about RxJS `Observable` to monitor form control values.

有一些属性，比如 `valueChanges`，可以返回一个 RxJS 的 `Observable` 对象。
要监听控件值的变化，你并不需要对 RxJS 的 `Observable` 了解更多。

Add the following method to log changes to the value of the `name` `FormControl`.

添加下列方法，以监听 `name` 这个 `FormControl` 中值的变化。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="log-name-change" title="src/app/hero-detail/hero-detail.component.ts (logNameChange)" linenums="false">

</code-example>

Call it in the constructor, after `createForm()`.

在构造函数中调用它，就在 `createForm()` 之后。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="ctor" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

The `logNameChange()` method pushes name-change values into a `nameChangeLog` array.
Display that array at the bottom of the component template with this `*ngFor` binding:

`logNameChange()` 方法会把一条改名记录追加到 `nameChangeLog` 数组中。
用 `*ngFor` 绑定在组件模板的底部显示这个数组：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.html" region="name-change-log" title="src/app/hero-detail/hero-detail.component.html (Name change log)" linenums="false">

</code-example>

Return to the browser, select a hero; for example, Magneta, and start typing in the `name`  `<input>`.
You should see a new name in the log after each keystroke.

返回浏览器，选择一个英雄（比如“Magneta”），并开始在 `name` 输入框中键入。
你会看到，每次按键都会记录一个新名字。

### When to use it

### 什么时候用它

An interpolation binding is the easier way to display a name change.
Subscribing to an observable `FormControl` property is handy for triggering
application logic within the component class.

插值表达式绑定时显示姓名变化比较简单的方式。
在组件类中订阅表单控件属性变化的可观察对象以触发应用逻辑则是比较难的方式。

{@a save}

## Save form data

## 保存表单数据

The `HeroDetailComponent` captures user input but it doesn't do anything with it.
In a real app, you'd probably save those hero changes, revert unsaved changes, and resume editing.
After you implement both features in this section, the form will look like this:

`HeroDetailComponent` 捕获了用户输入，但没有用它做任何事。
在真实的应用中，你可能要保存这些英雄的变化。
在真实的应用中，你还要能丢弃未保存的变更，然后继续编辑。
在实现完本节的这些特性之后，表单是这样的：

<figure>
  <img src="generated/images/guide/reactive-forms/save-revert-buttons.png" alt="Form with save & revert buttons">
</figure>

### Save

### 保存

When the user submits the form,
the `HeroDetailComponent` will pass an instance of the hero _data model_
to a save method on the injected `HeroService`. Add the following to `HeroDetailComponent`.

当用户提交表单时，`HeroDetailComponent` 会把英雄实例的*数据模型*传给所注入进来的 `HeroService` 的一个方法来进行保存。
在 `HeroDetailComponent` 中添加如下内容：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="on-submit" title="src/app/hero-detail/hero-detail.component.ts (onSubmit)" linenums="false">

</code-example>

<!-- TODO: Need to add `private heroService: HeroService` to constructor and import the HeroService. Remove novalidate-->

This original `hero` had the pre-save values. The user's changes are still in the _form model_.
So you create a new `hero` from a combination of original hero values (the `hero.id`)
and deep copies of the changed form model values, using the `prepareSaveHero()` helper.

原始的 `hero` 中有一些保存之前的值，用户的修改仍然是在*表单模型*中。
所以你要根据原始英雄（根据 `hero.id` 找到它）的值组合出一个新的 `hero` 对象，并用 `prepareSaveHero()` 助手来深层复制变化后的模型值。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="prepare-save-hero" title="src/app/hero-detail/hero-detail.component.ts (prepareSaveHero)" linenums="false">

</code-example>

Make sure to import `HeroService` and add it to the constructor:

确保导入了 `HeroService` 并把它加入了构造函数中：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="import-service" title="src/app/hero-detail/hero-detail.component.ts (prepareSaveHero)" linenums="false">

</code-example>

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="ctor" title="src/app/hero-detail/hero-detail.component.ts (prepareSaveHero)" linenums="false">

</code-example>

<div class="l-sub-section">

**Address deep copy**

**地址的深层复制**

Had you assigned the `formModel.secretLairs` to `saveHero.addresses` (see line commented out),
the addresses in `saveHero.addresses` array would be the same objects
as the lairs in the `formModel.secretLairs`.
A user's subsequent changes to a lair street would mutate an address street in the `saveHero`.

你已经把 `formModel.secretLairs` 赋值给了 `saveHero.addresses`（参见注释掉的部分），
`saveHero.addresses` 数组中的地址和 `formModel.secretLairs` 中的会是同一个对象。
用户随后对小屋所在街道的修改将会改变 `saveHero` 中的街道地址。

The `prepareSaveHero` method makes copies of the form model's `secretLairs` objects so that can't happen.

但 `prepareSaveHero` 方法会制作表单模型中的 `secretLairs` 对象的复本，因此实际上并没有修改原有对象。

</div>

### Revert (cancel changes)

### 丢弃（撤销修改）

The user cancels changes and reverts the form to the original state by pressing the Revert button.

用户可以撤销修改，并通过点击 *Revert* 按钮来把表单恢复到原始状态。

Reverting is easy. Simply re-execute the `rebuildForm()` method that built the form model from the original, unchanged `hero` data model.

丢弃很容易。只要重新执行 `rebuildForm()` 方法就可以根据原始的、未修改过的 `hero` 数据模型重新构建出表单模型。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="revert" title="src/app/hero-detail/hero-detail.component.ts (revert)" linenums="false">

</code-example>

### Buttons

### 按钮

Add the "Save" and "Revert" buttons near the top of the component's template:

把“Save”和“Revert”按钮添加到组件模板的顶部：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.html" region="buttons" title="src/app/hero-detail/hero-detail.component.html (Save and Revert buttons)" linenums="false">

</code-example>

The buttons are disabled until the user "dirties" the form by changing a value in any of its form controls (`heroForm.dirty`).

这些按钮默认是禁用的，直到用户通过修改任何一个表单控件的值“弄脏”了表单中的数据（即 `heroForm.dirty`）。

Clicking a button of type `"submit"` triggers the `ngSubmit` event which calls the component's `onSubmit` method.
Clicking the revert button triggers a call to the component's `revert` method.
Users now can save or revert changes.

点击一个类型为 `"submit"` 的按钮会触发 `ngSubmit` 事件，而它会调用组件的 `onSubmit` 方法。
点击“Revert”按钮则会调用组件的 `revert` 方法。
现在，用户可以保存或放弃修改了。

Try the <live-example stackblitz="final" title="Reactive Forms (final) in Stackblitz"></live-example>.

试试 <live-example stackblitz="final" title="Reactive Forms (final) in Stackblitz"></live-example>.

{@a source-code}

The key files of the final version are as follows:

最终版中的核心文件如下：

<code-tabs>

  <code-pane title="src/app/app.component.html" path="reactive-forms/src/app/app.component.html">

  </code-pane>

  <code-pane title="src/app/app.component.ts" path="reactive-forms/src/app/app.component.ts">

  </code-pane>

  <code-pane title="src/app/app.module.ts" path="reactive-forms/src/app/app.module.ts">

  </code-pane>

  <code-pane title="src/app/hero-detail/hero-detail.component.ts" path="reactive-forms/src/app/hero-detail/hero-detail.component.ts">

  </code-pane>

  <code-pane title="src/app/hero-detail/hero-detail.component.html" path="reactive-forms/src/app/hero-detail/hero-detail.component.html">

  </code-pane>

  <code-pane title="src/app/hero-list/hero-list.component.html" path="reactive-forms/src/app/hero-list/hero-list.component.html">

  </code-pane>

  <code-pane title="src/app/hero-list/hero-list.component.ts" path="reactive-forms/src/app/hero-list/hero-list.component.ts">

  </code-pane>

  <code-pane title="src/app/data-model.ts" path="reactive-forms/src/app/data-model.ts">

  </code-pane>

  <code-pane title="src/app/hero.service.ts" path="reactive-forms/src/app/hero.service.ts">

  </code-pane>

</code-tabs>

You can download the complete source for all steps in this guide
from the <live-example title="Reactive Forms Demo in Stackblitz">Reactive Forms Demo</live-example> live example.

你可以到<live-example title="Reactive Forms Demo in Stackblitz">响应式表单在线例子</live-example>中下载本章所有步骤的完整代码。
