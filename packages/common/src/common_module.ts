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
 * Exports all the basic Angular directives and pipes,
 * such as `NgIf`, `NgForOf`, `DecimalPipe`, and so on.
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command.
 *
 * 该模块包含了所有基本的 Angular 指令，如 {@link NgIf}、{@link NgForOf} 等……
 *
 * * The `providers` options configure the NgModule's injector to provide
 * localization dependencies to members.
 *
 *   `providers` 选项配置了 NgModule 的注入器，来为其成员提供本地化依赖。
 *
 * * The `exports` options make the declared directives and pipes available for import
 * by other NgModules.
 *
 *   `exports` 选项让这里声明的指令和管道可以被导入到其它 NgModule 中。
 *
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
