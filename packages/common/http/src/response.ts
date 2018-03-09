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
 * @stable
 */
export enum HttpEventType {
  /**
   * The request was sent out over the wire.
   */
  Sent,

  /**
   * An upload progress event was received.
   */
  UploadProgress,

  /**
   * The response status code and headers were received.
   */
  ResponseHeader,

  /**
   * A download progress event was received.
   */
  DownloadProgress,

  /**
   * The full response including the body was received.
   */
  Response,

  /**
   * A custom event from an interceptor or a backend.
   */
  User,
}

/**
 * Base interface for progress events.
 *
 * @stable
 */
export interface HttpProgressEvent {
  /**
   * Progress event type is either upload or download.
   */
  type: HttpEventType.DownloadProgress|HttpEventType.UploadProgress;

  /**
   * Number of bytes uploaded or downloaded.
   */
  loaded: number;

  /**
   * Total number of bytes to upload or download. Depending on the request or
   * response, this may not be computable and thus may not be present.
   */
  total?: number;
}

/**
 * A download progress event.
 *
 * @stable
 */
export interface HttpDownloadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.DownloadProgress;

  /**
   * The partial response body as downloaded so far.
   *
   * Only present if the responseType was `text`.
   */
  partialText?: string;
}

/**
 * An upload progress event.
 *
 * @stable
 */
export interface HttpUploadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.UploadProgress;
}

/**
 * An event indicating that the request was sent to the server. Useful
 * when a request may be retried multiple times, to distinguish between
 * retries on the final event stream.
 *
 * @stable
 */
export interface HttpSentEvent { type: HttpEventType.Sent; }

/**
 * A user-defined event.
 *
 * Grouping all custom events under this type ensures they will be handled
 * and forwarded by all implementations of interceptors.
 *
 * @stable
 */
export interface HttpUserEvent<T> { type: HttpEventType.User; }

/**
 * An error that represents a failed attempt to JSON.parse text coming back
 * from the server.
 *
 * It bundles the Error object with the actual response body that failed to parse.
 *
 * @stable
 */
export interface HttpJsonParseError {
  error: Error;
  text: string;
}

/**
 * Union type for all possible events on the response stream.
 *
 * Typed according to the expected type of the response.
 *
 * @stable
 */
export type HttpEvent<T> =
    HttpSentEvent | HttpHeaderResponse | HttpResponse<T>| HttpProgressEvent | HttpUserEvent<T>;

/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * @stable
 */
export abstract class HttpResponseBase {
  /**
   * All response headers.
   */
  readonly headers: HttpHeaders;

  /**
   * Response status code.
   */
  readonly status: number;

  /**
   * Textual description of response status code.
   *
   * Do not depend on this.
   */
  readonly statusText: string;

  /**
   * URL of the resource retrieved, or null if not available.
   */
  readonly url: string|null;

  /**
   * Whether the status code falls in the 2xx range.
   */
  readonly ok: boolean;

  /**
   * Type of the response, narrowed to either the full response or the header.
   */
  readonly type: HttpEventType.Response|HttpEventType.ResponseHeader;

  /**
   * Super-constructor for all responses.
   *
   * The single parameter accepted is an initialization hash. Any properties
   * of the response passed there will override the default values.
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
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 * @stable
 */
export class HttpHeaderResponse extends HttpResponseBase {
  /**
   * Create a new `HttpHeaderResponse` with the given parameters.
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
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 * @stable
 */
export class HttpResponse<T> extends HttpResponseBase {
  /**
   * The response body, or `null` if one was not returned.
   */
  readonly body: T|null;

  /**
   * Construct a new `HttpResponse`.
   */
  constructor(init: {
    body?: T | null, headers?: HttpHeaders; status?: number; statusText?: string; url?: string;
  } = {}) {
    super(init);
    this.body = init.body !== undefined ? init.body : null;
  }

  readonly type: HttpEventType.Response = HttpEventType.Response;

  clone(): HttpResponse<T>;
  clone(update: {headers?: HttpHeaders; status?: number; statusText?: string; url?: string;}):
      HttpResponse<T>;
  clone<V>(update: {
    body?: V | null, headers?: HttpHeaders; status?: number; statusText?: string; url?: string;
  }): HttpResponse<V>;
  clone(update: {
    body?: any | null; headers?: HttpHeaders; status?: number; statusText?: string; url?: string;
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
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * @stable
 */
export class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = 'HttpErrorResponse';
  readonly message: string;
  readonly error: any|null;

  /**
   * Errors are never okay, even when the status code is in the 2xx success range.
   */
  readonly ok = false;

  constructor(init: {
    error?: any; headers?: HttpHeaders; status?: number; statusText?: string; url?: string;
  }) {
    // Initialize with a default status of 0 / Unknown Error.
    super(init, 0, 'Unknown Error');

    // If the response was successful, then this was a parse error. Otherwise, it was
    // a protocol-level failure of some sort. Either the request failed in transit
    // or the server returned an unsuccessful status code.
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url || '(unknown url)'}`;
    } else {
      this.message =
          `Http failure response for ${init.url || '(unknown url)'}: ${init.status} ${init.statusText}`;
    }
    this.error = init.error || null;
  }
}
