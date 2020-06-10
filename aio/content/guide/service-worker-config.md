# Service worker configuration

# Service Worker 配置

#### Prerequisites

#### 前提条件

A basic understanding of the following:

对下列知识有基本的了解：

* [Service Worker in Production](guide/service-worker-devops).

   [生产环境下的 Service Worker](guide/service-worker-devops)。

<hr />

The `ngsw-config.json` configuration file specifies which files and data URLs the Angular service
worker should cache and how it should update the cached files and data. The [Angular CLI](cli)
processes the configuration file during `ng build --prod`. Manually, you can process it with the
`ngsw-config` tool (where `<project-name>` is the name of the project being built):

配置文件 `ngsw-config.json` 指定了 Angular Service Worker 应该缓存哪些文件和数据的 URL，以及如何更新缓存的文件和数据。
[Angular CLI](cli) 会在 `ng build --prod` 期间处理配置文件。
如果想手动处理，你可以使用 `ngsw-config` 工具（这里的 `<project-name>` 就是要构建的项目名）：

<code-example language="sh">
./node_modules/.bin/ngsw-config ./dist/&lt;project-name&gt; ./ngsw-config.json [/base/href]
</code-example>

The configuration file uses the JSON format. All file paths must begin with `/`, which corresponds
to the deployment directory&mdash;usually `dist/<project-name>` in CLI projects.

该配置文件使用 JSON 格式。
所有文件路径都必须以 `/` 开头，也就是相应的部署目录 —— 在 CLI 项目中的它通常是 `dist/<project-name>`。

{@a glob-patterns}

Unless otherwise noted, patterns use a limited glob format:

如无特别说明，这些模式都使用受限的 glob 格式：

* `**` matches 0 or more path segments.

   `**` 匹配 0 到多段路径。

* `*` matches 0 or more characters excluding `/`.

  `*` 匹配 0 个或更多个除 `/` 之外的字符。

* `?` matches exactly one character excluding `/`.

  `?` 匹配除 `/` 之外的一个字符。

* The `!` prefix marks the pattern as being negative, meaning that only files that don't match the pattern will be included.

   `!` 前缀表示该模式是反的，也就是说只包含与该模式不匹配的文件。

Example patterns:

范例模式：

* `/**/*.html` specifies all HTML files.

   `/**/*.html` 指定所有 HTML 文件。

* `/*.html` specifies only HTML files in the root.

   `/*.html` 仅指定根目录下的 HTML 文件。

* `!/**/*.map` exclude all sourcemaps.

   `!/**/*.map` 排除了所有源码映射文件。

Each section of the configuration file is described below.

下面讲讲配置文件中的每一节。

## `appData`

This section enables you to pass any data you want that describes this particular version of the app.
The `SwUpdate` service includes that data in the update notifications. Many apps use this section to provide additional information for the display of UI popups, notifying users of the available update.

本节允许你传递用来描述这个特定应用版本的任何数据。
`SwUpdate` 服务会在更新通知中包含这些数据。
许多应用会使用本节来提供 UI 弹窗时要显示的附加信息，以通知用户有可用的更新。

{@a index-file}

## `index`

Specifies the file that serves as the index page to satisfy navigation requests. Usually this is `/index.html`.

指定用来充当索引页的文件以满足导航请求。通常是 `/index.html`。

## `assetGroups`

*Assets* are resources that are part of the app version that update along with the app. They can include resources loaded from the page's origin as well as third-party resources loaded from CDNs and other external URLs. As not all such external URLs may be known at build time, URL patterns can be matched.

*资产（Assets）*是与应用一起更新的应用版本的一部分。
它们可以包含从页面的同源地址加载的资源以及从 CDN 和其它外部 URL 加载的第三方资源。
由于在构建时可能没法提前知道所有这些外部 URL，因此也可以指定 URL 的模式。

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
此策略用来决定何时获取资源以及当检测到更改时该怎么做。

Asset groups follow the Typescript interface shown here:

这些资产组会遵循下面的 Typescript 接口：

```typescript

interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: {
    files?: string[];
    urls?: string[];
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}

```

### `name`

A `name` is mandatory. It identifies this particular group of assets between versions of the configuration.

`name` 是强制性的。它用来标识该配置文件版本中这个特定的资产组。

### `installMode`

The `installMode` determines how these resources are initially cached. The `installMode` can be either of two values:

`installMode` 决定了这些资源最初的缓存方式。`installMode` 可以取如下两个值之一：

* `prefetch` tells the Angular service worker to fetch every single listed resource while it's caching the current version of the app. This is bandwidth-intensive but ensures resources are available whenever they're requested, even if the browser is currently offline.

   `prefetch` 告诉 Angular Service Worker 在缓存当前版本的应用时要获取每一个列出的资源。
  这是个带宽密集型的模式，但可以确保这些资源在请求时可用，即使浏览器正处于离线状态。

* `lazy` does not cache any of the resources up front. Instead, the Angular service worker only caches resources for which it receives requests. This is an on-demand caching mode. Resources that are never requested will not be cached. This is useful for things like images at different resolutions, so the service worker only caches the correct assets for the particular screen and orientation.

   `lazy` 不会预先缓存任何资源。相反，Angular Service Worker 只会缓存它收到请求的资源。
  这是一种按需缓存模式。永远不会请求的资源也永远不会被缓存。
  这对于像为不同分辨率提供的图片之类的资源很有用，那样 Service Worker 就只会为特定的屏幕和设备方向缓存正确的资源。

Defaults to `prefetch`.

默认为 `prefetch`。

### `updateMode`

For resources already in the cache, the `updateMode` determines the caching behavior when a new version of the app is discovered. Any resources in the group that have changed since the previous version are updated in accordance with `updateMode`.

对于已经存在于缓存中的资源，`updateMode` 会决定在发现了新版本应用后的缓存行为。
自上一版本以来更改过的所有组中资源都会根据 `updateMode` 进行更新。

* `prefetch` tells the service worker to download and cache the changed resources immediately.

   `prefetch` 会告诉 Service Worker 立即下载并缓存更新过的资源。

* `lazy` tells the service worker to not cache those resources. Instead, it treats them as unrequested and waits until they're requested again before updating them. An `updateMode` of `lazy` is only valid if the `installMode` is also `lazy`.

   `lazy` 告诉 Service Worker 不要缓存这些资源，而是先把它们看作未被请求的，等到它们再次被请求时才进行更新。
  `lazy` 这个 `updateMode` 只有在 `installMode` 也同样是 `lazy` 时才有效。

Defaults to the value `installMode` is set to.

其默认值为 `installMode` 的值。

### `resources`

This section describes the resources to cache, broken up into the following groups:

本节描述要缓存的资源，分为如下几组：

* `files` lists patterns that match files in the distribution directory. These can be single files or glob-like patterns that match a number of files.

   `files` 列出了与 `dist` 目录中的文件相匹配的模式。它们可以是单个文件也可以是能匹配多个文件的类似 glob 的模式。

* `urls` includes both URLs and URL patterns that will be matched at runtime. These resources are not fetched directly and do not have content hashes, but they will be cached according to their HTTP headers. This is most useful for CDNs such as the Google Fonts service.<br>
  _(Negative glob patterns are not supported and `?` will be matched literally; i.e. it will not match any character other than `?`.)_

   `urls` 包括要在运行时进行匹配的 URL 和 URL 模式。
  这些资源不是直接获取的，也没有内容散列，但它们会根据 HTTP 标头进行缓存。
  这对于像 Google Fonts 服务这样的 CDN 非常有用。<br>
  **（不支持 glob 的逆模式，`?` 将会按字面匹配；也就是说它不会匹配除了 `?` 之外的任何字符。）**

### `cacheQueryOptions`

These options are used to modify the matching behavior of requests. They are passed to the browsers `Cache#match` function. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match) for details. Currently, only the following options are supported:

这些选项用来修改对请求进行匹配的行为。它们会传给浏览器的 `Cache#match` 函数。详情参见 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)。目前，只支持下列选项：

* `ignoreSearch`: Ignore query parameters. Defaults to `false`.

  `ignoreSearch`: 忽略查询参数。默认为 `false`。

## `dataGroups`

Unlike asset resources, data requests are not versioned along with the app. They're cached according to manually-configured policies that are more useful for situations such as API requests and other data dependencies.

与这些资产性（asset）资源不同，数据请求不会随应用一起版本化。
它们会根据手动配置的策略进行缓存，这些策略对 API 请求和所依赖的其它数据等情况会更有用。

Data groups follow this Typescript interface:

数据组遵循下列 TypeScript 接口：

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
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}

```

### `name`

Similar to `assetGroups`, every data group has a `name` which uniquely identifies it.

和 `assetGroups` 下类似，每个数据组也都有一个 `name`，用作它的唯一标识。

### `urls`

A list of URL patterns. URLs that match these patterns are cached according to this data group's policy. Only non-mutating requests (GET and HEAD) are cached.

一个 URL 模式的列表。匹配这些模式的 URL 将会根据该数据组的策略进行缓存。只有非修改型的请求（GET 和 HEAD）才会进行缓存。

 * Negative glob patterns are not supported.
 
   （不支持 glob 中的否定模式）。
 
 * `?` is matched literally; that is, it matches *only* the character `?`.

   `?` 只做字面匹配，也就是说，它*只*能匹配 `?` 字符。

### `version`

Occasionally APIs change formats in a way that is not backward-compatible. A new version of the app may not be compatible with the old API format and thus may not be compatible with existing cached resources from that API.

API 有时可能会以不向后兼容的方式更改格式。
新版本的应用可能与旧的 API 格式不兼容，因此也就与该 API 中目前已缓存的资源不兼容。

`version` provides a mechanism to indicate that the resources being cached have been updated in a backwards-incompatible way, and that the old cache entries&mdash;those from previous versions&mdash;should be discarded.

`version` 提供了一种机制，用于指出这些被缓存的资源已经通过不向后兼容的方式进行了更新，并且旧的缓存条目（即来自以前版本的缓存条目）应该被丢弃。

`version` is an integer field and defaults to `1`.

`version` 是个整型字段，默认为 `0`。

### `cacheConfig`

This section defines the policy by which matching requests will be cached.

本节定义了对匹配上的请求进行缓存时的策略。

#### `maxSize`

(required) The maximum number of entries, or responses, in the cache. Open-ended caches can grow in unbounded ways and eventually exceed storage quotas, calling for eviction.

（必需）缓存的最大条目数或响应数。开放式缓存可以无限增长，并最终超过存储配额，建议适时清理。

#### `maxAge`

(required) The `maxAge` parameter indicates how long responses are allowed to remain in the cache before being considered invalid and evicted. `maxAge` is a duration string, using the following unit suffixes:

（必需）`maxAge` 参数表示在响应因失效而要清除之前允许在缓存中留存的时间。`maxAge` 是一个表示持续时间的字符串，可使用以下单位作为后缀：

* `d`: days

   `d`：天数

* `h`: hours

   `h`：小时数

* `m`: minutes

   `m`：分钟数

* `s`: seconds

   `s`：秒数

* `u`: milliseconds

   `u`：微秒数

For example, the string `3d12h` will cache content for up to three and a half days.

比如，字符串 `3d12h` 规定此内容最多缓存三天半。

#### `timeout`

This duration string specifies the network timeout. The network timeout is how long the Angular service worker will wait for the network to respond before using a cached response, if configured to do so. `timeout` is a duration string, using the following unit suffixes:

这个表示持续时间的字符串用于指定网络超时时间。
如果配置了网络超时时间，Angular Service Worker 就会先等待这么长时间再使用缓存。`timeout` 是一个表示持续时间的字符串，使用下列后缀单位：

* `d`: days

  `d`：天

* `h`: hours

  `h`：小时

* `m`: minutes

  `m`：分钟

* `s`: seconds

  `s`：秒

* `u`: milliseconds

  `u`：毫秒

For example, the string `5s30u` will translate to five seconds and 30 milliseconds of network timeout.

比如，字符串 `5s30u` 将会被翻译成 5 秒零 30 毫秒的网络超时。

#### `strategy`

The Angular service worker can use either of two caching strategies for data resources.

Angular Service Worker 可以使用两种缓存策略之一来获取数据资源。

* `performance`, the default, optimizes for responses that are as fast as possible. If a resource exists in the cache, the cached version is used, and no network request is made. This allows for some staleness, depending on the `maxAge`, in exchange for better performance. This is suitable for resources that don't change often; for example, user avatar images.

   `performance`，默认值，为尽快给出响应而优化。如果缓存中存在某个资源，则使用这个缓存版本，而不再发起网络请求。
  它允许资源有一定的陈旧性（取决于 `maxAge`）以换取更好的性能。适用于那些不经常改变的资源，例如用户头像。

* `freshness` optimizes for currency of data, preferentially fetching requested data from the network. Only if the network times out, according to `timeout`, does the request fall back to the cache. This is useful for resources that change frequently; for example, account balances.

   `freshness` 为数据的即时性而优化，优先从网络获取请求的数据。只有当网络超时时，请求才会根据 `timeout` 的设置回退到缓存中。这对于那些频繁变化的资源很有用，例如账户余额。

### `cacheQueryOptions`

See [assetGroups](#assetgroups) for details.

详情参见 [assetGroups](#assetgroups)。

## `navigationUrls`

This optional section enables you to specify a custom list of URLs that will be redirected to the index file.

这个可选节让你可以指定一个自定义的 URL 列表，它们都会被重定向到索引文件。

### Handling navigation requests

### 处理导航请求

The ServiceWorker will redirect navigation requests that don't match any `asset` or `data` group to the specified [index file](#index-file). A request is considered to be a navigation request if:

对于没有匹配上任何 `asset` 或 `data` 组的导航请求，ServiceWorker 会把它们重定向到指定的[索引文件](#index-file)。下列请求将会视为导航请求：

1. Its [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) is `navigation`.

   它的[模式](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)是 `navigation`。

2. It accepts a `text/html` response (as determined by the value of the `Accept` header).

   它接受 `text/html` 响应（根据 `Accept` 头的值决定）。

3. Its URL matches certain criteria (see below).

   它的 URL 符合特定的条件（稍后讲）。

By default, these criteria are:

默认情况下，这些条件是：

1. The URL must not contain a file extension (i.e. a `.`) in the last path segment.

   URL 的最后一段路径中不能包含文件扩展名（比如 `.`）。

2. The URL must not contain `__`.

   URL 中不能包含 `__`。

### Matching navigation request URLs

### 匹配导航请求的 URL

While these default criteria are fine in most cases, it is sometimes desirable to configure different rules. For example, you may want to ignore specific routes (that are not part of the Angular app) and pass them through to the server.

虽然这些默认条件在大多数情况下都挺好用，不过有时还是要配置一些不同的规则。比如，你可能希望忽略一些特定的路由（它们可能不是 Angular 应用的一部分），而是把它们透传给服务器。

This field contains an array of URLs and [glob-like](#glob-patterns) URL patterns that will be matched at runtime. It can contain both negative patterns (i.e. patterns starting with `!`) and non-negative patterns and URLs.

该字段包含一个将要在运行期间匹配的 URL 和 [类似 glob 的](#glob-patterns) URL 模式。
它既可以包含正向模式也可以包含反向模式（比如用 `!` 开头的模式）。

Only requests whose URLs match _any_ of the non-negative URLs/patterns and _none_ of the negative ones will be considered navigation requests. The URL query will be ignored when matching.

只有那些能匹配**任意**正向 URL 或 URL 模式并且**不匹配任何一个**反向模式的 URL 才会视为导航请求。当匹配时，这些 URL 查询将会被忽略。

If the field is omitted, it defaults to:

如果省略了该字段，它的默认值是：

```ts

[
  '/**',           // Include all URLs.
  '!/**/*.*',      // Exclude URLs to files.
  '!/**/*__*',     // Exclude URLs containing `__` in the last segment.
  '!/**/*__*/**',  // Exclude URLs containing `__` in any other segment.
]

```
