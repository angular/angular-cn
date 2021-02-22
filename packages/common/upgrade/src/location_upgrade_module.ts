/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {APP_BASE_HREF, CommonModule, HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy, PlatformLocation} from '@angular/common';
import {Inject, InjectionToken, ModuleWithProviders, NgModule, Optional} from '@angular/core';
import {UpgradeModule} from '@angular/upgrade/static';

import {$locationShim, $locationShimProvider} from './location_shim';
import {AngularJSUrlCodec, UrlCodec} from './params';


/**
 * Configuration options for LocationUpgrade.
 *
 * LocationUpgrade 的配置选项。
 *
 * @publicApi
 */
export interface LocationUpgradeConfig {
  /**
   * Configures whether the location upgrade module should use the `HashLocationStrategy`
   * or the `PathLocationStrategy`
   *
   * 配置 location 升级模块应使用 `HashLocationStrategy` 还是 `PathLocationStrategy`
   *
   */
  useHash?: boolean;
  /**
   * Configures the hash prefix used in the URL when using the `HashLocationStrategy`
   *
   * 配置使用 `HashLocationStrategy` 时 URL 中要使用的哈希前缀
   *
   */
  hashPrefix?: string;
  /**
   * Configures the URL codec for encoding and decoding URLs. Default is the `AngularJSCodec`
   *
   * 配置 URL 编解码器以对 URL 进行编码和解码。默认为 `AngularJSCodec`
   *
   */
  urlCodec?: typeof UrlCodec;
  /**
   * Configures the base href when used in server-side rendered applications
   *
   * 配置在服务器端渲染的应用程序中使用时的 base href
   *
   */
  serverBaseHref?: string;
  /**
   * Configures the base href when used in client-side rendered applications
   *
   * 配置在客户端渲染的应用程序中使用时的 base href
   *
   */
  appBaseHref?: string;
}

/**
 * A provider token used to configure the location upgrade module.
 *
 * 提供者令牌，用于配置 location 升级模块。
 *
 * @publicApi
 */
export const LOCATION_UPGRADE_CONFIGURATION =
    new InjectionToken<LocationUpgradeConfig>('LOCATION_UPGRADE_CONFIGURATION');

const APP_BASE_HREF_RESOLVED = new InjectionToken<string>('APP_BASE_HREF_RESOLVED');

/**
 * `NgModule` used for providing and configuring Angular's Unified Location Service for upgrading.
 *
 * `NgModule` 用于提供和配置 Angular 的统一 location 服务以进行升级。
 *
 * @see [Using the Unified Angular Location Service](guide/upgrade#using-the-unified-angular-location-service)
 *
 * [使用统一的 Angular location 服务](guide/upgrade#using-the-unified-angular-location-service)
 *
 * @publicApi
 */
@NgModule({imports: [CommonModule]})
export class LocationUpgradeModule {
  static config(config?: LocationUpgradeConfig): ModuleWithProviders<LocationUpgradeModule> {
    return {
      ngModule: LocationUpgradeModule,
      providers: [
        Location,
        {
          provide: $locationShim,
          useFactory: provide$location,
          deps: [UpgradeModule, Location, PlatformLocation, UrlCodec, LocationStrategy]
        },
        {provide: LOCATION_UPGRADE_CONFIGURATION, useValue: config ? config : {}},
        {provide: UrlCodec, useFactory: provideUrlCodec, deps: [LOCATION_UPGRADE_CONFIGURATION]},
        {
          provide: APP_BASE_HREF_RESOLVED,
          useFactory: provideAppBaseHref,
          deps: [LOCATION_UPGRADE_CONFIGURATION, [new Inject(APP_BASE_HREF), new Optional()]]
        },
        {
          provide: LocationStrategy,
          useFactory: provideLocationStrategy,
          deps: [
            PlatformLocation,
            APP_BASE_HREF_RESOLVED,
            LOCATION_UPGRADE_CONFIGURATION,
          ]
        },
      ],
    };
  }
}

export function provideAppBaseHref(config: LocationUpgradeConfig, appBaseHref?: string) {
  if (config && config.appBaseHref != null) {
    return config.appBaseHref;
  } else if (appBaseHref != null) {
    return appBaseHref;
  }
  return '';
}

export function provideUrlCodec(config: LocationUpgradeConfig) {
  const codec = config && config.urlCodec || AngularJSUrlCodec;
  return new (codec as any)();
}

export function provideLocationStrategy(
    platformLocation: PlatformLocation, baseHref: string, options: LocationUpgradeConfig = {}) {
  return options.useHash ? new HashLocationStrategy(platformLocation, baseHref) :
                           new PathLocationStrategy(platformLocation, baseHref);
}

export function provide$location(
    ngUpgrade: UpgradeModule, location: Location, platformLocation: PlatformLocation,
    urlCodec: UrlCodec, locationStrategy: LocationStrategy) {
  const $locationProvider =
      new $locationShimProvider(ngUpgrade, location, platformLocation, urlCodec, locationStrategy);

  return $locationProvider.$get();
}
