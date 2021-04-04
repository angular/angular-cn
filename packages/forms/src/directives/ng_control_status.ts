/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, Optional, Self} from '@angular/core';

import {AbstractControlDirective} from './abstract_control_directive';
import {ControlContainer} from './control_container';
import {NgControl} from './ng_control';

type AnyControlStatus = 'untouched'|'touched'|'pristine'|'dirty'|'valid'|'invalid'|'pending';

export class AbstractControlStatus {
  private _cd: AbstractControlDirective|null;

  constructor(cd: AbstractControlDirective|null) {
    this._cd = cd;
  }

  is(status: AnyControlStatus): boolean {
    return !!this._cd?.control?.[status];
  }
}

export const ngControlStatusHost = {
  '[class.ng-untouched]': 'is("untouched")',
  '[class.ng-touched]': 'is("touched")',
  '[class.ng-pristine]': 'is("pristine")',
  '[class.ng-dirty]': 'is("dirty")',
  '[class.ng-valid]': 'is("valid")',
  '[class.ng-invalid]': 'is("invalid")',
  '[class.ng-pending]': 'is("pending")',
};

/**
 * @description
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status.
 *
 * 指令自动应用于 Angular 表单控件，该控件会根据控件状态设置 CSS 类。
 *
 * @usageNotes
 *
 * ### CSS classes applied
 *
 * ### 应用的 CSS 类
 *
 * The following classes are applied as the properties become true:
 *
 * 当这些属性变为 true 时，将应用以下类：
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost})
export class NgControlStatus extends AbstractControlStatus {
  constructor(@Self() cd: NgControl) {
    super(cd);
  }
}

/**
 * @description
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc).
 *
 * 该指令自动应用于 Angular 表单组，基于控件的状态（有效、无效、脏等）设置 CSS 类。
 *
 * @see `NgControlStatus`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
@Directive({
  selector:
      '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
  host: ngControlStatusHost
})
export class NgControlStatusGroup extends AbstractControlStatus {
  constructor(@Optional() @Self() cd: ControlContainer) {
    super(cd);
  }
}
