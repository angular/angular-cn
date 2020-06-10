/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An interface that is implemented by pipes in order to perform a transformation.
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * 一个需要由管道实现的接口，用于执行转换操作。
 * Angular 会调用它的 `transform` 方法，并把要绑定的值作为第一个参数传入，其它参数会依次从第二个参数的位置开始传入。
 *
 * @usageNotes
 *
 * In the following example, `RepeatPipe` repeats a given value a given number of times.
 *
 * 在下面的例子中，`RepeatPipe` 会把指定的值（`value`）重复指定的次数（`times`）：
 *
 * ```ts
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
 * @publicApi
 */
export interface PipeTransform {
  transform(value: any, ...args: any[]): any;
}
