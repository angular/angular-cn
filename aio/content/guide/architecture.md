# Architecture Overview

# 架构概览

Angular is a framework for building client applications in HTML and
either JavaScript or a language like TypeScript that compiles to JavaScript.

Angular 是一个用 HTML 和 JavaScript 或者一个可以编译成 JavaScript 的语言（例如 Dart 或者 TypeScript ），来构建客户端应用的框架。

The framework consists of several libraries, some of them core and some optional.

该框架包括一系列库，有些是核心库，有些是可选库。


You write Angular applications by composing HTML *templates* with Angularized markup,
writing *component* classes to manage those templates, adding application logic in *services*,
and boxing components and services in *modules*.

我们是这样写 Angular 应用的：用 Angular 扩展语法编写 HTML *模板*，
用*组件*类管理这些模板，用*服务*添加应用逻辑，
用*模块*打包发布组件与服务。

Then you launch the app by *bootstrapping* the _root module_.
Angular takes over, presenting your application content in a browser and
responding to user interactions according to the instructions you've provided.

然后，我们通过*引导*_根模块_来启动该应用。
Angular 在浏览器中接管、展现应用的内容，并根据我们提供的操作指令响应用户的交互。

Of course, there is more to it than this.
You'll learn the details in the pages that follow. For now, focus on the big picture.

当然，这只是冰山一角。后面我们将学习更多的细节。不过，目前我们还是先关注全景图吧。


<figure>
  <img src="generated/images/guide/architecture/overview2.png" alt="overview">
</figure>

<div class="l-sub-section">

  The code referenced on this page is available as a <live-example></live-example>.

<p>
  本章所引用的代码见<live-example></live-example>。
</p>



</div>

## Modules

## 模块


<img src="generated/images/guide/architecture/module.png" alt="模块" class="left">


Angular apps are modular and Angular has its own modularity system called _NgModules_.

Angular 应用是模块化的，并且 Angular 有自己的模块系统，它被称为 _Angular 模块_或 _NgModules_。

NgModules are a big deal.
This page introduces modules; the [NgModules](guide/ngmodule) page covers them in depth.

_Angular 模块_很重要。这里只是简单介绍，在 [Angular 模块](guide/ngmodule)中会做深入讲解。

<br class="clear">

Every Angular app has at least one NgModule class, [the _root module_](guide/bootstrapping "Bootstrapping"),  
conventionally named `AppModule`.

每个 Angular 应用至少有一个模块（[_根模块_](guide/bootstrapping "引导启动")），习惯上命名为`AppModule`。

While the _root module_ may be the only module in a small application, most apps have many more
_feature modules_, each a cohesive block of code dedicated to an application domain,
a workflow, or a closely related set of capabilities.

_根模块_在一些小型应用中可能是唯一的模块，大多数应用会有很多_特性模块_，每个模块都是一个内聚的代码块专注于某个应用领域、工作流或紧密相关的功能。

An NgModule, whether a _root_ or _feature_, is a class with an `@NgModule` decorator.

Angular 模块（无论是_根模块_还是_特性模块_）都是一个带有`@NgModule`装饰器的类。


<div class="l-sub-section">

  Decorators are functions that modify JavaScript classes.
  Angular has many decorators that attach metadata to classes so that it knows
  what those classes mean and how they should work.
  <a href="https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0">
  Learn more</a> about decorators on the web.

装饰器是用来修饰 JavaScript 类的函数。
Angular 有很多装饰器，它们负责把元数据附加到类上，以了解那些类的设计意图以及它们应如何工作。
关于装饰器的<a href="https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0" target="_blank">更多信息</a>。


</div>

`NgModule` is a decorator function that takes a single metadata object whose properties describe the module.
The most important properties are:

`NgModule`是一个装饰器函数，它接收一个用来描述模块属性的元数据对象。其中最重要的属性是：

* `declarations` - the _view classes_ that belong to this module.
Angular has three kinds of view classes: [components](guide/architecture#components), [directives](guide/architecture#directives), and [pipes](guide/pipes).

  `declarations` - 声明本模块中拥有的_视图类_。Angular 有三种视图类：[组件](guide/architecture#components)、[指令](guide/architecture#directives)和[管道](guide/pipes)。

* `exports` - the subset of declarations that should be visible and usable in the component [templates](guide/architecture#templates) of other modules.

  `exports` - declarations 的子集，可用于其它模块的组件[模板](guide/architecture#templates)。
  
* `imports` - other modules whose exported classes are needed by component templates declared in _this_ module.

  `imports` - _本_模块声明的组件模板需要的类所在的其它模块。
  
* `providers` - creators of [services](guide/architecture#services) that this module contributes to
  the global collection of services; they become accessible in all parts of the app.

  `providers` - [服务](guide/architecture#services)的创建者，并加入到全局服务列表中，可用于应用任何部分。
  
* `bootstrap` - the main application view, called the _root component_,
  that hosts all other app views. Only the _root module_ should set this `bootstrap` property.

  `bootstrap` - 指定应用的主视图（称为_根组件_），它是所有其它视图的宿主。只有_根模块_才能设置`bootstrap`属性。
  
Here's a simple root module:

下面是一个简单的根模块：
  

<code-example path="architecture/src/app/mini-app.ts" region="module" title="src/app/app.module.ts" linenums="false"></code-example>

<div class="l-sub-section">

  The `export` of `AppComponent` is just to show how to export; it isn't actually necessary in this example. A root module has no reason to _export_ anything because other components don't need to _import_ the root module.

`AppComponent`的`export`语句只是用于演示如何导出的，它在这个例子中并不是必须的。根模块不需要_导出_任何东西，因为其它组件不需要导入根模块。


</div>

Launch an application by _bootstrapping_ its root module.
During development you're likely to bootstrap the `AppModule` in a `main.ts` file like this one.

我们通过_引导_根模块来启动应用。
在开发期间，你通常在一个`main.ts`文件中引导`AppModule`，就像这样：


<code-example path="architecture/src/main.ts" title="src/main.ts" linenums="false"></code-example>

### NgModules vs. JavaScript modules

### NgModules vs. JavaScript 模块

The NgModule &mdash; a class decorated with `@NgModule` &mdash; is a fundamental feature of Angular.

NgModule（一个带`@NgModule`装饰器的类）是 Angular 的基础特性之一。

JavaScript also has its own module system for managing collections of JavaScript objects.
It's completely different and unrelated to the NgModule system.

JavaScript 也有自己的模块系统，用来管理一组 JavaScript 对象。
它与 Angular 的模块系统完全不同且完全无关。
  
In JavaScript each _file_ is a module and all objects defined in the file belong to that module.
The module declares some objects to be public by marking them with the `export` key word.
Other JavaScript modules use *import statements* to access public objects from other modules.

JavaScript 中，每个_文件_是一个模块，文件中定义的所有对象都从属于那个模块。
通过`export`关键字，模块可以把它的某些对象声明为公共的。
其它 JavaScript 模块可以使用*import 语句*来访问这些公共对象。

<code-example path="architecture/src/app/app.module.ts" region="imports" linenums="false"></code-example>

<code-example path="architecture/src/app/app.module.ts" region="export" linenums="false"></code-example>

<div class="l-sub-section">



<a href="http://exploringjs.com/es6/ch_modules.html" >Learn more about the JavaScript module system on the web.</a>
<a href="http://exploringjs.com/es6/ch_modules.html" target="_blank">学习更多关于 JavaScript 模块的知识。</a>
</div>

These are two different and _complementary_ module systems. Use them both to write your apps.

这两个模块化系统是互补的，我们在写程序时都会用到。


### Angular libraries

### Angular 模块库

<img src="generated/images/guide/architecture/library-module.png" alt="Component" class="left">

Angular ships as a collection of JavaScript modules. You can think of them as library modules.

Angular 提供了一组 JavaScript 模块。可以把它们看做库模块。

Each Angular library name begins with the `@angular` prefix.
  
每个 Angular 库的名字都带有`@angular`前缀。

You install them with the **npm** package manager and import parts of them with JavaScript `import` statements.
用 **npm** 包管理工具安装它们，用 JavaScript 的`import`语句导入其中某些部件。<br class="clear">

For example, import Angular's `Component` decorator from the `@angular/core` library like this:

例如，象下面这样，从`@angular/core`库中导入`Component`装饰器：


<code-example path="architecture/src/app/app.component.ts" region="import" linenums="false"></code-example>

You also import NgModules from Angular _libraries_ using JavaScript import statements:

还可以使用 JavaScript 的导入语句从 Angular _库_中导入 Angular _模块_：

<code-example path="architecture/src/app/mini-app.ts" region="import-browser-module" linenums="false"></code-example>

In the example of the simple root module above, the application module needs material from within that `BrowserModule`. To access that material, add it to the `@NgModule` metadata `imports` like this.

在上面那个简单的根模块的例子中，应用模块需要`BrowserModule`的某些素材。要访问这些素材，就得把它加入`@NgModule`元数据的`imports`中，就像这样：
  

<code-example path="architecture/src/app/mini-app.ts" region="ngmodule-imports" linenums="false"></code-example>

In this way you're using both the Angular and JavaScript module systems _together_.

这种情况下，你同时使用了 Angular 和 JavaScript 的模块化系统。

It's easy to confuse the two systems because they share the common vocabulary of "imports" and "exports".
Hang in there. The confusion yields to clarity with time and experience.

这两个系统比较容易混淆，因为它们共享相同的词汇 “imports” 和 “exports”。不过没关系，先放一放，随着时间和经验的增长，自然就清楚了。


<div class="l-sub-section">



Learn more from the [NgModules](guide/ngmodule) page.
更多信息，见 [Angular 模块](guide/ngmodule)。

</div>

<hr/>

## Components

## 组件

<img src="generated/images/guide/architecture/hero-component.png" alt="Component" class="left">

A _component_ controls a patch of screen called a *view*.

_组件_负责控制屏幕上的一小块区域，我们称之为*视图*。

For example, the following views are controlled by components:

例如，下列视图都是由组件控制的：

* The app root with the navigation links.

  带有导航链接的应用根组件。

* The list of heroes.

  英雄列表。

* The hero editor.

  英雄编辑器。

You define a component's application logic&mdash;what it does to support the view&mdash;inside a class.
The class interacts with the view through an API of properties and methods.

我们在类中定义组件的应用逻辑，为视图提供支持。
组件通过一些由属性和方法组成的 API 与视图交互。

{@a component-code}

For example, this `HeroListComponent` has a `heroes` property that returns an array of heroes
that it acquires from a service.
`HeroListComponent` also has a `selectHero()` method that sets a `selectedHero` property when the user clicks to choose a hero from that list.

例如，`HeroListComponent`有一个`heroes`属性，它返回一个英雄数组，这个数组从一个服务获得。
`HeroListComponent`还有一个`selectHero()`方法，当用户从列表中点选一个英雄时，就把它/她设置到`selectedHero`属性。

<code-example path="architecture/src/app/hero-list.component.ts" linenums="false" title="src/app/hero-list.component.ts (class)" region="class">

</code-example>


Angular creates, updates, and destroys components as the user moves through the application.
Your app can take action at each moment in this lifecycle through optional [lifecycle hooks](guide/lifecycle-hooks), like `ngOnInit()` declared above.

当用户在这个应用中漫游时， Angular 会创建、更新和销毁组件。
应用可以通过[生命周期钩子](guide/lifecycle-hooks)在组件生命周期的各个时间点上插入自己的操作，例如上面声明的`ngOnInit()`。


<hr/>

## Templates

## 模板


<img src="generated/images/guide/architecture/template.png" alt="模板" class="left">

You define a component's view with its companion **template**. A template is a form of HTML
that tells Angular how to render the component.

我们通过组件的自带的**模板**来定义组件视图。模板以 HTML 形式存在，告诉 Angular 如何渲染组件。

A template looks like regular HTML, except for a few differences. Here is a
template for our `HeroListComponent`:


多数情况下，模板看起来很像标准 HTML，当然也有一点不同的地方。下面是`HeroListComponent`组件的一个模板：

<code-example path="architecture/src/app/hero-list.component.html" title="src/app/hero-list.component.html">

</code-example>


Although this template uses typical HTML elements like `<h2>` and  `<p>`, it also has some differences. Code like `*ngFor`, `{{hero.name}}`, `(click)`, `[hero]`, and `<hero-detail>` uses Angular's [template syntax](guide/template-syntax).

模板除了可以使用像`<h2>`和`<p>`这样的典型的 HTML 元素，还能使用其它元素。
例如，像`*ngFor`、`{{hero.name}}`、`(click)`、`[hero]`和`<hero-detail>`这样的代码使用了 Angular 的[模板语法](guide/template-syntax)。

In the last line of the template, the `<hero-detail>` tag is a custom element that represents a new component, `HeroDetailComponent`.

在模板的最后一行，`<hero-detail>`标签就是一个用来表示新组件`HeroDetailComponent`的自定义元素。

The `HeroDetailComponent` is a *different* component than the `HeroListComponent` you've been reviewing.
The `HeroDetailComponent` (code not shown) presents facts about a particular hero, the
hero that the user selects from the list presented by the `HeroListComponent`.
The `HeroDetailComponent` is a **child** of the `HeroListComponent`.

`HeroDetailComponent`跟以前见到过的`HeroListComponent`是*不同*的组件。
`HeroDetailComponent`（代码未显示）用于展现一个特定英雄的情况，这个英雄是用户从`HeroListComponent`列表中选择的。
`HeroDetailComponent`是`HeroListComponent`的*子组件*。

<img src="generated/images/guide/architecture/component-tree.png" alt="Metadata" class="left">

Notice how `<hero-detail>` rests comfortably among native HTML elements. Custom components mix seamlessly with native HTML in the same layouts.

注意到了吗？`<hero-detail>`舒适地躺在原生 HTML 元素之间。
自定义组件和原生 HTML 在同一布局中融合得天衣无缝。

<hr class="clear"/>

## Metadata

## 元数据


<img src="generated/images/guide/architecture/metadata.png" alt="元数据" class="left">

Metadata tells Angular how to process a class.

<p style="padding-top:10px">元数据告诉 Angular 如何处理一个类。</p>
<br class="clear">

[Looking back at the code](guide/architecture#component-code) for `HeroListComponent`, you can see that it's just a class.
There is no evidence of a framework, no "Angular" in it at all.

[回头看看](guide/architecture#component-code)`HeroListComponent`就会明白：它只是一个类。
一点框架的痕迹也没有，里面完全没有出现 "Angular" 的字样。

In fact, `HeroListComponent` really is *just a class*. It's not a component until you *tell Angular about it*.

实际上，`HeroListComponent`真的*只是一个类*。直到我们*告诉 Angular* 它是一个组件。

To tell Angular that `HeroListComponent` is a component, attach **metadata** to the class.

要告诉 Angular `HeroListComponent`是个组件，只要把**元数据**附加到这个类。

In TypeScript, you attach metadata by using a **decorator**.
Here's some metadata for `HeroListComponent`:


在TypeScript中，我们用**装饰器 (decorator) **来附加元数据。
下面就是`HeroListComponent`的一些元数据。

<code-example path="architecture/src/app/hero-list.component.ts" linenums="false" title="src/app/hero-list.component.ts (metadata)" region="metadata">

</code-example>


Here is the `@Component` decorator, which identifies the class
immediately below it as a component class.

这里看到`@Component`装饰器，它把紧随其后的类标记成了组件类。


The `@Component` decorator takes a required configuration object with the
information Angular needs to create and present the component and its view.

`@Component`装饰器能接受一个配置对象， Angular 会基于这些信息创建和展示组件及其视图。

Here are a few of the most useful `@Component` configuration options:

`@Component`的配置项包括：


* `selector`: CSS selector that tells Angular to create and insert an instance of this component
where it finds a `<hero-list>` tag in *parent* HTML.
For example, if an app's  HTML contains `<hero-list></hero-list>`, then
Angular inserts an instance of the `HeroListComponent` view between those tags.

  `selector`： CSS 选择器，它告诉 Angular 在*父级* HTML 中查找`<hero-list>`标签，创建并插入该组件。
    例如，如果应用的 HTML 包含`<hero-list></hero-list>`， Angular 就会把`HeroListComponent`的一个实例插入到这个标签中。

* `templateUrl`: module-relative address of this component's HTML template, shown [above](guide/architecture#templates).

  `templateUrl`：组件 HTML 模板的模块相对地址，[如前所示](guide/architecture#templates)。


* `providers`: array of **dependency injection providers** for services that the component requires.
This is one way to tell Angular that the component's constructor requires a `HeroService`
so it can get the list of heroes to display.

  `providers` - 组件所需服务的*依赖注入提供商*数组。
这是在告诉 Angular：该组件的构造函数需要一个`HeroService`服务，这样组件就可以从服务中获得英雄数据。

<img src="generated/images/guide/architecture/template-metadata-component.png" alt="Metadata" class="left">

The metadata in the `@Component` tells Angular where to get the major building blocks you specify for the component.

`@Component`里面的元数据会告诉 Angular 从哪里获取你为组件指定的主要的构建块。

The template, metadata, and component together describe a view.

模板、元数据和组件共同描绘出这个视图。

Apply other metadata decorators in a similar fashion to guide Angular behavior.
`@Injectable`, `@Input`, and `@Output` are a few of the more popular decorators.其它元数据装饰器用类似的方式来指导 Angular 的行为。
例如`@Injectable`、`@Input`和`@Output`等是一些最常用的装饰器。<br class="clear">

The architectural takeaway is that you must add metadata to your code
so that Angular knows what to do.

这种架构处理方式是：你向代码中添加元数据，以便 Angular 知道该怎么做。


<hr/>

## Data binding

## 数据绑定

Without a framework, you would be responsible for pushing data values into the HTML controls and turning user responses
into actions and value updates. Writing such push/pull logic by hand is tedious, error-prone, and a nightmare to
read as any experienced jQuery programmer can attest.

如果没有框架，我们就得自己把数据值推送到 HTML 控件中，并把用户的反馈转换成动作和值更新。
如果手工写代码来实现这些推/拉逻辑，肯定会枯燥乏味、容易出错，读起来简直是噩梦 —— 写过 jQuery 的程序员大概都对此深有体会。


<img src="generated/images/guide/architecture/databinding.png" alt="数据绑定" class="left">

Angular supports **data binding**,
a mechanism for coordinating parts of a template with parts of a component.
Add binding markup to the template HTML to tell Angular how to connect both sides.

Angular 支持**数据绑定**，一种让模板的各部分与组件的各部分相互合作的机制。
我们往模板 HTML 中添加绑定标记，来告诉 Angular 如何把二者联系起来。As the diagram shows, there are four forms of data binding syntax. Each form has a direction &mdash; to the DOM, from the DOM, or in both directions.如图所示，数据绑定的语法有四种形式。每种形式都有一个方向 —— 绑定到 DOM 、绑定自 DOM 以及双向绑定。<br class="clear">

The `HeroListComponent` [example](guide/architecture#templates) template has three forms:


`HeroListComponent`[示例](guide/architecture#templates)模板中有三种形式：

<code-example path="architecture/src/app/hero-list.component.1.html" linenums="false" title="src/app/hero-list.component.html (binding)" region="binding">

</code-example>


* The `{{hero.name}}` [*interpolation*](guide/displaying-data#interpolation)
displays the component's `hero.name` property value within the `<li>` element.

  `{{hero.name}}`[*插值表达式*](guide/displaying-data#interpolation)在`<li>`标签中显示组件的`hero.name`属性的值。

* The `[hero]` [*property binding*](guide/template-syntax#property-binding) passes the value of `selectedHero` from
the parent `HeroListComponent` to the `hero` property of the child `HeroDetailComponent`.

  `[hero]`[*属性绑定*](guide/template-syntax#property-binding)把父组件`HeroListComponent`的`selectedHero`的值传到子组件`HeroDetailComponent`的`hero`属性中。

* The `(click)` [*event binding*](guide/user-input#click) calls the component's `selectHero` method when the user clicks a hero's name.

  `(click)` [*事件绑定*](guide/user-input#click)在用户点击英雄的名字时调用组件的`selectHero`方法。

**Two-way data binding** is an important fourth form
that combines property and event binding in a single notation, using the `ngModel` directive.
Here's an example from the `HeroDetailComponent` template:


**双向数据绑定**是重要的第四种绑定形式，它使用`ngModel`指令组合了属性绑定和事件绑定的功能。
下面是`HeroDetailComponent`模板的范例：

<code-example path="architecture/src/app/hero-detail.component.html" linenums="false" title="src/app/hero-detail.component.html (ngModel)" region="ngModel">

</code-example>


In two-way binding, a data property value flows to the input box from the component as with property binding.
The user's changes also flow back to the component, resetting the property to the latest value,
as with event binding.

在双向绑定中，数据属性值通过属性绑定从组件流到输入框。用户的修改通过事件绑定流回组件，把属性值设置为最新的值。

Angular processes *all* data bindings once per JavaScript event cycle,
from the root of the application component tree through all child components.

Angular 在每个 JavaScript 事件循环中处理*所有的*数据绑定，它会从组件树的根部开始，递归处理全部子组件。


<figure>
  <img src="generated/images/guide/architecture/component-databinding.png" alt="数据绑定">
</figure>

Data binding plays an important role in communication between a template and its component.

数据绑定在模板与对应组件的交互中扮演了重要的角色。
<br class="l-clear-both">

<figure>
  <img src="generated/images/guide/architecture/parent-child-binding.png" alt="父/子绑定">
</figure>

Data binding is also important for communication between parent and child components.

数据绑定在父组件与子组件的通讯中也同样重要。

<hr/>

## Directives

## 指令 (directive)


<img src="generated/images/guide/architecture/directive.png" alt="父与子" class="left">

Angular templates are *dynamic*. When Angular renders them, it transforms the DOM
according to the instructions given by **directives**.

Angular 模板是*动态的*。当 Angular 渲染它们时，它会根据**指令**提供的操作对 DOM 进行转换。

A directive is a class with a `@Directive` decorator.
A component is a *directive-with-a-template*;
a `@Component` decorator is actually a `@Directive` decorator extended with template-oriented features.

组件是一个*带模板的指令*；`@Component`装饰器实际上就是一个`@Directive`装饰器，只是扩展了一些面向模板的特性。


<div class="l-sub-section">

  While **a component is technically a directive**,
  components are so distinctive and central to Angular applications that this architectural overview separates components from directives.

虽然**严格来说组件就是一个指令**，但是组件非常独特，并在 Angular 中位于中心地位，所以在架构概览中，我们把组件从指令中独立了出来。


</div>

Two *other* kinds of directives exist: _structural_ and _attribute_ directives.

还有两种*其它*类型的指令：_结构型_指令和_属性 (attribute) 型_指令。

They tend to appear within an element tag as attributes do,
sometimes by name but more often as the target of an assignment or a binding.

它们往往像属性 (attribute) 一样出现在元素标签中，
偶尔会以名字的形式出现，但多数时候还是作为赋值目标或绑定目标出现。

**Structural** directives alter layout by adding, removing, and replacing elements in DOM.

**结构型**指令通过在 DOM 中添加、移除和替换元素来修改布局。

The [example template](guide/architecture#templates) uses two built-in structural directives:


下面的[范例模板](guide/architecture#templates)中用到了两个内置的结构型指令：

<code-example path="architecture/src/app/hero-list.component.1.html" linenums="false" title="src/app/hero-list.component.html (structural)" region="structural">

</code-example>


* [`*ngFor`](guide/displaying-data#ngFor) tells Angular to stamp out one `<li>` per hero in the `heroes` list.

  [`*ngFor`](guide/displaying-data#ngFor)告诉 Angular 为`heroes`列表中的每个英雄生成一个`<li>`标签。

* [`*ngIf`](guide/displaying-data#ngIf) includes the `HeroDetail` component only if a selected hero exists.

  [`*ngIf`](guide/displaying-data#ngIf)表示只有在选择的英雄存在时，才会包含`HeroDetail`组件。


**Attribute** directives alter the appearance or behavior of an existing element.
In templates they look like regular HTML attributes, hence the name.

**属性型** 指令修改一个现有元素的外观或行为。
在模板中，它们看起来就像是标准的 HTML 属性，故名。

The `ngModel` directive, which implements two-way data binding, is
an example of an attribute directive. `ngModel` modifies the behavior of
an existing element (typically an `<input>`)
by setting its display value property and responding to change events.


`ngModel`指令就是属性型指令的一个例子，它实现了双向数据绑定。
`ngModel`修改现有元素（一般是`<input>`）的行为：设置其显示属性值，并响应 change 事件。

<code-example path="architecture/src/app/hero-detail.component.html" linenums="false" title="src/app/hero-detail.component.html (ngModel)" region="ngModel">

</code-example>


Angular has a few more directives that either alter the layout structure
(for example, [ngSwitch](guide/template-syntax#ngSwitch))
or modify aspects of DOM elements and components
(for example, [ngStyle](guide/template-syntax#ngStyle) and [ngClass](guide/template-syntax#ngClass)).

Angular 还有少量指令，它们或者修改结构布局（例如 [ngSwitch](guide/template-syntax#ngSwitch)），
或者修改 DOM 元素和组件的各个方面（例如 [ngStyle](guide/template-syntax#ngStyle)和 [ngClass](guide/template-syntax#ngClass)）。

Of course, you can also write your own directives. Components such as
`HeroListComponent` are one kind of custom directive.

当然，我们也能编写自己的指令。像`HeroListComponent`这样的组件就是一种自定义指令。


<hr/>

## Services

## 服务

<img src="generated/images/guide/architecture/service.png" alt="Service" class="left">

_Service_ is a broad category encompassing any value, function, or feature that your application needs.

*服务*是一个广义范畴，包括：值、函数，或应用所需的特性。

Almost anything can be a service.
A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.

几乎任何东西都可以是一个服务。
典型的服务是一个类，具有专注的、明确的用途。它应该做一件特定的事情，并把它做好。

<br class="clear">

Examples include:

例如：

* logging service

  日志服务

* data service

  数据服务

* message bus

  消息总线

* tax calculator

  税款计算器

* application configuration

  应用程序配置

There is nothing specifically _Angular_ about services. Angular has no definition of a service.
There is no service base class, and no place to register a service.

服务没有什么特别属于 *Angular* 的特性。 Angular 对于服务也没有什么定义。
它甚至都没有定义服务的基类，也没有地方注册一个服务。

Yet services are fundamental to any Angular application. Components are big consumers of services.

即便如此，服务仍然是任何 Angular 应用的基础。组件就是最大的*服务*消费者。

Here's an example of a service class that logs to the browser console:


下面是一个服务类的范例，用于把日志记录到浏览器的控制台：

<code-example path="architecture/src/app/logger.service.ts" linenums="false" title="src/app/logger.service.ts (class)" region="class">

</code-example>


Here's a `HeroService` that uses a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to fetch heroes.
The `HeroService` depends on the `Logger` service and another `BackendService` that handles the server communication grunt work.


下面是`HeroService`类，用于获取英雄数据，并通过一个已解析的[承诺 (Promise)](http://exploringjs.com/es6/ch_promises.html) 返回它们。
`HeroService`还依赖于`Logger`服务和另一个用于处理服务器通讯的`BackendService`服务。

<code-example path="architecture/src/app/hero.service.ts" linenums="false" title="src/app/hero.service.ts (class)" region="class">

</code-example>


Services are everywhere.

服务无处不在。

Component classes should be lean. They don't fetch data from the server,
validate user input, or log directly to the console.
They delegate such tasks to services.

组件类应保持精简。组件本身不从服务器获得数据、不进行验证输入，也不直接往控制台写日志。
它们把这些任务委托给服务。

A component's job is to enable the user experience and nothing more. It mediates between the view (rendered by the template)
and the application logic (which often includes some notion of a _model_).
A good component presents properties and methods for data binding.
It delegates everything nontrivial to services.

组件的任务就是提供用户体验，仅此而已。它介于视图（由模板渲染）和应用逻辑（通常包括_模型_的某些概念）之间。
设计良好的组件为数据绑定提供属性和方法，把其它琐事都委托给服务。

Angular doesn't *enforce* these principles.
It won't complain if you write a "kitchen sink" component with 3000 lines.

Angular 不会*强制要求*我们遵循这些原则。
即使我们花 3000 行代码写了一个“厨房洗碗槽”组件，它也不会抱怨什么。

Angular does help you *follow* these principles by making it easy to factor your
application logic into services and make those services available to components through *dependency injection*.

Angular 帮助我们*遵循*这些原则 —— 它让我们能轻易地把应用逻辑拆分到服务，并通过*依赖注入*来在组件中使用这些服务。


<hr/>

## Dependency injection

## 依赖注入

<img src="generated/images/guide/architecture/dependency-injection.png" alt="Service" class="left">

_Dependency injection_ is a way to supply a new instance of a class
with the fully-formed dependencies it requires. Most dependencies are services.
Angular uses dependency injection to provide new components with the services they need.

“依赖注入”是提供类的新实例的一种方式，还负责处理好类所需的全部依赖。大多数依赖都是服务。
Angular 使用依赖注入来提供新组件以及组件所需的服务。<br class="clear">

Angular can tell which services a component needs by looking at the types of its constructor parameters.
For example, the constructor of your `HeroListComponent` needs a `HeroService`:

Angular 通过查看构造函数的参数类型得知组件需要哪些服务。
例如，`HeroListComponent`组件的构造函数需要一个`HeroService`服务：


<code-example path="architecture/src/app/hero-list.component.ts" linenums="false" title="src/app/hero-list.component.ts (constructor)" region="ctor"></code-example>

When Angular creates a component, it first asks an **injector** for
the services that the component requires.

当 Angular 创建组件时，会首先为组件所需的服务请求一个**注入器 (injector)**。

An injector maintains a container of service instances that it has previously created.
If a requested service instance is not in the container, the injector makes one and adds it to the container
before returning the service to Angular.
When all requested services have been resolved and returned,
Angular can call the component's constructor with those services as arguments.
This is *dependency injection*.

注入器维护了一个服务实例的容器，存放着以前创建的实例。
如果所请求的服务实例不在容器中，注入器就会创建一个服务实例，并且添加到容器中，然后把这个服务返回给 Angular。
当所有请求的服务都被解析完并返回时，Angular 会以这些服务为参数去调用组件的构造函数。
这就是*依赖注入* 。

The process of `HeroService` injection looks a bit like this:

`HeroService`注入的过程差不多是这样的：


<figure>
  <img src="generated/images/guide/architecture/injector-injects.png" alt="服务">
</figure>

If the injector doesn't have a `HeroService`, how does it know how to make one?

如果注入器还没有`HeroService`，它怎么知道该如何创建一个呢？

In brief, you must have previously registered a **provider** of the `HeroService` with the injector.
A provider is something that can create or return a service, typically the service class itself.

简单点说，我们必须先用注入器（injector）为`HeroService`注册一个**提供商（provider）**。
提供商用来创建或返回服务，通常就是这个服务类本身（相当于`new HeroService()`）。



You can register providers in modules or in components.

我们可以在模块中或组件中注册提供商。

In general, add providers to the [root module](guide/architecture#modules) so that
the same instance of a service is available everywhere.


但通常会把提供商添加到[根模块](guide/architecture#modules)上，以便在任何地方都使用服务的同一个实例。

<code-example path="architecture/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts (module providers)" region="providers">

</code-example>


Alternatively, register at a component level in the `providers` property of the `@Component` metadata:


或者，也可以在`@Component`元数据中的`providers`属性中把它注册在组件层：

<code-example path="architecture/src/app/hero-list.component.ts" linenums="false" title="src/app/hero-list.component.ts (component providers)" region="providers">

</code-example>


Registering at a component level means you get a new instance of the
service with each new instance of that component.

把它注册在组件级表示该组件的每一个新实例都会有一个服务的新实例。

<!-- We've vastly oversimplified dependency injection for this overview.
The full story is in the [dependency injection](guide/dependency-injection) page. -->

<!--在这个概览中，我们过度简化了依赖注入机制。
详见[依赖注入](guide/dependency-injection)页 -->

Points to remember about dependency injection:

需要记住的关于依赖注入的要点是：

* Dependency injection is wired into the Angular framework and used everywhere.

  依赖注入渗透在整个 Angular 框架中，被到处使用。

* The *injector* is the main mechanism.

  **注入器 (injector)** 是本机制的核心。

  * An injector maintains a *container* of service instances that it created.

    注入器负责维护一个*容器*，用于存放它创建过的服务实例。

  * An injector can create a new service instance from a *provider*.

    注入器能使用*提供商*创建一个新的服务实例。

* A *provider* is a recipe for creating a service.

  *提供商*是一个用于创建服务的配方。

* Register *providers* with injectors.

  把*提供商*注册到注入器。


<hr/>

## Wrap up

## 总结

You've learned the basics about the eight main building blocks of an Angular application:

我们学到的这些只是关于 Angular 应用程序的八个主要构造块的基础知识：

* [Modules](guide/architecture#modules)

  [模块](guide/architecture#modules)

* [Components](guide/architecture#components)

  [组件](guide/architecture#components)

* [Templates](guide/architecture#templates)

  [模板](guide/architecture#templates)

* [Metadata](guide/architecture#metadata)

  [元数据](guide/architecture#metadata)

* [Data binding](guide/architecture#data-binding)

  [数据绑定](guide/architecture#data-binding)

* [Directives](guide/architecture#directives)

  [指令](guide/architecture#directives)

* [Services](guide/architecture#services)

  [服务](guide/architecture#services)

* [Dependency injection](guide/architecture#dependency-injection)

  [依赖注入](guide/architecture#dependency-injection)

That's a foundation for everything else in an Angular application,
and it's more than enough to get going.
But it doesn't include everything you need to know.

这是 Angular 应用程序中所有其它东西的基础，要使用 Angular，以这些作为开端就绰绰有余了。
但它仍然没有包含我们需要知道的全部。

Here is a brief, alphabetical list of other important Angular features and services.
Most of them are covered in this documentation (or soon will be).

这里是一个简短的、按字母排序的列表，列出了其它重要的 Angular 特性和服务。
它们大多数已经（或即将）包括在这份开发文档中：

> [**Animations**](guide/animations): Animate component behavior
without deep knowledge of animation techniques or CSS with Angular's animation library.

> [**动画**](guide/animations)：用 Angular 的动画库让组件动起来，而不需要对动画技术或 CSS 有深入的了解。

> **Change detection**: The change detection documentation will cover how Angular decides that a component property value has changed,
when to update the screen, and how it uses **zones** to intercept asynchronous activity and run its change detection strategies.

> **变更检测**：变更检测文档会告诉你 Angular 是如何决定组件的属性值变化，什么时候该更新到屏幕，
以及它是如何利用**区域 (zone)** 来拦截异步活动并执行变更检测策略。

> **Events**: The events documentation will cover how to use components and services to raise events with mechanisms for
publishing and subscribing to events.

> **事件**：事件文档会告诉你如何使用组件和服务触发支持发布和订阅的事件。

> [**Forms**](guide/forms): Support complex data entry scenarios with HTML-based validation and dirty checking.

> [**表单**](guide/forms)：通过基于 HTML 的验证和脏检查机制支持复杂的数据输入场景。

> [**HTTP**](guide/http): Communicate with a server to get data, save data, and invoke server-side actions with an HTTP client.

> [**HTTP**](guide/http)：通过 HTTP 客户端，可以与服务器通讯，以获得数据、保存数据和触发服务端动作。

> [**Lifecycle hooks**](guide/lifecycle-hooks): Tap into key moments in the lifetime of a component, from its creation to its destruction,
by implementing the lifecycle hook interfaces.

> [**生命周期钩子**](guide/lifecycle-hooks)：通过实现生命周期钩子接口，可以切入组件生命中的几个关键点：从创建到销毁。

> [**Pipes**](guide/pipes): Use pipes in your templates to improve the user experience by transforming values for display. Consider this `currency` pipe expression:

> [**管道**](guide/pipes)：在模板中使用管道转换成用于显示的值，以增强用户体验。例如，`currency`管道表达式：

>> `price | currency:'USD':true`

> It displays a price of 42.33 as `$42.33`.

> 它把价格“42.33”显示为`$42.33`。

> [**Router**](guide/router): Navigate from page to page within the client
  application and never leave the browser.
  
> [**路由器**](guide/router)：在应用程序客户端的页面间导航，并且不离开浏览器。

> [**Testing**](guide/testing): Run unit tests on your application parts as they interact with the Angular framework
using the _Angular Testing Platform_.

> [**测试**](guide/testing)：使用 _Angular 测试平台_，在你的应用部件与 Angular 框架交互时进行单元测试。
