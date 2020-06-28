# Observables compared to other techniques

# 可观察对象与其它技术的比较

You can often use observables instead of promises to deliver values asynchronously. Similarly, observables can take the place of event handlers. Finally, because observables deliver multiple values, you can use them where you might otherwise build and operate on arrays.

你可以经常使用可观察对象（Observable）而不是承诺（Promise）来异步传递值。
类似的，可观察对象也可以取代事件处理器的位置。最后，由于可观察对象传递多个值，所以你可以在任何可能构建和操作数组的地方使用可观察对象。

Observables behave somewhat differently from the alternative techniques in each of these situations, but offer some significant advantages. Here are detailed comparisons of the differences.

在这些情况下，可观察对象的行为与其替代技术有一些差异，不过也提供了一些显著的优势。下面是对这些差异的详细比较。

## Observables compared to promises

## 可观察对象 vs. 承诺

Observables are often compared to promises. Here are some key differences:

可观察对象经常拿来和承诺进行对比。有一些关键的不同点：

* Observables are declarative; computation does not start until subscription. Promises execute immediately on creation. This makes observables useful for defining recipes that can be run whenever you need the result.

   可观察对象是声明式的，在被订阅之前，它不会开始执行。承诺是在创建时就立即执行的。这让可观察对象可用于定义那些应该按需执行的菜谱。

* Observables provide many values. Promises provide one. This makes observables useful for getting multiple values over time.

   可观察对象能提供多个值。承诺只提供一个。这让可观察对象可用于随着时间的推移获取多个值。

* Observables differentiate between chaining and subscription. Promises only have `.then()` clauses. This makes observables useful for creating complex transformation recipes to be used by other part of the system, without causing the work to be executed.

   可观察对象会区分串联处理和订阅语句。承诺只有 `.then()` 语句。这让可观察对象可用于创建供系统的其它部分使用而不希望立即执行的复杂菜谱。

* Observables `subscribe()` is responsible for handling errors. Promises push errors to the child promises. This makes observables useful for centralized and predictable error handling.

   可观察对象的 `subscribe()` 会负责处理错误。承诺会把错误推送给它的子承诺。这让可观察对象可用于进行集中式、可预测的错误处理。

### Creation and subscription

### 创建与订阅

* Observables are not executed until a consumer subscribes. The `subscribe()` executes the defined behavior once, and it can be called again. Each subscription has its own computation. Resubscription causes recomputation of values.

   在有消费者订阅之前，可观察对象不会执行。`subscribe()` 会执行一次定义好的行为，并且可以再次调用它。每次订阅都是单独计算的。重新订阅会导致重新计算这些值。

<code-example 
    path="comparing-observables/src/observables.ts" 
    header="src/observables.ts (observable)" 
    region="observable">
  </code-example>

* Promises execute immediately, and just once. The computation of the result is initiated when the promise is created. There is no way to restart work. All `then` clauses (subscriptions) share the same computation.

   承诺会立即执行，并且只执行一次。当承诺创建时，会立即计算出结果。没有办法重新做一次。所有的 `then` 语句（订阅）都会共享同一次计算。

<code-example 
    path="comparing-observables/src/promises.ts" 
    header="src/promises.ts (promise)"
    region="promise">
  </code-example>

### Chaining

### 串联

* Observables differentiate between transformation function such as a map and subscription. Only subscription activates the subscriber function to start computing the values.

   可观察对象会区分各种转换函数，比如映射和订阅。只有订阅才会激活订阅者函数，以开始计算那些值。

<code-example path="comparing-observables/src/observables.ts" 
    header="src/observables.ts (chain)" 
    region="chain"></code-example>
* Promises do not differentiate between the last `.then` clauses (equivalent to subscription) and intermediate `.then` clauses (equivalent to map).

   承诺并不区分最后的 `.then()` 语句（等价于订阅）和中间的 `.then()` 语句（等价于映射）。

<code-example path="comparing-observables/src/promises.ts"
    header="src/promises.ts (chain)" 
    region="chain"></code-example>
### Cancellation

### 可取消

* Observable subscriptions are cancellable. Unsubscribing removes the listener from receiving further values, and notifies the subscriber function to cancel work.

   可观察对象的订阅是可取消的。取消订阅会移除监听器，使其不再接受将来的值，并通知订阅者函数取消正在进行的工作。

<code-example 
    path="comparing-observables/src/observables.ts" 
    header="src/observables.ts (unsubcribe)" 
    region="unsubscribe">
  </code-example>

* Promises are not cancellable.

   承诺是不可取消的。

### Error handling

### 错误处理

* Observable execution errors are delivered to the subscriber's error handler, and the subscriber automatically unsubscribes from the observable.

   可观察对象的错误处理工作交给了订阅者的错误处理器，并且该订阅者会自动取消对这个可观察对象的订阅。

<code-example 
    path="comparing-observables/src/observables.ts" 
    header="src/observables.ts (error)"
    region="error">
  </code-example>

* Promises push errors to the child promises.

   承诺会把错误推给其子承诺。

<code-example 
    path="comparing-observables/src/promises.ts" 
    header="src/promises.ts (error)"
    region="error">
  </code-example>

### Cheat sheet

### 速查表

The following code snippets illustrate how the same kind of operation is defined using observables and promises.

下列代码片段揭示了同样的操作要如何分别使用可观察对象和承诺进行实现。

<table>
  <thead>
    <tr>

    <th>

        Operation

        操作

    </th>

    <th>

        Observable

        可观察对象

    </th>

    <th>

        Promise

        承诺

    </th>

  </tr></thead>
  <tbody>
  <tr>

    <td>

        Creation

        创建

    </td>

    <td>

      <pre>
new Observable((observer) => {
  observer.next(123);
});</pre>

    </td>

    <td>

      <pre>
new Promise((resolve, reject) => {
  resolve(123);
});</pre>

    </td>

  </tr>
  <tr>

    <td>

        Transform

        转换

    </td>

    <td>

        <pre>obs.pipe(map((value) => value * 2));</pre>

    </td>

    <td>

        <pre>promise.then((value) => value * 2);</pre>

    </td>

  </tr>
  <tr>

    <td>

        Subscribe

        订阅

    </td>

    <td>

      <pre>
sub = obs.subscribe((value) => {
  console.log(value)
});</pre>

    </td>

    <td>

      <pre>
promise.then((value) => {
  console.log(value);
});</pre>

    </td>

  </tr>
  <tr>

    <td>

        Unsubscribe

        取消订阅

    </td>

    <td>

        <pre>sub.unsubscribe();</pre>

    </td>

    <td>

        Implied by promise resolution.

        承诺被解析时隐式完成。

    </td>

  </tr></tbody>
</table>

## Observables compared to events API

## 可观察对象 vs. 事件 API

Observables are very similar to event handlers that use the events API. Both techniques define notification handlers, and use them to process multiple values delivered over time. Subscribing to an observable is equivalent to adding an event listener. One significant difference is that you can configure an observable to transform an event before passing the event to the handler.

可观察对象和事件 API 中的事件处理器很像。这两种技术都会定义通知处理器，并使用它们来处理一段时间内传递的多个值。订阅可观察对象与添加事件处理器是等价的。一个显著的不同是你可以配置可观察对象，使其在把事件传给事件处理器之前先进行转换。

Using observables to handle events and asynchronous operations can have the advantage of greater consistency in contexts such as HTTP requests.

使用可观察对象来处理错误和异步操作在 HTTP 请求这样的场景下更加具有一致性。

Here are some code samples that illustrate how the same kind of operation is defined using observables and the events API.

下列代码片段揭示了同样的操作要如何分别使用可观察对象和事件 API 进行实现。

<table>
  <tr>

    <th>

    </th>

    <th>

        Observable

        可观察对象

    </th>

    <th>

        Events API

        事件 API

    </th>

  </tr>
  <tr>

    <td>

        Creation & cancellation

        创建与取消

    </td>

    <td>

<pre>// Setup
let clicks$ = fromEvent(buttonEl, ‘click’);
// Begin listening
let subscription = clicks$
  .subscribe(e => console.log(‘Clicked’, e))
// Stop listening
subscription.unsubscribe();</pre>

    </td>

   <td>

<pre>function handler(e) {
  console.log(‘Clicked’, e);
}
// Setup & begin listening
button.addEventListener(‘click’, handler);
// Stop listening
button.removeEventListener(‘click’, handler);
</pre>

   </td>

  </tr>
  <tr>

    <td>

        Subscription

        订阅

    </td>

    <td>

<pre>observable.subscribe(() => {
  // notification handlers here
});</pre>

    </td>

    <td>

<pre>element.addEventListener(eventName, (event) => {
  // notification handler here
});</pre>

    </td>

  </tr>
  <tr>

    <td>

        Configuration

        配置

    </td>

    <td>

        Listen for keystrokes, but provide a stream representing the value in the input.

        监听按键，提供一个流来表示这些输入的值。

<pre>fromEvent(inputEl, 'keydown').pipe(
  map(e => e.target.value)
);</pre>

    </td>

    <td>

        Does not support configuration.

        不支持配置。

<pre>element.addEventListener(eventName, (event) => {
  // Cannot change the passed Event into another
  // value before it gets to the handler
});</pre>

    </td>

  </tr>
</table>

## Observables compared to arrays

## 可观察对象 vs. 数组

An observable produces values over time. An array is created as a static set of values. In a sense, observables are asynchronous where arrays are synchronous. In the following examples, ➞ implies asynchronous value delivery.

可观察对象会随时间生成值。数组是用一组静态的值创建的。某种意义上，可观察对象是异步的，而数组是同步的。
在下面的例子中，➞ 符号表示异步传递值。

<table>
  <tr>

    <th>

    </th>

    <th>

        Observable

        可观察对象

    </th>

    <th>

        Array

        数组

    </th>

  </tr>
  <tr>

    <td>

        Given

        给出值

    </td>

    <td>

      <pre>obs: ➞1➞2➞3➞5➞7</pre>

      <pre>obsB: ➞'a'➞'b'➞'c'</pre>

    </td>

    <td>

      <pre>arr: [1, 2, 3, 5, 7]</pre>

      <pre>arrB: ['a', 'b', 'c']</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>concat()</pre>

    </td>

    <td>

      <pre>concat(obs, obsB)</pre>
      <pre>➞1➞2➞3➞5➞7➞'a'➞'b'➞'c'</pre>

    </td>

    <td>

      <pre>arr.concat(arrB)</pre>

      <pre>[1,2,3,5,7,'a','b','c']</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>filter()</pre>

    </td>

    <td>

      <pre>obs.pipe(filter((v) => v>3))</pre>
      <pre>➞5➞7</pre>

    </td>

    <td>

      <pre>arr.filter((v) => v>3)</pre>

      <pre>[5, 7]</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>find()</pre>

    </td>

    <td>

      <pre>obs.pipe(find((v) => v>3))</pre>
      <pre>➞5</pre>

    </td>

    <td>

      <pre>arr.find((v) => v>3)</pre>

      <pre>5</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>findIndex()</pre>

    </td>

    <td>

      <pre>obs.pipe(findIndex((v) => v>3))</pre>
      <pre>➞3</pre>

    </td>

    <td>

      <pre>arr.findIndex((v) => v>3)</pre>

      <pre>3</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>forEach()</pre>

    </td>

    <td>

      <pre>obs.pipe(tap((v) => {
  console.log(v);
}))
1
2
3
5
7</pre>

    </td>

    <td>

      <pre>arr.forEach((v) => {
  console.log(v);
})
1
2
3
5
7</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>map()</pre>

    </td>

    <td>

      <pre>obs.pipe(map((v) => -v))</pre>
      <pre>➞-1➞-2➞-3➞-5➞-7</pre>

    </td>

    <td>

      <pre>arr.map((v) => -v)</pre>

      <pre>[-1, -2, -3, -5, -7]</pre>

    </td>

  </tr>
  <tr>

    <td>

        <pre>reduce()</pre>

    </td>

    <td>

      <pre>obs.pipe(reduce((s,v)=> s+v, 0))</pre>

      <pre>➞18</pre>
    </td>

    <td>

      <pre>arr.reduce((s,v) => s+v, 0)</pre>

      <pre>18</pre>

    </td>

  </tr>
</table>
