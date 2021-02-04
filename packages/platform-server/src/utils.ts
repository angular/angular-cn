/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ApplicationRef, NgModuleFactory, NgModuleRef, PlatformRef, StaticProvider, Type, ɵisPromise} from '@angular/core';
import {ɵTRANSITION_ID} from '@angular/platform-browser';
import {first} from 'rxjs/operators';

import {PlatformState} from './platform_state';
import {platformDynamicServer, platformServer} from './server';
import {BEFORE_APP_SERIALIZED, INITIAL_CONFIG} from './tokens';

interface PlatformOptions {
  document?: string;
  url?: string;
  extraProviders?: StaticProvider[];
}

function _getPlatform(
    platformFactory: (extraProviders: StaticProvider[]) => PlatformRef,
    options: PlatformOptions): PlatformRef {
  const extraProviders = options.extraProviders ? options.extraProviders : [];
  return platformFactory([
    {provide: INITIAL_CONFIG, useValue: {document: options.document, url: options.url}},
    extraProviders
  ]);
}

function _render<T>(
    platform: PlatformRef, moduleRefPromise: Promise<NgModuleRef<T>>): Promise<string> {
  return moduleRefPromise.then((moduleRef) => {
    const transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
    if (!transitionId) {
      throw new Error(
          `renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
    }
    const applicationRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
    return applicationRef.isStable.pipe((first((isStable: boolean) => isStable)))
        .toPromise()
        .then(() => {
          const platformState = platform.injector.get(PlatformState);

          const asyncPromises: Promise<any>[] = [];

          // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
          const callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
          if (callbacks) {
            for (const callback of callbacks) {
              try {
                const callbackResult = callback();
                if (ɵisPromise(callbackResult)) {
                  // TODO: in TS3.7, callbackResult is void.
                  asyncPromises.push(callbackResult as any);
                }

              } catch (e) {
                // Ignore exceptions.
                console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
              }
            }
          }

          const complete = () => {
            const output = platformState.renderToString();
            platform.destroy();
            return output;
          };

          if (asyncPromises.length === 0) {
            return complete();
          }

          return Promise
              .all(asyncPromises.map(asyncPromise => {
                return asyncPromise.catch(e => {
                  console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
                });
              }))
              .then(complete);
        });
  });
}

/**
 * Renders a Module to string.
 *
 * 将模块渲染为字符串。
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * `document` 是要渲染的页面的完整文档 HTML，为字符串形式。`url` 是当前渲染请求的 URL。`extraProviders` 是当前渲染请求的平台级提供者。
 *
 * If compiling with the ViewEngine renderer, do not use this in a production server environment.
 * Use pre-compiled {@link NgModuleFactory} with {@link renderModuleFactory} instead. If
 * compiling with the Ivy renderer, this method is the recommended rendering method for
 * platform-server.
 *
 * 如果使用 ViewEngine 渲染器进行编译，请不要在生产服务器环境中使用它。而是将预编译的 {@link NgModuleFactory} 与 {@link renderModuleFactory} 一起使用。如果使用 Ivy 渲染器进行编译，则这是服务端平台的首选渲染方式。
 *
 * @publicApi
 */
export function renderModule<T>(
    module: Type<T>, options: {document?: string, url?: string, extraProviders?: StaticProvider[]}):
    Promise<string> {
  const platform = _getPlatform(platformDynamicServer, options);
  return _render(platform, platform.bootstrapModule(module));
}

/**
 * Renders a {@link NgModuleFactory} to string.
 *
 * 将 {@link NgModuleFactory} 渲染为字符串。
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * `document` 是要渲染的页面的完整文档 HTML，为字符串形式。`url` 是当前渲染请求的 URL。`extraProviders` 是当前渲染请求的平台级提供者。
 *
 * @publicApi
 */
export function renderModuleFactory<T>(
    moduleFactory: NgModuleFactory<T>,
    options: {document?: string, url?: string, extraProviders?: StaticProvider[]}):
    Promise<string> {
  const platform = _getPlatform(platformServer, options);
  return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}
