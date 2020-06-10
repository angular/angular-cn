# Part 1: Getting started with a basic Angular app

# Angular 入门：你的第一个应用

Welcome to Angular!

Angular 欢迎你！

This tutorial introduces you to the essentials of Angular by walking you through a simple e-commerce site with a catalog, shopping cart, and check-out form.
To help you get started right away, this guide uses a simple ready-made application that you can examine and modify interactively (without having to [set up a local work environment](guide/setup-local "Setup guide")).

本教程将通过一个简单的电子商务网站，向你介绍 Angular 的基本知识。该网站具有商品名录、购物车和结账表单。
为了帮助你更好地起步，本指南提供了一个已完成的简单应用，你可以在其中试验及互动。

<div class="callout is-helpful">

<header>New to web development?</header>

<header>你是 Web 开发的新手吗？</header>

 There are many resources to complement the Angular docs. Mozilla's MDN docs include both [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML "Learning HTML: Guides and tutorials") and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript") introductions. [TypeScript's docs](https://www.typescriptlang.org/docs/home.html "TypeScript documentation") include a 5-minute tutorial. Various online course platforms, such as [Udemy](http://www.udemy.com "Udemy online courses") and [Codecademy](https://www.codecademy.com/ "Codecademy online courses"), also cover web development basics.

你可以找到很多资源作为 Angular 文档的补充。Mozilla 的 MDN 文档同时包含了 [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML "学习 HTML：指南和教程") 和 [JavaScript 的](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript") 介绍。[TypeScript 的文档](https://www.typescriptlang.org/docs/home.html "TypeScript 文档")中包含一个 5 分钟教程。各种在线课程平台，比如 [Udemy](http://www.udemy.com "Udemy 在线课程") 和 [Codecademy](https://www.codecademy.com/ "Codeacademy 在线课程")，也涵盖了 Web 开发的一些基础知识。

</div>

{@a new-project}

## Create the sample project

## 创建一个新项目

<h4>
<live-example name="getting-started-v0" noDownload>点此在 StackBlitz 上创建一个新项目。</live-example>
</h4>

<div class="lightbox">

  <img src="generated/images/guide/start/new-app-all.gif" alt="Starter online store app">

</div>

* The preview pane on the right shows the starting state of the sample Angular app.
It defines a frame with a top bar (containing the store name and checkout icon) and the title for a product list (which will be populated and dynamically updated with data from the application).

  右侧的预览窗格显示了示例 Angular 应用程序的初始状态。它定义了一个带有顶栏的框架（包含商店名称和结账图标）以及一个产品列表的标题（它将用来自应用中的数据填充并动态更新产品列表）

* The project pane on the left shows the source files that make up the application, including all of the infrastructure and configuration files. The currently selected file shows up in the editor pane in the middle.

  左侧的项目窗格显示了组成应用程序的源文件，包括所有基础设施和配置文件。当前选中的文件显示在中间的编辑器窗格中。

Before going into the source structure, the next section shows how to fill out the HTML *template* for the product list, using the provided sample data.
This should give you an idea how easy it is to modify and update the page dynamically.

在深入源码结构之前，下一节将介绍如何使用提供的示例数据为产品列表编写 HTML *模板*。
这将让你知道动态修改和更新页面有多容易。

<div class="callout is-helpful">
<header>StackBlitz 提示</header>

* Log into StackBlitz so you can save and resume your work.
If you have a GitHub account, you can log into StackBlitz
with that account. In order to save your progress, first
fork the project using the Fork button at the top left,
then you'll be able to save your work to your own StackBlitz
account by clicking the Save button.

  登录 StackBlitz，就可以随时保存和恢复你的工作。如果你已经有了 GitHub 账号，也可以用该账号登录 StackBlitz。为了保存你的进程，首先使用左上方的 Fork 按钮来为本项目开个分支，然后你就能通过点击 “Save” 按钮来把你的工作保存到你自己的 StackBlitz 账号中了。

* To copy a code example from this tutorial, click the icon
at the top right of the code example box, and then paste the
code snippet from the clipboard into StackBlitz.

   要复制本教程中的代码示例，请单击代码示例框右上角的图标，然后将剪贴板中的代码片段粘贴到 StackBlitz 中。

* If the StackBlitz preview pane isn't showing what you
expect, save and then click the refresh button.

   如果 StackBlitz 预览窗格没有如你预期般显示出来，请保存并点击刷新按钮。

* StackBlitz is continually improving, so there may be
slight differences in generated code, but the app's
behavior will be the same.

   StackBlitz 正在不断改进，因此生成的代码可能会略有不同，但应用的行为是一样的。

* When you generate the StackBlitz example apps that
accompany the tutorials, StackBlitz creates the starter
files and mock data for you. The files you'll use throughout
the tutorials are in the `src` folder of the StackBlitz
example apps.

  当生成本教程附带的 StackBlitz 示例应用时，StackBlitz 会为你创建启动程序文件和模拟数据。整个教程中你要用到的文件位于 StackBlitz 示例应用的 `src` 文件夹中。

</div>

<div class="alert is-important">

If you go directly to the [StackBlitz online development environment](https://stackblitz.com/) and choose to [start a new Angular workspace](https://stackblitz.com/fork/angular), you get a generic stub application, rather than this [illustrative sample](#new-project). Once you have been introduced to the basic concepts here, this can be helpful for working interactively while you are learning Angular.

如果直接进入 [StackBlitz 在线开发环境](https://stackblitz.com/) 并选择 [start a new Angular workspace](https://stackblitz.com/fork/angular)，你将获得一个通用的应用骨架，而不是此[解说性范例](#new-project)。等介绍完这里的基本概念后，它对于你在学习 Angular 时交互式的进行工作很有帮助。

In actual development you will typically use the [Angular CLI](guide/glossary#command-line-interface-cli "Definition of CLI"), a powerful command-line tool that lets you generate and modify applications. For a full step-by-step guide that shows how to use the CLI to create a new project and all of its parts, see [Tutorial: Tour of Heroes](tutorial).

在实际开发中，通常会使用 [Angular CLI](guide/glossary#command-line-interface-cli)，这是一个功能强大的命令行工具，可以让你生成和修改应用程序。有关更多信息，请参见 [CLI 概述](cli)。

</div>

{@a template-syntax}

## Template syntax

## 模板语法

Angular's template syntax extends HTML and JavaScript.
This section introduces template syntax by enhancing the "Products" area.

Angular 的模板语法扩展了 HTML 和 JavaScript。在本节中，你将通过增强 “商品” 区域来了解模板语法。

<div class="alert is-helpful">

To help you get going, the following steps use predefined product data from the `products.ts` file (already created in StackBlitz example) and methods from the `product-list.component.ts` file.

为了让你专注于模板语法，下列步骤使用了来自 `products.ts` 文件（由 StackBlitz 范例创建的）的预定义产品数据和来自 `product-list.component.ts` 文件的方法。

</div>

1. In the `product-list` folder, open the template file `product-list.component.html`.

   在 `product-list` 文件夹中，打开模板文件 `product-list.component.html`。

1. Modify the product list template to display a list of product names.

   修改商品列表模板，看是否列出了商品名称。

    1. Each product in the list displays the same way, one after another on the page. To iterate over the predefined list of products, put the `*ngFor` directive on a `<div>`, as follows:

       列表中的每个商品都以同样的方式在页面上挨个显示出来。要遍历这些预定义的商品列表，请使用 `*ngFor` 指令，把 `*ngFor` 指令加到 `<div>` 上，如下图所示：

      <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.2.html" region="ngfor">
      </code-example>

      With `*ngFor`, the `<div>` repeats for each product in the list.

      有了 `*ngFor`，这个 `<div>` 就会被列表中的每个商品都重复渲染一次。

      <div class="alert is-helpful">

      `*ngFor` is a "structural directive". Structural directives shape or reshape the DOM's structure, typically by adding, removing, and manipulating the elements to which they are attached. Directives with an asterisk, `*`, are structural directives.

      `*ngFor` 是一个 "结构型指令"。结构型指令会通过添加、删除和操纵它们的宿主元素等方式塑造或重塑 DOM 的结构。任何带有星号 `*` 的指令都是结构型指令。
      </div>

    1. To display the names of the products, use the interpolation syntax `{{ }}`. Interpolation renders a property's value as text. Inside the `<div>`, add an `<h3>` to display the interpolation of the product's name property:

       要显示商品的名称，请使用插值语法 `{{}}`。插值会把属性的值作为文本渲染出来。在 `<div>` 里面，添加一个 `<h3>` 标题来显示商品 name 属性的插值：

      <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html" region="interpolation">
      </code-example>

      The preview pane immediately updates to display the name of each product in the list.

      预览窗格会立即更新，以显示列表中每个商品的名称。

      <div class="lightbox">

        <img src="generated/images/guide/start/template-syntax-product-names.png" alt="Product names added to list">

      </div>

1. To make each product name a link to product details, add the `<a>` element and set its title to be the product's name by using the property binding `[ ]` syntax, as follows:

   为了让每个商品名称都能链接到商品详情，添加一个 `<a>` 元素，并使用属性绑定语法 `[]` 把该链接的 `title` 设置成该商品的名字，如下所示：

    <code-example path="getting-started/src/app/product-list/product-list.component.2.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    In the preview pane, hold the pointer over a product
    name to see the bound name property value, which is
    the product name plus the word "details".
    Interpolation `{{ }}` lets you render the
    property value as text; property binding `[ ]` lets you
    use the property value in a template expression.

    在预览窗格中，将鼠标悬停在显示的商品名称上，可以看到绑定的 name 属性值。它们都是商品名加上单词 "details" 的格式。插值 `{{}}` 允许你把属性值渲染为文本；而属性绑定语法 `[]` 则允许你在模板表达式中使用属性值。

    <div class="lightbox">

      <img src="generated/images/guide/start/template-syntax-product-anchor.png" alt="Product name anchor text is product name property">

    </div>

4. Add the product descriptions. On the `<p>` element, use an `*ngIf` directive so that Angular only creates the `<p>` element if the current product has a description.

   添加商品说明。在 `<p>` 标签上，使用 `*ngIf` 指令，这样 Angular 只会在当前商品有描述信息的情况下创建这个 `<p>` 元素。

    <code-example path="getting-started/src/app/product-list/product-list.component.3.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    The app now displays the name and description of each product in the list. Notice that the final product does not have a description paragraph. Because the product's description property is empty, Angular doesn't create the `<p>` element&mdash;including the word "Description".

    该应用会立即在列表中显示每种商品的名称和描述。请注意，最后一个商品根本没有描述信息。由于该商品的 description 属性为空，因此 Angular 不会创建 `<p>` 元素（包括静态文本 “Description”）。

    <div class="lightbox">

      <img src="generated/images/guide/start/template-syntax-product-description.png" alt="Product descriptions added to list">

    </div>

5. Add a button so users can share a product with friends. Bind the button's `click` event to the `share()` method (in `product-list.component.ts`). Event binding uses a set of parentheses, `( )`, around the event, as in the following `<button>` element:

   添加一个按钮，以便让用户可与朋友分享商品。把 button 的 `click` 事件绑定到我们替你定义好的 `share()` 方法上（位于 `product-list.component.ts` ）。事件绑定是通过把事件名称包裹在圆括号 `( )` 中完成的，如下面的 `<button>` 元素所示：

    <code-example path="getting-started/src/app/product-list/product-list.component.4.html" header="src/app/product-list/product-list.component.html">
    </code-example>

    Each product now has a "Share" button:

    现在，每个商品都有一个 “Share” 按钮了：

    <div class="lightbox">

      <img src="generated/images/guide/start/template-syntax-product-share-button.png" alt="Share button added for each product">

    </div>

    Test the "Share" button:

    测试 “Share” 按钮：

    <div class="lightbox">

      <img src="generated/images/guide/start/template-syntax-product-share-alert.png" alt="Alert box indicating product has been shared">

    </div>

The app now has a product list and sharing feature.
In the process, you've learned to use five common features of Angular's template syntax:

该应用现在具有商品列表和共享功能。在这个过程中，你已经学会了 Angular 模板语法的五个常用特性：

* `*ngFor`

* `*ngIf`

* Interpolation `{{ }}`

   插值 `{{}}`

* Property binding `[ ]`

   属性绑定 `[]`

* Event binding `( )`

   事件绑定 `()`

<div class="alert is-helpful">

For a fuller introduction to Angular's template syntax, see [Introduction to components and templates](guide/architecture-components#template-syntax "Template Syntax").

要了解关于 Angular 模板语法全部特性的信息，请参阅[模板语法指南](guide/template-syntax "模板语法")。

</div>

{@a components}

## Components

## 组件

*Components* define areas of responsibility in the user interface, or UI,
that let you reuse sets of UI functionality.
You've already built one with the product list component.

*组件*在用户界面（也就是 UI）中定义了一些责任区，让你能重用这些 UI 功能集。你已经通过商品列表组件构建了一个。

A component consists of three things:

组件包含三部分：

* **A component class** that handles data and functionality. In the previous section, the product data and the `share()` method in the component class handle data and functionality, respectively.

  **一个组件类**，它用来处理数据和功能。上一节，我们在组件类中定义了商品数据和 `share()` 方法，它们分别用来处理数据和功能。

* **An HTML template** that determines the UI. In the previous section, the product list's HTML template displays the name, description, and a "Share" button for each product.

  **一个 HTML 模板**，它决定了 UI。在上一节中，商品列表的 HTML 模板用来显示每个商品的名称、描述和 “Share” 按钮。

* **Component-specific styles** that define the look and feel.
Though product list does not define any styles, this is where component CSS
resides.

  **组件专属的样式**定义了外观和感觉。商品列表中还没有定义任何样式，那属于组件 CSS 负责。

<!--

### Class definition

Let's take a quick look a the product list component's class definition:

1. In the `product-list` directory, open `product-list.component.ts`.

1. Notice the `@Component` decorator. This provides metadata about the component, including its templates, styles, and a selector.

    * The `selector` is used to identify the component. The selector is the name you give the Angular component when it is rendered as an HTML element on the page. By convention, Angular component selectors begin with the prefix such as `app-`, followed by the component name.

    * The template and style filename also are provided here. By convention each of the component's parts is in a separate file, all in the same directory and with the same prefix.

1. The component definition also includes an exported class, which handles functionality for the component. This is where the product list data and `Share()` method are defined.

### Composition

-->

An Angular application comprises a tree of components, in which each Angular component has a specific purpose and responsibility.

Angular 应用程序由一棵组件树组成，每个 Angular 组件都有一个明确的用途和责任。

Currently, the example app has three components:

目前，该范例有三个组件：

<div class="lightbox">

  <img src="generated/images/guide/start/app-components.png" alt="Online store with three components">

</div>

* `app-root` (orange box) is the application shell. This is the first component to load and the parent of all other components. You can think of it as the base page.

   `app-root`（橙色框）是应用的外壳。这是要加载的第一个组件，也是所有其它组件的父组件。你可以把它想象成一个基础页面。

* `app-top-bar` (blue background) is the store name and checkout button.

   `app-top-bar`（蓝色背景）是商店名称和结帐按钮。

* `app-product-list` (purple box) is the product list that you modified in the previous section.

   `app-product-list`（紫色框）是你在上一节中修改过的商品列表。

The next section expands the app's capabilities by adding a new component&mdash;a product alert&mdash;as a child of the product list component.

下一节会扩展应用的功能，添加了一个新组件（产品提醒），并把它添加为商品列表组件的子组件。

<div class="alert is-helpful">

For more information about components and how they interact with templates, see [Introduction to Components](guide/architecture-components "Concepts > Introduction to Components and Templates").

要了解关于组件及其与模板交互的更多信息，请参阅[“组件简介”](guide/architecture-components "架构>组件简介")。

</div>

{@a input}

## Input

## 输入

Currently, the product list displays the name and description of each product.
The product list component also defines a `products` property that contains imported data for each product from the `products` array in `products.ts`.

目前，商品列表会显示每个商品的名称和描述。
该商品列表组件还定义了一个 `products` 属性，它包含每个商品的导入数据（来自 `products.ts` 中的 `products` 数组。）

The next step is to create a new alert feature that takes a product as an input. The alert checks the product's price, and, if the price is greater than $700, displays a "Notify Me" button that lets users sign up for notifications when the product goes on sale.

接下来创建一个新的提醒功能。它会接收一个商品作为输入。它会检查商品的价格，如果价格高于 700 美元，它会显示一个“Notify Me”（通知我）按钮，让用户注册一个当商品上市时发送的通知。

1. Create a new product alerts component.

   创建一个新商品提醒组件。

    1. Right click on the `app` folder and use the `Angular Generator` to generate a new component named `product-alerts`.

       右键单击 `app` 文件夹，使用 `Angular Generator` 生成一个名为 `product-alerts` 的新组件。

        <div class="lightbox">

          <img src="generated/images/guide/start/generate-component.png" alt="StackBlitz command to generate component">

        </div>

        The generator creates starter files for all three parts of the component:

        该 generator 为组件的三个部分创建了启动文件：

        * `product-alerts.component.ts`

        * `product-alerts.component.html`

        * `product-alerts.component.css`

1. Open `product-alerts.component.ts`.

   打开 `product-alerts.component.ts`。

    <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="as-generated"></code-example>

    1. Notice the `@Component()` decorator. This indicates that the following class is a component. It provides metadata about the component, including its selector, templates, and styles.

       注意 `@Component()` 装饰器。这表明它下面的类是一个组件。它提供了有关该组件的元数据，包括它的选择器、模板和样式。

        * The `selector` identifies the component. The selector is the name you give the Angular component when it is rendered as an HTML element on the page. By convention, Angular component selectors begin with the prefix `app-`, followed by the component name.

          该 `selector` 用于标识该组件。该选择器是当 Angular 组件在页面中渲染出 HTML 元素时使用的名字。按照惯例，Angular 组件选择器会以前缀 `app-` 开头，后跟组件名称。

        * The template and style filenames reference the HTML and CSS files that StackBlitz generates.

          模板和样式文件名。它们是对 StackBlitz 生成的 HTML 和 CSS 文件的引用。

    1. The component definition also exports the class, `ProductAlertsComponent`, which handles functionality for the component.

       组件定义中还导出了类 `ProductAlertsComponent`，用于处理该组件的功能。

1. Set up the new product alerts component to receive a product as input:

   设置新商品提醒组件，让它接收一个商品作为输入：

    1. Import `Input` from `@angular/core`.

       从 `@angular/core` 导入 `Input`。

        <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="imports" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

    1. In the `ProductAlertsComponent` class definition, define a property named `product` with an `@Input()` decorator. The `@Input()` decorator indicates that the property value passes in from the component's parent, the product list component.

       在 `ProductAlertsComponent` 类的定义中，定义一个带 `@Input()` 装饰器的 `product` 属性。`@Input()` 装饰器指出其属性值是从该组件的父组件商品列表组件中传入的。

        <code-example path="getting-started/src/app/product-alerts/product-alerts.component.1.ts" region="input-decorator" header="src/app/product-alerts/product-alerts.component.ts"></code-example>

1. Define the view for the new product alert component.

   定义这个新商品提醒组件的视图。

    1. Open the `product-alerts.component.html` template and replace the placeholder paragraph with a "Notify Me" button that appears if the product price is over $700.

       打开 `product-alerts.component.html` 模板，把作为占位符的 p 替换为如果商品价格超过 700 美元就要显示出来的“通知我”按钮。

    <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.1.html"></code-example>

1. Display the new product alert component as a child of the product list.

   把这个新商品提醒组件显示为该商品列表的一部分（子组件）。

    1. Open `product-list.component.html`.

       打开 `product-list.component.html`。

    1. To include the new component, use its selector, `app-product-alerts`, as you would an HTML element.

       要包含这个新组件，只要像使用 HTML 元素一样使用它的选择器（ `app-product-alert` ）就可以了。

    1. Pass the current product as input to the component using property binding.

       通过属性绑定把当前商品作为输入传给组件。

        <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.5.html" region="app-product-alerts"></code-example>

The new product alert component takes a product as input from the product list. With that input, it shows or hides the "Notify Me" button, based on the price of the product. The Phone XL price is over $700, so the "Notify Me" button appears on that product.

新商品提醒组件会从商品列表中获取商品作为输入信息。通过该输入，它会根据商品的价格显示或隐藏 “Notify Me” 按钮。由于 Phone XL 的售价超过了 700 美元，所以该商品上会出现“Notify Me”按钮。

<div class="lightbox">

  <img src="generated/images/guide/start/product-alert-button.png" alt="Product alert button added to products over $700">

</div>

<div class="alert is-helpful">

See [Component Interaction](guide/component-interaction "Components & Templates > Component Interaction") for more information about passing data from a parent to child component, intercepting and acting upon a value from the parent, and detecting and acting on changes to input property values.

要了解如何将数据从父组件传递到子组件、拦截并处理来自父组件的值，以及检测并对输入属性值进行更改的更多信息，请参阅 [组件交互](guide/component-interaction "组件和模板>组件交互")一章。

</div>

{@a output}

## Output

## 输出

To make the "Notify Me" button work, you need to configure two things:

要想让 “Notify Me” 按钮正常工作，你需要配置两处：

  - the product alert component to emit an event when the user clicks "Notify Me"

    当用户点击 “Notify Me” 时，产品提醒组件发出一个事件
  
  - the product list component to act on that event

    商品列表组件对这个事件进行响应

1. Open `product-alerts.component.ts`.

   打开 `product-alerts.component.ts`。

1. Import `Output` and `EventEmitter` from `@angular/core`:

   从 `@angular/core` 中导入 `Output` 和 `EventEmitter`：

    <code-example header="src/app/product-alerts/product-alerts.component.ts" path="getting-started/src/app/product-alerts/product-alerts.component.ts" region="imports"></code-example>

1. In the component class, define a property named `notify` with an `@Output()` decorator and an instance of `EventEmitter()`. This allows the product alert component to emit an event when the value of the notify property changes.

   在组件类中，用 `@Output()` 装饰器和一个事件发射器 `EventEmitter()` 实例定义一个名为 `notify` 的属性。这可以让商品提醒组件在 notify 属性发生变化时发出事件。

<div class="alert is-helpful">

  When the Angular CLI generates a new component, it includes an empty constructor, the `OnInit` interface, and the `ngOnInit()` method.
  Since the following example isn't using them, they are omitted here for brevity.

  当 Angular CLI 生成一个新组件时，它包含一个空的构造函数，`OnInit` 接口和 `ngOnInit()` 方法。
  以下示例未使用它们，为了简洁起见，此处将其省略。
  
</div>

    <code-example path="getting-started/src/app/product-alerts/product-alerts.component.ts" header="src/app/product-alerts/product-alerts.component.ts" region="input-output"></code-example>

1. In the product alert template, `product-alerts.component.html`, update the "Notify Me" button with an event binding to call the `notify.emit()` method.

   在商品提醒模板（`product-alerts.component.html`）中，用事件绑定更新“Notify Me”按钮，以调用 `notify.emit()` 方法。

    <code-example header="src/app/product-alerts/product-alerts.component.html" path="getting-started/src/app/product-alerts/product-alerts.component.html"></code-example>

1. Next, define the behavior that should happen when the user clicks the button. Recall that it's the parent, product list component&mdash;not the product alerts component&mdash;that acts when the child raises the event. In  `product-list.component.ts`, define an `onNotify()` method, similar to the `share()` method:

   接下来，定义当用户单击该按钮时应该发生的行为。回想一下，应该由父组件（商品列表组件）采取行动，而不是商品提醒组件。在 `product-list.component.ts` 文件中，定义一个 `onNotify()` 方法，类似于 `share()` 方法：

    <code-example header="src/app/product-list/product-list.component.ts" path="getting-started/src/app/product-list/product-list.component.ts" region="on-notify"></code-example>

1. Finally, update the product list component to receive output from the product alerts component.

   最后，修改商品列表组件以接收商品提醒组件的输出。

    In `product-list.component.html`, bind the `app-product-alerts` component (which is what displays the "Notify Me" button) to the `onNotify()` method of the product list component.

    在 `product-list.component.html` 中，把 `app-product-alerts` 组件（就是它显示的“Notify Me”按钮）的 `notify` 事件绑定到商品列表组件的 `onNotify()` 方法。

    <code-example header="src/app/product-list/product-list.component.html" path="getting-started/src/app/product-list/product-list.component.6.html" region="on-notify"></code-example>

1. Try the "Notify Me" button:

   试试“Notify Me”按钮：

    <div class="lightbox">

      <img src="generated/images/guide/start/product-alert-notification.png" alt="Product alert notification confirmation dialog">

    </div>

<div class="alert is-helpful">

See [Component Interaction](guide/component-interaction "Components & Templates > Component Interaction") for more information about listening for events from child components, reading child properties or invoking child methods, and using a service for bi-directional communication between components.

要了解关于从子组件监听事件、读取子属性或调用子方法以及如何用服务在组件之间进行双向通信的详细信息，请参阅“[组件交互](guide/component-interaction "组件和模板>组件交互")”一章。

</div>

{@a next-steps}

## Next steps

## 下一步

Congratulations! You've completed your first Angular app!

恭喜！你已经完成了第一个 Angular 应用！

You have a basic online store catalog with a product list, "Share" button, and "Notify Me" button.
You've learned about the foundation of Angular: components and template syntax.
You've also learned how the component class and template interact, and how components communicate with each other.

你有了一个基本的在线商店目录，它带有商品列表，“Share”按钮和“Notify Me”按钮。你已经了解了 Angular 的基础知识：组件和模板语法。你还学习了组件类和模板如何交互，以及组件如何相互通信。

To continue exploring Angular, choose either of the following options:

要继续探索 Angular，请选择以下选项之一：

* [Continue to the "In-app navigation" section](start/start-routing "Try it: In-app navigation") to create a product details page that can be accessed by clicking a product name and that has its own URL pattern.

   [继续浏览“路由”部分](start/start-routing "入门：路由")，创建一个商品详情页面，通过单击商品名称，可以访问该页面，该页面有自己的 URL 模式。

* [Skip ahead to the "Deployment" section](start/start-deployment "Try it: Deployment") to move to local development, or deploy your app to Firebase or your own server.

   [跳到“部署”部分，](start/start-deployment "入门：部署")把你的应用转移到本地开发、部署到 Firebase 或你自己的服务器。
