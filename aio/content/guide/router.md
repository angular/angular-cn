# In-app navigation: routing to views

# 应用内导航：路由到视图

In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page.
As users perform application tasks, they need to move between the different [views](guide/glossary#view "Definition of view") that you have defined.

在单页面应用中，你可以通过显示或隐藏特定组件的显示部分来改变用户能看到的内容，而不用去服务器获取新页面。当用户执行应用任务时，他们要在你预定义的不同[视图](guide/glossary#view "视图的定义")之间移动。要想在应用的单个页面中实现这种导航，你可以使用 Angular 的**`Router`**（路由器）。

To handle the navigation from one [view](guide/glossary#view) to the next, you use the Angular **`Router`**.
The **`Router`** enables navigation by interpreting a browser URL as an instruction to change the view.

为了处理从一个[视图](guide/glossary#view)到下一个视图之间的导航，你可以使用 Angular 的*路由器*。路由器会把浏览器 URL 解释成改变视图的操作指南，以完成导航。

To explore a sample app featuring the router's primary features, see the <live-example></live-example>.

要探索一个具备路由器主要功能的范例应用，请参阅<live-example></live-example>。

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

关于这个现成应用的 Angular 简介，请参阅[快速上手](start)。关于构建 Angular 应用的更深入体验，请参阅[英雄之旅](tutorial)教程。两者都会指导你使用组件类和模板。

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

{@a getting-route-information}

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

这两个星号 `**` 告诉 Angular，这个 `routes` 定义是通配符路由。对于 component 属性，你可以使用应用中的任何组件。常见的选择包括应用专属的 `PageNotFoundComponent`，你可以定义它来向用户[展示 404 页面](guide/router#404-page-how-to)，或者跳转到应用的主组件。通配符路由是最后一个路由，因为它匹配所有的 URL。关于路由顺序的更多详细信息，请参阅[路由顺序](guide/router#route-order)。

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

For more details on `pathMatch` see [Spotlight on `pathMatch`](guide/router-tutorial-toh#pathmatch).

关于 `pathMatch` 的详情，请参阅[聚焦 `pathMatch`](guide/router-tutorial-toh#pathmatch)部分。

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

有时，应用中的某个特性需要访问路由的部件，比如查询参数或片段（fragment）。本教程的这个阶段使用了一个“英雄之旅”中的列表视图，你可以在其中点击一个英雄来查看详情。路由器使用 `id` 来显示正确的英雄的详情。

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

配置这个类，让你有一个可观察对象 `heroes$`、一个用来保存英雄的 `id` 号的 `selectedId`，以及 `ngOnInit()` 中的英雄们，添加下面的代码来获取所选英雄的 `id`。这个代码片段假设你有一个英雄列表、一个英雄服务、一个能获取你的英雄的函数，以及用来渲染你的列表和细节的 HTML，就像在《英雄之旅》例子中一样。

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

  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit() {
    const heroId = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.service.getHero(heroId);
  }

  gotoItems(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/heroes', { id: heroId }]);
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

关于惰性加载和预加载的详情，请参阅专门的指南[惰性加载 NgModule](guide/lazy-loading-ngmodules)。

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

For more information with a working example, see the [routing tutorial section on route guards](guide/router-tutorial-toh#milestone-5-route-guards).

关于此可工作范例的更多信息，请参阅[路由导航中关于路由守卫的部分](guide/router-tutorial-toh#milestone-5-route-guards)。

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

The following minimal `RouterLink` example builds upon a specified [default child route](guide/router-tutorial-toh#a-crisis-center-with-child-routes) for the crisis center.

下面这个最小化 `RouterLink` 例子是基于危机中心指定的[默认子路由](guide/router-tutorial-toh#a-crisis-center-with-child-routes)构建的。

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

关于提供程序和引导过程的更多信息，请参阅[依赖注入](guide/dependency-injection#bootstrap)。

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

The guidelines that follow will refer to different parts of a URL. This diagram outlines what those parts refer to:

后面的指南中会引用 URL 的不同部分。下图是这些部分所指内容的梗概：

```
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
```

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

1. Provide the router with an appropriate `APP_BASE_HREF` value.

   用适当的[APP_BASE_HREF][]值提供（provide）路由器。

1. Use root URLs (URLs with an `authority`) for all web resources: CSS, images, scripts, and template HTML files.

   对所有 Web 资源（CSS、图片、脚本和模板 HTML 文件）使用根 URL（高优先度 URL）。

* The `<base href>` `path` should end with a "/", as browsers ignore characters in the `path` that follow the right-most "/".

   `<base href>` 的 `path` 应该用 "/" 结尾，浏览器会忽略 `path` 中最右边的 "/" 后面的字符。

* If the `<base href>` includes a `query` part, the `query` is only used if the `path` of a link in the page is empty and has no `query`.
This means that a `query` in the `<base href>` is only included when using `HashLocationStrategy`.

   如果 `<base href>` 包含 `query` 部分，则只有页内链接的 `path` 部分为空并且没有 `query` 时，才会使用这里的 `query`。
   这意味着 `<base href>` 中的 `query` 部分只有在使用 `HashLocationStrategy` 策略时才有用。

* If a link in the page is a root URL (has an `authority`), the `<base href>` is not used. In this way, an `APP_BASE_HREF` with an authority will cause all links created by Angular to ignore the `<base href>` value.

   如果页内链接是根 URL（高优先度 URL），则 `<base href>` 不会使用。在这种方式下，`APP_BASE_HREF` 的优先度将会导致所有由 Angular 创建的链接忽略 `<base href>`。

* A fragment in the `<base href>` is _never_ persisted.

   `<base href>` 中的片段（#后面的部分）*永远不会*被使用。

For more complete information on how `<base href>` is used to construct target URIs, see the [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2) section on transforming references.

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

关于浏览器 URL 风格的更多信息，请参阅 [`LocationStrategy` 和浏览器 URL 风格](#browser-url-styles)。

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

Two older properties are still available, however, their replacements are preferable as they may be deprecated in a future Angular version.

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
