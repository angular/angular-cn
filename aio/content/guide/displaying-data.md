# Displaying data in views

# 在视图中显示数据

Angular [components](guide/glossary#component) form the data structure of your application.
The HTML [template](guide/glossary#template) associated with a component provides the means to display that data in the context of a web page.
Together, a component's class and template form a [view](guide/glossary#view) of your application data.

各种 Angular [组件](guide/glossary#component)构成了应用的数据结构。
组件关联到的 HTML [模板](guide/glossary#template)提供了在 Web 页面的上下文中显示数据的各种方法。
组件类和模板，共同构成了应用数据的一个[视图](guide/glossary#view)。

The process of combining data values with their representation on the page is called [data binding](guide/glossary#data-binding).
You display your data to a user (and collect data from the user) by *binding* controls in the HTML template to the data properties of the component class.

在页面上把数据的值及其表现形式组合起来的过程，就叫做[数据绑定](guide/glossary#data-binding)。
通过将 HTML 模板中的各个控件*绑定*到组件类中的各种数据属性，你就把数据展示给了用户（并从该用户收集数据）。

In addition, you can add logic to the template by including [directives](guide/glossary#directive), which tell Angular how to modify the page as it is rendered.

另外，你可以使用[指令](guide/glossary#directive)来向模板中添加逻辑，指令告诉 Angular 在渲染页面时要如何修改。

Angular defines a *template language* that expands HTML notation with syntax that allows you to define various kinds of data binding and logical directives.
When the page is rendered, Angular interprets the template syntax to update the HTML according to your logic and current data state.
Before you read the complete [template syntax guide](guide/template-syntax), the exercises on this page give you a quick demonstration of how template syntax works.

Angular 定义了一种*模板语言*，它扩展了 HTML 标记，其扩展语法可以让你定义各种各样的数据绑定和逻辑指令。
当渲染完此页面之后，Angular 会解释这种模板语法，来根据你的逻辑更新 HTML 和数据的当前状态。
在你读完[模板语法这章](guide/template-syntax)之前，本页中的练习可以先让你快速了解下这种模板语法的工作方式。

In this demo, you'll create a component with a list of heroes.
You'll display the list of hero names and conditionally show a message below the list.
The final UI looks like this:

在这个示例中，你将创建一个带有英雄列表的组件。
你会显示出这些英雄的名字清单，某些情况下，还会在清单下方显示一条消息。
最终的用户界面是这样的：

<div class="lightbox">
  <img src="generated/images/guide/displaying-data/final.png" alt="Final UI">
</div>

<div class="alert is-helpful">

The <live-example></live-example> demonstrates all of the syntax and code
snippets described in this page.

这个<live-example></live-example>演示了本章中描述的所有语法和代码片段。

</div>

{@a interpolation}

## Showing component properties with interpolation

## 使用插值显示组件属性

The easiest way to display a component property is to bind the property name through interpolation.
With interpolation, you put the property name in the view template, enclosed in double curly braces: `{{myHero}}`.

要显示组件的属性，最简单的方式就是通过插值 (interpolation) 来绑定属性名。
要使用插值，就把属性名包裹在双花括号里放进视图模板，如 `{{myHero}}`。

Use the CLI command [`ng new displaying-data`](cli/new) to create a workspace and app named `displaying-data`.

使用 CLI 命令 [`ng new displaying-data`](cli/new) 创建一个工作空间和一个名叫 `displaying-data` 的应用。

Delete the <code>app.component.html</code> file. It is not needed for this example.

删除 <code>app.component.html</code> 文件，这个范例中不再需要它了。

Then modify the <code>app.component.ts</code> file by
changing the template and the body of the component.

然后，到 `app.component.ts` 文件中修改组件的模板和代码。

When you're done, it should look like this:

修改完之后，它应该是这样的：

<code-example path="displaying-data/src/app/app.component.1.ts" header="src/app/app.component.ts"></code-example>

You added two properties to the formerly empty component: `title` and `myHero`.

再把两个属性 `title` 和 `myHero` 添加到之前空白的组件中。

The template displays the two component properties using double curly brace
interpolation:

修改完的模板会使用双花括号形式的插值来显示这两个模板属性：

<code-example path="displaying-data/src/app/app.component.1.ts" header="src/app/app.component.ts (template)" region="template"></code-example>

<div class="alert is-helpful">

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

<div class="alert is-helpful">

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

<code-example path="displaying-data/src/index.html" header="src/index.html (body)" region="body"></code-example>

When you bootstrap with the `AppComponent` class (in <code>main.ts</code>), Angular looks for a `<app-root>`
in the `index.html`, finds it, instantiates an instance of `AppComponent`, and renders it
inside the `<app-root>` tag.

当你通过 `main.ts` 中的 `AppComponent` 类启动时，Angular 在 `index.html` 中查找一个 `<app-root>` 元素，
然后实例化一个 `AppComponent`，并将其渲染到 `<app-root>` 标签中。

Now run the app. It should display the title and hero name:

运行应用。它应该显示出标题和英雄名：

<div class="lightbox">
  <img src="generated/images/guide/displaying-data/title-and-hero.png" alt="Title and Hero">
</div>

The next few sections review some of the coding choices in the app.

回顾一下前面所做的决定，看看还有哪些其它选择。

## Choosing the template source

## 选择模板来源

The `@Component` metadata tells Angular where to find the component's template.
You can store your component's template in one of two places.

`@Component` 元数据告诉 Angular 要到哪里去找该组件的模板。
你有两种方式存放组件的模板。

* You can define the template *inline* using the `template` property of the `@Component` decorator. An inline template is useful for a small demo or test.

  你可以使用 `@Component` 装饰器的 `template` 属性来定义*内联*模板。内联模板对于小型示例或测试很有用。

* Alternatively, you can define the template in a separate HTML file and link to that file in the `templateUrl` property of the `@Component` decorator. This configuration is typical for anything more complex than a small test or demo, and is the default when you generate a new component.

   此外，你还可以把模板定义在单独的 HTML 文件中，并且让 `@Component` 装饰器的 `templateUrl` 属性指向该文件。这种配置方式通常用于所有比小型测试或示例更复杂的场景中，它也是生成新组件时的默认值。

In either style, the template data bindings have the same access to the component's properties.
Here the app uses inline HTML because the template is small and the demo is simpler without the additional HTML file.

无论用哪种风格，模板数据绑定在访问组件属性方面都是完全一样的。
这里的应用使用了内联 HTML，是因为该模板很小，而且示例也很简单，用不到外部 HTML 文件。

<div class="alert is-helpful">

  By default, the Angular CLI command [`ng generate component`](cli/generate) generates components with a template file.
  You can override that by adding the "-t" (short for `inlineTemplate=true`) option:

  默认情况下，Angular CLI 命令 [`ng generate component`](cli/generate) 在生成组件时会带有模板文件，你可以通过参数来覆盖它：

  <code-example hideCopy language="sh" class="code-shell">
    ng generate component hero -t
  </code-example>

</div>

## Initialization

## 初始化

The following example uses variable assignment to initialize the components.

下面的例子使用变量赋值来对组件进行初始化。

<code-example path="displaying-data/src/app/app-ctor.component.1.ts" region="class"></code-example>

You could instead declare and initialize the properties using a constructor.
 This app uses more terse "variable assignment" style simply for brevity.

你可以用构造函数来代替这些属性的声明和初始化语句。

{@a ngFor}

## Add logic to loop through data

## 添加循环遍历数据的逻辑

The `*ngFor` directive (predefined by Angular) lets you loop through data. The following example uses the directive to show all of the values in an array property.

`*ngFor` 指令（Angular 预置）可以让你循环遍历数据。下面的例子使用该指令来显示数组型属性中的所有值。

To display a list of heroes, begin by adding an array of hero names to the component and redefine `myHero` to be the first name in the array.

要显示一个英雄列表，先向组件中添加一个英雄名字数组，然后把 `myHero` 重定义为数组中的第一个名字。

<code-example path="displaying-data/src/app/app.component.2.ts" header="src/app/app.component.ts (class)" region="class"></code-example>

Now use the Angular `ngFor` directive in the template to display
each item in the `heroes` list.

接着，在模板中使用 Angular 的 `ngFor` 指令来显示 `heroes` 列表中的每一项。

<code-example path="displaying-data/src/app/app.component.2.ts" header="src/app/app.component.ts (template)" region="template"></code-example>

This UI uses the HTML unordered list with `<ul>` and `<li>` tags. The `*ngFor`
in the `<li>` element is the Angular "repeater" directive.
It marks that `<li>` element (and its children) as the "repeater template":

这个界面使用了由 `<ul>` 和 `<li>` 标签组成的无序列表。`<li>` 元素里的 `*ngFor` 是 Angular 的“迭代”指令。
它将 `<li>` 元素及其子级标记为“迭代模板”：

<code-example path="displaying-data/src/app/app.component.2.ts" header="src/app/app.component.ts (li)" region="li"></code-example>

<div class="alert is-important">

Don't forget the leading asterisk (\*) in `*ngFor`. It is an essential part of the syntax.
Read more about `ngFor` and `*` in the [ngFor section](guide/template-syntax#ngfor) of the [Template Syntax](guide/template-syntax) page.

不要忘记 `*ngFor` 中的前导星号 (\*)。它是语法中不可或缺的一部分。
关于 `ngFor` 和 `*` 的更多信息，参见[模板语法](guide/template-syntax#ngFor)页的 [ngFor 部分](guide/template-syntax#ngfor)。

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
Angular 把 `hero` 变量作为双花括号插值的上下文。

<div class="alert is-helpful">

In this case, `ngFor` is displaying an array, but `ngFor` can
repeat items for any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) object.

本例中，`ngFor` 用于显示一个“数组”，
但 `ngFor` 可以为任何[可迭代的 (iterable) ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)对象重复渲染条目。

</div>

Now the heroes appear in an unordered list.

现在，英雄们出现在了一个无序列表中。

<div class="lightbox">
  <img src="generated/images/guide/displaying-data/hero-names-list.png" alt="After ngfor">
</div>

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

This command creates the following code.

此命令创建了如下代码：

<code-example path="displaying-data/src/app/hero.ts" header="src/app/hero.ts"></code-example>

You've defined a class with a constructor and two properties: `id` and `name`.

你定义了一个类，具有一个构造函数和两个属性：`id` 和 `name`。

It might not look like the class has properties, but it does.
The declaration of the constructor parameters takes advantage of a TypeScript shortcut.

它可能看上去不像是有属性的类，但它确实有，利用的是 TypeScript 提供的简写形式 —— 用构造函数的参数直接定义属性。

Consider the first parameter:

来看第一个参数：

<code-example path="displaying-data/src/app/hero.ts" header="src/app/hero.ts (id)" region="id"></code-example>

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

<code-example path="displaying-data/src/app/app.component.3.ts" header="src/app/app.component.ts (heroes)" region="heroes"></code-example>

Next, update the template.
At the moment it displays the hero's `id` and `name`.
Fix that to display only the hero's `name` property.

接着，修改模板。
现在它显示的是英雄的 `id` 和 `name`。
要修复它，只显示英雄的 `name` 属性就行了。

<code-example path="displaying-data/src/app/app.component.3.ts" header="src/app/app.component.ts (template)" region="template"></code-example>

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

<code-example path="displaying-data/src/app/app.component.ts" header="src/app/app.component.ts (message)" region="message"></code-example>

<div class="alert is-important">

Don't forget the leading asterisk (\*) in `*ngIf`. It is an essential part of the syntax.
Read more about `ngIf` and `*` in the [ngIf section](guide/template-syntax#ngIf) of the [Template Syntax](guide/template-syntax) page.

不要忘了 `*ngIf` 中的前导星号 (\*)。它是本语法中不可或缺的一部分。
更多 `ngIf` 和 `* ` 的内容，见[模板语法](guide/template-syntax)中的[ngIf](guide/template-syntax#ngIf)。

</div>

The template expression inside the double quotes,
`*ngIf="heroes.length > 3"`, looks and behaves much like TypeScript.
When the component's list of heroes has more than three items, Angular adds the paragraph
to the DOM and the message appears.
If there are three or fewer items, Angular omits the paragraph, so no message appears.

双引号内的模板表达式 `*ngIf="heroes.length > 3"` 的外观和行为与 TypeScript 非常相似。当组件的英雄列表包含三个以上的条目时，Angular 会将这段话添加到 DOM 中，这条消息就显示出来了。如果只有三个或更少的条目，Angular 就会省略该段落，也就不会显示任何消息。

For more information, see [template expressions](guide/template-syntax#template-expressions).

双引号中的模板表达式 `*ngIf="heros.length > 3"`，外观和行为很象 TypeScript。
当组件中的英雄列表有三个以上的条目时，Angular 就会把这个段落添加到 DOM 中，于是消息显示了出来。
如果有三个或更少的条目，则 Angular 会省略这些段落，所以不显示消息。
更多信息，见[模板语法](guide/template-syntax)中的[模板表达式](guide/template-syntax#template-expressions)。

<div class="alert is-helpful">

Angular isn't showing and hiding the message. It is adding and removing the paragraph element from the DOM. That improves performance, especially in larger projects when conditionally including or excluding
big chunks of HTML with many data bindings.

Angular 并不是在显示和隐藏这条消息，它是在从 DOM 中添加和移除这个段落元素。
这会提高性能，特别是在一些大的项目中有条件地包含或排除一大堆带着很多数据绑定的 HTML 时。

</div>

Try it out. Because the array has four items, the message should appear.
Go back into <code>app.component.ts</code> and delete or comment out one of the elements from the heroes array.
The browser should refresh automatically and the message should disappear.

试一下。因为这个数组中有四个条目，所以消息应该显示出来。
回到 `app.component.ts`，从英雄数组中删除或注释掉一个元素。
浏览器应该自动刷新，消息应该会消失。

## Summary

## 小结

Now you know how to use:

现在你知道了如何使用：

* **Interpolation** with double curly braces to display a component property.

   带有双花括号的**插值 (interpolation) **来显示一个组件属性。

* **ngFor** to display an array of items.

   用 **ngFor** 显示数组。

* A TypeScript class to shape the **model data** for your component and display properties of that model.

   用一个 TypeScript 类来为你的组件描述**模型数据**并显示模型的属性。

* **ngIf** to conditionally display a chunk of HTML based on a boolean expression.

   用 **ngIf** 根据一个布尔表达式有条件地显示一段 HTML。

Here's the final code:

下面是最终的代码：

<code-tabs>

  <code-pane header="src/app/app.component.ts" path="displaying-data/src/app/app.component.ts" region="final">

  </code-pane>

  <code-pane header="src/app/hero.ts" path="displaying-data/src/app/hero.ts">

  </code-pane>

  <code-pane header="src/app/app.module.ts" path="displaying-data/src/app/app.module.ts">

  </code-pane>

  <code-pane header="main.ts" path="displaying-data/src/main.ts">

  </code-pane>

</code-tabs>
