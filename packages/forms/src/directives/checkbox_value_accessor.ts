/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Renderer2} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

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
export class CheckboxControlValueAccessor implements ControlValueAccessor {
  /**
   * The registered callback function called when a change event occurs on the input element.
   *
   * 当此 input 元素上发生更改事件时，要调用的已注册回调函数。
   *
   * @nodoc
   */
  onChange = (_: any) => {};

  /**
   * The registered callback function called when a blur event occurs on the input element.
   *
   * 当此 input 元素上发生失焦事件时，要调用的已注册回调函数。
   *
   * @nodoc
   */
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  /**
   * Sets the "checked" property on the input element.
   *
   * 在此 input 元素上设置“checked”属性。
   *
   * @nodoc
   */
  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', value);
  }

  /**
   * Registers a function called when the control value changes.
   *
   * 注册控件值更改时调用的函数。
   *
   * @nodoc
   */
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  /**
   * Registers a function called when the control is touched.
   *
   * 注册控件被接触过时要调用的函数。
   *
   * @nodoc
   */
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  /**
   * Sets the "disabled" property on the input element.
   *
   * 在此 input 元素上设置“disabled”属性。
   *
   * @nodoc
   */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
