/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable, InjectionToken, Optional} from './di';
import {isPromise} from './util/lang';
import {noop} from './util/noop';


/**
 * A [DI token](guide/glossary#di-token "DI token definition") that you can use to provide
 * one or more initialization functions.
 *
 * 可用于提供一个或多个初始化功能的 [DI 令牌。](guide/glossary#di-token "DI 令牌定义")
 *
 * The provided functions are injected at application startup and executed during
 * app initialization. If any of these functions returns a Promise, initialization
 * does not complete until the Promise is resolved.
 *
 * 所提供的函数是在应用程序启动时注入的，并在应用程序初始化期间执行。如果这些函数中的任何一个返回 Promise，则直到 Promise 被解析之前，初始化都不会完成。
 *
 * You can, for example, create a factory function that loads language data
 * or an external configuration, and provide that function to the `APP_INITIALIZER` token.
 * The function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * 例如，你可以创建一个工厂函数来加载语言数据或外部配置，并将该函数提供给 `APP_INITIALIZER` 令牌。该功能在应用程序引导过程中执行，并且所需的数据在启动时可用。
 *
 * @see `ApplicationInitStatus`
 *
 * @publicApi
 */
export const APP_INITIALIZER = new InjectionToken<Array<() => void>>('Application Initializer');

/**
 * A class that reflects the state of running {@link APP_INITIALIZER} functions.
 *
 * 反映正在运行的 {@link APP_INITIALIZER} 函数状态的类。
 *
 * @publicApi
 */
@Injectable()
export class ApplicationInitStatus {
  private resolve = noop;
  private reject = noop;
  private initialized = false;
  public readonly donePromise: Promise<any>;
  public readonly done = false;

  constructor(@Inject(APP_INITIALIZER) @Optional() private appInits: (() => any)[]) {
    this.donePromise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }

  /** @internal */
  runInitializers() {
    if (this.initialized) {
      return;
    }

    const asyncInitPromises: Promise<any>[] = [];

    const complete = () => {
      (this as {done: boolean}).done = true;
      this.resolve();
    };

    if (this.appInits) {
      for (let i = 0; i < this.appInits.length; i++) {
        const initResult = this.appInits[i]();
        if (isPromise(initResult)) {
          asyncInitPromises.push(initResult);
        }
      }
    }

    Promise.all(asyncInitPromises)
        .then(() => {
          complete();
        })
        .catch(e => {
          this.reject(e);
        });

    if (asyncInitPromises.length === 0) {
      complete();
    }
    this.initialized = true;
  }
}
