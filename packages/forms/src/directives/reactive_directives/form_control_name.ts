/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, Host, Inject, Input, OnChanges, OnDestroy, Optional, Output, Self, SimpleChanges, SkipSelf, forwardRef} from '@angular/core';

import {FormControl} from '../../model';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '../../validators';
import {AbstractFormGroupDirective} from '../abstract_form_group_directive';
import {ControlContainer} from '../control_container';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '../control_value_accessor';
import {NgControl} from '../ng_control';
import {ReactiveErrors} from '../reactive_errors';
import {_ngModelWarning, composeAsyncValidators, composeValidators, controlPath, isPropertyUpdated, selectValueAccessor} from '../shared';
import {AsyncValidator, AsyncValidatorFn, Validator, ValidatorFn} from '../validators';

import {NG_MODEL_WITH_FORM_CONTROL_WARNING} from './form_control_directive';
import {FormGroupDirective} from './form_group_directive';
import {FormArrayName, FormGroupName} from './form_group_name';

export const controlNameBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlName)
};

/**
 * @description
 *
 * Syncs a `FormControl` in an existing `FormGroup` to a form control
 * element by name.
 *
 * 根据名字将现有 `FormGroup` 中的 `FormControl` 与一个表单控件进行同步。
 *
 * This directive ensures that any values written to the `FormControl`
 * instance programmatically will be written to the DOM element (model -> view). Conversely,
 * any values written to the DOM element through user input will be reflected in the
 * `FormControl` instance (view -> model).
 *
 * 该指令会确保通过程序写入到该 `FormControl` 实例的任何值都会被写入到 DOM 元素上（模型 -> 视图）。
 * 反过来，任何通过用户输入写入 DOM 元素上的值也会被反映到这个 `FormControl` 实例上（视图 -> 模型）。
 *
 * This directive is designed to be used with a parent `FormGroupDirective` (selector:
 * `[formGroup]`).
 *
 * 该指令旨在与父级 `FormGroupDirective`（选择器：`[formGroup]`）协同使用。
 *
 * It accepts the string name of the `FormControl` instance you want to
 * link, and will look for a `FormControl` registered with that name in the
 * closest `FormGroup` or `FormArray` above it.
 *
 * 它接受一个想要链接的 `FormControl` 实例的字符串名称，它会在最近的父级 `FormGroup`、`FormArray` 上根据该名称查找这个 `FormControl`。
 *
 * **Access the control**: You can access the `FormControl` associated with
 * this directive by using the {@link AbstractControl#get get} method.
 * Ex: `this.form.get('first');`
 *
 * **访问控件**：你可以使用 {@link AbstractControl#get get} 方法访问与此指令关联的`FormControl`。
 * 例如：`this.form.get('first');`
 *
 * **Get value**: the `value` property is always synced and available on the `FormControl`.
 * See a full list of available properties in `AbstractControl`.
 *
 * **获取值**：这个 `value` 属性会一直和这个 `FormControl` 保持同步，并一直可用。
 * 参见 `AbstractControl` 的所有可用属性的列表。
 *
 *  **Set value**: You can set an initial value for the control when instantiating the
 *  `FormControl`, or you can set it programmatically later using
 *  {@link AbstractControl#setValue setValue} or {@link AbstractControl#patchValue patchValue}.
 *
 *  **设置值**：当初始化 `FormControl` 时，可以为该控件设置一个初始值；
 *  或者稍后也可以使用 {@link AbstractControl#setValue setValue} 或 {@link AbstractControl#patchValue patchValue} 来通过代码设置它。
 *
 * **Listen to value**: If you want to listen to changes in the value of the control, you can
 * subscribe to the {@link AbstractControl#valueChanges valueChanges} event.  You can also listen to
 * {@link AbstractControl#statusChanges statusChanges} to be notified when the validation status is
 * re-calculated.
 *
 * **监听值的变化**：如果想监听控件值的变化，你可以订阅 {@link AbstractControl#valueChanges valueChanges} 事件。
 * 你还可以监听 {@link AbstractControl#statusChanges statusChanges} 以便在验证状态重新计算时得到通知。
 *
 * ### Example
 *
 * ### 例子
 *
 * In this example, we create form controls for first name and last name.
 *
 * 在这个例子中，我们为名和姓创建了两个表单控件。
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * 要查看把 `formControlName` 应用于不同类型的表单控件的例子，参见：
 *
 * * Radio buttons: `RadioControlValueAccessor`
 *
 *   单选按钮: `RadioControlValueAccessor`
 *
 * * Selects: `SelectControlValueAccessor`
 *
 *   单选下拉框: `SelectControlValueAccessor`
 *
 * **npm package**: `@angular/forms`
 *
 * **npm 包**: `@angular/forms`
 *
 * **NgModule**: `ReactiveFormsModule`
 *
 * ### Use with ngModel
 *
 * ### 和 ngModel 一起使用
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and will be removed in Angular v7.
 *
 * 从 Angular v6 开始，已经废弃了在响应式表单中使用使用输入属性 `ngModel` 和事件 `ngModelChange` 的方式，并将在 Angular v7 中移除。
 *
 * Now deprecated:
 *
 * 现已废弃：
 *
 * ```html
 * <form [formGroup]="form">
 *   <input formControlName="first" [(ngModel)]="value">
 * </form>
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * This has been deprecated for a few reasons. First, developers have found this pattern
 * confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
 * an input/output property named `ngModel` on the reactive form directive that simply
 * approximates (some of) its behavior. Specifically, it allows getting/setting the value
 * and intercepting value events. However, some of `ngModel`'s other features - like
 * delaying updates with`ngModelOptions` or exporting the directive - simply don't work,
 * which has understandably caused some confusion.
 *
 * 它被废弃有几个理由。
 * 首先，一些开发者觉得这种用法让人困惑。它看起来好像是在使用 `ngModel` 指令，
 * 但实际上它只是响应式表单指令上的一个名叫 `ngModel` 的输入/输出属性，只是在行为上和 `ngModel` 指令有点相似而已。
 * 特别是，它运行获取 / 设置控件值，并拦截值变更事件。
 * 不过，不支持 `ngModel` 的某些其它特性 - 比如不能用 `ngModelOptions` 进行延迟修改，也不能导出该指令，
 * 如果没有理解这一点，就会带来一些困惑。
 *
 * In addition, this pattern mixes template-driven and reactive forms strategies, which
 * we generally don't recommend because it doesn't take advantage of the full benefits of
 * either strategy. Setting the value in the template violates the template-agnostic
 * principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
 * the class removes the convenience of defining forms in the template.
 *
 * 此外，该模式混用了模板驱动表单和响应式表单的策略，我们通常不建议这么实用，因为它无法同时得到这两种策略的全部优点。
 * 在模板中设置值，违背了响应式表单背后的 "模板无关性" 设计原则；而在类中增加 `FormControl`/`FormGroup` 层次则破坏了在模板中定义表单带来的便利性。
 *
 *
 * To update your code before v7, you'll want to decide whether to stick with reactive form
 * directives (and get/set values using reactive forms patterns) or switch over to
 * template-driven directives.
 *
 * 要在 Angular v7 之前修改你的现有代码，就要决定是钉死在响应式表单指令（并通过响应式表单模式来获取/设置值）或切换到那些模板驱动表单的指令。
 *
 * After (choice 1 - use reactive forms):
 *
 * 以后的写法（选择 1 - 使用响应式表单）：
 *
 * ```html
 * <form [formGroup]="form">
 *   <input formControlName="first">
 * </form>
 * ```
 *
 * ```ts
 * this.form.get('first').setValue('some value');
 * ```
 *
 * After (choice 2 - use template-driven forms):
 *
 * 以后的写法（选择 2 - 使用模板驱动表单）：
 *
 * ```html
 * <input [(ngModel)]="value">
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * By default, when you use this pattern, you will see a deprecation warning once in dev
 * mode. You can choose to silence this warning by providing a config for
 * `ReactiveFormsModule` at import time:
 *
 * 默认情况下，当你使用此模式时，你会在开发模式下看到一个废弃（deprecation）警告。
 * 你可以在导入 `ReactiveFormsModule` 时提供一个配置项来消除这个警告：
 *
 * ```ts
 * imports: [
 *   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
 * ]
 * ```
 *
 * Alternatively, you can choose to surface a separate warning for each instance of this
 * pattern with a config value of `"always"`. This may help to track down where in the code
 * the pattern is being used as the code is being updated.
 *
 * 或者，你也可以选择指定一个配置值 `"always"` 来为每个符合这种模式的实例都单独显示一个警告。
 * 这会帮助你在修改代码时追踪代码中用到这种模式的所有位置。
 *
 */
@Directive({selector: '[formControlName]', providers: [controlNameBinding]})
export class FormControlName extends NgControl implements OnChanges, OnDestroy {
  private _added = false;
  /** @internal */
  viewModel: any;
  // TODO(issue/24571): remove '!'.
  readonly control !: FormControl;

  // TODO(issue/24571): remove '!'.
  @Input('formControlName') name !: string;

  @Input('disabled')
  set isDisabled(isDisabled: boolean) { ReactiveErrors.disabledAttrWarning(); }

  // TODO(kara): remove next 4 properties once deprecation period is over

  /** @deprecated as of v6 */
  @Input('ngModel') model: any;

  /** @deprecated as of v6 */
  @Output('ngModelChange') update = new EventEmitter();

  /**
   * Static property used to track whether any ngModel warnings have been sent across
   * all instances of FormControlName. Used to support warning config of "once".
   *
   * 静态属性，用于跟踪是否曾在所有的 `FormControlName` 实例中发出过这种 ngModel 警告。用于支持警告选项 `"once"`。
   *
   * @internal
   */
  static _ngModelWarningSentOnce = false;

  /**
   * Instance property used to track whether an ngModel warning has been sent out for this
   * particular FormControlName instance. Used to support warning config of "always".
   *
   * 实例属性，用于跟踪是否曾在特定的 `FormControlName` 实例中发出过这种 ngModel 警告。用于支持警告选项 `"always"`
   * @internal
   */
  _ngModelWarningSent = false;

  constructor(
      @Optional() @Host() @SkipSelf() parent: ControlContainer,
      @Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator|ValidatorFn>,
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators:
          Array<AsyncValidator|AsyncValidatorFn>,
      @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
      @Optional() @Inject(NG_MODEL_WITH_FORM_CONTROL_WARNING) private _ngModelWarningConfig: string|
      null) {
    super();
    this._parent = parent;
    this._rawValidators = validators || [];
    this._rawAsyncValidators = asyncValidators || [];
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._added) this._setUpControl();
    if (isPropertyUpdated(changes, this.viewModel)) {
      _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);
      this.viewModel = this.model;
      this.formDirective.updateModel(this, this.model);
    }
  }

  ngOnDestroy(): void {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
  }

  viewToModelUpdate(newValue: any): void {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }

  get path(): string[] { return controlPath(this.name, this._parent !); }

  get formDirective(): any { return this._parent ? this._parent.formDirective : null; }

  get validator(): ValidatorFn|null { return composeValidators(this._rawValidators); }

  get asyncValidator(): AsyncValidatorFn {
    return composeAsyncValidators(this._rawAsyncValidators) !;
  }

  private _checkParentType(): void {
    if (!(this._parent instanceof FormGroupName) &&
        this._parent instanceof AbstractFormGroupDirective) {
      ReactiveErrors.ngModelGroupException();
    } else if (
        !(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
        !(this._parent instanceof FormArrayName)) {
      ReactiveErrors.controlParentException();
    }
  }

  private _setUpControl() {
    this._checkParentType();
    (this as{control: FormControl}).control = this.formDirective.addControl(this);
    if (this.control.disabled && this.valueAccessor !.setDisabledState) {
      this.valueAccessor !.setDisabledState !(true);
    }
    this._added = true;
  }
}
