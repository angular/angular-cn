/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, forwardRef, Host, Inject, Input, OnChanges, OnDestroy, Optional, Output, Self, SimpleChanges} from '@angular/core';

import {FormControl, FormHooks} from '../model';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '../validators';

import {AbstractFormGroupDirective} from './abstract_form_group_directive';
import {ControlContainer} from './control_container';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';
import {NgControl} from './ng_control';
import {NgForm} from './ng_form';
import {NgModelGroup} from './ng_model_group';
import {composeAsyncValidators, composeValidators, controlPath, isPropertyUpdated, selectValueAccessor, setUpControl} from './shared';
import {TemplateDrivenErrors} from './template_driven_errors';
import {AsyncValidator, AsyncValidatorFn, Validator, ValidatorFn} from './validators';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => NgModel)
};

/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 *
 * 当输入发生变化时，`ngModel` 会强制运行额外的变更检测，比如：
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have and old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * 也就是说，`ngModel` 可以把它自己导出到元素上，然后在模板中使用它。
 * 通常，这将导致这个 `input` 前面的表达式中使用指令中的旧值，因为刚才它们已经完成了变更检测。
 * 由于在 `ngModel` 中这是一种很常见的情况，所以我们额外执行了一次变更检测。
 *
 * Notes:
 *
 * 注意：
 *
 * - this is just one extra run no matter how many `ngModel` have been changed.
 *
 *   不管有多少个 `ngModel` 发生了变化，都只会有一轮额外的变更检测。
 *
 * - this is a general problem when using `exportAs` for directives!
 *
 *   当在指令中使用 `exportAs` 时，这是一个常见问题！
 *
 */
const resolvedPromise = (() => Promise.resolve(null))();

/**
 * @description
 * Creates a `FormControl` instance from a domain model and binds it
 * to a form control element.
 *
 * 根据领域对象创建一个 `FormControl` 实例，并把它绑定到一个表单控件元素上。
 *
 * The `FormControl` instance tracks the value, user interaction, and
 * validation status of the control and keeps the view synced with the model. If used
 * within a parent form, the directive also registers itself with the form as a child
 * control.
 *
 * 这个 `FormControl` 实例将会跟踪值、用户交互和控件的验证状态，以保持视图与模型的同步。
 * 如果用在某个父表单中，该指令还会把自己注册为这个父表单的子控件。
 *
 * This directive is used by itself or as part of a larger form. Use the
 * `ngModel` selector to activate it.
 *
 * 这个指令可以单独使用，也可以用作一个大表单的一部分。你所要做的一切就是用 `ngModel` 选择器来激活它。
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
 * class sets the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-box syntax'), the value in the UI always syncs back to
 * the domain model in your class.
 *
 * 它可以接受一个领域模型作为可选的 `Input`。如果使用 `[]` 语法来单向绑定到 `ngModel`，那么在组件类中修改领域模型将会更新视图中的值。
 * 如果使用 `[()]` 语法来双向绑定到 `ngModel`，那么视图中值的变化会随时同步回组件类中的领域模型。
 *
 * To inspect the properties of the associated `FormControl` (like validity state),
 * export the directive into a local template variable using `ngModel` as the key (ex:* `#myVar="ngModel"`). You then access the control using the directive's `control` property,
  but
 * most properties used (like `valid` and `dirty`) fall through to the control anyway for direct
 * access.
  See a full list of properties directly available in `AbstractControlDirective`.
 *
 * 如果你希望查看与 `FormControl` 相关的属性（比如校验状态），你也可以使用 `ngModel` 作为键，把该指令导出到一个局部模板变量中（如：`#myVar="ngModel"`）。
 * 你也可以使用该指令的 `control` 属性来访问此控件，实际上你要用到的大多数属性（如 `valid` 和 `dirty`）都会委托给该控件，这样你就可以直接访问这些属性了。
 * 你可以在 `AbstractControlDirective` 中直接查看这些属性的完整列表。
 *
 * @see `RadioControlValueAccessor`
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * ### 在独立控件模式下使用 ngModel
 *
 * 如果你希望查看与 `FormControl` 相关的属性（比如校验状态），你也可以使用 `ngModel` 作为键，把该指令导出到一个局部模板变量中（如：`#myVar="ngModel"`）。
 * 你也可以使用该指令的 `control` 属性来访问此控件，实际上你要用到的大多数属性（如 `valid` 和 `dirty`）都会委托给该控件，这样你就可以直接访问这些属性了。
 * 你可以在 `AbstractControlDirective` 中直接查看这些属性的完整列表。
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * 下面是一个在简单的独立控件中使用 `ngModel` 的例子：
 *
 * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * 当在 `<form>` 标签中使用 `ngModel` 时，你还需要提供一个 `name` 属性，以便该控件可以使用这个名字把自己注册到父表单中。
 *
 * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
 * as the parent form syncs the value for you. You access its properties by exporting it into a
 * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
 * needed on form submission.
 *
 * 在父表单的上下文中，通常不用包含单向或双向绑定，因为这个父表单将会为你同步该值。
 * 你可以使用 `ngForm` 把它导出给一个模板局部变量（如 `#f="ngForm"`），以访问它的属性。
 * 可以在任何需要提交表单的地方使用它。
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * 如果你只是要为表单设置初始值，对 `ngModel` 使用单向绑定就够了。在提交时，你可以使用从表单导出的值，而不必使用领域模型的值。
 *
 * ### Using ngModel within a form
 *
 * ### 在表单中使用 ngModel
 *
 * The following example shows controls using `ngModel` within a form:
 *
 * 下面的例子展示了如何在表单中使用 `ngModel`：
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Using a standalone ngModel within a group
 *
 * ### 在表单组中使用独立 ngModel
 *
 * The following example shows you how to use a standalone ngModel control
 * within a form. This controls the display of the form, but doesn't contain form data.
 *
 * 下面的例子演示了如何在表单中使用独立 ngModel 控件。它控制表单的显示，但并不包含表单数据。
 *
 * ```html
 * <form>
 *   <input name="login" ngModel placeholder="Login">
 *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
 * </form>
 * <!-- form value: {login: ''} -->
 * ```
 *
 * ### Setting the ngModel name attribute through options
 *
 * ### 通过选项设置 ngModel 的 name 属性
 *
 * The following example shows you an alternate way to set the name attribute. The name attribute is
 * used within a custom form component, and the name `@Input` property serves a different purpose.
 *
 * 下面的例子展示了设置 name 属性的另一种方式。该 name 属性要和自定义表单组件一起使用，而该自定义组件的 `@Input` 属性 name 已用作其它用途。
 *
 * ```html
 * <form>
 *   <my-person-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-person-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  selector: '[ngModel]:not([formControlName]):not([formControl])',
  providers: [formControlBinding],
  exportAs: 'ngModel'
})
export class NgModel extends NgControl implements OnChanges, OnDestroy {
  public readonly control: FormControl = new FormControl();

  // At runtime we coerce arbitrary values assigned to the "disabled" input to a "boolean".
  // This is not reflected in the type of the property because outside of templates, consumers
  // should only deal with booleans. In templates, a string is allowed for convenience and to
  // match the native "disabled attribute" semantics which can be observed on input elements.
  // This static member tells the compiler that values of type "string" can also be assigned
  // to the input in a template.
  /** @nodoc */
  static ngAcceptInputType_isDisabled: boolean|string;

  /** @internal */
  _registered = false;

  /**
   * @description
   * Internal reference to the view model value.
   */
  viewModel: any;

  /**
   * @description
   * Tracks the name bound to the directive. The parent form
   * uses this name as a key to retrieve this control's value.
   */
  // TODO(issue/24571): remove '!'.
  @Input() name!: string;

  /**
   * @description
   * Tracks whether the control is disabled.
   */
  // TODO(issue/24571): remove '!'.
  @Input('disabled') isDisabled!: boolean;

  /**
   * @description
   * Tracks the value bound to this directive.
   */
  @Input('ngModel') model: any;

  /**
   * @description
   * Tracks the configuration options for this `ngModel` instance.
   *
   * 跟踪该 `ngModel` 实例的配置项。
   *
   * **name**: An alternative to setting the name attribute on the form control element. See
   * the [example](api/forms/NgModel#using-ngmodel-on-a-standalone-control) for using `NgModel`
   * as a standalone control.
   *
   * **name**：用来设置表单控件元素的 `name` 属性的另一种方式。参见把 `ngModel` 用作独立控件的那个[例子](api/forms/NgModel#using-ngmodel-on-a-standalone-control)。
   *
   * **standalone**: When set to true, the `ngModel` will not register itself with its parent form,
   * and acts as if it's not in the form. Defaults to false.
   *
   * **standalone**：如果为 true，则此 `ngModel` 不会把自己注册进它的父表单中，其行为就像没在表单中一样。默认为 false。
   *
   * **updateOn**: Defines the event upon which the form control value and validity update.
   * Defaults to 'change'. Possible values: `'change'` | `'blur'` | `'submit'`.
   *
   * **updateOn**: 用来定义该何时更新表单控件的值和有效性。默认为 `'change'`。可能的取值为：`'change'` | `'blur'` | `'submit'`。
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input('ngModelOptions') options!: {name?: string, standalone?: boolean, updateOn?: FormHooks};

  /**
   * @description
   * Event emitter for producing the `ngModelChange` event after
   * the view model updates.
   */
  @Output('ngModelChange') update = new EventEmitter();

  constructor(
      @Optional() @Host() parent: ControlContainer,
      @Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator|ValidatorFn>,
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators:
          Array<AsyncValidator|AsyncValidatorFn>,
      @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]) {
    super();
    this._parent = parent;
    this._rawValidators = validators || [];
    this._rawAsyncValidators = asyncValidators || [];
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }

  /**
   * @description
   * A lifecycle method called when the directive's inputs change. For internal use
   * only.
   *
   * @param changes A object of key/value pairs for the set of changed inputs.
   */
  ngOnChanges(changes: SimpleChanges) {
    this._checkForErrors();
    if (!this._registered) this._setUpControl();
    if ('isDisabled' in changes) {
      this._updateDisabled(changes);
    }

    if (isPropertyUpdated(changes, this.viewModel)) {
      this._updateValue(this.model);
      this.viewModel = this.model;
    }
  }

  /**
   * @description
   * Lifecycle method called before the directive's instance is destroyed. For internal
   * use only.
   */
  ngOnDestroy(): void {
    this.formDirective && this.formDirective.removeControl(this);
  }

  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path(): string[] {
    return this._parent ? controlPath(this.name, this._parent) : [this.name];
  }

  /**
   * @description
   * The top-level directive for this control if present, otherwise null.
   */
  get formDirective(): any {
    return this._parent ? this._parent.formDirective : null;
  }

  /**
   * @description
   * Synchronous validator function composed of all the synchronous validators
   * registered with this directive.
   */
  get validator(): ValidatorFn|null {
    return composeValidators(this._rawValidators);
  }

  /**
   * @description
   * Async validator function composed of all the async validators registered with this
   * directive.
   */
  get asyncValidator(): AsyncValidatorFn|null {
    return composeAsyncValidators(this._rawAsyncValidators);
  }

  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value emitted by `ngModelChange`.
   */
  viewToModelUpdate(newValue: any): void {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }

  private _setUpControl(): void {
    this._setUpdateStrategy();
    this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
    this._registered = true;
  }

  private _setUpdateStrategy(): void {
    if (this.options && this.options.updateOn != null) {
      this.control._updateOn = this.options.updateOn;
    }
  }

  private _isStandalone(): boolean {
    return !this._parent || !!(this.options && this.options.standalone);
  }

  private _setUpStandalone(): void {
    setUpControl(this.control, this);
    this.control.updateValueAndValidity({emitEvent: false});
  }

  private _checkForErrors(): void {
    if (!this._isStandalone()) {
      this._checkParentType();
    }
    this._checkName();
  }

  private _checkParentType(): void {
    if (!(this._parent instanceof NgModelGroup) &&
        this._parent instanceof AbstractFormGroupDirective) {
      TemplateDrivenErrors.formGroupNameException();
    } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
      TemplateDrivenErrors.modelParentException();
    }
  }

  private _checkName(): void {
    if (this.options && this.options.name) this.name = this.options.name;

    if (!this._isStandalone() && !this.name) {
      TemplateDrivenErrors.missingNameException();
    }
  }

  private _updateValue(value: any): void {
    resolvedPromise.then(() => {
      this.control.setValue(value, {emitViewToModelChange: false});
    });
  }

  private _updateDisabled(changes: SimpleChanges) {
    const disabledValue = changes['isDisabled'].currentValue;

    const isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');

    resolvedPromise.then(() => {
      if (isDisabled && !this.control.disabled) {
        this.control.disable();
      } else if (!isDisabled && this.control.disabled) {
        this.control.enable();
      }
    });
  }
}
