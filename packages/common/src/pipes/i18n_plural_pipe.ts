/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Pipe, PipeTransform} from '@angular/core';

import {getPluralCategory, NgLocalization} from '../i18n/localization';

import {invalidPipeArgumentError} from './invalid_pipe_argument_error';

const _INTERPOLATION_REGEXP: RegExp = /#/g;

/**
 * @ngModule CommonModule
 * @description
 *
 * Maps a value to a string that pluralizes the value according to locale rules.
 *
 * 将值映射到根据语言环境规则对该值进行复数化的字符串。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * {@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}
 *
 * @publicApi
 */
@Pipe({name: 'i18nPlural', pure: true})
export class I18nPluralPipe implements PipeTransform {
  constructor(private _localization: NgLocalization) {}

  /**
   * @param value the number to be formatted
   *
   * 要格式化的数字
   *
   * @param pluralMap an object that mimics the ICU format, see
   * http://userguide.icu-project.org/formatparse/messages.
   *
   * 模仿 ICU 格式的对象，请参见<http://userguide.icu-project.org/formatparse/messages> 。
   *
   * @param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
   * default).
   *
   * 定义要使用的语言环境的 `string`（默认情况下使用当前的 {@link LOCALE_ID}）。
   */
  transform(value: number|null|undefined, pluralMap: {[count: string]: string}, locale?: string):
      string {
    if (value == null) return '';

    if (typeof pluralMap !== 'object' || pluralMap === null) {
      throw invalidPipeArgumentError(I18nPluralPipe, pluralMap);
    }

    const key = getPluralCategory(value, Object.keys(pluralMap), this._localization, locale);

    return pluralMap[key].replace(_INTERPOLATION_REGEXP, value.toString());
  }
}
