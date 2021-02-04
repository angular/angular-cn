/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef, ComponentRef, DebugElement, ElementRef, getDebugNode, NgZone, RendererFactory2} from '@angular/core';


/**
 * Fixture for debugging and testing a component.
 *
 * 用于调试和测试组件的夹具。
 *
 * @publicApi
 */
export class ComponentFixture<T> {
  /**
   * The DebugElement associated with the root element of this component.
   *
   * 与该组件的根元素关联的 DebugElement。
   *
   */
  debugElement: DebugElement;

  /**
   * The instance of the root component class.
   *
   * 根组件类的实例。
   *
   */
  componentInstance: T;

  /**
   * The native element at the root of the component.
   *
   * 组件根部的原生元素。
   *
   */
  nativeElement: any;

  /**
   * The ElementRef for the element at the root of the component.
   *
   * 位于组件根目录的元素的 ElementRef。
   *
   */
  elementRef: ElementRef;

  /**
   * The ChangeDetectorRef for the component
   *
   * 组件的 ChangeDetectorRef
   *
   */
  changeDetectorRef: ChangeDetectorRef;

  private _renderer: RendererFactory2|null|undefined;
  private _isStable: boolean = true;
  private _isDestroyed: boolean = false;
  private _resolve: ((result: any) => void)|null = null;
  private _promise: Promise<any>|null = null;
  private _onUnstableSubscription: any /** TODO #9100 */ = null;
  private _onStableSubscription: any /** TODO #9100 */ = null;
  private _onMicrotaskEmptySubscription: any /** TODO #9100 */ = null;
  private _onErrorSubscription: any /** TODO #9100 */ = null;

  constructor(
      public componentRef: ComponentRef<T>, public ngZone: NgZone|null,
      private _autoDetect: boolean) {
    this.changeDetectorRef = componentRef.changeDetectorRef;
    this.elementRef = componentRef.location;
    this.debugElement = <DebugElement>getDebugNode(this.elementRef.nativeElement);
    this.componentInstance = componentRef.instance;
    this.nativeElement = this.elementRef.nativeElement;
    this.componentRef = componentRef;
    this.ngZone = ngZone;

    if (ngZone) {
      // Create subscriptions outside the NgZone so that the callbacks run oustide
      // of NgZone.
      ngZone.runOutsideAngular(() => {
        this._onUnstableSubscription = ngZone.onUnstable.subscribe({
          next: () => {
            this._isStable = false;
          }
        });
        this._onMicrotaskEmptySubscription = ngZone.onMicrotaskEmpty.subscribe({
          next: () => {
            if (this._autoDetect) {
              // Do a change detection run with checkNoChanges set to true to check
              // there are no changes on the second run.
              this.detectChanges(true);
            }
          }
        });
        this._onStableSubscription = ngZone.onStable.subscribe({
          next: () => {
            this._isStable = true;
            // Check whether there is a pending whenStable() completer to resolve.
            if (this._promise !== null) {
              // If so check whether there are no pending macrotasks before resolving.
              // Do this check in the next tick so that ngZone gets a chance to update the state of
              // pending macrotasks.
              scheduleMicroTask(() => {
                if (!ngZone.hasPendingMacrotasks) {
                  if (this._promise !== null) {
                    this._resolve!(true);
                    this._resolve = null;
                    this._promise = null;
                  }
                }
              });
            }
          }
        });

        this._onErrorSubscription = ngZone.onError.subscribe({
          next: (error: any) => {
            throw error;
          }
        });
      });
    }
  }

  private _tick(checkNoChanges: boolean) {
    this.changeDetectorRef.detectChanges();
    if (checkNoChanges) {
      this.checkNoChanges();
    }
  }

  /**
   * Trigger a change detection cycle for the component.
   *
   * 触发组件的变更检测周期。
   *
   */
  detectChanges(checkNoChanges: boolean = true): void {
    if (this.ngZone != null) {
      // Run the change detection inside the NgZone so that any async tasks as part of the change
      // detection are captured by the zone and can be waited for in isStable.
      this.ngZone.run(() => {
        this._tick(checkNoChanges);
      });
    } else {
      // Running without zone. Just do the change detection.
      this._tick(checkNoChanges);
    }
  }

  /**
   * Do a change detection run to make sure there were no changes.
   *
   * 进行变更检测以确保没有更改。
   *
   */
  checkNoChanges(): void {
    this.changeDetectorRef.checkNoChanges();
  }

  /**
   * Set whether the fixture should autodetect changes.
   *
   * 设置夹具是否应自动检测变化。
   *
   * Also runs detectChanges once so that any existing change is detected.
   *
   * 还运行一次 detectChanges，以检测出任何现有更改。
   *
   */
  autoDetectChanges(autoDetect: boolean = true) {
    if (this.ngZone == null) {
      throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
    }
    this._autoDetect = autoDetect;
    this.detectChanges();
  }

  /**
   * Return whether the fixture is currently stable or has async tasks that have not been completed
   * yet.
   *
   * 返回此夹具当前是否稳定或具有尚未完成的异步任务。
   *
   */
  isStable(): boolean {
    return this._isStable && !this.ngZone!.hasPendingMacrotasks;
  }

  /**
   * Get a promise that resolves when the fixture is stable.
   *
   * 当夹具稳定时解析的承诺。
   *
   * This can be used to resume testing after events have triggered asynchronous activity or
   * asynchronous change detection.
   *
   * 当事件已触发异步活动或异步变更检测后，可用此方法继续执行测试。
   *
   */
  whenStable(): Promise<any> {
    if (this.isStable()) {
      return Promise.resolve(false);
    } else if (this._promise !== null) {
      return this._promise;
    } else {
      this._promise = new Promise(res => {
        this._resolve = res;
      });
      return this._promise;
    }
  }


  private _getRenderer() {
    if (this._renderer === undefined) {
      this._renderer = this.componentRef.injector.get(RendererFactory2, null);
    }
    return this._renderer as RendererFactory2 | null;
  }

  /**
   * Get a promise that resolves when the ui state is stable following animations.
   *
   * 获得一个承诺，可以解决以下动画中 ui 状态何时稳定的问题。
   *
   */
  whenRenderingDone(): Promise<any> {
    const renderer = this._getRenderer();
    if (renderer && renderer.whenRenderingDone) {
      return renderer.whenRenderingDone();
    }
    return this.whenStable();
  }

  /**
   * Trigger component destruction.
   *
   * 触发组件的销毁。
   *
   */
  destroy(): void {
    if (!this._isDestroyed) {
      this.componentRef.destroy();
      if (this._onUnstableSubscription != null) {
        this._onUnstableSubscription.unsubscribe();
        this._onUnstableSubscription = null;
      }
      if (this._onStableSubscription != null) {
        this._onStableSubscription.unsubscribe();
        this._onStableSubscription = null;
      }
      if (this._onMicrotaskEmptySubscription != null) {
        this._onMicrotaskEmptySubscription.unsubscribe();
        this._onMicrotaskEmptySubscription = null;
      }
      if (this._onErrorSubscription != null) {
        this._onErrorSubscription.unsubscribe();
        this._onErrorSubscription = null;
      }
      this._isDestroyed = true;
    }
  }
}

function scheduleMicroTask(fn: Function) {
  Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
