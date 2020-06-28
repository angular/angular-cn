# Reactive forms

# 响应式表单

Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a basic form control, progress to using multiple controls in a group, validate form values, and create dynamic forms where you can add or remove controls at run time.

*响应式表单*提供了一种模型驱动的方式来处理表单输入，其中的值会随时间而变化。本文会向你展示如何创建和更新基本的表单控件，接下来还会在一个表单组中使用多个控件，验证表单的值，以及创建动态表单，也就是在运行期添加或移除控件。

<div class="alert is-helpful">

Try this <live-example title="Reactive Forms in Stackblitz">Reactive Forms live-example</live-example>.

试试这个<live-example title="Reactive Forms in Stackblitz">响应式表单的现场演练</live-example>。

</div>

**Prerequisites**

**先决条件**

Before going further into reactive forms, you should have a basic understanding of the following:

在深入了解被动表单之前，你应该对这些内容有一个基本的了解：

* TypeScript programming.

  TypeScript 编程。

* Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture "Introduction to Angular concepts.").

  Angular 的应用设计基础，就像[Angular Concepts 中](guide/architecture "Angular 概念简介。")描述的那样。

* The form-design concepts that are presented in [Introduction to Forms](guide/forms-overview "Overview of Angular forms.").

  [“表单简介”](guide/forms-overview "Angular 表单概述")中提供的表单设计概念。

{@a intro}

## Overview of reactive forms

## 响应式表单概述

Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around [observable](guide/glossary#observable "Observable definition.") streams, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

响应式表单使用显式的、不可变的方式，管理表单在特定的时间点上的状态。对表单状态的每一次变更都会返回一个新的状态，这样可以在变化时维护模型的整体性。响应式表单是围绕 [Observable](guide/glossary#observable "Observable definition.") 流构建的，表单的输入和值都是通过这些输入值组成的流来提供的，它可以同步访问。

Reactive forms also provide a straightforward path to testing because you are assured that your data is consistent and predictable when requested. Any consumers of the streams have access to manipulate that data safely.

响应式表单还提供了一种更直观的测试路径，因为在请求时你可以确信这些数据是一致的、可预料的。这个流的任何一个消费者都可以安全地操纵这些数据。

Reactive forms differ from [template-driven forms](guide/forms "Template-driven forms guide") in distinct ways. Reactive forms provide more predictability with synchronous access to the data model, immutability with observable operators, and change tracking through observable streams.

响应式表单与[模板驱动表单](guide/forms "Template-driven forms guide")有着显著的不同点。响应式表单通过对数据模型的同步访问提供了更多的可预测性，使用 Observable 的操作符提供了不可变性，并且通过 Observable 流提供了变化追踪功能。

Template-driven forms allow direct access to modify data in your template, but are less explicit than reactive forms because they rely on directives embedded in the template, along with mutable data to track changes asynchronously. See the [Forms Overview](guide/forms-overview "Overview of Angular forms.") for detailed comparisons between the two paradigms.

模板驱动的表单允许你直接在模板中修改数据，但不像响应式表单那么明确，因为它们依赖嵌入到模板中的指令，并借助可变数据来异步跟踪变化。参见[表单概览](guide/forms-overview "Angular 表单概览")以了解这两种范式之间的详细比较。

## Adding a basic form control

## 添加基础表单控件

There are three steps to using form controls.

使用表单控件有三个步骤。

1. Register the reactive forms module in your app. This module declares the reactive-form directives that you need to use reactive forms.

   在你的应用中注册响应式表单模块。该模块声明了一些你要用在响应式表单中的指令。

2. Generate a new `FormControl` instance and save it in the component.

   生成一个新的 `FormControl` 实例，并把它保存在组件中。

3. Register the `FormControl` in the template.

   在模板中注册这个 `FormControl`。

You can then display the form by adding the component to the template.

然后，你可以把组件添加到模板中来显示表单。

The following examples show how to add a single form control. In the example, the user enters their name into an input field, captures that input value, and displays the current value of the form control element.

下面的例子展示了如何添加一个表单控件。在这个例子中，用户在输入字段中输入自己的名字，捕获其输入值，并显示表单控件的当前值。

**Register the reactive forms module**

**注册响应式表单模块**

To use reactive form controls, import `ReactiveFormsModule` from the `@angular/forms` package and add it to your NgModule's `imports` array.

要使用响应式表单控件，就要从 `@angular/forms` 包中导入 `ReactiveFormsModule`，并把它添加到你的 NgModule 的 `imports` 数组中。

<code-example path="reactive-forms/src/app/app.module.ts" region="imports" header="src/app/app.module.ts (excerpt)"></code-example>

**Generate a new `FormControl`**

**生成一个新的 `FormControl`**

Use the [CLI command](cli "Using the Angular command-line interface.") `ng generate` to generate a component in your project to host the control.

使用 [CLI 命令](cli "使用 Angular 命令行界面。") `ng generate` 在项目中生成一个组件作为该表单控件的宿主。

<code-example language="sh" class="code-shell">

  ng generate component NameEditor

</code-example>

To register a single form control, import the `FormControl` class and create a new instance of `FormControl` to save as a class property.

要注册一个表单控件，就要导入 `FormControl` 类并创建一个 `FormControl` 的新实例，将其保存为类的属性。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.ts" region="create-control" header="src/app/name-editor/name-editor.component.ts"></code-example>

Use the constructor of `FormControl` to set its initial value, which in this case is an empty string. By creating these controls in your component class, you get immediate access to listen for, update, and validate the state of the form input.

可以用 `FormControl` 的构造函数设置初始值，这个例子中它是空字符串。通过在你的组件类中创建这些控件，你可以直接对表单控件的状态进行监听、修改和校验。

**Register the control in the template**

**在模板中注册该控件**

After you create the control in the component class, you must associate it with a form control element in the template. Update the template with the form control using the `formControl` binding provided by `FormControlDirective`, which is also included in the `ReactiveFormsModule`.

在组件类中创建了控件之后，你还要把它和模板中的一个表单控件关联起来。修改模板，为表单控件添加 `formControl` 绑定，`formControl` 是由 `ReactiveFormsModule` 中的 `FormControlDirective` 提供的。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.html" region="control-binding" header="src/app/name-editor/name-editor.component.html"></code-example>

<div class="alert is-helpful">

* For a summary of the classes and directives provided by `ReactiveFormsModule`, see the [Reactive forms API](#reactive-forms-api "API summary.") section below.

  有关 `ReactiveFormsModule` 提供的类和指令的汇总表，请参阅下面的[响应式表单 API](#reactive-forms-api "API 摘要")部分。

* For complete syntax details of these classes and directives, see the API reference documentation for the [Forms package](api/forms "API reference.").

  有关这些类和指令的完整语法，请参阅 API 参考手册中的 [Forms 包](api/forms "API 参考。")部分。

</div>

Using the template binding syntax, the form control is now registered to the `name` input element in the template. The form control and DOM element communicate with each other: the view reflects changes in the model, and the model reflects changes in the view.

使用这种模板绑定语法，把该表单控件注册给了模板中名为 `name` 的输入元素。这样，表单控件和 DOM 元素就可以互相通讯了：视图会反映模型的变化，模型也会反映视图中的变化。

**Display the component**

**显示该组件**

The form control assigned to `name` is displayed when the component is added to a template.

把该组件添加到模板时，将显示指派给 `name` 的表单控件。

<code-example path="reactive-forms/src/app/app.component.1.html" region="app-name-editor" header="src/app/app.component.html (name editor)"></code-example>

<div class="lightbox">
  <img src="generated/images/guide/reactive-forms/name-editor-1.png" alt="Name Editor">
</div>

{@a display-value}

### Displaying a form control value

### 显示表单控件的值

You can display the value in the following ways.

你可以用下列方式显示它的值：

* Through the `valueChanges` observable where you can listen for changes in the form's value in the template using `AsyncPipe` or in the component class using the `subscribe()` method.

  通过可观察对象 `valueChanges`，你可以在模板中使用 `AsyncPipe` 或在组件类中使用 `subscribe()` 方法来监听表单值的变化。

* With the `value` property, which gives you a snapshot of the current value.

  使用 `value` 属性。它能让你获得当前值的一份快照。

The following example shows you how to display the current value using interpolation in the template.

下面的例子展示了如何在模板中使用插值显示当前值。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.html" region="display-value" header="src/app/name-editor/name-editor.component.html (control value)"></code-example>

The displayed value changes as you update the form control element.

一旦你修改了表单控件所关联的元素，这里显示的值也跟着变化了。

Reactive forms provide access to information about a given control through properties and methods provided with each instance.
These properties and methods of the underlying [AbstractControl](api/forms/AbstractControl "API reference.") class are used to control form state and determine when to display messages when handling [input validation](#basic-form-validation "Learn more about validating form input.").

响应式表单还能通过每个实例的属性和方法提供关于特定控件的更多信息。[AbstractControl](api/forms/AbstractControl) 的这些属性和方法用于控制表单状态，并在处理表单校验时决定何时显示信息。
欲知详情，参见稍后的[输入验证](#basic-form-validation)一节。

Read about other `FormControl` properties and methods in the [API Reference](api/forms/FormControl "Detailed syntax reference.").

要了解 `FormControl` 的其它属性和方法，参见 [API 参考手册](api/forms/FormControl)。

### Replacing a form control value

### 替换表单控件的值

Reactive forms have methods to change a control's value programmatically, which gives you the flexibility to update the value without user interaction. A form control instance provides a `setValue()` method that updates the value of the form control and validates the structure of the value provided against the control's structure. For example, when retrieving form data from a backend API or service, use the `setValue()` method to update the control to its new value, replacing the old value entirely.

响应式表单还有一些方法可以用编程的方式修改控件的值，它让你可以灵活的修改控件的值而不需要借助用户交互。`FormControl` 提供了一个 `setValue()` 方法，它会修改这个表单控件的值，并且验证与控件结构相对应的值的结构。比如，当从后端 API 或服务接收到了表单数据时，可以通过 `setValue()` 方法来把原来的值替换为新的值。

The following example adds a method to the component class to update the value of the control to *Nancy* using the `setValue()` method.

下列的例子往组件类中添加了一个方法，它使用 `setValue()` 方法来修改 *Nancy* 控件的值。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.ts" region="update-value" header="src/app/name-editor/name-editor.component.ts (update value)">

</code-example>

Update the template with a button to simulate a name update. When you click the **Update Name** button, the value entered in the form control element is reflected as its current value.

修改模板，添加一个按钮，用于模拟改名操作。在点 `Update Name` 按钮之前表单控件元素中输入的任何值都会回显为它的当前值。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.html" region="update-value" header="src/app/name-editor/name-editor.component.html (update value)"></code-example>

The form model is the source of truth for the control, so when you click the button, the value of the input is changed within the component class, overriding its current value.

由于表单模型是该控件的事实之源，因此当你单击该按钮时，组件中该输入框的值也变化了，覆盖掉它的当前值。

<div class="lightbox">
  <img src="generated/images/guide/reactive-forms/name-editor-2.png" alt="Name Editor Update">
</div>

<div class="alert is-helpful">

**Note:** In this example, you're using a single control. When using the `setValue()` method with a [form group](#grouping-form-controls "Learn more about form groups.") or [form array](#creating-dynamic-forms "Learn more about dynamic forms.") instance, the value needs to match the structure of the group or array.

*注意*：在这个例子中，你只使用单个控件，但是当调用 [`FormGroup`](#grouping-form-controls "Learn more about form groups.") 或 [`FormArray`](#creating-dynamic-forms "Learn more about dynamic forms.") 实例的 `setValue()` 方法时，传入的值就必须匹配控件组或控件数组的结构才行。

</div>

## Grouping form controls

## 把表单控件分组

Forms typically contain several related controls. Reactive forms provide two ways of grouping multiple related controls into a single input form.

表单中通常会包含几个相互关联的控件。响应式表单提供了两种把多个相关控件分组到同一个输入表单中的方法。

* A form *group* defines a form with a fixed set of controls that you can manage together. Form group basics are discussed in this section. You can also [nest form groups](#nested-groups "See more about nesting groups.") to create more complex forms.

  表单*组*定义了一个带有一组控件的表单，你可以把它们放在一起管理。表单组的基础知识将在本节中讨论。你也可以通过[嵌套表单组](#nested-groups "详细了解嵌套组。")来创建更复杂的表单。

* A form *array* defines a dynamic form, where you can add and remove controls at run time. You can also nest form arrays to create more complex forms. For more about this option, see [Creating dynamic forms](#dynamic-forms "See more about form arrays.") below.

  表单*数组*定义了一个动态表单，你可以在运行时添加和删除控件。你也可以通过嵌套表单数组来创建更复杂的表单。欲知详情，参见下面的[创建动态表单](#dynamic-forms "详细了解表单数组。")。

Just as a form control instance gives you control over a single input field, a form group instance tracks the form state of a group of form control instances (for example, a form). Each control in a form group instance is tracked by name when creating the form group. The following example shows how to manage multiple form control instances in a single group.

就像 `FormControl` 的实例能让你控制单个输入框所对应的控件一样，`FormGroup` 的实例也能跟踪一组 `FormControl` 实例（比如一个表单）的表单状态。当创建 `FormGroup` 时，其中的每个控件都会根据其名字进行跟踪。下面的例子展示了如何管理单个控件组中的多个 `FormControl` 实例。

Generate a `ProfileEditor` component and import the `FormGroup` and `FormControl` classes from the `@angular/forms` package.

生成一个 `ProfileEditor` 组件并从 `@angular/forms` 包中导入 `FormGroup` 和 `FormControl` 类。

<code-example language="sh" class="code-shell">

  ng generate component ProfileEditor

</code-example>

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="imports" header="src/app/profile-editor/profile-editor.component.ts (imports)">

</code-example>

To add a form group to this component, take the following steps.

要将表单组添加到此组件中，请执行以下步骤。

1. Create a `FormGroup` instance.

   创建一个 `FormGroup` 实例。

2. Associate the `FormGroup` model and view.

   把这个 `FormGroup` 模型关联到视图。

3. Save the form data.

   保存表单数据。

**Create a FormGroup instance**

**创建一个 FormGroup 实例**

Create a property in the component class named `profileForm` and set the property to a new form group instance. To initialize the form group, provide the constructor with an object of named keys mapped to their control.

在组件类中创建一个名叫 `profileForm` 的属性，并设置为 `FormGroup` 的一个新实例。要初始化这个 `FormGroup`，请为构造函数提供一个由控件组成的对象，对象中的每个名字都要和表单控件的名字一一对应。

For the profile form, add two form control instances with the names `firstName` and `lastName`.

对此个人档案表单，要添加两个 `FormControl` 实例，名字分别为 `firstName` 和 `lastName`。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup" header="src/app/profile-editor/profile-editor.component.ts (form group)">

</code-example>

The individual form controls are now collected within a group. A `FormGroup` instance provides its model value as an object reduced from the values of each control in the group. A form group instance has the same properties (such as `value` and `untouched`) and methods (such as `setValue()`) as a form control instance.

现在，这些独立的表单控件被收集到了一个控件组中。这个 `FormGroup` 用对象的形式提供了它的模型值，这个值来自组中每个控件的值。
`FormGroup` 实例拥有和 `FormControl` 实例相同的属性（比如 `value`、`untouched`）和方法（比如 `setValue()`）。

**Associate the FormGroup model and view**

**把这个 `FormGroup` 模型关联到视图。**

A form group tracks the status and changes for each of its controls, so if one of the controls changes, the parent control also emits a new status or value change. The model for the group is maintained from its members. After you define the model, you must update the template to reflect the model in the view.

这个表单组还能跟踪其中每个控件的状态及其变化，所以如果其中的某个控件的状态或值变化了，父控件也会发出一次新的状态变更或值变更事件。该控件组的模型来自它的所有成员。在定义了这个模型之后，你必须更新模板，来把该模型反映到视图中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroup" header="src/app/profile-editor/profile-editor.component.html (template form group)"></code-example>

Note that just as a form group contains a group of controls, the *profile form* `FormGroup` is bound to the `form` element with the `FormGroup` directive, creating a communication layer between the model and the form containing the inputs. The `formControlName` input provided by the `FormControlName` directive binds each individual input to the form control defined in `FormGroup`. The form controls communicate with their respective elements. They also communicate changes to the form group instance, which provides the source of truth for the model value.

注意，就像 `FormGroup` 所包含的那控件一样，*profileForm* 这个 `FormGroup` 也通过 `FormGroup` 指令绑定到了 `form` 元素，在该模型和表单中的输入框之间创建了一个通讯层。
由 `FormControlName` 指令提供的 `formControlName` 属性把每个输入框和 `FormGroup` 中定义的表单控件绑定起来。这些表单控件会和相应的元素通讯，它们还把更改传给 `FormGroup`，这个 `FormGroup` 是模型值的事实之源。

**Save form data**

**保存表单数据**

The `ProfileEditor` component accepts input from the user, but in a real scenario you want to capture the form value and make available for further processing outside the component. The `FormGroup` directive listens for the `submit` event emitted by the `form` element and emits an `ngSubmit` event that you can bind to a callback function.

`ProfileEditor` 组件从用户那里获得输入，但在真实的场景中，你可能想要先捕获表单的值，等将来在组件外部进行处理。
`FormGroup` 指令会监听 `form` 元素发出的 `submit` 事件，并发出一个 `ngSubmit` 事件，让你可以绑定一个回调函数。

Add an `ngSubmit` event listener to the `form` tag with the `onSubmit()` callback method.

把 `onSubmit()` 回调方法添加为 `form` 标签上的 `ngSubmit` 事件监听器。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="ng-submit" header="src/app/profile-editor/profile-editor.component.html (submit event)"></code-example>

The `onSubmit()` method in the `ProfileEditor` component captures the current value of `profileForm`. Use `EventEmitter` to keep the form encapsulated and to provide the form value outside the component. The following example uses `console.warn` to log a message to the browser console.

`ProfileEditor` 组件上的 `onSubmit()` 方法会捕获 `profileForm` 的当前值。要保持该表单的封装性，就要使用 `EventEmitter` 向组件外部提供该表单的值。下面的例子会使用 `console.warn` 把这个值记录到浏览器的控制台中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="on-submit" header="src/app/profile-editor/profile-editor.component.ts (submit method)">

</code-example>

The `submit` event is emitted by the `form` tag using the native DOM event. You trigger the event by clicking a button with `submit` type. This allows the user to press the **Enter** key to submit the completed form.

`form` 标签所发出的 `submit` 事件是原生 DOM 事件，通过点击类型为 `submit` 的按钮可以触发本事件。这还让用户可以用回车键来提交填完的表单。

Use a `button` element to add a button to the bottom of the form to trigger the form submission.

往表单的底部添加一个 `button`，用于触发表单提交。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="submit-button" header="src/app/profile-editor/profile-editor.component.html (submit button)"></code-example>

<div class="alert is-helpful">

**Note:** The button in the snippet above also has a `disabled` binding attached to it to disable the button when `profileForm` is invalid. You aren't performing any validation yet, so the button is always enabled. Basic form validation is covered in the [Validating form input](#basic-form-validation "Basic form validation.") section.

*注意：*上面这个代码片段中的按钮还附加了一个 `disabled` 绑定，用于在 `profileForm` 无效时禁用该按钮。目前你还没有执行任何表单验证逻辑，因此该按钮始终是可用的。稍后的[验证表单输入](#basic-form-validation "基础表单验证")部分会讲解基础的表单验证。

</div>

**Display the component**

**显示组件**

To display the `ProfileEditor` component that contains the form, add it to a component template.

要显示包含此表单的 `ProfileEditor` 组件，请把它添加到组件模板中。

<code-example path="reactive-forms/src/app/app.component.1.html" region="app-profile-editor" header="src/app/app.component.html (profile editor)"></code-example>

`ProfileEditor` allows you to manage the form control instances for the `firstName` and `lastName` controls within the form group instance.

`ProfileEditor` 让你能管理 `FormGroup` 中的 `firstName` 和 `lastName` 等 `FormControl` 实例。

<div class="lightbox">
  <img src="generated/images/guide/reactive-forms/profile-editor-1.png" alt="Profile Editor">
</div>

{@a nested-groups}

### Creating nested form groups

### 创建嵌套的表单组

Form groups can accept both individual form control instances and other form group instances as children. This makes composing complex form models easier to maintain and logically group together.

表单组可以同时接受单个表单控件实例和其它表单组实例作为其子控件。这可以让复杂的表单模型更容易维护，并在逻辑上把它们分组到一起。

When building complex forms, managing the different areas of information is easier in smaller sections. Using a nested form group instance allows you to break large forms groups into smaller, more manageable ones.

如果要构建复杂的表单，如果能在更小的分区中管理不同类别的信息就会更容易一些。使用嵌套的 `FormGroup` 可以让你把大型表单组织成一些稍小的、易管理的分组。

To make more complex forms, use the following steps.

要制作更复杂的表单，请遵循如下步骤。

1. Create a nested group.

   创建一个嵌套的表单组。

1. Group the nested form in the template.

   在模板中对这个嵌套表单分组。

Some types of information naturally fall into the same group. A name and address are typical examples of such nested groups, and are used in the following examples.

某些类型的信息天然就属于同一个组。比如名称和地址就是这类嵌套组的典型例子，下面的例子中就用到了它们。

**Create a nested group**

**创建一个嵌套组**

To create a nested group in `profileForm`, add a nested `address` element to the form group instance.

要在 `profileForm` 中创建一个嵌套组，就要把一个嵌套的 `address` 元素添加到此表单组的实例中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="nested-formgroup" header="src/app/profile-editor/profile-editor.component.ts (nested form group)"></code-example>

In this example, `address group` combines the current `firstName` and `lastName` controls with the new `street`, `city`, `state`, and `zip` controls. Even though the `address` element in the form group is a child of the overall `profileForm` element in the form group, the same rules apply with value and status changes. Changes in status and value from the nested form group propagate to the parent form group, maintaining consistency with the overall model.

在这个例子中，`address group` 把现有的 `firstName`、`lastName` 控件和新的 `street`、`city`、`state` 和 `zip` 控件组合在一起。虽然 `address` 这个 `FormGroup` 是 `profileForm` 这个整体 `FormGroup` 的一个子控件，但是仍然适用同样的值和状态的变更规则。来自内嵌控件组的状态和值的变更将会冒泡到它的父控件组，以维护整体模型的一致性。

**Group the nested form in the template**

**在模板中对此嵌套表单分组**

After you update the model in the component class, update the template to connect the form group instance and its input elements.

在修改了组件类中的模型之后，还要修改模板，来把这个 `FormGroup` 实例对接到它的输入元素。

Add the `address` form group containing the `street`, `city`, `state`, and `zip` fields to the `ProfileEditor` template.

把包含 `street`、`city`、`state` 和 `zip`  字段的 `address` 表单组添加到 `ProfileEditor` 模板中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroupname" header="src/app/profile-editor/profile-editor.component.html (template nested form group)"></code-example>

The `ProfileEditor` form is displayed as one group, but the model is broken down further to represent the logical grouping areas.

`ProfileEditor` 表单显示为一个组，但是将来这个模型会被进一步细分，以表示逻辑分组区域。

<div class="lightbox">
  <img src="generated/images/guide/reactive-forms/profile-editor-2.png" alt="Profile Editor Update">
</div>

<div class="alert is-helpful">

**Tip** Display the value for the form group instance in the component template using the `value` property and `JsonPipe`.

*提示*：这里使用了 `value` 属性和 `JsonPipe` 管道在组件模板中显示了这个 `FormGroup` 的值。

</div>

### Updating parts of the data model

### 更新部分数据模型

When updating the value for a form group instance that contains multiple controls, you may only want to update parts of the model. This section covers how to update specific parts of a form control data model.

当修改包含多个 `FormGroup` 实例的值时，你可能只希望更新模型中的一部分，而不是完全替换掉。这一节会讲解该如何更新 `AbstractControl` 模型中的一部分。

There are two ways to update the model value:

有两种更新模型值的方式：

* Use the `setValue()` method to set a new value for an individual control. The `setValue()` method strictly adheres to the structure of the form group and replaces the entire value for the control.

  使用 `setValue()` 方法来为单个控件设置新值。
  `setValue()` 方法会严格遵循表单组的结构，并整体性替换控件的值。

* Use the `patchValue()` method to replace any properties defined in the object that have changed in the form model.

  使用 `patchValue()` 方法可以用对象中所定义的任何属性为表单模型进行替换。

The strict checks of the `setValue()` method help catch nesting errors in complex forms, while `patchValue()` fails silently on those errors.

`setValue()` 方法的严格检查可以帮助你捕获复杂表单嵌套中的错误，而 `patchValue()` 在遇到那些错误时可能会默默的失败。

In `ProfileEditorComponent`, use the `updateProfile` method with the example below to update the first name and street address for the user.

在 `ProfileEditorComponent` 中，使用 `updateProfile` 方法传入下列数据可以更新用户的名字与街道住址。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="patch-value" header="src/app/profile-editor/profile-editor.component.ts (patch value)">

</code-example>

Simulate an update by adding a button to the template to update the user profile on demand.

通过往模板中添加一个按钮来模拟一次更新操作，以修改用户档案。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="patch-value" header="src/app/profile-editor/profile-editor.component.html (update value)"></code-example>

When a user clicks the button, the `profileForm` model is updated with new values for `firstName` and `street`. Notice that `street` is provided in an object inside the `address` property. This is necessary because the `patchValue()` method applies the update against the model structure. `PatchValue()` only updates properties that the form model defines.

当点击按钮时，`profileForm` 模型中只有 `firstName` 和 `street` 被修改了。注意，`street` 是在 `address` 属性的对象中被修改的。这种结构是必须的，因为 `patchValue()` 方法要针对模型的结构进行更新。`patchValue()` 只会更新表单模型中所定义的那些属性。

## Using the FormBuilder service to generate controls

## 使用 FormBuilder 服务生成控件

Creating form control instances manually can become repetitive when dealing with multiple forms. The `FormBuilder` service provides convenient methods for generating controls.

当需要与多个表单打交道时，手动创建多个表单控件实例会非常繁琐。`FormBuilder` 服务提供了一些便捷方法来生成表单控件。`FormBuilder` 在幕后也使用同样的方式来创建和返回这些实例，只是用起来更简单。

Use the following steps to take advantage of this service.

通过下列步骤可以利用这项服务。

1. Import the `FormBuilder` class.

   导入 `FormBuilder` 类。

2. Inject the `FormBuilder` service.

   注入这个 `FormBuilder` 服务。

3. Generate the form contents.

   生成表单内容。

The following examples show how to refactor the `ProfileEditor` component to use the form builder service to create form control and form group instances.

下面的例子展示了如何重构 `ProfileEditor` 组件，用 `FormBuilder` 来代替手工创建这些 `FormControl` 和 `FormGroup` 实例。

**Import the FormBuilder class**

**导入 FormBuilder 类**

Import the `FormBuilder` class from the `@angular/forms` package.

从 `@angular/forms` 包中导入 `FormBuilder` 类。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder-imports" header="src/app/profile-editor/profile-editor.component.ts (import)">

</code-example>

**Inject the FormBuilder service**

**注入 FormBuilder 服务**

The `FormBuilder` service is an injectable provider that is provided with the reactive forms module. Inject this dependency by adding it to the component constructor.

`FormBuilder` 是一个可注入的服务提供者，它是由 `ReactiveFormModule` 提供的。只要把它添加到组件的构造函数中就可以注入这个依赖。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="inject-form-builder" header="src/app/profile-editor/profile-editor.component.ts (constructor)">

</code-example>

**Generate form controls**

**生成表单控件**

The `FormBuilder` service has three methods: `control()`, `group()`, and `array()`. These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays.

`FormBuilder` 服务有三个方法：`control()`、`group()` 和 `array()`。这些方法都是工厂方法，用于在组件类中分别生成 `FormControl`、`FormGroup` 和 `FormArray`。

Use the `group` method to create the `profileForm` controls.

用 `group` 方法来创建 `profileForm` 控件。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder" header="src/app/profile-editor/profile-editor.component.ts (form builder)">

</code-example>

In the example above, you use the `group()` method with the same object to define the properties in the model. The value for each control name is an array containing the initial value as the first item in the array.

在上面的例子中，你可以使用 `group()` 方法，用和前面一样的名字来定义这些属性。这里，每个控件名对应的值都是一个数组，这个数组中的第一项是其初始值。

<div class="alert is-helpful">

**Tip** You can define the control with just the initial value, but if your controls need sync or async validation, add sync and async validators as the second and third items in the array.

**提示**：你可以只使用初始值来定义控件，但是如果你的控件还需要同步或异步验证器，那就在这个数组中的第二项和第三项提供同步和异步验证器。

</div>

Compare using the form builder to creating the instances manually.

比较一下用表单构建器和手动创建实例这两种方式。

<code-tabs>

  <code-pane path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup-compare" header="src/app/profile-editor/profile-editor.component.ts (instances)">

  </code-pane>

  <code-pane path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="formgroup-compare" header="src/app/profile-editor/profile-editor.component.ts (form builder)">

  </code-pane>

</code-tabs>

{@a basic-form-validation}

## Validating form input

## 验证表单输入

_Form validation_ is used to ensure that user input is complete and correct. This section covers adding a single validator to a form control and displaying the overall form status. Form validation is covered more extensively in the [Form Validation](guide/form-validation "All about form validation.") guide.

*表单验证*用于确保用户的输入是完整和正确的。本节讲解了如何把单个验证器添加到表单控件中，以及如何显示表单的整体状态。表单验证的更多知识在[表单验证](guide/form-validation "关于表单验证")一章中有详细的讲解。

Use the following steps to add form validation.

使用下列步骤添加表单验证。

1. Import a validator function in your form component.

   在表单组件中导入一个验证器函数。

2. Add the validator to the field in the form.

   把这个验证器添加到表单中的相应字段。

3. Add logic to handle the validation status.

   添加逻辑来处理验证状态。

The most common validation is making a field required. The following example shows how to add a required validation to the `firstName` control and display the result of validation.

最常见的验证是做一个必填字段。下面的例子给出了如何在 `firstName` 控件中添加必填验证并显示验证结果的方法。

**Import a validator function**

**导入验证器函数**

Reactive forms include a set of validator functions for common use cases. These functions receive a control to validate against and return an error object or a null value based on the validation check.

响应式表单包含了一组开箱即用的常用验证器函数。这些函数接收一个控件，用以验证并根据验证结果返回一个错误对象或空值。

Import the `Validators` class from the `@angular/forms` package.

从 `@angular/forms` 包中导入 `Validators` 类。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="validator-imports" header="src/app/profile-editor/profile-editor.component.ts (import)">

</code-example>

**Make a field required**

**建一个必填字段**

In the `ProfileEditor` component, add the `Validators.required` static method as the second item in the array for the `firstName` control.

在 `ProfileEditor` 组件中，把静态方法 `Validators.required` 设置为 `firstName` 控件值数组中的第二项。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="required-validator" header="src/app/profile-editor/profile-editor.component.ts (required validator)">

</code-example>

HTML5 has a set of built-in attributes that you can use for native validation, including `required`, `minlength`, and `maxlength`. You can take advantage of these optional attributes on your form input elements. Add the `required` attribute to the `firstName` input element.

HTML5 有一组内置的属性，用来进行原生验证，包括 `required`、`minlength`、`maxlength` 等。虽然是*可选的*，不过你也可以在表单的输入元素上把它们添加为附加属性来使用它们。这里我们把 `required` 属性添加到 `firstName` 输入元素上。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="required-attribute" header="src/app/profile-editor/profile-editor.component.html (required attribute)"></code-example>

<div class="alert is-important">

**Caution:** Use these HTML5 validation attributes *in combination with* the built-in validators provided by Angular's reactive forms. Using these in combination prevents errors when the expression is changed after the template has been checked.

*注意：*这些 HTML5 验证器属性可以和 Angular 响应式表单提供的内置验证器*组合使用*。组合使用这两种验证器实践，可以防止在模板检查完之后表达式再次被修改导致的错误。

</div>

**Display form status**

**显示表单状态**

When you add a required field to the form control, its initial status is invalid. This invalid status propagates to the parent form group element, making its status invalid. Access the current status of the form group instance through its `status` property.

当你往表单控件上添加了一个必填字段时，它的初始值是无效的（invalid）。这种无效状态会传播到其父 `FormGroup` 元素中，也让这个 `FormGroup` 的状态变为无效的。你可以通过该 `FormGroup` 实例的 `status` 属性来访问其当前状态。

Display the current status of `profileForm` using interpolation.

使用插值显示 `profileForm` 的当前状态。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="display-status" header="src/app/profile-editor/profile-editor.component.html (display status)"></code-example>

<div class="lightbox">
  <img src="generated/images/guide/reactive-forms/profile-editor-3.png" alt="Profile Editor Validation">
</div>

The **Submit** button is disabled because `profileForm` is invalid due to the required `firstName` form control. After you fill out the `firstName` input, the form becomes valid and the **Submit** button is enabled.

提交按钮被禁用了，因为 `firstName` 控件的必填项规则导致了 `profileForm` 也是无效的。在你填写了 `firstName` 输入框之后，该表单就变成了有效的，并且提交按钮也启用了。

For more on form validation, visit the [Form Validation](guide/form-validation "All about form validation.") guide.

要了解表单验证的更多知识，参见[表单验证](guide/form-validation "关于表单验证。")指南。

{@a dynamic-forms}

## Creating dynamic forms

## 创建动态表单

`FormArray` is an alternative to `FormGroup` for managing any number of unnamed controls. As with form group instances, you can dynamically insert and remove controls from form array instances, and the form array instance value and validation status is calculated from its child controls. However, you don't need to define a key for each control by name, so this is a great option if you don't know the number of child values in advance.

`FormArray` 是 `FormGroup` 之外的另一个选择，用于管理任意数量的匿名控件。像 `FormGroup` 实例一样，你也可以往 `FormArray` 中动态插入和移除控件，并且 `FormArray` 实例的值和验证状态也是根据它的子控件计算得来的。
不过，你不需要为每个控件定义一个名字作为 key，因此，如果你事先不知道子控件的数量，这就是一个很好的选择。

To define a dynamic form, take the following steps.

要定义一个动态表单，请执行以下步骤。

1. Import the `FormArray` class.

   导入 `FormArray` 类。

2. Define a `FormArray` control.

   定义一个 `FormArray` 控件。

3. Access the `FormArray` control with a getter method.

   使用 getter 方法访问 `FormArray` 控件。

4. Display the form array in a template.

   在模板中显示这个表单数组。

The following example shows you how to manage an array of *aliases* in `ProfileEditor`.

下面的例子展示了如何在 `ProfileEditor` 中管理*别名*数组。

**Import the FormArray class**

**导入 FormArray 类**

Import the `FormArray` class from `@angular/forms` to use for type information. The `FormBuilder` service is ready to create a `FormArray` instance.

从 `@angular/form` 中导入 `FormArray`，以使用它的类型信息。`FormBuilder` 服务用于创建 `FormArray` 实例。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-array-imports" header="src/app/profile-editor/profile-editor.component.ts (import)">

</code-example>

**Define a FormArray control**

**定义 FormArray 控件**

You can initialize a form array with any number of controls, from zero to many, by defining them in an array. Add an `aliases` property to the form group instance for `profileForm` to define the form array.

你可以通过把一组（从零项到多项）控件定义在一个数组中来初始化一个 `FormArray`。为 `profileForm` 添加一个 `aliases` 属性，把它定义为 `FormArray` 类型。

Use the `FormBuilder.array()` method to define the array, and the `FormBuilder.control()` method to populate the array with an initial control.

使用 `FormBuilder.array()` 方法来定义该数组，并用 `FormBuilder.control()` 方法来往该数组中添加一个初始控件。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases" header="src/app/profile-editor/profile-editor.component.ts (aliases form array)">

</code-example>

The aliases control in the form group instance is now populated with a single control until more controls are added dynamically.

`FormGroup` 中的这个 `aliases` 控件现在管理着一个控件，将来还可以动态添加多个。

**Access the FormArray control**

**访问 FormArray 控件**

A getter provides easy access to the aliases in the form array instance compared to repeating the `profileForm.get()` method to get each instance. The form array instance represents an undefined number of controls in an array. It's convenient to access a control through a getter, and this approach is easy to repeat for additional controls.

相对于重复使用 `profileForm.get()` 方法获取每个实例的方式，getter 可以让你轻松访问表单数组各个实例中的别名。
表单数组实例用一个数组来代表未定数量的控件。通过 getter 来访问控件很方便，这种方法还能很容易地重复处理更多控件。

Use the getter syntax to create an `aliases` class property to retrieve the alias's form array control from the parent form group.

使用 getter 语法创建类属性 `aliases`，以从父表单组中接收表示绰号的表单数组控件。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases-getter" header="src/app/profile-editor/profile-editor.component.ts (aliases getter)">

</code-example>

<div class="alert is-helpful">

**Note:** Because the returned control is of the type `AbstractControl`, you need to provide an explicit type to access the method syntax for the form array instance.

*注意*：因为返回的控件的类型是 `AbstractControl`，所以你要为该方法提供一个显式的类型声明来访问 `FormArray` 特有的语法。

</div>

Define a method to dynamically insert an alias control into the alias's form array.
The `FormArray.push()` method inserts the control as a new item in the array.

定义一个方法来把一个绰号控件动态插入到绰号 `FormArray` 中。用 `FormArray.push()` 方法把该控件添加为数组中的新条目。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="add-alias" header="src/app/profile-editor/profile-editor.component.ts (add alias)">

</code-example>

In the template, each control is displayed as a separate input field.

在这个模板中，这些控件会被迭代，把每个控件都显示为一个独立的输入框。

**Display the form array in the template**

**在模板中显示表单数组**

To attach the aliases from your form model, you must add it to the template. Similar to the `formGroupName` input provided by `FormGroupNameDirective`, `formArrayName` binds communication from the form array instance to the template with `FormArrayNameDirective`.

要想为表单模型添加 `aliases`，你必须把它加入到模板中供用户输入。和 `FormGroupNameDirective` 提供的 `formGroupName` 一样，`FormArrayNameDirective` 也使用 `formArrayName` 在这个 `FormArray` 实例和模板之间建立绑定。

Add the template HTML below after the `<div>` closing the `formGroupName` element.

在 `formGroupName` `<div>` 元素的结束标签下方，添加一段模板 HTML。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="formarrayname" header="src/app/profile-editor/profile-editor.component.html (aliases form array template)"></code-example>

The `*ngFor` directive iterates over each form control instance provided by the aliases form array instance. Because form array elements are unnamed, you assign the index to the `i` variable and pass it to each control to bind it to the `formControlName` input.

`*ngFor` 指令对 `aliases` `FormArray` 提供的每个 `FormControl` 进行迭代。因为 `FormArray` 中的元素是匿名的，所以你要把*索引号*赋值给 `i` 变量，并且把它传给每个控件的 `formControlName` 输入属性。

<div class="lightbox">
  <img src="generated/images/guide/reactive-forms/profile-editor-4.png" alt="Profile Editor Aliases">
</div>

Each time a new alias instance is added, the new form array instance is provided its control based on the index. This allows you to track each individual control when calculating the status and value of the root control.

每当新的 `alias` 加进来时，`FormArray` 的实例就会基于这个索引号提供它的控件。这将允许你在每次计算根控件的状态和值时跟踪每个控件。

**Add an alias**

**添加一个别名**

Initially, the form contains one `Alias` field. To add another field, click the **Add Alias** button. You can also validate the array of aliases reported by the form model displayed by `Form Value` at the bottom of the template.

最初，表单只包含一个绰号字段，点击 `Add Alias` 按钮，就出现了另一个字段。你还可以验证由模板底部的“Form Value”显示出来的表单模型所报告的这个绰号数组。

<div class="alert is-helpful">

**Note:** Instead of a form control instance for each alias, you can compose another form group instance with additional fields. The process of defining a control for each item is the same.

*注意*：除了为每个绰号使用 `FormControl` 之外，你还可以改用 `FormGroup` 来组合上一些额外字段。对其中的每个条目定义控件的过程和前面没有区别。

</div>

{@a reactive-forms-api}

## Reactive forms API summary

## 响应式表单 API 汇总

The following table lists the base classes and services used to create and manage reactive form controls.
For complete syntax details, see the API reference documentation for the [Forms package](api/forms "API reference.").

下表给出了用于创建和管理响应式表单控件的基础类和服务。要了解完整的语法，请参阅 API 文档中的 [Forms 包](api/forms "API 参考。")。

#### Classes

#### 类

<table>

  <tr>

    <th>

      Class

      类

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

      The abstract base class for the concrete form control classes `FormControl`, `FormGroup`, and `FormArray`. It provides their common behaviors and properties.

      所有三种表单控件类（`FormControl`、`FormGroup` 和 `FormArray`）的抽象基类。它提供了一些公共的行为和属性。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormControl</code>

    </td>

    <td>

      Manages the value and validity status of an individual form control. It corresponds to an HTML form control such as `<input>` or `<select>`.

      管理单体表单控件的值和有效性状态。它对应于 HTML 的表单控件，比如 `<input>` 或 `<select>`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroup</code>

    </td>

    <td>

      Manages the value and validity state of a group of `AbstractControl` instances. The group's properties include its child controls. The top-level form in your component is `FormGroup`.

      管理一组 `AbstractControl` 实例的值和有效性状态。该组的属性中包括了它的子控件。组件中的顶层表单就是 `FormGroup`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormArray</code>

    </td>

    <td>

    Manages the value and validity state of a numerically indexed array of `AbstractControl` instances.

    管理一些 `AbstractControl` 实例数组的值和有效性状态。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormBuilder</code>

    </td>

    <td>

      An injectable service that provides factory methods for creating control instances.

      一个可注入的服务，提供一些用于提供创建控件实例的工厂方法。

    </td>

  </tr>

</table>

#### Directives

#### 指令

<table>

  <tr>

    <th>

      Directive

      指令

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormControlDirective</code>

    </td>

    <td>

      Syncs a standalone `FormControl` instance to a form control element.

      把一个独立的 `FormControl` 实例绑定到表单控件元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormControlName</code>

    </td>

    <td>

      Syncs `FormControl` in an existing `FormGroup` instance to a form control element by name.

      把一个现有 `FormGroup` 中的 `FormControl` 实例根据名字绑定到表单控件元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroupDirective</code>

    </td>

    <td>

      Syncs an existing `FormGroup` instance to a DOM element.

      把一个现有的 `FormGroup` 实例绑定到 DOM 元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroupName</code>

    </td>

    <td>

      Syncs a nested `FormGroup` instance to a DOM element.

      把一个内嵌的 `FormGroup` 实例绑定到一个 DOM 元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormArrayName</code>

    </td>

    <td>

      Syncs a nested `FormArray` instance to a DOM element.

      把一个内嵌的 `FormArray` 实例绑定到一个 DOM 元素。

    </td>

  </tr>

</table>
