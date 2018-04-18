# Practical observable usage

# 可观察对象用法实战

Here are some examples of domains in which observables are particularly useful.

这里示范了一些在某种领域中可观察对象会特别有用的例子。

## Type-ahead suggestions

## 输入提示（type-ahead）建议

Observables can simplify the implementation of type-ahead suggestions. Typically, a type-ahead has to do a series of separate tasks:

可观察对象可以简化输入提示建议的实现方式。典型的输入提示要完成一系列独立的任务：

* Listen for data from an input.

   从输入中监听数据。

* Trim the value (remove whitespace) and make sure it’s a minimum length.

   移除输入值前后的空白字符，并确认它达到了最小长度。

* Debounce (so as not to send off API requests for every keystroke, but instead wait for a break in keystrokes).

   防抖（这样才能防止连续按键时每次按键都发起 API 请求，而应该等到按键出现停顿时才发起）

* Don’t send a request if the value stays the same (rapidly hit a character, then backspace, for instance).

   如果输入值没有变化，则不要发起请求（比如按某个字符，然后快速按退格）。

* Cancel ongoing AJAX requests if their results will be invalidated by the updated results.

   如果已发出的 AJAX 请求的结果会因为后续的修改而变得无效，那就取消它。

Writing this in full JavaScript can be quite involved. With observables, you can use a simple series of RxJS operators:

完全用 JavaScript 的传统写法实现这个功能可能需要大量的工作。使用可观察对象，你可以使用这样一个 RxJS 操作符的简单序列：

<code-example path="practical-observable-usage/src/typeahead.ts" title="Typeahead"></code-example>

## Exponential backoff

## 指数化退避

Exponential backoff is a technique in which you retry an API after failure, making the time in between retries longer after each consecutive failure, with a maximum number of retries after which the request is considered to have failed. This can be quite complex to implement with promises and other methods of tracking AJAX calls. With observables, it is very easy:

指数化退避是一种失败后重试 API 的技巧，它会在每次连续的失败之后让重试时间逐渐变长，超过最大重试次数之后就会彻底放弃。
如果使用承诺和其它跟踪 AJAX 调用的方法会非常复杂，而使用可观察对象，这非常简单：

<code-example path="practical-observable-usage/src/backoff.ts" title="Exponential backoff"></code-example>
