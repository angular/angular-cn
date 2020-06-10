# Updating to Angular version 9

# 更新到 Angular 版本 9

This guide contains information related to updating to version 9 of Angular.

本指南包含关于更新到下一个 Angular 版本所需的全部知识。

## Updating CLI Apps

## 更新 CLI 应用

For step-by-step instructions on how to update to the latest Angular release (and leverage our automated migration tools to do so), use the interactive update guide at [update.angular.io](https://update.angular.io).

有关如何更新到最新 Angular 版本的分步说明（并利用我们的自动迁移工具进行更新），请使用 [update.angular.io](https://update.angular.io) 上的交互式更新指南。

If you're curious about the specific migrations being run by the CLI, see the [automated migrations section](#migrations) for details on what code is changing and why.

如果你对 CLI 正在运行的某些迁移工作感到好奇，参见[“自动迁移”部分](#migrations)以了解关于要更改哪些代码以及更改原因的详细信息。

## Changes and Deprecations in Version 9

## 版本 9 中的更改和弃用

<div class="alert is-helpful">

   For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

   有关 Angular 弃用和移除实践的信息，参见 [Angular 的发布实践](guide/releases#deprecation-practices "Angular 发布惯例：弃用惯例")。

</div>

{@a breaking-changes}
### New Breaking Changes

### 新的重大变化

- Angular now compiles with Ivy by default. See the [Ivy compatibility section](#ivy).

  Angular 现在默认使用 Ivy 进行编译。参见 [Ivy 兼容性部分](#ivy)。

- CLI apps compile in [AOT mode](/guide/aot-compiler) by default (which includes template type-checking).
Users who only built with JIT before may see new type errors.
See our [template type-checking guide](guide/template-typecheck) for more information and debugging tips.

  CLI 应用程序默认情况下以 [AOT 模式](/guide/aot-compiler)编译（包括模板类型检查）。以前仅使用 JIT 构建的用户可能会看到新的类型错误。有关更多信息和调试提示，请参见我们的[模板类型检查指南](guide/template-typecheck)。

- Typescript 3.4 and 3.5 are no longer supported. Please update to Typescript 3.7.

  不再支持 TypeScript 3.4 和 3.5。请更新至 Typescript 3.7。

- `tslib` is now listed as a peer dependency rather than a direct dependency. If you are not using the CLI, you must manually install `tslib`, using `yarn add tslib` or `npm install tslib --save`.

  `tslib` 现在被列为对等(peer)依赖，而不是直接依赖。如果不使用 CLI，则必须手动安装 `tslib`，使用 `yarn add tslib` 或 `npm install tslib --save`。

{@a deprecations}

{@a 弃用}

### New Deprecations

### 新的弃用

| API | Replacement | Notes |
| --- | ----------- | ----- |
| API | 替代品 | 备注 |
| [`entryComponents`](api/core/NgModule#entryComponents) | none | See [`entryComponents`](guide/deprecations#entryComponents) |
| [`entryComponents`](api/core/NgModule#entryComponents) | 无 | 参见 [`entryComponents`](guide/deprecations#entryComponents) |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation)| `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | From v11 the default code will be extracted from the locale data given by `LOCAL_ID`, rather than `USD`. |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation)| `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | 从 v11 开始，默认代码将从由 `LOCAL_ID` 提供的语言环境数据中提取，而不再是固定值 `USD`。|
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | none | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](guide/deprecations#entryComponents) |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | 无 | 见[`ANALYZE_FOR_ENTRY_COMPONENTS`](guide/deprecations#entryComponents) |
| `ModuleWithProviders` without a generic | `ModuleWithProviders` with a generic | |
| 不带泛型的 `ModuleWithProviders` | 带泛型的 `ModuleWithProviders` | |
| Undecorated base classes that use Angular features | Base classes with `@Directive()` decorator that use Angular features |  |
| 使用 Angular 特性的不带装饰器的基类 | 具有 Angular 特性的带 `@Directive()` 装饰器的基类 | |
| `esm5` and `fesm5` distribution in `@angular/*` npm packages | `esm2015` and `fesm2015` entrypoints | See [`esm5` and `fesm5`](guide/deprecations#esm5-fesm5) |
| `@angular/*` npm 软件包中的 `esm5` 和 `fesm5` 分发版 | `esm2015` 和 `fesm2015` 入口点 | 参见 [`esm5` 和 `fesm5`](guide/deprecations#esm5-fesm5) |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | Same behavior, but type safe. |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | 行为相同，但类型安全。|

{@a removals}
### New Removals of Deprecated APIs

### 新删除的已弃用 API

| Package | API | Replacement | Notes |  |
| ------- | --- | ----------- | ----- | --- |
| 包 | API | 替代品 | 备注 |  |
| `@angular/core` | [`Renderer`](https://v8.angular.io/api/core/Renderer) | [`Renderer2`](api/core/Renderer2) | [Migration guide.](guide/migration-renderer) |  |
| `@angular/core` | [`Renderer`](https://v8.angular.io/api/core/Renderer) | [`Renderer2`](api/core/Renderer2) | [迁移指南](guide/migration-renderer) |  |
| `@angular/core` | [`RootRenderer`](https://v8.angular.io/api/core/RootRenderer) | [`RendererFactory2`](api/core/RendererFactory2) | none |  |
| `@angular/core` | [`RootRenderer`](https://v8.angular.io/api/core/RootRenderer) | [`RendererFactory2`](api/core/RendererFactory2) | 无 |  |
| `@angular/core` | [`RenderComponentType`](https://v8.angular.io/api/core/RenderComponentType) | [`RendererType2`](api/core/RendererType2) | none |  |
| `@angular/core` | [`RenderComponentType`](https://v8.angular.io/api/core/RenderComponentType) | [`RendererType2`](api/core/RendererType2) | 无 |  |
| `@angular/core` | [`WtfScopeFn`](https://v8.angular.io/api/core/WtfScopeFn) | none | v8 | See [Web Tracing Framework](guide/deprecations#wtf) |
| `@angular/core` | [`WtfScopeFn`](https://v8.angular.io/api/core/WtfScopeFn) | 无 | v8 | 参见 [Web 跟踪框架](guide/deprecations#wtf) |
| `@angular/core` | [`wtfCreateScope`](https://v8.angular.io/api/core/wtfCreateScope) | none | v8 | See [Web Tracing Framework](guide/deprecations#wtf) |
| `@angular/core` | [`wtfCreateScope`](https://v8.angular.io/api/core/wtfCreateScope) | 无 | v8 | 参见 [Web 跟踪框架](guide/deprecations#wtf) |
| `@angular/core` | [`wtfStartTimeRange`](https://v8.angular.io/api/core/wtfStartTimeRange) | none | v8 | See [Web Tracing Framework](guide/deprecations#wtf) |
| `@angular/core` | [`wtfStartTimeRange`](https://v8.angular.io/api/core/wtfStartTimeRange) | 无 | v8 | 参见 [Web 跟踪框架](guide/deprecations#wtf) |
| `@angular/core` | [`wtfEndTimeRange`](https://v8.angular.io/api/core/wtfEndTimeRange) | none | v8 | See [Web Tracing Framework](guide/deprecations#wtf) |
| `@angular/core` | [`wtfEndTimeRange`](https://v8.angular.io/api/core/wtfEndTimeRange) | 无 | v8 | 参见 [Web 跟踪框架](guide/deprecations#wtf) |
| `@angular/core` | [`wtfLeave`](https://v8.angular.io/api/core/wtfLeave) | none | v8 | See [Web Tracing Framework](guide/deprecations#wtf) |
| `@angular/core` | [`wtfLeave`](https://v8.angular.io/api/core/wtfLeave) | 无 | v8 | 参见 [Web 跟踪框架](guide/deprecations#wtf) |
| `@angular/common` | `DeprecatedI18NPipesModule` | [`CommonModule`](api/common/CommonModule#pipes) | none |  |
| `@angular/common` | `DeprecatedI18NPipesModule` | [`CommonModule`](api/common/CommonModule#pipes) | 无 |  |
| `@angular/common` | `DeprecatedCurrencyPipe` | [`CurrencyPipe`](api/common/CurrencyPipe) | none |  |
| `@angular/common` | `DeprecatedCurrencyPipe` | [`CurrencyPipe`](api/common/CurrencyPipe) | 无 |  |
| `@angular/common` | `DeprecatedDatePipe` | [`DatePipe`](api/common/DatePipe) | none |  |
| `@angular/common` | `DeprecatedDatePipe` | [`DatePipe`](api/common/DatePipe) | 无 |  |
| `@angular/common` | `DeprecatedDecimalPipe` | [`DecimalPipe`](api/common/DecimalPipe) | none |  |
| `@angular/common` | `DeprecatedDecimalPipe` | [`DecimalPipe`](api/common/DecimalPipe) | 无 |  |
| `@angular/common` | `DeprecatedPercentPipe` | [`PercentPipe`](api/common/PercentPipe) | none |  |
| `@angular/common` | `DeprecatedPercentPipe` | [`PercentPipe`](api/common/PercentPipe) | 无 |  |
| `@angular/forms` | [`NgFormSelectorWarning`](https://v8.angular.io/api/forms/NgFormSelectorWarning) | none |  |  |
| `@angular/forms` | [`NgFormSelectorWarning`](https://v8.angular.io/api/forms/NgFormSelectorWarning) | 无 |  |  |
| `@angular/forms` | `ngForm` element selector | `ng-form` element selector | none |  |
| `@angular/forms` | `ngForm` 元素选择器 | `ng-form` 元素选择器 | 无 |  |
| `@angular/service-worker` | `versionedFiles` | `files` | In the service worker configuration file `ngsw-config.json`, replace `versionedFiles` with `files`. See [Service Worker Configuration](guide/service-worker-config#assetgroups). |  |
| `@angular/service-worker` | `versionedFiles` | `files` | 在 Service Worker 配置文件 `ngsw-config.json`，用 `files` 替换 `versionedFiles`。参见 [Service Worker 配置](guide/service-worker-config#assetgroups)。|  |

{@a ivy}

## Ivy features and compatibility

## Ivy 的特性与兼容性

In Version 9, Angular Ivy is the default rendering engine. If you haven't heard of Ivy, you can read more about it in the [Angular Ivy guide](guide/ivy).

在版本 9 中，Angular Ivy 是默认渲染引擎。如果你还没有听说过 Ivy，则可以在 [Angular Ivy 指南](guide/ivy)中阅读有关它的更多信息。

* Among other features, Ivy introduces more comprehensive type-checking within templates. For details, see [Template Type-checking](guide/template-typecheck).

  除其它功能外，Ivy 在模板中引入了更全面的类型检查。有关详细信息，请参见[模板类型检查](guide/template-typecheck)。

* For general guidance on debugging and a list of minor changes associated with Ivy, see the [Ivy compatibility guide](guide/ivy-compatibility).

  关于调试的一般性指南以及与 Ivy 相关的较小更改的列表，请参见 [Ivy 兼容性指南](guide/ivy-compatibility)。

* For help with opting out of Ivy, see the instructions [here](guide/ivy#opting-out-of-angular-ivy).

  有关选择性禁用 Ivy 的帮助，参见[此处](guide/ivy#opting-out-of-angular-ivy)的说明。

{@a migrations}
## Automated Migrations for Version 9

## 版本 9 的自动迁移

Read about the migrations the CLI handles for you automatically:

了解 CLI 自动为你处理的迁移：

- [Migrating from `Renderer` to `Renderer2`](guide/migration-renderer)

  [从 `Renderer` 迁移到 `Renderer2`](guide/migration-renderer)

- [Migrating missing `@Directive()`/`@Component()` decorators](guide/migration-undecorated-classes)

  [迁移缺失的 `@Directive()` / `@Component()` 装饰器](guide/migration-undecorated-classes)

- [Migrating missing `@Injectable()` decorators and incomplete provider definitions](guide/migration-injectable)

  [迁移缺失的 `@Injectable()` 装饰器和不完整的服务提供者定义](guide/migration-injectable)

- [Migrating dynamic queries](guide/migration-dynamic-flag)

  [迁移动态查询](guide/migration-dynamic-flag)

- [Migrating to the new `$localize` i18n support](guide/migration-localize)

  [迁移到新的 `$localize` i18n 支持](guide/migration-localize)

- [Migrating `ModuleWithProviders`](guide/migration-module-with-providers)

  [迁移 `ModuleWithProviders`](guide/migration-module-with-providers)

