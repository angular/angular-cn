/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
 * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
 * handled.
 *
 * SecurityContext 标记了具有危险安全隐患的位置，例如，像 `innerHTML` 这样的 DOM 属性，如果处理不当，可能会导致跨站点脚本（XSS）安全错误。
 *
 * See DomSanitizer for more details on security in Angular applications.
 *
 * 有关 Angular 应用程序中安全性的更多详细信息，请参见 DomSanitizer。
 *
 * @publicApi
 */
export enum SecurityContext {
  NONE = 0,
  HTML = 1,
  STYLE = 2,
  SCRIPT = 3,
  URL = 4,
  RESOURCE_URL = 5,
}
