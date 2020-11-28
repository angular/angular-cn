# Basics of testing components

# 测试组件的基础知识

A component, unlike all other parts of an Angular application,
combines an HTML template and a TypeScript class.
The component truly is the template and the class _working together_. To adequately test a component, you should test that they work together
as intended.

组件与 Angular 应用的所有其它部分不同，它结合了 HTML 模板和 TypeScript 类。事实上，组件就是由模板和类*一起工作的*。要想对组件进行充分的测试，你应该测试它们是否如预期般协同工作。

Such tests require creating the component's host element in the browser DOM,
as Angular does, and investigating the component class's interaction with
the DOM as described by its template.

这些测试需要在浏览器 DOM 中创建该组件的宿主元素，就像 Angular 所做的那样，然后检查组件类与 DOM 的交互是否如模板中描述的那样工作。

The Angular `TestBed` facilitates this kind of testing as you'll see in the sections below.
But in many cases, _testing the component class alone_, without DOM involvement,
can validate much of the component's behavior in an easier, more obvious way.

Angular 的 `TestBed` 可以帮你做这种测试，正如你将在下面的章节中看到的那样。但是，在很多情况下，*单独测试组件类*（不需要 DOM 的参与），就能以更简单，更明显的方式验证组件的大部分行为。

<div class="alert is-helpful">

  For the sample app that the testing guides describe, see the <live-example name="testing" embedded-style noDownload>sample app</live-example>.

  对于本测试指南中描述的范例应用，参阅<live-example name="testing" embedded-style noDownload>范例应用</live-example>。

  For the tests features in the testing guides, see <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>.

  要了解本测试指南中涉及的测试特性，请参阅<live-example name="testing" stackblitz="specs" noDownload>tests</live-example>。

</div>


{@a component-class-testing}

## Component class testing

## 组件类测试

Test a component class on its own as you would test a service class.

你可以像测试服务类那样来测试一个组件类本身。

Component class testing should be kept very clean and simple.
It should test only a single unit.
At first glance, you should be able to understand
what the test is testing.

组件类的测试应该保持非常干净和简单。它应该只测试一个单元。一眼看上去，你就应该能够理解正在测试的对象。

Consider this `LightswitchComponent` which toggles a light on and off
(represented by an on-screen message) when the user clicks the button.

考虑这个 `LightswitchComponent`，当用户单击该按钮时，它会打开和关闭一个指示灯（用屏幕上的一条消息表示）。

<code-example
  path="testing/src/app/demo/demo.ts"
  region="LightswitchComp"
  header="app/demo/demo.ts (LightswitchComp)"></code-example>

You might decide only to test that the `clicked()` method
toggles the light's _on/off_ state and sets the message appropriately.

你可能要测试 `clicked()` 方法是否切换了灯的*开/关*状态并正确设置了这个消息。

This component class has no dependencies. To test these types of classes, follow the same steps as you would for a service that has no dependencies:

这个组件类没有依赖。要测试这种类型的组件类，请遵循与没有依赖的服务相同的步骤：

1. Create a component using the new keyword.

   使用 new 关键字创建一个组件。

2. Poke at its API.

   调用它的 API。

3. Assert expectations on its public state.

   对其公开状态的期望值进行断言。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="Lightswitch"
  header="app/demo/demo.spec.ts (Lightswitch tests)"></code-example>

Here is the `DashboardHeroComponent` from the _Tour of Heroes_ tutorial.

下面是“*英雄之旅*”教程中的 `DashboardHeroComponent`。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.ts"
  region="class"
  header="app/dashboard/dashboard-hero.component.ts (component)"></code-example>

It appears within the template of a parent component,
which binds a _hero_ to the `@Input` property and
listens for an event raised through the _selected_ `@Output` property.

它出现在父组件的模板中，把一个*英雄*绑定到了 `@Input` 属性，并监听通过*所选*`@Output` 属性引发的一个事件。

You can test that the class code works without creating the `DashboardHeroComponent`
or its parent component.

你可以测试类代码的工作方式，而无需创建 `DashboardHeroComponent` 或它的父组件。

<code-example
  path="testing/src/app/dashboard/dashboard-hero.component.spec.ts"
  region="class-only"
  header="app/dashboard/dashboard-hero.component.spec.ts (class tests)"></code-example>

When a component has dependencies, you may wish to use the `TestBed` to both
create the component and its dependencies.

当组件有依赖时，你可能要使用 `TestBed` 来同时创建该组件及其依赖。

The following `WelcomeComponent` depends on the `UserService` to know the name of the user to greet.

下列的 `WelcomeComponent` 依赖于 `UserService` 来了解要问候的用户的名字。

<code-example
  path="testing/src/app/welcome/welcome.component.ts"
  region="class"
  header="app/welcome/welcome.component.ts"></code-example>

You might start by creating a mock of the `UserService` that meets the minimum needs of this component.

你可以先创建一个能满足本组件最低需求的 `UserService`

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="mock-user-service"
  header="app/welcome/welcome.component.spec.ts (MockUserService)"></code-example>

Then provide and inject _both the_ **component** _and the service_ in the `TestBed` configuration.

然后在 `TestBed` 配置中提供并注入所有这些**组件**和*服务*。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-before-each"
  header="app/welcome/welcome.component.spec.ts (class-only setup)"></code-example>

Then exercise the component class, remembering to call the [lifecycle hook methods](guide/lifecycle-hooks) as Angular does when running the app.

然后，测验组件类，别忘了要像 Angular 运行应用时一样[调用生命周期钩子方法](guide/lifecycle-hooks)。

<code-example
  path="testing/src/app/welcome/welcome.component.spec.ts"
  region="class-only-tests"
  header="app/welcome/welcome.component.spec.ts (class-only tests)"></code-example>

## Component DOM testing

## 组件 DOM 测试

Testing the component _class_ is as easy as [testing a service](guide/testing-services).

测试组件*类*[和测试服务](guide/testing-services)一样简单。

But a component is more than just its class.
A component interacts with the DOM and with other components.
The _class-only_ tests can tell you about class behavior.
They cannot tell you if the component is going to render properly,
respond to user input and gestures, or integrate with its parent and child components.

但组件不仅仅是它的类。组件还会与 DOM 以及其他组件进行交互。*只对类*的测试可以告诉你类的行为。但它们无法告诉你这个组件是否能正确渲染、响应用户输入和手势，或是集成到它的父组件和子组件中。

None of the _class-only_ tests above can answer key questions about how the
components actually behave on screen.

以上所有*只对类*的测试都不能回答有关组件会如何在屏幕上实际运行方面的关键问题。

- Is `Lightswitch.clicked()` bound to anything such that the user can invoke it?

  `Lightswitch.clicked()` 绑定到了什么？用户可以调用它吗？

- Is the `Lightswitch.message` displayed?

  `Lightswitch.message` 是否显示过？

- Can the user actually select the hero displayed by `DashboardHeroComponent`?

  用户能否真正选中由 `DashboardHeroComponent` 显示的英雄？

- Is the hero name displayed as expected (i.e, in uppercase)?

  英雄名字是否按预期显示的（也就是大写字母）？

- Is the welcome message displayed by the template of `WelcomeComponent`?

  `WelcomeComponent` 的模板是否显示了欢迎信息？

These may not be troubling questions for the simple components illustrated above.
But many components have complex interactions with the DOM elements
described in their templates, causing HTML to appear and disappear as
the component state changes.

对于上面描述的那些简单组件来说，这些问题可能并不麻烦。但是很多组件都与模板中描述的 DOM 元素进行了复杂的交互，导致一些 HTML 会在组件状态发生变化时出现和消失。

To answer these kinds of questions, you have to create the DOM elements associated
with the components, you must examine the DOM to confirm that component state
displays properly at the appropriate times, and you must simulate user interaction
with the screen to determine whether those interactions cause the component to
behave as expected.

要回答这些问题，你必须创建与组件关联的 DOM 元素，你必须检查 DOM 以确认组件状态是否在适当的时候正确显示了，并且你必须模拟用户与屏幕的交互以确定这些交互是否正确。判断该组件的行为是否符合预期。

To write these kinds of test, you'll use additional features of the `TestBed`
as well as other testing helpers.

为了编写这些类型的测试，你将使用 `TestBed` 的其它特性以及其他的测试辅助函数。

### CLI-generated tests

### CLI 生成的测试

The CLI creates an initial test file for you by default when you ask it to
generate a new component.

当你要求 CLI 生成一个新组件时，它会默认为你创建一个初始的测试文件。

For example, the following CLI command generates a `BannerComponent` in the `app/banner` folder (with inline template and styles):

比如，下列 CLI 命令会在 `app/banner` 文件夹中生成带有内联模板和内联样式的 `BannerComponent`：

<code-example language="sh" class="code-shell">
ng generate component banner --inline-template --inline-style --module app
</code-example>

It also generates an initial test file for the component, `banner-external.component.spec.ts`, that looks like this:

它还会生成一个初始测试文件 `banner-external.component.spec.ts`，如下所示：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v1"
  header="app/banner/banner-external.component.spec.ts (initial)"></code-example>

<div class="alert is-helpful">

Because `compileComponents` is asynchronous, it uses
the [`waitForAsync`](api/core/testing/waitForAsync) utility
function imported from `@angular/core/testing`.

由于 `compileComponents` 是异步的，所以它使用从 `@angular/core/testing` 中导入的实用工具函数 [`waitForAsync`](api/core/testing/waitForAsync)。

Please refer to the [waitForAsync](guide/testing-components-scenarios#waitForAsync) section for more details.

欲知详情，请参阅 [waitForAsync 部分。](guide/testing-components-scenarios#waitForAsync)

</div>

### Reduce the setup

### 减少设置代码

Only the last three lines of this file actually test the component
and all they do is assert that Angular can create the component.

只有这个文件的最后三行才是真正测试组件的，并且所有这些都断言了 Angular 可以创建该组件。

The rest of the file is boilerplate setup code anticipating more advanced tests that _might_ become necessary if the component evolves into something substantial.

该文件的其它部分是做设置用的样板代码，*可以*预见，如果组件演变得更具实质性内容，就会需要更高级的测试。

You'll learn about these advanced test features below.
For now, you can radically reduce this test file to a more manageable size:

下面你将学习这些高级测试特性。现在，你可以从根本上把这个测试文件减少到一个更容易管理的大小：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v2"
  header="app/banner/banner-initial.component.spec.ts (minimal)"></code-example>

In this example, the metadata object passed to `TestBed.configureTestingModule`
simply declares `BannerComponent`, the component to test.

在这个例子中，传给 `TestBed.configureTestingModule` 的元数据对象只是声明了要测试的组件 `BannerComponent`

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="configureTestingModule">
</code-example>

<div class="alert is-helpful">

There's no need to declare or import anything else.
The default test module is pre-configured with
something like the `BrowserModule` from `@angular/platform-browser`.

没有必要声明或导入任何其他东西。默认的测试模块预先配置了像来自 `@angular/platform-browser` 的 `BrowserModule` 这样的东西。

Later you'll call `TestBed.configureTestingModule()` with
imports, providers, and more declarations to suit your testing needs.
Optional `override` methods can further fine-tune aspects of the configuration.

稍后你会用 `imports`、`providers` 和更多可声明对象的参数来调用 `TestBed.configureTestingModule()`，以满足你的测试需求。可选方法 `override`可以进一步微调此配置的各个方面。

</div>

{@a create-component}

### _createComponent()_

After configuring `TestBed`, you call its `createComponent()` method.

在配置好 `TestBed` 之后，你就可以调用它的 `createComponent()` 方法了。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="createComponent">
</code-example>

`TestBed.createComponent()` creates an instance of the `BannerComponent`,
adds a corresponding element to the test-runner DOM,
and returns a [`ComponentFixture`](#component-fixture).

`TestBed.createComponent()` 会创建 `BannerComponent` 的实例，它把一个对应元素添加到了测试运行器的 DOM 中，并返回一个[`ComponentFixture`](#component-fixture) 对象。

<div class="alert is-important">

Do not re-configure `TestBed` after calling `createComponent`.

调用 `createComponent` 后不能再重新配置 `TestBed` 。

The `createComponent` method freezes the current `TestBed` definition,
closing it to further configuration.

`createComponent` 方法会冻结当前的 `TestBed` 定义，并把它关闭以防止进一步的配置。

You cannot call any more `TestBed` configuration methods, not `configureTestingModule()`,
nor `get()`, nor any of the `override...` methods.
If you try, `TestBed` throws an error.

你不能再调用任何 `TestBed` 配置方法， 无论是 `configureTestingModule()`、`get()` 还是 `override...` 方法都不行。如果你这样做，`TestBed` 会抛出一个错误。

</div>

{@a component-fixture}

### _ComponentFixture_

The [ComponentFixture](api/core/testing/ComponentFixture) is a test harness for interacting with the created component and its corresponding element.

[ComponentFixture](api/core/testing/ComponentFixture) 是一个测试挽具，用于与所创建的组件及其对应的元素进行交互。

Access the component instance through the fixture and confirm it exists with a Jasmine expectation:

可以通过测试夹具（fixture）访问组件实例，并用 Jasmine 的期望断言来确认它是否存在：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="componentInstance">
</code-example>

### _beforeEach()_

You will add more tests as this component evolves.
Rather than duplicate the `TestBed` configuration for each test,
you refactor to pull the setup into a Jasmine `beforeEach()` and some supporting variables:

随着这个组件的发展，你会添加更多的测试。你不必为每个测试复制 `TestBed` 的配置代码，而是把它重构到 Jasmine 的 `beforeEach()` 和一些支持变量中：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v3"
 ></code-example>

Now add a test that gets the component's element from `fixture.nativeElement` and
looks for the expected text.

现在添加一个测试程序，它从 `fixture.nativeElement` 中获取组件的元素，并查找预期的文本。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-2">
</code-example>

{@a native-element}

### _nativeElement_

The value of `ComponentFixture.nativeElement` has the `any` type.
Later you'll encounter the `DebugElement.nativeElement` and it too has the `any` type.

`ComponentFixture.nativeElement` 的值是 `any` 类型的。稍后你会遇到 `DebugElement.nativeElement`，它也是 `any` 类型的。

Angular can't know at compile time what kind of HTML element the `nativeElement` is or
if it even is an HTML element.
The app might be running on a _non-browser platform_, such as the server or a
[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API),
where the element may have a diminished API or not exist at all.

Angular 在编译时不知道 `nativeElement` 是什么样的 HTML 元素，甚至可能不是 HTML 元素。该应用可能运行在*非浏览器平台*（如服务器或 [Web Worker）上](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)，在那里本元素可能具有一个缩小版的 API，甚至根本不存在。

The tests in this guide are designed to run in a browser so a
`nativeElement` value will always be an `HTMLElement` or
one of its derived classes.

本指南中的测试都是为了在浏览器中运行而设计的，因此 `nativeElement` 的值始终是 `HTMLElement` 或其派生类之一。

Knowing that it is an `HTMLElement` of some sort, you can use
the standard HTML `querySelector` to dive deeper into the element tree.

知道了它是某种 `HTMLElement` ，你就可以使用标准的 HTML `querySelector` 深入了解元素树。

Here's another test that calls `HTMLElement.querySelector` to get the paragraph element and look for the banner text:

这是另一个调用 `HTMLElement.querySelector` 来获取段落元素并查找横幅文本的测试：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-3">
</code-example>

{@a debug-element}

### _DebugElement_

The Angular _fixture_ provides the component's element directly through the `fixture.nativeElement`.

Angular 的*测试夹具*可以直接通过 `fixture.nativeElement` 提供组件的元素。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="nativeElement">
</code-example>

This is actually a convenience method, implemented as `fixture.debugElement.nativeElement`.

它实际上是一个便利方法，其最终实现为 `fixture.debugElement.nativeElement`。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="debugElement-nativeElement">
</code-example>

There's a good reason for this circuitous path to the element.

使用这种迂回的路径访问元素是有充分理由的。

The properties of the `nativeElement` depend upon the runtime environment.
You could be running these tests on a _non-browser_ platform that doesn't have a DOM or
whose DOM-emulation doesn't support the full `HTMLElement` API.

`nativeElement` 的属性依赖于其运行时环境。你可以在*非浏览器*平台上运行这些测试，那些平台上可能没有 DOM，或者其模拟的 DOM 不支持完整的 `HTMLElement` API。

Angular relies on the `DebugElement` abstraction to work safely across _all supported platforms_.
Instead of creating an HTML element tree, Angular creates a `DebugElement` tree that wraps the _native elements_ for the runtime platform.
The `nativeElement` property unwraps the `DebugElement` and returns the platform-specific element object.

Angular 依靠 `DebugElement` 抽象来在其支持的*所有平台上*安全地工作。 Angular 不会创建 HTML 元素树，而会创建一个 `DebugElement` 树来封装运行时平台上的*原生元素*。`nativeElement` 属性会解包 `DebugElement` 并返回特定于平台的元素对象。

Because the sample tests for this guide are designed to run only in a browser,
a `nativeElement` in these tests is always an `HTMLElement`
whose familiar methods and properties you can explore within a test.

由于本指南的范例测试只能在浏览器中运行，因此 `nativeElement` 在这些测试中始终是 `HTMLElement` ，你可以在测试中探索熟悉的方法和属性。

Here's the previous test, re-implemented with `fixture.debugElement.nativeElement`:

下面是把前述测试用 `fixture.debugElement.nativeElement` 重新实现的版本：

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-4">
</code-example>

The `DebugElement` has other methods and properties that
are useful in tests, as you'll see elsewhere in this guide.

这些 `DebugElement` 还有另一些在测试中很有用的方法和属性，你可以在本指南的其他地方看到。

You import the `DebugElement` symbol from the Angular core library.

你可以从 Angular 的 core 库中导入 `DebugElement` 符号。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-debug-element">
</code-example>

{@a by-css}

### _By.css()_

Although the tests in this guide all run in the browser,
some apps might run on a different platform at least some of the time.

虽然本指南中的测试都是在浏览器中运行的，但有些应用可能至少要在某些时候运行在不同的平台上。

For example, the component might render first on the server as part of a strategy to make the application launch faster on poorly connected devices. The server-side renderer might not support the full HTML element API.
If it doesn't support `querySelector`, the previous test could fail.

例如，作为优化策略的一部分，该组件可能会首先在服务器上渲染，以便在连接不良的设备上更快地启动本应用。服务器端渲染器可能不支持完整的 HTML 元素 API。如果它不支持 `querySelector`，之前的测试就会失败。

The `DebugElement` offers query methods that work for all supported platforms.
These query methods take a *predicate* function that returns `true` when a node in the `DebugElement` tree matches the selection criteria.

`DebugElement` 提供了适用于其支持的所有平台的查询方法。这些查询方法接受一个*谓词*函数，当 `DebugElement` 树中的一个节点与选择条件匹配时，该函数返回 `true`。

You create a _predicate_ with the help of a `By` class imported from a
library for the runtime platform. Here's the `By` import for the browser platform:

你可以借助从库中为运行时平台导入 `By` 类来创建一个*谓词*。这里的 `By` 是从浏览器平台导入的。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="import-by">
</code-example>

The following example re-implements the previous test with
`DebugElement.query()` and the browser's `By.css` method.

下面的例子用 `DebugElement.query()` 和浏览器的 `By.css` 方法重新实现了前面的测试。

<code-example
  path="testing/src/app/banner/banner-initial.component.spec.ts"
  region="v4-test-5">
</code-example>

Some noteworthy observations:

一些值得注意的地方：

- The `By.css()` static method selects `DebugElement` nodes
  with a [standard CSS selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors 'CSS selectors').

  静态方法 `By.css()` 会用[标准的 CSS 选择器](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors "CSS 选择器")来选择 `DebugElement` 中的各个节点。

- The query returns a `DebugElement` for the paragraph.

  该查询为 p 元素返回了一个 `DebugElement`

- You must unwrap that result to get the paragraph element.

  你必须解包那个结果才能得到 p 元素。

When you're filtering by CSS selector and only testing properties of a browser's _native element_, the `By.css` approach may be overkill.

当你使用 CSS 选择器进行过滤并且只测试浏览器*原生元素*的属性时，用 `By.css` 方法可能会有点过度。

It's often easier and more clear to filter with a standard `HTMLElement` method
such as `querySelector()` or `querySelectorAll()`.

用 `HTMLElement` 方法（比如 `querySelector()` 或 `querySelectorAll()`）进行过滤通常更简单，更清晰。
