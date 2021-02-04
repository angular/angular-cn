/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive} from '@angular/core';

/**
 * @description
 *
 * Adds `novalidate` attribute to all forms by default.
 *
 * 默认情况下，会把 `novalidate` 属性添加到所有表单上。
 *
 * `novalidate` is used to disable browser's native form validation.
 *
 * `novalidate` 用于禁用浏览器的原生表单验证。
 *
 * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
 *
 * 如果要对 Angular 表单使用原生验证，只需添加 `ngNativeValidate` 属性：
 *
 * ```
 * <form ngNativeValidate></form>
 * ```
 *
 * @publicApi
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 */
@Directive({
  selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
  host: {'novalidate': ''},
})
export class ɵNgNoValidate {
}

export {ɵNgNoValidate as NgNoValidate};
