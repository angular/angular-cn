/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ModuleWithProviders, NgModule} from '@angular/core';

import {InternalFormsSharedModule, NG_MODEL_WITH_FORM_CONTROL_WARNING, REACTIVE_DRIVEN_DIRECTIVES, TEMPLATE_DRIVEN_DIRECTIVES} from './directives';
import {RadioControlRegistry} from './directives/radio_control_value_accessor';
import {FormBuilder} from './form_builder';

/**
 * Exports the required providers and directives for template-driven forms,
 * making them available for import by NgModules that import this module.
 *
 * 导出模板驱动表单所需的提供商和指令，使其可用于导入了该模块的 NgModule 中。
 *
 * @see [Forms Overview](/guide/forms-overview)
 * @see [Template-driven Forms Guide](/guide/forms)
 *
 * @publicApi
 */
@NgModule({
  declarations: TEMPLATE_DRIVEN_DIRECTIVES,
  providers: [RadioControlRegistry],
  exports: [InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
})
export class FormsModule {
}

/**
 * Exports the required infrastructure and directives for reactive forms,
 * making them available for import by NgModules that import this module.
 *
 * 导出响应式表单所需的基础设施和指令，使其能用于任何导入了本模块的 NgModule 中。
 *
 * @see [Forms Overview](guide/forms-overview)
 *
 * [表单概览](guide/forms-overview)
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * [响应式表单](/guide/reactive-forms)
 *
 * @publicApi
 */
@NgModule({
  declarations: [REACTIVE_DRIVEN_DIRECTIVES],
  providers: [FormBuilder, RadioControlRegistry],
  exports: [InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
})
export class ReactiveFormsModule {
  /**
   * @description
   * Provides options for configuring the reactive forms module.
   *
   * 提供了一些选项，供配置响应式表单模块。
   *
   * @param opts An object of configuration options
   *
   * 一个配置选项对象
   *
   * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
   * binding is used with reactive form directives.
   *
   *   `warnOnNgModelWithFormControl` 配置了当 `ngModel` 绑定与响应式表单指令一起使用时，发出警告的时机。
   *
   */
  static withConfig(opts: {
    /** @deprecated as of v6 */ warnOnNgModelWithFormControl: 'never'|'once'|'always'
  }): ModuleWithProviders<ReactiveFormsModule> {
    return {
      ngModule: ReactiveFormsModule,
      providers: [
        {provide: NG_MODEL_WITH_FORM_CONTROL_WARNING, useValue: opts.warnOnNgModelWithFormControl}
      ]
    };
  }
}
