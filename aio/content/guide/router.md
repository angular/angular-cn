# In-app navigation: routing to views

# 应用内导航：路由到视图

In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page.
As users perform application tasks, they need to move between the different [views](guide/glossary#view "Definition of view") that you have defined.
To implement this kind of navigation within the single page of your app, you use the Angular **`Router`**.

在单页面应用中，你可以通过显示或隐藏特定组件的显示部分来改变用户能看到的内容，而不用去服务器获取新页面。当用户执行应用任务时，他们要在你预定义的不同[视图](guide/glossary#view "视图的定义")之间移动。要想在应用的单个页面中实现这种导航，你可以使用 Angular 的**`Router`**（路由器）。

To handle the navigation from one [view](guide/glossary#view) to the next, you use the Angular _router_.
The router enables navigation by interpreting a browser URL as an instruction to change the view.

为了处理从一个[视图](guide/glossary#view)到下一个视图之间的导航，你可以使用 Angular 的*路由器*。路由器会把浏览器 URL 解释成改变视图的操作指南，以完成导航。

To explore a sample app featuring the router's primary features, see the <live-example></live-example>.

要探索一个具备路由器主要功能的示例应用，请参见<live-example></live-example>。

## Prerequisites

## 先决条件

Before creating a route, you should be familiar with the following:

在创建路由之前，你应该熟悉以下内容：

* [Basics of components](guide/architecture-components)

  [组件的基础知识](guide/architecture-components)

* [Basics of templates](guide/glossary#template)

  [模板的基础知识](guide/glossary#template)

* An Angular app&mdash;you can generate a basic Angular app using the [Angular CLI](cli).

  一个 Angular 应用，你可以使用 [Angular CLI](cli) 生成一个基本的 Angular 应用。

For an introduction to Angular with a ready-made app, see [Getting Started](start).
For a more in-depth experience of building an Angular app, see the [Tour of Heroes](tutorial) tutorial. Both guide you through using component classes and templates.

有关这个现成应用的 Angular 简介，请参见[快速上手](start)。有关构建 Angular 应用的更深入体验，请参见[英雄指南](tutorial)教程。两者都会指导你使用组件类和模板。

<hr />

{@a basics}

## Generate an app with routing enabled

## 生成一个支持路由的应用

The following command uses the Angular CLI to generate a basic Angular app with an app routing module, called `AppRoutingModule`, which is an NgModule where you can configure your routes.
The app name in the following example is `routing-app`.

下面的命令会用 Angular CLI 来生成一个带有应用路由模块（`AppRoutingModule`）的基本 Angular 应用，它是一个 NgModule，可用来配置路由。下面的例子中应用的名字是 `routing-app`。

<code-example language="none" class="code-shell">
  ng new routing-app --routing
</code-example>

When generating a new app, the CLI prompts you to select CSS or a CSS preprocessor.
For this example, accept the default of `CSS`.

一旦生成新应用，CLI 就会提示你选择 CSS 或 CSS 预处理器。在这个例子中，我们接受 `CSS` 的默认值。

### Adding components for routing

### 为路由添加组件

To use the Angular router, an app needs to have at least two components so that it can navigate from one to the other. To create a component using the CLI, enter the following at the command line where `first` is the name of your component:

为了使用 Angular 的路由器，应用至少要有两个组件才能从一个导航到另一个。要使用 CLI 创建组件，请在命令行输入以下内容，其中 `first` 是组件的名称：

<code-example language="none" class="code-shell">
  ng generate component first
</code-example>

Repeat this step for a second component but give it a different name.
Here, the new name is `second`.

为第二个组件重复这个步骤，但给它一个不同的名字。这里的新名字是 `second`。

<code-example language="none" class="code-shell">
  ng generate component second
</code-example>

The CLI automatically appends `Component`, so if you were to write `first-component`, your component would be `FirstComponentComponent`.

CLI 会自动添加 `Component` 后缀，所以如果在编写 `first-component`，那么其组件名就是 `FirstComponentComponent`。

{@a basics-base-href}

<div class="alert is-helpful">

#### `<base href>`

  This guide works with a CLI-generated Angular app.
  If you are working manually, make sure that you have `<base href="/">` in the `<head>` of your index.html file.
  This assumes that the `app` folder is the application root, and uses `"/"`.

  本指南适用于 CLI 生成的 Angular 应用。如果你是手动工作的，请确保你的 index.html 文件的 `<head>` 中有 `<base href="/">` 语句。这里假定 `app` 文件夹是应用的根目录，并使用 `"/"` 作为基础路径。

</div>

### Importing your new components

### 导入这些新组件

To use your new components, import them into `AppRoutingModule` at the top of the file, as follows:

要使用这些新组件，请把它们导入到该文件顶部的 `AppRoutingModule` 中，具体如下：

<code-example header="AppRoutingModule (excerpt)">

import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

</code-example>

{@a basic-route}

## Defining a basic route

## 定义一个基本路由

There are three fundamental building blocks to creating a route.

创建路由有三个基本的构建块。

Import the `AppRoutingModule` into `AppModule` and add it to the `imports` array.

把 `AppRoutingModule` 导入 `AppModule` 并把它添加到 `imports` 数组中。

The Angular CLI performs this step for you.
However, if you are creating an app manually or working with an existing, non-CLI app, verify that the imports and configuration are correct.
The following is the default `AppModule` using the CLI with the `--routing` flag.

Angular CLI 会为你执行这一步骤。但是，如果要手动创建应用或使用现存的非 CLI 应用，请验证导入和配置是否正确。下面是使用 `--routing` 标志生成的默认 `AppModule`。

<code-example path="router/src/app/app.module.8.ts" header="Default CLI AppModule with routing">

  </code-example>

1. Import `RouterModule` and `Routes` into your routing module.

   把 `RouterModule` 和 `Routes` 导入到你的路由模块中。

   The Angular CLI performs this step automatically.
   The CLI also sets up a `Routes` array for your routes and configures the `imports` and `exports` arrays for `@NgModule()`.

   Angular CLI 会自动执行这一步骤。CLI 还为你的路由设置了 `Routes` 数组，并为 `@NgModule()` 配置了 `imports` 和 `exports` 数组。

   <code-example path="router/src/app/app-routing.module.7.ts" header="CLI app routing module">

   </code-example>

1. Define your routes in your `Routes` array.

   在 `Routes` 数组中定义你的路由。

   Each route in this array is a JavaScript object that contains two properties.
   The first property, `path`, defines the URL path for the route.
   The second property, `component`, defines the component Angular should use for the corresponding path.

   这个数组中的每个路由都是一个包含两个属性的 JavaScript 对象。第一个属性 `path` 定义了该路由的 URL 路径。第二个属性 `component` 定义了要让 Angular 用作相应路径的组件。

<code-example path="router/src/app/app-routing.module.8.ts" region="routes" header="AppRoutingModule (excerpt)">

   </code-example>

1. Add your routes to your application.

   把这些路由添加到你的应用中。

   Now that you have defined your routes, you can add them to your application.
   First, add links to the two components.
   Assign the anchor tag that you want to add the route to the `routerLink` attribute.
   Set the value of the attribute to the component to show when a user clicks on each link.
   Next, update your component template to include `<router-outlet>`.
   This element informs Angular to update the application view with the component for the selected route.

   现在你已经定义了路由，可以把它们添加到应用中了。首先，添加到这两个组件的链接。把要添加路由的链接赋值给 `routerLink` 属性。将属性的值设置为该组件，以便在用户点击各个链接时显示这个值。接下来，修改组件模板以包含 `<router-outlet>` 标签。该元素会通知 Angular，你可以用所选路由的组件更新应用的视图。

   <code-example path="router/src/app/app.component.7.html" header="Template with routerLink and router-outlet"></code-example>

{@a route-order}

### Route order

### 路由顺序

The order of routes is important because the `Router` uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes.
List routes with a static path first, followed by an empty path route, which matches the default route.
The [wildcard route](guide/router#setting-up-wildcard-routes) comes last because it matches every URL and the `Router`  selects it only if no other routes match first.

路由的顺序很重要，因为 `Router` 在匹配路由时使用“先到先得”策略，所以应该在不那么具体的路由前面放置更具体的路由。首先列出静态路径的路由，然后是一个与默认路由匹配的空路径路由。[通配符路由](guide/router#setting-up-wildcard-routes)是最后一个，因为它匹配每一个 URL，只有当其它路由都没有匹配时，`Router` 才会选择它。

{@a activated-route}

## Getting route information

## 获取路由信息

Often, as a user navigates your application, you want to pass information from one component to another.
For example, consider an application that displays a shopping list of grocery items.
Each item in the list has a unique `id`.
To edit an item, users click an Edit button, which opens an `EditGroceryItem` component.
You want that component to retrieve the `id` for the grocery item so it can display the right information to the user.

通常，当用户导航你的应用时，你会希望把信息从一个组件传递到另一个组件。例如，考虑一个显示杂货商品购物清单的应用。列表中的每一项都有一个唯一的 `id`。要想编辑某个项目，用户需要单击“编辑”按钮，打开一个 `EditGroceryItem` 组件。你希望该组件得到该商品的 `id`，以便它能向用户显示正确的信息。

You can use a route to pass this type of information to your application components.
To do so, you use the [ActivatedRoute](api/router/ActivatedRoute) interface.

你也可以使用一个路由把这种类型的信息传给你的应用组件。要做到这一点，你可以使用 [ActivatedRoute](api/router/ActivatedRoute) 接口。

To get information from a route:

要从路由中获取信息：

1. Import `ActivatedRoute` and `ParamMap` to your component.

   把 `ActivatedRoute` 和 `ParamMap` 导入你的组件。

   <code-example path="router/src/app/heroes/hero-detail/hero-detail.component.ts" region="imports-route-info" header="In the component class (excerpt)">
   </code-example>

   These `import` statements add several important elements that your component needs.
   To learn more about each, see the following API pages:

   这些 `import` 语句添加了组件所需的几个重要元素。要详细了解每个 API，请参阅以下 API 页面：

   * [`Router`](api/router)
   * [`ActivatedRoute`](api/router/ActivatedRoute)
   * [`ParamMap`](api/router/ParamMap)

1. Inject an instance of `ActivatedRoute` by adding it to your application's constructor:

   通过把 `ActivatedRoute` 的一个实例添加到你的应用的构造函数中来注入它：

   <code-example path="router/src/app/heroes/hero-detail/hero-detail.component.ts" region="activated-route" header="In the component class (excerpt)">
   </code-example>

1. Update the `ngOnInit()` method to access the `ActivatedRoute` and track the `id` parameter:

   更新 `ngOnInit()` 方法来访问这个 `ActivatedRoute` 并跟踪 `id` 参数：

     <code-example header="In the component (excerpt)">
       ngOnInit() {
         this.route.queryParams.subscribe(params => {
           this.name = params['name'];
         });
       }
     </code-example>

   Note: The preceding example uses a variable, `name`, and assigns it the value based on the `name` parameter.

   注意：前面的例子使用了一个变量 `name`，并根据 `name` 参数给它赋值。

{@a wildcard-route-how-to}

## Setting up wildcard routes

## 设置通配符路由

A well-functioning application should gracefully handle when users attempt to navigate to a part of your application that does not exist.
To add this functionality to your application, you set up a wildcard route.
The Angular router selects this route any time the requested URL doesn't match any router paths.

当用户试图导航到那些不存在的应用部件时，在正常的应用中应该能得到很好的处理。要在应用中添加此功能，需要设置通配符路由。当所请求的 URL 与任何路由器路径都不匹配时，Angular 路由器就会选择这个路由。

To set up a wildcard route, add the following code to your `routes` definition.

要设置通配符路由，请在 `routes` 定义中添加以下代码。

<code-example header="AppRoutingModule (excerpt)">

{ path: '**', component: <component-name> }

</code-example>

The two asterisks, `**`, indicate to Angular that this `routes` definition is a wildcard route.
For the component property, you can define any component in your application.
Common choices include an application-specific `PageNotFoundComponent`, which you can define to [display a 404 page](guide/router#404-page-how-to) to your users; or a redirect to your application's main component.
A wildcard route is the last route because it matches any URL.
For more detail on why order matters for routes, see [Route order](guide/router#route-order).

这两个星号 `**` 告诉 Angular，这个 `routes` 定义是通配符路由。对于 component 属性，你可以使用应用中的任何组件。常见的选择包括应用专属的 `PageNotFoundComponent`，你可以定义它来向用户[展示 404 页面](guide/router#404-page-how-to)，或者跳转到应用的主组件。通配符路由是最后一个路由，因为它匹配所有的 URL。有关路由顺序的更多详细信息，请参阅[路由顺序](guide/router#route-order)。

{@a 404-page-how-to}

## Displaying a 404 page

## 显示 404 页面

To display a 404 page, set up a [wildcard route](guide/router#wildcard-route-how-to) with the `component` property set to the component you'd like to use for your 404 page as follows:

要显示 404 页面，请设置一个[通配符路由](guide/router#wildcard-route-how-to)，并将 `component` 属性设置为你要用于 404 页面的组件，如下所示：

<code-example path="router/src/app/app-routing.module.8.ts" region="routes-with-wildcard" header="AppRoutingModule (excerpt)">

</code-example>

The last route with the `path` of `**` is a wildcard route.
The router selects this route if the requested URL doesn't match any of the paths earlier in the list and sends the user to the `PageNotFoundComponent`.

`path` 为 `**` 的最后一条路由是通配符路由。如果请求的 URL 与前面列出的路径不匹配，路由器会选择这个路由，并把该用户送到 `PageNotFoundComponent`。

## Setting up redirects

## 设置重定向

To set up a redirect, configure a route with the `path` you want to redirect from, the `component` you want to redirect to, and a `pathMatch` value that tells the router how to match the URL.

要设置重定向，请使用重定向源的 `path`、要重定向目标的 `component` 和一个 `pathMatch` 值来配置路由，以告诉路由器该如何匹配 URL。

<code-example path="router/src/app/app-routing.module.8.ts" region="redirect" header="AppRoutingModule (excerpt)">

</code-example>

In this example, the third route is a redirect so that the router defaults to the `first-component` route.
Notice that this redirect precedes the wildcard route.
Here, `path: ''` means to use the initial relative URL (`''`).

在这个例子中，第三个路由是重定向路由，所以路由器会默认跳到 `first-component` 路由。注意，这个重定向路由位于通配符路由之前。这里的 `path: ''` 表示使用初始的相对 URL（ `''` ）。

For more details on `pathMatch` see [Spotlight on `pathMatch`](guide/router#pathmatch).

有关 `pathMatch` 的详情，请参阅[聚焦 `pathMatch`](guide/router#pathmatch)部分。

{@a nesting-routes}

## Nesting routes

## 嵌套路由

As your application grows more complex, you may want to create routes that are relative to a component other than your root component.
These types of nested routes are called child routes.
This means you're adding a second `<router-outlet>` to your app, because it is in addition to the `<router-outlet>` in `AppComponent`.

随着你的应用变得越来越复杂，你可能要创建一些根组件之外的相对路由。这些嵌套路由类型称为子路由。这意味着你要为你的应用添加第二 `<router-outlet>`，因为它是 `AppComponent` 之外的另一个 `<router-outlet>`。

In this example, there are two additional child components, `child-a`, and `child-b`.
Here, `FirstComponent` has its own `<nav>` and a second `<router-outlet>` in addition to the one in `AppComponent`.

在这个例子中，还有两个子组件，`child-a` 和 `child-b`。这里的 `FirstComponent` 有它自己的 `<nav>` 和 `AppComponent` 之外的第二 `<router-outlet>`。

<code-example path="router/src/app/app.component.8.html" region="child-routes" header="In the template">

</code-example>

A child route is like any other route, in that it needs both a `path` and a `component`.
The one difference is that you place child routes in a `children` array within the parent route.

子路由和其它路由一样，同时需要 `path` 和 `component`。唯一的区别是你要把子路由放在父路由的 `children` 数组中。

<code-example path="router/src/app/app-routing.module.9.ts" region="child-routes" header="AppRoutingModule (excerpt)">

</code-example>

{@a using-relative-paths}

## Using relative paths

## 使用相对路径

Relative paths allow you to define paths that are relative to the current URL segment.
The following example shows a relative route to another component, `second-component`.
`FirstComponent` and `SecondComponent` are at the same level in the tree, however, the link to `SecondComponent` is situated within the `FirstComponent`, meaning that the router has to go up a level and then into the second directory to find the `SecondComponent`.
Rather than writing out the whole path to get to `SecondComponent`, you can use the `../` notation to go up a level.

相对路径允许你定义相对于当前 URL 段的路径。下面的例子展示了到另一个组件 `second-component` 的相对路由。`FirstComponent` 和 `SecondComponent` 在树中处于同一级别，但是，指向 `SecondComponent` 的链接位于 `FirstComponent` 中，这意味着路由器必须先上升一个级别，然后进入二级目录才能找到 `SecondComponent`。你可以使用 `../` 符号来上升一个级别，而不用写出到 `SecondComponent` 的完整路径。

<code-example path="router/src/app/app.component.8.html" region="relative-route" header="In the template">

</code-example>

In addition to `../`, you can use `./` or no leading slash to specify the current level.

除了 `../`，还可以使用 `./` 或者不带前导斜杠来指定当前级别。

### Specifying a relative route

### 指定相对路由

To specify a relative route, use the `NavigationExtras` `relativeTo` property.
In the component class, import `NavigationExtras` from the `@angular/router`.

要指定相对路由，请使用 `NavigationExtras` 中的 `relativeTo` 属性。在组件类中，从 `@angular/router` 导入 `NavigationExtras`。

Then use `relativeTo` in your navigation method.
After the link parameters array, which here contains `items`, add an object with the `relativeTo` property set to the `ActivatedRoute`, which is `this.route`.

然后在导航方法中使用 `relativeTo` 参数。在链接参数数组（它包含 `items`）之后添加一个对象，把该对象的 `relativeTo` 属性设置为当前的 `ActivatedRoute`，也就是 `this.route`。

<code-example path="router/src/app/app.component.4.ts" region="relative-to" header="RelativeTo">

The `navigate()` arguments configure the router to use the current route as a basis upon which to append `items`.

`navigate()` 的参数使用当前路由作为基准来配置路由器，然后在这个基准路由后追加 `items`。

</code-example>

The `goToItems()` method interprets the destination URI as relative to the activated route and navigates to the `items` route.

`goToItems()` 方法会把目标 URI 解释为相对于当前路由的，并导航到 `items` 路由。

## Accessing query parameters and fragments

## 访问查询参数和片段

Sometimes, a feature of your application requires accessing a part of a route, such as a query parameter or a fragment. The Tour of Heroes app at this stage in the tutorial uses a list view in which you can click on a hero to see details. The router uses an `id` to show the correct hero's details.

有时，应用中的某个特性需要访问路由的部件，比如查询参数或片段（fragment）。本教程的这个阶段使用了一个“英雄指南”中的列表视图，你可以在其中点击一个英雄来查看详情。路由器使用 `id` 来显示正确的英雄的详情。

First, import the following members in the component you want to navigate from.

首先，在要导航的组件中导入以下成员。

<code-example header="Component import statements (excerpt)">

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

</code-example>

Next inject the activated route service:

接下来，注入当前路由（ActivatedRoute）服务：

<code-example header="Component (excerpt)">
constructor(private route: ActivatedRoute) {}
</code-example>

Configure the class so that you have an observable, `heroes$`, a `selectedId` to hold the `id` number of the hero, and the heroes in the `ngOnInit()`, add the following code to get the `id` of the selected hero.
This code snippet assumes that you have a heroes list, a hero service, a function to get your heroes, and the HTML to render your list and details, just as in the Tour of Heroes example.

配置这个类，让你有一个可观察对象 `heroes$`、一个用来保存英雄的 `id` 号的 `selectedId`，以及 `ngOnInit()` 中的英雄们，添加下面的代码来获取所选英雄的 `id`。这个代码片段假设你有一个英雄列表、一个英雄服务、一个能获取你的英雄的函数，以及用来渲染你的列表和细节的 HTML，就像在《英雄指南》例子中一样。

<code-example header="Component 1 (excerpt)">

heroes$: Observable<Hero[]>;
selectedId: number;
heroes = HEROES;

ngOnInit() {
  this.heroes$ = this.route.paramMap.pipe(
    switchMap(params => {
      this.selectedId = Number(params.get('id'));
      return this.service.getHeroes();
    })
  );
}

</code-example>

Next, in the component that you want to navigate to, import the following members.

接下来，在要导航到的组件中，导入以下成员。

<code-example header="Component 2 (excerpt)">

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

</code-example>

Inject `ActivatedRoute` and `Router` in the constructor of the component class so they are available to this component:

在组件类的构造函数中注入 `ActivatedRoute` 和 `Router`，这样在这个组件中就可以用它们了：

<code-example header="Component 2 (excerpt)">

  item$: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.service.getHero(id);
  }

  gotoItems(item: Item) {
    let heroId = item ? hero.id : null;
    // Pass along the item id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/heroes', { id: itemId }]);
  }

</code-example>

{@a lazy-loading}

## Lazy loading

## 惰性加载

You can configure your routes to lazy load modules, which means that Angular only loads modules as needed, rather than loading all modules when the app launches.
Additionally, you can preload parts of your app in the background to improve the user experience.

你可以配置路由定义来实现惰性加载模块，这意味着 Angular 只会在需要时才加载这些模块，而不是在应用启动时就加载全部。
另外，你可以在后台预加载一些应用部件来改善用户体验。

For more information on lazy loading and preloading see the dedicated guide [Lazy loading NgModules](guide/lazy-loading-ngmodules).

关于惰性加载和预加载的详情，请参见专门的指南[惰性加载 NgModule](guide/lazy-loading-ngmodules)。

## Preventing unauthorized access

## 防止未经授权的访问

Use route guards to prevent users from navigating to parts of an app without authorization.
The following route guards are available in Angular:

使用路由守卫来防止用户未经授权就导航到应用的某些部分。Angular 中提供了以下路由守卫：

* [`CanActivate`](api/router/CanActivate)
* [`CanActivateChild`](api/router/CanActivateChild)
* [`CanDeactivate`](api/router/CanDeactivate)
* [`Resolve`](api/router/Resolve)
* [`CanLoad`](api/router/CanLoad)

To use route guards, consider using component-less routes as this facilitates guarding child routes.

要想使用路由守卫，可以考虑使用无组件路由，因为这对于保护子路由很方便。

Create a service for your guard:

为你的守卫创建一项服务：

<code-example language="none" class="code-shell">
  ng generate guard your-guard
</code-example>

In your guard class, implement the guard you want to use.
The following example uses `CanActivate` to guard the route.

请在守卫类里实现你要用到的守卫。下面的例子使用 `CanActivate` 来保护该路由。

<code-example header="Component (excerpt)">
export class YourGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // your  logic goes here
  }
}
</code-example>

In your routing module, use the appropriate property in your `routes` configuration.
Here, `canActivate` tells the router to mediate navigation to this particular route.

在路由模块中，在 `routes` 配置中使用相应的属性。这里的 `canActivate` 会告诉路由器它要协调到这个特定路由的导航。

<code-example header="Routing module (excerpt)">
{
  path: '/your-path',
  component: YourComponent,
  canActivate: [YourGuard],
}
</code-example>

For more information with a working example, see the [routing tutorial section on route guards](guide/router#milestone-5-route-guards).

关于这个可运行示例的更多信息，请参阅[路由教程中的路由守卫部分](guide/router#milestone-5-route-guards)。

{@a router-tutorial}

## Router tutorial: tour of heroes

## 路由器教程：英雄指南

While the [Getting Started: Tour of Heroes](tutorial) tutorial introduces general Angular concepts, this [Router Tutorial](guide/router#getting-started) goes into greater detail regarding Angular's routing capabilities.
This tutorial guides you through building upon basic router configuration to create child routes, read route parameters, lazy load NgModules, guard routes, and preload data to improve the user experience.

虽然[“快速上手：英雄指南”](tutorial)教程介绍了 Angular 中的一般概念，而本篇 [“路由器教程”](guide/router#getting-started)详细介绍了 Angular 的路由能力。本教程将指导你在基本的路由器配置之上，创建子路由、读取路由参数、惰性加载 NgModules、路由守卫，和预加载数据，以改善用户体验。

{@a router-tutorial-overview}

### Router tutorial overview

### 路由器教程概览

This guide describes development of a multi-page routed sample application.
Along the way, it highlights key features of the router such as:

本章要讲的是如何开发一个带路由的多页面应用。
接下来会重点讲解了路由的关键特性，比如：

* Organizing the application features into modules.

   把应用的各个特性组织成模块。

* Navigating to a component (_Heroes_ link to "Heroes List").

   导航到组件（_Heroes_ 链接到“英雄列表”组件）。

* Including a route parameter (passing the Hero `id` while routing to the "Hero Detail").

   包含一个路由参数（当路由到“英雄详情”时，把该英雄的 `id` 传进去）。

* Child routes (the _Crisis Center_ has its own routes).

   子路由（*危机中心*特性有一组自己的路由）。

* The `CanActivate` guard (checking route access).

   `CanActivate` 守卫（检查路由的访问权限）。

* The `CanActivateChild` guard (checking child route access).

   `CanActivateChild` 守卫（检查子路由的访问权限）。

* The `CanDeactivate` guard (ask permission to discard unsaved changes).

   `CanDeactivate` 守卫（询问是否丢弃未保存的更改）。

* The `Resolve` guard (pre-fetching route data).

   `Resolve` 守卫（预先获取路由数据）。

* Lazy loading an `NgModule`.

   惰性加载一个模块。

* The `CanLoad` guard (check before loading feature module assets).

   `CanLoad` 守卫（在加载特性模块之前进行检查）。

This guide proceeds as a sequence of milestones as if you were building the app step-by-step, but assumes you are familiar with basic [Angular concepts](guide/architecture).
For a general introduction to angular, see the [Getting Started](start). For a more in-depth overview, see the [Tour of Heroes](tutorial) tutorial.

就像你正逐步构建应用一样，本指南设置了一系列里程碑。不过这里假设你已经熟悉了 [Angular 的基本概念](guide/architecture)。有关 Angular 的一般性介绍，参见[“快速上手”](start)。有关更深入的概述，请参阅[“英雄指南”](tutorial)教程。

For a working example of the final version of the app, see the <live-example></live-example>.

有关该应用最终版本的可工作范例，请参阅<live-example></live-example>。

### The sample application in action

### 范例程序实战

The sample application for this tutorial helps the Hero Employment Agency find crises for heroes to solve.

本教程的示例应用会帮助“英雄职业管理局”找到需要英雄来解决的危机。

The application has three main feature areas:

本应用具有三个主要的特性区：

1. A *Crisis Center* for maintaining the list of crises for assignment to heroes.

   *危机中心*用于维护要指派给英雄的危机列表。

1. A *Heroes* area for maintaining the list of heroes employed by the agency.

   *英雄*区用于维护管理局雇佣的英雄列表。

1. An *Admin* area to manage the list of crises and heroes.

   *管理*区会管理危机和英雄的列表。

Try it by clicking on this <live-example title="Hero Employment Agency Live Example">live example link</live-example>.

点击<live-example title="英雄职介中心的现场演练"></live-example>试用一下。

The app renders with a row of navigation buttons and the *Heroes* view with its list of heroes.

该应用会渲染出一排导航按钮和和一个*英雄列表*视图。

<div class="lightbox">
  <img src='generated/images/guide/router/hero-list.png' alt="Hero List">
</div>

Select one hero and the app takes you to a hero editing screen.

选择其中之一，该应用就会把你带到此英雄的编辑页面。

<div class="lightbox">
  <img src='generated/images/guide/router/hero-detail.png' alt="Crisis Center Detail">
</div>

Alter the name.
Click the "Back" button and the app returns to the heroes list which displays the changed hero name.
Notice that the name change took effect immediately.

修改完名字，再点击“后退”按钮，应用又回到了英雄列表页，其中显示的英雄名已经变了。注意，对名字的修改会立即生效。

Had you clicked the browser's back button instead of the app's "Back" button, the app would have returned you to the heroes list as well.
Angular app navigation updates the browser history as normal web navigation does.

另外你也可以点击浏览器本身的后退按钮（而不是应用中的 “Back” 按钮），这也同样会回到英雄列表页。
在 Angular 应用中导航也会和标准的 Web 导航一样更新浏览器中的历史。

Now click the *Crisis Center* link for a list of ongoing crises.

现在，点击*危机中心*链接，前往*危机*列表页。

<div class="lightbox">
  <img src='generated/images/guide/router/crisis-center-list.png' alt="Crisis Center List">
</div>

Select a crisis and the application takes you to a crisis editing screen.
The _Crisis Detail_ appears in a child component on the same page, beneath the list.

选择其中之一，该应用就会把你带到此危机的编辑页面。
*危机详情*是当前页的子组件，就在列表的紧下方。

Alter the name of a crisis.
Notice that the corresponding name in the crisis list does _not_ change.

修改危机的名称。
注意，危机列表中的相应名称**并没有**修改。

<div class="lightbox">
  <img src='generated/images/guide/router/crisis-center-detail.png' alt="Crisis Center Detail">
</div>

Unlike *Hero Detail*, which updates as you type, *Crisis Detail* changes are temporary until you either save or discard them by pressing the "Save" or "Cancel" buttons.
Both buttons navigate back to the *Crisis Center* and its list of crises.

这和*英雄详情*页略有不同。*英雄详情*会立即保存你所做的更改。
而*危机详情*页中，你的更改都是临时的 —— 除非按“保存”按钮保存它们，或者按“取消”按钮放弃它们。
这两个按钮都会导航回*危机中心*，显示危机列表。

Click the browser back button or the "Heroes" link to activate a dialog.

单击浏览器后退按钮或 “Heroes” 链接，可以激活一个对话框。

<div class="lightbox">
  <img src='generated/images/guide/router/confirm-dialog.png' alt="Confirm Dialog">
</div>

You can say "OK" and lose your changes or click "Cancel" and continue editing.

你可以回答“确定”以放弃这些更改，或者回答“取消”来继续编辑。

Behind this behavior is the router's `CanDeactivate` guard.
The guard gives you a chance to clean-up or ask the user's permission before navigating away from the current view.

这种行为的幕后是路由器的 `CanDeactivate` 守卫。
该守卫让你有机会进行清理工作或在离开当前视图之前请求用户的许可。

The `Admin` and `Login` buttons illustrate other router capabilities covered later in the guide.

`Admin` 和 `Login` 按钮用于演示路由器的其它能力，本章稍后的部分会讲解它们。

{@a getting-started}

## Milestone 1: Getting started

## 里程碑 1：起步

Begin with a basic version of the app that navigates between two empty views.

开始本应用的一个简版，它在两个空路由之间导航。

<div class="lightbox">
  <img src='generated/images/guide/router/router-1-anim.gif' alt="App in action">
</div>

{@a import}

Generate a sample application with the Angular CLI.

用 Angular CLI 生成一个范例应用。

<code-example language="none" class="code-shell">
  ng new angular-router-sample
</code-example>

### Define Routes

### 定义路由

A router must be configured with a list of route definitions.

路由器必须用“路由定义”的列表进行配置。

Each definition translates to a [Route](api/router/Route) object which has two things: a `path`, the URL path segment for this route; and a `component`, the component associated with this route.

每个定义都被翻译成了一个[Route](api/router/Route)对象。该对象有一个 `path` 字段，表示该路由中的 URL 路径部分，和一个 `component` 字段，表示与该路由相关联的组件。

The router draws upon its registry of definitions when the browser URL changes or when application code tells the router to navigate along a route path.

当浏览器的 URL 变化时或在代码中告诉路由器导航到一个路径时，路由器就会翻出它用来保存这些路由定义的注册表。

The first route does the following:

第一个路由执行以下操作：

* When the browser's location URL changes to match the path segment `/crisis-center`, then the router activates an instance of the `CrisisListComponent` and displays its view.

   当浏览器地址栏的 URL 变化时，如果它匹配上了路径部分 `/crisis-center`，路由器就会激活一个 `CrisisListComponent` 的实例，并显示它的视图。

* When the application requests navigation to the path `/crisis-center`, the router activates an instance of `CrisisListComponent`, displays its view, and updates the browser's address location and history with the URL for that path.

   当应用程序请求导航到路径 `/crisis-center` 时，路由器激活一个 `CrisisListComponent` 的实例，显示它的视图，并将该路径更新到浏览器地址栏和历史。

The first configuration defines an array of two routes with minimal paths leading to the `CrisisListComponent` and `HeroListComponent`.

第一个配置定义了由两个路由构成的数组，它们用最短路径指向了 `CrisisListComponent` 和 `HeroListComponent`。

Generate the `CrisisList` and `HeroList` components so that the router has something to render.

生成 `CrisisList` 和 `HeroList` 组件，以便路由器能够渲染它们。

<code-example language="none" class="code-shell">
  ng generate component crisis-list
</code-example>

<code-example language="none" class="code-shell">
  ng generate component hero-list
</code-example>

Replace the contents of each component with the sample HTML below.

把每个组件的内容都替换成下列范例 HTML。

<code-tabs>

  <code-pane header="src/app/crisis-list/crisis-list.component.html" path="router/src/app/crisis-list/crisis-list.component.1.html">

  </code-pane>

  <code-pane header="src/app/hero-list/hero-list.component.html" path="router/src/app/hero-list/hero-list.component.1.html" region="template">

  </code-pane>

</code-tabs>

### Register `Router` and `Routes`

### 注册 `Router` 和 `Routes`

In order to use the `Router`, you must first register the `RouterModule` from the `@angular/router` package.
Define an array of routes, `appRoutes`, and pass them to the `RouterModule.forRoot()` method.
The `RouterModule.forRoot()` method returns a module that containa the configured `Router` service provider, plus other providers that the routing library requires.
Once the application is bootstrapped, the `Router` performs the initial navigation based on the current browser URL.

为了使用 `Router`，你必须注册来自 `@angular/router` 包中的 `RouterModule`。定义一个路由数组 `appRoutes`，并把它传给 `RouterModule.forRoot()` 方法。`RouterModule.forRoot()` 方法会返回一个模块，其中包含配置好的 `Router` 服务提供者，以及路由库所需的其它提供者。一旦启动了应用，`Router` 就会根据当前的浏览器 URL 进行首次导航。

<div class="alert is-important">

  **Note:** The `RouterModule.forRoot()` method is a pattern used to register application-wide providers. Read more about application-wide providers in the [Singleton services](guide/singleton-services#forRoot-router) guide.

  **注意：** `RouterModule.forRoot()` 方法是用于注册全应用级提供者的编码模式。要详细了解全应用级提供者，参见[单例服务](guide/singleton-services#forRoot-router) 一章。

</div>

<code-example path="router/src/app/app.module.1.ts" header="src/app/app.module.ts (first-config)" region="first-config"></code-example>

<div class="alert is-helpful">

Adding the configured `RouterModule` to the `AppModule` is sufficient for minimal route configurations.
However, as the application grows, [refactor the routing configuration](#refactor-the-routing-configuration-into-a-routing-module) into a separate file and create a [Routing Module](#routing-module).
A routing module is a special type of `Service Module` dedicated to routing.

对于最小化的路由配置，把配置好的 `RouterModule` 添加到 `AppModule` 中就足够了。但是，随着应用的成长，你将需要[将路由配置重构](#refactor-the-routing-configuration-into-a-routing-module)到单独的文件中，并创建[路由模块](#routing-module)，路由模块是一种特殊的、专做路由的**服务模块**。

</div>

Registering the `RouterModule.forRoot()` in the `AppModule` `imports` array makes the `Router` service available everywhere in the application.

把 `RouterModule.forRoot()` 注册到 `AppModule` 的 `imports` 数组中，能让该 `Router` 服务在应用的任何地方都能使用。

{@a shell}

### Add the Router Outlet

### 添加路由出口

The root `AppComponent` is the application shell. It has a title, a navigation bar with two links, and a router outlet where the router renders components.

根组件 `AppComponent` 是本应用的壳。它在顶部有一个标题、一个带两个链接的导航条，在底部有一个*路由器出口*，路由器会在它所指定的位置上渲染各个组件。

<div class="lightbox">
  <img src='generated/images/guide/router/shell-and-outlet.png' alt="Shell">
</div>

The router outlet serves as a placeholder where the routed components are rendered.

路由出口扮演一个占位符的角色，表示路由组件将会渲染到哪里。

{@a shell-template}

The corresponding component template looks like this:

该组件所对应的模板是这样的：

<code-example path="router/src/app/app.component.1.html" header="src/app/app.component.html"></code-example>

{@a wildcard}

### Define a Wildcard route

### 定义通配符路由

You've created two routes in the app so far, one to `/crisis-center` and the other to `/heroes`.
Any other URL causes the router to throw an error and crash the app.

你以前在应用中创建过两个路由，一个是 `/crisis-center`，另一个是 `/heroes`。
所有其它 URL 都会导致路由器抛出错误，并让应用崩溃。

Add a wildcard route to intercept invalid URLs and handle them gracefully.
A wildcard route has a path consisting of two asterisks.
It matches every URL.
Thus, the router selects this wildcard route if it can't match a route earlier in the configuration.
A wildcard route can navigate to a custom "404 Not Found" component or [redirect](#redirect) to an existing route.

可以添加一个通配符路由来拦截所有无效的 URL，并优雅的处理它们。
通配符路由的 `path` 是两个星号（`**`），它会匹配任何 URL。
而当路由器匹配不上以前定义的那些路由时，它就会选择这个通配符路由。
通配符路由可以导航到自定义的“404 Not Found”组件，也可以[重定向](guide/router#redirect)到一个现有路由。

<div class="alert is-helpful">

The router selects the route with a [_first match wins_](#example-config) strategy.
Because a wildcard route is the least specific route, place it last in the route configuration.

路由器会使用[先到先得](guide/router#example-config)的策略来选择路由。
由于通配符路由是最不具体的那个，因此务必确保它是路由配置中的*最后一个*路由。

</div>

To test this feature, add a button with a `RouterLink` to the `HeroListComponent` template and set the link to a non-existant route called `"/sidekicks"`.

要测试本特性，请往 `HeroListComponent` 的模板中添加一个带 `RouterLink` 的按钮，并且把它的链接设置为一个不存在的路由 `"/sidekicks"`。

<code-example path="router/src/app/hero-list/hero-list.component.1.html" header="src/app/hero-list/hero-list.component.html (excerpt)"></code-example>

The application fails if the user clicks that button because you haven't defined a `"/sidekicks"` route yet.

当用户点击该按钮时，应用就会失败，因为你尚未定义过 `"/sidekicks"` 路由。

Instead of adding the `"/sidekicks"` route, define a `wildcard` route and have it navigate to a `PageNotFoundComponent`.

不要添加 `"/sidekicks"` 路由，而是定义一个“通配符”路由，让它导航到 `PageNotFoundComponent` 组件。

<code-example path="router/src/app/app.module.1.ts" header="src/app/app.module.ts (wildcard)" region="wildcard"></code-example>

Create the `PageNotFoundComponent` to display when users visit invalid URLs.

创建 `PageNotFoundComponent`，以便在用户访问无效网址时显示它。

<code-example language="none" class="code-shell">
  ng generate component page-not-found
</code-example>

<code-example path="router/src/app/page-not-found/page-not-found.component.html" header="src/app/page-not-found.component.html (404 component)"></code-example>

Now when the user visits `/sidekicks`, or any other invalid URL, the browser displays "Page not found".
The browser address bar continues to point to the invalid URL.

现在，当用户访问 `/sidekicks` 或任何无效的 URL 时，浏览器就会显示“Page not found”。
浏览器的地址栏仍指向无效的 URL。

{@a redirect}

### Set up redirects

### 设置跳转

When the application launches, the initial URL in the browser bar is by default:

应用启动时，浏览器地址栏中的初始 URL 默认是这样的：

<code-example>
  localhost:4200
</code-example>

That doesn't match any of the hard-coded routes which means the router falls through to the wildcard route and displays the `PageNotFoundComponent`.

它不能匹配上任何硬编码进来的路由，于是就会走到通配符路由中去，并且显示 `PageNotFoundComponent`。

The application needs a default route to a valid page.
The default page for this app is the list of heroes.
The app should navigate there as if the user clicked the "Heroes" link or pasted `localhost:4200/heroes` into the address bar.

这个应用需要一个有效的默认路由，在这里应该用英雄列表作为默认页。当用户点击"Heroes"链接或把 `localhost:4200/heroes` 粘贴到地址栏时，它应该导航到列表页。

Add a `redirect` route that translates the initial relative URL (`''`) to the desired default path (`/heroes`).

添加一个 `redirect` 路由，把最初的相对 URL（`''`）转换成所需的默认路径（`/heroes`）。

Add the default route somewhere _above_ the wildcard route.
It's just above the wildcard route in the following excerpt showing the complete `appRoutes` for this milestone.

在通配符路由*上方*添加一个默认路由。
在下方的代码片段中，它出现在通配符路由的紧上方，展示了这个里程碑的完整 `appRoutes`。

<code-example path="router/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts (appRoutes)" region="appRoutes"></code-example>

The browser address bar shows `.../heroes` as if you'd navigated there directly.

浏览器的地址栏会显示 `.../heroes`，好像你直接在那里导航一样。

A redirect route requires a `pathMatch` property to tell the router how to match a URL to the path of a route.
In this app, the router should select the route to the `HeroListComponent` only when the *entire URL* matches `''`, so set the `pathMatch` value to `'full'`.

重定向路由需要一个 `pathMatch` 属性，来告诉路由器如何用 URL 去匹配路由的路径。
在本应用中，路由器应该只有在*完整的 URL_等于 `''` 时才选择 `HeroListComponent` 组件，因此要把 `pathMatch` 设置为 `'full'`。

{@a pathmatch}

<div class="callout is-helpful">

  <header>Spotlight on pathMatch</header>

  <header>聚焦 pathMatch</header>

  Technically, `pathMatch = 'full'` results in a route hit when the *remaining*, unmatched  segments of the URL match `''`.
  In this example, the redirect is in a top level route so the *remaining* URL and the  *entire* URL are the same thing.

  从技术角度看，`pathMatch = 'full'` 会导致 URL 中*剩下的*、未匹配的部分必须等于 `''`。  在这个例子中，跳转路由在一个顶层路由中，因此*剩下的_URL 和*完整的_URL 是一样的。

  The other possible `pathMatch` value is `'prefix'` which tells the router to match the  redirect route when the remaining URL begins with the redirect route's prefix  path.
  This doesn't apply to this sample app because if the `pathMatch` value were `'prefix'`,   every URL would match `''`.

  `pathMatch` 的另一个可能的值是 `'prefix'`，它会告诉路由器：当*剩下的_URL 以这个跳转路由中的 `prefix` 值开头时，就会匹配上这个跳转路由。
  但这不适用于此示例应用，因为如果 `pathMatch` 值是 `'prefix'`，那么每个 URL 都会匹配 `''`。

Try setting it to `'prefix'` and clicking the `Go to sidekicks` button.
  Since that's a bad URL, you should see the "Page not found" page.
  Instead, you're still on the "Heroes" page.
  Enter a bad URL in the browser address bar.
  You're instantly re-routed to `/heroes`.
  Every URL, good or bad, that falls through to this route definition is a match.

  尝试把它设置为 `'prefix'`，并点击 `Go to sidekicks` 按钮。这是因为它是一个无效 URL，本应显示“Page not found”页。
但是，你仍然在“英雄列表”页中。在地址栏中输入一个无效的 URL，你又被路由到了 `/heroes`。
*每一个* URL，无论有效与否，都会匹配上这个路由定义。

  The default route should redirect to the `HeroListComponent` only when the entire url is  `''`.
Remember to restore the redirect to `pathMatch = 'full'`.

  默认路由应该只有在整个URL 等于 `''` 时才重定向到 `HeroListComponent`，别忘了把重定向路由设置为 `pathMatch = 'full'`。

  Learn more in Victor Savkin's
  [post on redirects](http://vsavkin.tumblr.com/post/146722301646/angular-router-empty-paths-componentless-routes).

  要了解更多，参见 Victor Savkin 的帖子[关于重定向](http://victorsavkin.com/post/146722301646/angular-router-empty-paths-componentless-routes)。

</div>

### Milestone 1 wrap up

### 里程碑 1 小结

Your sample app can switch between two views when the user clicks a link.

当用户单击某个链接时，该示例应用可以在两个视图之间切换。

Milestone 1 has covered how to do the following:

里程碑 1 涵盖了以下几点的做法：

* Load the router library.

   加载路由库

* Add a nav bar to the shell template with anchor tags, `routerLink`  and `routerLinkActive` directives.

   往壳组件的模板中添加一个导航条，导航条中有一些 A 标签、`routerLink` 指令和 `routerLinkActive` 指令

* Add a `router-outlet` to the shell template where views are displayed.

   往壳组件的模板中添加一个 `router-outlet` 指令，视图将会被显示在那里

* Configure the router module with `RouterModule.forRoot()`.

   用 `RouterModule.forRoot()` 配置路由器模块

* Set the router to compose HTML5 browser URLs.

   设置路由器，使其合成 HTML5 模式的浏览器 URL

* Handle invalid routes with a `wildcard` route.

   使用通配符路由来处理无效路由

* Navigate to the default route when the app launches with an empty path.

   当应用在空路径下启动时，导航到默认路由

The starter app's structure looks like this:

这个初学者应用的结构是这样的：

<div class='filetree'>

  <div class='file'>
    angular-router-sample
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          crisis-list
        </div>

        <div class='children'>

          <div class='file'>

            crisis-list.component.css

          </div>

        <div class='file'>

          crisis-list.component.html

        </div>

        <div class='file'>

          crisis-list.component.ts

        </div>

        </div>

        <div class='file'>
          hero-list
        </div>

        <div class='children'>

          <div class='file'>

            hero-list.component.css

          </div>

          <div class='file'>

            hero-list.component.html

          </div>

          <div class='file'>

            hero-list.component.ts

          </div>

        </div>

        <div class='file'>
          page-not-found
        </div>

        <div class='children'>

          <div class='file'>

            page-not-found.component.css

          </div>

          <div class='file'>

            page-not-found.component.html

          </div>

          <div class='file'>

            page-not-found.component.ts

          </div>

        </div>

        <div class='file'>
          app.component.css
        </div>

        <div class='file'>
          app.component.html
        </div>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>

          app.module.ts
        </div>

      </div>

      <div class='file'>

        main.ts

      </div>

      <div class='file'>

        index.html

      </div>

      <div class='file'>

        styles.css

      </div>

      <div class='file'>

        tsconfig.json

      </div>

    </div>

    <div class='file'>

      node_modules ...

    </div>

    <div class='file'>

      package.json

    </div>

  </div>

</div>

Here are the files in this milestone.

下面是本里程碑中的文件列表：

<code-tabs>

  <code-pane header="app.component.html" path="router/src/app/app.component.1.html">

  </code-pane>

  <code-pane header="app.module.ts" path="router/src/app/app.module.1.ts">

  </code-pane>

  <code-pane header="hero-list/hero-list.component.html" path="router/src/app/hero-list/hero-list.component.1.html">

  </code-pane>

  <code-pane header="crisis-list/crisis-list.component.html" path="router/src/app/crisis-list/crisis-list.component.1.html">

  </code-pane>

  <code-pane header="page-not-found/page-not-found.component.html" path="router/src/app/page-not-found/page-not-found.component.html">

  </code-pane>

  <code-pane header="index.html" path="router/src/index.html">

  </code-pane>

</code-tabs>

{@a routing-module}

## Milestone 2: *Routing module*

## 里程碑 2：**路由模块**

This milestone shows you how to configure a special-purpose module called a *Routing Module*, which holds your app's routing configuration.

这个里程碑会向你展示如何配置一个名叫*路由模块*的专用*模块*，它会保存你应用的路由配置。

The Routing Module has several characteristics:

路由模块有以下几个特点：

* Separates routing concerns from other application concerns.

   把路由这个关注点从其它应用类关注点中分离出去。

* Provides a module to replace or remove when testing the application.

   测试特性模块时，可以替换或移除路由模块。

* Provides a well-known location for routing service providers such as guards and resolvers.

   为路由服务提供者（如守卫和解析器等）提供一个众所周知的位置。

* Does not declare components.

  不要声明组件。

{@a integrate-routing}

### Integrate routing with your app

### 把路由集成到应用中

The sample routing application does not include routing by default.
When you use the [Angular CLI](cli) to create a project that does use routing, set the `--routing` option for the project or app, and for each NgModule.
When you create or initialize a new project (using the CLI [`ng new`](cli/new) command) or a new app (using the [`ng generate app`](cli/generate) command), specify the `--routing` option.
This tells the CLI to include the `@angular/router` npm package and create a file named `app-routing.module.ts`.
You can then use routing in any NgModule that you add to the project or app.

路由应用范例中默认不包含路由。
要想在使用 [Angular CLI](cli) 创建项目时支持路由，请为项目或应用的每个 NgModule 设置 `--routing` 选项。
当你用 CLI 命令 [`ng new`](cli/new) 创建新项目或用 [`ng generate app`](cli/generate) 命令创建新应用，请指定 `--routing` 选项。这会告诉 CLI 包含上 `@angular/router` 包，并创建一个名叫 `app-routing.module.ts` 的文件。
然后你就可以在添加到项目或应用中的任何 NgModule 中使用路由功能了。

For example, the following command generates an NgModule that can use routing.

比如，可以用下列命令生成带路由的 NgModule。

```sh
ng generate module my-module --routing
```

This creates a separate file named `my-module-routing.module.ts` to store the NgModule's routes.
The file includes an empty `Routes` object that you can fill with routes to different components and NgModules.

这将创建一个名叫 `my-module-routing.module.ts` 的独立文件，来保存这个 NgModule 的路由信息。
该文件包含一个空的 `Routes` 对象，你可以使用一些指向各个组件和 NgModule 的路由来填充该对象。

{@a routing-refactor}

### Refactor the routing configuration into a routing module

### 将路由配置重构为路由模块

Create an `AppRouting` module in the `/app` folder to contain the routing configuration.

在 `/app` 目录下创建一个 `AppRouting` 模块，以包含路由配置。

<code-example language="none" class="code-shell">
  ng generate module app-routing --module app --flat
</code-example>

Import the `CrisisListComponent`, `HeroListComponent`, and `PageNotFoundComponent` symbols
just like you did in the `app.module.ts`.
Then move the `Router` imports and routing configuration, including `RouterModule.forRoot()`, into this routing module.

导入 `CrisisListComponent`、`HeroListComponent` 和 `PageNotFoundCompponent` 组件，就像 `app.module.ts` 中那样。然后把 `Router` 的导入语句和路由配置以及 `RouterModule.forRoot()` 移入这个路由模块中。

Re-export the Angular `RouterModule` by adding it to the module `exports` array.
By re-exporting the `RouterModule` here, the components declared in `AppModule` have access to router directives such as `RouterLink` and `RouterOutlet`.

把 Angular 的 `RouterModule` 添加到该模块的 `exports` 数组中，以便再次导出它。
通过再次导出 `RouterModule`，当在 `AppModule` 中导入了 `AppRoutingModule` 之后，那些声明在 `AppModule` 中的组件就可以访问路由指令了，比如 `RouterLink` 和 `RouterOutlet`。

After these steps, the file should look like this.

做完这些之后，该文件变成了这样：

<code-example path="router/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts"></code-example>

Next, update the `app.module.ts` file by removing `RouterModule.forRoot` in the `imports` array.

接下来，修改 `app.module.ts` 文件，从 `imports` 数组中移除 `RouterModule.forRoot`。

<code-example path="router/src/app/app.module.2.ts" header="src/app/app.module.ts"></code-example>

<div class="alert is-helpful">

Later, this guide shows you how to create [multiple routing modules](#heroes-functionality) and import those routing modules [in the correct order](#routing-module-order).

稍后，本指南将向你展示如何创建[多个路由模块](#heroes-functionality)，并[以正确的顺序](#routing-module-order)导入这些路由模块。

</div>

The application continues to work just the same, and you can use `AppRoutingModule` as the central place to maintain future routing configuration.

应用继续照常运行，你可以把路由模块作为将来每个模块维护路由配置的中心位置。

{@a why-routing-module}

### Benfits of a routing module

### 路由模块的优点

The routing module, often called the `AppRoutingModule`, replaces the routing configuration in the root or feature module.

路由模块（通常称为 `AppRoutingModule` ）代替了根模板或特性模块中的路由模块。

The routing module is helpful as your app grows and when the configuration includes specialized guard and resolver services.

这种路由模块在你的应用不断增长，以及配置中包括了专门的守卫和解析器服务时会非常有用。

Some developers skip the routing module when the configuration is minimal and merge the routing configuration directly into the companion module (for example, `AppModule`).

在配置很简单时，一些开发者会跳过路由模块，并将路由配置直接混合在关联模块中（比如 `AppModule` ）。

Most apps should implement a routing module for consistency.
It keeps the code clean when configuration becomes complex.
It makes testing the feature module easier.
Its existence calls attention to the fact that a module is routed.
It is where developers expect to find and expand routing configuration.

大多数应用都应该采用路由模块，以保持一致性。
它在配置复杂时，能确保代码干净。
它让测试特性模块更加容易。
它的存在让人一眼就能看出这个模块是带路由的。
开发者可以很自然的从路由模块中查找和扩展路由配置。

{@a heroes-feature}

## Milestone 3: Heroes feature

## 里程碑 3: 英雄特征区

This milestone covers the following:

本里程碑涵盖了以下内容：

* Organizing the app and routes into feature areas using modules.

   用模块把应用和路由组织为一些特性区。

* Navigating imperatively from one component to another.

   命令式的从一个组件导航到另一个

* Passing required and optional information in route parameters.

   通过路由传递必要信息和可选信息

This sample app recreates the heroes feature in the "Services" section of the [Tour of Heroes tutorial](tutorial/toh-pt4 "Tour of Heroes: Services"), and reuses much of the code from the <live-example name="toh-pt4" title="Tour of Heroes: Services example code"></live-example>.

这个示例应用在[“英雄指南”教程](tutorial/toh-pt4 "英雄指南：服务")的“服务”部分重新创建了英雄特性区，并复用了<live-example name="toh-pt4" title="Tour of Heroes: Services example code"></live-example>中的大部分代码。

<!-- KW - this gif isn't ideal for accessibility. Would like to remove it.-->

<!-- Here's how the user will experience this version of the app:

<div class="lightbox">
  <img src='generated/images/guide/router/router-2-anim.gif' alt="App in action">
</div> -->

A typical application has multiple feature areas, each dedicated to a particular business purpose with its own folder.

典型的应用具有多个*特性区*，每个特性区都专注于特定的业务用途并拥有自己的文件夹。

This section shows you how refactor the app into different feature modules, import them into the main module and navigate among them.

该部分将向你展示如何将应用重构为不同的特性模块、将它们导入到主模块中，并在它们之间导航。

{@a heroes-functionality}

### Add heroes functionality

### 添加英雄管理功能

Follow these steps:

遵循下列步骤：

* To manage the heroes, create a `HeroesModule` with routing in the heroes folder and register it with the root `AppModule`.

  为了管理这些英雄，在 `heroes` 目录下创建一个带路由的 `HeroesModule`，并把它注册到根模块 `AppModule` 中。

<code-example language="none" class="code-shell">
  ng generate module heroes/heroes --module app --flat --routing
</code-example>

* Move the placeholder `hero-list` folder that's in the `app` folder into the `heroes` folder.

  把 `app` 下占位用的 `hero-list` 目录移到 `heroes` 目录中。

* Copy the contents of the `heroes/heroes.component.html` from
  the <live-example name="toh-pt4" title="Tour of Heroes: Services example code">"Services" tutorial</live-example> into the `hero-list.component.html` template.

  从 <live-example name="toh-pt4" title="Tour of Heroes: Services example code">教程的 "服务" 部分</live-example>把 `heroes/heroes.component.html` 的内容复制到 `hero-list.component.html` 模板中。

  * Re-label the `<h2>` to `<h2>HEROES</h2>`.

    给 `<h2>` 加文字，改成 `<h2>HEROES</h2>`。

  * Delete the `<app-hero-detail>` component at the bottom of the template.

     删除模板底部的 `<app-hero-detail>` 组件。

* Copy the contents of the `heroes/heroes.component.css` from the live example into the `hero-list.component.css` file.

  把现场演练中 `heroes/heroes.component.css` 文件的内容复制到 `hero-list.component.css` 文件中。

* Copy the contents of the `heroes/heroes.component.ts` from the live example into the `hero-list.component.ts` file.

  把现场演练中 `heroes/heroes.component.ts` 文件的内容复制到 `hero-list.component.ts` 文件中。

  * Change the component class name to `HeroListComponent`.

    把组件类名改为 `HeroListComponent`。

  * Change the `selector` to `app-hero-list`.

    把 `selector` 改为 `app-hero-list`。

<div class="alert is-helpful">

   Selectors are not required for routed components because components are dynamically inserted when the page is rendered. However, they are useful for identifying and targeting them in your HTML element tree.

   对于路由组件来说，这些选择器不是必须的，因为这些组件是在渲染页面时动态插入的，不过选择器对于在 HTML 元素树中标记和选中它们是很有用的。

</div>

* Copy the `hero-detail` folder, the `hero.ts`, `hero.service.ts`,  and `mock-heroes.ts` files into the `heroes` subfolder.

  把 `hero-detail` 目录中的 `hero.ts`、`hero.service.ts` 和 `mock-heroes.ts` 文件复制到 `heroes` 子目录下。

* Copy the `message.service.ts` into the `src/app` folder.

  把 `message.service.ts` 文件复制到 `src/app` 目录下。

* Update the relative path import to the `message.service` in the `hero.service.ts` file.

  在 `hero.service.ts` 文件中修改导入 `message.service` 的相对路径。

Next, update the `HeroesModule` metadata.

接下来，更新 `HeroesModule` 的元数据。

* Import and add the `HeroDetailComponent` and `HeroListComponent` to the `declarations` array in the `HeroesModule`.

  导入 `HeroDetailComponent` 和 `HeroListComponent`，并添加到 `HeroesModule` 模块的 `declarations` 数组中。

<code-example path="router/src/app/heroes/heroes.module.ts" header="src/app/heroes/heroes.module.ts"></code-example>

The hero management file structure is as follows:

英雄管理部分的文件结构如下：

<div class='filetree'>

  <div class='file'>

    src/app/heroes

  </div>

  <div class='children'>

    <div class='file'>
      hero-detail
    </div>

      <div class='children'>

        <div class='file'>
          hero-detail.component.css
        </div>

        <div class='file'>
          hero-detail.component.html
        </div>

        <div class='file'>      
          hero-detail.component.ts
        </div>

      </div>

    <div class='file'>
      hero-list
    </div>

      <div class='children'>

        <div class='file'>
          hero-list.component.css
        </div>

        <div class='file'>
          hero-list.component.html
        </div>

        <div class='file'>      
          hero-list.component.ts
        </div>

      </div>

    <div class='file'>

      hero.service.ts

    </div>

    <div class='file'>
      hero.ts
    </div>

    <div class='file'>
      heroes-routing.module.ts
    </div>

    <div class='file'>

      heroes.module.ts

    </div>

    <div class='file'>
      mock-heroes.ts
    </div>

    </div>

</div>

</div>

{@a hero-routing-requirements}

#### Hero feature routing requirements

#### 英雄特性区的路由需求

The heroes feature has two interacting components, the hero list and the hero detail.
When you navigate to list view, it gets a list of heroes and displays them.
When you click on a hero, the detail view has to display that particular hero.

英雄特性区中有两个相互协作的组件：英雄列表和英雄详情。当你导航到列表视图时，它会获取英雄列表并显示出来。当你点击一个英雄时，详细视图就会显示那个特定的英雄。

You tell the detail view which hero to display by including the selected hero's id in the route URL.

  通过把所选英雄的 id 编码进路由的 URL 中，就能告诉详情视图该显示哪个英雄。

Import the hero components from their new locations in the `src/app/heroes/` folder and define the two hero routes.

从新位置 `src/app/heroes/` 目录中导入英雄相关的组件，并定义两个“英雄管理”路由。

Now that you have routes for the `Heroes` module, register them with the `Router` via the `RouterModule` as you did in the `AppRoutingModule`, with an important difference.

现在，你有了 `Heroes` 模块的路由，还得在 `RouterModule` 中把它们注册给*路由器*，和 `AppRoutingModule` 中的做法几乎完全一样，只有一项重要的差别。

In the `AppRoutingModule`, you used the static `RouterModule.forRoot()` method to register the routes and application level service providers.
In a feature module you use the static `forChild()` method.

在 `AppRoutingModule` 中，你使用了静态的 `RouterModule.forRoot()` 方法来注册路由和全应用级服务提供者。在特性模块中你要改用 `forChild()` 静态方法。

<div class="alert is-helpful">

Only call `RouterModule.forRoot()` in the root `AppRoutingModule`
(or the `AppModule` if that's where you register top level application routes).
In any other module, you must call the `RouterModule.forChild()` method to register additional routes.

只在根模块 `AppRoutingModule` 中调用 `RouterModule.forRoot()`（如果在 `AppModule` 中注册应用的顶层路由，那就在 `AppModule` 中调用）。
在其它模块中，你就必须调用 `RouterModule.forChild` 方法来注册附属路由。

</div>

The updated `HeroesRoutingModule` looks like this:

修改后的 `HeroesRoutingModule` 是这样的：

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts"></code-example>

<div class="alert is-helpful">

Consider giving each feature module its own route configuration file.
Though the feature routes are currently minimal, routes have a tendency to grow more complex even in small apps.

考虑为每个特性模块提供自己的路由配置文件。虽然特性路由目前还很少，但即使在小型应用中，路由也会变得越来越复杂。

</div>

{@a remove-duplicate-hero-routes}

#### Remove duplicate hero routes

#### 移除重复的“英雄管理”路由

The hero routes are currently defined in two places: in the `HeroesRoutingModule`,
by way of the `HeroesModule`, and in the `AppRoutingModule`.

英雄类的路由目前定义在两个地方：`HeroesRoutingModule` 中（并最终给 `HeroesModule`）和 `AppRoutingModule` 中。

Routes provided by feature modules are combined together into their imported module's routes by the router.
This allows you to continue defining the feature module routes without modifying the main route configuration.

由特性模块提供的路由会被路由器再组合上它们所导入的模块的路由。
这让你可以继续定义特性路由模块中的路由，而不用修改主路由配置。

Remove the `HeroListComponent` import and the `/heroes` route from the `app-routing.module.ts`.

移除 `HeroListComponent` 的导入和来自 `app-routing.module.ts` 中的 `/heroes` 路由。

Leave the default and the wildcard routes as these are still in use at the top level of the application.

保留默认路由和通配符路由，因为这些路由仍然要在应用的顶层使用。

<code-example path="router/src/app/app-routing.module.2.ts" header="src/app/app-routing.module.ts (v2)"></code-example>

{@a merge-hero-routes}

#### Remove heroes declarations

#### 移除英雄列表的声明

Because the `HeroesModule` now provides the `HeroListComponent`, remove it from the `AppModule`'s `declarations` array.
Now that you have a separate `HeroesModule`, you can evolve the hero feature with more components and different routes.

因为 `HeroesModule` 现在提供了 `HeroListComponent`，所以把它从 `AppModule` 的 `declarations` 数组中移除。现在你已经有了一个单独的 `HeroesModule`，你可以用更多的组件和不同的路由来演进英雄特性区。

After these steps, the `AppModule` should look like this:

经过这些步骤，`AppModule` 变成了这样：

<code-example path="router/src/app/app.module.3.ts" header="src/app/app.module.ts" region="remove-heroes"></code-example>

{@a routing-module-order}

### Module import order

### 模块导入顺序

Notice that in the module `imports` array, the `AppRoutingModule` is last and comes _after_ the `HeroesModule`.

请注意该模块的 `imports` 数组，`AppRoutingModule` 是最后一个，并且位于 `HeroesModule` 之后。

<code-example path="router/src/app/app.module.3.ts" region="module-imports" header="src/app/app.module.ts (module-imports)"></code-example>

The order of route configuration is important because the router accepts the first route that matches a navigation request path.

路由配置的顺序很重要，因为路由器会接受第一个匹配上导航所要求的路径的那个路由。

When all routes were in one `AppRoutingModule`, you put the default and [wildcard](#wildcard) routes last, after the `/heroes` route, so that the router had a chance to match a URL to the `/heroes` route _before_ hitting the wildcard route and navigating to "Page not found".

当所有路由都在同一个 `AppRoutingModule` 时，你要把默认路由和[通配符路由](guide/router#wildcard)放在最后（这里是在 `/heroes` 路由后面），
这样路由器才有机会匹配到 `/heroes` 路由，否则它就会先遇到并匹配上该通配符路由，并导航到“页面未找到”路由。

Each routing module augments the route configuration in the order of import.
If you listed `AppRoutingModule` first, the wildcard route would be registered _before_ the hero routes.
The wildcard route&mdash;which matches _every_ URL&mdash;would intercept the attempt to navigate to a hero route.

每个路由模块都会根据导入的顺序把自己的路由配置追加进去。
如果你先列出了 `AppRoutingModule`，那么通配符路由就会被注册在“英雄管理”路由*之前*。
通配符路由（它匹配*任意*URL）将会拦截住每一个到“英雄管理”路由的导航，因此事实上屏蔽了所有“英雄管理”路由。

<div class="alert is-helpful">

Reverse the routing modules to see a click of the heroes link resulting in "Page not found".
Learn about inspecting the runtime router configuration [below](#inspect-config "Inspect the router config").

反转路由模块的导入顺序，就会看到当点击英雄相关的链接时被导向了“页面未找到”路由。
要学习如何在运行时查看路由器配置，参见[稍后的内容](guide/router#inspect-config "Inspect the router config")。

</div>

### Route Parameters

### 路由参数

{@a route-def-with-parameter}

#### Route definition with a parameter

#### 带参数的路由定义

Return to the `HeroesRoutingModule` and look at the route definitions again.
The route to `HeroDetailComponent` has an `:id` token in the path.

回到 `HeroesRoutingModule` 并再次检查这些路由定义。
`HeroDetailComponent` 路由的路径中带有 `:id` 令牌。

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts (excerpt)" region="hero-detail-route"></code-example>

The `:id` token creates a slot in the path for a Route Parameter.
In this case,  this configuration causes the router to insert the `id` of a hero into that slot.

`:id` 令牌会为路由参数在路径中创建一个“空位”。在这里，这种配置会让路由器把英雄的 `id` 插入到那个“空位”中。

If you tell the router to navigate to the detail component and display "Magneta", you expect a hero id to appear in the browser URL like this:

如果要告诉路由器导航到详情组件，并让它显示“Magneta”，你会期望这个英雄的 `id` 像这样显示在浏览器的 URL 中：

<code-example format="nocode">
  localhost:4200/hero/15

</code-example>

If a user enters that URL into the browser address bar, the router should recognize the pattern and go to the same "Magneta" detail view.

如果用户把此 URL 输入到浏览器的地址栏中，路由器就会识别出这种模式，同样进入“Magneta”的详情视图。

<div class="callout is-helpful">

<header>Route parameter: Required or optional?</header>

<header>路由参数：必须的还是可选的？</header>

Embedding the route parameter token, `:id`, in the route definition path is a good choice for this scenario because the `id` is *required* by the `HeroDetailComponent` and because the value `15` in the path clearly distinguishes the route to "Magneta" from a route for some other hero.

在这个场景下，把路由参数的令牌 `:id` 嵌入到路由定义的 `path` 中是一个好主意，因为对于 `HeroDetailComponent` 来说 `id` 是*必须的*，
而且路径中的值 `15` 已经足够把到“Magneta”的路由和到其它英雄的路由明确区分开。

</div>

{@a route-parameters}

#### Setting the route parameters in the list view

#### 在列表视图中设置路由参数

After navigating to the `HeroDetailComponent`, you expect to see the details of the selected hero.
You need two pieces of information: the routing path to the component and the hero's `id`.

然后导航到 `HeroDetailComponent` 组件。在那里，你期望看到所选英雄的详情，这需要两部分信息：导航目标和该英雄的 `id`。

Accordingly, the _link parameters array_ has two items: the routing _path_ and a _route parameter_ that specifies the
`id` of the selected hero.

因此，这个*链接参数数组*中有两个条目：路由的*路径*和一个用来指定所选英雄 `id` 的*路由参数*。

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (link-parameters-array)" region="link-parameters-array"></code-example>

The router composes the destination URL from the array like this: `localhost:4200/hero/15`.

路由器从该数组中组合出了目标 URL：
`localhost:3000/hero/15`。

The router extracts the route parameter (`id:15`) from the URL and supplies it to
the `HeroDetailComponent` via the `ActivatedRoute` service.

路由器从 URL 中解析出路由参数（`id:15`），并通过 **ActivatedRoute** 服务来把它提供给 `HeroDetailComponent` 组件。

{@a activated-route-in-action}

### `Activated Route` in action

### `ActivatedRoute` 实战

Import the `Router`, `ActivatedRoute`, and `ParamMap` tokens from the router package.

从路由器（`router`）包中导入 `Router`、`ActivatedRoute` 和 `Params` 类。

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (activated route)" region="imports"></code-example>

Import the `switchMap` operator because you need it later to process the `Observable` route parameters.

这里导入 `switchMap` 操作符是因为你稍后将会处理路由参数的可观察对象 `Observable`。

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (switchMap operator import)" region="rxjs-operator-import"></code-example>

{@a hero-detail-ctor}

Add the services as private variables to the constructor so that Angular injects them (makes them visible to the component).

把这些服务作为私有变量添加到构造函数中，以便 Angular 注入它们（让它们对组件可见）。

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (constructor)" region="ctor"></code-example>

In the `ngOnInit()` method, use the `ActivatedRoute` service to retrieve the parameters for the route, pull the hero `id` from the parameters, and retrieve the hero to display.

在 `ngOnInit()` 方法中，使用 `ActivatedRoute` 服务来检索路由的参数，从参数中提取出英雄的 `id`，并检索要显示的英雄。

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (ngOnInit)" region="ngOnInit"></code-example>

When the map changes, `paramMap` gets the `id` parameter from the changed parameters.

当这个 map 发生变化时，`paramMap` 会从更改后的参数中获取 `id` 参数。

Then you tell the `HeroService` to fetch the hero with that `id` and return the result of the `HeroService` request.

然后，让 `HeroService` 去获取具有该 `id` 的英雄，并返回 `HeroService` 请求的结果。

The `switchMap` operator does two things. It flattens the `Observable<Hero>` that `HeroService` returns and cancels previous pending requests.
If the user re-navigates to this route with a new `id` while the `HeroService` is still retrieving the old `id`, `switchMap` discards that old request and returns the hero for the new `id`.

`switchMap` 操作符做了两件事。它把 `HeroService` 返回的 `Observable<Hero>` 拍平，并取消以前的未完成请求。当 `HeroService` 仍在检索旧的 `id` 时，如果用户使用新的 `id` 重新导航到这个路由，`switchMap` 会放弃那个旧请求，并返回新 `id` 的英雄。

`AsyncPipe` handles the observable subscription and the component's `hero` property will be (re)set with the retrieved hero.

`AsyncPipe` 处理这个可观察的订阅，而且该组件的 `hero` 属性也会用检索到的英雄（重新）进行设置。

#### _ParamMap_ API

The `ParamMap` API is inspired by the [URLSearchParams interface](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).
It provides methods to handle parameter access for both route parameters (`paramMap`) and query parameters (`queryParamMap`).

`ParamMap` API 的灵感来自于 [URLSearchParams 接口](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。它提供了处理路由参数（ `paramMap` ）和查询参数（ `queryParamMap` ）访问的方法。

<table>
  <tr>

    <th>

      Member

      成员

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td>

      <code>has(name)</code>

    </td>

    <td>

    Returns `true` if the parameter name is in the map of parameters.

    如果参数名位于参数列表中，就返回 `true`。

    </td>

  </tr>

  <tr>

    <td>

      <code>get(name)</code>

    </td>

    <td>

    Returns the parameter name value (a `string`) if present, or `null` if the parameter name is not in the map. Returns the _first_ element if the parameter value is actually an array of values.

    如果这个 map 中有参数名对应的参数值（字符串），就返回它，否则返回 `null`。如果参数值实际上是一个数组，就返回它的*第一个*元素。

    </td>

  </tr>

  <tr>

    <td>

      <code>getAll(name)</code>

    </td>

    <td>

    Returns a `string array` of the parameter name value if found, or an empty `array` if the parameter name value is not in the map. Use `getAll` when a single parameter could have multiple values.

    如果这个 map 中有参数名对应的值，就返回一个字符串数组，否则返回空数组。当一个参数名可能对应多个值的时候，请使用 `getAll`。

    </td>

  </tr>

  <tr>

    <td>

      <code>keys</code>

    </td>

    <td>

    Returns a `string array` of all parameter names in the map.

    返回这个 map 中的所有参数名组成的字符串数组。

    </td>

  </tr>
</table>

{@a reuse}

#### Observable <i>paramMap</i> and component reuse

#### <i>参数</i>的可观察对象（Observable）与组件复用

In this example, you retrieve the route parameter map from an `Observable`.
That implies that the route parameter map can change during the lifetime of this component.

在这个例子中，你接收了路由参数的 `Observable` 对象。
这种写法暗示着这些路由参数在该组件的生存期内可能会变化。

By default, the router re-uses a component instance when it re-navigates to the same component type
without visiting a different component first. The route parameters could change each time.

默认情况下，如果它没有访问过其它组件就导航到了同一个组件实例，那么路由器倾向于复用组件实例。如果复用，这些参数可以变化。

Suppose a parent component navigation bar had "forward" and "back" buttons
that scrolled through the list of heroes.
Each click navigated imperatively to the `HeroDetailComponent` with the next or previous `id`.

假设父组件的导航栏有“前进”和“后退”按钮，用来轮流显示英雄列表中中英雄的详情。
  每次点击都会强制导航到带前一个或后一个 `id` 的 `HeroDetailComponent` 组件。

You wouldn't want the router to remove the current `HeroDetailComponent` instance from the DOM only to re-create it for the next `id` as this would re-render the view.
For better UX, the router re-uses the same component instance and updates the parameter.

你肯定不希望路由器先从 DOM 中移除当前的 `HeroDetailComponent` 实例，只是为了用下一个 `id` 重新创建它，因为它将重新渲染视图。为了更好的用户体验，路由器会复用同一个组件实例，而只是更新参数。

Since `ngOnInit()` is only called once per component instantiation, you can detect when the route parameters change from _within the same instance_ using the observable `paramMap` property.

由于 `ngOnInit()` 在每个组件实例化时只会被调用一次，所以你可以使用 `paramMap` 可观察对象来检测路由参数*在同一个实例中*何时发生了变化。

<div class="alert is-helpful">

When subscribing to an observable in a component, you almost always unsubscribe when the component is destroyed.

当在组件中订阅一个可观察对象时，你通常总是要在组件销毁时取消这个订阅。

However, `ActivatedRoute` observables are among the exceptions because `ActivatedRoute` and its observables are insulated from the `Router` itself.
The `Router` destroys a routed component when it is no longer needed along with the injected `ActivatedRoute`.

不过，`ActivatedRoute` 中的可观察对象是一个例外，因为 `ActivatedRoute` 及其可观察对象与 `Router` 本身是隔离的。
`Router` 会在不再需要时销毁这个路由组件，而注入进去的 `ActivateRoute` 也随之销毁了。

</div>

{@a snapshot}

#### `snapshot`: the no-observable alternative

#### `snapshot`：当不需要 Observable 时的替代品

This application won't re-use the `HeroDetailComponent`.
The user always returns to the hero list to select another hero to view.
There's no way to navigate from one hero detail to another hero detail without visiting the list component in between.
Therefore, the router creates a new `HeroDetailComponent` instance every time.

本应用不需要复用 `HeroDetailComponent`。
  用户总是会先返回英雄列表，再选择另一位英雄。
  所以，不存在从一个英雄详情导航到另一个而不用经过英雄列表的情况。
  这意味着路由器每次都会创建一个全新的 `HeroDetailComponent` 实例。

When you know for certain that a `HeroDetailComponent` instance will never be re-used, you can use `snapshot`.

假如你很确定这个 `HeroDetailComponent` 实例永远不会被重用，你可以使用 `snapshot`。

`route.snapshot` provides the initial value of the route parameter map.
You can access the parameters directly without subscribing or adding observable operators as in the following:

`route.snapshot` 提供了路由参数的初始值。
你可以通过它来直接访问参数，而不用订阅或者添加 Observable 的操作符，代码如下：

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.2.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (ngOnInit snapshot)" region="snapshot"></code-example>

<div class="alert is-helpful">

`snapshot` only gets the initial value of the parameter map with this technique.
Use the observable `paramMap` approach if there's a possibility that the router could re-use the component.
This tutorial sample app uses with the observable `paramMap`.

用这种技术，`snapshot` 只会得到这些参数的初始值。如果路由器可能复用该组件，那么就该用 `paramMap` 可观察对象的方式。本教程的示例应用中就用了 `paramMap` 可观察对象。

</div>

{@a nav-to-list}

### Navigating back to the list component

### 导航回列表组件

The `HeroDetailComponent` "Back" button uses the `gotoHeroes()` method that navigates imperatively back to the `HeroListComponent`.

`HeroDetailComponent` 的 “Back” 按钮使用了 `gotoHeroes()` 方法，该方法会强制导航回 `HeroListComponent`。

The router `navigate()` method takes the same one-item _link parameters array_ that you can bind to a `[routerLink]` directive.
It holds the path to the `HeroListComponent`:

路由的 `navigate()` 方法同样接受一个单条目的*链接参数数组*，你也可以把它绑定到 `[routerLink]` 指令上。
它保存着到 `HeroListComponent` 组件的路径：

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (excerpt)" region="gotoHeroes"></code-example>

{@a optional-route-parameters}

#### Route Parameters: Required or optional?

#### 路由参数：必须还是可选？

Use [route parameters](#route-parameters) to specify a required parameter value within the route URL
as you do when navigating to the `HeroDetailComponent` in order to view the hero with `id` 15:

如果想导航到 `HeroDetailComponent` 以对 id 为 `15` 的英雄进行查看并编辑，就要在路由的 URL 中使用[路由参数](guide/router#route-parameters)来指定必要参数值。

<code-example format="nocode">
  localhost:4200/hero/15

</code-example>

You can also add optional information to a route request.
For example, when returning to the `hero-detail.component.ts` list from the hero detail view, it would be nice if the viewed hero were preselected in the list.

你也能在路由请求中添加*可选*信息。
比如，当从 `hero-detail.component.ts` 返回到列表时，如果能自动选中刚刚查看过的英雄就好了。

<div class="lightbox">
  <img src='generated/images/guide/router/selected-hero.png' alt="Selected hero">
</div>

You implement this feature by including the viewed hero's `id` in the URL as an optional parameter when returning from the `HeroDetailComponent`.

当从 `HeroDetailComponent` 返回时，你可以会通过把正在查看的英雄的 `id` 作为可选参数包含在 URL 中来实现这个特性。

Optional information can also include other forms such as:

可选信息还可以包含其它形式，例如：

* Loosely structured search criteria; for example, `name='wind*'`.

  结构松散的搜索条件。比如 `name='wind_'`。

* Multiple values;  for example, `after='12/31/2015' & before='1/1/2017'`&mdash;in no
particular order&mdash;`before='1/1/2017' & after='12/31/2015'`&mdash; in a
variety of formats&mdash;`during='currentYear'`.

  多个值。比如 `after='12/31/2015' & before='1/1/2017'` - 没有特定的顺序 - `before='1/1/2017' & after='12/31/2015'` - 具有各种格式 - `during='currentYear'`。

As these kinds of parameters don't fit easily in a URL path, you can use optional parameters for conveying arbitrarily complex information during navigation.
Optional parameters aren't involved in pattern matching and afford flexibility of expression.

由于这些参数不适合用作 URL 路径，因此可以使用可选参数在导航过程中传递任意复杂的信息。可选参数不参与模式匹配，因此在表达上提供了巨大的灵活性。

The router supports navigation with optional parameters as well as required route parameters.
Define optional parameters in a separate object _after_ you define the required route parameters.

和必要参数一样，路由器也支持通过可选参数导航。
在你定义完必要参数之后，再通过一个*独立的对象*来定义可选参数。

In general, use a required route parameter when the value is mandatory (for example, if necessary to distinguish one route path from another); and an optional parameter when the value is optional, complex, and/or multivariate.

通常，对于必传的值（比如用于区分两个路由路径的）使用*必备参数*；当这个值是可选的、复杂的或多值的时，使用可选参数。

{@a optionally-selecting}

{@a optional-selecting}

#### Heroes list: optionally selecting a hero

#### 英雄列表：选定一个英雄（也可不选）

When navigating to the `HeroDetailComponent` you specified the required `id` of the hero-to-edit in the
route parameter and made it the second item of the [_link parameters array_](#link-parameters-array).

当导航到 `HeroDetailComponent` 时，你可以在*路由参数*中指定一个所要编辑的英雄 `id`，只要把它作为[链接参数数组](guide/router#link-parameters-array)中的第二个条目就可以了。

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (link-parameters-array)" region="link-parameters-array"></code-example>

The router embedded the `id` value in the navigation URL because you had defined it as a route parameter with an `:id` placeholder token in the route `path`:

路由器在导航 URL 中内嵌了 `id` 的值，这是因为你把它用一个 `:id` 占位符当做路由参数定义在了路由的 `path` 中：

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts (hero-detail-route)" region="hero-detail-route"></code-example>

When the user clicks the back button, the `HeroDetailComponent` constructs another _link parameters array_
which it uses to navigate back to the `HeroListComponent`.

当用户点击后退按钮时，`HeroDetailComponent` 构造了另一个*链接参数数组*，可以用它导航回 `HeroListComponent`。

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (gotoHeroes)" region="gotoHeroes"></code-example>

This array lacks a route parameter because previously you didn't need to send information to the `HeroListComponent`.

该数组缺少一个路由参数，这是因为以前你不需要往 `HeroListComponent` 发送信息。

Now, send the `id` of the current hero with the navigation request so that the
`HeroListComponent` can highlight that hero in its list.

现在，使用导航请求发送当前英雄的 `id`，以便 `HeroListComponent` 在其列表中突出显示该英雄。

Send the `id` with an object that contains an optional `id` parameter.
For demonstration purposes, there's an extra junk parameter (`foo`) in the object that the `HeroListComponent` should ignore.
Here's the revised navigation statement:

传送一个包含可选 `id` 参数的对象。
为了演示，这里还在对象中定义了一个没用的额外参数（`foo`），`HeroListComponent` 应该忽略它。
下面是修改过的导航语句：

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (go to heroes)" region="gotoHeroes"></code-example>

The application still works. Clicking "back" returns to the hero list view.

该应用仍然能工作。点击“back”按钮返回英雄列表视图。

Look at the browser address bar.

注意浏览器的地址栏。

It should look something like this, depending on where you run it:

它应该是这样的，不过也取决于你在哪里运行它：

<code-example language="bash">
  localhost:4200/heroes;id=15;foo=foo

</code-example>

The `id` value appears in the URL as (`;id=15;foo=foo`), not in the URL path.
The path for the "Heroes" route doesn't have an `:id` token.

`id` 的值像这样出现在 URL 中（`;id=15;foo=foo`），但不在 URL 的路径部分。
“Heroes”路由的路径部分并没有定义 `:id`。

The optional route parameters are not separated by "?" and "&" as they would be in the URL query string.
They are separated by semicolons ";".
This is matrix URL notation.

可选的路由参数没有使用“？”和“&”符号分隔，因为它们将用在 URL 查询字符串中。
它们是用“;”分隔的。
这是*矩阵 URL*标记法。

<div class="alert is-helpful">

Matrix URL notation is an idea first introduced in a [1996 proposal](http://www.w3.org/DesignIssues/MatrixURIs.html) by the founder of the web, Tim Berners-Lee.

Matrix URL 写法首次提出是在[1996 提案](http://www.w3.org/DesignIssues/MatrixURIs.html)中，提出者是 Web 的奠基人：Tim Berners-Lee。

Although matrix notation never made it into the HTML standard, it is legal and it became popular among browser routing systems as a way to isolate parameters belonging to parent and child routes.
As such, the Router provides support for the matrix notation across browsers.

虽然 Matrix 写法未曾进入过 HTML 标准，但它是合法的。而且在浏览器的路由系统中，它作为从父路由和子路由中单独隔离出参数的方式而广受欢迎。Angular 的路由器正是这样一个路由系统，并支持跨浏览器的 Matrix 写法。

</div>

{@a route-parameters-activated-route}

### Route parameters in the `ActivatedRoute` service

### `ActivatedRoute` 服务中的路由参数

In its current state of development, the list of heroes is unchanged.
No hero row is highlighted.

开发到现在，英雄列表还没有变化。没有突出显示的英雄行。

The `HeroListComponent` needs code that expects parameters.

`HeroListComponent` 需要添加使用这些参数的代码。

Previously, when navigating from the `HeroListComponent` to the `HeroDetailComponent`,
you subscribed to the route parameter map `Observable` and made it available to the `HeroDetailComponent`
in the `ActivatedRoute` service.
You injected that service in the constructor of the `HeroDetailComponent`.

以前，当从 `HeroListComponent` 导航到 `HeroDetailComponent` 时，你通过 `ActivatedRoute` 服务订阅了路由参数这个 `Observable`，并让它能用在 `HeroDetailComponent` 中。
你把该服务注入到了 `HeroDetailComponent` 的构造函数中。

This time you'll be navigating in the opposite direction, from the `HeroDetailComponent` to the `HeroListComponent`.

这次，你要进行反向导航，从 `HeroDetailComponent` 到 `HeroListComponent`。

First, extend the router import statement to include the `ActivatedRoute` service symbol:

首先，扩展该路由的导入语句，以包含进 `ActivatedRoute` 服务的类；

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (import)" region="import-router"></code-example>

Import the `switchMap` operator to perform an operation on the `Observable` of route parameter map.

导入 `switchMap` 操作符，在路由参数的 `Observable` 对象上执行操作。

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (rxjs imports)" region="rxjs-imports"></code-example>

Inject the `ActivatedRoute` in the `HeroListComponent` constructor.

在 `HeroListComponent` 构造函数中注入 `ActivatedRoute`。

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (constructor and ngOnInit)" region="ctor"></code-example>

The `ActivatedRoute.paramMap` property is an `Observable` map of route parameters.
The `paramMap` emits a new map of values that includes `id` when the user navigates to the component.
In `ngOnInit()` you subscribe to those values, set the `selectedId`, and get the heroes.

`ActivatedRoute.paramMap` 属性是一个路由参数的 `Observable`。当用户导航到这个组件时，paramMap 会发射一个新值，其中包含 `id`。
在 `ngOnInit()` 中，你订阅了这些值，设置到 `selectedId`，并获取英雄数据。

Update the template with a [class binding](guide/template-syntax#class-binding).
The binding adds the `selected` CSS class when the comparison returns `true` and removes it when `false`.
Look for it within the repeated `<li>` tag as shown here:

用 [CSS 类绑定](guide/template-syntax#class-binding)更新模板，把它绑定到 `isSelected` 方法上。
如果该方法返回 `true`，此绑定就会添加 CSS 类 `selected`，否则就移除它。
在 `<li>` 标记中找到它，就像这样：

<code-example path="router/src/app/heroes/hero-list/hero-list.component.html" header="src/app/heroes/hero-list/hero-list.component.html"></code-example>

Add some styles to apply when the list item is selected.

当选中列表条目时，要添加一些样式。

<code-example path="router/src/app/heroes/hero-list/hero-list.component.css" region="selected" header="src/app/heroes/hero-list/hero-list.component.css"></code-example>

When the user navigates from the heroes list to the "Magneta" hero and back, "Magneta" appears selected:

当用户从英雄列表导航到英雄“Magneta”并返回时，“Magneta”看起来是选中的：

<div class="lightbox">
  <img src='generated/images/guide/router/selected-hero.png' alt="Selected List">
</div>

The optional `foo` route parameter is harmless and the router continues to ignore it.

这个可选的 `foo` 路由参数人畜无害，路由器会继续忽略它。

{@a route-animation}

### Adding routable animations

### 添加路由动画

This section shows you how to add some [animations](guide/animations) to the `HeroDetailComponent`.

在这一节，你将为*英雄详情*组件添加一些[动画](guide/animations)。

First, import the `BrowserAnimationsModule` and add it to the `imports` array:

首先导入 `BrowserAnimationsModule`，并添加到 `imports` 数组中：

<code-example path="router/src/app/app.module.ts" header="src/app/app.module.ts (animations-module)" region="animations-module"></code-example>

Next, add a `data` object to the routes for `HeroListComponent` and `HeroDetailComponent`.
Transitions are based on `states` and you use the `animation` data from the route to provide a named animation `state` for the transitions.

接下来，为指向 `HeroListComponent` 和 `HeroDetailComponent` 的路由定义添加一个 `data` 对象。
转场是基于 `states` 的，你将使用来自路由的 `animation` 数据为转场提供一个有名字的动画 `state`。

<code-example path="router/src/app/heroes/heroes-routing.module.2.ts" header="src/app/heroes/heroes-routing.module.ts (animation data)"></code-example>

Create an `animations.ts` file in the root `src/app/` folder. The contents look like this:

在根目录 `src/app/` 下创建一个 `animations.ts`。内容如下：

<code-example path="router/src/app/animations.ts" header="src/app/animations.ts (excerpt)"></code-example>

This file does the following:

该文件做了如下工作：

* Imports the animation symbols that build the animation triggers, control state, and manage transitions between states.

   导入动画符号以构建动画触发器、控制状态并管理状态之间的过渡。

* Exports a constant named `slideInAnimation` set to an animation trigger named `routeAnimation`.

   导出了一个名叫 `slideInAnimation` 的常量，并把它设置为一个名叫 `routeAnimation` 的动画触发器。

* Defines one transition when switching back and forth from the `heroes` and `hero` routes to ease the component in from the left of the screen as it enters the application view (`:enter`), the other to animate the component to the right as it leaves the application view (`:leave`).

  定义一个转场动画，当在 `heroes` 和 `hero` 路由之间来回切换时，如果进入（`:enter`）应用视图则让组件从屏幕的左侧滑入，如果离开（`:leave`）应用视图则让组件从右侧划出。

Back in the `AppComponent`, import the `RouterOutlet` token from the `@angular/router` package and the `slideInAnimation` from `'./animations.ts`.

回到 `AppComponent`，从 `@angular/router` 包导入 `RouterOutlet`，并从 `'./animations.ts` 导入 `slideInAnimation`。

Add an `animations` array to the `@Component` metadata that contains the `slideInAnimation`.

为包含 `slideInAnimation` 的 `@Component` 元数据添加一个 `animations` 数组。

<code-example path="router/src/app/app.component.2.ts" header="src/app/app.component.ts (animations)" region="animation-imports"></code-example>

In order to use the routable animations, wrap the `RouterOutlet` inside an element, use the `@routeAnimation` trigger, and bind it to the element.

要想使用路由动画，就要把 `RouterOutlet` 包装到一个元素中。再把 `@routeAnimation` 触发器绑定到该元素上。

For the `@routeAnimation` transitions to key off states, provide it with the `data` from the `ActivatedRoute`.
The `RouterOutlet` is exposed as an `outlet` template variable, so you bind a reference to the router outlet.
This example uses a variable of `routerOutlet`.

为了把 `@routeAnimation` 转场转场到指定的状态，你需要从 `ActivatedRoute` 的 `data` 中提供它。
`RouterOutlet` 导出成了一个模板变量 `outlet`，这样你就可以绑定一个到路由出口的引用了。这个例子中使用了一个 `routerOutlet` 变量。

<code-example path="router/src/app/app.component.2.html" header="src/app/app.component.html (router outlet)"></code-example>

The `@routeAnimation` property is bound to the `getAnimationData()` with the provided `routerOutlet` reference, so the next step is to define that function in the `AppComponent`.
The `getAnimationData()` function returns the animation property from the `data` provided through the `ActivatedRoute`. The `animation` property matches the `transition` names you used in the `slideInAnimation` defined in `animations.ts`.

`@routeAnimation` 属性使用所提供的 `routerOutlet` 引用来绑定到 `getAnimationData()`，因此下一步就要在 `AppComponent` 中定义那个函数。`getAnimationData` 函数会根据 `ActivatedRoute` 所提供的 `data` 对象返回动画的属性。`animation` 属性会根据你在 `animations.ts` 中定义 `slideInAnimation()` 时使用的 `transition` 名称进行匹配。

<code-example path="router/src/app/app.component.2.ts" header="src/app/app.component.ts (router outlet)" region="function-binding"></code-example>

When switching between the two routes, the `HeroDetailComponent` and `HeroListComponent` now ease in from the left when routed to and will slide to the right when navigating away.

如果在两个路由之间切换，导航进来时，`HeroDetailComponent` 和 `HeroListComponent` 会从左侧滑入；导航离开时将会从右侧划出。

{@a milestone-3-wrap-up}

### Milestone 3 wrap up

### 里程碑 3 的小结

This section has covered the following:

本节包括以下内容：

* Organizing the app into feature areas.

   把应用组织成特性区

* Navigating imperatively from one component to another.

   命令式的从一个组件导航到另一个

* Passing information along in route parameters and subscribe to them in the component.

   通过路由参数传递信息，并在组件中订阅它们

* Importing the feature area NgModule into the `AppModule`.

   把这个特性分区模块导入根模块 `AppModule`

* Applying routable animations based on the page.

   把动画应用到路由组件上

After these changes, the folder structure is as follows:

做完这些修改之后，目录结构如下：

<div class='filetree'>

  <div class='file'>

    angular-router-sample
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

    <div class='file'>

      app

    </div>

      <div class='children'>

      <div class='file'>

        crisis-list

      </div>

          <div class='children'>

            <div class='file'>
              crisis-list.component.css
            </div>

            <div class='file'>
              crisis-list.component.html
            </div>

            <div class='file'>
              crisis-list.component.ts
            </div>

          </div>

        <div class='file'>

          heroes

        </div>

        <div class='children'>

          <div class='file'>

hero-detail
          </div>

            <div class='children'>

              <div class='file'>
                hero-detail.component.css
              </div>

              <div class='file'>
                hero-detail.component.html
              </div>

              <div class='file'>
                hero-detail.component.ts
              </div>

          </div>

            </div>

          <div class='file'>

hero-list
          </div>

            <div class='children'>

              <div class='file'>
                hero-list.component.css
              </div>

              <div class='file'>
                hero-list.component.html
              </div>

              <div class='file'>
                hero-list.component.ts
              </div>

            </div>

          <div class='file'>
            hero.service.ts
          </div>

          <div class='file'>
            hero.ts
          </div>

          <div class='file'>
            heroes-routing.module.ts
          </div>

          <div class='file'>

            heroes.module.ts

          </div>

          <div class='file'>

            mock-heroes.ts
          </div>

        </div>

        <div class='file'>
          page-not-found
        </div>

        <div class='children'>

          <div class='file'>

            page-not-found.component.css

          </div>

          <div class='file'>

            page-not-found.component.html

          </div>

          <div class='file'>

            page-not-found.component.ts

          </div>

        </div>

      </div>

      <div class='file'>
        animations.ts
      </div>

      <div class='file'>
        app.component.css
      </div>

      <div class='file'>
        app.component.html
      </div>

        <div class='file'>

          app.component.ts

        </div>

        <div class='file'>

          app.module.ts

        </div>

        <div class='file'>

          app-routing.module.ts

        </div>

        <div class='file'>

          main.ts

</div>

      <div class='file'>

        message.service.ts

      </div>

      <div class='file'>

        index.html

      </div>

      <div class='file'>

        styles.css

      </div>

      <div class='file'>

        tsconfig.json

      </div>

    </div>

    <div class='file'>

      node_modules ...

    </div>

    <div class='file'>

      package.json

    </div>

  </div>

</div>

Here are the relevant files for this version of the sample application.

这里是当前版本的范例程序相关文件。

<code-tabs>

  <code-pane header="animations.ts" path="router/src/app/animations.ts">

  </code-pane>

  <code-pane header="app.component.html" path="router/src/app/app.component.2.html">

  </code-pane>

  <code-pane header="app.component.ts" path="router/src/app/app.component.2.ts">

  </code-pane>

  <code-pane header="app.module.ts" path="router/src/app/app.module.3.ts">

  </code-pane>

  <code-pane header="app-routing.module.ts" path="router/src/app/app-routing.module.2.ts" region="milestone3">

  </code-pane>

  <code-pane header="hero-list.component.css" path="router/src/app/heroes/hero-list/hero-list.component.css">

  </code-pane>

  <code-pane header="hero-list.component.html" path="router/src/app/heroes/hero-list/hero-list.component.html">

  </code-pane>

  <code-pane header="hero-list.component.ts" path="router/src/app/heroes/hero-list/hero-list.component.ts">

  </code-pane>

  <code-pane header="hero-detail.component.html" path="router/src/app/heroes/hero-detail/hero-detail.component.html">

  </code-pane>

  <code-pane header="hero-detail.component.ts" path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts">

  </code-pane>

  <code-pane header="hero.service.ts" path="router/src/app/heroes/hero.service.ts">

  </code-pane>

  <code-pane header="heroes.module.ts" path="router/src/app/heroes/heroes.module.ts">

  </code-pane>

  <code-pane header="heroes-routing.module.ts" path="router/src/app/heroes/heroes-routing.module.2.ts">

  </code-pane>

  <code-pane header="message.service.ts" path="router/src/app/message.service.ts">

  </code-pane>

</code-tabs>

{@a milestone-4}

## Milestone 4: Crisis center feature

## 里程碑 4：危机中心

This section shows you how to add child routes and use relative routing in your app.

本节将向你展示如何在应用中添加子路由并使用相对路由。

To add more features to the app's current crisis center, take similar steps as for the heroes feature:

要为应用当前的危机中心添加更多特性，请执行类似于 heroes 特性的步骤：

* Create a `crisis-center` subfolder in the `src/app` folder.

  在 `src/app` 目录下创建一个 `crisis-center` 子目录。

* Copy the files and folders from `app/heroes` into the new `crisis-center` folder.

   把 `app/heroes` 中的文件和目录复制到新的 `crisis-center` 文件夹中。

* In the new files, change every mention of "hero" to "crisis", and "heroes" to "crises".

  在这些新建的文件中，把每个 "hero" 都改成 "crisis"，每个 "heroes" 都改成 "crises"。

* Rename the NgModule files to `crisis-center.module.ts` and `crisis-center-routing.module.ts`.

  把这些 NgModule 文件改名为 `crisis-center.module.ts` 和 `crisis-center-routing.module.ts`。

Use mock crises instead of mock heroes:

使用 mock 的 crises 来代替 mock 的 heroes：

<code-example path="router/src/app/crisis-center/mock-crises.ts" header="src/app/crisis-center/mock-crises.ts"></code-example>

The resulting crisis center is a foundation for introducing a new concept&mdash;child routing.
You can leave Heroes in its current state as a contrast with the Crisis Center.

最终的危机中心可以作为引入子路由这个新概念的基础。
你可以把英雄管理保持在当前状态，以便和*危机中心*进行对比。

<div class="alert is-helpful">

In keeping with the <a href="https://blog.8thlight.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html" title="Separation of Concerns">Separation of Concerns principle</a>, changes to the Crisis Center don't affect the `AppModule` or any other feature's component.

遵循<a href="https://blog.8thlight.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html" target="_blank" title="Separation of Concerns">*关注点分离（Separation of Concerns）*原则</a>，
对*危机中心*的修改不会影响 `AppModule` 或其它特性模块中的组件。

</div>

{@a crisis-child-routes}

### A crisis center with child routes

### 带有子路由的危机中心

This section shows you how to organize the crisis center to conform to the following recommended pattern for Angular applications:

本节会展示如何组织危机中心，来满足 Angular 应用所推荐的模式：

* Each feature area resides in its own folder.

   把每个特性放在自己的目录中。

* Each feature has its own Angular feature module.

   每个特性都有自己的 Angular 特性模块。

* Each area has its own area root component.

   每个特性区都有自己的根组件。

* Each area root component has its own router outlet and child routes.

   每个特性区的根组件中都有自己的路由出口及其子路由。

* Feature area routes rarely (if ever) cross with routes of other features.

   特性区的路由很少（或完全不）与其它特性区的路由交叉。

If your app had many feature areas, the app component trees might look like this:

如果你还有更多特性区，它们的组件树是这样的：

<div class="lightbox">
  <img src='generated/images/guide/router/component-tree.png' alt="Component Tree">
</div>

{@a child-routing-component}

### Child routing component

### 子路由组件

Generate a `CrisisCenter` component in the `crisis-center` folder:

在 `crisis-center` 目录下生成一个 `CrisisCenter` 组件：

<code-example language="none" class="code-shell">
  ng generate component crisis-center/crisis-center
</code-example>

Update the component template with the following markup:

使用如下代码更新组件模板：

<code-example path="router/src/app/crisis-center/crisis-center/crisis-center.component.html" header="src/app/crisis-center/crisis-center/crisis-center.component.html"></code-example>

The `CrisisCenterComponent` has the following in common with the `AppComponent`:

`CrisisCenterComponent` 和 `AppComponent` 有下列共同点：

* It is the root of the crisis center area, just as `AppComponent` is the root of the entire application.

   它是危机中心特性区的*根*，正如 `AppComponent` 是整个应用的根。

* It is a shell for the crisis management feature area, just as the `AppComponent` is a shell to manage the high-level workflow.

   它是危机管理特性区的壳，正如 `AppComponent` 是管理高层工作流的壳。

Like most shells, the `CrisisCenterComponent` class is minimal because it has no business logic, and its template has no links, just a title and `<router-outlet>` for the crisis center child component.

就像大多数的壳一样，`CrisisCenterComponent` 类是最小化的，因为它没有业务逻辑，它的模板中没有链接，只有一个标题和用于放置危机中心的子组件的 `<router-outlet>`。

{@a child-route-config}

### Child route configuration

### 子路由配置

As a host page for the "Crisis Center" feature, generate a `CrisisCenterHome` component in the `crisis-center` folder.

在 `crisis-center` 目录下生成一个 `CrisisCenterHome` 组件，作为 "危机中心" 特性的宿主页面。

<code-example language="none" class="code-shell">
  ng generate component crisis-center/crisis-center-home
</code-example>

Update the template with a welcome message to the `Crisis Center`.

用一条欢迎信息修改 `Crisis Center` 中的模板。

<code-example path="router/src/app/crisis-center/crisis-center-home/crisis-center-home.component.html" header="src/app/crisis-center/crisis-center-home/crisis-center-home.component.html"></code-example>

Update the `crisis-center-routing.module.ts` you renamed after copying it from `heroes-routing.module.ts` file.
This time, you define child routes within the parent `crisis-center` route.

把 `heroes-routing.module.ts` 文件复制过来，改名为 `crisis-center-routing.module.ts`，并修改它。
这次你要把子路由定义在父路由 `crisis-center` 中。

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.1.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (Routes)" region="routes"></code-example>

Notice that the parent `crisis-center` route has a `children` property with a single route containing the `CrisisListComponent`.
The `CrisisListComponent` route also has a `children` array with two routes.

注意，父路由 `crisis-center` 有一个 `children` 属性，它有一个包含 `CrisisListComponent` 的路由。
`CrisisListModule` 路由还有一个带两个路由的 `children` 数组。

These two routes navigate to the crisis center child components,
`CrisisCenterHomeComponent` and `CrisisDetailComponent`, respectively.

这两个路由分别导航到了*危机中心*的两个子组件：`CrisisCenterHomeComponent` 和 `CrisisDetailComponent`。

There are important differences in the way the router treats child routes.

对这些子路由的处理中有一些重要的差异。

The router displays the components of these routes in the `RouterOutlet` of the `CrisisCenterComponent`, not in the `RouterOutlet` of the `AppComponent` shell.

路由器会把这些路由对应的组件放在 `CrisisCenterComponent` 的 `RouterOutlet` 中，而不是 `AppComponent` 壳组件中的。

The `CrisisListComponent` contains the crisis list and a `RouterOutlet` to display the `Crisis Center Home` and `Crisis Detail` route components.

`CrisisListComponent` 包含危机列表和一个 `RouterOutlet`，用以显示 `Crisis Center Home` 和 `Crisis Detail` 这两个路由组件。

The `Crisis Detail` route is a child of the `Crisis List`.
The router [reuses components](#reuse) by default, so the `Crisis Detail` component will be re-used as you select different crises.
In contrast, back in the `Hero Detail` route, [the component was recreated](#snapshot-the-no-observable-alternative) each time you selected a different hero from the list of heroes.

`Crisis Detail` 路由是 `Crisis List` 的子路由。由于路由器默认会[复用组件](#reuse)，因此当你选择了另一个危机时，`CrisisDetailComponent` 会被复用。 
作为对比，回头看看 `Hero Detail` 路由，每当你从列表中选择了不同的英雄时，[都会重新创建该组件](#snapshot-the-no-observable-alternative)。

At the top level, paths that begin with `/` refer to the root of the application.
But child routes extend the path of the parent route.
With each step down the route tree,
you add a slash followed by the route path, unless the path is empty.

在顶层，以 `/` 开头的路径指向的总是应用的根。
但这里是子路由。
它们是在父路由路径的基础上做出的扩展。
在路由树中每深入一步，你就会在该路由的路径上添加一个斜线 `/`（除非该路由的路径是空的）。

Apply that logic to navigation within the crisis center for which the parent path is `/crisis-center`.

如果把该逻辑应用到危机中心中的导航，那么父路径就是 `/crisis-center`。

* To navigate to the `CrisisCenterHomeComponent`, the full URL is `/crisis-center` (`/crisis-center` + `''` + `''`).

   要导航到 `CrisisCenterHomeComponent`，完整的 URL 是 `/crisis-center` (`/crisis-center` + `''` + `''`)。

* To navigate to the `CrisisDetailComponent` for a crisis with `id=2`, the full URL is
  `/crisis-center/2` (`/crisis-center` + `''` +  `'/2'`).

   要导航到 `CrisisDetailComponent` 以展示 `id=2` 的危机，完整的 URL 是 `/crisis-center/2` (`/crisis-center` + `''` + `'/2'`)。

The absolute URL for the latter example, including the `localhost` origin, is as follows:

本例子中包含站点部分的绝对 URL，就是：

<code-example>
  localhost:4200/crisis-center/2

</code-example>

Here's the complete `crisis-center-routing.module.ts` file with its imports.

这里是完整的 `crisis-center.routing.ts` 及其导入语句。

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.1.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (excerpt)"></code-example>

{@a import-crisis-module}

### Import crisis center module into the `AppModule` routes

### 把危机中心模块导入到 `AppModule` 的路由中

As with the `HeroesModule`, you must add the `CrisisCenterModule` to the `imports` array of the `AppModule`
_before_ the `AppRoutingModule`:

就像 `HeroesModule` 模块中一样，你必须把 `CrisisCenterModule` 添加到 `AppModule` 的 `imports` 数组中，就在 `AppRoutingModule` *前面*：

<code-tabs>

  <code-pane path="router/src/app/crisis-center/crisis-center.module.ts"header="src/app/crisis-center/crisis-center.module.ts">

  </code-pane>

  <code-pane path="router/src/app/app.module.4.ts" header="src/app/app.module.ts (import CrisisCenterModule)" region="crisis-center-module">

  </code-pane>

</code-tabs>

Remove the initial crisis center route from the `app-routing.module.ts` because now the `HeroesModule` and the `CrisisCenter` modules provide teh feature routes.

从 `app.routing.ts` 中移除危机中心的初始路由。
因为现在是 `HeroesModule` 和 `CrisisCenter` 模块提供了这些特性路由。

The `app-routing.module.ts` file retains the top-level application routes such as the default and wildcard routes.

`app-routing.module.ts` 文件中只有应用的顶层路由，比如默认路由和通配符路由。

<code-example path="router/src/app/app-routing.module.3.ts" header="src/app/app-routing.module.ts (v3)" region="v3"></code-example>

{@a relative-navigation}

### Relative navigation

### 相对导航

While building out the crisis center feature, you navigated to the
crisis detail route using an absolute path that begins with a slash.

虽然构建出了危机中心特性区，你却仍在使用以斜杠开头的**绝对路径**来导航到危机详情的路由。

The router matches such absolute paths to routes starting from the top of the route configuration.

路由器会从路由配置的顶层来匹配像这样的绝对路径。

You could continue to use absolute paths like this to navigate inside the Crisis Center feature, but that pins the links to the parent routing structure.
If you changed the parent `/crisis-center` path, you would have to change the link parameters array.

你固然可以继续像危机中心特性区一样使用绝对路径，但是那样会把链接钉死在特定的父路由结构上。
如果你修改了父路径 `/crisis-center`，那就不得不修改每一个链接参数数组。

You can free the links from this dependency by defining paths that are relative to the current URL segment.
Navigation within the feature area remains intact even if you change the parent route path to the feature.

通过改成定义*相对于*当前 URL 的路径，你可以把链接从这种依赖中解放出来。
当你修改了该特性区的父路由路径时，该特性区内部的导航仍然完好无损。

<div class="alert is-helpful">

The router supports directory-like syntax in a _link parameters list_ to help guide route name lookup:

路由器支持在*链接参数数组*中使用“目录式”语法来为查询路由名提供帮助：

`./` or `no leading slash` is relative to the current level.

`./` 或 ` 无前导斜线 ` 形式是相对于当前级别的。

`../` to go up one level in the route path.

`../` 会回到当前路由路径的上一级。

You can combine relative navigation syntax with an ancestor path.
If you must navigate to a sibling route, you could use the `../<sibling>` convention to go up
one level, then over and down the sibling route path.

你可以把相对导航语法和一个祖先路径组合起来用。
如果不得不导航到一个兄弟路由，你可以用 `../<sibling>` 来回到上一级，然后进入兄弟路由路径中。

</div>

To navigate a relative path with the `Router.navigate` method, you must supply the `ActivatedRoute`
to give the router knowledge of where you are in the current route tree.

用 `Router.navigate` 方法导航到相对路径时，你必须提供当前的 `ActivatedRoute`，来让路由器知道你现在位于路由树中的什么位置。

After the _link parameters array_, add an object with a `relativeTo` property set to the `ActivatedRoute`.
The router then calculates the target URL based on the active route's location.

在*链接参数数组*后面，添加一个带有 `relativeTo` 属性的对象，并把它设置为当前的 `ActivatedRoute`。
这样路由器就会基于当前激活路由的位置来计算出目标 URL。

<div class="alert is-helpful">

Always specify the complete absolute path when calling router's `navigateByUrl()` method.

当调用路由器的 `navigateByUrl()` 时，**总是**要指定完整的绝对路径。

</div>

{@a nav-to-crisis}

### Navigate to crisis list with a relative URL

### 使用相对 URL 导航到危机列表

You've already injected the `ActivatedRoute` that you need to compose the relative navigation path.

你已经注入了组成相对导航路径所需的 `ActivatedRoute`。

When using a `RouterLink` to navigate instead of the `Router` service, you'd use the same link parameters array, but you wouldn't provide the object with the `relativeTo` property.
The `ActivatedRoute` is implicit in a `RouterLink` directive.

如果用 `RouterLink` 来代替 `Router` 服务进行导航，就要使用相同的链接参数数组，不过不再需要提供 `relativeTo` 属性。
`ActivatedRoute` 已经隐含在了 `RouterLink` 指令中。

Update the `gotoCrises()` method of the `CrisisDetailComponent` to navigate back to the Crisis Center list using relative path navigation.

修改 `CrisisDetailComponent` 的 `gotoCrises()` 方法，来使用相对路径返回*危机中心*列表。

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (relative navigation)" region="gotoCrises-navigate"></code-example>

Notice that the path goes up a level using the `../` syntax.
If the current crisis `id` is `3`, the resulting path back to the crisis list is  `/crisis-center/;id=3;foo=foo`.

注意这个路径使用了 `../` 语法返回上一级。
如果当前危机的 `id` 是 `3`，那么最终返回到的路径就是 `/crisis-center/;id=3;foo=foo`。

{@a named-outlets}

### Displaying multiple routes in named outlets

### 用命名出口（outlet）显示多重路由

You decide to give users a way to contact the crisis center.
When a user clicks a "Contact" button, you want to display a message in a popup view.

你决定给用户提供一种方式来联系危机中心。
当用户点击“Contact”按钮时，你要在一个弹出框中显示一条消息。

The popup should stay open, even when switching between pages in the application, until the user closes it
by sending the message or canceling.
Clearly you can't put the popup in the same outlet as the other pages.

即使在应用中的不同页面之间切换，这个弹出框也应该始终保持打开状态，直到用户发送了消息或者手动取消。
显然，你不能把这个弹出框跟其它放到页面放到同一个路由出口中。

Until now, you've defined a single outlet and you've nested child routes under that outlet to group routes together.
The router only supports one primary unnamed outlet per template.

迄今为止，你只定义过单路由出口，并且在其中嵌套了子路由以便对路由分组。
在每个模板中，路由器只能支持一个无名主路由出口。

A template can also have any number of named outlets.
Each named outlet has its own set of routes with their own components.
Multiple outlets can display different content, determined by different routes, all at the same time.

模板还可以有多个命名的路由出口。
每个命名出口都自己有一组带组件的路由。
多重出口可以在同一时间根据不同的路由来显示不同的内容。

Add an outlet named "popup" in the `AppComponent`, directly below the unnamed outlet.

在 `AppComponent` 中添加一个名叫“popup”的出口，就在无名出口的下方。

<code-example path="router/src/app/app.component.4.html" header="src/app/app.component.html (outlets)" region="outlets"></code-example>

That's where a popup will go, once you learn how to route a popup component to it.

一旦你学会了如何把一个弹出框组件路由到该出口，那里就是将会出现弹出框的地方。

{@a secondary-routes}

#### Secondary routes

#### 第二路由

Named outlets are the targets of  _secondary routes_.

命名出口是*第二路由*的目标。

Secondary routes look like primary routes and you configure them the same way.
They differ in a few key respects.

第二路由很像主路由，配置方式也一样。它们只有一些关键的不同点：

* They are independent of each other.

   它们彼此互不依赖。

* They work in combination with other routes.

   它们与其它路由组合使用。

* They are displayed in named outlets.

   它们显示在命名出口中。

Generate a new component to compose the message.

生成一个新的组件来组合这个消息。

<code-example language="none" class="code-shell">
  ng generate component compose-message
</code-example>

It displays a short form with a header, an input box for the message,
and two buttons, "Send" and "Cancel".

它显示一个简单的表单，包括一个头、一个消息输入框和两个按钮：“Send”和“Cancel”。

<div class="lightbox">
  <img src='generated/images/guide/router/contact-popup.png' alt="Contact popup">
</div>

Here's the component, its template and styles:

下面是该组件及其模板和样式：

<code-tabs>

  <code-pane header="src/app/compose-message/compose-message.component.css" path="router/src/app/compose-message/compose-message.component.css">

  </code-pane>

  <code-pane header="src/app/compose-message/compose-message.component.html" path="router/src/app/compose-message/compose-message.component.html">

  </code-pane>

  <code-pane header="src/app/compose-message/compose-message.component.ts" path="router/src/app/compose-message/compose-message.component.ts">

  </code-pane>

</code-tabs>

It looks similar to any other component in this guide, but there are two key differences.

它看起来几乎和你以前见过其它组件一样，但有两个值得注意的区别。

Note that the `send()` method simulates latency by waiting a second before "sending" the message and closing the popup.

注意，`send()` 方法在发送消息和关闭弹出框之前通过等待模拟了一秒钟的延迟。

The `closePopup()` method closes the popup view by navigating to the popup outlet with a `null` which the section on [clearing secondary routes](#clear-secondary-routes) covers.

`closePopup()` 方法用把 `popup` 出口导航到 `null` 的方式关闭了弹出框，它在[稍后的部分](guide/router#clear-secondary-routes)有讲解。

{@a add-secondary-route}

#### Add a secondary route

#### 添加第二路由

Open the `AppRoutingModule` and add a new `compose` route to the `appRoutes`.

打开 `AppRoutingModule`，并把一个新的 `compose` 路由添加到 `appRoutes` 中。

<code-example path="router/src/app/app-routing.module.3.ts" header="src/app/app-routing.module.ts (compose route)" region="compose"></code-example>

In addition to the `path` and `component` properties, there's a new property called `outlet`, which is set to `'popup'`.
This route now targets the popup outlet and the `ComposeMessageComponent` will display there.

除了 `path` 和 `component` 属性之外还有一个新的属性 `outlet`，它被设置成了 `'popup'`。
这个路由现在指向了 `popup` 出口，而 `ComposeMessageComponent` 也将显示在那里。

To give users a way to open the popup, add a "Contact" link to the `AppComponent` template.

为了给用户某种途径来打开这个弹出框，还要往 `AppComponent` 模板中添加一个“Contact”链接。

<code-example path="router/src/app/app.component.4.html" header="src/app/app.component.html (contact-link)" region="contact-link"></code-example>

Although the `compose` route is configured to the "popup" outlet, that's not sufficient for connecting the route to a `RouterLink` directive.
You have to specify the named outlet in a _link parameters array_ and bind it to the `RouterLink` with a property binding.

虽然 `compose` 路由被配置到了 `popup` 出口上，但这仍然不足以把该路由和 `RouterLink` 指令联系起来。
你还要在*链接参数数组*中指定这个命名出口，并通过属性绑定的形式把它绑定到 `RouterLink` 上。

The _link parameters array_ contains an object with a single `outlets` property whose value is another object keyed by one (or more) outlet names.
In this case there is only the "popup" outlet property and its value is another _link parameters array_ that specifies the `compose` route.

*链接参数数组*包含一个只有一个 `outlets` 属性的对象，它的值是另一个对象，这个对象以一个或多个路由的出口名作为属性名。
在这里，它只有一个出口名“popup”，它的值则是另一个*链接参数数组*，用于指定 `compose` 路由。

In other words, when the user clicks this link, the router displays the component associated with the `compose` route in the `popup` outlet.

换句话说，当用户点击此链接时，路由器会在路由出口 `popup` 中显示与 `compose` 路由相关联的组件。

<div class="alert is-helpful">

This `outlets` object within an outer object was unnecessary when there was only one route and one unnamed outlet.

当只需要考虑一个路由和一个无名出口时，外部对象中的这个 `outlets` 对象是完全不必要的。

The router assumed that your route specification targeted the unnamed primary outlet and created these objects for you.

路由器假设这个路由指向了无名的主出口，并为你创建这些对象。

Routing to a named outlet has revealed a router feature:
you can target multiple outlets with multiple routes in the same `RouterLink` directive.

路由到一个命名出口会揭示一个路由特性：
你可以在同一个 `RouterLink` 指令中为多个路由出口指定多个路由。

</div>

{@a secondary-route-navigation}

#### Secondary route navigation: merging routes during navigation

#### 第二路由导航：在导航期间合并路由

Navigate to the _Crisis Center_ and click "Contact".
you should see something like the following URL in the browser address bar.

导航到*危机中心*并点击“Contact”，你将会在浏览器的地址栏看到如下 URL：

<code-example>
  http://.../crisis-center(popup:compose)

</code-example>

The relevant part of the URL follows the `...`:

这个 URL 中有意义的部分是 `...` 后面的这些：

* The `crisis-center` is the primary navigation.

   `crisis-center` 是主导航。

* Parentheses surround the secondary route.

   圆括号包裹的部分是第二路由。

* The secondary route consists of an outlet name (`popup`), a `colon` separator, and the secondary route path (`compose`).

   第二路由包括一个出口名称（`popup`）、一个冒号分隔符和第二路由的路径（`compose`）。

Click the _Heroes_ link and look at the URL again.

点击 _Heroes_ 链接，并再次查看 URL：

<code-example>
  http://.../heroes(popup:compose)
</code-example>

The primary navigation part has changed; the secondary route is the same.

主导航的部分变化了，而第二路由没有变。

The router is keeping track of two separate branches in a navigation tree and generating a representation of that tree in the URL.

路由器在导航树中对两个独立的分支保持追踪，并在 URL 中对这棵树进行表达。

You can add many more outlets and routes, at the top level and in nested levels, creating a navigation tree with many branches and the router will generate the URLs to go with it.

你还可以添加更多出口和更多路由（无论是在顶层还是在嵌套的子层）来创建一个带有多个分支的导航树。
路由器将会生成相应的 URL。

You can tell the router to navigate an entire tree at once by filling out the `outlets` object and then pass that object inside a _link parameters array_  to the `router.navigate` method.

通过像前面那样填充 `outlets` 对象，你可以告诉路由器立即导航到一棵完整的树。
然后把这个对象通过一个*链接参数数组*传给 `router.navigate` 方法。

{@a clear-secondary-routes}

#### Clearing secondary routes

#### 清除第二路由

Like regular outlets, secondary outlets persists until you navigate away to a new component.

像常规出口一样，二级出口会一直存在，直到你导航到新组件。

Each secondary outlet has its own navigation, independent of the navigation driving the primary outlet.
Changing a current route that displays in the primary outlet has no effect on the popup outlet.
That's why the popup stays visible as you navigate among the crises and heroes.

每个第二出口都有自己独立的导航，跟主出口的导航彼此独立。
修改主出口中的当前路由并不会影响到 `popup` 出口中的。
这就是为什么在危机中心和英雄管理之间导航时，弹出框始终都是可见的。

The `closePopup()` method again:

再看 `closePopup()` 方法：

<code-example path="router/src/app/compose-message/compose-message.component.ts" header="src/app/compose-message/compose-message.component.ts (closePopup)" region="closePopup"></code-example>

Clicking the "send" or "cancel" buttons clears the popup view.
The `closePopup()` function navigates imperatively with the `Router.navigate()` method, passing in a [link parameters array](#link-parameters-array).

单击 “send” 或 “cancel” 按钮可以清除弹出视图。`closePopup()` 函数会使用 `Router.navigate()` 方法强制导航，并传入一个[链接参数数组](#link-parameters-array)。

Like the array bound to the _Contact_ `RouterLink` in the `AppComponent`, this one includes an object with an `outlets` property.
The `outlets` property value is another object with outlet names for keys.
The only named outlet is `'popup'`.

就像在 `AppComponent` 中绑定到的 _Contact_ `RouterLink` 一样，它也包含了一个带 `outlets` 属性的对象。
`outlets` 属性的值是另一个对象，该对象用一些出口名称作为属性名。
唯一的命名出口是 `'popup'`。

This time, the value of `'popup'` is `null`.
That's not a route, but it is a legitimate value.
Setting the popup `RouterOutlet` to `null` clears the outlet and removes the secondary popup route from the current URL.

但这次，`'popup'` 的值是 `null`。`null` 不是一个路由，但却是一个合法的值。
把 `popup` 这个 `RouterOutlet` 设置为 `null` 会清除该出口，并且从当前 URL 中移除第二路由 `popup`。

{@a guards}

{@a milestone-5-route-guards}

## Milestone 5: Route guards

## 里程碑 5：路由守卫

At the moment, any user can navigate anywhere in the application anytime, but sometimes you need to control access to different parts of your app for various reasons. Some of which may include the following:

现在，*任何用户*都能在*任何时候*导航到*任何地方*。但有时候出于种种原因需要控制对该应用的不同部分的访问。可能包括如下场景：

* Perhaps the user is not authorized to navigate to the target component.

   该用户可能无权导航到目标组件。

* Maybe the user must login (authenticate) first.

   可能用户得先登录（认证）。

* Maybe you should fetch some data before you display the target component.

   在显示目标组件前，你可能得先获取某些数据。

* You might want to save pending changes before leaving a component.

   在离开组件前，你可能要先保存修改。

* You might ask the user if it's OK to discard pending changes rather than save them.

   你可能要询问用户：你是否要放弃本次更改，而不用保存它们？

You add guards to the route configuration to handle these scenarios.

你可以往路由配置中添加守卫，来处理这些场景。

A guard's return value controls the router's behavior:

守卫返回一个值，以控制路由器的行为：

* If it returns `true`, the navigation process continues.

   如果它返回 `true`，导航过程会继续

* If it returns `false`, the navigation process stops and the user stays put.

   如果它返回 `false`，导航过程就会终止，且用户留在原地。

* If it returns a `UrlTree`, the current navigation cancels and a new navigation is initiated to the `UrlTree` returned.

  如果它返回 `UrlTree`，则取消当前的导航，并且开始导航到返回的这个 `UrlTree`.

<div class="alert is-helpful">

**Note:** The guard can also tell the router to navigate elsewhere, effectively canceling the current navigation.
When doing so inside a guard, the guard should return `false`;

**注意**：守卫还可以告诉路由器导航到别处，这样也会取消当前的导航。要想在守卫中这么做，就要返回 `false`；

</div>

The guard might return its boolean answer synchronously.
But in many cases, the guard can't produce an answer synchronously.
The guard could ask the user a question, save changes to the server, or fetch fresh data.
These are all asynchronous operations.

守卫可以用同步的方式返回一个布尔值。但在很多情况下，守卫无法用同步的方式给出答案。
守卫可能会向用户问一个问题、把更改保存到服务器，或者获取新数据，而这些都是异步操作。

Accordingly, a routing guard can return an `Observable<boolean>` or a `Promise<boolean>` and the
router will wait for the observable to resolve to `true` or `false`.

因此，路由的守卫可以返回一个 `Observable<boolean>` 或 `Promise<boolean>`，并且路由器会等待这个可观察对象被解析为 `true` 或 `false`。

<div class="alert is-critical">

**Note:** The observable provided to the `Router` must also complete. If the observable does not complete, the navigation does not continue.

**注意：** 提供给 `Router` 的可观察对象还*必须*能结束（complete）。否则，导航就不会继续。

</div>

The router supports multiple guard interfaces:

路由器可以支持多种守卫接口：

* [`CanActivate`](api/router/CanActivate) to mediate navigation *to* a route.

   用[`CanActivate`](api/router/CanActivate)来处理导航*到*某路由的情况。

* [`CanActivateChild`](api/router/CanActivateChild) to mediate navigation *to* a child route.

   用[`CanActivateChild`](api/router/CanActivateChild)来处理导航*到*某子路由的情况。

* [`CanDeactivate`](api/router/CanDeactivate) to mediate navigation *away* from the current route.

   用[`CanDeactivate`](api/router/CanDeactivate)来处理从当前路由*离开*的情况.

* [`Resolve`](api/router/Resolve) to perform route data retrieval *before* route activation.

   用[`Resolve`](api/router/Resolve)在路由激活*之前*获取路由数据。

* [`CanLoad`](api/router/CanLoad) to mediate navigation *to* a feature module loaded *asynchronously*.

   用[`CanLoad`](api/router/CanLoad)来处理*异步*导航到某特性模块的情况。

You can have multiple guards at every level of a routing hierarchy.
The router checks the `CanDeactivate` and `CanActivateChild` guards first, from the deepest child route to the top.
Then it checks the `CanActivate` guards from the top down to the deepest child route.
If the feature module is loaded asynchronously, the `CanLoad` guard is checked before the module is loaded.
If _any_ guard returns false, pending guards that have not completed will be canceled, and the entire navigation is canceled.

在分层路由的每个级别上，你都可以设置多个守卫。
路由器会先按照从最深的子路由由下往上检查的顺序来检查 `CanDeactivate()` 和 `CanActivateChild()` 守卫。
然后它会按照从上到下的顺序检查 `CanActivate()` 守卫。
如果特性模块是异步加载的，在加载它之前还会检查 `CanLoad()` 守卫。
如果*任何*一个守卫返回 `false`，其它尚未完成的守卫会被取消，这样整个导航就被取消了。

There are several examples over the next few sections.

接下来的小节中有一些例子。

{@a can-activate-guard}

### `CanActivate`: requiring authentication

### `CanActivate` ：需要身份验证

Applications often restrict access to a feature area based on who the user is.
You could permit access only to authenticated users or to users with a specific role.
You might block or limit access until the user's account is activated.

应用程序通常会根据访问者来决定是否授予某个特性区的访问权。
你可以只对已认证过的用户或具有特定角色的用户授予访问权，还可以阻止或限制用户访问权，直到用户账户激活为止。

The `CanActivate` guard is the tool to manage these navigation business rules.

`CanActivate` 守卫是一个管理这些导航类业务规则的工具。

#### Add an admin feature module

#### 添加一个“管理”特性模块

This section guides you through extending the crisis center with some new administrative features.
Start by adding a new feature module named `AdminModule`.

本节将指导你使用一些新的管理功能来扩展危机中心。首先添加一个名为 `AdminModule` 的新特性模块。

Generate an `admin` folder with a feature module file and a routing configuration file.

生成一个带有特性模块文件和路由配置文件的 `admin` 目录。

<code-example language="none" class="code-shell">
  ng generate module admin --routing
</code-example>

Next, generate the supporting components.

接下来，生成一些支持性组件。

<code-example language="none" class="code-shell">
  ng generate component admin/admin-dashboard
</code-example>

<code-example language="none" class="code-shell">
  ng generate component admin/admin
</code-example>

<code-example language="none" class="code-shell">
  ng generate component admin/manage-crises
</code-example>

<code-example language="none" class="code-shell">
  ng generate component admin/manage-heroes
</code-example>

The admin feature file structure looks like this:

管理特性区的文件是这样的：

<div class='filetree'>

  <div class='file'>

    src/app/admin

  </div>

  <div class='children'>

    <div class='file'>
      admin
    </div>

      <div class='children'>

        <div class='file'>
          admin.component.css
        </div>

        <div class='file'>
          admin.component.html
        </div>

        <div class='file'>
          admin.component.ts
        </div>

      </div>

    <div class='file'>
      admin-dashboard
    </div>

      <div class='children'>

        <div class='file'>
          admin-dashboard.component.css
        </div>

        <div class='file'>
          admin-dashboard.component.html
        </div>

        <div class='file'>
          admin-dashboard.component.ts
        </div>

      </div>

    <div class='file'>
      manage-crises
    </div>

      <div class='children'>

        <div class='file'>
          manage-crises.component.css
        </div>

        <div class='file'>
          manage-crises.component.html
        </div>

        <div class='file'>
          manage-crises.component.ts
        </div>

      </div>

    <div class='file'>
      manage-heroes
    </div>

      <div class='children'>

        <div class='file'>
          manage-heroes.component.css
        </div>

        <div class='file'>
          manage-heroes.component.html
        </div>

        <div class='file'>
          manage-heroes.component.ts
        </div>

      </div>

    <div class='file'>
      admin.module.ts
    </div>

    <div class='file'>
      admin-routing.module.ts
    </div>

  </div>

</div>

The admin feature module contains the `AdminComponent` used for routing within the
feature module, a dashboard route and two unfinished components to manage crises and heroes.

管理特性模块包含 `AdminComponent`，它用于在特性模块内的仪表盘路由以及两个尚未完成的用于管理危机和英雄的组件之间进行路由。

<code-tabs>

  <code-pane header="src/app/admin/admin/admin.component.html"  path="router/src/app/admin/admin/admin.component.html">

  </code-pane>

  <code-pane header="src/app/admin/admin-dashboard/admin-dashboard.component.html" path="router/src/app/admin/admin-dashboard/admin-dashboard.component.1.html">

  </code-pane>

  <code-pane header="src/app/admin/admin.module.ts" path="router/src/app/admin/admin.module.ts">

  </code-pane>

  <code-pane header="src/app/admin/manage-crises/manage-crises.component.html" path="router/src/app/admin/manage-crises/manage-crises.component.html">

  </code-pane>

  <code-pane header="src/app/admin/manage-heroes/manage-heroes.component.html"  path="router/src/app/admin/manage-heroes/manage-heroes.component.html">

  </code-pane>

</code-tabs>

<div class="alert is-helpful">

Although the admin dashboard `RouterLink` only contains a relative slash without an additional URL segment, it is a match to any route within the admin feature area.
You only want the `Dashboard` link to be active when the user visits that route.
Adding an additional binding to the `Dashboard` routerLink,`[routerLinkActiveOptions]="{ exact: true }"`, marks the `./` link as active when the user navigates to the `/admin` URL and not when navigating to any of the child routes.

虽然管理仪表盘中的 `RouterLink` 只包含一个没有其它 URL 段的斜杠 `/`，但它能匹配管理特性区下的任何路由。
但你只希望在访问 `Dashboard` 路由时才激活该链接。
往 `Dashboard` 这个 routerLink 上添加另一个绑定 `[routerLinkActiveOptions]="{ exact: true }"`，
这样就只有当用户导航到 `/admin` 这个 URL 时才会激活它，而不会在导航到它的某个子路由时。

</div>

{@a component-less-route}

##### Component-less route: grouping routes without a component

##### 无组件路由：分组路由，而不需要组件

The initial admin routing configuration:

最初的管理路由配置如下：

<code-example path="router/src/app/admin/admin-routing.module.1.ts" header="src/app/admin/admin-routing.module.ts (admin routing)" region="admin-routes"></code-example>

The child route under the `AdminComponent` has a `path` and a `children` property but it's not using a `component`.
This defines a _component-less_ route.

`AdminComponent` 下的子路由有一个 `path` 和一个 `children` 属性，但是它没有使用 `component`。这就定义了一个无*组件*路由。

To group the `Crisis Center` management routes under the `admin` path a component is unnecessary.
Additionally, a _component-less_ route makes it easier to [guard child routes](#can-activate-child-guard).

要把 `Crisis Center` 管理下的路由分组到 `admin` 路径下，组件是不必要的。此外，无*组件*路由可以更容易地[保护子路由](#can-activate-child-guard)。

Next, import the `AdminModule` into `app.module.ts` and add it to the `imports` array
to register the admin routes.

接下来，把 `AdminModule` 导入到 `app.module.ts` 中，并把它加入 `imports` 数组中来注册这些管理类路由。

<code-example path="router/src/app/app.module.4.ts" header="src/app/app.module.ts (admin module)" region="admin-module"></code-example>

Add an "Admin" link to the `AppComponent` shell so that users can get to this feature.

然后往壳组件 `AppComponent` 中添加一个链接，让用户能点击它，以访问该特性。

<code-example path="router/src/app/app.component.5.html" header="src/app/app.component.html (template)"></code-example>

{@a guard-admin-feature}

#### Guard the admin feature

#### 守护“管理特性”区

Currently, every route within the Crisis Center is open to everyone.
The new admin feature should be accessible only to authenticated users.

现在危机中心的每个路由都是对所有人开放的。这些新的管理特性应该只能被已登录用户访问。

Write a `canActivate()` guard method to redirect anonymous users to the
login page when they try to enter the admin area.

编写一个 `CanActivate()` 守卫，将正在尝试访问管理组件匿名用户重定向到登录页。

Generate an `AuthGuard` in the `auth` folder.

在 `auth` 文件夹中生成一个 `AuthGuard`。

<code-example language="none" class="code-shell">
  ng generate guard auth/auth
</code-example>

To demonstrate the fundamentals, this example only logs to the console, `returns` true immediately, and allows navigation to proceed:

为了演示这些基础知识，这个例子只把日志写到控制台中，立即 `return` true，并允许继续导航：

<code-example path="router/src/app/auth/auth.guard.1.ts" header="src/app/auth/auth.guard.ts (excerpt)"></code-example>

Next, open `admin-routing.module.ts`, import the `AuthGuard` class, and
update the admin route with a `canActivate` guard property that references it:

接下来，打开 `admin-routing.module.ts`，导入 `AuthGuard` 类，修改管理路由并通过 `CanActivate()` 守卫来引用 `AuthGuard`：

<code-example path="router/src/app/admin/admin-routing.module.2.ts" header="src/app/admin/admin-routing.module.ts (guarded admin route)" region="admin-route"></code-example>

The admin feature is now protected by the guard, but the guard requires more customization to work fully.

管理特性区现在受此守卫保护了，不过该守卫还需要做进一步定制。

{@a teach-auth}

#### Authenticate with `AuthGuard`

#### 通过 `AuthGuard` 验证

Make the `AuthGuard` mimic authentication.

让 `AuthGuard` 模拟身份验证。

The `AuthGuard` should call an application service that can login a user and retain information about the current user. Generate a new `AuthService` in the `auth` folder:

`AuthGuard` 可以调用应用中的一项服务，该服务能让用户登录，并且保存当前用户的信息。在 `admin` 目录下生成一个新的 `AuthService`：

<code-example language="none" class="code-shell">
  ng generate service auth/auth
</code-example>

Update the `AuthService` to log in the user:

修改 `AuthService` 以登入此用户：

<code-example path="router/src/app/auth/auth.service.ts" header="src/app/auth/auth.service.ts (excerpt)"></code-example>

Although it doesn't actually log in, it has an `isLoggedIn` flag to tell you whether the user is authenticated.
Its `login()` method simulates an API call to an external service by returning an observable that resolves successfully after a short pause.
The `redirectUrl` property stores the URL that the user wanted to access so you can navigate to it after authentication.

虽然不会真的进行登录，但它有一个 `isLoggedIn` 标志，用来标识是否用户已经登录过了。
它的 `login()` 方法会仿真一个对外部服务的 API 调用，返回一个可观察对象（observable）。在短暂的停顿之后，这个可观察对象就会解析成功。
`redirectUrl` 属性将会保存在用户要访问的 URL 中，以便认证完之后导航到它。

<div class="alert is-helpful">

To keep things minimal, this example redirects unauthenticated users to `/admin`.

为了保持最小化，这个例子会将未经身份验证的用户重定向到 `/admin`。

</div>

Revise the `AuthGuard` to call the `AuthService`.

修改 `AuthGuard` 以调用 `AuthService`。

<code-example path="router/src/app/auth/auth.guard.2.ts" header="src/app/auth/auth.guard.ts (v2)"></code-example>

Notice that you inject the `AuthService` and the `Router` in the constructor.
You haven't provided the `AuthService` yet but it's good to know that you can inject helpful services into routing guards.

注意，你把 `AuthService` 和 `Router` 服务注入到了构造函数中。
你还没有提供 `AuthService`，这里要说明的是：可以往路由守卫中注入有用的服务。

This guard returns a synchronous boolean result.
If the user is logged in, it returns true and the navigation continues.

该守卫返回一个同步的布尔值。如果用户已经登录，它就返回 `true`，导航会继续。

The `ActivatedRouteSnapshot` contains the _future_ route that will be activated and the `RouterStateSnapshot` contains the _future_ `RouterState` of the application, should you pass through the guard check.

这个 `ActivatedRouteSnapshot` 包含了*即将*被激活的路由，而 `RouterStateSnapshot` 包含了该应用*即将*到达的状态。
你应该通过守卫进行检查。

If the user is not logged in, you store the attempted URL the user came from using the `RouterStateSnapshot.url` and tell the router to redirect to a login page&mdash;a page you haven't created yet.
Returning a `UrlTree` tells the `Router` to cancel the current navigation and schedule a new one to redirect the user.

如果用户还没有登录，你就会用 `RouterStateSnapshot.url` 保存用户来自的 URL 并让路由器跳转到登录页（你尚未创建该页）。
这间接导致路由器自动中止了这次导航，`checkLogin()` 返回 `false` 并不是必须的，但这样可以更清楚的表达意图。

{@a add-login-component}

#### Add the `LoginComponent`

#### 添加 `LoginComponent`

You need a `LoginComponent` for the user to log in to the app. After logging in, you'll redirect to the stored URL if available, or use the default URL.
There is nothing new about this component or the way you use it in the router configuration.

你需要一个 `LoginComponent` 来让用户登录进这个应用。在登录之后，你就会跳转到前面保存的 URL，如果没有，就跳转到默认 URL。
  该组件没有什么新内容，你在路由配置中使用它的方式也没什么新意。

<code-example language="none" class="code-shell">
  ng generate component auth/login
</code-example>

Register a `/login` route in the `auth/auth-routing.module.ts`.
In `app.module.ts`, import and add the `AuthModule` to the `AppModule` imports.

在 `auth/auth-routing.module.ts` 文件中注册一个 `/login` 路由。在 `app.module.ts` 中，导入 `AuthModule` 并且添加到 `AppModule` 的 `imports` 中。

<code-tabs>

  <code-pane header="src/app/app.module.ts" path="router/src/app/app.module.ts" region="auth">

  </code-pane>

  <code-pane header="src/app/auth/login/login.component.html" path="router/src/app/auth/login/login.component.html">

  </code-pane>

  <code-pane header="src/app/auth/login/login.component.ts" path="router/src/app/auth/login/login.component.1.ts">

  </code-pane>

  <code-pane header="src/app/auth/auth.module.ts" path="router/src/app/auth/auth.module.ts">

  </code-pane>

</code-tabs>

{@a can-activate-child-guard}

### `CanActivateChild`: guarding child routes

### `CanActivateChild`：保护子路由

You can also protect child routes with the `CanActivateChild` guard.
The `CanActivateChild` guard is similar to the `CanActivate` guard.
The key difference is that it runs before any child route is activated.

你还可以使用 `CanActivateChild` 守卫来保护子路由。
`CanActivateChild` 守卫和 `CanActivate` 守卫很像。
它们的区别在于，`CanActivateChild` 会在*任何子路由*被激活之前运行。

You protected the admin feature module from unauthorized access.
You should also protect child routes _within_ the feature module.

你要保护管理特性模块，防止它被非授权访问，还要保护这个特性模块*内部*的那些子路由。

Extend the `AuthGuard` to protect when navigating between the `admin` routes.
Open `auth.guard.ts` and add the `CanActivateChild` interface to the imported tokens from the router package.

扩展 `AuthGuard` 以便在 `admin` 路由之间导航时提供保护。
打开 `auth.guard.ts` 并从路由库中导入 `CanActivateChild` 接口。

Next, implement the `canActivateChild()` method which takes the same arguments as the `canActivate()` method: an `ActivatedRouteSnapshot` and `RouterStateSnapshot`.
The `canActivateChild()` method can return an `Observable<boolean|UrlTree>` or `Promise<boolean|UrlTree>` for async checks and a `boolean` or `UrlTree` for sync checks.
This one returns either `true` to allow the user to access the admin feature module or `UrlTree` to redirect the user to the login page instead:

接下来，实现 `CanActivateChild` 方法，它所接收的参数与 `CanActivate` 方法一样：一个 `ActivatedRouteSnapshot` 和一个 `RouterStateSnapshot`。
`CanActivateChild` 方法可以返回 `Observable<boolean|UrlTree>` 或 `Promise<boolean|UrlTree>` 来支持异步检查，或 `boolean` 或 `UrlTree` 来支持同步检查。
这里返回的或者是 `true` 以便允许用户访问管理特性模块，或者是 `UrlTree` 以便把用户重定向到登录页：

<code-example path="router/src/app/auth/auth.guard.3.ts" header="src/app/auth/auth.guard.ts (excerpt)" region="can-activate-child"></code-example>

Add the same `AuthGuard` to the `component-less` admin route to protect all other child routes at one time
instead of adding the `AuthGuard` to each route individually.

同样把这个 `AuthGuard` 添加到“无组件的”管理路由，来同时保护它的所有子路由，而不是为每个路由单独添加这个 `AuthGuard`。

<code-example path="router/src/app/admin/admin-routing.module.3.ts" header="src/app/admin/admin-routing.module.ts (excerpt)" region="can-activate-child"></code-example>

{@a can-deactivate-guard}

### `CanDeactivate`: handling unsaved changes

### `CanDeactivate`：处理未保存的更改

Back in the "Heroes" workflow, the app accepts every change to a hero immediately without validation.

回到 “Heroes” 工作流，该应用会立即接受对英雄的每次更改，而不进行验证。

In the real world, you might have to accumulate the users changes, validate across fields, validate on the server, or hold changes in a pending state until the user confirms them as a group or cancels and reverts all changes.

在现实世界，你可能不得不积累来自用户的更改，跨字段验证，在服务器上验证，或者把变更保持在待定状态，直到用户确认这一组字段或取消并还原所有变更为止。

When the user navigates away, you can let the user decide what to do with unsaved changes.
If the user cancels, you'll stay put and allow more changes.
If the user approves, the app can save.

当用户要导航离开时，你可以让用户自己决定该怎么处理这些未保存的更改。
如果用户选择了取消，你就留下来，并允许更多改动。
如果用户选择了确认，那就进行保存。

You still might delay navigation until the save succeeds.
If you let the user move to the next screen immediately and saving were to fail (perhaps the data is ruled invalid), you would lose the context of the error.

在保存成功之前，你还可以继续推迟导航。如果你让用户立即移到下一个界面，而保存却失败了（可能因为数据不符合有效性规则），你就会丢失该错误的上下文环境。

You need to stop the navigation while you wait, asynchronously, for the server to return with its answer.

你需要用异步的方式等待，在服务器返回答复之前先停止导航。

The `CanDeactivate` guard helps you decide what to do with unsaved changes and how to proceed.

`CanDeactivate` 守卫能帮助你决定如何处理未保存的更改，以及如何处理。

{@a cancel-save}

#### Cancel and save

#### 取消与保存

Users update crisis information in the `CrisisDetailComponent`.
Unlike the `HeroDetailComponent`, the user changes do not update the crisis entity immediately.
Instead, the app updates the entity when the user presses the Save button and discards the changes when the user presses the Cancel button.

用户在 `CrisisDetailComponent` 中更新危机信息。
与 `HeroDetailComponent` 不同，用户的改动不会立即更新危机的实体对象。当用户按下了 Save 按钮时，应用就更新这个实体对象；如果按了 Cancel 按钮，那就放弃这些更改。

Both buttons navigate back to the crisis list after save or cancel.

这两个按钮都会在保存或取消之后导航回危机列表。

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (cancel and save methods)" region="cancel-save"></code-example>

In this scenario, the user could click the heroes link, cancel, push the browser back button, or navigate away without saving.

在这种情况下，用户可以点击 heroes 链接，取消，按下浏览器后退按钮，或者不保存就离开。

This example app asks the user to be explicit with a confirmation dialog box that waits asynchronously for the user's
response.

这个示例应用会弹出一个确认对话框，它会异步等待用户的响应，等用户给出一个明确的答复。

<div class="alert is-helpful">

You could wait for the user's answer with synchronous, blocking code, however, the app is more responsive&mdash;and can do other work&mdash;by waiting for the user's answer asynchronously.

你也可以用同步的方式等用户的答复，阻塞代码。但如果能用异步的方式等待用户的答复，应用就会响应性更好，还能同时做别的事。

</div>

Generate a `Dialog` service to handle user confirmation.

生成一个 `Dialog` 服务，以处理用户的确认操作。

<code-example language="none" class="code-shell">
  ng generate service dialog
</code-example>

Add a `confirm()` method to the `DialogService` to prompt the user to confirm their intent.
The `window.confirm` is a blocking action that displays a modal dialog and waits for user interaction.

为 `DialogService` 添加一个 `confirm()` 方法，以提醒用户确认。`window.confirm` 是一个阻塞型操作，它会显示一个模态对话框，并等待用户的交互。

<code-example path="router/src/app/dialog.service.ts" header="src/app/dialog.service.ts"></code-example>

It returns an `Observable` that resolves when the user eventually decides what to do: either to discard changes and navigate away (`true`) or to preserve the pending changes and stay in the crisis editor (`false`).

它返回*observable*，当用户最终决定了如何去做时，它就会被*解析* —— 或者决定放弃更改直接导航离开（`true`），或者保留未完成的修改，留在危机编辑器中（`false`）。

{@a CanDeactivate}

Generate a guard that checks for the presence of a `canDeactivate()` method in a component&mdash;any component.

生成一个守卫（guard），以检查组件（任意组件均可）中是否存在 `canDeactivate()` 方法。

<code-example language="none" class="code-shell">
  ng generate guard can-deactivate
</code-example>

Paste the following code into your guard.

把下面的代码粘贴到守卫中。

<code-example path="router/src/app/can-deactivate.guard.ts" header="src/app/can-deactivate.guard.ts"></code-example>

While the guard doesn't have to know which component has a deactivate method, it can detect that the `CrisisDetailComponent` component has the `canDeactivate()` method and call it.
The guard not knowing the details of any component's deactivation method makes the guard reusable.

守卫不需要知道哪个组件有 `deactivate` 方法，它可以检测 `CrisisDetailComponent` 组件有没有 `canDeactivate()` 方法并调用它。守卫在不知道任何组件 `deactivate` 方法细节的情况下，就能让这个守卫重复使用。

Alternatively, you could make a component-specific `CanDeactivate` guard for the `CrisisDetailComponent`.
The `canDeactivate()` method provides you with the current instance of the `component`, the current `ActivatedRoute`, and `RouterStateSnapshot` in case you needed to access some external information.
This would be useful if you only wanted to use this guard for this component and needed to get the component's properties or confirm whether the router should allow navigation away from it.

另外，你也可以为 `CrisisDetailComponent` 创建一个特定的 `CanDeactivate` 守卫。
在需要访问外部信息时，`canDeactivate()` 方法为你提供了组件、`ActivatedRoute` 和 `RouterStateSnapshot` 的当前实例。
如果只想为这个组件使用该守卫，并且需要获取该组件属性或确认路由器是否允许从该组件导航出去时，这会非常有用。

<code-example path="router/src/app/can-deactivate.guard.1.ts" header="src/app/can-deactivate.guard.ts (component-specific)"></code-example>

Looking back at the `CrisisDetailComponent`, it implements the confirmation workflow for unsaved changes.

看看 `CrisisDetailComponent` 组件，它已经实现了对未保存的更改进行确认的工作流。

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (excerpt)" region="canDeactivate"></code-example>

Notice that the `canDeactivate()` method can return synchronously; it returns `true` immediately if there is no crisis or there are no pending changes.
But it can also return a `Promise` or an `Observable` and the router will wait for that to resolve to truthy (navigate) or falsy (stay on the current route).

注意，`canDeactivate()` 方法可以同步返回;如果没有危机，或者没有待处理的更改，它会立即返回 `true`。但它也能返回一个 `Promise` 或一个 `Observable`，路由器也会等待它解析为真值（导航）或伪造（停留在当前路由上）。

Add the `Guard` to the crisis detail route in `crisis-center-routing.module.ts` using the `canDeactivate` array property.

往 `crisis-center.routing.module.ts` 的危机详情路由中用 `canDeactivate` 数组添加一个 `Guard`（守卫）。

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.3.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (can deactivate guard)"></code-example>

Now you have given the user a safeguard against unsaved changes.

现在，你已经给了用户一个能保护未保存更改的安全守卫。

{@a Resolve}

{@a resolve-guard}

### _Resolve_: pre-fetching component data

### _Resolve_: 预先获取组件数据

In the `Hero Detail` and `Crisis Detail`, the app waited until the route was activated to fetch the respective hero or crisis.

在 `Hero Detail` 和 `Crisis Detail` 中，它们等待路由读取完对应的英雄和危机。

If you were using a real world API, there might be some delay before the data to display is returned from the server.
You don't want to display a blank component while waiting for the data.

如果你在使用真实 api，很有可能数据返回有延迟，导致无法即时显示。
在这种情况下，直到数据到达前，显示一个空的组件不是最好的用户体验。

To improve this behavior, you can pre-fetch data from the server using a resolver so it's ready the
moment the route is activated.
This also allows you to handle errors before routing to the component.
There's no point in navigating to a crisis detail for an `id` that doesn't have a record.
It'd be better to send the user back to the `Crisis List` that shows only valid crisis centers.

最好使用解析器预先从服务器上获取完数据，这样在路由激活的那一刻数据就准备好了。
还要在路由到此组件之前处理好错误。
但当某个 `id` 无法对应到一个危机详情时，就没办法处理它。
这时最好把用户带回到“危机列表”中，那里显示了所有有效的“危机”。

In summary, you want to delay rendering the routed component until all necessary data has been fetched.

总之，你希望的是只有当所有必要数据都已经拿到之后，才渲染这个路由组件。

{@a fetch-before-navigating}

#### Fetch data before navigating

#### 导航前预先加载路由信息

At the moment, the `CrisisDetailComponent` retrieves the selected crisis.
If the crisis is not found, the router navigates back to the crisis list view.

目前，`CrisisDetailComponent` 会接收选中的危机。
如果该危机没有找到，路由器就会导航回危机列表视图。

The experience might be better if all of this were handled first, before the route is activated.
A `CrisisDetailResolver` service could retrieve a `Crisis` or navigate away, if the `Crisis` did not exist, _before_ activating the route and creating the `CrisisDetailComponent`.

如果能在该路由将要激活时提前处理了这个问题，那么用户体验会更好。
`CrisisDetailResolver` 服务可以接收一个 `Crisis`，而如果这个 `Crisis` 不存在，就会在激活该路由并创建 `CrisisDetailComponent` 之前先行离开。

Generate a `CrisisDetailResolver` service file within the `Crisis Center` feature area.

在 `Crisis Center` 特性区生成一个 `CrisisDetailResolver` 服务文件。

<code-example language="none" class="code-shell">
  ng generate service crisis-center/crisis-detail-resolver
</code-example>

<code-example path="router/src/app/crisis-center/crisis-detail-resolver.service.1.ts" header="src/app/crisis-center/crisis-detail-resolver.service.ts (generated)"></code-example>

Move the relevant parts of the crisis retrieval logic in `CrisisDetailComponent.ngOnInit()` into the `CrisisDetailResolverService`.
Import the `Crisis` model, `CrisisService`, and the `Router` so you can navigate elsewhere if you can't fetch the crisis.

把 `CrisisDetailComponent.ngOnInit()` 中与危机检索有关的逻辑移到 `CrisisDetailResolverService` 中。
导入 `Crisis` 模型、`CrisisService` 和 `Router` 以便让你可以在找不到指定的危机时导航到别处。

Be explicit and implement the `Resolve` interface with a type of `Crisis`.

为了更明确一点，可以实现一个带有 `Crisis` 类型的 `Resolve` 接口。

Inject the `CrisisService` and `Router` and implement the `resolve()` method.
That method could return a `Promise`, an `Observable`, or a synchronous return value.

注入 `CrisisService` 和 `Router`，并实现 `resolve()` 方法。
该方法可以返回一个 `Promise`、一个 `Observable` 来支持异步方式，或者直接返回一个值来支持同步方式。

The `CrisisService.getCrisis()` method returns an observable in order to prevent the route from loading until the data is fetched.
The `Router` guards require an observable to `complete`, which means it has emitted all
of its values.
You use the `take` operator with an argument of `1` to ensure that the `Observable` completes after retrieving the first value from the Observable returned by the `getCrisis()` method.

`CrisisService.getCrisis()` 方法返回一个可观察对象，以防止在数据获取完之前加载本路由。
`Router` 守卫要求这个可观察对象必须可结束（`complete`），也就是说它已经发出了所有值。
你可以为 `take` 操作符传入一个参数 `1`，以确保这个可观察对象会在从 `getCrisis` 方法所返回的可观察对象中取到第一个值之后就会结束。

If it doesn't return a valid `Crisis`, then return an empty `Observable`, cancel the previous in-progress navigation to the `CrisisDetailComponent`, and navigate the user back to the `CrisisListComponent`.
The updated resolver service looks like this:

如果它没有返回有效的 `Crisis`，就会返回一个 `Observable`，以取消以前到 `CrisisDetailComponent` 的在途导航，并把用户导航回 `CrisisListComponent`。修改后的 `resolver` 服务是这样的：

<code-example path="router/src/app/crisis-center/crisis-detail-resolver.service.ts" header="src/app/crisis-center/crisis-detail-resolver.service.ts"></code-example>

Import this resolver in the `crisis-center-routing.module.ts` and add a `resolve` object to the `CrisisDetailComponent` route configuration.

把这个解析器（resolver）导入到 `crisis-center-routing.module.ts` 中，并往 `CrisisDetailComponent` 的路由配置中添加一个 `resolve` 对象。

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.4.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (resolver)"></code-example>

The `CrisisDetailComponent` should no longer fetch the crisis.
When you re-configured the route, you changed where the crisis is.
Update the `CrisisDetailComponent` to get the crisis from the  `ActivatedRoute.data.crisis` property instead;

`CrisisDetailComponent` 不应该再去获取这个危机的详情。
你只要重新配置路由，就可以修改从哪里获取危机的详情。
把 `CrisisDetailComponent` 改成从 `ActivatedRoute.data.crisis` 属性中获取危机详情，这正是你重新配置路由的恰当时机。

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (ngOnInit v2)" region="ngOnInit"></code-example>

Note the following three important points:

注意以下三个要点：

1. The router's `Resolve` interface is optional.
   The `CrisisDetailResolverService` doesn't inherit from a base class.
   The router looks for that method and calls it if found.

   路由器的这个 `Resolve` 接口是可选的。`CrisisDetailResolverService` 没有继承自某个基类。路由器只要找到了这个方法，就会调用它。

1. The router calls the resolver in any case where the the user could navigate away so you don't have to code for each use case.

   路由器会在用户可以导航的任何情况下调用该解析器，这样你就不用针对每个用例都编写代码了。

1. Returning an empty `Observable` in at least one resolver will cancel navigation.

   在任何一个解析器中返回空的 `Observable` 就会取消导航。

The relevant Crisis Center code for this milestone follows.

与里程碑相关的危机中心代码如下。

<code-tabs>

  <code-pane header="app.component.html" path="router/src/app/app.component.html">

  </code-pane>

  <code-pane header="crisis-center-home.component.html" path="router/src/app/crisis-center/crisis-center-home/crisis-center-home.component.html">

  </code-pane>

  <code-pane header="crisis-center.component.html" path="router/src/app/crisis-center/crisis-center/crisis-center.component.html">

  </code-pane>

  <code-pane header="crisis-center-routing.module.ts" path="router/src/app/crisis-center/crisis-center-routing.module.4.ts">

  </code-pane>

  <code-pane header="crisis-list.component.html" path="router/src/app/crisis-center/crisis-list/crisis-list.component.html">

  </code-pane>

  <code-pane header="crisis-list.component.ts" path="router/src/app/crisis-center/crisis-list/crisis-list.component.ts">

  </code-pane>

  <code-pane header="crisis-detail.component.html" path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.html">

  </code-pane>

  <code-pane header="crisis-detail.component.ts" path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts">

  </code-pane>

  <code-pane header="crisis-detail-resolver.service.ts" path="router/src/app/crisis-center/crisis-detail-resolver.service.ts">

  </code-pane>

  <code-pane header="crisis.service.ts" path="router/src/app/crisis-center/crisis.service.ts">

  </code-pane>

  <code-pane header="dialog.service.ts" path="router/src/app/dialog.service.ts">

  </code-pane>

</code-tabs>

Guards

路由守卫

<code-tabs>

  <code-pane header="auth.guard.ts" path="router/src/app/auth/auth.guard.3.ts">

  </code-pane>

  <code-pane header="can-deactivate.guard.ts" path="router/src/app/can-deactivate.guard.ts">

  </code-pane>

</code-tabs>

{@a query-parameters}

{@a fragment}

### Query parameters and fragments

### 查询参数及片段

In the [route parameters](#optional-route-parameters) section, you only dealt with parameters specific to the route.
However, you can use query parameters to get optional parameters available to all routes.

在[路由参数](#optional-route-parameters)部分，你只需要处理该路由的专属参数。但是，你也可以用查询参数来获取对所有路由都可用的可选参数。

[Fragments](https://en.wikipedia.org/wiki/Fragment_identifier) refer to certain elements on the page
identified with an `id` attribute.

[片段](https://en.wikipedia.org/wiki/Fragment_identifier)可以引用页面中带有特定 `id` 属性的元素.

Update the `AuthGuard` to provide a `session_id` query that will remain after navigating to another route.

修改 `AuthGuard` 以提供 `session_id` 查询参数，在导航到其它路由后，它还会存在。

Add an `anchor` element so you can jump to a certain point on the page.

再添加一个锚点（`A`）元素，来让你能跳转到页面中的正确位置。

Add the `NavigationExtras` object to the `router.navigate()` method that navigates you to the `/login` route.

为 `router.navigate()` 方法添加一个 `NavigationExtras` 对象，用来导航到 `/login` 路由。

<code-example path="router/src/app/auth/auth.guard.4.ts" header="src/app/auth/auth.guard.ts (v3)"></code-example>

You can also preserve query parameters and fragments across navigations without having to provide them again when navigating.
In the `LoginComponent`, you'll add an *object* as the second argument in the `router.navigateUrl()` function and provide the `queryParamsHandling` and `preserveFragment` to pass along the current query parameters and fragment to the next route.

还可以在导航之间**保留**查询参数和片段，而无需再次在导航中提供。在 `LoginComponent` 中的 `router.navigateUrl()` 方法中，添加一个对象作为第二个参数，该**对象**提供了 `queryParamsHandling` 和 `preserveFragment`，用于传递当前的查询参数和片段到下一个路由。

<code-example path="router/src/app/auth/login/login.component.ts" header="src/app/auth/login/login.component.ts (preserve)" region="preserve"></code-example>

<div class="alert is-helpful">

The `queryParamsHandling` feature also provides a `merge` option, which preserves and combines the current query parameters with any provided query parameters when navigating.

`queryParamsHandling` 特性还提供了 `merge` 选项，它将会在导航时保留当前的查询参数，并与其它查询参数合并。

</div>

To navigate to the Admin Dashboard route after logging in, update `admin-dashboard.component.ts` to handle the
query parameters and fragment.

要在登录后导航到 Admin Dashboard 路由，请更新 `admin-dashboard.component.ts` 以处理这些查询参数和片段。

<code-example path="router/src/app/admin/admin-dashboard/admin-dashboard.component.1.ts" header="src/app/admin/admin-dashboard/admin-dashboard.component.ts (v2)"></code-example>

Query parameters and fragments are also available through the `ActivatedRoute` service.
Just like route parameters, the query parameters and fragments are provided as an `Observable`.
The updated Crisis Admin component feeds the `Observable` directly into the template using the `AsyncPipe`.

查询参数和片段可通过 `Router` 服务的 `routerState` 属性使用。和路由参数类似，全局查询参数和片段也是 `Observable` 对象。
  在修改过的英雄管理组件中，你将借助 `AsyncPipe` 直接把 `Observable` 传给模板。

Now, you can click on the Admin button, which takes you to the Login page with the provided `queryParamMap` and `fragment`.
After you click the login button, notice that you have been redirected to the `Admin Dashboard` page with the query parameters and fragment still intact in the address bar.

按照下列步骤试验下：点击 Admin 按钮，它会带着你提供的 `queryParamMap` 和 `fragment` 跳转到登录页。
点击 Login 按钮，你就会被重定向到 `Admin Dashboard` 页。
注意，它仍然带着上一步提供的 `queryParamMap` 和 `fragment`。

You can use these persistent bits of information for things that need to be provided across pages like authentication tokens or session ids.

你可以用这些持久化信息来携带需要为每个页面都提供的信息，如认证令牌或会话的 ID 等。

<div class="alert is-helpful">

The `query params` and `fragment` can also be preserved using a `RouterLink` with
the `queryParamsHandling` and `preserveFragment` bindings respectively.

“查询参数”和“片段”也可以分别用 `RouterLink` 中的 **queryParamsHandling** 和 **preserveFragment** 保存。

</div>

{@a asynchronous-routing}

## Milestone 6: Asynchronous routing

## 里程碑 6：异步路由

As you've worked through the milestones, the application has naturally gotten larger.
At some point you'll reach a point where the application takes a long time to load.

完成上面的里程碑后，应用程序很自然地长大了。在某一个时间点，你将达到一个顶点，应用将会需要过多的时间来加载。

To remedy this issue, use asynchronous routing, which loads feature modules lazily, on request.
Lazy loading has multiple benefits.

为了解决这个问题，请使用异步路由，它会根据请求来惰性加载某些特性模块。惰性加载有很多好处。

* You can load feature areas only when requested by the user.

   你可以只在用户请求时才加载某些特性区。

* You can speed up load time for users that only visit certain areas of the application.

   对于那些只访问应用程序某些区域的用户，这样能加快加载速度。

* You can continue expanding lazy loaded feature areas without increasing the size of the initial load bundle.

   你可以持续扩充惰性加载特性区的功能，而不用增加初始加载的包体积。

You're already part of the way there.
By organizing the application into modules&mdash;`AppModule`,
`HeroesModule`, `AdminModule` and `CrisisCenterModule`&mdash;you
have natural candidates for lazy loading.

你已经完成了一部分。通过把应用组织成一些模块：`AppModule`、`HeroesModule`、`AdminModule` 和 `CrisisCenterModule`，
你已经有了可用于实现惰性加载的候选者。

Some modules, like `AppModule`, must be loaded from the start.
But others can and should be lazy loaded.
The `AdminModule`, for example, is needed by a few authorized users, so
you should only load it when requested by the right people.

有些模块（比如 `AppModule`）必须在启动时加载，但其它的都可以而且应该惰性加载。
比如 `AdminModule` 就只有少数已认证的用户才需要它，所以你应该只有在正确的人请求它时才加载。

{@a lazy-loading-route-config}

### Lazy Loading route configuration

### 惰性加载路由配置

Change the `admin` path in the `admin-routing.module.ts` from `'admin'` to an empty string, `''`, the empty path.

把 `admin-routing.module.ts` 中的 `admin` 路径从 `'admin'` 改为空路径 `''`。

Use empty path routes to group routes together without adding any additional path segments to the URL.
Users will still visit `/admin` and the `AdminComponent` still serves as the Routing Component containing child routes.

可以用*空路径*路由来对路由进行分组，而不用往 URL 中添加额外的路径片段。
用户仍旧访问 `/admin`，并且 `AdminComponent` 仍然作为用来包含子路由的路由组件。

Open the `AppRoutingModule` and add a new `admin` route to its `appRoutes` array.

打开 `AppRoutingModule`，并把一个新的 `admin` 路由添加到它的 `appRoutes` 数组中。

Give it a `loadChildren` property instead of a `children` property.
The `loadChildren` property takes a function that returns a promise using the browser's built-in syntax for lazy loading code using dynamic imports `import('...')`.
The path is the location of the `AdminModule` (relative to the app root).
After the code is requested and loaded, the `Promise` resolves an object that contains the `NgModule`, in this case the `AdminModule`.

给它一个 `loadChildren` 属性（替换掉 `children` 属性）。
`loadChildren` 属性接收一个函数，该函数使用浏览器内置的动态导入语法 `import('...')` 来惰性加载代码，并返回一个承诺（Promise）。
其路径是 `AdminModule` 的位置（相对于应用的根目录）。
当代码请求并加载完毕后，这个 `Promise` 就会解析成一个包含 `NgModule` 的对象，也就是 `AdminModule`。

<code-example path="router/src/app/app-routing.module.5.ts" region="admin-1" header="app-routing.module.ts (load children)"></code-example>

<div class="alert is-important">

*Note*: When using absolute paths, the `NgModule` file location must begin with `src/app` in order to resolve correctly. For custom [path mapping with absolute paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping), you must configure the `baseUrl` and `paths` properties in the project `tsconfig.json`.

**注意**： 当使用绝对路径时，`NgModule` 的文件位置必须以 `src/app` 开头，以便正确解析。对于自定义的 [使用绝对路径的路径映射表](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)，你必须在项目的 `tsconfig.json` 中必须配置好 `baseUrl` 和 `paths` 属性。

</div>

When the router navigates to this route, it uses the `loadChildren` string to dynamically load the `AdminModule`.
Then it adds the `AdminModule` routes to its current route configuration.
Finally, it loads the requested route to the destination admin component.

当路由器导航到这个路由时，它会用 `loadChildren` 字符串来动态加载 `AdminModule`，然后把 `AdminModule` 添加到当前的路由配置中，
最后，它把所请求的路由加载到目标 `admin` 组件中。

The lazy loading and re-configuration happen just once, when the route is first requested; the module and routes are available immediately for subsequent requests.

惰性加载和重新配置工作只会发生一次，也就是在该路由首次被请求时。在后续的请求中，该模块和路由都是立即可用的。

<div class="alert is-helpful">

Angular provides a built-in module loader that supports SystemJS to load modules asynchronously. If you were
using another bundling tool, such as Webpack, you would use the Webpack mechanism for asynchronously loading modules.

Angular 提供一个内置模块加载器，支持**`SystemJS`**来异步加载模块。如果你使用其它捆绑工具比如 **Webpack**，则使用 Webpack 的机制来异步加载模块。

</div>

Take the final step and detach the admin feature set from the main application.
The root `AppModule` must neither load nor reference the `AdminModule` or its files.

最后一步是把管理特性区从主应用中完全分离开。
根模块 `AppModule` 既不能加载也不能引用 `AdminModule` 及其文件。

In `app.module.ts`, remove the `AdminModule` import statement from the top of the file
and remove the `AdminModule` from the NgModule's `imports` array.

在 `app.module.ts` 中，从顶部移除 `AdminModule` 的导入语句，并且从 NgModule 的 `imports` 数组中移除 `AdminModule`。

{@a can-load-guard}

### `CanLoad`: guarding unauthorized loading of feature modules

### `CanLoad`：保护对特性模块的未授权加载

You're already protecting the `AdminModule` with a `CanActivate` guard that prevents unauthorized users from accessing the admin feature area.
It redirects to the login page if the user is not authorized.

你已经使用 `CanActivate` 保护 `AdminModule` 了，它会阻止未授权用户访问管理特性区。如果用户未登录，它就会跳转到登录页。

But the router is still loading the `AdminModule` even if the user can't visit any of its components.
Ideally, you'd only load the `AdminModule` if the user is logged in.

但是路由器仍然会加载 `AdminModule` —— 即使用户无法访问它的任何一个组件。
理想的方式是，只有在用户已登录的情况下你才加载 `AdminModule`。

Add a `CanLoad` guard that only loads the `AdminModule` once the user is logged in _and_ attempts to access the admin feature area.

添加一个 `CanLoad` 守卫，它只在用户已登录*并且*尝试访问管理特性区的时候，才加载 `AdminModule` 一次。

The existing `AuthGuard` already has the essential logic in its `checkLogin()` method to support the `CanLoad` guard.

现有的 `AuthGuard` 的 `checkLogin()` 方法中已经有了支持 `CanLoad` 守卫的基础逻辑。

Open `auth.guard.ts`.
Import the `CanLoad` interface from `@angular/router`.
Add it to the `AuthGuard` class's `implements` list.
Then implement `canLoad()` as follows:

打开 `auth.guard.ts`，从 `@angular/router` 中导入 `CanLoad` 接口。
把它添加到 `AuthGuard` 类的 `implements` 列表中。
然后实现 `canLoad`，代码如下：

<code-example path="router/src/app/auth/auth.guard.ts" header="src/app/auth/auth.guard.ts (CanLoad guard)" region="canLoad"></code-example>

The router sets the `canLoad()` method's `route` parameter to the intended destination URL.
The `checkLogin()` method redirects to that URL once the user has logged in.

路由器会把 `canLoad()` 方法的 `route` 参数设置为准备访问的目标 URL。
如果用户已经登录了，`checkLogin()` 方法就会重定向到那个 URL。

Now import the `AuthGuard` into the `AppRoutingModule` and add the `AuthGuard` to the `canLoad`
array property for the `admin` route.
The completed admin route looks like this:

现在，把 `AuthGuard` 导入到 `AppRoutingModule` 中，并把 `AuthGuard` 添加到 `admin` 路由的 `canLoad` 数组中。
完整的 `admin` 路由是这样的：

<code-example path="router/src/app/app-routing.module.5.ts" region="admin" header="app-routing.module.ts (lazy admin route)"></code-example>

{@a preloading}

### Preloading: background loading of feature areas

### 预加载：特性区的后台加载

In addition to loading modules on-demand, you can load modules asynchronously with preloading.

除了按需加载模块外，还可以通过预加载方式异步加载模块。

The `AppModule` is eagerly loaded when the application starts, meaning that it loads right away.
Now the `AdminModule` loads only when the user clicks on a link, which is called lazy loading.

当应用启动时，`AppModule` 被急性加载，这意味着它会立即加载。而 `AdminModule` 只在用户点击链接时加载，这叫做惰性加载。

Preloading allows you to load modules in the background so that the data is ready to render when the user activates a particular route.
Consider the Crisis Center.
It isn't the first view that a user sees.
By default, the Heroes are the first view.
For the smallest initial payload and fastest launch time, you should eagerly load the `AppModule` and the `HeroesModule`.

预加载允许你在后台加载模块，以便当用户激活某个特定的路由时，就可以渲染这些数据了。
考虑一下危机中心。
它不是用户看到的第一个视图。
默认情况下，英雄列表才是第一个视图。为了获得最小的初始有效负载和最快的启动时间，你应该急性加载 `AppModule` 和 `HeroesModule`。

You could lazy load the Crisis Center.
But you're almost certain that the user will visit the Crisis Center within minutes of launching the app.
Ideally, the app would launch with just the `AppModule` and the `HeroesModule` loaded and then, almost immediately, load the `CrisisCenterModule` in the background.
By the time the user navigates to the Crisis Center, its module will have been loaded and ready.

你可以惰性加载危机中心。
但是，你几乎可以肯定用户会在启动应用之后的几分钟内访问危机中心。
理想情况下，应用启动时应该只加载 `AppModule` 和 `HeroesModule`，然后几乎立即开始后台加载 `CrisisCenterModule`。
在用户浏览到危机中心之前，该模块应该已经加载完毕，可供访问了。

{@a how-preloading}

#### How preloading works

#### 预加载的工作原理

After each successful navigation, the router looks in its configuration for an unloaded module that it can preload.
Whether it preloads a module, and which modules it preloads, depends upon the preload strategy.

在每次成功的导航后，路由器会在自己的配置中查找尚未加载并且可以预加载的模块。
是否加载某个模块，以及要加载哪些模块，取决于*预加载策略*。

The `Router` offers two preloading strategies:

`Router` 提供了两种预加载策略：

* No preloading, which is the default. Lazy loaded feature areas are still loaded on-demand.

   完全不预加载，这是默认值。惰性加载的特性区仍然会按需加载。

* Preloading of all lazy loaded feature areas.

   预加载所有惰性加载的特性区。

The router either never preloads, or preloads every lazy loaded module.
The `Router` also supports [custom preloading strategies](#custom-preloading) for fine control over which modules to preload and when.

路由器或者完全不预加载或者预加载每个惰性加载模块。
路由器还支持[自定义预加载策略](guide/router#custom-preloading)，以便完全控制要预加载哪些模块以及何时加载。

This section guides you through updating the `CrisisCenterModule` to load lazily by default and use the `PreloadAllModules` strategy to load all lazy loaded modules.

本节将指导你把 `CrisisCenterModule` 改成惰性加载的，并使用 `PreloadAllModules` 策略来预加载所有惰性加载模块。

{@a lazy-load-crisis-center}

#### Lazy load the crisis center

#### 惰性加载危机中心

Update the route configuration to lazy load the `CrisisCenterModule`.
Take the same steps you used to configure `AdminModule` for lazy loading.

修改路由配置，来惰性加载 `CrisisCenterModule`。修改的步骤和配置惰性加载 `AdminModule` 时一样。

1. Change the `crisis-center` path in the `CrisisCenterRoutingModule` to an empty string.

   把 `CrisisCenterRoutingModule` 中的路径从 `crisis-center` 改为空字符串。

1. Add a `crisis-center` route to the `AppRoutingModule`.

   往 `AppRoutingModule` 中添加一个 `crisis-center` 路由。

1. Set the `loadChildren` string to load the `CrisisCenterModule`.

   设置 `loadChildren` 字符串来加载 `CrisisCenterModule`。

1. Remove all mention of the `CrisisCenterModule` from `app.module.ts`.

   从 `app.module.ts` 中移除所有对 `CrisisCenterModule` 的引用。

Here are the updated modules _before enabling preload_:

下面是打开预加载之前的模块修改版：

<code-tabs>

  <code-pane header="app.module.ts" path="router/src/app/app.module.ts" region="preload">

  </code-pane>

  <code-pane header="app-routing.module.ts" path="router/src/app/app-routing.module.6.ts" region="preload-v1">

  </code-pane>

  <code-pane header="crisis-center-routing.module.ts" path="router/src/app/crisis-center/crisis-center-routing.module.ts">

  </code-pane>

</code-tabs>

You could try this now and confirm that the  `CrisisCenterModule` loads after you click the "Crisis Center" button.

你可以现在尝试它，并确认在点击了“Crisis Center”按钮之后加载了 `CrisisCenterModule`。

To enable preloading of all lazy loaded modules, import the `PreloadAllModules` token from the Angular router package.

要为所有惰性加载模块启用预加载功能，请从 Angular 的路由模块中导入 `PreloadAllModules`。

The second argument in the `RouterModule.forRoot()` method takes an object for additional configuration options.
The `preloadingStrategy` is one of those options.
Add the `PreloadAllModules` token to the `forRoot()` call:

`RouterModule.forRoot()` 方法的第二个参数接受一个附加配置选项对象。
`preloadingStrategy` 就是其中之一。
把 `PreloadAllModules` 添加到 `forRoot()` 调用中：

<code-example path="router/src/app/app-routing.module.6.ts" header="src/app/app-routing.module.ts (preload all)" region="forRoot"></code-example>

This configures the `Router` preloader to immediately load all lazy loaded routes (routes with a `loadChildren` property).

这项配置会让 `Router` 预加载器立即加载*所有*惰性加载路由（带 `loadChildren` 属性的路由）。

When you visit `http://localhost:4200`, the `/heroes` route loads immediately upon launch and the router starts loading the `CrisisCenterModule` right after the `HeroesModule` loads.

当访问 `http://localhost:4200` 时，`/heroes` 路由立即随之启动，并且路由器在加载了 `HeroesModule` 之后立即开始加载 `CrisisCenterModule`。

Currently, the `AdminModule` does not preload because `CanLoad` is blocking it.

目前，`AdminModule` 并没有预加载，因为 `CanLoad` 阻塞了它。

{@a preload-canload}

#### `CanLoad` blocks preload

#### `CanLoad` 会阻塞预加载

The `PreloadAllModules` strategy does not load feature areas protected by a [CanLoad](#can-load-guard) guard.

`PreloadAllModules` 策略不会加载被[CanLoad](guide/router#can-load-guard)守卫所保护的特性区。

You added a `CanLoad` guard to the route in the `AdminModule` a few steps back to block loading of that module until the user is authorized.
That `CanLoad` guard takes precedence over the preload strategy.

几步之前，你刚刚给 `AdminModule` 中的路由添加了 `CanLoad` 守卫，以阻塞加载那个模块，直到用户认证结束。
`CanLoad` 守卫的优先级高于预加载策略。

If you want to preload a module as well as guard against unauthorized access, remove the `canLoad()` guard method and rely on the [canActivate()](#can-activate-guard) guard alone.

如果你要加载一个模块并且保护它防止未授权访问，请移除 `canLoad` 守卫，只单独依赖[CanActivate](guide/router#can-activate-guard)守卫。

{@a custom-preloading}

### Custom Preloading Strategy

### 自定义预加载策略

Preloading every lazy loaded module works well in many situations.
However, in consideration of things such as low bandwidth and user metrics, you can use a custom preloading strategy for specific feature modules.

在很多场景下，预加载的每个惰性加载模块都能正常工作。但是，考虑到低带宽和用户指标等因素，可以为特定的特性模块使用自定义预加载策略。

This section guides you through adding a custom strategy that only preloads routes whose `data.preload` flag is set to `true`.
Recall that you can add anything to the `data` property of a route.

本节将指导你添加一个自定义策略，它只预加载 `data.preload` 标志为 `true` 路由。回想一下，你可以在路由的 `data` 属性中添加任何东西。

Set the `data.preload` flag in the `crisis-center` route in the `AppRoutingModule`.

在 `AppRoutingModule` 的 `crisis-center` 路由中设置 `data.preload` 标志。

<code-example path="router/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (route data preload)" region="preload-v2"></code-example>

Generate a new `SelectivePreloadingStrategy` service.

生成一个新的 `SelectivePreloadingStrategy` 服务。

<code-example language="none" class="code-shell">
  ng generate service selective-preloading-strategy
</code-example>

Replace the contents of `selective-preloading-strategy.service.ts` with the following:

使用下列内容替换 `selective-preloading-strategy.service.ts`：

<code-example path="router/src/app/selective-preloading-strategy.service.ts" header="src/app/selective-preloading-strategy.service.ts"></code-example>

`SelectivePreloadingStrategyService` implements the `PreloadingStrategy`, which has one method, `preload()`.

`SelectivePreloadingStrategyService` 实现了 `PreloadingStrategy`，它有一个方法 `preload()`。

The router calls the `preload()` method with two arguments:

路由器会用两个参数来调用 `preload()` 方法：

1. The route to consider.

   要加载的路由。

1. A loader function that can load the routed module asynchronously.

   一个加载器（loader）函数，它能异步加载带路由的模块。

An implementation of `preload` must return an `Observable`.
If the route does preload, it returns the observable returned by calling the loader function.
If the route does not preload, it returns an `Observable` of `null`.

`preload` 的实现要返回一个 `Observable`。
如果该路由应该预加载，它就会返回调用加载器函数所返回的 `Observable`。
如果该路由*不*应该预加载，它就返回一个 `null` 值的 `Observable` 对象。

In this sample, the  `preload()` method loads the route if the route's `data.preload` flag is truthy.

在这个例子中，如果路由的 `data.preload` 标志是真值，则 `preload()` 方法会加载该路由。

As a side-effect, `SelectivePreloadingStrategyService` logs the `path` of a selected route in its public `preloadedModules` array.

它的副作用是 `SelectivePreloadingStrategyService` 会把所选路由的 `path` 记录在它的公共数组 `preloadedModules` 中。

Shortly, you'll extend the `AdminDashboardComponent` to inject this service and display its `preloadedModules` array.

很快，你就会扩展 `AdminDashboardComponent` 来注入该服务，并且显示它的 `preloadedModules` 数组。

But first, make a few changes to the `AppRoutingModule`.

但是首先，要对 `AppRoutingModule` 做少量修改。

1. Import `SelectivePreloadingStrategyService` into `AppRoutingModule`.

   把 `SelectivePreloadingStrategyService` 导入到 `AppRoutingModule` 中。

1. Replace the `PreloadAllModules` strategy in the call to `forRoot()` with this `SelectivePreloadingStrategyService`.

   把 `PreloadAllModules` 策略替换成对 `forRoot()` 的调用，并且传入这个 `SelectivePreloadingStrategyService`。

1. Add the `SelectivePreloadingStrategyService` strategy to the `AppRoutingModule` providers array so you can inject it elsewhere in the app.

   把 `SelectivePreloadingStrategyService` 策略添加到 `AppRoutingModule` 的 `providers` 数组中，以便它可以注入到应用中的任何地方。

Now edit the `AdminDashboardComponent` to display the log of preloaded routes.

现在，编辑 `AdminDashboardComponent` 以显示这些预加载路由的日志。

1. Import the `SelectivePreloadingStrategyService`.

   导入 `SelectivePreloadingStrategyService`（它是一个服务）。

1. Inject it into the dashboard's constructor.

   把它注入到仪表盘的构造函数中。

1. Update the template to display the strategy service's `preloadedModules` array.

   修改模板来显示这个策略服务的 `preloadedModules` 数组。

Now the file is as follows:

现在文件如下：

<code-example path="router/src/app/admin/admin-dashboard/admin-dashboard.component.ts" header="src/app/admin/admin-dashboard/admin-dashboard.component.ts (preloaded modules)"></code-example>

Once the application loads the initial route, the `CrisisCenterModule` is preloaded.
Verify this by logging in to the `Admin` feature area and noting that the `crisis-center` is listed in the `Preloaded Modules`.
It also logs to the browser's console.

一旦应用加载完了初始路由，`CrisisCenterModule` 也被预加载了。
通过 `Admin` 特性区中的记录就可以验证它，“Preloaded Modules”中列出了 `crisis-center`。
它也被记录到了浏览器的控制台。

{@a redirect-advanced}

### Migrating URLs with redirects

### 使用重定向迁移 URL

You've setup the routes for navigating around your application and used navigation imperatively and declaratively.
But like any application, requirements change over time.
You've setup links and navigation to `/heroes` and `/hero/:id` from the `HeroListComponent` and `HeroDetailComponent` components.
If there were a requirement that links to `heroes` become `superheroes`, you would still want the previous URLs to navigate correctly.
You also don't want to update every link in your application, so redirects makes refactoring routes trivial.

你已经设置好了路由，并且用命令式和声明式的方式导航到了很多不同的路由。但是，任何应用的需求都会随着时间而改变。
你把链接 `/heroes` 和 `hero/:id` 指向了 `HeroListComponent` 和 `HeroDetailComponent` 组件。
如果有这样一个需求，要把链接 `heroes` 变成 `superheroes`，你可能仍然希望以前的 URL 能正常导航。
但你也不想在应用中找到并修改每一个链接，这时候，重定向就可以省去这些琐碎的重构工作。

{@a url-refactor}

#### Changing `/heroes` to `/superheroes`

#### 把 `/heroes` 改为 `/superheroes`

This section guides you through migrating the `Hero` routes to new URLs.
The `Router` checks for redirects in your configuration before navigating, so each redirect is triggered when needed. To support this change, add redirects from the old routes to the new routes in the `heroes-routing.module`.

本节将指导你将 `Hero` 路由迁移到新的 URL。在导航之前，`Router` 会检查路由配置中的重定向语句，以便将来按需触发重定向。要支持这种修改，你就要在 `heroes-routing.module` 文件中把老的路由重定向到新的路由。

<code-example path="router/src/app/heroes/heroes-routing.module.ts" header="src/app/heroes/heroes-routing.module.ts (heroes redirects)"></code-example>

Notice two different types of redirects.
The first change is from  `/heroes` to `/superheroes` without any parameters.
The second change is from `/hero/:id` to `/superhero/:id`, which includes the `:id` route parameter.
Router redirects also use powerful pattern-matching, so the `Router` inspects the URL and replaces route parameters in the `path` with their appropriate destination.
Previously, you navigated to a URL such as `/hero/15` with a route parameter `id` of `15`.

注意，这里有两种类型的重定向。第一种是不带参数的从 `/heroes` 重定向到 `/superheroes`。这是一种非常直观的重定向。第二种是从 `/hero/:id` 重定向到 `/superhero/:id`，它还要包含一个 `:id` 路由参数。
路由器重定向时使用强大的模式匹配功能，这样，路由器就会检查 URL，并且把 `path` 中带的路由参数替换成相应的目标形式。以前，你导航到形如 `/hero/15` 的 URL 时，带了一个路由参数 `id`，它的值是 `15`。

<div class="alert is-helpful">

The `Router` also supports [query parameters](#query-parameters) and the [fragment](#fragment) when using redirects.

在重定向的时候，路由器还支持[查询参数](#query-parameters)和[片段(fragment)](#fragment)。

* When using absolute redirects, the `Router` will use the query parameters and the fragment from the `redirectTo` in the route config.

   当使用绝对地址重定向时，路由器将会使用路由配置的 `redirectTo` 属性中规定的查询参数和片段。

* When using relative redirects, the `Router` use the query params and the fragment from the source URL.

   当使用相对地址重定向时，路由器将会使用源地址（跳转前的地址）中的查询参数和片段。

</div>

Currently, the empty path route redirects to `/heroes`, which redirects to `/superheroes`.
This won't work because the `Router` handles redirects once at each level of routing configuration.
This prevents chaining of redirects, which can lead to endless redirect loops.

目前，空路径被重定向到了 `/heroes`，它又被重定向到了 `/superheroes`。这样不行，因为 `Router` 在每一层的路由配置中只会处理一次重定向。这样可以防止出现无限循环的重定向。

Instead, update the empty path route in `app-routing.module.ts` to redirect to `/superheroes`.

所以，你要在 `app-routing.module.ts` 中修改空路径路由，让它重定向到 `/superheroes`。

<code-example path="router/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (superheroes redirect)"></code-example>

A `routerLink` isn't tied to route configuration, so update the associated router links to remain active when the new route is active.
Update the `app.component.ts` template for the `/heroes` `routerLink`.

由于 `routerLink` 与路由配置无关，所以你要修改相关的路由链接，以便在新的路由激活时，它们也能保持激活状态。还要修改 `app.component.ts` 模板中的 `/heroes` 这个 `routerLink`。

<code-example path="router/src/app/app.component.html" header="src/app/app.component.html (superheroes active routerLink)"></code-example>

Update the `goToHeroes()` method in the `hero-detail.component.ts` to navigate back to `/superheroes` with the optional route parameters.

修改 `hero-detail.component.ts` 中的 `goToHeroes()` 方法，使用可选的路由参数导航回 `/superheroes`。

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.ts" region="redirect" header="src/app/heroes/hero-detail/hero-detail.component.ts (goToHeroes)"></code-example>

With the redirects setup, all previous routes now point to their new destinations and both URLs still function as intended.

当这些重定向设置好之后，所有以前的路由都指向了它们的新目标，并且每个 URL 也仍然能正常工作。

{@a inspect-config}

### Inspect the router's configuration

### 审查路由器配置

To determine if your routes are actually evaluated [in the proper order](#routing-module-order), you can inspect the router's configuration.

要确定你的路由是否真的[按照正确的顺序](#routing-module-order)执行的，你可以审查路由器的配置。

Do this by injecting the router and logging to the console its `config` property.
For example, update the `AppModule` as follows and look in the browser console window
to see the finished route configuration.

可以通过注入路由器并在控制台中记录其 `config` 属性来实现。
例如，把 `AppModule` 修改为这样，并在浏览器的控制台窗口中查看最终的路由配置。

<code-example path="router/src/app/app.module.7.ts" header="src/app/app.module.ts (inspect the router config)" region="inspect-config"></code-example>

{@a final-app}

## Final app

## 最终的应用

For the completed router app, see the <live-example></live-example> for the final source code.

对这个已完成的路由器应用，参见 <live-example></live-example>的最终代码。

{@a link-parameters-array}

## Link parameters array

## 链接参数数组

A link parameters array holds the following ingredients for router navigation:

链接参数数组保存路由导航时所需的成分：

* The path of the route to the destination component.

   指向目标组件的那个路由的路径（path）

* Required and optional route parameters that go into the route URL.

   必备路由参数和可选路由参数，它们将进入该路由的 URL

You can bind the `RouterLink` directive to such an array like this:

你可以把 `RouterLink` 指令绑定到一个数组，就像这样：

<code-example path="router/src/app/app.component.3.ts" header="src/app/app.component.ts (h-anchor)" region="h-anchor"></code-example>

The following is a two-element array when specifying a route parameter:

在指定路由参数时，使用如下的两元素数组：

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (nav-to-detail)" region="nav-to-detail"></code-example>

You can provide optional route parameters in an object, as in `{ foo: 'foo' }`:

你可以在对象中提供可选的路由参数，比如 `{ foo: 'foo' }` ：

<code-example path="router/src/app/app.component.3.ts" header="src/app/app.component.ts (cc-query-params)" region="cc-query-params"></code-example>

These three examples cover the needs of an app with one level of routing.
However, with a child router, such as in the crisis center, you create new link array possibilities.

这三个例子涵盖了你在单级路由的应用中所需的一切。不过，在你添加一个像*危机中心*一样的子路由时，你可以创建新链接数组。

The following minimal `RouterLink` example builds upon a specified [default child route](guide/router#a-crisis-center-with-child-routes) for the crisis center.

下面这个最小化 `RouterLink` 例子是基于危机中心指定的[默认子路由](guide/router#a-crisis-center-with-child-routes)构建的。

<code-example path="router/src/app/app.component.3.ts" header="src/app/app.component.ts (cc-anchor-w-default)" region="cc-anchor-w-default"></code-example>

Note the following:

请注意以下事项：

* The first item in the array identifies the parent route (`/crisis-center`).

   数组中的第一个条目标记出了父路由(`/crisis-center`)。

* There are no parameters for this parent route.

   这个父路由没有参数。

* There is no default for the child route so you need to pick one.

   没有默认的子路由，因此你得选取一个。

* You're navigating to the `CrisisListComponent`, whose route path is `/`, but you don't need to explicitly add the slash.

   你决定跳转到 `CrisisListComponent`，它的路由路径是'/'，但你不用显式的添加它。

Consider the following router link that navigates from the root of the application down to the Dragon Crisis:

考虑以下路由器链接，它将从应用的根目录导航到巨龙危机（Dragon Crisis）：

<code-example path="router/src/app/app.component.3.ts" header="src/app/app.component.ts (Dragon-anchor)" region="Dragon-anchor"></code-example>

* The first item in the array identifies the parent route (`/crisis-center`).

   数组中的第一个条目标记出了父路由(`/crisis-center`)。

* There are no parameters for this parent route.

  这个父路由没有参数。

* The second item identifies the child route details about a particular crisis (`/:id`).

   数组中的第二个条目（'/:id'）用来标记出到指定危机的详情页的子路由。

* The details child route requires an `id` route parameter.

   详细的子路由需要一个 `id` 路由参数。

* You added the `id` of the Dragon Crisis as the second item in the array (`1`).

   你把*巨龙危机*的 `id` 添加为该数组中的第二个条目（`1`）。

* The resulting path is `/crisis-center/1`.

   最终生成的路径是 `/crisis-center/1`。

You could also redefine the `AppComponent` template with Crisis Center routes exclusively:

你也可以把危机中心的路由单独重新定义为 `AppComponent` 的模板：

<code-example path="router/src/app/app.component.3.ts" header="src/app/app.component.ts (template)" region="template"></code-example>

In summary, you can write applications with one, two or more levels of routing.
The link parameters array affords the flexibility to represent any routing depth and any legal sequence of route paths, (required) router parameters, and (optional) route parameter objects.

总之，你可以用一级、两级或多级路由来写应用程序。
  链接参数数组提供了用来表示任意深度路由的链接参数数组以及任意合法的路由参数序列、必须的路由器参数以及可选的路由参数对象。

{@a browser-url-styles}

{@a location-strategy}

## `LocationStrategy` and browser URL styles

## `LocationStrategy` 和浏览器的网址样式

When the router navigates to a new component view, it updates the browser's location and history with a URL for that view.
As this is a strictly local URL the browser won't send this URL to the server and will not reload the page.

当路由器导航到一个新的组件视图时，它会用该视图的 URL 来更新浏览器的当前地址以及历史。
严格来说，这个 URL 其实是本地的，浏览器不会把该 URL 发给服务器，并且不会重新加载此页面。

Modern HTML5 browsers support <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries" title="HTML5 browser history push-state">history.pushState</a>, a technique that changes a browser's location and history without triggering a server page request.
The router can compose a "natural" URL that is indistinguishable from one that would otherwise require a page load.

现代 HTML 5 浏览器支持[history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries) API，
这是一项可以改变浏览器的当前地址和历史，却又不会触发服务端页面请求的技术。
路由器可以合成出一个“自然的”URL，它看起来和那些需要进行页面加载的 URL 没什么区别。

Here's the Crisis Center URL in this "HTML5 pushState" style:

下面是危机中心的 URL 在“HTML 5 pushState”风格下的样子：

<code-example format="nocode">
  localhost:3002/crisis-center/

</code-example>

Older browsers send page requests to the server when the location URL changes unless the change occurs after a "#" (called the "hash").
Routers can take advantage of this exception by composing in-application route URLs with hashes.
Here's a "hash URL" that routes to the Crisis Center.

老旧的浏览器在当前地址的 URL 变化时总会往服务器发送页面请求……唯一的例外规则是：当这些变化位于“#”（被称为“hash”）后面时不会发送。通过把应用内的路由 URL 拼接在 `#` 之后，路由器可以获得这条“例外规则”带来的优点。下面是到*危机中心*路由的“hash URL”：

<code-example format="nocode">
  localhost:3002/src/#/crisis-center/

</code-example>

The router supports both styles with two `LocationStrategy` providers:

路由器通过两种 `LocationStrategy` 提供者来支持所有这些风格：

1. `PathLocationStrategy`&mdash;the default "HTML5 pushState" style.

   `PathLocationStrategy` - 默认的策略，支持“HTML 5 pushState”风格。

1. `HashLocationStrategy`&mdash;the "hash URL" style.

   `HashLocationStrategy` - 支持“hash URL”风格。

The `RouterModule.forRoot()` function sets the `LocationStrategy` to the `PathLocationStrategy`, which makes it the default strategy.
You also have the option of switching to the `HashLocationStrategy` with an override during the bootstrapping process.

`RouterModule.forRoot()` 函数把 `LocationStrategy` 设置成了 `PathLocationStrategy`，使其成为了默认策略。
你还可以在启动过程中改写（override）它，来切换到 `HashLocationStrategy` 风格。

<div class="alert is-helpful">

For more information on providers and the bootstrap process, see [Dependency Injection](guide/dependency-injection#bootstrap).

有关提供程序和引导过程的更多信息，请参阅[依赖注入](guide/dependency-injection#bootstrap)。

</div>

## Choosing a routing strategy

## 选择路由策略

You must choose a routing strategy early in the development of you project because once the application is in production, visitors to your site use and depend on application URL references.

你必须在开发项目的早期就选择一种路由策略，因为一旦该应用进入了生产阶段，你网站的访问者就会使用并依赖应用的这些 URL 引用。

Almost all Angular projects should use the default HTML5 style.
It produces URLs that are easier for users to understand and it preserves the option to do server-side rendering.

几乎所有的 Angular 项目都会使用默认的 HTML 5 风格。它生成的 URL 更易于被用户理解，它也为将来做**服务端渲染**预留了空间。

Rendering critical pages on the server is a technique that can greatly improve perceived responsiveness when the app first loads.
An app that would otherwise take ten or more seconds to start could be rendered on the server and delivered to the user's device in less than a second.

在服务器端渲染指定的页面，是一项可以在该应用首次加载时大幅提升响应速度的技术。那些原本需要十秒甚至更长时间加载的应用，可以预先在服务端渲染好，并在少于一秒的时间内完整渲染在用户的设备上。

This option is only available if application URLs look like normal web URLs without hashes (#) in the middle.

只有当应用的 URL 看起来像是标准的 Web URL，中间没有 hash（#）时，这个选项才能生效。

## `<base href>`

The router uses the browser's <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries" title="HTML5 browser history push-state">history.pushState</a> for navigation.
`pushState` allows you to customize in-app URL paths; for example, `localhost:4200/crisis-center`.
The in-app URLs can be indistinguishable from server URLs.

路由器使用浏览器的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries" title="HTML5 browser history push-state">history.pushState</a> API 进行导航。借助 `pushState` 你自定义应用中的 URL 路径 `localhost:4200/crisis-center`，应用内的 URL 和服务器的 URL 没有区别。

Modern HTML5 browsers were the first to support `pushState` which is why many people refer to these URLs as "HTML5 style" URLs.

现代的 HTML5 浏览器都支持 `pushState`，这也就是为什么很多人把这种 URL 形式称为 "HTML 5" 风格的 URL。

<div class="alert is-helpful">

HTML5 style navigation is the router default.
In the [LocationStrategy and browser URL styles](#browser-url-styles) section, learn why HTML5 style is preferable, how to adjust its behavior, and how to switch to the older hash (#) style, if necessary.

路由器默认使用 HTML5 风格的导航。
在 [LocationStrategy 与浏览器 URL 风格](#browser-url-styles)部分，你可以了解为何推荐使用 HTML5 风格的 URL，如何调整其行为，以及必要时如何切换到老式的 hash（#）风格。

</div>

You must add a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" title="base href">&lt;base href&gt; element</a> to the app's `index.html` for `pushState` routing to work.
The browser uses the `<base href>` value to prefix relative URLs when referencing CSS files, scripts, and images.

你必须在应用的 `index.html` 中**添加一个 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" title="base href">&lt;base href&gt; 元素</a>**才能让 `pushState` 路由正常工作。
浏览器要用 `<base href>` 的值为引用 CSS、脚本和图片文件时使用的*相对* URL 添加前缀。

Add the `<base>` element just after the  `<head>` tag.
If the `app` folder is the application root, as it is for this application,
set the `href` value in `index.html` as shown here.

请把 `<base>` 元素添加在 `<head>` 标签的紧后面。如果应用的根目录是 `app` 目录，那么就可以像这个应用程序一样，设置 **`index.html`** 中的 `href` 值。代码如下。

<code-example path="router/src/index.html" header="src/index.html (base-href)" region="base-href"></code-example>

### HTML5 URLs and the  `<base href>`

### HTML5 网址和 `<base href>`

While the router uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries" title="Browser history push-state">HTML5 pushState</a> style by default, you must configure that strategy with a `<base href>`.

由于路由器默认使用 “<a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries" target="_blank" title="Browser history push-state">HTML 5 pushState</a>” 风格，所以你*必须*用一个 `<base href>` 来配置该策略（Strategy）。

The preferred way to configure the strategy is to add a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" title="base href">&lt;base href&gt; element</a> tag in the `<head>` of the `index.html`.

配置该策略的首选方式是往 `index.html` 的 `<head>` 中添加一个[&lt;base href> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)标签。

<code-example path="router/src/index.html" header="src/index.html (base-href)" region="base-href"></code-example>

Without that tag, the browser may not be able to load resources
(images, CSS, scripts) when "deep linking" into the app.

如果没有该标记，浏览器就可能无法在“深度链接”进入应用时加载资源（图片，CSS，脚本）。

Some developers may not be able to add the `<base>` element, perhaps because they don't have access to `<head>` or the `index.html`.

有些开发人员可能无法添加 `<base>` 元素，这可能是因为它们没有访问 `<head>` 或 `index.html` 的权限。

Those developers may still use HTML5 URLs by taking the following two steps:

它们仍然可以使用 HTML 5 格式的 URL，但要采取如下步骤进行补救：

1. Provide the router with an appropriate [APP_BASE_HREF][] value.

   用适当的[APP_BASE_HREF][]值提供（provide）路由器。

1. Use root URLs for all web resources: CSS, images, scripts, and template HTML files.

   对所有 Web 资源使用绝对地址：CSS、图片、脚本、模板 HTML。

{@a hashlocationstrategy}

### `HashLocationStrategy`

You can use `HashLocationStrategy` by providing the `useHash: true` in an object as the second argument of the `RouterModule.forRoot()` in the `AppModule`.

你可以在根模块的 `RouterModule.forRoot()` 的第二个参数中传入一个带有 `useHash: true` 的对象，以回到基于 `HashLocationStrategy` 的传统方式。

<code-example path="router/src/app/app.module.6.ts" header="src/app/app.module.ts (hash URL strategy)"></code-example>

## Router Reference

## 路由器参考手册

The folllowing sections highlight some core router concepts.

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

For more on browser URL styles, see [`LocationStrategy` and browser URL styles](#browser-url-styles).

有关浏览器 URL 风格的更多信息，请参阅 [`LocationStrategy` 和浏览器 URL 风格](#browser-url-styles)。

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
You can use the [resolve guard](#resolve-guard) to retrieve dynamic data.

第三个路由中的 `data` 属性是存放与该特定路由关联的任意数据的地方。每个激活的路由都可以访问 `data` 属性。可以用它来存储页面标题，面包屑文本和其它只读静态数据等项目。你可以尝试使用[解析器守卫](#resolve-guard)来检索动态数据。

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

On each anchor tag, you see a [property binding](guide/template-syntax#property-binding) to the `RouterLinkActive` directive that looks like `routerLinkActive="..."`.

在每个 a 标签上，你会看到一个到 `RouterLinkActive` 指令的[属性绑定](guide/template-syntax#property-binding)，就像 `routerLinkActive="..."`。

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

Each `ActivatedRoute` in the `RouterState` provides methods to traverse up and down the route tree to get information from parent, child and sibling routes.

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
Also contains any resolved values from the [resolve guard](#resolve-guard).

包含提供给当前路由的 `data` 对象的 `Observable`。
也包含任何由[解析守卫](#resolve-guard)解析出的值。

</td>

  </tr>

  <tr>
    <td>
      <code>paramMap</code>
    </td>
    <td>

An `Observable` that contains a [map](api/router/ParamMap) of the required and [optional parameters](#optional-route-parameters) specific to the route.
The map supports retrieving single and multiple values from the same parameter.

一个包含该路由的必要参数和[可选参数](#optional-route-parameters) [map](api/router/ParamMap) 的 `Observable`。
这个 map 支持从同一个参数中获得单个或多个值。

</td>

  </tr>

  <tr>
    <td>
      <code>queryParamMap</code>
    </td>
    <td>

An `Observable` that contains a [map](api/router/ParamMap) of the [query parameters](#query-parameters) available to all routes.
The map supports retrieving single and multiple values from the query parameter.

一个包含适用于所有路由的[查询参数](#query-parameters) [map](api/router/ParamMap) 的 `Observable`。
这个 map 支持从同一个查询参数中获得单个或多个值。

</td>

  </tr>

  <tr>
    <td>
      <code>fragment</code>
    </td>
    <td>

An `Observable` of the URL [fragment](#fragment) available to all routes.

一个适用于所有路由的 URL [片段](#fragment)的 `Observable`。

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

The route's parent `ActivatedRoute` when this route is a [child route](#child-routing-component).

当该路由是[子路由](#child-routing-component)时，表示该路由的父级 `ActivatedRoute`。

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

Contains all the [child routes](#child-routing-component) activated under the current route.

包含当前路由下所有激活的[子路由](#child-routing-component)。

</td>

  </tr>
</table>

<div class="alert is-helpful">

Two older properties are still available, however, their replacements are preferable as they may be deprecated in a future Angular version.

还有两个较旧的属性，但更推荐使用它们的替代品，因为它们可能会在以后的 Angular 版本中弃用。

* `params`: An `Observable` that contains the required and [optional parameters](#optional-route-parameters) specific to the route. Use `paramMap` instead.

  `params` ：一个 `Observable`，它包含专属于该路由的必要参数和[可选参数](#optional-route-parameters)。请改用 `paramMap`。

* `queryParams`: An `Observable` that contains the [query parameters](#query-parameters) available to all routes.
  Use `queryParamMap` instead.

  `queryParams`：一个包含可用于所有路由的[查询参数](#query-parameters)的 `Observable`。请改用 `queryParamMap`。

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
  [lazy loads](#asynchronous-routing) a route configuration.

  在 `Router` [惰性加载](#asynchronous-routing)路由配置之前触发的[事件](api/router/RouteConfigLoadStart)。

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

  An [event](api/router/ActivationStart) triggered when the Router finishes activating a route.

  当路由器成功激活了某个路由时触发的[事件](api/router/ActivationStart)。

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
  This can happen when a [Route Guard](#guards) returns false during navigation,
  or redirects by returning a `UrlTree`.

  当导航被取消时触发的[事件](api/router/NavigationCancel)。
  这可能在导航期间某个[路由守卫](#guards)返回了 false 或返回了 `UrlTree` 以进行重定向时发生。

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

当启用了 `enableTracing` 选项时，Angular 会把这些事件都记录到控制台。有关筛选路由器导航事件的示例，请参阅 [Angular 中的 Observables](guide/observables-in-angular) 一章的[路由器部分](guide/observables-in-angular#router)。

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

  一个由路由器将其解释为路由指南的数组。你可以将该数组绑定到 <code>RouterLink</code> 或将该数组作为参数传递给 <code> Router.navigate</code> 方法。

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
