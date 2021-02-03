/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AbstractControlDirective} from './abstract_control_directive';
import {ControlContainer} from './control_container';
import {ControlValueAccessor} from './control_value_accessor';


/**
 * @description
 * A base class that all `FormControl`-based directives extend. It binds a `FormControl`
 * object to a DOM element.
 *
 * `FormControl` 的指令扩展的基类。它将 `FormControl` 对象绑定到 DOM 元素。
 *
 * @publicApi
 */
export abstract class NgControl extends AbstractControlDirective {
  /**
   * @description
   * The parent form for the control.
   *
   * 控件的父表单。
   *
   * @internal
   */
  _parent: ControlContainer|null = null;

  /**
   * @description
   * The name for the control
   *
   * 控件的名称
   *
   */
  name: string|number|null = null;

  /**
   * @description
   * The value accessor for the control
   *
   * 控件的值访问器
   *
   */
  valueAccessor: ControlValueAccessor|null = null;

  /**
   * @description
   * The callback method to update the model from the view when requested
   *
   * 按需从视图更新模型的回调方法
   *
   * @param newValue The new value for the view
   *
   * 视图的新值
   *
   */
  abstract viewToModelUpdate(newValue: any): void;
}
