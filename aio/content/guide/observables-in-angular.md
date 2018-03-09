# Observables in Angular

Angular makes use of observables as an interface to handle a variety of common asynchronous operations. For example:

* The `EventEmitter` class extends `Observable`.

* The HTTP module uses observables to handle AJAX requests and responses.

* The Router and Forms modules use observables to listen for and respond to user-input events.

## Event emitter

Angular provides an `EventEmitter` class that is used when publishing values from a component through the `@Output()` decorator. `EventEmitter` extends `Observable`, adding an `emit()` method so it can send arbitrary values. When you call `emit()`, it passes the emitted value to the `next()` method of any subscribed observer.

A good example of usage can be found on the [EventEmitter](https://angular.io/api/core/EventEmitter) documentation. Here is the example component that listens for open and close events:

`<zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>`

Here is the component definition:

<code-example path="observables-in-angular/src/main.ts" title="EventEmitter" region="eventemitter"></code-example>

## HTTP

Angular’s `HttpClient` returns observables from HTTP method calls. For instance, `http.get(‘/api’)` returns an observable. This provides several advantages over promise-based HTTP APIs:

* Observables do not mutate the server response (as can occur through chained `.then()` calls on promises). Instead, you can use a series of operators to transform values as needed.

* HTTP requests are cancellable through the `unsubscribe()` method.

* Requests can be configured to get progress event updates.

* Failed requests can be retried easily.

## Async pipe

The [AsyncPipe](https://angular.io/api/common/AsyncPipe) subscribes to an observable or promise and returns the latest value it has emitted. When a new value is emitted, the pipe marks the component to be checked for changes.

The following example binds the `time` observable to the component's view. The observable continuously updates the view with the current time.

<code-example path="observables-in-angular/src/main.ts" title="Using async pipe" region="pipe"></code-example>

## Router

## 路由器 (router)

[`Router.events`](https://angular.io/api/router/Router#events) provides events as observables. You can use the `filter()` operator from RxJS to look for events of interest, and subscribe to them in order to make decisions based on the sequence of events in the navigation process. Here's an example:

<code-example path="observables-in-angular/src/main.ts" title="Router events" region="router"></code-example>

The [ActivatedRoute](https://angular.io/api/router/ActivatedRoute) is an injected router service that makes use of observables to get information about a route path and parameters. For example, `ActivateRoute.url` contains an observable that reports the route path or paths. Here's an example:

<code-example path="observables-in-angular/src/main.ts" title="ActivatedRoute" region="activated_route"></code-example>

## Reactive forms

## 响应式表单 (reactive forms)

Reactive forms have properties that use observables to monitor form control values. The [`FormControl`](https://angular.io/api/forms/FormControl) properties `valueChanges` and `statusChanges` contain observables that raise change events. Subscribing to an observable form-control property is a way of triggering application logic within the component class. For example:

<code-example path="observables-in-angular/src/main.ts" title="Reactive forms" region="forms"></code-example>
