/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Observable} from 'rxjs';
import {HttpRequest} from './request';
import {HttpEvent} from './response';

/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * 把一个 `HttpRequest` 转换成 `HttpEvent` 组成的流，`HttpResponse` 就是其中之一。
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * `HttpHandler` 是可注入的。当被注入时，该处理器的实例会把请求派发给拦截器链中的第一个拦截器，第一个拦截器会再派发给第二个拦截器，以此类推。
 * 最终抵达 `HttpBackend`。
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * 在 `HttpInterceptor` 中，`HttpHandler` 参数就表示链中的下一个拦截器。
 *
 * @publicApi
 */
export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * 最后一个 `HttpHandler`，它将会把该请求通过浏览器的 HTTP API 发到后端。
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * 拦截器位于 `HttpClient` 接口和 `HttpBackend` 之间。
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * 当它被注入时，`HttpBackend` 会把请求直接发给后端，而不会经过拦截器链。
 *
 * @publicApi
 */
export abstract class HttpBackend implements HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
