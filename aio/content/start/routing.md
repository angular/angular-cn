# Routing

# 路由

At the end of [Your First App](start "Getting Started: Your First App"), the online store application has a basic product catalog.
The app doesn't have any variable states or navigation.
There is one URL, and that URL always displays the "My Store" page with a list of products and their descriptions.

在[你的第一个应用](start "入门：你的第一个应用")结束时，这个在线商店应用会有一个基本的商品名录。该应用还没有任何可变的状态或导航。它只有一个 URL，该 URL 总是会显示“我的商店”页面，其中是商品列表及其描述。

This guide shows you how to use the Angular Router to display full product details in separate pages, each with their own URLs.

本指南会教你如何使用 Angular 路由器来用一些独立页面显示完整的产品详情，这些页面有自己的 URL。

The Angular [Router](guide/glossary#router "Router definition") enables you to show different components and data to the user based on where the user is in the application.
The router enables navigation from one view to the next as users perform tasks such as the following:

Angular [路由器](guide/glossary#router "Router definition")能让你根据用户在应用中的位置向用户显示不同的组件和数据。当用户执行应用任务时，路由器可以从一个视图导航到另一个视图。比如：

* Entering a URL in the address bar to navigate to a corresponding page.

  在地址栏中输入一个 URL，导航到相应的页面。

* Clicking links on the page to navigate to a new page.

  点击页面上的链接，导航到新页面。

* Clicking the browser's back and forward buttons to navigate backward and forward through the browser history.

  点击浏览器的后退和前进按钮，在浏览器的历史中前后导航。

## Registering a route

## 注册路由

The app is already set up to use the Angular Router and to use routing to navigate to the product list component you modified earlier. This section shows you how to define a route to show individual product details.

该应用已经设置为使用 Angular 路由器，并通过路由导航到之前修改过的商品列表组件。本节会向你展示如何定义一个可以显示单个商品详情的路由。

1. Generate a new component for product details. Give the component the name `product-details`.

   为商品详情生成一个新组件。把组件命名为 `product-details`。

    Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`.

    提示：在文件列表框中，右键单击 `app` 文件夹，选择 `Angular Generator` 和 `Component`。

1. In `app.module.ts`, add a route for product details, with a `path` of `products/:productId` and `ProductDetailsComponent` for the `component`.

   在 `app.module.ts` 中，添加一个商品详情路由，该路由的 `path` 是 `products/:productId`，`component` 是 `ProductDetailsComponent`。

   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="product-details-route">
   </code-example>

   A route associates one or more URL paths with a component.

   路由会将一个或多个 URL 路径与一个组件关联起来。

1. The directive configures the component template to define how the user navigates to the route or URL. When the user clicks a product name, the app  displays the details for that product.

   该指令配置组件的模板，以定义用户如何导航到路由或 URL。当用户点击商品名称时，应用就会显示那个商品的详情。

   1. Open `product-list.component.html`.

      打开 `product-list.component.html`。

   1. Update the `*ngFor` directive to assign each index in the `products` array to the `productId` variable when iterating over the list.

      修改 `*ngFor` 指令，在遍历列表的过程中把 `products` 数组中的每个索引赋值给 `productId` 变量。

   1. Modify the product name anchor to include a `routerLink`.

      修改商品名称的链接，使其包含 `routerLink`。

   <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.html" region="router-link">
   </code-example>

   The RouterLink directive gives the router control over the anchor element. In this case, the route, or URL, contains one fixed segment, `/products`, while the final segment is variable, inserting the id property of the current product. For example, the URL for a product with an `id` of 1 will be similar to `https://getting-started-myfork.stackblitz.io/products/1`.
   
    RouterLink 指令让路由器控制了一个链接元素。在这种情况下，路由或 URL 包含一个固定的区段（ `/products` ），但其最后一个区段是变量，要插入当前商品的 id 属性。例如，`id` 为 1 的商品的 URL 类似于 `https://getting-started-myfork.stackblitz.io/products/1`。

     1. Test the router by clicking a product name. The app displays the product details component, which currently always says "product-details works!"

        通过单击商品名称来测试路由器。该应用会显示商品详情组件，该组件目前始终显示 “product-details works！” 

    Notice that the URL in the preview window changes. The final segment is `products/#`  where `#` is the number of the route you clicked.

    注意预览窗口中的 URL 变化了。它的最后一段是 `products/#`，这里的 `#` 代表你点击的那个路由的编号。

    <div class="lightbox">
      <img src="generated/images/guide/start/product-details-works.png" alt="Product details page with updated URL">
    </div>



## Using route information

## 使用路由信息

The product details component handles the display of each product. The Angular Router displays components based on the browser's URL and your defined routes. This section shows you how to use the Angular Router to combine the `products` data and route information to display the specific details for each product.

商品详情组件负责处理每个商品的显示。Angular 的路由器会根据浏览器的 URL 和你定义的这些路由来决定如何显示组件。本节会告诉你如何通过 Angular 的路由器来组合使用 `products` 数据和路由信息，以显示每个商品的详情。

1. Open `product-details.component.ts`

   打开 `product-details.component.ts` 文件

1. Arrange to use product data from an external file.

   改用外部文件中的商品数据。

   1. Import `ActivatedRoute` from the `@angular/router` package, and the `products` array from `../products`.

      从 `@angular/router` 包导入 `ActivatedRoute`，从 `../products` 文件导入 `products` 数组。

      <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="imports">
      </code-example>

   1. Define the `product` property and inject the `ActivatedRoute` into the constructor by adding it as an argument within the constructor's parentheses.

      定义 `product` 属性，并将 `ActivatedRoute` 作为参数添加到构造函数的括号中，以便把它注入到构造函数中。

      <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.1.ts" region="props-methods">
      </code-example>

      The `ActivatedRoute` is specific to each routed component that the Angular Router loads. It contains information about the
      route, its parameters, and additional data associated with the route.

      `ActivatedRoute` 专门用于由 Angular 路由器加载的每个路由组件。它包含关于该路由，路由参数以及与该路由关联的其它数据的信息。

      By injecting the `ActivatedRoute`, you are configuring the component to use a service. While this part of the Getting Started tutorial uses this syntax briefly, the [Managing Data](start/data "Getting Started: Managing Data") page covers services in more detail.

      通过注入 `ActivatedRoute`，你把该组件配置成了使用服务的。《快速上手》教程中的这部分只是简略使用了该语法，在[管理数据](start/data "Getting Started: Managing Data")部分深入讲解了服务的更多细节。

1. In the `ngOnInit()` method, subscribe to route parameters and fetch the product based on the `productId`.

   在 `ngOnInit()` 方法中订阅了路由参数，并且根据 `productId` 获取了该产品。

    <code-example path="getting-started/src/app/product-details/product-details.component.1.ts" header="src/app/product-details/product-details.component.ts" region="get-product">
    </code-example>

   The route parameters correspond to the path variables you define in the route. The URL that matches the route provides the `productId`. Angular uses the `productId` to display the details for each unique product.

   这个路由参数对应于你在路由中定义的路径变量。与该路由匹配的 URL 提供了 `productId`。 Angular 使用这个 `productId` 来显示每个单独商品的详细信息。

1. Update the template to display product details information inside an `*ngIf`.

   修改模板，在 `*ngIf` 中显示商品详情。

   <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html" region="details">
   </code-example>

Now, when users click on a name in the product list, the router navigates them to the distinct URL for the product, swaps out the product list component for the product details component, and displays the product details.

现在，当用户点击商品列表中的某个名字时，路由器就会导航到商品的不同网址，用商品详情组件代替商品列表组件，并显示商品详情。

  <div class="lightbox">
  <img src="generated/images/guide/start/product-details-routed.png" alt="Product details page with updated URL and full details displayed">
</div>

<div class="alert is-helpful">

For more information about the Angular Router, see [Routing & Navigation](guide/router "Routing & Navigation").

要了解关于 Angular 路由器的更多信息，请参阅[路由和导航](guide/router "路由与导航")。

</div>

## Next steps

## 下一步

Congratulations! You have integrated routing into your online store.

恭喜！你已经把路由集成到你的在线商店了。

* Products are linked from the product list page to individual products.

  从商品列表页面链接到了单个商品。

* Users can click on a product name from the list to see details in a new view, with a distinct URL/route.

  用户可以点击列表中的某个商品名称来在新视图中查看其详细信息，并带有显著的 URL/路由。

To continue exploring Angular, choose either of the following options:

要继续探索 Angular，请选择以下选项之一：

* [Continue to the "Managing Data" section](start/data "Getting Started: Managing Data") to add a shopping cart feature, use a service to manage the cart data and use HTTP to retrieve external data for shipping prices. 

  [继续浏览“管理数据”部分](start/data "入门：管理数据")，以添加购物车功能，使用服务来管理购物车数据，并通过 HTTP 检索配送价格的外部数据。

* [Skip ahead to the Deployment section](start/deployment "Getting Started: Deployment") to deploy your app to Firebase or move to local development. 

  [跳到部署部分](start/deployment "入门：部署")，把你的应用部署到 Firebase 或转成本地开发。

