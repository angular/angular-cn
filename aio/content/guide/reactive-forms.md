# Reactive forms

# 响应式表单

_Reactive forms_ provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a simple form control, progress to using multiple controls in a group, validate form values, and implement more advanced forms.

*响应式表单*提供了一种模型驱动的方式来处理表单输入，其中的值会随时间而变化。本文会向你展示如何创建和更新单个表单控件，然后在一个分组中使用多个控件，验证表单的值，以及如何实现更高级的表单。

{@a toc}

Try the <live-example title="Reactive Forms in Stackblitz">Reactive Forms live-example</live-example>.

试试<live-example title="Reactive Forms in Stackblitz">响应式表单的在线例子</live-example>。

{@a intro}

## Introduction to reactive forms

## 响应式表单简介

Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. Reactive forms are built around observable streams, where form inputs and values are provided as streams of input values, also while giving you synchronous access to the data. This approach allows your templates to take advantage of these streams of form state changes, rather than to be dependent to them.

响应式表单使用显式的、不可变的方式，管理表单在特定的时间点上的状态。对表单状态的每一次变更都会返回一个新的状态，这样可以在变化时维护模型的整体性。响应式表单是围绕 Observable 的流构建的，表单的输入和值都是通过这些输入值组成的流来提供的，同时，也赋予你对数据进行同步访问的能力。这种方式允许你的模板利用这些表单的“状态变更流”，而不必依赖它们。

Reactive forms also allow for easier testing because you have an assurance that your data is consistent and predictable when requested. Consumers outside your templates have access to the same streams, where they can manipulate that data safely.

响应式表单还让你能更简单的进行测试，因为在请求的那一刻你可以确信这些数据是一致的、可预料的。模板之外的消费方也可以访问同样的流，它们可以安全地操纵这些数据。

Reactive forms differ from template-driven forms in distinct ways. Reactive forms provide more predictability with synchronous access to the data model, immutability with observable operators, and change tracking through observable streams. If you prefer direct access to modify data in your template, template-driven forms are less explicit because they rely on directives embedded in the template, along with mutable data to track changes asynchronously. See the [Appendix](#appendix) for detailed comparisons between the two paradigms.

响应式表单与模板驱动的表单有着显著的不同点。响应式表单通过对数据模型的同步访问提供了更多的可预测性，使用 Observable 的操作符提供了不可变性，并且通过 Observable 流提供了变化追踪功能。
如果你更喜欢在模板中直接访问数据，那么模板驱动的表单会显得更明确，因为它们依赖嵌入到模板中的指令，并借助可变数据来异步跟踪变化。参见[附录](#appendix)来了解这两种范式之间的详细比较。

## Getting started

## 快速起步

This section describes the key steps to add a single form control. The example allows a user to enter their name into an input field, captures that input value, and displays the current value of the form control element.

本节描述了添加单个表单控件的一些关键步骤。这里的例子允许用户在输入框中输入自己的名字，捕获输入的值，并把表单控件元素的当前值显示出来。

### Step 1 - Register the `ReactiveFormsModule`

### 步骤 1 - 注册 `ReactiveFormsModule`

To use reactive forms, import `ReactiveFormsModule` from the `@angular/forms` package and add it to your NgModule's `imports` array.

要使用响应式表单，就要从 `@angular/forms` 包中导入 `ReactiveFormsModule` 并把它添加到你的 NgModule 的 `imports` 数组中。

<code-example path="reactive-forms/src/app/app.module.ts" region="imports" title="src/app/app.module.ts (excerpt)">

</code-example>

### Step 2 - Import and create a new form control 

### 步骤 2 - 导入并创建一个新的表单控件

Generate a component for the control.

为该控件生成一个组件。

<code-example language="sh" class="code-shell">

  ng generate component NameEditor

</code-example>

The `FormControl` is the most basic building block when using reactive forms. To register a single form control, import the `FormControl` class into your component and create a new instance of `FormControl` to save as a class property.

当使用响应式表单时，`FormControl` 是最基本的构造块。要注册单个的表单控件，请在组件中导入 `FormControl` 类，并创建一个 `FormControl` 的新实例，把它保存在类的某个属性中。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.ts" region="create-control" title="src/app/name-editor/name-editor.component.ts">

</code-example>

The constructor of the `FormControl` can be used to set its initial value, which in this case is set to an empty string. By creating these controls in your component class, you get immediate access to listen, update, and validate the state of the form input. 

`FormControl` 的构造函数可以设置初始值，这个例子中它是空字符串。通过在你的组件类中创建这些控件，你可以直接对表单控件的状态进行监听、修改和校验。

### Step 3 - Register the control in the template

### 步骤 3 - 在模板中注册该控件

After you create the control in the component class, you must associate it with a form control element in the template. Update the template with the form control using the `formControl` binding provided by the `FormControlDirective` included in the `ReactiveFormsModule`.

在组件类中创建了控件之后，你还要把它和模板中的一个表单控件关联起来。修改模板，为表单控件添加 `formControl` 绑定，`formControl` 是由 `ReactiveFormsModule` 中的 `FormControlDirective` 提供的。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.html" region="control-binding" linenums="false" title="src/app/name-editor/name-editor.component.html">

</code-example>

<div class="alert is-helpful">

*Note*: For a more detailed list of classes and directives provided by the `ReactiveFormsModule`, see the [Reactive Forms API](#reactive-forms-api) section.

*注意*：要了解 `ReactiveFormsModule` 提供的更多类和指令，请参见 [响应式表单 API](#reactive-forms-api) 一节。

</div>

Using the template binding syntax, the form control is now registered to the `name` input element in the template. The form control and DOM element communicate with each other: the view reflects changes in the model, and the model reflects changes in the view.

使用这种模板绑定语法，把该表单控件注册给了模板中名为 `name` 的输入元素。这样，表单控件和 DOM 元素就可以互相通讯了：视图会反映模型的变化，模型也会反映视图中的变化。

#### Display the component

#### 显示组件

The `FormControl` assigned to `name` is displayed once the component is added to a template. 

一旦把该组件添加到模板中，指派给 `name` 的 `FormControl` 就会显示出来。

<code-example path="reactive-forms/src/app/app.component.1.html" region="app-name-editor" linenums="false" title="src/app/app.component.html (name editor)">

</code-example>

<figure>
  <img src="generated/images/guide/reactive-forms/name-editor-1.png" alt="Name Editor">
</figure>

## Managing control values

## 管理控件的值

Reactive forms give you access to the form control state and value at a point in time. You can manipulate 
the current state and value through the component class or the component template. The following examples display the value of a `FormControl` and change it.

响应式表单让你可以访问表单控件此刻的状态和值。你可以通过组件类或组件模板来操纵其当前状态和值。下面的例子会显示及修改 `FormConrol` 的值。

{@a display-value}

### Display the control’s value

### 显示控件的值

Every `FormControl` provides its current value as an observable through the `valueChanges` property. You can listen to changes in the form’s value in the template using the `AsyncPipe` or in the component class using the `subscribe()` method. The `value` property also gives you a snapshot of the current value. 

每个 `FormControl` 都会通过一个名叫 `valueChanges` 的 Observable 型属性提供它的当前值。你可以在模板中使用 `AsyncPipe` 来监听模板中表单值的变化，或者在组件类中使用 `subscribe()` 方法来监听。`value` 属性也可以给你提供当前值的一个快照。

Display the current value using interpolation in the template as shown in the following example.

可以在模板中使用插值表达式来显示当前值，代码如下：

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.html" region="display-value" linenums="false" title="src/app/name-editor/name-editor.component.html (control value)">

</code-example>

The displayed value changes as you update the form control element.

一旦你修改了表单控件所关联的元素，这里显示的值也跟着变化了。

Reactive forms also provide access to more information about a given control through properties and methods provided with each instance. These properties and methods of the underlying [AbstractControl](api/forms/AbstractControl) are used to control form state and determine when to display messages when handling validation. For more information, see [Simple Form Validation](#simple-form-validation) later in this guide.

响应式表单还能通过每个实例的属性和方法提供关于特定控件的更多信息。[AbstractControl](api/forms/AbstractControl) 的这些属性和方法用于控制表单状态，并在处理表单校验时决定何时显示信息。
欲知详情，参见稍后的[简单表单验证](#simple-form-validation)一节。

Read about other `FormControl` properties and methods in the [Reactive Forms API](#reactive-forms-api) section.

要了解 `FormControl` 的其它属性和方法，参见[响应式表单 API](#reactive-forms-api)一节。

### Replace the form control value

### 替换表单控件的值

Reactive forms have methods to change a control's value programmatically, which gives you the flexibility to update the control’s value without user interaction. The `FormControl` provides a `setValue()` method which updates the value of the form control and validates the structure of the value provided against the control’s structure. For example, when retrieving form data from a backend API or service, use the `setValue()` method to update the control to its new value, replacing the old value entirely. 

响应式表单还有一些方法可以用编程的方式修改控件的值，它让你可以灵活的修改控件的值而不需要借助用户交互。`FormControl` 提供了一个 `setValue()` 方法，它会修改这个表单控件的值，并且验证与控件结构相对应的值的结构。比如，当从后端 API 或服务接收到了表单数据时，可以通过 `setValue()` 方法来把原来的值替换为新的值。

The following example adds a method to the component class to update the value of the control to _Nancy_ using the `setValue()` method.

下列的例子往组件类中添加了一个方法，它使用 `setValue()` 方法来修改 *Nancy* 控件的值。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.ts" region="update-value" title="src/app/name-editor/name-editor.component.ts (update value)">

</code-example>

Update the template with a button to simulate a name update. Any value entered in the form control element before clicking the `Update Name` button will be reflected as its current value. 

修改模板，添加一个按钮，用于模拟改名操作。在点 `Update Name` 按钮之前表单控件元素中输入的任何值都会回显为它的当前值。

<code-example path="reactive-forms/src/app/name-editor/name-editor.component.html" region="update-value" linenums="false" title="src/app/name-editor/name-editor.component.html (update value)">

</code-example>

Because the form model is the source of truth for the control, when you click the button the value of the input is also changed within the component class, overriding its current value.

由于表单模型中才是该控件真正的源头，因此当你单击该按钮时，组件中该输入框的值也变化了，覆盖掉它的当前值。

<figure>
  <img src="generated/images/guide/reactive-forms/name-editor-2.png" alt="Name Editor Update">
</figure>

<div class="alert is-helpful">

*Note*: In this example, you are only using a single control, but when using the `setValue()` method with a `FormGroup` or `FormArray` the value needs to match the structure of the group or array.

*注意*：在这个例子中，你只使用单个控件，但是当调用 `FormGroup` 或 `FormArray` 的 `setValue()` 方法时，传入的值就必须匹配控件组或控件数组的结构才行。

</div>

## Grouping form controls

## 把表单控件分组

Just as a `FormControl` instance gives you control over a single input field, a `FormGroup` tracks the form state of a group of `FormControl` instances (for example, a form). Each control in `FormGroup` is tracked by name when creating the `FormGroup`. The following example shows how to manage multiple `FormControl` instances in a single group.

正如 `FormControl` 的实例能让你控制单个输入框所对应的控件，`FormGroup` 可以跟踪一组 `FormControl` 实例（比如一个表单）的表单状态。当创建 `FormGroup` 时，其中的每个控件都会根据其名字进行跟踪。下列例子展示了如何管理单个控件组中的多个 `FormControl` 实例。

Generate a `ProfileEditor` component and import the `FormGroup` and `FormControl` classes from the `@angular/forms` package.

生成一个 `ProfileEditor` 组件并从 `@angular/forms` 包中导入 `FormGroup` 和 `FormControl` 类。

<code-example language="sh" class="code-shell">

  ng generate component ProfileEditor

</code-example>

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="imports" title="src/app/profile-editor/profile-editor.component.ts (imports)">

</code-example>

### Step 1 - Create a `FormGroup`

### 步骤 1 - 创建 `FormGroup`

Create a property in the component class named `profileForm` and set the property to a new instance of a `FormGroup`. To initialize the `FormGroup`, provide the constructor with an object of controls with their respective names. 

在组件类中创建一个名叫 `profileForm` 的属性，并设置为 `FormGroup` 的一个新实例。要初始化这个 `FormGroup`，请为构造函数提供一个由控件组成的对象，对象中的每个名字都要和表单控件的名字一一对应。

For the profile form, add two `FormControl` instances with the names `firstName` and `lastName`.

对此个人档案表单，要添加两个 `FormControl` 实例，名字分别为 `firstName` 和 `lastName`。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup" title="src/app/profile-editor/profile-editor.component.ts (form group)">

</code-example>

The individual form controls are now collected within a group. The `FormGroup` provides its model value as an object reduced from the values of each control in the group. A `FormGroup` instance has the same properties (such as `value`, `untouched`) and methods (such as `setValue()`) as a `FormControl` instance.

现在，这些独立的表单控件被收集到了一个控件组中。这个 `FormGroup` 用对象的形式提供了它的模型值，这个值来自组中每个控件的值。
`FormGroup` 实例拥有和 `FormControl` 实例相同的属性（比如 `value`、`untouched`）和方法（比如 `setValue()`）。

### Step 2 - Associate the `FormGroup` model and view

### 步骤 2 - 关联 `FormGroup` 的模型和视图

The `FormGroup` also tracks the status and changes of each of its controls, so if one of the control’s status or value changes, the parent control also emits a new status or value change. The model for the group is maintained from its members. After you define the model, you must  update the template to reflect the model in the view.

这个 `FormGroup` 还能跟踪其中每个控件的状态及其变化，所以如果其中的某个控件的状态或值变化了，父控件也会发出一次新的状态变更或值变更事件。该控件组的模型来自它的所有成员。在定义了这个模型之后，你必须更新模板，来把该模型反映到视图中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroup" linenums="false" title="src/app/profile-editor/profile-editor.component.html (template form group)">

</code-example>

Note that just as the `FormGroup` contains a group of controls, the _profileForm_ `FormGroup` is bound to the `form` element with the `FormGroup` directive, creating a communication layer between the model and the form containing the inputs. The `formControlName` input provided by the `FormControlName` directive binds each individual input to the form control defined in the `FormGroup`. The form controls communicate with their respective elements. The also communicate changes to the `FormGroup`, which provides the source of truth for the model value.

注意，就像 `FormGroup` 所包含的那控件一样，*profileForm* 这个 `FormGroup` 也通过 `FormGroup` 指令绑定到了 `form` 元素，在该模型和表单中的输入框之间创建了一个通讯层。
由 `FormControlName` 指令提供的 `formControlName` 属性把每个输入框和 `FormGroup` 中定义的表单控件绑定起来。这些表单控件会和相应的元素通讯，它们还把更改传递给 `FormGroup`，这个 `FormGroup` 是模型值的真正源头。

### Save form data

### 保存表单数据

The `ProfileEditor` component takes input from the user, but in a real scenario you want to capture the form value for further processing outside the component. The `FormGroup` directive listens for the `submit` event emitted by the `form` element and emits an `ngSubmit` event that you can bind to a callback function. 

`ProfileEditor` 组件从用户那里获得输入，但在真实的场景中，你可能想要先捕获表单的值，等将来在组件外部进行处理。
`FormGroup` 指令会监听 `form` 元素发出的 `submit` 事件，并发出一个 `ngSubmit` 事件，让你可以绑定一个回调函数。

Add an `ngSubmit` event listener to the `form` tag with the `onSubmit()` callback method.

把 `onSubmit()` 回调方法添加为 `form` 标签上的 `ngSubmit` 事件监听器。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="ng-submit" linenums="false" title="src/app/profile-editor/profile-editor.component.html (submit event)">

</code-example>

The `onSubmit()` method in the `ProfileEditor` component captures the current value of the `profileForm`. To keep the form encapsulated, to provide the form value outside the component, use an `EventEmitter`. The following example uses `console.warn` to log to the browser console.

`ProfileEditor` 组件上的 `onSubmit()` 方法会捕获 `profileForm` 的当前值。要保持该表单的封装性，就要使用 `EventEmitter` 向组件外部提供该表单的值。下面的例子会使用 `console.warn` 把这个值记录到浏览器的控制台中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="on-submit" title="src/app/profile-editor/profile-editor.component.ts (submit method)">

</code-example>

The `submit` event is emitted by the `form` tag using the native DOM event. You trigger the event by clicking a button with `submit` type. This allows the user to use the enter key to trigger submission after filling out the form. 

`form` 标签所发出的 `submit` 事件是原生 DOM 事件，通过点击类型为 `submit` 的按钮可以触发本事件。这还让用户可以在填写完表单之后使用回车键来触发提交。

Add a `button` to the bottom of the form to trigger the form submission.

往表单的底部添加一个 `button`，用于触发表单提交。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="submit-button" linenums="false" title="src/app/profile-editor/profile-editor.component.html (submit button)">

</code-example>

<div class="alert is-helpful">

*Note:* The button in the snippet above also has a `disabled` binding attached to it to disable the button when the `profileForm` is invalid. You aren't performing any validation yet, so the button is always enabled. Simple form validation is covered later in the [Form Validation](#simple-form-validation) section.

*注意：*上面这个代码片段中的按钮还附加了一个 `disabled` 绑定，用于在 `profileForm` 无效时禁用该按钮。目前你还没有执行任何表单验证逻辑，因此该按钮始终是可用的。稍后的[表单验证](#simple-form-validation)一节会讲解简单的表单验证。

</div>

#### Display the component

#### 显示组件

The `ProileEditor` component that contains the form is displayed when added to a component template.

当添加到组件模板中时，`ProfileEditor` 组件所包含的表单就显示出来了。

<code-example path="reactive-forms/src/app/app.component.1.html" region="app-profile-editor" linenums="false" title="src/app/app.component.html (profile editor)">

</code-example>

The `ProfileEditor` allows you to manage the `FormControl` instances for the `firstName` and `lastName` controls within the `FormGroup`.

`ProfileEditor` 让你能管理 `FormGroup` 中的 `firstName` 和 `lastName` 等 `FormControl` 实例。

<figure>
  <img src="generated/images/guide/reactive-forms/profile-editor-1.png" alt="Profile Editor">
</figure>

## Nesting form groups

## 嵌套的表单组

When building complex forms, managing the different areas of information is easier in smaller sections, and some groups of information naturally fall into the same group. Using a nested `FormGroup` allows you to break large forms groups into smaller, more manageable ones.

如果要构建复杂的表单，如果能在更小的分区中管理不同类别的信息就会更容易一些，而有些信息分组可能会自然的汇入另一个更大的组中。使用嵌套的 `FormGroup` 可以让你把大型表单组织成一些稍小的、易管理的分组。

### Step 1 - Create a nested group

### 步骤 1 - 创建嵌套的分组

An address is a good example of information that can be grouped together. A `FormGroup` can accept both `FormControl` and `FormGroup` instances as children. This makes composing complex form models easier to maintain and logically group together. To create a nested group in the `profileForm`, add a nested `address` `FormGroup`.

“地址”就是可以把信息进行分组的绝佳范例。`FormGroup` 可以同时接纳 `FormControl` 和 `FormGroup` 作为子控件。这使得那些比较复杂的表单模型可以更易于维护、更有逻辑性。要想在 `profileForm` 中创建一个嵌套的分组，请添加一个内嵌的名叫 `address` 的 `FormGroup`。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="nested-formgroup" linenums="false" title="src/app/profile-editor/profile-editor.component.ts (nested form group)">

</code-example>

In this example, the `address group` combines the current `firstName` and `lastName` controls with the new `street`, `city`, `state` and `zip` controls. Even though the `address` `FormGroup` is a child of the overall `profileForm` `FormGroup`, the same rules still apply with value and status changes. Changes in status and value from the nested form group will propagate up to the parent form group, maintaining consistency with the overall model.

在这个例子中，`address group` 把现有的 `firstName`、`lastName` 控件和新的 `street`、`city`、`state` 和 `zip` 控件组合在一起。虽然 `address` 这个 `FormGroup` 是 `profileForm` 这个整体 `FormGroup` 的一个子控件，但是仍然适用同样的值和状态的变更规则。来自内嵌控件组的状态和值的变更将会冒泡到它的父控件组，以维护整体模型的一致性。

### Step 2 - Group the nested form in the template

### 步骤 2 - 在模板中分组内嵌的表单

After you update the model in the component class, update the template to connect the `FormGroup` instance and its input elements.

在修改了组件类中的模型之后，还要修改模板，来把这个 `FormGroup` 实例对接到它的输入元素。

Add the `address` form group containing the `firstName` and `lastName` fields to the `ProfileEditor` template.

把包含 `firstName` 和 `lastName` 字段的 `address` 表单组添加到 `ProfileEditor` 模板中。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="formgroupname" linenums="false" title="src/app/profile-editor/profile-editor.component.html (template nested form group)">

</code-example>

The `ProfileEditor` form is displayed as one group, but the model is broken down further to represent the logical grouping areas.

`ProfileEditor` 表单显示为一个组，但是将来这个模型会被进一步细分，以表示逻辑分组区域。

<figure>
  <img src="generated/images/guide/reactive-forms/profile-editor-2.png" alt="Profile Editor Update">
</figure>

<div class="alert is-helpful">

*Note*: Display the value for the `FormGroup` in the component template using the `value` property and the `JsonPipe`.

*注意*：这里使用了 `value` 属性和 `JsonPipe` 管道在组件模板中显示了这个 `FormGroup` 的值。

</div>

## Partial model updates

## 部分模型更新

When updating the value for a `FormGroup` that contains multiple controls, you may only want to update parts of the model instead of replacing its entire value. This section covers how to update specific parts of an `AbstractControl` model.

当修改包含多个控件的 `FormGroup` 的值时，你可能只希望更新模型中的一部分，而不是完全替换掉。这一节会讲解该如何更新 `AbstractControl` 模型中的一部分。

### Patch the model value

### 修补（Patch）模型值

With a single control, you used the `setValue()` method to set the new value for an individual control. The `setValue()` method is more strict about adhering to the structure of the `FormGroup` and replaces the entire value for the control. The `patchValue()` method is more forgiving; it only replaces properties defined in the object that have changed in the form model, because you’re only providing partial updates. The strict checks in `setValue()` help catch errors in the nesting of complex forms, while `patchValue()` will fail silently in those cases.

对单个控件，你会使用 `setValue()` 方法来该控件设置新值。但当应用到 `FormGroup` 并打算整体设置该控件的值时，`setValue()` 方法会受到这个 `FormGroup` 结构的很多约束。`patchValue()` 方法就宽松多了，它只会替换表单模型中修改过的那些属性，因为你只想提供部分修改。`setValue()` 中严格的检查可以帮你捕获复杂表单嵌套时可能出现的错误，而 `patchValue()` 将会默默地走向失败。

In the `ProfileEditorComponent`, the `updateProfile` method with the following example below to update the first name and street address for the user.

在 `ProfileEditorComponent` 中，如下 `updateProfile` 方法会为该用户修改名字和街道地址。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="patch-value" title="src/app/profile-editor/profile-editor.component.ts (patch value)">

</code-example>

Simulate an update by adding a button to the template to update the user profile on demand.

通过往模板中添加一个按钮来模拟一次更新操作，以修改用户档案。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.1.html" region="patch-value" linenums="false" title="src/app/profile-editor/profile-editor.component.html (update value)">

</code-example>

When the button is clicked, the `profileForm` model is updated with just the `firstName` and `street` being modified. Notice that the `street` is provided in an object inside the `address` property. This is necessary because the `patchValue()` method applies the update against the model structure. `PatchValue()` only updates properties that the form model defines.

当点击按钮时，`profileForm` 模型中只有 `firstName` 和 `street` 被修改了。注意，`street` 是在 `address` 属性的对象中被修改的。这种结构是必须的，因为 `patchValue()` 方法要针对模型的结构进行更新。`patchValue()` 只会更新表单模型中所定义的那些属性。

## Generating form controls with `FormBuilder`

## 使用 `FormBuilder` 来生成表单控件

Creating multiple form control instances manually can become very repetitive when dealing with multiple forms. The `FormBuilder` service provides convenience methods to handle generating controls. Underneath, the `FormBuilder` is creating and returning the instances in the same manner, but with much less work. The following section refactors the `ProfileEditor` component to use the `FormBuilder` instead of creating each `FormControl` and `FormGroup` by hand.

当需要与多个表单打交道时，手动创建多个表单控件实例会非常繁琐。`FormBuilder` 服务提供了一些便捷方法来生成表单控件。`FormBuilder` 在幕后也使用同样的方式来创建和返回这些实例，只是用起来更简单。
下面的小节中会重构 `ProfileEditor` 组件，用 `FormBuilder` 来代替手工创建这些 `FormControl` 和 `FormGroup`。

### Step 1 - Import the `FormBuilder` class

### 步骤 1 - 导入 `FormBuilder` 类

To use the `FormBuilder` service, import its class from the `@angular/forms` package.

要想使用 `FormBuilder` 服务，请从 `@angular/forms` 包中导入它的类。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder-imports" title="src/app/profile-editor/profile-editor.component.ts (import)">

</code-example>

### Step 2 - Inject the `FormBuilder` service

### 步骤 2 - 注入 `FormBuilder` 服务

The FormBuilder is an injectable service that is provided with the `ReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

FormBuilder 是一个可注入的服务，它是由 `ReactiveFormModule` 提供的。只要把它添加到组件的构造函数中就可以注入这个依赖。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="inject-form-builder" title="src/app/profile-editor/profile-editor.component.ts (constructor)">

</code-example>

### Step 3 - Generate form controls

### 步骤 3 - 生成表单控件

The `FormBuilder` service has three methods: `control()`, `group()`, and `array()`. These methods are factory methods for generating form controls in your component class including a `FormControl`, `FormGroup`, and `FormArray` respectively. 

`FormBuilder` 服务有三个方法：`control()`、`group()` 和 `array()`。这些方法都是工厂方法，用于在组件类中分别生成 `FormControl`、`FormGroup` 和 `FormArray`。

Replace the creation of the `profileForm` by using the `group` method to create the controls.

把生成 `profileForm` 的代码改为用 `group` 方法来创建这些控件。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-builder" title="src/app/profile-editor/profile-editor.component.ts (form builder)">

</code-example>

In the example above, you use the `group()` method with the same names to define the properties in the model. Here, the value for each control name is an array containing the initial value as the first item.

在上面的例子中，你可以使用 `group()` 方法，用和前面一样的名字来定义这些属性。这里，每个控件名对应的值都是一个数组，这个数组中的第一项是其初始值。

<div class="alert is-helpful">

*Note*: You can define the control with just the initial value, but if your controls need sync or async validation, add sync and async validators as the second and third items in the array.

*注意*：你可以只使用初始值来定义控件，但是如果你的控件还需要同步或异步验证器，那就在这个数组中的第二项和第三项提供同步和异步验证器。

</div>

Compare the two paths to achieve the same result.

这两种方式达成了相同的效果。

<code-tabs>

  <code-pane path="reactive-forms/src/app/profile-editor/profile-editor.component.1.ts" region="formgroup-compare" title="src/app/profile-editor/profile-editor.component.ts (instances)">

  </code-pane>

  <code-pane path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="formgroup-compare" title="src/app/profile-editor/profile-editor.component.ts (form builder)">

  </code-pane>

</code-tabs>

## Simple form validation

## 简单表单验证

Form validation is necessary when receiving user input through forms. This section covers adding a single validator to a form control and displaying the overall form status. Form validation is covered more extensively in the [Form Validation](guide/form-validation) guide.

当通过表单接收用户输入时，表单验证是必要的。本节讲解了如何把单个验证器添加到表单控件中，以及如何显示表单的整体状态。表单验证的更多知识在[表单验证](guide/form-validation)一章中有详细的讲解。

### Step 1 - Import a validator function

### 步骤 1 - 导入验证器函数

Reactive forms include a set of validator functions out of the box for common use cases. These functions receive a control to validate against and return an error object or null based on the validation check.

响应式表单包含了一组开箱即用的常用验证器函数。这些函数接收一个控件，用以验证并根据验证结果返回一个错误对象或空值。

Import the `Validators` class from the `@angular/forms` package.

从 `@angular/forms` 包中导入 `Validators` 类。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="validator-imports" title="src/app/profile-editor/profile-editor.component.ts (import)">

</code-example>

### Step 2 - Make a field required

### 步骤 2 - 把字段设为必填（required）

The most common validation is making a field required. This section describes how to add a required validation to the `firstName` control.

最常见的校验项是把一个字段设为必填项。本节描述如何为 `firstName` 控件添加“必填项”验证器。

In the `ProfileEditor` component, add the `Validators.required` static method as the second item in the array for the `firstName` control.

在 `ProfileEditor` 组件中，把静态方法 `Validators.required` 设置为 `firstName` 控件值数组中的第二项。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="required-validator" title="src/app/profile-editor/profile-editor.component.ts (required validator)">

</code-example>

HTML5 has a set of built-in attributes that can be used for native validation, including `required`, `minlength`, `maxlength`, and more. Although _optional_, you can take advantage of these as additional attributes on your form input elements. Add the `required` attribute to the `firstName` input element.

HTML5 有一组内置的属性，用来进行原生验证，包括 `required`、`minlength`、`maxlength` 等。虽然是*可选的*，不过你也可以在表单的输入元素上把它们添加为附加属性来使用它们。这里我们把 `required` 属性添加到 `firstName` 输入元素上。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="required-attribute" linenums="false" title="src/app/profile-editor/profile-editor.component.html (required attribute)">

</code-example>

<div class="alert is-important">

*Note:* These HTML5 validation attributes should be used _in combination with_ the built-in validators provided by Angular's reactive forms. Using these two validation practices in combination prevents errors about the expression being changed after the template has been checked.

*注意：*这些 HTML5 验证器属性可以和 Angular 响应式表单提供的内置验证器*组合使用*。组合使用这两种验证器实践，可以防止在模板检查完之后表达式再次被修改导致的错误。

</div>

### Display form status

### 显示表单状态

Now that you’ve added a required field to the form control, its initial status is invalid. This invalid status propagates to the parent `FormGroup`, making its status invalid. You have access to the current status of the `FormGroup` through the `status` property on the instance.

现在，你已经往表单控件上添加了一个必填字段，它的初始值是无效的（invalid）。这种无效状态冒泡到其父 `FormGroup` 中，也让这个 `FormGroup` 的状态变为无效的。你可以通过该 `FormGroup` 实例的 `status` 属性来访问其当前状态。

Display the current status of the `profileForm` using interpolation.

使用插值表达式显示 `profileForm` 的当前状态。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="display-status" linenums="false" title="src/app/profile-editor/profile-editor.component.html (display status)">

</code-example>

<figure>
  <img src="generated/images/guide/reactive-forms/profile-editor-3.png" alt="Profile Editor Validation">
</figure>

The submit button is disabled because the `profileForm` is invalid due to the required `firstName` form control. After you fill out the `firstName` input, the form becomes valid and the submit button is enabled.

提交按钮被禁用了，因为 `firstName` 控件的必填项规则导致了 `profileForm` 也是无效的。在你填写了 `firstName` 输入框之后，该表单就变成了有效的，并且提交按钮也启用了。

For more on form validation, visit the [Form Validation](guide/form-validation) guide.

要了解表单验证的更多知识，参见[表单验证](guide/form-validation)一章。

## Dynamic controls using form arrays

## 使用表单数组管理动态控件

A `FormArray` is an alternative to a `FormGroup` for managing  any number of unnamed controls. As with `FormGroup` instances, you can dynamically insert and remove controls from a `FormArray`, and the `FormArray` instance's value and validation status is calculated from its child controls. However, you don't need to define a key for each control by name, so this is a great option if you don't know the number of child values in advance. The following example shows you how to manage an array of _aliases_ in the `ProfileEditor`.

`FormArray` 是 `FormGroup` 之外的另一个选择，用于管理任意数量的匿名控件。像 `FormGroup` 实例一样，你也可以往 `FormArray` 中动态插入和移除控件，并且 `FormArray` 实例的值和验证状态也是根据它的子控件计算得来的。
不过，你不需要为每个控件定义一个名字作为 key，因此，如果你事先不知道子控件的数量，这就是一个很好的选择。下面的例子展示了如何在 `ProfileEditor` 中管理一组*绰号*（aliases）。

### Step 1 - Import the `FormArray`

### 步骤 1 - 导入 `FormArray`

Import the `FormArray` class from `@angular/forms` to use for type information. The `FormBuilder` service is ready to create a `FormArray` instance.

从 `@angular/form` 中导入 `FormArray`，以使用它的类型信息。`FormBuilder` 服务用于创建 `FormArray` 实例。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.2.ts" region="form-array-imports" title="src/app/profile-editor/profile-editor.component.ts (import)">

</code-example>

### Step 2 - Define a `FormArray`

### 步骤 2 - 定义 `FormArray`

You can initialize a `FormArray` with any number of controls, from zero to many, by defining them in an array. Add an `aliases` property to the `FormGroup` for the `profileForm` to define the `FormArray`.

你可以通过把一组（从零项到多项）控件定义在一个数组中来初始化一个 `FormArray`。为 `profileForm` 添加一个 `aliases` 属性，把它定义为 `FormArray` 类型。

Use the `FormBuilder.array()` method to define the array, and the `FormBuilder.control()` method to populate the array with an initial control.

使用 `FormBuilder.array()` 方法来定义该数组，并用 `FormBuilder.control()` 方法来往该数组中添加一个初始控件。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases" title="src/app/profile-editor/profile-editor.component.ts (aliases form array)">

</code-example>

The _aliases_ control in the `FormGroup` is now populated with a single control until more are added dynamically.

`FormGroup` 中的这个 `aliases` 控件现在管理着一个控件，将来还可以动态添加多个。

### Step 3 - Access the `FormArray` control

### 步骤 3 - 访问 `FormArray` 控件

Because a `FormArray` represents an undefined number of controls in array, accessing the control through a getter provides convenience and reusability. Use the _getter_ syntax to create an _aliases_ class property to retrieve the alias's `FormArray` control from the parent `FormGroup`.

因为 `FormArray` 表示的是数组中具有未知数量的控件，因此通过 getter 来访问控件比较便捷，也容易复用。使用 `getter` 语法来创建一个名为 `aliases` 的类属性，以便从父控件 `FormGroup` 中接收绰号的 `FormArray` 控件。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="aliases-getter" title="src/app/profile-editor/profile-editor.component.ts (aliases getter)">

</code-example>

The getter provides easy access to the aliases `FormArray` instead of repeating the `profileForm.get()` method to get the instance.

这个 getter 提供了对 `aliases` 这个 `FormArray` 的便捷访问，以代替对该实例反复进行 `profileForm.get()`。

<div class="alert is-helpful">

*Note*: Because the returned control is of type `AbstractControl`, you provide an explicit type to access the `FormArray` specific syntax for the methods.

*注意*：因为返回的控件的类型是 `AbstractControl`，所以你要为该方法提供一个显式的类型声明来访问 `FormArray` 特有的语法。

</div>

Define a method to dynamically insert an alias control into the alias's `FormArray`. The `FormArray.push()` method inserts the control as a new item in the array.

定义一个方法来把一个绰号控件动态插入到绰号 `FormArray` 中。用 `FormArray.push()` 方法把该控件添加为数组中的新条目。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.ts" region="add-alias" title="src/app/profile-editor/profile-editor.component.ts (add alias)">

</code-example>

In the template, the controls are iterated over to display each control as a separate input field.

在这个模板中，这些控件会被迭代，把每个控件都显示为一个独立的输入框。

### Step 4 - Display the form array in the template

### 步骤 4 - 在模板中显示表单数组

After you define the aliases `FormArray` in your model, you must add it to the template for user input. Similar to the `formGroupName` input provided by the `FormGroupNameDirective`, a `formArrayName` binds communication from the `FormArray` to the template with the `FormArrayNameDirective`. 

在模型中定义了 `aliases` 的 `FormArray` 之后，你必须把它加入到模板中供用户输入。和 `FormGroupNameDirective` 提供的 `formGroupName` 一样，`FormArrayNameDirective` 也使用 `formArrayName` 在这个 `FormArray` 和模板之间建立绑定。

Add the template HTML below after the closing `formGroupName` `<div>` element.

在 `formGroupName` `<div>` 元素的结束标签下方，添加一段模板 HTML。

<code-example path="reactive-forms/src/app/profile-editor/profile-editor.component.html" region="formarrayname" linenums="false" title="src/app/profile-editor/profile-editor.component.html (aliases form array template)">

</code-example>

The `*ngFor` directive iterates over each `FormControl` provided by the aliases `FormArray`. Because `FormArray` elements are unnamed, you assign the _index_ to the `i` variable and pass it to each control to bind it to the `formControlName` input. 

`*ngFor` 指令对 `aliases` `FormArray` 提供的每个 `FormControl` 进行迭代。因为 `FormArray` 中的元素是匿名的，所以你要把*索引号*赋值给 `i` 变量，并且把它传给每个控件的 `formControlName` 输入属性。

<figure>
  <img src="generated/images/guide/reactive-forms/profile-editor-4.png" alt="Profile Editor Aliases">
</figure>

Each time a new `alias` is added, the `FormArray` is provided its control based on the index. This allows you to track each individual control when calculating the status and value of the root control.

每当新的 `alias` 加进来时，`FormArray` 就会基于这个索引号提供它的控件。这将允许你在每次计算根控件的状态和值时跟踪每个控件。

#### Add an Alias

#### 添加绰号

Initially, the form only contains one `Alias` field. Click the `Add Alias` button, and another field appears. You can also validate the array of aliases reported by the form model displayed by the `Form Value` at the bottom of the template.

最初，表单只包含一个绰号字段，点击 `Add Alias` 按钮，就出现了另一个字段。您还可以验证由模板底部的“Form Value”显示出来的表单模型所报告的这个绰号数组。

<div class="alert is-helpful">

*Note*: Instead of a `FormControl` for each alias, you could compose another `FormGroup` with additional fields. The process of defining a control for each item is the same.

*注意*：除了为每个绰号使用 `FormControl` 之外，你还可以改用 `FormGroup` 来组合上一些额外字段。对其中的每个条目定义控件的过程和前面没有区别。

</div>

{@a appendix}

## Appendix

## 附录

{@a reactive-forms-api}

### Reactive forms API

### 响应式表单 API

Listed below are the base classes and services used to create and manage form controls.

下面列出了用于创建和管理表单控件的基础类和服务。

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

      The abstract base class for the three concrete form control classes; `FormControl`, `FormGroup`, and `FormArray`. It provides their common behaviors and properties.

      所有三种表单控件类（`FormControl`、`FormGroup` 和 `FormArray`）的抽象基类。它提供了一些公共的行为和属性。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormControl</code>

    </td>

    <td>

      Manages the value and validity status of an individual form control. It corresponds to an HTML form control such as an `<input>` or `<select>`.

      管理单体表单控件的值和有效性状态。它对应于 HTML 的表单控件，比如 `<input>` 或 `<select>`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroup</code>

    </td>

    <td>

      Manages the value and validity state of a group of `AbstractControl` instances. The group's properties include its child controls. The top-level form in your component is a `FormGroup`.

      管理一组 `AbstractControl` 实例的值和有效性状态。该组的属性中包括了它的子控件。组件中的顶级表单就是 `FormGroup`。

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

When importing the `ReactiveFormsModule`, you also gain access to directives to use in your templates for binding the data model to the forms declaratively.

当导入 `ReactiveFormsModule` 时，你也获得了一些指令的访问权，用来以声明的方式在模板中绑定表单的数据模型。

#### Directives

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

      Syncs a `FormControl` in an existing `FormGroup` to a form control element by name.

      把一个现有 `FormGroup` 中的 `FormControl` 根据名字绑定到表单控件元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroupDirective</code>

    </td>

    <td>

      Syncs an existing `FormGroup` to a DOM element.

      把一个现有的 `FormGroup` 绑定到 DOM 元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormGroupName</code>

    </td>

    <td>

      Syncs a nested `FormGroup` to a DOM element.

      把一个内嵌的 `FormGroup` 绑定到一个 DOM 元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>FormArrayName</code>

    </td>

    <td>

      Syncs a nested `FormArray` to a DOM element.

      把一个内嵌的 `FormArray` 绑定到一个 DOM 元素。

    </td>

  </tr>

</table>

### Comparison to template-driven forms

### 与模板驱动表单的对比

_Template-driven_ forms, introduced in the [Template-driven forms guide](guide/forms), take a completely different approach.

[模板驱动表单](guide/forms)一章中介绍的*模板驱动*表单是一种截然不同的方式。

* You place HTML form controls (such as `<input>` and `<select>`) in the component template and bind them to _data model_ properties in the component, using directives such as `ngModel`.

   你把 HTML 表单控件（比如 `<input>` 和 `<select>`）放进组件模板中，并且使用 `ngModel` 等指令把它们绑定到组件中的*数据模型*的属性。

* You don't create Angular form control objects. Angular directives create them for you, using the information in your data bindings.

   你不能创建 Angular 表单控件对象，Angular 指令会根据你提供的数据绑定信息替你创建它们。

* You don't push and pull data values. Angular handles that for you with `ngModel`. Angular updates the mutable _data model_ with user changes as they happen.

   你不能推拉数据值。Angular 会用 `ngModel` 替你处理它们。当用户进行修改时，Angular 会更新这个可变的*数据模型*。

While this means less code in the component class,
[template-driven forms are asynchronous](guide/reactive-forms#async-vs-sync "Async vs sync")
which may complicate development in more advanced scenarios.

虽然这意味着组件中的代码更少，但是[模板驱动表单是异步工作的](guide/reactive-forms#async-vs-sync "Async vs sync")，这可能在更高级的场景中让开发复杂化。

{@a async-vs-sync}

### Async vs. sync

### 异步 vs. 同步

Reactive forms are synchronous, and template-driven forms are asynchronous.

响应式表单是同步的，而模板驱动表单是异步的。

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
