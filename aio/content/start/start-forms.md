# Using forms for user input

# 使用表单进行用户输入

This guide builds on the [Managing Data](start/start-data "Try it: Managing Data") step of the Getting Started tutorial, [Get started with a basic Angular app](start "Get started with a basic Angular app").

本指南基于“入门教程”[基本 Angular 应用](start "开始使用基本的 Angular 应用")中的第三步[“管理数据”](start/start-data "尝试一下：管理数据")。

This section walks you through adding a form-based checkout feature to collect user information as part of checkout.

本节将引导你添加基于表单的结账功能，以收集用户信息作为结账信息的一部分。

## Define the checkout form model

## 定义结帐表单模型

This step shows you how to set up the checkout form model in the component class.
The form model determines the status of the form.

此步骤说明如何在组件类中建立结帐表单模型。表单模型决定表单的状态。

1. Open `cart.component.ts`.

   打开 `cart.component.ts` 。

1. Import the `FormBuilder` service from the `@angular/forms` package.
   This service provides convenient methods for generating controls.

   从 `@angular/forms` 包导入 `FormBuilder`。此服务提供了用来生成控件的便捷方法。

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="imports">
   </code-example>

1. Inject the `FormBuilder` service in the `CartComponent` `constructor()`.
   This service is part of the `ReactiveFormsModule` module, which you've already imported.

   在 `CartComponent` 的 `constructor()` 中注入 `FormBuilder` 服务。该服务是你已经导入过的 `ReactiveFormsModule` 模块的一部分。

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="inject-form-builder">
   </code-example>

1. To gather the user's name and address, use the `FormBuilder` `group()` method to set the `checkoutForm` property to a form model containing `name` and `address` fields.

   要收集用户的姓名和地址，请使用 `FormBuilder` 的 `group()` 方法来把 `checkoutForm` 属性设置为一个包含 `name` 和 `address` 字段的表单模型。

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="checkout-form-group"></code-example>

1. Define an `onSubmit()` method to process the form.
   This method allows users to submit their name and address.
   In addition, this method uses the `clearCart()` method of the `CartService` to reset the form and clear the cart.

   定义一个 `onSubmit()` 方法来处理表单。该方法允许用户提交其姓名和地址。此外，此方法会使用 `CartService` 的 `clearCart()` 方法重置表单并清除购物车。

   The entire cart component class is as follows:

   整个购物车组件类如下：

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts">
   </code-example>

## Create the checkout form

## 创建结帐表单

Use the following steps to add a checkout form at the bottom of the Cart view.

使用以下步骤在“购物车”视图的底部添加一个结帐表单。

1. At the bottom of `cart.component.html`, add an HTML `<form>` element and a **Purchase** button.

   在 `cart.component.html` 的底部，添加一个 HTML `<form>` 元素和一个 **Purchase** 按钮。

1. Use a `formGroup` property binding to bind `checkoutForm` to the HTML `<form>`.

   使用 `formGroup` 属性绑定将 `checkoutForm` 绑定到 HTML 中的 `<form>` 标签。

   <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.3.html" region="checkout-form">
   </code-example>

1. On the `form` tag, use an `ngSubmit` event binding to listen for the form submission and call the `onSubmit()` method with the `checkoutForm` value.

   在 `form` 标签上，使用 `ngSubmit` 事件绑定来侦听表单提交，并以 `checkoutForm` 的值为参数调用 `onSubmit()` 方法。

   <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html (cart component template detail)" region="checkout-form-1">
   </code-example>

1. Add `<input>` fields for `name` and `address`, each with a `formControlName` attribute that binds to the `checkoutForm` form controls for `name` and `address` to their `<input>` fields.
   The complete component is as follows:

   添加 `name` 和 `address` 的 `<input>` 字段，每个字段都有一个 `formControlName` 属性，该属性绑定到 `checkoutForm` 表单控件，以将 `name` 和 `address` 绑定到其 `<input>` 字段。完整的组件如下：

   <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html" region="checkout-form-2">
   </code-example>

After putting a few items in the cart, users can review their items, enter their name and address, and submit their purchase.

将少量物品放入购物车后，用户可以查看他们的物品，输入他们的姓名和地址，然后提交购买的商品。

<div class="lightbox">
  <img src='generated/images/guide/start/cart-with-items-and-form.png' alt="Cart view with checkout form">
</div>

To confirm submission, open the console to see an object containing the name and address you submitted.

要确认提交，请打开控制台以查看包含你所提交的名称和地址的对象。

## What's next

## 下一步是什么

You have a complete online store application with a product catalog, a shopping cart, and a checkout function.

你现在有了一个具备产品目录、购物车和结帐功能的完整在线商店应用。

[Continue to the "Deployment" section](start/start-deployment "Try it: Deployment") to move to local development, or deploy your app to Firebase or your own server.

[继续前往“部署”部分](start/start-deployment "试试看：部署")，以进行本地开发，或将此应用部署到 Firebase 或你自己的服务器。

