# Upgrading from AngularJS to Angular

# 从 AngularJS 升级到 Angular

_Angular_ is the name for the Angular of today and tomorrow.<br />
_AngularJS_ is the name for all 1.x versions of Angular.

*Angular* 这个名字专指现在和未来的 Angular 版本，而 *AngularJS* 专指 Angular 的所有 1.x 版本。

AngularJS apps are great.
Always consider the business case before moving to Angular.
An important part of that case is the time and effort to get there.
This guide describes the built-in tools for efficiently migrating AngularJS projects over to the
Angular platform, a piece at a time.

有很多大型 AngularJS 应用。
在决定迁移到 Angular 之前，首先要深入思考业务案例。
在这些案例中，最重要的部分之一是时间和需要付出的努力。
本章描述用于把 AngularJS 应用高效迁移到 Angular 平台的内置工具，每次讲一点点。

Some applications will be easier to upgrade than others, and there are
many ways to make it easier for yourself. It is possible to
prepare and align AngularJS applications with Angular even before beginning
the upgrade process. These preparation steps are all about making the code
more decoupled, more maintainable, and better aligned with modern development
tools. That means in addition to making the upgrade easier,
you will also improve the existing AngularJS applications.

有些应用可能比其它的升级起来简单，还有一些方法能让把这项工作变得更简单。
即使在正式开始升级过程之前，可以提前准备 AngularJS 的程序，让它向 Angular 看齐。
这些准备步骤几乎都是关于如何让代码更加松耦合、更有可维护性，以及用现代开发工具提高速度的。
这意味着，这种准备工作不仅能让最终的升级变得更简单，而且还能提升 AngularJS 程序的质量。

One of the keys to a successful upgrade is to do it incrementally,
by running the two frameworks side by side in the same application, and
porting AngularJS components to Angular one by one. This makes it possible
to upgrade even large and complex applications without disrupting other
business, because the work can be done collaboratively and spread over
a period of time. The `upgrade` module in Angular has been designed to
make incremental upgrading seamless.

成功升级的关键之一是增量式的实现它，通过在同一个应用中一起运行这两个框架，并且逐个把 AngularJS 的组件迁移到 Angular 中。
这意味着可以在不必打断其它业务的前提下，升级更大、更复杂的应用程序，因为这项工作可以多人协作完成，在一段时间内逐渐铺开。
Angular `upgrade` 模块的设计目标就是让你渐进、无缝的完成升级。

## Preparation

## 准备工作

There are many ways to structure AngularJS applications. When you begin
to upgrade these applications to Angular, some will turn out to be
much more easy to work with than others. There are a few key techniques
and patterns that you can apply to future proof apps even before you
begin the migration.

AngularJS 应用程序的组织方式有很多种。当你想把它们升级到 Angular 的时候，
有些做起来会比其它的更容易些。即使在开始升级之前，也有一些关键的技术和模式可以让你将来升级时更轻松。

{@a follow-the-angular-styleguide}

### Follow the AngularJS Style Guide

### 遵循 AngularJS 风格指南

The [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
collects patterns and practices that have been proven to result in
cleaner and more maintainable AngularJS applications. It contains a wealth
of information about how to write and organize AngularJS code - and equally
importantly - how **not** to write and organize AngularJS code.

[AngularJS 风格指南](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)收集了一些已证明能写出干净且可维护的 AngularJS 程序的模式与实践。
它包含了很多关于如何书写和组织 AngularJS 代码的有价值信息，同样重要的是，**不应该**采用的书写和组织 AngularJS 代码的方式。

Angular is a reimagined version of the best parts of AngularJS. In that
sense, its goals are the same as the AngularJS Style Guide's: To preserve
the good parts of AngularJS, and to avoid the bad parts. There's a lot
more to Angular than just that of course, but this does mean that
*following the style guide helps make your AngularJS app more closely
aligned with Angular*.

Angular 是一个基于 AngularJS 中最好的部分构思出来的版本。在这种意义上，它的目标和 AngularJS 风格指南是一样的：
保留 AngularJS 中好的部分，去掉坏的部分。当然，Angular 还做了更多。
说这些的意思是：*遵循这个风格指南可以让你写出更接近 Angular 程序的 AngularJS 程序*。

There are a few rules in particular that will make it much easier to do
*an incremental upgrade* using the Angular `upgrade/static` module:

有一些特别的规则可以让使用 Angular 的 `upgrade/static` 模块进行*增量升级*变得更简单：

* The [Rule of 1](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)
  states that there should be one component per file. This not only makes
  components easy to navigate and find, but will also allow us to migrate
  them between languages and frameworks one at a time. In this example application,
  each controller, component, service, and filter is in its own source file.

   [单一规则](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)
  规定每个文件应该只放一个组件。这不仅让组件更容易浏览和查找，而且还让你能逐个迁移它们的语言和框架。
  在这个范例程序中，每个控制器、工厂和过滤器都位于各自的源文件中。

* The [Folders-by-Feature Structure](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)
  and [Modularity](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)
  rules define similar principles on a higher level of abstraction: Different parts of the
  application should reside in different directories and NgModules.

   [按特性分目录的结构](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)和[模块化](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)规则在较高的抽象层定义了一些相似的原则：应用程序中的不同部分应该被分到不同的目录和 NgModule 中。

When an application is laid out feature per feature in this way, it can also be
migrated one feature at a time. For applications that don't already look like
this, applying the rules in the AngularJS style guide is a highly recommended
preparation step. And this is not just for the sake of the upgrade - it is just
solid advice in general!

如果应用程序能用这种方式把每个特性分到一个独立目录中，它也就能每次迁移一个特性。
对于那些还没有这么做的程序，强烈建议把应用这条规则作为准备步骤。而且这也不仅仅对升级有价值，
它还是一个通用的规则，可以让你的程序更“坚实”。

### Using a Module Loader

### 使用模块加载器

When you break application code down into one component per file, you often end
up with a project structure with a large number of relatively small files. This is
a much neater way to organize things than a small number of large files, but it
doesn't work that well if you have to load all those files to the HTML page with
&lt;script&gt; tags. Especially when you also have to maintain those tags in the correct
order. That's why it's a good idea to start using a *module loader*.

当你把应用代码分解到每个文件中只放一个组件的粒度后，通常会得到一个由大量相对较小的文件组成的项目结构。
这比组织成少量大文件要整洁得多，但如果你不得不通过 `<script>` 标签在 HTML 页面中加载所有这些文件，那就不好玩了。
尤其是当你不得不自己按正确的顺序维护这些标签时更是如此，就要开始使用*模块加载器*了。

Using a module loader such as [SystemJS](https://github.com/systemjs/systemjs),
[Webpack](http://webpack.github.io/), or [Browserify](http://browserify.org/)
allows us to use the built-in module systems of TypeScript or ES2015.
You can use the `import` and `export` features that explicitly specify what code can
and will be shared between different parts of the application. For ES5 applications
you can use CommonJS style `require` and `module.exports` features. In both cases,
the module loader will then take care of loading all the code the application needs
in the correct order.

使用模块加载器，比如[SystemJS](https://github.com/systemjs/systemjs)、
[Webpack](http://webpack.github.io/)或[Browserify](http://browserify.org/)，
可以让你在程序中使用 TypeScript 或 ES2015 语言内置的模块系统。
你可以使用 `import` 和 `export` 特性来明确指定哪些代码应该以及将会被在程序的不同部分之间共享。
对于 ES5 程序来说，可以改用 CommonJS 风格的 `require` 和 `module.exports` 特性代替。
无是论哪种情况，模块加载器都会按正确的顺序加载程序中用到的所有代码。

When moving applications into production, module loaders also make it easier
to package them all up into production bundles with batteries included.

当要把应用程序投入生产环境时，模块加载器也会让你把所有这些文件打成完整的产品包变得容易一些。

### Migrating to TypeScript

### 迁移到 TypeScript

If part of the Angular upgrade plan is to also take TypeScript into use, it makes
sense to bring in the TypeScript compiler even before the upgrade itself begins.
This means there's one less thing to learn and think about during the actual upgrade.
It also means you can start using TypeScript features in your AngularJS code.

Angular 升级计划的一部分是引入 TypeScript，即使在开始升级之前，引入 TypeScript 编译器也是有意义的。
这意味着等真正升级的时候需要学习和思考的东西会更少，并且你可以在 AngularJS 代码中开始使用 TypeScript 的特性。

Since TypeScript is a superset of ECMAScript 2015, which in turn is a superset
of ECMAScript 5, "switching" to TypeScript doesn't necessarily require anything
more than installing the TypeScript compiler and renaming files from
`*.js` to `*.ts`. But just doing that is not hugely useful or exciting, of course.
Additional steps like the following can give us much more bang for the buck:

TypeScript 是 ECMAScript 2015 的超集，而 ES2015 又是 ECMAScript 5 的超集。
这意味着除了安装一个 TypeScript 编译器，并把文件名都从 `*.js` 改成 `*.ts` 之外，其实什么都不用做。
当然，如果仅仅这样做也没什么大用，也没什么有意思的地方。
下面这些额外的步骤可以让你打起精神：

* For applications that use a module loader, TypeScript imports and exports
  (which are really ECMAScript 2015 imports and exports) can be used to organize
  code into modules.

   对那些使用了模块加载器的程序，TypeScript 的导入和导出语法(实际上是 ECMAScript 2015 的导入和导出)可以把代码组织成模块。

* Type annotations can be gradually added to existing functions and variables
  to pin down their types and get benefits like build-time error checking,
  great autocompletion support and inline documentation.

   可以逐步把类型注解添加到现有函数和变量上，以固定它们的类型，并获得其优点：比如编译期错误检查、更好的支持自动完成，以及内联式文档等。

* JavaScript features new to ES2015, like arrow functions, `let`s and `const`s,
  default function parameters, and destructuring assignments can also be gradually
  added to make the code more expressive.

   那些 ES2015 中新增的特性，比如箭头函数、`let`、`const`、默认函数参数、解构赋值等也可以逐渐添加进来，让代码更有表现力。

* Services and controllers can be turned into *classes*. That way they'll be a step
  closer to becoming Angular service and component classes, which will make
  life easier after the upgrade.

   服务和控制器可以转成*类*。这样它们就能一步步接近 Angular 的服务和组件类了，也会让升级变得简单一点。

### Using Component Directives

### 使用组件型指令

In Angular, components are the main primitive from which user interfaces
are built. You define the different portions of the UI as components and
compose them into a full user experience.

在 Angular 中，组件是用来构建用户界面的主要元素。你把 UI 中的不同部分定义成组件，然后在模板中使用这些组件合成出最终的 UI。

You can also do this in AngularJS, using *component directives*. These are
directives that define their own templates, controllers, and input/output bindings -
the same things that Angular components define. Applications built with
component directives are much easier to migrate to Angular than applications
built with lower-level features like `ng-controller`,  `ng-include`, and scope
inheritance.

你在 AngularJS 中也能这么做。那就是一种定义了自己的模板、控制器和输入/输出绑定的指令 —— 跟 Angular 中对组件的定义是一样的。
要迁移到 Angular，通过组件型指令构建的应用程序会比直接用 `ng-controller`、`ng-include` 和作用域继承等底层特性构建的要容易得多。

To be Angular compatible, an AngularJS component directive should configure
these attributes:

要与 Angular 兼容，AngularJS 的组件型指令应该配置下列属性：

* `restrict: 'E'`. Components are usually used as elements.

   `restrict: 'E'`。组件通常会以元素的方式使用。

* `scope: {}` - an isolate scope. In Angular, components are always isolated
  from their surroundings, and you should do this in AngularJS too.

   `scope: {}` - 一个独立作用域。在 Angular 中，组件永远是从它们的环境中被隔离出来的，在 AngularJS 中也同样如此。

* `bindToController: {}`. Component inputs and outputs should be bound
  to the controller instead of using the `$scope`.

   `bindToController: {}`。组件的输入和输出应该绑定到控制器，而不是 `$scope`。

* `controller` and `controllerAs`. Components have their own controllers.

   `controller` 和 `controllerAs`。组件要有自己的控制器。

* `template` or `templateUrl`. Components have their own templates.

   `template` 或 `templateUrl`。组件要有自己的模板。

Component directives may also use the following attributes:

组件型指令还可能使用下列属性：

* `transclude: true/{}`, if the component needs to transclude content from elsewhere.

   `transclude: true`：如果组件需要从其它地方透传内容，就设置它。

* `require`, if the component needs to communicate with some parent component's
  controller.

   `require`：如果组件需要和父组件的控制器通讯，就设置它。

Component directives **should not** use the following attributes:

组件型指令**不能**使用下列属性：

* `compile`. This will not be supported in Angular.

   `compile`。Angular 不再支持它。

* `replace: true`. Angular never replaces a component element with the
  component template. This attribute is also deprecated in AngularJS.

   `replace: true`。Angular 永远不会用组件模板替换一个组件元素。这个特性在 AngularJS 中也同样不建议使用了。

* `priority` and `terminal`. While AngularJS components may use these,
  they are not used in Angular and it is better not to write code
  that relies on them.

   `priority` 和 `terminal`。虽然 AngularJS 的组件可能使用这些，但它们在 Angular 中已经没用了，并且最好不要再写依赖它们的代码。

An AngularJS component directive that is fully aligned with the Angular
architecture may look something like this:

AngularJS 中一个完全向 Angular 架构对齐过的组件型指令是这样的：

<code-example path="upgrade-module/src/app/hero-detail.directive.ts" header="hero-detail.directive.ts">
</code-example>

AngularJS 1.5 introduces the [component API](https://docs.angularjs.org/api/ng/type/angular.Module#component)
that makes it easier to define component directives like these. It is a good idea to use
this API for component directives for several reasons:

AngularJS 1.5 引入了[组件 API](https://docs.angularjs.org/api/ng/type/angular.Module)，它让定义指令变得更简单了。
为组件型指令使用这个 API 是一个好主意，因为：

* It requires less boilerplate code.

   它需要更少的样板代码。

* It enforces the use of component best practices like `controllerAs`.

   它强制你遵循组件的最佳实践，比如 `controllerAs`。

* It has good default values for directive attributes like `scope` and `restrict`.

   指令中像 `scope` 和 `restrict` 这样的属性应该有良好的默认值。

The component directive example from above looks like this when expressed
using the component API:

如果使用这个组件 API 进行表示，那么上面看到的组件型指令就变成了这样：

<code-example path="upgrade-module/src/app/upgrade-io/hero-detail.component.ts" region="hero-detail-io" header="hero-detail.component.ts">
</code-example>

Controller lifecycle hook methods `$onInit()`, `$onDestroy()`, and `$onChanges()`
are another convenient feature that AngularJS 1.5 introduces. They all have nearly
exact [equivalents in Angular](guide/lifecycle-hooks), so organizing component lifecycle
logic around them will ease the eventual Angular upgrade process.

控制器的生命周期钩子 `$onInit()`、`$onDestroy()` 和 `$onChanges()` 是 AngularJS 1.5 引入的另一些便利特性。
它们都很像[Angular 中的等价物](guide/lifecycle-hooks)，所以，围绕它们组织组件生命周期的逻辑在升级到 Angular 时会更容易。

## Upgrading with ngUpgrade

## 使用升级适配器进行升级

The ngUpgrade library in Angular is a very useful tool for upgrading
anything but the smallest of applications. With it you can mix and match
AngularJS and Angular components in the same application and have them interoperate
seamlessly. That means you don't have to do the upgrade work all at once,
since there's a natural coexistence between the two frameworks during the
transition period.

不管要升级什么，Angular 中的 `ngUpgrade` 库都会是一个非常有用的工具 —— 除非是小到没功能的应用。
借助它，你可以在同一个应用程序中混用并匹配 AngularJS 和 Angular 的组件，并让它们实现无缝的互操作。
这意味着你不用被迫一次性做完所有的升级工作，因为在整个演进过程中，这两个框架可以很自然的和睦相处。

### How ngUpgrade Works

### 升级模块工作原理

One of the primary tools provided by ngUpgrade is called the `UpgradeModule`.
This is a module that contains utilities for bootstrapping and managing hybrid
applications that support both Angular and AngularJS code.

`ngUpgrade` 提供的主要工具之一被称为 `UpgradeModule`。这是一个服务，它可以启动并管理一个能同时支持 Angular 和 AngularJS 的混合式应用。

When you use ngUpgrade, what you're really doing is *running both AngularJS and
Angular at the same time*. All Angular code is running in the Angular
framework, and AngularJS code in the AngularJS framework. Both of these are the
actual, fully featured versions of the frameworks. There is no emulation going on,
so you can expect to have all the features and natural behavior of both frameworks.

当使用 ngUpgrade 时，你实际上在*同时运行 AngularJS 和 Angular*。所有 Angular 的代码运行在 Angular 框架中，而 AngularJS 的代码运行在 AngularJS 框架中。所有这些都是真实的、全功能的框架版本。
没有进行任何仿真，所以你可以认为同时存在着这两个框架的所有特性和自然行为。

What happens on top of this is that components and services managed by one
framework can interoperate with those from the other framework. This happens
in three main areas: Dependency injection, the DOM, and change detection.

所有这些事情的背后，本质上是一个框架中管理的组件和服务能和来自另一个框架的进行互操作。
这些主要体现在三个方面：依赖注入、DOM 和变更检测。

#### Dependency Injection

#### 依赖注入

Dependency injection is front and center in both AngularJS and
Angular, but there are some key differences between the two
frameworks in how it actually works.

无论是在 AngularJS 中还是在 Angular 中，依赖注入都位于前沿和中心的位置，但在两个框架的工作原理上，却存在着一些关键的不同之处。

<table>
  <tr>

    <th>

      AngularJS

    </th>

    <th>

      Angular

    </th>

  </tr>
  <tr>

    <td>

      Dependency injection tokens are always strings

      依赖注入的令牌(Token)永远是字符串(译注：指服务名称)。

    </td>

    <td>

      Tokens [can have different types](guide/dependency-injection).
      They are often classes. They may also be strings.

      令牌[可能有不同的类型](guide/dependency-injection)。
      通常是类，也可能是字符串。

    </td>

  </tr>
  <tr>

    <td>

      There is exactly one injector. Even in multi-module applications,
      everything is poured into one big namespace.

      只有一个注入器。即使在多模块的应用程序中，每样东西也都会被装入一个巨大的命名空间中。

    </td>

    <td>

      There is a [tree hierarchy of injectors](guide/hierarchical-dependency-injection),
      with a root injector and an additional injector for each component.

      这是一个[树状多层注入器](guide/hierarchical-dependency-injection)：有一个根注入器，而且每个组件也有一个自己的注入器。

    </td>

  </tr>
</table>

Even accounting for these differences you can still have dependency injection
interoperability. `upgrade/static` resolves the differences and makes
everything work seamlessly:

就算有这么多不同点，也并不妨碍你在依赖注入时进行互操作。`UpgradeModule` 解决了这些差异，并让它们无缝的对接：

* You can make AngularJS services available for injection to Angular code
  by *upgrading* them. The same singleton instance of each service is shared
  between the frameworks. In Angular these services will always be in the
  *root injector* and available to all components.

   通过升级它们，你就能让那些在 AngularJS 中能被注入的服务也可用于 Angular 的代码中。
  在框架之间共享的是服务的同一个单例对象。在 Angular 中，这些外来服务总是被放在*根注入器*中，并可用于所有组件。
  它们总是具有*字符串令牌* —— 跟它们在 AngularJS 中的令牌相同。

* You can also make Angular services available for injection to AngularJS code
  by *downgrading* them. Only services from the Angular root injector can
  be downgraded. Again, the same singleton instances are shared between the frameworks.
  When you register a downgraded service, you must explicitly specify a *string token* that you want to
  use in AngularJS.

   通过降级它们，你也能让那些在 Angular 中能被注入的服务在 AngularJS 的代码中可用。
  只有那些来自 Angular 根注入器的服务才能被降级。同样的，在框架之间共享的是同一个单例对象。
  当你注册一个要降级的服务时，要明确指定一个打算在 AngularJS 中使用的*字符串令牌*。

<div class="lightbox">
  <img src="generated/images/guide/upgrade/injectors.png" alt="The two injectors in a hybrid application">
</div>

#### Components and the DOM

#### 组件与 DOM

In the DOM of a hybrid ngUpgrade application are components and
directives from both AngularJS and Angular. These components
communicate with each other by using the input and output bindings
of their respective frameworks, which ngUpgrade bridges together. They may also
communicate through shared injected dependencies, as described above.

在混合式应用中，同时存在来自 AngularJS 和 Angular 中组件和指令的 DOM。
这些组件通过它们各自框架中的输入和输出绑定来互相通讯，它们由 `UpgradeModule` 桥接在一起。
它们也能通过共享被注入的依赖彼此通讯，就像前面所说的那样。

The key thing to understand about a hybrid application is that every element in the DOM is owned by exactly one of the two frameworks.
The other framework ignores it. If an element is
owned by AngularJS, Angular treats it as if it didn't exist,
and vice versa.

理解混合式应用的关键在于，DOM 中的每一个元素都只能属于这两个框架之一，而另一个框架则会忽略它。如果一个元素属于 AngularJS，那么 Angular 就会当它不存在，反之亦然。

So normally a hybrid application begins life as an AngularJS application,
and it is AngularJS that processes the root template, e.g. the index.html.
Angular then steps into the picture when an Angular component is used somewhere
in an AngularJS template. That component's template will then be managed
by Angular, and it may contain any number of Angular components and
directives.

所以，混合式应用总是像 AngularJS 程序那样启动，处理根模板的也是 AngularJS.
然后，当这个应用的模板中使用到了 Angular 的组件时，Angular 才开始参与。
这个组件的视图由 Angular 进行管理，而且它还可以使用一系列的 Angular 组件和指令。

Beyond that, you may interleave the two frameworks.
You always cross the boundary between the two frameworks by one of two
ways:

更进一步说，你可以按照需要，任意穿插使用这两个框架。
使用下面的两种方式之一，你可以在这两个框架之间自由穿梭：

1. By using a component from the other framework: An AngularJS template
   using an Angular component, or an Angular template using an
   AngularJS component.

   通过使用来自另一个框架的组件：AngularJS 的模板中用到了 Angular 的组件，或者 Angular 的模板中使用了 AngularJS 的组件。

2. By transcluding or projecting content from the other framework. ngUpgrade
    bridges the related concepts of AngularJS transclusion and Angular content
    projection together.

   通过透传(transclude)或投影(project)来自另一个框架的内容。`UpgradeModule` 牵线搭桥，把 AngularJS 的透传概念和 Angular 的内容投影概念关联起来。

<div class="lightbox">
  <img src="generated/images/guide/upgrade/dom.png" alt="DOM element ownership in a hybrid application">
</div>

Whenever you use a component that belongs to the other framework, a
switch between framework boundaries occurs. However, that switch only
happens to the elements in the template of that component. Consider a situation
where you use an Angular component from AngularJS like this:

当你使用一个属于另一个框架的组件时，就会发生一次跨框架边界的切换。不过，这种切换只发生在该组件元素的*子节点*上。
考虑一个场景，你从 AngularJS 中使用一个 Angular 组件，就像这样：

<code-example language="html" escape="html">
  &lt;a-component&gt;&lt;/a-component&gt;
</code-example>

The DOM element `<a-component>` will remain to be an AngularJS managed
element, because it's defined in an AngularJS template. That also
means you can apply additional AngularJS directives to it, but *not*
Angular directives. It is only in the template of the `<a-component>`
where Angular steps in. This same rule also applies when you
use AngularJS component directives from Angular.

此时，`<a-component>` 这个 DOM 元素仍然由 AngularJS 管理，因为它是在 AngularJS 的模板中定义的。
这也意味着你可以往它上面添加别的 AngularJS 指令，却*不能*添加 Angular 的指令。
只有在 `<a-component>` 组件的模板中才是 Angular 的天下。同样的规则也适用于在 Angular 中使用 AngularJS 组件型指令的情况。

#### Change Detection

#### 变更检测

The `scope.$apply()` is how AngularJS detects changes and updates data bindings.
After every event that occurs, `scope.$apply()` gets called. This is done either
automatically by the framework, or manually by you.

AngularJS 中的变更检测全是关于 `scope.$apply()` 的。在每个事件发生之后，`scope.$apply()` 就会被调用。
这或者由框架自动调用，或者在某些情况下由你自己的代码手动调用。

In Angular things are different. While change detection still
occurs after every event, no one needs to call `scope.$apply()` for
that to happen. This is because all Angular code runs inside something
called the [Angular zone](api/core/NgZone). Angular always
knows when the code finishes, so it also knows when it should kick off
change detection. The code itself doesn't have to call `scope.$apply()`
or anything like it.

在 Angular 中，事情有点不一样。虽然变更检测仍然会在每一个事件之后发生，却不再需要每次调用 `scope.$apply()` 了。
这是因为所有 Angular 代码都运行在一个叫做[Angular zone](api/core/NgZone)的地方。
Angular 总是知道什么时候代码执行完了，也就知道了它什么时候应该触发变更检测。代码本身并不需要调用 `scope.$apply()` 或其它类似的东西。

In the case of hybrid applications, the `UpgradeModule` bridges the
AngularJS and Angular approaches. Here's what happens:

在这种混合式应用的案例中，`UpgradeModule` 在 AngularJS 的方法和 Angular 的方法之间建立了桥梁。发生了什么呢？

* Everything that happens in the application runs inside the Angular zone.
  This is true whether the event originated in AngularJS or Angular code.
  The zone triggers Angular change detection after every event.

  应用中发生的每件事都运行在 Angular 的 zone 里。
  无论事件发生在 AngularJS 还是 Angular 的代码中，都是如此。
  这个 zone 会在每个事件之后触发 Angular 的变更检测。

* The `UpgradeModule` will invoke the AngularJS `$rootScope.$apply()` after
  every turn of the Angular zone. This also triggers AngularJS change
  detection after every event.

   `UpgradeModule` 将在每一次离开 Angular zone 时调用 AngularJS 的 `$rootScope.$apply()`。这样也就同样会在每个事件之后触发 AngularJS 的变更检测。

<div class="lightbox">
  <img src="generated/images/guide/upgrade/change_detection.png" alt="Change detection in a hybrid application">
</div>

In practice, you do not need to call `$apply()`,
regardless of whether it is in AngularJS or Angular. The
`UpgradeModule` does it for us. You *can* still call `$apply()` so there
is no need to remove such calls from existing code. Those calls just trigger
additional AngularJS change detection checks in a hybrid application.

在实践中，你不用在自己的代码中调用 `$apply()`，而不用管这段代码是在 AngularJS 还是 Angular 中。
`UpgradeModule` 都替你做了。你仍然*可以*调用 `$apply()`，也就是说你不必从现有代码中移除此调用。
在混合式应用中，这些调用只会触发一次额外的 AngularJS 变更检测。

When you downgrade an Angular component and then use it from AngularJS,
the component's inputs will be watched using AngularJS change detection.
When those inputs change, the corresponding properties in the component
are set. You can also hook into the changes by implementing the
[OnChanges](api/core/OnChanges) interface in the component,
just like you could if it hadn't been downgraded.

当你降级一个 Angular 组件，然后把它用于 AngularJS 中时，组件的输入属性就会被 AngularJS 的变更检测体系监视起来。
当那些输入属性发生变化时，组件中相应的属性就会被设置。你也能通过实现[OnChanges](api/core/OnChanges)
接口来挂钩到这些更改，就像它未被降级时一样。

Correspondingly, when you upgrade an AngularJS component and use it from Angular,
all the bindings defined for the component directive's `scope` (or `bindToController`)
will be hooked into Angular change detection. They will be treated
as regular Angular inputs. Their values will be written to the upgraded component's
scope (or controller) when they change.

相应的，当你把 AngularJS 的组件升级给 Angular 使用时，在这个组件型指令的 `scope`(或 `bindToController`)中定义的所有绑定，
都将被挂钩到 Angular 的变更检测体系中。它们将和标准的 Angular 输入属性被同等对待，并当它们发生变化时设置回 scope(或控制器)上。

### Using UpgradeModule with Angular _NgModules_

### 通过 Angular 的 *NgModule* 来使用 UpgradeModule

Both AngularJS and Angular have their own concept of modules
to help organize an application into cohesive blocks of functionality.

AngularJS 还是 Angular 都有自己的模块概念，来帮你把应用组织成一些内聚的功能块。

Their details are quite different in architecture and implementation.
In AngularJS, you add Angular assets to the `angular.module` property.
In Angular, you create one or more classes adorned with an `NgModule` decorator
that describes Angular assets in metadata. The differences blossom from there.

它们在架构和实现的细节上有着显著的不同。
在 AngularJS 中，你要把 AngularJS 的资源添加到 `angular.module` 属性上。
在 Angular 中，你要创建一个或多个带有 `NgModule` 装饰器的类，这些装饰器用来在元数据中描述 Angular 资源。差异主要来自这里。

In a hybrid application you run both versions of Angular at the same time.
That means that you need at least one module each from both AngularJS and Angular.
You will import `UpgradeModule` inside the NgModule, and then use it for
bootstrapping the AngularJS module.

在混合式应用中，你同时运行了两个版本的 Angular。
这意味着你至少需要 AngularJS 和 Angular 各提供一个模块。
当你使用 AngularJS 的模块进行引导时，就得把 Angular 的模块传给 `UpgradeModule`。

<div class="alert is-helpful">

For more information, see [NgModules](guide/ngmodules).

要了解更多，请参阅[NgModules](guide/ngmodules)页。

</div>

### Bootstrapping hybrid applications

### 引导混合式应用程序

To bootstrap a hybrid application, you must bootstrap each of the Angular and
AngularJS parts of the application. You must bootstrap the Angular bits first and
then ask the `UpgradeModule` to bootstrap the AngularJS bits next.

要想引导混合式应用，就必须在应用中分别引导 Angular 和 AngularJS 应用的一部分。你必须先引导 Angular，然后再调用 `UpgradeModule` 来引导 AngularJS。

In an AngularJS application you have a root AngularJS module, which will also
be used to bootstrap the AngularJS application.

在 AngularJS 应用中有一个 AngularJS 的根模块，它用于引导 AngularJS 应用。

<code-example path="upgrade-module/src/app/ajs-bootstrap/app.module.ts" region="ng1module" header="app.module.ts">
</code-example>

Pure AngularJS applications can be automatically bootstrapped by using an `ng-app`
directive somewhere on the HTML page. But for hybrid applications, you manually bootstrap via the
`UpgradeModule`. Therefore, it is a good preliminary step to switch AngularJS applications to use the
manual JavaScript [`angular.bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap)
method even before switching them to hybrid mode.

单纯的 AngularJS 应用可以在 HTML 页面中使用 `ng-app` 指令进行引导，但对于混合式应用你要通过 `UpgradeModule` 模块进行手动引导。因此，在切换成混合式应用之前，最好先把 AngularJS 改写成使用 [`angular.bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap) 进行手动引导的方式。

Say you have an `ng-app` driven bootstrap such as this one:

比如你现在有这样一个通过 `ng-app` 进行引导的应用：

<code-example path="upgrade-module/src/index-ng-app.html">
</code-example>

You can remove the `ng-app` and `ng-strict-di` directives from the HTML
and instead switch to calling `angular.bootstrap` from JavaScript, which
will result in the same thing:

你可以从 HTML 中移除 `ng-app` 和 `ng-strict-di` 指令，改为从 JavaScript 中调用 `angular.bootstrap`，它能达到同样效果：

<code-example path="upgrade-module/src/app/ajs-bootstrap/app.module.ts" region="bootstrap" header="app.module.ts">
</code-example>

To begin converting your AngularJS application to a hybrid, you need to load the Angular framework.
You can see how this can be done with SystemJS by following the instructions in [Setup for Upgrading to AngularJS](guide/upgrade-setup) for selectively copying code from the [QuickStart github repository](https://github.com/angular/quickstart).

要想把 AngularJS 应用变成 Hybrid 应用，就要先加载 Angular 框架。
根据[准备升级到 AngularJS](guide/upgrade-setup) 中给出的步骤，选择性的把<a href="https://github.com/angular/quickstart" target="_blank">“快速上手”的 Github 仓库</a>中的代码复制过来。

You also need to install the `@angular/upgrade` package via `npm install @angular/upgrade --save`
and add a mapping for the `@angular/upgrade/static` package:

也可以通过 `npm install @angular/upgrade --save` 命令来安装 `@angular/upgrade` 包，并给它添加一个到 `@angular/upgrade/static` 包的映射。

<code-example path="upgrade-module/src/systemjs.config.1.js" region="upgrade-static-umd" header="systemjs.config.js (map)">
</code-example>

Next, create an `app.module.ts` file and add the following `NgModule` class:

接下来，创建一个 `app.module.ts` 文件，并添加下列 `NgModule` 类：

<code-example path="upgrade-module/src/app/ajs-a-hybrid-bootstrap/app.module.ts" region="ngmodule" header="app.module.ts">
</code-example>

This bare minimum `NgModule` imports `BrowserModule`, the module every Angular browser-based app must have.
It also imports `UpgradeModule` from `@angular/upgrade/static`, which exports providers that will be used
for upgrading and downgrading services and components.

最小化的 `NgModule` 导入了 `BrowserModule`，它是每个基于浏览器的 Angular 应用必备的。
它还从 `@angular/upgrade/static` 中导入了 `UpgradeModule`，它导出了一些服务提供者，这些提供者会用于升级、降级服务和组件。

In the constructor of the `AppModule`, use dependency injection to get a hold of the `UpgradeModule` instance,
and use it to bootstrap the AngularJS app in the `AppModule.ngDoBootstrap` method.
The `upgrade.bootstrap` method takes the exact same arguments as [angular.bootstrap](https://docs.angularjs.org/api/ng/function/angular.bootstrap):

在 `AppModule` 的构造函数中，使用依赖注入技术获取了一个 `UpgradeModule` 实例，并用它在 `AppModule.ngDoBootstrap` 方法中启动 AngularJS 应用。
`upgrade.bootstrap` 方法接受和 [angular.bootstrap](https://docs.angularjs.org/api/ng/function/angular.bootstrap) 完全相同的参数。

<div class="alert is-helpful">

Note that you do not add a `bootstrap` declaration to the `@NgModule` decorator, since
AngularJS will own the root template of the application.

注意，你不需要在 `@NgModule` 中加入 `bootstrap` 声明，因为 AngularJS 控制着该应用的根模板。

</div>

Now you can bootstrap `AppModule` using the `platformBrowserDynamic.bootstrapModule` method.

现在，你就可以使用 `platformBrowserDynamic.bootstrapModule` 方法来启动 `AppModule` 了。

<code-example path="upgrade-module/src/app/ajs-a-hybrid-bootstrap/app.module.ts" region="bootstrap" header="app.module.ts'">
</code-example>

Congratulations! You're running a hybrid application! The
existing AngularJS code works as before _and_ you're ready to start adding Angular code.

恭喜！你就要开始运行这个混合式应用了！所有现存的 AngularJS 代码会像以前一样正常工作，但是你现在也同样可以运行 Angular 代码了。

### Using Angular Components from AngularJS Code

### 在 AngularJS 的代码中使用 Angular 的组件

<img src="generated/images/guide/upgrade/ajs-to-a.png" alt="Using an Angular component from AngularJS code" class="left">

Once you're running a hybrid app, you can start the gradual process of upgrading
code. One of the more common patterns for doing that is to use an Angular component
in an AngularJS context. This could be a completely new component or one that was
previously AngularJS but has been rewritten for Angular.

一旦你开始运行混合式应用，你就可以开始逐渐升级代码了。一种更常见的工作模式就是在 AngularJS 的上下文中使用 Angular 的组件。
该组件可能是全新的，也可能是把原本 AngularJS 的组件用 Angular 重写而成的。

Say you have a simple Angular component that shows information about a hero:

假设你有一个简单的用来显示英雄信息的 Angular 组件：

<code-example path="upgrade-module/src/app/downgrade-static/hero-detail.component.ts" header="hero-detail.component.ts">
</code-example>

If you want to use this component from AngularJS, you need to *downgrade* it
using the `downgradeComponent()` method. The result is an AngularJS
*directive*, which you can then register in the AngularJS module:

如果你想在 AngularJS 中使用这个组件，就得用 `downgradeComponent()` 方法把它*降级*。
其结果是一个 AngularJS 的*指令*，你可以把它注册到 AngularJS 的模块中：

<code-example path="upgrade-module/src/app/downgrade-static/app.module.ts" region="downgradecomponent" header="app.module.ts">
</code-example>

Because `HeroDetailComponent` is an Angular component, you must also add it to the
`declarations` in the `AppModule`.

由于 `HeroDetailComponent` 是一个 Angular 组件，所以你必须同时把它加入 `AppModule` 的 `declarations` 字段中。

And because this component is being used from the AngularJS module, and is an entry point into
the Angular application, you must add it to the `entryComponents` for the
NgModule.

并且由于这个组件在 AngularJS 模块中使用，也是你 Angular 应用的一个入口点，你还需要
将它加入到 NgModule 的 `entryComponents` 列表中。

<code-example path="upgrade-module/src/app/downgrade-static/app.module.ts" region="ngmodule" header="app.module.ts">
</code-example>

<div class="alert is-helpful">

All Angular components, directives and pipes must be declared in an NgModule.

所有 Angular 组件、指令和管道都必须声明在 NgModule 中。

</div>

The net result is an AngularJS directive called `heroDetail`, that you can
use like any other directive in AngularJS templates.

最终的结果是一个叫做 `heroDetail` 的 AngularJS 指令，你可以像用其它指令一样把它用在 AngularJS 模板中。

<code-example path="upgrade-module/src/index-downgrade-static.html" region="usecomponent">
</code-example>

<div class="alert is-helpful">

Note that this AngularJS is an element directive (`restrict: 'E'`) called `heroDetail`.
An AngularJS element directive is matched based on its _name_.
*The `selector` metadata of the downgraded Angular component is ignored.*

注意，它在 AngularJS 中是一个名叫 `heroDetail` 的元素型指令（`restrict: 'E'`）。
AngularJS 的元素型指令是基于它的*名字*匹配的。
*Angular 组件中的 `selector` 元数据，在降级后的版本中会被忽略。*

</div>

Most components are not quite this simple, of course. Many of them
have *inputs and outputs* that connect them to the outside world. An
Angular hero detail component with inputs and outputs might look
like this:

当然，大多数组件都不像这个这么简单。它们中很多都有*输入属性和输出属性*，来把它们连接到外部世界。
Angular 的英雄详情组件带有像这样的输入属性与输出属性：

<code-example path="upgrade-module/src/app/downgrade-io/hero-detail.component.ts" header="hero-detail.component.ts">
</code-example>

These inputs and outputs can be supplied from the AngularJS template, and the
`downgradeComponent()` method takes care of wiring them up:

这些输入属性和输出属性的值来自于 AngularJS 的模板，而 `downgradeComponent()` 方法负责桥接它们：

<code-example path="upgrade-module/src/index-downgrade-io.html" region="usecomponent">
</code-example>

Note that even though you are in an AngularJS template, **you're using Angular
attribute syntax to bind the inputs and outputs**. This is a requirement for downgraded
components. The expressions themselves are still regular AngularJS expressions.

注意，虽然你正在 AngularJS 的模板中，**但却在使用 Angular 的属性(Attribute)语法来绑定到输入属性与输出属性**。
这是降级的组件本身要求的。而表达式本身仍然是标准的 AngularJS 表达式。

<div class="callout is-important">

<header>Use kebab-case for downgraded component attributes</header>

<header>在降级过的组件属性中使用中线命名法</header>

There's one notable exception to the rule of using Angular attribute syntax
for downgraded components. It has to do with input or output names that consist
of multiple words. In Angular, you would bind these attributes using camelCase:

为降级过的组件使用 Angular 的属性(Attribute)语法规则时有一个值得注意的例外。
它适用于由多个单词组成的输入或输出属性。在 Angular 中，你要使用小驼峰命名法绑定这些属性：

<code-example format="">
  [myHero]="hero"
  (heroDeleted)="handleHeroDeleted($event)"
</code-example>

But when using them from AngularJS templates, you must use kebab-case:

但是从 AngularJS 的模板中使用它们时，你得使用中线命名法：

<code-example format="">
  [my-hero]="hero"
  (hero-deleted)="handleHeroDeleted($event)"
</code-example>

</div>

The `$event` variable can be used in outputs to gain access to the
object that was emitted. In this case it will be the `Hero` object, because
that is what was passed to `this.deleted.emit()`.

`$event` 变量能被用在输出属性里，以访问这个事件所发出的对象。这个案例中它是 `Hero` 对象，因为 `this.deleted.emit()` 函数曾把它传了出来。

Since this is an AngularJS template, you can still use other AngularJS
directives on the element, even though it has Angular binding attributes on it.
For example, you can easily make multiple copies of the component using `ng-repeat`:

由于这是一个 AngularJS 模板，虽然它已经有了 Angular 中绑定的属性(Attribute)，你仍可以在这个元素上使用其它 AngularJS 指令。
例如，你可以用 `ng-repeat` 简单的制作该组件的多份拷贝：

<code-example path="upgrade-module/src/index-downgrade-io.html" region="userepeatedcomponent">
</code-example>

### Using AngularJS Component Directives from Angular Code

### 从 Angular 代码中使用 AngularJS 组件型指令

<img src="generated/images/guide/upgrade/a-to-ajs.png" alt="Using an AngularJS component from Angular code" class="left">

So, you can write an Angular component and then use it from AngularJS
code. This is useful when you start to migrate from lower-level
components and work your way up. But in some cases it is more convenient
to do things in the opposite order: To start with higher-level components
and work your way down. This too can be done using the `upgrade/static`.
You can *upgrade* AngularJS component directives and then use them from
Angular.

现在，你已经能在 Angular 中写一个组件，并把它用于 AngularJS 代码中了。
当你从低级组件开始移植，并往上走时，这非常有用。但在另外一些情况下，从相反的方向进行移植会更加方便：
从高级组件开始，然后往下走。这也同样能用 `UpgradeModule` 完成。
你可以*升级*AngularJS 组件型指令，然后从 Angular 中用它们。

Not all kinds of AngularJS directives can be upgraded. The directive
really has to be a *component directive*, with the characteristics
[described in the preparation guide above](guide/upgrade#using-component-directives).
The safest bet for ensuring compatibility is using the
[component API](https://docs.angularjs.org/api/ng/type/angular.Module)
introduced in AngularJS 1.5.

不是所有种类的 AngularJS 指令都能升级。该指令必须是一个严格的*组件型指令*，具有[上面的准备指南中描述的](guide/upgrade#using-component-directives)那些特征。
确保兼容性的最安全的方式是 AngularJS 1.5 中引入的[组件 API](https://docs.angularjs.org/api/ng/type/angular.Module)。

A simple example of an upgradable component is one that just has a template
and a controller:

可升级组件的简单例子是只有一个模板和一个控制器的指令：

<code-example path="upgrade-module/src/app/upgrade-static/hero-detail.component.ts" region="hero-detail" header="hero-detail.component.ts">
</code-example>

You can *upgrade* this component to Angular using the `UpgradeComponent` class.
By creating a new Angular **directive** that extends `UpgradeComponent` and doing a `super` call
inside its constructor, you have a fully upgraded AngularJS component to be used inside Angular.
All that is left is to add it to `AppModule`'s `declarations` array.

你可以使用 `UpgradeComponent` 方法来把这个组件*升级*到 Angular。
具体方法是创建一个 Angular**指令**，继承 `UpgradeComponent`，在其构造函数中进行 `super` 调用，
这样你就得到一个完全升级的 AngularJS 组件，并且可以 Angular 中使用。
剩下是工作就是把它加入到 `AppModule` 的 `declarations` 数组。

<code-example path="upgrade-module/src/app/upgrade-static/hero-detail.component.ts" region="hero-detail-upgrade" header="hero-detail.component.ts">
</code-example>

<code-example path="upgrade-module/src/app/upgrade-static/app.module.ts" region="hero-detail-upgrade" header="app.module.ts">
</code-example>

<div class="alert is-helpful">

Upgraded components are Angular **directives**, instead of **components**, because Angular
is unaware that AngularJS will create elements under it. As far as Angular knows, the upgraded
component is just a directive - a tag - and Angular doesn't have to concern itself with
its children.

升级后的组件是 Angular 的**指令**，而不是**组件**，因为 Angular 不知道 AngularJS 将在它下面创建元素。
Angular 所知道的是升级后的组件只是一个指令（一个标签），Angular 不需要关心组件本身及其子元素。

</div>

An upgraded component may also have inputs and outputs, as defined by
the scope/controller bindings of the original AngularJS component
directive. When you use the component from an Angular template,
provide the inputs and outputs using **Angular template syntax**,
observing the following rules:

升级后的组件也可能有输入属性和输出属性，它们是在原 AngularJS 组件型指令的 scope/controller 绑定中定义的。
当你从 Angular 模板中使用该组件时，就要使用**Angular 模板语法**来提供这些输入属性和输出属性，但要遵循下列规则：

<table>
  <tr>

    <th>

    </th>

    <th>

      Binding definition

      绑定定义

    </th>

    <th>

      Template syntax

      模板语法

    </th>

  </tr>
  <tr>

    <th>

      Attribute binding

      属性(Attribute)绑定

    </th>

    <td>

      `myAttribute: '@myAttribute'`

    </td>

    <td>

      `<my-component myAttribute="value">`

    </td>

  </tr>
  <tr>

    <th>

      Expression binding

      表达式绑定

    </th>

    <td>

      `myOutput: '&myOutput'`

    </td>

    <td>

      `<my-component (myOutput)="action()">`

    </td>

  </tr>
  <tr>

    <th>

      One-way binding

      单向绑定

    </th>

    <td>

      `myValue: '<myValue'`

    </td>

    <td>

      `<my-component [myValue]="anExpression">`

    </td>

  </tr>
  <tr>

    <th>

      Two-way binding

      双向绑定

    </th>

    <td>

      `myValue: '=myValue'`

    </td>

    <td>

      As a two-way binding: `<my-component [(myValue)]="anExpression">`.
      Since most AngularJS two-way bindings actually only need a one-way binding in practice, `<my-component [myValue]="anExpression">` is often enough.

      用作双向绑定：`<my-component [(myValue)]="anExpression">`。
      由于大多数 AngularJS 的双向绑定实际上只是单向绑定，因此通常写成 `<my-component [myValue]="anExpression">` 也够用了。

    </td>

  </tr>
</table>

For example, imagine a hero detail AngularJS component directive
with one input and one output:

举个例子，假设 AngularJS 中有一个表示“英雄详情”的组件型指令，它带有一个输入属性和一个输出属性：

<code-example path="upgrade-module/src/app/upgrade-io/hero-detail.component.ts" region="hero-detail-io" header="hero-detail.component.ts">
</code-example>

You can upgrade this component to Angular, annotate inputs and outputs in the upgrade directive,
and then provide the input and output using Angular template syntax:

你可以把这个组件升级到 Angular，然后使用 Angular 的模板语法提供这个输入属性和输出属性：

<code-example path="upgrade-module/src/app/upgrade-io/hero-detail.component.ts" region="hero-detail-io-upgrade" header="hero-detail.component.ts">
</code-example>

<code-example path="upgrade-module/src/app/upgrade-io/container.component.ts" header="container.component.ts">
</code-example>

### Projecting AngularJS Content into Angular Components

### 把 AngularJS 的内容投影到 Angular 组件中

<img src="generated/images/guide/upgrade/ajs-to-a-with-projection.png" alt="Projecting AngularJS content into Angular" class="left">

When you are using a downgraded Angular component from an AngularJS
template, the need may arise to *transclude* some content into it. This
is also possible. While there is no such thing as transclusion in Angular,
there is a very similar concept called *content projection*. `upgrade/static`
is able to make these two features interoperate.

如果你在 AngularJS 模板中使用降级后的 Angular 组件时，可能会需要把模板中的一些内容投影进那个组件。
这也是可能的，虽然在 Angular 中并没有透传(transclude)这样的东西，但它有一个非常相似的概念，叫做*内容投影*。
`UpgradeModule` 也能让这两个特性实现互操作。

Angular components that support content projection make use of an `<ng-content>`
tag within them. Here's an example of such a component:

Angular 的组件通过使用 `<ng-content>` 标签来支持内容投影。下面是这类组件的一个例子：

<code-example path="upgrade-module/src/app/ajs-to-a-projection/hero-detail.component.ts" header="hero-detail.component.ts">
</code-example>

When using the component from AngularJS, you can supply contents for it. Just
like they would be transcluded in AngularJS, they get projected to the location
of the `<ng-content>` tag in Angular:

当从 AngularJS 中使用该组件时，你可以为它提供内容。正如它们将在 AngularJS 中被透传一样，
它们也在 Angular 中被投影到了 `<ng-content>` 标签所在的位置：

<code-example path="upgrade-module/src/index-ajs-to-a-projection.html" region="usecomponent">
</code-example>

<div class="alert is-helpful">

When AngularJS content gets projected inside an Angular component, it still
remains in "AngularJS land" and is managed by the AngularJS framework.

当 AngularJS 的内容被投影到 Angular 组件中时，它仍然留在“AngularJS 王国”中，并被 AngularJS 框架管理着。

</div>

### Transcluding Angular Content into AngularJS Component Directives

### 把 Angular 的内容透传进 AngularJS 的组件型指令

<img src="generated/images/guide/upgrade/a-to-ajs-with-transclusion.png" alt="Projecting Angular content into AngularJS" class="left">

Just as you can project AngularJS content into Angular components,
you can *transclude* Angular content into AngularJS components, whenever
you are using upgraded versions from them.

就像可以把 AngularJS 的内容投影进 Angular 组件一样，你也能把 Angular 的内容*透传*进 AngularJS 的组件，
但不管怎样，你都要使用它们升级过的版本。

When an AngularJS component directive supports transclusion, it may use
the `ng-transclude` directive in its template to mark the transclusion
point:

如果一个 AngularJS 组件型指令支持透传，它就会在自己的模板中使用 `ng-transclude` 指令标记出透传到的位置：

<code-example path="upgrade-module/src/app/a-to-ajs-transclusion/hero-detail.component.ts" header="hero-detail.component.ts">
</code-example>

If you upgrade this component and use it from Angular, you can populate
the component tag with contents that will then get transcluded:

如果你升级这个组件，并把它用在 Angular 中，你就能把准备透传的内容放进这个组件的标签中。

<code-example path="upgrade-module/src/app/a-to-ajs-transclusion/container.component.ts" header="container.component.ts">
</code-example>

### Making AngularJS Dependencies Injectable to Angular

### 让 AngularJS 中的依赖可被注入到 Angular

When running a hybrid app, you may encounter situations where you need to inject
some AngularJS dependencies into your Angular code.
Maybe you have some business logic still in AngularJS services.
Maybe you want access to AngularJS's built-in services like `$location` or `$timeout`.

当运行一个混合式应用时，可能会遇到这种情况：你需要把某些 AngularJS 的依赖注入到 Angular 代码中。
这可能是因为某些业务逻辑仍然在 AngularJS 服务中，或者需要某些 AngularJS 的内置服务，比如 `$location` 或 `$timeout`。

In these situations, it is possible to *upgrade* an AngularJS provider to
Angular. This makes it possible to then inject it somewhere in Angular
code. For example, you might have a service called `HeroesService` in AngularJS:

在这些情况下，把一个 AngularJS 提供者*升级到*Angular 也是有可能的。这就让它将来有可能被注入到 Angular 代码中的某些地方。
比如，你可能在 AngularJS 中有一个名叫 `HeroesService` 的服务：

<code-example path="upgrade-module/src/app/ajs-to-a-providers/heroes.service.ts" header="heroes.service.ts">
</code-example>

You can upgrade the service using a Angular [factory provider](guide/dependency-injection-providers#factory-providers)
that requests the service from the AngularJS `$injector`.

你可以用 Angular 的[工厂提供者](guide/dependency-injection-providers#factory-providers)升级该服务，
它从 AngularJS 的 `$injector` 请求服务。

Many developers prefer to declare the factory provider in a separate `ajs-upgraded-providers.ts` file
so that they are all together, making it easier to reference them, create new ones and
delete them once the upgrade is over.

很多开发者都喜欢在一个独立的 `ajs-upgraded-providers.ts` 中声明这个工厂提供者，以便把它们都放在一起，这样便于引用、创建新的以及在升级完毕时删除它们。

It's also recommended to export the `heroesServiceFactory` function so that Ahead-of-Time
compilation can pick it up.

同时，建议导出 `heroesServiceFactory` 函数，以便 AOT 编译器可以拿到它们。

<div class="alert is-helpful">

**Note:** The 'heroes' string inside the factory refers to the AngularJS `HeroesService`.
It is common in AngularJS apps to choose a service name for the token, for example "heroes",
and append the "Service" suffix to create the class name.

**注意：**这个工厂中的字符串 'heroes' 指向的是 AngularJS 的 `HeroesService`。
AngularJS 应用中通常使用服务名作为令牌，比如 'heroes'，并为其追加 'Service' 后缀来创建其类名。

</div>

<code-example path="upgrade-module/src/app/ajs-to-a-providers/ajs-upgraded-providers.ts" header="ajs-upgraded-providers.ts">
</code-example>

You can then provide the service to Angular by adding it to the `@NgModule`:

然后，你就可以把这个服务添加到 `@NgModule` 中来把它暴露给 Angular：

<code-example path="upgrade-module/src/app/ajs-to-a-providers/app.module.ts" region="register" header="app.module.ts">
</code-example>

Then use the service inside your component by injecting it in the component constructor using its class as a type annotation:

然后在组件的构造函数中使用该服务的类名作为类型注解注入到组件中，从而在组件中使用它：

<code-example path="upgrade-module/src/app/ajs-to-a-providers/hero-detail.component.ts" header="hero-detail.component.ts">
</code-example>

<div class="alert is-helpful">

In this example you upgraded a service class.
You can use a TypeScript type annotation when you inject it. While it doesn't
affect how the dependency is handled, it enables the benefits of static type
checking. This is not required though, and any AngularJS service, factory, or
provider can be upgraded.

在这个例子中，你升级了服务类。当注入它时，你可以使用 TypeScript 类型注解来获得这些额外的好处。
它没有影响该依赖的处理过程，同时还得到了启用静态类型检查的好处。
任何 AngularJS 中的服务、工厂和提供者都能被升级 —— 尽管这不是必须的。

</div>

### Making Angular Dependencies Injectable to AngularJS

### 让 Angular 的依赖能被注入到 AngularJS 中

In addition to upgrading AngularJS dependencies, you can also *downgrade*
Angular dependencies, so that you can use them from AngularJS. This can be
useful when you start migrating services to Angular or creating new services
in Angular while retaining components written in AngularJS.

除了能升级 AngularJS 依赖之外，你还能*降级*Angular 的依赖，以便在 AngularJS 中使用它们。
当你已经开始把服务移植到 Angular 或在 Angular 中创建新服务，但同时还有一些用 AngularJS 写成的组件时，这会非常有用。

For example, you might have an Angular service called `Heroes`:

例如，你可能有一个 Angular 的 `Heroes` 服务：

<code-example path="upgrade-module/src/app/a-to-ajs-providers/heroes.ts" header="heroes.ts">
</code-example>

Again, as with Angular components, register the provider with the `NgModule` by adding it to the module's `providers` list.

仿照 Angular 组件，把该提供者加入 `NgModule` 的 `providers` 列表中，以注册它。

<code-example path="upgrade-module/src/app/a-to-ajs-providers/app.module.ts" region="ngmodule" header="app.module.ts">
</code-example>

Now wrap the Angular `Heroes` in an *AngularJS factory function* using `downgradeInjectable()`
and plug the factory into an AngularJS module.
The name of the AngularJS dependency is up to you:

现在，用 `downgradeInjectable()` 来把 Angular 的 `Heroes` 包装成*AngularJS 的工厂函数*，并把这个工厂注册进 AngularJS 的模块中。
依赖在 AngularJS 中的名字你可以自己定：

<code-example path="upgrade-module/src/app/a-to-ajs-providers/app.module.ts" region="register" header="app.module.ts">
</code-example>

After this, the service is injectable anywhere in AngularJS code:

此后，该服务就能被注入到 AngularJS 代码中的任何地方了：

<code-example path="upgrade-module/src/app/a-to-ajs-providers/hero-detail.component.ts" header="hero-detail.component.ts">
</code-example>

## Lazy Loading AngularJS

## 惰性加载 AngularJS

When building applications, you want to ensure that only the required resources are loaded when necessary. Whether that be loading of assets or code, making sure everything that can be deferred until needed keeps your application running efficiently. This is especially true when running different frameworks in the same application.

在构建应用时，你需要确保只在必要的时候才加载所需的资源，无论是加载静态资产（Asset）还是代码。要确保任何事都尽量推迟到必要时才去做，以便让应用更高效的运行。当要在同一个应用中运行不同的框架时，更是如此。

[Lazy loading](guide/glossary#lazy-loading) is a technique that defers the loading of required assets and code resources until they are actually used. This reduces startup time and increases efficiency, especially when running different frameworks in the same application.

[惰性加载](guide/glossary#lazy-loading)是一项技术，它会推迟到使用时才加载所需静态资产和代码资源。这可以减少启动时间、提高效率，特别是要在同一个应用中运行不同的框架时。

When migrating large applications from AngularJS to Angular using a hybrid approach, you want to migrate some of the most commonly used features first, and only use the less commonly used features if needed. Doing so helps you ensure that the application is still providing a seamless experience for your users while you are migrating.

当你采用混合式应用的方式将大型应用从 AngularJS 迁移到 Angular 时，你首先要迁移一些最常用的特性，并且只在必要的时候才使用那些不太常用的特性。这样做有助于确保应用程序在迁移过程中仍然能为用户提供无缝的体验。

In most environments where both Angular and AngularJS are used to render the application, both frameworks are loaded in the initial bundle being sent to the client. This results in both increased bundle size and possible reduced performance.

在大多数需要同时用 Angular 和 AngularJS 渲染应用的环境中，这两个框架都会包含在发送给客户端的初始发布包中。这会导致发布包的体积增大、性能降低。

Overall application performance is affected in cases where the user stays on Angular-rendered pages because the AngularJS framework and application are still loaded and running, even if they are never accessed.

当用户停留在由 Angular 渲染的页面上时，应用的整体性能也会受到影响。这是因为 AngularJS 的框架和应用仍然被加载并运行了 —— 即使它们从未被访问过。

You can take steps to mitigate both bundle size and performance issues. By isolating your AngularJS app to a separate bundle, you can take advantage of [lazy loading](guide/glossary#lazy-loading) to load, bootstrap, and render the AngularJS application only when needed. This strategy reduces your initial bundle size, defers any potential impact from loading both frameworks until absolutely necessary, and keeps your application running as efficiently as possible.

你可以采取一些措施来缓解这些包的大小和性能问题。通过把 AngularJS 应用程序分离到一个单独的发布包中，你就可以利用[惰性加载](guide/glossary#lazy-loading)技术来只在必要的时候才加载、引导和渲染这个 AngularJS 应用。这种策略减少了你的初始发布包大小，推迟了同时加载两个框架的潜在影响 —— 直到绝对必要时才加载，以便让你的应用尽可能高效地运行。

The steps below show you how to do the following:

下面的步骤介绍了应该如何去做：

* Setup a callback function for your AngularJS bundle.

  为 AngularJS 发布包设置一个回调函数。

* Create a service that lazy loads and bootstraps your AngularJS app.

  创建一个服务，以便惰性加载并引导你的 AngularJS 应用。

* Create a routable component for AngularJS content

  为 AngularJS 的内容创建一个可路由的组件

* Create a custom `matcher` function for AngularJS-specific URLs and configure the Angular `Router` with the custom matcher for AngularJS routes.

  为 AngularJS 特有的 URL 创建自定义的 `matcher` 函数，并为 AngularJS 的各个路由配上带有自定义匹配器的 Angular 路由器。

### Create a service to lazy load AngularJS

### 为惰性加载 AngularJS 创建一个服务

As of Angular version 8, lazy loading code can be accomplished simply by using the dynamic import syntax `import('...')`. In your application, you create a new service that uses dynamic imports to lazy load AngularJS.

在 Angular 的版本 8 中，惰性加载代码只需使用动态导入语法 `import('...')` 即可。在这个应用中，你创建了一个新服务，它使用动态导入技术来惰性加载 AngularJS。

<code-example path="upgrade-lazy-load-ajs/src/app/lazy-loader.service.ts" header="src/app/lazy-loader.service.ts">
</code-example>

The service uses the `import()` method to load your bundled AngularJS application lazily. This decreases the initial bundle size of your application as you're not loading code your user doesn't need yet. You also need to provide a way to _bootstrap_ the application manually after it has been loaded. AngularJS provides a way to manually bootstrap an application using the [angular.bootstrap()](https://docs.angularjs.org/api/ng/function/angular.bootstrap) method with a provided HTML element. Your AngularJS app should also expose a `bootstrap` method that bootstraps the AngularJS app.

该服务使用 `import()` 方法惰性加载打包好的 AngularJS 应用。这会减少应用初始包的大小，因为你尚未加载用户目前不需要的代码。你还要提供一种方法，在加载完毕后手动*启动*它。AngularJS 提供了一种使用 [angular.bootstrap()](https://docs.angularjs.org/api/ng/function/angular.bootstrap) 方法并传入一个 HTML 元素来手动引导应用的方法。你的 AngularJS 应用也应该公开一个用来引导 AngularJS 应用的 `bootstrap` 方法。

To ensure any necessary teardown is triggered in the AngularJS app, such as removal of global listeners, you also implement a method to call the `$rootScope.destroy()` method.

要确保 AngularJS 应用中的任何清理工作都触发过（比如移除全局监听器），你还可以实现一个方法来调用 `$rootScope.destroy()` 方法。

<code-example path="upgrade-lazy-load-ajs/src/app/angularjs-app/index.ts" header="angularjs-app">
</code-example>

Your AngularJS application is configured with only the routes it needs to render content. The remaining routes in your application are handled by the Angular Router. The exposed `bootstrap` method is called in your Angular app to bootstrap the AngularJS application after the bundle is loaded.

你的 AngularJS 应用只配置了渲染内容所需的那部分路由。而 Angular 路由器会处理应用中其余的路由。你的 Angular 应用中会调用公开的 `bootstrap` 方法，让它在加载完发布包之后引导 AngularJS 应用。

<div class="alert is-important">

**Note:** After AngularJS is loaded and bootstrapped, listeners such as those wired up in your route configuration will continue to listen for route changes. To ensure listeners are shut down when AngularJS isn't being displayed, configure an `otherwise` option with the [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) that renders an empty template. This assumes all other routes will be handled by Angular.

**注意：**当 AngularJS 加载并引导完毕后，监听器（比如路由配置中的那些监听器）会继续监听路由的变化。为了确保当 AngularJS 尚未显示时先关闭监听器，请在 [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) 中配置一个渲染空模板 `otherwise` 选项。这里假设 Angular 将处理所有其它路由。

</div>

### Create a component to render AngularJS content

### 创建一个用来渲染 AngularJS 内容的组件

In your Angular application, you need a component as a placeholder for your AngularJS content. This component uses the service you create to load and bootstrap your AngularJS app after the component is initialized.

在 Angular 应用中，你需要一个组件作为 AngularJS 内容的占位符。该组件使用你创建的服务，并在组件初始化完成后加载并引导你的 AngularJS 应用。

<code-example path="upgrade-lazy-load-ajs/src/app/angular-js/angular-js.component.ts" header="src/app/angular-js/angular-js.component.ts">
</code-example>

When the Angular Router matches a route that uses AngularJS, the `AngularJSComponent` is rendered, and the content is rendered within the AngularJS [`ng-view`](https://docs.angularjs.org/api/ngRoute/directive/ngView) directive. When the user navigates away from the route, the `$rootScope` is destroyed on the AngularJS application.

当 Angular 的路由器匹配到使用 AngularJS 的路由时，会渲染 `AngularJSComponent`，并在 AngularJS 的 [`ng-view`](https://docs.angularjs.org/api/ngRoute/directive/ngView) 指令中渲染内容。当用户导航离开本路由时，`$rootScope` 会在 AngularJS 应用中被销毁。

### Configure a custom route matcher for AngularJS routes

### 为那些 AngularJS 路由配置自定义路由匹配器

To configure the Angular Router, you must define a route for AngularJS URLs. To match those URLs, you add a route configuration that uses the `matcher` property. The `matcher` allows you to use custom pattern matching for URL paths. The Angular Router tries to match on more specific routes such as static and variable routes first. When it doesn't find a match, it then looks at custom matchers defined in your route configuration. If the custom matchers don't match a route, it then goes to catch-all routes, such as a 404 page.

为了配置 Angular 的路由器，你必须为 AngularJS 的 URL 定义路由。要匹配这些 URL，你需要添加一个使用 `matcher` 属性的路由配置。这个 `matcher` 允许你使用自定义模式来匹配这些 URL 路径。Angular 的路由器会首先尝试匹配更具体的路由，比如静态路由和可变路由。当它找不到匹配项时，就会求助于路由配置中的自定义匹配器。如果自定义匹配器与某个路由不匹配，它就会转到用于 "捕获所有"（catch-all）的路由，比如 404 页面。

The following example defines a custom matcher function for AngularJS routes.

下面的例子给 AngularJS 路由定义了一个自定义匹配器函数。

<code-example path="upgrade-lazy-load-ajs/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts" region="matcher">
</code-example>

The following code adds a route object to your routing configuration using the `matcher` property and custom matcher, and the `component` property with `AngularJSComponent`.

下列代码往你的路由配置中添加了一个路由对象，其 `matcher` 属性是这个自定义匹配器，而 `component` 属性为 `AngularJSComponent`。

<code-example path="upgrade-lazy-load-ajs/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts">
</code-example>

When your application matches a route that needs AngularJS, the AngularJS app is loaded and bootstrapped, the AngularJS routes match the necessary URL to render their content, and your application continues to run with both AngularJS and Angular frameworks.

当你的应用匹配上需要 AngularJS 的路由时，AngularJS 应用就会被加载并引导。AngularJS 路由会匹配必要的 URL 以渲染它们的内容，而接下来你的应用就会同时运行 AngularJS 和 Angular 框架。

## Using the Unified Angular Location Service

## 使用统一的 Angular 位置服务（Location）

In AngularJS, the [$location service](https://docs.angularjs.org/api/ng/service/$location) handles all routing configuration and navigation, encoding and decoding of URLS, redirects, and interactions with browser APIs. Angular uses its own underlying `Location` service for all of these tasks.

在 AngularJS 中，[$location 服务](https://docs.angularjs.org/api/ng/service/$location)会处理所有路由配置和导航工作，并对各个 URL 进行编码和解码、重定向、以及与浏览器 API 交互。Angular 在所有这些任务中都使用了自己的底层服务 `Location`。

When you migrate from AngularJS to Angular you will want to move as much responsibility as possible to Angular, so that you can take advantage of new APIs. To help with the transition, Angular provides the `LocationUpgradeModule`. This module enables a _unified_ location service that shifts responsibilities from the AngularJS `$location` service to the Angular `Location` service.

当你从 AngularJS 迁移到 Angular 时，你会希望把尽可能多的责任移交给 Angular，以便利用新的 API。为了帮你完成这种转换，Angular 提供了 `LocationUpgradeModule`。该模块支持*统一*位置服务，可以把 AngularJS 中 `$location` 服务的职责转给 Angular 的 `Location` 服务。

To use the `LocationUpgradeModule`, import the symbol from `@angular/common/upgrade` and add it to your `AppModule` imports using the static `LocationUpgradeModule.config()` method.

要使用 `LocationUpgradeModule`，就会从 `@angular/common/upgrade` 中导入此符号，并使用静态方法 `LocationUpgradeModule.config()` 把它添加到你的 `AppModule` 导入表（`imports`）中。

```ts
// Other imports ...
import { LocationUpgradeModule } from '@angular/common/upgrade';

@NgModule({
  imports: [
    // Other NgModule imports...
    LocationUpgradeModule.config()
  ]
})
export class AppModule {}
```

The `LocationUpgradeModule.config()` method accepts a configuration object that allows you to configure options including the `LocationStrategy` with the `useHash` property, and the URL prefix with the `hashPrefix` property.

`LocationUpgradeModule.config()` 方法接受一个配置对象，该对象的 `useHash` 为 `LocationStrategy`，`hashPrefix` 为 URL 前缀。

The `useHash` property defaults to `false`, and the `hashPrefix` defaults to an empty `string`. Pass the configuration object to override the defaults.

`useHash` 属性默认为 `false`，而 `hashPrefix` 默认为空 `string`。传递配置对象可以覆盖默认值。

```ts
LocationUpgradeModule.config({
  useHash: true,
  hashPrefix: '!'
})
```

<div class="alert is-important">

**Note:** See the `LocationUpgradeConfig` for more configuration options available to the `LocationUpgradeModule.config()` method.

**注意：**有关 `LocationUpgradeModule.config()` 方法的更多可用配置项，请参阅 `LocationUpgradeConfig`。

</div>

This registers a drop-in replacement for the `$location` provider in AngularJS. Once registered, all navigation, routing broadcast messages, and any necessary digest cycles in AngularJS triggered during navigation are handled by Angular. This gives you a single way to navigate within both sides of your hybrid application consistently.

这会为 AngularJS 中的 `$location` 提供者注册一个替代品。一旦注册成功，导航过程中所有由 AngularJS 触发的导航、路由广播消息以及任何必需的变更检测周期都会改由 Angular 进行处理。这样，你就可以通过这个唯一的途径在此混合应用的两个框架间进行导航了。

For usage of the `$location` service as a provider in AngularJS, you need to downgrade the `$locationShim` using a factory provider.

要想在 AngularJS 中使用 `$location` 服务作为提供者，你需要使用一个工厂提供者来降级 `$locationShim`。

```ts
// Other imports ...
import { $locationShim } from '@angular/common/upgrade';
import { downgradeInjectable } from '@angular/upgrade/static';

angular.module('myHybridApp', [...])
  .factory('$location', downgradeInjectable($locationShim));
```

Once you introduce the Angular Router, using the Angular Router triggers navigations through the unified location service, still providing a single source for navigating with AngularJS and Angular.

一旦引入了 Angular 路由器，你只要使用 Angular 路由器就可以通过统一位置服务来触发导航了，同时，你仍然可以通过 AngularJS 和 Angular 进行导航。

<!--
TODO:
Correctly document how to use AOT with SystemJS-based `ngUpgrade` apps (or better yet update the
`ngUpgrade` examples/guides to use `@angular/cli`).
See https://github.com/angular/angular/issues/35989.

## Using Ahead-of-time compilation with hybrid apps

## 在混合式应用中使用 AOT 编译

You can take advantage of Ahead-of-time (AOT) compilation on hybrid apps just like on any other
Angular application.
The setup for a hybrid app is mostly the same as described in
[the Ahead-of-time Compilation chapter](guide/aot-compiler)
save for differences in `index.html` and `main-aot.ts`

你也可以其它 Angular 应用一样在混合式应用中发挥 AOT 编译的优势。
对混合式应用的设置过程和[预编译](guide/aot-compiler)章节中所讲的几乎完全一样，不同点在于 `index.html` 和 `main-aot.ts` 中。

The `index.html` will likely have script tags loading AngularJS files, so the `index.html`
for AOT must also load those files.
An easy way to copy them is by adding each to the `copy-dist-files.js` file.

`index.html` 仍然需要 script 标签来加载 AngularJS 的文件，因此供 AOT 编译的 `index.html` 也需要加载那些文件。
复制它们的简单方案是把它们全都添加到 `copy-dist-files.js` 文件中。

You'll need to use the generated `AppModuleFactory`, instead of the original `AppModule` to
bootstrap the hybrid app:

你还要使用所生成的 `AppModuleFactory` 而不是原来的 `AppModule` 来引导一个混合式应用：

<code-example path="upgrade-phonecat-2-hybrid/app/main-aot.ts" header="app/main-aot.ts">
</code-example>

And that's all you need do to get the full benefit of AOT for Angular apps!

这就是你为获取 Angular 应用的 AOT 优势所要做的一切。

-->

## PhoneCat Upgrade Tutorial

## PhoneCat 升级教程

In this section, you'll learn to prepare and upgrade an application with `ngUpgrade`.
The example app is [Angular PhoneCat](https://github.com/angular/angular-phonecat)
from [the original AngularJS tutorial](https://docs.angularjs.org/tutorial),
which is where many of us began our Angular adventures. Now you'll see how to
bring that application to the brave new world of Angular.

在本节和下节中，你将看一个完整的例子，它使用 `upgrade` 模块准备和升级了一个应用程序。
该应用就是来自[原 AngularJS 教程](https://docs.angularjs.org/tutorial)中的[Angular PhoneCat](https://github.com/angular/angular-phonecat)。
那是我们很多人当初开始 Angular 探险之旅的地方。
现在，你会看到如何把该应用带入 Angular 的美丽新世界。

During the process you'll learn how to apply the steps outlined in the
[preparation guide](guide/upgrade#preparation). You'll align the application
with Angular and also start writing in TypeScript.

这期间，你将学到如何在实践中应用[准备指南](guide/upgrade#preparation)中列出的那些重点步骤：
你先让该应用向 Angular 看齐，然后为它引入 SystemJS 模块加载器和 TypeScript。

To follow along with the tutorial, clone the
[angular-phonecat](https://github.com/angular/angular-phonecat) repository
and apply the steps as you go.

要跟随本教程，请先把[angular-phonecat](https://github.com/angular/angular-phonecat)仓库克隆到本地，并应用这些步骤。

In terms of project structure, this is where the work begins:

在项目结构方面，工作的起点是这样的：

<div class='filetree'>

  <div class='file'>

    angular-phonecat

  </div>

  <div class='children'>

    <div class='file'>

      bower.json

    </div>

    <div class='file'>

      karma.conf.js

    </div>

    <div class='file'>

      package.json

    </div>

    <div class='file'>

      app

    </div>

    <div class='children'>

      <div class='file'>

        core

      </div>

      <div class='children'>

        <div class='file'>

          checkmark

        </div>

        <div class='children'>

          <div class='file'>

            checkmark.filter.js

          </div>

          <div class='file'>

            checkmark.filter.spec.js

          </div>

        </div>

        <div class='file'>

          phone

        </div>

        <div class='children'>

          <div class='file'>

            phone.module.js

          </div>

          <div class='file'>

            phone.service.js

          </div>

          <div class='file'>

            phone.service.spec.js

          </div>

        </div>

        <div class='file'>

          core.module.js

        </div>

      </div>

      <div class='file'>

        phone-detail

      </div>

      <div class='children'>

        <div class='file'>

          phone-detail.component.js

        </div>

        <div class='file'>

          phone-detail.component.spec.js

        </div>

        <div class='file'>

          phone-detail.module.js

        </div>

        <div class='file'>

          phone-detail.template.html

        </div>

      </div>

      <div class='file'>

        phone-list

      </div>

      <div class='children'>

        <div class='file'>

          phone-list.component.js

        </div>

        <div class='file'>

          phone-list.component.spec.js

        </div>

        <div class='file'>

          phone-list.module.js

        </div>

        <div class='file'>

          phone-list.template.html

        </div>

      </div>

      <div class='file'>

        img

      </div>

      <div class='children'>

        <div class='file'>

           ...

        </div>

      </div>

      <div class='file'>

        phones

      </div>

      <div class='children'>

        <div class='file'>

           ...

        </div>

      </div>

      <div class='file'>

        app.animations.js

      </div>

      <div class='file'>

        app.config.js

      </div>

      <div class='file'>

        app.css

      </div>

      <div class='file'>

        app.module.js

      </div>

      <div class='file'>

        index.html

      </div>

    </div>

    <div class='file'>

      e2e-tests

    </div>

    <div class='children'>

      <div class='file'>

        protractor-conf.js

      </div>

      <div class='file'>

        scenarios.js

      </div>

    </div>

  </div>

</div>

This is actually a pretty good starting point. The code uses the AngularJS 1.5
component API and the organization follows the
[AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md),
which is an important [preparation step](guide/upgrade#follow-the-angular-styleguide) before
a successful upgrade.

这确实是一个很好地起点。这些代码使用了 AngularJS 1.5 的组件 API，并遵循了 [AngularJS 风格指南](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)进行组织，
在成功升级之前，这是一个很重要的[准备步骤](guide/upgrade#follow-the-angular-styleguide)。

* Each component, service, and filter is in its own source file, as per the
  [Rule of 1](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility).

   每个组件、服务和过滤器都在它自己的源文件中 —— 就像[单一规则](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)所要求的。

* The `core`, `phone-detail`, and `phone-list` modules are each in their
  own subdirectory. Those subdirectories contain the JavaScript code as well as
  the HTML templates that go with each particular feature. This is in line with the
  [Folders-by-Feature Structure](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)
  and [Modularity](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)
  rules.

   `core`、`phone-detail` 和 `phone-list` 模块都在它们自己的子目录中。那些子目录除了包含 HTML 模板之外，还包含 JavaScript 代码，它们共同完成一个特性。
  这是[按特性分目录的结构](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y152)
  和[模块化](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)规则所要求的。

* Unit tests are located side-by-side with application code where they are easily
  found, as described in the rules for
  [Organizing Tests](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#organizing-tests).

   单元测试都和应用代码在一起，它们很容易找到。就像规则
  [组织测试文件](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#organizing-tests)中要求的那样。

### Switching to TypeScript

### 切换到 TypeScript

Since you're going to be writing Angular code in TypeScript, it makes sense to
bring in the TypeScript compiler even before you begin upgrading.

因为你将使用 TypeScript 编写 Angular 的代码，所以在开始升级之前，先要把 TypeScript 的编译器设置好。

You'll also start to gradually phase out the Bower package manager in favor
of NPM, installing all new dependencies using NPM, and eventually removing Bower from the project.

你还将开始逐步淘汰 Bower 包管理器，换成 NPM。后面你将使用 NPM 来安装新的依赖包，并最终从项目中移除 Bower。

Begin by installing TypeScript to the project.

先把 TypeScript 包安装到项目中。

<code-example format="">
  npm i typescript --save-dev
</code-example>

Install type definitions for the existing libraries that
you're using but that don't come with prepackaged types: AngularJS, AngularJS Material, and the
Jasmine unit test framework.

还要为那些没有自带类型信息的库（比如 AngularJS、AngularJS Material 和 Jasmine）安装类型定义文件。

For the PhoneCat app, we can install the necessary type definitions by running the following command:

对于 PhoneCat 应用，我们可以运行下列命令来安装必要的类型定义文件：

<code-example format="">
  npm install @types/jasmine @types/angular @types/angular-animate @types/angular-aria @types/angular-cookies @types/angular-mocks @types/angular-resource @types/angular-route @types/angular-sanitize --save-dev
</code-example>

If you are using AngularJS Material, you can install the type definitions via:

如果你正在使用 AngularJS Material，你可以通过下列命令安装其类型定义：

<code-example format="">
  npm install @types/angular-material --save-dev
</code-example>

You should also configure the TypeScript compiler with a `tsconfig.json` in the project directory
as described in the [TypeScript Configuration](guide/typescript-configuration) guide.
The `tsconfig.json` file tells the TypeScript compiler how to turn your TypeScript files
into ES5 code bundled into CommonJS modules.

你还应该要往项目目录下添加一个 `tsconfig.json` 文件，
就像在 [TypeScript 配置](guide/typescript-configuration)中讲过的那样。
`tsconfig.json` 文件会告诉 TypeScript 编译器如何把 TypeScript 文件转成 ES5 代码，并打包进 CommonJS 模块中。

Finally, you should add some npm scripts in `package.json` to compile the TypeScript files to
JavaScript (based on the `tsconfig.json` configuration file):

最后，你应该把下列 npm 脚本添加到 `package.json` 中，用于把 TypeScript 文件编译成 JavaScript （根据 `tsconfig.json` 的配置）：

<code-example format="">
  "scripts": {
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    ...
</code-example>

Now launch the TypeScript compiler from the command line in watch mode:

现在，从命令行中用监视模式启动 TypeScript 编译器：

<code-example format="">
  npm run tsc:w
</code-example>

Keep this process running in the background, watching and recompiling as you make changes.

让这个进程一直在后台运行，监听任何变化并自动重新编译。

Next, convert your current JavaScript files into TypeScript. Since
TypeScript is a super-set of ECMAScript 2015, which in turn is a super-set
of ECMAScript 5, you can simply switch the file extensions from `.js` to `.ts`
and everything will work just like it did before. As the TypeScript compiler
runs, it emits the corresponding `.js` file for every `.ts` file and the
compiled JavaScript is what actually gets executed. If you start
the project HTTP server with `npm start`, you should see the fully functional
application in your browser.

接下来，把 JavaScript 文件转换成 TypeScript 文件。
由于 TypeScript 是 ECMAScript 2015 的一个超集，而 ES2015 又是 ECMAScript 5 的超集，所以你可以简单的把文件的扩展名从 `.js` 换成 `.ts`，
它们还是会像以前一样工作。由于 TypeScript 编译器仍在运行，它会为每一个 `.ts` 文件生成对应的 `.js` 文件，而真正运行的是编译后的 `.js` 文件。
如果你用 `npm start` 开启了本项目的 HTTP 服务器，你会在浏览器中看到一个功能完好的应用。

Now that you have TypeScript though, you can start benefiting from some of its
features. There's a lot of value the language can provide to AngularJS applications.

有了 TypeScript，你就可以从它的一些特性中获益了。此语言可以为 AngularJS 应用提供很多价值。

For one thing, TypeScript is a superset of ES2015. Any app that has previously
been written in ES5 - like the PhoneCat example has - can with TypeScript
start incorporating all of the JavaScript features that are new to ES2015.
These include things like `let`s and `const`s, arrow functions, default function
parameters, and destructuring assignments.

首先，TypeScript 是一个 ES2015 的超集。任何以前用 ES5 写的程序(就像 PhoneCat 范例)都可以开始通过 TypeScript
纳入那些添加到 ES2015 中的新特性。
这包括 `let`、`const`、箭头函数、函数默认参数以及解构(destructure)赋值。

Another thing you can do is start adding *type safety* to your code. This has
actually partially already happened because of the AngularJS typings you installed.
TypeScript are checking that you are calling AngularJS APIs correctly when you do
things like register components to Angular modules.

你能做的另一件事就是把*类型安全*添加到代码中。这实际上已经部分完成了，因为你已经安装了 AngularJS 的类型定义。
TypeScript 会帮你检查是否正确调用了 AngularJS 的 API，—— 比如往 Angular 模块中注册组件。

But you can also start adding *type annotations* to get even more
out of TypeScript's type system. For instance, you can annotate the checkmark
filter so that it explicitly expects booleans as arguments. This makes it clearer
what the filter is supposed to do.

你还能开始把*类型注解*添加到自己的代码中，来从 TypeScript 的类型系统中获得更多帮助。
比如，你可以给 `checkmark` 过滤器加上注解，表明它期待一个 `boolean` 类型的参数。
这可以更清楚的表明此过滤器打算做什么

<code-example path="upgrade-phonecat-1-typescript/app/core/checkmark/checkmark.filter.ts" header="app/core/checkmark/checkmark.filter.ts">
</code-example>

In the `Phone` service, you can explicitly annotate the `$resource` service dependency
as an `angular.resource.IResourceService` - a type defined by the AngularJS typings.

在 `Phone` 服务中，你可以明确的把 `$resource` 服务声明为 `angular.resource.IResourceService`，一个 AngularJS 类型定义提供的类型。

<code-example path="upgrade-phonecat-1-typescript/app/core/phone/phone.service.ts" header="app/core/phone/phone.service.ts">
</code-example>

You can apply the same trick to the application's route configuration file in `app.config.ts`,
where you are using the location and route services. By annotating them accordingly TypeScript
can verify you're calling their APIs with the correct kinds of arguments.

你可以在应用的路由配置中使用同样的技巧，那里你用到了 location 和 route 服务。
一旦为它们提供了类型信息，TypeScript 就能检查你是否在用类型的正确参数来调用它们了。

<code-example path="upgrade-phonecat-1-typescript/app/app.config.ts" header="app/app.config.ts">
</code-example>

<div class="alert is-helpful">

The [AngularJS 1.x type definitions](https://www.npmjs.com/package/@types/angular)
you installed are not officially maintained by the Angular team,
but are quite comprehensive. It is possible to make an AngularJS 1.x application
fully type-annotated with the help of these definitions.

你用安装的这个[AngularJS.x 类型定义文件](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/angularjs)
并不是由 Angular 开发组维护的，但它也已经足够全面了。借助这些类型定义的帮助，它可以为 AngularJS.x 程序加上全面的类型注解。

If this is something you wanted to do, it would be a good idea to enable
the `noImplicitAny` configuration option in `tsconfig.json`. This would
cause the TypeScript compiler to display a warning when there's any code that
does not yet have type annotations. You could use it as a guide to inform
us about how close you are to having a fully annotated project.

如果你想这么做，就在 `tsconfig.json` 中启用 `noImplicitAny` 配置项。
这样，如果遇到什么还没有类型注解的代码，TypeScript 编译器就会显示一个警告。
你可以用它作为指南，告诉你现在与一个完全类型化的项目距离还有多远。

</div>

Another TypeScript feature you can make use of is *classes*. In particular, you
can turn component controllers into classes. That way they'll be a step
closer to becoming Angular component classes, which will make life
easier once you upgrade.

你能用的另一个 TypeScript 特性是*类*。具体来讲，你可以把控制器转换成类。
这种方式下，你离成为 Angular 组件类就又近了一步，它会令你的升级之路变得更简单。

AngularJS expects controllers to be constructor functions. That's exactly what
ES2015/TypeScript classes are under the hood, so that means you can just plug in a
class as a component controller and AngularJS will happily use it.

AngularJS 期望控制器是一个构造函数。这实际上就是 ES2015/TypeScript 中的类，
这也就意味着只要你把一个类注册为组件控制器，AngularJS 就会愉快的使用它。

Here's what the new class for the phone list component controller looks like:

新的“电话列表(phone list)”组件控制器类是这样的：

<code-example path="upgrade-phonecat-1-typescript/app/phone-list/phone-list.component.ts" header="app/phone-list/phone-list.component.ts">
</code-example>

What was previously done in the controller function is now done in the class
constructor function. The dependency injection annotations are attached
to the class using a static property `$inject`. At runtime this becomes the
`PhoneListController.$inject` property.

以前在控制器函数中实现的一切，现在都改由类的构造函数来实现了。类型注入注解通过静态属性 `$inject`
被附加到了类上。在运行时，它们变成了 `PhoneListController.$inject`。

The class additionally declares three members: The array of phones, the name of
the current sort key, and the search query. These are all things you have already
been attaching to the controller but that weren't explicitly declared anywhere.
The last one of these isn't actually used in the TypeScript code since it's only
referred to in the template, but for the sake of clarity you should define all of the
controller members.

该类还声明了另外三个成员：电话列表、当前排序键的名字和搜索条件。
这些东西你以前就加到了控制器上，只是从来没有在任何地方显式定义过它们。最后一个成员从未真正在 TypeScript 代码中用过，
因为它只是在模板中被引用过。但为了清晰起见，你还是应该定义出此控制器应有的所有成员。

In the Phone detail controller, you'll have two members: One for the phone
that the user is looking at and another for the URL of the currently displayed image:

在电话详情控制器中，你有两个成员：一个是用户正在查看的电话，另一个是正在显示的图像：

<code-example path="upgrade-phonecat-1-typescript/app/phone-detail/phone-detail.component.ts" header="app/phone-detail/phone-detail.component.ts">
</code-example>

This makes the controller code look a lot more like Angular already. You're
all set to actually introduce Angular into the project.

这已经让你的控制器代码看起来更像 Angular 了。你的准备工作做好了，可以引进 Angular 到项目中了。

If you had any AngularJS services in the project, those would also be
a good candidate for converting to classes, since like controllers,
they're also constructor functions. But you only have the `Phone` factory
in this project, and that's a bit special since it's an `ngResource`
factory. So you won't be doing anything to it in the preparation stage.
You'll instead turn it directly into an Angular service.

如果项目中有任何 AngularJS 的服务，它们也是转换成类的优秀候选人，像控制器一样，它们也是构造函数。
但是在本项目中，你只有一个 `Phone` 工厂，这有点特别，因为它是一个 `ngResource` 工厂。
所以你不会在准备阶段中处理它，而是在下一节中直接把它转换成 Angular 服务。

### Installing Angular

### 安装 Angular

Having completed the preparation work, get going with the Angular
upgrade of PhoneCat. You'll do this incrementally with the help of
[ngUpgrade](#upgrading-with-ngupgrade) that comes with Angular.
By the time you're done, you'll be able to remove AngularJS from the project
completely, but the key is to do this piece by piece without breaking the application.

准备工作做完了，接下来就开始把 PhoneCat 升级到 Angular。
你将在 Angular[升级模块](guide/upgrade#upgrading-with-ngupgrade)的帮助下增量式的完成此项工作。
做完这些之后，就能把 AngularJS 从项目中完全移除了，但其中的关键是在不破坏此程序的前提下一小块一小块的完成它。

<div class="alert is-important">

The project also contains some animations.
You won't upgrade them in this version of the guide.
Turn to the [Angular animations](guide/animations) guide to learn about that.

该项目还包含一些动画，在此指南的当前版本你先不升级它，请到 [Angular 动画](guide/animations)中进一步学习。

</div>

Install Angular into the project, along with the SystemJS module loader.
Take a look at the results of the [upgrade setup instructions](guide/upgrade-setup)
and get the following configurations from there:

用 SystemJS 模块加载器把 Angular 安装到项目中。
看看[升级的准备工作](guide/upgrade-setup)中的指南，并从那里获得如下配置：

* Add Angular and the other new dependencies to `package.json`

   把 Angular 和其它新依赖添加到 `package.json` 中

* The SystemJS configuration file `systemjs.config.js` to the project root directory.

   把 SystemJS 的配置文件 `systemjs.config.js` 添加到项目的根目录。

Once these are done, run:

这些完成之后，就运行：

<code-example format="">
  npm install
</code-example>

Soon you can load Angular dependencies into the application via `index.html`,
but first you need to do some directory path adjustments.
You'll need to load files from `node_modules` and the project root instead of
from the `/app` directory as you've been doing to this point.

很快你就可以通过 `index.html` 来把 Angular 的依赖快速加载到应用中，
但首先，你得做一些目录结构调整。这是因为你正准备从 `node_modules` 中加载文件，然而目前项目中的每一个文件都是从 `/app` 目录下加载的。

Move the `app/index.html` file to the project root directory. Then change the
development server root path in `package.json` to also point to the project root
instead of `app`:

把 `app/index.html` 移入项目的根目录，然后把 `package.json` 中的开发服务器根目录也指向项目的根目录，而不再是 `app` 目录：

<code-example format="">
  "start": "http-server ./ -a localhost -p 8000 -c-1",
</code-example>

Now you're able to serve everything from the project root to the web browser. But you do *not*
want to have to change all the image and data paths used in the application code to match
the development setup. For that reason, you'll add a `<base>` tag to `index.html`, which will
cause relative URLs to be resolved back to the `/app` directory:

现在，你就能把项目根目录下的每一样东西发给浏览器了。但你*不想*为了适应开发环境中的设置，被迫修改应用代码中用到的所有图片和数据的路径。因此，你要往 `index.html` 中添加一个 `<base>` 标签，它将导致各种相对路径被解析回 `/app` 目录：

<code-example path="upgrade-phonecat-2-hybrid/index.html" region="base" header="index.html">
</code-example>

Now you can load Angular via SystemJS. You'll add the Angular polyfills and the
SystemJS config to the end of the `<head>` section, and then you'll use `System.import`
to load the actual application:

现在你可以通过 SystemJS 加载 Angular 了。你还要把 Angular 的腻子脚本(polyfills)
和 SystemJS 的配置加到 `<head>` 区的末尾，然后，你能就用 `System.import` 来加载实际的应用了：

<code-example path="upgrade-phonecat-2-hybrid/index.html" region="angular" header="index.html">
</code-example>

You also need to make a couple of adjustments
to the `systemjs.config.js` file installed during [upgrade setup](guide/upgrade-setup).

你还需要对[升级的准备工作](guide/upgrade-setup)期间安装的 `systemjs.config.js` 文件做一些调整。

Point the browser to the project root when loading things through SystemJS,
instead of using the `<base>` URL.

在 SystemJS 加载期间为浏览器指出项目的根在哪里，而不再使用 `<base>` URL。

Install the `upgrade` package via `npm install @angular/upgrade --save`
and add a mapping for the `@angular/upgrade/static` package.

再通过 `npm install @angular/upgrade --save` 安装 `upgrade` 包，并为 `@angular/upgrade/static` 包添加一个映射。

<code-example path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="paths" header="systemjs.config.js">
</code-example>

### Creating the _AppModule_

### 创建 *AppModule*

Now create the root `NgModule` class called `AppModule`.
There is already a file named `app.module.ts` that holds the AngularJS module.
Rename it to `app.module.ajs.ts` and update the corresponding script name in the `index.html` as well.
The file contents remain:

现在，创建一个名叫 `AppModule` 的根 `NgModule` 类。
这里已经有了一个名叫 `app.module.ts` 的文件，其中存放着 AngularJS 的模块。
把它改名为 `app.module.ng1.ts`，同时也要在 `index.html` 中修改对应的脚本名。
文件的内容保留：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ajs.ts" header="app.module.ajs.ts">
</code-example>

Now create a new `app.module.ts` with the minimum `NgModule` class:

然后创建一个新的 `app.module.ts` 文件，其中是一个最小化的 `NgModule` 类：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="bare" header="app.module.ts">
</code-example>

### Bootstrapping a hybrid PhoneCat

### 引导 PhoneCat 的混合式应用

Next, you'll bootstrap the application as a *hybrid application*
that supports both AngularJS and Angular components. After that,
you can start converting the individual pieces to Angular.

接下来，你把该应用程序引导改装为一个同时支持 AngularJS 和 Angular 的*混合式应用*。
然后，就能开始把这些不可分割的小块转换到 Angular 了。

The application is currently bootstrapped using the AngularJS `ng-app` directive
attached to the `<html>` element of the host page. This will no longer work in the hybrid
app. Switch to the [ngUpgrade bootstrap](#bootstrapping-hybrid-applications) method
instead.

本应用现在是使用宿主页面中附加到 `<html>` 元素上的 AngularJS 指令 `ng-app` 引导的。
但在混合式应用中，不能再这么用了。你得用[ngUpgrade bootstrap](#bootstrapping-hybrid-applications)方法代替。

First, remove the `ng-app` attribute from `index.html`.
Then import `UpgradeModule` in the `AppModule`, and override its `ngDoBootstrap` method:

首先，从 `index.html` 中移除 `ng-app`。然后在 `AppModule` 中导入 `UpgradeModule`，并改写它的 `ngDoBootstrap` 方法：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="upgrademodule" header="app/app.module.ts">
</code-example>

Note that you are bootstrapping the AngularJS module from inside `ngDoBootstrap`.
The arguments are the same as you would pass to `angular.bootstrap` if you were manually
bootstrapping AngularJS: the root element of the application; and an array of the
AngularJS 1.x modules that you want to load.

注意，你正在从内部的 `ngDoBootstrap` 中引导 AngularJS 模块。
它的参数和你在手动引导 AngularJS 时传给 `angular.bootstrap` 的是一样的：应用的根元素，和所要加载的 AngularJS 1.x 模块的数组。

Finally, bootstrap the `AppModule` in `app/main.ts`.
This file has been configured as the application entrypoint in `systemjs.config.js`,
so it is already being loaded by the browser.

最后，在 `app/main.ts` 中引导这个 `AppModule`。该文件在 `systemjs.config.js` 中被配置为了应用的入口，所以它已经被加载进了浏览器中。

<code-example path="upgrade-phonecat-2-hybrid/app/main.ts" region="bootstrap" header="app/main.ts">
</code-example>

Now you're running both AngularJS and Angular at the same time. That's pretty
exciting! You're not running any actual Angular components yet. That's next.

现在，你同时运行着 AngularJS 和 Angular。漂亮！不过你还没有运行什么实际的 Angular 组件，这就是接下来要做的。

<div class="alert is-helpful">

#### Why declare _angular_ as _angular.IAngularStatic_?

#### 为何要声明 *angular* 为*angular.IAngularStatic*？

`@types/angular` is declared as a UMD module, and due to the way
<a href="https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#support-for-umd-module-definitions">UMD typings</a>
work, once you have an ES6 `import` statement in a file all UMD typed modules must also be
imported via `import` statements instead of being globally available.

`@types/angular` 声明为 UMD 模块，根据<a href="https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#support-for-umd-module-definitions" target="_blank">UMD 类型</a>
的工作方式，一旦你在文件中有一条 ES6 的 `import` 语句，所有的 UMD 类型化的模型必须都通过 `import` 语句导入，
而是不是全局可用。

AngularJS is currently loaded by a script tag in `index.html`, which means that the whole app
has access to it as a global and uses the same instance of the `angular` variable.
If you used `import * as angular from 'angular'` instead, you'd also have to
load every file in the AngularJS app to use ES2015 modules in order to ensure AngularJS was being
loaded correctly.

AngularJS 是日前是通过 `index.html` 中的 script 标签加载，这意味着整个应用是作为一个全局变量进行访问的，
使用同一个 `angular` 变量的实例。
但如果你使用 `import * as angular from 'angular'`，我还需要彻底修改 AngularJS 应用中加载每个文件的方式，
确保 AngularJS 应用被正确加载。

This is a considerable effort and it often isn't worth it, especially since you are in the
process of moving your code to Angular.
Instead, declare `angular` as `angular.IAngularStatic` to indicate it is a global variable
and still have full typing support.

这需要相当多的努力，通常也不值得去做，特别是当你正在朝着 Angular 前进时。
但如果你把 `angular` 声明为 `angular.IAngularStatic`，指明它是一个全局变量，
仍然可以获得全面的类型支持。

</div>

### Upgrading the Phone service

### 升级 `Phone` 服务

The first piece you'll port over to Angular is the `Phone` service, which
resides in `app/core/phone/phone.service.ts` and makes it possible for components
to load phone information from the server. Right now it's implemented with
ngResource and you're using it for two things:

你要移植到 Angular 的第一个片段是 `Phone` 工厂(位于 `app/js/core/phones.factory.ts`)，
并且让它能帮助控制器从服务器上加载电话信息。目前，它是用 `ngResource` 实现的，你用它做两件事：

* For loading the list of all phones into the phone list component.

   把所有电话的列表加载到电话列表组件中。

* For loading the details of a single phone into the phone detail component.

   把一台电话的详情加载到电话详情组件中。

You can replace this implementation with an Angular service class, while
keeping the controllers in AngularJS land.

你可以用 Angular 的服务类来替换这个实现，而把控制器继续留在 AngularJS 的地盘上。

In the new version, you import the Angular HTTP module and call its `HttpClient` service instead of `ngResource`.

在这个新版本中，你导入了 Angular 的 HTTP 模块，并且用它的 `HttpClient` 服务替换掉 `ngResource`。

Re-open the `app.module.ts` file, import and add `HttpClientModule` to the `imports` array of the `AppModule`:

再次打开 `app.module.ts` 文件，导入并把 `HttpClientModule` 添加到 `AppModule` 的 `imports` 数组中：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="httpclientmodule" header="app.module.ts">
</code-example>

Now you're ready to upgrade the Phone service itself. Replace the ngResource-based
service in `phone.service.ts` with a TypeScript class decorated as `@Injectable`:

现在，你已经准备好了升级 `Phones` 服务本身。你将为 `phone.service.ts` 文件中基于 ngResource 的服务加上 `@Injectable` 装饰器：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="classdef" header="app/core/phone/phone.service.ts (skeleton)"></code-example>

The `@Injectable` decorator will attach some dependency injection metadata
to the class, letting Angular know about its dependencies. As described
by the [Dependency Injection Guide](guide/dependency-injection),
this is a marker decorator you need to use for classes that have no other
Angular decorators but still need to have their dependencies injected.

`@Injectable` 装饰器将把一些依赖注入相关的元数据附加到该类上，让 Angular 知道它的依赖信息。
就像在[依赖注入指南](guide/dependency-injection)中描述过的那样，
这是一个标记装饰器，你要把它用在那些没有其它 Angular 装饰器，并且自己有依赖注入的类上。

In its constructor the class expects to get the `HttpClient` service. It will
be injected to it and it is stored as a private field. The service is then
used in the two instance methods, one of which loads the list of all phones,
and the other loads the details of a specified phone:

在它的构造函数中，该类期待一个 `HttpClient` 服务。`HttpClient` 服务将被注入进来并存入一个私有字段。
然后该服务在两个实例方法中被使用到，一个加载所有电话的列表，另一个加载一台指定电话的详情：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="fullclass" header="app/core/phone/phone.service.ts">
</code-example>

The methods now return observables of type `PhoneData` and `PhoneData[]`. This is
a type you don't have yet. Add a simple interface for it:

该方法现在返回一个 `Phone` 类型或 `Phone[]` 类型的可观察对象(Observable)。
这是一个你从未用过的类型，因此你得为它新增一个简单的接口：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="phonedata-interface" header="app/core/phone/phone.service.ts (interface)"></code-example>

`@angular/upgrade/static` has a `downgradeInjectable` method for the purpose of making
Angular services available to AngularJS code. Use it to plug in the `Phone` service:

`@angular/upgrade/static` 有一个 `downgradeInjectable` 方法，可以使 Angular 服务在 AngularJS 的代码中可用。
使用它来插入 `Phone` 服务：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="downgrade-injectable" header="app/core/phone/phone.service.ts (downgrade)"></code-example>

Here's the full, final code for the service:

最终，该类的全部代码如下：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" header="app/core/phone/phone.service.ts">
</code-example>

Notice that you're importing the `map` operator of the RxJS `Observable` separately.
Do this for every RxJS operator.

注意，你要单独导入了 RxJS `Observable` 中的 `map` 操作符。
对每个 RxJS 操作符都要这么做。

The new `Phone` service has the same features as the original, `ngResource`-based service.
Because it's an Angular service, you register it with the `NgModule` providers:

这个新的 `Phone` 服务具有和老的基于 `ngResource` 的服务相同的特性。
因为它是 Angular 服务，你通过 `NgModule` 的 `providers` 数组来注册它：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="phone" header="app.module.ts">
</code-example>

Now that you are loading `phone.service.ts` through an import that is resolved
by SystemJS, you should **remove the &lt;script&gt; tag** for the service from `index.html`.
This is something you'll do to all components as you upgrade them. Simultaneously
with the AngularJS to Angular upgrade you're also migrating code from scripts to modules.

现在，你正在用 SystemJS 加载 `phone.service.ts`，你应该从 `index.html` 中**移除该服务的 `<script>` 标签**。
这也是你在升级所有组件时将会做的事。在从 AngularJS 向 Angular 升级的同时，你也把代码从脚本移植为模块。

At this point, you can switch the two components to use the new service
instead of the old one. While you `$inject` it as the downgraded `phone` factory,
it's really an instance of the `Phone` class and you annotate its type accordingly:

这时，你可以把两个控制器从使用老的服务切换成使用新的。你像降级过的 `phones` 工厂一样 `$inject` 它，
但它实际上是一个 `Phones` 类的实例，并且你可以据此注解它的类型：

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ajs.ts" header="app/phone-list/phone-list.component.ts">
</code-example>

<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.component.ajs.ts" header="app/phone-detail/phone-detail.component.ts">
</code-example>

Now there are two AngularJS components using an Angular service!
The components don't need to be aware of this, though the fact that the
service returns observables and not promises is a bit of a giveaway.
In any case, what you've achieved is a migration of a service to Angular
without having to yet migrate the components that use it.

这里的两个 AngularJS 控制器在使用 Angular 的服务！控制器不需要关心这一点，尽管实际上该服务返回的是可观察对象(Observable)，而不是承诺(Promise)。
无论如何，你达到的效果都是把服务移植到 Angular，而不用被迫移植组件来使用它。

<div class="alert is-helpful">

You could use the `toPromise` method of `Observable` to turn those
observables into promises in the service. In many cases that reduce
the number of changes to the component controllers.

你也能使用 `Observable` 的 `toPromise` 方法来在服务中把这些可观察对象转变成承诺，以进一步减小组件控制器中需要修改的代码量。

</div>

### Upgrading Components

### 升级组件

Upgrade the AngularJS components to Angular components next.
Do it one component at a time while still keeping the application in hybrid mode.
As you make these conversions, you'll also define your first Angular *pipes*.

接下来，把 AngularJS 的控制器升级成 Angular 的组件。每次升级一个，同时仍然保持应用运行在混合模式下。
在做转换的同时，你还将自定义首个 Angular*管道*。

Look at the phone list component first. Right now it contains a TypeScript
controller class and a component definition object. You can morph this into
an Angular component by just renaming the controller class and turning the
AngularJS component definition object into an Angular `@Component` decorator.
You can then also remove the static `$inject` property from the class:

先看看电话列表组件。它目前包含一个 TypeScript 控制器类和一个组件定义对象。重命名控制器类，
并把 AngularJS 的组件定义对象更换为 Angular `@Component` 装饰器，这样你就把它变形为 Angular
的组件了。然后，你还要从类中移除静态 `$inject` 属性。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ts" region="initialclass" header="app/phone-list/phone-list.component.ts">
</code-example>

The `selector` attribute is a CSS selector that defines where on the page the component
should go. In AngularJS you do matching based on component names, but in Angular you
have these explicit selectors. This one will match elements with the name `phone-list`,
just like the AngularJS version did.

`selector` 属性是一个 CSS 选择器，用来定义组件应该被放在页面的哪。在 AngularJS 中，你会基于组件名字来匹配，
但是在 Angular 中，你要显式指定这些选择器。本组件将会对应元素名字 `phone-list`，和 AngularJS 版本一样。

Now convert the template of this component into Angular syntax.
The search controls replace the AngularJS `$ctrl` expressions
with Angular's two-way `[(ngModel)]` binding syntax:

现在，将组件的模版也转换为 Angular 语法。在搜索控件中，把 AngularJS 的 `$ctrl` 表达式替换成 Angular 的双向绑定语法 `[(ngModel)]`：

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.template.html" region="controls" header="app/phone-list/phone-list.template.html (search controls)"></code-example>

Replace the list's `ng-repeat` with an `*ngFor` as
[described in the Template Syntax page](guide/template-syntax#directives).
Replace the image tag's `ng-src` with a binding to the native `src` property.

把列表中的 `ng-repeat` 替换为 `*ngFor` 以及它的 `let var of iterable` 语法，
该语法在[模板语法指南中讲过](guide/template-syntax#directives)。
再把 `img` 标签的 `ng-src` 替换为一个标准的 `src` 属性(property)绑定。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.template.html" region="list" header="app/phone-list/phone-list.template.html (phones)"></code-example>

#### No Angular _filter_ or _orderBy_ filters

#### Angular 中没有 `filter` 或 `orderBy` 过滤器

The built-in AngularJS `filter` and `orderBy` filters do not exist in Angular,
so you need to do the filtering and sorting yourself.

Angular 中并不存在 AngularJS 中内置的 `filter` 和 `orderBy` 过滤器。
所以你得自己实现进行过滤和排序。

You replaced the `filter` and `orderBy` filters with bindings to the `getPhones()` controller method,
which implements the filtering and ordering logic inside the component itself.

你把 `filter` 和 `orderBy` 过滤器改成绑定到控制器中的 `getPhones()` 方法，通过该方法，组件本身实现了过滤和排序逻辑。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ts" region="getphones" header="app/phone-list/phone-list.component.ts">
</code-example>

Now you need to downgrade the Angular component so you can use it in AngularJS.
Instead of registering a component, you register a `phoneList` *directive*,
a downgraded version of the Angular component.

现在你需要降级你的 Angular 组件，这样你就可以在 AngularJS 中使用它了。
你要注册一个 `phoneList`*指令*，而不是注册一个组件，它是一个降级版的 Angular 组件。

The `as angular.IDirectiveFactory` cast tells the TypeScript compiler
that the return value of the `downgradeComponent` method is a directive factory.

强制类型转换 `as angular.IDirectiveFactory` 告诉 TypeScript 编译器 `downgradeComponent` 方法
的返回值是一个指令工厂。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ts" region="downgrade-component" header="app/phone-list/phone-list.component.ts">
</code-example>

The new `PhoneListComponent` uses the Angular `ngModel` directive, located in the `FormsModule`.
Add the `FormsModule` to `NgModule` imports, declare the new `PhoneListComponent` and
finally add it to `entryComponents` since you downgraded it:

新的 `PhoneListComponent` 使用 Angular 的 `ngModel` 指令，它位于 `FormsModule` 中。
把 `FormsModule` 添加到 `NgModule` 的 `imports` 中，并声明新的 `PhoneListComponent` 组件，
最后，把降级的结果添加到 `entryComponents` 中：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="phonelist" header="app.module.ts">
</code-example>

Remove the &lt;script&gt; tag for the phone list component from `index.html`.

从 `index.html` 中移除电话列表组件的&lt;script&gt;标签。

Now set the remaining `phone-detail.component.ts` as follows:

现在，剩下的 `phone-detail.component.ts` 文件变成了这样：

<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.component.ts" header="app/phone-detail/phone-detail.component.ts">
</code-example>

This is similar to the phone list component.
The new wrinkle is the `RouteParams` type annotation that identifies the `routeParams` dependency.

这和电话列表组件很相似。
这里的窍门在于 `@Inject` 装饰器，它标记出了 `$routeParams` 依赖。

The AngularJS injector has an AngularJS router dependency called `$routeParams`,
which was injected into `PhoneDetails` when it was still an AngularJS controller.
You intend to inject it into the new `PhoneDetailsComponent`.

AngularJS 注入器具有 AngularJS 路由器的依赖，叫做 `$routeParams`。
它被注入到了 `PhoneDetails` 中，但 `PhoneDetails` 现在还是一个 AngularJS 控制器。
你要把它注入到新的 `PhoneDetailsComponent` 中。

Unfortunately, AngularJS dependencies are not automatically available to Angular components.
You must upgrade this service via a [factory provider](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)
to make `$routeParams` an Angular injectable.
Do that in a new file called `ajs-upgraded-providers.ts` and import it in `app.module.ts`:

不幸的是，AngularJS 的依赖不会自动在 Angular 的组件中可用。
你必须使用[工厂提供者（factory provider）](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)
来把 `$routeParams` 包装成 Angular 的服务提供者。
新建一个名叫 `ajs-upgraded-providers.ts` 的文件，并且在 `app.module.ts` 中导入它：

<code-example path="upgrade-phonecat-2-hybrid/app/ajs-upgraded-providers.ts" header="app/ajs-upgraded-providers.ts">
</code-example>

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="routeparams" header="app/app.module.ts ($routeParams)"></code-example>

Convert the phone detail component template into Angular syntax as follows:

把该组件的模板转变成 Angular 的语法，代码如下：

<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.template.html" header="app/phone-detail/phone-detail.template.html">
</code-example>

There are several notable changes here:

这里有几个值得注意的改动：

* You've removed the `$ctrl.` prefix from all expressions.

   你从所有表达式中移除了 `$ctrl.` 前缀。

* You've replaced `ng-src` with property
  bindings for the standard `src` property.

   正如你在电话列表中做过的那样，你把 `ng-src` 替换成了标准的 `src` 属性绑定。

* You're using the property binding syntax around `ng-class`. Though Angular
  does have [a very similar `ngClass`](guide/template-syntax#directives)
  as AngularJS does, its value is not magically evaluated as an expression.
  In Angular, you always specify in the template when an attribute's value is
  a property expression, as opposed to a literal string.

   你在 `ng-class` 周围使用了属性绑定语法。虽然 Angular 中有一个
  和 AngularJS 中[非常相似的 `ngClass`](guide/template-syntax#directives)指令，
  但是它的值不会神奇的作为表达式进行计算。在 Angular 中，模板中的属性(Attribute)值总是被作为
  属性(Property)表达式计算，而不是作为字符串字面量。

* You've replaced `ng-repeat`s with `*ngFor`s.

   你把 `ng-repeat` 替换成了 `*ngFor`。

* You've replaced `ng-click` with an event binding for the standard `click`.

   你把 `ng-click` 替换成了一个到标准 `click` 事件的绑定。

* You've wrapped the whole template in an `ngIf` that causes it only to be
  rendered when there is a phone present. You need this because when the component
  first loads, you don't have `phone` yet and the expressions will refer to a
  non-existing value. Unlike in AngularJS, Angular expressions do not fail silently
  when you try to refer to properties on undefined objects. You need to be explicit
  about cases where this is expected.

   你把整个模板都包裹进了一个 `ngIf` 中，这导致只有当存在一个电话时它才会渲染。你必须这么做，
  是因为组件首次加载时你还没有 `phone` 变量，这些表达式就会引用到一个不存在的值。
  和 AngularJS 不同，当你尝试引用未定义对象上的属性时，Angular 中的表达式不会默默失败。
  你必须明确指出这种情况是你所期望的。

Add `PhoneDetailComponent` component to the `NgModule` _declarations_ and _entryComponents_:

把 `PhoneDetailComponent` 组件添加到 `NgModule` 的 *declarations* 和 *entryComponents* 中：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="phonedetail" header="app.module.ts">
</code-example>

You should now also remove the phone detail component &lt;script&gt; tag from `index.html`.

你现在应该从 `index.html` 中移除电话详情组件的&lt;script>。

#### Add the _CheckmarkPipe_

#### 添加 *CheckmarkPipe*

The AngularJS directive had a `checkmark` _filter_.
Turn that into an Angular **pipe**.

AngularJS 指令中有一个 `checkmark`*过滤器*，把它转换成 Angular 的**管道**。

There is no upgrade method to convert filters into pipes.
You won't miss it.
It's easy to turn the filter function into an equivalent Pipe class.
The implementation is the same as before, repackaged in the `transform` method.
Rename the file to `checkmark.pipe.ts` to conform with Angular conventions:

没有什么升级方法能把过滤器转换成管道。
但你也并不需要它。
把过滤器函数转换成等价的 Pipe 类非常简单。
实现方式和以前一样，但把它们包装进 `transform` 方法中就可以了。
把该文件改名成 `checkmark.pipe.ts`，以符合 Angular 中的命名约定：

<code-example path="upgrade-phonecat-2-hybrid/app/core/checkmark/checkmark.pipe.ts" header="app/core/checkmark/checkmark.pipe.ts"></code-example>

Now import and declare the newly created pipe and
remove the filter &lt;script&gt; tag from `index.html`:

现在，导入并声明这个新创建的管道，同时从 `index.html` 文件中移除该过滤器的 `<script>` 标签：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="checkmarkpipe" header="app.module.ts">
</code-example>

### AOT compile the hybrid app

### 对混合式应用做 AOT 编译

To use AOT with a hybrid app, you have to first set it up like any other Angular application,
as shown in [the Ahead-of-time Compilation chapter](guide/aot-compiler).

要在混合式应用中使用 AOT 编译，你首先要像其它 Angular 应用一样设置它，就像[AOT 编译一章](guide/aot-compiler)所讲的那样。

Then change `main-aot.ts` to bootstrap the `AppComponentFactory` that was generated
by the AOT compiler:

然后修改 `main-aot.ts` 的引导代码，来引导 AOT 编译器所生成的 `AppComponentFactory`：

<code-example path="upgrade-phonecat-2-hybrid/app/main-aot.ts" header="app/main-aot.ts">
</code-example>

You need to load all the AngularJS files you already use in `index.html` in `aot/index.html`
as well:

你还要把在 `index.html` 中已经用到的所有 AngularJS 文件加载到 `aot/index.html` 中：

<code-example path="upgrade-phonecat-2-hybrid/aot/index.html" header="aot/index.html">
</code-example>

These files need to be copied together with the polyfills. The files the application
needs at runtime, like the `.json` phone lists and images, also need to be copied.

这些文件要带着相应的腻子脚本复制到一起。应用运行时需要的文件，比如电话列表 `.json` 和图片，也需要复制过去。

Install `fs-extra` via `npm install fs-extra --save-dev` for better file copying, and change
`copy-dist-files.js` to the following:

通过 `npm install fs-extra --save-dev` 安装 `fs-extra` 可以更好的复制文件，并且把 `copy-dist-files.js` 文件改成这样：

<code-example path="upgrade-phonecat-2-hybrid/copy-dist-files.js" header="copy-dist-files.js">
</code-example>

And that's all you need to use AOT while upgrading your app!

这就是想要在升级应用期间 AOT 编译所需的一切！

### Adding The Angular Router And Bootstrap

### 添加 Angular 路由器和引导程序

At this point, you've replaced all AngularJS application components with
their Angular counterparts, even though you're still serving them from the AngularJS router.

此刻，你已经把所有 AngularJS 的组件替换成了它们在 Angular 中的等价物，不过你仍然在 AngularJS 路由器中使用它们。

#### Add the Angular router

#### 添加 Angular 路由器

Angular has an [all-new router](guide/router).

Angular 有一个[全新的路由器](guide/router)。

Like all routers, it needs a place in the UI to display routed views.
For Angular that's the `<router-outlet>` and it belongs in a *root component*
at the top of the applications component tree.

像所有的路由器一样，它需要在 UI 中指定一个位置来显示路由的视图。
在 Angular 中，它是 `<router-outlet>`，并位于应用组件树顶部的*根组件*中。

You don't yet have such a root component, because the app is still managed as an AngularJS app.
Create a new `app.component.ts` file with the following `AppComponent` class:

你还没有这样一个根组件，因为该应用仍然是像一个 AngularJS 应用那样被管理的。
创建新的 `app.component.ts` 文件，放入像这样的 `AppComponent` 类：

<code-example path="upgrade-phonecat-3-final/app/app.component.ts" header="app/app.component.ts">
</code-example>

It has a simple template that only includes the `<router-outlet>`.
This component just renders the contents of the active route and nothing else.

它有一个很简单的模板，只包含 Angular 路由的 `<router-outlet>`。
该组件只负责渲染活动路由的内容，此外啥也不干。

The selector tells Angular to plug this root component into the `<phonecat-app>`
element on the host web page when the application launches.

该选择器告诉 Angular：当应用启动时就把这个根组件插入到宿主页面的 `<phonecat-app>` 元素中。

Add this `<phonecat-app>` element to the `index.html`.
It replaces the old AngularJS `ng-view` directive:

把这个 `<phonecat-app>` 元素插入到 `index.html` 中。
用它来代替 AngularJS 中的 `ng-view` 指令：

<code-example path="upgrade-phonecat-3-final/index.html" region="appcomponent" header="index.html (body)"></code-example>

#### Create the _Routing Module_

#### 创建*路由模块*

A router needs configuration whether it's the AngularJS or Angular or any other router.

无论在 AngularJS 还是 Angular 或其它框架中，路由器都需要进行配置。

The details of Angular router configuration are best left to the [Routing documentation](guide/router)
which recommends that you create a `NgModule` dedicated to router configuration
(called a _Routing Module_).

Angular 路由器配置的详情最好去查阅下[路由与导航](guide/router)文档。
它建议你创建一个专们用于路由器配置的 `NgModule`（名叫*路由模块*）。

<code-example path="upgrade-phonecat-3-final/app/app-routing.module.ts" header="app/app-routing.module.ts">
</code-example>

This module defines a `routes` object with two routes to the two phone components
and a default route for the empty path.
It passes the `routes` to the `RouterModule.forRoot` method which does the rest.

该模块定义了一个 `routes` 对象，它带有两个路由，分别指向两个电话组件，以及为空路径指定的默认路由。
它把 `routes` 传给 `RouterModule.forRoot` 方法，该方法会完成剩下的事。

A couple of extra providers enable routing with "hash" URLs such as `#!/phones`
instead of the default "push state" strategy.

一些额外的提供者让路由器使用“hash”策略解析 URL，比如 `#!/phones`，而不是默认的“Push State”策略。

Now update the `AppModule` to import this `AppRoutingModule` and also the
declare the root `AppComponent` as the bootstrap component.
That tells Angular that it should bootstrap the app with the _root_ `AppComponent` and
insert its view into the host web page.

现在，修改 `AppModule`，让它导入这个 `AppRoutingModule`，并同时声明根组件 `AppComponent`。
这会告诉 Angular，它应该使用根组件 `AppComponent` 引导应用，并把它的视图插入到宿主页面中。

You must also remove the bootstrap of the AngularJS module from `ngDoBootstrap()` in `app.module.ts`
and the `UpgradeModule` import.

你还要从 `app.module.ts` 中移除调用 `ngDoBootstrap()` 来引导 AngularJS 模块的代码，以及对 `UpgradeModule` 的导入代码。

<code-example path="upgrade-phonecat-3-final/app/app.module.ts" header="app/app.module.ts">
</code-example>

And since you are routing to `PhoneListComponent` and `PhoneDetailComponent` directly rather than
using a route template with a `<phone-list>` or `<phone-detail>` tag, you can do away with their
Angular selectors as well.

而且，由于你现在直接路由到 `PhoneListComponent` 和 `PhoneDetailComponent`，而不再使用带 `<phone-list>` 或 `<phone-detail>` 标签的路由模板，因此你同样不再需要它们的 Angular 选择器。

#### Generate links for each phone

#### 为每个电话生成链接

You no longer have to hardcode the links to phone details in the phone list.
You can generate data bindings for each phone's `id` to the `routerLink` directive
and let that directive construct the appropriate URL to the `PhoneDetailComponent`:

在电话列表中，你不用再被迫硬编码电话详情的链接了。
你可以通过把每个电话的 `id` 绑定到 `routerLink` 指令来生成它们了，该指令的构造函数会为 `PhoneDetailComponent` 生成正确的 URL：

<code-example path="upgrade-phonecat-3-final/app/phone-list/phone-list.template.html" region="list" header="app/phone-list/phone-list.template.html (list with links)"></code-example>

<div class="alert is-helpful">

See the [Routing](guide/router) page for details.

要了解详情，请查看[路由与导航](guide/router)页。

</div><br>

#### Use route parameters

#### 使用路由参数

The Angular router passes route parameters differently.
Correct the `PhoneDetail` component constructor to expect an injected `ActivatedRoute` object.
Extract the `phoneId` from the `ActivatedRoute.snapshot.params` and fetch the phone data as before:

Angular 路由器会传入不同的路由参数。
改正 `PhoneDetail` 组件的构造函数，让它改用注入进来的 `ActivatedRoute` 对象。
从 `ActivatedRoute.snapshot.params` 中提取出 `phoneId`，并像以前一样获取手机的数据：

<code-example path="upgrade-phonecat-3-final/app/phone-detail/phone-detail.component.ts" header="app/phone-detail/phone-detail.component.ts">
</code-example>

You are now running a pure Angular application!

你现在运行的就是纯正的 Angular 应用了！

### Say Goodbye to AngularJS

### 再见，AngularJS！

It is time to take off the training wheels and let the application begin
its new life as a pure, shiny Angular app. The remaining tasks all have to
do with removing code - which of course is every programmer's favorite task!

终于可以把辅助训练的轮子摘下来了！让你的应用作为一个纯粹、闪亮的 Angular 程序开始它的新生命吧。
  剩下的所有任务就是移除代码 —— 这当然是每个程序员最喜欢的任务！

The application is still bootstrapped as a hybrid app.
There's no need for that anymore.

应用仍然以混合式应用的方式启动，然而这再也没有必要了。

Switch the bootstrap method of the application from the `UpgradeModule` to the Angular way.

把应用的引导（`bootstrap`）方法从 `UpgradeAdapter` 的改为 Angular 的。

<code-example path="upgrade-phonecat-3-final/app/main.ts" header="main.ts">
</code-example>

If you haven't already, remove all references to the `UpgradeModule` from `app.module.ts`,
as well as any [factory provider](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)
for AngularJS services, and the `app/ajs-upgraded-providers.ts` file.

如果你还没有这么做，请从 `app.module.ts 删除所有 `UpgradeModule 的引用，
  以及所有用于 AngularJS 服务的[工厂供应商（factory provider）](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)和 `app/ajs-upgraded-providers.ts` 文件。

Also remove any `downgradeInjectable()` or `downgradeComponent()` you find,
together with the associated AngularJS factory or directive declarations.
Since you no longer have downgraded components, you no longer list them
in `entryComponents`.

还要删除所有的 `downgradeInjectable()` 或 `downgradeComponent()` 以及与 AngularJS 相关的工厂或指令声明。
因为你不再需要降级任何组件了，也不再需要把它们列在 `entryComponents` 中。

<code-example path="upgrade-phonecat-3-final/app/app.module.ts" header="app.module.ts">
</code-example>

You may also completely remove the following files. They are AngularJS
module configuration files and not needed in Angular:

你还要完全移除了下列文件。它们是 AngularJS 的模块配置文件和类型定义文件，在 Angular 中不需要了：

* `app/app.module.ajs.ts`

* `app/app.config.ts`

* `app/core/core.module.ts`

* `app/core/phone/phone.module.ts`

* `app/phone-detail/phone-detail.module.ts`

* `app/phone-list/phone-list.module.ts`

The external typings for AngularJS may be uninstalled as well. The only ones
you still need are for Jasmine and Angular polyfills.
The `@angular/upgrade` package and its mapping in `systemjs.config.js` can also go.

还需要卸载 AngularJS 的外部类型定义文件。你现在只需要留下 Jasmine 和 Angular 所需的腻子脚本。
`systemjs.config.js` 中的 `@angular/upgrade` 包及其映射也可以移除了。

<code-example format="">
  npm uninstall @angular/upgrade --save
  npm uninstall @types/angular @types/angular-animate @types/angular-cookies @types/angular-mocks @types/angular-resource @types/angular-route @types/angular-sanitize --save-dev
</code-example>

Finally, from `index.html`, remove all references to AngularJS scripts and jQuery.
When you're done, this is what it should look like:

最后，从 `index.html` 和 `karma.conf.js` 中，移除所有对 AngularJS 和 jQuery 脚本的引用。
当这些全部做完时，`index.html` 应该是这样的：

<code-example path="upgrade-phonecat-3-final/index.html" region="full" header="index.html">
</code-example>

That is the last you'll see of AngularJS! It has served us well but now
it's time to say goodbye.

这是你最后一次看到 AngularJS 了！它曾经带给你很多帮助，不过现在，该说再见了。

## Appendix: Upgrading PhoneCat Tests

## 附录：升级 PhoneCat 的测试

Tests can not only be retained through an upgrade process, but they can also be
used as a valuable safety measure when ensuring that the application does not
break during the upgrade. E2E tests are especially useful for this purpose.

测试不仅要在升级过程中被保留，它还是确保应用在升级过程中不会被破坏的一个安全指示器。
要达到这个目的，E2E 测试尤其有用。

### E2E Tests

### E2E 测试

The PhoneCat project has both E2E Protractor tests and some Karma unit tests in it.
Of these two, E2E tests can be dealt with much more easily: By definition,
E2E tests access the application from the *outside* by interacting with
the various UI elements the app puts on the screen. E2E tests aren't really that
concerned with the internal structure of the application components. That
also means that, although you modify the project quite a bit during the upgrade, the E2E
test suite should keep passing with just minor modifications. You
didn't change how the application behaves from the user's point of view.

PhoneCat 项目中同时有基于 Protractor 的 E2E 测试和一些基于 Karma 的单元测试。
对这两者来说，E2E 测试的转换要容易得多：根据定义，E2E 测试通过与应用中显示的这些 UI 元素互动，从*外部*访问你的应用来进行测试。
E2E 测试实际上并不关心这些应用中各部件的内部结构。这也意味着，虽然你已经修改了此应用程序，
但是 E2E 测试套件仍然应该能像以前一样全部通过。因为从用户的角度来说，你并没有改变应用的行为。

During TypeScript conversion, there is nothing to do to keep E2E tests
working. But when you change the bootstrap to that of a Hybrid app,
you must make a few changes.

在转成 TypeScript 期间，你不用做什么就能让 E2E 测试正常工作。
但是当你想改成按照混合式应用进行引导时，必须做一些修改。

Update the `protractor-conf.js` to sync with hybrid apps:

再对 `protractor-conf.js` 做下列修改，与混合应用同步：

<code-example format="">
  ng12Hybrid: true
</code-example>

When you start to upgrade components and their templates to Angular, you'll make more changes
because the E2E tests have matchers that are specific to AngularJS.
For PhoneCat you need to make the following changes in order to make things work with Angular:

当你开始组件和模块升级到 Angular 时，还需要一系列后续的修改。
这是因为 E2E 测试有一些匹配器是 AngularJS 中特有的。对于 PhoneCat 来说，为了让它能在 Angular 下工作，你得做下列修改：

<table>
  <tr>

    <th>

      Previous code

      老代码

    </th>

    <th>

      New code

      新代码

    </th>

    <th>

      Notes

      说明

    </th>

  </tr>
  <tr>

    <td>

      `by.repeater('phone in $ctrl.phones').column('phone.name')`

    </td>

    <td>

      `by.css('.phones .name')`

    </td>

    <td>

      The repeater matcher relies on AngularJS `ng-repeat`

      repeater 匹配器依赖于 AngularJS 中的 `ng-repeat`

    </td>

  </tr>
  <tr>

    <td>

      `by.repeater('phone in $ctrl.phones')`

    </td>

    <td>

      `by.css('.phones li')`

    </td>

    <td>

      The repeater matcher relies on AngularJS `ng-repeat`

      repeater 匹配器依赖于 AngularJS 中的 `ng-repeat`

    </td>

  </tr>
  <tr>

    <td>

      `by.model('$ctrl.query')`

    </td>

    <td>

      `by.css('input')`

    </td>

    <td>

      The model matcher relies on AngularJS `ng-model`

      model 匹配器依赖于 AngularJS 中的 `ng-model`

    </td>

  </tr>
  <tr>

    <td>

      `by.model('$ctrl.orderProp')`

    </td>

    <td>

      `by.css('select')`

    </td>

    <td>

      The model matcher relies on AngularJS `ng-model`

      model 匹配器依赖于 AngularJS 中的 `ng-model`

    </td>

  </tr>
  <tr>

    <td>

      `by.binding('$ctrl.phone.name')`

    </td>

    <td>

      `by.css('h1')`

    </td>

    <td>

      The binding matcher relies on AngularJS data binding

      binding 匹配器依赖于 AngularJS 的数据绑定

    </td>

  </tr>
</table>

When the bootstrap method is switched from that of `UpgradeModule` to
pure Angular, AngularJS ceases to exist on the page completely.
At this point, you need to tell Protractor that it should not be looking for
an AngularJS app anymore, but instead it should find *Angular apps* from
the page.

当引导方式从 `UpgradeModule` 切换到纯 Angular 的时，AngularJS 就从页面中完全消失了。
此时，你需要告诉 Protractor，它不用再找 AngularJS 应用了，而是从页面中查找 *Angular* 应用。
于是在 `protractor-conf.js` 中做下列修改：

Replace the `ng12Hybrid` previously added with the following in `protractor-conf.js`:

替换之前在 `protractor-conf.js` 中加入 `ng12Hybrid`，象这样：

<code-example format="">
  useAllAngular2AppRoots: true,
</code-example>

Also, there are a couple of Protractor API calls in the PhoneCat test code that
are using the AngularJS `$location` service under the hood. As that
service is no longer present after the upgrade, replace those calls with ones
that use WebDriver's generic URL APIs instead. The first of these is
the redirection spec:

同样，`PhoneCat` 的测试代码中有两个 Protractor API 调用内部使用了 AngularJS 的 `$location`。该服务没有了，
你就得把这些调用用一个 WebDriver 的通用 URL API 代替。第一个 API 是“重定向(redirect)”规约：

<code-example path="upgrade-phonecat-3-final/e2e-spec.ts" region="redirect" header="e2e-tests/scenarios.ts">
</code-example>

And the second is the phone links spec:

然后是“电话链接(phone links)”规约：

<code-example path="upgrade-phonecat-3-final/e2e-spec.ts" region="links" header="e2e-tests/scenarios.ts">
</code-example>

### Unit Tests

### 单元测试

For unit tests, on the other hand, more conversion work is needed. Effectively
they need to be *upgraded* along with the production code.

另一方面，对于单元测试来说，需要更多的转化工作。实际上，它们需要随着产品代码一起升级。

During TypeScript conversion no changes are strictly necessary. But it may be
a good idea to convert the unit test code into TypeScript as well.

在转成 TypeScript 期间，严格来讲没有什么改动是必须的。但把单元测试代码转成 TypeScript 仍然是个好主意，
产品代码从 TypeScript 中获得的那些增益也同样适用于测试代码。

For instance, in the phone detail component spec, you can use ES2015
features like arrow functions and block-scoped variables and benefit from the type
definitions of the AngularJS services you're consuming:

比如，在这个电话详情组件的规约中，你不仅用到了 ES2015 中的箭头函数和块作用域变量这些特性，还为所用的一些
AngularJS 服务提供了类型定义。

<code-example path="upgrade-phonecat-1-typescript/app/phone-detail/phone-detail.component.spec.ts" header="app/phone-detail/phone-detail.component.spec.ts">
</code-example>

Once you start the upgrade process and bring in SystemJS, configuration changes
are needed for Karma. You need to let SystemJS load all the new Angular code,
which can be done with the following kind of shim file:

一旦你开始了升级过程并引入了 SystemJS，还需要对 Karma 进行配置修改。
你需要让 SystemJS 加载所有的 Angular 新代码，

<code-example path="upgrade-phonecat-2-hybrid/karma-test-shim.1.js" header="karma-test-shim.js">
</code-example>

The shim first loads the SystemJS configuration, then Angular's test support libraries,
and then the application's spec files themselves.

这个 shim 文件首先加载了 SystemJS 的配置，然后是 Angular 的测试支持库，然后是应用本身的规约文件。

Karma configuration should then be changed so that it uses the application root dir
as the base directory, instead of `app`.

然后需要修改 Karma 配置，来让它使用本应用的根目录作为基础目录(base directory)，而不是 `app`。

<code-example path="upgrade-phonecat-2-hybrid/karma.conf.ajs.js" region="basepath" header="karma.conf.js">
</code-example>

Once done, you can load SystemJS and other dependencies, and also switch the configuration
for loading application files so that they are *not* included to the page by Karma. You'll let
the shim and SystemJS load them.

一旦这些完成了，你就能加载 SystemJS 和其它依赖，并切换配置文件来加载那些应用文件，而*不用*在 Karma 页面中包含它们。
你要让这个 shim 文件和 SystemJS 去加载它们。

<code-example path="upgrade-phonecat-2-hybrid/karma.conf.ajs.js" region="files" header="karma.conf.js">
</code-example>

Since the HTML templates of Angular components will be loaded as well, you must help
Karma out a bit so that it can route them to the right paths:

由于 Angular 组件中的 HTML 模板也同样要被加载，所以你得帮 Karma 一把，帮它在正确的路径下找到这些模板：

<code-example path="upgrade-phonecat-2-hybrid/karma.conf.ajs.js" region="html" header="karma.conf.js">
</code-example>

The unit test files themselves also need to be switched to Angular when their production
counterparts are switched. The specs for the checkmark pipe are probably the most straightforward,
as the pipe has no dependencies:

如果产品代码被切换到了 Angular，单元测试文件本身也需要切换过来。对勾(checkmark)管道的规约可能是最直观的，因为它没有任何依赖：

<code-example path="upgrade-phonecat-2-hybrid/app/core/checkmark/checkmark.pipe.spec.ts" header="app/core/checkmark/checkmark.pipe.spec.ts">
</code-example>

The unit test for the phone service is a bit more involved. You need to switch from the mocked-out
AngularJS `$httpBackend` to a mocked-out Angular Http backend.

`Phone` 服务的测试会牵扯到一点别的。你需要把模拟版的 AngularJS `$httpBackend` 服务切换到模拟板的 Angular Http 后端。

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.spec.ts" header="app/core/phone/phone.service.spec.ts">
</code-example>

For the component specs, you can mock out the `Phone` service itself, and have it provide
canned phone data. You use Angular's component unit testing APIs for both components.

对于组件的规约，你可以模拟出 `Phone` 服务本身，并且让它提供电话的数据。你可以对这些组件使用 Angular 的组件单元测试 API。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.component.spec.ts" header="app/phone-detail/phone-detail.component.spec.ts">
</code-example>

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.spec.ts" header="app/phone-list/phone-list.component.spec.ts">
</code-example>

Finally, revisit both of the component tests when you switch to the Angular
router. For the details component, provide a mock of Angular `ActivatedRoute` object
instead of using the AngularJS `$routeParams`.

最后，当你切换到 Angular 路由时，需要重新过一遍这些组件测试。对详情组件来说，你需要提供一个 Angular
`RouteParams` 的 mock 对象，而不再用 AngularJS 中的 `$routeParams`。

<code-example path="upgrade-phonecat-3-final/app/phone-detail/phone-detail.component.spec.ts" region="activatedroute" header="app/phone-detail/phone-detail.component.spec.ts">
</code-example>

And for the phone list component, a few adjustments to the router make
the `RouteLink` directives work.

对于电话列表组件，还要再做少量的调整，以便路由器能让 `RouteLink` 指令正常工作。

<code-example path="upgrade-phonecat-3-final/app/phone-list/phone-list.component.spec.ts" region="routestuff" header="app/phone-list/phone-list.component.spec.ts">
</code-example>
