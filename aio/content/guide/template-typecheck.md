# Template type checking

# 模板类型检查

## Overview of template type checking

## 模板类型检查概述

Just as TypeScript catches type errors in your code, Angular checks the expressions and bindings within the templates of your application and can report any type errors it finds.
Angular currently has three modes of doing this, depending on the value of the `fullTemplateTypeCheck` and `strictTemplates` flags in the [TypeScript configuration file](guide/typescript-configuration).

正如 TypeScript 在代码中捕获类型错误一样，Angular 也会检查应用程序模板中的表达式和绑定，并可以报告所发现的任何类型错误。
Angular 当前有三种执行此操作的模式，具体取决于 [TypeScript 配置文件](guide/typescript-configuration) 中的 `fullTemplateTypeCheck` 和 `strictTemplates` 标志的值。

### Basic mode

### 基本模式

In the most basic type-checking mode, with the `fullTemplateTypeCheck` flag set to `false`, Angular validates only top-level expressions in a template.

在最基本的类型检查模式下，将 `fullTemplateTypeCheck` 标志设置为 `false`，Angular 仅验证模板中的顶层表达式。

If you write `<map [city]="user.address.city">`, the compiler verifies the following:

如果编写 `<map [city]="user.address.city">`，则编译器将验证以下内容：

* `user` is a property on the component class.

  `user` 是该组件类的属性。

* `user` is an object with an address property.

  `user` 是具有 `address` 属性的对象。

* `user.address` is an object with a city property.

  `user.address` 是具有 `city` 属性的对象。

The compiler does not verify that the value of `user.address.city` is assignable to the city input of the `<map>` component.

编译器不会验证 `user.address.city` 的值是否可赋值给 `<map>` 组件的输入属性 `city`。

The compiler also has some major limitations in this mode:

编译器在此模式下也有一些主要限制：

* Importantly, it doesn't check embedded views, such as `*ngIf`, `*ngFor`, other `<ng-template>` embedded view.

  重要的是，它不会检查嵌入式视图，例如 `*ngIf`，`*ngFor` 和其它 `<ng-template>` 嵌入式视图。

* It doesn't figure out the types of `#refs`, the results of pipes, the type of `$event` in event bindings, and so on.

  它无法弄清 `#refs` 的类型、管道的结果、事件绑定中 `$event` 的类型等等。

In many cases, these things end up as type `any`, which can cause subsequent parts of the expression to go unchecked.

在许多情况下，这些东西最终都以 `any` 类型结束，这可能导致表达式的后续部分不受检查。

### Full mode

### 完全模式

If the `fullTemplateTypeCheck` flag is set to `true`, Angular is more aggressive in its type-checking within templates.
In particular:

如果将 `fullTemplateTypeCheck` 标志设置为 `true`，则 Angular 在模板中进行类型检查时会更加主动。特别是：

* Embedded views (such as those within an `*ngIf` or `*ngFor`) are checked.

  检查嵌入式视图（例如 `*ngIf` 或 `*ngFor` 内的 `*ngFor` ）。

* Pipes have the correct return type.

  管道具有正确的返回类型。

* Local references to directives and pipes have the correct type (except for any generic parameters, which will be `any`).

  对指令和管道的本地引用具有正确的类型（any 泛型参数除外，该通用参数将是 `any` ）。

The following still have type `any`.

以下仍然具有 `any` 类型。

* Local references to DOM elements.

  对 DOM 元素的本地引用。

* The `$event` object.

  `$event` 对象。

* Safe navigation expressions.

  安全导航表达式。

{@a strict-mode}

### Strict mode

### 严格模式

Angular version 9 maintains the behavior of the `fullTemplateTypeCheck` flag, and introduces a third "strict mode".
Strict mode is a superset of full mode, and is accessed by setting the `strictTemplates` flag to true. This flag supersedes the `fullTemplateTypeCheck` flag.
In strict mode, Angular version 9 adds checks that go beyond the version 8 type-checker.
Note that strict mode is only available if using Ivy.

Angular 版本 9 延续了 `fullTemplateTypeCheck` 标志的行为，并引入了第三个“严格模式”。严格模式是完全模式的超集，可以通过将 `strictTemplates` 标志设置为 true 来访问。该标志取代 `fullTemplateTypeCheck` 标志。在严格模式下，Angular 9 版添加了超出 8 版类型检查器的检查。请注意，严格模式仅在使用 Ivy 时可用。

In addition to the full mode behavior, Angular version 9:

除了完全模式的行为之外，Angular 版本 9 还会：

* Verifies that component/directive bindings are assignable to their `@Input()`s.

  验证组件/指令绑定是否可赋值给它们的 `@Input()`。

* Obeys TypeScript's `strictNullChecks` flag when validating the above.

  验证以上内容时，遵守 TypeScript 的 `strictNullChecks` 标志。

* Infers the correct type of components/directives, including generics.

  推断组件/指令的正确类型，包括泛型。

* Infers template context types where configured (for example, allowing correct type-checking of `NgFor`).

  推断配置模板上下文的类型（例如，允许对 `NgFor` 进行正确的类型检查）。

* Infers the correct type of `$event` in component/directive, DOM, and animation event bindings.

  在组件/指令、DOM 和动画事件绑定中推断 `$event` 的正确类型。

* Infers the correct type of local references to DOM elements, based on the tag name (for example, the type that `document.createElement` would return for that tag).

  根据标签（tag）名称（例如，`document.createElement` 将为该标签返回正确的类型），推断出对 DOM 元素的局部引用的正确类型。

## Checking of `*ngFor`

## `*ngFor` 检查

The three modes of type-checking treat embedded views differently. Consider the following example.

类型检查的三种模式对嵌入式视图的处理方式不同。考虑以下示例。

<code-example language="ts" header="User interface">

interface User {
  name: string;
  address: {
    city: string;
    state: string;
  }
}

</code-example>

```html

  <div *ngFor="let user of users">

    <h2>{{config.title}}</h2>

    <span>City: {{user.address.city}}</span>

  </div>

```

The `<h2>` and the `<span>` are in the `*ngFor` embedded view.
In basic mode, Angular doesn't check either of them.
However, in full mode, Angular checks that `config` and `user` exist and assumes a type of `any`.
In strict mode, Angular knows that the `user` in the `<span>` has a type of `User`, and that `address` is an object with a `city` property of type `string`.

`<h2>` 和 `<span>` 在 `*ngFor` 嵌入式视图中。在基本模式下，Angular 不会检查它们中的任何一个。但是，在完全模式下，Angular 会检查 `config` 和 `user` 是否存在，并假设为 `any` 的类型。在严格模式下，Angular 知道该 `user` 在 `<span>` 中是 `User` 类型，而 `address` 是与一个对象，它有一个 `string` 类型的属性 `city`。

{@a troubleshooting-template-errors}

## Troubleshooting template errors

## 排除模板错误

When enabling the new strict mode in version 9, you might encounter template errors that didn't arise in either of the previous modes.
These errors often represent genuine type mismatches in the templates that were not caught by the previous tooling.
If this is the case, the error message should make it clear where in the template the problem occurs.

在版本 9 中启用新的严格模式时，你可能会遇到在以前的两种模式下都没有出现过的模板错误。这些错误通常表示模板中的真正类型不匹配，而以前的工具并未捕获这些错误。在这种情况下，该错误消息会使该问题在模板中的位置清晰可见。

There can also be false positives when the typings of an Angular library are either incomplete or incorrect, or when the typings don't quite line up with expectations as in the following cases.

当 Angular 库的类型不完整或不正确，或者在以下情况下类型与预期不完全一致时，也可能存在误报。

* When a library's typings are wrong or incomplete (for example, missing `null | undefined` if the library was not written with `strictNullChecks` in mind).

  当库的类型错误或不完整时（例如，如果编写库的时候没有注意 `strictNullChecks`，则可能缺少 `null | undefined` ）。

* When a library's input types are too narrow and the library hasn't added appropriate metadata for Angular to figure this out. This usually occurs with disabled or other common Boolean inputs used as attributes, for example, `<input disabled>`.

  当库的输入类型太窄并且库没有为 Angular 添加适当的元数据来解决这个问题时。这通常在禁用或使用其它通用布尔输入作为属性时发生，例如 `<input disabled>`。

* When using `$event.target` for DOM events (because of the possibility of event bubbling, `$event.target` in the DOM typings doesn't have the type you might expect).

  在将 `$event.target` 用于 DOM 事件时（由于事件冒泡的可能性，DOM 类型中的 `$event.target` 不具有你可能期望的类型）。

In case of a false positive like these, there are a few options:

如果发生此类误报，则有以下几种选择：

* Use the [`$any()` type-cast function](guide/template-syntax#any-type-cast-function) in certain contexts to opt out of type-checking for a part of the expression.

  在某些情况下，使用 [`$any()` 类型转换函数](guide/template-syntax#any-type-cast-function)可以选择不对部分表达式进行类型检查。

* You can disable strict checks entirely by setting `strictTemplates: false` in the application's TypeScript configuration file.

  你可以通过在应用程序的 TypeScript 配置文件 `tsconfig.json` 中设置 `strictTemplates: false` 来完全禁用严格检查。
* You can disable certain type-checking operations individually, while maintaining strictness in other aspects, by setting a _strictness flag_ to `false`.

  通过将*严格性标志*设置为 `false`，可以在保持其它方面的严格性的同时，单独禁用某些特定的类型检查操作。

* If you want to use `strictTemplates` and `strictNullChecks` together, you can opt out of strict null type checking specifically for input bindings via `strictNullInputTypes`.

  如果要一起使用 `strictTemplates` 和 `strictNullChecks`，则可以通过 `strictNullInputTypes` 来选择性排除专门用于输入绑定的严格空类型检查。

| Strictness flag | Effect |
| --------------- | ------ |
| 严格标志 | 影响 |
| `strictInputTypes` | Whether the assignability of a binding expression to the `@Input()` field is checked. Also affects the inference of directive generic types. |
| `strictInputTypes` | 是否检查绑定表达式对 `@Input()` 字段的可赋值性。也会影响指令泛型类型的推断。|
| `strictNullInputTypes` | Whether `strictNullChecks` is honored when checking `@Input()` bindings (per `strictInputTypes`). Turning this off can be useful when using a library that was not built with `strictNullChecks` in mind. |
| `strictNullInputTypes` | 检查 `@Input()` 绑定时是否要 `strictNullChecks`（对于每个 `strictInputTypes`）。当使用的库不是基于 `strictNullChecks` 构建的时，将其关闭会很有帮助。|
| `strictAttributeTypes` | Whether to check `@Input()` bindings that are made using text attributes (for example, `<mat-tab label="Step 1">` vs `<mat-tab [label]="'Step 1'">`). |
| `strictAttributeTypes` | 是否检查使用文本属性（例如，`<mat-tab label="Step 1">` 与 `<mat-tab [label]="'Step 1'">`）进行的 `@Input()` 绑定。|
| `strictSafeNavigationTypes` | Whether the return type of safe navigation operations (for example, `user?.name`) will be correctly inferred based on the type of `user`). If disabled, `user?.name` will be of type `any`. |
| `strictSafeNavigationTypes` | 是否根据 `user` 的类型正确推断出安全导航操作的返回类型（例如 `user?.name` ）。如果禁用，则 `user?.name` 的类型为 `any`。|
| `strictDomLocalRefTypes` | Whether local references to DOM elements will have the correct type. If disabled `ref` will be of type `any` for `<input #ref>`. |
| `strictDomLocalRefTypes` | 对 DOM 元素的本地引用是否将具有正确的类型。如果禁用，对于 `<input #ref>` 来说 `ref` 会是 `any` 类型的。|
| `strictOutputEventTypes` | Whether `$event` will have the correct type for event bindings to component/directive an `@Output()`, or to animation events. If disabled, it will be `any`. |
| `strictOutputEventTypes` | 对于绑定到组件/指令 `@Output()` 或动画事件的事件绑定，`$event` 是否具有正确的类型。如果禁用，它将为 `any`。|
| `strictDomEventTypes` | Whether `$event` will have the correct type for event bindings to DOM events. If disabled, it will be `any`. |
| `strictDomEventTypes` | 对于与 DOM 事件的事件绑定，`$event` 是否具有正确的类型。如果禁用，它将为 `any`。|
|`strictContextGenerics`|Whether the type parameters of generic components will be inferred correctly (including any generic bounds). If disabled, any type parameters will be `any`.|
|`strictContextGenerics`|泛型组件的类型参数是否应该被正确推断（包括泛型上界和下界）. 如果禁用它，所有的类型参数都会被当做 `any`。|
|`strictLiteralTypes`|Whether object and array literals declared in the template will have their type inferred. If disabled, the type of such literals will be `any`.|
|`strictLiteralTypes`|是否要推断模板中声明的对象和数组字面量的类型。如果禁用，则此类文字的类型就是 `any`。|

If you still have issues after troubleshooting with these flags, you can fall back to full mode by disabling `strictTemplates`.

如果使用这些标志进行故障排除后仍然存在问题，可以通过禁用 `strictTemplates` 退回到完全模式。

If that doesn't work, an option of last resort is to turn off full mode entirely with `fullTemplateTypeCheck: false`, as we've made a special effort to make Angular version 9 backwards compatible in this case.

如果这不起作用，则最后一种选择是完全关闭 full 模式，并使用 `fullTemplateTypeCheck: false`，因为在这种情况下，我们已经做了一些特殊的努力来使 Angular 9 向后兼容。

A type-checking error that you cannot resolve with any of the recommended methods can be the result of a bug in the template type-checker itself.
If you get errors that require falling back to basic mode, it is likely to be such a bug.
If this happens, please [file an issue](https://github.com/angular/angular/issues) so the team can address it.

你无法使用任何推荐方式解决的类型检查错误可能是因为模板类型检查器本身存在错误。如果遇到需要退回到基本模式的错误，则很可能是这样的错误。如果发生这种情况，请[提出问题](https://github.com/angular/angular/issues)，以便开发组解决。

## Inputs and type-checking

## 输入和类型检查

In Angular version 9, the template type checker checks whether a binding expression's type is compatible with that of the corresponding directive input.
As an example, consider the following component:

在 Angular 版本 9 中，模板类型检查器会检查绑定表达式的类型是否与相应指令输入的类型兼容。例如，请考虑以下组件：

```typescript

export interface User {
  name: string;
}

@Component({
  selector: 'user-detail',
  template: '{{ user.name }}',
})
export class UserDetailComponent {
  @Input() user: User;
}

```

The `AppComponent` template uses this component as follows:

`AppComponent` 模板按以下方式使用此组件：

```ts

@Component({
  selector: 'my-app',
  template: '<user-detail [user]="selectedUser" />',
})
export class AppComponent {
  selectedUser: User | null = null;
}

```

Here, during type checking of the template for `AppComponent`, the `[user]="selectedUser"` binding corresponds with the `UserDetailComponent.user` input.
Therefore, Angular assigns the `selectedUser` property to `UserDetailComponent.user`, which would result in an error if their types were incompatible.
TypeScript checks the assignment according to its type system, obeying flags such as `strictNullChecks` as they are configured in the application.

这里，在检查 `AppComponent` 的模板期间，`[user]="selectedUser"` 绑定与 `UserDetailComponent.user` 输入属性相对应。因此，Angular 会将 `selectedUser` 属性赋值给 `UserDetailComponent.user`，如果它们的类型不兼容，则将导致错误。TypeScript 会根据其类型系统进行赋值检查，并遵循在应用程序中配置的标志（例如 `strictNullChecks` ）。

You can avoid run-time type errors by providing more specific in-template type requirements to the template type checker. Make the input type requirements for your own directives as specific as possible by providing template-guard functions in the directive definition. See [Improving template type checking for custom directives](guide/structural-directives#directive-type-checks), and [Input setter coercion](#input-setter-coercion) in this guide.

通过向模板类型检查器提出更具体的模板内类型要求，可以避免一些运行时类型错误。通过在指令定义中提供各种“模板守卫”功能，可以让自定义指令的输入类型要求尽可能具体。参阅本指南中的[强化自定义指令的模板类型检查](guide/structural-directives#directive-type-checks)和[输入属性 setter 的强制转换](#input-setter-coercion)。

### Strict null checks

### 严格的空检查

When you enable `strictTemplates` and the TypeScript flag `strictNullChecks`, typecheck errors may occur for certain situations that may not easily be avoided. For example:

当你启用 `strictTemplates` 和 TypeScript 标志 `strictNullChecks`，在某些情况下可能会发生类型检查错误，这些情况很难避免。例如：

* A nullable value that is bound to a directive from a library which did not have `strictNullChecks` enabled.

    一个可空值，该值绑定到未启用 `strictNullChecks` 的库中的指令。

For a library compiled without `strictNullChecks`, its declaration files will not indicate whether a field can be `null` or not.
  For situations where the library handles `null` correctly, this is problematic, as the compiler will check a nullable value against the declaration files which omit the `null` type.
  As such, the compiler produces a type-check error because it adheres to `strictNullChecks`.

  对于没有使用 `strictNullChecks` 编译的库，其声明文件将不会指示字段是否可以为 `null`。对于库正确处理 `null` 的情况，这是有问题的，因为编译器将根据声明文件进行空值检查，而它省略了 `null` 类型。这样，编译器会产生类型检查错误，因为它要遵守 `strictNullChecks`。

* Using the `async` pipe with an Observable which you know will emit synchronously.

    将 `async` 管道与 Observable 一起使用会同步发出值。

The `async` pipe currently assumes that the Observable it subscribes to can be asynchronous, which means that it's possible that there is no value available yet.
  In that case, it still has to return something&mdash;which is `null`.
  In other words, the return type of the `async` pipe includes `null`, which may result in errors in situations where the Observable is known to emit a non-nullable value synchronously.

  `async` 管道当前假定它预订的 Observable 可以是异步的，这意味着可能还没有可用的值。在这种情况下，它仍然必须返回某些内容 —— `null`。换句话说，`async` 管道的返回类型包括 `null`，这在知道此 Observable 会同步发出非空值的情况下可能会导致错误。

There are two potential workarounds to the above issues:

对于上述问题，有两种潜在的解决方法：

1. In the template, include the non-null assertion operator `!` at the end of a nullable expression, such as  `<user-detail [user]="user!" />`.

     在模板中，包括非空断言运算符 `!` 用在可为空的表达式的末尾，例如 `<user-detail [user]="user!" />`。

     In this example, the compiler disregards type incompatibilities in nullability, just as in TypeScript code.
     In the case of the `async` pipe, note that the expression needs to be wrapped in parentheses, as in `<user-detail [user]="(user$ | async)!" />`.

     在此示例中，编译器在可空性方面会忽略类型不兼容，就像在 TypeScript 代码中一样。对于 `async` 管道，请注意，表达式需要用括号括起来，如 `<user-detail [user]="(user$ | async)!" />`。

1. Disable strict null checks in Angular templates completely.

   完全禁用 Angular 模板中的严格空检查。

   When `strictTemplates` is enabled, it is still possible to disable certain aspects of type checking.
   Setting the option `strictNullInputTypes` to `false` disables strict null checks within Angular templates.
   This flag applies for all components that are part of the application.

   当启用 `strictTemplates` 时，仍然可以禁用类型检查的某些方面。将选项 `strictNullInputTypes` 设置为 `false` 将禁用 Angular 模板中的严格空检查。此标志会作用于应用程序中包含的所有组件。

### Advice for library authors

### 给库作者的建议

As a library author, you can take several measures to provide an optimal experience for your users.
First, enabling `strictNullChecks` and including `null` in an input's type, as appropriate, communicates to your consumers whether they can provide a nullable value or not.
Additionally, it is possible to provide type hints that are specific to the template type checker. See [Improving template type checking for custom directives](guide/structural-directives#directive-type-checks), and [Input setter coercion](#input-setter-coercion) below.

作为库作者，你可以采取多种措施为用户提供最佳体验。首先，启用 `strictNullChecks` 并在输入的类型中包括 `null`（如果适用），可以与消费者沟通，看他们是否可以提供可空的值。
此外，可以提供特定模板类型检查器的类型提示，请参阅本指南的[为自定义指令改进模板类型检查](guide/structural-directives#directive-type-checks)和[输入设置器强制转型](guide/template-typecheck#input-setter-coercion)部分。

{@a input-setter-coercion}

## Input setter coercion

## 输入设置器强制转型

Occasionally it is desirable for the `@Input()` of a directive or component to alter the value bound to it, typically using a getter/setter pair for the input.
As an example, consider this custom button component:

有时，指令或组件的 `@Input()` 最好更改绑定到它的值，通常使用此输入的 getter / setter 对。例如，考虑以下自定义按钮组件：

Consider the following directive:

考虑以下指令：

```typescript

@Component({
  selector: 'submit-button',
  template: `

    <div class="wrapper">

      <button [disabled]="disabled">Submit</button>'

    </div>

  `,
})
class SubmitButton {
  private _disabled: boolean;

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }
}

```

Here, the `disabled` input of the component is being passed on to the `<button>` in the template. All of this works as expected, as long as a `boolean` value is bound to the input. But, suppose a consumer uses this input in the template as an attribute:

在这里，组件的输入 `disabled` 将传给模板中的 `<button>`。只要将 `boolean` 值绑定到输入，所有这些工作都可以按预期进行。但是，假设使用者使用模板中的这个输入作为属性：

```html

<submit-button disabled></submit-button>

```

This has the same effect as the binding:

这与绑定具有相同的效果：

```html

<submit-button [disabled]="''"></submit-button>

```

At runtime, the input will be set to the empty string, which is not a `boolean` value. Angular component libraries that deal with this problem often "coerce" the value into the right type in the setter:

在运行时，输入将设置为空字符串，这不是 `boolean` 值。处理此问题的角组件库通常将值“强制转换”到 setter 中的正确类型中：

```typescript

set disabled(value: boolean) {
  this._disabled = (value === '') || value;
}

```

It would be ideal to change the type of `value` here, from `boolean` to `boolean|''`, to match the set of values which are actually accepted by the setter.
TypeScript requires that both the getter and setter have the same type, so if the getter should return a `boolean` then the setter is stuck with the narrower type.

最好在这里将 `value` 的类型从 `boolean` 更改为 `boolean|''` 以匹配 setter 实际会接受的一组值。TypeScript 要求 getter 和 setter 的类型相同，因此，如果 getter 应该返回 `boolean` 则 setter 会卡在较窄的类型上。

If the consumer has Angular's strictest type checking for templates enabled, this creates a problem: the empty string `''` is not actually assignable to the `disabled` field, which will create a type error when the attribute form is used.

如果消费者对模板启用了 Angular 的最严格的类型检查功能，则会产生一个问题：空字符串 `''` 实际上无法赋值给 `disabled` 字段，使用属性格式写会产生类型错误。

As a workaround for this problem, Angular supports checking a wider, more permissive type for `@Input()` than is declared for the input field itself. Enable this by adding a static property with the `ngAcceptInputType_` prefix to the component class:

作为解决此问题的一种取巧方式，Angular 支持对 `@Input()` 检查比声明的输入字段更宽松的类型。
通过向组件类添加带有 `ngAcceptInputType_` 前缀的静态属性来启用此功能：

```typescript

class SubmitButton {
  private _disabled: boolean;

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = (value === '') || value;
  }

  static ngAcceptInputType_disabled: boolean|'';
}

```

This field does not need to have a value. Its existence communicates to the Angular type checker that the `disabled` input should be considered as accepting bindings that match the type `boolean|''`. The suffix should be the `@Input` _field_ name.

该字段不需要值。它只要存在就会通知 Angular 的类型检查器，`disabled` 输入应被视为接受与 `boolean|''` 类型匹配的绑定。后缀应为 `@Input` *字段*的名称。

Care should be taken that if an `ngAcceptInputType_` override is present for a given input, then the setter should be able to handle any values of the overridden type.

请注意，如果给定输入存在 `ngAcceptInputType_` 覆盖，则设置器应能够处理任何覆盖类型的值。

## Disabling type checking using `$any()`

## 使用 `$any()` 禁用类型检查

Disable checking of a binding expression by surrounding the expression in a call to the [`$any()` cast pseudo-function](guide/template-syntax).
The compiler treats it as a cast to the `any` type just like in TypeScript when a `<any>` or `as any` cast is used.

可以通过把绑定表达式包含在[类型转换伪函数 `$any()` ](guide/template-syntax) 中来禁用类型检查。
  编译器会像在 TypeScript 中使用 `<any>` 或 `as any` 进行类型转换一样对待它。

In the following example, casting `person` to the `any` type suppresses the error `Property address does not exist`.

在以下示例中，将 `person` 强制转换为 `any` 类型可以压制错误 `Property address does not exist`。

```typescript

  @Component({
    selector: 'my-component',
    template: '{{$any(person).addresss.street}}'
  })
  class MyComponent {
    person?: Person;
  }

```
