# Dynamic Component Loader

# 动态组件加载器

Component templates are not always fixed. An application may need to load new components at runtime.

组件的模板不会永远是固定的。应用可能会需要在运行期间加载一些新的组件。

This cookbook shows you how to use `ComponentFactoryResolver` to add components dynamically.

这本烹饪书为你展示如何使用`ComponentFactoryResolver`来动态添加组件。

See the <live-example name="dynamic-component-loader"></live-example>
of the code in this cookbook.

到<live-example name="dynamic-component-loader"></live-example>查看本烹饪书的源码。

{@a dynamic-loading}

## Dynamic component loading

## 动态组件加载

The following example shows how to build a dynamic ad banner.

下面的例子展示了如何构建动态广告条。

The hero agency is planning an ad campaign with several different
ads cycling through the banner. New ad components are added
frequently by several different teams. This makes it impractical
to use a template with a static component structure.

英雄管理局正在计划一个广告活动，要在广告条中显示一系列不同的广告。几个不同的小组可能会频繁加入新的广告组件。
再用只支持静态组件结构的模板显然是不现实的。

Instead, you need a way to load a new component without a fixed
reference to the component in the ad banner's template.

我们需要一种新的组件加载方式，它不需要在广告条组件的模板中引用固定的组件。

Angular comes with its own API for loading components dynamically.

Angular 自带的API就能支持动态加载组件。

{@a directive}

## The anchor directive

## 指令

Before you can add components you have to define an anchor point
to tell Angular where to insert components.

在添加组件之前，先要定义一个锚点来告诉Angular要把组件插入到什么地方。

The ad banner uses a helper directive called `AdDirective` to
mark valid insertion points in the template.

广告条使用一个名叫`AdDirective`的辅助指令来在模板中标记出有效的插入点。

<code-example path="dynamic-component-loader/src/app/ad.directive.ts" title="src/app/ad.directive.ts" linenums="false">

</code-example>

`AdDirective` injects `ViewContainerRef` to gain access to the view
container of the element that will host the dynamically added component.

`AdDirective`注入了`ViewContainerRef`来获取对容器视图的访问权，这个容器就是那些动态加入的组件的宿主。

In the `@Directive` decorator, notice the selector name, `ad-host`;
that's what you use to apply the directive to the element.
The next section shows you how.

在`@Directive`装饰器中，要注意选择器的名称：`ad-host`，它就是我们将应用到元素上的指令。下一节我们会展示如何做。

{@a loading-components}

## Loading components

## 加载组件

Most of the ad banner implementation is in `ad-banner.component.ts`.
To keep things simple in this example, the HTML is in the `@Component`
decorator's `template` property as a template string.

广告条的大部分实现代码都在`ad-banner.component.ts`中。
为了让这个例子简单点，我们把HTML直接放在了`@Component`装饰器的`template`属性中。

The `<ng-template>` element is where you apply the directive you just made.
To apply the `AdDirective`, recall the selector from `ad.directive.ts`,
`ad-host`. Apply that to `<ng-template>` without the square brackets. Now Angular knows
where to dynamically load components.

`<ng-template>`元素就是刚才制作的指令将应用到的地方。
要应用`AdDirective`，回忆一下来自`ad.directive.ts`的选择器`ad-host`。把它应用到`<ng-template>`（不用带方括号）。
这下，Angular就知道该把组件动态加载到哪里了。

<code-example path="dynamic-component-loader/src/app/ad-banner.component.ts" region="ad-host" title="src/app/ad-banner.component.ts (template)" linenums="false">

</code-example>

The `<ng-template>` element is a good choice for dynamic components
because it doesn't render any additional output.

`<ng-template>`元素是动态加载组件的最佳选择，因为它不会渲染任何额外的输出。

{@a resolving-components}

## Resolving components

## 解析组件

Take a closer look at the methods in `ad-banner.component.ts`.

深入看看`ad-banner.component.ts`中的方法。

`AdBannerComponent` takes an array of `AdItem` objects as input,
which ultimately comes from `AdService`.  `AdItem` objects specify
the type of component to load and any data to bind to the
component.`AdService` returns the actual ads making up the ad campaign.

`AdBannerComponent`接收一个`AdItem`对象的数组作为输入，它最终来自`AdService`。
`AdItem`对象指定要加载的组件类，以及绑定到该组件上的任意数据。
`AdService`可以返回广告活动中的那些广告。

Passing an array of components to `AdBannerComponent` allows for a
dynamic list of ads without static elements in the template.

给`AdBannerComponent`传入一个组件数组可以让我们在模板中放入一个广告的动态列表，而不用写死在模板中。

With its `getAds()` method, `AdBannerComponent` cycles through the array of `AdItems`
and loads a new component every 3 seconds by calling `loadComponent()`.

通过`getAds()`方法，`AdBannerComponent`可以循环遍历`AdItems`的数组，并且每三秒调用一次`loadComponent()`来加载新组件。

<code-example path="dynamic-component-loader/src/app/ad-banner.component.ts" region="class" title="src/app/ad-banner.component.ts (excerpt)" linenums="false">

</code-example>

The `loadComponent()` method is doing a lot of the heavy lifting here.
Take it step by step. First, it picks an ad.

这里的`loadComponent()`方法很重要。
我们来一步步看看。首先，它选取了一个广告。

<div class="l-sub-section">

**How _loadComponent()_ chooses an ad**

**`loadComponent()`如何选择广告**

The `loadComponent()` method chooses an ad using some math.

`loadComponent()`方法使用某种算法选择了一个广告。

First, it sets the `currentAddIndex` by taking whatever it
currently is plus one, dividing that by the length of the `AdItem` array, and
using the _remainder_ as the new `currentAddIndex` value. Then, it uses that
value to select an `adItem` from the array.

（译注：循环选取算法）首先，它把`currentAddIndex`递增一，然后用它除以`AdItem`数组长度的*余数*作为新的`currentAddIndex`的值，
最后用这个值来从数组中选取一个`adItem`。

</div>

After `loadComponent()` selects an ad, it uses `ComponentFactoryResolver`
to resolve a `ComponentFactory` for each specific component.
The `ComponentFactory` then creates an instance of each component.

在`loadComponent()`选取了一个广告之后，它使用`ComponentFactoryResolver`来为每个具体的组件解析出一个`ComponentFactory`。
然后`ComponentFactory`会为每一个组件创建一个实例。

Next, you're targeting the `viewContainerRef` that
exists on this specific instance of the component. How do you know it's
this specific instance? Because it's referring to `adHost` and `adHost` is the
directive you set up earlier to tell Angular where to insert dynamic components.

接下来，我们要把`viewContainerRef`指向这个组件的现有实例。但我们怎么才能找到这个实例呢？
很简单，因为它指向了`adHost`，而这个`adHost`就是我们以前设置过的指令，用来告诉Angular该把动态组件插入到什么位置。

As you may recall, `AdDirective` injects `ViewContainerRef` into its constructor.
This is how the directive accesses the element that you want to use to host the dynamic component.

回忆一下，`AdDirective`曾在它的构造函数中注入了一个`ViewContainerRef`。
因此这个指令可以访问到这个被我们用作动态组件宿主的元素。

To add the component to the template, you call `createComponent()` on `ViewContainerRef`.

要把这个组件添加到模板中，我们可以调用`ViewContainerRef`的`createComponent()`。

The `createComponent()` method returns a reference to the loaded component.
Use that reference to interact with the component by assigning to its properties or calling its methods.

`createComponent()`方法返回一个引用，指向这个刚刚加载的组件。
使用这个引用就可以与该组件进行交互，比如设置它的属性或调用它的方法。

{@a selector-references}

#### Selector references

#### 对选择器的引用

Generally, the Angular compiler generates a `ComponentFactory`
for any component referenced in a template. However, there are
no selector references in the templates for
dynamically loaded components since they load at runtime.

通常，Angular编译器会为模板中所引用的每个组件都生成一个`ComponentFactory`类。
但是，对于动态加载的组件，模板中不会出现对它们的选择器的引用。

To ensure that the compiler still generates a factory,
add dynamically loaded components to the `NgModule`'s `entryComponents` array:

要想确保编译器照常生成工厂类，就要把这些动态加载的组件添加到`NgModule`的`entryComponents`数组中：

<code-example path="dynamic-component-loader/src/app/app.module.ts" region="entry-components" title="src/app/app.module.ts (entry components)" linenums="false">

</code-example>

{@a common-interface}

## The _AdComponent_ interface

## 公共的`AdComponent`接口

In the ad banner, all components implement a common `AdComponent` interface to
standardize the API for passing data to the components.

在广告条中，所有组件都实现了一个公共接口`AdComponent`，它定义了一个标准化的API，让我们把数据传给组件。

Here are two sample components and the `AdComponent` interface for reference:

下面就是两个范例组件及其`AdComponent`接口：

<code-tabs>

  <code-pane title="hero-job-ad.component.ts" path="dynamic-component-loader/src/app/hero-job-ad.component.ts">

  </code-pane>

  <code-pane title="hero-profile.component.ts" path="dynamic-component-loader/src/app/hero-profile.component.ts">

  </code-pane>

  <code-pane title="ad.component.ts" path="dynamic-component-loader/src/app/ad.component.ts">

  </code-pane>

</code-tabs>

{@a final-ad-baner}

## Final ad banner

## 最终的广告栏

 The final ad banner looks like this:

 最终的广告栏是这样的：

<figure>
  <img src="generated/images/guide/dynamic-component-loader/ads.gif" alt="Ads">
</figure>

See the <live-example name="dynamic-component-loader"></live-example>.


参见<live-example name="cb-dynamic-component-loader"></live-example>。
