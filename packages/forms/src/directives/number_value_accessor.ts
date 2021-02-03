/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Renderer2} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

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
export class NumberValueAccessor implements ControlValueAccessor {
  /**
   * The registered callback function called when a change or input event occurs on the input
   * element.
   *
   * 在此 input 元素上发生 change 或 input 事件时要调用的已注册回调函数。
   *
   * @nodoc
   */
  onChange = (_: any) => {};

  /**
   * The registered callback function called when a blur event occurs on the input element.
   *
   * 当此 input 元素上发生 blur 事件时，调用已注册的回调函数。
   *
   * @nodoc
   */
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

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
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
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

  /**
   * Registers a function called when the control is touched.
   *
   * 注册控件被接触过时要调用的函数。
   *
   * @nodoc
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the "disabled" property on the input element.
   *
   * 在此 input 元素上设置 “disabled” 属性。
   *
   * @nodoc
   */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
