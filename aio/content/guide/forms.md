# Building a template-driven form

# 构建模板驱动表单

{@a template-driven}

This tutorial shows you how to create a template-driven form whose control elements are bound to data properties, with input validation to maintain data integrity and styling to improve the user experience.

本教程将为你演示如何创建一个模板驱动表单，它的控件元素绑定到数据属性，并通过输入验证来保持数据的完整性和样式，以改善用户体验。

Template-driven forms use [two-way data binding](guide/architecture-components#data-binding "Intro to 2-way data binding") to update the data model in the component as changes are made in the template and vice versa.

当在模板中进行更改时，模板驱动表单会使用[双向数据绑定](guide/architecture-components#data-binding "介绍 2 路数据绑定")来更新组件中的数据模型，反之亦然。

<div class="alert is-helpful">

Angular supports two design approaches for interactive forms. You can build forms by writing templates using Angular [template syntax and directives](guide/glossary#template "Definition of template terms") with the form-specific directives and techniques described in this tutorial, or you can use a reactive (or model-driven) approach to build forms.

Angular 支持两种交互式表单的设计方法。你可以使用 Angular 中的[模板语法和指令，](guide/glossary#template "模板术语的定义")以及本教程中描述的表单专用指令和技巧编写模板来构建表单，或者你可以使用响应式方式（或叫模型驱动方式）来构建表单。

Template-driven forms are suitable for small or simple forms, while reactive forms are more scalable and suitable for complex forms.
For a comparison of the two approaches, see [Introduction to Forms](guide/forms-overview "Overview of Angular forms.")

模板驱动表单适用于小型或简单的表单，而响应式表单则更具伸缩性，适用于复杂表单。要比较这两种方法，参阅[“表单简介”](guide/forms-overview "Angular 表单概述")

</div>

You can build almost any kind of form with an Angular template&mdash;login forms, contact forms, and pretty much any business form.
You can lay out the controls creatively and bind them to the data in your object model.
You can specify validation rules and display validation errors,
conditionally enable or disable specific controls, trigger built-in visual feedback, and much more.

你可以用 Angular 模板来构建各种表单，比如登录表单、联系人表单和几乎所有的业务表单。你可以创造性地对控件进行布局并把它们绑定到对象模型的数据上。你可以指定验证规则并显示验证错误，有条不紊地启用或禁用特定控件，触发内置的视觉反馈等等。

This tutorial shows you how to build a form from scratch, using a simplified sample form like the one from the [Tour of Heroes tutorial](tutorial "Tour of Heroes") to illustrate the techniques.

本教程将向你展示如何通过一个简化的范例表单来从头构建一个表单，就像“[英雄之旅”教程的](tutorial "英雄之旅")中用一个表单来讲解这些技巧一样。

<div class="alert is-helpful">

  Run or download the example app: <live-example></live-example>.

  运行或下载范例应用：<live-example></live-example>。

</div>

## Objectives

## 目标

This tutorial teaches you how to do the following:

本教程将教你如何执行以下操作：

* Build an Angular form with a component and template.

  使用组件和模板构建一个 Angular 表单。

* Use `ngModel` to create two-way data bindings for reading and writing input-control values.

  使用 `ngModel` 创建双向数据绑定，以便读写输入控件的值。

* Provide visual feedback using special CSS classes that track the state of the controls.

  使用跟踪控件状态的特殊 CSS 类来提供视觉反馈。

* Display validation errors to users and enable or disable form controls based on the form status.

  向用户显示验证错误，并根据表单状态启用或禁用表单控件。

* Share information across HTML elements using [template reference variables](guide/template-reference-variables).

  [使用模板引用变量](guide/template-reference-variables)在 HTML 元素之间共享信息。

## Prerequisites

## 先决条件

Before going further into template-driven forms, you should have a basic understanding of the following.

在进一步研究模板驱动表单之前，你应该对下列内容有一个基本的了解。

* TypeScript and HTML5 programming.

  TypeScript 和 HTML5 编程。

* Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture "Introduction to Angular concepts.").

  Angular 的应用设计基础，就像[Angular 概念简介](guide/architecture "Angular 概念简介。")中描述的那样。

* The basics of [Angular template syntax](guide/template-syntax "Template syntax guide").

  [Angular 模板语法](guide/template-syntax "模板语法指南")的基础知识。

* The form-design concepts that are presented in [Introduction to Forms](guide/forms-overview "Overview of Angular forms.").

  [“表单简介”](guide/forms-overview "Angular 表单概述")中提供的表单设计概念。

{@a intro}

## Build a template-driven form

## 构建一个模板驱动表单

Template-driven forms rely on directives defined in the `FormsModule`.

模板驱动表单依赖于 `FormsModule` 定义的指令。

* The `NgModel` directive reconciles value changes in the attached form element with changes in the data model, allowing you to respond to user input with input validation and error handling.

  `NgModel` 指令会协调其附着在的表单元素中的值变更与数据模型中的变更，以便你通过输入验证和错误处理来响应用户输入。

* The `NgForm` directive creates a top-level `FormGroup` instance and binds it to a `<form>` element to track aggregated form value and validation status.
As soon as you import `FormsModule`, this directive becomes active by default on all `<form>` tags. You don't need to add a special selector.

  `NgForm` 指令会创建一个顶级的 `FormGroup` 实例，并把它绑定到 `<form>` 元素上，以跟踪它所聚合的那些表单值并验证状态。只要你导入了 `FormsModule`，默认情况下这个指令就会在所有 `<form>` 标签上激活。你不需要添加特殊的选择器。

* The `NgModelGroup` directive creates and binds a `FormGroup` instance to a DOM element.

  `NgModelGroup` 指令会创建 `FormGroup` 的实例并把它绑定到 DOM 元素中。

### The sample application

### 范例应用

The sample form in this guide is used by the *Hero Employment Agency* to maintain personal information about heroes.
Every hero needs a job. This form helps the agency match the right hero with the right crisis.

*英雄雇佣管理局*使用本指南中的范例表单来维护英雄的个人信息。毕竟英雄也要工作啊。这个表单有助于该机构将正确的英雄与正确的危机匹配起来。

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-1.png" alt="Clean Form">
</div>

The form highlights some design features that make it easier to use. For instance, the two required fields have a green bar on the left to make them easy to spot. These fields have initial values, so the form is valid and the **Submit** button is enabled.

该表单突出了一些易于使用的设计特性。比如，这两个必填字段的左边是绿色条，以便让它们醒目。这些字段都有初始值，所以表单是有效的，并且 **Submit** 按钮也是启用的。

As you work with this form, you will learn how to include validation logic, how to customize the presentation with standard CSS, and how to handle error conditions to ensure valid input.
If the user deletes the hero name, for example, the form becomes invalid. The app detects the changed status, and displays a validation error in an attention-grabbing style.
In addition, the **Submit** button is disabled, and the "required" bar to the left of the input control changes from green to red.

当你使用这个表单时，你将学习如何包含验证逻辑，如何使用标准 CSS 自定义表达式，以及如何处理错误条件以确保输入的有效性。例如，如果用户删除了英雄的名字，那么表单就会失效。该应用会检测已更改的状态，并以醒目的样式显示验证错误。此外，**Submit** 按钮会被禁用，输入控件左侧的“必填”栏也会从绿色变为红色。

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-2.png" alt="Invalid, Name Required">
</div>

### Step overview

### 步骤概述

In the course of this tutorial, you bind a sample form to data and handle user input using the following steps.

在本教程中，你将使用以下步骤将一个范例表单绑定到数据并处理用户输入。

1. Build the basic form.

   建立基本表单。

   * Define a sample data model.

     定义一个范例数据模型。

   * Include required infrastructure such as the `FormsModule`.

     包括必需的基础设施，比如 `FormsModule` 。

2. Bind form controls to data properties using the `ngModel` directive and two-way data-binding syntax.

   使用 `ngModel` 指令和双向数据绑定语法把表单控件绑定到数据属性。

   * Examine how `ngModel` reports control states using CSS classes.

     检查 `ngModel` 如何使用 CSS 类报告控件状态。

   * Name controls to make them accessible to `ngModel`.

     为控件命名，以便让 `ngModel` 可以访问它们。

3. Track input validity and control status using `ngModel`.

   用 `ngModel` 跟踪输入的有效性和控件的状态。

   * Add custom CSS to provide visual feedback on the status.

     添加自定义 CSS 来根据状态提供可视化反馈。

   * Show and hide validation-error messages.

     显示和隐藏验证错误信息。

4. Respond to a native HTML button-click event by adding to the model data.

   通过添加到模型数据来响应原生 HTML 按钮的单击事件。

5. Handle form submission using the [`ngSubmit`](api/forms/NgForm#properties) output property of the form.

   使用表单的 [`ngSubmit`](api/forms/NgForm#properties) 输出属性来处理表单提交。

   * Disable the **Submit** button until the form is valid.

     在表单生效之前，先禁用 **Submit** 按钮。

   * After submit, swap out the finished form for different content on the page.

     在提交完成后，把已完成的表单替换成页面上不同的内容。

{@a step1}

## Build the form

## 建立表单

You can recreate the sample application from the code provided here, or you can examine or download the <live-example></live-example>.

你可以根据这里提供的代码从头创建范例应用，也可以查看 <live-example></live-example>。

1. The provided sample application creates the `Hero` class which defines the data model reflected in the form.

   这里提供的范例应用会创建一个 `Hero` 类，用于定义表单中所反映的数据模型。

   <code-example path="forms/src/app/hero.ts" header="src/app/hero.ts"></code-example>

2. The form layout and details are defined in the `HeroFormComponent` class.

   该表单的布局和细节是在 `HeroFormComponent` 类中定义的。

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (v1)" region="v1"></code-example>

   The component's `selector` value of "app-hero-form" means you can drop this form in a parent
template using the `<app-hero-form>` tag.

   该组件的 `selector` 值为 “app-hero-form”，意味着你可以用 `<app-hero-form>` 标签把这个表单放到父模板中。

3. The following code creates a new hero instance, so that the initial form can show an example hero.

   下面的代码会创建一个新的 hero 实例，以便让初始的表单显示一个范例英雄。

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" region="SkyDog"></code-example>

   This demo uses dummy data for `model` and `powers`. In a real app, you would inject a data service to get and save real data, or expose these properties as inputs and outputs.

   这个演示使用虚拟数据来表达 `model` 和 `powers` 。在真正的应用中，你会注入一个数据服务来获取和保存实际数据，或者把它们作为输入属性和输出属性进行公开。

4. The application enables the Forms feature and registers the created form component.

   该应用启用了表单功能，并注册了已创建的表单组件。

   <code-example path="forms/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

5. The form is displayed in the application layout defined by the root component's template.

   该表单显示在根组件模板定义的应用布局中。

   <code-example path="forms/src/app/app.component.html" header="src/app/app.component.html"></code-example>

   The initial template defines the layout for a form with two form groups and a submit button.
   The form groups correspond to two properties of the Hero data model, name and alterEgo. Each group has a label and a box for user input.

   初始模板定义了一个带有两个表单组和一个提交按钮的表单布局。表单组对应于 Hero 数据模型的两个属性：name 和 alterEgo。每个组都有一个标签和一个用户输入框。

   * The **Name** `<input>` control element has the HTML5 `required` attribute.

     **Name** `<input>` 控件元素中包含了 HTML5 的 `required` 属性。

   * The **Alter Ego** `<input>` control element does not because `alterEgo` is optional.

     **Alter Ego** `<input>` 没有控件元素，因为 `alterEgo` 是可选的。

   The **Submit** button has some classes on it for styling.
   At this point, the form  layout is all plain HTML5, with no bindings or directives.

   **Submit** 按钮里面有一些用于样式化的类。此时，表单布局全都是纯 HTML5，没有绑定或指令。

6. The sample form uses some style classes from [Twitter Bootstrap](https://getbootstrap.com/css/): `container`, `form-group`, `form-control`, and `btn`.
   To use these styles, the app's style sheet imports the library.

   范例表单使用的是 [Twitter Bootstrap 中的](https://getbootstrap.com/css/)一些样式类： `container` ， `form-group` ， `form-control` 和 `btn` 。要使用这些样式，就要在该应用的样式表中导入该库。

   <code-example path="forms/src/styles.1.css" header="src/styles.css"></code-example>

7. The form makes the hero applicant choose one superpower from a fixed list of agency-approved powers.
   The predefined list of `powers` is part of the data model, maintained internally in `HeroFormComponent`.
   The Angular [NgForOf directive](api/common/NgForOf "API reference") iterates over the data values to populate the `<select>` element.

   这份表单让英雄申请人从管理局批准过的固定清单中选出一项超能力。预定义 `powers` 列表是数据模型的一部分，在 `HeroFormComponent` 内部维护。 Angular 的[NgForOf 指令](api/common/NgForOf "API 参考")会遍历这些数据值，以填充这个 `<select>` 元素。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (powers)" region="powers"></code-example>

If you run the app right now, you see the list of powers in the selection control. The input elements are not yet bound to data values or events, so they are still blank and have no behavior.

如果你现在正在运行该应用，你会看到选择控件中的超能力列表。由于尚未将这些 input 元素绑定到数据值或事件，因此它们仍然是空白的，没有任何行为。

<div class="lightbox">
  <img src="generated/images/guide/forms/hero-form-3.png" alt="Early form with no binding">
</div>

{@a ngModel}

## Bind input controls to data properties

## 把输入控件绑定到数据属性

The next step is to bind the input controls to the corresponding `Hero` properties with two-way data binding, so that they respond to user input by updating the data model, and also respond to programmatic changes in the data by updating the display.

下一步是使用双向数据绑定把输入控件绑定到相应的 `Hero` 属性，这样它们就可以通过更新数据模型来响应用户的输入，并通过更新显示来响应数据中的程序化变更。

The `ngModel` directive declared in the `FormsModule` lets you bind controls in your template-driven form to properties in your data model.
When you include the directive using the  syntax for two-way data binding, `[(ngModel)]`, Angular can track the value and user interaction of the control and keep the view synced with the model.

该 `ngModel` 指令是由 `FormsModule` 声明的，它能让你把模板驱动表单中的控件绑定到数据模型中的属性。当你使用双向数据绑定的语法 `[(ngModel)]` 引入该指令时，Angular 就可以跟踪控件的值和用户交互，并保持视图与模型的同步。

1. Edit the template file `hero-form.component.html`.

   编辑模板 `hero-form.component.html` 。

2. Find the `<input>` tag next to the **Name** label.

   找到 **Name** 标签旁边的 `<input>` 标记。

3. Add the `ngModel` directive, using two-way data binding syntax `[(ngModel)]="..."`.

   使用双向数据绑定语法 `[(ngModel)]="..."` 添加 `ngModel` 指令。

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModelName-1"></code-example>

<div class="alert is-helpful">

This example has a temporary diagnostic interpolation after each input tag, `{{model.name}}`, to show the current data value of the corresponding property.
The note reminds you to remove the diagnostic lines when you have finished observing the two-way data binding at work.

这个例子中在每个 input 标记后面都有一个临时的诊断插值 `{{model.name}}`，以显示相应属性的当前数据值。本提醒是为了让你在观察完这个双向数据绑定后删除这些诊断行。

</div>

{@a ngForm}

### Access the overall form status

### 访问表单的整体状态

When you imported the `FormsModule` in your component, Angular automatically created and attached an [NgForm](api/forms/NgForm "API reference for NgForm") directive to the `<form>` tag in the template (because `NgForm` has the selector `form` that matches `<form>` elements).

当你导入了 `FormsModule` 时，Angular 会自动为模板中的 `<form>` 标签创建并附加一个 [NgForm](api/forms/NgForm "NgForm 的 API 参考") 指令。（因为 `NgForm` 定义了一个能匹配 `<form>` 元素的选择器 `form`）。

To get access to the `NgForm` and the overall form status, declare a [template reference variable](guide/template-reference-variables).

要访问 `NgForm` 和表单的整体状态，[就要声明一个模板引用变量](guide/template-reference-variables)。

1. Edit the template file `hero-form.component.html`.

   编辑模板 `hero-form.component.html` 。

2. Update the `<form>` tag with a template reference variable, `#heroForm`, and set its value as follows.

   为 `<form>` 标签添加模板引用变量 `#heroForm`，并把它的值设置如下。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="template-variable"></code-example>

   The `heroForm` template variable  is now a reference to the `NgForm` directive instance that governs the form as a whole.

   模板变量 `heroForm` 现在是对 `NgForm` 指令实例的引用，该指令实例管理整个表单。

3. Run the app.

   运行该应用。

4. Start typing in the **Name** input box.

   开始在 **Name** 输入框中输入。

  As you add and delete characters, you can see them appear and disappear from the data model.
   For example:

   在添加和删除字符时，你可以看到它们从数据模型中出现和消失。例如：

   <div class="lightbox">
     <img src="generated/images/guide/forms/ng-model-in-action.png" alt="ngModel in action">
   </div>

  The diagnostic line that shows interpolated values demonstrates that values are really flowing from the input box to the model and back again.

  用来显示插值的诊断行证明了这些值确实从输入框流向了模型，然后再返回。

### Naming control elements

### 为控件元素命名

When you use `[(ngModel)]` on an element, you must define a `name` attribute for that element.
Angular uses the assigned name to register the element with the `NgForm` directive attached to the parent `<form>` element.

在元素上使用 `[(ngModel)]` 时，必须为该元素定义一个 `name` 属性。Angular 会用这个指定的名字来把这个元素注册到父 `<form>` 元素上的 `NgForm` 指令中。

The example added a `name` attribute to the `<input>` element and set it to "name",
which makes sense for the hero's name.
Any unique value will do, but using a descriptive name is helpful.

这个例子中为 `<input>` 元素添加了一个 `name` 属性，并把它的值设置为 “name”，用来表示英雄的名字。任何唯一的值都可以用，但最好用描述性的名称。

1. Add similar `[(ngModel)]` bindings and `name` attributes to **Alter Ego** and **Hero Power**.

   为**Alter Ego**和**Hero Power**添加类似的 `[(ngModel)]` 绑定和 `name` 属性。

2. You can now remove the diagnostic messages that show interpolated values.

   你现在可以移除显示插值的诊断消息了。

3. To confirm that two-way data binding works for the entire hero model, add a new binding at the top to the component's `diagnostic` property.

   要想确认双向数据绑定是否在整个英雄模型上都有效，就要在该组件的顶部添加一个对 `diagnostic` 属性的新绑定。

After these revisions, the form template should look like the following:

表单模板修改完毕后，应如下所示：

<code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="ngModel-2"></code-example>

* Notice that each `<input>` element has an `id` property. This is used by the `<label>` element's `for` attribute to match the label to its input control. This is a [standard HTML feature](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).

  注意，每个 `<input>` 元素都有一个 `id` 属性。`<label>` 元素的 `for` 属性用它来把标签匹配到输入控件。这是一个[标准的 HTML 特性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)。

* Each `<input>` element also has the required `name` property that Angular uses to register the control with the form.

  每个 `<input>` 元素都有一个必需的 `name` 属性，Angular 用它来注册表单中的控件。

If you run the app now and change every hero model property, the form might display like this:

如果你现在运行该应用并更改英雄模型的每个属性，该表单可能会显示如下：

<div class="lightbox">
  <img src="generated/images/guide/forms/ng-model-in-action-2.png" alt="ngModel in action">
</div>

The diagnostic near the top of the form confirms that all of your changes are reflected in the model.

通过表单顶部的诊断行可以确认所有的更改都已反映在模型中。

4. When you have observed the effects, you can delete the `{{diagnostic}}` binding.

   你已经观察到了这种效果，可以删除 `{{diagnostic}}` 绑定了。

## Track control states

## 跟踪控件状态

The `NgModel` directive on a control tracks the state of that control.
It tells you if the user touched the control, if the value changed, or if the value became invalid.
Angular sets special CSS classes on the control element to reflect the state, as shown in the following table.

控件上的 `NgModel` 指令会跟踪该控件的状态。它会告诉你用户是否接触过该控件、该值是否发生了变化，或者该值是否无效。 Angular 在控件元素上设置了特殊的 CSS 类来反映其状态，如下表所示。

<table>

  <tr>

    <th>
      State
    </th>

    <th>
      Class if true
    </th>

    <th>
      Class if false
    </th>

  </tr>

  <tr>

    <th>
      状态
    </th>

    <th>
      为 true 时的类名
    </th>

    <th>
      为 false 时的类名
    </th>

  </tr>

  <tr>

    <td>
      The control has been visited.
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
      该控件已经被访问过。
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
      该控件的值已变化。
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
    </td>

    <td>
      <code>ng-valid</code>
    </td>

    <td>
      <code>ng-invalid</code>
    </td>

  </tr>

  <tr>

    <td>
      该控件的值是无效的。
    </td>

    <td>
      <code>ng-valid</code>
    </td>

    <td>
      <code>ng-invalid</code>
    </td>

  </tr>

</table>

You use these CSS classes to define the styles for your control based on its status.

你可以用这些 CSS 类来根据控件的状态定义其样式。

### Observe control states

### 观察控件状态

To see how the classes are added and removed by the framework, open the browser's developer tools and inspect the `<input>` element that represents the hero name.

要想知道框架是如何添加和移除这些类的，请打开浏览器的开发者工具，检查代表英雄名字的 `<input>`

1. Using your browser's developer tools, find the  `<input>` element that corresponds to the **Name** input box.
   You can see that the element has multiple CSS classes in addition to "form-control".

   使用浏览器的开发者工具，找到与 “**Name**” 输入框对应的 `<input>` 元素。除了 “form-control” 类之外，你还可以看到该元素有多个 CSS 类。

2. When you first bring it up, the classes indicate that it has a valid value, that the value has not been changed since initialization or reset, and that the control has not been visited since initialization or reset.

   当你第一次启动它的时候，这些类表明它是一个有效的值，该值在初始化或重置之后还没有改变过，并且在该控件自初始化或重置后也没有被访问过。

   ```
   <input ... class="form-control ng-untouched ng-pristine ng-valid" ...>
   ```

3. Take the following actions on the **Name** `<input>` box, and observe which classes appear.

   **在 Name** `<input>` 框中执行以下操作，看看会出现哪些类。

   * Look but don't touch. The classes indicate that it is untouched, pristine, and valid.

     查看，但不要碰它。这些类表明它没有被碰过、还是最初的值，并且有效。

   * Click inside the name box, then click outside it. The control has now been visited, and the element has the `ng-touched` class instead of the `ng-untouched` class.

     在 **Name** 框内单击，然后单击它外部。该控件现在已被访问过，该元素具有 `ng-touched` 类，取代了 `ng-untouched` 类。

   * Add slashes to the end of the name. It is now touched and dirty.

     在名字的末尾添加斜杠。现在它被碰过，而且是脏的（变化过）。

   * Erase the name. This makes the value invalid, so the `ng-invalid` class replaces the `ng-valid` class.

     删掉这个名字。这会使该值无效，所以 `ng-invalid` 类会取代 `ng-valid` 类。

### Create visual feedback for states

### 为状态创建视觉反馈

The `ng-valid`/`ng-invalid` pair is particularly interesting, because you want to send a
strong visual signal when the values are invalid.
You also want to mark required fields.

注意 `ng-valid` / `ng-invalid` 这两个类，因为你想在值无效时发出强烈的视觉信号。你还要标记必填字段。

You can mark required fields and invalid data at the same time with a colored bar
on the left of the input box:

你可以在输入框的左侧用彩条标记必填字段和无效数据：

<div class="lightbox">
  <img src="generated/images/guide/forms/validity-required-indicator.png" alt="Invalid Form">
</div>

To change the appearance in this way, take the following steps.

要想用这种方式修改外观，请执行以下步骤。

1. Add definitions for the `ng-*` CSS classes.

   为 `ng-*` CSS 类添加一些定义。

2. Add these class definitions to a new `forms.css` file.

   把这些类定义添加到一个新的 `forms.css` 文件中。

3. Add the new file to the project as a sibling to `index.html`:

   把这个新文件添加到项目中，作为 `index.html` 的兄弟：

   <code-example path="forms/src/assets/forms.css" header="src/assets/forms.css"></code-example>

4. In the `index.html` file, update the `<head>` tag to include the new style sheet.

   在 `index.html` 文件中，更新 `<head>` 标签以包含新的样式表。

   <code-example path="forms/src/index.html" header="src/index.html (styles)" region="styles"></code-example>

### Show and hide validation error messages

### 显示和隐藏验证错误信息

The **Name** input box is required and clearing it turns the bar red.
That indicates that something is wrong, but the user doesn't know what is wrong or what to do about it.
You can provide a helpful message by checking for and responding to the control's state.

**Name** 输入框是必填的，清除它就会把彩条变成红色。这表明有些东西是错的，但是用户并不知道要怎么做或该做什么。你可以通过查看和响应控件的状态来提供有用的信息。

When the user deletes the name, the form should look like this:

当用户删除该名字时，该表单应如下所示：

<div class="lightbox">
  <img src="generated/images/guide/forms/name-required-error.png" alt="Name required">
</div>

The **Hero Power** select box is also required, but it doesn't need this kind of error handling because the selection box already constrains the selection to valid values.

**Hero Power** 选择框也是必填的，但它不需要这样的错误处理，因为选择框已经把选择限制在有效值范围内。

To define and show an error message when appropriate, take the following steps.

要在适当的时候定义和显示错误信息，请执行以下步骤。

1. Extend the `<input>` tag with a template reference variable that you can use to access the input box's Angular control from within the template. In the example, the variable is `#name="ngModel"`.

   使用模板引用变量扩展 `<input>` 标签，你可以用来从模板中访问输入框的 Angular 控件。在这个例子中，该变量是 `#name="ngModel"` 。

   <div class="alert is-helpful">

     The template reference variable (`#name`) is set to `"ngModel"` because that is the value of the [`NgModel.exportAs`](api/core/Directive#exportAs) property. This property tells Angular how to link a reference variable to a directive.

   模板引用变量（ `#name` ）设置为 `"ngModel"`，因为 "ngModel" 是 [`NgModel.exportAs`](api/core/Directive#exportAs) 属性的值。这个属性告诉 Angular 如何把引用变量和指令链接起来。

   </div>

2. Add a `<div>` that contains a suitable error message.

   添加一个包含合适错误信息 `<div>`

3. Show or hide the error message by binding properties of the `name`
control to the message `<div>` element's `hidden` property.

   通过把 `name` 控件的属性绑定到 `<div>` 元素的 `hidden` 属性来显示或隐藏错误信息。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (hidden-error-msg)" region="hidden-error-msg"></code-example>

4. Add a conditional error message to the _name_ input box, as in the following example.

   为 *name* 输入框添加一个有条件的错误信息，如下例所示。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="name-with-error-msg"></code-example>

<div class="callout is-helpful">

<header>Illustrating the "pristine" state</header>

<header>关于 "pristine"（原始）状态的说明</header>

In this example, you hide the message when the control is either valid or *pristine*.
Pristine means the user hasn't changed the value since it was displayed in this form.
If you ignore the `pristine` state, you would hide the message only when the value is valid.
If you arrive in this component with a new (blank) hero or an invalid hero,
you'll see the error message immediately, before you've done anything.

在这个例子中，当控件是有效的（valid）或者是*原始的*（pristine）时，你会隐藏这些消息。 原始表示该用户在此表单中显示的值尚未更改过。如果你忽略了 `pristine` 状态，那么只有当值有效时才会隐藏这些消息。如果你把一个新的（空白）英雄或一个无效的英雄传给这个组件，你会立刻看到错误信息，而这时候你还没有做过任何事情。

You might want the message to display only when the user makes an invalid change.
Hiding the message while the control is in the `pristine` state achieves that goal.
You'll see the significance of this choice when you add a new hero to the form in the next step.

你可能希望只有在用户做出无效更改时，才显示该消息。 因此当 `pristine` 状态时，隐藏这条消息就可以满足这个目标。当你在下一步中为表单添加一个新的英雄时，就会看到这个选择有多重要。

</div>

## Add a new hero

## 添加一个新英雄

This exercise shows how you can respond to a native HTML button-click event by adding to the model data.
To let form users add a new hero, you will add a **New Hero** button that responds to a click event.

本练习通过添加模型数据，展示了如何响应原生 HTML 按钮单击事件。要让表单用户添加一个新的英雄，就要添加一个能响应 click 事件的 **New Hero** 按钮。

1. In the template, place a "New Hero" `<button>` element at the bottom of the form.

   在模板中，把 “New Hero” 这个 `<button>` 元素放在表单底部。

2. In the component file, add the hero-creation method to the hero data model.

   在组件文件中，把创建英雄的方法添加到英雄数据模型中。

   <code-example path="forms/src/app/hero-form/hero-form.component.ts" region="new-hero" header="src/app/hero-form/hero-form.component.ts (New Hero method)"></code-example>

3. Bind the button's click event to a hero-creation method, `newHero()`.

   把按钮的 click 事件绑定到一个创建英雄的方法 `newHero()` 上。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-no-reset" header="src/app/hero-form/hero-form.component.html (New Hero button)"></code-example>

4. Run the application again and click the **New Hero** button.

   再次运行该应用，单击 **New Hero** 按钮。

   The form clears, and the *required* bars to the left of the input box are red, indicating invalid `name` and `power` properties.
   Notice that the error messages are hidden. This is because the form is pristine; you haven't changed anything yet.

   表单会清空，输入框左侧的*必填*栏会显示红色，说明 `name` 和 `power` 属性无效。请注意，错误消息是隐藏的。这是因为表单处于原始状态。你还没有改过任何东西。

5. Enter a name and click **New Hero** again.

   输入一个名字，然后再次点击 **New Hero**。

   Now the app displays a _Name is required_ error message, because the input box is no longer pristine.
   The form remembers that you entered a name before clicking **New Hero**.

   现在，该应用会显示一条错误信息 *Name is required*，因为该输入框不再是原始状态。表单会记住你在单击 **New Hero** 之前输入过一个名字。

6. To restore the pristine state of the form controls, clear all of the flags imperatively by calling the form's `reset()` method after calling the `newHero()` method.

   要恢复表单控件的原始状态，可以在调用 `newHero()` 方法之后强制调用表单的 `reset()` 方法以清除所有标志。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" region="new-hero-button-form-reset" header="src/app/hero-form/hero-form.component.html (Reset the form)"></code-example>

   Now clicking **New Hero** resets both the form and its control flags.

   现在单击 **New Hero** 会重置表单及其控件标志。

<div class="alert is-helpful">

See the [User Input](guide/user-input) guide for more information about listening for DOM events with an event binding and updating a corresponding component property.

关于使用事件绑定监听 DOM 事件和更新相应组件属性的更多信息，请参阅[“用户输入”指南。](guide/user-input)。

</div>

## Submit the form with _ngSubmit_

## 使用 *ngSubmit* 提交表单

The user should be able to submit this form after filling it in.
The **Submit** button at the bottom of the form does nothing on its own, but it does
trigger a form-submit event because of its type (`type="submit"`).
To respond to this event, take the following steps.

用户应该可以在填写之后提交这个表单。表单底部的 **Submit** 按钮本身没有任何作用，但由于它的类型（`type="submit"`），它会触发一个表单提交事件。要响应此事件，请执行以下步骤。

1. Bind the form's [`ngSubmit`](api/forms/NgForm#properties) event property to the hero-form component's `onSubmit()` method.

   把表单的 [`ngSubmit`](api/forms/NgForm#properties) 事件属性绑定到一个 hero-form 组件的 `onSubmit()` 方法中。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (ngSubmit)" region="ngSubmit"></code-example>

2. Use the template reference variable, `#heroForm` to access the form that contains the **Submit** button and create an event binding.
You will bind the form property that indicates its overall validity to the **Submit** button's `disabled` property.

   使用模板引用变量 `#heroForm` 访问包含 **Submit** 按钮的表单，并创建一个事件绑定。你可以把表示它整体有效性的 form 属性绑定到 **Submit** 按钮的 `disabled` 属性上。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (submit-button)" region="submit-button"></code-example>

3. Run the application now. Notice that the button is enabled&mdash;although
it doesn't do anything useful yet.

   立即运行该应用。注意，该按钮已启用 - 虽然它还没有做任何有用的事情。


   You didn't have to explicitly wire the button's enabled state to the form's validity.
   The `FormsModule` did this automatically when you defined a template reference variable on the enhanced form element, then referred to that variable in the button control.

   你不必把按钮的启用状态明确地关联表单的有效性上。当 `FormsModule` 在增强的表单元素上定义模板引用变量时，会自动执行此操作，然后在按钮控件中引用该变量。

### Respond to form submission

### 响应表单提交

To show a response to form submission, you can hide the data entry area and display something else in its place.

要展示对表单提交的响应，你可以隐藏数据输入区域并就地显示其它内容。

1. Wrap the entire form in a `<div>` and bind
its `hidden` property to the `HeroFormComponent.submitted` property.

   把整个表单包裹进一个 `<div>` 中并把它的 `hidden` 属性绑定到 `HeroFormComponent.submitted` 属性上。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="edit-div"></code-example>

   * The main form is visible from the start because the `submitted` property is false until you submit the form, as this fragment from the `HeroFormComponent` shows:

     主表单从一开始就是可见的，因为在提交之前，它的 `submitted` 属性都是 false，正如 `HeroFormComponent` 中的这个片段所显示的：

      <code-example path="forms/src/app/hero-form/hero-form.component.ts" header="src/app/hero-form/hero-form.component.ts (submitted)" region="submitted"></code-example>

   * When you click the **Submit** button, the `submitted` flag becomes true and the form disappears.

     点击  **Submit**  按钮后， `submitted` 标志就变为 `true`，表单就会消失。

2. To show something else while the form is in the submitted state, add the following HTML below the new `<div>` wrapper.

   要在表单处于已提交状态时显示其它内容，请在新的 `<div>` 包装器下添加以下 HTML。

   <code-example path="forms/src/app/hero-form/hero-form.component.html" header="src/app/hero-form/hero-form.component.html (excerpt)" region="submitted"></code-example>

   This `<div>`, which shows a read-only hero with interpolation bindings, appears only while the component is in the submitted state.

   这个 `<div>` （用于显示带插值绑定的只读英雄）只在组件处于已提交状态时才会出现。

   The alternative display includes an *Edit* button whose click event is bound to an expression
that clears the `submitted` flag.

   另外还显示了一个 *Edit* 按钮，它的 click 事件绑定到了一个清除 `submitted` 标志的表达式。

3. Click the *Edit* button to switch the display back to the editable form.

   单击 *Edit* 按钮，将显示切换回可编辑的表单。

## Summary

## 总结

The Angular form discussed in this page takes advantage of the following
framework features to provide support for data modification, validation, and more.

本页讨论的 Angular 表单利用了下列框架特性来支持数据修改，验证等工作。

* An Angular HTML form template.

  一个 Angular HTML 表单模板。

* A form component class with a `@Component` decorator.

  带 `@Component` 装饰器的表单组件类。

* Handling form submission by binding to the `NgForm.ngSubmit` event property.

  绑定到 `NgForm.ngSubmit` 事件属性来处理表单提交。

* Template-reference variables such as `#heroForm` and `#name`.

  模板引用变量，比如 `#heroForm` 和 `#name` 。

* `[(ngModel)]` syntax for two-way data binding.

  双向数据绑定的 `[(ngModel)]` 语法。

* The use of `name` attributes for validation and form-element change tracking.

  `name` 属性的用途是验证和表单元素的变更跟踪。

* The reference variable’s `valid` property on input controls to check if a control is valid and show or hide error messages.

  用输入控件上的引用变量的 `valid` 属性来检查控件是否有效，并据此显示或隐藏错误信息。

* Controlling the **Submit** button's enabled state by binding to `NgForm` validity.

  用 `NgForm` 的有效性来控制 **Submit** 按钮的启用状态。

* Custom CSS classes that provide visual feedback to users about invalid controls.

  自定义 CSS 类，为用户提供关于无效控件的视觉反馈。

Here’s the code for the final version of the application:

这里是该应用最终版本的代码：

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
