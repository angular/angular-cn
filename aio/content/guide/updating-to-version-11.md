# Updating Angular

# 更新 Angular

This guide contains information related to updating to the latest version of Angular.

本指南包含了关于更新到 Angular 最新版本的相关信息。

## Updating CLI Apps

## 更新 CLI 应用

For step-by-step instructions on how to update to the latest Angular release (and leverage our automated migration tools to do so), use the interactive update guide at [update.angular.io](https://update.angular.io).

关于如何更新到最新版本 Angular（并利用我们的自动迁移工具）的分步说明，请参阅 [update.angular.io](https://update.angular.io) 上的交互式更新指南。

## Changes and Deprecations in Version 11

## 第 11 版的更改与弃用

<div class="alert is-helpful">

   For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

关于 Angular 的弃用和移除实践的更多信息，参阅 [Angular 发布实践](guide/releases#deprecation-practices "Angular Release Practices：弃用行为") 。

</div>

{@a breaking-changes}
### New Breaking Changes

### 新的重大变更

* Remove deprecated support for IE 9, 10, and IE mobile. See [PR 38931](https://github.com/angular/angular/pull/38931).

  移除对 IE 9,10 和 IE mobile 的已弃用的支持。参阅 [PR 38931](https://github.com/angular/angular/pull/38931) 。

* TypeScript 3.9 is no longer supported. Please update to TypeScript 4.0. See [PR 39313](https://github.com/angular/angular/pull/39313).

  不再支持 TypeScript 3.9。请更新到 TypeScript 4.0。参阅 [PR 39313](https://github.com/angular/angular/pull/39313) 。

* `NavigationExtras#preserveQueryParams` has been removed from `@angular/router`. See [PR 38762](https://github.com/angular/angular/pull/38762)

  `NavigationExtras#preserveQueryParams` 已从 `@angular/router` 移除。参阅 [PR 38762](https://github.com/angular/angular/pull/38762)

* `CollectionChangeRecord` has been removed from `@angular/core`. See [PR 38668](https://github.com/angular/angular/pull/38668).

  `CollectionChangeRecord` 已从 `@angular/core` 移除。参阅 [PR 38668](https://github.com/angular/angular/pull/38668) 。

* We changed the default value for `relativeLinkResolution` from `'legacy'` to `'corrected'` so that new applications are automatically opted-in to the corrected behavior from  [PR 22394](https://github.com/angular/angular/pull/22394). Applications which use the current default are updated by a migration to specify `'legacy'` to ensure the current behavior is maintained when the default is updated. See [PR 25609](https://github.com/angular/angular/pull/25609).

  `relativeLinkResolution` 的默认值从 `'legacy'` 更改为 `'corrected'` 以便新应用能自动从 [PR 22394 中](https://github.com/angular/angular/pull/22394)选择纠正后的行为。使用当前默认值的应用可以通过一项针对 `'legacy'` 的迁移进行更新，以确保在默认值更新时保持当前的行为不变。参阅 [PR 25609](https://github.com/angular/angular/pull/25609) 。

* Fixed a bug in the router where the arguments for `future` and `curr` snapshots were reversed in the call to `shouldReuseRoute` when processing child routes. Usually this ordering mistake doesn't matter because most implementations of [`shouldReuseRoute`](api/router/RouteReuseStrategy#shouldReuseRoute) just do
an equality comparison between `future` and `curr`. However, some implementations actually do rely on values specifically on
one of the two and will need to be updated. See [PR 26949](https://github.com/angular/angular/pull/26949).

  修复了路由器中的一个 bug， `shouldReuseRoute` 在处理子路由时，在调用 `future` 和 `curr` 快照的顺序反了。这种顺序上的错误通常无关紧要，因为大多数的 [`shouldReuseRoute`](api/router/RouteReuseStrategy#shouldReuseRoute) 实现只会在 `future` 和 `curr` 之间做一个相等的比较。但是，有些实现确实依赖于两者中的某一个值，并且要对其进行修改。参阅 [PR 26949](https://github.com/angular/angular/pull/26949) 。

* `ViewEncapsulation.Native` has been removed. Angular previously supported a view encapsulation mode `ViewEncapsulaion.Native` that was based on the v0 Shadow DOM Draft APIs. These APIs have been superceded by the final Shadow DOM APIs, which are enabled via `ViewEncapsulation.ShadowDom`. For background information about this change, see [Web Components update: more time to upgrade to v1 APIs](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade).

  `ViewEncapsulation.Native` 已被移除。 Angular 以前支持基于 v0 Shadow DOM Draft API 的视图封装模式 `ViewEncapsulaion.Native`。这些 API 已被最终版的 Shadow DOM API 所取代，后者通过 `ViewEncapsulation.ShadowDom` 启用。关于此更改的背景信息，请参阅 [Web 组件更新：有更多时间升级到 v1 API 了](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade) 。

* `@angular/platform-webworker` has been removed and will no longer be supported. See [PR 38846](https://github.com/angular/angular/pull/38846).

  `@angular/platform-webworker` 已被移除，并且不再受支持。参阅 [PR 38846](https://github.com/angular/angular/pull/38846) 。

* `@angular/platform-webworker` is no longer supported. No further versions will be published. See [PR 38846](https://github.com/angular/angular/pull/38846).

  不再支持 `@angular/platform-webworker`。也不会发布更多版本。参阅 [PR 38846](https://github.com/angular/angular/pull/38846) 。

* Updated the options for `initialNavigation`. For more information, see [initialNavigation](api/router/InitialNavigation) in the API documentation. See [PR 33128](https://github.com/angular/angular/pull/33128).

  更新了 `initialNavigation` 的选项。欲知详情，请参阅 API 文档中的 [initialNavigation](api/router/InitialNavigation)。参阅 [PR 33128](https://github.com/angular/angular/pull/33128) 。

* `DatePipe` no longer rounds up fractional milliseconds. See [PR 38009](https://github.com/angular/angular/pull/38009).

  `DatePipe` 不再对毫秒的小数部分进行四舍五入。参阅 [PR 38009](https://github.com/angular/angular/pull/38009) 。

* Locale data arrays are now read-only. See [PR 30397](https://github.com/angular/angular/pull/30397).

  现在，Locale 数据数组是只读的。参阅 [PR 30397](https://github.com/angular/angular/pull/30397) 。

* The injected `ControlValueAccessor` for `NG_VALUE_ACCESSOR` is now readonly. See [PR 29273](https://github.com/angular/angular/pull/29723).

  现在为 `NG_VALUE_ACCESSOR` 注入的 `ControlValueAccessor` 是只读的。参阅 [PR 29273](https://github.com/angular/angular/pull/29723) 。

* The type of `AbstractControl#parent` now indicates that it may be null. See [PR 32671](https://github.com/angular/angular/pull/32671).

  `AbstractControl#parent` 的类型现在可以正确的表示出它可能为空。参阅 [PR 32671](https://github.com/angular/angular/pull/32671) 。

* Calling `overrideProvider` before initializing the TestBed will now throw an error. See [PR 38717](https://github.com/angular/angular/pull/38717).

  现在，在初始化 TestBed 之前调用 `overrideProvider` 会抛出一个错误。参阅 [PR 38717](https://github.com/angular/angular/pull/38717) 。

* Types for many Angular built-in pipes have been either narrowed or expanded to be more accurate. For more information, see the corresponding [Pipes](https://angular.io/api?type=pipe) API documentation. See [PR 37447](https://github.com/angular/angular/pull/37447).

  许多 Angular 内置管道的类型定义要么缩小，要么扩展得更准确。欲知详情，请参阅相应的[管道](https://angular.io/api?type=pipe) API 文档。参阅 [PR 37447](https://github.com/angular/angular/pull/37447) 。

* Directives in the `@angular/forms` package used to have `any[]` as a type of validators and asyncValidators
arguments in constructors. Now these arguments are properly typed, so if your code relies on
directive constructor types it may require some updates to improve type safety. See [PR 38994](https://github.com/angular/angular/pull/38944).

  `@angular/forms` 包中的指令曾经把 `any[]` 作为构造函数中验证器和异步验证器参数的类型。这些参数现在都具有正确类型了，所以如果你的代码依赖于指令的构造函数类型，它可能会需要一些更新才能提高其类型安全性。参阅 [PR 38994](https://github.com/angular/angular/pull/38944) 。

* `routerLink` now accepts `undefined` inputs. See [PR 39151](https://github.com/angular/angular/pull/39151).

  `routerLink` 现在接受 `undefined` 作为输入。参阅 [PR 39151](https://github.com/angular/angular/pull/39151) 。

* The `async` function from `@angular/core/testing` has been renamed to `waitForAsync` in order to avoid confusion with the native JavaScript `async` syntax. The existing function is deprecated and will be removed in a future version. See [PR 37583](https://github.com/angular/angular/pull/37583).

  `@angular/core/testing` 的 `async` 函数已重命名为 `waitForAsync`，以免混淆原生的 JavaScript `async` 语法。该函数已弃用，并将在以后的版本中移除。参阅 [PR 37583](https://github.com/angular/angular/pull/37583) 。

{@a deprecations}
### New Deprecations

### 新的弃用

| Area | API or Feature | May be removed in |
| ---- | -------------- | ----------------- |
| 位置 | API 或特性 | 可能会移除于 |
| `@angular/core/testing` | Rename `async` to `waitForAsync` | <!--v11--> v13 |
| `@angular/core/testing` | 把 `waitForAsync` 重命名为 `async` | <!--v11--> v13 |

{@a removals}

### New Removals of Deprecated APIs

### 新移除了已弃用的 API

The following APIs have been removed starting with version 11.0.0*:

从 11.0.0\*开始，已经移除了以下 API：

| Package | API | Replacement | Notes |
| ------- | --- | ----------- | ----- |
| 包 | API | 替代品 | 备注 |
| `@angular/router` | `NavigationExtras#preserveQueryParams` | no action needed | NavigationExtras#preserveQueryParams has been removed from `@angular/router`. |
| `@angular/router` | `NavigationExtras#preserveQueryParams` | 什么也不用做 | NavigationExtras#preserveQueryParams 已从 `@angular/router` 移除。 |
| `@angular/core` | `CollectionChangeRecord` | no action needed | CollectionChangeRecord has been removed from `@angular/core`. |
| `@angular/core` | `CollectionChangeRecord` | 什么也不用做 | CollectionChangeRecord 已经从 `@angular/core` 移除了。 |
| `@angular/core` | `ViewEncapsulation.Native` | no action needed | Angular previously supported a view encapsulation mode `ViewEncapsulaion.Native` that was based on the v0 Shadow DOM Draft APIs. These APIs have been superceeded by the final Shadow DOM APIs, which are enabled via `ViewEncapsulation.ShadowDom`. For background information about this change, see [Web Components update: more time to upgrade to v1 APIs](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade). |
| `@angular/core` | `ViewEncapsulation.Native` | 什么也不用做 | Angular 以前支持基于 v0 Shadow DOM Draft API 的视图封装模式 `ViewEncapsulaion.Native`。这些 API 已被最终的 Shadow DOM API 所取代，它通过 `ViewEncapsulation.ShadowDom` 进行启用。关于此更改的背景信息，请参阅 [Web 组件更新：有更多时间升级到 v1 API了](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade) 。 |

{@a ivy}

## Ivy features and compatibility

## Ivy 的功能和兼容性

Since version 9, Angular Ivy is the default rendering engine. If you haven't heard of Ivy, you can read more about it in the [Angular Ivy guide](guide/ivy).

从版本 9 开始，Angular Ivy 就是默认的渲染引擎。如果你还没有听说过 Ivy，你可以在 [Angular Ivy 指南中](guide/ivy)阅读更多相关信息。

* Among other features, Ivy introduces more comprehensive type-checking within templates. For details, see [Template Type-checking](guide/template-typecheck).

  在其他特性中，Ivy 在模板中引入了更全面的类型检查。欲知详情，请参阅[模板类型检查](guide/template-typecheck)。

* For general guidance on debugging and a list of minor changes associated with Ivy, see the [Ivy compatibility guide](guide/ivy-compatibility).

  关于调试的一般性指导以及与 Ivy 相关的小改动列表，请参阅 [Ivy 兼容性指南](guide/ivy-compatibility)。

* For help with opting out of Ivy, see the instructions [here](guide/ivy#opting-out-of-angular-ivy).

  如需寻找如何不选用 Ivy 的帮助，请参阅[此处](guide/ivy#opting-out-of-angular-ivy)的说明。
