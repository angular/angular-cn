# Updating Angular

# 升级 Angular

This guide contains information related to updating to Angular version 12.

本指南包含有关升级到 Angular v12 的信息。

## Updating CLI applications

## 升级 CLI 应用

For step-by-step instructions on how to update to the latest Angular release and leverage our automated migration tools to do so, use the interactive update guide at [update.angular.io](https://update.angular.io).

有关如何升级到最新的 Angular 版本以及如何利用我们的自动迁移工具进行升级的分步说明，请使用 [update.angular.io](https://update.angular.io) 上的交互式升级指南。

## Building applications with Ivy

## 使用 Ivy 构建应用

For libraries, View Engine is deprecated and will be removed in version 13.
New libraries created with version 12 or later default to Ivy.
For more information about distributing libraries with View Engine and Ivy, see the [Building libraries with Ivy](guide/creating-libraries#ivy-libraries) section of [Creating libraries](guide/creating-libraries).

对于库，View Engine 已被弃用，并将在版本 13 中删除。使用版本 12 或更高版本创建的新库默认为 Ivy。有关使用 View Engine 和 Ivy 分发库的更多信息，参见 [创建库](guide/creating-libraries)中的[使用 Ivy 构建库](guide/creating-libraries#ivy-libraries)部分。

## Changes and deprecations in version 12

## 版本 12 中的更改和弃用

<div class="alert is-helpful">

   For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

有关 Angular 弃用和删除实践的信息，请参阅 [Angular 发布实践](guide/releases#deprecation-practices "Angular 发布惯例：弃用惯例")。

</div>

* Applications can no longer build with View Engine by setting `enableIvy: false`.
  Support for building libraries with View Engine, for backwards compatibility, is deprecated and will be removed in Angular version 13.
  New libraries created with Angular version 12 will default to building and distributing with Ivy.
  For more information, see [Creating Libraries](guide/creating-libraries).

  设置 `enableIvy: false` 可以让应用不再使用 View Engine 进行构建。为了向后兼容，我们不再支持使用 View Engine 构建库，并且在 Angular 13 版中将不再支持。使用 Angular 12 版创建的新库将默认为使用 Ivy 来构建和分发。有关更多信息，请参见[创建库](guide/creating-libraries)。

* The Ivy-based IDE [language service](guide/language-service) is now on by default.
  See [PR #1279](https://github.com/angular/vscode-ng-language-service/pull/1279).

  默认情况下，基于 Ivy 的 IDE [语言服务](guide/language-service)处于打开状态。参见 [PR＃1279](https://github.com/angular/vscode-ng-language-service/pull/1279) 。

* Angular's View Engine-based algorithm for generating i18n message IDs is deprecated.
  Angular version 12 adds a new flag to `localize-extract` called `--migrateMapFile` which  generates a JSON file that can be used to map legacy message IDs to canonical ones.
  There is also a new script called `localize-migrate` that can use the mapping file which `localize-extract` generates and migrate all of the IDs in the files that are passed in.
  For better stability, if you are using Angular's `i18n`, run this migration to move to the new message ID generation algorithm.
  If you don't run this migration, all your generated message IDs will change when Angular removes the View Engine compiler.
  See [PR #41026](https://github.com/angular/angular/pull/41026).

  Angular 的基于 View Engine 的 i18n 消息 ID 算法已经弃用。Angular 12 版添加了一个名为 `--migrateMapFile` 的 `localize-extract` 标志，该标志会生成一个 JSON 文件，该文件可用于将旧消息 ID 映射为规范化的消息 ID。还有一个名为 `localize-migrate` 的新脚本，可以使用此映射文件进行 `localize-extract`，来生成并迁移传入的文件中的所有 ID。为了获得更高的稳定性，如果你使用的是 Angular 的 `i18n` 命令，请执行该迁移，以便使用新的消息 ID 生成算法。如果不运行此迁移，则当 Angular 最终删除 View Engine 编译器时，所有生成的消息 ID 都会发生改变。参见 [PR＃41026](https://github.com/angular/angular/pull/41026) 。

* There is now a new build option named `inlineStyleLanguage` for defining the style sheet language in inline component styles.
  Currently supported language options are CSS (default), Sass, SCSS, and LESS.
  The default of CSS enables existing projects to continue to function as expected.
  See [PR #20514](https://github.com/angular/angular-cli/pull/20514).

  现在有了一个新的构建选项 `inlineStyleLanguage`，用来以内联组件样式的形式定义样式表。当前支持的语言选项是 CSS（默认）、Sass、SCSS 和 LESS。 CSS 的默认设置使现有项目能够继续按预期般运行。参见 [PR＃20514](https://github.com/angular/angular-cli/pull/20514) 。

* For new applications, strict mode is now the default in the CLI.
  See [PR #20029](https://github.com/angular/angular-cli/pull/20029).

  在新建应用时，严格模式现在是 CLI 中的默认模式。参见 [PR＃20029](https://github.com/angular/angular-cli/pull/20029) 。

* Add `emitEvent` option for `AbstractControl` class methods.
  See [PR #31031](https://github.com/angular/angular/pull/31031).

  为 `AbstractControl` 类方法添加了 `emitEvent` 选项。参见 [PR＃31031](https://github.com/angular/angular/pull/31031) 。

* Support `APP_INITIALIZER` to work with observables.
  See [PR #31031](https://github.com/angular/angular/pull/31031).

  支持将 `APP_INITIALIZER` 与可观察对象一起使用。参见 [PR＃31031](https://github.com/angular/angular/pull/31031) 。

* `HttpClient` supports specifying request metadata.
  See [PR #25751](https://github.com/angular/angular/pull/25751).

  `HttpClient` 支持指定请求的元数据。参见 [PR＃25751](https://github.com/angular/angular/pull/25751) 。

{@a breaking-changes}
### Breaking changes in Angular version 12

### Angular 12 版中的重大更改

* Add support for TypeScript 4.2.
  TypeScript <4.2.3 is no longer supported.
  The supported range of TypeScript versions is 4.2.3 to 4.2.x.
  See [PR #41158](https://github.com/angular/angular/pull/41158).

  添加对 TypeScript 4.2 的支持。不再支持 TypeScript &lt;4.2.3。 TypeScript 版本支持的范围是 4.2.3 到 4.2.x。参见 [PR＃41158](https://github.com/angular/angular/pull/41158) 。

* Angular CDK and Angular Material internally now use the new [Sass module system](https://sass-lang.com/blog/the-module-system-is-launched), which is actively maintained by the Sass team at Google.
  Consequently, applications can no longer consume Angular CDK/Material's Sass with the [`node-sass` npm package](https://www.npmjs.com/package/node-sass).
  `node-sass` is unmaintained and does not support newer Sass features. Instead, applications must use the [`sass` npm package](https://www.npmjs.com/package/sass), or the [`sass-embedded` npm package](https://www.npmjs.com/package/sass-embedded) for the `sass-embedded` beta.

  Angular CDK 和 Angular Material 的内部现在使用新的 [Sass 模块系统](https://sass-lang.com/blog/the-module-system-is-launched)，该系统正由 Google 的 Sass 团队积极维护。因此，应用无法再通过 [`node-sass` npm 软件包](https://www.npmjs.com/package/node-sass) 使用 Angular CDK / Material 的 Sass。`node-sass` 已停止维护，并且不支持新的 Sass 功能。相反，应用必须使用 [`sass` npm 软件包](https://www.npmjs.com/package/sass)或 `sass-embedded` beta [`sass-embedded` npm 软件包](https://www.npmjs.com/package/sass-embedded)。

* The Angular tooling now uses Webpack 5 to build applications. Webpack 4 usage and support has been removed.
  You don't need to make any project level configuration changes to use the upgraded Webpack version when using the official Angular builders.
  Custom builders based on this package that use the experimental programmatic APIs may need to be updated to become compatible with Webpack 5.
  See [PR #20466](https://github.com/angular/angular-cli/pull/20466).

  Angular 工具现在使用 Webpack 5 来构建应用。 Webpack 4 的用法和支持已被删除。使用正式的 Angular 构建器时，无需进行任何项目级别的配置更改即可使用升级后的 Webpack 版本。基于此程序包的使用实验性编程 API 的自定义构建器可能需要升级，以便与 Webpack 5 兼容。参见 [PR＃20466](https://github.com/angular/angular-cli/pull/20466) 。

* Webpack 5 generates similar but differently named files for lazy-loaded JavaScript files in development configurations when the `namedChunks` option is enabled.
  For the majority of users this change should have no effect on the application or build process.
  Production builds should also not be affected as the `namedChunks` option is disabled by default in production configurations.
  However, if a project's post-build process makes assumptions as to the file names, then adjustments may need to be made to account for the new naming paradigm.
  Such post-build processes could include custom file transformations after the build, integration into service-side frameworks, or deployment procedures.
  An example of a development file name change is `lazy-lazy-module.js` becoming `src_app_lazy_lazy_module_ts.js`.
  See [PR #20466](https://github.com/angular/angular-cli/pull/20466).

  当启用了 `namedChunks` 时，Webpack 5 会为开发配置中惰性加载的 JavaScript 文件生成相似但不同名的文件。对于大多数用户而言，此更改不会对应用或构建过程产生影响。生产版本也不会受到影响，因为在生产配置中默认启用了 `namedChunks`。 但是，如果项目的构建后过程对文件名进行了某些假设，则可能需要进行调整以考虑新的命名规范。这类构建后过程可能包括构建后的自定义文件转换、集成到服务端框架或部署过程中。开发文件名更改的一个例子是 `lazy-lazy-module.js` 变为 `src_app_lazy_lazy_module_ts.js`。参见 [PR＃20466](https://github.com/angular/angular-cli/pull/20466) 。

* Webpack 5 now includes web worker support.
  However, the structure of the URL within the worker constructor must be in a specific format that differs from the current requirement.
  To update web worker usage, where `./app.worker` is the actual worker name, change `new Worker('./app.worker', ...)` to `new Worker(new URL('./app.worker', import.meta.url), ...)`.
  See [PR #20466](https://github.com/angular/angular-cli/pull/20466).

  Webpack 5 现在包括对 Web Worker 的支持。但是，Web Worker 构造函数中 URL 的结构必须采用不同于当前要求的特定格式。要修改 Web Worker 的用法，其中 `./app.worker` 是实际的 worker 名称， `new Worker('./app.worker', ...)` 要改为 `new Worker(new URL('./app.worker', import.meta.url), ...)`。参见 [PR＃20466](https://github.com/angular/angular-cli/pull/20466) 。

* Critical CSS inlining is now enabled by default.
  To turn this off, set `inlineCritical` to false.
  See [PR #20096](https://github.com/angular/angular-cli/pull/20096) and the [Style preprocessor options](guide/workspace-config#optimization-configuration) section of [Angular workspace configuration](guide/workspace-config).

  现在，默认情况下已启用关键 CSS 内联。要关闭此功能，请将 `inlineCritical` 设置为 false。参见 [PR＃20096](https://github.com/angular/angular-cli/pull/20096) 和 [Angular 工作空间配置](guide/workspace-config)中的的[样式预处理程序选项](guide/workspace-config#optimization-configuration)部分。

* `ng build` now produces production bundle by default.
  See [PR #20128](https://github.com/angular/angular-cli/pull/20128).

  `ng build` 现在默认情况下会生成针对生产环境的捆绑包。参见 [PR＃20128](https://github.com/angular/angular-cli/pull/20128) 。

* Previously, the Forms module ignored `min` and `max` attributes defined on the `<input type="number">`.
  Now these attributes trigger `min` and `max` validation logic in cases where `formControl`, `formControlName`, or `ngModel` directives are also present on a given input.
  See [PR #39063](https://github.com/angular/angular/pull/39063).

  以前，Forms 模块会忽略 `<input type="number">` 上定义的 `min` 和 `max` 属性。现在，`formControl` ，formControlName 或 `ngModel` 指令都提供了对应的输入属性，这些属性将触发 `min` 和 `max` 验证逻辑。参见 [PR＃39063](https://github.com/angular/angular/pull/39063) 。

{@a deprecations}
### New deprecations

### 新的弃用

* Support for Internet Explorer 11 is deprecated.
  See [Deprecated APIs and features](guide/deprecations) and [Microsoft 365 apps say farewell to Internet Explorer 11 and Windows 10 sunsets Microsoft Edge Legacy](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666).

  不建议再使用 Internet Explorer 11。参见[已弃用的 API 和功能](guide/deprecations)，[Microsoft 365 应用将告别 Internet Explorer 11 并且 Windows 10 将放弃 Microsoft Edge Legacy](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666) 。

* Sass imports from `@angular/material/theming` are deprecated. There is a new Angular Material Sass API for `@use`.
  Run the migration script `ng g @angular/material:themingApi` to switch all your Sass imports for Angular CDK and Angular Material to the new API and `@use`.

  不建议再从 `@angular/material/theming` 中导入 Sass。请改用基于 `@use` 的新的 Angular Material Sass API。运行迁移脚本 `ng g @angular/material:themingApi` 将 Angular CDK 和 Angular Material 的所有 Sass 导入都切换到新的 API 和 `@use`。

* Support for publishing libraries with View Engine has been deprecated:

  不建议再使用 View Engine 发布库：

  - You can now compile libraries in [_partial_ compilation mode](guide/angular-compiler-options#compilationmode) to generate Ivy compatible output that will be _linked_ when an application using that library is bundled.

    现在，你可以在[*部分*编译模式下](guide/angular-compiler-options#compilationmode)编译库，以生成与 Ivy 兼容的输出，当使用该库的应用被打包时，这些输出将被*链接*进去。

  - New libraries you create with the Angular CLI default to partial compilation mode, and do not support View Engine. You can still build a library with View Engine. See [Creating libraries](guide/creating-libraries) for more information.

    使用 Angular CLI 创建的新库默认为部分编译模式，并且不支持 View Engine。你仍然可以使用 View Engine 构建库。有关更多信息，参见[创建库](guide/creating-libraries)。

  - Libraries compiled in partial compilation mode will not contain legacy `i18n` message IDs.
    If the library was previously compiled by View Engine, and contained legacy `i18n` message IDs, then applications may have translation files that you'll need to migrate to the new message ID format. For more information, see [Migrating legacy localization IDs](guide/migration-legacy-message-id).

    在部分编译模式下编译的库将不再包含旧版 `i18n` 消息 ID。如果该库以前是由 View Engine 编译的，并且包含旧版 `i18n` 消息 ID，则应用可能已经有翻译文件，你需要将其迁移成新的消息 ID 格式。有关更多信息，参见 [迁移旧版本地化 ID](guide/migration-legacy-message-id) 。

  - For context, see [Issue #38366](https://github.com/angular/angular/issues/38366).

    有关上下文，请参见[问题＃38366](https://github.com/angular/angular/issues/38366)。

<div class="alert is-helpful">

Since version 9, Angular Ivy is the default rendering engine.
For more information about Ivy, see [Angular Ivy](guide/ivy).

从版本 9 开始，Angular Ivy 是默认渲染引擎。有关 Ivy 的更多信息，请参见 [Angular Ivy](guide/ivy) 。

</div>
