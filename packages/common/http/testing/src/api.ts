/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpRequest} from '@angular/common/http';

import {TestRequest} from './request';

/**
 * Defines a matcher for requests based on URL, method, or both.
 *
 * 为基于 URL 和/或 method 的请求定义匹配器。
 *
 * @publicApi
 */
export interface RequestMatch {
  method?: string;
  url?: string;
}

/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * 控制器将被注入到测试中，从而可以模拟和刷新请求。
 *
 * @publicApi
 */
export abstract class HttpTestingController {
  /**
   * Search for requests that match the given parameter, without any expectations.
   *
   * 搜索与给定参数匹配且不带任何期望语句的请求。
   *
   */
  abstract match(match: string|RequestMatch|((req: HttpRequest<any>) => boolean)): TestRequest[];

  /**
   * Expect that a single request has been made which matches the given URL, and return its
   * mock.
   *
   * 期望发出一个与给定 URL 匹配的单个请求，然后返回其模拟对象。
   *
   * If no such request has been made, or more than one such request has been made, fail with an
   * error message including the given request description, if any.
   *
   * 如果没有发出这样的请求，或者发出过多个这样的请求，则失败，并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectOne(url: string, description?: string): TestRequest;

  /**
   * Expect that a single request has been made which matches the given parameters, and return
   * its mock.
   *
   * 期望发出一个与给定参数匹配的单个请求，然后返回其模拟对象。
   *
   * If no such request has been made, or more than one such request has been made, fail with an
   * error message including the given request description, if any.
   *
   * 如果没有发出这样的请求，或者发出过多个这样的请求，则失败，并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectOne(params: RequestMatch, description?: string): TestRequest;

  /**
   * Expect that a single request has been made which matches the given predicate function, and
   * return its mock.
   *
   * 期望发出一个与给定谓词函数匹配的单个请求，然后返回其模拟对象。
   *
   * If no such request has been made, or more than one such request has been made, fail with an
   * error message including the given request description, if any.
   *
   * 如果没有发出这样的请求，或者发出过多个这样的请求，则失败，并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectOne(matchFn: ((req: HttpRequest<any>) => boolean), description?: string):
      TestRequest;

  /**
   * Expect that a single request has been made which matches the given condition, and return
   * its mock.
   *
   * 期望发出一个与给定条件匹配的单个请求，然后返回其模拟对象。
   *
   * If no such request has been made, or more than one such request has been made, fail with an
   * error message including the given request description, if any.
   *
   * 如果没有发出这样的请求，或者发出过多个这样的请求，则失败，并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectOne(
      match: string|RequestMatch|((req: HttpRequest<any>) => boolean),
      description?: string): TestRequest;

  /**
   * Expect that no requests have been made which match the given URL.
   *
   * 期望没有发出过与给定 URL 匹配的请求。
   *
   * If a matching request has been made, fail with an error message including the given request
   * description, if any.
   *
   * 如果发出了匹配的请求，则失败并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectNone(url: string, description?: string): void;

  /**
   * Expect that no requests have been made which match the given parameters.
   *
   * 期望没有发出过与给定参数匹配的请求。
   *
   * If a matching request has been made, fail with an error message including the given request
   * description, if any.
   *
   * 如果发出了匹配的请求，则失败并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectNone(params: RequestMatch, description?: string): void;

  /**
   * Expect that no requests have been made which match the given predicate function.
   *
   * 期望没有发出过与给定谓词函数匹配的请求。
   *
   * If a matching request has been made, fail with an error message including the given request
   * description, if any.
   *
   * 如果发出了匹配的请求，则失败并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectNone(matchFn: ((req: HttpRequest<any>) => boolean), description?: string): void;

  /**
   * Expect that no requests have been made which match the given condition.
   *
   * 期望没有发出过与给定条件匹配的请求。
   *
   * If a matching request has been made, fail with an error message including the given request
   * description, if any.
   *
   * 如果发出了匹配的请求，则失败并显示一条错误消息，其中包括给定请求的描述（如果有）。
   *
   */
  abstract expectNone(
      match: string|RequestMatch|((req: HttpRequest<any>) => boolean), description?: string): void;

  /**
   * Verify that no unmatched requests are outstanding.
   *
   * 验证没有任何未匹配的请求正在等待。
   *
   * If any requests are outstanding, fail with an error message indicating which requests were not
   * handled.
   *
   * 如果有任何未完成的请求，则失败并显示一条错误消息，指出未处理哪些请求。
   *
   * If `ignoreCancelled` is not set (the default), `verify()` will also fail if cancelled requests
   * were not explicitly matched.
   *
   * 如果未设置过 `ignoreCancelled`（默认），且未明确匹配已取消的请求，则 `verify()` 就会失败。
   *
   */
  abstract verify(opts?: {ignoreCancelled?: boolean}): void;
}
