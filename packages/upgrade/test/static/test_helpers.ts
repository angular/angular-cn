/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgZone, PlatformRef, Type} from '@angular/core';
import {UpgradeModule} from '@angular/upgrade/static';
import * as angular from '@angular/upgrade/static/src/common/angular1';
import {$ROOT_SCOPE} from '@angular/upgrade/static/src/common/constants';

import {createWithEachNg1VersionFn} from '../common/test_helpers';
export * from '../common/test_helpers';

export function bootstrap(
    platform: PlatformRef, Ng2Module: Type<{}>, element: Element, ng1Module: angular.IModule) {
  // We bootstrap the Angular module first; then when it is ready (async) we bootstrap the AngularJS
  // module on the bootstrap element (also ensuring that AngularJS errors will fail the test).
  return platform.bootstrapModule(Ng2Module).then(ref => {
    const ngZone = ref.injector.get<NgZone>(NgZone);
    const upgrade = ref.injector.get(UpgradeModule);
    const failHardModule: any = ($provide: angular.IProvideService) => {
      $provide.value('$exceptionHandler', (err: any) => { throw err; });
    };

    // The `bootstrap()` helper is used for convenience in tests, so that we don't have to inject
    // and call `upgrade.bootstrap()` on every Angular module.
    // In order to closer emulate what happens in real application, ensure AngularJS is bootstrapped
    // inside the Angular zone.
    //
    ngZone.run(() => upgrade.bootstrap(element, [failHardModule, ng1Module.name]));

    return upgrade;
  });
}

export const withEachNg1Version = createWithEachNg1VersionFn(angular.setAngularJSGlobal);

export function $apply(adapter: UpgradeModule, exp: angular.Ng1Expression) {
  const $rootScope = adapter.$injector.get($ROOT_SCOPE) as angular.IRootScopeService;
  $rootScope.$apply(exp);
}

export function $digest(adapter: UpgradeModule) {
  const $rootScope = adapter.$injector.get($ROOT_SCOPE) as angular.IRootScopeService;
  $rootScope.$digest();
}
