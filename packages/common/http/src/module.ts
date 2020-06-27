/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpBackend, HttpHandler} from './backend';
import {HttpClient} from './client';
import {HTTP_INTERCEPTORS, HttpInterceptor, HttpInterceptorHandler, NoopInterceptor} from './interceptor';
import {JsonpCallbackContext, JsonpClientBackend, JsonpInterceptor} from './jsonp';
import {HttpRequest} from './request';
import {HttpEvent} from './response';
import {BrowserXhr, HttpXhrBackend, XhrFactory} from './xhr';
import {HttpXsrfCookieExtractor, HttpXsrfInterceptor, HttpXsrfTokenExtractor, XSRF_COOKIE_NAME, XSRF_HEADER_NAME} from './xsrf';

/**
 * An injectable `HttpHandler` that applies multiple interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * 一个可注入的 `HttpHandler`，它可以在把请求传给指定的 `HttpBackend` 之前，使用多个拦截器对该请求进行处理。
 *
 * The interceptors are loaded lazily from the injector, to allow
 * interceptors to themselves inject classes depending indirectly
 * on `HttpInterceptingHandler` itself.
 *
 * 这些拦截器是由注入器惰性加载起来的，以便让这些拦截器可以把其它类作为依赖注入进来，
 * 还可以让它们间接注入 `HttpInterceptingHandler` 自己。
 *
 * @see `HttpInterceptor`
 */
@Injectable()
export class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler|null = null;

  constructor(private backend: HttpBackend, private injector: Injector) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
      this.chain = interceptors.reduceRight(
          (next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }
}

/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * 构造一个 `HttpHandler`，它会在把请求传给指定的 `HttpBackend` 之前，先对该请求应用各个拦截器。
 *
 * Use as a factory function within `HttpClientModule`.
 *
 * 在 `HttpClientModule` 中用作工厂函数。
 *
 */
export function interceptingHandler(
    backend: HttpBackend, interceptors: HttpInterceptor[]|null = []): HttpHandler {
  if (!interceptors) {
    return backend;
  }
  return interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor), backend);
}

/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * 一个工厂函数，用来决定在哪里保存 JSONP 回调。
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 * 原始的 JSONP 回调保存在 `window` 对象上，不过测试环境下可能不存在 `window` 对象。这时，回调就会转而保存在一个匿名对象上。
 *
 */
export function jsonpCallbackContext(): Object {
  if (typeof window === 'object') {
    return window;
  }
  return {};
}

/**
 * Configures XSRF protection support for outgoing requests.
 *
 * 配置 XSRF 保护，以支持外发请求。
 *
 * For a server that supports a cookie-based XSRF protection system,
 * use directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * 对于支持基于 Cookie 的 XSRF 保护系统的服务器来说，只要配置上正确的 Cookie 名和请求头的名字，就可以自动获得 XSRF 保护。
 *
 * If no names are supplied, the default cookie name is `XSRF-TOKEN`
 * and the default header name is `X-XSRF-TOKEN`.
 *
 * 如果没有提供名字，则默认的 Cookie 名是 `XSRF-TOKEN`，默认的请求头名字是 `X-XSRF-TOKEN`。
 *
 * @publicApi
 */
@NgModule({
  providers: [
    HttpXsrfInterceptor,
    {provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true},
    {provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor},
    {provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN'},
    {provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN'},
  ],
})
export class HttpClientXsrfModule {
  /**
   * Disable the default XSRF protection.
   *
   * 禁用默认的 XSRF 保护。
   */
  static disable(): ModuleWithProviders<HttpClientXsrfModule> {
    return {
      ngModule: HttpClientXsrfModule,
      providers: [
        {provide: HttpXsrfInterceptor, useClass: NoopInterceptor},
      ],
    };
  }

  /**
   * Configure XSRF protection.
   *
   * 配置 XSRF 保护。
   *
   * @param options An object that can specify either or both
   * cookie name or header name.
   *
   * 一个对象，可以指定 Cookie 名和/或请求头的名字。
   *
   * - Cookie name default is `XSRF-TOKEN`.
   *
   *   Cookie 名默认值是 `XSRF-TOKEN`。
   *
   * - Header name default is `X-XSRF-TOKEN`.
   *
   *   请求头的名字默认是 `X-XSRF-TOKEN`。
   *
   */
  static withOptions(options: {
    cookieName?: string,
    headerName?: string,
  } = {}): ModuleWithProviders<HttpClientXsrfModule> {
    return {
      ngModule: HttpClientXsrfModule,
      providers: [
        options.cookieName ? {provide: XSRF_COOKIE_NAME, useValue: options.cookieName} : [],
        options.headerName ? {provide: XSRF_HEADER_NAME, useValue: options.headerName} : [],
      ],
    };
  }
}

/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
 *
 * 为支持 XSRF 的 `HttpClient` 配置[依赖注入器](guide/glossary#injector)。它会被 `HttpClientModule` 自动导入。
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 *
 * 通过把拦截器提供为内置的 [DI 令牌](guide/glossary#di-token) `HTTP_INTERCEPTORS`（允许有多个），你可以把它们添加到 `HttpClient` 调用链的后面。
 *
 * @publicApi
 */
@NgModule({
  /**
   * Optional configuration for XSRF protection.
   *
   * 可选的 XSRF 保护的配置项。
   */
  imports: [
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  /**
   * Configures the [dependency injector](guide/glossary#injector) where it is imported
   * with supporting services for HTTP communications.
   *
   * 配置[依赖注入器](guide/glossary#injector)，其中导入了用于支持 HTTP通讯的服务。
   */
  providers: [
    HttpClient,
    {provide: HttpHandler, useClass: HttpInterceptingHandler},
    HttpXhrBackend,
    {provide: HttpBackend, useExisting: HttpXhrBackend},
    BrowserXhr,
    {provide: XhrFactory, useExisting: BrowserXhr},
  ],
})
export class HttpClientModule {
}

/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for JSONP.
 * Without this module, Jsonp requests reach the backend
 * with method JSONP, where they are rejected.
 *
 * 为支持 JSONP 的 `HttpClient` 配置[依赖注入器](guide/glossary#injector)。
 * 如果没有该模块，Jsonp 请求就会被发送到后端，然后被后端拒绝。
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 * 通过把拦截器提供为内置的 [DI 令牌](guide/glossary#di-token) `HTTP_INTERCEPTORS`（允许有多个），你可以把它们添加到 `HttpClient` 调用链的后面。
 *
 * @publicApi
 */
@NgModule({
  providers: [
    JsonpClientBackend,
    {provide: JsonpCallbackContext, useFactory: jsonpCallbackContext},
    {provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true},
  ],
})
export class HttpClientJsonpModule {
}
