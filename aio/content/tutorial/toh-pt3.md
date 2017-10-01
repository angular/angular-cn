@title
多个组件

@intro
把主从结构的页面重构成多个组件

@description


The `AppComponent` is doing _everything_ at the moment.
In the beginning, it showed details of a single hero.
Then it became a master/detail form with both a list of heroes and the hero detail.
Soon there will be new requirements and capabilities.
You can't keep piling features on top of features in one component; that's not maintainable.

此刻，`AppComponent`负责*所有事*。
起初，它只显示单个英雄的详情。然后，它变成了主从结构，同时显示英雄列表和一个英雄详情。
现在，我们很快又会有新需求了。
我们不能把这些需求全都放在一个组件中，否则将不可维护。

You'll need to break it up into sub-components, each focused on a specific task or workflow.
Eventually, the `AppComponent` could become a simple shell that hosts those sub-components.

我们要把它拆分成一些子组件，每个子组件只聚焦在一个特定的任务或工作流上。
最后，`AppComponent`将会变成一个简单的壳，用来作为那些子组件的宿主。

In this page, you'll take the first step in that direction by carving out the hero details into a separate, reusable component.
When you're done, the app should look like this <live-example></live-example>.

本章中，我们要做的第一步就是把英雄详情拆分到一个独立的、可复用的组件中。
做完这些，应用是这样的：<live-example></live-example>。



## Where you left off

## 延续上一步教程

Before getting started on this page, verify that you have the following structure from earlier in the Tour of Heroes.
If not, go back to the previous pages.

在继续《英雄指南》之前，先检查一下，是否已经有了如下目录结构。如果没有，回上一章，看看错过了哪里。


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



Keep the app transpiling and running while you build the Tour of Heroes
by entering the `npm start` command in a terminal window
[as you did before](tutorial/toh-pt1#keep-transpiling "Keep the app running").

[像以前一样](tutorial/toh-pt1#keep-transpiling "Keep the app running")，在终端窗口中输入`npm start`命令，以便在构建《英雄指南》时保持持续转译和运行。

## Make a hero detail component

## 制作英雄详情组件

Add a file named `hero-detail.component.ts` to the `app/` folder.
This file will hold the new `HeroDetailComponent`.

往`app/`文件夹下添加一个名叫`hero-detail.component.ts`的文件。这个文件中会存放这个新的`HeroDetailComponent`。

The file and component names follow the standard described in the Angular
[style guide](guide/styleguide#naming).

文件名和组件名遵循[风格指南](guide/styleguide#naming)中的标准方式。

* The component _class_ name should be written in _upper camel case_ and end in the word "Component".
The hero detail component class is `HeroDetailComponent`.

  组件的类名应该是*大驼峰形式*，并且以`Component`结尾。
  因此英雄详情组件的类名是`HeroDetailComponent`。

* The component _file_ name should be spelled in [_lower dash case_](guide/glossary#dash-case),
each word separated by dashes, and end in `.component.ts`.
The `HeroDetailComponent` class goes in the `hero-detail.component.ts` file.

  组件的文件名应该是[小写中线形式](guide/glossary#dash-case)，每个单词之间用中线分隔，并且以`.component.ts`结尾。
  因此`HeroDetailComponent`类应该放在`hero-detail.component.ts`文件中。

Start writing the `HeroDetailComponent` as follows:

`HeroDetailComponent`的代码如下：


<code-example path="toh-pt3/app/hero-detail.component.1.ts" region="v1" title="app/hero-detail.component.ts (initial version)" linenums="false">

</code-example>



{@a selector}


To define a component, you always import the `Component` symbol.

要定义一个组件，我们总是要先导入符号`Component`。

The `@Component` decorator provides the Angular metadata for the component.
The CSS selector name, `hero-detail`, will match the element tag
that identifies this component within a parent component's template.
[Near the end of this tutorial page](tutorial/toh-pt3#add-hero-detail "Add the HeroDetailComponent to the AppComponent"),
you'll add a `<hero-detail>` element to the `AppComponent` template.

`@Component`装饰器为组件提供了Angular元数据。
CSS选择器的名字`hero-detail`会匹配元素的标签名，用于在父组件的模板中标记出当前组件的位置。
[本章的最后](tutorial/toh-pt3#add-hero-detail "Add the HeroDetailComponent to the AppComponent")，我们会把`<hero-detail>`添加到`AppComponent`的模板中。

Always `export` the component class because you'll always `import` it elsewhere.

总是`export`这个组件类，因为你必然会在别处`import`它。


### Hero detail template

### 英雄详情的模板

To move the hero detail view to the `HeroDetailComponent`,
cut the hero detail _content_ from the bottom of the `AppComponent` template
and paste it into a new `template` property in the `@Component` metadata.

要把英雄详情的视图移入`HeroDetailComponent`，只要把英雄详情的 *内容* 从`AppComponent`模板的底部剪切出来，
粘贴到`@Component`元数据的`template`属性中就可以了。

The `HeroDetailComponent` has a _hero_, not a _selected hero_.
Replace the word, "selectedHero", with the word, "hero", everywhere in the template.
When you're done, the new template should look like this:

`HeroDetailComponent`有一个 `hero`属性，而不再是`selectedHero`。
所以我们也要在模板中把所有的`selectedHero`替换为`hero`。
这些完成之后，新的模板是这样的：


<code-example path="toh-pt3/src/app/hero-detail.component.ts" region="template" title="src/app/hero-detail.component.ts (template)" linenums="false">

</code-example>



### Add the *hero* property

### 添加`hero`属性

The `HeroDetailComponent` template binds to the component's `hero` property.
Add that property to the `HeroDetailComponent` class like this:

`HeroDetailComponent`模板绑定到了该组件的`hero`属性上。
把这个属性添加到`HeroDetailComponent`类上，就像这样：


<code-example path="toh-pt3/app/hero-detail.component.1.ts" region="hero" title="src/app/hero-detail.component.ts (hero property)">

</code-example>



The `hero` property is typed as an instance of `Hero`.
The `Hero` class is still in the `app.component.ts` file.
Now there are two components that need to reference the `Hero` class.
The Angular [style guide](guide/styleguide#rule-of-one "Style guide: rule of one") recommends one class per file anyway.

`hero`属性的类型是`Hero`。
`Hero`类仍然在`app.component.ts`文件中。
现在，有两个组件需要`Hero`类的引用。
而Angular[风格指南](guide/styleguide#rule-of-one "Style guide: rule of one")建议每个文件中只有一个类。

Move the `Hero` class from `app.component.ts` to its own `hero.ts` file.

因此我们要把`Hero`类从`app.component.ts`移到它自己的`hero.ts`文件中：


<code-example path="toh-pt3/src/app/hero.ts" title="src/app/hero.ts" linenums="false">

</code-example>



Now that the `Hero` class is in its own file, the `AppComponent` and the `HeroDetailComponent` have to import it.
Add the following `import` statement near the top of _both_ the `app.component.ts` and the `hero-detail.component.ts` files.

现在，`Hero`类有了自己的文件，`AppComponent` 和 `HeroDetailComponent` 就要`import`它了。
把下列`import`语句添加到`app.component.ts`和`hero-detail.component.ts`文件的顶部。


<code-example path="toh-pt3/app/hero-detail.component.1.ts" region="hero-import" title="src/app/hero-detail.component.ts">

</code-example>



### The *hero* property is an *input* property

### *hero*属性是一个***输入***属性

[Later in this page](tutorial/toh-pt3#add-hero-detail "Add the HeroDetailComponent to the AppComponent"),
the parent `AppComponent` will tell the child `HeroDetailComponent` which hero to display
by binding its `selectedHero` to the `hero` property of the `HeroDetailComponent`.
The binding will look like this:

[在本章稍后的部分](tutorial/toh-pt3#add-hero-detail "Add the HeroDetailComponent to the AppComponent")，
父组件`AppComponent`会告诉子组件`HeroDetailComponent`要显示哪个英雄，
告诉的方法是把它的`selectedHero`属性绑定到`HeroDetailComponent`的`hero`属性上。
这种绑定是这样的：


<code-example path="toh-pt3/app/app.component.1.html" region="hero-detail-binding" title="src/app/app.component.html" linenums="false">

</code-example>



Putting square brackets around the `hero` property, to the left of the equal sign (=),
makes it the *target* of a property binding expression.
You must declare a *target* binding property to be an *input* property.
Otherwise, Angular rejects the binding and throws an error.

在等号的左边，是方括号围绕的`hero`属性，这表示它是属性绑定表达式的*目标*。
我们要绑定到的*目标*属性必须是一个*输入*属性，否则Angular会拒绝绑定，并抛出一个错误。

First, amend the `@angular/core` import statement to include the `Input` symbol.

首先，修改`@angular/core`导入语句，使其包含符号`Input`。


<code-example path="toh-pt3/src/app/hero-detail.component.ts" region="import-input" title="src/app/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>



Then declare that `hero` is an *input* property by
preceding it with the `@Input` decorator that you imported earlier.

然后，通过在`hero`属性前面加上`@Input`装饰器，来表明它是一个输入属性。


<code-example path="toh-pt3/src/app/hero-detail.component.ts" region="hero" title="src/app/hero-detail.component.ts (excerpt)" linenums="false">

</code-example>



<div class="l-sub-section">



Read more about _input_ properties in the
[Attribute Directives](guide/attribute-directives#why-input) page.

要了解*输入属性*的更多知识，参见[属性型指令](guide/attribute-directives#why-input)页。


</div>



That's it. The `hero` property is the only thing in the `HeroDetailComponent` class.

现在，`hero`属性是`HeroDetailComponent`类中唯一的东西。


<code-example path="toh-pt3/src/app/hero-detail.component.ts" region="class" title="src/src/app/hero-detail.component.ts" linenums="false">

</code-example>



All it does is receive a hero object through its `hero` input property and then bind to that property with its template.

它所做的一切就是通过它的输入属性`hero`接收一个英雄对象，然后把这个属性绑定到自己的模板中。

Here's the complete `HeroDetailComponent`.

下面是完整的`HeroDetailComponent`：


<code-example path="toh-pt3/src/app/hero-detail.component.ts" title="src/app/hero-detail.component.ts">

</code-example>




## Declare _HeroDetailComponent_ in the _AppModule_

## 在`AppModule`中声明`HeroDetailComponent`

Every component must be declared in one&mdash;and only one&mdash;NgModule.

每个组件都必须在一个（且只有一个）Angular模块中声明。

Open `app.module.ts` in your editor and import the `HeroDetailComponent` so you can refer to it.

打开`app.module.ts`并且导入`HeroDetailComponent`，以便我们可以引用它。


<code-example path="toh-pt3/src/app/app.module.ts" region="hero-detail-import" title="src/app/app.module.ts">

</code-example>



Add `HeroDetailComponent` to the module's `declarations` array.

把`HeroDetailComponent`添加到该模块的`declarations`数组中。


<code-example path="toh-pt3/src/app/app.module.ts" region="declarations" title="src/app/app.module.ts" linenums="false">

</code-example>



In general, the `declarations` array contains a list of application components, pipes, and directives that belong to the module.
A component must be declared in a module before other components can reference it.
This module declares only the two application components, `AppComponent` and `HeroDetailComponent`.

通常，`declarations`数组包含应用中属于该模块的组件、管道和指令的列表。
组件在被其它组件引用之前必须先在一个模块中声明过。
这个模块只声明了两个组件：`AppComponent` 和 `HeroDetailComponent`。


<div class="l-sub-section">



Read more about NgModules in the [NgModules](guide/ngmodule "NgModules") guide.

要了解关于Angular模块的更多知识，参见[Angular模块](guide/ngmodule "Angular Modules (NgModule)")页。


</div>



{@a add-hero-detail}



## Add the _HeroDetailComponent_ to the _AppComponent_

## 把`HeroDetailComponent`添加到`AppComponent`中


The `AppComponent` is still a master/detail view.
It used to display the hero details on its own, before you cut out that portion of the template.
Now it will delegate to the `HeroDetailComponent`.

`AppComponent`仍然是主从视图。
在我们剪切模板之前，它自己显示英雄的详情。
现在，它委托给了`HeroDetailComponent`。

Recall that `hero-detail` is the CSS [`selector`](tutorial/toh-pt3#selector "HeroDetailComponent selector")
in the `HeroDetailComponent` metadata.
That's the tag name of the element that represents the `HeroDetailComponent`.

回想一下，`hero-detail`正是`HeroDetailComponent`元数据中使用的 CSS [`selector`](tutorial/toh-pt3#selector "HeroDetailComponent selector")
它是一个HTML元素的标签名，用于表示`HeroDetailComponent`。

Add a `<hero-detail>` element near the bottom of the `AppComponent` template,
where the hero detail view used to be.

把`<hero-detail>`元素添加到`AppComponent`模板的底部，那里就是英雄详情视图所在的位置。

Coordinate the master `AppComponent` with the `HeroDetailComponent`
by binding the `selectedHero` property of the `AppComponent`
to the `hero` property of the `HeroDetailComponent`.

协调主视图`AppComponent`与`HeroDetailComponent`的方式是把`AppComponent`的`selectedHero`属性绑定到`HeroDetailComponent`的`hero`属性上。


<code-example path="toh-pt3/app/app.component.1.html" region="hero-detail-binding" title="app.component.ts (excerpt)" linenums="false">

</code-example>



Now every time the `selectedHero` changes, the `HeroDetailComponent` gets a new hero to display.

每当`selectedHero`变化时，`HeroDetailComponent`就会显示一个新的英雄。

The revised `AppComponent` template should look like this:
 
修改后的`AppComponent`模板是这样的：


<code-example path="toh-pt3/src/app/app.component.ts" region="hero-detail-template" title="app.component.ts (excerpt)" linenums="false">

</code-example>




## What changed?

## 有哪些变化？

As [before](tutorial/toh-pt2), whenever a user clicks on a hero name,
the hero detail appears below the hero list.
But now the `HeroDetailView` is presenting those details.

仍然像[以前](tutorial/toh-pt2)一样，一旦用户点击了英雄的名字，英雄详情就会显示在英雄列表的下方。
不过现在改用`HeroDetailView`来表示英雄详情了。

Refactoring the original `AppComponent` into two components yields benefits, both now and in the future:

我们把原来的`AppComponent`重构成了两个组件具有一些显著优点，无论是现在还是未来：

1. You simplified the `AppComponent` by reducing its responsibilities.

  通过缩减`AppComponent`的职责，我们简化了它。

1. You can evolve the `HeroDetailComponent` into a rich hero editor
without touching the parent `AppComponent`.

  我们将来可以把`HeroDetailComponent`改进为功能更丰富的英雄编辑器，而不用动`AppComponent`。

1. You can evolve the `AppComponent` without touching the hero detail view.

  同样，我们也可以改进`AppComponent`而不用动英雄详情视图。

1. You can re-use the `HeroDetailComponent` in the template of some future parent component.

  我们可以在未来的其它父组件的模板中复用`HeroDetailComponent`。

### Review the app structure

### 审视本应用的代码结构

Verify that you have the following structure:

验证它是否已经有了如下结构：


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

        <div class='file'>
          hero.ts
        </div>

        <div class='file'>
          hero-detail.component.ts
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



Here are the code files discussed in this page.

下面是我们在本章讨论的代码文件：


<code-tabs>

  <code-pane title="src/app/hero-detail.component.ts" path="toh-pt3/src/app/hero-detail.component.ts">

  </code-pane>

  <code-pane title="src/app/app.component.ts" path="toh-pt3/src/app/app.component.ts">

  </code-pane>

  <code-pane title="src/app/hero.ts" path="toh-pt3/src/app/hero.ts">

  </code-pane>

  <code-pane title="src/app/app.module.ts" path="toh-pt3/src/app/app.module.ts">

  </code-pane>

</code-tabs>




## Summary

## 走过的路

Here's what you achieved in this page:

来盘点一下我们已经构建了什么。

* You created a reusable component.

  我们创建了一个可复用组件

* You learned how to make a component accept input.

  我们学会了如何让一个组件接收输入

* You learned to declare the required application directives in an NgModule. You
listed the directives in the `@NgModule` decorator's `declarations` array.

  我们学会了在 Angular 模块中声明该应用所需的指令。
只要把这些指令列在`NgModule`装饰器的`declarations`数组中就可以了。
* You learned to bind a parent component to a child component.

  我们学会了把父组件绑定到子组件。

Your app should look like this <live-example></live-example>.

现在，应用应该变成了这样：<live-example></live-example>。



## Next step

## 下一步

The Tour of Heroes app is more reusable with shared components,
but its (mock) data is still hard coded within the `AppComponent`.
That's not sustainable.
Data access should be refactored to a separate service
and shared among the components that need data.

通过抽取共享组件，我们的《英雄指南》变得更有复用性了，但在`AppComponent`中，我们仍然使用着硬编码的模拟数据。显然，这种方式不能“可持续发展”。
  我们要把数据访问逻辑重构到一个独立的服务中，并在需要数据的组件之间共享。
  
You’ll learn to create services in the [next tutorial](tutorial/toh-pt4 "Services") page.
  
在[下一步](tutorial/toh-pt4)，我们将学习如何创建服务。