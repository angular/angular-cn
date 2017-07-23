@title
风格指南

@intro
如何写 Angular 风格的程序

@description


Looking for an opinionated guide to Angular syntax, conventions, and application structure?
Step right in!
This style guide presents  preferred conventions and, as importantly, explains why.

如果你正在寻找关于 Angular 语法、约定和应用组织结构的官方指南，那你就来对了。
本风格指南介绍了提倡的约定，更重要的是，解释了为什么。



{@a toc}


# Contents

# 目录

  * [Single responsibility](guide/style-guide#single-responsibility)

    [单一职责](guide/style-guide#single-responsibility)

  * [Naming](guide/style-guide#naming)

    [命名](guide/style-guide#naming)

  * [Coding conventions](guide/style-guide#coding-conventions)

    [代码规约](guide/style-guide#coding-conventions)

  * [App structure and Angular modules](guide/style-guide#application-structure-and-angular-modules)

    [应用结构与Angular模块](guide/style-guide#application-structure-and-angular-modules)

  * [Components](guide/style-guide#components)

    [组件](guide/style-guide#components)

  * [Directives](guide/style-guide#directives)

    [指令](guide/style-guide#directives)

  * [Services](guide/style-guide#services)

    [服务](guide/style-guide#services)

  * [Data services](guide/style-guide#data-services)

    [数据服务](guide/style-guide#data-services)

  * [Lifecycle hooks](guide/style-guide#lifecycle-hooks)

    [生命周期钩子](guide/style-guide#lifecycle-hooks)

  * [Appendix](guide/style-guide#appendix)

    [附录](guide/style-guide#appendix)




## Style vocabulary

## 风格词汇

Each guideline describes either a good or bad practice, and all have a consistent presentation.

每个指导原则都会描述好的或者坏的做法，所有指导原则风格一致。

The wording of each guideline indicates how strong the recommendation is.

指导原则中使用的词汇表明推荐的程度。


<div class="s-rule do">



**Do** is one that should always be followed.
_Always_ might be a bit too strong of a word.
Guidelines that literally should always be followed are extremely rare.
On the other hand, you need a really unusual case for breaking a *Do* guideline.

**坚持**意味着总是应该遵循的约定。
_总是_可能有点太强了。应该_总是_遵循的指导原则非常少。
但是，只有遇到非常不寻常的情况才能打破*坚持*的原则。


</div>



<div class="s-rule consider">



**Consider** guidelines should generally be followed.

**考虑**标志着通常应该遵循的指导原则。

If you fully understand the meaning behind the guideline and have a good reason to deviate, then do so. Please strive to be consistent.

如果能完全理解指导原则背后的含义，并且很好的理由背离它，那就可以那么做。但是请保持一致。


</div>



<div class="s-rule avoid">



**Avoid** indicates something you should almost never do. Code examples to *avoid* have an unmistakeable red header.

**避免**标志着我们决不应该做的事。需要*避免*的代码范例会有明显的红色标题。


</div>



<div class="s-why">



**Why?** gives reasons for following the previous recommendations.

**为何？**会给出随后的建议的理由。


</div>




## File structure conventions

## 文件结构约定

Some code examples display a file that has one or more similarly named companion files. 
For example, `hero.component.ts` and `hero.component.html`.

在一些代码例子中，有的文件有一个或多个相似名字的伴随文件。（例如 hero.component.ts 和 hero.component.html）。

The guideline uses the shortcut `hero.component.ts|html|css|spec` to represent those various files. Using this shortcut makes this guide's file structures easier to read and more terse.

本指南将会使用像`hero.component.ts|html|css|spec`的简写来表示上面描述的多个文件，目的是保持本指南的简洁性，增加描述文件结构时的可读性。



{@a single-responsibility}


## Single responsibility

## 单一职责

Apply the 
<a href="https://wikipedia.org/wiki/Single_responsibility_principle" target="_blank"><i>single responsibility principle</i> (SRP)</a>
to all components, services, and other symbols. 
This helps make the app cleaner, easier to read and maintain, and more testable.

对所有的组件、服务等等应用<a href="https://wikipedia.org/wiki/Single_responsibility_principle" target="_blank"><i>单一职责原则</i> (SRP)</a>

### {@a 01-01}Rule of One

### {@a 01-01}单一法则

#### <a href="#01-01">Style 01-01</a>

#### <a href="#01-01">风格 01-01</a>


<div class="s-rule do">



**Do** define one thing, such as a service or component, per file.

**坚持**每个文件只定义一样东西（例如服务或组件）。


</div>



<div class="s-rule consider">



**Consider** limiting files to 400 lines of code.

**考虑**把文件大小限制在 400 行代码以内。


</div>



<div class="s-why">



**Why?** One component per file makes it far easier to read, maintain, and avoid 
collisions with teams in source control.

**为何？**单组件文件非常容易阅读、维护，并能防止在版本控制系统里与团队冲突。


</div>



<div class="s-why">



**Why?** One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

**为何？**单组件文件可以防止一些隐蔽的程序缺陷，当把多个组件合写在同一个文件中时，可能造成共享变量、创建意外的闭包，或者与依赖之间产生意外耦合等情况。


</div>



<div class="s-why-last">



**Why?** A single component can be the default export for its file which facilitates lazy loading with the router.

**为何？**单独的组件通常是该文件默认的导出，可以用路由器实现按需加载。

</div>



The key is to make the code more reusable, easier to read, and less mistake prone.

最关键的是，可以增强代码可重用性和阅读性，减少出错的可能性。

The following *negative* example defines the `AppComponent`, bootstraps the app, 
defines the `Hero` model object, and loads heroes from the server all in the same file. 
*Don't do this*.

下面的*负面*例子定义了`AppComponent`，它来引导应用程序，定义了`Hero`模型对象，并从服务器加载了英雄 ... 所有都在同一个文件。 *不要这么做*。


<code-example path="style-guide/src/01-01/app/heroes/hero.component.avoid.ts" title="app/heroes/hero.component.ts">

</code-example>



It is a better practice to redistribute the component and its 
supporting classes into their own, dedicated files.

最好将组件及其支撑部件重新分配到独立的文件。


<code-tabs>

  <code-pane title="main.ts" path="style-guide/src/01-01/main.ts">

  </code-pane>

  <code-pane title="app/app.module.ts" path="style-guide/src/01-01/app/app.module.ts">

  </code-pane>

  <code-pane title="app/app.component.ts" path="style-guide/src/01-01/app/app.component.ts">

  </code-pane>

  <code-pane title="app/heroes/heroes.component.ts" path="style-guide/src/01-01/app/heroes/heroes.component.ts">

  </code-pane>

  <code-pane title="app/heroes/shared/hero.service.ts" path="style-guide/src/01-01/app/heroes/shared/hero.service.ts">

  </code-pane>

  <code-pane title="app/heroes/shared/hero.model.ts" path="style-guide/src/01-01/app/heroes/shared/hero.model.ts">

  </code-pane>

  <code-pane title="app/heroes/shared/mock-heroes.ts" path="style-guide/src/01-01/app/heroes/shared/mock-heroes.ts">

  </code-pane>

</code-tabs>



As the app grows, this rule becomes even more important.

随着应用程序的成长，本法则会变得越来越重要。
<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 01-02}Small functions

### {@a 01-02}简单函数

#### <a href="#01-02">Style 01-02</a>

#### <a href="#01-02">风格 01-02</a>


<div class="s-rule do">



**Do** define small functions

**坚持**定义简单函数


</div>



<div class="s-rule consider">



**Consider** limiting to no more than 75 lines.

**考虑**限制在 75 行之内。

</div>



<div class="s-why">



**Why?** Small functions are easier to test, especially when they do one thing and serve one purpose.

**为何？**简单函数更易于测试，特别是当它们只做一件事，只为一个目的服务时。


</div>



<div class="s-why">



**Why?** Small functions promote reuse.

**为何？**简单函数促进代码重用。


</div>



<div class="s-why">



**Why?** Small functions are easier to read.

**为何？**简单函数更易于阅读。


</div>



<div class="s-why">



**Why?** Small functions are easier to maintain.

**为何？**简单函数更易于维护。


</div>



<div class="s-why-last">



**Why?** Small functions help avoid hidden bugs that come with large functions that share variables with external scope, create unwanted closures, or unwanted coupling with dependencies.

**为何？**简单函数可避免易在大函数中产生的隐蔽性错误，例如与外界共享变量、创建意外的闭包或与依赖之间产生意外耦合等。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Naming

## 命名

Naming conventions are hugely important to maintainability and readability. This guide recommends naming conventions for the file name and the symbol name.

命名约定对可维护性和可读性非常重要。本指南为文件名和符号名推荐了一套命名约定。



### {@a 02-01}General Naming Guidelines

### {@a 02-01}总体命名指导原则

#### <a href="#02-01">Style 02-01</a>

#### <a href="#02-01">风格 02-01</a>


<div class="s-rule do">



**Do** use consistent names for all symbols.

**坚持**所有符号使用一致的命名规则。


</div>



<div class="s-rule do">



**Do** follow a pattern that describes the symbol's feature then its type. The recommended pattern is `feature.type.ts`.

**坚持**遵循同一个模式来描述符号的特性和类型。推荐的模式为`feature.type.ts`。


</div>



<div class="s-why">



**Why?** Naming conventions help provide a consistent way to find content at a glance. Consistency within the project is vital. Consistency with a team is important. Consistency across a company provides tremendous efficiency.

**为何？**命名约定提供了一致的方式来查找内容，让我们一眼就能锁定。
项目的一致性是至关重要的。团队内的一致性也很重要。整个公司的一致性会提供惊人的效率。


</div>



<div class="s-why">



**Why?** The naming conventions should simply help find desired code faster and make it easier to understand.

**为何？**命名约定帮助我们更快得找到不在手头的代码，更容易理解它。


</div>



<div class="s-why-last">



**Why?** Names of folders and files should clearly convey their intent. For example, `app/heroes/hero-list.component.ts` may contain a component that manages a list of heroes.

**为何？**目录名和文件名应该清楚的传递它们的意图。
例如，`app/heroes/hero-list.component.ts`包含了一个用来管理英雄列表的组件。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-02}Separate File names with dots and dashes

### {@a 02-02}使用点和横杠来分隔文件名

#### <a href="#02-02">Style 02-02</a>

#### <a href="#02-02">风格 02-02</a>


<div class="s-rule do">



**Do** use dashes to separate words in the descriptive name.

**坚持** 在描述性名字中，用横杠来分隔单词。


</div>



<div class="s-rule do">



**Do** use dots to separate the descriptive name from the type.

**坚持**使用点来分隔描述性名字和类型。


</div>



<div class="s-rule do">



**Do** use consistent type names for all components following a pattern that describes the component's feature then its type. A recommended pattern is `feature.type.ts`.

**坚持**遵循先描述组件特性，再描述它的类型的模式，对所有组件使用一致的类型命名规则。推荐的模式为`feature.type.ts`。


</div>



<div class="s-rule do">



**Do** use conventional type names including `.service`, `.component`, `.pipe`, `.module`, and `.directive`. 
Invent additional type names if you must but take care not to create too many.

**坚持**使用惯用的后缀来描述类型，包括`*.service`、`*.component`、`*.pipe`、`.module`、`.directive`。
必要时可以创建更多类型名，但必须注意，不要创建太多。


</div>



<div class="s-why">



**Why?** Type names provide a consistent way to quickly identify what is in the file.

**为何？**类型名字提供一致的方式来快速的识别文件中有什么。


</div>



<div class="s-why">



**Why?** Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.

**为何？** 利用编辑器或者 IDE 的模糊搜索功能，可以很容易地找到特定文件。


</div>



<div class="s-why">



**Why?** Unabbreviated type names such as `.service` are descriptive and unambiguous.
Abbreviations such as `.srv`, `.svc`, and `.serv` can be confusing.

**为何？** 像`.service`这样的没有简写过的类型名字，描述清楚，毫不含糊。
像`.srv`, `.svc`, 和 `.serv`这样的简写可能令人困惑。


</div>



<div class="s-why-last">



**Why?** Type names provide pattern matching for any automated tasks.

**为何？**为自动化任务提供模式匹配。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-03}Symbols and file names

### {@a 02-03}符号名与文件名

#### <a href="#02-03">Style 02-03</a>

#### <a href="#02-03">风格 02-03</a>


<div class="s-rule do">



**Do** use consistent names for all assets named after what they represent.

**坚持**为所有东西使用一致的命名约定，以它们所代表的东西命名。


</div>



<div class="s-rule do">



**Do** use upper camel case for class names.

**坚持**使用大写驼峰命名法来命名类。符号名匹配它所在的文件名。


</div>



<div class="s-rule do">



**Do** match the name of the symbol to the name of the file.

**坚持**在符号名后面追加约定的类型后缀（例如`Component`、`Directive`、`Module`、`Pipe`、`Service`）。


</div>



<div class="s-rule do">



**Do** append the symbol name with the conventional suffix (such as `Component`, 
`Directive`, `Module`, `Pipe`, or `Service`) for a thing of that type.

**坚持**在符号名后面追加约定的类型后缀（例如`.component.ts`、`.directive.ts`、`.module.ts`、`.pipe.ts`、`.service.ts`）。


</div>



<div class="s-rule do">



**Do** give the filename the conventional suffix (such as `.component.ts`, `.directive.ts`, 
`.module.ts`, `.pipe.ts`, or `.service.ts`) for a file of that type.

**坚持**在文件名后面追加约定的类型后缀（例如`.component.ts`、`.directive.ts`、`.module.ts`、`.pipe.ts`、`.service.ts`）。

</div>



<div class="s-why">



**Why?** Consistent conventions make it easy to quickly identify 
and reference assets of different types.

**为何？**遵循一致的约定可以快速识别和引用不同类型的资产。


</div>



<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      <p>
        Symbol Name
      </p>

      <p>
        符号名
      </p>

    </th>

    <th>

      <p>
        File Name
      </p>

      <p>
        文件名
      </p>

    </th>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })
        export class AppComponent { }
      </code-example>

    </td>

    <td>


      app.component.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })
        export class HeroesComponent { }
      </code-example>

    </td>

    <td>


      heroes.component.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })
        export class HeroListComponent { }
      </code-example>

    </td>

    <td>


      hero-list.component.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Component({ ... })
        export class HeroDetailComponent { }
      </code-example>

    </td>

    <td>


      hero-detail.component.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Directive({ ... })
        export class ValidationDirective { }
      </code-example>

    </td>

    <td>


      validation.directive.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })
        export class AppModule
      </code-example>

    </td>

    <td>


      app.module.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Pipe({ name: 'initCaps' })
        export class InitCapsPipe implements PipeTransform { }
      </code-example>

    </td>

    <td>


      init-caps.pipe.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Injectable()
        export class UserProfileService { }
      </code-example>

    </td>

    <td>


      user-profile.service.ts

    </td>

  </tr>

</table>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-04}Service names

### {@a 02-04}服务名

#### <a href="#02-04">Style 02-04</a>

#### <a href="#02-04">风格 02-04</a>


<div class="s-rule do">



**Do** use consistent names for all services named after their feature.

**坚持**使用一致的规则命名服务，以它们的特性来命名。


</div>



<div class="s-rule do">



**Do** suffix a service class name with `Service`. 
For example, something that gets data or heroes 
should be called a `DataService` or a `HeroService`.

**坚持**为服务的类名加上`Service`后缀。
例如，获取数据或英雄列表的服务应该命名为`DataService`或`HeroService`。

A few terms are unambiguously services. They typically 
indicate agency by ending in "-er". You may prefer to name 
a service that logs messages `Logger` rather than `LoggerService`. 
Decide if this exception is agreeable in your project. 
As always, strive for consistency.

有些词汇显然就是服务，比如那些以“-er”后缀结尾的。比如把记日志的服务命名为`Logger`就比`LoggerService`更好些。需要在你的项目中决定这种特例是否可以接受。
但无论如何，都要尽量保持一致。


</div>



<div class="s-why">



**Why?** Provides a consistent way to quickly identify and reference services.

**为何？**提供一致的方式来快速识别和引用服务。


</div>



<div class="s-why">



**Why?** Clear service names such as `Logger` do not require a suffix.

**为何？**像`Logger`这样的清楚的服务名不需要后缀。


</div>



<div class="s-why-last">



**Why?** Service names such as `Credit` are nouns and require a suffix and should be named with a suffix when it is not obvious if it is a service or something else.

**为何？**像`Credit`这样的，服务名是名词，需要一个后缀。当不能明显分辨它是服务还是其它东西时，应该添加后缀。


</div>



<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      <p>
        Symbol Name
      </p>

      <p>
        符号名
      </p>

    </th>

    <th>

      <p>
        File Name
      </p>

      <p>
        文件名
      </p>

    </th>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Injectable()
        export class HeroDataService { }
      </code-example>

    </td>

    <td>


      hero-data.service.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Injectable()
        export class CreditService { }
      </code-example>

    </td>

    <td>


      credit.service.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Injectable()
        export class Logger { }
      </code-example>

    </td>

    <td>


      logger.service.ts

    </td>

  </tr>

</table>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-05}Bootstrapping

### {@a 02-05}引导

#### <a href="#02-05">Style 02-05</a>

#### <a href="#02-05">风格 02-05</a>


<div class="s-rule do">



**Do** put bootstrapping and platform logic for the app in a file named `main.ts`.

**坚持**把应用的引导程序和平台相关的逻辑放到名为`main.ts`的文件里。


</div>



<div class="s-rule do">



**Do** include error handling in the bootstrapping logic.

**坚持**在引导逻辑中包含错误处理代码。


</div>



<div class="s-rule avoid">



**Avoid** putting app logic in `main.ts`. Instead, consider placing it in a component or service.

**避免**把应用逻辑放在`main.ts`中，而应放在组件或服务里。


</div>



<div class="s-why">



**Why?** Follows a consistent convention for the startup logic of an app.

**为何？**应用的启动逻辑遵循一致的约定。


</div>



<div class="s-why-last">



**Why?** Follows a familiar convention from other technology platforms.

**为何？**这是从其它技术平台借鉴的常用约定。


</div>



<code-example path="style-guide/src/02-05/main.ts" title="main.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-06}Directive selectors

### {@a 02-06}指令选择器

#### <a href="#02-06">Style 02-06</a>

#### <a href="#02-06">风格 02-06</a>


<div class="s-rule do">



**Do** Use lower camel case for naming the selectors of directives.

**坚持**使用小驼峰命名法来命名指令的选择器。


</div>



<div class="s-why">



**Why?** Keeps the names of the properties defined in the directives that are bound to the view consistent with the attribute names.

**为何？**保持指令中定义的属性名与绑定的视图 HTML 属性名字一致。


</div>



<div class="s-why-last">



**Why?** The Angular HTML parser is case sensitive and recognizes lower camel case.

**为何？**Angular HTML 解析器是大小写敏感的，它识别小写驼峰写法。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-07}Custom prefix for components

### {@a 02-07}为组件添加自定义前缀

#### <a href="#02-07">Style 02-07</a>

#### <a href="#02-07">风格 02-07</a>


<div class="s-rule do">



**Do** use a hyphenated, lowercase element selector value (e.g. `admin-users`). 

**坚持**使用带连字符的小写元素选择器值（例如`admin-users`）。


</div>



<div class="s-rule do">



**Do** use a custom prefix for a component selector. 
For example, the prefix `toh` represents from **T**our **o**f **H**eroes and the prefix `admin` represents an admin feature area.

**坚持**为组件选择器添加自定义前缀。
例如，`toh`前缀表示 **T**our **o**f **H**eroes（英雄指南），而前缀`admin表示管理特性区。


</div>



<div class="s-rule do">



**Do** use a prefix that identifies the feature area or the app itself.

**坚持**使用前缀来识别特性区或者应用程序本身。


</div>



<div class="s-why">



**Why?** Prevents element name collisions with components in other apps and with native HTML elements.

**为何？**防止与其它应用中的组件和原生 HTML 元素发生命名冲突。


</div>



<div class="s-why">



**Why?** Makes it easier to promote and share the component in other apps.

**为何？**更容易在其它应用中推广和共享组件。


</div>



<div class="s-why-last">



**Why?** Components are easy to identify in the DOM.

**为何？**组件在 DOM 中更容易被区分出来。


</div>



<code-example path="style-guide/src/02-07/app/heroes/hero.component.avoid.ts" region="example" title="app/heroes/hero.component.ts">

</code-example>



<code-example path="style-guide/src/02-07/app/users/users.component.avoid.ts" region="example" title="app/users/users.component.ts">

</code-example>



<code-example path="style-guide/src/02-07/app/heroes/hero.component.ts" region="example" title="app/heroes/hero.component.ts">

</code-example>



<code-example path="style-guide/src/02-07/app/users/users.component.ts" region="example" title="app/users/users.component.ts">

</code-example>



### {@a 02-08}Custom prefix for directives

### {@a 02-08}为指令添加自定义前缀

#### <a href="#02-08">Style 02-08</a>

#### <a href="#02-08">风格 02-08</a>


<div class="s-rule do">



**Do** use a custom prefix for the selector of directives (e.g, the prefix `toh` from **T**our **o**f **H**eroes).

**坚持**为指令的选择器添加自定义前缀（例如前缀`toh`来自**T**our **o**f **H**eroes）。


</div>



<div class="s-rule do">



**Do** spell non-element selectors in lower camel case unless the selector is meant to match a native HTML attribute.

**坚持**用小驼峰形式拼写非元素选择器，除非该选择器用于匹配原生 HTML 属性。


</div>



<div class="s-why">



**Why?** Prevents name collisions.

**为何？**防止名字冲突。


</div>



<div class="s-why-last">



**Why?** Directives are easily identified.

**为何？**指令更加容易被识别。


</div>



<code-example path="style-guide/src/02-08/app/shared/validate.directive.avoid.ts" region="example" title="app/shared/validate.directive.ts">

</code-example>



<code-example path="style-guide/src/02-08/app/shared/validate.directive.ts" region="example" title="app/shared/validate.directive.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-09}Pipe names

### {@a 02-09}管道名

#### <a href="#02-09">Style 02-09</a>

#### <a href="#02-09">风格 02-09</a>


<div class="s-rule do">



**Do** use consistent names for all pipes, named after their feature.

**坚持**为所有管道使用一致的命名约定，用它们的特性来命名。


</div>



<div class="s-why-last">



**Why?** Provides a consistent way to quickly identify and reference pipes.

**为何？**提供一致方式快速识别和引用管道。


</div>



<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      <p>
        Symbol Name
      </p>

      <p>
        符号名
      </p>

    </th>

    <th>

      <p>
        File Name
      </p>

      <p>
        文件名
      </p>

    </th>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Pipe({ name: 'ellipsis' })
        export class EllipsisPipe implements PipeTransform { }
      </code-example>

    </td>

    <td>


      ellipsis.pipe.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @Pipe({ name: 'initCaps' })
        export class InitCapsPipe implements PipeTransform { }
      </code-example>

    </td>

    <td>


      init-caps.pipe.ts

    </td>

  </tr>

</table>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-10}Unit test file names

### {@a 02-10}单元测试文件名

#### <a href="#02-10">Style 02-10</a>

#### <a href="#02-10">风格 02-10</a>


<div class="s-rule do">



**Do** name test specification files the same as the component they test.

**坚持**测试规格文件名与被测试组件文件名相同。


</div>



<div class="s-rule do">



**Do** name test specification files with a suffix of `.spec`.

**坚持**测试规格文件名添加`.spec`后缀。


</div>



<div class="s-why">



**Why?** Provides a consistent way to quickly identify tests.

**为何？**提供一致的方式来快速识别测试。


</div>



<div class="s-why-last">



**Why?** Provides pattern matching for [karma](http://karma-runner.github.io/) or other test runners.

**为何？**提供一个与 [karma](http://karma-runner.github.io/) 或者其它测试运行器相配的命名模式。


</div>





<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      <p>
        Symbol Name
      </p>

      <p>
        符号名
      </p>

    </th>

    <th>

      <p>
        File Name
      </p>

      <p>
        文件名
      </p>

    </th>

  </tr>

  <tr style=top>

    <td>


      Components

      组件
    </td>

    <td>


      heroes.component.spec.ts

      hero-list.component.spec.ts

      hero-detail.component.spec.ts
    </td>

  </tr>

  <tr style=top>

    <td>


      Services

      服务
    </td>

    <td>


      logger.service.spec.ts

      hero.service.spec.ts

      filter-text.service.spec.ts
    </td>

  </tr>

  <tr style=top>

    <td>


      Pipes

      管道
    </td>

    <td>


      ellipsis.pipe.spec.ts

      init-caps.pipe.spec.ts

    </td>

  </tr>

</table>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-11}_End-to-End_ (E2E) test file names

### {@a 02-11}端到端测试文件名

#### <a href="#02-11">Style 02-11</a>

#### <a href="#02-11">风格 02-11</a>


<div class="s-rule do">



**Do** name end-to-end test specification files after the feature they test with a suffix of `.e2e-spec`.

**坚持**端到端测试规格文件和它们所测试的特性同名，添加`.e2e-spec`后缀。


</div>



<div class="s-why">



**Why?** Provides a consistent way to quickly identify end-to-end tests.

**为何？**提供一致的方式快速识别端到端测试文件。


</div>



<div class="s-why-last">



**Why?** Provides pattern matching for test runners and build automation.

**为何？**提供一个与测试运行器和构建自动化匹配的模式。


</div>







<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>

      <p>
        Symbol Name
      </p>

      <p>
        符号名
      </p>

    </th>

    <th>

      <p>
        File Name
      </p>

      <p>
        文件名
      </p>

    </th>

  </tr>

  <tr style=top>

    <td>


      End-to-End Tests

      端到端测试
    </td>

    <td>


      app.e2e-spec.ts

      heroes.e2e-spec.ts

    </td>

  </tr>

</table>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 02-12}Angular _NgModule_ names

### {@a 02-12}Angular *NgModule* 命名

#### <a href="#02-12">Style 02-12</a>

#### <a href="#02-12">风格 02-12</a>


<div class="s-rule do">



**Do** append the symbol name with the suffix `Module`.

**坚持**为符号名添加`Module`后缀


</div>



<div class="s-rule do">



**Do** give the file name the `.module.ts` extension.

**坚持**为文件名添加`.module.ts`扩展名。


</div>



<div class="s-rule do">



**Do** name the module after the feature and folder it resides in.

**坚持**用特性名和所在目录命名模块。


</div>



<div class="s-why">



**Why?** Provides a consistent way to quickly identify and reference modules.

**为何？**提供一致的方式来快速标识和引用模块。


</div>



<div class="s-why">



**Why?** Upper camel case is conventional for identifying objects that can be instantiated using a constructor.

**为何？**大驼峰命名法是一种命名约定，用来标识可用构造函数实例化的对象。


</div>



<div class="s-why-last">



**Why?** Easily identifies the module as the root of the same named feature.

**为何？**很容易就能看出这个模块是同名特性的根模块。


</div>



<div class="s-rule do">



**Do** suffix a _RoutingModule_ class name with `RoutingModule`.

**坚持**为 *RoutingModule* 类名添加`RoutingModule`后缀。


</div>



<div class="s-rule do">



**Do** end the filename of a _RoutingModule_ with `-routing.module.ts`.

**坚持**为 *RoutingModule* 的文件名添加`-routing.module.ts`后缀。


</div>



<div class="s-why-last">



**Why?** A `RoutingModule` is a module dedicated exclusively to configuring the Angular router.
A consistent class and file name convention make these modules easy to spot and verify.

**为何？**`RoutingModule`是一种专门用来配置 Angular 路由器的模块。
“类名和文件名保持一致”的约定使这些模块易于发现和验证。


</div>



<table width="100%">

  <col width="50%">

  </col>

  <col width="50%">

  </col>

  <tr>

    <th>
      Symbol Name
    </th>

    <th>
      File Name
    </th>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })
        export class AppModule { }
      </code-example>

    </td>

    <td>


      app.module.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })
        export class HeroesModule { }
      </code-example>

    </td>

    <td>


      heroes.module.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })
        export class VillainsModule { }
      </code-example>

    </td>

    <td>


      villains.module.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })
        export class AppRoutingModule { }
      </code-example>

    </td>

    <td>


      app-routing.module.ts
    </td>

  </tr>

  <tr style=top>

    <td>

      <code-example>
        @NgModule({ ... })
        export class HeroesRoutingModule { }
      </code-example>

    </td>

    <td>


      heroes-routing.module.ts        

    </td>

  </tr>

</table>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Coding conventions

## 编程约定

Have a consistent set of coding, naming, and whitespace conventions.

坚持一致的编程、命名和空格的约定。



### {@a 03-01}Class

### {@a 03-01}类
#### <a href="#03-01">Style 03-01</a>

#### <a href="#03-01">风格 03-01</a>


<div class="s-rule do">



**Do** use upper camel case when naming classes.

**坚持**使用大写驼峰命名法来命名类。


</div>



<div class="s-why">



**Why?** Follows conventional thinking for class names.

**为何？**遵循类命名传统约定。


</div>



<div class="s-why-last">



**Why?** Classes can be instantiated and construct an instance. 
By convention, upper camel case indicates a constructable asset.

**为何？**类可以被实例化和构造实例。根据约定，用大写驼峰命名法来标识可构造的东西。


</div>



<code-example path="style-guide/src/03-01/app/core/exception.service.avoid.ts" region="example" title="app/shared/exception.service.ts">

</code-example>



<code-example path="style-guide/src/03-01/app/core/exception.service.ts" region="example" title="app/shared/exception.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 03-02}Constants

### {@a 03-02}常量

#### <a href="#03-02">Style 03-02</a>

#### <a href="#03-02">风格 03-02</a>


<div class="s-rule do">



**Do** declare variables with `const` if their values should not change during the application lifetime.

**坚持**用`const`声明变量，除非它们的值在应用的生命周期内会发生变化。


</div>



<div class="s-why">



**Why?** Conveys to readers that the value is invariant.

**为何？**告诉读者这个值是不可变的。


</div>



<div class="s-why-last">



**Why?** TypeScript helps enforce that intent by requiring immediate initialization and by
preventing subsequent re-assignment.

**为何？** TypeScript 会要求在声明时立即初始化，并阻止再次赋值，以确保达成我们的意图。


</div>



<div class="s-rule consider">



**Consider** spelling `const` variables in lower camel case.

**考虑** 把常量名拼写为小驼峰格式。


</div>



<div class="s-why">



**Why?** Lower camel case variable names (`heroRoutes`) are easier to read and understand
than the traditional UPPER_SNAKE_CASE names (`HERO_ROUTES`).

**为何？**小驼峰变量名 (`heroRoutes`) 比传统的大写蛇形命名法 (`HERO_ROUTES`) 更容易阅读和理解。


</div>



<div class="s-why-last">



**Why?** The tradition of naming constants in UPPER_SNAKE_CASE reflects
an era before the modern IDEs that quickly reveal the `const` declaration.
TypeScript prevents accidental reassignment. 

**为何？** 把常量命名为大写蛇形命名法的传统源于现代 IDE 出现之前，
以便阅读时可以快速发现那些`const`定义。
TypeScript 本身就能够防止意外赋值。


</div>



<div class="s-rule do">



**Do** tolerate _existing_ `const` variables that are spelled in UPPER_SNAKE_CASE.

**坚持**容许_现存的_`const`常量沿用大写蛇形命名法。


</div>



<div class="s-why-last">



**Why?** The tradition of UPPER_SNAKE_CASE remains popular and pervasive,
especially in third party modules.
It is rarely worth the effort to change them at the risk of breaking existing code and documentation.

**为何？**传统的大写蛇形命名法仍然很流行、很普遍，特别是在第三方模块中。
修改它们没多大价值，还会有破坏现有代码和文档的风险。


</div>



<code-example path="style-guide/src/03-02/app/core/data.service.ts" title="app/shared/data.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 03-03}Interfaces

### {@a 03-03}接口

#### <a href="#03-03">Style 03-03</a>

#### <a href="#03-03">风格 03-03</a>


<div class="s-rule do">



**Do** name an interface using upper camel case.

**坚持**使用大写驼峰命名法来命名接口。


</div>



<div class="s-rule consider">



**Consider** naming an interface without an `I` prefix.

**考虑**不要在接口名字前面加`I`前缀。


</div>



<div class="s-rule consider">



**Consider** using a class instead of an interface. 

**考虑**用类代替接口。


</div>



<div class="s-why">



**Why?** <a href="https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines" target="_blank">TypeScript guidelines</a> 
discourage the `I` prefix.

**为何？**<a href="https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines" target="_blank">TypeScript 指导原则</a>不建议使用 “I” 前缀。


</div>



<div class="s-why">



**Why?** A class alone is less code than a _class-plus-interface_.

**为何？**单独一个类的代码量小于*类+接口*。


</div>



<div class="s-why">



**Why?** A class can act as an interface (use `implements` instead of `extends`).

**为何？**类可以作为接口使用（只是用`implements`代替`extends`而已）。


</div>



<div class="s-why-last">



**Why?** An interface-class can be a provider lookup token in Angular dependency injection.

**为何？**在 Angular 依赖注入系统中，接口类可以作为服务提供商的查找令牌。


</div>



<code-example path="style-guide/src/03-03/app/core/hero-collector.service.avoid.ts" region="example" title="app/shared/hero-collector.service.ts">

</code-example>



<code-example path="style-guide/src/03-03/app/core/hero-collector.service.ts" region="example" title="app/shared/hero-collector.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 03-04}Properties and methods

### {@a 03-04}属性和方法

#### <a href="#03-04">Style 03-04</a>

#### <a href="#03-04">样式 03-04</a>


<div class="s-rule do">



**Do** use lower camel case to name properties and methods.

**坚持**使用小写驼峰命名法来命名属性和方法。


</div>



<div class="s-rule avoid">



**Avoid** prefixing private properties and methods with an underscore.

**避免**为私有属性和方法添加下划线前缀。


</div>



<div class="s-why">



**Why?** Follows conventional thinking for properties and methods.

**为何？**遵循传统属性和方法的命名约定。


</div>



<div class="s-why">



**Why?** JavaScript lacks a true private property or method.

**为何？** JavaScript 不支持真正的私有属性和方法。


</div>



<div class="s-why-last">



**Why?** TypeScript tooling makes it easy to identify private vs. public properties and methods.

**为何？** TypeScript 工具让识别私有或公有属性和方法变得很简单。


</div>



<code-example path="style-guide/src/03-04/app/core/toast.service.avoid.ts" region="example" title="app/shared/toast.service.ts">

</code-example>



<code-example path="style-guide/src/03-04/app/core/toast.service.ts" region="example" title="app/shared/toast.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 03-06}Import line spacing

### {@a 03-06}导入语句中的空行

#### <a href="#03-06">Style 03-06</a>

#### <a href="#03-06">风格 03-06</a>


<div class="s-rule consider">



**Consider** leaving one empty line between third party imports and application imports.

**坚持**在第三方导入和应用导入之间留一个空行。


</div>



<div class="s-rule consider">



**Consider** listing import lines alphabetized by the module.

**考虑**按模块名字的字母顺排列导入行。


</div>



<div class="s-rule consider">



**Consider** listing destructured imported symbols alphabetically.

**考虑**在解构表达式中按字母顺序排列导入的东西。


</div>



<div class="s-why">



**Why?** The empty line separates _your_ stuff from _their_ stuff.

**为何？**空行可以让阅读和定位本地导入更加容易。


</div>



<div class="s-why-last">



**Why?** Alphabetizing makes it easier to read and locate symbols.

**为何？**按字母顺序排列可以让阅读和定位本地导入更加容易。


</div>



<code-example path="style-guide/src/03-06/app/heroes/shared/hero.service.avoid.ts" region="example" title="app/heroes/shared/hero.service.ts">

</code-example>



<code-example path="style-guide/src/03-06/app/heroes/shared/hero.service.ts" region="example" title="app/heroes/shared/hero.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Application structure and Angular modules

## 应用程序结构与 Angular 模块

Have a near-term view of implementation and a long-term vision. Start small but keep in mind where the app is heading down the road.

准备一个近期实施方案和一个长期的愿景。从零开始，但要考虑应用程序接下来的路往哪儿走。

All of the app's code goes in a folder named `src`.
All feature areas are in their own folder, with their own Angular module. 

所有应用程序的源代码都放到名叫`src`的目录里。
所有特性区都在自己的文件夹中，带有它们自己的 Angular 模块。

All content is one asset per file. Each component, service, and pipe is in its own file.
All third party vendor scripts are stored in another folder and not in the `src` folder. 
You didn't write them and you don't want them cluttering `src`. 
Use the naming conventions for files in this guide.

所有内容都遵循每个文件一个特性的原则。每个组件、服务和管道都在自己的文件里。
所有第三方程序包保存到其它目录里，而不是`src`目录。
你不会修改它们，所以不希望它们弄乱我们的应用程序。
使用本指南介绍的文件命名约定。
<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-01}_LIFT_

#### <a href="#04-01">Style 04-01</a>

#### <a href="#04-01">风格 04-01</a>


<div class="s-rule do">



**Do** structure the app such that you can **L**ocate code quickly, 
**I**dentify the code at a glance, 
keep the **F**lattest structure you can, and 
**T**ry to be DRY.

**坚持**组织应用的结构，达到这些目的：快速定位 (`L`ocate) 代码、一眼识别 (`I`dentify) 代码、 尽量保持扁平结构 (`F`lattest) 和尝试 (`T`ry) 遵循DRY (Do Not Repeat Yourself, 不重复自己) 原则。


</div>



<div class="s-rule do">



**Do** define the structure to follow these four basic guidelines, listed in order of importance.

**坚持**四项基本原则定义文件结构，上面的原则是按重要顺序排列的。


</div>



<div class="s-why-last">



**Why?** LIFT Provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly. 
To confirm your intuition about a particular structure, ask: 
_can I quickly open and start work in all of the related files for this feature_?

**为何？**LIFT提供了一致的结构，它具有扩展性强、模块化的特性。因为容易快速锁定代码，提高了开发者的效率。
另外，检查应用结构是否合理的方法是问问自己：我们能快速打开与此特性有关的所有文件并开始工作吗？


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-02}Locate

### {@a 04-02}定位

#### <a href="#04-02">Style 04-02</a>

#### <a href="#04-02"> 风格04-02</a>


<div class="s-rule do">



**Do** make locating code intuitive, simple and fast.

**坚持**直观、简单和快速地定位代码。


</div>



<div class="s-why-last">



**Why?** To work efficiently you must be able to find files quickly, 
especially when you do not know (or do not remember) the file _names_. 
Keeping related files near each other in an intuitive location saves time. 
A descriptive folder structure makes a world of difference to you and the people who come after you.

**为何？**
要想高效的工作，就必须能迅速找到文件，特别是当不知道（或不记得）文件*名*时。
把相关的文件一起放在一个直观的位置可以节省时间。
富有描述性的目录结构会让你和后面的维护者眼前一亮。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-03}Identify

### {@a 04-03}识别

#### <a href="#04-03">Style 04-03</a>

#### <a href="#04-03">风格 04-03</a>


<div class="s-rule do">



**Do** name the file such that you instantly know what it contains and represents.

**坚持**命名文件到这个程度：看到名字立刻知道它包含了什么，代表了什么。


</div>



<div class="s-rule do">



**Do** be descriptive with file names and keep the contents of the file to exactly one component.

**坚持**文件名要具有说明性，确保文件中只包含一个组件。


</div>



<div class="s-rule avoid">



**Avoid** files with multiple components, multiple services, or a mixture.

**避免**创建包含多个组件、服务或者混合体的文件。


</div>



<div class="s-why-last">



**Why?** Spend less time hunting and pecking for code, and become more efficient. 
Longer file names are far better than _short-but-obscure_ abbreviated names.

**为何？**花费更少的时间来查找和琢磨代码，就会变得更有效率。
较长的文件名远胜于*较短却容易混淆的*缩写名。


</div>



<div class="l-sub-section">



It may be advantageous to deviate from the _one-thing-per-file_ rule when 
you have a set of small, closely-related features that are better discovered and understood
in a single file than as multiple files. Be wary of this loophole.

当你有一组小型、紧密相关的特性时，违反*一物一文件*的规则可能会更好，
这种情况下单一文件可能会比多个文件更容易发现和理解。注意这个例外。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-04}Flat

### {@a 04-04}扁平

#### <a href="#04-04">Style 04-04</a>

#### <a href="#04-04">风格 04-04</a>


<div class="s-rule do">



**Do** keep a flat folder structure as long as possible.

**坚持**尽可能保持扁平的目录结构。


</div>



<div class="s-rule consider">



**Consider** creating sub-folders when a folder reaches seven or more files.

**考虑**当同一目录下达到 7 个或更多个文件时创建子目录。


</div>



<div class="s-rule consider">



**Consider** configuring the IDE to hide distracting, irrelevant files such as generated `.js` and `.js.map` files.

**考虑**配置 IDE，以隐藏无关的文件，例如生成出来的`.js`文件和`.js.map`文件等。


</div>



<div class="s-why-last">



**Why?** No one wants to search for a file through seven levels of folders. 
A flat structure is easy to scan.

**为何？**没人想要在超过七层的目录中查找文件。扁平的结构有利于搜索。

On the other hand,
<a href="https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two" target="_blank">psychologists believe</a>
that humans start to struggle when the number of adjacent interesting things exceeds nine.
So when a folder has ten or more files, it may be time to create subfolders. 

另一方面，<a href="https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two" target="_blank">心理学家们相信</a>，
当关注的事物超过 9 个时，人类就会开始感到吃力。
所以，当一个文件夹中的文件有 10 个或更多个文件时，可能就是创建子目录的时候了。

Base your decision on your comfort level.
Use a flatter structure until there is an obvious value to creating a new folder.

还是根据你自己的舒适度而定吧。
除非创建新文件夹能有显著的价值，否则尽量使用扁平结构。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-05}_T-DRY_ (Try to be _DRY_)

### {@a 04-05}T-DRY （尝试不重复自己）
#### <a href="#04-05">Style 04-05</a>

#### <a href="#04-05">风格 04-05</a>


<div class="s-rule do">



**Do** be DRY (Don't Repeat Yourself).

**坚持** DRY（Don't Repeat Yourself，不重复自己）。


</div>



<div class="s-rule avoid">



**Avoid** being so DRY that you sacrifice readability.

**避免**过度 DRY，以致牺牲了阅读性。


</div>



<div class="s-why-last">



**Why?** Being DRY is important, but not crucial if it sacrifices the other elements of LIFT.
That's why it's called _T-DRY_. 
For example, it's redundant to name a template `hero-view.component.html` because 
with the `.html` extension, it is obviously a view. 
But if something is not obvious or departs from a convention, then spell it out.

**为何？**虽然 DRY 很重要，但如果要以牺牲 LIFT 的其它原则为代价，那就不值得了。
这也就是为什么它被称为 *T-DRY*。
例如，把组件命名为`hero-view.component.html`是多余的，因为带有`.html`扩展名的文件显然就是一个视图 (view)。
但如果它不那么显著，或不符合常规，就把它写出来。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-06}Overall structural guidelines

### {@a 04-06}总体结构指导原则

#### <a href="#04-06">Style 04-06</a>

#### <a href="#04-06">风格 04-06</a>


<div class="s-rule do">



**Do** start small but keep in mind where the app is heading down the road.

**坚持**从零开始，但要考虑应用程序接下来的路往哪儿走。


</div>



<div class="s-rule do">



**Do** have a near term view of implementation and a long term vision.

**坚持**有一个近期实施方案和一个长期的愿景。


</div>



<div class="s-rule do">



**Do** put all of the app's code in a folder named `src`.

**坚持**把所有源代码都放到名为`src`的目录里。


</div>



<div class="s-rule consider">



**Consider** creating a folder for a component when it has multiple accompanying files (`.ts`, `.html`, `.css` and `.spec`).

**坚持**如果组件具有多个伴隨文件 (`.ts`、`.html`、`.css`和`.spec`)，就为它创建一个文件夹。


</div>



<div class="s-why">



**Why?** Helps keep the app structure small and easy to maintain in the early stages, while being easy to evolve as the app grows.

**为何？** 在早期阶段能够帮助保持应用的结构小巧且易于维护，这样当应用增长时就容易进化了。


</div>



<div class="s-why-last">



**Why?** Components often have four files (e.g. `*.html`, `*.css`, `*.ts`, and `*.spec.ts`) and can clutter a folder quickly.

**为何?** 组件通常有四个文件 (`*.html`、 `*.css`、 `*.ts` 和 `*.spec.ts`)，它们很容易把一个目录弄乱。


</div>



{@a file-tree}


Here is a compliant folder and file structure:

下面是符合规范的目录和文件结构


<div class='filetree'>

  <div class='file'>
    &lt;project root&gt;
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
          core
        </div>

        <div class='children'>

          <div class='file'>
            core.module.ts
          </div>

          <div class='file'>
            exception.service.ts|spec.ts
          </div>

          <div class='file'>
            user-profile.service.ts|spec.ts
          </div>

        </div>

        <div class='file'>
          heroes
        </div>

        <div class='children'>

          <div class='file'>
            hero
          </div>

          <div class='children'>

            <div class='file'>
              hero.component.ts|html|css|spec.ts
            </div>

          </div>

          <div class='file'>
            hero-list
          </div>

          <div class='children'>

            <div class='file'>
              hero-list.component.ts|html|css|spec.ts
            </div>

          </div>

          <div class='file'>
            shared
          </div>

          <div class='children'>

            <div class='file'>
              hero-button.component.ts|html|css|spec.ts
            </div>

            <div class='file'>
              hero.model.ts
            </div>

            <div class='file'>
              hero.service.ts|spec.ts
            </div>

          </div>

          <div class='file'>
            heroes.component.ts|html|css|spec.ts
          </div>

          <div class='file'>
            heroes.module.ts
          </div>

          <div class='file'>
            heroes-routing.module.ts
          </div>

        </div>

        <div class='file'>
          shared
        </div>

        <div class='children'>

          <div class='file'>
            shared.module.ts
          </div>

          <div class='file'>
            init-caps.pipe.ts|spec.ts
          </div>

          <div class='file'>
            text-filter.component.ts|spec.ts
          </div>

          <div class='file'>
            text-filter.service.ts|spec.ts
          </div>

        </div>

        <div class='file'>
          villains
        </div>

        <div class='children'>

          <div class='file'>
            villain
          </div>

          <div class='children'>

            <div class='file'>
              ...
            </div>

          </div>

          <div class='file'>
            villain-list
          </div>

          <div class='children'>

            <div class='file'>
              ...
            </div>

          </div>

          <div class='file'>
            shared
          </div>

          <div class='children'>

            <div class='file'>
              ...
            </div>

          </div>

          <div class='file'>
            villains.component.ts|html|css|spec.ts
          </div>

          <div class='file'>
            villains.module.ts
          </div>

          <div class='file'>
            villains-routing.module.ts
          </div>

        </div>

        <div class='file'>
          app.component.ts|html|css|spec.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

        <div class='file'>
          app-routing.module.ts
        </div>

      </div>

      <div class='file'>
        main.ts
      </div>

      <div class='file'>
        index.html
      </div>

      <div class='file'>
        ...
      </div>

    </div>

    <div class='file'>
      node_modules/...
    </div>

    <div class='file'>
      ...
    </div>

  </div>

</div>



<div class="l-sub-section">



While components in dedicated folders are widely preferred, 
another option for small apps is to keep components flat (not in a dedicated folder). 
This adds up to four files to the existing folder, but also reduces the folder nesting. 
Whatever you choose, be consistent.

把组件放在专用目录中的方式广受欢迎，对于小型应用，还可以保持组件扁平化（而不是放在专用目录中）。
这样会把四个文件放在现有目录中，也会减少目录的嵌套。无论你如何选择，请保持一致。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-07}_Folders-by-feature_ structure

### {@a 04-07}按特性组织的目录结构

#### <a href="#04-07">Style 04-07</a>

#### <a href="#04-07">风格 04-07</a>


<div class="s-rule do">



**Do** create folders named for the feature area they represent.

**坚持**根据特性区命名目录。


</div>



<div class="s-why">



**Why?** A developer can locate the code and identify what each file represents 
at a glance. The structure is as flat as it can be and there are no repetitive or redundant names.

**为何？**开发人员可以快速定位代码，扫一眼就能知道每个文件代表什么，目录尽可能保持扁平，既没有重复也没有多余的名字。


</div>



<div class="s-why">



**Why?** The LIFT guidelines are all covered.

**为何？** LIFT 原则中包含了所有这些。


</div>



<div class="s-why">



**Why?** Helps reduce the app from becoming cluttered through organizing the 
content and keeping them aligned with the LIFT guidelines.

**为何？**遵循 LIFT 原则精心组织内容，避免应用变得杂乱无章。


</div>



<div class="s-why">



**Why?** When there are a lot of files, for example 10+, 
locating them is easier with a consistent folder structure 
and more difficult in a flat structure.

**为何？**当有很多文件时（例如 10 个以上），在专用目录型结构中定位它们会比在扁平结构中更容易。


</div>



<div class="s-rule do">



**Do** create an Angular module for each feature area.

**坚持**为每个特性区创建一个 Angular 模块。


</div>



<div class="s-why">



**Why?** Angular modules make it easy to lazy load routable features.

**为何？** Angular 模块使惰性加载可路由的特性变得更容易。


</div>



<div class="s-why-last">



**Why?** Angular modules make it easier to isolate, test, and re-use features.

**为何？**Angular 模块隔离、测试和复用特性更容易。


</div>



<div class='file-tree-reference'>
  <a href="#file-tree">Refer to this _folder and file structure_ example.</a>  <a href="#file-tree">点这里查看目录和文件结构的范例</a>
</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-08}App _root module_

### {@a 04-08}应用的根模块

#### <a href="#04-08">Style 04-08</a>

#### <a href="#04-08">风格 04-08</a>


<div class="s-rule do">



**Do** create an Angular module in the app's root folder,
for example, in `/src/app`.

**坚持**在应用的根目录创建一个 Angular 模块（例如`/src/app`）。


</div>



<div class="s-why">



**Why?** Every app requires at least one root Angular module.

**为何？**每个应用都至少需要一个根 Angular 模块。


</div>



<div class="s-rule consider">



**Consider** naming the root module `app.module.ts`.

**考虑**把根模块命名为`app.module.ts`。


</div>



<div class="s-why-last">



**Why?** Makes it easier to locate and identify the root module.

**为何？**能让定位和识别根模块变得更容易。


</div>



<code-example path="style-guide/src/04-08/app/app.module.ts" region="example" title="app/app.module.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-09}Feature modules

### {@a 04-09}特性模块

#### <a href="#04-09">Style 04-09</a>

#### <a href="#04-09">风格 04-09</a>

<div class="s-rule do">



**Do** create an Angular module for all distinct features in an application; 
for example, a `Heroes` feature.

**坚持**为应用中每个明显的特性创建一个 Angular 模块。


</div>



<div class="s-rule do">



**Do** place the feature module in the same named folder as the feature area;
for example, in `app/heroes`.

**坚持**把特性模块放在与特性区同名的目录中（例如`app/heroes`）。


</div>



<div class="s-rule do">



**Do** name the feature module file reflecting the name of the feature area 
and folder; for example, `app/heroes/heroes.module.ts`.

**坚持**特性模块的文件名应该能反映出特性区的名字和目录（例如`app/heroes/heroes.module.ts`）。


</div>



<div class="s-rule do">



**Do** name the feature module symbol reflecting the name of the feature 
area, folder, and file; for example, `app/heroes/heroes.module.ts` defines `HeroesModule`.

**坚持**特性模块的符号名应该能反映出特性区、目录和文件名（例如在`app/heroes/heroes.module.ts`中定义`HeroesModule`）。


</div>



<div class="s-why">



**Why?** A feature module can expose or hide its implementation from other modules.

**为何？**特性模块可以对其它模块暴露或隐藏自己的实现。


</div>



<div class="s-why">



**Why?** A feature module identifies distinct sets of related components that comprise the feature area. 

**为何？**特性模块标记出组成该特性分区的相关组件集合。


</div>



<div class="s-why">



**Why?** A feature module can easily be routed to both eagerly and lazily. 

**为何？**方便路由到特性模块 —— 无论是用主动加载还是惰性加载的方式。


</div>



<div class="s-why">



**Why?** A feature module defines clear boundaries between specific functionality and other application features. 

**为何？**特性模块在特定的功能和其它应用特性之间定义了清晰的边界。


</div>



<div class="s-why">



**Why?** A feature module helps clarify and make it easier to assign development responsibilities to different teams.

**为何？**特性模块帮助澄清开发职责，以便于把这些职责指派给不同的项目组。


</div>



<div class="s-why-last">



**Why?** A feature module can easily be isolated for testing.

**为何？**特性模块易于隔离，以便测试。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-10}Shared feature module

### {@a 04-10}共享特性模块

#### <a href="#04-10">Style 04-10</a>

#### <a href="#04-10">风格 04-10</a>


<div class="s-rule do">



**Do** create a feature module named `SharedModule` in a `shared` folder; 
for example, `app/shared/shared.module.ts` defines `SharedModule`.

**坚持**在`shared`目录中创建名叫`SharedModule`的特性模块（例如在`app/shared/shared.module.ts`中定义`SharedModule`）。


</div>



<div class="s-rule do">



**Do** declare components, directives, and pipes in a shared module when those 
items will be re-used and referenced by the components declared in other feature modules.

**坚持**在共享模块中声明那些可能被特性模块引用的可复用组件、指令和管道。


</div>



<div class="s-rule consider">



**Consider** using the name SharedModule when the contents of a shared 
module are referenced across the entire application.

**考虑**把可能在整个应用中到处引用的模块命名为SharedModule


</div>



<div class="s-rule avoid">



**Avoid** providing services in shared modules. Services are usually 
singletons that are provided once for the entire application or 
in a particular feature module.

**避免** 在共享模块中提供服务。服务通常是单例的，应该在整个应用或一个特定的特性模块中只有一份。


</div>



<div class="s-rule do">



**Do** import all modules required by the assets in the `SharedModule`;
for example, `CommonModule` and `FormsModule`.

**坚持**在`SharedModule`中导入所有模块都需要的资产（例如`CommonModule`和`FormsModule`）。


</div>



<div class="s-why">



**Why?** `SharedModule` will contain components, directives and pipes 
that may need features from another common module; for example, 
`ngFor` in `CommonModule`.

**为何？** `SharedModule`中包含的组件、指令和管道可能需要来自其它公共模块的特性（例如来自`CommonModule`中的`ngFor`指令）。


</div>



<div class="s-rule do">



**Do** declare all components, directives, and pipes in the `SharedModule`.

**坚持**在`SharedModule`中声明所有组件、指令和管道。


</div>



<div class="s-rule do">



**Do** export all symbols from the `SharedModule` that other feature modules need to use.  

**坚持**从`SharedModule`中导出其它特性模块所需的全部符号。


</div>



<div class="s-why">



**Why?** `SharedModule` exists to make commonly used components, directives and pipes available for use in the templates of components in many other modules.

**为何？** `SharedModule`的存在，能让常用的组件、指令和管道在很多其它模块的组件模板中都自动可用。


</div>



<div class="s-rule avoid">



**Avoid** specifying app-wide singleton providers in a `SharedModule`. Intentional singletons are OK. Take care.

**避免**在`SharedModule`中指定应用级的单例服务提供商。如果是刻意要得到多个服务单例也行，不过还是要小心。


</div>



<div class="s-why">



**Why?** A lazy loaded feature module that imports that shared module will make its own copy of the service and likely have undesireable results.

**为何？**惰性加载的特性模块如果导入了这个共享模块，会创建一份自己的服务副本，这可能会导致意料之外的后果。


</div>



<div class="s-why-last">



**Why?** You don't want each module to have its own separate instance of singleton services. 
Yet there is a real danger of that happening if the `SharedModule` provides a service.

**为何？**对于单例服务，你不希望每个模块都有自己的实例。
而如果`SharedModule`提供了一个服务，那就有可能发生这种情况。


</div>



<div class='filetree'>

  <div class='file'>
    src
  </div>

  <div class='children'>

    <div class='file'>
      app
    </div>

    <div class='children'>

      <div class='file'>
        shared
      </div>

      <div class='children'>

        <div class='file'>
          shared.module.ts
        </div>

        <div class='file'>
          init-caps.pipe.ts|spec.ts
        </div>

        <div class='file'>
          text-filter.component.ts|spec.ts
        </div>

        <div class='file'>
          text-filter.service.ts|spec.ts
        </div>

      </div>

      <div class='file'>
        app.component.ts|html|css|spec.ts
      </div>

      <div class='file'>
        app.module.ts
      </div>

      <div class='file'>
        app-routing.module.ts
      </div>

    </div>

    <div class='file'>
      main.ts
    </div>

    <div class='file'>
      index.html
    </div>

  </div>

  <div class='file'>
    ...
  </div>

</div>



<code-tabs>

  <code-pane title="app/shared/shared.module.ts" path="style-guide/src/04-10/app/shared/shared.module.ts">

  </code-pane>

  <code-pane title="app/shared/init-caps.pipe.ts" path="style-guide/src/04-10/app/shared/init-caps.pipe.ts">

  </code-pane>

  <code-pane title="app/shared/filter-text/filter-text.component.ts" path="style-guide/src/04-10/app/shared/filter-text/filter-text.component.ts">

  </code-pane>

  <code-pane title="app/shared/filter-text/filter-text.service.ts" path="style-guide/src/04-10/app/shared/filter-text/filter-text.service.ts">

  </code-pane>

  <code-pane title="app/heroes/heroes.component.ts" path="style-guide/src/04-10/app/heroes/heroes.component.ts">

  </code-pane>

  <code-pane title="app/heroes/heroes.component.html" path="style-guide/src/04-10/app/heroes/heroes.component.html">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-11}Core feature module

### {@a 04-11}核心特性模块

#### <a href="#04-11">Style 04-11</a>

#### <a href="#04-11">风格04-11</a>


<div class="s-rule consider">



**Consider** collecting numerous, auxiliary, single-use classes inside a core module
to simplify the apparent structure of a feature module.

**考虑**把那些数量庞大、辅助性的、只用一次的类收集到核心模块中，让特性模块的结构更清晰简明。


</div>



<div class="s-rule consider">



**Consider** calling the application-wide core module, `CoreModule`.
Importing `CoreModule` into the root `AppModule` reduces its complexity 
and emphasizes its role as orchestrator of the application as a whole.

**坚持**把那些“只用一次”的类收集到`CoreModule`中，并对外隐藏它们的实现细节。简化的`AppModule`会导入`CoreModule`，并且把它作为整个应用的总指挥。


</div>



<div class="s-rule do">



**Do** create a feature module named `CoreModule` in a `core` folder (e.g. `app/core/core.module.ts` defines `CoreModule`).

**坚持**在`core`目录下创建一个名叫`CoreModule`的特性模块（例如在`app/core/core.module.ts`中定义`CoreModule`）。


</div>



<div class="s-rule do">



**Do** put a singleton service whose instance will be shared throughout the application in the `CoreModule` (e.g. `ExceptionService` and `LoggerService`).

**坚持**把要共享给整个应用的单例服务放进`CoreModule`中（例如`ExceptionService`和`LoggerService`）。


</div>



<div class="s-rule do">



**Do** import all modules required by the assets in the `CoreModule` (e.g. `CommonModule` and `FormsModule`).

**坚持**导入`CoreModule`中的资产所需要的全部模块（例如`CommonModule`和`FormsModule`）。


</div>



<div class="s-why">



**Why?** `CoreModule` provides one or more singleton services. Angular registers the providers with the app root injector, making a singleton instance of each service available to any component that needs them, whether that component is eagerly or lazily loaded.

**为何？** `CoreModule`提供了一个或多个单例服务。Angular使用应用的根注入器注册这些服务提供商，让每个服务的这个单例对象对所有需要它们的组件都是可用的，而不用管该组件是通过主动加载还是惰性加载的方式加载的。


</div>



<div class="s-why">



**Why?** `CoreModule` will contain singleton services. When a lazy loaded module imports these, it will get a new instance and not the intended app-wide singleton.

**为何？**`CoreModule`将包含一些单例服务。而如果是由惰性加载模块来导入这些服务，它就会得到一个新实例，而不是所期望的全应用级单例。


</div>



<div class="s-rule do">



**Do** gather application-wide, single use components in the `CoreModule`.
Import it once (in the `AppModule`) when the app starts and never import it anywhere else. (e.g. `NavComponent` and `SpinnerComponent`).

**坚持**把应用级、只用一次的组件收集到`CoreModule`中。
只在应用启动时从`AppModule`中导入它一次，以后再也不要导入它（例如`NavComponent`和`SpinnerComponent`）。


</div>



<div class="s-why">



**Why?** Real world apps can have several single-use components (e.g., spinners, message toasts, and modal dialogs) that appear only in the `AppComponent` template. 
They are not imported elsewhere so they're not shared in that sense. 
Yet they're too big and messy to leave loose in the root folder.

**为何？**真实世界中的应用会有很多只用一次的组件（例如加载动画、消息浮层、模态框等），它们只会在`AppComponent`的模板中出现。
不会在其它地方导入它们，所以没有共享的价值。
然而它们又太大了，放在根目录中就会显得乱七八糟的。


</div>



<div class="s-rule avoid">



**Avoid** importing the `CoreModule` anywhere except in the `AppModule`.

**避免**在`AppModule`之外的任何地方导入`CoreModule`。


</div>



<div class="s-why">



**Why?** A lazily loaded feature module that directly imports the `CoreModule` will make its own copy of services and likely have undesireable results.

**为何？**如果惰性加载的特性模块直接导入`CoreModule`，就会创建它自己的服务副本，并导致意料之外的后果。


</div>



<div class="s-why">



**Why?** An eagerly loaded feature module already has access to the `AppModule`'s injector, and thus the `CoreModule`'s services. 

**为何？**主动加载的特性模块已经准备好了访问`AppModule`的注入器，因此也能取得`CoreModule`中的服务。


</div>



<div class="s-rule do">



**Do** export all symbols from the `CoreModule` that the `AppModule` will import and make available for other feature modules to use.  

**坚持**从`CoreModule`中导出`AppModule`需导入的所有符号，使它们在所有特性模块中可用。


</div>



<div class="s-why">



**Why?** `CoreModule` exists to make commonly used singleton services available for use in the many other modules.

**为何？**`CoreModule`的存在就让常用的单例服务在所有其它模块中可用。


</div>



<div class="s-why-last">



**Why?** You want the entire app to use the one, singleton instance.
You don't want each module to have its own separate instance of singleton services. 
Yet there is a real danger of that happening accidentally if the `CoreModule` provides a service.

**为何？**你希望整个应用都使用这个单例服务。
你不希望每个模块都有这个单例服务的单独的实例。
然而，如果`CoreModule`中提供了一个服务，就可能偶尔导致这种后果。


</div>



<div class='filetree'>

  <div class='file'>
    src
  </div>

  <div class='children'>

    <div class='file'>
      app
    </div>

    <div class='children'>

      <div class='file'>
        core
      </div>

      <div class='children'>

        <div class='file'>
          core.module.ts
        </div>

        <div class='file'>
          logger.service.ts|spec.ts
        </div>

        <div class='file'>
          nav
        </div>

        <div class='children'>

          <div class='file'>
            nav.component.ts|html|css|spec.ts
          </div>

        </div>

        <div class='file'>
          spinner
        </div>

        <div class='children'>

          <div class='file'>
            spinner.component.ts|html|css|spec.ts
          </div>

          <div class='file'>
            spinner.service.ts|spec.ts
          </div>

        </div>

      </div>

      <div class='file'>
        app.component.ts|html|css|spec.ts
      </div>

      <div class='file'>
        app.module.ts
      </div>

      <div class='file'>
        app-routing.module.ts
      </div>

    </div>

    <div class='file'>
      main.ts
    </div>

    <div class='file'>
      index.html
    </div>

  </div>

  <div class='file'>
    ...
  </div>

</div>



<code-tabs>

  <code-pane title="app/app.module.ts" path="style-guide/src/04-11/app/app.module.ts" region="example">

  </code-pane>

  <code-pane title="app/core/core.module.ts" path="style-guide/src/04-11/app/core/core.module.ts">

  </code-pane>

  <code-pane title="app/core/logger.service.ts" path="style-guide/src/04-11/app/core/logger.service.ts">

  </code-pane>

  <code-pane title="app/core/nav/nav.component.ts" path="style-guide/src/04-11/app/core/nav/nav.component.ts">

  </code-pane>

  <code-pane title="app/core/nav/nav.component.html" path="style-guide/src/04-11/app/core/nav/nav.component.html">

  </code-pane>

  <code-pane title="app/core/spinner/spinner.component.ts" path="style-guide/src/04-11/app/core/spinner/spinner.component.ts">

  </code-pane>

  <code-pane title="app/core/spinner/spinner.component.html" path="style-guide/src/04-11/app/core/spinner/spinner.component.html">

  </code-pane>

  <code-pane title="app/core/spinner/spinner.service.ts" path="style-guide/src/04-11/app/core/spinner/spinner.service.ts">

  </code-pane>

</code-tabs>



<div class="l-sub-section">



`AppModule` is a little smaller because many app/root classes have moved to other modules. 
`AppModule` is stable because you will add future components and providers to other modules, not this one. 
`AppModule` delegates to imported modules rather than doing work. 
`AppModule` is focused on its main task, orchestrating the app as a whole.

`AppModule`变得更小了，因为很多应用根部的类都被移到了其它模块中。
`AppModule`变得稳定了，因为你将会往其它模块中添加特性组件和服务提供商，而不是这个`AppModule`。
`AppModule`把工作委托给了导入的模块，而不是亲力亲为。
`AppModule`聚焦在它自己的主要任务上：作为整个应用的总指挥。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-12}Prevent re-import of the core module

### {@a 04-12}防止多次导入`CoreModule`

#### <a href="#04-12">Style 04-12</a>

#### <a href="#04-12">风格 04-12</a>  

Only the root `AppModule` should import the `CoreModule`. 

应该只有`AppModule`才允许导入`CoreModule`。


<div class="s-rule do">



**Do** guard against reimporting of `CoreModule` and fail fast by adding guard logic.

**坚持**防范多次导入`CoreModule`，并通过添加守卫逻辑来尽快失败。


</div>



<div class="s-why">



**Why?** Guards against reimporting of the `CoreModule`.

**为何？**守卫可以阻止对`CoreModule`的多次导入。


</div>



<div class="s-why-last">



**Why?** Guards against creating multiple instances of assets intended to be singletons.

**为何？**守卫会禁止创建单例服务的多个实例。


</div>



<code-tabs>

  <code-pane title="app/core/module-import-guard.ts" path="style-guide/src/04-12/app/core/module-import-guard.ts">

  </code-pane>

  <code-pane title="app/core/core.module.ts" path="style-guide/src/04-12/app/core/core.module.ts">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-13}Lazy Loaded folders

### {@a 04-13}惰性加载的目录

#### <a href="#04-13">Style 04-13</a>

#### <a href="#04-13">样式 04-13</a>

A distinct application feature or workflow may be *lazy loaded* or *loaded on demand* rather than when the application starts.

某些边界清晰的应用特性或工作流可以做成*惰性加载*或*按需加载*的，而不用总是随着应用启动。


<div class="s-rule do">



**Do** put the contents of lazy loaded features in a *lazy loaded folder*.
A typical *lazy loaded folder* contains a *routing component*, its child components, and their related assets and modules.

**坚持**把惰性加载特性下的内容放进*惰性加载目录*中。
典型的*惰性加载目录*包含*路由组件*及其子组件以及与它们有关的那些资产和模块。


</div>



<div class="s-why-last">



**Why?** The folder makes it easy to identify and isolate the feature content.

**为何？**这种目录让标识和隔离这些特性内容变得更轻松。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 04-14}Never directly import lazy loaded folders

### {@a 04-14}永远不要直接导入惰性加载的目录

#### <a href="#04-14">Style 04-14</a>

#### <a href="#04-14">样式 04-14</a>


<div class="s-rule avoid">



**Avoid** allowing modules in sibling and parent folders to directly import a module in a *lazy loaded feature*.

**避免**让兄弟模块和父模块直接导入*惰性加载特性*中的模块。


</div>



<div class="s-why-last">



**Why?** Directly importing and using a module will load it immediately when the intention is to load it on demand.

**为何？**直接导入并使用此模块会立即加载它，而原本的设计意图是按需加载它。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Components

## 组件

### {@a 05-02}Component selector nams

### {@a 05-02}组件选择器命名

#### <a href="#05-02">Style 05-02</a>

#### <a href="#05-02">风格05-02</a>


<div class="s-rule do">



**Do** use _dashed-case_ or _kebab-case_ for naming the element selectors of components.

**坚持**使用*中线 (dashed) 命名法*或*烤串 (kebab) 命名法*来命名组件中的元素选择器。


</div>



<div class="s-why-last">



**Why?** Keeps the element names consistent with the specification for [Custom Elements](https://www.w3.org/TR/custom-elements/).

**为何？**保持元素命名与[自定义元素](https://www.w3.org/TR/custom-elements/)命名规范一致。


</div>



<code-example path="style-guide/src/05-02/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" title="app/heroes/shared/hero-button/hero-button.component.ts">

</code-example>



<code-tabs>

  <code-pane title="app/heroes/shared/hero-button/hero-button.component.ts" path="style-guide/src/05-02/app/heroes/shared/hero-button/hero-button.component.ts" region="example">

  </code-pane>

  <code-pane title="app/app.component.html" path="style-guide/src/05-02/app/app.component.html">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-03}Components as elements

### {@a 05-03}把组件当做元素

#### <a href="#05-03">Style 05-03</a>

#### <a href="#05-03">风格 05-03</a>


<div class="s-rule do">



**Do** give components an _element_ selector, as opposed to _attribute_ or _class_ selectors.

**坚持**给组件一个*元素*选择器，而不是*属性*或*类*选择器。


</div>



<div class="s-why">



**Why?** components have templates containing HTML and optional Angular template syntax.
They display content. 
Developers place components on the page as they would native HTML elements and web components.

**为何？**组件有很多包含 HTML 以及可选 Angular 模板语法的模板。
它们显示内容。开发人员会把组件像原生HTML元素和WebComponents一样放进页面中。


</div>



<div class="s-why-last">



**Why?** It is easier to recognize that a symbol is a component by looking at the template's html.

**为何？**查看组件模板的 HTML 时，更容易识别一个符号是组件还是指令。


</div>



<code-example path="style-guide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" title="app/heroes/hero-button/hero-button.component.ts">

</code-example>



<code-example path="style-guide/src/05-03/app/app.component.avoid.html" title="app/app.component.html">

</code-example>



<code-tabs>

  <code-pane title="app/heroes/shared/hero-button/hero-button.component.ts" path="style-guide/src/05-03/app/heroes/shared/hero-button/hero-button.component.ts" region="example">

  </code-pane>

  <code-pane title="app/app.component.html" path="style-guide/src/05-03/app/app.component.html">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-04}Extract templates and styles to their own files

### {@a 05-04}把模板和样式提取到它们自己的文件

#### <a href="#05-04">Style 05-04</a>

#### <a href="#05-04">风格 05-04</a>


<div class="s-rule do">



**Do** extract templates and styles into a separate file, when more than 3 lines.

**坚持**当超过 3 行时，把模板和样式提取到一个单独的文件。


</div>



<div class="s-rule do">



**Do** name the template file `[component-name].component.html`, where [component-name] is the component name.

**坚持**把模板文件命名为`[component-name].component.html`，其中，[component-name] 是组件名。


</div>



<div class="s-rule do">



**Do** name the style file `[component-name].component.css`, where [component-name] is the component name.

**坚持**把样式文件命名为`[component-name].component.css`，其中，[component-name] 是组件名。


</div>



<div class="s-rule do">



**Do** specify _component-relative_ URLs, prefixed with `./`.

**坚持**指定*相对于模块的* URL ，给它加上`./`前缀。


</div>



<div class="s-why">



**Why?** Large, inline templates and styles obscure the component's purpose and implementation, reducing readability and maintainability.

**为何？**巨大的、内联的模板和样式表会遮盖组件的意图和实现方式，削弱可读性和可维护性。


</div>



<div class="s-why">



**Why?** In most editors, syntax hints and code snippets aren't available when developing inline templates and styles.
The Angular TypeScript Language Service (forthcoming) promises to overcome this deficiency for HTML templates
in those editors that support it; it won't help with CSS styles.

**为何？**在多数编辑器中，编写内联的模板和样式表时都无法使用语法提示和代码片段功能。
Angular的TypeScript语言服务（即将到来）可以帮助那些编辑器在编写HTML模板时克服这一缺陷，但对CSS样式没有帮助。


</div>



<div class="s-why">



**Why?** A _component relative_ URL requires no change when you move the component files, as long as the files stay together.

**为何？**当你移动组件文件时，相对于组件的URL不需要修改，因为这些文件始终会在一起。


</div>



<div class="s-why-last">



**Why?** The `./` prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix.

**为何？**`./`前缀是相对URL的标准语法，不必依赖Angular的特殊处理，如果没有前缀则不行。


<code-example path="style-guide/src/05-04/app/heroes/heroes.component.avoid.ts" region="example" title="app/heroes/heroes.component.ts">

</code-example>



</div>



<code-tabs>

  <code-pane title="app/heroes/heroes.component.ts" path="style-guide/src/05-04/app/heroes/heroes.component.ts" region="example">

  </code-pane>

  <code-pane title="app/heroes/heroes.component.html" path="style-guide/src/05-04/app/heroes/heroes.component.html">

  </code-pane>

  <code-pane title="app/heroes/heroes.component.css" path="style-guide/src/05-04/app/heroes/heroes.component.css">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-12}Decorate _input_ and _output_ properties

### {@a 05-12}内联输入和输出属性装饰器

#### <a href="#05-12">Style 05-12</a>

#### <a href="#05-12">风格 05-12</a>


<div class="s-rule do">



**Do** use the `@Input()` and `@Output()` class decorators instead of the `inputs` and `outputs` properties of the 
`@Directive` and `@Component` metadata:

**坚持** 使用`@Input()`和`@Output()`，而非`@Directive`和`@Component`装饰器的`inputs`和`outputs`属性:


</div>



<div class="s-rule consider">



**Consider** placing `@Input()` or `@Output()` on the same line as the property it decorates.

**坚持**把`@Input()`或者`@Output()`放到所装饰的属性的同一行。


</div>



<div class="s-why">



**Why?** It is easier and more readable to identify which properties in a class are inputs or outputs.

**为何？**易于在类里面识别哪些属性是输入属性或输出属性。


</div>



<div class="s-why">



**Why?** If you ever need to rename the property or event name associated with 
`@Input` or `@Output`, you can modify it in a single place.

**为何？** 如果需要重命名与`@Input`或者`@Output`关联的属性或事件名，你可以在一个位置修改。


</div>



<div class="s-why">



**Why?** The metadata declaration attached to the directive is shorter and thus more readable.

**为何？**依附到指令的元数据声明会比较简短，更易于阅读。


</div>



<div class="s-why-last">



**Why?** Placing the decorator on the same line _usually_ makes for shorter code and still easily identifies the property as an input or output.
Put it on the line above when doing so is clearly more readable.

**为何？**把装饰器放到同一行可以精简代码，同时更易于识别输入或输出属性。


</div>



<code-example path="style-guide/src/05-12/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" title="app/heroes/shared/hero-button/hero-button.component.ts">

</code-example>



<code-example path="style-guide/src/05-12/app/heroes/shared/hero-button/hero-button.component.ts" region="example" title="app/heroes/shared/hero-button/hero-button.component.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-13}Avoid aliasing _inputs_ and _outputs_

### {@a 05-13}避免为输入和输出属性指定别名

#### <a href="#05-13">Style 05-13</a>

#### <a href="#05-13">风格 05-13</a>


<div class="s-rule avoid">



**Avoid** _input_ and _output_ aliases except when it serves an important purpose.

**避免**除非有重要目的，否则不要为输入和输出指定别名。


</div>



<div class="s-why">



**Why?** Two names for the same property (one private, one public) is inherently confusing.

**为何？**同一个属性有两个名字（一个对内一个对外）很容易导致混淆。


</div>



<div class="s-why-last">



**Why?** You should use an alias when the directive name is also an _input_ property, 
and the directive name doesn't describe the property.

**为何？**如果指令名也同时用作*输入*属性，而且指令名无法准确描述这个属性的用途时，应该使用别名。


</div>



<code-example path="style-guide/src/05-13/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" title="app/heroes/shared/hero-button/hero-button.component.ts">

</code-example>



<code-example path="style-guide/src/05-13/app/app.component.avoid.html" title="app/app.component.html">

</code-example>



<code-tabs>

  <code-pane title="app/heroes/shared/hero-button/hero-button.component.ts" path="style-guide/src/05-13/app/heroes/shared/hero-button/hero-button.component.ts" region="example">

  </code-pane>

  <code-pane title="app/heroes/shared/hero-button/hero-highlight.directive.ts" path="style-guide/src/05-13/app/heroes/shared/hero-highlight.directive.ts">

  </code-pane>

  <code-pane title="app/app.component.html" path="style-guide/src/05-13/app/app.component.html">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-14}Member sequence

### {@a 05-14}成员顺序

#### <a href="#05-14">Style 05-14</a>

#### <a href="#05-14">风格 05-14</a>


<div class="s-rule do">



**Do** place properties up top followed by methods.

**坚持**把属性成员放在前面，方法成员放在后面。


</div>



<div class="s-rule do">



**Do** place private members after public members, alphabetized.

**坚持**先放公共成员，再放私有成员，并按照字母顺序排列。


</div>



<div class="s-why-last">



**Why?** Placing members in a consistent sequence makes it easy to read and 
helps instantly identify which members of the component serve which purpose.

**为何？**把类的成员按照统一的顺序排列，易于阅读，能立即识别出组件的哪个成员服务于何种目的。


</div>



<code-example path="style-guide/src/05-14/app/shared/toast/toast.component.avoid.ts" region="example" title="app/shared/toast/toast.component.ts">

</code-example>



<code-example path="style-guide/src/05-14/app/shared/toast/toast.component.ts" region="example" title="app/shared/toast/toast.component.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-15}Delegate complex component logic to services

### {@a 05-15}把逻辑放到服务里

#### <a href="#05-15">Style 05-15</a>

#### <a href="#05-14">风格 05-15</a>


<div class="s-rule do">



**Do** limit logic in a component to only that required for the view. All other logic should be delegated to services.

**坚持**在组件中只包含与视图相关的逻辑。所有其它逻辑都应该放到服务中。


</div>



<div class="s-rule do">



**Do** move reusable logic to services and keep components simple and focused on their intended purpose.

**坚持**把可重用的逻辑放到服务中，保持组件简单，聚焦于它们预期目的。


</div>



<div class="s-why">



**Why?** Logic may be reused by multiple components when placed within a service and exposed via a function.

**为何？**当逻辑被放置到服务里，并以函数的形式暴露时，可以被多个组件重复使用。


</div>



<div class="s-why">



**Why?** Logic in a service can more easily be isolated in a unit test, while the calling logic in the component can be easily mocked.

**为何？**在单元测试时，服务里的逻辑更容易被隔离。当组件中调用逻辑时，也很容易被模拟。


</div>



<div class="s-why">



**Why?** Removes dependencies and hides implementation details from the component.

**为何？**从组件移除依赖并隐藏实施细节。


</div>



<div class="s-why-last">



**Why?** Keeps the component slim, trim, and focused.

**为何？**保持组件苗条、精简和聚焦。


</div>



<code-example path="style-guide/src/05-15/app/heroes/hero-list/hero-list.component.avoid.ts" title="app/heroes/hero-list/hero-list.component.ts">

</code-example>



<code-example path="style-guide/src/05-15/app/heroes/hero-list/hero-list.component.ts" region="example" title="app/heroes/hero-list/hero-list.component.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-16}Don't prefix _output_ properties

### {@a 05-16}不要给输出属性加前缀

#### <a href="#05-16">Style 05-16</a>

#### <a href="#05-16">风格 05-16</a>


<div class="s-rule do">



**Do** name events without the prefix `on`.

**坚持**命名事件时，不要带前缀`on`。


</div>



<div class="s-rule do">



**Do** name event handler methods with the prefix `on` followed by the event name.

**坚持**把事件处理器方法命名为`on`前缀之后紧跟着事件名。


</div>



<div class="s-why">



**Why?** This is consistent with built-in events such as button clicks.

**为何？**与内置事件命名一致，例如按钮点击。


</div>



<div class="s-why-last">



**Why?** Angular allows for an [alternative syntax](guide/template-syntax#binding-syntax) `on-*`. If the event itself was prefixed with `on` this would result in an `on-onEvent` binding expression.

**为何？**Angular 允许[另一种备选语法](guide/template-syntax#binding-syntax) `on-*`。如果事件的名字本身带有前缀`on`，那么绑定的表达式可能是`on-onEvent`。


</div>



<code-example path="style-guide/src/05-16/app/heroes/hero.component.avoid.ts" region="example" title="app/heroes/hero.component.ts">

</code-example>



<code-example path="style-guide/src/05-16/app/app.component.avoid.html" title="app/app.component.html">

</code-example>



<code-tabs>

  <code-pane title="app/heroes/hero.component.ts" path="style-guide/src/05-16/app/heroes/hero.component.ts" region="example">

  </code-pane>

  <code-pane title="app/app.component.html" path="style-guide/src/05-16/app/app.component.html">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 05-17}Put presentation logic in the component class

### {@a 05-17}把表现层逻辑放到组件类里

#### <a href="#05-17">Style 05-17</a>

#### <a href="#05-17">风格 05-17</a>


<div class="s-rule do">



**Do** put presentation logic in the component class, and not in the template.

**坚持**把表现层逻辑放进组件类中，而不要放在模板里。


</div>



<div class="s-why">



**Why?** Logic will be contained in one place (the component class) instead of being spread in two places.

**为何？**逻辑应该只出现在一个地方（组件类里）而不应分散在两个地方。


</div>



<div class="s-why-last">



**Why?** Keeping the component's presentation logic in the class instead of the template improves testability, maintainability, and reusability.

**为何？**将组件的表现层逻辑放到组件类而非模板里，可以增强测试性、维护性和重复使用性。


</div>



<code-example path="style-guide/src/05-17/app/heroes/hero-list/hero-list.component.avoid.ts" region="example" title="app/heroes/hero-list/hero-list.component.ts">

</code-example>



<code-example path="style-guide/src/05-17/app/heroes/hero-list/hero-list.component.ts" region="example" title="app/heroes/hero-list/hero-list.component.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Directives
## 指令



### {@a 06-01}Use directives to enhance an element

### {@a 06-01}使用指令来加强已有元素

#### <a href="#06-01">Style 06-01</a>

#### <a href="#06-01">风格 06-01</a>


<div class="s-rule do">



**Do** use attribute directives when you have presentation logic without a template.

**坚持**当你需要有表现层逻辑，但没有模板时，使用属性型指令。


</div>



<div class="s-why">



**Why?** Attribute directives don't have an associated template.

**为何？**属性型指令没有模板。


</div>



<div class="s-why-last">



**Why?** An element may have more than one attribute directive applied.

**为何？**一个元素可以使用多个属性型指令。


</div>



<code-example path="style-guide/src/06-01/app/shared/highlight.directive.ts" region="example" title="app/shared/highlight.directive.ts">

</code-example>



<code-example path="style-guide/src/06-01/app/app.component.html" title="app/app.component.html">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 06-03}_HostListener_/_HostBinding_ decorators versus _host_ metadata

### {@a 06-03}*HostListener* 和 *HostBinding* 装饰器 vs. 组件元数据 *host*

#### <a href="#06-03">Style 06-03</a>

#### <a href="#06-03">风格 06-03</a>


<div class="s-rule consider">



**Consider** preferring the `@HostListener` and `@HostBinding` to the 
`host` property of the `@Directive` and `@Component` decorators.

**考虑**优先使用`@HostListener`和`@HostBinding`，而不是`@Directive`和`@Component`装饰器的`host`属性。


</div>



<div class="s-rule do">



**Do** be consistent in your choice.

**坚持**让你的选择保持一致。


</div>



<div class="s-why-last">



**Why?** The property associated with `@HostBinding` or the method associated with `@HostListener` 
can be modified only in a single place&mdash;in the directive's class. 
If you use the `host` metadata property, you must modify both the property declaration inside the controller, 
and the metadata associated with the directive.

**为何？**对于关联到`@HostBinding`的属性或关联到`@HostListener`的方法，要修改时，只需在指令类中的一个地方修改。
如果使用元数据属性`host`，你就得在组件类中修改属性声明的同时修改相关的元数据。


</div>



<code-example path="style-guide/src/06-03/app/shared/validator.directive.ts" title="app/shared/validator.directive.ts">

</code-example>



Compare with the less preferred `host` metadata alternative.

与不推荐的方式（`host`元数据）比较一下。


<div class="s-why-last">



**Why?** The `host` metadata is only one term to remember and doesn't require extra ES imports.

**为何？**`host`元数据只是一个便于记忆的名字而已，并不需要额外的 ES 导入。


</div>



<code-example path="style-guide/src/06-03/app/shared/validator2.directive.ts" title="app/shared/validator2.directive.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Services

## 服务

### {@a 07-01}Services are singletons

### {@a 07-01}服务总是单例的

#### <a href="#07-01">Style 07-01</a>

#### <a href="#07-01">风格 07-01</a>


<div class="s-rule do">



**Do** use services as singletons within the same injector. Use them for sharing data and functionality.

**坚持**在同一个注入器内，把服务当做单例使用。用它们来共享数据和功能。


</div>



<div class="s-why">



**Why?** Services are ideal for sharing methods across a feature area or an app.

**为何？**服务是在特性范围或应用内共享方法的理想载体。


</div>



<div class="s-why-last">



**Why?** Services are ideal for sharing stateful in-memory data.

**为何？**服务是共享状态性内存数据的理想载体。


</div>



<code-example path="style-guide/src/07-01/app/heroes/shared/hero.service.ts" region="example" title="app/heroes/shared/hero.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 07-02}Single responsibility

### {@a 07-02}单一职责

#### <a href="#07-02">Style 07-02</a>

#### <a href="#07-02">风格 07-02</a>


<div class="s-rule do">



**Do** create services with a single responsibility that is encapsulated by its context.

**坚持**创建单一职责的服务，用职责封装在它的上下文中。


</div>



<div class="s-rule do">



**Do** create a new service once the service begins to exceed that singular purpose.

**坚持**当服务成长到超出单一用途时，创建一个新服务。


</div>



<div class="s-why">



**Why?** When a service has multiple responsibilities, it becomes difficult to test.

**为何？**当服务有多个职责时，它很难被测试。


</div>



<div class="s-why-last">



**Why?** When a service has multiple responsibilities, every component or service that injects it now carries the weight of them all.

**为何？**当某个服务有多个职责时，每个注入它的组件或服务都会承担这些职责的全部开销。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 07-03}Providing a service

### {@a 07-03}提供一个服务

#### <a href="#07-03">Style 07-03</a>

#### <a href="#07-03">风格 07-03</a>


<div class="s-rule do">



**Do** provide services to the Angular injector at the top-most component where they will be shared.

**坚持**将服务提供到共享范围内的顶级组件的 Angular 注入器。

</div>



<div class="s-why">



**Why?** The Angular injector is hierarchical.

**为何？** Angular 注入器是层次化的。


</div>



<div class="s-why">



**Why?** When providing the service to a top level component, that instance is shared and available to all child components of that top level component.

**为何？**在顶层组件提供服务时，该服务实例在所有子组件中可见并共享。


</div>



<div class="s-why">



**Why?** This is ideal when a service is sharing methods or state.

**为何？**服务是共享方法或状态的理想载体。


</div>



<div class="s-why-last">



**Why?** This is not ideal when two different components need different instances of a service. In this scenario it would be better to provide the service at the component level that needs the new and separate instance.

**为何？**当不同的两个组件需要一个服务的不同的实例时，上面的方法这就不理想了。在这种情况下，对于需要崭新和单独服务实例的组件，最好在组件级提供服务。


</div>



<code-tabs>

  <code-pane title="app/app.component.ts" path="style-guide/src/07-03/app/app.component.ts">

  </code-pane>

  <code-pane title="app/heroes/hero-list/hero-list.component.ts" path="style-guide/src/07-03/app/heroes/hero-list/hero-list.component.ts">

  </code-pane>

</code-tabs>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 07-04}Use the @Injectable() class decorator

### {@a 07-04}使用 @Injectable() 类装饰器

#### <a href="#07-04">Style 07-04</a>

#### <a href="#07-04">风格 07-04</a>


<div class="s-rule do">



**Do** use the `@Injectable()` class decorator instead of the `@Inject` parameter decorator when using types as tokens for the dependencies of a service.

**坚持**当使用类型作为令牌来注入服务的依赖时，使用`@Injectable()`类装饰器，而非`@Inject()`参数装饰器。


</div>



<div class="s-why">



**Why?** The Angular Dependency Injection (DI) mechanism resolves a service's own 
dependencies based on the declared types of that service's constructor parameters.

**为何？** Angular 的 DI 机制会根据服务的构造函数参数的声明类型来解析服务的所有依赖。


</div>



<div class="s-why-last">



**Why?** When a service accepts only dependencies associated with type tokens, the `@Injectable()` syntax is much less verbose compared to using `@Inject()` on each individual constructor parameter.

**为何？**当服务只接受类型令牌相关的依赖时，比起在每个构造函数参数上使用`@Inject()`，`@Injectable()`的语法简洁多了。


</div>



<code-example path="style-guide/src/07-04/app/heroes/shared/hero-arena.service.avoid.ts" region="example" title="app/heroes/shared/hero-arena.service.ts">

</code-example>



<code-example path="style-guide/src/07-04/app/heroes/shared/hero-arena.service.ts" region="example" title="app/heroes/shared/hero-arena.service.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Data Services

## 数据服务

### {@a 08-01}Talk to the server through a service

### {@a 08-01}通过服务与Web服务器交互

#### <a href="#08-01">Style 08-01</a>

#### <a href="#08-01">风格 08-01</a>


<div class="s-rule do">



**Do** refactor logic for making data operations and interacting with data to a service.

**坚持**把数据操作和与数据交互的逻辑重构到服务里。


</div>



<div class="s-rule do">



**Do** make data services responsible for XHR calls, local storage, stashing in memory, or any other data operations.

**坚持**让数据服务来负责 XHR 调用、本地储存、内存储存或者其它数据操作。


</div>



<div class="s-why">



**Why?** The component's responsibility is for the presentation and gathering of information for the view. It should not care how it gets the data, just that it knows who to ask for it. Separating the data services moves the logic on how to get it to the data service, and lets the component be simpler and more focused on the view.

**为何？**组件的职责是为视图展示或收集信息。它不应该关心如何获取数据，它只需要知道向谁请求数据。把如何获取数据的逻辑移动到数据服务里，简化了组件，让其聚焦于视图。


</div>



<div class="s-why">



**Why?** This makes it easier to test (mock or real) the data calls when testing a component that uses a data service.

**为何？**在测试使用数据服务的组件时，可以让数据调用更容易被测试（模拟或者真实）。


</div>



<div class="s-why-last">



**Why?** The details of data management, such as headers, HTTP methods, 
caching, error handling, and retry logic, are irrelevant to components 
and other data consumers.

**为何？**数据管理的详情，比如头信息、方法、缓存、错误处理和重试逻辑，不是组件和其它的数据消费者应该关心的事情。

A data service encapsulates these details. It's easier to evolve these 
details inside the service without affecting its consumers. And it's 
easier to test the consumers with mock service implementations.

数据服务应该封装这些细节。这样，在服务内部修改细节，就不会影响到它的消费者。并且更容易通过实现一个模拟服务来对消费者进行测试。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Lifecycle hooks

## 生命周期钩子

Use Lifecycle hooks to tap into important events exposed by Angular.

使用生命周期钩子来介入到 Angular 暴露的重要事件里。
<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a 09-01}Implement lifecycle hook interfaces

### {@a 09-01}实现生命周期钩子接口

#### <a href="#09-01">Style 09-01</a>

#### <a href="#09-01">风格 09-01</a>


<div class="s-rule do">



**Do** implement the lifecycle hook interfaces.

**坚持**实现生命周期钩子接口。


</div>



<div class="s-why-last">



**Why?** Lifecycle interfaces prescribe typed method 
signatures. use those signatures to flag spelling and syntax mistakes.

**为何？**如果使用强类型的方法签名，编译器和编辑器可以帮你揪出拼写错误。


</div>



<code-example path="style-guide/src/09-01/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" title="app/heroes/shared/hero-button/hero-button.component.ts">

</code-example>



<code-example path="style-guide/src/09-01/app/heroes/shared/hero-button/hero-button.component.ts" region="example" title="app/heroes/shared/hero-button/hero-button.component.ts">

</code-example>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


## Appendix

## 附录

Useful tools and tips for Angular.

有用的 Angular 工具和小提示
<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a A-01}Codelyzer

#### <a href="#A-01">Style A-01</a>

#### <a href="#A-01">风格 A-01</a>


<div class="s-rule do">



**Do** use [codelyzer](https://www.npmjs.com/package/codelyzer) to follow this guide.

**坚持**使用 [codelyzer](https://www.npmjs.com/package/codelyzer) 来实施本指南。


</div>



<div class="s-rule consider">



**Consider** adjusting the rules in codelyzer to suit your needs.

**考虑**调整 codelyzer 的规则来满足你的需求。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>


### {@a A-02}File templates and snippets

### {@a A-02}文档模板和代码片段

#### <a href="#A-02">Style A-02</a>

#### <a href="#A-02">风格 A-02</a>


<div class="s-rule do">



**Do** use file templates or snippets to help follow consistent styles and patterns. Here are templates and/or snippets for some of the web development editors and IDEs.

**坚持**使用文件模板或代码片段来帮助实现一致的风格和模式。下面是为一些网络开发编辑器和 IDE 准备的模板和/或代码片段：


</div>



<div class="s-rule consider">



**Consider** using [snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) for [Visual Studio Code](https://code.visualstudio.com/) that follow these styles and guidelines.

**考虑**使用 [Visual Studio Code](https://code.visualstudio.com/)的[代码片段](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) 来实施本风格指南。

<a href="https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2">
  <img src="https://github.com/johnpapa/vscode-angular2-snippets/raw/master/images/use-extension.gif" width="80%" alt="Use Extension">
</a>

</div>



<div class="s-rule consider">



**Consider** using [snippets](https://atom.io/packages/angular-2-typescript-snippets) for [Atom](https://atom.io/) that follow these styles and guidelines.

**考虑**使用 [Atom](https://atom.io/) 的[代码片断](https://atom.io/packages/angular-2-typescript-snippets)来实施本风格指南。

**Consider** using [snippets](https://github.com/orizens/sublime-angular2-snippets) for [Sublime Text](http://www.sublimetext.com/) that follow these styles and guidelines.

**考虑**使用 [Sublime Text](http://www.sublimetext.com/)的[代码片断](https://github.com/orizens/sublime-angular2-snippets) 来实施本风格指南。

**Consider** using [snippets](https://github.com/mhartington/vim-angular2-snippets) for [Vim](http://www.vim.org/) that follow these styles and guidelines.

**考虑**使用 [Vim](http://www.vim.org/) 的[代码片断](https://github.com/mhartington/vim-angular2-snippets)来实施本风格指南。


</div>

<a href="#toc" class='to-top'>Back to top</a><a href="#toc" class='to-top'>回到顶部</a>