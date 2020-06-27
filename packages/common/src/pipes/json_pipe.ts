/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Pipe, PipeTransform} from '@angular/core';

/**
 * @ngModule CommonModule
 * @description
 *
 * Converts a value into its JSON-format representation.  Useful for debugging.
 *
 * 把一个值转换成 JSON 字符串格式。在调试时很有用。
 *
 * @usageNotes
 *
 * The following component uses a JSON pipe to convert an object
 * to JSON format, and displays the string in both formats for comparison.
 *
 * 下列组件使用了一个 `JSON` 管道来把对象转换成 JSON 格式，并以两种格式显示字符串供对比。
 *
 * {@example common/pipes/ts/json_pipe.ts region='JsonPipe'}
 *
 * @publicApi
 */
@Pipe({name: 'json', pure: false})
export class JsonPipe implements PipeTransform {
  /**
   * @param value A value of any type to convert into a JSON-format string.
   *
   * 任何类型的要转换成 JSON 字符串格式的值
   */
  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}
