/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';

import {serializeDocument} from './domino_adapter';

/**
 * Representation of the current platform state.
 *
 * 当前平台状态的表示形式。
 *
 * @publicApi
 */
@Injectable()
export class PlatformState {
  constructor(@Inject(DOCUMENT) private _doc: any) {}

  /**
   * Renders the current state of the platform to string.
   *
   * 将平台的当前状态渲染为字符串。
   *
   */
  renderToString(): string {
    return serializeDocument(this._doc);
  }

  /**
   * Returns the current DOM state.
   *
   * 返回当前的 DOM 状态。
   *
   */
  getDocument(): any {
    return this._doc;
  }
}
