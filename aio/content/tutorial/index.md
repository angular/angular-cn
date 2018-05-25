<h1 class="no-toc">Tutorial: Tour of Heroes</h1>

<h1 class="no-toc">教程：英雄指南</h1>

The _Tour of Heroes_ tutorial covers the fundamentals of Angular.  
In this tutorial you will build an app that helps a staffing agency manage its stable of heroes.

**英雄指南**教程涵盖了 Angular 的基本知识。在本教程中，你将构建一个应用，来帮助招聘机构管理一群英雄。

This basic app has many of the features you'd expect to find in a data-driven application.
It acquires and displays a list of heroes, edits a selected hero's detail, and navigates among different views of heroic data.

这个入门级 app 包含很多数据驱动的应用所需的特性。
它需要获取并显示英雄的列表、编辑所选英雄的详情，并且在英雄数据的不同视图之间导航。

By the end of the tutorial you will be able to do the following:

在本教程的最后，你将完成下列工作：

* Use built-in Angular directives to show and hide elements and display lists of hero data.

   使用内置指令来显示 / 隐藏元素，并显示英雄数据的列表。

* Create Angular components to display hero details and show an array of heroes.

   创建 Angular 组件以显示英雄的详情，并显示一个英雄数组。

* Use one-way data binding for read-only data.

   为只读数据使用单项数据绑定。

* Add editable fields to update a model with two-way data binding.

   添加可编辑字段，使用双向数据绑定来更新模型。

* Bind component methods to user events, like keystrokes and clicks.

   把组件中的方法绑定到用户事件上，比如按键和点击。

* Enable users to select a hero from a master list and edit that hero in the details view. 

   让用户可以在主列表中选择一个英雄，然后在详情视图中编辑他。

* Format data with pipes.

   使用管道来格式化数据。

* Create a shared service to assemble the heroes.

   创建共享的服务来管理这些英雄。

* Use routing to navigate among different views and their components.

   使用路由在不同的视图及其组件之间导航。

You'll learn enough Angular to get started and gain confidence that
Angular can do whatever you need it to do. 

你将学到足够的 Angular 知识，并确信 Angular 确实能提供你所需的支持。

After completing all tutorial steps, the final app will look like this <live-example name="toh-pt6"></live-example>.

完成本教程的所有步骤之后，最终的应用会是这样的：<live-example name="toh-pt6"></live-example>。

## What you'll build

## 你要构建出什么

Here's a visual idea of where this tutorial leads, beginning with the "Dashboard"
view and the most heroic heroes:

下面是本教程关于界面的构想：开始是“Dashboard（仪表盘）”视图，来展示最勇敢的英雄。

<figure>
  <img src='generated/images/guide/toh/heroes-dashboard-1.png' alt="Output of heroes dashboard">
</figure>

You can click the two links above the dashboard ("Dashboard" and "Heroes")
to navigate between this Dashboard view and a Heroes view.

仪表盘顶部中有两个链接：“Dashboard（仪表盘）”和“Heroes（英雄列表）”。
  你将点击它们在“仪表盘”和“英雄列表”视图之间导航。

If you click the dashboard hero "Magneta," the router opens a "Hero Details" view
where you can change the hero's name.

当你点击仪表盘上名叫“Magneta”的英雄时，路由会打开英雄详情页，在这里，你可以修改英雄的名字。

<figure>
  <img src='generated/images/guide/toh/hero-details-1.png' alt="Details of hero in app">
</figure>

Clicking the "Back" button returns you to the Dashboard.
Links at the top take you to either of the main views.
If you click "Heroes," the app displays the "Heroes" master list view.

点击“Back（后退）”按钮将返回到“Dashboard（仪表盘）”。
顶部的链接可以把你带到任何一个主视图。
如果你点击“Heroes（英雄列表）”链接，应用将把你带到“英雄”主列表视图。

<figure>
  <img src='generated/images/guide/toh/heroes-list-2.png' alt="Output of heroes list app">
</figure>

When you click a different hero name, the read-only mini detail beneath the list reflects the new choice.

当你点击另一位英雄时，一个只读的“微型详情视图”会显示在列表下方，以体现你的选择。

You can click the "View Details" button to drill into the
editable details of the selected hero.

你可以点击“View Details（查看详情）”按钮进入所选英雄的编辑视图。

The following diagram captures all of the navigation options.

下面这张图汇总了所有可能的导航路径。

<figure>
  <img src='generated/images/guide/toh/nav-diagram.png' alt="View navigations">
</figure>

Here's the app in action:

下图演示了本应用中的动图。

<figure>
  <img src='generated/images/guide/toh/toh-anim.gif' alt="Tour of Heroes in Action">
</figure>
