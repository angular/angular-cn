# Getting started with Angular

# Angular 入门

Welcome to Angular!

Angular 欢迎你！

This tutorial introduces you to the essentials of Angular by walking you through building an e-commerce site with a catalog, shopping cart, and check-out form.

本教程将通过构建一个电子商务网站，向你介绍 Angular 的基本知识。该网站具有商品名录、购物车和结账表单。

To help you get started right away, this tutorial uses a ready-made application that you can examine and modify interactively on [Stackblitz](https://stackblitz.com/)&mdash;without having to [set up a local work environment](guide/setup-local "Setup guide").
StackBlitz is a browser-based development environment where you can create, save, and share projects using a variety of technologies.

为了帮助你更好地起步，本教程提供了一个已完成的应用，你可以在 [Stackblitz](https://stackblitz.com/) 上试验及互动，而不用[建立本地开发环境](guide/setup-local "Setup guide")。
StackBlitz 是一个基于浏览器的开发环境，你可以在其中使用各种技术来创建、保存和共享项目。

## Prerequisites

## 先决条件

To get the most out of this tutorial you should already have a basic understanding of the following.

为了充分利用本教程，你应该已经对以下内容有基本的了解。

* [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML "Learning HTML: Guides and tutorials")
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript")
* [TypeScript](https://www.typescriptlang.org/ "The TypeScript language")

{@a components}

## Take a tour of the example application

## 浏览范例应用

You build Angular applications with components.
Components define areas of responsibility in the UI that let you reuse sets of UI functionality.

你可以用组件构建 Angular 应用。组件定义了 UI 中的职责范围，让你可以复用某些 UI 功能集。

A component consists of three things:

一个组件由三部分组成：

* **A component class** that handles data and functionality.

  处理数据和功能的**组件类**。

* **An HTML template** that determines the UI.

  决定 UI **的 HTML 模板**。

* **Component-specific styles** that define the look and feel.

  定义外观的**组件专属样式**。

This guide demonstrates building an application with the following components.

本指南演示了如何使用下列组件构建应用。

* `<app-root>`&mdash;the first component to load and the container for the other components.

  `<app-root>` - 第一个加载的组件，并且是其他组件的容器。

* `<app-top-bar>`&mdash;the store name and checkout button.

  `<app-top-bar>` - 商店名称和结帐按钮。

* `<app-product-list>`&mdash;the product list.

  `<app-product-list>` - 产品列表。

* `<app-product-alerts>`&mdash;a component that contains the application's alerts.

  `<app-product-alerts>` - 包含应用中各种通知的组件。

<div class="lightbox">
  <img src="generated/images/guide/start/app-components.png" alt="Online store with three components">
</div>

For more information about components, see [Introduction to Components](guide/architecture-components "Introduction to Components and Templates").

有关组件的更多信息，请参见[组件简介](guide/architecture-components "组件和模板简介") 。

{@a new-project}

## Create the sample project

## 创建范例项目

To create the sample project, generate the <live-example name="getting-started-v0" noDownload>ready-made sample project in StackBlitz</live-example>.
To save your work:

要创建范例项目，请<live-example name="getting-started-v0" noDownload>在 StackBlitz 中生成一个预置的范例项目</live-example> 。要保存你的工作，请执行以下操作：

1. Log into StackBlitz.

   登录到 StackBlitz。

1. Fork the project you generated.

   对你生成的项目进行分支。

1. Save periodically.

   定时保存。

In StackBlitz, the preview pane on the right shows the starting state of the example application.
The preview features two areas:

在 StackBlitz 中，右侧的预览窗格会显示范例应用的启动状态。此预览有两个区域：

* a top bar with the store name, *My Store*, and a checkout button

  带有商店名称（*My Store*）和 Checkout 按钮的顶部栏

* a header for a product list, *Products*

  *产品列表*及其标题

<div class="lightbox">
  <img src="generated/images/guide/start/new-app-all.gif" alt="Starter online store application">
</div>

The project section on the left shows the source files that make up the application, including the infrastructure and configuration files.

左侧的项目区显示了构成本应用的源文件，包括基础结构和配置文件。

When you generate the StackBlitz example applications that accompany the tutorials, StackBlitz creates the starter files and mock data for you.
The files you use throughout the tutorial are in the `src` folder.

当你生成本教程随附的 StackBlitz 范例应用时，StackBlitz 会为你创建启动程序文件和模拟数据。本教程中用到的文件位于 `src` 文件夹中。

For more information on how to use StackBlitz, see the [StackBlitz documentation](https://developer.stackblitz.com/docs/platform/).

有关如何使用 StackBlitz 的更多信息，请参见 [StackBlitz 的文档](https://developer.stackblitz.com/docs/platform/)。

{@a product-list}

## Create the product list

## 创建产品列表

In this section, you'll update the application to display a list of products.
You'll use predefined product data from the `products.ts` file and methods from the `product-list.component.ts` file.
This section guides you through editing the HTML, also known as the template.

在本节中，你将修改应用以显示产品列表。你会用到来自 `products.ts` 文件的预定义产品数据，和一些来自 `product-list.component.ts` 文件的方法。本节将指导你完成编辑 HTML（也称为模板）的过程。

1. In the `product-list` folder, open the template file `product-list.component.html`.

   在 `product-list` 文件夹中，打开模板文件 `product-list.component.html`。

1. Add an `*ngFor` structural directive on a `<div>`, as follows.

   在 `<div>` 上添加一个结构型指令 `*ngFor`，如下所示。

   <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.2.html" region="ngfor">
   </code-example>

   With `*ngFor`, the `<div>` repeats for each product in the list.

   使用 `*ngFor`，会把这个 `<div>` 针对列表中的每个产品进行复写。

   Structural directives shape or reshape the DOM's structure, by adding, removing, and manipulating elements.
   For more information about structural directives, see [Structural directives](guide/structural-directives).

   结构型指令会通过添加、删除和操作元素来调整或重塑 DOM 结构。有关结构型指令的更多信息，请参见[结构型指令](guide/structural-directives)。

1. Inside the `<div>`, add an `<h3>` and `{{ product.name }}`.
     The `{{ product.name }}` statement is an example of Angular's interpolation syntax.
     Interpolation `{{ }}` lets you render the property value as text.

   在此 `<div>` 中，添加 `<h3>` 和 `{{ product.name }}`。`{{ product.name }}` 语句是 Angular 插值语法的范例。插值 `{{ }}` 可以让你把属性值渲染为文本。

     <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html" region="interpolation">
   </code-example>

     The preview pane updates to display the name of each product in the list.

     预览窗格将会更新，以显示列表中每个商品的名称。

     <div class="lightbox">
       <img src="generated/images/guide/start/template-syntax-product-names.png" alt="Product names added to list">
     </div>

1. To make each product name a link to product details, add the `<a>` element around `{{ product.name }}`.

   为了让每个商品名称都能链接到商品详情，请围绕 `{{ product.name }}` 添加一个 `<a>` 元素。

1. Set the title to be the product's name by using the property binding `[ ]` syntax, as follows:

   使用 `[ ]` 语法将标题设置为此产品的名称，如下所示：

   <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html">
   </code-example>

   In the preview pane, hover over a product name to see the bound name property value, which is the product name plus the word "details".
   Property binding `[ ]` lets you use the property value in a template expression.

   在预览窗格中，将鼠标悬停在产品名称上，可以查看所绑定的 name 属性值，该值是产品名加上单词 “details”。通过属性绑定 `[ ]` 可以在模板表达式中使用属性值。

   <div class="lightbox">
     <img src="generated/images/guide/start/template-syntax-product-anchor.png" alt="Product name anchor text is product name property">
   </div>

1. Add the product descriptions. On a `<p>` element, use an `*ngIf` directive so that Angular only creates the `<p>` element if the current product has a description.

   添加产品说明。在 `<p>` 元素上使用 `*ngIf` 指令，以便 Angular 只让当前产品有描述 `<p>`

   <code-example path="getting-started/src/app/product-list/product-list.component.3.html" header="src/app/product-list/product-list.component.html">
   </code-example>

   The application now displays the name and description of each product in the list.
   Notice that the final product does not have a description paragraph.
   Angular doesn't create the `<p>` element because the product's description property is empty.

   现在，该应用将在列表中显示每个产品的名称和描述。请注意，最后一项产品没有描述段落。Angular 不会创建 `<p>` 元素，因为此产品的 description 属性为空。

   <div class="lightbox">
     <img src="generated/images/guide/start/template-syntax-product-description.png" alt="Product descriptions added to list">
   </div>

1. Add a button so users can share a product.
   Bind the button's `click` event to the `share()` method in `product-list.component.ts`. Event binding uses a set of parentheses, `( )`, around the event, as in the `(click)` event on the  `<button>` element.

   添加一个按钮，以便用户可以共享产品。将按钮的 `click` 事件绑定到 `product-list.component.ts` 中的 `share()` 方法。事件绑定要在此事件用一组圆括号 `( )` 括起来，就比如 `<button>` 元素上的 `(click)`。

     <code-example path="getting-started/src/app/product-list/product-list.component.4.html" header="src/app/product-list/product-list.component.html">
     </code-example>

     Each product now has a **Share** button.

     每个产品现在都有一个 “**Share**” 按钮。

     <div class="lightbox">
       <img src="generated/images/guide/start/template-syntax-product-share-button.png" alt="Share button added for each product">
     </div>

     Clicking the **Share** button triggers an alert that states, "The product has been shared!".

     单击 “**Share**” 按钮将触发一条通知，指出 “The product has been shared!”。

     <div class="lightbox">
       <img src="generated/images/guide/start/template-syntax-product-share-alert.png" alt="Alert box indicating product has been shared">
     </div>

In editing the template, you have explored some of the most popular features of Angular templates.
For more information, see [Introduction to components and templates](guide/architecture-components#template-syntax "Template Syntax").

在编辑模板时，你已经了解了 Angular 模板的一些最常用的功能。更多信息，请参阅[组件和模板简介](guide/architecture-components#template-syntax "模板语法")。

{@a passing-data-in}

## Pass data to a child component

## 将数据传递给子组件

Currently, the product list displays the name and description of each product.
The `ProductListComponent` also defines a `products` property that contains imported data for each product from the `products` array in `products.ts`.

目前，产品列表中显示了每个产品的名称和描述。`ProductListComponent` 还定义了一个 `products` 属性，包含从 `products.ts` 的 `products` 数组导入的各个产品的数据。

The next step is to create a new alert feature that uses product data from the `ProductListComponent`.
The alert checks the product's price, and, if the price is greater than $700, displays a **Notify Me** button that lets users sign up for notifications when the product goes on sale.

下一步是创建一个新的通知功能，该功能会使用来自 `ProductListComponent` 的产品数据。通知会检查产品的价格，如果价格大于 700 美元，则会显示 **Notify Me** 按钮，当产品上市销售时，用户可以通过该按钮注册通知。

This section walks you through creating a child component, `ProductAlertsComponent` that can receive data from its parent component, `ProductListComponent`.

本节将引导你创建一个子组件 `ProductAlertsComponent`，该子组件可以从其父组件 `ProductListComponent` 接收数据。

1. Right click on the `app` folder and use the `Angular Generator` to generate a new component named `product-alerts`.

   右键单击 `app` 文件夹，然后使用 `Angular Generator` 生成一个名为 `product-alerts` 的新组件。

   <div class="lightbox">
     <img src="generated/images/guide/start/generate-component.png" alt="StackBlitz command to generate component">
   </div>

     The generator creates starter files for the three parts of the component:

     此生成器会为组件的三个部分创建初始文件：

    * `product-alerts.component.ts`
    * `product-alerts.component.html`
    * `product-alerts.component.css`

1. Open `product-alerts.component.ts`.
   The `@Component()` decorator indicates that the following class is a component.
   `@Component()` also provides metadata about the component, including its selector, templates, and styles.

   打开 `product-alerts.component.ts`。`@Component()` 装饰器会指出它后面的类是组件。`@Component()` 还会提供有关组件的元数据，包括其选择器、模板和样式。

   <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="as-generated"></code-example>

   Key features in the `@Component()` are as follows:

   `@Component()` 中的主要功能如下：

   * The `selector`, `app-product-alerts`, identifies the component.
     By convention, Angular component selectors begin with the prefix `app-`, followed by the component name.

     `selector`（`app-product-alerts`）用于标识组件。按照惯例，Angular 组件选择器以前缀 `app-` 开头，后跟组件名称。

   * The template and style filenames reference the component's HTML and CSS.

     模板和样式文件名引用了组件的 HTML 和 CSS。

   * The `@Component()` definition also exports the class, `ProductAlertsComponent`, which handles functionality for the component.

     这个 `@Component()` 定义还导出了类 `ProductAlertsComponent`，该类会处理组件的功能。

1. To set up `ProductAlertsComponent` to receive product data, first import `Input` from `@angular/core`.

   要将 `ProductAlertsComponent` 设置为接收产品数据，请首先从 `@angular/core` 中导入符号 `Input`。

   <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="imports" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. In the `ProductAlertsComponent` class definition, define a property named `product` with an `@Input()` decorator.
   The `@Input()` decorator indicates that the property value passes in from the component's parent, `ProductListComponent`.

   在 `ProductAlertsComponent` 类定义中，使用 `@Input()` 装饰器定义一个名为 `product` 的属性。
   `@Input()` 装饰器指出此属性值要从本组件的父组件 `ProductListComponent` 中传入。

   <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="input-decorator" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. Open `product-alerts.component.html` and replace the placeholder paragraph with a **Notify Me** button that appears if the product price is over $700.

   打开 `product-alerts.component.html` 并将占位符段落替换为 **Notify Me** 按钮，如果产品价格超过 700 美元，就会出现此按钮。

   <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.1.html"></code-example>

1. To display `ProductAlertsComponent` as a child of `ProductListComponent`, add the selector, `<app-product-alerts>` to `product-list.component.html`.
   Pass the current product as input to the component using property binding.

   要将 `ProductAlertsComponent` 显示为 `ProductListComponent` 的子级，请将选择器 `<app-product-alerts>` 添加到 `product-list.component.html` 中。使用属性绑定将当前产品作为输入传给此组件。

   <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.5.html" region="app-product-alerts"></code-example>

The new product alert component takes a product as input from the product list.
With that input, it shows or hides the **Notify Me** button, based on the price of the product.
The Phone XL price is over $700, so the **Notify Me** button appears on that product.

这个新的产品通知组件将产品作为产品列表中的输入。使用该输入，它将根据产品的价格显示或隐藏 **Notify Me** 按钮。Phone XL 的价格超过了 700 美元，因此该产品上会显示 **Notify Me** 按钮。

<div class="lightbox">
  <img src="generated/images/guide/start/product-alert-button.png" alt="Product alert button added to products over $700">
</div>

{@a output}

## Pass data to a parent component

## 将数据传递到父组件

To make the **Notify Me** button work, the child component needs to notify and pass the data to the parent component.
The `ProductAlertsComponent` needs to emit an event when the user clicks **Notify Me** and the `ProductListComponent` needs to respond to the event.

为了使 **Notify Me** 按钮起作用，子组件需要通知并将数据传递给父组件。当用户单击 **Notify Me** 时 `ProductAlertsComponent` 需要引发一个事件，并且 `ProductListComponent` 需要响应此事件。

1. In `product-alerts.component.ts`, import `Output` and `EventEmitter` from `@angular/core`.

   在 `product-alerts.component.ts` 中，从 `@angular/core` 导入符号 `Output` 和 `EventEmitter`。

   <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.ts" region="imports"></code-example>

1. In the component class, define a property named `notify` with an `@Output()` decorator and an instance of `EventEmitter()`.
   Configuring `ProductAlertsComponent` with an `@Output()` allows the `ProductAlertsComponent` to emit an event when the value of the `notify` property changes.

   在组件类中，使用 `@Output()` 装饰器和 `EventEmitter()` 的实例定义一个名为 `notify` 的属性。使用 `@Output()` 配置 `ProductAlertsComponent`，这会让 `ProductAlertsComponent` 在 `notify` 属性的值发生变化时引发一个事件。

   <code-example path="getting-started/src/app/product-alerts/product-alerts.component.ts" header="src/app/product-alerts/product-alerts.component.ts" region="input-output"></code-example>

   <div class="alert is-helpful">

   In new components, the Angular Generator includes an empty `constructor()`, the `OnInit` interface, and the `ngOnInit()` method.
   Since these steps don't use them, the following code example omits them for brevity.

   在新组件中，Angular Generator 包括一个空的 `constructor()`、一个 `OnInit` 接口和 `ngOnInit()` 方法。由于这些步骤未使用到它们，因此以下代码范例为简洁起见将其省略。

   </div>

1. In `product-alerts.component.html`, update the **Notify Me** button with an event binding to call the `notify.emit()` method.

   在 `product-alerts.component.html` 中，修改 **Notify Me** 按钮，增加事件绑定，并调用 `notify.emit()` 方法。

   <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.html"></code-example>

1. Define the behavior that happens when the user clicks the button.
   The parent, `ProductListComponent`—not the `ProductAlertsComponent`—acts when the child raises the event.
   In  `product-list.component.ts`, define an `onNotify()` method, similar to the `share()` method.

   定义用户单击按钮时发生的行为。当子组件引发事件时，父组件 `ProductListComponent`（而不是 `ProductAlertsComponent`）会采取行动。在 `product-list.component.ts` 中，定义一个 `onNotify()` 方法，类似于 `share()` 方法。

   <code-example header="src/app/product-list/product-list.component.ts" path="getting-started/src/app/product-list/product-list.component.ts" region="on-notify"></code-example>

1. Update the `ProductListComponent` to receive data from the `ProductAlertsComponent`.

   更新 `ProductListComponent`，以从 `ProductAlertsComponent` 中接收数据。

   In `product-list.component.html`, bind `<app-product-alerts>`  to the `onNotify()` method of the product list component.
   `<app-product-alerts>` is what displays the **Notify Me** button.

   在 `product-list.component.html` 中，将 `<app-product-alerts>` 绑定到产品列表组件的 `onNotify()` 方法。`<app-product-alerts>` 会显示 **Notify Me** 按钮的内容。

     <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.6.html" region="on-notify"></code-example>

1. Click the **Notify Me** button to trigger an alert which reads, "You will be notified when the product goes on sale".

   单击 **Notify Me** 按钮以触发一条通知，内容为："You will be notified when the product goes on sale"。

   <div class="lightbox">
     <img src="generated/images/guide/start/product-alert-notification.png" alt="Product alert notification confirmation dialog">
   </div>

For more information on communication between components, see [Component Interaction](guide/component-interaction "Component interaction").

有关组件之间的通信的更多信息，请参见[组件交互](guide/component-interaction "组件互动")。

{@a whats-next}

## What's next

## 下一步是什么

In this section, you've created an application that iterates through data and features components that communicate with each other.

在本节中，你已经创建了一个应用，该应用会遍历数据，并让特性组件彼此通讯。

To continue exploring Angular and developing this application:

要继续探索 Angular 并开发此应用，请执行以下操作：

* Continue to [In-app navigation](start/start-routing "Getting started: In-app navigation") to create a product details page.

  继续进行[应用内导航](start/start-routing "入门：应用内导航")，以创建产品详情页。

* Skip ahead to [Deployment](start/start-deployment "Getting started: Deployment") to move to local development, or deploy your application to Firebase or your own server.

  跳至[部署](start/start-deployment "入门：部署")以转为本地开发，或将你的应用部署到 Firebase 或你自己的服务器上。

