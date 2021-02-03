/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Injector} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * Interface for the events emitted through the NgElementStrategy.
 *
 * 通过 NgElementStrategy 发出的事件的接口。
 *
 * @publicApi
 */
export interface NgElementStrategyEvent {
  name: string;
  value: any;
}

/**
 * Underlying strategy used by the NgElement to create/destroy the component and react to input
 * changes.
 *
 * NgElement 用来创建/销毁组件并对输入更改做出反应的底层策略。
 *
 * @publicApi
 */
export interface NgElementStrategy {
  events: Observable<NgElementStrategyEvent>;

  connect(element: HTMLElement): void;
  disconnect(): void;
  getInputValue(propName: string): any;
  setInputValue(propName: string, value: string): void;
}

/**
 * Factory used to create new strategies for each NgElement instance.
 *
 * 本工厂用于为每个 NgElement 实例创建新策略。
 *
 * @publicApi
 */
export interface NgElementStrategyFactory {
  /**
   * Creates a new instance to be used for an NgElement.
   *
   * 创建一个用于 NgElement 的新实例。
   *
   */
  create(injector: Injector): NgElementStrategy;
}
