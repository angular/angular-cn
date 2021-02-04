/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from './di';
import {ComponentRef} from './linker/component_factory';


/**
 * A [DI token](guide/glossary#di-token "DI token definition") representing a unique string ID, used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated ViewEncapsulation.Emulated} is being used.
 *
 * 表示唯一字符串 ID 的 [DI 令牌](guide/glossary#di-token "DI 令牌定义")，主要用于在使用 {@link ViewEncapsulation#Emulated ViewEncapsulation.Emulated} 时为应用程序属性和 CSS 样式添加前缀。
 *
 * BY default, the value is randomly generated and assigned to the application by Angular.
 * To provide a custom ID value, use a DI provider <!-- TODO: provider --> to configure
 * the root {@link Injector} that uses this token.
 *
 * 默认情况下，该值是随机生成的，并且由 Angular 赋值给此应用。要提供一个自定义的 ID 值，可以使用一个 DI 提供者，根 {@link Injector} 会使用此令牌。
 *
 * @publicApi
 */
export const APP_ID = new InjectionToken<string>('AppId');

export function _appIdRandomProviderFactory() {
  return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}

/**
 * Providers that generate a random `APP_ID_TOKEN`.
 *
 * 生成随机 `APP_ID_TOKEN` 的提供者。
 *
 * @publicApi
 */
export const APP_ID_RANDOM_PROVIDER = {
  provide: APP_ID,
  useFactory: _appIdRandomProviderFactory,
  deps: <any[]>[],
};

function _randomChar(): string {
  return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}

/**
 * A function that is executed when a platform is initialized.
 *
 * 平台初始化时执行的函数。
 *
 * @publicApi
 */
export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>('Platform Initializer');

/**
 * A token that indicates an opaque platform ID.
 *
 * 标识不透明平台 ID 的令牌。
 *
 * @publicApi
 */
export const PLATFORM_ID = new InjectionToken<Object>('Platform ID');

/**
 * A [DI token](guide/glossary#di-token "DI token definition") that provides a set of callbacks to
 * be called for every component that is bootstrapped.
 *
 * 一个 [DI 令牌](guide/glossary#di-token "DI 令牌定义")，该令牌提供了一组针对每个要引导的组件调用的回调。
 *
 * Each callback must take a `ComponentRef` instance and return nothing.
 *
 * 每个回调都必须接受 `ComponentRef` 实例，并且不返回任何内容。
 *
 * `(componentRef: ComponentRef) => void`
 *
 * @publicApi
 */
export const APP_BOOTSTRAP_LISTENER =
    new InjectionToken<Array<(compRef: ComponentRef<any>) => void>>('appBootstrapListener');

/**
 * A [DI token](guide/glossary#di-token "DI token definition") that indicates the root directory of
 * the application
 *
 * 一个 [DI 令牌](guide/glossary#di-token "DI 令牌定义")，指示应用程序的根目录
 *
 * @publicApi
 */
export const PACKAGE_ROOT_URL = new InjectionToken<string>('Application Packages Root URL');
