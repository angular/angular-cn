# AngularJS to Angular Quick Reference

# 从 AngularJS 到 Angular 快速参考

{@a top}

_Angular_ is the name for the Angular of today and tomorrow.
_AngularJS_ is the name for all v1.x versions of Angular.

*Angular*这个名字专指现在和未来的Angular版本，而*AngularJS*专指Angular的所有v1.x版本。

This guide helps you transition from AngularJS to Angular
by mapping AngularJS syntax to the equivalent Angular syntax.

本章提供了一个快速的参考指南，指出一些常用的AngularJS语法及其在Angular中的等价物。

**See the Angular syntax in this <live-example name="ajs-quick-reference"></live-example>**.

**参见 <live-example name="ajs-quick-reference"></live-example> 以学习 Angular 语法**

## Template basics

## 模板基础

Templates are the user-facing part of an Angular application and are written in HTML.
The following table lists some of the key AngularJS template features with their equivalent Angular template syntax.

模板是Angular应用中的门面部分，它是用HTML写的。下表中是一些AngularJS中的关键模板特性及其在Angular中的等价语法。

<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      AngularJS

    </th>

    <th>

      Angular

    </th>

  </tr>

  <tr style=top>

    <td>

      ### Bindings/interpolation

      ### 绑定/插值表达式

      <code-example hideCopy>

        Your favorite hero is: {{vm.favoriteHero}}

      </code-example>

      In AngularJS, an expression in curly braces denotes one-way binding.
      This binds the value of the element to a property in the controller
      associated with this template.

      在AngularJS中，花括号中的表达式代表单向绑定。
      它把元素的值绑定到了与模板相关控制器的属性上。

      When using the `controller as` syntax,
      the binding is prefixed with the controller alias (`vm` or `$ctrl`) because you
      have to be specific about the source of the binding.

      当使用`controller as`语法时，该绑定需要用控制器的别名(`vm`)为前缀，这是因为我们不得不通过它来指定绑定源。

    </td>

    <td>

      ### Bindings/interpolation

      ### 绑定/插值表达式

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="interpolation" linenums="false"></code-example>

      In Angular, a template expression in curly braces still denotes one-way binding.
      This binds the value of the element to a property of the component.
      The context of the binding is implied and is always the
      associated component, so it needs no reference variable.

      在Angular中，花括号中的模板表达式同样代表单向绑定。
      它把元素的值绑定到了组件的属性上。
      它绑定的上下文变量是隐式的，并且总是关联到组件。
      所以，它不需要一个引用变量。

      For more information, see the [Interpolation](guide/template-syntax#interpolation)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解更多，请参见[模板语法](guide/template-syntax)中的[插值表达式](guide/template-syntax#interpolation)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### Filters

      ### 过滤器

      <code-example hideCopy>

        &lt;td>{{movie.title | uppercase}}&lt;/td>

      </code-example>

      To filter output in AngularJS templates, use the pipe character (|) and one or more filters.

      要在AngularJS中过滤输出，使用管道字符(|)以及一个或多个过滤器。

      This example filters the `title` property to uppercase.

      这个例子中把`title`属性过滤成了大写形式。

    </td>

    <td>

      ### Pipes

      ### 管道

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="uppercase" linenums="false"></code-example>

      In Angular you use similar syntax with the pipe (|) character to filter output, but now you call them **pipes**.
      Many (but not all) of the built-in filters from AngularJS are
      built-in pipes in Angular.

      在Angular中，我们使用相似的语法 —— 用管道字符(|)来过滤输出，但是现在直接把它叫做**管道**了。
      很多(但不是所有)AngularJS中的内置过滤器也成了Angular中的内置管道。

      For more information, see [Filters/pipes](guide/ajs-quick-reference#filters-pipes) below.

      请参见下面[过滤器/管道](guide/ajs-quick-reference#filters-pipes)了解更多信息。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### Local variables

      ### 局部变量

      <code-example hideCopy format="">

        &lt;tr ng-repeat="movie in vm.movies">
          &lt;td>{{movie.title}}&lt;/td>
        &lt;/tr>

      </code-example>

      Here, `movie` is a user-defined local variable.

      这里的`movie`是一个用户定义的局部变量

    </td>

    <td>

      ### Input variables

      ### 输入变量

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="local" linenums="false"></code-example>

      Angular has true template input variables that are explicitly defined using the `let` keyword.

      Angular 有了真正的模板输入变量，它需要使用`let`关键字进行明确定义。

      For more information, see the [ngFor micro-syntax](guide/template-syntax#microsyntax)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解更多信息，请参见[模板语法](guide/template-syntax)中的[ngFor微语法](guide/template-syntax#microsyntax)部分。

    </td>

  </tr>

</table>

## Template directives

## 模板指令

AngularJS provides more than seventy built-in directives for templates.
Many of them aren't needed in Angular because of its more capable and expressive binding system.
The following are some of the key AngularJS built-in directives and their equivalents in Angular.

AngularJS 为模板提供了七十多个内置指令。
在 Angular 中，它们很多都已经不需要了，因为 Angular 有了一个更加强大、快捷的绑定系统。
下面是一些AngularJS 中的关键指令及其在 Angular 中的等价物。

<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      AngularJS

    </th>

    <th>

      Angular

    </th>

  </tr>

  <tr style=top>

    <td>

      ### ng-app

      <code-example hideCopy>

        &lt;body ng-app="movieHunter">

      </code-example>

      The application startup process is called **bootstrapping**.

      应用的启动过程被称为**引导**。

      Although you can bootstrap an AngularJS app in code,
      many applications bootstrap declaratively with the `ng-app` directive,
      giving it the name of the application's module (`movieHunter`).

      虽然可以从代码中引导Angular应用，
      但很多应用都是通过`ng-app`指令进行声明式引导的，只要给它一个应用模块的名字(`movieHunter`)就可以了。

    </td>

    <td>

      ### Bootstrapping

      ### 引导

      <code-example hideCopy path="ajs-quick-reference/src/main.ts" title="main.ts" linenums="false"></code-example>

      <br>

      <code-example hideCopy path="ajs-quick-reference/src/app/app.module.1.ts" title="app.module.ts" linenums="false"></code-example>

      Angular doesn't have a bootstrap directive.
      To launch the app in code, explicitly bootstrap the application's root module (`AppModule`)
      in `main.ts`
      and the application's root component (`AppComponent`) in `app.module.ts`.

      Angular 没有引导指令。
      总是要通过显式调用一个`bootstrap`函数，并传入应用模块的名字(`AppComponent`)来启动应用。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-class

      <code-example hideCopy format="">

        &lt;div ng-class="{active: isActive}">
        &lt;div ng-class="{active: isActive,
                           shazam: isImportant}">

      </code-example>

      In AngularJS, the `ng-class` directive includes/excludes CSS classes
      based on an expression. That expression is often a key-value control object with each
      key of the object defined as a CSS class name, and each value defined as a template expression
      that evaluates to a Boolean value.

      在AngularJS中，`ng-class`指令会基于一个表达式来包含/排除某些CSS类。该表达式通常是一个“键-值”型的控制对象，
      对象中的每一个键代表一个CSS类名，每一个值定义为一个返回布尔值的模板表达式。

      In the first example, the `active` class is applied to the element if `isActive` is true.

      在第一个例子中，如果`isActive`为真，则`active`类被应用到那个元素上。

      You can specify multiple classes, as shown in the second example.

      就像第二个例子中所展示的那样，可以同时指定多个类。

    </td>

    <td>

      ### ngClass

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="ngClass" linenums="false"></code-example>

      In Angular, the `ngClass` directive works similarly.
      It includes/excludes CSS classes based on an expression.

      在Angular中，`ngClass`指令用类似的方式工作。
      它根据一个表达式包含/排除某些CSS类。

      In the first example, the `active` class is applied to the element if `isActive` is true.

      在第一个例子中，如果`isActive`为真，则`active`类被应用到那个元素上。

      You can specify multiple classes, as shown in the second example.

      就像第二个例子中所展示的那样，可以同时指定多个类。

      Angular also has **class binding**, which is a good way to add or remove a single class,
      as shown in the third example.

      Angular还有**类绑定**，它是单独添加或移除一个类的好办法 —— 就像第三个例子中展示的。

      For more information see the [Attribute, class, and style bindings](guide/template-syntax#other-bindings)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解更多信息，参见[模板语法](guide/template-syntax)中的[属性、CSS类和样式绑定](guide/template-syntax#other-bindings)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-click

      <code-example hideCopy format="">

        &lt;button ng-click="vm.toggleImage()">
        &lt;button ng-click="vm.toggleImage($event)">

      </code-example>

      In AngularJS, the `ng-click` directive allows you to specify custom behavior when an element is clicked.

      在AngularJS中，`ng-click`指令指定当元素被点击时的自定义行为。

      In the first example, when the user clicks the button, the `toggleImage()` method in the controller referenced by the `vm` `controller as` alias is executed.

      在第一个例子中，如果用户点击了这个按钮，那么控制器的`toggleImage()`方法就会被执行，这个控制器是被`controller as`中指定的`vm`别名所引用的。

      The second example demonstrates passing in the `$event` object, which provides details about the event
      to the controller.

      第二个例子演示了传入`$event`对象，它提供了事件的详情，并被传到控制器。

    </td>

    <td>

      ### Bind to the `click` event

      ### 绑定到`click`事件

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="event-binding" linenums="false"></code-example>

      AngularJS event-based directives do not exist in Angular.
      Rather, define one-way binding from the template view to the component using **event binding**.

      AngularJS基于事件的指令在Angular中已经不存在了。
      不过，可以使用**事件绑定**来定义从模板视图到组件的单向数据绑定。

      For event binding, define the name of the target event within parenthesis and
      specify a template statement, in quotes, to the right of the equals. Angular then
      sets up an event handler for the target event. When the event is raised, the handler
      executes the template statement.

      要使用事件绑定，把目标事件的名字放在圆括号中，并且使用等号右侧引号中的模板语句对它赋值。
      然后Angular为这个目标时间设置事件处理器。当事件被触发时，这个处理器就会执行模板语句。

      In the first example, when a user clicks the button, the `toggleImage()` method in the associated component is executed.

      在第一个例子中，当用户点击此按钮时，相关组件中的`toggleImage()`方法就被执行了。

      The second example demonstrates passing in the `$event` object, which provides details about the event
      to the component.

      第二个例子演示了如何传入`$event`对象，它为组件提供了此事件的详情。

      For a list of DOM events, see: https://developer.mozilla.org/en-US/docs/Web/Events.

      要查看DOM事件的列表，请参见[网络事件](https://developer.mozilla.org/en-US/docs/Web/Events)。

      For more information, see the [Event binding](guide/template-syntax#event-binding)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解更多，请参见[模板语法](guide/template-syntax)中的[事件绑定](guide/template-syntax#event-binding)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-controller

      <code-example hideCopy format="">

        &lt;div ng-controller="MovieListCtrl as vm">

      </code-example>

      In AngularJS, the `ng-controller` directive attaches a controller to the view.
      Using the `ng-controller` (or defining the controller as part of the routing) ties the
      view to the controller code associated with that view.

      在AngularJS中，`ng-controller`指令把控制器附加到视图上。
      使用`ng-controller`(或把控制器定义为路由的一部分)把视图及其控制器的代码联系在一起。

    </td>

    <td>

      ### Component decorator

      ### 组件装饰器

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="component" linenums="false"></code-example>

      In Angular, the template no longer specifies its associated controller.
      Rather, the component specifies its associated template as part of the component class decorator.

      在Angular中，模板不用再指定它相关的控制器。
      反过来，组件会在组件类的装饰器中指定与它相关的模板。

      For more information, see [Architecture Overview](guide/architecture#components).

      要了解更多，请参见[架构概览](guide/architecture#components)。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-hide

      In AngularJS, the `ng-hide` directive shows or hides the associated HTML element based on
      an expression. For more information, see [ng-show](guide/ajs-quick-reference#ng-show).

      在AngularJS中，`ng-hide`指令会基于一个表达式显示或隐藏相关的HTML元素。
      参见[ng-show](guide/ajs-quick-reference#ng-show)了解更多。

    </td>

    <td>

      ### Bind to the `hidden` property

      ### 绑定到`hidden`属性

      In Angular, you use property binding; there is no built-in *hide* directive.
      For more information, see [ng-show](guide/ajs-quick-reference#ng-show).

      在Angular中，并没有一个内置的*hide*指令，可以改用属性绑定。
      参见[ng-show](guide/ajs-quick-reference#ng-show)了解更多。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-href

      <code-example hideCopy format="">

        &lt;a ng-href="{{ angularDocsUrl }}">Angular Docs&lt;/a>

      </code-example>

      The `ng-href` directive allows AngularJS to preprocess the `href` property so that it
      can replace the binding expression with the appropriate URL before the browser
      fetches from that URL.

      `ng-href`指令允许AngularJS对`href`属性进行预处理，以便它能在浏览器获取那个URL之前，使用一个返回适当URL的绑定表达式替换它。

      In AngularJS, the `ng-href` is often used to activate a route as part of navigation.

      在AngularJS 中，`ng-href`通常用来作为导航的一部分，激活一个路由。

      <code-example hideCopy format="">

        &lt;a ng-href="#{{ moviesHash }}">Movies&lt;/a>

      </code-example>

      Routing is handled differently in Angular.

      路由在Angular中的处理方式不同。

    </td>

    <td>

      ### Bind to the `href` property

      ### 绑定到`href`属性

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="href" linenums="false"></code-example>

      Angular uses property binding; there is no built-in *href* directive.
      Place the element's `href` property in square brackets and set it to a quoted template expression.

      在Angular中，并没有内置的*href*指令，改用属性绑定。
      我们把元素的`href`属性放在方括号中，并把它设成一个引号中的模板表达式。

      For more information see the [Property binding](guide/template-syntax#property-binding)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解[属性绑定](guide/template-syntax#property-binding)的更多知识，参见[模板语法](guide/template-syntax)。

      In Angular, `href` is no longer used for routing. Routing uses `routerLink`, as shown in the following example.

      在Angular中，`href`不再用作路由，而是改用第三个例子中所展示的`routerLink`指令。

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="router-link" linenums="false"></code-example>

      For more information on routing, see the [RouterLink binding](guide/router#router-link)
      section of the [Routing & Navigation](guide/router) page.

      要了解关于路由的更多信息，请参见[路由与导航](guide/router)的[RouterLink绑定](guide/router#router-link)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-if

      <code-example hideCopy format="">

        &lt;table ng-if="movies.length">

      </code-example>

      In AngularJS, the `ng-if` directive removes or recreates a portion of the DOM,
      based on an expression. If the expression is false, the element is removed from the DOM.

      在AngularJS中，`ng-if`指令会根据一个表达式来移除或重建DOM中的一部分。如果表达式为假，元素就会被从DOM中移除。

      In this example, the `<table>` element is removed from the DOM unless the `movies` array has a length greater than zero.

      在这个例子中，除非`movies`数组的长度大于0，否则`<table>`元素就会被从DOM中移除。

    </td>

    <td>

      ### *ngIf

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngIf" linenums="false"></code-example>

      The `*ngIf` directive in Angular works the same as the `ng-if` directive in AngularJS. It removes
      or recreates a portion of the DOM based on an expression.

      Angular中的`*ngIf`指令与AngularJS中的`ng-if`指令一样，
      它根据表达式的值移除或重建DOM中的一部分。

      In this example, the `<table>` element is removed from the DOM unless the `movies` array has a length.

      在这个例子中，除非`movies`数组的长度大于0，否则`<table>`元素就会被从DOM中移除。

      The (*) before `ngIf` is required in this example.
      For more information, see [Structural Directives](guide/structural-directives).

      在这个例子中`ngIf`前的星号(*)是必须的。
      要了解更多信息，参见[结构型指令](guide/structural-directives)。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-model

      <code-example hideCopy format="">

        &lt;input ng-model="vm.favoriteHero"/>

      </code-example>

      In AngularJS, the `ng-model` directive binds a form control to a property in the controller associated with the template.
      This provides **two-way binding**, whereby any change made to the value in the view is synchronized with the model, and any change to the model is synchronized with the value in the view.

      在Angular1中，`ng-model`指令把一个表单控件绑定到了模板相关控制器的一个属性上。
      这提供了**双向绑定**功能，因此，任何对视图中值的改动，都会同步到模型中，对模型的改动，也会同步到视图中。

    </td>

    <td>

      ### ngModel

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngModel" linenums="false"></code-example>

      In Angular, **two-way binding** is denoted by `[()]`, descriptively referred to as a "banana in a box". This syntax is a shortcut for defining both property binding (from the component to the view)
      and event binding (from the view to the component), thereby providing two-way binding.

      在Angular中，**双向绑定**使用[()]标记出来，它被形象的比作“盒子中的香蕉”。
      这种语法是一个简写形式，用来同时定义一个属性绑定(从组件到视图)和一个事件绑定(从视图到组件)，因此，我们得到了双向绑定。

      For more information on two-way binding with `ngModel`, see the [NgModel&mdash;Two-way binding to
      form elements with `[(ngModel)]`](../guide/template-syntax.html#ngModel)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解使用ngModel进行双向绑定的更多知识，参见[模板语法](guide/template-syntax)中的[NgModel&mdash;使用`[(ngModel)]`进行双向绑定](../guide/template-syntax.html#ngModel)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-repeat

      <code-example hideCopy format="">

        &lt;tr ng-repeat="movie in vm.movies">

      </code-example>

      In AngularJS, the `ng-repeat` directive repeats the associated DOM element
      for each item in the specified collection.

      在Angular1中，`ng-repeat`指令会为指定集合中的每一个条目重复渲染相关的DOM元素。

      In this example, the table row (`<tr>`) element repeats for each movie object in the collection of movies.

      在这个例子中，对`movies`集合中的每一个`movie`对象重复渲染了这个表格行元素(`<tr>`)。

    </td>

    <td>

      ### *ngFor

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngFor" linenums="false"></code-example>

      The `*ngFor` directive in Angular is similar to the `ng-repeat` directive in AngularJS. It repeats
      the associated DOM element for each item in the specified collection.
      More accurately, it turns the defined element (`<tr>` in this example) and its contents into a template and
      uses that template to instantiate a view for each item in the list.

      Angular中的`*ngFor`指令类似于AngularJS中的`ng-repeat`指令。
      它为指定集合中的每一个条目重复渲染了相关的DOM元素。
      更准确的说，它把被界定出来的元素(这个例子中是`<tr>`)及其内容转成了一个模板，并使用那个模板来为列表中的每一个条目实例化一个视图。

      Notice the other syntax differences:
      The (*) before `ngFor` is required;
      the `let` keyword identifies `movie` as an input variable;
      the list preposition is `of`, not `in`.

      请注意其它语法上的差异：
      在`ngFor`前面的星号(*)是必须的；`let`关键字把`movie`标记成一个输入变量；列表中使用的介词是`of`，而不再是`in`。

      For more information, see [Structural Directives](guide/structural-directives).

      要了解更多信息，参见[结构性指令](guide/structural-directives)。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-show

      <code-example hideCopy format="">

        &lt;h3 ng-show="vm.favoriteHero">
          Your favorite hero is: {{vm.favoriteHero}}
        &lt;/h3>

      </code-example>

      In AngularJS, the `ng-show` directive shows or hides the associated DOM element, based on
      an expression.

      在AngularJS中，`ng-show`指令根据一个表达式来显示或隐藏相关的DOM元素。

      In this example, the `<div>` element is shown if the `favoriteHero` variable is truthy.

      在这个例子中，如果`favoriteHero`变量为真，`<div>`元素就会显示出来。

    </td>

    <td>

      ### Bind to the `hidden` property

      ### 绑定到`hidden`属性

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="hidden" linenums="false"></code-example>

      Angular uses property binding; there is no built-in *show* directive.
      For hiding and showing elements, bind to the HTML `hidden` property.

      在Angular中，并没有内置的*show*指令，可以改用属性绑定。
      要隐藏或显示一个元素，绑定到它的`hidden`属性就可以了。

      To conditionally display an element, place the element's `hidden` property in square brackets and
      set it to a quoted template expression that evaluates to the *opposite* of *show*.

      要想有条件的显示一个元素，就把该元素的`hidden`属性放到一个方括号里，并且把它设置为引号中的模板表达式，它的结果应该是与*显示*时*相反*的值。

      In this example, the `<div>` element is hidden if the `favoriteHero` variable is not truthy.

      在这个例子中，如果`favoriteHero`变量不是真值，`<div>`元素就会被隐藏。

      For more information on property binding, see the [Property binding](guide/template-syntax#property-binding)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解属性绑定的更多知识，参见[模板语法](guide/template-syntax)中的[属性绑定](guide/template-syntax#property-binding)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-src

      <code-example hideCopy format="">

        &lt;img ng-src="{{movie.imageurl}}">

      </code-example>

      The `ng-src` directive allows AngularJS to preprocess the `src` property so that it
      can replace the binding expression with the appropriate URL before the browser
      fetches from that URL.

      `ng-src`指令允许AngularJS对`src`属性进行预处理，以便它能够在浏览器获取此URL之前，用一个返回适当URL的绑定表达式替换它。

    </td>

    <td>

      ### Bind to the `src` property

      ### 绑定到`src`属性

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="src" linenums="false"></code-example>

      Angular uses property binding; there is no built-in *src* directive.
      Place the `src` property in square brackets and set it to a quoted template expression.

      在Angular中，并没有一个内置的*src*指令，可以使用属性绑定。
      把`src`属性放到方括号中，并且把它设为一个引号中的绑定表达式。

      For more information on property binding, see the [Property binding](guide/template-syntax#property-binding)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解属性绑定的更多知识，参见[模板语法](guide/template-syntax)中的[属性绑定](guide/template-syntax#property-binding)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-style

      <code-example hideCopy format="">

        &lt;div ng-style="{color: colorPreference}">

      </code-example>

      In AngularJS, the `ng-style` directive sets a CSS style on an HTML element
      based on an expression. That expression is often a key-value control object with each
      key of the object defined as a CSS property, and each value defined as an expression
      that evaluates to a value appropriate for the style.

      在AngularJS中，`ng-style`指令根据一个绑定表达式设置一个HTML元素的CSS样式。
      该表达式通常是一个“键-值”形式的控制对象，对象的每个键都是一个CSS属性，每个值都是一个能计算为此样式的合适值的表达式。

      In the example, the `color` style is set to the current value of the `colorPreference` variable.

      在这个例子中，`color`样式被设置为`colorPreference`变量的当前值。

    </td>

    <td>

      ### ngStyle

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="ngStyle" linenums="false"></code-example>

      In Angular, the `ngStyle` directive works similarly. It sets a CSS style on an HTML element based on an expression.

      在Angular中，`ngStyle`指令的工作方式与此类似。它根据一个表达式设置HTML元素上的CSS样式。

      In the first example, the `color` style is set to the current value of the `colorPreference` variable.

      在第一个例子中，`color`样式被设置成了`colorPreference`变量的当前值。

      Angular also has **style binding**, which is good way to set a single style. This is shown in the second example.

      Angular还有**样式绑定**语法，它是单独设置一个样式的好方法。它展示在第二个例子中。

      For more information on style binding, see the [Style binding](guide/template-syntax#style-binding) section of the
      [Template Syntax](guide/template-syntax) page.

      要了解样式绑定的更多知识，参见[模板语法](guide/template-syntax)中的[样式绑定](guide/template-syntax#style-binding)部分。

      For more information on the `ngStyle` directive, see [NgStyle](guide/template-syntax#ngStyle)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解关于`ngStyle`指令的更多知识，参见[模板语法](guide/template-syntax)中的[NgStyle](guide/template-syntax#ngStyle)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### ng-switch

      <code-example hideCopy format="">

        &lt;div ng-switch="vm.favoriteHero &&
                        vm.checkMovieHero(vm.favoriteHero)">
            &lt;div ng-switch-when="true">
              Excellent choice!
            &lt;/div>
            &lt;div ng-switch-when="false">
              No movie, sorry!
            &lt;/div>
            &lt;div ng-switch-default>
              Please enter your favorite hero.
            &lt;/div>
        &lt;/div>

      </code-example>

      In AngularJS, the `ng-switch` directive swaps the contents of
      an element by selecting one of the templates based on the current value of an expression.

      在Angular1中，`ng-switch`指令根据一个表达式的当前值把元素的内容替换成几个模板之一。

      In this example, if `favoriteHero` is not set, the template displays "Please enter ...".
      If `favoriteHero` is set, it checks the movie hero by calling a controller method.
      If that method returns `true`, the template displays "Excellent choice!".
      If that methods returns `false`, the template displays "No movie, sorry!".

      在这个例子中，如果`favoriteHero`没有设置，则模板显示“Please enter ...”。
      如果`favoriteHero`设置过，它就会通过调用一个控制其方法来检查它是否电影里的英雄。
      如果该方法返回`true`，模板就会显示“Excellent choice!”。
      如果该方法返回`false`，该模板就会显示“No movie, sorry!”。

    </td>

    <td>

      ### ngSwitch

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.html" region="ngSwitch" linenums="false"></code-example>

      In Angular, the `ngSwitch` directive works similarly.
      It displays an element whose `*ngSwitchCase` matches the current `ngSwitch` expression value.

      在Angular中，`ngSwitch`指令的工作方式与此类似。
      它会显示那个与`ngSwitch`表达式的当前值匹配的那个`*ngSwitchCase`所在的元素。

      In this example, if `favoriteHero` is not set, the `ngSwitch` value is `null`
      and `*ngSwitchDefault` displays, "Please enter ...".
      If `favoriteHero` is set, the app checks the movie hero by calling a component method.
      If that method returns `true`, the app selects `*ngSwitchCase="true"` and displays: "Excellent choice!"
      If that methods returns `false`, the app selects `*ngSwitchCase="false"` and displays: "No movie, sorry!"

      在这个例子中，如果`favoriteHero`没有设置，则`ngSwitch`的值是`null`，我们会看到
      `*ngSwitchDefault`中的段落“Please enter ...”。
      如果`favoriteHero`被设置了，它就会通过调用一个组件方法来检查电影英雄。
      如果该方法返回`true`，我们就会看到“Excellent choice!”。
      如果该方法返回`false`，我们就会看到“No movie, sorry!”。

      The (*) before `ngSwitchCase` and `ngSwitchDefault` is required in this example.

      在这个例子中，`ngSwitchCase`和`ngSwitchDefault`前面的星号(*)是必须的。

      For more information, see [The NgSwitch directives](guide/template-syntax#ngSwitch)
      section of the [Template Syntax](guide/template-syntax) page.

      要了解更多信息，参见[模板语法](guide/template-syntax)中的[NgSwitch指令](guide/template-syntax#ngSwitch)部分。

    </td>

  </tr>

</table>

{@a filters-pipes}

## Filters/pipes

## 过滤器/管道

Angular **pipes** provide formatting and transformation for data in the template, similar to AngularJS **filters**.
Many of the built-in filters in AngularJS have corresponding pipes in Angular.
For more information on pipes, see [Pipes](guide/pipes).

Angular中的**管道**为模板提供了格式化和数据转换功能，类似于AngularJS中的**过滤器**。
AngularJS中的很多内置过滤器在Angular中都有对应的管道。
要了解管道的更多信息，参见[Pipes](guide/pipes)。

<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      AngularJS

    </th>

    <th>

      Angular

    </th>

  </tr>

  <tr style=top>

    <td>

      ### currency

      <code-example hideCopy>

        &lt;td>{{movie.price | currency}}&lt;/td>

      </code-example>

      Formats a number as currency.

      把一个数字格式化成货币。

    </td>

    <td>

      ### currency

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="currency" linenums="false"></code-example>

      The Angular `currency` pipe is similar although some of the parameters have changed.

      Angular的`currency`管道和1中很相似，只是有些参数变化了。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### date

      <code-example hideCopy>

        &lt;td>{{movie.releaseDate | date}}&lt;/td>

      </code-example>

      Formats a date to a string based on the requested format.

      基于要求的格式把日期格式化成字符串。

    </td>

    <td>

      ### date

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="date" linenums="false"></code-example>

      The Angular `date` pipe is similar.

      Angular的`date`管道和它很相似。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### filter

      <code-example hideCopy>

        &lt;tr ng-repeat="movie in movieList | filter: {title:listFilter}">

      </code-example>

      Selects a subset of items from the defined collection, based on the filter criteria.

      基于过滤条件从指定的集合中选取出一个子集。

    </td>

    <td>

      ### none

      ### 没了

      For performance reasons, no comparable pipe exists in Angular. Do all your filtering in the component. If you need the same filtering code in several templates, consider building a custom pipe.

      在Angular中，出于性能的考虑，并没有一个类似的管道。
      过滤逻辑应该在组件中用代码实现。
      如果它将被复用在几个模板中，可以考虑构建一个自定义管道。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### json

      <code-example hideCopy>

        &lt;pre>{{movie | json}}&lt;/pre>

      </code-example>

      Converts a JavaScript object into a JSON string. This is useful for debugging.

      把一个JavaScript对象转换成一个JSON字符串。这对调试很有用。

    </td>

    <td>

      ### json

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="json" linenums="false"></code-example>

      The Angular `json` pipe does the same thing.

      Angular的`json`管道做完全相同的事。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### limitTo

      <code-example hideCopy>

        &lt;tr ng-repeat="movie in movieList | limitTo:2:0">

      </code-example>

      Selects up to the first parameter (2) number of items from the collection
      starting (optionally) at the beginning index (0).

      从集合中选择从(第二参数指定的)起始索引号(0)开始的最多(第一参数指定的)条目数(2)个条目。

    </td>

    <td>

      ### slice

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="slice" linenums="false"></code-example>

      The `SlicePipe` does the same thing but the *order of the parameters is reversed*, in keeping
      with the JavaScript `Slice` method.
      The first parameter is the starting index; the second is the limit.
      As in AngularJS, coding this operation within the component instead could improve performance.

      `SlicePipe`做同样的事，但是*两个参数的顺序是相反的*，以便于JavaScript中的`slice`方法保持一致。
      第一个参数是起始索引号，第二个参数是限制的数量。
      和AngularJS中一样，如果们改用组件中的代码实现此操作，性能将会提升。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### lowercase

      <code-example hideCopy>

        &lt;div>{{movie.title | lowercase}}&lt;/div>

      </code-example>

      Converts the string to lowercase.

      把该字符串转成小写形式。

    </td>

    <td>

      ### lowercase

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="lowercase" linenums="false"></code-example>

      The Angular `lowercase` pipe does the same thing.

      Angular的`lowercase`管道和1中的功能完全相同。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### number

      <code-example hideCopy>

        &lt;td>{{movie.starRating | number}}&lt;/td>

      </code-example>

      Formats a number as text.

      把数字格式化为文本。

    </td>

    <td>

      ### number

      <code-example hideCopy path="ajs-quick-reference/src/app/app.component.html" region="number" linenums="false"></code-example>

      The Angular `number` pipe is similar.
      It provides more functionality when defining
      the decimal places, as shown in the second example above.

      Angular的`number`管道很相似。
      但在指定小数点位置时，它提供了更多的功能，如第二个范例所示。

      Angular also has a `percent` pipe, which formats a number as a local percentage
      as shown in the third example.

      Angular还有一个`percent`管道，它把一个数组格式化为本地化的(local)百分比格式，如第三个范例所示。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### orderBy

      <code-example hideCopy>

        &lt;tr ng-repeat="movie in movieList | orderBy : 'title'">

      </code-example>

      Displays the collection in the order specified by the expression.
      In this example, the movie title orders the `movieList`.

      使用表达式中所指定的方式对集合进行排序。
      在这个例子中，`movieList`被根据movie的title排序了。

    </td>

    <td>

      ### none

      ### 没了

      For performance reasons, no comparable pipe exists in Angular.
      Instead, use component code to order or sort results. If you need the same ordering or sorting code in several templates, consider building a custom pipe.

      在Angular中，出于性能的考虑，并没有一个类似的管道。
      排序逻辑应该在组件中用代码实现。
      如果它将被复用在几个模板中，可以考虑构建一个自定义管道。

    </td>

  </tr>

</table>

{@a controllers-components}

## Modules/controllers/components

## 模块/控制器/组件

In both AngularJS and Angular, modules help you organize your application into cohesive blocks of functionality.

无论在AngularJS还是Angular中，我们都要借助“模块”来把应用拆分成一些紧密相关的功能块。

In AngularJS, you write the code that provides the model and the methods for the view in a **controller**.
In Angular, you build a **component**.

在AngularJS中，我们在**控制器**中写代码，来为视图提供模型和方法。
在Angular中，我们创建**组件**。

Because much AngularJS code is in JavaScript, JavaScript code is shown in the AngularJS column.
The Angular code is shown using TypeScript.

因为很多AngularJS的代码是用JavaScript写的，所以在AngularJS列显示的是JavaScript代码，而Angular列显示的是TypeScript代码。

<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      AngularJS

    </th>

    <th>

      Angular

    </th>

  </tr>

  <tr style=top>

    <td>

      ### IIFE

      <code-example hideCopy>

        (function () {
          ...
        }());

      </code-example>

      In AngularJS, an immediately invoked function expression (or IIFE) around controller code
      keeps it out of the global namespace.

      在AngularJS中，用立即调用的函数表达式(IIFE)来包裹控制器代码可以让控制器代码不会污染全局命名空间。

    </td>

    <td>

      ### none

      ### 没了

      This is a nonissue in Angular because ES 2015 modules
      handle the namespacing for you.

      在Angular中我们不用担心这个问题，因为使用ES 2015的模块，模块会替我们处理命名空间问题。

      For more information on modules, see the [Modules](guide/architecture#modules) section of the
      [Architecture Overview](guide/architecture).

      要了解关于模块的更多信息，参见[架构概览](guide/architecture)中的[模块](guide/architecture#modules)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### Angular modules

      ### Angular模块

      <code-example hideCopy>

        angular.module("movieHunter", ["ngRoute"]);

      </code-example>

      In AngularJS, an Angular module keeps track of controllers, services, and other code.
      The second argument defines the list of other modules that this module depends upon.

      在AngularJS中，Angular模块用来对控制器、服务和其它代码进行跟踪。第二个参数定义该模块依赖的其它模块列表。

    </td>

    <td>

      ### NgModules

      <code-example hideCopy path="ajs-quick-reference/src/app/app.module.1.ts" linenums="false"></code-example>

      NgModules, defined with the `NgModule` decorator, serve the same purpose:

      Angular的模块用`NgModule`装饰器进行定义，有如下用途：

      * `imports`: specifies the list of other modules that this module depends upon

         `imports`: 指定当前模块依赖的其它模块列表

      * `declaration`: keeps track of your components, pipes, and directives.

         `declaration`: 用于记录组件、管道和指令。

      For more information on modules, see [NgModules](guide/ngmodules).

      要了解关于模块的更多知识，参见[NgModules](guide/ngmodules)。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### Controller registration

      ### 控制器注册

      <code-example hideCopy>

        angular
          .module("movieHunter")
          .controller("MovieListCtrl",
                      ["movieService",
                       MovieListCtrl]);

      </code-example>

      AngularJS has code in each controller that looks up an appropriate Angular module
      and registers the controller with that module.

      在AngularJS中，在每个控制器中都有一些代码，用于找到合适的Angular模块并把该控制器注册进去。

      The first argument is the controller name. The second argument defines the string names of
      all dependencies injected into this controller, and a reference to the controller function.

      第一个参数是控制器的名称，第二个参数定义了所有将注入到该控制器的依赖的字符串名称，以及一个到控制器函数的引用。

    </td>

    <td>

      ### Component decorator

      ### 组件装饰器

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="component" linenums="false"></code-example>

      Angular adds a decorator to the component class to provide any required metadata.
      The `@Component` decorator declares that the class is a component and provides metadata about
      that component such as its selector (or tag) and its template.

      在Angular中，我们往组件类上添加了一个装饰器，以提供任何需要的元数据。
      `@Component`装饰器把该类声明为组件，并提供了关于该组件的元数据，比如它的选择器(或标签)和模板。

      This is how you associate a template with logic, which is defined in the component class.

      这就是把模板关联到代码的方式，它定义在组件类中。

      For more information, see the [Components](guide/architecture#components)
      section of the [Architecture Overview](guide/architecture) page.

      要了解关于组件的更多信息，参见[架构概览](guide/architecture)中的[组件](guide/architecture#components)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### Controller function

      ### 控制器函数

      <code-example hideCopy>

        function MovieListCtrl(movieService) {
        }

      </code-example>

      In AngularJS, you write the code for the model and methods in a controller function.

      在Angular1中，我们在控制器函数中写模型和方法的代码。

    </td>

    <td>

      ### Component class

      ### 组件类

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="class" linenums="false"></code-example>

      In Angular, you create a component class.

      在Angular中，我们写组件类。

      NOTE: If you are using TypeScript with AngularJS, you must use the `export` keyword to export the component class.

      注意：如果你正在用TypeScript写AngularJS，那么必须用`export`关键字来导出组件类。

      For more information, see the [Components](guide/architecture#components)
      section of the [Architecture Overview](guide/architecture) page.

      要了解关于组件的更多信息，参见[架构概览](guide/architecture)中的[组件](guide/architecture#components)部分。

    </td>

  </tr>

  <tr style=top>

    <td>

      ### Dependency injection

      ### 依赖注入

      <code-example hideCopy>

        MovieListCtrl.$inject = ['MovieService'];
        function MovieListCtrl(movieService) {
        }

      </code-example>

      In AngularJS, you pass in any dependencies as controller function arguments.
      This example injects a `MovieService`.

      在AngularJS中，我们把所有依赖都作为控制器函数的参数。
      在这个例子中，我们注入了一个`MovieService`。

      To guard against minification problems, tell Angular explicitly
      that it should inject an instance of the `MovieService` in the first parameter.

      我们还通过在第一个参数明确告诉Angular它应该注入一个`MovieService`的实例，以防止在最小化时出现问题。

    </td>

    <td>

      ### Dependency injection

      ### 依赖注入

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="di" linenums="false"></code-example>

      In Angular, you pass in dependencies as arguments to the component class constructor.
      This example injects a `MovieService`.
      The first parameter's TypeScript type tells Angular what to inject, even after minification.

      在Angular中，我们把依赖作为组件构造函数的参数传入。
      在这个例子中，我们注入了一个`MovieService`。
      即使在最小化之后，第一个参数的TypeScript类型也会告诉Angular它该注入什么。

      For more information, see the [Dependency injection](guide/architecture#dependency-injection)
      section of the [Architecture Overview](guide/architecture).

      要了解关于依赖注入的更多信息，参见[架构概览](guide/architecture)中的[依赖注入](guide/architecture#dependency-injection)部分。

    </td>

  </tr>

</table>

{@a style-sheets}

## Style sheets

## 样式表

Style sheets give your application a nice look.
In AngularJS, you specify the style sheets for your entire application.
As the application grows over time, the styles for the many parts of the application
merge, which can cause unexpected results.
In Angular, you can still define style sheets for your entire application. But now you can
also encapsulate a style sheet within a specific component.

样式表美化我们的应用程序。
在AngularJS中，我们为整个应用程序指定样式表。
当应用程序成长一段时间之后，应用程序中很多部分的样式会被合并，导致无法预计的后果。
在Angular中，我们仍然会为整个应用程序定义样式，不过现在也可以把样式表封装在特定的组件中。

<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      AngularJS

    </th>

    <th>

      Angular

    </th>

  </tr>

  <tr style=top>

    <td>

      ### Link tag

      ### Link标签

      <code-example hideCopy>

        &lt;link href="styles.css" rel="stylesheet" />

      </code-example>

      AngularJS, uses a `link` tag in the head section of the `index.html` file
      to define the styles for the application.

      在AngularJS中，我们在`index.html`的`head`区使用`link`标签来为应用程序定义样式。

    </td>

    <td>

      ### Styles configuration

      ### 样式配置

      <code-example hideCopy path="ajs-quick-reference/.angular-cli.1.json" region="styles" linenums="false"></code-example>

      With the Angular CLI, you can configure your global styles in the `.angular-cli.json` file.
      You can rename the extension to `.scss` to use sass.

      使用 Angular CLI，我们可以在 `.angular-cli.json` 文件中配置全局样式。
      也可以把扩展名改为 `.scss` 来使用 sass。

      ### StyleUrls

      In Angular, you can use the `styles` or `styleUrls` property of the `@Component` metadata to define
      a style sheet for a particular component.

      在Angular中，我们可以在`@Component`的元数据中使用`styles`或`styleUrls`属性来为一个特定的组件定义样式表。

      <code-example hideCopy path="ajs-quick-reference/src/app/movie-list.component.ts" region="style-url" linenums="false"></code-example>

      This allows you to set appropriate styles for individual components that won’t leak into
      other parts of the application.

      这让我们可以为各个组件设置合适的样式，而不用担心它被泄漏到程序中的其它部分。

    </td>

  </tr>

</table>
