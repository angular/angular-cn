/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Optional, SkipSelf, StaticProvider, ɵɵdefineInjectable} from '../../di';
import {DefaultKeyValueDifferFactory} from './default_keyvalue_differ';


/**
 * A differ that tracks changes made to an object over time.
 *
 * 跟踪对象随时间变化的差异。
 *
 * @publicApi
 */
export interface KeyValueDiffer<K, V> {
  /**
   * Compute a difference between the previous state and the new `object` state.
   *
   * 计算先前状态和新 `object` 状态之间的差异。
   *
   * @param object containing the new value.
   *
   * 包含新值。
   *
   * @returns an object describing the difference. The return value is only valid until the next
   * `diff()` invocation.
   *
   * 描述差异的对象。返回值仅在下一次 `diff()` 调用之前有效。
   *
   */
  diff(object: Map<K, V>): KeyValueChanges<K, V>|null;

  /**
   * Compute a difference between the previous state and the new `object` state.
   *
   * 计算先前状态和新 `object` 状态之间的差异。
   *
   * @param object containing the new value.
   *
   * 包含新值。
   *
   * @returns an object describing the difference. The return value is only valid until the next
   * `diff()` invocation.
   *
   * 描述差异的对象。返回值仅在下一次 `diff()` 调用之前有效。
   *
   */
  diff(object: {[key: string]: V}): KeyValueChanges<string, V>|null;
  // TODO(TS2.1): diff<KP extends string>(this: KeyValueDiffer<KP, V>, object: Record<KP, V>):
  // KeyValueDiffer<KP, V>;
}

/**
 * An object describing the changes in the `Map` or `{[k:string]: string}` since last time
 * `KeyValueDiffer#diff()` was invoked.
 *
 * 一个对象，描述自上次调用 `KeyValueDiffer#diff()` 以来的变化的 `Map` 或 `{[k:string]: string}`。
 *
 * @publicApi
 */
export interface KeyValueChanges<K, V> {
  /**
   * Iterate over all changes. `KeyValueChangeRecord` will contain information about changes
   * to each item.
   *
   * 遍历所有更改。`KeyValueChangeRecord` 将包含有关每个条目更改的信息。
   *
   */
  forEachItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;

  /**
   * Iterate over changes in the order of original Map showing where the original items
   * have moved.
   *
   * 按照原始映射表中的顺序遍历更改，以显示原始条目移动过的位置。
   *
   */
  forEachPreviousItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;

  /**
   * Iterate over all keys for which values have changed.
   *
   * 遍历所有更改了值的键名。
   *
   */
  forEachChangedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;

  /**
   * Iterate over all added items.
   *
   * 遍历所有已添加的条目。
   *
   */
  forEachAddedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;

  /**
   * Iterate over all removed items.
   *
   * 遍历所有已删除的条目。
   *
   */
  forEachRemovedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
}

/**
 * Record representing the item change information.
 *
 * 代表条目变更信息的记录。
 *
 * @publicApi
 */
export interface KeyValueChangeRecord<K, V> {
  /**
   * Current key in the Map.
   *
   * 地图中的当前键名。
   *
   */
  readonly key: K;

  /**
   * Current value for the key or `null` if removed.
   *
   * 键名的当前值；如果已删除，则为 `null`
   *
   */
  readonly currentValue: V|null;

  /**
   * Previous value for the key or `null` if added.
   *
   * 键名的先前值；如果是添加的，则为 `null`
   *
   */
  readonly previousValue: V|null;
}

/**
 * Provides a factory for {@link KeyValueDiffer}.
 *
 * 提供 {@link KeyValueDiffer} 的工厂。
 *
 * @publicApi
 */
export interface KeyValueDifferFactory {
  /**
   * Test to see if the differ knows how to diff this kind of object.
   *
   * 测试看此差分器是否知道如何区分这种对象。
   *
   */
  supports(objects: any): boolean;

  /**
   * Create a `KeyValueDiffer`.
   *
   * 创建一个 `KeyValueDiffer` 。
   *
   */
  create<K, V>(): KeyValueDiffer<K, V>;
}

/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 *
 * NgClass、NgStyle 等使用的不同映射表差异策略的存储库。
 *
 * @publicApi
 */
export class KeyValueDiffers {
  /** @nocollapse */
  static ɵprov = ɵɵdefineInjectable({
    token: KeyValueDiffers,
    providedIn: 'root',
    factory: () => new KeyValueDiffers([new DefaultKeyValueDifferFactory()])
  });

  /**
   * @deprecated v4.0.0 - Should be private.
   *
   * v4.0.0-应该是私有的。
   *
   */
  factories: KeyValueDifferFactory[];

  constructor(factories: KeyValueDifferFactory[]) {
    this.factories = factories;
  }

  static create<S>(factories: KeyValueDifferFactory[], parent?: KeyValueDiffers): KeyValueDiffers {
    if (parent) {
      const copied = parent.factories.slice();
      factories = factories.concat(copied);
    }
    return new KeyValueDiffers(factories);
  }

  /**
   * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
   * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
   * {@link KeyValueDiffers} instance.
   *
   * 接受 {@link KeyValueDifferFactory} 的数组，并返回一个提供者，用于使用提供的工厂扩展所继承的 {@link KeyValueDiffers} 实例，并返回一个新的 {@link KeyValueDiffers} 实例。
   *
   * @usageNotes
   *
   * ### Example
   *
   * ### 例子
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link KeyValueDiffer} available.
   *
   * 以下示例显示如何扩展现有工厂列表，该列表仅适用于该组件及其子组件的注入器。这是使新的{@link KeyValueDiffer}可用的全部步骤。
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
   *   ]
   * })
   * ```
   */
  static extend<S>(factories: KeyValueDifferFactory[]): StaticProvider {
    return {
      provide: KeyValueDiffers,
      useFactory: (parent: KeyValueDiffers) => {
        if (!parent) {
          // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
          // to bootstrap(), which would override default pipes instead of extending them.
          throw new Error('Cannot extend KeyValueDiffers without a parent injector');
        }
        return KeyValueDiffers.create(factories, parent);
      },
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
    };
  }

  find(kv: any): KeyValueDifferFactory {
    const factory = this.factories.find(f => f.supports(kv));
    if (factory) {
      return factory;
    }
    throw new Error(`Cannot find a differ supporting object '${kv}'`);
  }
}
