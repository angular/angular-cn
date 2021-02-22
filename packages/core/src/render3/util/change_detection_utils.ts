/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {detectChanges, markDirty} from '../instructions/change_detection';
import {getRootComponents} from './discovery_utils';

/**
 * Marks a component for check (in case of OnPush components) and synchronously
 * performs change detection on the application this component belongs to.
 *
 * 把一个组件标记为需要检查（OnPush 组件中），并且在本组件所属的应用中同步执行执行变更检测。
 *
 * @param component Component to {@link ChangeDetectorRef#markForCheck mark for check}.
 *
 * 要 {@link ChangeDetectorRef#markForCheck 标记为需要检查}的组件。
 *
 * @publicApi
 * @globalApi ng
 */
export function applyChanges(component: {}): void {
  markDirty(component);
  getRootComponents(component).forEach(rootComponent => detectChanges(rootComponent));
}
