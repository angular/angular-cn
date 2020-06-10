/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpHeaders} from './headers';

/**
 * Type enumeration for the different kinds of `HttpEvent`.
 *
 * 不同种类的 `HttpEvent` 的枚举类型。
 *
 * @publicApi
 */
export enum HttpEventType {
  /**
   * The request was sent out over the wire.
   *
   * 该请求已经在线路上发出了。
   */
  Sent,

  /**
   * An upload progress event was received.
   *
   * 收到了上传进度事件。
   */
  UploadProgress,

  /**
   * The response status code and headers were received.
   *
   * 收到了响应状态码和响应头。
   */
  ResponseHeader,

  /**
   * A download progress event was received.
   *
   * 收到了下载进度事件。
   */
  DownloadProgress,

  /**
   * The full response including the body was received.
   *
   * 收到了包括响应体在内的完整响应对象。
   */
  Response,

  /**
   * A custom event from an interceptor or a backend.
   *
   * 来自拦截器或后端的自定义事件。
   */
  User,
}

/**
 * Base interface for progress events.
 *
 *
 * 进度事件的基础接口。
 * @publicApi
 */
export interface HttpProgressEvent {
  /**
   * Progress event type is either upload or download.
   *
   * 进度事件的类型或者是上传或者是下载。
   */
  type: HttpEventType.DownloadProgress|HttpEventType.UploadProgress;

  /**
   * Number of bytes uploaded or downloaded.
   *
   * 已经上传或下载的字节数。
   */
  loaded: number;

  /**
   * Total number of bytes to upload or download. Depending on the request or
   * response, this may not be computable and thus may not be present.
   *
   * 要上传或下载的总字节数。它可能是无法计算出来的，因此也就可能不存在，取决于是请求还是响应。
   */
  total?: number;
}

/**
 * A download progress event.
 *
 * 下载进度事件。
 *
 * @publicApi
 */
export interface HttpDownloadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.DownloadProgress;

  /**
   * The partial response body as downloaded so far.
   *
   * 到目前为止已经下载的那部分响应体。
   *
   * Only present if the responseType was `text`.
   *
   * 只有当 responseType 是 `text` 时才会出现。
   */
  partialText?: string;
}

/**
 * An upload progress event.
 *
 * 上传进度事件。
 *
 * @publicApi
 */
export interface HttpUploadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.UploadProgress;
}

/**
 * An event indicating that the request was sent to the server. Useful
 * when a request may be retried multiple times, to distinguish between
 * retries on the final event stream.
 *
 * 用于表示请求已经发到服务器的事件。
 * 当请求可能被多次接受时很有用，以区分出最终事件流上的重试行为。
 *
 * @publicApi
 */
export interface HttpSentEvent {
  type: HttpEventType.Sent;
}

/**
 * A user-defined event.
 *
 * 用户定义的事件。
 *
 * Grouping all custom events under this type ensures they will be handled
 * and forwarded by all implementations of interceptors.
 *
 * 把所有自定义事件都分组在此类型下，以确保它们会被所有的拦截器所处理和转发。
 *
 * @publicApi
 */
export interface HttpUserEvent<T> {
  type: HttpEventType.User;
}

/**
 * An error that represents a failed attempt to JSON.parse text coming back
 * from the server.
 *
 * 一个错误对象，用来表示当视图用 JSON.parse 对从服务器返回的文本进行解析时出错。
 *
 * It bundles the Error object with the actual response body that failed to parse.
 *
 * 它把 `Error` 对象和解析出错的实际响应体绑在一起。
 *
 */
export interface HttpJsonParseError {
  error: Error;
  text: string;
}

/**
 * Union type for all possible events on the response stream.
 *
 * 响应流中所有可能出现的事件的联合类型。
 *
 * Typed according to the expected type of the response.
 *
 * 其类型取决于所期待的响应类型。
 *
 * @publicApi
 */
export type HttpEvent<T> =
    HttpSentEvent|HttpHeaderResponse|HttpResponse<T>|HttpProgressEvent|HttpUserEvent<T>;

/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * `HttpResponse` 和 `HttpHeaderResponse` 的共同基类。
 *
 * @publicApi
 */
export abstract class HttpResponseBase {
  /**
   * All response headers.
   *
   * 所有响应头。
   */
  readonly headers: HttpHeaders;

  /**
   * Response status code.
   *
   * 响应的状态码。
   */
  readonly status: number;

  /**
   * Textual description of response status code.
   *
   * 响应状态码的文本描述。
   *
   * Do not depend on this.
   *
   * 请不要在代码中依赖它。
   */
  readonly statusText: string;

  /**
   * URL of the resource retrieved, or null if not available.
   *
   * 所接收的资源的 URL，如果不可用则为 `null`。
   */
  readonly url: string|null;

  /**
   * Whether the status code falls in the 2xx range.
   *
   * 状态码是否位于 2xx 范围内。
   */
  readonly ok: boolean;

  /**
   * Type of the response, narrowed to either the full response or the header.
   *
   * 响应对象的类型，窄化为完整的响应对象或只有响应头。
   */
  // TODO(issue/24571): remove '!'.
  readonly type!: HttpEventType.Response|HttpEventType.ResponseHeader;

  /**
   * Super-constructor for all responses.
   *
   * 所有响应体的上级（super）构造器。
   *
   * The single parameter accepted is an initialization hash. Any properties
   * of the response passed there will override the default values.
   *
   * 接受的唯一参数是一个初始化哈希值。所传进来的响应对象的任何属性都会覆盖这些默认值。
   */
  constructor(
      init: {
        headers?: HttpHeaders,
        status?: number,
        statusText?: string,
        url?: string,
      },
      defaultStatus: number = 200, defaultStatusText: string = 'OK') {
    // If the hash has values passed, use them to initialize the response.
    // Otherwise use the default values.
    this.headers = init.headers || new HttpHeaders();
    this.status = init.status !== undefined ? init.status : defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;

    // Cache the ok value to avoid defining a getter.
    this.ok = this.status >= 200 && this.status < 300;
  }
}

/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * 一个部分 HTTP 请求，它只包括状态和响应头数据，但没有响应体。
 *
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 * `HttpHeaderResponse` 是一个可用于响应事件流的 `HttpEvent`，只有在要求了进度事件时才有效。
 *
 * @publicApi
 */
export class HttpHeaderResponse extends HttpResponseBase {
  /**
   * Create a new `HttpHeaderResponse` with the given parameters.
   *
   * 根据给定的参数创建新的 `HttpHeaderResponse` 对象。
   */
  constructor(init: {
    headers?: HttpHeaders,
    status?: number,
    statusText?: string,
    url?: string,
  } = {}) {
    super(init);
  }

  readonly type: HttpEventType.ResponseHeader = HttpEventType.ResponseHeader;

  /**
   * Copy this `HttpHeaderResponse`, overriding its contents with the
   * given parameter hash.
   *
   * 复制这个 `HttpHeaderResponse`，使用给定的参数哈希对象覆盖其内容。
   */
  clone(update: {headers?: HttpHeaders; status?: number; statusText?: string; url?: string;} = {}):
      HttpHeaderResponse {
    // Perform a straightforward initialization of the new HttpHeaderResponse,
    // overriding the current parameters with new ones if given.
    return new HttpHeaderResponse({
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined,
    });
  }
}

/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * 一个完整的 HTTP 响应对象，包括一个带类型的响应体（如果没返回内容，则为 `null`）。
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 *
 * `HttpResponse` 是一个用于事件响应流的 `HttpEvent`。
 * @publicApi
 */
export class HttpResponse<T> extends HttpResponseBase {
  /**
   * The response body, or `null` if one was not returned.
   *
   * 响应体，如果没有返回内容则为 `null`。
   */
  readonly body: T|null;

  /**
   * Construct a new `HttpResponse`.
   *
   * 构造一个新的 `HttpResponse`。
   */
  constructor(init: {
    body?: T|null,
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  } = {}) {
    super(init);
    this.body = init.body !== undefined ? init.body : null;
  }

  readonly type: HttpEventType.Response = HttpEventType.Response;

  clone(): HttpResponse<T>;
  clone(update: {headers?: HttpHeaders; status?: number; statusText?: string; url?: string;}):
      HttpResponse<T>;
  clone<V>(update: {
    body?: V|null,
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<V>;
  clone(update: {
    body?: any|null;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  } = {}): HttpResponse<any> {
    return new HttpResponse<any>({
      body: (update.body !== undefined) ? update.body : this.body,
      headers: update.headers || this.headers,
      status: (update.status !== undefined) ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined,
    });
  }
}

/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * 一个用于表示错误或失败的响应对象，或者来自执行请求时发生的错误给出的失败的 HTTP 状态码，或者来自在解析响应对象期间发生的其它错误。
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 *
 * 任何从 `Observable` 响应流中返回的错误都会被包装成 `HttpErrorResponse` 对象，以便在发生错误时，提供关于 HTTP 层状态的额外上下文信息。
 * 该错误或者包含一个包装好的错误对象，或者包含一个从服务端返回的错误响应体。
 *
 * @publicApi
 */
export class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = 'HttpErrorResponse';
  readonly message: string;
  readonly error: any|null;

  /**
   * Errors are never okay, even when the status code is in the 2xx success range.
   *
   * 只要是错误，其 `ok` 就永远为 `false`，就算其 HTTP 状态码是 2xx 也一样。
   */
  readonly ok = false;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }) {
    // Initialize with a default status of 0 / Unknown Error.
    super(init, 0, 'Unknown Error');

    // If the response was successful, then this was a parse error. Otherwise, it was
    // a protocol-level failure of some sort. Either the request failed in transit
    // or the server returned an unsuccessful status code.
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url || '(unknown url)'}`;
    } else {
      this.message = `Http failure response for ${init.url || '(unknown url)'}: ${init.status} ${
          init.statusText}`;
    }
    this.error = init.error || null;
  }
}
