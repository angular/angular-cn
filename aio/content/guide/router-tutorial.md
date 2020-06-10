# Using Angular routes in a single-page application

# 在单页面应用中使用 Angular 路由

This tutorial describes how you can build a single-page application, SPA that uses multiple Angular routes.

本教程将介绍如何构建一个使用多个 Angular 路由的单页面应用 SPA。

In an SPA, all of your application's functions exist in a single HTML page.
As users access your application's features, the browser needs to render only the parts that matter to the user, instead of loading a new page. This pattern can significantly improve your application's user exprience.

在 SPA 中，所有应用的所有功能都存在于同一个 HTML 页面中。当用户访问应用的各种特性时，浏览器只需渲染那些用户需要关心的部分，而不用重新加载页面。这种模式可以显著改善应用的用户体验。

To define how users navigate through your application, you use routes. You can add routes to define how users navigate from one part of your application to another.
You can also configure routes to guard against unexpected or unauthorized behavior.

为了定义用户如何在应用中导航，你可以使用路由。你可以添加一些路由来定义用户如何从应用的某个部分导航到另一部分。你也可以配置一些路由来防范意外或未经授权的行为。

To explore a sample app featuring the contents of this tutorial, see the <live-example></live-example>.

要探索本教程的示例应用，请参阅<live-example></live-example>。

## Objectives

## 目标

* Organize a sample application's features into modules.

  将示例应用的各个特性组织到一些模块中。

* Define how to navigate to a component.

  定义如何导航到组件。

* Pass information to a component using a parameter.

  使用参数把信息传给组件。

* Structure routes by nesting several routes.

  通过嵌套多个路由来构造路由体系。

* Check whether users can access a route.

  检查用户是否可以访问路由。

* Control whether the application can discard unsaved changes.

  控制该应用是否可以放弃未保存的更改。

* Improve performance by pre-fetching route data and lazy loading feature modules.

  通过预先获取路由数据和惰性加载特性模块来提高性能。

* Require specific criteria to load components.

  需要特定的条件来加载组件。

## Prerequisites

## 先决条件

To complete this tutorial, you should have a basic understanding of the following concepts:

要完成本教程，你应该对这些概念有一个基本的了解：

* JavaScript
* HTML
* CSS
* [Angular CLI](/cli)

You might find the [Tour of Heroes tutorial](/tutorial) helpful, but it is not required.

你可能会发现[英雄指南教程](/tutorial)很有帮助，但它并不是必须的。

## Create a sample application

## 创建一个示例应用

Using the Angular CLI, create a new application, _angular-router-sample_. This application will have two components: _crisis-list_ and _heroes-list_.

使用 Angular CLI，创建一个新的应用*angular-router-sample*。这个应用程序有两个组件： *crisis-list*和*heroes-list*。

1. Create a new Angular project, _angular-router-sample_.

   创建一个新的 Angular 项目 *angular-router-sample*。

   <code-example language="sh">
   ng new angular-router-sample
   </code-example>

   When prompted with `Would you like to add Angular routing?`, select `N`.

   当系统提示 `Would you like to add Angular routing?` 时，选择 `N`

   When prompted with `Which stylesheet format would you like to use?`, select `CSS`.

   当系统提示 `Which stylesheet format would you like to use?` 时，选择 `CSS`。

   After a few moments, a new project, `angular-router-sample`, is ready.

   一段时间后，一个新项目 `angular-router-sample` 就准备就绪了。

1. From your terminal, navigate to the `angular-router-sample` directory.

   在终端上，导航到 `angular-router-sample` 目录。

1. Create a component, _crisis-list_.

   创建一个组件  _crisis-list_。

  <code-example language="sh">
   ng generate component crisis-list
  </code-example>

1. In your code editor, locate the file, `crisis-list.component.html` and replace
   the placeholder content with the following HTML.

   在你的代码编辑器中，找到文件 `crisis-list.component.html` 并用如下 HTML 替换占位符内容。

   <code-example header="src/app/crisis-list/crisis-list.component.html" path="router-tutorial/src/app/crisis-list/crisis-list.component.html"></code-example>

1. Create a second component, _heroes-list_.

   创建第二个组件 `heroes-list`。

  <code-example language="sh">
   ng generate component heroes-list
  </code-example>

1. In your code editor, locate the file, `heroes-list.component.html` and replace the placeholder content with the following HTML.

   在你的代码编辑器中，找到 `heroes-list.component.html` 文件，并用如下 HTML 替换占位符内容。

   <code-example header="src/app/heroes-list/heroes-list.component.html" path="router-tutorial/src/app/heroes-list/heroes-list.component.html"></code-example>

1. In your code editor, open the file, `app.component.html` and replace its contents with the following HTML.

   在你的代码编辑器中，打开文件 `app.component.html` 并用如下 HTML 替换其内容。

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="setup"></code-example>

1. Verify that your new application runs as expected by running the `ng serve` command.

   运行 `ng serve` 来验证新应用是否正常运行。

  <code-example language="sh">
   ng serve
  </code-example>

1. Open a browser to `http://localhost:4200`.

   打开浏览器访问 `http://localhost:4200`。

   You should see a single web page, consisting of a title and the HTML of your two components.

   你会看到一个网页，它由一个标题和两个组件的 HTML 组成。

## Import `RouterModule` from `@angular/router`

## 从 `@angular/router` 导入 `RouterModule`

Routing allows you to display specific views of your application depending on the URL path.
To add this functionality to your sample application, you need to update the `app.module.ts` file to use the module, `RouterModule`.
You import this module from `@angular/router`.

路由允许你根据 URL 路径显示应用的特定视图。要把这个功能添加到你的示例应用中，你需要更新 `app.module.ts` 文件以使用模块 `RouterModule`。你可以从 `@angular/router` 导入该模块。

1. From your code editor, open the `app.module.ts` file.

   在代码编辑器中，打开 `app.module.ts` 文件。

1. Add the following `import` statement.

   添加如下 `import` 语句。

  <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="router-import"></code-example>

## Define your routes

## 定义你的各个路由

In this section, you'll define two routes:

在本节中，你将定义两个路由：

* The route `/crisis-center` opens the `crisis-center` component.

  路由 `/crisis-center` 用来打开 `crisis-center` 组件。

* The route `/heroes-list` opens the `heroes-list` component.

  路由 `/heroes-list` 用来打开 `heroes-list` 组件。

A route definition is a JavaScript object. Each route typically has two propteries. The first property, `path`, is a string
that specifies the URL path for the route. The second property, `component`, is a string that specifies
what component your application should display for that path.

路由定义是一个 JavaScript 对象。每个路由通常都有两个属性。第一个属性 `path` 是一个字符串，它指定路由的 URL 路径。第二个属性 `component` 是组件类，它指定应用要为该路由显示哪个组件。

1. From your code editor, open the `app.module.ts` file.

   在代码编辑器中，打开 `app.module.ts` 文件。

1. Locate the `@NgModule()` section.

   找到 `@NgModule()` 部分。

1. Replace the `imports` array in that section with the following.

   用如下代码替换这部分的 `imports` 数组。

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-basic"></code-example>

This code adds the `RouterModule` to the `imports` array. Next, the code uses the `forRoot()` method of the `RouterModule` to
define your two routes. This method takes an array of JavaScript objects, with each object defining the proprties of a route.
The `forRoot()` method ensures that your application only instantiates one `RouterModule`. For more information, see
[Singleton Services](/guide/singleton-services#forroot-and-the-router).

这段代码把 `RouterModule` 添加到了 `imports` 数组中。接下来，该代码使用 `RouterModule` 的 `forRoot()` 方法来定义你的两个路由。该方法接受一个 JavaScript 对象数组，每个对象定义一个路由的属性。`forRoot()` 方法确保你的应用只会实例化一个 `RouterModule`。有关更多信息，请参阅[单例服务](/guide/singleton-services#forroot-and-the-router)。

## Update your component with `router-outlet`

## 更新你的组件以添加 `router-outlet`

At this point, you have defined two routes for your application. However, your application
still has both the `crisis-list` and `heroes-list` components hard-coded in your `app.component.html` template. For your routes to
work, you need to update your template to dynamically load a component based on the URL path.

此刻，你已经为应用定义了两个路由。但是，你的应用仍然在你的 `app.component.html` 模板中硬编码着 `crisis-list` 和 `heroes-list` 组件。为了让你的路由正常工作，需要更新模板，以便根据 URL 路径动态加载一个组件。

To implement this functionality, you add the `router-outlet` directive to your template file.

要实现这个功能，你就可以把 `router-outlet` 指令添加到模板文件中。

1. From your code editor, open the `app.component.html` file.

   在代码编辑器中，打开 `app.component.html` 文件。

1. Delete the following lines.

   删除下面这几行。

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="components"></code-example>

1. Add the `router-outlet` directive.

   添加 `router-outlet` 指令。

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="router-outlet"></code-example>

View your updated application in your browser. You should see only the application title. To
view the `crisis-list` component, add `crisis-list` to the end of the path in your browser's
address bar. For example:

在浏览器中查看更新后的应用。你应该只看到应用标题。要查看 `crisis-list` 组件，就要把 `crisis-list` 添加到浏览器地址栏的路径末尾。例如：

<code-example language="none">
http://localhost:4200/crisis-list
</code-example>

Notice that the `crisis-list` component displays. Angular is using the route you defined to dynamically load the
component. You can load the `heroes-list` component the same way:

注意，`crisis-list` 组件会显示出来。Angular 正在使用你定义的路由来动态加载组件。你可以用同样的方法加载 `heroes-list` 组件：

<code-example language="none">
http://localhost:4200/heroes-list
</code-example>

## Control navigation with UI elements

## 用 UI 元素控制导航

Currently, your application supports two routes. However, the only way to use those routes
is for the user to manually type the path in the browser's address bar. In this section, you'll
add two links that users can click to navigate between the `heroes-list` and `crisis-list`
components. You'll also add some CSS styles. While these styles are not required, they make
it easier to identify the link for the currently-displayed component. You'll add that functionality
in the next section.

目前，你的应用支持两种路由。但是目前使用这些路由的唯一方法是让用户在浏览器的地址栏中手动输入路径。在本节中，你要添加两个链接，用户可以单击它们在 `heroes-list` 和 `crisis-list` 组件之间导航。你还会添加一些 CSS 样式。虽然这些样式不是必需的，但它们可以让你更容易的识别出当前显示的组件的链接。你将在下一节中添加此功能。

1. Open the `app.component.html` file and add the following HTML below the title.

   打开 `app.component.html` 文件，在标题下方添加以下 HTML。

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="nav"></code-example>

   This HTML uses an Angular directive, `routerLink`. This directive connects the routes
   you defined to your template files.

   这个 HTML 使用了 Angular 指令 `routerLink`。该指令将你定义的路由连接到模板文件中。

1. Open the `app.component.css` file and add the following styles.

   打开 `app.component.css` 文件并添加如下样式。

   <code-example header="src/app/app.component.css" path="router-tutorial/src/app/app.component.css"></code-example>

If you view your application in the browser, you should see these two links. When you click
on a link, the corresponding component appears.

如果你在浏览器中查看应用，你会看到这两个链接。单击某个链接时，会出现相应的组件。

## Identify the active route

## 标出活动路由

While users can navigate your application using the links you added in the previous section,
they don't have an easy way to identify what the active route is. You can add this functionality
using Angular's `routerLinkActive` directive.

虽然用户可以使用上一节中添加的链接来浏览你的应用，但他们并没有简单的方法来确定活动路由是什么。可以使用 Angular 的 `routerLinkActive` 指令添加这个功能。

1. From your code editor, open the `app.component.html` file.

   在代码编辑器中，打开 `app.component.html` 文件。

1. Update the anchor tags to include the `routerLinkActive` directive.

   更新 a 标签以包含 `routerLinkActive` 指令。

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="routeractivelink"></code-example>

View your application again. As you click one of the buttons, the style for that button updates
automatically, identifying the active component to the user. By adding the `routerLinkActive`
directive, you inform your application to apply a specific CSS class to the active route. In this
tutorial, that CSS class is `activebutton`, but you could use any class that you want.

再次查看你的申请表。单击其中一个按钮时，该按钮的样式会自动更新，并为该用户标出该活动组件。通过添加 `routerLinkActive` 指令，可以通知你的应用把一个特定的 CSS 类应用到当前的活动路由中。在本教程中，这个 CSS 类是 `activebutton`，但你可以使用任何想要的类。

## Adding a redirect

## 添加一个重定向

In this step of the tutorial, you add a route that redirects the user to display the `/heroes-list` component.

在本教程的这一步中，你将添加一个重定向路由来把用户导向 `/heroes-list` 组件。

1. From your code editor, open the `app.module.ts` file.

   在代码编辑器中，打开 `app.module.ts` 文件。

1. In the `imports` array, update the `RouterModule` section as follows.

   在 `imports` 数组中，按如下所示更新 `RouterModule` 部分。

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-redirect"></code-example>

   Notice that this new route uses an empty string as its path. In addition, it replaces the `component` property with two new ones:

   注意这个新路由使用一个空字符串作为它的路径。另外，它还把 `component` 属性替换成了这两个新属性：

   * `redirectTo`. This property instructs Angular to redirect from an empty path to the
     `heroes-list` path.

     `redirectTo`。这个属性指示 Angular 从空路径重定向到 `heroes-list` 路径。

   * `pathMatch`. This property instructs Angular on how much of the URL to match. For this
      tutorial, you should set this property to `full`. This strategy is recommended when
      you have an empty string for a path. For more information about this property,
      see the [Route API documentation](/api/router/Route).

     `pathMatch`。这个属性指示 Angular 要如何匹配 URL。对于本教程，你应该把这个属性设置为 `full`。当路径为空字符串时，建议使用此策略。有关此属性的更多信息，请参阅 [Route API 文档](/api/router/Route)。

Now when you open your application, it displays the `heroes-list` component by default.

现在，当你打开应用时，它会默认显示 `heroes-list` 组件。

## Adding a 404 page

## 添加 404 页面

It is possible for a user to try to access a route that you have not defined. To account for
this behavior, a best practice is to display a 404 page. In this section, you'll create a 404 page and
update your route configuration to show that page for any unspecified routes.

用户可以尝试访问你尚未定义的路由。为了解决这个问题，最佳做法是显示一个 404 页面。在本节中，你将创建一个 404 页面，并更新路由配置，以便为任何未指定的路由显示该页面。

1. From the terminal, create a new component, `PageNotFound`.

   在终端上，创建一个新的组件 `PageNotFound`。

   <code-example language="sh">
   ng generate component page-not-found
   </code-example>

1. From your code editor, open the `page-not-found.component.html` file and replace its contents
   with the following HTML.

   在代码编辑器中，打开 `page-not-found.component.html` 文件并用下面的 HTML 替换它的内容。

   <code-example header="src/app/page-not-found/page-not-found.component.html" path="router-tutorial/src/app/page-not-found/page-not-found.component.html"></code-example>

1. Open the `app.module.ts` file. In the `imports` array, update the `RouterModule` section as follows.

   打开 `app.module.ts` 文件。在其 `imports` 数组中，按如下所示更新 `RouterModule` 部分的内容。

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-wildcard"></code-example>

   The new route uses a path, `**`. This path is how Angular identifies a wildcard route. Any route
   that does not match an existing route in your configuration will use this route.

   新路由使用路径 `**`。这个路径是 Angular 表示通配符路由的方式。任何与你配置中的路由都不匹配的路由都会使用这个路由。

   <div class="alert is-important">

    Notice that the wildcard route is placed at the end of the array. The order of your
    routes is important, as Angular applies routes in order and uses the first match it finds.

    请注意，通配符路由要放在数组的末尾。路由的顺序很重要，因为 Angular 会按顺序应用路由并使用所找到的第一个匹配项。

   </div>

Try navigating to a non-existing route on your application, such as `http://localhost:4200/powers`.
This route doesn't match anything defined in your `app.module.ts` file. However, because you
defined a wildcard route, the application automatically displays your `PageNotFound` component.

尝试导航到应用中不存在的路由，比如 `http://localhost:4200/powers`。此路由与 `app.module.ts` 文件中定义的所有内容都不匹配。但是，由于你定义了一个通配符路由，该应用会自动显示你的 `PageNotFound` 组件。

## Next steps

## 下一步

At this point, you have a basic application that uses Angular's routing feature to change
what components the user can see based on the URL address. You have extended these features
to include a redirect, as well as a wildcard route to display a custom 404 page.

你已经有了一个基本的应用程序，它使用 Angular 的路由功能来根据 URL 地址改变用户可以看到的组件。你还扩展了这些特性，以包含一个重定向，以及一个用来显示自定义 404 页面的通配符路由。

For more information about routing, see the following topics:

有关路由的更多信息，请参阅以下主题：

* [In-app Routing and Navigation](/guide/router)

  [应用内路由和导航](/guide/router)

* [Router API](/api/router)

  [路由器 API](/api/router)

