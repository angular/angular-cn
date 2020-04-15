# Form validation

# 表单验证

Improve overall data quality by validating user input for accuracy and completeness.

通过验证用户输入的准确性和完整性，来增强整体数据质量。

This page shows how to validate user input in the UI and display useful validation messages
using both reactive and template-driven forms. It assumes some basic knowledge of the two
forms modules.

本文展示了在界面中如何验证用户输入，并显示有用的验证信息，先使用模板驱动表单方式，再使用响应式表单方式。

<div class="alert is-helpful">

If you're new to forms, start by reviewing the [Forms](guide/forms) and
[Reactive Forms](guide/reactive-forms) guides.

参见[表单](guide/forms)和[响应式表单](guide/reactive-forms)了解关于这些选择的更多知识。

</div>

## Template-driven validation

## 模板驱动验证

To add validation to a template-driven form, you add the same validation attributes as you
would with [native HTML form validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
Angular uses directives to match these attributes with validator functions in the framework.

为了往模板驱动表单中添加验证机制，你要添加一些验证属性，就像[原生的 HTML 表单验证器](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)。
Angular 会用指令来匹配这些具有验证功能的指令。

Every time the value of a form control changes, Angular runs validation and generates
either a list of validation errors, which results in an INVALID status, or null, which results in a VALID status.

每当表单控件中的值发生变化时，Angular 就会进行验证，并生成一个验证错误的列表（对应着 INVALID 状态）或者 null（对应着 VALID 状态）。

You can then inspect the control's state by exporting `ngModel` to a local template variable.
The following example exports `NgModel` into a variable called `name`:

你可以通过把 `ngModel` 导出成局部模板变量来查看该控件的状态。
比如下面这个例子就把 `NgModel` 导出成了一个名叫 `name` 的变量：

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="name-with-error-msg" header="template/hero-form-template.component.html (name)"></code-example>

Note the following:

请注意以下几点：

* The `<input>` element carries the HTML validation attributes: `required` and `minlength`. It
also carries a custom validator directive, `forbiddenName`. For more
information, see [Custom validators](guide/form-validation#custom-validators) section.

   `<input>` 元素带有一些 HTML 验证属性：`required` 和 `minlength`。它还带有一个自定义的验证器指令 `forbiddenName`。要了解更多信息，参见[自定义验证器](guide/form-validation#custom-validators)一节。

* `#name="ngModel"` exports `NgModel` into a local variable called `name`. `NgModel` mirrors many of the properties of its underlying
`FormControl` instance, so you can use this in the template to check for control states such as `valid` and `dirty`. For a full list of control properties, see the [AbstractControl](api/forms/AbstractControl)
API reference.

   `#name="ngModel"` 把 `NgModel` 导出成了一个名叫 `name` 的局部变量。`NgModel` 把自己控制的 `FormControl` 实例的属性映射出去，让你能在模板中检查控件的状态，比如 `valid` 和 `dirty`。要了解完整的控件属性，参见 API 参考手册中的[AbstractControl](api/forms/AbstractControl)。

* The `*ngIf` on the `<div>` element reveals a set of nested message `divs`
but only if the `name` is invalid and the control is either `dirty` or `touched`.

   `<div>` 元素的 `*ngIf` 展示了一组嵌套的消息 `div`，但是只在有“name”错误和控制器为 `dirty` 或者 `touched` 时才出现。

* Each nested `<div>` can present a custom message for one of the possible validation errors.
There are messages for `required`, `minlength`, and `forbiddenName`.

   每个嵌套的 `<div>` 为其中一个可能出现的验证错误显示一条自定义消息。比如 `required`、`minlength` 和 `forbiddenName`。

<div class="alert is-helpful">

#### Why check _dirty_ and _touched_?

#### 为何检查 **dirty** 和 **touched**？

You may not want your application to display errors before the user has a chance to edit the form.
The checks for `dirty` and `touched` prevent errors from showing until the user
does one of two things: changes the value,
turning the control dirty; or blurs the form control element, setting the control to touched.

你肯定不希望应用在用户还没有编辑过表单的时候就给他们显示错误提示。
对 `dirty` 和 `touched` 的检查可以避免这种问题。改变控件的值会改变控件的 `dirty`（脏）状态，而当控件失去焦点时，就会改变控件的 `touched`（碰过）状态。

</div>

## Reactive form validation

## 响应式表单的验证

In a reactive form, the source of truth is the component class. Instead of adding validators through attributes in the template, you add validator functions directly to the form control model in the component class. Angular then calls these functions whenever the value of the control changes.

在响应式表单中，权威数据源是其组件类。不应该通过模板上的属性来添加验证器，而应该在组件类中直接把验证器函数添加到表单控件模型上（`FormControl`）。然后，一旦控件发生了变化，Angular 就会调用这些函数。

### Validator functions

### 验证器函数

There are two types of validator functions: sync validators and async validators.

有两种验证器函数：同步验证器和异步验证器。

* **Sync validators**: functions that take a control instance and immediately return either a set of validation errors or `null`. You can pass these in as the second argument when you instantiate a `FormControl`.

   **同步验证器**函数接受一个控件实例，然后返回一组验证错误或 `null`。你可以在实例化一个 `FormControl` 时把它作为构造函数的第二个参数传进去。

* **Async validators**: functions that take a control instance and return a Promise
or Observable that later emits a set of validation errors or `null`. You can
pass these in as the third argument when you instantiate a `FormControl`.

   **异步验证器**函数接受一个控件实例，并返回一个承诺（Promise）或可观察对象（Observable），它们稍后会发出一组验证错误或者 `null`。你可以在实例化一个 `FormControl` 时把它作为构造函数的第三个参数传进去。

Note: for performance reasons, Angular only runs async validators if all sync validators pass. Each must complete before errors are set.

注意：出于性能方面的考虑，只有在所有同步验证器都通过之后，Angular 才会运行异步验证器。当每一个异步验证器都执行完之后，才会设置这些验证错误。

### Built-in validators

### 内置验证器

You can choose to [write your own validator functions](guide/form-validation#custom-validators), or you can use some of
Angular's built-in validators.

你可以[写自己的验证器](guide/form-validation#custom-validators)，也可以使用一些 Angular 内置的验证器。

The same built-in validators that are available as attributes in template-driven forms, such as `required` and `minlength`, are all available to use as functions from the `Validators` class. For a full list of built-in validators, see the [Validators](api/forms/Validators) API reference.

模板驱动表单中可用的那些属性型验证器（如 `required`、`minlength` 等）对应于 `Validators` 类中的同名函数。要想查看内置验证器的全列表，参见 API 参考手册中的[验证器](api/forms/Validators)部分。

To update the hero form to be a reactive form, you can use some of the same
built-in validators&mdash;this time, in function form. See below:

要想把这个英雄表单改造成一个响应式表单，你还是用那些内置验证器，但这次改为用它们的函数形态。

{@a reactive-component-class}

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.1.ts" region="form-group" header="reactive/hero-form-reactive.component.ts (validator functions)"></code-example>

Note that:

注意

* The name control sets up two built-in validators&mdash;`Validators.required` and `Validators.minLength(4)`&mdash;and one custom validator, `forbiddenNameValidator`. For more details see the [Custom validators](guide/form-validation#custom-validators) section in this guide.

   `name` 控件设置了两个内置验证器：`Validators.required` 和 `Validators.minLength(4)`。要了解更多信息，参见本章的[自定义验证器](guide/form-validation#custom-validators)一节。

* As these validators are all sync validators, you pass them in as the second argument. 

   由于这些验证器都是同步验证器，因此你要把它们作为第二个参数传进去。

* Support multiple validators by passing the functions in as an array.

   可以通过把这些函数放进一个数组后传进去，可以支持多重验证器。

* This example adds a few getter methods. In a reactive form, you can always access any form control through the `get` method on its parent group, but sometimes it's useful to define getters as shorthands
for the template.

   这个例子添加了一些 getter 方法。在响应式表单中，你通常会通过它所属的控件组（FormGroup）的 `get` 方法来访问表单控件，但有时候为模板定义一些 getter 作为简短形式。

If you look at the template for the name input again, it is fairly similar to the template-driven example.

如果你到模板中找到 name 输入框，就会发现它和模板驱动的例子很相似。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.html" region="name-with-error-msg" header="reactive/hero-form-reactive.component.html (name with error msg)"></code-example>

Key takeaways:

关键改动是：

 * The form no longer exports any directives, and instead uses the `name` getter defined in 
 the component class.

    该表单不再导出任何指令，而是使用组件类中定义的 `name` 读取器。

 * The `required` attribute is still present. While it's not necessary for validation purposes,
 you may want to keep it in your template for CSS styling or accessibility reasons.

    `required` 属性仍然存在，虽然验证不再需要它，但你仍然要在模板中保留它，以支持 CSS 样式或可访问性。

## Custom validators

## 自定义验证器

Since the built-in validators won't always match the exact use case of your application, sometimes you'll want to create a custom validator.

由于内置验证器无法适用于所有应用场景，有时候你还是得创建自定义验证器。

Consider the `forbiddenNameValidator` function from previous
[examples](guide/form-validation#reactive-component-class) in
this guide. Here's what the definition of that function looks like:

考虑前面的[例子](guide/form-validation#reactive-component-class)中的 `forbiddenNameValidator` 函数。该函数的定义看起来是这样的：

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="custom-validator" header="shared/forbidden-name.directive.ts (forbiddenNameValidator)"></code-example>

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

`forbiddenNameValidator` 工厂函数返回配置好的验证器函数。
该函数接受一个 Angular 控制器对象，并在控制器值有效时返回 null，或无效时返回验证错误对象。
验证错误对象通常有一个名为验证秘钥（`forbiddenName`）的属性。其值为一个任意词典，你可以用来插入错误信息（`{name}`）。

Custom async validators are similar to sync validators, but they must instead return a Promise or Observable
that later emits null or a validation error object. In the case of an Observable, the Observable must complete,
at which point the form uses the last value emitted for validation.

自定义异步验证器和同步验证器很像，只是它们必须返回一个稍后会输出 null 或“验证错误对象”的承诺（Promise）或可观察对象，如果是可观察对象，那么它必须在某个时间点被完成（complete），那时候这个表单就会使用它输出的最后一个值作为验证结果。（译注：HTTP 服务是自动完成的，但是某些自定义的可观察对象可能需要手动调用 complete 方法）

### Adding to reactive forms

### 添加响应式表单

In reactive forms, custom validators are fairly simple to add. All you have to do is pass the function directly
to the `FormControl`.

在响应式表单组件中，添加自定义验证器相当简单。你所要做的一切就是直接把这个函数传给 `FormControl` 。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.1.ts" region="custom-validator" header="reactive/hero-form-reactive.component.ts (validator functions)"></code-example>

### Adding to template-driven forms

### 添加到模板驱动表单

In template-driven forms, you don't have direct access to the `FormControl` instance, so you can't pass the
validator in like you can for reactive forms. Instead, you need to add a directive to the template.

在模板驱动表单中，你不用直接访问 `FormControl` 实例。所以不能像响应式表单中那样把验证器传进去，而应该在模板中添加一个指令。

The corresponding `ForbiddenValidatorDirective` serves as a wrapper around the `forbiddenNameValidator`.

`ForbiddenValidatorDirective` 指令相当于 `forbiddenNameValidator` 的包装器。

Angular recognizes the directive's role in the validation process because the directive registers itself
with the `NG_VALIDATORS` provider, a provider with an extensible collection of validators.

Angular 在验证过程中能识别出指令的作用，是因为指令把自己注册成了 `NG_VALIDATORS` 提供者，该提供者拥有一组可扩展的验证器。

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="directive-providers" header="shared/forbidden-name.directive.ts (providers)"></code-example>

The directive class then implements the `Validator` interface, so that it can easily integrate
with Angular forms. Here is the rest of the directive to help you get an idea of how it all
comes together:

然后该指令类实现了 `Validator` 接口，以便它能简单的与 Angular 表单集成在一起。这个指令的其余部分有助于你理解它们是如何协作的：

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="directive" header="shared/forbidden-name.directive.ts (directive)">
</code-example>

Once the `ForbiddenValidatorDirective` is ready, you can simply add its selector, `appForbiddenName`, to any input element to activate it. For example:

一旦 `ForbiddenValidatorDirective` 写好了，你只要把 `forbiddenName` 选择器添加到输入框上就可以激活这个验证器了。比如：

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="name-input" header="template/hero-form-template.component.html (forbidden-name-input)"></code-example>

<div class="alert is-helpful">

You may have noticed that the custom validation directive is instantiated with `useExisting`
rather than `useClass`. The registered validator must be _this instance_ of
the `ForbiddenValidatorDirective`&mdash;the instance in the form with
its `forbiddenName` property bound to “bob". If you were to replace
`useExisting` with `useClass`, then you’d be registering a new class instance, one that
doesn’t have a `forbiddenName`.

你可能注意到了自定义验证器指令是用 `useExisting` 而不是 `useClass` 来实例化的。注册的验证器必须是这个 `ForbiddenValidatorDirective` 实例本身，也就是表单中 `forbiddenName` 属性被绑定到了"bob"的那个。如果用 `useClass` 来代替 `useExisting`，就会注册一个新的类实例，而它是没有 `forbiddenName` 的。

</div>

## Control status CSS classes

## 表示控件状态的 CSS 类

Like in AngularJS, Angular automatically mirrors many control properties onto the form control element as CSS classes. You can use these classes to style form control elements according to the state of the form. The following classes are currently supported:

像 AngularJS 中一样，Angular 会自动把很多控件属性作为 CSS 类映射到控件所在的元素上。你可以使用这些类来根据表单状态给表单控件元素添加样式。目前支持下列类：

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

<code-example path="form-validation/src/assets/forms.css" header="forms.css (status classes)">

</code-example>

## Cross field validation 

## 跨字段交叉验证

This section shows how to perform cross field validation. It assumes some basic knowledge of creating custom validators.

本节将展示如何进行跨字段验证。这里假设你已经有了创建自定义验证器所需的基础知识。

<div class="alert is-helpful">

If you haven't created custom validators before, start by reviewing the [custom validators section](guide/form-validation#custom-validators).

如果你以前没有创建过自定义验证器，请先阅读[自定义验证器](guide/form-validation#custom-validators)一节。

</div>

In the following section, we will make sure that our heroes do not reveal their true identities by filling out the Hero Form. We will do that by validating that the hero names and alter egos do not match.

在下一节中，我们要确保英雄们不能通过填写表单来暴露他们的真实身份。要做到这一点，我们就要验证英雄的名字和他的第二人格（alterEgo）是否匹配。

### Adding to reactive forms

### 添加到响应式表单

The form has the following structure:

表单具有下列结构：

```javascript
const heroForm = new FormGroup({
  'name': new FormControl(),
  'alterEgo': new FormControl(),
  'power': new FormControl()
});
```

Notice that the name and alterEgo are sibling controls. To evaluate both controls in a single custom validator, we should perform the validation in a common ancestor control: the `FormGroup`. That way, we can query the `FormGroup` for the child controls which will allow us to compare their values.

注意，name 和 alterEgo 是兄弟控件。要想在单个的自定义验证器中计算这两个控件，我们就得在它们共同的祖先控件（`FormGroup`）中进行验证。这样，我们就可以查询 `FormGroup` 的子控件，从而让我们能够比较它们的值。

To add a validator to the `FormGroup`, pass the new validator in as the second argument on creation.

要想给 `FormGroup` 添加验证器，就要在创建时把一个新的验证器传给它的第二个参数。

```javascript
const heroForm = new FormGroup({
  'name': new FormControl(),
  'alterEgo': new FormControl(),
  'power': new FormControl()
}, { validators: identityRevealedValidator });
```

The validator code is as follows:

验证器的代码如下：

<code-example path="form-validation/src/app/shared/identity-revealed.directive.ts" region="cross-validation-validator" header="shared/identity-revealed.directive.ts"></code-example>

The identity validator implements the `ValidatorFn` interface. It takes an Angular control object as an argument and returns either null if the form is valid, or `ValidationErrors` otherwise.

这个身份验证器实现了 `ValidatorFn` 接口。它接收一个 Angular 表单控件对象作为参数，当表单有效时，它返回一个 null，否则返回 `ValidationErrors` 对象。

First we retrieve the child controls by calling the `FormGroup`'s [get](api/forms/AbstractControl#get) method. Then we simply compare the values of the `name` and `alterEgo` controls.

我们先通过调用 `FormGroup` 的 [get](api/forms/AbstractControl#get) 方法来获取子控件。然后，简单地比较一下 `name` 和 `alterEgo` 控件的值。

If the values do not match, the hero's identity remains secret, and we can safely return null. Otherwise, the hero's identity is revealed and we must mark the form as invalid by returning an error object.

如果这两个值不一样，那么英雄的身份就应该继续保密，我们可以安全的返回 null。否则就说明英雄的身份已经暴露了，我们必须通过返回一个错误对象来把这个表单标记为无效的。

Next, to provide better user experience, we show an appropriate error message when the form is invalid.

接下来，为了提供更好的用户体验，当表单无效时，我们还要显示一个恰当的错误信息。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.html" region="cross-validation-error-message" header="reactive/hero-form-template.component.html"></code-example>

Note that we check if:

注意，我们需要检查：

- the `FormGroup` has the cross validation error returned by the `identityRevealed` validator, 

   `FormGroup` 应该有一个由 `identityRevealed` 验证器返回的交叉验证错误对象。

- the user is yet to [interact](guide/form-validation#why-check-dirty-and-touched) with the form.

   用户已经和表单进行过[交互](guide/form-validation#why-check-dirty-and-touched)。

### Adding to template driven forms

### 添加到模板驱动表单中

First we must create a directive that will wrap the validator function. We provide it as the validator using the `NG_VALIDATORS` token. If you are not sure why, or you do not fully understand the syntax, revisit the previous [section](guide/form-validation#adding-to-template-driven-forms).

首先，我们必须创建一个指令，它会包装这个验证器函数。我们使用 `NG_VALIDATORS` 令牌来把它作为验证器提供出来。如果你还不清楚为什么要这么做或者不能完全理解这种语法，请重新访问前面的[小节](guide/form-validation#adding-to-template-driven-forms)。

<code-example path="form-validation/src/app/shared/identity-revealed.directive.ts" region="cross-validation-directive" header="shared/identity-revealed.directive.ts"></code-example>

Next, we have to add the directive to the html template. Since the validator must be registered at the highest level in the form, we put the directive on the `form` tag.

接下来，我们要把该指令添加到 HTML 模板中。由于验证器必须注册在表单的最高层，所以我们要把该指令放在 `form` 标签上。

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="cross-validation-register-validator" header="template/hero-form-template.component.html"></code-example>

To provide better user experience, we show an appropriate error message when the form is invalid.

为了提供更好的用户体验，当表单无效时，我们要显示一个恰当的错误信息。

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="cross-validation-error-message" header="template/hero-form-template.component.html"></code-example>

Note that we check if:

注意，我们需要检查：

- the form has the cross validation error returned by the `identityRevealed` validator, 

   该表单具有一个由 `identityRevealed` 验证器提供的交叉验证错误对象。

- the user is yet to [interact](guide/form-validation#why-check-dirty-and-touched) with the form.

   用户已经和表单进行过[交互](guide/form-validation#why-check-dirty-and-touched)。

This completes the cross validation example. We managed to:

这样就完成了这个交叉验证的例子。我们的做法是：

- validate the form based on the values of two sibling controls, 

   基于两个相邻控件的值来验证表单

- show a descriptive error message after the user interacted with the form and the validation failed.

   当用户与表单交互过并且验证失败时，才显示一个描述性的错误信息。

## Async Validation

## 异步验证

This section shows how to create asynchronous validators. It assumes some basic knowledge of creating [custom validators](guide/form-validation#custom-validators).

本节展示如何创建异步验证器。这里假设你已经具有了一些创建[自定义验证器](guide/form-validation#custom-validators)的基础知识。

### The Basics

### 基础

Just like synchronous validators have the `ValidatorFn` and `Validator` interfaces, asynchronous validators have their own counterparts: `AsyncValidatorFn` and `AsyncValidator`.

就像同步验证器有 `ValidatorFn` 和 `Validator` 接口一样，异步验证器也有自己的对应物：`AsyncValidatorFn` 和 `AsyncValidator`。

They are very similar with the only difference being:

它们非常像，但是有下列不同：

* They must return a Promise or an Observable,

  它们必须返回承诺（Promise）或可观察对象（Observable），

* The observable returned must be finite, meaning it must complete at some point. To convert an infinite observable into a finite one, pipe the observable through a filtering operator such as `first`, `last`, `take`, or `takeUntil`.

  返回的可观察对象必须是有限的，也就是说，它必须在某个时间点结束（complete）。要把无尽的可观察对象转换成有限的，可以使用 `first`、`last`、`take` 或 `takeUntil` 等过滤型管道对其进行处理。

It is important to note that the asynchronous validation happens after the synchronous validation, and is performed only if the synchronous validation is successful. This check allows forms to avoid potentially expensive async validation processes such as an HTTP request if more basic validation methods fail.

注意！异步验证总是会在同步验证之后执行，并且只有当同步验证成功了之后才会执行。如果更基本的验证方法已经失败了，那么这能让表单避免进行可能会很昂贵的异步验证过程，比如 HTTP 请求。

After asynchronous validation begins, the form control enters a `pending` state. You can inspect the control's `pending` property and use it to give visual feedback about the ongoing validation.

在异步验证器开始之后，表单控件会进入 `pending` 状态。你可以监视该控件的 `pending` 属性，利用它来给用户一些视觉反馈，表明正在进行验证。

A common UI pattern is to show a spinner while the async validation is being performed. The following example presents how to achieve this with template-driven forms:

常见的 UI 处理模式是在执行异步验证时显示一个旋转指示标（spinner）。下面的例子展示了在模板驱动表单中该怎么做：

```html
<input [(ngModel)]="name" #model="ngModel" appSomeAsyncValidator>
<app-spinner *ngIf="model.pending"></app-spinner>
```

### Implementing Custom Async Validator

### 实现自定义异步验证器

In the following section, validation is performed asynchronously to ensure that our heroes pick an alter ego that is not already taken. New heroes are constantly enlisting and old heroes are leaving the service. That means that we do not have the list of available alter egos ahead of time.

在下一节中，会异步执行一个验证，以确保英雄选取了一个还没有人选过的第二人格。新的英雄不断招募，而老的英雄不断离开。这意味着我们没法提前拿到一个可用的第二人格列表。

To validate the potential alter ego, we need to consult a central database of all currently enlisted heroes. The process is asynchronous, so we need a special validator for that.

要验证潜在的第二人格，我们需要咨询一个存有全部已招募英雄的中央数据库。而这个过程是异步的，我们需要一个特殊的验证器。

Let's start by creating the validator class.

我们先创建一个验证器类。

<code-example path="form-validation/src/app/shared/alter-ego.directive.ts" region="async-validator"></code-example>

As you can see, the `UniqueAlterEgoValidator` class implements the `AsyncValidator` interface. In the constructor, we inject the `HeroesService` that has the following interface:

如你所见，`UniqueAlterEgoValidator` 类实现了 `AsyncValidator` 接口。在其构造函数中，我们注入了一个 
`HeroesService`，其接口如下：

```typescript
interface HeroesService {
  isAlterEgoTaken: (alterEgo: string) => Observable<boolean>;
}
```

In a real world application, the `HeroesService` is responsible for making an HTTP request to the hero database to check if the alter ego is available. From the validator's point of view, the actual implementation of the service is not important, so we can just code against the `HeroesService` interface.

在真实的应用中，`HeroesService` 负责向英雄数据库发起一个 HTTP 请求，以检查该第二人格是否可用。
从该验证器的视角看，此服务的具体实现无关紧要，所以我们仅仅针对 `HeroesService` 接口来写实现代码。

As the validation begins, the `UniqueAlterEgoValidator` delegates to the `HeroesService` `isAlterEgoTaken()` method with the current control value. At this point the control is marked as `pending` and remains in this state until the observable chain returned from the `validate()` method completes.

当验证开始的时候，`UniqueAlterEgoValidator` 把任务委托给 `HeroesService` 的 `isAlterEgoTaken()` 方法，并传入当前控件的值。这时候，该控件会被标记为 `pending` 状态，直到 `validate()` 方法所返回的可观察对象完成（complete）了。

The `isAlterEgoTaken()` method dispatches an HTTP request that checks if the alter ego is available, and returns `Observable<boolean>` as the result. We pipe the response through the `map` operator and transform it into a validation result. As always, we return `null` if the form is valid, and `ValidationErrors` if it is not. We make sure to handle any potential errors with the `catchError` operator.

`isAlterEgoTaken()` 方法会发出一个 HTTP 请求，以检查该第二人格是否可用，并返回一个 `Observable<boolean>` 型结果。我们通过 `map` 操作符把响应对象串起来，并把它转换成一个有效性结果。
与往常一样，如果表单有效则返回 `null`，否则返回 `ValidationErrors`。我们还是用 `catchError` 操作符来确保对任何潜在错误都进行了处理。

Here we decided that `isAlterEgoTaken()` error is treated as a successful validation, because failure to make a validation request does not necessarily mean that the alter ego is invalid. You could handle the error differently and return the `ValidationError` object instead.

这里，我们决定将 `isAlterEgoTaken()` 中的错误视为成功验证，因为如果没能发起验证请求，未必代表这个第二人格是无效的。你也可以将其视为失败，并返回 `ValidationError` 对象。

After some time passes, the observable chain completes and the async validation is done. The `pending` flag is set to `false`, and the form validity is updated.

一段时间之后，可观察对象完成了，异步验证也就结束了。这时候 `pending` 标志就改成了 `false`，并且表单的有效性也更新了。

### Note on performance

### 性能上的注意事项

By default, all validators are run after every form value change. With synchronous validators, this will not likely have a noticeable impact on application performance. However, it's common for async validators to perform some kind of HTTP request to validate the control. Dispatching an HTTP request after every keystroke could put a strain on the backend API, and should be avoided if possible.

默认情况下，每当表单值变化之后，都会执行所有验证器。对于同步验证器，没有什么会显著影响应用性能的地方。不过，异步验证器通常会执行某种 HTTP 请求来对控件进行验证。如果在每次按键之后都发出 HTTP 请求会给后端 API 带来沉重的负担，应该尽量避免。

We can delay updating the form validity by changing the `updateOn` property from `change` (default) to `submit` or `blur`.

我们可以把 `updateOn` 属性从 `change`（默认值）改成 `submit` 或 `blur` 来推迟表单验证的更新时机。

With template-driven forms:

对于模板驱动表单：

```html
<input [(ngModel)]="name" [ngModelOptions]="{updateOn: 'blur'}">
```

With reactive forms:

对于响应式表单：

```typescript
new FormControl('', {updateOn: 'blur'});
```

**You can run the <live-example></live-example> to see the complete reactive and template-driven example code.**

**你可以运行<live-example></live-example>来查看完整的响应式和模板驱动表单的代码。**
