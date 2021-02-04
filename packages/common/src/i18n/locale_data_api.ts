/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵCurrencyIndex, ɵExtraLocaleDataIndex, ɵfindLocaleData, ɵgetLocaleCurrencyCode, ɵgetLocalePluralCase, ɵLocaleDataIndex} from '@angular/core';

import {CURRENCIES_EN, CurrenciesSymbols} from './currencies';


/**
 * Format styles that can be used to represent numbers.
 *
 * 可用来表示数字的格式化样式。
 *
 * @see `getLocaleNumberFormat()`.
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export enum NumberFormatStyle {
  Decimal,
  Percent,
  Currency,
  Scientific
}

/**
 * Plurality cases used for translating plurals to different languages.
 *
 * 用于将复数形式转换为不同语言的复数形式。
 *
 * @see `NgPlural`
 *
 * @see `NgPluralCase`
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export enum Plural {
  Zero = 0,
  One = 1,
  Two = 2,
  Few = 3,
  Many = 4,
  Other = 5,
}

/**
 * Context-dependant translation forms for strings.
 * Typically the standalone version is for the nominative form of the word,
 * and the format version is used for the genitive case.
 *
 * 字符串的上下文相关翻译形式。通常，独立版本用于单词的主格形式，格式化的版本则用于所有格。
 *
 * @see [CLDR website](http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles)
 *
 * [CLDR 网站](http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles)
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export enum FormStyle {
  Format,
  Standalone
}

/**
 * String widths available for translations.
 * The specific character widths are locale-specific.
 * Examples are given for the word "Sunday" in English.
 *
 * 字符串宽度可用于翻译。特定的字符宽度是特定于语言环境的。这里给出了英语中 “Sunday” 一词的示例。
 *
 * @publicApi
 */
export enum TranslationWidth {
  /**
   * 1 character for `en-US`. For example: 'S'
   *
   * 对 `en-US` 是 1 字符。比如：'S'
   *
   */
  Narrow,
  /**
   * 3 characters for `en-US`. For example: 'Sun'
   *
   * 对 `en-US` 是 3 字符。比如：'Sun'
   *
   */
  Abbreviated,
  /**
   * Full length for `en-US`. For example: "Sunday"
   *
   * 对 `en-US` 是全长。例如：“星期日”
   *
   */
  Wide,
  /**
   * 2 characters for `en-US`, For example: "Su"
   *
   * 对 `en-US` 是 2 个字符，例如：“Su”
   *
   */
  Short
}

/**
 * String widths available for date-time formats.
 * The specific character widths are locale-specific.
 * Examples are given for `en-US`.
 *
 * 可用于日期时间格式的字符串宽度。特定的字符宽度是特定于语言环境的。示例中是给 `en-US` 的示例。
 *
 * @see `getLocaleDateFormat()`
 * @see `getLocaleTimeFormat()``
 * @see `getLocaleDateTimeFormat()`
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export enum FormatWidth {
  /**
   * For `en-US`, 'M/d/yy, h:mm a'`
   * (Example: `6/15/15, 9:03 AM`)
   *
   * 对于 `en-US`，是 'M/d/yy, h:mm a'`(例如:`6/15/15, 9:03 AM`)
   *
   */
  Short,
  /**
   * For `en-US`, `'MMM d, y, h:mm:ss a'`
   * (Example: `Jun 15, 2015, 9:03:01 AM`)
   *
   * 对于 `en-US`，是 `'MMM d, y, h:mm:ss a'`（例如： `Jun 15, 2015, 9:03:01 AM` ）
   *
   */
  Medium,
  /**
   * For `en-US`, `'MMMM d, y, h:mm:ss a z'`
   * (Example: `June 15, 2015 at 9:03:01 AM GMT+1`)
   *
   * 对于 `en-US`，是 `'MMMM d, y, h:mm:ss a z'`，（例如： `June 15, 2015 at 9:03:01 AM GMT+1` ）
   *
   */
  Long,
  /**
   * For `en-US`, `'EEEE, MMMM d, y, h:mm:ss a zzzz'`
   * (Example: `Monday, June 15, 2015 at 9:03:01 AM GMT+01:00`)
   *
   * 对于 `en-US`，是 `'EEEE, MMMM d, y, h:mm:ss a zzzz'`（例如：`Monday, June 15, 2015 at 9:03:01 AM GMT+01:00` ）
   *
   */
  Full
}

/**
 * Symbols that can be used to replace placeholders in number patterns.
 * Examples are based on `en-US` values.
 *
 * 可用于替换数字模式中占位符的符号。例如基于 `en-US` 的值。
 *
 * @see `getLocaleNumberSymbol()`
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export enum NumberSymbol {
  /**
   * Decimal separator.
   * For `en-US`, the dot character.
   * Example : 2,345`.`67
   *
   * 小数点分隔符。对于 `en-US`，是点字符。例如：2,345`.`67
   *
   */
  Decimal,
  /**
   * Grouping separator, typically for thousands.
   * For `en-US`, the comma character.
   * Example: 2`,`345.67
   *
   * 分组分隔符，通常为千位。对于 `en-US`，是逗号字符。例如：2`,`345.67
   *
   */
  Group,
  /**
   * List-item separator.
   * Example: "one, two, and three"
   *
   * 列表项分隔符。例如："one, two, and three"
   *
   */
  List,
  /**
   * Sign for percentage (out of 100).
   * Example: 23.4%
   *
   * 百分号（最大为 100）。例如：23.4％
   *
   */
  PercentSign,
  /**
   * Sign for positive numbers.
   * Example: +23
   *
   * 正数的符号。例如：+23
   *
   */
  PlusSign,
  /**
   * Sign for negative numbers.
   * Example: -23
   *
   * 负数的符号。例如：-23
   *
   */
  MinusSign,
  /**
   * Computer notation for exponential value (n times a power of 10).
   * Example: 1.2E3
   *
   * 指数值的计算机表示法（10 的 n 次幂）。例如：1.2E3
   *
   */
  Exponential,
  /**
   * Human-readable format of exponential.
   * Example: 1.2x103
   *
   * 可读的指数格式。例如：1.2x103
   *
   */
  SuperscriptingExponent,
  /**
   * Sign for permille (out of 1000).
   * Example: 23.4‰
   *
   * 千分号（最大为 1000）。例如：23.4‰
   *
   */
  PerMille,
  /**
   * Infinity, can be used with plus and minus.
   * Example: ∞, +∞, -∞
   *
   * 无穷大，可与正负一起使用。例如：∞，+∞，-∞
   *
   */
  Infinity,
  /**
   * Not a number.
   * Example: NaN
   *
   * 非数字。例如：NaN
   *
   */
  NaN,
  /**
   * Symbol used between time units.
   * Example: 10:52
   *
   * 时间单位之间使用的符号。例如：10:52
   *
   */
  TimeSeparator,
  /**
   * Decimal separator for currency values (fallback to `Decimal`).
   * Example: $2,345.67
   *
   * 货币值的小数分隔符（回退为 `Decimal` ）。例如：$2,345.67
   *
   */
  CurrencyDecimal,
  /**
   * Group separator for currency values (fallback to `Group`).
   * Example: $2,345.67
   *
   * 货币值的组分隔符（回退为 `Group` ）。例如：$2,345.67
   *
   */
  CurrencyGroup
}

/**
 * The value for each day of the week, based on the `en-US` locale
 *
 * 一周中每一天的值（基于 `en-US` 语言环境）
 *
 * @publicApi
 */
export enum WeekDay {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

/**
 * Retrieves the locale ID from the currently loaded locale.
 * The loaded locale could be, for example, a global one rather than a regional one.
 *
 * 从当前已加载的语言环境中检索语言环境 ID。加载的语言环境也可能是全球语言环境，而不是区域性语言环境。
 *
 * @param locale A locale code, such as `fr-FR`.
 *
 * 语言环境代码，例如 `fr-FR` 。
 *
 * @returns The locale code. For example, `fr`.
 *
 * 语言环境代码。例如， `fr` 。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleId(locale: string): string {
  return ɵfindLocaleData(locale)[ɵLocaleDataIndex.LocaleId];
}

/**
 * Retrieves day period strings for the given locale.
 *
 * 检索给定语言环境的一天时段字符串。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param formStyle The required grammatical form.
 *
 * 所需的语法形式。
 *
 * @param width The required character width.
 *
 * 所需的字符宽度。
 *
 * @returns An array of localized period strings. For example, `[AM, PM]` for `en-US`.
 *
 * 本地化的区间字符串数组。例如，`en-US` `[AM, PM]` 。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleDayPeriods(
    locale: string, formStyle: FormStyle, width: TranslationWidth): Readonly<[string, string]> {
  const data = ɵfindLocaleData(locale);
  const amPmData = <[string, string][][]>[
    data[ɵLocaleDataIndex.DayPeriodsFormat], data[ɵLocaleDataIndex.DayPeriodsStandalone]
  ];
  const amPm = getLastDefinedValue(amPmData, formStyle);
  return getLastDefinedValue(amPm, width);
}

/**
 * Retrieves days of the week for the given locale, using the Gregorian calendar.
 *
 * 使用公历来检索给定语言环境下的星期几。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param formStyle The required grammatical form.
 *
 * 所需的语法形式。
 *
 * @param width The required character width.
 *
 * 所需的字符宽度。
 *
 * @returns An array of localized name strings.
 * For example,`[Sunday, Monday, ... Saturday]` for `en-US`.
 *
 * 本地化名称字符串的数组。例如，`en-US` `[Sunday, Monday, ... Saturday]` 。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleDayNames(
    locale: string, formStyle: FormStyle, width: TranslationWidth): ReadonlyArray<string> {
  const data = ɵfindLocaleData(locale);
  const daysData =
      <string[][][]>[data[ɵLocaleDataIndex.DaysFormat], data[ɵLocaleDataIndex.DaysStandalone]];
  const days = getLastDefinedValue(daysData, formStyle);
  return getLastDefinedValue(days, width);
}

/**
 * Retrieves months of the year for the given locale, using the Gregorian calendar.
 *
 * 使用公历来检索给定语言环境下一年中的月份。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param formStyle The required grammatical form.
 *
 * 所需的语法形式。
 *
 * @param width The required character width.
 *
 * 所需的字符宽度。
 *
 * @returns An array of localized name strings.
 * For example,  `[January, February, ...]` for `en-US`.
 *
 * 本地化名称字符串的数组，例如，对于 `en-US` 是 `[January, February, ...]`。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleMonthNames(
    locale: string, formStyle: FormStyle, width: TranslationWidth): ReadonlyArray<string> {
  const data = ɵfindLocaleData(locale);
  const monthsData =
      <string[][][]>[data[ɵLocaleDataIndex.MonthsFormat], data[ɵLocaleDataIndex.MonthsStandalone]];
  const months = getLastDefinedValue(monthsData, formStyle);
  return getLastDefinedValue(months, width);
}

/**
 * Retrieves Gregorian-calendar eras for the given locale.
 *
 * 检索给定语言环境的格里高利历日历。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param width The required character width.
 *
 * 所需的字符宽度。
 *

 * @returns An array of localized era strings.
 * For example, `[AD, BC]` for `en-US`.
 *
 * 本地化年代字符串的数组。例如，对于 `en-US`，是 `[AD, BC]`。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleEraNames(
    locale: string, width: TranslationWidth): Readonly<[string, string]> {
  const data = ɵfindLocaleData(locale);
  const erasData = <[string, string][]>data[ɵLocaleDataIndex.Eras];
  return getLastDefinedValue(erasData, width);
}

/**
 * Retrieves the first day of the week for the given locale.
 *
 * 检索给定语言环境中一周的第一天。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @returns A day index number, using the 0-based week-day index for `en-US`
 * (Sunday = 0, Monday = 1, ...).
 * For example, for `fr-FR`, returns 1 to indicate that the first day is Monday.
 *
 * 工作日索引号，使用基于 0 的 `en-US` 的工作日索引（星期日= 0，星期一= 1，...）。例如，对于 `fr-FR` ，返回 1 表示第一天是星期一。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleFirstDayOfWeek(locale: string): WeekDay {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.FirstDayOfWeek];
}

/**
 * Range of week days that are considered the week-end for the given locale.
 *
 * 在给定语言环境中被视为周末的工作日范围。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @returns The range of day values, `[startDay, endDay]`.
 *
 * 日期值的范围 `[startDay, endDay]` 。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleWeekEndRange(locale: string): [WeekDay, WeekDay] {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.WeekendRange];
}

/**
 * Retrieves a localized date-value formating string.
 *
 * 检索本地化的日期-值格式字符串。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param width The format type.
 *
 * 格式类型。
 *
 * @returns The localized formating string.
 *
 * 本地化的格式字符串。
 *
 * @see `FormatWidth`
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleDateFormat(locale: string, width: FormatWidth): string {
  const data = ɵfindLocaleData(locale);
  return getLastDefinedValue(data[ɵLocaleDataIndex.DateFormat], width);
}

/**
 * Retrieves a localized time-value formatting string.
 *
 * 检索本地化的时间值格式字符串。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param width The format type.
 *
 * 格式类型。
 *
 * @returns The localized formatting string.
 *
 * 本地化的格式字符串。
 *
 * @see `FormatWidth`
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *

 * @publicApi
 */
export function getLocaleTimeFormat(locale: string, width: FormatWidth): string {
  const data = ɵfindLocaleData(locale);
  return getLastDefinedValue(data[ɵLocaleDataIndex.TimeFormat], width);
}

/**
 * Retrieves a localized date-time formatting string.
 *
 * 检索本地化的日期时间格式字符串。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param width The format type.
 *
 * 格式类型。
 *
 * @returns The localized formatting string.
 *
 * 本地化的格式字符串。
 *
 * @see `FormatWidth`
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleDateTimeFormat(locale: string, width: FormatWidth): string {
  const data = ɵfindLocaleData(locale);
  const dateTimeFormatData = <string[]>data[ɵLocaleDataIndex.DateTimeFormat];
  return getLastDefinedValue(dateTimeFormatData, width);
}

/**
 * Retrieves a localized number symbol that can be used to replace placeholders in number formats.
 *
 * 检索本地化的数字符号，该符号可用于替换数字格式的占位符。
 *
 * @param locale The locale code.
 *
 * 语言环境代码。
 *
 * @param symbol The symbol to localize.
 *
 * 要本地化的符号。
 *
 * @returns The character for the localized symbol.
 *
 * 本地化符号的字符。
 *
 * @see `NumberSymbol`
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleNumberSymbol(locale: string, symbol: NumberSymbol): string {
  const data = ɵfindLocaleData(locale);
  const res = data[ɵLocaleDataIndex.NumberSymbols][symbol];
  if (typeof res === 'undefined') {
    if (symbol === NumberSymbol.CurrencyDecimal) {
      return data[ɵLocaleDataIndex.NumberSymbols][NumberSymbol.Decimal];
    } else if (symbol === NumberSymbol.CurrencyGroup) {
      return data[ɵLocaleDataIndex.NumberSymbols][NumberSymbol.Group];
    }
  }
  return res;
}

/**
 * Retrieves a number format for a given locale.
 *
 * 检索给定语言环境下的数字格式。
 *
 * Numbers are formatted using patterns, like `#,###.00`. For example, the pattern `#,###.00`
 * when used to format the number 12345.678 could result in "12'345,678". That would happen if the
 * grouping separator for your language is an apostrophe, and the decimal separator is a comma.
 *
 * 数字会以类似 `#,###.00` 的模式进行格式化。例如，模式 `#,###.00` 用于格式化数字 12345.678 时可能的结果是 “12'345,678”。如果你的语言的分组分隔符是撇号，而十进制分隔符是逗号，就会是这样的。
 *
 * <b>Important:</b> The characters `.` `,` `0` `#` (and others below) are special placeholders
 * that stand for the decimal separator, and so on, and are NOT real characters.
 * You must NOT "translate" the placeholders. For example, don't change `.` to `,` even though in
 * your language the decimal point is written with a comma. The symbols should be replaced by the
 * local equivalents, using the appropriate `NumberSymbol` for your language.
 *
 * *重要：*`.` `,` `0` `#`（以及以下的）字符是特殊的占位符，它们代表数字分隔符等，而不是真实的字符。你绝不能“翻译”这些占位符。例如，不要把 `.` 修改成 `,`，虽然在你的语言中小数点分隔符是写成逗号的。该符号会被其本地化等价物替换，也就是适合你的语言的 `NumberSymbol`。
 *
 * Here are the special characters used in number patterns:
 *
 * 以下是数字模式中使用的特殊字符：
 *
 * | Symbol | Meaning |
 * |--------|---------|
 * | 符号 | 含义 |
 * | . | Replaced automatically by the character used for the decimal point. |
 * | . | 自动替换为用作小数点的字符。 |
 * | , | Replaced by the "grouping" (thousands) separator. |
 * | . | 替换为（千）“分组”分隔符。 |
 * | 0 | Replaced by a digit (or zero if there aren't enough digits). |
 * | 0 | 替换为一个数字（如果没有足够的数字，则为零）。 |
 * | # | Replaced by a digit (or nothing if there aren't enough). |
 * | # | 用数字代替（如果数字不足，则不进行任何替换）。 |
 * | ¤ | Replaced by a currency symbol, such as $ or USD. |
 * | ¤ | 替换为货币符号，例如 $ 或 USD。 |
 * | % | Marks a percent format. The % symbol may change position, but must be retained. |
 * | % | 标记百分比格式。％符号可能会更改位置，但必须保留。 |
 * | E | Marks a scientific format. The E symbol may change position, but must be retained. |
 * | E | 标记科学计数法格式。 E 符号可能会改变位置，但必须保留。 |
 * | ' | Special characters used as literal characters are quoted with ASCII single quotes. |
 * | ' | 表示文本字面量的特殊字符，用 ASCII 单引号引起来。 |
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param type The type of numeric value to be formatted (such as `Decimal` or `Currency`.)
 *
 * 要格式化的数值类型（例如 `Decimal` 或 `Currency`）。
 *
 * @returns The localized format string.
 *
 * 本地化的格式字符串。
 *
 * @see `NumberFormatStyle`
 * @see [CLDR website](http://cldr.unicode.org/translation/number-patterns)
 *
 * [CLDR 官网](http://cldr.unicode.org/translation/number-patterns)
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleNumberFormat(locale: string, type: NumberFormatStyle): string {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.NumberFormats][type];
}

/**
 * Retrieves the symbol used to represent the currency for the main country
 * corresponding to a given locale. For example, '$' for `en-US`.
 *
 * 检索用于表示与给定语言环境对应的主要国家/地区的货币的符号。对于 `en-US` 为 `$`。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @returns The localized symbol character,
 * or `null` if the main country cannot be determined.
 *
 * 本地化的符号字符；如果无法确定主要国家则为 `null`。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleCurrencySymbol(locale: string): string|null {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.CurrencySymbol] || null;
}

/**
 * Retrieves the name of the currency for the main country corresponding
 * to a given locale. For example, 'US Dollar' for `en-US`.
 *
 * 检索与给定语言环境相对应的主要国家/地区的货币名称。对于 `en-US` 是 “US Dollar”。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @returns The currency name,
 * or `null` if the main country cannot be determined.
 *
 * 货币名称；如果无法确定主要国家/地区，则为 `null`。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化（i18n）指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleCurrencyName(locale: string): string|null {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.CurrencyName] || null;
}

/**
 * Retrieves the default currency code for the given locale.
 *
 * 检索给定语言环境的默认货币代码。
 *
 * The default is defined as the first currency which is still in use.
 *
 * 默认值定义为仍在使用的第一种货币。
 *
 * @param locale The code of the locale whose currency code we want.
 *
 * 我们想要获取货币代码的语言环境的代码。
 *
 * @returns The code of the default currency for the given locale.
 *
 * 给定语言环境的默认货币代码。
 *
 * @publicApi
 */
export function getLocaleCurrencyCode(locale: string): string|null {
  return ɵgetLocaleCurrencyCode(locale);
}

/**
 * Retrieves the currency values for a given locale.
 *
 * 获取给定语言环境的货币值。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 语言格式规则使用的语言环境代码。
 *
 * @returns The currency values.
 *
 * 货币值。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 */
function getLocaleCurrencies(locale: string): {[code: string]: CurrenciesSymbols} {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.Currencies];
}

/**
 * @alias core/ɵgetLocalePluralCase
 *
 * @publicApi
 */
export const getLocalePluralCase: (locale: string) => ((value: number) => Plural) =
    ɵgetLocalePluralCase;

function checkFullData(data: any) {
  if (!data[ɵLocaleDataIndex.ExtraData]) {
    throw new Error(`Missing extra locale data for the locale "${
        data[ɵLocaleDataIndex
                 .LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`);
  }
}

/**
 * Retrieves locale-specific rules used to determine which day period to use
 * when more than one period is defined for a locale.
 *
 * 检索特定于语言环境的规则，该规则用于确定在为一个语言环境中定义了多个时段时要使用的一天时段。
 *
 * There is a rule for each defined day period. The
 * first rule is applied to the first day period and so on.
 * Fall back to AM/PM when no rules are available.
 *
 * 每个预定义的一天时段都有一个规则。第一条规则适用于第一个一天时段，依此类推。如果没有可用的规则，请回退为 AM / PM。
 *
 * A rule can specify a period as time range, or as a single time value.
 *
 * 本规则可以将时间段指定为时间范围或单个时间值。
 *
 * This functionality is only available when you have loaded the full locale data.
 * See the ["I18n guide"](guide/i18n#i18n-pipes).
 *
 * 仅当你加载了完整的语言环境数据时，此功能才可用。请参阅 [“I18n 指南”](guide/i18n#i18n-pipes) 。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @returns The rules for the locale, a single time value or array of *from-time, to-time*,
 * or null if no periods are available.
 *
 * 语言环境的规则，单个时间值或 *from-time，to-time* 或 null 的数组（如果没有可用时段）。
 *
 * @see `getLocaleExtraDayPeriods()`
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleExtraDayPeriodRules(locale: string): (Time|[Time, Time])[] {
  const data = ɵfindLocaleData(locale);
  checkFullData(data);
  const rules = data[ɵLocaleDataIndex.ExtraData][ɵExtraLocaleDataIndex.ExtraDayPeriodsRules] || [];
  return rules.map((rule: string|[string, string]) => {
    if (typeof rule === 'string') {
      return extractTime(rule);
    }
    return [extractTime(rule[0]), extractTime(rule[1])];
  });
}

/**
 * Retrieves locale-specific day periods, which indicate roughly how a day is broken up
 * in different languages.
 * For example, for `en-US`, periods are morning, noon, afternoon, evening, and midnight.
 *
 * 检索特定于语言环境的一天时段，该时段大致指示如何用不同的语言分解一天。例如，对于 `en-US`，这些时段为 morning、noon、afternoon、evening 和 midnight。
 *
 * This functionality is only available when you have loaded the full locale data.
 * See the ["I18n guide"](guide/i18n#i18n-pipes).
 *
 * 仅当你加载了完整的语言环境数据时，此功能才可用。请参阅 [“I18n 指南”](guide/i18n#i18n-pipes) 。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @param formStyle The required grammatical form.
 *
 * 所需的语法形式。
 *
 * @param width The required character width.
 *
 * 所需的字符宽度。
 *
 * @returns The translated day-period strings.
 *
 * 翻译后的一天时段字符串。
 *
 * @see `getLocaleExtraDayPeriodRules()`
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getLocaleExtraDayPeriods(
    locale: string, formStyle: FormStyle, width: TranslationWidth): string[] {
  const data = ɵfindLocaleData(locale);
  checkFullData(data);
  const dayPeriodsData = <string[][][]>[
    data[ɵLocaleDataIndex.ExtraData][ɵExtraLocaleDataIndex.ExtraDayPeriodFormats],
    data[ɵLocaleDataIndex.ExtraData][ɵExtraLocaleDataIndex.ExtraDayPeriodStandalone]
  ];
  const dayPeriods = getLastDefinedValue(dayPeriodsData, formStyle) || [];
  return getLastDefinedValue(dayPeriods, width) || [];
}

/**
 * Retrieves the writing direction of a specified locale
 *
 * 检索指定语言环境的书写方向
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 用于要使用的语言环境格式规则的语言环境代码。
 *
 * @publicApi
 *
 * @returns 'rtl' or 'ltr'
 *
 * 'rtl' 或 'ltr'
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 */
export function getLocaleDirection(locale: string): 'ltr'|'rtl' {
  const data = ɵfindLocaleData(locale);
  return data[ɵLocaleDataIndex.Directionality];
}

/**
 * Retrieves the first value that is defined in an array, going backwards from an index position.
 *
 * 检索数组中定义的第一个值，从索引位置开始向后找。
 *
 * To avoid repeating the same data (as when the "format" and "standalone" forms are the same)
 * add the first value to the locale data arrays, and add other values only if they are different.
 *
 * 为避免重复相同的数据（比如当 "format" 和 "standalone" 的格式相同时），将第一个值添加到语言环境数据数组，并仅在它们不同时添加其他值。
 *
 * @param data The data array to retrieve from.
 *
 * 要检索的数据数组。
 *
 * @param index A 0-based index into the array to start from.
 *
 * 从 0 开始的数组索引。
 *
 * @returns The value immediately before the given index position.
 *
 * 给定索引位置之前的值。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
function getLastDefinedValue<T>(data: T[], index: number): T {
  for (let i = index; i > -1; i--) {
    if (typeof data[i] !== 'undefined') {
      return data[i];
    }
  }
  throw new Error('Locale data API: locale data undefined');
}

/**
 * Represents a time value with hours and minutes.
 *
 * 用小时和分钟表示的时间值。
 *
 * @publicApi
 */
export type Time = {
  hours: number,
  minutes: number
};

/**
 * Extracts the hours and minutes from a string like "15:45"
 */
function extractTime(time: string): Time {
  const [h, m] = time.split(':');
  return {hours: +h, minutes: +m};
}



/**
 * Retrieves the currency symbol for a given currency code.
 *
 * 检索给定货币代码的货币符号。
 *
 * For example, for the default `en-US` locale, the code `USD` can
 * be represented by the narrow symbol `$` or the wide symbol `US$`.
 *
 * 例如，对于默认 `en-US` 语言环境，代码 `USD` 可以由窄符号 `$` 或宽符号 `US$` 表示。
 *
 * @param code The currency code.
 *
 * 货币代码。
 *
 * @param format The format, `wide` or `narrow`.
 *
 * 格式，如 `wide` 或 `narrow` 。
 *
 * @param locale A locale code for the locale format rules to use.
 *
 * 要用作语言环境格式规则的语言环境代码。
 *
 * @returns The symbol, or the currency code if no symbol is available.
 *
 * 符号，或货币代码（如果没有可用的符号）。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getCurrencySymbol(code: string, format: 'wide'|'narrow', locale = 'en'): string {
  const currency = getLocaleCurrencies(locale)[code] || CURRENCIES_EN[code] || [];
  const symbolNarrow = currency[ɵCurrencyIndex.SymbolNarrow];

  if (format === 'narrow' && typeof symbolNarrow === 'string') {
    return symbolNarrow;
  }

  return currency[ɵCurrencyIndex.Symbol] || code;
}

// Most currencies have cents, that's why the default is 2
const DEFAULT_NB_OF_CURRENCY_DIGITS = 2;

/**
 * Reports the number of decimal digits for a given currency.
 * The value depends upon the presence of cents in that particular currency.
 *
 * 报告给定货币的小数位数。其值取决于该特定货币中分币是否存在。
 *
 * @param code The currency code.
 *
 * 货币代码。
 *
 * @returns The number of decimal digits, typically 0 or 2.
 *
 * 小数位数，通常为 0 或 2。
 *
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 *
 * [国际化(i18n)指南](guide/i18n)
 *
 * @publicApi
 */
export function getNumberOfCurrencyDigits(code: string): number {
  let digits;
  const currency = CURRENCIES_EN[code];
  if (currency) {
    digits = currency[ɵCurrencyIndex.NbOfDigits];
  }
  return typeof digits === 'number' ? digits : DEFAULT_NB_OF_CURRENCY_DIGITS;
}
