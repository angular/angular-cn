# Feature modules

# 特性模块

Feature modules are NgModules for the purpose of organizing code.

特性模块是用来对代码进行组织的模块。

For the final sample app with a feature module that this page describes,
see the <live-example></live-example>.

要想查看本页提到的这个带有特性模块的范例应用，参见 <live-example></live-example>。

<hr>

As your app grows, you can organize code relevant for a specific feature.
This helps apply clear boundaries for features. With feature modules,
you can keep code related to a specific functionality or feature
separate from other code. Delineating areas of your
app helps with collaboration between developers and teams, separating
directives, and managing the size of the root module.

随着应用的增长，你可能需要组织与特定应用有关的代码。
这将帮你把特性划出清晰的边界。使用特性模块，你可以把与特定的功能或特性有关的代码从其它代码中分离出来。
为应用勾勒出清晰的边界，有助于开发人员之间、小组之间的协作，有助于分离各个指令，并帮助管理根模块的大小。

## Feature modules vs. root modules

## 特性模块 vs. 根模块

A feature module is an organizational best practice, as opposed to a concept of the core Angular API. A feature module delivers a cohesive set of functionality focused on a
specific application need such as a user workflow, routing, or forms.
While you can do everything within the root module, feature modules
help you partition the app into focused areas. A feature module
collaborates with the root module and with other modules through
the services it provides and the components, directives, and
pipes that it shares.

与核心的 Angular API 的概念相反，特性模块是最佳的组织方式。特性模块提供了聚焦于特定应用需求的一组功能，比如用户工作流、路由或表单。
虽然你也可以用根模块做完所有事情，不过特性模块可以帮助你把应用划分成一些聚焦的功能区。特性模块通过它提供的服务以及共享出的组件、指令和管道来与根模块和其它模块合作。

## How to make a feature module

## 如何制作特性模块

Assuming you already have an app that you created with the [Angular CLI](cli), create a feature
module using the CLI by entering the following command in the
root project directory. Replace `CustomerDashboard` with the
name of your module. You can omit the "Module" suffix from the name because the CLI appends it:

如果你已经有了 [Angular CLI](cli) 生成的应用，可以在项目的根目录下输入下面的命令来创建特性模块。把这里的 `CustomerDashboard` 替换成你的模块名。你可以从名字中省略掉“Module”后缀，因为 CLI 会自动追加上它：

```sh

ng generate module CustomerDashboard

```

This causes the CLI to create a folder called `customer-dashboard` with a file inside called `customer-dashboard.module.ts` with the following contents:

这会让 CLI 创建一个名叫 `customer-dashboard` 的文件夹，其中有一个名叫 `customer-dashboard.module.ts`，内容如下：

```typescript

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CustomerDashboardModule { }

```

The structure of an NgModule is the same whether it is a root module or a feature module. In the CLI generated feature module, there are two JavaScript import statements at the top of the file: the first imports `NgModule`, which, like the root module, lets you use the `@NgModule` decorator; the second imports `CommonModule`, which contributes many common directives such as `ngIf` and `ngFor`. Feature modules import `CommonModule` instead of `BrowserModule`, which is only imported once in the root module. `CommonModule` only contains information for common directives such as `ngIf` and `ngFor` which are needed in most templates, whereas `BrowserModule` configures the Angular app for the browser which needs to be done only once.

无论根模块还是特性模块，其 NgModule 结构都是一样的。在 CLI 生成的特性模块中，在文件顶部有两个 JavaScript 的导入语句：第一个导入了 `NgModule`，它像根模块中一样让你能使用 `@NgModule` 装饰器；第二个导入了 `CommonModule`，它提供了很多像 `ngIf` 和 `ngFor` 这样的常用指令。
特性模块导入 `CommonModule`，而不是 `BrowserModule`，后者只应该在根模块中导入一次。
`CommonModule` 只包含常用指令的信息，比如 `ngIf` 和 `ngFor`，它们在大多数模板中都要用到，而 `BrowserModule` 为浏览器所做的应用配置只会使用一次。

The `declarations` array is available for you to add declarables, which
are components, directives, and pipes that belong exclusively to this particular module. To add a component, enter the following command at the command line where `customer-dashboard` is the directory where the CLI generated the feature module and `CustomerDashboard` is the name of the component:

`declarations` 数组让你能添加专属于这个模块的可声明对象（组件、指令和管道）。
要添加组件，就在命令行中输入如下命令，这里的 `customer-dashboard` 是一个目录，CLI 会把特性模块生成在这里，而 `CustomerDashboard` 就是该组件的名字：

```sh

ng generate component customer-dashboard/CustomerDashboard

```

This generates a folder for the new component within the customer-dashboard folder and updates the feature module with the `CustomerDashboardComponent` info:

这会在 `customer-dashboard` 中为新组件生成一个目录，并使用 `CustomerDashboardComponent` 的信息修改这个特性模块：

<code-example path="feature-modules/src/app/customer-dashboard/customer-dashboard.module.ts" region="customer-dashboard-component" header="src/app/customer-dashboard/customer-dashboard.module.ts"></code-example>

The `CustomerDashboardComponent` is now in the JavaScript import list at the top and added to the `declarations` array, which lets Angular know to associate this new component with this feature module.

`CustomerDashboardComponent` 出现在了顶部的 JavaScript 导入列表里，并且被添加到了 `declarations` 数组中，它会让 Angular 把新组件和这个特性模块联系起来。

## Importing a feature module

## 导入特性模块

To incorporate the feature module into your app, you have to let the root module, `app.module.ts`, know about it. Notice the `CustomerDashboardModule` export at the bottom of `customer-dashboard.module.ts`. This exposes it so that other modules can get to it. To import it into the `AppModule`, add it to the imports in `app.module.ts` and to the `imports` array:

要想把这个特性模块包含进应用中，你还得让根模块 `app.module.ts` 知道它。注意，在 `customer-dashboard.module.ts` 文件底部 `CustomerDashboardModule` 的导出部分。这样就把它暴露出来，以便其它模块可以拿到它。要想把它导入到 `AppModule` 中，就把它加入 `app.module.ts` 的导入表中，并将其加入 `imports` 数组：

<code-example path="feature-modules/src/app/app.module.ts" region="app-module" header="src/app/app.module.ts"></code-example>

Now the `AppModule` knows about the feature module. If you were to add any service providers to the feature module, `AppModule` would know about those too, as would any other feature modules. However, NgModules don’t expose their components.

现在 `AppModule` 知道这个特性模块了。如果你往该特性模块中加入过任何服务提供者，`AppModule` 也同样会知道它，其它模块中也一样。不过，NgModule 并不会暴露出它们的组件。

## Rendering a feature module’s component template

## 渲染特性模块的组件模板

When the CLI generated the `CustomerDashboardComponent` for the feature module, it included a template, `customer-dashboard.component.html`, with the following markup:

当 CLI 为这个特性模块生成 `CustomerDashboardComponent` 时，还包含一个模板 `customer-dashboard.component.html`，它带有如下页面脚本：

<code-example path="feature-modules/src/app/customer-dashboard/customer-dashboard/customer-dashboard.component.html" region="feature-template" header="src/app/customer-dashboard/customer-dashboard/customer-dashboard.component.html"></code-example>

To see this HTML in the `AppComponent`, you first have to export the `CustomerDashboardComponent` in the `CustomerDashboardModule`. In `customer-dashboard.module.ts`, just beneath the `declarations` array, add an `exports` array containing `CustomerDashboardComponent`:

要想在 `AppComponent` 中查看这些 HTML，你首先要在 `CustomerDashboardModule` 中导出 `CustomerDashboardComponent`。
在 `customer-dashboard.module.ts` 中，`declarations` 数组的紧下方，加入一个包含 `CustomerDashboardModule` 的 `exports` 数组：

<code-example path="feature-modules/src/app/customer-dashboard/customer-dashboard.module.ts" region="component-exports" header="src/app/customer-dashboard/customer-dashboard.module.ts"></code-example>

Next, in the `AppComponent`, `app.component.html`, add the tag `<app-customer-dashboard>`:

然后，在 `AppComponent` 的 `app.component.html` 中，加入标签 `<app-customer-dashboard>`：

<code-example path="feature-modules/src/app/app.component.html" region="app-component-template" header="src/app/app.component.html"></code-example>

Now, in addition to the title that renders by default, the `CustomerDashboardComponent` template renders too:

现在，除了默认渲染出的标题外，还渲染出了 `CustomerDashboardComponent` 的模板：

<div class="lightbox">
  <img src="generated/images/guide/feature-modules/feature-module.png" alt="feature module component">
</div>

<hr />

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Lazy Loading Modules with the Angular Router](guide/lazy-loading-ngmodules).

   [使用 Angular 路由器惰性加载模块](guide/lazy-loading-ngmodules)。

* [Providers](guide/providers).

   [服务提供者](guide/providers)。

* [Types of Feature Modules](guide/module-types).

   [特性模块的分类](guide/module-types)。
