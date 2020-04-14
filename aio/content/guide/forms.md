# Template-driven forms

# 表单

Forms are the mainstay of business applications.
You use forms to log in, submit a help request, place an order, book a flight,
schedule a meeting, and perform countless other data-entry tasks.

表单是商业应用的支柱，你用它来执行登录、求助、下单、预订机票、安排会议，以及不计其数的其它数据录入任务。

In developing a form, it's important to create a data-entry experience that guides the
user efficiently and effectively through the workflow.

在开发表单时，创建数据方面的体验是非常重要的，它能指引用户明晰、高效的完成工作流程。

## Introduction to Template-driven forms

## 模板驱动表单简介

Developing forms requires design skills (which are out of scope for this page), as well as framework support for
*two-way data binding, change tracking, validation, and error handling*,
which you'll learn about on this page.

开发表单需要设计能力（那超出了本章的范围），而框架支持*双向数据绑定、变更检测、验证和错误处理*，而本章你将会学到它们。

This page shows you how to build a simple form from scratch. Along the way you'll learn how to:

这个页面演示了如何从草稿构建一个简单的表单。这个过程中你将学会如何：

* Build an Angular form with a component and template.

   用组件和模板构建 Angular 表单

* Use `ngModel` to create two-way data bindings for reading and writing input-control values.

   用 `ngModel` 创建双向数据绑定，以读取和写入输入控件的值

* Track state changes and the validity of form controls.

   跟踪状态的变化，并验证表单控件

* Provide visual feedback using special CSS classes that track the state of the controls.

   使用特殊的 CSS 类来跟踪控件的状态并给出视觉反馈

* Display validation errors to users and enable/disable form controls.

   向用户显示验证错误提示，以及启用/禁用表单控件

* Share information across HTML elements using template reference variables.

   使用模板引用变量在 HTML 元素之间共享信息

You can run the <live-example></live-example> in Stackblitz and download the code from there.

你可以运行<live-example></live-example>，在 Stackblitz 中试用并下载本页的代码。

{@a template-driven}

## Template-driven forms

## 模板驱动表单

You can build forms by writing templates in the Angular [template syntax](guide/template-syntax) with
the form-specific directives and techniques described in this page.

通常，使用 Angular [模板语法](guide/template-syntax)编写模板，结合本章所描述的表单专用指令和技术来构建表单。

<div class="alert is-helpful">

  You can also use a reactive (or model-driven) approach to build forms.
  However, this page focuses on template-driven forms.

  你还可以使用响应式（也叫模型驱动）的方式来构建表单。不过本章中只介绍模板驱动表单。

</div>

You can build almost any form with an Angular template&mdash;login forms, contact forms, and pretty much any business form.
You can lay out the controls creatively, bind them to data, specify validation rules and display validation errors,
conditionally enable or disable specific controls, trigger built-in visual feedback, and much more.

利用 Angular 模板，可以构建几乎所有表单 &mdash; 登录表单、联系人表单…… 以及任何的商务表单。
  可以创造性地摆放各种控件、把它们绑定到数据、指定校验规则、显示校验错误、有条件的禁用或
  启用特定的控件、触发内置的视觉反馈等等，不胜枚举。

Angular makes the process easy by handling many of the repetitive, boilerplate tasks you'd
otherwise wrestle with yourself.

它用起来很简单，这是因为 Angular 处理了大多数重复、单调的任务，这让你可以不必亲自操刀、身陷其中。

You'll learn to build a template-driven form that looks like this:

你将学习构建如下的“模板驱动”表单：

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-1.png" alt="Clean Form">
</div>

The *Hero Employment Agency* uses this form to maintain personal information about heroes.
Every hero needs a job. It's the company mission to match the right hero with the right crisis.

这里是*英雄职业介绍所*，使用这个表单来维护候选英雄们的个人信息。每个英雄都需要一份工作。
公司的使命就是让合适的英雄去应对恰当的危机！

Two of the three fields on this form are required. Required fields have a green bar on the left to make them easy to spot.

表单中的三个字段，其中两个是必填的。必填的字段在左侧有个绿色的竖条，方便用户分辨哪些是必填项。

If you delete the hero name, the form displays a validation error in an attention-grabbing style:

如果删除了英雄的名字，表单就会用醒目的样式把验证错误显示出来。

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-2.png" alt="Invalid, Name Required">
</div>

Note that the *Submit* button is disabled, and the "required" bar to the left of the input control changes from green to red.

注意，提交按钮被禁用了，而且输入控件左侧的“必填”条从绿色变为了红色。

<div class="alert is-helpful">

  You can customize the colors and location of the "required" bar with standard CSS.

  稍后，会使用标准 CSS 来定制“必填”条的颜色和位置。

</div>

You'll build this form in small steps:

你将一点点构建出此表单：

1. Create the `Hero` model class.

   创建 `Hero` 模型类

1. Create the component that controls the form.

   创建控制此表单的组件。

1. Create a template with the initial form layout.

   创建具有初始表单布局的模板。

1. Bind data properties to each form control using the `ngModel` two-way data-binding syntax.

   使用 `ngModel` 双向数据绑定语法把数据属性绑定到每个表单输入控件。

1. Add a `name` attribute to each form-input control.

   往每个表单输入控件上添加 `name` 属性 (attribute)。

1. Add custom CSS to provide visual feedback.

   添加自定义 CSS 来提供视觉反馈。

1. Show and hide validation-error messages.

   显示和隐藏有效性验证的错误信息。

1. Handle form submission with *ngSubmit*.

   使用 **ngSubmit** 处理表单提交。

1. Disable the form’s *Submit* button until the form is valid.

   禁用此表单的提交按钮，直到表单变为有效。

## Setup

## 准备工作

Create a new project named <code>angular-forms</code>:

创建一个名为 <code>angular-forms</code> 的新项目：

<code-example language="sh" class="code-shell">

  ng new angular-forms

</code-example>

## Create the Hero model class

## 创建 Hero 模型类

As users enter form data, you'll capture their changes and update an instance of a model.
You can't lay out the form until you know what the model looks like.

当用户输入表单数据时，需要捕获它们的变化，并更新到模型的实例中。
除非知道模型里有什么，否则无法设计表单的布局。

A model can be as simple as a "property bag" that holds facts about a thing of application importance.
That describes well the `Hero` class with its three required fields (`id`, `name`, `power`)
and one optional field (`alterEgo`).

最简单的模型是个“属性包”，用来存放应用中一件事物的事实。
这里使用三个必备字段 (`id`、`name`、`power`)，和一个可选字段 (`alterEgo`，译注：中文含义是第二人格，例如 X 战警中的 Jean / 黑凤凰)。

Using the Angular CLI command [`ng generate class`](cli/generate), generate a new class named `Hero`:

使用 Angular CLI 命令 [`ng generate class`](cli/generate) 生成一个名叫 `Hero` 的新类：

<code-example language="sh" class="code-shell">

  ng generate class Hero

</code-example>

With this content:

内容如下：

<code-example path="forms/src/app/hero.ts" header="src/app/hero.ts"></code-example>

It's an anemic model with few requirements and no behavior. Perfect for the demo.

这是一个少量需求和零行为的贫血模型。对演示来说很完美。

The TypeScript compiler generates a public field for each `public` constructor parameter and
automatically assigns the parameter’s value to that field when you create heroes.

TypeScript 编译器为每个 `public` 构造函数参数生成一个公共字段，在创建新的英雄实例时，自动把参数值赋给这些公共字段。

The `alterEgo` is optional, so the constructor lets you omit it; note the question mark (?) in `alterEgo?`.

`alterEgo` 是可选的，调用构造函数时可省略，注意 `alterEgo?` 中的问号 (?)。

You can create a new hero like this:

可以这样创建新英雄：

<code-example path="forms/src/app/hero-form/hero-form.component.ts" region="SkyDog"></code-example>

## Create a form component

## 创建表单组件

An Angular form has two parts: an HTML-based _template_ and a component _class_
to handle data and user interactions programmatically.
Begin with the class because it states, in brief, what the hero editor can do.

Angular 表单分为两部分：基于 HTML 的*模板*和组件*类*，用来程序处理数据和用户交互。
先从组件类开始，是因为它可以简要说明英雄编辑器能做什么。

Using the Angular CLI command [`ng generate component`](cli/generate), generate a new component named `HeroForm`:

使用 Angular CLI 命令 [`ng generate component`](cli/generate) 生成一个名叫 `HeroForm` 的新组件：

<code-example language="sh" class="code-shell">

  ng generate component HeroForm

</code-example>

With this content:

内容如下：

<code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (v1)" region="v1"></code-example>

There’s nothing special about this component, nothing form-specific,
nothing to distinguish it from any component you've written before.

这个组件没有什么特别的地方，没有表单相关的东西，与之前写过的组件没什么不同。

Understanding this component requires only the Angular concepts covered in previous pages.

只要用前面章节中学过的 Angular 概念，就可以完全理解这个组件：

* The code imports the Angular core library and the `Hero` model you just created.

   这段代码导入了 Angular 核心库以及你刚刚创建的 `Hero` 模型。

* The `@Component` selector value of "app-hero-form" means you can drop this form in a parent
template with a `<app-hero-form>` tag.

   `@Component` 选择器“hero-form”表示可以用 `<app-hero-form>` 标签把这个表单放进父模板。

* The `templateUrl` property points to a separate file for the template HTML.

   `templateUrl` 属性指向一个独立的 HTML 模板文件。

* You defined dummy data for `model` and `powers`, as befits a demo.

   你定义了一些用来演示的，关于 `model` 和 `powers` 的模拟数据。

Down the road, you can inject a data service to get and save real data
or perhaps expose these properties as inputs and outputs
(see [Input and output properties](guide/template-syntax#inputs-outputs) on the
[Template Syntax](guide/template-syntax) page) for binding to a
parent component. This is not a concern now and these future changes won't affect the form.

接下来，你可以注入一个数据服务，以获取或保存真实的数据，或者把这些属性暴露为输入属性和输出属性（参见[Template Syntax](guide/template-syntax)中的[输入和输出属性](guide/template-syntax#inputs-outputs)）来绑定到一个父组件。这不是现在需要关心的问题，未来的更改不会影响到这个表单。

* You added a `diagnostic` property to return a JSON representation of the model.
It'll help you see what you're doing during development; you've left yourself a cleanup note to discard it later.

   你添加一个 `diagnostic` 属性，以返回这个模型的 JSON 形式。在开发过程中，它用于调试，最后清理时会丢弃它。

## Revise *app.module.ts*

## 修改 *app.module.ts*

`app.module.ts` defines the application's root module. In it you identify the external modules you'll use in the application
and declare the components that belong to this module, such as the `HeroFormComponent`.

`app.module.ts` 定义了应用的根模块。其中标识即将用到的外部模块，以及声明属于本模块中的组件，例如 `HeroFormComponent`。

Because template-driven forms are in their own module, you need to add the `FormsModule` to the array of
`imports` for the application module before you can use forms.

因为模板驱动的表单位于它们自己的模块，所以在使用表单之前，需要将 `FormsModule` 添加到应用模块的 `imports` 数组中。

Update it with the following:

对它做如下修改：

<code-example path="forms/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

<div class="alert is-helpful">

  There are two changes:

  有两处更改

  1. You import `FormsModule`.

     导入 `FormsModule`。

  1. You add the `FormsModule` to the list of `imports` defined in the `@NgModule` decorator. This gives the application
  access to all of the template-driven forms features, including `ngModel`.

     把 `FormsModule` 添加到 `ngModule` 装饰器的 `imports` 列表中，这样应用就能访问模板驱动表单的所有特性，包括 `ngModel`。

</div>

<div class="alert is-important">

  If a component, directive, or pipe belongs to a module in the `imports` array, ​_don't_​ re-declare it in the `declarations` array.
  If you wrote it and it should belong to this module, ​_do_​ declare it in the `declarations` array.

  如果某个组件、指令或管道是属于 `imports` 中所导入的某个模块的，那就*不能再*把它再声明到本模块的 `declarations` 数组中。
如果它是你自己写的，并且确实属于当前模块，*才应该*把它声明在 `declarations` 数组中。

</div>

## Revise *app.component.html*

## 修改 *app.component.html*

`AppComponent` is the application's root component. It will host the new `HeroFormComponent`.

`AppComponent` 是应用的根组件，`HeroFormComponent` 将被放在其中。

Replace the contents of its template with the following:

把模板中的内容替换成如下代码：

<code-example path="forms/src/app/app.component.html" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

  There are only two changes.
  The `template` is simply the new element tag identified by the component's `selector` property.
  This displays the hero form when the application component is loaded.
  Don't forget to remove the `name` field from the class body as well.

  这里只做了两处修改。
`template` 中只剩下这个新的元素标签，即组件的 `selector` 属性。这样当应用组件被加载时，就会显示这个英雄表单。
同样别忘了从类中移除了 `name` 字段。

</div>

## Create an initial HTML form template

## 创建初始 HTML 表单模板

Update the template file with the following contents:

修改模板文件，内容如下：

<code-example path="forms/src/app/hero-form/hero-form.component.html" region="start" header="src/app/hero-form/hero-form.component.html"></code-example>

The language is simply HTML5. You're presenting two of the `Hero` fields, `name` and `alterEgo`, and
opening them up for user input in input boxes.

这只是一段普通的旧式 HTML 5 代码。这里有两个 `Hero` 字段，`name` 和 `alterEgo`，供用户输入。

The *Name* `<input>` control has the HTML5 `required` attribute;
the *Alter Ego* `<input>` control does not because `alterEgo` is optional.

*Name* `<input>` 控件具有 HTML5 的 `required` 属性；但 *Alter Ego* `<input>` 控件没有，因为 `alterEgo` 字段是可选的。

You added a *Submit* button at the bottom with some classes on it for styling.

在底部添加个 *Submit* 按钮，它还带一些 CSS 样式类。

*You're not using Angular yet*. There are no bindings or extra directives, just layout.

**你还没有真正用到 Angular**。没有绑定，没有额外的指令，只有布局。

<div class="alert is-helpful">

  In template driven forms, if you've imported `FormsModule`, you don't have to do anything
  to the `<form>` tag in order to make use of `FormsModule`. Continue on to see how this works.

  在模板驱动表单中，你只要导入了 `FormsModule` 就不用对 `<form>` 做任何改动来使用 `FormsModule`。接下来你会看到它的原理。

</div>

The `container`, `form-group`, `form-control`, and `btn` classes
come from [Twitter Bootstrap](http://getbootstrap.com/css/). These classes are purely cosmetic.
Bootstrap gives the form a little style.

`container`、`form-group`、`form-control` 和 `btn` 类来自 [Twitter Bootstrap](http://getbootstrap.com/css/)。这些类纯粹是装饰品。
Bootstrap 为这个表单提供了一些样式。

<div class="callout is-important">

  <header>Angular forms don't require a style library</header>

  <header>Angular 表单不需要任何样式库</header>

  Angular makes no use of the `container`, `form-group`, `form-control`, and `btn` classes or
  the styles of any external library. Angular apps can use any CSS library or none at all.

  Angular 不需要 `container`、`form-group`、`form-control` 和 `btn` 类，
或者外部库的任何样式。Angular 应用可以使用任何 CSS 库…… ，或者啥都不用。

</div>

To add the stylesheet, open `styles.css` and add the following import line at the top:

要添加样式表，就打开 `styles.css`，并把下列代码添加到顶部：

<code-example path="forms/src/styles.1.css" header="src/styles.css"></code-example>

## Add powers with _*ngFor_

## 用 ***ngFor*** 添加超能力

The hero must choose one superpower from a fixed list of agency-approved powers.
You maintain that list internally (in `HeroFormComponent`).

英雄必须从认证过的固定列表中选择一项超能力。
  这个列表位于 `HeroFormComponent` 中。

You'll add a `select` to the
form and bind the options to the `powers` list using `ngFor`,
a technique seen previously in the [Displaying Data](guide/displaying-data) page.

在表单中添加 `select`，用 `ngFor` 把 `powers` 列表绑定到列表选项。
之前的[显示数据](guide/displaying-data)一章中见过 `ngFor`。

Add the following HTML *immediately below* the *Alter Ego* group:

在 *Alter Ego* 的紧下方添加如下 HTML：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (powers)" region="powers"></code-example>

This code repeats the `<option>` tag for each power in the list of powers.
The `pow` template input variable is a different power in each iteration;
you display its name using the interpolation syntax.

列表中的每一项超能力都会渲染成 `<option>` 标签。
模板输入变量 `pow` 在每个迭代指向不同的超能力，使用双花括号插值语法来显示它的名称。

{@a ngModel}

## Two-way data binding with _ngModel_

## 使用 *ngModel* 进行双向数据绑定

Running the app right now would be disappointing.

如果立即运行此应用，你将会失望。

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-3.png" alt="Early form with no binding">
</div>

You don't see hero data because you're not binding to the `Hero` yet.
You know how to do that from earlier pages.
[Displaying Data](guide/displaying-data) teaches property binding.
[User Input](guide/user-input) shows how to listen for DOM events with an
event binding and how to update a component property with the displayed value.

因为还没有绑定到某个英雄，所以看不到任何数据。
解决方案见前面的章节。
[显示数据](guide/displaying-data)介绍了属性绑定。
[用户输入](guide/user-input)介绍了如何通过事件绑定来监听 DOM 事件，以及如何用显示值更新组件的属性。

Now you need to display, listen, and extract at the same time.

现在，需要同时进行显示、监听和提取。

You could use the techniques you already know, but
instead you'll use the new `[(ngModel)]` syntax, which
makes binding the form to the model easy.

虽然可以在表单中再次使用这些技术。
但是，这里将介绍个新东西，`[(ngModel)]` 语法，使表单绑定到模型的工作变得超级简单。

Find the `<input>` tag for *Name* and update it like this:

找到 *Name* 对应的 `<input>` 标签，并且像这样修改它：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModelName-1"></code-example>

<div class="alert is-helpful">

  You added a diagnostic interpolation after the input tag
  so you can see what you're doing.
  You left yourself a note to throw it away when you're done.

  在 input 标签后添加用于诊断的插值，以看清正在发生什么事。
给自己留个备注，提醒你完成后移除它。

</div>

Focus on the binding syntax: `[(ngModel)]="..."`.

聚焦到绑定语法 `[(ngModel)]="..."` 上。

You need one more addition to display the data. Declare
a template variable for the form. Update the `<form>` tag with
`#heroForm="ngForm"` as follows:

你需要更多的工作来显示数据。在表单中声明一个模板变量。往 `<form>` 标签中加入 `#heroForm="ngForm"`，代码如下：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="template-variable"></code-example>

The variable `heroForm` is now a reference to the `NgForm` directive that governs the form as a whole.

`heroForm` 变量是一个到 `NgForm` 指令的引用，它代表该表单的整体。

<div class="alert is-helpful">

  {@a ngForm}

  ### The _NgForm_ directive

  ### *NgForm* 指令

  What `NgForm` directive?
  You didn't add an [NgForm](api/forms/NgForm) directive.

  什么是 `NgForm` 指令？
但你明明没有添加过[NgForm](api/forms/NgForm)指令啊！

  Angular did. Angular automatically creates and attaches an `NgForm` directive to the `<form>` tag.

  Angular 替你做了。Angular 会在 `<form>` 标签上自动创建并附加一个 `NgForm` 指令。

  The `NgForm` directive supplements the `form` element with additional features.
  It holds the controls you created for the elements with an `ngModel` directive
  and `name` attribute, and monitors their properties, including their validity.
  It also has its own `valid` property which is true only *if every contained
  control* is valid.

  `NgForm` 指令为 `form` 增补了一些额外特性。
它会控制那些带有 `ngModel` 指令和 `name` 属性的元素，监听他们的属性（包括其有效性）。
它还有自己的 `valid` 属性，这个属性只有在*它包含的每个控件*都有效时才是真。

</div>

If you ran the app now and started typing in the *Name* input box,
adding and deleting characters, you'd see them appear and disappear
from the interpolated text.
At some point it might look like this:

如果现在运行这个应用，开始在*姓名*输入框中键入，添加和删除字符，将看到它们从插值结果中显示和消失。
某一瞬间，它可能是这样的：

<div class="lightbox">
  <img src="generated/images/guide/forms/ng-model-in-action.png" alt="ngModel in action">
</div>

The diagnostic is evidence that values really are flowing from the input box to the model and
back again.

诊断信息可以证明，数据确实从输入框流动到模型，再反向流动回来。

<div class="alert is-helpful">

  That's *two-way data binding*.
  For more information, see
  [Two-way binding with NgModel](guide/template-syntax#ngModel) on the
  the [Template Syntax](guide/template-syntax) page.

  **这就是双向数据绑定！**要了解更多信息，参见[模板语法](guide/template-syntax)页的[使用 NgModel 进行双向绑定](guide/template-syntax#ngModel)。

</div>

Notice that you also added a `name` attribute to the `<input>` tag and set it to "name",
which makes sense for the hero's name. Any unique value will do, but using a descriptive name is helpful.
Defining a `name` attribute is a requirement when using `[(ngModel)]` in combination with a form.

注意，`<input>` 标签还添加了 `name` 属性 (attribute)，并设置为 "name"，表示英雄的名字。
使用任何唯一的值都可以，但使用具有描述性的名字会更有帮助。
当在表单中使用 `[(ngModel)]` 时，必须要定义 `name` 属性。

<div class="alert is-helpful">

  Internally, Angular creates `FormControl` instances and
  registers them with an `NgForm` directive that Angular attached to the `<form>` tag.
  Each `FormControl` is registered under the name you assigned to the `name` attribute.
  Read more in the previous section, [The NgForm directive](guide/forms#ngForm).

  在内部，Angular 创建了一些 `FormControl`，并把它们注册到 Angular 附加到 `<form>` 标签上的 `NgForm` 指令。
注册每个 `FormControl` 时，使用 `name` 属性值作为键值。欲知详情，参见前面的 [NgForm 指令](guide/forms#ngForm)。

</div>

Add similar `[(ngModel)]` bindings and `name` attributes to *Alter Ego* and *Hero Power*.
You'll ditch the input box binding message
and add a new binding (at the top) to the component's `diagnostic` property.
Then you can confirm that two-way data binding works *for the entire hero model*.

为*第二人格*和*超能力*属性添加类似的 `[(ngModel)]` 绑定和 `name` 属性。
抛弃输入框的绑定消息，在组件顶部添加到 `diagnostic` 属性的新绑定。
这样就能确认双向数据绑定*在整个 Hero 模型上*都能正常工作了。

After revision, the core of the form should look like this:

修改之后，这个表单的核心是这样的：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModel-2"></code-example>

<div class="alert is-helpful">

  * Each input element has an `id` property that is used by the `label` element's `for` attribute
  to match the label to its input control.

     每个 input 元素都有 `id` 属性，`label` 元素的 `for` 属性用它来匹配到对应的输入控件。

  * Each input element has a `name` property that is required by Angular forms to register the control with the form.

     每个 input 元素都有 `name` 属性，Angular 表单用它注册控件。

</div>

If you run the app now and change every hero model property, the form might display like this:

如果现在运行本应用，修改 Hero 模型的每个属性，表单是这样的：

<div class="lightbox">
  <img src="generated/images/guide/forms/ng-model-in-action-2.png" alt="ngModel in action">
</div>

The diagnostic near the top of the form
confirms that all of your changes are reflected in the model.

表单顶部的诊断信息反映出所做的一切更改。

*Delete* the `{{diagnostic}}` binding at the top as it has served its purpose.

表单顶部的 `{{diagnostic}}` 绑定已经完成了它的使命，**删除**它。

## Track control state and validity with _ngModel_

## 通过 **ngModel** 跟踪修改状态与有效性验证

Using `ngModel` in a form gives you more than just two-way data binding. It also tells
you if the user touched the control, if the value changed, or if the value became invalid.

在表单中使用 `ngModel` 可以获得比仅使用双向数据绑定更多的控制权。它还会告诉你很多信息：用户碰过此控件吗？它的值变化了吗？数据变得无效了吗？

The *NgModel* directive doesn't just track state; it updates the control with special Angular CSS classes that reflect the state.
You can leverage those class names to change the appearance of the control.

*NgModel* 指令不仅仅跟踪状态。它还使用特定的 Angular CSS 类来更新控件，以反映当前状态。
可以利用这些 CSS 类来修改控件的外观，显示或隐藏消息。

<table>

  <tr>

    <th>

      State

      状态

    </th>

    <th>

      Class if true

      为真时的 CSS 类

    </th>

    <th>

      Class if false

      为假时的 CSS 类

    </th>

  </tr>

  <tr>

    <td>

      The control has been visited.

      控件被访问过。

    </td>

    <td>

      <code>ng-touched</code>

    </td>

    <td>

      <code>ng-untouched</code>

    </td>

  </tr>

  <tr>

    <td>

      The control's value has changed.

      控件的值变化了。

    </td>

    <td>

      <code>ng-dirty</code>

    </td>

    <td>

      <code>ng-pristine</code>

    </td>

  </tr>

  <tr>

    <td>

      The control's value is valid.

      控件的值有效。

    </td>

    <td>

      <code>ng-valid</code>

    </td>

    <td>

      <code>ng-invalid</code>

    </td>

  </tr>

</table>

Temporarily add a [template reference variable](guide/template-syntax#ref-vars) named `spy`
to the _Name_ `<input>` tag and use it to display the input's CSS classes.

往姓名 `<input>` 标签上添加名叫 `spy` 的临时[模板引用变量](guide/template-syntax#ref-vars)，
然后用这个 spy 来显示它上面的所有 CSS 类。

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModelName-2"></code-example>

Now run the app and look at the _Name_ input box.
Follow these steps *precisely*:

现在，运行本应用，并让*姓名*输入框获得焦点。
然后严格按照下面四个步骤来做：

1. Look but don't touch.

   查看输入框，但别碰它。

1. Click inside the name box, then click outside it.

   点击输入框，然后点击输入框外面。

1. Add slashes to the end of the name.

   在名字的末尾添加些斜杠。

1. Erase the name.

   删除名字。

The actions and effects are as follows:

动作和它对应的效果如下：

<div class="lightbox">
  <img src="generated/images/guide/forms/control-state-transitions-anim.gif" alt="Control State Transition">
</div>

You should see the following transitions and class names:

你会看到下列转换及其类名：

<div class="lightbox">
  <img src="generated/images/guide/forms/ng-control-class-changes.png" alt="Control state transitions">
</div>

The `ng-valid`/`ng-invalid` pair is the most interesting, because you want to send a
strong visual signal when the values are invalid. You also want to mark required fields.
To create such visual feedback, add definitions for the `ng-*` CSS classes.

(`ng-valid` | `ng-invalid`)这一对是最有趣的部分，因为当数据变得无效时，你希望发出强力的视觉信号，
还想要标记出必填字段。可以通过加入自定义 CSS 来提供视觉反馈。

*Delete* the `#spy` template reference variable and the `TODO` as they have served their purpose.

**删除**模板引用变量 `#spy` 和 `TODO`，因为它们已经完成了使命。

## Add custom CSS for visual feedback

## 添加用于视觉反馈的自定义 CSS

You can mark required fields and invalid data at the same time with a colored bar
on the left of the input box:

可以在输入框的左侧添加带颜色的竖条，用于标记必填字段和无效输入：

<div class="lightbox">
  <img src="generated/images/guide/forms/validity-required-indicator.png" alt="Invalid Form">
</div>

You achieve this effect by adding these class definitions to a new `forms.css` file
that you add to the project as a sibling to `index.html`:

在新建的 `forms.css` 文件中，添加两个样式来实现这一效果。把这个文件添加到项目中，与 `index.html` 相邻。

<code-example path="forms/src/assets/forms.css" header="src/assets/forms.css"></code-example>

Update the `<head>` of `index.html` to include this style sheet:

修改 `index.html` 中的 `<head>`，以包含这个样式表：

<code-example path="forms/src/index.html" header="src/index.html (styles)" region="styles"></code-example>

## Show and hide validation error messages

## 显示和隐藏验证错误信息

You can improve the form. The _Name_ input box is required and clearing it turns the bar red.
That says something is wrong but the user doesn't know *what* is wrong or what to do about it.
Leverage the control's state to reveal a helpful message.

你还能做的更好。“Name” 输入框是必填的，清空它会让左侧的条变红。这表示*某些东西*是错的，但用户不知道错在哪里，或者如何纠正。
  可以借助 `ng-invalid` 类来给出有用的提示。

When the user deletes the name, the form should look like this:

当用户删除姓名时，应该是这样的：

<div class="lightbox">
  <img src="generated/images/guide/forms/name-required-error.png" alt="Name required">
</div>

To achieve this effect, extend the `<input>` tag with the following:

要达到这个效果，在 `<input>` 标签中添加：

* A [template reference variable](guide/template-syntax#ref-vars).

   [模板引用变量](guide/template-syntax#ref-vars)

* The "*is required*" message in a nearby `<div>`, which you'll display only if the control is invalid.

   “is required”消息，放在邻近的 `<div>` 元素中，只有当控件无效时，才显示它。

Here's an example of an error message added to the _name_ input box:

下面这个例子中把一条错误信息添加到了 `name` 输入框中：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="name-with-error-msg"></code-example>

You need a template reference variable to access the input box's Angular control from within the template.
Here you created a variable called `name` and gave it the value "ngModel".

模板引用变量可以访问模板中输入框的 Angular 控件。
这里，创建了名叫 `name` 的变量，并且赋值为 "ngModel"。

<div class="alert is-helpful">

  Why "ngModel"?
  A directive's [exportAs](api/core/Directive) property
  tells Angular how to link the reference variable to the directive.
  You set `name` to `ngModel` because the `ngModel` directive's `exportAs` property happens to be "ngModel".

  为什么是 “ngModel”？
指令的 [exportAs](api/core/Directive) 属性告诉 Angular 如何链接模板引用变量到指令。
这里把 `name` 设置为 `ngModel` 是因为 `ngModel` 指令的 `exportAs` 属性设置成了 “ngModel”。

</div>

You control visibility of the name error message by binding properties of the `name`
control to the message `<div>` element's `hidden` property.

你把 `div` 元素的 `hidden` 属性绑定到 `name` 控件的属性，这样就可以控制“姓名”字段错误信息的可见性了。

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (hidden-error-msg)" region="hidden-error-msg"></code-example>

In this example, you hide the message when the control is valid or pristine;
"pristine" means the user hasn't changed the value since it was displayed in this form.

上例中，当控件是有效的 (valid) 或全新的 (pristine) 时，隐藏消息。
“全新的”意味着从它显示在表单中开始，用户还从未修改过它的值。

This user experience is the developer's choice. Some developers want the message to display at all times.
If you ignore the `pristine` state, you would hide the message only when the value is valid.
If you arrive in this component with a new (blank) hero or an invalid hero,
you'll see the error message immediately, before you've done anything.

这种用户体验取决于开发人员的选择。有些人会希望任何时候都显示这条消息。
如果忽略了 `pristine` 状态，就会只在值有效时隐藏此消息。
如果往这个组件中传入全新（空）的英雄，或者无效的英雄，将立刻看到错误信息 —— 虽然你还啥都没做。

Some developers want the message to display only when the user makes an invalid change.
Hiding the message while the control is "pristine" achieves that goal.
You'll see the significance of this choice when you add a new hero to the form.

有些人会为这种行为感到不安。它们希望只有在用户做出无效的更改时才显示这个消息。
如果当控件是“全新”状态时也隐藏消息，就能达到这个目的。
在往表单中添加新英雄时，将看到这种选择的重要性。

The hero *Alter Ego* is optional so you can leave that be.

英雄的*第二人格*是可选项，所以不用改它。

Hero *Power* selection is required.
You can add the same kind of error handling to the `<select>` if you want,
but it's not imperative because the selection box already constrains the
power to valid values.

英雄的*超能力*选项是必填的。
  只要愿意，可以往 `<select>` 上添加相同的错误处理。
  但没有必要，这个选择框已经限制了“超能力”只能选有效值。

Now you'll add a new hero in this form.
Place a *New Hero* button at the bottom of the form and bind its click event to a `newHero` component method.

现在，你要在这个表单中添加新的英雄。
  在表单的底部放置“New Hero（新增英雄）”按钮，并把它的点击事件绑定到组件上的 `newHero` 方法。

<code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-no-reset" header="src/app/hero-form/hero-form.component.html (New Hero button)"></code-example>

<code-example path="forms/src/app/hero-form/hero-form.component.ts" region="new-hero" header="src/app/hero-form/hero-form.component.ts (New Hero method)"></code-example>

Run the application again, click the *New Hero* button, and the form clears.
The *required* bars to the left of the input box are red, indicating invalid `name` and `power` properties.
That's understandable as these are required fields.
The error messages are hidden because the form is pristine; you haven't changed anything yet.

再次运行应用，点击 *New Hero* 按钮，表单被清空了。
输入框左侧的*必填项*竖条是红色的，表示 `name` 和 `power` 属性是无效的。
这可以理解，因为有一些必填字段。
错误信息是隐藏的，因为表单还是全新的，还没有修改任何东西。

Enter a name and click *New Hero* again.
The app displays a _Name is required_ error message.
You don't want error messages when you create a new (empty) hero.
Why are you getting one now?

输入名字，再次点击 *New Hero* 按钮。
这次，出现了错误信息！为什么？你不希望显示新（空）的英雄时，出现错误信息。

Inspecting the element in the browser tools reveals that the *name* input box is _no longer pristine_.
The form remembers that you entered a name before clicking *New Hero*.
Replacing the hero object *did not restore the pristine state* of the form controls.

使用浏览器工具审查这个元素就会发现，这个 *name* 输入框并不是全新的。
表单记得你在点击 *New Hero* 前输入的名字。
更换了英雄对象*并不会重置控件的“全新”状态*。

You have to clear all of the flags imperatively, which you can do
by calling the form's `reset()` method after calling the `newHero()` method.

你必须清除所有标记，在调用 `newHero()` 方法后调用表单的 `reset()` 方法即可。

<code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-form-reset" header="src/app/hero-form/hero-form.component.html (Reset the form)"></code-example>

Now clicking "New Hero" resets both the form and its control flags.

现在点击“New Hero”重设表单和它的控制标记。

## Submit the form with _ngSubmit_

## 使用 *ngSubmit* 提交该表单

The user should be able to submit this form after filling it in.
The *Submit* button at the bottom of the form
does nothing on its own, but it will
trigger a form submit because of its type (`type="submit"`).

在填表完成之后，用户还应该能提交这个表单。
“Submit（提交）”按钮位于表单的底部，它自己不做任何事，但因为有特殊的 type 值 (`type="submit"`)，所以会触发表单提交。

A "form submit" is useless at the moment.
To make it useful, bind the form's `ngSubmit` event property
to the hero form component's `onSubmit()` method:

现在这样仅仅触发“表单提交”是没用的。
要让它有用，就要把该表单的 `ngSubmit` 事件属性绑定到英雄表单组件的 `onSubmit()` 方法上：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (ngSubmit)" region="ngSubmit"></code-example>

You'd already defined a template reference variable,
`#heroForm`, and initialized it with the value "ngForm".
Now, use that variable to access the form with the Submit button.

你已经定义了一个模板引用变量 `#heroForm`，并且把赋值为“ngForm”。
现在，就可以在“Submit”按钮中访问这个表单了。

You'll bind the form's overall validity via
the `heroForm` variable to the button's `disabled` property
using an event binding. Here's the code:

你要把表单的总体有效性通过 `heroForm` 变量绑定到此按钮的 `disabled` 属性上，代码如下：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (submit-button)" region="submit-button"></code-example>

If you run the application now, you find that the button is enabled&mdash;although
it doesn't do anything useful yet.

重新运行应用。表单打开时，状态是有效的，按钮是可用的。

Now if you delete the Name, you violate the "required" rule, which
is duly noted in the error message.
The *Submit* button is also disabled.

现在，如果你删除*姓名*，就会违反“必填姓名”规则，就会像以前那样显示出错误信息。同时，Submit 按钮也被禁用了。

Not impressed?  Think about it for a moment. What would you have to do to
wire the button's enable/disabled state to the form's validity without Angular's help?

没感觉吗？再想一会儿。如果没有 Angular `NgForm` 的帮助，又该怎么让按钮的禁用/启用状态和表单的有效性关联起来呢？

For you, it was as simple as this:

对你来说，它就是这么简单：

1. Define a template reference variable on the (enhanced) form element.

   定义模板引用变量，放在（强化过的）form 元素上

2. Refer to that variable in a button many lines away.

   从很多行之外的按钮上引用这个变量。

## Toggle two form regions (extra credit)

## 切换两个表单区域（额外的奖励）

Submitting the form isn't terribly dramatic at the moment.

提交表单还是不够激动人心。

<div class="alert is-helpful">

  An unsurprising observation for a demo. To be honest,
  jazzing it up won't teach you anything new about forms.
  But this is an opportunity to exercise some of your newly won
  binding skills.
  If you aren't interested, skip to this page's conclusion.

  对演示来说，这个收场很平淡的。老实说，即使让它更出彩，也无法教给你任何关于表单的新知识。
但这是练习新学到的绑定技能的好机会。
如果你不感兴趣，可以跳到本章的总结部分。

</div>

For a more strikingly visual effect,
hide the data entry area and display something else.

来实现一些更炫的视觉效果吧。
隐藏掉数据输入框，显示一些别的东西。

Wrap the form in a `<div>` and bind
its `hidden` property to the `HeroFormComponent.submitted` property.

先把表单包裹进 `<div>` 中，再把它的 `hidden` 属性绑定到 `HeroFormComponent.submitted` 属性。

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="edit-div"></code-example>

The main form is visible from the start because the
`submitted` property is false until you submit the form,
as this fragment from the `HeroFormComponent` shows:

主表单从一开始就是可见的，因为 `submitted` 属性是 false，直到提交了这个表单。
来自 `HeroFormComponent` 的代码片段证实了这一点：

<code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (submitted)" region="submitted"></code-example>

When you click the *Submit* button, the `submitted` flag becomes true and the form disappears
as planned.

当点击 Submit 按钮时，`submitted` 标志会变成 true，并且表单像预想中一样消失了。

Now the app needs to show something else while the form is in the submitted state.
Add the following HTML below the `<div>` wrapper you just wrote:

现在，当表单处于已提交状态时，需要显示一些别的东西。
在刚刚写的 `<div>` 包装下方，添加下列 HTML 语句：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="submitted"></code-example>

There's the hero again, displayed read-only with interpolation bindings.
This `<div>` appears only while the component is in the submitted state.

英雄又出现了，它通过插值绑定显示为只读内容。
这一小段 HTML 只在组件处于已提交状态时才会显示。

The HTML includes an *Edit* button whose click event is bound to an expression
that clears the `submitted` flag.

这段 HTML 包含一个 “Edit（编辑）”按钮，它的 click 事件绑定到了一个用于清除 `submitted` 标志的表达式。

When you click the *Edit* button, this block disappears and the editable form reappears.

当点 *Edit* 按钮时，这个只读块消失了，可编辑的表单重新出现了。

## Summary

## 小结

The Angular form discussed in this page takes advantage of the following
framework features to provide support for data modification, validation, and more:

本章讨论的 Angular 表单技术利用了下列框架特性来支持数据修改、验证和更多操作：

* An Angular HTML form template.

   Angular HTML 表单模板。

* A form component class with a `@Component` decorator.

   带有 `@Component` 装饰器的表单组件类。

* Handling form submission by binding to the `NgForm.ngSubmit` event property.

   通过绑定到 `NgForm.ngSubmit` 事件属性来处理表单提交。

* Template-reference variables such as `#heroForm` and `#name`.

   模板引用变量，例如 `#heroForm` 和 `#name`。

* `[(ngModel)]` syntax for two-way data binding.

   `[(ngModel)]` 语法用来实现双向数据绑定。

* The use of `name` attributes for validation and form-element change tracking.

   `name` 属性的用途是有效性验证和对表单元素的变更进行追踪。

* The reference variable’s `valid` property on input controls to check if a control is valid and show/hide error messages.

   指向 input 控件的引用变量上的 `valid` 属性，可用于检查控件是否有效、是否显示/隐藏错误信息。

* Controlling the *Submit* button's enabled state by binding to `NgForm` validity.

   通过绑定到 `NgForm` 的有效性状态，控制 *Submit* 按钮的禁用状态。

* Custom CSS classes that provide visual feedback to users about invalid controls.

   定制 CSS 类来给用户提供无效控件的视觉反馈。

Here’s the code for the final version of the application:

下面是该应用最终版本的代码：

<code-tabs>

  <code-pane header="hero-form/hero-form.component.ts" path="forms/src/app/hero-form/hero-form.component.ts" region="final">

  </code-pane>

  <code-pane header="hero-form/hero-form.component.html" path="forms/src/app/hero-form/hero-form.component.html" region="final">

  </code-pane>

  <code-pane header="hero.ts" path="forms/src/app/hero.ts">

  </code-pane>

  <code-pane header="app.module.ts" path="forms/src/app/app.module.ts">

  </code-pane>

  <code-pane header="app.component.html" path="forms/src/app/app.component.html">

  </code-pane>

  <code-pane header="app.component.ts" path="forms/src/app/app.component.ts">

  </code-pane>

  <code-pane header="main.ts" path="forms/src/main.ts">

  </code-pane>

  <code-pane header="forms.css" path="forms/src/assets/forms.css">

  </code-pane>

</code-tabs>
