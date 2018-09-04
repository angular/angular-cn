/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Route, UrlMatchResult} from './config';
import {UrlSegment, UrlSegmentGroup} from './url_tree';


/**
 * @description
 *
 * Name of the primary outlet.
 *
 *
 * 主路由出口的名字。
 *
 */
export const PRIMARY_OUTLET = 'primary';

/**
 * A collection of parameters.
 *
 *
 * 参数的集合。
 */
export type Params = {
  [key: string]: any
};

/**
 * Matrix and Query parameters.
 *
 * 矩阵参数（`;`）和查询参数（`?`）。
 *
 * `ParamMap` makes it easier to work with parameters as they could have either a single value or
 * multiple value. Because this should be known by the user, calling `get` or `getAll` returns the
 * correct type (either `string` or `string[]`).
 *
 * `ParamMap` 让参数更容易使用，因为它们可以有一个值或多个值。
 * 因为用户原本就该知道有一个还是多个，所以请通过调用 `get` 或 `getAll` 来返回正确的类型（`string` 或 `string[]`）。
 *
 * The API is inspired by the URLSearchParams interface.
 * see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 *
 *
 * 该 API 的设计受到了 URLSearchParams 接口的启发。
 * 参见 https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 *
 *
 */
export interface ParamMap {
  has(name: string): boolean;
  /**
   * Return a single value for the given parameter name:
   *
   * 返回具有指定参数名的单一值。
   *
   * - the value when the parameter has a single value,
   *
   *   当该参数只有一个单一值时，返回这个值，
   *
   * - the first value if the parameter has multiple values,
   *
   *   当该参数具有多个值时，返回第一个值，
   *
   * - `null` when there is no such parameter.
   *
   *   当没有参数时，返回 `null`。
   *
   */
  get(name: string): string|null;
  /**
   * Return an array of values for the given parameter name.
   *
   * 返回指定参数名的值数组。
   *
   * If there is no such parameter, an empty array is returned.
   *
   * 如果没有该参数，则返回一个空数组。
   */
  getAll(name: string): string[];

  /** Name of the parameters
   *
   * 所有参数名的数组。
   */
  readonly keys: string[];
}

class ParamsAsMap implements ParamMap {
  private params: Params;

  constructor(params: Params) { this.params = params || {}; }

  has(name: string): boolean { return this.params.hasOwnProperty(name); }

  get(name: string): string|null {
    if (this.has(name)) {
      const v = this.params[name];
      return Array.isArray(v) ? v[0] : v;
    }

    return null;
  }

  getAll(name: string): string[] {
    if (this.has(name)) {
      const v = this.params[name];
      return Array.isArray(v) ? v : [v];
    }

    return [];
  }

  get keys(): string[] { return Object.keys(this.params); }
}

/**
 * Convert a `Params` instance to a `ParamMap`.
 *
 *
 * 把 `Params` 实例转换成 `ParamMap` 实例。
 */
export function convertToParamMap(params: Params): ParamMap {
  return new ParamsAsMap(params);
}

const NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';

export function navigationCancelingError(message: string) {
  const error = Error('NavigationCancelingError: ' + message);
  (error as any)[NAVIGATION_CANCELING_ERROR] = true;
  return error;
}

export function isNavigationCancelingError(error: Error) {
  return error && (error as any)[NAVIGATION_CANCELING_ERROR];
}

// Matches the route configuration (`route`) against the actual URL (`segments`).
export function defaultUrlMatcher(
    segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult|null {
  const parts = route.path !.split('/');

  if (parts.length > segments.length) {
    // The actual URL is shorter than the config, no match
    return null;
  }

  if (route.pathMatch === 'full' &&
      (segmentGroup.hasChildren() || parts.length < segments.length)) {
    // The config is longer than the actual URL but we are looking for a full match, return null
    return null;
  }

  const posParams: {[key: string]: UrlSegment} = {};

  // Check each config part against the actual URL
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const segment = segments[index];
    const isParameter = part.startsWith(':');
    if (isParameter) {
      posParams[part.substring(1)] = segment;
    } else if (part !== segment.path) {
      // The actual URL part does not match the config, no match
      return null;
    }
  }

  return {consumed: segments.slice(0, parts.length), posParams};
}
