# Try it: Use forms for user input

# 表单

At the end of [Managing Data](start/start-data "Try it: Managing Data"), the online store application has a product catalog and a shopping cart.

当[管理数据](start/start-data "入门：管理数据")结束时，这个在线商店应用有了一个商品名录和一个购物车。

This section walks you through adding a form-based checkout feature to collect user information as part of checkout.

本节将带你通过添加基于表单的结帐功能来完成该应用。你还将创建一个表单来收集用户信息，作为结账过程的一部分。

## Forms in Angular

## Angular 中的表单

Forms in Angular build upon the standard HTML forms to help you create custom form controls and easy validation experiences. There are two parts to an Angular Reactive form: the objects that live in the component to store and manage the form, and the visualization of the form that lives in the template.

Angular 中的表单建立在标准 HTML 表单功能之上，以帮助你创建自定义表单控件和轻松的验证体验。Angular 响应式表单有两个部分：组件中那些用于存储和管理表单的对象，以及表单在模板中的可视化。

## Define the checkout form model

## 定义结帐的表单模型

First, set up the checkout form model. Defined in the component class, the form model is the source of truth for the status of the form.

首先，你要设置一个结账的表单模型。在组件类中定义它，把它作为表单状态的真相之源（source of truth）。

1. Open `cart.component.ts`.

   打开 `cart.component.ts`。

1. Angular's `FormBuilder` service provides convenient methods for generating controls. As with the other services you've used, you need to import and inject the service before you can use it:

   Angular 的 `FormBuilder` 服务为生成控件提供了方便的方法。和你使用过的其它服务一样，你需要导入并注入该服务，然后才能使用它：

   1. Import the `FormBuilder` service from the `@angular/forms` package.

      从 `@angular/forms` 包中导入 `FormBuilder` 服务。

      <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="imports">
      </code-example>

      The `ReactiveFormsModule` provides the `FormBuilder` service, which `AppModule` (in `app.module.ts`) already imports.

      `ReactiveFormsModule` 中提供了 `FormBuilder` 服务，它已经在之前修改过的 `AppModule`（位于 `app.module.ts` ）中导入过了。

   1. Inject the `FormBuilder` service.

      注入这个 `FormBuilder` 服务。

      <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="inject-form-builder">
      </code-example>

1. Still in the `CartComponent` class, define the `checkoutForm` property to store the form model.

   还是在 `CartComponent` 类中，定义 `checkoutForm` 属性来存储表单模型。

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="checkout-form">
   </code-example>

1. To gather the user's name and address, set the `checkoutForm` property with a form model containing `name` and `address` fields, using the `FormBuilder` `group()` method. Add this between the curly braces, `{}`,
of the constructor.

   要想手机用户的姓名和地址，把 `checkoutForm` 属性设置为一个包含 `name` 和 `address` 字段的表单模型。使用 `FormBuilder` 的 `group()` 方法来创建它，把该语句加入构造函数的花括号 `{}` 中间。

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts" region="checkout-form-group" >
   </code-example>

1. For the checkout process, users need to submit their name and address. When they submit their order, the form should reset and the cart should clear.

   在结帐过程中，用户要提交他们的姓名和地址。在提交订单之后，表单应该重置，购物车应该清空。

    1. In `cart.component.ts`, define an `onSubmit()` method to process the form. Use the `CartService` `clearCart()` method to empty the cart items and reset the form after its submission. In a real-world app, this method would also submit the data to an external server. The entire cart component class is as follows:

       在 `cart.component.ts` 中，定义一个 `onSubmit()` 方法来处理表单。使用 `CartService` `clearCart()` 方法清空购物车项目，并在提交完之后重置该表单。在实际应用中，此方法也会把数据提交给外部服务器。
   整个购物车组件类如下所示：

   <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.ts">
   </code-example>

Now that you've defined the form model in the component class, you need a checkout form to reflect the model in the view.

现在，你已经在组件类中定义了表单模型，还要创建一个结账表单，以便把该模型映射到视图中。

## Create the checkout form

## 创建结帐表单

Use the following steps to add a checkout form at the bottom of the "Cart" view.

使用下列步骤在“购物车”视图的底部添加一个结帐表单。

1. Open `cart.component.html`.

   打开 `cart.component.html`。

1. At the bottom of the template, add an HTML form to capture user information.

   在模板的底部，添加一个空的 HTML 表单来捕获用户信息。

1. Use a `formGroup` property binding to bind the `checkoutForm` to the `form` tag in the template. Also include a "Purchase" button to submit the form.

   使用 `formGroup` 属性绑定把 `checkoutForm` 绑定到模板中的 `form` 标签上。还要提供一个 “Purchase” 按钮来提交表单。

   <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.3.html" region="checkout-form">
   </code-example>

1. On the `form` tag, use an `ngSubmit` event binding to listen for the form submission and call the `onSubmit()` method with the `checkoutForm` value.

   在 `form` 标签上，使用 `ngSubmit` 事件绑定来监听表单提交，并使用 `checkoutForm` 值调用 `onSubmit()` 方法。

   <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html (cart component template detail)" region="checkout-form-1">
   </code-example>

1. Add input fields for `name` and `address`.  Use the `formControlName` attribute binding to bind the `checkoutForm` form controls for `name` and `address` to their input fields. The final complete component is as follows:

   为 `name` 和 `address` 添加输入字段。使用 `formControlName` 属性绑定来把 `checkoutForm` 表单控件中的 `name` 和 `address` 绑定到它们的输入字段。最终的完整版组件如下：

   <code-example path="getting-started/src/app/cart/cart.component.html" header="src/app/cart/cart.component.html" region="checkout-form-2">
   </code-example>

After putting a few items in the cart, users can now review their items, enter their name and address, and submit their purchase:

往购物车中放入几件商品之后，用户可以查看这些商品，输入自己的姓名和地址，进行购买：

<div class="lightbox">
  <img src='generated/images/guide/start/cart-with-items-and-form.png' alt="Cart view with checkout form">
</div>

To confirm submission, open the console where you should see an object containing the name and address you submitted.

要检查这次提交，请打开控制台，你会在那里看到一个包含你提交的姓名和地址的对象。

## Next steps

## 下一步

Congratulations! You have a complete online store application with a product catalog, a shopping cart, and a checkout function.

恭喜！你有了一个完整的在线商店应用，它具有商品名录，购物车和结账功能。

[Continue to the "Deployment" section](start/start-deployment "Try it: Deployment") to move to local development, or deploy your app to Firebase or your own server.

[继续浏览“部署”部分，](start/start-deployment "试一试：部署")把你的应用转移到本地开发、部署到 Firebase 或你自己的服务器。

