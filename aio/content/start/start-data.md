# Try it: Manage data

# 管理数据

At the end of [In-app Navigation](start/start-routing "Try it: In-app Navigation"), the online store application has a product catalog with two views: a product list and product details.
Users can click on a product name from the list to see details in a new view, with a distinct URL, or route.

在[应用内导航](start/start-routing "试一试：应用内导航")的末尾，本应用实现了一个包含两个视图的商品名录：商品列表和商品详情。用户点击清单中的某个商品名称，就会在新视图中看到具有专门的 URL 或路由的详情页。

This page guides you through creating the shopping cart in three phases:

本页将指导你分三个步骤创建购物车：

* Update the product details view to include a "Buy" button, which adds the current product to a list of products that a cart service manages.

  修改商品详情视图，让它包含一个 “Buy” 按钮，它会把当前商品添加到由 "购物车服务" 管理的商品列表中。

* Add a cart component, which displays the items in the cart.

  添加一个购物车组件，它会显示购物车中的商品。

* Add a shipping component, which retrieves shipping prices for the items in the cart by using Angular's `HttpClient` to retrieve shipping data from a `.json` file.

  添加一个配送组件，它会使用 Angular 的 `HttpClient` 从 `.json` 文件中检索配送数据来取得购物车中这些商品的运费。

{@a services}
## Services

## 服务

Services are an integral part of Angular applications. In Angular, a service is an instance of a class that you can make available to any part of your application using Angular's [dependency injection system](guide/glossary#dependency-injection-di "Dependency injection definition").

服务是 Angular 应用的重要组成部分。在 Angular 中，服务是一个类的实例，它可以借助 Angular 的[依赖注入系统](guide/glossary#dependency-injection-di "依赖注入定义")来让应用中的任何一个部件都能使用它。

Services are the place where you share data between parts of your application. For the online store, the cart service is where you store your cart data and methods.

服务可以让你在应用的各个部件之间共享数据。对于在线商店，购物车服务就是存放购物车的数据和方法的地方。

{@a create-cart-service}
## Create the shopping cart service

## 创建购物车服务

Up to this point, users can view product information, and
simulate sharing and being notified about product changes.
They cannot, however, buy products.

到目前为止，用户可以查看商品信息、模拟共享，并接收商品变化的通知。但是，无法购买商品。

In this section, you add a "Buy" button to the product
details view and set up a cart service to store information
about products in the cart.

在本节中，你将在商品详情页中添加“Buy”按钮。你还可以设置一个购物车服务来存储购物车中商品的相关信息。

<div class="alert is-helpful">

A later part of this tutorial, [Use forms for user input](start/start-forms "Try it: Forms for user input"), guides you through accessing this cart service from the view where the user checks out.

本教程稍后的部分，[使用表单接收用户输入](start/start-forms "Try it: Forms for user input")会指引你从用户的结账视图中访问这个购物车服务。

</div>

{@a generate-cart-service}
### Define a cart service

### 定义购物车服务

1. To generate a cart service, right click on the `app` folder, choose `Angular Generator`, and choose `Service`. Name the new service `cart`.

   要想生成购物车服务，请右键单击 `app` 文件夹，选择 `Angular Generator`，并选择 `Service`。把这个新服务命名为 `cart`。

  <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.1.ts"></code-example>

  <div class="alert is-helpful">

  The StackBlitz generator might provide the cart service in `app.module.ts` by default. That differs from the example, which uses a bundle-optimization technique, an  `@Injectable()` decorator with the `{ providedIn: 'root' }` statement.
    For more information about services, see [Introduction to Services and Dependency Injection](guide/architecture-services "Concepts > Intro to Services and DI").
    
  StackBlitz 可能会默认在 `app.module.ts` 中提供购物车服务。那种方式与这个例子里不同，这里使用了打包优化技巧，也就是 `@Injectable()` 的 `{provedIn：'root'}` 语句。
  欲知这些服务的详情，参见[服务与依赖注入简介](guide/architecture-services "Concepts > Intro to Services and DI")。
    
  </div>

1. In the `CartService` class, define an `items` property to store the array of the current products in the cart.

   在 `CartService` 类中，定义一个 `items` 属性来把当前商品的数组存储在购物车中。

   <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="props"></code-example>

1. Define methods to add items to the cart, return cart items, and clear the cart items:

   定义把商品添加到购物车、返回购物车商品以及清除购物车商品的方法：

   <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="methods"></code-example>

* The `addToCart()` method appends a product to an array of `items`. 

     `addToCart()` 方法会将产品附加到 `items` 数组中。

   * The `getItems()` method collects the items users add to the cart and returns each item with its associated quantity.

     `getItems()` 方法会收集用户加到购物车中的商品，并返回每个商品及其数量。

   * The `clearCart()` method returns an empty array of items. 
   
     `clearCart()` 方法返回一个空数组。

{@a product-details-use-cart-service}
### Use the cart service

### 使用购物车服务

This section walks you through using the cart service to add a product to the cart with a "Buy" button.

本节会教你通过 “Buy” 按钮使用购物车服务来把商品添加到购物车。

1. Open `product-details.component.ts`.

   打开 `product-details.component.ts`。

1. Configure the component to use the cart service.

   配置该组件，使其能使用这个购物车服务。

   1. Import the cart service.

      导入购物车服务。

      <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.ts" region="cart-service">
      </code-example>

   1. Inject the cart service by adding it to the `constructor()`.

      通过把购物车服务注入到这里的 `constructor()` 中来注入它。

      <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="inject-cart-service">
      </code-example>

      <!--
      To do: Consider defining "inject" and describing the concept of "dependency injection"
      -->

1. Define the `addToCart()` method, which adds the current product to the cart.

   定义 `addToCart()` 方法，该方法会当前商品添加到购物车中。

    The `addToCart()` method does the following three things:
    
    `addToCart()` 方法会做下面这三件事：
    
    * Receives the current `product`.
    
      接收当前的 `product`。
    
    * Uses the cart service's `addToCart()` method to add the product the cart.
    
     使用购物车服务的 `addToCart()` 方法把该商品添加到购物车中。

    * Displays a message that you've added a product to the cart.

      显示一条消息，表明你已经把一个商品加入了购物车。

    <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="add-to-cart"></code-example>

1. Update the product details template with a "Buy" button that adds the current product to the cart.

   修改商品详情模板，让它具有一个“Buy”按钮，用于把当前商品添加到购物车中。

   1. Open `product-details.component.html`.

      打开 `product-details.component.html`。

   1. Add a button with the label "Buy", and bind the `click()` event to the `addToCart()` method:

      添加一个标签为“Buy”的按钮，并把其 `click()` 事件绑定到 `addToCart()` 方法：

      <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html">
      </code-example>
    
    <div class="alert is-helpful">

    The line, `<h4>{{ product.price | currency }}</h4>` uses the `currency` pipe to transform `product.price` from a number to a currency string. A pipe is a way you can transform data in your HTML template. For more information about Angular pipes, see [Pipes](guide/pipes "Pipes").

    `<h4>{{ product.price | currency }}</h4>` 折行使用了 `currency` 管道将 `product.price` 从数字转换为货币字符串。管道是一种可以在 HTML 模板中转换数据的方法。有关 Angular 管道的更多信息，参见[管道](guide/pipes "Pipes")。
    
    </div>

1. To see the new "Buy" button, refresh the application and click on a product's name to display its details.

    要查看新的“Buy”按钮，请刷新应用并单击商品名称以显示其详细信息。

   <div class="lightbox">
      <img src='generated/images/guide/start/product-details-buy.png' alt="Display details for selected product with a Buy button">
    </div>

1. Click the "Buy" button to add the product to the stored list of items in the cart and display a confirmation message.

   点击“Buy”按钮来把该商品添加到购物车中存储的商品列表中，并显示一条确认消息。

   <div class="lightbox">
     <img src='generated/images/guide/start/buy-alert.png' alt="Display details for selected product with a Buy button">
   </div>

## Create the cart view

## 创建购物车视图

At this point, users can put items in the cart by clicking "Buy", but they can't yet see their cart.

此时，用户可以通过点击“Buy”来把商品放入购物车，但他们还看不到购物车。

Create the cart view in two steps: 

分两步创建购物车视图：

1. Create a cart component and configure routing to the new component. At this point, the cart view has only default text. 

   创建一个购物车组件并配置指向这个新组件的路由。此时，购物车视图只会显示默认文本。

1. Display the cart items. 

   显示购物车商品

### Set up the component

### 设置该组件

 To create the cart view, begin by following the same steps you did to create the product details component and configure routing for the new component.

 要创建购物车视图，首先要执行与创建商品详情组件相同的步骤，并为这个新组件设置路由。

1. Generate a cart component, named `cart`.

   生成一个名叫 `cart` 的购物车组件。

   Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`. 

   提示：在文件列表框中，右键单击 `app` 文件夹，选择 `Angular Generator` 和 `Component`。

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.1.ts"></code-example>

1. Add routing (a URL pattern) for the cart component.

   为购物车组件添加路由（URL 模式）。

   Open `app.module.ts` and add a route for the component `CartComponent`, with a `path` of `cart`:

   打开 `app.module.ts`，为组件 `CartComponent` 添加一个路由，其路由为 `cart` ：

   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="cart-route">
   </code-example>

1. Update the "Checkout" button so that it routes to the `/cart` url.

   修改 "Checkout" 按钮，以便让它路由到 `/cart`。

    Open `top-bar.component.html` and add a `routerLink` directive pointing to `/cart`.

    打开 `top-bar.component.html` 并添加一个指向 `/cart` 的 `routerLink` 指令。

    <code-example
        header="src/app/top-bar/top-bar.component.html"
        path="getting-started/src/app/top-bar/top-bar.component.html"
        region="cart-route">
    </code-example>

1. To see the new cart component, click the "Checkout" button. You can see the "cart works!" default text, and the URL has the pattern `https://getting-started.stackblitz.io/cart`,  where `getting-started.stackblitz.io` may be different for your StackBlitz project.

   要查看新的购物车组件，请点击“Checkout”按钮。你会看到默认文本“cart works!”，该 URL 的格式为 `https://getting-started.stackblitz.io/cart`，其中的 getting-started.stackblitz.io 部分可能与你的 StackBlitz 项目不同。

    <div class="lightbox">
     <img src='generated/images/guide/start/cart-works.png' alt="Display cart view before customizing">
   </div>

### Display the cart items

### 显示购物车商品

You can use services to share data across components:

你可以用服务来跨组件共享数据：

* The product details component already uses the cart service to add products to the cart.

  商品详情组件已经使用了购物车服务（ `CartService` ）来把商品添加到购物车中。

* This section shows you how to use the cart service to display the products in the cart.

  本节将告诉你如何修改购物车组件以使用购物车服务来显示购物车中的商品。

1. Open `cart.component.ts`.

   打开 `cart.component.ts`。

1. Configure the component to use the cart service.

   设置该组件是为了让它能够使用这个购物车服务。（这与你在前面设置商品详情组件以使用购物车服务的方式是一样的。）

   1. Import the `CartService` from the `cart.service.ts` file.

      从 `cart.service.ts` 文件中导入 `CartService`。

      <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.2.ts" region="imports">
      </code-example>

   1. Inject the `CartService` so that the cart component can use it.

      注入 `CartService`，以便购物车组件可以使用它。

      <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="inject-cart">
      </code-example>

1. Define the `items` property to store the products in the cart.

   定义 `items` 属性，以便把商品存放在购物车中。

   <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="items">
   </code-example>

1. Set the items using the cart service's `getItems()` method. Recall that you defined this method [when you generated `cart.service.ts`](#generate-cart-service).

   使用购物车服务的 `getItems()` 方法设置这些商品。回想一下，你[在生成 `cart.service.ts` 时](#generate-cart-service)定义过这个方法。

   The resulting `CartComponent` class is as follows:

   所生成的 `CartComponent` 类是这样的：

   <code-example path="getting-started/src/app/cart/cart.component.3.ts" header="src/app/cart/cart.component.ts" region="props-services">
   </code-example>

1. Update the template with a header, and use a `<div>` with an `*ngFor` to display each of the cart items with its name and price.

   修改模板，加上标题，用带有 `*ngFor` 的 `<div>` 来显示每个购物车商品的名字和价格。

   The resulting `CartComponent` template is as follows:

   生成的 `CartComponent` 模板如下：

   <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html" region="prices">
   </code-example>

1. Test your cart component.

   测试你的购物车组件。

   1. Click on "My Store" to go to the product list view.

      点击“My Store”，进入商品列表视图。

   1. Click on a product name to display its details.

      单击商品名称以显示其详细信息。

   1. Click "Buy" to add the product to the cart.

      点击“Buy”，即可将商品添加到购物车。

   1. Click "Checkout" to see the cart. 

      点击“Checkout”查看购物车。

   1. To add another product, click "My Store" to return to the product list. 

      要添加其它商品，请点击“My Store”返回商品列表。

  Repeat to add more items to the cart.

  重复上述步骤来添加更多条目。
  
    <div class="lightbox">
      <img src='generated/images/guide/start/cart-page-full.png' alt="Cart view with products added">
    </div>

<div class="alert is-helpful">

StackBlitz tip: Any time the preview refreshes, the cart is cleared. If you make changes to the app, the page refreshes, so you'll need to buy products again to populate the cart.

StackBlitz 提示：只要预览刷新，就会清除购物车。如果你对该应用进行了更改，视图就会刷新，你需要重新购买商品来填充购物车。

</div>

<div class="alert is-helpful">

For more information about services, see [Introduction to Services and Dependency Injection](guide/architecture-services "Concepts > Intro to Services and DI").

要了解关于服务的更多信息，请参阅[“服务和依赖注入简介”](guide/architecture-services "概念>服务简介和 DI")。

</div>

## Retrieve shipping prices

## 检索运费价格

<!-- Accessing data with the HTTP client -->

Servers often return data in the form of a stream.
Streams are useful because they make it easy to transform the returned data and  make modifications to the way you request that data.
The Angular HTTP client, `HttpClient`, is a built-in way to fetch data from external APIs and provide them to your app as a stream.

服务器通常采用流的形式返回数据。
流是很有用的，因为它们可以很容易地转换返回的数据，也可以修改你请求数据的方式。
Angular 的 HTTP 客户端（ `HttpClient` ）是一种内置的方式，可以从外部 API 中获取数据，并以流的形式提供给你的应用。

This section shows you how to use the HTTP client to retrieve shipping prices from an external file.

本节会为你展示如何使用 HTTP 客户端从外部文件中检索运费。

### Predefined shipping data

### 预定义的配送数据

The application that StackBlitz generates for this guide comes with predefined shipping data in `assets/shipping.json`.
Use this data to add shipping prices for items in the cart.

在本指南的 StackBlitz 应用中，通过 `assets/shipping.json` 文件提供了一些预定义的配送数据。你可以利用这些数据为购物车中的商品添加运费。

<code-example header="src/assets/shipping.json" path="getting-started/src/assets/shipping.json">
</code-example>

### Use `HttpClient` in the `AppModule`

### 在 `AppModule` 中为应用启用 `HttpClient`

Before you can use Angular's HTTP client, you must configure your app to use `HttpClientModule`.

在使用 Angular 的 HTTP 客户端之前，你必须先配置你的应用来使用 `HttpClientModule`。

Angular's `HttpClientModule` registers the providers your app needs to use a single instance of the `HttpClient` service throughout your app.

Angular 的 `HttpClientModule` 中注册了在整个应用中使用 `HttpClient` 服务的单个实例所需的服务提供者。

1. Open `app.module.ts`.

   打开 `app.module.ts`。

   This file contains imports and functionality that is available to the entire app.

   该文件包含可供整个应用使用的导入对象和功能。

1. Import `HttpClientModule` from the `@angular/common/http` package at the top of the file with the other imports. As there are a number of other imports, this code snippet omits them for brevity. Be sure to leave the existing imports in place.

   在该文件的顶部从 `@angular/common/http` 包中导入 `HttpClientModule` 以及其它导入项。
   由于有很多其它导入项，因此这里的代码片段省略它们，以保持简洁。请确保现有的导入都还在原地。

   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="http-client-module-import">
   </code-example>

1. Add `HttpClientModule` to the `AppModule` `@NgModule()` `imports` array to register Angular's `HttpClient` providers globally.

   把 `HttpClientModule` 添加到 `AppModule` `@NgModule()` 的 `imports` 数组中，以便全局注册 Angular 的 `HttpClient`。

    <code-example path="getting-started/src/app/app.module.ts" header="src/app/app.module.ts" region="http-client-module">
    </code-example>

### Use `HttpClient` in the cart service

### 在购物车服务中使用 `HttpClient`

Now that the `AppModule` imports the `HttpClientModule`, the next step is to inject the `HttpClient` service into your service so your app can fetch data and interact with external APIs and resources.

`AppModule` 已经导入了 `HttpClientModule`，接下来就是将 `HttpClient` 服务注入到你的服务中，以便此应用可以获取数据并与外部 API 和资源进行交互。

1. Open `cart.service.ts`.

   打开 `cart.service.ts`。

1. Import `HttpClient` from the `@angular/common/http` package.

   从 `@angular/common/http` 包中导入 `HttpClient`。

   <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="import-http">
   </code-example>

1. Inject `HttpClient` into the `CartService` constructor:

   把 `HttpClient` 注入到 `CartService` 的构造函数中：

   <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="inject-http">
   </code-example>

### Define the `get()` method

### 定义 `get()` 方法

Multiple components can leverage the same service.
Later in this tutorial, the shipping component uses the cart service to retrieve shipping data via HTTP from the `shipping.json` file.
First, define a `get()` method.

多个组件可以使用同一个服务。在这个教程的后半部分，商品配送组件使用该购物车服务从 `shipping.json` 文件中借助 HTTP 检索配送数据。
首先要定义一个 `get()` 方法。

1. Continue working in `cart.service.ts`.

   继续在 `cart.service.ts` 中工作。

1. Below the `clearCart()` method, define a new `getShippingPrices()` method that uses the `HttpClient` `get()` method to retrieve the shipping data.

   在 `clearCart()` 方法下面，定义一个新的 `getShippingPrices()` 方法，该方法使用 `HttpClient#get()` 方法检索配送数据（类型和价格）。

   <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="get-shipping"></code-example>

<div class="alert is-helpful">

For more information about Angular's `HttpClient`, see the [Client-Server Interaction](guide/http "Server interaction through HTTP") guide.

要了解关于 Angular `HttpClient` 的更多信息，请参阅[客户端-服务器集成](guide/http "HttpClient 指南")指南。

</div>

## Define the shipping view

## 定义配送视图

Now that your app can retrieve shipping data, create a shipping component and  template.

现在你的应用已经可以检索配送数据了，你还要创建一个配送组件和相关的模板。

1. Generate a new component named `shipping`.

   生成一个名为 `shipping` 的新组件。

   Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`. 

   提示：在文件列表框中，右键单击 `app` 文件夹，选择 `Angular Generator` 和 `Component`。

   <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.1.ts"></code-example>

1. In `app.module.ts`, add a route for shipping. Specify a `path` of `shipping` and a component of `ShippingComponent`.

   在 `app.module.ts` 中，添加一个配送路由。其 `path` 为 `shipping`，其 component 为 `ShippingComponent`。

   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="shipping-route"></code-example>

   There's no link to the new shipping component yet, but you can see its template in the preview pane by entering the URL its route specifies. The URL has the pattern: `https://getting-started.stackblitz.io/shipping` where the `getting-started.stackblitz.io` part may be different for your StackBlitz project.

   新的配送组件尚未链接到任何其它组件，但你可以通过输入其路由指定的 URL 在预览窗格中看到它的模板。该 URL 具有以下模式：`https://getting-started.stackblitz.io/shipping`，其中的 gets-started.stackblitz.io 部分可能与你的 StackBlitz 项目不同。

1. Modify the shipping component so that it uses the cart service to retrieve shipping data via HTTP from the `shipping.json` file.

   修改配送组件，让它利用购物车服务从 `shipping.json` 文件中通过 HTTP 检索配送数据。

   1. Import the cart service.

      导入购物车服务。

      <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.ts" region="imports"></code-example>

   1. Define a `shippingCosts` property.

      定义 `shippingCosts` 属性。

      <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="props"></code-example>

   1. Inject the cart service in the `ShippingComponent` constructor:

      把购物车服务注入到 `ShippingComponent` 的构造函数中：

      <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="inject-cart-service"></code-example>

   1. Set the `shippingCosts` property using the `getShippingPrices()` method from the cart service.

      利用购物车服务的 `getShippingPrices()` 方法设置 `shippingCosts` 属性。

      <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="ctor"></code-example>

1. Update the shipping component's template to display the shipping types and prices using the `async` pipe:

   利用 `async` 管道修改配送组件的模板，以显示配送类型和价格：

   <code-example header="src/app/shipping/shipping.component.html" path="getting-started/src/app/shipping/shipping.component.html"></code-example>

   The `async` pipe returns the latest value from a stream of data and continues to do so for the life of a given component. When Angular destroys that component, the `async` pipe automatically stops. For detailed information about the `async` pipe
   , see the [AsyncPipe API documentation](/api/common/AsyncPipe).

   `async` 管道从数据流中返回最新值，并在所属组件的生命期内持续返回。当 Angular 销毁该组件时，`async` 管道会自动停止。有关 `async` 管道的详细信息，请参见 [AsyncPipe API 文档](/api/common/AsyncPipe)。

1. Add a link from the cart view to the shipping view:

   在购物车视图中添加一个到配送视图的链接：

   <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html"></code-example>

1. Test your shipping prices feature:

   测试这个运费价格功能：

   Click the "Checkout" button to see the updated cart. Remember that changing the app causes the preview to refresh, which empties the cart.

   点击“Checkout”按钮，查看更新后的购物车。（注意，修改应用会导致预览窗格刷新，这会清空购物车。）

   <div class="lightbox">
     <img src='generated/images/guide/start/cart-empty-with-shipping-prices.png' alt="Cart with link to shipping prices">
   </div>

   Click on the link to navigate to the shipping prices.

   点击此链接可以导航到运费页。

   <div class="lightbox">
     <img src='generated/images/guide/start/shipping-prices.png' alt="Display shipping prices">
   </div>

## Next steps

## 下一步

Congratulations! You have an online store application with a product catalog and shopping cart. You can also look up and display shipping prices.

恭喜！你有一个带有商品名录和购物车的在线商店应用了，而且你还可以查询并显示运费。

To continue exploring Angular, choose either of the following options:

要继续探索 Angular，请选择下列选项之一：

* [Continue to the "Forms" section](start/start-forms "Try it: Forms for User Input") to finish the app by adding the shopping cart view and a checkout form. 

  [继续浏览“表单”部分](start/start-forms "试一试：用表单接收用户输入")，通过添加购物车视图和一个结账表单来完成该应用。

* [Skip ahead to the "Deployment" section](start/start-deployment "Try it: Deployment") to move to local development, or deploy your app to Firebase or your own server. 

  [跳到“部署”部分，](start/start-deployment "试一试：部署")把你的应用部署到 Firebase 或转成本地开发。

