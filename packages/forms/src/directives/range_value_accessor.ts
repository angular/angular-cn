/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Renderer2, StaticProvider} from '@angular/core';

import {BuiltInControlValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

export const RANGE_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RangeValueAccessor),
  multi: true
};

/**
 * @description
 * The `ControlValueAccessor` for writing a range value and listening to range input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
 * directives.
 *
 * 此 `ControlValueAccessor` 用于写入范围输入器的值，并监听范围输入器的变化。它被 `FormControlDirective`、`FormControlName` 和 `NgModel` 使用。
 *
 * @usageNotes
 *
 * ### Using a range input with a reactive form
 *
 * ### 使用带响应式表单的范围输入器
 *
 * The following example shows how to use a range input with a reactive form.
 *
 * 以下示例显示了如何在响应式表单中使用范围输入器。
 *
 * ```ts
 * const ageControl = new FormControl();
 * ```
 *
 * ```
 * <input type="range" [formControl]="ageControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  selector:
      'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()'
  },
  providers: [RANGE_VALUE_ACCESSOR]
})
export class RangeValueAccessor extends BuiltInControlValueAccessor implements
    ControlValueAccessor {
  /**
   * Sets the "value" property on the input element.
   *
   * 在 input 元素上设置 “value” 属性。
   *
   * @nodoc
   */
  writeValue(value: any): void {
    this.setProperty('value', parseFloat(value));
  }

  /**
   * Registers a function called when the control value changes.
   *
   * 注册控件值更改时要调用的函数。
   *
   * @nodoc
   */
  registerOnChange(fn: (_: number|null) => void): void {
    this.onChange = (value) => {
      fn(value == '' ? null : parseFloat(value));
    };
  }
}
