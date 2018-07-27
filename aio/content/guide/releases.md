# Angular versioning and releases

# Angular 的版本与发布

We recognize that you need stability from the Angular framework. Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Angular to thrive.

我们知道你希望 Angular 框架具有稳定性（stability）。稳定性可以确保组件与库、教程、工具和现有实践不会突然被废弃。稳定性是让基于 Angular 的生态系统变得繁荣的基石。

We also share with you the desire for Angular to keep evolving. We strive to ensure that the foundation on top of which you are building is continuously improving and enabling you to stay up-to-date with the rest of the web ecosystem and your user needs.

我们也和你一样希望 Angular 能持续演进。我们会努力确保这些你用于构建应用的基础能得到持续的改进，并让你能及时同步到 Web 生态系统的其它部分的最新进展，用户需求也是一样。

This document contains the practices that we follow to provide you with a leading-edge app development platform, balanced with stability. We strive to ensure that future changes are always introduced in a predictable way. We want everyone who depends on Angular to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

本文档包含一些我们所遵循的实践，它让我们能为你提供一个前沿的应用开发平台，同时兼顾稳定性。我们会努力确保将来的变化总是以一种可预期的方式引入。我们希望每个 Angular 用户都明白我们将在何时添加以及如何添加新特性，并且为那些将要移除的、准备废弃的特性提前做好准备。

See [Updating your projects](guide/updating "Updating your projects") for information about how to update your apps and libraries to the latest version of Angular.

参见[更新你的项目](guide/updating "Updating your projects")，以了解如何把你的应用和库更新到 Angular 的最新版本。

<div class="alert is-helpful">

The practices described in this document apply to Angular 2.0 and later. If you are currently using AngularJS, see [Upgrading from AngularJS](guide/upgrade "Upgrading from Angular JS"). _AngularJS_ is the name for all v1.x versions of Angular.

本文档中提及的这些实践适用于 Angular 2.0 及以后的版本。如果你正在使用 AngularJS，请参见[从 AngularJS 升级](guide/upgrade "Upgrading from Angular JS")。*AngularJS*专指 Angular 所有的 v1.x 版本。 

</div>

{@a angular-versioning}

## Angular versioning

## Angular 的版本

Angular version numbers indicate the level of changes that are introduced by the release. This use of [semantic versioning](https://semver.org/ "Semantic Versioning Specification") helps you understand the potential impact of updating to a new version. 

Angular 的版本号表明本次发布中所引入的变更级别。它使用[语义化版本号](https://semver.org/ "Semantic Versioning Specification")来帮助你理解升级到新版本时的潜在影响。

Angular version numbers have three parts: `major.minor.patch`. For example, version 5.2.9 indicates major version 5, minor version 2, and patch version 9. 

Angular 的版本号包括三个部分：`major.minor.patch`。比如，版本 5.2.9 表示主版本号是 5，小版本号是 2，补丁版本号是 9。

The version number is incremented based on the level of change included in the release. 

版本号是根据本次发布中包含的变更的级别进行递增的。

* Major releases contain significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs. 

   主版本包含重要的新特性，其中的部分特性在升级时会需要由开发人员提供少量的协助才能完成。当升级到新的主版本时，你可能需要运行升级脚本、重构代码、运行其它测试以及学习新的 API。

* Minor releases contain new smaller features. Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release. We update peer dependencies in minor versions by expanding the supported versions, but we do not require projects to update these dependencies. 

   小版本包含新的小型特性。小版本是完全向后兼容的，在升级期间，不需要开发人员提供协助，但是你可以（可选的）修改你的应用和库，来使用本次发布中新增的 API、特性和能力。我们会扩展平级依赖（peer dependency）中的小版本号范围来更新平级依赖，但并不需要你的项目也更新那些依赖。

* Patch releases are low risk, bug fix releases. No developer assistance is expected during update.

   补丁版本是风险最低的、修 BUG 的版本。在升级期间完全不需要开发人员的协助。

If you are updating within the same major version, then you can skip any intermediate versions and update directly to the targeted version. For example, if you want to update from 5.0.0 to 5.2.9, then you can update directly; you do not need to update from 5.0.0 to 5.1.0 before updating to 5.2.9. 

如果你正在同一个主版本内进行升级，那么你可以跳过任何中间版本，直接升级到目标版本。比如，如果你想从 5.0.0 升级到 5.2.9，那么你可以直接升级，而不用先升级到 5.1.0 再升级到 5.2.9。

If you are updating from one major version to another, then we recommend that you don't skip major versions. Follow the instructions to incrementally update to the next major version, testing and validating at each step. For example, if you want to update from version 4.x.x to version 6.x.x, we recommend that you update to the latest 5.x.x release first. After successfully updating to 5.x.x, you can then update to 6.x.x. 

如果你要从一个主版本升级到另一个，那么我们建议你不要跳过主版本。要遵循升级指南，逐次升级到下一个主版本，在每一个步骤做完后都测试并验证一下。比如，如果你要从 4.x.x 升级到 6.x.x，我们建议你先升级到 5.x.x 中的最新版。在成功升级到 5.x.x 后，你就可以升级到 6.x.x 了。

Pre-release previews&mdash;such as Beta and Release Candidate versions&mdash;are indicated by appending a dash and a beta or rc identifier, such as version 5.2.9-rc.3.

预发布的预览版（比如 Beta 和 RC 版本）会在版本号后面跟一个横线，再跟一个 beta 或 rc 标识，比如 5.2.9-rc.3。

{@a frequency}

## Release frequency

## 发布频率

We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Angular.

我们会定期发布新版本，以便随着 Angular 的不断演进，你可以提前计划并协调这些升级工作。

In general, you can expect the following release cycle:

通常，你可以期待下列发布周期：

* A major release every 6 months

   每 6 个月一个主版本

* 1-3 minor releases for each major release

   每个主版本中包含 1~3 个小版本

* A patch release almost every week

   差不多每周一个补丁版本

We bake quality into our releases&mdash;and let you preview what's coming next&mdash;by providing Beta releases and release candidates (RCs) for each major and minor release.

我们会通过为每个主版本和小版本提供 Beta 发布和 RC 发布，来提高这些发布的质量，并且让你可以预览未来的特性。

This cadence of releases gives you access to new beta features as soon as they are ready, while maintaining the stability and reliability of the platform for production users.

这种发布节奏可以让你可以通过 beta 版提前使用新特性，同时，为生产环境下的用户维护本平台的稳定性和可靠性。

{@a schedule}

## Release schedule

## 发布计划

<div class="alert is-helpful">

Disclaimer: The dates are offered as general guidance and may be adjusted by us when necessary to ensure delivery of a high-quality platform. 

免责声明：这些日期只是作为一般性的指导，在必要时我们会进行调整，以确保始终提供高质量的平台。

</div>

The following table contains our current target release dates for the next two major versions of Angular: 

下表中包含下面两个 Angular 主版本的目标发布日期：

 <t>Date</t><t>日期</t>  | <t>Stable Release</t><t>稳定版</t> | <t>Compatibility</t><t>兼容性</t>
 ---------------------- | -------------- | ----------------
 <t>September/October 2018</t><t>2018-09/10</t> | 7.0.0          | ^6.0.0
 <t>March/April 2019</t><t>2019-03/04</t>       | 8.0.0          | ^7.0.0

 Compatiblity note: The primary goal of the backwards compatibility promise is to ensure that changes in the core framework and tooling don't break the existing ecosystem of components and applications and don't put undue upgrade/migration burden on Angular application and component authors.

兼容性说明：向后兼容性承诺的主要目标是确保在核心框架和核心工具中的变化不会破坏现有组件和应用的生态系统，并且不要给 Angular 应用和组件的开发者带来额外的升级/迁移负担。

{@a lts}
{@a support}
## Support policy

## 支持策略

All of our major releases are supported for 18 months. 

所有主版本的支持周期都是 18 个月。

* 6 months of active support, during which regularly-scheduled updates and patches are released, as described above in [Release frequency](#frequency "Release frequency").

   6 个月的活跃支持，在此期间我们会定期发布更新和补丁，正如前面的[发布频率](#frequency "Release frequency")中所说的。

* 12 months of long-term support(LTS). During the LTS period, only critical fixes and security patches will be released.

   12 个月的长期支持（LTS）。在 LTS 期间，只会发布关键性修复和安全补丁。

The following table provides the support status and key dates for Angular version 4.0.0 and higher.

下表中提供了 Angular 4.0.0 以上的支持状态和一些关键时间点。

<style>

    td, th {vertical-align: top}

</style>

<table>

    <tr>
        <th><t>Version</t><t>版本</t></th>
        <th><t>Status</t><t>状态</t></th>
        <th><t>Release Date</t><t>发布日期</t></th>
        <th><t>LTS Start Date</t><t>LTS 起始日期</t></th>
        <th><t>LTS End Date</t><t>LTS 结束日期</t></th>
    </tr>

    <tr>
        <td>^4.0.0</td>
        <td>LTS</td>
        <td><t>March 23, 2017</t><t>2017-03-23</t></td>
        <td><t>September 23, 2017</t><t>2017-09-23</t></td>
        <td><t>September 23, 2018</t><t>2018-09-23</t></td>
    </tr>

    <tr>
        <td>^5.0.0</td>
        <td>LTS</td>
        <td><t>November 1, 2017</t><t>2017-11-01</t></td>
        <td><t>May 1, 2018</t><t>2018-05-01</t></td>
        <td><t>May 1, 2019</t><t>2019-05-01</t></td>
    </tr>

    <tr>
        <td>^6.0.0</td>
        <td>Active</td>
        <td><t>May 3, 2018</t><t>2018-05-03</t></td>
        <td><t>November 3, 2018</t><t>2018-11-03</t></td>
        <td><t>November 3, 2019</t><t>2019-11-03</t></td>
    </tr>

</table>



{@a deprecation}

## Deprecation practices

## 弃用策略

Sometimes &quot;breaking changes&quot;, such as the removal of support for select APIs and features, are necessary to innovate and stay current with new best practices, changing dependencies, or changes in the (web) platform itself. 

"破坏性变更"（比如移除特定的 API 和特性）有时候是必须的，比如创新、让最佳实践与时俱进、变更依赖关系甚至来自 Web 平台自身的变化。

To make these transitions as easy as possible, we make two commitments to you:

要让这些转变尽可能的简单，我们会给你两项保证：

* We work hard to minimize the number of breaking changes and to provide migration tools when possible. 

   我们会尽量减少破坏性变更的数量，并尽可能提供迁移工具。

* We follow the deprecation policy described here, so you have time to update your apps to the latest APIs and best practices.

   我们会遵循这里所讲的弃用策略，让你有时间把应用升级到最新的 API 和最佳实践。

To help ensure that you have sufficient time and a clear path to update, this is our deprecation policy:

为了保证你能有充足的时间和清晰的路径进行升级，我们制定了如下弃用策略：

* We announce deprecated features in the [change log](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log").

   当在[变更记录](https://github.com/angular/angular/blob/master/CHANGELOG.md "Angular change log")中宣布了准备弃用的特性时。

* When we announce a deprecation, we also announce a recommended update path.

   当我们宣布一项弃用时，我们也会同时宣布建议的升级路径。

* We support existing use of a stable API during the deprecation period, so  your code will keep working during that period. 

   我们会在弃用期间支持使用现有的稳定 API，所以在此期间你的代码仍然能正常工作。

* We support each deprecated API for at least two subsequent major releases, which means at least 12 months after deprecation.

   我们会支持每个弃用的 API 至少连续两个主版本，这意味着在弃用之前至少有 12 个月的时间。

* We only make peer dependency updates that require changes to your apps in a major release. In minor releases, we update peer dependencies by expanding the supported versions, but we do not require projects to update these dependencies until a future major version. 

   我们只会在主版本中更新你的应用所需的平级依赖。在小版本中，我们通过扩展支持的版本来升级平级依赖。但是我们不需要项目也更新这些依赖 —— 直到下一个主版本为止。

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
