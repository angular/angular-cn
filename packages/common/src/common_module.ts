/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {COMMON_DIRECTIVES} from './directives/index';
import {DEPRECATED_PLURAL_FN, NgLocaleLocalization, NgLocalization, getPluralCase} from './i18n/localization';
import {COMMON_DEPRECATED_I18N_PIPES} from './pipes/deprecated/index';
import {COMMON_PIPES} from './pipes/index';


// Note: This does not contain the location providers,
// as they need some platform specific implementations to work.
/**
 * The module that includes all the basic Angular directives like {@link NgIf}, {@link NgForOf}, ...
 *
 * 该模块包含了所有基本的 Angular 指令，如 {@link NgIf}、{@link NgForOf} 等……
 */
@NgModule({
  declarations: [COMMON_DIRECTIVES, COMMON_PIPES],
  exports: [COMMON_DIRECTIVES, COMMON_PIPES],
  providers: [
    {provide: NgLocalization, useClass: NgLocaleLocalization},
  ],
})
export class CommonModule {
}

/**
 * A module that contains the deprecated i18n pipes.
 *
 * 该模块包含了已废弃的 i18n 管道。
 *
 * @deprecated from v5
 *
 * 从 Angular v5 开始
 */
@NgModule({
  declarations: [COMMON_DEPRECATED_I18N_PIPES],
  exports: [COMMON_DEPRECATED_I18N_PIPES],
  providers: [{provide: DEPRECATED_PLURAL_FN, useValue: getPluralCase}],
})
export class DeprecatedI18NPipesModule {
}
