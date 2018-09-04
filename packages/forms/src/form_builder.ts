/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular/core';

import {AsyncValidatorFn, ValidatorFn} from './directives/validators';
import {AbstractControl, FormArray, FormControl, FormGroup} from './model';

/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * 使用用户指定的配置创建 `AbstractControl`。
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
 * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
 * forms.
 *
 * `FormBuilder` 提供了一个语法糖，以简化 `FormControl`、`FormGroup` 或 `FormArray` 实例的创建过程。
 * 它会减少构建复杂表单时所需的样板代码的数量。
 *
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 *
 * [响应式表单](/guide/reactive-forms)
 *
 */
@Injectable()
export class FormBuilder {
  /**
   * @description
   * Construct a new `FormGroup` instance.
   *
   * 构建一个新的 `FormGroup` 实例。
   *
   * @param controlsConfig A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * 一组子控件。每个 key 就是注册进来的控件的名字。
   *
   * @param extra An object of configuration options for the `FormGroup`.
   *
   * 一个对象，表示 `FormGroup` 的配置项。
   *
   * * `validator`: A synchronous validator function, or an array of validator functions
   *
   *   `validator`：一个同步验证器函数或其数组
   *
   * * `asyncValidator`: A single async validator or array of async validator functions
   *
   *   `asyncValidator`：一个异步验证器函数或其数组
   *
   */
  group(controlsConfig: {[key: string]: any}, extra: {[key: string]: any}|null = null): FormGroup {
    const controls = this._reduceControls(controlsConfig);
    const validator: ValidatorFn = extra != null ? extra['validator'] : null;
    const asyncValidator: AsyncValidatorFn = extra != null ? extra['asyncValidator'] : null;
    return new FormGroup(controls, validator, asyncValidator);
  }

  /**
   * @description
   * Construct a new `FormControl` instance.
   *
   * 构建一个新的 `FormControl` 实例。
   *
   * @param formState Initializes the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * 使用一个初始值或一个定义了初始值和禁用状态的对象初始化该控件。
   *
   * @param validator A synchronous validator function, or an array of synchronous validator
   * functions.
   *
   * 一个同步验证器函数或其数组。
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   * 一个异步验证器函数或其数组。
   *
   * @usageNotes
   *
   * ### Initialize a control as disabled
   *
   * ### 把控件初始化为禁用状态
   *
   * The following example returns a control with an initial value in a disabled state.
   *
   * 下面的例子返回一个带有初始值并已禁用的控件。
   *
   * <code-example path="forms/ts/formBuilder/form_builder_example.ts"
   *   linenums="false" region="disabled-control">
   * </code-example>
   *
   */
  control(
      formState: any, validator?: ValidatorFn|ValidatorFn[]|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null): FormControl {
    return new FormControl(formState, validator, asyncValidator);
  }

  /**
   * @description
   * Construct a new `FormArray` instance.
   *
   * 构造一个新的 `FormArray` 实例。
   *
   * @param controlsConfig An array of child controls. The key for each child control is its index
   * in the array.
   *
   * 一个子控件数组。每个子控件的 key 都是它在数组中的索引。
   *
   * @param validator A synchronous validator function, or an array of synchronous validator
   * functions.
   *
   * 一个同步验证器函数或其数组。
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   * 一个异步验证器数组或其数组。
   *
   */
  array(
      controlsConfig: any[], validator?: ValidatorFn|ValidatorFn[]|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null): FormArray {
    const controls = controlsConfig.map(c => this._createControl(c));
    return new FormArray(controls, validator, asyncValidator);
  }

  /** @internal */
  _reduceControls(controlsConfig: {[k: string]: any}): {[key: string]: AbstractControl} {
    const controls: {[key: string]: AbstractControl} = {};
    Object.keys(controlsConfig).forEach(controlName => {
      controls[controlName] = this._createControl(controlsConfig[controlName]);
    });
    return controls;
  }

  /** @internal */
  _createControl(controlConfig: any): AbstractControl {
    if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
        controlConfig instanceof FormArray) {
      return controlConfig;

    } else if (Array.isArray(controlConfig)) {
      const value = controlConfig[0];
      const validator: ValidatorFn = controlConfig.length > 1 ? controlConfig[1] : null;
      const asyncValidator: AsyncValidatorFn = controlConfig.length > 2 ? controlConfig[2] : null;
      return this.control(value, validator, asyncValidator);

    } else {
      return this.control(controlConfig);
    }
  }
}
