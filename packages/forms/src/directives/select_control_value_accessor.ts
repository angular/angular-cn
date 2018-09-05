/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Host, Input, OnDestroy, Optional, Renderer2, StaticProvider, forwardRef, ɵlooseIdentical as looseIdentical} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';

export const SELECT_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectControlValueAccessor),
  multi: true
};

function _buildValueString(id: string | null, value: any): string {
  if (id == null) return `${value}`;
  if (value && typeof value === 'object') value = 'Object';
  return `${id}: ${value}`.slice(0, 50);
}

function _extractId(valueString: string): string {
  return valueString.split(':')[0];
}

/**
 * @description
 *
 * Writes values and listens to changes on a select element.
 *
 * 在 `select` 元素上写入值并监听其变更。
 *
 * Used by `NgModel`, `FormControlDirective`, and `FormControlName`
 * to keep the view synced with the `FormControl` model.
 *
 * 由 `NgModel`、`FormControlDirective` 和 `FormControlName` 使用，
 * 以保持视图与 `FormControl` 模型的同步。
 *
 * If you have imported the `FormsModule` or the `ReactiveFormsModule`, this
 * value accessor will be active on any select control that has a form directive. You do
 * **not** need to add a special selector to activate it.
 *
 * 如果你已经导入了 `FormsModule` 或 `ReactiveFormsModule`，该"值访问器"（`ValueAccessor`）将会自动在任何具有表单指令的 `select` 元素上激活。
 * 你**不用**添加特殊的选择器来激活它。
 *
 * ### How to use select controls with form directives
 *
 * ### 如何与表单指令一起使用 `select` 控件
 *
 * To use a select in a template-driven form, simply add an `ngModel` and a `name`
 * attribute to the main `<select>` tag.
 *
 * 要在模板驱动表单中使用 `select`，只要把 `ngModel` 和 `name` 属性加到 `<select>` 标签上即可。
 *
 * If your option values are simple strings, you can bind to the normal `value` property
 * on the option.  If your option values happen to be objects (and you'd like to save the
 * selection in your form as an object), use `ngValue` instead:
 *
 * 如果 `option` 的值是字符串，那么你可以在 `option` 中绑定到标准的 `value` 属性。
 * 如果是对象（你可能要把该选择结果作为对象存入表单中），请用 `ngValue` 代替：
 *
 * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
 *
 * In reactive forms, you'll also want to add your form directive (`formControlName` or
 * `formControl`) on the main `<select>` tag. Like in the former example, you have the
 * choice of binding to the  `value` or `ngValue` property on the select's options.
 *
 * 在响应式表单中，你可能想把表单指令（`formControlName` 或 `formControl`）添加到 `<select>` 标签上。
 * 像以前的例子中一样，你可以把候选项绑定到 `option` 的 `value` 或 `ngValue` 属性上。
 *
 * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
 *
 * ### Caveat: Option selection
 *
 * ### 警告：`option` 选择结果
 *
 * Angular uses object identity to select option. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * Angular 使用对象标识作为选项。条目标识可能在其实质性数据没有变化的情况发生变化。比如，如果这些条目是通过 RPC 的方式从服务端取到的，当重新执行 RPC 时，就算数据没有变化，第二个响应也会生成一些具有不同对象标识的对象。
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects option by the return value of the function.
 *
 * 要想自定义默认的选项比较算法，`<select>` 支持一个名叫 `compareWith` 的输入。
 * `compareWith` 接受一个**函数**，它具有两个参数：`option1` 和 `option2`。
 * 如果指定了 `compareWith`，则 Angular 会根据该函数的返回值来选取一个选项。
 *
 * #### Syntax
 *
 * #### 语法
 *
 * ```
 * <select [compareWith]="compareFn"  [(ngModel)]="selectedCountries">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * Note: We listen to the 'change' event because 'input' events aren't fired
 * for selects in Firefox and IE:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
 *
 * 注意：我们要监听 `change` 事件，这是因为 `input` 事件不会在 Firefox 和 IE 的 `select` 元素上触发：
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
 *
 * * **npm package**: `@angular/forms`
 *
 *   **npm 包**: `@angular/forms`
 *
 *
 */
@Directive({
  selector:
      'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
  host: {'(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
  providers: [SELECT_VALUE_ACCESSOR]
})
export class SelectControlValueAccessor implements ControlValueAccessor {
  value: any;
  /** @internal */
  _optionMap: Map<string, any> = new Map<string, any>();
  /** @internal */
  _idCounter: number = 0;

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }

  private _compareWith: (o1: any, o2: any) => boolean = looseIdentical;

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  writeValue(value: any): void {
    this.value = value;
    const id: string|null = this._getOptionId(value);
    if (id == null) {
      this._renderer.setProperty(this._elementRef.nativeElement, 'selectedIndex', -1);
    }
    const valueString = _buildValueString(id, value);
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', valueString);
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = (valueString: string) => {
      this.value = this._getOptionValue(valueString);
      fn(this.value);
    };
  }
  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  /** @internal */
  _registerOption(): string { return (this._idCounter++).toString(); }

  /** @internal */
  _getOptionId(value: any): string|null {
    for (const id of Array.from(this._optionMap.keys())) {
      if (this._compareWith(this._optionMap.get(id), value)) return id;
    }
    return null;
  }

  /** @internal */
  _getOptionValue(valueString: string): any {
    const id: string = _extractId(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
  }
}

/**
 * @description
 *
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * 把选项 `<option>` 标记为动态的，这样 Angular 就会在选项变化时得到通知。
 *
 * See docs for `SelectControlValueAccessor` for usage examples.
 *
 * 参见 `SelectControlValueAccessor` 的文档查看使用范例。
 */
@Directive({selector: 'option'})
export class NgSelectOption implements OnDestroy {
  // TODO(issue/24571): remove '!'.
  id !: string;

  constructor(
      private _element: ElementRef, private _renderer: Renderer2,
      @Optional() @Host() private _select: SelectControlValueAccessor) {
    if (this._select) this.id = this._select._registerOption();
  }

  @Input('ngValue')
  set ngValue(value: any) {
    if (this._select == null) return;
    this._select._optionMap.set(this.id, value);
    this._setElementValue(_buildValueString(this.id, value));
    this._select.writeValue(this._select.value);
  }

  @Input('value')
  set value(value: any) {
    this._setElementValue(value);
    if (this._select) this._select.writeValue(this._select.value);
  }

  /** @internal */
  _setElementValue(value: string): void {
    this._renderer.setProperty(this._element.nativeElement, 'value', value);
  }

  ngOnDestroy(): void {
    if (this._select) {
      this._select._optionMap.delete(this.id);
      this._select.writeValue(this._select.value);
    }
  }
}
