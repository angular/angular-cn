/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ResourceLoader} from '@angular/compiler';
import {ɵglobal as global} from '@angular/core';

/**
 * An implementation of ResourceLoader that uses a template cache to avoid doing an actual
 * ResourceLoader.
 *
 * ResourceLoader 的实现，该实现使用模板缓存来避免执行实际的 ResourceLoader。
 *
 * The template cache needs to be built and loaded into window.$templateCache
 * via a separate mechanism.
 *
 * 模板缓存需要通过单独的机制构建并加载到 `window.$templateCache` 中。
 *
 * @publicApi
 */
export class CachedResourceLoader extends ResourceLoader {
  private _cache: {[url: string]: string};

  constructor() {
    super();
    this._cache = (<any>global).$templateCache;
    if (this._cache == null) {
      throw new Error('CachedResourceLoader: Template cache was not found in $templateCache.');
    }
  }

  get(url: string): Promise<string> {
    if (this._cache.hasOwnProperty(url)) {
      return Promise.resolve(this._cache[url]);
    } else {
      return <Promise<any>>Promise.reject(
          'CachedResourceLoader: Did not find cached template for ' + url);
    }
  }
}
