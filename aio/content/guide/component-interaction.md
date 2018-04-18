# Component Interaction

# 组件之间的交互

{@a top}

This cookbook contains recipes for common component communication scenarios
in which two or more components share information.

本烹饪宝典包含了常见的组件通讯场景，也就是让两个或多个组件之间共享信息的方法。

{@a toc}

<!--

# Contents

# 目录

* [Pass data from parent to child with input binding](guide/component-interaction#parent-to-child)

   [使用输入绑定把数据从父组件传给子组件](guide/component-interaction#parent-to-child)

* [Intercept input property changes with a setter](guide/component-interaction#parent-to-child-setter)

   [使用赋值器（setter）拦截输入属性的变化](guide/component-interaction#parent-to-child-setter)

* [Intercept input property changes with `ngOnChanges()`](guide/component-interaction#parent-to-child-on-changes)

   [使用 `ngOnChanges()` 拦截输入属性的变化](guide/component-interaction#parent-to-child-on-changes)

* [Parent calls an `@ViewChild()`](guide/component-interaction#parent-to-view-child)

   [在父组件中调用 `@ViewChild()`](guide/component-interaction#parent-to-view-child)

* [Parent and children communicate via a service](guide/component-interaction#bidirectional-service)

   [通过服务进行父子通讯](guide/component-interaction#bidirectional-service)

-->

**See the <live-example name="component-interaction"></live-example>**.

**参见<live-example name="component-interaction"></live-example>**。

{@a parent-to-child}

## Pass data from parent to child with input binding

## 通过输入型绑定把数据从父组件传到子组件。

`HeroChildComponent` has two ***input properties***,
typically adorned with [@Input decorations](guide/template-syntax#inputs-outputs).

`HeroChildComponent` 有两个***输入型属性***，它们通常带[@Input 装饰器](guide/template-syntax#inputs-outputs)。

<code-example path="component-interaction/src/app/hero-child.component.ts" title="component-interaction/src/app/hero-child.component.ts">

</code-example>

The second `@Input` aliases the child component property name `masterName` as `'master'`.

第二个 `@Input` 为子组件的属性名 `masterName` 指定一个别名 `master`(译者注：不推荐为起别名，请参见风格指南).

The `HeroParentComponent` nests the child `HeroChildComponent` inside an `*ngFor` repeater,
binding its `master` string property to the child's `master` alias,
and each iteration's `hero` instance to the child's `hero` property.

父组件 `HeroParentComponent` 把子组件的 `HeroChildComponent` 放到 `*ngFor` 循环器中，把自己的 `master` 字符串属性绑定到子组件的 `master` 别名上，并把每个循环的 `hero` 实例绑定到子组件的 `hero` 属性。

<code-example path="component-interaction/src/app/hero-parent.component.ts" title="component-interaction/src/app/hero-parent.component.ts">

</code-example>

The running application displays three heroes:

运行应用程序会显示三个英雄：

<figure>
  <img src="generated/images/guide/component-interaction/parent-to-child.png" alt="Parent-to-child">
</figure>

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

E2E test that all children were instantiated and displayed as expected:

端到端测试，用于确保所有的子组件都像所期待的那样被初始化并显示出来。

<code-example path="component-interaction/e2e/app.e2e-spec.ts" region="parent-to-child" title="component-interaction/e2e/app.e2e-spec.ts">

</code-example>

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)

{@a parent-to-child-setter}

## Intercept input property changes with a setter

## 通过 setter 截听输入属性值的变化

Use an input property setter to intercept and act upon a value from the parent.

使用一个输入属性的 setter，以拦截父组件中值的变化，并采取行动。

The setter of the `name` input property in the child `NameChildComponent`
trims the whitespace from a name and replaces an empty value with default text.

子组件 `NameChildComponent` 的输入属性 `name` 上的这个 setter，会 trim 掉名字里的空格，并把空值替换成默认字符串。

<code-example path="component-interaction/src/app/name-child.component.ts" title="component-interaction/src/app/name-child.component.ts">

</code-example>

Here's the `NameParentComponent` demonstrating name variations including a name with all spaces:

下面的 `NameParentComponent` 展示了各种名字的处理方式，包括一个全是空格的名字。

<code-example path="component-interaction/src/app/name-parent.component.ts" title="component-interaction/src/app/name-parent.component.ts">

</code-example>

<figure>
  <img src="generated/images/guide/component-interaction/setter.png" alt="Parent-to-child-setter">
</figure>

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

E2E tests of input property setter with empty and non-empty names:

端到端测试：输入属性的 setter，分别使用空名字和非空名字。

<code-example path="component-interaction/e2e/app.e2e-spec.ts" region="parent-to-child-setter" title="component-interaction/e2e/app.e2e-spec.ts">

</code-example>

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)

{@a parent-to-child-on-changes}

## Intercept input property changes with *ngOnChanges()*

## 通过*ngOnChanges()*来截听输入属性值的变化

Detect and act upon changes to input property values with the `ngOnChanges()` method of the `OnChanges` lifecycle hook interface.

使用 `OnChanges` 生命周期钩子接口的 `ngOnChanges()` 方法来监测输入属性值的变化并做出回应。

<div class="l-sub-section">

You may prefer this approach to the property setter when watching multiple, interacting input properties.

当需要监视多个、交互式输入属性的时候，本方法比用属性的 setter 更合适。

Learn about `ngOnChanges()` in the [LifeCycle Hooks](guide/lifecycle-hooks) chapter.

学习关于 `ngOnChanges()` 的更多知识，参见[生命周期钩子](guide/lifecycle-hooks)一章。

</div>

This `VersionChildComponent` detects changes to the `major` and `minor` input properties and composes a log message reporting these changes:

这个 `VersionChildComponent` 会监测输入属性 `major` 和 `minor` 的变化，并把这些变化编写成日志以报告这些变化。

<code-example path="component-interaction/src/app/version-child.component.ts" title="component-interaction/src/app/version-child.component.ts">

</code-example>

The `VersionParentComponent` supplies the `minor` and `major` values and binds buttons to methods that change them.

`VersionParentComponent` 提供 `minor` 和 `major` 值，把修改它们值的方法绑定到按钮上。

<code-example path="component-interaction/src/app/version-parent.component.ts" title="component-interaction/src/app/version-parent.component.ts">

</code-example>

Here's the output of a button-pushing sequence:

下面是点击按钮的结果。

<figure>
  <img src="generated/images/guide/component-interaction/parent-to-child-on-changes.gif" alt="Parent-to-child-onchanges">
</figure>

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

Test that ***both*** input properties are set initially and that button clicks trigger
the expected `ngOnChanges` calls and values:

测试确保***这两个***输入属性值都被初始化了，当点击按钮后，`ngOnChanges` 应该被调用，属性的值也符合预期。

<code-example path="component-interaction/e2e/app.e2e-spec.ts" region="parent-to-child-onchanges" title="component-interaction/e2e/app.e2e-spec.ts">

</code-example>

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)

{@a child-to-parent}

## Parent listens for child event

## 父组件监听子组件的事件

The child component exposes an `EventEmitter` property with which it `emits` events when something happens.
The parent binds to that event property and reacts to those events.

子组件暴露一个 `EventEmitter` 属性，当事件发生时，子组件利用该属性 `emits`(向上弹射)事件。父组件绑定到这个事件属性，并在事件发生时作出回应。

The child's `EventEmitter` property is an ***output property***,
  typically adorned with an [@Output decoration](guide/template-syntax#inputs-outputs)
  as seen in this `VoterComponent`:

子组件的 `EventEmitter` 属性是一个**输出属性**，通常带有[@Output 装饰器](guide/template-syntax#inputs-outputs)，就像在 `VoterComponent` 中看到的。

<code-example path="component-interaction/src/app/voter.component.ts" title="component-interaction/src/app/voter.component.ts">

</code-example>

Clicking a button triggers emission of a `true` or `false`, the boolean *payload*.

点击按钮会触发 `true` 或 `false`(布尔型*有效载荷*)的事件。

The parent `VoteTakerComponent` binds an event handler called `onVoted()` that responds to the child event
payload `$event` and updates a counter.

父组件 `VoteTakerComponent` 绑定了一个事件处理器(`onVoted()`)，用来响应子组件的事件(`$event`)并更新一个计数器。

<code-example path="component-interaction/src/app/votetaker.component.ts" title="component-interaction/src/app/votetaker.component.ts">

</code-example>

The framework passes the event argument&mdash;represented by `$event`&mdash;to the handler method,
and the method processes it:

框架(Angular)把事件参数(用 `$event` 表示)传给事件处理方法，这个方法会处理：

<figure>
  <img src="generated/images/guide/component-interaction/child-to-parent.gif" alt="Child-to-parent">
</figure>

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

Test that clicking the *Agree* and *Disagree* buttons update the appropriate counters:

测试确保点击 *Agree* 和 *Disagree* 按钮时，计数器被正确更新。

<code-example path="component-interaction/e2e/app.e2e-spec.ts" region="child-to-parent" title="component-interaction/e2e/app.e2e-spec.ts">

</code-example>

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)

## Parent interacts with child via *local variable*

## 父组件与子组件通过*本地变量*互动

A parent component cannot use data binding to read child properties
or invoke child methods. You can do both
by creating a template reference variable for the child element
and then reference that variable *within the parent template*
as seen in the following example.

父组件不能使用数据绑定来读取子组件的属性或调用子组件的方法。但可以在父组件模板里，新建一个本地变量来代表子组件，然后利用这个变量来读取子组件的属性和调用子组件的方法，如下例所示。

{@a countdown-timer-example}

The following is a child `CountdownTimerComponent` that repeatedly counts down to zero and launches a rocket.
It has `start` and `stop` methods that control the clock and it displays a
countdown status message in its own template.

子组件 `CountdownTimerComponent` 进行倒计时，归零时发射一个导弹。`start` 和 `stop` 方法负责控制时钟并在模板里显示倒计时的状态信息。

<code-example path="component-interaction/src/app/countdown-timer.component.ts" title="component-interaction/src/app/countdown-timer.component.ts">

</code-example>

The `CountdownLocalVarParentComponent` that hosts the timer component is as follows:

计时器组件的宿主组件 `CountdownLocalVarParentComponent` 如下：

<code-example path="component-interaction/src/app/countdown-parent.component.ts" region="lv" title="component-interaction/src/app/countdown-parent.component.ts">

</code-example>

The parent component cannot data bind to the child's
`start` and `stop` methods nor to its `seconds` property.

父组件不能通过数据绑定使用子组件的 `start` 和 `stop` 方法，也不能访问子组件的 `seconds` 属性。

You can place a local variable, `#timer`, on the tag `<countdown-timer>` representing the child component.
That gives you a reference to the child component and the ability to access
*any of its properties or methods* from within the parent template.

把本地变量(`#timer`)放到(`<countdown-timer>`)标签中，用来代表子组件。这样父组件的模板就得到了子组件的引用，于是可以在父组件的模板中访问子组件的所有属性和方法。

This example wires parent buttons to the child's `start` and `stop` and
uses interpolation to display the child's `seconds` property.

这个例子把父组件的按钮绑定到子组件的 `start` 和 `stop` 方法，并用插值表达式来显示子组件的 `seconds` 属性。

Here we see the parent and child working together.

下面是父组件和子组件一起工作时的效果。

<figure>
  <img src="generated/images/guide/component-interaction/countdown-timer-anim.gif" alt="countdown timer">
</figure>

{@a countdown-tests}

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

Test that the seconds displayed in the parent template
match the seconds displayed in the child's status message.
Test also that clicking the *Stop* button pauses the countdown timer:

测试确保在父组件模板中显示的秒数和子组件状态信息里的秒数同步。它还会点击 *Stop* 按钮来停止倒计时：

<code-example path="component-interaction/e2e/app.e2e-spec.ts" region="countdown-timer-tests" title="component-interaction/e2e/app.e2e-spec.ts">

</code-example>

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)

{@a parent-to-view-child}

## Parent calls an _@ViewChild()_

## 父组件调用*@ViewChild()*

The *local variable* approach is simple and easy. But it is limited because
the parent-child wiring must be done entirely within the parent template.
The parent component *itself* has no access to the child.

这个*本地变量*方法是个简单便利的方法。但是它也有局限性，因为父组件-子组件的连接必须全部在父组件的模板中进行。父组件本身的代码对子组件没有访问权。

You can't use the *local variable* technique if an instance of the parent component *class*
must read or write child component values or must call child component methods.

如果父组件的*类*需要读取子组件的属性值或调用子组件的方法，就不能使用*本地变量*方法。

When the parent component *class* requires that kind of access,
***inject*** the child component into the parent as a *ViewChild*.

当父组件*类*需要这种访问时，可以把子组件作为 *ViewChild*，***注入***到父组件里面。

The following example illustrates this technique with the same
[Countdown Timer](guide/component-interaction#countdown-timer-example) example.
Neither its appearance nor its behavior will change.
The child [CountdownTimerComponent](guide/component-interaction#countdown-timer-example) is the same as well.

下面的例子用与[倒计时](guide/component-interaction#countdown-timer-example)相同的范例来解释这种技术。
它的外观或行为没有变化。子组件[CountdownTimerComponent](guide/component-interaction#countdown-timer-example)也和原来一样。

<div class="l-sub-section">

The switch from the *local variable* to the *ViewChild* technique
is solely for the purpose of demonstration.

由*本地变量*切换到 *ViewChild* 技术的唯一目的就是做示范。

</div>

Here is the parent, `CountdownViewChildParentComponent`:

下面是父组件 `CountdownViewChildParentComponent`:

<code-example path="component-interaction/src/app/countdown-parent.component.ts" region="vc" title="component-interaction/src/app/countdown-parent.component.ts">

</code-example>

It takes a bit more work to get the child view into the parent component *class*.

把子组件的视图插入到父组件类需要做一点额外的工作。

First, you have to import references to the `ViewChild` decorator and the `AfterViewInit` lifecycle hook.

首先，你要使用 `ViewChild` 装饰器导入这个引用，并挂上 `AfterViewInit` 生命周期钩子。

Next, inject the child `CountdownTimerComponent` into the private `timerComponent` property
via the `@ViewChild` property decoration.

接着，通过 `@ViewChild` 属性装饰器，将子组件 `CountdownTimerComponent` 注入到私有属性 `timerComponent` 里面。

The `#timer` local variable is gone from the component metadata.
Instead, bind the buttons to the parent component's own `start` and `stop` methods and
present the ticking seconds in an interpolation around the parent component's `seconds` method.

组件元数据里就不再需要 `#timer` 本地变量了。而是把按钮绑定到父组件自己的 `start` 和 `stop` 方法，使用父组件的 `seconds` 方法的插值表达式来展示秒数变化。

These methods access the injected timer component directly.

这些方法可以直接访问被注入的计时器组件。

The `ngAfterViewInit()` lifecycle hook is an important wrinkle.
The timer component isn't available until *after* Angular displays the parent view.
So it displays `0` seconds initially.

`ngAfterViewInit()` 生命周期钩子是非常重要的一步。被注入的计时器组件只有在 Angular 显示了父组件视图之后才能访问，所以它先把秒数显示为 0.

Then Angular calls the `ngAfterViewInit` lifecycle hook at which time it is *too late*
to update the parent view's display of the countdown seconds.
Angular's unidirectional data flow rule prevents updating the parent view's
in the same cycle. The app has to *wait one turn* before it can display the seconds.

然后 Angular 会调用 `ngAfterViewInit` 生命周期钩子，但这时候再更新父组件视图的倒计时就已经太晚了。Angular 的单向数据流规则会阻止在同一个周期内更新父组件视图。应用在显示秒数之前会被迫*再等一轮*。

Use `setTimeout()` to wait one tick and then revise the `seconds()` method so
that it takes future values from the timer component.

使用 `setTimeout()` 来等下一轮，然后改写 `seconds()` 方法，这样它接下来就会从注入的这个计时器组件里获取秒数的值。

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

Use [the same countdown timer tests](guide/component-interaction#countdown-tests) as before.

使用和之前[一样的倒计时测试](guide/component-interaction#countdown-tests)。

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)

{@a bidirectional-service}

## Parent and children communicate via a service

## 父组件和子组件通过服务来通讯

A parent component and its children share a service whose interface enables bi-directional communication
*within the family*.

父组件和它的子组件共享同一个服务，利用该服务*在家庭内部*实现双向通讯。

The scope of the service instance is the parent component and its children.
Components outside this component subtree have no access to the service or their communications.

该服务实例的作用域被限制在父组件和其子组件内。这个组件子树之外的组件将无法访问该服务或者与它们通讯。

This `MissionService` connects the `MissionControlComponent` to multiple `AstronautComponent` children.

这个 `MissionService` 把 `MissionControlComponent` 和多个 `AstronautComponent` 子组件连接起来。

<code-example path="component-interaction/src/app/mission.service.ts" title="component-interaction/src/app/mission.service.ts">

</code-example>

The `MissionControlComponent` both provides the instance of the service that it shares with its children
(through the `providers` metadata array) and injects that instance into itself through its constructor:

`MissionControlComponent` 提供服务的实例，并将其共享给它的子组件(通过 `providers` 元数据数组)，子组件可以通过构造函数将该实例注入到自身。

<code-example path="component-interaction/src/app/missioncontrol.component.ts" title="component-interaction/src/app/missioncontrol.component.ts">

</code-example>

The `AstronautComponent` also injects the service in its constructor.
Each `AstronautComponent` is a child of the `MissionControlComponent` and therefore receives its parent's service instance:

`AstronautComponent` 也通过自己的构造函数注入该服务。由于每个 `AstronautComponent` 都是 `MissionControlComponent` 的子组件，所以它们获取到的也是父组件的这个服务实例。

<code-example path="component-interaction/src/app/astronaut.component.ts" title="component-interaction/src/app/astronaut.component.ts">

</code-example>

<div class="l-sub-section">

Notice that this example captures the `subscription` and `unsubscribe()` when the `AstronautComponent` is destroyed.
This is a memory-leak guard step. There is no actual risk in this app because the
lifetime of a `AstronautComponent` is the same as the lifetime of the app itself.
That *would not* always be true in a more complex application.

注意，这个例子保存了 `subscription` 变量，并在 `AstronautComponent` 被销毁时调用 `unsubscribe()` 退订。
这是一个用于防止内存泄漏的保护措施。实际上，在这个应用程序中并没有这个风险，因为 `AstronautComponent` 的生命期和应用程序的生命期一样长。但在更复杂的应用程序环境中就不一定了。

You don't add this guard to the `MissionControlComponent` because, as the parent,
it controls the lifetime of the `MissionService`.

不需要在 `MissionControlComponent` 中添加这个保护措施，因为它作为父组件，控制着 `MissionService` 的生命期。

</div>

The *History* log demonstrates that messages travel in both directions between
the parent `MissionControlComponent` and the `AstronautComponent` children,
facilitated by the service:

*History* 日志证明了：在父组件 `MissionControlComponent` 和子组件 `AstronautComponent` 之间，信息通过该服务实现了双向传递。

<figure>
  <img src="generated/images/guide/component-interaction/bidirectional-service.gif" alt="bidirectional-service">
</figure>

<h3 class="no-toc">Test it</h3>

<h3 class="no-toc">测试一下！</h3>

Tests click buttons of both the parent `MissionControlComponent` and the `AstronautComponent` children
and verify that the history meets expectations:

测试确保点击父组件 `MissionControlComponent` 和子组件 `AstronautComponent` 两个的组件的按钮时，*History* 日志和预期的一样。

<code-example path="component-interaction/e2e/app.e2e-spec.ts" region="bidirectional-service" title="component-interaction/e2e/app.e2e-spec.ts">

</code-example>

[Back to top](guide/component-interaction#top)

[回到顶部](guide/component-interaction#top)
