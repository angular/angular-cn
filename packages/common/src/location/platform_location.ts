/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable, InjectionToken, ɵɵinject} from '@angular/core';
import {getDOM} from '../dom_adapter';
import {DOCUMENT} from '../dom_tokens';

/**
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * 此类不应由应用程序开发人员直接使用。而应使用 {@link Location}。
 *
 * `PlatformLocation` encapsulates all calls to DOM APIs, which allows the Router to be
 * platform-agnostic.
 * This means that we can have different implementation of `PlatformLocation` for the different
 * platforms that Angular supports. For example, `@angular/platform-browser` provides an
 * implementation specific to the browser environment, while `@angular/platform-server` provides
 * one suitable for use with server-side rendering.
 *
 * `PlatformLocation` 封装了对 DOM API 的所有调用，这可以让路由器与平台无关。这意味着我们可以为 Angular 支持的不同平台提供 `PlatformLocation` 的不同实现。例如， `@angular/platform-browser` 提供了特定于浏览器环境的实现，而 `@angular/platform-server` 提供了适合与服务器端渲染一起使用的实现。
 *
 * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
 * when they need to interact with the DOM APIs like pushState, popState, etc.
 *
 * {@link LocationStrategy} 的所有实现在需要与 DOM API（例如 pushState，popState 等）进行交互时，都直接使用 `PlatformLocation`
 *
 * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
 * by the {@link Router} in order to navigate between routes. Since all interactions between {@link
 * Router} /
 * {@link Location} / {@link LocationStrategy} and DOM APIs flow through the `PlatformLocation`
 * class, they are all platform-agnostic.
 *
 * {@link LocationStrategy} 由 {@link Router} 直接使用的 {@link Location} 服务使用，以便在路由之间导航。由于 {@link Router} / {@link Location} / {@link LocationStrategy}与 DOM API 之间的所有交互都是通过 `PlatformLocation` 类进行的，因此它们都是与平台无关的。
 *
 * @publicApi
 */
@Injectable({
  providedIn: 'platform',
  // See #23917
  useFactory: useBrowserPlatformLocation
})
export abstract class PlatformLocation {
  abstract getBaseHrefFromDOM(): string;
  abstract getState(): unknown;
  abstract onPopState(fn: LocationChangeListener): void;
  abstract onHashChange(fn: LocationChangeListener): void;

  abstract get href(): string;
  abstract get protocol(): string;
  abstract get hostname(): string;
  abstract get port(): string;
  abstract get pathname(): string;
  abstract get search(): string;
  abstract get hash(): string;

  abstract replaceState(state: any, title: string, url: string): void;

  abstract pushState(state: any, title: string, url: string): void;

  abstract forward(): void;

  abstract back(): void;
}

export function useBrowserPlatformLocation() {
  return ɵɵinject(BrowserPlatformLocation);
}

/**
 * @description
 * Indicates when a location is initialized.
 *
 * 指示何时初始化 location。
 *
 * @publicApi
 */
export const LOCATION_INITIALIZED = new InjectionToken<Promise<any>>('Location Initialized');

/**
 * @description
 * A serializable version of the event from `onPopState` or `onHashChange`
 *
 * 来自 `onPopState` 或 `onHashChange` 的事件的可序列化版本
 *
 * @publicApi
 */
export interface LocationChangeEvent {
  type: string;
  state: any;
}

/**
 * @publicApi
 */
export interface LocationChangeListener {
  (event: LocationChangeEvent): any;
}



/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 */
@Injectable({
  providedIn: 'platform',
  // See #23917
  useFactory: createBrowserPlatformLocation,
})
export class BrowserPlatformLocation extends PlatformLocation {
  public readonly location!: Location;
  private _history!: History;

  constructor(@Inject(DOCUMENT) private _doc: any) {
    super();
    this._init();
  }

  // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
  /** @internal */
  _init() {
    (this as {location: Location}).location = getDOM().getLocation();
    this._history = getDOM().getHistory();
  }

  getBaseHrefFromDOM(): string {
    return getDOM().getBaseHref(this._doc)!;
  }

  onPopState(fn: LocationChangeListener): void {
    getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('popstate', fn, false);
  }

  onHashChange(fn: LocationChangeListener): void {
    getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('hashchange', fn, false);
  }

  get href(): string {
    return this.location.href;
  }
  get protocol(): string {
    return this.location.protocol;
  }
  get hostname(): string {
    return this.location.hostname;
  }
  get port(): string {
    return this.location.port;
  }
  get pathname(): string {
    return this.location.pathname;
  }
  get search(): string {
    return this.location.search;
  }
  get hash(): string {
    return this.location.hash;
  }
  set pathname(newPath: string) {
    this.location.pathname = newPath;
  }

  pushState(state: any, title: string, url: string): void {
    if (supportsState()) {
      this._history.pushState(state, title, url);
    } else {
      this.location.hash = url;
    }
  }

  replaceState(state: any, title: string, url: string): void {
    if (supportsState()) {
      this._history.replaceState(state, title, url);
    } else {
      this.location.hash = url;
    }
  }

  forward(): void {
    this._history.forward();
  }

  back(): void {
    this._history.back();
  }

  getState(): unknown {
    return this._history.state;
  }
}

export function supportsState(): boolean {
  return !!window.history.pushState;
}
export function createBrowserPlatformLocation() {
  return new BrowserPlatformLocation(ɵɵinject(DOCUMENT));
}
