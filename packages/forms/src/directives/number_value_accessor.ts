/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Renderer2} from '@angular/core';

import {BuiltInControlValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

export const NUMBER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberValueAccessor),
  multi: true
};

/**
 * @description
 * The `ControlValueAccessor` for writing a number value and listening to number input changes.
 * The value accessor is used by the `FormControlDirective`, `FormControlName`, and `NgModel`
 * directives.
 *
 * 用于写入数字值和监听数字输入框更改的 `ControlValueAccessor`。这个值访问器由 `FormControlDirective`、`FormControlName` 和 `NgModel` 指令使用。
 *
 * @usageNotes
 *
 * ### Using a number input with a reactive form.
 *
 * ### 将数字输入框与响应式表单一起使用。
 *
 * The following example shows how to use a number input with a reactive form.
 *
 * 下面的示例演示了如何将数字输入框与响应式表单一起使用。
 *
 * ```ts
 * const totalCountControl = new FormControl();
 * ```
 *
 * ```
 * <input type="number" [formControl]="totalCountControl">
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  selector:
      'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
  host: {'(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
  providers: [NUMBER_VALUE_ACCESSOR]
})
export class NumberValueAccessor extends BuiltInControlValueAccessor implements
    ControlValueAccessor {
  /**
   * Sets the "value" property on the input element.
   *
   * 在此 input 元素上设置 “value” 属性。
   *
   * @nodoc
   */
  writeValue(value: number): void {
    // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
    const normalizedValue = value == null ? '' : value;
    this.setProperty('value', normalizedValue);
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
