/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, forwardRef, Inject, InjectionToken, Input, OnChanges, Optional, Output, Self, SimpleChanges} from '@angular/core';

import {FormControl} from '../../model';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '../../validators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '../control_value_accessor';
import {NgControl} from '../ng_control';
import {ReactiveErrors} from '../reactive_errors';
import {_ngModelWarning, isPropertyUpdated, selectValueAccessor, setUpControl} from '../shared';
import {AsyncValidator, AsyncValidatorFn, Validator, ValidatorFn} from '../validators';


/**
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
 */
export const NG_MODEL_WITH_FORM_CONTROL_WARNING =
    new InjectionToken('NgModelWithFormControlWarning');

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlDirective)
};

/**
 * @description
 * Synchronizes a standalone `FormControl` instance to a form control element.
 *
 * 将独立的 `FormControl` 实例同步到表单控件元素。
 *
 * Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives was deprecated in Angular v6 and is scheduled for removal in
 * a future version of Angular.
 * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
 *
 * 请注意，已弃用将 `ngModel` 输入属性和 `ngModelChange` 事件与响应式表单指令一起使用的方式，并计划在 Angular 的未来版本中删除。有关详细信息，请参阅[已弃用特性](guide/deprecations#ngmodel-with-reactive-forms)。
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * [响应式表单指南](guide/reactive-forms)
 *
 * @see `FormControl`
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * The following example shows how to register a standalone control and set its value.
 *
 * 下面的示例演示如何注册独立控件并设置其值。
 *
 * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
@Directive({selector: '[formControl]', providers: [formControlBinding], exportAs: 'ngForm'})
export class FormControlDirective extends NgControl implements OnChanges {
  /**
   * Internal reference to the view model value.
   *
   * 对视图模型值的内部引用。
   *
   * @nodoc
   */
  viewModel: any;

  /**
   * @description
   * Tracks the `FormControl` instance bound to the directive.
   *
   * 跟踪绑定到本指令的 `FormControl` 实例。
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input('formControl') form!: FormControl;

  /**
   * @description
   * Triggers a warning in dev mode that this input should not be used with reactive forms.
   *
   * 在开发人员模式下触发警告，该输入不应与响应式表单一起使用。
   *
   */
  @Input('disabled')
  set isDisabled(isDisabled: boolean) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      ReactiveErrors.disabledAttrWarning();
    }
  }

  // TODO(kara): remove next 4 properties once deprecation period is over

  /**
   * @deprecated as of v6
   *
   * 从 v6 开始
   *
   */
  @Input('ngModel') model: any;

  /**
   * @deprecated as of v6
   *
   * 从 v6 开始
   *
   */
  @Output('ngModelChange') update = new EventEmitter();

  /**
   * @description
   * Static property used to track whether any ngModel warnings have been sent across
   * all instances of FormControlDirective. Used to support warning config of "once".
   *
   * 静态属性，用于跟踪是否已在 FormControlDirective 的所有实例之间发送任何 ngModel 警告。用于支持 "once" 警告配置。
   *
   * @internal
   */
  static _ngModelWarningSentOnce = false;

  /**
   * @description
   * Instance property used to track whether an ngModel warning has been sent out for this
   * particular `FormControlDirective` instance. Used to support warning config of "always".
   *
   * 实例属性，用于跟踪是否已为此特定 `FormControlDirective` 实例发送过 ngModel 警告。用于支持 "always" 警告配置。
   *
   * @internal
   */
  _ngModelWarningSent = false;

  constructor(
      @Optional() @Self() @Inject(NG_VALIDATORS) validators: (Validator|ValidatorFn)[],
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators:
          (AsyncValidator|AsyncValidatorFn)[],
      @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
      @Optional() @Inject(NG_MODEL_WITH_FORM_CONTROL_WARNING) private _ngModelWarningConfig: string|
      null) {
    super();
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }

  /** @nodoc */
  ngOnChanges(changes: SimpleChanges): void {
    if (this._isControlChanged(changes)) {
      setUpControl(this.form, this);
      if (this.control.disabled && this.valueAccessor!.setDisabledState) {
        this.valueAccessor!.setDisabledState!(true);
      }
      this.form.updateValueAndValidity({emitEvent: false});
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
      this.form.setValue(this.model);
      this.viewModel = this.model;
    }
  }

  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   *
   * 返回一个数组，该数组表示从顶级表单到此控件的路径。每个索引是该级别上控件的字符串名称。
   *
   */
  get path(): string[] {
    return [];
  }

  /**
   * @description
   * The `FormControl` bound to this directive.
   *
   * 绑定到此指令的 `FormControl`。
   *
   */
  get control(): FormControl {
    return this.form;
  }

  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * 设置视图模型的新值并发出 `ngModelChange` 事件。
   *
   * @param newValue The new value for the view model.
   *
   * 视图模型的新值。
   *
   */
  viewToModelUpdate(newValue: any): void {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }

  private _isControlChanged(changes: {[key: string]: any}): boolean {
    return changes.hasOwnProperty('form');
  }
}
