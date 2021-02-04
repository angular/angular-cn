/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * This file is used to control if the default rendering pipeline should be `ViewEngine` or `Ivy`.
 *
 * For more information on how to run and debug tests with either Ivy or View Engine (legacy),
 * please see [BAZEL.md](./docs/BAZEL.md).
 */

let _devMode: boolean = true;
let _runModeLocked: boolean = false;


/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * 返回 Angular 是否处于开发模式。调用一次后，该值将被锁定，并且将不再更改。
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * 默认情况下，这是正确的，除非用户在调用它之前调用 `enableProdMode`
 *
 * @publicApi
 */
export function isDevMode(): boolean {
  _runModeLocked = true;
  return _devMode;
}

/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * 禁用 Angular 的开发模式，该模式将关闭框架中的断言和其他检查。
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * 一个重要的断言，它禁用了对变更检测不会导致对任何绑定的（也称为单向数据流）额外更改的验证。
 *
 * @publicApi
 */
export function enableProdMode(): void {
  if (_runModeLocked) {
    throw new Error('Cannot enable prod mode after platform setup.');
  }
  _devMode = false;
}
