# Structural Directives

# 结构型指令

<style>
  h4 {font-size: 17px !important; text-transform: none !important;}
  .syntax { font-family: Consolas, 'Lucida Sans', Courier, sans-serif; color: black; font-size: 85%; }

</style>



This guide looks at how Angular manipulates the DOM with **structural directives** and
how you can write your own structural directives to do the same thing.

在本章中，我们将看看Angular如何用*结构型指令*操纵DOM树，以及我们该如何写自己的结构型指令来完成同样的任务。

Try the <live-example></live-example>.

试试<live-example></live-example>。


{@a definition}



## What are structural directives?

## 什么是结构型指令？

Structural directives are responsible for HTML layout.
They shape or reshape the DOM's _structure_, typically by adding, removing, or manipulating
elements.

结构型指令的职责是HTML布局。
它们塑造或重塑DOM的结构，比如添加、移除或维护这些元素。

As with other directives, you apply a structural directive to a _host element_.
The directive then does whatever it's supposed to do with that host element and its descendents.

像其它指令一样，你可以把结构型指令应用到一个*宿主元素*上。
然后它就可以对宿主元素及其子元素做点什么。

Structural directives are easy to recognize.
An asterisk (*) precedes the directive attribute name as in this example.

结构型指令非常容易识别。
在这个例子中，星号（*）被放在指令的属性名之前。


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif)" region="ngif">

</code-example>



No brackets. No parentheses. Just `*ngIf` set to a string.

没有方括号，没有圆括号，只是把`*ngIf`设置为一个字符串。

You'll learn in this guide that the [asterisk (*) is a convenience notation](guide/structural-directives#asterisk)
and the string isa [_microsyntax_](guide/structural-directives#microsyntax) rather than the usual
[template expression](guide/template-syntax#template-expressions).
Angular desugars this notation into a marked-up `<ng-template>` that surrounds the
host element and its descendents.
Each structural directive does something different with that template.

在这个例子中，我们将学到[星号(*)这个简写方法](guide/structural-directives#asterisk)，而这个字符串是一个[*微语法*](guide/structural-directives#microsyntax)，而不是通常的[模板表达式](guide/template-syntax#template-expressions)。
Angular会解开这个语法糖，变成一个`<ng-template>`标记，包裹着宿主元素及其子元素。
每个结构型指令都可以用这个模板做点不同的事情。

Three of the common, built-in structural directives&mdash;[NgIf](guide/template-syntax#ngIf),
[NgFor](guide/template-syntax#ngFor), and [NgSwitch...](guide/template-syntax#ngSwitch)&mdash;are
described in the [_Template Syntax_](guide/template-syntax) guide and seen in samples throughout the Angular documentation.
Here's an example of them in a template:

三个常用的内置结构型指令 —— [NgIf](guide/template-syntax#ngIf)、[NgFor](guide/template-syntax#ngFor)和[NgSwitch...](guide/template-syntax#ngSwitch)。
我们在[*模板语法*](guide/template-syntax)一章中讲过它，并且在Angular文档的例子中到处都在用它。下面是模板中的例子：


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (built-in)" region="built-in">

</code-example>



This guide won't repeat how to _use_ them. But it does explain _how they work_
and how to [write your own](guide/structural-directives#unless) structural directive.

本章不会重复讲如何*使用*它们，而是解释它们的*工作原理*以及如何[写自己的结构型指令](guide/structural-directives#unless)。


<div class="callout is-helpful">



<header>
  Directive spelling
</header>



<header>
  指令的拼写形式
</header>



Throughout this guide, you'll see a directive spelled in both _UpperCamelCase_ and _lowerCamelCase_.
Already you've seen `NgIf` and `ngIf`.
There's a reason. `NgIf` refers to the directive _class_;
`ngIf` refers to the directive's _attribute name_.

在本章中，我们将看到指令同时具有两种拼写形式*大驼峰`UpperCamelCase`和小驼峰`lowerCamelCase`，比如我们已经看过的`NgIf`和`ngIf`。
这里的原因在于，`NgIf`引用的是指令的*类名*，而`ngIf`引用的是指令的*属性名*。

A directive _class_ is spelled in _UpperCamelCase_ (`NgIf`).
A directive's _attribute name_ is spelled in _lowerCamelCase_ (`ngIf`).
The guide refers to the directive _class_ when talking about its properties and what the directive does.
The guide refers to the _attribute name_ when describing how
you apply the directive to an element in the HTML template.

指令的*类名*拼写成*大驼峰形式*（`NgIf`），而它的*属性名*则拼写成*小驼峰形式*（`ngIf`）。
本章会在谈论指令的属性和工作原理时引用指令的*类名*，在描述如何在HTML模板中把该指令应用到元素时，引用指令的*属性名*。


</div>



<div class="l-sub-section">



There are two other kinds of Angular directives, described extensively elsewhere:
(1)&nbsp;components and (2)&nbsp;attribute directives.

还有另外两种Angular指令，在本开发指南的其它地方有讲解：(1) 组件 (2) 属性型指令。

A *component* manages a region of HTML in the manner of a native HTML element.
Technically it's a directive with a template.

*组件*可以在原生HTML元素中管理一小片区域的HTML。从技术角度说，它就是一个带模板的指令。

An [*attribute* directive](guide/attribute-directives) changes the appearance or behavior
of an element, component, or another directive.
For example, the built-in [`NgStyle`](guide/template-syntax#ngStyle) directive
changes several element styles at the same time.

[*属性型*指令](guide/attribute-directives)会改变某个元素、组件或其它指令的外观或行为。
比如，内置的[`NgStyle`](guide/template-syntax#ngStyle)指令可以同时修改元素的多个样式。

You can apply many _attribute_ directives to one host element.
You can [only apply one](guide/structural-directives#one-per-element) _structural_ directive to a host element.

我们可以在一个宿主元素上应用多个*属性型*指令，但[只能应用一个](guide/structural-directives#one-per-element)*结构型*指令。


</div>



{@a ngIf}



## NgIf case study

## NgIf案例分析

`NgIf` is the simplest structural directive and the easiest to understand.
It takes a boolean expression and makes an entire chunk of the DOM appear or disappear.

我们重点看下`ngIf`。它是一个很好的结构型指令案例：它接受一个布尔值，并据此让一整块DOM树出现或消失。


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif-true)" region="ngif-true">

</code-example>



The `ngIf` directive doesn't hide elements with CSS. It adds and removes them physically from the DOM.
Confirm that fact using browser developer tools to inspect the DOM.

`ngIf`指令并不是使用CSS来隐藏元素的。它会把这些元素从DOM中物理删除。
使用浏览器的开发者工具就可以确认这一点。


<figure>
  <img src='generated/images/guide/structural-directives/element-not-in-dom.png' alt="ngIf=false element not in DOM">
</figure>



The top paragraph is in the DOM. The bottom, disused paragraph is not;
in its place is a comment about "bindings" (more about that [later](guide/structural-directives#asterisk)).

可以看到第一段文字出现在了DOM中，而第二段则没有，在第二段的位置上是一个关于“绑定”的注释（[稍后](guide/structural-directives#asterisk)有更多讲解）。

When the condition is false, `NgIf` removes its host element from the DOM,
detaches it from DOM events (the attachments that it made),
detaches the component from Angular change detection, and destroys it.
The component and DOM nodes can be garbage-collected and free up memory.

当条件为假时，`NgIf`会从DOM中移除它的宿主元素，取消它监听过的那些DOM事件，从Angular变更检测中移除该组件，并销毁它。
这些组件和DOM节点可以被当做垃圾收集起来，并且释放它们占用的内存。

### Why *remove* rather than *hide*?

### 为什么*移除*而不是*隐藏*？

A directive could hide the unwanted paragraph instead by setting its `display` style to `none`.

指令也可以通过把它的`display`风格设置为`none`而隐藏不需要的段落。


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (display-none)" region="display-none">

</code-example>



While invisible, the element remains in the DOM.

当不可见时，这个元素仍然留在DOM中。


<figure>
  <img src='generated/images/guide/structural-directives/element-display-in-dom.png' alt="hidden element still in DOM">
</figure>



The difference between hiding and removing doesn't matter for a simple paragraph.
It does matter when the host element is attached to a resource intensive component.
Such a component's behavior continues even when hidden.
The component stays attached to its DOM element. It keeps listening to events.
Angular keeps checking for changes that could affect data bindings.
Whatever the component was doing, it keeps doing.

对于简单的段落，隐藏和移除之间的差异影响不大，但对于资源占用较多的组件是不一样的。当我们隐藏掉一个元素时，组件的行为还在继续 —— 它仍然附加在它所属的DOM元素上，
它也仍在监听事件。Angular会继续检查哪些能影响数据绑定的变更。
组件原本要做的那些事情仍在继续。

Although invisible, the component&mdash;and all of its descendant components&mdash;tie up resources.
The performance and memory burden can be substantial, responsiveness can degrade, and the user sees nothing.

虽然不可见，组件及其各级子组件仍然占用着资源，而这些资源如果分配给别人可能会更有用。
在性能和内存方面的负担相当可观，响应度会降低，而用户却可能无法从中受益。

On the positive side, showing the element again is quick.
The component's previous state is preserved and ready to display.
The component doesn't re-initialize&mdash;an operation that could be expensive.
So hiding and showing is sometimes the right thing to do.

当然，从积极的一面看，重新显示这个元素会非常快。
  组件以前的状态被保留着，并随时可以显示。
  组件不用重新初始化 —— 该操作可能会比较昂贵。
  这时候隐藏和显示就成了正确的选择。

But in the absence of a compelling reason to keep them around,
your preference should be to remove DOM elements that the user can't see
and recover the unused resources with a structural directive like `NgIf` .

但是，除非有非常强烈的理由来保留它们，否则我们更倾向于移除用户看不见的那些DOM元素，并且使用`NgIf`这样的结构型指令来收回用不到的资源。

**These same considerations apply to every structural directive, whether built-in or custom.**
Before applying a structural directive, you might want to pause for a moment
to consider the consequences of adding and removing elements and of creating and destroying components.

**同样的考量也适用于每一个结构型指令，无论是内置的还是自定义的。**
  我们应该提醒自己以及我们指令的使用者，来仔细考虑添加元素、移除元素以及创建和销毁组件的后果。


{@a asterisk}



## The asterisk (*) prefix

## 星号（*）前缀

Surely you noticed the asterisk (*) prefix to the directive name
and wondered why it is necessary and what it does.

你可能注意到了指令名的星号（*）前缀，并且困惑于为什么需要它以及它是做什么的。

Here is `*ngIf` displaying the hero's name if `hero` exists.

这里的`*ngIf`会在`hero`存在时显示英雄的名字。


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (asterisk)" region="asterisk">

</code-example>



The asterisk is "syntactic sugar" for something a bit more complicated.
Internally, Angular desugars it in two stages.
First, it translates the `*ngIf="..."` into a template _attribute_, `template="ngIf ..."`,&nbsp; like this.

星号是一个用来简化更复杂语法的“语法糖”。
从内部实现来说，Angular会分两个阶段解开这个语法糖。
首先，它把`*ngIf="..."`翻译成一个`template`*属性* `template="ngIf ..."`，代码如下：


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif-template-attr)" region="ngif-template-attr">

</code-example>



Then it translates the template _attribute_ into a `<ng-template>` _element_, wrapped around the host element, like this.

然后，它把这个`template`*属性*翻译成一个`<ng-template>`*元素*，并用它包裹宿主元素，代码如下：


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif-template)" region="ngif-template">

</code-example>



* The `*ngIf` directive moved to the `<ng-template>` element where it became a property binding,`[ngIf]`.

  `*ngIf`指令被移到了`<ng-template>`元素上。在那里它变成了一个属性绑定`[ngIf]`。

* The rest of the `<div>`, including its class attribute, moved inside the `<ng-template>` element.

  `<div>`上的其余部分，包括它的`class`属性在内，移到了内部的`<ng-template>`元素上。

None of these forms are actually rendered.
Only the finished product ends up in the DOM.

上述形式永远不会真的渲染出来。
只有最终产出的结果才会出现在DOM中。


<figure>
  <img src='generated/images/guide/structural-directives/hero-div-in-dom.png' alt="hero div in DOM">
</figure>



Angular consumed the `<ng-template>` content during its actual rendering and
replaced the `<ng-template>` with a diagnostic comment.

Angular会在真正渲染的时候填充`<ng-template>`的内容，并且把`<ng-template>`替换为一个供诊断用的注释。

The [`NgFor`](guide/structural-directives#ngFor) and [`NgSwitch...`](guide/structural-directives#ngSwitch) directives follow the same pattern.

[`NgFor`](guide/structural-directives#ngFor)和[`NgSwitch...`](guide/structural-directives#ngSwitch)指令也都遵循同样的模式。


{@a ngFor}



## Inside _*ngFor_

## `*ngFor`内幕

Angular transforms the `*ngFor` in similar fashion from asterisk (*) syntax through
template _attribute_ to `<ng-template>` _element_.

Angular会把`*ngFor`用同样的方式把星号（*）语法的`template`*属性*转换成`<ng-template>`*元素*。

Here's a full-featured application of `NgFor`, written all three ways:

这里有一个`NgFor`的全特性应用，同时用了这三种写法：


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (inside-ngfor)" region="inside-ngfor">

</code-example>



This is manifestly more complicated than `ngIf` and rightly so.
The `NgFor` directive has more features, both required and optional, than the `NgIf` shown in this guide.
At minimum `NgFor` needs a looping variable (`let hero`) and a list (`heroes`).

它明显比`ngIf`复杂得多，确实如此。
`NgFor`指令比本章展示过的`NgIf`具有更多的必选特性和可选特性。
至少`NgFor`会需要一个循环变量（`let hero`）和一个列表（`heroes`）。

You enable these features in the string assigned to `ngFor`, which you write in Angular's [microsyntax](guide/structural-directives#microsyntax).

我们可以通过把一个字符串赋值给`ngFor`来启用这些特性，这个字符串使用Angular的[微语法](guide/structural-directives#microsyntax)。


<div class="alert is-helpful">



Everything _outside_ the `ngFor` string stays with the host element
(the `<div>`) as it moves inside the `<ng-template>`.
In this example, the `[ngClass]="odd"` stays on the `<div>`.

`ngFor`字符串*之外*的每一样东西都会留在宿主元素（`<div>`）上，也就是说它移到了`<ng-template>`内部。
在这个例子中，`[ngClass]="odd"`留在了`<div>`上。


</div>



{@a microsyntax}


### Microsyntax

### 微语法

The Angular microsyntax lets you configure a directive in a compact, friendly string.
The microsyntax parser translates that string into attributes on the `<ng-template>`:

Angular微语法能让我们通过简短的、友好的字符串来配置一个指令。
微语法解析器把这个字符串翻译成`<ng-template>`上的属性：

* The `let` keyword declares a [_template input variable_](guide/structural-directives#template-input-variable)
that you reference within the template. The input variables in this example are `hero`, `i`, and `odd`.
The parser translates `let hero`, `let i`, and `let odd` into variables named,
`let-hero`, `let-i`, and `let-odd`.

  `let`关键字声明一个[模板输入变量](guide/structural-directives#template-input-variable)，我们会在模板中引用它。本例子中，这个输入变量就是`hero`、`i`和`odd`。
  解析器会把`let hero`、`let i`和`let odd`翻译成命名变量`let-hero`、`let-i`和`let-odd`。

* The microsyntax parser takes `of` and `trackby`, title-cases them (`of` -> `Of`, `trackBy` -> `TrackBy`),
and prefixes them with the directive's attribute name (`ngFor`), yielding the names `ngForOf` and `ngForTrackBy`.
Those are the names of two `NgFor` _input properties_ .
That's how the directive learns that the list is `heroes` and the track-by function is `trackById`.

  微语法解析器接收`of`和`trackby`，把它们首字母大写（`of` -> `Of`, `trackBy` -> `TrackBy`），
  并且给它们加上指令的属性名（`ngFor`）前缀，最终生成的名字是`ngForOf`和`ngForTrackBy`。
  还有两个`NgFor`的*输入属性*，指令据此了解到列表是`heroes`，而track-by函数是`trackById`。

* As the `NgFor` directive loops through the list, it sets and resets properties of its own _context_ object.
These properties include `index` and `odd` and a special property named `$implicit`.

  `NgFor`指令在列表上循环，每个循环中都会设置和重置它自己的*上下文*对象上的属性。
  这些属性包括`index`和`odd`以及一个特殊的属性名`$implicit`（隐式变量）。

* The `let-i` and `let-odd` variables were defined as `let i=index` and `let odd=odd`.
Angular sets them to the current value of the context's `index` and `odd` properties.

  `let-i`和`let-odd`变量是通过`let i=index`和`let odd=odd`来定义的。
  Angular把它们设置为*上下文*对象中的`index`和`odd`属性的当前值。

* The context property for `let-hero` wasn't specified.
It's intended source is implicit.
Angular sets `let-hero` to the value of the context's `$implicit` property
which `NgFor` has initialized with the hero for the current iteration.

  上下文中的属性`let-hero`没有指定过，实际上它来自一个隐式变量。
  Angular会把`let-hero`设置为上下文对象中的`$implicit`属性，`NgFor`会用当前迭代中的英雄初始化它。

* The [API guide](api/common/NgFor "API: NgFor")
describes additional `NgFor` directive properties and context properties.

  [API参考手册](api/common/NgFor "API: NgFor")中描述了`NgFor`指令的其它属性和上下文属性。

These microsyntax mechanisms are available to you when you write your own structural directives.
Studying the
[source code for `NgIf`](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts "Source: NgIf")
and [`NgFor`](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_for_of.ts "Source: NgFor")
is a great way to learn more.

这些微语法机制在你写自己的结构型指令时也同样有效，参考[`NgIf`的源码](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts "Source: NgIf")
和[`NgFor`的源码](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_for_of.ts "Source: NgFor") 可以学到更多。


{@a template-input-variable}


{@a template-input-variables}


### Template input variable

### 模板输入变量

A _template input variable_ is a variable whose value you can reference _within_ a single instance of the template.
There are several such variables in this example: `hero`, `i`, and `odd`.
All are preceded by the keyword `let`.

*模板输入变量*是这样一种变量，你可以*在单个实例的模板中*引用它的值。
这个例子中有好几个模板输入变量：`hero`、`i`和`odd`。
它们都是用`let`作为前导关键字。

A _template input variable_ is **_not_** the same as a
[template _reference_ variable](guide/template-syntax#ref-vars),
neither _semantically_ nor _syntactically_.

You declare a template _input_ variable using the `let` keyword (`let hero`).
The variable's scope is limited to a _single instance_ of the repeated template.
You can use the same variable name again in the definition of other structural directives.

You declare a template _reference_ variable by prefixing the variable name with `#` (`#var`).
A _reference_ variable refers to its attached element, component or directive.
It can be accessed _anywhere_ in the _entire template_.

Template _input_ and _reference_ variable names have their own namespaces. The `hero` in `let hero` is never the same
variable as the `hero` declared as `#hero`.


{@a one-per-element}


### One structural directive per host element

Someday you'll want to repeat a block of HTML but only when a particular condition is true.
You'll _try_ to put both an `*ngFor` and an `*ngIf` on the same host element.
Angular won't let you. You may apply only one _structural_ directive to an element.

The reason is simplicity. Structural directives can do complex things with the host element and its descendents.
When two directives lay claim to the same host element, which one takes precedence?
Which should go first, the `NgIf` or the `NgFor`? Can the `NgIf` cancel the effect of the `NgFor`?
If so (and it seems like it should be so), how should Angular generalize the ability to cancel for other structural directives?

There are no easy answers to these questions. Prohibiting multiple structural directives makes them moot.
There's an easy solution for this use case: put the `*ngIf` on a container element that wraps the `*ngFor` element.
One or both elements can be an [`ng-container`](guide/structural-directives#ngcontainer) so you don't have to introduce extra levels of HTML.


{@a ngSwitch}



## Inside _NgSwitch_ directives

The Angular _NgSwitch_ is actually a set of cooperating directives: `NgSwitch`, `NgSwitchCase`, and `NgSwitchDefault`.

Here's an example.


<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngswitch)" region="ngswitch">

</code-example>



The switch value assigned to `NgSwitch` (`hero.emotion`) determines which
(if any) of the switch cases are displayed.

`NgSwitch` itself is not a structural directive.
It's an _attribute_ directive that controls the behavior of the other two switch directives.
That's why you write `[ngSwitch]`, never `*ngSwitch`.

`NgSwitchCase` and `NgSwitchDefault` _are_ structural directives.
You attach them to elements using the asterisk (*) prefix notation.
An `NgSwitchCase` displays its host element when its value matches the switch value.
The `NgSwitchDefault` displays its host element when no sibling `NgSwitchCase` matches the switch value.


<div class="l-sub-section">



*Design thought*: minimize initialization effort and consider caching state in a  
companion service.

*设计思路*：要最小化初始化的成本，并考虑把状态缓存在一个伴生的服务中。


</div>



As with other structural directives, the `NgSwitchCase` and `NgSwitchDefault`
can be desugared into the template _attribute_ form.

**These same considerations apply to every structural directive, whether built-in or custom.**
We should ask ourselves &mdash; and the users of our directives &mdash; to think carefully
about the consequences of adding and removing elements and of creating and destroying components.

**同样的考量也适用于每一个结构型指令，无论是内置的还是自定义的。**
  我们应该提醒自己以及我们指令的使用者，来仔细考虑添加元素、移除元素以及创建和销毁组件的后果。

Let's see these dynamics at work. For fun, we'll stack the deck *against*
our recommendation and consider a component called `heavy-loader` that
***pretends*** to load a ton of data when initialized.

让我们在实践中看看这些变化。为了娱乐，我们设想在甲板上有个叫`heavy-loader`(重型起重机)的组件，它会***假装***在初始化时装载一吨数据。

We'll display two instances of the component.  We toggle the visibility of the first one with CSS.
We toggle the second into and out of the DOM with `ngIf`.

我们将显示该组件的两个实例。我们使用CSS切换第一个实例的可见性，用`ngIf`把第二个实例添加到DOM和将其移除。


That, in turn, can be desugared into the `<ng-template>` element form.

换句话说，可以把它"解语法糖"，成为`<ng-template>`元素的形式。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngswitch-template)" region="ngswitch-template">

</code-example>



{@a prefer-asterisk}


## Prefer the asterisk (*) syntax.

## 优先使用星号（`*`）语法

The asterisk (*) syntax is more clear than the other desugared forms.
Use [&lt;ng-container&gt;](guide/structural-directives#ng-container) when there's no single element
to host the directive.

星号（`*`）语法比不带语法糖的形式更加清晰。
如果找不到单一的元素来应用该指令，可以使用[&lt;ng-container&gt;](guide/structural-directives#ng-container)作为该指令的容器。

While there's rarely a good reason to apply a structural directive in template _attribute_ or _element_ form,
it's still important to know that Angular creates a `<ng-template>` and to understand how it works.
You'll refer to the `<ng-template>` when you [write your own structural directive](guide/structural-directives#unless).

虽然很少有理由在模板中使用结构型指令的*属性*形式和*元素*形式，但这些幕后知识仍然是很重要的，即：Angular会创建`<ng-template>`，还要了解它的工作原理。
当需要[写自己的结构型指令](guide/structural-directives#unless)时，我们就要使用`<ng-template>`。

{@a template}



## The *&lt;ng-template&gt;*

## *&lt;ng-template&gt;*指令

The &lt;ng-template&gt; is an Angular element for rendering HTML.
It is never displayed directly.
In fact, before rendering the view, Angular _replaces_ the `<ng-template>` and its contents with a comment.

&lt;ng-template&gt;是一个 Angular 元素，用来渲染HTML。
它永远不会直接显示出来。
事实上，在渲染视图之前，Angular 会把`<ng-template>`及其内容*替换为*一个注释。

If there is no structural directive and you merely wrap some elements in a `<ng-template>`,
those elements disappear.
That's the fate of the middle "Hip!" in the phrase "Hip! Hip! Hooray!".

如果没有使用结构型指令，而仅仅把一些别的元素包装进`<ng-template>`中，那些元素就是不可见的。
在下面的这个短语"Hip! Hip! Hooray!"中，中间的这个 "Hip!"（欢呼声） 就是如此。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (template-tag)" region="template-tag">

</code-example>



Angular erases the middle "Hip!", leaving the cheer a bit less enthusiastic.

Angular 抹掉了中间的那个 "Hip!" ，让欢呼声显得不再那么热烈了。

<figure>
  <img src='generated/images/guide/structural-directives/template-rendering.png' alt="template tag rendering">
</figure>



A structural directive puts a `<ng-template>` to work
as you'll see when you [write your own structural directive](guide/structural-directives#unless).

结构型指令会让`<ng-template>`正常工作，在我们[写自己的结构型指令](guide/structural-directives#unless)时就会看到这一点。

{@a ngcontainer}


{@a ng-container}



## Group sibling elements with &lt;ng-container&gt;

## 使用&lt;ng-container&gt;把一些兄弟元素归为一组

There's often a _root_ element that can and should host the structural directive.
The list element (`<li>`) is a typical host element of an `NgFor` repeater.

通常都要有一个*根*元素作为结构型指令的数组。
列表元素（`<li>`）就是一个典型的供`NgFor`使用的宿主元素。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngfor-li)" region="ngfor-li">

</code-example>



When there isn't a host element, you can usually wrap the content in a native HTML container element,
such as a `<div>`, and attach the directive to that wrapper.

当没有这样一个单一的宿主元素时，我们可以把这些内容包裹在一个原生的HTML容器元素中，比如`<div>`，并且把结构型指令附加到这个"包裹"上。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif)" region="ngif">

</code-example>



Introducing another container element&mdash;typically a `<span>` or `<div>`&mdash;to
group the elements under a single _root_ is usually harmless.
_Usually_ ... but not _always_.

但引入另一个容器元素（通常是`<span>`或`<div>`）来把一些元素归到一个单一的*根元素*下，通常也会带来问题。注意，是"通常"而不是"总会"。

The grouping element may break the template appearance because CSS styles
neither expect nor accommodate the new layout.
For example, suppose you have the following paragraph layout.

这种用于分组的元素可能会破坏模板的外观表现，因为CSS的样式既不曾期待也不会接受这种新的元素布局。
比如，假设你有下列分段布局。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif-span)" region="ngif-span">

</code-example>



You also have a CSS style rule that happens to apply to a `<span>` within a `<p>`aragraph.

而我们的CSS样式规则是应用于`<p>`元素下的`<span>`的。

<code-example path="structural-directives/src/app/app.component.css" linenums="false" title="src/app/app.component.css (p-span)" region="p-span">

</code-example>



The constructed paragraph renders strangely.

这样渲染出来的段落就会非常奇怪。

<figure>
  <img src='generated/images/guide/structural-directives/bad-paragraph.png' alt="spanned paragraph with bad style">
</figure>



The `p span` style, intended for use elsewhere, was inadvertently applied here.

本来为其它地方准备的`p span`样式，被意外的应用到了这里。

Another problem: some HTML elements require all immediate children to be of a specific type.
For example, the `<select>` element requires `<option>` children.
You can't wrap the _options_ in a conditional `<div>` or a `<span>`.

另一个问题是：有些HTML元素需要所有的直属下级都具有特定的类型。
比如，`<select>`元素要求直属下级必须为`<option>`，那么我们就没办法把这些选项包装进`<div>`或`<span>`中。

When you try this,

如果这样做：

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (select-span)" region="select-span">

</code-example>



the drop down is empty.

下拉列表就是空的。

<figure>
  <img src='generated/images/guide/structural-directives/bad-select.png' alt="spanned options don't work">
</figure>



The browser won't display an `<option>` within a `<span>`.

浏览器不会显示`<span>`中的`<option>`。

### &lt;ng-container&gt; to the rescue

### &lt;ng-container&gt; 的救赎

The Angular `<ng-container>` is a grouping element that doesn't interfere with styles or layout
because Angular _doesn't put it in the DOM_.

Angular的`<ng-container>`是一个分组元素，但它不会污染样式或元素布局，因为 Angular *压根不会把它放进 DOM* 中。

Here's the conditional paragraph again, this time using `<ng-container>`.

下面是重新实现的条件化段落，这次我们使用`<ng-container>`。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (ngif-ngcontainer)" region="ngif-ngcontainer">

</code-example>



It renders properly.

这次就渲染对了。

<figure>
  <img src='generated/images/guide/structural-directives/good-paragraph.png' alt="ngcontainer paragraph with proper style">
</figure>



Now conditionally exclude a _select_ `<option>` with `<ng-container>`.

我们再用`<ng-container>`来根据条件排除选择框中的某个`<option>`。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (select-ngcontainer)" region="select-ngcontainer">

</code-example>



The drop down works properly.

下拉框也工作正常。

<figure>
  <img src='generated/images/guide/structural-directives/select-ngcontainer-anim.gif' alt="ngcontainer options work properly">
</figure>



The `<ng-container>` is a syntax element recognized by the Angular parser.
It's not a directive, component, class, or interface.
It's more like the curly braces in a JavaScript `if`-block:

`<ng-container>`是一个由 Angular 解析器负责识别处理的语法元素。
它不是一个指令、组件、类或接口，更像是 JavaScript 中 `if` 块中的花括号。

<code-example language="javascript">
  if (someCondition) {
    statement1;
    statement2;
    statement3;
  }

</code-example>



Without those braces, JavaScript would only execute the first statement
when you intend to conditionally execute all of them as a single block.
The `<ng-container>` satisfies a similar need in Angular templates.

没有这些花括号，JavaScript 只会执行第一句，而你原本的意图是把其中的所有语句都视为一体来根据条件执行。
而`<ng-container>`满足了 Angular 模板中类似的需求。

{@a unless}



## Write a structural directive

## 写一个结构型指令

In this section, you write an `UnlessDirective` structural directive
that does the opposite of `NgIf`.
`NgIf` displays the template content when the condition is `true`.
`UnlessDirective` displays the content when the condition is ***false***.

在本节中，我们会写一个名叫`UnlessDirective`的结构型指令，它是`NgIf`的反义词。
`NgIf`在条件为`true`的时候显示模板内容，而`UnlessDirective`则会在条件为`false`时显示模板内容。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (myUnless-1)" region="myUnless-1">

</code-example>



Creating a directive is similar to creating a component.

创建指令很像创建组件。
  
* Import the `Directive` decorator (instead of the `Component` decorator).

  导入`Directive`装饰器（而不再是`Component`）。
  
* Import the `Input`, `TemplateRef`, and `ViewContainerRef` symbols; you'll need them for _any_ structural directive .

  导入符号`Input`、`TemplateRef` 和 `ViewContainerRef`，我们在*任何*结构型指令中都会需要它们。

* Apply the decorator to the directive class.

  给指令类添加装饰器。

* Set the CSS *attribute selector* that identifies the directive when applied to an element in a template.

  设置 CSS *属性选择器* ，以便在模板中标识出这个指令该应用于哪个元素。

Here's how you might begin:

这里是起点：

<code-example path="structural-directives/src/app/unless.directive.ts" linenums="false" title="src/app/unless.directive.ts (skeleton)" region="skeleton">

</code-example>



The directive's _selector_ is typically the directive's **attribute name** in square brackets, `[myUnless]`.
The brackets define a CSS
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors" title="MDN: Attribute selectors">attribute selector</a>.

指令的*选择器*通常是把指令的属性名括在方括号中，如`[myUnless]`。
这个方括号定义出了一个 CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors" title="MDN: Attribute selectors">属性选择器</a>。

The directive _attribute name_ should be spelled in _lowerCamelCase_ and begin with a prefix.
Don't use `ng`. That prefix belongs to Angular.
Pick something short that fits you or your company.
In this example, the prefix is `my`.


该指令的*属性名*应该拼写成*小驼峰*形式，并且带有一个前缀。
但是，这个前缀不能用`ng`，因为它只属于 Angular 本身。
请选择一些简短的，适合你自己或公司的前缀。
在这个例子中，前缀是`my`。

The directive _class_ name ends in `Directive` per the [style guide](guide/styleguide#02-03 "Angular Style Guide").
Angular's own directives do not.

指令的*类名*用`Directive`结尾，参见[风格指南](guide/styleguide#02-03 "Angular 风格指南")。
但 Angular 自己的指令例外。

### _TemplateRef_ and _ViewContainerRef_

### _TemplateRef_ 和 _ViewContainerRef_

A simple structural directive like this one creates an
[_embedded view_](api/core/EmbeddedViewRef "API: EmbeddedViewRef")
from the Angular-generated `<ng-template>` and inserts that view in a
[_view container_](api/core/ViewContainerRef "API: ViewContainerRef")
adjacent to the directive's original `<p>` host element.

像这个例子一样的简单结构型指令会从 Angular 生成的`<ng-template>`元素中创建一个[*内嵌的视图*](api/core/EmbeddedViewRef "API: EmbeddedViewRef")，并把这个视图插入到一个[*视图容器*](api/core/ViewContainerRef "API: ViewContainerRef")中，紧挨着本指令原来的宿主元素`<p>`（译注：注意不是子节点，而是兄弟节点）。

You'll acquire the `<ng-template>` contents with a
[`TemplateRef`](api/core/TemplateRef "API: TemplateRef")
and access the _view container_ through a
[`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef").

我们可以使用[`TemplateRef`](api/core/TemplateRef "API: TemplateRef")取得`<ng-template>`的内容，并通过[`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef")来访问这个*视图容器*。

You inject both in the directive constructor as private variables of the class.

我们可以把它们都注入到指令的构造函数中，作为该类的私有属性。

<code-example path="structural-directives/src/app/unless.directive.ts" linenums="false" title="src/app/unless.directive.ts (ctor)" region="ctor">

</code-example>



### The _myUnless_ property

### *myUnless* 属性

The directive consumer expects to bind a true/false condition to `[myUnless]`.
That means the directive needs a `myUnless` property, decorated with `@Input`

该指令的使用者会把一个true/false条件绑定到`[myUnless]`属性上。
也就是说，该指令需要一个带有`@Input`的`myUnless`属性。

<div class="l-sub-section">



Read about `@Input` in the [_Template Syntax_](guide/template-syntax#inputs-outputs) guide.

要了解关于`@Input`的更多知识，参见[*模板语法*](guide/template-syntax#inputs-outputs)一章。

</div>



<code-example path="structural-directives/src/app/unless.directive.ts" linenums="false" title="src/app/unless.directive.ts (set)" region="set">

</code-example>



Angular sets the  `myUnless` property whenever the value of the condition changes.
Because the `myUnless` property does work, it needs a setter.

一旦该值的条件发生了变化，Angular 就会去设置 `myUnless` 属性，这时候，我们就需要为它定义一个设置器（setter）。

* If the condition is falsy and the view hasn't been created previously,
tell the _view container_ to create the _embedded view_ from the template.

  如果条件为假，并且以前尚未创建过该视图，就告诉*视图容器（ViewContainer）*根据模板创建一个*内嵌视图*。

* If the condition is truthy and the view is currently displayed,
clear the container which also destroys the view.

  如果条件为真，并且视图已经显示出来了，就会清除该容器，并销毁该视图。

Nobody reads the `myUnless` property so it doesn't need a getter.

没有人会读取`myUnless`属性，因此它不需要定义设置器（getter）。

The completed directive code looks like this:

完整的指令代码如下：

<code-example path="structural-directives/src/app/unless.directive.ts" linenums="false" title="src/app/unless.directive.ts (excerpt)" region="no-docs">

</code-example>



Add this directive to the `declarations` array of the AppModule.

把这个指令添加到AppModule的`declarations`数组中。

Then create some HTML to try it.

然后创建一些 HTML 来试用一下。

<code-example path="structural-directives/src/app/app.component.html" linenums="false" title="src/app/app.component.html (myUnless)" region="myUnless">

</code-example>



When the `condition` is falsy, the top (A) paragraph appears and  the bottom (B) paragraph disappears.
When the`condition` is truthy, the top (A)paragraph is removed  and the bottom (B)paragraph appears.

当`condition`为`false`时，顶部的段落就会显示出来，而底部的段落消失了。
当`condition`为`true`时，顶部的段落被移除了，而底部的段落显示了出来。


<figure>
  <img src='generated/images/guide/structural-directives/unless-anim.gif' alt="UnlessDirective in action">
</figure>



{@a summary}



## Summary

## 总结

You can both try and download the source code for this guide in the <live-example></live-example>.

你可以去<live-example></live-example>中下载本章的源码。

Here is the source from the `src/app/` folder.

本章相关的代码如下：


<code-tabs>

  <code-pane title="app.component.ts" path="structural-directives/src/app/app.component.ts">

  </code-pane>

  <code-pane title="app.component.html" path="structural-directives/src/app/app.component.html">

  </code-pane>

  <code-pane title="app.component.css" path="structural-directives/src/app/app.component.css">

  </code-pane>

  <code-pane title="app.module.ts" path="structural-directives/src/app/app.module.ts">

  </code-pane>

  <code-pane title="hero.ts" path="structural-directives/src/app/hero.ts">

  </code-pane>

  <code-pane title="hero-switch.components.ts" path="structural-directives/src/app/hero-switch.components.ts">

  </code-pane>

  <code-pane title="unless.directive.ts" path="structural-directives/src/app/unless.directive.ts">

  </code-pane>

</code-tabs>



You learned

我们学到了

* that structural directives manipulate HTML layout.

  结构型指令可以操纵 HTML 的元素布局。

* to use [`<ng-container>`](guide/structural-directives#ngcontainer) as a grouping element when there is no suitable host element.

  当没有合适的容器元素时，可以使用[`<ng-container>`](guide/structural-directives#ngcontainer)对元素进行分组。

* that the Angular desugars [asterisk (*) syntax](guide/structural-directives#asterisk) into a `<ng-template>`.

  Angular 会把[星号（*）语法](guide/structural-directives#asterisk)解开成`<ng-template>`。
  
* how that works for the `NgIf`, `NgFor` and `NgSwitch` built-in directives.

  内置指令`NgIf`、`NgFor`和`NgSwitch`的工作原理。

* about the [_microsyntax_](guide/structural-directives#microsyntax) that expands into a [`<ng-template>`](guide/structural-directives#template).

  [*微语法*](guide/structural-directives#microsyntax)如何展开成[`<ng-template>`](guide/structural-directives#template)。

* to write a [custom structural directive](guide/structural-directives#unless), `UnlessDirective`.

  写了一个[自定义结构型指令](guide/structural-directives#unless) —— `UnlessDirective`。
