/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '../di';
import {scheduleMicroTask} from '../util/microtask';
import {NgZone} from '../zone/ng_zone';

/**
 * Testability API.
 * `declare` keyword causes tsickle to generate externs, so these methods are
 * not renamed by Closure Compiler.
 *
 *  `Testability`  API。`declare` 关键字会导致 tsickle 生成外部变量，因此 Closure Compiler 不会重命名这些方法。
 *
 * @publicApi
 */
export declare interface PublicTestability {
  isStable(): boolean;
  whenStable(callback: Function, timeout?: number, updateCallback?: Function): void;
  findProviders(using: any, provider: string, exactMatch: boolean): any[];
}

// Angular internal, not intended for public API.
export interface PendingMacrotask {
  source: string;
  creationLocation: Error;
  runCount?: number;
  data?: TaskData;
}

export interface TaskData {
  target?: XMLHttpRequest;
  delay?: number;
  isPeriodic?: boolean;
}

// Angular internal, not intended for public API.
export type DoneCallback = (didWork: boolean, tasks?: PendingMacrotask[]) => void;
export type UpdateCallback = (tasks: PendingMacrotask[]) => boolean;

interface WaitCallback {
  // Needs to be 'any' - setTimeout returns a number according to ES6, but
  // on NodeJS it returns a Timer.
  timeoutId: any;
  doneCb: DoneCallback;
  updateCb?: UpdateCallback;
}

/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 *
 *  `Testability` 服务提供了可以从浏览器和诸如 Protractor 之类的服务访问的测试钩子。页面上每个自举的 Angular 应用程序都会有一个 Testability 实例。
 *
 * @publicApi
 */
@Injectable()
export class Testability implements PublicTestability {
  private _pendingCount: number = 0;
  private _isZoneStable: boolean = true;
  /**
   * Whether any work was done since the last 'whenStable' callback. This is
   * useful to detect if this could have potentially destabilized another
   * component while it is stabilizing.
   *
   * 自上次 “whenStable” 回调以来是否完成了任何工作。这对于检测它在稳定过程中是否可能使另一个组件不稳定可能很有用。
   *
   * @internal
   */
  private _didWork: boolean = false;
  private _callbacks: WaitCallback[] = [];

  private taskTrackingZone: {macroTasks: Task[]}|null = null;

  constructor(private _ngZone: NgZone) {
    this._watchAngularEvents();
    _ngZone.run(() => {
      this.taskTrackingZone =
          typeof Zone == 'undefined' ? null : Zone.current.get('TaskTrackingZone');
    });
  }

  private _watchAngularEvents(): void {
    this._ngZone.onUnstable.subscribe({
      next: () => {
        this._didWork = true;
        this._isZoneStable = false;
      }
    });

    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.subscribe({
        next: () => {
          NgZone.assertNotInAngularZone();
          scheduleMicroTask(() => {
            this._isZoneStable = true;
            this._runCallbacksIfReady();
          });
        }
      });
    });
  }

  /**
   * Increases the number of pending request
   *
   * 增加待处理请求的数量
   *
   * @deprecated pending requests are now tracked with zones.
   *
   * 现在可以使用 Zone 来跟踪未决请求。
   *
   */
  increasePendingRequestCount(): number {
    this._pendingCount += 1;
    this._didWork = true;
    return this._pendingCount;
  }

  /**
   * Decreases the number of pending request
   *
   * 减少待处理的请求数
   *
   * @deprecated pending requests are now tracked with zones
   *
   * 现在使用 Zone 跟踪待处理的请求
   *
   */
  decreasePendingRequestCount(): number {
    this._pendingCount -= 1;
    if (this._pendingCount < 0) {
      throw new Error('pending async requests below zero');
    }
    this._runCallbacksIfReady();
    return this._pendingCount;
  }

  /**
   * Whether an associated application is stable
   *
   * 关联的应用程序是否稳定
   *
   */
  isStable(): boolean {
    return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
  }

  private _runCallbacksIfReady(): void {
    if (this.isStable()) {
      // Schedules the call backs in a new frame so that it is always async.
      scheduleMicroTask(() => {
        while (this._callbacks.length !== 0) {
          let cb = this._callbacks.pop()!;
          clearTimeout(cb.timeoutId);
          cb.doneCb(this._didWork);
        }
        this._didWork = false;
      });
    } else {
      // Still not stable, send updates.
      let pending = this.getPendingTasks();
      this._callbacks = this._callbacks.filter((cb) => {
        if (cb.updateCb && cb.updateCb(pending)) {
          clearTimeout(cb.timeoutId);
          return false;
        }

        return true;
      });

      this._didWork = true;
    }
  }

  private getPendingTasks(): PendingMacrotask[] {
    if (!this.taskTrackingZone) {
      return [];
    }

    // Copy the tasks data so that we don't leak tasks.
    return this.taskTrackingZone.macroTasks.map((t: Task) => {
      return {
        source: t.source,
        // From TaskTrackingZone:
        // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
        creationLocation: (t as any).creationLocation as Error,
        data: t.data
      };
    });
  }

  private addCallback(cb: DoneCallback, timeout?: number, updateCb?: UpdateCallback) {
    let timeoutId: any = -1;
    if (timeout && timeout > 0) {
      timeoutId = setTimeout(() => {
        this._callbacks = this._callbacks.filter((cb) => cb.timeoutId !== timeoutId);
        cb(this._didWork, this.getPendingTasks());
      }, timeout);
    }
    this._callbacks.push(<WaitCallback>{doneCb: cb, timeoutId: timeoutId, updateCb: updateCb});
  }

  /**
   * Wait for the application to be stable with a timeout. If the timeout is reached before that
   * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
   *
   * 等待应用程序稳定并超时。如果在此之前已达到超时，则回调将收到未决的宏任务的列表，否则为 null。
   *
   * @param doneCb The callback to invoke when Angular is stable or the timeout expires
   *    whichever comes first.
   *
   * 当 Angular 稳定或超时到期时调用的回调，以先到者为准。
   *
   * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
   *    specified, whenStable() will wait forever.
   *
   * 可选的。等待 Angular 稳定下来的最长时间。如果未指定，那么 whenStable() 将永远等待。
   *
   * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
   *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
   *    and no further updates will be issued.
   *
   * 可选的。如果指定，则每当挂起的宏任务集发生更改时，都会调用此回调。如果此回调返回 true，那么将不会调用 doneCb，并且不会发出进一步的更新。
   *
   */
  whenStable(doneCb: Function, timeout?: number, updateCb?: Function): void {
    if (updateCb && !this.taskTrackingZone) {
      throw new Error(
          'Task tracking zone is required when passing an update callback to ' +
          'whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
    }
    // These arguments are 'Function' above to keep the public API simple.
    this.addCallback(doneCb as DoneCallback, timeout, updateCb as UpdateCallback);
    this._runCallbacksIfReady();
  }

  /**
   * Get the number of pending requests
   *
   * 获取待处理的请求数
   *
   * @deprecated pending requests are now tracked with zones
   *
   * 现在使用 Zone 跟踪待处理的请求
   *
   */
  getPendingRequestCount(): number {
    return this._pendingCount;
  }

  /**
   * Find providers by name
   *
   * 按名称查找提供者
   *
   * @param using The root element to search from
   *
   * 要搜索的根元素
   *
   * @param provider The name of binding variable
   *
   * 绑定变量的名称
   *
   * @param exactMatch Whether using exactMatch
   *
   * 是否使用 exactMatch
   *
   */
  findProviders(using: any, provider: string, exactMatch: boolean): any[] {
    // TODO(juliemr): implement.
    return [];
  }
}

/**
 * A global registry of {@link Testability} instances for specific elements.
 *
 * {@link Testability} 实例的全局注册表，用于特定元素。
 *
 * @publicApi
 */
@Injectable()
export class TestabilityRegistry {
  /** @internal */
  _applications = new Map<any, Testability>();

  constructor() {
    _testabilityGetter.addToWindow(this);
  }

  /**
   * Registers an application with a testability hook so that it can be tracked
   *
   * 使用 `Testability` 钩子注册应用程序，以便可以对其进行跟踪
   *
   * @param token token of application, root element
   *
   * 应用令牌，根元素
   *
   * @param testability Testability hook
   *
   *  `Testability` 钩子
   *
   */
  registerApplication(token: any, testability: Testability) {
    this._applications.set(token, testability);
  }

  /**
   * Unregisters an application.
   *
   * 注销应用程序。
   *
   * @param token token of application, root element
   *
   * 应用令牌，根元素
   *
   */
  unregisterApplication(token: any) {
    this._applications.delete(token);
  }

  /**
   * Unregisters all applications
   *
   * 注销所有应用程序
   *
   */
  unregisterAllApplications() {
    this._applications.clear();
  }

  /**
   * Get a testability hook associated with the application
   *
   * 获取与应用程序关联的 `Testability` 钩子
   *
   * @param elem root element
   *
   * 根元素
   *
   */
  getTestability(elem: any): Testability|null {
    return this._applications.get(elem) || null;
  }

  /**
   * Get all registered testabilities
   *
   * 获取所有注册的测试能力
   *
   */
  getAllTestabilities(): Testability[] {
    return Array.from(this._applications.values());
  }

  /**
   * Get all registered applications(root elements)
   *
   * 获取所有注册的应用程序（根元素）
   *
   */
  getAllRootElements(): any[] {
    return Array.from(this._applications.keys());
  }

  /**
   * Find testability of a node in the Tree
   *
   * 在树中查找节点的 `Testability`
   *
   * @param elem node
   *
   * 节点
   *
   * @param findInAncestors whether finding testability in ancestors if testability was not found in
   * current node
   *
   * 在当前节点中未找到 `Testability` 的情况下是否要在祖先中寻找 `Testability`
   *
   */
  findTestabilityInTree(elem: Node, findInAncestors: boolean = true): Testability|null {
    return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
  }
}

/**
 * Adapter interface for retrieving the `Testability` service associated for a
 * particular context.
 *
 * 适配器接口，用于检索与特定上下文关联 `Testability`
 *
 * @publicApi
 */
export interface GetTestability {
  addToWindow(registry: TestabilityRegistry): void;
  findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean):
      Testability|null;
}

class _NoopGetTestability implements GetTestability {
  addToWindow(registry: TestabilityRegistry): void {}
  findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean):
      Testability|null {
    return null;
  }
}

/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 *
 * 设置 Angular 测试框架使用的 {@link GetTestability} 实现。
 *
 * @publicApi
 */
export function setTestabilityGetter(getter: GetTestability): void {
  _testabilityGetter = getter;
}

let _testabilityGetter: GetTestability = new _NoopGetTestability();
