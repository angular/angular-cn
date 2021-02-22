/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {concatMap, filter, map} from 'rxjs/operators';

import {HttpHandler} from './backend';
import {HttpHeaders} from './headers';
import {HttpParams, HttpParamsOptions} from './params';
import {HttpRequest} from './request';
import {HttpEvent, HttpResponse} from './response';


/**
 * Constructs an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. This function clones the object and adds the body.
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 */
function addBody<T>(
    options: {
      headers?: HttpHeaders|{[header: string]: string | string[]},
      observe?: HttpObserve,
      params?: HttpParams|{[param: string]: string | string[]},
      reportProgress?: boolean,
      responseType?: 'arraybuffer'|'blob'|'json'|'text',
      withCredentials?: boolean,
    },
    body: T|null): any {
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

export type HttpObserve = 'body'|'events'|'response';

/**
 * Performs HTTP requests.
 * This service is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies based on
 * the signature that is called (mainly the values of `observe` and `responseType`).
 *
 * 执行 HTTP 请求。该服务作为可注入类提供，带有执行 HTTP 请求的方法。每个请求方法都有多个签名，并且返回类型会根据所调用的签名（主要的值是 `observe` 和 `responseType`）而有所不同。
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 * 请注意， `responseType` *选项*的值是一个字符串，用于标识此响应的单一数据类型。该方法的各个重载版本处理每种响应类型。正如组合签名所暗示的那样 `responseType` 的值不能为联合类型。
 *
 * @usageNotes
 *
 * Sample HTTP requests for the [Tour of Heroes](/tutorial/toh-pt0) application.
 *
 * [“英雄之旅”](/tutorial/toh-pt0)应用程序的示例 HTTP 请求。
 *
 * ### HTTP Request Example
 *
 * ### HTTP 请求示例
 *
 * ```
 *  // GET heroes whose name contains search term
 * searchHeroes(term: string): observable<Hero[]>{
 *
 *  const params = new HttpParams({fromString: 'name=term'});
 *    return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
 * }
 * ```
 *
 * ### JSONP Example
 *
 * ### JSONP 示例
 *
 * ```
 * requestJsonp(url, callback = 'callback') {
 *  return this.httpClient.jsonp(this.heroesURL, callback);
 * }
 * ```
 *
 * ### PATCH Example
 *
 * ### PATCH 示例
 *
 * ```
 * // PATCH one of the heroes' name
 * patchHero (id: number, heroName: string): Observable<{}> {
 * const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
 *  return this.httpClient.patch(url, {name: heroName}, httpOptions)
 *    .pipe(catchError(this.handleError('patchHero')));
 * }
 * ```
 *
 * @see [HTTP Guide](guide/http)
 *
 * [HTTP 指南](guide/http)
 *
 * @publicApi
 */
@Injectable()
export class HttpClient {
  constructor(private handler: HttpHandler) {}

  /**
   * Sends an `HTTPRequest` and returns a stream of `HTTPEvents`.
   *
   * 发送 `HTTPRequest` 并返回 `HTTPEvents` 流。
   *
   * @return An `Observable` of the response, with the response body as a stream of `HTTPEvents`.
   *
   * 响应对象的 `Observable` ，其响应体为 `HTTPEvents` 流。
   *
   */
  request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>;

  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the response in
   * an `ArrayBuffer`.
   *
   * 构造一个请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a request that interprets the body as a blob and returns
   * the response as a blob.
   *
   * 构造一个请求，将请求体解释为 `Blob` 类型，其响应体为 `Blob` 类型。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a request that interprets the body as a text string and
   * returns a string value.
   *
   * 构造一个请求，它将请求体解释为字符串，并且返回一个字符串。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the
   * the full event stream.
   *
   * 构造一个请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an array of `HTTPEvents` for
   *     the
   * request.
   *
   * 一个响应对象的 `Observable`，其响应主体为此请求的 `HTTPEvents`
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | string[]}, observe: 'events',
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a request that interprets the body as a `Blob` and returns
   * the full event stream.
   *
   * 构造一个请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of of all `HttpEvents` for the request,
   * with the response body of type `Blob`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a request which interprets the body as a text string and returns the full event
   * stream.
   *
   * 构造一个请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HttpEvents` for the reques,
   * with the response body of type string.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 string 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full event
   * stream.
   *
   * 构造一个请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the  request.
   *
   * 要和此请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   *  with the response body of type `Object`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<any>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full event
   * stream.
   *
   * 构造一个请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body of type `R`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `R` 类型。
   *
   */
  request<R>(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<R>>;

  /**
   * Constructs a request which interprets the body as an `ArrayBuffer`
   * and returns the full `HTTPResponse`.
   *
   * 构造一个请求，它将请求体解释为 `ArrayBuffer`，并且返回完整的 `HttpResponse`。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body as an `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a request which interprets the body as a `Blob` and returns the full `HTTPResponse`.
   *
   * 构造一个请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a request which interprets the body as a text stream and returns the full
   * `HTTPResponse`.
   *
   * 构造一个请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the HTTP response, with the response body of type string.
   *
   * 此请求的 `HTTP response` 的 `Observable`，其响应体为 string 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full
   * `HTTPResponse`.
   *
   * 构造一个请求，它将请求体解释为 JSON 对象，并返回完整 `HTTPResponse`。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the full `HTTPResponse`,
   * with the response body of type `Object`.
   *
   * 此请求的完整 `HTTPResponse` 的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  request(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns
   * the full `HTTPResponse` with the response body in the requested type.
   *
   * 构造一个请求，它将请求体解释为 JSON 对象，并返回带有请求主体类型 `HTTPResponse`
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return  An `Observable` of the full `HTTPResponse`, with the response body of type `R`.
   *
   * 此请求的完整 `HTTPResponse` 的 `Observable`，其响应体为 `R` 类型。
   *
   */
  request<R>(method: string, url: string, options: {
    body?: any,
    headers?: HttpHeaders|{[header: string]: string | string[]},
    reportProgress?: boolean, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<R>>;

  /**
   * Constructs a request which interprets the body as a JSON object and returns the full
   * `HTTPResponse` as a JSON object.
   *
   * 构造一个请求，它将请求体解释为 JSON 对象，并返回完整的 `HTTPResponse`。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   *
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
   * 构造一个请求，它将请求体解释为 JSON 对象，并返回所请求类型的响应体。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `R`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `R` 类型。
   *
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
   * 构造一个请求，其中的响应类型和所请求的可观察对象都不是静态已知的。
   *
   * @param method  The HTTP method.
   *
   * HTTP 方法。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the reuested response, wuth body of type `any`.
   *
   * 所请求的响应对象的 `Observable`，其响应体是 `any` 类型。
   *
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
   * 为任意 HTTP 请求构造一个可观察的对象，该请求在被订阅时将通过已注册的拦截器链触发该请求，然后发送到服务器。
   *
   * You can pass an `HttpRequest` directly as the only parameter. In this case,
   * the call returns an observable of the raw `HttpEvent` stream.
   *
   * 你可以直接把 `HttpRequest` 作为唯一参数。在这种情况下，该调用将返回原始 `HttpEvent` 流的可观察值。
   *
   * Alternatively you can pass an HTTP method as the first parameter,
   * a URL string as the second, and an options hash containing the request body as the third.
   * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
   * type of returned observable.
   *
   * 或者，你可以将 HTTP 方法作为第一个参数，将 URL 字符串作为第二个参数，将包含请求正文的选项哈希作为第三个参数。参见 `addBody()`。在这种情况下，指定的 `responseType` 和 `observe` 选项会决定要返回的 observable 类型。
   *
   *   * The `responseType` value determines how a successful response body is parsed.
   *
   *     此 `responseType` 值确定如何解析成功的响应体。
   *
   *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
   * object as a type parameter to the call.
   *
   *     如果 `responseType` 是默认的 `json` ，则可以将结果对象的类型接口作为类型参数传递给调用。
   *
   * The `observe` value determines the return type, according to what you are interested in
   * observing.
   *
   * `observe` 值根据你感兴趣的观察值确定其返回类型。
   *
   *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
   * progress events by default.
   *
   *     事件的 `observe` 值返回原始 `HttpEvent` 流的可观察值，默认情况下包括进度事件。
   *
   *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
   * where the `T` parameter depends on the `responseType` and any optionally provided type
   * parameter.
   *
   *     响应对象的 `observe` 值返回 `HttpResponse<T>` 的可观察对象，其中 `T` 参数取决于 `responseType` 和所提供的可选类型参数。
   *
   *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
   *
   *     `observe` 的 body 值会返回与 `T` 的响应体具有相同类型的 `<T>` 型可观察对象。
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
      req = first;
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
          params = new HttpParams({fromObject: options.params} as HttpParamsOptions);
        }
      }

      // Construct the request.
      req = new HttpRequest(first, url!, (options.body !== undefined ? options.body : null), {
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
        of(req).pipe(concatMap((req: HttpRequest<any>) => this.handler.handle(req)));

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
   * 构造一个 `DELETE` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return  An `Observable` of the response body as an `ArrayBuffer`.
   *
   * 类型为 `ArrayBuffer` 的响应体的 `Observable`。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;


  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response body as a `Blob`.
   *
   * 类型为 `Blob` 的响应体的 `Observable`。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text string and returns
   * a string.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为字符串，并且返回一个字符串。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HTTPEvents` for the request,
   * with response body as an `ArrayBuffer`.
   *
   * 此请求的所有 `HTTPEvents` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPEvents` for the request, with the response body as a
   * `Blob`.
   *
   * 此请求的所有 `HTTPEvents` 的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HTTPEvents` for the request, with the response
   *  body of type string.
   *
   * 表示啥此请求的 `HTTPEvents` 的 `Observable`，响应体为 string 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HTTPEvents` for the request, with response body of
   * type `Object`.
   *
   * 表示啥此请求的 `HTTPEvents` 的 `Observable`，响应体为 `Object` 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `DELETE`request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPEvents` for the request, with a response
   * body in the requested type.
   *
   * 表示此请求的 `HTTPEvents` 的 `Observable`，响应体为所请求的类型。
   *
   */
  delete<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer` and returns
   *  the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 `ArrayBuffer`，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the full `HTTPResponse`, with the response body as an `ArrayBuffer`.
   *
   * 此请求的完整 `HTTPResponse` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text stream and
   *  returns the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the full `HTTPResponse`, with the response body of type string.
   *
   * 此请求的完整 `HTTPResponse` 的 `Observable`，其响应体为 string 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `DELETE` request the interprets the body as a JSON object and returns
   * the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of type `Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with the response body of the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  delete<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `DELETE` 请求，它将请求体解释为 JSON 对象，并且返回 JSON 对象格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type `Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  delete(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `DELETE` 请求，它将请求体解释为 JSON 对象，并且返回给定类型的响应。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with response body in the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  delete<T>(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 Observable，当它被订阅时，会要求服务器执行配置好的 `DELETE` 请求。参见它的各个独立重载形式，以了解其返回值类型。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   */
  delete(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('DELETE', url, options as any);
  }


  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns the
   * response in an `ArrayBuffer`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob`
   * and returns the response as a `Blob`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `GET` request that interprets the body as a text string
   * and returns the response as a string value.
   *
   * 构造一个 `GET` 请求，它将请求体解释为字符串，并且返回字符串格式的响应。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns
   *  the full event stream.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HttpEvents` for the request, with the response
   * body as an `ArrayBuffer`.
   *
   * 表示此请求的 `HttpEvents` 的 `Observable`，响应体为 n `ArrayBuffer` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `GET` request that interprets the body as a text string and returns
   * the full event stream.
   *
   * 构造一个 `GET` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type `Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and returns the full event
   * stream.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with a response body in the requested type.
   *
   * 响应对象的 `Observable` ，其响应体为所请求的类型。
   *
   */
  get<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 `ArrayBuffer`，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   *  with the response body as a `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `GET` request that interprets the body as a text stream and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the full `HttpResponse`,
   * with the response body of type `Object`.
   *
   * 此请求的完整 `HttpResponse` 的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the full `HTTPResponse` for the request,
   * with a response body in the requested type.
   *
   * 此请求的完整 `HTTPResponse` 的 `Observable`，其响应体为所请求的类型。
   *
   */
  get<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `GET` 请求，它将请求体解释为 JSON 对象，并且返回 JSON 对象格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response body as a JSON object.
   *
   * 响应体的 `Observable` 作为 JSON 对象。
   *
   */
  get(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `GET` 请求，它将请求体解释为 JSON 对象，并且返回给定类型的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with a response body in the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  get<T>(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 Observable，当它被订阅时，会要求服务器执行配置好的 `GET` 请求。参见它的各个独立重载形式，以了解其返回值类型。
   *
   */
  get(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `HEAD` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return  An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */

  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `HEAD` request that interprets the body as a text string and returns the response
   * as a string value.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为字符串，并且返回字符串格式的响应。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `HEAD` request that interprets the body as an  `ArrayBuffer`
   *  and returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，它把请求体解释为 `ArrayBuffer`，并返回完整事件的流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of tall `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as a `Blob`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all HttpEvents for the request, with the response body of type
   *     string.
   *
   * 表示啥此请求的 `HttpEvents for the request` 的 `Observable`，响应体为 string 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object
   * and returns the full HTTP event stream.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of all `HTTPEvents` for the request, with a response body of
   * type `Object`.
   *
   * 表示啥此请求的 `HTTPEvents` 的 `Observable`，响应体为 `Object` 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and
   * returns the full event stream.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @return An `Observable` of all the `HTTPEvents` for the request
   * , with a response body in the requested type.
   *
   * 表示此请求的 `HTTPEvents` 的 `Observable`，响应体为所请求的类型。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   */
  head<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 `ArrayBuffer`，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as a blob.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 blob 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `HEAD` request that interprets the body as text stream
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body of type `Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with a responmse body of the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  head<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `HEAD` 请求，它将请求体解释为 JSON 对象，并且返回 JSON 对象格式的响应体。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 响应对象的 `Observable` ，其响应体为 JSON 对象。
   *
   */
  head(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `HEAD` 请求，它将请求体解释为 JSON 对象，并且返回给定类型的响应。
   *
   * @param url     The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options The HTTP options to send with the request.
   *
   * 与请求一起发送的 HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with a response body of the given type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为给定的类型。
   *
   */
  head<T>(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 Observable，当它被订阅时，会要求服务器执行配置好的 `HEAD` 请求。`HEAD` 方法会返回该资源的元数据，而不会传输资源本身。参见它的各个独立重载形式，以了解其返回类型。
   *
   */
  head(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 为给定的 URL 和回调参数的名称构造一个 `JSONP`
   *
   * @param url The resource URL.
   *
   * 资源 URL。
   *
   * @param callbackParam The callback function name.
   *
   * 回调函数名称。
   *
   * @return An `Observable` of the response object, with response body as an object.
   *
   * 响应对象的 `Observable` ，其响应体为对象类型。
   *
   */
  jsonp(url: string, callbackParam: string): Observable<Object>;

  /**
   * Constructs a `JSONP` request for the given URL and name of the callback parameter.
   *
   * 为给定的 URL 和回调参数的名称构造一个 `JSONP`
   *
   * @param url The resource URL.
   *
   * 资源 URL。
   *
   * @param callbackParam The callback function name.
   *
   * 回调函数名称。
   *
   * You must install a suitable interceptor, such as one provided by `HttpClientJsonpModule`.
   * If no such interceptor is reached,
   * then the `JSONP` request can be rejected by the configured backend.
   *
   * 你必须安装合适的拦截器，例如 `HttpClientJsonpModule` 提供的拦截器。如果未经过此类拦截器，则所配置的后端可以拒绝 `JSONP`
   *
   * @return An `Observable` of the response object, with response body in the requested type.
   *
   * 响应对象的 `Observable` ，其响应体为所请求的类型。
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
   * 构造一个 `Observable` ，当订阅该 Observable 时，将通过拦截器管道分派特殊的 `JSONP` 方法。[JSONP 模式](https://en.wikipedia.org/wiki/JSONP) 可绕过某些 API 端点的局限性，这些端点不支持新的方式。更推荐使用 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 协议。JSONP 将端点 API 视为 JavaScript 文件，并欺骗浏览器处理请求，即使 API 端点与发出请求的客户端应用不在同一个域（源）上。端点 API 必须支持 JSONP 回调，JSONP 请求才能正常工作。此资源 API 会返回包装在回调函数中的 JSON 响应。你可以将回调函数名称作为查询参数之一传递。请注意，JSONP 请求只能与 `GET` 请求一起使用。
   *
   * @param url The resource URL.
   *
   * 资源 URL。
   *
   * @param callbackParam The callback function name.
   *
   * 回调函数名称。
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
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string and
   * returns a string value.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为字符串，并且返回一个字符串。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return  An `Observable` of all `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as a `Blob`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPEvents` for the request,
   * with the response body of type string.
   *
   * 此请求的 `HTTPEvents` 的 `Observable`，其响应体为 string 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HttpEvents` for the request with the response
   * body of type `Object`.
   *
   * 表示啥此请求的 `HttpEvents` 的 `Observable`，响应体为 `Object` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and
   * returns the full event stream.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HttpEvents` for the request,
   * with a response body in the requested type.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为所请求的类型。
   *
   */
  options<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 `ArrayBuffer`，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob`
   *  and returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   *  with the response body as a `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as text stream
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   *  with the response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type `Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and
   * returns the full `HTTPResponse`.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  options<T>(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and returns the
   * response body as a JSON object.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 JSON 对象，并且返回 JSON 对象格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 响应对象的 `Observable` ，其响应体为 JSON 对象。
   *
   */
  options(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a JSON object and returns the
   * response in a given type.
   *
   * 构造一个 `OPTIONS` 请求，它将请求体解释为 JSON 对象，并且返回给定类型的响应。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HTTPResponse`, with a response body of the given type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为给定的类型。
   *
   */
  options<T>(url: string, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `Observable`，当订阅该 Observable 时，它会让已配置的 `OPTIONS` 请求在服务器上执行。此方法允许客户端确定所支持的 HTTP 方法和端点的其他功能，而无需进行隐式资源操作。有关返回类型的详细信息，请参见各个重载。
   *
   */
  options(url: string, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `PATCH` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the response
   * as a `Blob`.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为字符串，并且返回字符串格式的响应。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with a response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and
   *  returns the the full event stream.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPevents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的 `HTTPevents` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */

  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPevents` for the request, with the
   * response body as `Blob`.
   *
   * 表示此请求的 `HTTPevents` 的 `Observable`，响应体为 `Blob` 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPevents`for the request, with a
   * response body of type string.
   *
   * 表示啥此请求的 `HTTPevents` 的 `Observable`，响应体为 string 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPevents` for the request,
   * with a response body of type `Object`.
   *
   * 此请求的 `HTTPevents` 的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full event stream.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of all the `HTTPevents` for the request,
   *  with a response body in the requested type.
   *
   * 此请求的 `HTTPevents` 的 `Observable`，其响应体为所请求的类型。
   *
   */
  patch<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 `ArrayBuffer`，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   *  with the response body as an `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text stream and returns the
   * full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with a response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the given type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为给定的类型。
   *
   */
  patch<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * 构造一个 `PATCH` 请求，它将请求体解释为 JSON 对象，并且返回 JSON 对象格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 响应对象的 `Observable` ，其响应体为 JSON 对象。
   *
   */
  patch(url: string, body: any|null, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `PATCH` 请求，它将请求体解释为 JSON 对象，并且返回给定类型的响应。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to edit.
   *
   * 要编辑的资源。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with a response body in the given type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为给定的类型。
   *
   */
  patch<T>(url: string, body: any|null, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 Observable，当它被订阅时，会要求服务器执行配置好的 `PATCH` 请求。参见它的各个独立重载形式，以了解其返回值类型。
   *
   */
  patch(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('PATCH', url, addBody(options, body));
  }

  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and returns
   * an `ArrayBuffer`.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options.
   *
   * HTTP 选项。
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the
   * response as a `Blob`.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `POST` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * 构造一个 `POST` 请求，它将请求体解释为字符串，并且返回字符串格式的响应。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response, with a response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob`
   * and returns the response in an observable of the full event stream.
   *
   * 构造一个 `POST` 请求，它把请求体解释为 `Blob`，并返回完整事件流的 `Observable`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request, with the response body as `Blob`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `POST` request that interprets the body as a text string and returns the full
   * event stream.
   *
   * 构造一个 `POST` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return  An `Observable` of all `HttpEvents` for the request,
   * with a response body of type string.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 string 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a POST request that interprets the body as a JSON object and returns the full event
   * stream.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return  An `Observable` of all `HttpEvents` for the request,
   * with a response body of type `Object`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a POST request that interprets the body as a JSON object and returns the full event
   * stream.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with a response body in the requested type.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为所请求的类型。
   *
   */
  post<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a POST request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HTTPresponse`.
   *
   * 构造一个 POST 请求，它将请求体解释为 `ArrayBuffer` 类型，并返回完整的 `HTTPresponse` 。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return  An `Observable` of the `HTTPResponse` for the request, with the response body as an
   *     `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as a `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `POST` request that interprets the body as a text stream and returns
   * the full `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，它将请求体解释为文本流，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return  An `Observable` of the `HTTPResponse` for the request,
   * with a response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `POST` request that interprets the body as a JSON object
   * and returns the full `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body of type
   * `Object`.
   *
   * 表示啥此请求的 `HTTPResponse` 的 `Observable`，响应体为 `Object` 类型。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `POST` request that interprets the body as a JSON object and returns the full
   * `HTTPResponse`.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 JSON 对象，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body in the
   *     requested type.
   *
   * 表示此请求的 `HTTPResponse` 的 `Observable`，响应体为所请求的类型。
   *
   */
  post<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `POST` request that interprets the body as a
   * JSON object and returns the response body as a JSON object.
   *
   * 构造一个 `POST` 请求，它将请求体解释为 JSON 对象，并且返回 JSON 对象格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response, with the response body as a JSON object.
   *
   * 响应对象的 `Observable` ，其响应体为 JSON 对象。
   *
   */
  post(url: string, body: any|null, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `POST` 请求，它将请求体解释为 JSON 对象，并且返回响应对象的 `Observable`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The content to replace with.
   *
   * 要替换的内容。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return  An `Observable` of the `HTTPResponse` for the request, with a response body in the
   *     requested type.
   *
   * 表示此请求的 `HTTPResponse` 的 `Observable`，响应体为所请求的类型。
   *
   */
  post<T>(url: string, body: any|null, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `Observable`，当订阅该 Observable 时，它会让已配置的 `POST` 请求在服务器上执行。。服务器以替换后资源的位置进行响应。有关返回类型的详细信息，请参见各个重载。
   *
   */
  post(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `PUT` 请求，它将请求体解释为 `ArrayBuffer`，并且返回 `ArrayBuffer` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   *
   * 响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<ArrayBuffer>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 `Blob`，并且返回 `Blob` 格式的响应体。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   *
   * 响应对象的 `Observable` ，其响应体为 `Blob` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<Blob>;

  /**
   * Constructs a `PUT` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为字符串，并且返回字符串格式的响应。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response, with a response body of type string.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 string 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<string>;

  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as an `ArrayBuffer`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the full event
   * stream.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 `Blob`，并返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with the response body as a `Blob`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `PUT` request that interprets the body as a text string and returns the full event
   * stream.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为文本字符串，并且返回完整的事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all HttpEvents for the request, with a response body
   * of type string.
   *
   * 表示啥此请求的 `HttpEvents for the request` 的 `Observable`，响应体为 string 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpEvent<string>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the full event
   * stream.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request, with a response body of
   * type `Object`.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为 `Object` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the
   * full event stream.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 JSON 对象，并且返回完整的 HTTP 事件流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of all `HttpEvents` for the request,
   * with a response body in the requested type.
   *
   * 此请求的 `HttpEvents` 的 `Observable`，其响应体为所请求的类型。
   *
   */
  put<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'events',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpEvent<T>>;

  /**
   * Constructs a `PUT` request that interprets the body as an
   * `ArrayBuffer` and returns an observable of the full HTTP response.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 `ArrayBuffer`，并返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with the response body as an
   *     `ArrayBuffer`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `ArrayBuffer` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'arraybuffer',
    withCredentials?: boolean,
  }): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the
   * full HTTP response.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 `Blob`，并且返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with the response body as a `Blob`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Blob` 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'blob',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `PUT` request that interprets the body as a text stream and returns the
   * full HTTP response.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为文本流，并返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body of type
   *     string.
   *
   * 表示啥此请求的 `HTTPResponse` 的 `Observable`，响应体为 string 类型。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, responseType: 'text',
    withCredentials?: boolean,
  }): Observable<HttpResponse<string>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns the full HTTP
   * response.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 JSON 对象，并返回完整的 `HttpResponse`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   * @return An `Observable` of the `HTTPResponse` for the request, with a response body
   * of type 'Object`.
   *
   * 此请求的响应对象的 `Observable`，其响应体为 `Object` 类型。
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `PUT` request that interprets the body as an instance of the requested type and
   * returns the full HTTP response.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为所请求类型的实例，并返回完整的 HTTP 响应对象。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the `HTTPResponse` for the request,
   * with a response body in the requested type.
   *
   * 此请求的响应对象的 `Observable`，其响应体为所请求的类型。
   *
   */
  put<T>(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]}, observe: 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<HttpResponse<T>>;

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object
   * and returns an observable of JSON object.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为 JSON 对象，并返回 JSON 对象的 `Observable`。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the response as a JSON object.
   *
   * JSON 格式的响应对象的 `Observable`
   *
   */
  put(url: string, body: any|null, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: 'body',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'json',
    withCredentials?: boolean,
  }): Observable<Object>;

  /**
   * Constructs a `PUT` request that interprets the body as an instance of the requested type
   * and returns an observable of the requested type.
   *
   * 构造一个 `PUT` 请求，它将请求体解释为所请求类型的实例，并返回所请求类型的响应流。
   *
   * @param url The endpoint URL.
   *
   * 端点 URL。
   *
   * @param body The resources to add/update.
   *
   * 要添加/更新的资源。
   *
   * @param options HTTP options
   *
   * HTTP 选项
   *
   * @return An `Observable` of the requested type.
   *
   * 所请求类型的 `Observable`
   *
   */
  put<T>(url: string, body: any|null, options?: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
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
   * 构造一个 `Observable`，当订阅该 Observable 时，它会让已配置的 `PUT` 请求在服务器上执行。。 `PUT` 方法用一组新值替换现有资源。有关返回类型的详细信息，请参见各个重载。
   *
   */
  put(url: string, body: any|null, options: {
    headers?: HttpHeaders|{[header: string]: string | string[]},
    observe?: HttpObserve,
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.request<any>('PUT', url, addBody(options, body));
  }
}
