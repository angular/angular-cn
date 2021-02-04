/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {stringify} from '../util/stringify';
import {resolveForwardRef} from './forward_ref';


/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * 用于从 {@link ReflectiveInjector} 中检索项目的唯一对象。
 *
 * Keys have:
 *
 * 其键名有：
 *
 * - a system-wide unique `id`.
 *
 *   系统范围内的唯一 `id` 。
 *
 * - a `token`.
 *
 *   `token`。
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` 由 {@link ReflectiveInjector} 内部使用，因为它在系统范围内的唯一 `id` 允许注入器以更有效的方式存储所创建的对象。
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 *
 * `Key` 不应直接创建。{@link ReflectiveInjector} 在解析提供者时会自动创建键名。
 *
 * @deprecated No replacement
 *
 * 无替代品
 *
 * @publicApi
 */
export class ReflectiveKey {
  public readonly displayName: string;
  /**
   * Private
   *
   * 私人的
   *
   */
  constructor(public token: Object, public id: number) {
    if (!token) {
      throw new Error('Token must be defined!');
    }
    this.displayName = stringify(this.token);
  }

  /**
   * Retrieves a `Key` for a token.
   *
   * 根据令牌检索出一个 `Key`。
   *
   */
  static get(token: Object): ReflectiveKey {
    return _globalKeyRegistry.get(resolveForwardRef(token));
  }

  /**
   * @returns the number of keys registered in the system.
   *
   * 在系统中注册的 `Key` 数。
   *
   */
  static get numberOfKeys(): number {
    return _globalKeyRegistry.numberOfKeys;
  }
}

export class KeyRegistry {
  private _allKeys = new Map<Object, ReflectiveKey>();

  get(token: Object): ReflectiveKey {
    if (token instanceof ReflectiveKey) return token;

    if (this._allKeys.has(token)) {
      return this._allKeys.get(token)!;
    }

    const newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
    this._allKeys.set(token, newKey);
    return newKey;
  }

  get numberOfKeys(): number {
    return this._allKeys.size;
  }
}

const _globalKeyRegistry = new KeyRegistry();
