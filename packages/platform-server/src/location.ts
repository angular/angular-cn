/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {LocationChangeEvent, LocationChangeListener, PlatformLocation} from '@angular/common';
import {Inject, Injectable, Optional} from '@angular/core';
import {DOCUMENT, ɵgetDOM as getDOM} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';
import * as url from 'url';
import {INITIAL_CONFIG, PlatformConfig} from './tokens';


function parseUrl(urlStr: string): {pathname: string, search: string, hash: string} {
  const parsedUrl = url.parse(urlStr);
  return {
    pathname: parsedUrl.pathname || '',
    search: parsedUrl.search || '',
    hash: parsedUrl.hash || '',
  };
}

/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
@Injectable()
export class ServerPlatformLocation implements PlatformLocation {
  public readonly pathname: string = '/';
  public readonly search: string = '';
  public readonly hash: string = '';
  private _hashUpdate = new Subject<LocationChangeEvent>();

  constructor(
      @Inject(DOCUMENT) private _doc: any, @Optional() @Inject(INITIAL_CONFIG) _config: any) {
    const config = _config as PlatformConfig | null;
    if (!!config && !!config.url) {
      const parsedUrl = parseUrl(config.url);
      this.pathname = parsedUrl.pathname;
      this.search = parsedUrl.search;
      this.hash = parsedUrl.hash;
    }
  }

  getBaseHrefFromDOM(): string { return getDOM().getBaseHref(this._doc) !; }

  onPopState(fn: LocationChangeListener): void {
    // No-op: a state stack is not implemented, so
    // no events will ever come.
  }

  onHashChange(fn: LocationChangeListener): void { this._hashUpdate.subscribe(fn); }

  get url(): string { return `${this.pathname}${this.search}${this.hash}`; }

  private setHash(value: string, oldUrl: string) {
    if (this.hash === value) {
      // Don't fire events if the hash has not changed.
      return;
    }
    (this as{hash: string}).hash = value;
    const newUrl = this.url;
    scheduleMicroTask(() => this._hashUpdate.next({
      type: 'hashchange', state: null, oldUrl, newUrl
    } as LocationChangeEvent));
  }

  replaceState(state: any, title: string, newUrl: string): void {
    const oldUrl = this.url;
    const parsedUrl = parseUrl(newUrl);
    (this as{pathname: string}).pathname = parsedUrl.pathname;
    (this as{search: string}).search = parsedUrl.search;
    this.setHash(parsedUrl.hash, oldUrl);
  }

  pushState(state: any, title: string, newUrl: string): void {
    this.replaceState(state, title, newUrl);
  }

  forward(): void { throw new Error('Not implemented'); }

  back(): void { throw new Error('Not implemented'); }
}

export function scheduleMicroTask(fn: Function) {
  Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
