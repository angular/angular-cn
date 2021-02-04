/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ComponentRef} from '@angular/core';
import {exportNgVar} from '../../dom/util';
import {AngularProfiler} from './common_tools';

const PROFILER_GLOBAL_NAME = 'profiler';

/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * 可通过浏览器的开发者控制台访问的已启用 Angular 调试工具。
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 *
 *    打开开发人员控制台（例如，Chrome 中是 Ctrl + Shift + j）
 *
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 *
 *    输入 `ng.`（通常，控制台会显示自动完成建议）
 *
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 *    试用变更检测剖析器 `ng.profiler.timeChangeDetection()` 然后按 Enter。。
 *
 * @publicApi
 */
export function enableDebugTools<T>(ref: ComponentRef<T>): ComponentRef<T> {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}

/**
 * Disables Angular tools.
 *
 * 禁用 Angular 工具。
 *
 * @publicApi
 */
export function disableDebugTools(): void {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}
