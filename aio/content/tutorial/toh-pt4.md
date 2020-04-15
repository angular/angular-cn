# Create services

# 服务

The Tour of Heroes `HeroesComponent` is currently getting and displaying fake data.

英雄指南的 `HeroesComponent` 目前获取和显示的都是模拟数据。

After the refactoring in this tutorial, `HeroesComponent` will be lean and focused on supporting the view.
It will also be easier to unit-test with a mock service.

本节课的重构完成之后，`HeroesComponent` 变得更精简，并且聚焦于为它的视图提供支持。这也让它更容易使用模拟服务进行单元测试。

## Why services

## 为什么需要服务

Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data.
They should focus on presenting data and delegate data access to a service.

组件不应该直接获取或保存数据，它们不应该了解是否在展示假数据。
它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务。

In this tutorial, you'll create a `HeroService` that all application classes can use to get heroes.
Instead of creating that service with the [`new` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new),
you'll rely on Angular [*dependency injection*](guide/dependency-injection)
to inject it into the `HeroesComponent` constructor.

本节课，你将创建一个 `HeroService`，应用中的所有类都可以使用它来获取英雄列表。
不要使用 [`new` 关键字](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)来创建此服务，而要依靠 Angular 的[*依赖注入*](guide/dependency-injection)机制把它注入到 `HeroesComponent` 的构造函数中。

Services are a great way to share information among classes that _don't know each other_.
You'll create a `MessageService` and inject it in two places.

服务是在多个“互相不知道”的类之间共享信息的好办法。
你将创建一个 `MessageService`，并且把它注入到两个地方：

1. Inject in HeroService, which uses the service to send a message.

   注入到 `HeroService` 中，它会使用该服务发送消息

2. Inject in MessagesComponent, which displays that message, and also displays the ID
when the user clicks a hero.

   注入到 `MessagesComponent` 中，它会显示其中的消息。当用户点击某个英雄时，它还会显示该英雄的 ID。

## Create the `HeroService`

## 创建 `HeroService`

Using the Angular CLI, create a service called `hero`.

使用 Angular CLI 创建一个名叫 `hero` 的服务。

<code-example language="sh" class="code-shell">
  ng generate service hero
</code-example>

The command generates a skeleton `HeroService` class in `src/app/hero.service.ts` as follows:

该命令会在 `src/app/hero.service.ts` 中生成 `HeroService` 类的骨架，代码如下：

<code-example path="toh-pt4/src/app/hero.service.1.ts" region="new"
 header="src/app/hero.service.ts (new service)"></code-example>


### `@Injectable()` services

### `@Injectable()` 服务

Notice that the new service imports the Angular `Injectable` symbol and annotates
the class with the `@Injectable()` decorator. This marks the class as one that participates in the _dependency injection system_. The `HeroService` class is going to provide an injectable service, and it can also have its own injected dependencies.
It doesn't have any dependencies yet, but [it will soon](#inject-message-service).

注意，这个新的服务导入了 Angular 的 `Injectable` 符号，并且给这个服务类添加了 `@Injectable()` 装饰器。
它把这个类标记为*依赖注入系统*的参与者之一。`HeroService` 类将会提供一个可注入的服务，并且它还可以拥有自己的待注入的依赖。
目前它还没有依赖，但是[很快就会有了](#inject-message-service)。

The `@Injectable()` decorator accepts a metadata object for the service, the same way the `@Component()` decorator did for your component classes.

`@Injectable()` 装饰器会接受该服务的元数据对象，就像 `@Component()` 对组件类的作用一样。

### Get hero data

### 获取英雄数据

The `HeroService` could get hero data from anywhere&mdash;a web service, local storage, or a mock data source.

`HeroService` 可以从任何地方获取数据：Web 服务、本地存储（LocalStorage）或一个模拟的数据源。

Removing data access from components means you can change your mind about the implementation anytime, without touching any components.
They don't know how the service works.

从组件中移除数据访问逻辑，意味着将来任何时候你都可以改变目前的实现方式，而不用改动任何组件。
这些组件不需要了解该服务的内部实现。

The implementation in _this_ tutorial will continue to deliver _mock heroes_.

这节课中的实现仍然会提供*模拟的英雄列表*。

Import the `Hero` and `HEROES`.

导入 `Hero` 和 `HEROES`。

<code-example path="toh-pt4/src/app/hero.service.ts" header="src/app/hero.service.ts" region="import-heroes">
</code-example>

Add a `getHeroes` method to return the _mock heroes_.

添加一个 `getHeroes` 方法，让它返回*模拟的英雄列表*。

<code-example path="toh-pt4/src/app/hero.service.1.ts" header="src/app/hero.service.ts" region="getHeroes">
</code-example>

{@a provide}

## Provide the `HeroService`

## 提供（provide） `HeroService`

You must make the `HeroService` available to the dependency injection system
before Angular can _inject_ it into the `HeroesComponent` by registering a _provider_. A provider is something that can create or deliver a service; in this case, it instantiates the `HeroService` class to provide the service.

你必须先注册一个*服务提供者*，来让 `HeroService` 在依赖注入系统中可用，Angular 才能把它注入到 `HeroesComponent` 中。所谓服务提供者就是某种可用来创建或交付一个服务的东西；在这里，它通过实例化 `HeroService` 类，来提供该服务。

To make sure that the `HeroService` can provide this service, register it
with the _injector_, which is the object that is responsible for choosing
and injecting the provider where the app requires it.

为了确保 `HeroService` 可以提供该服务，就要使用*注入器*来注册它。注入器是一个对象，负责当应用要求获取它的实例时选择和注入该提供者。

By default, the Angular CLI command `ng generate service` registers a provider with the _root injector_ for your service by including provider metadata, that is `providedIn: 'root'` in the `@Injectable()` decorator.

默认情况下，Angular CLI 命令 `ng generate service` 会通过给 `@Injectable()` 装饰器添加 `providedIn: 'root'` 元数据的形式，用*根注入器*将你的服务注册成为提供者。

```

@Injectable({
  providedIn: 'root',
})

```

When you provide the service at the root level, Angular creates a single, shared instance of `HeroService` and injects into any class that asks for it.
Registering the provider in the `@Injectable` metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.

当你在顶层提供该服务时，Angular 就会为 `HeroService` 创建一个单一的、共享的实例，并把它注入到任何想要它的类上。
在 `@Injectable` 元数据中注册该提供者，还能允许 Angular 通过移除那些完全没有用过的服务来进行优化。

<div class="alert is-helpful">

To learn more about providers, see the [Providers section](guide/providers).
To learn more about injectors, see the [Dependency Injection guide](guide/dependency-injection).

要了解关于提供者的更多知识，参见[提供者部分](guide/providers)。
要了解关于注入器的更多知识，参见[依赖注入指南](guide/dependency-injection)。

</div>

The `HeroService` is now ready to plug into the `HeroesComponent`.

现在 `HeroService` 已经准备好插入到 `HeroesComponent` 中了。

<div class="alert is-important">

This is an interim code sample that will allow you to provide and use the `HeroService`. At this point, the code will differ from the `HeroService` in the ["final code review"](#final-code-review).

这是一个过渡性的代码范例，它将会允许你提供并使用 `HeroService`。此刻的代码和[最终代码](#final-code-review)相差很大。

</div>

## Update `HeroesComponent`

## 修改 `HeroesComponent`

Open the `HeroesComponent` class file.

打开 `HeroesComponent` 类文件。

Delete the `HEROES` import, because you won't need that anymore.
Import the `HeroService` instead.

删除 `HEROES` 的导入语句，因为你以后不会再用它了。
转而导入 `HeroService`。

<code-example path="toh-pt4/src/app/heroes/heroes.component.ts" header="src/app/heroes/heroes.component.ts (import HeroService)" region="hero-service-import">
</code-example>

Replace the definition of the `heroes` property with a simple declaration.

把 `heroes` 属性的定义改为一句简单的声明。

<code-example path="toh-pt4/src/app/heroes/heroes.component.ts" header="src/app/heroes/heroes.component.ts" region="heroes">
</code-example>

{@a inject}

### Inject the `HeroService`

### 注入 `HeroService`

Add a private `heroService` parameter of type `HeroService` to the constructor.

往构造函数中添加一个私有的 `heroService`，其类型为 `HeroService`。

<code-example path="toh-pt4/src/app/heroes/heroes.component.ts" header="src/app/heroes/heroes.component.ts" region="ctor">
</code-example>

The parameter simultaneously defines a private `heroService` property and identifies it as a `HeroService` injection site.

这个参数同时做了两件事：1. 声明了一个私有 `heroService` 属性，2. 把它标记为一个 `HeroService` 的注入点。

When Angular creates a `HeroesComponent`, the [Dependency Injection](guide/dependency-injection) system
sets the `heroService` parameter to the singleton instance of `HeroService`.

当 Angular 创建 `HeroesComponent` 时，[依赖注入](guide/dependency-injection)系统就会把这个 `heroService` 参数设置为 `HeroService` 的单例对象。

### Add `getHeroes()`

### 添加 _getHeroes()_

Create a function to retrieve the heroes from the service.

创建一个函数，以从服务中获取这些英雄数据。

<code-example path="toh-pt4/src/app/heroes/heroes.component.1.ts" header="src/app/heroes/heroes.component.ts" region="getHeroes">
</code-example>

{@a oninit}

### Call it in `ngOnInit()`

### 在 `ngOnInit()` 中调用它

While you could call `getHeroes()` in the constructor, that's not the best practice.

你固然可以在构造函数中调用 `getHeroes()`，但那不是最佳实践。

Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
The constructor shouldn't _do anything_.
It certainly shouldn't call a function that makes HTTP requests to a remote server as a _real_ data service would.

让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。
构造函数不应该*做任何事*。
它当然不应该调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。

Instead, call `getHeroes()` inside the [*ngOnInit lifecycle hook*](guide/lifecycle-hooks) and
let Angular call `ngOnInit()` at an appropriate time _after_ constructing a `HeroesComponent` instance.

而是选择在 [*ngOnInit 生命周期钩子*](guide/lifecycle-hooks)中调用 `getHeroes()`，之后 Angular 会在构造出 `HeroesComponent` 的实例之后的某个合适的时机调用 `ngOnInit()`。

<code-example path="toh-pt4/src/app/heroes/heroes.component.ts" header="src/app/heroes/heroes.component.ts" region="ng-on-init">
</code-example>

### See it run

### 查看运行效果

After the browser refreshes, the app should run as before,
showing a list of heroes and a hero detail view when you click on a hero name.

刷新浏览器，该应用仍运行的一如既往。
显示英雄列表，并且当你点击某个英雄的名字时显示出英雄详情视图。

## Observable data

## 可观察（Observable）的数据

The `HeroService.getHeroes()` method has a _synchronous signature_,
which implies that the `HeroService` can fetch heroes synchronously.
The `HeroesComponent` consumes the `getHeroes()` result
as if heroes could be fetched synchronously.

`HeroService.getHeroes()` 的函数签名是*同步的*，它所隐含的假设是 `HeroService` 总是能同步获取英雄列表数据。
而 `HeroesComponent` 也同样假设能同步取到 `getHeroes()` 的结果。

<code-example path="toh-pt4/src/app/heroes/heroes.component.1.ts" header="src/app/heroes/heroes.component.ts" region="get-heroes">
</code-example>

This will not work in a real app.
You're getting away with it now because the service currently returns _mock heroes_.
But soon the app will fetch heroes from a remote server,
which is an inherently _asynchronous_ operation.

这在真实的应用中几乎是不可能的。
现在能这么做，只是因为目前该服务返回的是*模拟数据*。
不过很快，该应用就要从远端服务器获取英雄数据了，而那天生就是*异步*操作。

The `HeroService` must wait for the server to respond,
`getHeroes()` cannot return immediately with hero data,
and the browser will not block while the service waits.

`HeroService` 必须等服务器给出响应，
而 `getHeroes()` 不能立即返回英雄数据，
浏览器也不会在该服务等待期间停止响应。

`HeroService.getHeroes()` must have an _asynchronous signature_ of some kind.

`HeroService.getHeroes()` 必须具有某种形式的*异步函数签名*。

In this tutorial, `HeroService.getHeroes()` will return an `Observable`
because it will eventually use the Angular `HttpClient.get` method to fetch the heroes
and [`HttpClient.get()` returns an `Observable`](guide/http).

这节课，`HeroService.getHeroes()` 将会返回 `Observable`，部分原因在于它最终会使用 Angular 的 `HttpClient.get` 方法来获取英雄数据，而 [`HttpClient.get()` 会返回 `Observable`](guide/http)。

### Observable `HeroService`

### 可观察对象版本的 `HeroService`

`Observable` is one of the key classes in the [RxJS library](http://reactivex.io/rxjs/).

`Observable` 是 [RxJS 库](http://reactivex.io/rxjs/)中的一个关键类。

In a [later tutorial on HTTP](tutorial/toh-pt6), you'll learn that Angular's `HttpClient` methods return RxJS `Observable`s.
In this tutorial, you'll simulate getting data from the server with the RxJS `of()` function.

在[稍后的 HTTP 教程](tutorial/toh-pt6)中，你就会知道 Angular `HttpClient` 的方法会返回 RxJS 的 `Observable`。
这节课，你将使用 RxJS 的 `of()` 函数来模拟从服务器返回数据。

Open the `HeroService` file and import the `Observable` and `of` symbols from RxJS.

打开 `HeroService` 文件，并从 RxJS 中导入 `Observable` 和 `of` 符号。

<code-example path="toh-pt4/src/app/hero.service.ts" header="src/app/hero.service.ts (Observable imports)" region="import-observable">
</code-example>

Replace the `getHeroes()` method with the following:

把 `getHeroes()` 方法改成这样：

<code-example path="toh-pt4/src/app/hero.service.ts" header="src/app/hero.service.ts" region="getHeroes-1"></code-example>

`of(HEROES)` returns an `Observable<Hero[]>` that emits  _a single value_, the array of mock heroes.

`of(HEROES)` 会返回一个  `Observable<Hero[]>`，它会发出单个值，这个值就是这些模拟英雄的数组。

<div class="alert is-helpful">

In the [HTTP tutorial](tutorial/toh-pt6), you'll call `HttpClient.get<Hero[]>()` which also returns an `Observable<Hero[]>` that emits  _a single value_, an array of heroes from the body of the HTTP response.

在 [HTTP 教程](tutorial/toh-pt6)中，你将会调用 `HttpClient.get<Hero[]>()` 它也同样返回一个 `Observable<Hero[]>`，它也会发出单个值，这个值就是来自 HTTP 响应体中的英雄数组。

</div>

### Subscribe in `HeroesComponent`

### 在 `HeroesComponent` 中订阅

The `HeroService.getHeroes` method used to return a `Hero[]`.
Now it returns an `Observable<Hero[]>`.

`HeroService.getHeroes` 方法之前返回一个 `Hero[]`，
现在它返回的是 `Observable<Hero[]>`。

You'll have to adjust to that difference in `HeroesComponent`.

你必须在 `HeroesComponent` 中也向本服务中的这种形式看齐。

Find the `getHeroes` method and replace it with the following code
(shown side-by-side with the previous version for comparison)

找到 `getHeroes` 方法，并且把它替换为如下代码（和前一个版本对比显示）：

<code-tabs>

  <code-pane header="heroes.component.ts (Observable)"
    path="toh-pt4/src/app/heroes/heroes.component.ts" region="getHeroes">
  </code-pane>

  <code-pane header="heroes.component.ts (Original)"
    path="toh-pt4/src/app/heroes/heroes.component.1.ts" region="getHeroes">
  </code-pane>

</code-tabs>

`Observable.subscribe()` is the critical difference.

`Observable.subscribe()` 是关键的差异点。

The previous version assigns an array of heroes to the component's `heroes` property.
The assignment occurs _synchronously_, as if the server could return heroes instantly
or the browser could freeze the UI while it waited for the server's response.

上一个版本把英雄的数组赋值给了该组件的 `heroes` 属性。
这种赋值是*同步*的，这里包含的假设是服务器能立即返回英雄数组或者浏览器能在等待服务器响应时冻结界面。

That _won't work_ when the `HeroService` is actually making requests of a remote server.

当 `HeroService` 真的向远端服务器发起请求时，这种方式就行不通了。

The new version waits for the `Observable` to emit the array of heroes&mdash;which
could happen now or several minutes from now.
The `subscribe()` method passes the emitted array to the callback,
which sets the component's `heroes` property.

新的版本等待 `Observable` 发出这个英雄数组，这可能立即发生，也可能会在几分钟之后。
然后，`subscribe()` 方法把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 `heroes` 属性。

This asynchronous approach _will work_ when
the `HeroService` requests heroes from the server.

使用这种异步方式，当 `HeroService` 从远端服务器获取英雄数据时，就*可以工作了*。

## Show messages

## 显示消息

This section guides you through the following:

这一节将指导你：

* adding a `MessagesComponent` that displays app messages at the bottom of the screen

   添加一个 `MessagesComponent`，它在屏幕的底部显示应用中的消息。

* creating an injectable, app-wide `MessageService` for sending messages to be displayed

   创建一个可注入的、全应用级别的 `MessageService`，用于发送要显示的消息。

* injecting `MessageService` into the `HeroService`

   把 `MessageService` 注入到 `HeroService` 中。

* displaying a message when `HeroService` fetches heroes successfully

   当 `HeroService` 成功获取了英雄数据时显示一条消息。

### Create `MessagesComponent`

### 创建 `MessagesComponent`

Use the CLI to create the `MessagesComponent`.

使用 CLI 创建 `MessagesComponent`。

<code-example language="sh" class="code-shell">
  ng generate component messages
</code-example>

The CLI creates the component files in the `src/app/messages` folder and declares the `MessagesComponent` in `AppModule`.

CLI 在 `src/app/messages` 中创建了组件文件，并且把 `MessagesComponent` 声明在了 `AppModule` 中。

Modify the `AppComponent` template to display the generated `MessagesComponent`.

修改 `AppComponent` 的模板来显示所生成的 `MessagesComponent`：

<code-example
  header = "src/app/app.component.html"
  path="toh-pt4/src/app/app.component.html">
</code-example>

You should see the default paragraph from `MessagesComponent` at the bottom of the page.

你可以在页面的底部看到来自的 `MessagesComponent` 的默认内容。

### Create the `MessageService`

### 创建 `MessageService`

Use the CLI to create the `MessageService` in `src/app`.

使用 CLI 在 `src/app` 中创建 `MessageService`。

<code-example language="sh" class="code-shell">
  ng generate service message
</code-example>

Open `MessageService` and replace its contents with the following.

打开 `MessageService`，并把它的内容改成这样：

<code-example header = "src/app/message.service.ts" path="toh-pt4/src/app/message.service.ts">
</code-example>

The service exposes its cache of `messages` and two methods: one to `add()` a message to the cache and another to `clear()` the cache.

该服务对外暴露了它的 `messages` 缓存，以及两个方法：`add()` 方法往缓存中添加一条消息，`clear()` 方法用于清空缓存。

{@a inject-message-service}

### Inject it into the `HeroService`

### 把它注入到 `HeroService` 中

In `HeroService`, import the `MessageService`.

在 `HeroService` 中导入 `MessageService`。

<code-example
  header = "src/app/hero.service.ts (import MessageService)"
  path="toh-pt4/src/app/hero.service.ts" region="import-message-service">
</code-example>

Modify the constructor with a parameter that declares a private `messageService` property.
Angular will inject the singleton `MessageService` into that property
when it creates the `HeroService`.

修改这个构造函数，添加一个私有的 `messageService` 属性参数。
Angular 将会在创建 `HeroService` 时把 `MessageService` 的单例注入到这个属性中。

<code-example
  path="toh-pt4/src/app/hero.service.ts" header="src/app/hero.service.ts" region="ctor">
</code-example>

<div class="alert is-helpful">

This is a typical "*service-in-service*" scenario:
you inject the `MessageService` into the `HeroService` which is injected into the `HeroesComponent`.

这是一个典型的“服务中的服务”场景：
你把 `MessageService` 注入到了 `HeroService` 中，而 `HeroService` 又被注入到了 `HeroesComponent` 中。

</div>

### Send a message from `HeroService`

### 从 `HeroService` 中发送一条消息

Modify the `getHeroes()` method to send a message when the heroes are fetched.

修改 `getHeroes()` 方法，在获取到英雄数组时发送一条消息。

<code-example path="toh-pt4/src/app/hero.service.ts" header="src/app/hero.service.ts" region="getHeroes">
</code-example>

### Display the message from `HeroService`

### 从 `HeroService` 中显示消息

The `MessagesComponent` should display all messages,
including the message sent by the `HeroService` when it fetches heroes.

`MessagesComponent` 可以显示所有消息，
包括当 `HeroService` 获取到英雄数据时发送的那条。

Open `MessagesComponent` and import the `MessageService`.

打开 `MessagesComponent`，并且导入 `MessageService`。

<code-example header="src/app/messages/messages.component.ts (import MessageService)" path="toh-pt4/src/app/messages/messages.component.ts" region="import-message-service">
</code-example>

Modify the constructor with a parameter that declares a **public** `messageService` property.
Angular will inject the singleton `MessageService` into that property
when it creates the `MessagesComponent`.

修改构造函数，添加一个 **public** 的 `messageService` 属性。
Angular 将会在创建 `MessagesComponent` 的实例时 把 `MessageService` 的实例注入到这个属性中。

<code-example path="toh-pt4/src/app/messages/messages.component.ts" header="src/app/messages/messages.component.ts" region="ctor">
</code-example>

The `messageService` property **must be public** because you're going to bind to it in the template.

这个 `messageService` 属性必须是公共属性，因为你将会在模板中绑定到它。

<div class="alert is-important">

Angular only binds to _public_ component properties.

Angular 只会绑定到组件的*公共*属性。

</div>

### Bind to the `MessageService`

### 绑定到 `MessageService`

Replace the CLI-generated `MessagesComponent` template with the following.

把 CLI 生成的 `MessagesComponent` 的模板改成这样：

<code-example
  header = "src/app/messages/messages.component.html"
  path="toh-pt4/src/app/messages/messages.component.html">
</code-example>

This template binds directly to the component's `messageService`.

这个模板直接绑定到了组件的 `messageService` 属性上。

* The `*ngIf` only displays the messages area if there are messages to show.

   `*ngIf` 只有在有消息时才会显示消息区。

* An `*ngFor` presents the list of messages in repeated `<div>` elements.

   `*ngFor` 用来在一系列 `<div>` 元素中展示消息列表。

* An Angular [event binding](guide/template-syntax#event-binding) binds the button's click event
to `MessageService.clear()`.

   Angular 的[事件绑定](guide/template-syntax#event-binding)把按钮的 `click` 事件绑定到了 `MessageService.clear()`。

The messages will look better when you add the private CSS styles to `messages.component.css`
as listed in one of the ["final code review"](#final-code-review) tabs below.

当你把 [最终代码](#final-code-review) 某一页的内容添加到 `messages.component.css` 中时，这些消息会变得好看一些。

## Add additional messages to hero service

## 为 hero 服务添加额外的消息

The following example shows how to send and display a message each time the user clicks on
a hero, showing a history of the user's selections. This will be helpful when you get to the
next section on [Routing](tutorial/toh-pt5).

下面的例子展示了当用户点击某个英雄时，如何发送和显示一条消息，以及如何显示该用户的选取历史。当你学到后面的[路由](tutorial/toh-pt5)一章时，这会很有帮助。

<code-example header="src/app/heroes/heroes.component.ts"
path="toh-pt4/src/app/heroes/heroes.component.ts">
</code-example>

The browser refreshes and the page displays the list of heroes.
Refresh the browser to see the list of heroes, and scroll to the bottom to see the
messages from the HeroService. Each time you click a hero, a new message appears to record
the selection. Use the "clear" button to clear the message history.

刷新浏览器，页面显示出了英雄列表。
滚动到底部，就会在消息区看到来自 `HeroService` 的消息。
点击“清空”按钮，消息区不见了。

{@a final-code-review}

## Final code review

## 查看最终代码

Here are the code files discussed on this page and your app should look like this <live-example></live-example>.

你的应用应该变成了这样 <live-example></live-example>。本页所提及的代码文件如下：

<code-tabs>

  <code-pane header="src/app/hero.service.ts"
  path="toh-pt4/src/app/hero.service.ts">
  </code-pane>

  <code-pane header="src/app/message.service.ts"
  path="toh-pt4/src/app/message.service.ts">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component.ts"
  path="toh-pt4/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane header="src/app/messages/messages.component.ts"
  path="toh-pt4/src/app/messages/messages.component.ts">
  </code-pane>

  <code-pane header="src/app/messages/messages.component.html"
  path="toh-pt4/src/app/messages/messages.component.html">
  </code-pane>

  <code-pane header="src/app/messages/messages.component.css"
  path="toh-pt4/src/app/messages/messages.component.css">
  </code-pane>

  <code-pane header="src/app/app.module.ts"
  path="toh-pt4/src/app/app.module.ts">
  </code-pane>

  <code-pane header="src/app/app.component.html"
  path="toh-pt4/src/app/app.component.html">
  </code-pane>

</code-tabs>

## Summary

## 小结

* You refactored data access to the `HeroService` class.

   你把数据访问逻辑重构到了 `HeroService` 类中。

* You registered the `HeroService` as the _provider_ of its service at the root level so that it can be injected anywhere in the app.

   你在根注入器中把 `HeroService` 注册为该服务的提供者，以便在别处可以注入它。

* You used [Angular Dependency Injection](guide/dependency-injection) to inject it into a component.

   你使用 [Angular 依赖注入](guide/dependency-injection)机制把它注入到了组件中。

* You gave the `HeroService` _get data_ method an asynchronous signature.

   你给 `HeroService` 中获取数据的方法提供了一个异步的函数签名。

* You discovered `Observable` and the RxJS _Observable_ library.

   你发现了 `Observable` 以及 RxJS 库。

* You used RxJS `of()` to return an observable of mock heroes (`Observable<Hero[]>`).

   你使用 RxJS 的 `of()` 方法返回了一个模拟英雄数据的*可观察对象* (`Observable<Hero[]>`)。

* The component's `ngOnInit` lifecycle hook calls the `HeroService` method, not the constructor.

   在组件的 `ngOnInit` 生命周期钩子中调用 `HeroService` 方法，而不是构造函数中。

* You created a `MessageService` for loosely-coupled communication between classes.

   你创建了一个 `MessageService`，以便在类之间实现松耦合通讯。

* The `HeroService` injected into a component is created with another injected service,
 `MessageService`.

   `HeroService` 连同注入到它的服务 `MessageService` 一起，注入到了组件中。
