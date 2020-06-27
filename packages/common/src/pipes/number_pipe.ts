/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DEFAULT_CURRENCY_CODE, Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {formatCurrency, formatNumber, formatPercent} from '../i18n/format_number';
import {getCurrencySymbol} from '../i18n/locale_data_api';

import {invalidPipeArgumentError} from './invalid_pipe_argument_error';


/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number into a string,
 * formatted according to locale rules that determine group sizing and
 * separator, decimal-point character, and other locale-specific
 * configurations.
 *
 * 把数字转换成字符串，
 * 根据本地化规则进行格式化，这些规则会决定分组大小和分组分隔符、小数点字符以及其它与本地化环境有关的配置项。
 *
 * If no parameters are specified, the function rounds off to the nearest value using this
 * [rounding method](https://en.wikibooks.org/wiki/Arithmetic/Rounding).
 * The behavior differs from that of the JavaScript ```Math.round()``` function.
 * In the following case for example, the pipe rounds down where
 * ```Math.round()``` rounds up:
 *
 * 如果没有指定参数，则该函数会使用这个[舍入方法](https://en.wikibooks.org/wiki/Arithmetic/Rounding)。
 * 但其行为与 JavaScript 的 ```Math.round()``` 函数不同。
 * 下面的例子展示了管道与 ```Math.round()``` 的对比：
 *
 * ```html
 * -2.5 | number:'1.0-0'
 * > -3
 * Math.round(-2.5)
 * > -2
 * ```
 *
 * @see `formatNumber()`
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * 下列代码展示了该管道如何根据多种格式规范来把数字转换成字符串，这里使用的默认语言环境是 `en-US`。
 *
 * ### Example
 *
 * ### 例子
 *
 * <code-example path="common/pipes/ts/number_pipe.ts" region='NumberPipe'></code-example>
 *
 * @publicApi
 */
@Pipe({name: 'number'})
export class DecimalPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {}

  /**
   * @param value The number to be formatted.
   *
   * 要格式化的数字。
   *
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *
   * 数字展现的选项，通过如下格式的字符串指定：<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>。
   *
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *
   *     `minIntegerDigits`：在小数点前的最小位数。默认为 `1`。
   *
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `0`.
   *
   *     `minFractionDigits`：小数点后的最小位数。默认为 `0`。
   *
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `3`.
   *
   *     `maxFractionDigits`：小数点后的最大为数，默认为 `3`。
   *
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
   *
   * 要使用的本地化格式代码。
   * 如果未提供，则使用 `LOCALE_ID` 的值，默认为 `en-US`。
   * 参见[为你的应用设置地区（locale）](guide/i18n#setting-up-the-locale-of-your-app)。
   */
  transform(value: any, digitsInfo?: string, locale?: string): string|null {
    if (isEmpty(value)) return null;

    locale = locale || this._locale;

    try {
      const num = strToNumber(value);
      return formatNumber(num, locale, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(DecimalPipe, error.message);
    }
  }
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a percentage
 * string, formatted according to locale rules that determine group sizing and
 * separator, decimal-point character, and other locale-specific
 * configurations.
 *
 * 把数字转换成百分比字符串，
 * 根据本地化规则进行格式化，这些规则会决定分组大小和分组分隔符、小数点字符以及其它与本地化环境有关的配置项。
 *
 * @see `formatPercent()`
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * 下列代码展示了该管道如何根据多种格式规范把数字转换成文本字符串，
 * 这里使用的默认语言环境是 `en-US`。
 *
 * <code-example path="common/pipes/ts/percent_pipe.ts" region='PercentPipe'></code-example>
 *
 * @publicApi
 */
@Pipe({name: 'percent'})
export class PercentPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {}

  /**
   *
   * @param value The number to be formatted as a percentage.
   *
   * 要格式化为百分比的数字。
   *
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *
   * 数字展现的选项，通过如下格式的字符串指定：<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>。
   *
   *
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *
   *     `minIntegerDigits`：在小数点前的最小位数。默认为 `1`。
   *
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `0`.
   *
   *     `minFractionDigits`：小数点后的最小位数。默认为 `0`。
   *
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `0`.
   *
   *     `maxFractionDigits`：小数点后的最大为数，默认为 `3`。
   *
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
   *
   * 要使用的本地化格式代码。
   * 如果未提供，则使用 `LOCALE_ID` 的值，默认为 `en-US`。
   * 参见[为你的应用设置地区（locale）](guide/i18n#setting-up-the-locale-of-your-app)。
   */
  transform(value: any, digitsInfo?: string, locale?: string): string|null {
    if (isEmpty(value)) return null;
    locale = locale || this._locale;
    try {
      const num = strToNumber(value);
      return formatPercent(num, locale, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(PercentPipe, error.message);
    }
  }
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a currency string, formatted according to locale rules
 * that determine group sizing and separator, decimal-point character,
 * and other locale-specific configurations.
 *
 * 把数字转换成金额字符串，
 * 根据本地化规则进行格式化，这些规则会决定分组大小和分组分隔符、小数点字符以及其它与本地化环境有关的配置项。
 *
 * {@a currency-code-deprecation}
 * <div class="alert is-helpful">
 *
 * **Deprecation notice:**
 *
 * The default currency code is currently always `USD` but this is deprecated from v9.
 *
 * **In v11 the default currency code will be taken from the current locale identified by
 * the `LOCAL_ID` token. See the [i18n guide](guide/i18n#setting-up-the-locale-of-your-app) for
 * more information.**
 *
 * If you need the previous behavior then set it by creating a `DEFAULT_CURRENCY_CODE` provider in
 * your application `NgModule`:
 *
 * ```ts
 * {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
 * ```
 *
 * </div>
 *
 * @see `getCurrencySymbol()`
 * @see `formatCurrency()`
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * 下列代码展示了该管道如何根据多种格式规范把数字转换成文本字符串，
 * 这里使用的默认语言环境是 `en-US`。
 *
 * <code-example path="common/pipes/ts/currency_pipe.ts" region='CurrencyPipe'></code-example>
 *
 * @publicApi
 */
@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {
  constructor(
      @Inject(LOCALE_ID) private _locale: string,
      @Inject(DEFAULT_CURRENCY_CODE) private _defaultCurrencyCode: string = 'USD') {}

  /**
   *
   * @param value The number to be formatted as currency.
   *
   * 要格式化为货币的数字。
   *
   * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code,
   * such as `USD` for the US dollar and `EUR` for the euro. The default currency code can be
   * configured using the `DEFAULT_CURRENCY_CODE` injection token.
   *
   * [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 中的货币代码，比如 `USD` 表示美元，`EUR` 表示欧元。可以用 `DEFAULT_CURRENCY_CODE` 这个注入令牌来配置默认货币代码。
   *
   * @param display The format for the currency indicator. One of the following:
   *
   * 货币指示器的格式，有效值包括：
   *
   *   - `code`: Show the code (such as `USD`).
   *
   *     `code`: 展示货币代码（如 `USD`）。
   *
   *   - `symbol`(default): Show the symbol (such as `$`).
   *
   *     `symbol`(default): 展示货币符号（如 `$`）
   *
   *   - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their
   * currency.
   * For example, the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow `$`. If the
   * locale has no narrow symbol, uses the standard symbol for the locale.
   *
   *     `symbol-narrow`: 使用区域的窄化符号，它包括两个符号。
   *     比如，加拿大元的符号是 `CA$`，而其窄化符号是 `$`。如果该区域没有窄化符号，则使用它的标准符号。
   *
   *   - String: Use the given string value instead of a code or a symbol.
   * For example, an empty string will suppress the currency & symbol.
   *
   *     String: 使用指定的字符串值代替货币代码或符号。
   *     比如，空字符串将会去掉货币代码或符号。
   *
   *   - Boolean (marked deprecated in v5): `true` for symbol and false for `code`.
   *
   *     Boolean（从 v5 开始已弃用）：`true` 表示货币符号，`false` 表示货币代码。
   *
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *
   * 数字展现的选项，通过如下格式的字符串指定：<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>。
   *
   *
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *
   *     `minIntegerDigits`：在小数点前的最小位数。默认为 `1`。
   *
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `2`.
   *
   *     `minFractionDigits`：小数点后的最小位数。默认为 `0`。
   *
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `2`.
   * If not provided, the number will be formatted with the proper amount of digits,
   * depending on what the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) specifies.
   * For example, the Canadian dollar has 2 digits, whereas the Chilean peso has none.
   *
   *     `maxFractionDigits`：小数点后的最大为数，默认为 `3`。
   *     如果没有提供，该数字就会根据 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 规范进行适当的格式化。
   *     比如，加拿大元具有 2 位数字，而智利比索则没有。
   *
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
   *
   * 要使用的本地化格式代码。
   * 如果未提供，则使用 `LOCALE_ID` 的值，默认为 `en-US`。
   * 参见[为你的应用设置地区（locale）](guide/i18n#setting-up-the-locale-of-your-app)。
   */
  transform(
      value: any, currencyCode?: string,
      display: 'code'|'symbol'|'symbol-narrow'|string|boolean = 'symbol', digitsInfo?: string,
      locale?: string): string|null {
    if (isEmpty(value)) return null;

    locale = locale || this._locale;

    if (typeof display === 'boolean') {
      if (<any>console && <any>console.warn) {
        console.warn(
            `Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".`);
      }
      display = display ? 'symbol' : 'code';
    }

    let currency: string = currencyCode || this._defaultCurrencyCode;
    if (display !== 'code') {
      if (display === 'symbol' || display === 'symbol-narrow') {
        currency = getCurrencySymbol(currency, display === 'symbol' ? 'wide' : 'narrow', locale);
      } else {
        currency = display;
      }
    }

    try {
      const num = strToNumber(value);
      return formatCurrency(num, locale, currency, currencyCode, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(CurrencyPipe, error.message);
    }
  }
}

function isEmpty(value: any): boolean {
  return value == null || value === '' || value !== value;
}

/**
 * Transforms a string into a number (if needed).
 *
 * 把字符串转换成数字（如果需要）。
 */
function strToNumber(value: number|string): number {
  // Convert strings to numbers
  if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
    return Number(value);
  }
  if (typeof value !== 'number') {
    throw new Error(`${value} is not a number`);
  }
  return value;
}
