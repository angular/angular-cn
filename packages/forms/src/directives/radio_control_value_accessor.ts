/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, forwardRef, Injectable, Injector, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';
import {NgControl} from './ng_control';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioControlValueAccessor),
  multi: true
};

function throwNameError() {
  throw new Error(`
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}

/**
 * @description
 * Class used by Angular to track radio buttons. For internal use only.
 */
@Injectable()
export class RadioControlRegistry {
  private _accessors: any[] = [];

  /**
   * @description
   * Adds a control to the internal registry. For internal use only.
   */
  add(control: NgControl, accessor: RadioControlValueAccessor) {
    this._accessors.push([control, accessor]);
  }

  /**
   * @description
   * Removes a control from the internal registry. For internal use only.
   */
  remove(accessor: RadioControlValueAccessor) {
    for (let i = this._accessors.length - 1; i >= 0; --i) {
      if (this._accessors[i][1] === accessor) {
        this._accessors.splice(i, 1);
        return;
      }
    }
  }

  /**
   * @description
   * Selects a radio button. For internal use only.
   */
  select(accessor: RadioControlValueAccessor) {
    this._accessors.forEach((c) => {
      if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].fireUncheck(accessor.value);
      }
    });
  }

  private _isSameGroup(
      controlPair: [NgControl, RadioControlValueAccessor],
      accessor: RadioControlValueAccessor): boolean {
    if (!controlPair[0].control) return false;
    return controlPair[0]._parent === accessor._control._parent &&
        controlPair[1].name === accessor.name;
  }
}

/**
 * @description
 * The `ControlValueAccessor` for writing radio control values and listening to radio control
 * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * `ControlValueAccessor` 用于写入单选控件的值和监听单选控件值的更改。这个值访问器由 `FormControlDirective`、`FormControlName` 和 `NgModel` 指令使用。
 *
 * @usageNotes
 *
 * ### Using radio buttons with reactive form directives
 *
 * ### 将单选按钮与响应式表单指令一起使用
 *
 * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
 * a reactive form, radio buttons in the same group should have the same `formControlName`.
 * Providing a `name` attribute is optional.
 *
 * 下面的示例演示了如何在响应式表单中使用单选按钮。当使用响应式表单的单选按钮时，同一组中的单选按钮应具有相同的 `formControlName` 。所提供的 `name` 属性是可选的。
 *
 * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  selector:
      'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
  host: {'(change)': 'onChange()', '(blur)': 'onTouched()'},
  providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioControlValueAccessor implements ControlValueAccessor, OnDestroy, OnInit {
  /** @internal */
  // TODO(issue/24571): remove '!'.
  _state!: boolean;
  /** @internal */
  // TODO(issue/24571): remove '!'.
  _control!: NgControl;
  /** @internal */
  // TODO(issue/24571): remove '!'.
  _fn!: Function;

  /**
   * The registered callback function called when a change event occurs on the input element.
   *
   * 在此 input 元素上发生 change 事件时调用的已注册回调函数。
   *
   * @nodoc
   */
  onChange = () => {};

  /**
   * The registered callback function called when a blur event occurs on the input element.
   *
   * 当 input 元素上发生 blur 事件时，调用已注册的回调函数。
   *
   * @nodoc
   */
  onTouched = () => {};

  /**
   * @description
   * Tracks the name of the radio input element.
   *
   * 跟踪单选 input 元素的名称。
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input() name!: string;

  /**
   * @description
   * Tracks the name of the `FormControl` bound to the directive. The name corresponds
   * to a key in the parent `FormGroup` or `FormArray`.
   *
   * 跟踪绑定到指令的 `FormControl` 的名称。该名称对应于父 `FormGroup` 或 `FormArray` 。
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input() formControlName!: string;

  /**
   * @description
   * Tracks the value of the radio input element
   *
   * 跟踪单选 input 元素的值
   *
   */
  @Input() value: any;

  constructor(
      private _renderer: Renderer2, private _elementRef: ElementRef,
      private _registry: RadioControlRegistry, private _injector: Injector) {}

  /** @nodoc */
  ngOnInit(): void {
    this._control = this._injector.get(NgControl);
    this._checkName();
    this._registry.add(this._control, this);
  }

  /** @nodoc */
  ngOnDestroy(): void {
    this._registry.remove(this);
  }

  /**
   * Sets the "checked" property value on the radio input element.
   *
   * 在单选 input 元素上设置 “checked” 属性的值。
   *
   * @nodoc
   */
  writeValue(value: any): void {
    this._state = value === this.value;
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', this._state);
  }

  /**
   * Registers a function called when the control value changes.
   *
   * 注册控件值更改时要调用的函数。
   *
   * @nodoc
   */
  registerOnChange(fn: (_: any) => {}): void {
    this._fn = fn;
    this.onChange = () => {
      fn(this.value);
      this._registry.select(this);
    };
  }

  /**
   * Sets the "value" on the radio input element and unchecks it.
   *
   * 在单选 input 元素上设置 “value”，并取消选中它。
   *
   * @param value
   */
  fireUncheck(value: any): void {
    this.writeValue(value);
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
   * 在此 input 元素上设置 “disabled” 属性。
   *
   * @nodoc
   */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  private _checkName(): void {
    if (this.name && this.formControlName && this.name !== this.formControlName &&
        (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throwNameError();
    }
    if (!this.name && this.formControlName) this.name = this.formControlName;
  }
}
