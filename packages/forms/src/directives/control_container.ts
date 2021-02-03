/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AbstractControlDirective} from './abstract_control_directive';
import {Form} from './form_interface';


/**
 * @description
 * A base class for directives that contain multiple registered instances of `NgControl`.
 * Only used by the forms module.
 *
 * 包含多个已注册 `NgControl` 实例的指令的基类。仅由表单模块使用。
 *
 * @publicApi
 */
export abstract class ControlContainer extends AbstractControlDirective {
  /**
   * @description
   * The name for the control
   *
   * 控件的名称
   *
   */
  // TODO(issue/24571): remove '!'.
  name!: string|number|null;

  /**
   * @description
   * The top-level form directive for the control.
   *
   * 控件的顶级表单指令。
   *
   */
  get formDirective(): Form|null {
    return null;
  }

  /**
   * @description
   * The path to this group.
   *
   * 该组的路径。
   *
   */
  get path(): string[]|null {
    return null;
  }
}
