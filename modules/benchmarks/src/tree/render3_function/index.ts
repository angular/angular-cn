/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵrenderComponent as renderComponent} from '@angular/core';
import {bindAction, profile} from '../../util';
import {TreeFunction, createDom, destroyDom, detectChanges} from '../render3/tree';

function noop() {}

export function main() {
  let component: TreeFunction;
  if (typeof window !== 'undefined') {
    component = renderComponent(TreeFunction);
    bindAction('#createDom', () => createDom(component));
    bindAction('#destroyDom', () => destroyDom(component));
    bindAction('#detectChanges', () => detectChanges(component));
    bindAction(
        '#detectChangesProfile', profile(() => detectChanges(component), noop, 'detectChanges'));
    bindAction('#updateDomProfile', profile(() => createDom(component), noop, 'update'));
    bindAction(
        '#createDomProfile',
        profile(() => createDom(component), () => destroyDom(component), 'create'));
  }
}
