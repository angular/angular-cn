/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {COMMON_DIRECTIVES} from './directives/index';
import {NgLocaleLocalization, NgLocalization} from './i18n/localization';
import {COMMON_PIPES} from './pipes/index';


// Note: This does not contain the location providers,
// as they need some platform specific implementations to work.
/**
 * Exports all the basic Angular directives and pipes,
 * such as `NgIf`, `NgForOf`, `DecimalPipe`, and so on.
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command.
 *
 * 导出所有基本的 Angular 指令和管道，例如 `NgIf`、`NgForOf`、`DecimalPipe` 等。
 * 它会由 `BrowserModule` 进行二次导出，当你使用 CLI 的 `new` 命令创建新应用时，`BrowserModule` 会自动包含在根模块 `AppModule` 中。
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
 * @publicApi
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
