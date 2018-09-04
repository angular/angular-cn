/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpHandler} from './backend';
import {HttpRequest} from './request';
import {HttpEvent} from './response';

/**
 * Intercepts `HttpRequest` and handles them.
 *
 * 拦截 `HttpRequest` 并处理它们。
 *
 * Most interceptors will transform the outgoing request before passing it to the
 * next interceptor in the chain, by calling `next.handle(transformedReq)`.
 *
 * 大多数拦截器都会在外发的请求由 `next.handle(transformedReq)` 发给拦截器链中的下一个拦截器之前，对该请求进行转换。
 *
 * In rare cases, interceptors may wish to completely handle a request themselves,
 * and not delegate to the remainder of the chain. This behavior is allowed.
 *
 * 极少量情况下，拦截器也可能希望自己完全处理一个请求，而不再委托给拦截器链中的其它部分。这种行为也是允许的。
 *
 */
export interface HttpInterceptor {
  /**
   * Intercept an outgoing `HttpRequest` and optionally transform it or the
   * response.
   *
   * 拦截外发的 `HttpRequest`，并（可选的）转换它或转换响应对象。
   *
   * Typically an interceptor will transform the outgoing request before returning
   * `next.handle(transformedReq)`. An interceptor may choose to transform the
   * response event stream as well, by applying additional Rx operators on the stream
   * returned by `next.handle()`.
   *
   * 通常，拦截器将会在返回 `next.handle(transformedReq)` 之前转换外发请求。
   * 选择器也可以选择通过在 `next.handle()` 返回的流上应用 Rx 操作符（operator）来转换响应事件流。
   *
   * More rarely, an interceptor may choose to completely handle the request itself,
   * and compose a new event stream instead of invoking `next.handle()`. This is
   * acceptable behavior, but keep in mind further interceptors will be skipped entirely.
   *
   * 更罕见的情况下，拦截器可以选择完全由自己处理该请求，并合成新的事件流而不是调用 `next.handle()`。
   * 这种方式也是可以接受的，不过要记住这样做会完全忽略所有的后续拦截器。
   *
   * It is also rare but valid for an interceptor to return multiple responses on the
   * event stream for a single request.
   *
   * 另一种同样罕见但是有用的拦截器，会为单个请求在事件流上给出多个响应对象。
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}

/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 *
 * `HttpHandler` 会把 `HttpInterceptor` 应用到 `HttpRequest` 上。
 */
export class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 *
 *
 * 一个多重提供商（multi-provider）令牌，它代表所有已注册的 `HttpInterceptor` 构成的数组。
 *
 */
export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS');

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
