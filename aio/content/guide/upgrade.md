# Upgrading from AngularJS

# 从 AngularJS 升级

_Angular_ is the name for the Angular of today and tomorrow.
_AngularJS_ is the name for all v1.x versions of Angular.

*Angular*这个名字专指现在和未来的Angular版本，而*AngularJS*专指Angular的所有v1.x版本。

AngularJS apps are great.
Always consider the business case before moving to Angular.
An important part of that case is the time and effort to get there.
This guide describes the built-in tools for efficiently migrating AngularJS projects over to the
Angular platform, a piece at a time.

有很多大型AngularJS应用。
在决定迁移到Angular之前，首先要深入思考业务案例。
在这些案例中，最重要的部分之一是时间和需要付出的努力。
本章描述用于把AngularJS应用高效迁移到Angular平台的内置工具，每次讲一点点。

Some applications will be easier to upgrade than others, and there are
many ways to make it easier for yourself. It is possible to
prepare and align AngularJS applications with Angular even before beginning
the upgrade process. These preparation steps are all about making the code
more decoupled, more maintainable, and better aligned with modern development
tools. That means in addition to making the upgrade easier,
you will also improve the existing AngularJS applications.

有些应用可能比其它的升级起来简单，还有一些方法能让把这项工作变得更简单。
即使在正式开始升级过程之前，我们可以准备AngularJS的程序，让它向Angular看齐。
这些准备步骤几乎都是关于如何让代码更加松耦合、更有可维护性，以及用现代开发工具提高速度的。
这意味着，这种准备工作不仅能让最终的升级变得更简单，而且还能提升AngularJS程序的质量。

One of the keys to a successful upgrade is to do it incrementally,
by running the two frameworks side by side in the same application, and
porting AngularJS components to Angular one by one. This makes it possible
to upgrade even large and complex applications without disrupting other
business, because the work can be done collaboratively and spread over
a period of time. The `upgrade` module in Angular has been designed to
make incremental upgrading seamless.

成功升级的关键之一是增量式的实现它，通过在同一个应用中一起运行这两个框架，并且逐个把AngularJS的组件迁移到Angular中。
这意味着可以在不必打断其它业务的前提下，升级更大、更复杂的应用程序，因为这项工作可以多人协作完成，在一段时间内逐渐铺开。
Angular `upgrade`模块的设计目标就是让你渐进、无缝的完成升级。

## Preparation

## 准备工作

There are many ways to structure AngularJS applications. When you begin
to upgrade these applications to Angular, some will turn out to be
much more easy to work with than others. There are a few key techniques
and patterns that you can apply to future proof apps even before you
begin the migration.

AngularJS应用程序的组织方式有很多种。当我们想把它们升级到Angular的时候，
有些做起来会比其它的更容易些。即使在我们开始升级之前，也有一些关键的技术和模式可以让我们将来升级时更轻松。

{@a follow-the-angular-styleguide}

### Follow the AngularJS Style Guide

### 遵循AngularJS风格指南

The [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
collects patterns and practices that have been proven to result in
cleaner and more maintainable AngularJS applications. It contains a wealth
of information about how to write and organize AngularJS code - and equally
importantly - how **not** to write and organize AngularJS code.

[AngularJS风格指南](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)收集了一些已证明能写出干净且可维护的AngularJS程序的模式与实践。
它包含了很多关于如何书写和组织AngularJS代码的有价值信息，同样重要的是，**不应该**采用的书写和组织AngularJS代码的方式。

Angular is a reimagined version of the best parts of AngularJS. In that
sense, its goals are the same as the AngularJS Style Guide's: To preserve
the good parts of AngularJS, and to avoid the bad parts. There's a lot
more to Angular than just that of course, but this does mean that
*following the style guide helps make your AngularJS app more closely
aligned with Angular*.

Angular是一个基于AngularJS中最好的部分构思出来的版本。在这种意义上，它的目标和AngularJS风格指南是一样的：
保留AngularJS中好的部分，去掉坏的部分。当然，Angular还做了更多。
说这些的意思是：*遵循这个风格指南可以让你写出更接近Angular程序的AngularJS程序*。

There are a few rules in particular that will make it much easier to do *an incremental upgrade* using the Angular `upgrade/static` module:

有一些特别的规则可以让使用Angular的`upgrade/static`模块进行*增量升级*变得更简单：

* The [Rule of 1](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)
  states that there should be one component per file. This not only makes
  components easy to navigate and find, but will also allow us to migrate
  them between languages and frameworks one at a time. In this example application,
  each controller, component, service, and filter is in its own source file.

  [单一规则](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)
  规定每个文件应该只放一个组件。这不仅让组件更容易浏览和查找，而且还让我们能逐个迁移它们的语言和框架。
  在这个范例程序中，每个控制器、工厂和过滤器都位于各自的源文件中。

* The [Folders-by-Feature Structure](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)
  and [Modularity](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)
  rules define similar principles on a higher level of abstraction: Different parts of the
  application should reside in different directories and NgModules.

  [按特性分目录的结构](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)和[模块化](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)规则在较高的抽象层定义了一些相似的原则：应用程序中的不同部分应该被分到不同的目录和Angular模块中。

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

当我们把应用代码分解到每个文件中只放一个组件的粒度后，我们通常会得到一个由大量相对较小的文件组成的项目结构。
这比组织成少量大文件要整洁得多，但如果你不得不通过`<script>`标签在HTML页面中加载所有这些文件，那就不好玩了。
尤其是当你不得不自己按正确的顺序维护这些标签时更是如此，那我们就要开始使用*模块加载器*了。

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
可以让我们在程序中使用TypeScript或ES2015语言内置的模块系统。
我们可以使用`import`和`export`特性来明确指定哪些代码应该以及将会被在程序的不同部分之间共享。
对于ES5程序来说，我们可以改用CommonJS风格的`require`和`module.exports`特性代替。
无是论哪种情况，模块加载器都会按正确的顺序加载程序中用到的所有代码。

When moving applications into production, module loaders also make it easier
to package them all up into production bundles with batteries included.

当我们的应用程序投入生产环境时，模块加载器也会让把所有这些文件打成完整的产品包变得容易一些。


### Migrating to TypeScript

### 迁移到TypeScript

If part of the Angular upgrade plan is to also take TypeScript into use, it makes
sense to bring in the TypeScript compiler even before the upgrade itself begins.
This means there's one less thing to learn and think about during the actual upgrade.
It also means you can start using TypeScript features in your AngularJS code.

Angular升级计划的一部分是引入TypeScript，即使在开始升级之前，引入TypeScript编译器也是有意义的。
这意味着等真正升级的时候需要学习和思考的东西会更少，并且我们可以在AngularJS代码中开始使用TypeScript的特性。

Since TypeScript is a superset of ECMAScript 2015, which in turn is a superset
of ECMAScript 5, "switching" to TypeScript doesn't necessarily require anything
more than installing the TypeScript compiler and renaming files from
`*.js` to `*.ts`. But just doing that is not hugely useful or exciting, of course.
Additional steps like the following can give us much more bang for the buck:

TypeScript是ECMAScript 2015的超集，而ES2015又是ECMAScript 5的超集。
这意味着除了安装一个TypeScript编译器，并把文件名都从`*.js`改成`*.ts`之外，其实什么都不用做。
当然，如果仅仅这样做也没什么大用，也没什么有意思的地方。
下面这些额外的步骤可以让我们打起精神：

* For applications that use a module loader, TypeScript imports and exports
  (which are really ECMAScript 2015 imports and exports) can be used to organize
  code into modules.

  对那些使用了模块加载器的程序，TypeScript的导入和导出语法(实际上是ECMAScript 2015的导入和导出)可以把代码组织成模块。

* Type annotations can be gradually added to existing functions and variables
  to pin down their types and get benefits like build-time error checking,
  great autocompletion support and inline documentation.

  可以逐步把类型注解添加到现有函数和变量上，以固定它们的类型，并获得其优点：比如编译期错误检查、更好的支持自动完成，以及内联式文档等。

* JavaScript features new to ES2015, like arrow functions, `let`s and `const`s,
  default function parameters, and destructuring assignments can also be gradually
  added to make the code more expressive.

  那些ES2015中新增的特性，比如箭头函数、`let`、`const`、默认函数参数、解构赋值等也可以逐渐添加进来，让代码更有表现力。

* Services and controllers can be turned into *classes*. That way they'll be a step
  closer to becoming Angular service and component classes, which will make
  life easier after the upgrade.

  服务和控制器可以转成*类*。这样我们就能一步步接近Angular的服务和组件类了，这样等到我们开始升级时，也会更简单。

#### Using Component Directives

#### 使用组件型指令

In Angular, components are the main primitive from which user interfaces
are built. You define the different portions of the UI as components and
compose them into a full user experience.

在Angular中，组件是用来构建用户界面的主要元素。我们把UI中的不同部分定义成组件，然后在模板中使用这些组件合成出最终的UI。

You can also do this in AngularJS, using *component directives*. These are
directives that define their own templates, controllers, and input/output bindings -
the same things that Angular components define. Applications built with
component directives are much easier to migrate to Angular than applications
built with lower-level features like `ng-controller`,  `ng-include`, and scope
inheritance.

我们在AngularJS中也能这么做。那就是一种定义了自己的模板、控制器和输入/输出绑定的指令 —— 跟Angular中对组件的定义是一样的。
要迁移到Angular，通过组件型指令构建的应用程序会比直接用`ng-controller`、`ng-include`和作用域继承等底层特性构建的要容易得多。

To be Angular compatible, an AngularJS component directive should configure
these attributes:

要与Angular兼容，AngularJS的组件型指令应该配置下列属性：

* `restrict: 'E'`. Components are usually used as elements.

  `restrict: 'E'`。组件通常会以元素的方式使用。

* `scope: {}` - an isolate scope. In Angular, components are always isolated
  from their surroundings, and you should do this in AngularJS too.

  `scope: {}` - 一个独立作用域。在Angular中，组件永远是从它们的环境中被隔离出来的，在AngularJS中也同样如此。
  
* `bindToController: {}`. Component inputs and outputs should be bound
  to the controller instead of using the `$scope`.

  `bindToController: {}`。组件的输入和输出应该绑定到控制器，而不是`$scope`。

* `controller` and `controllerAs`. Components have their own controllers.

  `controller`和`controllerAs`。组件要有自己的控制器。

* `template` or `templateUrl`. Components have their own templates.

  `template`或`templateUrl`。组件要有自己的模板。

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

  `compile`。Angular不再支持它。

* `replace: true`. Angular never replaces a component element with the
  component template. This attribute is also deprecated in AngularJS.

  `replace: true`。Angular永远不会用组件模板替换一个组件元素。这个特性在AngularJS中也同样不建议使用了。

* `priority` and `terminal`. While AngularJS components may use these,
  they are not used in Angular and it is better not to write code
  that relies on them.

  `priority`和`terminal`。虽然AngularJS的组件可能使用这些，但它们在Angular中已经没用了，并且最好不要再写依赖它们的代码。

An AngularJS component directive that is fully aligned with the Angular
architecture may look something like this:


AngularJS中一个完全向Angular架构对齐过的组件型指令是这样的：

<code-example path="upgrade-module/src/app/hero-detail.directive.ts" title="hero-detail.directive.ts">
</code-example>

AngularJS 1.5 introduces the [component API](https://docs.angularjs.org/api/ng/type/angular.Module#component)
that makes it easier to define component directives like these. It is a good idea to use
this API for component directives for several reasons:

AngularJS 1.5引入了[组件API](https://docs.angularjs.org/api/ng/type/angular.Module)，它让定义指令变得更简单了。
为组件型指令使用这个API是一个好主意，因为：

* It requires less boilerplate code.

  它需要更少的样板代码。

* It enforces the use of component best practices like `controllerAs`.

  它强制你遵循组件的最佳实践，比如`controllerAs`。

* It has good default values for directive attributes like `scope` and `restrict`.

  指令中像`scope`和`restrict`这样的属性应该有良好的默认值。

The component directive example from above looks like this when expressed
using the component API:


如果使用这个组件API进行快捷定义，那么上面看到的组件型指令就变成了这样：

<code-example path="upgrade-module/src/app/upgrade-io/hero-detail.component.ts" region="hero-detail-io" title="hero-detail.component.ts">
</code-example>

Controller lifecycle hook methods `$onInit()`, `$onDestroy()`, and `$onChanges()`
are another convenient feature that AngularJS 1.5 introduces. They all have nearly
exact [equivalents in Angular](guide/lifecycle-hooks), so organizing component lifecycle
logic around them will ease the eventual Angular upgrade process.

控制器的生命周期钩子`$onInit()`、`$onDestroy()`和`$onChanges()`是AngularJS.5引入的另一些便利特性。
它们都很接近于[Angular中的等价物](guide/lifecycle-hooks)，所以，围绕它们组织组件生命周期的逻辑会更容易升级。



## Upgrading with ngUpgrade

## 使用升级适配器进行升级

The ngUpgrade library in Angular is a very useful tool for upgrading
anything but the smallest of applications. With it you can mix and match
AngularJS and Angular components in the same application and have them interoperate
seamlessly. That means you don't have to do the upgrade work all at once,
since there's a natural coexistence between the two frameworks during the
transition period.

不管要升级什么，Angular中的`ngUpgrade`库都会是一个非常有用的工具 —— 除非是小到没功能的应用。
借助它，我们可以在同一个应用程序中混用并匹配AngularJS和2的组件，并让它们实现无缝的互操作。
这意味着我们不用必须一次性做完所有升级工作，因为在整个演进过程中，这两个框架可以很自然的和睦相处。

### How ngUpgrade Works

### 升级模块如何工作

The primary tool provided by ngUpgrade is called the `UpgradeModule`.
This is a module that contains utilities for bootstrapping and managing hybrid
applications that support both Angular and AngularJS code.

`upgrade`模块提供的主要工具叫做`UpgradeModule`。这是一个服务，它可以引导并管理同时支持Angular和AngularJS的混合式应用程序。

When you use ngUpgrade, what you're really doing is *running both AngularJS and
Angular at the same time*. All Angular code is running in the Angular
framework, and AngularJS code in the AngularJS framework. Both of these are the
actual, fully featured versions of the frameworks. There is no emulation going on,
so you can expect to have all the features and natural behavior of both frameworks.

当使用`UpgradeModule`时，我们实际做的是*同时运行两个版本的Angular*。所有Angular的代码运行在Angular框架中，
而AngularJS的代码运行在AngularJS框架中。所有这些都是真实的、全功能的框架版本。
没有进行任何仿真，所以我们可以期待同时存在这两个框架的所有特性和天生的行为。

What happens on top of this is that components and services managed by one
framework can interoperate with those from the other framework. This happens
in three main areas: Dependency injection, the DOM, and change detection.

所有这些事情的背后，本质上是一个框架中管理的组件和服务能和来自另一个中的进行互操作。
这发生在三个主要的领域：依赖注入、DOM和变更检测。

#### Dependency Injection

#### 依赖注入

Dependency injection is front and center in both AngularJS and
Angular, but there are some key differences between the two
frameworks in how it actually works.

无论是在AngularJS中还是在Angular中，依赖注入都处于前沿和中心的位置，但在两个框架的工作原理上，却存在着一些关键的不同之处。


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

      只有一个注入器。即使在多模块的应用程序中，每样东西也都被装入一个巨大的命名空间中。
    </td>
    <td>

      There is a [tree hierarchy of injectors](guide/hierarchical-dependency-injection),
      with a root injector and an additional injector for each component.

      有一组[树状多层注入器](guide/hierarchical-dependency-injection)，有一个根注入器，每个组件也另外有一个注入器。

    </td>
  </tr>
</table>

Even accounting for these differences you can still have dependency injection
interoperability. The `UpgradeModule` resolves the differences and makes
everything work seamlessly:

就算有这么多不同点，也并不妨碍我们在依赖注入时进行互操作。`UpgradeModule`解决了这些差异，并让它们无缝的对接：

* You can make AngularJS services available for injection to Angular code
  by *upgrading* them. The same singleton instance of each service is shared
  between the frameworks. In Angular these services will always be in the
  *root injector* and available to all components.

  通过升级它们，我们就能让那些在AngularJS中能被注入的服务在Angular的代码中可用。
  在框架之间共享的是服务的同一个单例对象。在Angular中，这些外来服务总是被放在*根注入器*中，并可用于所有组件。
  它们总是具有*字符串令牌* —— 跟它们在AngularJS中的令牌相同。

* You can also make Angular services available for injection to AngularJS code
  by *downgrading* them. Only services from the Angular root injector can
  be downgraded. Again, the same singleton instances are shared between the frameworks.
  When you register a downgraded service, you must explicitly specify a *string token* that you want to
  use in AngularJS.


通过降级它们，我们也能让那些在Angular中能被注入的服务在AngularJS的代码中可用。
  只有那些来自Angular根注入器的服务才能被降级。同样的，在框架之间共享的是同一个单例对象。
  当我们注册一个要降级的服务时，要明确指定一个打算在AngularJS中使用的*字符串令牌*。<figure >
  <img src="generated/images/guide/upgrade/injectors.png" alt="The two injectors in a hybrid application" >
</figure>

#### Components and the DOM

#### 组件与DOM

In the DOM of a hybrid ngUpgrade application are components and
directives from both AngularJS and Angular. These components
communicate with each other by using the input and output bindings
of their respective frameworks, which ngUpgrade bridges together. They may also
communicate through shared injected dependencies, as described above.

在混合式应用中，我们能同时发现那些来自AngularJS和Angular中组件和指令的DOM。
这些组件通过它们各自框架中的输入和输出绑定来互相通讯，它们由`UpgradeModule`桥接在一起。
它们也能通过共享被注入的依赖彼此通讯，就像前面所说的那样。

The key thing to understand about a hybrid application is that every element in the DOM is owned by exactly one of the two frameworks.
The other framework ignores it. If an element is
owned by AngularJS, Angular treats it as if it didn't exist,
and vice versa.

理解混合式应用的关键在于，DOM中的每一个元素都只能属于这两个框架之一，而另一个框架则会忽略它。如果一个元素属于 AngularJS ，那么 Angular 就会当它不存在，反之亦然。

So normally a hybrid application begins life as an AngularJS application,
and it is AngularJS that processes the root template, e.g. the index.html.
Angular then steps into the picture when an Angular component is used somewhere
in an AngularJS template. That component's template will then be managed
by Angular, and it may contain any number of Angular components and
directives.

所以，混合式应用总是像AngularJS程序那样启动，处理根模板的也是AngularJS.
然后，当这个应用的模板中使用到了Angular的组件时，Angular才开始参与。
这个组件的视图由Angular进行管理，而且它还可以使用一系列的Angular组件和指令。

Beyond that, you may interleave the two frameworks.
You always cross the boundary between the two frameworks by one of two
ways:

更进一步说，我们可以按照需要，任意穿插使用这两个框架。
使用下面的两种方式之一，我们可以自由穿梭于这两个框架的边界：

1. By using a component from the other framework: An AngularJS template
   using an Angular component, or an Angular template using an
   AngularJS component.

   通过使用来自另一个框架的组件：AngularJS的模板中用到了Angular的组件，或者Angular的模板中使用了AngularJS的组件。
   
2. By transcluding or projecting content from the other framework. ngUpgrade
    bridges the related concepts of AngularJS transclusion and Angular content
    projection together.


通过透传(transclude)或投影(project)来自另一个框架的内容。`UpgradeModule`牵线搭桥，把AngularJS的透传概念和Angular的内容投影概念关联起来。

<figure >
  <img src="generated/images/guide/upgrade/dom.png" alt="DOM element ownership in a hybrid application" >
</figure>

Whenever you use a component that belongs to the other framework, a
switch between framework boundaries occurs. However, that switch only
happens to the elements in the template of thatcomponent . Consider a situation
where you use an Angular component from AngularJS like this:
当我们使用一个属于另一个框架的组件时，就会发生一个跨框架边界的切换。不过，这种切换只发生在该组件元素的*子节点*上。
考虑一个场景，我们从AngularJS中使用一个Angular组件，就像这样：

<code-example language="html" escape="html">
  &lt;a-component&gt;&lt;/a-component&gt;
</code-example>

The DOM element `<a-component>` will remain to be an AngularJS managed
element, because it's defined in an AngularJS template. That also
means you can apply additional AngularJS directives to it, but *not*
Angular directives. It is only in the template of the `<a-component>`
where Angular steps in. This same rule also applies when you
use AngularJS component directives from Angular.

此时，`<a-component>`这个DOM元素仍然由AngularJS管理，因为它是在AngularJS的模板中定义的。
这也意味着你可以往它上面添加别的AngularJS指令，却*不能*添加Angular的指令。
只有在`<a-component>`组件的模板中才是Angular的天下。同样的规则也适用于在Angular中使用AngularJS组件型指令的情况。


#### Change Detection

#### 变更检测

The `scope.$apply()` is how AngularJS detects changes and updates data bindings.
After every event that occurs, `scope.$apply()` gets called. This is done either
automatically by the framework, or manually by you.

AngularJS中的变更检测全是关于`scope.$apply()`的。在每个事件发生之后，`scope.$apply()`就会被调用。
这或者由框架自动调用，或者在某些情况下由我们自己的代码手动调用。它是发生变更检测以及更新数据绑定的时间点。

In Angular things are different. While change detection still
occurs after every event, no one needs to call `scope.$apply()` for
that to happen. This is because all Angular code runs inside something
called the [Angular zone](api/core/NgZone). Angular always
knows when the code finishes, so it also knows when it should kick off
change detection. The code itself doesn't have to call `scope.$apply()`
or anything like it.

在Angular中，事情有点不一样。虽然变更检测仍然会在每一个事件之后发生，却不再需要每次调用`scope.$apply()`了。
这是因为所有Angular代码都运行在一个叫做[Angular zone](api/core/NgZone)的地方。
Angular总是知道什么时候代码执行完了，也就知道了它什么时候应该触发变更检测。代码本身并不需要调用`scope.$apply()`或其它类似的东西。

In the case of hybrid applications, the `UpgradeModule` bridges the
AngularJS and Angular approaches. Here's what happens:

在这种混合式应用的案例中，`UpgradeModule`在AngularJS的方法和Angular的方法之间建立了桥梁。发生了什么呢？

* Everything that happens in the application runs inside the Angular zone.
  This is true whether the event originated in AngularJS or Angular code.
  The zone triggers Angular change detection after every event.

  应用中发生的每件事都运行在Angular的zone里。
  无论事件发生在AngularJS还是Angular的代码中，都是如此。

* The `UpgradeModule` will invoke the AngularJS `$rootScope.$apply()` after
  every turn of the Angular zone. This also triggers AngularJS change
  detection after every event.


`UpgradeModule`将在每一次离开Angular zone时调用AngularJS的`$rootScope.$apply()`。这样也就同样会在每个事件之后触发AngularJS的变更检测。

<figure >
  <img src="generated/images/guide/upgrade/change_detection.png" alt="Change detection in a hybrid application" >
</figure>

In practice, you do not need to call `$apply()`,
regardless of whether it is in AngularJS on Angular. The
`UpgradeModule` does it for us. You *can* still call `$apply()` so there
is no need to remove such calls from existing code. Those calls just trigger
additional AngularJS change detection checks in a hybrid application.


在实践中，我们不用在自己的代码中调用`$apply()`，而不用管这段代码是在AngularJS还是Angular中。
`UpgradeModule`都替我们做了。我们仍然*可以*调用`$apply()`，也就是说我们不必从现有代码中移除此调用。
在混合式应用中，这些调用只会触发一次额外的 AngularJS 变更检测。


When you downgrade an Angular component and then use it from AngularJS,
the component's inputs will be watched using AngularJS change detection.
When those inputs change, the corresponding properties in the component
are set. You can also hook into the changes by implementing the
[OnChanges](api/core/OnChanges) interface in the component,
just like you could if it hadn't been downgraded.

当我们降级一个Angular组件，然后把它用于AngularJS中时，组件的输入属性就会被AngularJS的变更检测体系监视起来。
当那些输入属性发生变化时，组件中相应的属性就会被设置。我们也能通过实现[OnChanges](api/core/OnChanges)
接口来挂钩到这些更改，就像它未被降级时一样。

Correspondingly, when you upgrade an AngularJS component and use it from Angular,
all the bindings defined for the component directive's `scope` (or `bindToController`)
will be hooked into Angular change detection. They will be treated
as regular Angular inputs. Their values will be written to the upgraded component's
scope (or controller) when they change.

相应的，当我们把AngularJS的组件升级给Angular使用时，在这个组件型指令的`scope`(或`bindToController`)中定义的所有绑定，
都将被挂钩到Angular的变更检测体系中。它们将和标准的Angular输入属性被同等对待，并当它们发生变化时设置回scope(或控制器)上。

### Using UpgradeModule with Angular _NgModules_

### 通过Angular的*NgModule*来使用UpgradeModule

Both AngularJS and Angular have their own concept of modules
to help organize an application into cohesive blocks of functionality.

AngularJS还是Angular都有自己的模块概念，来帮你我们把应用组织成一些紧密相关的功能块。

Their details are quite different in architecture and implementation.
In AngularJS, you add Angular assets to the `angular.module` property.
In Angular, you create one or more classes adorned with an `NgModule` decorator
that describes Angular assets in metadata. The differences blossom from there.

它们在架构和实现的细节上有着显著的不同。
在AngularJS中，我们会把AngularJS的资源添加到`angular.module`属性上。
在Angular中，我们会创建一个或多个带有`NgModule`装饰器的类，这些装饰器用来在元数据中描述Angular资源。差异主要来自这里。

In a hybrid application you run both versions of Angular at the same time.
That means that you need at least one module each from both AngularJS and Angular.
You will import `UpgradeModule` inside the NgModule, and then use it for
bootstrapping the AngularJS module.

在混合式应用中，我们同时运行了两个版本的Angular。
这意味着我们至少需要AngularJS和Angular各提供一个模块。
当我们使用AngularJS的模块进行引导时，就得把Anuglar 2的模块传给`UpgradeModule`。我们来看看怎么做。

<div class="l-sub-section">



Read more about [NgModules](guide/ngmodule).
要了解Angular模块的更多信息，请参阅[Angular模块](guide/ngmodule)页。

</div>

### Bootstrapping hybrid applications

### 引导AngularJS+2的混合式应用程序

// TDOO: Translate
To bootstrap a hybrid application, you must bootstrap each of the Angular and
AngularJS parts of the application. You must bootstrap the Angular bits first and
then ask the `UpgradeModule` to bootstrap the AngularJS bits next.

In an AngularJS application you have a root AngularJS module, which will also
be used to bootstrap the AngularJS application.

<code-example path="upgrade-module/src/app/ajs-bootstrap/app.module.ts" region="ng1module" title="app.module.ts">
</code-example>

Pure AngularJS applications can be automatically bootstrapped by using an `ng-app`
directive somewhere on the HTML page. But for hybrid applications, you manually bootstrap via the
`UpgradeModule`. Therefore, it is a good preliminary step to switch AngularJS applications to use the
manual JavaScript [`angular.bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap)
method even before switching them to hybrid mode.

Say you have an `ng-app` driven bootstrap such as this one:

<code-example path="upgrade-module/src/index-ng-app.html">
</code-example>

You can remove the `ng-app` and `ng-strict-di` directives from the HTML
and instead switch to calling `angular.bootstrap` from JavaScript, which
will result in the same thing:


我们可以从HTML中移除`ng-app`和`ng-strict-di`指令，改为从JavaScript中调用`angular.bootstrap`，它能达到同样效果：

<code-example path="upgrade-module/src/app/ajs-bootstrap/app.module.ts" region="bootstrap" title="app.module.ts">
</code-example>

To begin converting your AngularJS application to a hybrid, you need to load the Angular framework.
You can see how this can be done with SystemJS by following the instructions in [Setup](guide/setup),
selectively copying code from the [QuickStart github repository](https://github.com/angular/quickstart).

You also need to install the `@angular/upgrade` package via `npm install @angular/upgrade --save`
and add a mapping for the `@angular/upgrade/static` package:

<code-example path="upgrade-module/src/systemjs.config.1.js" region="upgrade-static-umd" title="systemjs.config.js (map)">
</code-example>

现在，把Angular引入项目中。根据[搭建本地开发环境](guide/setup)中的指导，你可以有选择的从<a href="https://github.com/angular/quickstart" target="_blank">“快速上手”的Github仓库</a>中拷贝素材进来。

Next, create an `app.module.ts` file and add the following `NgModule` class:


接下来，创建一个`app.module.ts`文件，并添加下列`NgModule`类：

<code-example path="upgrade-module/src/app/ajs-a-hybrid-bootstrap/app.module.ts" region="ngmodule" title="app.module.ts">
</code-example>

This bare minimum `NgModule` imports `BrowserModule`, the module every Angular browser-based app must have.
It also imports `UpgradeModule` from `@angular/upgrade/static`, which exports providers that will be used
for upgrading and downgrading services and components.

最小化的`NgModule`导入了`BrowserModule`，它是每个基于浏览器的 Angular 应用必备的。
它还从`@angular/upgrade/static`中导入了`UpgradeModule`，它导出了一些服务提供商，这些提供商会用于升级、降级服务和组件。

In the constructor of the `AppModule`, use dependency injection to get a hold of the `UpgradeModule` instance,
and use it to bootstrap the AngularJS app in the `AppModule.ngDoBootstrap` method.
The `upgrade.bootstrap` method takes the exact same arguments as [angular.bootstrap](https://docs.angularjs.org/api/ng/function/angular.bootstrap):

在 `AppModule` 的构造函数中，使用依赖注入技术获取了一个 `UpgradeModule` 实例，并用它在`AppModule.ngDoBootstrap`方法中启动 AngularJS 应用。
`upgrade.bootstrap` 方法接受和 [angular.bootstrap](https://docs.angularjs.org/api/ng/function/angular.bootstrap) 完全相同的参数。

<div class="l-sub-section">

Note that you do not add a `bootstrap` declaration to the `@NgModule` decorator, since
AngularJS will own the root template of the application.

注意，我们不需要在 `@NgModule` 中加入 `bootstrap` 声明，因为 AngularJS 控制着该应用的根模板。

</div>

Now you can bootstrap `AppModule` using the `platformBrowserDynamic.bootstrapModule` method.

现在，我们就可以使用 `platformBrowserDynamic.bootstrapModule` 方法来启动 `AppModule` 了。

<code-example path="upgrade-module/src/app/ajs-a-hybrid-bootstrap/app.module.ts" region="bootstrap" title="app.module.ts'">
</code-example>

Congratulations! You're running a hybrid application! The
existing AngularJS code works as before _and_ you're ready to start adding Angular code.

恭喜！我们就要开始运行AngularJS+2的混合式应用程序了！所有现存的AngularJS代码会像以前一样正常工作，但是我们现在也同样可以运行Angular代码了。

### Using Angular Components from AngularJS Code

### 在AngularJS的代码中使用Angular的组件


<img src="generated/images/guide/upgrade/ajs-to-a.png" alt="Using an Angular component from AngularJS code" class="left">

Once you're running a hybrid app, you can start the gradual process of upgrading
code. One of the more common patterns for doing that is to use an Angular component
in an AngularJS context. This could be a completely new component or one that was
previously AngularJS but has been rewritten for Angular.

一旦我们开始运行混合式应用，我们就可以开始逐渐升级代码了。做这件事的一种更常见的模式就是在AngularJS的上下文中使用Angular的组件。
该组件可能是全新的，也可能是把原本AngularJS的组件用Angular重写而成的。Say you have a simple Angular component that shows information about a hero:
假设我们有一个简单的用来显示英雄信息的Angular组件：

<code-example path="upgrade-module/src/app/downgrade-static/hero-detail.component.ts" title="hero-detail.component.ts">
</code-example>

If you want to use this component from AngularJS, you need to *downgrade* it
using the `downgradeComponent()` method. The result is an AngularJS
*directive*, which you can then register in the AngularJS module:

如果我们想在AngularJS中使用这个组件，我们就得用`downgradeComponent()`方法把它*降级*。
如果我们这么做，就会得到一个AngularJS的*指令*，我们可以把它注册到AngularJS的模块中：

<code-example path="upgrade-module/src/app/downgrade-static/app.module.ts" region="downgradecomponent" title="app.module.ts">
</code-example>



Because `HeroDetailComponent` is an Angular component, you must also add it to the 
`declarations` in the `AppModule`.

由于`HeroDetailComponent`是一个Angular组件，所以我们必须同时把它加入`AppModule`的`declarations`字段中。

And because this component is being used from the AngularJS module, and is an entry point into 
the Angular application, you must add it to the `entryComponents` for the 
NgModule.


并且由于这个组件在AngularJS模块中使用，也是我们Angular应用的一个入口点，我们还需要
将它加入到Angular模块的`entryComponents`列表中。

<code-example path="upgrade-module/src/app/downgrade-static/app.module.ts" region="ngmodule" title="app.module.ts">
</code-example>

<div class="l-sub-section">

All Angular components, directives and pipes must be declared in an NgModule.

所有Angular组件、指令和管道都必须声明在NgModule中。


</div>

The net result is an AngularJS directive called `heroDetail`, that you can
use like any other directive in AngularJS templates.

这里我们得到的是一个叫做`heroDetail`的AngularJS指令，我们可以像用其它指令一样把它用在AngularJS模板中。

<code-example path="upgrade-module/src/index-downgrade-static.html" region="usecomponent">
</code-example>

<div class="alert is-helpful">

Note that this AngularJS is an element directive (`restrict: 'E'`) called `heroDetail`.
An AngularJS element directive is matched based on its _name_.
*The `selector` metadata of the downgraded Angular component is ignored.*

注意，它在AngularJS中是一个名叫`heroDetail`的元素型指令（`restrict: 'E'`）。
AngularJS的元素型指令是基于它的*名字*匹配的。
*Angular组件中的`selector`元数据，在降级后的版本中会被忽略。*


</div>

Most components are not quite this simple, of course. Many of them
have *inputs and outputs* that connect them to the outside world. An
Angular hero detail component with inputs and outputs might look
like this:

当然，大多数组件都不像这个这么简单。它们中很多都有*输入属性和输出属性*，来把它们连接到外部世界。
Angular的英雄详情组件带有像这样的输入属性与输出属性：


<code-example path="upgrade-module/src/app/downgrade-io/hero-detail.component.ts" title="hero-detail.component.ts">
</code-example>

These inputs and outputs can be supplied from the AngularJS template, and the
`downgradeComponent()` method takes care of wiring them up:


这些输入属性和输出属性的值来自于AngularJS的模板，而`downgradeComponent()`方法负责桥接它们：

<code-example path="upgrade-module/src/index-downgrade-io.html" region="usecomponent">
</code-example>

Note that even though you are in an AngularJS template, **you're using Angular
attribute syntax to bind the inputs and outputs**. This is a requirement for downgraded
components. The expressions themselves are still regular AngularJS expressions.

注意，虽然我们正在AngularJS的模板中，**但却在使用Angular的属性(Attribute)语法来绑定到输入属性与输出属性**。
这是降级的组件本身要求的。而表达式本身仍然是标准的AngularJS表达式。


<div class="callout is-important">

<header>
  Use kebab-case for downgraded component attributes
</header>



<header>
  在降级过的组件属性中使用中线命名法
</header>



There's one notable exception to the rule of using Angular attribute syntax
for downgraded components. It has to do with input or output names that consist
of multiple words. In Angular, you would bind these attributes using camelCase:

为降级过的组件使用Angular的属性(Attribute)语法规则时有一个值得注意的例外。
它适用于由多个单词组成的输入或输出属性。在Angular中，我们要使用小驼峰命名法绑定这些属性：


<code-example format="">
  [myHero]="hero"

</code-example>

But when using them from AngularJS templates, you must use kebab-case:

但是从AngularJS的模板中使用它们时，我们得使用中线命名法：


<code-example format="">
  [my-hero]="hero"
</code-example>

</div>

The `$event` variable can be used in outputs to gain access to the
object that was emitted. In this case it will be the `Hero` object, because
that is what was passed to `this.deleted.emit()`.

`$event`变量能被用在输出属性里，以访问这个事件所发出的对象。这个案例中它是`Hero`对象，因为`this.deleted.emit()`函数曾把它传了出来。

Since this is an AngularJS template, you can still use other AngularJS
directives on the element, even though it has Angular binding attributes on it.
For example, you can easily make multiple copies of the component using `ng-repeat`:


由于这是一个AngularJS模板，虽然它已经有了Angular中绑定的属性(Attribute)，我们仍可以在这个元素上使用其它AngularJS指令。
例如，我们可以用`ng-repeat`简单的制作该组件的多份拷贝：

<code-example path="upgrade-module/src/index-downgrade-io.html" region="userepeatedcomponent" >
</code-example>

### Using AngularJS Component Directives from Angular Code

### 从Angular代码中使用AngularJS组件型指令


<img src="generated/images/guide/upgrade/a-to-ajs.png" alt="Using an AngularJS component from Angular code" class="left">

So, you can write an Angular component and then use it from AngularJS
code. This is useful when you start to migrate from lower-level
components and work your way up. But in some cases it is more convenient
to do things in the opposite order: To start with higher-level components
and work your way down. This too can be done using the `UpgradeModule`.
You can *upgrade* AngularJS component directives and then use them from
Angular.

现在，我们已经能在Angular中写一个组件，并把它用于AngularJS代码中了。
当我们从低级组件开始移植，并往上走时，这非常有用。但在另外一些情况下，从相反的方向进行移植会更加方便：
从高级组件开始，然后往下走。这也同样能用`UpgradeModule`完成。
我们可以*升级*AngularJS组件型指令，然后从Angular中用它们。

Not all kinds of AngularJS directives can be upgraded. The directive
really has to be a *component directive*, with the characteristics
[described in the preparation guide above](guide/upgrade#using-component-directives).
The safest bet for ensuring compatibility is using the
[component API](https://docs.angularjs.org/api/ng/type/angular.Module)
introduced in AngularJS 1.5.

不是所有种类的AngularJS指令都能升级。该指令必须是一个严格的*组件型指令*，具有[上面的准备指南中描述的](guide/upgrade#using-component-directives)那些特征。
确保兼容性的最安全的方式是AngularJS.5中引入的[组件API](https://docs.angularjs.org/api/ng/type/angular.Module)。

A simple example of an upgradable component is one that just has a template
and a controller:

可升级组件的简单例子是只有一个模板和一个控制器的指令：


<code-example path="upgrade-module/src/app/upgrade-static/hero-detail.component.ts" region="hero-detail" title="hero-detail.component.ts">
</code-example>

You can *upgrade* this component to Angular  using the `UpgradeComponent` class.
By creating a new Angular  **directive** that extends `UpgradeComponent` and doing a `super` call
inside it's constructor, you have a fully upgraded AngularJS component to be used inside Angular .
All that is left is to add it to `AppModule`'s `declarations` array.

我们可以使用`UpgradeComponent`方法来把这个组件*升级*到Angular。
具体方法是创建一个Angular**指令**，继承`UpgradeComponent`，在其构造函数中进行`super`调用，
这样我们就得到一个完全升级的AngularJS组件，并且可以Angular中使用。
剩下是工作就是把它加入到`AppModule`的`declarations`数组。


<code-example path="upgrade-module/src/app/upgrade-static/hero-detail.component.ts" region="hero-detail-upgrade" title="hero-detail.component.ts">
</code-example>

<code-example path="upgrade-module/src/app/upgrade-static/app.module.ts" region="hero-detail-upgrade" title="app.module.ts">
</code-example>

<div class="alert is-helpful">

Upgraded components are Angular **directives**, instead of **components**, because Angular
is unaware that AngularJS will create elements under it. As far as Angular knows, the upgraded
component is just a directive - a tag - and Angular doesn't have to concern itself with
it's children.

升级后的组件是Angular的**指令**，而不是**组件**，因为Angular不知道AngularJS将在它下面创建元素。
Angular所知道的是升级后的组件只是一个指令（一个标签），Angular不需要关心组件本身及其子元素。


</div>

An upgraded component may also have inputs and outputs, as defined by
the scope/controller bindings of the original AngularJS component
directive. When you use the component from an Angular template,
 provide the inputs and outputs using **Angular template syntax**,
observing the following rules:
升级后的组件也可能有输入属性和输出属性，它们是在原AngularJS组件型指令的scope/controller绑定中定义的。
当我们从Angular模板中使用该组件时，我们要使用**Angular模板语法**来提供这些输入属性和输出属性，但要遵循下列规则：

<table>
  <tr>
    <th>
    </th>
    <th>

      <p>
        Binding definition
      </p>

      <p>
        绑定定义
      </p>

    </th>
    <th>

      <p>
        Template syntax
      </p>

      <p>
        模板语法
      </p>

    </th>
  </tr>
  <tr>
    <th>

      <p>
        Attribute binding
      </p>

      <p>
        属性(Attribute)绑定
      </p>

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

      <p>
        Expression binding
      </p>

      <p>
        表达式绑定
      </p>

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

      <p>
        One-way binding
      </p>

      <p>
        单向绑定
      </p>

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

      <p>
        Two-way binding
      </p>

      <p>
        双向绑定
      </p>

    </th>
    <td>

      `myValue: '=myValue'`

    </td>
    <td>

      As a two-way binding: `<my-component [(myValue)]="anExpression">`.
      Since most AngularJS two-way bindings actually only need a one-way binding
      in practice, `<my-component [myValue]="anExpression">` is often enough.

      用作输入：`<my-component [myValue]="anExpression">` 或
      用作双向绑定：`<my-component [(myValue)]="anExpression"`

    </td>
  </tr>
</table>

For example, imagine a hero detail AngularJS component directive
with one input and one output:

举个例子，假设我们在AngularJS中有一个表示“英雄详情”的组件型指令，它带有一个输入属性和一个输出属性：


<code-example path="upgrade-module/src/app/upgrade-io/hero-detail.component.ts" region="hero-detail-io" title="hero-detail.component.ts">
</code-example>



You can upgrade this component to Angular, annotate inputs and outputs in the upgrade directive, 
and then provide the input and output using Angular template syntax:我们可以把这个组件升级到Angular，然后使用Angular的模板语法提供这个输入属性和输出属性：

<code-example path="upgrade-module/src/app/upgrade-io/hero-detail.component.ts" region="hero-detail-io-upgrade" title="hero-detail.component.ts">
</code-example>

<code-example path="upgrade-module/src/app/upgrade-io/container.component.ts" title="container.component.ts">
</code-example>

### Projecting AngularJS Content into Angular Components
### 把AngularJS的内容投影到Angular组件中

<img src="generated/images/guide/upgrade/ajs-to-a-with-projection.png" alt="Projecting AngularJS content into Angular" class="left">

When you are using a downgraded Angular component from an AngularJS
template, the need may arise to *transclude* some content into it. This
is also possible. While there is no such thing as transclusion in Angular,
there is a very similar concept called *content projection*. The `UpgradeModule`
is able to make these two features interoperate.

如果我们在AngularJS模板中使用降级后的Angular组件时，可能会需要把模板中的一些内容投影进那个组件。
这也是可能的，虽然在Angular中并没有透传(transclude)这样的东西，但它有一个非常相似的概念，叫做*内容投影*。
`UpgradeModule`也能让这两个特性实现互操作。

Angular components that support content projection make use of an `<ng-content>`
tag within them. Here's an example of such a component:

Angular的组件通过使用`<ng-content>`标签来支持内容投影。下面是这类组件的一个例子：


<code-example path="upgrade-module/src/app/ajs-to-a-projection/hero-detail.component.ts" title="hero-detail.component.ts">
</code-example>

When using the component from AngularJS, you can supply contents for it. Just
like they would be transcluded in AngularJS, they get projected to the location
of the `<ng-content>` tag in Angular:


当从AngularJS中使用该组件时，我们可以为它提供内容。正如它们将在AngularJS中被透传一样，
它们也在Angular中被投影到了`<ng-content>`标签所在的位置：

<code-example path="upgrade-module/src/index-ajs-to-a-projection.html" region="usecomponent" >
</code-example>

<div class="alert is-helpful">

When AngularJS content gets projected inside an Angular component, it still
remains in "AngularJS land" and is managed by the AngularJS framework.

当AngularJS的内容被投影到Angular组件中时，它仍然留在“AngularJS王国”中，并被AngularJS框架管理着。


</div>

### Transcluding Angular Content into AngularJS Component Directives
### 把Angular的内容透传进AngularJS的组件型指令

<img src="generated/images/guide/upgrade/a-to-ajs-with-transclusion.png" alt="Projecting Angular content into AngularJS" class="left">

Just as you can project AngularJS content into Angular components,
you can *transclude* Angular content into AngularJS components, whenever
you are using upgraded versions from them.

就像我们能把AngularJS的内容投影进Angular组件一样，我们也能把Angular的内容*透传*进AngularJS的组件，
但不管怎样，我们都要使用它们升级过的版本。

When an AngularJS component directive supports transclusion, it may use
the `ng-transclude` directive in its template to mark the transclusion
point:

如果一个AngularJS组件型指令支持透传，它就会在自己的模板中使用`ng-transclude`指令标记出透传到的位置：


<code-example path="upgrade-module/src/app/a-to-ajs-transclusion/hero-detail.component.ts" title="hero-detail.component.ts">
</code-example>

If you upgrade this component and use it from Angular, you can populate
the component tag with contents that will then get transcluded:

如果我们升级这个组件，并把它用在Angular中，我们就能把准备透传的内容放进这个组件的标签中。

<code-example path="upgrade-module/src/app/a-to-ajs-transclusion/container.component.ts" title="container.component.ts">
</code-example>

### Making AngularJS Dependencies Injectable to Angular
### 让AngularJS中的依赖可被注入到Angular

When running a hybrid app, you may encounter situations where you need to inject
some AngularJS dependencies into your Angular code.
Maybe you have some business logic still in AngularJS services.
Maybe you want access to AngularJS's built-in services like `$location` or `$timeout`.

当运行一个混合式应用时，我们可能会遇到这种情况：我们需要把某些AngularJS的依赖注入到Angular代码中。
这可能是因为某些业务逻辑仍然在AngularJS服务中，或者需要某些AngularJS的内置服务，比如`$location`或`$timeout`。

In these situations, it is possible to *upgrade* an AngularJS provider to
Angular. This makes it possible to then inject it somewhere in Angular
code. For example, you might have a service called `HeroesService` in AngularJS:
在这些情况下，把一个AngularJS提供商*升级到*Angular也是有可能的。这就让它将来有可能被注入到Angular代码中的某些地方。
比如，我们可能在AngularJS中有一个名叫`HeroesService`的服务：

<code-example path="upgrade-module/src/app/ajs-to-a-providers/heroes.service.ts" title="heroes.service.ts">
</code-example>

You can upgrade the service using a Angular [factory provider](guide/dependency-injection#factory-providers)
that requests the service from the AngularJS `$injector`.

我们可以Angular的[工厂提供商（factory provider）](guide/dependency-injection#factory-providers)升级该服务，
它从AngularJS的`$injector`请求服务。Angular依赖的名称由你确定：

Many developers prefer to declare the factory provider in a separate `ajs-upgraded-providers.ts` file
so that they are all together, making it easier to reference them, create new ones and
delete them once the upgrade is over.

很多开发者都喜欢在一个独立的`ajs-upgraded-providers.ts`中声明这个工厂提供商，以便把它们都放在一起，这样便于引用、创建新的以及在升级完毕时删除它们。

It's also recommended to export the `heroesServiceFactory` function so that Ahead-of-Time
compilation can pick it up.

我们还建议导出`heroesServiceFactory`函数，以便AOT编译器可以拿到它们。


<code-example path="upgrade-module/src/app/ajs-to-a-providers/ajs-upgraded-providers.ts" title="ajs-upgraded-providers.ts">
</code-example>

<code-example path="upgrade-module/src/app/ajs-to-a-providers/app.module.ts" region="register" title="app.module.ts">
</code-example>



You can then inject it in Angular using it's class as a type annotation:
然后我们可以一个字符串型令牌，把它注入到Angular中：

<code-example path="upgrade-module/src/app/ajs-to-a-providers/hero-detail.component.ts" title="hero-detail.component.ts">

</code-example>

<div class="alert is-helpful">

In this example you upgraded a service class.
You can use a TypeScript type annotation when you inject it. While it doesn't
affect how the dependency is handled, it enables the benefits of static type
checking. This is not required though, and any AngularJS service, factory, or
provider can be upgraded.

在这个例子中，我们升级了服务类。当我们注入它时，我们可以使用TypeScript类型注解来获得这些额外的好处。
它没有影响该依赖的处理过程，同时还得到了启用静态类型检查的好处。
任何AngularJS中的服务、工厂和提供商都能被升级 —— 尽管这不是必须的。


</div>

### Making Angular Dependencies Injectable to AngularJS

### 让Angular的依赖能被注入到AngularJS中

In addition to upgrading AngularJS dependencies, you can also *downgrade*
Angular dependencies, so that you can use them from AngularJS. This can be
useful when you start migrating services to Angular or creating new services
in Angular while retaining components written in AngularJS.

除了能升级AngularJS依赖之外，我们还能*降级*Angular的依赖，以便我们能在AngularJS中使用它们。
当我们已经开始把服务移植到Angular或在Angular中创建新服务，但同时还有一些用AngularJS写成的组件时，这会非常有用。For example, you might have an Angular service called `Heroes`:
例如，我们可能有一个Angular的`Heroes`服务：

<code-example path="upgrade-module/src/app/a-to-ajs-providers/heroes.ts" title="heroes.ts">
</code-example>

Again, as with Angular components, register the provider with the `NgModule` by adding it to the module's `providers` list.

仿照Angular组件，我们通过把该提供商加入`NgModule`的`providers`列表中来注册它。


<code-example path="upgrade-module/src/app/a-to-ajs-providers/app.module.ts" region="ngmodule" title="app.module.ts">
</code-example>



Now wrap the Angular `Heroes` in an *AngularJS factory function* using `downgradeInjectable()` 
and plug the factory into an AngularJS module. 
The name of the AngularJS dependency is up to you:

现在，我们使用`upgradeAdapter.downgradeNg2Provider()`来把Angular的`Heroes`包装成*AngularJS的工厂函数*，并把这个工厂注册进AngularJS的模块中。
依赖在AngularJS中的名字你可以自己定：


<code-example path="upgrade-module/src/app/a-to-ajs-providers/app.module.ts" region="register" title="app.module.ts">
</code-example>



After this, the service is injectable anywhere in  AngularJS code:
此后，该服务就能被注入到AngularJS代码中的任何地方了：

<code-example path="upgrade-module/src/app/a-to-ajs-providers/hero-detail.component.ts" title="hero-detail.component.ts">
</code-example>

## Using Ahead-of-time compilation with hybrid apps

## 在混合式应用中使用AOT编译

You can take advantage of Ahead-of-time (AOT) compilation on hybrid apps just like on any other
Angular application.
The setup for an hybrid app is mostly the same as described in
[the Ahead-of-time Compilation chapter](guide/aot-compiler)
save for differences in `index.html` and `main-aot.ts`

我们也可以其它Angular应用一样在混合式应用中发挥AOT编译的优势。
对混合式应用的设置过程和[预编译](guide/aot-compiler)章节中所讲的几乎完全一样，不同点在于`index.html`和`main-aot.ts`中。

The `index.html` will likely have script tags loading AngularJS files, so the `index.html`
for AOT must also load those files.
An easy way to copy them is by adding each to the `copy-dist-files.js` file.

我们的`index.html`仍然需要script标签来加载AngularJS的文件，因此我们使用AOT编译的`index.html`也需要加载那些文件。
复制它们的简单方案是把它们全都添加到`copy-dist-files.js`文件中。

You'll need to use the generated `AppModuleFactory`, instead of the original `AppModule` to
bootstrap the hybrid app:

我们还要使用所生成的`AppModuleFactory`而不是原来的`AppModule`来引导一个混合式应用：

<code-example path="upgrade-phonecat-2-hybrid/app/main-aot.ts" title="app/main-aot.ts">
</code-example>

And that's all you need do to get the full benefit of AOT for Angular apps!

这就是我们为获取Angular应用的AOT优势所要做的一切。

## PhoneCat Upgrade Tutorial

## PhoneCat升级教程

In this section, you'll learn to prepare and upgrade an application with `ngUpgrade`.
The example app is [Angular PhoneCat](https://github.com/angular/angular-phonecat)
from [the original AngularJS tutorial](https://docs.angularjs.org/tutorial),
which is where many of us began our Angular adventures. Now you'll see how to
bring that application to the brave new world of Angular.

在本节和下节中，我们将看一个完整的例子，它使用`upgrade`模块准备和升级了一个应用程序。
该应用就是来自[原AngularJS教程](https://docs.angularjs.org/tutorial)中的[Angular PhoneCat](https://github.com/angular/angular-phonecat)。
那是我们很多人当初开始Angular探险之旅的起点。
现在，我们来看看如何把该应用带入Angular的美丽新世界。

During the process you'll learn how to apply the steps outlined in the
[preparation guide](guide/upgrade#preparation). You'll align the application
with Angular and also start writing in TypeScript.

这期间，我们将学到如何在实践中应用[准备指南](guide/upgrade#preparation)中列出的那些重点步骤：
我们先让该应用向Angular看齐，然后为它引入SystemJS模块加载器和TypeScript。

To follow along with the tutorial, clone the
[angular-phonecat](https://github.com/angular/angular-phonecat) repository
and apply the steps as you go.

要跟随本教程，请先把[angular-phonecat](https://github.com/angular/angular-phonecat)仓库克隆到本地，并跟我们一起应用这些步骤。In terms of project structure, this is where the work begins:
在项目结构方面，我们工作的起点是这样的：

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

这确实是一个很好地起点。特别是，该结构遵循了[AngularJS 风格指南](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)，
要想成功升级，这是一个很重要的[准备步骤](guide/upgrade#follow-the-angular-styleguide)。

* Each component, service, and filter is in its own source file, as per the
  [Rule of 1](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility).

  每个组件、服务和过滤器都在它自己的源文件中 —— 就像[单一规则](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)所要求的。

* The `core`, `phone-detail`, and `phone-list` modules are each in their
  own subdirectory. Those subdirectories contain the JavaScript code as well as
  the HTML templates that go with each particular feature. This is in line with the
  [Folders-by-Feature Structure](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure)
  and [Modularity](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)
  rules.

  `core`、`phone-detail`和`phone-list`模块都在它们自己的子目录中。那些子目录除了包含HTML模板之外，还包含JavaScript代码，它们共同完成一个特性。
  这是[按特性分目录的结构](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y152)
  和[模块化](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity)规则所要求的。

* Unit tests are located side-by-side with application code where they are easily
  found, as described in the rules for
  [Organizing Tests](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#organizing-tests).

  单元测试都和应用代码在一起，它们很容易找到。就像规则
  [组织测试文件](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#organizing-tests)中要求的那样。


### Switching to TypeScript

### 切换到TypeScript

Since you're going to be writing Angular code in TypeScript, it makes sense to
bring in the TypeScript compiler even before you begin upgrading.

因为我们将使用TypeScript编写Angular的代码，所以在开始升级之前，我们把TypeScript的编译器设置好是很合理的。

You'll also start to gradually phase out the Bower package manager in favor
of NPM, installing all new dependencies using NPM, and eventually removing Bower from the project.

我们还将开始逐步淘汰Bower包管理器，换成我们更喜欢的NPM。后面我们将使用NPM来安装新的依赖包，并最终从项目中移除Bower。

Begin by installing TypeScript to the project.

让我们先把TypeScript包安装到项目中。

<code-example format="">
  npm i typescript --save-dev
</code-example>

Install type definitions for the existing libraries that
you're using but that don't come with prepackaged types: AngularJS and the
Jasmine unit test framework.

我们还要为那些没有自带类型信息的库（比如 AngularJS 和 Jasmine）安装类型定义文件。

<code-example format="">
  npm install @types/jasmine @types/angular @types/angular-animate @types/angular-cookies @types/angular-mocks @types/angular-resource @types/angular-route @types/angular-sanitize --save-dev
</code-example>

You should also configure the TypeScript compiler with a `tsconfig.json` in the project directory
as described in the [TypeScript Configuration](guide/typescript-configuration) guide.
The `tsconfig.json` file tells the TypeScript compiler how to turn your TypeScript files
into ES5 code bundled into CommonJS modules.

我们还应该配置TypeScript编译器，以便它能理解我们的项目结构。我们要往项目目录下添加一个`tsconfig.json`文件，
就像在[搭建本地开发环境](guide/setup)中做过的那样。它将告诉TypeScript编译器，该如何编译我们的源文件。
`tsconfig.json`文件会告诉 TypeScript 编译器如何把 TypeScript 文件转成 ES5 代码，并打包进 CommonJS 模块中。

Finally, you should add some npm scripts in `package.json` to compile the TypeScript files to
JavaScript (based on the `tsconfig.json` configuration file):

最后，我们应该把下列 npm 脚本添加到 `package.json` 中，用于把 TypeScript 文件编译成 JavaScript （根据`tsconfig.json`的配置）：

<code-example format="">
  "script": {
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

Next, convert your current JavaScript files into TypeScript. Since
TypeScript is a super-set of ECMAScript 2015, which in turn is a super-set
of ECMAScript 5, you can simply switch the file extensions from `.js` to `.ts`
and everything will work just like it did before. As the TypeScript compiler
runs, it emits the corresponding `.js` file for every `.ts` file and the
compiled JavaScript is what actually gets executed. If you start
the project HTTP server with `npm start`, you should see the fully functional
application in your browser.

我们要做的下一件事是把JavaScript文件转换成TypeScript文件。
由于TypeScript是ECMAScript 2015的一个超集，而ES2015又是ECMAScript 5的超集，所以我们可以简单的把文件的扩展名从`.js`换成`.ts`，
它们还是会像以前一样工作。由于TypeScript编译器仍在运行，它会为每一个`.ts`文件生成对应的`.js`文件，而真正运行的是编译后的`.js`文件。
如果你用`npm start`开启了本项目的HTTP服务器，你会在浏览器中看到一个功能完好的应用。

Now that you have TypeScript though, you can start benefiting from some of its
features. There's a lot of value the language can provide to AngularJS applications.

有了TypeScript，我们就可以从它的一些特性中获益了。此语言可以为AngularJS应用提供很多价值。

For one thing, TypeScript is a superset of ES2015. Any app that has previously
been written in ES5 - like the PhoneCat example has - can with TypeScript
start incorporating all of the JavaScript features that are new to ES2015.
These include things like `let`s and `const`s, arrow functions, default function
parameters, and destructuring assignments.

首先，TypeScript是一个ES2015的超集。任何以前用ES5写的程序(就像PhoneCat范例)都可以开始通过TypeScript
纳入那些添加到ES2015中的新特性。
这包括`let`、`const`、箭头函数、函数默认参数以及解构(destructure)赋值。

Another thing you can do is start adding *type safety* to your code. This has
actually partially already happened because of the AngularJS typings you installed.
TypeScript are checking that you are calling AngularJS APIs correctly when you do
things like register components to Angular modules.

我们能做的另一件事就是把*类型安全*添加到代码中。这实际上已经部分完成了，因为我们已经安装了AngularJS的类型定义。
当我们正确调用AngularJS的API时，TypeScript会帮我们检查它 —— 比如往Angular模块中注册组件。

But you can also start adding *type annotations* to get even more
out of TypeScript's type system. For instance, you can annotate the checkmark
filter so that it explicitly expects booleans as arguments. This makes it clearer
what the filter is supposed to do.

我们还能开始把*类型注解*添加到自己的代码中，来从TypeScript的类型系统中获得更多帮助。
比如，我们可以给`checkmark`过滤器加上注解，表明它期待一个`boolean`类型的参数。
这可以更清楚的表明此过滤器打算做什么


<code-example path="upgrade-phonecat-1-typescript/app/core/checkmark/checkmark.filter.ts" title="app/core/checkmark/checkmark.filter.ts">
</code-example>

In the `Phone` service, you can explicitly annotate the `$resource` service dependency
as an `angular.resource.IResourceService` - a type defined by the AngularJS typings.

在`Phone`服务中，我们可以明确的把`$resource`服务声明为`angular.resource.IResourceService`，一个AngularJS类型定义提供的类型。


<code-example path="upgrade-phonecat-1-typescript/app/core/phone/phone.service.ts" title="app/core/phone/phone.service.ts">
</code-example>



You can apply the same trick to the application's route configuration file in `app.config.ts`,
where you are using the location and route services. By annotating them accordingly TypeScript
can verify you're calling their APIs with the correct kinds of arguments.
我们可以在应用的路由配置中使用同样的技巧，那里我们用到了location和route服务。
一旦给它们提供了类型信息，TypeScript就能检查我们是否在用类型的正确参数来调用它们了。

<code-example path="upgrade-phonecat-1-typescript/app/app.config.ts" title="app/app.config.ts">
</code-example>

<div class="l-sub-section">

The [AngularJS 1.x type definitions](https://www.npmjs.com/package/@types/angular)
you installed are not officially maintained by the Angular team,
but are quite comprehensive. It is possible to make an AngularJS 1.x application
fully type-annotated with the help of these definitions.

我们用typings工具安装的这个[AngularJS.x类型定义文件](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/angularjs)
并不是由Angular开发组维护的，但它也已经足够全面了。借助这些类型定义的帮助，它可以为AngularJS.x程序加上全面的类型注解。

If this is something you wanted to do, it would be a good idea to enable
the `noImplicitAny` configuration option in `tsconfig.json`. This would
cause the TypeScript compiler to display a warning when there's any code that
does not yet have type annotations. You could use it as a guide to inform
us about how close you are to having a fully annotated project.
如果我们想这么做，那么在`tsconfig.json`中启用`noImplicitAny`配置项就是一个好主意。
这样，如果遇到什么还没有类型注解的代码，TypeScript编译器就会显示一个警告。
我们可以用它作为指南，告诉我们现在与一个完全类型化的项目距离还有多远。

</div>

Another TypeScript feature you can make use of is *classes*. In particular, you
can turn component controllers into classes. That way they'll be a step
closer to becoming Angular component classes, which will make life
easier once you upgrade.

我们能用的另一个TypeScript特性是*类*。具体来讲，我们可以把控制器转换成类。
这种方式下，我们离成为Angular组件类就又近了一步，它会令我们的升级之路变得更简单。

AngularJS expects controllers to be constructor functions. That's exactly what
ES2015/TypeScript classes are under the hood, so that means you can just plug in a
class as a component controller and AngularJS will happily use it.

AngularJS期望控制器是一个构造函数。这实际上就是ES2015/TypeScript中的类，
这也就意味着只要我们把一个类注册为组件控制器，AngularJS就会愉快的使用它。Here's what the new class for the phone list component controller looks like:
新的“电话列表(phone list)”组件控制器类是这样的：

<code-example path="upgrade-phonecat-1-typescript/app/phone-list/phone-list.component.ts" title="app/phone-list/phone-list.component.ts">
</code-example>

What was previously done in the controller function is now done in the class
constructor function. The dependency injection annotations are attached
to the class using a static property `$inject`. At runtime this becomes the
`PhoneListController.$inject` property.

以前在控制器函数中实现的一切，现在都改由类的构造函数来实现了。类型注入注解通过静态属性`$inject`
被附加到了类上。在运行时，它们变成了`PhoneListController.$inject`。

The class additionally declares three members: The array of phones, the name of
the current sort key, and the search query. These are all things you have already
been attaching to the controller but that weren't explicitly declared anywhere.
The last one of these isn't actually used in the TypeScript code since it's only
referred to in the template, but for the sake of clarity you should define all of the
controller members.

该类还声明了另外三个成员：电话列表、当前排序键的名字和搜索条件。
这些东西我们以前就加到了控制器上，只是从来没有在任何地方显式定义过它们。最后一个成员从未真正在TypeScript代码中用过，
因为它只是在模板中被引用过。但为了清晰起见，我们还是应该定义出此控制器应有的所有成员。

In the Phone detail controller, you'll have two members: One for the phone
that the user is looking at and another for the URL of the currently displayed image:

在电话详情控制器中，我们有两个成员：一个是用户正在查看的电话，另一个是正在显示的图像：


<code-example path="upgrade-phonecat-1-typescript/app/phone-detail/phone-detail.component.ts" title="app/phone-detail/phone-detail.component.ts">
</code-example>

This makes the controller code look a lot more like Angular already. You're
all set to actually introduce Angular into the project.

这已经让我们的控制器代码看起来更像Angular了。我们的准备工作做好了，可以引进Angular到项目中了。

If you had any AngularJS services in the project, those would also be
a good candidate for converting to classes, since like controllers,
they're also constructor functions. But you only have the `Phone` factory
in this project, and that's a bit special since it's an `ngResource`
factory. So you won't be doing anything to it in the preparation stage.
You'll instead turn it directly into an Angular service.

如果项目中有任何AngularJS的服务，它们也是转换成类的优秀候选人，像控制器一样，它们也是构造函数。
但是在本项目中，我们只有一个`Phone`工厂，这有点特别，因为它是一个`ngResource`工厂。
所以我们不会在准备阶段中处理它，而是在下一节中直接把它转换成Angular服务。

### Installing Angular
### 安装Angular

Having completed the preparation work, get going with the Angular
upgrade of PhoneCat. You'll do this incrementally with the help of
[ngUpgrade](#upgrading-with-ngupgrade) that comes with Angular.
By the time you're done, you'll be able to remove AngularJS from the project
completely, but the key is to do this piece by piece without breaking the application.

我们已经完成了准备工作，接下来就开始把PhoneCat升级到Angular。
我们将在Angular[升级模块](guide/upgrade#upgrading-with-ngupgrade)的帮助下增量式的完成此项工作。
等我们完成的那一刻，就能把AngularJS从项目中完全移除了，但其中的关键是在不破坏此程序的前提下一小块一小块的完成它。


<div class="alert is-important">



The project also contains some animations.
You won't upgrade them in this version of the guide.
Turn to the [Angular animations](guide/animations) guide to learn about that.

该项目还包含一些动画，在此指南的当前版本我们先不升级它，等到后面的发行版再改。


</div>

Install Angular into the project, along with the SystemJS module loader.
Take a look at the results of the [Setup](guide/setup) instructions
and get the following configurations from there:

我们来使用SystemJS模块加载器把Angular安装到项目中。
看看[搭建本地开发环境](guide/setup)中的指南，并从那里获得如下配置：

* Add Angular and the other new dependencies to `package.json`

  把Angular和其它新依赖添加到`package.json`中
  
* The SystemJS configuration file `systemjs.config.js` to the project root directory.

  把SystemJS的配置文件`systemjs.config.js`添加到项目的根目录。

Once these are done, run:

这些完成之后，就运行：


<code-example format="">
  npm install
</code-example>

Soon you can load Angular dependencies into the application via `index.html`,
but first you need to do some directory path adjustments.
You'll need to load files from `node_modules` and the project root instead of
from the `/app` directory as you've been doing to this point.

我们可以通过`index.html`来把Angular的依赖快速加载到应用中，
但首先，我们得做一些目录结构调整。这是因为我们正准备从`node_modules`中加载文件，然而目前项目中的每一个文件都是从`/app`目录下加载的。

Move the `app/index.html` file to the project root directory. Then change the
development server root path in `package.json` to also point to the project root
instead of `app`:

把`app/index.html`移入项目的根目录，然后把`package.json`中的开发服务器根目录也指向项目的根目录，而不再是`app`目录：

<code-example format="">
  "start": "http-server ./ -a localhost -p 8000 -c-1",
</code-example>

Now you're able to serve everything from the project root to the web browser. But you do *not*
want to have to change all the image and data paths used in the application code to match
the development setup. For that reason, you'll add a `<base>` tag to `index.html`, which will
cause relative URLs to be resolved back to the `/app` directory:

现在，我们能把项目根目录下的每一样东西发给浏览器了。但我们不想为了适应开发环境中的设置，被迫修改应用代码中用到的所有图片和数据的路径。因此，我们往`index.html`中添加一个`<base>`标签，它将导致各种相对路径被解析回`/app`目录：


<code-example path="upgrade-phonecat-2-hybrid/index.html" region="base" title="index.html">
</code-example>

Now you can load Angular via SystemJS. You'll add the Angular polyfills and the
SystemJS config to the end of the `<head>` section, and then you'll use `System.import`
to load the actual application:

现在我们可以通过SystemJS加载Angular了。我们将把Angular的填充库(polyfills)
和SystemJS的配置加到`<head>`区的末尾，然后，我们就用`System.import`来加载实际的应用：


<code-example path="upgrade-phonecat-2-hybrid/index.html" region="angular" title="index.html">
</code-example>

You also need to make a couple of adjustments
to the `systemjs.config.js` file installed during [setup](guide/setup).

我们还需要对[环境设置](guide/setup)期间安装的`systemjs.config.js`文件做一些调整。

Point the browser to the project root when loading things through SystemJS,
instead of using the  `<base>` URL.

我们要在通过SystemJS加载期间为浏览器指出项目的根在哪里，而不再使用`<base>` URL。

Install the `upgrade` package via `npm install @angular/upgrade --save`
and add a mapping for the `@angular/upgrade/static` package.

我们还要通过`npm install @angular/upgrade --save`来安装`upgrade`包，并为`@angular/upgrade/static`包添加一个映射。

<code-example path="upgrade-phonecat-2-hybrid/systemjs.config.1.js" region="paths" title="systemjs.config.js">
</code-example>

### Creating the _AppModule_

### 创建*AppModule*

Now create the root `NgModule` class called `AppModule`.
There is already a file named `app.module.ts` that holds the AngularJS module.
Rename it to `app.module.ajs.ts` and update the corresponding script name in the `index.html` as well.
The file contents remain:

现在，创建一个名叫`AppModule`的根`NgModule`类。
我们已经有了一个名叫`app.module.ts`的文件，其中存放着AngularJS的模块。
把它改名为`app.module.ng1.ts`，同时也要在`index.html`中更新对应的脚本名。
文件的内容保留：


<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ajs.ts" title="app.module.ajs.ts">
</code-example>

Now create a new `app.module.ts` with the minimum `NgModule` class:

然后创建一个新的`app.module.ts`文件，其中是一个最小化的`NgModule`类：


<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="bare" title="app.module.ts">
</code-example>

### Bootstrapping a hybrid PhoneCat

### 引导PhoneCat的1+2混合式应用

Next, you'll bootstrap the application as a *hybrid application*
that supports both AngularJS and Angular components. After that,
you can start converting the individual pieces to Angular.

接下来，我们把该应用程序引导改装为一个同时支持AngularJS和Angular的*混合式应用*。
然后，就能开始把这些不可分割的小块转换到Angular了。

The application is currently bootstrapped using the AngularJS `ng-app` directive
attached to the `<html>` element of the host page. This will no longer work in the hybrid
app. Switch to the [ngUpgrade bootstrap](#bootstrapping-hybrid-applications) method
instead.

我们的应用现在是使用宿主页面中附加到`<html>`元素上的`ng-app`指令引导的。
但在混合式应用中，它不再工作了。我们得用[ngUpgrade bootstrap](#bootstrapping-hybrid-applications)方法代替。

First, remove the `ng-app` attribute from `index.html`.
Then import `UpgradeModule` in the `AppModule`, and override it's `ngDoBootstrap` method:

首先，从`index.html`中移除`ng-app`。然后在`AppModule`中导入`UpgradeModule`，并改写它的`ngDoBootstrap`方法：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="upgrademodule" title="app/app.module.ts">
</code-example>

Note that you are bootstrapping the AngularJS module from inside `ngDoBootstrap`.
The arguments are the same as you would pass to `angular.bootstrap` if you were manually
bootstrapping AngularJS: the root element of the application; and an array of the
AngularJS 1.x modules that you want to load.

注意，我们正在从内部的`ngDoBootstrap`中引导 AngularJS 模块。
它的参数和我们在手动引导AngularJS时传给`angular.bootstrap`的是一样的：应用的根元素，和所要加载的 AngularJS 1.x 模块的数组。

Finally, bootstrap the `AppModule` in `src/main.ts`.
This file has been configured as the application entrypoint in `systemjs.config.js`,
so it is already being loaded by the browser.

最后，在`src/main.ts`中引导这个`AppModule`。该文件在`systemjs.config.js`中被配置为了应用的入口，所以它已经被加载进了浏览器中。


<code-example path="upgrade-phonecat-2-hybrid/app/main.ts" region="bootstrap" title="app/main.ts">
</code-example>

Now you're running both AngularJS and Angular at the same time. That's pretty
exciting! You're not running any actual Angular components yet. That's next.

现在，我们同时运行着AngularJS和Angular。漂亮！不过我们还没有运行什么实际的Angular组件，接下来我们就做这件事。

<div class="l-sub-section">

#### Why declare _angular_ as _angular.IAngularStatic_?

#### 为何要声明*angular*为*angular.IAngularStatic*？

`@types/angular` is declared as a UMD module, and due to the way
<a href="https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#support-for-umd-module-definitions">UMD typings</a>
work, once you have an ES6 `import` statement in a file all UMD typed modules must also be
imported via `import` statements instead of being globally available.

`@types/angular`声明为UMD模块，根据<a href="https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#support-for-umd-module-definitions" target="_blank">UMD类型</a>
的工作方式，一旦你在文件中有一条ES6的`import`语句，所有的UMD类型化的模型必须都通过`import`语句导入，
而是不是全局可用。

AngularJS is currently loaded by a script tag in `index.html`, which means that the whole app
has access to it as a global and uses the same instance of the `angular` variable.
If you used `import * as angular from 'angular'` instead, you'd also have to
load every file in the AngularJS app to use ES2015 modules in order to ensure AngularJS was being
loaded correctly.

AngularJS是日前是通过`index.html`中的script标签加载，这意味着整个应用是作为一个全局变量进行访问的，
使用同一个`angular`变量的实例。
但如果我们使用`import * as angular from 'angular'`，我还需要彻底修改AngularJS应用中加载每个文件的方式，
确保AngularJS应用被正确加载。

This is a considerable effort and it often isn't worth it, especially since you are in the
process of moving your code to Angular.
Instead, declare `angular` as `angular.IAngularStatic` to indicate it is a global variable
and still have full typing support.

这需要相当多的努力，通常也不值得去做，特别是我们的应用正在朝着Angular前进。
但如果我们声明`angular`为`angular.IAngularStatic`，指明它是一个全局变量，
仍然可以获得全面的类型支持。


</div>

### Upgrading the Phone service

### 升级`Phone`服务

The first piece you'll port over to Angular is the `Phone` service, which
resides in `app/core/phone/phone.service.ts` and makes it possible for components
to load phone information from the server. Right now it's implemented with
ngResource and you're using it for two things:

我们要移植到Angular的第一块是`Phone`工厂(位于`app/js/core/phones.factory.ts`)，
并且让它能帮助控制器从服务器上加载电话信息。目前，它是用`ngResource`实现的，我们用它做两件事：

* For loading the list of all phones into the phone list component.

  把所有电话的列表加载到电话列表组件中。
  
* For loading the details of a single phone into the phone detail component.

  把一台电话的详情加载到电话详情组件中。

You can replace this implementation with an Angular service class, while
keeping the controllers in AngularJS land.

我们可以用Angular的服务类来替换这个实现，而把控制器继续留在AngularJS的地盘上。

In the new version, you import the Angular HTTP module and call its `Http` service instead of `ngResource`.

在这个新版本中，我们导入了Angular的HTTP模块，并且用它的`Http`服务替换掉`NgResource`。

Re-open the `app.module.ts` file, import and add `HttpModule` to the `imports` array of the `AppModule`:

再次打开`app.module.ts`文件，导入并把`HttpModule`添加到`AppModule`的`imports`数组中：


<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="httpmodule" title="app.module.ts">
</code-example>

Now you're ready to upgrade the Phone service itself. Replace the ngResource-based
service in `phone.service.ts` with a TypeScript class decorated as `@Injectable`:

现在，我们已经准备好了升级`Phones`服务本身。我们将为`phone.service.ts`文件中基于ngResource的服务加上`@Injectable`装饰器：


<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="classdef" title="app/core/phone/phone.service.ts (skeleton)" linenums="false">
</code-example>

The `@Injectable` decorator will attach some dependency injection metadata
to the class, letting Angular know about its dependencies. As described
by the [Dependency Injection Guide](guide/dependency-injection),
this is a marker decorator you need to use for classes that have no other
Angular decorators but still need to have their dependencies injected.

`@Injectable`装饰器将把一些依赖注入相关的元数据附加到该类上，让Angular知道它的依赖信息。
就像在[依赖注入指南](guide/dependency-injection)中描述过的那样，
这是一个标记装饰器，我们要把它用在那些没有其它Angular装饰器，并且自己有依赖注入的类上。

In its constructor the class expects to get the `Http` service. It will
be injected to it and it is stored as a private field. The service is then
used in the two instance methods, one of which loads the list of all phones,
and the other loads the details of a specified phone:


在它的构造函数中，该类期待一个`Http`服务。`Http`服务将被注入进来并存入一个私有字段。
然后该服务在两个实例方法中被使用到，一个加载所有电话的列表，另一个加载一台指定电话的详情：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="fullclass" title="app/core/phone/phone.service.ts">
</code-example>

The methods now return Observables of type `PhoneData` and `PhoneData[]`. This is
a type you don't have yet. Add a simple interface for it:
该方法现在返回一个`Phone`类型或`Phone[]`类型的可观察对象(Observable)。
这是一个我们从未用过的类型，因此我们得为它新增一个简单的接口：

<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="phonedata-interface" title="app/core/phone/phone.service.ts (interface)" linenums="false">
</code-example>

`@angular/upgrade/static` has a `downgradeInjectable` method for the purpose of making
Angular services available to AngularJS code. Use it to plug in the `Phone` service:

`@angular/upgrade/static`有一个`downgradeInjectable`方法，可以使Angular服务在AngularJS的代码中可用。
使用它来插入`Phone`服务：


<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" region="downgrade-injectable" title="app/core/phone/phone.service.ts (downgrade)" linenums="false">
</code-example>

Here's the full, final code for the service:

最终，该类的全部代码如下：


<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.ts" title="app/core/phone/phone.service.ts">
</code-example>

Notice that you're importing the `map` operator of the RxJS `Observable` separately.
Do this for every RxJS operator.

注意，我们单独导入了RxJS `Observable`中的`map`操作符。
我们需要对想用的所有RxJS操作符这么做，因为Angular默认不会加载所有RxJS操作符。The new `Phone` service has the same features as the original, `ngResource`-based service. 
Because it's an Angular service, you register it with the `NgModule` providers:
这个新的`Phone`服务具有和老的基于`ngResource`的服务相同的特性。
因为它是Angular服务，我们通过`NgModule`的`providers`数组来注册它：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="phone" title="app.module.ts">
</code-example>

Now that you are loading `phone.service.ts` through an import that is resolved
by SystemJS, you should **remove the &lt;script&gt; tag** for the service from `index.html`.
This is something you'll do to all components as you upgrade them. Simultaneously
with the AngularJS to Angular upgrade you're also migrating code from scripts to modules.

现在，我们正在用SystemJS加载`phone.service.ts`，我们应该从`index.html`中**移除该服务的`<script>`标签**。
这也是我们在升级所有组件时将会做的事。在从AngularJS向Angular升级的同时，我们也把代码从脚本移植为模块。

At this point, you can switch the two components to use the new service
instead of the old one.  While you `$inject` it as the downgraded `phone` factory,
it's really an instance of the `Phone` class and you annotate its type accordingly:

这时，我们可以把两个控制器从使用老的服务切换成使用新的。我们像降级过的`phones`工厂一样`$inject`它，
但它实际上是一个`Phones`类的实例，并且我们可以据此注解它的类型：

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ajs.ts" title="app/phone-list/phone-list.component.ts">
</code-example>

<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.component.ajs.ts" title="app/phone-detail/phone-detail.component.ts">
</code-example>

Now there are two AngularJS components using an Angular service!
The components don't need to be aware of this, though the fact that the
service returns Observables and not Promises is a bit of a giveaway.
In any case, what you've achieved is a migration of a service to Angular
without having to yet migrate the components that use it.

这里的两个AngularJS控制器在使用Angular的服务！控制器不需要关心这一点，尽管实际上该服务返回的是可观察对象(Observable)，而不是承诺(Promise)。
无论如何，我们达到的效果都是把服务移植到Angular，而不用被迫移植组件来使用它。


<div class="alert is-helpful">



You could  use the `toPromise` method of `Observable` to turn those
Observables into Promises in the service. In many cases that
reduce the number of changes to the component controllers.
我们也能使用`Observable`的`toPromise`方法来在服务中把这些可观察对象转变成承诺，以进一步减小组件控制器中需要修改的代码量。

</div>

### Upgrading Components

### 升级组件


Upgrade the AngularJS components to Angular components next.
Do it one component at a time while still keeping the application in hybrid mode.
As you make these conversions, you'll also define your first Angular *pipes*.

接下来，我们把AngularJS的控制器升级成Angular的组件。我们每次升级一个，同时仍然保持应用运行在混合模式下。
在做转换的同时，我们还将自定义首个Angular*管道*。

Look at the phone list component first. Right now it contains a TypeScript
controller class and a component definition object. You can morph this into
an Angular component by just renaming the controller class and turning the
AngularJS component definition object into an Angular `@Component` decorator.
You can then also remove the static `$inject` property from the class:

让我们先看看电话列表组件。它目前包含一个TypeScript控制器类和一个组件定义对象。重命名控制器类，
并把AngularJS的组件定义对象更换为Angular `@Component`装饰器，这样我们就把它变形为Angular
的组件了。然后，我们还从类中移除静态`$inject`属性。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ts" region="initialclass" title="app/phone-list/phone-list.component.ts">
</code-example>

The `selector` attribute is a CSS selector that defines where on the page the component
should go. In AngularJS you do matching based on component names, but in Angular you
have these explicit selectors. This one will match elements with the name `phone-list`,
just like the AngularJS version did.

`selector`属性是一个CSS选择器，用来定义组件应该被放在页面的哪。在AngularJS，我们基于组件名字来匹配，
但是在Angular中，我们要有一个专门指定的选择器。本组件将会对应元素名字`phone-list`，和AngularJS版本一样。

Now convert the template of this component into Angular syntax.
The search controls replace the AngularJS `$ctrl` expressions
with Angular's two-way `[(ngModel)]` binding syntax:

现在，我们还需要将组件的模版也转换为Angular语法。在搜索控件中，我们要为把AngularJS的`$ctrl`表达式替换成Angular的双向绑定语法`[(ngModel)]`：


<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.template.html" region="controls" title="app/phone-list/phone-list.template.html (search controls)" linenums="false">
</code-example>

Replace the list's `ng-repeat` with an `*ngFor` as
[described in the Template Syntax page](guide/template-syntax#directives).
Replace the image tag's `ng-src` with a binding to the native `src` property.

我们需要把列表中的`ng-repeat`替换为`*ngFor`以及它的`let var of iterable`语法，
该语法在[模板语法指南中讲过](guide/template-syntax#directives)。
对于图片，我们可以把`img`标签的`ng-src`替换为一个标准的`src`属性(property)绑定。


<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.template.html" region="list" title="app/phone-list/phone-list.template.html (phones)" linenums="false">
</code-example>

#### No Angular _filter_ or _orderBy_ filters

#### Angular中没有`filter`或`orderBy`过滤器

The built-in AngularJS `filter` and `orderBy` filters do not exist in Angular,
so you need to do the filtering and sorting yourself.

Angular中并不存在AngularJS中内置的`filter`和`orderBy`过滤器。
所以我们得自己实现进行过滤和排序。

You replaced the `filter` and `orderBy` filters with bindings to the `getPhones()` controller method,
which implements the filtering and ordering logic inside the component itself.

我们把`filter`和`orderBy`过滤器改成绑定到控制器中的`getPhones()`方法，通过该方法，组件本身实现了过滤和排序逻辑。


<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ts" region="getphones" title="app/phone-list/phone-list.component.ts">
</code-example>

Now you need to downgrade the Angular component so you can use it in AngularJS.
Instead of registering a component, you register a `phoneList` *directive*,
a downgraded version of the Angular component.

现在我们需要降级我们的Angular组件，这样我们就可以在AngularJS中使用它。
我们需要注册一个`phoneList`*指令*，而不是注册一个组件，它是一个降级版的Angular组件。

The `as angular.IDirectiveFactory` cast tells the TypeScript compiler
that the return value of the `downgradeComponent` method is a directive factory.

强制类型转换`as angular.IDirectiveFactory`告诉TypeScript编译器`downgradeComponent`方法
的返回值是一个指令工厂。


<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.ts" region="downgrade-component" title="app/phone-list/phone-list.component.ts">
</code-example>

The new `PhoneListComponent` uses the Angular `ngModel` directive, located in the `FormsModule`.
Add the `FormsModule` to `NgModule` imports, declare the new `PhoneListComponent` and
finally add it to `entryComponents` since you downgraded it:
新的`PhoneListComponent`使用Angular的`ngModel`指令，它位于`FormsModule`中。
把`FormsModule`添加到`NgModule`的`imports`中，并声明新的`PhoneListComponent`组件，
最后由我们把它降级了，添加到`entryComponents`：

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="phonelist" title="app.module.ts">
</code-example>

Remove the &lt;script&gt; tag for the phone list component from `index.html`.

从`index.html`中移除电话列表组件的&lt;script&gt;标签。

Now set the remaining `phone-detail.component.ts` as follows:

现在，剩下的`phone-detail.component.ts`文件变成了这样：


<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.component.ts" title="app/phone-detail/phone-detail.component.ts">
</code-example>

This is similar to the phone list component.
The new wrinkle is the `RouteParams` type annotation that identifies the `routeParams` dependency.

这和电话列表组件很相似。
这里的窍门在于`@Inject`装饰器，它标记出了`$routeParams`依赖。

The AngularJS injector has an AngularJS router dependency called `$routeParams`,
which was injected into `PhoneDetails` when it was still an AngularJS controller.
You intend to inject it into the new `PhoneDetailsComponent`.

AngularJS注入器具有AngularJS路由器的依赖，叫做`$routeParams`。
它被注入到了`PhoneDetails`中，但`PhoneDetails`现在还是一个AngularJS控制器。
我们应该把它注入到新的`PhoneDetailsComponent`中。

Unfortunately, AngularJS dependencies are not automatically available to Angular components.
You must upgrade this service via a [factory provider](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)
to make `$routeParams` an Angular injectable.
Do that in a new file called `ajs-upgraded-providers.ts` and import it in `app.module.ts`:

不幸的是，AngularJS的依赖不会自动在Angular的组件中可用。
我们必须使用[工厂提供商（factory provider）](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)
来把`$routeParams`包装成Angular的服务提供商。
新建一个名叫`ajs-upgraded-providers.ts`的文件，并且在`app.module.ts`中导入它：


<code-example path="upgrade-phonecat-2-hybrid/app/ajs-upgraded-providers.ts" title="app/ajs-upgraded-providers.ts">
</code-example>

<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="routeparams" title="app/app.module.ts ($routeParams)" linenums="false">
</code-example>

Convert the phone detail component template into Angular syntax as follows:

我们现在也要把该组件的模板转变成Angular的语法。
这里是它完整的新模板：


<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.template.html" title="app/phone-detail/phone-detail.template.html">
</code-example>

There are several notable changes here:

这里有几个值得注意的改动：

* You've removed the `$ctrl.` prefix from all expressions.

  我们从所有表达式中移除了`$ctrl.`前缀。


* You've replaced `ng-src` with property
  bindings for the standard `src` property.

  正如我们在电话列表中做过的那样，我们把`ng-src`替换成了标准的`src`属性绑定。

* You're using the property binding syntax around `ng-class`. Though Angular
  does have [a very similar `ngClass`](guide/template-syntax#directives)
  as AngularJS does, its value is not magically evaluated as an expression.
  In Angular, you always specify  in the template when an attribute's value is
  a property expression, as opposed to a literal string.

  我们在`ng-class`周围使用了属性绑定语法。虽然Angular中有一个
  和AngularJS中[非常相似的`ngClass`](guide/template-syntax#directives)指令，
  但是它的值不会神奇的作为表达式进行计算。在Angular中，模板中的属性(Attribute)值总是被作为
  属性(Property)表达式计算，而不是作为字符串字面量。

* You've replaced `ng-repeat`s with `*ngFor`s.

  我们把`ng-repeat`替换成了`*ngFor`。

* You've replaced `ng-click` with an event binding for the standard `click`.

  我们把`ng-click`替换成了一个到标准`click`事件的绑定。

* You've wrapped the whole template in an `ngIf` that causes it only to be
  rendered when there is a phone present. You need this because when the component
  first loads, you don't have `phone` yet and the expressions will refer to a
  non-existing value. Unlike in AngularJS, Angular expressions do not fail silently
  when you try to refer to properties on undefined objects. You need to be explicit
  about cases where this is expected.

  我们把整个模板都包裹进了一个`ngIf`中，这导致只有当存在一个电话时它才会渲染。我们必须这么做，
  是因为组件首次加载时我们还没有`phone`变量，这些表达式就会引用到一个不存在的值。
  和AngularJS不同，当我们尝试引用未定义对象上的属性时，Angular中的表达式不会默默失败。
  我们必须明确指出这种情况是我们所期望的。

Add `PhoneDetailComponent` component to the `NgModule` _declarations_ and _entryComponents_:

把`PhoneDetailComponent`组件添加到`NgModule`的_declarations_和_entryComponents_中：


<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="phonedetail" title="app.module.ts">
</code-example>

You should now also remove the phone detail component &lt;script&gt; tag from `index.html`.

我们现在应该从`index.html`中移除电话详情组件的&lt;script>。

#### Add the _CheckmarkPipe_

#### 添加*CheckmarkPipe*

The AngularJS directive had a `checkmark` _filter_.
Turn that into an Angular **pipe**.

AngularJS指令中有一个`checkmark`*过滤器*，我们把它转换成Angular的**管道**。

There is no upgrade method to convert filters into pipes.
You won't miss it.
It's easy to turn the filter function into an equivalent Pipe class.
The implementation is the same as before, repackaged in the `transform` method.
Rename the file to `checkmark.pipe.ts` to conform with Angular conventions:

没有什么升级方法能把过滤器转换成管道。
但我们也并不需要它。
把过滤器函数转换成等价的Pipe类非常简单。
实现方式和以前一样，但把它们包装进`transform`方法中就可以了。
把该文件改名成`checkmark.pipe.ts`，以符合Angular中的命名约定：


<code-example path="upgrade-phonecat-2-hybrid/app/core/checkmark/checkmark.pipe.ts" title="app/core/checkmark/checkmark.pipe.ts" linenums="false">
</code-example>

Now import and declare the newly created pipe and
remove the filter &lt;script&gt; tag from `index.html`:

当我们做这个修改时，也要同时从`core`模块文件中移除对该过滤器的注册。该模块的内容变成了：


<code-example path="upgrade-phonecat-2-hybrid/app/app.module.ts" region="checkmarkpipe" title="app.module.ts">
</code-example>

### AOT compile the hybrid app

### 对混合式应用做AOT编译

To use AOT with a hybrid app, you have to first set it up like any other Angular application,
as shown in [the Ahead-of-time Compilation chapter](guide/aot-compiler).

要在混合式应用中使用AOT编译，我们首先要像其它Angular应用一样设置它，就像[AOT编译一章](guide/aot-compiler)所讲的那样。

Then change `main-aot.ts` to bootstrap the `AppComponentFactory` that was generated
by the AOT compiler:

然后，我们就要修改`main-aot.ts`的引导代码，通过所生成的`AppComponentFactory`来引导AngularJS应用：

<code-example path="upgrade-phonecat-2-hybrid/app/main-aot.ts" title="app/main-aot.ts">
</code-example>

You need to load all the AngularJS files you already use in `index.html` in `aot/index.html`
as well:

我们还要把在`index.html`中已经用到的所有AngularJS文件加载到`aot/index.html`中：


<code-example path="upgrade-phonecat-2-hybrid/aot/index.html" title="aot/index.html">
</code-example>

These files need to be copied together with the polyfills. The files the application
needs at runtime, like the `.json` phone lists and images, also need to be copied.

这些文件要带着相应的填充库复制到一起。应用运行时需要的文件，比如电话列表`.json`和图片，也需要复制过去。

Install `fs-extra` via `npm install fs-extra --save-dev` for better file copying, and change
`copy-dist-files.js` to the following:

通过`npm install fs-extra --save-dev`安装`fs-extra`可以更好的复制文件，并且把`copy-dist-files.js`文件改成这样：


<code-example path="upgrade-phonecat-2-hybrid/copy-dist-files.js" title="copy-dist-files.js">
</code-example>



And that's all you need to use AOT while upgrading your app!
这就是想要在升级应用期间AOT编译所需的一切！

### Adding The Angular Router And Bootstrap

### 添加Angular路由器和引导程序

At this point, you've replaced all AngularJS application components with
their Angular counterparts, even though you're still serving them from the AngularJS router.

此刻，我们已经把所有AngularJS的组件替换成了它们在Angular中的等价物，不过我们仍然在AngularJS路由器中使用它们。

#### Add the Angular router

#### 添加Angular路由器

Angular has an [all-new router](guide/router).

Angular有一个[全新的路由器](guide/router)。

Like all routers, it needs a place in the UI to display routed views.
For Angular that's the `<router-outlet>` and it belongs in a *root component*
at the top of the applications component tree.

像所有的路由器一样，它需要在UI中指定一个位置来显示路由的视图。
在Angular中，它是`<router-outlet>`，并位于应用组件树顶部的*根组件*中。

You don't yet have such a root component, because the app is still managed as an AngularJS app.
Create a new `app.component.ts` file with the following `AppComponent` class:


我们还没有这样一个根组件，因为该应用仍然是像一个AngularJS应用那样被管理的。
创建新的`app.component.ts`文件，放入像这样的`AppComponent`类：

<code-example path="upgrade-phonecat-3-final/app/app.component.ts" title="app/app.component.ts" >
</code-example>

It has a simple template that only includes the `<router-outlet>.
This component just renders the contents of the active route and nothing else.

它有一个很简单的模板，只包含Angular路由的`<router-outlet>`和AngularJS路由的`ng-view`指令。
该组件只负责渲染活动路由的内容，此外啥也不干。

The selector tells Angular to plug this root component into the `<phonecat-app>`
element on the host web page when the application launches.

该选择器告诉Angular：当应用启动时就把这个根组件插入到宿主页面的`<phonecat-app>`元素中。

Add this `<phonecat-app>` element to the `index.html`.
It replaces the old AngularJS `ng-view` directive:


把这个`<phonecat-app>`元素插入到`index.html`中。
用它来代替AngularJS中的`ng-view`指令：

<code-example path="upgrade-phonecat-3-final/index.html" region="appcomponent" title="index.html (body)" linenums="false">
</code-example>

#### Create the _Routing Module_
#### 创建*路由模块*
A router needs configuration whether it's the AngularJS or Angular or any other router.

无论在AngularJS还是Angular或其它框架中，路由器都需要进行配置。

The details of Angular router configuration are best left to the [Routing documentation](guide/router)
which recommends that you create a `NgModule` dedicated to router configuration
(called a _Routing Module_).


Angular路由器配置的详情最好去查阅下[路由与导航](guide/router)文档。
它建议你创建一个专们用于路由器配置的`NgModule`（名叫*路由模块*）。

<code-example path="upgrade-phonecat-3-final/app/app-routing.module.ts" title="app/app-routing.module.ts">
</code-example>

This module defines a `routes` object with two routes to the two phone components
and a default route for the empty path.
It passes the `routes` to the `RouterModule.forRoot` method which does the rest.

该模块定义了一个`routes`对象，它带有两个路由，分别指向两个电话组件，以及为空路径指定的默认路由。
它把`routes`传给`RouterModule.forRoot`方法，该方法会完成剩下的事。

A couple of extra providers enable routing with "hash" URLs such as `#!/phones`
instead of the default "push state" strategy.

一些额外的提供商让路由器使用“hash”策略解析URL，比如`#!/phones`，而不是默认的“Push State”策略。

Now update the `AppModule` to import this `AppRoutingModule` and also the
declare the root `AppComponent` as the bootstrap component.
That tells Angular that it should bootstrap the app with the _root_ `AppComponent` and
insert it's view into the host web page.

现在，修改`AppModule`，让它导入这个`AppRoutingModule`，并同时声明根组件`AppComponent`。
这会告诉Angular，它应该使用根组件`AppComponent`引导应用，并把它的视图插入到宿主页面中。

You must also remove the bootstrap of the AngularJS module from `ngDoBootstrap()` in `app.module.ts`
and the `UpgradeModule` import.

我们还要从`app.module.ts`中移除调用`ngDoBootstrap()`来引导AngularJS模块的代码，以及对`UpgradeModule`的导入代码。

<code-example path="upgrade-phonecat-3-final/app/app.module.ts" title="app/app.module.ts">
</code-example>

And since you are routing to `PhoneListComponent` and `PhoneDetailComponent` directly rather than
using a route template with a `<phone-list>` or `<phone-detail>` tag, you can do away with their
Angular selectors as well.

而且，由于我们现在直接路由到`PhoneListComponent`和`PhoneDetailComponent`，而不在使用带`<phone-list>`或`<phone-detail>`标签的路由模板，因此我们同样不再需要它们的 Angular 选择器。

#### Generate links for each phone

#### 为每个电话生成链接

You no longer have to hardcode the links to phone details in the phone list.
You can generate data bindings for each phone's `id` to the `routerLink` directive
and let that directive construct the appropriate URL to the `PhoneDetailComponent`:

在电话列表中，我们不用再被迫硬编码电话详情的链接了。
我们可以通过把每个电话的`id`绑定到`routerLink`指令来生成它们了，该指令的构造函数会为`PhoneDetailComponent`生成正确的URL：

<code-example path="upgrade-phonecat-3-final/app/phone-list/phone-list.template.html" region="list" title="app/phone-list/phone-list.template.html (list with links)" linenums="false">
</code-example>

<div class="l-sub-section">

See the [Routing](guide/router) page for details.

要了解详情，请查看[路由与导航](guide/router)页。

</div><br>

#### Use route parameters

#### 使用路由参数

The Angular router passes route parameters differently.
Correct the `PhoneDetail` component constructor to expect an injected `ActivatedRoute` object.
Extract the `phoneId` from the `ActivatedRoute.snapshot.params` and fetch the phone data as before:


Angular路由器会传入不同的路由参数。
改正`PhoneDetail`组件的构造函数，让它改用注入进来的`ActivatedRoute`对象。
从`ActivatedRoute.snapshot.params`中提取出`phoneId`，并像以前一样获取手机的数据：

<code-example path="upgrade-phonecat-3-final/app/phone-detail/phone-detail.component.ts" title="app/phone-detail/phone-detail.component.ts">
</code-example>

You are now running a pure Angular application!

我们现在运行的就是纯正的Angular应用了！

### Say Goodbye to AngularJS

### 再见，AngularJS！

It is time to take off the training wheels and let the application begin
its new life as a pure, shiny Angular app. The remaining tasks all have to
do with removing code - which of course is every programmer's favorite task!

是时候把辅助训练的轮子摘下来了！让我们的应用作为一个纯粹、闪亮的Angular程序开始它的新生命吧。
  剩下的所有任务就是移除代码 —— 这当然是每个程序员最喜欢的任务！

The application is still bootstrapped as a hybrid app.
There's no need for that anymore.

应用仍然以混合式应用的方式启动，然而这再也没有必要了。

Switch the bootstrap method of the application from the `UpgradeModule` to the Angular way.


把应用的引导（`bootstrap`）方法从`UpgradeAdapter`的改为Angular的。

<code-example path="upgrade-phonecat-3-final/app/main.ts" title="main.ts">
</code-example>

If you haven't already, remove all references to the `UpgradeModule` from `app.module.ts`,
as well as any [factory provider](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)
for AngularJS services, and the `app/ajs-upgraded-providers.ts` file.

如果你还没有这么做，请从`app.module.ts删除所有`UpgradeModule的引用，
  以及所有用于AngularJS服务的[工厂供应商（factory provider）](guide/upgrade#making-angularjs-dependencies-injectable-to-angular)和`app/ajs-upgraded-providers.ts`文件。

Also remove any `downgradeInjectable()` or `downgradeComponent()` you find,
together with the associated AngularJS factory or directive declarations.
Since you no longer have downgraded components, you no longer list them
in `entryComponents`.


还要删除所有的`downgradeInjectable()`或`downgradeComponent()`以及与AngularJS相关的工厂或指令声明。
因为我们不再需要降级任何组件了，也不再需要把它们列在`entryComponents`中。

<code-example path="upgrade-phonecat-3-final/app/app.module.ts" title="app.module.ts">
</code-example>

You may also completely remove the following files. They are AngularJS
module configuration files and not needed in Angular:

我们还要完全移除了下列文件。它们是AngularJS的模块配置文件和类型定义文件，在Angular中不需要了：

* `app/app.module.ajs.ts`
* `app/app.config.ts`
* `app/core/core.module.ts`
* `app/core/phone/phone.module.ts`
* `app/phone-detail/phone-detail.module.ts`
* `app/phone-list/phone-list.module.ts`

The external typings for AngularJS may be uninstalled as well. The only ones
you still need are for Jasmine and Angular polyfills.
The `@angular/upgrade` package and it's mapping in `systemjs.config.js` can also go.

还需要反安装AngularJS的外部类型定义文件。我们现在只需要Jasmine的那些。
`systemjs.config.js`中的`@angular/upgrade`包及其映射也可以移除了。


<code-example format="">
  npm uninstall @angular/upgrade --save
  npm uninstall @types/angular @types/angular-animate @types/angular-cookies @types/angular-mocks @types/angular-resource @types/angular-route @types/angular-sanitize --save-dev
</code-example>

Finally, from `index.html`, remove all references to AngularJS scripts and jQuery.
When you're done, this is what it should look like:

最后，从`index.html`和`karma.conf.js`中，移除所有对AngularJS和jQuery脚本的引用。
当这些全部做完时，`index.html`应该是这样的：

<code-example path="upgrade-phonecat-3-final/index.html" region="full" title="index.html">
</code-example>

That is the last you'll see of AngularJS! It has served us well but now
it's time to say goodbye.

这是我们最后一次看到AngularJS了！它曾经带给我们很多帮助，不过现在，是时候说再见了。

## Appendix: Upgrading PhoneCat Tests

## 附录：升级PhoneCat的测试

Tests can not only be retained through an upgrade process, but they can also be
used as a valuable safety measure when ensuring that the application does not
break during the upgrade. E2E tests are especially useful for this purpose.

测试不仅要在升级过程中被保留，它还是确保应用在升级过程中不会被破坏的一个安全指示器。
要达到这个目的，E2E测试尤其有用。

### E2E Tests

### E2E测试

The PhoneCat project has both E2E Protractor tests and some Karma unit tests in it.
Of these two, E2E tests can be dealt with much more easily: By definition,
E2E tests access the application from the *outside* by interacting with
the various UI elements the app puts on the screen. E2E tests aren't really that
concerned with the internal structure of the application components. That
also means that, although you modify the project quite a bit during the upgrade, the E2E
test suite should keep passing with just minor modifications. You
didn't change how the application behaves from the user's point of view.

PhoneCat项目中同时有基于Protractor的E2E测试和一些基于Karma的单元测试。
对这两者来说，E2E测试的转换要容易得多：根据定义，E2E测试通过与应用中显示的这些UI元素互动，从*外部*访问我们的应用来进行测试。
E2E测试实际上并不关心这些应用中各部件的内部结构。这也意味着，虽然我们已经修改了此应用程序，
但是E2E测试套件仍然应该能像以前一样全部通过。因为从用户的角度来说，我们并没有改变应用的行为。

During TypeScript conversion, there is nothing to do to keep E2E tests
working. But when you change the bootstrap to that of a Hybrid app,
you must make a few changes.

在转成TypeScript期间，我们不用做什么就能让E2E测试正常工作。
只有当我们想做些修改而把组件及其模板升级到Angular时才需要做些处理。

Update the `protractor-conf.js` to sync with hybrid apps:

再对`protractor-conf.js`做下列修改，与混合应用同步：


<code-example format="">
  ng12Hybrid: true
</code-example>



When you start to upgrade components and their templates to Angular, you'll make more changes 
 because the E2E tests have matchers that are specific to AngularJS. 
For PhoneCat you need to make the following changes in order to make things work with Angular:
当我们开始组件和模块升级到Angular时，还需要一系列后续的修改。
这是因为E2E测试有一些匹配器是AngularJS中特有的。对于PhoneCat来说，为了让它能在Angular下工作，我们得做下列修改：

<table>
  <tr>
    <th>

      <p>
        Previous code
      </p>

      <p>
        老代码
      </p>

    </th>
    <th>

      <p>
        New code
      </p>

      <p>
        新代码
      </p>

    </th>
    <th>

      <p>
        Notes
      </p>

      <p>
        说明
      </p>

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

      repeater匹配器依赖于AngularJS中的`ng-repeat`
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

      repeater匹配器依赖于AngularJS中的`ng-repeat`
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

      model匹配器依赖于AngularJS中的`ng-model`
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

      model匹配器依赖于AngularJS中的`ng-model`
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

      binding匹配器依赖于AngularJS的数据绑定

    </td>
  </tr>
</table>

When the bootstrap method is switched from that of `UpgradeModule` to
pure Angular, AngularJS ceases to exist on the page completely.
At this point, you need to tell Protractor that it should not be looking for
an AngularJS app anymore, but instead it should find *Angular apps* from
the page.

当引导方式从`UpgradeModule`切换到纯Angular的时，AngularJS就从页面中完全消失了。
此时，我们需要告诉Protractor，它不用再找AngularJS应用了，而是从页面中查找*Angular*应用。
于是在`protractor-conf.js`中做下列修改：
Replace the `ng12Hybrid` previously added with the following in `protractor-conf.js`:

替换之前在`protractor-conf.js`中加入 `ng12Hybrid`，象这样：


<code-example format="">
  useAllAngular2AppRoots: true,
</code-example>

Also, there are a couple of Protractor API calls in the PhoneCat test code that
are using the AngularJS `$location` service under the hood. As that
service is no longer present after the upgrade, replace those calls with ones
that use WebDriver's generic URL APIs instead. The first of these is
the redirection spec:


同样，我们的测试代码中有两个Protractor API调用内部使用了`$location`。该服务没有了，
我们就得把这些调用用一个WebDriver的通用URL API代替。第一个API是“重定向(redirect)”规约：

<code-example path="upgrade-phonecat-3-final/e2e-spec.ts" region="redirect" title="e2e-tests/scenarios.ts">
</code-example>

And the second is the phone links spec:


然后是“电话链接(phone links)”规约：

<code-example path="upgrade-phonecat-3-final/e2e-spec.ts" region="links" title="e2e-tests/scenarios.ts">
</code-example>

### Unit Tests

### 单元测试

For unit tests, on the other hand, more conversion work is needed. Effectively
they need to be *upgraded* along with the production code.

另一方面，对于单元测试来说，需要更多的转化工作。实际上，它们需要随着产品代码一起升级。

During TypeScript conversion no changes are strictly necessary. But it may be
a good idea to convert the unit test code into TypeScript as well.

在转成TypeScript期间，严格来讲没有什么改动是必须的。但把单元测试代码转成TypeScript仍然是个好主意，
产品代码从TypeScript中获得的那些增益也同样适用于测试代码。For instance, in the phone detail component spec , you can use  ES2015
features like arrow functions and block-scoped variablesand benefit from the type
definitions  of the AngularJS services you're consuming:
比如，在这个电话详情组件的规约中，我们不仅用到了ES2015中的箭头函数和块作用域变量这些特性，还为所用的一些
AngularJS服务提供了类型定义。

<code-example path="upgrade-phonecat-1-typescript/app/phone-detail/phone-detail.component.spec.ts" title="app/phone-detail/phone-detail.component.spec.ts">
</code-example>

Once you start the upgrade process and bring in SystemJS, configuration changes
are needed for Karma. You need to let SystemJS load all the new Angular code,
which can be done with the following kind of shim file:

一旦我们开始了升级过程并引入了SystemJS，还需要对Karma进行配置修改。
我们需要让SystemJS加载所有的Angular新代码，


<code-example path="upgrade-phonecat-2-hybrid/karma-test-shim.1.js" title="karma-test-shim.js">
</code-example>

The shim first loads the SystemJS configuration, then Angular's test support libraries,
and then the application's spec files themselves.

这个shim文件首先加载了SystemJS的配置，然后是Angular的测试支持库，然后是应用本身的规约文件。

Karma configuration should then be changed so that it uses the application root dir
as the base directory, instead of `app`.

然后需要修改Karma配置，来让它使用本应用的根目录作为基础目录(base directory)，而不是`app`。


<code-example path="upgrade-phonecat-2-hybrid/karma.conf.ajs.js" region="basepath" title="karma.conf.js">
</code-example>

Once done, you can load SystemJS and other dependencies, and also switch the configuration
for loading application files so that they are *not* included to the page by Karma. You'll let
the shim and SystemJS load them.

一旦这些完成了，我们就能加载SystemJS和其它依赖，并切换配置文件来加载那些应用文件，而*不用*在Karma页面中包含它们。
我们要让这个shim文件和SystemJS去加载它们。


<code-example path="upgrade-phonecat-2-hybrid/karma.conf.ajs.js" region="files" title="karma.conf.js">
</code-example>

Since the HTML templates of Angular components will be loaded as well, you must help
Karma out a bit so that it can route them to the right paths:

由于Angular组件中的HTML模板也同样要被加载，所以我们得帮Karma一把，帮它在正确的路径下找到这些模板：


<code-example path="upgrade-phonecat-2-hybrid/karma.conf.ajs.js" region="html" title="karma.conf.js">
</code-example>

The unit test files themselves also need to be switched to Angular when their production
counterparts are switched. The specs for the checkmark pipe are probably the most straightforward,
as the pipe has no dependencies:

如果产品代码被切换到了Angular，单元测试文件本身也需要切换过来。对勾(checkmark)管道的规约可能是最简单的，因为它没有任何依赖：


<code-example path="upgrade-phonecat-2-hybrid/app/core/checkmark/checkmark.pipe.spec.ts" title="app/core/checkmark/checkmark.pipe.spec.ts">
</code-example>

The unit test for the phone service is a bit more involved. You need to switch from the mocked-out
AngularJS `$httpBackend` to a mocked-out Angular Http backend.

`Phone`服务的测试会牵扯到一点别的。我们需要把模拟版的AngularJS `$httpBackend`服务切换到模拟板的Angular Http后端。


<code-example path="upgrade-phonecat-2-hybrid/app/core/phone/phone.service.spec.ts" title="app/core/phone/phone.service.spec.ts">
</code-example>



For the component specs , you can mock out the `Phone` service itself, and have it provide
canned phone data. You use Angular's component unit testing APIs for both components.
对于组件的规约，我们可以模拟出`Phone`服务本身，并且让它提供电话的数据。我们可以对这些组件使用Angular的组件单元测试API。

<code-example path="upgrade-phonecat-2-hybrid/app/phone-detail/phone-detail.component.spec.ts" title="app/phone-detail/phone-detail.component.spec.ts">
</code-example>

<code-example path="upgrade-phonecat-2-hybrid/app/phone-list/phone-list.component.spec.ts" title="app/phone-list/phone-list.component.spec.ts">
</code-example>

Finally, revisit both of the component tests when you switch to the Angular
router. For the details component, provide a mock of Angular `ActivatedRoute` object
instead of using the AngularJS `$routeParams`.


最后，当我们切换到Angular路由时，我们需要重新过一遍这些组件测试。对详情组件来说，我们需要提供一个Angular
`RouteParams`的mock对象，而不再用AngularJS中的`$routeParams`。

<code-example path="upgrade-phonecat-3-final/app/phone-detail/phone-detail.component.spec.ts" region="activatedroute" title="app/phone-detail/phone-detail.component.spec.ts">
</code-example>

And for the phone list component, a few adjustments to the router make
the `RouteLink` directives work.

对于电话列表组件，还要再做少量的调整，以便路由器能让`RouteLink`指令正常工作。

<code-example path="upgrade-phonecat-3-final/app/phone-list/phone-list.component.spec.ts" region="routestuff" title="app/phone-list/phone-list.component.spec.ts">
</code-example>
