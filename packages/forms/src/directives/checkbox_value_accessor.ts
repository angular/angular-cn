/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Renderer2} from '@angular/core';

import {BuiltInControlValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxControlValueAccessor),
  multi: true,
};

/**
 * @description
 * A `ControlValueAccessor` for writing a value and listening to changes on a checkbox input
 * element.
 *
 * 一个 `ControlValueAccessor`，用于写入值并监听复选框输入元素上的更改。
 *
 * @usageNotes
 *
 * ### Using a checkbox with a reactive form.
 *
 * ### 使用带有响应式表单的复选框。
 *
 * The following example shows how to use a checkbox with a reactive form.
 *
 * 以下示例显示了如何将复选框与响应式表单一起使用。
 *
 * ```ts
 * const rememberLoginControl = new FormControl();
 * ```
 *
 * ```
 * <input type="checkbox" [formControl]="rememberLoginControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  selector:
      'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
  host: {'(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()'},
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxControlValueAccessor extends BuiltInControlValueAccessor implements
    ControlValueAccessor {
  /**
   * Sets the "checked" property on the input element.
   *
   * 在此 input 元素上设置“checked”属性。
   *
   * @nodoc
   */
  writeValue(value: any): void {
    this.setProperty('checked', value);
  }
}
