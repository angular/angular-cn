/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpHeaders} from './headers';
import {HttpParams} from './params';

/**
 * Construction interface for `HttpRequest`s.
 *
 * `HttpRequest` 的构造接口。
 *
 * All values are optional and will override default values if provided.
 *
 * 所有值都是可选的，如果提供了，则会覆盖默认值。
 */
interface HttpRequestInit {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'arraybuffer'|'blob'|'json'|'text';
  withCredentials?: boolean;
}

/**
 * Determine whether the given HTTP method may include a body.
 *
 * 决定 `body` 中将包含哪种 HTTP 方法。
 */
function mightHaveBody(method: string): boolean {
  switch (method) {
    case 'DELETE':
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'JSONP':
      return false;
    default:
      return true;
  }
}

/**
 * Safely assert whether the given value is an ArrayBuffer.
 *
 * 安全地断言指定值是否 `ArrayBuffer`。
 *
 * In some execution environments ArrayBuffer is not defined.
 *
 * 在某些运行环境中可能没有定义 `ArrayBuffer`。
 */
function isArrayBuffer(value: any): value is ArrayBuffer {
  return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}

/**
 * Safely assert whether the given value is a Blob.
 *
 * 安全地断言指定值是否 `Blob`。
 *
 * In some execution environments Blob is not defined.
 *
 * 在某些运行环境下可能没有定义 `Blob`。
 */
function isBlob(value: any): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

/**
 * Safely assert whether the given value is a FormData instance.
 *
 * 安全的断言指定的值是否为 `FormData` 实例。
 *
 * In some execution environments FormData is not defined.
 *
 * 在某些运行环境下可能没有定义 `FormData`。
 */
function isFormData(value: any): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

/**
 * An outgoing HTTP request with an optional typed body.
 *
 * 一个外发的 HTTP 请求，带有一个可选的类型化的请求体（`body`）。
 *
 * `HttpRequest` represents an outgoing request, including URL, method,
 * headers, body, and other request configuration options. Instances should be
 * assumed to be immutable. To modify a `HttpRequest`, the `clone`
 * method should be used.
 *
 * `HttpRequest` 表示一个外发请求，包括 URL、方法、请求头、请求体和其它请求配置项。
 * 它的实例都是不可变的。要修改 `HttpRequest`，应该使用 `clone` 方法。
 *
 * @publicApi
 */
export class HttpRequest<T> {
  /**
   * The request body, or `null` if one isn't set.
   *
   * 请求体，如果没有则为 `null`。
   *
   * Bodies are not enforced to be immutable, as they can include a reference to any
   * user-defined data type. However, interceptors should take care to preserve
   * idempotence by treating them as such.
   *
   * 请求体无法确保自己是不可变的，因为它们可以包含指向任何自定义数据类型的引用。
   * 不过，在拦截器中，要小心维护其幂等性 —— 把它们当做不可变对象。
   */
  readonly body: T|null = null;

  /**
   * Outgoing headers for this request.
   *
   * 本请求的外发请求头。
   *
   */
  // TODO(issue/24571): remove '!'.
  readonly headers!: HttpHeaders;

  /**
   * Whether this request should be made in a way that exposes progress events.
   *
   * 该请求是否应该暴露出进度事件。
   *
   * Progress events are expensive (change detection runs on each event) and so
   * they should only be requested if the consumer intends to monitor them.
   *
   * 进度事件很昂贵（在每个事件中都会执行一次变更检测），所以只有当消费者关心这些事件时才应该请求这些进度事件。
   */
  readonly reportProgress: boolean = false;

  /**
   * Whether this request should be sent with outgoing credentials (cookies).
   *
   * 此请求是否应该带着凭证（Cookie）一起外发。
   */
  readonly withCredentials: boolean = false;

  /**
   * The expected response type of the server.
   *
   * 所期待的服务器响应类型。
   *
   * This is used to parse the response appropriately before returning it to
   * the requestee.
   *
   * 它用来在把响应对象返回给被请求者之前以恰当的方式解析它。
   */
  readonly responseType: 'arraybuffer'|'blob'|'json'|'text' = 'json';

  /**
   * The outgoing HTTP request method.
   *
   * 外发 HTTP 请求的方法。
   */
  readonly method: string;

  /**
   * Outgoing URL parameters.
   *
   * 外发的 URL 参数。
   */
  // TODO(issue/24571): remove '!'.
  readonly params!: HttpParams;

  /**
   * The outgoing URL with all URL parameters set.
   *
   * 外发的 URL，及其所有 URL 参数。
   */
  readonly urlWithParams: string;

  constructor(method: 'DELETE'|'GET'|'HEAD'|'JSONP'|'OPTIONS', url: string, init?: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  });
  constructor(method: 'POST'|'PUT'|'PATCH', url: string, body: T|null, init?: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  });
  constructor(method: string, url: string, body: T|null, init?: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  });
  constructor(
      method: string, readonly url: string, third?: T|{
        headers?: HttpHeaders,
        reportProgress?: boolean,
        params?: HttpParams,
        responseType?: 'arraybuffer'|'blob'|'json'|'text',
        withCredentials?: boolean,
      }|null,
      fourth?: {
        headers?: HttpHeaders,
        reportProgress?: boolean,
        params?: HttpParams,
        responseType?: 'arraybuffer'|'blob'|'json'|'text',
        withCredentials?: boolean,
      }) {
    this.method = method.toUpperCase();
    // Next, need to figure out which argument holds the HttpRequestInit
    // options, if any.
    let options: HttpRequestInit|undefined;

    // Check whether a body argument is expected. The only valid way to omit
    // the body argument is to use a known no-body method like GET.
    if (mightHaveBody(this.method) || !!fourth) {
      // Body is the third argument, options are the fourth.
      this.body = (third !== undefined) ? third as T : null;
      options = fourth;
    } else {
      // No body required, options are the third argument. The body stays null.
      options = third as HttpRequestInit;
    }

    // If options have been passed, interpret them.
    if (options) {
      // Normalize reportProgress and withCredentials.
      this.reportProgress = !!options.reportProgress;
      this.withCredentials = !!options.withCredentials;

      // Override default response type of 'json' if one is provided.
      if (!!options.responseType) {
        this.responseType = options.responseType;
      }

      // Override headers if they're provided.
      if (!!options.headers) {
        this.headers = options.headers;
      }

      if (!!options.params) {
        this.params = options.params;
      }
    }

    // If no headers have been passed in, construct a new HttpHeaders instance.
    if (!this.headers) {
      this.headers = new HttpHeaders();
    }

    // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
    if (!this.params) {
      this.params = new HttpParams();
      this.urlWithParams = url;
    } else {
      // Encode the parameters to a string in preparation for inclusion in the URL.
      const params = this.params.toString();
      if (params.length === 0) {
        // No parameters, the visible URL is just the URL given at creation time.
        this.urlWithParams = url;
      } else {
        // Does the URL already have query parameters? Look for '?'.
        const qIdx = url.indexOf('?');
        // There are 3 cases to handle:
        // 1) No existing parameters -> append '?' followed by params.
        // 2) '?' exists and is followed by existing query string ->
        //    append '&' followed by params.
        // 3) '?' exists at the end of the url -> append params directly.
        // This basically amounts to determining the character, if any, with
        // which to join the URL and parameters.
        const sep: string = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
        this.urlWithParams = url + sep + params;
      }
    }
  }

  /**
   * Transform the free-form body into a serialized format suitable for
   * transmission to the server.
   *
   * 把无格式的请求体转换成适合传给服务器的序列化格式。
   */
  serializeBody(): ArrayBuffer|Blob|FormData|string|null {
    // If no body is present, no need to serialize it.
    if (this.body === null) {
      return null;
    }
    // Check whether the body is already in a serialized form. If so,
    // it can just be returned directly.
    if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
        typeof this.body === 'string') {
      return this.body;
    }
    // Check whether the body is an instance of HttpUrlEncodedParams.
    if (this.body instanceof HttpParams) {
      return this.body.toString();
    }
    // Check whether the body is an object or array, and serialize with JSON if so.
    if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
        Array.isArray(this.body)) {
      return JSON.stringify(this.body);
    }
    // Fall back on toString() for everything else.
    return (this.body as any).toString();
  }

  /**
   * Examine the body and attempt to infer an appropriate MIME type
   * for it.
   *
   * 检测请求体，并尝试给它推断出一个合适的 MIME 类型。
   *
   * If no such type can be inferred, this method will return `null`.
   *
   * 如果没有合适的 MIME 类型，该方法就会返回 `null`。
   */
  detectContentTypeHeader(): string|null {
    // An empty body has no content type.
    if (this.body === null) {
      return null;
    }
    // FormData bodies rely on the browser's content type assignment.
    if (isFormData(this.body)) {
      return null;
    }
    // Blobs usually have their own content type. If it doesn't, then
    // no type can be inferred.
    if (isBlob(this.body)) {
      return this.body.type || null;
    }
    // Array buffers have unknown contents and thus no type can be inferred.
    if (isArrayBuffer(this.body)) {
      return null;
    }
    // Technically, strings could be a form of JSON data, but it's safe enough
    // to assume they're plain strings.
    if (typeof this.body === 'string') {
      return 'text/plain';
    }
    // `HttpUrlEncodedParams` has its own content-type.
    if (this.body instanceof HttpParams) {
      return 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    // Arrays, objects, and numbers will be encoded as JSON.
    if (typeof this.body === 'object' || typeof this.body === 'number' ||
        Array.isArray(this.body)) {
      return 'application/json';
    }
    // No type could be inferred.
    return null;
  }

  clone(): HttpRequest<T>;
  clone(update: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
    body?: T|null,
    method?: string,
    url?: string,
    setHeaders?: {[name: string]: string|string[]},
    setParams?: {[param: string]: string},
  }): HttpRequest<T>;
  clone<V>(update: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
    body?: V|null,
    method?: string,
    url?: string,
    setHeaders?: {[name: string]: string|string[]},
    setParams?: {[param: string]: string},
  }): HttpRequest<V>;
  clone(update: {
    headers?: HttpHeaders,
    reportProgress?: boolean,
    params?: HttpParams,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
    body?: any|null,
    method?: string,
    url?: string,
    setHeaders?: {[name: string]: string|string[]},
    setParams?: {[param: string]: string};
  } = {}): HttpRequest<any> {
    // For method, url, and responseType, take the current value unless
    // it is overridden in the update hash.
    const method = update.method || this.method;
    const url = update.url || this.url;
    const responseType = update.responseType || this.responseType;

    // The body is somewhat special - a `null` value in update.body means
    // whatever current body is present is being overridden with an empty
    // body, whereas an `undefined` value in update.body implies no
    // override.
    const body = (update.body !== undefined) ? update.body : this.body;

    // Carefully handle the boolean options to differentiate between
    // `false` and `undefined` in the update args.
    const withCredentials =
        (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
    const reportProgress =
        (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;

    // Headers and params may be appended to if `setHeaders` or
    // `setParams` are used.
    let headers = update.headers || this.headers;
    let params = update.params || this.params;

    // Check whether the caller has asked to add headers.
    if (update.setHeaders !== undefined) {
      // Set every requested header.
      headers =
          Object.keys(update.setHeaders)
              .reduce((headers, name) => headers.set(name, update.setHeaders![name]), headers);
    }

    // Check whether the caller has asked to set params.
    if (update.setParams) {
      // Set every requested param.
      params = Object.keys(update.setParams)
                   .reduce((params, param) => params.set(param, update.setParams![param]), params);
    }

    // Finally, construct the new HttpRequest using the pieces from above.
    return new HttpRequest(method, url, body, {
      params,
      headers,
      reportProgress,
      responseType,
      withCredentials,
    });
  }
}
