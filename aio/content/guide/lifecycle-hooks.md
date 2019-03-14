# Lifecycle Hooks

# 生命周期钩子

A component has a lifecycle managed by Angular.

每个组件都有一个被 Angular 管理的生命周期。

Angular creates it, renders it, creates and renders its children,
checks it when its data-bound properties change, and destroys it before removing it from the DOM.

Angular 创建它，渲染它，创建并渲染它的子组件，在它被绑定的属性发生变化时检查它，并在它从 DOM 中被移除前销毁它。

Angular offers **lifecycle hooks**
that provide visibility into these key life moments and the ability to act when they occur.

Angular 提供了**生命周期钩子**，把这些关键生命时刻暴露出来，赋予你在它们发生时采取行动的能力。

A directive has the same set of lifecycle hooks.

除了那些组件内容和视图相关的钩子外,指令有相同生命周期钩子。

{@a hooks-overview}

## Component lifecycle hooks overview

## 组件生命周期钩子概览

Directive and component instances have a lifecycle
as Angular creates, updates, and destroys them.
Developers can tap into key moments in that lifecycle by implementing
one or more of the *lifecycle hook* interfaces in the Angular `core` library.

指令和组件的实例有一个生命周期：当 Angular 新建、更新和销毁它们时触发。
通过实现一个或多个 Angular `core` 库里定义的*生命周期钩子*接口，开发者可以介入该生命周期中的这些关键时刻。

Each interface has a single hook method whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit()`
that Angular calls shortly after creating the component:

每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上 `ng` 前缀构成的。比如，`OnInit` 接口的钩子方法叫做 `ngOnInit`，
Angular 在创建组件后立刻调用它，：

<code-example path="lifecycle-hooks/src/app/peek-a-boo.component.ts" region="ngOnInit" header="peek-a-boo.component.ts (excerpt)" linenums="false"></code-example>

No directive or component will implement all of the lifecycle hooks.
Angular only calls a directive/component hook method *if it is defined*.

没有指令或者组件会实现所有这些接口，并且有些钩子只对组件有意义。只有在指令/组件中*定义过的*那些钩子方法才会被 Angular 调用。

{@a hooks-purpose-timing}

## Lifecycle sequence

## 生命周期的顺序

*After* creating a component/directive by calling its constructor, Angular
calls the lifecycle hook methods in the following sequence at specific moments:

当 Angular 使用构造函数新建一个组件或指令后，就会按下面的顺序在特定时刻调用这些生命周期钩子方法：

<table width="100%">
  <col width="20%"></col>
  <col width="80%"></col>
  <tr>

    <th>

        Hook

        钩子

    </th>

    <th>

        Purpose and Timing

        用途及时机

    </th>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngOnChanges()</code>

    </td>

    <td>

      Respond when Angular (re)sets data-bound input properties.
      The method receives a `SimpleChanges` object of current and previous property values.

      当 Angular（重新）设置数据绑定输入属性时响应。
      该方法接受当前和上一属性值的 `SimpleChanges` 对象

      Called before `ngOnInit()` and whenever one or more data-bound input properties change.

      在 `ngOnInit()` 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngOnInit()</code>

    </td>

    <td>

      Initialize the directive/component after Angular first displays the data-bound properties
      and sets the directive/component's input properties.

      在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。

      Called _once_, after the _first_ `ngOnChanges()`.

      在第一轮 `ngOnChanges()` 完成之后调用，只调用**一次**。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngDoCheck()</code>

    </td>

    <td>

      Detect and act upon changes that Angular can't or won't detect on its own.

      检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。

      Called during every change detection run, immediately after `ngOnChanges()` and `ngOnInit()`.

      在每个变更检测周期中，紧跟在 `ngOnChanges()` 和 `ngOnInit()` 后面调用。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterContentInit()</code>

    </td>

    <td>

      Respond after Angular projects external content into the component's view / the view that a directive is in.

      当 Angular 把外部内容投影进组件/指令的视图之后调用。

      Called _once_ after the first `ngDoCheck()`.

      第一次 `ngDoCheck()` 之后调用，只调用一次。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterContentChecked()</code>

    </td>

    <td>

      Respond after Angular checks the content projected into the directive/component.

      每当 Angular 完成被投影组件内容的变更检测之后调用。

      Called after the `ngAfterContentInit()` and every subsequent `ngDoCheck()`.

      `ngAfterContentInit()` 和每次 `ngDoCheck()` 之后调用

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterViewInit()</code>

    </td>

    <td>

      Respond after Angular initializes the component's views and child views / the view that a directive is in.

      当 Angular 初始化完组件视图及其子视图之后调用。

      Called _once_ after the first `ngAfterContentChecked()`.

      第一次 `ngAfterContentChecked()` 之后调用，只调用一次。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngAfterViewChecked()</code>

    </td>

    <td>

      Respond after Angular checks the component's views and child views / the view that a directive is in.

      每当 Angular 做完组件视图和子视图的变更检测之后调用。

      Called after the `ngAfterViewInit` and every subsequent `ngAfterContentChecked()`.

      `ngAfterViewInit()` 和每次 `ngAfterContentChecked()` 之后调用。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <code>ngOnDestroy()</code>

    </td>

    <td>

      Cleanup just before Angular destroys the directive/component.
      Unsubscribe Observables and detach event handlers to avoid memory leaks.

      每当 Angular 每次销毁指令/组件之前调用并清扫。
      在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。

      Called _just before_ Angular destroys the directive/component.

      在 Angular 销毁指令/组件之前调用。

    </td>

  </tr>
</table>

{@a interface-optional}

## Interfaces are optional (technically)

## 接口是可选的（严格来说）

The interfaces are optional for JavaScript and Typescript developers from a purely technical perspective.
The JavaScript language doesn't have interfaces.
Angular can't see TypeScript interfaces at runtime because they disappear from the transpiled JavaScript.

从纯技术的角度讲，接口对 JavaScript 和 TypeScript 的开发者都是可选的。JavaScript 语言本身没有接口。
Angular 在运行时看不到 TypeScript 接口，因为它们在编译为 JavaScript 的时候已经消失了。

Fortunately, they aren't necessary.
You don't have to add the lifecycle hook interfaces to directives and components to benefit from the hooks themselves.

幸运的是，它们并不是必须的。
你并不需要在指令和组件上添加生命周期钩子接口就能获得钩子带来的好处。

Angular instead inspects directive and component classes and calls the hook methods *if they are defined*.
Angular finds and calls methods like `ngOnInit()`, with or without the interfaces.

Angular 会去检测这些指令和组件的类，一旦发现钩子方法被定义了，就调用它们。
Angular 会找到并调用像 `ngOnInit()` 这样的钩子方法，有没有接口无所谓。

Nonetheless, it's good practice to add interfaces to TypeScript directive classes
in order to benefit from strong typing and editor tooling.

虽然如此，在 TypeScript 指令类中添加接口是一项最佳实践，它可以获得强类型和 IDE 等编辑器带来的好处。

{@a other-lifecycle-hooks}

## Other Angular lifecycle hooks

## 其它 Angular 生命周期钩子

Other Angular sub-systems may have their own lifecycle hooks apart from these component hooks.

Angular 的其它子系统除了有这些组件钩子外，还可能有它们自己的生命周期钩子。

3rd party libraries might implement their hooks as well in order to give developers more
control over how these libraries are used.

第三方库也可能会实现它们自己的钩子，以便让这些开发者在使用时能做更多的控制。

{@a the-sample}

## Lifecycle examples

## 生命周期范例

The <live-example></live-example>
demonstrates the lifecycle hooks in action through a series of exercises
presented as components under the control of the root `AppComponent`.

<live-example></live-example>通过在受控于根组件 `AppComponent` 的一些组件上进行的一系列练习，演示了生命周期钩子的运作方式。

They follow a common pattern: a *parent* component serves as a test rig for
a *child* component that illustrates one or more of the lifecycle hook methods.

它们遵循了一个常用的模式：用*子组件*演示一个或多个生命周期钩子方法，而*父组件*被当作该*子组件*的测试台。

Here's a brief description of each exercise:

下面是每个练习简短的描述：

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

      Directives have lifecycle hooks too.
      A `SpyDirective` can log when the element it spies upon is
      created or destroyed using the `ngOnInit` and `ngOnDestroy` hooks.

      指令也同样有生命周期钩子。`SpyDirective` 可以利用 `ngOnInit` 和 `ngOnDestroy` 钩子在它所监视的每个元素被创建或销毁时输出日志。

      This example applies the `SpyDirective` to a `<div>` in an `ngFor` *hero* repeater
      managed by the parent `SpyComponent`.

      本例把 `SpyDirective` 应用到父组件里的 `ngFor`*英雄*重复器(repeater)的 `<div>` 里面。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#onchanges">OnChanges</a>

    </td>

    <td>

      See how Angular calls the `ngOnChanges()` hook with a `changes` object
      every time one of the component input properties changes.
      Shows how to interpret the `changes` object.

      这里将会看到：每当组件的输入属性发生变化时，Angular 会如何以 `changes` 对象作为参数去调用 `ngOnChanges()` 钩子。
      展示了该如何理解和使用 `changes` 对象。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#docheck">DoCheck</a>

    </td>

    <td>

      Implements an `ngDoCheck()` method with custom change detection.
      See how often Angular calls this hook and watch it post changes to a log.

      实现了一个 `ngDoCheck()` 方法，通过它可以自定义变更检测逻辑。
      这里将会看到：Angular 会用什么频度调用这个钩子，监视它的变化，并把这些变化输出成一条日志。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#afterview">AfterView</a>

    </td>

    <td>

      Shows what Angular means by a *view*.
      Demonstrates the `ngAfterViewInit` and `ngAfterViewChecked` hooks.

      显示 Angular 中的*视图*所指的是什么。
      演示了 `ngAfterViewInit` 和 `ngAfterViewChecked` 钩子。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      <a href="#aftercontent">AfterContent</a>

    </td>

    <td>

      Shows how to project external content into a component and
      how to distinguish projected content from a component's view children.
      Demonstrates the `ngAfterContentInit` and `ngAfterContentChecked` hooks.

      展示如何把外部内容投影进组件中，以及如何区分“投影进来的内容”和“组件的子视图”。
      演示了 `ngAfterContentInit` 和 `ngAfterContentChecked` 钩子。

    </td>

  </tr>
  <tr style='vertical-align:top'>

    <td>

      Counter

      计数器

    </td>

    <td>

      Demonstrates a combination of a component and a directive
      each with its own hooks.

      演示了组件和指令的组合，它们各自有自己的钩子。

      In this example, a `CounterComponent` logs a change (via `ngOnChanges`)
      every time the parent component increments its input counter property.
      Meanwhile, the `SpyDirective` from the previous example is applied
      to the `CounterComponent` log where it watches log entries being created and destroyed.

      在这个例子中，每当父组件递增它的输入属性 `counter` 时，`CounterComponent` 就会通过 `ngOnChanges` 记录一条变更。
      同时，前一个例子中的 `SpyDirective` 被用于在 `CounterComponent` 上提供日志，它可以同时观察到日志的创建和销毁过程。

    </td>

  </tr>
</table>

The remainder of this page discusses selected exercises in further detail.

本文剩下的部分将详细讨论这些练习。

{@a peek-a-boo}

## Peek-a-boo: all hooks

## Peek-a-boo：全部钩子

The `PeekABooComponent` demonstrates all of the hooks in one component.

`PeekABooComponent` 组件演示了组件中所有可能存在的钩子。

You would rarely, if ever, implement all of the interfaces like this.
The peek-a-boo exists to show how Angular calls the hooks in the expected order.

你可能很少、或者永远不会像这里一样实现所有这些接口。
之所以在 peek-a-boo 中这么做，是为了演示 Angular 是如何按照期望的顺序调用这些钩子的。

This snapshot reflects the state of the log after the user clicked the *Create...* button and then the *Destroy...* button.

用户点击**Create...**按钮，然后点击**Destroy...**按钮后，日志的状态如下图所示：

<figure>
  <img src="generated/images/guide/lifecycle-hooks/peek-a-boo.png" alt="Peek-a-boo">
</figure>

The sequence of log messages follows the prescribed hook calling order:
`OnChanges`, `OnInit`, `DoCheck`&nbsp;(3x), `AfterContentInit`, `AfterContentChecked`&nbsp;(3x),
`AfterViewInit`, `AfterViewChecked`&nbsp;(3x), and `OnDestroy`.

日志信息的日志和所规定的钩子调用顺序是一致的：
`OnChanges`、`OnInit`、`DoCheck`&nbsp;(3x)、`AfterContentInit`、`AfterContentChecked`&nbsp;(3x)、
`AfterViewInit`、`AfterViewChecked`&nbsp;(3x)和 `OnDestroy`

<div class="alert is-helpful">

  The constructor isn't an Angular hook *per se*.
  The log confirms that input properties (the `name` property in this case) have no assigned values at construction.

  构造函数本质上不应该算作 Angular 的钩子。
记录确认了在创建期间那些输入属性(这里是 `name` 属性)没有被赋值。

</div>

Had the user clicked the *Update Hero* button, the log would show another `OnChanges` and two more triplets of
`DoCheck`, `AfterContentChecked` and `AfterViewChecked`.
Clearly these three hooks fire *often*. Keep the logic in these hooks as lean as possible!

如果用户点击*Update Hero*按钮，就会看到另一个 `OnChanges` 和至少两组 `DoCheck`、`AfterContentChecked` 和 `AfterViewChecked` 钩子。
显然，这三种钩子被触发了*很多次*，必须让这三种钩子里的逻辑尽可能的精简！

The next examples focus on hook details.

下一个例子就聚焦于这些钩子的细节上。

{@a spy}

## Spying *OnInit* and *OnDestroy*

## 窥探 *OnInit* 和 *OnDestroy*

Go undercover with these two spy hooks to discover when an element is initialized or destroyed.

潜入这两个 spy 钩子来发现一个元素是什么时候被初始化或者销毁的。

This is the perfect infiltration job for a directive.
The heroes will never know they're being watched.

指令是一种完美的渗透方式，这些英雄们永远不会知道该指令的存在。

<div class="alert is-helpful">

  Kidding aside, pay attention to two key points:

  不开玩笑了，注意下面两个关键点：

  1. Angular calls hook methods for *directives* as well as components.<br><br>

     就像对组件一样，Angular 也会对*指令*调用这些钩子方法。<br><br>

  2. A spy directive can provide insight into a DOM object that you cannot change directly.
  Obviously you can't touch the implementation of a native `<div>`.
  You can't modify a third party component either.
  But you can watch both with a directive.

     一个侦探(spy)指令可以让你在无法直接修改 DOM 对象实现代码的情况下，透视其内部细节。
显然，你不能修改一个原生 `<div>` 元素的实现代码。
你同样不能修改第三方组件。
但你用一个指令就能监视它们了。

</div>

The sneaky spy directive is simple, consisting almost entirely of `ngOnInit()` and `ngOnDestroy()` hooks
that log messages to the parent via an injected `LoggerService`.

这个鬼鬼祟祟的侦探指令很简单，几乎完全由 `ngOnInit()` 和 `ngOnDestroy()` 钩子组成，它通过一个注入进来的 `LoggerService` 把消息记录到父组件中去。

<code-example path="lifecycle-hooks/src/app/spy.directive.ts" region="spy-directive" header="src/app/spy.directive.ts" linenums="false"></code-example>

You can apply the spy to any native or component element and it'll be initialized and destroyed
at the same time as that element.
Here it is attached to the repeated hero `<div>`:

你可以把这个侦探指令写到任何原生元素或组件元素上，它将与所在的组件同时初始化和销毁。
下面是把它附加到用来重复显示英雄数据的这个 `<div>` 上。

<code-example path="lifecycle-hooks/src/app/spy.component.html" region="template" header="src/app/spy.component.html" linenums="false"></code-example>

Each spy's birth and death marks the birth and death of the attached hero `<div>`
with an entry in the *Hook Log* as seen here:

每个“侦探”的出生和死亡也同时标记出了存放英雄的那个 `<div>` 的出生和死亡。*钩子记录*中的结构是这样的：

<figure>
  <img src='generated/images/guide/lifecycle-hooks/spy-directive.gif' alt="Spy Directive">
</figure>

Adding a hero results in a new hero `<div>`. The spy's `ngOnInit()` logs that event.

添加一个英雄就会产生一个新的英雄 `<div>`。侦探的 `ngOnInit()` 记录下了这个事件。

The *Reset* button clears the `heroes` list.
Angular removes all hero `<div>` elements from the DOM and destroys their spy directives at the same time.
The spy's `ngOnDestroy()` method reports its last moments.

*Reset* 按钮清除了这个 `heroes` 列表。
Angular 从 DOM 中移除了所有英雄的 div，并且同时销毁了附加在这些 div 上的侦探指令。
侦探的 `ngOnDestroy()` 方法汇报了它自己的临终时刻。

The `ngOnInit()` and `ngOnDestroy()` methods have more vital roles to play in real applications.

在真实的应用程序中，`ngOnInit()` 和 `ngOnDestroy()` 方法扮演着更重要的角色。

{@a oninit}

### _OnInit()_

Use `ngOnInit()` for two main reasons:

使用 `ngOnInit()` 有两个原因：

1. To perform complex initializations shortly after construction.

   在构造函数之后马上执行复杂的初始化逻辑

1. To set up the component after Angular sets the input properties.

   在 Angular 设置完输入属性之后，对该组件进行准备。

Experienced developers agree that components should be cheap and safe to construct.

有经验的开发者会认同组件应该能很便宜和安全的构造出来。

<div class="alert is-helpful">

  Misko Hevery, Angular team lead,
  [explains why](http://misko.hevery.com/code-reviewers-guide/flaw-constructor-does-real-work/)
  you should avoid complex constructor logic.

  Misko Hevery，Angular 项目的组长，在[这里解释](http://misko.hevery.com/code-reviewers-guide/flaw-constructor-does-real-work/)了你为什么应该避免复杂的构造函数逻辑。

</div>

Don't fetch data in a component constructor.
You shouldn't worry that a new component will try to contact a remote server when
created under test or before you decide to display it.
Constructors should do no more than set the initial local variables to simple values.

不要在组件的构造函数中获取数据？
在测试环境下新建组件时或在你决定要显示它之前，不应该担心它会尝试联系远程服务器。
构造函数中除了使用简单的值对局部变量进行初始化之外，什么都不应该做。

An `ngOnInit()` is a good place for a component to fetch its initial data. The
[Tour of Heroes Tutorial](tutorial/toh-pt4#oninit) guide shows how.

`ngOnInit()` 是组件获取初始数据的好地方。[指南](tutorial/toh-pt4#oninit)中讲解了如何这样做。

Remember also that a directive's data-bound input properties are not set until _after construction_.
That's a problem if you need to initialize the directive based on those properties.
They'll have been set when `ngOnInit()` runs.

另外还要记住，在指令的*构造函数完成之前*，那些被绑定的输入属性还都没有值。
如果你需要基于这些属性的值来初始化这个指令，这种情况就会出问题。
而当 `ngOnInit()` 执行的时候，这些属性都已经被正确的赋值过了。

<div class="alert is-helpful">

  The `ngOnChanges()` method is your first opportunity to access those properties.
  Angular calls `ngOnChanges()` before `ngOnInit()` and many times after that.
  It only calls `ngOnInit()` once.

  `ngOnChanges()` 方法是你访问这些属性的第一次机会。Angular 会在 `ngOnInit()` 之前调用 `ngOnChanges()`，之后还会调用很多次。但只会调用一次 `ngOnInit()`。

</div>

You can count on Angular to call the `ngOnInit()` method _soon_ after creating the component.
That's where the heavy initialization logic belongs.

你可以信任 Angular 会在创建组件后立刻调用 `ngOnInit()` 方法。
  这里是放置复杂初始化逻辑的好地方。

{@a ondestroy}

### _OnDestroy()_

Put cleanup logic in `ngOnDestroy()`, the logic that *must* run before Angular destroys the directive.

一些清理逻辑*必须*在 Angular 销毁指令之前运行，把它们放在 `ngOnDestroy()` 中。

This is the time to notify another part of the application that the component is going away.

这是在该组件消失之前，可用来通知应用程序中其它部分的最后一个时间点。

This is the place to free resources that won't be garbage collected automatically.
Unsubscribe from Observables and DOM events. Stop interval timers.
Unregister all callbacks that this directive registered with global or application services.
You risk memory leaks if you neglect to do so.

这里是用来释放那些不会被垃圾收集器自动回收的各类资源的地方。
取消那些对可观察对象和 DOM 事件的订阅。停止定时器。注销该指令曾注册到全局服务或应用级服务中的各种回调函数。
如果不这么做，就会有导致内存泄露的风险。

{@a onchanges}

## _OnChanges()_

Angular calls its `ngOnChanges()` method whenever it detects changes to ***input properties*** of the component (or directive).
This example monitors the `OnChanges` hook.

一旦检测到该组件(或指令)的***输入属性***发生了变化，Angular 就会调用它的 `ngOnChanges()` 方法。
本例监控 `OnChanges` 钩子。

<code-example path="lifecycle-hooks/src/app/on-changes.component.ts" region="ng-on-changes" header="on-changes.component.ts (excerpt)" linenums="false"></code-example>

The `ngOnChanges()` method takes an object that maps each changed property name to a
[SimpleChange](api/core/SimpleChange) object holding the current and previous property values.
This hook iterates over the changed properties and logs them.

`ngOnChanges()` 方法获取了一个对象，它把每个发生变化的属性名都映射到了一个[SimpleChange](api/core/SimpleChange)对象，
该对象中有属性的当前值和前一个值。这个钩子会在这些发生了变化的属性上进行迭代，并记录它们。

The example component, `OnChangesComponent`, has two input properties: `hero` and `power`.

这个例子中的 `OnChangesComponent` 组件有两个输入属性：`hero` 和 `power`。

<code-example path="lifecycle-hooks/src/app/on-changes.component.ts" region="inputs" header="src/app/on-changes.component.ts" linenums="false"></code-example>

The host `OnChangesParentComponent` binds to them like this:

宿主 `OnChangesParentComponent` 绑定了它们，就像这样：

<code-example path="lifecycle-hooks/src/app/on-changes-parent.component.html" region="on-changes" header="src/app/on-changes-parent.component.html"></code-example>

Here's the sample in action as the user makes changes.

下面是此例子中的当用户做出更改时的操作演示：

<figure>
  <img src='generated/images/guide/lifecycle-hooks/on-changes-anim.gif' alt="OnChanges">
</figure>

The log entries appear as the string value of the *power* property changes.
But the `ngOnChanges` does not catch changes to `hero.name`
That's surprising at first.

当 *power* 属性的字符串值变化时，相应的日志就出现了。
但是 `ngOnChanges` 并没有捕捉到 `hero.name` 的变化。
这是第一个意外。

Angular only calls the hook when the value of the input property changes.
The value of the `hero` property is the *reference to the hero object*.
Angular doesn't care that the hero's own `name` property changed.
The hero object *reference* didn't change so, from Angular's perspective, there is no change to report!

Angular 只会在输入属性的值变化时调用这个钩子。
而 `hero` 属性的值是一个*到英雄对象的引用*。
Angular 不会关注这个英雄对象的 `name` 属性的变化。
这个英雄对象的*引用*没有发生变化，于是从 Angular 的视角看来，也就没有什么需要报告的变化了。

{@a docheck}

## _DoCheck()_

Use the `DoCheck` hook to detect and act upon changes that Angular doesn't catch on its own.

使用 `DoCheck` 钩子来检测那些 Angular 自身无法捕获的变更并采取行动。

<div class="alert is-helpful">

  Use this method to detect a change that Angular overlooked.

  用这个方法来检测那些被 Angular 忽略的更改。

</div>

The *DoCheck* sample extends the *OnChanges* sample with the following `ngDoCheck()` hook:

*DoCheck* 范例通过下面的 `ngDoCheck()` 钩子扩展了 *OnChanges* 范例：

<code-example path="lifecycle-hooks/src/app/do-check.component.ts" region="ng-do-check" header="DoCheckComponent (ngDoCheck)" linenums="false"></code-example>

This code inspects certain _values of interest_, capturing and comparing their current state against previous values.
It writes a special message to the log when there are no substantive changes to the `hero` or the `power`
so you can see how often `DoCheck` is called. The results are illuminating:

该代码检测一些**相关的值**，捕获当前值并与以前的值进行比较。
当英雄或它的超能力发生了非实质性改变时，就会往日志中写一条特殊的消息。
这样你可以看到 `DoCheck` 被调用的频率。结果非常显眼：

<figure>
  <img src='generated/images/guide/lifecycle-hooks/do-check-anim.gif' alt="DoCheck">
</figure>

While the `ngDoCheck()` hook can detect when the hero's `name` has changed, it has a frightful cost.
This hook is called with enormous frequency&mdash;after _every_
change detection cycle no matter where the change occurred.
It's called over twenty times in this example before the user can do anything.

虽然 `ngDoCheck()` 钩子可以可以监测到英雄的 `name` 什么时候发生了变化。但其开销很恐怖。
这个 `ngDoCheck` 钩子被非常频繁的调用 —— 在*每次*变更检测周期之后，发生了变化的每个地方都会调它。
在这个例子中，用户还没有做任何操作之前，它就被调用了超过二十次。

Most of these initial checks are triggered by Angular's first rendering of *unrelated data elsewhere on the page*.
Mere mousing into another `<input>` triggers a call.
Relatively few calls reveal actual changes to pertinent data.
Clearly our implementation must be very lightweight or the user experience suffers.

大部分检查的第一次调用都是在 Angular 首次渲染该页面中*其它不相关数据*时触发的。
仅仅把鼠标移到其它 `<input>` 中就会触发一次调用。
只有相对较少的调用才是由于对相关数据的修改而触发的。
显然，我们的实现必须非常轻量级，否则将损害用户体验。

{@a afterview}

## AfterView

The *AfterView* sample explores the `AfterViewInit()` and `AfterViewChecked()` hooks that Angular calls
*after* it creates a component's child views.

*AfterView* 例子展示了 `AfterViewInit()` 和 `AfterViewChecked()` 钩子，Angular 会在每次创建了组件的子视图后调用它们。

Here's a child view that displays a hero's name in an `<input>`:

下面是一个子视图，它用来把英雄的名字显示在一个 `<input>` 中：

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="child-view" header="ChildComponent" linenums="false"></code-example>

The `AfterViewComponent` displays this child view *within its template*:

`AfterViewComponent` 把这个子视图显示*在它的模板中*：

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="template" header="AfterViewComponent (template)" linenums="false"></code-example>

The following hooks take action based on changing values *within the child view*,
which can only be reached by querying for the child view via the property decorated with
[@ViewChild](api/core/ViewChild).

下列钩子基于*子视图中*的每一次数据变更采取行动，它只能通过带[@ViewChild](api/core/ViewChild)装饰器的属性来访问子视图。

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="hooks" header="AfterViewComponent (class excerpts)" linenums="false"></code-example>

{@a wait-a-tick}

### Abide by the unidirectional data flow rule

### 遵循单向数据流规则

The `doSomething()` method updates the screen when the hero name exceeds 10 characters.

当英雄的名字超过 10 个字符时，`doSomething()` 方法就会更新屏幕。

<code-example path="lifecycle-hooks/src/app/after-view.component.ts" region="do-something" header="AfterViewComponent (doSomething)" linenums="false"></code-example>

Why does the `doSomething()` method wait a tick before updating `comment`?

为什么在更新 `comment` 属性之前，`doSomething()` 方法要等上一拍(tick)？

Angular's unidirectional data flow rule forbids updates to the view *after* it has been composed.
Both of these hooks fire _after_ the component's view has been composed.

Angular 的“单向数据流”规则禁止在一个视图已经被组合好*之后*再更新视图。
而这两个钩子都是在组件的视图已经被组合好之后触发的。

Angular throws an error if the hook updates the component's data-bound `comment` property immediately (try it!).
The `LoggerService.tick_then()` postpones the log update
for one turn of the browser's JavaScript cycle and that's just long enough.

如果立即更新组件中被绑定的 `comment` 属性，Angular 就会抛出一个错误(试试!)。
`LoggerService.tick_then()` 方法延迟更新日志一个回合（浏览器 JavaScript 周期回合），这样就够了。

Here's *AfterView* in action:

这里是 *AfterView* 的操作演示：

<figure>
  <img src='generated/images/guide/lifecycle-hooks/after-view-anim.gif' alt="AfterView">
</figure>

Notice that Angular frequently calls `AfterViewChecked()`, often when there are no changes of interest.
Write lean hook methods to avoid performance problems.

注意，Angular 会频繁的调用 `AfterViewChecked()`，甚至在并没有需要关注的更改时也会触发。
所以务必把这个钩子方法写得尽可能精简，以免出现性能问题。

{@a aftercontent}

## AfterContent

The *AfterContent* sample explores the `AfterContentInit()` and `AfterContentChecked()` hooks that Angular calls
*after* Angular projects external content into the component.

*AfterContent* 例子展示了 `AfterContentInit()` 和 `AfterContentChecked()` 钩子，Angular 会在外来内容被投影到组件中*之后*调用它们。

{@a content-projection}

### Content projection

### 内容投影

*Content projection* is a way to import HTML content from outside the component and insert that content
into the component's template in a designated spot.

*内容投影*是从组件外部导入 HTML 内容，并把它插入在组件模板中指定位置上的一种途径。

<div class="alert is-helpful">

  AngularJS developers know this technique as *transclusion*.

  AngularJS 的开发者大概知道一项叫做 *transclusion* 的技术，对，这就是它的马甲。

</div>

Consider this variation on the [previous _AfterView_](guide/lifecycle-hooks#afterview) example.
This time, instead of including the child view within the template, it imports the content from
the `AfterContentComponent`'s parent. Here's the parent's template:

对比[前一个](guide/lifecycle-hooks#afterview)例子考虑这个变化。
这次不再通过模板来把子视图包含进来，而是改为从 `AfterContentComponent` 的父组件中导入它。下面是父组件的模板：

<code-example path="lifecycle-hooks/src/app/after-content.component.ts" region="parent-template" header="AfterContentParentComponent (template excerpt)" linenums="false"></code-example>

Notice that the `<app-child>` tag is tucked between the `<after-content>` tags.
Never put content between a component's element tags *unless you intend to project that content
into the component*.

注意，`<app-child>` 标签被包含在 `<after-content>` 标签中。
永远不要在组件标签的内部放任何内容 —— *除非你想把这些内容投影进这个组件中*。

Now look at the component's template:

现在来看下 `<after-content>` 组件的模板：

<code-example path="lifecycle-hooks/src/app/after-content.component.ts" region="template" header="AfterContentComponent (template)" linenums="false"></code-example>

The `<ng-content>` tag is a *placeholder* for the external content.
It tells Angular where to insert that content.
In this case, the projected content is the `<app-child>` from the parent.

`<ng-content>` 标签是外来内容的*占位符*。
它告诉 Angular 在哪里插入这些外来内容。
在这里，被投影进去的内容就是来自父组件的 `<app-child>` 标签。

<figure>
  <img src='generated/images/guide/lifecycle-hooks/projected-child-view.png' alt="Projected Content">
</figure>

<div class="alert is-helpful">

  The telltale signs of *content projection* are twofold:

  下列迹象表明存在着*内容投影*：

  * HTML between component element tags.

     在组件的元素标签中有 HTML

  * The presence of `<ng-content>` tags in the component's template.

     组件的模板中出现了 `<ng-content>` 标签

</div>

{@a aftercontent-hooks}

### AfterContent hooks

### AfterContent 钩子

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

<code-example path="lifecycle-hooks/src/app/after-content.component.ts" region="hooks" header="AfterContentComponent (class excerpts)" linenums="false"></code-example>

{@a no-unidirectional-flow-worries}

### No unidirectional flow worries with _AfterContent_

### 使用 **AfterContent** 时，无需担心单向数据流规则

This component's `doSomething()` method update's the component's data-bound `comment` property immediately.
There's no [need to wait](guide/lifecycle-hooks#wait-a-tick).

该组件的 `doSomething()` 方法立即更新了组件被绑定的 `comment` 属性。
它[不用等](guide/lifecycle-hooks#wait-a-tick)下一回合。

Recall that Angular calls both *AfterContent* hooks before calling either of the *AfterView* hooks.
Angular completes composition of the projected content *before* finishing the composition of this component's view.
There is a small window between the `AfterContent...` and `AfterView...` hooks to modify the host view.

回忆一下，Angular 在每次调用 *AfterView* 钩子之前也会同时调用 *AfterContent*。
Angular 在完成当前组件的视图合成之前，就已经完成了被投影内容的合成。
所以你仍然有机会去修改那个视图。
