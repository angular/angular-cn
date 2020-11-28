# Introduction to Angular animations

# Angular 动画简介

Animation provides the illusion of motion: HTML elements change styling over time. Well-designed animations can make your application more fun and easier to use, but they aren't just cosmetic. Animations can improve your app and user experience in a number of ways:

动画用于提供运动的幻觉：HTML 元素随着时间改变样式。精心设计的动画可以让你的应用更有趣，更易用，但它们不仅仅是装饰性的。动画可以通过几种方式改善你的应用和用户体验：

* Without animations, web page transitions can seem abrupt and jarring.

  没有动画，Web 页面的转场就会显得突兀、不协调。

* Motion greatly enhances the user experience, so animations give users a chance to detect the application's response to their actions.

  运动能极大地提升用户体验，因此动画可以让用户察觉到应用对他们的操作做出了响应。

* Good animations intuitively call the user's attention to where it is needed.

  良好的动画可以直观的把用户的注意力吸引到要留意的地方。

Typically, animations involve multiple style *transformations* over time. An HTML element can move, change color, grow or shrink, fade, or slide off the page. These changes can occur simultaneously or sequentially. You can control the timing of each transformation.

典型的动画会涉及多种随时间变化的转换。HTML 元素可以移动、变换颜色、增加或缩小、隐藏或从页面中滑出。
这些变化可以同时发生或顺序发生。你可以控制每次转换的持续时间。

Angular's animation system is built on CSS functionality, which means you can animate any property that the browser considers animatable. This includes positions, sizes, transforms, colors, borders, and more. The W3C maintains a list of animatable properties on its [CSS Transitions](https://www.w3.org/TR/css-transitions-1/) page.

Angular 的动画系统是基于 CSS 功能构建的，这意味着你可以 "动" 浏览器认为可动的任何属性。包括位置、大小、变形、颜色、边框等。W3C 在它的 [CSS Transitions（转场）](https://www.w3.org/TR/css-transitions-1/) 页中维护了一个可动属性的列表。

## About this guide

## 关于本指南

This guide covers the basic Angular animation features to get you started on adding Angular animations to your project.

本指南覆盖了基本的 Angular 动画特性，让你能开始为你的项目添加 Angular 动画。

The features described in this guide &mdash; and the more advanced features described in the related Angular animations guides &mdash; are demonstrated in an example app available as a <live-example></live-example>.

本指南中描述的特性，以及相关的 Angular 动画章节中描述的更多高级特性，都在一个范例 <live-example></live-example> 中进行了演示。

#### Prerequisites

#### 前提条件

The guide assumes that you're familiar with building basic Angular apps, as described in the following sections:

本指南假设你已经能熟练构建基本的 Angular 应用，也就是下列章节中所讲的那些：

* [Tutorial](tutorial)

  [教程](tutorial)

* [Architecture Overview](guide/architecture)

  [架构概览](guide/architecture)

## Getting started

## 快速上手

The main Angular modules for animations are `@angular/animations` and `@angular/platform-browser`. When you create a new project using the CLI, these dependencies are automatically added to your project.

Angular 主要的动画模块是 `@angular/animations` 和 `@angular/platform-browser`。当你使用 CLI 创建新项目时，这些依赖会自动添加到你的项目中。

To get started with adding Angular animations to your project, import the animation-specific modules along with standard Angular functionality.

为了把 Angular 动画添加到你的项目中，把这些与动画相关的模块和标准的 Angular 功能一起导入进来。

### Step 1: Enabling the animations module

### 步骤一：启用动画模块

Import `BrowserAnimationsModule`, which introduces the animation capabilities into your Angular root application module.

导入 `BrowserAnimationsModule`，它能把动画能力引入 Angular 应用的根模块中。

<code-example path="animations/src/app/app.module.1.ts" header="src/app/app.module.ts" language="typescript"></code-example>

<div class="alert is-helpful">

**Note:** When you use the CLI to create your app, the root application module `app.module.ts` is placed in the `src/app` folder.

**注意：**当你使用 CLI 创建应用时，应用的根模块 `app.module.ts` 位于 `src/app` 目录下。

</div>

### Step 2: Importing animation functions into component files

### 步骤二：把动画功能导入组件文件中

If you plan to use specific animation functions in component files, import those functions from `@angular/animations`.

如果你准备在组件文件中使用特定的动画函数，请从 `@angular/animations` 中导入这些函数。

<code-example path="animations/src/app/app.component.ts" header="src/app/app.component.ts" region="imports" language="typescript">
</code-example>

<div class="alert is-helpful">

**Note:** See a [summary of available animation functions](guide/animations#animation-api-summary) at the end of this guide.

**注意：**参阅本章末尾的[可用动画函数汇总表](guide/animations#animation-api-summary)。

</div>

### Step 3: Adding the animation metadata property

### 步骤三：添加动画的元数据属性

In the component file, add a metadata property called `animations:` within the `@Component()` decorator. You put the trigger that defines an animation within the `animations` metadata property.

在组件的 `@Component()` 装饰器中，添加一个名叫 `animations:` 的元数据属性。
你可以把用来定义动画的触发器放进 `animations` 元数据属性中。

<code-example path="animations/src/app/app.component.ts" header="src/app/app.component.ts" region="decorator" language="typescript">
</code-example>

## Animating a simple transition

## 简单转场动画

Let's animate a simple transition that changes a single HTML element from one state to another. For example, you can specify that a button displays either **Open** or **Closed** based on the user's last action. When the button is in the `open` state, it's visible and yellow. When it's the `closed` state, it's transparent and green.

我们来做一个简单的转场动作，它把单个 HTML 元素从一个状态变成另一个状态。
比如，你可以指定按钮根据用户的最后一个动作显示成**Open**或**Closed**状态。当按钮处于 `open` 状态时，它是可见的，并且是黄色的。当它处于 `closed` 状态时，它是透明的，并且是绿色的。

In HTML, these attributes are set using ordinary CSS styles such as color and opacity. In Angular, use the `style()` function to specify a set of CSS styles for use with animations. You can collect a set of styles in an animation state, and give the state a name, such as `open` or `closed`.

在 HTML 中，这些属性都使用普通的 CSS 样式，比如颜色（color）和透明度（opacity）。在 Angular 中，使用 `style()` 函数来指定一组用作动画的 CSS 样式。
你可以为动画状态指定一组样式，并为该状态指定一个名字，比如 `open` 或 `closed`。

<div class="lightbox">
  <img src="generated/images/guide/animations/open-closed.png" alt="open and closed states">
</div>

### Animation state and styles

### 动画状态和样式

Use Angular's `state()` function to define different states to call at the end of each transition. This function takes two arguments: a unique name like `open` or `closed` and a `style()` function.

使用 Angular 的 `state()` 函数来定义不同的状态，供每次转场结束时调用。该函数接受两个参数：一个唯一的名字，比如 `open` 或 `closed` 和一个 `style()` 函数。

Use the `style()` function to define a set of styles to associate with a given state name. Note that the style attributes must be in [*camelCase*](guide/glossary#case-conventions).

使用 `style()` 函数来定义一组与指定的状态名相关的样式。注意，样式的属性必须是[*小驼峰*](guide/glossary#case-conventions) 格式的。

Let's see how Angular's `state()` function works with the `style⁣­(⁠)` function to set CSS style attributes. In this code snippet, multiple style attributes are set at the same time for the state. In the `open` state, the button has a height of 200 pixels, an opacity of 1, and a background color of yellow.

我们来看看 Angular 的 `state()` 函数如何与 `style()` 函数联用，来设置 CSS 样式的属性。
在下面的代码片段中，该状态的多个样式属性都是同时设置的。在 `open` 状态中，该按钮的高度是 200 像素，透明度是 1，背景色是黄色。

<code-example path="animations/src/app/open-close.component.ts" header="src/app/open-close.component.ts" region="state1" language="typescript">
</code-example>

In the `closed` state, shown below, the button has a height of 100 pixels, an opacity of 0.5, and a background color of green.

在 `closed` 状态中，按钮的高度是 100 像素，透明度是 0.5，背景色是绿色。

<code-example path="animations/src/app/open-close.component.ts" header="src/app/open-close.component.ts" region="state2" language="typescript">
</code-example>

### Transitions and timing

### 转场与时序

In Angular, you can set multiple styles without any animation. However, without further refinement, the button instantly transforms with no fade, no shrinkage, or other visible indicator that a change is occurring.

在 Angular 中，你可以设置多个样式而不必用动画。不过，如果没有进一步细化，按钮的转换会立即完成 —— 没有渐隐、没有收缩，也没有其它的可视化效果来指出正在发生变化。

To make the change less abrupt, we need to define an animation *transition* to specify the changes that occur between one state and another over a period of time. The `transition()` function accepts two arguments: the first argument accepts an expression that defines the direction between two transition states, and the second argument accepts one or a series of `animate()` steps.

要让这些变化不那么突兀，我们需要定义一个动画*转场*来要求这些状态之间的变化在一段时间内发生。`transition()` 接受两个参数：第一个参数接受一个表达式，它定义两个转场状态之间的方向；第二个参数接受一个或一系列 `animate()` 函数。

Use the `animate()` function to define the length, delay, and easing of a transition, and to designate the style function for defining styles while transitions are taking place. You can also use the `animate()` function to define the `keyframes()` function for multi-step animations. These definitions are placed in the second argument of the `animate()` function.

使用 `animate()` 函数来定义长度、延迟和缓动效果，并指定一个样式函数，以定义转场过程中的样式。
你还可以使用 `animate()` 函数来为多步动画定义 `keyframes()` 函数。这些定义放在 `animate()` 函数的第二个参数中。

#### Animation metadata: duration, delay, and easing

#### 动画元数据：持续时间、延迟和缓动效果

The `animate()` function (second argument of the transition function) accepts the `timings` and `styles` input parameters.

`animate()` 函数（作为转场函数的第二个参数）可以接受 `timings` 和 `styles` 参数。

The `timings` parameter takes a string defined in three parts.

`timings` 参数接受一个由三部分组成的字符串。

>`animate ('duration delay easing')`

The first part, `duration`, is required. The duration can be expressed in milliseconds as a simple number without quotes, or in seconds with quotes and a time specifier. For example, a duration of a tenth of a second can be expressed as follows:

第一部分 `duration`（持续时间）是必须的。这个持续时间可以表示成一个不带引号的纯数字（表示毫秒），或一个带引号的有单位的时间（表示秒数）。比如，0.1 秒的持续时间有如下表示方式：

* As a plain number, in milliseconds: `100`

  作为纯数字，毫秒为单位：`100`

* In a string, as milliseconds: `'100ms'`

  作为字符串，毫秒为单位：`'100ms'`

* In a string, as seconds: `'0.1s'`

  作为字符串，秒为单位：`'0.1s'`

The second argument, `delay`, has the same syntax as `duration`. For example:

第二个参数 `delay` 的语法和 `duration` 一样。比如：

* Wait for 100ms and then run for 200ms: `'0.2s 100ms'`

  等待 100 毫秒，然后运行 200 毫秒表示为：`'0.2s 100ms'`

The third argument, `easing`, controls how the animation [accelerates and decelerates](https://easings.net/) during its runtime. For example, `ease-in` causes the animation to begin slowly, and to pick up speed as it progresses.

第三个参数 `easing` 控制动画在运行期间如何进行[加速和减速](http://easings.net/)。比如 `ease-in` 表示动画开始时很慢，然后逐渐加速。

* Wait for 100ms, run for 200ms. Use a deceleration curve to start out fast and slowly decelerate to a resting point: `'0.2s 100ms ease-out'`

  等待 100 毫秒，运行 200 毫秒。按照减速曲线运动，快速启动并逐渐减速，直到静止：`'0.2s 100ms ease-out'`

* Run for 200ms, with no delay. Use a standard curve to start slow, accelerate in the middle, and then decelerate slowly at the end: `'0.2s ease-in-out'`

  运行 200 毫秒，不等待。按照标准曲线运动，开始很慢，中间加速，最后逐渐减速：`'0.2s ease-in-out'`

* Start immediately, run for 200ms. Use an acceleration curve to start slow and end at full velocity: `'0.2s ease-in'`

  立即开始，运行 200 毫秒。按照加速曲线运动，开始很慢，最后达到全速：`'0.2s ease-in'`

<div class="alert is-helpful">

**Note:** See the Material Design website's topic on [Natural easing curves](https://material.io/design/motion/speed.html#easing) for general information on easing curves.

**注意：**要了解缓动曲线的更多信息，请参阅 Angular Material Design 网站下的[自然缓动曲线](https://material.io/design/motion/speed.html#easing)主题。
</div>

This example provides a state transition from `open` to `closed` with a one second transition between states.

下面的例子提供了一个从 `open` 到 `closed` 的持续一秒的状态转场。

<code-example path="animations/src/app/open-close.component.ts" header="src/app/open-close.component.ts" language="typescript"
region="transition1">
</code-example>

In the code snippet above, the `=>` operator indicates unidirectional transitions, and `<=>` is bidirectional. Within the transition, `animate()` specifies how long the transition takes. In this case, the state change from `open` to `closed` takes one second, expressed here as `1s`.

在上面的代码片段中，`=>` 操作符表示单向转场，而 `<=>` 表示双向转场。在转场过程中，`animate()` 指定了转场需要花费的时间。在这里，从 `open` 到 `closed` 状态的转换要花费 1 秒中，表示成 `1s`。

This example adds a state transition from the `closed` state to the `open` state with a 0.5 second transition animation arc.

下面的例子添加了一个从 `closed` 到 `open` 的状态转场，转场动画持续 0.5 秒。

<code-example path="animations/src/app/open-close.component.ts" header="src/app/open-close.component.ts" language="typescript"
region="transition2">
</code-example>

<div class="alert is-helpful">

**Note:** Some additional notes on using styles within `state` and `transition` functions.

**注意：**在 `state` 和 `transition` 函数中使用样式时有一些需要注意的地方。

* Use `state()` to define styles that are applied at the end of each transition, they persist after the animation has completed.

  请用 `state()` 来定义那些每个转场结束时的样式，这些样式在动画完成后仍会保留。

* Use `transition()` to define intermediate styles, which create the illusion of motion during the animation.

  使用 `transition()` 来定义那些中间样式，以便在动画过程中产生运动的错觉。

* When animations are disabled, `transition()` styles can be skipped, but `state()` styles can't.

  当禁用了动画时，也会忽略 `transition()` 中的样式，但 `state()` 中的样式不会。

* You can include multiple state pairs within the same `transition()` argument:<br/> `transition( 'on => off, off => void' )`.

  你可以在同一个 `transition()` 参数中包含多个状态对：<br/>`transition( 'on => off, off => void' )`。

</div>

### Triggering the animation

### 触发动画

An animation requires a *trigger*, so that it knows when to start. The `trigger()` function collects the states and transitions, and gives the animation a name, so that you can attach it to the triggering element in the HTML template.

动画需要*触发器*，以便知道该在何时开始。`trigger()` 函数会把一些状态和转场组合在一起，并为这个动画命名，这样你就可以在 HTML 模板中把它附加到想要触发动画的元素上了。

The `trigger()` function describes the property name to watch for changes. When a change occurs, the trigger initiates the actions included in its definition. These actions can be transitions or other functions, as we'll see later on.

`trigger()` 函数描述了监听变化时要使用的触发器名称。当这个触发器名称所绑定的值发生了变化时，触发器就会启动它所定义的操作。这些操作可能是转场，也可能是其它功能，我们稍后就会看到。

In this example, we'll name the trigger `openClose`, and attach it to the `button` element. The trigger describes the open and closed states, and the timings for the two transitions.

在这个例子中，我们将把该触发器命名为 `openClose`，并把它附加到 `button` 元素上。该触发器描述了 `open` 和 `closed` 两个状态，以及两个转场效果的时序。

<div class="lightbox">
  <img src="generated/images/guide/animations/triggering-the-animation.png" alt="triggering the animation">
</div>

<div class="alert is-helpful">

**Note:** Within each `trigger()` function call, an element can only be in one state at any given time. However, it's possible for multiple triggers to be active at once.

**注意：**在每个 `trigger()` 函数调用中，元素在任意时刻只能处于其中的一个状态。但是，元素可以在同一时刻激活多个触发器。

</div>

### Defining animations and attaching them to the HTML template

### 定义动画，并把它们附加到 HTML 模板中

Animations are defined in the metadata of the component that controls the HTML element to be animated. Put the code that defines your animations under the `animations:` property within the `@Component()` decorator.

这些控制 HTML 元素如何运动的动画是在组件的元数据中定义的。请在 `@Component()` 装饰器的 `animations:` 属性下用代码定义你要用的动画。

<code-example path="animations/src/app/open-close.component.ts" header="src/app/open-close.component.ts" language="typescript" region="component"></code-example>

When you've defined an animation trigger for a component, you can attach it to an element in that component's template by wrapping the trigger name in brackets and preceding it with an `@` symbol. Then, you can bind the trigger to a template expression using standard Angular property binding syntax as shown below, where `triggerName` is the name of the trigger, and `expression` evaluates to a defined animation state.

为组件定义好这些动画触发器之后，你可以给触发器名称加上 `@` 前缀并包在方括号里，来把它附加到组件模板中的元素上。然后，你可以使用 Angular 的标准属性绑定语法（如下所示），来把这个触发器绑定到模板表达式上。这里的 `triggerName` 就是触发器的名称，而 `expression` 的求值结果是前面定义过的动画状态之一。

```
<div [@triggerName]="expression">...</div>;
```

The animation is executed or triggered when the expression value changes to a new state.

当该表达式的值变成了新的状态时，动画就会执行或者叫触发。

The following code snippet binds the trigger to the value of the `isOpen` property.

下列代码片段把该触发器绑定到了 `isOpen` 属性的值上。

<code-example path="animations/src/app/open-close.component.1.html" header="src/app/open-close.component.html"
region="compare">
</code-example>

In this example, when the `isOpen` expression evaluates to a defined state of `open` or `closed`, it notifies the trigger `openClose` of a state change. Then it's up to the `openClose` code to handle the state change and kick off a state change animation.

在这个例子中，当 `isOpen` 表达式求值为一个已定义状态 `open` 或 `closed` 时，就会通知 `openClose` 触发器说状态变化了。然后，就由 `openClose` 中的代码来处理状态变更，并启动状态变更动画。

For elements entering or leaving a page (inserted or removed from the DOM), you can make the animations conditional. For example, use `*ngIf` with the animation trigger in the HTML template.

对于那些进入或离开页面的元素（插入到 DOM 中或从中移除），你可以让动画变成有条件的。例如，在 HTML 模板中可以和 `*ngIf` 一起使用动画触发器。

<div class="alert is-helpful">

**Note:** In the component file, set the trigger that defines the animations as the value of the `animations:` property in the `@Component()` decorator.

**注意：**在组件文件中，要把用来定义动画的触发器设置为 `@Component()` 装饰器的 `animations:` 属性的值。

In the HTML template file, use the trigger name to attach the defined animations to the HTML element to be animated.

在 HTML 模板文件中，使用这个触发器的名称来把所定义的这些动画附加到想要添加动画的 HTML 元素上。

</div>

### Code review

### 代码回顾

Here are the code files discussed in the transition example.

下面是转场动画范例中讨论过的代码文件。

<code-tabs>

<code-pane header="src/app/open-close.component.ts" path="animations/src/app/open-close.component.ts" language="typescript"
region="component">
</code-pane>

<code-pane header="src/app/open-close.component.html" path="animations/src/app/open-close.component.1.html"
region="trigger">
</code-pane>

<code-pane header="src/app/open-close.component.css" path="animations/src/app/open-close.component.css">
</code-pane>

</code-tabs>

### Summary

### 小节

You learned to add animation to a simple transition between two states, using `style()` and `state()` along with `animate()` for the timing.

你已经学会了如何在两个状态之间添加简单的转场动画，只要使用 `style()` 和 `state()`，并使用 `animate()` 来定义时序就可以了。

You can learn about more advanced features in Angular animations under the Animation section, beginning with advanced techniques in [transition and triggers](guide/transition-and-triggers).

你还可以到 "动画" 组下学习 Angular 动画的高级特性，不妨先从[转场与触发器](guide/transition-and-triggers)中讲述的高级技巧开始。

{@a animation-api-summary}
## Animations API summary

## 动画 API 小节

The functional API provided by the `@angular/animations` module provides a domain-specific language (DSL) for creating and controlling animations in Angular applications. See the [API reference](api/animations) for a complete listing and syntax details of the core functions and related data structures.

`@angular/animations` 模块提供的这些功能性 API 提供了一种领域特定语言（DSL），用于在 Angular 应用中创建和控制动画效果。到 [API 参考手册](api/animations)中查看完整的列表以及这些核心功能、相关数据结构的详细语法。

<table>

<tr>
<th style="vertical-align: top">

Function name

函数名

</th>

<th style="vertical-align: top">

What it does

用途

</th>
</tr>

<tr>
<td><code>trigger()</code></td>
<td>

Kicks off the animation and serves as a container for all other animation function calls. HTML template binds to <code>triggerName</code>. Use the first argument to declare a unique trigger name. Uses array syntax.

开始动画，并充当所有其它动画函数的容器。HTML 模板可以绑定到 <code>triggerName</code>。使用第一个参数来声明唯一的触发器名称。要使用数组语法。

</td>
</tr>

<tr>
<td><code>style()</code></td>
<td>

Defines one or more CSS styles to use in animations. Controls the visual appearance of HTML elements during animations. Uses object syntax.

定义一个或多个要用于动画中的 CSS 样式。用于在动画期间控制 HTML 元素的视觉外观。要使用对象语法。

</td>
</tr>

<tr>
<td><code><a href="api/animations/state" class="code-anchor">state()</a></code></td>
<td>

Creates a named set of CSS styles that should be applied on successful transition to a given state. The state can then be referenced by name within other animation functions.

创建一组有名字的 CSS 样式，它会在成功转换到指定的状态时应用到元素上。该状态可以在其它动画函数中通过名字进行引用。

</td>
</tr>

<tr>
<td><code>animate()</code></td>
<td>

Specifies the timing information for a transition. Optional values for <code>delay</code> and <code>easing</code>. Can contain <code>style()</code> calls within.

指定转场的时序信息。<code>delay</code> 和 <code>easing</code> 是可选值。其中可以包含 <code>style()</code> 调用。

</td>
</tr>

<tr>
<td><code>transition()</code></td>
<td>

Defines the animation sequence between two named states. Uses array syntax.

定义两个命名状态之间的动画序列。使用数组语法。

</td>
</tr>

<tr>
<td><code>keyframes()</code></td>
<td>

Allows a sequential change between styles within a specified time interval. Use within <code>animate()</code>. Can include multiple <code>style()</code> calls within each <code>keyframe()</code>. Uses array syntax.

允许以特定的时间间隔对样式进行顺序更改。用于 <code>animate()</code> 中。每个 <code>keyframe()</code> 中都可以包含多个 <code>style()</code> 调用。使用数组语法。

</td>
</tr>

<tr>
<td><code><a href="api/animations/group" class="code-anchor">group()</a></code></td>
<td>

Specifies a group of animation steps (<em>inner animations</em>) to be run in parallel. Animation continues only after all inner animation steps have completed. Used within <code>sequence()</code> or <code>transition().</code>

指定要并行运行的一组动画步骤（<em>内部动画</em>）。
该动画只有当所有内部动画步骤都完成之后才会继续。用于 <code>sequence()</code> 或 <code>transition()</code> 中。

</td>
</tr>

<tr>
<td><code>query()</code></td>
<td>

Use to find one or more inner HTML elements within the current element. 

用于找出当前元素中的一个或多个内部 HTML 元素。

</td>
</tr>

<tr>
<td><code>sequence()</code></td>
<td>

Specifies a list of animation steps that are run sequentially, one by one.

指定一个动画步骤列表，它们会逐个顺序执行。

</td>
</tr>

<tr>
<td><code>stagger()</code></td>
<td>

Staggers the starting time for animations for multiple elements.

交错安排多元素动画的开始时间。

</td>
</tr>

<tr>
<td><code>animation()</code></td>
<td>

Produces a reusable animation that can be invoked from elsewhere. Used together with <code>useAnimation()</code>.

生成可在其它地方调用的可复用动画。与 <code>useAnimation()</code> 一起使用。

</td>
</tr>

<tr>
<td><code>useAnimation()</code></td>
<td>

Activates a reusable animation. Used with <code>animation()</code>.

激活一个可复用动画。和 <code>animation()</code> 一起使用。

</td>
</tr>

<tr>
<td><code>animateChild()</code></td>
<td>

Allows animations on child components to be run within the same timeframe as the parent.

允许子组件上的动画和父组件在同一个时间范围（timeframe）内执行。

</td>
</tr>

</table>

## More on Angular animations

## 关于 Angular 动画的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

* [Complex animation sequences](guide/complex-animation-sequences)

  [复杂动画序列](guide/complex-animation-sequences)

* [Reusable animations](guide/reusable-animations)

  [可复用动画](guide/reusable-animations)

* [Route transition animations](guide/route-animations)

  [路由转场动画](guide/route-animations)

<div class="alert is-helpful">

Check out this [presentation](https://www.youtube.com/watch?v=rnTK9meY5us), shown at the AngularConnect conference in November 2017, and the accompanying [source code](https://github.com/matsko/animationsftw.in).

到这个 [Demo](http://animationsftw.in/#/) 中查看 2017 年 11 月的 AngularConnect 大会上完整的动画及其[演示](https://www.youtube.com/watch?v=JhNo3Wvj6UQ&feature=youtu.be&t=2h47m53s)。
</div>
