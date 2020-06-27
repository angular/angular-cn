# Structural directives

# 结构型指令

<style>
  h4 {font-size: 17px !important; text-transform: none !important;}
  .syntax { font-family: Consolas, 'Lucida Sans', Courier, sans-serif; color: black; font-size: 85%; }

</style>

This guide looks at how Angular manipulates the DOM with **structural directives** and
how you can write your own structural directives to do the same thing.

本章将看看 Angular 如何用*结构型指令*操纵 DOM 树，以及你该如何写自己的结构型指令来完成同样的任务。

Try the <live-example></live-example>.

试试<live-example></live-example>。

{@a definition}

## What are structural directives?

## 什么是结构型指令？

Structural directives are responsible for HTML layout.
They shape or reshape the DOM's _structure_, typically by adding, removing, or manipulating
elements.

结构型指令的职责是 HTML 布局。
它们塑造或重塑 DOM 的结构，比如添加、移除或维护这些元素。

As with other directives, you apply a structural directive to a _host element_.
The directive then does whatever it's supposed to do with that host element and its descendants.

像其它指令一样，你可以把结构型指令应用到一个*宿主元素*上。
然后它就可以对宿主元素及其子元素做点什么。

Structural directives are easy to recognize.
An asterisk (*) precedes the directive attribute name as in this example.

结构型指令非常容易识别。
在这个例子中，星号（*）被放在指令的属性名之前。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif)" region="ngif"></code-example>

No brackets. No parentheses. Just `*ngIf` set to a string.

没有方括号，没有圆括号，只是把 `*ngIf` 设置为一个字符串。

You'll learn in this guide that the [asterisk (*) is a convenience notation](guide/structural-directives#asterisk)
and the string is a [_microsyntax_](guide/structural-directives#microsyntax) rather than the usual
[template expression](guide/template-syntax#template-expressions).
Angular desugars this notation into a marked-up `<ng-template>` that surrounds the
host element and its descendents.
Each structural directive does something different with that template.

在这个例子中，你将学到[星号(*)这个简写方法](guide/structural-directives#asterisk)，而这个字符串是一个[*微语法*](guide/structural-directives#microsyntax)，而不是通常的[模板表达式](guide/template-syntax#template-expressions)。
Angular 会解开这个语法糖，变成一个 `<ng-template>` 标记，包裹着宿主元素及其子元素。
每个结构型指令都可以用这个模板做点不同的事情。

Three of the common, built-in structural directives&mdash;[NgIf](guide/template-syntax#ngIf),
[NgFor](guide/template-syntax#ngFor), and [NgSwitch...](guide/template-syntax#ngSwitch)&mdash;are
described in the [_Template Syntax_](guide/template-syntax) guide and seen in samples throughout the Angular documentation.
Here's an example of them in a template:

三个常用的内置结构型指令 —— [NgIf](guide/template-syntax#ngIf)、[NgFor](guide/template-syntax#ngFor)和[NgSwitch...](guide/template-syntax#ngSwitch)。
你在[*模板语法*](guide/template-syntax)一章中学过它，并且在 Angular 文档的例子中到处都在用它。下面是模板中的例子：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (built-in)" region="built-in"></code-example>

This guide won't repeat how to _use_ them. But it does explain _how they work_
and how to [write your own](guide/structural-directives#unless) structural directive.

本章不会重复讲如何*使用*它们，而是解释它们的*工作原理*以及如何[写自己的结构型指令](guide/structural-directives#unless)。

<div class="callout is-helpful">


<header>
  Directive spelling
</header>


<header>指令的拼写形式</header>

Throughout this guide, you'll see a directive spelled in both _UpperCamelCase_ and _lowerCamelCase_.
Already you've seen `NgIf` and `ngIf`.
There's a reason. `NgIf` refers to the directive _class_;
`ngIf` refers to the directive's _attribute name_.

在本章中，你将看到指令同时具有两种拼写形式*大驼峰 `UpperCamelCase` 和小驼峰 `lowerCamelCase`，比如你已经看过的 `NgIf` 和 `ngIf`。
这里的原因在于，`NgIf` 引用的是指令的*类名*，而 `ngIf` 引用的是指令的*属性名*。

A directive _class_ is spelled in _UpperCamelCase_ (`NgIf`).
A directive's _attribute name_ is spelled in _lowerCamelCase_ (`ngIf`).
The guide refers to the directive _class_ when talking about its properties and what the directive does.
The guide refers to the _attribute name_ when describing how
you apply the directive to an element in the HTML template.

指令的*类名*拼写成*大驼峰形式*（`NgIf`），而它的*属性名*则拼写成*小驼峰形式*（`ngIf`）。
本章会在谈论指令的属性和工作原理时引用指令的*类名*，在描述如何在 HTML 模板中把该指令应用到元素时，引用指令的*属性名*。

</div>

<div class="alert is-helpful">

There are two other kinds of Angular directives, described extensively elsewhere:
(1)&nbsp;components and (2)&nbsp;attribute directives.

还有另外两种 Angular 指令，在本开发指南的其它地方有讲解：(1) 组件 (2) 属性型指令。

A *component* manages a region of HTML in the manner of a native HTML element.
Technically it's a directive with a template.

*组件*可以在原生 HTML 元素中管理一小片区域的 HTML。从技术角度说，它就是一个带模板的指令。

An [*attribute* directive](guide/attribute-directives) changes the appearance or behavior
of an element, component, or another directive.
For example, the built-in [`NgStyle`](guide/template-syntax#ngStyle) directive
changes several element styles at the same time.

[*属性型*指令](guide/attribute-directives)会改变某个元素、组件或其它指令的外观或行为。
比如，内置的[`NgStyle`](guide/template-syntax#ngStyle)指令可以同时修改元素的多个样式。

You can apply many _attribute_ directives to one host element.
You can [only apply one](guide/structural-directives#one-per-element) _structural_ directive to a host element.

你可以在一个宿主元素上应用多个*属性型*指令，但[只能应用一个](guide/structural-directives#one-per-element)*结构型*指令。

</div>

{@a ngIf}

## NgIf case study

## NgIf 案例分析

`NgIf` is the simplest structural directive and the easiest to understand.
It takes a boolean expression and makes an entire chunk of the DOM appear or disappear.

`NgIf` 是一个很好的结构型指令案例：它接受一个布尔值，并据此让一整块 DOM 树出现或消失。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-true)" region="ngif-true"></code-example>

The `ngIf` directive doesn't hide elements with CSS. It adds and removes them physically from the DOM.
Confirm that fact using browser developer tools to inspect the DOM.

`ngIf` 指令并不是使用 CSS 来隐藏元素的。它会把这些元素从 DOM 中物理删除。
使用浏览器的开发者工具就可以确认这一点。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/element-not-in-dom.png' alt="ngIf=false element not in DOM">
</div>

The top paragraph is in the DOM. The bottom, disused paragraph is not;
in its place is a comment about "bindings" (more about that [later](guide/structural-directives#asterisk)).

可以看到第一段文字出现在了 DOM 中，而第二段则没有，在第二段的位置上是一个关于“绑定”的注释（[稍后](guide/structural-directives#asterisk)有更多讲解）。

When the condition is false, `NgIf` removes its host element from the DOM,
detaches it from DOM events (the attachments that it made),
detaches the component from Angular change detection, and destroys it.
The component and DOM nodes can be garbage-collected and free up memory.

当条件为假时，`NgIf` 会从 DOM 中移除它的宿主元素，取消它监听过的那些 DOM 事件，从 Angular 变更检测中移除该组件，并销毁它。
这些组件和 DOM 节点可以被当做垃圾收集起来，并且释放它们占用的内存。

### Why *remove* rather than *hide*?

### 为什么*移除*而不是*隐藏*？

A directive could hide the unwanted paragraph instead by setting its `display` style to `none`.

指令也可以通过把它的 `display` 风格设置为 `none` 而隐藏不需要的段落。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (display-none)" region="display-none"></code-example>

While invisible, the element remains in the DOM.

当不可见时，这个元素仍然留在 DOM 中。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/element-display-in-dom.png' alt="hidden element still in DOM">
</div>

The difference between hiding and removing doesn't matter for a simple paragraph.
It does matter when the host element is attached to a resource intensive component.
Such a component's behavior continues even when hidden.
The component stays attached to its DOM element. It keeps listening to events.
Angular keeps checking for changes that could affect data bindings.
Whatever the component was doing, it keeps doing.

对于简单的段落，隐藏和移除之间的差异影响不大，但对于资源占用较多的组件是不一样的。
当隐藏掉一个元素时，组件的行为还在继续 —— 它仍然附加在它所属的 DOM 元素上，
它也仍在监听事件。Angular 会继续检查哪些能影响数据绑定的变更。
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

但是，除非有非常强烈的理由来保留它们，否则你会更倾向于移除用户看不见的那些 DOM 元素，并且使用 `NgIf` 这样的结构型指令来收回用不到的资源。

**These same considerations apply to every structural directive, whether built-in or custom.**
Before applying a structural directive, you might want to pause for a moment
to consider the consequences of adding and removing elements and of creating and destroying components.

**同样的考量也适用于每一个结构型指令，无论是内置的还是自定义的。**
  你应该提醒自己慎重考虑添加元素、移除元素以及创建和销毁组件的后果。

{@a asterisk}

## The asterisk (*) prefix

## 星号（*）前缀

Surely you noticed the asterisk (*) prefix to the directive name
and wondered why it is necessary and what it does.

你可能注意到了指令名的星号（*）前缀，并且困惑于为什么需要它以及它是做什么的。

Here is `*ngIf` displaying the hero's name if `hero` exists.

这里的 `*ngIf` 会在 `hero` 存在时显示英雄的名字。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (asterisk)" region="asterisk"></code-example>

The asterisk is "syntactic sugar" for something a bit more complicated.
Internally, Angular translates the `*ngIf` _attribute_ into a `<ng-template>` _element_, wrapped around the host element, like this.

星号是一个用来简化更复杂语法的“语法糖”。
从内部实现来说，Angular 把 `*ngIf` *属性* 翻译成一个 `<ng-template>` *元素* 并用它来包裹宿主元素，代码如下：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-template)" region="ngif-template"></code-example>

* The `*ngIf` directive moved to the `<ng-template>` element where it became a property binding,`[ngIf]`.

   `*ngIf` 指令被移到了 `<ng-template>` 元素上。在那里它变成了一个属性绑定 `[ngIf]`。

* The rest of the `<div>`, including its class attribute, moved inside the `<ng-template>` element.

   `<div>` 上的其余部分，包括它的 `class` 属性在内，移到了内部的 `<ng-template>` 元素上。

The first form is not actually rendered, only the finished product ends up in the DOM.

第一种形态永远不会真的渲染出来。
只有最终产出的结果才会出现在 DOM 中。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/hero-div-in-dom.png' alt="hero div in DOM">
</div>

Angular consumed the `<ng-template>` content during its actual rendering and
replaced the `<ng-template>` with a diagnostic comment.

Angular 会在真正渲染的时候填充 `<ng-template>` 的内容，并且把 `<ng-template>` 替换为一个供诊断用的注释。

The [`NgFor`](guide/structural-directives#ngFor) and [`NgSwitch...`](guide/structural-directives#ngSwitch) directives follow the same pattern.

[`NgFor`](guide/structural-directives#ngFor)和[`NgSwitch...`](guide/structural-directives#ngSwitch)指令也都遵循同样的模式。

{@a ngFor}

## Inside _*ngFor_

## `*ngFor` 内幕

Angular transforms the `*ngFor` in similar fashion from asterisk (*) syntax to `<ng-template>` _element_.

Angular 会把 `*ngFor` 用同样的方式把星号（`*`）语法的 `template`*属性*转换成 `<ng-template>`*元素*。

Here's a full-featured application of `NgFor`, written both ways:

这里有一个 `NgFor` 的全特性应用，同时用了这两种写法：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (inside-ngfor)" region="inside-ngfor"></code-example>

This is manifestly more complicated than `ngIf` and rightly so.
The `NgFor` directive has more features, both required and optional, than the `NgIf` shown in this guide.
At minimum `NgFor` needs a looping variable (`let hero`) and a list (`heroes`).

它明显比 `ngIf` 复杂得多，确实如此。
`NgFor` 指令比本章展示过的 `NgIf` 具有更多的必选特性和可选特性。
至少 `NgFor` 会需要一个循环变量（`let hero`）和一个列表（`heroes`）。

You enable these features in the string assigned to `ngFor`, which you write in Angular's [microsyntax](guide/structural-directives#microsyntax).

你可以通过把一个字符串赋值给 `ngFor` 来启用这些特性，这个字符串使用 Angular 的[微语法](guide/structural-directives#microsyntax)。

<div class="alert is-helpful">

Everything _outside_ the `ngFor` string stays with the host element
(the `<div>`) as it moves inside the `<ng-template>`.
In this example, the `[class.odd]="odd"` stays on the `<div>`.

`ngFor` 字符串*之外*的每一样东西都会留在宿主元素（`<div>`）上，也就是说它移到了 `<ng-template>` 内部。
在这个例子中，`[class.odd]="odd"` 留在了 `<div>` 上。

</div>

{@a microsyntax}

## Microsyntax

## 微语法

The Angular microsyntax lets you configure a directive in a compact, friendly string.
The microsyntax parser translates that string into attributes on the `<ng-template>`:

Angular 微语法能让你通过简短的、友好的字符串来配置一个指令。
微语法解析器把这个字符串翻译成 `<ng-template>` 上的属性：

* The `let` keyword declares a [_template input variable_](guide/structural-directives#template-input-variable)
that you reference within the template. The input variables in this example are `hero`, `i`, and `odd`.
The parser translates `let hero`, `let i`, and `let odd` into variables named
`let-hero`, `let-i`, and `let-odd`.

   `let` 关键字声明一个[模板输入变量](guide/structural-directives#template-input-variable)，你会在模板中引用它。本例子中，这个输入变量就是 `hero`、`i` 和 `odd`。
  解析器会把 `let hero`、`let i` 和 `let odd` 翻译成命名变量 `let-hero`、`let-i` 和 `let-odd`。

* The microsyntax parser title-cases all directives and prefixes them with the directive's
attribute name, such as `ngFor`. For example, the `ngFor` input properties,
`of` and `trackBy`, become `ngForOf` and `ngForTrackBy`, respectively.
That's how the directive learns that the list is `heroes` and the track-by function is `trackById`.

   微语法解析器接收 `of` 和 `trackby`，把它们首字母大写（`of` -> `Of`, `trackBy` -> `TrackBy`），
  并且给它们加上指令的属性名（`ngFor`）前缀，最终生成的名字是 `ngForOf` 和 `ngForTrackBy`。
  这两个最终生成的名字是 `NgFor` 的*输入属性*，指令据此了解到列表是 `heroes`，而 track-by 函数是 `trackById`。

* As the `NgFor` directive loops through the list, it sets and resets properties of its own _context_ object.
These properties can include, but aren't limited to, `index`, `odd`, and a special property
named `$implicit`.

   `NgFor` 指令在列表上循环，每个循环中都会设置和重置它自己的*上下文*对象上的属性。
  这些属性包括但不限于 `index` 和 `odd` 以及一个特殊的属性名 `$implicit`（隐式变量）。

* The `let-i` and `let-odd` variables were defined as `let i=index` and `let odd=odd`.
Angular sets them to the current value of the context's `index` and `odd` properties.

   `let-i` 和 `let-odd` 变量是通过 `let i=index` 和 `let odd=odd` 来定义的。
  Angular 把它们设置为*上下文*对象中的 `index` 和 `odd` 属性的当前值。

* The context property for `let-hero` wasn't specified.
Its intended source is implicit.
Angular sets `let-hero` to the value of the context's `$implicit` property,
which `NgFor` has initialized with the hero for the current iteration.

   这里并没有指定 `let-hero` 的上下文属性。它的来源是隐式的。
  Angular 将 `let-hero` 设置为此上下文中 `$implicit` 属性的值，
  它是由 `NgFor` 用当前迭代中的英雄初始化的。

* The [`NgFor` API guide](api/common/NgForOf "API: NgFor")
describes additional `NgFor` directive properties and context properties.

   [API 参考手册](api/common/NgForOf "API: NgFor")中描述了 `NgFor` 指令的其它属性和上下文属性。

* The `NgForOf` directive implements `NgFor`. Read more about additional `NgForOf` directive properties and context properties in the [NgForOf API reference](api/common/NgForOf).

   `NgForOf` 指令实现了 `NgFor`。请到 [NgForOf API 参考手册](api/common/NgForOf)中了解 `NgForOf` 指令的更多属性及其上下文属性。

### Writing your own structural directives

### 编写你自己的结构型指令

These microsyntax mechanisms are also available to you when you write your own structural directives.
For example, microsyntax in Angular allows you to write `<div *ngFor="let item of items">{{item}}</div>`
instead of `<ng-template ngFor let-item [ngForOf]="items"><div>{{item}}</div></ng-template>`.
The following sections provide detailed information on constraints, grammar,
and translation of microsyntax.

当你编写自己的结构型指令时，也可以利用这些微语法机制。
例如，Angular 中的微语法允许你写成 `<div *ngFor="let item of items">{{item}}</div>` 而不是 `<ng-template ngFor let-item [ngForOf]="items"><div>{{item}}</div></ng-template>`。
以下各节提供了有关约束、语法和微语法翻译方式的详细信息。

### Constraints

### 约束

Microsyntax must meet the following requirements:

微语法必须满足以下要求：

- It must be known ahead of time so that IDEs can parse it without knowing the underlying semantics of the directive or what directives are present.

  它必须可被预先了解，以便 IDE 可以解析它而无需知道指令的底层语义或已存在哪些指令。

- It must translate to key-value attributes in the DOM.

  它必须转换为 DOM 中的“键-值”属性。

### Grammar

### 语法

When you write your own structural directives, use the following grammar:

当你编写自己的结构型指令时，请使用以下语法：

```
*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"
```

The following tables describe each portion of the microsyntax grammar.

下表描述了微语法的每个组成部分。

<!-- What should I put in the table headers? -->

<table>
  <tr>
    <th></th>
    <th></th>
  </tr>
  <tr>
    <td><code>prefix</code></td>
    <td>HTML attribute key</td>
  </tr>
  <tr>
    <td><code>prefix</code></td>
    <td>HTML 属性键（attribute key）</td>
  </tr>
  <tr>
    <td><code>key</code></td>
    <td>HTML attribute key</td>
  </tr>
  <tr>
    <td><code>key</code></td>
    <td>HTML 属性键（attribute key）</td>
  </tr>
  <tr>
    <td><code>local</code></td>
    <td>local variable name used in the template</td>
  </tr>
  <tr>
    <td><code>local</code></td>
    <td>模板中使用的局部变量名</td>
  </tr>
  <tr>
    <td><code>export</code></td>
    <td>value exported by the directive under a given name</td>
  </tr>
  <tr>
    <td><code>export</code></td>
    <td>指令使用指定名称导出的值</td>
  </tr>
  <tr>
    <td><code>expression</code></td>
    <td>standard Angular expression</td>
  </tr>
  <tr>
    <td><code>expression</code></td>
    <td>标准 Angular 表达式</td>
  </tr>
</table>

<!-- The items in this table seem different. Is there another name for how we should describe them? -->
<table>
  <tr>
    <th></th>
  </tr>
  <tr>
    <td colspan="3"><code>keyExp = :key ":"? :expression ("as" :local)? ";"? </code></td>
  </tr>
  <tr>
    <td colspan="3"><code>let = "let" :local "=" :export ";"?</code></td>
  </tr>
  <tr>
    <td colspan="3"><code>as = :export "as" :local ";"?</code></td>
  </tr>
</table>

### Translation

### 翻译

A microsyntax is translated to the normal binding syntax as follows:

将微语法转换为常规的绑定语法，如下所示：

<!-- What to put in the table headers below? Are these correct?-->
<table>
  <tr>
    <th>Microsyntax</th>
    <th>Translation</th>
  </tr>
  <tr>
    <th>微语法</th>
    <th>翻译结果</th>
  </tr>
  <tr>
    <td><code>prefix</code> and naked <code>expression</code></td>
    <td><code>[prefix]="expression"</code></td>
  </tr>
  <tr>
    <td><code>prefix</code> 和裸<code>表达式</code></td>
    <td><code>[prefix]="expression"</code></td>
  </tr>
  <tr>
    <td><code>keyExp</code></td>
    <td><code>[prefixKey] "expression"
    (let-prefixKey="export")</code>
    <br />
    Notice that the <code>prefix</code>
    is added to the <code>key</code>
    </td>
  </tr>
  <tr>
    <td><code>keyExp</code></td>
    <td><code>[prefixKey] "表达式"
    (let-prefixKey="export")</code>
    <br />
    注意 <code>prefix</code> 已经加成了 <code>key</code>
    </td>
  </tr>
  <tr>
    <td><code>let</code></td>
    <td><code>let-local="export"</code></td>
  </tr>
</table>

### Microsyntax examples

### 微语法样例

The following table demonstrates how Angular desugars microsyntax.

下表说明了 Angular 会如何解开微语法。

<table>
  <tr>
    <th>Microsyntax</th>
    <th>Desugared</th>
  </tr>
  <tr>
    <th>微语法</th>
    <th>解语法糖后</th>
  </tr>
  <tr>
    <td><code>*ngFor="let item of [1,2,3]"</code></td>
    <td><code>&lt;ng-template ngFor let-item [ngForOf]="[1,2,3]"&gt;</code></td>
  </tr>
  <tr>
    <td><code>*ngFor="let item of [1,2,3] as items; trackBy: myTrack; index as i"</code></td>
    <td><code>&lt;ng-template ngFor let-item [ngForOf]="[1,2,3]" let-items="ngForOf" [ngForTrackBy]="myTrack" let-i="index"&gt;</code>
    </td>
  </tr>
  <tr>
    <td><code>*ngIf="exp"</code></td>
    <td><code>&lt;ng-template [ngIf]="exp"&gt;</code></td>
  </tr>
  <tr>
    <td><code>*ngIf="exp as value"</code></td>
    <td><code>&lt;ng-template [ngIf]="exp" let-value="ngIf"&gt;</code></td>
  </tr>
</table>

Studying the
[source code for `NgIf`](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts "Source: NgIf")
and [`NgForOf`](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_for_of.ts "Source: NgForOf")
is a great way to learn more.

这些微语法机制在你写自己的结构型指令时也同样有效，参考 [`NgIf` 的源码](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts "Source: NgIf")
和 [`NgFor` 的源码](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_for_of.ts "Source: NgFor") 可以学到更多。
{@a template-input-variable}

{@a template-input-variables}

## Template input variable

## 模板输入变量

A _template input variable_ is a variable whose value you can reference _within_ a single instance of the template.
There are several such variables in this example: `hero`, `i`, and `odd`.
All are preceded by the keyword `let`.

*模板输入变量*是这样一种变量，你可以*在单个实例的模板中*引用它的值。
这个例子中有好几个模板输入变量：`hero`、`i` 和 `odd`。
它们都是用 `let` 作为前导关键字。

A _template input variable_ is **_not_** the same as a
[template _reference_ variable](guide/template-syntax#ref-vars),
neither _semantically_ nor _syntactically_.

*模板输入变量*和[模板引用变量](guide/template-syntax#ref-vars)是**不同的**，无论是在*语义*上还是*语法*上。

You declare a template _input_ variable using the `let` keyword (`let hero`).
The variable's scope is limited to a _single instance_ of the repeated template.
You can use the same variable name again in the definition of other structural directives.

你使用 `let` 关键字（如 `let hero`）在模板中声明一个模板*输入*变量。
这个变量的范围被限制在所重复模板的*单一实例*上。
事实上，你可以在其它结构型指令中使用同样的变量名。

You declare a template _reference_ variable by prefixing the variable name with `#` (`#var`).
A _reference_ variable refers to its attached element, component or directive.
It can be accessed _anywhere_ in the _entire template_.

而声明模板*引用*变量使用的是给变量名加 `#` 前缀的方式（`#var`）。
一个*引用*变量引用的是它所附着到的元素、组件或指令。它可以在*整个模板*的*任意位置*访问。

Template _input_ and _reference_ variable names have their own namespaces. The `hero` in `let hero` is never the same
variable as the `hero` declared as `#hero`.

模板*输入*变量和*引用*变量具有各自独立的命名空间。`let hero` 中的 `hero` 和 `#hero` 中的 `hero` 并不是同一个变量。

{@a one-per-element}

## One structural directive per host element

## 每个宿主元素上只能有一个结构型指令

Someday you'll want to repeat a block of HTML but only when a particular condition is true.
You'll _try_ to put both an `*ngFor` and an `*ngIf` on the same host element.
Angular won't let you. You may apply only one _structural_ directive to an element.

有时你会希望只有当特定的条件为真时才重复渲染一个 HTML 块。
你可能试过把 `*ngFor` 和 `*ngIf` 放在同一个宿主元素上，但 Angular 不允许。这是因为你在一个元素上只能放一个*结构型*指令。

The reason is simplicity. Structural directives can do complex things with the host element and its descendents.
When two directives lay claim to the same host element, which one takes precedence?
Which should go first, the `NgIf` or the `NgFor`? Can the `NgIf` cancel the effect of the `NgFor`?
If so (and it seems like it should be so), how should Angular generalize the ability to cancel for other structural directives?

原因很简单。结构型指令可能会对宿主元素及其子元素做很复杂的事。当两个指令放在同一个元素上时，谁先谁后？`NgIf` 优先还是 `NgFor` 优先？`NgIf` 可以取消 `NgFor` 的效果吗？
如果要这样做，Angular 应该如何把这种能力泛化，以取消其它结构型指令的效果呢？

There are no easy answers to these questions. Prohibiting multiple structural directives makes them moot.
There's an easy solution for this use case: put the `*ngIf` on a container element that wraps the `*ngFor` element.
One or both elements can be an [`ng-container`](guide/structural-directives#ngcontainer) so you don't have to introduce extra levels of HTML.

对这些问题，没有办法简单回答。而禁止多个结构型指令则可以简单地解决这个问题。
这种情况下有一个简单的解决方案：把 `*ngIf` 放在一个"容器"元素上，再包装进 `*ngFor` 元素。
这个元素可以使用[`ng-container`](guide/structural-directives#ngcontainer)，以免引入一个新的 HTML 层级。

{@a ngSwitch}

## Inside _NgSwitch_ directives

## `NgSwitch` 内幕

The Angular _NgSwitch_ is actually a set of cooperating directives: `NgSwitch`, `NgSwitchCase`, and `NgSwitchDefault`.

Angular 的 `NgSwitch` 实际上是一组相互合作的指令：`NgSwitch`、`NgSwitchCase` 和 `NgSwitchDefault`。

Here's an example.

例子如下：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngswitch)" region="ngswitch"></code-example>

The switch value assigned to `NgSwitch` (`hero.emotion`) determines which
(if any) of the switch cases are displayed.

一个值(`hero.emotion`)被被赋值给了 `NgSwitch`，以决定要显示哪一个分支。

`NgSwitch` itself is not a structural directive.
It's an _attribute_ directive that controls the behavior of the other two switch directives.
That's why you write `[ngSwitch]`, never `*ngSwitch`.

`NgSwitch` 本身不是结构型指令，而是一个*属性型*指令，它控制其它两个 switch 指令的行为。
这也就是为什么你要写成 `[ngSwitch]` 而不是 `*ngSwitch` 的原因。

`NgSwitchCase` and `NgSwitchDefault` _are_ structural directives.
You attach them to elements using the asterisk (*) prefix notation.
An `NgSwitchCase` displays its host element when its value matches the switch value.
The `NgSwitchDefault` displays its host element when no sibling `NgSwitchCase` matches the switch value.

`NgSwitchCase` 和 `NgSwitchDefault` *都是*结构型指令。
因此你要使用星号（`*`）前缀来把它们附着到元素上。
`NgSwitchCase` 会在它的值匹配上选项值的时候显示它的宿主元素。
`NgSwitchDefault` 则会当没有兄弟 `NgSwitchCase` 匹配上时显示它的宿主元素。

<div class="alert is-helpful">

The element to which you apply a directive is its _host_ element.
The `<happy-hero>` is the host element for the happy `*ngSwitchCase`.
The `<unknown-hero>` is the host element for the `*ngSwitchDefault`.

指令所在的元素就是它的**宿主**元素。
`<happy-hero>` 是 `*ngSwitchCase` 的宿主元素。
`<unknown-hero>` 是 `*ngSwitchDefault` 的宿主元素。

</div>

As with other structural directives, the `NgSwitchCase` and `NgSwitchDefault`
can be desugared into the `<ng-template>` element form.

像其它的结构型指令一样，`NgSwitchCase` 和 `NgSwitchDefault` 也可以解开语法糖，变成 `<ng-template>` 的形式。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngswitch-template)" region="ngswitch-template"></code-example>

{@a prefer-asterisk}

## Prefer the asterisk (*) syntax.

## 优先使用星号（`*`）语法

The asterisk (*) syntax is more clear than the desugared form.
Use [&lt;ng-container&gt;](guide/structural-directives#ng-container) when there's no single element
to host the directive.

星号（`*`）语法比不带语法糖的形式更加清晰。
如果找不到单一的元素来应用该指令，可以使用[&lt;ng-container&gt;](guide/structural-directives#ng-container)作为该指令的容器。

While there's rarely a good reason to apply a structural directive in template _attribute_ or _element_ form,
it's still important to know that Angular creates a `<ng-template>` and to understand how it works.
You'll refer to the `<ng-template>` when you [write your own structural directive](guide/structural-directives#unless).

虽然很少有理由在模板中使用结构型指令的*属性*形式和*元素*形式，但这些幕后知识仍然是很重要的，即：Angular 会创建 `<ng-template>`，还要了解它的工作原理。
当需要[写自己的结构型指令](guide/structural-directives#unless)时，你就要使用 `<ng-template>`。

{@a template}

## The *&lt;ng-template&gt;*

## *&lt;ng-template&gt;*元素

The &lt;ng-template&gt; is an Angular element for rendering HTML.
It is never displayed directly.
In fact, before rendering the view, Angular _replaces_ the `<ng-template>` and its contents with a comment.

&lt;ng-template&gt;是一个 Angular 元素，用来渲染 HTML。
它永远不会直接显示出来。
事实上，在渲染视图之前，Angular 会把 `<ng-template>` 及其内容*替换为*一个注释。

If there is no structural directive and you merely wrap some elements in a `<ng-template>`,
those elements disappear.
That's the fate of the middle "Hip!" in the phrase "Hip! Hip! Hooray!".

如果没有使用结构型指令，而仅仅把一些别的元素包装进 `<ng-template>` 中，那些元素就是不可见的。
在下面的这个短语"Hip! Hip! Hooray!"中，中间的这个 "Hip!"（欢呼声） 就是如此。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (template-tag)" region="template-tag"></code-example>

Angular erases the middle "Hip!", leaving the cheer a bit less enthusiastic.

Angular 抹掉了中间的那个 "Hip!"，让欢呼声显得不再那么热烈了。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/template-rendering.png' alt="template tag rendering">
</div>

A structural directive puts a `<ng-template>` to work
as you'll see when you [write your own structural directive](guide/structural-directives#unless).

结构型指令会让 `<ng-template>` 正常工作，在你[写自己的结构型指令](guide/structural-directives#unless)时就会看到这一点。

{@a ngcontainer}

{@a ng-container}

## Group sibling elements with &lt;ng-container&gt;

## 使用&lt;ng-container&gt;把一些兄弟元素归为一组

There's often a _root_ element that can and should host the structural directive.
The list element (`<li>`) is a typical host element of an `NgFor` repeater.

通常都需要一个*根*元素作为结构型指令的宿主。
列表元素（`<li>`）就是一个典型的供 `NgFor` 使用的宿主元素。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngfor-li)" region="ngfor-li"></code-example>

When there isn't a host element, you can usually wrap the content in a native HTML container element,
such as a `<div>`, and attach the directive to that wrapper.

当没有这样一个单一的宿主元素时，你就可以把这些内容包裹在一个原生的 HTML 容器元素中，比如 `<div>`，并且把结构型指令附加到这个"包裹"上。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif)" region="ngif"></code-example>

Introducing another container element&mdash;typically a `<span>` or `<div>`&mdash;to
group the elements under a single _root_ is usually harmless.
_Usually_ ... but not _always_.

但引入另一个容器元素（通常是 `<span>` 或 `<div>`）来把一些元素归到一个单一的*根元素*下，通常也会带来问题。注意，是"通常"而不是"总会"。

The grouping element may break the template appearance because CSS styles
neither expect nor accommodate the new layout.
For example, suppose you have the following paragraph layout.

这种用于分组的元素可能会破坏模板的外观表现，因为 CSS 的样式既不曾期待也不会接受这种新的元素布局。
比如，假设你有下列分段布局。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-span)" region="ngif-span"></code-example>

You also have a CSS style rule that happens to apply to a `<span>` within a `<p>`aragraph.

而你的 CSS 样式规则是应用于 `<p>` 元素下的 `<span>` 的。

<code-example path="structural-directives/src/app/app.component.css" header="src/app/app.component.css (p-span)" region="p-span"></code-example>

The constructed paragraph renders strangely.

这样渲染出来的段落就会非常奇怪。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/bad-paragraph.png' alt="spanned paragraph with bad style">
</div>

The `p span` style, intended for use elsewhere, was inadvertently applied here.

本来为其它地方准备的 `p span` 样式，被意外的应用到了这里。

Another problem: some HTML elements require all immediate children to be of a specific type.
For example, the `<select>` element requires `<option>` children.
You can't wrap the _options_ in a conditional `<div>` or a `<span>`.

另一个问题是：有些 HTML 元素需要所有的直属下级都具有特定的类型。
比如，`<select>` 元素要求直属下级必须为 `<option>`，那就没办法把这些选项包装进 `<div>` 或 `<span>` 中。

When you try this,

如果这样做：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (select-span)" region="select-span"></code-example>

the drop down is empty.

下拉列表就是空的。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/bad-select.png' alt="spanned options don't work">
</div>

The browser won't display an `<option>` within a `<span>`.

浏览器不会显示 `<span>` 中的 `<option>`。

### &lt;ng-container&gt; to the rescue

### &lt;ng-container&gt; 的救赎

The Angular `<ng-container>` is a grouping element that doesn't interfere with styles or layout
because Angular _doesn't put it in the DOM_.

Angular 的 `<ng-container>` 是一个分组元素，但它不会污染样式或元素布局，因为 Angular *压根不会把它放进 DOM* 中。

Here's the conditional paragraph again, this time using `<ng-container>`.

下面是重新实现的条件化段落，这次使用 `<ng-container>`。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-ngcontainer)" region="ngif-ngcontainer"></code-example>

It renders properly.

这次就渲染对了。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/good-paragraph.png' alt="ngcontainer paragraph with proper style">
</div>

Now conditionally exclude a _select_ `<option>` with `<ng-container>`.

现在用 `<ng-container>` 来根据条件排除选择框中的某个 `<option>`。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (select-ngcontainer)" region="select-ngcontainer"></code-example>

The drop down works properly.

下拉框也工作正常。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/select-ngcontainer-anim.gif' alt="ngcontainer options work properly">
</div>

<div class="alert is-helpful">

**Note:** Remember that ngModel directive is defined as a part of Angular FormsModule and you need to include FormsModule in the imports: [...] section of the Angular module metadata, in which you want to use it.

**注意：** 记住，ngModel 指令是在 Angular 的 FormsModule 中定义的，你要在想使用它的模块的 `imports: [...]` 元数据中导入 FormsModule。

</div>

The `<ng-container>` is a syntax element recognized by the Angular parser.
It's not a directive, component, class, or interface.
It's more like the curly braces in a JavaScript `if`-block:

`<ng-container>` 是一个由 Angular 解析器负责识别处理的语法元素。
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
而 `<ng-container>` 满足了 Angular 模板中类似的需求。

{@a unless}

## Write a structural directive

## 写一个结构型指令

In this section, you write an `UnlessDirective` structural directive
that does the opposite of `NgIf`.
`NgIf` displays the template content when the condition is `true`.
`UnlessDirective` displays the content when the condition is ***false***.

在本节中，你会写一个名叫 `UnlessDirective` 的结构型指令，它是 `NgIf` 的反义词。
`NgIf` 在条件为 `true` 的时候显示模板内容，而 `UnlessDirective` 则会在条件为 `false` 时显示模板内容。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (appUnless-1)" region="appUnless-1"></code-example>

Creating a directive is similar to creating a component.

创建指令很像创建组件。

* Import the `Directive` decorator (instead of the `Component` decorator).

   导入 `Directive` 装饰器（而不再是 `Component`）。

* Import the `Input`, `TemplateRef`, and `ViewContainerRef` symbols; you'll need them for _any_ structural directive.

   导入符号 `Input`、`TemplateRef` 和 `ViewContainerRef`，你在*任何*结构型指令中都会需要它们。

* Apply the decorator to the directive class.

   给指令类添加装饰器。

* Set the CSS *attribute selector* that identifies the directive when applied to an element in a template.

   设置 CSS *属性选择器*，以便在模板中标识出这个指令该应用于哪个元素。

Here's how you might begin:

这里是起点：

<code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (skeleton)" region="skeleton"></code-example>

The directive's _selector_ is typically the directive's **attribute name** in square brackets, `[appUnless]`.
The brackets define a CSS
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors" title="MDN: Attribute selectors">attribute selector</a>.

指令的*选择器*通常是把指令的属性名括在方括号中，如 `[appUnless]`。
这个方括号定义出了一个 CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors" title="MDN: Attribute selectors">属性选择器</a>。

The directive _attribute name_ should be spelled in _lowerCamelCase_ and begin with a prefix.
Don't use `ng`. That prefix belongs to Angular.
Pick something short that fits you or your company.
In this example, the prefix is `app`.

该指令的*属性名*应该拼写成*小驼峰*形式，并且带有一个前缀。
但是，这个前缀不能用 `ng`，因为它只属于 Angular 本身。
请选择一些简短的，适合你自己或公司的前缀。
在这个例子中，前缀是 `app`。

The directive _class_ name ends in `Directive` per the [style guide](guide/styleguide#02-03 "Angular Style Guide").
Angular's own directives do not.

指令的*类名*用 `Directive` 结尾，参见[风格指南](guide/styleguide#02-03 "Angular 风格指南")。
但 Angular 自己的指令例外。

### _TemplateRef_ and _ViewContainerRef_

### _TemplateRef_ 和 _ViewContainerRef_

A simple structural directive like this one creates an
[_embedded view_](api/core/EmbeddedViewRef "API: EmbeddedViewRef")
from the Angular-generated `<ng-template>` and inserts that view in a
[_view container_](api/core/ViewContainerRef "API: ViewContainerRef")
adjacent to the directive's original `<p>` host element.

像这个例子一样的简单结构型指令会从 Angular 生成的 `<ng-template>` 元素中创建一个[*内嵌的视图*](api/core/EmbeddedViewRef "API: EmbeddedViewRef")，并把这个视图插入到一个[*视图容器*](api/core/ViewContainerRef "API: ViewContainerRef")中，紧挨着本指令原来的宿主元素 `<p>`（译注：注意不是子节点，而是兄弟节点）。

You'll acquire the `<ng-template>` contents with a
[`TemplateRef`](api/core/TemplateRef "API: TemplateRef")
and access the _view container_ through a
[`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef").

你可以使用[`TemplateRef`](api/core/TemplateRef "API: TemplateRef")取得 `<ng-template>` 的内容，并通过[`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef")来访问这个*视图容器*。

You inject both in the directive constructor as private variables of the class.

你可以把它们都注入到指令的构造函数中，作为该类的私有属性。

<code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (ctor)" region="ctor"></code-example>

### The _appUnless_ property

### *appUnless* 属性

The directive consumer expects to bind a true/false condition to `[appUnless]`.
That means the directive needs an `appUnless` property, decorated with `@Input`

该指令的使用者会把一个 true/false 条件绑定到 `[appUnless]` 属性上。
也就是说，该指令需要一个带有 `@Input` 的 `appUnless` 属性。

<div class="alert is-helpful">

Read about `@Input` in the [_Template Syntax_](guide/template-syntax#inputs-outputs) guide.

要了解关于 `@Input` 的更多知识，参见[*模板语法*](guide/template-syntax#inputs-outputs)一章。

</div>

<code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (set)" region="set"></code-example>

Angular sets the `appUnless` property whenever the value of the condition changes.
Because the `appUnless` property does work, it needs a setter.

一旦该值的条件发生了变化，Angular 就会去设置 `appUnless` 属性。因为不能用 `appUnless` 属性，所以你要为它定义一个设置器（setter）。

* If the condition is falsy and the view hasn't been created previously,
tell the _view container_ to create the _embedded view_ from the template.

   如果条件为假，并且以前尚未创建过该视图，就告诉*视图容器（ViewContainer）*根据模板创建一个*内嵌视图*。

* If the condition is truthy and the view is currently displayed,
clear the container which also destroys the view.

   如果条件为真，并且视图已经显示出来了，就会清除该容器，并销毁该视图。

Nobody reads the `appUnless` property so it doesn't need a getter.

没有人会读取 `appUnless` 属性，因此它不需要定义 getter。

The completed directive code looks like this:

完整的指令代码如下：

<code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (excerpt)" region="no-docs"></code-example>

Add this directive to the `declarations` array of the AppModule.

把这个指令添加到 AppModule 的 `declarations` 数组中。

Then create some HTML to try it.

然后创建一些 HTML 来试用一下。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (appUnless)" region="appUnless"></code-example>

When the `condition` is falsy, the top (A) paragraph appears and the bottom (B) paragraph disappears.
When the `condition` is truthy, the top (A) paragraph is removed and the bottom (B) paragraph appears.

当 `condition` 为 `false` 时，顶部的段落就会显示出来，而底部的段落消失了。
当 `condition` 为 `true` 时，顶部的段落被移除了，而底部的段落显示了出来。

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/unless-anim.gif' alt="UnlessDirective in action">
</div>

{@a directive-type-checks}

## Improving template type checking for custom directives

## 改进自定义指令的模板类型检查

You can improve template type checking for custom directives by adding template guard properties to your directive definition.
These properties help the Angular template type checker find mistakes in the template at compile time, which can avoid runtime errors those mistakes can cause.

你可以通过在指令定义中添加模板守护属性来改进自定义指令的模板类型检查。这些属性可以帮助 Angular 模板类型检查器在编译期间发现模板中的错误，避免这些失误导致运行期错误。

Use the type-guard properties to inform the template type checker of an expected type, thus improving compile-time type-checking for that template.

使用类型守护属性可以告诉模板类型检查器你所期望的类型，从而改进该模板的编译期类型检查。

* A property `ngTemplateGuard_(someInputProperty)` lets you specify a more accurate type for an input expression within the template.

  属性 `ngTemplateGuard_(someInputProperty)` 允许你为模板中的输入表达式指定一个更准确的类型。

* The `ngTemplateContextGuard` static property declares the type of the template context.

  `ngTemplateContextGuard` 静态属性声明了模板上下文的类型。

This section provides example of both kinds of type-guard property.

本节提供了这两种类型守护属性的例子。

<div class="alert is-helpful">

   For more information, see [Template type checking guide](guide/template-typecheck "Template type-checking guide").

   有关更多信息，请参阅[模板类型检查指南](guide/template-typecheck "模板类型检查指南")。

</div>

{@a narrowing-input-types}

### Make in-template type requirements more specific with template guards

### 使用模板守护功能可以让模板内的类型需求更具体

A structural directive in a template controls whether that template is rendered at run time, based on its input expression.
To help the compiler catch template type errors, you should specify as closely as possible the required type of a directive's input expression when it occurs inside the template.

模板中的结构型指令会根据输入表达式来控制是否要在运行时渲染该模板。为了帮助编译器捕获模板类型中的错误，你应该尽可能详细地指定模板内指令的输入表达式所期待的类型。

A type guard function *narrows* the expected type of an input expression to a subset of types that might be passed to the directive within the template at run time.
You can provide such a function to help the type-checker infer the proper type for the expression at compile time.

类型守护函数会把输入表达式所期待的类型*窄化*为在运行时可能传给指令的子类型。你可以提供这样一个函数来帮助类型检查器在编译期间推断出该表达式的正确类型。

For example, the `NgIf` implementation uses type-narrowing to ensure that the
template is only instantiated if the input expression to `*ngIf` is truthy.
To provide the specific type requirement, the `NgIf` directive defines a [static property `ngTemplateGuard_ngIf: 'binding'`](api/common/NgIf#static-properties).
The `binding` value is a special case for a common kind of type-narrowing where the input expression is evaluated in order to satisfy the type requirement.

例如，`NgIf` 的实现使用类型窄化来确保只有当 `*ngIf` 的输入表达式为真时，模板才会被实例化。为了提供具体的类型要求，`NgIf` 指令定义了一个[静态属性 `ngTemplateGuard_ngIf: 'binding'`](api/common/NgIf#static-properties)。`binding` 值是一种常见的类型窄化的例子，它会对输入表达式进行求值，以满足类型要求。

To provide a more specific type for an input expression to a directive within the template, add a `ngTemplateGuard_xx` property to the directive, where the suffix to the static property name is the `@Input` field name.
The value of the property can be either a general type-narrowing function based on its return type, or the string `"binding"` as in the case of `NgIf`.

要为模板中的指令提供一个更具体的输入表达式类型，就要把 `ngTemplateGuard_xx` 属性添加到该指令中，其静态属性名的后缀（xx）是 `@Input` 字段名。该属性的值既可以是针对其返回类型的通用类型窄化函数，也可以是字符串 `"binding"` 就像 `NgIf` 一样。

For example, consider the following structural directive that takes the result of a template expression as an input.

例如，考虑以下结构型指令，它以模板表达式的结果作为输入。

<code-example language="ts" header="IfLoadedDirective">
export type Loaded<T> = { type: 'loaded', data: T };
export type Loading = { type: 'loading' };
export type LoadingState<T> = Loaded<T> | Loading;
export class IfLoadedDirective<T> {
    @Input('ifLoaded') set state(state: LoadingState<T>) {}
    static ngTemplateGuard_state<T>(dir: IfLoadedDirective<T>, expr: LoadingState<T>): expr is Loaded<T> { return true; };
export interface Person {
  name: string;
}

@Component({
  template: `<div *ifLoaded="state">{{ state.data }}</div>`,
})
export class AppComponent {
  state: LoadingState<Person>;
}
</code-example>

In this example, the `LoadingState<T>` type permits either of two states, `Loaded<T>` or `Loading`. The expression used as the directive’s `state` input is of the umbrella type `LoadingState`, as it’s unknown what the loading state is at that point.

在这个例子中，`LoadingState<T>` 类型允许两种状态之一，`Loaded<T>` 或 `Loading`。此表达式用作该指令的 `state` 输入是一个总括类型 `LoadingState`，因为此处的加载状态是未知的。

The `IfLoadedDirective` definition declares the static field `ngTemplateGuard_state`, which expresses the narrowing behavior.
Within the `AppComponent` template, the `*ifLoaded` structural directive should render this template only when `state` is actually `Loaded<Person>`.
The type guard allows the type checker to infer that the acceptable type of `state` within the template is a `Loaded<T>`, and further infer that `T` must be an instance of `Person`.

`IfLoadedDirective` 定义声明了静态字段 `ngTemplateGuard_state`，表示其窄化行为。在 `AppComponent` 模板中，`*ifLoaded` 结构型指令只有当实际的 `state` 是 `Loaded<Person>` 类型时，才会渲染该模板。类型守护允许类型检查器推断出模板中可接受的 `state` 类型是 `Loaded<T>`，并进一步推断出 `T` 必须是 `Person` 一个实例。

{@a narrowing-context-type}

### Typing the directive's context

### 为指令上下文指定类型

If your structural directive provides a context to the instantiated template, you can properly type it inside the template by providing a static `ngTemplateContextGuard` function.
The following snippet shows an example of such a function.

如果你的结构型指令要为实例化的模板提供一个上下文，可以通过提供静态的 `ngTemplateContextGuard` 函数在模板中给它提供合适的类型。下面的代码片段展示了该函数的一个例子。

<code-example language="ts" header="myDirective.ts">
@Directive({…})
export class ExampleDirective {
    // Make sure the template checker knows the type of the context with which the
    // template of this directive will be rendered
    static ngTemplateContextGuard(dir: ExampleDirective, ctx: unknown): ctx is ExampleContext { return true; };

    // …
}
</code-example>

{@a summary}

## Summary

## 小结

You can both try and download the source code for this guide in the <live-example></live-example>.

你可以去<live-example></live-example>中下载本章的源码。

Here is the source from the `src/app/` folder.

本章相关的代码如下：

<code-tabs>

  <code-pane header="app.component.ts" path="structural-directives/src/app/app.component.ts">

  </code-pane>

  <code-pane header="app.component.html" path="structural-directives/src/app/app.component.html">

  </code-pane>

  <code-pane header="app.component.css" path="structural-directives/src/app/app.component.css">

  </code-pane>

  <code-pane header="app.module.ts" path="structural-directives/src/app/app.module.ts">

  </code-pane>

  <code-pane header="hero.ts" path="structural-directives/src/app/hero.ts">

  </code-pane>

  <code-pane header="hero-switch.components.ts" path="structural-directives/src/app/hero-switch.components.ts">

  </code-pane>

  <code-pane header="unless.directive.ts" path="structural-directives/src/app/unless.directive.ts">

  </code-pane>

</code-tabs>

You learned:

你学到了

* that structural directives manipulate HTML layout.

   结构型指令可以操纵 HTML 的元素布局。

* to use [`<ng-container>`](guide/structural-directives#ngcontainer) as a grouping element when there is no suitable host element.

   当没有合适的宿主元素时，可以使用[`<ng-container>`](guide/structural-directives#ngcontainer)对元素进行分组。

* that the Angular desugars [asterisk (*) syntax](guide/structural-directives#asterisk) into a `<ng-template>`.

   Angular 会把[星号（*）语法](guide/structural-directives#asterisk)解开成 `<ng-template>`。

* how that works for the `NgIf`, `NgFor` and `NgSwitch` built-in directives.

   内置指令 `NgIf`、`NgFor` 和 `NgSwitch` 的工作原理。

* about the [_microsyntax_](guide/structural-directives#microsyntax) that expands into a [`<ng-template>`](guide/structural-directives#template).

   [*微语法*](guide/structural-directives#microsyntax)如何展开成[`<ng-template>`](guide/structural-directives#template)。

* to write a [custom structural directive](guide/structural-directives#unless), `UnlessDirective`.

   写了一个[自定义结构型指令](guide/structural-directives#unless) —— `UnlessDirective`。
