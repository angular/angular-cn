# Angular Glossary

# Angular 词汇表

Angular has its own vocabulary.
Most Angular terms are common English words
with a specific meaning within the Angular system.

Angular 有自己的词汇表。
虽然大多数 Angular 短语都是日常用语，但是在 Angular 体系中，它们有特别的含义。

This glossary lists the most prominent terms
and a few less familiar ones that have unusual or
unexpected definitions.

本词汇表列出了常用术语和少量具有独特或反直觉含义的罕用术语。

[A](guide/glossary#A) [B](guide/glossary#B) [C](guide/glossary#C) [D](guide/glossary#D) [E](guide/glossary#E) [F](guide/glossary#F) [G](guide/glossary#G) [H](guide/glossary#H) [I](guide/glossary#I)
[J](guide/glossary#J) [K](guide/glossary#K) [L](guide/glossary#L) [M](guide/glossary#M) [N](guide/glossary#N) [O](guide/glossary#O) [P](guide/glossary#P) [Q](guide/glossary#Q) [R](guide/glossary#R)
[S](guide/glossary#S) [T](guide/glossary#T) [U](guide/glossary#U) [V](guide/glossary#V) [W](guide/glossary#W) [X](guide/glossary#X) [Y](guide/glossary#Y) [Z](guide/glossary#Z)

{@a A}

{@a aot}

## Ahead-of-time (AOT) compilation

## 预 (ahead-of-time, AOT) 编译

You can compile Angular applications at build time.
By compiling your application using the compiler-cli, `ngc`, you can bootstrap directly to a module factory, meaning you don't need to include the Angular compiler in your JavaScript bundle.
Ahead-of-time compiled applications also benefit from decreased load time and increased performance.

开发者可以在构造时 (build-time) 编译 Angular 应用程序。
  通过 `compiler-cli` - `ngc` 编译应用程序，应用可以从一个模块工厂直接启动，
  意味着不再需要把 Angular 编译器添加到 JavaScript 包中。
  预编译的应用程序加载迅速，具有更高的性能。

## Annotation

## 注解

In practice, a synonym for [Decoration](guide/glossary#decorator).

实际上，是[装饰 (decoration)](guide/glossary#decorator) 的同义词。

{@a attribute-directive}

{@a attribute-directives}

## Attribute directives

## 属性型指令

A category of [directive](guide/glossary#directive) that can listen to and modify the behavior of
other HTML elements, attributes, properties, and components. They are usually represented
as HTML attributes, hence the name.

[指令 (directive)](guide/glossary#directive)的一种。可以监听或修改其它 HTML 元素、特性 (attribute)、属性 (property)、组件的行为。通常用作 HTML 属性，就像它的名字所暗示的那样。

For example, you can use the `ngClass` directive to add and remove CSS class names.

例如，`ngClass` 指令就是典型的属性型指令。它可以添加或移除 CSS 类名。

Learn about them in the [_Attribute Directives_](guide/attribute-directives) guide.

要了解更多信息，请参见[*属性型指令*](guide/attribute-directives)页。

{@a B}

## Barrel

## 封装桶

A way to *roll up exports* from several ES2015 modules into a single convenient ES2015 module.
The barrel itself is an ES2015 module file that re-exports *selected* exports of other ES2015 modules.

封装桶是把多个模块的*导出结果*汇总到单一的 ES2015 模块的一种方式。
      封装桶本身是一个 ES2015 模块文件，它重新导出*选中的*导出，这些导入来自其它 ES2015 模块。

For example, imagine three ES2015 modules in a `heroes` folder:

例如，设想在 `heroes` 目录下有三个 ES2015 模块：

<code-example>
  // heroes/hero.component.ts
  export class HeroComponent {}

  // heroes/hero.model.ts
  export class Hero {}

  // heroes/hero.service.ts
  export class HeroService {}
</code-example>

Without a barrel, a consumer needs three import statements:

如果没有封装桶，消费者需要三条导入语句：

<code-example>
  import { HeroComponent } from '../heroes/hero.component.ts';
  import { Hero }          from '../heroes/hero.model.ts';
  import { HeroService }   from '../heroes/hero.service.ts';
</code-example>

You can add a barrel to the `heroes` folder (called `index`, by convention) that exports all of these items:

在 `heroes` 目录下添加一个封装桶（按约定叫做 `index`），它导出所有这三项：

<code-example>
  export * from './hero.model.ts';   // re-export all of its exports
  export * from './hero.service.ts'; // re-export all of its exports
  export { HeroComponent } from './hero.component.ts'; // re-export the named thing
</code-example>

Now a consumer can import what it needs from the barrel.

现在，消费者就就可以从这个封装桶中导入它需要的东西了。

<code-example>
  import { Hero, HeroService } from '../heroes'; // index is implied
</code-example>

The Angular [scoped packages](guide/glossary#scoped-package) each have a barrel named `index`.

Angular 的每个[范围化包 (scoped package)](guide/glossary#scoped-package) 都有一个名为 `index` 的封装桶。

<div class="alert is-important">

You can often achieve the same result using [NgModules](guide/glossary#ngmodule) instead.

注意，你可以利用 [Angular 模块](guide/glossary#ngmodule)达到同样的目的。

</div>

## Binding

## 绑定 (binding)

Usually refers to [data binding](guide/glossary#data-binding) and the act of
binding an HTML object property to a data object property.

几乎都是指的[数据绑定 (data binding)](guide/glossary#data-binding) 和将 HTML 对象属性绑定到数据对象属性的行为。

Sometimes refers to a [dependency-injection](guide/glossary#dependency-injection) binding
between a "token"&mdash;also referred to as a "key"&mdash;and a dependency [provider](guide/glossary#provider).

有时也会指在“令牌”（也称为键）和依赖[提供商 (provider)](guide/glossary#provider)
之间的[依赖注入 (dependency injection)](guide/glossary#dependency-injection) 绑定。
这种用法很少，而且一般都会在上下文中写清楚。

## Bootstrap

## 启动/引导 (bootstrap)

You launch an Angular application by "bootstrapping" it using the application root NgModule (`AppModule`).

通过应用程序根 Angular 模块(`AppModule`)来启动 Angular 应用程序。

Bootstrapping identifies an application's top level "root" [component](guide/glossary#component),
which is the first component that is loaded for the application.

启动过程标识应用的顶级“根”[组件 (component)](guide/glossary#component)，也就是应用加载的第一个组件。

You can bootstrap multiple apps in the same `index.html`, each app with its own top-level root.

你可以在同一个 `index.html` 中引导多个应用，每个应用都有它自己的顶级根组件。

{@a C}

## camelCase

## 驼峰式命名法 (camelCase)

The practice of writing compound words or phrases such that each word or abbreviation begins with a capital letter
_except the first letter, which is lowercase_.

驼峰式命名法是书写复合词或短语的一种形式，除首字母要小写外，每个单词或缩写都以大写字母开头。

Function, property, and method names are typically spelled in camelCase. For example, `square`, `firstName`, and `getHeroes`. Notice that `square` is an example of how you write a single word in camelCase.

通常，函数、属性和方法命名使用驼峰式拼写法。例如，`square`, `firstName` 和 `getHeroes`。注意这里的 `square` 是如何用驼峰式命名法表示单一词的例子。

camelCase is also known as *lower camel case* to distinguish it from *upper camel case*, or [PascalCase](guide/glossary#pascalcase).
In Angular documentation, "camelCase" always means *lower camel case*.

这种形式也叫做**小写驼峰式命名法 (lower camel case)**，以区分于**大写驼峰式命名法**，也称 [Pascal 命名法 (PascalCase)](guide/glossary#pascalcase)。
Angular 文档中提到“驼峰式命名法 (camelCase) ”的时候，所指的都是小驼峰命名法。

## CLI

The Angular CLI is a `command line interface` tool that can create a project, add files, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

Angular CLI 是个命令行接口（Command Line Interface）工具，它可以创建项目、添加文件以及执行各种正在进行的开发任务，比如测试、打包和部署。

Learn more in the [Getting Started](guide/quickstart) guide.

要了解更多，参见[快速起步](guide/quickstart)。

{@a component}

## Component

## 组件 (component)

An Angular class responsible for exposing data to a [view](guide/glossary#view) and handling most of the view’s display and user-interaction logic.

组件是一个 Angular 类，用于把数据展示到[视图 (view)](guide/glossary#view)，并处理几乎所有的视图显示和交互逻辑。

The *component* is one of the most important building blocks in the Angular system.
It is, in fact, an Angular [directive](guide/glossary#directive) with a companion [template](guide/glossary#template).

*组件*是 Angular 系统中最重要的基本构造块之一。
它其实是一个拥有[模板 (template)](guide/glossary#template)的[指令 (directive)](guide/glossary#directive)。

Apply the `@Component` [decorator](guide/glossary#decorator) to
the component class, thereby attaching to the class the essential component metadata
that Angular needs to create a component instance and render the component with its template
as a view.

需要将 `#@Component`[装饰器](guide/glossary#decorator)应用到一个组件类，从而把必要的组件元数据附加到类上。
Angular 会需要元数据来创建一个组件实例，并把组件的模板作为视图渲染出来。

Those familiar with "MVC" and "MVVM" patterns will recognize
the component in the role of "controller" or "view model".

如果你熟悉 "MVC" 和 "MVVM" 模式，就会意识到组件充当了“控制器 (controller) ”和“视图模型 (view model) ”的角色。

{@a D}

## dash-case

## 中线命名法 (dash-case)

The practice of writing compound words or phrases such that each word is separated by a dash or hyphen (`-`).
This form is also known as kebab-case.

中线命名法是书写复合词或短语的一种形式，使用中线 (`-`) 分隔每个单词。
这种形式也称为烤串命名法 kebab-case。

[Directive](guide/glossary#directive) selectors (like `my-app`) and
the root of filenames (such as `hero-list.component.ts`) are often
spelled in dash-case.

[指令](guide/glossary#directive)的选择器（例如 `my-app`）和文件名（例如 `hero-list.component.ts`）通常是用中线命名法来命名。

## Data binding

## 数据绑定 (data binding)

Applications display data values to a user and respond to user
actions (such as clicks, touches, and keystrokes).

应用程序会将数据展示给用户，并对用户的操作（点击、触屏、按键）做出回应。

In data binding, you declare the relationship between an HTML widget and data source
and let the framework handle the details.
Data binding is an alternative to manually pushing application data values into HTML, attaching
event listeners, pulling changed values from the screen, and
updating application data values.

在数据绑定机制下，你只要声明一下 HTML 部件和数据源之间的关系，把细节交给框架去处理。
而以前的手动操作过程是：将数据推送到 HTML 页面中、添加事件监听器、从屏幕获取变化后的数据，并更新应用中的值。

Angular has a rich data-binding framework with a variety of data-binding
operations and supporting declaration syntax.

Angular 有一个非常强大的数据绑定框架，具有各种数据绑定操作，并支持声明式语法。

 Read about the following forms of binding in the [Template Syntax](guide/template-syntax) page:

 更多的绑定形式，见[模板语法](guide/template-syntax)：

 * [Interpolation](guide/template-syntax#interpolation).

    [插值表达式 (interpolation)](guide/template-syntax#interpolation)。

 * [Property binding](guide/template-syntax#property-binding).

    [property 绑定 (property binding)](guide/template-syntax#property-binding)。

 * [Event binding](guide/template-syntax#event-binding).

    [事件绑定 (event binding)](guide/template-syntax#event-binding)。

 * [Attribute binding](guide/template-syntax#attribute-binding).

    [attribute 绑定 (attribute binding)](guide/template-syntax#attribute-binding)。

 * [Class binding](guide/template-syntax#class-binding).

    [CSS 类绑定 (class binding)](guide/template-syntax#class-binding)。

 * [Style binding](guide/template-syntax#style-binding).

    [样式绑定 (style binding)](guide/template-syntax#style-binding)。

 * [Two-way data binding with ngModel](guide/template-syntax#ngModel).

    [基于 ngModel 的双向数据绑定 (Two-way data binding with ngModel)](guide/template-syntax#ngModel)。

{@a decorator}

{@a decoration}

## Decorator | decoration

## 装饰器（decorator | decoration）

A *function* that adds metadata to a class, its members (properties, methods) and function arguments.

装饰器是一个**函数**，它将元数据添加到类、类成员（属性、方法）和函数参数。

Decorators are an experimental (stage 2), JavaScript language [feature](https://github.com/wycats/javascript-decorators). TypeScript adds support for decorators.

装饰器是一个 JavaScript 的语言[特性](https://github.com/wycats/javascript-decorators)，装饰器在 TypeScript 里已经实现，并被推荐到了 ES2016（也就是 ES7）。

To apply a decorator, position it immediately above or to the left of the item it decorates.

要想应用装饰器，把它放到被装饰对象的上面或左边。

Angular has its own set of decorators to help it interoperate with your application parts.
The following example is a `@Component` decorator that identifies a
class as an Angular [component](guide/glossary#component) and an `@Input` decorator applied to the `name` property
of that component. The elided object argument to the `@Component` decorator would contain the pertinent component metadata.

Angular 使用自己的一套装饰器来实现应用程序各部件之间的相互操作。
下面的例子中使用了 `@Component` 装饰器来将一个类标记为 Angular [组件 (component)](guide/glossary#component)，
并将 `@Input` 装饰器来应用到组件的 `name` 属性。
`@Component` 装饰器中省略的参数对象会包含与组件有关的元数据。

```

@Component({...})
export class AppComponent {
  constructor(@Inject('SpecialFoo') public foo:Foo) {}
  @Input() name:string;
}

```

The scope of a decorator is limited to the language feature
that it decorates. None of the decorations shown here will "leak" to other
classes that follow it in the file.

装饰器的作用域会被限制在它所装饰的语言特性。
在同一文件中，装饰器不会“泄露”到它后面的其它类。

<div class="alert is-important">

Always include parentheses `()` when applying a decorator.

永远别忘了在装饰器后面加括号 `()`。

</div>

## Dependency injection

## 依赖注入（dependency injection）

A design pattern and mechanism
for creating and delivering parts of an application to other
parts of an application that request them.

依赖注入既是设计模式，同时又是一种机制：当应用程序的一些部件需要另一些部件时，
利用依赖注入来创建被请求的部件，并将它们注入到发出请求的部件中。

Angular developers prefer to build applications by defining many simple parts
that each do one thing well and then wiring them together at runtime.

Angular 开发者构建应用程序时的首选方法是：定义许多简单部件，
每个部件只做一件事并做好它，然后在运行时把它们装配在一起组成应用程序。

These parts often rely on other parts. An Angular [component](guide/glossary#component)
part might rely on a service part to get data or perform a calculation. When
part "A" relies on another part "B," you say that "A" depends on "B" and
that "B" is a dependency of "A."

这些部件通常会依赖其它部件。一个 Angular [组件 (component)](guide/glossary#component)
可能依赖一个服务部件来获取数据或执行运算。
如果部件 “A” 要靠另一个部件 “B” 才能工作，你就会说 “A” 依赖 “B” ，“B” 是 “A” 的依赖。

You can ask a "dependency injection system" to create "A"
for us and handle all the dependencies.
If "A" needs "B" and "B" needs "C," the system resolves that chain of dependencies
and returns a fully prepared instance of "A."

你可以要求“依赖注入系统”创建 “A” 并处理所有依赖。如果 “A” 需要 “B” ，“B” 需要 “C ”，
系统将解析这个依赖链，返回一个完全准备好的 “A” 实例。

Angular provides and relies upon its own sophisticated
dependency-injection system
to assemble and run applications by "injecting" application parts
into other application parts where and when needed.

Angular 提供并使用自己精心设计的[依赖注入 (dependency injection)](guide/dependency-injection)系统来组装和运行应用程序，在需要的地方和时刻，将一些部件“注入”到另一些部件里面。

At the core, an [`injector`](guide/glossary#injector) returns dependency values on request.
The expression `injector.get(token)` returns the value associated with the given token.

在 Angular 内核中有一个[注入器 (injector)](guide/glossary#injector)，当请求时返回依赖值。
表达式 `injector.get(token)` 返回与该 token（令牌）参数相关的值。

A token is an Angular type (`InjectionToken`). You rarely need to work with tokens directly; most
methods accept a class name (`Foo`) or a string ("foo") and Angular converts it
to a token. When you write `injector.get(Foo)`, the injector returns
the value associated with the token for the `Foo` class, typically an instance of `Foo` itself.

令牌是一个 Angular 中的类型 (`InjectionToken`)。你很少直接处理令牌。
绝大多数方法都接受类名 (`Foo`) 或字符串 ("foo")， Angular 会把这些类名称和字符串转换成令牌。
当调用 `injector.get(Foo)` 时，注入器返回用 `Foo` 类生成的令牌所对应的依赖值，该依赖值通常是 `Foo` 类的实例。

During many of its operations, Angular makes similar requests internally, such as when it creates a [`component`](guide/glossary#component) for display.

Angular 在内部执行很多类似的依赖注入请求，例如，在创建用于显示的[组件 (component)](guide/glossary#component)。

The `Injector` maintains an internal map of tokens to dependency values.
If the `Injector` can't find a value for a given token, it creates
a new value using a `Provider` for that token.

注入器 (`Injector`) 维护一个令牌到依赖值的映射表。
如果注入器找不到给定令牌对应的依赖值，它会使用提供商 (`Provider`) 创建一个依赖值。

A [provider](guide/glossary#provider) is a recipe for
creating new instances of a dependency value associated with a particular token.

[提供商 (provider)](guide/glossary#provider)是一个“菜谱”，用于创建特定令牌对应的依赖实例。

An injector can only create a value for a given token if it has
a `provider` for that token in its internal provider registry.
Registering providers is a critical preparatory step.

只有当注入器内部提供商注册表中存在与令牌对应的提供商时，
注入器才能为这个令牌创建一个依赖值。所以注册提供商是一个非常关键的准备步骤。

Angular registers some of its own providers with every injector.
You can register your own providers.

Angular 会为每个注册器注册很多内置提供商。
你也可以注册自己的提供商。

Read more in the [Dependency Injection](guide/dependency-injection) page.

更多信息，参见[依赖注入 (dependency injection)](guide/dependency-injection)。

{@a directive}

{@a directives}

## Directive

## 指令 (directive)

An Angular class responsible for creating, reshaping, and interacting with HTML elements
in the browser DOM. The directive is Angular's most fundamental feature.

指令是一个 Angular 类，负责创建和重塑浏览器 DOM 中的 HTML 元素，并与之互动。
指令是 Angular 中最基本的特性之一。

A directive is usually associated with an HTML element or attribute.
This element or attribute is often referred to as the directive itself.

指令几乎总与 HTML 元素或属性 (attribute) 相关。
通常把这些关联到的 HTML 元素或者属性 (attribute) 当做指令本身。

When Angular finds a directive in an HTML template,
it creates the matching directive class instance
and gives the instance control over that portion of the browser DOM.

当 Angular 在 HTML 模板中遇到一个指令的时候，
它会创建匹配的指令类的实例，并把浏览器中这部分 DOM 的控制权交给它。

You can invent custom HTML markup (for example, `<my-directive>`) to
associate with your custom directives. You add this custom markup to HTML templates
as if you were writing native HTML. In this way, directives become extensions of
HTML itself.

你可以自定义 HTML 标签（例如 `<my-directive>`）来关联自定义指令。
然后，可以像写原生 HTML 一样把这些自定义标签放到 HTML 模板里。
这样，指令就变成了 HTML 本身的拓展。

Directives fall into one of the following categories:

指令分为三类：

* [Components](guide/glossary#component) combine application logic with an HTML template to
render application [views](guide/glossary#view). Components are usually represented as HTML elements.
They are the building blocks of an Angular application.

   [组件 (component)](guide/glossary#component): 用于组合程序逻辑和 HTML 模板，渲染出应用程序的[视图](guide/glossary#view)。
  组件一般表示成 HTML 元素的形式，它们是构建 Angular 应用程序的基本单元。

* [Attribute directives](guide/glossary#attribute-directive) can listen to and modify the behavior of
other HTML elements, attributes, properties, and components. They are usually represented
as HTML attributes, hence the name.

   [属性型指令 (attribute directive)](guide/glossary#attribute-directive)：可以监控和修改其它 HTML 元素、 
  HTML 属性 (attribute)、 DOM 属性 (property)、组件等行为等等。它们通常表示为 HTML 属性 (attibute)，故名。

* [Structural directives](guide/glossary#structural-directive) are responsible for
shaping or reshaping HTML layout, typically by adding, removing, or manipulating
elements and their children.

   [结构型指令 (structural directive)](guide/glossary#structural-directive)：负责塑造或重塑 HTML
布局。这一般是通过添加、删除或者操作 HTML 元素及其子元素来实现的。

{@a E}

## ECMAScript

## ECMAScript 语言

The [official JavaScript language specification](https://en.wikipedia.org/wiki/ECMAScript).

[官方 JavaScript 语言规范](https://en.wikipedia.org/wiki/ECMAScript)

The latest approved version of JavaScript is
[ECMAScript 2017](http://www.ecma-international.org/ecma-262/8.0/)
(also known as "ES2017" or "ES8"). Many Angular developers write their applications
in ES8 or a dialect that strives to be
compatible with it, such as [TypeScript](guide/glossary#typescript).

最新批准的 JavaScript 版本是[ECMAScript 2016](http://www.ecma-international.org/ecma-262/7.0/)（也称“ES2016”或“ES7”）。
Angular 的开发人员要么使用这个版本的语言，要么使用与之兼容的方言，例如 [TypeScript](guide/glossary#typescript)。

Most modern browsers only support the much older "ECMAScript 5" (also known as "ES5") standard.
Applications written in ES2017, ES2016, ES2015, or one of their dialects must be [transpiled](guide/glossary#transpile)
to ES5 JavaScript.

目前，几乎所有现代游览器只支持很老的“ECMAScript 5” （也称 ES5）标准。
使用 ES2016、ES2015 或者其它方言开发的应用程序，必须“[转译 (transpile)](guide/glossary#transpile)”成 ES5 JavaScript。

Angular developers can write in ES5 directly.

Angular 的开发人员也可以选择直接使用 ES5 编程。

## ES2015

## ES2015 语言

Short hand for [ECMAScript](guide/glossary#ecmascript) 2015.

[ECMAScript](guide/glossary#ecmascript) 2015 的简写。

## ES5

## ES5 语言

Short hand for [ECMAScript](guide/glossary#ecmascript) 5, the version of JavaScript run by most modern browsers.

“[ECMAScript](guide/glossary#ecmascript) 5”的简写，大部分现代浏览器使用的 JavaScript 版本。

## ES6

## ES6 语言

Short hand for [ECMAScript](guide/glossary#ecmascript) 2015.

[ECMAScript](guide/glossary#ecmascript) 2015 的简写。

{@a F}

{@a G}

{@a H}

{@a I}

## Injector

## 注入器 (injector)

An object in the Angular [dependency-injection system](guide/glossary#dependency-injection)
that can find a named dependency in its cache or create a dependency
with a registered [provider](guide/glossary#provider).

Angular [依赖注入系统 (Dependency Injection System)](guide/glossary#dependency-injection)中的一个对象，
它可以在自己的缓存中找到一个命名的“依赖”或者利用已注册的[提供商 (provider)](guide/glossary#provider) 创建这样一个依赖。

## Input

## 输入属性 (input)

A directive property that can be the *target* of a
[property binding](guide/template-syntax#property-binding) (explained in detail in the [Template Syntax](guide/template-syntax) page).
Data values flow *into* this property from the data source identified
in the template expression to the right of the equal sign.

输入属性是一个指令属性，可以作为[属性绑定 (property binding)](guide/template-syntax#property-binding)（详情参见[模板语法](guide/template-syntax)页）的目标。
数据值会从模板表达式等号右侧的数据源流入这个属性。

See the [Input and output properties](guide/template-syntax#inputs-outputs) section of the [Template Syntax](guide/template-syntax) page.

参见[模板语法](guide/template-syntax)中的[输入与输出属性](guide/template-syntax#inputs-outputs)部分。

## Interpolation

## 插值表达式 (interpolation)

A form of [property data binding](guide/glossary#data-binding) in which a
[template expression](guide/glossary#template-expression) between double-curly braces
renders as text.  That text may be concatenated with neighboring text
before it is assigned to an element property
or displayed between element tags, as in this example.

[属性数据绑定 (property data binding)](guide/glossary#data-binding) 的一种形式，位于双大括号中的[模板表达式 (template expression)](guide/glossary#template-expression)会被渲染成文本。
在被赋值给元素属性或者显示在元素标签中之前，这些文本可能会先与周边的文本合并，参见下面的例子。

<code-example language="html" escape="html">
  <label>My current hero is {{hero.name}}</label>

</code-example>

Read more about [interpolation](guide/template-syntax#interpolation) in the
[Template Syntax](guide/template-syntax) page.

更多信息，见[模板语法](guide/template-syntax)中的[插值表达式](guide/template-syntax#interpolation)。

{@a J}

{@a jit}

## Just-in-time (JIT) compilation

## 即时 (just-in-time, JIT) 编译

A bootstrapping method of compiling components and modules in the browser
and launching the application dynamically. Just-in-time mode is a good choice during development.
Consider using the [ahead-of-time](guide/glossary#aot) mode for production apps.

Angular 的即时编译在浏览器中启动并编译所有的组件和模块，动态运行应用程序。
  它很适合在开发过程中使用。但是在产品发布时，推荐采用[预编译 (ahead-of-time)](guide/glossary#aot) 模式。

{@a K}

## kebab-case

## 烤串命名法 (kebab-case)

See [dash-case](guide/glossary#dash-case).

见[中线命名法 (dash-case)](guide/glossary#dash-case)。

{@a L}

## Lifecycle hooks

## 生命周期钩子

[Directives](guide/glossary#directive) and [components](guide/glossary#component) have a lifecycle
managed by Angular as it creates, updates, and destroys them.

[指令 (directive)](guide/glossary#directive) 和[组件 (component)](guide/glossary#component) 具有生命周期，由 Angular 在创建、更新和销毁它们的过程中进行管理。

You can tap into key moments in that lifecycle by implementing
one or more of the lifecycle hook interfaces.

你可以通过实现一个或多个生命周期钩子接口，切入到生命周期中的关键时间点。

Each interface has a single hook method whose name is the interface name prefixed with `ng`.
For example, the `OnInit` interface has a hook method named `ngOnInit`.

每个接口只有一个钩子方法，方法名是接口名加前缀 `ng`。例如，`OnInit` 接口的钩子方法名为 `ngOnInit`。

Angular calls these hook methods in the following order:

Angular 会按以下顺序调用钩子方法：

* `ngOnChanges`: when an [input](guide/glossary#input)/[output](guide/glossary#output) binding value changes.

   `ngOnChanges` - 在[输入属性 (input)](guide/glossary#input)/[输出属性 (output)](guide/glossary#output)的绑定值发生变化时调用。

* `ngOnInit`: after the first `ngOnChanges`.

   `ngOnInit` - 在第一次 `ngOnChanges` 完成后调用。

* `ngDoCheck`: developer's custom change detection.

   `ngDoCheck` - 开发者自定义变更检测。

* `ngAfterContentInit`: after component content initialized.

   `ngAfterContentInit` - 在组件内容初始化后调用。

* `ngAfterContentChecked`: after every check of component content.

   `ngAfterContentChecked` - 在组件内容每次检查后调用。

* `ngAfterViewInit`: after a component's views are initialized.

   `ngAfterViewInit` - 在组件视图初始化后调用。

* `ngAfterViewChecked`: after every check of a component's views.

   `ngAfterViewChecked` - 在组件视图每次检查后调用。

* `ngOnDestroy`: just before the directive is destroyed.

   `ngOnDestroy` - 在指令销毁前调用。

Read more in the [Lifecycle Hooks](guide/lifecycle-hooks) page.

更多信息，见[生命周期钩子 (lifecycle hook)](guide/lifecycle-hooks)。

{@a M}

## Module

## 模块 (module)

<div class="alert is-important">

Angular has the following types of modules:

Angular 有下列模块类型：

* [NgModules](guide/glossary#ngmodule).
For details and examples, see the [NgModules](guide/ngmodules) page. 

   [Angular 模块](guide/glossary#ngmodule)，见[Angular 模块](guide/ngmodules)。

* ES2015 modules, as described in this section.

   ES2015 模块，如本节所述。

For a comparison, see [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

要对比这两个概念，请参见[JavaScript 模块 vs. NgModules](guide/ngmodule-vs-jsmodule)。

</div>

A cohesive block of code dedicated to a single purpose.

模块是一个内聚的代码块，具有单一用途。

Angular apps are modular.

Angular 应用程序是模块化的。

In general, you assemble an application from many modules, both the ones you write and the ones you acquire from others.

一般来说，你用模块来组装应用程序，这些模块包含自己编写的模块和从其它地方获取的模块。

A module *exports* something of value in that code, typically one thing such as a class;
a module that needs that class *imports* it.

模块会**导出 (export) **代码中的某些值，最典型的就是类。
模块如果需要什么东西，那就**导入 (import) **它。

The structure of NgModules and the import/export syntax
is based on the [ES2015 module standard](http://www.2ality.com/2014/09/es6-modules-final.html).

Angular 的模块结构和导入/导出语法是基于 [ES2015 模块标准](http://www.2ality.com/2014/09/es6-modules-final.html)的。

An application that adheres to this standard requires a module loader to
load modules on request and resolve inter-module dependencies.
Angular doesn't include a module loader and doesn't have a preference
for any particular third-party library.
You can use any module library that conforms to the standard.

采用这个标准的应用程序需要一个模块加载器来按需加载模块，并解析模块间的依赖关系。
Angular 不附带模块加载器，也不偏爱任何第三方库（虽然大多数例子使用 SystemJS）。
你可以选择任何与这个标准兼容的模块化库。

Modules are typically named after the file in which the exported thing is defined.
The Angular [DatePipe](https://github.com/angular/angular/blob/master/packages/common/src/pipes/date_pipe.ts)
class belongs to a feature module named `date_pipe` in the file `date_pipe.ts`.

模块一般与它定义导出物的文件同名。例如，Angular 的 [DatePipe](https://github.com/angular/angular/blob/master/modules/angular2/src/common/pipes/date_pipe.ts) 类属于名叫 `date_pipe` 的特性模块，位于 `date_pipe.ts` 文件中。

You rarely access Angular feature modules directly. You usually import them from an Angular [scoped package](guide/glossary#scoped-package) such as `@angular/core`.

你很少需要直接访问 Angular 的特性模块。
而通常会从一个 Angular [范围化包 (scoped package)](guide/glossary#scoped-package)中导入它们，例如 `@angular/core`。

{@a N}

## NgModule

Helps you organize an application into cohesive blocks of functionality.
An NgModule identifies the components, directives, and pipes that the application uses along with the list of external NgModules that the application needs, such as `FormsModule`.

帮助你把应用组织成多个内聚的功能块。
NgModule 表示应用的组件、指令和管道以及所用到的外部模块的列表，比如 `FormsModule`。

Every Angular application has an application root-module class. By convention, the class is
called `AppModule` and resides in a file named `app.module.ts`.

每个 Angular 应用都有一个应用级根模块类。这类通常叫做 `AppModule`，并且位于一个名叫 `app.module.ts` 的文件中。

For details and examples, see [NgModules](guide/ngmodules) and the 
related files in that section.

要获得详情和范例，参见 [NgModule](guide/ngmodules) 及其相关文件。

{@a O}

## Observable

## Observable 对象

An array whose items arrive asynchronously over time.
Observables help you manage asynchronous data, such as data coming from a backend service.
Observables are used within Angular itself, including Angular's event system and its HTTP client service.

一个 `Observable` 是一个数组，其中的元素随着时间的流逝异步地到达。
`Observable` 帮助你管理异步数据，例如来自后台服务的数据。
Angular 自身使用了 `Observable`，包括 Angular 的事件系统和它的 http 客户端服务。

To use observables, Angular uses a third-party library called Reactive Extensions (RxJS).
Observables are a proposed feature for ES2016, the next version of JavaScript.

为了使用 `Observable`， Angular 采用了名为 Reactive Extensions (RxJS) 的第三方包。
在下个版本的 JavaScript - ES 2016 中，`Observable` 是建议的特性之一。

## Output

## 输出属性 (output)

A directive property that can be the *target* of event binding
(read more in the [event binding](guide/template-syntax#event-binding)
section of the [Template Syntax](guide/template-syntax) page).
Events stream *out* of this property to the receiver identified
in the template expression to the right of the equal sign.

输出属性是一个指令属性，可作为[事件绑定](guide/template-syntax.html#event-binding)的 **目标** 。
事件流从这个属性流*出*到模板表达式等号的右边的接收者。

See the [Input and output properties](guide/template-syntax#inputs-outputs) section of the [Template Syntax](guide/template-syntax) page.

参见[模板语法](guide/template-syntax)中的[输入与输出属性](guide/template-syntax#inputs-outputs)部分。

{@a P}

## PascalCase

## Pascal 命名法 (PascalCase)

The practice of writing individual words, compound words, or phrases such that each word or abbreviation begins with a capital letter.
Class names are typically spelled in PascalCase. For example, `Person` and `HeroDetailComponent`.

Pascal 命名法是书写单词、复合词或短语的一种形式，每个单词或缩写都以大写开头。
类名一般都采用 Pascal 命名法。例如 `Person` 和 `HeroDetailComponent`。

This form is also known as *upper camel case* to distinguish it from *lower camel case* or simply [camelCase](guide/glossary#camelcase).
In this documentation, "PascalCase" means *upper camel case* and  "camelCase" means *lower camel case*.

这种形式也称**大写驼峰式命名法**，以区别于**小写驼峰式命名法”或[驼峰式命名法 (camelCase)](guide/glossary#camelcase)** 。
在本文档中，“Pascal 命名法”都是指的*大写驼峰式命名法*，“驼峰式命名法”指的都是*小写驼峰式命名法*。

## Pipe

## 管道 (pipe)

An Angular pipe is a function that transforms input values to output values for
display in a [view](guide/glossary#view).
Here's an example that uses the built-in `currency` pipe to display
a numeric value in the local currency.

Angular 管道是一个函数，用于把输入值转换成输出值以供[视图 (view)](guide/glossary#view)显示。
下面这个例子中，用内置的 `currency` 管道把数字值显示为本地货币格式。

<code-example language="html" escape="html">
  <label>Price: </label>{{product.price | currency}}

</code-example>

You can also write your own custom pipes.
Read more in the page on [pipes](guide/pipes).

你还可以写自己的自定义管道。
更多信息，见[管道](guide/pipes)。

## Provider

## 提供商 (provider)

A _provider_ creates a new instance of a dependency for the
[dependency injection](guide/glossary#dependency-injection) system.
It relates a lookup token to code&mdash;sometimes called a "recipe"&mdash;that can create a dependency value.

依赖注入系统依靠提供商来创建依赖的实例。
它把一个查找令牌和代码（有时也叫“配方”）关联到一起，以便创建依赖值。

{@a Q}

{@a R}

## Reactive forms

## 响应式表单 (reactive forms)

A technique for building Angular forms through code in a component.
The alternative technique is [template-driven forms](guide/glossary#template-driven-forms).

通过组件中代码构建 Angular 表单的一种技术。
另一种技术是[模板驱动表单](guide/glossary#template-driven-forms)

When building reactive forms:

构建响应式表单时：

* The "source of truth" is the component. The validation is defined using code in the component.

   组件是“真理之源”。表单验证在组件代码中定义。

* Each control is explicitly created in the component class with `new FormControl()` or with `FormBuilder`.

   在组件类中，使用 `new FormControl()` 或者 `FormBuilder` 显性地创建每个控件。

* The template input elements do *not* use `ngModel`.

   模板中的 `input` 元素**不**使用 `ngModel`。

* The associated Angular directives are all prefixed with `Form`, such as `FormGroup`, `FormControl`, and `FormControlName`.

   相关联的 Angular 指令全部以 `Form` 开头，例如 `FormGroup`、`FormControl` 和 `FormControlName`。

Reactive forms are powerful, flexible, and a good choice for more complex data-entry form scenarios, such as dynamic generation of form controls.

动态表单非常强大、灵活，它在复杂数据输入的场景下尤其好用，例如动态的生成表单控制器。

## Router

## 路由器 (router)

Most applications consist of many screens or [views](guide/glossary#view).
The user navigates among them by clicking links and buttons,
and performing other similar actions that cause the application to
replace one view with another.

大多数应用程序包含多个屏幕或[视图 (view)](guide/glossary#view)。
用户通过点击链接、按钮和其它类似动作，在它们之间导航，使应用程序从一个视图切换到另一个视图。

The Angular component router is a richly featured mechanism for configuring and managing the entire view navigation process, including the creation and destruction
of views.

Angular 的组件路由器是一个特性丰富的机制，可以配置和管理整个导航过程，包括建立和销毁视图。

In most cases, components become attached to a router by means
of a `RouterConfig` that defines routes to views.

多数情况下，组件会通过 `RouterConfig` 中定义的路由到视图的对照表来附加到[路由器](guide/glossary#router)上。

A [routing component's](guide/glossary#routing-component) template has a `RouterOutlet` element
where it can display views produced by the router.

[路由组件](guide/glossary#routing-component)的模板中带有一个 `RouterOutlet` 元素，那是显示路由器生成的视图的地方。

Other views in the application likely have anchor tags or buttons with `RouterLink`
directives that users can click to navigate.

应用中的其它视图中某些锚标签或按钮上带有 `RouterLink` 指令，用户可以点击它们进行导航。

For more information, see the [Routing & Navigation](guide/router) page.

更多信息，见[路由与导航](guide/router)。

## Router module

## 路由器模块 (router module)

A separate [NgModule](guide/glossary#ngmodule) that provides the necessary service providers and directives for navigating through application views.

一个独立的 [Angular 模块](guide/glossary#ngmodule)，用来提供导航所需的服务提供商和指令。

For more information, see the [Routing & Navigation](guide/router) page.

更多信息，见[路由与导航](guide/router)。

## Routing component

## 路由组件 (routing component)

An Angular [component](guide/glossary#component) with a `RouterOutlet` that displays views based on router navigations.

一个带有 RouterOutlet 的 Angular [组件](guide/glossary#component)，根据路由器导航来显示视图。

For more information, see the [Routing & Navigation](guide/router) page.

更多信息，见[路由与导航](guide/router)。

{@a S}

## Scoped package

## 范围化包 (scoped package)

A way to group related *npm* packages.
Read more at the [npm-scope](https://docs.npmjs.com/misc/scope) page.

对相关的 *npm* 包进行分组的一种方式，参阅[npm-scope](https://docs.npmjs.com/misc/scope)。

NgModules are delivered within *scoped packages* such as `@angular/core`,
`@angular/common`, `@angular/platform-browser-dynamic`, `@angular/http`, and `@angular/router`.

Angular 模块是用一系列*范围化包*的形式发布的，例如 `@angular/core`、`@angular/common`、`@angular/platform-browser-dynamic`、`@angular/http` 和 `@angular/router`。

Import a scoped package the same way that you import a normal package.
The only difference, from a consumer perspective,
is that the scoped package name begins with the Angular *scope name*, `@angular`.

导入范围化包与导入*普通*包方式相同。
  从消费者的视角看，唯一的不同是那些包的名字是用 Angular 的*范围化包名*`@angular` 开头的。

<code-example path="architecture/src/app/app.component.ts" linenums="false" title="architecture/src/app/app.component.ts (import)" region="import">

</code-example>

## Service

## 服务 (service)

For data or logic that is not associated
with a specific view or that you want to share across components, build services.

服务用于封装不与任何特定视图相关的数据和逻辑，或者用于在组件之间共享数据和逻辑。

Applications often require services such as a hero data service or a logging service.

应用程序经常需要服务，例如英雄数据服务或者日志服务。

A service is a class with a focused purpose.
You often create a service to implement features that are
independent from any specific view,
provide shared data or logic across components, or encapsulate external interactions.

服务是一个具有特定功能的类。
你经常创建服务来实现不依赖任何特定视图的特征，
在组件之间提供共享数据或逻辑，或者封装外部的交互。

Applications often require services such as a data service or a logging service.

应用通常都需要服务，比如数据服务或者日志服务。

For more information, see the [Services](tutorial/toh-pt4) page of the [Tour of Heroes](tutorial) tutorial.

更多信息，见[英雄指南](tutorial)中的[服务](tutorial/toh-pt4)。

{@a snake-case}

## snake_case

## 蛇形命名法

The practice of writing compound words or phrases such that an
underscore (`_`) separates one word from the next. This form is also known as *underscore case*.

写复合词或短语的一种方式，在多个词之间用下划线(`_`)分隔。也叫*下划线命名法*

{@a structural-directive}

{@a structural-directives}

## Structural directives

## 结构型指令

A category of [directive](guide/glossary#directive) that can
shape or reshape HTML layout, typically by adding and removing elements in the DOM.
The `ngIf` "conditional element" directive and the `ngFor` "repeater" directive are well-known examples.

结构型指令是[指令 (directive)](guide/glossary#directive)一种，
可以通过在 DOM 中添加、删除或操作元素和其各级子元素来塑造或重塑 HTML 布局。
例如，`ngIf` 这个“条件化元素”指令，`ngFor` 这个“重复器”指令都是众所周知的例子。

Read more in the [Structural Directives](guide/structural-directives) page.

更多信息，见[结构型指令](guide/structural-directives)。

{@a T}

## Template

## 模板 (template)

A chunk of HTML that Angular uses to render a [view](guide/glossary#view) with
the support and guidance of an Angular [directive](guide/glossary#directive),
most notably a [component](guide/glossary#component).

模板是一大块 HTML。Angular 会在[指令 (directive)](guide/glossary#directive) 特别是[组件 (component)](guide/glossary#component)
    的支持和持续指导下，用它来渲染[视图 (view)](guide/glossary#view)。

## Template-driven forms

## 模板驱动表单 (template-driven forms)

A technique for building Angular forms using HTML forms and input elements in the view.
The alternate technique is [Reactive Forms](guide/glossary#reactive-forms).

一项在视图中使用 HTML 表单和输入类元素构建 Angular 表单的技术。
      它的替代方案是[响应式表单](guide/glossary#reactive-forms)。

When building template-driven forms:

当构建模板驱动表单时：

* The "source of truth" is the template. The validation is defined using attributes on the individual input elements.

   模板是“真理之源”。使用属性 (attribute) 在单个输入元素上定义验证规则。

* [Two-way binding](guide/glossary#data-binding) with `ngModel` keeps the component model synchronized with the user's entry into the input elements.

   使用 `ngModel` 进行[双向绑定](guide/glossary#data-binding)，保持组件模型和用户输入之间的同步。

* Behind the scenes, Angular creates a new control for each input element, provided you have set up a `name` attribute and two-way binding for each input.

   在幕后，Angular 为每个带有 `name` 属性和双向绑定的输入元素创建了一个新的控件。

* The associated Angular directives are all prefixed with `ng` such as `ngForm`, `ngModel`, and `ngModelGroup`.

   相关的 Angular 指令都带有 `ng` 前缀，例如 `ngForm`、`ngModel` 和 `ngModelGroup`。

Template-driven forms are convenient, quick, and simple. They are a good choice for many basic data-entry form scenarios.

模板驱动表单便捷、快速、简单，是很多基础型数据输入表单的最佳选择。

Read about how to build template-driven forms
in the [Forms](guide/forms) page.

要了解如何构建模板驱动表单的更多信息，参见[表单](guide/forms)页。

## Template expression

## 模板表达式 (template expression)

A TypeScript-like syntax that Angular evaluates within
a [data binding](guide/glossary#data-binding).

Angular 用来在[数据绑定 (data binding)](guide/glossary#data-binding)内求值的、**类似**JavaScript 语法的表达式。

Read about how to write template expressions
in the [Template expressions](guide/template-syntax#template-expressions) section
of the [Template Syntax](guide/template-syntax) page.

到[模板语法](guide/template-syntax)一章的[模板表达式](guide/template-syntax#template-expressions)部分了解更多模板表达式的知识。

## Transpile

## 转译（transpile)

The process of transforming code written in one form of JavaScript
(such as TypeScript) into another form of JavaScript  (such as [ES5](guide/glossary#es5)).

把一种形式的 JavaScript（例如 TypeScript）转换成另一种形式的 JavaScript（例如 [ES5](guide/glossary#es5)）的过程。

## TypeScript

## TypeScript 语言

A version of JavaScript that supports most [ECMAScript 2015](guide/glossary#es2015)
language features such as [decorators](guide/glossary#decorator).

JavaScript 的一个版本，支持了几乎所有 [ECMAScript 2015](guide/glossary#es2015) 语言特性，例如[装饰器 (decorator)](guide/glossary#decorator))。

TypeScript is also notable for its optional typing system, which provides
compile-time type checking and strong tooling support (such as "intellisense,"
code completion, refactoring, and intelligent search). Many code editors
and IDEs support TypeScript either natively or with plugins.

TypeScript 还以它的可选类型系统而著称。
该类型系统提供了编译时类型检查和强大的工具支持（例如 “Intellisense”，代码补齐，重构和智能搜索等）。
许多代码编辑器和 IDE 都原生支持 TypeScript 或通过插件提供支持。

TypeScript is the preferred language for Angular development, although
you can use other JavaScript dialects such as [ES5](guide/glossary#es5).

TypeScript 是 Angular 的首选语言，当然，你可以使用其它 JavaScript 方言，例如[ES5](guide/glossary#es5)。

Read more about TypeScript at [typescriptlang.org](http://www.typescriptlang.org/).

更多信息，见[typescript.org](http://www.typescriptlang.org/)。

{@a U}

{@a V}

## View

## 视图 (view)

A portion of the screen that displays information and responds
to user actions such as clicks, mouse moves, and keystrokes.

视图是屏幕中一小块，用来显示信息并响应用户动作，例如点击、移动鼠标和按键。

Angular renders a view under the control of one or more [directives](guide/glossary#directive),
especially  [component](guide/glossary#component) directives and their companion [templates](guide/glossary#template).
The component plays such a prominent role that it's often
convenient to refer to a component as a view.

Angular 在一个或多个[指令 (directive)](guide/glossary#directive) 的控制下渲染视图，
尤其是[组件 (component)](guide/glossary#component) 指令及其[模板 (template)](guide/glossary#template)。
组件扮演着非常重要的角色，以至于习惯上会把组件视为一种视图。

Views often contain other views. Any view might be loaded and unloaded
dynamically as the user navigates through the application, typically
under the control of a [router](guide/glossary#router).

视图一般包含其它视图，在用户在应用程序中导航时，
任何视图都可能被动态加载或卸载，这一般会在[路由器 (router)](guide/glossary#router) 的控制下进行。

{@a W}

{@a X}

{@a Y}

{@a Z}

## Zone

## 区域 (zone)

A mechanism for encapsulating and intercepting
a JavaScript application's asynchronous activity.

区域是一种用来封装和截听 JavaScript 应用程序异步活动的机制。

The browser DOM and JavaScript have a limited number
of asynchronous activities, such as DOM events (for example, clicks),
[promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and
[XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
calls to remote servers.

浏览器中的 DOM 和 JavaScript 之间常会有一些数量有限的异步活动，
  例如 DOM 事件（例如点击）、[承诺 (promise)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  和通过 [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 调用远程服务。

Zones intercept all of these activities and give a "zone client" the opportunity
to take action before and after the async activity finishes.

区域能截听所有这些活动，并让“区域的客户”有机会在异步活动完成之前和之后采取行动。

Angular runs your application in a zone where it can respond to
asynchronous events by checking for data changes and updating
the information it displays via [data bindings](guide/glossary#data-binding).

Angular 会在一个 Zone 区域中运行应用程序，在这个区域中，它可以对异步事件做出反应，可以通过检查数据变更、利用[数据绑定 (data bindings)](guide/glossary#data-binding) 来更新信息显示。

Learn more about zones in this
[Brian Ford video](https://www.youtube.com/watch?v=3IqtmUscE_U).

更多信息，见 [Brian Ford 的视频](https://www.youtube.com/watch?v=3IqtmUscE_U)。
