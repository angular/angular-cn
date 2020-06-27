/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '../i18n/format_date';
import {invalidPipeArgumentError} from './invalid_pipe_argument_error';

// clang-format off
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a date value according to locale rules.
 *
 * 根据区域设置规则格式化日期值。
 *
 * Only the `en-US` locale data comes with Angular. To localize dates
 * in another language, you must import the corresponding locale data.
 * See the [I18n guide](guide/i18n#i18n-pipes) for more information.
 *
 * Angular 只自带了 `en-US` 区域的数据。要想在其它语言中对日期进行本地化，你必须导入相应的区域数据。
 * 欲知详情，参见 [I18n guide](guide/i18n#i18n-pipes)。
 *
 * @see `formatDate()`
 *
 *
 * @usageNotes
 *
 * The result of this pipe is not reevaluated when the input is mutated. To avoid the need to
 * reformat the date on every change-detection cycle, treat the date as an immutable object
 * and change the reference when the pipe needs to run again.
 *
 * 当输入值发生变化时，该管道的结果并不会改变。如果不想在每个变更检测周期中都强制重新格式化该日期，请把日期看做一个不可变对象，
 * 当需要让该管道重新运行时，请赋给它一个新的对象，以更改它的引用。
 *
 * ### Pre-defined format options
 *
 * ### 预定义的格式选项
 *
 * Examples are given in `en-US` locale.
 *
 * 下面是 `en-US` 区域的例子。
 *
 * - `'short'`: equivalent to `'M/d/yy, h:mm a'` (`6/15/15, 9:03 AM`).
 *
 *   `'short'`: 等价于 `'M/d/yy, h:mm a'` (`6/15/15, 9:03 AM`).
 *
 * - `'medium'`: equivalent to `'MMM d, y, h:mm:ss a'` (`Jun 15, 2015, 9:03:01 AM`).
 *
 *   `'medium'`: 等价于 `'MMM d, y, h:mm:ss a'` (`Jun 15, 2015, 9:03:01 AM`).
 *
 * - `'long'`: equivalent to `'MMMM d, y, h:mm:ss a z'` (`June 15, 2015 at 9:03:01 AM
 *
 *   `'long'`: 等价于 `'MMMM d, y, h:mm:ss a z'` (`June 15, 2015 at 9:03:01 AM
 *
 * GMT+1`).
 * - `'full'`: equivalent to `'EEEE, MMMM d, y, h:mm:ss a zzzz'` (`Monday, June 15, 2015 at
 *
 *   `'full'`: 等价于 `'EEEE, MMMM d, y, h:mm:ss a zzzz'` (`Monday, June 15, 2015 at
 *
 * 9:03:01 AM GMT+01:00`).
 * - `'shortDate'`: equivalent to `'M/d/yy'` (`6/15/15`).
 *
 *   `'shortDate'`: 等价于 `'M/d/yy'` (`6/15/15`).
 *
 * - `'mediumDate'`: equivalent to `'MMM d, y'` (`Jun 15, 2015`).
 *
 *   `'mediumDate'`: 等价于 `'MMM d, y'` (`Jun 15, 2015`).
 *
 * - `'longDate'`: equivalent to `'MMMM d, y'` (`June 15, 2015`).
 *
 *   `'longDate'`: 等价于 `'MMMM d, y'` (`June 15, 2015`).
 *
 * - `'fullDate'`: equivalent to `'EEEE, MMMM d, y'` (`Monday, June 15, 2015`).
 *
 *   `'fullDate'`: 等价于 `'EEEE, MMMM d, y'` (`Monday, June 15, 2015`).
 *
 * - `'shortTime'`: equivalent to `'h:mm a'` (`9:03 AM`).
 *
 *   `'shortTime'`: 等价于 `'h:mm a'` (`9:03 AM`).
 *
 * - `'mediumTime'`: equivalent to `'h:mm:ss a'` (`9:03:01 AM`).
 *
 *   `'mediumTime'`: 等价于 `'h:mm:ss a'` (`9:03:01 AM`).
 *
 * - `'longTime'`: equivalent to `'h:mm:ss a z'` (`9:03:01 AM GMT+1`).
 *
 *   `'longTime'`: 等价于 `'h:mm:ss a z'` (`9:03:01 AM GMT+1`).
 *
 * - `'fullTime'`: equivalent to `'h:mm:ss a zzzz'` (`9:03:01 AM GMT+01:00`).
 *
 *   `'fullTime'`: 等价于 `'h:mm:ss a zzzz'` (`9:03:01 AM GMT+01:00`).
 *
 *
 * ### Custom format options
 *
 * ### 自定义格式选项
 *
 * You can construct a format string using symbols to specify the components
 * of a date-time value, as described in the following table.
 * Format details depend on the locale.
 * Fields marked with (*) are only available in the extra data set for the given locale.
 *
 * 你可以使用符号来构造出格式字符串，以指定日期-时间值的各个部分，如下表所示。
 * 具体格式取决于区域设置。
 * 标 `*` 的字段表示仅在特定区域的数据中才有效。
 *
 *  | <t>Field type</t><t>字段类型</t> | <t>Format</t><t>格式</t> | <t>Description</t><t>说明</t> | <t>Example Value</t><t>范例值</t>                                              |
 *  |--------------------|-------------|---------------------------------------------------------------|------------------------------------------------------------|
 *  | <t>Era</t><t>纪元</t>                | G, GG & GGG | <t>Abbreviated</t><t>缩略</t>| AD                                                         |
 *  |                    | GGGG        | <t>Wide</t><t>全称</t>| Anno Domini                                                |
 *  |                    | GGGGG       | <t>Narrow</t><t>最简</t>| A                                                          |
 *  | <t>Year</t><t>年</t>               | y           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 2, 20, 201, 2017, 20173                                    |
 *  |                    | yy          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 02, 20, 01, 17, 73                                         |
 *  |                    | yyy         | <t>Numeric</t><t>数字</t>: 3 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 002, 020, 201, 2017, 20173                                 |
 *  |                    | yyyy        | <t>Numeric</t><t>数字</t>: 4 <t>digits or more + zero padded</t><t>或更多数字 + 0 补位</t> | 0002, 0020, 0201, 2017, 20173                              |
 *  | <t>Month</t><t>月</t>              | M           | <t>Numeric</t><t>数字</t>: <t>1 digit</t><t>1 数字</t>                                              | 9, 12                                                      |
 *  |                    | MM          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 09, 12                                                     |
 *  |                    | MMM         | <t>Abbreviated</t><t>缩略</t>| Sep                                                        |
 *  |                    | MMMM        | <t>Wide</t><t>全称</t>| September                                                  |
 *  |                    | MMMMM       | <t>Narrow</t><t>最简</t>| S                                                          |
 *  | <t>Month standalone</t><t>独立月份</t> | L           | <t>Numeric</t><t>数字</t>: <t>1 digit</t><t>1 数字</t>                                              | 9, 12                                                      |
 *  |                    | LL          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 09, 12                                                     |
 *  |                    | LLL         | <t>Abbreviated</t><t>缩略</t>| Sep                                                        |
 *  |                    | LLLL        | <t>Wide</t><t>全称</t>| September                                                  |
 *  |                    | LLLLL       | <t>Narrow</t><t>最简</t>| S                                                          |
 *  | <t>Week of year</t><t>年内周次</t> | w           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 1... 53                                                    |
 *  |                    | ww          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 01... 53                                                   |
 *  | <t>Week of month</t><t>月内周次</t> | W           | <t>Numeric</t><t>数字</t>: <t>1 digit</t><t>1 数字</t>                                              | 1... 5                                                     |
 *  | <t>Day of month</t><t>月内日</t> | d           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 1                                                          |
 *  |                    | dd          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 01                                                          |
 *  | <t>Week day</t><t>周内日</t> | E, EE & EEE | <t>Abbreviated</t><t>缩略</t>| Tue                                                        |
 *  |                    | EEEE        | <t>Wide</t><t>全称</t>| Tuesday                                                    |
 *  |                    | EEEEE       | <t>Narrow</t><t>最简</t>| T                                                          |
 *  |                    | EEEEEE      | <t>Short</t><t>短</t> | Tu                                                         |
 *  | <t>Period</t><t>日内时段</t> | a, aa & aaa | <t>Abbreviated</t><t>缩略</t>| am/pm or AM/PM                                             |
 *  |                    | aaaa        | <t>Wide</t><t>全称</t><t>(fallback to `a` when missing)</t><t>(缺少时等同于 `a`)</t>| ante meridiem/post meridiem                                |
 *  |                    | aaaaa       | <t>Narrow</t><t>最简</t>| a/p                                                        |
 *  | <t>Period*</t><t>日内时段</t> | B, BB & BBB | <t>Abbreviated</t><t>缩略</t>| mid.                                                       |
 *  |                    | BBBB        | <t>Wide</t><t>全称</t>| am, pm, midnight, noon, morning, afternoon, evening, night |
 *  |                    | BBBBB       | <t>Narrow</t><t>最简</t>| md                                                         |
 *  | <t>Period standalone*</t><t>独立时段</t> | b, bb & bbb | <t>Abbreviated</t><t>缩略</t>| mid.                                                       |
 *  |                    | bbbb        | <t>Wide</t><t>全称</t>| am, pm, midnight, noon, morning, afternoon, evening, night |
 *  |                    | bbbbb       | <t>Narrow</t><t>最简</t>| md                                                         |
 *  | <t>Hour 1-12</t><t>小时(1-12)</t> | h           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 1, 12                                                      |
 *  |                    | hh          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 01, 12                                                     |
 *  | <t>Hour 0-23</t><t>小时(0-23)</t> | H           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 0, 23                                                      |
 *  |                    | HH          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 00, 23                                                     |
 *  | <t>Minute</t><t>分</t> | m           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 8, 59                                                      |
 *  |                    | mm          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 08, 59                                                     |
 *  | <t>Second</t><t>秒</t> | s           | <t>Numeric</t><t>数字</t>: <t>minimum digits</t><t>最小位数</t>                                       | 0... 59                                                    |
 *  |                    | ss          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 00... 59                                                   |
 *  | <t>Fractional seconds</t><t>分数秒</t> | S           | <t>Numeric</t><t>数字</t>: <t>1 digit</t><t>1 数字</t>                                              | 0... 9                                                     |
 *  |                    | SS          | <t>Numeric</t><t>数字</t>: 2 <t>digits + zero padded</t><t>数字 + 0 补位</t>                               | 00... 99                                                   |
 *  |                    | SSS         | <t>Numeric</t><t>数字</t>: 3 <t>digits + zero padded</t><t>数字 + 0 补位</t> (= <t>milliseconds</t><t>毫秒</t>)              | 000... 999                                                 |
 *  | <t>Zone</t><t>时区</t> | z, zz & zzz | <t>Short specific non location format (fallback to O)</t><t>位置无关短格式（默认为0）</t>            | GMT-8                                                      |
 *  |                    | zzzz        | <t>Long specific non location format (fallback to OOOO)</t><t>位置无关长格式（默认为0000）</t>          | GMT-08:00                                                  |
 *  |                    | Z, ZZ & ZZZ | ISO8601 <t>basic format</t><t>基本格式</t> | -0800                                                      |
 *  |                    | ZZZZ        | <t>Long localized GMT format</t><t>本地化 GMT 长格式</t> | GMT-8:00                                                   |
 *  |                    | ZZZZZ       | ISO8601 <t>extended format + Z indicator for offset 0</t><t>扩展格式 + 偏移为 0 时用 Z 表示</t> (= XXXXX) | -08:00                                                     |
 *  |                    | O, OO & OOO | <t>Short localized GMT format</t><t>本地化 GMT 短格式</t> | GMT-8                                                      |
 *  |                    | OOOO        | <t>Long localized GMT format</t><t>本地化 GMT 长格式</t> | GMT-08:00                                                  |
 *
 * Note that timezone correction is not applied to an ISO string that has no time component, such as "2016-09-19"
 *
 * 请注意，时区校正不适用于没有时间部分的ISO字符串，例如“2016-09-19”
 *
 * ### Format examples
 *
 * ### 格式范例
 *
 * These examples transform a date into various formats,
 * assuming that `dateObj` is a JavaScript `Date` object for
 * year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11,
 * given in the local time for the `en-US` locale.
 *
 * 下面这些例子会把日期转换成多种格式。
 * 这里假设 `dateObj` 是个 JavaScript 的 `Date` 对象： 2015 年 6 月 15 日 21 时 43 分 11 秒，
 * 使用的是 `en-US` 区域的当地时间。
 *
 * ```
 * {{ dateObj | date }}               // output is 'Jun 15, 2015'
 * {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
 * {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
 * {{ dateObj | date:'mm:ss' }}       // output is '43:11'
 * ```
 *
 * ### Usage example
 *
 * ### 使用范例
 *
 * The following component uses a date pipe to display the current date in different formats.
 *
 * 下列组件借助一个日期管道来以不同的格式显示当前日期。
 *
 * ```
 * @Component({
 *  selector: 'date-pipe',
 *  template: `<div>
 *    <p>Today is {{today | date}}</p>
 *    <p>Or if you prefer, {{today | date:'fullDate'}}</p>
 *    <p>The time is {{today | date:'h:mm a z'}}</p>
 *  </div>`
 * })
 * // Get the current date and time as a date-time value.
 * export class DatePipeComponent {
 *   today: number = Date.now();
 * }
 * ```
 *
 * @publicApi
 */
// clang-format on
@Pipe({name: 'date', pure: true})
export class DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  /**
   * @param value The date expression: a `Date` object,  a number
   * (milliseconds since UTC epoch), or an ISO string (https://www.w3.org/TR/NOTE-datetime).
   *
   * 日期表达式：`Date` 对象、数字（从 UTC 时代以来的毫秒数）或一个 ISO 字符串 (https://www.w3.org/TR/NOTE-datetime)。
   *
   * @param format The date/time components to include, using predefined options or a
   * custom format string.
   *
   * 要包含的日期、时间部分的格式，使用预定义选项或自定义格式字符串。
   *
   * @param timezone A timezone offset (such as `'+0430'`), or a standard
   * UTC/GMT or continental US timezone abbreviation.
   * When not supplied, uses the end-user's local system timezone.
   *
   * 一个时区偏移（比如`'+0430'`）或标准的 UTC/GMT 或美国大陆时区的缩写。默认为最终用户机器上的本地系统时区。
   *
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
   *
   * 要使用的区域格式规则的区域代码。
   * 如果不提供，就使用 `LOCALE_ID` 的值，默认为 `en-US`。
   * 参见[设置应用的区域](guide/i18n#setting-up-the-locale-of-your-app)。
   *
   * @returns A date string in the desired format.
   *
   * 指定格式的日期字符串。
   */
  transform(value: any, format = 'mediumDate', timezone?: string, locale?: string): string|null {
    if (value == null || value === '' || value !== value) return null;

    try {
      return formatDate(value, format, locale || this.locale, timezone);
    } catch (error) {
      throw invalidPipeArgumentError(DatePipe, error.message);
    }
  }
}
