/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Pipe, PipeTransform} from '@angular/core';
import {invalidPipeArgumentError} from './invalid_pipe_argument_error';

/**
 * @ngModule CommonModule
 * @description
 *
 * Creates a new `Array` or `String` containing a subset (slice) of the elements.
 *
 * 从一个 `Array` 或 `String` 中创建其元素一个新子集（slice）。
 *
 * @usageNotes
 *
 * All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
 * and `String.prototype.slice()`.
 *
 * 所有行为都基于 JavaScript API `Array.prototype.slice()` 和 `String.prototype.slice()` 的预期行为。
 *
 * When operating on an `Array`, the returned `Array` is always a copy even when all
 * the elements are being returned.
 *
 * 当操作 `Array` 时，返回的 `Array` 始终是一个副本 —— 即使返回了所有元素也是一样。
 *
 * When operating on a blank value, the pipe returns the blank value.
 *
 * 当操作空白值时，该管道也会返回空白值。
 *
 * ### List Example
 *
 * ### 列表范例
 *
 * This `ngFor` example:
 *
 * `ngFor` 例子：
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}
 *
 * produces the following:
 *
 * 生成下列内容：
 *
 * ```html
 * <li>b</li>
 * <li>c</li>
 * ```
 *
 * ### String Examples
 *
 * ### 字符串范例
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}
 *
 * @publicApi
 */
@Pipe({name: 'slice', pure: false})
export class SlicePipe implements PipeTransform {
  /**
   * @param value a list or a string to be sliced.
   *
   * 要截取的列表或字符串。
   *
   * @param start the starting index of the subset to return:
   *
   * 要返回的子集的初始索引：
   *
   *   - **a positive integer**: return the item at `start` index and all items after
   *     in the list or string expression.
   *
   *     **一个正整数**：从列表或字符串表达式中返回从 `start` 索引处及之后的所有条目。
   *
   *   - **a negative integer**: return the item at `start` index from the end and all items after
   *     in the list or string expression.
   *
   *     **一个负整数**：从列表或字符串表达式中返回从结尾开始的第 `start` 索引处及之后的所有条目。
   *
   *   - **if positive and greater than the size of the expression**: return an empty list or
   * string.
   *
   *     **如果是正数而且大于表达式的条目数**：返回空列表或空字符串。
   *
   *   - **if negative and greater than the size of the expression**: return entire list or string.
   *
   *     **如果是复数而且大于表达式的条目数**：返回整个列表或字符串。
   *
   * @param end the ending index of the subset to return:
   *
   * 所要返回的子集的结尾索引：
   *
   *   - **omitted**: return all items until the end.
   *
   *     **省略**：返回结尾之前的全部条目。
   *
   *   - **if positive**: return all items before `end` index of the list or string.
   *
   *     **如果为正数**：从列表或字符串中返回 `end` 索引之前的所有条目。
   *
   *   - **if negative**: return all items before `end` index from the end of the list or string.
   *
   *     **如果为负数**：从列表或字符串中返回 `end` 索引之前的所有条目。
   */
  transform<T>(value: ReadonlyArray<T>, start: number, end?: number): Array<T>;
  transform(value: string, start: number, end?: number): string;
  transform(value: null, start: number, end?: number): null;
  transform(value: undefined, start: number, end?: number): undefined;
  transform(value: any, start: number, end?: number): any {
    if (value == null) return value;

    if (!this.supports(value)) {
      throw invalidPipeArgumentError(SlicePipe, value);
    }

    return value.slice(start, end);
  }

  private supports(obj: any): boolean {
    return typeof obj === 'string' || Array.isArray(obj);
  }
}
