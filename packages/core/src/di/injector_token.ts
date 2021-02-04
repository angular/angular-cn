/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from './injection_token';
import {Injector} from './injector';
import {InjectorMarkers} from './injector_marker';



/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * 一个 InjectionToken，用于获取当前 `Injector` 的 `createInjector()` 式的注入器。
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * 请求此令牌而不是 `Injector` 可使 `StaticInjector` 能在项目中摇树优化掉。
 *
 * @publicApi
 */
export const INJECTOR = new InjectionToken<Injector>(
    'INJECTOR',
    // Dissable tslint because this is const enum which gets inlined not top level prop access.
    // tslint:disable-next-line: no-toplevel-property-access
    InjectorMarkers.Injector as any,  // Special value used by Ivy to identify `Injector`.
);
