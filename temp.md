### Using absolute URLs for HTTP (data) requests on the server

### 在服务器端使用HTTP（数据）请求的绝对URL


The tutorial's `HeroService` and `HeroSearchService` delegate to the Angular `HttpClient` module to fetch application data.
These services send requests to *relative* URLs such as `api/heroes`.
In a server-side rendered app, HTTP URLs must be *absolute* (for example, `https://my-server.com/api/heroes`).
This means that the URLs must be somehow converted to absolute when running on the server and be left relative when running in the browser.

本教程的`HeroService`和`HeroSearchService`委托给Angular `HttpClient`模块来获取应用数据。这些服务会向`api/heroes`类的*相对* URL发送请求。在服务器端呈现的应用中，HTTP URL必须是*绝对的* （例如， `https://my-server.com/api/heroes` ）。这意味着当在服务器上运行时，URL必须以某种方式转换为绝对值，并且当在浏览器中运行时，它们是相对的。


If you are using one of the `@nguniversal/*-engine` packages (such as `@nguniversal/express-engine`), this is taken care for you automatically.
You don't need to do anything to make relative URLs work on the server.

如果你正在使用其中一个`@nguniversal/*-engine`软件包（例如`@nguniversal/express-engine` ），这会自动为你服务。你无需做任何事情来让相对URL在服务器上运行。


If, for some reason, you are not using an `@nguniversal/*-engine` package, you may need to handle it yourself.

如果，出于某种原因，你没有使用`@nguniversal/*-engine`包，你可能需要亲自处理它。


The recommended solution is to pass the full request URL to the `options` argument of [renderModule()](api/platform-server/renderModule) or [renderModuleFactory()](api/platform-server/renderModuleFactory) (depending on what you use to render `AppServerModule` on the server).
This option is the least intrusive as it does not require any changes to the app.
Here, "request URL" refers to the URL of the request as a response to which the app is being rendered on the server.
For example, if the client requested `https://my-server.com/dashboard` and you are rendering the app on the server to respond to that request, `options.url` should be set to `https://my-server.com/dashboard`.

建议的解决方案是将完整的请求URL传递给[renderModule（）](api/platform-server/renderModule)或[renderModuleFactory（）](api/platform-server/renderModuleFactory)的`options`参数（具体取决于你在服务器上渲染`AppServerModule`用途）。此选项的侵入性最小，因为它不需要对应用进行任何更改。这里，“request URL”指的是请求的URL，作为应用在服务器上呈现的响应。例如，如果客户端请求了`https://my-server.com/dashboard`并且要在服务器上渲染该应用来响应该请求，那么`options.url`应设置为`https://my-server.com/dashboard` 。


Now, on every HTTP request made as part of rendering the app on the server, Angular can correctly resolve the request URL to an absolute URL, using the provided `options.url`.

现在，作为在服务器上呈现应用的一部分，每次HTTP请求，Angular都可以使用提供的`options.url`正确地将请求URL解析为绝对URL。

