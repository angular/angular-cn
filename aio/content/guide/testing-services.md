# Testing services

# 测试服务

To check that your services are working as you intend, you can write tests specifically for them.

为了检查你的服务是否正常工作，你可以专门为它们编写测试。

<div class="alert is-helpful">

  For the sample app that the testing guides describe, see the <live-example name="testing" embedded-style noDownload>sample app</live-example>.

  对于本测试指南中描述的范例应用，参阅<live-example name="testing" embedded-style noDownload>范例应用</live-example>。

  For the tests features in the testing guides, see <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>.

  要了解本测试指南中涉及的测试特性，请参阅<live-example name="testing" stackblitz="specs" noDownload>tests</live-example>。

</div>


Services are often the easiest files to unit test.
Here are some synchronous and asynchronous unit tests of the `ValueService`
written without assistance from Angular testing utilities.

服务往往是最容易进行单元测试的文件。下面是一些针对 `ValueService` 的同步和异步单元测试，甚至不需要 Angular 测试工具的帮助。

<code-example path="testing/src/app/demo/demo.spec.ts" region="ValueService" header="app/demo/demo.spec.ts"></code-example>

{@a services-with-dependencies}

## Services with dependencies

## 有依赖的服务

Services often depend on other services that Angular injects into the constructor.
In many cases, it's easy to create and _inject_ these dependencies by hand while
calling the service's constructor.

服务通常依赖于 Angular 在构造函数中注入的其它服务。在很多情况下，调用服务的构造函数时，很容易手动创建和*注入*这些依赖。

The `MasterService` is a simple example:

`MasterService` 就是一个简单的例子：

<code-example path="testing/src/app/demo/demo.ts" region="MasterService" header="app/demo/demo.ts"></code-example>

`MasterService` delegates its only method, `getValue`, to the injected `ValueService`.

`MasterService` 只把它唯一的方法 `getValue` 委托给了所注入的 `ValueService` 。

Here are several ways to test it.

这里有几种测试方法。

<code-example path="testing/src/app/demo/demo.spec.ts" region="MasterService" header="app/demo/demo.spec.ts"></code-example>

The first test creates a `ValueService` with `new` and passes it to the `MasterService` constructor.

第一个测试使用 `new` 创建了一个 `ValueService`，并把它传给了 `MasterService` 的构造函数。

However, injecting the real service rarely works well as most dependent services are difficult to create and control.

然而，注入真实服务很难工作良好，因为大多数被依赖的服务都很难创建和控制。

Instead you can mock the dependency, use a dummy value, or create a
[spy](https://jasmine.github.io/2.0/introduction.html#section-Spies)
on the pertinent service method.

相反，你可以模拟依赖、使用仿制品，或者在相关的服务方法上[创建一个测试间谍](https://jasmine.github.io/2.0/introduction.html#section-Spies)。

<div class="alert is-helpful">

Prefer spies as they are usually the easiest way to mock services.

我更喜欢用测试间谍，因为它们通常是模拟服务的最简单方式。

</div>

These standard testing techniques are great for unit testing services in isolation.

这些标准的测试技巧非常适合对服务进行单独测试。

However, you almost always inject services into application classes using Angular
dependency injection and you should have tests that reflect that usage pattern.
Angular testing utilities make it easy to investigate how injected services behave.

但是，你几乎总是使用 Angular 依赖注入机制来将服务注入到应用类中，你应该有一些测试来体现这种使用模式。 Angular 测试实用工具可以让你轻松调查这些注入服务的行为。

## Testing services with the _TestBed_

## 使用 *TestBed* 测试服务

Your app relies on Angular [dependency injection (DI)](guide/dependency-injection)
to create services.
When a service has a dependent service, DI finds or creates that dependent service.
And if that dependent service has its own dependencies, DI finds-or-creates them as well.

你的应用依靠 Angular 的[依赖注入（DI）](guide/dependency-injection)来创建服务。当服务有依赖时，DI 会查找或创建这些被依赖的服务。如果该被依赖的服务还有自己的依赖，DI 也会查找或创建它们。

As service _consumer_, you don't worry about any of this.
You don't worry about the order of constructor arguments or how they're created.

作为服务的*消费者*，你不应该关心这些。你不应该关心构造函数参数的顺序或它们是如何创建的。

As a service _tester_, you must at least think about the first level of service dependencies
but you _can_ let Angular DI do the service creation and deal with constructor argument order
when you use the `TestBed` testing utility to provide and create services.

作为服务的*测试人员*，你至少要考虑第一层的服务依赖，但当你用 `TestBed` 测试实用工具来提供和创建服务时，你*可以*让 Angular DI 来创建服务并处理构造函数的参数顺序。

{@a testbed}

## Angular _TestBed_

The `TestBed` is the most important of the Angular testing utilities.
The `TestBed` creates a dynamically-constructed Angular _test_ module that emulates
an Angular [@NgModule](guide/ngmodules).

`TestBed` 是 Angular 测试实用工具中最重要的。 `TestBed` 创建了一个动态构造的 Angular *测试*模块，用来模拟一个 Angular 的 [@NgModule](guide/ngmodules) 。

The `TestBed.configureTestingModule()` method takes a metadata object that can have most of the properties of an [@NgModule](guide/ngmodules).

`TestBed.configureTestingModule()` 方法接受一个元数据对象，它可以拥有[@NgModule](guide/ngmodules)的大部分属性。

To test a service, you set the `providers` metadata property with an
array of the services that you'll test or mock.

要测试某个服务，你可以在元数据属性 `providers` 中设置一个要测试或模拟的服务数组。

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-before-each" header="app/demo/demo.testbed.spec.ts (provide ValueService in beforeEach)"></code-example>

Then inject it inside a test by calling `TestBed.inject()` with the service class as the argument.

将服务类作为参数调用 `TestBed.inject()`，将它注入到测试中。

<div class="alert is-helpful">

**Note:** `TestBed.get()` was deprecated as of Angular version 9.
To help minimize breaking changes, Angular introduces a new function called `TestBed.inject()`, which you should use instead.
For information on the removal of `TestBed.get()`,
see its entry in the [Deprecations index](guide/deprecations#index).

**注意：** `TestBed.get()` 已在 Angular 9 中弃用。为了帮助减少重大变更，Angular 引入了一个名为 `TestBed.inject()` 的新函数，你可以改用它。关于删除 `TestBed.get()` 的信息，请参阅[弃用索引](guide/deprecations#index)中的条目。

</div>

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-inject-it"></code-example>

Or inside the `beforeEach()` if you prefer to inject the service as part of your setup.

或者，如果你喜欢把这个服务作为设置代码的一部分进行注入，也可以在 `beforeEach()` 中做。

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="value-service-inject-before-each"> </code-example>

When testing a service with a dependency, provide the mock in the `providers` array.

测试带依赖的服务时，需要在 `providers` 数组中提供 mock。

In the following example, the mock is a spy object.

在下面的例子中，mock 是一个间谍对象。

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="master-service-before-each"></code-example>

The test consumes that spy in the same way it did earlier.

该测试会像以前一样使用该间谍。

<code-example path="testing/src/app/demo/demo.testbed.spec.ts" region="master-service-it">
</code-example>

{@a no-before-each}

## Testing without _beforeEach()_

## 没有 *beforeEach()* 的测试

Most test suites in this guide call `beforeEach()` to set the preconditions for each `it()` test
and rely on the `TestBed` to create classes and inject services.

本指南中的大多数测试套件都会调用 `beforeEach()` 来为每一个 `it()` 测试设置前置条件，并依赖 `TestBed` 来创建类和注入服务。

There's another school of testing that never calls `beforeEach()` and prefers to create classes explicitly rather than use the `TestBed`.

还有另一种测试，它们从不调用 `beforeEach()`，而是更喜欢显式地创建类，而不是使用 `TestBed`。

Here's how you might rewrite one of the `MasterService` tests in that style.

你可以用这种风格重写 `MasterService` 中的一个测试。

Begin by putting re-usable, preparatory code in a _setup_ function instead of `beforeEach()`.

首先，在 *setup* 函数中放入可供复用的预备代码，而不用 `beforeEach()` 。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup"
  header="app/demo/demo.spec.ts (setup)"></code-example>

The `setup()` function returns an object literal
with the variables, such as `masterService`, that a test might reference.
You don't define _semi-global_ variables (e.g., `let masterService: MasterService`)
in the body of the `describe()`.

`setup()` 函数返回一个包含测试可能引用的变量（如 `masterService`）的对象字面量。你并没有在 `describe()` 的函数体中定义*半全局*变量（例如 `let masterService: MasterService` ）。

Then each test invokes `setup()` in its first line, before continuing
with steps that manipulate the test subject and assert expectations.

然后，每个测试都会在第一行调用 `setup()`，然后继续执行那些操纵被测主体和断言期望值的步骤。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-test"></code-example>

Notice how the test uses
[_destructuring assignment_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
to extract the setup variables that it needs.

注意测试中是如何使用[*解构赋值*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)来提取所需的设置变量的。

<code-example
  path="testing/src/app/demo/demo.spec.ts"
  region="no-before-each-setup-call">
</code-example>

Many developers feel this approach is cleaner and more explicit than the
traditional `beforeEach()` style.

许多开发人员都觉得这种方法比传统的 `beforeEach()` 风格更清晰明了。

Although this testing guide follows the traditional style and
the default [CLI schematics](https://github.com/angular/angular-cli)
generate test files with `beforeEach()` and `TestBed`,
feel free to adopt _this alternative approach_ in your own projects.

虽然这个测试指南遵循传统的样式，并且默认的[CLI 原理图](https://github.com/angular/angular-cli)会生成带有 `beforeEach()` 和 `TestBed` 的测试文件，但你可以在自己的项目中采用*这种替代方式*。

## Testing HTTP services

## 测试 HTTP 服务

Data services that make HTTP calls to remote servers typically inject and delegate
to the Angular [`HttpClient`](guide/http) service for XHR calls.

对远程服务器进行 HTTP 调用的数据服务通常会注入并委托给 Angular 的 [`HttpClient`](guide/http)服务进行 XHR 调用。

You can test a data service with an injected `HttpClient` spy as you would
test any service with a dependency.
<code-example
  path="testing/src/app/model/hero.service.spec.ts"
  region="test-with-spies"
  header="app/model/hero.service.spec.ts (tests with spies)">
</code-example>

你可以测试一个注入了 `HttpClient` 间谍的数据服务，就像测试所有带依赖的服务一样。

<div class="alert is-important">

The `HeroService` methods return `Observables`. You must
_subscribe_ to an observable to (a) cause it to execute and (b)
assert that the method succeeds or fails.

`HeroService` 方法会返回 `Observables` 。你必须*订阅*一个可观察对象（a）让它执行，（b）断言该方法成功或失败。

The `subscribe()` method takes a success (`next`) and fail (`error`) callback.
Make sure you provide _both_ callbacks so that you capture errors.
Neglecting to do so produces an asynchronous uncaught observable error that
the test runner will likely attribute to a completely different test.

`subscribe()` 方法会接受成功（ `next` ）和失败（ `error` ）回调。确保你会同时提供*这两个*回调函数，以便捕获错误。如果不这样做就会产生一个异步的、没有被捕获的可观察对象的错误，测试运行器可能会把它归因于一个完全不相关的测试。

</div>

## _HttpClientTestingModule_

Extended interactions between a data service and the `HttpClient` can be complex
and difficult to mock with spies.

数据服务和 `HttpClient` 之间的扩展交互可能比较复杂，并且难以通过间谍进行模拟。

The `HttpClientTestingModule` can make these testing scenarios more manageable.

`HttpClientTestingModule` 可以让这些测试场景更易于管理。

While the _code sample_ accompanying this guide demonstrates `HttpClientTestingModule`,
this page defers to the [Http guide](guide/http#testing-http-requests),
which covers testing with the `HttpClientTestingModule` in detail.

虽然本指南附带的*范例代码*演示了 `HttpClientTestingModule`，但是本页面还是要引用一下 [Http 指南](guide/http#testing-http-requests)，那份指南中详细介绍了 `HttpClientTestingModule`
