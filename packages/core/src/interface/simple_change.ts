/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Represents a basic change from a previous to a new value for a single
 * property on a directive instance. Passed as a value in a
 * {@link SimpleChanges} object to the `ngOnChanges` hook.
 *
 * 表示指令实例上单个属性从先前值到新值的基本变更对象。在 {@link SimpleChanges} 对象中作为值传递给 `ngOnChanges` 挂钩。
 *
 * @see `OnChanges`
 *
 * @publicApi
 */
export class SimpleChange {
  constructor(public previousValue: any, public currentValue: any, public firstChange: boolean) {}
  /**
   * Check whether the new value is the first value assigned.
   *
   * 检查新值是否是首次赋值的。
   *
   */
  isFirstChange(): boolean {
    return this.firstChange;
  }
}

/**
 * A hashtable of changes represented by {@link SimpleChange} objects stored
 * at the declared property name they belong to on a Directive or Component. This is
 * the type passed to the `ngOnChanges` hook.
 *
 * 用 {@link SimpleChange} 对象表示的变更的哈希表，这些对象以声明的属性名称存储在指令或组件上，这些属性属于它们。这是传递给 `ngOnChanges` 钩子的类型。
 *
 * @see `OnChanges`
 *
 * @publicApi
 */
export interface SimpleChanges {
  [propName: string]: SimpleChange;
}
