# Common Routing Tasks

# 常见路由任务

This topic describes how to implement many of the common tasks associated with adding the Angular router to your application.

本主题讲述当把 Angular 路由器添加到应用中时，如何实现多种常见路由任务。

{@a basics}
## Generate an app with routing enabled

## 生成一个支持路由的应用

The following command uses the Angular CLI to generate a basic Angular app with an app routing module, called `AppRoutingModule`, which is an NgModule where you can configure your routes.
The app name in the following example is `routing-app`.

下面的命令会用 Angular CLI 来生成一个带有应用路由模块（`AppRoutingModule`）的基本 Angular 应用，它是一个 NgModule，可用来配置路由。下面的例子中应用的名字是 `routing-app`。

<code-example language="sh">
  ng new routing-app --routing
</code-example>

When generating a new app, the CLI prompts you to select CSS or a CSS preprocessor.
For this example, accept the default of `CSS`.

一旦生成新应用，CLI 就会提示你选择 CSS 或 CSS 预处理器。在这个例子中，我们接受 `CSS` 的默认值。

### Adding components for routing

### 为路由添加组件

To use the Angular router, an app needs to have at least two components so that it can navigate from one to the other. To create a component using the CLI, enter the following at the command line where `first` is the name of your component:

为了使用 Angular 的路由器，应用至少要有两个组件才能从一个导航到另一个。要使用 CLI 创建组件，请在命令行输入以下内容，其中 `first` 是组件的名称：

<code-example language="sh">
  ng generate component first
</code-example>

Repeat this step for a second component but give it a different name.
Here, the new name is `second`.

为第二个组件重复这个步骤，但给它一个不同的名字。这里的新名字是 `second`。

<code-example language="sh">
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

To use route guards, consider using [component-less routes](api/router/Route#componentless-routes) as this facilitates guarding child routes.

要想使用路由守卫，可以考虑使用[无组件路由](api/router/Route#componentless-routes)，因为这对于保护子路由很方便。

Create a service for your guard:

为你的守卫创建一项服务：

<code-example language="sh">
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
