/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, OnDestroy, OnInit} from '@angular/core';

import {FormGroup} from '../model';

import {ControlContainer} from './control_container';
import {Form} from './form_interface';
import {controlPath} from './shared';



/**
 * @description
 * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
 *
 * `NgModelGroup` 和 `FormGroupName` 指令之间共享代码的基类。
 *
 * @publicApi
 */
@Directive()
export class AbstractFormGroupDirective extends ControlContainer implements OnInit, OnDestroy {
  /**
   * @description
   * The parent control for the group
   *
   * 该组的父控件
   *
   * @internal
   */
  // TODO(issue/24571): remove '!'.
  _parent!: ControlContainer;

  /** @nodoc */
  ngOnInit(): void {
    this._checkParentType();
    // Register the group with its parent group.
    this.formDirective!.addFormGroup(this);
  }

  /** @nodoc */
  ngOnDestroy(): void {
    if (this.formDirective) {
      // Remove the group from its parent group.
      this.formDirective.removeFormGroup(this);
    }
  }

  /**
   * @description
   * The `FormGroup` bound to this directive.
   *
   * 绑定到此指令的 `FormGroup`。
   *
   */
  get control(): FormGroup {
    return this.formDirective!.getFormGroup(this);
  }

  /**
   * @description
   * The path to this group from the top-level directive.
   *
   * 从顶级指令到该组的路径。
   *
   */
  get path(): string[] {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }

  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   *
   * 该组的顶级指令（如果存在），否则为 null。
   *
   */
  get formDirective(): Form|null {
    return this._parent ? this._parent.formDirective : null;
  }

  /** @internal */
  _checkParentType(): void {}
}
