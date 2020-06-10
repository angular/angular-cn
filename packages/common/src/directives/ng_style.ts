/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Directive, DoCheck, ElementRef, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, Renderer2} from '@angular/core';


/**
 * @ngModule CommonModule
 *
 * @usageNotes
 *
 * Set the font of the containing element to the result of an expression.
 *
 * ```
 * <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>
 * ```
 *
 * Set the width of the containing element to a pixel value returned by an expression.
 *
 * ```
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 * ```
 *
 * Set a collection of style values using an expression that returns key-value pairs.
 *
 * ```
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * @description
 *
 * An attribute directive that updates styles for the containing HTML element.
 * Sets one or more style properties, specified as colon-separated key-value pairs.
 * The key is a style name, with an optional `.<unit>` suffix
 * (such as 'top.px', 'font-style.em').
 * The value is an expression to be evaluated.
 * The resulting non-null value, expressed in the given unit,
 * is assigned to the given style property.
 * If the result of evaluation is null, the corresponding style is removed.
 *
 * 一个属性指令，用于更新容器元素的样式。可以通过指定用冒号分隔的键值对来设置一个或多个样式属性。其键是样式名称，带有可选的 `<unit>` 后缀（比如 'top.px'，'font-style.em'）；其值是待求值的表达式。如果求值结果不是 null，则把用指定单位表示的结果赋值给指定的样式属性；如果是 null，则删除相应的样式。
 *
 * @publicApi
 */
@Directive({selector: '[ngStyle]'})
export class NgStyle implements DoCheck {
  private _ngStyle: {[key: string]: string}|null = null;
  private _differ: KeyValueDiffer<string, string|number>|null = null;

  constructor(
      private _ngEl: ElementRef, private _differs: KeyValueDiffers, private _renderer: Renderer2) {}

  @Input('ngStyle')
  set ngStyle(values: {[klass: string]: any}|null) {
    this._ngStyle = values;
    if (!this._differ && values) {
      this._differ = this._differs.find(values).create();
    }
  }

  ngDoCheck() {
    if (this._differ) {
      const changes = this._differ.diff(this._ngStyle!);
      if (changes) {
        this._applyChanges(changes);
      }
    }
  }

  private _setStyle(nameAndUnit: string, value: string|number|null|undefined): void {
    const [name, unit] = nameAndUnit.split('.');
    value = value != null && unit ? `${value}${unit}` : value;

    if (value != null) {
      this._renderer.setStyle(this._ngEl.nativeElement, name, value as string);
    } else {
      this._renderer.removeStyle(this._ngEl.nativeElement, name);
    }
  }

  private _applyChanges(changes: KeyValueChanges<string, string|number>): void {
    changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
    changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
    changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
  }
}
