/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * To create a Pipe, you must implement this interface.
 *
 * 要创建一个管道，你必须实现该接口。
 *
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * Angular 会调用它的 `transform` 方法，并把要绑定的值作为第一个参数传入，其它参数会依次从第二个参数的位置开始传入。
 *
 * @usageNotes
 * ### Example
 *
 * ### 例子
 *
 * The `RepeatPipe` below repeats the value as many times as indicated by the first argument:
 *
 * 下面的 `RepeatPipe` 会把第一个参数指定的值（`value`）重复很多次（`times`）：
 *
 * ```
 * import {Pipe, PipeTransform} from '@angular/core';
 *
 * @Pipe({name: 'repeat'})
 * export class RepeatPipe implements PipeTransform {
 *   transform(value: any, times: number) {
 *     return value.repeat(times);
 *   }
 * }
 * ```
 *
 * Invoking `{{ 'ok' | repeat:3 }}` in a template produces `okokok`.
 *
 * 在模板中调用 `{{ 'ok' | repeat:3 }}` 的结果是 `okokok`。
 *
 */
export interface PipeTransform { transform(value: any, ...args: any[]): any; }
