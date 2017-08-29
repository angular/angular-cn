@title
英雄编辑器

@intro
构建一个简单的英雄编辑器

@description

<div class="l-sub-section">

### 阅读指南（译者）

对于没有前端基础的同学来说，读本教程的时候可能会遇到一些陌生的名词。不要慌，你可以跳到[词汇表](guide/glossary)查找对它的详细解释。

如果想对Angular的概念有一个宏观的了解，请先阅读[架构概览](guide/architecture)。

</div>

## Setup to develop locally

## 为本地开发搭建环境

Follow the [setup](guide/setup) instructions for creating a new project
named <code>angular-tour-of-heroes</code>.

根据[开发环境](guide/setup)中的说明创建一个名为<ngio-ex path="angular-tour-of-heroes"></ngio-ex>的新项目

The file structure should look like this:

该项目的文件结构应该是这样的：


<div class='filetree'>

  <div class='file'>
    angular-tour-of-heroes
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

      </div>

      <div class='file'>
        main.ts
      </div>

      <div class='file'>
        index.html
      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        systemjs.config.js
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>



When you're done with this page, the app should look like this <live-example></live-example>.

在我们完成本章时，得到的应用和这个<live-example></live-example>一样。


{@a keep-transpiling}


## Keep the app transpiling and running

## 保持应用不断转译和运行

Enter the following command in the terminal window:

在命令行窗口中输入以下命令：


<code-example language="sh" class="code-shell">
  npm start

</code-example>



This command runs the TypeScript compiler in "watch mode", recompiling automatically when the code changes.
The command simultaneously launches the app in a browser and refreshes the browser when the code changes.

这个命令会在“监听”模式下运行TypeScript编译器，当代码变化时，它会自动重新编译。
同时，该命令还会在浏览器中启动该应用，并且当代码变化时刷新浏览器。

You can keep building the Tour of Heroes without pausing to recompile or refresh the browser.

在后续构建《英雄指南》过程中，应用能持续运行，而不用中断服务来编译或刷新浏览器。



## Show the hero

## 显示此英雄

Add two properties to the `AppComponent`: a `title` property for the app name and a `hero` property
for a hero named "Windstorm."

往`AppComponent`中添加两个属性：`title`属性用来表示应用的名字，而`hero`属性用来表示名叫“Windstorm”的英雄。


<code-example path="toh-pt1/app/app.component.1.ts" region="app-component-1" title="app.component.ts (AppComponent class)" linenums="false">

</code-example>



Now update the template in the `@Component` decorator with data bindings to these new properties.

下面，更新`@Component`装饰器中指定的模板，为这些新属性建立数据绑定。


<code-example path="toh-pt1/app/app.component.1.ts" region="show-hero" title="app.component.ts (@Component)" linenums="false">

</code-example>



The browser refreshes and displays the title and hero name.

保存后，浏览器应自动刷新，显示标题和英雄。

The double curly braces are Angular's *interpolation binding* syntax.
These interpolation bindings present the component's `title` and `hero` property values,
as strings, inside the HTML header tags.

这里的双大括号是Angular中的*插值表达式绑定*语法。它们表示组件的`title`和`hero`属性的值会作为字符串插入到HTML标签中间。


<div class="l-sub-section">



Read more about interpolation in the [Displaying Data](guide/displaying-data) page.

要了解插值表达式的更多知识，见[显示数据](guide/displaying-data)。


</div>



### Hero object

### Hero 对象

The hero needs more properties.
Convert the `hero` from a literal string to a class.

显然，英雄还需要更多属性。
让我们把`hero`从一个字符串字面量换成一个类。

Create a `Hero` class with `id` and `name` properties.
Add these properties near the top of the `app.component.ts` file, just below the import statement.

创建一个`Hero`类，它具有`id`和`name`属性。
现在，把下列代码放在`app.component.ts`的顶部，仅次于 import 语句。


<code-example path="toh-pt1/src/app/app.component.ts" region="hero-class-1" title="src/app/app.component.ts (Hero class)" linenums="false">

</code-example>



In the `AppComponent` class, refactor the component's `hero` property to be of type `Hero`,
then initialize it with an `id` of `1` and the name `Windstorm`.

现在，有了一个`Hero`类，我们把组件`hero`属性的类型换成`Hero`。
然后以`1`为 id、以 “Windstorm” 为名字，初始化它。


<code-example path="toh-pt1/src/app/app.component.ts" region="hero-property-1" title="src/app/app.component.ts (hero property)" linenums="false">

</code-example>



Because you changed the hero from a string to an object,
update the binding in the template to refer to the hero's `name` property.

我们把`hero`从一个字符串换成了对象，所以也得更新模板中的绑定表达式，来引用`hero`的`name`属性。


<code-example path="toh-pt1/app/app.component.1.ts" region="show-hero-2" title="src/app/app.component.ts">

</code-example>



The browser refreshes and continues to display the hero's name.

浏览器自动刷新，并继续显示这位英雄的名字。

### Adding HTML with multi-line template strings

### 使用多行模板字符串添加更多 HTML

To show all of the hero's properties,
add a `<div>` for the hero's `id` property and another `<div>` for the hero's `name`.
To keep the template readable, place each `<div>` on its own line.

要显示英雄的所有属性，还要为英雄的`id`属性添加一个`<div>`，为英雄的`name`属性添加另一个`<div>`。
为了保持模板的可读性，把每个`<div>`单独放一行。

The backticks around the component template let you put the `<h1>`, `<h2>`, and `<div>` elements on their own lines,
thanks to the <i>template literals</i> feature in ES2015 and TypeScript. For more information, see
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank" title="template literal">Template literals</a>.

反引号包裹的组件模板能让你把`<h1>`、`<h2>`和`<div>`元素各自放在一行上。
感谢ES2015和TypeScript的*模板字面量*特性。要了解更多，请参见<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank" title="template literal">模板字面量（Template literals）</a> 页。



<code-example path="toh-pt1/app/app.component.1.ts" region="multi-line-strings" title="app.component.ts (AppComponent's template)" linenums="false">

</code-example>




## Edit the hero name

## 编辑英雄名字

Users should be able to edit the hero name in an `<input>` textbox.
The textbox should both _display_ the hero's `name` property
and _update_ that property as the user types.

用户应该能在一个`<input>`输入框中编辑英雄的名字。
当用户输入时，这个输入框应该能同时*显示*和*修改*英雄的`name`属性。

You need a two-way binding between the `<input>` form element and the `hero.name` property.

也就是说，我们要在表单元素`<input>`和组件的`hero.name`属性之间建立双向绑定。

### Two-way binding

### 双向绑定

Refactor the hero name in the template so it looks like this:

把模板中的英雄名字重构成这样：


<code-example path="toh-pt1/app/app.component.1.ts" region="name-input" title="src/app/app.component.ts" linenums="false">

</code-example>



`[(ngModel)]` is the Angular syntax to bind the `hero.name` property
to the textbox.
Data flows _in both directions:_ from the property to the textbox,
and from the textbox back to the property.

`[(ngModel)]`是一个Angular语法，用与把`hero.name`绑定到输入框中。
它的数据流是*双向的*：从属性到输入框，并且从输入框回到属性。

Unfortunately, immediately after this change, the application breaks.
If you looked in the browser console, you'd see Angular complaining that
"`ngModel` ... isn't a known property of `input`."

不幸的是，做了这项改动之后，我们的程序崩溃了。
打开浏览器的控制台，我们会看到Angular抱怨说：“`ngModel` ... isn't a known property of `input`.”（`ngModel`不是`input`元素的已知属性）

Although `NgModel` is a valid Angular directive, it isn't available by default.
It belongs to the optional `FormsModule`.
You must opt-in to using that module.

虽然`NgModel`是一个有效的Angular指令，但它默认情况下却是不可用的。
它属于一个可选模块`FormsModule`。
我们必须选择使用那个模块。

### Import the _FormsModule_

### 导入 _FormsModule_

Open the `app.module.ts` file and import the `FormsModule` symbol from the `@angular/forms` library.
Then add the `FormsModule` to the `@NgModule` metadata's `imports` array, which contains the list
of external modules that the app uses.

打开`app.module.ts`文件，并且从`@angular/forms`库中导入符号`FormsModule`。
然后把`FormsModule`添加到`@NgModule`元数据的`imports`数组中，它是当前应用正在使用的外部模块列表。

The updated `AppModule` looks like this:

修改后的`AppModule`是这样的：


<code-example path="toh-pt1/src/app/app.module.ts" title="app.module.ts (FormsModule import)">

</code-example>



<div class="l-sub-section">



Read more about `FormsModule` and `ngModel` in the
[Two-way data binding with ngModel](guide/forms#ngModel) section of the
[Forms](guide/forms) guide and the
[Two-way binding with NgModel](guide/template-syntax#ngModel) section of the
[Template Syntax](guide/template-syntax) guide.

要学习关于`FormsModule`和`ngModel`的更多知识，参见[表单](guide/forms#ngModel)和
[模板语法](guide/template-syntax#ngModel)。


</div>



When the browser refreshes, the app should work again.
You can edit the hero's name and see the changes reflected immediately in the `<h2>` above the textbox.

浏览器刷新。又见到我们的英雄了。我们可以编辑英雄的名字，也能看到这个改动立刻体现在`<h2>`中。



## The road you've travelled

## 我们已经走过的路

Take stock of what you've built.

我们来盘点一下已经构建完成的部分。

* The Tour of Heroes app uses the double curly braces of interpolation (a type of one-way data binding)
to display the app title and properties of a `Hero` object.

  我们的《英雄指南》使用双大括号插值表达式(单向数据绑定的一种形式)来显示应用的标题和`Hero`对象的属性。
  
* You wrote a multi-line template using ES2015's template literals to make the template readable.

  我们使用 ES2015 的模板字符串写了一个多行模板，使我们的模板更具可读性。
  
* You added a two-way data binding to the `<input>` element
using the built-in `ngModel` directive. This binding both displays the hero's name and allows users to change it.

  为了同时显示和修改英雄的名字，我们还使用了内置的`ngModel`指令，往`<input>`元素上添加了双向数据绑定。
  
* The `ngModel` directive propagates changes to every other binding of the `hero.name`.

  `ngModel`指令将这些修改传播到每一个对`hero.name`的其它绑定。

Your app should look like this <live-example></live-example>.

运行这部分的<live-example></live-example>。

Here's the complete `app.component.ts` as it stands now:

完整的`app.component.ts`是这样的：


<code-example path="toh-pt1/src/app/app.component.ts" title="src/app/app.component.ts">

</code-example>




## The road ahead

## 前方的路

In the [next tutorial page](tutorial/toh-pt2  "Master/Detail"), you'll build on the Tour of Heroes app to display a list of heroes.
You'll also allow the user to select heroes and display their details.
You'll learn more about how to retrieve lists and bind them to the template.

在[教程的下一章](tutorial/toh-pt2)，我们将在这个《英雄指南》中显示一个英雄列表。
我们将允许允许用户选择一个英雄，并且显示它/她的详情。
我们还将学会如何获取列表以及将它们绑定到模板中。
