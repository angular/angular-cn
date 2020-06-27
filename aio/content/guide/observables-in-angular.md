# Observables in Angular

# Angular 中的可观察对象

Angular makes use of observables as an interface to handle a variety of common asynchronous operations. For example:

Angular 使用可观察对象作为处理各种常用异步操作的接口。比如：

* You can define [custom events](guide/template-syntax#custom-events-with-eventemitter) that send observable output data from a child to a parent component.

   `EventEmitter` 类派生自 `Observable`。

* The HTTP module uses observables to handle AJAX requests and responses.

   HTTP 模块使用可观察对象来处理 AJAX 请求和响应。

* The Router and Forms modules use observables to listen for and respond to user-input events.

   路由器和表单模块使用可观察对象来监听对用户输入事件的响应。

## Transmitting data between components

## 在组件之间传递数据

Angular provides an `EventEmitter` class that is used when publishing values from a component through the [`@Output()` decorator](guide/template-syntax#how-to-use-output).
`EventEmitter` extends [RxJS `Subject`](https://rxjs.dev/api/index/class/Subject), adding an `emit()` method so it can send arbitrary values.
When you call `emit()`, it passes the emitted value to the `next()` method of any subscribed observer.

Angular 提供了一个 `EventEmitter` 类，它用来通过组件的 [`@Output()` 装饰器](guide/template-syntax#how-to-use-output) 发送一些值。`EventEmitter` 扩展了 [RxJS `Subject`](https://rxjs.dev/api/index/class/Subject)，并添加了一个 `emit()` 方法，这样它就可以发送任意值了。当你调用 `emit()` 时，就会把所发送的值传给订阅上来的观察者的 `next()` 方法。

A good example of usage can be found in the [EventEmitter](api/core/EventEmitter) documentation. Here is the example component that listens for open and close events:

这种用法的例子参见 [EventEmitter](api/core/EventEmitter) 文档。下面这个范例组件监听了 `open` 和 `close` 事件：

`<zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>`

Here is the component definition:

组件的定义如下：

<code-example path="observables-in-angular/src/main.ts" header="EventEmitter" region="eventemitter"></code-example>

## HTTP

Angular’s `HttpClient` returns observables from HTTP method calls. For instance, `http.get(‘/api’)` returns an observable. This provides several advantages over promise-based HTTP APIs:

Angular 的 `HttpClient` 从 HTTP 方法调用中返回了可观察对象。例如，`http.get(‘/api’)` 就会返回可观察对象。相对于基于承诺（Promise）的 HTTP API，它有一系列优点：

* Observables do not mutate the server response (as can occur through chained `.then()` calls on promises). Instead, you can use a series of operators to transform values as needed.

   可观察对象不会修改服务器的响应（和在承诺上串联起来的 `.then()` 调用一样）。反之，你可以使用一系列操作符来按需转换这些值。

* HTTP requests are cancellable through the `unsubscribe()` method.

   HTTP 请求是可以通过 `unsubscribe()` 方法来取消的。

* Requests can be configured to get progress event updates.

   请求可以进行配置，以获取进度事件的变化。

* Failed requests can be retried easily.

   失败的请求很容易重试。

## Async pipe

## Async 管道

The [AsyncPipe](api/common/AsyncPipe) subscribes to an observable or promise and returns the latest value it has emitted. When a new value is emitted, the pipe marks the component to be checked for changes.

[AsyncPipe](api/common/AsyncPipe) 会订阅一个可观察对象或承诺，并返回其发出的最后一个值。当发出新值时，该管道就会把这个组件标记为需要进行变更检查的（译注：因此可能导致刷新界面）。

The following example binds the `time` observable to the component's view. The observable continuously updates the view with the current time.

下面的例子把 `time` 这个可观察对象绑定到了组件的视图中。这个可观察对象会不断使用当前时间更新组件的视图。

<code-example path="observables-in-angular/src/main.ts" header="Using async pipe" region="pipe"></code-example>

## Router

## 路由器 (router)

[`Router.events`](api/router/Router#events) provides events as observables. You can use the `filter()` operator from RxJS to look for events of interest, and subscribe to them in order to make decisions based on the sequence of events in the navigation process. Here's an example:

[`Router.events`](api/router/Router#events) 以可观察对象的形式提供了其事件。
你可以使用 RxJS 中的 `filter()` 操作符来找到感兴趣的事件，并且订阅它们，以便根据浏览过程中产生的事件序列作出决定。
例子如下：

<code-example path="observables-in-angular/src/main.ts" header="Router events" region="router"></code-example>

The [ActivatedRoute](api/router/ActivatedRoute) is an injected router service that makes use of observables to get information about a route path and parameters. For example, `ActivatedRoute.url` contains an observable that reports the route path or paths. Here's an example:

[ActivatedRoute](api/router/ActivatedRoute) 是一个可注入的路由器服务，它使用可观察对象来获取关于路由路径和路由参数的信息。比如，`ActivatedRoute.url` 包含一个用于汇报路由路径的可观察对象。例子如下：

<code-example path="observables-in-angular/src/main.ts" header="ActivatedRoute" region="activated_route"></code-example>

## Reactive forms

## 响应式表单 (reactive forms)

Reactive forms have properties that use observables to monitor form control values. The [`FormControl`](api/forms/FormControl) properties `valueChanges` and `statusChanges` contain observables that raise change events. Subscribing to an observable form-control property is a way of triggering application logic within the component class. For example:

响应式表单具有一些属性，它们使用可观察对象来监听表单控件的值。
[`FormControl`](api/forms/FormControl) 的 `valueChanges` 属性和 `statusChanges` 属性包含了会发出变更事件的可观察对象。订阅可观察的表单控件属性是在组件类中触发应用逻辑的途径之一。比如：

<code-example path="observables-in-angular/src/main.ts" header="Reactive forms" region="forms"></code-example>
