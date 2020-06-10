# Get data from a server

# 从服务端获取数据

In this tutorial, you'll add the following data persistence features with help from
Angular's `HttpClient`.

在这节课中，你将借助 Angular 的 `HttpClient` 来添加一些数据持久化特性。

* The `HeroService` gets hero data with HTTP requests.

   `HeroService` 通过 HTTP 请求获取英雄数据。

* Users can add, edit, and delete heroes and save these changes over HTTP.

   用户可以添加、编辑和删除英雄，并通过 HTTP 来保存这些更改。

* Users can search for heroes by name.

   用户可以根据名字搜索英雄。

When you're done with this page, the app should look like this <live-example></live-example>.

当你完成这一章时，应用会变成这样：<live-example></live-example>。

## Enable HTTP services

## 启用 HTTP 服务

`HttpClient` is Angular's mechanism for communicating with a remote server over HTTP.

`HttpClient` 是 Angular 通过 HTTP 与远程服务器通讯的机制。

Make `HttpClient` available everywhere in the app in two steps. First, add it to the root `AppModule` by importing it:

要让 `HttpClient` 在应用中随处可用，需要两个步骤。首先，用导入语句把它添加到根模块 `AppModule` 中：

<code-example path="toh-pt6/src/app/app.module.ts" region="import-http-client" header="src/app/app.module.ts (HttpClientModule import)">
</code-example>

Next, still in the `AppModule`, add `HttpClient` to the `imports` array:

接下来，仍然在 `AppModule` 中，把 `HttpClientModule` 添加到 `imports` 数组中：

<code-example path="toh-pt6/src/app/app.module.ts" region="import-httpclientmodule" header="src/app/app.module.ts (imports array excerpt)">
</code-example>

## Simulate a data server

## 模拟数据服务器

This tutorial sample mimics communication with a remote data server by using the
[In-memory Web API](https://github.com/angular/in-memory-web-api "In-memory Web API") module.

这个教学例子会与一个使用 [内存 Web API（_In-memory Web API_）](https://github.com/angular/in-memory-web-api "In-memory Web API") 模拟出的远程数据服务器通讯。

After installing the module, the app will make requests to and receive responses from the `HttpClient`
without knowing that the *In-memory Web API* is intercepting those requests,
applying them to an in-memory data store, and returning simulated responses.

安装完这个模块之后，应用将会通过 `HttpClient` 来发起请求和接收响应，而不用在乎实际上是这个内存 Web API 在拦截这些请求、操作一个内存数据库，并且给出仿真的响应。

By using the In-memory Web API, you won't have to set up a server to learn about `HttpClient`.

通过使用内存 Web API，你不用架设服务器就可以学习 `HttpClient` 了。

<div class="alert is-important">

**Important:** the In-memory Web API module has nothing to do with HTTP in Angular.

**重要：** 这个*内存 Web API* 模块与 Angular 中的 HTTP 模块无关。

If you're just reading this tutorial to learn about `HttpClient`, you can [skip over](#import-heroes) this step.
If you're coding along with this tutorial, stay here and add the In-memory Web API now.

如果你只是在*阅读*本教程来学习 `HttpClient`，那么可以[跳过](#import-heroes)这一步。
如果你正在随着本教程*敲代码*，那就留下来，并加上这个*内存 Web API*。

</div>

Install the In-memory Web API package from npm with the following command:

用如下命令从 `npm` 中安装这个*内存 Web API* 包（译注：请使用 0.5+ 的版本，不要使用 0.4-）

<code-example language="sh" class="code-shell">
  npm install angular-in-memory-web-api --save
</code-example>

In the `AppModule`, import the `HttpClientInMemoryWebApiModule` and the `InMemoryDataService` class,
which you will create in a moment.

在 `AppModule` 中，导入 `HttpClientInMemoryWebApiModule` 和 `InMemoryDataService` 类，稍后你将创建它们。

<code-example path="toh-pt6/src/app/app.module.ts" region="import-in-mem-stuff" header="src/app/app.module.ts (In-memory Web API imports)">
</code-example>

After the `HttpClientModule`, add the `HttpClientInMemoryWebApiModule`
to the `AppModule` `imports` array and configure it with the `InMemoryDataService`.

在 `HttpClientModule` 之后，将 `HttpClientInMemoryWebApiModule` 添加到 `AppModule` 的 `imports` 数组中，并以 `InMemoryDataService` 为参数对其进行配置。

<code-example path="toh-pt6/src/app/app.module.ts" header="src/app/app.module.ts (imports array excerpt)" region="in-mem-web-api-imports">
</code-example>

The `forRoot()` configuration method takes an `InMemoryDataService` class
that primes the in-memory database.

`forRoot()` 配置方法接收一个 `InMemoryDataService` 类来初始化内存数据库。

Generate the class `src/app/in-memory-data.service.ts` with the following command:

使用以下命令生成类 `src/app/in-memory-data.service.ts`：

<code-example language="sh" class="code-shell">
  ng generate service InMemoryData
</code-example>

Replace the default contents of `in-memory-data.service.ts` with the following:

将 `in-memory-data.service.ts` 改为以下内容：

<code-example path="toh-pt6/src/app/in-memory-data.service.ts" region="init" header="src/app/in-memory-data.service.ts"></code-example>

The `in-memory-data.service.ts` file replaces `mock-heroes.ts`, which is now safe to delete.

`in-memory-data.service.ts` 文件已代替了 `mock-heroes.ts` 文件，现在后者可以安全的删除了。

When the server is ready, you'll detach the In-memory Web API, and the app's requests will go through to the server.

等服务器就绪后，你就可以抛弃这个内存 Web API，应用的请求将直接传给服务器。

{@a import-heroes}

## Heroes and HTTP

## 英雄与 HTTP

In the `HeroService`, import `HttpClient` and `HttpHeaders`:

在 `HeroService` 中，导入 `HttpClient` 和 `HttpHeaders`：

<code-example path="toh-pt6/src/app/hero.service.ts" region="import-httpclient" header="src/app/hero.service.ts (import HTTP symbols)">
</code-example>

Still in the `HeroService`, inject `HttpClient` into the constructor in a private property called `http`.

仍然在 `HeroService` 中，把 `HttpClient` 注入到构造函数中一个名叫 `http` 的私有属性中。

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="ctor" >
</code-example>

Notice that you keep injecting the `MessageService` but since you'll call it so frequently, wrap it in a private `log()` method:

注意保留对 `MessageService` 的注入，但是因为你将频繁调用它，因此请把它包裹进一个私有的 `log` 方法中。

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="log" >
</code-example>

Define the `heroesUrl` of the form `:base/:collectionName` with the address of the heroes resource on the server.
 Here `base` is the resource to which requests are made,
 and `collectionName` is the heroes data object in the `in-memory-data-service.ts`.

把服务器上英雄数据资源的访问地址 `heroesURL` 定义为 `:base/:collectionName` 的形式。
这里的 `base` 是要请求的资源，而 `collectionName` 是 `in-memory-data-service.ts` 中的英雄数据对象。

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="heroesUrl" >
</code-example>

### Get heroes with `HttpClient`

### 通过 `HttpClient` 获取英雄

The current `HeroService.getHeroes()`
uses the RxJS `of()` function to return an array of mock heroes
as an `Observable<Hero[]>`.

当前的 `HeroService.getHeroes()` 使用 RxJS 的 `of()` 函数来把模拟英雄数据返回为 `Observable<Hero[]>` 格式。

<code-example path="toh-pt4/src/app/hero.service.ts" region="getHeroes-1" header="src/app/hero.service.ts (getHeroes with RxJs 'of()')">
</code-example>

Convert that method to use `HttpClient` as follows:

把该方法转换成使用 `HttpClient` 的，代码如下：

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="getHeroes-1">
</code-example>

Refresh the browser. The hero data should successfully load from the
mock server.

刷新浏览器后，英雄数据就会从模拟服务器被成功读取。

You've swapped `of()` for `http.get()` and the app keeps working without any other changes
because both functions return an `Observable<Hero[]>`.

你用 `http.get()` 替换了 `of()`，没有做其它修改，但是应用仍然在正常工作，这是因为这两个函数都返回了 `Observable<Hero[]>`。

### `HttpClient` methods return one value

### `HttpClient` 的方法返回单个值

All `HttpClient` methods return an RxJS `Observable` of something.

所有的 `HttpClient` 方法都会返回某个值的 RxJS `Observable`。

HTTP is a request/response protocol.
You make a request, it returns a single response.

HTTP 是一个请求/响应式协议。你发起请求，它返回单个的响应。

In general, an observable _can_ return multiple values over time.
An observable from `HttpClient` always emits a single value and then completes, never to emit again.

通常，`Observable` *可以*在一段时间内返回多个值。
但来自 `HttpClient` 的 `Observable` 总是发出一个值，然后结束，再也不会发出其它值。

This particular `HttpClient.get()` call returns an `Observable<Hero[]>`; that is, "_an observable of hero arrays_". In practice, it will only return a single hero array.

具体到这次 `HttpClient.get()` 调用，它返回一个 `Observable<Hero[]>`，也就是“一个英雄数组的可观察对象”。在实践中，它也只会返回一个英雄数组。

### `HttpClient.get()` returns response data

### `HttpClient.get()` 返回响应数据

`HttpClient.get()` returns the body of the response as an untyped JSON object by default.
Applying the optional type specifier, `<Hero[]>` , adds TypeScript capabilities, which reduce errors during compile time.

`HttpClient.get()` 默认情况下把响应体当做无类型的 JSON 对象进行返回。
如果指定了可选的模板类型 `<Hero[]>`，就会给返回你一个类型化的对象。

The server's data API determines the shape of the JSON data.
The _Tour of Heroes_ data API returns the hero data as an array.

服务器的数据 API 决定了 JSON 数据的具体形态。
*英雄指南*的数据 API 会把英雄数据作为一个数组进行返回。

<div class="alert is-helpful">

Other APIs may bury the data that you want within an object.
You might have to dig that data out by processing the `Observable` result
with the RxJS `map()` operator.

其它 API 可能在返回对象中深埋着你想要的数据。
你可能要借助 RxJS 的 `map()` 操作符对 `Observable` 的结果进行处理，以便把这些数据挖掘出来。

Although not discussed here, there's an example of `map()` in the `getHeroNo404()`
method included in the sample source code.

虽然不打算在此展开讨论，不过你可以到范例源码中的 `getHeroNo404()` 方法中找到一个使用 `map()` 操作符的例子。

</div>

### Error handling

### 错误处理

Things go wrong, especially when you're getting data from a remote server.
The `HeroService.getHeroes()` method should catch errors and do something appropriate.

凡事皆会出错，特别是当你从远端服务器获取数据的时候。
`HeroService.getHeroes()` 方法应该捕获错误，并做适当的处理。

To catch errors, you **"pipe" the observable** result from `http.get()` through an RxJS `catchError()` operator.

要捕获错误，你就要使用 RxJS 的 `catchError()` 操作符来**建立对 Observable 结果的处理管道（pipe）**。

Import the `catchError` symbol from `rxjs/operators`, along with some other operators you'll need later.

从 `rxjs/operators` 中导入 `catchError` 符号，以及你稍后将会用到的其它操作符。

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="import-rxjs-operators">
</code-example>

Now extend the observable result with the `pipe()` method and
give it a `catchError()` operator.

现在，使用 `pipe()` 方法来扩展 `Observable` 的结果，并给它一个 `catchError()` 操作符。

<code-example path="toh-pt6/src/app/hero.service.ts" region="getHeroes-2" header="src/app/hero.service.ts">
</code-example>

The `catchError()` operator intercepts an **`Observable` that failed**.
It passes the error an error handler that can do what it wants with the error.

`catchError()` 操作符会拦截**失败的 `Observable`**。
它把错误对象传给*错误处理器*，*错误处理器*会处理这个错误。

The following `handleError()` method reports the error and then returns an
innocuous result so that the application keeps working.

下面的 `handleError()` 方法会报告这个错误，并返回一个无害的结果（安全值），以便应用能正常工作。

#### `handleError`

The following `handleError()` will be shared by many `HeroService` methods
so it's generalized to meet their different needs.

下面这个 `handleError()` 将会在很多 `HeroService` 的方法之间共享，所以要把它通用化，以支持这些彼此不同的需求。

Instead of handling the error directly, it returns an error handler function to `catchError` that it
has configured with both the name of the operation that failed and a safe return value.

它不再直接处理这些错误，而是返回给 `catchError` 返回一个错误处理函数。还要用操作名和出错时要返回的安全值来对这个错误处理函数进行配置。

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts" region="handleError">
</code-example>

After reporting the error to the console, the handler constructs
a user friendly message and returns a safe value to the app so the app can keep working.

在控制台中汇报了这个错误之后，这个处理器会汇报一个用户友好的消息，并给应用返回一个安全值，让应用继续工作。

Because each service method returns a different kind of `Observable` result,
`handleError()` takes a type parameter so it can return the safe value as the type that the app expects.

因为每个服务方法都会返回不同类型的 `Observable` 结果，因此 `handleError()` 也需要一个类型参数，以便它返回一个此类型的安全值，正如应用所期望的那样。

### Tap into the Observable

### 窥探 `Observable`

The `HeroService` methods will **tap** into the flow of observable values
and send a message, via the `log()` method, to the message area at the bottom of the page.

`HeroService` 的方法将会窥探 `Observable` 的数据流，并通过 `log()` 方法往页面底部发送一条消息。

They'll do that with the RxJS `tap()` operator,
which looks at the observable values, does something with those values,
and passes them along.
The `tap()` call back doesn't touch the values themselves.

它们可以使用 RxJS 的 `tap()` 操作符来实现，该操作符会查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来。
这种 `tap()` 回调不会改变这些值本身。

Here is the final version of `getHeroes()` with the `tap()` that logs the operation.

下面是 `getHeroes()` 的最终版本，它使用 `tap()` 来记录各种操作。

<code-example path="toh-pt6/src/app/hero.service.ts" header="src/app/hero.service.ts"  region="getHeroes" >
</code-example>

### Get hero by id

### 通过 id 获取英雄

Most web APIs support a _get by id_ request in the form `:baseURL/:id`.

大多数的 Web API 都支持以 `:baseURL/:id` 的形式根据 id 进行获取。

Here, the _base URL_ is the `heroesURL` defined in the [Heroes and HTTP](tutorial/toh-pt6#heroes-and-http) section (`api/heroes`) and _id_ is
the number of the hero that you want to retrieve. For example, `api/heroes/11`.
Update the `HeroService` `getHero()` method with the following to make that request:

这里的 `baseURL` 就是在 [英雄列表与 HTTP](tutorial/toh-pt6#heroes-and-http) 部分定义过的 `heroesURL`（`api/heroes`）。而 `id` 则是你要获取的英雄的编号，比如，`api/heroes/11`。
把 `HeroService.getHero()` 方法改成这样，以发起该请求：

<code-example path="toh-pt6/src/app/hero.service.ts" region="getHero" header="src/app/hero.service.ts"></code-example>

There are three significant differences from  `getHeroes()`:

这里和 `getHeroes()` 相比有三个显著的差异:

* `getHero()` constructs a request URL with the desired hero's id.

   `getHero()` 使用想获取的英雄的 id 构造了一个请求 URL。

* The server should respond with a single hero rather than an array of heroes.

   服务器应该使用单个英雄作为回应，而不是一个英雄数组。

* `getHero()` returns an `Observable<Hero>` ("_an observable of Hero objects_")
 rather than an observable of hero _arrays_ .

   所以，`getHero()` 会返回 `Observable<Hero>`（“一个可观察的*单个英雄对象*”），而不是一个可观察的英雄对象*数组*。

## Update heroes

## 修改英雄

Edit a hero's name in the hero detail view.
As you type, the hero name updates the heading at the top of the page.
But when you click the "go back button", the changes are lost.

在*英雄详情*视图中编辑英雄的名字。
随着输入，英雄的名字也跟着在页面顶部的标题区更新了。
但是当你点击“后退”按钮时，这些修改都丢失了。

If you want changes to persist, you must write them back to
the server.

如果你希望保留这些修改，就要把它们写回到服务器。

At the end of the hero detail template, add a save button with a `click` event
binding that invokes a new component method named `save()`.

在英雄详情模板的底部添加一个保存按钮，它绑定了一个 `click` 事件，事件绑定会调用组件中一个名叫 `save()` 的新方法：

<code-example path="toh-pt6/src/app/hero-detail/hero-detail.component.html" region="save" header="src/app/hero-detail/hero-detail.component.html (save)"></code-example>

In the `HeroDetail` component class, add the following `save()` method, which persists hero name changes using the hero service
`updateHero()` method and then navigates back to the previous view.

在 `HeroDetail` 组件类中，添加如下的 `save()` 方法，它使用英雄服务中的 `updateHero()` 方法来保存对英雄名字的修改，然后导航回前一个视图。

<code-example path="toh-pt6/src/app/hero-detail/hero-detail.component.ts" region="save" header="src/app/hero-detail/hero-detail.component.ts (save)"></code-example>

#### Add `HeroService.updateHero()`

#### 添加 `HeroService.updateHero()`

The overall structure of the `updateHero()` method is similar to that of
`getHeroes()`, but it uses `http.put()` to persist the changed hero
on the server. Add the following to the `HeroService`.

`updateHero()` 的总体结构和 `getHeroes()` 很相似，但它会使用 `http.put()` 来把修改后的英雄保存到服务器上。
把下列代码添加进 `HeroService`。

<code-example path="toh-pt6/src/app/hero.service.ts" region="updateHero" header="src/app/hero.service.ts (update)">
</code-example>

The `HttpClient.put()` method takes three parameters:

`HttpClient.put()` 方法接受三个参数：

* the URL

   URL 地址

* the data to update (the modified hero in this case)

   要修改的数据（这里就是修改后的英雄）

* options

   选项

The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's `id`.

URL 没变。英雄 Web API 通过英雄对象的 `id` 就可以知道要修改哪个英雄。

The heroes web API expects a special header in HTTP save requests.
That header is in the `httpOptions` constant defined in the `HeroService`. Add the following to the `HeroService` class.

英雄 Web API 期待在保存时的请求中有一个特殊的头。
这个头是在 `HeroService` 的 `httpOptions` 常量中定义的。

<code-example path="toh-pt6/src/app/hero.service.ts" region="http-options" header="src/app/hero.service.ts">
</code-example>

Refresh the browser, change a hero name and save your change. The `save()`
method in `HeroDetailComponent` navigates to the previous view.
The hero now appears in the list with the changed name.

刷新浏览器，修改英雄名，保存这些修改。在 `HeroDetailComponent` 的 `save()` 方法中导航到前一个视图。
现在，改名后的英雄已经显示在列表中了。

## Add a new hero

## 添加新英雄

To add a hero, this app only needs the hero's name. You can use an `<input>`
element paired with an add button.

要添加英雄，本应用中只需要英雄的名字。你可以使用一个和添加按钮成对的 `<input>` 元素。

Insert the following into the `HeroesComponent` template, just after
the heading:

把下列代码插入到 `HeroesComponent` 模板中标题的紧后面：

<code-example path="toh-pt6/src/app/heroes/heroes.component.html" region="add" header="src/app/heroes/heroes.component.html (add)"></code-example>

In response to a click event, call the component's click handler, `add()`, and then
clear the input field so that it's ready for another name. Add the following to the
`HeroesComponent` class:

当点击事件触发时，调用组件的点击处理器（`add()`），然后清空这个输入框，以便用来输入另一个名字。把下列代码添加到 `HeroesComponent` 类：

<code-example path="toh-pt6/src/app/heroes/heroes.component.ts" region="add" header="src/app/heroes/heroes.component.ts (add)"></code-example>

When the given name is non-blank, the handler creates a `Hero`-like object
from the name (it's only missing the `id`) and passes it to the services `addHero()` method.

当指定的名字非空时，这个处理器会用这个名字创建一个类似于 `Hero` 的对象（只缺少 `id` 属性），并把它传给服务的 `addHero()` 方法。

When `addHero()` saves successfully, the `subscribe()` callback
receives the new hero and pushes it into to the `heroes` list for display.

当 `addHero()` 保存成功时，`subscribe()` 的回调函数会收到这个新英雄，并把它追加到 `heroes` 列表中以供显示。

Add the following `addHero()` method to the `HeroService` class.

往 `HeroService` 类中添加 `addHero()` 方法。

<code-example path="toh-pt6/src/app/hero.service.ts" region="addHero" header="src/app/hero.service.ts (addHero)"></code-example>

`addHero()` differs from `updateHero()` in two ways:

`addHero()` 和 `updateHero()` 有两点不同。

* It calls `HttpClient.post()` instead of `put()`.

   它调用 `HttpClient.post()` 而不是 `put()`。

* It expects the server to generate an id for the new hero,
which it returns in the `Observable<Hero>` to the caller.

   它期待服务器为这个新的英雄生成一个 id，然后把它通过 `Observable<Hero>` 返回给调用者。

Refresh the browser and add some heroes.

刷新浏览器，并添加一些英雄。

## Delete a hero

## 删除某个英雄

Each hero in the heroes list should have a delete button.

英雄列表中的每个英雄都有一个删除按钮。

Add the following button element to the `HeroesComponent` template, after the hero
name in the repeated `<li>` element.

把下列按钮（`button`）元素添加到 `HeroesComponent` 的模板中，就在每个 `<li>` 元素中的英雄名字后方。

<code-example path="toh-pt6/src/app/heroes/heroes.component.html" header="src/app/heroes/heroes.component.html" region="delete"></code-example>

The HTML for the list of heroes should look like this:

英雄列表的 HTML 应该是这样的：

<code-example path="toh-pt6/src/app/heroes/heroes.component.html" region="list" header="src/app/heroes/heroes.component.html (list of heroes)"></code-example>

To position the delete button at the far right of the hero entry,
add some CSS to the `heroes.component.css`. You'll find that CSS
in the [final review code](#heroescomponent) below.

要把删除按钮定位在每个英雄条目的最右边，就要往 `heroes.component.css` 中添加一些 CSS。你可以在下方的 [最终代码](#heroescomponent) 中找到这些 CSS。

Add the `delete()` handler to the component class.

把 `delete()` 处理器添加到组件中。

<code-example path="toh-pt6/src/app/heroes/heroes.component.ts" region="delete" header="src/app/heroes/heroes.component.ts (delete)"></code-example>

Although the component delegates hero deletion to the `HeroService`,
it remains responsible for updating its own list of heroes.
The component's `delete()` method immediately removes the _hero-to-delete_ from that list,
anticipating that the `HeroService` will succeed on the server.

虽然这个组件把删除英雄的逻辑委托给了 `HeroService`，但仍保留了更新它自己的英雄列表的职责。
组件的 `delete()` 方法会在 `HeroService` 对服务器的操作成功之前，先从列表中移除*要删除的英雄*。

There's really nothing for the component to do with the `Observable` returned by
`heroService.delete()` **but it must subscribe anyway**.

组件与 `heroService.delete()` 返回的 `Observable` 还完全没有关联。**必须订阅它**。

<div class="alert is-important">

  If you neglect to `subscribe()`, the service will not send the delete request to the server.
  As a rule, an `Observable` _does nothing_ until something subscribes.

  如果你忘了调用 `subscribe()`，本服务将不会把这个删除请求发送给服务器。
  作为一条通用的规则，`Observable` 在有人订阅之前*什么都不会做*。

  Confirm this for yourself by temporarily removing the `subscribe()`,
  clicking "Dashboard", then clicking "Heroes".
  You'll see the full list of heroes again.

  你可以暂时删除 `subscribe()` 来确认这一点。点击“Dashboard”，然后点击“Heroes”，就又看到完整的英雄列表了。

</div>

Next, add a `deleteHero()` method to `HeroService` like this.

接下来，把 `deleteHero()` 方法添加到 `HeroService` 中，代码如下。

<code-example path="toh-pt6/src/app/hero.service.ts" region="deleteHero" header="src/app/hero.service.ts (delete)"></code-example>

Note the following key points:

注意

* `deleteHero()` calls `HttpClient.delete()`.

   `deleteHero()` 调用了 `HttpClient.delete()`。

* The URL is the heroes resource URL plus the `id` of the hero to delete.

   URL 就是英雄的资源 URL 加上要删除的英雄的 `id`。

* You don't send data as you did with `put()` and `post()`.

   你不用像 `put()` 和 `post()` 中那样发送任何数据。

* You still send the `httpOptions`.

   你仍要发送 `httpOptions`。

Refresh the browser and try the new delete functionality.

刷新浏览器，并试一下这个新的删除功能。

## Search by name

## 根据名字搜索

In this last exercise, you learn to chain `Observable` operators together
so you can minimize the number of similar HTTP requests
and consume network bandwidth economically.

在最后一次练习中，你要学到把 `Observable` 的操作符串在一起，让你能将相似 HTTP 请求的数量最小化，并节省网络带宽。

You will add a heroes search feature to the Dashboard.
As the user types a name into a search box,
you'll make repeated HTTP requests for heroes filtered by that name.
Your goal is to issue only as many requests as necessary.

你将往*仪表盘*中加入*英雄搜索*特性。
当用户在搜索框中输入名字时，你会不断发送根据名字过滤英雄的 HTTP 请求。
你的目标是仅仅发出尽可能少的必要请求。

#### `HeroService.searchHeroes()`

Start by adding a `searchHeroes()` method to the `HeroService`.

先把 `searchHeroes()` 方法添加到 `HeroService` 中。

<code-example path="toh-pt6/src/app/hero.service.ts" region="searchHeroes" header="src/app/hero.service.ts">
</code-example>

The method returns immediately with an empty array if there is no search term.
The rest of it closely resembles `getHeroes()`, the only significant difference being
the URL, which includes a query string with the search term.

如果没有搜索词，该方法立即返回一个空数组。
剩下的部分和 `getHeroes()` 很像。
唯一的不同点是 URL，它包含了一个由搜索词组成的查询字符串。

### Add search to the Dashboard

### 为仪表盘添加搜索功能

Open the `DashboardComponent` template and
add the hero search element, `<app-hero-search>`, to the bottom of the markup.

打开 `DashboardComponent` 的模板并且把用于搜索英雄的元素 `<app-hero-search>` 添加到代码的底部。

<code-example path="toh-pt6/src/app/dashboard/dashboard.component.html" header="src/app/dashboard/dashboard.component.html"></code-example>

This template looks a lot like the `*ngFor` repeater in the `HeroesComponent` template.

这个模板看起来很像 `HeroesComponent` 模板中的 `*ngFor` 复写器。

For this to work, the next step is to add a component with a selector that matches `<app-hero-search>`.

为此，下一步就是添加一个组件，它的选择器要能匹配 `<app-hero-search>`。

### Create `HeroSearchComponent`

### 创建 `HeroSearchComponent`

Create a `HeroSearchComponent` with the CLI.

使用 CLI 创建一个 `HeroSearchComponent`。

<code-example language="sh" class="code-shell">
  ng generate component hero-search
</code-example>

The CLI generates the three `HeroSearchComponent` files and adds the component to the `AppModule` declarations.

CLI 生成了 `HeroSearchComponent` 的三个文件，并把该组件添加到了 `AppModule` 的声明中。

Replace the generated `HeroSearchComponent` template with an `<input>` and a list of matching search results, as follows.

把生成的 `HeroSearchComponent` 的*模板*改成一个 `<input>` 和一个匹配到的搜索结果的列表。代码如下：

<code-example path="toh-pt6/src/app/hero-search/hero-search.component.html" header="src/app/hero-search/hero-search.component.html"></code-example>

Add private CSS styles to `hero-search.component.css`
as listed in the [final code review](#herosearchcomponent) below.

从下面的 [最终代码](#herosearchcomponent) 中把私有 CSS 样式添加到 `hero-search.component.css` 中。

As the user types in the search box, an input event binding calls the
component's `search()` method with the new search box value.

当用户在搜索框中输入时，一个 *keyup* 事件绑定会调用该组件的 `search()` 方法，并传入新的搜索框的值。

{@a asyncpipe}

### `AsyncPipe`

The `*ngFor` repeats hero objects. Notice that the `*ngFor` iterates over a list called `heroes$`, not `heroes`. The `$` is a convention that indicates `heroes$` is an `Observable`, not an array.

`*ngFor` 会重复渲染这些英雄对象。注意，`*ngFor` 在一个名叫 `heroes$` 的列表上迭代，而不是 `heroes`。`$` 是一个约定，表示 `heroes$` 是一个 `Observable` 而不是数组。

<code-example path="toh-pt6/src/app/hero-search/hero-search.component.html" header="src/app/hero-search/hero-search.component.html" region="async"></code-example>

Since `*ngFor` can't do anything with an `Observable`, use the
pipe character (`|`) followed by `async`. This identifies Angular's `AsyncPipe` and subscribes to an `Observable` automatically so you won't have to
do so in the component class.

由于 `*ngFor` 不能直接使用 `Observable`，所以要使用一个管道字符（`|`），后面紧跟着一个 `async`。这表示 Angular 的 `AsyncPipe` 管道，它会自动订阅 `Observable`，这样你就不用在组件类中这么做了。

### Edit the `HeroSearchComponent` class

### 修正 `HeroSearchComponent` 类

Replace the generated `HeroSearchComponent` class and metadata as follows.

修改所生成的 `HeroSearchComponent` 类及其元数据，代码如下：

<code-example path="toh-pt6/src/app/hero-search/hero-search.component.ts" header="src/app/hero-search/hero-search.component.ts"></code-example>

Notice the declaration of `heroes$` as an `Observable`:

注意，`heroes$` 声明为一个 `Observable`

<code-example 
  path="toh-pt6/src/app/hero-search/hero-search.component.ts" 
 header="src/app/hero-search/hero-search.component.ts" region="heroes-stream">
</code-example>

You'll set it in [`ngOnInit()`](#search-pipe).
Before you do, focus on the definition of `searchTerms`.

你将会在 [`ngOnInit()`](#search-pipe) 中设置它，在此之前，先仔细看看 `searchTerms` 的定义。

### The `searchTerms` RxJS subject

### RxJS `Subject` 类型的 `searchTerms`

The `searchTerms` property is an RxJS `Subject`.

`searchTerms` 属性是 RxJS 的 `Subject` 类型。

<code-example path="toh-pt6/src/app/hero-search/hero-search.component.ts" header="src/app/hero-search/hero-search.component.ts" region="searchTerms"></code-example>

A `Subject` is both a source of observable values and an `Observable` itself.
You can subscribe to a `Subject` as you would any `Observable`.

`Subject` 既是可观察对象的数据源，本身也是 `Observable`。
你可以像订阅任何 `Observable` 一样订阅 `Subject`。

You can also push values into that `Observable` by calling its `next(value)` method
as the `search()` method does.

你还可以通过调用它的 `next(value)` 方法往 `Observable` 中推送一些值，就像 `search()` 方法中一样。

The event binding to the textbox's `input` event calls the `search()` method.

文本框的 `input` 事件的*事件绑定*会调用 `search()` 方法。

<code-example path="toh-pt6/src/app/hero-search/hero-search.component.html" header="src/app/hero-search/hero-search.component.html" region="input"></code-example>

Every time the user types in the textbox, the binding calls `search()` with the textbox value, a "search term".
The `searchTerms` becomes an `Observable` emitting a steady stream of search terms.

每当用户在文本框中输入时，这个事件绑定就会使用文本框的值（搜索词）调用 `search()` 函数。
`searchTerms` 变成了一个能发出搜索词的稳定的流。

{@a search-pipe}

### Chaining RxJS operators

### 串联 RxJS 操作符

Passing a new search term directly to the `searchHeroes()` after every user keystroke would create an excessive amount of HTTP requests,
taxing server resources and burning through data plans.

如果每当用户击键后就直接调用 `searchHeroes()` 将导致创建海量的 HTTP 请求，浪费服务器资源并干扰数据调度计划。

Instead, the `ngOnInit()` method pipes the `searchTerms` observable through a sequence of RxJS operators that reduce the number of calls to the `searchHeroes()`,
ultimately returning an observable of timely hero search results (each a `Hero[]`).

应该怎么做呢？`ngOnInit()` 往 `searchTerms` 这个可观察对象的处理管道中加入了一系列 RxJS 操作符，用以缩减对 `searchHeroes()` 的调用次数，并最终返回一个可及时给出英雄搜索结果的可观察对象（每次都是 `Hero[]` ）。

Here's a closer look at the code.

代码如下：

<code-example path="toh-pt6/src/app/hero-search/hero-search.component.ts" header="src/app/hero-search/hero-search.component.ts" region="search">
</code-example>

Each operator works as follows:

各个操作符的工作方式如下：

* `debounceTime(300)` waits until the flow of new string events pauses for 300 milliseconds
before passing along the latest string. You'll never make requests more frequently than 300ms.

   在传出最终字符串之前，`debounceTime(300)` 将会等待，直到新增字符串的事件暂停了 300 毫秒。
  你实际发起请求的间隔永远不会小于 300ms。

* `distinctUntilChanged()` ensures that a request is sent only if the filter text changed.

   `distinctUntilChanged()` 会确保只在过滤条件变化时才发送请求。

* `switchMap()` calls the search service for each search term that makes it through `debounce()` and `distinctUntilChanged()`.
It cancels and discards previous search observables, returning only the latest search service observable.

   `switchMap()` 会为每个从 `debounce()` 和 `distinctUntilChanged()` 中通过的搜索词调用搜索服务。
  它会取消并丢弃以前的搜索可观察对象，只保留最近的。

<div class="alert is-helpful">

  With the [switchMap operator](http://www.learnrxjs.io/operators/transformation/switchmap.html),
  every qualifying key event can trigger an `HttpClient.get()` method call.
  Even with a 300ms pause between requests, you could have multiple HTTP requests in flight
  and they may not return in the order sent.

  借助 [switchMap 操作符](http://www.learnrxjs.io/operators/transformation/switchmap.html)，
  每个有效的击键事件都会触发一次 `HttpClient.get()` 方法调用。
  即使在每个请求之间都有至少 300ms 的间隔，仍然可能会同时存在多个尚未返回的 HTTP 请求。

  `switchMap()` preserves the original request order while returning only the observable from the most recent HTTP method call.
  Results from prior calls are canceled and discarded.

  `switchMap()` 会记住原始的请求顺序，只会返回最近一次 HTTP 方法调用的结果。
  以前的那些请求都会被取消和舍弃。

  Note that canceling a previous `searchHeroes()` Observable
  doesn't actually abort a pending HTTP request.
  Unwanted results are simply discarded before they reach your application code.

  注意，取消前一个 `searchHeroes()` 可观察对象并不会中止尚未完成的 HTTP 请求。
  那些不想要的结果只会在它们抵达应用代码之前被舍弃。

</div>

Remember that the component _class_ does not subscribe to the `heroes$` _observable_.
That's the job of the [`AsyncPipe`](#asyncpipe) in the template.

记住，组件类中并没有订阅 `heroes$` 这个可观察对象，而是由模板中的 [`AsyncPipe`](#asyncpipe) 完成的。

#### Try it

#### 试试看

Run the app again. In the *Dashboard*, enter some text in the search box.
If you enter characters that match any existing hero names, you'll see something like this.

再次运行本应用。在这个 *仪表盘* 中，在搜索框中输入一些文字。如果你输入的字符匹配上了任何现有英雄的名字，你将会看到如下效果：

<div class="lightbox">
  <img src='generated/images/guide/toh/toh-hero-search.png' alt="Hero Search Component">
</div>

## Final code review

## 查看最终代码

Your app should look like this <live-example></live-example>.

你的应用现在变成了这样：<live-example></live-example>。

Here are the code files discussed on this page (all in the `src/app/` folder).

本文讨论过的代码文件如下（都位于 `src/app/` 文件夹中）。

{@a heroservice}

{@a inmemorydataservice}

{@a appmodule}

#### `HeroService`, `InMemoryDataService`, `AppModule`

<code-tabs>
  <code-pane
    header="hero.service.ts"
    path="toh-pt6/src/app/hero.service.ts">
  </code-pane>
  <code-pane
    header="in-memory-data.service.ts"
    path="toh-pt6/src/app/in-memory-data.service.ts">
  </code-pane>
  <code-pane
    header="app.module.ts"
    path="toh-pt6/src/app/app.module.ts">
  </code-pane>
</code-tabs>

{@a heroescomponent}

#### `HeroesComponent`

<code-tabs>
  <code-pane
    header="heroes/heroes.component.html"
    path="toh-pt6/src/app/heroes/heroes.component.html">
  </code-pane>
  <code-pane
    header="heroes/heroes.component.ts"
    path="toh-pt6/src/app/heroes/heroes.component.ts">
  </code-pane>
  <code-pane
    header="heroes/heroes.component.css"
    path="toh-pt6/src/app/heroes/heroes.component.css">
  </code-pane>
</code-tabs>

{@a herodetailcomponent}

#### `HeroDetailComponent`

<code-tabs>
  <code-pane
    header="hero-detail/hero-detail.component.html"
    path="toh-pt6/src/app/hero-detail/hero-detail.component.html">
  </code-pane>
  <code-pane
    header="hero-detail/hero-detail.component.ts"
    path="toh-pt6/src/app/hero-detail/hero-detail.component.ts">
  </code-pane>
</code-tabs>

{@a dashboardcomponent}
#### `DashboardComponent`

<code-tabs>
  <code-pane
    header="src/app/dashboard/dashboard.component.html"
    path="toh-pt6/src/app/dashboard/dashboard.component.html">
  </code-pane>
</code-tabs>

{@a herosearchcomponent}

#### `HeroSearchComponent`

<code-tabs>
  <code-pane
    header="hero-search/hero-search.component.html"
    path="toh-pt6/src/app/hero-search/hero-search.component.html">
  </code-pane>
  <code-pane
    header="hero-search/hero-search.component.ts"
    path="toh-pt6/src/app/hero-search/hero-search.component.ts">
  </code-pane>
  <code-pane
    header="hero-search/hero-search.component.css"
    path="toh-pt6/src/app/hero-search/hero-search.component.css">
  </code-pane>
</code-tabs>

## Summary

## 小结

You're at the end of your journey, and you've accomplished a lot.

旅程即将结束，不过你已经收获颇丰。

* You added the necessary dependencies to use HTTP in the app.

   你添加了在应用程序中使用 HTTP 的必备依赖。

* You refactored `HeroService` to load heroes from a web API.

   你重构了 `HeroService`，以通过 web API 来加载英雄数据。

* You extended `HeroService` to support `post()`, `put()`, and `delete()` methods.

   你扩展了 `HeroService` 来支持 `post()`、`put()` 和 `delete()` 方法。

* You updated the components to allow adding, editing, and deleting of heroes.

   你修改了组件，以允许用户添加、编辑和删除英雄。

* You configured an in-memory web API.

   你配置了一个内存 Web API。

* You learned how to use observables.

   你学会了如何使用“可观察对象”。

This concludes the "Tour of Heroes" tutorial.
You're ready to learn more about Angular development in the fundamentals section,
starting with the [Architecture](guide/architecture "Architecture") guide.

《英雄指南》教程结束了。
如果你准备开始学习 Angular 开发的原理，请开始 [架构](guide/architecture "Architecture") 一章。
