# Angular versioning and releases

# Angular 的版本与发布

We recognize that you need stability from the Angular framework. Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Angular to thrive.

我们知道你希望 Angular 框架具有稳定性（stability）。稳定性可以确保组件与库、教程、工具和现有实践不会突然被废弃。稳定性是让基于 Angular 的生态系统变得繁荣的基石。

We also share with you the desire for Angular to keep evolving. We strive to ensure that the foundation on top of which you are building is continuously improving and enabling you to stay up-to-date with the rest of the web ecosystem and your user needs.

我们也和你一样希望 Angular 能持续演进。我们会努力确保这些你用于构建应用的基础能得到持续的改进，并让你能及时同步到 Web 生态系统的其它部分的最新进展，用户需求也是一样。

This document contains the practices that we follow to provide you with a leading-edge app development platform, balanced with stability. We strive to ensure that future changes are always introduced in a predictable way. We want everyone who depends on Angular to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

本文档包含一些我们所遵循的实践，它让我们能为你提供一个前沿的应用开发平台，同时兼顾稳定性。我们会努力确保将来的变化总是以一种可预期的方式引入。我们希望每个 Angular 用户都明白我们将在何时添加以及如何添加新特性，并且为那些将要移除的、准备废弃的特性提前做好准备。

<div class="alert is-helpful">

The practices described in this document apply to Angular 2.0 and later. If you are currently using AngularJS, see [Upgrading from AngularJS](guide/upgrade "Upgrading from Angular JS"). _AngularJS_ is the name for all v1.x versions of Angular.

本文档中提及的这些实践适用于 Angular 2.0 及以后的版本。如果你正在使用 AngularJS，请参见[从 AngularJS 升级](guide/upgrade "Upgrading from Angular JS")。*AngularJS*专指 Angular 所有的 v1.x 版本。

</div>

{@a versioning}
## Angular versioning

## Angular 的版本

Angular version numbers indicate the level of changes that are introduced by the release. This use of [semantic versioning](https://semver.org/ "Semantic Versioning Specification") helps you understand the potential impact of updating to a new version.

Angular 的版本号表明本次发布中所引入的变更级别。它使用[语义化版本号](https://semver.org/ "Semantic Versioning Specification")来帮助你理解升级到新版本时的潜在影响。

Angular version numbers have three parts: `major.minor.patch`. For example, version 7.2.11 indicates major version 7, minor version 2, and patch level 11.

Angular 的版本号包括三个部分：`major.minor.patch`。比如，版本 7.2.11 表示主版本号是 7，小版本号是 2，补丁版本号是 11。

The version number is incremented based on the level of change included in the release.

版本号是根据本次发布中包含的变更的级别进行递增的。

* **Major releases** contain significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.

  **主版本**包含重要的新特性，其中的部分特性在升级时会需要由开发人员提供少量的协助才能完成。当升级到新的主版本时，你可能需要运行升级脚本、重构代码、运行其它测试以及学习新的 API。

* **Minor releases** contain new smaller features. Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release. We update peer dependencies in minor versions by expanding the supported versions, but we do not require projects to update these dependencies.

  **小版本**包含新的小型特性。小版本是完全向后兼容的，在升级期间，不需要开发人员提供协助，但是你可以（可选的）修改你的应用和库，来使用本次发布中新增的 API、特性和能力。我们会扩展库的对等依赖（peer dependency）中的小版本号范围来更新库同级，但并不需要你的项目也更新那些依赖。

* **Patch releases** are low risk, bug fix releases. No developer assistance is expected during update.

  **补丁版本**是风险最低的、修 BUG 的版本。在升级期间完全不需要开发人员的协助。

<div class="alert is-helpful">

**Note:** As of Angular version 7, the major versions of Angular core and the CLI are aligned. This means that in order to use the CLI as you develop an Angular app, the version of `@angular/core` and the CLI need to be the same.

**注意：**从 Angular 版本 7 开始，Angular Core 和 CLI 的主要版本已对齐。这意味着在开发 Angular 应用程序时使用的 `@angular/core` 和 CLI 的版本必须相同。

</div>

{@a updating}
### Supported update paths

### 所支持的升级路径

In alignment with the versioning scheme described above, we commit to support the following update paths:

为了和上面所讲的版本方案一致，我们承诺支持如下升级路径：

* If you are updating within the **same major version,** then you can skip any intermediate versions and update directly to the targeted version. For example, you can update directly from 7.0.0 to 7.2.11.

  如果你在**同一个主版本**内升级，那么你可以跳过任何中间版本，直接升级到目标版本。比如，你可以直接从 7.0.0 升级到 7.2.11。

* If you are updating from **one major version to another,** then we recommend that you **don't skip major versions.** Follow the instructions to incrementally update to the next major version, testing and validating at each step. For example, if you want to update from version 6.x.x to version 8.x.x, we recommend that you update to the latest 7.x.x release first. After successfully updating to 7.x.x, you can then update to 8.x.x.

  如果你要从一个主版本升级到另一个主版本，那么我们建议你不要跳过主版本。要遵循本升级指南，依次升级到下一个主版本，在每一个步骤做完后都测试并验证一下。比如，如果你要从 6.x.x 升级到 8.x.x，我们建议你先升级到 7.x.x 中的最新版。在成功升级到 7.x.x 后，你就可以升级到 8.x.x 了。

See [Keeping Up-to-Date](guide/updating "Updating your projects") for more information about updating your Angular projects to the most recent version.

参见[保持更新](guide/updating "Updating your projects")以了解把 Angular 项目升级到最新版本的更多信息。

{@a previews}
### Preview releases

### 预览发布

We let you preview what's coming by providing "Next" and Release Candidates (`rc`) pre-releases for each major and minor release:

我们还会通过提供 Next 版和 RC（候选发布）版来让你预览每个即将到来的大版本和小版本。

* **Next:** The release that is under active development and testing. The next release is indicated by a release tag appended with the  `-next` identifier, such as  `8.1.0-next.0`.

  **Next 版**：这是正在活跃开发和测试中的发布。Next 版的发布标签带有 `-next` 后缀，比如 `8.1.0-next.0`。

* **Release candidate:** A release that is feature complete and in final testing. A release candidate is indicated by a release tag appended with the `-rc` identifier, such as version `8.1.0-rc.0`.

  **RC 版**：一个特性已经完成，正在进行最终测试的版本。RC 版的发布标签带有 `-rc` 标志，比如 `8.1.0-rc.0`。

The latest `next` or `rc` pre-release version of the documentation is available at [next.angular.io](https://next.angular.io).

`next` 或 `rc` 预发布版的文档位于 [next.angular.io](https://next.angular.io)。

{@a frequency}

## Release frequency

## 发布频率

We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Angular.

我们会定期发布新版本，以便随着 Angular 的不断演进，你可以提前计划并协调这些升级工作。

<div class="alert is-helpful">

Disclaimer: Dates are offered as general guidance and will be adjusted by us when necessary to ensure delivery of a high-quality platform.

免责条款：这些日期仅供参考，如有必要，我们会对其进行调整，以确保提供高质量的平台。

</div>

In general, you can expect the following release cycle:

通常，你可以期待下列发布周期：

* A major release every 6 months

   每 6 个月一个主版本

* 1-3 minor releases for each major release

   每个主版本中包含 1~3 个小版本

* A patch release and pre-release (`next` or `rc`) build almost every week

   差不多每周一个发行版或预发行版(`next` 或 `rc`)的补丁版本

This cadence of releases gives eager developers access to new features as soon as they are fully developed and pass through our code review and integration testing processes, while maintaining the stability and reliability of the platform for production users that prefer to receive features after they have been validated by Google and other developers that use the pre-release builds.

这种发布的节奏能让渴望新功能的开发者在这些功能开发开发完成并通过我们的代码审查和集成测试流程后立即就可以使用，同时为那些喜欢在新功能经过 Google 和其他使用预发布版本的开发人员的验证后才采纳的生产环境用户，保持平台的稳定性和可靠性。

{@a lts}
{@a support}
## Support policy and schedule

## 支持策略

All of our major releases are supported for 18 months.

所有主版本的支持周期都是 18 个月。

* 6 months of *active support*, during which regularly-scheduled updates and patches are released.

   6 个月的*活跃支持*，在此期间我们会定期发布更新和补丁

* 12 months of *long-term support (LTS)*, during which only critical fixes and security patches are released.

   12 个月的*长期支持（LTS）*，在 LTS 期间，只会发布关键性修复和安全补丁。

The following table provides the status for Angular versions under support.

下表中提供了目前受支持的 Angular 版本的状态。

Version | Status | Released     | Active Ends  | LTS Ends
------- | ------ | ------------ | ------------ | ------------
版本 | 状态 | 发布     | 停止活动  | LTS 结束
^10.0.0 | Active | Jun 24, 2020 | Dec 24, 2020 | Dec 24, 2021
^10.0.0 | 活跃 | 2020 年 6 月 24 日 | 2020 年 12 月 24 日 | Dec 24, 2021
^9.0.0  | Active | Feb 06, 2020 | Aug 06, 2020 | Aug 06, 2021
^9.0.0  | 活跃 | 2020 年 2 月 6 日 | 2020 年 8 月 6 日 | 2021 年 8 月 6 日
^8.0.0  | LTS    | May 28, 2019 | Nov 28, 2019 | Nov 28, 2020
^8.0.0  | LTS    | 2019 年 5 月 28 日 | 2019 年 11 月 28 日 | 2020 年 11 月 28 日

Angular versions ^4.0.0, ^5.0.0, ^6.0.0 and ^7.0.0 are no longer under support.

不再为 ^4.0.0、^5.0.0、^6.0.0 和 ^7.0.0 版提供支持。

{@a deprecation}

## Deprecation practices

## 弃用策略

Sometimes &quot;breaking changes&quot;, such as the removal of support for select APIs and features, are necessary to innovate and stay current with new best practices, changing dependencies, or changes in the (web) platform itself.

"重大变更"（比如移除特定的 API 和特性）有时候是必须的，比如创新、让最佳实践与时俱进、变更依赖关系甚至来自 Web 平台自身的变化。

To make these transitions as easy as possible, we make these commitments to you:

要让这些转变尽可能的简单，我们会给你下列保证：

* We work hard to minimize the number of breaking changes and to provide migration tools when possible.

   我们会尽量减少重大变更的数量，并尽可能提供迁移工具。

* We follow the deprecation policy described here, so you have time to update your apps to the latest APIs and best practices.

   我们会遵循这里所讲的弃用策略，让你有时间把应用升级到最新的 API 和最佳实践。

To help ensure that you have sufficient time and a clear path to update, this is our deprecation policy:

为了保证你能有充足的时间和清晰的路径进行升级，我们制定了如下弃用策略：

* **Announcement:** We announce deprecated APIs and features in the [change log](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log"). Deprecated APIs appear in the [documentation](api?status=deprecated) with ~~strikethrough.~~ When we announce a deprecation, we also announce a recommended update path. For convenience,  [Deprecations](guide/deprecations) contains a summary of deprecated APIs and features.

  ** 宣布弃用：** 我们会在[变更记录](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log")中宣布要弃用的那些 API 和特性。启用的 API 在[文档](api?status=deprecated)中会显示成带~~删除线~~的样式。当我们宣布一项弃用时，我们还会宣布一个建议的升级路径。为便于查找，我们在[弃用列表](guide/deprecations)中包含一个关于弃用 API 和特性的汇总表。

* **Deprecation period:** When an API or a feature is deprecated, it will still be present in the next two major releases. After that, deprecated APIs and features will be candidates for removal. A deprecation can be announced in any release, but the removal of a deprecated API or feature will happen only in major release. Until a deprecated API or feature is removed, it will be maintained according to the LTS support policy, meaning that only critical and security issues will be fixed.

  **弃用阶段：** 当 API 或特性已弃用时，它在接下来的两个主版本中仍然会存在。再往后，弃用的 API 和特性将会进入候选弃用状态。可能会在任何一次发布中宣布弃用，但是只会在主版本中移除已弃用的 API 或特性。除非已弃用的 API 或特性已被移除，否则我们仍然会根据 LTS 支持策略来维护它，也就是说，只会修复严重问题和安全问题。

* **npm dependencies:** We only make npm dependency updates that require changes to your apps in a major release.
In minor releases, we update peer dependencies by expanding the supported versions, but we do not require projects to update these dependencies until a future major version. This means that during minor Angular releases, npm dependency updates within Angular applications and libraries are optional.

  **npm 依赖：** 在主版本中，我们只会更新那些需要修改你的应用的那些 npm 依赖项。在次要版本中，我们会通过扩展受支持版本范围的方式来更新对等依赖（peerDependencies），但在下一个主版本到来之前，不会强制要求你升级它们。这意味着，在次要版本中，Angular 应用和库中，npm 依赖项的更新是可选的。

{@a public-api}

## Public API surface

## 公共 API

Angular is a collection of many packages, sub-projects, and tools. To prevent accidental use of private APIs&mdash;and so that you can clearly understand what is covered by the practices described here&mdash;we document what is and is not considered our public API surface. For details, see [Supported Public API Surface of Angular](https://github.com/angular/angular/blob/master/docs/PUBLIC_API.md "Supported Public API Surface of Angular").

Angular 是很多包、子项目和工具的集合。为了防止你意外使用私有 API（这样你才能更清楚的理解哪些 API 会被这里所说的实践所覆盖），我们对公开 API 包含以及不包含哪些 API 进行了文档化。要了解详情，参见 [Angular 的公共 API](https://github.com/angular/angular/blob/master/docs/PUBLIC_API.md "Supported Public API Surface of Angular")。

Any changes to the public API surface will be done using the versioning, support, and depreciation policies describe above.

任何对公共 API 的修改都适用于上述这些版本、支持和弃用策略。

{@a labs}

## Angular Labs

## Angular 实验室（Labs）

Angular Labs is an initiative to cultivate new features and iterate on them quickly. Angular Labs provides a safe place for exploration and experimentation by the Angular team.

Angular 实验室是一项旨在试验新特性并快速迭代它们的尝试。Angular 实验室为 Angular 团队提供了一个探索和试验的安全场所。

Angular Labs projects are not ready for production use, and no commitment is made to bring them to production. The policies and practices that are described in this document do not apply to Angular Labs projects.

Angular 实验室项目尚未准备好供产品环境使用，并且没有任何会把它们带入到产品环境的承诺。本文档中描述的这些策略和实践都不适用于 Angular 实验室中的项目。
