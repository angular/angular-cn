# Communicating with backend services using HTTP

# 使用 HTTP 与后端服务进行通信

Most front-end applications need to communicate with a server over the HTTP protocol, in order to download or upload data and access other back-end services.
Angular provides a simplified client HTTP API for Angular applications, the `HttpClient` service class in `@angular/common/http`.

大多数前端应用都要通过 HTTP 协议与服务器通讯，才能下载或上传数据并访问其它后端服务。Angular 给应用提供了一个简化的 HTTP 客户端 API，也就是 `@angular/common/http` 中的 `HttpClient` 服务类。

The HTTP client service offers the following major features.

HTTP 客户端服务提供了以下主要功能。

* The ability to request [typed response objects](#typed-response).

  请求[类型化响应对象](#typed-response)的能力。

* Streamlined [error handling](#error-handling).

  简化的[错误处理](#error-handling)。

* [Testability](#testing-requests) features.

  各种特性的[可测试性](#testing-requests)。

* Request and response [interception](#intercepting-requests-and-responses).

  请求和响应的[拦截机制](#intercepting-requests-and-responses)。

##### Prerequisites

##### 先决条件

Before working with the `HTTPClientModule`, you should have a basic understanding of the following:

在使用 `HTTPClientModule` 之前，你应该对下列内容有基本的了解：

* TypeScript programming

  TypeScript 编程

* Usage of the HTTP protocol

  HTTP 协议的用法

* Angular app-design fundamentals, as described in [Angular Concepts](guide/architecture)

  Angular 的应用设计基础，就像[Angular 基本概念](guide/architecture)中描述的那样

* Observable techniques and operators. See the [Observables](guide/observables) guide.

  Observable 相关技术和操作符。参见[可观察对象](guide/observables)部分。

## Setup for server communication

## 服务器通讯的准备工作

Before you can use `HttpClient`, you need to import the Angular `HttpClientModule`.
Most apps do so in the root `AppModule`.

要想使用 `HttpClient`，就要先导入 Angular 的 `HttpClientModule`。大多数应用都会在根模块 `AppModule` 中导入它。

<code-example
  path="http/src/app/app.module.ts"
  region="sketch"
  header="app/app.module.ts (excerpt)">
</code-example>

You can then inject the `HttpClient` service as a dependency of an application class, as shown in the following `ConfigService` example.

然后，你可以把 `HttpClient` 服务注入成一个应用类的依赖项，如下面的 `ConfigService` 例子所示。

<code-example
  path="http/src/app/config/config.service.ts"
  region="proto"
  header="app/config/config.service.ts (excerpt)">
</code-example>

The `HttpClient` service makes use of [observables](guide/glossary#observable "Observable definition") for all transactions. You must import the RxJS observable and operator symbols that appear in the example snippets. These `ConfigService` imports are typical.

`HttpClient` 服务为所有工作都使用了[可观察对象](guide/glossary#observable "可观察的定义")。你必须导入示例代码片段中出现的 RxJS 可观察对象和操作符。比如 `ConfigService` 中的这些导入就很典型。

<code-example
  path="http/src/app/config/config.service.ts"
  region="rxjs-imports"
  header="app/config/config.service.ts (RxJS imports)">
</code-example>

<div class="alert is-helpful">

You can run the <live-example></live-example> that accompanies this guide.

你可以运行本指南附带的<live-example></live-example>。

The sample app does not require a data server.
It relies on the
[Angular _in-memory-web-api_](https://github.com/angular/in-memory-web-api/blob/master/README.md),
which replaces the _HttpClient_ module's `HttpBackend`.
The replacement service simulates the behavior of a REST-like backend.

该示例应用不需要数据服务器。它依赖于[Angular *in-memory-web-api*](https://github.com/angular/in-memory-web-api/blob/master/README.md)，它替代了 *HttpClient* 模块中的 `HttpBackend`。这个替代服务会模拟 REST 式的后端的行为。

Look at the `AppModule` _imports_ to see how it is configured.

看一下 `AppModule` 的这些*导入*，看看它的配置方式。

</div>

## Requesting data from a server

## 从服务器请求数据

Use the [`HTTPClient.get()`](api/common/http/HttpClient#get) method to fetch data from a server.
The asynchronous method sends an HTTP request, and returns an Observable that emits the requested data when the response is received.
The return type varies based on the `observe` and `responseType` values that you pass to the call.

使用 [`HTTPClient.get()`](api/common/http/HttpClient#get) 方法从服务器获取数据。该异步方法会发送一个 HTTP 请求，并返回一个 Observable，它会在收到响应时发出所请求到的数据。返回的类型取决于你调用时传入的 `observe` 和 `responseType` 参数。

The `get()` method takes two arguments; the endpoint URL from which to fetch, and an *options* object that you can use to configure the request.

`get()` 方法有两个参数。要获取的端点 URL，以及一个可以用来配置请求的*选项*对象。

```
options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }
```

Important options include the *observe* and *responseType* properties.

这些重要的选项包括 *observe* 和 *responseType* 属性。

* The *observe* option specifies how much of the response to return.

  *observe* 选项用于指定要返回的响应内容。

* The *responseType* option specifies the format in which to return data.

  *responseType* 选项指定返回数据的格式。

<div class="alert is-helpful">

You can use the `options` object to configure various other aspects of an outgoing request.
In [Adding headers](#adding-headers), for example, the service set the default headers using the `headers` option property.

你可以使用 `options` 对象来配置传出请求的各个方面。例如，在[Adding headers 中](#adding-headers)，该服务使用 `headers` 选项属性设置默认头。

Use the `params` property to configure a request with [HTTP URL parameters](#url-params), and the `reportProgress` option to [listen for progress events](#report-progress) when transferring large amounts of data.

使用 `params` 属性可以配置带[HTTP URL 参数](#url-params)的请求，“ `reportProgress` 选项可以在传输大量数据时[监听进度事件](#report-progress)。

</div>

Applications often request JSON data from a server.
In the `ConfigService` example, the app needs a configuration file on the server, `config.json`,
that specifies resource URLs.

应用经常会从服务器请求 JSON 数据。在 `ConfigService` 例子中，该应用需要服务器 `config.json` 上的一个配置文件来指定资源的 URL。

<code-example
  path="http/src/assets/config.json"
  header="assets/config.json">
</code-example>

To fetch this kind of data, the `get()` call needs the following options: `{observe: 'body', responseType: 'json'}`.
These are the default values for those options, so the following examples do not pass the options object.
Later sections show some of the additional option possibilities.

要获取这类数据，`get()` 调用需要以下几个选项： `{observe: 'body', responseType: 'json'}`。这些是这些选项的默认值，所以下面的例子不会传递 options 对象。后面几节展示了一些额外的选项。

{@a config-service}

The example conforms to the best practices for creating scalable solutions by defining a re-usable [injectable service](guide/glossary#service "service definition") to perform the data-handling functionality.
In addition to fetching data, the service can post-process the data, add error handling, and add retry logic.

这个例子符合通过定义一个可重用的可[注入服务](guide/glossary#service "服务定义")来执行数据处理功能来创建可伸缩解决方案的最佳实践。除了提取数据外，该服务还可以对数据进行后处理，添加错误处理，并添加重试逻辑。

The `ConfigService` fetches this file using the `HttpClient.get()` method.

`ConfigService` 使用 `HttpClient.get()` 方法获取这个文件。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig_1"
  header="app/config/config.service.ts (getConfig v.1)">
</code-example>

The `ConfigComponent` injects the `ConfigService` and calls
the `getConfig` service method.

`ConfigComponent` 注入了 `ConfigService` 并调用了 `getConfig` 服务方法。

Because the service method returns an `Observable` of configuration data,
the component *subscribes* to the method's return value.
The subscription callback performs minimal post-processing.
It copies the data fields into the component's `config` object, which is data-bound in the component template for display.

由于该服务方法返回了一个 `Observable` 配置数据，该组件会*订阅*该方法的返回值。订阅回调只会对后处理进行最少量的处理。它会把数据字段复制到组件的 `config` 对象中，该对象在组件模板中是数据绑定的，用于显示。

<code-example
  path="http/src/app/config/config.component.ts"
  region="v1"
  header="app/config/config.component.ts (showConfig v.1)">
</code-example>

{@a typed-response}

### Requesting a typed response

### 请求输入一个类型的响应

You can structure your `HttpClient` request to declare the type of the response object, to make consuming the output easier and more obvious.
Specifying the response type acts as a type assertion at compile time.

你可以构造自己的 `HttpClient` 请求来声明响应对象的类型，以便让输出更容易、更明确。所指定的响应类型会在编译时充当类型断言。

<div class="alert is-important">

Specifying the response type is a declaration to TypeScript that it should treat your response as being of the given type.
This is a build-time check and doesn't guarantee that the server will actually respond with an object of this type. It is up to the server to ensure that the type specified by the server API is returned.

指定响应类型是在向 TypeScript 声明，它应该把你的响应对象当做给定类型来使用。这是一种构建期检查，它并不能保证服务器会实际给出这种类型的响应对象。该服务器需要自己确保返回服务器 API 中指定的类型。

</div>

To specify the response object type, first define an interface with the required properties.
Use an interface rather than a class, because the response is a plain object that cannot be automatically converted to an instance of a class.

要指定响应对象类型，首先要定义一个具有必需属性的接口。这里要使用接口而不是类，因为响应对象是普通对象，无法自动转换成类的实例。

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

 When you pass an interface as a type parameter to the `HttpClient.get()` method, you can use the [RxJS `map` operator](guide/rx-library#operators) to transform the response data as needed by the UI. You can then pass the transformed data to the [async pipe](api/common/AsyncPipe).

当把接口作为类型参数传给 `HttpClient.get()` 方法时，你可以使用[RxJS `map` 操作符](guide/rx-library#operators)来根据 UI 的需求转换响应数据。然后，把转换后的数据传给[异步管道](api/common/AsyncPipe)。

</div>

The callback in the updated component method receives a typed data object, which is
easier and safer to consume:

修改后的组件方法，其回调函数中获取一个带类型的对象，它易于使用，且消费起来更安全：

<code-example
  path="http/src/app/config/config.component.ts"
  region="v2"
  header="app/config/config.component.ts (showConfig v.2)">
</code-example>

To access properties that are defined in an interface, you must explicitly convert the plain object you get from the JSON to the required response type.
For example, the following `subscribe` callback receives `data` as an Object, and then type-casts it in order to access the properties.

要访问接口中定义的属性，必须将从 JSON 获得的普通对象显式转换为所需的响应类型。例如，以下 `subscribe` 回调会将 `data` 作为对象接收，然后进行类型转换以访问属性。

<code-example>
   .subscribe(data => this.config = {
     heroesUrl: (data as any).heroesUrl,
     textfile:  (data as any).textfile,
   });
</code-example>

{@a string-union-types}

<div class="callout is-important">

<header>*observe* and *response* types</header>

<header>*observe* 和 *response* 的类型</header>

The types of the `observe` and `response` options are *string unions*, rather than plain strings.

`observe` 和 `response` 选项的类型是*字符串的联合类型*，而不是普通的字符串。

```
options: {
    ...
    observe?: 'body' | 'events' | 'response',
    ...
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    ...
  }
```

This can cause confusion. For example:

这会引起混乱。例如：

```typescript
// this works
client.get('/foo', {responseType: 'text'})

// but this does NOT work
const options = {
  responseType: 'text',
};
client.get('/foo', options)
```

In the second case, TypeScript infers the type of `options` to be `{responseType: string}`.
The type is too wide to pass to `HttpClient.get` which is expecting the type of `responseType` to be one of the _specific_ strings.
`HttpClient` is typed explicitly this way so that the compiler can report the correct return type based on the options you provided.

在第二种情况下，TypeScript 会把 `options` 的类型推断为 `{responseType: string}`。该类型的 `HttpClient.get` 太宽泛，无法传递给 `HttpClient.get`，它希望 `responseType` 的类型是*特定的*字符串之一。而 `HttpClient` 就是以这种方式显式输入的，因此编译器可以根据你提供的选项报告正确的返回类型。

Use `as const` to let TypeScript know that you really do mean to use a constant string type:

使用 `as const`，可以让 TypeScript 知道你并不是真的要使用字面字符串类型：

```typescript
const options = {
  responseType: 'text' as const,
};
client.get('/foo', options);
```

</div>

### Reading the full response

### 读取完整的响应体

In the previous example, the call to `HttpClient.get()` did not specify any options. By default, it returned the JSON data contained in the response body.

在前面的例子中，对 `HttpClient.get()` 的调用没有指定任何选项。默认情况下，它返回了响应体中包含的 JSON 数据。

You might need more information about the transaction than is contained in the response body. Sometimes servers return special headers or status codes to indicate certain conditions that are important to the application workflow.

你可能还需要关于这次对话的更多信息。比如，有时候服务器会返回一个特殊的响应头或状态码，来指出某些在应用的工作流程中很重要的条件。

Tell `HttpClient` that you want the full response with the `observe` option of the `get()` method:

可以用 `get()` 方法的 `observe` 选项来告诉 `HttpClient`，你想要完整的响应对象：

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfigResponse">
</code-example>

Now `HttpClient.get()` returns an `Observable` of type `HttpResponse` rather than just the JSON data contained in the body.

现在，`HttpClient.get()` 会返回一个 `HttpResponse` 类型的 `Observable`，而不只是 JSON 数据。

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

Apps can use the `HttpClient` to make [JSONP](https://en.wikipedia.org/wiki/JSONP) requests across domains when a server doesn't support [CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

当服务器不支持 [CORS 协议](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)时，应用程序可以使用 `HttpClient` 跨域发出 [JSONP](https://en.wikipedia.org/wiki/JSONP) 请求。

Angular JSONP requests return an `Observable`.
Follow the pattern for subscribing to observables and use the RxJS `map` operator to transform the response before using the [async pipe](api/common/AsyncPipe) to manage the results.

Angular 的 JSONP 请求会返回一个 `Observable`。
遵循订阅可观察对象变量的模式，并在使用 [async 管道](api/common/AsyncPipe)管理结果之前，使用 RxJS `map` 操作符转换响应。

In Angular, use JSONP by including `HttpClientJsonpModule` in the `NgModule` imports.
In the following example, the `searchHeroes()` method uses a JSONP request to query for heroes whose names contain the search term.

在 Angular 中，通过在 `NgModule` 的 `imports` 中包含 `HttpClientJsonpModule` 来使用 JSONP。在以下示例中，`searchHeroes()` 方法使用 JSONP 请求来查询名称包含搜索词的英雄。

```ts
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable {
  term = term.trim();

  let heroesURL = `${this.heroesURL}?${term}`;
  return this.http.jsonp(heroesUrl, 'callback').pipe(
      catchError(this.handleError('searchHeroes', [])) // then handle the error
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

{@a error-handling}

## Handling request errors

## 处理请求错误

If the request fails on the server, `HttpClient` returns an *error* object instead of a successful response.

如果请求在服务器上失败了，那么 `HttpClient` 就会返回一个*错误*对象而不是一个成功的响应对象。

The same service that performs your server transactions should also perform error inspection, interpretation, and resolution.

执行服务器请求的同一个服务中也应该执行错误检查、解释和解析。

When an error occurs, you can obtain details of what failed in order to inform your user. In some cases, you might also automatically [retry the request](#retry).

发生错误时，你可以获取失败的详细信息，以便通知你的用户。在某些情况下，你也可以自动[重试该请求](#retry)。

{@a error-details}

### Getting error details

### 获取错误详情

An app should give the user useful feedback when data access fails.
A raw error object is not particularly useful as feedback.
In addition to detecting that an error has occurred, you need to get error details and use those details to compose a user-friendly response.

当数据访问失败时，应用会给用户提供有用的反馈。原始的错误对象作为反馈并不是特别有用。除了检测到错误已经发生之外，还需要获取错误详细信息并使用这些细节来撰写用户友好的响应。

Two types of errors can occur.

可能会出现两种类型的错误。

* The server backend might reject the request, returning an HTTP response with a status code such as 404 or 500. These are error *responses*.

  服务器端可能会拒绝该请求，并返回状态码为 404 或 500 的 HTTP *响应*。这些是错误*响应*。

* Something could go wrong on the client-side such as a network error that prevents the request from completing successfully or an exception thrown in an RxJS operator. These errors produce JavaScript `ErrorEvent` objects.

  客户端也可能出现问题，例如网络错误会让请求无法成功完成，或者 RxJS 操作符也会抛出异常。这些错误会产生 JavaScript 的 `ErrorEvent` 对象。

`HttpClient` captures both kinds of errors in its `HttpErrorResponse`. You can inspect that response to identify the error's cause.

`HttpClient` 在其 `HttpErrorResponse` 中会捕获两种错误。你可以检查一下这个响应是否存在错误。

The following example defines an error handler in the previously defined [ConfigService](#config-service "ConfigService defined").

下面的例子在之前定义的 [ConfigService](#config-service "ConfigService 已定义") 中定义了一个错误处理程序。

<code-example
  path="http/src/app/config/config.service.ts"
  region="handleError"
  header="app/config/config.service.ts (handleError)">
</code-example>

The handler returns an RxJS `ErrorObservable` with a user-friendly error message.
The following code updates the `getConfig()` method, using a [pipe](guide/pipes "Pipes guide") to send all observables returned by the `HttpClient.get()` call to the error handler.

该处理程序会返回一个带有用户友好的错误信息的 RxJS `ErrorObservable`。下列代码修改了 `getConfig()` 方法，它使用一个[管道](guide/pipes "管道指南")把 `HttpClient.get()` 调用返回的所有 Observable 发送给错误处理器。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig_3"
  header="app/config/config.service.ts (getConfig v.3 with error handler)">
</code-example>

{@a retry}

### Retrying a failed request

### 重试失败的请求

Sometimes the error is transient and goes away automatically if you try again.
For example, network interruptions are common in mobile scenarios, and trying again
can produce a successful result.

有时候，错误只是临时性的，只要重试就可能会自动消失。
比如，在移动端场景中可能会遇到网络中断的情况，只要重试一下就能拿到正确的结果。

The [RxJS library](guide/rx-library) offers several *retry* operators.
For example, the `retry()` operator automatically re-subscribes to a failed `Observable` a specified number of times. *Re-subscribing* to the result of an `HttpClient` method call has the effect of reissuing the HTTP request.

[RxJS 库](guide/rx-library)提供了几个*重试*操作符。例如，`retry()` 操作符会自动重新订阅一个失败的 `Observable` 几次。*重新订阅* `HttpClient` 方法会导致它重新发出 HTTP 请求。

The following example shows how you can pipe a failed request to the `retry()` operator before passing it to the error handler.

下面的例子演示了如何在把一个失败的请求传给错误处理程序之前，先通过管道传给 `retry()` 操作符。

<code-example
  path="http/src/app/config/config.service.ts"
  region="getConfig"
  header="app/config/config.service.ts (getConfig with retry)">
</code-example>

## Sending data to a server

## 把数据发送到服务器

In addition to fetching data from a server, `HttpClient` supports other HTTP methods such as PUT, POST, and DELETE, which you can use to modify the remote data.

除了从服务器获取数据外，`HttpClient` 还支持其它一些 HTTP 方法，比如 PUT，POST 和 DELETE，你可以用它们来修改远程数据。

The sample app for this guide includes a simplified version of the "Tour of Heroes" example
that fetches heroes and enables users to add, delete, and update them.
The following sections show examples of the data-update methods from the sample's `HeroesService`.

本指南中的这个范例应用包括一个简化版本的《英雄指南》，它会获取英雄数据，并允许用户添加、删除和修改它们。
下面几节在 `HeroesService` 范例中展示了数据更新方法的一些例子。

### Making a POST request

### 发起一个 POST 请求

Apps often send data to a server with a POST request when submitting a form.
In the following example, the `HeroesService` makes an HTTP POST request when adding a hero to the database.

应用经常在提交表单时通过 POST 请求向服务器发送数据。
下面这个例子中，`HeroesService` 在向数据库添加英雄时发起了一个 HTTP POST 请求。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="addHero"
  header="app/heroes/heroes.service.ts (addHero)">
</code-example>

The `HttpClient.post()` method is similar to `get()` in that it has a type parameter, which you can use to specify that you expect the server to return data of a given type. The method takes a resource URL and two additional parameters:

`HttpClient.post()` 方法像 `get()` 一样也有类型参数，可以用它来指出你期望服务器返回特定类型的数据。该方法需要一个资源 URL 和两个额外的参数：

* *body* - The data to POST in the body of the request.

  *body* - 要在请求体中 POST 过去的数据。

* *options* - An object containing method options which, in this case, [specify required headers](#adding-headers).

  *options* - 一个包含方法选项的对象，在这里，它用来[指定必要的请求头](#adding-headers)。

The example catches errors as [described above](#error-details).

这个例子捕获了[前面所讲的](#error-details)错误。

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

You must call *subscribe()* or nothing happens. Just calling `HeroesService.deleteHero()` does not initiate the DELETE request.

你必须调用 `subscribe()`，否则什么都不会发生。仅仅调用 `HeroesService.deleteHero()` 是不会发起 DELETE 请求的。

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
HTTP 请求的执行都是*延期执行的*，让你可以用 `tap` 和 `catchError` 这样的操作符来在实际执行 HTTP 请求之前，先对这个可观察对象进行扩展。

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

An app can send PUT requests using the HTTP client service.
The following `HeroesService` example, like the POST example, replaces a resource with updated data.

应用可以使用 HttpClient 服务发送 PUT 请求。下面的 `HeroesService` 示例（就像 POST 示例一样）用一个修改过的数据替换了该资源。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="updateHero"
  header="app/heroes/heroes.service.ts (updateHero)">
</code-example>

As for any of the HTTP methods that return an observable, the caller, `HeroesComponent.update()` [must `subscribe()`](#always-subscribe "Why you must always subscribe.") to the observable returned from the `HttpClient.put()` in order to initiate the request.

对于所有返回可观察对象的 HTTP 方法，调用者（`HeroesComponent.update()`）[必须 `subscribe()`](#always-subscribe "为什么你要订阅？") 从 `HttpClient.put()` 返回的可观察对象，才会真的发起请求。

### Adding and updating headers

### 添加和更新请求头

Many servers require extra headers for save operations.
For example, a server might require an authorization token, or "Content-Type" header to explicitly declare the MIME type of the request body.

很多服务器都需要额外的头来执行保存操作。
例如，服务器可能需要一个授权令牌，或者需要 `Content-Type` 头来显式声明请求体的 MIME 类型。

##### Adding headers

##### 添加请求头

The `HeroesService` defines such headers in an `httpOptions` object that are passed
to every `HttpClient` save method.

`HeroesService` 在一个 `httpOptions` 对象中定义了这样的头，它们被传递给每个 `HttpClient` 的保存型方法。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="http-options"
  header="app/heroes/heroes.service.ts (httpOptions)">
</code-example>

##### Updating headers

##### 更新请求头

You can't directly modify the existing headers within the previous options
object because instances of the `HttpHeaders` class are immutable.
Use the `set()` method instead, to return a clone of the current instance with the new changes applied.

你不能直接修改前面的选项对象中的 `HttpHeaders` 请求头，因为 `HttpHeaders` 类的实例是不可变对象。请改用 `set()` 方法，以返回当前实例应用了新更改之后的副本。

The following example shows how, when an old token has expired, you can update the authorization header before making the next request.

下面的例子演示了当旧令牌过期时，可以在发起下一个请求之前更新授权头。

<code-example
  path="http/src/app/heroes/heroes.service.ts"
   region="update-headers" linenums="false">
</code-example>

{@a url-params}

## Configuring HTTP URL parameters

## 配置 HTTP URL 参数

Use the `HttpParams` class with the `params` request option to add URL query strings in your `HttpRequest`.

使用 `HttpParams` 类和 `params` 选项在你的 `HttpRequest` 中添加 URL 查询字符串。

The following example, the `searchHeroes()` method queries for heroes whose names contain the search term.

下面的例子中，`searchHeroes()` 方法用于查询名字中包含搜索词的英雄。

Start by importing `HttpParams` class.

首先导入 `HttpParams` 类。

<code-example hideCopy language="typescript">
import {HttpParams} from "@angular/common/http";
</code-example>

<code-example
  path="http/src/app/heroes/heroes.service.ts"
  region="searchHeroes" linenums="false">
</code-example>

If there is a search term, the code constructs an options object with an HTML URL-encoded search parameter.
If the term is "cat", for example, the GET request URL would be `api/heroes?name=cat`.

如果有搜索词，代码会用进行过 URL 编码的搜索参数来构造一个 options 对象。例如，如果搜索词是 "cat"，那么 GET 请求的 URL 就是 `api/heroes?name=cat`。

The `HttpParams` object is immutable. If you need to update the options, save the returned value of the `.set()` method.

`HttpParams` 是不可变对象。如果需要更新选项，请保留 `.set()` 方法的返回值。

You can also create HTTP parameters directly from a query string by using the `fromString` variable:

你也可以使用 `fromString` 变量从查询字符串中直接创建 HTTP 参数：

<code-example hideCopy language="typescript">
const params = new HttpParams({fromString: 'name=foo'});
</code-example>

{@a intercepting-requests-and-responses}

## Intercepting requests and responses

## 拦截请求和响应

With interception, you declare *interceptors* that inspect and transform HTTP requests from your application to a server.
The same interceptors can also inspect and transform a server's responses on their way back to the application.
Multiple interceptors form a *forward-and-backward* chain of request/response handlers.

借助拦截机制，你可以声明一些*拦截器*，它们可以检查并转换从应用中发给服务器的 HTTP 请求。这些拦截器还可以在返回应用的途中检查和转换来自服务器的响应。多个拦截器构成了请求/响应处理器的*双向*链表。

Interceptors can perform a variety of  _implicit_ tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response.

拦截器可以用一种常规的、标准的方式对每一次 HTTP 的请求/响应任务执行从认证到记日志等很多种*隐式*任务。

Without interception, developers would have to implement these tasks _explicitly_
for each `HttpClient` method call.

如果没有拦截机制，那么开发人员将不得不对每次 `HttpClient` 调用*显式*实现这些任务。

### Write an interceptor

### 编写拦截器

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

Like `intercept()`, the `handle()` method transforms an HTTP request into an `Observable` of [`HttpEvents`](#interceptor-events) which ultimately include the server's response. The `intercept()` method could inspect that observable and alter it before returning it to the caller.

像 `intercept()` 一样，`handle()` 方法也会把 HTTP 请求转换成 [`HttpEvents`](#interceptor-events) 组成的 `Observable`，它最终包含的是来自服务器的响应。
`intercept()` 函数可以检查这个可观察对象，并在把它返回给调用者之前修改它。

This _no-op_ interceptor simply calls `next.handle()` with the original request and returns the observable without doing a thing.

这个*无操作的*拦截器，会直接使用原始的请求调用 `next.handle()`，并返回它返回的可观察对象，而不做任何后续处理。

### The _next_ object

### `next` 对象

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

### Provide the interceptor

### 提供这个拦截器

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

### Interceptor order

### 拦截器的顺序

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

{@a interceptor-events}

### Handling interceptor events

### 处理拦截器事件

Most `HttpClient` methods return observables of `HttpResponse<any>`.
The `HttpResponse` class itself is actually an event, whose type is `HttpEventType.Response`.
A single HTTP request can, however, generate multiple events of other types, including upload and download progress events.
The methods `HttpInterceptor.intercept()` and `HttpHandler.handle()` return observables of `HttpEvent<any>`.

大多数 `HttpClient` 方法都会返回 `HttpResponse<any>` 型的可观察对象。`HttpResponse` 类本身就是一个事件，它的类型是 `HttpEventType.Response`。但是，单个 HTTP 请求可以生成其它类型的多个事件，包括报告上传和下载进度的事件。`HttpInterceptor.intercept()` 和 `HttpHandler.handle()` 会返回 `HttpEvent<any>` 型的可观察对象。

Many interceptors are only concerned with the outgoing request and return the event stream from `next.handle()` without modifying it.
Some interceptors, however, need to examine and modify the response from `next.handle()`; these operations can see all of these events in the stream.

很多拦截器只关心发出的请求，而对 `next.handle()` 返回的事件流不会做任何修改。
但是，有些拦截器需要检查并修改 `next.handle()` 的响应。上述做法就可以在流中看到所有这些事件。

{@a immutability}

Although interceptors are capable of modifying requests and responses,
the `HttpRequest` and `HttpResponse` instance properties are `readonly`,
rendering them largely immutable.

虽然拦截器有能力改变请求和响应，但 `HttpRequest` 和 `HttpResponse` 实例的属性却是只读（`readonly`）的，
因此让它们基本上是不可变的。

They are immutable for a good reason: an app might retry a request several times before it succeeds, which means that the interceptor chain can re-process the same request multiple times.
If an interceptor could modify the original request object, the re-tried operation would start from the modified request rather than the original. Immutability ensures that interceptors see the same request for each try.

有充足的理由把它们做成不可变对象：应用可能会重试发送很多次请求之后才能成功，这就意味着这个拦截器链表可能会多次重复处理同一个请求。
如果拦截器可以修改原始的请求对象，那么重试阶段的操作就会从修改过的请求开始，而不是原始请求。
而这种不可变性，可以确保这些拦截器在每次重试时看到的都是同样的原始请求。

<div class="alert is-helpful">

   Your interceptor should return every event without modification unless it has a compelling reason to do otherwise.

   你的拦截器应该在没有任何修改的情况下返回每一个事件，除非它有令人信服的理由去做。

</div>

TypeScript prevents you from setting `HttpRequest` read-only properties.

TypeScript 会阻止你设置 `HttpRequest` 的只读属性。

```javascript
  // Typescript disallows the following assignment because req.url is readonly
  req.url = req.url.replace('http://', 'https://');
```

If you must alter a request, clone it first and modify the clone before passing it to `next.handle()`.
You can clone and modify the request in a single step, as shown in the following example.

如果你必须修改一个请求，先把它克隆一份，修改这个克隆体后再把它传给 `next.handle()`。你可以在一步中克隆并修改此请求，例子如下。

<code-example
  path="http/src/app/http-interceptors/ensure-https-interceptor.ts"
  region="excerpt"
  header="app/http-interceptors/ensure-https-interceptor.ts (excerpt)">
</code-example>

The `clone()` method's hash argument allows you to mutate specific properties of the request while copying the others.

这个 `clone()` 方法的哈希型参数允许你在复制出克隆体的同时改变该请求的某些特定属性。

#### Modifying a request body

#### 修改请求体

The `readonly` assignment guard can't prevent deep updates and, in particular,
it can't prevent you from modifying a property of a request body object.

`readonly` 这种赋值保护，无法防范深修改（修改子对象的属性），也不能防范你修改请求体对象中的属性。

```javascript

  req.body.name = req.body.name.trim(); // bad idea!

```

If you must modify the request body, follow these steps.

如果必须修改请求体，请执行以下步骤。

1. Copy the body and make your change in the copy.

   复制请求体并在副本中进行修改。

2. Clone the request object, using its `clone()` method.

   使用 `clone()` 方法克隆这个请求对象。

3. Replace the clone's body with the modified copy.

   用修改过的副本替换被克隆的请求体。

<code-example
  path="http/src/app/http-interceptors/trim-name-interceptor.ts"
  region="excerpt"
  header="app/http-interceptors/trim-name-interceptor.ts (excerpt)">
</code-example>

#### Clearing the request body in a clone

#### 克隆时清除请求体

Sometimes you need to clear the request body rather than replace it.
To do this, set the cloned request body to `null`.

有时，你需要清除请求体而不是替换它。为此，请将克隆后的请求体设置为 `null`。

<div class="alert is-helpful">

**Tip**: If you set the cloned request body to `undefined`, Angular assumes you intend to leave the body as is.

**提示**：如果你把克隆后的请求体设为 `undefined`，那么 Angular 会认为你想让请求体保持原样。

</div>

```javascript
  newReq = req.clone({ ... }); // body not mentioned => preserve original body
  newReq = req.clone({ body: undefined }); // preserve original body
  newReq = req.clone({ body: null }); // clear the body
```

### Setting default headers

### 设置默认请求头

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

### Using interceptors for logging

### 用拦截器记日志

Because interceptors can process the request and response *together*, they can perform tasks such as timing and logging an entire HTTP operation.

因为拦截器可以*同时*处理请求和响应，所以它们也可以对整个 HTTP 操作执行计时和记录日志等任务。

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

{@a caching}

### Using interceptors for caching

### 用拦截器实现缓存

Interceptors can handle requests by themselves, without forwarding to `next.handle()`.

拦截器还可以自行处理这些请求，而不用转发给 `next.handle()`。

For example, you might decide to cache certain requests and responses to improve performance.
You can delegate caching to an interceptor without disturbing your existing data services.

比如，你可能会想缓存某些请求和响应，以便提升性能。
你可以把这种缓存操作委托给某个拦截器，而不破坏你现有的各个数据服务。

The `CachingInterceptor` in the following example demonstrates this approach.

下例中的 `CachingInterceptor` 演示了这种方法。

<code-example
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="v1"
  header="app/http-interceptors/caching-interceptor.ts)">
</code-example>

* The `isCacheable()` function determines if the request is cacheable.
  In this sample, only GET requests to the npm package search api are cacheable.

  `isCacheable()` 函数用于决定该请求是否允许缓存。
  在这个例子中，只有发到 npm 包搜索 API 的 GET 请求才是可以缓存的。

* If the request is not cacheable, the interceptor simply forwards the request
  to the next handler in the chain.

  如果该请求是不可缓存的，该拦截器只会把该请求转发给链表中的下一个处理器。

* If a cacheable request is found in the cache, the interceptor returns an `of()` *observable* with
  the cached response, by-passing the `next` handler (and all other interceptors downstream).

  如果可缓存的请求在缓存中找到了，该拦截器就会通过 `of()` 函数返回一个已缓存的响应体的*可观察对象*，然后绕过 `next` 处理器（以及所有其它下游拦截器）。

* If a cacheable request is not in cache, the code calls `sendRequest()`.
  This function creates a [request clone](#immutability) without headers, because the npm API forbids them.
  The function then forwards the clone of the request to `next.handle()` which ultimately calls the server and returns the server's response.

  如果可缓存的请求不在缓存中，代码会调用 `sendRequest()`。这个函数会创建一个没有请求头的[请求克隆体](#immutability)，这是因为 npm API 禁止它们。然后，该函数把请求的克隆体转发给 `next.handle()`，它会最终调用服务器并返回来自服务器的响应对象。

{@a send-request}
<code-example
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="send-request">
</code-example>

{@a send-request}

Note how `sendRequest()` intercepts the response on its way back to the application.
This method pipes the response through the `tap()` operator, whose callback adds the response to the cache.

注意 `sendRequest()` 是如何在返回应用程序的过程中拦截响应的。该方法通过 `tap()` 操作符来管理响应对象，该操作符的回调函数会把该响应对象添加到缓存中。

The original response continues untouched back up through the chain of interceptors
to the application caller.

然后，原始的响应会通过这些拦截器链，原封不动的回到服务器的调用者那里。

Data services, such as `PackageSearchService`, are unaware that
some of their `HttpClient` requests actually return cached responses.

数据服务，比如 `PackageSearchService`，并不知道它们收到的某些 `HttpClient` 请求实际上是从缓存的请求中返回来的。

{@a cache-refresh}

### Using interceptors to request multiple values

### 用拦截器来请求多个值

The `HttpClient.get()` method normally returns an observable that emits a single value, either the data or an error.
An interceptor can change this to an observable that emits [multiple values](guide/observables).

`HttpClient.get()` 方法通常会返回一个可观察对象，它会发出一个值（数据或错误）。拦截器可以把它改成一个可以发出[多个值](guide/observables)的可观察对象。

The following revised version of the `CachingInterceptor` optionally returns an observable that
immediately emits the cached response, sends the request on to the npm web API,
and emits again later with the updated search results.

修改后的 `CachingInterceptor` 版本可以返回一个立即发出所缓存响应的可观察对象，然后把请求发送到 NPM 的 Web API，然后把修改过的搜索结果重新发出一次。

<code-example
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="intercept-refresh">
</code-example>

<div class="alert is-helpful">

The *cache-then-refresh* option is triggered by the presence of a custom `x-refresh` header.

*cache-then-refresh* 选项是由一个自定义的 `x-refresh` 请求头触发的。

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
The `results$` observable makes the request when subscribed.

修改后的 `CachingInterceptor` 会发起一个服务器请求，而不管有没有缓存的值。
就像 [前面](#send-request) 的 `sendRequest()` 方法一样进行订阅。
在订阅 `results$` 可观察对象时，就会发起这个请求。

* If there's no cached value, the interceptor returns `results$`.

  如果没有缓存值，拦截器直接返回 `results$`。

* If there is a cached value, the code _pipes_ the cached response onto
  `results$`, producing a recomposed observable that emits twice,
  the cached response first (and immediately), followed later
  by the response from the server.
  Subscribers see a sequence of two responses.

  如果有缓存的值，这些代码就会把缓存的响应加入到 `result$` 的*管道*中，使用重组后的可观察对象进行处理，并发出两次。
  先立即发出一次缓存的响应体，然后发出来自服务器的响应。
  订阅者将会看到一个包含这两个响应的序列。

{@a report-progress}

## Tracking and showing request progress

## 跟踪和显示请求进度

Sometimes applications transfer large amounts of data and those transfers can take a long time.
File uploads are a typical example.
You can give the users a better experience by providing feedback on the progress of such transfers.

应用程序有时会传输大量数据，而这些传输可能要花很长时间。文件上传就是典型的例子。你可以通过提供有关此类传输的进度反馈，为用户提供更好的体验。

To make a request with progress events enabled, you can create an instance of `HttpRequest`
with the `reportProgress` option set true to enable tracking of progress events.

要想发出一个带有进度事件的请求，你可以创建一个 `HttpRequest` 实例，并把 `reportProgress` 选项设置为 true 来启用对进度事件的跟踪。

<code-example
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-request"
  header="app/uploader/uploader.service.ts (upload request)">
</code-example>

<div class="alert is-important">

**Tip**: Every progress event triggers change detection, so only turn them on if you need to report progress in the UI.

**提示**：每个进度事件都会触发变更检测，所以只有当需要在 UI 上报告进度时，你才应该开启它们。

When using [`HttpClient.request()`](api/common/http/HttpClient#request) with an HTTP method, configure the method with
[`observe: 'events'`](api/common/http/HttpClient#request) to see all events, including the progress of transfers.

当 [`HttpClient.request()`](api/common/http/HttpClient#request) 和 HTTP 方法一起使用时，可以用 [`observe: 'events'`](api/common/http/HttpClient#request) 来查看所有事件，包括传输的进度。

</div>

Next, pass this request object to the `HttpClient.request()` method, which
returns an `Observable` of `HttpEvents` (the same events processed by [interceptors](#interceptor-events)).

接下来，把这个请求对象传递给 `HttpClient.request()` 方法，该方法返回一个 `HttpEvents` 的 `Observable`（与 [拦截器](#interceptor-events) 部分处理过的事件相同）。

<code-example
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-body"
  header="app/uploader/uploader.service.ts (upload body)">
</code-example>

The `getEventMessage` method interprets each type of `HttpEvent` in the event stream.

`getEventMessage` 方法解释了事件流中每种类型的 `HttpEvent`。

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

本指南中的示例应用中没有用来接受上传文件的服务器。`app/http-interceptors/upload-interceptor.ts` 的 `UploadInterceptor` 通过返回一个模拟这些事件的可观察对象来拦截和短路上传请求。

</div>

## Optimizing server interaction with debouncing

## 通过防抖来优化与服务器的交互

If you need to make an HTTP request in response to user input, it's not efficient to send a request for every keystroke.
It's better to wait until the user stops typing and then send a request.
This technique is known as debouncing.

如果你需要发一个 HTTP 请求来响应用户的输入，那么每次击键就发送一个请求的效率显然不高。最好等用户停止输入后再发送请求。这种技术叫做防抖。

Consider the following template, which lets a user enter a search term to find an npm package by name.
When the user enters a name in a search-box, the `PackageSearchComponent` sends
a search request for a package with that name to the npm web API.

考虑下面这个模板，它让用户输入一个搜索词来按名字查找 npm 包。
当用户在搜索框中输入名字时，`PackageSearchComponent` 就会把这个根据名字搜索包的请求发给 npm web API。

<code-example
  path="http/src/app/package-search/package-search.component.html"
  region="search"
  header="app/package-search/package-search.component.html (search)">
</code-example>

Here, the `keyup` event binding sends every keystroke to the component's `search()` method.
The following snippet implements debouncing for this input using RxJS operators.

这里，`keyup` 事件绑定会把每次击键都发送给组件的 `search()` 方法。下面的代码片段使用 RxJS 的操作符为这个输入实现了防抖。

<code-example
  path="http/src/app/package-search/package-search.component.ts"
  region="debounce"
  header="app/package-search/package-search.component.ts (excerpt)">
</code-example>

The `searchText$` is the sequence of search-box values coming from the user.
It's defined as an RxJS `Subject`, which means it is a multicasting `Observable`
that can also emit values for itself by calling `next(value)`,
as happens in the `search()` method.

`searchText$` 是来自用户的搜索框值的序列。它被定义为 RxJS `Subject` 类型，这意味着它是一个多播 `Observable`，它还可以通过调用 `next(value)` 来自行发出值，就像在 `search()` 方法中一样。

Rather than forward every `searchText` value directly to the injected `PackageSearchService`,
the code in `ngOnInit()` pipes search values through three operators, so that a search value reaches the service only if it's a new value and the user has stopped typing.

除了把每个 `searchText` 的值都直接转发给 `PackageSearchService` 之外，`ngOnInit()` 中的代码还通过下列三个操作符对这些搜索值进行*管道*处理，以便只有当它是一个新值并且用户已经停止输入时，要搜索的值才会抵达该服务。

* `debounceTime(500)` - Wait for the user to stop typing (1/2 second in this case).

  `debounceTime(500)` - 等待用户停止输入（本例中为 1/2 秒）。

* `distinctUntilChanged()` - Wait until the search text changes.

  `distinctUntilChanged()` - 等待搜索文本发生变化。

* `switchMap()` - Send the search request to the service.

  `switchMap()` - 将搜索请求发送到服务。

The code sets `packages$` to this re-composed `Observable` of search results.
The template subscribes to `packages$` with the [AsyncPipe](api/common/AsyncPipe)
and displays search results as they arrive.

这些代码把 `packages$` 设置成了使用搜索结果组合出的 `Observable` 对象。
模板中使用 [AsyncPipe](api/common/AsyncPipe) 订阅了 `packages$`，一旦搜索结果的值发回来了，就显示这些搜索结果。

<div class="alert is-helpful">

See [Using interceptors to request multiple values](#cache-refresh) for more about the `withRefresh` option.

有关 `withRefresh` 选项的更多信息，请参阅[使用拦截器来请求多个值](#cache-refresh)。

</div>

### Using the *switchMap()* operator

### 使用 `switchMap()` 操作符

The `switchMap()` operator takes a function argument that returns an `Observable`.
In the example, `PackageSearchService.search` returns an `Observable`, as other data service methods do.
If a previous search request is still in-flight (as when the network connection is poor),
the operator cancels that request and sends a new one.

`switchMap()` 操作符接受一个返回 `Observable` 的函数型参数。在这个例子中，`PackageSearchService.search` 像其它数据服务方法那样返回一个 `Observable`。如果先前的搜索请求仍在*进行中* （如网络连接不良），它将取消该请求并发送新的请求。

Note that `switchMap()` returns service responses in their original request order, even if the
server returns them out of order.

请注意，`switchMap()` 会按照原始的请求顺序返回这些服务的响应，而不用关心服务器实际上是以乱序返回的它们。

<div class="alert is-helpful">

If you think you'll reuse this debouncing logic,
consider moving it to a utility function or into the `PackageSearchService` itself.

如果你觉得将来会复用这些防抖逻辑，
可以把它移到单独的工具函数中，或者移到 `PackageSearchService` 中。

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
Failing to do so renders Angular's default protection ineffective.

*`HttpClient` 支持的只是 XSRF 防护方案的客户端这一半。* 你的后端服务必须配置为给页面设置 cookie，并且要验证请求头，以确保全都是合法的请求。如果不这么做，就会导致 Angular 的默认防护措施失效。

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

{@a testing-requests}
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

At the end, tests can verify that the app has made no unexpected requests.

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

### Setup for testing

### 搭建测试环境

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

Now requests made in the course of your tests hit the testing backend instead of the normal backend.

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
the test fails if 0 or 2+ requests satisfy this predicate.

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
