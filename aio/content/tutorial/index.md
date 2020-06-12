<h1 class="no-toc">Tour of Heroes app and tutorial</h1>

<h1 class="no-toc">教程：英雄指南</h1>

<div class="callout is-helpful">

<header>Getting Started</header>

<header>快速上手 - Stackblitz</header>

In this tutorial, you build your own app from the ground up, providing experience with the typical development process, as well as an introduction to basic app-design concepts, tools, and terminology.

在本教程中，你将从头开始构建自己的应用，体验典型的开发过程。这里还有一些对基本的应用设计概念、工具和术语的介绍。

If you're completely new to Angular, you might want to try the [**Try it now**](start) quick-start app first.
It is based on a ready-made  partially-completed project, which you can examine and modify in the StacBlitz interactive development environment, where you can see the results in real time.

如果你对 Angular 还不熟悉，你可能要先[**试一试**](start) 快速上手应用。它基于一个现成的、已部分完成的项目，你可以在 StacBlitz 的交互式开发环境中检查和修改，你还可以在那里实时查看结果。

The "Try it" tutorial covers the same major topics&mdash;components, template syntax, routing, services, and accessing data via HTTP&mdash;in a condensed format, following the most current best practices.

“试一试”教程遵循最新的最佳实践，以简明的格式，涵盖了与其相同的主要话题 - 组件、模板语法、路由、服务，以及通过 HTTP 访问数据。

</div>

This _Tour of Heroes_ tutorial shows you how to set up your local development environment and develop an app using the [Angular CLI tool](cli "CLI command reference"), and provides an introduction to the fundamentals of Angular.

这个*“英雄指南”*教程向你展示了如何使用 [Angular CLI 工具](cli "CLI 命令参考：")搭建本地开发环境并开发应用，还对 [Angular CLI 工具](cli "CLI 命令参考：") 的基础知识进行了介绍。

The _Tour of Heroes_ app that you build helps a staffing agency manage its stable of heroes.
The app has many of the features you'd expect to find in any data-driven application.
The finished app acquires and displays a list of heroes, edits a selected hero's detail, and navigates among different views of heroic data.

你建立的*英雄指南*应用可以帮助人力资源管理局管理好自己的英雄。该应用具有许多在任何数据驱动的应用中都可能出现的功能。完成后的应用会获取并显示一些英雄列表、编辑所选英雄的详细信息，并在不同的英雄数据视图之间导航。

You will find references to and expansions of this app domain in many of the examples used throughout the Angular documentation, but you don't necessarily need to work through this tutorial to understand those examples.

你会在这份 Angular 文档中用到的很多个例子中找到对此应用领域的引用和扩展，但是你并不一定非要通过这个教程来理解这些例子。

By the end of this tutorial you will be able to do the following:

在本教程的最后，你将完成下列工作：

* Use built-in Angular [directives](guide/glossary#directive "Directives definition") to show and hide elements and display lists of hero data.

   使用 Angular 的内置[指令](guide/glossary#directive "Directives definition")来显示 / 隐藏元素，并显示英雄数据的列表。

* Create Angular [components](guide/glossary#component "Components definition") to display hero details and show an array of heroes.

   创建 Angular [组件](guide/glossary#component "Components definition")以显示英雄的详情，并显示一个英雄数组。

* Use one-way [data binding](guide/glossary#data-binding "Data binding definition") for read-only data.

   为只读数据使用单向[数据绑定](guide/glossary#data-binding "Data binding definition")。

* Add editable fields to update a model with two-way data binding.

   添加可编辑字段，使用双向数据绑定来更新模型。

* Bind component methods to user events, like keystrokes and clicks.

   把组件中的方法绑定到用户事件上，比如按键和点击。

* Enable users to select a hero from a master list and edit that hero in the details view. 

   让用户可以在主列表中选择一个英雄，然后在详情视图中编辑他。

* Format data with [pipes](guide/glossary#pipe "Pipe definition").

   使用[管道](guide/glossary#pipe "Pipe definition")来格式化数据。

* Create a shared [service](guide/glossary#service "Service definition") to assemble the heroes.

   创建共享的[服务](guide/glossary#service "Service definition")来管理这些英雄。

* Use [routing](guide/glossary#router "Router definition") to navigate among different views and their components.

   使用[路由](guide/glossary#router "Router definition")在不同的视图及其组件之间导航。

You'll learn enough Angular to get started and gain confidence that
Angular can do whatever you need it to do.

你将学到足够的 Angular 知识，并确信 Angular 确实能提供你所需的支持。

<div class="callout is-helpful">

<header>Solution</header>

<header>最终解</header>

After completing all tutorial steps, the final app will look like this: <live-example name="toh-pt6"></live-example>.

完成本教程的所有步骤之后，最终的应用会是这样的：<live-example name="toh-pt6"></live-example>。

</div>

## What you'll build

## 你要构建出什么

Here's a visual idea of where this tutorial leads, beginning with the "Dashboard"
view and the most heroic heroes:

下面是本教程关于界面的构想：开始是“Dashboard（仪表盘）”视图，来展示最勇敢的英雄。

<div class="lightbox">
  <img src='generated/images/guide/toh/heroes-dashboard-1.png' alt="Output of heroes dashboard">
</div>

You can click the two links above the dashboard ("Dashboard" and "Heroes")
to navigate between this Dashboard view and a Heroes view.

仪表盘顶部中有两个链接：“Dashboard（仪表盘）”和“Heroes（英雄列表）”。
  你将点击它们在“仪表盘”和“英雄列表”视图之间导航。

If you click the dashboard hero "Magneta," the router opens a "Hero Details" view
where you can change the hero's name.

当你点击仪表盘上名叫“Magneta”的英雄时，路由会打开英雄详情页，在这里，你可以修改英雄的名字。

<div class="lightbox">
  <img src='generated/images/guide/toh/hero-details-1.png' alt="Details of hero in app">
</div>

Clicking the "Back" button returns you to the Dashboard.
Links at the top take you to either of the main views.
If you click "Heroes," the app displays the "Heroes" master list view.

点击“Back（后退）”按钮将返回到“Dashboard（仪表盘）”。
顶部的链接可以把你带到任何一个主视图。
如果你点击“Heroes（英雄列表）”链接，应用将把你带到“英雄”列表主视图。

<div class="lightbox">
  <img src='generated/images/guide/toh/heroes-list-2.png' alt="Output of heroes list app">
</div>

When you click a different hero name, the read-only mini detail beneath the list reflects the new choice.

当你点击另一位英雄时，一个只读的“微型详情视图”会显示在列表下方，以体现你的选择。

You can click the "View Details" button to drill into the
editable details of the selected hero.

你可以点击“View Details（查看详情）”按钮进入所选英雄的编辑视图。

The following diagram captures all of the navigation options.

下面这张图汇总了所有可能的导航路径。

<div class="lightbox">
  <img src='generated/images/guide/toh/nav-diagram.png' alt="View navigations">
</div>

Here's the app in action:

下图演示了本应用中的动图。

<div class="lightbox">
  <img src='generated/images/guide/toh/toh-anim.gif' alt="Tour of Heroes in Action">
</div>
