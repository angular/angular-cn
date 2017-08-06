@title
教程：英雄指南

@intro

@description

The grand plan for this tutorial is to build an app that helps a staffing agency manage its stable of heroes.

本教程的终极计划是构建一个程序，来帮助招聘公司管理一群英雄。
  即使英雄们也需要找工作。

The Tour of Heroes app covers the core fundamentals of Angular. You'll build a basic app that
has many of the features you'd expect to find in a full-blown, data-driven app: acquiring and displaying
a list of heroes, editing a selected hero's detail, and navigating among different
views of heroic data.

这篇《英雄指南》涵盖`了 Angular 的核心原理。这次构建的应用会涉及很多特性：获得并显示英雄列表，编辑所选英雄的详情，并在英雄数据的多个视图之间建立导航。这些特性，在成熟的、数据驱动的应用中经常见到。

You'll use built-in directives to show and hide elements and display lists of hero data.
You'll create components to display hero details and show an array of heroes.
You'll use one-way data binding for read-only data. You'll add editable fields to update a model
with two-way data binding. You'll bind component methods to user events, like keystrokes and clicks.
You'll enable users to select a hero from a master list and edit that hero in the details view. You'll
format data with pipes. You'll create a shared service to assemble the heroes.
And you'll use routing to navigate among different views and their components.
<!-- CF: Should this be a bullet list? -->

我们将使用内置指令来显示 / 隐藏元素，并且显示英雄数据的列表。
  我们将创建组件来显示英雄的详情和英雄列表。
  我们将对只读数据使用单向数据绑定。我们将添加一些可编辑字段，并通过双向数据绑定更新模型。
  我们将把组件上的方法绑定到用户事件上，比如按键和点击。
  我们将让用户能从主列表视图中选择一个英雄，然后在详情视图中编辑它。
  我们将通过管道对数据进行格式化。
  我们将创建一个共享服务来管理我们的英雄们。
  我们将使用路由在不同的视图及其组件之间进行导航。

You'll learn enough core Angular to get started and gain confidence that
Angular can do whatever you need it to do.
You'll cover a lot of ground at an introductory level, and you'll find many links
to pages with greater depth.

完成本教程后，我们将学习足够的 Angular 核心技术，并确信 Angular 确实能做到我们需要它做的。
  我们将涵盖大量入门级知识，同时我们也会看到大量链接，指向更深入的章节。

When you're done with this tutorial, the app will look like this <live-example name="toh-pt6"></live-example>.


当完成这个教程时，应用运行起来是这样的：<live-example name="toh-pt6"></live-example>。



## What you'll build

## 游戏的终点

Here's a visual idea of where this tutorial leads, beginning with the "Dashboard"
view and the most heroic heroes:

下面是本教程关于界面的构想：开始是“Dashboard（仪表盘）”视图，来展示我们最勇敢的英雄。


<figure>
  <img src='generated/images/guide/toh/heroes-dashboard-1.png' alt="英雄仪表盘的输出">
</figure>



You can click the two links above the dashboard ("Dashboard" and "Heroes")
to navigate between this Dashboard view and a Heroes view.

仪表盘顶部中有两个链接：“Dashboard（仪表盘）”和“Heroes（英雄列表）”。
  我们将点击它们在“仪表盘”和“英雄列表”视图之间导航。

If you click the dashboard hero "Magneta," the router opens a "Hero Details" view
where you can change the hero's name.

当我们点击仪表盘上名叫“Magneta”的英雄时，路由将把我们带到这个英雄的详情页，在这里，我们可以修改英雄的名字。


<figure>
  <img src='generated/images/guide/toh/hero-details-1.png' alt="英雄详情的输出">
</figure>



Clicking the "Back" button returns you to the Dashboard.
Links at the top take you to either of the main views.
If you click "Heroes," the app displays the "Heroes" master list view.

点击“Back（后退）”按钮将返回到“Dashboard（仪表盘）”。
顶部的链接可以把我们带到任何一个主视图。
如果我们点击“Heroes（英雄列表）”链接，应用将把我们带到“英雄”主列表视图。


<figure>
  <img src='generated/images/guide/toh/heroes-list-2.png' alt="英雄列表的输出">
</figure>



When you click a different hero name, the read-only mini detail beneath the list reflects the new choice.

当我们点击另一位英雄时，一个只读的“微型详情视图”会显示在列表下方，以体现我们的选择。

You can click the "View Details" button to drill into the
editable details of the selected hero.

我们可以点击“View Details（查看详情）”按钮进入所选英雄的编辑视图。

The following diagram captures all of the navigation options.

下面这张图汇总了我们所有可能的导航路径。


<figure>
  <img src='generated/images/guide/toh/nav-diagram.png' alt="查看导航">
</figure>



Here's the app in action:

下图演示了我们应用中的所有操作。


<figure>
  <img src='generated/images/guide/toh/toh-anim.gif' alt="英雄指南的所有动作">
</figure>




## Up next

## 接下来

You'll build the Tour of Heroes app, step by step.
Each step is motivated with a requirement that you've likely
met in many applications. Everything has a reason.

让我们一起一步步构建出《英雄指南》。
  正如我们在无数应用遇到那样，每一步都由一个需求驱动。毕竟做任何事都要有个理由。

Along the way, you'll become familiar with many of the core fundamentals of Angular.

这一路上，我们将遇到很多 Angular 核心原理。

Start now by building a simple [hero editor](tutorial/toh-pt1 "The Hero Editor").

现在就开始构建一个简单的[英雄编辑器](tutorial/toh-pt1 "英雄编辑器")吧！
