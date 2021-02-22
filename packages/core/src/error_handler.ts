/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {getDebugContext, getErrorLogger, getOriginalError} from './errors';



/**
 * Provides a hook for centralized exception handling.
 *
 * 提供用于集中式异常处理的挂钩。
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * `ErrorHandler` 的默认实现将错误消息打印到 `console`。要拦截错误处理，请编写一个自定义的异常处理器，该异常处理器将把此默认行为改成你应用所需的。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * @publicApi
 */
export class ErrorHandler {
  /**
   * @internal
   */
  _console: Console = console;

  handleError(error: any): void {
    const originalError = this._findOriginalError(error);
    const context = this._findContext(error);
    // Note: Browser consoles show the place from where console.error was called.
    // We can use this to give users additional information about the error.
    const errorLogger = getErrorLogger(error);

    errorLogger(this._console, `ERROR`, error);
    if (originalError) {
      errorLogger(this._console, `ORIGINAL ERROR`, originalError);
    }
    if (context) {
      errorLogger(this._console, 'ERROR CONTEXT', context);
    }
  }

  /** @internal */
  _findContext(error: any): any {
    if (error) {
      return getDebugContext(error) ? getDebugContext(error) :
                                      this._findContext(getOriginalError(error));
    }

    return null;
  }

  /** @internal */
  _findOriginalError(error: Error): any {
    let e = getOriginalError(error);
    while (e && getOriginalError(e)) {
      e = getOriginalError(e);
    }

    return e;
  }
}
