/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, forwardRef, Inject, Input, OnChanges, Optional, Output, Self, SimpleChanges} from '@angular/core';

import {FormArray, FormControl, FormGroup} from '../../model';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '../../validators';
import {ControlContainer} from '../control_container';
import {Form} from '../form_interface';
import {ReactiveErrors} from '../reactive_errors';
import {cleanUpControl, cleanUpValidators, removeListItem, setUpControl, setUpFormContainer, setUpValidators, syncPendingControls} from '../shared';
import {AsyncValidator, AsyncValidatorFn, Validator, ValidatorFn} from '../validators';

import {FormControlName} from './form_control_name';
import {FormArrayName, FormGroupName} from './form_group_name';

export const formDirectiveProvider: any = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupDirective)
};

/**
 * @description
 *
 * Binds an existing `FormGroup` to a DOM element.
 *
 * 将现有的 `FormGroup` 绑定到 DOM 元素。
 *
 * This directive accepts an existing `FormGroup` instance. It will then use this
 * `FormGroup` instance to match any child `FormControl`, `FormGroup`,
 * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
 * and `FormArrayName` directives.
 *
 * 该指令接受现有的 `FormGroup` 实例。然后，它将使用此 `FormGroup` 实例中的任何子控件 `FormControl`、`FormGroup` 和 `FormArray` 的实例与其子指令 `FormControlName`、`FormGroupName` 和 `FormArrayName` 匹配。
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * [响应式表单指南](guide/reactive-forms)
 *
 * @see `AbstractControl`
 *
 * ### Register Form Group
 *
 * ### 注册表单组
 *
 * The following example registers a `FormGroup` with first name and last name controls,
 * and listens for the *ngSubmit* event when the button is clicked.
 *
 * 下面的示例使用名字和姓氏控件 `FormGroup` ，并在单击按钮时*侦听 ngSubmit 事件。*
 *
 * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
@Directive({
  selector: '[formGroup]',
  providers: [formDirectiveProvider],
  host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  exportAs: 'ngForm'
})
export class FormGroupDirective extends ControlContainer implements Form, OnChanges {
  /**
   * @description
   * Reports whether the form submission has been triggered.
   *
   * 报告是否已触发表单提交。
   *
   */
  public readonly submitted: boolean = false;

  /**
   * Reference to an old form group input value, which is needed to cleanup old instance in case it
   * was replaced with a new one.
   *
   * 引用旧的表单组输入值，如果用新实例替换了旧实例，则需要清理该旧实例。
   *
   */
  private _oldForm: FormGroup|undefined;

  /**
   * @description
   * Tracks the list of added `FormControlName` instances
   *
   * 跟踪已添加的 `FormControlName` 实例的列表
   *
   */
  directives: FormControlName[] = [];

  /**
   * @description
   * Tracks the `FormGroup` bound to this directive.
   *
   * 跟踪绑定到此指令的 `FormGroup`。
   *
   */
  @Input('formGroup') form: FormGroup = null!;

  /**
   * @description
   * Emits an event when the form submission has been triggered.
   *
   * 触发表单提交后，发出事件。
   *
   */
  @Output() ngSubmit = new EventEmitter();

  constructor(
      @Optional() @Self() @Inject(NG_VALIDATORS) private validators: (Validator|ValidatorFn)[],
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators:
          (AsyncValidator|AsyncValidatorFn)[]) {
    super();
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }

  /** @nodoc */
  ngOnChanges(changes: SimpleChanges): void {
    this._checkFormPresent();
    if (changes.hasOwnProperty('form')) {
      this._updateValidators();
      this._updateDomValue();
      this._updateRegistrations();
      this._oldForm = this.form;
    }
  }

  /**
   * @description
   * Returns this directive's instance.
   *
   * 返回此指令的实例。
   *
   */
  get formDirective(): Form {
    return this;
  }

  /**
   * @description
   * Returns the `FormGroup` bound to this directive.
   *
   * 返回绑定到该指令的 `FormGroup`。
   *
   */
  get control(): FormGroup {
    return this.form;
  }

  /**
   * @description
   * Returns an array representing the path to this group. Because this directive
   * always lives at the top level of a form, it always an empty array.
   *
   * 返回表示该表单组的路径的数组。由于此指令始终位于表单的顶层，因此它始终为空数组。
   *
   */
  get path(): string[] {
    return [];
  }

  /**
   * @description
   * Method that sets up the control directive in this group, re-calculates its value
   * and validity, and adds the instance to the internal list of directives.
   *
   * 在该组中设置控件指令，重新计算其值和有效性并将该实例添加到内部指令列表的方法。
   *
   * @param dir The `FormControlName` directive instance.
   *
   * `FormControlName` 指令实例。
   *
   */
  addControl(dir: FormControlName): FormControl {
    const ctrl: any = this.form.get(dir.path);
    setUpControl(ctrl, dir);
    ctrl.updateValueAndValidity({emitEvent: false});
    this.directives.push(dir);
    return ctrl;
  }

  /**
   * @description
   * Retrieves the `FormControl` instance from the provided `FormControlName` directive
   *
   * 从给定 `FormControlName` 指令中检索 `FormControl`
   *
   * @param dir The `FormControlName` directive instance.
   *
   * `FormControlName` 指令实例。
   *
   */
  getControl(dir: FormControlName): FormControl {
    return <FormControl>this.form.get(dir.path);
  }

  /**
   * @description
   * Removes the `FormControlName` instance from the internal list of directives
   *
   * 从内部指令列表中删除此 `FormControlName` 实例
   *
   * @param dir The `FormControlName` directive instance.
   *
   * `FormControlName` 指令实例。
   *
   */
  removeControl(dir: FormControlName): void {
    removeListItem(this.directives, dir);
  }

  /**
   * Adds a new `FormGroupName` directive instance to the form.
   *
   * 将新的 `FormGroupName` 指令实例添加到表单。
   *
   * @param dir The `FormGroupName` directive instance.
   *
   * `FormGroupName` 指令实例。
   *
   */
  addFormGroup(dir: FormGroupName): void {
    const ctrl: any = this.form.get(dir.path);
    setUpFormContainer(ctrl, dir);
    ctrl.updateValueAndValidity({emitEvent: false});
  }

  /**
   * No-op method to remove the form group.
   *
   * 用于删除表单组的空白方法。
   *
   * @param dir The `FormGroupName` directive instance.
   *
   * `FormGroupName` 指令实例。
   *
   */
  removeFormGroup(dir: FormGroupName): void {}

  /**
   * @description
   * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
   *
   * 检索给定 `FormGroupName` 指令实例的 `FormGroup`
   *
   * @param dir The `FormGroupName` directive instance.
   *
   * `FormGroupName` 指令实例。
   *
   */
  getFormGroup(dir: FormGroupName): FormGroup {
    return <FormGroup>this.form.get(dir.path);
  }

  /**
   * Adds a new `FormArrayName` directive instance to the form.
   *
   * 向表单添加一个新的 `FormArrayName` 指令实例。
   *
   * @param dir The `FormArrayName` directive instance.
   *
   * `FormArrayName` 指令实例。
   *
   */
  addFormArray(dir: FormArrayName): void {
    const ctrl: any = this.form.get(dir.path);
    setUpFormContainer(ctrl, dir);
    ctrl.updateValueAndValidity({emitEvent: false});
  }

  /**
   * No-op method to remove the form array.
   *
   * 用于删除表单组的空白方法。
   *
   * @param dir The `FormArrayName` directive instance.
   *
   * `FormArrayName` 指令实例。
   *
   */
  removeFormArray(dir: FormArrayName): void {}

  /**
   * @description
   * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
   *
   * 检索给定 `FormArrayName` 指令实例的 `FormArray`。
   *
   * @param dir The `FormArrayName` directive instance.
   *
   * `FormArrayName` 指令实例。
   *
   */
  getFormArray(dir: FormArrayName): FormArray {
    return <FormArray>this.form.get(dir.path);
  }

  /**
   * Sets the new value for the provided `FormControlName` directive.
   *
   * 为给定 `FormControlName` 指令设置新值。
   *
   * @param dir The `FormControlName` directive instance.
   *
   * `FormControlName` 指令实例。
   *
   * @param value The new value for the directive's control.
   *
   * 指令控件的新值。
   *
   */
  updateModel(dir: FormControlName, value: any): void {
    const ctrl  = <FormControl>this.form.get(dir.path);
    ctrl.setValue(value);
  }

  /**
   * @description
   * Method called with the "submit" event is triggered on the form.
   * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
   *
   * 当表单上触发了 “submit” 事件时要调用的方法。触发带有 “submit” 事件的 `ngSubmit`。
   *
   * @param $event The "submit" event object
   *
   * "submit" 事件对象
   *
   */
  onSubmit($event: Event): boolean {
    (this as {submitted: boolean}).submitted = true;
    syncPendingControls(this.form, this.directives);
    this.ngSubmit.emit($event);
    return false;
  }

  /**
   * @description
   * Method called when the "reset" event is triggered on the form.
   *
   * 在表单上触发“reset”事件时调用的方法。
   *
   */
  onReset(): void {
    this.resetForm();
  }

  /**
   * @description
   * Resets the form to an initial value and resets its submitted status.
   *
   * 将表单重置为初始值并重置其提交状态。
   *
   * @param value The new value for the form.
   *
   * 表单的新值。
   *
   */
  resetForm(value: any = undefined): void {
    this.form.reset(value);
    (this as {submitted: boolean}).submitted = false;
  }


  /** @internal */
  _updateDomValue() {
    this.directives.forEach(dir => {
      const newCtrl: any = this.form.get(dir.path);
      if (dir.control !== newCtrl) {
        // Note: the value of the `dir.control` may not be defined, for example when it's a first
        // `FormControl` that is added to a `FormGroup` instance (via `addControl` call).
        cleanUpControl(dir.control || null, dir);
        if (newCtrl) setUpControl(newCtrl, dir);
        (dir as {control: FormControl}).control = newCtrl;
      }
    });

    this.form._updateTreeValidity({emitEvent: false});
  }

  private _updateRegistrations() {
    this.form._registerOnCollectionChange(() => this._updateDomValue());
    if (this._oldForm) {
      this._oldForm._registerOnCollectionChange(() => {});
    }
  }

  private _updateValidators() {
    setUpValidators(this.form, this, /* handleOnValidatorChange */ false);
    if (this._oldForm) {
      cleanUpValidators(this._oldForm, this, /* handleOnValidatorChange */ false);
    }
  }

  private _checkFormPresent() {
    if (!this.form && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      ReactiveErrors.missingFormException();
    }
  }
}
