# Introduction to forms in Angular

# Angular 表单检测

Handling user input with forms is the cornerstone of many common applications. Applications use forms to enable users log in, to update a profile, to enter sensitive information, and to perform many other data-entry tasks. 

用表单处理用户输入是许多常见应用的基础功能。
应用通过表单来让用户登录、修改个人档案、输入敏感信息以及执行各种数据输入任务。

Angular provides two different approaches to handling user input through forms: reactive and template-driven. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes. 

Angular 提供了两种不同的方法来通过表单处理用户输入：响应式表单和模板驱动表单。
两者都从视图中捕获用户输入事件、验证用户输入、创建表单模型、修改数据模型，并提供跟踪这些更改的途径。

Reactive and template-driven forms differ, however, in how they do the work of processing and managing forms and form data. Each offers different advantages.

不过，响应式表单和模板驱动表单在如何处理和管理表单和表单数据方面有所不同。各有优势。

**In general:**

**一般来说：**

* **Reactive forms** are more robust: they are more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.

  **响应式表单**更健壮：它们的可扩展性、可复用性和可测试性更强。
  如果表单是应用中的关键部分，或者你已经准备使用响应式编程模式来构建应用，请使用响应式表单。

* **Template-driven forms** are useful for adding a simple form to an app, such as an email list signup form. They are easy to add to an app, but they do not scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, use template-driven forms.

  **模板驱动表单**在往应用中添加简单的表单时非常有用，比如邮件列表的登记表单。它们很容易添加到应用中，但是不像响应式表单那么容易扩展。如果你有非常基本的表单需求和简单到能用模板管理的逻辑，请使用模板驱动表单。

This guide provides information to help you decide which approach works best for your situation. It introduces the common building blocks used by both approaches. It also summarizes the key differences between the two approaches, and demonstrates those differences in the context of setup, data flow, and testing.

本指南提供的信息可以帮你确定哪种方式最适合你的情况。它介绍了这两种方法所用的公共构造块，还总结了两种方式之间的关键区别，并在建立、数据流和测试等不同的情境下展示了这些差异。

<div class="alert is-important">

*Note:* For complete information about each kind of form, see the [Reactive Forms](guide/reactive-forms) and [Template-driven Forms](guide/forms) guides.

**注意：**要了解这些表单的详情，参见[响应式表单](guide/reactive-forms)和[模板驱动表单](guide/forms)。

</div>

## Key differences

## 关键差异

The table below summarizes the key differences between reactive and template-driven forms.

下表总结了响应式表单和模板驱动表单之间的一些关键差异。

<style>
  table {width: 100%};
  td, th {vertical-align: top};
</style>

||<t>Reactive</t><t>响应式</t>|<t>Template-driven</t><t>模板驱动</t>|
|--- |--- |--- |
|<t>Setup (form model)</t><t>建立（表单模式）</t>|<t>More explicit, created in the component class.</t><t>显式，在组件类中创建。</t>|<t>Less explicit, created by the directives.</t><t>隐式，由组件创建。</t>|
|<t>Data model</t><t>数据模式</t>|<t>Structured</t><t>结构化</t>|<t>Unstructured</t><t>非结构化</t>|
|<t>Predictability</t><t>可预测性</t>|<t>Synchronous</t><t>同步</t>|<t>Asynchronous</t><t>异步</t>|
|<t>Form validation</t><t>表单验证</t>|<t>Functions</t><t>函数</t>|<t>Directives</t><t>指令</t>|
|<t>Mutability</t><t>可变性</t>|<t>Immutable</t><t>不可变</t>|<t>Mutable</t><t>可变</t>|
|<t>Scalability</t><t>可伸缩性</t>|<t>Low-level API access</t><t>访问底层 API</t>|<t>Abstraction on top of APIs</t><t>在 API 之上的抽象</t>|

## Common foundation

## 共同基础

Both reactive and template-driven forms share underlying building blocks. 

无论响应式表单还是模板驱动表单都共享了一些底层构造块。

- A `FormControl` instance that tracks the value and validation status of an individual form control.

  `FormControl` 实例用于追踪单个表单控件的值和验证状态。

- A `FormGroup` instance that tracks the same values and status for a collection of form controls.

  `FormGroup` 实例用于追踪一个表单控件集的值和状态。

- A `FormArray` instance that tracks the same values and status for an array of form controls.

  `FormArray` 实例用于追踪一个表单控件数组的值和状态。

- A `ControlValueAccessor` that creates a bridge between Angular `FormControl` instances and native DOM elements.

  `ControlValueAccessor` 用于在 Angular 的 `FormControl` 实例和原生 DOM 元素之间创建一个桥梁。

How these control instances are created and managed with reactive and template-driven forms is introduced in the [form model setup](#setup-the-form-model) section below and detailed further in the [data flow section](#data-flow-in-forms) of this guide.

如何使用响应式表单和模板驱动表单来创建和管理这些控件实例，参见稍后的[建立表单模型](#setup-the-form-model)部分，更详细的在本章的[数据流](#data-flow-in-forms)部分。

## Setup: The form model

## 建立：表单模型

Reactive and template-driven forms both use a form model to track value changes between Angular forms and form input elements.  The examples below show how the form model is defined and created.

响应式表单和模板驱动表单都是用表单模型来跟踪 Angular 表单和表单输入元素之间值的变化。下面的例子展示了如何定义和创建表单模型。

### Setup in reactive forms

### 在响应式表单中建立

Here is a component with an input field for a single control implemented using reactive forms.

下面是一个带有输入字段的组件，它使用响应式表单实现了单个控件。

<code-example path="forms-overview/src/app/reactive/favorite-color/favorite-color.component.ts">
</code-example>

The source of truth provides the value and status of the form element at a given point in time. In reactive forms, the form model is source of truth. The form model in the above example is the `FormControl` instance.

权威数据源负责提供在指定时间点上表单元素的值和状态。在响应式表单中，表单模式充当权威数据源。上例中的表单模型就是 `FormControl` 的实例。

<figure>
  <img src="generated/images/guide/forms-overview/key-diff-reactive-forms.png" alt="Reactive forms key differences">
</figure>

With reactive forms, the form model is explicitly defined in the component class. The reactive form directive (in this case, `FormControlDirective`) then links the existing form control instance to a specific form element in the view using a value accessor (instance of `ControlValueAccessor`). 

在响应式表单中，表单模型是显式定义在组件类中的。接着，响应式表单指令（这里是 `FormControlDirective`）会把这个现有的表单控件实例通过数据访问器（`ControlValueAccessor` 的实例）来指派给视图中的表单元素。

### Setup in template-driven forms

### 在模板驱动表单中建立

Here is the same component with an input field for a single control implemented using template-driven forms.

下面是同一个带有输入字段的组件，它使用模板驱动表单实现了单个控件。

<code-example path="forms-overview/src/app/template/favorite-color/favorite-color.component.ts">
</code-example>

In template-driven forms, the source of truth is the template.

在模板驱动表单中，权威数据源是模板。

<figure>
  <img src="generated/images/guide/forms-overview/key-diff-td-forms.png" alt="Template-driven forms key differences">
</figure>

The abstraction of the form model promotes simplicity over structure. The template-driven form directive `NgModel` is responsible for creating and managing the form control instance for a given form element. It is less explicit, but you no longer have direct control over the form model. 

表单模型的抽象促进了结构的简化。模板驱动表单的 `NgModel` 指令负责创建和管理指定表单元素上的表单控件实例。它不那么明显，但你不必再直接操纵表单模型了。

## Data flow in forms

## 表单中的数据流

When building forms in Angular, it's important to understand how the framework handles data flowing from the user or from programmatic changes. Reactive and template-driven forms follow two different strategies when handling form input. The data flow examples below begin with the favorite color input field example from above, and they show how changes to favorite color are handled in reactive forms compared to template-driven forms.

当在 Angular 中构建表单时，理解框架如何处理来自用户或程序化修改的数据流是非常重要的。
在处理表单输入时，响应式表单和模板驱动表单遵循两种不同的策略。下面的数据流范例从以前的 "喜欢的颜色" 输入框开始，展示了它在响应式表单中的工作方式与模板驱动表单相比有何不同。

### Data flow in reactive forms

### 响应式表单中的数据流

As described above, in reactive forms each form element in the view is directly linked to a form model (`FormControl` instance). Updates from the view to model and model to view are synchronous and not dependent on the UI rendered. The diagrams below use the same favorite color example to demonstrate how data flows when an input field's value is changed from the view and then from the model.

如前所述，在响应式表单中，视图中的每个表单元素都直接链接到一个表单模型（`FormControl` 实例）。
从视图到模型的修改以及从模型到视图的修改都是同步的，不依赖于所呈现的 UI。下面的图标使用了同一个 "喜欢的颜色" 范例，来演示当输入字段的值的变更来自视图和来自模型时，数据如何流动。

<figure>
  <img src="generated/images/guide/forms-overview/dataflow-reactive-forms-vtm.png" alt="Reactive forms data flow - view to model" width="100%">
</figure>

The steps below outline the view to model data flow.

下面这些步骤列出了 "从视图到模型" 数据流的梗概。

1. The end user types a value into the input element, in this case the favorite color "Blue".

   最终用户在输入框元素中键入了一个值，这里是 "Blue"。

1. The form input element emits an "input" event with the latest value.

   这个输入框元素会发出一个带有最新值的 "input" 事件。

1. The control value accessor listening for events on the form input element immediately relays the new value to the `FormControl` instance.

   这个控件值访问器 `ControlValueAccessor` 会监听表单输入框元素上的事件，并立即把新值传给 `FormControl` 实例。

1. The `FormControl` instance emits the new value through the `valueChanges` observable.

   `FormControl` 实例会通过 `valueChanges` 这个可观察对象发出这个新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何一个订阅者都会收到这个新值。

<figure>
  <img src="generated/images/guide/forms-overview/dataflow-reactive-forms-mtv.png" alt="Reactive forms data flow - model to view" width="100%">
</figure>

The steps below outline the model to view data flow.

下面这些步骤列出了从模型到视图的数据流的梗概。

1. The `favoriteColorControl.setValue()` method is called, which updates the `FormControl` value.

   `favoriteColorControl.setValue()` 方法被调用，它会更新这个 `FormControl` 的值。

1. The `FormControl` instance emits the new value through the `valueChanges` observable.

   `FormControl` 实例会通过 `valueChanges` 这个可观察对象发出新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何订阅者都会收到这个新值。

1. The control value accessor on the form input element updates the element with the new value.

   该表单输入框元素上的控件值访问器会把控件更新为这个新值。

### Data flow in template-driven forms

### 模板驱动表单中的数据流

In template-driven forms, each form element is linked to a directive that manages the form model internally. The diagrams below uses the same favorite color example to demonstrate how data flows when an input field's value is changed from the view and then from the model.

在模板驱动表单中，每个表单元素都链接到一个指令上，该指令负责管理其内部表单模型。下图使用相同的 "喜欢的颜色" 示例来演示当输入字段的值的变更来自视图和来自模板时，数据如何流动。

<figure>
  <img src="generated/images/guide/forms-overview/dataflow-td-forms-vtm.png" alt="Template-driven forms view to model data flow" width="100%">
</figure>

The steps below outline the view to model data flow.

下面这些步骤列出了 "从视图到模型" 数据流的梗概。

1. The end user types "Blue" into the input element.

   最终用户在输入框元素中敲 "Blue"。

1. The input element emits an "input" event with the value "Blue".

   该输入框元素会发出一个 "input" 事件，带着值 "Blue"。

1. The control value accessor attached to the input triggers the `setValue()` method on the `FormControl` instance.

   附着在该输入框上的控件值访问器会触发 `FormControl` 实例上的 `setValue()` 方法。

1. The `FormControl` instance emits the new value through the `valueChanges` observable.

   `FormControl` 实例通过 `valueChanges` 这个可观察对象发出新值。

1. Any subscribers to the `valueChanges` observable receive the new value.

   `valueChanges` 的任何订阅者都会收到新值。

1. The control value accessor also calls the `NgModel.viewToModelUpdate()` method which emits an `ngModelChange` event.

   控件值访问器 `ControlValueAccessory` 还会调用 `NgModel.viewToModelUpdate()` 方法，它会发出一个 `ngModelChange` 事件。

1. Because the component template uses two-way data binding for the `favoriteColor`, the `favoriteColor` property in the component 
is updated to the value emitted  by the `ngModelChange` event ("Blue").

   由于该组件模板双向数据绑定到了 `favoriteColor`，组件中的 `favoriteColor` 属性就会修改为 `ngModelChange` 事件所发出的值（"Blue"）。

<figure>
  <img src="generated/images/guide/forms-overview/dataflow-td-forms-mtv.png" alt="Template-driven forms model to view data flow" width="100%">
</figure>

The steps below outline the model to view data flow.

下面这些步骤列出了从模型到视图的数据流的梗概。

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

## Form validation

## 表单验证

Validation is an integral part of managing any set of forms. Whether you’re checking for required fields or querying an external API for an existing username, Angular provides a set of built-in validators as well as the ability to create custom validators.

验证是管理任何表单时必备的一部分。无论你是要检查必填项，还是查询外部 API 来检查用户名是否已存在，Angular 都会提供一组内置的验证器，以及创建自定义验证器所需的能力。

* **Reactive forms** define custom validators as **functions** that receive a control to validate.

  **响应式表单**把自定义验证器定义成**函数**，它以要验证的控件作为参数。

* **Template-driven forms** are tied to template **directives**, and must provide custom validator directives that wrap validation functions.

  **模板驱动表单**和模板**指令**紧密相关，并且必须提供包装了验证函数的自定义验证器指令。


For more on form validation, see the [Form Validation](guide/form-validation) guide.

要了解验证器的更多知识，参见[表单验证](guide/form-validation)。

## Testing 

## 测试

Testing also plays a large part in complex applications and an easier testing strategy is always welcomed. One difference in testing reactive forms and template-driven forms is their reliance on rendering the UI in order to perform assertions based on form control and form field changes. The following examples demonstrate the process of testing forms with reactive and template-driven forms.

测试在复杂的应用程序中也起着重要的作用，并且总是欢迎更容易的测试策略。测试响应式表单和模板驱动表单的差别之一在于它们是否需要渲染 UI 才能基于表单控件和表单字段变化来执行断言。下面的例子演示了使用响应式表单和模板驱动表单时表单的测试过程。

### Testing reactive forms

### 测试响应式表单

Reactive forms provide a relatively easy testing strategy because they provide synchronous access to the form and data models, and they can be tested without rendering the UI. In these set of tests, controls and data are queried and manipulated through the control without interacting with the change detection cycle.

响应式表单提供了相对简单的测试策略，因为它们能提供对表单和数据模型的同步访问，而且不必渲染 UI 就能测试它们。在这些测试中，控件和数据是通过控件进行查询和操纵的，不需要和变更检测周期打交道。

The following tests use the favorite color components mentioned earlier to verify the view to model and model to view data flows for a reactive form.

下面的测试利用前面的 "喜欢的颜色" 组件来验证响应式表单中的 "从视图到模型" 和 "从模型到视图" 数据流。

The following test verifies the view to model data flow:

下面的测试验证了 "从视图到模型" 数据流

<code-example path="forms-overview/src/app/reactive/favorite-color/favorite-color.component.spec.ts" region="view-to-model" header="Favorite color test - view to model">
</code-example>

The steps performed in the view to model test.

这个测试中执行的步骤如下。

1. Query the view for the form input element, and create a custom "input" event for the test.

   查询表单输入框元素的视图，并为测试创建自定义的 "input" 事件

1. Set the new value for the input is set to *Red*, and dispatch the "input" event on the form input element.

   把输入的新值设置为 *Red*，并在表单输入元素上调度 "input" 事件。

1. Assert that the `favoriteColor` `FormControl` instance value matches the value from the input.

   断言 `favoriteColor` 这个 `FormControl` 实例的值与来自输入框的值是匹配的。

The following test verifies the model to view data flow:

下面的例子验证了 "从模型到视图" 的数据流：

<code-example path="forms-overview/src/app/reactive/favorite-color/favorite-color.component.spec.ts" region="model-to-view" header="Favorite color test - model to view">
</code-example>

The steps performed in the model to view test.

这个测试中执行的步骤如下。

1. Use the `favoriteColor` `FormControl` instance to set the new value.

   使用 `favoriteColor` 这个 `FormControl` 实例来设置新值。

1. Query the view for the form input element.

   查询表单中输入框的视图。

1. Assert that the new value set on the control matches the value in the input.

   断言控件上设置的新值与输入中的值是匹配的。

### Testing template-driven forms

### 测试模板驱动表单

Writing tests with template-driven forms requires more detailed knowledge of the change detection process and how directives run on each cycle to ensure elements are queried, tested, or changed at the correct time.

使用模板驱动表单编写测试就需要详细了解变更检测过程，以及指令在每个变更检测周期中如何运行，以确保在正确的时间查询、测试或更改元素。

The following tests use the favorite color components mentioned earlier to verify the view to model and model to view data flows for a template-driven form.

下面的测试使用了以前的 "喜欢的颜色" 组件，来验证模板驱动表单的 "从视图到模型" 和 "从模型到视图" 数据流。

The following test verifies the view to model data flow:

下面的测试验证了 "从视图到模型" 数据流：

<code-example path="forms-overview/src/app/template/favorite-color/favorite-color.component.spec.ts" region="view-to-model" header="Favorite color test - view to model">
</code-example>

The steps performed in the view to model test.

执行的测试步骤如下：

1. Query the view for the form input element, and create a custom "input" event for the test.

   查询表单输入元素中的视图，并为测试创建自定义 "input" 事件。

1. Set the new value for the input is set to *Red*, and dispatch the "input" event on the form input element.

   把输入框的新值设置为 *Red*，并在表单输入框元素上派发 "input" 事件。

1. Run change detection through the test fixture.

   通过测试夹具（Fixture）来运行变更检测。

1. Assert that the component `favoriteColor` property value matches the value from the input.

   断言该组件 `favoriteColor` 属性的值与来自输入框的值是匹配的。

The following test verifies the model to view data flow:

下面的测试验证了 "从模型到视图" 的数据流：

<code-example path="forms-overview/src/app/template/favorite-color/favorite-color.component.spec.ts" region="model-to-view" header="Favorite color test - model to view">
</code-example>

The steps performed in the model to view test.

执行的测试步骤如下：

1. Use the component instance to set the value of `favoriteColor` property.

   使用组件实例来设置 `favoriteColor` 的值。

1. Run change detection through the test fixture.

   通过测试夹具（Fixture）来运行变更检测。

1. Use the `tick()` method to simulate passage of time within the `fakeAsync()` task.

   在 `fakeAsync()` 任务中使用 `tick()` 方法来模拟时间的流逝。

1. Query the view for the form input element.

   查询表单输入框元素的视图。

1. Assert that the input value matches the `favoriteColor` value property in the component instance.

   断言输入框的值与该组件实例的 `favoriteColor` 属性值是匹配的。

## Mutability

## 可变性

How changes are tracked plays a role in the efficiency of your application.

如何跟踪变更，对于应用的运行效率起着重要作用。

- **Reactive forms** keep the data model pure by providing it as an immutable data structure. Each time a change is triggered on the data model, the `FormControl` instance returns a new data model rather than updating the data model directly. This gives you the ability track unique changes to the data model through the control's observable. This allows change detection to be more efficient because it only needs to update on unique changes. It also follows reactive patterns that integrate with observable operators to transform data.

  **响应式表单**通过将数据模型提供为不可变数据结构来保持数据模型的纯粹性。每当在数据模型上触发更改时，`FormControl` 实例都会返回一个新的数据模型，而不是直接修改原来的。这样能让你通过该控件的可观察对象来跟踪那些具有唯一性的变更。这可以让变更检测更高效，因为它只需要在发生了唯一性变更的时候进行更新。它还遵循与操作符相结合使用的 "响应式" 模式来转换数据。

- **Template-driven** forms rely on mutability with two-way data binding to update the data model in the component as changes are made in the template. Because there are no unique changes to track on the data model when using two-way data binding, change detection is less efficient at determining when updates are required.

  **模板驱动表单**依赖于可变性，它使用双向数据绑定，以便在模板中发生变更时修改数据模型。因为在使用双向数据绑定时无法在数据模型中跟踪具有唯一性的变更，因此变更检测机制在要确定何时需要更新时效率较低。

The difference is demonstrated in the examples above using the **favorite color** input element. 

以 "喜欢的颜色" 输入框元素为例来看看两者有什么不同：

- With reactive forms, the **`FormControl` instance** always returns a new value when the control's value is updated.

  对于响应式表单，每当控件值变化时，**`FormControl` 实例**就会返回一个新的值。

- With template-driven forms, the **favorite color property** is always modified to its new value.

  对于模板驱动表单，**favoriteColor** 属性总是会修改成它的新值。

## Scalability

## 可伸缩性

If forms are a central part of your application, scalability is very important. Being able to reuse form models across components is critical.

如果表单是应用程序的核心部分，那么可伸缩性就非常重要。能跨组件复用的表单模型是至关重要的。

- **Reactive forms** make creating large scale forms easier by providing access to low-level APIs and synchronous access to the form model.

  **响应式表单**通过提供对底层 API 的访问和对表单模型的同步访问，可以轻松地创建大型表单。

- **Template-driven** forms focus on simple scenarios, are not as reusable, abstract away the low-level APIs and access to the form model is  provided asynchronously. The abstraction with template-driven forms surfaces in testing also, where testing reactive forms requires less setup and no dependence on the change detection cycle when updating and validating the form and data models during testing.

  **模板驱动表单**专注于简单的场景，它不可重用、对底层 API 进行抽象，而且对表单模型的访问是异步的。
  在测试过程中，模板驱动表单的抽象也会参与测试。而测试响应式表单需要更少的准备代码，并且当测试期间修改和验证表单模型与数据模型时，不依赖变更检测周期。

## Final Thoughts

## 最后的想法

Choosing a strategy begins with understanding the strengths and weaknesses of the options presented. Low-level API and form model access, predictability, mutability, straightforward validation and testing strategies, and scalability are all important consideration in choosing the infrastructure you use when building your forms in Angular. Template-driven forms are similar to patterns in AngularJS, but they have limitations given the criteria of many modern, large-scale Angular apps. Reactive forms integrate with reactive patterns already present in other areas of the Angular architecture, and complement those requirements well. Those limitations are alleviated with reactive forms.

选择一项策略首先要了解所提供选项的优缺点。当选择在 Angular 中构建表单要用哪种基础设施时，底层 API 访问、表单模型访问、可预测性、可变性、直截了当的验证方式和测试策略以及可伸缩性都是重要的考虑因素。
模板驱动表单和 AngularJS 中的传统模式相似，但它们具有局限性。响应式表单已经和 Angular 架构其它区域中存在的响应式模式相整合，并很好地弥补了这些需求，这些限制通过响应式表单技术得到了缓解。

## Next Steps

## 下一步

The following guides are the next steps in the learning process.

下一步你可以学习如下章节。

To learn more about reactive forms, see the following guides:

要进一步了解响应式表单，参见下列章节：

* [Reactive Forms](guide/reactive-forms)

  [响应式表单](guide/reactive-forms)

* [Form Validation](guide/form-validation#reactive-form-validation)

  [表单验证](guide/form-validation#reactive-form-validation)

* [Dynamic forms](guide/dynamic-form)

  [动态表单](guide/dynamic-form)

To learn more about template-driven forms, see the following guides:

要进一步了解模板驱动表单，参见下列章节：

* [Template-driven Forms](guide/forms)

  [模板驱动表单](guide/forms)

* [Form Validation](guide/form-validation#template-driven-validation)

  [表单验证](guide/form-validation#template-driven-validation)
