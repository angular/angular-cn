/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/// <reference types="rxjs" />

import {Subject, Subscription} from 'rxjs';

/**
 * Use in components with the `@Output` directive to emit custom events
 * synchronously or asynchronously, and register handlers for those events
 * by subscribing to an instance.
 *
 * 用在带有 `@Output` 指令的组件中，以同步或异步方式发出自定义事件，并通过订阅实例来为这些事件注册处理器。
 *
 * @usageNotes
 *
 * Extends
 * [RxJS `Subject`](https://rxjs.dev/api/index/class/Subject)
 * for Angular by adding the `emit()` method.
 *
 * 通过添加 `emit()` 方法来扩展 [Angular 的 RxJS `Subject`](https://rxjs.dev/api/index/class/Subject)。
 *
 * In the following example, a component defines two output properties
 * that create event emitters. When the title is clicked, the emitter
 * emits an open or close event to toggle the current visibility state.
 *
 * 在以下示例中，组件定义了两个创建事件发射器的输出属性。单击标题后，发射器将发出打开或关闭事件以切换当前可见性状态。
 *
 * ```html
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Access the event object with the `$event` argument passed to the output event
 * handler:
 *
 * ```html
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * @see [Observables in Angular](guide/observables-in-angular)
 *
 * [Angular 中的可观察对象](guide/observables-in-angular)
 *
 * @publicApi
 */
export interface EventEmitter<T> extends Subject<T> {
  /**
   * @internal
   */
  __isAsync: boolean;

  /**
   * Creates an instance of this class that can
   * deliver events synchronously or asynchronously.
   *
   * 创建此类的实例，该实例可以同步或异步发送事件。
   *
   * @param [isAsync=false] When true, deliver events asynchronously.
   *
   */
  new(isAsync?: boolean): EventEmitter<T>;

  /**
   * Emits an event containing a given value.
   *
   * 发出包含给定值的事件。
   *
   * @param value The value to emit.
   *
   * 要发出的值。
   *
   */
  emit(value?: T): void;
  /**
   * Registers handlers for events emitted by this instance.
   *
   * 注册此实例发出的事件的处理器。
   *
   * @param generatorOrNext When supplied, a custom handler for emitted events.
   *
   * 如果提供，则为所发出事件的自定义处理器。
   *
   * @param error When supplied, a custom handler for an error notification
   * from this emitter.
   *
   * 如果提供，则为这里发出的错误通知的自定义处理器。
   *
   * @param complete When supplied, a custom handler for a completion
   * notification from this emitter.
   *
   * 如果提供，则为这里发出的完成通知的自定义处理器。
   *
   */
  subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription;
}

class EventEmitter_ extends Subject<any> {
  __isAsync: boolean;  // tslint:disable-line

  constructor(isAsync: boolean = false) {
    super();
    this.__isAsync = isAsync;
  }

  emit(value?: any) {
    super.next(value);
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription {
    let schedulerFn: (t: any) => any;
    let errorFn = (err: any): any => null;
    let completeFn = (): any => null;

    if (generatorOrNext && typeof generatorOrNext === 'object') {
      schedulerFn = this.__isAsync ? (value: any) => {
        setTimeout(() => generatorOrNext.next(value));
      } : (value: any) => {
        generatorOrNext.next(value);
      };

      if (generatorOrNext.error) {
        errorFn = this.__isAsync ? (err) => {
          setTimeout(() => generatorOrNext.error(err));
        } : (err) => {
          generatorOrNext.error(err);
        };
      }

      if (generatorOrNext.complete) {
        completeFn = this.__isAsync ? () => {
          setTimeout(() => generatorOrNext.complete());
        } : () => {
          generatorOrNext.complete();
        };
      }
    } else {
      schedulerFn = this.__isAsync ? (value: any) => {
        setTimeout(() => generatorOrNext(value));
      } : (value: any) => {
        generatorOrNext(value);
      };

      if (error) {
        errorFn = this.__isAsync ? (err) => {
          setTimeout(() => error(err));
        } : (err) => {
          error(err);
        };
      }

      if (complete) {
        completeFn = this.__isAsync ? () => {
          setTimeout(() => complete());
        } : () => {
          complete();
        };
      }
    }

    const sink = super.subscribe(schedulerFn, errorFn, completeFn);

    if (generatorOrNext instanceof Subscription) {
      generatorOrNext.add(sink);
    }

    return sink;
  }
}

/**
 * @publicApi
 */
export const EventEmitter: {
  new (isAsync?: boolean): EventEmitter<any>; new<T>(isAsync?: boolean): EventEmitter<T>;
  readonly prototype: EventEmitter<any>;
} = EventEmitter_ as any;
