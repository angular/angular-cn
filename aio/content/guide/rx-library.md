# The RxJS library

# RxJS 库

Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change ([Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming)). RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code ([RxJS Docs](http://reactivex.io/rxjs/)).

响应式编程是一种面向数据流和变更传播的异步编程范式（[Wikipedia](https://zh.wikipedia.org/wiki/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%BC%96%E7%A8%8B)）。RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单 ([RxJS Docs](http://reactivex.io/rxjs/))。

RxJS provides an implementation of the `Observable` type, which is needed until the type becomes part of the language and until browsers support it. The library also provides utility functions for creating and working with observables. These utility functions can be used for:

RxJS 提供了一种对 `Observable` 类型的实现，直到 `Observable` 成为了 JavaScript 语言的一部分并且浏览器支持它之前，它都是必要的。这个库还提供了一些工具函数，用于创建和使用可观察对象。这些工具函数可用于：

* Converting existing code for async operations into observables

   把现有的异步代码转换成可观察对象

* Iterating through the values in a stream

   迭代流中的各个值

* Mapping values to different types

   把这些值映射成其它类型

* Filtering streams

   对流进行过滤

* Composing multiple streams

   组合多个流

## Observable creation functions

## 创建可观察对象的函数

RxJS offers a number of functions that can be used to create new observables. These functions can simplify the process of creating observables from things such as events, timers, promises, and so on. For example:

RxJS 提供了一些用来创建可观察对象的函数。这些函数可以简化根据某些东西创建可观察对象的过程，比如事件、定时器、承诺等等。比如：

<code-example path="rx-library/src/simple-creation.ts" region="promise" title="Create an observable from a promise"></code-example>

<code-example path="rx-library/src/simple-creation.ts" region="interval" title="Create an observable from a counter"></code-example>

<code-example path="rx-library/src/simple-creation.ts" region="event" title="Create an observable from an event"></code-example>

<code-example path="rx-library/src/simple-creation.ts" region="ajax" title="Create an observable that creates an AJAX request"></code-example>

## Operators

## 操作符

Operators are functions that build on the observables foundation to enable sophisticated manipulation of collections. For example, RxJS defines operators such as `map()`, `filter()`, `concat()`, and `flatMap()`.

操作符是基于可观察对象构建的一些对集合进行复杂操作的函数。RxJS 定义了一些操作符，比如 `map()`、`filter()`、`concat()` 和 `flatMap()`。

Operators take configuration options, and they return a function that takes a source observable. When executing this returned function, the operator observes the source observable’s emitted values, transforms them, and returns a new observable of those transformed values. Here is a simple example:

操作符接受一些配置项，然后返回一个以来源可观察对象为参数的函数。当执行这个返回的函数时，这个操作符会观察来源可观察对象中发出的值，转换它们，并返回由转换后的值组成的新的可观察对象。下面是一个简单的例子：

<code-example path="rx-library/src/operators.ts" title="Map operator"></code-example>

You can use _pipes_ to link operators together. Pipes let you combine multiple functions into a single function. The `pipe()` function takes as its arguments the functions you want to combine, and returns a new function that, when executed, runs the composed functions in sequence.

你可以使用*管道*来把这些操作符链接起来。管道让你可以把多个由操作符返回的函数组合成一个。`pipe()` 函数以你要组合的这些函数作为参数，并且返回一个新的函数，当执行这个新函数时，就会顺序执行那些被组合进去的函数。

A set of operators applied to an observable is a recipe&mdash;that is, a set of instructions for producing the values you’re interested in. By itself, the recipe doesn’t do anything. You need to call `subscribe()` to produce a result through the recipe.

应用于某个可观察对象上的一组操作符就像一个菜谱 —— 也就是说，对你感兴趣的这些值进行处理的一组操作步骤。这个菜谱本身不会做任何事。你需要调用 `subscribe()` 来通过这个菜谱生成一个结果。

Here’s an example:

例子如下：

<code-example path="rx-library/src/operators.1.ts" title="Standalone pipe function"></code-example>

The `pipe()` function is also a method on the RxJS `Observable`, so you use this shorter form to define the same operation:

`pipe()` 函数也同时是 RxJS 的 `Observable` 上的一个方法，所以你可以用下列简写形式来达到同样的效果：

<code-example path="rx-library/src/operators.2.ts" title="Observable.pipe function"></code-example>

### Common operators

### 常用操作符

RxJS provides many operators, but only a handful are used frequently. For a list of operators and usage samples, visit the [RxJS API Documentation](https://rxjs-dev.firebaseapp.com/api).

RxJS 提供了很多操作符，不过只有少数是常用的。
下面是一个常用操作符的列表和用法范例，参见 [RxJS API 文档](https://rxjs-dev.firebaseapp.com/api)。

<div class="alert is-helpful">
  Note that, for Angular apps, we prefer combining operators with pipes, rather than chaining. Chaining is used in many RxJS examples.

  注意，对于 Angular 应用来说，我们提倡使用管道来组合操作符，而不是使用链式写法。链式写法仍然在很多 RxJS 中使用着。

</div>

| <t>Area</t><t>类别</t> | <t>Operators</t><t>操作</t>  |
| :------------ | :---------- |
| <t>Creation</t><t>创建</t> | `from`, `fromPromise`,`fromEvent`, `of`  |
| <t>Combination</t><t>组合</t> | `combineLatest`, `concat`, `merge`, `startWith` , `withLatestFrom`, `zip`  |
| <t>Filtering</t><t>过滤</t> | `debounceTime`, `distinctUntilChanged`, `filter`, `take`, `takeUntil`  |
| <t>Transformation</t><t>转换</t> | `bufferTime`, `concatMap`, `map`, `mergeMap`, `scan`, `switchMap`  |
| <t>Utility</t><t>工具</t> | `tap`  |
| <t>Multicasting</t><t>多播</t> | `share`  |

## Error handling

## 错误处理

In addition to the `error()` handler that you provide on subscription, RxJS provides the `catchError` operator that lets you handle known errors in the observable recipe.

除了可以在订阅时提供 `error()` 处理器外，RxJS 还提供了 `catchError` 操作符，它允许你在管道中处理已知错误。

For instance, suppose you have an observable that makes an API request and maps to the response from the server. If the server returns an error or the value doesn’t exist, an error is produced. If you catch this error and supply a default value, your stream continues to process values rather than erroring out.

假设你有一个可观察对象，它发起 API 请求，然后对服务器返回的响应进行映射。如果服务器返回了错误或值不存在，就会生成一个错误。如果你捕获这个错误并提供了一个默认值，流就会继续处理这些值，而不会报错。

Here's an example of using the `catchError` operator to do this:

下面是使用 `catchError` 操作符实现这种效果的例子：

<code-example path="rx-library/src/error-handling.ts" title="catchError operator"></code-example>

### Retry failed observable

### 重试失败的可观察对象

Where the `catchError` operator provides a simple path of recovery, the `retry` operator lets you retry a failed request.

`catchError` 提供了一种简单的方式进行恢复，而 `retry` 操作符让你可以尝试失败的请求。

Use the `retry` operator before the `catchError` operator. It resubscribes to the original source observable, which can then re-run the full sequence of actions that resulted in the error. If this includes an HTTP request, it will retry that HTTP request.

可以在 `catchError` 之前使用 `retry` 操作符。它会订阅到原始的来源可观察对象，它可以重新运行导致结果出错的动作序列。如果其中包含 HTTP 请求，它就会重新发起那个 HTTP 请求。

The following converts the previous example to retry the request before catching the error:

下列代码为前面的例子加上了捕获错误前重发请求的逻辑：

<code-example path="rx-library/src/retry-on-error.ts" title="retry operator"></code-example>

<div class="alert is-helpful">

   Do not retry **authentication** requests, since these should only be initiated by user action. We don't want to lock out user accounts with repeated login requests that the user has not initiated.

   不要重试**登录认证**请求，这些请求只应该由用户操作触发。我们肯定不会希望自动重复发送登录请求导致用户的账号被锁定。

</div>

## Naming conventions for observables

## 可观察对象的命名约定

Because Angular applications are mostly written in TypeScript, you will typically know when a variable is an observable. Although the Angular framework does not enforce a naming convention for observables, you will often see observables named with a trailing “$” sign.

由于 Angular 的应用几乎都是用 TypeScript 写的，你通常会希望知道某个变量是否可观察对象。虽然 Angular 框架并没有针对可观察对象的强制性命名约定，不过你经常会看到可观察对象的名字以“$”符号结尾。

This can be useful when scanning through code and looking for observable values. Also, if you want a property to store the most recent value from an observable, it can be convenient to simply use the same name with or without the “$”.

这在快速浏览代码并查找可观察对象值时会非常有用。同样的，如果你希望用某个属性来存储来自可观察对象的最近一个值，它的命名惯例是与可观察对象同名，但不带“$”后缀。

For example:

比如：

<code-example path="rx-library/src/naming-convention.ts" title="Naming observables"></code-example>
