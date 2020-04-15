# HttpClient

Most front-end applications communicate with backend services over the HTTP protocol. Modern browsers support two different APIs for making HTTP requests: the `XMLHttpRequest` interface and the `fetch()` API.

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯。现代浏览器支持使用两种不同的 API 发起 HTTP 请求：`XMLHttpRequest` 接口和 `fetch()` API。

The `HttpClient` in `@angular/common/http` offers a simplified client HTTP API for Angular applications
that rests on the `XMLHttpRequest` interface exposed by browsers.
Additional benefits of `HttpClient` include testability features, typed request and response objects, request and response interception, `Observable` apis, and streamlined error handling.

`@angular/common/http` 中的 `HttpClient` 类为 Angular 应用程序提供了一个简化的 API 来实现 HTTP 客户端功能。它基于浏览器提供的 `XMLHttpRequest` 接口。
`HttpClient` 带来的其它优点包括：可测试性、强类型的请求和响应对象、发起请求与接收响应时的拦截器支持，以及更好的、基于可观察（Observable）对象的 API 以及流式错误处理机制。

You can run the <live-example></live-example> that accompanies this guide.

你可以到 <live-example></live-example> 中运行本章的代码。

<div class="alert is-helpful">

The sample app does not require a data server.
It relies on the
[Angular _in-memory-web-api_](https://github.com/angular/in-memory-web-api/blob/master/README.md),
which replaces the _HttpClient_ module's `HttpBackend`.
The replacement service simulates the behavior of a REST-like backend.

该应用代码并不需要数据服务器。
它基于 [Angular _in-memory-web-api_](https://github.com/angular/in-memory-web-api/blob/master/README.md) 库，该库会替换 `HttpClient` 模块中的 `HttpBackend`。用于替换的这个服务会模拟 REST 风格的后端的行为。

Look at the `AppModule` _imports_ to see how it is configured.

到 `AppModule` 的 `imports` 中查看这个库是如何配置的。

</div>

## Setup

## 准备工作

Before you can use the `HttpClient`, you need to import the Angular `HttpClientModule`.
Most apps do so in the root `AppModule`.

要想使用 `HttpClient`，就要先导入 Angular 的 `HttpClientModule`。大多数应用都会在根模块 `AppModule` 中导入它。

<code-example
  path="http/src/app/app.module.ts"
  region="sketch"
  header="app/app.module.ts (excerpt)">
</code-example>

Having imported `HttpClientModule` into the `AppModule`, you can inject the `HttpClient`
into an application class as shown in the following `ConfigService` example.

在 `AppModule` 中导入 `HttpClientModule` 之后，你可以把 `HttpClient` 注入到应用类中，就像下面的 `ConfigService` 例子中这样。

<code-example
  path="http/src/app/config/config.service.ts"
  region="proto"
  header="app/config/config.service.ts (excerpt)">
</code-example>

## Requesting data from server

## 从服务器获取数据

Applications often request JSON data from the server.
For example, the app might need a configuration file on the server, `config.json`,
that specifies resource URLs.

应用通常会从服务器上获取 JSON 数据。
比如，该应用可能要从服务器上获取配置文件 `config.json`，其中指定了一些特定资源的 URL。

<code-example
  path="http/src/assets/config.json"
  header="assets/config.json">
</code-example>

The `ConfigService` fetches this file with a `get()` method on `HttpClient`.

`ConfigService` 会通过 `HttpClient` 的 `get()` 方法取得这个文件。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig_1"
  header="app/config/config.service.ts (getConfig v.1)">
</code-example>

A component, such as `ConfigComponent`, injects the `ConfigService` and calls
the `getConfig` service method.

像 `ConfigComponent` 这样的组件会注入 `ConfigService`，并调用其 `getConfig` 方法。

<code-example
  path="http/src/app/config/config.component.ts"
  region="v1"
  header="app/config/config.component.ts (showConfig v.1)">
</code-example>

Because the service method returns an `Observable` of configuration data,
the component **subscribes** to the method's return value.
The subscription callback copies the data fields into the component's `config` object,
which is data-bound in the component template for display.

这个服务方法返回配置数据的 `Observable` 对象，所以组件要**订阅（subscribe）** 该方法的返回值。
订阅时的回调函数会把这些数据字段复制到组件的 `config` 对象中，它会在组件的模板中绑定，以供显示。

<div class="callout is-helpful">

 <header>Why write a service?</header>

 <header>为什么要写服务？</header>

This example is so simple that it is tempting to write the `Http.get()` inside the
component itself and skip the service.
In practice, however, data access rarely stays this simple.
You typically need to post-process the data, add error handling, and maybe some retry logic to
cope with intermittent connectivity.

这个例子太简单，所以它也可以在组件本身的代码中调用 `Http.get()`，而不用借助服务。
不过，在实战中，数据访问很少能一直这么简单。
你通常要对数据做后处理、添加错误处理器，还可能加一些重试逻辑，以便应对网络抽风的情况。

The component quickly becomes cluttered with data access minutia.
The component becomes harder to understand, harder to test, and the data access logic can't be re-used or standardized.

该组件很快就会因为这些数据方式的细节而变得杂乱不堪。
组件变得难以理解、难以测试，并且这些数据访问逻辑无法被复用，也无法标准化。

That's why it's a best practice to separate presentation of data from data access by
encapsulating data access in a separate service and delegating to that service in
the component, even in simple cases like this one.

这就是为什么最佳实践中要求把数据展现逻辑从数据访问逻辑中拆分出去，也就是说把数据访问逻辑包装进一个单独的服务中，
并且在组件中把数据访问逻辑委托给这个服务。就算是这么简单的应用也要如此。

</div>

### Requesting a typed response

### 请求带类型的响应

You can structure your `HttpClient` request to declare the type of the response object, to make consuming the output easier and more obvious.
Specifying the response type acts as a type assertion during the compile time.

您可以将 `HttpClient` 请求结构化，以声明响应对象的类型，从而使输出的用法更轻松和明显。
所指定的响应类型会在编译期间充当类型声明。


To specify the response object type, first define an interface with the required properties.
(Use an interface rather than a class; a response cannot be automatically converted to an instance of a class.)

要指定响应对象类型，首先要定义一个具有所需属性的接口。（请使用接口而不是类；响应不能自动转换为类的实例。）


<code-example
  path="http/src/app/config/config.service.ts"
  region="config-interface">
</code-example>

Next, specify that interface as the `HttpClient.get()` call's type parameter in the service.

接下来，在服务器中把该接口指定为 `HttpClient.get()` 调用的类型参数。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig_2"
  header="app/config/config.service.ts (getConfig v.2)">
</code-example>

<div class="alert is-helpful">

 When you pass an interface as a type parameter to the `HttpClient.get()` method, use the RxJS `map` operator to transform the response data as needed by the UI. You can then pass the transformed data to the [async pipe](api/common/AsyncPipe).

 当把接口作为类型参数传给 `HttpClient.get()` 方法时，请使用 RxJS `map` 运算符根据 UI 的需要转换响应数据。然后，您可以将转换后的数据传给[异步管道](api/common/AsyncPipe) 。


</div>

The callback in the updated component method receives a typed data object, which is
easier and safer to consume:

修改后的组件方法，其回调函数中获取一个带类型的对象，它易于使用，且消费起来更安全：

<code-example
  path="http/src/app/config/config.component.ts"
  region="v2"
  header="app/config/config.component.ts (showConfig v.2)">
</code-example>

<div class="alert is-important">

Specifying the response type is a declaration to TypeScript that it should expect your response to be of the given type.
This is a build-time check and doesn't guarantee that the server will actually respond with an object of this type. It is up to the server to ensure that the type specified by the server API is returned.

指定响应类型是给 TypeScript 看的声明，它期待您的响应属于给定类型。
这是一个构建时检查，并不保证服务器会实际使用此类型的对象进行响应。服务器 API 返回的实际类型是由服务端来保证的。


</div>

To access properties that are defined in an interface, you must explicitly convert the Object you get from the JSON to the required response type.
For example, the following `subscribe` callback receives `data` as an Object, and then type-casts it in order to access the properties.

要访问接口中定义的属性，必须将从 JSON 获得的对象显式转换为所需的响应类型。例如，以下 `subscribe` 回调会将 `data` 作为对象接收，然后进行类型转换以访问属性。


<code-example>
   .subscribe(data => this.config = {
    heroesUrl: (data as any).heroesUrl,
    textfile:  (data as any).textfile,
   });

</code-example>

### Reading the full response

### 读取完整的响应体

The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate certain conditions that are important to the application workflow.

响应体可能并不包含你需要的全部信息。有时候服务器会返回一个特殊的响应头或状态码，以标记出特定的条件，因此读取它们可能是必要的。

Tell `HttpClient` that you want the full response with the `observe` option:

要这样做，你就要通过 `observe` 选项来告诉 `HttpClient`，你想要完整的响应信息，而不是只有响应体：

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfigResponse">
</code-example>

Now `HttpClient.get()` returns an `Observable` of type `HttpResponse` rather than just the JSON data.

现在 `HttpClient.get()` 会返回一个 `HttpResponse` 类型的 `Observable`，而不只是 JSON 数据。

The component's `showConfigResponse()` method displays the response headers as well as the configuration:

该组件的 `showConfigResponse()` 方法会像显示配置数据一样显示响应头：

<code-example
  path="http/src/app/config/config.component.ts"
  region="showConfigResponse"
  header="app/config/config.component.ts (showConfigResponse)"
 >
</code-example>

As you can see, the response object has a `body` property of the correct type.

如你所见，该响应对象具有一个带有正确类型的 `body` 属性。

### Making a JSONP request

### 发起 JSONP 请求

Apps can use the `HttpClient` to make [JSONP](https://en.wikipedia.org/wiki/JSONP) requests across domains when the server doesn't support [CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

当服务器不支持 [CORS 协议](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)时，应用程序可以使用 `HttpClient` 跨域发出 [JSONP](https://en.wikipedia.org/wiki/JSONP) 请求。


Angular JSONP requests return an `Observable`.
Follow the pattern for subscribing to observables and use the RxJS `map` operator to transform the response before using the [async pipe](api/common/AsyncPipe) to manage the results.

Angular 的JSONP 请求会返回一个 `Observable`。
遵循订阅可观察对象变量的模式，并在使用 [async 管道](api/common/AsyncPipe)管理结果之前，使用 RxJS `map` 运算符转换响应。

In Angular, use JSONP by including `HttpClientJsonpModule` in the `NgModule` imports.
In the following example, the `searchHeroes()` method uses a JSONP request to query for heroes whose names contain the search term.

在 Angular 中，通过在 `NgModule` 的 `imports` 中包含 `HttpClientJsonpModule` 来使用 JSONP。在以下示例中， `searchHeroes()` 方法使用 JSONP 请求来查询名称包含搜索词的英雄。


```ts

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable {
  term = term.trim();

  let heroesURL = `${this.heroesURL}?${term}`;
  return this.http.jsonp(heroesUrl, 'callback').pipe(
      catchError(this.handleError('searchHeroes', []) // then handle the error
    );
};

```

This request passes the `heroesURL` as the first parameter and the callback function name as the second parameter.
The response is wrapped in the callback function, which takes the observables returned by the JSONP method and pipes them through to the error handler.

该请求将 `heroesURL` 作为第一个参数，并将回调函数名称作为第二个参数。响应被包装在回调函数中，该函数接受 JSONP 方法返回的可观察对象，并将它们通过管道传给错误处理程序。


### Requesting non-JSON data

### 请求非 JSON 数据


Not all APIs return JSON data.
In this next example, a `DownloaderService` method reads a text file from the server and logs the file contents, before returning those contents to the caller as an `Observable<string>`.

不是所有的 API 都会返回 JSON 数据。在下面这个例子中，`DownloaderService` 中的方法会从服务器读取文本文件，
并把文件的内容记录下来，然后把这些内容使用 `Observable<string>` 的形式返回给调用者。

<code-example
  path="http/src/app/downloader/downloader.service.ts"
  region="getTextFile"
  header="app/downloader/downloader.service.ts (getTextFile)" linenums="false">
</code-example>

`HttpClient.get()` returns a string rather than the default JSON because of the `responseType` option.

这里的 `HttpClient.get()` 返回字符串而不是默认的 JSON 对象，因为它的 `responseType` 选项是 `'text'`。

The RxJS `tap` operator (as in "wiretap") lets the code inspect both success and error values passing through the observable without disturbing them.

RxJS 的 `tap` 操作符（如“窃听”中所述）使代码可以检查通过可观察对象的成功值和错误值，而不会干扰它们。


A `download()` method in the `DownloaderComponent` initiates the request by subscribing to the service method.

在 `DownloaderComponent` 中的 `download()` 方法通过订阅这个服务中的方法来发起一次请求。

<code-example
  path="http/src/app/downloader/downloader.component.ts"
  region="download"
  header="app/downloader/downloader.component.ts (download)" linenums="false">
</code-example>

## Error handling

## 错误处理

What happens if the request fails on the server, or if a poor network connection prevents it from even reaching the server? `HttpClient` will return an _error_ object instead of a successful response.

如果这个请求导致了服务器错误怎么办？甚至，在烂网络下请求都没到服务器该怎么办？`HttpClient` 就会返回一个错误（error）而不再是成功的响应。

You _could_ handle in the component by adding a second callback to the `.subscribe()`:

通过在 `.subscribe()` 中添加第二个回调函数，你*可以*在组件中处理它：

<code-example
  path="http/src/app/config/config.component.ts"
  region="v3"
  header="app/config/config.component.ts (showConfig v.3 with error handling)"
 >
</code-example>

It's certainly a good idea to give the user some kind of feedback when data access fails.
But displaying the raw error object returned by `HttpClient` is far from the best way to do it.

在数据访问失败时给用户一些反馈，确实是个好主意。
不过，直接显示由 `HttpClient` 返回的原始错误数据还远远不够。

{@a error-details}

### Getting error details

### 获取错误详情

Detecting that an error occurred is one thing.
Interpreting that error and composing a user-friendly response is a bit more involved.

检测错误的发生是第一步，不过如果知道具体发生了什么错误才会更有用。上面例子中传给回调函数的 `err` 参数的类型是 `HttpErrorResponse`，它包含了这个错误中一些很有用的信息。

Two types of errors can occur. The server backend might reject the request, returning an HTTP response with a status code such as 404 or 500. These are error _responses_.

可能发生的错误分为两种。如果后端返回了一个失败的返回码（如 404、500 等），它会返回一个错误响应体。

Or something could go wrong on the client-side such as a network error that prevents the request from completing successfully or an exception thrown in an RxJS operator. These errors produce JavaScript `ErrorEvent` objects.

或者，如果在客户端这边出了错误（比如在 RxJS 操作符 (operator) 中抛出的异常或某些阻碍完成这个请求的网络错误），就会抛出一个 `Error` 类型的异常。

The `HttpClient` captures both kinds of errors in its `HttpErrorResponse` and you can inspect that response to figure out what really happened.

`HttpClient` 会在 `HttpErrorResponse` 中捕获所有类型的错误信息，你可以查看这个响应体以了解到底发生了什么。

Error inspection, interpretation, and resolution is something you want to do in the _service_,
not in the _component_.

错误的探查、解释和解决是你应该在*服务*中做的事情，而不是在*组件*中。

You might first devise an error handler like this one:

你可能首先要设计一个错误处理器，就像这样：

<code-example
  path="http/src/app/config/config.service.ts"
  region="handleError"
  header="app/config/config.service.ts (handleError)">
</code-example>

Notice that this handler returns an RxJS [`ErrorObservable`](#rxjs) with a user-friendly error message.
Consumers of the service expect service methods to return an `Observable` of some kind,
even a "bad" one.

注意，该处理器返回一个带有用户友好的错误信息的 RxJS [`ErrorObservable`](#rxjs) 对象。
该服务的消费者期望服务的方法返回某种形式的 `Observable`，就算是“错误的”也可以。

Now you take the `Observables` returned by the `HttpClient` methods
and _pipe them through_ to the error handler.

现在，你获取了由 `HttpClient` 方法返回的 `Observable`，并*把它们通过管道*传给错误处理器。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig_3"
  header="app/config/config.service.ts (getConfig v.3 with error handler)">
</code-example>

### Retrying

### 重试

Sometimes the error is transient and will go away automatically if you try again.
For example, network interruptions are common in mobile scenarios, and trying again
may produce a successful result.

有时候，错误只是临时性的，只要重试就可能会自动消失。
比如，在移动端场景中可能会遇到网络中断的情况，只要重试一下就能拿到正确的结果。

The [RxJS library](#rxjs) offers several _retry_ operators that are worth exploring.
The simplest is called `retry()` and it automatically re-subscribes to a failed `Observable` a specified number of times. _Re-subscribing_ to the result of an `HttpClient` method call has the effect of reissuing the HTTP request.

[RxJS 库](#rxjs)提供了几个 `retry` 操作符，它们值得仔细看看。
其中最简单的是 `retry()`，它可以对失败的 `Observable` 自动重新订阅几次。对 `HttpClient` 方法调用的结果进行*重新订阅*会导致重新发起 HTTP 请求。

_Pipe_ it onto the `HttpClient` method result just before the error handler.

把它插入到 `HttpClient` 方法结果的*管道*中，就放在错误处理器的紧前面。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig"
  header="app/config/config.service.ts (getConfig with retry)">
</code-example>

{@a rxjs}

## Observables and operators

## 可观察对象 (Observable) 与操作符 (operator)

The previous sections of this guide referred to RxJS `Observables` and operators such as `catchError` and `retry`.
You will encounter more RxJS artifacts as you continue below.

本章的前一节中引用了 RxJS 的 `Observable` 和 `operator`，比如 `catchError` 和 `retry`。
接下来你还会遇到更多 RxJS 中的概念。

[RxJS](http://reactivex.io/rxjs/) is a library for composing asynchronous and callback-based code
in a _functional, reactive style_.
Many Angular APIs, including `HttpClient`, produce and consume RxJS `Observables`.

[RxJS](http://reactivex.io/rxjs/) 是一个库，用于把异步调用和基于回调的代码组合成*函数式（functional）的*、*响应式（reactive）的*风格。
很多 Angular API，包括 `HttpClient` 都会生成和消费 RxJS 的 `Observable`。

RxJS itself is out-of-scope for this guide. You will find many learning resources on the web.
While you can get by with a minimum of RxJS knowledge, you'll want to grow your RxJS skills over time in order to use `HttpClient` effectively.

RxJS 本身超出了本章的范围。你可以在网络上找到更多的学习资源。
虽然只用少量的 RxJS 知识就可以获得解决方案，不过以后你会逐步提高 RxJS 技能，以便更高效的使用 `HttpClient`。

If you're following along with these code snippets, note that you must import the RxJS observable and operator symbols that appear in those snippets. These `ConfigService` imports are typical.

如果你在跟着教程敲下面这些代码片段，要注意你要自己导入这里出现的 RxJS 的可观察对象和操作符。就像 `ConfigService` 中的这些导入。

<code-example
  path="http/src/app/config/config.service.ts"
  region="rxjs-imports"
  header="app/config/config.service.ts (RxJS imports)">
</code-example>

## HTTP headers

## HTTP 标头


Many servers require extra headers for save operations.
For example, they may require a "Content-Type" header to explicitly declare the MIME type of the request body; or the server may require an authorization token.

许多服务器需要额外的标头进行保存操作。例如，它们可能需要 `Content-Type` 标头来显式声明请求正文的 MIME 类型；或者服务器可能需要一个授权令牌。


### Adding headers

### 添加请求头

The `HeroesService` defines such headers in an `httpOptions` object that will be passed
to every `HttpClient` save method.

`HeroesService` 在 `httpOptions` 对象中就定义了一些这样的请求头，并把它传给每个 `HttpClient` 的保存型方法。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="http-options"
  header="app/heroes/heroes.service.ts (httpOptions)">
</code-example>

### Updating headers

### 修改请求头


You can't directly modify the existing headers within the previous options
object because instances of the `HttpHeaders` class are immutable.

你没法直接修改前述配置对象中的现有头，因为这个 `HttpHeaders` 类的实例是不可变的。

Use the `set()` method instead, to return a clone of the current instance with the new changes applied.

改用 `set()` 方法，以返回当前实例应用这些新更改后的克隆。


Here's how you might update the authorization header (after the old token expired) before making the next request.

比如在发起下一个请求之前，如果旧的令牌已经过期了，你可能还要修改认证头。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
   region="update-headers" linenums="false">
</code-example>

## Sending data to the server

## 把数据发送到服务器

In addition to fetching data from the server, `HttpClient` supports mutating requests, that is, sending data to the server with other HTTP methods such as PUT, POST, and DELETE.

除了从服务器获取数据之外，`HttpClient` 还支持修改型的请求，也就是说，通过 `PUT`、`POST`、`DELETE` 这样的 HTTP 方法把数据发送到服务器。

The sample app for this guide includes a simplified version of the "Tour of Heroes" example
that fetches heroes and enables users to add, delete, and update them.

本指南中的这个范例应用包括一个简化版本的《英雄指南》，它会获取英雄数据，并允许用户添加、删除和修改它们。

The following sections excerpt methods of the sample's `HeroesService`.

下面的这些章节中包括该范例的 `HeroesService` 中的一些方法片段。

### Making a POST request

### 发起一个 POST 请求

Apps often POST data to a server. They POST when submitting a form.
In the following example, the `HeroesService` posts when adding a hero to the database.

应用经常把数据 `POST` 到服务器。它们会在提交表单时进行 `POST`。
下面这个例子中，`HeroesService` 在把英雄添加到数据库中时，就会使用 `POST`。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="addHero"
  header="app/heroes/heroes.service.ts (addHero)">
</code-example>

The `HttpClient.post()` method is similar to `get()` in that it has a type parameter
(you're expecting the server to return the new hero)
and it takes a resource URL.

`HttpClient.post()` 方法像 `get()` 一样也有类型参数（你会希望服务器返回一个新的英雄对象），它包含一个资源 URL。

It takes two more parameters:

它还接受另外两个参数：

1. `hero` - the data to POST in the body of the request.

   `hero` - 要 `POST` 的请求体数据。

1. `httpOptions` - the method options which, in this case, [specify required headers](#adding-headers).

   `httpOptions` - 这个例子中，该方法的选项[指定了所需的请求头](#adding-headers)。

Of course it catches errors in much the same manner [described above](#error-details).

当然，它捕获错误的方式很像[前面描述的](#error-details)操作方式。

The `HeroesComponent` initiates the actual POST operation by subscribing to
the `Observable` returned by this service method.

`HeroesComponent` 通过订阅该服务方法返回的 `Observable` 发起了一次实际的 `POST` 操作。

<code-example
  path="http/src/app/heroes/heroes.component.ts"
  region="add-hero-subscribe"
  header="app/heroes/heroes.component.ts (addHero)">
</code-example>

When the server responds successfully with the newly added hero, the component adds
that hero to the displayed `heroes` list.

当服务器成功做出响应时，会带有这个新创建的英雄，然后该组件就会把这个英雄添加到正在显示的 `heroes` 列表中。

### Making a DELETE request

### 发起 `DELETE` 请求

This application deletes a hero with the `HttpClient.delete` method by passing the hero's id
in the request URL.

该应用可以把英雄的 id 传给 `HttpClient.delete` 方法的请求 URL 来删除一个英雄。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="deleteHero"
  header="app/heroes/heroes.service.ts (deleteHero)">
</code-example>

The `HeroesComponent` initiates the actual DELETE operation by subscribing to
the `Observable` returned by this service method.

当 `HeroesComponent` 订阅了该服务方法返回的 `Observable` 时，就会发起一次实际的 `DELETE` 操作。

<code-example
  path="http/src/app/heroes/heroes.component.ts"
  region="delete-hero-subscribe"
  header="app/heroes/heroes.component.ts (deleteHero)">
</code-example>

The component isn't expecting a result from the delete operation, so it subscribes without a callback. Even though you are not using the result, you still have to subscribe. Calling the `subscribe()` method _executes_ the observable, which is what initiates the DELETE request.

该组件不会等待删除操作的结果，所以它的 subscribe （订阅）中没有回调函数。不过就算你不关心结果，也仍然要订阅它。调用 `subscribe()` 方法会**执行**这个可观察对象，这时才会真的发起 DELETE 请求。

<div class="alert is-important">

You must call _subscribe()_ or nothing happens. Just calling `HeroesService.deleteHero()` **does not initiate the DELETE request.**

你必须调用 `subscribe()`，否则什么都不会发生。仅仅调用 `HeroesService.deleteHero()` 是**不会发起 DELETE 请求的。**

</div>

<code-example
  path="http/src/app/heroes/heroes.component.ts"
  region="delete-hero-no-subscribe">
</code-example>

{@a always-subscribe}

**Always _subscribe_!**

**别忘了*订阅*！**

An `HttpClient` method does not begin its HTTP request until you call `subscribe()` on the observable returned by that method. This is true for _all_ `HttpClient` _methods_.

在调用方法返回的可观察对象的 `subscribe()` 方法之前，`HttpClient` 方法不会发起 HTTP 请求。这适用于 `HttpClient` 的*所有方法*。

<div class="alert is-helpful">

The [`AsyncPipe`](api/common/AsyncPipe) subscribes (and unsubscribes) for you automatically.

[`AsyncPipe`](api/common/AsyncPipe) 会自动为你订阅（以及取消订阅）。

</div>

All observables returned from `HttpClient` methods are _cold_ by design.
Execution of the HTTP request is _deferred_, allowing you to extend the
observable with additional operations such as  `tap` and `catchError` before anything actually happens.

`HttpClient` 的所有方法返回的可观察对象都设计为*冷的*。
HTTP 请求的执行都是*延期执行的*，让你可以用 `tap` 和 `catchError` 这样的操作符来在实际执行什么之前，先对这个可观察对象进行扩展。

Calling `subscribe(...)` triggers execution of the observable and causes
`HttpClient` to compose and send the HTTP request to the server.

调用 `subscribe(...)` 会触发这个可观察对象的执行，并导致 `HttpClient` 组合并把 HTTP 请求发给服务器。

You can think of these observables as _blueprints_ for actual HTTP requests.

你可以把这些可观察对象看做实际 HTTP 请求的*蓝图*。

<div class="alert is-helpful">

In fact, each `subscribe()` initiates a separate, independent execution of the observable.
Subscribing twice results in two HTTP requests.

实际上，每个 `subscribe()` 都会初始化此可观察对象的一次单独的、独立的执行。
订阅两次就会导致发起两个 HTTP 请求。

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

### 发起 PUT 请求

An app will send a PUT request to completely replace a resource with updated data.
The following `HeroesService` example is just like the POST example.

应用可以发送 PUT 请求，来使用修改后的数据完全替换掉一个资源。
下面的 `HeroesService` 例子和 POST 的例子很像。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="updateHero"
  header="app/heroes/heroes.service.ts (updateHero)">
</code-example>

For the reasons [explained above](#always-subscribe), the caller (`HeroesComponent.update()` in this case) must `subscribe()` to the observable returned from the `HttpClient.put()`
in order to initiate the request.

因为[前面解释过的](#always-subscribe)原因，调用者（这里是 `HeroesComponent.update()`）必须 `subscribe()` 由 `HttpClient.put()` 返回的可观察对象，以发起这个调用。

## Advanced usage

## 高级用法

We have discussed the basic HTTP functionality in `@angular/common/http`, but sometimes you need to do more than make simple requests and get data back.

我们已经讨论了 `@angular/common/http` 的基本 HTTP 功能，但有时候除了单纯发起请求和取回数据之外，你还要再做点别的。

{@a intercepting-requests-and-responses }

### HTTP interceptors

### 拦截请求和响应

_HTTP Interception_ is a major feature of `@angular/common/http`.
With interception, you declare _interceptors_ that inspect and transform HTTP requests from your application to the server.
The same interceptors may also inspect and transform the server's responses on their way back to the application.
Multiple interceptors form a _forward-and-backward_ chain of request/response handlers.

*HTTP* 拦截机制是 `@angular/common/http` 中的主要特性之一。
使用这种拦截机制，你可以声明*一些拦截器*，用它们监视和转换从应用发送到服务器的 HTTP 请求。
拦截器还可以用监视和转换从服务器返回到本应用的那些响应。
多个拦截器会构成一个“请求/响应处理器”的双向链表。

Interceptors can perform a variety of  _implicit_ tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response.

拦截器可以用一种常规的、标准的方式对每一次 HTTP 的请求/响应任务执行从认证到记日志等很多种*隐式*任务。

Without interception, developers would have to implement these tasks _explicitly_
for each `HttpClient` method call.

如果没有拦截机制，那么开发人员将不得不对每次 `HttpClient` 调用*显式*实现这些任务。

#### Write an interceptor

#### 编写拦截器

To implement an interceptor, declare a class that implements the `intercept()` method of the `HttpInterceptor` interface.

要实现拦截器，就要实现一个实现了 `HttpInterceptor` 接口中的 `intercept()` 方法的类。

 Here is a do-nothing _noop_ interceptor that simply passes the request through without touching it:

 这里是一个什么也不做的*空白*拦截器，它只会不做任何修改的传递这个请求。

<code-example
  path="http/src/app/http-interceptors/noop-interceptor.ts"
  header="app/http-interceptors/noop-interceptor.ts">
</code-example>

The `intercept` method transforms a request into an `Observable` that eventually returns the HTTP response.
In this sense, each interceptor is fully capable of handling the request entirely by itself.

`intercept` 方法会把请求转换成一个最终返回 HTTP 响应体的 `Observable`。
在这个场景中，每个拦截器都完全能自己处理这个请求。

Most interceptors inspect the request on the way in and forward the (perhaps altered) request to the `handle()` method of the `next` object which implements the [`HttpHandler`](api/common/http/HttpHandler) interface.

大多数拦截器拦截都会在传入时检查请求，然后把（可能被修改过的）请求转发给 `next` 对象的 `handle()` 方法，而 `next` 对象实现了 [`HttpHandler`](api/common/http/HttpHandler) 接口。

```javascript

export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

```

Like `intercept()`, the `handle()` method transforms an HTTP request into an `Observable` of [`HttpEvents`](#httpevents) which ultimately include the server's response. The `intercept()` method could inspect that observable and alter it before returning it to the caller.

像 `intercept()` 一样，`handle()` 方法也会把 HTTP 请求转换成 [`HttpEvents`](#httpevents) 组成的 `Observable`，它最终包含的是来自服务器的响应。
`intercept()` 函数可以检查这个可观察对象，并在把它返回给调用者之前修改它。

This _no-op_ interceptor simply calls `next.handle()` with the original request and returns the observable without doing a thing.

这个*无操作的*拦截器，会直接使用原始的请求调用 `next.handle()`，并返回它返回的可观察对象，而不做任何后续处理。

#### The _next_ object

#### `next` 对象

The `next` object represents the next interceptor in the chain of interceptors.
The final `next` in the chain is the `HttpClient` backend handler that sends the request to the server and receives the server's response.

`next` 对象表示拦截器链表中的下一个拦截器。
这个链表中的最后一个 `next` 对象就是 `HttpClient` 的后端处理器（backend handler），它会把请求发给服务器，并接收服务器的响应。

Most interceptors call `next.handle()` so that the request flows through to the next interceptor and, eventually, the backend handler.
An interceptor _could_ skip calling `next.handle()`, short-circuit the chain, and [return its own `Observable`](#caching) with an artificial server response.

大多数的拦截器都会调用 `next.handle()`，以便这个请求流能走到下一个拦截器，并最终传给后端处理器。
拦截器也*可以*不调用 `next.handle()`，使这个链路短路，并返回一个带有人工构造出来的服务器响应的 [自己的 `Observable`](#caching)。

This is a common middleware pattern found in frameworks such as Express.js.

这是一种常见的中间件模式，在像 Express.js 这样的框架中也会找到它。

#### Provide the interceptor

#### 提供这个拦截器

The `NoopInterceptor` is a service managed by Angular's [dependency injection (DI)](guide/dependency-injection) system.
Like other services, you must provide the interceptor class before the app can use it.

这个 `NoopInterceptor` 就是一个由 Angular [依赖注入 (DI)](guide/dependency-injection)系统管理的服务。
像其它服务一样，你也必须先提供这个拦截器类，应用才能使用它。

Because interceptors are (optional) dependencies of the `HttpClient` service,
you must provide them in the same injector (or a parent of the injector) that provides `HttpClient`.
Interceptors provided _after_ DI creates the `HttpClient` are ignored.

由于拦截器是 `HttpClient` 服务的（可选）依赖，所以你必须在提供 `HttpClient` 的同一个（或其各级父注入器）注入器中提供这些拦截器。
那些在 DI 创建完 `HttpClient` *之后*再提供的拦截器将会被忽略。

This app provides `HttpClient` in the app's root injector, as a side-effect of importing the `HttpClientModule` in `AppModule`.
You should provide interceptors in `AppModule` as well.

由于在 `AppModule` 中导入了 `HttpClientModule`，导致本应用在其根注入器中提供了 `HttpClient`。所以你也同样要在 `AppModule` 中提供这些拦截器。

After importing the `HTTP_INTERCEPTORS` injection token from `@angular/common/http`,
write the `NoopInterceptor` provider like this:

在从 `@angular/common/http` 中导入了 `HTTP_INTERCEPTORS` 注入令牌之后，编写如下的 `NoopInterceptor` 提供者注册语句：

<code-example
  path="http/src/app/http-interceptors/index.ts"
  region="noop-provider">
</code-example>

Note the `multi: true` option.
This required setting tells Angular that `HTTP_INTERCEPTORS` is a token for a _multiprovider_
that injects an array of values, rather than a single value.

注意 `multi: true` 选项。
这个必须的选项会告诉 Angular `HTTP_INTERCEPTORS` 是一个*多重提供者*的令牌，表示它会注入一个多值的数组，而不是单一的值。

You _could_ add this provider directly to the providers array of the `AppModule`.
However, it's rather verbose and there's a good chance that
you'll create more interceptors and provide them in the same way.
You must also pay [close attention to the order](#interceptor-order)
in which you provide these interceptors.

你*也可以*直接把这个提供者添加到 `AppModule` 中的提供者数组中，不过那样会非常啰嗦。况且，你将来还会用这种方式创建更多的拦截器并提供它们。
你还要[特别注意提供这些拦截器的顺序](#interceptor-order)。

Consider creating a "barrel" file that gathers all the interceptor providers into an `httpInterceptorProviders` array, starting with this first one, the `NoopInterceptor`.

认真考虑创建一个封装桶（barrel）文件，用于把所有拦截器都收集起来，一起提供给 `httpInterceptorProviders` 数组，可以先从这个 `NoopInterceptor` 开始。

<code-example
  path="http/src/app/http-interceptors/index.ts"
  region="interceptor-providers"
  header="app/http-interceptors/index.ts">
</code-example>

Then import and add it to the `AppModule` _providers array_ like this:

然后导入它，并把它加到 `AppModule` 的 *`providers` 数组*中，就像这样：

<code-example
  path="http/src/app/app.module.ts"
  region="interceptor-providers"
  header="app/app.module.ts (interceptor providers)">
</code-example>

As you create new interceptors, add them to the `httpInterceptorProviders` array and
you won't have to revisit the `AppModule`.

当你再创建新的拦截器时，就同样把它们添加到 `httpInterceptorProviders` 数组中，而不用再修改 `AppModule`。

<div class="alert is-helpful">

There are many more interceptors in the complete sample code.

在完整版的范例代码中还有更多的拦截器。

</div>

#### Interceptor order

#### 拦截器的顺序

Angular applies interceptors in the order that you provide them.
If you provide interceptors _A_, then _B_, then _C_,  requests will flow in _A->B->C_ and
responses will flow out _C->B->A_.

Angular 会按照你提供它们的顺序应用这些拦截器。
如果你提供拦截器的顺序是先 *A*，再 *B*，再 *C*，那么请求阶段的执行顺序就是 *A->B->C*，而响应阶段的执行顺序则是
 *C->B->A*。

You cannot change the order or remove interceptors later.
If you need to enable and disable an interceptor dynamically, you'll have to build that capability into the interceptor itself.

以后你就再也不能修改这些顺序或移除某些拦截器了。
如果你需要动态启用或禁用某个拦截器，那就要在那个拦截器中自行实现这个功能。

#### _HttpEvents_

You may have expected the `intercept()` and `handle()` methods to return observables of `HttpResponse<any>` as most `HttpClient` methods do.

你可能会期望 `intercept()` 和 `handle()` 方法会像大多数 `HttpClient` 中的方法那样返回 `HttpResponse<any>` 的可观察对象。

Instead they return observables of `HttpEvent<any>`.

然而并没有，它们返回的是 `HttpEvent<any>` 的可观察对象。

That's because interceptors work at a lower level than those `HttpClient` methods. A single HTTP request can generate multiple _events_, including upload and download progress events. The `HttpResponse` class itself is actually an event, whose type is `HttpEventType.Response`.

这是因为拦截器工作的层级比那些 `HttpClient` 方法更低一些。每个 HTTP 请求都可能会生成很多个*事件*，包括上传和下载的进度事件。
实际上，`HttpResponse` 类本身就是一个事件，它的类型（`type`）是 `HttpEventType.Response`。

Many interceptors are only concerned with the outgoing request and simply return the event stream from `next.handle()` without modifying it.

很多拦截器只关心发出的请求，而对 `next.handle()` 返回的事件流不会做任何修改。

But interceptors that examine and modify the response from `next.handle()`
will see all of these events.
Your interceptor should return _every event untouched_ unless it has a _compelling reason to do otherwise_.

但那些要检查和修改来自 `next.handle()` 的响应体的拦截器希望看到所有这些事件。
所以，你的拦截器应该返回*你没碰过的所有事件*，除非你*有充分的理由不这么做*。

#### Immutability

#### 不可变性

Although interceptors are capable of mutating requests and responses,
the `HttpRequest` and `HttpResponse` instance properties are `readonly`,
rendering them largely immutable.

虽然拦截器有能力改变请求和响应，但 `HttpRequest` 和 `HttpResponse` 实例的属性却是只读（`readonly`）的，
因此让它们基本上是不可变的。

They are immutable for a good reason: the app may retry a request several times before it succeeds, which means that the interceptor chain may re-process the same request multiple times.
If an interceptor could modify the original request object, the re-tried operation would start from the modified request rather than the original. Immutability ensures that interceptors see the same request for each try.

有充足的理由把它们做成不可变对象：应用可能会重试发送很多次请求之后才能成功，这就意味着这个拦截器链表可能会多次重复处理同一个请求。
如果拦截器可以修改原始的请求对象，那么重试阶段的操作就会从修改过的请求开始，而不是原始请求。
而这种不可变性，可以确保这些拦截器在每次重试时看到的都是同样的原始请求。

TypeScript will prevent you from setting `HttpRequest` readonly properties.

通过把 `HttpRequest` 的属性设置为只读的，TypeScript 可以防止你犯这种错误。

```javascript

  // Typescript disallows the following assignment because req.url is readonly
  req.url = req.url.replace('http://', 'https://');

```

To alter the request, clone it first and modify the clone before passing it to `next.handle()`.
You can clone and modify the request in a single step as in this example.

要想修改该请求，就要先克隆它，并修改这个克隆体，然后再把这个克隆体传给 `next.handle()`。
你可以用一步操作中完成对请求的克隆和修改，例子如下：

<code-example
  path="http/src/app/http-interceptors/ensure-https-interceptor.ts"
  region="excerpt"
  header="app/http-interceptors/ensure-https-interceptor.ts (excerpt)">
</code-example>

The `clone()` method's hash argument allows you to mutate specific properties of the request while copying the others.

这个 `clone()` 方法的哈希型参数允许你在复制出克隆体的同时改变该请求的某些特定属性。

##### The request body

##### 请求体

The `readonly` assignment guard can't prevent deep updates and, in particular,
it can't prevent you from modifying a property of a request body object.

`readonly` 这种赋值保护，无法防范深修改（修改子对象的属性），也不能防范你修改请求体对象中的属性。

```javascript

  req.body.name = req.body.name.trim(); // bad idea!

```

If you must mutate the request body, copy it first, change the copy,
`clone()` the request, and set the clone's body with the new body, as in the following example.

如果你必须修改请求体，那么就要先复制它，然后修改这个副本，`clone()` 这个请求，然后把这个请求体的副本作为新的请求体，例子如下：

<code-example
  path="http/src/app/http-interceptors/trim-name-interceptor.ts"
  region="excerpt"
  header="app/http-interceptors/trim-name-interceptor.ts (excerpt)">
</code-example>

##### Clearing the request body

##### 清空请求体

Sometimes you need to clear the request body rather than replace it.
If you set the cloned request body to `undefined`, Angular assumes you intend to leave the body as is.
That is not what you want.
If you set the cloned request body to `null`, Angular knows you intend to clear the request body.

有时你需要清空请求体，而不是替换它。
如果你把克隆后的请求体设置成 `undefined`，Angular 会认为你是想让这个请求体保持原样。
这显然不是你想要的。
但如果把克隆后的请求体设置成 `null`，那 Angular 就知道你是想清空这个请求体了。

```javascript

  newReq = req.clone({ ... }); // body not mentioned => preserve original body
  newReq = req.clone({ body: undefined }); // preserve original body
  newReq = req.clone({ body: null }); // clear the body

```

#### Set default headers

#### 设置默认请求头

Apps often use an interceptor to set default headers on outgoing requests.

应用通常会使用拦截器来设置外发请求的默认请求头。

The sample app has an `AuthService` that produces an authorization token.
Here is its `AuthInterceptor` that injects that service to get the token and
adds an authorization header with that token to every outgoing request:

该范例应用具有一个 `AuthService`，它会生成一个认证令牌。
在这里，`AuthInterceptor` 会注入该服务以获取令牌，并对每一个外发的请求添加一个带有该令牌的认证头：

<code-example
  path="http/src/app/http-interceptors/auth-interceptor.ts"
  header="app/http-interceptors/auth-interceptor.ts">
</code-example>

The practice of cloning a request to set new headers is so common that
there's a `setHeaders` shortcut for it:

这种在克隆请求的同时设置新请求头的操作太常见了，因此它还有一个快捷方式 `setHeaders`：

<code-example
  path="http/src/app/http-interceptors/auth-interceptor.ts"
  region="set-header-shortcut">
</code-example>

An interceptor that alters headers can be used for a number of different operations, including:

这种可以修改头的拦截器可以用于很多不同的操作，比如：

* Authentication/authorization

   认证 / 授权

* Caching behavior; for example, `If-Modified-Since`

   控制缓存行为。比如 `If-Modified-Since`

* XSRF protection

   XSRF 防护

#### Logging

#### 记日志

Because interceptors can process the request and response _together_, they can do things like time and log
an entire HTTP operation.

因为拦截器可以*同时*处理请求和响应，所以它们也可以对整个 HTTP 操作进行计时和记录日志。

Consider the following `LoggingInterceptor`, which captures the time of the request,
the time of the response, and logs the outcome with the elapsed time
with the injected `MessageService`.

考虑下面这个 `LoggingInterceptor`，它捕获请求的发起时间、响应的接收时间，并使用注入的 `MessageService` 来发送总共花费的时间。

<code-example
  path="http/src/app/http-interceptors/logging-interceptor.ts"
  region="excerpt"
  header="app/http-interceptors/logging-interceptor.ts)">
</code-example>

The RxJS `tap` operator captures whether the request succeeded or failed.
The RxJS `finalize` operator is called when the response observable either errors or completes (which it must),
and reports the outcome to the `MessageService`.

RxJS 的 `tap` 操作符会捕获请求成功了还是失败了。
RxJS 的 `finalize` 操作符无论在响应成功还是失败时都会调用（这是必须的），然后把结果汇报给 `MessageService`。

Neither `tap` nor `finalize` touch the values of the observable stream returned to the caller.

在这个可观察对象的流中，无论是 `tap` 还是 `finalize` 接触过的值，都会照常发送给调用者。

#### Caching

#### 缓存

Interceptors can handle requests by themselves, without forwarding to `next.handle()`.

拦截器还可以自行处理这些请求，而不用转发给 `next.handle()`。

For example, you might decide to cache certain requests and responses to improve performance.
You can delegate caching to an interceptor without disturbing your existing data services.

比如，你可能会想缓存某些请求和响应，以便提升性能。
你可以把这种缓存操作委托给某个拦截器，而不破坏你现有的各个数据服务。

The `CachingInterceptor` demonstrates this approach.

`CachingInterceptor` 演示了这种方式。

<code-example
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="v1"
  header="app/http-interceptors/caching-interceptor.ts)">
</code-example>

The `isCachable()` function determines if the request is cachable.
In this sample, only GET requests to the npm package search api are cachable.

`isCachable()` 函数用于决定该请求是否允许缓存。
在这个例子中，只有发到 npm 包搜索 API 的 GET 请求才是可以缓存的。

If the request is not cachable, the interceptor simply forwards the request
to the next handler in the chain.

如果该请求是不可缓存的，该拦截器只会把该请求转发给链表中的下一个处理器。

If a cachable request is found in the cache, the interceptor returns an `of()` _observable_ with
the cached response, by-passing the `next` handler (and all other interceptors downstream).

如果可缓存的请求在缓存中找到了，该拦截器就会通过 `of()` 函数返回一个已缓存的响应体的*可观察对象*，然后绕过 `next` 处理器（以及所有其它下游拦截器）。

If a cachable request is not in cache, the code calls `sendRequest`.

如果可缓存的请求在缓存中没找到，代码就会调用 `sendRequest`。

{@a send-request}

<code-example
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="send-request">
</code-example>

The `sendRequest` function creates a [request clone](#immutability) without headers
because the npm api forbids them.

`sendRequest` 函数创建了一个不带请求头的[请求克隆体](#immutability)，因为 npm API 不会接受它们。

It forwards that request to `next.handle()` which ultimately calls the server and
returns the server's response.

它会把这个请求转发给 `next.handle()`，它最终会调用服务器，并且返回服务器的响应。

Note how `sendRequest` _intercepts the response_ on its way back to the application.
It _pipes_ the response through the `tap()` operator,
whose callback adds the response to the cache.

注意 `sendRequest` 是如何在发回给应用之前*拦截这个响应的*。
它会通过 `tap()` 操作符对响应进行管道处理，并在其回调中把响应加到缓存中。

The original response continues untouched back up through the chain of interceptors
to the application caller.

然后，原始的响应会通过这些拦截器链，原封不动的回到服务器的调用者那里。

Data services, such as `PackageSearchService`, are unaware that
some of their `HttpClient` requests actually return cached responses.

数据服务，比如 `PackageSearchService`，并不知道它们收到的某些 `HttpClient` 请求实际上是从缓存的请求中返回来的。

{@a cache-refresh}

#### Return a multi-valued _Observable_

#### 返回多值可观察对象

The `HttpClient.get()` method normally returns an _observable_
that either emits the data or an error.
Some folks describe it as a "_one and done_" observable.

`HttpClient.get()` 方法正常情况下只会返回一个*可观察对象*，它或者发出数据，或者发出错误。
有些人说它是“一次性完成”的可观察对象。

But an interceptor can change this to an _observable_ that emits more than once.

但是拦截器也可以把这个修改成发出多个值的*可观察对象*。

A revised version of the `CachingInterceptor` optionally returns an _observable_ that
immediately emits the cached response, sends the request to the NPM web API anyway,
and emits again later with the updated search results.

修改后的 `CachingInterceptor` 版本可以返回一个立即发出缓存的响应，然后仍然把请求发送到 NPM 的 Web API，然后再把修改过的搜索结果重新发出一次。

<code-example
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="intercept-refresh">
</code-example>

The _cache-then-refresh_ option is triggered by the presence of a **custom `x-refresh` header**.

这种*缓存并刷新*的选项是由**自定义的 `x-refresh` 头**触发的。

<div class="alert is-helpful">

A checkbox on the `PackageSearchComponent` toggles a `withRefresh` flag,
which is one of the arguments to `PackageSearchService.search()`.
That `search()` method creates the custom `x-refresh` header
and adds it to the request before calling `HttpClient.get()`.

`PackageSearchComponent` 中的一个检查框会切换 `withRefresh` 标识，
它是 `PackageSearchService.search()` 的参数之一。
`search()` 方法创建了自定义的 `x-refresh` 头，并在调用 `HttpClient.get()` 前把它添加到请求里。

</div>

The revised `CachingInterceptor` sets up a server request
whether there's a cached value or not,
using the same `sendRequest()` method described [above](#send-request).
The `results$` observable will make the request when subscribed.

修改后的 `CachingInterceptor` 会发起一个服务器请求，而不管有没有缓存的值。
就像 [前面](#send-request) 的 `sendRequest()` 方法一样进行订阅。
在订阅 `results$` 可观察对象时，就会发起这个请求。

If there's no cached value, the interceptor returns `results$`.

如果没有缓存的值，拦截器直接返回 `result$`。

If there is a cached value, the code _pipes_ the cached response onto
`results$`, producing a recomposed observable that emits twice,
the cached response first (and immediately), followed later
by the response from the server.
Subscribers see a sequence of _two_ responses.

如果有缓存的值，这些代码就会把缓存的响应加入到 `result$` 的管道中，使用重组后的可观察对象进行处理，并发出两次。
先立即发出一次缓存的响应体，然后发出来自服务器的响应。
订阅者将会看到一个包含这*两个*响应的序列。

### Configuring the request

### 配置请求

Other aspects of an outgoing request can be configured via the options object
passed as the last argument to the `HttpClient` method.

待发送请求的其它方面可以通过传给 `HttpClient` 方法的最后一个参数指定的配置对象进行配置。

In [Adding headers](#adding-headers), the `HeroesService` set the default headers by
passing an options object (`httpOptions`) to its save methods.
You can do more.

在[添加请求头](#adding-headers) 部分，`HeroesService` 通过将选项对象（ `httpOptions` ）传给它的保存方法来设置默认请求头。您还可以做更多事。


#### URL query strings

#### URL 查询字符串


In this section, you will see how to use the `HttpParams` class to add URL query strings in your `HttpRequest`.

在本节中，您将看到如何使用 `HttpParams` 类在 `HttpRequest` 中添加 URL 查询字符串。


The following `searchHeroes` method queries for heroes whose names contain the search term.
Start by importing `HttpParams` class.

以下 `searchHeroes` 方法查询名称中包含搜索词的英雄。首先要导入 `HttpParams` 类。


<code-example hideCopy language="typescript">
import {HttpParams} from "@angular/common/http";
</code-example>

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="searchHeroes" linenums="false">
</code-example>

If there is a search term, the code constructs an options object with an HTML URL-encoded search parameter.
If the term were "foo", the GET request URL would be `api/heroes?name=foo`.

如果有搜索词，这段代码就会构造一个包含进行过 URL 编码的搜索词的选项对象。如果这个搜索词是“foo”，这个 GET 请求的 URL 就会是 `api/heroes/?name=foo`。

The `HttpParams` are immutable so you'll have to save the returned value of the `.set()` method in order to update the options.

`HttpParams` 是不可变的，因此您必须保存 `.set()` 方法的返回值才能更新选项。


#### Use `fromString` to create HttpParams

#### 使用 `fromString` 创建 HttpParams


You can also create HTTP parameters directly from a query string by using the `fromString` variable:

您还可以使用 `fromString` 变量直接从查询字符串创建 HTTP 参数：


<code-example hideCopy language="typescript">
const params = new HttpParams({fromString: 'name=foo'});
</code-example>

### Debouncing requests

### 请求的防抖（debounce）

The sample includes an _npm package search_ feature.

这个例子还包含了*搜索 npm 包*的特性。

When the user enters a name in a search-box, the `PackageSearchComponent` sends
a search request for a package with that name to the NPM web API.

当用户在搜索框中输入名字时，`PackageSearchComponent` 就会把一个根据名字搜索包的请求发送给 NPM 的 web api。

Here's a pertinent excerpt from the template:

下面是模板中的相关代码片段：

<code-example
  path="http/src/app/package-search/package-search.component.html"
  region="search"
  header="app/package-search/package-search.component.html (search)">
</code-example>

The `keyup` event binding sends every keystroke to the component's `search()` method.

`(keyup)` 事件绑定把每次击键都发送给了组件的 `search()` 方法。

Sending a request for every keystroke could be expensive.
It's better to wait until the user stops typing and then send a request.
That's easy to implement with RxJS operators, as shown in this excerpt.

如果每次击键都发送一次请求就太昂贵了。
最好能等到用户停止输入时才发送请求。
使用 RxJS 的操作符就能轻易实现它，参见下面的代码片段：

<code-example
  path="http/src/app/package-search/package-search.component.ts"
  region="debounce"
  header="app/package-search/package-search.component.ts (excerpt)">
</code-example>

The `searchText$` is the sequence of search-box values coming from the user.
It's defined as an RxJS `Subject`, which means it is a multicasting `Observable`
that can also emit values for itself by calling `next(value)`,
as happens in the `search()` method.

`searchText$` 是来自用户的搜索框值的序列。它被定义为 RxJS `Subject` 类型，这意味着它是一个多播 `Observable` ，它还可以通过调用 `next(value)` 来自行发出值，就像在 `search()` 方法中一样。


Rather than forward every `searchText` value directly to the injected `PackageSearchService`,
the code in `ngOnInit()` _pipes_ search values through three operators:

除了把每个 `searchText` 的值都直接转发给 `PackageSearchService` 之外，`ngOnInit()` 中的代码还通过下列三个操作符对这些搜索值进行*管道*处理：

1. `debounceTime(500)` - wait for the user to stop typing (1/2 second in this case).

   `debounceTime(500)` - 等待，直到用户停止输入（这个例子中是停止 1/2 秒）。

2. `distinctUntilChanged()` - wait until the search text changes.

   `distinctUntilChanged()` - 等待搜索文本发生变化。


3. `switchMap()` - send the search request to the service.

   `switchMap()` - 将搜索请求发送到服务。


The code sets `packages$` to this re-composed `Observable` of search results.
The template subscribes to `packages$` with the [AsyncPipe](api/common/AsyncPipe)
and displays search results as they arrive.

这些代码把 `packages$` 设置成了使用搜索结果组合出的 `Observable` 对象。
模板中使用 [AsyncPipe](api/common/AsyncPipe) 订阅了 `packages$`，一旦搜索结果的值发回来了，就显示这些搜索结果。

A search value reaches the service only if it's a new value and the user has stopped typing.

这样，只有当用户停止了输入且搜索值和以前不一样的时候，搜索值才会传给服务。

<div class="alert is-helpful">

The `withRefresh` option is explained [below](#cache-refresh).

[稍后](#cache-refresh) 解释了这个 `withRefresh` 选项。

</div>

#### _switchMap()_

The `switchMap()` operator has three important characteristics.

这个 `switchMap()` 操作符有三个重要的特征：

1. It takes a function argument that returns an `Observable`.
`PackageSearchService.search` returns an `Observable`, as other data service methods do.

   它的参数是一个返回 `Observable` 的函数。`PackageSearchService.search` 会返回 `Observable`，其它数据服务也一样。

2. If a previous search request is still _in-flight_ (as when the network connection is poor),
it cancels that request and sends a new one.

   如果先前的搜索请求仍在*进行中* （如网络连接不良），它将取消该请求并发送新的请求。


3. It returns service responses in their original request order, even if the
server returns them out of order.

   它会按照原始的请求顺序返回这些服务的响应，而不用关心服务器实际上是以乱序返回的它们。

<div class="alert is-helpful">

If you think you'll reuse this debouncing logic,
consider moving it to a utility function or into the `PackageSearchService` itself.

如果你觉得将来会复用这些防抖逻辑，
可以把它移到单独的工具函数中，或者移到 `PackageSearchService` 中。

</div>

### Listening to progress events

### 监听进度事件

Sometimes applications transfer large amounts of data and those transfers can take a long time.
File uploads are a typical example.
Give the users a better experience by providing feedback on the progress of such transfers.

有时，应用会传输大量数据，并且这些传输可能会花费很长时间。
典型的例子是文件上传。
可以通过在传输过程中提供进度反馈，来提升用户体验。

To make a request with progress events enabled, you can create an instance of `HttpRequest`
with the `reportProgress` option set true to enable tracking of progress events.

要想发起带有进度事件的请求，你可以创建一个把 `reportProgress` 选项设置为 `true` 的 `HttpRequest` 实例，以开启进度跟踪事件。

<code-example
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-request"
  header="app/uploader/uploader.service.ts (upload request)">
</code-example>

<div class="alert is-important">

Every progress event triggers change detection, so only turn them on if you truly intend to report progress in the UI.

每个进度事件都会触发变更检测，所以，只有当确实希望在 UI 中报告进度时，你才应该打开这个选项。

When using [`HttpClient#request()`](api/common/http/HttpClient#request) with an HTTP method, configure with
[`observe: 'events'`](api/common/http/HttpClient#request) to see all events, including the progress of transfers.

当和 HTTP 方法一起使用 [`HttpClient#request()`](api/common/http/HttpClient#request) 时，配置上 [`observe: 'events'`](api/common/http/HttpClient#request) 选项可以看到所有事件，包括传输过程中的事件。

</div>

Next, pass this request object to the `HttpClient.request()` method, which
returns an `Observable` of `HttpEvents`, the same events processed by interceptors:

接下来，把这个请求对象传给 `HttpClient.request()` 方法，它返回一个 `HttpEvents` 的 `Observable`，同样也可以在拦截器中处理这些事件。

<code-example
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-body"
  header="app/uploader/uploader.service.ts (upload body)">
</code-example>

The `getEventMessage` method interprets each type of `HttpEvent` in the event stream.

`getEventMessage` 方法会解释事件流中的每一个 `HttpEvent` 类型。

<code-example
  path="http/src/app/uploader/uploader.service.ts"
  region="getEventMessage"
  header="app/uploader/uploader.service.ts (getEventMessage)">
</code-example>

<div class="alert is-helpful">

The sample app for this guide doesn't have a server that accepts uploaded files.
The `UploadInterceptor` in `app/http-interceptors/upload-interceptor.ts`
intercepts and short-circuits upload requests
by returning an observable of simulated events.

这个范例应用中并没有一个用来接收上传的文件的真实的服务器。
`app/http-interceptors/upload-interceptor.ts` 中的 `UploadInterceptor` 会拦截并短路掉上传请求，改为返回一个带有各个模拟事件的可观察对象。

</div>

## Security: XSRF protection

## 安全：XSRF 防护

[Cross-Site Request Forgery (XSRF or CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website.
`HttpClient` supports a [common mechanism](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token) used to prevent XSRF attacks.
When performing HTTP requests, an interceptor reads a token from a cookie, by default `XSRF-TOKEN`, and sets it as an HTTP header, `X-XSRF-TOKEN`.
Since only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.

[跨站请求伪造 (XSRF 或 CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery)是一个攻击技术，它能让攻击者假冒一个已认证的用户在你的网站上执行未知的操作。`HttpClient` 支持一种[通用的机制](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token)来防范 XSRF 攻击。当执行 HTTP 请求时，一个拦截器会从 cookie 中读取 XSRF 令牌（默认名字为 `XSRF-TOKEN`），并且把它设置为一个 HTTP 头 `X-XSRF-TOKEN`，由于只有运行在你自己的域名下的代码才能读取这个 cookie，因此后端可以确认这个 HTTP 请求真的来自你的客户端应用，而不是攻击者。

By default, an interceptor sends this header on all mutating requests (such as POST)
to relative URLs, but not on GET/HEAD requests or on requests with an absolute URL.

默认情况下，拦截器会在所有的修改型请求中（比如 POST 等）把这个请求头发送给使用相对 URL 的请求。但不会在 GET/HEAD 请求中发送，也不会发送给使用绝对 URL 的请求。

To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called `XSRF-TOKEN` on either the page load or the first GET request.
On subsequent requests the server can verify that the cookie matches the `X-XSRF-TOKEN` HTTP header, and therefore be sure that only code running on your domain could have sent the request.
The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens.
Set the token to a digest of your site's authentication cookie with a salt for added security.

要获得这种优点，你的服务器需要在页面加载或首个 GET 请求中把一个名叫 `XSRF-TOKEN` 的令牌写入可被 JavaScript 读到的会话 cookie 中。
而在后续的请求中，服务器可以验证这个 cookie 是否与 HTTP 头 `X-XSRF-TOKEN` 的值一致，以确保只有运行在你自己域名下的代码才能发起这个请求。这个令牌必须对每个用户都是唯一的，并且必须能被服务器验证，因此不能由客户端自己生成令牌。把这个令牌设置为你的站点认证信息并且加了盐（salt）的摘要，以提升安全性。

In order to prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.

为了防止多个 Angular 应用共享同一个域名或子域时出现冲突，要给每个应用分配一个唯一的 cookie 名称。

<div class="alert is-important">

*`HttpClient` supports only the client half of the XSRF protection scheme.*
Your backend service must be configured to set the cookie for your page, and to verify that
the header is present on all eligible requests.
If not, Angular's default protection will be ineffective.

*`HttpClient` 支持的只是 XSRF 防护方案的客户端这一半。* 你的后端服务必须配置为给页面设置 cookie ，并且要验证请求头，以确保全都是合法的请求。否则，Angular 默认的这种防护措施就会失效。

</div>

### Configuring custom cookie/header names

### 配置自定义 cookie/header 名称

If your backend service uses different names for the XSRF token cookie or header,
use `HttpClientXsrfModule.withOptions()` to override the defaults.

如果你的后端服务中对 XSRF 令牌的 cookie 或 头使用了不一样的名字，就要使用 `HttpClientXsrfModule.withConfig()` 来覆盖掉默认值。

<code-example
  path="http/src/app/app.module.ts"
  region="xsrf">
</code-example>

## Testing HTTP requests

## 测试 HTTP 请求

As for any external dependency, you must mock the HTTP backend so your tests can simulate interaction with a remote server.
The `@angular/common/http/testing` library makes it straightforward to set up such mocking.

如同所有的外部依赖一样，你必须把 HTTP 后端也 Mock 掉，以便你的测试可以模拟这种与后端的互动。
`@angular/common/http/testing` 库能让这种 Mock 工作变得直截了当。

Angular's HTTP testing library is designed for a pattern of testing in which the app executes code and makes requests first.
The test then expects that certain requests have or have not been made,
performs assertions against those requests,
and finally provides responses by "flushing" each expected request.

Angular 的 HTTP 测试库是专为其中的测试模式而设计的。在这种模式下，会首先在应用中执行代码并发起请求。
然后，这个测试会期待发起或未发起过某个请求，并针对这些请求进行断言，
最终对每个所预期的请求进行刷新（flush）来对这些请求提供响应。

At the end, tests may verify that the app has made no unexpected requests.

最终，测试可能会验证这个应用不曾发起过非预期的请求。

<div class="alert is-helpful">

You can run <live-example stackblitz="specs">these sample tests</live-example>
in a live coding environment.

你可以到在线编程环境中运行<live-example stackblitz="specs">这些范例测试</live-example>。

The tests described in this guide are in `src/testing/http-client.spec.ts`.
There are also tests of an application data service that call `HttpClient` in
`src/app/heroes/heroes.service.spec.ts`.

本章所讲的这些测试位于 `src/testing/http-client.spec.ts` 中。
在 `src/app/heroes/heroes.service.spec.ts` 中还有一些测试，用于测试那些调用了 `HttpClient` 的数据服务。

</div>

### Setup

### 搭建环境

To begin testing calls to `HttpClient`,
import the `HttpClientTestingModule` and the mocking controller, `HttpTestingController`,
along with the other symbols your tests require.

要开始测试那些通过 `HttpClient` 发起的请求，就要导入 `HttpClientTestingModule` 模块，并把它加到你的 `TestBed` 设置里去，代码如下：

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="imports"
  header="app/testing/http-client.spec.ts (imports)">
</code-example>

Then add the `HttpClientTestingModule` to the `TestBed` and continue with
the setup of the _service-under-test_.

然后把 `HTTPClientTestingModule` 添加到 `TestBed` 中，并继续设置*被测服务*。

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="setup"
  header="app/testing/http-client.spec.ts(setup)">
</code-example>

Now requests made in the course of your tests will hit the testing backend instead of the normal backend.

现在，在测试中发起的这些请求会发给这些测试用的后端（testing backend），而不是标准的后端。

This setup also calls `TestBed.inject()` to inject the `HttpClient` service and the mocking controller
so they can be referenced during the tests.

这种设置还会调用 `TestBed.inject()`，来获取注入的 `HttpClient` 服务和模拟对象的控制器 `HttpTestingController`，以便在测试期间引用它们。

### Expecting and answering requests

### 期待并回复请求

Now you can write a test that expects a GET Request to occur and provides a mock response.

现在，你就可以编写测试，等待 GET 请求并给出模拟响应。

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="get-test"
  header="app/testing/http-client.spec.ts(httpClient.get)">
</code-example>

The last step, verifying that no requests remain outstanding, is common enough for you to move it into an `afterEach()` step:

最后一步，验证没有发起过预期之外的请求，足够通用，因此你可以把它移到 `afterEach()` 中：

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="afterEach">
</code-example>

#### Custom request expectations

#### 自定义对请求的预期

If matching by URL isn't sufficient, it's possible to implement your own matching function.
For example, you could look for an outgoing request that has an authorization header:

如果仅根据 URL 匹配还不够，你还可以自行实现匹配函数。
比如，你可以验证外发的请求是否带有某个认证头：

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="predicate">
</code-example>

As with the previous `expectOne()`,
the test will fail if 0 or 2+ requests satisfy this predicate.

像前面的 `expectOne()` 测试一样，如果零或两个以上的请求满足了这个断言，它就会抛出异常。

#### Handling more than one request

#### 处理一个以上的请求

If you need to respond to duplicate requests in your test, use the `match()` API instead of `expectOne()`.
It takes the same arguments but returns an array of matching requests.
Once returned, these requests are removed from future matching and
you are responsible for flushing and verifying them.

如果你需要在测试中对重复的请求进行响应，可以使用 `match()` API 来代替 `expectOne()`，它的参数不变，但会返回一个与这些请求相匹配的数组。一旦返回，这些请求就会从将来要匹配的列表中移除，你要自己验证和刷新（flush）它。

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="multi-request">
</code-example>

### Testing for errors

### 测试对错误的预期

You should test the app's defenses against HTTP requests that fail.

你还要测试应用对于 HTTP 请求失败时的防护。

Call `request.flush()` with an error message, as seen in the following example.

调用 `request.flush()` 并传入一个错误信息，如下所示：

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="404">
</code-example>

Alternatively, you can call `request.error()` with an `ErrorEvent`.

另外，你还可以使用 `ErrorEvent` 来调用 `request.error()`.

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="network-error">
</code-example>
