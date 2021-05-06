# Adding navigation

# 添加导航

This guide builds on the first step of the Getting Started tutorial, [Get started with a basic Angular app](start "Get started with a basic Angular app").

本指南基于入门教程的第一步：[基本 Angular 应用入门](start "开始使用基本的 Angular 应用")。

At this stage of development, the online store application has a basic product catalog.

在此阶段，本在线商店应用会拥有基本的产品目录。

In the following sections, you'll add the following features to the application:

在以下各节中，你将向应用添加以下功能：

* Type a URL in the address bar to navigate to a corresponding product page.

  在地址栏中键入 URL 以导航到相应的产品页面。

* Click links on the page to navigate within your single-page application.

  单击页面上的链接以在单页应用中导航。

* Click the browser's back and forward buttons to navigate the browser history intuitively.

  单击浏览器的后退和前进按钮以直观地在浏览器的历史记录中浏览。

{@a define-routes}

## Associate a URL path with a component

## 关联 URL 路径与组件

The application already uses the Angular `Router` to navigate to the `ProductListComponent`.
This section shows you how to define a route to show individual product details.

本应用已经用 Angular `Router` 导航到了 `ProductListComponent`。本节将介绍如何定义显示单个产品详情的路由。

1. Generate a new component for product details.
    In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`.
    Name the component `product-details`.

   生成用于展示产品详情的新组件。在文件列表中，右键单击 `app` 文件夹，选择 `Angular Generator` 和 `Component`。将组件命名为 `product-details` 。

1. In `app.module.ts`, add a route for product details, with a `path` of `products/:productId` and `ProductDetailsComponent` for the `component`.

   在 `app.module.ts` 中，添加产品详情的路由，其 `path` 为 `products/:productId`，其 `component` 为 `ProductDetailsComponent`。

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="product-details-route">
    </code-example>

1. Open `product-list.component.html`.

   打开 `product-list.component.html`。

1. Modify the product name anchor to include a `routerLink` with the `product.id` as a parameter.

   修改产品名称上的链接，使其包括以 `product.id` 为参数的 `routerLink`。

    <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.html" region="router-link">
    </code-example>

    The `RouterLink` directive helps you customize the anchor element.
    In this case, the route, or URL, contains one fixed segment, `/products`.
    The final segment is variable, inserting the `id` property of the current product.
    For example, the URL for a product with an `id` of 1 would be similar to `https://getting-started-myfork.stackblitz.io/products/1`.

   `RouterLink` 指令可帮助你自定义 a 元素。在这里，路由或 URL 中包含一个固定的区段 `/products`。最后一段则是变量，插入当前产品的 `id`。
    例如，`id` 为 1 的产品的 URL 是 `https://getting-started-myfork.stackblitz.io/products/1`。

 1. Verify that the router works as intended by clicking the product name.
    The application should display the `ProductDetailsComponent`, which currently says "product-details works!"

    通过单击产品名称，验证路由器是否如预期般工作。应用中应该显示 `ProductDetailsComponent` 组件，其显示的内容为 “product-details works!”。

    Notice that the URL in the preview window changes.
    The final segment is `products/#`  where `#` is the number of the route you clicked.

    请注意，预览窗口中的 URL 发生了变化。最后一个部分是 `products/#`，其中 `#` 表示你单击的路由的编号。

    <div class="lightbox">
      <img src="generated/images/guide/start/product-details-works.png" alt="Product details view with updated URL">
    </div>

## View product details

## 查看产品详情

The `ProductDetailsComponent` handles the display of each product.
The Angular Router displays components based on the browser's URL and [your defined routes](#define-routes).

`ProductDetailsComponent` 会处理每个产品的显示工作。Angular 路由器会根据浏览器的 URL 和[你定义的路径](#define-routes)来显示组件。

In this section, you'll use the Angular Router to combine the `products` data and route information to display the specific details for each product.

在本节中，你将使用 Angular 路由器来组合 `products` 数据和路由信息以显示每个产品的特定详情。

1. In `product-details.component.ts`, import `ActivatedRoute` from `@angular/router`, and the `products` array from `../products`.

   在 `product-details.component.ts` 中，从 `@angular/router` 导入 `ActivatedRoute`，并从 `../products` 导入 `products` 数组。

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="imports">
    </code-example>

1. Define the `product` property.

   定义 `product` 属性。

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="product-prop">
    </code-example>

1. Inject `ActivatedRoute` into the `constructor()` by adding `private route: ActivatedRoute` as an argument within the constructor's parentheses.

   通过把 `private route: ActivatedRoute` 添加为构造函数括号内的参数，来把 `ActivatedRoute` 注入到 `constructor()` 中。

    <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="props-methods">
    </code-example>

    `ActivatedRoute` is specific to each component that the Angular Router loads.
    `ActivatedRoute` contains information about the route and the route's parameters.

    Angular 路由器加载的每个组件都有自己专属的 `ActivatedRoute`。`ActivatedRoute` 中包含有关路由和路由参数的信息。

    By injecting `ActivatedRoute`, you are configuring the component to use a service.
    The [Managing Data](start/start-data "Try it: Managing Data") step covers services in more detail.

    通过注入 `ActivatedRoute`，你可以配置此组件以使用服务。 [管理数据](start/start-data "尝试一下：管理数据")那一步将更详细地介绍服务。

1. In the `ngOnInit()` method, extract the `productId` from the route parameters and find the corresponding product in the `products` array.

   在 `ngOnInit()` 方法中，从路由参数中提取 `productId`，并在 `products` 数组中找到相应的产品。

    <code-example path="getting-started/src/app/product-details/product-details.component.1.ts" header="src/app/product-details/product-details.component.ts" region="get-product">
    </code-example>

    The route parameters correspond to the path variables you define in the route.
    To access the route parameters, we use `route.snapshot`, which is the `ActivatedRouteSnapshot` that contains information about the active route at that particular moment in time.
    The URL that matches the route provides the `productId` .
    Angular uses the `productId` to display the details for each unique product.

    路由参数与你在此路由中定义的路径变量相对应。要访问路由参数，我们使用 `route.snapshot` ，它是一个 `ActivatedRouteSnapshot`，其中包含有关该特定时刻的活动路由信息。与此路由匹配的 URL 提供了 `productId`。Angular 会使用 `productId` 来显示每个唯一产品的详情。

1. Update the `ProductDetailsComponent` template to display product details with an `*ngIf`.
    If a product exists, the `<div>` renders with a name, price, and description.

   更新 `ProductDetailsComponent` 的模板以显示带有 `*ngIf` 的产品详情。如果产品存在，则此 `<div>` 会显示名称、价格和说明。

    <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html" region="details">
    </code-example>

    The line, `<h4>{{ product.price | currency }}</h4>`, uses the `currency` pipe to transform `product.price` from a number to a currency string.
    A pipe is a way you can transform data in your HTML template.
    For more information about Angular pipes, see [Pipes](guide/pipes "Pipes").

    `<h4>{{ product.price | currency }}</h4>` 这一行，使用 `currency` 管道将 `product.price` 从数字转换为货币字符串。管道是一种可以在 HTML 模板中转换数据的方式。有关 Angular 管道的更多信息，请参见[管道](guide/pipes "管道") 。

When users click on a name in the product list, the router navigates them to the distinct URL for the product, shows the `ProductDetailsComponent`, and displays the product details.

当用户单击产品列表中的名称时，路由器会将其导航到产品的不同 URL，显示此 `ProductDetailsComponent`，并展示产品详情。

<div class="lightbox">
  <img src="generated/images/guide/start/product-details-routed.png" alt="Product details page with updated URL and full details displayed">
</div>

For more information about the Angular Router, see [Routing & Navigation](guide/router "Routing & Navigation guide").

有关 Angular 路由器的更多信息，请参见[路由与导航](guide/router "路由与导航指南") 。

## What's next

## 下一步是什么

You have configured your application so you can view product details, each with a distinct URL.

你已经配置好了应用，以便查看产品详情，每个产品详情都有一个不同的 URL。

To continue exploring Angular:

继续探索 Angular：

* Continue to [Managing Data](start/start-data "Try it: Managing Data") to add a shopping cart feature, manage cart data, and retrieve external data for shipping prices.

  继续[管理数据](start/start-data "尝试一下：管理数据")以添加购物车功能、管理购物车数据并检索外部数据以获取运费。

* Skip ahead to [Deployment](start/start-deployment "Try it: Deployment") to deploy your application to Firebase or move to local development.

  跳至[部署](start/start-deployment "试试看：部署")以将你的应用部署到 Firebase 或转为本地开发。

