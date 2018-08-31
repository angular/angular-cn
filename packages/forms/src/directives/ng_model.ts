/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, Host, Inject, Input, OnChanges, OnDestroy, Optional, Output, Self, SimpleChanges, forwardRef} from '@angular/core';

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
const resolvedPromise = Promise.resolve(null);

/**
 * @description
 *
 * Creates a `FormControl` instance from a domain model and binds it
 * to a form control element.
 *
 * 根据领域对象创建一个 `FormControl` 实例，并把它绑定到一个表单控件元素上。
 *
 * The `FormControl` instance will track the value, user interaction, and
 * validation status of the control and keep the view synced with the model. If used
 * within a parent form, the directive will also register itself with the form as a child
 * control.
 *
 * 这个 `FormControl` 实例将会跟踪值、用户交互和控件的验证状态，以保持视图与模型的同步。
 * 如果用在某个父表单中，该指令还会把自己注册为这个父表单的子控件。
 *
 * This directive can be used by itself or as part of a larger form. All you need is the
 * `ngModel` selector to activate it.
 *
 * 这个指令可以单独使用，也可以用作一个大表单的一部分。你所要做的一切就是用 `ngModel` 选择器来激活它。
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
 * class will set the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-box syntax'), the value in the UI will always be synced back to
 * the domain model in your class as well.
 *
 * 它可以接受一个领域模型作为可选的 `Input`。如果使用 `[]` 语法来单向绑定到 `ngModel`，那么在组件类中修改领域模型将会更新视图中的值。
 * 如果使用 `[()]` 语法来双向绑定到 `ngModel`，那么视图中值的变化同样会随时同步回组件类中的领域模型。
 *
 * If you wish to inspect the properties of the associated `FormControl` (like
 * validity state), you can also export the directive into a local template variable using
 * `ngModel` as the key (ex: `#myVar="ngModel"`). You can then access the control using the
 * directive's `control` property, but most properties you'll need (like `valid` and `dirty`)
 * will fall through to the control anyway, so you can access them directly. You can see a
 * full list of properties directly available in `AbstractControlDirective`.
 *
 * 如果你希望查看与 `FormControl` 相关的属性（比如校验状态），你也可以使用 `ngModel` 作为键，把该指令导出到一个局部模板变量中（如：`#myVar="ngModel"`）。
 * 你也可以使用该指令的 `control` 属性来访问此控件，实际上你要用到的大多数属性（如 `valid` 和 `dirty`）都会委托给该控件，这样你就可以直接访问这些属性了。
 * 你可以在 `AbstractControlDirective` 中直接查看这些属性的完整列表。
 *
 * The following is an example of a simple standalone control using `ngModel`:
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
 * It's worth noting that in the context of a parent form, you often can skip one-way or
 * two-way binding because the parent form will sync the value for you. You can access
 * its properties by exporting it into a local template variable using `ngForm` (ex:
 * `#f="ngForm"`). Then you can pass it where it needs to go on submit.
 *
 * 不用太关注父表单的上下文，你通常可以忽略它的单向或双向绑定，因为这个父表单将会为你同步该值。
 * 你可以使用 `ngForm` 把它导出给一个模板局部变量（如 `#f="ngForm"`），以访问它的属性。
 * 然后你就可以在提交时把它传给任何需要它的地方了。
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * 如果你只是要为表单设置初始值，对 `ngModel` 使用单向绑定就够了。在提交时，你可以使用从表单导出的值，而不必使用领域模型的值。
 *
 * Take a look at an example of using `ngModel` within a form:
 *
 * 来看一个在表单中使用 `ngModel` 的例子：
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * To see `ngModel` examples with different form control types, see:
 *
 * 要查看不同空间类型的 `ngModel` 范例，参见：
 *
 * * Radio buttons: `RadioControlValueAccessor`
 *
 *   单选按钮组：`RadioControlValueAccessor`
 *
 * * Selects: `SelectControlValueAccessor`
 *
 *   下拉框：`SelectControlValueAccessor`
 *
 * **npm package**: `@angular/forms`
 *
 * **npm 包**: `@angular/forms`
 *
 * **NgModule**: `FormsModule`
 *
 *
 */
@Directive({
  selector: '[ngModel]:not([formControlName]):not([formControl])',
  providers: [formControlBinding],
  exportAs: 'ngModel'
})
export class NgModel extends NgControl implements OnChanges,
    OnDestroy {
  public readonly control: FormControl = new FormControl();
  /** @internal */
  _registered = false;
  viewModel: any;

  // TODO(issue/24571): remove '!'.
  @Input() name !: string;
  // TODO(issue/24571): remove '!'.
  @Input('disabled') isDisabled !: boolean;
  @Input('ngModel') model: any;

  /**
   * Options object for this `ngModel` instance. You can configure the following properties:
   *
   * 当前 `ngModel` 实例的配置对象。你可以配置下列属性：
   *
   * **name**: An alternative to setting the name attribute on the form control element.
   * Sometimes, especially with custom form components, the name attribute might be used
   * as an `@Input` property for a different purpose. In cases like these, you can configure
   * the `ngModel` name through this option.
   *
   * **name**：设置这个表单控件元素名的一个替代方案。有时候，特别是在自定义表单控件上，name 属性可能被作为 `@Input` 属性用作其它目的。
   * 这时，你就可以通过该选项来配置 `ngModel` 的名字。
   *
   * ```html
   * <form>
   *   <my-person-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
   *   </my-person-control>
   * </form>
   * <!-- form value: {user: ''} -->
   * ```
   *
   * **standalone**: Defaults to false. If this is set to true, the `ngModel` will not
   * register itself with its parent form, and will act as if it's not in the form. This
   * can be handy if you have form meta-controls, a.k.a. form elements nested in
   * the `<form>` tag that control the display of the form, but don't contain form data.
   *
   * **standalone**：默认为 `false`。如果设置为 `true`，那么 `ngModel` 就不会把自己注册到它的父表单上，其行为就像它没有在表单中一样。
   * 如果要使用表单元控件，这会很方便。表单元控件是指嵌在 `<form>` 标签中的表单元素，它控制表单的显示，但不包含表单数据。
   *
   * ```html
   * <form>
   *   <input name="login" ngModel placeholder="Login">
   *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
   * </form>
   * <!-- form value: {login: ''} -->
   * ```
   *
   * **updateOn**: Defaults to `'change'`. Defines the event upon which the form control
   * value and validity will update. Also accepts `'blur'` and `'submit'`.
   *
   * **updateOn**：默认为 `'change'`。用来定义该何时更新表单控件的值和有效性。其它有效值为：`'blur'` 和 `'submit'`。
   *
   * ```html
   * <input [(ngModel)]="firstName" [ngModelOptions]="{updateOn: 'blur'}">
   * ```
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input('ngModelOptions')
  options !: {name?: string, standalone?: boolean, updateOn?: FormHooks};

  @Output('ngModelChange') update = new EventEmitter();

  constructor(@Optional() @Host() parent: ControlContainer,
              @Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator|ValidatorFn>,
              @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<AsyncValidator|AsyncValidatorFn>,
              @Optional() @Self() @Inject(NG_VALUE_ACCESSOR)
              valueAccessors: ControlValueAccessor[]) {
                super();
                this._parent = parent;
                this._rawValidators = validators || [];
                this._rawAsyncValidators = asyncValidators || [];
                this.valueAccessor = selectValueAccessor(this, valueAccessors);
              }

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

              ngOnDestroy(): void { this.formDirective && this.formDirective.removeControl(this); }

              get path(): string[] {
                return this._parent ? controlPath(this.name, this._parent) : [this.name];
              }

              get formDirective(): any { return this._parent ? this._parent.formDirective : null; }

              get validator(): ValidatorFn|null { return composeValidators(this._rawValidators); }

              get asyncValidator(): AsyncValidatorFn|null {
                return composeAsyncValidators(this._rawAsyncValidators);
              }

              viewToModelUpdate(newValue: any): void {
                this.viewModel = newValue;
                this.update.emit(newValue);
              }

              private _setUpControl(): void {
                this._setUpdateStrategy();
                this._isStandalone() ? this._setUpStandalone() :
                                       this.formDirective.addControl(this);
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
                } else if (
                    !(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
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
                resolvedPromise.then(
                    () => { this.control.setValue(value, {emitViewToModelChange: false}); });
              }

              private _updateDisabled(changes: SimpleChanges) {
                const disabledValue = changes['isDisabled'].currentValue;

                const isDisabled =
                    disabledValue === '' || (disabledValue && disabledValue !== 'false');

                resolvedPromise.then(() => {
                  if (isDisabled && !this.control.disabled) {
                    this.control.disable();
                  } else if (!isDisabled && this.control.disabled) {
                    this.control.enable();
                  }
                });
              }
}
