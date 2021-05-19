# Router Reference

# 路由器参考手册

The following sections highlight some core router concepts.

下面的部分重点介绍了一些路由器的核心概念。

{@a basics-router-imports}

### Router imports

### 路由器导入

The Angular Router is an optional service that presents a particular component view for a given URL.
It is not part of the Angular core and thus is in its own library package, `@angular/router`.

Angular 的 Router 是一个可选服务，它为指定的 URL 提供特定的组件视图。它不是 Angular 核心的一部分，因此它位于自己的包 `@angular/router` 中。

Import what you need from it as you would from any other Angular package.

从任何其它的 Angular 包中导入你需要的东西。

<code-example path="router/src/app/app.module.1.ts" header="src/app/app.module.ts (import)" region="import-router"></code-example>

<div class="alert is-helpful">

For more on browser URL styles, see [`LocationStrategy` and browser URL styles](guide/router#browser-url-styles).

关于浏览器 URL 风格的更多信息，请参阅 [`LocationStrategy` 和浏览器 URL 风格](guide/router#browser-url-styles)。

</div>

{@a basics-config}

### Configuration

### 配置

A routed Angular application has one singleton instance of the `Router` service.
When the browser's URL changes, that router looks for a corresponding `Route` from which it can determine the component to display.

带路由的 Angular 应用中有一个 `Router` 服务的单例实例。当浏览器的 URL 发生变化时，该路由器会查找相应的 `Route`，以便根据它确定要显示的组件。

A router has no routes until you configure it.
The following example creates five route definitions, configures the router via the `RouterModule.forRoot()` method, and adds the result to the `AppModule`'s `imports` array.

在配置之前，路由器没有任何路由。下面的例子创建了五个路由定义，通过 `RouterModule.forRoot()` 方法配置路由器，并把结果添加到 `AppModule` 的 `imports` 数组中。

<code-example path="router/src/app/app.module.0.ts" header="src/app/app.module.ts (excerpt)"></code-example>

{@a example-config}

The `appRoutes` array of routes describes how to navigate.
Pass it to the `RouterModule.forRoot()` method in the module `imports` to configure the router.

`appRoutes` 路由数组描述了如何导航。把它传给模块的 `imports` 数组中的 `RouterModule.forRoot()` 方法来配置路由器。

Each `Route` maps a URL `path` to a component.
There are no leading slashes in the path.
The router parses and builds the final URL for you, which allows you to use both relative and absolute paths when navigating between application views.

每个 `Route` 都会把一个 URL `path` 映射到一个组件。路径中没有前导斜杠。路由器会为你解析并构建最终的 URL，这样你就可以在应用视图中导航时使用相对路径和绝对路径了。

The `:id` in the second route is a token for a route parameter.
In a URL such as `/hero/42`, "42" is the value of the `id` parameter.
The corresponding `HeroDetailComponent` uses that value to find and present the hero whose `id` is 42.

第二个路由中的 `:id` 是路由参数的令牌。在像 `/hero/42` 这样的 URL 中，“42”是 `id` 参数的值。相应的 `HeroDetailComponent` 用这个值来查找并显示 `id` 为 42 的英雄。

The `data` property in the third route is a place to store arbitrary data associated with
this specific route.
The data property is accessible within each activated route. Use it to store items such as page titles, breadcrumb text, and other read-only, static data.
You can use the [resolve guard](guide/router-tutorial-toh#resolve-guard) to retrieve dynamic data.

第三个路由中的 `data` 属性是存放与该特定路由关联的任意数据的地方。每个激活的路由都可以访问 `data` 属性。可以用它来存储页面标题，面包屑文本和其它只读静态数据等项目。你可以尝试使用[解析器守卫](guide/router-tutorial-toh#resolve-guard)来检索动态数据。

The empty path in the fourth route represents the default path for the application&mdash;the place to go when the path in the URL is empty, as it typically is at the start.
This default route redirects to the route for the `/heroes` URL and, therefore, displays the `HeroesListComponent`.

第四个路由中的空路径表示该应用的默认路径 - 当 URL 中的路径为空时通常要去的地方，就像它在刚进来时一样。这个默认路由重定向到了 `/heroes` 这个 URL 的路由，因此会显示 `HeroesListComponent`。

If you need to see what events are happening during the navigation lifecycle, there is the `enableTracing` option as part of the router's default configuration.
This outputs each router event that took place during each navigation lifecycle to the browser console.
Use `enableTracing` only for debugging purposes.
You set the `enableTracing: true` option in the object passed as the second argument to the `RouterModule.forRoot()` method.

如果你需要查看导航生命周期中发生了什么事件，可以把 `enableTracing` 选项作为路由器默认配置的一部分。这会把每个导航生命周期中发生的每个路由器事件都输出到浏览器控制台中。`enableTracing` 只会用于调试目的。你可以把 `enableTracing: true` 选项作为第二个参数传给 `RouterModule.forRoot()` 方法。

{@a basics-router-outlet}

### Router outlet

### 路由出口

The `RouterOutlet` is a directive from the router library that is used like a component.
It acts as a placeholder that marks the spot in the template where the router should
display the components for that outlet.

`RouterOutlet` 是一个来自路由器库的指令，虽然它的用法像组件一样。它充当占位符，用于在模板中标记出路由器应该显示把该组件显示在那个出口的位置。

<code-example language="html">
  &lt;router-outlet>&lt;/router-outlet>
  &lt;!-- Routed components go here -->

</code-example>

Given the configuration above, when the browser URL for this application becomes `/heroes`, the router matches that URL to the route path `/heroes` and displays the `HeroListComponent` as a sibling element to the `RouterOutlet` that you've placed in the host component's template.

对于上面的配置，当这个应用的浏览器 URL 变为 `/heroes` 时，路由器就会把这个 URL 与路由路径 `/heroes` 匹配，并把 `HeroListComponent` 作为兄弟元素显示在宿主组件模板中的 `RouterOutlet` 下方。

{@a basics-router-links}

{@a router-link}

### Router links

### 路由链接

To navigate as a result of some user action such as the click of an anchor tag, use `RouterLink`.

要想通过某些用户操作（比如单击一下 a 标签）进行导航，请使用 `RouterLink`。

Consider the following template:

考虑下面的模板：

<code-example path="router/src/app/app.component.1.html" header="src/app/app.component.html"></code-example>

The `RouterLink` directives on the anchor tags give the router control over those elements.
The navigation paths are fixed, so you can assign a string to the `routerLink` (a "one-time" binding).

a 标签上的 `RouterLink` 指令让路由器可以控制这些元素。导航路径是固定的，所以你可以给 `routerLink` 赋值一个字符串（“一次性”绑定）。

Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters; that is, the [link parameters array](guide/router#link-parameters-array).
The router resolves that array into a complete URL.

如果导航路径更加动态，你可以给它绑定到一个模板表达式，该表达式要返回一个[链接参数数组](guide/router#link-parameters-array)。路由器会把该数组解析成一个完整的 URL。

{@a router-link-active}

### Active router links

### 活动路由链路

The `RouterLinkActive` directive toggles CSS classes for active `RouterLink` bindings based on the current `RouterState`.

`RouterLinkActive` 指令会根据当前的 `RouterState` 切换活动 `RouterLink` 上所绑定的 CSS 类。

On each anchor tag, you see a [property binding](guide/property-binding) to the `RouterLinkActive` directive that looks like `routerLinkActive="..."`.

在每个 a 标签上，你会看到一个到 `RouterLinkActive` 指令的[属性绑定](guide/property-binding)，就像 `routerLinkActive="..."`。

The template expression to the right of the equal sign, `=`, contains a space-delimited string of CSS classes that the Router adds when this link is active (and removes when the link is inactive).
You set the `RouterLinkActive` directive to a string of classes such as `[routerLinkActive]="'active fluffy'"` or bind it to a component property that returns such a string.

等号 `=` 右侧的模板表达式，包含一个以空格分隔的 CSS 类字符串，当这个链接处于活动状态时，路由器就会加上这些字符串（并在非活动状态时删除）。你可以把 `RouterLinkActive` 指令设置成一串类的字符串，比如 `[routerLinkActive]="'active fluffy'"`，也可以把它绑定到一个返回这样一个字符串的组件属性上。

Active route links cascade down through each level of the route tree, so parent and child router links can be active at the same time.
To override this behavior, you can bind to the `[routerLinkActiveOptions]` input binding with the `{ exact: true }` expression. By using `{ exact: true }`, a given `RouterLink` will only be active if its URL is an exact match to the current URL.

活动路由链接会级联到路由树的每个级别，这样父路由和子路由链接就可以同时处于活动状态。要覆盖这种行为，你可以用 `{ exact: true }` 表达式绑定到 `[routerLinkActiveOptions]` 输入绑定。使用 `{ exact: true }` 之后，给定的 `RouterLink` 只有在 URL 与当前 URL 完全匹配时才会激活。

{@a basics-router-state}

### Router state

### 路由器状态

After the end of each successful navigation lifecycle, the router builds a tree of `ActivatedRoute` objects that make up the current state of the router. You can access the current `RouterState` from anywhere in the application using the `Router` service and the `routerState` property.

每个成功的导航生命周期结束后，路由器都会构建一个 `ActivatedRoute` 对象树，它构成了路由器的当前状态。你可以从任何地方使用应用的 `Router` 服务和 `routerState` 属性来访问当前的 `RouterState`。

Each `ActivatedRoute` in the `RouterState` provides methods to traverse up and down the route tree to get information from parent, child, and sibling routes.

`RouterState` 中的每个 `ActivatedRoute` 都提供了向上或向下遍历路由树的方法，用于从父路由、子路由和兄弟路由中获取信息。

{@a activated-route}

### Activated route

### 激活路由

The route path and parameters are available through an injected router service called the [ActivatedRoute](api/router/ActivatedRoute).
It has a great deal of useful information including:

路由的路径和参数可以通过注入名为 [ActivatedRoute](api/router/ActivatedRoute) 的路由服务获得。它提供了大量有用的信息，包括：

<table>
  <tr>
    <th>

      Property

      属性

    </th>

<th>

Description

说明

</th>

  </tr>

  <tr>
    <td>
      <code>url</code>
    </td>
    <td>

An `Observable` of the route path(s), represented as an array of strings for each part of the route path.

一个路由路径的 `Observable`，是一个由路由路径的各个部分组成的字符串数组。

</td>

  </tr>

  <tr>
    <td>
      <code>data</code>
    </td>
    <td>

An `Observable` that contains the `data` object provided for the route.
Also contains any resolved values from the [resolve guard](guide/router-tutorial-toh#resolve-guard).

包含提供给当前路由的 `data` 对象的 `Observable`。
也包含任何由[解析守卫](guide/router-tutorial-toh#resolve-guard)解析出的值。

</td>

  </tr>

  <tr>
    <td>
      <code>paramMap</code>
    </td>
    <td>

An `Observable` that contains a [map](api/router/ParamMap) of the required and [optional parameters](guide/router-tutorial-toh#optional-route-parameters) specific to the route.
The map supports retrieving single and multiple values from the same parameter.

一个包含该路由的必要参数和[可选参数](guide/router-tutorial-toh#optional-route-parameters) [map](api/router/ParamMap) 的 `Observable`。
这个 map 支持从同一个参数中获得单个或多个值。

</td>

  </tr>

  <tr>
    <td>
      <code>queryParamMap</code>
    </td>
    <td>

An `Observable` that contains a [map](api/router/ParamMap) of the [query parameters](guide/router-tutorial-toh#query-parameters) available to all routes.
The map supports retrieving single and multiple values from the query parameter.

一个包含适用于所有路由的[查询参数](guide/router-tutorial-toh#query-parameters) [map](api/router/ParamMap) 的 `Observable`。
这个 map 支持从同一个查询参数中获得单个或多个值。

</td>

  </tr>

  <tr>
    <td>
      <code>fragment</code>
    </td>
    <td>

An `Observable` of the URL [fragment](guide/router-tutorial-toh#fragment) available to all routes.

一个适用于所有路由的 URL [片段](guide/router-tutorial-toh#fragment)的 `Observable`。

</td>

  </tr>

  <tr>
    <td>
      <code>outlet</code>
    </td>
    <td>

The name of the `RouterOutlet` used to render the route.
For an unnamed outlet, the outlet name is primary.

用来渲染该路由的 `RouterOutlet` 的名字。
对于无名出口，这个出口的名字是 `primary`。

</td>

  </tr>

  <tr>
    <td>
      <code>routeConfig</code>
    </td>
    <td>

The route configuration used for the route that contains the origin path.

包含原始路径的那个路由的配置信息。

</td>

  </tr>

<tr>
<td>
  <code>parent</code>
</td>
<td>

The route's parent `ActivatedRoute` when this route is a [child route](guide/router-tutorial-toh#child-routing-component).

当该路由是[子路由](guide/router-tutorial-toh#child-routing-component)时，表示该路由的父级 `ActivatedRoute`。

</td>

  </tr>

  <tr>
    <td>
      <code>firstChild</code>
    </td>
    <td>

Contains the first `ActivatedRoute` in the list of this route's child routes.

包含该路由的子路由列表中的第一个 `ActivatedRoute`。

</td>

  </tr>

  <tr>
    <td>
      <code>children</code>
    </td>
    <td>

Contains all the [child routes](guide/router-tutorial-toh#child-routing-component) activated under the current route.

包含当前路由下所有激活的[子路由](guide/router-tutorial-toh#child-routing-component)。

</td>

  </tr>
</table>

<div class="alert is-helpful">

Two older properties are still available; however, their replacements are preferable as they may be deprecated in a future Angular version.

还有两个较旧的属性，但更推荐使用它们的替代品，因为它们可能会在以后的 Angular 版本中弃用。

* `params`: An `Observable` that contains the required and [optional parameters](guide/router-tutorial-toh#optional-route-parameters) specific to the route. Use `paramMap` instead.

  `params` ：一个 `Observable`，它包含专属于该路由的必要参数和[可选参数](guide/router-tutorial-toh#optional-route-parameters)。请改用 `paramMap`。

* `queryParams`: An `Observable` that contains the [query parameters](guide/router-tutorial-toh#query-parameters) available to all routes.
  Use `queryParamMap` instead.

  `queryParams`：一个包含可用于所有路由的[查询参数](guide/router-tutorial-toh#query-parameters)的 `Observable`。请改用 `queryParamMap`。

</div>

### Router events

### 路由器事件

During each navigation, the `Router` emits navigation events through the `Router.events` property.
These events range from when the navigation starts and ends to many points in between. The full list of navigation events is displayed in the table below.

`Router` 在每次导航过程中都会通过 `Router.events` 属性发出导航事件。这些事件的范围贯穿从导航开始和结束之间的多个时间点。导航事件的完整列表如下表所示。

<table>
  <tr>
    <th>

      Router Event

      路由事件

    </th>

<th>

Description

说明

</th>

  </tr>

  <tr>
    <td>
      <code>NavigationStart</code>
    </td>
    <td>

An [event](api/router/NavigationStart) triggered when navigation starts.

导航开始时触发的[事件](api/router/NavigationStart)。

</td>

  </tr>

  <tr>
    <td>
      <code>RouteConfigLoadStart</code>
    </td>
    <td>

An [event](api/router/RouteConfigLoadStart) triggered before the `Router`
[lazy loads](guide/router-tutorial-toh#asynchronous-routing) a route configuration.

在 `Router` [惰性加载](guide/router-tutorial-toh#asynchronous-routing)路由配置之前触发的[事件](api/router/RouteConfigLoadStart)。

</td>

  </tr>

  <tr>
    <td>
      <code>RouteConfigLoadEnd</code>
    </td>
    <td>

An [event](api/router/RouteConfigLoadEnd) triggered after a route has been lazy loaded.

在某个路由已经惰性加载完毕时触发的[事件](api/router/RouteConfigLoadEnd)。

</td>

  </tr>

  <tr>
    <td>
      <code>RoutesRecognized</code>
    </td>
    <td>

An [event](api/router/RoutesRecognized) triggered when the Router parses the URL and the routes are recognized.

当路由器解析了 URL，而且路由已经识别完毕时触发的[事件](api/router/RoutesRecognized)。

</td>

  </tr>

  <tr>
    <td>
      <code>GuardsCheckStart</code>
    </td>
    <td>

An [event](api/router/GuardsCheckStart) triggered when the Router begins the Guards phase of routing.

当路由器开始进入路由守卫阶段时触发的[事件](api/router/GuardsCheckStart)。

</td>

  </tr>

  <tr>
    <td>
      <code>ChildActivationStart</code>
    </td>
    <td>

An [event](api/router/ChildActivationStart) triggered when the Router begins activating a route's children.

当路由器开始激活某路由的子路由时触发的[事件](api/router/ChildActivationStart)。

</td>

  </tr>

  <tr>
    <td>
      <code>ActivationStart</code>
    </td>
    <td>

An [event](api/router/ActivationStart) triggered when the Router begins activating a route.

当路由器开始激活某个路由时触发的[事件](api/router/ActivationStart)。

</td>

  </tr>

  <tr>
    <td>
      <code>GuardsCheckEnd</code>
    </td>
    <td>

An [event](api/router/GuardsCheckEnd) triggered when the Router finishes the Guards phase of routing successfully.

当路由器成功结束了路由守卫阶段时触发的[事件](api/router/GuardsCheckEnd)。

</td>

  </tr>

  <tr>
    <td>
      <code>ResolveStart</code>
    </td>
    <td>

An [event](api/router/ResolveStart) triggered when the Router begins the Resolve phase of routing.

当路由器开始路由解析阶段时触发的[事件](api/router/ResolveStart)。

</td>

  </tr>

  <tr>
    <td>
      <code>ResolveEnd</code>
    </td>
    <td>

An [event](api/router/ResolveEnd) triggered when the Router finishes the Resolve phase of routing successfuly.

当路由器的路由解析阶段成功完成时触发的[事件](api/router/ResolveEnd)。

</td>

  </tr>

  <tr>
    <td>
      <code>ChildActivationEnd</code>
    </td>
    <td>

An [event](api/router/ChildActivationEnd) triggered when the Router finishes activating a route's children.

当路由器成功激活某路由的子路由时触发的[事件](api/router/ChildActivationEnd)。

</td>

  </tr>

  <tr>
    <td>
      <code>ActivationEnd</code>
    </td>
    <td>

An [event](api/router/ActivationEnd) triggered when the Router finishes activating a route.

当路由器成功停止激活某个路由时触发的[事件](api/router/ActivationEnd)。

</td>

  </tr>

  <tr>
    <td>
      <code>NavigationEnd</code>
    </td>
    <td>

An [event](api/router/NavigationEnd) triggered when navigation ends successfully.

当导航成功结束时触发的[事件](api/router/NavigationEnd)。

</td>

  </tr>

  <tr>
    <td>
      <code>NavigationCancel</code>
    </td>
    <td>

An [event](api/router/NavigationCancel) triggered when navigation is canceled.
This can happen when a [Route Guard](guide/router-tutorial-toh#guards) returns false during navigation,
or redirects by returning a `UrlTree`.

当导航被取消时触发的[事件](api/router/NavigationCancel)。
这可能在导航期间某个[路由守卫](guide/router-tutorial-toh#guards)返回了 false 或返回了 `UrlTree` 以进行重定向时发生。

</td>

  </tr>

  <tr>
    <td>
      <code>NavigationError</code>
    </td>
    <td>

An [event](api/router/NavigationError) triggered when navigation fails due to an unexpected error.

当导航由于非预期的错误而失败时触发的[事件](api/router/NavigationError)。

</td>

  </tr>

  <tr>
    <td>
      <code>Scroll</code>
    </td>
    <td>

An [event](api/router/Scroll) that represents a scrolling event.

用来表示滚动的[事件](api/router/Scroll)。

</td>

  </tr>
</table>

When you enable the `enableTracing` option, Angular logs these events to the console.
For an example of filtering router navigation events, see the [router section](guide/observables-in-angular#router) of the [Observables in Angular](guide/observables-in-angular) guide.

当启用了 `enableTracing` 选项时，Angular 会把这些事件都记录到控制台。关于筛选路由器导航事件的范例，请参阅 [Angular 中的 Observables](guide/observables-in-angular) 一章的[路由器部分](guide/observables-in-angular#router)。

### Router terminology

### 路由器术语

Here are the key `Router` terms and their meanings:

这里是一些关键的 `Router` 术语及其含义：

<table>

  <tr>

<th>

Router Part

路由器部件

</th>

<th>

Meaning

含义

</th>

  </tr>

  <tr>

<td>
  <code>Router</code>
</td>

<td>

Displays the application component for the active URL.
Manages navigation from one component to the next.

为活动 URL 显示应用中的组件。
管理从一个组件到另一个的导航。

</td>

  </tr>

  <tr>

<td>
  <code>RouterModule</code>
</td>

<td>

A separate NgModule that provides the necessary service providers
and directives for navigating through application views.

一个单独的 NgModule，它提供了一些必要的服务提供者和一些用于在应用视图间导航的指令。

</td>

  </tr>

  <tr>

<td>
  <code>Routes</code>
</td>

<td>

Defines an array of Routes, each mapping a URL path to a component.

定义一个路由数组，每一个条目都会把一个 URL 路径映射到组件。

</td>

  </tr>

  <tr>

<td>
  <code>Route</code>
</td>

<td>

Defines how the router should navigate to a component based on a URL pattern.
Most routes consist of a path and a component type.

定义路由器如何基于一个 URL 模式导航到某个组件。
大部分路由都由一个路径和一个组件类组成。

</td>

  </tr>

  <tr>

<td>
  <code>RouterOutlet</code>
</td>

<td>

The directive (<code>&lt;router-outlet></code>) that marks where the router displays a view.

该指令 (<code>&lt;router-outlet></code>) 用于指出路由器应该把视图显示在哪里。

</td>

  </tr>

  <tr>

<td>
  <code>RouterLink</code>
</td>

<td>

The directive for binding a clickable HTML element to a route. Clicking an element with a <code>routerLink</code> directive that is bound to a <i>string</i> or a <i>link parameters array</i> triggers a navigation.

用于将可点击的 HTML 元素绑定到某个路由的指令。单击带有 <code>routerLink</code> 指令且绑定到<i>字符串</i>或<i>链接参数数组</i>的元素，将触发导航。

</td>

  </tr>

  <tr>

<td>
  <code>RouterLinkActive</code>
</td>

<td>

The directive for adding/removing classes from an HTML element when an associated <code>routerLink</code> contained on or inside the element becomes active/inactive.

该指令会在元素上或元素内包含的相关 <code>routerLink</code> 处于活动/非活动状态时，从 HTML 元素上添加/移除类。

</td>

  </tr>

  <tr>

<td>
  <code>ActivatedRoute</code>
</td>

<td>

A service that is provided to each route component that contains route specific information such as route parameters, static data, resolve data, global query params, and the global fragment.

一个提供给每个路由组件的服务，其中包含当前路由专属的信息，例如路由参数、静态数据、解析数据、全局查询参数和全局片段。

</td>

  </tr>

  <tr>

<td>
  <code>RouterState</code>
</td>

<td>

The current state of the router including a tree of the currently activated routes together with convenience methods for traversing the route tree.

路由器的当前状态，包括一棵当前激活路由的树以及遍历这棵路由树的便捷方法。

</td>

  </tr>

  <tr>

<td>

<b><i>Link parameters array</i></b>

<b><i>链接参数数组</i></b>

</td>

<td>

An array that the router interprets as a routing instruction.
You can bind that array to a <code>RouterLink</code> or pass the array as an argument to the <code>Router.navigate</code> method.

一个由路由器将其解释为路由指南的数组。你可以将该数组绑定到 <code>RouterLink</code> 或将该数组作为参数传给 <code> Router.navigate</code> 方法。

</td>

  </tr>

  <tr>

<td>

<b><i>Routing component</i></b>

<b><i>路由组件</i></b>

</td>

<td>

An Angular component with a <code>RouterOutlet</code> that displays views based on router navigations.

一个带有 <code>RouterOutlet</code> 的 Angular 组件，可基于路由器的导航来显示视图。

</td>

  </tr>

</table>
