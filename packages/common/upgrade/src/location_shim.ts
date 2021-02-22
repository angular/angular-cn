/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location, LocationStrategy, PlatformLocation} from '@angular/common';
import {UpgradeModule} from '@angular/upgrade/static';
import {ReplaySubject} from 'rxjs';

import {UrlCodec} from './params';
import {deepEqual, isAnchor, isPromise} from './utils';

const PATH_MATCH = /^([^?#]*)(\?([^#]*))?(#(.*))?$/;
const DOUBLE_SLASH_REGEX = /^\s*[\\/]{2,}/;
const IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
const DEFAULT_PORTS: {[key: string]: number} = {
  'http:': 80,
  'https:': 443,
  'ftp:': 21
};

/**
 * Location service that provides a drop-in replacement for the $location service
 * provided in AngularJS.
 *
 * 位置服务，提供对 AngularJS 中提供的 $location 服务的直接替代品。
 *
 * @see [Using the Angular Unified Location Service](guide/upgrade#using-the-unified-angular-location-service)
 *
 * [使用 Angular 统一位置服务](guide/upgrade#using-the-unified-angular-location-service)
 *
 * @publicApi
 */
export class $locationShim {
  private initalizing = true;
  private updateBrowser = false;
  private $$absUrl: string = '';
  private $$url: string = '';
  private $$protocol: string;
  private $$host: string = '';
  private $$port: number|null;
  private $$replace: boolean = false;
  private $$path: string = '';
  private $$search: any = '';
  private $$hash: string = '';
  private $$state: unknown;
  private $$changeListeners: [
    ((url: string, state: unknown, oldUrl: string, oldState: unknown, err?: (e: Error) => void) =>
         void),
    (e: Error) => void
  ][] = [];

  private cachedState: unknown = null;

  private urlChanges = new ReplaySubject<{newUrl: string, newState: unknown}>(1);

  constructor(
      $injector: any, private location: Location, private platformLocation: PlatformLocation,
      private urlCodec: UrlCodec, private locationStrategy: LocationStrategy) {
    const initialUrl = this.browserUrl();

    let parsedUrl = this.urlCodec.parse(initialUrl);

    if (typeof parsedUrl === 'string') {
      throw 'Invalid URL';
    }

    this.$$protocol = parsedUrl.protocol;
    this.$$host = parsedUrl.hostname;
    this.$$port = parseInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;

    this.$$parseLinkUrl(initialUrl, initialUrl);
    this.cacheState();
    this.$$state = this.browserState();

    this.location.onUrlChange((newUrl, newState) => {
      this.urlChanges.next({newUrl, newState});
    });

    if (isPromise($injector)) {
      $injector.then($i => this.initialize($i));
    } else {
      this.initialize($injector);
    }
  }

  private initialize($injector: any) {
    const $rootScope = $injector.get('$rootScope');
    const $rootElement = $injector.get('$rootElement');

    $rootElement.on('click', (event: any) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2 ||
          event.button === 2) {
        return;
      }

      let elm: (Node&ParentNode)|null = event.target;

      // traverse the DOM up to find first A tag
      while (elm && elm.nodeName.toLowerCase() !== 'a') {
        // ignore rewriting if no A tag (reached root element, or no parent - removed from document)
        if (elm === $rootElement[0] || !(elm = elm.parentNode)) {
          return;
        }
      }

      if (!isAnchor(elm)) {
        return;
      }

      const absHref = elm.href;
      const relHref = elm.getAttribute('href');

      // Ignore when url is started with javascript: or mailto:
      if (IGNORE_URI_REGEXP.test(absHref)) {
        return;
      }

      if (absHref && !elm.getAttribute('target') && !event.isDefaultPrevented()) {
        if (this.$$parseLinkUrl(absHref, relHref)) {
          // We do a preventDefault for all urls that are part of the AngularJS application,
          // in html5mode and also without, so that we are able to abort navigation without
          // getting double entries in the location history.
          event.preventDefault();
          // update location manually
          if (this.absUrl() !== this.browserUrl()) {
            $rootScope.$apply();
          }
        }
      }
    });

    this.urlChanges.subscribe(({newUrl, newState}) => {
      const oldUrl = this.absUrl();
      const oldState = this.$$state;
      this.$$parse(newUrl);
      newUrl = this.absUrl();
      this.$$state = newState;
      const defaultPrevented =
          $rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl, newState, oldState)
              .defaultPrevented;

      // if the location was changed by a `$locationChangeStart` handler then stop
      // processing this location change
      if (this.absUrl() !== newUrl) return;

      // If default was prevented, set back to old state. This is the state that was locally
      // cached in the $location service.
      if (defaultPrevented) {
        this.$$parse(oldUrl);
        this.state(oldState);
        this.setBrowserUrlWithFallback(oldUrl, false, oldState);
        this.$$notifyChangeListeners(this.url(), this.$$state, oldUrl, oldState);
      } else {
        this.initalizing = false;
        $rootScope.$broadcast('$locationChangeSuccess', newUrl, oldUrl, newState, oldState);
        this.resetBrowserUpdate();
      }
      if (!$rootScope.$$phase) {
        $rootScope.$digest();
      }
    });

    // update browser
    $rootScope.$watch(() => {
      if (this.initalizing || this.updateBrowser) {
        this.updateBrowser = false;

        const oldUrl = this.browserUrl();
        const newUrl = this.absUrl();
        const oldState = this.browserState();
        let currentReplace = this.$$replace;

        const urlOrStateChanged =
            !this.urlCodec.areEqual(oldUrl, newUrl) || oldState !== this.$$state;

        // Fire location changes one time to on initialization. This must be done on the
        // next tick (thus inside $evalAsync()) in order for listeners to be registered
        // before the event fires. Mimicing behavior from $locationWatch:
        // https://github.com/angular/angular.js/blob/master/src/ng/location.js#L983
        if (this.initalizing || urlOrStateChanged) {
          this.initalizing = false;

          $rootScope.$evalAsync(() => {
            // Get the new URL again since it could have changed due to async update
            const newUrl = this.absUrl();
            const defaultPrevented =
                $rootScope
                    .$broadcast('$locationChangeStart', newUrl, oldUrl, this.$$state, oldState)
                    .defaultPrevented;

            // if the location was changed by a `$locationChangeStart` handler then stop
            // processing this location change
            if (this.absUrl() !== newUrl) return;

            if (defaultPrevented) {
              this.$$parse(oldUrl);
              this.$$state = oldState;
            } else {
              // This block doesn't run when initalizing because it's going to perform the update to
              // the URL which shouldn't be needed when initalizing.
              if (urlOrStateChanged) {
                this.setBrowserUrlWithFallback(
                    newUrl, currentReplace, oldState === this.$$state ? null : this.$$state);
                this.$$replace = false;
              }
              $rootScope.$broadcast(
                  '$locationChangeSuccess', newUrl, oldUrl, this.$$state, oldState);
              if (urlOrStateChanged) {
                this.$$notifyChangeListeners(this.url(), this.$$state, oldUrl, oldState);
              }
            }
          });
        }
      }
      this.$$replace = false;
    });
  }

  private resetBrowserUpdate() {
    this.$$replace = false;
    this.$$state = this.browserState();
    this.updateBrowser = false;
    this.lastBrowserUrl = this.browserUrl();
  }

  private lastHistoryState: unknown;
  private lastBrowserUrl: string = '';
  private browserUrl(): string;
  private browserUrl(url: string, replace?: boolean, state?: unknown): this;
  private browserUrl(url?: string, replace?: boolean, state?: unknown) {
    // In modern browsers `history.state` is `null` by default; treating it separately
    // from `undefined` would cause `$browser.url('/foo')` to change `history.state`
    // to undefined via `pushState`. Instead, let's change `undefined` to `null` here.
    if (typeof state === 'undefined') {
      state = null;
    }

    // setter
    if (url) {
      let sameState = this.lastHistoryState === state;

      // Normalize the inputted URL
      url = this.urlCodec.parse(url).href;

      // Don't change anything if previous and current URLs and states match.
      if (this.lastBrowserUrl === url && sameState) {
        return this;
      }
      this.lastBrowserUrl = url;
      this.lastHistoryState = state;

      // Remove server base from URL as the Angular APIs for updating URL require
      // it to be the path+.
      url = this.stripBaseUrl(this.getServerBase(), url) || url;

      // Set the URL
      if (replace) {
        this.locationStrategy.replaceState(state, '', url, '');
      } else {
        this.locationStrategy.pushState(state, '', url, '');
      }

      this.cacheState();

      return this;
      // getter
    } else {
      return this.platformLocation.href;
    }
  }

  // This variable should be used *only* inside the cacheState function.
  private lastCachedState: unknown = null;
  private cacheState() {
    // This should be the only place in $browser where `history.state` is read.
    this.cachedState = this.platformLocation.getState();
    if (typeof this.cachedState === 'undefined') {
      this.cachedState = null;
    }

    // Prevent callbacks fo fire twice if both hashchange & popstate were fired.
    if (deepEqual(this.cachedState, this.lastCachedState)) {
      this.cachedState = this.lastCachedState;
    }

    this.lastCachedState = this.cachedState;
    this.lastHistoryState = this.cachedState;
  }

  /**
   * This function emulates the $browser.state() function from AngularJS. It will cause
   * history.state to be cached unless changed with deep equality check.
   *
   * 此函数模拟 AngularJS 中的 $browser.state() 函数。除非使用深度相等性检查进行更改，否则它将导致 history.state 被缓存。
   *
   */
  private browserState(): unknown {
    return this.cachedState;
  }

  private stripBaseUrl(base: string, url: string) {
    if (url.startsWith(base)) {
      return url.substr(base.length);
    }
    return undefined;
  }

  private getServerBase() {
    const {protocol, hostname, port} = this.platformLocation;
    const baseHref = this.locationStrategy.getBaseHref();
    let url = `${protocol}//${hostname}${port ? ':' + port : ''}${baseHref || '/'}`;
    return url.endsWith('/') ? url : url + '/';
  }

  private parseAppUrl(url: string) {
    if (DOUBLE_SLASH_REGEX.test(url)) {
      throw new Error(`Bad Path - URL cannot start with double slashes: ${url}`);
    }

    let prefixed = (url.charAt(0) !== '/');
    if (prefixed) {
      url = '/' + url;
    }
    let match = this.urlCodec.parse(url, this.getServerBase());
    if (typeof match === 'string') {
      throw new Error(`Bad URL - Cannot parse URL: ${url}`);
    }
    let path =
        prefixed && match.pathname.charAt(0) === '/' ? match.pathname.substring(1) : match.pathname;
    this.$$path = this.urlCodec.decodePath(path);
    this.$$search = this.urlCodec.decodeSearch(match.search);
    this.$$hash = this.urlCodec.decodeHash(match.hash);

    // make sure path starts with '/';
    if (this.$$path && this.$$path.charAt(0) !== '/') {
      this.$$path = '/' + this.$$path;
    }
  }

  /**
   * Registers listeners for URL changes. This API is used to catch updates performed by the
   * AngularJS framework. These changes are a subset of the `$locationChangeStart` and
   * `$locationChangeSuccess` events which fire when AngularJS updates its internally-referenced
   * version of the browser URL.
   *
   * 注册对 URL 更改的监听器。该 API 用于捕获 AngularJS 框架执行的更新。`$locationChangeStart` 和 `$locationChangeSuccess` 事件的子集，这些事件在 AngularJS 更新其内部引用的浏览器 URL 版本时触发。
   *
   * It's possible for `$locationChange` events to happen, but for the browser URL
   * (window.location) to remain unchanged. This `onChange` callback will fire only when AngularJS
   * actually updates the browser URL (window.location).
   *
   * `$locationChange` 事件有可能发生，但浏览器的 URL（window.location）保持不变。仅当 AngularJS 实际上更新浏览器 URL（window.location）时，才会触发此 `onChange`
   *
   * @param fn The callback function that is triggered for the listener when the URL changes.
   *
   * URL 更改时为监听器触发的回调函数。
   *
   * @param err The callback function that is triggered when an error occurs.
   *
   * 发生错误时触发的回调函数。
   *
   */
  onChange(
      fn: (url: string, state: unknown, oldUrl: string, oldState: unknown) => void,
      err: (e: Error) => void = (e: Error) => {}) {
    this.$$changeListeners.push([fn, err]);
  }

  /** @internal */
  $$notifyChangeListeners(
      url: string = '', state: unknown, oldUrl: string = '', oldState: unknown) {
    this.$$changeListeners.forEach(([fn, err]) => {
      try {
        fn(url, state, oldUrl, oldState);
      } catch (e) {
        err(e);
      }
    });
  }

  /**
   * Parses the provided URL, and sets the current URL to the parsed result.
   *
   * 解析此 URL，并将当前 URL 设置为解析结果。
   *
   * @param url The URL string.
   *
   * URL 字符串。
   *
   */
  $$parse(url: string) {
    let pathUrl: string|undefined;
    if (url.startsWith('/')) {
      pathUrl = url;
    } else {
      // Remove protocol & hostname if URL starts with it
      pathUrl = this.stripBaseUrl(this.getServerBase(), url);
    }
    if (typeof pathUrl === 'undefined') {
      throw new Error(`Invalid url "${url}", missing path prefix "${this.getServerBase()}".`);
    }

    this.parseAppUrl(pathUrl);

    if (!this.$$path) {
      this.$$path = '/';
    }
    this.composeUrls();
  }

  /**
   * Parses the provided URL and its relative URL.
   *
   * 解析提供的 URL 及其相对 URL。
   *
   * @param url The full URL string.
   *
   * 完整的 URL 字符串。
   *
   * @param relHref A URL string relative to the full URL string.
   *
   * 相对于完整 URL 字符串的 URL 字符串。
   *
   */
  $$parseLinkUrl(url: string, relHref?: string|null): boolean {
    // When relHref is passed, it should be a hash and is handled separately
    if (relHref && relHref[0] === '#') {
      this.hash(relHref.slice(1));
      return true;
    }
    let rewrittenUrl;
    let appUrl = this.stripBaseUrl(this.getServerBase(), url);
    if (typeof appUrl !== 'undefined') {
      rewrittenUrl = this.getServerBase() + appUrl;
    } else if (this.getServerBase() === url + '/') {
      rewrittenUrl = this.getServerBase();
    }
    // Set the URL
    if (rewrittenUrl) {
      this.$$parse(rewrittenUrl);
    }
    return !!rewrittenUrl;
  }

  private setBrowserUrlWithFallback(url: string, replace: boolean, state: unknown) {
    const oldUrl = this.url();
    const oldState = this.$$state;
    try {
      this.browserUrl(url, replace, state);

      // Make sure $location.state() returns referentially identical (not just deeply equal)
      // state object; this makes possible quick checking if the state changed in the digest
      // loop. Checking deep equality would be too expensive.
      this.$$state = this.browserState();
    } catch (e) {
      // Restore old values if pushState fails
      this.url(oldUrl);
      this.$$state = oldState;

      throw e;
    }
  }

  private composeUrls() {
    this.$$url = this.urlCodec.normalize(this.$$path, this.$$search, this.$$hash);
    this.$$absUrl = this.getServerBase() + this.$$url.substr(1);  // remove '/' from front of URL
    this.updateBrowser = true;
  }

  /**
   * Retrieves the full URL representation with all segments encoded according to
   * rules specified in
   * [RFC 3986](https://tools.ietf.org/html/rfc3986).
   *
   * 检索完整的 URL 表示形式，其中包含根据 [RFC 3986 中](https://tools.ietf.org/html/rfc3986) 指定的规则编码过的所有段。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let absUrl = $location.absUrl();
   * // => "http://example.com/#/some/path?foo=bar&baz=xoxo"
   * ```
   */
  absUrl(): string {
    return this.$$absUrl;
  }

  /**
   * Retrieves the current URL, or sets a new URL. When setting a URL,
   * changes the path, search, and hash, and returns a reference to its own instance.
   *
   * 检索当前 URL，或设置新 URL。设置 URL 时，更改路径、搜索和哈希，并返回对其自身实例的引用。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let url = $location.url();
   * // => "/some/path?foo=bar&baz=xoxo"
   * ```
   */
  url(): string;
  url(url: string): this;
  url(url?: string): string|this {
    if (typeof url === 'string') {
      if (!url.length) {
        url = '/';
      }

      const match = PATH_MATCH.exec(url);
      if (!match) return this;
      if (match[1] || url === '') this.path(this.urlCodec.decodePath(match[1]));
      if (match[2] || match[1] || url === '') this.search(match[3] || '');
      this.hash(match[5] || '');

      // Chainable method
      return this;
    }

    return this.$$url;
  }

  /**
   * Retrieves the protocol of the current URL.
   *
   * 检索当前 URL 的协议。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let protocol = $location.protocol();
   * // => "http"
   * ```
   */
  protocol(): string {
    return this.$$protocol;
  }

  /**
   * Retrieves the protocol of the current URL.
   *
   * 检索当前 URL 的协议。
   *
   * In contrast to the non-AngularJS version `location.host` which returns `hostname:port`, this
   * returns the `hostname` portion only.
   *
   * 与非 AngularJS 版本不同，其 `location.host` 会返回 `hostname:port` ，而这里会返回 `hostname` 部分。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let host = $location.host();
   * // => "example.com"
   *
   * // given URL http://user:password@example.com:8080/#/some/path?foo=bar&baz=xoxo
   * host = $location.host();
   * // => "example.com"
   * host = location.host;
   * // => "example.com:8080"
   * ```
   */
  host(): string {
    return this.$$host;
  }

  /**
   * Retrieves the port of the current URL.
   *
   * 检索当前 URL 的端口。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let port = $location.port();
   * // => 80
   * ```
   */
  port(): number|null {
    return this.$$port;
  }

  /**
   * Retrieves the path of the current URL, or changes the path and returns a reference to its own
   * instance.
   *
   * 检索当前 URL 的路径，或更改路径并返回对其自身实例的引用。
   *
   * Paths should always begin with forward slash (/). This method adds the forward slash
   * if it is missing.
   *
   * 路径应始终以正斜杠（/）开头。如果缺少此斜杠，则此方法将添加它。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let path = $location.path();
   * // => "/some/path"
   * ```
   */
  path(): string;
  path(path: string|number|null): this;
  path(path?: string|number|null): string|this {
    if (typeof path === 'undefined') {
      return this.$$path;
    }

    // null path converts to empty string. Prepend with "/" if needed.
    path = path !== null ? path.toString() : '';
    path = path.charAt(0) === '/' ? path : '/' + path;

    this.$$path = path;

    this.composeUrls();
    return this;
  }

  /**
   * Retrieves a map of the search parameters of the current URL, or changes a search
   * part and returns a reference to its own instance.
   *
   * 检索当前 URL 的搜索参数的映射，或更改搜索部分并返回对其自身实例的引用。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let searchObject = $location.search();
   * // => {foo: 'bar', baz: 'xoxo'}
   *
   * // set foo to 'yipee'
   * $location.search('foo', 'yipee');
   * // $location.search() => {foo: 'yipee', baz: 'xoxo'}
   * ```
   *
   * @param {string|Object.<string>|Object.<Array.<string>>} search New search params - string or
   * hash object.
   *
   * 新的搜索参数-字符串或哈希对象。
   *
   * When called with a single argument the method acts as a setter, setting the `search` component
   * of `$location` to the specified value.
   *
   * 当使用单个参数调用它时，该方法会充当设置器，将 `$location` 的 `search` 组件设置为指定值。
   *
   * If the argument is a hash object containing an array of values, these values will be encoded
   * as duplicate search parameters in the URL.
   *
   * 如果参数是包含值数组的哈希对象，则这些值将被编码为 URL 中的重复搜索参数。
   *
   * @param {(string|Number|Array<string>|boolean)=} paramValue If `search` is a string or number,
   *     then `paramValue`
   * will override only a single search property.
   *
   * 如果 `search` 是字符串或数字，则 `paramValue` 将仅覆盖单个搜索属性。
   *
   * If `paramValue` is an array, it will override the property of the `search` component of
   * `$location` specified via the first argument.
   *
   * 如果 `paramValue` 是一个数组，它将覆盖通过第一个参数指定的 `$location` 的 `search` 的部分。
   *
   * If `paramValue` is `null`, the property specified via the first argument will be deleted.
   *
   * 如果 `paramValue` 为 `null` ，则将删除通过第一个参数指定的属性。
   *
   * If `paramValue` is `true`, the property specified via the first argument will be added with no
   * value nor trailing equal sign.
   *
   * 如果 `paramValue` 为 `true` ，则将通过第一个参数指定的属性添加为无值或结尾等号。
   *
   * @return {Object} The parsed `search` object of the current URL, or the changed `search` object.
   *
   * 当前 URL 的已解析 `search` 对象，或更改后的 `search` 对象。
   */
  search(): {[key: string]: unknown};
  search(search: string|number|{[key: string]: unknown}): this;
  search(
      search: string|number|{[key: string]: unknown},
      paramValue: null|undefined|string|number|boolean|string[]): this;
  search(
      search?: string|number|{[key: string]: unknown},
      paramValue?: null|undefined|string|number|boolean|string[]): {[key: string]: unknown}|this {
    switch (arguments.length) {
      case 0:
        return this.$$search;
      case 1:
        if (typeof search === 'string' || typeof search === 'number') {
          this.$$search = this.urlCodec.decodeSearch(search.toString());
        } else if (typeof search === 'object' && search !== null) {
          // Copy the object so it's never mutated
          search = {...search};
          // remove object undefined or null properties
          for (const key in search) {
            if (search[key] == null) delete search[key];
          }

          this.$$search = search;
        } else {
          throw new Error(
              'LocationProvider.search(): First argument must be a string or an object.');
        }
        break;
      default:
        if (typeof search === 'string') {
          const currentSearch = this.search();
          if (typeof paramValue === 'undefined' || paramValue === null) {
            delete currentSearch[search];
            return this.search(currentSearch);
          } else {
            currentSearch[search] = paramValue;
            return this.search(currentSearch);
          }
        }
    }
    this.composeUrls();
    return this;
  }

  /**
   * Retrieves the current hash fragment, or changes the hash fragment and returns a reference to
   * its own instance.
   *
   * 检索当前哈希片段，或更改哈希片段并返回对其自身实例的引用。
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo#hashValue
   * let hash = $location.hash();
   * // => "hashValue"
   * ```
   */
  hash(): string;
  hash(hash: string|number|null): this;
  hash(hash?: string|number|null): string|this {
    if (typeof hash === 'undefined') {
      return this.$$hash;
    }

    this.$$hash = hash !== null ? hash.toString() : '';

    this.composeUrls();
    return this;
  }

  /**
   * Changes to `$location` during the current `$digest` will replace the current
   * history record, instead of adding a new one.
   *
   * 当前 `$digest` 期间对 `$location` 更改将替换当前历史记录，而不是添加新的记录。
   *
   */
  replace(): this {
    this.$$replace = true;
    return this;
  }

  /**
   * Retrieves the history state object when called without any parameter.
   *
   * 当不带任何参数调用时将检索历史状态对象。
   *
   * Change the history state object when called with one parameter and return `$location`.
   * The state object is later passed to `pushState` or `replaceState`.
   *
   * 使用一个参数调用时将更改历史状态对象，并返回 `$location` 。状态对象随后传递给 `pushState` 或 `replaceState` 。
   *
   * This method is supported only in HTML5 mode and only in browsers supporting
   * the HTML5 History API methods such as `pushState` and `replaceState`. If you need to support
   * older browsers (like Android < 4.0), don't use this method.
   *
   * 仅在 HTML5 模式下以及在支持 HTML5 History API 方法（例如 `pushState` 和 `replaceState`）的浏览器中才支持此方法。如果你需要支持较旧的浏览器（例如 Android &lt;4.0），请不要使用此方法。
   */
  state(): unknown;
  state(state: unknown): this;
  state(state?: unknown): unknown|this {
    if (typeof state === 'undefined') {
      return this.$$state;
    }

    this.$$state = state;
    return this;
  }
}

/**
 * The factory function used to create an instance of the `$locationShim` in Angular,
 * and provides an API-compatiable `$locationProvider` for AngularJS.
 *
 * Angular 中用于创建 `$locationShim` 实例的工厂函数，并为 AngularJS 提供与 API 兼容的 `$locationProvider`。
 *
 * @publicApi
 */
export class $locationShimProvider {
  constructor(
      private ngUpgrade: UpgradeModule, private location: Location,
      private platformLocation: PlatformLocation, private urlCodec: UrlCodec,
      private locationStrategy: LocationStrategy) {}

  /**
   * Factory method that returns an instance of the $locationShim
   *
   * 返回 $locationShim 实例的工厂方法
   *
   */
  $get() {
    return new $locationShim(
        this.ngUpgrade.$injector, this.location, this.platformLocation, this.urlCodec,
        this.locationStrategy);
  }

  /**
   * Stub method used to keep API compatible with AngularJS. This setting is configured through
   * the LocationUpgradeModule's `config` method in your Angular app.
   *
   * 用于使 API 与 AngularJS 兼容的存根方法。此设置是通过 Angular 应用中 LocationUpgradeModule 的 `config` 方法配置的。
   *
   */
  hashPrefix(prefix?: string) {
    throw new Error('Configure LocationUpgrade through LocationUpgradeModule.config method.');
  }

  /**
   * Stub method used to keep API compatible with AngularJS. This setting is configured through
   * the LocationUpgradeModule's `config` method in your Angular app.
   *
   * 用于使 API 与 AngularJS 兼容的存根方法。此设置是通过 Angular 应用中 LocationUpgradeModule 的 `config` 方法配置的。
   *
   */
  html5Mode(mode?: any) {
    throw new Error('Configure LocationUpgrade through LocationUpgradeModule.config method.');
  }
}
