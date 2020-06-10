# Building dynamic forms

# 构建动态表单

Many forms, such as questionaires, can be very similar to one another in format and intent.
To make it faster and easier to generate different versions of such a form,
you can create a *dynamic form template* based on metadata that describes the business object model.
You can then use the template to generate new forms automatically, according to changes in the data model.

许多表单（例如问卷）可能在格式和意图上都非常相似。为了更快更轻松地生成这种表单的不同版本，你可以根据描述业务对象模型的元数据来创建*动态表单模板*。然后就可以根据数据模型中的变化，使用该模板自动生成新的表单。

The technique is particularly useful when you have a type of form whose content must
change frequently to meet rapidly changing business and regulatory requirements.
A typical use case is a questionaire. You might need to get input from users in different contexts.
The format and style of the forms a user sees should remain constant, while the actual questions you need to ask vary with the context.

如果你有这样一种表单，其内容必须经常更改以满足快速变化的业务需求和监管需求，该技术就特别有用。一个典型的例子就是问卷。你可能需要在不同的上下文中获取用户的意见。用户要看到的表单格式和样式应该保持不变，而你要提的实际问题则会因上下文而异。

In this tutorial you will build a dynamic form that presents a basic questionaire.
You will build an online application for heroes seeking employment.
The agency is constantly tinkering with the application process, but by using the dynamic form
you can create the new forms on the fly without changing the application code.

在本教程中，你将构建一个渲染基本问卷的动态表单。你要为正在找工作的英雄们建立一个在线应用。英雄管理局会不断修补应用流程，但是借助动态表单，你可以动态创建新的表单，而无需修改应用代码。

The tutorial walks you through the following steps.

本教程将指导你完成以下步骤。

1. Enable reactive forms for a project.

   为项目启用响应式表单。

2. Establish a data model to represent form controls.

   建立一个数据模型来表示表单控件。

3. Populate the model with sample data.

   使用示例数据填充模型。

4. Develop a component to create form controls dynamically.

   开发一个组件来动态创建表单控件。

The form you create uses input validation and styling to improve the user experience.
It has a Submit button that is only enabled when all user input is valid, and flags invalid input with color coding and error messages.

你创建的表单会使用输入验证和样式来改善用户体验。它有一个 Submit 按钮，这个按钮只会在所有的用户输入都有效时启用，并用色彩和一些错误信息来标记出无效输入。

The basic version can evolve to support a richer variety of questions, more graceful rendering, and superior user experience.

这个基本版可以不断演进，以支持更多的问题类型、更优雅的渲染体验以及更高大上的用户体验。

<div class="alert is-helpful">

See the <live-example name="dynamic-form"></live-example>.

参见 <live-example name="dynamic-form"></live-example>。

</div>

## Prerequisites

## 先决条件

Before doing this tutorial, you should have a basic understanding to the following.

在做本教程之前，你应该对下列内容有一个基本的了解。

* [TypeScript](https://www.typescriptlang.org/docs/home.html "The TypeScript language") and HTML5 programming.

  [TypeScript](https://www.typescriptlang.org/docs/home.html "TypeScript 语言") 和 HTML5 编程。

* Fundamental concepts of [Angular app design](guide/architecture "Introduction to Angular app-design concepts").

  [Angular 应用设计](guide/architecture "Angular 应用设计概念简介")的基本概念。

* Basic knowledge of [reactive forms](guide/reactive-forms "Reactive forms guide").

  [响应式表单](guide/reactive-forms "反应表单指南")的基础知识。

## Enable reactive forms for your project

## 为项目启用响应式表单

Dynamic forms are based on reactive forms. To give the application access reactive forms directives, the [root module](guide/bootstrapping "Learn about bootstrapping an app from the root module.") imports `ReactiveFormsModule` from the `@angular/forms` library.

动态表单是基于响应式表单的。为了让应用访问响应式表达式指令，[根模块会](guide/bootstrapping "要学习如何从根模块启动一个应用。")从 `@angular/forms` 库中导入 `ReactiveFormsModule`。

The following code from the example shows the setup in the root module.

以下代码展示了此范例在根模块中所做的设置。

<code-tabs>

  <code-pane header="app.module.ts" path="dynamic-form/src/app/app.module.ts">

  </code-pane>

  <code-pane header="main.ts" path="dynamic-form/src/main.ts">

  </code-pane>

</code-tabs>

{@a object-model}

## Create a form object model

## 创建一个表单对象模型

A dynamic form requires an object model that can describe all scenarios needed by the form functionality.
The example hero-application form is a set of questions&mdash;that is, each control in the form must ask a question and accept an answer.

动态表单需要一个对象模型来描述此表单功能所需的全部场景。英雄应用表单中的例子是一组问题 - 也就是说，表单中的每个控件都必须提问并接受一个答案。

The data model for this type of form must represent a question.
The example includes the `DynamicFormQuestionComponent`, which defines a  question as the fundamental object in the model.

此类表单的数据模型必须能表示一个问题。本例中包含 `DynamicFormQuestionComponent`，它定义了一个问题作为模型中的基本对象。

The following `QuestionBase` is a base class for a set of controls that can represent the question and its answer in the form.

这个 `QuestionBase` 是一组控件的基类，可以在表单中表示问题及其答案。

<code-example path="dynamic-form/src/app/question-base.ts" header="src/app/question-base.ts">

</code-example>

### Define control classes

### 定义控件类

From this base, the example derives two new classes, `TextboxQuestion` and `DropdownQuestion`,
that represent different control types.
When you create the form template in the next step, you will instantiate these specific question types in order to render the appropriate controls dynamically.

此范例从这个基类派生出两个新类，`TextboxQuestion` 和 `DropdownQuestion`，分别代表不同的控件类型。当你在下一步中创建表单模板时，你会实例化这些具体的问题类，以便动态渲染相应的控件。

* The `TextboxQuestion` control type presents a question and allows users to enter input.

  `TextboxQuestion` 控件类型表示一个普通问题，并允许用户输入答案。

   <code-example path="dynamic-form/src/app/question-textbox.ts" header="src/app/question-textbox.ts"></code-example>

   The `TextboxQuestion` control type will be represented in a form template using an `<input>` element.
   The `type` attribute of the element will be defined based on the `type` field specified in the `options` argument (for example `text`, `email`, `url`).

  `TextboxQuestion` 控件类型将使用 `<input>` 元素表示在表单模板中。该元素的 `type` 属性将根据 `options` 参数中指定的 `type` 字段定义（例如 `text`，`email`，`url` ）。

* The `DropdownQuestion` control presents a list of choices in a select box.

  `DropdownQuestion` 控件表示在选择框中的一个选项列表。

   <code-example path="dynamic-form/src/app/question-dropdown.ts" header="src/app/question-dropdown.ts"></code-example>

### Compose form groups

### 编写表单组

A dynamic form uses a service to create grouped sets of input controls, based on the form model.
The following `QuestionControlService` collects a set of `FormGroup` instances that consume the metadata from the question model. You can specify default values and validation rules.

动态表单会使用一个服务来根据表单模型创建输入控件的分组集合。下面的 `QuestionControlService` 会收集一组 `FormGroup` 实例，这些实例会消费问题模型中的元数据。你可以指定一些默认值和验证规则。

<code-example path="dynamic-form/src/app/question-control.service.ts" header="src/app/question-control.service.ts"></code-example>

{@a form-component}

## Compose dynamic form contents

## 编写动态表单内容

The dynamic form itself will be represented by a container component, which you will add in a later step.
Each question is represented in the form component's template by an `<app-question>` tag, which matches an instance of `DynamicFormQuestionComponent`.

动态表单本身就是一个容器组件，稍后你会添加它。每个问题都会在表单组件的模板中用一个 `<app-question>` 标签表示，该标签会匹配 `DynamicFormQuestionComponent` 中的一个实例。

The `DynamicFormQuestionComponent` is responsible for rendering the details of an individual question based on values in the data-bound question object.
The form relies on a [`[formGroup]` directive](api/forms/FormGroupDirective "API reference") to connect the template HTML to the underlying control objects.
The `DynamicFormQuestionComponent` creates form groups and populates them with controls defined in the question model, specifying display and validation rules.

`DynamicFormQuestionComponent` 负责根据数据绑定的问题对象中的各种值来渲染单个问题的详情。该表单依靠 [`[formGroup]` 指令](api/forms/FormGroupDirective "API 参考")来将模板 HTML 和底层的控件对象联系起来。`DynamicFormQuestionComponent` 会创建表单组，并用问题模型中定义的控件来填充它们，并指定显示和验证规则。

<code-tabs>

  <code-pane header="dynamic-form-question.component.html" path="dynamic-form/src/app/dynamic-form-question.component.html">

  </code-pane>

  <code-pane header="dynamic-form-question.component.ts" path="dynamic-form/src/app/dynamic-form-question.component.ts">

  </code-pane>

</code-tabs>

The goal of the `DynamicFormQuestionComponent` is to present question types defined in your model.
You only have two types of questions at this point but you can imagine many more.
The `ngSwitch` statement in the template determines which type of question to display.
The switch uses directives with the [`formControlName`](api/forms/FormControlName "FormControlName directive API reference") and [`formGroup`](api/forms/FormGroupDirective "FormGroupDirective API reference") selectors. Both directives are defined in `ReactiveFormsModule`.

`DynamicFormQuestionComponent` 的目标是展示模型中定义的各类问题。你现在只有两类问题，但可以想象将来还会有更多。模板中的 `ngSwitch` 语句会决定要显示哪种类型的问题。这里用到了带有 [`formControlName`](api/forms/FormControlName "FormControlName 指令的 API Reference 参考") 和[`formGroup`](api/forms/FormGroupDirective "FormGroupDirective API 参考指南") 选择器的指令。这两个指令都是在 `ReactiveFormsModule` 中定义的。

{@a questionnaire-data}

{@a surveyire-data}

### Supply data

### 提供数据

Another service is needed to supply a specific set of questions from which to build an individual form.
For this exercise you will create the `QuestionService` to supply this array of questions from the hard-coded sample data.
In a real-world app, the service might fetch data from a backend system.
The key point, however, is that you control the hero job-application questions entirely through the objects returned from `QuestionService`.
To maintain the questionnaire as requirements change, you only need to add, update, and remove objects from the `questions` array.

还要另外一项服务来提供一组具体的问题，以便构建出一个单独的表单。在本练习中，你将创建 `QuestionService` 以从硬编码的范例数据中提供这组问题。在真实世界的应用中，该服务可能会从后端获取数据。重点是，你可以完全通过 `QuestionService` 返回的对象来控制英雄的求职申请问卷。要想在需求发生变化时维护问卷，你只需要在 `questions` 数组中添加、更新和删除对象。

The `QuestionService` supplies a set of questions in the form of an array bound to `@Input()` questions.

`QuestionService` 以一个绑定到 `@Input()` 的问题数组的形式提供了一组问题。

<code-example path="dynamic-form/src/app/question.service.ts" header="src/app/question.service.ts">

</code-example>

{@a dynamic-template}

## Create a dynamic form template

## 创建一个动态表单模板

The `DynamicFormComponent` component is the entry point and the main container for the form, which is represented using the `<app-dynamic-form>` in a template.

`DynamicFormComponent` 组件是表单的入口点和主容器，它在模板中用 `<app-dynamic-form>` 表示。

The `DynamicFormComponent` component presents a list of questions by binding each one to an `<app-question>` element that matches the `DynamicFormQuestionComponent`.

`DynamicFormComponent` 组件通过把每个问题都绑定到一个匹配 `DynamicFormQuestionComponent` 的 `<app-question>` 元素来渲染问题列表。

<code-tabs>

  <code-pane header="dynamic-form.component.html" path="dynamic-form/src/app/dynamic-form.component.html">

  </code-pane>

  <code-pane header="dynamic-form.component.ts" path="dynamic-form/src/app/dynamic-form.component.ts">

  </code-pane>

</code-tabs>

### Display the form

### 显示表单

To display an instance of the dynamic form, the `AppComponent` shell template passes the `questions` array returned by the `QuestionService` to the form container component, `<app-dynamic-form>`.

要显示动态表单的一个实例，`AppComponent` 外壳模板会把一个 `QuestionService` 返回的 `questions` 数组传递给表单容器组件 `<app-dynamic-form>`。

<code-example path="dynamic-form/src/app/app.component.ts" header="app.component.ts">

</code-example>

The example provides a model for a job application for heroes, but there are
no references to any specific hero question other than the objects returned by `QuestionService`.
This separation of model and data allows you to repurpose the components for any type of survey
as long as it's compatible with the *question* object model.

这个例子为英雄提供了一个工作申请表的模型，但是除了 `QuestionService` 返回的对象外，没有涉及任何跟英雄有关的问题。这种模型和数据的分离，允许你为任何类型的调查表复用这些组件，只要它与这个*问题*对象模型兼容即可。

### Ensuring valid data

### 确保数据有效

The form template uses dynamic data binding of metadata to render the form
without making any hardcoded assumptions about specific questions.
It adds both control metadata and validation criteria dynamically.

表单模板使用元数据的动态数据绑定来渲染表单，而不用做任何与具体问题有关的硬编码。它动态添加了控件元数据和验证标准。

To ensure valid input, the *Save* button is disabled until the form is in a valid state.
When the form is valid, you can click *Save* and the app renders the current form values as JSON.

要确保输入有效，*就要*禁用 *“Save”* 按钮，直到此表单处于有效状态。当表单有效时，你可以单击 *“Save”* 按钮，该应用就会把表单的当前值渲染为 JSON。

The following figure shows the final form.

最终的表单如下图所示。

<div class="lightbox">
  <img src="generated/images/guide/dynamic-form/dynamic-form.png" alt="Dynamic-Form">
</div>

## Next steps

## 下一步

* **Different types of forms and control collection**

  **不同类型的表单和控件集合**

   This tutorial shows how to build a a questionaire, which is just one kind of dynamic form.
   The example uses `FormGroup` to collect a set of controls.
   For an example of a different type of dynamic form, see the section [Creating dynamic forms](guide/reactive-forms#creating-dynamic-forms "Create dynamic forms with arrays") in the Reactive Forms guide.
   That example also shows how to use `FormArray` instead of `FormGroup` to collect a set of controls.

  本教程展示了如何构建一个问卷，它只是一种动态表单。这个例子使用 `FormGroup` 来收集一组控件。有关不同类型动态表单的示例，请参阅在响应式表单中的[创建动态表单](guide/reactive-forms#creating-dynamic-forms "用数组创建动态表单")一节。那个例子还展示了如何使用 `FormArray` 而不是 `FormGroup` 来收集一组控件。

* **Validating user input**

  **验证用户输入**

   The section [Validating form input](guide/reactive-forms#validating-form-input "Basic input validation") introduces the basics of how input validation works in reactive forms.

  [验证表单输入](guide/reactive-forms#validating-form-input "基本输入验证")部分介绍了如何在响应式表单中进行输入验证的基础知识。

   The [Form validation guide](guide/form-validation "Form validation guide") covers the topic in more depth.

  [表单验证指南](guide/form-validation "表单验证指南")更深入地介绍了本主题。

