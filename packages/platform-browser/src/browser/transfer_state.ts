/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT} from '@angular/common';
import {APP_ID, Injectable, NgModule} from '@angular/core';

export function escapeHtml(text: string): string {
  const escapedText: {[k: string]: string} = {
    '&': '&a;',
    '"': '&q;',
    '\'': '&s;',
    '<': '&l;',
    '>': '&g;',
  };
  return text.replace(/[&"'<>]/g, s => escapedText[s]);
}

export function unescapeHtml(text: string): string {
  const unescapedText: {[k: string]: string} = {
    '&a;': '&',
    '&q;': '"',
    '&s;': '\'',
    '&l;': '<',
    '&g;': '>',
  };
  return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}

/**
 * A type-safe key to use with `TransferState`.
 *
 * 与 `TransferState` 一起使用的类型安全的键名。
 *
 * Example:
 *
 * 例如：
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export type StateKey<T> = string&{__not_a_string: never};

/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * 创建一个 `StateKey<T>`，可用于把 T 类型的值存储在 `TransferState` 中。
 *
 * Example:
 *
 * 例如：
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export function makeStateKey<T = void>(key: string): StateKey<T> {
  return key as StateKey<T>;
}

/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * 从服务器端的应用程序传到客户端的应用程序的键值存储。
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * `TransferState` 将作为可注入令牌提供。要使用它，请在服务器上导入 `ServerTransferStateModule`，并在客户端上导入 `BrowserTransferStateModule`。
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialzied in a
 * non-lossy manner.
 *
 * 这里会使用 JSON.stringify/JSON.parse 对存储中的值进行序列化/反序列化。因此，仅布尔、数字、字符串、null 和非类对象能以无损的方式进行序列化和反序列化。
 *
 * @publicApi
 */
@Injectable()
export class TransferState {
  private store: {[k: string]: {}|undefined} = {};
  private onSerializeCallbacks: {[k: string]: () => {} | undefined} = {};

  /** @internal */
  static init(initState: {}) {
    const transferState = new TransferState();
    transferState.store = initState;
    return transferState;
  }

  /**
   * Get the value corresponding to a key. Return `defaultValue` if key is not found.
   *
   * 获取与键名对应的值。如果找不到键名，则返回 `defaultValue`。
   *
   */
  get<T>(key: StateKey<T>, defaultValue: T): T {
    return this.store[key] !== undefined ? this.store[key] as T : defaultValue;
  }

  /**
   * Set the value corresponding to a key.
   *
   * 设置与键名对应的值。
   *
   */
  set<T>(key: StateKey<T>, value: T): void {
    this.store[key] = value;
  }

  /**
   * Remove a key from the store.
   *
   * 从商店中取出键名。
   *
   */
  remove<T>(key: StateKey<T>): void {
    delete this.store[key];
  }

  /**
   * Test whether a key exists in the store.
   *
   * 测试存储中是否存在键名。
   *
   */
  hasKey<T>(key: StateKey<T>) {
    return this.store.hasOwnProperty(key);
  }

  /**
   * Register a callback to provide the value for a key when `toJson` is called.
   *
   * 注册一个回调，以在调用 `toJson` 时为指定的键名提供一个值。
   *
   */
  onSerialize<T>(key: StateKey<T>, callback: () => T): void {
    this.onSerializeCallbacks[key] = callback;
  }

  /**
   * Serialize the current state of the store to JSON.
   *
   * 将存储的当前状态序列化为 JSON。
   *
   */
  toJson(): string {
    // Call the onSerialize callbacks and put those values into the store.
    for (const key in this.onSerializeCallbacks) {
      if (this.onSerializeCallbacks.hasOwnProperty(key)) {
        try {
          this.store[key] = this.onSerializeCallbacks[key]();
        } catch (e) {
          console.warn('Exception in onSerialize callback: ', e);
        }
      }
    }
    return JSON.stringify(this.store);
  }
}

export function initTransferState(doc: Document, appId: string) {
  // Locate the script tag with the JSON data transferred from the server.
  // The id of the script tag is set to the Angular appId + 'state'.
  const script = doc.getElementById(appId + '-state');
  let initialState = {};
  if (script && script.textContent) {
    try {
      initialState = JSON.parse(unescapeHtml(script.textContent));
    } catch (e) {
      console.warn('Exception while restoring TransferState for app ' + appId, e);
    }
  }
  return TransferState.init(initialState);
}

/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * 要安装在客户端的 NgModule，它同时会使用 `TransferState` 将状态从服务器传输到客户端。
 *
 * @publicApi
 */
@NgModule({
  providers: [{provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID]}],
})
export class BrowserTransferStateModule {
}
