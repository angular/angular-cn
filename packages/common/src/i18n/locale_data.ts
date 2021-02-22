/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵregisterLocaleData} from '@angular/core';

/**
 * Register global data to be used internally by Angular. See the
 * ["I18n guide"](guide/i18n#i18n-pipes) to know how to import additional locale data.
 *
 * 注册全局数据以供 Angular 内部使用。请参阅 [“I18n 指南”](guide/i18n#i18n-pipes)以了解如何导入其他语言环境的数据。
 *
 * The signature registerLocaleData(data: any, extraData?: any) is deprecated since v5.1
 *
 * 从 v5.1 开始不推荐使用 registerLocaleData（data：any，extraData ?: any）签名
 *
 * @publicApi
 */
export function registerLocaleData(data: any, localeId?: string|any, extraData?: any): void {
  return ɵregisterLocaleData(data, localeId, extraData);
}
