# Hooking into the component lifecycle

# 生命周期钩子

A component instance has a lifecycle that starts when Angular instantiates the component class and renders the component view along with its child views.
The lifecycle continues with change detection, as Angular checks to see when data-bound properties change, and updates both the view and the component instance as needed.
The lifecycle ends when Angular destroys the component instance and removes its rendered template from the DOM.
Directives have a similar lifecycle, as Angular creates, updates, and destroys instances in the course of execution.

当 Angular 实例化组件类并渲染组件视图及其子视图时，组件实例的生命周期就开始了。生命周期一直伴随着变更检测，Angular 会检查数据绑定属性何时发生变化，并按需更新视图和组件实例。当 Angular 销毁组件实例并从 DOM 中移除它渲染的模板时，生命周期就结束了。当 Angular 在执行过程中创建、更新和销毁实例时，指令就有了类似的生命周期。

Your application can use [lifecycle hook methods](guide/glossary#lifecycle-hook "Definition of lifecycle hook") to tap into key events in the lifecycle of a component or directive in order to initialize new instances, initiate change detection when needed, respond to updates during change detection, and clean up before deletion of instances.

你的应用可以使用[生命周期钩子方法](guide/glossary#lifecycle-hook "生命周期钩子的定义")来触发组件或指令生命周期中的关键事件，以初始化新实例，需要时启动变更检测，在变更检测过程中响应更新，并在删除实例之前进行清理。

## Prerequisites

## 先决条件

Before working with lifecycle hooks, you should have a basic understanding of the following:

在使用生命周期钩子之前，你应该对这些内容有一个基本的了解：

* [TypeScript programming](https://www.typescriptlang.org/).

  [TypeScript 编程](https://www.typescriptlang.org/) 。

* Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture "Introduction to fundamental app-design concepts").

  Angular 应用设计基础，就像 [Angular 的基本概念](guide/architecture "基础应用设计概念简介")中所讲的那样。

{@a hooks-overview}

## Responding to lifecycle events

## 响应生命周期事件

You can respond to events in the lifecycle of a component or directive by implementing one or more of the *lifecycle hook* interfaces in the Angular `core` library.
The hooks give you the opportunity to act on a component or directive instance at the appropriate moment, as Angular creates, updates, or destroys that instance.

你可以通过实现一个或多个 Angular `core` 库中定义的*生命周期钩子*接口来响应组件或指令生命周期中的事件。这些钩子让你有机会在适当的时候对组件或指令实例进行操作，比如 Angular 创建、更新或销毁这个实例时。

Each interface defines the prototype for a single hook method, whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit()`. If you implement this method in your component or directive class, Angular calls it shortly after checking the input properties for that component or directive for the first time.

每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上 `ng` 前缀构成的。比如，`OnInit` 接口的钩子方法叫做 `ngOnInit()`。如果你在组件或指令类中实现了这个方法，Angular 就会在首次检查完组件或指令的输入属性后，紧接着调用它。

<code-example path="lifecycle-hooks/src/app/peek-a-boo.component.ts" region="ngOnInit" header="peek-a-boo.component.ts (excerpt)"></code-example>

You don't have to implement all (or any) of the lifecycle hooks, just the ones you need.

你不必实现所有生命周期钩子，只要实现你需要的那些就可以了。

{@a hooks-purpose-timing}

### Lifecycle event sequence

## 生命周期的顺序

After your application instantiates a component or directive by calling its constructor, Angular calls the hook methods you have implemented at the appropriate point in the lifecycle of that instance.

当你的应用通过调用构造函数来实例化一个组件或指令时，Angular 就会调用那个在该实例生命周期的适当位置实现了的那些钩子方法。

Angular executes hook methods in the following sequence. You can use them to perform the following kinds of operations.

Angular 会按以下顺序执行钩子方法。你可以用它来执行以下类型的操作。

<table width="100%">
  <col width="20%"></col>
  <col width="60%"></col>
  <col width="20%"></col>
  <tr>
    <th>Hook method</th>
    <th>Purpose</th>
    <th>Timing</th>
  </tr>
  <tr>
    <th>钩子方法</th>
    <th>用途</th>
    <th>时机</th>
  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngOnChanges()</code>

    </td>

    <td>

      Respond when Angular sets or resets data-bound input properties.
      The method receives a `SimpleChanges` object of current and previous property values.

      当 Angular 设置或重新设置数据绑定的输入属性时响应。
      该方法接受当前和上一属性值的 `SimpleChanges` 对象

      Note that this happens very frequently, so any operation you perform here impacts performance significantly.
      See details in [Using change detection hooks](#onchanges) in this document.

      注意，这发生的非常频繁，所以你在这里执行的任何操作都会显著影响性能。
      欲知详情，参见本文档的[使用变更检测钩子](#onchanges)。

    </td>
    <td>

      Called before `ngOnInit()` and whenever one or more data-bound input properties change.

      在 `ngOnInit()` 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngOnInit()</code>

    </td>

    <td>

      Initialize the directive or component after Angular first displays the data-bound properties
      and sets the directive or component's input properties.
      See details in [Initializing a component or directive](#oninit) in this document.

      在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。
      欲知详情，参见本文档中的[初始化组件或指令](#oninit)。

    </td>
    <td>

      Called once, after the first `ngOnChanges()`.

      在第一轮 `ngOnChanges()` 完成之后调用，只调用**一次**。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngDoCheck()</code>

    </td>

    <td>

      Detect and act upon changes that Angular can't or won't detect on its own.
      See details and example in [Defining custom change detection](#docheck) in this document.

      检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。
      欲知详情和范例，参见本文档中的[自定义变更检测](#docheck)。

    </td>
    <td>

    Called immediately after `ngOnChanges()` on every change detection run, and immediately after `ngOnInit()` on the first run.

    紧跟在每次执行变更检测时的 `ngOnChanges()` 和 首次执行变更检测时的 `ngOnInit()` 后调用。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterContentInit()</code>

    </td>

    <td>

      Respond after Angular projects external content into the component's view, or into the view that a directive is in.

      当 Angular 把外部内容投影进组件视图或指令所在的视图之后调用。

      See details and example in [Responding to changes in content](#aftercontent) in this document.

      欲知详情和范例，参见本文档中的[响应内容中的变更](#aftercontent)。

    </td>
    <td>

      Called _once_ after the first `ngDoCheck()`.

      第一次 `ngDoCheck()` 之后调用，只调用一次。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterContentChecked()</code>

    </td>

    <td>

      Respond after Angular checks the content projected into the directive or component.

      每当 Angular 检查完被投影到组件或指令中的内容之后调用。

      See details and example in [Responding to projected content changes](#aftercontent) in this document.

      欲知详情和范例，参见本文档中的[响应被投影内容的变更](#aftercontent)。

    </td>

    <td>

      Called after `ngAfterContentInit()` and every subsequent `ngDoCheck()`.

      `ngAfterContentInit()` 和每次 `ngDoCheck()` 之后调用

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterViewInit()</code>

    </td>

    <td>

      Respond after Angular initializes the component's views and child views, or the view that contains the directive.

      当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用。

      See details and example in [Responding to view changes](#afterview) in this document.

      欲知详情和范例，参见本文档中的[响应视图变更](#afterview)。

    </td>

    <td>

      Called _once_ after the first `ngAfterContentChecked()`.

      第一次 `ngAfterContentChecked()` 之后调用，只调用一次。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterViewChecked()</code>

    </td>

    <td>

      Respond after Angular checks the component's views and child views, or the view that contains the directive.

      每当 Angular 做完组件视图和子视图或包含该指令的视图的变更检测之后调用。

    </td>

    <td>

      Called after the `ngAfterViewInit()` and every subsequent `ngAfterContentChecked()`.

      `ngAfterViewInit()` 和每次 `ngAfterContentChecked()` 之后调用。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngOnDestroy()</code>

    </td>

    <td>

      Cleanup just before Angular destroys the directive or component.
      Unsubscribe Observables and detach event handlers to avoid memory leaks.
      See details in [Cleaning up on instance destruction](#ondestroy) in this document.

      每当 Angular 每次销毁指令/组件之前调用并清扫。
      在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
      欲知详情，参见本文档中的[在实例销毁时进行清理](#ondestroy)。

    </td>

    <td>

      Called immediately before Angular destroys the directive or component.

      在 Angular 销毁指令或组件之前立即调用。

    </td>

  </tr>
</table>

{@a the-sample}

### Lifecycle example set

## 生命周期范例

The <live-example></live-example>
demonstrates the use of lifecycle hooks through a series of exercises
presented as components under the control of the root `AppComponent`.
In each case a *parent* component serves as a test rig for
a *child* component that illustrates one or more of the lifecycle hook methods.

<live-example></live-example>通过在受控于根组件 `AppComponent` 的一些组件上进行的一系列练习，演示了生命周期钩子的运作方式。
每一个例子中，*父*组件都扮演了*子*组件测试台的角色，以展示出一个或多个生命周期钩子方法。

The following table lists the exercises with brief descriptions.
The sample code is also used to illustrate specific tasks in the following sections.

下表列出了这些练习及其简介。
范例代码也用来阐明后续各节的一些特定任务。

<table width="100%">
  <col width="20%"></col>
  <col width="80%"></col>
  <tr>

    <th>

        Component

        组件

    </th>

    <th>

        Description

        说明

    </th>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#peek-a-boo">Peek-a-boo</a>

    </td>

    <td>

      Demonstrates every lifecycle hook.
      Each hook method writes to the on-screen log.

      展示每个生命周期钩子，每个钩子方法都会在屏幕上显示一条日志。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#spy">Spy</a>

    </td>

    <td>

      Shows how you can use lifecycle hooks with a custom directive.
      The `SpyDirective` implements the `ngOnInit()` and `ngOnDestroy()` hooks,
      and uses them to watch and report when an element goes in or out of the current view.

      展示了你如何在自定义指令中使用生命周期钩子。
      `SpyDirective` 实现了 `ngOnInit()` 和 `ngOnDestroy()` 钩子，并且使用它们来观察和汇报一个元素何时进入或离开当前视图。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#onchanges">OnChanges</a>

    </td>

    <td>

      Demonstrates how Angular calls the `ngOnChanges()` hook
      every time one of the component input properties changes,
      and shows how to interpret the `changes` object passed to the hook method.

      演示了每当组件的输入属性之一发生变化时，Angular 如何调用 `ngOnChanges()` 钩子。并且演示了如何解释传给钩子方法的 `changes` 对象。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#docheck">DoCheck</a>

    </td>

    <td>

      Implements the `ngDoCheck()` method with custom change detection.
      Watch the hook post changes to a log to see how often Angular calls this hook.

      实现了一个 `ngDoCheck()` 方法，通过它可以自定义变更检测逻辑。
      监视该钩子把哪些变更记录到了日志中，观察 Angular 以什么频度调用这个钩子。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#afterview">AfterView</a>

    </td>

    <td>

      Shows what Angular means by a [view](guide/glossary#view "Definition of view.").
      Demonstrates the `ngAfterViewInit()` and `ngAfterViewChecked()` hooks.

      显示 Angular 中的[视图](guide/glossary#view "Definition of view.")所指的是什么。
      演示了 `ngAfterViewInit()` 和 `ngAfterViewChecked()` 钩子。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#aftercontent">AfterContent</a>

    </td>

    <td>

      Shows how to project external content into a component and
      how to distinguish projected content from a component's view children.
      Demonstrates the `ngAfterContentInit()` and `ngAfterContentChecked()` hooks.

      展示如何把外部内容投影进组件中，以及如何区分“投影进来的内容”和“组件的子视图”。
      演示了 `ngAfterContentInit()` 和 `ngAfterContentChecked()` 钩子。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

       <a href="#counter">Counter</a>

       <a href="#counter">计数器</a>

    </td>

    <td>

      Demonstrates a combination of a component and a directive, each with its own hooks.

      演示了一个组件和一个指令的组合，它们各自有自己的钩子。

    </td>

  </tr>
</table>


{@a oninit}
## Initializing a component or directive

## 初始化组件或指令


Use the `ngOnInit()` method to perform the following initialization tasks.

使用 `ngOnInit()` 方法执行以下初始化任务。


* Perform complex initializations outside of the constructor.
  Components should be cheap and safe to construct.
  You should not, for example, fetch data in a component constructor.
  You shouldn't worry that a new component will try to contact a remote server when
  created under test or before you decide to display it.

  在构造函数外部执行复杂的初始化。组件的构造应该既便宜又安全。比如，你不应该在组件构造函数中获取数据。当在测试中创建组件时或者决定显示它之前，你不应该担心新组件会尝试联系远程服务器。

  An `ngOnInit()` is a good place for a component to fetch its initial data.
  For an example, see the [Tour of Heroes tutorial](tutorial/toh-pt4#oninit).

  `ngOnInit()` 是组件获取初始数据的好地方。比如，[英雄指南教程](tutorial/toh-pt4#oninit) 。

  <div class="alert is-helpful">

  In [Flaw: Constructor does Real Work](http://misko.hevery.com/code-reviewers-guide/flaw-constructor-does-real-work/), Misko Hevery, Angular team lead, explains why you should avoid complex constructor logic.

  在[缺陷：在构造函数中做实际工作](http://misko.hevery.com/code-reviewers-guide/flaw-constructor-does-real-work/)中，Misko Hevery（Angular 的团队负责人），解释了为什么要避免使用复杂的构造函数逻辑。

  </div>

* Set up the component after Angular sets the input properties.
  Constructors should do no more than set the initial local variables to simple values.

  在 Angular 设置好输入属性之后设置组件。构造函数应该只把初始局部变量设置为简单的值。

  Keep in mind that a directive's data-bound input properties are not set until _after construction_.
  If you need to initialize the directive based on those properties, set them when `ngOnInit()` runs.

  请记住，只有*在构造完成之后*才会设置指令的数据绑定输入属性。如果要根据这些属性对指令进行初始化，请在运行 `ngOnInit()` 时设置它们。

  <div class="alert is-helpful">

     The `ngOnChanges()` method is your first opportunity to access those properties.
     Angular calls `ngOnChanges()` before `ngOnInit()`, but also many times after that.
     It only calls `ngOnInit()` once.

     `ngOnChanges()` 方法是你能访问这些属性的第一次机会。Angular 会在调用 `ngOnInit()` 之前调用 `ngOnChanges()`，而且之后还会调用多次。但它只调用一次 `ngOnInit()`。

  </div>

{@a ondestroy}

## Cleaning up on instance destruction

## 在实例销毁时进行清理

Put cleanup logic in `ngOnDestroy()`, the logic that must run before Angular destroys the directive.

把清理逻辑放进 `ngOnDestroy()` 中，这个逻辑就必然会在 Angular 销毁该指令之前运行。

This is the place to free resources that won't be garbage-collected automatically.
You risk memory leaks if you neglect to do so.

这里是释放资源的地方，这些资源不会自动被垃圾回收。如果你不这样做，就存在内存泄漏的风险。

* Unsubscribe from Observables and DOM events.

  取消订阅可观察对象和 DOM 事件。

* Stop interval timers.

  停止 interval 计时器。

* Unregister all callbacks that the directive registered with global or application services.

  反注册该指令在全局或应用服务中注册过的所有回调。

The `ngOnDestroy()` method is also the time to notify another part of the application that the component is going away.

`ngOnDestroy()` 方法也可以用来通知应用程序的其它部分，该组件即将消失。


## General examples

## 一般性例子


The following examples demonstrate the call sequence and relative frequency of the various lifecycle events, and how the hooks can be used separately or together for components and directives.

下面的例子展示了各个生命周期事件的调用顺序和相对频率，以及如何在组件和指令中单独使用或同时使用这些钩子。

{@a peek-a-boo}

### Sequence and frequency of all lifecycle events

### 所有生命周期事件的顺序和频率

To show how Angular calls the hooks in the expected order, the `PeekABooComponent` demonstrates all of the hooks in one component.

为了展示 Angular 如何以预期的顺序调用钩子，`PeekABooComponent` 演示了一个组件中的所有钩子。

In practice you would rarely, if ever, implement all of the interfaces the way this demo does.

实际上，你很少会（几乎永远不会）像这个演示中一样实现所有这些接口。

The following snapshot reflects the state of the log after the user clicked the *Create...* button and then the *Destroy...* button.

下列快照反映了用户单击 *Create...* 按钮，然后单击 *Destroy...* 按钮后的日志状态。

<div class="lightbox">
  <img src="generated/images/guide/lifecycle-hooks/peek-a-boo.png" alt="Peek-a-boo">
</div>

The sequence of log messages follows the prescribed hook calling order:
`OnChanges`, `OnInit`, `DoCheck`&nbsp;(3x), `AfterContentInit`, `AfterContentChecked`&nbsp;(3x),
`AfterViewInit`, `AfterViewChecked`&nbsp;(3x), and `OnDestroy`.

日志信息的日志和所规定的钩子调用顺序是一致的：
`OnChanges`、`OnInit`、`DoCheck`&nbsp;(3x)、`AfterContentInit`、`AfterContentChecked`&nbsp;(3x)、
`AfterViewInit`、`AfterViewChecked`&nbsp;(3x)和 `OnDestroy`

<div class="alert is-helpful">

  Notice that the log confirms that input properties (the `name` property in this case) have no assigned values at construction.
  The input properties are available to the `onInit()` method for further initialization.

  注意，该日志确认了在创建期间那些输入属性(这里是 `name` 属性)没有被赋值。
  这些输入属性要等到 `onInit()` 中才可用，以便做进一步的初始化。

</div>

Had the user clicked the *Update Hero* button, the log would show another `OnChanges` and two more triplets of `DoCheck`, `AfterContentChecked` and `AfterViewChecked`.
Notice that these three hooks fire *often*, so it is important to keep their logic as lean as possible.

如果用户点击*Update Hero*按钮，就会看到另一个 `OnChanges` 和至少两组 `DoCheck`、`AfterContentChecked` 和 `AfterViewChecked` 钩子。
注意，这三种钩子被触发了*很多次*，所以让它们的逻辑尽可能保持精简是非常重要的！

{@a spy}

### Use directives to watch the DOM

### 使用指令来监视 DOM

The `Spy` example demonstrates how you can use hook method for directives as well as components.
The `SpyDirective` implements two hooks, `ngOnInit()` and `ngOnDestroy()`, in order to discover when a watched element is in the current view.

这个 `Spy` 例子演示了如何在指令和组件中使用钩子方法。`SpyDirective` 实现了两个钩子 `ngOnInit()` 和 `ngOnDestroy()`，以便发现被监视的元素什么时候位于当前视图中。

This template applies the `SpyDirective` to a `<div>` in the `ngFor` *hero* repeater managed by the parent `SpyComponent`.

这个模板将 `SpyDirective` 应用到由父组件 `SpyComponent` 管理的 `ngFor` 内的 `<div>` 中。

The example does not perform any initialization or clean-up.
It just tracks the appearance and disappearance of an element in the view by recording when the directive itself is instantiated and destroyed.

该例子不执行任何初始化或清理工作。它只是通过记录指令本身的实例化时间和销毁时间来跟踪元素在视图中的出现和消失。

A spy directive like this can provide insight into a DOM object that you cannot change directly.
You can't touch the implementation of a native `<div>`, or modify a third party component.
You can, however watch these elements with a directive.

像这样的间谍指令可以深入了解你无法直接修改的 DOM 对象。你无法触及原生 `<div>` 的实现，也无法修改第三方组件，但是可以用指令来监视这些元素。

The directive defines `ngOnInit()` and `ngOnDestroy()` hooks
that log messages to the parent via an injected `LoggerService`.

这个指令定义了 `ngOnInit()` 和 `ngOnDestroy()` 钩子，它通过一个注入进来的 `LoggerService` 把消息记录到父组件中去。

<code-example path="lifecycle-hooks/src/app/spy.directive.ts" region="spy-directive" header="src/app/spy.directive.ts"></code-example>

You can apply the spy to any native or component element, and see that it is initialized and destroyed
at the same time as that element.
Here it is attached to the repeated hero `<div>`:

你可以把这个侦探指令写到任何原生元素或组件元素上，以观察它何时被初始化和销毁。
下面是把它附加到用来重复显示英雄数据的这个 `<div>` 上。

<code-example path="lifecycle-hooks/src/app/spy.component.html" region="template" header="src/app/spy.component.html"></code-example>

Each spy's creation and destruction marks the appearance and disappearance of the attached hero `<div>`
with an entry in the *Hook Log* as seen here:

每个“侦探”的创建和销毁都可以标出英雄所在的那个 `<div>` 的出现和消失。*钩子记录*中的结构是这样的：

<div class="lightbox">
  <img src='generated/images/guide/lifecycle-hooks/spy-directive.gif' alt="Spy Directive">
</div>

Adding a hero results in a new hero `<div>`. The spy's `ngOnInit()` logs that event.

添加一个英雄就会产生一个新的英雄 `<div>`。侦探的 `ngOnInit()` 记录下了这个事件。

The *Reset* button clears the `heroes` list.
Angular removes all hero `<div>` elements from the DOM and destroys their spy directives at the same time.
The spy's `ngOnDestroy()` method reports its last moments.

*Reset* 按钮清除了这个 `heroes` 列表。
Angular 从 DOM 中移除了所有英雄的 div，并且同时销毁了附加在这些 div 上的侦探指令。
侦探的 `ngOnDestroy()` 方法汇报了它自己的临终时刻。

{@a counter}

### Use component and directive hooks together

### 同时使用组件和指令的钩子

In this example, a `CounterComponent` uses the `ngOnChanges()` method to log a change every time the parent component increments its input `counter` property.

在这个例子中，`CounterComponent` 使用了 `ngOnChanges()` 方法，以便在每次父组件递增其输入属性 `counter` 时记录一次变更。

This example applies the `SpyDirective` from the previous example to the `CounterComponent` log, in order to watch the creation and destruction of log entries.

这个例子将前例中的 `SpyDirective` 用于 `CounterComponent` 的日志，以便监视这些日志条目的创建和销毁。

{@a onchanges}

## Using change detection hooks

## 使用变更检测钩子

Angular calls the `ngOnChanges()` method of a component or directive whenever it detects changes to the  ***input properties***.
The *onChanges* example demonstrates this by monitoring the `OnChanges()` hook.

一旦检测到该组件或指令的***输入属性***发生了变化，Angular 就会调用它的 `ngOnChanges()` 方法。
这个 *onChanges* 范例通过监控 `OnChanges()` 钩子演示了这一点。

<code-example path="lifecycle-hooks/src/app/on-changes.component.ts" region="ng-on-changes" header="on-changes.component.ts (excerpt)"></code-example>

The `ngOnChanges()` method takes an object that maps each changed property name to a
[SimpleChange](api/core/SimpleChange) object holding the current and previous property values.
This hook iterates over the changed properties and logs them.

`ngOnChanges()` 方法获取了一个对象，它把每个发生变化的属性名都映射到了一个[SimpleChange](api/core/SimpleChange)对象，
该对象中有属性的当前值和前一个值。这个钩子会在这些发生了变化的属性上进行迭代，并记录它们。

The example component, `OnChangesComponent`, has two input properties: `hero` and `power`.

这个例子中的 `OnChangesComponent` 组件有两个输入属性：`hero` 和 `power`。

<code-example path="lifecycle-hooks/src/app/on-changes.component.ts" region="inputs" header="src/app/on-changes.component.ts"></code-example>

The host `OnChangesParentComponent` binds to them as follows.

宿主 `OnChangesParentComponent` 绑定了它们，就像这样：

<code-example path="lifecycle-hooks/src/app/on-changes-parent.component.html" region="on-changes" header="src/app/on-changes-parent.component.html"></code-example>

Here's the sample in action as the user makes changes.

下面是此例子中的当用户做出更改时的操作演示：

<div class="lightbox">
  <img src='generated/images/guide/lifecycle-hooks/on-changes-anim.gif' alt="OnChanges">
</div>

The log entries appear as the string value of the *power* property changes.
Notice, however, that the `ngOnChanges()` method does not catch changes to `hero.name`.
This is because Angular calls the hook only when the value of the input property changes.
In this case, `hero` is the input property, and the value of the `hero` property is the *reference to the hero object*.
The object reference did not change when the value of its own `name` property changed.

日志条目把 *power* 属性的变化显示为字符串。但请注意，`ngOnChanges()` 方法不会捕获对 `hero.name` 更改。这是因为只有当输入属性的值发生变化时，Angular 才会调用该钩子。在这种情况下，`hero` 是输入属性，`hero` 属性的值是*对 hero 对象*的*引用* 。当它自己的 `name` 属性的值发生变化时，对象引用并没有改变。


{@a afterview}

### Responding to view changes

### 响应视图的变更

As Angular traverses the [view hierarchy](guide/glossary#view-hierarchy "Definition of view hierarchy definition") during change detection, it needs to be sure that a change in a child does not attempt to cause a change in its own parent. Such a change would not be rendered properly, because of how [unidirectional data flow](guide/glossary#unidirectional-data-flow "Definition") works.

当 Angular 在变更检测期间遍历[视图树](guide/glossary#view-hierarchy "视图层次结构定义的定义")时，需要确保子组件中的某个变更不会尝试更改其父组件中的属性。因为[单向数据流](guide/glossary#unidirectional-data-flow "定义")的工作原理就是这样的，这样的更改将无法正常渲染。

If you need to make a change that inverts the expected data flow, you must trigger a new change detection cycle to allow that change to be rendered.
The examples illustrate how to make such changes safely.

如果你需要做一个与预期数据流反方向的修改，就必须触发一个新的变更检测周期，以允许渲染这种变更。这些例子说明了如何安全地做出这些改变。

The *AfterView* sample explores the `AfterViewInit()` and `AfterViewChecked()` hooks that Angular calls
*after* it creates a component's child views.

*AfterView* 例子展示了 `AfterViewInit()` 和 `AfterViewChecked()` 钩子，Angular 会在每次创建了组件的子视图后调用它们。

Here's a child view that displays a hero's name in an `<input>`:

下面是一个子视图，它用来把英雄的名字显示在一个 `<input>` 中：

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="child-view" header="ChildComponent"></code-example>

The `AfterViewComponent` displays this child view *within its template*:

`AfterViewComponent` 把这个子视图显示*在它的模板中*：

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="template" header="AfterViewComponent (template)"></code-example>

The following hooks take action based on changing values *within the child view*,
which can only be reached by querying for the child view via the property decorated with
[@ViewChild](api/core/ViewChild).

下列钩子基于*子视图中*的每一次数据变更采取行动，它只能通过带[@ViewChild](api/core/ViewChild)装饰器的属性来访问子视图。

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="hooks" header="AfterViewComponent (class excerpts)"></code-example>

{@a wait-a-tick}

#### Wait before updating the view

#### 在更新视图之前等待

In this example, the `doSomething()` method updates the screen when the hero name exceeds 10 characters, but waits a tick before updating `comment`.

在这个例子中，当英雄名字超过 10 个字符时，`doSomething()` 方法会更新屏幕，但在更新 `comment` 之前会等一个节拍（tick）。


<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="do-something" header="AfterViewComponent (doSomething)"></code-example>

Both the `AfterViewInit()` and `AfterViewChecked()` hooks fire after the component's view has been composed.
If you modify the code so that the hook updates the component's data-bound `comment` property immediately, you can see that Angular throws an error.

在组件的视图合成完之后，就会触发 `AfterViewInit()` 和 `AfterViewChecked()` 钩子。如果你修改了这段代码，让这个钩子立即修改该组件的数据绑定属性 `comment`，你就会发现 Angular 抛出一个错误。

The `LoggerService.tick_then()` statement postpones the log update
for one turn of the browser's JavaScript cycle, which triggers a new change-detection cycle.

`LoggerService.tick_then()` 语句把日志的更新工作推迟了一个浏览器 JavaScript 周期，也就触发了一个新的变更检测周期。

#### Write lean hook methods to avoid performance problems

#### 编写精简的钩子方法来避免性能问题


When you run the *AfterView* sample, notice how frequently Angular calls `AfterViewChecked()`-often when there are no changes of interest.
Be very careful about how much logic or computation you put into one of these methods.

当你运行 *AfterView* 示例时，请注意当没有发生任何需要注意的变化时，Angular 仍然会频繁的调用 `AfterViewChecked()`。
要非常小心你放到这些方法中的逻辑或计算量。

<div class="lightbox">

  <img src='generated/images/guide/lifecycle-hooks/after-view-anim.gif' alt="AfterView">

</div>


{@a aftercontent}
{@a aftercontent-hooks}
{@a content-projection}

### Responding to projected content changes

### 响应被投影内容的变更

*Content projection* is a way to import HTML content from outside the component and insert that content
into the component's template in a designated spot.
You can identify content projection in a template by looking for the following constructs.

*内容投影*是从组件外部导入 HTML 内容，并把它插入在组件模板中指定位置上的一种途径。
你可以在目标中通过查找下列结构来认出内容投影。

  * HTML between component element tags.

    元素标签中间的 HTML。

  * The presence of `<ng-content>` tags in the component's template.

    组件模板中的 `<ng-content>` 标签。

<div class="alert is-helpful">

  AngularJS developers know this technique as *transclusion*.

  AngularJS 的开发者把这种技术叫做 *transclusion*。

</div>

The *AfterContent* sample explores the `AfterContentInit()` and `AfterContentChecked()` hooks that Angular calls *after* Angular projects external content into the component.

这个 *AfterContent* 例子探索了 `AfterContentInit()` 和 `AfterContentChecked()` 钩子。Angular 会在把外部内容投影进该组件时调用它们。

Consider this variation on the [previous _AfterView_](#afterview) example.
This time, instead of including the child view within the template, it imports the content from
the `AfterContentComponent`'s parent.
The following is the parent's template.

对比[前面的 AfterView](#afterview) 例子考虑这个变化。
这次不再通过模板来把子视图包含进来，而是改为从 `AfterContentComponent` 的父组件中导入它。下面是父组件的模板：

<code-example path="lifecycle-hooks/src/app/after-content.component.ts" region="parent-template" header="AfterContentParentComponent (template excerpt)"></code-example>

Notice that the `<app-child>` tag is tucked between the `<after-content>` tags.
Never put content between a component's element tags *unless you intend to project that content
into the component*.

注意，`<app-child>` 标签被包含在 `<after-content>` 标签中。
永远不要在组件标签的内部放任何内容 —— *除非你想把这些内容投影进这个组件中*。

Now look at the component's template.

现在来看该组件的模板：

<code-example path="lifecycle-hooks/src/app/after-content.component.ts" region="template" header="AfterContentComponent (template)"></code-example>

The `<ng-content>` tag is a *placeholder* for the external content.
It tells Angular where to insert that content.
In this case, the projected content is the `<app-child>` from the parent.

`<ng-content>` 标签是外来内容的*占位符*。
它告诉 Angular 在哪里插入这些外来内容。
在这里，被投影进去的内容就是来自父组件的 `<app-child>` 标签。

<div class="lightbox">
  <img src='generated/images/guide/lifecycle-hooks/projected-child-view.png' alt="Projected Content">
</div>


#### Using AfterContent hooks

#### 使用 AfterContent 钩子

*AfterContent* hooks are similar to the *AfterView* hooks.
The key difference is in the child component.

*AfterContent* 钩子和 *AfterView* 相似。关键的不同点是子组件的类型不同。

* The *AfterView* hooks concern `ViewChildren`, the child components whose element tags
appear *within* the component's template.

   *AfterView* 钩子所关心的是 `ViewChildren`，这些子组件的元素标签会出现在该组件的模板*里面*。

* The *AfterContent* hooks concern `ContentChildren`, the child components that Angular
projected into the component.

   *AfterContent* 钩子所关心的是 `ContentChildren`，这些子组件被 Angular 投影进该组件中。

The following *AfterContent* hooks take action based on changing values in a *content child*,
which can only be reached by querying for them via the property decorated with
[@ContentChild](api/core/ContentChild).

下列 *AfterContent* 钩子基于*子级内容*中值的变化而采取相应的行动，它只能通过带有[@ContentChild](api/core/ContentChild)装饰器的属性来查询到“子级内容”。

<code-example path="lifecycle-hooks/src/app/after-content.component.ts" region="hooks" header="AfterContentComponent (class excerpts)"></code-example>

{@a no-unidirectional-flow-worries}

<div class="alert is-helpful>

<header>No need to wait for content updates</header>

<header>不需要等待内容更新</header>

This component's `doSomething()` method updates the component's data-bound `comment` property immediately.
There's no need to [delay the update to ensure proper rendering](#wait-a-tick "Delaying updates").

该组件的 `doSomething()` 方法会立即更新该组件的数据绑定属性 `comment`。而无需[延迟更新以确保正确渲染](#wait-a-tick "延迟更新") 。

Angular calls both *AfterContent* hooks before calling either of the *AfterView* hooks.
Angular completes composition of the projected content *before* finishing the composition of this component's view.
There is a small window between the `AfterContent...` and `AfterView...` hooks that allows you to modify the host view.

Angular 在调用 *AfterView* 钩子之前，就已调用完所有的 *AfterContent* 钩子。 在完成该组件视图的合成*之前*， Angular 就已经完成了所投影内容的合成工作。 `AfterContent...` 和 `AfterView...` 钩子之间有一个小的时间窗，允许你修改宿主视图。


</div>

{@a docheck}

## Defining custom change detection

## 自定义变更检测逻辑

To monitor changes that occur where `ngOnChanges()` won't catch them, you can implement your own change check, as shown in the *DoCheck* example.
This example shows how you can use the `ngDoCheck()` hook to detect and act upon changes that Angular doesn't catch on its own.

要监控 `ngOnChanges()` 无法捕获的变更，你可以实现自己的变更检查逻辑，比如 *DoCheck* 的例子。这个例子展示了你如何使用 `ngDoCheck()` 钩子来检测和处理 Angular 自己没有捕捉到的变化。


The *DoCheck* sample extends the *OnChanges* sample with the following `ngDoCheck()` hook:

*DoCheck* 示例使用下面的 `ngDoCheck()` 钩子扩展了 *OnChanges* 示例：


<code-example path="lifecycle-hooks/src/app/do-check.component.ts" region="ng-do-check" header="DoCheckComponent (ngDoCheck)"></code-example>

This code inspects certain _values of interest_, capturing and comparing their current state against previous values.
It writes a special message to the log when there are no substantive changes to the `hero` or the `power` so you can see how often `DoCheck()` is called.
The results are illuminating.

这段代码会检查某些*感兴趣的值*，捕获并把它们当前的状态和之前的进行比较。当 `hero` 或 `power` 没有实质性变化时，它就会在日志中写一条特殊的信息，这样你就能看到 `DoCheck()` 被调用的频率。其结果很有启发性。


<div class="lightbox">
  <img src='generated/images/guide/lifecycle-hooks/do-check-anim.gif' alt="DoCheck">
</div>

While the `ngDoCheck()` hook can detect when the hero's `name` has changed, it is very expensive.
This hook is called with enormous frequency—after *every*
change detection cycle no matter where the change occurred.
It's called over twenty times in this example before the user can do anything.

虽然 `ngDoCheck()` 钩子可以检测出英雄的 `name` 何时发生了变化，但却非常昂贵。无论变化发生在何处，*每个*变化检测周期*都会*以很大的频率调用这个钩子。在用户可以执行任何操作之前，本例中已经调用了20多次。

Most of these initial checks are triggered by Angular's first rendering of *unrelated data elsewhere on the page*.
Just moving the cursor into another `<input>` triggers a call.
Relatively few calls reveal actual changes to pertinent data.
If you use this hook, your implementation must be extremely lightweight or the user experience suffers.

这些初始化检查大部分都是由 Angular 首次*在页面的其它地方*渲染*不相关的数据*触发的。只要把光标移动到另一个 `<input>` 就会触发一次调用。其中的少数调用揭示了相关数据的实际变化情况。如果使用这个钩子，那么你的实现必须非常轻量级，否则会损害用户体验。
