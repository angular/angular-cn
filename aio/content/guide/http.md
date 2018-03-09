# HttpClient

# HttpClient 库

Most front-end applications communicate with backend services over the HTTP protocol. Modern browsers support two different APIs for making HTTP requests: the `XMLHttpRequest` interface and the `fetch()` API.

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯。现代浏览器支持使用两种不同的 API 发起 HTTP 请求：`XMLHttpRequest` 接口和 `fetch()` API。

The `HttpClient` in `@angular/common/http` offers a simplified client HTTP API for Angular applications
that rests on the `XMLHttpRequest` interface exposed by browsers.
Additional benefits of `HttpClient` include testability features, typed request and response objects, request and response interception, `Observable` apis, and streamlined error handling.

`@angular/common/http`中的`HttpClient`类为 Angular 应用程序提供了一个简化的 API 来实现 HTTP 客户端功能。它基于浏览器提供的`XMLHttpRequest`接口。
`HttpClient`带来的其它优点包括：可测试性、强类型的请求和响应对象、发起请求与接收响应时的拦截器支持，以及更好的、基于可观察（Observable）对象的 API 以及流式错误处理机制。

You can run the <live-example></live-example> that accompanies this guide.

<div class="alert is-helpful">

The sample app does not require a data server.
It relies on the 
[Angular _in-memory-web-api_](https://github.com/angular/in-memory-web-api/blob/master/README.md),
which replaces the _HttpClient_ module's `HttpBackend`.
The replacement service simulates the behavior of a REST-like backend.

Look at the `AppModule` _imports_ to see how it is configured.

</div>

## Setup

## 准备工作

Before you can use the `HttpClient`, you need to import the Angular `HttpClientModule`. 
Most apps do so in the root `AppModule`.

<code-example 
  path="http/src/app/app.module.ts"
  region="sketch"
  title="app/app.module.ts (excerpt)" linenums="false">

</code-example>

Having imported `HttpClientModule` into the `AppModule`, you can inject the `HttpClient`
into an application class as shown in the following `ConfigService` example.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="proto"
  title="app/config/config.service.ts (excerpt)" linenums="false">

</code-example>

## Getting JSON data

Applications often request JSON data from the server. 
For example, the app might need a configuration file on the server, `config.json`, 
that specifies resource URLs.

<code-example 
  path="http/src/assets/config.json"
  title="assets/config.json" linenums="false">

</code-example>

The `ConfigService` fetches this file with a `get()` method on `HttpClient`.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig_1"
  title="app/config/config.service.ts (getConfig v.1)" linenums="false">

</code-example>

A component, such as `ConfigComponent`, injects the `ConfigService` and calls
the `getConfig` service method.

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v1"
  title="app/config/config.component.ts (showConfig v.1)" linenums="false">

</code-example>

Because the service method returns an `Observable` of configuration data,
the component **subscribes** to the method's return value.
The subscription callback copies the data fields into the component's `config` object,
which is data-bound in the component template for display.

### Why write a service

This example is so simple that it is tempting to write the `Http.get()` inside the
component itself and skip the service.

However, data access rarely stays this simple.
You typically post-process the data, add error handling, and maybe some retry logic to
cope with intermittent connectivity.

The component quickly becomes cluttered with data access minutia.
The component becomes harder to understand, harder to test, and the data access logic can't be re-used or standardized.

That's why it is a best practice to separate presentation of data from data access by
encapsulating data access in a separate service and delegating to that service in
the component, even in simple cases like this one.

### Type-checking the response

The subscribe callback above requires bracket notation to extract the data values.

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v1_callback" linenums="false">

</code-example>

You can't write `data.heroesUrl` because TypeScript correctly complains that the `data` object from the service does not have a `heroesUrl` property. 

The `HttpClient.get()` method parsed the JSON server response into the anonymous `Object` type. It doesn't know what the shape of that object is.

You can tell `HttpClient` the type of the response to make consuming the output easier and more obvious.

First, define an interface with the correct shape:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="config-interface" linenums="false">

</code-example>

Then, specify that interface as the `HttpClient.get()` call's type parameter in the service:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig_2" 
  title="app/config/config.service.ts (getConfig v.2)" linenums="false">

</code-example>

The callback in the updated component method receives a typed data object, which is
easier and safer to consume:

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v2"
  title="app/config/config.component.ts (showConfig v.2)" linenums="false">

</code-example>

### Reading the full response

### 读取完整的响应体

The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate certain conditions that are important to the application workflow. 

响应体可能并不包含我们需要的全部信息。有时候服务器会返回一个特殊的响应头或状态码，以标记出特定的条件，因此读取它们可能是必要的。

Tell `HttpClient` that you want the full response with the `observe` option:

要这样做，我们就要通过`observe`选项来告诉`HttpClient`，你想要完整的响应信息，而不是只有响应体：

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfigResponse" linenums="false">

</code-example>

Now `HttpClient.get()` returns an `Observable` of typed `HttpResponse` rather than just the JSON data.

The component's `showConfigResponse()` method displays the response headers as well as the configuration:

<code-example 
  path="http/src/app/config/config.component.ts"
  region="showConfigResponse" 
  title="app/config/config.component.ts (showConfigResponse)"
  linenums="false">

</code-example>

As you can see, the response object has a `body` property of the correct type.

## Error handling

## 错误处理

What happens if the request fails on the server, or if a poor network connection prevents it from even reaching the server? `HttpClient` will return an _error_ object instead of a successful response.

如果这个请求导致了服务器错误怎么办？甚至，在烂网络下请求都没到服务器该怎么办？`HttpClient`就会返回一个错误（error）而不再是成功的响应。

You _could_ handle in the component by adding a second callback to the `.subscribe()`:

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v3" 
  title="app/config/config.component.ts (showConfig v.3 with error handling)"
  linenums="false">

</code-example>

It's certainly a good idea to give the user some kind of feedback when data access fails.
But displaying the raw error object returned by `HttpClient` is far from the best way to do it.

{@a error-details}

### Getting error details

### 获取错误详情

Detecting that an error occurred is one thing.
Interpreting that error and composing a user-friendly response is a bit more involved.

检测错误的发生是第一步，不过如果知道具体发生了什么错误才会更有用。上面例子中传给回调函数的`err`参数的类型是`HttpErrorResponse`，它包含了这个错误中一些很有用的信息。

Two types of errors can occur. The server backend might reject the request, returning an HTTP response with a status code such as 404 or 500. These are error _responses_.

可能发生的错误分为两种。如果后端返回了一个失败的返回码（如404、500等），它会返回一个错误响应体。

Or something could go wrong on the client-side such as a network error that prevents the request from completing successfully or an exception thrown in an RxJS operator. These errors produce JavaScript `ErrorEvent` objects.

或者，如果在客户端这边出了错误（比如在RxJS操作符中抛出的异常或某些阻碍完成这个请求的网络错误），就会抛出一个`Error`类型的异常。

The `HttpClient` captures both kinds of errors in its `HttpErrorResponse` and you can inspect that response to figure out what really happened.

Error inspection, interpretation, and resolution is something you want to do in the _service_, 
not in the _component_.  

You might first devise an error handler like this one:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="handleError" 
  title="app/config/config.service.ts (handleError)" linenums="false">

</code-example>

Notice that this handler returns an RxJS [`ErrorObservable`](#rxjs) with a user-friendly error message.
Consumers of the service expect service methods to return an `Observable` of some kind,
even a "bad" one.

Now you take the `Observables` returned by the `HttpClient` methods
and _pipe them through_ to the error handler.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig_3" 
  title="app/config/config.service.ts (getConfig v.3 with error handler)" linenums="false">

</code-example>

### `retry()`

Sometimes the error is transient and will go away automatically if you try again.
For example, network interruptions are common in mobile scenarios, and trying again
may produce a successful result.

The [RxJS library](#rxjs) offers several _retry_ operators that are worth exploring.
The simplest is called `retry()` and it automatically re-subscribes to a failed `Observable` a specified number of times. _Re-subscribing_ to the result of an `HttpClient` method call has the effect of reissuing the HTTP request.

_Pipe_ it onto the `HttpClient` method result just before the error handler.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig" 
  title="app/config/config.service.ts (getConfig with retry)" linenums="false">

</code-example>

{@a rxjs}

## Observables and operators

The previous sections of this guide referred to RxJS `Observables` and operators such as `catchError` and `retry`.
You will encounter more RxJS artifacts as you continue below.

[RxJS](http://reactivex.io/rxjs/) is a library for composing asynchronous and callback-based code
in a _functional, reactive style_.
Many Angular APIs, including `HttpClient`, produce and consume RxJS `Observables`. 

RxJS itself is out-of-scope for this guide. You will find many learning resources on the web.
While you can get by with a minimum of RxJS knowledge, you'll want to grow your RxJS skills over time in order to use `HttpClient` effectively.

If you're following along with these code snippets, note that you must import the RxJS observable and operator symbols that appear in those snippets. These `ConfigService` imports are typical.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="rxjs-imports" 
  title="app/config/config.service.ts (RxJS imports)" linenums="false">

</code-example>

## Requesting non-JSON data

Not all APIs return JSON data. In this next example,
a `DownloaderService` method reads a text file from the server
and logs the file contents, before returning those contents to the caller
as an `Observable<string>`. 

<code-example 
  path="http/src/app/downloader/downloader.service.ts"
  region="getTextFile" 
  title="app/downloader/downloader.service.ts (getTextFile)" linenums="false">

</code-example>

`HttpClient.get()` returns a string rather than the default JSON because of the `responseType` option.

The RxJS `tap` operator (as in "wiretap") lets the code inspect good and error values passing through the observable without disturbing them. 

A `download()` method in the `DownloaderComponent` initiates the request by subscribing to the service method.

<code-example 
  path="http/src/app/downloader/downloader.component.ts"
  region="download" 
  title="app/downloader/downloader.component.ts (download)" linenums="false">

</code-example>

## Sending data to the server

## 把数据发送到服务器

In addition to fetching data from the server, `HttpClient` supports mutating requests, that is, sending data to the server with other HTTP methods such as PUT, POST, and DELETE.

The sample app for this guide includes a simplified version of the "Tour of Heroes" example
that fetches heroes and enables users to add, delete, and update them.

The following sections excerpt methods of the sample's `HeroesService`.

### Adding headers

Many servers require extra headers for save operations.
For example, they may require a "Content-Type" header to explicitly declare 
the MIME type of the request body.
Or perhaps the server requires an authorization token.

The `HeroesService` defines such headers in an `httpOptions` object that will be passed
to every `HttpClient` save method.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="http-options" 
  title="app/heroes/heroes.service.ts (httpOptions)" linenums="false">

</code-example>

### Making a POST request

### 发起一个 POST 请求

Apps often POST data to a server. They POST when submitting a form. 
In the following example, the `HeroService` posts when adding a hero to the database.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="addHero" 
  title="app/heroes/heroes.service.ts (addHero)" linenums="false">

</code-example>

The `HttpClient.post()` method is similar to `get()` in that it has a type parameter
(you're expecting the server to return the new hero)
and it takes a resource URL.

It takes two more parameters:

1. `hero` - the data to POST in the body of the request.

1. `httpOptions` - the method options which, in this case, [specify required headers](#adding-headers).

Of course it catches errors in much the same manner [described above](#error-details).
It also _taps_ the returned observable in order to log the successful POST.

The `HeroesComponent` initiates the actual POST operation by subscribing to 
the `Observable` returned by this service method.

<code-example 
  path="http/src/app/heroes/heroes.component.ts"
  region="add-hero-subscribe" 
  title="app/heroes/heroes.component.ts (addHero)" linenums="false">

</code-example>

When the server responds successfully with the newly added hero, the component adds
that hero to the displayed `heroes` list.

### Making a DELETE request

This application deletes a hero with the `HttpClient.delete` method by passing the hero's id
in the request URL.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="deleteHero" 
  title="app/heroes/heroes.service.ts (deleteHero)" linenums="false">

</code-example>

The `HeroesComponent` initiates the actual DELETE operation by subscribing to 
the `Observable` returned by this service method.

<code-example 
  path="http/src/app/heroes/heroes.component.ts"
  region="delete-hero-subscribe" 
  title="app/heroes/heroes.component.ts (deleteHero)" linenums="false">

</code-example>

<div class="alert is-important">

You must call _subscribe()_ or nothing happens!

</div>

The component isn't expecting a result from the delete operation and
subscribes without a callback.
The bare `.subscribe()` _seems_ pointless.

In fact, it is essential.
Merely calling `HeroService.deleteHero()` **does not initiate the DELETE request.**

<code-example 
  path="http/src/app/heroes/heroes.component.ts"
  region="delete-hero-no-subscribe" linenums="false">

</code-example>

{@a always-subscribe}

### Always _subscribe_!

An `HttpClient` method does not begin its HTTP request until you call `subscribe()` on the observable returned by that method. This is true for _all_ `HttpClient` _methods_.

<div class="alert is-helpful">

The [`AsyncPipe`](api/common/AsyncPipe) subscribes (and unsubscribes) for you automatically.

</div>

All observables returned from `HttpClient` methods are _cold_ by design.
Execution of the HTTP request is _deferred_, allowing you to extend the
observable with additional operations such as  `tap` and `catchError`
 before anything actually happens.

Calling `subscribe(...)` triggers execution of the observable and causes
`HttpClient` to compose and send the HTTP request to the server.

You can think of these observables as _blueprints_ for actual HTTP requests.

<div class="alert is-helpful">

In fact, each `subscribe()` initiates a separate, independent execution of the observable.
Subscribing twice results in two HTTP requests.

```javascript

const req = http.get<Heroes>('/api/heroes');
// 0 requests made - .subscribe() not called.
req.subscribe();
// 1 request made.
req.subscribe();
// 2 requests made.

```

</div>

### Making a PUT request

An app will send a PUT request to completely replace a resource with updated data.
The following `HeroService` example is just like the POST example.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="updateHero" 
  title="app/heroes/heroes.service.ts (updateHero)" linenums="false">

</code-example>

For the reasons [explained above](#always-subscribe), the caller (`HeroesComponent.update()` in this case) must `subscribe()` to the observable returned from the `HttpClient.put()`
in order to initiate the request.

## Advanced usage

## 高级用法

The above sections detail how to use the basic HTTP functionality in `@angular/common/http`, but sometimes you need to do more than make simple requests and get data back.

### Configuring the request

Other aspects of an outgoing request can be configured via the options object
passed as the last argument to the `HttpClient` method.

You [saw earlier](#adding-headers) that the `HeroService` sets the default headers by
passing an options object (`httpOptions`) to its save methods.
You can do more.

#### Update headers

You can't directly modify the existing headers within the previous options
object because instances of the `HttpHeaders` class are immutable.

Use the `set()` method instead. 
It returns a clone of the current instance with the new changes applied.

Here's how you might update the authorization header (after the old token expired) 
before making the next request.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="update-headers" linenums="false">

</code-example>

#### URL Parameters

#### URL 参数

Adding URL search parameters works a similar way.
Here is a `searchHeroes` method that queries for heroes whose names contain the search term.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="searchHeroes" linenums="false">

</code-example>

If there is a search term, the code constructs an options object with an HTML URL encoded search parameter. If the term were "foo", the GET request URL would be `api/heroes/?name=foo`.

The `HttpParms` are immutable so you'll have to use the `set()` method to update the options.

### Debouncing requests

The sample includes an _npm package search_ feature.

When the user enters a name in a search-box, the `PackageSearchComponent` sends
a search request for a package with that name to the NPM web api.

Here's a pertinent excerpt from the template:

<code-example 
  path="http/src/app/package-search/package-search.component.html"
  region="search" 
  title="app/package-search/package-search.component.html (search)">

</code-example>

The `(keyup)` event binding sends every keystroke to the component's `search()` method.

Sending a request for every keystroke could be expensive.
It's better to wait until the user stops typing and then send a request.
That's easy to implement with RxJS operators, as shown in this excerpt.

<code-example 
  path="http/src/app/package-search/package-search.component.ts"
  region="debounce" 
  title="app/package-search/package-search.component.ts (excerpt))">

</code-example>

The `searchText$` is the sequence of search-box values coming from the user.
It's defined as an RxJS `Subject`, which means it is an `Observable`
that can also produce values for itself by calling `next(value)`,
as happens in the `search()` method.

Rather than forward every `searchText` value directly to the injected `PackageSearchService`,
the code in `ngOnInit()` _pipes_ search values through three operators:

1. `debounceTime(500)` - wait for the user to stop typing (1/2 second in this case).

1. `distinctUntilChanged()` - wait until the search text changes.

1. `switchMap()` - send the search request to the service.

The code sets `packages$` to this re-composed `Observable` of search results.
The template subscribes to `packages$` with the [AsyncPipe](api/common/AsyncPipe)
and displays search results as they arrive.

A search value reaches the service only if it's a new value and the user has stopped typing.

<div class="l-sub-section">

The `withRefresh` option is explained [below](#cache-refresh).

</div>

#### _switchMap()_

The `switchMap()` operator has three important characteristics.

1. It takes a function argument that returns an `Observable`.
`PackageSearchService.search` returns an `Observable`, as other data service methods do.

2. If a previous search request is still _in-flight_ (as when the connection is poor),
it cancels that request and sends a new one.

3. It returns service responses in their original request order, even if the
server returns them out of order. 

<div class="l-sub-section">

If you think you'll reuse this debouncing logic,
consider moving it to a utility function or into the `PackageSearchService` itself.

</div>

### Intercepting requests and responses

_HTTP Interception_ is a major feature of `@angular/common/http`. 
With interception, you declare _interceptors_ that inspect and transform HTTP requests from your application to the server.
The same interceptors may also inspect and transform the server's responses on their way back to the application.
Multiple interceptors form a _forward-and-backward_ chain of request/response handlers.

Interceptors can perform a variety of  _implicit_ tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response. 

Without interception, developers would have to implement these tasks _explicitly_ 
for each `HttpClient` method call.

#### Write an interceptor

To implement an interceptor, declare a class that implements the `intercept()` method of the `HttpInterceptor` interface.

Here is a do-nothing _noop_ interceptor that simply passes the request through without touching it:
 
<code-example 
  path="http/src/app/http-interceptors/noop-interceptor.ts"
  title="app/http-interceptors/noop-interceptor.ts"
  linenums="false">

</code-example>

The `intercept` method transforms a request into an `Observable` that eventually returns the HTTP response. 
In this sense, each interceptor is fully capable of handling the request entirely by itself.

Most interceptors inspect the request on the way in and forward the (perhaps altered) request to the `handle()` method of the `next` object which implements the [`HttpHandler`](api/common/http/HttpHandler) interface.

```javascript

export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

```

Like `intercept()`, the `handle()` method transforms an HTTP request into an `Observable` of [`HttpEvents`](#httpevents) which ultimately include the server's response. The `intercept()` method could inspect that observable and alter it before returning it to the caller.

This _no-op_ interceptor simply calls `next.handle()` with the original request and returns the observable without doing a thing.

#### The _next_ object

The `next` object represents the next interceptor in the chain of interceptors. 
The final `next` in the chain is the `HttpClient` backend handler that sends the request to the server and receives the server's response.

Most interceptors call `next.handle()` so that the request flows through to the next interceptor and, eventually, the backend handler.
An interceptor _could_ skip calling `next.handle()`, short-circuit the chain, and [return its own `Observable`](#caching) with an artificial server response. 

This is a common middleware pattern found in frameworks such as Express.js.

#### Provide the interceptor

The `NoopInterceptor` is a service managed by Angular's [dependency injection (DI)](guide/dependency-injection) system. 
Like other services, you must provide the interceptor class before the app can use it.

Because interceptors are (optional) dependencies of the `HttpClient` service, 
you must provide them in the same injector (or a parent of the injector) that provides `HttpClient`. 
Interceptors provided _after_ DI creates the `HttpClient` are ignored.

This app provides `HttpClient` in the app's root injector, as a side-effect of importing the `HttpClientModule` in `AppModule`.
You should provide interceptors in `AppModule` as well.

After importing the `HTTP_INTERCEPTORS` injection token from `@angular/common/http`,
write the `NoopInterceptor` provider like this:

<code-example 
  path="http/src/app/http-interceptors/index.ts"
  region="noop-provider" linenums="false">

</code-example>

Note the `multi: true` option. 
This required setting tells Angular that `HTTP_INTERCEPTORS` is a token for a _multiprovider_ 
that injects an array of values, rather than a single value.

You _could_ add this provider directly to the providers array of the `AppModule`.
However, it's rather verbose and there's a good chance that 
you'll create more interceptors and provide them in the same way.
You must also pay [close attention to the order](#interceptor-order) 
in which you provide these interceptors.

Consider creating a "barrel" file that gathers all the interceptor providers into an `httpInterceptorProviders` array, starting with this first one, the `NoopInterceptor`.

<code-example 
  path="http/src/app/http-interceptors/index.ts"
  region="interceptor-providers"
  title="app/http-interceptors/index.ts" linenums="false">

</code-example>

Then import and add it to the `AppModule` _providers array_ like this:

<code-example 
  path="http/src/app/app.module.ts"
  region="interceptor-providers"
  title="app/app.module.ts (interceptor providers)" linenums="false">

</code-example>

As you create new interceptors, add them to the `httpInterceptorProviders` array and
you won't have to revisit the `AppModule`.

<div class="l-sub-section">

There are many more interceptors in the complete sample code.

</div>

#### Interceptor order

Angular applies interceptors in the order that you provide them.
If you provide interceptors _A_, then _B_, then _C_,  requests will flow in _A->B->C_ and
responses will flow out _C->B->A_.

You cannot change the order or remove interceptors later.
If you need to enable and disable an interceptor dynamically, you'll have to build that capability into the interceptor itself.

#### _HttpEvents_

You may have expected the `intercept()` and `handle()` methods to return observables of `HttpResponse<any>` as most `HttpClient` methods do.

Instead they return observables of `HttpEvent<any>`.

That's because interceptors work at a lower level than those `HttpClient` methods. A single HTTP request can generate multiple _events_, including upload and download progress events. The `HttpResponse` class itself is actually an event, whose type is `HttpEventType.HttpResponseEvent`.

Many interceptors are only concerned with the outgoing request and simply return the event stream from `next.handle()` without modifying it.

But interceptors that examine and modify the response from `next.handle()` 
will see all of these events. 
Your interceptor should return _every event untouched_ unless it has a _compelling reason to do otherwise_.

#### Immutability

Although interceptors are capable of mutating requests and responses,
the `HttpRequest` and `HttpResponse` instance properties are `readonly`,
rendering them largely immutable.

They are immutable for a good reason: the app may retry a request several times before it succeeds, which means that the interceptor chain may re-process the same request multiple times.
If an interceptor could modify the original request object, the re-tried operation would start from the modified request rather than the original. Immutability ensures that interceptors see the same request for each try.

TypeScript will prevent you from setting `HttpRequest` readonly properties. 

```javascript

  // Typescript disallows the following assignment because req.url is readonly
  req.url = req.url.replace('http://', 'https://');

```

To alter the request, clone it first and modify the clone before passing it to `next.handle()`. 
You can clone and modify the request in a single step as in this example.

<code-example 
  path="http/src/app/http-interceptors/ensure-https-interceptor.ts"
  region="excerpt" 
  title="app/http-interceptors/ensure-https-interceptor.ts (excerpt)" linenums="false">

</code-example>

The `clone()` method's hash argument allows you to mutate specific properties of the request while copying the others.

##### The request body

The `readonly` assignment guard can't prevent deep updates and, in particular, 
it can't prevent you from modifying a property of a request body object.

```javascript

  req.body.name = req.body.name.trim(); // bad idea!

```

If you must mutate the request body, copy it first, change the copy, 
`clone()` the request, and set the clone's body with the new body, as in the following example.

<code-example 
  path="http/src/app/http-interceptors/trim-name-interceptor.ts"
  region="excerpt" 
  title="app/http-interceptors/trim-name-interceptor.ts (excerpt)" linenums="false">

</code-example>

##### Clearing the request body

Sometimes you need to clear the request body rather than replace it.
If you set the cloned request body to `undefined`, Angular assumes you intend to leave the body as is.
That is not what you want.
If you set the cloned request body to `null`, Angular knows you intend to clear the request body.

```javascript

  newReq = req.clone({ ... }); // body not mentioned => preserve original body
  newReq = req.clone({ body: undefined }); // preserve original body
  newReq = req.clone({ body: null }); // clear the body

```

#### Set default headers

Apps often use an interceptor to set default headers on outgoing requests. 

The sample app has an `AuthService` that produces an authorization token.
Here is its `AuthInterceptor` that injects that service to get the token and
adds an authorization header with that token to every outgoing request:

<code-example 
  path="http/src/app/http-interceptors/auth-interceptor.ts"
  title="app/http-interceptors/auth-interceptor.ts">

</code-example>

The practice of cloning a request to set new headers is so common that 
there's a `setHeaders` shortcut for it:

<code-example 
  path="http/src/app/http-interceptors/auth-interceptor.ts"
  region="set-header-shortcut">

</code-example>

An interceptor that alters headers can be used for a number of different operations, including:

这种可以修改头的拦截器可以用于很多不同的操作，比如：

* Authentication/authorization

   认证 / 授权

* Caching behavior; for example, `If-Modified-Since`

   控制缓存行为。比如`If-Modified-Since`

* XSRF protection

   XSRF 防护

#### Logging

#### 记日志

Because interceptors can process the request and response _together_, they can do things like time and log 
an entire HTTP operation. 

Consider the following `LoggingInterceptor`, which captures the time of the request,
the time of the response, and logs the outcome with the elapsed time
with the injected `MessageService`.

<code-example 
  path="http/src/app/http-interceptors/logging-interceptor.ts"
  region="excerpt" 
  title="app/http-interceptors/logging-interceptor.ts)">

</code-example>

The RxJS `tap` operator captures whether the request succeed or failed.
The RxJS `finalize` operator is called when the response observable either errors or completes (which it must),
and reports the outcome to the `MessageService`.

Neither `tap` nor `finalize` touch the values of the observable stream returned to the caller.

#### Caching

#### 缓存

Interceptors can handle requests by themselves, without forwarding to `next.handle()`.

For example, you might decide to cache certain requests and responses to improve performance.
You can delegate caching to an interceptor without disturbing your existing data services. 

The `CachingInterceptor` demonstrates this approach.

<code-example 
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="v1" 
  title="app/http-interceptors/caching-interceptor.ts)" linenums="false">

</code-example>

The `isCachable()` function determines if the request is cachable.
In this sample, only GET requests to the npm package search api are cachable.

If the request is not cachable, the interceptor simply forwards the request 
to the next handler in the chain.

If a cachable request is found in the cache, the interceptor returns an `of()` _observable_ with
the cached response, by-passing the `next` handler (and all other interceptors downstream).

If a cachable request is not in cache, the code calls `sendRequest`.

{@a send-request}

<code-example 
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="send-request">

</code-example>

The `sendRequest` function creates a [request clone](#immutability) without headers
because the npm api forbids them.

It forwards that request to `next.handle()` which ultimately calls the server and
returns the server's response.

Note how `sendRequest` _intercepts the response_ on its way back to the application.
It _pipes_ the response through the `tap()` operator,
whose callback adds the response to the cache.

The original response continues untouched back up through the chain of interceptors
to the application caller. 

Data services, such as `PackageSearchService`, are unaware that 
some of their `HttpClient` requests actually return cached responses.

{@a cache-refresh}

#### Return a multi-valued _Observable_

The `HttpClient.get()` method normally returns an _observable_ 
that either emits the data or an error. 
Some folks describe it as a "_one and done_" observable.

But an interceptor can change this to an _observable_ that emits more than once.

A revised version of the `CachingInterceptor` optionally returns an _observable_ that
immediately emits the cached response, sends the request to the npm web api anyway,
and emits again later with the updated search results.

<code-example 
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="intercept-refresh">

</code-example>

The _cache-then-refresh_ option is triggered by the presence of a **custom `x-refresh` header**.

<div class="l-sub-section">

A checkbox on the `PackageSearchComponent` toggles a `withRefresh` flag,
which is one of the arguments to `PackageSearchService.search()`.
That `search()` method creates the custom `x-refresh` header
and adds it to the request before calling `HttpClient.get()`.

</div>

The revised `CachingInterceptor` sets up a server request 
whether there's a cached value or not, 
using the same `sendRequest()` method described [above](#send-request).
The `results$` observable will make the request when subscribed.

If there's no cached value, the interceptor returns `results$`.

If there is a cached value, the code _pipes_ the cached response onto
`results$`, producing a recomposed observable that emits twice,
the cached response first (and immediately), followed later
by the response from the server.
Subscribers see a sequence of _two_ responses.

### Listening to progress events

### 监听进度事件

Sometimes applications transfer large amounts of data and those transfers can take a long time.
File uploads are a typical example. 
Give the users a better experience by providing feedback on the progress of such transfers.

To make a request with progress events enabled, you can create an instance of `HttpRequest` 
with the `reportProgress` option set true to enable tracking of progress events.

<code-example 
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-request" 
  title="app/uploader/uploader.service.ts (upload request)">

</code-example>

<div class="alert is-important">

Every progress event triggers change detection, so only turn them on if you truly intend to report progress in the UI.

</div>

Next, pass this request object to the `HttpClient.request()` method, which
returns an `Observable` of `HttpEvents`, the same events processed by interceptors:

<code-example 
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-body" 
  title="app/uploader/uploader.service.ts (upload body)" linenums="false">

</code-example>

The `getEventMessage` method interprets each type of `HttpEvent` in the event stream.

<code-example 
  path="http/src/app/uploader/uploader.service.ts"
  region="getEventMessage" 
  title="app/uploader/uploader.service.ts (getEventMessage)" linenums="false">

</code-example>

<div class="alert is-helpful">

The sample app for this guide doesn't have a server that accepts uploaded files.
The `UploadInterceptor` in `app/http-interceptors/upload-interceptor.ts` 
intercepts and short-circuits upload requests
by returning an observable of simulated events.

</div>

## Security: XSRF Protection

## 安全：XSRF 防护

[Cross-Site Request Forgery (XSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website. `HttpClient` supports a [common mechanism](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token) used to prevent XSRF attacks. When performing HTTP requests, an interceptor reads a token from a cookie, by default `XSRF-TOKEN`, and sets it as an HTTP header, `X-XSRF-TOKEN`. Since only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.

[跨站请求伪造 (XSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery)是一个攻击技术，它能让攻击者假冒一个已认证的用户在你的网站上执行未知的操作。`HttpClient`支持一种[通用的机制](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token)来防范 XSRF 攻击。当执行 HTTP 请求时，一个拦截器会从cookie中读取 XSRF 令牌（默认名字为`XSRF-TOKEN`），并且把它设置为一个 HTTP 头 `X-XSRF-TOKEN`，由于只有运行在我们自己的域名下的代码才能读取这个 cookie，因此后端可以确认这个 HTTP 请求真的来自我们的客户端应用，而不是攻击者。

By default, an interceptor sends this cookie on all mutating requests (POST, etc.)
to relative URLs but not on GET/HEAD requests or
on requests with an absolute URL.

默认情况下，拦截器会在所有的修改型请求中（比如POST等）把这个 cookie 发送给使用相对URL的请求。但不会在 GET/HEAD 请求中发送，也不会发送给使用绝对 URL 的请求。

To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called `XSRF-TOKEN` on either the page load or the first GET request. On subsequent requests the server can verify that the cookie matches the `X-XSRF-TOKEN` HTTP header, and therefore be sure that only code running on your domain could have sent the request. The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens. Set the token to a digest of your site's authentication
cookie with a salt for added security.

要获得这种优点，我们的服务器需要在页面加载或首个 GET 请求中把一个名叫`XSRF-TOKEN`的令牌写入可被 JavaScript 读到的会话 cookie 中。
而在后续的请求中，服务器可以验证这个 cookie 是否与 HTTP 头 `X-XSRF-TOKEN` 的值一致，以确保只有运行在我们自己域名下的代码才能发起这个请求。这个令牌必须对每个用户都是唯一的，并且必须能被服务器验证，因此不能由客户端自己生成令牌。把这个令牌设置为你的站点认证信息并且加了盐（salt）的摘要，以提升安全性。

In order to prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.

为了防止多个 Angular 应用共享同一个域名或子域时出现冲突，要给每个应用分配一个唯一的 cookie 名称。

<div class="alert is-important">

*Note that `HttpClient` supports only the client half of the XSRF protection scheme.* 
Your backend service must be configured to set the cookie for your page, and to verify that 
the header is present on all eligible requests. 
If not, Angular's default protection will be ineffective.

*注意，`HttpClient`支持的只是 XSRF 防护方案的客户端这一半。* 我们的后端服务必须配置为给页面设置 cookie ，并且要验证请求头，以确保全都是合法的请求。否则，Angular 默认的这种防护措施就会失效。

</div>

### Configuring custom cookie/header names

### 配置自定义 cookie/header 名称

If your backend service uses different names for the XSRF token cookie or header, 
use `HttpClientXsrfModule.withOptions()` to override the defaults.

如果我们的后端服务中对 XSRF 令牌的 cookie 或 头使用了不一样的名字，就要使用 `HttpClientXsrfModule.withConfig()` 来覆盖掉默认值。

<code-example 
  path="http/src/app/app.module.ts"
  region="xsrf" 
  linenums="false">

</code-example>

## Testing HTTP requests

## 测试 HTTP 请求

Like any external dependency, the HTTP backend needs to be mocked
so your tests can simulate interaction with a remote server. 
The `@angular/common/http/testing` library makes 
setting up such mocking straightforward.

如同所有的外部依赖一样，HTTP 后端也需要在良好的测试实践中被 Mock 掉。`@angular/common/http` 提供了一个测试库 `@angular/common/http/testing`，它让我们可以直截了当的进行这种 Mock 。

### Mocking philosophy

### Mock 方法论

Angular's HTTP testing library is designed for a pattern of testing wherein 
the the app executes code and makes requests first.

Then a test expects that certain requests have or have not been made, 
performs assertions against those requests, 
and finally provide responses by "flushing" each expected request.

At the end, tests may verify that the app has made no unexpected requests.

<div class="alert is-helpful">

You can run <live-example stackblitz="specs">these sample tests</live-example> 
in a live coding environment.

The tests described in this guide are in `src/testing/http-client.spec.ts`.
There are also tests of an application data service that call `HttpClient` in
`src/app/heroes/heroes.service.spec.ts`.

</div>

### Setup

### 环境设置

To begin testing calls to `HttpClient`, 
import the `HttpClientTestingModule` and the mocking controller, `HttpTestingController`,
along with the other symbols your tests require.

要开始测试那些通过`HttpClient`发起的请求，就要导入`HttpClientTestingModule`模块，并把它加到你的`TestBed` 设置里去，代码如下：

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="imports" 
  title="app/testing/http-client.spec.ts (imports)" linenums="false">

</code-example>

Then add the `HttpClientTestingModule` to the `TestBed` and continue with
the setup of the _service-under-test_.

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="setup" 
  title="app/testing/http-client.spec.ts(setup)" linenums="false">

</code-example>

Now requests made in the course of your tests will hit the testing backend instead of the normal backend.

This setup also calls `TestBed.get()` to inject the `HttpClient` service and the mocking controller
so they can be referenced during the tests.

### Expecting and answering requests

### 期待并回复请求

Now you can write a test that expects a GET Request to occur and provides a mock response. 

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="get-test" 
  title="app/testing/http-client.spec.ts(httpClient.get)" linenums="false">

</code-example>

The last step, verifying that no requests remain outstanding, is common enough for you to move it into an `afterEach()` step:

最后一步，验证没有发起过预期之外的请求，足够通用，因此我们可以把它移到`afterEach()`中：

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="afterEach" 
  linenums="false">

</code-example>

#### Custom request expectations

#### 自定义请求的预期

If matching by URL isn't sufficient, it's possible to implement your own matching function. 
For example, you could look for an outgoing request that has an authorization header:

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="predicate" 
  linenums="false">

</code-example>

As with the previous `expectOne()`, 
the test will fail if 0 or 2+ requests satisfy this predicate.

和前面根据 URL 进行测试时一样，如果零或两个以上的请求匹配上了这个期待，它就会抛出异常。

#### Handling more than one request

#### 处理一个以上的请求

If you need to respond to duplicate requests in your test, use the `match()` API instead of `expectOne()`.
It takes the same arguments but returns an array of matching requests. 
Once returned, these requests are removed from future matching and 
you are responsible for flushing and verifying them.

如果我们需要在测试中对重复的请求进行响应，可以使用`match()` API 来代替 `expectOne()`，它的参数不变，但会返回一个与这些请求相匹配的数组。一旦返回，这些请求就会从将来要匹配的列表中移除，我们要自己验证和刷新（flush）它。

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="multi-request" 
  linenums="false">

</code-example>

### Testing for errors

You should test the app's defenses against HTTP requests that fail.

Call `request.error()` with an `ErrorEvent` instead of `request.flush()`, as in this example.

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="404" 
  linenums="false">

</code-example>
