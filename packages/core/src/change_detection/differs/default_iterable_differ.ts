/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {stringify} from '../../util/stringify';
import {isListLikeIterable, iterateListLike} from '../change_detection_util';

import {IterableChangeRecord, IterableChanges, IterableDiffer, IterableDifferFactory, NgIterable, TrackByFunction} from './iterable_differs';


export class DefaultIterableDifferFactory implements IterableDifferFactory {
  constructor() {}
  supports(obj: Object|null|undefined): boolean {
    return isListLikeIterable(obj);
  }

  create<V>(trackByFn?: TrackByFunction<V>): DefaultIterableDiffer<V> {
    return new DefaultIterableDiffer<V>(trackByFn);
  }
}

const trackByIdentity = (index: number, item: any) => item;

/**
 * @deprecated v4.0.0 - Should not be part of public API.
 *
 * v4.0.0-不应成为公共 API 的一部分。
 *
 * @publicApi
 */
export class DefaultIterableDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
  public readonly length: number = 0;
  // TODO(issue/24571): remove '!'.
  public readonly collection!: V[]|Iterable<V>|null;
  // Keeps track of the used records at any point in time (during & across `_check()` calls)
  private _linkedRecords: _DuplicateMap<V>|null = null;
  // Keeps track of the removed records at any point in time during `_check()` calls.
  private _unlinkedRecords: _DuplicateMap<V>|null = null;
  private _previousItHead: IterableChangeRecord_<V>|null = null;
  private _itHead: IterableChangeRecord_<V>|null = null;
  private _itTail: IterableChangeRecord_<V>|null = null;
  private _additionsHead: IterableChangeRecord_<V>|null = null;
  private _additionsTail: IterableChangeRecord_<V>|null = null;
  private _movesHead: IterableChangeRecord_<V>|null = null;
  private _movesTail: IterableChangeRecord_<V>|null = null;
  private _removalsHead: IterableChangeRecord_<V>|null = null;
  private _removalsTail: IterableChangeRecord_<V>|null = null;
  // Keeps track of records where custom track by is the same, but item identity has changed
  private _identityChangesHead: IterableChangeRecord_<V>|null = null;
  private _identityChangesTail: IterableChangeRecord_<V>|null = null;
  private _trackByFn: TrackByFunction<V>;

  constructor(trackByFn?: TrackByFunction<V>) {
    this._trackByFn = trackByFn || trackByIdentity;
  }

  forEachItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._itHead; record !== null; record = record._next) {
      fn(record);
    }
  }

  forEachOperation(
      fn: (item: IterableChangeRecord<V>, previousIndex: number|null, currentIndex: number|null) =>
          void) {
    let nextIt = this._itHead;
    let nextRemove = this._removalsHead;
    let addRemoveOffset = 0;
    let moveOffsets: number[]|null = null;
    while (nextIt || nextRemove) {
      // Figure out which is the next record to process
      // Order: remove, add, move
      const record: IterableChangeRecord<V> = !nextRemove ||
              nextIt &&
                  nextIt.currentIndex! <
                      getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
          nextIt! :
          nextRemove;
      const adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
      const currentIndex = record.currentIndex;

      // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
      if (record === nextRemove) {
        addRemoveOffset--;
        nextRemove = nextRemove._nextRemoved;
      } else {
        nextIt = nextIt!._next;
        if (record.previousIndex == null) {
          addRemoveOffset++;
        } else {
          // INVARIANT:  currentIndex < previousIndex
          if (!moveOffsets) moveOffsets = [];
          const localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
          const localCurrentIndex = currentIndex! - addRemoveOffset;
          if (localMovePreviousIndex != localCurrentIndex) {
            for (let i = 0; i < localMovePreviousIndex; i++) {
              const offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
              const index = offset + i;
              if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                moveOffsets[i] = offset + 1;
              }
            }
            const previousIndex = record.previousIndex;
            moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
          }
        }
      }

      if (adjPreviousIndex !== currentIndex) {
        fn(record, adjPreviousIndex, currentIndex);
      }
    }
  }

  forEachPreviousItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
      fn(record);
    }
  }

  forEachAddedItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
      fn(record);
    }
  }

  forEachMovedItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._movesHead; record !== null; record = record._nextMoved) {
      fn(record);
    }
  }

  forEachRemovedItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
      fn(record);
    }
  }

  forEachIdentityChange(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
      fn(record);
    }
  }

  diff(collection: NgIterable<V>|null|undefined): DefaultIterableDiffer<V>|null {
    if (collection == null) collection = [];
    if (!isListLikeIterable(collection)) {
      throw new Error(
          `Error trying to diff '${stringify(collection)}'. Only arrays and iterables are allowed`);
    }

    if (this.check(collection)) {
      return this;
    } else {
      return null;
    }
  }

  onDestroy() {}

  check(collection: NgIterable<V>): boolean {
    this._reset();

    let record: IterableChangeRecord_<V>|null = this._itHead;
    let mayBeDirty: boolean = false;
    let index: number;
    let item: V;
    let itemTrackBy: any;
    if (Array.isArray(collection)) {
      (this as {length: number}).length = collection.length;

      for (let index = 0; index < this.length; index++) {
        item = collection[index];
        itemTrackBy = this._trackByFn(index, item);
        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
          record = this._mismatch(record, item, itemTrackBy, index);
          mayBeDirty = true;
        } else {
          if (mayBeDirty) {
            // TODO(misko): can we limit this to duplicates only?
            record = this._verifyReinsertion(record, item, itemTrackBy, index);
          }
          if (!Object.is(record.item, item)) this._addIdentityChange(record, item);
        }

        record = record._next;
      }
    } else {
      index = 0;
      iterateListLike(collection, (item: V) => {
        itemTrackBy = this._trackByFn(index, item);
        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
          record = this._mismatch(record, item, itemTrackBy, index);
          mayBeDirty = true;
        } else {
          if (mayBeDirty) {
            // TODO(misko): can we limit this to duplicates only?
            record = this._verifyReinsertion(record, item, itemTrackBy, index);
          }
          if (!Object.is(record.item, item)) this._addIdentityChange(record, item);
        }
        record = record._next;
        index++;
      });
      (this as {length: number}).length = index;
    }

    this._truncate(record);
    (this as {collection: V[] | Iterable<V>}).collection = collection;
    return this.isDirty;
  }

  /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
   * changes.
   */
  get isDirty(): boolean {
    return this._additionsHead !== null || this._movesHead !== null ||
        this._removalsHead !== null || this._identityChangesHead !== null;
  }

  /**
   * Reset the state of the change objects to show no changes. This means set previousKey to
   * currentKey, and clear all of the queues (additions, moves, removals).
   * Set the previousIndexes of moved and added items to their currentIndexes
   * Reset the list of additions, moves and removals
   *
   * 重置更改对象的状态以便不显示任何更改。这意味着将 previousKey 设置为 currentKey，并清除所有队列（添加、移动、移除）。将已移动和已添加条目的 previousIndexes 设置为其 currentIndexes。重置包含添加、移动和删除的列表
   *
   * @internal
   */
  _reset() {
    if (this.isDirty) {
      let record: IterableChangeRecord_<V>|null;

      for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
        record._nextPrevious = record._next;
      }

      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        record.previousIndex = record.currentIndex;
      }
      this._additionsHead = this._additionsTail = null;

      for (record = this._movesHead; record !== null; record = record._nextMoved) {
        record.previousIndex = record.currentIndex;
      }
      this._movesHead = this._movesTail = null;
      this._removalsHead = this._removalsTail = null;
      this._identityChangesHead = this._identityChangesTail = null;

      // TODO(vicb): when assert gets supported
      // assert(!this.isDirty);
    }
  }

  /**
   * This is the core function which handles differences between collections.
   *
   * 这是处理集合之间差异的核心函数。
   *
   * - `record` is the record which we saw at this position last time. If null then it is a new
   *   item.
   *
   *   `record` 是我们上次在此位置看到的记录。如果为 null，则为新条目。
   *
   * - `item` is the current item in the collection
   *
   *   `item` 是集合中的当前条目
   *
   * - `index` is the position of the item in the collection
   *
   *   `index` 是条目在集合中的位置
   *
   * @internal
   */
  _mismatch(record: IterableChangeRecord_<V>|null, item: V, itemTrackBy: any, index: number):
      IterableChangeRecord_<V> {
    // The previous record after which we will append the current one.
    let previousRecord: IterableChangeRecord_<V>|null;

    if (record === null) {
      previousRecord = this._itTail;
    } else {
      previousRecord = record._prev;
      // Remove the record from the collection since we know it does not match the item.
      this._remove(record);
    }

    // Attempt to see if we have seen the item before.
    record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
    if (record !== null) {
      // We have seen this before, we need to move it forward in the collection.
      // But first we need to check if identity changed, so we can update in view if necessary
      if (!Object.is(record.item, item)) this._addIdentityChange(record, item);

      this._moveAfter(record, previousRecord, index);
    } else {
      // Never seen it, check evicted list.
      record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
      if (record !== null) {
        // It is an item which we have evicted earlier: reinsert it back into the list.
        // But first we need to check if identity changed, so we can update in view if necessary
        if (!Object.is(record.item, item)) this._addIdentityChange(record, item);

        this._reinsertAfter(record, previousRecord, index);
      } else {
        // It is a new item: add it.
        record =
            this._addAfter(new IterableChangeRecord_<V>(item, itemTrackBy), previousRecord, index);
      }
    }
    return record;
  }

  /**
   * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
   *
   * 仅当数组包含重复项时才需要进行此检查。 （不脏时跳过）
   *
   * Use case: `[a, a]` => `[b, a, a]`
   *
   * 用例： `[a, a]` => `[b, a, a]`
   *
   * If we did not have this check then the insertion of `b` would:
   *
   * 如果我们不做这项检查，则插入 `b` 时会：
   *
   * 1. evict first `a`
   *
   *    移出第一个 `a`
   *
   * 1. insert `b` at `0` index.
   *
   *    把 `b` 插入在 `0` 号索引处。
   *
   * 1. leave `a` at index `1` as is. &lt;-- this is wrong!
   *
   *    把 `a` 留在现在的 `1` 号索引处。&lt;-- 这是错的！
   *
   * 1. reinsert `a` at index 2. &lt;-- this is wrong!
   *
   *    重新把 `a` 插入在 `2` 号索引处。 &lt;-- 这是错的！
   *
   * The correct behavior is:
   *
   * 正确的行为是：
   *
   * 1. evict first `a`
   *
   *    移出第一个 `a`
   *
   * 1. insert `b` at `0` index.
   *
   *    把 `b` 插入在 `0` 号索引处。
   *
   * 1. reinsert `a` at index 1.
   *
   *    把 `a` 插入在 `1` 号索引处。
   *
   * 1. move `a` at from `1` to `2`.
   *
   *    把 `a` 从 `1` 号位移到 `2` 号位。
   *
   * Double check that we have not evicted a duplicate item. We need to check if the item type may
   * have already been removed:
   * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
   * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
   * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
   * at the end.
   *
   * 再次确认我们没有移出重复的条目。我们需要检查此条目类型是否已被删除：插入 b 将移出第一个 “a”。如果我们现在不重新插入，它将重新在最后插入。这将表现为两个 “a” 调换了位置。这是不正确的，因为更好的方法是插入 “b”，而不是将 “a” 和 “b” 互换，然后在末尾添加 “a”。
   *
   * @internal
   */
  _verifyReinsertion(record: IterableChangeRecord_<V>, item: V, itemTrackBy: any, index: number):
      IterableChangeRecord_<V> {
    let reinsertRecord: IterableChangeRecord_<V>|null =
        this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
    if (reinsertRecord !== null) {
      record = this._reinsertAfter(reinsertRecord, record._prev!, index);
    } else if (record.currentIndex != index) {
      record.currentIndex = index;
      this._addToMoves(record, index);
    }
    return record;
  }

  /**
   * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
   *
   * 摆脱上一个集合中任何多余的 {@link IterableChangeRecord_}
   *
   * - `record` The first excess {@link IterableChangeRecord\_}.
   *
   *   `record` 是指第一个多余的{@link IterableChangeRecord\_}。
   *
   * @internal
   */
  _truncate(record: IterableChangeRecord_<V>|null) {
    // Anything after that needs to be removed;
    while (record !== null) {
      const nextRecord: IterableChangeRecord_<V>|null = record._next;
      this._addToRemovals(this._unlink(record));
      record = nextRecord;
    }
    if (this._unlinkedRecords !== null) {
      this._unlinkedRecords.clear();
    }

    if (this._additionsTail !== null) {
      this._additionsTail._nextAdded = null;
    }
    if (this._movesTail !== null) {
      this._movesTail._nextMoved = null;
    }
    if (this._itTail !== null) {
      this._itTail._next = null;
    }
    if (this._removalsTail !== null) {
      this._removalsTail._nextRemoved = null;
    }
    if (this._identityChangesTail !== null) {
      this._identityChangesTail._nextIdentityChange = null;
    }
  }

  /** @internal */
  _reinsertAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    if (this._unlinkedRecords !== null) {
      this._unlinkedRecords.remove(record);
    }
    const prev = record._prevRemoved;
    const next = record._nextRemoved;

    if (prev === null) {
      this._removalsHead = next;
    } else {
      prev._nextRemoved = next;
    }
    if (next === null) {
      this._removalsTail = prev;
    } else {
      next._prevRemoved = prev;
    }

    this._insertAfter(record, prevRecord, index);
    this._addToMoves(record, index);
    return record;
  }

  /** @internal */
  _moveAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    this._unlink(record);
    this._insertAfter(record, prevRecord, index);
    this._addToMoves(record, index);
    return record;
  }

  /** @internal */
  _addAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    this._insertAfter(record, prevRecord, index);

    if (this._additionsTail === null) {
      // TODO(vicb):
      // assert(this._additionsHead === null);
      this._additionsTail = this._additionsHead = record;
    } else {
      // TODO(vicb):
      // assert(_additionsTail._nextAdded === null);
      // assert(record._nextAdded === null);
      this._additionsTail = this._additionsTail._nextAdded = record;
    }
    return record;
  }

  /** @internal */
  _insertAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    // TODO(vicb):
    // assert(record != prevRecord);
    // assert(record._next === null);
    // assert(record._prev === null);

    const next: IterableChangeRecord_<V>|null =
        prevRecord === null ? this._itHead : prevRecord._next;
    // TODO(vicb):
    // assert(next != record);
    // assert(prevRecord != record);
    record._next = next;
    record._prev = prevRecord;
    if (next === null) {
      this._itTail = record;
    } else {
      next._prev = record;
    }
    if (prevRecord === null) {
      this._itHead = record;
    } else {
      prevRecord._next = record;
    }

    if (this._linkedRecords === null) {
      this._linkedRecords = new _DuplicateMap<V>();
    }
    this._linkedRecords.put(record);

    record.currentIndex = index;
    return record;
  }

  /** @internal */
  _remove(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    return this._addToRemovals(this._unlink(record));
  }

  /** @internal */
  _unlink(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    if (this._linkedRecords !== null) {
      this._linkedRecords.remove(record);
    }

    const prev = record._prev;
    const next = record._next;

    // TODO(vicb):
    // assert((record._prev = null) === null);
    // assert((record._next = null) === null);

    if (prev === null) {
      this._itHead = next;
    } else {
      prev._next = next;
    }
    if (next === null) {
      this._itTail = prev;
    } else {
      next._prev = prev;
    }

    return record;
  }

  /** @internal */
  _addToMoves(record: IterableChangeRecord_<V>, toIndex: number): IterableChangeRecord_<V> {
    // TODO(vicb):
    // assert(record._nextMoved === null);

    if (record.previousIndex === toIndex) {
      return record;
    }

    if (this._movesTail === null) {
      // TODO(vicb):
      // assert(_movesHead === null);
      this._movesTail = this._movesHead = record;
    } else {
      // TODO(vicb):
      // assert(_movesTail._nextMoved === null);
      this._movesTail = this._movesTail._nextMoved = record;
    }

    return record;
  }

  private _addToRemovals(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    if (this._unlinkedRecords === null) {
      this._unlinkedRecords = new _DuplicateMap<V>();
    }
    this._unlinkedRecords.put(record);
    record.currentIndex = null;
    record._nextRemoved = null;

    if (this._removalsTail === null) {
      // TODO(vicb):
      // assert(_removalsHead === null);
      this._removalsTail = this._removalsHead = record;
      record._prevRemoved = null;
    } else {
      // TODO(vicb):
      // assert(_removalsTail._nextRemoved === null);
      // assert(record._nextRemoved === null);
      record._prevRemoved = this._removalsTail;
      this._removalsTail = this._removalsTail._nextRemoved = record;
    }
    return record;
  }

  /** @internal */
  _addIdentityChange(record: IterableChangeRecord_<V>, item: V) {
    record.item = item;
    if (this._identityChangesTail === null) {
      this._identityChangesTail = this._identityChangesHead = record;
    } else {
      this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
    }
    return record;
  }
}

export class IterableChangeRecord_<V> implements IterableChangeRecord<V> {
  currentIndex: number|null = null;
  previousIndex: number|null = null;

  /** @internal */
  _nextPrevious: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _prev: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _next: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _prevDup: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextDup: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _prevRemoved: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextRemoved: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextAdded: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextMoved: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextIdentityChange: IterableChangeRecord_<V>|null = null;


  constructor(public item: V, public trackById: any) {}
}

// A linked list of IterableChangeRecords with the same IterableChangeRecord_.item
class _DuplicateItemRecordList<V> {
  /** @internal */
  _head: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _tail: IterableChangeRecord_<V>|null = null;

  /**
   * Append the record to the list of duplicates.
   *
   * Note: by design all records in the list of duplicates hold the same value in record.item.
   */
  add(record: IterableChangeRecord_<V>): void {
    if (this._head === null) {
      this._head = this._tail = record;
      record._nextDup = null;
      record._prevDup = null;
    } else {
      // TODO(vicb):
      // assert(record.item ==  _head.item ||
      //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
      this._tail!._nextDup = record;
      record._prevDup = this._tail;
      record._nextDup = null;
      this._tail = record;
    }
  }

  // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
  // IterableChangeRecord_.currentIndex >= atOrAfterIndex
  get(trackById: any, atOrAfterIndex: number|null): IterableChangeRecord_<V>|null {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._head; record !== null; record = record._nextDup) {
      if ((atOrAfterIndex === null || atOrAfterIndex <= record.currentIndex!) &&
          Object.is(record.trackById, trackById)) {
        return record;
      }
    }
    return null;
  }

  /**
   * Remove one {@link IterableChangeRecord_} from the list of duplicates.
   *
   * Returns whether the list of duplicates is empty.
   */
  remove(record: IterableChangeRecord_<V>): boolean {
    // TODO(vicb):
    // assert(() {
    //  // verify that the record being removed is in the list.
    //  for (IterableChangeRecord_ cursor = _head; cursor != null; cursor = cursor._nextDup) {
    //    if (identical(cursor, record)) return true;
    //  }
    //  return false;
    //});

    const prev: IterableChangeRecord_<V>|null = record._prevDup;
    const next: IterableChangeRecord_<V>|null = record._nextDup;
    if (prev === null) {
      this._head = next;
    } else {
      prev._nextDup = next;
    }
    if (next === null) {
      this._tail = prev;
    } else {
      next._prevDup = prev;
    }
    return this._head === null;
  }
}

class _DuplicateMap<V> {
  map = new Map<any, _DuplicateItemRecordList<V>>();

  put(record: IterableChangeRecord_<V>) {
    const key = record.trackById;

    let duplicates = this.map.get(key);
    if (!duplicates) {
      duplicates = new _DuplicateItemRecordList<V>();
      this.map.set(key, duplicates);
    }
    duplicates.add(record);
  }

  /**
   * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
   * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
   *
   * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
   * have any more `a`s needs to return the second `a`.
   */
  get(trackById: any, atOrAfterIndex: number|null): IterableChangeRecord_<V>|null {
    const key = trackById;
    const recordList = this.map.get(key);
    return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
  }

  /**
   * Removes a {@link IterableChangeRecord_} from the list of duplicates.
   *
   * The list of duplicates also is removed from the map if it gets empty.
   */
  remove(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    const key = record.trackById;
    const recordList: _DuplicateItemRecordList<V> = this.map.get(key)!;
    // Remove the list of duplicates when it gets empty
    if (recordList.remove(record)) {
      this.map.delete(key);
    }
    return record;
  }

  get isEmpty(): boolean {
    return this.map.size === 0;
  }

  clear() {
    this.map.clear();
  }
}

function getPreviousIndex(item: any, addRemoveOffset: number, moveOffsets: number[]|null): number {
  const previousIndex = item.previousIndex;
  if (previousIndex === null) return previousIndex;
  let moveOffset = 0;
  if (moveOffsets && previousIndex < moveOffsets.length) {
    moveOffset = moveOffsets[previousIndex];
  }
  return previousIndex + addRemoveOffset + moveOffset;
}
