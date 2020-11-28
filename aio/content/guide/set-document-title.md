{@a top}

# Set the document title

# 设置文档标题

Your app should be able to make the browser title bar say whatever you want it to say.
This cookbook explains how to do it.

你的应用应该能让浏览器标题栏显示你想让它显示的内容。本文会解释怎么做。

See the <live-example name="set-document-title"></live-example>.

参阅<live-example name="set-document-title"></live-example>

## The problem with *&lt;title&gt;*

## *&lt;title&gt;*的问题

The obvious approach is to bind a property of the component to the HTML `<title>` like this:

显而易见的方法是把组件的属性绑定到 HTML 的 `<title>` 标签上，像这样：

<code-example format=''>
  &lt;title&gt;{{This_Does_Not_Work}}&lt;/title&gt;
</code-example>

Sorry but that won't work.
The root component of the application is an element contained within the `<body>` tag.
The HTML `<title>` is in the document `<head>`, outside the body, making it inaccessible to Angular data binding.

抱歉，这样不行。应用程序的根组件是一个包含在 `<body>` 标签里的元素。该 HTML 的 `<title>` 在文档的 `<head>` 元素里，在 `<body>` 之外，Angular 的数据绑定无法访问到它。

You could grab the browser `document` object and set the title manually.
That's dirty and undermines your chances of running the app outside of a browser someday.

可以从浏览器获得 `document` 对象，并且手动设置标题。但是这样看起来很脏，而且将无法在浏览器之外运行应用程序。

<div class="alert is-helpful">

  Running your app outside a browser means that you can take advantage of server-side
  pre-rendering for near-instant first app render times and for SEO. It means you could run from
  inside a Web Worker to improve your app's responsiveness by using multiple threads. And it
  means that you could run your app inside Electron.js or Windows Universal to deliver it to the desktop.

  在浏览器外运行应用程序意味着：利用服务器端预先渲染，为应用程序实现几乎实时的首次渲染，同时还能支持 SEO(搜索引擎优化)。
意味着你可以在一个 Web Worker 中运行你的应用程序，通过多线程技术增强应用程序的响应性。
还意味着你可以在 Electron.js 或者 Windows Universal 里面运行，发布到桌面环境。

</div>

## Use the `Title` service

## 使用 `Title` 服务

Fortunately, Angular bridges the gap by providing a `Title` service as part of the *Browser platform*.
The [Title](api/platform-browser/Title) service is a simple class that provides an API
for getting and setting the current HTML document title:

幸运的是，Angular 在*浏览器平台*的包中，提供了一个 `Title` 服务，弥补了这种差异。
[Title](api/platform-browser/Title)服务是一个简单的类，提供了一个 API，用来获取和设置当前 HTML 文档的标题。

* `getTitle() : string`&mdash;Gets the title of the current HTML document.

   `getTitle(): string` —— 获取当前 HTML 文档的标题。

* `setTitle( newTitle : string )`&mdash;Sets the title of the current HTML document.

   `setTitle( newTitle: string)` —— 设置当前 HTML 文档的标题。

You can inject the `Title` service into the root `AppComponent` and expose a bindable `setTitle` method that calls it:

你可以把 `Title` 服务注入到根组件 `AppComponent`，并暴露出可供绑定的 `setTitle` 方法让别人来调用该服务：

<code-example path="set-document-title/src/app/app.component.ts" region="class" header="src/app/app.component.ts (class)"></code-example>

Bind that method to three anchor tags and voilà!

把这个方法绑定到三个 A 标签，瞧瞧！

<div class="lightbox">
  <img src="generated/images/guide/set-document-title/set-title-anim.gif" alt="Set title">
</div>

Here's the complete solution:

这里是完整的方案(代码)。

<code-tabs>
  <code-pane header="src/main.ts" path="set-document-title/src/main.ts"></code-pane>
  <code-pane header="src/app/app.module.ts" path="set-document-title/src/app/app.module.ts"></code-pane>
  <code-pane header="src/app/app.component.ts" path="set-document-title/src/app/app.component.ts"></code-pane>
</code-tabs>

## Why provide the `Title` service in `bootstrap`

## 为什么要在 *bootstrap* 里面提供这个 *Title* 服务

Generally you want to provide application-wide services in the root application component, `AppComponent`.

你通常会在应用程序的根组件 `AppComponent` 中提供应用程序级的服务。

This cookbook recommends registering the title service during bootstrapping,
a location you reserve for configuring the runtime Angular environment.

但这里，要在引导过程中注册这个 Title 服务，这个位置是为你设置 Angular 运行环境而保留的。

That's exactly what you're doing.
The `Title` service is part of the Angular *browser platform*.
If you bootstrap your application into a different platform,
you'll have to provide a different `Title` service that understands
the concept of a "document title" for that specific platform.
Ideally, the application itself neither knows nor cares about the runtime environment.

你的做法正是如此。这里的 `Title` 服务是 Angular*浏览器平台*的一部分。如果在其它平台上引导应用程序，就得提供另一个专为那个平台准备的 `Title` 服务。
