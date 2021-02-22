# NgZone

A zone is an execution context that persists across async tasks. You can think of it as [thread-local storage](https://en.wikipedia.org/wiki/Thread-local_storage) for JavaScript VMs.
This guide describes how to use Angular's NgZone to automatically detect changes in the component to update HTML.

Zone 是跨异步任务而持久存在的执行上下文。你可以将其视为 JavaScript VM 中的[线程本地存储](https://en.wikipedia.org/wiki/Thread-local_storage)。本指南介绍了如何使用 Angular 的 的 NgZone 自动检测组件中的更改以更新 HTML。

## Fundamentals of change detection

## 变更检测的基础

To understand the benefits of `NgZone`, it is important to have a clear grasp of what change detection is and how it works.

要理解 `NgZone` 的好处，重要的是要清楚地了解什么是变更检测以及它的工作原理。

### Displaying and updating data in Angular

### 在 Angular 中显示和更新数据

In Angular, you can display data by binding controls in an HTML template to the properties of an Angular component.

在 Angular 中，你可以通过把 HTML 模板中的控件绑定到 Angular 组件的属性来显示数据。

<code-example path="displaying-data/src/app/app.component.1.ts" header="src/app/app.component.ts"></code-example>

In addition, you can bind DOM events to a method of an Angular component. In such methods, you can also update a property of the Angular component, which updates the corresponding data displayed in the template.

另外，你也可以将 DOM 事件绑定到 Angular 组件中的方法。在此类方法中，你还可以更新 Angular 组件的属性，该属性将更新模板中显示的相应数据。

<code-example path="user-input/src/app/click-me.component.ts" region="click-me-component" header="src/app/click-me.component.ts"></code-example>

In both of the above examples, the component's code updates only the property of the component.
However, the HTML is also updated automatically.
This guide describes how and when Angular renders the HTML based on the data from the Angular component.

在以上两个示例中，组件的代码仅更新组件的属性。但是，HTML 也会自动更新。本指南介绍了 Angular 如何以及何时根据 Angular 组件中的数据渲染 HTML。

### Detecting changes with plain JavaScript

### 使用普通（Plain） JavaScript 检测更改

To clarify how changes are detected and values updated, consider the following code written in plain JavaScript.

为了阐明如何检测到更改和更新值，请考虑以下用普通 JavaScript 编写的代码。

```javascript
<html>
  <div id="dataDiv"></div>
  <button id="btn">updateData</button>
  <canvas id="canvas"></canvas>
  <script>
    let value = 'initialValue';
    // initial rendering
    detectChange();

    function renderHTML() {
      document.getElementById('dataDiv').innerText = value;
    }

    function detectChange() {
      const currentValue = document.getElementById('dataDiv').innerText;
      if (currentValue !== value) {
        renderHTML();
      }
    }

    // Example 1: update data inside button click event handler
    document.getElementById('btn').addEventListener('click', () => {
      // update value
      value = 'button update value';
      // call detectChange manually
      detectChange();
    });

    // Example 2: HTTP Request
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
      // get response from server
      value = this.responseText;
      // call detectChange manually
      detectChange();
    });
    xhr.open('GET', serverUrl);
    xhr.send();

    // Example 3: setTimeout
    setTimeout(() => {
      // update value inside setTimeout callback
      value = 'timeout update value';
      // call detectChange manually
      detectChange();
    }, 100);

    // Example 4: Promise.then
    Promise.resolve('promise resolved a value').then(v => {
      // update value inside Promise thenCallback
      value = v;
      // call detectChange manually
      detectChange();
    }, 100);

    // Example 5: some other asynchronous APIs
    document.getElementById('canvas').toBlob(blob => {
      // update value when blob data is created from the canvas
      value = `value updated by canvas, size is ${blob.size}`;
      // call detectChange manually
      detectChange();
    });
  </script>
</html>
```

After you update the data, you need to call `detectChange()` manually to check whether the data changed.
If the data changed, you render the HTML to reflect the updated data.

更新数据后，需要调用 `detectChange()` 来检查数据是否已更改。如果数据已更改，则渲染 HTML 以反映更新的数据。

In Angular, this step is unnecessary. Whenever you update the data, your HTML is updated automatically.

在 Angular 中，此步骤是不必要的。每当你更新数据时，你的 HTML 都会自动更新。

### When apps update HTML

### 应用何时更新 HTML

To understand how change detection works, first consider when the application needs to update the HTML. Typically, updates occur for one of the following reasons:

要了解变更检测的工作原理，请首先考虑应用程序何时需要更新 HTML。通常，会由于以下原因之一而发生更新：

1. Component initialization. For example, when bootstrapping an Angular application, Angular loads the bootstrap component and triggers the [ApplicationRef.tick()](api/core/ApplicationRef#tick) to call change detection and View Rendering.

   组件初始化。例如，当引导 Angular 应用程序时，Angular 会加载引导组件并触发 [ApplicationRef.tick()](api/core/ApplicationRef#tick) 来调用变更检测和视图渲染。

1. Event listener. The DOM event listener can update the data in an Angular component and also trigger change detection, as in the following example.

   事件监听器。 DOM 事件侦听器可以更新 Angular 组件中的数据，还可以触发变更检测，如下例所示。

<code-example path="user-input/src/app/click-me.component.ts" region="click-me-component" header="src/app/click-me.component.ts"></code-example>

3. HTTP Data Request. You can also get data from a server through an HTTP request. For example:

   HTTP 数据请求。你还可以通过 HTTP 请求从服务器获取数据。例如：

```typescript
@Component({
  selector: 'app-root',
  template: '<div>{{data}}</div>';
})
export class AppComponent implements OnInit {
  data = 'initial value';
  serverUrl = 'SERVER_URL';
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get(this.serverUrl).subscribe(response => {
      // user does not need to trigger change detection manually
      this.data = response.data;
    });
  }
}
```

4. MacroTasks, such as `setTimeout()` or `setInterval()`. You can also update the data in the callback function of a `macroTask` such as `setTimeout()`. For example:

   宏任务，例如 `setTimeout()` 或 `setInterval()` 。你还可以在诸如 `setTimeout()` `macroTask` 的回调函数中更新数据。例如：

```typescript
@Component({
  selector: 'app-root',
  template: '<div>{{data}}</div>';
})
export class AppComponent implements OnInit {
  data = 'initial value';

  ngOnInit() {
    setTimeout(() => {
      // user does not need to trigger change detection manually
      this.data = 'value updated';
    });
  }
}
```

5. MicroTasks, such as `Promise.then()`. Other asynchronous APIs return a Promise object (such as `fetch`), so the `then()` callback function can also update the data. For example:

   微任务，例如 `Promise.then()`。其他异步 API（例如 `fetch`）会返回 Promise 对象，因此 `then()` 回调函数也可以更新数据。例如：

```typescript
@Component({
  selector: 'app-root',
  template: '<div>{{data}}</div>';
})
export class AppComponent implements OnInit {
  data = 'initial value';

  ngOnInit() {
    Promise.resolve(1).then(v => {
      // user does not need to trigger change detection manually
      this.data = v;
    });
  }
}
```

6. Other async operations. In addition to `addEventListener()`, `setTimeout()` and `Promise.then()`, there are other operations that can update the data asynchronously. Some examples include `WebSocket.onmessage()` and `Canvas.toBlob()`.

   其他异步操作。除了 `addEventListener()` ， `setTimeout()` 和 `Promise.then()` ，还有其他一些操作可以异步更新数据。比如 `WebSocket.onmessage()` 和 `Canvas.toBlob()` 。

The preceding list contains most common scenarios in which the application might change the data. Angular runs change detection whenever it detects that data could have changed.
The result of change detection is that the DOM is updated with new data. Angular detects the changes in different ways. For component initialization, Angular calls change detection explicitly. For [asynchronous operations](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous), Angular uses a zone to detect changes in places where the data could have possibly mutated and it runs change detection automatically.

前面的列表包含应用程序可能会在其中更改数据的最常见场景。只要 Angular 检测到数据可能已更改，就会运行变更检测。变更检测的结果是 DOM 被这些新数据更新。Angular 会以不同的方式检测变化。对于组件初始化，Angular 调用显式变更检测。对于[异步操作](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)，Angular 会使用 Zone 在数据可能被修改的地方检测变化，并自动运行变更检测。

## Zones and execution contexts

## Zone 和执行上下文

A zone provides an execution context that persists across async tasks. [Execution Context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) is an abstract concept that holds information about the environment within the current code being executed. Consider the following example:

Zone 提供了在异步任务之间持久存在的执行上下文。[执行上下文](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)是一个抽象概念，用于在当前执行的代码中保存有关环境的信息。考虑以下示例：

```javascript
const callback = function() {
  console.log('setTimeout callback context is', this);
}

const ctx1 = { name: 'ctx1' };
const ctx2 = { name: 'ctx2' };

const func = function() {
  console.log('caller context is', this);
  setTimeout(callback);
}

func.apply(ctx1);
func.apply(ctx2);
```

The value of `this` in the callback of `setTimeout()` might differ depending on when `setTimeout()` is called.
Thus, you can lose the context in asynchronous operations.

`setTimeout()` 回调中的 `this` 值可能会有所不同，具体取决于 `setTimeout()` 的调用时机。因此，你可能会在异步操作中丢失上下文。

A zone provides a new zone context other than `this`, the zone context that persists across asynchronous operations.
In the following example, the new zone context is called `zoneThis`.

Zone 提供了不同于 `this` 的新的 Zone 上下文，该 Zone 上下文在异步操作中保持不变。在下例中，新的 Zone 上下文称为 `zoneThis` 。

```javascript
zone.run(() => {
  // now you are in a zone
  expect(zoneThis).toBe(zone);
  setTimeout(function() {
    // the zoneThis context will be the same zone
    // when the setTimeout is scheduled
    expect(zoneThis).toBe(zone);
  });
});
```

This new context, `zoneThis`, can be retrieved from the `setTimeout()` callback function, and this context is the same when the `setTimeout()` is scheduled.
To get the context, you can call [`Zone.current`](https://github.com/angular/angular/blob/master/packages/zone.js/lib/zone.ts).

新的上下文 `zoneThis` 可以从 `setTimeout()` 的回调函数中检索出来，这个上下文和调用 `setTimeout()` 时的上下文是一样的。要获取此上下文，可以调用 [`Zone.current`](https://github.com/angular/angular/blob/master/packages/zone.js/lib/zone.ts)。

## Zones and async lifecycle hooks

## Zone 和异步生命周期钩子

Zone.js can create contexts that persist across asynchronous operations as well as provide lifecycle hooks for asynchronous operations.

Zone.js 可以创建在异步操作中持久存在的上下文，并为异步操作提供生命周期钩子。

```javascript
const zone = Zone.current.fork({
  name: 'zone',
  onScheduleTask: function(delegate, curr, target, task) {
    console.log('new task is scheduled:', task.type, task.source);
    return delegate.scheduleTask(target, task);
  },
  onInvokeTask: function(delegate, curr, target, task, applyThis, applyArgs) {
    console.log('task will be invoked:', task.type, task.source);
    return delegate.invokeTask(target, task, applyThis, applyArgs);
  },
  onHasTask: function(delegate, curr, target, hasTaskState) {
    console.log('task state changed in the zone:', hasTaskState);
    return delegate.hasTask(target, hasTaskState);
  },
  onInvoke: function(delegate, curr, target, callback, applyThis, applyArgs) {
    console.log('the callback will be invoked:', callback);
    return delegate.invoke(target, callback, applyThis, applyArgs);
  }
});
zone.run(() => {
  setTimeout(() => {
    console.log('timeout callback is invoked.');
  });
});
```

The above example creates a zone with several hooks.

上面的示例创建了一个具有多个钩子的 Zone。

The `onXXXTask` hooks trigger when the status of the task changes.
The concept of a *Zone Task* is very similar to the JavaScript VM Task concept:

当任务状态更改时，就会触发 `onXXXTask` 钩子。*Zone 任务*的概念与 JavaScript VM 中任务的概念非常相似：

- `macroTask`: such as `setTimeout()`

  `macroTask`：例如 `setTimeout()`

- `microTask`: such as `Promise.then()`

  `microTask`：例如 `Promise.then()`

- `eventTask`: such as `element.addEventListener()`

  `eventTask`：例如 `element.addEventListener()`

These hooks trigger under the following circumstances:

这些钩子在以下情况下触发：

- `onScheduleTask`: triggers when a new asynchronous task is scheduled, such as when you call `setTimeout()`.

  `onScheduleTask`：在计划新的异步任务时触发，例如调用 `setTimeout()` 时。

- `onInvokeTask`: triggers when an asynchronous task is about to execute, such as when the callback of `setTimeout()` is about to execute.

  `onInvokeTask`：在异步任务即将执行时触发，例如 `setTimeout()` 的回调即将执行时。

- `onHasTask`: triggers when the status of one kind of task inside a zone changes from stable to unstable or from unstable to stable. A status of "stable" means there are no tasks inside the zone, while "unstable" means a new task is scheduled in the zone.

  `onHasTask`：当 Zone 内的一种任务的状态从稳定变为不稳定或从不稳定变为稳定时触发。状态“稳定”表示该 Zone 内没有任务，而“不稳定”表示在该 Zone 中计划了新任务。

- `onInvoke`: triggers when a synchronous function is going to execute in the zone.

  `onInvoke`：将在 Zone 中执行同步函数时触发。

With these hooks, `Zone` can monitor the status of all synchronous and asynchronous operations inside a zone.

使用这些钩子，`Zone` 可以监视 Zone 内所有同步和异步操作的状态。

The above example returns the following output:

上面的示例返回以下输出：

```
the callback will be invoked: () => {
  setTimeout(() => {
    console.log('timeout callback is invoked.');
  });
}
new task is scheduled: macroTask setTimeout
task state changed in the zone: { microTask: false,
  macroTask: true,
  eventTask: false,
  change: 'macroTask' }
task will be invoked macroTask: setTimeout
timeout callback is invoked.
task state changed in the zone: { microTask: false,
  macroTask: false,
  eventTask: false,
  change: 'macroTask' }
```

All of the functions of `Zone` are provided by a library called [Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js/README.md).
This library implements those features by intercepting asynchronous APIs through monkey patching.
Monkey patching is a technique to add or modify the default behavior of a function at runtime without changing the source code.

`Zone` 的所有功能均由名为 [Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js/README.md) 的库提供。该库通过猴子补丁拦截异步 API 来实现这些功能。猴子补丁是一种在运行时添加或修改函数默认行为而无需更改源代码的技术。

## NgZone

While Zone.js can monitor all the states of synchronous and asynchronous operations, Angular additionally provides a service called NgZone.
This service creates a zone named `angular` to automatically trigger change detection when the following conditions are satisfied:

虽然 Zone.js 可以监视同步和异步操作的所有状态，但 Angular 还提供了一项名为 NgZone 的服务。满足以下条件时，此服务会创建一个名为 `angular` 的 Zone 来自动触发变更检测。

1. When a sync or async function is executed.

   当执行同步或异步功能时。

1. When there is no `microTask` scheduled.

   已经没有已计划的 `microTask`。

### NgZone `run()` and `runOutsideOfAngular()`

### NgZone `run()` 和 `runOutsideOfAngular()`

`Zone` handles most asynchronous APIs such as `setTimeout()`, `Promise.then()`, and `addEventListener()`.
For the full list, see the [Zone Module document](https://github.com/angular/angular/blob/master/packages/zone.js/MODULE.md).
Therefore in those asynchronous APIs, you don't need to trigger change detection manually.

`Zone` 处理大多数异步 API，例如 `setTimeout()`、`Promise.then()` 和 `addEventListener()` 。有关完整列表，请参见 [Zone 模块的文档](https://github.com/angular/angular/blob/master/packages/zone.js/MODULE.md)。因此，在这些异步 API 中，你无需手动触发变更检测。

There are still some third party APIs that Zone does not handle.
In those cases, the `NgZone` service provides a [`run()`](api/core/NgZone#run) method that allows you to execute a function inside the angular zone.
This function, and all asynchronous operations in that function, trigger change detection automatically at the correct time.

仍然有一些 Zone 无法处理的第三方 API。在这种情况下，`NgZone` 服务提供了 [`run()`](api/core/NgZone#run) 方法，该方法允许你在 `angular` Zone 中执行函数。此函数以及该函数中的所有异步操作会在正确的时间自动触发变更检测。

```typescript
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    // New async API is not handled by Zone, so you need to
    // use ngZone.run() to make the asynchronous operation in the angular zone
    // and trigger change detection automatically.
    this.ngZone.run(() => {
      someNewAsyncAPI(() => {
        // update the data of the component
      });
    });
  }
}
```

By default, all asynchronous operations are inside the angular zone, which triggers change detection automatically.
Another common case is when you don't want to trigger change detection.
In that situation, you can use another `NgZone` method: [`runOutsideAngular()`](api/core/NgZone#runoutsideangular).

默认情况下，所有异步操作都在 angular Zone 内，这会自动触发变更检测。另一个常见的情况是你不想触发变更检测。在这种情况下，你可以使用另一个 `NgZone` 方法：[`runOutsideAngular()`](api/core/NgZone#runoutsideangular) 。

```typescript
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    // You know no data will be updated,
    // so you don't want to trigger change detection in this
    // specified operation. Instead, call ngZone.runOutsideAngular()
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // update component data
        // but don't trigger change detection.
      });
    });
  }
}
```

### Setting up Zone.js

### 设置 Zone.js

To make Zone.js available in Angular, you need to import the `zone.js` package.
If you are using the Angular CLI, this step is done automatically, and you will see the following line in the `src/polyfills.ts`:

为了使 Zone.js 在 Angular 中可用，你需要导入 `zone.js` 包。如果使用的是 Angular CLI，则此步骤将自动完成，并且你会在 `src/polyfills.ts` 中看到以下行：

```typescript
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.
```

Before importing the  `zone.js` package, you can set the following configurations:

在导入 `zone.js` 软件包之前，你可以做如下配置：

- You can disable some asynchronous API monkey patching for better performance.
For example, you can disable the `requestAnimationFrame()` monkey patch, so the callback of `requestAnimationFrame()` will not trigger change detection.
This is useful if, in your application, the callback of the `requestAnimationFrame()` will not update any data.

  你可以禁用一些异步 API 的猴子补丁，以获得更好的性能。例如，你可以禁用 `requestAnimationFrame()` 的猴子补丁，这样 `requestAnimationFrame()` 的回调就不会触发变更检测。如果你的应用程序不会在 `requestAnimationFrame()` 回调中更新任何数据，则这种方式很有用。

- You can specify that certain DOM events do not run inside the angular zone; for example, to prevent a `mousemove` or `scroll` event to trigger change detection.

  你可以指定某些 DOM 事件不在 angular Zone 内运行；例如，为了防止 `mousemove` 或 `scroll` 事件来触发变更检测。

There are several other settings you can change.
To make these changes, you need to create a `zone-flags.ts` file, such as the following.

你还可以更改另外几个设置。要进行这些更改，你需要创建一个 `zone-flags.ts` 文件，如下所示。

```typescript
// disable patching requestAnimationFrame
(window as any).__Zone_disable_requestAnimationFrame = true;

// disable patching specified eventNames
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];
```

Next, import `zone-flags` before you import `zone.js` in the `polyfills.ts`:

接着，在 `polyfills.ts` 中导入 `zone.js` 之前先导入 `zone-flags`：

```typescript
/***************************************************************************************************
 * Zone JS is required by default for Angular.
 */
import `./zone-flags`;
import 'zone.js/dist/zone';  // Included with Angular CLI.
```

For more information about what you can configure, see the [Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js) documentation.

关于可配置内容的更多信息，请参见 [Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js) 文档。

### NoopZone

`Zone` helps Angular know when to trigger change detection and let the developers focus on the application development.
By default, `Zone` is loaded and works without additional configuration. However, you don't necessarily have to use `Zone` to make Angular work. Instead, you can opt to trigger change detection on your own.

`Zone` 能帮助 Angular 知道何时要触发变更检测，并使开发人员专注于应用开发。默认情况下，`Zone` 已加载且无需其他配置即可工作。但是，也不是一定要用 `Zone` 才能使 Angular 工作。相反，你也可以选择自己触发变更检测。

<div class="alert is-helpful">

<h4>Disabling <code>Zone</code></h4>

<h4>禁用 <code>Zone</code></h4>

**If you disable `Zone`, you will need to trigger all change detection at the correct timing yourself, which requires comprehensive knowledge of change detection**.

**如果禁用了 `Zone`，你就要自己在正确的时间触发所有变更检测，这需要你对变更检测机制有全面的了解**。

</div>

To remove Zone.js, make the following changes.

要删除 Zone.js，请进行以下更改。

1. Remove the `zone.js` import from `polyfills.ts`:

   从 `polyfills.ts` 中移除对 `zone.js` 的导入：

  ```typescript
  /***************************************************************************************************
   * Zone JS is required by default for Angular itself.
   */
  // import 'zone.js/dist/zone';  // Included with Angular CLI.
  ```

2. Bootstrap Angular with the `noop` zone in `src/main.ts`:

   在 `src/main.ts` 中使用 `noop` Zone 引导 Angular：

  ```typescript
  platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' })
    .catch(err => console.error(err));
  ```
