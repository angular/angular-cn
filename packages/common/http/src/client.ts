/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular/core';
import {Observable, of } from 'rxjs';
import {concatMap, filter, map} from 'rxjs/operators';

import {HttpHandler} from './backend';
import {HttpHeaders} from './headers';
import {HttpParams, HttpParamsOptions} from './params';
import {HttpRequest} from './request';
import {HttpEvent, HttpResponse} from './response';


/**
 * Constructs an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. This function clones the object and adds the body.
 */
function addBody<T>(
    options: {
      headers?: HttpHeaders | {[header: string]: string | string[]},
      observe?: HttpObserve,
      params?: HttpParams | {[param: string]: string | string[]},
      reportProgress?: boolean,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
      withCredentials?: boolean,
    },
    body: T | null): any {
  return {
    body,
    headers: options.headers,
    observe: options.observe,
    params: options.params,
    reportProgress: options.reportProgress,
    responseType: options.responseType,
    withCredentials: options.withCredentials,
  };
}

export type HttpObserve = 'body' | 'events' | 'response';

/**
 * Performs HTTP requests.
 *
 * 执行 HTTP 请求。
 *
 * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies based on
 * the signature that is called (mainly the values of `observe` and `responseType`).
 *
 *
 * @see [HTTP Guide](guide/http)
 *
 *
 * @usageNotes
 * Sample HTTP requests for the [Tour of Heroes](/tutorial/toh-pt0) application.
 *
 * ### HTTP Request Example
 *
 * ```
 *  // GET heroes whose name contains search term
 * searchHeroes(term: string): observable<Hero[]>{
 *
 *  const params = new HttpParams({fromString: 'name=term'});
 *    return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
 * }
 * ```
 * ### JSONP Example
 * ```
 * requestJsonp(url, callback = 'callback') {
 *  return this.httpClient.jsonp(this.heroesURL, callback);
 * }
 * ```
 *
 *
 * ### PATCH Example
 * ```
 * // PATCH one of the heroes' name
 * patchHero (id: number, heroName: string): Observable<{}> {
 * const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
 *  return this.httpClient.patch(url, {name: heroName}, httpOptions)
 *    .pipe(catchError(this.handleError('patchHero')));
 * }
* ```
 *
 * @publicApi
 */
@Injectable()
export class HttpClient {
  constructor(private handler: HttpHandler) {}

  /**
   * Sends an `HTTPRequest` and returns a stream of `HTTPEvents`.
   *
   * 发送指定的 `HttpRequest` 并返回一个由 `HTTPEvents` 组成的流。
   *
   * @return An `Observable` of the response, with the response body as a stream of `HTTPEvents`.
   *
   * 一个由响应组成的 `Observable`，其响应体是 `HTTPEvents` 组成的流。
   */
  request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>;

  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the response in an
   * `ArrayBuffer`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a request that interprets the body as a blob and returns
   * the response as a blob.
   *
   * 构造一个请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a request that interprets the body as a text string and
   * returns a string value.
   *
   * 构造一个请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the
   * the full event stream.
   *
   * 构造一个请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as an array of `HTTPEvents` for the
   * request.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | string[]},
    observe: 'events', reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a request that interprets the body as a `Blob` and returns
   * the full event stream.
   *
   * 构造一个请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of of all `HttpEvents` for the request,
   * with the response body of type `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a request which interprets the body as a text string and returns the full event stream.
   *
   * 构造一个请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvents` for the reques,
   * with the response body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full event stream.
   *
   * 构造一个请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the  request.
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   *  with the response body of type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean,
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<any>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full event stream.
   *
   * 构造一个请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body of type `R`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `R` 型的。
   */
  request<R>(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean,
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<R>>;

  /**
   * Constructs a request which interprets the body as an `ArrayBuffer`
   * and returns the full `HTTPResponse`.
   *
   * 构造一个请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a request which interprets the body as a `Blob` and returns the full `HTTPResponse`.
   *
   * 构造一个请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a request which interprets the body as a text stream and returns the full `HTTPResponse`.
   *
   * 构造一个请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the HTTP response, with the response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full `HTTPResponse`.
   *
   * 构造一个请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HTTPResponse`,
   * with the response body of type `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean,
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns
   * the full `HTTPResponse` with the response body in the requested type.
   *
   * 构造一个请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return  An `Observable` of the full `HTTPResponse`, with the response body of type `R`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `R` 型的。
   */
  request<R>(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean,
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<R>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full
   * `HTTPResponse` as a JSON object.
   *
   * 构造一个请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  request(method: string, url: string, options?: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    reportProgress?: boolean,
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a request which interprets the body as a JSON object
   * with the response body of the requested type.
   *
   * 构造一个请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `R`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `R` 型的。
   */
  request<R>(method: string, url: string, options?: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    reportProgress?: boolean,
    withCredentials?: boolean,
  }): Observable<R>;

  /**
   * Constructs a request where response type and requested observable are not known statically.
   *
   * 以某种方式构造请求，其响应类型和所请求的 `Observable` 都是无法静态获知的。
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the reuested response, wuth body of type `any`.
   *
   * 所请求的任意 `Observable`，其类型是 `any`。
   */
  request(method: string, url: string, options?: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | string[]},
    observe?: HttpObserve,
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }): Observable<any>;

  /**
   * Constructs an observable for a generic HTTP request that, when subscribed,
   * fires the request through the chain of registered interceptors and on to the
   * server.
   *
   * 为一个特定的 HTTP 请求构造一个 `Observable`，当它被订阅时，就触发该请求，经过一系列已注册的拦截器的处理之后，最终发给服务器。
   *
   * You can pass an `HttpRequest` directly as the only parameter. In this case,
   * the call returns an observable of the raw `HttpEvent` stream.
   *
   * Alternatively you can pass an HTTP method as the first parameter,
   * a URL string as the second, and an options hash containing the request body as the third.
   * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
   * type of returned observable.
   *   * The `responseType` value determines how a successful response body is parsed.
   *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
   * object as a type parameter to the call.
   *
   * The `observe` value determines the return type, according to what you are interested in
   * observing.
   *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
   * progress events by default.
   *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
   * where the `T` parameter depends on the `responseType` and any optionally provided type
   * parameter.
   *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
   *
   */
  request(first: string|HttpRequest<any>, url?: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    let req: HttpRequest<any>;
    // First, check whether the primary argument is an instance of `HttpRequest`.
    if (first instanceof HttpRequest) {
      // It is. The other arguments must be undefined (per the signatures) and can be
      // ignored.
      req = first as HttpRequest<any>;
    } else {
      // It's a string, so it represents a URL. Construct a request based on it,
      // and incorporate the remaining arguments (assuming `GET` unless a method is
      // provided.

      // Figure out the headers.
      let headers: HttpHeaders|undefined = undefined;
      if (options.headers instanceof HttpHeaders) {
        headers = options.headers;
      } else {
        headers = new HttpHeaders(options.headers);
      }

      // Sort out parameters.
      let params: HttpParams|undefined = undefined;
      if (!!options.params) {
        if (options.params instanceof HttpParams) {
          params = options.params;
        } else {
          params = new HttpParams({ fromObject: options.params } as HttpParamsOptions);
        }
      }

      // Construct the request.
      req = new HttpRequest(first, url !, (options.body !== undefined ? options.body : null), {
        headers,
        params,
        reportProgress: options.reportProgress,
        // By default, JSON is assumed to be returned for all calls.
        responseType: options.responseType || 'json',
        withCredentials: options.withCredentials,
      });
    }

    // Start with an Observable.of() the initial request, and run the handler (which
    // includes all interceptors) inside a concatMap(). This way, the handler runs
    // inside an Observable chain, which causes interceptors to be re-run on every
    // subscription (this also makes retries re-run the handler, including interceptors).
    const events$: Observable<HttpEvent<any>> =
        of (req).pipe(concatMap((req: HttpRequest<any>) => this.handler.handle(req)));

    // If coming via the API signature which accepts a previously constructed HttpRequest,
    // the only option is to get the event stream. Otherwise, return the event stream if
    // that is what was requested.
    if (first instanceof HttpRequest || options.observe === 'events') {
      return events$;
    }

    // The requested stream contains either the full response or the body. In either
    // case, the first step is to filter the event stream to extract a stream of
    // responses(s).
    const res$: Observable<HttpResponse<any>> = <Observable<HttpResponse<any>>>events$.pipe(
        filter((event: HttpEvent<any>) => event instanceof HttpResponse));

    // Decide which stream to return.
    switch (options.observe || 'body') {
      case 'body':
        // The requested stream is the body. Map the response stream to the response
        // body. This could be done more simply, but a misbehaving interceptor might
        // transform the response body into a different format and ignore the requested
        // responseType. Guard against this by validating that the response is of the
        // requested type.
        switch (req.responseType) {
          case 'arraybuffer':
            return res$.pipe(map((res: HttpResponse<any>) => {
              // Validate that the body is an ArrayBuffer.
              if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                throw new Error('Response is not an ArrayBuffer.');
              }
              return res.body;
            }));
          case 'blob':
            return res$.pipe(map((res: HttpResponse<any>) => {
              // Validate that the body is a Blob.
              if (res.body !== null && !(res.body instanceof Blob)) {
                throw new Error('Response is not a Blob.');
              }
              return res.body;
            }));
          case 'text':
            return res$.pipe(map((res: HttpResponse<any>) => {
              // Validate that the body is a string.
              if (res.body !== null && typeof res.body !== 'string') {
                throw new Error('Response is not a string.');
              }
              return res.body;
            }));
          case 'json':
          default:
            // No validation needed for JSON responses, as they can be of any type.
            return res$.pipe(map((res: HttpResponse<any>) => res.body));
        }
      case 'response':
        // The response stream was requested directly, so return it.
        return res$;
      default:
        // Guard against new future observe types being added.
        throw new Error(`Unreachable: unhandled observe type ${options.observe}}`);
    }
  }

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the response as an `ArrayBuffer`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return  An `Observable` of the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;


  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response body as a `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text string and returns
   * a string.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HTTPEvents` for the request,
   * with response body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all the `HTTPEvents` for the request, with the response body as a
   * `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HTTPEvents` for the request, with the response
   *  body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HTTPEvents` for the request, with response body of
   * type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `DELETE`request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all the `HTTPEvents` for the request, with a response
   * body in the requested type.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  delete<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer` and returns
   *  the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HTTPResponse`, with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text stream and
   *  returns the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HTTPResponse`, with the response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `DELETE` request the interprets the body as a JSON object and returns
   * the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 和该请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   *
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  delete<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type `Object`.
   *
   * 一个由 `Object` 型的 body 组成的 `Observable` 对象。
   */
  delete (url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a DELETE request that interprets the body as a JSON object and returns
   * the response in a given type.
   *
   * 构造一个 `DELETE` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with response body in the requested type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  delete<T>(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `DELETE` request to execute on the server. See the individual overloads for
   * details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `DELETE` 请求。
   * 关于返回类型的详细信息请参见它的各个重载形式。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 和该请求一起发送的 HTTP 选项。
   *
   */
  delete (url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('DELETE', url, options as any);
  }


  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns the response in
   *  an `ArrayBuffer`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob`
   * and returns the response as a `Blob`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `GET` request that interprets the body as a text string
   * and returns the response as a string value.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns
   *  the full event stream.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvents` for the request, with the response
   * body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `GET` request that interprets the body as a text string and returns
   * the full event stream.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and returns the full event stream.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with a response body in the requested type.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  get<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   *  with the response body as a `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `GET` request that interprets the body as a text stream and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HttpResponse`,
   * with the response body of type `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HTTPResponse` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  get<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 和该请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response body as a JSON object.
   *
   * 一个由 JSON 对象类型的 body 组成的 `Observable` 对象。

   */
  get(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and returns
   * the response body in a given type.
   *
   * 构造一个 `GET` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse`, with a response body in the requested type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  get<T>(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `GET` request to execute on the server. See the individual overloads for
   * details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `GET` 请求。
   * 关于 `get()` 返回类型的详细信息取决于所提供的选项，参见它的各个重载形式。
   */
  get(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('GET', url, options as any);
  }


  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer` and
   * returns the response as an `ArrayBuffer`.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return  An `Observable` of the response, with the response body as a `Blob`.
   */

  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `HEAD` request that interprets the body as a text string and returns the response
   * as a string value.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `HEAD` request that interprets the body as an  `ArrayBuffer`
   *  and returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of tall `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as a `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all HttpEvents for the request, with the response body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object
   * and returns the full HTTP event stream.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HTTPEvents` for the request, with a response body of
   * type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and
   * returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @return An `Observable` of all the `HTTPEvents` for the request
   * , with a response body in the requested type.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  head<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as a blob.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `HEAD` request that interprets the body as text stream
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body of type `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with a responmse body of the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  head<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 一个由 `Object` 型的 body 组成的 `Observable` 对象。
   */
  head(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and returns
   * the response in a given type.
   *
   * 构造一个 `HEAD` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with a response body of the given type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  head<T>(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `HEAD` request to execute on the server. The `HEAD` method returns
   * meta information about the resource without transferring the
   * resource itself. See the individual overloads for
   * details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `HEAD` 请求。
   * 关于 `head()` 返回类型的详细信息取决于所提供的选项，参见它的各个重载形式。
   */
  head(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('HEAD', url, options as any);
  }

  /**
   * Constructs a `JSONP` request for the given URL and name of the callback parameter.
   *
   * 使用指定的 URL 和回调函数名构造一个 JSONP 请求。
   *
   * @param url The resource URL.
   *
   * 资源 URL。
   *
   * @param callbackParam The callback function name.
   *
   * 回调函数的名字。
   *
   * @return An `Observable` of the response object, with response body as an object.
   *
   * 一个 `Object` 型响应对象组成的 `Observable` 对象
   *
   */
  jsonp(url: string, callbackParam: string): Observable<Object>;

  /**
   * Constructs a `JSONP` request for the given URL and name of the callback parameter.
   *
   * 使用指定的 URL 和回调函数名构造一个 JSONP 请求。
   *
   * @param url The resource URL.
   *
   * 资源 URL。
   *
   * @param callbackParam The callback function name.
   *
   * 回调函数的名字。
   *
   * You must install a suitable interceptor, such as one provided by `HttpClientJsonpModule`.
   * If no such interceptor is reached,
   * then the `JSONP` request can be rejected by the configured backend.
   *
   * 你必须先安装适当的拦截器，比如 `HttpClientJsonpModule` 所提供的那个。
   * 如果没有这样的拦截器，那么 `JSONP` 可能会被所配置的后端拒绝处理。
   *
   * @return An `Observable` of the response object, with response body in the requested type.
   *
   * 一个响应对象的 `Observable`，其中带有请求中所要求的响应体。
   *
   */
  jsonp<T>(url: string, callbackParam: string): Observable<T>;

  /**
   * Constructs an `Observable` that, when subscribed, causes a request with the special method
   * `JSONP` to be dispatched via the interceptor pipeline.
   * The [JSONP pattern](https://en.wikipedia.org/wiki/JSONP) works around limitations of certain
   * API endpoints that don't support newer,
   * and preferable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protocol.
   * JSONP treats the endpoint API as a JavaScript file and tricks the browser to process the
   * requests even if the API endpoint is not located on the same domain (origin) as the client-side
   * application making the request.
   * The endpoint API must support JSONP callback for JSONP requests to work.
   * The resource API returns the JSON response wrapped in a callback function.
   * You can pass the callback function name as one of the query parameters.
   * Note that JSONP requests can only be used with `GET` requests.
   *
   * @param url The resource URL.
   * @param callbackParam The callback function name.
   *
   */
  jsonp<T>(url: string, callbackParam: string): Observable<T> {
    return this.request<any>('JSONP', url, {
      params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
      observe: 'body',
      responseType: 'json',
    });
  }

  /**
   * Constructs an `OPTIONS` request that interprets the body as an
   * `ArrayBuffer` and returns the response as an `ArrayBuffer`.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string and
   * returns a string value.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return  An `Observable` of all `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as a `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HTTPEvents` for the request,
   * with the response body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvents` for the request with the response
   * body of type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and
   * returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvents` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  options<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob`
   *  and returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   *  with the response body as a `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as text stream
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   *  with the response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  options<T>(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and returns the response
   * body as a JSON object.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 一个由 `Object` 型的 body 组成的 `Observable` 对象。
   */
  options(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and returns the response
   * in a given type.
   *
   * 构造一个 `OPTIONS` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HTTPResponse`, with a response body of the given type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  options<T>(url: string, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an `Observable` that, when subscribed, causes the configured
   * `OPTIONS` request to execute on the server. This method allows the client
   * to determine the supported HTTP methods and other capabilites of an endpoint,
   * without implying a resource action. See the individual overloads for
   * details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `OPTIONS` 请求。
   * 关于 `options()` 返回类型的详细信息取决于所提供的选项，参见它的各个重载形式。
   */
  options(url: string, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('OPTIONS', url, options as any);
  }

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and returns
   * the response as an `ArrayBuffer`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the response
   * as a `Blob`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `PATCH` request that interprets the body as as a text string and
   * returns the response as a string value.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with a response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and
   *  returns the the full event stream.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HTTPevents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */

  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HTTPevents` for the request, with the
   * response body as `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HTTPevents`for the request, with a
   * response body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HTTPevents` for the request,
   * with a response body of type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HTTPevents` for the request,
   *  with a response body in the requested type.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  patch<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   *  with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text stream and returns the
   * full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with a response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the given type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  patch<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 一个由 `Object` 型的 body 组成的 `Observable` 对象。
   */
  patch(url: string, body: any|null, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the response in a given type.
   *
   * 构造一个 `PATCH` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with a response body in the given type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  patch<T>(url: string, body: any|null, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `PATCH` request to execute on the server. See the individual overloads for
   * details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `PATCH` 请求。
   * 关于 `patch()` 返回类型的详细信息取决于所提供的选项，参见它的各个重载形式。
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('PATCH', url, addBody(options, body));
  }

  /**
   * Constructs a `POST` request that interprets the body as an as an `ArrayBuffer` and returns
   * an `ArrayBuffer`.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the
   * response as a `Blob`.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `POST` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with a response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob`
   * and returns the response in an observable of the full event stream.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request, with the response body as `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `POST` request that interprets the body as a text string and returns the full event stream.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of all `HttpEvents` for the request,
   * with a response body of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a POST request that interprets the body as a JSON object and returns the full event stream.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of all `HttpEvents` for the request,
   * with a response body of type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a POST request that interprets the body as a JSON object and returns the full event stream.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  post<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a POST request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HTTPresponse`.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of the `HTTPResponse` for the request, with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as a `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `POST` request that interprets the body as a text stream and returns
   * the full `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of the `HTTPResponse` for the request,
   * with a response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `POST` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body of type
   * `Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `POST` request that interprets the body as a JSON object and returns the full
   * `HTTPResponse`.
   *
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body in the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  post<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `POST` request that interprets the body as a
   * JSON object and returns the response body as a JSON object.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 一个由 `Object` 型的 body 组成的 `Observable` 对象。
   */
  post(url: string, body: any|null, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a `POST` request that interprets the body as a JSON object
   * and returns an observable of the response.
   *
   * 构造一个 `POST` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of the `HTTPResponse` for the request, with a response body in the requested type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  post<T>(url: string, body: any|null, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `POST` request to execute on the server. The server responds with the location of
   * the replaced resource. See the individual overloads for
   * details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `POST` 请求。
   * 关于 `post()` 返回类型的详细信息取决于所提供的选项，参见它的各个重载形式。
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('POST', url, addBody(options, body));
  }

  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and returns the
   * response as an `ArrayBuffer`.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 一个由 `ArrayBuffer` 型的 body 组成的 `Observable` 对象。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 `Blob` ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 一个由 `Blob` 型的 body 组成的 `Observable` 对象。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `PUT` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为文本，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with a response body of type string.
   *
   * 一个由 `string` 型的 body 组成的 `Observable` 对象。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `ArrayBuffer` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the full event stream.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as a `Blob`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Blob` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `PUT` request that interprets the body as a text string and returns the full event stream.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为文本，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all HttpEvents for the request, with a response body
   * of type string.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `string` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the full event stream.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request, with a response body of
   * type `Object`.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `Object` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the
   * full event stream.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 JSON ，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的所有 `HttpEvents` 组成的 `Observable` 对象，事件的 body 是 `T` 型的。
   */
  put<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'events', responseType?: 'json', withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `PUT` request that interprets the body as an
   * `ArrayBuffer` and returns an observable of the full HTTP response.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 `ArrayBuffer` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with the response body as an `ArrayBuffer`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `ArrayBuffer` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'arraybuffer', withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the
   * full HTTP response.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 `Blob` ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as a `Blob`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Blob` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'blob', withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `PUT` request that interprets the body as a text stream and returns the
   * full HTTP response.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为文本，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body of type string.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `string` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType: 'text', withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the full HTTP response.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body
   * of type 'Object`.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `Object` 型的。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the full HTTP response.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 JSON ，并返回完整的响应体。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with a response body in the requested type.
   *
   * 一个由该请求的 `HttpResponse` 组成的 `Observable` 对象，其 body 是 `T` 型的。
   */
  put<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the response
   * body as a JSON object.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 一个由 `Object` 型的 body 组成的 `Observable` 对象。
   */
  put(url: string, body: any|null, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object
   * and returns an observable of the response.
   *
   * 构造一个 `PUT` 请求，这个请求会把 body 解释为 JSON ，并返回它。
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body in the requested type.
   *
   * 一个由 `T` 型的 body 组成的 `Observable` 对象。
   */
  put<T>(url: string, body: any|null, options?: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `PUT` request to execute on the server. The `PUT` method replaces an existing resource
   * with a new set of values.
   * See the individual overloads for details on the return type.
   *
   * 构造一个 `Observable`，当订阅它时，将导致服务器执行一个配置好的 `PUT` 请求。
   * 关于 `put()` 返回类型的详细信息取决于所提供的选项，参见它的各个重载形式。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('PUT', url, addBody(options, body));
  }
}
