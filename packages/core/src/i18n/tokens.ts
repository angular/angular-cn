/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '../di/injection_token';

/**
 * Provide this token to set the locale of your application.
 * It is used for i18n extraction, by i18n pipes (DatePipe, I18nPluralPipe, CurrencyPipe,
 * DecimalPipe and PercentPipe) and by ICU expressions.
 *
 * 提供此令牌以设置应用程序的语言环境。它通过 i18n 管道（DatePipe、I18nPluralPipe、CurrencyPipe、DecimalPipe 和 PercentPipe）和 ICU 表达式用于 i18n 提取。
 *
 * See the [i18n guide](guide/i18n#setting-up-locale) for more information.
 *
 * 有关更多信息，请参见《 [i18n 指南》。](guide/i18n#setting-up-locale)
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```typescript
 * import { LOCALE_ID } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
 * });
 * ```
 *
 * @publicApi
 */
export const LOCALE_ID = new InjectionToken<string>('LocaleId');

/**
 * Provide this token to set the default currency code your application uses for
 * CurrencyPipe when there is no currency code passed into it. This is only used by
 * CurrencyPipe and has no relation to locale currency. Defaults to USD if not configured.
 *
 * 如果没有传递任何货币代码，请提供此令牌来设置你的应用程序用于 CurrencyPipe 的默认货币代码。仅由 CurrencyPipe 使用，与语言环境的货币无关。如果未配置，则默认为 USD。
 *
 * See the [i18n guide](guide/i18n#setting-up-locale) for more information.
 *
 * 有关更多信息，请参见[《i18n 指南》](guide/i18n#setting-up-locale)。
 *
 * <div class="alert is-helpful">
 *
 * **Deprecation notice:**
 *
 * **弃用通知：**
 *
 * The default currency code is currently always `USD` but this is deprecated from v9.
 *
 * 默认货币代码当前始终为 `USD` 但自 v9 起已弃用。
 *
 * **In v10 the default currency code will be taken from the current locale.**
 *
 * **在 v10 中，默认货币代码将从当前语言环境中获取。**
 *
 * If you need the previous behavior then set it by creating a `DEFAULT_CURRENCY_CODE` provider in
 * your application `NgModule`:
 *
 * 如果你需要以前的行为，请通过应用 `NgModule` 中的 `DEFAULT_CURRENCY_CODE` 提供者来进行设置：
 *
 * ```ts
 * {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
 * ```
 *
 * </div>
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```typescript
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
 * });
 * ```
 *
 * @publicApi
 */
export const DEFAULT_CURRENCY_CODE = new InjectionToken<string>('DefaultCurrencyCode');

/**
 * Use this token at bootstrap to provide the content of your translation file (`xtb`,
 * `xlf` or `xlf2`) when you want to translate your application in another language.
 *
 * 当你想用另一种语言翻译应用程序时，可以在引导程序中使用此令牌来提供翻译文件的内容（ `xtb`、`xlf` 或 `xlf2`）
 *
 * See the [i18n guide](guide/i18n#merge) for more information.
 *
 * 有关更多信息，请参见[《i18n 指南》](guide/i18n#setting-up-locale)。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```typescript
 * import { TRANSLATIONS } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * // content of your translation file
 * const translations = '....';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS, useValue: translations }]
 * });
 * ```
 *
 * @publicApi
 */
export const TRANSLATIONS = new InjectionToken<string>('Translations');

/**
 * Provide this token at bootstrap to set the format of your {@link TRANSLATIONS}: `xtb`,
 * `xlf` or `xlf2`.
 *
 * 在引导程序中提供此令牌以设置 {@link TRANSLATIONS} 的格式： `xtb`、`xlf` 或 `xlf2`。
 *
 * See the [i18n guide](guide/i18n#merge) for more information.
 *
 * 有关更多信息，请参见[《i18n 指南》](guide/i18n#setting-up-locale)。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```typescript
 * import { TRANSLATIONS_FORMAT } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
 * });
 * ```
 *
 * @publicApi
 */
export const TRANSLATIONS_FORMAT = new InjectionToken<string>('TranslationsFormat');

/**
 * Use this enum at bootstrap as an option of `bootstrapModule` to define the strategy
 * that the compiler should use in case of missing translations:
 *
 * 在系统启动时使用此枚举作为 `bootstrapModule` 的一个选项来定义策略，编译器应该在缺少翻译的情况下使用：
 *
 * - Error: throw if you have missing translations.
 *
 *   Error：如果缺少翻译，则抛出该错误。
 *
 * - Warning (default): show a warning in the console and/or shell.
 *
 *   Warning（默认）：在控制台和/或应用外壳中显示警告。
 *
 * - Ignore: do nothing.
 *
 *   Ignore：什么都不做。
 *
 * See the [i18n guide](guide/i18n#missing-translation) for more information.
 *
 * 有关更多信息，请参见[《i18n 指南》](guide/i18n#setting-up-locale)。
 *
 * @usageNotes
 *
 * ### Example
 *
 * ### 例子
 *
 * ```typescript
 * import { MissingTranslationStrategy } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   missingTranslation: MissingTranslationStrategy.Error
 * });
 * ```
 *
 * @publicApi
 */
export enum MissingTranslationStrategy {
  Error = 0,
  Warning = 1,
  Ignore = 2,
}
