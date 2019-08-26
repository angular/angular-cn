# Pipes

# 管道

Every application starts out with what seems like a simple task: get data, transform them, and show them to users.
Getting data could be as simple as creating a local variable or as complex as streaming data over a WebSocket.

每个应用开始的时候差不多都是一些简单任务：获取数据、转换它们，然后把它们显示给用户。
获取数据可能简单到创建一个局部变量就行，也可能复杂到从 WebSocket 中获取数据流。

Once data arrives, you could push their raw `toString` values directly to the view,
but that rarely makes for a good user experience.
For example, in most use cases, users prefer to see a date in a simple format like
<samp>April 15, 1988</samp> rather than the raw string format
<samp>Fri Apr 15 1988 00:00:00 GMT-0700 (Pacific Daylight Time)</samp>.

一旦取到数据，你就可以把它们原始值的 `toString` 结果直接推入视图中。
但这种做法很少能具备良好的用户体验。
比如，几乎每个人都更喜欢简单的日期格式，例如<samp>1988-04-15</samp>，而不是服务端传过来的原始字符串格式 —— <samp>Fri Apr 15 1988 00:00:00 GMT-0700 (Pacific Daylight Time)</samp>。

Clearly, some values benefit from a bit of editing. You may notice that you
desire many of the same transformations repeatedly, both within and across many applications.
You can almost think of them as styles.
In fact, you might like to apply them in your HTML templates as you do styles.

显然，有些值最好显示成用户友好的格式。你很快就会发现，在很多不同的应用中，都在重复做出某些相同的变换。
你几乎会把它们看做某种 CSS 样式，事实上，你也确实更喜欢在 HTML 模板中应用它们 —— 就像 CSS 样式一样。

Introducing Angular pipes, a way to write display-value transformations that you can declare in your HTML.

通过引入 Angular 管道（一种编写"从显示到值"转换逻辑的途径），你可以把它声明在 HTML 中。

You can run the <live-example></live-example> in Stackblitz and download the code from there.

你可以运行<live-example></live-example>，在 Stackblitz 中试用并下载本页的代码。

## Using pipes

## 使用管道

A pipe takes in data as input and transforms it to a desired output.
In this page, you'll use pipes to transform a component's birthday property into
a human-friendly date.

管道把数据作为输入，然后转换它，给出期望的输出。
你要把组件的 `birthday` 属性转换成对人类更友好的日期格式。

<code-example path="pipes/src/app/hero-birthday1.component.ts" header="src/app/hero-birthday1.component.ts" linenums="false">

</code-example>

Focus on the component's template.

重点看下组件的模板。

<code-example path="pipes/src/app/app.component.html" region="hero-birthday-template" header="src/app/app.component.html" linenums="false">

</code-example>

Inside the interpolation expression, you flow the component's `birthday` value through the
[pipe operator](guide/template-syntax#pipe) ( | ) to the [Date pipe](api/common/DatePipe)
function on the right. All pipes work this way.

在这个插值表达式中，你让组件的 `birthday` 值通过[管道操作符](guide/template-syntax#pipe)( | )流动到
右侧的[Date 管道](api/common/DatePipe)函数中。所有管道都会用这种方式工作。

## Built-in pipes

## 内置的管道

Angular comes with a stock of pipes such as
`DatePipe`, `UpperCasePipe`, `LowerCasePipe`, `CurrencyPipe`, and `PercentPipe`.
They are all available for use in any template.

Angular 内置了一些管道，比如 `DatePipe`、`UpperCasePipe`、`LowerCasePipe`、`CurrencyPipe` 和 `PercentPipe`。
它们全都可以直接用在任何模板中。

<div class="alert is-helpful">

Read more about these and many other built-in pipes in the [pipes topics](api?type=pipe) of the
[API Reference](api); filter for entries that include the word "pipe".

要学习更多内置管道的知识，参见[API 参考手册](api?type=pipe)，并用“pipe”为关键词对结果进行过滤。

Angular doesn't have a `FilterPipe` or an `OrderByPipe` for reasons explained in the [Appendix](guide/pipes#no-filter-pipe) of this page.

Angular 没有 `FilterPipe` 或 `OrderByPipe` 管道，原因在[后面的附录中](guide/pipes#no-filter-pipe)有解释。

</div>

## Parameterizing a pipe

## 对管道进行参数化

A pipe can accept any number of optional parameters to fine-tune its output.
To add parameters to a pipe, follow the pipe name with a colon ( : ) and then the parameter value
(such as `currency:'EUR'`). If the pipe accepts multiple parameters, separate the values with colons (such as `slice:1:5`)

管道可能接受任何数量的可选参数来对它的输出进行微调。
可以在管道名后面添加一个冒号( : )再跟一个参数值，来为管道添加参数(比如 `currency:'EUR'`)。
如果这个管道可以接受多个参数，那么就用冒号来分隔这些参数值(比如 `slice:1:5`)。

Modify the birthday template to give the date pipe a format parameter.
After formatting the hero's April 15th birthday, it renders as **<samp>04/15/88</samp>**:

修改生日模板，来为这个日期管道提供一个格式化参数。
当格式化完该英雄的 4 月 15 日生日之后，它应该被渲染成**<samp>04/15/88</samp>**。

<code-example path="pipes/src/app/app.component.html" region="format-birthday" header="src/app/app.component.html" linenums="false">

</code-example>

The parameter value can be any valid template expression,
(see the [Template expressions](guide/template-syntax#template-expressions) section of the
[Template Syntax](guide/template-syntax) page)
such as a string literal or a component property.
In other words, you can control the format through a binding the same way you control the birthday value through a binding.

参数值可以是任何有效的模板表达式（参见[模板语法](guide/template-syntax)中的[模板表达式](guide/template-syntax#template-expressions)部分），比如字符串字面量或组件的属性。
换句话说，借助属性绑定，你也可以像用绑定来控制生日的值一样，控制生日的显示格式。

Write a second component that *binds* the pipe's format parameter
to the component's `format` property. Here's the template for that component:

来写第二个组件，它把管道的格式参数*绑定*到该组件的 `format` 属性。这里是新组件的模板：

<code-example path="pipes/src/app/hero-birthday2.component.ts" region="template" header="src/app/hero-birthday2.component.ts (template)" linenums="false">

</code-example>

You also added a button to the template and bound its click event to the component's `toggleFormat()` method.
That method toggles the component's `format` property between a short form
(`'shortDate'`) and a longer form (`'fullDate'`).

你还能在模板中添加一个按钮，并把它的点击事件绑定到组件的 `toggleFormat()` 方法。
此方法会在短日期格式(`'shortDate'`)和长日期格式(`'fullDate'`)之间切换组件的 `format` 属性。

<code-example path="pipes/src/app/hero-birthday2.component.ts" region="class" header="src/app/hero-birthday2.component.ts (class)" linenums="false">

</code-example>

As you click the button, the displayed date alternates between
"**<samp>04/15/1988</samp>**" and
"**<samp>Friday, April 15, 1988</samp>**".

当你点击此按钮的时候，所显示的日期会在“**<samp>04/15/1988</samp>**”和“**<samp>Friday, April 15, 1988</samp>**”之间切换。

<figure>
  <img src='generated/images/guide/pipes/date-format-toggle-anim.gif' alt="Date Format Toggle">
</figure>

<div class="alert is-helpful">

Read more about the `DatePipe` format options in the [Date Pipe](api/common/DatePipe)
API Reference page.

要了解更多 `DatePipes` 的格式选项，请参阅[API 文档](api/common/DatePipe)。

</div>

## Chaining pipes

## 链式管道

You can chain pipes together in potentially useful combinations.
In the following example, to display the birthday in uppercase,
the birthday is chained to the `DatePipe` and on to the `UpperCasePipe`.
The birthday displays as **<samp>APR 15, 1988</samp>**.

你可以把管道串联在一起，以组合出一些潜在的有用功能。
下面这个例子中，要把 `birthday` 串联到 `DatePipe` 管道，然后又串联到 `UpperCasePipe`，这样就可以把生日显示成大写形式了。
生日被显示成了**<samp>APR 15, 1988</samp>**：

<code-example path="pipes/src/app/app.component.html" region="chained-birthday" header="src/app/app.component.html" linenums="false">

</code-example>

This example&mdash;which displays **<samp>FRIDAY, APRIL 15, 1988</samp>**&mdash;chains
the same pipes as above, but passes in a parameter to `date` as well.

下面这个显示**<samp>FRIDAY, APRIL 15, 1988</samp>**的例子用同样的方式链接了这两个管道，而且同时还给 `date` 管道传进去一个参数。

<code-example path="pipes/src/app/app.component.html" region="chained-parameter-birthday" header="src/app/app.component.html" linenums="false">

</code-example>

## Custom pipes

## 自定义管道

You can write your own custom pipes.
Here's a custom pipe named `ExponentialStrengthPipe` that can boost a hero's powers:

你还可以写自己的自定义管道。
下面就是一个名叫 `ExponentialStrengthPipe` 的管道，它可以放大英雄的能力：

<code-example path="pipes/src/app/exponential-strength.pipe.ts" header="src/app/exponential-strength.pipe.ts" linenums="false">

</code-example>

This pipe definition reveals the following key points:

在这个管道的定义中体现了几个关键点：

* A pipe is a class decorated with pipe metadata.

   管道是一个带有“管道元数据(pipe metadata)”装饰器的类。

* The pipe class implements the `PipeTransform` interface's `transform` method that
accepts an input value followed by optional parameters and returns the transformed value.

   这个管道类实现了 `PipeTransform` 接口的 `transform` 方法，该方法接受一个输入值和一些可选参数，并返回转换后的值。

* There will be one additional argument to the `transform` method for each parameter passed to the pipe.
Your pipe has one such parameter: the `exponent`.

   当每个输入值被传给 `transform` 方法时，还会带上另一个参数，比如你这个管道就有一个 `exponent`(放大指数) 参数。

* To tell Angular that this is a pipe, you apply the
`@Pipe` decorator, which you import from the core Angular library.

   可以通过 `@Pipe` 装饰器来告诉 Angular：这是一个管道。该装饰器是从 Angular 的 `core` 库中引入的。

* The `@Pipe` decorator allows you to define the
   pipe name that you'll use within template expressions. It must be a valid JavaScript identifier.
   Your pipe's name is `exponentialStrength`.

   这个 `@Pipe` 装饰器允许你定义管道的名字，这个名字会被用在模板表达式中。它必须是一个有效的 JavaScript 标识符。
    比如，你这个管道的名字是 `exponentialStrength`。

<div class="alert is-helpful">

## The *PipeTransform* interface

## *PipeTransform* 接口

The `transform` method is essential to a pipe.
The `PipeTransform` *interface* defines that method and guides both tooling and the compiler.
Technically, it's optional; Angular looks for and executes the `transform` method regardless.

`transform` 方法是管道的基本要素。
`PipeTransform`*接口*中定义了它，并用它指导各种工具和编译器。
理论上说，它是可选的。Angular 不会管它，而是直接查找并执行 `transform` 方法。

</div>

Now you need a component to demonstrate the pipe.

现在，你需要一个组件来演示这个管道。

<code-example path="pipes/src/app/power-booster.component.ts" header="src/app/power-booster.component.ts" linenums="false">
</code-example>

<figure>
  <img src='generated/images/guide/pipes/power-booster.png' alt="Power Booster">
</figure>

Note the following:

请注意以下几点：

* You use your custom pipe the same way you use built-in pipes.

   你使用自定义管道的方式和内置管道完全相同。

* You must include your pipe in the `declarations` array of the `AppModule`

   你必须把这个管道添加到 `AppModule` 的 `declarations` 数组中。

* If you choose to inject your pipe into a class, you must provide it in the `providers` array of your `NgModule`.

   如果选择将管道注入(`inject`)类中，则必须将管道包含字在`NgModule`的`providers`数组中。

<div class="callout is-helpful">

<header>Remember the declarations array</header>

<header>别忘了 `declarations` 数组</header>

You must register custom pipes.
If you don't, Angular reports an error.
The [Angular CLI's](cli) generator registers the pipe automatically.

你必须手动注册自定义管道。如果忘了，Angular 就会报告一个错误。
在前一个例子中你没有把 `DatePipe` 列进去，这是因为 Angular 所有的内置管道都已经预注册过了。

</div>

To probe the behavior in the <live-example></live-example>,
change the value and optional exponent in the template.

试一下这个<live-example></live-example>，并通过修改值和模板中的可选部分来体会其行为。

## Power Boost Calculator

## 能力倍增计算器

It's not much fun updating the template to test the custom pipe.
Upgrade the example to a "Power Boost Calculator" that combines
your pipe and two-way data binding with `ngModel`.

仅仅升级模板来测试这个自定义管道其实没多大意思。
干脆把这个例子升级为“能力提升计算器”，它可以把该管道和使用 `ngModel` 的双向数据绑定组合起来。

<code-example path="pipes/src/app/power-boost-calculator.component.ts" header="src/app/power-boost-calculator.component.ts">

</code-example>

<figure>
  <img src='generated/images/guide/pipes/power-boost-calculator-anim.gif' alt="Power Boost Calculator">
</figure>

{@a change-detection}

## Pipes and change detection

## 管道与变更检测

Angular looks for changes to data-bound values through a *change detection* process that runs after every DOM event:
every keystroke, mouse move, timer tick, and server response. This could be expensive.
Angular strives to lower the cost whenever possible and appropriate.

Angular 通过*变更检测*过程来查找绑定值的更改，并在每一次 JavaScript 事件之后运行：每次按键、鼠标移动、定时器以及服务器的响应。
这可能会让变更检测显得很昂贵，但是 Angular 会尽可能降低变更检测的成本。

Angular picks a simpler, faster change detection algorithm when you use a pipe.

当使用管道时，Angular 会选用一种更简单、更快速的变更检测算法。

<h3 class="no-toc">No pipe</h3>

<h3 class="no-toc">无管道</h3>

In the next example, the component uses the default, aggressive change detection strategy to monitor and update
its display of every hero in the `heroes` array. Here's the template:

在下一个例子中，组件使用默认的、激进(昂贵)的变更检测策略来检测和更新 `heroes` 数组中的每个英雄。下面是它的模板：

<code-example path="pipes/src/app/flying-heroes.component.html" region="template-1" header="src/app/flying-heroes.component.html (v1)" linenums="false">

</code-example>

The companion component class provides heroes, adds heroes into the array, and can reset the array.

和模板相伴的组件类可以提供英雄数组，能把新的英雄添加到数组中，还能重置英雄数组。

<code-example path="pipes/src/app/flying-heroes.component.ts" region="v1" header="src/app/flying-heroes.component.ts (v1)" linenums="false">

</code-example>

You can add heroes and Angular updates the display when you do.
If you click the `reset` button, Angular replaces `heroes` with a new array of the original heroes and updates the display.
If you added the ability to remove or change a hero, Angular would detect those changes and update the display as well.

你可以添加新的英雄，加完之后，Angular 就会更新显示。
`reset` 按钮会把 `heroes` 替换成一个由原来的英雄组成的新数组，重置完之后，Angular 就会更新显示。
如果你提供了删除或修改英雄的能力，Angular 也会检测到那些更改，并更新显示。

<h3 class="no-toc"><i>FlyingHeroesPipe</i></h3>

<h3 class="no-toc"><i>“会飞的英雄”管道（FlyingHeroesPipe）</i></h3>

Add a `FlyingHeroesPipe` to the `*ngFor` repeater that filters the list of heroes to just those heroes who can fly.

往 `*ngFor` 重复器中添加一个 `FlyingHeroesPipe` 管道，这个管道能过滤出所有会飞的英雄。

<code-example path="pipes/src/app/flying-heroes.component.html" region="template-flying-heroes" header="src/app/flying-heroes.component.html (flyers)" linenums="false">

</code-example>

Here's the `FlyingHeroesPipe` implementation, which follows the pattern for custom pipes described earlier.

下面是 `FlyingHeroesPipe` 的实现，它遵循了以前讲过的那些写自定义管道的模式。

<code-example path="pipes/src/app/flying-heroes.pipe.ts" region="pure" header="src/app/flying-heroes.pipe.ts" linenums="false">

</code-example>

Notice the odd behavior in the <live-example></live-example>:
when you add flying heroes, none of them are displayed under "Heroes who fly."

当运行<live-example></live-example>时，你看到一种奇怪的行为。添加的每个英雄都是会飞行的英雄，但是没有一个被显示出来。

Although you're not getting the behavior you want, Angular isn't broken.
It's just using a different change-detection algorithm that ignores changes to the list or any of its items.

虽然你没有得到期望的行为，但 Angular 也没有出错。
这里只是用了另一种变更检测算法 —— 它会忽略对列表及其子项所做的任何更改。

Notice how a hero is added:

注意这里是如何添加新英雄的：

<code-example path="pipes/src/app/flying-heroes.component.ts" region="push" header="src/app/flying-heroes.component.ts" linenums="false">

</code-example>

You add the hero into the `heroes` array.  The reference to the array hasn't changed.
It's the same array. That's all Angular cares about. From its perspective, *same array, no change, no display update*.

当你往 `heroes` 数组中添加一个新的英雄时，这个数组的引用并没有改变。它还是那个数组。而引用却是 Angular 所关心的一切。
在它看来，*这是同一个数组，没有变化，也就不需要更新显示*。

To fix that, create an array with the new hero appended and assign that to `heroes`.
This time Angular detects that the array reference has changed.
It executes the pipe and updates the display with the new array, which includes the new flying hero.

要修复它，就要创建一个新数组，把这个英雄追加进去，并把它赋给 `heroes`。
  这次，Angular 检测到数组的引用变化了。它执行了这个管道，并使用这个新数组更新显示，这次它就包括新的飞行英雄了。

If you *mutate* the array, no pipe is invoked and the display isn't updated;
if you *replace* the array, the pipe executes and the display is updated.
The Flying Heroes application extends the
code with checkbox switches and additional displays to help you experience these effects.

如果你**修改了**这个数组，没有管道被执行，也没有显示被更新。
如果你**替换了**这个数组，管道就会被执行，显示也更新了。
这个*飞行英雄*的例子用检查框和其它显示内容扩展了原有代码，来帮你体验这些效果。

<figure>
  <img src='generated/images/guide/pipes/flying-heroes-anim.gif' alt="Flying Heroes">
</figure>

Replacing the array is an efficient way to signal Angular to update the display.
When do you replace the array? When the data changes.
That's an easy rule to follow in *this* example
where the only way to change the data is by adding a hero.

直接替换这个数组是通知 Angular 更新显示的一种高效方式。
你该什么时候替换这个数组呢？当数据变化的时候。
在这个*玩具级*例子中，这是一个简单的规则，因为这里修改数据的唯一途径就是添加新英雄。

More often, you don't know when the data has changed,
especially in applications that mutate data in many ways,
perhaps in application locations far away.
A component in such an application usually can't know about those changes.
Moreover, it's unwise to distort the component design to accommodate a pipe.
Strive to keep the component class independent of the HTML.
The component should be unaware of pipes.

更多情况下，你不知道什么时候数据变化了，尤其是在那些有很多种途径改动数据的程序中 —— 可能在程序中很远的地方。
组件就是一个通常无法知道那些改动的例子。此外，它会导致削足适履 —— 扭曲组件的设计来适应管道。
要尽可能保持组件类独立于 HTML。组件不应该关心管道的存在。

For filtering flying heroes, consider an *impure pipe*.

为了过滤出会飞的英雄，考虑使用*非纯(impure)管道*。

## Pure and impure pipes

## 纯(pure)管道与非纯(impure)管道

There are two categories of pipes: *pure* and *impure*.
Pipes are pure by default. Every pipe you've seen so far has been pure.
You make a pipe impure by setting its pure flag to false. You could make the `FlyingHeroesPipe`
impure like this:

有两类管道：**纯**的与**非纯**的。
默认情况下，管道都是纯的。以前见到的每个管道都是纯的。
通过把它的 `pure` 标志设置为 `false`，你可以制作一个非纯管道。你可以像这样让 `FlyingHeroesPipe` 变成非纯的：

<code-example path="pipes/src/app/flying-heroes.pipe.ts" region="pipe-decorator" header="src/app/flying-heroes.pipe.ts" linenums="false">

</code-example>

Before doing that, understand the difference between pure and impure, starting with a pure pipe.

在继续往下走之前，先理解一下*纯*和*非纯*之间的区别，从*纯*管道开始。

<h3 class="no-toc">Pure pipes</h3>

<h3 class="no-toc">纯管道</h3>

Angular executes a *pure pipe* only when it detects a *pure change* to the input value.
A pure change is either a change to a primitive input value (`String`, `Number`, `Boolean`, `Symbol`)
or a changed object reference (`Date`, `Array`, `Function`, `Object`).

Angular 只有在它检测到输入值发生了*纯变更*时才会执行*纯管道*。
    ***纯变更***是指对原始类型值(`String`、`Number`、`Boolean`、`Symbol`)的更改，
    或者对对象引用(`Date`、`Array`、`Function`、`Object`)的更改。

Angular ignores changes within (composite) objects.
It won't call a pure pipe if you change an input month, add to an input array, or update an input object property.

Angular 会忽略(复合)对象*内部*的更改。
如果你更改了输入日期(`Date`)中的月份、往一个输入数组(`Array`)中添加新值或者更新了一个输入对象(`Object`)的属性，它都不会调用纯管道。

This may seem restrictive but it's also fast.
An object reference check is fast&mdash;much faster than a deep check for
differences&mdash;so Angular can quickly determine if it can skip both the
pipe execution and a view update.

这可能看起来是一种限制，但它保证了速度。
对象引用的检查是非常快的(比递归的深检查要快得多)，所以 Angular 可以快速的决定是否应该跳过管道执行和视图更新。

For this reason, a pure pipe is preferable when you can live with the change detection strategy.
When you can't, you *can* use the impure pipe.

因此，如果要和变更检测策略打交道，就会更喜欢用纯管道。
如果不能，你就*可以*转回到非纯管道。

<div class="alert is-helpful">

Or you might not use a pipe at all.
It may be better to pursue the pipe's purpose with a property of the component,
a point that's discussed later in this page.

或者你也可以完全不用管道。
有时候，使用组件的属性能比用管道更好的达到目的，后面会再讨论这一点。

</div>

<h3 class="no-toc">Impure pipes</h3>

<h3 class="no-toc">非纯管道</h3>

Angular executes an *impure pipe*  during every component change detection cycle.
An impure pipe is called often, as often as every keystroke or mouse-move.

Angular 会在每个组件的变更检测周期中执行*非纯管道*。
非纯管道可能会被调用很多次，和每个按键或每次鼠标移动一样频繁。

With that concern in mind, implement an impure pipe with great care.
An expensive, long-running pipe could destroy the user experience.

要在脑子里绷着这根弦，必须小心翼翼的实现非纯管道。
一个昂贵、迟钝的管道将摧毁用户体验。

{@a impure-flying-heroes}

<h3 class="no-toc">An impure <i>FlyingHeroesPipe</i></h3>

<h3 class="no-toc">非纯管道 <i>FlyingHeroesPipe</i></h3>

A flip of the switch turns the `FlyingHeroesPipe` into a `FlyingHeroesImpurePipe`.
The complete implementation is as follows:

把 `FlyingHeroesPipe` 换成了 `FlyingHeroesImpurePipe`。
下面是完整的实现：

<code-tabs>

  <code-pane header="FlyingHeroesImpurePipe" path="pipes/src/app/flying-heroes.pipe.ts" region="impure">

  </code-pane>

  <code-pane header="FlyingHeroesPipe" path="pipes/src/app/flying-heroes.pipe.ts" region="pure">

  </code-pane>

</code-tabs>

You inherit from `FlyingHeroesPipe` to prove the point that nothing changed internally.
The only difference is the `pure` flag in the pipe metadata.

你把它从 `FlyingHeroesPipe` 中继承下来，以证明无需改动内部代码。
唯一的区别是管道元数据中的 `pure` 标志。

This is a good candidate for an impure pipe because the `transform` function is trivial and fast.

这是一个很好地非纯管道候选者，因为它的 `transform` 函数又小又快。

<code-example path="pipes/src/app/flying-heroes.pipe.ts" linenums="false" header="src/app/flying-heroes.pipe.ts (filter)" region="filter">

</code-example>

You can derive a `FlyingHeroesImpureComponent` from `FlyingHeroesComponent`.

你可以从 `FlyingHeroesComponent` 派生出一个 `FlyingHeroesImpureComponent`。

<code-example path="pipes/src/app/flying-heroes-impure.component.html" linenums="false" header="src/app/flying-heroes-impure.component.html (excerpt)" region="template-flying-heroes">

</code-example>

The only substantive change is the pipe in the template.
You can confirm in the <live-example></live-example> that the _flying heroes_
display updates as you add heroes, even when you mutate the `heroes` array.

唯一的重大改动就是管道。
  你可以在<live-example></live-example>中确认，当你添加新的英雄甚至修改 `heroes` 数组时，这个*会飞的英雄*的显示也跟着更新了。

{@a async-pipe}

<h3 class="no-toc">The impure <i>AsyncPipe</i></h3>

<h3 class="no-toc">非纯  <i>AsyncPipe</i></h3>

The Angular `AsyncPipe` is an interesting example of an impure pipe.
The `AsyncPipe` accepts a `Promise` or `Observable` as input
and subscribes to the input automatically, eventually returning the emitted values.

Angular 的 `AsyncPipe` 是一个有趣的非纯管道的例子。
  `AsyncPipe` 接受一个 `Promise` 或 `Observable` 作为输入，并且自动订阅这个输入，最终返回它们给出的值。

The `AsyncPipe` is also stateful.
The pipe maintains a subscription to the input `Observable` and
keeps delivering values from that `Observable` as they arrive.

`AsyncPipe` 管道是有状态的。
  该管道维护着一个所输入的 `Observable` 的订阅，并且持续从那个 `Observable` 中发出新到的值。

This next example binds an `Observable` of message strings
(`message$`) to a view with the `async` pipe.

下面例子使用该 `async` 管道把一个消息字符串(`message$`)的 `Observable` 绑定到视图中。

<code-example path="pipes/src/app/hero-async-message.component.ts" header="src/app/hero-async-message.component.ts">

</code-example>

The Async pipe saves boilerplate in the component code.
The component doesn't have to subscribe to the async data source,
extract the resolved values and expose them for binding,
and have to unsubscribe when it's destroyed
(a potent source of memory leaks).

这个 Async 管道节省了组件的样板代码。
组件不用订阅这个异步数据源，而且不用在被销毁时取消订阅(如果订阅了而忘了反订阅容易导致隐晦的内存泄露)。

<h3 class="no-toc">An impure caching pipe</h3>

<h3 class="no-toc">一个非纯而且带缓存的管道</h3>

Write one more impure pipe, a pipe that makes an HTTP request.

来写更多的非纯管道：一个向服务器发起 HTTP 请求的管道。

Remember that impure pipes are called every few milliseconds.
If you're not careful, this pipe will punish the server with requests.

时刻记住，非纯管道可能每隔几微秒就会被调用一次。
如果你不小心点，这个管道就会发起一大堆请求“攻击”服务器。

In the following code, the pipe only calls the server when the requested URL changes and it caches the server response.
The code uses the [Angular http](guide/http) client to retrieve data:

下面这个管道只有当所请求的 URL 发生变化时才会向服务器发起请求。它会缓存服务器的响应。
代码如下，它使用[Angular http](guide/http)客户端来接收数据

<code-example path="pipes/src/app/fetch-json.pipe.ts" header="src/app/fetch-json.pipe.ts">

</code-example>

Now demonstrate it in a harness component whose template defines two bindings to this pipe,
both requesting the heroes from the `heroes.json` file.

接下来在一个测试挽具组件中演示一下它，该组件的模板中定义了两个使用到此管道的绑定，它们都从 `heroes.json` 文件中取得英雄数据。

<code-example path="pipes/src/app/hero-list.component.ts" header="src/app/hero-list.component.ts">

</code-example>

The component renders as the following:

组件渲染起来是这样的：

<figure>
  <img src='generated/images/guide/pipes/hero-list.png' alt="Hero List">
</figure>

A breakpoint on the pipe's request for data shows the following:

这个管道上的断点请求数据的过程显示：

* Each binding gets its own pipe instance.

   每个绑定都有它自己的管道实例。

* Each pipe instance caches its own URL and data.

   每个管道实例都缓存了它自己的 URL 和数据。

* Each pipe instance only calls the server once.

   每个管道实例都只调用一次服务器。

<h3 class="no-toc"><i>JsonPipe</i></h3>

In the previous code sample, the second `fetch` pipe binding demonstrates more pipe chaining.
It displays the same hero data in JSON format by chaining through to the built-in `JsonPipe`.

第二个绑定除了用到 `FetchPipe` 之外还链接了更多管道。
它通过串联上内置管道 `JsonPipe` 来把英雄数据显示成了 JSON 格式。

<div class="callout is-helpful">

<header>Debugging with the json pipe</header>

<header>借助 json 管道进行调试</header>

The [JsonPipe](api/common/JsonPipe)
provides an easy way to diagnosis a mysteriously failing data binding or
inspect an object for future binding.

[JsonPipe](api/common/JsonPipe)为你诊断数据绑定的某些神秘错误或为做进一步绑定而探查数据时，提供了一个简单途径。

</div>

{@a pure-pipe-pure-fn}

<h3 class="no-toc">Pure pipes and pure functions</h3>

<h3 class="no-toc">纯管道与纯函数</h3>

A pure pipe uses pure functions.
Pure functions process inputs and return values without detectable side effects.
Given the same input, they should always return the same output.

纯管道使用纯函数。
纯函数是指在处理输入并返回结果时，不会产生任何副作用的函数。
给定相同的输入，它们总是返回相同的输出。

The pipes discussed earlier in this page are implemented with pure functions.
The built-in `DatePipe` is a pure pipe with a pure function implementation.
So are the `ExponentialStrengthPipe` and `FlyingHeroesPipe`.
A few steps back, you reviewed the `FlyingHeroesImpurePipe`&mdash;an impure pipe with a pure function.

在本章前面讨论的管道都是用纯函数实现的。
内置的 `DatePipe` 就是一个用纯函数实现的纯管道。
`ExponentialStrengthPipe` 是如此，
`FlyingHeroesComponent` 也是如此。
不久前你刚看过的 `FlyingHeroesImpurePipe` 就是一个*用纯函数实现的非纯管道*。

But always implement a *pure pipe* with a *pure function*.
Otherwise, you'll see many console errors regarding expressions that changed after they were checked.

但是一个*纯管道*必须总是用*纯函数*实现。忽略这个警告将导致失败并带来一大堆这样的控制台错误：表达式在被检查后被变更。

## Next steps

## 下一步

Pipes are a great way to encapsulate and share common display-value
transformations. Use them like styles, dropping them
into your template's expressions to enrich the appeal and usability
of your views.

管道能很好的封装和共享的通用“值-显示”转换逻辑。可以像样式一样使用它们，把它们扔到模板表达式中，以提升视图的表现力和可用性。

Explore Angular's inventory of built-in pipes in the [API Reference](api?type=pipe).
Try writing a custom pipe and perhaps contributing it to the community.

要浏览 Angular 的所有内置管道，请到[API 参考手册](api?type=pipe)。
学着写写自定义管道，并贡献给开发社区。

{@a no-filter-pipe}

## Appendix: No *FilterPipe* or *OrderByPipe*

## 附录：没有 *FilterPipe* 或者 *OrderByPipe*

Angular doesn't provide pipes for filtering or sorting lists.
Developers familiar with AngularJS know these as `filter` and `orderBy`.
There are no equivalents in Angular.

Angular 没有随身发布过滤或列表排序的管道。
熟悉 AngularJS 的开发人员应该知道 `filter` 和 `orderBy` 过滤器，但在 Angular 中它们没有等价物。

This isn't an oversight. Angular doesn't offer such pipes because
they perform poorly and prevent aggressive minification.
Both `filter` and `orderBy` require parameters that reference object properties.
Earlier in this page, you learned that such pipes must be [impure](guide/pipes#pure-and-impure-pipes) and that
Angular calls impure pipes in almost every change-detection cycle.

这并不是疏忽。Angular 不想提供这些管道，因为 (a) 它们性能堪忧，以及 (b) 它们会阻止比较激进的代码最小化(minification)。
无论是 `filter` 还是 `orderBy` 都需要它的参数引用对象型属性。
你在前面学过，这样的管道必然是[*非纯管道*](guide/pipes#pure-and-impure-pipes)，并且 Angular 会在几乎每一次变更检测周期中调用非纯管道。

Filtering and especially sorting are expensive operations.
The user experience can degrade severely for even moderate-sized lists when Angular calls these pipe methods many times per second.
`filter` and `orderBy` have often been abused in AngularJS apps, leading to complaints that Angular itself is slow.
That charge is fair in the indirect sense that AngularJS prepared this performance trap
by offering `filter` and `orderBy` in the first place.

过滤、 特别是排序是昂贵的操作。
当 Angular 每秒调用很多次这类管道函数时，即使是中等规模的列表都可能严重降低用户体验。
在 AngularJS 程序中，`filter` 和 `orderBy` 经常被误用，结果连累到 Angular 自身，人们抱怨说它太慢。
从某种意义上，这也不冤：谁叫 AngularJS 把 `filter` 和 `orderBy` 作为首发队员呢？是它自己准备了这个性能陷阱。

The minification hazard is also compelling, if less obvious. Imagine a sorting pipe applied to a list of heroes.
The list might be sorted by hero `name` and `planet` of origin properties in the following way:

虽然不是很明显，但代码最小化方面也存在风险。想象一个用于英雄列表的排序管道。该列表可能根据英雄原始属性中的 `name` 和 `planet` 进行排序，就像这样：

<code-example language="html">
  &lt;!-- NOT REAL CODE! -->
  &lt;div *ngFor="let hero of heroes | orderBy:'name,planet'">&lt;/div>
</code-example>

You identify the sort fields by text strings, expecting the pipe to reference a property value by indexing
(such as `hero['name']`).
Unfortunately, aggressive minification manipulates the `Hero` property names so that `Hero.name` and `Hero.planet`
become something like `Hero.a` and `Hero.b`. Clearly `hero['name']` doesn't work.

你使用文本字符串来标记出排序字段，期望管道通过索引形式(如 `hero['name']`)引用属性的值。
  不幸的是，激进的代码最小化策略会*改变*`Hero` 类的属性名，所以 `Hero.name` 和 `Hero.planet` 可能会被变成 `Hero.a` 和 `Hero.b`。
  显然，`hero['name']` 是无法正常工作的。

While some may not care to minify this aggressively,
the Angular product shouldn't prevent anyone from minifying aggressively.
Therefore, the Angular team decided that everything Angular provides will minify safely.

然而有些人可能不想做那么激进的最小化，
Angular 作为一个产品不应该拒绝那些想做激进的最小化的人。
所以，Angular 开发组决定随 Angular 一起发布的每样东西，都应该能被安全的最小化。

The Angular team and many experienced Angular developers strongly recommend moving
filtering and sorting logic into the component itself.
The component can expose a `filteredHeroes` or `sortedHeroes` property and take control
over when and how often to execute the supporting logic.
Any capabilities that you would have put in a pipe and shared across the app can be
written in a filtering/sorting service and injected into the component.

Angular 开发组和一些有经验的 Angular 开发者强烈建议你：把你的过滤和排序逻辑挪进组件本身。
组件可以对外暴露一个 `filteredHeroes` 或 `sortedHeroes` 属性，这样它就获得控制权，以决定要用什么频度去执行其它辅助逻辑。
你原本准备实现为管道，并在整个应用中共享的那些功能，都能被改写为一个过滤/排序的服务，并注入到组件中。

If these performance and minification considerations don't apply to you, you can always create your own such pipes
(similar to the [FlyingHeroesPipe](guide/pipes#impure-flying-heroes)) or find them in the community.

如果你不需要顾虑这些性能和最小化问题，也可以创建自己的管道来实现这些功能(参考[FlyingHeroesPipe](guide/pipes#impure-flying-heroes)中的写法)或到社区中去找找。
