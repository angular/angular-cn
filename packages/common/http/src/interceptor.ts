/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
 * Intercepts and handles an `HttpRequest` or `HttpResponse`.
 *
 * 拦截 `HttpRequest` 并处理它们。
 *
 * Most interceptors transform the outgoing request before passing it to the
 * next interceptor in the chain, by calling `next.handle(transformedReq)`.
 * An interceptor may transform the
 * response event stream as well, by applying additional RxJS operators on the stream
 * returned by `next.handle()`.
 *
 * 大多数拦截器都会在外发的请求由 `next.handle(transformedReq)` 发给拦截器链中的下一个拦截器之前，对该请求进行转换。
 * 拦截器还可以通过为 `next.handle()` 返回的流添加额外的 RxJS 操作符，来对响应事件流进行转换。
 *
 * More rarely, an interceptor may handle the request entirely,
 * and compose a new event stream instead of invoking `next.handle()`. This is an
 * acceptable behavior, but keep in mind that further interceptors will be skipped entirely.
 *
 * 极少数情况下，拦截器也可以自己完全处理一个请求，并且组合出新的事件流来而不必调用 `next.handle()`。
 * 这也是允许的，不过要时刻记住，这将会完全跳过所有后继拦截器。
 *
 * It is also rare but valid for an interceptor to return multiple responses on the
 * event stream for a single request.
 *
 * 另一种同样罕见但是有用的拦截器，会为单个请求在事件流上给出多个响应对象。
 *
 * @publicApi
 *
 * @see [HTTP Guide](guide/http#intercepting-requests-and-responses)
 *
 * [HTTP 一章](guide/http#intercepting-requests-and-responses)
 *
 * @usageNotes
 *
 * To use the same instance of `HttpInterceptors` for the entire app, import the `HttpClientModule`
 * only in your `AppModule`, and add the interceptors to the root application injector .
 * If you import `HttpClientModule` multiple times across different modules (for example, in lazy
 * loading modules), each import creates a new copy of the `HttpClientModule`, which overwrites the
 * interceptors provided in the root module.
 *
 * 要想在整个应用中使用 `HttpInterceptors` 的同一个实例，就只能在 `AppModule` 模块中导入 `HttpClientModule`，并且把拦截器都添加到应用的根注入器中。
 * 如果你在不同的模块中多次导入 `HttpClientModule`，则每次导入都会创建 `HttpClientModule` 的一个新复本，它将会覆盖根模块上提供的那些拦截器。
 *
 */
export interface HttpInterceptor {
  /**
   * Identifies and handles a given HTTP request.
   * @param req The outgoing request object to handle.
   * @param next The next interceptor in the chain, or the backend
   * if no interceptors remain in the chain.
   * @returns An observable of the event stream.
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
 * A multi-provider token that represents the array of registered
 * `HttpInterceptor` objects.
 *
 *
 * 一个多重提供商（multi-provider）令牌，它代表所有已注册的 `HttpInterceptor` 构成的数组。
 *
 * @publicApi
 */
export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS');

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
