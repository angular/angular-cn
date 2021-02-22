/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, forwardRef, Host, Inject, Input, OnDestroy, OnInit, Optional, Self, SkipSelf} from '@angular/core';

import {FormArray} from '../../model';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '../../validators';
import {AbstractFormGroupDirective} from '../abstract_form_group_directive';
import {ControlContainer} from '../control_container';
import {ReactiveErrors} from '../reactive_errors';
import {controlPath} from '../shared';
import {AsyncValidator, AsyncValidatorFn, Validator, ValidatorFn} from '../validators';

import {FormGroupDirective} from './form_group_directive';

export const formGroupNameProvider: any = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupName)
};

/**
 * @description
 *
 * Syncs a nested `FormGroup` to a DOM element.
 *
 * 将嵌套的 `FormGroup` 同步到 DOM 元素上。
 *
 * This directive can only be used with a parent `FormGroupDirective`.
 *
 * 本指令只能与父 `FormGroupDirective` 一起使用。
 *
 * It accepts the string name of the nested `FormGroup` to link, and
 * looks for a `FormGroup` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * 它接受嵌套的字符串名称 `FormGroup` 链接，并寻找使用这个名字在你传给 `FormGroupDirective` 的父 `FormGroup` 实例中注册的 `FormGroup`。
 *
 * Use nested form groups to validate a sub-group of a
 * form separately from the rest or to group the values of certain
 * controls into their own nested object.
 *
 * 使用嵌套表单组可以与其余表单分开验证表单的子组，也可以将某些控件的值分组到自己的嵌套对象中。
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * [响应式表单指南](guide/reactive-forms)
 *
 * @usageNotes
 *
 * ### Access the group by name
 *
 * ### 按名称访问组
 *
 * The following example uses the {@link AbstractControl#get get} method to access the
 * associated `FormGroup`
 *
 * 下面的示例使用 {@link AbstractControl#get get} 方法访问关联的 `FormGroup`
 *
 * ```ts
 *   this.form.get('name');
 * ```
 *
 * ### Access individual controls in the group
 *
 * ### 访问组中的各个控件
 *
 * The following example uses the {@link AbstractControl#get get} method to access
 * individual controls within the group using dot syntax.
 *
 * 下面的示例使用 {@link AbstractControl#get get} 方法使用点语法访问组中的各个控件。
 *
 * ```ts
 *   this.form.get('name.first');
 * ```
 *
 * ### Register a nested `FormGroup`.
 *
 * ### 注册一个嵌套的 `FormGroup` 。
 *
 * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
 * and provides methods to retrieve the nested `FormGroup` and individual controls.
 *
 * 下面的示例在现有 `FormGroup` 注册一个嵌套*名称*的 `FormGroup` ，并提供检索嵌套 `FormGroup` 和各个控件的方法。
 *
 * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
@Directive({selector: '[formGroupName]', providers: [formGroupNameProvider]})
export class FormGroupName extends AbstractFormGroupDirective implements OnInit, OnDestroy {
  /**
   * @description
   * Tracks the name of the `FormGroup` bound to the directive. The name corresponds
   * to a key in the parent `FormGroup` or `FormArray`.
   * Accepts a name as a string or a number.
   * The name in the form of a string is useful for individual forms,
   * while the numerical form allows for form groups to be bound
   * to indices when iterating over groups in a `FormArray`.
   *
   * 跟踪绑定到此指令的 `FormGroup` 名称。该名称对应于父 `FormGroup` 或 `FormArray` 中的键名。接受字符串或数字形式的名称。字符串形式的名称对于单个表单很有用，而数字形式则允许在 `FormArray` 组上进行迭代时将表单组绑定到索引。
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input('formGroupName') name!: string|number|null;

  constructor(
      @Optional() @Host() @SkipSelf() parent: ControlContainer,
      @Optional() @Self() @Inject(NG_VALIDATORS) validators: (Validator|ValidatorFn)[],
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators:
          (AsyncValidator|AsyncValidatorFn)[]) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }

  /** @internal */
  _checkParentType(): void {
    if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      ReactiveErrors.groupParentException();
    }
  }
}

export const formArrayNameProvider: any = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormArrayName)
};

/**
 * @description
 *
 * Syncs a nested `FormArray` to a DOM element.
 *
 * 将嵌套的 `FormArray` 同步到 DOM 元素。
 *
 * This directive is designed to be used with a parent `FormGroupDirective` (selector:
 * `[formGroup]`).
 *
 * 此指令旨在与父 `FormGroupDirective`（选择器为 `[formGroup]` ）一起使用。
 *
 * It accepts the string name of the nested `FormArray` you want to link, and
 * will look for a `FormArray` registered with that name in the parent
 * `FormGroup` instance you passed into `FormGroupDirective`.
 *
 * 它接受你要链接的嵌套 `FormArray` 的字符串名称，并寻找使用这个名字在你传给 `FormGroupDirective` 的父 `FormGroup` 实例中注册的 `FormGroup`。
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * [响应式表单指南](guide/reactive-forms)
 *
 * @see `AbstractControl`
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
 *
 * @ngModule ReactiveFormsModule
 * @publicApi
 */
@Directive({selector: '[formArrayName]', providers: [formArrayNameProvider]})
export class FormArrayName extends ControlContainer implements OnInit, OnDestroy {
  /** @internal */
  _parent: ControlContainer;

  /**
   * @description
   * Tracks the name of the `FormArray` bound to the directive. The name corresponds
   * to a key in the parent `FormGroup` or `FormArray`.
   * Accepts a name as a string or a number.
   * The name in the form of a string is useful for individual forms,
   * while the numerical form allows for form arrays to be bound
   * to indices when iterating over arrays in a `FormArray`.
   *
   * 跟踪绑定到指令 `FormArray` 的名称。该名称对应于父 `FormGroup` 或 `FormArray` 中的键名。接受字符串或数字形式的名称。字符串形式的名称对于单个表单很有用，而数字形式则允许在 `FormArray` 数组上进行迭代时将表单数组绑定到索引。
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input('formArrayName') name!: string|number|null;

  constructor(
      @Optional() @Host() @SkipSelf() parent: ControlContainer,
      @Optional() @Self() @Inject(NG_VALIDATORS) validators: (Validator|ValidatorFn)[],
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators:
          (AsyncValidator|AsyncValidatorFn)[]) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }

  /**
   * A lifecycle method called when the directive's inputs are initialized. For internal use only.
   *
   * 已初始化指令的各个输入属性时要调用的生命周期方法。仅限内部使用。
   *
   * @throws If the directive does not have a valid parent.
   *
   * 如果指令没有有效的父项。
   *
   * @nodoc
   */
  ngOnInit(): void {
    this._checkParentType();
    this.formDirective!.addFormArray(this);
  }

  /**
   * A lifecycle method called before the directive's instance is destroyed. For internal use only.
   *
   * 销毁指令实例之前调用的生命周期方法。仅限内部使用。
   *
   * @nodoc
   */
  ngOnDestroy(): void {
    if (this.formDirective) {
      this.formDirective.removeFormArray(this);
    }
  }

  /**
   * @description
   * The `FormArray` bound to this directive.
   *
   * 要绑定到此指令的 `FormArray`。
   *
   */
  get control(): FormArray {
    return this.formDirective!.getFormArray(this);
  }

  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   *
   * 该组的顶级指令（如果存在），否则为 null。
   *
   */
  get formDirective(): FormGroupDirective|null {
    return this._parent ? <FormGroupDirective>this._parent.formDirective : null;
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
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }

  private _checkParentType(): void {
    if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      ReactiveErrors.arrayParentException();
    }
  }
}

function _hasInvalidParent(parent: ControlContainer): boolean {
  return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
      !(parent instanceof FormArrayName);
}
