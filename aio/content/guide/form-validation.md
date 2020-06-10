# Validating form input

# 验证表单输入

You can improve overall data quality by validating user input for accuracy and completeness.
This page shows how to validate user input from the UI and display useful validation messages,
in both reactive and template-driven forms.

通过验证用户输入的准确性和完整性，可以提高整体的数据质量。该页面显示了如何从 UI 验证用户输入，以及如何在响应式表单和模板驱动表单中显示有用的验证消息。

**Prerequisites**

**先决条件**

Before reading about form validation, you should have a basic understanding of the following.

在阅读表单验证之前，你应该对这些内容有一个基本的了解。

- [TypeScript](https://www.typescriptlang.org/docs/home.html "The TypeScript language") and HTML5  programming.

  [TypeScript](https://www.typescriptlang.org/docs/home.html "TypeScript 语言")和 HTML5 编程。

- Fundamental concepts of [Angular app design](guide/architecture "Introduction to Angular app-design concepts").

  [Angular 应用设计](guide/architecture "Angular 应用设计概念简介")的基本概念。

- The [two types of forms that Angular supports](guide/forms-overview "Introduction to Angular forms").

  [Angular 支持的两类表单](guide/forms-overview "Angular 表单简介")。

- Basics of either [Template-driven Forms](guide/forms "Template-driven forms guide") or [Reactive Forms](guide/reactive-forms "Reactive forms guide").

  [模板驱动表单](guide/forms "模板驱动表单指南")或[响应式表单](guide/reactive-forms "响应式表单指南")的基础知识。

<div class="alert is-helpful">

Get the complete example code for the reactive and template-driven forms used here to illustrate form validation.
Run the <live-example></live-example>.

要获取这里用讲解表单验证的响应式表单和模板驱动表单的完整示例代码。请运行<live-example></live-example>。

</div>

{@a template-driven-validation}

## Validating input in template-driven forms

## 在模板驱动表单中验证输入

To add validation to a template-driven form, you add the same validation attributes as you
would with [native HTML form validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
Angular uses directives to match these attributes with validator functions in the framework.

为了往模板驱动表单中添加验证机制，你要添加一些验证属性，就像[原生的 HTML 表单验证器](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)。
Angular 会用指令来匹配这些具有验证功能的指令。

Every time the value of a form control changes, Angular runs validation and generates
either a list of validation errors that results in an INVALID status, or null, which results in a VALID status.

每当表单控件中的值发生变化时，Angular 就会进行验证，并生成一个验证错误的列表（对应着 INVALID 状态）或者 null（对应着 VALID 状态）。

You can then inspect the control's state by exporting `ngModel` to a local template variable.
The following example exports `NgModel` into a variable called `name`:

你可以通过把 `ngModel` 导出成局部模板变量来查看该控件的状态。
比如下面这个例子就把 `NgModel` 导出成了一个名叫 `name` 的变量：

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="name-with-error-msg" header="template/hero-form-template.component.html (name)"></code-example>

Notice the following features illustrated by the example.

注意这个例子讲解的如下特性。

* The `<input>` element carries the HTML validation attributes: `required` and `minlength`. It
  also carries a custom validator directive, `forbiddenName`. For more
  information, see the [Custom validators](#custom-validators) section.

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

{@a dirty-or-touched}

{@a dirty-or-touching}

<div class="alert is-helpful">

To prevent the validator from displaying errors before the user has a chance to edit the form, you should check for either the `dirty` or `touched` states in a control.

为防止验证程序在用户有机会编辑表单之前就显示错误，你应该检查控件的 `dirty` 状态或 `touched` 状态。

* When the user changes the value in the watched field, the control is marked as "dirty".

  当用户在被监视的字段中修改该值时，控件就会被标记为 `dirty`（脏）。

* When the user blurs the form control element, the control is marked as "touched".

  当用户的表单控件失去焦点时，该控件就会被标记为 `touched`（已接触）。

</div>

{@a reactive-form-validation}

## Validating input in reactive forms

## 在响应式表单中验证输入

In a reactive form, the source of truth is the component class.
Instead of adding validators through attributes in the template, you add validator functions directly to the form control model in the component class.
Angular then calls these functions whenever the value of the control changes.

在响应式表单中，权威数据源是其组件类。不应该通过模板上的属性来添加验证器，而应该在组件类中直接把验证器函数添加到表单控件模型上（`FormControl`）。然后，一旦控件发生了变化，Angular 就会调用这些函数。

### Validator functions

### 验证器（Validator）函数

Validator functions can be either synchronous or asynchronous.

验证器函数可以是同步函数，也可以是异步函数。

- **Sync validators**: Synchronous functions that take a control instance and immediately return either a set of validation errors or `null`. You can pass these in as the second argument when you instantiate a `FormControl`.

   **同步验证器**：这些同步函数接受一个控件实例，然后返回一组验证错误或 `null`。你可以在实例化一个 `FormControl` 时把它作为构造函数的第二个参数传进去。

- **Async validators**: Asynchronous functions that take a control instance and return a Promise
  or Observable that later emits a set of validation errors or `null`. You can
  pass these in as the third argument when you instantiate a `FormControl`.

  **异步验证器** ：这些异步函数接受一个控件实例并返回一个 Promise 或 Observable，它稍后会发出一组验证错误或 `null`。在实例化 `FormControl` 时，可以把它们作为第三个参数传入。

For performance reasons, Angular only runs async validators if all sync validators pass. Each must complete before errors are set.

出于性能方面的考虑，只有在所有同步验证器都通过之后，Angular 才会运行异步验证器。当每一个异步验证器都执行完之后，才会设置这些验证错误。

### Built-in validator functions

### 内置验证器函数

You can choose to [write your own validator functions](#custom-validators), or you can use some of Angular's built-in validators.

你可以选择[编写自己的验证器函数](#custom-validators)，也可以使用 Angular 的一些内置验证器。

The same built-in validators that are available as attributes in template-driven forms, such as `required` and `minlength`, are all available to use as functions from the `Validators` class.
For a full list of built-in validators, see the [Validators](api/forms/Validators) API reference.

在模板驱动表单中用作属性的那些内置验证器，比如 `required` 和 `minlength`，也都可以作为 `Validators` 类中的函数使用。有关内置验证器的完整列表，参见 API 参考手册中的[验证器](api/forms/Validators)部分。

To update the hero form to be a reactive form, you can use some of the same
built-in validators—this time, in function form, as in the following example.

要想把这个英雄表单改造成一个响应式表单，你还是要用那些内置验证器，但这次改为用它们的函数形态。参见下面的例子。

{@a reactive-component-class}

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.1.ts" region="form-group" header="reactive/hero-form-reactive.component.ts (validator functions)"></code-example>

In this example, the `name` control sets up two built-in validators—`Validators.required` and `Validators.minLength(4)`—and one custom validator, `forbiddenNameValidator`. (For more details see [custom validators](#custom-validators) below.)

在这个例子中，`name` 控件设置了两个内置验证器 - `Validators.required` 和 `Validators.minLength(4)` 以及一个自定义验证器 `forbiddenNameValidator`。（欲知详情，请参阅下面的[自定义验证器](#custom-validators)部分。）

All of these validators are synchronous, so they are passed as the second argument. Notice that you can support multiple validators by passing the functions in as an array.

所有这些验证器都是同步的，所以它们作为第二个参数传递。注意，你可以通过把这些函数放到一个数组中传入来支持多个验证器。

This example also adds a few getter methods. In a reactive form, you can always access any form control through the `get` method on its parent group, but sometimes it's useful to define getters as shorthand for the template.

这个例子还添加了一些 getter 方法。在响应式表单中，你通常会通过它所属的控件组（FormGroup）的 `get` 方法来访问表单控件，但有时候为模板定义一些 getter 作为简短形式。

If you look at the template for the `name` input again, it is fairly similar to the template-driven example.

如果你到模板中找到 `name` 输入框，就会发现它和模板驱动的例子很相似。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.html" region="name-with-error-msg" header="reactive/hero-form-reactive.component.html (name with error msg)"></code-example>

This form differs from the template-driven version in that it no longer exports any directives. Instead, it uses the `name` getter defined in  the component class.

这个表单与模板驱动的版本不同，它不再导出任何指令。相反，它使用组件类中定义的 `name` 读取器（getter）。

Notice that the `required` attribute is still present in the template. Although it's not necessary for validation, it should be retained to for accessibility purposes.

请注意，`required` 属性仍然出现在模板中。虽然它对于验证来说不是必须的，但为了无障碍性，还是应该保留它。

{@a custom-validators}

## Defining custom validators

## 定义自定义验证器

The built-in validators don't always match the exact use case of your application, so you sometimes need to create a custom validator.

内置的验证器并不是总能精确匹配应用中的用例，因此有时你需要创建一个自定义验证器。

Consider the `forbiddenNameValidator` function from previous [reactive-form examples](#reactive-component-class).
Here's what the definition of that function looks like.

考虑前面的[响应式式表单中](#reactive-component-class)的 `forbiddenNameValidator` 函数。该函数的定义如下。

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="custom-validator" header="shared/forbidden-name.directive.ts (forbiddenNameValidator)"></code-example>

The function is actually a factory that takes a regular expression to detect a _specific_ forbidden name and returns a validator function.

这个函数实际上是一个工厂，它接受一个用来检测指定名字是否已被禁用的正则表达式，并返回一个验证器函数。

In this sample, the forbidden name is "bob", so the validator will reject any hero name containing "bob".
Elsewhere it could reject "alice" or any name that the configuring regular expression matches.

在本例中，禁止的名字是“bob”；
验证器会拒绝任何带有“bob”的英雄名字。
在其它地方，只要配置的正则表达式可以匹配上，它可能拒绝“alice”或者任何其它名字。

The `forbiddenNameValidator` factory returns the configured validator function.
That function takes an Angular control object and returns _either_
null if the control value is valid _or_ a validation error object.
The validation error object typically has a property whose name is the validation key, `'forbiddenName'`,
and whose value is an arbitrary dictionary of values that you could insert into an error message, `{name}`.

`forbiddenNameValidator` 工厂函数返回配置好的验证器函数。
该函数接受一个 Angular 控制器对象，并在控制器值有效时返回 null，或无效时返回验证错误对象。
验证错误对象通常有一个名为验证秘钥（`forbiddenName`）的属性。其值为一个任意词典，你可以用来插入错误信息（`{name}`）。

Custom async validators are similar to sync validators, but they must instead return a Promise or observable that later emits null or a validation error object.
In the case of an observable, the observable must complete, at which point the form uses the last value emitted for validation.

自定义异步验证器和同步验证器很像，只是它们必须返回一个稍后会输出 null 或“验证错误对象”的承诺（Promise）或可观察对象，如果是可观察对象，那么它必须在某个时间点被完成（complete），那时候这个表单就会使用它输出的最后一个值作为验证结果。（译注：HTTP 服务是自动完成的，但是某些自定义的可观察对象可能需要手动调用 complete 方法）

{@a adding-to-reactive-forms}

{@a addition-to-reactive-forms}

### Adding custom validators to reactive forms

### 把自定义验证器添加到响应式表单中

In reactive forms, add a custom validator by passing the function directly to the `FormControl`.

在响应式表单中，通过直接把该函数传给 `FormControl` 来添加自定义验证器。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.1.ts" region="custom-validator" header="reactive/hero-form-reactive.component.ts (validator functions)"></code-example>

{@a adding-to-template-driven-forms}

{@a adds-to-template-driven-forms}

### Adding custom validators to template-driven forms

### 为模板驱动表单中添加自定义验证器

In template-driven forms, add a directive to the template, where the directive wraps the validator function.
For example, the corresponding `ForbiddenValidatorDirective` serves as a wrapper around the `forbiddenNameValidator`.

在模板驱动表单中，要为模板添加一个指令，该指令包含了 validator 函数。例如，对应的 `ForbiddenValidatorDirective` 用作 `forbiddenNameValidator` 的包装器。

Angular recognizes the directive's role in the validation process because the directive registers itself with the `NG_VALIDATORS` provider, as shown in the following example.
`NG_VALIDATORS` is a predefined provider with an extensible collection of validators.

Angular 在验证过程中会识别出该指令的作用，因为该指令把自己注册成了 `NG_VALIDATORS` 提供者，如下例所示。`NG_VALIDATORS` 是一个带有可扩展验证器集合的预定义提供者。

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="directive-providers" header="shared/forbidden-name.directive.ts (providers)"></code-example>

The directive class then implements the `Validator` interface, so that it can easily integrate
with Angular forms.
Here is the rest of the directive to help you get an idea of how it all
comes together.

然后该指令类实现了 `Validator` 接口，以便它能简单的与 Angular 表单集成在一起。这个指令的其余部分有助于你理解它们是如何协作的：

<code-example path="form-validation/src/app/shared/forbidden-name.directive.ts" region="directive" header="shared/forbidden-name.directive.ts (directive)">
</code-example>

Once the `ForbiddenValidatorDirective` is ready, you can add its selector, `appForbiddenName`, to any input element to activate it.
For example:

一旦 `ForbiddenValidatorDirective` 写好了，你只要把 `forbiddenName` 选择器添加到输入框上就可以激活这个验证器了。比如：

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="name-input" header="template/hero-form-template.component.html (forbidden-name-input)"></code-example>

<div class="alert is-helpful">

Notice that the custom validation directive is instantiated with `useExisting` rather than `useClass`. The registered validator must be *this instance* of
the `ForbiddenValidatorDirective`—the instance in the form with
its `forbiddenName` property bound to “bob".

注意，自定义验证指令是用 `useExisting` 而不是 `useClass` 来实例化的。注册的验证程序必须是 `ForbiddenValidatorDirective` *实例本身* - 表单中的实例，也就是表单中 `forbiddenName` 属性被绑定到了"bob"的那个。

If you were to replace `useExisting` with `useClass`, then you’d be registering a new class instance, one that doesn’t have a `forbiddenName`.

如果用 `useClass` 来代替 `useExisting`，就会注册一个新的类实例，而它是没有 `forbiddenName` 的。

</div>

## Control status CSS classes

## 表示控件状态的 CSS 类

Angular automatically mirrors many control properties onto the form control element as CSS classes. You can use these classes to style form control elements according to the state of the form.
The following classes are currently supported.

Angular 会自动把很多控件属性作为 CSS 类映射到控件所在的元素上。你可以使用这些类来根据表单状态给表单控件元素添加样式。目前支持下列类：

* `.ng-valid`
* `.ng-invalid`
- `.ng-pending`
- `.ng-pristine`
- `.ng-dirty`
- `.ng-untouched`
- `.ng-touched`

In the following example, the hero form uses the `.ng-valid` and `.ng-invalid` classes to
set the color of each form control's border.

在下面的例子中，这个英雄表单使用 `.ng-valid` 和 `.ng-invalid` 来设置每个表单控件的边框颜色。

<code-example path="form-validation/src/assets/forms.css" header="forms.css (status classes)">

</code-example>

## Cross-field validation

## 跨字段交叉验证

A cross-field validator is a [custom validator](#custom-validators "Read about custom validators") that compares the values of different fields in a form and accepts or rejects them in combination.
For example, you might have a form that offers mutually incompatible options, so that if the user can choose A or B, but not both.
Some field values might also depend on others; a user might be allowed to choose B only if A is also chosen.

跨字段交叉验证器是一种[自定义验证器](#custom-validators "阅读自定义验证器")，可以对表单中不同字段的值进行比较，并针对它们的组合进行接受或拒绝。例如，你可能有一个提供互不兼容选项的表单，以便让用户选择 A 或 B，而不能两者都选。某些字段值也可能依赖于其它值；用户可能只有当选择了 A 之后才能选择 B。

The following cross validation examples show how to do the following:

下列交叉验证的例子说明了如何进行如下操作：

- Validate reactive or template-based form input based on the values of two sibling controls,

  根据两个兄弟控件的值验证响应式表单或模板驱动表单的输入，

- Show a descriptive error message after the user interacted with the form and the validation failed.

  当用户与表单交互过，且验证失败后，就会显示描述性的错误信息。

The examples use cross-validation to ensure that heroes do not reveal their true identities by filling out the Hero Form. The validators do this by checking that the hero names and alter egos do not match.

这些例子使用了交叉验证，以确保英雄们不会通过填写 Hero 表单来暴露自己的真实身份。验证器会通过检查英雄的名字和第二人格是否匹配来做到这一点。

### Adding cross-validation to reactive forms

### 为响应式表单添加交叉验证

The form has the following structure:

该表单具有以下结构：

```javascript
const heroForm = new FormGroup({
  'name': new FormControl(),
  'alterEgo': new FormControl(),
  'power': new FormControl()
});
```

Notice that the `name` and `alterEgo` are sibling controls.
To evaluate both controls in a single custom validator, you must perform the validation in a common ancestor control: the `FormGroup`.
You query the `FormGroup` for its child controls so that you can compare their values.

注意，`name` 和 `alterEgo` 是兄弟控件。要想在单个自定义验证器中计算这两个控件，你就必须在它们共同的祖先控件中执行验证： `FormGroup`。你可以在 `FormGroup` 中查询它的子控件，从而让你能比较它们的值。

To add a validator to the `FormGroup`, pass the new validator in as the second argument on creation.

要想给 `FormGroup` 添加验证器，就要在创建时把一个新的验证器传给它的第二个参数。

```javascript
const heroForm = new FormGroup({
  'name': new FormControl(),
  'alterEgo': new FormControl(),
  'power': new FormControl()
}, { validators: identityRevealedValidator });
```

The validator code is as follows.

验证器的代码如下。

<code-example path="form-validation/src/app/shared/identity-revealed.directive.ts" region="cross-validation-validator" header="shared/identity-revealed.directive.ts"></code-example>

The `identity` validator implements the `ValidatorFn` interface. It takes an Angular control object as an argument and returns either null if the form is valid, or `ValidationErrors` otherwise.

这个 `identity` 验证器实现了 `ValidatorFn` 接口。它接收一个 Angular 表单控件对象作为参数，当表单有效时，它返回一个 null，否则返回 `ValidationErrors` 对象。

The validator retrieves the child controls by calling the `FormGroup`'s [get](api/forms/AbstractControl#get) method, then compares the values of the `name` and `alterEgo` controls.

该验证器通过调用 `FormGroup` 的 [get](api/forms/AbstractControl#get) 方法来检索这些子控件，然后比较 `name` 和 `alterEgo` 控件的值。

If the values do not match, the hero's identity remains secret, both are valid, and the validator returns null.
If they do match, the hero's identity is revealed and the validator must mark the form as invalid by returning an error object.

如果值不匹配，则 hero 的身份保持秘密，两者都有效，且 validator 返回 null。如果匹配，就说明英雄的身份已经暴露了，验证器必须通过返回一个错误对象来把这个表单标记为无效的。

To provide better user experience, the template shows an appropriate error message when the form is invalid.

为了提供更好的用户体验，当表单无效时，模板还会显示一条恰当的错误信息。

<code-example path="form-validation/src/app/reactive/hero-form-reactive.component.html" region="cross-validation-error-message" header="reactive/hero-form-template.component.html"></code-example>

This `*ngIf` displays the error if the `FormGroup` has the cross validation error returned by the `identityRevealed` validator, but only if the user has finished [interacting with the form](#dirty-or-touched).

如果 `FormGroup` 中有一个由 `identityRevealed` 验证器返回的交叉验证错误，`*ngIf` 就会显示错误，但只有当该用户已经[与表单进行过交互](#dirty-or-touched)的时候才显示。

### Adding cross-validation to template-driven forms

### 为模板驱动表单添加交叉验证

For a template-driven form, you must create a directive to wrap the validator function.
You provide that directive as the validator using the [`NG_VALIDATORS` token](#adding-to-template-driven-forms "Read about providing validators"), as shown in the following example.

对于模板驱动表单，你必须创建一个指令来包装验证器函数。你可以使用[`NG_VALIDATORS` 令牌](#adding-to-template-driven-forms "了解如何提供验证器")来把该指令提供为验证器，如下例所示。

<code-example path="form-validation/src/app/shared/identity-revealed.directive.ts" region="cross-validation-directive" header="shared/identity-revealed.directive.ts"></code-example>

You must add the new directive to the HTML template.
Because the validator must be registered at the highest level in the form, the following template puts the directive on the `form` tag.

你必须把这个新指令添加到 HTML 模板中。由于验证器必须注册在表单的最高层，因此下列模板会把该指令放在 `form` 标签上。

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="cross-validation-register-validator" header="template/hero-form-template.component.html"></code-example>

To provide better user experience, we show an appropriate error message when the form is invalid.

为了提供更好的用户体验，当表单无效时，我们要显示一个恰当的错误信息。

<code-example path="form-validation/src/app/template/hero-form-template.component.html" region="cross-validation-error-message" header="template/hero-form-template.component.html"></code-example>

This is the same in both template-driven and reactive forms.

这在模板驱动表单和响应式表单中都是一样的。

## Creating asynchronous validators

## 创建异步验证器

Asynchronous validators implement the `AsyncValidatorFn` and `AsyncValidator` interfaces.
These are very similar to their synchronous counterparts, with the following differences.

异步验证器实现了 `AsyncValidatorFn` 和 `AsyncValidator` 接口。它们与其同步版本非常相似，但有以下不同之处。

- The `validate()` functions must return a Promise or an observable,

  `validate()` 函数必须返回一个 Promise 或可观察对象，

- The observable returned must be finite, meaning it must complete at some point.
  To convert an infinite observable into a finite one, pipe the observable through a filtering operator such as `first`, `last`, `take`, or `takeUntil`.

  返回的可观察对象必须是有尽的，这意味着它必须在某个时刻完成（complete）。要把无尽的可观察对象转换成有尽的，可以在管道中加入过滤操作符，比如 `first`、`last`、`take` 或 `takeUntil`。

Asynchronous validation happens after the synchronous validation, and is performed only if the synchronous validation is successful.
This check allows forms to avoid potentially expensive async validation processes (such as an HTTP request) if the more basic validation methods have already found invalid input.

异步验证在同步验证完成后才会发生，并且只有在同步验证成功时才会执行。如果更基本的验证方法已经发现了无效输入，那么这种检查顺序就可以让表单避免使用昂贵的异步验证流程（例如 HTTP 请求）。

After asynchronous validation begins, the form control enters a `pending` state. You can inspect the control's `pending` property and use it to give visual feedback about the ongoing validation operation.

异步验证开始之后，表单控件就会进入 `pending` 状态。你可以检查控件的 `pending` 属性，并用它来给出对验证中的视觉反馈。

A common UI pattern is to show a spinner while the async validation is being performed. The following example shows how to achieve this in a template-driven form.

一种常见的 UI 模式是在执行异步验证时显示 Spinner（转轮）。下面的例子展示了如何在模板驱动表单中实现这一点。

```html
<input [(ngModel)]="name" #model="ngModel" appSomeAsyncValidator>
<app-spinner *ngIf="model.pending"></app-spinner>
```

### Implementing a custom async validator

### 实现自定义异步验证器

In the following example, an async validator ensures that heroes pick an alter ego that is not already taken.
New heroes are constantly enlisting and old heroes are leaving the service, so the list of available alter egos cannot be retrieved ahead of time.
To validate the potential alter ego entry, the validator must initiate an asynchronous operation to consult a central database of all currently enlisted heroes.

在下面的例子中，异步验证器可以确保英雄们选择了一个尚未采用的第二人格。新英雄不断涌现，老英雄也会离开，所以无法提前找到可用的人格列表。为了验证潜在的第二人格条目，验证器必须启动一个异步操作来查询包含所有在编英雄的中央数据库。

The following code create the validator class, `UniqueAlterEgoValidator`, which implements the `AsyncValidator` interface.

下面的代码创建了一个验证器类 `UniqueAlterEgoValidator`，它实现了 `AsyncValidator` 接口。

<code-example path="form-validation/src/app/shared/alter-ego.directive.ts" region="async-validator"></code-example>

The constructor injects the `HeroesService`, which defines the following interface.

构造函数中注入了 `HeroesService`，它定义了如下接口。

```typescript
interface HeroesService {
  isAlterEgoTaken: (alterEgo: string) => Observable<boolean>;
}
```

In a real world application, the `HeroesService` would be responsible for making an HTTP request to the hero database to check if the alter ego is available.
From the validator's point of view, the actual implementation of the service is not important, so the example can just code against the `HeroesService` interface.

在真实的应用中，`HeroesService` 会负责向英雄数据库发起一个 HTTP 请求，以检查该第二人格是否可用。
从该验证器的视角看，此服务的具体实现无关紧要，所以这个例子仅仅针对 `HeroesService` 接口来写实现代码。

As the validation begins, the `UniqueAlterEgoValidator` delegates to the `HeroesService` `isAlterEgoTaken()` method with the current control value.
At this point the control is marked as `pending` and remains in this state until the observable chain returned from the `validate()` method completes.

当验证开始的时候，`UniqueAlterEgoValidator` 把任务委托给 `HeroesService` 的 `isAlterEgoTaken()` 方法，并传入当前控件的值。这时候，该控件会被标记为 `pending` 状态，直到 `validate()` 方法所返回的可观察对象完成（complete）了。

The `isAlterEgoTaken()` method dispatches an HTTP request that checks if the alter ego is available, and returns `Observable<boolean>` as the result.
The `validate()` method pipes the response through the `map` operator and transforms it into a validation result.

`isAlterEgoTaken()` 方法会调度一个 HTTP 请求来检查第二人格是否可用，并返回 `Observable<boolean>` 作为结果。`validate()` 方法通过 `map` 操作符来对响应对象进行管道化处理，并把它转换成验证结果。

The method then, like any validator, returns `null` if the form is valid, and `ValidationErrors` if it is not.
This validator handles any potential errors with the `catchError` operator.
In this case, the validator treats the `isAlterEgoTaken()` error as a successful validation, because failure to make a validation request does not necessarily mean that the alter ego is invalid.
You could handle the error differently and return the `ValidationError` object instead.

与任何验证器一样，如果表单有效，该方法返回 `null`，如果无效，则返回 `ValidationErrors`。这个验证器使用 `catchError` 操作符来处理任何潜在的错误。在这个例子中，验证器将 `isAlterEgoTaken()` 错误视为成功的验证，因为未能发出验证请求并不一定意味着这个第二人格无效。你也可以用不同的方式处理这种错误，比如返回 `ValidationError` 对象。

After some time passes, the observable chain completes and the asynchronous validation is done.
The `pending` flag is set to `false`, and the form validity is updated.

一段时间过后，这条可观察对象链完成，异步验证也就完成了。`pending` 标志位也设置为 `false`，该表单的有效性也已更新。

### Optimizing performance of async validators

### 优化异步验证器的性能

By default, all validators run after every form value change. With synchronous validators, this does not normally have a noticeable impact on application performance.
Async validators, however, commonly perform some kind of HTTP request to validate the control. Dispatching an HTTP request after every keystroke could put a strain on the backend API, and should be avoided if possible.

默认情况下，所有验证程序在每次表单值更改后都会运行。对于同步验证器，这通常不会对应用性能产生明显的影响。但是，异步验证器通常会执行某种 HTTP 请求来验证控件。每次击键后调度一次 HTTP 请求都会给后端 API 带来压力，应该尽可能避免。

You can delay updating the form validity by changing the `updateOn` property from `change` (default) to `submit` or `blur`.

你可以把 `updateOn` 属性从 `change`（默认值）改成 `submit` 或 `blur` 来推迟表单验证的更新时机。

With template-driven forms, set the property in the template.

使用模板驱动表单时，可以在模板中设置该属性。

```html
<input [(ngModel)]="name" [ngModelOptions]="{updateOn: 'blur'}">
```

With reactive forms, set the property in the `FormControl` instance.

使用响应式表单时，可以在 `FormControl` 实例中设置该属性。

```typescript
new FormControl('', {updateOn: 'blur'});
```
