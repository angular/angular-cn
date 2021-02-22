/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵgetDOM as getDOM} from '@angular/common';
import {Inject, Injectable, InjectionToken, NgZone} from '@angular/core';

/**
 * The injection token for the event-manager plug-in service.
 *
 * 事件管理器插件服务的注入令牌。
 *
 * @publicApi
 */
export const EVENT_MANAGER_PLUGINS =
    new InjectionToken<EventManagerPlugin[]>('EventManagerPlugins');

/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * 通过浏览器插件为 Angular 提供事件管理的可注入服务。
 *
 * @publicApi
 */
@Injectable()
export class EventManager {
  private _plugins: EventManagerPlugin[];
  private _eventNameToPlugin = new Map<string, EventManagerPlugin>();

  /**
   * Initializes an instance of the event-manager service.
   *
   * 初始化事件管理器服务的实例。
   *
   */
  constructor(@Inject(EVENT_MANAGER_PLUGINS) plugins: EventManagerPlugin[], private _zone: NgZone) {
    plugins.forEach(p => p.manager = this);
    this._plugins = plugins.slice().reverse();
  }

  /**
   * Registers a handler for a specific element and event.
   *
   * 注册特定元素和事件的处理器。
   *
   * @param element The HTML element to receive event notifications.
   *
   * 要接收事件通知的 HTML 元素。
   *
   * @param eventName The name of the event to listen for.
   *
   * 要监听的事件的名称。
   *
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   *
   * 通知发生时调用的函数。接收事件对象作为参数。
   *
   * @returns  A callback function that can be used to remove the handler.
   *
   * 可用于删除处理器的回调函数。
   *
   */
  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const plugin = this._findPluginFor(eventName);
    return plugin.addEventListener(element, eventName, handler);
  }

  /**
   * Registers a global handler for an event in a target view.
   *
   * 在目标视图中注册全局事件处理器。
   *
   * @param target A target for global event notifications. One of "window", "document", or "body".
   *
   * 全局事件通知的目标。 "window"、"document"、"body" 之一。
   *
   * @param eventName The name of the event to listen for.
   *
   * 要监听的事件的名称。
   *
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   *
   * 事件发生时要调用的函数。接收事件对象作为参数。
   *
   * @returns A callback function that can be used to remove the handler.
   *
   * 可用于删除处理器的回调函数。
   *
   */
  addGlobalEventListener(target: string, eventName: string, handler: Function): Function {
    const plugin = this._findPluginFor(eventName);
    return plugin.addGlobalEventListener(target, eventName, handler);
  }

  /**
   * Retrieves the compilation zone in which event listeners are registered.
   *
   * 检索在其中注册了事件侦听器的编译 Zone。
   *
   */
  getZone(): NgZone {
    return this._zone;
  }

  /** @internal */
  _findPluginFor(eventName: string): EventManagerPlugin {
    const plugin = this._eventNameToPlugin.get(eventName);
    if (plugin) {
      return plugin;
    }

    const plugins = this._plugins;
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];
      if (plugin.supports(eventName)) {
        this._eventNameToPlugin.set(eventName, plugin);
        return plugin;
      }
    }
    throw new Error(`No event manager plugin found for event ${eventName}`);
  }
}

export abstract class EventManagerPlugin {
  constructor(private _doc: any) {}

  // TODO(issue/24571): remove '!'.
  manager!: EventManager;

  abstract supports(eventName: string): boolean;

  abstract addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;

  addGlobalEventListener(element: string, eventName: string, handler: Function): Function {
    const target: HTMLElement = getDOM().getGlobalEventTarget(this._doc, element);
    if (!target) {
      throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    }
    return this.addEventListener(target, eventName, handler);
  }
}
