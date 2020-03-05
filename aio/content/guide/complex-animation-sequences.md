# Complex animation sequences

# 复杂动画序列

#### Prerequisites

#### 前提条件

A basic understanding of the following concepts:

对下列概念有基本的理解：

* [Introduction to Angular animations](guide/animations)

  [Angular 动画简介](guide/animations)

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

<hr>

So far, we've learned simple animations of single HTML elements. Angular also lets you animate coordinated sequences, such as an entire grid or list of elements as they enter and leave a page. You can choose to run multiple animations in parallel, or run discrete animations sequentially, one following another.

到目前为止，我们已经学过了单个 HTML 元素的简单动画。Angular 还允许你在进入和离开页面时播放 "动画协调序列"，比如当整个网格或元素列表进入或离开页面时，多个条目的动画之间需要彼此协调时间。你可以选择并行执行多个动画，或者按顺序逐个运行离散动画。

Functions that control complex animation sequences are as follows:

用来控制复杂动画序列的函数如下：

* `query()` finds one or more inner HTML elements.

  `query()` 用于查找一个或多个内部 HTML 元素。

* `stagger()` applies a cascading delay to animations for multiple elements.

  `stagger()` 用于为多元素动画应用级联延迟。

* [`group()`](api/animations/group) runs multiple animation steps in parallel.

  [`group()`](api/animations/group) 用于并行执行多个动画步骤。

* `sequence()` runs animation steps one after another.

  `sequence()` 用于逐个顺序执行多个动画步骤。

{@a complex-sequence}

## Animate multiple elements using query() and stagger() functions

## 使用 `query()` 和 `stagger()`（交错）函数执行多元素动画

The `query()` function allows you to find inner elements within the element that is being animated. This function targets specific HTML elements within a parent component and applies animations to each element individually. Angular intelligently handles setup, teardown, and cleanup as it coordinates the elements across the page.

`query()` 函数允许你查找正在播放动画的元素内部的元素。此函数会针对父组件中的特定 HTML 元素，并把动画单独应用于其中的每个元素。Angular 会智能地处理初始化、收尾和清理工作，因为它负责协调页面中的这些元素。

The `stagger()` function allows you to define a timing gap between each queried item that is animated and thus animates elements with a delay between them.

`stagger()` 函数允许你定义每个查询出的动画条目之间的时间间隔，从而让这些条目动画彼此错开一定的延迟。

The Filter/Stagger tab in the live example shows a list of heroes with an introductory sequence. The entire list of heroes cascades in, with a slight delay from top to bottom.

这个现场演练中的 Filter/Stagger 标签显示了一个带有前导序列的英雄列表。整个英雄列表会级联进入，从上到下逐个做轻微的延迟。

The following example demonstrates how to use `query()` and `stagger()` functions on the entry of an animated element.

下面的例子演示了如何在动画元素的条目上使用 `query()` 和 `stagger()` 函数。

* Use `query()` to look for an element entering the page that meets certain criteria.

  用 `query()` 查阅正在进入或离开页面的任意元素。该查询会找出那些符合某种匹配 CSS 选择器的元素。

* For each of these elements, use `style()` to set the same initial style for the element. Make it invisible and use `transform` to move it out of position so that it can slide into place.

  对每个元素，使用 `style()` 为其设置初始样式。使其不可见，并使用 `transform` 将其移出位置，以便它能滑入后就位。

* Use `stagger()` to delay each animation by 30 milliseconds.

  使用 `stagger()` 来在每个动画之间延迟 30 毫秒。

* Animate each element on screen for 0.5 seconds using a custom-defined easing curve, simultaneously fading it in and un-transforming it.

  对屏幕上的每个元素，根据一条自定义缓动曲线播放 0.5 秒的动画，同时将其淡入，而且逐步取消以前的位移效果。

<code-example path="animations/src/app/hero-list-page.component.ts" header="src/app/hero-list-page.component.ts" region="page-animations" language="typescript"></code-example>

## Parallel animation using group() function

## 使用 `group()` 函数播放并行动画

You've seen how to add a delay between each successive animation. But you may also want to configure animations that happen in parallel. For example, you may want to animate two CSS properties of the same element but use a different `easing` function for each one. For this, you can use the animation [`group()`](api/animations/group) function.

你已经了解了如何在两个连续的动画之间添加延迟。不过你可能还想配置一些并行的动画。比如，你可能希望为同一个元素的两个 CSS 属性设置动画，但要为每个属性使用不同的 `easing` 函数。这时，你可以使用动画函数 [`group()`](api/animations/group)。

<div class="alert is-helpful">

**Note:** The [`group()`](api/animations/group) function is used to group animation *steps*, rather than animated elements.

**注意：** [`group()`](api/animations/group) 函数用于对动画*步骤*进行分组，而不是针对动画元素。
</div>

In the following example, using groups on both `:enter` and `:leave` allow for two different timing configurations. They're applied to the same element in parallel, but run independently.

在下面的例子中，对 `:enter` 和 `:leave` 使用分组，可以配置两种不同的时序。它们会同时作用于同一个元素，但彼此独立运行。

<code-example path="animations/src/app/hero-list-groups.component.ts" region="animationdef" header="src/app/hero-list-groups.component.ts (excerpt)" language="typescript"></code-example>

## Sequential vs. parallel animations

## 顺序动画与平行动画

Complex animations can have many things happening at once. But what if you want to create an animation involving several animations happening one after the other? Earlier we used [`group()`](api/animations/group) to run multiple animations all at the same time, in parallel.

复杂动画中可以同时发生很多事情。但是当你要创建一个需要让几个子动画逐个执行的动画时，该怎么办呢？以前我们使用 [`group()`](api/animations/group) 来同时并行运行多个动画。

A second function called `sequence()` lets you run those same animations one after the other. Within `sequence()`, the animation steps consist of either `style()` or `animate()` function calls.

第二个名叫 `sequence()` 的函数会让你一个接一个地运行这些动画。在 `sequence()` 中，这些动画步骤由 `style()` 或 `animate()` 的函数调用组成。

* Use `style()` to apply the provided styling data immediately.

  `style()` 用来立即应用所指定的样式数据。

* Use `animate()` to apply styling data over a given time interval.

  `animate()` 用来在一定的时间间隔内应用样式数据。

## Filter animation example

## 过滤器动画范例

Let's take a look at another animation on the live example page. Under the Filter/Stagger tab, enter some text into the **Search Heroes** text box, such as `Magnet` or `tornado`.

我们来看看范例应用中的另一个动画。在 Filter/Stagger 页，往 **Search Heroes** 文本框中输入一些文本，比如 `Magnet` 或 `tornado`。

The filter works in real time as you type. Elements leave the page as you type each new letter and the filter gets progressively stricter. The heroes list gradually re-enters the page as you delete each letter in the filter box.

过滤器会在你输入时实时工作。每当你键入一个新字母时，就会有一些元素离开页面，并且过滤条件也会逐渐变得更加严格。相反，当你删除过滤器中的每个字母时，英雄列表也会逐渐重新进入页面中。

The HTML template contains a trigger called `filterAnimation`.

HTML 模板中包含一个名叫 `filterAnimation` 的触发器。

<code-example path="animations/src/app/hero-list-page.component.html" header="src/app/hero-list-page.component.html" region="filter-animations"></code-example>

The component file contains three transitions.

该组件文件包含三个转场。

<code-example path="animations/src/app/hero-list-page.component.ts" header="src/app/hero-list-page.component.ts" region="filter-animations" language="typescript"></code-example>

The animation does the following:

这个动画包含下列动作：

* Ignores any animations that are performed when the user first opens or navigates to this page. The filter narrows what is already there, so it assumes that any HTML elements to be animated already exist in the DOM.

  忽略用户首次打开或导航到此页面时执行的任何动画。过滤器窄化了已经存在的内容，因此它可以假设任何需要动画的 HTML 元素都已经存在于 DOM 中了。

* Performs a filter match for matches.

  根据过滤器进行匹配。

For each match:

对于每次匹配：

* Hides the element by making it completely transparent and infinitely narrow, by setting its opacity and width to 0.

  通过将元素的不透明度和宽度设置为 0 来隐藏该元素，使其变得完全透明且无限窄。

* Animates in the element over 300 milliseconds. During the animation, the element assumes its default width and opacity.

  元素中的动画超过 300 毫秒。在动画期间，元素采用其默认宽度和不透明度。

* If there are multiple matching elements, staggers in each element starting at the top of the page, with a 50-millisecond delay between each element.

  如果有多个匹配的元素，则从页面顶部的元素开始对每个元素进行交错（stagger），每个元素之间的延迟为 50 毫秒。

## Animation sequence summary

## 动画序列总结

Angular functions for animating multiple elements start with `query()` to find inner elements, for example gathering all images within a `<div>`. The remaining functions, `stagger()`, [`group()`](api/animations/group), and `sequence()`, apply cascades or allow you to control how multiple animation steps are applied.

Angular 中这些用于多元素动画的函数，都要从 `query()` 开始，查找出内部元素，比如找出某个 `<div>` 中的所有图片。其余函数 `stagger()`、[`group()`](api/animations/group) 和 `sequence()` 会以级联方式或你的自定义逻辑来控制要如何应用多个动画步骤。

## More on Angular animations

## 关于 Angular 动画的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Introduction to Angular animations](guide/animations)

  [Angular 动画简介](guide/animations)

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

* [Reusable animations](guide/reusable-animations)

  [可复用动画](guide/reusable-animations)

* [Route transition animations](guide/route-animations)

  [路由转场动画](guide/route-animations)
