# Angular Glossary

# Angular 词汇表

Angular has its own vocabulary.
Most Angular terms are common English words or computing terms
that have a specific meaning within the Angular system.

Angular 有自己的词汇表。
虽然大多数 Angular 短语都是日常用语或计算机术语，但是在 Angular 体系中，它们有特别的含义。

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

The Angular ahead-of-time (AOT) compiler converts your Angular HTML and TypeScript code 
into efficient JavaScript code during the build phase before the browser downloads 
and runs that code. 
This is the best compilation mode for production environments, with decreased load time and increased performance.

Angular 的预先（AOT）编译器可以在编译期间把你的 HTML 代码和 TypeScript 代码转换成高效的 JavaScript 代码，这样浏览器就可以直接下载和运行它们。

By compiling your application using the `ngc` command-line tool, you can bootstrap directly to a module factory, meaning you don't need to include the Angular compiler in your JavaScript bundle.

使用命令行工具 `ngc` 来编译你的应用之后，就可以直接启动一个模块工厂，这意味着你不必再在 JavaScript 打包文件中包含 Angular 编译器。

Compare [just-in-time (JIT) compilation](guide/glossary#jit).

可以与[即时(JIT)编译](guide/glossary#jit)对比一下。

## Angular element

## Angular 元素

An Angular [component](guide/glossary#component) that has been packaged as a [custom element](guide/glossary#custom-element). 

被包装成[自定义元素](guide/glossary#custom-element)的 Angular [组件](guide/glossary#component)。

Learn more in the [_Angular Elements_](guide/elements) guide.

参见 [_Angular 元素_](guide/elements) 一文。

## Annotation

## 注解

A structure that provides metadata for a class. See [Decorator](guide/glossary#decorator).

一种为类提供元数据的结构。参见 [装饰器](guide/glossary#decorator)。

{@a attribute-directive}

{@a attribute-directives}

## Attribute directives

## 属性型指令

A category of [directive](guide/glossary#directive) that can listen to and modify the behavior of
other HTML elements, attributes, properties, and components. They are usually represented
as HTML attributes, hence the name.

[指令 (directive)](guide/glossary#directive)的一种。可以监听或修改其它 HTML 元素、特性 (attribute)、属性 (property)、组件的行为。通常用作 HTML 属性，就像它的名字所暗示的那样。

Learn more in the [_Attribute Directives_](guide/attribute-directives) guide.

要了解更多，参见[*属性型指令*](guide/attribute-directives)

{@a B}

## Binding

## 绑定 (binding)

Generally, the practice of setting a variable or property to a data value. 
Within Angular, typically refers to [data binding](guide/glossary#data-binding), 
which coordinates DOM object properties with data object properties.

广义上是指把变量或属性设置为某个数据值的一种实践。
在 Angular 中，一般是指[数据绑定](guide/glossary#data-binding)，它会根据数据对象属性的值来设置 DOM 对象的属性。

Sometimes refers to a [dependency-injection](guide/glossary#dependency-injection) binding
between a [token](guide/glossary#token) and a dependency [provider](guide/glossary#provider).

有时也会指在“[令牌（Token）](guide/glossary#token)”和依赖[提供商（Provider）](guide/glossary#provider)
之间的[依赖注入](guide/glossary#dependency-injection) 绑定。

## Bootstrap

## 启动/引导 (bootstrap)

A way to initialize and launch an app or system.

一种用来初始化和启动应用或系统的途径。

In Angular, an app's root NgModule (`AppModule`) has a `bootstrap` property that identifies the app's top-level [components](guide/glossary#component). 
During the bootstrap process, Angular creates and inserts these components into the `index.html` host web page. 
You can bootstrap multiple apps in the same `index.html`, each app with its own components.

在 Angular 中，应用的根模块（`AppModule`）有一个 `bootstrap` 属性，用于指出该应用的的顶级[组件](guide/glossary#component)。
在引导期间，Angular 会创建这些组件，并插入到宿主页面 `index.html` 中。
你可以在同一个 `index.html` 中引导多个应用，每个应用都有一些自己的组件。

Learn more in the [_Bootstrapping_](guide/bootstrapping) guide.

要了解更多，参见[*引导*](guide/bootstrapping)一章。

{@a C}

{@a case-conventions}

{@a dash-case}

{@a camelcase}

{@a kebab-case}

## Case conventions

## 大小写约定

Angular uses capitalization conventions to distinguish the names of various types, as described in the [Style Guide "Naming" section](guide/styleguide#02-01). 

Angular 使用大小写约定来区分多种名字，详见[风格指南中的 "命名" 一节](guide/styleguide#02-01)。

- camelCase : symbols, properties, methods, pipe names, non-component directive selectors, constants 

  小驼峰形式（camelCase）：符号、属性、方法、管道名、非组件指令的选择器、常量。

- UpperCamelCase (or PascalCase): Class names, including classes that define components, interfaces, NgModules, directives, pipes, and so on. 

  大驼峰形式（UpperCamelCase）或叫帕斯卡形式（PascalCase）：类名（也包括用来定义组件、接口、NgModule、指令、管道等的类）。

- dash-case (or "kebab-case"): descriptive part of file names, component selectors

  中线形式（dash-case）或叫烤串形式（kebab-case）：文件名中的描述部分，组件的选择器

- underscore_case (or "snake_case"): not typically used in Angular 

  下划线形式（underscore_case）或叫蛇形形式（snake_case）：在 Angular 中没有典型用法。

- UPPER_UNDERSCORE_CASE (or UPPER_SNAKE_CASE): traditional for constants (acceptable, but prefer camelCase)

  大写下划线形式（UPPER_UNDERSCORE_CASE）或叫大写蛇形形式（UPPER_SNAKE_CASE）：传统的常量写法（可以接受，但更推荐用小驼峰形式（camelCase））

{@a class-decorator}

## Class decorator

## 类装饰器

A [decorator](guide/glossary#decorator) statement immediately before a class definition that declares the class to be of the given type, and provides metadata suitable to the type.

出现在类定义紧前方的[装饰器](guide/glossary#decorator)语句用来声明该类具有指定的类型，并且提供适合该类型的元数据。

The following class types can be declared:

可以声明为下列类型之一：

- `@Component`

- `@Directive`

- `@Pipe`

- `@Injectable`

- `@NgModule`

{@a class-field-decorator}

## Class field decorator

## 类字段装饰器

A [decorator](guide/glossary#decorator) statement immediately before a field in a class definition that declares the type of that field. Some examples are `@Input` and `@Output`. 

出现在类定义中属性紧前方的[装饰器](guide/glossary#decorator)语句用来声明该字段的类型。比如 `@Input` 和 `@Output`。

{@a cli}

## CLI

The [Angular CLI](https://cli.angular.io/) is a command-line tool for managing the Angular development cycle. Use it to create the initial filesystem scaffolding for a [workspace](guide/glossary#workspace) or [project](guide/glossary#project), and to run [schematics](guide/glossary#schematic) that add and modify code for initial generic versions of various elements. The tool supports all stages of the development cycle, including building, testing, bundling, and deployment.

[Angular CLI](https://cli.angular.io/) 是一个命令行工具，用于管理 Angular 的开发周期。它用于为[工作空间](guide/glossary#workspace)或[项目](guide/glossary#project)创建初始的脚手架，并且运行[生成器（schematics）](guide/glossary#schematic)来为初始生成的版本添加或修改各类代码。
该工具支持开发周期中的所有阶段，比如构建、测试、打包和部署。

* To begin using the CLI for a new project, see [Getting Started](guide/quickstart) guide.

  要开始使用 CLI 来创建新项目，参见[快速起步](guide/quickstart)。

* To learn more about the full capabilities of the CLI, see the [Angular CLI documentation].(https://github.com/angular/angular-cli/wiki).

  要学习 CLI 的所有功能，参见 [Angular CLI 文档].(https://github.com/angular/angular-cli/wiki)

{@a component}

## Component

## 组件 (component)

A class with the `@Component` [decorator](guide/glossary#decorator) that associates it with a companion [template](guide/glossary#template). Together, the component and template define a [view](guide/glossary#view).

一个带有 `@Component` [装饰器](guide/glossary#decorator)的类，和它的伴生[模板](guide/glossary#template)关联在一起。组件及其模板共同定义了一个[视图](guide/glossary#view)。

A component is a special type of [directive](guide/glossary#directive).
The `@Component` decorator extends the `@Directive` decorator with template-oriented features. 

组件是[指令](guide/glossary#directive)的一种特例。`@Component` 装饰器扩展了 `@Directive` 装饰器，增加了一些与模板有关的特性。

An Angular component class is responsible for exposing data and handling most of the view's display and user-interaction logic through [data binding](guide/glossary#data-binding).

Angular 的组件类负责暴露数据，并通过[数据绑定机制](guide/glossary#data-binding)来处理绝大多数视图的显示和用户交互逻辑。

Read more about components, templates, and views in the [Architecture](guide/architecture) guide.

要了解更多关于组件、模板和视图的知识，参见 [架构](guide/architecture) 一章。

{@a custom-element}

## Custom element

## 自定义元素（Custom element）

A Web Platform feature, currently supported by most browsers, and available in other browsers through polyfills (see [Browser Support](guide/browser-support)). 

一种 Web 平台的特性，目前已经被绝大多数浏览器支持，在其它浏览器中也可以通过腻子脚本获得支持（参见[浏览器支持](guide/browser-support)）。

The custom element feature extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. A custom element (also called a *web component*) is recognized by a browser when it is added to the [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry).

这种自定义元素特性通过允许你定义标签（其内容是由 JavaScript 代码来创建和控制的）来扩展 HTML。当自定义元素（也叫 *Web Component*）被添加到 [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) 之后就会被浏览器识别。

You can use the API to transform an Angular component so that it can be registered with the browser and used in any HTML that you add directly to the DOM within an Angular app. The custom element tag inserts the component's view, with change-detection and data-binding functionality, into content that would otherwise be displayed without Angular processing.

你可以使用 API 来转换 Angular 组件，以便它能够注册进浏览器中，并且可以用在你往 DOM 中添加的任意 HTML 中。
自定义元素标签可以把组件的视图（包括变更检测和数据绑定功能）插入到不受 Angular 控制的内容中。

See also [Dynamic components](guide/glossary#dynamic-components).

参见[动态组件](guide/glossary#dynamic-components)。

{@a D}

## Data binding

## 数据绑定 (data binding)

Data binding allow apps to display data values to a user and respond to user
actions (such as clicks, touches, and keystrokes).

数据绑定允许应用程序将数据展示给用户，并对用户的操作（点击、触屏、按键）做出回应。

In data binding, you declare the relationship between an HTML widget and data source
and let the framework handle the details.
Data binding is an alternative to manually pushing application data values into HTML, attaching
event listeners, pulling changed values from the screen, and
updating application data values.

在数据绑定机制下，你只要声明一下 HTML 部件和数据源之间的关系，把细节交给框架去处理。
而以前的手动操作过程是：将数据推送到 HTML 页面中、添加事件监听器、从屏幕获取变化后的数据，并更新应用中的值。

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

{@a declarable}

## Declarable

## 可声明对象

A class type that you can add to the `declarations` list of an [NgModule](guide/glossary#ngmodule). 

类的一种类型，你可以把它们添加到 [NgModule](guide/glossary#ngmodule) 的 `declarations` 列表中。

You can declare [components](guide/glossary#component), [directives](guide/glossary#directive), and [pipes](guide/glossary#pipe).

你可以声明[组件](guide/glossary#component)、[指令](guide/glossary#directive)和[管道](guide/glossary#pipe)。

Do not declare the following:

*不要*声明：

- A class that's already declared in another NgModule.

   已经在其它 NgModule 中声明过的类。

- An array of directives imported from another package. For example, don't declare `FORMS_DIRECTIVES` from `@angular/forms`.

   从其它包中导入的指令数组。比如，不要再次声明来自 `@angular/forms` 中的 `FORMS_DIRECTIVES`。

- NgModule classes.

   NgModule 类。

- Service classes.

   服务类

- Non-Angular classes and objects, such as strings, numbers, functions, entity models, configurations, business logic, and helper classes

   非 Angular 的类和对象，比如：字符串、数字、函数、实体模型、配置、业务逻辑和辅助类。

{@a decorator}

{@a decoration}

## Decorator | decoration

## 装饰器（decorator | decoration）

A function that modifies the immediately following class or property definition.  
Decorators (also called annotations) are an experimental (stage 2), JavaScript language [feature](https://github.com/wycats/javascript-decorators). 
TypeScript adds support for decorators.

一个函数，用来修饰紧随其后的类或属性定义。
装饰器（也叫注解）是 JavaScript 的一种语言[特性](https://github.com/wycats/javascript-decorators)，是一项位于阶段2（stage 2）的试验特性。

Angular defines decorators that attach metadata to classes or properties so that it knows what those classes or properties mean and how they should work. 

Angular 定义了一些装饰器，用来为类或属性附加元数据，以便 Angular 了解那些类或属性的含义，以及要如何处理它们。

See [Class decorator](guide/glossary#class-decorator), [Class field decorator](guide/glossary#class-field-decorator). 

参见 [类装饰器](guide/glossary#class-decorator)、[类属性装饰器](guide/glossary#class-field-decorator)。

{@a di}

## Dependency injection

## 依赖注入（dependency injection）

A design pattern and mechanism for creating and delivering parts of an application (dependencies) to other parts of an application that require them.

依赖注入既是设计模式，同时又是一种机制：当应用程序的一些部件（即一些依赖）需要另一些部件时，
利用依赖注入来创建被请求的部件，并将它们注入到需要它们的部件中。

In Angular, dependencies are typically services, but can also be values, such as strings or functions.
An [injector](guide/glossary#injector) for an app (created automatically during bootstrap) instantiates dependencies when needed, using a configured [provider](guide/glossary#provider) of the service or value.

在 Angular 中，依赖通常是服务，但是也可以是值，比如字符串或函数。应用的[注入器](guide/glossary#injector)（它是在启动期间自动创建的）会使用该服务或值的配置好的[提供商](guide/glossary#provider)来按需实例化这些依赖。各个不同的提供商可以为同一个服务提供不同的实现。

Learn more in the [Dependency Injection](guide/dependency-injection) guide.

要了解更多，参见[依赖注入](guide/dependency-injection)一章。

{@a di-token}

## DI token

## DI 令牌（Token）

A lookup token associated with a dependency [provider](guide/glossary#provider), for use with the [dependency injection](guide/glossary#di) system.

一种用来查阅的令牌，它关联到一个依赖[提供商](guide/glossary#provider)，用于[依赖注入](guide/glossary#di)系统中。

{@a directive}

{@a directives}

## Directive

## 指令 (directive)

A class with the `@Directive` [decorator](guide/glossary#decorator) that can modify the structure of the DOM, or modify attributes in the DOM and component data model.

一个带有 `@Directive` [装饰器](guide/glossary#decorator)的类，它可以修改 DOM 结构或者修改 DOM 的属性和组件数据模型的属性。

A directive class is usually associated with an HTML element or attribute, and that element or attribute is often referred to as the directive itself.  
When Angular finds a directive in an HTML [template](guide/glossary#template), it creates the matching directive class instance and gives the instance control over that portion of the browser DOM.

指令类几乎总与 HTML 元素或属性 (attribute) 相关。
通常会把这些 HTML 元素或者属性 (attribute) 当做指令本身。
当 Angular 在 HTML [模板中](guide/glossary#template)发现某个指令时，会创建与之相匹配的指令类的实例，并且把这部分 DOM 的控制权交给它。

There are three categories of directive:

指令分为三类：

- [Components](guide/glossary#component) use `@Component` (an extension of `@Directive`) to associate a template with a class.

   [组件](guide/glossary#component)使用 `@Component`（继承自 `@Directive`）为某个类关联一个模板。

- [Attribute directives](guide/glossary#attribute-directive) modify behavior and appearance of page elements.

   [属性型指令](guide/glossary#attribute-directive)修改页面元素的行为和外观。

- [Structural directives](guide/glossary#structural-directive) modify the structure of the DOM.

   [结构型指令](guide/glossary#structural-directive)修改 DOM 的结构。

Angular supplies a number of built-in directives that begin with the `ng` prefix. You can also create new directives to implement your own functionality. 
You associate a _selector_ (an HTML tag such as `<my-directive>`) with a custom directive, thereby extending the [template syntax](guide/template-syntax) that you can use in your apps.

Angular 提供了一些以 `ng` 为前缀的内置指令。你也可以创建新的指令来实现自己的功能。
你可以为自定义指令关联一个*选择器*（一种形如 `<my-directive>` 的 HTML 标记），以扩展[模板语法](guide/template-syntax)，从而让你能在应用中使用它。

## Domain-specific language (DSL)

## 领域特定语言（DSL)

A special-purpose library or API; see [Domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language).

一种特殊用途的库或 API，参见[领域特定语言](https://en.wikipedia.org/wiki/Domain-specific_language)词条。

Angular extends TypeScript with domain-specific languages for a number of domains relevant to Angular apps, defined in ngModules such as [animations](guide/animations), [forms](guide/forms), and [routing and navigation](guide/router).

Angular 在一些相关的应用领域中用领域特定语言扩展了 TypeScript，这些 DSL 都定义在 NgModule 中，比如 [动画](guide/animations)、[表单](guide/forms)和[路由与导航](guide/router)。

{@a dynamic-components}

## Dynamic component loading

## 动态组件加载

A technique for adding a component to the DOM at run time, which requires that you exclude the component from compilation, then connect it to Angular's change-detection and event handling framework when you add it to the DOM.

一种在运行期间把组件添加到 DOM 中的技术，它需要你从编译期间排除该组件，然后，当你把它添加到 DOM 中时，再把它接入 Angular 的变更检测与事件处理框架。

See also [Custom element](guide/glossary#custom-element), which provides an easier path with the same result.

参见[自定义组件](guide/glossary#custom-element)，它提供了一种更简单的方式来达到相同的效果。

{@a E}

{@a ecma}

## ECMAScript

## ECMAScript 语言

The [official JavaScript language specification](https://en.wikipedia.org/wiki/ECMAScript).

[官方 JavaScript 语言规范](https://en.wikipedia.org/wiki/ECMAScript)

Not all browsers support the latest ECMAScript standard, but you can use a [transpiler](guide/glossary#transpile) (like [TypeScript](guide/glossary#typescript)) to write code using the latest features, which will then be transpiled to code that runs on versions that are supported by browsers. 

并不是所有浏览器都支持最新的 ECMAScript 标准，不过你可以使用[转译器](guide/glossary#transpile)（比如[TypeScript](guide/glossary#typescript)）来用最新特性写代码，然后它会被转译成可以在浏览器的其它版本上运行的代码。

To learn more, see the [Browser Support](guide/browser-support) page.

要了解更多，参见[浏览器支持](guide/browser-support)页。

{@a element}

## Element

## 元素（Element）

Angular defines an `ElementRef` class to wrap render-specific native UI elements. This allows you use Angular templates and  data-binding to access DOM elements without reference to the native element in most cases.

Angular 定义了 `ElementRef` 类来包装与渲染有关的原生 UI 元素。这让你可以在大多数情况下使用 Angular 的模板和数据绑定机制来访问 DOM 元素，而不必再引用原生元素。

The documentation generally refers to either elements (`ElementRef` instances) or  DOM elements (which could be accessed directly if necessary).

本文档中一般会使用**元素（Element）**来指代 `ElementRef` 的实例，而用 **DOM 元素**来指代直接访问的 DOM。

Compare [Custom element](guide/glossary#custom-element).

可以对比下[自定义元素](guide/glossary#custom-element)。

## Entry point

## 入口点（Entry Point）

A JavaScript symbol that makes parts of an npm package available for import by other code. 
The Angular [scoped packages](guide/glossary#scoped-package) each have an entry point named `index`.

JavaScript 的 ID 用来让这段代码成为 NPM 包的一部分，从而让其它代码能导入它。
Angular 的每个[范围化的包](guide/glossary#scoped-package)都有一个名叫 `index` 的入口点。

Within Angular, use [NgModules](guide/glossary#ngmodule) to achieve the same result.

在 Angular 领域中，[NgModules](guide/glossary#ngmodule) 起到同样的作用。

{@a F}

{@a G}

{@a H}

{@a I}

{@a injectable}

## Injectable

An Angular class or other definition that provides a dependency using the [dependency injection](guide/glossary#di) mechanism. An injectable class is marked by the `@Injectable` [decorator](guide/glossary#decorator).

Angular 中的类或其它概念使用[依赖注入](guide/glossary#di)机制来提供依赖。要用 `@Injectable` [装饰器](guide/glossary#decorator)标出可注入的类。

Both a [service](guide/glossary#service) and a [component](guide/glossary#component) that depends on that service must be marked as injectable. Other items, such as constant values, can be injectable.

无论[服务](guide/glossary#service)还是[组件](guide/glossary#component)，只要它们依赖服务，就必须标记为可注入的（可作为注入目标的）。其它内容（比如常量）也可以作为注入源。

{@a injector}

## Injector

## 注入器 (injector)

An object in the Angular [dependency-injection system](guide/glossary#dependency-injection)
that can find a named dependency in its cache or create a dependency
using a configured [provider](guide/glossary#provider). 
Injectors are created for NgModules automatically as part of the bootstrap process
and are inherited through the component hierarchy.

Angular [依赖注入系统](guide/glossary#dependency-injection)中可以在缓存中根据名字查找依赖，也可以通过配置过的[提供商](guide/glossary#provider)来创建依赖。
启动过程中会自动为每个模块创建一个注入器，并被组件树继承。


* An injector provides a singleton instance of a dependency, and can inject this same instance in multiple components.

   注入器会提供依赖的一个单例，并把这个单例对象注入到多个组件中。

* A hierarchy of injectors at the NgModule and component level can provide different instances of a dependency to their own components and child components.

   模块和组件级别的注入器树可以为它们拥有的组件及其子组件提供同一个依赖的不同实例。

* You can configure injectors with different providers that can provide different implementations of the same dependency.

   你可以为同一个依赖使用不同的提供商来配置这些注入器，这些提供商可以为依赖提供不同的实现。

Learn more about the injector hierarchy in the [Dependency Injection guide](guide/hierarchical-dependency-injection).

要了解关于多级注入器的更多知识，参见[依赖注入](guide/hierarchical-dependency-injection)一章。

## Input

## 输入属性 (input)

When defining a [directive](guide/glossary#directive), the `@Input` decorator on a directive property makes that property available as a *target* of a
[property binding](guide/template-syntax#property-binding).
Data values flow into an input property from the data source identified
in the [template expression](guide/glossary#template-expression) to the right of the equal sign.

当定义[指令](guide/glossary#directive)时，指令属性上的 `@Input` 装饰器让该属性可以作为[属性绑定](guide/template-syntax#property-binding)的*目标*使用。
数据值会从等号右侧的[模板表达式](guide/glossary#template-expression)所指定的数据源流入组件的输入属性。

To learn more, see [input and output properties](guide/template-syntax#inputs-outputs).

要了解更多，参见[输入与输出属性](guide/template-syntax#inputs-outputs)。

## Interpolation

## 插值表达式 (interpolation)

A form of [property data binding](guide/glossary#data-binding) in which a
[template expression](guide/glossary#template-expression) between double-curly braces
renders as text.  That text can be concatenated with neighboring text
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

## JavaScript

See [ECMAScript](guide/glossary#ecma), [TypeScript](guide/glossary#typescript).

参见 [ECMAScript](guide/glossary#ecma) 和 [TypeScript](guide/glossary#typescript)。

{@a jit}

## Just-in-time (JIT) compilation

## 即时 (just-in-time, JIT) 编译

The Angular Just-in-Time (JIT) compiler converts your Angular HTML and TypeScript code into efficient JavaScript code at run time, as part of bootstrapping. 
JIT compilation is the default when you run Angular's `ng build` and `ng serve` CLI commands, and is a good choice during development. JIT mode is strongly discouraged for production use because it results in large application payloads that hinder the bootstrap performance.

在启动期间，Angular 的即时编译器（JIT)会在运行期间把你的 HTML 和 TypeScript 代码转换成高效的 JavaScript 代码。
当你运行 Angular 的 CLI 命令 `ng build` 和 `ng serve` 时，JIT 编译是默认选项，而且是开发期间的最佳实践。但是强烈建议你不要在生产环境下使用 JIT 模式，因为它会导致巨大的应用负担，从而拖累启动时的性能。

Compare [ahead-of-time (AOT) compilation](guide/glossary#aot).

参见 [预先 (AOT) 编译](guide/glossary#aot)。

{@a K}

{@a L}

{@a lazy-load}

## Lazy loading

## 惰性加载（Lazy loading）

Lazy loading speeds up application load time by splitting the application into multiple bundles and loading them on demand. 
For example, dependencies can be lazy-loaded as needed&emdash;as opposed to "eager-loaded" modules that are required by the root module, and are thus loaded on launch. 
Similarly, the [router](guide/glossary#router) can load child views only when the parent view is activated, and you can build custom elements that can be loaded into an Angular app when needed.

惰性加载会把应用拆分成多个包并且按需加载它们，从而提高应用加载速度。
比如，一些依赖可以根据需要进行惰性加载，与之相对的是那些 "急性加载" 的模块，它们是根模块所要用的，因此会在启动期间加载。
同样，[路由器](guide/glossary#router)只有当父视图激活时才需要加载子视图，你还可以构建一些自定义元素，它们也可以在需要时才加载进 Angular 应用。

{@a library}

## Library

## 库（Library）

In Angular, a [project](guide/glossary#project) that provides functionality that can be included in other Angular apps. A library is not a complete Angular app, and it cannot run independently. 

一种 Angular [项目](guide/glossary#project)。用来让其它 Angular 应用包含它，以提供各种功能。库不是一个完整的 Angular 应用，不能独立运行。

* Library developers can use the [CLI](guide/glossary#cli) to `generate` scaffolding for a new library in an existing [workspace](guide/glossary#workspace), and can publish a library as an `npm` package. 

  库的开发者可以使用 [CLI](guide/glossary#cli) 在现有的 [工作空间](guide/glossary#workspace) 中 `generate` 新库的脚手架，还能把库发布为 `npm` 包。

* App developers can use the [CLI](guide/glossary#cli) to `add` a published library for use with an app in the same [workspace](guide/glossary#workspace). 

   应用开发者可以使用 [CLI](guide/glossary#cli) 来把一个已发布的库 `add` 进这个应用所在的[工作空间](guide/glossary#workspace)。

## Lifecycle hook

## 生命周期钩子（Lifecycle hook）

An interface that allows you to tap into the lifecycle of [directives](guide/glossary#directive) and [components](guide/glossary#component) as they are created, updated, and destroyed.

一种接口，它允许你监听[指令](guide/glossary#directive)和[组件](guide/glossary#component)的生命周期，比如创建、更新和销毁等。

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

To learn more, see the [Lifecycle Hooks](guide/lifecycle-hooks) page.

要了解更多，参见[生命周期钩子](guide/lifecycle-hooks)页。

{@a M}

## Module

## 模块 (module)

In general, a module collects a block of code dedicated to a single purpose. Angular uses standard JavaScript modules, and also defines an Angular module, `NgModule`. 

通常，模块会收集一组专注于单一目的的代码块。Angular 既使用 JavaScript 的标准模块，也定义了 Angular 自己的模块，也就是 `NgModule`。

In JavaScript (ECMAScript), each file is a module and all objects defined in the file belong to that module. Objects can exported, making them public, and public objects can be imported for use by other modules.

在 JavaScript (ECMAScript) 中，每个文件都是一个模块，该文件中定义的所有对象都属于这个模块。这些对象可以导出为公共对象，而这些公共对象可以被其它模块导入后使用。

Angular ships as a collection of JavaScript modules, or libraries. Each Angular library name begins with the `@angular` prefix. Install them with the npm package manager and import parts of them with JavaScript `import` declarations.

Angular 就是用一组 JavaScript 模块（或叫库）的形式发布的。每个 Angular 库都带有 `@angular` 前缀。
使用 NPM 包管理器安装它们，并且使用 JavaScript 的 `import` 声明语句从中导入各个部件。

Compare the Angular [NgModule](guide/glossary#ngmodule).

参见 Angular [NgModule](guide/glossary#ngmodule)。

{@a N}

{@a ngmodule}

## NgModule

A class definition with an `@NgModule` [decorator](guide/glossary#decorator), that declares and serves as a manifest for a block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.

一种带有 `@NgModule` [装饰器](guide/glossary#decorator)的类定义，它会声明并提供一组专注于特定功能的代码块，比如业务领域、工作流或一组紧密相关的能力集等。

Like a [JavaScript module](guide/glossary#module), an NgModule can export functionality for use by other NgModules, and import public functionality from other NgModules.

像 [JavaScript 模块](guide/glossary#module)一样，NgModule 能导出那些可供其它 NgModule 使用的功能，也可以从其它 NgModule 中导入其公开的功能。

The metadata for an NgModule class collects components, directives, and pipes that the application uses along with the list of imports and exports. See also [Declarable](guide/glossary#declarable).

NgModule 类的元数据中包括一些供应用使用的组件、指令和管道，以及导入、导出列表。参见[可声明对象](guide/glossary#declarable)。

NgModules are typically named after the file in which the exported thing is defined; for example, the Angular [DatePipe](api/common/DatePipe) class belongs to a feature module named `date_pipe` in the file `date_pipe.ts`. You import them from an Angular [scoped package](guide/glossary#scoped-package) such as `@angular/core`.

NgModule 通常会根据它导出的内容决定其文件名，比如，Angular 的 [DatePipe](api/common/DatePipe) 类就属于 `date_pipe.ts` 文件中一个名叫 `date_pipe` 的特性模块。
你可以从 Angular 的[范围化包](guide/glossary#scoped-package)中导入它们，比如 `@angular/core` 。

Every Angular application has a root module. By convention, the class is called `AppModule` and resides in a file named `app.module.ts`.

每个 Angular 应用都有一个根模块。通常，这个类会命名为 `AppModule`，并且位于一个名叫 `app.module.ts` 的文件中。

To learn more, see the [NgModules](guide/ngmodules) guide.

要了解更多，参见 [NgModules](guide/ngmodules)。

{@a O}

{@a observable}

## Observable

## Observable（可观察对象）

A producer of multiple values, which it pushes to [subscribers](guide/glossary#subscriber). Used for asynchronous event handling throughout Angular. You execute an observable by subscribing to it with its `subscribe()` method, passing callbacks for notifications of new values, errors, or completion. 

一个多值生成器，这些值会被推送给[订阅者](guide/glossary#subscriber)。
Angular 中到处都会用到异步事件处理。你要通过调用可观察对象的 `subscribe()` 方法来订阅它，从而让这个可观察对象得以执行，你还要给该方法传入一些回调函数来接收 "有新值"、"错误" 或 "完成" 等通知。

Observables can deliver single or multiple values of any type to subscribers, either synchronously (as a function delivers a value to its caller), or on a schedule. A subscriber receives notification of new values as they are produced, and of either error or normal completion. 

可观察对象可以把任意类型的一个或多个值传给订阅者，无论是同步（就像函数把值返回给它的调用者一样）还是异步。
一旦生成了新值，订阅者就会收到通知，并且还会收到错误或正常完成的通知。

Angular uses a third-party library called [Reactive Extensions (RxJS)](http://reactivex.io/rxjs/). 

Angular 使用一个名叫[响应式扩展 (RxJS)](http://reactivex.io/rxjs/)的第三方包来实现这些功能。

To learn more, see the [Observables](guide/observables) guide.

要了解更多，参见[可观察对象](guide/observables)。

{@a observer}

## Observer

## 观察者（Observer）

An object passed to the `subscribe()` method for an [observable](guide/glossary#observable) that defines the callbacks for the [subscriber](guide/glossary#subscriber).

传给[可观察对象](guide/glossary#observable) 的 `subscribe()` 方法的一个对象，其中定义了[订阅者](guide/glossary#subscriber)的一组回调函数。

## Output

## 输出属性 (output)

When defining a [directive](guide/glossary#directive), the `@Output` decorator on a directive property makes that property available as a *target* of [event binding](guide/template-syntax#event-binding).

当定义[指令](guide/glossary#directive)时，指令属性上的 `@Output` 装饰器会让该属性可用作[事件绑定](guide/template-syntax#event-binding)的*目标*。

Events stream *out* of this property to the receiver identified
in the [template expression](guide/glossary#template-expression) to the right of the equal sign.

事件从该属性流*出*到等号右侧指定的[模板表达式](guide/glossary#template-expression)中。

To learn more, see [input and output properties](guide/template-syntax#inputs-outputs).

要了解更多，参见[输入与输出属性](guide/template-syntax#inputs-outputs)。

{@a P}

## Pipe

## 管道 (pipe)

A class with the `@Pipe` decorator which defines a function that transforms input values to output values for display in a [view](guide/glossary#view).

一个带有 `@Pipe` 装饰器的类，它定义了一个函数，用来把输入值转换成输出值，以显示在[视图](guide/glossary#view)中。

Angular defines various pipes, and you can define new pipes.

Angular 定义了很多管道，并且你还可可以自定义新的管道。

To learn more, see the [pipes](guide/pipes) page.

要了解更多，参见[管道](guide/pipes)页。

## Polyfill

## 腻子脚本（polyfill）

An [npm package](guide/npm-packages) that plugs gaps in a browser's JavaScript implementation. See the [Browser Support](guide/browser-support) guide for polyfills that support particular functionality for particular platforms. 

一个 [NPM 包](guide/npm-packages)，它负责弥补浏览器 JavaScript 实现与最新标准之间的 "缝隙"。参见[浏览器支持](guide/browser-support)页，以了解要在特定平台支持特定功能时所需的腻子脚本。

{@a project}

## Project

## 项目（Project）

In Angular, a folder within a [workspace](guide/glossary#workspace) that contains an Angular app or [library](guide/glossary#library). A workspace can contain multiple projects. All apps in a workspace can use libraries in the same workspace.

在 Angular 中，是指[工作空间](guide/glossary#workspace)中的一个文件夹，它包含 Anuglar 应用或[库](guide/glossary#library)。
每个工作空间中可以包含多个项目。工作空间中的每个应用都可以使用同一工作空间中的任意库。

## Provider

## 提供商 (provider)

A provider of an injectable service&mdash;specifically, a code recipe associated with a [DI token](guide/glossary#token), which an [injector](guide/glossary#injector) uses to create a new instance of a dependency for a class that requires it.

一种可注入服务的提供商。更准确的说是一个与 [DI 令牌](guide/glossary#token)相关的代码 "菜谱"，[注入器](guide/glossary#injector)会使用这个菜谱来创建它所依赖的那些类的实例。

Angular registers its own providers with every injector, for services that Angular defines. You can register your own providers for services that your app needs.

Angular 会为其自带的服务在每个注入器中注册它自己的提供商。你也可以自己注册应用所需的自己的服务提供商。

See also [Service](guide/glossary#service), [Dependency Injection](guide/glossary#di).

参见[服务](guide/glossary#service)和[依赖注入](guide/glossary#di)。

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

A tool that configures and implements navigation among states and [views](guide/glossary#view) within an Angular app.

一种工具，用来配置和实现 Angular 应用中各个状态和[视图](guide/glossary#view)之间的导航。

The Router module is an [NgModule](guide/glossary#ngmodule) that provides the necessary service providers and directives for navigating through application views. A [routing component](guide/glossary#routing-component) is one that imports the Router module and whose template contains a `RouterOutlet` element where it can display views produced by the router.

路由器模块是一个 [NgModule](guide/glossary#ngmodule)，它提供在应用视图间导航时需要的服务提供商和指令。[路由组件](guide/glossary#routing-component)是一种组件，它导入了路由模块，并且其模板中包含 `RouterOutlet` 元素，路由器生成的视图就会被显示在那里。

The Router defines navigation among views on a single page, as opposed to navigation among pages. It interprets URL-like links to determine which views to create or destroy, and which components to load or unload. It allows you to take advantage of [lazy-loading](guide/glossary#lazy-load) in your Angular apps.

路由器定义了在单页面中的各个视图之间导航的方式，而不是在页面之间。它会解释类似 URL 的链接，以决定该创建或销毁哪些视图，以及要加载或卸载哪些组件。它让你可以在 Angular 应用中获得[惰性加载](guide/glossary#lazy-load)的好处。

To learn more, see the [Routing & Navigation](guide/router) guide.

要了解更多，参见[路由与导航](guide/router)。

## Router module

## 路由器模块 (router module)

A separate [NgModule](guide/glossary#ngmodule) that provides the necessary service providers and directives for navigating through application views.

一个独立的 [Angular 模块](guide/glossary#ngmodule)，用来提供导航所需的服务提供商和指令。

For more information, see the [Routing & Navigation](guide/router) page.

更多信息，见[路由与导航](guide/router)。

## Router outlet

## 路由出口

A directive that acts as a placeholder in a routing component's template, which Angular dynamically fills based on the current router state.

一种指令，它在路由组件的模板中充当占位符的角色，Angular 会根据当前的路由状态动态填充它。

## Routing component

## 路由组件 (routing component)

An Angular [component](guide/glossary#component) with a `RouterOutlet` that displays views based on router navigations.

一个带有 RouterOutlet 的 Angular [组件](guide/glossary#component)，根据路由器导航来显示视图。

For more information, see the [Routing & Navigation](guide/router) page.

更多信息，见[路由与导航](guide/router)。

{@a S}

{@a schematic}

## Schematic

A scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code. 

The Angular [CLI](guide/glossary#cli) uses schematics to generate and modify [Angular projects](guide/glossary#project) and parts of projects.

* Angular provides a set of schematics for use with the CLI. 
For details, see [Angular CLI documentation].(https://github.com/angular/angular-cli/wiki).

* Library developers can create schematics that enable the CLI to generate their published libraries.
For more information, see https://www.npmjs.com/package/@angular-devkit/schematics. 


## Scoped package

## 范围化包 (scoped package)

A way to group related npm packages. 
NgModules are delivered within *scoped packages* whose names begin with the Angular *scope name* `@angular`. For example, `@angular/core`, `@angular/common`, `@angular/forms`, and `@angular/router`.

一种把相关的 NPM 包分组到一起的方式。
Angular 的 NgModule 都是在一些以 `@angular` 为范围名的*范围化包*中发布的。比如 `@angular/core`、`@angular/common`、`@angular/forms` 和 `@angular/router`。

Import a scoped package in the same way that you import a normal package. 

和导入普通包相同的方式导入范围化包。

<code-example path="architecture/src/app/app.component.ts" linenums="false" title="architecture/src/app/app.component.ts (import)" region="import">

</code-example>

## Service

## 服务 (service)

In Angular, a service is a class with the [@Injectable](guide/glossary#injectable) decorator that encapsulates non-UI logic and code that can be re-used across an application. 
Angular distinguishes components from services in order to increase modularity and reusability.

在 Angular 中，服务就是一个带有 [@Injectable](guide/glossary#injectable) 装饰器的类，它封装了可以在应用程序中复用的非 UI 逻辑和代码。
Angular 把组件和服务分开，是为了增进模块化程度和可复用性。

The `@Injectable` metadata allows the service class to be used with the [dependency injection](guide/glossary#di) mechanism. The injectable class is instantiated by a [provider](guide/glossary#provider), and a module maintains a list of providers that can provide a particular type of service as needed by components or other services that require it.

`@Injectable` 元数据让服务类能用于[依赖注入](guide/glossary#di)机制中。可注入的类是用[提供商](guide/glossary#provider)进行实例化的，模块中包含一个提供商列表，它可以为依赖它的组件或其它服务提供该服务的具体类。

To learn more, see [Introduction to Services](guide/architecture-services).

要了解更多，参见[服务简介](guide/architecture-services)。

{@a structural-directive}

{@a structural-directives}

## Structural directives

## 结构型指令（Structural directives）

A category of [directive](guide/glossary#directive) that is responsible for shaping or reshaping HTML layout by modifying the DOM (adding, removing, or manipulating elements and their children).

一种[指令](guide/glossary#directive)类型，它能通过修改 DOM （添加、删除或操纵元素及其子元素）来修整或重塑 HTML 的布局。

To learn more, see the [Structural Directives](guide/structural-directives) page.

要了解更多，参见[结构型指令](guide/structural-directives)页。

{@a subscriber}

## Subscriber

## 订阅者（Subscriber）

A function that defines how to obtain or generate values or messages to be published. This function is executed when a consumer calls the `subscribe()` method of an [observable](guide/glossary#observable).

一个函数，用于定义如何获取或生成要发布的值或消息。
当有消费者调用[可观察对象](guide/glossary#observable)的 `subscribe()` 方法时，该函数就会执行。

The act of subscribing to an observable triggers its execution, associates callbacks with it, and creates a `Subscription` object that lets you unsubscribe.

订阅一个可观察对象就会触发该对象的执行、为该对象关联一些回调函数，并创建一个 `Subscription`（订阅记录）对象来让你能取消订阅。

The `subscribe()` method takes a JavaScript object (called an "observer") with up to three callbacks, one for each type of notification that an observable can deliver:

`subscribe()` 方法接收一个 JavaScript 对象（叫做 "观察者"），其中最多可以包含三个回调，分别对应可观察对象可以发出的几种通知类型：

- The `next` notification: sends a value such as a Number, a String, an Object, etc.

   `next`（下一个）通知会发送一个值，比如数字、字符串、对象等。

- The `error` notification sends a JavaScript Error or exception.

   `error`（错误）通知会发送 JavaScript 错误或异常。

- The `complete` notification does not send a value, but the handler is called when the call completes. Scheduled values can continue to be returned after the call completes.

   `complete`（完成）通知不会发送值，但是当调用结束时会调用这个处理器。异步的值可能会在调用了完成之后继续发送过来。

{@a T}

## Template

## 模板 (template)

A template defines how to render a component's [view](guide/glossary#view) in HTML  

模板用来定义如何在 HTML 中渲染组件的[视图](guide/glossary#view)。

A template combines straight HTML with Angular [data-binding](guide/glossary#data-binding) syntax, [directives](guide/glossary#directive),  and [template expressions](guide/glossary#template-expression) (logical constructs). The Angular elements insert or calculate values that modify the HTML elements before the page is displayed.

模板会把纯 HTML 和 Angular 的[数据绑定](guide/glossary#data-binding)语法、[指令](guide/glossary#directive)和[模板表达式](guide/glossary#template-expression)组合起来。Angular 的元素会插入或计算那些值，以便在页面显示出来之前修改 HTML 元素。

A template is associated with a [component](guide/glossary#component) class through `@Component` [decorator](guide/glossary#decorator). The HTML can be provided inline, as the value of the `template` property, or in a separate HTML file linked through the `templateUrl` property. 

模板通过 `@Component` [装饰器](guide/glossary#decorator)与[组件](guide/glossary#component)类关联起来。其 HTML 可以作为 `template` 属性的值用内联的方式提供，也可以通过 `templateUrl` 属性链接到一个独立的 HTML 文件。

Additional templates, represented by a `TemplateRef` object, can define alternative or _embedded_ views, which can be referenced from multiple components.

用 `TemplateRef` 对象表示的其它模板用来定义一些备用视图或*内嵌*视图，它们可以来自多个不同的组件。

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

{@a template-expression}

## Template expression

## 模板表达式 (template expression)

A TypeScript-like syntax that Angular evaluates within
a [data binding](guide/glossary#data-binding).

Angular 用来在[数据绑定 (data binding)](guide/glossary#data-binding)内求值的、**类似**JavaScript 语法的表达式。

Read about how to write template expressions
in the [Template expressions](guide/template-syntax#template-expressions) section
of the [Template Syntax](guide/template-syntax) page.

到[模板语法](guide/template-syntax)一章的[模板表达式](guide/template-syntax#template-expressions)部分了解更多模板表达式的知识。

{@a token}

## Token

## 令牌（Token）

An opaque identifier used for efficient table lookup. In Angular, a [DI token](guide/glossary#di-token) is used to find [providers](guide/glossary#provider) of dependencies in the [dependency injection](guide/glossary#di) system.

用于高效查表的不透明标识符（译注：不透明是指你不必了解其细节）。在 Angular 中，[DI 令牌](guide/glossary#di-token)用于在[依赖注入](guide/glossary#di)系统中查找[服务提供商](guide/glossary#provider)。

{@a transpile}

## Transpile

## 转译（transpile)

The translation process that tranforms one version of JavaScript to another version; for example, down-leveling ES2015 to the older ES5 version.

一种翻译过程，它会把一个版本的 JavaScript 转换成另一个版本，比如把下一版的 ES2015 转换成老版本的 ES5。

{@a typescript}

## TypeScript

## TypeScript 语言

TypeScript is a programming language notable for its optional typing system, which provides
compile-time type checking and strong tooling support (such as
code completion, refactoring, inline documentation, and intelligent search). Many code editors
and IDEs support TypeScript either natively or with plug-ins.

TypeScript 是一种程序设计语言，以其可选类型系统著称。
该类型系统提供了编译时类型检查和强大的工具支持（比如代码补齐、重构、内联文档和智能搜索等）。
许多代码编辑器和 IDE 都原生支持 TypeScript 或通过插件提供支持。

TypeScript is the preferred language for Angular development. Read more about TypeScript at [typescriptlang.org](http://www.typescriptlang.org/).

TypeScript 是 Angular 的首选语言。要了解更多，参见 [typescriptlang.org](http://www.typescriptlang.org/)。

{@a U}

{@a V}

## View

## 视图 (view)

A view is the smallest grouping of display elements that can be created and destroyed together. 

视图是指显示元素的最小分组单位，它们会被同时创建和销毁。

Angular renders a view under the control of one or more [directives](guide/glossary#directive),
especially  [component](guide/glossary#component) directives and their companion [templates](guide/glossary#template). 

Angular 在一个或多个[指令 (directive)](guide/glossary#directive) 的控制下渲染视图，
尤其是[组件 (component)](guide/glossary#component) 指令及其[模板 (template)](guide/glossary#template)。

A view is specifically represented by a `ViewRef` instance associated with the component. 
A view that belongs to a component is called a  _host view_. 
Views are typically collected into [view hierarchies](guide/glossary#view-tree). 

具体实现上，视图由一个与该组件相关的 `ViewRef` 实例表示。
属于某个组件的视图叫做*宿主视图*。
通常会把视图组织成一些[视图树（view hierarchies）](guide/glossary#view-tree)。

Properties of elements in a view can change dynamically, in response to user actions; the structure (number and order) of elements in a view cannot. You can change the structure of elements by inserting, moving, or removing nested views within their view containers.

视图中各个元素的属性可以动态修改以响应用户的操作，而这些元素的结构（数量或顺序）则不能。你可以通过在它们的视图容器中插入、移动或移除内嵌视图来修改这些元素的结构。

View hierarchies can be loaded and unloaded dynamically as the user navigates through the application, typically under the control of a [router](guide/glossary#router).

当用户在应用中导航时（比如使用[路由器](guide/glossary#router)），视图树可以动态加载或卸载。

{@a view-tree}

## View hierarchy

## 视图树（View hierarchy）

A tree of related views that can be acted on as a unit. The root view is a component's _host view_.  A host view can be the root of a tree of _embedded views_, collected in a _view container_ (`ViewContainerRef`) attached to an anchor element in the hosting component. The view hierarchy is a key part of Angular change detection. 

一棵相关视图的树，它们可以作为一个整体行动。其根视图就是组件的*宿主视图*。宿主视图可以是*内嵌视图*树的根，它被收集到了宿主组件上的一个*视图容器（`ViewContainerRef`）*中<!-- 再校对 -->。视图树是 Angular 变更检测的关键部件之一。

The view hierarchy does not imply a component hierarchy. Views that are embedded in the context of a particular hierarchy can be host views of other components. Those components can be in the same NgModule as the hosting component, or belong to other NgModules.

视图树和组件树并不是一一对应的。那些嵌入到指定视图树上下文中的视图也可能是其它组件的宿主视图。那些组件可能和宿主组件位于同一个 NgModule 中，也可能属于其它 NgModule。

{@a W}

## Web component

## Web 组件

See [Custom element](guide/glossary#custom-element)

参见[自定义元素](guide/glossary#custom-element)

{@a workspace}

## Workspace

## 工作空间（Workspace）

In Angular, a folder that contains [projects](guide/glossary#project) (that is, apps and libraries).
The [CLI](guide/glossary#cli) `new` command creates a workspace to contain projects. Commands such as `add` and `generate`, that create or operate on apps and libraries, must be executed from within a workspace folder. 

在 Angular 中，是指一个包含[项目](guide/glossary#project)（即应用和库）的文件夹。
[CLI](guide/glossary#cli) 的 `new` 命令会创建一个包含项目的工作空间。而用来创建或操作应用和库的 `add` 和 `generate` 命令必须在工作空间目录下才能执行。

{@a X}

{@a Y}

{@a Z}

## Zone

## 区域 (zone)

An execution context for a set of asynchronous tasks. Useful for debugging, profiling, and testing apps that include asynchronous operations such as event processing, promises, and calls to remote servers.

一组异步任务的执行上下文。它对于调试、性能分析和测试那些包含了异步操作（如事件处理、承诺、远程服务器调用等）的应用是非常有用的。

An Angular app runs in a zone where it can respond to asynchronous events by checking for data changes and updating the information it displays by resolving [data bindings](guide/glossary#data-binding).

Angular 应用会运行在一个 Zone 区域中，在这里，它可以对异步事件做出反应，可以通过检查数据变更、利用[数据绑定 (data bindings)](guide/glossary#data-binding) 来更新信息显示。

A zone client can take action before and after an async operation completes. 

Zone 的使用方可以在异步操作完成之前或之后采取行动。

Learn more about zones in this
[Brian Ford video](https://www.youtube.com/watch?v=3IqtmUscE_U).

要了解更多，参见 [Brian Ford 的视频](https://www.youtube.com/watch?v=3IqtmUscE_U)。
