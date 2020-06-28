# Introduction to forms in Angular

# Angular 表单简介

Handling user input with forms is the cornerstone of many common applications. Applications use forms to enable users to log in, to update a profile, to enter sensitive information, and to perform many other data-entry tasks.

用表单处理用户输入是许多常见应用的基础功能。
应用通过表单来让用户登录、修改个人档案、输入敏感信息以及执行各种数据输入任务。

Angular provides two different approaches to handling user input through forms: reactive and template-driven. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

Angular 提供了两种不同的方法来通过表单处理用户输入：响应式表单和模板驱动表单。
两者都从视图中捕获用户输入事件、验证用户输入、创建表单模型、修改数据模型，并提供跟踪这些更改的途径。

This guide provides information to help you decide which type of form works best for your situation. It introduces the common building blocks used by both approaches. It also summarizes the key differences between the two approaches, and demonstrates those differences in the context of setup, data flow, and testing.

本指南提供的信息可以帮你确定哪种方式最适合你的情况。它介绍了这两种方法所用的公共构造块，还总结了两种方式之间的关键区别，并在建立、数据流和测试等不同的情境下展示了这些差异。

## Prerequisites

## 先决条件

This guide assumes that you have a basic understanding of the following.

本指南假设您对以下内容有基本的了解。

* [TypeScript](https://www.typescriptlang.org/docs/home.html "The TypeScript language") and HTML5 programming.

  [TypeScript](https://www.typescriptlang.org/docs/home.html "TypeScript 语言")和 HTML5 编程。

* Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture "Introduction to Angular concepts.").

  Angular 的应用设计基础，就像[Angular Concepts 中](guide/architecture "Angular 概念简介。")描述的那样。

* The basics of [Angular template syntax](guide/architecture-components#template-syntax "Template syntax intro").

  [Angular 模板语法](guide/architecture-components#template-syntax "模板语法简介")的基础知识。

## Choosing an approach

## 选择一种方法

Reactive forms and template-driven forms process and manage form data differently. Each approach offers different advantages.

响应式表单和模板驱动表单以不同的方式处理和管理表单数据。每种方法都有各自的优点。

* **Reactive forms** provide direct, explicit access to the underlying forms object model. Compared to template-driven forms, they are more robust: they're more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.

  **响应式表单**提供对底层表单对象模型直接、显式的访问。它们与模板驱动表单相比，更加健壮：它们的可扩展性、可复用性和可测试性都更高。如果表单是你的应用程序的关键部分，或者你已经在使用响应式表单来构建应用，那就使用响应式表单。

* **Template-driven forms** rely on directives in the template to create and manipulate the underlying object model. They are useful for adding a simple form to an app, such as an email list signup form. They're easy to add to an app, but they don't scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, template-driven forms could be a good fit.

  **模板驱动表单**依赖**模板中的**指令来创建和操作底层的对象模型。它们对于向应用添加一个简单的表单非常有用，比如电子邮件列表注册表单。它们很容易添加到应用中，但在扩展性方面不如响应式表单。如果你有可以只在模板中管理的非常基本的表单需求和逻辑，那么模板驱动表单就很合适。

### Key differences

### 关键差异

The table below summarizes the key differences between reactive and template-driven forms.

下表总结了响应式表单和模板驱动表单之间的一些关键差异。

<style>
  table {width: 100%};
  td, th {vertical-align: top};
</style>

|  | Reactive | Template-driven |
| --- | -------- | --------------- |
|  | 响应式 | 模板驱动 |
| [Setup of form model](#setup) | Explicit, created in component class | Implicit, created by directives |
| [建立表单模型](#setup) | 显式的，在组件类中创建 | 隐式的，由指令创建 |
| [Data model](#data-flow-in-forms) | Structured and immutable | Unstructured and mutable |
| [数据模型](#data-flow-in-forms) | 结构化和不可变的 | 非结构化和可变的 |
| Predictability | Synchronous | Asynchronous |
| 可预测性 | 同步 | 异步 |
| [Form validation](#validation) | Functions | Directives |
| [表单验证](#validation) | 函数 | 指令 |

### Scalability

### 可伸缩性

If forms are a central part of your application, scalability is very important. Being able to reuse form models across components is critical.

如果表单是应用程序的核心部分，那么可伸缩性就非常重要。能够跨组件复用表单模型是至关重要的。

Reactive forms are more scalable than template-driven forms. They provide direct access to the underlying form API, and synchronous access to the form data model, making creating large-scale forms easier.
Reactive forms require less setup for testing, and testing does not require deep understanding of change detection to properly test form updates and validation.

响应式表单比模板驱动表单更有可伸缩性。它们提供对底层表单 API 的直接访问，以及对表单数据模型的同步访问，从而可以更轻松地创建大型表单。响应式表单需要较少的测试设置，测试时不需要深入理解变更检测，就能正确测试表单更新和验证。

Template-driven forms focus on simple scenarios and are not as reusable.
They abstract away the underlying form API, and provide only asynchronous access to the form data model.
The abstraction of template-driven forms also affects testing.
Tests are deeply reliant on manual change detection execution to run properly, and require more setup.

模板驱动表单专注于简单的场景，可复用性没那么高。它们抽象出了底层表单 API，并且只提供对表单数据模型的异步访问。对模板驱动表单的这种抽象也会影响测试。测试程序非常依赖于手动触发变更检测才能正常运行，并且需要进行更多设置工作。


{@a setup}

## Setting up the form model

## 建立表单模型


Both reactive and template-driven forms track value changes between the form input elements that users interact with and the form data in your component model.
The two approaches share underlying building blocks, but differ in how you create and manage the common form-control instances.

响应式表单和模板驱动型表单都会跟踪用户与之交互的表单输入元素和组件模型中的表单数据之间的值变更。这两种方法共享同一套底层构建块，只在如何创建和管理常用表单控件实例方面有所不同。

### Common form foundation classes

### 常用表单基础类


Both reactive and template-driven forms are built on the following base classes.

响应式表单和模板驱动表单都建立在下列基础类之上。


* `FormControl` tracks the value and validation status of an individual form control.

  `FormControl` 实例用于追踪单个表单控件的值和验证状态。

* `FormGroup` tracks the same values and status for a collection of form controls.

    `FormGroup` 用于追踪一个表单控件组的值和状态。

* `FormArray` tracks the same values and status for an array of form controls.

    `FormArray` 用于追踪表单控件数组的值和状态。

* `ControlValueAccessor` creates a bridge between Angular `FormControl` instances and native DOM elements.

  `ControlValueAccessor` 用于在 Angular 的 `FormControl` 实例和原生 DOM 元素之间创建一个桥梁。

{@a setup-the-form-model}

### Setup in reactive forms

### 建立响应式表单

With reactive forms, you define the form model directly in the component class.
The `[formControl]` directive links the explicitly created `FormControl` instance to a specific form element in the view, using an internal value accessor.

对于响应式表单，你可以直接在组件类中定义表单模型。`[formControl]` 指令会通过内部值访问器来把显式创建的 `FormControl` 实例与视图中的特定表单元素联系起来。

The following component implements an input field for a single control, using reactive forms. In this example, the form model is the `FormControl` instance.

下面的组件使用响应式表单为单个控件实现了一个输入字段。在这个例子中，表单模型是 `FormControl` 实例。

<code-example path="forms-overview/src/app/reactive/favorite-color/favorite-color.component.ts">
</code-example>

Figure 1 shows how, in reactive forms, the form model is the source of truth; it provides the value and status of the form element at any given point in time, through the `[formControl]` directive on the input element.

图 1 展示了在响应式表单中，表单模型是如何成为事实之源（source of truth）的。它通过输入元素上的 `[formControl]` 指令，在任何给定的时间点提供表单元素的值和状态。

**Figure 1.** *Direct access to forms model in a reactive form.*

**图 1.** *在响应式表单中直接访问表单模型*


<div class="lightbox">
  <img src="generated/images/guide/forms-overview/key-diff-reactive-forms.png" alt="Reactive forms key differences">
</div>

### Setup in template-driven forms

### 建立模板驱动表单

In template-driven forms, the form model is implicit, rather than explicit. The directive `NgModel` creates and manages a `FormControl` instance for a given form element.

在模板驱动表单中，表单模型是隐式的，而不是显式的。指令 `NgModel` 为指定的表单元素创建并管理一个 `FormControl` 实例。

The following component implements the same input field for a single control, using template-driven forms.

下面的组件使用模板驱动表单为单个控件实现了同样的输入字段。

<code-example path="forms-overview/src/app/template/favorite-color/favorite-color.component.ts">
</code-example>

In a template-driven form the source of truth is the template. You do not have direct programmatic access to the `FormControl` instance, as shown in Figure 2.

在模板驱动表单中，其事实之源就是模板。你没有对 `FormControl` 实例的直接编程访问，如图 2 所示。

**Figure 2.** *Indirect access to forms model in a template-driven form.*

**图 2.** *模板驱动表单中对表单模型的间接访问。*


<div class="lightbox">
  <img src="generated/images/guide/forms-overview/key-diff-td-forms.png" alt="Template-driven forms key differences">
</div>

{@a data-flow-in-forms}


## Data flow in forms

## 表单中的数据流

When an application contains a form, Angular must keep the view in sync with the component model and the component model in sync with the view.
As users change values and make selections through the view, the new values must be reflected in the data model.
Similarly, when the program logic changes values in the data model, those values must be reflected in the view.

当应用包含一个表单时，Angular 必须让该视图与组件模型保持同步，并让组件模型与视图保持同步。当用户通过视图更改值并进行选择时，新值必须反映在数据模型中。同样，当程序逻辑改变数据模型中的值时，这些值也必须反映到视图中。

Reactive and template-driven forms differ in how they handle data flowing from the user or from programmatic changes.
The following diagrams illustrate both kinds of data flow for each type of form, using the a favorite-color input field defined above.

响应式表单和模板驱动表单在处理来自用户或程序化变更时的数据处理方式上有所不同。下面的这些示意图会以上面定义的 `favorite-color` 输入字段为例，分别说明两种表单各自的数据流。

### Data flow in reactive forms

### 响应式表单中的数据流

In reactive forms each form element in the view is directly linked to the form model (a `FormControl` instance). Updates from the view to the model and from the model to the view are synchronous and do not depend on how the UI is rendered.

在响应式表单中，视图中的每个表单元素都直接链接到一个表单模型（`FormControl` 实例）。
        从视图到模型的修改以及从模型到视图的修改都是同步的，而且不依赖于 UI 的渲染方式。

The view-to-model diagram shows how data flows when an input field's value is changed from the view through the following steps.

这个视图到模型的示意图展示了当输入字段的值发生变化时数据是如何从视图开始，经过下列步骤进行流动的。

1. The user types a value into the input element, in this case the favorite color *Blue*.

   最终用户在输入框元素中键入了一个值，这里是 "Blue"。

1. The form input element emits an "input" event with the latest value.

   这个输入框元素会发出一个带有最新值的 "input" 事件。

1. The control value accessor listening for events on the form input element immediately relays the new value to the `FormControl` instance.

   这个控件值访问器 `ControlValueAccessor` 会监听表单输入框元素上的事件，并立即把新值传给 `FormControl` 实例。

1. The `FormControl` instance emits the new value through the `valueChanges` observable.

   `FormControl` 实例会通过 `valueChanges` 这个可观察对象发出这个新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何一个订阅者都会收到这个新值。

<div class="lightbox">
  <img src="generated/images/guide/forms-overview/dataflow-reactive-forms-vtm.png" alt="Reactive forms data flow - view to model">
</div>

The model-to-view diagram shows how a programmatic change to the model is propagated to the view through the following steps.

这个模型到视图的示意图体现了程序中对模型的修改是如何通过下列步骤传播到视图中的。

1. The user calls the `favoriteColorControl.setValue()` method, which updates the `FormControl` value.

   `favoriteColorControl.setValue()` 方法被调用，它会更新这个 `FormControl` 的值。

1. The `FormControl` instance emits the new value through the `valueChanges` observable.

   `FormControl` 实例会通过 `valueChanges` 这个可观察对象发出新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何订阅者都会收到这个新值。

1. The control value accessor on the form input element updates the element with the new value.

   该表单输入框元素上的控件值访问器会把控件更新为这个新值。

<div class="lightbox">
  <img src="generated/images/guide/forms-overview/dataflow-reactive-forms-mtv.png" alt="Reactive forms data flow - model to view">
</div>

### Data flow in template-driven forms

### 模板驱动表单中的数据流

In template-driven forms, each form element is linked to a directive that manages the form model internally.

在模板驱动表单中，每一个表单元素都是和一个负责管理内部表单模型的指令关联起来的。

The view-to-model diagram shows how data flows when an input field's value is changed from the view through the following steps.

这个视图到模型的图表展示了当输入字段的值发生变化时，数据流是如何从视图开始经过下列步骤进行流动的。

1. The user types *Blue* into the input element.

   最终用户在输入框元素中敲 "Blue"。

1. The input element emits an "input" event with the value *Blue*.

   该输入框元素会发出一个 "input" 事件，带着值 "Blue"。
1. The control value accessor attached to the input triggers the `setValue()` method on the `FormControl` instance.

   附着在该输入框上的控件值访问器会触发 `FormControl` 实例上的 `setValue()` 方法。

1. The `FormControl` instance emits the new value through the `valueChanges` observable.

   `FormControl` 实例通过 `valueChanges` 这个可观察对象发出新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何订阅者都会收到新值。

1. The control value accessor also calls the `NgModel.viewToModelUpdate()` method which emits an `ngModelChange` event.

   控件值访问器 `ControlValueAccessory` 还会调用 `NgModel.viewToModelUpdate()` 方法，它会发出一个 `ngModelChange` 事件。

1. Because the component template uses two-way data binding for the `favoriteColor` property, the `favoriteColor` property in the component
is updated to the value emitted by the `ngModelChange` event (*Blue*).

   由于该组件模板双向数据绑定到了 `favoriteColor`，组件中的 `favoriteColor` 属性就会修改为 `ngModelChange` 事件所发出的值（"Blue"）。

<div class="lightbox">
  <img src="generated/images/guide/forms-overview/dataflow-td-forms-vtm.png" alt="Template-driven forms data flow - view to model" width="100%">
</div>

The model-to-view diagram shows how data flows from model to view when the `favoriteColor` changes from *Blue* to *Red*, through the following steps

这个模型到视图的示意图展示了当 `favoriteColor` 从*蓝*变到*红*时，数据是如何经过如下步骤从模型流动到视图的。

1. The `favoriteColor` value is updated in the component.

   组件中修改了 `favoriteColor` 的值。

1. Change detection begins.

   变更检测开始。

1. During change detection, the `ngOnChanges` lifecycle hook is called on the `NgModel` directive instance because the value of one of its inputs has changed.

   在变更检测期间，由于这些输入框之一的值发生了变化，Angular 就会调用 `NgModel` 指令上的 `ngOnChanges` 生命周期钩子。

1. The `ngOnChanges()` method queues an async task to set the value for the internal `FormControl` instance.

   `ngOnChanges()` 方法会把一个异步任务排入队列，以设置内部 `FormControl` 实例的值。

1. Change detection completes.

   变更检测完成。

1. On the next tick, the task to set the `FormControl` instance value is executed.

   在下一个检测周期，用来为 `FormControl` 实例赋值的任务就会执行。

1. The `FormControl` instance emits the latest value through the `valueChanges` observable.

   `FormControl` 实例通过可观察对象 `valueChanges` 发出最新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何订阅者都会收到这个新值。

1. The control value accessor updates the form input element in the view with the latest `favoriteColor` value.

   控件值访问器 `ControlValueAccessor` 会使用 `favoriteColor` 的最新值来修改表单的输入框元素。

<div class="lightbox">
  <img src="generated/images/guide/forms-overview/dataflow-td-forms-mtv.png" alt="Template-driven forms data flow - model to view" width="100%">
</div>

### Mutability of the data model

### 数据模型的可变性

The change-tracking method plays a role in the efficiency of your application.

变更追踪的方法对应用的效率有着重要影响。

* **Reactive forms** keep the data model pure by providing it as an immutable data structure.
Each time a change is triggered on the data model, the `FormControl` instance returns a new data model rather than updating the existing data model.
This gives you the ability to track unique changes to the data model through the control's observable.
Change detection is more efficient because it only needs to update on unique changes.
Because data updates follow reactive patterns, you can integrate with observable operators to transform data.

  **响应式表单**通过以不可变的数据结构提供数据模型，来保持数据模型的纯粹性。每当在数据模型上触发更改时，`FormControl` 实例都会返回一个新的数据模型，而不会更新现有的数据模型。这使你能够通过该控件的可观察对象跟踪对数据模型的唯一更改。这让变更检测更有效率，因为它只需在唯一性更改（译注：也就是对象引用发生变化）时进行更新。由于数据更新遵循响应式模式，因此你可以把它和可观察对象的各种运算符集成起来以转换数据。

* **Template-driven** forms rely on mutability with two-way data binding to update the data model in the component as changes are made in the template.
Because there are no unique changes to track on the data model when using two-way data binding, change detection is less efficient at determining when updates are required.

  **模板驱动的**表单依赖于可变性和双向数据绑定，可以在模板中做出更改时更新组件中的数据模型。由于使用双向数据绑定时没有用来对数据模型进行跟踪的唯一性更改，因此变更检测在需要确定何时更新时效率较低。

The difference is demonstrated in the previous examples that use the favorite-color input element.

前面那些使用 `favorite-color` 输入元素的例子就演示了这种差异。

* With reactive forms, the **`FormControl` instance** always returns a new value when the control's value is updated.

  对于响应式表单，当控件值更新时，**`FormControl` 的实例**总会返回一个新值。

* With template-driven forms, the **favorite color property** is always modified to its new value.

  对于模板驱动的表单，**`favorite-color` 属性**总会被修改为新值。

{@a validation}
## Form validation

## 表单验证

Validation is an integral part of managing any set of forms. Whether you're checking for required fields or querying an external API for an existing username, Angular provides a set of built-in validators as well as the ability to create custom validators.

验证是管理任何表单时必备的一部分。无论你是要检查必填项，还是查询外部 API 来检查用户名是否已存在，Angular 都会提供一组内置的验证器，以及创建自定义验证器所需的能力。

* **Reactive forms** define custom validators as **functions** that receive a control to validate.

  **响应式表单**把自定义验证器定义成**函数**，它以要验证的控件作为参数。

* **Template-driven forms** are tied to template **directives**, and must provide custom validator directives that wrap validation functions.

  **模板驱动表单**和模板**指令**紧密相关，并且必须提供包装了验证函数的自定义验证器指令。

For more information, see [Form Validation](guide/form-validation).

要了解验证器的更多知识，参见[表单验证](guide/form-validation)。

## Testing

## 测试

Testing plays a large part in complex applications. A simpler testing strategy is useful when validating that your forms function correctly.
Reactive forms and template-driven forms have different levels of reliance on rendering the UI to perform assertions based on form control and form field changes.
The following examples demonstrate the process of testing forms with reactive and template-driven forms.

测试在复杂的应用程序中也起着重要的作用。当验证你的表单功能是否正确时，更简单的测试策略往往也更有用。测试响应式表单和模板驱动表单的差别之一在于它们是否需要渲染 UI 才能基于表单控件和表单字段变化来执行断言。下面的例子演示了使用响应式表单和模板驱动表单时表单的测试过程。

### Testing reactive forms

### 测试响应式表单

Reactive forms provide a relatively easy testing strategy because they provide synchronous access to the form and data models, and they can be tested without rendering the UI.
In these tests, status and data are queried and manipulated through the control without interacting with the change detection cycle.

响应式表单提供了相对简单的测试策略，因为它们能提供对表单和数据模型的同步访问，而且不必渲染 UI 就能测试它们。在这些测试中，控件和数据是通过控件进行查询和操纵的，不需要和变更检测周期打交道。

The following tests use the favorite-color components from previous examples to verify the view-to-model and model-to-view data flows for a reactive form.

下面的测试利用前面例子中的 "喜欢的颜色" 组件来验证响应式表单中的 "从视图到模型" 和 "从模型到视图" 数据流。

**Verifying view-to-model data flow**

**验证“从视图到模型”的数据流**

The first example performs the following steps to verify the view-to-model data flow.

第一个例子执行了下列步骤来验证“从视图到模型”数据流。

1. Query the view for the form input element, and create a custom "input" event for the test.

   查询表单输入框元素的视图，并为测试创建自定义的 "input" 事件

1. Set the new value for the input to *Red*, and dispatch the "input" event on the form input element.

   把输入的新值设置为 *Red*，并在表单输入元素上调度 "input" 事件。

1. Assert that the component's `favoriteColorControl` value matches the value from the input.

   断言该组件的 `favoriteColorControl` 的值与来自输入框的值是匹配的。

<code-example path="forms-overview/src/app/reactive/favorite-color/favorite-color.component.spec.ts" region="view-to-model" header="Favorite color test - view to model">
</code-example>

The next example performs the following steps to verify the model-to-view data flow.

下一个例子执行了下列步骤来验证“从模型到视图”数据流。

1. Use the `favoriteColorControl`, a `FormControl` instance, to set the new value.

   使用 `favoriteColorControl` 这个 `FormControl` 实例来设置新值。

1. Query the view for the form input element.

   查询表单中输入框的视图。

1. Assert that the new value set on the control matches the value in the input.

   断言控件上设置的新值与输入中的值是匹配的。

<code-example path="forms-overview/src/app/reactive/favorite-color/favorite-color.component.spec.ts" region="model-to-view" header="Favorite color test - model to view">
</code-example>

### Testing template-driven forms

### 测试模板驱动表单

Writing tests with template-driven forms requires a detailed knowledge of the change detection process and an understanding of how directives run on each cycle to ensure that elements are queried, tested, or changed at the correct time.

使用模板驱动表单编写测试就需要详细了解变更检测过程，以及指令在每个变更检测周期中如何运行，以确保在正确的时间查询、测试或更改元素。

The following tests use the favorite color components mentioned earlier to verify the data flows from view to model and model to view for a template-driven form.

下面的测试使用了以前的 "喜欢的颜色" 组件，来验证模板驱动表单的 "从视图到模型" 和 "从模型到视图" 数据流。

The following test verifies the data flow from view to model.

下面的测试验证了 "从视图到模型" 数据流：

<code-example path="forms-overview/src/app/template/favorite-color/favorite-color.component.spec.ts" region="view-to-model" header="Favorite color test - view to model">
</code-example>

Here are the steps performed in the view to model test.

这个 "视图到模型" 测试的执行步骤如下：

1. Query the view for the form input element, and create a custom "input" event for the test.

   查询表单输入元素中的视图，并为测试创建自定义 "input" 事件。

1. Set the new value for the input to *Red*, and dispatch the "input" event on the form input element.

   把输入框的新值设置为 *Red*，并在表单输入框元素上派发 "input" 事件。
1. Run change detection through the test fixture.

   通过测试夹具（Fixture）来运行变更检测。

1. Assert that the component `favoriteColor` property value matches the value from the input.

   断言该组件 `favoriteColor` 属性的值与来自输入框的值是匹配的。

The following test verifies the data flow from model to view.

下面的测试验证了 "从模型到视图" 的数据流：

<code-example path="forms-overview/src/app/template/favorite-color/favorite-color.component.spec.ts" region="model-to-view" header="Favorite color test - model to view">
</code-example>

Here are the steps performed in the model to view test.

这个 "模型到视图" 测试的执行步骤如下：

1. Use the component instance to set the value of the `favoriteColor` property.

   使用组件实例来设置 `favoriteColor` 的值。
1. Run change detection through the test fixture.

   通过测试夹具（Fixture）来运行变更检测。

1. Use the `tick()` method to simulate the passage of time within the `fakeAsync()` task.

   在 `fakeAsync()` 任务中使用 `tick()` 方法来模拟时间的流逝。
1. Query the view for the form input element.

   查询表单输入框元素的视图。

1. Assert that the input value matches the value of the `favoriteColor` property in the component instance.

   断言输入框的值与该组件实例的 `favoriteColor` 属性值是匹配的。


## Next steps

## 后续步骤

To learn more about reactive forms, see the following guides:

要进一步了解响应式表单，参见下列章节：

* [Reactive forms](guide/reactive-forms)

  [响应式表单](guide/reactive-forms)

* [Form validation](guide/form-validation#reactive-form-validation)

  [表单验证](guide/form-validation#reactive-form-validation)

* [Dynamic forms](guide/dynamic-form)

  [动态表单](guide/dynamic-form)

To learn more about template-driven forms, see the following guides:

要进一步了解模板驱动表单，参见下列章节：

* [Building a template-driven form](guide/forms) tutorial

  [构建模板驱动表单](guide/forms)教程

* [Form validation](guide/form-validation#template-driven-validation)

  [表单验证](guide/form-validation#template-driven-validation)

* `NgForm` directive API reference

  `NgForm` 指令 API 参考手册

