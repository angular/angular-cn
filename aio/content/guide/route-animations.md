# Route transition animations

# 路由转场动画

#### Prerequisites

#### 前提条件

A basic understanding of the following concepts:

对下列概念有基本的理解：

* [Introduction to Angular animations](guide/animations)

  [Angular 动画简介](guide/animations)

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

* [Reusable animations](guide/reusable-animations)

  [可复用的动画](guide/reusable-animations)

<hr>

Routing enables users to navigate between different routes in an application. When a user navigates from one route to another, the Angular router maps the URL path to a relevant component and displays its view. Animating this route transition can greatly enhance the user experience.

路由能让用户在应用中的不同路由之间导航。当用户从一个路由导航到另一个路由时，Angular 路由器会把这个 URL 映射到一个相关的组件，并显示其视图。为这种路由转换添加动画，将极大地提升用户体验。

The Angular router comes with high-level animation functions that let you animate the transitions between views when a route changes. To produce an animation sequence when switching between routes, you need to define nested animation sequences. Start with the top-level component that hosts the view, and nest additional animations in the components that host the embedded views.

Angular 路由器天生带有高级动画功能，它可以让你为在路由变化时为视图之间设置转场动画。要想在路由切换时生成动画序列，你需要首先定义出嵌套的动画序列。从宿主视图的顶层组件开始，在这些内嵌视图的宿主组件中嵌套添加其它动画。

To enable routing transition animation, do the following:

要启用路由转场动画，需要做如下步骤：

1. Import the routing module into the application and create a routing configuration that defines the possible routes.

   为应用导入路由模块，并创建一个路由配置来定义可能的路由。

2. Add a router outlet to tell the Angular router where to place the activated components in the DOM.

   添加路由器出口，来告诉 Angular 路由器要把激活的组件放在 DOM 中的什么位置。

3. Define the animation.

   定义动画。

Let's illustrate a router transition animation by navigating between two routes, *Home* and *About* associated with the `HomeComponent` and `AboutComponent` views respectively. Both of these component views are children of the top-most view, hosted by `AppComponent`. We'll implement a router transition animation that slides in the new view to the right and slides out the old view when the user navigates between the two routes.

让我们以两个路由之间的导航过程来解释一下路由转场动画，*Home* 和 *About* 分别与 `HomeComponent` 和 `AboutComponent` 的视图相关联。所有这些组件视图都是顶层视图的子节点，其宿主是 `AppComponent`。我们将实现路由器过渡动画，该动画会在出现新视图时向右滑动，并当用户在两个路由之间导航时把旧视图滑出。

</br>

<div class="lightbox">
  <img src="generated/images/guide/animations/route-animation.gif" alt="Animations in action" width="440">
</div>

## Route configuration

## 路由配置

To begin, configure a set of routes using methods available in the `RouterModule` class. This route configuration tells the router how to navigate.

首先，使用 `RouterModule` 类提供的方法来配置一组路由。该路由配置会告诉路由器该如何导航。

Use the `RouterModule.forRoot` method to define a set of routes. Also, import this `RouterModule` to the `imports` array of the main module, `AppModule`.

使用 `RouterModule.forRoot` 方法来定义一组路由。同时，把其返回值导入到主模块 `AppModule` 的 `imports` 数组中。

<div class="alert is-helpful">

**Note:** Use the `RouterModule.forRoot` method in the root module, `AppModule`, to register top-level application routes and providers. For feature modules, call the `RouterModule.forChild` method to register additional routes.

**注意：**在根模块 `AppModule` 中使用 `RouterModule.forRoot` 方法来注册一些顶层应用路由和提供者。对于特性模块，调用 `RouterModule.forChild` 方法来注册其它路由。

</div>

The following configuration defines the possible routes for the application.

下列配置定义了应用程序中可能的路由。

<code-example path="animations/src/app/app.module.ts" header="src/app/app.module.ts" region="route-animation-data" language="typescript"></code-example>

The `home` and `about` paths are associated with the `HomeComponent` and `AboutComponent` views. The route configuration tells the Angular router to instantiate the `HomeComponent` and `AboutComponent` views when the navigation matches the corresponding path.

`home` 和 `about` 路径分别关联着 `HomeComponent` 和 `AboutComponent` 视图。该路由配置告诉 Angular 路由器当导航匹配了相应的路径时，就实例化 `HomeComponent` 和 `AboutComponent` 视图。

In addition to `path` and `component`, the `data` property of each route defines the key animation-specific configuration associated with a route. The `data` property value is passed into `AppComponent` when the route changes. You can also pass additional data in route config that is consumed within the animation. The data property value has to match the transitions defined in the `routeAnimation` trigger, which we'll define later.

除了 `path`、`component` 之外，每个路由定义中的 `data` 属性也定义了与此路由有关的动画配置。当路由变化时，`data` 属性的值就会传给 `AppComponent`。你还可以在路由配置中传递其它的值供路由的动画使用。`data` 属性的值必须满足 `routeAnimation` 中定义的转场动画的要求，稍后我们就会定义它。

<div class="alert is-helpful">

**Note:** The `data` property names that you use can be arbitrary. For example, the name *animation* used in the example above is an arbitrary choice.

**注意：**这个 `data` 中的属性名可以是任意的。例如，上面例子中使用的名字 *animation* 就是随便起的。

</div>

## Router outlet

## 路由出口

After configuring the routes, tell the Angular router where to render the views when matched with a route. You can set a router outlet by inserting a `<router-outlet>` container inside the root `AppComponent` template.

配置好路由之后，还要告诉 Angular 路由器当路由匹配时，要把视图渲染到那里。你可以通过在根组件 `AppComponent` 的模板中插入一个 `<router-outlet>` 容器来指定路由出口的位置。

The `<router-outlet>` container has an attribute directive that contains data about active routes and their states, based on the `data` property that we set in the route configuration.

`<router-outlet>` 容器具有一个属性型指令，它包含关于活动路由及其状态的数据，这些数据会基于我们在路由配置中设置的 `data` 属性。

<code-example path="animations/src/app/app.component.html" header="src/app/app.component.html" region="route-animations-outlet"></code-example>

`AppComponent` defines a method that can detect when a view changes. The method assigns an animation state value to the animation trigger (`@routeAnimation`) based on the route configuration `data` property value. Here's an example of an `AppComponent` method that detects when a route change happens.

`AppComponent` 中定义了一个可以检测视图何时发生变化的方法，该方法会基于路由配置的 `data` 属性值，将动画状态值赋值给动画触发器（`@routeAnimation`）。下面就是一个 `AppComponent` 中的范例方法，用于检测路由在何时发生了变化。

<code-example path="animations/src/app/app.component.ts" header="src/app/app.component.ts" region="prepare-router-outlet" language="typescript"></code-example>

Here, the `prepareRoute()` method takes the value of the outlet directive (established through `#outlet="outlet"`) and returns a string value representing the state of the animation based on the custom data of the current active route. You can use this data to control which transition to execute for each route.

这里的 `prepareRoute()` 方法会获取这个 outlet 指令的值（通过 `#outlet="outlet"`），并根据当前活动路由的自定义数据返回一个表示动画状态的字符串值。你可以使用这个数据来控制各个路由之间该执行哪个转场。

## Animation definition

## 动画定义

Animations can be defined directly inside your components. For this example we are defining the animations in a separate file, which allows us to re-use the animations.

动画可以直接在组件中定义。对于此范例，我们会在独立的文件中定义动画，这让我们可以复用这些动画。

The following code snippet defines a reusable animation named `slideInAnimation`.

下面的代码片段定义了一个名叫 `slideInAnimation` 的可复用动画。

<code-example path="animations/src/app/animations.ts" header="src/app/animations.ts" region="route-animations" language="typescript"></code-example>

The animation definition does several things:

该动画定义做了如下事情：

* Defines two transitions. A single trigger can define multiple states and transitions.

  定义两个转场。每个触发器都可以定义多个状态和多个转场。

* Adjusts the styles of the host and child views to control their relative positions during the transition.

  调整宿主视图和子视图的样式，以便在转场期间，控制它们的相对位置。

* Uses `query()` to determine which child view is entering and which is leaving the host view.

  使用 `query()` 来确定哪个子视图正在进入或离开宿主视图。

A route change activates the animation trigger, and a transition matching the state change is applied.

路由的变化会激活这个动画触发器，并应用一个与该状态变更相匹配的转场。

<div class="alert is-helpful">

**Note:** The transition states must match the `data` property value defined in the route configuration.

**注意：**这些转场状态必须和路由配置中定义的 `data` 属性的值相一致。

</div>

Make the animation definition available in your application by adding the reusable animation (`slideInAnimation`) to the `animations` metadata of the `AppComponent`.

通过将可复用动画 `slideInAnimation` 添加到 `AppComponent` 的 `animations` 元数据中，可以让此动画定义能用在你的应用中。

<code-example path="animations/src/app/app.component.ts" header="src/app/app.component.ts" region="define" language="typescript"></code-example>

### Styling the host and child components

### 为宿主组件和子组件添加样式

During a transition, a new view is inserted directly after the old one and both elements appear on screen at the same time. To prevent this, apply additional styling to the host view, and to the removed and inserted child views. The host view must use relative positioning, and the child views must use absolute positioning. Adding styling to the views animates the containers in place, without the DOM moving things around.

在转场期间，新视图将直接插入在旧视图后面，并且这两个元素会同时出现在屏幕上。要防止这种情况，就要为宿主视图以及要删除和插入的子视图指定一些额外的样式。宿主视图必须使用相对定位模式，而子视图则必须使用绝对定位模式。在这些视图中添加样式，就可以让容器就地播放动画，而不会让 DOM 移动。

<code-example path="animations/src/app/animations.ts" header="src/app/animations.ts" region="style-view" language="typescript"></code-example>

### Querying the view containers

### 查询视图的容器

Use the `query()` method to find and animate elements within the current host component. The `query(":enter")` statement returns the view that is being inserted, and `query(":leave")` returns the view that is being removed.

使用 `query()` 方法可以找出当前宿主组件中的动画元素。`query(":enter")` 语句会返回已插入的视图，`query(":leave")` 语句会返回已移除的视图。

Let's assume that we are routing from the *Home => About*.

我们假设正在从 *Home* 转场到 *About*，`Home => About`。

<code-example path="animations/src/app/animations.ts" header="src/app/animations.ts (Continuation from above)" region="query" language="typescript"></code-example>

The animation code does the following after styling the views:

在设置了视图的样式之后，动画代码会执行如下操作：

* `query(':enter style({ left: '-100%'})` matches the view that is added and hides the newly added view by positioning it to the far left.

  `query(':enter style({ left: '-100%'})` 会匹配添加的视图，并通过将其定位在最左侧来隐藏这个新视图。

* Calls `animateChild()` on the view that is leaving, to run its child animations.

  在正在离开的视图上调用 `animateChild()`，来运行其子动画。

* Uses `group()` function to make the inner animations run in parallel.

  使用 `group()` 函数来并行运行内部动画。

* Within the `group()` function:

  在 `group()` 函数中：

    * Queries the view that is removed and animates it to slide far to the right.

      查询已移除的视图，并让它从右侧滑出。

    * Slides in the new view by animating the view with an easing function and duration. <br />
    This animation results in the `about` view sliding from the left to right.

      使用缓动函数和持续时间定义的动画，让这个新视图滑入。<br />
      此动画将导致 `about` 视图从左向右滑动。

* Calls the `animateChild()` method on the new view to run its child animations after the main animation completes.

  当主动画完成之后，在这个新视图上调用 `animateChild()` 方法，以运行其子动画。

You now have a basic routable animation that animates routing from one view to another.

你现在有了一个基本的路由动画，可以在从一个视图路由到另一个视图时播放动画。

## More on Angular animations

## 关于 Angular 动画的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Introduction to Angular animations](guide/animations)

  [Angular 动画简介](guide/animations)

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

* [Complex animation sequences](guide/complex-animation-sequences)

  [复杂动画序列](guide/complex-animation-sequences)

* [Reusable animations](guide/reusable-animations)

  [可复用动画](guide/reusable-animations)
