# Dynamic Forms

# 动态表单

{@a top}

Building handcrafted forms can be costly and time-consuming,
especially if you need a great number of them, they're similar to each other, and they change frequently
to meet rapidly changing business and regulatory requirements.

有时候手动编写和维护表单所需工作量和时间会过大。特别是在需要编写大量表单时。表单都很相似，而且随着业务和监管需求的迅速变化，表单也要随之变化，这样维护的成本过高。

It may be more economical to create the forms dynamically, based on
metadata that describes the business object model.

基于业务对象模型的元数据，动态创建表单可能会更划算。

This cookbook shows you how to use `formGroup` to dynamically
render a simple form with different control types and validation.
It's a primitive start.
It might evolve to support a much richer variety of questions, more graceful rendering, and superior user experience.
All such greatness has humble beginnings.

本文会展示如何利用 `formGroup` 来动态渲染一个简单的表单，包括各种控件类型和验证规则。
这个起点很简陋，但可以在这个基础上添加丰富多彩的问卷问题、更优美的渲染以及更卓越的用户体验。

The example in this cookbook is a dynamic form to build an
online application experience for heroes seeking employment.
The agency is constantly tinkering with the application process.
You can create the forms on the fly *without changing the application code*.

这个例子要为正在找工作的英雄们创建一个在线申请表的动态表单。英雄管理局会不断修改申请流程，你要在*不修改应用代码*的情况下，动态创建这些表单。

{@a toc}

See the <live-example name="dynamic-form"></live-example>.

参见<live-example name="dynamic-form"></live-example>。

{@a bootstrap}

## Bootstrap

## 启动/引导 (bootstrap)

Start by creating an `NgModule` called `AppModule`.

从创建一个名叫 `AppModule` 的 `NgModule` 开始。

This cookbook uses [reactive forms](guide/reactive-forms).

这个烹饪书使用[响应式表单](guide/reactive-forms)。

Reactive forms belongs to a different `NgModule` called `ReactiveFormsModule`,
so in order to access any reactive forms directives, you have to import
`ReactiveFormsModule` from the `@angular/forms` library.

响应式表单属于另外一个叫做 `ReactiveFormsModule` 的 `NgModule`，所以，为了使用响应式表单类的指令，你得从 `@angular/forms` 库中引入 `ReactiveFormsModule` 模块。

Bootstrap the `AppModule` in `main.ts`.

在 `main.ts` 中启动 `AppModule`。

<code-tabs>

  <code-pane title="app.module.ts" path="dynamic-form/src/app/app.module.ts">

  </code-pane>

  <code-pane title="main.ts" path="dynamic-form/src/main.ts">

  </code-pane>

</code-tabs>

{@a object-model}

## Question model

## 问卷问题模型

The next step is to define an object model that can describe all scenarios needed by the form functionality.
The hero application process involves a form with a lot of questions.
The _question_ is the most fundamental object in the model.

第一步是定义一个对象模型，用来描述所有表单功能需要的场景。英雄的申请流程涉及到一个包含很多问卷问题的表单。问卷问题是最基础的对象模型。

The following `QuestionBase` is a fundamental question class.

下面的 `QuestionBase` 是最基础的问卷问题基类。

<code-example path="dynamic-form/src/app/question-base.ts" title="src/app/question-base.ts">

</code-example>

From this base you can derive two new classes in `TextboxQuestion` and `DropdownQuestion`
that represent textbox and dropdown questions.
The idea is that the form will be bound to specific question types and render the
appropriate controls dynamically.

在这个基础上，你派生出两个新类 `TextboxQuestion` 和 `DropdownQuestion`，分别代表文本框和下拉框。这么做的初衷是，表单能动态绑定到特定的问卷问题类型，并动态渲染出合适的控件。

`TextboxQuestion` supports multiple HTML5 types such as text, email, and url
via the `type` property.

`TextboxQuestion` 可以通过 `type` 属性来支持多种 HTML5 元素类型，比如文本、邮件、网址等。

<code-example path="dynamic-form/src/app/question-textbox.ts" title="src/app/question-textbox.ts" linenums="false">

</code-example>

`DropdownQuestion` presents a list of choices in a select box.

`DropdownQuestion` 表示一个带可选项列表的选择框。

<code-example path="dynamic-form/src/app/question-dropdown.ts" title="src/app/question-dropdown.ts" linenums="false">

</code-example>

Next is `QuestionControlService`, a simple service for transforming the questions to a `FormGroup`.
In a nutshell, the form group consumes the metadata from the question model and
allows you to specify default values and validation rules.

接下来定义了 `QuestionControlService`，一个可以把问卷问题转换为 `FormGroup` 的服务。
简而言之，这个 `FormGroup` 使用问卷模型的元数据，并允许你指定默认值和验证规则。

<code-example path="dynamic-form/src/app/question-control.service.ts" title="src/app/question-control.service.ts" linenums="false">

</code-example>

{@a form-component}

## Question form components

## 问卷表单组件

Now that you have defined the complete model you are ready
to create components to represent the dynamic form.

现在你已经有一个定义好的完整模型了，接着就可以开始创建一个展现动态表单的组件。

`DynamicFormComponent` is the entry point and the main container for the form.

`DynamicFormComponent` 是表单的主要容器和入口点。

<code-tabs>

  <code-pane title="dynamic-form.component.html" path="dynamic-form/src/app/dynamic-form.component.html">

  </code-pane>

  <code-pane title="dynamic-form.component.ts" path="dynamic-form/src/app/dynamic-form.component.ts">

  </code-pane>

</code-tabs>

It presents a list of questions, each bound to a `<app-question>` component element.
The `<app-question>` tag matches the `DynamicFormQuestionComponent`,
the component responsible for rendering the details of each _individual_
question based on values in the data-bound question object.

它代表了问卷问题列表，每个问题都被绑定到一个 `<app-question>` 组件元素。
`<app-question>` 标签匹配到的是组件 `DynamicFormQuestionComponent`，该组件的职责是根据各个问卷问题对象的值来动态渲染表单控件。

<code-tabs>

  <code-pane title="dynamic-form-question.component.html" path="dynamic-form/src/app/dynamic-form-question.component.html">

  </code-pane>

  <code-pane title="dynamic-form-question.component.ts" path="dynamic-form/src/app/dynamic-form-question.component.ts">

  </code-pane>

</code-tabs>

Notice this component can present any type of question in your model.
You only have two types of questions at this point but you can imagine many more.
The `ngSwitch` determines which type of question to display.

请注意，这个组件能代表模型里的任何问题类型。目前，还只有两种问题类型，但可以添加更多类型。可以用 `ngSwitch` 决定显示哪种类型的问题。

In both components  you're relying on Angular's **formGroup** to connect the template HTML to the
underlying control objects, populated from the question model with display and validation rules.

在这两个组件中，你依赖 Angular 的 **formGroup** 来把模板 HTML 和底层控件对象连接起来，该对象从问卷问题模型里获取渲染和验证规则。

`formControlName` and `formGroup` are directives defined in
`ReactiveFormsModule`. The templates can access these directives
directly since you imported `ReactiveFormsModule` from `AppModule`.

`formControlName` 和 `formGroup` 是在 `ReactiveFormsModule` 中定义的指令。这个模板之所以能使用它们，是因为你曾从 `AppModule` 中导入了 `ReactiveFormsModule`。

{@a questionnaire-data}

## Questionnaire data

## 问卷数据

`DynamicFormComponent` expects the list of questions in the form of an array bound to `@Input() questions`.

`DynamicForm` 期望得到一个问题列表，该列表被绑定到 `@Input() questions` 属性。

 The set of questions you've defined for the job application is returned from the `QuestionService`.
 In a real app you'd retrieve these questions from storage.

 `QuestionService` 会返回为工作申请表定义的那组问题列表。在真实的应用程序环境中，你会从数据库里获得这些问题列表。

 The key point is that you control the hero job application questions
 entirely through the objects returned from `QuestionService`.
 Questionnaire maintenance is a simple matter of adding, updating,
 and removing objects from the `questions` array.

 关键是，你完全根据 `QuestionService` 返回的对象来控制英雄的工作申请表。
 要维护这份问卷，只要非常简单的添加、修改和删除 `questions` 数组中的对象就可以了。

<code-example path="dynamic-form/src/app/question.service.ts" title="src/app/question.service.ts">

</code-example>

Finally, display an instance of the form in the `AppComponent` shell.

最后，在 `AppComponent` 里显示出表单。

<code-example path="dynamic-form/src/app/app.component.ts" title="app.component.ts">

</code-example>

{@a dynamic-template}

## Dynamic Template

## 动态模板

Although in this example you're modelling a job application for heroes, there are
no references to any specific hero question
outside the objects returned by `QuestionService`.

在这个例子中，虽然你是在为英雄的工作申请表建模，但是除了 `QuestionService` 返回的那些对象外，没有其它任何地方是与英雄有关的。

This is very important since it allows you to repurpose the components for any type of survey
as long as it's compatible with the *question* object model.
The key is the dynamic data binding of metadata used to render the form
without making any hardcoded assumptions about specific questions.
In addition to control metadata, you are also adding validation dynamically.

这点非常重要，因为只要与*问卷*对象模型兼容，就可以在任何类型的调查问卷中复用这些组件。
这里的关键是用到元数据的动态数据绑定来渲染表单，对问卷问题没有任何硬性的假设。除控件的元数据外，还可以动态添加验证规则。

The *Save* button is disabled until the form is in a valid state.
When the form is valid, you can click *Save* and the app renders the current form values as JSON.
This proves that any user input is bound back to the data model.
Saving and retrieving the data is an exercise for another time.

表单验证通过之前，*保存*按钮是禁用的。验证通过后，就可以点击*保存*按钮，程序会把当前值渲染成 JSON 显示出来。
这表明任何用户输入都被传到了数据模型里。至于如何储存和提取数据则是另一话题了。

The final form looks like this:

完整的表单是这样的：

<figure>
  <img src="generated/images/guide/dynamic-form/dynamic-form.png" alt="Dynamic-Form">
</figure>

[Back to top](guide/dynamic-form#top)

[回到顶部](guide/dynamic-form#top)
