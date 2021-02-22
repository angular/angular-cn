/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT, ɵgetDOM as getDOM} from '@angular/common';
import {Inject, Injectable, NgZone} from '@angular/core';
import {EventManagerPlugin} from './event_manager';

/**
 * Defines supported modifiers for key events.
 */
const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];

const DOM_KEY_LOCATION_NUMPAD = 3;

// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
const _keyMap: {[k: string]: string} = {
  // The following values are here for cross-browser compatibility and to match the W3C standard
  // cf https://www.w3.org/TR/DOM-Level-3-Events-key/
  '\b': 'Backspace',
  '\t': 'Tab',
  '\x7F': 'Delete',
  '\x1B': 'Escape',
  'Del': 'Delete',
  'Esc': 'Escape',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Menu': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'Win': 'OS'
};

// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
const _chromeNumKeyPadMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6',
  'G': '7',
  'H': '8',
  'I': '9',
  'J': '*',
  'K': '+',
  'M': '-',
  'N': '.',
  'O': '/',
  '\x60': '0',
  '\x90': 'NumLock'
};


/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS: {[key: string]: (event: KeyboardEvent) => boolean} = {
  'alt': (event: KeyboardEvent) => event.altKey,
  'control': (event: KeyboardEvent) => event.ctrlKey,
  'meta': (event: KeyboardEvent) => event.metaKey,
  'shift': (event: KeyboardEvent) => event.shiftKey
};

/**
 * A browser plug-in that provides support for handling of key events in Angular.
 *
 * 一个浏览器插件，用来为 Angular 中的键盘事件处理提供支持。
 *
 * @publicApi
 */
@Injectable()
export class KeyEventsPlugin extends EventManagerPlugin {
  /**
   * Initializes an instance of the browser plug-in.
   *
   * 初始化浏览器插件的实例。
   *
   * @param doc The document in which key events will be detected.
   *
   * 要检测键盘事件的 document。
   *
   */
  constructor(@Inject(DOCUMENT) doc: any) {
    super(doc);
  }

  /**
   * Reports whether a named key event is supported.
   *
   * 报告是否支持指定名字的键盘事件。
   *
   * @param eventName The event name to query.
   *
   * 要查询的事件名称。
   *
   * @return True if the named key event is supported.
   *
   * 如果支持这个名字的键盘事件，则为 True。
   *
   */
  supports(eventName: string): boolean {
    return KeyEventsPlugin.parseEventName(eventName) != null;
  }

  /**
   * Registers a handler for a specific element and key event.
   *
   * 注册特定元素和键盘事件的处理器。
   *
   * @param element The HTML element to receive event notifications.
   *
   * 要接收事件通知的 HTML 元素。
   *
   * @param eventName The name of the key event to listen for.
   *
   * 要监听的键盘事件的名称。
   *
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   *
   * 当事件发生时要调用的函数。接收一个事件对象作为参数。
   *
   * @returns The key event that was registered.
   *
   * 已注册的键盘事件。
   *
   */
  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const parsedEvent = KeyEventsPlugin.parseEventName(eventName)!;

    const outsideHandler =
        KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());

    return this.manager.getZone().runOutsideAngular(() => {
      return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
    });
  }

  static parseEventName(eventName: string): {fullKey: string, domEventName: string}|null {
    const parts: string[] = eventName.toLowerCase().split('.');

    const domEventName = parts.shift();
    if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
      return null;
    }

    const key = KeyEventsPlugin._normalizeKey(parts.pop()!);

    let fullKey = '';
    MODIFIER_KEYS.forEach(modifierName => {
      const index: number = parts.indexOf(modifierName);
      if (index > -1) {
        parts.splice(index, 1);
        fullKey += modifierName + '.';
      }
    });
    fullKey += key;

    if (parts.length != 0 || key.length === 0) {
      // returning null instead of throwing to let another plugin process the event
      return null;
    }

    // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
    //       The code must remain in the `result['domEventName']` form.
    // return {domEventName, fullKey};
    const result: {fullKey: string, domEventName: string} = {} as any;
    result['domEventName'] = domEventName;
    result['fullKey'] = fullKey;
    return result;
  }

  static getEventFullKey(event: KeyboardEvent): string {
    let fullKey = '';
    let key = getEventKey(event);
    key = key.toLowerCase();
    if (key === ' ') {
      key = 'space';  // for readability
    } else if (key === '.') {
      key = 'dot';  // because '.' is used as a separator in event names
    }
    MODIFIER_KEYS.forEach(modifierName => {
      if (modifierName != key) {
        const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
        if (modifierGetter(event)) {
          fullKey += modifierName + '.';
        }
      }
    });
    fullKey += key;
    return fullKey;
  }

  /**
   * Configures a handler callback for a key event.
   *
   * 为键盘事件配置处理器回调。
   *
   * @param fullKey The event name that combines all simultaneous keystrokes.
   *
   * 组合了所有同时按下的键盘事件的名称。
   *
   * @param handler The function that responds to the key event.
   *
   * 响应键盘事件的函数。
   *
   * @param zone The zone in which the event occurred.
   *
   * 事件发生时所在的 Zone。
   *
   * @returns A callback function.
   *
   * 回调函数。
   *
   */
  static eventCallback(fullKey: any, handler: Function, zone: NgZone): Function {
    return (event: any /** TODO #9100 */) => {
      if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
        zone.runGuarded(() => handler(event));
      }
    };
  }

  /** @internal */
  static _normalizeKey(keyName: string): string {
    // TODO: switch to a Map if the mapping grows too much
    switch (keyName) {
      case 'esc':
        return 'escape';
      default:
        return keyName;
    }
  }
}

function getEventKey(event: any): string {
  let key = event.key;
  if (key == null) {
    key = event.keyIdentifier;
    // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
    // Safari cf
    // https://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
    if (key == null) {
      return 'Unidentified';
    }
    if (key.startsWith('U+')) {
      key = String.fromCharCode(parseInt(key.substring(2), 16));
      if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
        // There is a bug in Chrome for numeric keypad keys:
        // https://code.google.com/p/chromium/issues/detail?id=155654
        // 1, 2, 3 ... are reported as A, B, C ...
        key = (_chromeNumKeyPadMap as any)[key];
      }
    }
  }

  return _keyMap[key] || key;
}
