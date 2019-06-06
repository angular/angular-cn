# Managing Data

# 管理数据


At the end of [Routing](getting-started/routing "Getting Started: Routing"), the online store application has a product catalog with two views: a product list and product details. 
Users can click on a product name from the list to see details in a new view, with a distinct URL (route). 

在[路由](getting-started/routing "入门：路由")的末尾，本应用实现了一个包含两个视图的商品名录：商品列表和商品详情。用户点击清单中的某个商品名称，就会在新视图中看到具有显著 URL（路由）的详情页。


In this section, you'll create the shopping cart. You'll:

在本节中，你将创建购物车。你将：


* Update the product details page to include a "Buy" button, which adds the current product to a list of products managed by a cart service. 

  修改商品详情页，让它包含一个 “Buy” 按钮，它会把当前商品添加到由 "购物车服务" 管理的商品列表中。

* Add a cart component, which displays the items you added to your cart.

  添加一个购物车组件，它会显示你添加到购物车中的商品。

* Add a shipping component, which retrieves shipping prices for the items in the cart by using Angular's HttpClient to retrieve shipping data from a `.json` file.

  添加一个配送组件，它会使用 Angular 的 HttpClient 从 `.json` 文件中检索配送数据来取得购物车中这些商品的运费。


{@a services}
## Services

## 服务


Services are an integral part of Angular applications. In Angular, a service is an instance of a class that can be made available to any part of your application using Angular's [dependency injection system](guide/glossary#dependency-injection-di "dependency injection definition").

服务是 Angular 应用的重要组成部分。在 Angular 中，服务是一个类的实例，它可以借助 Angular 的[依赖注入系统](guide/glossary#dependency-injection-di "依赖注入定义")来让应用中的任何一个部件都能使用它。


Services are the place where you share data between parts of your application. For the online store, the cart service is where you store your cart data and methods.

服务可以让你在应用的各个部件之间共享数据。对于在线商店，购物车服务就是存放购物车的数据和方法的地方。


{@a create-cart-service}
## Create the shopping cart service

## 创建购物车服务


Up to this point, users can view product information, and simulate sharing and being notified about product changes. They cannot, however, buy products. 

到目前为止，用户可以查看商品信息、模拟共享，并接收商品变化的通知。但是，无法购买商品。


In this section, you'll add a "Buy" button the product details page. 
You'll also set up a cart service to store information about products in the cart.

在本节中，你将在商品详情页中添加“Buy”按钮。你还可以设置一个购物车服务来存储购物车中商品的相关信息。


<div class="alert is-helpful">

Later, in the [Forms](getting-started/forms "Getting Started: Forms") part of this tutorial, this cart service also will be accessed from the page where the user checks out. 

稍后，在本教程的[表单](getting-started/forms "入门：表单")部分，也会从用户的结账页面中访问这个 购物车服务。


</div>

{@a generate-cart-service}
### Define a cart service

### 定义购物车服务


1. Generate a cart service.

   生成购物车服务。


   1. Right click on the `app` folder, choose `Angular Generator`, and choose `**Service**`. Name the new service `cart`.

      右键单击 `app` 文件夹，选择 `Angular Generator`，然后选择 `**Service**`。把新的服务命名为 `cart`。


      <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.1.ts"></code-example>




   1. If the generated `@Injectable()` decorator does not include the `{ providedIn: 'root' }` statement, then insert it as shown above.

      如果生成的 `@Injectable()` 装饰器中没有包含 `{ providedIn: 'root' }` 语句，那就插入它，如上图所示。


1. In the `CartService` class, define an `items` property to store the list (array) of the current products in the cart. 

   在 `CartService` 类中，定义一个 `items` 属性来把当前商品的列表（数组）存储在购物车中。


   <code-example path="getting-started/src/app/cart.service.ts" region="props"></code-example>




1. Define methods to add items to the cart, return cart items, and clear the cart items: 

   定义把商品添加到购物车、返回购物车商品以及清除购物车商品的方法：


   <code-example path="getting-started/src/app/cart.service.ts" region="methods" linenums="false"></code-example>




   <!--
   To check: StackBlitz includes the constructor. If it's important (and not obvious) that the methods be below the constructor, then we should show it or say something. 
   -->

   <!-- 
   * The `addToCart()` method appends a product to an array of `items`. 

   * The `getItems()` method collects the items added to the cart and returns each item with its associated quantity.

   * The `clearCart()` method returns an empty array of items. 
   -->

{@a product-details-use-cart-service}
### Use the cart service

### 使用购物车服务


In this section, you'll update the product details component to use the cart service. 
You'll add a "Buy" button to the product details view. 
When the "Buy" button is clicked, you'll use the cart service to add the current product to the cart. 

在本节中，你将修改商品详情组件以使用这个购物车服务。你可以在商品详情视图中添加一个“Buy”按钮。单击“Buy”按钮后，你将借助购物车服务来把当前商品添加到购物车中。


1. Open `product-details.component.ts`.

   打开 `product-details.component.ts`。


1. Set up the component to be able to use the cart service. 

   设置该组件，使其能使用这个购物车服务。


   1. Import the cart service. 

      导入购物车服务。


      <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.ts" region="cart-service">
      </code-example>

   1. Inject the cart service.

      注入购物车服务。


      <code-example path="getting-started/src/app/product-details/product-details.component.ts" region="inject-cart-service">
      </code-example>

      <!-- 
      To do: Consider defining "inject" and describing the concept of "dependency injection"
      -->

1. Define the `addToCart()` method, which adds the current product to the cart. 

   定义 `addToCart()` 方法，该方法会当前商品添加到购物车中。


   The `addToCart()` method:

   `addToCart()` 方法：


   * Receives the current `product`

     收到当前的 `product`

   * Uses the cart service's `#addToCart()` method to add the product the cart

     使用购物车服务的 `#addToCart()` 方法把该商品添加到购物车中

   * Displays a message that the product has been added to the cart

     显示一条 "商品已添加到购物车" 的消息


   <code-example path="getting-started/src/app/product-details/product-details.component.ts" region="add-to-cart"></code-example>




1. Update the product details template to have a "Buy" button that adds the current product to the cart. 

   修改商品详情模板，让它具有一个“Buy”按钮，用于把当前商品添加到购物车中。


   1. Open `product-details.component.html`.

      打开 `product-details.component.html`。


   1. Add a button with the label "Buy", and bind the `click()` event to the `addToCart()` method: 

      添加一个标签为“Buy”的按钮，并把其 `click()` 事件绑定到 `addToCart()` 方法：


      <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html">
      </code-example>

1. To see the new "Buy" button, refresh the application and click on a product's name to display its details.

   要查看新的“Buy”按钮，请刷新应用并单击商品名称以显示其详细信息。


   <figure>
     <img src='generated/images/guide/getting-started/product-details-buy.png' alt="Display details for selected product with a Buy button">
   </figure>

1. Click the "Buy" button. The product is added to the stored list of items in the cart, and a message is displayed. 

   点击“Buy”按钮。该商品已添加到了购物车中存储的商品列表中，并显示一条消息。


   <figure>
     <img src='generated/images/guide/getting-started/buy-alert.png' alt="Display details for selected product with a Buy button">
   </figure>

## Create the cart page

## 创建购物车页面


At this point, users can put items in the cart by clicking "Buy", but they can't yet see their cart. 

此时，用户可以通过点击“Buy”来把商品放入购物车，但他们还看不到购物车。


We'll create the cart page in two steps: 

我们将分两步来创建购物车页面：


1. Create a cart component and set up routing to the new component. At this point, the cart page will only have default text. 

   创建一个购物车组件并设置到这个新组件的路由。此时，购物车页面只会显示默认文本。

1. Display the cart items. 

   显示购物车商品


### Set up the component

### 设置该组件


 To create the cart page, you begin by following the same steps you did to create the product details component and to set up routing for the new component.

 要创建购物车页面，首先要执行与创建商品详情组件相同的步骤，并为这个新组件设置路由。


1. Generate a cart component, named `cart`. 

   生成一个名叫 `cart` 的购物车组件。


   Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`. 

   提示：在文件列表框中，右键单击 `app` 文件夹，选择 `Angular Generator` 和 `Component`。


   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.1.ts"></code-example>




1. Add routing (a URL pattern) for the cart component. 

   为购物车组件添加路由（URL 模式）。


   Reminder: Open `app.module.ts` and add a route for the component `CartComponent`, with a `path` of `cart`:

   提示：打开 `app.module.ts`，为组件 `CartComponent` 添加一个路由，其路由为 `cart` ：


   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="cart-route">
   </code-example>

   <!-- 
   To do: Can we shorten the example code to remove the extra at the bottom? 
   -->

1. To see the new cart component, click the "Checkout" button. You can see the "cart works!" default text, and the URL has the pattern `https://getting-started.stackblitz.io/cart`,  where `getting-started.stackblitz.io` may be different for your StackBlitz project. 

   要查看新的购物车组件，请点击“Checkout”按钮。你会看到默认文本“cart works!”，该 URL 的格式为 `https://getting-started.stackblitz.io/cart`，其中的 getting-started.stackblitz.io 部分可能与你的 StackBlitz 项目不同。


   (Note: The "Checkout" button that we provided in the top-bar component was already configured with a `routerLink` for `/cart`.)

   （注意：我们在顶栏组件中提供的“Checkout”按钮已经配置了指向 `/cart` 的 `routerLink`。）


   <figure>
     <img src='generated/images/guide/getting-started/cart-works.png' alt="Display cart page before customizing">
   </figure>

### Display the cart items

### 显示购物车商品


Services can be used to share data across components:

服务可用于跨组件共享数据：


* The product details component already uses the cart service (`CartService`) to add products to the cart.

  商品详情组件已经使用了购物车服务（ `CartService` ）来把商品添加到购物车中。

* In this section, you'll update the cart component to use the cart service to display the products in the cart.

  在本节中，你将修改购物车组件以使用购物车服务来显示购物车中的商品。


1. Open `cart.component.ts`.

   打开 `cart.component.ts`。


1. Set up the component to be able to use the cart service. (This is the same way you set up the product details component to use the cart service, above.)

   设置该组件是为了让它能够使用这个购物车服务。（这与你在前面设置商品详情组件以使用购物车服务的方式是一样的。）


   1. Import the `CartService` from the `cart.service.ts` file.

      从 `cart.service.ts` 文件中导入 `CartService`。


      <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.2.ts" region="imports">
      </code-example>

   1. Inject the `CartService` to manage cart information.

      注入 `CartService` 来管理购物车信息。


      <code-example path="getting-started/src/app/cart/cart.component.2.ts" region="inject-cart">
      </code-example>

1. Define the `items` property to store the products in the cart.

   定义 `items` 属性，以便把商品存放在购物车中。


   <code-example path="getting-started/src/app/cart/cart.component.2.ts" region="items">
   </code-example>

1. Set the items using the cart service's `getItems()` method. (You defined this method [when you generated `cart.service.ts`](#generate-cart-service).)

   使用购物车服务的 `getItems()` 方法设置这些商品。（你[在生成 `cart.service.ts` 时](#generate-cart-service)定义过这个方法。）


   The resulting `CartComponent` class should look like this: 

   所生成的 `CartComponent` 类是这样的：


   <code-example path="getting-started/src/app/cart/cart.component.3.ts" region="props-services">
   </code-example>

1. Update the template with a header ("Cart"), and use a `<div>` with an `*ngFor` to display each of the cart items with its name and price.

   修改模板，加上标题（“Cart”），用带有 `*ngFor` 的 `<div>` 来显示每个购物车商品的名字和价格。


   The resulting `CartComponent` template should look like this: 

   生成的 `CartComponent` 模板如下：


   <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html" region="prices">
   </code-example>

1. Test your cart component. 

   测试你的购物车组件。


   1. Click on "My Store" to go to the product list page.

      点击“My Store”，进入商品列表页面。

   1. Click on a product name to display its details.

      单击商品名称以显示其详细信息。

   1. Click "Buy" to add the product to the cart.

      点击“Buy”，即可将商品添加到购物车。

   1. Click "Checkout" to see the cart. 

      点击“Checkout”查看购物车。

   1. To add another product, click "My Store" to return to the product list. Repeat the steps above. 

      要添加其它商品，请点击“My Store”返回商品列表。重复上述步骤。


   <figure>
     <img src='generated/images/guide/getting-started/cart-page-full.png' alt="Cart page with products added">
   </figure>

<div class="alert is-helpful">

StackBlitz tip: Any time the preview refreshes, the cart is cleared. If you make changes to the app, the page refreshes, and you'll need to buy products again to populate the cart. 

StackBlitz 提示：只要预览刷新，就会清除购物车。如果你对该应用进行了更改，页面就会刷新，你需要重新购买商品来填充购物车。


</div>

<!-- 
To do: New screen shot. No shipping prices link yet. Show a few products in the cart. 
-->

<div class="alert is-helpful">

Learn more: See [Introduction to Services and Dependency Injection](guide/architecture-services "Architecture > Intro to Services and DI") for more information about services. 

要了解关于[服务](guide/architecture-services "架构>服务简介和 DI")的更多信息，请参阅[“服务和依赖注入简介”](guide/architecture-services "架构>服务简介和 DI")。


</div>

## Retrieve shipping prices

## 检索运费价格


<!-- Accessing data with the HTTP client -->

Data returned from servers often takes the form of a stream. 
Streams are useful because they make it easy to transform the data that is returned, and to make modifications to the way data is requested. 
The Angular HTTP client (`HttpClient`) is a built-in way to fetch data from external APIs and provide them to your application as a stream.

从服务器返回的数据通常采用流的形式。流是很有用的，因为它们可以很容易地转换返回的数据，也可以修改请求数据的方式。Angular 的 HTTP 客户端（ `HttpClient` ）是一种内置的方式，可以从外部 API 中获取数据，并以流的形式提供给你的应用。


In this section, you'll use the HTTP client to retrieve shipping prices from an external file. 

在本节中，你将使用 HTTP 客户端从外部文件中检索运费。


### Predefined shipping data

### 预定义的配送数据


For the purpose of this Getting Started, we have provided shipping data in `assets/shipping.json`. 
You'll use this data to add shipping prices for items in the cart. 

为了满足本“入门指南”的需求，我们在 `assets/shipping.json` 中提供了配送数据。你可以利用这些数据为购物车中的商品添加运费。


<code-example header="src/assets/shipping.json" path="getting-started/src/assets/shipping.json">
</code-example>

### Enable HttpClient for app

### 为应用启用 HttpClient


Before you can use Angular's HTTP client, you must set up your app to use `HttpClientModule`. 

在使用 Angular 的 HTTP 客户端之前，你必须先设置你的应用来使用 `HttpClientModule`。


Angular's `HttpClientModule` registers the providers needed to use a single instance of the `HttpClient` service throughout your app. 
The `HttpClient` service is what you inject into your services to fetch data and interact with external APIs and resources. 

Angular 的 `HttpClientModule` 中注册了在整个应用中使用 `HttpClient` 服务的单个实例所需的服务提供商。你可以在服务中注入 `HttpClient` 服务来获取数据并与外部 API 和资源进行交互。


1. Open `app.module.ts`. 

   打开 `app.module.ts`。


   This file contains imports and functionality that is available to the entire app. 

   该文件包含可供整个应用使用的导入对象和功能。


1. Import `HttpClientModule` from the `@angular/common/http` package.

   从 `@angular/common/http` 包中导入 `HttpClientModule`。


   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="http-client-module-import">
   </code-example>

1. Add `HttpClientModule` to the `imports` array of the app module (`@NgModule`).

   把 `HttpClientModule` 添加到应用模块（`@NgModule`）的 `imports` 数组中。


   This registers Angular's `HttpClient` providers globally.

   这会在全局注册 Angular 的 `HttpClient` 提供商。


   <code-example path="getting-started/src/app/app.module.ts" region="http-client-module">
   </code-example>

<!-- 
To do: Should ReactiveFormsModule already be here? Currently, it is in the starter stackblitz, so this doc assumes it is already included and not added in the forms section.
-->

<!-- 
To do: Should ReactiveFormsModule already be here? 
-->

### Enable HttpClient for cart service

### 为购物车服务启用 HttpClient


1. Open `cart.service.ts`.

   打开 `cart.service.ts`。


1. Import `HttpClient` from the `@angular/common/http` package.

   从 `@angular/common/http` 包中导入 `HttpClient`。


   <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="import-http">
   </code-example>

1. Inject `HttpClient` into the constructor of the `CartService` component class: 

   把 `HttpClient` 注入到 `CartService` 组件类的构造函数中：


   <code-example path="getting-started/src/app/cart.service.ts" region="inject-http">
   </code-example>

### Define the get() method

### 定义 get() 方法


As you've seen, multiple components can leverage the same service. 
Later in this tutorial, the shipping component will use the cart service to retrieve shipping data via HTTP from the `shipping.json` file. 
Here you'll define the `get()` method that will be used.

如你所见，多个组件可以使用同一个服务。在这个教程的后半部分，商品配送组件将使用该购物车服务从 `shipping.json` 文件中借助 HTTP 检索配送数据。在这里你要定义很快就要用到的 `get()` 方法。


1. Continue working in `cart.service.ts`.

   继续在 `cart.service.ts` 中工作。


1. Below the `clearCart()` method, define a new `getShippingPrices()` method that uses the `HttpClient#get()` method to retrieve the shipping data (types and prices).

   在 `clearCart()` 方法下面，定义一个新的 `getShippingPrices()` 方法，该方法使用 `HttpClient#get()` 方法检索配送数据（类型和价格）。


   <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="get-shipping"></code-example>




<div class="alert is-helpful">

Learn more: See the [HttpClient guide](guide/http "HttpClient guide") for more information about Angular's HttpClient. 

要了解关于 Angular HttpClient 的更多信息，请参阅[HttpClient 指南](guide/http "HttpClient 指南")。


</div>

## Define the shipping page

## 定义配送页面


Now that your app can retrieve shipping data, you'll create a shipping component and associated template. 

现在你的应用已经可以检索配送数据了，你还要创建一个配送组件和相关的模板。


1. Generate a new component named `shipping`.

   生成一个名为 `shipping` 的新组件。


   Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`. 

   提示：在文件列表框中，右键单击 `app` 文件夹，选择 `Angular Generator` 和 `Component`。


   <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.1.ts"></code-example>




1. In `app.module.ts`, add a route for shipping. Specify a `path` of `shipping` and a component of `ShippingComponent`. 

   在 `app.module.ts` 中，添加一个配送路由。其 `path` 为 `shipping`，其 component 为 `ShippingComponent`。


   <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="shipping-route"></code-example>




   The new shipping component isn't hooked into any other component yet, but you can see it in the preview pane by entering the URL specified by its route. The URL has the pattern: `https://getting-started.stackblitz.io/shipping` where the `getting-started.stackblitz.io` part may be different for your StackBlitz project. 

   新的配送组件尚未挂钩到任何其它组件，但你可以通过输入其路由特有的 URL 在预览窗格中看到它。该 URL 具有以下模式：`https://getting-started.stackblitz.io/shipping`，其中的 gets-started.stackblitz.io 部分可能与你的 StackBlitz 项目不同。


1. Modify the shipping component so it uses the cart service to retrieve shipping data via HTTP from the `shipping.json` file. 

   修改配送组件，让它利用购物车服务从 `shipping.json` 文件中通过 HTTP 检索配送数据。


   1. Import the cart service.

      导入购物车服务。


      <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.ts" region="imports"></code-example>




   1. Define a `shippingCosts` property. 

      定义 `shippingCosts` 属性。


      <code-example path="getting-started/src/app/shipping/shipping.component.ts" region="props"></code-example>




   1. Inject the cart service into the `ShippingComponent` class: 

      把购物车服务注入到 `ShippingComponent` 类中：


      <code-example path="getting-started/src/app/shipping/shipping.component.ts" region="inject-cart-service"></code-example>




   1. Set the `shippingCosts` property using the `getShippingPrices()` method from cart service.

      利用购物车服务的 `getShippingPrices()` 方法设置 `shippingCosts` 属性。


      <code-example path="getting-started/src/app/shipping/shipping.component.ts" region="ctor"></code-example>




1. Update the shipping component's template to display the shipping types and prices using async pipe:

   利用 async 管道修改配送组件的模板，以显示配送类型和价格：


   <code-example header="src/app/shipping/shipping.component.html" path="getting-started/src/app/shipping/shipping.component.html"></code-example>




   <!--
   To decide: Should we describe async pipe
   -->

1. Add a link from the cart page to the shipping page:

   在购物车页面中添加一个到配送页面的链接：


   <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html"></code-example>




1. Test your shipping prices feature:

   测试这个运费价格功能：


   Click on the "Checkout" button to see the updated cart. (Remember that changing the app causes the preview to refresh, which empties the cart.)

   点击“Checkout”按钮，查看更新后的购物车。（注意，修改应用会导致预览窗格刷新，这会清空购物车。）


   <figure>
     <img src='generated/images/guide/getting-started/cart-empty-with-shipping-prices.png' alt="Cart with link to shipping prices">
   </figure>

   Click on the link to navigate to the shipping prices.

   点击此链接可以导航到运费页。


   <figure>
     <img src='generated/images/guide/getting-started/shipping-prices.png' alt="Display shipping prices">
   </figure>

## Next steps

## 下一步


Congratulations! You have an online store application with a product catalog and shopping cart. You also have the ability to look up and display shipping prices. 

恭喜！你有一个带有商品名录和购物车的在线商店应用了，而且你还可以查询并显示运费。


To continue exploring Angular, choose either of the following options:

要继续探索 Angular，请选择下列选项之一：


* [Continue to the "Forms" section](getting-started/forms "Getting Started: Forms") to finish the app by adding the shopping cart page and a form-based checkout feature. You'll create a form to collect user information as part of checkout. 

  [继续浏览“表单”部分](getting-started/forms "入门：表单")，通过添加购物车页面和基于表单的结帐功能来完成该应用。你还可以创建一个表单来收集用户信息，作为结账过程的一部分。

* [Skip ahead to the "Deployment" section](getting-started/deployment "Getting Started: Deployment") to deploy your app to Firebase or move to local development. 

  [跳到“部署”部分，](getting-started/deployment "入门：部署")把你的应用部署到 Firebase 或转成本地开发。


