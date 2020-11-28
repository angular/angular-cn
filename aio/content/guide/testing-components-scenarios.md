# Component testing scenarios

# 组件测试场景

This guide explores common component testing use cases.

本指南探讨了一些常见的组件测试用例。

<div class="alert is-helpful">

  For the sample app that the testing guides describe, see the <live-example name="testing" embedded-style noDownload>sample app</live-example>.

  对于本测试指南中描述的范例应用，参阅<live-example name="testing" embedded-style noDownload>范例应用</live-example>。

  For the tests features in the testing guides, see <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>.

  要了解本测试指南中涉及的测试特性，请参阅<live-example name="testing" stackblitz="specs" noDownload>tests</live-example>。

</div>

## Component binding

## 组件绑定

In the example app, the `BannerComponent` presents static title text in the HTML template.

在范例应用中，`BannerComponent` 在 HTML 模板中展示了静态的标题文本。

After a few changes, the `BannerComponent` presents a dynamic title by binding to
the component's `title` property like this.

在少许更改之后，`BannerComponent` 就会通过绑定组件的 `title` 属性来渲染动态标题。

<code-example
  path="testing/src/app/banner/banner.component.ts"
  region="component"
  header="app/banner/banner.component.ts"></code-example>

As minimal as this is, you decide to add a test to confirm that component
actually displays the right content where you think it should.

尽管这很小，但你还是决定要添加一个测试来确认该组件实际显示的是你认为合适的内容。

#### Query for the _&lt;h1&gt;_

#### 查询 *&lt;h1>* 元素

You'll write a sequence of tests that inspect the value of the `<h1>` element
that wraps the _title_ property interpolation binding.

你将编写一系列测试来检查 `<h1>` 元素中包裹的 *title* 属性插值绑定。

You update the `beforeEach` to find that element with a standard HTML `querySelector`
and assign it to the `h1` variable.

你可以修改 `beforeEach` 以找到带有标准 HTML `querySelector` 的元素，并把它赋值给 `h1` 变量。

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="setup"
  header="app/banner/banner.component.spec.ts (setup)"></code-example>

{@a detect-changes}

#### _createComponent()_ does not bind data

#### *createComponent()* 不绑定数据

For your first test you'd like to see that the screen displays the default `title`.
Your instinct is to write a test that immediately inspects the `<h1>` like this:

对于你的第一个测试，你希望屏幕上显示默认的 `title` 。你的直觉就是编写一个能立即检查 `<h1>` 的测试，就像这样：

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="expect-h1-default-v1">
</code-example>

_That test fails_ with the message:

*那个测试失败*了：

```javascript
expected '' to contain 'Test Tour of Heroes'.
```

Binding happens when Angular performs **change detection**.

**当 Angular 执行变更检测**时就会发生绑定。

In production, change detection kicks in automatically
when Angular creates a component or the user enters a keystroke or
an asynchronous activity (e.g., AJAX) completes.

在生产环境中，当 Angular 创建一个组件，或者用户输入击键，或者异步活动（比如 AJAX）完成时，就会自动进行变更检测。

The `TestBed.createComponent` does _not_ trigger change detection; a fact confirmed in the revised test:

该 `TestBed.createComponent` *不会*触发变化检测，修改后的测试可以证实这一点：

<code-example
  path="testing/src/app/banner/banner.component.spec.ts" region="test-w-o-detect-changes"></code-example>

#### _detectChanges()_

You must tell the `TestBed` to perform data binding by calling `fixture.detectChanges()`.
Only then does the `<h1>` have the expected title.

你必须通过调用 `fixture.detectChanges()` 来告诉 `TestBed` 执行数据绑定。只有这样， `<h1>` 才能拥有预期的标题。

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="expect-h1-default">
</code-example>

Delayed change detection is intentional and useful.
It gives the tester an opportunity to inspect and change the state of
the component _before Angular initiates data binding and calls [lifecycle hooks](guide/lifecycle-hooks)_.

这里延迟变更检测时机是故意而且有用的。这样才能让测试者在 Angular 启动数据绑定并调用[生命周期钩子](guide/lifecycle-hooks)之前，查看并更改组件的状态。

Here's another test that changes the component's `title` property _before_ calling `fixture.detectChanges()`.

这是另一个测试，它会在调用 `fixture.detectChanges()` *之前*改变组件的 `title` 属性。

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="after-change">
</code-example>

{@a auto-detect-changes}

#### Automatic change detection

#### 自动变更检测

The `BannerComponent` tests frequently call `detectChanges`.
Some testers prefer that the Angular test environment run change detection automatically.

`BannerComponent` 测试会经常调用 `detectChanges`。一些测试人员更喜欢让 Angular 测试环境自动运行变更检测。

That's possible by configuring the `TestBed` with the `ComponentFixtureAutoDetect` provider.
First import it from the testing utility library:

可以通过配置带有 `ComponentFixtureAutoDetect` 提供者的 `TestBed` 来实现这一点。我们首先从测试工具函数库中导入它：

<code-example path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="import-ComponentFixtureAutoDetect" header="app/banner/banner.component.detect-changes.spec.ts (import)"></code-example>

Then add it to the `providers` array of the testing module configuration:

然后把它添加到测试模块配置的 `providers` 中：

<code-example path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect" header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect)"></code-example>

Here are three tests that illustrate how automatic change detection works.

这里有三个测试来说明自动变更检测是如何工作的。

<code-example path="testing/src/app/banner/banner.component.detect-changes.spec.ts" region="auto-detect-tests" header="app/banner/banner.component.detect-changes.spec.ts (AutoDetect Tests)"></code-example>

The first test shows the benefit of automatic change detection.

第一个测试显示了自动变更检测的优点。

The second and third test reveal an important limitation.
The Angular testing environment does _not_ know that the test changed the component's `title`.
The `ComponentFixtureAutoDetect` service responds to _asynchronous activities_ such as promise resolution, timers, and DOM events.
But a direct, synchronous update of the component property is invisible.
The test must call `fixture.detectChanges()` manually to trigger another cycle of change detection.

第二个和第三个测试则揭示了一个重要的限制。该 Angular 测试环境*不*知道测试改变了组件的 `title`。 `ComponentFixtureAutoDetect` 服务会响应*异步活动，*例如 Promise、定时器和 DOM 事件。但却看不见对组件属性的直接同步更新。该测试必须用 `fixture.detectChanges()` 来触发另一个变更检测周期。

<div class="alert is-helpful">

Rather than wonder when the test fixture will or won't perform change detection,
the samples in this guide _always call_ `detectChanges()` _explicitly_.
There is no harm in calling `detectChanges()` more often than is strictly necessary.

本指南中的范例总是会*显式*调用 `detectChanges()` ，而不用困惑于测试夹具何时会或不会执行变更检测。更频繁的调用 `detectChanges()` 毫无危害，没必要只在非常必要时才调用它。

</div>

<hr>

{@a dispatch-event}

#### Change an input value with _dispatchEvent()_

#### 使用 *dispatchEvent()* 改变输入框的值

To simulate user input, you can find the input element and set its `value` property.

要模拟用户输入，你可以找到 input 元素并设置它的 `value` 属性。

You will call `fixture.detectChanges()` to trigger Angular's change detection.
But there is an essential, intermediate step.

你会调用 `fixture.detectChanges()` 来触发 Angular 的变更检测。但还有一个重要的中间步骤。

Angular doesn't know that you set the input element's `value` property.
It won't read that property until you raise the element's `input` event by calling `dispatchEvent()`.
_Then_ you call `detectChanges()`.

Angular 并不知道你为 input 设置过 `value` 属性。在通过调用 `dispatchEvent()` 分发 `input` 事件之前，它不会读取该属性。*紧接着*你就调用了 `detectChanges()` 。

The following example demonstrates the proper sequence.

下列例子说明了正确的顺序。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="title-case-pipe" header="app/hero/hero-detail.component.spec.ts (pipe test)"></code-example>

<hr>

## Component with external files

## 包含外部文件的组件

The `BannerComponent` above is defined with an _inline template_ and _inline css_, specified in the `@Component.template` and `@Component.styles` properties respectively.

上面的 `BannerComponent` 是用*内联模板*和*内联 css* 定义的，它们分别是在 `@Component.template` 和 `@Component.styles` 属性中指定的。

Many components specify _external templates_ and _external css_ with the
`@Component.templateUrl` and `@Component.styleUrls` properties respectively,
as the following variant of `BannerComponent` does.

很多组件都会分别用 `@Component.templateUrl` 和 `@Component.styleUrls`属性来指定*外部模板*和*外部 css*，就像下面的 `BannerComponent` 变体一样。

<code-example
  path="testing/src/app/banner/banner-external.component.ts"
  region="metadata"
  header="app/banner/banner-external.component.ts (metadata)"></code-example>

This syntax tells the Angular compiler to read the external files during component compilation.

这个语法告诉 Angular 编译器要在组件编译时读取外部文件。

That's not a problem when you run the CLI `ng test` command because it
_compiles the app before running the tests_.

当运行 `ng test` 命令时，这不是问题，因为它会*在运行测试之前编译应用*。

However, if you run the tests in a **non-CLI environment**,
tests of this component may fail.
For example, if you run the `BannerComponent` tests in a web coding environment such as [plunker](https://plnkr.co/), you'll see a message like this one:

但是，如果在**非 CLI 环境中**运行这些测试，那么这个组件的测试可能会失败。例如，如果你在一个 web 编程环境（比如 [plunker](https://plnkr.co/) 中运行 `BannerComponent` 测试，你会看到如下消息：

<code-example language="sh" class="code-shell" hideCopy>
Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.
</code-example>

You get this test failure message when the runtime environment
compiles the source code _during the tests themselves_.

当运行环境在测试过程中需要编译源代码时，就会得到这条测试失败的消息。

To correct the problem, call `compileComponents()` as explained [below](#compile-components).

要解决这个问题，可以调用 `compileComponents()`，[如下所示](#compile-components)。

{@a component-with-dependency}

## Component with a dependency

## 具有依赖的组件

Components often have service dependencies.

组件通常都有服务依赖。

The `WelcomeComponent` displays a welcome message to the logged in user.
It knows who the user is based on a property of the injected `UserService`:

`WelcomeComponent` 会向登录用户显示一条欢迎信息。它可以基于注入进来的 `UserService` 的一个属性了解到用户是谁：

<code-example path="testing/src/app/welcome/welcome.component.ts" header="app/welcome/welcome.component.ts"></code-example>

The `WelcomeComponent` has decision logic that interacts with the service, logic that makes this component worth testing.
Here's the testing module configuration for the spec file:

`WelcomeComponent` 拥有与该服务交互的决策逻辑，该逻辑让这个组件值得测试。这是 spec 文件的测试模块配置：

<code-example path="testing/src/app/welcome/welcome.component.spec.ts" region="config-test-module" header="app/welcome/welcome.component.spec.ts"></code-example>

This time, in addition to declaring the _component-under-test_,
the configuration adds a `UserService` provider to the `providers` list.
But not the real `UserService`.

这次，除了声明*被测组件外*，该配置还在 `providers` 列表中加入了 `UserService` 提供者。但它不是真正的 `UserService` 。

{@a service-test-doubles}

#### Provide service test doubles

#### 为服务提供测试替身

A _component-under-test_ doesn't have to be injected with real services.
In fact, it is usually better if they are test doubles (stubs, fakes, spies, or mocks).
The purpose of the spec is to test the component, not the service,
and real services can be trouble.

*待测组件*不必注入真正的服务。事实上，如果它们是测试替身（stubs，fakes，spies 或 mocks），通常会更好。该测试规约的目的是测试组件，而不是服务，使用真正的服务可能会遇到麻烦。

Injecting the real `UserService` could be a nightmare.
The real service might ask the user for login credentials and
attempt to reach an authentication server.
These behaviors can be hard to intercept.
It is far easier and safer to create and register a test double in place of the real `UserService`.

注入真正的 `UserService` 可能是个噩梦。真正的服务可能要求用户提供登录凭据，并尝试访问认证服务器。这些行为可能难以拦截。为它创建并注册一个测试专用版来代替真正的 `UserService` 要容易得多，也更安全。

This particular test suite supplies a minimal mock of the `UserService` that satisfies the needs of the `WelcomeComponent` and its tests:

这个特定的测试套件提供了 `UserService` 的最小化模拟，它满足了 `WelcomeComponent` 及其测试的需求：

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="user-service-stub"
  header="app/welcome/welcome.component.spec.ts"></code-example>

{@a get-injected-service}

#### Get injected services

#### 取得所注入的服务

The tests need access to the (stub) `UserService` injected into the `WelcomeComponent`.

这些测试需要访问注入到 `WelcomeComponent` 中的 `UserService` 桩。

Angular has a hierarchical injection system.
There can be injectors at multiple levels, from the root injector created by the `TestBed`
down through the component tree.

Angular 有一个分层注入系统。它具有多个层级的注入器，从 `TestBed` 创建的根注入器开始，直到组件树中的各个层级。

The safest way to get the injected service, the way that **_always works_**,
is to **get it from the injector of the _component-under-test_**.
The component injector is a property of the fixture's `DebugElement`.

获得注入服务的最安全的方式（**始终有效**），就是***从被测组件*的注入器中获取它**。组件注入器是测试夹具所提供的 `DebugElement` 中的一个属性。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="injected-service"
  header="WelcomeComponent's injector">
</code-example>

{@a testbed-inject}

#### _TestBed.inject()_

You _may_ also be able to get the service from the root injector via `TestBed.inject()`.
This is easier to remember and less verbose.
But it only works when Angular injects the component with the service instance in the test's root injector.

你*可能*还可以通过 `TestBed.inject()` 来从根注入器获得服务。这更容易记忆，也不那么啰嗦。但这只有当 Angular 要把根注入器中的服务实例注入测试组件时才是可行的。

In this test suite, the _only_ provider of `UserService` is the root testing module,
so it is safe to call `TestBed.inject()` as follows:

在下面这个测试套件中， `UserService`*唯一的*提供者是根测试模块，因此可以安全地调用 `TestBed.inject()` ，如下所示：

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="inject-from-testbed"
  header="TestBed injector">
</code-example>

<div class="alert is-helpful">

For a use case in which `TestBed.inject()` does not work,
see the [_Override component providers_](#component-override) section that
explains when and why you must get the service from the component's injector instead.

`TestBed.inject()` 不起作用的用例，参阅[*“覆盖组件提供者”*](#component-override)部分，它解释了何时以及为什么必须从该组件自身的注入器中获取该服务。

</div>

{@a welcome-spec-setup}

#### Final setup and tests

#### 最后的设置与测试

Here's the complete `beforeEach()`, using `TestBed.inject()`:

这里是完成的 `beforeEach()` ，它使用了 `TestBed.inject()` ：

<code-example path="testing/src/app/welcome/welcome.component.spec.ts" region="setup" header="app/welcome/welcome.component.spec.ts"></code-example>

And here are some tests:

以下是一些测试：

<code-example path="testing/src/app/welcome/welcome.component.spec.ts" region="tests" header="app/welcome/welcome.component.spec.ts"></code-example>

The first is a sanity test; it confirms that the stubbed `UserService` is called and working.

首先是一个健全性测试；它确认了桩服务 `UserService` 被调用过并能正常工作。

<div class="alert is-helpful">

The second parameter to the Jasmine matcher (e.g., `'expected name'`) is an optional failure label.
If the expectation fails, Jasmine appends this label to the expectation failure message.
In a spec with multiple expectations, it can help clarify what went wrong and which expectation failed.

Jasmine 匹配器的第二个参数（例如 `'expected name'` ）是一个可选的失败标签。如果此期望失败，Jasmine 就会把这个标签贴到期望失败的消息中。在具有多个期望的测试规约中，它可以帮我们澄清出现了什么问题以及都有哪些期望失败了。

</div>

The remaining tests confirm the logic of the component when the service returns different values.
The second test validates the effect of changing the user name.
The third test checks that the component displays the proper message when there is no logged-in user.

当该服务返回不同的值时，其余的测试会确认该组件的逻辑。第二个测试验证了更改用户名的效果。当用户未登录时，第三个测试会检查组件是否显示了正确的消息。

<hr>

{@a component-with-async-service}

## Component with async service

## 带异步服务的组件

In this sample, the `AboutComponent` template hosts a `TwainComponent`.
The `TwainComponent` displays Mark Twain quotes.

在这个例子中，`AboutComponent` 模板托管了一个 `TwainComponent` 。`TwainComponent` 会显示马克·吐温的名言。

<code-example
  path="testing/src/app/twain/twain.component.ts"
  region="template"
  header="app/twain/twain.component.ts (template)"></code-example>

Note that the value of the component's `quote` property passes through an `AsyncPipe`.
That means the property returns either a `Promise` or an `Observable`.

注意，组件的 `quote` 属性值会传给 `AsyncPipe`。这意味着该属性返回了 `Promise` 或 `Observable` 。

In this example, the `TwainComponent.getQuote()` method tells you that
the `quote` property returns an `Observable`.

在这个例子中， `TwainComponent.getQuote()` 方法告诉你 `quote` 属性会返回一个 `Observable` 。

<code-example
  path="testing/src/app/twain/twain.component.ts"
  region="get-quote"
  header="app/twain/twain.component.ts (getQuote)"></code-example>

The `TwainComponent` gets quotes from an injected `TwainService`.
The component starts the returned `Observable` with a placeholder value (`'...'`),
before the service can return its first quote.

该 `TwainComponent` 从注入的 `TwainService` 中获取名言。该在服务能返回第一条名言之前，该服务会先返回一个占位流（`'...'`）。

The `catchError` intercepts service errors, prepares an error message,
and returns the placeholder value on the success channel.
It must wait a tick to set the `errorMessage`
in order to avoid updating that message twice in the same change detection cycle.

`catchError` 会拦截服务错误，准备一条错误信息，并在流的成功通道上返回占位值。它必须等一拍（tick）才能设置 `errorMessage`，以免在同一个更改检测周期内更新此消息两次。

These are all features you'll want to test.

这些都是你想要测试的特性。

#### Testing with a spy

#### 使用间谍（spy）进行测试

When testing a component, only the service's public API should matter.
In general, tests themselves should not make calls to remote servers.
They should emulate such calls. The setup in this `app/twain/twain.component.spec.ts` shows one way to do that:

在测试组件时，只有该服务的公开 API 才有意义。通常，测试本身不应该调用远程服务器。它们应该模拟这样的调用。这个 `app/twain/twain.component.spec.ts` 中的环境准备工作展示了一种方法：

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="setup"
  header="app/twain/twain.component.spec.ts (setup)"></code-example>

{@a service-spy}

Focus on the spy.

仔细看一下这个间谍。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="spy">
</code-example>

The spy is designed such that any call to `getQuote` receives an observable with a test quote.
Unlike the real `getQuote()` method, this spy bypasses the server
and returns a synchronous observable whose value is available immediately.

这个间谍的设计目标是让所有对 `getQuote` 的调用都会收到一个带有测试名言的可观察对象。与真正的 `getQuote()` 方法不同，这个间谍会绕过服务器，并返回一个立即同步提供可用值的可观察对象。

You can write many useful tests with this spy, even though its `Observable` is synchronous.

虽然这个 `Observable` 是同步的，但你也可以用这个间谍编写很多有用的测试。

{@a sync-tests}

#### Synchronous tests

#### 同步测试

A key advantage of a synchronous `Observable` is that
you can often turn asynchronous processes into synchronous tests.

同步 `Observable` 的一个关键优势是，你通常可以把异步过程转换成同步测试。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="sync-test">
</code-example>

Because the spy result returns synchronously, the `getQuote()` method updates
the message on screen immediately _after_
the first change detection cycle during which Angular calls `ngOnInit`.

当间谍的结果同步返回时， `getQuote()` 方法会在第一个更改检测周期（Angular 在这里调用 `ngOnInit`）*后*立即更新屏幕上的消息。

You're not so lucky when testing the error path.
Although the service spy will return an error synchronously,
the component method calls `setTimeout()`.
The test must wait at least one full turn of the JavaScript engine before the
value becomes available. The test must become _asynchronous_.

你在测试错误路径时就没有这么幸运了。虽然服务间谍会同步返回一个错误，但该组件方法会调用 `setTimeout()`。在值可用之前，测试必须等待 JavaScript 引擎的至少一个周期。因此，该测试必须是*异步的*。

{@a fake-async}

#### Async test with _fakeAsync()_

#### 使用 *fakeAsync()* 进行异步测试

To use `fakeAsync()` functionality, you must import `zone.js/dist/zone-testing` in your test setup file.
If you created your project with the Angular CLI, `zone-testing` is already imported in `src/test.ts`.

要使用 `fakeAsync()` 功能，你必须在测试的环境设置文件中导入 `zone.js/dist/zone-testing`。如果是用 Angular CLI 创建的项目，那么其 `src/test.ts` 中已经配置好了 `zone-testing`。

The following test confirms the expected behavior when the service returns an `ErrorObservable`.

当该服务返回 `ErrorObservable` 时，下列测试会对其预期行为进行确认。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="error-test">
</code-example>

Note that the `it()` function receives an argument of the following form.

注意， `it()` 函数会要求如下形式的参数。

```javascript
fakeAsync(() => { /* test body */ })
```

The `fakeAsync()` function enables a linear coding style by running the test body in a special `fakeAsync test zone`.
The test body appears to be synchronous.
There is no nested syntax (like a `Promise.then()`) to disrupt the flow of control.

通过在一个特殊的 `fakeAsync test zone`（译注：Zone.js 的一个特例） 中运行测试体，`fakeAsync()` 函数可以启用线性编码风格。这个测试体看上去是同步的。没有像 `Promise.then()` 这样的嵌套语法来破坏控制流。

<div class="alert is-helpful">

Limitation: The `fakeAsync()` function won't work if the test body makes an `XMLHttpRequest` (XHR) call.
XHR calls within a test are rare, but if you need to call XHR, see [`waitForAsync()`](#waitForAsync), below.

限制：如果测试体要进行 `XMLHttpRequest` （XHR）调用，则 `fakeAsync()` 函数无效。很少会需要在测试中进行 XHR 调用，但如果你确实要这么做，请参阅下面的 [`waitForAsync()`](#waitForAsync) 部分。

</div>

{@a tick}

#### The _tick()_ function

#### _tick()_ 函数

You do have to call [tick()](api/core/testing/tick) to advance the (virtual) clock.

你必须调用 [tick()](api/core/testing/tick) 来推进（虚拟）时钟。

Calling [tick()](api/core/testing/tick) simulates the passage of time until all pending asynchronous activities finish.
In this case, it waits for the error handler's `setTimeout()`.

调用 [tick()](api/core/testing/tick) 时会在所有挂起的异步活动完成之前模拟时间的流逝。在这种情况下，它会等待错误处理程序中的 `setTimeout()` 。

The [tick()](api/core/testing/tick) function accepts milliseconds and tickOptions as parameters, the millisecond (defaults to 0 if not provided) parameter represents how much the virtual clock advances. For example, if you have a `setTimeout(fn, 100)` in a `fakeAsync()` test, you need to use tick(100) to trigger the fn callback. The tickOptions is an optional parameter with a property called `processNewMacroTasksSynchronously` (defaults to true) that represents whether to invoke new generated macro tasks when ticking.

[tick()](api/core/testing/tick) 函数接受毫秒数(milliseconds) 和 tick 选项(tickOptions) 作为参数，毫秒数（默认值为 0）参数表示虚拟时钟要前进多少。比如，如果你在 `fakeAsync()` 测试中有一个 `setTimeout(fn, 100)`，你就需要使用 tick(100) 来触发其 fn 回调。 tickOptions 是一个可选参数，它带有一个名为 `processNewMacroTasksSynchronously` 的属性（默认为 true），表示在 tick 时是否要调用新生成的宏任务。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-tick">
</code-example>

The [tick()](api/core/testing/tick) function is one of the Angular testing utilities that you import with `TestBed`.
It's a companion to `fakeAsync()` and you can only call it within a `fakeAsync()` body.

[tick()](api/core/testing/tick) 函数是你用 `TestBed` 导入的 Angular 测试工具函数之一。它是 `fakeAsync()` 的伴生工具，你只能在 `fakeAsync()` 测试体内调用它。

#### tickOptions

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-tick-new-macro-task-sync">
</code-example>

In this example, we have a new macro task (nested setTimeout), by default, when we `tick`, the setTimeout `outside` and `nested` will both be triggered.

在这个例子中，我们有一个新的宏任务（嵌套的 setTimeout），默认情况下，当我们 `tick` 时 的 setTimeout 的 `outside` 和 `nested` 都会被触发。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-tick-new-macro-task-async">
</code-example>

And in some case, we don't want to trigger the new macro task when ticking, we can use `tick(milliseconds, {processNewMacroTasksSynchronously: false})` to not invoke new macro task.

在某种情况下，我们不希望在 tick 时触发新的宏任务，我们可以使用 `tick(milliseconds, {processNewMacroTasksSynchronously: false})` 来要求不调用新的宏任务。

#### Comparing dates inside fakeAsync()

#### 比较 fakeAsync() 内部的日期

`fakeAsync()` simulates passage of time, which allows you to calculate the difference between dates inside `fakeAsync()`.

`fakeAsync()` 可以模拟时间的流逝，以便让你计算出 `fakeAsync()` 里面的日期差。

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-date">
</code-example>

#### jasmine.clock with fakeAsync()

#### jasmine.clock 与 fakeAsync() 联用

Jasmine also provides a `clock` feature to mock dates. Angular automatically runs tests that are run after
`jasmine.clock().install()` is called inside a `fakeAsync()` method until `jasmine.clock().uninstall()` is called. `fakeAsync()` is not needed and throws an error if nested.

Jasmine 还为模拟日期提供了 `clock` 特性。而 Angular 会在 `jasmine.clock().install()` 于 `fakeAsync()` 方法内调用时自动运行这些测试。直到调用了 `jasmine.clock().uninstall()` 为止。 `fakeAsync()` 不是必须的，如果嵌套它就抛出错误。

By default, this feature is disabled. To enable it, set a global flag before importing `zone-testing`.

默认情况下，此功能处于禁用状态。要启用它，请在导入 `zone-testing` 之前先设置全局标志。

If you use the Angular CLI, configure this flag in `src/test.ts`.

如果你使用的是 Angular CLI，请在 `src/test.ts` 中配置这个标志。

```
(window as any)['__zone_symbol__fakeAsyncPatchLock'] = true;
import 'zone.js/dist/zone-testing';
```

<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-clock">
</code-example>

#### Using the RxJS scheduler inside fakeAsync()

#### 在 `fakeAsync()` 中使用 RxJS 调度器

You can also use RxJS scheduler in `fakeAsync()` just like using `setTimeout()` or `setInterval()`, but you need to import `zone.js/dist/zone-patch-rxjs-fake-async` to patch RxJS scheduler.
<code-example
  path="testing/src/app/demo/async-helper.spec.ts"
  region="fake-async-test-rxjs">
</code-example>

`fakeAsync()` 使用 RxJS 的调度器，就像使用 `setTimeout()` 或 `setInterval()` 一样，但你需要导入 `zone.js/dist/zone-patch-rxjs-fake-async` 来给 RxJS 调度器打补丁。

#### Support more macroTasks

#### 支持更多的 macroTasks

By default, `fakeAsync()` supports the following macro tasks.

`fakeAsync()` 默认支持以下宏任务：

- `setTimeout`
- `setInterval`
- `requestAnimationFrame`
- `webkitRequestAnimationFrame`
- `mozRequestAnimationFrame`

If you run other macro tasks such as `HTMLCanvasElement.toBlob()`, an _"Unknown macroTask scheduled in fake async test"_ error will be thrown.

如果你运行其他宏任务，比如 `HTMLCanvasElement.toBlob()` ，就会抛出 *"Unknown macroTask scheduled in fake async test"* 错误。*

<code-tabs>
  <code-pane
    header="src/app/shared/canvas.component.spec.ts (failing)"
    path="testing/src/app/shared/canvas.component.spec.ts"
    region="without-toBlob-macrotask">
  </code-pane>
  <code-pane
    header="src/app/shared/canvas.component.ts"
    path="testing/src/app/shared/canvas.component.ts"
    region="main">
  </code-pane>
</code-tabs>

If you want to support such a case, you need to define the macro task you want to support in `beforeEach()`.
For example:

如果你想支持这种情况，就要在 `beforeEach()` 定义你要支持的宏任务。例如：

<code-example
  header="src/app/shared/canvas.component.spec.ts (excerpt)"
  path="testing/src/app/shared/canvas.component.spec.ts"
  region="enable-toBlob-macrotask">
</code-example>

Note that in order to make the `<canvas>` element Zone.js-aware in your app, you need to import the `zone-patch-canvas` patch (either in `polyfills.ts` or in the specific file that uses `<canvas>`):

注意，要在依赖 Zone.js 的应用中使用 `<canvas>` 元素，你需要导入 `zone-patch-canvas` 补丁（或者在 `polyfills.ts` 中，或者在用到 `<canvas>` 的那个文件中）：

<code-example
  header="src/polyfills.ts or src/app/shared/canvas.component.ts"
  path="testing/src/app/shared/canvas.component.ts"
  region="import-canvas-patch">
</code-example>


#### Async observables

#### 异步可观察对象

You might be satisfied with the test coverage of these tests.

你可能已经对前面这些测试的测试覆盖率感到满意。

However, you might be troubled by the fact that the real service doesn't quite behave this way.
The real service sends requests to a remote server.
A server takes time to respond and the response certainly won't be available immediately
as in the previous two tests.

但是，你可能也会为另一个事实感到不安：真实的服务并不是这样工作的。真实的服务会向远程服务器发送请求。服务器需要一定的时间才能做出响应，并且其响应体肯定不会像前面两个测试中一样是立即可用的。

Your tests will reflect the real world more faithfully if you return an _asynchronous_ observable
from the `getQuote()` spy like this.

如果能像下面这样从 `getQuote()` 间谍中返回一个*异步的*可观察对象，你的测试就会更真实地反映现实世界。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="async-setup">
</code-example>

#### Async observable helpers

#### 异步可观察对象测试助手

The async observable was produced by an `asyncData` helper.
The `asyncData` helper is a utility function that you'll have to write yourself, or you can copy this one from the sample code.

异步可观察对象可以由测试助手 `asyncData` 生成。测试助手 `asyncData` 是一个你必须自行编写的工具函数，当然也可以从下面的范例代码中复制它。

<code-example
  path="testing/src/testing/async-observable-helpers.ts"
  region="async-data"
  header="testing/async-observable-helpers.ts">
</code-example>

This helper's observable emits the `data` value in the next turn of the JavaScript engine.

这个助手返回的可观察对象会在 JavaScript 引擎的下一个周期中发送 `data` 值。

The [RxJS `defer()` operator](http://reactivex.io/documentation/operators/defer.html) returns an observable.
It takes a factory function that returns either a promise or an observable.
When something subscribes to _defer_'s observable,
it adds the subscriber to a new observable created with that factory.

[RxJS 的 `defer()` 操作符](http://reactivex.io/documentation/operators/defer.html)返回一个可观察对象。它的参数是一个返回 Promise 或可观察对象的工厂函数。当某个订阅者订阅 *defer* 生成的可观察对象时，defer 就会调用此工厂函数生成新的可观察对象，并让该订阅者订阅这个新对象。

The `defer()` operator transforms the `Promise.resolve()` into a new observable that,
like `HttpClient`, emits once and completes.
Subscribers are unsubscribed after they receive the data value.

`defer()` 操作符会把 `Promise.resolve()` 转换成一个新的可观察对象，它和 `HttpClient` 一样只会发送一次然后立即结束（complete）。这样，当订阅者收到数据后就会自动取消订阅。

There's a similar helper for producing an async error.

还有一个类似的用来生成异步错误的测试助手。

<code-example
  path="testing/src/testing/async-observable-helpers.ts"
  region="async-error">
</code-example>

#### More async tests

#### 更多异步测试

Now that the `getQuote()` spy is returning async observables,
most of your tests will have to be async as well.

现在，`getQuote()` 间谍正在返回异步可观察对象，你的大多数测试都必须是异步的。

Here's a `fakeAsync()` test that demonstrates the data flow you'd expect
in the real world.

下面是一个 `fakeAsync()` 测试，用于演示你在真实世界中所期望的数据流。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="fake-async-test">
</code-example>

Notice that the quote element displays the placeholder value (`'...'`) after `ngOnInit()`.
The first quote hasn't arrived yet.

注意，quote 元素会在 `ngOnInit()` 之后显示占位符 `'...'`。因为第一句名言尚未到来。

To flush the first quote from the observable, you call [tick()](api/core/testing/tick).
Then call `detectChanges()` to tell Angular to update the screen.

要清除可观察对象中的第一句名言，你可以调用 [tick()](api/core/testing/tick) 。然后调用 `detectChanges()` 来告诉 Angular 更新屏幕。

Then you can assert that the quote element displays the expected text.

然后，你可以断言 quote 元素是否显示了预期的文本。

{@a waitForAsync}

#### Async test with _waitForAsync()_

#### 用 *waitForAsync()* 进行异步测试

To use `waitForAsync()` functionality, you must import `zone.js/dist/zone-testing` in your test setup file.
If you created your project with the Angular CLI, `zone-testing` is already imported in `src/test.ts`.

要使用 `waitForAsync()` 函数，你必须在 test 的设置文件中导入 `zone.js/dist/zone-testing`。如果你是用 Angular CLI 创建的项目，那就已经在 `src/test.ts` 中导入过 `zone-testing` 了。

<div class="alert is-helpful">

The `TestBed.compileComponents()` method (see [below](#compile-components)) calls `XHR`
to read external template and css files during "just-in-time" compilation.
Write tests that call `compileComponents()` with the `waitForAsync()` utility.

`TestBed.compileComponents()` 方法（参阅[下文](#compile-components)）会调用 `XHR` 通过“即时（JIT）”编译过程来读取外部模板和 css 文件。可以在 `waitForAsync()` 工具函数中调用 `compileComponents()`，以编写这种测试。

</div>

Here's the previous `fakeAsync()` test, re-written with the `waitForAsync()` utility.

这是之前的 `fakeAsync()` 测试，用 `waitForAsync()` 工具函数重写的版本。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="async-test">
</code-example>

The `waitForAsync()` utility hides some asynchronous boilerplate by arranging for the tester's code
to run in a special _async test zone_.
You don't need to pass Jasmine's `done()` into the test and call `done()` because it is `undefined` in promise or observable callbacks.

`waitForAsync()` 工具函数通过把测试代码安排到在特殊的*异步测试区（async test zone）*下运行来隐藏某些用来处理异步的样板代码。你不需要把 Jasmine 的 `done()` 传给测试并让测试调用 `done()`，因为它在 Promise 或者可观察对象的回调函数中是 `undefined`。

But the test's asynchronous nature is revealed by the call to `fixture.whenStable()`,
which breaks the linear flow of control.

但是，可以通过调用 `fixture.whenStable()` 函数来揭示本测试的异步性，因为该函数打破了线性的控制流。

When using an `intervalTimer()` such as `setInterval()` in `waitForAsync()`, remember to cancel the timer with `clearInterval()` after the test, otherwise the `waitForAsync()` never ends.

在 `waitForAsync()` 中使用 `intervalTimer()`（比如 `setInterval()`）时，别忘了在测试后通过 `clearInterval()` 取消这个定时器，否则 `waitForAsync()` 永远不会结束。

{@a when-stable}

#### _whenStable_

The test must wait for the `getQuote()` observable to emit the next quote.
Instead of calling [tick()](api/core/testing/tick), it calls `fixture.whenStable()`.

测试必须等待 `getQuote()` 可观察对象发出下一句名言。它并没有调用 [tick()](api/core/testing/tick)，而是调用了 `fixture.whenStable()` 。

The `fixture.whenStable()` returns a promise that resolves when the JavaScript engine's
task queue becomes empty.
In this example, the task queue becomes empty when the observable emits the first quote.

`fixture.whenStable()` 返回一个 Promise，它会在 JavaScript 引擎的任务队列变空时解析。在这个例子中，当可观察对象发出第一句名言时，任务队列就会变为空。

The test resumes within the promise callback, which calls `detectChanges()` to
update the quote element with the expected text.

测试会在该 Promise 的回调中继续进行，它会调用 `detectChanges()` 来用期望的文本更新 quote 元素。

{@a jasmine-done}

#### Jasmine _done()_

While the `waitForAsync()` and `fakeAsync()` functions greatly
simplify Angular asynchronous testing,
you can still fall back to the traditional technique
and pass `it` a function that takes a
[`done` callback](https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support).

虽然 `waitForAsync()` 和 `fakeAsync()` 函数可以大大简化 Angular 的异步测试，但你仍然可以回退到传统技术，并给 `it` 传一个以 [`done` 回调](https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support)为参数的函数。

You can't call `done()` in `waitForAsync()` or `fakeAsync()` functions, because the `done parameter`
is `undefined`.

但你不能在 `waitForAsync()` 或 `fakeAsync()` 函数中调用 `done()`，因为那里的 `done` 参数是 `undefined`。

Now you are responsible for chaining promises, handling errors, and calling `done()` at the appropriate moments.

现在，你要自己负责串联各种 Promise、处理错误，并在适当的时机调用 `done()`。

Writing test functions with `done()`, is more cumbersome than `waitForAsync()`and `fakeAsync()`, but it is occasionally necessary when code involves the `intervalTimer()` like `setInterval`.

编写带有 `done()` 的测试函数要比用 `waitForAsync()` 和 `fakeAsync()` 的形式笨重。但是当代码涉及到像 `setInterval` 这样的 `intervalTimer()` 时，它往往是必要的。

Here are two more versions of the previous test, written with `done()`.
The first one subscribes to the `Observable` exposed to the template by the component's `quote` property.

这里是上一个测试的另外两种版本，用 `done()` 编写。第一个订阅了通过组件的 `quote` 属性暴露给模板的 `Observable`。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="quote-done-test"></code-example>

The RxJS `last()` operator emits the observable's last value before completing, which will be the test quote.
The `subscribe` callback calls `detectChanges()` to
update the quote element with the test quote, in the same manner as the earlier tests.

RxJS 的 `last()` 操作符会在完成之前发出可观察对象的最后一个值，它同样是测试名言。`subscribe` 回调会调用 `detectChanges()` 来使用测试名言刷新的 quote 元素，方法与之前的测试一样。

In some tests, you're more interested in how an injected service method was called and what values it returned,
than what appears on screen.

在某些测试中，你可能更关心注入的服务方法是如何被调的以及它返回了什么值，而不是屏幕显示的内容。

A service spy, such as the `qetQuote()` spy of the fake `TwainService`,
can give you that information and make assertions about the state of the view.

服务间谍，比如伪 `TwainService` 上的 `qetQuote()` 间谍，可以给你那些信息，并对视图的状态做出断言。

<code-example
  path="testing/src/app/twain/twain.component.spec.ts"
  region="spy-done-test"></code-example>

<hr>

{@a marble-testing}
## Component marble tests

## 组件的弹珠测试

The previous `TwainComponent` tests simulated an asynchronous observable response
from the `TwainService` with the `asyncData` and `asyncError` utilities.

前面的 `TwainComponent` 测试通过 `asyncData` 和 `asyncError` 工具函数模拟了一个来自 `TwainService` 的异步响应体可观察对象。

These are short, simple functions that you can write yourself.
Unfortunately, they're too simple for many common scenarios.
An observable often emits multiple times, perhaps after a significant delay.
A component may coordinate multiple observables
with overlapping sequences of values and errors.

你可以自己编写这些简短易用的函数。不幸的是，对于很多常见的场景来说，它们太简单了。可观察对象经常会发送很多次，可能是在经过一段显著的延迟之后。组件可以用重叠的值序列和错误序列来协调多个可观察对象。

**RxJS marble testing** is a great way to test observable scenarios,
both simple and complex.
You've likely seen the [marble diagrams](https://rxmarbles.com/)
that illustrate how observables work.
Marble testing uses a similar marble language to
specify the observable streams and expectations in your tests.

**RxJS 弹珠测试**是一种测试可观察场景的好方法，它既简单又复杂。你很可能已经看过用于说明可观察对象是如何工作[弹珠图](https://rxmarbles.com/)。弹珠测试使用类似的弹珠语言来指定测试中的可观察流和期望值。

The following examples revisit two of the `TwainComponent` tests
with marble testing.

下面的例子用弹珠测试再次实现了 `TwainComponent` 中的两个测试。

Start by installing the `jasmine-marbles` npm package.
Then import the symbols you need.

首先安装 npm 包 `jasmine-marbles`。然后导入你需要的符号。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="import-marbles"
  header="app/twain/twain.component.marbles.spec.ts (import marbles)"></code-example>

Here's the complete test for getting a quote:

获取名言的完整测试方法如下：

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="get-quote-test"></code-example>

Notice that the Jasmine test is synchronous. There's no `fakeAsync()`.
Marble testing uses a test scheduler to simulate the passage of time
in a synchronous test.

注意，这个 Jasmine 测试是同步的。没有 `fakeAsync()`。 弹珠测试使用测试调度程序（scheduler）来模拟同步测试中的时间流逝。

The beauty of marble testing is in the visual definition of the observable streams.
This test defines a [_cold_ observable](#cold-observable) that waits
three [frames](#marble-frame) (`---`),
emits a value (`x`), and completes (`|`).
In the second argument you map the value marker (`x`) to the emitted value (`testQuote`).

弹珠测试的美妙之处在于对可观察对象流的视觉定义。这个测试定义了一个[*冷*可观察对象](#cold-observable)，它等待三[帧](#marble-frame)（ `---` ），发出一个值（ `x` ），并完成（ `|` ）。在第二个参数中，你把值标记（ `x` ）映射到了发出的值（ `testQuote` ）。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="test-quote-marbles"></code-example>

The marble library constructs the corresponding observable, which the
test sets as the `getQuote` spy's return value.

这个弹珠库会构造出相应的可观察对象，测试程序把它用作 `getQuote` 间谍的返回值。

When you're ready to activate the marble observables,
you tell the `TestScheduler` to _flush_ its queue of prepared tasks like this.

当你准备好激活弹珠的可观察对象时，就告诉 `TestScheduler` 把它准备好的任务队列*刷新*一下。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="test-scheduler-flush"></code-example>

This step serves a purpose analogous to [tick()](api/core/testing/tick) and `whenStable()` in the
earlier `fakeAsync()` and `waitForAsync()` examples.
The balance of the test is the same as those examples.

这个步骤的作用类似于之前的 `fakeAsync()` 和 `waitForAsync()` 例子中的 [tick()](api/core/testing/tick) 和 `whenStable()` 测试。对这种测试的权衡策略与那些例子是一样的。

#### Marble error testing

#### 弹珠错误测试

Here's the marble testing version of the `getQuote()` error test.

下面是 `getQuote()` 错误测试的弹珠测试版。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="error-test"></code-example>

It's still an async test, calling `fakeAsync()` and [tick()](api/core/testing/tick), because the component itself
calls `setTimeout()` when processing errors.

它仍然是异步测试，调用 `fakeAsync()` 和 [tick()](api/core/testing/tick)，因为该组件在处理错误时会调用 `setTimeout()`。

Look at the marble observable definition.

看看这个弹珠的可观察定义。

<code-example
  path="testing/src/app/twain/twain.component.marbles.spec.ts"
  region="error-marbles"></code-example>

This is a _cold_ observable that waits three frames and then emits an error,
The hash (`#`) indicates the timing of the error that is specified in the third argument.
The second argument is null because the observable never emits a value.

这是一个*冷*可观察对象，等待三帧，然后发出一个错误，井号（`#`）标出了在第三个参数中指定错误的发生时间。第二个参数为 null，因为该可观察对象永远不会发出值。

#### Learn about marble testing

#### 了解弹珠测试

{@a marble-frame}

A _marble frame_ is a virtual unit of testing time.
Each symbol (`-`, `x`, `|`, `#`) marks the passing of one frame.

*弹珠帧*是测试时间线上的虚拟单位。每个符号（ `-` ， `x` ， `|` ， `#` ）都表示经过了一帧。

{@a cold-observable}

A _cold_ observable doesn't produce values until you subscribe to it.
Most of your application observables are cold.
All [_HttpClient_](guide/http) methods return cold observables.

*冷*可观察对象在你订阅它之前不会产生值。你的大多数应用中可观察对象都是冷的。所有的 [*HttpClient*](guide/http) 方法返回的都是冷可观察对象。

A _hot_ observable is already producing values _before_ you subscribe to it.
The [_Router.events_](api/router/Router#events) observable,
which reports router activity, is a _hot_ observable.

而*热*可观察对象在订阅它*之前*就已经在生成了这些值。用来报告路由器活动的 [*Router.events*](api/router/Router#events) 可观察对象就是一种*热*可观察对象。

RxJS marble testing is a rich subject, beyond the scope of this guide.
Learn about it on the web, starting with the
[official documentation](https://rxjs.dev/guide/testing/marble-testing).

RxJS 弹珠测试这个主题非常丰富，超出了本指南的范围。你可以在网上了解它，先从其[官方文档](https://rxjs.dev/guide/testing/marble-testing)开始。

<hr>

{@a component-with-input-output}

## Component with inputs and outputs

## 具有输入和输出属性的组件

A component with inputs and outputs typically appears inside the view template of a host component.
The host uses a property binding to set the input property and an event binding to
listen to events raised by the output property.

具有输入和输出属性的组件通常会出现在宿主组件的视图模板中。宿主使用属性绑定来设置输入属性，并使用事件绑定来监听输出属性引发的事件。

The testing goal is to verify that such bindings work as expected.
The tests should set input values and listen for output events.

本测试的目标是验证这些绑定是否如预期般工作。这些测试应该设置输入值并监听输出事件。

The `DashboardHeroComponent` is a tiny example of a component in this role.
It displays an individual hero provided by the `DashboardComponent`.
Clicking that hero tells the `DashboardComponent` that the user has selected the hero.

`DashboardHeroComponent` 是这类组件的一个小例子。它会显示由 `DashboardComponent` 提供的一个英雄。点击这个英雄就会告诉 `DashboardComponent`，用户已经选择了此英雄。

The `DashboardHeroComponent` is embedded in the `DashboardComponent` template like this:

`DashboardHeroComponent` 会像这样内嵌在 `DashboardComponent` 模板中的：

<code-example
  path="testing/src/app/dashboard/dashboard.component.html"
  region="dashboard-hero"
  header="app/dashboard/dashboard.component.html (excerpt)"></code-example>

The `DashboardHeroComponent` appears in an `*ngFor` repeater, which sets each component's `hero` input property
to the looping value and listens for the component's `selected` event.

`DashboardHeroComponent` 出现在 `*ngFor` 复写器中，把它的输入属性 `hero` 设置为当前的循环变量，并监听该组件的 `selected` 事件。

Here's the component's full definition:

这里是组件的完整定义：

{@a dashboard-hero-component}

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.ts"
  region="component"
  header="app/dashboard/dashboard-hero.component.ts (component)"></code-example>

While testing a component this simple has little intrinsic value, it's worth knowing how.
You can use one of these approaches:

在测试一个组件时，像这样简单的场景没什么内在价值，但值得了解它。你可以继续尝试这些方法：

- Test it as used by `DashboardComponent`.

  用 `DashboardComponent` 来测试它。

- Test it as a stand-alone component.

  把它作为一个独立的组件进行测试。

- Test it as used by a substitute for `DashboardComponent`.

  用 `DashboardComponent` 的一个替代品来测试它。

A quick look at the `DashboardComponent` constructor discourages the first approach:

快速看一眼 `DashboardComponent` 构造函数就知道不建议采用第一种方法：

<code-example
  path="testing/src/app/dashboard/dashboard.component.ts"
  region="ctor"
  header="app/dashboard/dashboard.component.ts (constructor)"></code-example>

The `DashboardComponent` depends on the Angular router and the `HeroService`.
You'd probably have to replace them both with test doubles, which is a lot of work.
The router seems particularly challenging.

`DashboardComponent` 依赖于 Angular 的路由器和 `HeroService` 。你可能不得不用测试替身来代替它们，这有很多工作。路由器看上去特别有挑战性。

<div class="alert is-helpful">

The [discussion below](#routing-component) covers testing components that require the router.

[下面](#routing-component)的讨论涵盖了如何测试那些需要用到路由器的组件。

</div>

The immediate goal is to test the `DashboardHeroComponent`, not the `DashboardComponent`,
so, try the second and third options.

当前的目标是测试 `DashboardHeroComponent` ，而不是 `DashboardComponent` ，所以试试第二个和第三个选项。

{@a dashboard-standalone}

#### Test _DashboardHeroComponent_ stand-alone

#### 单独测试 *DashboardHeroComponent*

Here's the meat of the spec file setup.

这里是 spec 文件中环境设置部分的内容。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="setup"
  header="app/dashboard/dashboard-hero.component.spec.ts (setup)"></code-example>

Note how the setup code assigns a test hero (`expectedHero`) to the component's `hero` property,
emulating the way the `DashboardComponent` would set it
via the property binding in its repeater.

注意这些设置代码如何把一个测试英雄（ `expectedHero` ）赋值给组件的 `hero` 属性的，它模仿了 `DashboardComponent` 在其复写器中通过属性绑定来设置它的方式。

The following test verifies that the hero name is propagated to the template via a binding.

下面的测试验证了英雄名是通过绑定传播到模板的。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="name-test">
</code-example>

Because the [template](#dashboard-hero-component) passes the hero name through the Angular `UpperCasePipe`,
the test must match the element value with the upper-cased name.

因为[模板](#dashboard-hero-component)把英雄的名字传给了 `UpperCasePipe`，所以测试必须要让元素值与其大写形式的名字一致。

<div class="alert is-helpful">

This small test demonstrates how Angular tests can verify a component's visual
representation&mdash;something not possible with
[component class tests](guide/testing-components-basics#component-class-testing)&mdash;at
low cost and without resorting to much slower and more complicated end-to-end tests.

这个小测试演示了 Angular 测试会如何验证一个组件的可视化表示形式 - 这是[组件类测试](guide/testing-components-basics#component-class-testing)所无法实现的 - 成本相对较低，无需进行更慢、更复杂的端到端测试。

</div>

#### Clicking

#### 点击

Clicking the hero should raise a `selected` event that
the host component (`DashboardComponent` presumably) can hear:

单击该英雄应该会让一个宿主组件（可能是 `DashboardComponent`）监听到 `selected` 事件。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="click-test">
</code-example>

The component's `selected` property returns an `EventEmitter`,
which looks like an RxJS synchronous `Observable` to consumers.
The test subscribes to it _explicitly_ just as the host component does _implicitly_.

该组件的 `selected` 属性给消费者返回了一个 `EventEmitter`，它看起来像是 RxJS 的同步 `Observable`。 该测试只有在宿主组件*隐式*触发时才需要*显式*订阅它。

If the component behaves as expected, clicking the hero's element
should tell the component's `selected` property to emit the `hero` object.

当组件的行为符合预期时，单击此英雄的元素就会告诉组件的 `selected` 属性发出了一个 `hero` 对象。

The test detects that event through its subscription to `selected`.

该测试通过对 `selected` 的订阅来检测该事件。

{@a trigger-event-handler}

#### _triggerEventHandler_

The `heroDe` in the previous test is a `DebugElement` that represents the hero `<div>`.

前面测试中的 `heroDe` 是一个指向英雄条目 `<div>` 的 `DebugElement`。

It has Angular properties and methods that abstract interaction with the native element.
This test calls the `DebugElement.triggerEventHandler` with the "click" event name.
The "click" event binding responds by calling `DashboardHeroComponent.click()`.

它有一些用于抽象与原生元素交互的 Angular 属性和方法。
这个测试会使用事件名称 `click` 来调用 `DebugElement.triggerEventHandler`。
`click` 的事件绑定到了 `DashboardHeroComponent.click()`。

The Angular `DebugElement.triggerEventHandler` can raise _any data-bound event_ by its _event name_.
The second parameter is the event object passed to the handler.

Angular 的 `DebugElement.triggerEventHandler` 可以用**事件的名字**触发**任何数据绑定事件**。
第二个参数是传给事件处理器的事件对象。

The test triggered a "click" event with a `null` event object.

该测试使用事件对象 `null` 触发了一次 `click` 事件。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="trigger-event-handler">
</code-example>

The test assumes (correctly in this case) that the runtime
event handler&mdash;the component's `click()` method&mdash;doesn't
care about the event object.

测试程序假设（在这里应该这样)运行时间的事件处理器（组件的 `click()` 方法）不关心事件对象。

<div class="alert is-helpful">

Other handlers are less forgiving. For example, the `RouterLink`
directive expects an object with a `button` property
that identifies which mouse button (if any) was pressed during the click.
The `RouterLink` directive throws an error if the event object is missing.

其它处理器的要求比较严格。比如，`RouterLink` 指令期望一个带有 `button` 属性的对象，该属性用于指出点击时按下的是哪个鼠标按钮。
如果不给出这个事件对象，`RouterLink` 指令就会抛出一个错误。

</div>

#### Click the element

#### 点击该元素

The following test alternative calls the native element's own `click()` method,
which is perfectly fine for _this component_.

下面这个测试改为调用原生元素自己的 `click()` 方法，它对于*这个组件*来说相当完美。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="click-test-2">
</code-example>

{@a click-helper}

#### _click()_ helper

#### _click()_ 辅助函数

Clicking a button, an anchor, or an arbitrary HTML element is a common test task.

点击按钮、链接或者任意 HTML 元素是很常见的测试任务。

Make that consistent and easy by encapsulating the _click-triggering_ process
in a helper such as the `click()` function below:

把*点击事件*的处理过程包装到如下的 `click()` 辅助函数中，可以让这项任务更一致、更简单：

<code-example
  path="testing/src/testing/index.ts"
  region="click-event"
  header="testing/index.ts (click helper)"></code-example>

The first parameter is the _element-to-click_. If you wish, you can pass a
custom event object as the second parameter. The default is a (partial)
<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button">left-button mouse event object</a>
accepted by many handlers including the `RouterLink` directive.

第一个参数是**用来点击的元素**。如果你愿意，可以将自定义的事件对象传给第二个参数。
默认的是（局部的）<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button" target="_blank">鼠标左键事件对象</a>，
它被许多事件处理器接受，包括 `RouterLink` 指令。

<div class="alert is-important">

The `click()` helper function is **not** one of the Angular testing utilities.
It's a function defined in _this guide's sample code_.
All of the sample tests use it.
If you like it, add it to your own collection of helpers.

`click()` 辅助函数**不是**Angular 测试工具之一。
它是在**本章的例子代码**中定义的函数方法，被所有测试例子所用。
如果你喜欢它，将它添加到你自己的辅助函数集。

</div>

Here's the previous test, rewritten using the click helper.

下面是把前面的测试用 `click` 辅助函数重写后的版本。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="click-test-3"
  header="app/dashboard/dashboard-hero.component.spec.ts (test with click helper)">
</code-example>

<hr>

{@a component-inside-test-host}

## Component inside a test host

## 位于测试宿主中的组件

The previous tests played the role of the host `DashboardComponent` themselves.
But does the `DashboardHeroComponent` work correctly when properly data-bound to a host component?

前面的这些测试都是自己扮演宿主元素 `DashboardComponent` 的角色。
但是当 `DashboardHeroComponent` 真的绑定到某个宿主元素时还能正常工作吗？

You could test with the actual `DashboardComponent`.
But doing so could require a lot of setup,
especially when its template features an `*ngFor` repeater,
other components, layout HTML, additional bindings,
a constructor that injects multiple services,
and it starts interacting with those services right away.

固然，你也可以测试真实的 `DashboardComponent`。
但要想这么做需要做很多准备工作，特别是它的模板中使用了某些特性，如 `*ngFor`、
其它组件、布局 HTML、附加绑定、注入了多个服务的构造函数、如何用正确的方式与那些服务交互等。

Imagine the effort to disable these distractions, just to prove a point
that can be made satisfactorily with a _test host_ like this one:

想出这么多需要努力排除的干扰，只是为了证明一点 —— 可以造出这样一个令人满意的*测试宿主*：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="test-host"
  header="app/dashboard/dashboard-hero.component.spec.ts (test host)"
 ></code-example>

This test host binds to `DashboardHeroComponent` as the `DashboardComponent` would
but without the noise of the `Router`, the `HeroService`, or the `*ngFor` repeater.

这个测试宿主像 `DashboardComponent` 那样绑定了 `DashboardHeroComponent`，但是没有 `Router`、
没有 `HeroService`，也没有 `*ngFor`。

The test host sets the component's `hero` input property with its test hero.
It binds the component's `selected` event with its `onSelected` handler,
which records the emitted hero in its `selectedHero` property.

这个测试宿主使用其测试用的英雄设置了组件的输入属性 `hero`。
它使用 `onSelected` 事件处理器绑定了组件的 `selected` 事件，其中把事件中发出的英雄记录到了 `selectedHero` 属性中。

Later, the tests will be able to easily check `selectedHero` to verify that the
`DashboardHeroComponent.selected` event emitted the expected hero.

稍后，这个测试就可以轻松检查 `selectedHero` 以验证 `DashboardHeroComponent.selected` 事件确实发出了所期望的英雄。

The setup for the _test-host_ tests is similar to the setup for the stand-alone tests:

这个*测试宿主*中的准备代码和独立测试中的准备过程类似：

<code-example path="testing/src/app/dashboard/dashboard-hero.component.spec.ts" region="test-host-setup" header="app/dashboard/dashboard-hero.component.spec.ts (test host setup)"></code-example>

This testing module configuration shows three important differences:

这个测试模块的配置信息有三个重要的不同点：

1. It _declares_ both the `DashboardHeroComponent` and the `TestHostComponent`.

   它同时**声明**了 `DashboardHeroComponent` 和 `TestHostComponent`。

1. It _creates_ the `TestHostComponent` instead of the `DashboardHeroComponent`.

   它**创建**了 `TestHostComponent`，而非 `DashboardHeroComponent`。

1. The `TestHostComponent` sets the `DashboardHeroComponent.hero` with a binding.

   `TestHostComponent` 通过绑定机制设置了 `DashboardHeroComponent.hero`。

The `createComponent` returns a `fixture` that holds an instance of `TestHostComponent` instead of an instance of `DashboardHeroComponent`.

`createComponent` 返回的 `fixture` 里有 `TestHostComponent` 实例，而非 `DashboardHeroComponent` 组件实例。

Creating the `TestHostComponent` has the side-effect of creating a `DashboardHeroComponent`
because the latter appears within the template of the former.
The query for the hero element (`heroEl`) still finds it in the test DOM,
albeit at greater depth in the element tree than before.

当然，创建 `TestHostComponent` 有创建 `DashboardHeroComponent` 的副作用，因为后者出现在前者的模板中。
英雄元素（`heroEl`)的查询语句仍然可以在测试 DOM 中找到它，尽管元素树比以前更深。

The tests themselves are almost identical to the stand-alone version:

这些测试本身和它们的孤立版本几乎相同：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="test-host-tests"
  header="app/dashboard/dashboard-hero.component.spec.ts (test-host)"></code-example>

Only the selected event test differs. It confirms that the selected `DashboardHeroComponent` hero
really does find its way up through the event binding to the host component.

只有 selected 事件的测试不一样。它确保被选择的 `DashboardHeroComponent` 英雄确实通过事件绑定被传递到宿主组件。

<hr>

{@a routing-component}

## Routing component

## 路由组件

A _routing component_ is a component that tells the `Router` to navigate to another component.
The `DashboardComponent` is a _routing component_ because the user can
navigate to the `HeroDetailComponent` by clicking on one of the _hero buttons_ on the dashboard.

所谓*路由组件*就是指会要求 `Router` 导航到其它组件的组件。
`DashboardComponent` 就是一个*路由组件*，因为用户可以通过点击仪表盘中的某个*英雄按钮*来导航到 `HeroDetailComponent`。

Routing is pretty complicated.
Testing the `DashboardComponent` seemed daunting in part because it involves the `Router`,
which it injects together with the `HeroService`.

路由确实很复杂。
测试 `DashboardComponent` 看上去有点令人生畏，因为它牵扯到和 `HeroService` 一起注入进来的 `Router`。

<code-example
  path="testing/src/app/dashboard/dashboard.component.ts"
  region="ctor"
  header="app/dashboard/dashboard.component.ts (constructor)"></code-example>

Mocking the `HeroService` with a spy is a [familiar story](#component-with-async-service).
But the `Router` has a complicated API and is entwined with other services and application preconditions. Might it be difficult to mock?

使用间谍来 Mock `HeroService` 是一个[熟悉的故事](#component-with-async-service)。
但是 `Router` 的 API 很复杂，并且与其它服务和应用的前置条件纠缠在一起。它应该很难进行 Mock 吧？

Fortunately, not in this case because the `DashboardComponent` isn't doing much with the `Router`

庆幸的是，在这个例子中不会，因为 `DashboardComponent` 并没有深度使用 `Router`。

<code-example
  path="testing/src/app/dashboard/dashboard.component.ts"
  region="goto-detail"
  header="app/dashboard/dashboard.component.ts (goToDetail)">
</code-example>

This is often the case with _routing components_.
As a rule you test the component, not the router,
and care only if the component navigates with the right address under the given conditions.

这是*路由组件*中的通例。
一般来说，你应该测试组件而不是路由器，应该只关心组件有没有根据给定的条件导航到正确的地址。

Providing a router spy for _this component_ test suite happens to be as easy
as providing a `HeroService` spy.

为*这个组件*的测试套件提供路由器的间谍就像提供 `HeroService` 的间谍一样简单。

<code-example
  path="testing/src/app/dashboard/dashboard.component.spec.ts"
  region="router-spy"
  header="app/dashboard/dashboard.component.spec.ts (spies)"></code-example>

The following test clicks the displayed hero and confirms that
`Router.navigateByUrl` is called with the expected url.

下面这个测试会点击正在显示的英雄，并确认 `Router.navigateByUrl` 曾用所期待的 URL 调用过。

<code-example
  path="testing/src/app/dashboard/dashboard.component.spec.ts"
  region="navigate-test"
  header="app/dashboard/dashboard.component.spec.ts (navigate test)"></code-example>

{@a routed-component-w-param}

## Routed components

## 路由目标组件

A _routed component_ is the destination of a `Router` navigation.
It can be trickier to test, especially when the route to the component _includes parameters_.
The `HeroDetailComponent` is a _routed component_ that is the destination of such a route.

*路由目标组件*是指 `Router` 导航到的目标。
它测试起来可能很复杂，特别是当路由到的这个组件*包含参数*的时候。
`HeroDetailComponent` 就是一个*路由目标组件*，它是某个路由定义指向的目标。

When a user clicks a _Dashboard_ hero, the `DashboardComponent` tells the `Router`
to navigate to `heroes/:id`.
The `:id` is a route parameter whose value is the `id` of the hero to edit.

当用户点击*仪表盘*中的英雄时，`DashboardComponent` 会要求 `Router` 导航到 `heroes/:id`。
`:id` 是一个路由参数，它的值就是所要编辑的英雄的 `id`。

The `Router` matches that URL to a route to the `HeroDetailComponent`.
It creates an `ActivatedRoute` object with the routing information and
injects it into a new instance of the `HeroDetailComponent`.

该 `Router` 会根据那个 URL 匹配到一个指向 `HeroDetailComponent` 的路由。
它会创建一个带有路由信息的 `ActivatedRoute` 对象，并把它注入到一个 `HeroDetailComponent` 的新实例中。

Here's the `HeroDetailComponent` constructor:

下面是 `HeroDetailComponent` 的构造函数：

<code-example path="testing/src/app/hero/hero-detail.component.ts" region="ctor" header="app/hero/hero-detail.component.ts (constructor)"></code-example>

The `HeroDetail` component needs the `id` parameter so it can fetch
the corresponding hero via the `HeroDetailService`.
The component has to get the `id` from the `ActivatedRoute.paramMap` property
which is an `Observable`.

`HeroDetailComponent` 组件需要一个 `id` 参数，以便通过 `HeroDetailService` 获取相应的英雄。
该组件只能从 `ActivatedRoute.paramMap` 属性中获取这个 `id`，这个属性是一个 `Observable`。

It can't just reference the `id` property of the `ActivatedRoute.paramMap`.
The component has to _subscribe_ to the `ActivatedRoute.paramMap` observable and be prepared
for the `id` to change during its lifetime.

它不能仅仅引用 `ActivatedRoute.paramMap` 的 `id` 属性。
该组件不得不*订阅* `ActivatedRoute.paramMap` 这个可观察对象，要做好它在生命周期中随时会发生变化的准备。

<code-example path="testing/src/app/hero/hero-detail.component.ts" region="ng-on-init" header="app/hero/hero-detail.component.ts (ngOnInit)"></code-example>

<div class="alert is-helpful">

The [ActivatedRoute in action](guide/router-tutorial-toh#activated-route-in-action) section of the [Router tutorial: tour of heroes](guide/router-tutorial-toh) guide covers `ActivatedRoute.paramMap` in more detail.

[路由教程：英雄之旅](guide/router-tutorial-toh)一章的 [ActivatedRoute 实战](guide/router-tutorial-toh#activated-route-in-action)部分详细讲解了 `ActivatedRoute.paramMap`。

</div>

Tests can explore how the `HeroDetailComponent` responds to different `id` parameter values
by manipulating the `ActivatedRoute` injected into the component's constructor.

通过操纵注入到组件构造函数中的这个 `ActivatedRoute`，测试可以探查 `HeroDetailComponent` 是如何对不同的 `id` 参数值做出响应的。

You know how to spy on the `Router` and a data service.

你已经知道了如何给 `Router` 和数据服务安插间谍。

You'll take a different approach with `ActivatedRoute` because

不过对于 `ActivatedRoute`，你要采用另一种方式，因为：

- `paramMap` returns an `Observable` that can emit more than one value
  during a test.

   在测试期间，`paramMap` 会返回一个能发出多个值的 `Observable`。

- You need the router helper function, `convertToParamMap()`, to create a `ParamMap`.

   你需要路由器的辅助函数 `convertToParamMap()` 来创建 `ParamMap`。

- Other _routed component_ tests need a test double for `ActivatedRoute`.

   针对*路由目标组件*的其它测试需要一个 `ActivatedRoute` 的测试替身。

These differences argue for a re-usable stub class.

这些差异表明你需要一个可复用的桩类（stub）。

#### _ActivatedRouteStub_

The following `ActivatedRouteStub` class serves as a test double for `ActivatedRoute`.

下面的 `ActivatedRouteStub` 类就是作为 `ActivatedRoute` 类的测试替身使用的。

<code-example
  path="testing/src/testing/activated-route-stub.ts"
  region="activated-route-stub"
  header="testing/activated-route-stub.ts (ActivatedRouteStub)"></code-example>

Consider placing such helpers in a `testing` folder sibling to the `app` folder.
This sample puts `ActivatedRouteStub` in `testing/activated-route-stub.ts`.

考虑把这类辅助函数放进一个紧邻 `app` 文件夹的 `testing` 文件夹。
这个例子把 `ActivatedRouteStub` 放在了 `testing/activated-route-stub.ts` 中。

<div class="alert is-helpful">

Consider writing a more capable version of this stub class with
the [_marble testing library_](#marble-testing).

  可以考虑使用[弹珠测试库](#marble-testing)来为此测试桩编写一个更强力的版本。

</div>

{@a tests-w-test-double}

#### Testing with _ActivatedRouteStub_

#### 使用 `ActivatedRouteStub` 进行测试

Here's a test demonstrating the component's behavior when the observed `id` refers to an existing hero:

下面的测试程序是演示组件在被观察的 `id` 指向现有英雄时的行为：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-good-id" header="app/hero/hero-detail.component.spec.ts (existing id)"></code-example>

<div class="alert is-helpful">

The `createComponent()` method and `page` object are discussed [below](#page-object).
Rely on your intuition for now.

`createComponent()` 方法和 `page` 对象会在[稍后](#page-object)进行讨论。
不过目前，你只要凭直觉来理解就行了。

</div>

When the `id` cannot be found, the component should re-route to the `HeroListComponent`.

当找不到 `id` 的时候，组件应该重新路由到 `HeroListComponent`。

The test suite setup provided the same router spy [described above](#routing-component) which spies on the router without actually navigating.

测试套件的准备代码提供了一个和[前面](#routing-component)一样的路由器间谍，它会充当路由器的角色，而不用发起实际的导航。

This test expects the component to try to navigate to the `HeroListComponent`.

这个测试中会期待该组件尝试导航到 `HeroListComponent`。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="route-bad-id" header="app/hero/hero-detail.component.spec.ts (bad id)"></code-example>

While this app doesn't have a route to the `HeroDetailComponent` that omits the `id` parameter, it might add such a route someday.
The component should do something reasonable when there is no `id`.

虽然本应用没有在缺少 `id` 参数的时候，继续导航到 `HeroDetailComponent` 的路由，但是，将来它可能会添加这样的路由。
当没有 `id` 时，该组件应该作出合理的反应。

In this implementation, the component should create and display a new hero.
New heroes have `id=0` and a blank `name`. This test confirms that the component behaves as expected:

在本例中，组件应该创建和显示新英雄。
新英雄的 `id` 为零，`name` 为空。本测试程序确认组件是按照预期的这样做的：

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="route-no-id"
  header="app/hero/hero-detail.component.spec.ts (no id)"></code-example>

<hr>

## Nested component tests

## 对嵌套组件的测试

Component templates often have nested components, whose templates
may contain more components.

组件的模板中通常还会有嵌套组件，嵌套组件的模板还可能包含更多组件。

The component tree can be very deep and, most of the time, the nested components
play no role in testing the component at the top of the tree.

这棵组件树可能非常深，并且大多数时候在测试这棵树顶部的组件时，这些嵌套的组件都无关紧要。

The `AppComponent`, for example, displays a navigation bar with anchors and their `RouterLink` directives.

比如，`AppComponent` 会显示一个带有链接及其 `RouterLink` 指令的导航条。

<code-example
  path="testing/src/app/app.component.html"
  header="app/app.component.html"></code-example>

While the `AppComponent` _class_ is empty,
you may want to write unit tests to confirm that the links are wired properly
to the `RouterLink` directives, perhaps for the reasons [explained below](#why-stubbed-routerlink-tests).

虽然 `AppComponent` *类*是空的，不过，由于[稍后解释的原因](#why-stubbed-routerlink-tests)，你可能会希望写个单元测试来确认这些链接是否正确使用了 `RouterLink` 指令。

To validate the links, you don't need the `Router` to navigate and you don't
need the `<router-outlet>` to mark where the `Router` inserts _routed components_.

要想验证这些链接，你不必用 `Router` 进行导航，也不必使用 `<router-outlet>` 来指出 `Router` 应该把*路由目标组件*插入到什么地方。

The `BannerComponent` and `WelcomeComponent`
(indicated by `<app-banner>` and `<app-welcome>`) are also irrelevant.

而 `BannerComponent` 和 `WelcomeComponent`（写作 `<app-banner>` 和 `<app-welcome>`）也同样风马牛不相及。

Yet any test that creates the `AppComponent` in the DOM will also create instances of
these three components and, if you let that happen,
you'll have to configure the `TestBed` to create them.

然而，任何测试，只要能在 DOM 中创建 `AppComponent`，也就同样能创建这三个组件的实例。如果要创建它们，你就要配置 `TestBed`。

If you neglect to declare them, the Angular compiler won't recognize the
`<app-banner>`, `<app-welcome>`, and `<router-outlet>` tags in the `AppComponent` template
and will throw an error.

如果你忘了声明它们，Angular 编译器就无法在 `AppComponent` 模板中识别出 `<app-banner>`、`<app-welcome>` 和 `<router-outlet>` 标记，并抛出一个错误。

If you declare the real components, you'll also have to declare _their_ nested components
and provide for _all_ services injected in _any_ component in the tree.

如果你声明的这些都是真实的组件，那么也同样要声明*它们*的嵌套组件，并要为这棵组件树中的*任何*组件提供要注入的*所有*服务。

That's too much effort just to answer a few simple questions about links.

如果只是想回答关于链接的一些简单问题，做这些显然就太多了。

This section describes two techniques for minimizing the setup.
Use them, alone or in combination, to stay focused on testing the primary component.

本节会讲减少此类准备工作的两项技术。
单独使用或组合使用它们，可以让这些测试聚焦于要测试的主要组件上。

{@a stub-component}

##### Stubbing unneeded components

##### 对不需要的组件提供桩（stub）

In the first technique, you create and declare stub versions of the components
and directive that play little or no role in the tests.

这项技术中，你要为那些在测试中无关紧要的组件或指令创建和声明一些测试桩。

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="component-stubs"
  header="app/app.component.spec.ts (stub declaration)"></code-example>

The stub selectors match the selectors for the corresponding real components.
But their templates and classes are empty.

这些测试桩的选择器要和其对应的真实组件一致，但其模板和类是空的。

Then declare them in the `TestBed` configuration next to the
components, directives, and pipes that need to be real.

然后在 `TestBed` 的配置中那些真正有用的组件、指令、管道之后声明它们。

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="testbed-stubs"
  header="app/app.component.spec.ts (TestBed stubs)"></code-example>

The `AppComponent` is the test subject, so of course you declare the real version.

`AppComponent` 是该测试的主角，因此当然要用它的真实版本。

The `RouterLinkDirectiveStub`, [described later](#routerlink), is a test version
of the real `RouterLink` that helps with the link tests.

而 `RouterLinkDirectiveStub`（[稍后讲解](#routerlink)）是一个真实的 `RouterLink` 的测试版，它能帮你对链接进行测试。

The rest are stubs.

其它都是测试桩。

{@a no-errors-schema}

#### _NO_ERRORS_SCHEMA_

In the second approach, add `NO_ERRORS_SCHEMA` to the `TestBed.schemas` metadata.

第二种办法就是把 `NO_ERRORS_SCHEMA` 添加到 `TestBed.schemas` 的元数据中。

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="no-errors-schema"
  header="app/app.component.spec.ts (NO_ERRORS_SCHEMA)"></code-example>

The `NO_ERRORS_SCHEMA` tells the Angular compiler to ignore unrecognized elements and attributes.

`NO_ERRORS_SCHEMA` 会要求 Angular 编译器忽略不认识的那些元素和属性。

The compiler will recognize the `<app-root>` element and the `routerLink` attribute
because you declared a corresponding `AppComponent` and `RouterLinkDirectiveStub`
in the `TestBed` configuration.

编译器将会识别出 `<app-root>` 元素和 `RouterLink` 属性，因为你在 `TestBed` 的配置中声明了相应的
`AppComponent` 和 `RouterLinkDirectiveStub`。

But the compiler won't throw an error when it encounters `<app-banner>`, `<app-welcome>`, or `<router-outlet>`.
It simply renders them as empty tags and the browser ignores them.

但编译器在遇到 `<app-banner>`、`<app-welcome>` 或 `<router-outlet>` 时不会报错。
它只会把它们渲染成空白标签，而浏览器会忽略这些标签。

You no longer need the stub components.

你不用再提供桩组件了。

#### Use both techniques together

#### 同时使用这两项技术

These are techniques for _Shallow Component Testing_ ,
so-named because they reduce the visual surface of the component to just those elements
in the component's template that matter for tests.

这些是进行*浅层*测试要用到的技术，之所以叫浅层测试是因为只包含本测试所关心的这个组件模板中的元素。

The `NO_ERRORS_SCHEMA` approach is the easier of the two but don't overuse it.

`NO_ERRORS_SCHEMA` 方法在这两者中比较简单，但也不要过度使用它。

The `NO_ERRORS_SCHEMA` also prevents the compiler from telling you about the missing
components and attributes that you omitted inadvertently or misspelled.
You could waste hours chasing phantom bugs that the compiler would have caught in an instant.

`NO_ERRORS_SCHEMA` 还会阻止编译器告诉你因为的疏忽或拼写错误而缺失的组件和属性。
你如果人工找出这些 bug 可能要浪费几个小时，但编译器可以立即捕获它们。

The _stub component_ approach has another advantage.
While the stubs in _this_ example were empty,
you could give them stripped-down templates and classes if your tests
need to interact with them in some way.

*桩组件*方式还有其它优点。
虽然*这个*例子中的桩是空的，但你如果想要和它们用某种形式互动，也可以给它们一些裁剪过的模板和类。

In practice you will combine the two techniques in the same setup,
as seen in this example.

在实践中，你可以在准备代码中组合使用这两种技术，例子如下：

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="mixed-setup"
  header="app/app.component.spec.ts (mixed setup)"></code-example>

The Angular compiler creates the `BannerComponentStub` for the `<app-banner>` element
and applies the `RouterLinkStubDirective` to the anchors with the `routerLink` attribute,
but it ignores the `<app-welcome>` and `<router-outlet>` tags.

Angular 编译器会为 `<app-banner>` 元素创建 `BannerComponentStub`，并把 `RouterLinkStubDirective` 应用到带有 `routerLink` 属性的链接上，不过它会忽略 `<app-welcome>` 和 `<router-outlet>` 标签。

<hr>

{@a routerlink}

## Components with _RouterLink_

## 带有 `RouterLink` 的组件

The real `RouterLinkDirective` is quite complicated and entangled with other components
and directives of the `RouterModule`.
It requires challenging setup to mock and use in tests.

真实的 `RouterLinkDirective` 太复杂了，而且与 `RouterModule` 中的其它组件和指令有着千丝万缕的联系。
要在准备阶段 Mock 它以及在测试中使用它具有一定的挑战性。

The `RouterLinkDirectiveStub` in this sample code replaces the real directive
with an alternative version designed to validate the kind of anchor tag wiring
seen in the `AppComponent` template.

这段范例代码中的 `RouterLinkDirectiveStub` 用一个代用品替换了真实的指令，这个代用品用来验证 `AppComponent` 中所用链接的类型。

<code-example
  path="testing/src/testing/router-link-directive-stub.ts"
  region="router-link"
  header="testing/router-link-directive-stub.ts (RouterLinkDirectiveStub)"></code-example>

The URL bound to the `[routerLink]` attribute flows in to the directive's `linkParams` property.

这个 URL 被绑定到了 `[routerLink]` 属性，它的值流入了该指令的 `linkParams` 属性。

The `HostListener` wires the click event of the host element
(the `<a>` anchor elements in `AppComponent`) to the stub directive's `onClick` method.

它的元数据中的 `host` 属性把宿主元素（即 `AppComponent` 中的 `<a>` 元素）的 `click` 事件关联到了这个桩指令的 `onClick` 方法。

Clicking the anchor should trigger the `onClick()` method,
which sets the stub's telltale `navigatedTo` property.
Tests inspect `navigatedTo` to confirm that clicking the anchor
sets the expected route definition.

点击这个链接应该触发 `onClick()` 方法，其中会设置该桩指令中的警示器属性 `navigatedTo`。
测试中检查 `navigatedTo` 以确认点击该链接确实如预期的那样根据路由定义设置了该属性。

<div class="alert is-helpful">

Whether the router is configured properly to navigate with that route definition is a
question for a separate set of tests.

路由器的配置是否正确和是否能按照那些路由定义进行导航，是测试中一组独立的问题。

</div>

{@a by-directive}

{@a inject-directive}

#### _By.directive_ and injected directives

#### `By.directive` 与注入的指令

A little more setup triggers the initial data binding and gets references to the navigation links:

再一步配置触发了数据绑定的初始化，获取导航链接的引用：

<code-example
  path="testing/src/app/app.component.spec.ts"
  region="test-setup"
  header="app/app.component.spec.ts (test setup)"></code-example>

Three points of special interest:

有三点特别重要：

1.  You can locate the anchor elements with an attached directive using `By.directive`.

   你可以使用 `By.directive` 来定位一个带附属指令的链接元素。

1.  The query returns `DebugElement` wrappers around the matching elements.

   该查询返回包含了匹配元素的 `DebugElement` 包装器。

1.  Each `DebugElement` exposes a dependency injector with the
    specific instance of the directive attached to that element.

   每个 `DebugElement` 都会导出该元素中的一个依赖注入器，其中带有指定的指令实例。

The `AppComponent` links to validate are as follows:

`AppComponent` 中要验证的链接如下：

<code-example
  path="testing/src/app/app.component.html"
  region="links"
  header="app/app.component.html (navigation links)"></code-example>

{@a app-component-tests}

Here are some tests that confirm those links are wired to the `routerLink` directives
as expected:

下面这些测试用来确认那些链接是否如预期般连接到了 `RouterLink` 指令中：

<code-example path="testing/src/app/app.component.spec.ts" region="tests" header="app/app.component.spec.ts (selected tests)"></code-example>

<div class="alert is-helpful">

The "click" test _in this example_ is misleading.
It tests the `RouterLinkDirectiveStub` rather than the _component_.
This is a common failing of directive stubs.

其实*这个例子中*的“click”测试误入歧途了。
它测试的重点其实是 `RouterLinkDirectiveStub`，而不是该组件。
这是写桩指令时常见的错误。

It has a legitimate purpose in this guide.
It demonstrates how to find a `RouterLink` element, click it, and inspect a result,
without engaging the full router machinery.
This is a skill you may need to test a more sophisticated component, one that changes the display,
re-calculates parameters, or re-arranges navigation options when the user clicks the link.

在本章中，它有存在的必要。
它演示了如何在不涉及完整路由器机制的情况下，如何找到 `RouterLink` 元素、点击它并检查结果。
要测试更复杂的组件，你可能需要具备这样的能力，能改变视图和重新计算参数，或者当用户点击链接时，有能力重新安排导航选项。

</div>

{@a why-stubbed-routerlink-tests}

#### What good are these tests?

#### 这些测试有什么优点？

Stubbed `RouterLink` tests can confirm that a component with links and an outlet is setup properly,
that the component has the links it should have, and that they are all pointing in the expected direction.
These tests do not concern whether the app will succeed in navigating to the target component when the user clicks a link.

用 `RouterLink` 的桩指令进行测试可以确认带有链接和 outlet 的组件的设置的正确性，确认组件有应该有的链接，确认它们都指向了正确的方向。
这些测试程序不关心用户点击链接时，也不关心应用是否会成功的导航到目标组件。

Stubbing the RouterLink and RouterOutlet is the best option for such limited testing goals.
Relying on the real router would make them brittle.
They could fail for reasons unrelated to the component.
For example, a navigation guard could prevent an unauthorized user from visiting the `HeroListComponent`.
That's not the fault of the `AppComponent` and no change to that component could cure the failed test.

对于这些有限的测试目标，使用 RouterLink 桩指令和 RouterOutlet 桩组件 是最佳选择。
依靠真正的路由器会让它们很脆弱。
它们可能因为与组件无关的原因而失败。
例如，一个导航守卫可能防止没有授权的用户访问 `HeroListComponent`。
这并不是 `AppComponent` 的过错，并且无论该组件怎么改变都无法修复这个失败的测试程序。

A _different_ battery of tests can explore whether the application navigates as expected
in the presence of conditions that influence guards such as whether the user is authenticated and authorized.

一组不同的测试程序可以探索当存在影响守卫的条件时（比如用户是否已认证和授权），该应用是否如期望般导航。

<div class="alert is-helpful">

A future guide update will explain how to write such
tests with the `RouterTestingModule`.

未来对本章的更新将介绍如何使用 `RouterTestingModule` 来编写这样的测试程序。

</div>

<hr>

{@a page-object}

## Use a _page_ object

## 使用页面（page）对象

The `HeroDetailComponent` is a simple view with a title, two hero fields, and two buttons.

`HeroDetailComponent` 是带有标题、两个英雄字段和两个按钮的简单视图。

<div class="lightbox">
  <img src='generated/images/guide/testing/hero-detail.component.png' alt="HeroDetailComponent in action">
</div>

But there's plenty of template complexity even in this simple form.

但即使是这么简单的表单，其模板中也涉及到不少复杂性。

<code-example
  path="testing/src/app/hero/hero-detail.component.html" header="app/hero/hero-detail.component.html"></code-example>

Tests that exercise the component need ...

这些供练习用的组件需要 ……

- to wait until a hero arrives before elements appear in the DOM.

   等获取到英雄之后才能让元素出现在 DOM 中。

- a reference to the title text.

   一个对标题文本的引用。

- a reference to the name input box to inspect and set it.

   一个对 name 输入框的引用，以便对它进行探查和修改。

- references to the two buttons so they can click them.

   引用两个按钮，以便点击它们。

- spies for some of the component and router methods.

   为组件和路由器的方法安插间谍。

Even a small form such as this one can produce a mess of tortured conditional setup and CSS element selection.

即使是像这样一个很小的表单，也能产生令人疯狂的错综复杂的条件设置和 CSS 元素选择。

Tame the complexity with a `Page` class that handles access to component properties
and encapsulates the logic that sets them.

可以使用 `Page` 类来征服这种复杂性。`Page` 类可以处理对组件属性的访问，并对设置这些属性的逻辑进行封装。

Here is such a `Page` class for the `hero-detail.component.spec.ts`

下面是一个供 `hero-detail.component.spec.ts` 使用的 `Page` 类

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="page"
  header="app/hero/hero-detail.component.spec.ts (Page)"></code-example>

Now the important hooks for component manipulation and inspection are neatly organized and accessible from an instance of `Page`.

现在，用来操作和检查组件的重要钩子都被井然有序的组织起来了，可以通过 `page` 实例来使用它们。

A `createComponent` method creates a `page` object and fills in the blanks once the `hero` arrives.

`createComponent` 方法会创建一个 `page` 对象，并在 `hero` 到来时自动填补空白。

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="create-component"
  header="app/hero/hero-detail.component.spec.ts (createComponent)"></code-example>

The [_HeroDetailComponent_ tests](#tests-w-test-double) in an earlier section demonstrate how `createComponent` and `page`
keep the tests short and _on message_.
There are no distractions: no waiting for promises to resolve and no searching the DOM for element values to compare.

前面小节中的 [`HeroDetailComponent` 测试](#tests-w-test-double)示范了如何 `createComponent`，而 `page` 让这些测试保持简短而富有表达力。
而且还不用分心：不用等待承诺被解析，不必在 DOM 中找出元素的值才能进行比较。

Here are a few more `HeroDetailComponent` tests to reinforce the point.

还有更多的 `HeroDetailComponent` 测试可以证明这一点。

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="selected-tests"
  header="app/hero/hero-detail.component.spec.ts (selected tests)"></code-example>

<hr>

{@a compile-components}

## Calling _compileComponents()_

## 调用 `compileComponents()`

<div class="alert is-helpful">

You can ignore this section if you _only_ run tests with the CLI `ng test` command
because the CLI compiles the application before running the tests.

如果你*只想*使用 CLI 的 `ng test` 命令来运行测试，那么可以忽略这一节。

</div>

If you run tests in a **non-CLI environment**, the tests may fail with a message like this one:

如果你在**非 CLI 环境**中运行测试，这些测试可能会报错，错误信息如下：

<code-example language="sh" class="code-shell" hideCopy>
Error: This test module uses the component BannerComponent
which is using a "templateUrl" or "styleUrls", but they were never compiled.
Please call "TestBed.compileComponents" before your test.
</code-example>

The root of the problem is at least one of the components involved in the test
specifies an external template or CSS file as
the following version of the `BannerComponent` does.

问题的根源在于这个测试中至少有一个组件引用了外部模板或外部 CSS 文件，就像下面这个版本的 `BannerComponent` 所示：

<code-example
  path="testing/src/app/banner/banner-external.component.ts"
  header="app/banner/banner-external.component.ts (external template & css)"></code-example>

The test fails when the `TestBed` tries to create the component.

当 `TestBed` 视图创建组件时，这个测试失败了：

<code-example
  path="testing/src/app/banner/banner.component.spec.ts"
  region="configure-and-create"
  header="app/banner/banner.component.spec.ts (setup that fails)"
  avoid></code-example>

Recall that the app hasn't been compiled.
So when you call `createComponent()`, the `TestBed` compiles implicitly.

回想一下，这个应用从未编译过。
所以当你调用 `createComponent()` 的时候，`TestBed` 就会进行隐式编译。

That's not a problem when the source code is in memory.
But the `BannerComponent` requires external files
that the compiler must read from the file system,
an inherently _asynchronous_ operation.

当它的源码都在内存中的时候，这样做没问题。
不过 `BannerComponent` 需要一些外部文件，编译时必须从文件系统中读取它，而这是一个天生的*异步*操作。

If the `TestBed` were allowed to continue, the tests would run and fail mysteriously
before the compiler could finished.

如果 `TestBed` 继续执行，这些测试就会继续运行，并在编译器完成这些异步工作之前导致莫名其妙的失败。

The preemptive error message tells you to compile explicitly with `compileComponents()`.

这些错误信息告诉你要使用 `compileComponents()` 进行显式的编译。

#### _compileComponents()_ is async

#### `compileComponents()` 是异步的

You must call `compileComponents()` within an asynchronous test function.

你必须在异步测试函数中调用 `compileComponents()`。

<div class="alert is-critical">

If you neglect to make the test function async
(e.g., forget to use `waitForAsync()` as described below),
you'll see this error message

如果你忘了把测试函数标为异步的（比如忘了像稍后的代码中那样使用 `waitForAsync()`），就会看到下列错误。

<code-example language="sh" class="code-shell" hideCopy>
Error: ViewDestroyedError: Attempt to use a destroyed view
</code-example>

</div>

A typical approach is to divide the setup logic into two separate `beforeEach()` functions:

典型的做法是把准备逻辑拆成两个独立的 `beforeEach()` 函数：

1.  An async `beforeEach()` that compiles the components

   异步的 `beforeEach()` 负责编译组件

1.  A synchronous `beforeEach()` that performs the remaining setup.

   同步的 `beforeEach()` 负责执行其余的准备代码。

To follow this pattern, import the `waitForAsync()` helper with the other testing symbols.

要想使用这种模式，就要和其它符号一起从测试库中导入 `waitForAsync()` 辅助函数。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="import-async">
</code-example>

#### The async _beforeEach_

#### 异步的 `beforeEach`

Write the first async `beforeEach` like this.

像下面这样编写第一个异步的 `beforeEach`。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="async-before-each"
  header="app/banner/banner-external.component.spec.ts (async beforeEach)"></code-example>

The `waitForAsync()` helper function takes a parameterless function with the body of the setup.

`waitForAsync()` 辅助函数接受一个无参函数，其内容是环境准备代码。

The `TestBed.configureTestingModule()` method returns the `TestBed` class so you can chain
calls to other `TestBed` static methods such as `compileComponents()`.

`TestBed.configureTestingModule()` 方法返回 `TestBed` 类，所以你可以链式调用其它 `TestBed` 中的静态方法，比如 `compileComponents()`。

In this example, the `BannerComponent` is the only component to compile.
Other examples configure the testing module with multiple components
and may import application modules that hold yet more components.
Any of them could require external files.

在这个例子中，`BannerComponent` 是仅有的待编译组件。
其它例子中可能会使用多个组件来配置测试模块，并且可能引入某些具有其它组件的应用模块。
它们中的任何一个都可能需要外部文件。

The `TestBed.compileComponents` method asynchronously compiles all components configured in the testing module.

`TestBed.compileComponents` 方法会异步编译测试模块中配置过的所有组件。

<div class="alert is-important">

Do not re-configure the `TestBed` after calling `compileComponents()`.

在调用了 `compileComponents()` 之后就不能再重新配置 `TestBed` 了。

</div>

Calling `compileComponents()` closes the current `TestBed` instance to further configuration.
You cannot call any more `TestBed` configuration methods, not `configureTestingModule()`
nor any of the `override...` methods. The `TestBed` throws an error if you try.

调用 `compileComponents()` 会关闭当前的 `TestBed` 实例，不再允许进行配置。
你不能再调用任何 `TestBed` 中的配置方法，既不能调 `configureTestingModule()`，也不能调用任何 `override...` 方法。如果你试图这么做，`TestBed` 就会抛出错误。

Make `compileComponents()` the last step
before calling `TestBed.createComponent()`.

确保 `compileComponents()` 是调用 `TestBed.createComponent()` 之前的最后一步。

#### The synchronous _beforeEach_

#### 同步的 `beforeEach`

The second, synchronous `beforeEach()` contains the remaining setup steps,
which include creating the component and querying for elements to inspect.

第二个同步 `beforeEach()` 的例子包含剩下的准备步骤，
包括创建组件和查询那些要检查的元素。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="sync-before-each"
  header="app/banner/banner-external.component.spec.ts (synchronous beforeEach)"></code-example>

You can count on the test runner to wait for the first asynchronous `beforeEach` to finish before calling the second.

测试运行器（runner）会先等待第一个异步 `beforeEach` 函数执行完再调用第二个。

#### Consolidated setup

#### 整理过的准备代码

You can consolidate the two `beforeEach()` functions into a single, async `beforeEach()`.

你可以把这两个 `beforeEach()` 函数重整成一个异步的 `beforeEach()`。

The `compileComponents()` method returns a promise so you can perform the
synchronous setup tasks _after_ compilation by moving the synchronous code
into a `then(...)` callback.

`compileComponents()` 方法返回一个承诺，所以你可以通过把同步代码移到 `then(...)` 回调中，
以便在编译完成*之后* 执行那些同步准备任务。

<code-example
  path="testing/src/app/banner/banner-external.component.spec.ts"
  region="one-before-each"
  header="app/banner/banner-external.component.spec.ts (one beforeEach)"></code-example>

#### _compileComponents()_ is harmless

#### `compileComponents()` 是无害的

There's no harm in calling `compileComponents()` when it's not required.

在不需要 `compileComponents()` 的时候调用它也不会有害处。

The component test file generated by the CLI calls `compileComponents()`
even though it is never required when running `ng test`.

虽然在运行 `ng test` 时永远都不需要调用 `compileComponents()`，但 CLI 生成的组件测试文件还是会调用它。

The tests in this guide only call `compileComponents` when necessary.

但这篇指南中的这些测试只会在必要时才调用 `compileComponents`。

<hr>

{@a import-module}

## Setup with module imports

## 准备模块的 `imports`

Earlier component tests configured the testing module with a few `declarations` like this:

此前的组件测试程序使用了一些 `declarations` 来配置模块，就像这样：

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="config-testbed"
  header="app/dashboard/dashboard-hero.component.spec.ts (configure TestBed)">
</code-example>

The `DashboardComponent` is simple. It needs no help.
But more complex components often depend on other components, directives, pipes, and providers
and these must be added to the testing module too.

`DashbaordComponent` 非常简单。它不需要帮助。
但是更加复杂的组件通常依赖其它组件、指令、管道和提供者，
所以这些必须也被添加到测试模块中。

Fortunately, the `TestBed.configureTestingModule` parameter parallels
the metadata passed to the `@NgModule` decorator
which means you can also specify `providers` and `imports`.

幸运的是，`TestBed.configureTestingModule` 参数与传入 `@NgModule` 装饰器的元数据一样，也就是所你也可以指定 `providers` 和 `imports`.

The `HeroDetailComponent` requires a lot of help despite its small size and simple construction.
In addition to the support it receives from the default testing module `CommonModule`, it needs:

虽然 `HeroDetailComponent` 很小，结构也很简单，但是它需要很多帮助。
  除了从默认测试模块 `CommonModule` 中获得的支持，它还需要：

- `NgModel` and friends in the `FormsModule` to enable two-way data binding.

   `FormsModule` 里的 `NgModel` 和其它，来进行双向数据绑定

- The `TitleCasePipe` from the `shared` folder.

   `shared` 目录里的 `TitleCasePipe`

- Router services (which these tests are stubbing).

   一些路由器服务（测试程序将 stub 伪造它们）

- Hero data access services (also stubbed).

   英雄数据访问服务（同样被 stub 伪造了）

One approach is to configure the testing module from the individual pieces as in this example:

一种方法是从各个部分配置测试模块，就像这样：

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="setup-forms-module"
  header="app/hero/hero-detail.component.spec.ts (FormsModule setup)"></code-example>

<div class="alert is-helpful">

Notice that the `beforeEach()` is asynchronous and calls `TestBed.compileComponents`
because the `HeroDetailComponent` has an external template and css file.

注意，`beforeEach()` 是异步的，它调用 `TestBed.compileComponents` 是因为 `HeroDetailComponent` 有外部模板和 CSS 文件。

As explained in [_Calling compileComponents()_](#compile-components) above,
these tests could be run in a non-CLI environment
where Angular would have to compile them in the browser.

如前面的[调用 `compileComponents()`](#compile-components) 中所解释的那样，这些测试可以运行在非 CLI 环境下，那里 Angular 并不会在浏览器中编译它们。

</div>

#### Import a shared module

#### 导入共享模块

Because many app components need the `FormsModule` and the `TitleCasePipe`, the developer created
a `SharedModule` to combine these and other frequently requested parts.

因为很多应用组件都需要 `FormsModule` 和 `TitleCasePipe`，所以开发者创建了 `SharedModule` 来把它们及其它常用的部分组合在一起。

The test configuration can use the `SharedModule` too as seen in this alternative setup:

这些测试配置也可以使用 `SharedModule`，如下所示：

<code-example
  path="testing/src/app/hero/hero-detail.component.spec.ts"
  region="setup-shared-module"
  header="app/hero/hero-detail.component.spec.ts (SharedModule setup)"></code-example>

It's a bit tighter and smaller, with fewer import statements (not shown).

它的导入声明少一些（未显示），稍微干净一些，小一些。

{@a feature-module-import}

#### Import a feature module

#### 导入特性模块

The `HeroDetailComponent` is part of the `HeroModule` [Feature Module](guide/feature-modules) that aggregates more of the interdependent pieces
including the `SharedModule`.
Try a test configuration that imports the `HeroModule` like this one:

`HeroDetailComponent` 是 `HeroModule` 这个[特性模块](guide/feature-modules)的一部分，它聚合了更多相互依赖的片段，包括 `SharedModule`。
试试下面这个导入了 `HeroModule` 的测试配置：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-hero-module" header="app/hero/hero-detail.component.spec.ts (HeroModule setup)"></code-example>

That's _really_ crisp. Only the _test doubles_ in the `providers` remain. Even the `HeroDetailComponent` declaration is gone.

这样特别清爽。只有 `providers` 里面的测试替身被保留。连 `HeroDetailComponent` 声明都消失了。

In fact, if you try to declare it, Angular will throw an error because
`HeroDetailComponent` is declared in both the `HeroModule` and the `DynamicTestModule`
created by the `TestBed`.

事实上，如果你试图声明它，Angular 就会抛出一个错误，因为 `HeroDetailComponent` 同时声明在了 `HeroModule` 和 `TestBed` 创建的 `DynamicTestModule` 中。

<div class="alert is-helpful">

Importing the component's feature module can be the easiest way to configure tests
when there are many mutual dependencies within the module and
the module is small, as feature modules tend to be.

如果模块中有很多共同依赖，并且该模块很小（这也是特性模块的应有形态），那么直接导入组件的特性模块可以成为配置这些测试的简易方式。

</div>

<hr>

{@a component-override}

## Override component providers

## 改写组件的服务提供者

The `HeroDetailComponent` provides its own `HeroDetailService`.

`HeroDetailComponent` 提供自己的 `HeroDetailService` 服务。

<code-example path="testing/src/app/hero/hero-detail.component.ts" region="prototype" header="app/hero/hero-detail.component.ts (prototype)"></code-example>

It's not possible to stub the component's `HeroDetailService` in the `providers` of the `TestBed.configureTestingModule`.
Those are providers for the _testing module_, not the component. They prepare the dependency injector at the _fixture level_.

在 `TestBed.configureTestingModule` 的 `providers` 中 stub 伪造组件的 `HeroDetailService` 是不可行的。
这些是**测试模块**的提供者，而非组件的。组件级别的供应商应该在**fixture 级别**准备的依赖注入器。

Angular creates the component with its _own_ injector, which is a _child_ of the fixture injector.
It registers the component's providers (the `HeroDetailService` in this case) with the child injector.

Angular 会使用自己的注入器来创建这些组件，这个注入器是夹具的注入器的子注入器。
它使用这个子注入器注册了该组件服务提供者（这里是 `HeroDetailService` ）。

A test cannot get to child injector services from the fixture injector.
And `TestBed.configureTestingModule` can't configure them either.

测试没办法从测试夹具的注入器中获取子注入器中的服务，而 `TestBed.configureTestingModule` 也没法配置它们。

Angular has been creating new instances of the real `HeroDetailService` all along!

Angular 始终都在创建真实 `HeroDetailService` 的实例。

<div class="alert is-helpful">

These tests could fail or timeout if the `HeroDetailService` made its own XHR calls to a remote server.
There might not be a remote server to call.

如果 `HeroDetailService` 向远程服务器发出自己的 XHR 请求，这些测试可能会失败或者超时。
这个远程服务器可能根本不存在。

Fortunately, the `HeroDetailService` delegates responsibility for remote data access to an injected `HeroService`.

幸运的是，`HeroDetailService` 将远程数据访问的责任交给了注入进来的 `HeroService`。

<code-example path="testing/src/app/hero/hero-detail.service.ts" region="prototype" header="app/hero/hero-detail.service.ts (prototype)"></code-example>

The [previous test configuration](#feature-module-import) replaces the real `HeroService` with a `TestHeroService`
that intercepts server requests and fakes their responses.

[前面的测试配置](#feature-module-import)使用 `TestHeroService` 替换了真实的 `HeroService`，它拦截了发往服务器的请求，并伪造了服务器的响应。

</div>

What if you aren't so lucky. What if faking the `HeroService` is hard?
What if `HeroDetailService` makes its own server requests?

如果你没有这么幸运怎么办？如果伪造 `HeroService` 很难怎么办？如果 `HeroDetailService` 自己发出服务器请求怎么办？

The `TestBed.overrideComponent` method can replace the component's `providers` with easy-to-manage _test doubles_
as seen in the following setup variation:

`TestBed.overrideComponent` 方法可以将组件的 `providers` 替换为容易管理的**测试替身**，参阅下面的变体准备代码：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="setup-override" header="app/hero/hero-detail.component.spec.ts (Override setup)"></code-example>

Notice that `TestBed.configureTestingModule` no longer provides a (fake) `HeroService` because it's [not needed](#spy-stub).

注意，`TestBed.configureTestingModule` 不再提供（伪造的）`HeroService`，因为[并不需要](#spy-stub)。

{@a override-component-method}

#### The _overrideComponent_ method

#### `overrideComponent` 方法

Focus on the `overrideComponent` method.

注意这个 `overrideComponent` 方法。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-component-method" header="app/hero/hero-detail.component.spec.ts (overrideComponent)"></code-example>

It takes two arguments: the component type to override (`HeroDetailComponent`) and an override metadata object.
The [override metadata object](guide/testing-utility-apis#metadata-override-object) is a generic defined as follows:

它接受两个参数：要改写的组件类型（`HeroDetailComponent`），以及用于改写的元数据对象。
[用于改写的元数据对象](guide/testing-utility-apis#metadata-override-object)是一个泛型，其定义如下：

<code-example language="javascript">
  type MetadataOverride&lt;T&gt; = {
    add?: Partial&lt;T&gt;;
    remove?: Partial&lt;T&gt;;
    set?: Partial&lt;T&gt;;
  };
</code-example>

A metadata override object can either add-and-remove elements in metadata properties or completely reset those properties.
This example resets the component's `providers` metadata.

元数据重载对象可以添加和删除元数据属性的项目，也可以彻底重设这些属性。
这个例子重新设置了组件的 `providers` 元数据。

The type parameter, `T`, is the kind of metadata you'd pass to the `@Component` decorator:

这个类型参数 `T` 就是你传给 `@Component` 装饰器的元数据：

<code-example language="javascript">
  selector?: string;
  template?: string;
  templateUrl?: string;
  providers?: any[];
  ...
</code-example>

{@a spy-stub}

#### Provide a _spy stub_ (_HeroDetailServiceSpy_)

#### 提供 ` 间谍桩 ` (`HeroDetailServiceSpy`)

This example completely replaces the component's `providers` array with a new array containing a `HeroDetailServiceSpy`.

这个例子把组件的 `providers` 数组完全替换成了一个包含 `HeroDetailServiceSpy` 的新数组。

The `HeroDetailServiceSpy` is a stubbed version of the real `HeroDetailService`
that fakes all necessary features of that service.
It neither injects nor delegates to the lower level `HeroService`
so there's no need to provide a test double for that.

`HeroDetailServiceSpy` 是实际 `HeroDetailService` 服务的桩版本，它伪造了该服务的所有必要特性。
但它既不需要注入也不会委托给低层的 `HeroService` 服务，因此不用为 `HeroService` 提供测试替身。

The related `HeroDetailComponent` tests will assert that methods of the `HeroDetailService`
were called by spying on the service methods.
Accordingly, the stub implements its methods as spies:

通过对该服务的方法进行刺探，`HeroDetailComponent` 的关联测试将会对 `HeroDetailService` 是否被调用过进行断言。
因此，这个桩类会把它的方法实现为刺探方法：

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="hds-spy" header="app/hero/hero-detail.component.spec.ts (HeroDetailServiceSpy)"></code-example>

{@a override-tests}

#### The override tests

#### 改写测试

Now the tests can control the component's hero directly by manipulating the spy-stub's `testHero`
and confirm that service methods were called.

现在，测试程序可以通过操控这个 spy-stub 的 `testHero`，直接控制组件的英雄，并确认那个服务方法被调用过。

<code-example path="testing/src/app/hero/hero-detail.component.spec.ts" region="override-tests" header="app/hero/hero-detail.component.spec.ts (override tests)"></code-example>

{@a more-overrides}

#### More overrides

#### 更多的改写

The `TestBed.overrideComponent` method can be called multiple times for the same or different components.
The `TestBed` offers similar `overrideDirective`, `overrideModule`, and `overridePipe` methods
for digging into and replacing parts of these other classes.

`TestBed.overrideComponent` 方法可以在相同或不同的组件中被反复调用。
`TestBed` 还提供了类似的 `overrideDirective`、`overrideModule` 和 `overridePipe` 方法，用来深入并重载这些其它类的部件。

Explore the options and combinations on your own.

自己探索这些选项和组合。

<hr>
