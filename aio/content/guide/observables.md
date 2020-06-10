# Using observables to pass values

# 使用可观察对象（Observable）来传递值

Observables provide support for passing messages between parts of your application.
They are used frequently in Angular and are the recommended technique for event handling, asynchronous programming, and handling multiple values.

可观察对象对在应用的各个部分之间传递消息提供了支持。
它们在 Angular 中频繁使用，并且推荐把它们用于事件处理、异步编程以及处理多个值等场景。

The observer pattern is a software design pattern in which an object, called the *subject*, maintains a list of its dependents, called *observers*, and notifies them automatically of state changes.
This pattern is similar (but not identical) to the [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) design pattern.

观察者（Observer）模式是一个软件设计模式，它有一个对象，称之为*主体 Subject*，负责维护一个依赖项（称之为观察者 Observer）的列表，并且在状态变化时自动通知它们。
该模式和[发布/订阅](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)模式非常相似（但不完全一样）。

Observables are declarative&mdash;that is, you define a function for publishing values, but it is not executed until a consumer subscribes to it.
The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.

可观察对象是声明式的 —— 也就是说，虽然你定义了一个用于发布值的函数，但是在有消费者订阅它之前，这个函数并不会实际执行。
订阅之后，当这个函数执行完或取消订阅时，订阅者就会收到通知。

An observable can deliver multiple values of any type&mdash;literals, messages, or events, depending on the context. The API for receiving values is the same whether the values are delivered synchronously or asynchronously. Because setup and teardown logic are both handled by the observable, your application code only needs to worry about subscribing to consume values, and when done, unsubscribing. Whether the stream was keystrokes, an HTTP response, or an interval timer, the interface for listening to values and stopping listening is the same.

可观察对象可以发送多个任意类型的值 —— 字面量、消息、事件。无论这些值是同步发送的还是异步发送的，接收这些值的 API 都是一样的。
由于准备（setup）和清场（teardown）的逻辑都是由可观察对象自己处理的，因此你的应用代码只管订阅并消费这些值就可以了，做完之后，取消订阅。无论这个流是击键流、HTTP 响应流还是定时器，对这些值进行监听和停止监听的接口都是一样的。

Because of these advantages, observables are used extensively within Angular, and are recommended for app development as well.

由于这些优点，可观察对象在 Angular 中得到广泛使用，也同样建议应用开发者好好使用它。

## Basic usage and terms

## 基本用法和词汇

As a publisher, you create an `Observable` instance that defines a *subscriber* function. This is the function that is executed when a consumer calls the `subscribe()` method. The subscriber function defines how to obtain or generate values or messages to be published.

作为发布者，你创建一个 `Observable` 的实例，其中定义了一个*订阅者（subscriber）*函数。
当有消费者调用 `subscribe()` 方法时，这个函数就会执行。
订阅者函数用于定义“如何获取或生成那些要发布的值或消息”。

To execute the observable you have created and begin receiving notifications, you call its `subscribe()` method, passing an *observer*. This is a JavaScript object that defines the handlers for the notifications you receive. The `subscribe()` call returns a `Subscription` object that has an `unsubscribe()` method, which you call to stop receiving notifications.

要执行所创建的可观察对象，并开始从中接收通知，你就要调用它的 `subscribe()` 方法，并传入一个*观察者（observer）*。
这是一个 JavaScript 对象，它定义了你收到的这些消息的处理器（handler）。
`subscribe()` 调用会返回一个 `Subscription` 对象，该对象具有一个 `unsubscribe()` 方法。
当调用该方法时，你就会停止接收通知。

Here's an example that demonstrates the basic usage model by showing how an observable could be used to provide geolocation updates.

下面这个例子中示范了这种基本用法，它展示了如何使用可观察对象来对当前地理位置进行更新。

<code-example class="no-auto-link" path="observables/src/geolocation.ts" header="Observe geolocation updates"></code-example>

## Defining observers

## 定义观察者

A handler for receiving observable notifications implements the `Observer` interface. It is an object that defines callback methods to handle the three types of notifications that an observable can send:

用于接收可观察对象通知的处理器要实现 `Observer` 接口。这个对象定义了一些回调函数来处理可观察对象可能会发来的三种通知：

| Notification type | Description |
|:---------|:-------------------------------------------|
| 通知类型 | 说明 |
| `next` | Required. A handler for each delivered value. Called zero or more times after execution starts. |
| `next` | 必要。用来处理每个送达值。在开始执行后可能执行零次或多次。|
| `error` | Optional. A handler for an error notification. An error halts execution of the observable instance. |
| `error` |  可选。用来处理错误通知。错误会中断这个可观察对象实例的执行过程。 |
| `complete` | Optional. A handler for the execution-complete notification. Delayed values can continue to be delivered to the next handler after execution is complete. |
| `complete` |  可选。用来处理执行完毕（complete）通知。当执行完毕后，这些值就会继续传给下一个处理器。 |

An observer object can define any combination of these handlers. If you don't supply a handler for a notification type, the observer ignores notifications of that type.

观察者对象可以定义这三种处理器的任意组合。如果你不为某种通知类型提供处理器，这个观察者就会忽略相应类型的通知。

## Subscribing

## 订阅

An `Observable` instance begins publishing values only when someone subscribes to it. You subscribe by calling the `subscribe()` method of the instance, passing an observer object to receive the notifications.

只有当有人订阅 `Observable` 的实例时，它才会开始发布值。
订阅时要先调用该实例的 `subscribe()` 方法，并把一个观察者对象传给它，用来接收通知。

<div class="alert is-helpful">

In order to show how subscribing works, we need to create a new observable. There is a constructor that you use to create new instances, but for illustration, we can use some methods from the RxJS library that create simple observables of frequently used types:

   为了展示订阅的原理，我们需要创建新的可观察对象。它有一个构造函数可以用来创建新实例，但是为了更简明，也可以使用 `Observable` 上定义的一些静态方法来创建一些常用的简单可观察对象：

  * `of(...items)`&mdash;Returns an `Observable` instance that synchronously delivers the values provided as arguments.

     `of(...items)` —— 返回一个 `Observable` 实例，它用同步的方式把参数中提供的这些值发送出来。

  * `from(iterable)`&mdash;Converts its argument to an `Observable` instance. This method is commonly used to convert an array to an observable.

     `from(iterable)` —— 把它的参数转换成一个 `Observable` 实例。
    该方法通常用于把一个数组转换成一个（发送多个值的）可观察对象。

</div>

Here's an example of creating and subscribing to a simple observable, with an observer that logs the received message to the console:

下面的例子会创建并订阅一个简单的可观察对象，它的观察者会把接收到的消息记录到控制台中：

<code-example
  path="observables/src/subscribing.ts"
  region="observer"
  header="Subscribe using observer"></code-example>

Alternatively, the `subscribe()` method can accept callback function definitions in line, for `next`, `error`, and `complete` handlers. For example, the following `subscribe()` call is the same as the one that specifies the predefined observer:

另外，`subscribe()` 方法还可以接收定义在同一行中的回调函数，无论 `next`、`error` 还是 `complete` 处理器。比如，下面的 `subscribe()` 调用和前面指定预定义观察者的例子是等价的。

<code-example path="observables/src/subscribing.ts" region="sub_fn" header="Subscribe with positional arguments"></code-example>

In either case, a `next` handler is required. The `error` and `complete` handlers are optional.

无论哪种情况，`next` 处理器都是必要的，而 `error` 和 `complete` 处理器是可选的。

Note that a `next()` function could receive, for instance, message strings, or event objects, numeric values, or structures, depending on context. As a general term, we refer to data published by an observable as a *stream*. Any type of value can be represented with an observable, and the values are published as a stream.

注意，`next()` 函数可以接受消息字符串、事件对象、数字值或各种结构，具体类型取决于上下文。
为了更通用一点，我们把由可观察对象发布出来的数据统称为*流*。任何类型的值都可以表示为可观察对象，而这些值会被发布为一个流。

## Creating observables

## 创建可观察对象

Use the `Observable` constructor to create an observable stream of any type. The constructor takes as its argument the subscriber function to run when the observable’s `subscribe()` method executes. A subscriber function receives an `Observer` object, and can publish values to the observer's `next()` method.

使用 `Observable` 构造函数可以创建任何类型的可观察流。
当执行可观察对象的 `subscribe()` 方法时，这个构造函数就会把它接收到的参数作为订阅函数来运行。
订阅函数会接收一个 `Observer` 对象，并把值发布给观察者的 `next()` 方法。

For example, to create an observable equivalent to the `of(1, 2, 3)` above, you could do something like this:

比如，要创建一个与前面的 `of(1, 2, 3)` 等价的可观察对象，你可以这样做：

<code-example path="observables/src/creating.ts" region="subscriber" header="Create observable with constructor"></code-example>

To take this example a little further, we can create an observable that publishes events. In this example, the subscriber function is defined inline.

如果要略微加强这个例子，我们可以创建一个用来发布事件的可观察对象。在这个例子中，订阅函数是用内联方式定义的。

<code-example path="observables/src/creating.ts" region="fromevent" header="Create with custom fromEvent function"></code-example>

Now you can use this function to create an observable that publishes keydown events:

现在，你就可以使用这个函数来创建可发布 `keydown` 事件的可观察对象了：

<code-example path="observables/src/creating.ts" region="fromevent_use" header="Use custom fromEvent function"></code-example>

## Multicasting

## 多播

A typical observable creates a new, independent execution for each subscribed observer. When an observer subscribes, the observable wires up an event handler and delivers values to that observer. When a second observer subscribes, the observable then wires up a new event handler and delivers values to that second observer in a separate execution.

典型的可观察对象会为每一个观察者创建一次新的、独立的执行。
当观察者进行订阅时，该可观察对象会连上一个事件处理器，并且向那个观察者发送一些值。当第二个观察者订阅时，这个可观察对象就会连上一个新的事件处理器，并独立执行一次，把这些值发送给第二个可观察对象。

Sometimes, instead of starting an independent execution for each subscriber, you want each subscription to get the same values&mdash;even if values have already started emitting. This might be the case with something like an observable of clicks on the document object.

有时候，不应该对每一个订阅者都独立执行一次，你可能会希望每次订阅都得到同一批值 —— 即使是那些你已经发送过的。这在某些情况下有用，比如用来发送 `document` 上的点击事件的可观察对象。

*Multicasting* is the practice of broadcasting to a list of multiple subscribers in a single execution. With a multicasting observable, you don't register multiple listeners on the document, but instead re-use the first listener and send values out to each subscriber.

*多播*用来让可观察对象在一次执行中同时广播给多个订阅者。借助支持多播的可观察对象，你不必注册多个监听器，而是复用第一个（`next`）监听器，并且把值发送给各个订阅者。

When creating an observable you should determine how you want that observable to be used and whether or not you want to multicast its values.

当创建可观察对象时，你要决定你希望别人怎么用这个对象以及是否对它的值进行多播。

Let’s look at an example that counts from 1 to 3, with a one-second delay after each number emitted.

来看一个从 1 到 3 进行计数的例子，它每发出一个数字就会等待 1 秒。

<code-example path="observables/src/multicasting.ts" region="delay_sequence" header="Create a delayed sequence"></code-example>

Notice that if you subscribe twice, there will be two separate streams, each emitting values every second. It looks something like this:

注意，如果你订阅了两次，就会有两个独立的流，每个流都会每秒发出一个数字。代码如下：

<code-example path="observables/src/multicasting.ts" region="subscribe_twice" header="Two subscriptions"></code-example>

 Changing the observable to be multicasting could look something like this:

 修改这个可观察对象以支持多播，代码如下：

<code-example path="observables/src/multicasting.ts" region="multicast_sequence" header="Create a multicast subscriber"></code-example>

<div class="alert is-helpful">

   Multicasting observables take a bit more setup, but they can be useful for certain applications. Later we will look at tools that simplify the process of multicasting, allowing you to take any observable and make it multicasting.

   虽然支持多播的可观察对象需要做更多的准备工作，但对某些应用来说，这非常有用。稍后我们会介绍一些简化多播的工具，它们让你能接收任何可观察对象，并把它变成支持多播的。

</div>

## Error handling

## 错误处理

Because observables produce values asynchronously, try/catch will not effectively catch errors. Instead, you handle errors by specifying an `error` callback on the observer. Producing an error also causes the observable to clean up subscriptions and stop producing values. An observable can either produce values (calling the `next` callback), or it can complete, calling either the `complete` or `error` callback.

由于可观察对象会异步生成值，所以用 `try/catch` 是无法捕获错误的。你应该在观察者中指定一个 `error` 回调来处理错误。发生错误时还会导致可观察对象清理现有的订阅，并且停止生成值。可观察对象可以生成值（调用 `next` 回调），也可以调用 `complete` 或 `error` 回调来主动结束。

<code-example>
myObservable.subscribe({
  next(num) { console.log('Next num: ' + num)},
  error(err) { console.log('Received an errror: ' + err)}
});
</code-example>

Error handling (and specifically recovering from an error) is covered in more detail in a later section.

在稍后的小节中会对错误处理（特别是从错误中的恢复）做更详细的讲解。
