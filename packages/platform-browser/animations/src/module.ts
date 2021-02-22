/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BROWSER_ANIMATIONS_PROVIDERS, BROWSER_NOOP_ANIMATIONS_PROVIDERS} from './providers';

/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 *
 * 导出带有附加[依赖项注入提供者](guide/glossary#provider) 的`BrowserModule` 以便与动画一起使用。请参阅[动画](guide/animations)。
 *
 * @publicApi
 */
@NgModule({
  exports: [BrowserModule],
  providers: BROWSER_ANIMATIONS_PROVIDERS,
})
export class BrowserAnimationsModule {
}

/**
 * A null player that must be imported to allow disabling of animations.
 *
 * 必须导入一个空播放器以支持禁用动画。
 *
 * @publicApi
 */
@NgModule({
  exports: [BrowserModule],
  providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
})
export class NoopAnimationsModule {
}
