# HttpClient

# HttpClient 库

Most front-end applications communicate with backend services over the HTTP protocol. Modern browsers support two different APIs for making HTTP requests: the `XMLHttpRequest` interface and the `fetch()` API.

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯。现代浏览器支持使用两种不同的 API 发起 HTTP 请求：`XMLHttpRequest` 接口和 `fetch()` API。

With `HttpClient`, `@angular/common/http` provides a simplified API for HTTP functionality for use with Angular applications, building on top of the `XMLHttpRequest` interface exposed by browsers.
Additional benefits of `HttpClient` include testability support, strong typing of request and response objects, request and response interceptor support, and better error handling via apis based on Observables.

`@angular/common/http`中的`HttpClient`类，Angular 为应用程序提供了一个简化的 API 来实现 HTTP 功能。它基于浏览器提供的`XMLHttpRequest`接口。
`HttpClient`带来的其它优点包括：可测试性、强类型的请求和响应对象、发起请求与接收响应时的拦截器支持，以及更好的、基于可观察（Observable）对象的错误处理机制。

## Setup: installing the module

## 初始设置：安装本模块

Before you can use the `HttpClient`, you need to install the `HttpClientModule` which provides it. This can be done in your application module, and is only necessary once.

在使用`HttpClient`之前，要先安装`HttpClientModule`以提供它。这可以在应用模块中做，而且只需要做一次。

```javascript
// app.module.ts:

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
  ],
})
export class MyAppModule {}
```

Once you import `HttpClientModule` into your app module, you can inject `HttpClient`
into your components and services.

一旦把`HttpClientModule`引入了应用模块中，我们就可以把`HttpClient`注入到组件和服务中去了。

## Making a request for JSON data

## 发起一个请求来获取 JSON 数据

The most common type of request applications make to a backend is to request JSON data. For example, suppose you have an API endpoint that lists items, `/api/items`, which returns a JSON object of the form:

在应用发给服务器的请求中，最常见的就是获取一个JSON数据。比如，假设我们有一个用来获取条目列表的 API 端点 `/api/items`，它会返回一个如下格式的 JSON 对象：

```json
{
  "results": [
    "Item 1",
    "Item 2",
  ]
}
```

The `get()` method on `HttpClient` makes accessing this data straightforward.

`HttpClient`的`get()`方法可以让访问此数据的代码非常直白：

```javascript
@Component(...)
export class MyComponent implements OnInit {

  results: string[];

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('/api/items').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
    });
  }
}
```


### Typechecking the response

### 响应体的类型检查

In the above example, the `data['results']` field access stands out because you use bracket notation to access the results field. If you tried to write `data.results`, TypeScript would correctly complain that the `Object` coming back from HTTP does not have a `results` property. That's because while `HttpClient` parsed the JSON response into an `Object`, it doesn't know what shape that object is.

在上面的例子中，访问`data['results']`是用方括号语法来取得results字段的。如果写成`data.results`，TypeScript 就会抱怨说来自HTTP的`Object`没有一个名叫`results`的属性。
那是因为`HttpClient`把 JSON 格式的响应体解析成了一个`Object`，它并不知道这个对象的形态应该是什么。

You can, however, tell `HttpClient` what type the response will be, which is recommended.
To do so, first you define an interface with the correct shape:

然而，我们其实可以告诉`HttpClient`这个响应体应该是什么类型的，而且这是推荐的做法。
要这样做，首先我们要定义一个接口来描述这个类型的正确形态：

```javascript
interface ItemsResponse {
  results: string[];
}
```

Then, when you make the `HttpClient.get` call, pass a type parameter:

然后，当我们发起 `HttpClient.get` 调用时，传入一个类型参数：

```javascript
http.get<ItemsResponse>('/api/items').subscribe(data => {
  // data is now an instance of type ItemsResponse, so you can do this:
  this.results = data.results;
});
```

### Reading the full response

### 读取完整的响应体

The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate certain conditions, and inspecting those can be necessary. To do this, you can tell `HttpClient` you want the full response instead of just the body with the `observe` option:

响应体可能并不包含我们需要的全部信息。有时候服务器会返回一个特殊的响应头或状态码，以标记出特定的条件，因此读取它们可能是必要的。要这样做，我们就要通过`observe`选项来告诉`HttpClient`，你想要完整的响应信息，而不是只有响应体：

```javascript
http
  .get<MyJsonData>('/data.json', {observe: 'response'})
  .subscribe(resp => {
    // Here, resp is of type HttpResponse<MyJsonData>.
    // You can inspect its headers:
    console.log(resp.headers.get('X-Custom-Header'));
    // And access the body directly, which is typed as MyJsonData as requested.
    console.log(resp.body.someField);
  });
```

As you can see, the resulting object has a `body` property of the correct type.

如你所见，这个结果对象具有一个带正确类型的`body`属性。

### Error handling

### 错误处理

What happens if the request fails on the server, or if a poor network connection prevents it from even reaching the server? `HttpClient` will return an _error_ instead of a successful response.

如果这个请求导致了服务器错误怎么办？甚至，在烂网络下请求都没到服务器该怎么办？`HttpClient`就会返回一个错误（error）而不再是成功的响应。

To handle it, add an error handler to your `.subscribe()` call:

要处理它，可以在`.subscribe()`调用中添加一个错误处理器：

```javascript
http
  .get<ItemsResponse>('/api/items')
  .subscribe(
    // Successful responses call the first callback.
    data => {...},
    // Errors will call this callback instead:
    err => {
      console.log('Something went wrong!');
    }
  });
```

#### Getting error details

#### 获取错误详情

Detecting that an error occurred is one thing, but it's more useful to know what error actually occurred. The `err` parameter to the callback above is of type `HttpErrorResponse`, and contains useful information on what went wrong.

检测错误的发生是第一步，不过如果知道具体发生了什么错误才会更有用。上面例子中传给回调函数的`err`参数的类型是`HttpErrorResponse`，它包含了这个错误中一些很有用的信息。

There are two types of errors that can occur. If the backend returns an unsuccessful response code (404, 500, etc.), it gets returned as an error. Also, if something goes wrong client-side, such as an exception gets thrown in an RxJS operator, or if a network error prevents the request from completing successfully, an actual `Error` will be thrown.

可能发生的错误分为两种。如果后端返回了一个失败的返回码（如404、500等），它会返回一个错误。同样的，如果在客户端这边出了错误（比如在RxJS操作符中抛出的异常或某些阻碍完成这个请求的网络错误），就会抛出一个`Error`类型的异常。

In both cases, you can look at the `HttpErrorResponse` to figure out what happened.

这两种情况下，我们可以查看`HttpErrorResponse`来判断到底发生了什么。

```javascript
http
  .get<ItemsResponse>('/api/items')
  .subscribe(
  	data => {...},
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }
  });
```

#### `.retry()`

#### `.retry()` 操作符

One way to deal with errors is to simply retry the request. This strategy can be useful when the errors are transient and unlikely to repeat.

解决问题的方式之一，就是简单的重试这次请求。这种策略对于那些临时性的而且不大可能重复发生的错误会很有用。

RxJS has a useful operator called `.retry()`, which automatically resubscribes to an Observable, thus reissuing the request, upon encountering an error.

RxJS有一个名叫`.retry()`的很有用的操作符，它会在遇到错误时自动重新订阅这个可观察对象，也就会导致再次发送这个请求。

First, import it:

首先，导入它：

```js
import 'rxjs/add/operator/retry';
```

Then, you can use it with HTTP Observables like this:

然后，你可以把它用在 HTTP 的可观察对象上，比如这样：

```javascript
http
  .get<ItemsResponse>('/api/items')
  // Retry this request up to 3 times.
  .retry(3)
  // Any errors after the 3rd retry will fall through to the app.
  .subscribe(...);
```

### Requesting non-JSON data

### 请求非 JSON 数据

Not all APIs return JSON data. Suppose you want to read a text file on the server. You have to tell `HttpClient` that you expect a textual response:

并非所有的 API 都会返回 JSON 数据。假如我们要从服务器上读取一个文本文件，那就要告诉 `HttpClient` 我们期望获得的是文本格式的响应：

```javascript
http
  .get('/textfile.txt', {responseType: 'text'})
  // The Observable returned by get() is of type Observable<string>
  // because a text response was specified. There's no need to pass
  // a <string> type parameter to get().
  .subscribe(data => console.log(data));
```

## Sending data to the server

## 把数据发送到服务器

In addition to fetching data from the server, `HttpClient` supports mutating requests, that is, sending data to the server in various forms.

除了从服务器获取数据之外，`HttpClient` 还支持 "修改" 型请求，也就是说，使用各种格式把数据发送给服务器。

### Making a POST request

### 发起一个 POST 请求

One common operation is to POST data to a server; for example when submitting a form. The code for
sending a POST request is very similar to the code for GET:

常用的操作之一就是把数据 POST 到服务器，比如提交表单。下面这段发送 POST 请求的代码和发送 GET 请求的非常像：

```javascript
const body = {name: 'Brad'};

http
  .post('/api/developers/add', body)
  // See below - subscribe() is still necessary when using post().
  .subscribe(...);
```
<div class="alert is-important">

*Note the `subscribe()` method.* All Observables returned from `HttpClient` are _cold_, which is to say that they are _blueprints_ for making requests. Nothing will happen until you call `subscribe()`, and every such call will make a separate request. For example, this code sends a POST request with the same data twice:

*注意这个`subscribe()`方法*。 所有从`HttpClient`返回的可观察对象都是*冷的（cold）*，也就是说，它们只是发起请求的*蓝图*而已。在我们调用`subscribe()`之前，什么都不会发生，而当我们每次调用`subscribe()`时，就会独立发起一次请求。
比如，下列代码会使用同样的数据发送两次同样的 POST 请求：

```javascript
const req = http.post('/api/items/add', body);
// 0 requests made - .subscribe() not called.
req.subscribe();
// 1 request made.
req.subscribe();
// 2 requests made.
```
</div>

### Configuring other parts of the request

### 配置请求中的其它部分

Besides the URL and a possible request body, there are other aspects of an outgoing request which you may wish to configure. All of these are available via an options object, which you pass to the request.

除了 URL 和可能的请求体之外，要发送的请求中你可能还希望配置一些别的东西。所有这些都可以通过给这次请求传一个额外的`options`（选项）对象来解决。

#### Headers

#### 头

One common task is adding an `Authorization` header to outgoing requests. Here's how you do that:

最常见的就是往发出的请求中添加一个`Authorization`头，代码如下：

```javascript
http
  .post('/api/items/add', body, {
    headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
  })
  .subscribe();
```

The `HttpHeaders` class is immutable, so every `set()` returns a new instance and applies the changes.

`HttpHeaders`类是不可变对象（immutable），所以每个`set()`都会返回一个新实例，并且应用上这些修改。

#### URL Parameters

#### URL 参数

Adding URL parameters works in the same way. To send a request with the `id` parameter set to `3`, you would do:

添加 URL 参数的方法也一样。比如要发送一个请求，并把`id`参数设置为`3`，就要这样写：

```javascript
http
  .post('/api/items/add', body, {
    params: new HttpParams().set('id', '3'),
  })
  .subscribe();
```

In this way, you send the POST request to the URL `/api/items/add?id=3`.

这种情况下，我们会往 URL `/api/items/add?id=3` 上发送一个 POST 请求。

## Advanced usage

## 高级用法

The above sections detail how to use the basic HTTP functionality in `@angular/common/http`, but sometimes you need to do more than just make requests and get data back.

上一节详细讲解了如何在`@angular/common/http`中使用基本的 HTTP 功能，但是有时候除了发起请求和获取数据之外，我们还要做更多。

### Intercepting all requests or responses

### 拦截所有的请求和响应。

A major feature of `@angular/common/http` is _interception_, the ability to declare interceptors which sit in between your application and the backend. When your application makes a request, interceptors transform it
before sending it to the server, and the interceptors can transform the response on its way back before your application sees it. This is useful for everything from authentication to logging.

`@angular/common/http`的主要特性之一是*拦截器*，它能声明一些拦截器，拦在应用和后端之间。当应用程序发起一个请求时，拦截器可以在请求被发往服务器之前先转换这个请求。并且在应用看到服务器发回来的响应之前，转换这个响应。这对于处理包括认证和记录日志在内的一系列工作都非常有用。

#### Writing an interceptor

#### 写一个拦截器

To implement an interceptor, you declare a class that implements `HttpInterceptor`, which
has a single `intercept()` method. Here is a simple interceptor which does nothing but forward the request through without altering it:

要实现一个拦截器，就要声明一个实现了`HttpInterceptor`接口的类，它只有一个`intercept()`方法。下面是一个最简单的拦截器，它什么也不做，只是简单的转发请求而不做任何修改：

```javascript
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
```

`intercept` is a method which transforms a request into an Observable that eventually returns the response. In this sense, each interceptor is entirely responsible for handling the request by itself.

`intercept`是一个方法，它把一个请求对象转换成一个返回这个响应的可观察对象（Observable）。从这个意义上说，每个拦截器都要完全自己处理这个请求。

Most of the time, though, interceptors will make some minor change to the request and forward it to the rest of the chain. That's where the `next` parameter comes in. `next` is an `HttpHandler`, an interface that, similar to `intercept`, transforms a request into an Observable for the response. In an interceptor, `next` always represents the next interceptor in the chain, if any, or the final backend if there are no more interceptors. So most interceptors will end by calling `next` on the request they transformed.

当然，大多数时候，拦截器会对请求做一些小的修改，然后才把它转给拦截器链中的其它部分，也就是所传进来的`next`参数。`next`是一个`HttpHandler`，是一个类似于`intercept`的接口，它会把一个请求对象转换成一个可观察的响应对象。在拦截器中，`next`总是代表位于拦截器链中的下一个拦截器（如果有的话），如果没有更多拦截器了，它就会是最终的后端。所以，大多数拦截器的最后一句都会以它们转换后请求对象为参数调用`next.handle`函数。

Our do-nothing handler simply calls `next.handle` on the original request, forwarding it without mutating it at all.

我们这个什么也不做的处理器只是简单地在原始请求上调用`next.handle`，什么也不改动就转发出去。

This pattern is similar to those in middleware frameworks such as Express.js.

这种工作模式类似于一些框架（如Express.js）中的中间件。

##### Providing your interceptor

##### 提供你自己的拦截器

Simply declaring the `NoopInterceptor` above doesn't cause your app to use it. You need to wire it up in your app module by providing it as an interceptor, as follows:

像上面这样简单地声明`NoopInterceptor`并不会让我们的应用实际使用它。还要通过把它作为拦截器提供给我们的应用模块才会生效，代码如下：

```javascript
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true,
  }],
})
export class AppModule {}
```

Note the `multi: true` option. This is required and tells Angular that `HTTP_INTERCEPTORS` is an array of values, rather than a single value.

注意`multi: true`选项。这是必须的，因为它会告诉 Angular 这个 `HTTP_INTERCEPTORS` 表示的是一个数组，而不是单个的值。

##### Events

##### 事件

You may have also noticed that the Observable returned by `intercept` and `HttpHandler.handle` is not an `Observable<HttpResponse<any>>` but an `Observable<HttpEvent<any>>`. That's because interceptors work at a lower level than the `HttpClient` interface. A single request can generate multiple events, including upload and download progress events. The `HttpResponse` class is actually an event itself, with a `type` of `HttpEventType.HttpResponseEvent`.

注意，`intercept`和`HttpHandler.handle`返回的可观察对象并不是`Observable<HttpResponse<any>>`，而是`Observable<HttpEvent<any>>`。
这是因为拦截器所工作的层级要低于 `HttpClient` 接口。单个请求会生成多个事件，比如表示上传和下载过程的事件。`HttpResponse`类实际上本身也是一个事件，只是它的`type`是`HttpEventType.HttpResponseEvent`。

An interceptor must pass through all events that it does not understand or intend to modify. It must not filter out events it didn't expect to process. Many interceptors are only concerned with the outgoing request, though, and will simply return the event stream from `next` without modifying it.

拦截器必须透传所有它不理解或不打算修改的事件。它不能过滤掉自己不准备处理的事件。很多拦截器只关心要发出的请求，而只简单的返回`next`所返回的事件流，而不修改它。


##### Ordering

##### 顺序

When you provide multiple interceptors in an application, Angular applies them in the order that you
provided them.

当我们在一个应用中提供了多个拦截器时，Angular 会按照你提供时的顺序应用它们（译注：即模块的`providers`数组中列出的顺序）。

##### Immutability

##### 不可变性

Interceptors exist to examine and mutate outgoing requests and incoming responses. However, it may be surprising to learn that the `HttpRequest` and `HttpResponse` classes are largely immutable.

拦截器要检查和修改准备发出的请求和接收进来的响应。但是，你可能会惊奇的发现`HttpRequest`和`HttpResponse`类在很大程度上却是不可变的。

This is for a reason: because the app may retry requests, the interceptor chain may process an individual request multiple times. If requests were mutable, a retried request would be different than the original request. Immutability ensures the interceptors see the same request for each try.

这是有原因的：因为应用可能会重发请求，而拦截器链可能会多次处理同一个请求。如果请求是可变的，每次重试时的请求都可能和原始的请求不一样。而不可变对象可以确保拦截器每次重试时处理的都是同一个请求。

There is one case where type safety cannot protect you when writing interceptors&mdash;the request body. It is invalid to mutate a request body within an interceptor, but this is not checked by the type system.

在一种情况下类型安全体系无法在写拦截器时提供保护 —— 请求体（body）。在拦截器中修改请求体本应是无效的，但类型检查系统无法发现它。

If you have a need to mutate the request body, you need to copy the request body, mutate the copy, and then use `clone()` to copy the request and set the new body.

如果确实需要修改请求体，我们就得自己复制它，修改这个复本，然后使用`clone()`来复制这个请求，并使用这个新的请求体。

Since requests are immutable, they cannot be modified directly. To mutate them, use `clone()`:

由于请求都是不可变的，所以不能直接修改它们。要想修改，就使用`clone()`函数：

```javascript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // This is a duplicate. It is exactly the same as the original.
  const dupReq = req.clone();

  // Change the URL and replace 'http://' with 'https://'
  const secureReq = req.clone({url: req.url.replace('http://', 'https://')});
}
```

As you can see, the hash accepted by `clone()` allows you to mutate specific properties of the request while copying the others.

如你所见，传给`clone()`函数的这个哈希对象可以让我们在复制时修改请求中的特定属性。

#### Setting new headers

#### 设置新的头

A common use of interceptors is to set default headers on outgoing responses. For example, assuming you have an injectable `AuthService` which can provide an authentication token, here is how you would write an interceptor which adds it to all outgoing requests:

拦截器的常见用途之一是为所发出的请求设置默认的请求头。比如，假设我们有一个可注入的`AuthService`，它可以提供一个认证令牌，而我们希望写一个拦截器，它负责把这个令牌添加到所有要发出的请求中：

```javascript
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = this.auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
```

The practice of cloning a request to set new headers is so common that there's actually a shortcut for it:

这种克隆一个请求并设置一组新的请求头的操作非常常见，因此有了一种快捷写法：

```javascript
const authReq = req.clone({setHeaders: {Authorization: authHeader}});
```

An interceptor that alters headers can be used for a number of different operations, including:

这种可以修改头的拦截器可以用于很多不同的操作，比如：

* Authentication/authorization

    认证 / 授权

* Caching behavior; for example, If-Modified-Since

    控制缓存行为。比如`If-Modified-Since`
    
* XSRF protection

    XSRF 防护

#### Logging

#### 记日志

Because interceptors can process the request and response _together_, they can do things like log or time requests. Consider this interceptor which uses `console.log` to show how long each request takes:

由于拦截器可以同时处理请求和响应，因此可以用来记日志或请求计时等。考虑下面这个拦截器，它使用`console.log`来显示每个请求花了多久：

```javascript
import 'rxjs/add/operator/do';

export class TimingInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	const started = Date.now();
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      });
  }
}
```
Notice the RxJS `do()` operator&mdash;it adds a side effect to an Observable without affecting the values on the stream. Here, it detects the `HttpResponse` event and logs the time the request took.

注意 RxJS 的 `do()`操作符 —— 它为可观察对象添加一个副作用，而不会影响到流中的值。这里，它会检测`HttpResponse`的事件，并且记录这个请求花费的时间。

#### Caching

#### 缓存

You can also use interceptors to implement caching. For this example, assume that you've written an HTTP cache with a simple interface:

我们也可以使用拦截器来实现缓存。比如，假设我们已经写了一个 HTTP 缓存，它具有如下的简单接口：

```javascript
abstract class HttpCache {
  /**
   * Returns a cached response, if any, or null if not present.
   */
  abstract get(req: HttpRequest<any>): HttpResponse<any>|null;

  /**
   * Adds or updates the response in the cache.
   */
  abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}
```

An interceptor can apply this cache to outgoing requests.

拦截器可以把这个缓存应用到所发出的请求上。

```javascript
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: HttpCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	// Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // First, check the cache to see if this request exists.
    const cachedResponse = this.cache.get(req);
    if (cachedResponse) {
      // A cached response exists. Serve it instead of forwarding
      // the request to the next handler.
      return Observable.of(cachedResponse);
    }

    // No cached response exists. Go to the network, and cache
    // the response when it arrives.
    return next.handle(req).do(event => {
      // Remember, there may be other events besides just the response.
      if (event instanceof HttpResponse) {
      	// Update the cache.
      	this.cache.put(req, event);
      }
    });
  }
}
```

Obviously this example glosses over request matching, cache invalidation, etc., but it's easy to see that interceptors have a lot of power beyond just transforming requests. If desired, they can be used to completely take over the request flow.

显然，这个例子忽略了请求匹配、缓存失效等问题，但是很容易看出除了转换请求外，拦截器还有很强力的功能。如果需要，它们可以完全接管请求流程。

To really demonstrate their flexibility, you can change the above example to return _two_ response events if the request exists in cache&mdash;the cached response first, and an updated network response later.

为了实际演示它们的灵活性，我们可以把上面的例子改为：如果请求已经存在于缓存中了，就返回*两个*响应事件，第一个是缓存的响应，第二个是从网络上更新过来的响应。

```javascript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Still skip non-GET requests.
  if (req.method !== 'GET') {
    return next.handle(req);
  }

  // This will be an Observable of the cached value if there is one,
  // or an empty Observable otherwise. It starts out empty.
  let maybeCachedResponse: Observable<HttpEvent<any>> = Observable.empty();

  // Check the cache.
  const cachedResponse = this.cache.get(req);
  if (cachedResponse) {
    maybeCachedResponse = Observable.of(cachedResponse);
  }

  // Create an Observable (but don't subscribe) that represents making
  // the network request and caching the value.
  const networkResponse = next.handle(req).do(event => {
    // Just like before, check for the HttpResponse event and cache it.
    if (event instanceof HttpResponse) {
      this.cache.put(req, event);
    }
  });

  // Now, combine the two and send the cached response first (if there is
  // one), and the network response second.
  return Observable.concat(maybeCachedResponse, networkResponse);
}
```

Now anyone doing `http.get(url)` will receive _two_ responses if that URL has been cached before.

现在，如果 URL 被缓存过，那么任何人调用`http.get(url)`时都会收到*两次*响应。

### Listening to progress events

### 监听进度事件

Sometimes applications need to transfer large amounts of data, and those transfers can take time. It's a good user experience practice to provide feedback on the progress of such transfers; for example, uploading files&mdash;and `@angular/common/http` supports this.

有时候应用需要传输一大堆数据，这时传输就需要花一些时间。在这种传输过程中（比如上传文件）给用户一些关于进度的反馈能带来更好的用户体验，而`@angular/common/http`支持它。

To make a request with progress events enabled, first create an instance of `HttpRequest` with the special `reportProgress` option set:

要发起一个支持进度事件的请求，首先要创建一个设置过`reportProgress`选项的`HttpRequest`实例：

```javascript
const req = new HttpRequest('POST', '/upload/file', file, {
  reportProgress: true,
});
```

This option enables tracking of progress events. Remember, every progress event triggers
change detection, so only turn them on if you intend to actually update the UI on each event.

该选项让我们可以跟踪进度事件。记住，每个进度事件都会触发变更检测，所以应该只有在你真的打算在每个事件中更新 UI 时才打开它。

Next, make the request through the `request()` method of `HttpClient`. The result will be an Observable of events, just like with interceptors:

接下来，通过`HttpClient`上的`request()`方法发起这个请求。其结果应该是一个关于事件的可观察对象，就像拦截器中看到的那样：

```javascript
http.request(req).subscribe(event => {
  // Via this API, you get access to the raw event stream.
  // Look for upload progress events.
  if (event.type === HttpEventType.UploadProgress) {
    // This is an upload progress event. Compute and show the % done:
    const percentDone = Math.round(100 * event.loaded / event.total);
    console.log(`File is ${percentDone}% uploaded.`);
  } else if (event instanceof HttpResponse) {
    console.log('File is completely uploaded!');
  }
});
```

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
*Note that `HttpClient`'s support is only the client half of the XSRF protection scheme.* Your backend service must be configured to set the cookie for your page, and to verify that the header is present on all eligible requests. If not, Angular's default protection will be ineffective.

*注意，`HttpClient`支持的只是 XSRF 防护方案的客户端这一半。* 我们的后端服务必须配置为给页面设置 cookie ，并且要验证请求头，以确保全都是合法的请求。否则，Angular 默认的这种防护措施就会失效。

</div>

### Configuring custom cookie/header names

### 配置自定义 cookie/header 名称

If your backend service uses different names for the XSRF token cookie or header, use `HttpClientXsrfModule.withConfig()` to override the defaults.

如果我们的后端服务中对 XSRF 令牌的 cookie 或 头使用了不一样的名字，就要使用 `HttpClientXsrfModule.withConfig()` 来覆盖掉默认值。

```javascript
imports: [
  HttpClientModule,
  HttpClientXsrfModule.withConfig({
    cookieName: 'My-Xsrf-Cookie',
    headerName: 'My-Xsrf-Header',
  }),
]
```

## Testing HTTP requests

## 测试 HTTP 请求

Like any external dependency, the HTTP backend needs to be mocked as part of good testing practice. `@angular/common/http` provides a testing library `@angular/common/http/testing` that makes setting up such mocking straightforward.

如同所有的外部依赖一样，HTTP 后端也需要在良好的测试实践中被 Mock 掉。`@angular/common/http` 提供了一个测试库 `@angular/common/http/testing`，它让我们可以直截了当的进行这种 Mock 。

### Mocking philosophy

### Mock 方法论

Angular's HTTP testing library is designed for a pattern of testing where the app executes code and makes requests first. After that, tests expect that certain requests have or have not been made, perform assertions against those requests, and finally provide responses by "flushing" each expected request, which may trigger more new requests, etc. At the end, tests can optionally verify that the app has made no unexpected requests.

Angular 的 HTTP 测试库是为这种模式的测试而设计的：应用执行代码并首先发起请求，之后，测试代码会期待（expect）特定的请求发起过或没发起，然后对那些请求进行断言，最终，通过刷新（flushing）每个被期待的请求来提供响应，此后还可能会触发更多新的请求。最后，测试代码还可以根据需要去验证应用不曾发起过预期之外的请求。

### Setup

### 初始设置

To begin testing requests made through `HttpClient`, import `HttpClientTestingModule` and add it to your `TestBed` setup, like so:

要开始测试那些通过`HttpClient`发起的请求，就要导入`HttpClientTestingModule`模块，并把它加到你的`TestBed` 设置里去，代码如下：

```javascript

import {HttpClientTestingModule} from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    ...,
    imports: [
      HttpClientTestingModule,
    ],
  })
});
```

That's it. Now requests made in the course of your tests will hit the testing backend instead of the normal backend.

这样就可以了。现在，在测试代码中发起的请求将会抵达后端的测试替身，而不是标准后端（真实服务器）。

### Expecting and answering requests

### 期待并回复请求

With the mock installed via the module, you can write a test that expects a GET Request to occur and provides a mock response. The following example does this by injecting both the `HttpClient` into the test and a class called `HttpTestingController`

在通过本模块安装了 Mock 之后，我们可以就写一个测试来期待发生一个 GET 请求，并给出一个 Mock 版的响应。
下列例子通过把 `HttpClient` 同时注入到测试代码和一个名叫`HttpTestingController`的类中来做到这一点：

```javascript
it('expects a GET request', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
  // Make an HTTP GET request, and expect that it return an object
  // of the form {name: 'Test Data'}.
  http
    .get('/data')
    .subscribe(data => expect(data['name']).toEqual('Test Data'));

  // At this point, the request is pending, and no response has been
  // sent. The next step is to expect that the request happened.
  const req = httpMock.expectOne('/data');

  // If no request with that URL was made, or if multiple requests match,
  // expectOne() would throw. However this test makes only one request to
  // this URL, so it will match and return a mock request. The mock request
  // can be used to deliver a response or make assertions against the
  // request. In this case, the test asserts that the request is a GET.
  expect(req.request.method).toEqual('GET');

  // Next, fulfill the request by transmitting a response.
  req.flush({name: 'Test Data'});

  // Finally, assert that there are no outstanding requests.
  httpMock.verify();
}));
```

The last step, verifying that no requests remain outstanding, is common enough for you to move it into an `afterEach()` step:

最后一步，验证没有发起过预期之外的请求，足够通用，因此我们可以把它移到`afterEach()`中：

```javascript
afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
  httpMock.verify();
}));
```

#### Custom request expectations

#### 自定义请求的预期

If matching by URL isn't sufficient, it's possible to implement your own matching function. For example, you could look for an outgoing request that has an Authorization header:

如果根据 URL 匹配还不满足要求，也可以实现我们自己的匹配函数。比如，我们可以查找一个具有特定认证（Authorization）头的对外请求：

```javascript
const req = httpMock.expectOne((req) => req.headers.has('Authorization'));
```

Just as with the `expectOne()` by URL in the test above, if 0 or 2+ requests match this expectation, it will throw.

和前面根据 URL 进行测试时一样，如果零或两个以上的请求匹配上了这个期待，它就会抛出异常。

#### Handling more than one request

#### 处理一个以上的请求

If you need to respond to duplicate requests in your test, use the `match()` API instead of `expectOne()`, which takes the same arguments but returns an array of matching requests. Once returned, these requests are removed from future matching and are your responsibility to verify and flush.

如果我们需要在测试中对重复的请求进行响应，可以使用`match()` API 来代替 `expectOne()`，它的参数不变，但会返回一个与这些请求相匹配的数组。一旦返回，这些请求就会从将来要匹配的列表中移除，而验证和刷新（flush）它，是我们自己的职责。

```javascript
// Expect that 5 pings have been made and flush them.
const reqs = httpMock.match('/ping');
expect(reqs.length).toBe(5);
reqs.forEach(req => req.flush());
```
