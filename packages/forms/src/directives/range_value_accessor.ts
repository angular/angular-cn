/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Renderer2, StaticProvider} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

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
export class RangeValueAccessor implements ControlValueAccessor {
  /**
   * The registered callback function called when a change or input event occurs on the input
   * element.
   *
   * 在 input 元素上发生 change 或 input 事件时调用的已注册回调函数。
   *
   * @nodoc
   */
  onChange = (_: any) => {};

  /**
   * The registered callback function called when a blur event occurs on the input element.
   *
   * 当 input 元素上发生 blur 事件时，调用已注册的回调函数。
   *
   * @nodoc
   */
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  /**
   * Sets the "value" property on the input element.
   *
   * 在 input 元素上设置 “value” 属性。
   *
   * @nodoc
   */
  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
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
   * Sets the "disabled" property on the range input element.
   *
   * 在范围 input 元素上设置 “disabled” 属性。
   *
   * @nodoc
   */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
