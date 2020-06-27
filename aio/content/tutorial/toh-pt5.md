# Add in-app navigation with routing

# 路由

There are new requirements for the Tour of Heroes app:

有一些《英雄指南》的新需求：

* Add a *Dashboard* view.

   添加一个*仪表盘*视图。

* Add the ability to navigate between the *Heroes* and *Dashboard* views.

   添加在*英雄列表*和*仪表盘*视图之间导航的能力。

* When users click a hero name in either view, navigate to a detail view of the selected hero.

   无论在哪个视图中点击一个英雄，都会导航到该英雄的详情页。

* When users click a *deep link* in an email, open the detail view for a particular hero.

   在邮件中点击一个*深链接*，会直接打开一个特定英雄的详情视图。

<div class="alert is-helpful">

  For the sample app that this page describes, see the <live-example></live-example>.

  要查看本页所讲的范例程序，参见<live-example></live-example>。

</div>

When you’re done, users will be able to navigate the app like this:

完成时，用户就能像这样在应用中导航：

<div class="lightbox">
  <img src='generated/images/guide/toh/nav-diagram.png' alt="View navigations">
</div>

## Add the `AppRoutingModule`

## 添加 `AppRoutingModule`

In Angular, the best practice is to load and configure the router in a separate, top-level module
that is dedicated to routing and imported by the root `AppModule`.

在 Angular 中，最好在一个独立的顶层模块中加载和配置路由器，它专注于路由功能，然后由根模块 `AppModule` 导入它。

By convention, the module class name is `AppRoutingModule` and it belongs in the `app-routing.module.ts` in the `src/app` folder.

按照惯例，这个模块类的名字叫做 `AppRoutingModule`，并且位于 `src/app` 下的 `app-routing.module.ts` 文件中。

Use the CLI to generate it.

使用 CLI 生成它。

<code-example language="sh" class="code-shell">
  ng generate module app-routing --flat --module=app
</code-example>

<div class="alert is-helpful">

`--flat` puts the file in `src/app` instead of its own folder.<br>
`--module=app` tells the CLI to register it in the `imports` array of the `AppModule`.

`--flat` 把这个文件放进了 `src/app` 中，而不是单独的目录中。<br>
`--module=app` 告诉 CLI 把它注册到 `AppModule` 的 `imports` 数组中。

</div>

The generated file looks like this:

生成的文件是这样的：

<code-example path="toh-pt5/src/app/app-routing.module.0.ts" header="src/app/app-routing.module.ts (generated)">
</code-example>

Replace it with the following:

把它替换为如下代码：

<code-example path="toh-pt5/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts (updated)">
</code-example>

First, `AppRoutingModule` imports `RouterModule` and `Routes` so the app can have routing functionality. The next import, `HeroesComponent`, will give the Router somewhere to go once you configure the routes.

首先，`AppRoutingModule` 会导入 `RouterModule` 和 `Routes`，以便该应用具有路由功能。配置好路由后，接着导入 `HeroesComponent`，它将告诉路由器要去什么地方。

Notice that the `CommonModule` references and `declarations` array are unnecessary, so are no
longer part of `AppRoutingModule`. The following sections explain the rest of the `AppRoutingModule` in more detail.

注意，对 `CommonModule` 的引用和 `declarations` 数组不是必要的，因此它们不再是 `AppRoutingModule` 的一部分。以下各节将详细介绍 `AppRoutingModule` 的其余部分。

### Routes

### 路由

The next part of the file is where you configure your routes.
*Routes* tell the Router which view to display when a user clicks a link or
pastes a URL into the browser address bar.

该文件的下一部分是你的路由配置。
*Routes* 告诉路由器，当用户单击链接或将 URL 粘贴进浏览器地址栏时要显示哪个视图。

Since `AppRoutingModule` already imports `HeroesComponent`, you can use it in the `routes` array:

由于 `AppRoutingModule` 已经导入了 `HeroesComponent`，因此你可以直接在 `routes` 数组中使用它：

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts"
  region="heroes-route">
</code-example>

A typical Angular `Route` has two properties:

典型的 Angular `Route` 具有两个属性：

* `path`: a string that matches the URL in the browser address bar.

  `path`: 用来匹配浏览器地址栏中 URL 的字符串。

* `component`: the component that the router should create when navigating to this route.

  `component`: 导航到该路由时，路由器应该创建的组件。

This tells the router to match that URL to `path: 'heroes'`
and display the `HeroesComponent` when the URL is something like `localhost:4200/heroes`.

这会告诉路由器把该 URL 与 `path：'heroes'` 匹配。
如果网址类似于 `localhost:4200/heroes` 就显示 `HeroesComponent`。

### `RouterModule.forRoot()`

The `@NgModule` metadata initializes the router and starts it listening for browser location changes.

`@NgModule` 元数据会初始化路由器，并开始监听浏览器地址的变化。

The following line adds the `RouterModule` to the `AppRoutingModule` `imports` array and
configures it with the `routes` in one step by calling
`RouterModule.forRoot()`:

下面的代码行将 `RouterModule` 添加到 `AppRoutingModule` 的 `imports` 数组中，同时通过调用 `RouterModule.forRoot()` 来用这些 `routes` 配置它：

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="ngmodule-imports">
</code-example>

<div class="alert is-helpful">

  The method is called `forRoot()` because you configure the router at the application's root level.
  The `forRoot()` method supplies the service providers and directives needed for routing,
  and performs the initial navigation based on the current browser URL.

  这个方法之所以叫 `forRoot()`，是因为你要在应用的顶层配置这个路由器。
  `forRoot()` 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航。

</div>

Next, `AppRoutingModule` exports `RouterModule` so it will be available throughout the app.

接下来，`AppRoutingModule` 导出 `RouterModule`，以便它在整个应用程序中生效。

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (exports array)" region="export-routermodule">
</code-example>

## Add `RouterOutlet`

## 添加路由出口 `RouterOutlet`

Open the `AppComponent` template and replace the `<app-heroes>` element with a `<router-outlet>` element.

打开 `AppComponent` 的模板，把 `<app-heroes>` 元素替换为 `<router-outlet>` 元素。

<code-example path="toh-pt5/src/app/app.component.html" region="outlet" header="src/app/app.component.html (router-outlet)">
</code-example>

The `AppComponent` template no longer needs `<app-heroes>` because the app will only display the `HeroesComponent` when the user navigates to it.

`AppComponent` 的模板不再需要 `<app-heroes>`，因为只有当用户导航到这里时，才需要显示 `HeroesComponent`。

The `<router-outlet>` tells the router where to display routed views.

`<router-outlet>` 会告诉路由器要在哪里显示路由的视图。

<div class="alert is-helpful">

The `RouterOutlet` is one of the router directives that became available to the `AppComponent`
because `AppModule` imports `AppRoutingModule` which exported `RouterModule`. The `ng generate` command you ran at the start of this tutorial added this import because of the `--module=app` flag. If you manually created `app-routing.module.ts` or used a tool other than the CLI to do so, you'll need to import `AppRoutingModule` into `app.module.ts` and add it to the `imports` array of the `NgModule`.

能在 `AppComponent` 中使用 `RouterOutlet`，是因为 `AppModule` 导入了 `AppRoutingModule`，而 `AppRoutingModule` 中导出了 `RouterModule`。
在本教程开始时你运行的那个 `ng generate` 命令添加了这个导入，是因为 `--module=app` 标志。如果你手动创建 `app-routing.module.ts` 或使用了 CLI 之外的工具，你就要把 `AppRoutingModule` 导入到 `app.module.ts` 中，并且把它添加到 `NgModule` 的 `imports` 数组中。

</div>

#### Try it

#### 试试看

You should still be running with this CLI command.

你的 CLI 命令应该仍在运行吧。

<code-example language="sh" class="code-shell">
  ng serve
</code-example>

The browser should refresh and display the app title but not the list of heroes.

浏览器应该刷新，并显示着应用的标题，但是没有显示英雄列表。

Look at the browser's address bar.
The URL ends in `/`.
The route path to `HeroesComponent` is `/heroes`.

看看浏览器的地址栏。
URL 是以 `/` 结尾的。
而到 `HeroesComponent` 的路由路径是 `/heroes`。

Append `/heroes` to the URL in the browser address bar.
You should see the familiar heroes master/detail view.

在地址栏中把 `/heroes` 追加到 URL 后面。你应该能看到熟悉的主从结构的英雄显示界面。

{@a routerlink}

## Add a navigation link (`routerLink`)

## 添加路由链接 (`routerLink`)

Ideally, users should be able to click a link to navigate rather
than pasting a route URL into the address bar.

理想情况下，用户应该能通过点击链接进行导航，而不用被迫把路由的 URL 粘贴到地址栏。

Add a `<nav>` element and, within that, an anchor element that, when clicked,
triggers navigation to the `HeroesComponent`.
The revised `AppComponent` template looks like this:

添加一个 `<nav>` 元素，并在其中放一个链接 `<a>` 元素，当点击它时，就会触发一个到 `HeroesComponent` 的导航。
修改过的 `AppComponent` 模板如下：

<code-example path="toh-pt5/src/app/app.component.html" region="heroes" header="src/app/app.component.html (heroes RouterLink)">
</code-example>

A [`routerLink` attribute](#routerlink) is set to `"/heroes"`,
the string that the router matches to the route to `HeroesComponent`.
The `routerLink` is the selector for the [`RouterLink` directive](/api/router/RouterLink)
that turns user clicks into router navigations.
It's another of the public directives in the `RouterModule`.

[`routerLink` 属性](#routerlink)的值为 `"/heroes"`，路由器会用它来匹配出指向 `HeroesComponent` 的路由。
`routerLink` 是 [`RouterLink` 指令](/api/router/RouterLink)的选择器，它会把用户的点击转换为路由器的导航操作。
它是 `RouterModule` 中的另一个公共指令。

The browser refreshes and displays the app title and heroes link,
but not the heroes list.

刷新浏览器，显示出了应用的标题和指向英雄列表的链接，但并没有显示英雄列表。

Click the link.
The address bar updates to `/heroes` and the list of heroes appears.

点击这个链接。地址栏变成了 `/heroes`，并且显示出了英雄列表。

<div class="alert is-helpful">

Make this and future navigation links look better by adding private CSS styles to `app.component.css`
as listed in the [final code review](#appcomponent) below.

从下面的 [最终代码](#appcomponent)中把私有 CSS 样式添加到 `app.component.css` 中，可以让导航链接变得更好看一点。

</div>

## Add a dashboard view

## 添加仪表盘视图

Routing makes more sense when there are multiple views.
So far there's only the heroes view.

当有多个视图时，路由会更有价值。不过目前还只有一个英雄列表视图。

Add a `DashboardComponent` using the CLI:

使用 CLI 添加一个 `DashboardComponent`：

<code-example language="sh" class="code-shell">
  ng generate component dashboard
</code-example>

The CLI generates the files for the `DashboardComponent` and declares it in `AppModule`.

CLI 生成了 `DashboardComponent` 的相关文件，并把它声明到 `AppModule` 中。

Replace the default file content in these three files as follows:

把这三个文件中的内容改成这样：

<code-tabs>
  <code-pane
    header="src/app/dashboard/dashboard.component.html" path="toh-pt5/src/app/dashboard/dashboard.component.1.html">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.ts" path="toh-pt5/src/app/dashboard/dashboard.component.ts">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.css" path="toh-pt5/src/app/dashboard/dashboard.component.css">
  </code-pane>
</code-tabs>

The  _template_ presents a grid of hero name links.

这个*模板*用来表示由英雄名字链接组成的一个阵列。

* The `*ngFor` repeater creates as many links as are in the component's `heroes` array.

   `*ngFor` 复写器为组件的 `heroes` 数组中的每个条目创建了一个链接。

* The links are styled as colored blocks by the `dashboard.component.css`.

   这些链接被 `dashboard.component.css` 中的样式格式化成了一些色块。

* The links don't go anywhere yet but [they will shortly](#hero-details).

   这些链接还没有指向任何地方，但[很快就会了](#hero-details)。

The _class_ is similar to the `HeroesComponent` class.

这个*类*和 `HeroesComponent` 类很像。

* It defines a `heroes` array property.

   它定义了一个 `heroes` 数组属性。

* The constructor expects Angular to inject the `HeroService` into a private `heroService` property.

   它的构造函数希望 Angular 把 `HeroService` 注入到私有的 `heroService` 属性中。

* The `ngOnInit()` lifecycle hook calls `getHeroes()`.

   在 `ngOnInit()` 生命周期钩子中调用 `getHeroes()`。

This `getHeroes()` returns the sliced list of heroes at positions 1 and 5, returning only four of the Top Heroes (2nd, 3rd, 4th, and 5th).

这个 `getHeroes()` 函数会截取第 2 到 第 5 位英雄，也就是说只返回四个顶层英雄（第二，第三，第四和第五）。

<code-example path="toh-pt5/src/app/dashboard/dashboard.component.ts" header="src/app/dashboard/dashboard.component.ts" region="getHeroes">
</code-example>

### Add the dashboard route

### 添加仪表盘路由

To navigate to the dashboard, the router needs an appropriate route.

要导航到仪表盘，路由器中就需要一个相应的路由。

Import the `DashboardComponent` in the `AppRoutingModule`.

把 `DashboardComponent` 导入到 `AppRoutingModule` 中。

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="import-dashboard" header="src/app/app-routing.module.ts (import DashboardComponent)">
</code-example>

Add a route to the `AppRoutingModule.routes` array that matches a path to the `DashboardComponent`.

把一个指向 `DashboardComponent` 的路由添加到 `AppRoutingModule.routes` 数组中。

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="dashboard-route">
</code-example>

### Add a default route

### 添加默认路由

When the app starts, the browser's address bar points to the web site's root.
That doesn't match any existing route so the router doesn't navigate anywhere.
The space below the `<router-outlet>` is blank.

当应用启动时，浏览器的地址栏指向了网站的根路径。
它没有匹配到任何现存路由，因此路由器也不会导航到任何地方。
`<router-outlet>` 下方是空白的。

To make the app navigate to the dashboard automatically, add the following
route to the `AppRoutingModule.Routes` array.

要让应用自动导航到这个仪表盘，请把下列路由添加到 `AppRoutingModule.Routes` 数组中。

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="redirect-route">
</code-example>

This route redirects a URL that fully matches the empty path to the route whose path is `'/dashboard'`.

这个路由会把一个与空路径“完全匹配”的 URL 重定向到路径为 `'/dashboard'` 的路由。

After the browser refreshes, the router loads the `DashboardComponent`
and the browser address bar shows the `/dashboard` URL.

浏览器刷新之后，路由器加载了 `DashboardComponent`，并且浏览器的地址栏会显示出 `/dashboard` 这个 URL。

### Add dashboard link to the shell

### 把仪表盘链接添加到壳组件中

The user should be able to navigate back and forth between the
`DashboardComponent` and the `HeroesComponent` by clicking links in the
navigation area near the top of the page.

应该允许用户通过点击页面顶部导航区的各个链接在 `DashboardComponent` 和 `HeroesComponent` 之间来回导航。

Add a dashboard navigation link to the `AppComponent` shell template, just above the *Heroes* link.

把仪表盘的导航链接添加到壳组件 `AppComponent` 的模板中，就放在 *Heroes* 链接的前面。

<code-example path="toh-pt5/src/app/app.component.html" header="src/app/app.component.html">
</code-example>

After the browser refreshes you can navigate freely between the two views by clicking the links.

刷新浏览器，你就能通过点击这些链接在这两个视图之间自由导航了。

{@a hero-details}

## Navigating to hero details

## 导航到英雄详情

The `HeroDetailsComponent` displays details of a selected hero.
At the moment the `HeroDetailsComponent` is only visible at the bottom of the `HeroesComponent`

`HeroDetailComponent` 可以显示所选英雄的详情。
此刻，`HeroDetailsComponent` 只能在 `HeroesComponent` 的底部看到。

The user should be able to get to these details in three ways.

用户应该能通过三种途径看到这些详情。

1. By clicking a hero in the dashboard.

   通过在仪表盘中点击某个英雄。

1. By clicking a hero in the heroes list.

   通过在英雄列表中点击某个英雄。

1. By pasting a "deep link" URL into the browser address bar that identifies the hero to display.

   通过把一个“深链接” URL 粘贴到浏览器的地址栏中来指定要显示的英雄。

In this section, you'll enable navigation to the `HeroDetailsComponent`
and liberate it from the `HeroesComponent`.

在这一节，你将能导航到 `HeroDetailComponent`，并把它从 `HeroesComponent` 中解放出来。

### Delete _hero details_ from `HeroesComponent`

### 从 `HeroesComponent` 中删除*英雄详情*

When the user clicks a hero item in the `HeroesComponent`,
the app should navigate to the `HeroDetailComponent`,
replacing the heroes list view with the hero detail view.
The heroes list view should no longer show hero details as it does now.

当用户在 `HeroesComponent` 中点击某个英雄条目时，应用应该能导航到 `HeroDetailComponent`，从英雄列表视图切换到英雄详情视图。
英雄列表视图将不再显示，而英雄详情视图要显示出来。

Open the `HeroesComponent` template (`heroes/heroes.component.html`) and
delete the `<app-hero-detail>` element from the bottom.

打开 `HeroesComponent` 的模板文件（`heroes/heroes.component.html`），并从底部删除 `<app-hero-detail>` 元素。

Clicking a hero item now does nothing.
You'll [fix that shortly](#heroes-component-links) after you enable routing to the `HeroDetailComponent`.

目前，点击某个英雄条目还没有反应。不过当你启用了到 `HeroDetailComponent` 的路由之后，[很快就能修复它](#heroes-component-links)。

### Add a _hero detail_ route

### 添加*英雄详情*视图

A URL like `~/detail/11` would be a good URL for navigating to the *Hero Detail* view of the hero whose `id` is `11`.

要导航到 `id` 为 `11` 的英雄的*详情*视图，类似于 `~/detail/11` 的 URL 将是一个不错的 URL。

Open `AppRoutingModule` and import `HeroDetailComponent`.

打开 `AppRoutingModule` 并导入 `HeroDetailComponent`。

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="import-herodetail" header="src/app/app-routing.module.ts (import HeroDetailComponent)">
</code-example>

Then add a _parameterized_ route to the `AppRoutingModule.routes` array that matches the path pattern to the _hero detail_ view.

然后把一个*参数化*路由添加到 `AppRoutingModule.routes` 数组中，它要匹配指向*英雄详情*视图的路径。

<code-example path="toh-pt5/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="detail-route">
</code-example>

The colon (:) in the `path` indicates that `:id` is a placeholder for a specific hero `id`.

`path` 中的冒号（`:`）表示 `:id` 是一个占位符，它表示某个特定英雄的 `id`。

At this point, all application routes are in place.

此刻，应用中的所有路由都就绪了。

<code-example path="toh-pt5/src/app/app-routing.module.ts" region="routes" header="src/app/app-routing.module.ts (all routes)">
</code-example>

### `DashboardComponent` hero links

### `DashboardComponent` 中的英雄链接

The `DashboardComponent` hero links do nothing at the moment.

此刻，`DashboardComponent` 中的英雄连接还没有反应。

Now that the router has a route to `HeroDetailComponent`,
fix the dashboard hero links to navigate via the _parameterized_ dashboard route.

路由器已经有一个指向 `HeroDetailComponent` 的路由了，
修改仪表盘中的英雄连接，让它们通过参数化的英雄详情路由进行导航。

<code-example
  path="toh-pt5/src/app/dashboard/dashboard.component.html"
  region="click"
  header="src/app/dashboard/dashboard.component.html (hero links)">
</code-example>

You're using Angular [interpolation binding](guide/template-syntax#interpolation) within the `*ngFor` repeater
to insert the current iteration's `hero.id` into each
[`routerLink`](#routerlink).

你正在 `*ngFor` 复写器中使用 Angular 的[插值绑定](guide/template-syntax#interpolation)来把当前迭代的 `hero.id` 插入到每个 [`routerLink`](#routerlink) 中。

{@a heroes-component-links}

### `HeroesComponent` hero links

### `HeroesComponent` 中的英雄链接

The hero items in the `HeroesComponent` are `<li>` elements whose click events
are bound to the component's `onSelect()` method.

`HeroesComponent` 中的这些英雄条目都是 `<li>` 元素，它们的点击事件都绑定到了组件的 `onSelect()` 方法中。

<code-example path="toh-pt4/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (list with onSelect)">
</code-example>

Strip the `<li>` back to just its `*ngFor`,
wrap the badge and name in an anchor element (`<a>`),
and add a `routerLink` attribute to the anchor that
is the same as in the dashboard template

清理 `<li>`，只保留它的 `*ngFor`，把徽章（`<badge>`）和名字包裹进一个 `<a>` 元素中，
并且像仪表盘的模板中那样为这个 `<a>` 元素添加一个 `routerLink` 属性。

<code-example path="toh-pt5/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (list with links)">
</code-example>

You'll have to fix the private stylesheet (`heroes.component.css`) to make
the list look as it did before.
Revised styles are in the [final code review](#heroescomponent) at the bottom of this guide.

你还要修改私有样式表（`heroes.component.css`），让列表恢复到以前的外观。
修改后的样式表参见本指南底部的[最终代码](#heroescomponent)。

#### Remove dead code (optional)

#### 移除死代码（可选）

While the `HeroesComponent` class still works,
the `onSelect()` method and `selectedHero` property are no longer used.

虽然 `HeroesComponent` 类仍然能正常工作，但 `onSelect()` 方法和 `selectedHero` 属性已经没用了。

It's nice to tidy up and you'll be grateful to yourself later.
Here's the class after pruning away the dead code.

最好清理掉它们，将来你会体会到这么做的好处。
下面是删除了死代码之后的类。

<code-example path="toh-pt5/src/app/heroes/heroes.component.ts" region="class" header="src/app/heroes/heroes.component.ts (cleaned up)">
</code-example>

## Routable `HeroDetailComponent`

## 支持路由的 `HeroDetailComponent`

Previously, the parent `HeroesComponent` set the `HeroDetailComponent.hero`
property and the `HeroDetailComponent` displayed the hero.

以前，父组件 `HeroesComponent` 会设置 `HeroDetailComponent.hero` 属性，然后 `HeroDetailComponent` 就会显示这个英雄。

`HeroesComponent` doesn't do that anymore.
Now the router creates the `HeroDetailComponent` in response to a URL such as `~/detail/11`.

`HeroesComponent` 已经不会再那么做了。
现在，当路由器会在响应形如 `~/detail/11` 的 URL 时创建 `HeroDetailComponent`。

The `HeroDetailComponent` needs a new way to obtain the hero-to-display.
This section explains the following:

`HeroDetailComponent` 需要从一种新的途径获取*要显示的英雄*。
本节会讲解如下操作：

* Get the route that created it

   获取创建本组件的路由

* Extract the `id` from the route

   从这个路由中提取出 `id`

* Acquire the hero with that `id` from the server via the `HeroService`

   通过 `HeroService` 从服务器上获取具有这个 `id` 的英雄数据。

Add the following imports:

先添加下列导入语句：

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" region="added-imports" header="src/app/hero-detail/hero-detail.component.ts">
</code-example>

{@a hero-detail-ctor}

Inject the `ActivatedRoute`, `HeroService`, and `Location` services
into the constructor, saving their values in private fields:

然后把 `ActivatedRoute`、`HeroService` 和 `Location` 服务注入到构造函数中，将它们的值保存到私有变量里：

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="ctor">
</code-example>

The [`ActivatedRoute`](api/router/ActivatedRoute) holds information about the route to this instance of the `HeroDetailComponent`.
This component is interested in the route's parameters extracted from the URL.
The "id" parameter is the `id` of the hero to display.

[`ActivatedRoute`](api/router/ActivatedRoute) 保存着到这个 `HeroDetailComponent` 实例的路由信息。
这个组件对从 URL 中提取的路由参数感兴趣。
其中的 `id` 参数就是要显示的英雄的 `id`。

The [`HeroService`](tutorial/toh-pt4) gets hero data from the remote server
and this component will use it to get the hero-to-display.

[`HeroService`](tutorial/toh-pt4) 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。

The [`location`](api/common/Location) is an Angular service for interacting with the browser.
You'll use it [later](#goback) to navigate back to the view that navigated here.

[`location`](api/common/Location) 是一个 Angular 的服务，用来与浏览器打交道。
[稍后](#goback)，你就会使用它来导航回上一个视图。

### Extract the `id` route parameter

### 从路由参数中提取 `id`

In the `ngOnInit()` [lifecycle hook](guide/lifecycle-hooks#oninit)
call `getHero()` and define it as follows.

在 `ngOnInit()` [生命周期钩子](guide/lifecycle-hooks#oninit)
中调用 `getHero()`，代码如下：

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="ngOnInit">
</code-example>

The `route.snapshot` is a static image of the route information shortly after the component was created.

`route.snapshot` 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。

The `paramMap` is a dictionary of route parameter values extracted from the URL.
The `"id"` key returns the `id` of the hero to fetch.

`paramMap` 是一个从 URL 中提取的路由参数值的字典。
`"id"` 对应的值就是要获取的英雄的 `id`。

Route parameters are always strings.
The JavaScript (+) operator converts the string to a number,
which is what a hero `id` should be.

路由参数总会是字符串。
JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 `id` 就是数字类型。

The browser refreshes and the app crashes with a compiler error.
`HeroService` doesn't have a `getHero()` method.
Add it now.

刷新浏览器，应用挂了。出现一个编译错误，因为 `HeroService` 没有一个名叫 `getHero()` 的方法。
这就添加它。

### Add `HeroService.getHero()`

### 添加 `HeroService.getHero()`

Open `HeroService` and add the following `getHero()` method with the `id` after the `getHeroes()` method:

添加 `HeroService`，并在 `getHeroes()` 后面添加如下的 `getHero()` 方法，它接收 `id` 参数：

<code-example path="toh-pt5/src/app/hero.service.ts" region="getHero" header="src/app/hero.service.ts (getHero)">
</code-example>

<div class="alert is-important">

Note the backticks ( &#96; ) that define a JavaScript
[_template literal_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for embedding the `id`.

注意，反引号 ( &#96; ) 用于定义 JavaScript 的 [模板字符串字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)，以便嵌入 `id`。

</div>

Like [`getHeroes()`](tutorial/toh-pt4#observable-heroservice),
`getHero()` has an asynchronous signature.
It returns a _mock hero_ as an `Observable`, using the RxJS `of()` function.

像 [`getHeroes()`](tutorial/toh-pt4#observable-heroservice) 一样，`getHero()` 也有一个异步函数签名。
它用 RxJS 的 `of()` 函数返回一个 `Observable` 形式的*模拟英雄数据*。

You'll be able to re-implement `getHero()` as a real `Http` request
without having to change the `HeroDetailComponent` that calls it.

你将来可以用一个真实的 `Http` 请求来重新实现 `getHero()`，而不用修改调用了它的 `HeroDetailComponent`。

#### Try it

#### 试试看

The browser refreshes and the app is working again.
You can click a hero in the dashboard or in the heroes list and navigate to that hero's detail view.

刷新浏览器，应用又恢复正常了。
你可以在仪表盘或英雄列表中点击一个英雄来导航到该英雄的详情视图。

If you paste `localhost:4200/detail/11` in the browser address bar,
the router navigates to the detail view for the hero with `id: 11`,  "Dr Nice".

如果你在浏览器的地址栏中粘贴了 `localhost:4200/detail/11`，路由器也会导航到 `id: 11` 的英雄（"Dr. Nice"）的详情视图。

{@a goback}

### Find the way back

### 回到原路

By clicking the browser's back button,
you can go back to the hero list or dashboard view,
depending upon which sent you to the detail view.

通过点击浏览器的后退按钮，你可以回到英雄列表或仪表盘视图，这取决于你从哪里进入的详情视图。

It would be nice to have a button on the `HeroDetail` view that can do that.

如果能在 `HeroDetail` 视图中也有这么一个按钮就更好了。

Add a *go back* button to the bottom of the component template and bind it
to the component's `goBack()` method.

把一个*后退*按钮添加到组件模板的底部，并且把它绑定到组件的 `goBack()` 方法。

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.html" region="back-button" header="src/app/hero-detail/hero-detail.component.html (back button)">
</code-example>

Add a `goBack()` _method_ to the component class that navigates backward one step
in the browser's history stack
using the `Location` service that you [injected previously](#hero-detail-ctor).

在组件类中添加一个 `goBack()` 方法，利用[你以前注入的](#hero-detail-ctor) `Location` 服务在浏览器的历史栈中后退一步。

<code-example path="toh-pt5/src/app/hero-detail/hero-detail.component.ts" region="goBack" header="src/app/hero-detail/hero-detail.component.ts (goBack)">

</code-example>

Refresh the browser and start clicking.
Users can navigate around the app, from the dashboard to hero details and back,
from heroes list to the mini detail to the hero details and back to the heroes again.

刷新浏览器，并开始点击。
用户能在应用中导航：从仪表盘到英雄详情再回来，从英雄列表到 mini 版英雄详情到英雄详情，再回到英雄列表。

## Final code review

## 查看最终代码

Here are the code files discussed on this page.

本页讨论的代码文件如下。

{@a approutingmodule}

{@a appmodule}

#### `AppRoutingModule`, `AppModule`, and `HeroService`

#### `AppRoutingModule`、`AppModule` 和 `HeroService`

<code-tabs>
  <code-pane
    header="src/app/app-routing.module.ts"
    path="toh-pt5/src/app/app-routing.module.ts">
  </code-pane>
  <code-pane
    header="src/app/app.module.ts"
    path="toh-pt5/src/app/app.module.ts">
  </code-pane>
  <code-pane
    header="src/app/hero.service.ts"
    path="toh-pt5/src/app/hero.service.ts">
  </code-pane>
</code-tabs>

{@a appcomponent}

#### `AppComponent`

<code-tabs>
  <code-pane
    header="src/app/app.component.html"
    path="toh-pt5/src/app/app.component.html">
  </code-pane>

  <code-pane
    header="src/app/app.component.css"
    path="toh-pt5/src/app/app.component.css">
  </code-pane>
</code-tabs>

{@a dashboardcomponent}

#### `DashboardComponent`

<code-tabs>
  <code-pane
    header="src/app/dashboard/dashboard.component.html" path="toh-pt5/src/app/dashboard/dashboard.component.html">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.ts" path="toh-pt5/src/app/dashboard/dashboard.component.ts">
  </code-pane>

  <code-pane
    header="src/app/dashboard/dashboard.component.css" path="toh-pt5/src/app/dashboard/dashboard.component.css">
  </code-pane>
</code-tabs>

{@a heroescomponent}

#### `HeroesComponent`

<code-tabs>
  <code-pane
    header="src/app/heroes/heroes.component.html" path="toh-pt5/src/app/heroes/heroes.component.html">
  </code-pane>

  <code-pane
    header="src/app/heroes/heroes.component.ts"
    path="toh-pt5/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane
    header="src/app/heroes/heroes.component.css"
    path="toh-pt5/src/app/heroes/heroes.component.css">
  </code-pane>
</code-tabs>

{@a herodetailcomponent}

#### `HeroDetailComponent`

<code-tabs>
  <code-pane
    header="src/app/hero-detail/hero-detail.component.html" path="toh-pt5/src/app/hero-detail/hero-detail.component.html">
  </code-pane>

  <code-pane
    header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt5/src/app/hero-detail/hero-detail.component.ts">
  </code-pane>

  <code-pane
    header="src/app/hero-detail/hero-detail.component.css" path="toh-pt5/src/app/hero-detail/hero-detail.component.css">
  </code-pane>
</code-tabs>

## Summary

## 小结

* You added the Angular router to navigate among different components.

   添加了 Angular *路由器*在各个不同组件之间导航。

* You turned the `AppComponent` into a navigation shell with `<a>` links and a `<router-outlet>`.

   你使用一些 `<a>` 链接和一个 `<router-outlet>` 把 `AppComponent` 转换成了一个导航用的壳组件。

* You configured the router in an `AppRoutingModule` 

   你在 `AppRoutingModule` 中配置了路由器。
* You defined simple routes, a redirect route, and a parameterized route.

   你定义了一些简单路由、一个重定向路由和一个参数化路由。

* You used the `routerLink` directive in anchor elements.

   你在 `<a>` 元素中使用了 `routerLink` 指令。

* You refactored a tightly-coupled master/detail view into a routed detail view.

   你把一个紧耦合的主从视图重构成了带路由的详情视图。

* You used router link parameters to navigate to the detail view of a user-selected hero.

   你使用路由链接参数来导航到所选英雄的详情视图。

* You shared the `HeroService` among multiple components.

   在多个组件之间共享了 `HeroService` 服务。
