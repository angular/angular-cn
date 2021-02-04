/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '@angular/core';

/**
 * @description
 * Defines an interface that acts as a bridge between the Angular forms API and a
 * native element in the DOM.
 *
 * 定义一个接口，该接口充当 Angular 表单 API 和 DOM 中的原生元素之间的桥梁。
 *
 * Implement this interface to create a custom form control directive
 * that integrates with Angular forms.
 *
 * 实现此接口以创建与 Angular 表单集成的自定义表单控件指令。
 *
 * @see DefaultValueAccessor
 *
 * @publicApi
 */
export interface ControlValueAccessor {
  /**
   * @description
   * Writes a new value to the element.
   *
   * 将新值写入元素。
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * 当请求从模型到视图的编程更改时，表单 API 会调用此方法以写入视图。
   *
   * @usageNotes
   *
   * ### Write a value to the element
   *
   * ### 向元素写入值
   *
   * The following example writes a value to the native DOM element.
   *
   * 以下示例将一个值写入原生 DOM 元素。
   *
   * ```ts
   * writeValue(value: any): void {
   *   this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
   * }
   * ```
   *
   * @param obj The new value for the element
   *
   * 元素的新值
   *
   */
  writeValue(obj: any): void;

  /**
   * @description
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   *
   * 注册一个回调函数，该控件的值在 UI 中更改时将调用该回调函数。
   *
   * This method is called by the forms API on initialization to update the form
   * model when values propagate from the view to the model.
   *
   * 当值从视图传播到模型时，表单 API 会在初始化时调用此方法以更新表单模型。
   *
   * When implementing the `registerOnChange` method in your own value accessor,
   * save the given function so your class calls it at the appropriate time.
   *
   * 在你自己的值访问器中实现 `registerOnChange` 方法时，请保存给定的函数，以便你的类在适当的时机调用它。
   *
   * @usageNotes
   *
   * ### Store the change function
   *
   * ### 存储变更函数
   *
   * The following example stores the provided function as an internal method.
   *
   * 以下示例将所提供的函数存储为内部方法。
   *
   * ```ts
   * registerOnChange(fn: (_: any) => void): void {
   *   this._onChange = fn;
   * }
   * ```
   *
   * When the value changes in the UI, call the registered
   * function to allow the forms API to update itself:
   *
   * 当用户界面中的值更改时，请调用已注册的函数以允许表单 API 自行更新：
   *
   * ```ts
   * host: {
   *    '(change)': '_onChange($event.target.value)'
   * }
   * ```
   *
   * @param fn The callback function to register
   *
   * 要注册的回调函数
   *
   */
  registerOnChange(fn: any): void;

  /**
   * @description
   * Registers a callback function that is called by the forms API on initialization
   * to update the form model on blur.
   *
   * 注册一个在初始化时由表单 API 调用的回调函数，以在失焦时更新表单模型。
   *
   * When implementing `registerOnTouched` in your own value accessor, save the given
   * function so your class calls it when the control should be considered
   * blurred or "touched".
   *
   * 在你自己的值访问器中实现 `registerOnTouched` ，请保存给定函数，以便你的类在应将控件视为失焦或“已接触过”时调用它。
   *
   * @usageNotes
   *
   * ### Store the callback function
   *
   * ### 存储回调函数
   *
   * The following example stores the provided function as an internal method.
   *
   * 以下示例将所提供的函数存储为内部方法。
   *
   * ```ts
   * registerOnTouched(fn: any): void {
   *   this._onTouched = fn;
   * }
   * ```
   *
   * On blur (or equivalent), your class should call the registered function to allow
   * the forms API to update itself:
   *
   * 在 blur（或等效事件）时，你的类应调用已注册的函数以允许表单 API 自行更新：
   *
   * ```ts
   * host: {
   *    '(blur)': '_onTouched()'
   * }
   * ```
   *
   * @param fn The callback function to register
   *
   * 要注册的回调函数
   *
   */
  registerOnTouched(fn: any): void;

  /**
   * @description
   * Function that is called by the forms API when the control status changes to
   * or from 'DISABLED'. Depending on the status, it enables or disables the
   * appropriate DOM element.
   *
   * 当控件状态更改为 “DISABLED” 或从 “DISABLED” 更改时，表单 API 要调用的函数。根据其状态，它会启用或禁用适当的 DOM 元素。
   *
   * @usageNotes
   *
   * The following is an example of writing the disabled property to a native DOM element:
   *
   * 以下是将 disabled 属性写入原生 DOM 元素的示例：
   *
   * ```ts
   * setDisabledState(isDisabled: boolean): void {
   *   this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
   * }
   * ```
   *
   * @param isDisabled The disabled status to set on the element
   *
   * 要在元素上设置的禁用状态
   *
   */
  setDisabledState?(isDisabled: boolean): void;
}

/**
 * Used to provide a `ControlValueAccessor` for form controls.
 *
 * 用于为表单控件提供 `ControlValueAccessor`
 *
 * See `DefaultValueAccessor` for how to implement one.
 *
 * 有关如何实现的信息，请参见 `DefaultValueAccessor`
 *
 * @publicApi
 */
export const NG_VALUE_ACCESSOR =
    new InjectionToken<ReadonlyArray<ControlValueAccessor>>('NgValueAccessor');
