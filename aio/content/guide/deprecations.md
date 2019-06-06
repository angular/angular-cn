# Deprecated APIs and Features

# 弃用的 API 和特性


Angular strives to balance innovation and stability. 
Sometimes, APIs and features become obsolete and need to be removed or replaced so that Angular can stay current with new best practices, changing dependencies, or changes in the (web) platform itself. 

Angular 力图兼顾创新与稳定。但有时，API 和特性已经过时，需要进行删除或替换，以便 Angular 可以及时跟上新的最佳实践、依赖项变更或者 Web 平台自身的变化。


To make these transitions as easy as possible, we deprecate APIs and features for a period of time before removing them. This gives you time to update your apps to the latest APIs and best practices.

为了让这些转换变得尽可能简单，我们会在删除 API 和特性之前先弃用它们一段时间。让你有时间把应用更新到最新的 API 和最佳实践。


This guide contains a summary of all Angular APIs and features that are currently deprecated. 

本指南包含了当前不推荐使用的所有 Angular API 和特性的汇总表。


<div class="alert is-helpful">

Features and APIs that were deprecated in v6 or earlier are candidates for removal in version 9 or any later major version. For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

v6 或更早版本中已弃用的特性和 API 将会在版本 9 或更高级版本中删除。要了解 Angular 中关于弃用和删除的实践，参见[Angular 发布实践](guide/releases#deprecation-practices "Angular 发布实践：弃用实践") 。


For step-by-step instructions on how to update to the latest Angular release, use the interactive update guide at [update.angular.io](https://update.angular.io). 

有关如何更新到最新 Angular 版本的分步说明，请参阅 [update.angular.io](https://update.angular.io) 上的交互式更新指南。


</div>

## Deprecated APIs

## 已弃用的 API


This section contains a complete list all of the currently-deprecated APIs, with details to help you plan your migration to a replacement. 

本节包含所有当前已弃用的 API 的完整列表，其中包含一些可帮助你规划如何迁移到其替代品的详细信息。


<div class="alert is-helpful">

Tip: In the [API reference section](api) of this doc site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [**Status: deprecated**](api?status=deprecated).

提示：在本文档站的 [API参考手册部分](api)，不推荐使用的 API 会用~~删除线~~标记出来。你可以按[**状态**: 已弃用](api?status=deprecated)来过滤 API 列表。


</div>

#### @angular/common


| API                                                                 | Replacement                                     | Deprecation announced | Notes                    |
| ------------------------------------------------------------------- | ----------------------------------------------- | --------------------- | ------------------------ |
| API                                                                 | 替代品                                            | 已宣布弃用        | 备注                     |
| [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) | [`CommonModule`](api/common/CommonModule#pipes) | v5                    | See [Pipes](#i18n-pipes) |
| [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) | [`CommonModule`](api/common/CommonModule#pipes) | v5                    | 参见[管道](#i18n-pipes)    |
| [`DeprecatedCurrencyPipe`](api/common/DeprecatedCurrencyPipe)       | [`CurrencyPipe`](api/common/CurrencyPipe)       | v5                    | See [Pipes](#i18n-pipes) |
| [`DeprecatedCurrencyPipe`](api/common/DeprecatedCurrencyPipe)       | [`CurrencyPipe`](api/common/CurrencyPipe)       | v5                    | 参见[管道](#i18n-pipes)    |
| [`DeprecatedDatePipe`](api/common/DeprecatedDatePipe)               | [`DatePipe`](api/common/DatePipe)               | v5                    | See [Pipes](#i18n-pipes) |
| [`DeprecatedDatePipe`](api/common/DeprecatedDatePipe)               | [`DatePipe`](api/common/DatePipe)               | v5                    | 参见[管道](#i18n-pipes)    |
| [`DeprecatedDecimalPipe`](api/common/DeprecatedDecimalPipe)         | [`DecimalPipe`](api/common/DecimalPipe)         | v5                    | See [Pipes](#i18n-pipes) |
| [`DeprecatedDecimalPipe`](api/common/DeprecatedDecimalPipe)         | [`DecimalPipe`](api/common/DecimalPipe)         | v5                    | 参见[管道](#i18n-pipes)    |
| [`DeprecatedPercentPipe`](api/common/DeprecatedPercentPipe)         | [`PercentPipe`](api/common/PercentPipe)         | v5                    | See [Pipes](#i18n-pipes) |
| [`DeprecatedPercentPipe`](api/common/DeprecatedPercentPipe)         | [`PercentPipe`](api/common/PercentPipe)         | v5                    | 参见[管道](#i18n-pipes)    |

#### @angular/core

| API                                                             | Replacement                                                                      | Deprecation announced | Notes                                                                                                                                                                                           |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API                                                             | 替代品                                                                             | 已宣布弃用        | 备注                                                                                                                                                                                            |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord)     | [`IterableChangeRecord`](api/core/IterableChangeRecord)                          | v4                    | none                                                                                                                                                                                            |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord)     | [`IterableChangeRecord`](api/core/IterableChangeRecord)                          | v4                    | 无                                                                                                                                                                                            |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer)       | n/a                                                                              | v4                    | Not part of public API.                                                                                                                                                                         |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer)       | 不适用                                                                           | v4                    | 不属于公共 API。                                                                                                                                                                               |
| [`defineInjectable`](api/core/defineInjectable)                 | `ɵɵdefineInjectable`                                                             | v8                    | Used only in generated code. No source code should depend on this API.                                                                                                                          |
| [`defineInjectable`](api/core/defineInjectable)                 | `ɵɵdefineInjectable`                                                             | v8                    | 仅在生成的代码中使用。没有源码会依赖这个 API。                                                                                                                                               |
| [`inject`](api/core/inject)                                     | `ɵɵinject`                                                                       | v8                    | Used only in generated code. No source code should depend on this API.                                                                                                                          |
| [`inject`](api/core/inject)                                     | `ɵɵinject`                                                                       | v8                    | 仅在生成的代码中使用。没有源码会依赖这个 API。                                                                                                                                               |
| [`ReflectiveInjector`](api/core/ReflectiveInjector)             | [`Injector.create`](api/core/Injector#create)                                    | v5                    | See [`ReflectiveInjector`](#reflectiveinjector)                                                                                                                                                 |
| [`ReflectiveInjector`](api/core/ReflectiveInjector)             | [`Injector.create`](api/core/Injector#create)                                    | v5                    | 参见 [`ReflectiveInjector`](#reflectiveinjector)                                                                                                                                                 |
| [`ReflectiveKey`](api/core/ReflectiveKey)                       | none                                                                             | v5                    | none                                                                                                                                                                                            |
| [`ReflectiveKey`](api/core/ReflectiveKey)                       | 无                                                                             | v5                    | 无                                                                                                                                                                                            |
| [`RenderComponentType`](api/core/RenderComponentType)           | [`RendererType2`](api/core/RendererType2) and  [`Renderer2`](api/core/Renderer2) | v4                    | none                                                                                                                                                                                            |
| [`RenderComponentType`](api/core/RenderComponentType)           | [`RendererType2`](api/core/RendererType2)和[`Renderer2`](api/core/Renderer2)     | v4                    | 无                                                                                                                                                                                            |
| [`Renderer`](api/core/Renderer)                                 | [`Renderer2`](api/core/Renderer2)                                                | v4                    | none                                                                                                                                                                                            |
| [`Renderer`](api/core/Renderer)                                 | [`Renderer2`](api/core/Renderer2)                                                | v4                    | 无                                                                                                                                                                                            |
| [`RootRenderer`](api/core/RootRenderer)                         | [`RendererFactory2`](api/core/RendererFactory2)                                  | v4                    | none                                                                                                                                                                                            |
| [`RootRenderer`](api/core/RootRenderer)                         | [`RendererFactory2`](api/core/RendererFactory2)                                  | v4                    | 无                                                                                                                                                                                            |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom)            | v6                    | Use the native encapsulation mechanism of the renderer. See [view.ts](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32). |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom)            | v6                    | 使用渲染器的原生封装方式（Native）。参见 [view.ts](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32)                                |

#### @angular/core/testing

| API                                                                                                       | Replacement                                                                           | Deprecation announced | Notes |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------- | ----- |
| API                                                                                                       | 替代品                                                                                  | 已宣布弃用        | 备注  |
| [`TestBed.deprecatedOverrideProvider()`](api/core/testing/TestBed#deprecatedoverrideprovider)             | [`TestBed.overrideProvider()`](api/core/testing/TestBed#overrideprovider)             | v7                    | none  |
| [`TestBed.deprecatedOverrideProvider()`](api/core/testing/TestBed#deprecatedoverrideprovider)             | [`TestBed.overrideProvider()`](api/core/testing/TestBed#overrideprovider)             | v7                    | 无  |
| [`TestBedStatic.deprecatedOverrideProvider()`](api/core/testing/TestBedStatic#deprecatedoverrideprovider) | [`TestBedStatic.overrideProvider()`](api/core/testing/TestBedStatic#overrideprovider) | v5                    | none  |
| [`TestBedStatic.deprecatedOverrideProvider()`](api/core/testing/TestBedStatic#deprecatedoverrideprovider) | [`TestBedStatic.overrideProvider()`](api/core/testing/TestBedStatic#overrideprovider) | v5                    | 无  |

#### @angular/forms

| API                                                        | Replacement | Deprecation announced | Notes                    |
| ---------------------------------------------------------- | ----------- | --------------------- | ------------------------ |
| API                                                        | 替代品        | 已宣布弃用        | 备注                     |
| [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) | n/a         | v6                    | See [ngForm](#ngform).   |
| [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) | 不适用      | v6                    | 参见 [ngForm](#ngform) 。 |

#### @angular/router

| API                                                                      | Replacement                                                              | Deprecation announced | Notes |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | --------------------- | ----- |
| API                                                                      | 替代品                                                                     | 已宣布弃用        | 备注  |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4                    | none  |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4                    | 无  |

#### @angular/upgrade

| API                             | Replacement                                     | Deprecation announced | Notes                                          |
| ------------------------------- | ----------------------------------------------- | --------------------- | ---------------------------------------------- |
| API                             | 替代品                                            | 已宣布弃用        | 备注                                           |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
| [所有入口点](api/upgrade)       | [`@angular/upgrade/static`](api/upgrade/static) | v5                    | 参见[从 AngularJS 升级](guide/upgrade) 。        |

#### @angular/upgrade/static

| API                                                 | Replacement                                                   | Deprecation announced | Notes                                          |
| --------------------------------------------------- | ------------------------------------------------------------- | --------------------- | ---------------------------------------------- |
| API                                                 | 替代品                                                          | 已宣布弃用        | 备注                                           |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5                    | 参见[从 AngularJS 升级](guide/upgrade) 。        |
| [`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5                    | See [Upgrading from AngularJS](guide/upgrade). |
| [`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5                    | 参见[从 AngularJS 升级](guide/upgrade) 。        |

{@a deprecated-features}


## Deprecated features

## 已弃用的特性


This section lists all of the currently-deprecated features, which includes template syntax, configuration options, and any other deprecations not listed in the [Deprecated APIs](#deprecated-apis) section above. It also includes deprecated API usage scenarios or API combinations, to augment the information above. 

本节列出了所有当前已弃用的特性，包括模板语法、配置选项，以及前面[已弃用的 API ](#deprecated-apis)部分未列出的其它弃用。它还包括已弃用的 API 用例或 API 组合，以增强上述信息。


{@a component-styles}
### Component styles

### 组件样式


The shadow-piercing descendant combinator is deprecated and support is being removed from major browsers and tools. As such, in v4 we deprecated support in Angular for all 3 of `/deep/`, `>>>` and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

刺穿 Shadow DOM 的 CSS 组合符已经弃用，并且主要的浏览器和工具都已删除它。因此，在 v4 中，Angular 也弃用了对 `/deep/`，`>>>` 和 `::ng-deep` 的支持。在彻底删除它之前，我们首选`::ng-deep` ，以便和各种工具实现更广泛的兼容。


For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep")
 in the Component Styles guide. 

欲知详情，参阅“组件样式”一章中的 [/deep/，>>> 和 :: ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "“组件样式”指南，代号为deep和ngdeep")。


{@a template-tag}

### &lt;template&gt; tag

### &lt;template> 标签


The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/aot-compiler#enablelegacytemplate) guide. 

`<template>` 标记在 v4 中已弃用，以避免与同名的 DOM 元素冲突（例如当使用 Web Components 时）。请改用 `<ng-template>`。欲知详情，请参阅[预先编译](guide/aot-compiler#enablelegacytemplate)一章。


{@a ngform}

### ngForm element selector

### ngForm 元素选择器


Support for using `ngForm` element selector was deprecated in v6. 
It has been deprecated to be consistent with other core Angular selectors, which are typically written in kebab-case.

在 v6 中不再支持使用 `ngForm` 元素选择器了。它已被弃用，以便与其它核心 Angular 选择器保持一致，那些选择器通常写作中线形式（kebab-case）。


Deprecated:

已弃用：

```
<ngForm #myForm="ngForm">
```

Replacement: 

替代品：

```
<ng-form #myForm="ngForm">
```

The [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) directive is solely used to display warnings when the deprecated `ngForm` selector is used. 

当使用这个已弃用的 `ngForm` 选择器时， [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) 指令只是用来显示警告信息的。


{@a ngmodel-reactive}

### ngModel with reactive forms

### 和响应式表单一起使用 ngModel


Support for using the `ngModel` input property and `ngModelChange` event with reactive form directives was deprecated in version 6.

版本 6 中已弃用：和响应式表单指令一起使用 `ngModel` 和 `ngModelChange`。

For more information, see the usage notes for [`FormControlDirective`](api/forms/FormControlDirective#use-with-ngmodel) and [`FormControlName`](api/forms/FormControlName#use-with-ngmodel). 

欲知详情，请参阅 [`FormControlDirective`](api/forms/FormControlDirective#use-with-ngmodel) 和 [`FormControlName`](api/forms/FormControlName#use-with-ngmodel) 的用法说明部分。


{@a sw-versionedfiles}

### Service worker versionedFiles

### Service Worker 的 versionedFiles


In the service worker configuration file `ngsw-config.json`, `versionedFiles` and `files` have the same behavior. As of v6, `versionedFiles` is deprecated; use `files` instead. 

在 Service Worker 的配置文件 `ngsw-config.json` 中，`versionedFiles` 和 `files` 的行为是完全一样的。从 v6 开始，弃用 `versionedFiles`，请改用`files`。


For more information, see [Service Worker Configuration](guide/service-worker-config#assetgroups). 

欲知详情，请参阅[Service Worker 配置](guide/service-worker-config#assetgroups) 。


{@a reflectiveinjector}

### ReflectiveInjector

In v5, Angular replaced the `ReflectiveInjector` with the `StaticInjector`. The injector no longer requires the Reflect polyfill, reducing application size for most developers. 

在 v5 中，Angular 用 `StaticInjector` 代替了 `ReflectiveInjector`。该注入器不再需要 Reflect 的腻子脚本，对大部分开发人员来说都显著减小了应用的体积。


Before: 

之前：

```
ReflectiveInjector.resolveAndCreate(providers);
```

After:

之后：

```
Injector.create({providers});
```

{@a i18n-pipes}

### Pipes using Intl API

### 使用 Intl API 的管道


<!-- 
From https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced
-->

Angular used to rely on the browser to provide number, date, and currency formatting using browser i18n APIs. This practice meant that most apps needed to use a polyfill, users were seeing inconsistent results across browsers, and common formats (such as the currency pipe) didn’t match developer expectations out of the box.

Angular 曾依赖浏览器的 i18n API，来提供数字、日期和货币的格式化功能。这种做法意味着大多数应用都需要使用腻子脚本，用户还会看到不同浏览器上的结果不一致，并且常见的格式（例如货币管道）不能满足开发者的期望。


In version 4.3, Angular introduced new number, date, and currency pipes that increase standardization across browsers and eliminate the need for i18n polyfills. These pipes use the Unicode Common Locale Data Repository (CLDR) instead of the JS Intl API to provide extensive locale support. 

在 4.3 版本中，Angular 引入了新的数字，日期和货币管道，可以提高浏览器的标准化水平，并且无需 i18n 的腻子脚本。这些管道使用通用语言环境数据仓库（CLDR）而不是 JS Intl API，以便提供更广泛的本地化支持。


In version 5.0.0, Angular updated its standard pipes to use the CLRD implementation. 
At that time, Angular also added [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) and related APIs to provide limited-time access to the old behavior. If you need to use these `Deprecated*` pipes, see [Angular change log](https://github.com/angular/angular/blob/master/CHANGELOG.md#i18n-pipes) and the [Date Formats mappings](https://docs.google.com/spreadsheets/d/12iygt-_cakNP1VO7MV9g4lq9NsxVWG4tSfc98HpHb0k/edit#gid=0 "Date Formats Google sheet"). 

在 5.0.0 版本中，Angular 修改了它的标准管道，以便使用 CLRD 来实现。那时，Angular 还添加了[`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) 和相关的 API 来提供对原有行为的限时访问。如果你要使用这些 `Deprecated*` 管道，可参见 [Angular 的变更日志](https://github.com/angular/angular/blob/master/CHANGELOG.md#i18n-pipes)和[日期格式的映射表](https://docs.google.com/spreadsheets/d/12iygt-_cakNP1VO7MV9g4lq9NsxVWG4tSfc98HpHb0k/edit#gid=0 "日期格式Google表格") 。


Reminder: If you use these `Deprecated*` pipes, you should migrate to the current APIs listed above as soon as possible. These deprecated APIs are candidates for removal in the next major release. 

提醒：如果你用到了这些 `Deprecated*` 管道，那么你应该尽快迁移到上面列出的新 API。这些已弃用的 API 都是下一个主版本中准备删除的 API。


{@a loadChildren}

### loadChildren string syntax

### loadChildren 字符串语法


When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript. Angular created our own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it. Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

当 Angular 第一次引入惰性路由时，还没有浏览器能支持动态加载额外的 JavaScript。因此 Angular 创建了自己的方案，所用的语法是 `loadChildren: './lazy/lazy.module#LazyModule'` 并且还构建了一些工具来支持它。现在，很多浏览器都已支持 ECMAScript 的动态导入，Angular 也正朝着这个新语法前进。


In v8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

在 v8 中，不推荐使用 [`loadChildren`](api/router/LoadChildren) 路由规范的字符串语法，[`loadChildren`](api/router/LoadChildren) 支持使用基于 `import()` 的新语法。


Before: 

之前：

```
const routes: Routes = [{
  path: 'lazy',
  // The following string syntax for loadChildren is deprecated
  loadChildren: './lazy/lazy.module#LazyModule'
}];
```

After: 

之后：

```
const routes: Routes = [{
  path: 'lazy',
  // The new import() syntax 
  loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
}];
```

<div class="alert is-helpful">

**v8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically. Prior to version 7, the `import()` syntax only works in JIT mode (with view engine). 

**v8 更新**：当你升级到版本 8 时，[`ng update`](cli/update) 命令会自动执行转换。在版本 7 之前，`import()` 语法只能在 JIT 模式下运行（和视图引擎一起）。


</div>

{@a activatedroute-props}

### ActivatedRoute params and queryParams properties

### ActivatedRoute 的 params 和 queryParams 属性


[ActivatedRoute](api/router/ActivatedRoute) contains two [properties](api/router/ActivatedRoute#properties) that are less capable than their replacements and may be deprecated in a future Angular version.

[ActivatedRoute](api/router/ActivatedRoute) 包含两个[属性](api/router/ActivatedRoute#properties) ，它们的能力低于它们的替代品，在将来的 Angular 版本中可能会弃用。


| Property      | Replacement     |
| ------------- | --------------- |
| 属性          | 替代品            |
| `params`      | `paramMap`      |
| `params`      | `paramMap`      |
| `queryParams` | `queryParamMap` |
| `queryParams` | `queryParamMap` |

For more information see the [Router guide](guide/router#activated-route). 

欲知详情，参见[路由器指南](guide/router#activated-route) 。


{@a removed}

## Removed APIs

## 已删除的 API


The following APIs have been removed starting with version 8.0.0: 

从 8.0.0 开始，已删除下列 API：


| Package                                                           | API                                                               | Replacement                                                                     | Notes                                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 包                                                              | API                                                               | 替代品                                                                            | 备注                                                                             |
| [`@angular/http`](https://v7.angular.io/api/http)                 | All exports                                                       | [`@angular/common/http`](https://v7.angular.io/api/common/http)                 | See [below](#http).                                                              |
| [`@angular/http`](https://v7.angular.io/api/http)                 | 全部导出                                                          | [`@angular/common/http`](https://v7.angular.io/api/common/http)                 | 参见[下文](#http) 。                                                               |
| [`@angular/http/testing`](https://v7.angular.io/api/http/testing) | All exports                                                       | [`@angular/common/http/testing`](https://v7.angular.io/api/common/http/testing) | See [below](#http).                                                              |
| [`@angular/http/testing`](https://v7.angular.io/api/http/testing) | 全部导出                                                          | [`@angular/common/http/testing`](https://v7.angular.io/api/common/http/testing) | 参见[下文](#http) 。                                                               |
| `@angular/platform-browser`                                       | [`DOCUMENT`](https://v7.angular.io/api/platform-browser/DOCUMENT) | [`DOCUMENT` in `@angular/common`](https://v7.angular.io/api/common/DOCUMENT)    | Updating to version 8 with [`ng update`](cli/update) changes this automatically. |
| `@angular/platform-browser`                                       | [`DOCUMENT`](https://v7.angular.io/api/platform-browser/DOCUMENT) | [`@angular/common` `DOCUMENT`](https://v7.angular.io/api/common/DOCUMENT)       | 使用 [`ng update`](cli/update) 更新到版本 8 时会自动更改。                             |

<!-- The following anchor is used by redirects from the removed API pages. Do not change or remove. -->

{@a http}

### @angular/http

<!-- 
Deprecation announced in version 5 
https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced) 
-->

The entire [`@angular/http`](http://v7.angular.io/api/http) package has been removed. Use [`@angular/common/http`](api/common/http) instead.  

已删除了整个 [`@angular/http`](http://v7.angular.io/api/http) 包。请改用 [`@angular/common/http`](api/common/http)。


The new API is a smaller, easier, and more powerful way to make HTTP requests in Angular. 
The new API simplifies the default ergonomics: There is no need to map by invoking the `.json()` method. 
It also supports typed return values and interceptors. 

新的 API 用一种更小、更简单、更强大的方式来在 Angular 中发起 HTTP 请求。新的 API 简化成了更人性化的默认设计：不用再通过调用 `.json()` 方法进行映射。它还支持带类型的返回值，以及拦截器。


To update your apps:

要更新你的应用：


* Replace `HttpModule` with [`HttpClientModule`](api/common/http/HttpClientModule) (from [`@angular/common/http`](api/common/http)) in each of your modules.

  在每个模块中用 [`HttpClientModule`](api/common/http/HttpClientModule) （来自 [`@angular/common/http`](api/common/http) ）代替 `HttpModule`。

* Replace the `Http` service with the [`HttpClient`](api/common/http/HttpClient) service.

  用 [`HttpClient`](api/common/http/HttpClient) 服务代替 `Http` 服务。

* Remove any `map(res => res.json())` calls. They are no longer needed. 

  删除所有 `map(res => res.json())` 调用，它们没用了。


For more information about using `@angular/common/http`, see the [HttpClient guide](guide/http "HTTP Client guide"). 

有关使用 `@angular/common/http` 的更多信息，请参见 [HttpClient 指南](guide/http "HTTP Client指南") 。


| `@angular/http`       | Closest replacement in `@angular/common/http`                     |
| --------------------- | ----------------------------------------------------------------- |
| `@angular/http`       | `@angular/common/http` 中最接近的替代品                                  |
| `BaseRequestOptions`  | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `BaseRequestOptions`  | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `BaseResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `BaseResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `BrowserXhr`          |                                                                   |
| `BrowserXhr`          |                                                                   |
| `Connection`          | [`HttpBackend`](/api/common/http/HttpBackend)                     |
| `Connection`          | [`HttpBackend`](/api/common/http/HttpBackend)                     |
| `ConnectionBackend`   | [`HttpBackend`](/api/common/http/HttpBackend)                     |
| `ConnectionBackend`   | [`HttpBackend`](/api/common/http/HttpBackend)                     |
| `CookieXSRFStrategy`  | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule)   |
| `CookieXSRFStrategy`  | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule)   |
| `Headers`             | [`HttpHeaders`](/api/common/http/HttpHeaders)                     |
| `Headers`             | [`HttpHeaders`](/api/common/http/HttpHeaders)                     |
| `Http`                | [`HttpClient`](/api/common/http/HttpClient)                       |
| `Http`                | [`HttpClient`](/api/common/http/HttpClient)                       |
| `HttpModule`          | [`HttpClientModule`](/api/common/http/HttpClientModule)           |
| `HttpModule`          | [`HttpClientModule`](/api/common/http/HttpClientModule)           |
| `Jsonp`               | [`HttpClient`](/api/common/http/HttpClient)                       |
| `Jsonp`               | [`HttpClient`](/api/common/http/HttpClient)                       |
| `JSONPBackend`        | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend)       |
| `JSONPBackend`        | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend)       |
| `JSONPConnection`     | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend)       |
| `JSONPConnection`     | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend)       |
| `JsonpModule`         | [`HttpClientJsonpModule`](/api/common/http/HttpClientJsonpModule) |
| `JsonpModule`         | [`HttpClientJsonpModule`](/api/common/http/HttpClientJsonpModule) |
| `QueryEncoder`        | [`HttpUrlEncodingCodec`](/api/common/http/HttpUrlEncodingCodec)   |
| `QueryEncoder`        | [`HttpUrlEncodingCodec`](/api/common/http/HttpUrlEncodingCodec)   |
| `ReadyState`          | [`HttpBackend`](/api/common/http/HttpBackend)                     |
| `ReadyState`          | [`HttpBackend`](/api/common/http/HttpBackend)                     |
| `Request`             | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `Request`             | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `RequestMethod`       | [`HttpClient`](/api/common/http/HttpClient)                       |
| `RequestMethod`       | [`HttpClient`](/api/common/http/HttpClient)                       |
| `RequestOptions`      | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `RequestOptions`      | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `RequestOptionsArgs`  | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `RequestOptionsArgs`  | [`HttpRequest`](/api/common/http/HttpRequest)                     |
| `Response`            | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `Response`            | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `ResponseContentType` | [`HttpClient`](/api/common/http/HttpClient)                       |
| `ResponseContentType` | [`HttpClient`](/api/common/http/HttpClient)                       |
| `ResponseOptions`     | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `ResponseOptions`     | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `ResponseOptionsArgs` | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `ResponseOptionsArgs` | [`HttpResponse`](/api/common/http/HttpResponse)                   |
| `ResponseType`        | [`HttpClient`](/api/common/http/HttpClient)                       |
| `ResponseType`        | [`HttpClient`](/api/common/http/HttpClient)                       |
| `URLSearchParams`     | [`HttpParams`](/api/common/http/HttpParams)                       |
| `URLSearchParams`     | [`HttpParams`](/api/common/http/HttpParams)                       |
| `XHRBackend`          | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend)               |
| `XHRBackend`          | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend)               |
| `XHRConnection`       | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend)               |
| `XHRConnection`       | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend)               |
| `XSRFStrategy`        | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule)   |
| `XSRFStrategy`        | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule)   |

| `@angular/http/testing` | Closest replacement in `@angular/common/http/testing`                     |
| ----------------------- | ------------------------------------------------------------------------- |
| `@angular/http/testing` | `@angular/common/http/testing` 中最接近的替代品                              |
| `MockBackend`           | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
| `MockBackend`           | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
| `MockConnection`        | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
| `MockConnection`        | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
