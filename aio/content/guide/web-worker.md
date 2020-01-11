# Using web workers with Angular CLI

# 通过 Angular CLI 使用 Web Worker


[Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) allow you to run CPU intensive computations in a background thread, freeing the main thread to update the user interface.

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 允许你在后台线程中运行 CPU 密集型计算，解放主线程，以便更新用户界面。


If you find your application becomes unresponsive while processing data, using web workers can help.

如果你发现你的应用在处理数据时停止了响应，那么使用 Web Workers 可以为你提供帮助。


## Adding a web worker

## 添加一个 Web Worker


You can add a web worker anywhere in your application. If the file that contains your expensive computation is `src/app/app.component.ts`, you can add a web worker using `ng generate web-worker app`.

你可以在应用中的任何地方添加一个 Web Worker。假设包含沉重计算工作的文件是 `src/app/app.component.ts`，你可以使用 `ng generate web-worker app` 新增一个 Web Worker。


Running this command will:

运行这个命令会：


- configure your project to use web workers, if it isn't already.

  把你的项目配置成使用 Web Workers 的（如果尚未配置过）。

- add `src/app/app.worker.ts` with scaffolded code to receive messages:

  添加 `src/app/app.worker.ts` 文件，并添加用于接收消息的脚手架代码：

  <code-example language="typescript" header="src/app/app.worker.ts">
  addEventListener('message', ({ data }) => {
    const response = `worker response to ${data}`;
    postMessage(response);
  });
 </code-example>

- add scaffolded code to `src/app/app.component.ts` to use the worker:

  往 `src/app/app.component.ts` 中添加使用该 worker 的脚手架代码：

  <code-example language="typescript" header="src/app/app.component.ts">
  if (typeof Worker !== 'undefined') {
    // Create a new
    const worker = new Worker('./app.worker', { type: 'module' });
    worker.onmessage = ({ data }) => {
      console.log(`page got message: ${data}`);
    };
    worker.postMessage('hello');
  } else {
    // Web workers are not supported in this environment.
    // You should add a fallback so that your program still executes correctly.
  }
  </code-example>

After the initial scaffolding, you will need to refactor your code to use the web worker by sending messages to and from.

在完成了最初的脚手架之后，你需要重构代码，通过来回发送消息来使用 Web Worker。

## Caveats

## 警告


There are two important things to keep in mind when using web workers in Angular projects:

在 Angular 项目中使用 Web Workers 时，要记住两个重要事项：


- Some environments or platforms, like `@angular/platform-server` used in [Server-side Rendering](guide/universal), don't support web workers. You have to provide a fallback mechanism to perform the computations that the worker would perform to ensure your application will work in these environments.

  某些环境或平台（比如[服务端渲染](guide/universal)中使用的 `@angular/platform-server` 不支持 Web Workers。你必须提供一个后备机制来执行 Worker 要执行的计算，以确保你的应用能在那些环境中运行。

- Running Angular itself in a web worker via [**@angular/platform-webworker**](api/platform-webworker) is not yet supported in Angular CLI.

  Angular CLI 尚不支持通过 [**@angular/platform-webworker**](api/platform-webworker)在 Web Worker 中运行 Angular 自身。

