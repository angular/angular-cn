/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef, EventEmitter, OnDestroy, Pipe, PipeTransform, ɵisObservable, ɵisPromise} from '@angular/core';
import {Observable, SubscriptionLike} from 'rxjs';
import {invalidPipeArgumentError} from './invalid_pipe_argument_error';

interface SubscriptionStrategy {
  createSubscription(async: Observable<any>|Promise<any>, updateLatestValue: any): SubscriptionLike
      |Promise<any>;
  dispose(subscription: SubscriptionLike|Promise<any>): void;
  onDestroy(subscription: SubscriptionLike|Promise<any>): void;
}

class ObservableStrategy implements SubscriptionStrategy {
  createSubscription(async: Observable<any>, updateLatestValue: any): SubscriptionLike {
    return async.subscribe({
      next: updateLatestValue,
      error: (e: any) => {
        throw e;
      }
    });
  }

  dispose(subscription: SubscriptionLike): void {
    subscription.unsubscribe();
  }

  onDestroy(subscription: SubscriptionLike): void {
    subscription.unsubscribe();
  }
}

class PromiseStrategy implements SubscriptionStrategy {
  createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
    return async.then(updateLatestValue, e => {
      throw e;
    });
  }

  dispose(subscription: Promise<any>): void {}

  onDestroy(subscription: Promise<any>): void {}
}

const _promiseStrategy = new PromiseStrategy();
const _observableStrategy = new ObservableStrategy();

/**
 * @ngModule CommonModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * 从一个异步回执中解出一个值。
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * `async` 管道会订阅一个 `Observable` 或 `Promise`，并返回它发出的最近一个值。
 * 当新值到来时，`async` 管道就会把该组件标记为需要进行变更检测。当组件被销毁时，`async` 管道就会自动取消订阅，以消除潜在的内存泄露问题。
 *
 * @usageNotes
 *
 * ### Examples
 *
 * ### 例子
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * 这个例子把一个 `Promise` 绑定到了视图中。点击 `Resolve` 按钮就会解析此 Promise。
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * 还可以把 `async` 用于 `Observable`。下面的例子就把 `time` 这个 `Observable` 绑定到了视图上。这个 `Observable` 会不断使用当前时间更新视图。
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */
@Pipe({name: 'async', pure: false})
export class AsyncPipe implements OnDestroy, PipeTransform {
  private _latestValue: any = null;

  private _subscription: SubscriptionLike|Promise<any>|null = null;
  private _obj: Observable<any>|Promise<any>|EventEmitter<any>|null = null;
  private _strategy: SubscriptionStrategy = null!;

  constructor(private _ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this._subscription) {
      this._dispose();
    }
  }

  transform<T>(obj: null): null;
  transform<T>(obj: undefined): undefined;
  transform<T>(obj: Observable<T>|null|undefined): T|null;
  transform<T>(obj: Promise<T>|null|undefined): T|null;
  transform(obj: Observable<any>|Promise<any>|null|undefined): any {
    if (!this._obj) {
      if (obj) {
        this._subscribe(obj);
      }
      return this._latestValue;
    }

    if (obj !== this._obj) {
      this._dispose();
      return this.transform(obj as any);
    }

    return this._latestValue;
  }

  private _subscribe(obj: Observable<any>|Promise<any>|EventEmitter<any>): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    this._subscription = this._strategy.createSubscription(
        obj, (value: Object) => this._updateLatestValue(obj, value));
  }

  private _selectStrategy(obj: Observable<any>|Promise<any>|EventEmitter<any>): any {
    if (ɵisPromise(obj)) {
      return _promiseStrategy;
    }

    if (ɵisObservable(obj)) {
      return _observableStrategy;
    }

    throw invalidPipeArgumentError(AsyncPipe, obj);
  }

  private _dispose(): void {
    this._strategy.dispose(this._subscription!);
    this._latestValue = null;
    this._subscription = null;
    this._obj = null;
  }

  private _updateLatestValue(async: any, value: Object): void {
    if (async === this._obj) {
      this._latestValue = value;
      this._ref.markForCheck();
    }
  }
}
