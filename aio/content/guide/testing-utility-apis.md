# Testing Utility APIs

# 测试实用工具 API

This page describes the most useful Angular testing features.

本页面描述了一些最有用的 Angular 测试特性。

The Angular testing utilities include the `TestBed`, the `ComponentFixture`, and a handful of functions that control the test environment.
The [_TestBed_](#testbed-api-summary) and [_ComponentFixture_](#component-fixture-api-summary) classes are covered separately.

Angular 测试实用工具包括 `TestBed`、`ComponentFixture` 以及一些控制测试环境的函数。 [*TestBed*](#testbed-api-summary) 和 [*ComponentFixture*](#component-fixture-api-summary) 类是单独介绍的。

Here's a summary of the stand-alone functions, in order of likely utility:

下面是一些独立函数的摘要，以使用频率排序：

<table>
  <tr>

    <th>

      Function

      函数

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>waitForAsync</code>

    </td>

    <td>

      Runs the body of a test (`it`) or setup (`beforeEach`) function within a special _async test zone_.
      See [discussion above](guide/testing-components-scenarios#waitForAsync).

      在一个特殊的* async 测试区域*中运行测试（`it`）的函数体或准备函数（`beforeEach`）。
      参阅[前面的讨论](guide/testing-components-scenarios#waitForAsync)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>fakeAsync</code>

    </td>

    <td>

      Runs the body of a test (`it`) within a special _fakeAsync test zone_, enabling
      a linear control flow coding style. See [discussion above](guide/testing-components-scenarios#fake-async).

      在一个特殊的* fakeAsync 测试区域*中运行测试（`it`）的函数体，以便启用线性风格的控制流。
      参阅[前面的讨论](guide/testing-components-scenarios#fake-async)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>tick</code>

    </td>

    <td>

      Simulates the passage of time and the completion of pending asynchronous activities
      by flushing both _timer_ and _micro-task_ queues within the _fakeAsync test zone_.

      通过在* fakeAsync 测试区域*中刷新定时器和微任务（micro-task）队列来仿真时间的流逝以及异步活动的完成。

      <div class="alert is-helpful">

      The curious, dedicated reader might enjoy this lengthy blog post,
      ["_Tasks, microtasks, queues and schedules_"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/).

      好奇和执着的读者可能会喜欢这篇长博客：
      "<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/"
      target="_blank">_Tasks, microtasks, queues and schedules_</a>".

      </div>

      Accepts an optional argument that moves the virtual clock forward
      by the specified number of milliseconds,
      clearing asynchronous activities scheduled within that timeframe.
      See [discussion above](guide/testing-components-scenarios#tick).

      接受一个可选参数，它可以把虚拟时钟往前推进特定的微秒数。
      清除调度到那个时间帧中的异步活动。
      参阅[前面的讨论](guide/testing-components-scenarios#tick)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

       <code>inject</code>

    </td>

    <td>

      Injects one or more services from the current `TestBed` injector into a test function.
      It cannot inject a service provided by the component itself.
      See discussion of the [debugElement.injector](guide/testing-components-scenarios#get-injected-services).

      从当前的 `TestBed` 注入器中把一个或多个服务注入到一个测试函数中。
      它不能用于注入组件自身提供的服务。
      参阅 [`debugElement.injector`](guide/testing-components-scenarios#get-injected-services) 部分的讨论。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>discardPeriodicTasks</code>

    </td>

    <td>

      When a `fakeAsync()` test ends with pending timer event _tasks_ (queued `setTimeOut` and `setInterval` callbacks),
      the test fails with a clear error message.

      当 `fakeAsync` 测试程序以正在运行的计时器事件**任务**（排队中的 `setTimeOut` 和 `setInterval` 的回调）结束时，
      测试会失败，并显示一条明确的错误信息。

      In general, a test should end with no queued tasks.
      When pending timer tasks are expected, call `discardPeriodicTasks` to flush the _task_ queue
      and avoid the error.

      一般来讲，测试程序应该以无排队任务结束。
      当待执行计时器任务存在时，调用 `discardPeriodicTasks` 来触发**任务**队列，防止该错误发生。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>flushMicrotasks</code>

    </td>

    <td>

      When a `fakeAsync()` test ends with pending _micro-tasks_ such as unresolved promises,
      the test fails with a clear error message.

      当 `fakeAsync` 测试程序以待执行**微任务**（比如未解析的承诺）结束时，测试会失败并显示明确的错误信息。

      In general, a test should wait for micro-tasks to finish.
      When pending microtasks are expected, call `flushMicrotasks` to flush the  _micro-task_ queue
      and avoid the error.

      一般来说，测试应该等待微任务结束。
      当待执行微任务存在时，调用 `flushMicrotasks` 来触发**微任务**队列，防止该错误发生。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>ComponentFixtureAutoDetect</code>

    </td>

    <td>

      A provider token for a service that turns on [automatic change detection](guide/testing-components-scenarios#automatic-change-detection).

      一个服务提供者令牌，用于开启[自动变更检测](guide/testing-components-scenarios#automatic-change-detection)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>getTestBed</code>

    </td>

    <td>

      Gets the current instance of the `TestBed`.
      Usually unnecessary because the static class methods of the `TestBed` class are typically sufficient.
      The `TestBed` instance exposes a few rarely used members that are not available as
      static methods.

      获取当前 `TestBed` 实例。
      通常用不上，因为 `TestBed` 的静态类方法已经够用。
      `TestBed` 实例有一些很少需要用到的方法，它们没有对应的静态方法。

    </td>

  </tr>
</table>

<hr>

{@a testbed-class-summary}

## _TestBed_ class summary

## `TestBed` 类摘要

The `TestBed` class is one of the principal Angular testing utilities.
Its API is quite large and can be overwhelming until you've explored it,
a little at a time. Read the early part of this guide first
to get the basics before trying to absorb the full API.

`TestBed` 类是 Angular 测试工具的主要类之一。它的 API 很庞大，可能有点过于复杂，直到你一点一点的探索它们。
阅读本章前面的部分，了解了基本的知识以后，再试着了解完整 API。

The module definition passed to `configureTestingModule`
is a subset of the `@NgModule` metadata properties.

传给 `configureTestingModule` 的模块定义是 `@NgModule` 元数据属性的子集。

<code-example language="javascript">
  type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array&lt;SchemaMetadata | any[]&gt;;
  };
</code-example>

{@a metadata-override-object}

Each override method takes a `MetadataOverride<T>` where `T` is the kind of metadata
appropriate to the method, that is, the parameter of an `@NgModule`,
`@Component`, `@Directive`, or `@Pipe`.

每一个重载方法接受一个 `MetadataOverride<T>`，这里 `T` 是适合这个方法的元数据类型，也就是 `@NgModule`、`@Component`、`@Directive` 或者 `@Pipe` 的参数。

<code-example language="javascript">
  type MetadataOverride&lt;T&gt; = {
    add?: Partial&lt;T&gt;;
    remove?: Partial&lt;T&gt;;
    set?: Partial&lt;T&gt;;
  };
</code-example>

{@a testbed-methods}

{@a testbed-api-summary}

The `TestBed` API consists of static class methods that either update or reference a _global_ instance of the `TestBed`.

`TestBed` 的 API 包含了一系列静态类方法，它们更新或者引用**全局**的 `TestBed` 实例。

Internally, all static methods cover methods of the current runtime `TestBed` instance,
which is also returned by the `getTestBed()` function.

在内部，所有静态方法在 `getTestBed()` 函数返回的当前运行时间的 `TestBed` 实例上都有对应的方法。

Call `TestBed` methods _within_ a `beforeEach()` to ensure a fresh start before each individual test.

在 `BeforeEach()` 内调用 `TestBed` 方法，以确保在运行每个单独测试时，都有崭新的开始。

Here are the most important static methods, in order of likely utility.

这里列出了最重要的静态方法，以使用频率排序：

<table>
  <tr>

    <th>

      Methods

      方法

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>configureTestingModule</code>

    </td>

    <td>

      The testing shims (`karma-test-shim`, `browser-test-shim`)
      establish the [initial test environment](guide/testing) and a default testing module.
      The default testing module is configured with basic declaratives and some Angular service substitutes that every tester needs.

      测试垫片（`karma-test-shim`, `browser-test-shim`）创建了[初始测试环境](guide/testing)和默认测试模块。
      默认测试模块是使用基本声明和一些 Angular 服务替代品，它们是所有测试程序都需要的。

      Call `configureTestingModule` to refine the testing module configuration for a particular set of tests
      by adding and removing imports, declarations (of components, directives, and pipes), and providers.

      调用 `configureTestingModule` 来为一套特定的测试定义测试模块配置，添加和删除导入、（组件、指令和管道的）声明和服务提供者。
    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>compileComponents</code>

    </td>

    <td>

      Compile the testing module asynchronously after you've finished configuring it.
      You **must** call this method if _any_ of the testing module components have a `templateUrl`
      or `styleUrls` because fetching component template and style files is necessarily asynchronous.
      See [above](guide/testing-components-scenarios#compile-components).

      在配置好测试模块之后，异步编译它。
      如果测试模块中的*任何一个*组件具有 `templateUrl` 或 `styleUrls`，那么你**必须**调用这个方法，因为获取组件的模板或样式文件必须是异步的。
      参阅[前面的讨论](guide/testing-components-scenarios#compile-components)。

      After calling `compileComponents`, the `TestBed` configuration is frozen for the duration of the current spec.

      调用完 `compileComponents` 之后，`TestBed` 的配置就会在当前测试期间被冻结。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>createComponent<T></code>

    </td>

    <td>

      Create an instance of a component of type `T` based on the current `TestBed` configuration.
      After calling `compileComponent`, the `TestBed` configuration is frozen for the duration of the current spec.

      基于当前 `TestBed` 的配置创建一个类型为 T 的组件实例。
      一旦调用，`TestBed` 的配置就会在当前测试期间被冻结。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overrideModule</code>

    </td>

    <td>

      Replace metadata for the given `NgModule`. Recall that modules can import other modules.
      The `overrideModule` method can reach deeply into the current testing module to
      modify one of these inner modules.

      替换指定的 `NgModule` 的元数据。回想一下，模块可以导入其它模块。
      `overrideModule` 方法可以深入到当前测试模块深处，修改其中一个内部模块。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overrideComponent</code>

    </td>

    <td>

      Replace metadata for the given component class, which could be nested deeply
      within an inner module.

      替换指定组件类的元数据，该组件类可能嵌套在一个很深的内部模块中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overrideDirective</code>

    </td>

    <td>

      Replace metadata for the given directive class, which could be nested deeply
      within an inner module.

      替换指定指令类的元数据，该指令可能嵌套在一个很深的内部模块中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>overridePipe</code>

    </td>

    <td>

      Replace metadata for the given pipe class, which could be nested deeply
      within an inner module.

      替换指定管道类的元数据，该管道可能嵌套在一个很深的内部模块中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      {@a testbed-inject}

      <code>inject</code>
    </td>

    <td>

      Retrieve a service from the current `TestBed` injector.

      从当前 `TestBed` 注入器获取一个服务。

      The `inject` function is often adequate for this purpose.
      But `inject` throws an error if it can't provide the service.

      `inject` 函数通常都能胜任这项工作，但是如果它没法提供该服务时就会抛出一个异常。

      What if the service is optional?

      如果该服务是可选的呢？

      The `TestBed.inject()` method takes an optional second parameter,
      the object to return if Angular can't find the provider
      (`null` in this example):

      `TestBed.inject()` 方法可以接受可选的第二参数，当 Angular 找不到指定的服务提供者时，就会返回该对象（下面这个例子中是 `null` ）：

      <code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="testbed-get-w-null" header="app/demo/demo.testbed.spec.ts"></code-example>

      After calling `TestBed.inject`, the `TestBed` configuration is frozen for the duration of the current spec.

      调用了 `TestBed.inject` 之后然后通过调用，`TestBed` 的配置就会在当前测试期间被冻结。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      {@a testbed-initTestEnvironment}

      <code>initTestEnvironment</code>

    </td>

    <td>

      Initialize the testing environment for the entire test run.

      为整套测试的运行初始化测试环境。

      The testing shims (`karma-test-shim`, `browser-test-shim`) call it for you
      so there is rarely a reason for you to call it yourself.

      测试垫片(`karma-test-shim`, `browser-test-shim`)会为你调用它，所以你很少需要自己调用它。

      You may call this method _exactly once_. If you must change
      this default in the middle of your test run, call `resetTestEnvironment` first.

      这个方法只能被调用**一次**。如果确实需要在测试程序运行期间改变这个默认设置，那么先调用 `resetTestEnvironment`。

      Specify the Angular compiler factory, a `PlatformRef`, and a default Angular testing module.
      Alternatives for non-browser platforms are available in the general form
      `@angular/platform-<platform_name>/testing/<platform_name>`.

      指定 Angular 编译器工厂，`PlatformRef`，和默认 Angular 测试模块。
      以 `@angular/platform-<platform_name>/testing/<platform_name>` 的形式提供非浏览器平台的替代品。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>resetTestEnvironment</code>

    </td>

    <td>

      Reset the initial test environment, including the default testing module.

      重设初始测试环境，包括默认测试模块在内。

    </td>

  </tr>
</table>

A few of the `TestBed` instance methods are not covered by static `TestBed` _class_ methods.
These are rarely needed.

少数 `TestBed` 实例方法没有对应的静态方法。它们很少被使用。

{@a component-fixture-api-summary}

## The _ComponentFixture_

## `ComponentFixture` 类

The `TestBed.createComponent<T>`
creates an instance of the component `T`
and returns a strongly typed `ComponentFixture` for that component.

`TestBed.createComponent<T>` 会创建一个组件 `T` 的实例，并为该组件返回一个强类型的 `ComponentFixture`。

The `ComponentFixture` properties and methods provide access to the component,
its DOM representation, and aspects of its Angular environment.

`ComponentFixture` 的属性和方法提供了对组件、它的 DOM 和它的 Angular 环境方面的访问。

{@a component-fixture-properties}

### _ComponentFixture_ properties

### `ComponentFixture` 的属性

Here are the most important properties for testers, in order of likely utility.

下面是对测试最重要的属性，以使用频率排序：

<table>
  <tr>

    <th>

      Properties

      属性

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>componentInstance</code>

    </td>

    <td>

      The instance of the component class created by `TestBed.createComponent`.

      被 `TestBed.createComponent` 创建的组件类实例。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>debugElement</code>

    </td>

    <td>

      The `DebugElement` associated with the root element of the component.

      与组件根元素关联的 `DebugElement`。

      The `debugElement` provides insight into the component and its DOM element during test and debugging.
      It's a critical property for testers. The most interesting members are covered [below](#debug-element-details).

      `debugElement` 提供了在测试和调试期间深入探查组件及其 DOM 元素的功能。
      它对于测试者是一个极其重要的属性。它的大多数主要成员在[后面](#debug-element-details)都有讲解。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>nativeElement</code>

    </td>

    <td>

      The native DOM element at the root of the component.

      组件的原生根 DOM 元素。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>changeDetectorRef</code>

    </td>

    <td>

      The `ChangeDetectorRef` for the component.

      组件的 `ChangeDetectorRef`。

      The `ChangeDetectorRef` is most valuable when testing a
      component that has the `ChangeDetectionStrategy.OnPush` method
      or the component's change detection is under your programmatic control.

      在测试一个拥有 `ChangeDetectionStrategy.OnPush` 的组件，或者在组件的变化测试在你的程序控制下时，`ChangeDetectorRef` 是最重要的。

    </td>

  </tr>
</table>

{@a component-fixture-methods}

### _ComponentFixture_ methods

### `ComponentFixture` 的方法

The _fixture_ methods cause Angular to perform certain tasks on the component tree.
Call these method to trigger Angular behavior in response to simulated user action.

**fixture** 方法使 Angular 对组件树执行某些任务。
在触发 Angular 行为来模拟的用户行为时，调用这些方法。

Here are the most useful methods for testers.

下面是对测试最有用的方法。

<table>
  <tr>

    <th>

      Methods

      方法

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>detectChanges</code>

    </td>

    <td>

      Trigger a change detection cycle for the component.

      为组件触发一轮变化检查。

      Call it to initialize the component (it calls `ngOnInit`) and after your
      test code, change the component's data bound property values.
      Angular can't see that you've changed `personComponent.name` and won't update the `name`
      binding until you call `detectChanges`.

      调用它来初始化组件（它调用 `ngOnInit`）。或者在你的测试代码改变了组件的数据绑定属性值后调用它。
      Angular 不能检测到你已经改变了 `personComponent.name` 属性，也不会更新 `name` 的绑定，直到你调用了 `detectChanges`。

      Runs `checkNoChanges` afterwards to confirm that there are no circular updates unless
      called as `detectChanges(false)`;

      之后，运行 `checkNoChanges`，来确认没有循环更新，除非它被这样调用：`detectChanges(false)`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>autoDetectChanges</code>

    </td>

    <td>

      Set this to `true` when you want the fixture to detect changes automatically.

      如果你希望这个夹具自动检测变更，就把这个设置为 `true`。

      When autodetect is `true`, the test fixture calls `detectChanges` immediately
      after creating the component. Then it listens for pertinent zone events
      and calls `detectChanges` accordingly.
      When your test code modifies component property values directly,
      you probably still have to call `fixture.detectChanges` to trigger data binding updates.

      当自动检测打开时，测试 fixture 监听 **zone** 事件，并调用 `detectChanges`。
      当你的测试代码直接修改了组件属性值时，你还是要调用 `fixture.detectChanges` 来触发数据绑定更新。

      The default is `false`. Testers who prefer fine control over test behavior
      tend to keep it `false`.

      默认值是 `false`，喜欢对测试行为进行精细控制的测试者一般保持它为 `false`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>checkNoChanges</code>

    </td>

    <td>

      Do a change detection run to make sure there are no pending changes.
      Throws an exceptions if there are.

      运行一次变更检测来确认没有待处理的变化。如果有未处理的变化，它将抛出一个错误。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>isStable</code>

    </td>

    <td>

      If the fixture is currently _stable_, returns `true`.
      If there are async tasks that have not completed, returns `false`.

      如果 fixture 当前是**稳定的**，则返回 `true`。
      如果有异步任务没有完成，则返回 `false`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>whenStable</code>

    </td>

    <td>

      Returns a promise that resolves when the fixture is stable.

      返回一个承诺，在 fixture 稳定时解析。

      To resume testing after completion of asynchronous activity or
      asynchronous change detection, hook that promise.
      See [above](guide/testing-components-scenarios#when-stable).

      要想在完成了异步活动或异步变更检测之后再继续测试，可以对那个承诺对象进行挂钩。
      参阅 [前面](guide/testing-components-scenarios#when-stable)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>destroy</code>

    </td>

    <td>

      Trigger component destruction.

      触发组件的销毁。

    </td>

  </tr>
</table>

{@a debug-element-details}

#### _DebugElement_

The `DebugElement` provides crucial insights into the component's DOM representation.

`DebugElement` 提供了对组件的 DOM 的访问。

From the test root component's `DebugElement` returned by `fixture.debugElement`,
you can walk (and query) the fixture's entire element and component subtrees.

`fixture.debugElement` 返回测试根组件的 `DebugElement`，通过它你可以访问（查询）fixture 的整个元素和组件子树。

Here are the most useful `DebugElement` members for testers, in approximate order of utility:

下面是 `DebugElement` 最有用的成员，以使用频率排序。

<table>
  <tr>

    <th>

      Member

      成员

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>nativeElement</code>

    </td>

    <td>

      The corresponding DOM element in the browser (null for WebWorkers).

      与浏览器中 DOM 元素对应（WebWorkers 时，值为 null）。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>query</code>

    </td>

    <td>

      Calling `query(predicate: Predicate<DebugElement>)` returns the first `DebugElement`
      that matches the [predicate](#query-predicate) at any depth in the subtree.

      调用 `query(predicate: Predicate<DebugElement>)` 会在子树的任意深度中查找并返回能和[谓词函数](#query-predicate)匹配的第一个 `DebugElement`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>queryAll</code>

    </td>

    <td>

      Calling `queryAll(predicate: Predicate<DebugElement>)` returns all `DebugElements`
      that matches the [predicate](#query-predicate) at any depth in subtree.

      调用 `queryAll(predicate: Predicate<DebugElement>)` 会在子树的任意深度中查找能和[谓词函数](#query-predicate)匹配的所有 `DebugElement`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>injector</code>

    </td>

    <td>

      The host dependency injector.
      For example, the root element's component instance injector.

      宿主依赖注入器。
      比如，根元素的组件实例注入器。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>componentInstance</code>

    </td>

    <td>

      The element's own component instance, if it has one.

      元素自己的组件实例（如果有）。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>context</code>

    </td>

    <td>

      An object that provides parent context for this element.
      Often an ancestor component instance that governs this element.

      为元素提供父级上下文的对象。
      通常是控制该元素的祖级组件实例。

      When an element is repeated within `*ngFor`, the context is an `NgForRow` whose `$implicit`
      property is the value of the row instance value.
      For example, the `hero` in `*ngFor="let hero of heroes"`.

      当一个元素被 `*ngFor` 重复，它的上下文为 `NgForRow`，它的 `$implicit` 属性值是该行的实例值。
      比如，`*ngFor="let hero of heroes"` 里的 `hero`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>children</code>

    </td>

    <td>

      The immediate `DebugElement` children. Walk the tree by descending through `children`.

      `DebugElement` 的直接子元素。可以通过继续深入 `children` 来遍历这棵树。

      <div class="alert is-helpful">

      `DebugElement` also has `childNodes`, a list of `DebugNode` objects.
      `DebugElement` derives from `DebugNode` objects and there are often
      more nodes than elements. Testers can usually ignore plain nodes.

      `DebugElement` 还有 `childNodes`，即 `DebugNode` 对象列表。
      `DebugElement` 从 `DebugNode` 对象衍生，而且通常节点（node）比元素多。测试者通常忽略赤裸节点。

      </div>

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>parent</code>

    </td>

    <td>

      The `DebugElement` parent. Null if this is the root element.

      `DebugElement` 的父级。如果 `DebugElement` 是根元素，`parent` 为 null。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>name</code>

    </td>

    <td>

      The element tag name, if it is an element.

      元素的标签名字，如果它是一个元素的话。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>triggerEventHandler</code>

    </td>

    <td>

      Triggers the event by its name if there is a corresponding listener
      in the element's `listeners` collection.
      The second parameter is the _event object_ expected by the handler.
      See [above](guide/testing-components-scenarios#trigger-event-handler).

      如果在该元素的 `listeners` 集合中有相应的监听器，就根据名字触发这个事件。
      第二个参数是该处理器函数所需的*事件对象*。参阅[前面](guide/testing-components-scenarios#trigger-event-handler)。

      If the event lacks a listener or there's some other problem,
      consider calling `nativeElement.dispatchEvent(eventObject)`.

      如果事件缺乏监听器，或者有其它问题，考虑调用 `nativeElement.dispatchEvent(eventObject)`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>listeners</code>

    </td>

    <td>

      The callbacks attached to the component's `@Output` properties and/or the element's event properties.

      元素的 `@Output` 属性以及/或者元素的事件属性所附带的回调函数。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>providerTokens</code>

    </td>

    <td>

      This component's injector lookup tokens.
      Includes the component itself plus the tokens that the component lists in its `providers` metadata.

      组件注入器的查询令牌。
      包括组件自己的令牌和组件的 `providers` 元数据中列出来的令牌。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>source</code>

    </td>

    <td>

      Where to find this element in the source component template.

      source 是在源组件模板中查询这个元素的处所。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>references</code>

    </td>

    <td>

      Dictionary of objects associated with template local variables (e.g. `#foo`),
      keyed by the local variable name.

      与模板本地变量（比如 `#foo`）关联的词典对象，关键字与本地变量名字配对。

    </td>

  </tr>
</table>

{@a query-predicate}

The `DebugElement.query(predicate)` and `DebugElement.queryAll(predicate)` methods take a
predicate that filters the source element's subtree for matching `DebugElement`.

`DebugElement.query(predicate)` 和 `DebugElement.queryAll(predicate)` 方法接受一个条件方法，
它过滤源元素的子树，返回匹配的 `DebugElement`。

The predicate is any method that takes a `DebugElement` and returns a _truthy_ value.
The following example finds all `DebugElements` with a reference to a template local variable named "content":

这个条件方法是任何接受一个 `DebugElement` 并返回真值的方法。
下面的例子查询所有拥有名为 `content` 的模块本地变量的所有 `DebugElement`：

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="custom-predicate" header="app/demo/demo.testbed.spec.ts"></code-example>

The Angular `By` class has three static methods for common predicates:

Angular 的 `By` 类为常用条件方法提供了三个静态方法：

- `By.all` - return all elements.

   `By.all` - 返回所有元素

- `By.css(selector)` - return elements with matching CSS selectors.

   `By.css(selector)` - 返回符合 CSS 选择器的元素。

- `By.directive(directive)` - return elements that Angular matched to an instance of the directive class.

   `By.directive(directive)` - 返回 Angular 能匹配一个指令类实例的所有元素。

<code-example path="testing/src/app/hero/hero-list.component.spec.ts" region="by" header="app/hero/hero-list.component.spec.ts"></code-example>

<hr>

