# Displaying Data

# 显示数据

You can display data by binding controls in an HTML template to properties of an Angular component.

在 Angular 中最典型的数据显示方式，就是把 HTML 模板中的控件绑定到 Angular 组件的属性。

In this page, you'll create a component with a list of heroes.
You'll display the list of hero names and
conditionally show a message below the list.

本章中，你将创建一个带英雄列表的组件。
你将显示英雄名字的列表，并根据条件在列表下方显示一条消息。

The final UI looks like this:

最终的用户界面是这样的：

<figure>
  <img src="generated/images/guide/displaying-data/final.png" alt="Final UI">
</figure>

<div class="l-sub-section">

The <live-example></live-example> demonstrates all of the syntax and code
snippets described in this page.

这个<live-example></live-example>演示了本章中描述的所有语法和代码片段。

</div>

{@a interpolation}

## Showing component properties with interpolation

## 使用插值表达式显示组件属性

The easiest way to display a component property
is to bind the property name through interpolation.
With interpolation, you put the property name in the view template, enclosed in double curly braces: `{{myHero}}`.

要显示组件的属性，最简单的方式就是通过插值表达式 (interpolation) 来绑定属性名。
要使用插值表达式，就把属性名包裹在双花括号里放进视图模板，如 `{{myHero}}`。

Follow the [quickstart](guide/quickstart) instructions for creating a new project
named <code>displaying-data</code>.

按照[快速起步](guide/quickstart)的说明，创建一个新项目，名为<code>displaying-data</code>。

Delete the <code>app.component.html</code> file. It is not needed for this example.

删除 <code>app.component.html</code> 文件，这个范例中不再需要它了。

Then modify the <code>app.component.ts</code> file by
changing the template and the body of the component.

然后，到 `app.component.ts` 文件中修改组件的模板和代码。

When you're done, it should look like this:

修改完之后，它应该是这样的：

<code-example path="displaying-data/src/app/app.component.1.ts" title="src/app/app.component.ts">

</code-example>

You added two properties to the formerly empty component: `title` and `myHero`.

再把两个属性 `title` 和 `myHero` 添加到之前空白的组件中。

The template displays the two component properties using double curly brace
interpolation:

修改完的模板会使用双花括号形式的插值表达式来显示这两个模板属性：

<code-example path="displaying-data/src/app/app.component.1.ts" linenums="false" title="src/app/app.component.ts (template)" region="template">

</code-example>

<div class="l-sub-section">

The template is a multi-line string within ECMAScript 2015 backticks (<code>\`</code>).
The backtick (<code>\`</code>)&mdash;which is *not* the same character as a single
quote (`'`)&mdash;allows you to compose a string over several lines, which makes the
HTML more readable.

模板是包在 ECMAScript 2015 反引号 (<code>\`</code>) 中的一个多行字符串。
反引号 (<code>\`</code>) &mdash; 注意，不是单引号 (') &mdash; 允许把一个字符串写在多行上，
使 HTML 模板更容易阅读。

</div>

Angular automatically pulls the value of the `title` and `myHero` properties from the component and
inserts those values into the browser. Angular updates the display
when these properties change.

Angular 自动从组件中提取 `title` 和 `myHero` 属性的值，并且把这些值插入浏览器中。当这些属性发生变化时，Angular 就会自动刷新显示。

<div class="l-sub-section">

More precisely, the redisplay occurs after some kind of asynchronous event related to
the view, such as a keystroke, a timer completion, or a response to an HTTP request.

严格来说，“重新显示”是在某些与视图有关的异步事件之后发生的，例如，按键、定时器完成或对 HTTP 请求的响应。

</div>

Notice that you don't call **new** to create an instance of the `AppComponent` class.
Angular is creating an instance for you. How?

注意，你没有调用 **new** 来创建 `AppComponent` 类的实例，是 Angular 替你创建了它。那么它是如何创建的呢？

The CSS `selector` in the `@Component` decorator specifies an element named `<app-root>`.
That element is a placeholder in the body of your `index.html` file:

注意 `@Component` 装饰器中指定的 CSS 选择器 `selector`，它指定了一个叫 `<app-root>` 的元素。
该元素是 `index.html` 文件里的一个占位符。

<code-example path="displaying-data/src/index.html" linenums="false" title="src/index.html (body)" region="body">

</code-example>

When you bootstrap with the `AppComponent` class (in <code>main.ts</code>), Angular looks for a `<app-root>`
in the `index.html`, finds it, instantiates an instance of `AppComponent`, and renders it
inside the `<app-root>` tag.

当你通过 `main.ts` 中的 `AppComponent` 类启动时，Angular 在 `index.html` 中查找一个 `<app-root>` 元素，
然后实例化一个 `AppComponent`，并将其渲染到 `<app-root>` 标签中。

Now run the app. It should display the title and hero name:

运行应用。它应该显示出标题和英雄名：

<figure>
  <img src="generated/images/guide/displaying-data/title-and-hero.png" alt="Title and Hero">
</figure>

The next few sections review some of the coding choices in the app.

回顾一下前面所做的决定，看看还有哪些其它选择。

## Template inline or template file?

## 内联 (inline) 模板还是模板文件？

You can store your component's template in one of two places.
You can define it *inline* using the `template` property, or you can define
the template in a separate HTML file and link to it in
the component metadata using the `@Component` decorator's `templateUrl` property.

你可以在两种地方存放组件模板。
你可以使用 `template` 属性把它定义为*内联*的，或者把模板定义在一个独立的 HTML 文件中，
再通过 `@Component` 装饰器中的 `templateUrl` 属性，
在组件元数据中把它链接到组件。

The choice between inline and separate HTML is a matter of taste,
circumstances, and organization policy.
Here the app uses inline HTML because the template is small and the demo
is simpler without the additional HTML file.

到底选择内联 HTML 还是独立 HTML 取决于个人喜好、具体状况和组织级策略。
上面的应用选择内联 HTML ，是因为模板很小，而且没有额外的 HTML 文件显得这个演示简单些。

In either style, the template data bindings have the same access to the component's properties.

无论用哪种风格，模板数据绑定在访问组件属性方面都是完全一样的。

<div class="alert is-helpful">

  By default, the Angular CLI generates components with a template file. You can override that with:

  默认情况下，Angular CLI 生成组件时会带有模板文件，你可以通过参数覆盖它：

  <code-example hideCopy language="sh" class="code-shell">
    ng generate component hero -it
  </code-example>

</div>

## Constructor or variable initialization?

## 使用构造函数还是变量初始化？

Although this example uses variable assignment to initialize the components, you could instead declare and initialize the properties using a constructor:

虽然这个例子使用了变量赋值的方式初始化组件，你还可以使用构造函数来声明和初始化属性。

<code-example path="displaying-data/src/app/app-ctor.component.ts" linenums="false" region="class">

</code-example>

This app uses more terse "variable assignment" style simply for brevity.

为了让本应用更加简短，它采用了更简单的“变量赋值”风格。

{@a ngFor}

## Showing an array property with ***ngFor**

## 使用 ***ngFor*** 显示数组属性

To display a list of heroes, begin by adding an array of hero names to the component and redefine `myHero` to be the first name in the array.

要显示一个英雄列表，先向组件中添加一个英雄名字数组，然后把 `myHero` 重定义为数组中的第一个名字。

<code-example path="displaying-data/src/app/app.component.2.ts" linenums="false" title="src/app/app.component.ts (class)" region="class">

</code-example>

Now use the Angular `ngFor` directive in the template to display
each item in the `heroes` list.

接着，在模板中使用 Angular 的 `ngFor` 指令来显示 `heroes` 列表中的每一项。

<code-example path="displaying-data/src/app/app.component.2.ts" linenums="false" title="src/app/app.component.ts (template)" region="template">

</code-example>

This UI uses the HTML unordered list with `<ul>` and `<li>` tags. The `*ngFor`
in the `<li>` element is the Angular "repeater" directive.
It marks that `<li>` element (and its children) as the "repeater template":

这个界面使用了由 `<ul>` 和 `<li>` 标签组成的无序列表。`<li>` 元素里的 `*ngFor` 是 Angular 的“迭代”指令。
它将 `<li>` 元素及其子级标记为“迭代模板”：

<code-example path="displaying-data/src/app/app.component.2.ts" linenums="false" title="src/app/app.component.ts (li)" region="li">

</code-example>

<div class="alert is-important">

Don't forget the leading asterisk (\*) in `*ngFor`. It is an essential part of the syntax.
For more information, see the [Template Syntax](guide/template-syntax#ngFor) page.

不要忘记 `*ngFor` 中的前导星号 (\*)。它是语法中不可或缺的一部分。
更多信息，见[模板语法](guide/template-syntax#ngFor)。

</div>

Notice the `hero` in the `ngFor` double-quoted instruction;
it is an example of a template input variable. Read
more about template input variables in the [microsyntax](guide/template-syntax#microsyntax) section of
the [Template Syntax](guide/template-syntax) page.

注意看 `ngFor` 双引号表达式中的 `hero`，它是一个模板输入变量。
更多模板输入变量的信息，见[模板语法](guide/template-syntax)中的
[微语法 (microsyntax)](guide/template-syntax#microsyntax)。

Angular duplicates the `<li>` for each item in the list, setting the `hero` variable
to the item (the hero) in the current iteration. Angular uses that variable as the
context for the interpolation in the double curly braces.

Angular 为列表中的每个条目复制一个 `<li>` 元素，在每个迭代中，把 `hero` 变量设置为当前条目（英雄）。
Angular 把 `hero` 变量作为双花括号插值表达式的上下文。

<div class="l-sub-section">

In this case, `ngFor` is displaying an array, but `ngFor` can
repeat items for any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) object.

本例中，`ngFor` 用于显示一个“数组”，
但 `ngFor` 可以为任何[可迭代的 (iterable) ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)对象重复渲染条目。

</div>

Now the heroes appear in an unordered list.

现在，英雄们出现在了一个无序列表中。

<figure>
  <img src="generated/images/guide/displaying-data/hero-names-list.png" alt="After ngfor">
</figure>

## Creating a class for the data

## 为数据创建一个类

The app's code defines the data directly inside the component, which isn't best practice.
In a simple demo, however, it's fine.

应用代码直接在组件内部直接定义了数据。
作为演示还可以，但它显然不是最佳实践。

At the moment, the binding is to an array of strings.
In real applications, most bindings are to more specialized objects.

现在使用的是到了一个字符串数组的绑定。在真实的应用中，大多是到一个对象数组的绑定。

To convert this binding to use specialized objects, turn the array
of hero names into an array of `Hero` objects. For that you'll need a `Hero` class:

要将此绑定转换成使用对象，需要把这个英雄名字数组变成 `Hero` 对象数组。但首先得有一个 `Hero` 类。

<code-example language="sh" class="code-shell">
  ng generate class hero
</code-example>

With the following code:

代码如下：

<code-example path="displaying-data/src/app/hero.ts" linenums="false" title="src/app/hero.ts">

</code-example>

You've defined a class with a constructor and two properties: `id` and `name`.

你定义了一个类，具有一个构造函数和两个属性：`id` 和 `name`。

It might not look like the class has properties, but it does.
The declaration of the constructor parameters takes advantage of a TypeScript shortcut.

它可能看上去不像是有属性的类，但它确实有，利用的是 TypeScript 提供的简写形式 —— 用构造函数的参数直接定义属性。

Consider the first parameter:

来看第一个参数：

<code-example path="displaying-data/src/app/hero.ts" linenums="false" title="src/app/hero.ts (id)" region="id">

</code-example>

That brief syntax does a lot:

这个简写语法做了很多：

* Declares a constructor parameter and its type.

   声明了一个构造函数参数及其类型。

* Declares a public property of the same name.

   声明了一个同名的公共属性。

* Initializes that property with the corresponding argument when creating an instance of the class.

   当创建该类的一个实例时，把该属性初始化为相应的参数值。

### Using the Hero class

### 使用 Hero 类

After importing the `Hero` class, the `AppComponent.heroes` property can return a _typed_ array
of `Hero` objects:

导入了 `Hero` 类之后，组件的 `heroes` 属性就可以返回一个*类型化的*`Hero` 对象数组了。

<code-example path="displaying-data/src/app/app.component.3.ts" linenums="false" title="src/app/app.component.ts (heroes)" region="heroes">

</code-example>

Next, update the template.
At the moment it displays the hero's `id` and `name`.
Fix that to display only the hero's `name` property.

接着，修改模板。
现在它显示的是英雄的 `id` 和 `name`。
要修复它，只显示英雄的 `name` 属性就行了。

<code-example path="displaying-data/src/app/app.component.3.ts" linenums="false" title="src/app/app.component.ts (template)" region="template">

</code-example>

The display looks the same, but the code is clearer.

显示上还和以前一样，不过代码更清晰了。

{@a ngIf}

## Conditional display with NgIf

## 通过 NgIf 进行条件显示

Sometimes an app needs to display a view or a portion of a view only under specific circumstances.

有时，应用需要只在特定情况下显示视图或视图的一部分。

Let's change the example to display a message if there are more than three heroes.

来改一下这个例子，如果多于三位英雄，显示一条消息。

The Angular `ngIf` directive inserts or removes an element based on a _truthy/falsy_ condition.
To see it in action, add the following paragraph at the bottom of the template:

Angular 的 `ngIf` 指令会根据一个布尔条件来显示或移除一个元素。
来看看实际效果，把下列语句加到模板的底部：

<code-example path="displaying-data/src/app/app.component.ts" linenums="false" title="src/app/app.component.ts (message)" region="message">

</code-example>

<div class="alert is-important">

Don't forget the leading asterisk (\*) in `*ngIf`. It is an essential part of the syntax.
Read more about `ngIf` and `*` in the [ngIf section](guide/template-syntax#ngIf) of the [Template Syntax](guide/template-syntax) page.

不要忘了 `*ngIf` 中的前导星号 (\*)。它是本语法中不可或缺的一部分。
更多 `ngIf` 和 `* ` 的内容，见[模板语法](guide/template-syntax)中的[ngIf](guide/template-syntax#ngIf)。

</div>

The template expression inside the double quotes,
`*ngIf="heroes.length > 3"`, looks and behaves much like TypeScript.
When the component's list of heroes has more than three items, Angular adds the paragraph
to the DOM and the message appears. If there are three or fewer items, Angular omits the
paragraph, so no message appears. For more information,
see the [template expressions](guide/template-syntax#template-expressions) section of the
[Template Syntax](guide/template-syntax) page.

双引号中的模板表达式 `*ngIf="heros.length > 3"`，外观和行为很象 TypeScript 。
当组件中的英雄列表有三个以上的条目时，Angular 把这个段落添加到 DOM 中，于是消息显示了出来。
更多信息，见[模板语法](guide/template-syntax)中的[模板表达式](guide/template-syntax#template-expressions)。

<div class="alert is-helpful">

Angular isn't showing and hiding the message. It is adding and removing the paragraph element from the DOM. That improves performance, especially in larger projects when conditionally including or excluding
big chunks of HTML with many data bindings.

Angular 并不是在显示和隐藏这条消息，它是在从 DOM 中添加和移除这个段落元素。
这会提高性能，特别是在一些大的项目中有条件地包含或排除一大堆带着很多数据绑定的 HTML 时。

</div>

Try it out. Because the array has four items, the message should appear.
Go back into <code>app.component.ts"</code> and delete or comment out one of the elements from the hero array.
The browser should refresh automatically and the message should disappear.

试一下。因为这个数组中有四个条目，所以消息应该显示出来。
回到 `app.component.ts`，从英雄数组中删除或注释掉一个元素。
浏览器应该自动刷新，消息应该会消失。

## Summary

## 小结

Now you know how to use:

现在你知道了如何使用：

* **Interpolation** with double curly braces to display a component property.

   带有双花括号的**插值表达式 (interpolation) **来显示一个组件属性。

* **ngFor** to display an array of items.

   用 **ngFor** 显示数组。

* A TypeScript class to shape the **model data** for your component and display properties of that model.

   用一个 TypeScript 类来为你的组件描述**模型数据**并显示模型的属性。

* **ngIf** to conditionally display a chunk of HTML based on a boolean expression.

   用 **ngIf** 根据一个布尔表达式有条件地显示一段 HTML。

Here's the final code:

下面是最终的代码：

<code-tabs>

  <code-pane title="src/app/app.component.ts" path="displaying-data/src/app/app.component.ts" region="final">

  </code-pane>

  <code-pane title="src/app/hero.ts" path="displaying-data/src/app/hero.ts">

  </code-pane>

  <code-pane title="src/app/app.module.ts" path="displaying-data/src/app/app.module.ts">

  </code-pane>

  <code-pane title="main.ts" path="displaying-data/src/main.ts">

  </code-pane>

</code-tabs>
