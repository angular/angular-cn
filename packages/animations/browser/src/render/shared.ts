/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {AUTO_STYLE, AnimationEvent, AnimationPlayer, NoopAnimationPlayer, ɵAnimationGroupPlayer, ɵPRE_STYLE as PRE_STYLE, ɵStyleData} from '@angular/animations';

import {AnimationStyleNormalizer} from '../../src/dsl/style_normalization/animation_style_normalizer';
import {AnimationDriver} from '../../src/render/animation_driver';

export function optimizeGroupPlayer(players: AnimationPlayer[]): AnimationPlayer {
  switch (players.length) {
    case 0:
      return new NoopAnimationPlayer();
    case 1:
      return players[0];
    default:
      return new ɵAnimationGroupPlayer(players);
  }
}

export function normalizeKeyframes(
    driver: AnimationDriver, normalizer: AnimationStyleNormalizer, element: any,
    keyframes: ɵStyleData[], preStyles: ɵStyleData = {},
    postStyles: ɵStyleData = {}): ɵStyleData[] {
  const errors: string[] = [];
  const normalizedKeyframes: ɵStyleData[] = [];
  let previousOffset = -1;
  let previousKeyframe: ɵStyleData|null = null;
  keyframes.forEach(kf => {
    const offset = kf['offset'] as number;
    const isSameOffset = offset == previousOffset;
    const normalizedKeyframe: ɵStyleData = (isSameOffset && previousKeyframe) || {};
    Object.keys(kf).forEach(prop => {
      let normalizedProp = prop;
      let normalizedValue = kf[prop];
      if (prop !== 'offset') {
        normalizedProp = normalizer.normalizePropertyName(normalizedProp, errors);
        switch (normalizedValue) {
          case PRE_STYLE:
            normalizedValue = preStyles[prop];
            break;

          case AUTO_STYLE:
            normalizedValue = postStyles[prop];
            break;

          default:
            normalizedValue =
                normalizer.normalizeStyleValue(prop, normalizedProp, normalizedValue, errors);
            break;
        }
      }
      normalizedKeyframe[normalizedProp] = normalizedValue;
    });
    if (!isSameOffset) {
      normalizedKeyframes.push(normalizedKeyframe);
    }
    previousKeyframe = normalizedKeyframe;
    previousOffset = offset;
  });
  if (errors.length) {
    const LINE_START = '\n - ';
    throw new Error(
        `Unable to animate due to the following errors:${LINE_START}${errors.join(LINE_START)}`);
  }

  return normalizedKeyframes;
}

export function listenOnPlayer(
    player: AnimationPlayer, eventName: string, event: AnimationEvent | undefined,
    callback: (event: any) => any) {
  switch (eventName) {
    case 'start':
      player.onStart(() => callback(event && copyAnimationEvent(event, 'start', player)));
      break;
    case 'done':
      player.onDone(() => callback(event && copyAnimationEvent(event, 'done', player)));
      break;
    case 'destroy':
      player.onDestroy(() => callback(event && copyAnimationEvent(event, 'destroy', player)));
      break;
  }
}

export function copyAnimationEvent(
    e: AnimationEvent, phaseName: string, player: AnimationPlayer): AnimationEvent {
  const totalTime = player.totalTime;
  const disabled = (player as any).disabled ? true : false;
  const event = makeAnimationEvent(
      e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName,
      totalTime == undefined ? e.totalTime : totalTime, disabled);
  const data = (e as any)['_data'];
  if (data != null) {
    (event as any)['_data'] = data;
  }
  return event;
}

export function makeAnimationEvent(
    element: any, triggerName: string, fromState: string, toState: string, phaseName: string = '',
    totalTime: number = 0, disabled?: boolean): AnimationEvent {
  return {element, triggerName, fromState, toState, phaseName, totalTime, disabled: !!disabled};
}

export function getOrSetAsInMap(
    map: Map<any, any>| {[key: string]: any}, key: any, defaultValue: any) {
  let value: any;
  if (map instanceof Map) {
    value = map.get(key);
    if (!value) {
      map.set(key, value = defaultValue);
    }
  } else {
    value = map[key];
    if (!value) {
      value = map[key] = defaultValue;
    }
  }
  return value;
}

export function parseTimelineCommand(command: string): [string, string] {
  const separatorPos = command.indexOf(':');
  const id = command.substring(1, separatorPos);
  const action = command.substr(separatorPos + 1);
  return [id, action];
}

let _contains: (elm1: any, elm2: any) => boolean = (elm1: any, elm2: any) => false;
let _matches: (element: any, selector: string) => boolean = (element: any, selector: string) =>
    false;
let _query: (element: any, selector: string, multi: boolean) => any[] =
    (element: any, selector: string, multi: boolean) => {
      return [];
    };

if (typeof Element != 'undefined') {
  // this is well supported in all browsers
  _contains = (elm1: any, elm2: any) => { return elm1.contains(elm2) as boolean; };

  if (Element.prototype.matches) {
    _matches = (element: any, selector: string) => element.matches(selector);
  } else {
    const proto = Element.prototype as any;
    const fn = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
    if (fn) {
      _matches = (element: any, selector: string) => fn.apply(element, [selector]);
    }
  }

  _query = (element: any, selector: string, multi: boolean): any[] => {
    let results: any[] = [];
    if (multi) {
      results.push(...element.querySelectorAll(selector));
    } else {
      const elm = element.querySelector(selector);
      if (elm) {
        results.push(elm);
      }
    }
    return results;
  };
}

function containsVendorPrefix(prop: string): boolean {
  // Webkit is the only real popular vendor prefix nowadays
  // cc: http://shouldiprefix.com/
  return prop.substring(1, 6) == 'ebkit';  // webkit or Webkit
}

let _CACHED_BODY: {style: any}|null = null;
let _IS_WEBKIT = false;
export function validateStyleProperty(prop: string): boolean {
  if (!_CACHED_BODY) {
    _CACHED_BODY = getBodyNode() || {};
    _IS_WEBKIT = _CACHED_BODY !.style ? ('WebkitAppearance' in _CACHED_BODY !.style) : false;
  }

  let result = true;
  if (_CACHED_BODY !.style && !containsVendorPrefix(prop)) {
    result = prop in _CACHED_BODY !.style;
    if (!result && _IS_WEBKIT) {
      const camelProp = 'Webkit' + prop.charAt(0).toUpperCase() + prop.substr(1);
      result = camelProp in _CACHED_BODY !.style;
    }
  }

  return result;
}

export function getBodyNode(): any|null {
  if (typeof document != 'undefined') {
    return document.body;
  }
  return null;
}

export const matchesElement = _matches;
export const containsElement = _contains;
export const invokeQuery = _query;
