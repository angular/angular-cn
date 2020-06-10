# Gathering and Viewing Usage Analytics

# 收集和查看使用情况分析

Users can opt in to share their Angular CLI usage data with [Google Analytics](https://support.google.com/analytics/answer/1008015?hl=en), using the [`ng analytics` CLI command](analytics).
The data is also shared with the Angular team, and used to improve the CLI.

用户可以尝试使用 [CLI 命令 `ng analytics`](analytics) 在 [Google Analytics](https://support.google.com/analytics/answer/1008015?hl=en) 上分享他们的 Angular CLI 使用情况数据。这些数据也会与 Angular 团队共享，以改进 CLI。

The gathering of CLI analytics data is disabled by default, and must be enabled at the project level by individual users.
It cannot be enabled at the project level for all users.

默认情况下，CLI 会禁用分析数据的采集工作，必须由每个用户在项目级别启用它。它无法在项目级别对所有用户启用。

Data gathered in this way can be viewed on the Google Analytics site, but is not automatically visible on your own organization's Analytics site.
As an administrator for an Angular development group, you can configure your instance of Angular CLI to be able to see analytics data for your own team's usage of the Angular CLI.
This configuration option is separate from and in addition to other usage analytics that your users may be sharing with Google.

以这种方式收集的数据可以在 Google Analytics 网站上查看，但不会自动显示在你所属单位的 Google Analytics 网站上。如果你是开发组织的管理员，可以配置你们的 Angular CLI 实例来查看你的团队在使用 Angular CLI 时的分析数据。此配置项与该用户可能与 Google 共享的对其它使用情况的分析是彼此隔离的。

## Enable access to CLI usage data

## 允许访问 CLI 使用情况数据

To configure access to your own users' CLI usage data, use the `ng config` command to add a key to your global [`angular.json` workspace configuration file](guide/workspace-config).
The key goes under `cli.analyticsSharing` at the top level of the file, outside the `projects` sections.
The value of the key is your organization's tracking ID, as assigned by Google Analytics.
This ID is a string that looks like `UA-123456-12`.

要配置对所属用户的 CLI 使用率数据的访问权限，请使用 `ng config` 命令在全局 [`angular.json` 工作空间配置文件中](guide/workspace-config)添加一个键。这个键位于文件顶层的 `cli.analyticsSharing` 下，位于 `projects` 部分之外。此键值是你们组织的跟踪 ID，通过 Google Analytics 指定。此 ID 形如 `UA-123456-12`。

You can choose to use a descriptive string as the key value, or be assigned a random key when you run the CLI command.
For example, the following command adds a configuration key named "tracking".

你也可以选择使用描述性字符串作为键，或者在运行 CLI 命令时给它分配一个随机的键。例如，下面的命令会添加一个名为 “tracking” 的配置键。

<code-example language="sh" class="code-shell">
ng config --global cli.analyticsSharing.tracking UA-123456-12
</code-example>

To turn off this feature, run the following command:

要关闭此功能，请执行如下命令：

<code-example language="sh" class="code-shell">
ng config --global --remove cli.analyticsSharing
</code-example>

## Per user tracking

## 按用户跟踪

You can add a custom user ID to the global configuration, in order to identify unique usage of commands and flags.
If that user enables CLI analytics for their own project, your analytics display tracks and labels their individual usage.

你可以在全局配置中添加一个自定义的用户 ID，以单独区分命令和标志的使用情况。如果该用户也为自己的项目启用了 CLI 分析，那么分析器会分别显示这些跟踪并标记出各自的使用情况。

<code-example language="sh" class="code-shell">
ng config --global cli.analyticsSharing.user SOME_USER_NAME
</code-example>

To generate a new random user ID, run the following command:

要生成新的随机用户 ID，请执行如下命令：

<code-example language="sh" class="code-shell">
ng config --global cli.analyticsSharing.user ""
</code-example>
