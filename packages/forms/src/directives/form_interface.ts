/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FormControl, FormGroup} from '../model';

import {AbstractFormGroupDirective} from './abstract_form_group_directive';
import {NgControl} from './ng_control';



/**
 * @description
 * An interface implemented by `FormGroupDirective` and `NgForm` directives.
 *
 * 由 `FormGroupDirective` 和 `NgForm` 实现的接口。
 *
 * Only used by the `ReactiveFormsModule` and `FormsModule`.
 *
 * 只用于 `ReactiveFormsModule` 和 `FormsModule` 中。
 *
 * @publicApi
 */
export interface Form {
  /**
   * @description
   * Add a control to this form.
   *
   * 把控件添加到该表单中。
   *
   * @param dir The control directive to add to the form.
   *
   * 要添加到表单中的控件指令。
   *
   */
  addControl(dir: NgControl): void;

  /**
   * @description
   * Remove a control from this form.
   *
   * 从该表单中移除控件。
   *
   * @param dir: The control directive to remove from the form.
   *
   * 要从表单中移除的控件指令。
   *
   */
  removeControl(dir: NgControl): void;

  /**
   * @description
   * The control directive from which to get the `FormControl`.
   *
   * 根据表单控件指令找到相应的 `FormControl`。
   *
   * @param dir: The control directive.
   *
   * 表单控件指令。
   */
  getControl(dir: NgControl): FormControl;

  /**
   * @description
   * Add a group of controls to this form.
   *
   * 往该表单中添加一组控件。
   *
   * @param dir: The control group directive to add.
   *
   * 要添加的控件组指令。
   *
   */
  addFormGroup(dir: AbstractFormGroupDirective): void;

  /**
   * @description
   * Remove a group of controls to this form.
   *
   * 从该表单中移除一组控件。
   *
   * @param dir: The control group directive to remove.
   *
   * 要移除的控件组指令。
   *
   */
  removeFormGroup(dir: AbstractFormGroupDirective): void;

  /**
   * @description
   * The `FormGroup` associated with a particular `AbstractFormGroupDirective`.
   *
   * 与指定的 `AbstractFormGroupDirective` 相关的 `FormGroup`。
   *
   * @param dir: The form group directive from which to get the `FormGroup`.
   *
   * 要从中获取 `FormGroup` 的表单组指令。
   *
   */
  getFormGroup(dir: AbstractFormGroupDirective): FormGroup;

  /**
   * @description
   * Update the model for a particular control with a new value.
   *
   * 把指定控件的表单模型修改为新的值。
   *
   * @param dir: The control directive to update.
   *
   * 要修改的控件指令。
   *
   * @param value: The new value for the control.
   *
   * 给该控件的新值。
   *
   */
  updateModel(dir: NgControl, value: any): void;
}
