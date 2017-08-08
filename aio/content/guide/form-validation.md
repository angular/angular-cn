# Form Validation

# 表单验证




Improve overall data quality by validating user input for accuracy and completeness.

我们可以通过验证用户输入的准确性和完整性，来增强整体数据质量。

This page shows how to validate user input in the UI and display useful validation messages
using both reactive and template-driven forms. It assumes some basic knowledge of the two 
forms modules.

在本烹饪书中，我们展示在界面中如何验证用户输入，并显示有用的验证信息，先使用模板驱动表单方式，再使用响应式表单方式。


<div class="l-sub-section">

If you're new to forms, start by reviewing the [Forms](guide/forms) and 
[Reactive Forms](guide/reactive-forms) guides.

参见[表单](guide/forms)和[响应式表单](guide/reactive-forms)了解关于这些选择的更多知识。


</div>


## Template-driven validation

## 模板驱动验证

To add validation to a template-driven form, you add the same validation attributes as you 
would with [native HTML form validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation). 
Angular uses directives to match these attributes with validator functions in the framework.

为了往模板驱动表单中添加验证机制，我们要添加一些验证属性，就像[原生的HTML表单验证器](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)。
Angular 会用指令来匹配这些具有验证功能的指令。

Every time the value of a form control changes, Angular runs validation and generates 
either a list of validation errors, which results in an INVALID status, or null, which results in a VALID status.

每当表单控件中的值发生变化时，Angular 就会进行验证，并生成一个验证错误的列表（对应着INVALID状态）或者null（对应着VALID状态）。

You can then inspect the control's state by exporting `ngModel` to a local template variable.
The following example exports `NgModel` into a variable called `name`:

我们可以通过把`ngModel`导出成局部模板变量来查看该控件的状态。
比如下面这个例子就把`NgModel`导出成了一个名叫`name`的变量：

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="name-with-error-msg" title="template/hero-form-template.component.html (name)" linenums="false">

</code-example>


Note the following:

请注意以下几点：

* The `<input>` element carries the HTML validation attributes: `required` and `minlength`. It 
also carries a custom validator directive, `forbiddenName`. For more 
information, see [Custom validators](guide/form-validation#custom-validators) section.

    `<input>`元素带有一些HTML验证属性：`required`、`minlength` 和 `maxlength`。它还带有一个自定义的验证器指令`forbiddenName`。要了解更多信息，参见[自定义验证器](guide/form-validation#custom-validators)一节。

* `#name="ngModel"` exports `NgModel` into a local variable callled `name`. `NgModel` mirrors many of the properties of its underlying 
`FormControl` instance, so you can use this in the template to check for control states such as `valid` and `dirty`. For a full list of control properties, see the [AbstractControl](api/forms/AbstractControl) 
API reference.

    `#name="ngModel"`把`NgModel`导出成了一个名叫`name`的局部变量。`NgModel`把自己控制的`FormControl`实例的属性映射出去，让我们能在模板中检查控件的状态，比如`valid`和`dirty`。要了解完整的控件属性，参见 API 参考手册中的[AbstractControl](api/forms/AbstractControl)。

* The `*ngIf` on the `<div>` element reveals a set of nested message `divs`
but only if the `name` is invalid and the control is either `dirty` or `touched`.

  `<div>`元素的`*ngIf`揭露了一套嵌套消息`divs`，但是只在有“name”错误和控制器为`dirty`或者`touched`。

* Each nested `<div>` can present a custom message for one of the possible validation errors.
There are messages for `required`, `minlength`, and `forbiddenName`.
 
  每个嵌套的`<div>`为其中一个可能出现的验证错误显示一条自定义消息。比如 `required`、`minlength`和 `forbiddenName`。

<div class="l-sub-section">



#### Why check _dirty_ and _touched_?

#### 为何检查**dirty**和**touched**？


You may not want your application to display errors before the user has a chance to edit the form.
The checks for `dirty` and `touched` prevent errors from showing until the user 
does one of two things: changes the value, 
turning the control dirty; or blurs the form control element, setting the control to touched.

我们肯定不希望应用在用户还没有编辑过表单的时候就给他们显示错误提示。
对`dirty`和`touched`的检查可以避免这种问题。改变控件的值会改变控件的`dirty`（脏）状态，而当控件失去焦点时，就会改变控件的`touched`（碰过）状态。

</div>

## Reactive form validation

## 响应式表单的验证

In a reactive form, the source of truth is the component class. Instead of adding validators through attributes in the template, you add validator functions directly to the form control model in the component class. Angular then calls these functions whenever the value of the control changes.

在响应式表单中，真正的源码都在组件类中。我们不应该通过模板上的属性来添加验证器，而应该在组件类中直接把验证器函数添加到表单控件模型上（`FormControl`）。然后，一旦控件发生了变化，Angular 就会调用这些函数。

### Validator functions

### 验证器函数

There are two types of validator functions: sync validators and async validators.  

有两种验证器函数：同步验证器和异步验证器。

* **Sync validators**: functions that take a control instance and immediately return either a set of validation errors or `null`. You can pass these in as the second argument when you instantiate a `FormControl`.

    **同步验证器**函数接受一个控件实例，然后返回一组验证错误或`null`。我们可以在实例化一个`FormControl`时把它作为构造函数的第二个参数传进去。

* **Async validators**: functions that take a control instance and return a Promise 
or Observable that later emits a set of validation errors or `null`. You can 
pass these in as the third argument when you instantiate a `FormControl`. 

    **异步验证器**函数接受一个控件实例，并返回一个承诺（Promise）或可观察对象（Observable），它们稍后会发出一组验证错误或者`null`。我们可以在实例化一个`FormControl`时把它作为构造函数的第三个参数传进去。

Note: for performance reasons, Angular only runs async validators if all sync validators pass. Each must complete before errors are set.

注意：出于性能方面的考虑，只有在所有同步验证器都通过之后，Angular 才会运行异步验证器。当每一个异步验证器都执行完之后，才会设置这些验证错误。

### Built-in validators

### 内置验证器

You can choose to [write your own validator functions](guide/form-validation#custom-validators), or you can use some of 
Angular's built-in validators. 

我们可以[写自己的验证器](guide/form-validation#custom-validators)，也可以使用一些 Angular 内置的验证器。

The same built-in validators that are available as attributes in template-driven forms, such as `required` and `minlength`, are all available to use as functions from the `Validators` class. For a full list of built-in validators, see the [Validators](api/forms/Validators) API reference.

模板驱动表单中可用的那些属性型验证器（如`required`、`minlength`等）对应于`Validators`类中的同名函数。要想查看内置验证器的全列表，参见 API 参考手册中的[验证器](api/forms/Validators)部分。

To update the hero form to be a reactive form, you can use some of the same 
built-in validators&mdash;this time, in function form. See below:

要想把这个英雄表单改造成一个响应式表单，我们还是用那些内置验证器，但这次改为用它们的函数形态。

{@a reactive-component-class}

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.ts" region="form-group" title="reactive/hero-form-reactive.component.ts (validator functions)" linenums="false">
</code-example>

Note that:

注意

* The name control sets up two built-in validators&mdash;`Validators.required` and `Validators.minLength(4)`&mdash;and one custom validator, `forbiddenNameValidator`. For more details see the [Custom validators](guide/form-validation#custom-validators) section in this guide.

    `name`控件设置了两个内置验证器：`Validators.required` 和 `Validators.minLength(4)`。要了解更多信息，参见本章的[自定义验证器](guide/form-validation#custom-validators)一节。

* As these validators are all sync validators, you pass them in as the second argument. 

    由于这些验证器都是同步验证器，因此我们要把它们作为第二个参数传进去。

* Support multiple validators by passing the functions in as an array.

    可以通过把这些函数放进一个数组后传进去，可以支持多重验证器。

* This example adds a few getter methods. In a reactive form, you can always access any form control through the `get` method on its parent group, but sometimes it's useful to define getters as shorthands 
for the template.

  这个例子添加了一些getter方法。在响应式表单中，我们通常会通过它所属的控件组（FormGroup）的`get`方法来访问表单控件，但有时候为模板定义一些getter作为简短形式。


If you look at the template for the name input again, it is fairly similar to the template-driven example. 

如果我们到模板中找到name输入框，就会发现它和模板驱动的例子很相似。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.html" region="name-with-error-msg" title="reactive/hero-form-reactive.component.html (name with error msg)" linenums="false">
</code-example>

Key takeaways:

关键改动是：
 
 * The form no longer exports any directives, and instead uses the `name` getter defined in 
 the component class.
 
    该表单不再导出任何指令，而是使用组件类中定义的`name`读取器。
 
 * The `required` attribute is still present. While it's not necessary for validation purposes, 
 you may want to keep it in your template for CSS styling or accessibility reasons.

    `required`属性仍然存在，虽然验证不再需要它，但我们仍然在模板中保留它，以支持 CSS 样式或可访问性。

## Custom validators

## 自定义验证器

Since the built-in validators won't always match the exact use case of your application, sometimes you'll want to create a custom validator. 

由于内置验证器无法适用于所有应用场景，有时候我们还是得创建自定义验证器。

Consider the `forbiddenNameValidator` function from previous
[examples](guide/form-validation#reactive-component-class) in 
this guide. Here's what the definition of that function looks like:

考虑前面的[例子](guide/form-validation#reactive-component-class)中的`forbiddenNameValidator`函数。该函数的定义看起来是这样的：

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="custom-validator" title="shared/forbidden-name.directive.ts (forbiddenNameValidator)" linenums="false">
</code-example>

The function is actually a factory that takes a regular expression to detect a _specific_ forbidden name and returns a validator function.

这个函数实际上是一个工厂，它接受一个用来检测指定名字是否已被禁用的正则表达式，并返回一个验证器函数。

In this sample, the forbidden name is "bob", so the validator will reject any hero name containing "bob".
Elsewhere it could reject "alice" or any name that the configuring regular expression matches.

在本例中，禁止的名字是“bob”；
验证器会拒绝任何带有“bob”的英雄名字。
在其他地方，只要配置的正则表达式可以匹配上，它可能拒绝“alice”或者任何其他名字。

The `forbiddenNameValidator` factory returns the configured validator function.
That function takes an Angular control object and returns _either_
null if the control value is valid _or_ a validation error object.
The validation error object typically has a property whose name is the validation key, `'forbiddenName'`,
and whose value is an arbitrary dictionary of values that you could insert into an error message, `{name}`.

`forbiddenNameValidator`工厂函数返回配置好的验证器函数。
该函数接受一个Angular控制器对象，并在控制器值有效时返回null，或无效时返回验证错误对象。
验证错误对象通常有一个名为验证秘钥（`forbiddenName`）的属性。其值为一个任意词典，我们可以用来插入错误信息（`{name}`）。

### Adding to reactive forms

### 添加响应式表单

In reactive forms, custom validators are fairly simple to add. All you have to do is pass the function directly 
to the `FormControl`.

在响应式表单组件中，添加自定义验证器相当简单。你所要做的一切就是直接把这个函数传给 `FormControl` 。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.ts" region="custom-validator" title="reactive/hero-form-reactive.component.ts (validator functions)" linenums="false">
</code-example>

### Adding to template-driven forms

In template-driven forms, you don't have direct access to the `FormControl` instance, so you can't pass the 
validator in like you can for reactive forms. Instead, you need to add a directive to the template.

在模板驱动表单中，我们不用直接访问`FormControl`实例。所以我们不能像响应式表单中那样把验证器传进去，而应该在模板中添加一个指令。

The corresponding `ForbiddenValidatorDirective` serves as a wrapper around the `forbiddenNameValidator`.

`ForbiddenValidatorDirective`指令相当于`forbiddenNameValidator`的包装器。

Angular recognizes the directive's role in the validation process because the directive registers itself
with the `NG_VALIDATORS` provider, a provider with an extensible collection of validators.

Angular在验证流程中的识别出指令的作用，是因为指令把自己注册到了`NG_VALIDATORS`提供商中，该提供商拥有一组可扩展的验证器。


<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="directive-providers" title="shared/forbidden-name.directive.ts (providers)" linenums="false">
</code-example>

The directive class then implements the `Validator` interface, so that it can easily integrate 
with Angular forms. Here is the rest of the directive to help you get an idea of how it all 
comes together:

然后该指令类实现了`Validator`接口，以便它能简单的与 Angular 表单集成在一起。这个指令的其余部分有助于你理解它们是如何协作的：

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="directive" title="shared/forbidden-name.directive.ts (directive)">
</code-example>

Once the `ForbiddenValidatorDirective` is ready, you can simply add its selector, `forbiddenName`, to any input element to activate it. For example:

一旦 `ForbiddenValidatorDirective` 写好了，我们只要把`forbiddenName`选择器添加到输入框上就可以激活这个验证器了。比如：

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="name-input" title="template/hero-form-template.component.html (forbidden-name-input)" linenums="false">

</code-example>


<div class="l-sub-section">

You may have noticed that the custom validation directive is instantiated with `useExisting`
rather than `useClass`. The registered validator must be _this instance_ of
the `ForbiddenValidatorDirective`&mdash;the instance in the form with
its `forbiddenName` property bound to “bob". If you were to replace
`useExisting` with `useClass`, then you’d be registering a new class instance, one that
doesn’t have a `forbiddenName`.

你可能注意到了自定义验证器指令是用`useExisting`而不是`useClass`来实例化的。注册的验证器必须是这个 `ForbiddenValidatorDirective` 实例本身，也就是表单中 `forbiddenName` 属性被绑定到了"bob"的那个。如果用`useClass`来代替`useExisting`，就会注册一个新的类实例，而它是没有`forbiddenName`的。

</div>

## Control status CSS classes

## 表示控件状态的 CSS 类

Like in AngularJS, Angular automatically mirrors many control properties onto the form control element as CSS classes. You can use these classes to style form control elements according to the state of the form. The following classes are currently supported:

像 AngularJS 中一样，Angular 会自动把很多控件属性作为 CSS 类映射到控件所在的元素上。我们可以使用这些类来根据表单状态给表单控件元素添加样式。目前支持下列类：

* `.ng-valid`
* `.ng-invalid`
* `.ng-pending`
* `.ng-pristine`
* `.ng-dirty`
* `.ng-untouched`
* `.ng-touched`

The hero form uses the `.ng-valid` and `.ng-invalid` classes to 
set the color of each form control's border.

这个英雄表单使用 `.ng-valid` 和 `.ng-invalid` 来设置每个表单控件的边框颜色。

<code-example path="form-validation/src/forms.css" title="forms.css (status classes)">

</code-example>


**You can run the <live-example></live-example> to see the complete reactive and template-driven example code.**

**你可以运行<live-example></live-example>来查看完整的响应式和模板驱动表单的代码。**