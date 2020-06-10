# Deprecated APIs and features

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

v6 或更早版本中已弃用的特性和 API 将会在版本 9 或更高级版本中删除。要了解 Angular 中关于弃用和删除的实践，参见[Angular 发布实践](guide/releases#deprecation-practices "Angular 发布实践：弃用实践")。

For step-by-step instructions on how to update to the latest Angular release, use the interactive update guide at [update.angular.io](https://update.angular.io).

有关如何更新到最新 Angular 版本的分步说明，参见 [update.angular.io](https://update.angular.io) 上的交互式更新指南。

</div>

## Index

## 索引

To help you future-proof your apps, the following table lists all deprecated APIs and features, organized by the release in which they are candidates for removal. Each item is linked to the section later in this guide that describes the deprecation reason and replacement options.

为了帮助你确保应用程序的前瞻性，下表列出了所有已弃用的 API 和功能，这些 API 和功能按发行版进行组织，它们将被删除。每个条目都链接到本指南后面的部分，该部分描述了弃用原因和替换选项。

<!--
deprecation -> removal cheat sheet
v4 - v7
v5 - v8
v6 - v9
v7 - v10
v8 - v11
v9 - v12
-->

| Area | API or Feature | May be removed in |
| ---- | -------------- | ----------------- |
| 区域 | API 或特性 | 可能会在什么时候移除 |
| `@angular/common` | [`ReflectiveInjector`](#reflectiveinjector) | <!--v8--> v11 |
| `@angular/common`             | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | <!--v9--> v11 |
| `@angular/core` | [`CollectionChangeRecord`](#core) | <!--v7--> v11 |
| `@angular/core` | [`DefaultIterableDiffer`](#core) | <!--v7--> v11 |
| `@angular/core` | [`ReflectiveKey`](#core) | <!--v8--> v11 |
| `@angular/core` | [`RenderComponentType`](#core) | <!--v7--> v11 |
| `@angular/core` | [`ViewEncapsulation.Native`](#core) | <!--v6--> v11 |
| `@angular/core`               | [`WrappedValue`](#core)                                                       | <!--v10--> v12 |
| `@angular/forms` | [`ngModel` with reactive forms](#ngmodel-reactive) | <!--v6--> v11 |
| `@angular/forms` | [响应式表单中的 `ngModel`](#ngmodel-reactive) | <!--v6-->v11 |
| `@angular/router` | [`preserveQueryParams`](#router) | <!--v7--> v11 |
| `@angular/upgrade` | [`@angular/upgrade`](#upgrade) | <!--v8--> v11 |
| `@angular/upgrade` | [`getAngularLib`](#upgrade-static) | <!--v8--> v11 |
| `@angular/upgrade` | [`setAngularLib`](#upgrade-static) | <!--v8--> v11 |
| `@angular/platform-webworker` | [All entry points](api/platform-webworker) | <!--v8--> v11  |
| `@angular/platform-webworker` | [所有入口点](api/platform-webworker) | <!--v8-->v11 |
| template syntax | [`<template`>](#template-tag) | <!--v7--> v11 |
| 模板语法 | [`<template` >](#template-tag) | <!--v7-->v11 |
| polyfills | [reflect-metadata](#reflect-metadata) | <!--v8--> v11 |
| 腻子脚本 | [reflect-metadata](#reflect-metadata) | <!--v8-->v11 |
| npm package format | [`esm5` and `fesm5` entry-points in @angular/* npm packages](guide/deprecations#esm5-fesm5) | <!-- v9 --> v11 |
| npm 软件包格式 | [@angular/* npm 软件包中的 `esm5` 和 `fesm5` 入口点](guide/deprecations#esm5-fesm5) | <!-- v9 --> v11 |
| `@angular/core` | [`defineInjectable`](#core) | <!--v8--> v11 |
| `@angular/core` | [`entryComponents`](api/core/NgModule#entryComponents) | <!--v9--> v11 |
| `@angular/core` | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | <!--v9--> v11 |
| `@angular/router` | [`loadChildren` string syntax](#loadChildren) | <!--v9--> v11 |
| `@angular/router` | [`loadChildren` 字符串语法](#loadChildren) | <!--v9--> v11 |
| `@angular/core/testing` | [`TestBed.get`](#testing) | <!--v9--> v12 |
| `@angular/router` | [`ActivatedRoute` params and `queryParams` properties](#activatedroute-props) | unspecified |
| `@angular/router` | [`ActivatedRoute` 参数和 `queryParams` 属性](#activatedroute-props) | 未定 |
| template syntax | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector) | <!--v7--> unspecified |
| 模板语法 | [`/deep/`，`>>>` 和 `::ng-deep`](#deep-component-style-selector) | <!--v7-->未定 |
| browser support               | [`IE 9 and 10`](#ie-9-10)                                                     | <!--v10--> v11 |
| 浏览器支持               | [`IE 9 和 10`](#ie-9-10)                                                     | <!--v10--> v11 |

## Deprecated APIs

## 已弃用的 API

This section contains a complete list all of the currently-deprecated APIs, with details to help you plan your migration to a replacement.

本节包含所有当前已弃用的 API 的完整列表，其中包含一些可帮助你规划如何迁移到其替代品的详细信息。

<div class="alert is-helpful">

Tip: In the [API reference section](api) of this doc site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [**Status: deprecated**](api?status=deprecated).

提示：在本文档站的 [API 参考手册部分](api)，不推荐使用的 API 会用~~删除线~~标记出来。你可以按[**状态**: 已弃用](api?status=deprecated)来过滤 API 列表。

</div>

{@a common}
### @angular/common

| API                                                                                           | Replacement                                         | Deprecation announced | Notes |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | From v11 the default code will be extracted from the locale data given by `LOCAL_ID`, rather than `USD`. |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    |  从 v11 开始，默认代码将从由 `LOCAL_ID` 提供的语言环境数据中提取，而不再是固定值 `USD`。|

{@a core}
### @angular/core

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord) | [`IterableChangeRecord`](api/core/IterableChangeRecord) | v4 | none |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord) | [`IterableChangeRecord`](api/core/IterableChangeRecord) | v4 | 无 |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | n/a | v4 | Not part of public API. |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | 不适用 | v4 | 不属于公共 API。|
| [`ReflectiveInjector`](api/core/ReflectiveInjector) | [`Injector.create`](api/core/Injector#create) | v5 | See [`ReflectiveInjector`](#reflectiveinjector) |
| [`ReflectiveInjector`](api/core/ReflectiveInjector) | [`Injector.create`](api/core/Injector#create) | v5 | 参见 [`ReflectiveInjector`](#reflectiveinjector) |
| [`ReflectiveKey`](api/core/ReflectiveKey) | none | v5 | none |
| [`ReflectiveKey`](api/core/ReflectiveKey) | 无 | v5 | 无 |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom) | v6 | Use the native encapsulation mechanism of the renderer. See [view.ts](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32). |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom) | v6 | 使用渲染器的原生封装机制。参见 [view.ts。](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32) |
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | Used only in generated code. No source code should depend on this API. |
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | 仅在生成的代码中使用。任何源代码都不应依赖此 API。|
| [`entryComponents`](api/core/NgModule#entryComponents) | none | v9 | See [`entryComponents`](#entryComponents) |
| [`entryComponents`](api/core/NgModule#entryComponents) | 无 | v9 | 参见 [`entryComponents`](#entryComponents) |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | none | v9 | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents) |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | 无 | v9 | 参见 [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents) |
| [`WrappedValue`](api/core/WrappedValue) | none | v10 | See [removing `WrappedValue`](#wrapped-value) |
| [`WrappedValue`](api/core/WrappedValue) | 无 | v10 | 参见[移除 `WrappedValue`](#wrapped-value) |

{@a testing}
### @angular/core/testing

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9 | Same behavior, but type safe. |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9 | 行为相同，但类型安全。|

{@a forms}
### @angular/forms

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [`ngModel` with reactive forms](#ngmodel-reactive) | [`FormControlDirective`](api/forms/FormControlDirective) | v6 | none |
| [响应式表单中的 `ngModel`](#ngmodel-reactive) | 参见 [FormControlDirective 使用说明](api/forms/FormControlDirective) | v6 | 无 |

{@a router}
### @angular/router

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4 | none |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4 | 无 |

{@a platform-webworker}
### @angular/platform-webworker

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
| [所有入口点](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | 参见[从 AngularJS 升级](guide/upgrade)。|

{@a upgrade}
### @angular/upgrade

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
| [所有入口点](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | 参见 [从 AngularJS 升级](guide/upgrade)。|

{@a upgrade-static}
### @angular/upgrade/static

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| API | 替代品 | 宣布弃用 | 备注 |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | 参见[从 AngularJS 升级](guide/upgrade)。|
| [`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
| [`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | 参见[从 AngularJS 升级](guide/upgrade)。|

{@a deprecated-features}

## Deprecated features

## 已弃用的特性

This section lists all of the currently-deprecated features, which includes template syntax, configuration options, and any other deprecations not listed in the [Deprecated APIs](#deprecated-apis) section above. It also includes deprecated API usage scenarios or API combinations, to augment the information above.

本节列出了所有当前已弃用的特性，包括模板语法、配置选项，以及前面[已弃用的 API ](#deprecated-apis)部分未列出的其它弃用。它还包括已弃用的 API 用例或 API 组合，以增强上述信息。

{@a wtf}
### Web Tracing Framework integration

### Web 跟踪框架集成

Angular previously has supported an integration with the [Web Tracing Framework (WTF)](https://google.github.io/tracing-framework/) for performance testing of Angular applications. This integration has not been maintained and defunct. As a result, the integration was deprecated in Angular version 8 and due to no evidence of any existing usage removed in version 9.

Angular 以前支持与 [Web 跟踪框架（WTF）](https://google.github.io/tracing-framework/)集成，用于 Angular 应用程序的性能测试。此集成已经停止维护并失效。因此，该集成在 Angular 版本 8 中被弃用，并且由于没有证据表明在版本 9 中删除了任何现有用法。

{@a deep-component-style-selector}
### `/deep/`, `>>>` and `:ng-deep` component style selectors

### `/deep/`，`>>>` 和 `:ng-deep` 组件样式选择器

The shadow-dom-piercing descendant combinator is deprecated and support is being [removed from major browsers and tools](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing). As such, in v4 we deprecated support in Angular for all 3 of `/deep/`, `>>>` and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

刺穿 Shadow DOM 的 CSS 组合符已经弃用，并且[主要的浏览器和工具都已删除它](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing)。因此，在 v4 中，Angular 也弃用了对 `/deep/`，`>>>` 和 `::ng-deep` 的支持。在彻底删除它之前，我们首选 `::ng-deep`，以便和各种工具实现更广泛的兼容。

For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep")
 in the Component Styles guide.

欲知详情，参阅“组件样式”一章中的 [/deep/，>>> 和 :: ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "“组件样式”指南，代号为 deep 和 ngdeep")。

{@a template-tag}
### &lt;template&gt; tag

The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/angular-compiler-options#enablelegacytemplate) guide.

`<template>` 标签在 v4 中已经弃用，以消除和 DOM 中同名元素的冲突（比如在使用 Web Components 时）。请用 `<ng-template>` 代替。欲知详情，参见[预先编译](guide/angular-compiler-options#enablelegacytemplate)一章。

{@a ngmodel-reactive}
### ngModel with reactive forms

### 和响应式表单一起使用 ngModel

Support for using the `ngModel` input property and `ngModelChange` event with reactive
form directives has been deprecated in Angular v6 and will be removed in a future version
of Angular.

对于和响应式表单指令一起使用输入属性 `ngModel` 和事件 `ngModelChange` 的支持已经在 Angular 6 中弃用，并且会在未来的 Angular 版本中移除。

Now deprecated:

现在已经废弃：

```html
<input [formControl]="control" [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

This has been deprecated for several reasons. First, developers have found this pattern
confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
an input/output property named `ngModel` on the reactive form directive that
approximates some, but not all, of the directive's behavior.
It allows getting and setting a value and intercepting value events, but
some of `ngModel`'s other features, such as
delaying updates with `ngModelOptions` or exporting the directive, don't work.

这种弃用有一系列理由。
首先，开发人员会对这种模式感到困惑。它看起来像是在使用 `ngModel` 指令，但实际上它是响应式表单指令上一个名叫 `ngModel` 的输入输出属性。它和 ngModel 指令的行为很相似，但又不完全一样。
它运行读取或设置一个值，并且拦截该值的事件，但是 `ngModel` 的其它特性，比如通过 `ngModelOptions` 指定更新显示的时机，或者导出该指令，却没法用。

In addition, this pattern mixes template-driven and reactive forms strategies, which
prevents taking advantage of the full benefits of either strategy.
Setting the value in the template violates the template-agnostic
principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
the class removes the convenience of defining forms in the template.

另外，该模式混用了模板驱动和响应式这两种表单策略，这会妨碍我们获取任何一种策略的全部优点。
在模板中设置值的方式，违反了响应式表单所遵循的“模板无关”原则；反之，在类中添加 `FormControl`/`FormGroup` 层也破坏了“在模板中定义表单”的约定。

To update your code before support is removed, you'll want to decide whether to stick
with reactive form directives (and get/set values using reactive forms patterns) or
switch over to template-driven directives.

要想在它被移除之间修改代码，你需要决定是选定响应式表单指令（以及使用响应式表单模式来存取这些值），还是切换到模板驱动指令。

After (choice 1 - use reactive forms):

改后（选择 1 - 使用响应式表单）：

```html
<input [formControl]="control">
```

```ts
this.control.setValue('some value');
```

After (choice 2 - use template-driven forms):

改后（选择 2 - 使用模板驱动表单）：

```html
<input [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

By default, when you use this pattern, you will see a deprecation warning once in dev
mode. You can choose to silence this warning by providing a config for
`ReactiveFormsModule` at import time:

默认情况下，当使用这种模式时，你会在开发模式下看到一个弃用警告。你可以通过在导入 `ReactiveFormsModule` 时提供一个配置来来禁用此警告：

```ts
imports: [
  ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
]
```

Alternatively, you can choose to surface a separate warning for each instance of this
pattern with a config value of `"always"`. This may help to track down where in the code
the pattern is being used as the code is being updated.

另外，你可以选择针对使用此模式的每个实例来使用配置值 `"always"` 来为它们单独显示警告。当修改代码时，这可以帮助你跟踪都有哪里使用了该模式。

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

{@a loadChildren}
### loadChildren string syntax

### loadChildren 字符串语法

When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript. Angular created our own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it. Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

当 Angular 第一次引入惰性路由时，还没有浏览器能支持动态加载额外的 JavaScript。因此 Angular 创建了自己的方案，所用的语法是 `loadChildren: './lazy/lazy.module#LazyModule'` 并且还构建了一些工具来支持它。现在，很多浏览器都已支持 ECMAScript 的动态导入，Angular 也正朝着这个新语法前进。

In version 8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

在第 8 版中，不推荐使用 [`loadChildren`](api/router/LoadChildren) 路由规范的字符串语法，[`loadChildren`](api/router/LoadChildren) 支持使用基于 `import()` 的新语法。

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

**Version 8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically. Prior to version 7, the `import()` syntax only works in JIT mode (with view engine).

**版本 8 更新**：当你升级到版本 8 时，[`ng update`](cli/update) 命令会自动执行转换。在版本 7 之前，`import()` 语法只能在 JIT 模式下运行（和视图引擎一起）。

</div>

<div class="alert is-helpful">

**Declaration syntax**: It's important to follow the route declaration syntax `loadChildren: () => import('...').then(m => m.ModuleName)` to allow `ngc` to discover the lazy-loaded module and the associated `NgModule`. You can find the complete list of allowed syntax constructs [here](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113). These restrictions will be relaxed with the release of Ivy since it'll no longer use `NgFactories`.

**声明语法**：遵循路由声明语法 `loadChildren: () => import('...').then(m => m.ModuleName)` 是很重要的，这样 `ngc` 才能发现这个惰性加载模块及其相关的 `NgModule`。你可以在[这里](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113)找到受支持的语法的完整列表。在 Ivy 发布后会放松这种限制，因为 Ivy 不再用 `NgFactories` 了。

</div>

{@a activatedroute-props}

### ActivatedRoute params and queryParams properties

### ActivatedRoute 的 params 和 queryParams 属性

[ActivatedRoute](api/router/ActivatedRoute) contains two [properties](api/router/ActivatedRoute#properties) that are less capable than their replacements and may be deprecated in a future Angular version.

[ActivatedRoute](api/router/ActivatedRoute) 包含两个[属性](api/router/ActivatedRoute#properties)，它们的能力低于它们的替代品，在将来的 Angular 版本中可能会弃用。

| Property      | Replacement     |
| ------------- | --------------- |
| 属性          | 替代品            |
| `params`      | `paramMap`      |
| `queryParams` | `queryParamMap` |

For more information see the [Getting route information](guide/router#activated-route) section of the [Router guide](guide/router).

欲知详情，参见[路由器指南](guide/router#activated-route)。

{@a reflect-metadata}
### Dependency on a reflect-metadata polyfill in JIT mode

### 在 JIT 模式下对 reflect-metadata 腻子脚本的依赖

Angular applications, and specifically applications that relied on the JIT compiler, used to require a polyfill for the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) APIs.

Angular 应用程序，特别是依赖于 JIT 编译器的应用程序，过去常常需要 [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API 的腻子脚本。

The need for this polyfill was removed in Angular version 8.0 ([see #14473](https://github.com/angular/angular-cli/pull/14473)), rendering the presence of the poylfill in most Angular applications unnecessary. Because the polyfill can be depended on by 3rd-party libraries, instead of removing it from all Angular projects, we are deprecating the requirement for this polyfill as of version 8.0. This should give library authors and application developers sufficient time to evaluate if they need the polyfill, and perform any refactoring necessary to remove the dependency on it.

在 Angular 8.0 版中不再需要这种 polyfill（[参见#14473](https://github.com/angular/angular-cli/pull/14473) ），从而使大多数 Angular 应用程序中都不需要使用这个腻子脚本。因为这个腻子脚本可能由第三方库依赖，所以没有从所有 Angular 项目中删除它，所以我们不建议从 8.0 版本开始再使用这个腻子脚本。这应该能给库作者和应用程序开发人员足够的时间来评估他们是否需要这个腻子脚本，并执行必要的重构以消除对它的依赖。

In a typical Angular project, the polyfill is not used in production builds, so removing it should not impact production applications. The goal behind this removal is overall simplification of the build setup and decrease in the number of external dependencies.

在典型的 Angular 项目中，这个腻子脚本不用于生产版本，因此删除它不会影响生产环境的应用程序。删除它是为了从整体上上简化构建设置并减少外部依赖项的数量。

{@a static-query-resolution}
### `@ViewChild()` / `@ContentChild()` static resolution as the default

### 把 `@ViewChild()` / `@ContentChild()` 静态解析为默认值

See the [dedicated migration guide for static queries](guide/static-query-migration).

参见[[静态查询的专用迁移指南](guide/static-query-migration)。

{@a contentchild-input-together}
### `@ContentChild()` / `@Input()` used together

### `@ContentChild()` / `@Input()` 一起使用

The following pattern is deprecated:

以下模式已弃用：

```ts
@Input() @ContentChild(TemplateRef) tpl !: TemplateRef<any>;
```

Rather than using this pattern, separate the two decorators into their own
properties and add fallback logic as in the following example:

与其使用这种模式，还不如将两个装饰器添加到各自的属性上并添加回退逻辑，如以下示例所示：

```ts
@Input() tpl !: TemplateRef<any>;
@ContentChild(TemplateRef) inlineTemplate !: TemplateRef<any>;
```
{@a cant-assign-template-vars}
### Cannot assign to template variables

### 无法赋值给模板变量

In the following example, the two-way binding means that `optionName`
should be written when the `valueChange` event fires.

在下面的示例中，双向绑定意味着在 `valueChange` 事件触发时应该写入 `optionName`。

```html
<option *ngFor="let optionName of options" [(value)]="optionName"></option>
```

However, in practice, Angular simply ignores two-way bindings to template variables. Starting in version 8, attempting to write to template variables is deprecated. In a future version, we will throw to indicate that the write is not supported.

但实际上，Angular 只是忽略了对模板变量的双向绑定。从版本 8 开始，试图写入模板变量已弃用。在将来的版本中，我们将不支持这种写操作。

```html
<option *ngFor="let optionName of options" [value]="optionName"></option>
```

{@a binding-to-innertext}
### Binding to `innerText` in `platform-server`

### 在 `platform-server` 中绑定到 `innerText`

[Domino](https://github.com/fgnass/domino), which is used in server-side rendering, doesn't support `innerText`, so in platform-server's "domino adapter", there was special code to fall back to `textContent` if you tried to bind to `innerText`.

在服务器端渲染中使用的 [Domino](https://github.com/fgnass/domino) 不支持 `innerText`，因此在平台服务器中的 “domino 适配器”中，如果尝试绑定到 `innerText`，则有一些特殊代码可以退回到 `textContent`。

These two properties have subtle differences, so switching to `textContent` under the hood can be surprising to users. For this reason, we are deprecating this behavior. Going forward, users should explicitly bind to `textContent` when using Domino.

这两个属性有细微的差异，切换到 `textContent` 可能会让用户感到惊讶。因此，我们弃用了此行为。展望未来，用户应该在使用 Domino 时显式绑定到 `textContent`。

{@a wtf-apis}
### `wtfStartTimeRange` and all `wtf*` APIs

### `wtfStartTimeRange` 和所有 `wtf*` API

All of the `wtf*` APIs are deprecated and will be removed in a future version.

所有 `wtf*` API 均已弃用，并将在以后的版本中删除。

{@a webworker-apps}
### Running Angular applications in platform-webworker

### 在 Platform-Webworker 中运行 Angular 应用程序

The `@angular/platform-*` packages enable Angular to be run in different contexts. For examples,
`@angular/platform-server` enables Angular to be run on the server, and `@angular/platform-browser`
enables Angular to be run in a web browser.

`@angular/platform-*` 软件包使 Angular 可以在不同的上下文中运行。例如，`@angular/platform-server` 使 Angular 可以在服务器上运行，而 `@angular/platform-browser` 使 Angular 可以在 Web 浏览器中运行。

`@angular/platform-webworker` was introduced in Angular version 2 as an experiment in leveraging
Angular's rendering architecture to run an entire web application in a
[web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). We've learned a lot
from this experiment and have come to the conclusion that running the entire application in a web
worker is not the best strategy for most applications.

`@angular/platform-webworker` 是在 Angular 版本 2 中引入的，`@angular/platform-webworker` 是利用 Angular 的渲染体系结构在 [Web Worker 中](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)运行整个 Web 应用程序的实验。我们从这个实验中学到了很多，得出的结论是，对于大多数应用程序来说，在 Web Worker 中运行整个应用程序不是最佳策略。

Going forward, we will focus our efforts related to web workers around their primary use case of
offloading CPU-intensive, non-critical work needed for initial rendering (such as in-memory search
and image processing). Learn more in the
[guide to Using Web Workers with the Angular CLI](guide/web-worker).

展望未来，我们将专注于与 Web Worker 相关的工作，围绕它们的主要用例来分担初始渲染所需的 CPU 密集型非关键工作（例如内存中搜索和图像处理）。[在 Angular CLI 中使用 Web Worker 指南中](guide/web-worker)了解更多信息。

As of Angular version 8, all  `platform-webworker` APIs are deprecated.
This includes both packages: `@angular/platform-webworker` and
`@angular/platform-webworker-dynamic`.

从 Angular 8 版开始，所有 `platform-webworker` API 均已弃用。这包括两个软件包：`@angular/platform-webworker` 和 `@angular/platform-webworker-dynamic`。

{@a entryComponents}
### `entryComponents` and `ANALYZE_FOR_ENTRY_COMPONENTS` no longer required

### 不再需要 `entryComponents` 和 `ANALYZE_FOR_ENTRY_COMPONENTS`

Previously, the `entryComponents` array in the `NgModule` definition was used to tell the compiler which components would be created and inserted dynamically. With Ivy, this isn't a requirement anymore and the `entryComponents` array can be removed from existing module declarations. The same applies to the `ANALYZE_FOR_ENTRY_COMPONENTS` injection token.

以前，`NgModule` 定义中的 `entryComponents` 数组用于告诉编译器将动态创建和插入哪些组件。改用 Ivy 后，将不再需要它们，并且可以从现有模块声明中删除 `entryComponents` 数组。`ANALYZE_FOR_ENTRY_COMPONENTS` 注入令牌也是如此。

{@a moduleWithProviders}
### `ModuleWithProviders` type without a generic

### 不带泛型的 `ModuleWithProviders` 类型

Some Angular libraries, such as `@angular/router` and `@ngrx/store`, implement APIs that return a type called `ModuleWithProviders` (typically via a method named `forRoot()`).
This type represents an `NgModule` along with additional providers.
Angular version 9 deprecates use of `ModuleWithProviders` without an explicitly generic type, where the generic type refers to the type of the `NgModule`.
In a future version of Angular, the generic will no longer be optional.

一些 Angular 库，例如 `@angular/router` 和 `@ngrx/store`，实现了一种返回 `ModuleWithProviders` 类型的 API（通常借助名为 `forRoot()` 的方法）。此类型表示 `NgModule` 以及其它服务提供者。Angular 版本 9 不建议使用不带显式泛型类型的 `ModuleWithProviders`，泛型类型是指 `NgModule` 的类型。在 Angular 的未来版本中，泛型将不再是可选的。

If you're using the CLI, `ng update` should [migrate your code automatically](guide/migration-module-with-providers).
If you're not using the CLI, you can add any missing generic types to your application manually.
For example:

如果你使用的是 CLI，则 `ng update` 应该[会自动迁移代码](guide/migration-module-with-providers)。如果没有使用 CLI，则可以将任何缺失的泛型类型手动添加到应用程序中。例如：

**Before**

**之前**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config}
      ]
    };
  }
}
```

**After**

**后**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config }
      ]
    };
  }
}
```

{@a ie-9-10}
### IE 9 and 10 support

### IE 9 和 10 支持 IE 9

Support for IE 9 and 10 has been deprecated and will be removed in a future version.
Supporting outdated browsers like these increases bundle size, code complexity, and test load, and also requires time and effort that could be spent on improvements to the framework.
For example, fixing issues can be more difficult, as a straightforward fix for modern browsers could break old ones that have quirks due to not receiving updates from vendors.

对 IE 9 和 10 的支持已被弃用，并将在以后的版本中删除。支持像这样过时的浏览器会增加 bundle 的大小，增加代码的复杂性和测试的负载，还需要花费大量的时间和精力来改进框架。例如，修复问题可能会更加困难，因为对于现代浏览器来说，直接修复可能会因为没有收到供应商的更新而破坏那些有怪癖的旧版本。

The final decision was made on three key points:

最终决定于三个关键点：

- **Vendor support**: Microsoft dropped support of IE 9 and 10 on 1/12/16, meaning they no longer provide security updates or technical support.

  **供应商支持** ：微软于 2016 年 1 月 12 日放弃对 IE 9 和 10 的支持，这意味着他们不再提供安全更新或技术支持。

- **Usage statistics**: We looked at usage trends for IE 9 and 10 from various sources and all indicated that usage percentages were extremely small (fractions of 1%).

  **用法统计** ：我们从不同来源查看了 IE 9 和 10 的使用趋势，并且都表明使用率非常小（1％的分数）。

- **Feedback from partners**: We also reached out to some of our Angular customers and none expressed concern about dropping IE 9 and 10 support.

  **来自合作伙伴的反馈意见** ：我们还联系了一些 Angular 的客户，没有人担心放弃 IE 9 和 10 的支持。

{@a wrapped-value}

### `WrappedValue`

### `WrappedValue`

The purpose of `WrappedValue` is to allow the same object instance to be treated as different for the purposes of change detection.
It is commonly used with the `async` pipe in the case where the `Observable` produces the same instance of the value.

`WrappedValue` 的目的是让同一个对象实例被视为不同的对象，以便进行变更检测。在 `Observable` 生成相同值的实例的情况下，它常用于 `async` 管道。

Given that this use case is relatively rare and special handling impacts application performance, we have deprecated it in v10.
No replacement is planned for this deprecation.

鉴于此用例相对较少，并且特殊处理会影响应用性能，因此我们已在第 10 版中弃用它。这次弃用并未计划更换。

If you rely on the behavior that the same object instance should cause change detection, you have two options:

如果依赖同一个对象实例引起变更检测的行为，你有两个选择：

- Clone the resulting value so that it has a new identity.

  克隆结果值，使其具有新的标识。

- Explicitly call [`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges) to force the update. 

  显式调用[`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges)来强制进行更新。

{@a removed}

## Removed APIs

## 删除了 API

The following APIs have been removed starting with version 10.0.0\*:

从 Version 10.0.0 \*开始，已经删除了以下 API：

| Package | API | Replacement | Notes |
| ------- | --- | ----------- | ----- |
| 包裹 | API | 更换 | 笔记 |
| `@angular/core` | Undecorated base classes that use Angular features | Add Angular decorator | See [migration guide](guide/migration-undecorated-classes) for more info |
| `@angular/core` | 使用 Angular 特性的未修改的基类 | 添加 Angular 装饰器 | 有关详情，请参阅[迁移指南](guide/migration-undecorated-classes) |
| `@angular/core` | `ModuleWithProviders` without a generic | `ModuleWithProviders` with a generic | See [migration guide](guide/migration-module-with-providers) for more info |
| `@angular/core` | `ModuleWithProviders` 没有泛型 | `ModuleWithProviders` 用泛型的 | 有关详情，请参阅[迁移指南](guide/migration-module-with-providers) |
| `@angular/core` | Style Sanitization | no action needed | See [style sanitization API removal](#style-sanitization) for more info |
| `@angular/core` | 风格消毒 | 不需要任何动作 | 有关更多信息，请参阅[样式清理 API 删除](#style-sanitization) |

\*To see APIs removed in version 9, check out this guide on the [version 9 docs site](https://v9.angular.io/guide/deprecations#removed).

\*要查看版本 9 中移除的 API，请查看[版本 9 docs 站点](https://v9.angular.io/guide/deprecations#removed)上的本指南。

{@a esm5-fesm5}

### `esm5` and `fesm5` code formats in @angular/* npm packages

### @angular/* npm 软件包中的 `esm5` 和 `fesm5` 代码格式

As of Angular v8, the CLI primarily consumes the `fesm2015` variant of the code distributed via `@angular/*` npm packages.
This renders the `esm5` and `fesm5` distributions obsolete and unnecessary, adding bloat to the package size and slowing down npm installations.

从 Angular v8 开始，CLI 就主要使用 通过 `@angular/*` 系列 npm 包分发的 `fesm2015` 变体代码。这就让 `esm5` 和 `fesm5` 的发行版变得过时和不必要，只会增加软件包大小并拖累了 npm 的安装速度。

This removal has no impact on CLI users, unless they modified their build configuration to explicitly consume these code distributions.

移除它们不会对 CLI 用户产生任何影响，除非他们修改了自己的构建配置以显式使用这些代码发行版。

Any application still relying on the `esm5` and `fesm5` as the input to its build system will need to ensure that the build pipeline is capable of accepting JavaScript code conforming to ECMAScript 2015 (ES2015) language specification.

任何仍依赖 `esm5` 和 `fesm5` 作为其构建系统输入的应用程序都需要确保构建管道能够接受符合 ECMAScript 2015（ES2015） 语言规范的 JavaScript 代码。

Note that this change doesn't make existing libraries distributed in this format incompatible with the Angular CLI.
The CLI will fall back and consume libraries in less desirable formats if others are not available.
However, we do recommend that libraries ship their code in ES2015 format in order to make builds faster and build output smaller.

请注意，此更改不会使以这种格式分发的现有库与 Angular CLI 不兼容。如果其它发行版不可用，CLI 将回退并以不太理想的格式使用库。但是，我们确实建议库以 ES2015 格式发布其代码，以加快构建速度并减小构建输出。

In practical terms, the `package.json` of all `@angular` packages has changed in the following way:

实际上，所有 `@angular` 软件包的 `package.json` 都将以如下方式更改：

**Before**:

**之前**：

```
{
  "name": "@angular/core",
  "version": "9.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm5/core.js",
  "es2015": "./fesm2015/core.js",
  "esm5": "./esm5/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm5": "./fesm5/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

**After**:

**之后**：

```
{
  "name": "@angular/core",
  "version": "10.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm2015/core.js",
  "es2015": "./fesm2015/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

For more information about the npm package format, see the [Angular Package Format spec](https://goo.gl/jB3GVv).

关于 npm 软件包格式的更多信息，请参见 [Angular 软件包格式规范](https://goo.gl/jB3GVv)。
{@a ie-9-10}
### IE 9 and 10 support

### 对 IE 9 和 10 的支持

Support for IE 9 and 10 has been deprecated and will be removed in a future version.
Supporting outdated browsers like these increases bundle size, code complexity, and test load, and also requires time and effort that could be spent on improvements to the framework.
For example, fixing issues can be more difficult, as a straightforward fix for modern browsers could break old ones that have quirks due to not receiving updates from vendors.

对 IE 9 和 10 的支持已被弃用，并将在以后的版本中删除。支持像这样过时的浏览器会增加 bundle 的大小，增加代码的复杂性和测试的负载，还需要花费大量的时间和精力来改进框架。例如，修复问题可能会更加困难，因为对于现代浏览器来说，直接修复可能会因为没有收到供应商的更新而破坏那些有怪癖的旧版本。

The final decision was made on three key points:

最终决定于三个关键点：

- **Vendor support**: Microsoft dropped support of IE 9 and 10 on 1/12/16, meaning they no longer provide security updates or technical support.

  **供应商支持** ：微软于 2016 年 1 月 12 日放弃对 IE 9 和 10 的支持，这意味着他们不再提供安全更新或技术支持。

- **Usage statistics**: We looked at usage trends for IE 9 and 10 from various sources and all indicated that usage percentages were extremely small (fractions of 1%).

  **用法统计** ：我们从不同来源查看了 IE 9 和 10 的使用趋势，并且都表明使用率非常小（1％的分数）。

- **Feedback from partners**: We also reached out to some of our Angular customers and none expressed concern about dropping IE 9 and 10 support.

  **来自合作伙伴的反馈意见** ：我们还联系了一些 Angular 的客户，没有人担心放弃 IE 9 和 10 的支持。

{@a removed}
## Removed APIs

## 已删除的 API

The following APIs have been removed starting with version 10.0.0*:

从 9.0.0\*版开始，以下 API 已被删除：

| Package          | API            | Replacement | Notes |
| ---------------- | -------------- | ----------- | ----- |
| 包 | API | 替代品 | 备注 |  |
| `@angular/core`  | Undecorated base classes that use Angular features | Add Angular decorator | See [migration guide](guide/migration-undecorated-classes) for more info |
| `@angular/core`  | 用到 Angular 特性的不带装饰器的基类 | 添加 Angular 装饰器 | 欲知详情，参见[迁移指南](guide/migration-undecorated-classes) |
| `@angular/core`  | `ModuleWithProviders` without a generic             | `ModuleWithProviders` with a generic | See [migration guide](guide/migration-module-with-providers) for more info |
| `@angular/core`  | 不带泛型的 `ModuleWithProviders`             | 带泛型的 `ModuleWithProviders` | 欲知详情，参见 [迁移指南](guide/migration-module-with-providers) |

*To see APIs removed in version 9, check out this guide on the [version 9 docs site](https://v9.angular.io/guide/deprecations#removed).

要查看版本 8 中删除的 API，请查看[版本 8 文档站点](https://v8.angular.io/guide/deprecations#removed)上的本指南。

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

有关使用 `@angular/common/http` 的更多信息，请参见 [HttpClient 指南](guide/http "HTTP Client 指南")。

| `@angular/http` | Closest replacement in `@angular/common/http` |
| --------------- | --------------------------------------------- |
| `@angular/http` | `@angular/common/http` 中最接近的替代品 |
| `BaseRequestOptions` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `BaseResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `BrowserXhr` |  |
| `Connection` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `ConnectionBackend` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `CookieXSRFStrategy` | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule) |
| `Headers` | [`HttpHeaders`](/api/common/http/HttpHeaders) |
| `Http` | [`HttpClient`](/api/common/http/HttpClient) |
| `HttpModule` | [`HttpClientModule`](/api/common/http/HttpClientModule) |
| `Jsonp` | [`HttpClient`](/api/common/http/HttpClient) |
| `JSONPBackend` | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend) |
| `JSONPConnection` | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend) |
| `JsonpModule` | [`HttpClientJsonpModule`](/api/common/http/HttpClientJsonpModule) |
| `QueryEncoder` | [`HttpUrlEncodingCodec`](/api/common/http/HttpUrlEncodingCodec) |
| `ReadyState` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `Request` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `RequestMethod` | [`HttpClient`](/api/common/http/HttpClient) |
| `RequestOptions` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `RequestOptionsArgs` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `Response` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseContentType` | [`HttpClient`](/api/common/http/HttpClient) |
| `ResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseOptionsArgs` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseType` | [`HttpClient`](/api/common/http/HttpClient) |
| `URLSearchParams` | [`HttpParams`](/api/common/http/HttpParams) |
| `XHRBackend` | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend) |
| `XHRConnection` | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend) |
| `XSRFStrategy` | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule) |

| `@angular/http/testing` | Closest replacement in `@angular/common/http/testing` |
| ----------------------- | ----------------------------------------------------- |
| `@angular/http/testing` | `@angular/common/http/testing` 中最接近的替代品 |
| `MockBackend` | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
| `MockConnection` | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |

{@a style-sanitization}

### Style Sanitization for `[style]` and `[style.prop]` bindings

### `[style]` 和 `[style.prop]` 绑定的 Style `[style.prop]`

Angular used to sanitize `[style]` and `[style.prop]` bindings to prevent malicious code from being inserted through `javascript:` expressions in CSS `url()` entries. However, most modern browsers no longer support the usage of these expressions, so sanitization was only maintained for the sake of IE 6 and 7. Given that Angular does not support either IE 6 or 7 and sanitization has a performance cost, we will no longer sanitize style bindings as of version 10 of Angular.

Angular 用来清理 `[style]` 和 `[style.prop]` 绑定，以防止恶意代码通过 CSS `url()` 条目中的 `javascript:` expressions 进行插入。但是，大多数现代浏览器都不再支持这些表达式的使用，所以只有 IE 6 和 7 才能维护清理。鉴于 Angular 不支持 IE 6 或 7，并且清理有性能代价，我们将不再清理 Angular 版本 10 中的样式绑定。

