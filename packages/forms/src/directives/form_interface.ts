/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {FormControl, FormGroup} from '../model';

import {AbstractFormGroupDirective} from './abstract_form_group_directive';
import {NgControl} from './ng_control';



/**
 * An interface that `FormGroupDirective` and `NgForm` implement.
 *
 * 由 `FormGroupDirective` 和 `NgForm` 实现的接口。
 *
 * Only used by the forms module.
 *
 * 只用于表单模块。
 */
export interface Form {
  /**
   * Add a control to this form.
   *
   * 把控件添加到该表单中。
   */
  addControl(dir: NgControl): void;

  /**
   * Remove a control from this form.
   *
   * 从该表单中移除控件。
   */
  removeControl(dir: NgControl): void;

  /**
   * Look up the `FormControl` associated with a particular `NgControl`.
   *
   * 查找与指定的 `NgControl` 相关的 `FormControl`。
   */
  getControl(dir: NgControl): FormControl;

  /**
   * Add a group of controls to this form.
   *
   * 往该表单中添加一组控件。
   */
  addFormGroup(dir: AbstractFormGroupDirective): void;

  /**
   * Remove a group of controls from this form.
   *
   * 从该表单中移除一组控件。
   */
  removeFormGroup(dir: AbstractFormGroupDirective): void;

  /**
   * Look up the `FormGroup` associated with a particular `AbstractFormGroupDirective`.
   *
   * 查找与指定的 `AbstractFormGroupDirective` 相关的 `FormGroup`。
   */
  getFormGroup(dir: AbstractFormGroupDirective): FormGroup;

  /**
   * Update the model for a particular control with a new value.
   *
   * 把指定控件的表单模型修改为新的值。
   */
  updateModel(dir: NgControl, value: any): void;
}
