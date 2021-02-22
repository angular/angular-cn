/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '@angular/core';

/**
 * Config object passed to initialize the platform.
 *
 * 传递配置对象以初始化平台。
 *
 * @publicApi
 */
export interface PlatformConfig {
  /**
   * The initial DOM to use to bootstrap the server application.
   *
   * 用于引导服务端应用程序的初始 DOM。
   *
   * @default create a new DOM using Domino
   *
   * 使用 Domino 创建一个新的 DOM
   */
  document?: string;
  /**
   * The URL for the current application state. This is used for initializing
   * the platform's location. `protocol`, `hostname`, and `port` will be
   * overridden if `baseUrl` is set.
   *
   * 当前应用程序状态的 URL。这用于初始化平台的 location。如果设置了 `baseUrl`，则将覆盖 `protocol`、`hostname`、`port`。
   *
   * @default none
   */
  url?: string;
  /**
   * Whether to append the absolute URL to any relative HTTP requests. If set to
   * true, this logic executes prior to any HTTP interceptors that may run later
   * on in the request. `baseUrl` must be supplied if this flag is enabled.
   *
   * 是否在 HTTP 请求中将绝对 URL 附加到任何相对 URL 上。如果设置为 true，则此逻辑就会在稍后的请求中运行任何 HTTP 拦截器之前执行。如果启用了此标志，则必须提供 `baseUrl`。
   *
   * @default false
   */
  useAbsoluteUrl?: boolean;
  /**
   * The base URL for resolving absolute URL for HTTP requests. It must be set
   * if `useAbsoluteUrl` is true, and must consist of protocol, hostname,
   * and optional port. This option has no effect if `useAbsoluteUrl` is not
   * enabled.
   *
   * 用于解析 HTTP 请求的绝对 URL 的基本 URL。如果 `useAbsoluteUrl` 为 true，则必须设置它，并且必须包含协议、主机名和可选端口。如果未启用 `useAbsoluteUrl` 则此选项无效。
   *
   */
  baseUrl?: string;
}

/**
 * The DI token for setting the initial config for the platform.
 *
 * DI 令牌，用于设置平台的初始配置。
 *
 * @publicApi
 */
export const INITIAL_CONFIG = new InjectionToken<PlatformConfig>('Server.INITIAL_CONFIG');

/**
 * A function that will be executed when calling `renderModuleFactory` or `renderModule` just
 * before current platform state is rendered to string.
 *
 * 在将当前平台状态渲染为字符串之前，调用 `renderModuleFactory` 或 `renderModule` 时要执行的函数。
 *
 * @publicApi
 */
export const BEFORE_APP_SERIALIZED =
    new InjectionToken<Array<() => void | Promise<void>>>('Server.RENDER_MODULE_HOOK');
