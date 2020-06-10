# Background processing using web workers

# 用 Web Worker 处理后台进程

[Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) allow you to run CPU-intensive computations in a background thread,
freeing the main thread to update the user interface.
If you find your application performs a lot of computations, such as generating CAD drawings or doing heavy geometrical calculations, using web workers can help increase your application's performance.

[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)允许你在后台线程中运行 CPU 密集型计算，解放主线程以更新用户界面。如果你发现你的应用会进行很多计算，比如生成 CAD 图纸或进行繁重的几何计算，那么使用 Web Worker 可以帮助你提高应用的性能。

<div class="alert is-helpful">

The CLI does not support running Angular itself in a web worker.

CLI 不支持在 Web Worker 中运行 Angular。

</div>

## Adding a web worker

## 添加一个 Web Worker

To add a web worker to an existing project, use the Angular CLI `ng generate` command.

要把 Web Worker 添加到现有项目中，请使用 Angular CLI `ng generate` 命令。

`ng generate web-worker` *location*

`ng generate web-worker` *生成到的位置*

You can add a web worker anywhere in your application.
For example, to add a web worker to the root component, `src/app/app.component.ts`, run the following command.

你可以在应用的任何位置添加 Web Worker。例如，要把一个 Web Worker 添加到根组件 `src/app/app.component.ts`，请运行如下命令。

`ng generate web-worker app`

The command performs the following actions.

该命令会执行以下操作。

- Configures your project to use web workers, if it isn't already.

  把你的项目配置为使用 Web Worker，如果还没有的话。

- Adds the following scaffold code to `src/app/app.worker.ts` to  receive messages.

  把如下脚手架代码添加到 `src/app/app.worker.ts` 以接收消息。

  <code-example language="typescript" header="src/app/app.worker.ts">
  addEventListener('message', ({ data }) => {
    const response = `worker response to ${data}`;
    postMessage(response);
  });
 </code-example>

- Adds the following scaffold code to `src/app/app.component.ts` to use the worker.

  把如下脚手架代码添加到 `src/app/app.component.ts` 以使用这个 Worker。

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

After you generate this initial scaffold, you must refactor your code to use the web worker by sending messages to and from the worker.

生成这个初始脚手架之后，你必须把代码重构成向这个 Worker 发送消息和从 Worker 接收消息，以便使用 Web Worker。

<div class="alert is-important">

Some environments or platforms, such as `@angular/platform-server` used in [Server-side Rendering](guide/universal), don't support web workers. To ensure that your application will work in these environments, you must provide a fallback mechanism to perform the computations that the worker would otherwise perform.

某些环境或平台（比如[服务端渲染](guide/universal)中使用的 `@angular/platform-server` 不支持 Web Worker。为了确保你的应用能够在这些环境中工作，你必须提供一个回退机制来执行本来要由这个 Worker 执行的计算。

</div>
