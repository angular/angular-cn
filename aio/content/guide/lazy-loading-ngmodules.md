# Lazy Loading Feature Modules

# 惰性加载的特性模块

#### Prerequisites

#### 前提条件

A basic understanding of the following:

对下列知识有基本的了解：

* [Feature Modules](guide/feature-modules).

   [特性模块](guide/feature-modules)

* [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

   [JavaScript 模块与 NgModules](guide/ngmodule-vs-jsmodule)。

* [Frequently Used Modules](guide/frequent-ngmodules).

   [常用模块](guide/frequent-ngmodules)。

* [Types of Feature Modules](guide/module-types).

   [特性模块的分类](guide/module-types)。

* [Routing and Navigation](guide/router).

   [路由与导航](guide/router)。

For the final sample app with two lazy loaded modules that this page describes, see the
<live-example></live-example>.

如果需要本页描述的具有两个惰性加载模块的范例应用，参见<live-example></live-example>。

<hr>

## High level view

## 高层视角

There are three main steps to setting up a lazy loaded feature module:

要想建立一个惰性加载的特性模块，有三个主要步骤：

1. Create the feature module.

   创建该特性模块。

1. Create the feature module’s routing module.

   创建该特性模块的路由模块。

1. Configure the routes.

   配置相关路由。

## Set up an app

## 建立应用

If you don’t already have an app, you can follow the steps below to
create one with the CLI. If you do already have an app, skip to
[Configure the routes](#config-routes). Enter the following command
where `customer-app` is the name of your app:

如果你还没有应用，可以遵循下面的步骤使用 CLI 创建一个。如果已经有了，可以直接跳到 [配置路由](#config-routes)部分。
输入下列命令，其中的 `customer-app` 表示你的应用名称：

```sh

ng new customer-app --routing

```

This creates an app called `customer-app` and the `--routing` flag
generates a file called `app-routing.module.ts`, which is one of
the files you need for setting up lazy loading for your feature module.
Navigate into the project by issuing the command `cd customer-app`.

这会创建一个名叫 `customer-app` 的应用，而 `--routing` 标识生成了一个名叫 `app-routing.module.ts` 的文件，它是你建立惰性加载的特性模块时所必须的。
输入命令 `cd customer-app` 进入该项目。

## Create a feature module with routing

## 创建一个带路由的特性模块

Next, you’ll need a feature module to route to. To make one, enter
the following command at the terminal window prompt where `customers` is the name of the module:

接下来，你需要一个要路由到的特性模块。要生成一个，请输入下列命令，其中的 `customers` 是该模块的名字：

```sh

ng generate module customers --routing

```

This creates a customers folder with two files inside; `CustomersModule`
and `CustomersRoutingModule`. `CustomersModule` will act as the gatekeeper
for anything that concerns customers. `CustomersRoutingModule` will handle
any customer-related routing. This keeps the app’s structure organized as
the app grows and allows you to reuse this module while easily keeping its routing intact.

这会创建一个 `customers` 目录，其中有两个文件：`CustomersModule` 和 `CustomersRoutingModule`。
`CustomersModule` 扮演的是与客户紧密相关的所有事物的管理员。`CustomersRoutingModule` 则会处理任何与客户有关的路由。
这样就可以在应用不断成长时保持应用的良好结构，并且当复用本模块时，你可以轻松的让其路由保持完好。

The CLI imports the `CustomersRoutingModule` into the `CustomersModule` by
adding a JavaScript import statement at the top of the file and adding
`CustomersRoutingModule` to the `@NgModule` `imports` array.

CLI 会把 `CustomersRoutingModule` 自动导入到 `CustomersModule`。它会在文件的顶部添加一条 JavaScript 的 `import` 语句，并把 `CustomersRoutingModule` 添加到 `@NgModule` 的 `imports` 数组中。

## Add a component to the feature module

## 向特性模块中添加组件

In order to see the module being lazy loaded in the browser, create a component to render some HTML when the app loads `CustomersModule`. At the command line, enter the following:

要想在浏览器中看出该模块惰性加载成功了，就创建一个组件用来在应用加载 `CustomersModule` 之后渲染出一些 HTML。在命令行中输入如下命令：

```sh

ng generate component customers/customer-list

```

This creates a folder inside of `customers` called `customer-list`
with the four files that make up the component.

这会在 `customers` 目录中创建一个名叫 `customer-list` 的文件夹，其中包含该组件的四个文件。

<!-- For more information
about components, see [Components](). -->

Just like with the routing module, the CLI imports the
`CustomerListComponent` into the `CustomersModule`.

就像路由模块一样，CLI 也自动把 `CustomerListComponent` 导入了 `CustomersModule`。

## Add another feature module

## 再添加一个特性模块

For another place to route to, create a second feature module with routing:

为了提供另一个可路由到的地点，再创建第二个带路由的特性模块：

```sh

ng generate module orders --routing

```

This makes a new folder called `orders` containing an `OrdersModule` and an `OrdersRoutingModule`.

这会创建一个名叫 `orders` 的新文件夹，其中包含 `OrdersModule` 和 `OrdersRoutingModule`。

Now, just like with the `CustomersModule`, give it some content:

现在，像 `CustomersModule` 一样，给它添加一些内容：

```sh

ng generate component orders/order-list

```

## Set up the UI

## 建立 UI

Though you can type the URL into the address bar, a nav
is easier for the user and more common. Replace the default
placeholder markup in `app.component.html` with a custom nav
so you can easily navigate to your modules in the browser:

虽然你也可以在地址栏中输入 URL，不过导航菜单会更好用，而且更常见。
把 `app.component.html` 中的占位脚本替换成一个自定义的导航，以便你在浏览器中能轻松地在模块之间导航。

<code-example path="lazy-loading-ngmodules/src/app/app.component.html" region="app-component-template" title="src/app/app.component.html" linenums="false">

</code-example>

To see your app in the browser so far, enter the following command in the terminal window:

要想在浏览器中看到你的应用，就在终端窗口中输入下列命令：

```sh

ng serve

```

Then go to `localhost:4200` where you should see “app works!” and three buttons.

然后，跳转到 `localhost:4200`，这时你应该看到 “app works!” 和三个按钮。

<figure>
 <img src="generated/images/guide/lazy-loading-ngmodules/three-buttons.png" width="300" alt="three buttons in the browser">
</figure>

To make the buttons work, you need to configure the routing modules.

要想让这些按钮生效，你需要配置一下这些路由模块。

{@a config-routes}

## Configure the routes

## 配置路由

The two feature modules, `OrdersModule` and `CustomersModule`, have to be
wired up to the `AppRoutingModule` so the router knows about them. The structure is as follows:

这两个特性模块（`OrdersModule` 和 `CustomersModule`）应该挂接到 `AppRoutingModule` 中，来让路由器知道它们。其结构如下：

<figure>
 <img src="generated/images/guide/lazy-loading-ngmodules/lazy-load-relationship.jpg" width="400" alt="lazy loaded modules diagram">
</figure>

Each feature module acts as a doorway via the router. In the `AppRoutingModule`, you configure the routes to the feature modules, in this case `OrdersModule` and `CustomersModule`. This way, the router knows to go to the feature module. The feature module then connects the `AppRoutingModule` to the `CustomersRoutingModule` or the `OrdersRoutingModule`. Those routing modules tell the router where to go to load relevant components.

每个特性模块都是路由器中的一个“门口”。在 `AppRoutingModule` 中，你配置了一些路由指向这些特性模块（即 `OrderModule` 和 `CustomersModule`）。
通过这种方式，路由器就知道了如何跳转到特性模块。然后，特性模块就把 `AppRoutingModule` 和 `CustomersRoutingModule` 或 `OrdersRoutingModule` 连接到一起。这些路由模块会告诉路由器该到哪里去加载相应的组件。

### Routes at the app level

### 顶层的路由

In `AppRoutingModule`, update the `routes` array with the following:

在 `AppRoutingModule` 中，把 `routes` 数组修改成这样：

<code-example path="lazy-loading-ngmodules/src/app/app-routing.module.ts" region="const-routes" title="src/app/app-routing.module.ts" linenums="false">

</code-example>

The import statements stay the same. The first two paths are the routes to the `CustomersModule` and the `OrdersModule` respectively. Notice that the lazy loading syntax uses `loadChildren` followed by a string that is the path to the module, a hash mark or `#`, and the module’s class name.

这些 `import` 语句没有变化。前两个路径分别路由到了 `CustomersModule` 和 `OrdersModule`。注意看惰性加载的语法：`loadChildren` 后面紧跟着一个字符串，它指向模块路径，然后是一个 `#`，然后是该模块的类名。

### Inside the feature module

### 特性模块内部

Next, take a look at `customers.module.ts`. If you’re using the CLI and following the steps outlined in this page, you don’t have to do anything here. The feature module is like a connector between the `AppRoutingModule` and the feature routing module. The `AppRoutingModule` imports the feature module, `CustomersModule`, and `CustomersModule` in turn imports the `CustomersRoutingModule`.

接下来看看 `customers.module.ts`。如果你使用的是 CLI，并遵循本页面中给出的步骤，那么在这里你不必做任何事。
特性模块就像是 `AppRoutingModule` 和该特性自己的路由模块之间的连接器。
`AppRoutingModule` 导入了特性模块 `CustomersModule`，而 `CustomersModule` 又导入了 `CustomersRoutingModule`。

<code-example path="lazy-loading-ngmodules/src/app/customers/customers.module.ts" region="customers-module" title="src/app/customers/customers.module.ts" linenums="false">

</code-example>

The `customers.module.ts` file imports the `CustomersRoutingModule` and `CustomerListComponent` so the `CustomersModule` class can have access to them. `CustomersRoutingModule` is then listed in the `@NgModule` `imports` array giving `CustomersModule` access to its own routing module, and `CustomerListComponent` is in the `declarations` array, which means `CustomerListComponent` belongs to the `CustomersModule`.

`customers.module.ts` 文件导入了 `CustomersRoutingModule` 和 `CustomerListComponent`，所以 `CustomersModule` 类可以访问它们。
接着 `CustomersRoutingModule` 出现在了 `@NgModule` 的 `imports` 数组中，这让 `CustomersModule` 可以访问它的路由模块。而 `CustomerListComponent` 出现在了 `declarations` 数组中，这表示 `CustomerListComponent` 属于 `CustomersModule`。

### Configure the feature module’s routes

### 配置该特性模块的路由

The next step is in `customers-routing.module.ts`. First, import the component at the top of the file with the other JavaScript import statements. Then, add the route to `CustomerListComponent`.

接下来的步骤位于 `customers-routing.module.ts` 中。首先，在文件的顶部使用 JS 的 `import` 语句导入该组件。然后添加指向 `CustomerListComponent` 的路由。

<code-example path="lazy-loading-ngmodules/src/app/customers/customers-routing.module.ts" region="customers-routing-module" title="src/app/customers/customers-routing.module.ts" linenums="false">

</code-example>

Notice that the `path` is set to an empty string. This is because the path in `AppRoutingModule` is already set to `customers`, so this route in the `CustomersRoutingModule`, is already within the `customers` context. Every route in this routing module is a child route.

注意，`path` 被设置成了空字符串。这是因为 `AppRoutingModule` 中的路径已经设置为了 `customers`，所以 `CustomersRoutingModule` 中的这个路由定义已经位于 `customers` 这个上下文中了。也就是说这个路由模块中的每个路由其实都是子路由。

Repeat this last step of importing the `OrdersListComponent` and configuring the Routes array for the `orders-routing.module.ts`:

重复这个步骤以导入 `OrdersListComponent`，并为 `orders-routing.module.ts` 配置路由树组：

<code-example path="lazy-loading-ngmodules/src/app/orders/orders-routing.module.ts" region="orders-routing-module-detail" title="src/app/orders/orders-routing.module.ts (excerpt)" linenums="false">

</code-example>

Now, if you view the app in the browser, the three buttons take you to each module.

现在，如果你在浏览器中查看该应用，这三个按钮会把你带到每个模块去。

## Confirm it’s working

## 确认它工作正常

You can check to see that a module is indeed being lazy loaded with the Chrome developer tools. In Chrome, open the dev tools by pressing `Cmd+Option+i` on a Mac or `Ctrl+Alt+i` on a PC and go to the Network Tab.

你可以使用 Chrome 开发者工具来确认一下这些模块真的是惰性加载的。
在 Chrome 中，按 `Cmd+Option+i`（Mac）或 `Ctrl+Alt+i`（PC），并选中 `Network` 页标签。

<figure>
 <img src="generated/images/guide/lazy-loading-ngmodules/network-tab.png" width="600" alt="lazy loaded modules diagram">
</figure>

Click on the Orders or Customers button. If you see a chunk appear, you’ve wired everything up properly and the feature module is being lazy loaded. A chunk should appear for Orders and for Customers but will only appear once for each.

点击 Orders 或 Customers 按钮。如果你看到某个 chunk 文件出现了，就表示你已经惰性加载并接入了这个特性模块。Orders 和 Customers 都应该出现一次 chunk，并且它们各自只应该出现一次。

<figure>
 <img src="generated/images/guide/lazy-loading-ngmodules/chunk-arrow.png" width="600" alt="lazy loaded modules diagram">
</figure>

To see it again, or to test after working in the project, clear everything out by clicking the circle with a line through it in the upper left of the Network Tab:

要想再次查看它或测试本项目后面的行为，只要点击 Network 页左上放的“清除”图标即可。

<figure>
 <img src="generated/images/guide/lazy-loading-ngmodules/clear.gif" width="200" alt="lazy loaded modules diagram">
</figure>

Then reload with `Cmd+r` or `Ctrl+r`, depending on your platform.

然后，使用 `Cmd+r`（Mac） 或 `Ctrl+r`（PC） 重新加载页面。

## `forRoot()` and `forChild()`

## `forRoot()` 与 `forChild()`

You might have noticed that the CLI adds `RouterModule.forRoot(routes)` to the `app-routing.module.ts` `imports` array. This lets Angular know that this module,
`AppRoutingModule`, is a routing module and `forRoot()` specifies that this is the root
routing module. It configures all the
routes you pass to it, gives you access to the router directives, and registers the `RouterService`.
Use `forRoot()` in the `AppRoutingModule`&mdash;that is, one time in the app at the root level.

你可能已经注意到了，CLI 会把 `RouterModule.forRoot(routes)` 添加到 `app-routing.module.ts` 的 `imports` 数组中。
这会让 Angular 知道 `AppRoutingModule` 是一个路由模块，而 `forRoot()` 表示这是一个根路由模块。
它会配置你传入的所有路由、让你能访问路由器指令并注册 `RouterService`。
在 `AppRoutingModule` 中使用 `forRoot()`，在本应用中这只会在顶层模块中写一次。

The CLI also adds `RouterModule.forChild(routes)` to feature routing modules. This way, Angular
knows that the route list is only responsible for providing additional routes and is intended for feature modules. You can use `forChild()` in multiple modules.

CLI 还会把 `RouterModule.forChild(routes)` 添加到各个特性模块中。这种方式下 Angular 就会知道这个路由列表只负责提供额外的路由并且其设计意图是作为特性模块使用。你可以在多个模块中使用 `forChild()`。

`forRoot()` contains injector configuration which is global; such as configuring the Router. `forChild()` has no injector configuration, only directives such as `RouterOutlet` and `RouterLink`.

`forRoot()` 包含的注入器配置是全局性的，比如对路由器的配置。`forChild()` 中没有注入器配置，只有像 `RouterOutlet` 和 `RouterLink` 这样的指令。

<hr>

## More on NgModules and routing

## 更多关于 NgModule 和路由的知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Routing and Navigation](guide/router).

   [路由与导航](guide/router)。

* [Providers](guide/providers).

   [服务提供商](guide/providers)。

* [Types of Feature Modules](guide/module-types).

   [特性模块的分类](guide/module-types)。
