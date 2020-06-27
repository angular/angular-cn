# Reusable animations

# 可复用动画

#### Prerequisites

#### 前提条件

A basic understanding of the following concepts:

对下列概念有基本的理解：

* [Introduction to Angular animations](guide/animations)

  [Angular 动画简介](guide/animations)

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

<hr>

The [AnimationOptions](api/animations/AnimationOptions) interface in Angular animations enables you to create animations that you can reuse across different components.

Angular 动画库中的 [AnimationOptions](api/animations/AnimationOptions) 接口让你能创建可以在不同组件之间复用的动画。

## Creating reusable animations

## 创建可复用动画

To create a reusable animation, use the [`animation()`](api/animations/animation) method to define an animation in a separate `.ts` file and declare this animation definition as a `const` export variable. You can then import and reuse this animation in any of your app components using the [`useAnimation()`](api/animations/useAnimation) API.

要想创建可复用的动画，请使用 [`animation()`](api/animations/animation) 方法来在独立的 `.ts` 文件中定义动画，并把该动画的定义声明为一个导出的 `const` 变量。然后你就可以在应用的组件代码中通过 [`useAnimation()`](api/animations/useAnimation) 来导入并复用它了。

<code-example path="animations/src/app/animations.ts" header="src/app/animations.ts" region="reusable" language="typescript"></code-example>

In the above code snippet, `transAnimation` is made reusable by declaring it as an export variable.

在上面的代码片段中，通过把 `transAnimation` 声明为一个导出的变量，就让它变成了可复用的。

<div class="alert is-helpful">

**Note:** The `height`, `opacity`, `backgroundColor`, and `time` inputs are replaced during runtime.

**注意：**`height`、`opacity`、`backgroundColor` 和 `time` 这几个输入项会在运行期间被替换掉。

</div>

You can import the reusable `transAnimation` variable in your component class and reuse it using the `useAnimation()` method as shown below.

你可以在组件类中导入这个可复用的 `transAnimation` 变量，并通过 `useAnimation()` 方法来复用它。代码如下：

<code-example path="animations/src/app/open-close.component.3.ts" header="src/app/open-close.component.ts" region="reusable" language="typescript"></code-example>

## More on Angular animations

## 关于 Angular 动画的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Introduction to Angular animations](guide/animations)

  [Angular 动画简介](guide/animations)

* [Transition and triggers](guide/transition-and-triggers)

  [转场与触发器](guide/transition-and-triggers)

* [Complex animation Sequences](guide/complex-animation-sequences)

  [复杂动画序列](guide/complex-animation-sequences)

* [Route transition animations](guide/route-animations)

  [路由转场动画](guide/route-animations)
