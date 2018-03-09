# Reactive Forms

# 响应式表单

_Reactive forms_ is an Angular technique for creating forms in a _reactive_ style.
This guide explains reactive forms as you follow the steps to build a "Hero Detail Editor" form.

*响应式表单*是Angular中用*响应式*风格创建表单的技术。
本章中，我们会在构建“英雄详情编辑器”的过程中，逐步讲解响应式表单的概念。

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

Angular提供了两种构建表单的技术：*响应式*表单和*模板驱动*表单。
这两项技术都属于`@angular/forms`库，并且共享一组公共的表单控件类。

But they diverge markedly in philosophy, programming style, and technique.
They even have their own modules: the `ReactiveFormsModule` and the `FormsModule`.

但是它们在设计哲学、编程风格和具体技术上有显著区别。
所以，它们都有自己的模块：`ReactiveFormsModule` 和 `FormsModule`。

### _Reactive_ forms

### *响应式*表单

Angular _reactive_ forms facilitate a _reactive style_ of programming
that favors explicit management of the data flowing between
a non-UI _data model_ (typically retrieved from a server) and a
UI-oriented _form model_ that retains the states
and values of the HTML controls on screen. Reactive forms offer the ease
of using reactive patterns, testing, and validation.

Angular的*响应式*表单能让实现*响应式编程风格*更容易，这种编程风格更倾向于在非UI的*数据模型*（通常接收自服务器）之间显式的管理数据流，
并且用一个UI导向的*表单模型*来保存屏幕上HTML控件的状态和值。
响应式表单可以让使用响应式编程模式、测试和校验变得更容易。

With _reactive_ forms, you create a tree of Angular form control objects
in the component class and bind them to native form control elements in the
component template, using techniques described in this guide.

使用*响应式*表单，我们可以在组件中创建表单控件的对象树，并使用本章中传授的技巧把它们绑定到组件模板中的原生表单控件元素上。

You create and manipulate form control objects directly in the
component class. As the component class has immediate access to both the data
model and the form control structure, you can push data model values into
the form controls and pull user-changed values back out. The component can
observe changes in form control state and react to those changes.

我们可以在组件类中直接创建和维护表单控件对象。由于组件类可以同时访问数据模型和表单控件结构，
因此我们可以把表单模型值的变化推送到表单控件中，并把变化后的值拉取回来。
组件可以监听表单控件状态的变化，并对此做出响应。

One advantage of working with form control objects directly is that value and validity updates
are [always synchronous and under your control](guide/reactive-forms#async-vs-sync "Async vs sync").
You won't encounter the timing issues that sometimes plague a template-driven form
and reactive forms can be easier to unit test.

直接使用表单控件对象的优点之一是值和有效性状态的更新[总是同步的，并且在你的控制之下](guide/reactive-forms#async-vs-sync "Async vs sync")。
我们不会遇到时序问题，这个问题有时在模板驱动表单中会成为灾难。而且响应式表单更容易进行单元测试。

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

### _Template-driven_ forms

### *模板驱动*表单

_Template-driven_ forms, introduced in the [Template guide](guide/forms), take a completely different approach.

在[模板](guide/forms)一章我们介绍过的*模板驱动*表单，是一种完全不同的方式。

You place HTML form controls (such as `<input>` and `<select>`) in the component template and
bind them to _data model_ properties in the component, using directives
like `ngModel`.

我们把HTML表单控件（比如`<input>`和`<select>`）放进组件模板中，并用`ngModel`等指令把它们绑定到组件中*数据模型*的属性上。

You don't create Angular form control objects. Angular directives
create them for you, using the information in your data bindings.
You don't push and pull data values. Angular handles that for you with `ngModel`.
Angular updates the mutable _data model_ with user changes as they happen.

我们不用自己创建Angular表单控件对象。Angular指令会使用数据绑定中的信息创建它们。
我们不用自己推送和拉取数据。Angular使用`ngModel`来替你管理它们。
当用户做出修改时，Angular会据此更新可变的*数据模型*。

For this reason, the `ngModel` directive is not part of the ReactiveFormsModule.

因此，`ngModel`并不是`ReactiveFormsModule`模块的一部分。

While this means less code in the component class,
[template-driven forms are asynchronous](guide/reactive-forms#async-vs-sync "Async vs sync")
which may complicate development in more advanced scenarios.

虽然这意味着组件中的代码更少，但是[模板驱动表单是异步工作的](guide/reactive-forms#async-vs-sync "Async vs sync")，这可能在更高级的场景中让开发复杂化。

{@a async-vs-sync}

### Async vs. sync

### 异步 vs. 同步

Reactive forms are synchronous. Template-driven forms are asynchronous. It's a difference that matters.

响应式表单是同步的。模板驱动表单是异步的。这个不同点很重要。

In reactive forms, you create the entire form control tree in code.
You can immediately update a value or drill down through the descendents of the parent form
because all controls are always available.

使用响应式表单，我们会在代码中创建整个表单控件树。
我们可以立即更新一个值或者深入到表单中的任意节点，因为所有的控件都始终是可用的。

Template-driven forms delegate creation of their form controls to directives.
To avoid "_changed after checked_" errors,
these directives take more than one cycle to build the entire control tree.
That means you must wait a tick before manipulating any of the controls
from within the component class.

模板驱动表单会委托指令来创建它们的表单控件。
为了消除“检查完后又变化了”的错误，这些指令需要消耗一个以上的变更检测周期来构建整个控件树。
这意味着在从组件类中操纵任何控件之前，我们都必须先等待一个节拍。

For example, if you inject the form control with a `@ViewChild(NgForm)` query and examine it in the
[`ngAfterViewInit` lifecycle hook](guide/lifecycle-hooks#afterview "Lifecycle hooks guide: AfterView"),
you'll discover that it has no children.
You must wait a tick, using `setTimeout`, before you can
extract a value from a control, test its validity, or set it to a new value.

比如，如果我们用`@ViewChild(NgForm)`查询来注入表单控件，并在[生命周期钩子`ngAfterViewInit`](guide/lifecycle-hooks#afterview "Lifecycle hooks guide: AfterView")中检查它，就会发现它没有子控件。
我们必须使用`setTimeout`等待一个节拍才能从控件中提取值、测试有效性，或把它设置为新值。

The asynchrony of template-driven forms also complicates unit testing.
You must wrap your test block in `async()` or `fakeAsync()` to
avoid looking for values in the form that aren't there yet.
With reactive forms, everything is available when you expect it to be.

模板驱动表单的异步性让单元测试也变得复杂化了。
我们必须把测试代码包裹在`async()`或`fakeAsync()`中来解决要查阅的值尚不存在的情况。
使用响应式表单，在所期望的时机一切都是可用的。

### Which is better, reactive or template-driven?

### 哪一个更好？响应式还是模板驱动？

Neither is "better".
They're two different architectural paradigms,
with their own strengths and weaknesses.
Choose the approach that works best for you.
You may decide to use both in the same application.

没有哪个“更好”。
它们是两种架构范式，各有优缺点。
请自行选择更合适的方法，甚至可以在同一个应用中同时使用它们。

The balance of this _reactive forms_ guide explores the _reactive_ paradigm and
concentrates exclusively on reactive forms techniques.
For information on _template-driven forms_, see the [_Forms_](guide/forms) guide.

在这章*响应式表单*中，我们只专注于*响应式*范式以及响应式表单技术的详情。

In the next section, you'll set up your project for the reactive form demo.
Then you'll learn about the [Angular form classes](guide/reactive-forms#essentials) and how to use them in a reactive form.

在下一节，我们将先准备一个响应式表单范例的项目，然后就可以开始学习[Angular表单类](guide/reactive-forms#essentials)，并在响应式表单中使用它们了。

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
我们需要一个`Hero`类和一些英雄数据。

Using the CLI, generate a new class named `data-model`:

使用 CLI 创建一个名叫 `data-model` 的新类：

<code-example language="sh" class="code-shell">

  ng generate class data-model

</code-example>

And copy the content below:

并复制下列内容：

<code-example path="reactive-forms/src/app/data-model.ts" title="src/app/data-model.ts" linenums="false">

</code-example>

The file exports two classes and two constants. The `Address`
and `Hero` classes define the application _data model_.
The `heroes` and `states` constants supply the test data.

这个文件导出两个类和两个常量。`Address`和`Hero`类定义应用的*数据模型*。
`heroes`和`states`常量提供测试数据。

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

接下来，创建并导出一个带`FormControl`的`HeroDetailComponent`类。
`FormControl`是一个指令，它允许我们直接创建并管理一个`FormControl`实例。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-1.component.ts" region="v1" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Here you are creating a `FormControl` called `name`.
It will be bound in the template to an HTML `input` box for the hero name.

这里我们创建了一个名叫`name`的`FormControl`。
它将会绑定到模板中的一个`input`框，表示英雄的名字。

A `FormControl` constructor accepts three, optional arguments:
the initial data value, an array of validators, and an array of async validators.

`FormControl`构造函数接收三个可选参数：
初始值、验证器数组和异步验证器数组。

This simple control doesn't have data or validators.
In real apps, most form controls have both.

最简单的控件并不需要数据或验证器，但是在实际应用中，大部分表单控件都会同时具备它们。

<div class="l-sub-section">

This guide touches only briefly on `Validators`. For an in-depth look at them,
read the [Form Validation](guide/form-validation) guide.

本章中只会接触`Validators`中的一点点，要想更深入的了解它们，请阅读烹饪宝典中的[表单验证](guide/form-validation)一章。

</div>

{@a create-template}

## Create the template

## 创建模板

Now update the component's template, with the following markup.

现在，修改组件的模板文件`src/app/hero-detail.component.html`，内容如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-1.component.html" region="simple-control" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

To let Angular know that this is the input that you want to
associate to the `name` `FormControl` in the class,
you need `[formControl]="name"` in the template on the `<input>`.

要让Angular知道我们希望把这个输入框关联到类中的`FormControl`型属性`name`，我们需要在模板中的`<input>`上加一句`[formControl]="name"`。

<div class="l-sub-section">

Disregard the `form-control` _CSS_ class. It belongs to the
<a href="http://getbootstrap.com/" title="Bootstrap CSS">Bootstrap CSS library</a>,
not Angular.
It _styles_ the form but in no way impacts the logic of the form.

请忽略CSS类`form-control`，它属于<a href="http://getbootstrap.com/" target="_blank" title="Bootstrap CSS">Bootstrap CSS library</a>而不是Angular。
它会为表单添加样式，但是对表单的逻辑毫无影响。

</div>

{@a import}

## Import the _ReactiveFormsModule_

## 导入`ReactiveFormsModule`

The HeroDetailComponent template uses `formControlName`
directive from the `ReactiveFormsModule`.

`HeroDetailComponent`的模板中使用了来自`ReactiveFormsModule`的`formControlName`。

Do the following two things in `app.module.ts`:

在 `app.module.ts` 中做了下面两件事：

1. Use a JavaScript `import` statement to access
the `ReactiveFormsModule`.

   使用JavaScript的`import`语句访问`ReactiveFormsModule`和`HeroDetailComponent`。

1. Add `ReactiveFormsModule` to the `AppModule`'s `imports` list.

   把`ReactiveFormsModule`添加到`AppModule`的`imports`列表中。

<code-example path="reactive-forms/src/app/app.module.ts" region="v1" title="src/app/app.module.ts (excerpt)" linenums="false">

</code-example>

{@a update}

## Display the _HeroDetailComponent_

## 显示`HeroDetailComponent`

Revise the `AppComponent` template so it displays the `HeroDetailComponent`.

修改`AppComponent`的模板，以便显示`HeroDetailComponent`。

<code-example path="reactive-forms/src/app/app.component.1.html" title="src/app/app.component.html" linenums="false">

</code-example>

{@a essentials}

### Essential form classes

### 基础的表单类

It may be helpful to read a brief description of the core form classes.

阅读一下这些核心表单类的简短描述也许会有用。

* [_AbstractControl_](api/forms/AbstractControl "API Reference: AbstractControl")
is the abstract base class for the three concrete form control classes:
`FormControl`, `FormGroup`, and `FormArray`.
It provides their common behaviors and properties, some of which are _observable_.

   [`AbstractControl`](api/forms/AbstractControl "API Reference: AbstractControl")是三个具体表单类的抽象基类。
  并为它们提供了一些共同的行为和属性，其中有些是*可观察对象（Observable）*。

* [_FormControl_](api/forms/FormControl "API Reference: FormControl")
tracks the value and validity status of an _individual_ form control.
It corresponds to an HTML form control such as an input box or selector.

   [_FormControl_](api/forms/FormControl "API Reference: FormControl")
  用于跟踪一个*单独的*表单控件的值和有效性状态。它对应于一个HTML表单控件，比如输入框和下拉框。

* [_FormGroup_](api/forms/FormGroup "API Reference: FormGroup")
tracks the value and validity state of a _group_ of `AbstractControl` instances.
The group's properties include its child controls.
The top-level form in your component is a `FormGroup`.

   [_FormGroup_](api/forms/FormGroup "API Reference: FormGroup")用于
  跟踪*一组*`AbstractControl`的实例的值和有效性状态。
  该组的属性中包含了它的子控件。
  组件中的顶级表单就是一个`FormGroup`。

* [_FormArray_](api/forms/FormArray "API Reference: FormArray")
tracks the value and validity state of a numerically indexed _array_ of `AbstractControl` instances.

   [_FormArray_](api/forms/FormArray "API Reference: FormArray")用于跟踪`AbstractControl`实例组成的有序数组的值和有效性状态。

You'll learn more about these classes as you work through this guide.

随着本章的深入，我们将学到关于这三个类的更多知识。

### Style the app

### 为应用添加样式

You used bootstrap CSS classes in the template HTML of both the `AppComponent` and the `HeroDetailComponent`.
Add the `bootstrap` _CSS stylesheet_ to the head of `styles.css`:

我们在`AppComponent`和`HeroDetailComponent`的模板中使用Bootstrap中的CSS类。请把`bootstrap`的*CSS样式表文件*添加到`index.html`的`head`区。

<code-example path="reactive-forms/src/styles.1.css" title="styles.css" linenums="false">

</code-example>

Now that everything is wired up, the browser should display something like this:

这些做好之后，浏览器中应该显示成这样：

<figure>
  <img src="generated/images/guide/reactive-forms/just-formcontrol.png" alt="Single FormControl">
</figure>

{@a formgroup}

## Add a FormGroup

## 添加FormGroup

Usually, if you have multiple *FormControls*, you'll want to register
them within a parent `FormGroup`.
This is simple to do. To add a `FormGroup`, add it to the imports section
of `hero-detail.component.ts`:

通常，如果有多个*FormControl*，我们会希望把它们注册进一个父`FormGroup`中。这很容易。只要把它加入`hero-detail.component.ts`的`import`区就可以了。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

In the class, wrap the `FormControl` in a `FormGroup` called `heroForm` as follows:

在这个类中，把`FormControl`包裹进了一个名叫`heroForm`的`FormGroup`中，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.ts" region="v2" title="src/app/hero-detail/hero-detail.component.ts" linenums="false">

</code-example>

Now that you've made changes in the class, they need to be reflected in the
template. Update `hero-detail.component.html` by replacing it with the following.

现在我们改完了这个类，该把它映射到模板中了。把`hero-detail.component.html`改成这样：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.html" region="basic-form" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

Notice that now the single input is in a `form` element. The `novalidate`
attribute in the `<form>` element prevents the browser
from attempting native HTML validations.

注意，现在单行输入框位于一个`form`元素中。`<form>`元素上的`novalidate`属性会阻止浏览器使用原生HTML中的表单验证器。

`formGroup` is a reactive form directive that takes an existing
`FormGroup` instance and associates it with an HTML element.
In this case, it associates the `FormGroup` you saved as
`heroForm` with the form element.

`formGroup`是一个响应式表单的指令，它拿到一个现有`FormGroup`实例，并把它关联到一个HTML元素上。
这种情况下，它关联到的是`form`元素上的`FormGroup`实例`heroForm`。

Because the class now has a `FormGroup`, you must update the template
syntax for associating the input with the corresponding
`FormControl` in the component class.
Without a parent `FormGroup`,
`[formControl]="name"` worked earlier because that directive
can stand alone, that is, it works without being in a `FormGroup`.
With a parent `FormGroup`, the `name` input needs the syntax
`formControlName=name` in order to be associated
with the correct `FormControl`
in the class. This syntax tells Angular to look for the parent
`FormGroup`, in this case `heroForm`, and then _inside_ that group
to look for a `FormControl` called `name`.

由于现在有了一个`FormGroup`，因此我们必须修改模板语法来把输入框关联到组件类中对应的`FormControl`上。
以前没有父`FormGroup`的时候，`[formControl]="name"`也能正常工作，因为该指令可以独立工作，也就是说，不在`FormGroup`中时它也能用。
有了`FormGroup`，`name`输入框就需要再添加一个语法`formControlName=name`，以便让它关联到类中正确的`FormControl`上。
这个语法告诉Angular，查阅父`FormGroup`（这里是`heroForm`），然后在这个`FormGroup`中查阅一个名叫`name`的`FormControl`。

<div class="l-sub-section">

Disregard the `form-group` _CSS_ class. It belongs to the
<a href="http://getbootstrap.com/" title="Bootstrap CSS">Bootstrap CSS library</a>,
not Angular.
Like the `form-control` class, it _styles_ the form
but in no way impacts its logic.

请无视*CSS*类`form-group`，它属于<a href="http://getbootstrap.com/" target="_blank" title="Bootstrap CSS">Bootstrap CSS library</a>而不是Angular。
就像`form-control`类一样，它只是为表单添加样式，而对表单逻辑毫无影响。

</div>

The form looks great. But does it work?
When the user enters a name, where does the value go?

表单看起来很棒，但是它能用吗？
当用户输入名字时，它的值去了哪里？

{@a json}

## Taking a look at the form model

## 表单模型概览

The value goes into the **_form model_** that backs the group's `FormControls`.
To see the form model, add the following line after the
closing `form` tag in the `hero-detail.component.html`:

这个值进入了幕后**表单模型**中的`FormControl`构成的表单组。
要想知道表单模型是什么样的，请在`hero-detail.component.html`的`form`标签紧后面添加如下代码：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-2.component.html" region="form-value-json" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

The `heroForm.value` returns the _form model_.
Piping it through the `JsonPipe` renders the model as JSON in the browser:

`heroForm.value`会返回表单模型。
用`JsonPipe`管道把这个模型以JSON格式渲染到浏览器中。

<figure>
  <img src="generated/images/guide/reactive-forms/json-output.png" alt="JSON output">
</figure>

The initial `name` property value is the empty string.
Type into the _name_ input box and watch the keystokes appear in the JSON.

最初的`name`属性是个空字符串，在*name*输入框中输入之后，可以看到这些按键出现在了JSON中。

Great! You have the basics of a form.

真棒！我们有了一个基本版表单。

In real life apps, forms get big fast.
`FormBuilder` makes form development and maintenance easier.

在真实的应用中，表单很快就会变大。
`FormBuilder`能让表单开发和维护变得更简单。

{@a formbuilder}

## Introduction to _FormBuilder_

## `FormBuilder`简介

The `FormBuilder` class helps reduce repetition and
clutter by handling details of control creation for you.

`FormBuilder`类能通过处理控件创建的细节问题来帮我们减少重复劳动。

To use `FormBuilder`, you need to import it into `hero-detail.component.ts`:

要使用`FormBuilder`，我们就要先把它导入到`hero-detail.component.ts`中：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3a.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Use it now to refactor the `HeroDetailComponent` into something that's a little easier to read and write,
by following this plan:

现在，我们遵循下列步骤用`FormBuilder`来把`HeroDetailComponent`重构得更加容易读写。

* Explicitly declare the type of the `heroForm` property to be `FormGroup`; you'll initialize it later.

   明确把`heroForm`属性的类型声明为`FormGroup`，稍后我们会初始化它。

* Inject a `FormBuilder` into the constructor.

   把`FormBuilder`注入到构造函数中。

* Add a new method that uses the `FormBuilder` to define the `heroForm`; call it `createForm`.

   添加一个名叫`createForm`的新方法，它会用`FormBuilder`来定义`heroForm`。

* Call `createForm` in the constructor.

   在构造函数中调用`createForm`。

The revised `HeroDetailComponent` looks like this:

修改过的`HeroDetailComponent`代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3a.component.ts" region="v3a" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

`FormBuilder.group` is a factory method that creates a `FormGroup`. &nbsp;
`FormBuilder.group` takes an object whose keys and values are `FormControl` names and their definitions.
In this example, the `name` control is defined by its initial data value, an empty string.

`FormBuilder.group`是一个用来创建`FormGroup`的工厂方法，它接受一个对象，对象的键和值分别是`FormControl`的名字和它的定义。
在这个例子中，`name`控件的初始值是空字符串。

Defining a group of controls in a single object makes for a compact, readable style.
It beats writing an equivalent series of `new FormControl(...)` statements.

把一组控件定义在一个单一对象中，可以更加紧凑、易读。
完成相同功能时，这种形式优于一系列`new FormControl(...)`语句。

{@a validators}

### Validators.required

### Validators.required 验证器

Though this guide doesn't go deeply into validations, here is one example that
demonstrates the simplicity of using `Validators.required` in reactive forms.

虽然本章不会深入讲解验证机制，但还是有一个例子来示范如何简单的在响应式表单中使用`Validators.required`。

First, import the `Validators` symbol.

首先，导入`Validators`符号。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

To make the `name` `FormControl` required, replace the `name`
property in the `FormGroup` with an array.
The first item is the initial value for `name`;
the second is the required validator, `Validators.required`.

要想让`name`这个`FormControl`是必须的，请把`FormGroup`中的`name`属性改为一个数组。第一个条目是`name`的初始值，第二个是`required`验证器：`Validators.required`。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-3.component.ts" region="required" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

<div class="l-sub-section">

Reactive validators are simple, composable functions.
Configuring validation is harder in template-driven forms where you must wrap validators in a directive.

响应式验证器是一些简单、可组合的函数。
在模板驱动表单中配置验证器有些困难，因为我们必须把验证器包装进指令中。

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

`Validators.required` is working. The status is `INVALID` because the input box has no value.
Type into the input box to see the status change from `INVALID` to `VALID`.

`Validators.required`生效了，但状态还是`INVALID`，因为输入框中还没有值。
在输入框中输入，就会看到这个状态从`INVALID`变成了`VALID`。

In a real app, you'd replace the diagnosic message with a user-friendly experience.

在真实的应用中，我们要把这些诊断信息替换成用户友好的信息。

Using `Validators.required` is optional for the rest of the guide.
It remains in each of the following examples with the same configuration.

在本章的其余部分，`Validators.required`是可有可无的，但在每个与此范例配置相同的范例中都会保留它。

For more on validating Angular forms, see the
[Form Validation](guide/form-validation) guide.

要了解Angular表单验证器的更多知识，参见[表单验证器](guide/form-validation)一章。

### More FormControls

### 更多的表单控件（FormControl）

A hero has more than a name.
A hero has an address, a super power and sometimes a sidekick too.

每个英雄可以有多个名字，还有一个住址、一项超能力，有时还会有一个副手。

The address has a state property. The user will select a state with a `<select>` box and you'll populate
the `<option>` elements with states. So import `states` from `data-model.ts`.

住址中有一个所在州属性，用户将会从`<select>`框中选择一个州，我们会用`<option>`元素渲染各个州。我们从`data-model.ts`中导入`states`（州列表）。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-4.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Declare the `states` property and add some address `FormControls` to the `heroForm` as follows.

声明`states`属性并往`heroForm`中添加一些表示住址的`FormControl`，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-4.component.ts" region="v4" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

Then add corresponding markup in `hero-detail.component.html`
within the `form` element.

然后在`hero-detail.component.html`文件中把对应的脚本添加到`form`元素中。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-4.component.html" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

<div class="alert is-helpful">

*Reminder*: Ignore the many mentions of `form-group`,
`form-control`, `center-block`, and `checkbox` in this markup.
Those are _bootstrap_ CSS classes that Angular itself ignores.
Pay attention to the `[formGroup]` and `formControlName` attributes.
They are the Angular directives that bind the HTML controls to the
Angular `FormGroup` and `FormControl` properties in the component class.

*注意*：不用管这些脚本中提到的`form-group`、`form-control`、`center-block`和`checkbox`等。
它们是来自*Bootstrap*的CSS类，Angular本身不会管它们。
注意`formGroupName`和`formControlName`属性。
他们是Angular指令，用于把相应的HTML控件绑定到组件中的`FormGroup`和`FormControl`类型的属性上。

</div>

The revised template includes more text inputs, a select box for the `state`, radio buttons for the `power`,
and a checkbox for the `sidekick`.

修改过的模板包含更多文本输入框，一个`state`选择框，`power`（超能力）的单选按钮和一个`sidekick`检查框。

You must bind the option's value property with `[value]="state"`.
If you do not bind the value, the select shows the first option from the data model.

我们要用`[value]="state"`来绑定选项的`value`属性。
如果不绑定这个值，这个选择框就会显示来自数据模型中的第一个选项。

The component _class_ defines control properties without regard for their representation in the template.
You define the `state`, `power`, and `sidekick` controls the same way you defined the `name` control.
You tie these controls to the template HTML elements in the same way,
specifying the `FormControl` name with the `formControlName` directive.

组件*类*定义了控件属性而不用管它们在模板中的表现形式。
我们可以像定义`name`控件一样定义`state`、`power`和`sidekick`控件，并用`formControlName`指令来指定`FormControl`的名字。

See the API reference for more information about
[radio buttons](api/forms/RadioControlValueAccessor "API: RadioControlValueAccessor"),
[selects](api/forms/SelectControlValueAccessor "API: SelectControlValueAccessor"), and
[checkboxes](api/forms/CheckboxControlValueAccessor "API: CheckboxControlValueAccessor").

参见API参考手册中的[radio buttons](api/forms/RadioControlValueAccessor "API: RadioControlValueAccessor")、
  [selects](api/forms/SelectControlValueAccessor "API: SelectControlValueAccessor")和
  [checkboxes](api/forms/CheckboxControlValueAccessor "API: CheckboxControlValueAccessor")

{@a grouping}

### Nested FormGroups

### 多级`FormGroup`

This form is getting big and unwieldy. You can group some of the related `FormControls`
into a nested `FormGroup`. The `street`, `city`, `state`, and `zip` are properties
that would make a good _address_ `FormGroup`.
Nesting groups and controls in this way allows you to
mirror the hierarchical structure of the data model
and helps track validation and state for related sets of controls.

这个表单变得越来越大、越来越笨重。我们可以把一些相关的`FormControl`组织到多级`FormGroup`中。
`street`、`city`、`state`和`zip`属性就可以作为一个名叫`address`的`FormGroup`。
用这种方式，多级表单组和控件可以让我们轻松地映射多层结构的数据模型，以便帮助我们跟踪这组相关控件的有效性和状态。

You used the `FormBuilder` to create one `FormGroup` in this component called `heroForm`.
Let that be the parent `FormGroup`.
Use `FormBuilder` again to create a child `FormGroup` that encapsulates the address controls;
assign the result to a new `address` property of the parent `FormGroup`.

我们用`FormBuilder`在这个名叫`heroForm`的组件中创建一个`FormGroup`，并把它用作父`FormGroup`。
再次使用`FormBuilder`创建一个子级`FormGroup`，其中包括这些住址控件。把结果赋值给父`FormGroup`中新的`address`属性。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.ts" region="v5" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

You’ve changed the structure of the form controls in the component class;
you must make corresponding adjustments to the component template.

我们已经修改了组件类中表单控件的结构，还必须对组件模板进行相应的调整。

In `hero-detail.component.html`, wrap the address-related `FormControls` in a `div`.
Add a `formGroupName` directive to the `div` and bind it to `"address"`.
That's the property of the _address_ child `FormGroup` within the parent `FormGroup` called `heroForm`.

在`hero-detail.component.html`中，把与住址有关的`FormControl`包裹进一个`div`中。
往这个`div`上添加一个`formGroupName`指令，并且把它绑定到`"address"`上。
这个`address`属性是一个`FormGroup`，它的父`FormGroup`就是`heroForm`。

To make this change visually obvious, slip in an `<h4>` header near the top with the text, _Secret Lair_.
The new _address_ HTML looks like this:

要让这个变化更加明显，在文本的顶部加入一个`<h4>`头：*Secret Lair*。
新的*住址*组的HTML如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.html" region="add-group" title="src/app/hero-detail/hero-detail.component.html (excerpt)" linenums="false">

</code-example>

After these changes, the JSON output in the browser shows the revised _form model_
with the nested address `FormGroup`:

做完这些之后，浏览器中的JSON输出就变成了带有多级`FormGroup`的住址。

<figure>
  <img src="generated/images/guide/reactive-forms/address-group.png" alt="JSON output">
</figure>

Great! You’ve made a group and you can see that the template
and the form model are talking to one another.

真棒！我们制作了一个控件组，并且可以看到模板和表单模型已经能彼此通讯了。

{@a properties}

## Inspect _FormControl_ Properties

## 查看`FormControl`的属性

At the moment, you're dumping the entire form model onto the page.
Sometimes you're interested only in the state of one particular `FormControl`.

此刻，我们把整个表单模型展示在了页面里。
但有时我们可能只关心一个特定`FormControl`的状态。

You can inspect an individual `FormControl` within a form by extracting it with the `.get()` method.
You can do this _within_ the component class or display it on the
page by adding the following to the template,
immediately after the `{{form.value | json}}` interpolation as follows:

我们可以使用`.get()`方法来提取表单中一个单独`FormControl`的状态。
我们可以在组件类中这么做，或者通过往模板中添加下列代码来把它显示在页面中，就添加在`{{form.value | json}}`插值表达式的紧后面：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.html" region="inspect-value" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

To get the state of a `FormControl` that’s inside a `FormGroup`, use dot notation to path to the control.

要点取得`FormGroup`中的`FormControl`的状态，使用点语法来指定到控件的路径。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-5.component.html" region="inspect-child-control" title="src/app/hero-detail/hero-detail.component.html" linenums="false">

</code-example>

You can use this technique to display _any_ property of a `FormControl`
such as one of the following:

我们可以使用此技术来显示`FromControl`的*任意*属性，代码如下：

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

      `FormControl`的值。

    </td>

  </tr>

  <tr>

    <td>

      <code>myControl.status</code>

    </td>

    <td>

      the validity of a `FormControl`. Possible values: `VALID`,
       `INVALID`, `PENDING`, or `DISABLED`.

      `FormControl`的有效性。可能的值有`VALID`、`INVALID`、`PENDING`或`DISABLED`。

    </td>

  </tr>

  <tr>

    <td>

      <code>myControl.pristine</code>

    </td>

    <td>

      `true` if the user has _not_ changed the value in the UI.
      Its opposite is `myControl.dirty`.

      如果用户*尚未*改变过这个控件的值，则为`true`。它总是与`myControl.dirty`相反。

    </td>

  </tr>

  <tr>

    <td>

      <code>myControl.untouched</code>

    </td>

    <td>

      `true` if the control user has not yet entered the HTML control
       and triggered its blur event. Its opposite is `myControl.touched`.
       
                         如果用户尚未进入这个HTML控件，也没有触发过它的`blur`（失去焦点）事件，则为`true`。
      它是`myControl.touched`的反义词。

    </td>

  </tr>

</table>

Learn about other `FormControl` properties in the
[_AbstractControl_](api/forms/AbstractControl) API reference.

要了解`FormControl`的更多属性，参见API参考手册的[_AbstractControl_](api/forms/AbstractControl)部分。

One common reason for inspecting `FormControl` properties is to
make sure the user entered valid values.
Read more about validating Angular forms in the
[Form Validation](guide/form-validation) guide.

检查`FormControl`属性的另一个原因是确保用户输入了有效的值。
要了解更多关于Angular表单验证的知识，参见[表单验证](guide/form-validation)一章。

{@a data-model-form-model}

## The _data model_ and the _form model_

## *数据模型*与*表单模型*

At the moment, the form is displaying empty values.
The `HeroDetailComponent` should display values of a hero,
possibly a hero retrieved from a remote server.

此刻，表单显示的是空值。
`HeroDetailComponent`应该显示一个英雄的值，这个值可能接收自远端服务器。

In this app, the `HeroDetailComponent` gets its hero from a parent `HeroListComponent`

在这个应用中，`HeroDetailComponent`从它的父组件`HeroListComponent`中取得一个英雄。

The `hero` from the server is the **_data model_**.
The `FormControl` structure is the **_form model_**.

来自服务器的`hero`就是**数据模型**，而`FormControl`的结构就是**表单模型**。

The component must copy the hero values in the _data model_ into the _form model_.
There are two important implications:

组件必须把*数据模型*中的英雄值复制到*表单模型*中。这里隐含着两个非常重要的点。

1. The developer must understand how the properties of the _data model_
map to the properties of the _form model_.

   开发人员必须理解*数据模型*是如何映射到*表单模型*中的属性的。

2. User changes flow from the DOM elements to the _form model_, not to the _data model_.
The form controls never update the _data model_.

   用户修改时的数据流是从DOM元素流向*表单模型*的，而不是*数据模型*。表单控件永远不会修改*数据模型*。

The _form_ and _data_ model structures need not match exactly.
You often present a subset of the _data model_ on a particular screen.
But it makes things easier if the shape of the _form model_ is close to the shape of the _data model_.

*表单模型*和*数据模型*的结构并不需要精确匹配。在一个特定的屏幕上，我们通常只会展现*数据模型*的一个子集。
但是*表单模型*的形态越接近*数据模型*，事情就会越简单。

In this `HeroDetailComponent`, the two models are quite close.

在`HeroDetailComponent`中，这两个模型是非常接近的。

Recall the definition of `Hero` in `data-model.ts`:

回忆一下`data-model.ts`中的`Hero`定义：

<code-example path="reactive-forms/src/app/data-model.ts" region="model-classes" title="src/app/data-model.ts (classes)" linenums="false">

</code-example>

Here, again, is the component's `FormGroup` definition.

这里又是组件的`FormGroup`定义。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="hero-form-model" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

There are two significant differences between these models:

在这些模型中有两点显著的差异：

1. The `Hero` has an `id`. The form model does not because you generally don't show primary keys to users.

   `Hero`有一个`id`。表单模型中则没有，因为我们通常不会把主键展示给用户。

1. The `Hero` has an array of addresses. This form model presents only one address,
a choice [revisited below](guide/reactive-forms#form-array "Form arrays").

   `Hero`有一个住址数组。这个表单模型只表示了一个住址，[稍后的修改](guide/reactive-forms#form-array "Form arrays")则可以表示多个。

Nonetheless, the two models are pretty close in shape and you'll see in a moment how this alignment facilitates copying the _data model_ properties
to the _form model_ with the `patchValue` and `setValue` methods.

虽然如此，这两个模型的形态仍然是非常接近的，我们很快就会看到如何用`patchValue`和`setValue`方法来把*数据模型*拷贝到*表单模型*中。

Take a moment to refactor the _address_ `FormGroup` definition for brevity and clarity as follows:

花一点时间来重构一下`address`这个`FormGroup`定义，来让它更简洁清晰，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="address-form-group" title="src/app/hero-detail/hero-detail-7.component.ts" linenums="false">

</code-example>

Also be sure to update the import from `data-model` so you can reference the `Hero` and `Address` classes:

为了确保从`data-model`中导入，我们可以引用`Hero`和`Address`类：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="import-address" title="src/app/hero-detail/hero-detail-7.component.ts" linenums="false">

</code-example>

{@a set-data}

## Populate the form model with _setValue_ and _patchValue_

## 使用`setValue`和`patchValue`来操纵表单模型

Previously you created a control and initialized its value at the same time.
You can also initialize or reset the values _later_ with the
`setValue` and `patchValue` methods.

以前，我们创建了控件，并同时初始化它的值。
我们也可以稍后用`setValue`和`patchValue`来初始化或重置这些值。

### _setValue_

### _setValue_ 方法

With **`setValue`**, you assign _every_ form control value _at once_
by passing in a data object whose properties exactly match the _form model_ behind the `FormGroup`.

借助**`setValue`**，我们可以*立即*设置*每个*表单控件的值，只要把与*表单模型*的属性精确匹配的数据模型传进去就可以了。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="set-value" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

The `setValue` method checks the data object thoroughly before assigning any form control values.

`setValue`方法会在赋值给任何表单控件之前先检查数据对象的值。

It will not accept a data object that doesn't match the FormGroup structure or is
missing values for any control in the group. This way, it can return helpful
error messages if you have a typo or if you've nested controls incorrectly.
`patchValue` will fail silently.

它不会接受一个与FormGroup结构不同或缺少表单组中任何一个控件的数据对象。
这种方式下，如果我们有什么拼写错误或控件嵌套的不正确，它就能返回一些有用的错误信息。
`patchValue`会默默地失败。

On the other hand,`setValue` will catch
the error and report it clearly.

而`setValue`会捕获错误，并清晰的报告它。

Notice that you can _almost_ use the entire `hero` as the argument to `setValue`
because its shape is similar to the component's `FormGroup` structure.

注意，你*几乎*可以把这个`hero`用作`setValue`的参数，因为它的形态与组件的`FormGroup`结构是非常像的。

You can only show the hero's first address and you must account for the possibility that the `hero` has no addresses at all.
This explains the conditional setting of the `address` property in the data object argument:

我们现在只能显示英雄的第一个住址，不过我们还必须考虑`hero`完全没有住址的可能性。
下面的例子解释了如何在数据对象参数中对`address`属性进行有条件的设置：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="set-value-address" title="src/app/hero-detail/hero-detail-7.component.ts" linenums="false">

</code-example>

### _patchValue_

### _patchValue_ 方法

With **`patchValue`**, you can assign values to specific controls in a `FormGroup`
by supplying an object of key/value pairs for just the controls of interest.

借助**`patchValue`**，我们可以通过提供一个只包含要更新的控件的键值对象来把值赋给`FormGroup`中的指定控件。

This example sets only the form's `name` control.

这个例子只会设置表单的`name`控件。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="patch-value" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

With **`patchValue`** you have more flexibility to cope with wildly divergent data and form models.
But unlike `setValue`,  `patchValue` cannot check for missing control
values and does not throw helpful errors.

借助**`patchValue`**，我们可以更灵活地解决数据模型和表单模型之间的差异。
但是和`setValue`不同，`patchValue`不会检查缺失的控件值，并且不会抛出有用的错误信息。

### When to set form model values (_ngOnChanges_)

### 什么时候设置表单的模型值（`ngOnChanges`）

Now you know _how_ to set the _form model_ values. But _when_ do you set them?
The answer depends upon when the component gets the _data model_ values.

现在，我们已经知道了*如何*设置*表单模型*的值，但是*什么时候*设置它门呢？
答案取决于组件何时得到*数据模型*的值。

The `HeroDetailComponent` in this reactive forms sample is nested within a _master/detail_ `HeroListComponent` ([discussed below](guide/reactive-forms#hero-list)).
The `HeroListComponent` displays hero names to the user.
When the user clicks on a hero, the list component passes the selected hero into the `HeroDetailComponent`
by binding to its `hero` input property.

这个响应式表单范例中的`HeroDetailComponent`组件嵌套在一个*主/从*结构的`HeroListComponent`（[稍后讨论](guide/reactive-forms#hero-list)）中。
`HeroListComponent`组件把英雄的名字显示给用户。
当用户点击一个英雄时，列表组件把所选的英雄通过输入属性`hero`传给`HeroDetailComponent`。

<code-example path="reactive-forms/src/app/hero-list/hero-list.component.1.html" title="hero-list.component.html (simplified)" linenums="false">

</code-example>

In this approach, the value of `hero` in the `HeroDetailComponent` changes
every time the user selects a new hero.
You should call  _setValue_ in the [ngOnChanges](guide/lifecycle-hooks#onchanges)
hook, which Angular calls whenever the input `hero` property changes
as the following steps demonstrate.

这种方式下，每当用户选择一个新英雄时，`HeroDetailComponent`中的`hero`值就会发生变化。
我们可以在[ngOnChanges](guide/lifecycle-hooks#onchanges)钩子中调用`setValue`，就像例子中所演示的那样，
每当输入属性`hero`发生变化时，Angular就会调用它。

First, import the `OnChanges` and `Input` symbols in `hero-detail.component.ts`.

首先，在`hero-detail.component.ts`中导入`OnChanges`和`Input`符号。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="import-input" title="src/app/hero-detail/hero-detail.component.ts (core imports)" linenums="false">

</code-example>

Add the `hero` input property.

添加输入属性`hero`。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-6.component.ts" region="hero" title="src/app/hero-detail/hero-detail-6.component.ts" linenums="false">

</code-example>

Add the `ngOnChanges` method to the class as follows:

向该类中添加`ngOnChanges`方法，代码如下：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="ngOnChanges-1" title="src/app/hero-detail/hero-detail.component.ts (ngOnchanges)" linenums="false">

</code-example>

### _reset_ the form flags

### *重置*表单的标识。

You should  reset the form when the hero changes so that
control values from the previous hero are cleared and
status flags are restored to the _pristine_ state.
You could call `reset` at the top of `ngOnChanges` like this.

我们应该在更换英雄的时候重置表单，以便来自前一个英雄的控件值被清除，并且其状态被恢复为`pristine`（原始）状态。
我们可以在`ngOnChanges`的顶部调用`reset`，就像这样：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="reset" title="src/app/hero-detail/hero-detail-7.component.ts" linenums="false">

</code-example>

The `reset` method has an optional `state` value so you can reset the flags _and_ the control values at the same time.
Internally, `reset` passes the argument to `setValue`.
A little refactoring and `ngOnChanges` becomes this:

`reset`方法有一个可选的`state`值，让我们能在重置状态的同时*顺便设置*控件的值。
在内部实现上，`reset`会把该参数传给了`setValue`。
略微重构之后，`ngOnChanges`会变成这样：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="ngOnChanges" title="src/app/hero-detail/hero-detail.component.ts (ngOnchanges - revised)" linenums="false">

</code-example>

{@a hero-list}

### Create the _HeroListComponent_ and _HeroService_

### 创建`HeroListComponent`和`HeroService`

The `HeroDetailComponent` is a nested sub-component of the `HeroListComponent` in a _master/detail_ view.
Together they look a bit like this:

`HeroDetalComponent`是一个嵌套在`HeroListComponent`的*主从*视图中的子组件。如果把它们放在一起就是这样的：

<figure>
  <img src="generated/images/guide/reactive-forms/hero-list.png" alt="HeroListComponent">
</figure>

The `HeroListComponent` uses an injected `HeroService` to retrieve heroes from the server
and then presents those heroes to the user as a series of buttons.
The `HeroService` emulates an HTTP service.
It returns an `Observable` of heroes that resolves after a short delay,
both to simulate network latency and to indicate visually
the necessarily asynchronous nature of the application.

`HeroListComponent`使用一个注入进来的`HeroService`来从服务器获取英雄列表，然后用一系列按钮把这些英雄展示给用户。
`HeroService`模拟了HTTP服务。
它返回一个英雄组成的`Observable`对象，并会在短暂的延迟之后被解析出来，这是为了模拟网络延迟，并展示应用在自然延迟下的异步效果。

When the user clicks on a hero,
the component sets its `selectedHero` property which
is bound to the `hero` input property of the `HeroDetailComponent`.
The `HeroDetailComponent` detects the changed hero and re-sets its form
with that hero's data values.

当用户点击一个英雄时，组件设置它的`selectedHero`属性，它绑定到`HeroDetailComponent`的输入属性`hero`上。
`HeroDetailComponent`检测到英雄的变化，并使用当前英雄的值重置此表单。

A "Refresh" button clears the hero list and the current selected hero before refetching the heroes.

"刷新"按钮清除英雄列表和当前选中的英雄，然后重新获取英雄列表。

The remaining `HeroListComponent` and `HeroService` implementation details are not relevant to understanding reactive forms.
The techniques involved are covered elsewhere in the documentation, including the _Tour of Heroes_
[here](tutorial/toh-pt3 "ToH: Multiple Components") and [here](tutorial/toh-pt4 "ToH: Services").

`HeroListComponent`和`HeroService`的其余部分的实现细节与响应式表单无关。
那些技术涵盖于本文档中的其它部分，包括*《英雄指南》*中的[这里](tutorial/toh-pt3 "ToH: Multiple Components")和[这里](tutorial/toh-pt4 "ToH: Services")。

If you're coding along with the steps in this reactive forms tutorial,
generate the pertinent files based on the
[source code displayed below](guide/reactive-forms#source-code "Reactive Forms source code").
Notice that `hero-list.component.ts` imports `Observable` and `finally` while `hero.service.ts` imports `Observable`, `of`,
and `delay` from `rxjs`.
Then return here to learn about _form array_ properties.

如果你正在随着本教程写代码，可以基于[下面显示的代码](guide/reactive-forms#source-code "Reactive Forms source code")来创建相应的文件。
注意，`hero-list.component.ts`从`rxjs`中导入了`Observable`和`finally`，而`hero.service.ts`导入了`Observable`、`of`和`delay`。
接下来我们回到正轨，继续学习*表单数组*属性。

{@a form-array}

## Use _FormArray_ to present an array of _FormGroups_

## 使用`FormArray`来表示`FormGroup`数组

So far, you've seen `FormControls` and `FormGroups`.
A `FormGroup` is a named object whose property values are `FormControls` and other `FormGroups`.

以前，我们见过了`FormControl`和`FormGroup`。
`FormGroup`是一个命名对象，它的属性值是`FormControl`和其它的`FormGroup`。

Sometimes you need to present an arbitrary number of controls or groups.
For example, a hero may have zero, one, or any number of addresses.

有时我们得表示任意数量的控件或控件组。
比如，一个英雄可能拥有0、1或任意数量的住址。

The `Hero.addresses` property is an array of `Address` instances.
An _address_ `FormGroup` can display one `Address`.
An Angular `FormArray` can display an array of _address_ `FormGroups`.

`Hero.addresses`属性就是一个`Address`实例的数组。
一个住址的`FormGroup`可以显示一个`Address`对象。
而`FormArray`可以显示一个住址`FormGroup`的数组。

To get access to the `FormArray` class, import it into `hero-detail.component.ts`:

要访问`FormArray`类，请先把它导入`hero-detail.component.ts`中：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="imports" title="src/app/hero-detail/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>

To _work_ with a `FormArray` you do the following:

要想使用`FormArray`，我们要这么做：

1. Define the items (`FormControls` or `FormGroups`) in the array.

   在数组中定义条目（`FormControl`或`FormGroup`）。

1. Initialize the array with items created from data in the _data model_.

   把这个数组初始化微一组从*数据模型*中的数据创建的条目。

1. Add and remove items as the user requires.

   根据用户的需求添加或移除这些条目。

In this guide, you define a `FormArray` for `Hero.addresses` and
let the user add or modify addresses (removing addresses is your homework).

在本章中，我们为`Hero.addresses`定义了一个`FormArray`，并且让用户添加或修改这些住址（移除住址功能请课后自行实现）。

You’ll need to redefine the form model in the `HeroDetailComponent` constructor,
which currently only displays the first hero address in an _address_ `FormGroup`.

我们需要在`HeroDetailComponent`的构造函数中重新定义表单模型，它现在只用`FormGroup`显示第一个英雄住址。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-7.component.ts" region="address-form-group" title="src/app/hero-detail/hero-detail-7.component.ts" linenums="false">

</code-example>

### From _address_ to _secret lairs_

### 从*住址*到*秘密小屋*（Secret Lair）

From the user's point of view, heroes don't have _addresses_.
_Addresses_ are for mere mortals. Heroes have _secret lairs_!
Replace the _address_ `FormGroup` definition with a _secretLairs_ `FormArray` definition:

从用户的视角来看，英雄们没有*住址*。
只有我们凡人才有*住址*，英雄们拥有的是*秘密小屋*！
把`FormGroup`型的住址替换为`FormArray`型的`secretLairs`定义：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="secretLairs-form-array" title="src/app/hero-detail/hero-detail-8.component.ts" linenums="false">

</code-example>

<div class="alert is-helpful">

Changing the form control name from `address` to `secretLairs` drives home an important point:
the _form model_ doesn't have to match the _data model_.

把表单的控件名从`address`改为`secretLairs`让我们遇到了一个重要问题：*表单模型*与*数据模型*不再匹配了。

Obviously there has to be a relationship between the two.
But it can be anything that makes sense within the application domain.

显然，必须在两者之间建立关联。但它在应用领域中的意义不限于此，它可以用于任何东西。

_Presentation_ requirements often differ from _data_ requirements.
The reactive forms approach both emphasizes and facilitates this distinction.

*展现*的需求经常会与*数据*的需求不同。
响应式表单的方法既强调这种差异，也能为这种差异提供了便利。

</div>

### Initialize the "secretLairs" _FormArray_

### 初始化`FormArray`型的`secretLairs`

The default form displays a nameless hero with no addresses.

默认的表单显示一个无地址的无名英雄。

You need a method to populate (or repopulate) the _secretLairs_ with actual hero addresses whenever
the parent `HeroListComponent` sets the `HeroDetailComponent.hero` input property to a new `Hero`.

我们需要一个方法来用实际英雄的地址填充（或重新填充）`secretLairs`，
而不用管父组件`HeroListComponent`何时把输入属性`HeroDetailComponent.hero`设置为一个新的`Hero`。

The following `setAddresses` method replaces the _secretLairs_ `FormArray` with a new `FormArray`,
initialized by an array of hero address `FormGroups`.

下面的`setAddresses`方法把`secretLairs`数组替换为一个新的`FormArray`，使用一组表示英雄地址的`FormGroup`来进行初始化。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="set-addresses" title="src/app/hero-detail/hero-detail-8.component.ts" linenums="false">

</code-example>

Notice that you replace the previous `FormArray` with the **`FormGroup.setControl` method**, not with `setValue`.
You're replacing a _control_, not the _value_ of a control.

注意，我们使用**`FormGroup.setControl`方法**，而不是`setValue`方法来设置前一个`FormArray`。
我们所要替换的是*控件*，而不是控件的*值*。

Notice also that the _secretLairs_ `FormArray` contains **`FormGroups`**, not `Addresses`.

还要注意，`secretLairs`数组中包含的是**`FormGroup`，而不是`Address`。

### Get the _FormArray_

### 获取`FormArray`

The `HeroDetailComponent` should be able to display, add, and remove items from the _secretLairs_ `FormArray`.

`HeroDetailComponent`应该能从`secretLairs`中显示、添加和删除条目。

Use the `FormGroup.get` method to acquire a reference to that `FormArray`.
Wrap the expression in a `secretLairs` convenience property for clarity and re-use.

使用`FormGroup.get`方法来获取到`FormArray`的引用。
把这个表达式包装进一个名叫`secretLairs`的便捷属性中来让它更清晰，并供复用。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="get-secret-lairs" title="src/app/hero-detail/hero-detail.component.ts (secretLayers property)" linenums="false">

</code-example>

### Display the _FormArray_

### 显示`FormArray`

The current HTML template displays a single _address_ `FormGroup`.
Revise it to display zero, one, or more of the hero's _address_ `FormGroups`.

当前HTML模板显示单个的地址`FormGroup`。
我们要把它修改成能显示0、1或更多个表示英雄地址的`FormGroup`。

This is mostly a matter of wrapping the previous template HTML for an address in a `<div>` and
repeating that `<div>` with `*ngFor`.

要改的部分主要是把以前表示地址的HTML模板包裹进一个`<div>`中，并且使用`*ngFor`来重复渲染这个`<div>`。

The trick lies in knowing how to write the `*ngFor`. There are three key points:

诀窍在于要知道如何编写`*ngFor`。主要有三点：

1. Add another wrapping `<div>`, around the `<div>` with `*ngFor`, and
set its `formArrayName` directive to `"secretLairs"`.
This step establishes the _secretLairs_ `FormArray` as the context for form controls in the inner, repeated HTML template.

   在`*ngFor`的`<div>`之外套上另一个包装`<div>`，并且把它的`formArrayName`指令设为`"secretLairs"`。
  这一步为内部的表单控件建立了一个`FormArray`型的`secretLairs`作为上下文，以便重复渲染HTML模板。

1. The source of the repeated items is the `FormArray.controls`, not the `FormArray` itself.
Each control is an _address_ `FormGroup`, exactly what the previous (now repeated) template HTML expected.

   这些重复条目的数据源是`FormArray.controls`而不是`FormArray`本身。
  每个控件都是一个`FormGroup`型的地址对象，与以前的模板HTML所期望的格式完全一样。

1. Each repeated `FormGroup` needs a unique `formGroupName` which must be the index of the `FormGroup` in the `FormArray`.
You'll re-use that index to compose a unique label for each address.

   每个被重复渲染的`FormGroup`都需要一个独一无二的`formGroupName`，它必须是`FormGroup`在这个`FormArray`中的索引。
  我们将复用这个索引，以便为每个地址组合出一个独一无二的标签。

Here's the skeleton for the _secret lairs_ section of the HTML template:

下面是HTML模板中*秘密小屋*部分的代码骨架：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="form-array-skeleton" title="src/app/hero-detail/hero-detail.component.html (*ngFor)" linenums="false">

</code-example>

Here's the complete template for the _secret lairs_ section:

这里是*秘密小屋*部分的完整模板：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="form-array" title="src/app/hero-detail/hero-detail.component.html (excerpt)">

</code-example>

### Add a new lair to the _FormArray_

### 把新的小屋添加到`FormArray`中

Add an `addLair` method that gets the _secretLairs_ `FormArray` and appends a new _address_ `FormGroup` to it.

添加一个`addLair`方法，它获取`secretLairs`数组，并把新的表示地址的`FormGroup`添加到其中。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="add-lair" title="src/app/hero-detail/hero-detail.component.ts (addLair method)" linenums="false">

</code-example>

Place a button on the form so the user can add a new _secret lair_ and wire it to the component's `addLair` method.

把一个按钮放在表单中，以便用户可以添加新的*秘密小屋*，并把它传给组件的`addLair`方法。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.html" region="add-lair" title="src/app/hero-detail/hero-detail.component.html (addLair button)" linenums="false">

</code-example>

<div class="alert is-important">

Be sure to **add the `type="button"` attribute**.
In fact, you should always specify a button's `type`.
Without an explicit type, the button type defaults to "submit".
When you later add a _form submit_ action, every "submit" button triggers the submit action which
might do something like save the current changes.
You do not want to save changes when the user clicks the _Add a Secret Lair_ button.

务必确保**添加了`type="button"`属性**。
事实上，我们应该总是指定按钮的`type`。
如果不明确指定类型，按钮的默认类型就是“submit”（提交）。
当我们稍后添加了*表单提交*的动作时，每个“submit”按钮都是触发一次提交操作，而它将可能会做一些处理，比如保存当前的修改。
我们显然不会希望每当用户点击“Add a Secret Lair”按钮时就保存一次。

</div>

### Try it!

### 试试看！

Back in the browser, select the hero named "Magneta".
"Magneta" doesn't have an address, as you can see in the diagnostic JSON at the bottom of the form.

回到浏览器中，选择名叫“Magneta”的英雄。
"Magneta"没有地址，我们会在表单底部的诊断用JSON中看到这一点。

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
作为练习，你可以自己写一个`removeLair`方法，并且把它关联到地址HTML模板的一个按钮上。

{@a observe-control}

## Observe control changes

## 监视控件的变化

Angular calls `ngOnChanges` when the user picks a hero in the parent `HeroListComponent`.
Picking a hero changes the `HeroDetailComponent.hero` input property.

每当用户在父组件`HeroListComponent`中选取了一个英雄，Angular就会调用一次`ngOnChanges`。
选取英雄会修改输入属性`HeroDetailComponent.hero`。

Angular does _not_ call `ngOnChanges` when the user modifies the hero's _name_ or _secret lairs_.
Fortunately, you can learn about such changes by subscribing to one of the form control properties
that raises a change event.

当用户修改英雄的*名字*或*秘密小屋*时，Angular*并不会*调用`ngOnChanges`。
幸运的是，我们可以通过订阅表单控件的属性之一来了解这些变化，此属性会发出变更通知。

These are properties, such as `valueChanges`, that return an RxJS `Observable`.
You don't need to know much about RxJS `Observable` to monitor form control values.

有一些属性，比如`valueChanges`，可以返回一个RxJS的`Observable`对象。
要监听控件值的变化，我们并不需要对RxJS的`Observable`了解更多。

Add the following method to log changes to the value of the _name_ `FormControl`.

添加下列方法，以监听姓名这个`FormControl`中值的变化。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="log-name-change" title="src/app/hero-detail/hero-detail.component.ts (logNameChange)" linenums="false">

</code-example>

Call it in the constructor, after creating the form.

在构造函数中调用它，就在创建表单的代码之后：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail-8.component.ts" region="ctor" title="src/app/hero-detail/hero-detail-8.component.ts" linenums="false">

</code-example>

The `logNameChange` method pushes name-change values into a `nameChangeLog` array.
Display that array at the bottom of the component template with this `*ngFor` binding:

`logNameChange`方法会把一条改名记录追加到`nameChangeLog`数组中。
用`*ngFor`绑定在组件模板的底部显示这个数组：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.html" region="name-change-log" title="src/app/hero-detail/hero-detail.component.html (Name change log)" linenums="false">

</code-example>

Return to the browser, select a hero (e.g, "Magneta"), and start typing in the _name_ input box.
You should see a new name in the log after each keystroke.

返回浏览器，选择一个英雄（比如“Magneta”），并开始在*姓名*输入框中键入。
我们会看到，每次按键都会记录一个新名字。

### When to use it

### 什么时候用它

An interpolation binding is the easier way to _display_ a name change.
Subscribing to an observable form control property is handy for triggering
application logic _within_ the component class.

插值表达式绑定时显示姓名变化比较简单的方式。
*在组件类中*订阅表单控件属性变化的可观察对象以触发应用逻辑则是比较难的方式。

{@a save}

## Save form data

## 保存表单数据

The `HeroDetailComponent` captures user input but it doesn't do anything with it.
In a real app, you'd probably save those hero changes.
In a real app, you'd also be able to revert unsaved changes and resume editing.
After you implement both features in this section, the form will look like this:

`HeroDetailComponent`捕获了用户输入，但没有用它做任何事。
在真实的应用中，我们可能要保存这些英雄的变化。
在真实的应用中，我们还要能丢弃未保存的变更，然后继续编辑。
在实现完本节的这些特性之后，表单是这样的：

<figure>
  <img src="generated/images/guide/reactive-forms/save-revert-buttons.png" alt="Form with save & revert buttons">
</figure>

### Save

### 保存

In this sample application, when the user submits the form,
the `HeroDetailComponent` will pass an instance of the hero _data model_
to a save method on the injected `HeroService`.

在这个范例应用中，当用户提交表单时，`HeroDetailComponent`会把英雄实例的*数据模型*传给所注入进来的`HeroService`的一个方法来进行保存。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="on-submit" title="src/app/hero-detail/hero-detail.component.ts (onSubmit)" linenums="false">

</code-example>

This original `hero` had the pre-save values. The user's changes are still in the _form model_.
So you create a new `hero` from a combination of original hero values (the `hero.id`)
and deep copies of the changed form model values, using the `prepareSaveHero` helper.

原始的`hero`中有一些保存之前的值，用户的修改仍然是在*表单模型*中。
所以我们要根据原始英雄（根据`hero.id`找到它）的值组合出一个新的`hero`对象，并用`prepareSaveHero`助手来深层复制变化后的模型值。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="prepare-save-hero" title="src/app/hero-detail/hero-detail.component.ts (prepareSaveHero)" linenums="false">

</code-example>

<div class="l-sub-section">

**Address deep copy**

**地址的深层复制**

Had you assigned the `formModel.secretLairs` to `saveHero.addresses` (see line commented out),
the addresses in `saveHero.addresses` array would be the same objects
as the lairs in the `formModel.secretLairs`.
A user's subsequent changes to a lair street would mutate an address street in the `saveHero`.

我们已经把`formModel.secretLairs`赋值给了`saveHero.addresses`（参见注释掉的部分），
`saveHero.addresses`数组中的地址和`formModel.secretLairs`中的会是同一个对象。
用户随后对小屋所在街道的修改将会改变`saveHero`中的街道地址。

The `prepareSaveHero` method makes copies of the form model's `secretLairs` objects so that can't happen.

但`prepareSaveHero`方法会制作表单模型中的`secretLairs`对象的复本，因此实际上并没有修改原有对象。

</div>

### Revert (cancel changes)

### 丢弃（撤销修改）

The user cancels changes and reverts the form to the original state by pressing the _Revert_ button.

用户可以撤销修改，并通过点击*Revert*按钮来把表单恢复到原始状态。

Reverting is easy. Simply re-execute the `ngOnChanges` method that built the _form model_ from the original, unchanged `hero` _data model_.

丢弃很容易。只要重新执行`ngOnChanges`方法就可以拆而，它会重新从原始的、未修改过的`hero`数据模型来构建出*表单模型*。

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.ts" region="revert" title="src/app/hero-detail/hero-detail.component.ts (revert)" linenums="false">

</code-example>

### Buttons

### 按钮

Add the "Save" and "Revert" buttons near the top of the component's template:

把“Save”和“Revert”按钮添加到组件模板的顶部：

<code-example path="reactive-forms/src/app/hero-detail/hero-detail.component.html" region="buttons" title="src/app/hero-detail/hero-detail.component.html (Save and Revert buttons)" linenums="false">

</code-example>

The buttons are disabled until the user "dirties" the form by changing a value in any of its form controls (`heroForm.dirty`).

这些按钮默认是禁用的，直到用户通过修改任何一个表单控件的值“弄脏”了表单中的数据（即`heroForm.dirty`）。

Clicking a button of type `"submit"` triggers the `ngSubmit` event which calls the component's `onSubmit` method.
Clicking the revert button triggers a call to the component's `revert` method.
Users now can save or revert changes.

点击一个类型为`"submit"`的按钮会触发`ngSubmit`事件，而它会调用组件的`onSubmit`方法。
点击“Revert”按钮则会调用组件的`revert`方法。
现在，用户可以保存或放弃修改了。

This is the final step in the demo.
Try the <live-example stackblitz="final" title="Reactive Forms (final) in Stackblitz"></live-example>.

这是本演示的最后一步。
去试试<live-example stackblitz="final" title="Reactive Forms (final) in Stackblitz"></live-example>吧。

## Summary

## 小结

* How to create a reactive form component and its corresponding template.

   如何创建一个响应式表单控件及其对应的模板。

* How to use `FormBuilder` to simplify coding a reactive form.

   如何使用`FormBuilder`来简化响应式表单的编码工作。

* Grouping `FormControls`.

   分组`FormControl`。

* Inspecting `FormControl` properties.

   审查`FormControl`的属性。

* Setting data with `patchValue` and `setValue`.

   使用`patchValue`和`setValue`设置数据。

* Adding groups dynamically with `FormArray`.

   使用`FormArray`动态添加控件组。

* Observing changes to the value of a `FormControl`.

   监听`FormControl`中值的变化。

* Saving form changes.

   保存表单中的更改。

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
