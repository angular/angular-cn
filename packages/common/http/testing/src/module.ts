/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpBackend, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {HttpTestingController} from './api';
import {HttpClientTestingBackend} from './backend';


/**
 * Configures `HttpClientTestingBackend` as the `HttpBackend` used by `HttpClient`.
 *
 * 提供配置 `HttpClientTestingBackend` 作为 `HttpBackend` 所使用 `HttpClient` 。
 *
 * Inject `HttpTestingController` to expect and flush requests in your tests.
 *
 * 注入 `HttpTestingController` 以期望并刷新测试中的请求。
 *
 * @publicApi
 */
@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    HttpClientTestingBackend,
    {provide: HttpBackend, useExisting: HttpClientTestingBackend},
    {provide: HttpTestingController, useExisting: HttpClientTestingBackend},
  ],
})
export class HttpClientTestingModule {
}
