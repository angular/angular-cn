{@a glob}

# Service worker configuration

# Service Worker 配置

#### Prerequisites

#### 前提条件

A basic understanding of the following:

对下列知识有基本的了解：

* [Service Worker in Production](guide/service-worker-devops).

  [产品环境下的 Service Worker](guide/service-worker-devops).

<hr />

The `src/ngsw-config.json` configuration file specifies which files and data URLs the Angular 
service worker should cache and how it should update the cached files and data. The 
CLI processes the configuration file during `ng build --prod`. Manually, you can process 
it with the `ngsw-config` tool:

配置文件 `src/ngsw-config.json` 指定了 Angular Service Worker 应该缓存哪些文件和数据的 URL，以及如何更新缓存的文件和数据。
CLI 会在 `ng build --prod` 期间处理配置文件。
如果想手动，你可以使用 `ngsw-config` 工具来处理它：

```sh

ngsw-config dist src/ngsw-config.json /base/href

```

The configuration file uses the JSON format. All file paths must begin with `/`, which is the deployment directory&mdash;usually `dist` in CLI projects.

该配置文件使用 JSON 格式。
所有文件路径必须以 `/` 开头，也就是部署目录 —— 在 CLI 项目中的它通常是 `dist`。

Patterns use a limited glob format:

它的模式使用受限的 glob 格式：

* `**` matches 0 or more path segments.

  `**` 匹配 0 到多段路径。

* `*` matches exactly one path segment or filename segment.

  `*` 只匹配一段路径或者文件名。

* The `!` prefix marks the pattern as being negative, meaning that only files that don't match the pattern will be included.

  `!` 前缀表示该模式是否定的，也就是说只包含与该模式不匹配的文件。

Example patterns:

范例模式：

* `/**/*.html` specifies all HTML files.

  `/**/*.html` 指定所有 HTML 文件。

* `/*.html` specifies only HTML files in the root.

  `/*.html` 仅指定根目录下的 HTML 文件。

* `!/**/*.map` exclude all sourcemaps.

  `!/**/*.map` 排除了所有源码映射文件。

Each section of the configuration file is described below. 

下面要讲的是配置文件中的每个区。

## `appData`

This section enables you to pass any data you want that describes this particular version of the app.
The `SwUpdate` service includes that data in the update notifications. Many apps use this section to provide additional information for the display of UI popups, notifying users of the available update.

该区允许你传递要用来描述这个特定应用版本的任何数据。
`SwUpdate` 服务会在更新通知中包含这些数据。
许多应用会使用该区来提供用于 UI 弹窗显示的附加信息，以通知用户有可用的更新。

## `index`

Specifies the file that serves as the index page to satisfy navigation requests. Usually this is `/index.html`.

指定用来充当索引页的文件以满足导航请求。通常是`/index.html`。

## `assetGroups`

*Assets* are resources that are part of the app version that update along with the app. They can include resources loaded from the page's origin as well as third-party resources loaded from CDNs and other external URLs. As not all such external URLs may be known at build time, URL patterns can be matched.

*资产（Assets）*是与应用一起更新的应用版本的一部分。
它们可以包含从页面的源地址加载的资源以及从 CDN 和其他外部 URL 加载的第三方资源。
由于并非所有这些外部URL都能在构建时就知道，因此可以指定 URL 的模式。

This field contains an array of asset groups, each of which defines a set of asset resources and the policy by which they are cached.

该字段包含一个资产组的数组，每个资产组中会定义一组资产资源和它们的缓存策略。

```json

{
  "assetGroups": [{
    ...
  }, {
    ...
  }]
}

```

Each asset group specifies both a group of resources and a policy that governs them. This policy determines when the resources are fetched and what happens when changes are detected.

每个资产组都会指定一组资源和一个管理它们的策略。
此策略用来决定何时获取资源以及当检测到更改时会发生什么。

Asset groups follow the Typescript interface shown here:

这些资产组会遵循这里显示的 Typescript 接口：

```typescript

interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: {
    files?: string[];
    versionedFiles?: string[];
    urls?: string[];
  };
}

```

### `name`

A `name` is mandatory. It identifies this particular group of assets between versions of the configuration.

`name` 是强制性的。它用来标识该配置文件版本中这个特定的资产组。

### `installMode`

The `installMode` determines how these resources are initially cached. The `installMode` can be either of two values:

`installMode` 决定了这些资源最初的缓存方式。`installMode` 可以是以下两个值之一：

* `prefetch` tells the Angular service worker to fetch every single listed resource while it's caching the current version of the app. This is bandwidth-intensive but ensures resources are available whenever they're requested, even if the browser is currently offline.

  `prefetch` 告诉 Angular Service Worker 在缓存当前版本的应用时获取每一个列出的资源。
  这是个带宽密集型的模式，但可以确保这些资源在被请求时可用，即使浏览器当前处于离线状态。

* `lazy` does not cache any of the resources up front. Instead, the Angular service worker only caches resources for which it receives requests. This is an on-demand caching mode. Resources that are never requested will not be cached. This is useful for things like images at different resolutions, so the service worker only caches the correct assets for the particular screen and orientation.

  `lazy` 不会预先缓存任何资源。 相反，Angular Service Worker 只会缓存它收到请求的资源。
  这是一种按需缓存模式。永远不会请求的资源也不会被缓存。
  这对于像针对不同分辨率的图片之类的东西很有用，那样 Service Worker 就只会为特定的屏幕和方向缓存正确的资源。

### `updateMode`

For resources already in the cache, the `updateMode` determines the caching behavior when a new version of the app is discovered. Any resources in the group that have changed since the previous version are updated in accordance with `updateMode`.

* `prefetch` tells the service worker to download and cache the changed resources immediately. 

* `lazy` tells the service worker to not cache those resources. Instead, it treats them as unrequested and waits until they're requested again before updating them. An `updateMode` of `lazy` is only valid if the `installMode` is also `lazy`.

### `resources`

This section describes the resources to cache, broken up into three groups.

* `files` lists patterns that match files in the distribution directory. These can be single files or glob-like patterns that match a number of files.

* `versionedFiles` is like `files` but should be used for build artifacts that already include a hash in the filename, which is used for cache busting. The Angular service worker can optimize some aspects of its operation if it can assume file contents are immutable.

* `urls` includes both URLs and URL patterns that will be matched at runtime. These resources are not fetched directly and do not have content hashes, but they will be cached according to their HTTP headers. This is most useful for CDNs such as the Google Fonts service.

## `dataGroups`

Unlike asset resources, data requests are not versioned along with the app. They're cached according to manually-configured policies that are more useful for situations such as API requests and other data dependencies.

Data groups follow this Typescript interface:

```typescript

export interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    strategy?: 'freshness' | 'performance';
  };
}

```

### `name`

Similar to `assetGroups`, every data group has a `name` which uniquely identifies it.

### `urls`

A list of URL patterns. URLs that match these patterns will be cached according to this data group's policy.

### `version`

Occasionally APIs change formats in a way that is not backward-compatible. A new version of the app may not be compatible with the old API format and thus may not be compatible with existing cached resources from that API.

`version` provides a mechanism to indicate that the resources being cached have been updated in a backwards-incompatible way, and that the old cache entries&mdash;those from previous versions&mdash;should be discarded. 

`version` is an integer field and defaults to `0`.

### `cacheConfig`

This section defines the policy by which matching requests will be cached.

#### `maxSize`

(required) The maximum number of entries, or responses, in the cache. Open-ended caches can grow in unbounded ways and eventually exceed storage quotas, calling for eviction.

#### `maxAge`

(required) The `maxAge` parameter indicates how long responses are allowed to remain in the cache before being considered invalid and evicted. `maxAge` is a duration string, using the following unit suffixes:

* `d`: days

* `h`: hours

* `m`: minutes

* `s`: seconds

* `u`: milliseconds

For example, the string `3d12h` will cache content for up to three and a half days.

#### `timeout`

This duration string specifies the network timeout. The network timeout is how long the Angular service worker will wait for the network to respond before using a cached response, if configured to do so.

#### `strategy`

The Angular service worker can use either of two caching strategies for data resources.

* `performance`, the default, optimizes for responses that are as fast as possible. If a resource exists in the cache, the cached version is used. This allows for some staleness, depending on the `maxAge`, in exchange for better performance. This is suitable for resources that don't change often; for example, user avatar images.

* `freshness` optimizes for currency of data, preferentially fetching requested data from the network. Only if the network times out, according to `timeout`, does the request fall back to the cache. This is useful for resources that change frequently; for example, account balances.
