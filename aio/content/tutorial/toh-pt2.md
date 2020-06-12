# Display a selection list

# 显示英雄列表

In this page, you'll expand the Tour of Heroes app to display a list of heroes, and
allow users to select a hero and display the hero's details.

本页中，你将扩展《英雄指南》应用，让它显示一个英雄列表，
并允许用户选择一个英雄，查看该英雄的详细信息。

## Create mock heroes

## 创建模拟（mock）的英雄数据

You'll need some heroes to display.

你需要一些英雄数据以供显示。

Eventually you'll get them from a remote data server.
For now, you'll create some _mock heroes_ and pretend they came from the server.

最终，你会从远端的数据服务器获取它。
不过目前，你要先创建一些*模拟的英雄数据*，并假装它们是从服务器上取到的。

Create a file called `mock-heroes.ts` in the `src/app/` folder.
Define a `HEROES` constant as an array of ten heroes and export it.
The file should look like this.

在 `src/app/` 文件夹中创建一个名叫 `mock-heroes.ts` 的文件。
定义一个包含十个英雄的常量数组 `HEROES`，并导出它。
该文件是这样的。

<code-example path="toh-pt2/src/app/mock-heroes.ts" header="src/app/mock-heroes.ts"></code-example>

## Displaying heroes

## 显示这些英雄

Open the `HeroesComponent` class file and import the mock `HEROES`.

打开 `HeroesComponent` 类文件，并导入模拟的 `HEROES`。

<code-example path="toh-pt2/src/app/heroes/heroes.component.ts" region="import-heroes" header="src/app/heroes/heroes.component.ts (import HEROES)">
</code-example>

In the same file (`HeroesComponent` class), define a component property called `heroes` to expose the `HEROES` array for binding.

往类中添加一个 `heroes` 属性，这样可以暴露出这个 `HEROES` 数组，以供绑定。

<code-example path="toh-pt2/src/app/heroes/heroes.component.ts" header="src/app/heroes/heroes.component.ts" region="component">
</code-example>

### List heroes with `*ngFor`

### 使用 `*ngFor` 列出这些英雄

Open the `HeroesComponent` template file and make the following changes:

打开 `HeroesComponent` 的模板文件，并做如下修改：

* Add an `<h2>` at the top, 

   在顶部添加 `<h2>`，

* Below it add an HTML unordered list (`<ul>`)

   然后添加表示无序列表的 HTML 元素（`<ul>`）

* Insert an `<li>` within the `<ul>` that displays properties of a `hero`.

   在 `<ul>` 中插入一个 `<li>` 元素，以显示单个 `hero` 的属性。

* Sprinkle some CSS classes for styling (you'll add the CSS styles shortly).

   点缀上一些 CSS 类（稍后你还会添加更多 CSS 样式）。

Make it look like this:

做完之后应该是这样的：

<code-example path="toh-pt2/src/app/heroes/heroes.component.1.html" region="list" header="heroes.component.html (heroes template)"></code-example>

That shows one hero. To list them all, add an `*ngFor` to the `<li>` to iterate through the list of heroes:

这只展示了一个英雄。要想把他们都列出来，就要为 `<li>` 添加一个 `*ngFor` 以便迭代出列表中的所有英雄：

<code-example path="toh-pt2/src/app/heroes/heroes.component.1.html" region="li">
</code-example>

The [`*ngFor`](guide/template-syntax#ngFor) is Angular's _repeater_ directive.
It repeats the host element for each element in a list.

[`*ngFor`](guide/template-syntax#ngFor) 是一个 Angular 的复写器（repeater）指令。
它会为列表中的每项数据复写它的宿主元素。

The syntax in this example is as follows:

这个例子中涉及的语法如下：

* `<li>` is the host element.

   `<li>` 就是 `*ngFor` 的宿主元素。

* `heroes` holds the mock heroes list from the `HeroesComponent` class, the mock heroes list.

   `heroes` 就是来自 `HeroesComponent` 类的列表。

* `hero` holds the current hero object for each iteration through the list.

   当依次遍历这个列表时，`hero` 会为每个迭代保存当前的英雄对象。

<div class="alert is-important">

Don't forget the asterisk (*) in front of `ngFor`. It's a critical part of the syntax.

不要忘了 `ngFor` 前面的星号（`*`），它是该语法中的关键部分。

</div>

After the browser refreshes, the list of heroes appears.

浏览器刷新之后，英雄列表出现了。

{@a styles}

### Style the heroes

### 给英雄列表“美容”

The heroes list should be attractive and should respond visually when users
hover over and select a hero from the list.

英雄列表应该富有吸引力，并且当用户把鼠标移到某个英雄上和从列表中选中某个英雄时，应该给出视觉反馈。

In the [first tutorial](tutorial/toh-pt0#app-wide-styles), you set the basic styles for the entire application in `styles.css`.
That stylesheet didn't include styles for this list of heroes.

在[教程的第一章](tutorial/toh-pt0#app-wide-styles)，你曾在 `styles.css` 中为整个应用设置了一些基础的样式。
但那个样式表并不包含英雄列表所需的样式。

You could add more styles to `styles.css` and keep growing that stylesheet as you add components.

固然，你可以把更多样式加入到 `styles.css`，并且放任它随着你添加更多组件而不断膨胀。

You may prefer instead to define private styles for a specific component and keep everything a component needs&mdash; the code, the HTML,
and the CSS &mdash;together in one place.

但还有更好的方式。你可以定义属于特定组件的私有样式，并且让组件所需的一切（代码、HTML 和 CSS）都放在一起。

This approach makes it easier to re-use the component somewhere else
and deliver the component's intended appearance even if the global styles are different.

这种方式让你在其它地方复用该组件更加容易，并且即使全局样式和这里不一样，组件也仍然具有期望的外观。

You define private styles either inline in the `@Component.styles` array or
as stylesheet file(s) identified in the `@Component.styleUrls` array.

你可以用多种方式定义私有样式，或者内联在 `@Component.styles` 数组中，或者在 `@Component.styleUrls` 所指出的样式表文件中。

When the CLI generated the `HeroesComponent`, it created an empty `heroes.component.css` stylesheet for the `HeroesComponent`
and pointed to it in `@Component.styleUrls` like this.

当 CLI 生成 `HeroesComponent` 时，它也同时为 `HeroesComponent` 创建了空白的 `heroes.component.css` 样式表文件，并且让 `@Component.styleUrls` 指向它，就像这样：

<code-example path="toh-pt2/src/app/heroes/heroes.component.ts" region="metadata"
 header="src/app/heroes/heroes.component.ts (@Component)">
</code-example>

Open the `heroes.component.css` file and paste in the private CSS styles for the `HeroesComponent`.
You'll find them in the [final code review](#final-code-review) at the bottom of this guide.

打开 `heroes.component.css` 文件，并且把 `HeroesComponent` 的私有 CSS 样式粘贴进去。
你可以在本指南底部的[查看最终代码](#final-code-review)中找到它们。

<div class="alert is-important">

Styles and stylesheets identified in `@Component` metadata are scoped to that specific component.
The `heroes.component.css` styles apply only to the `HeroesComponent` and don't affect the outer HTML or the HTML in any other component.

`@Component` 元数据中指定的样式和样式表都是局限于该组件的。
`heroes.component.css` 中的样式只会作用于 `HeroesComponent`，既不会影响到组件外的 HTML，也不会影响到其它组件中的 HTML。

</div>

## Master/Detail

## 主从结构

When the user clicks a hero in the **master** list,
the component should display the selected hero's **details** at the bottom of the page.

当用户在**主**列表中点击一个英雄时，该组件应该在页面底部显示所选英雄的**详情**。

In this section, you'll listen for the hero item click event
and update the hero detail.

在本节，你将监听英雄条目的点击事件，并更新英雄的详情。

### Add a click event binding

### 添加 `click` 事件绑定

Add a click event binding to the `<li>` like this:

再往 `<li>` 元素上插入一句点击事件的绑定代码：

<code-example path="toh-pt2/src/app/heroes/heroes.component.1.html" region="selectedHero-click" header="heroes.component.html (template excerpt)"></code-example>

This is an example of Angular's [event binding](guide/template-syntax#event-binding) syntax.

这是 Angular [事件绑定](guide/template-syntax#event-binding) 语法的例子。

The parentheses around `click` tell Angular to listen for the `<li>` element's  `click` event.
When the user clicks in the `<li>`, Angular executes the `onSelect(hero)` expression.

`click` 外面的圆括号会让 Angular 监听这个 `<li>` 元素的 `click` 事件。
当用户点击 `<li>` 时，Angular 就会执行表达式 `onSelect(hero)`。

In the next section, define an `onSelect()` method in `HeroesComponent` to
display the hero that was defined in the `*ngFor` expression.

下一部分，会在 `HeroesComponent` 上定义一个 `onSelect()` 方法，用来显示 `*ngFor` 表达式所定义的那个英雄（`hero`）。

### Add the click event handler

### 添加 `click` 事件处理器

Rename the component's `hero` property to `selectedHero` but don't assign it.
There is no _selected hero_ when the application starts.

把该组件的 `hero` 属性改名为 `selectedHero`，但不要为它赋值。
因为应用刚刚启动时并没有*所选英雄*。

Add the following `onSelect()` method, which assigns the clicked hero from the template
to the component's `selectedHero`.

添加如下 `onSelect()` 方法，它会把模板中被点击的英雄赋值给组件的 `selectedHero` 属性。

<code-example path="toh-pt2/src/app/heroes/heroes.component.ts" region="on-select" header="src/app/heroes/heroes.component.ts (onSelect)"></code-example>

### Add a details section

### 添加详情区

Currently, you have a list in the component template. To click on a hero on the list
and reveal details about that hero, you need a section for the details to render in the
template. Add the following to `heroes.component.html` beneath the list section:

现在，组件的模板中有一个列表。要想点击列表中的一个英雄，并显示该英雄的详情，你需要在模板中留一个区域，用来显示这些详情。
在 `heroes.component.html` 中该列表的紧下方，添加如下代码：

<code-example path="toh-pt2/src/app/heroes/heroes.component.html" region="selectedHero-details" header="heroes.component.html (selected hero details)"></code-example>

After the browser refreshes, the application is broken.

刷新浏览器，应用挂了。

Open the browser developer tools and look in the console for an error message like this:

打开浏览器的开发者工具，它的控制台中显示出如下错误信息：

<code-example language="sh" class="code-shell">
  HeroesComponent.html:3 ERROR TypeError: Cannot read property 'name' of undefined
</code-example>

#### What happened?

#### 怎么回事？

When the app starts, the `selectedHero` is `undefined` _by design_.

当应用启动时，`selectedHero` 是 `undefined`，*设计如此*。

Binding expressions in the template that refer to properties of `selectedHero`&mdash;expressions like `{{selectedHero.name}}`&mdash;_must fail_ because there is no selected hero.

但模板中的绑定表达式引用了 `selectedHero` 的属性（表达式为 `{{selectedHero.name}}`），这必然会失败，因为你还没选过英雄呢。

#### The fix - hide empty details with _*ngIf_

#### 修复 —— 使用 _*ngIf_ 隐藏空白的详情

The component should only display the selected hero details if the `selectedHero` exists.

该组件应该只有当 `selectedHero` 存在时才显示所选英雄的详情。

Wrap the hero detail HTML in a `<div>`.
Add Angular's `*ngIf` directive to the `<div>` and set it to `selectedHero`.

把显示英雄详情的 HTML 包裹在一个 `<div>` 中。
并且为这个 div 添加 Angular 的 `*ngIf` 指令，把它的值设置为 `selectedHero`。

<div class="alert is-important">

Don't forget the asterisk (*) in front of `ngIf`. It's a critical part of the syntax.

不要忘了 `ngIf` 前面的星号（`*`），它是该语法中的关键部分。

</div>

<code-example path="toh-pt2/src/app/heroes/heroes.component.html" region="ng-if" header="src/app/heroes/heroes.component.html (*ngIf)"></code-example>

After the browser refreshes, the list of names reappears.
The details area is blank.
Click a hero in the list of heroes and its details appear.
The app seems to be working again.
The heroes appear in a list and details about the clicked hero appear at the bottom of the page.

浏览器刷新之后，英雄名字的列表又出现了。
详情部分仍然是空。
从英雄列表中点击一个英雄，它的详情就出现了。
应用又能工作了。
英雄们出现在列表中，而被点击的英雄出现在了页面底部。

#### Why it works

#### 为什么改好了？

When `selectedHero` is undefined, the `ngIf` removes the hero detail from the DOM. There are no `selectedHero` bindings to consider.

当 `selectedHero` 为 `undefined` 时，`ngIf` 从 DOM 中移除了英雄详情。因此也就不用关心 `selectedHero` 的绑定了。

When the user picks a hero, `selectedHero` has a value and
`ngIf` puts the hero detail into the DOM.

当用户选择一个英雄时，`selectedHero` 也就有了值，并且 `ngIf` 把英雄的详情放回到 DOM 中。

### Style the selected hero

### 给所选英雄添加样式

It's difficult to identify the _selected hero_ in the list when all `<li>` elements look alike.

所有的 `<li>` 元素看起来都是一样的，因此很难从列表中识别出*所选英雄*。

If the user clicks "Magneta", that hero should render with a distinctive but subtle background color like this:

如果用户点击了“Magneta”，这个英雄应该用一个略有不同的背景色显示出来，就像这样：

<div class="lightbox">
  <img src='generated/images/guide/toh/heroes-list-selected.png' alt="Selected hero">
</div>

That _selected hero_ coloring is the work of the `.selected` CSS class in the [styles you added earlier](#styles).
You just have to apply the `.selected` class to the `<li>` when the user clicks it.

*所选英雄*的颜色来自于[你前面添加的样式](#styles)中的 CSS 类 `.selected`。
所以你只要在用户点击一个 `<li>` 时把 `.selected` 类应用到该元素上就可以了。

The Angular [class binding](guide/template-syntax#class-binding) makes it easy to add and remove a CSS class conditionally.
Just add `[class.some-css-class]="some-condition"` to the element you want to style.

Angular 的 [CSS 类绑定](guide/template-syntax#class-binding)机制让根据条件添加或移除一个 CSS 类变得很容易。
只要把 `[class.some-css-class]="some-condition"` 添加到你要施加样式的元素上就可以了。

Add the following `[class.selected]` binding to the `<li>` in the `HeroesComponent` template:

在 `HeroesComponent` 模板中的 `<li>` 元素上添加 `[class.selected]` 绑定，代码如下：

<code-example path="toh-pt2/src/app/heroes/heroes.component.1.html" region="class-selected" header="heroes.component.html (toggle the 'selected' CSS class)"></code-example>

When the current row hero is the same as the `selectedHero`, Angular adds the `selected` CSS class. When the two heroes are different, Angular removes the class.

如果当前行的英雄和 `selectedHero` 相同，Angular 就会添加 CSS 类 `selected`，否则就会移除它。

The finished `<li>` looks like this:

最终的 `<li>` 是这样的：

<code-example path="toh-pt2/src/app/heroes/heroes.component.html" region="li" header="heroes.component.html (list item hero)"></code-example>

{@a final-code-review}

## Final code review

## 查看最终代码

Your app should look like this <live-example></live-example>.

你的应用现在变成了这样：<live-example></live-example>。

Here are the code files discussed on this page, including the `HeroesComponent` styles.

下面是本页面中所提及的代码文件，包括 `HeroesComponent` 的样式。

<code-tabs>

  <code-pane header="src/app/mock-heroes.ts" path="toh-pt2/src/app/mock-heroes.ts">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component.ts" path="toh-pt2/src/app/heroes/heroes.component.ts">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt2/src/app/heroes/heroes.component.html">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component.css" path="toh-pt2/src/app/heroes/heroes.component.css">
  </code-pane>

</code-tabs>

## Summary

## 小结

* The Tour of Heroes app displays a list of heroes in a Master/Detail view.

   英雄指南应用在一个主从视图中显示了英雄列表。

* The user can select a hero and see that hero's details.

   用户可以选择一个英雄，并查看该英雄的详情。

* You used `*ngFor` to display a list.

   你使用 `*ngFor` 显示了一个列表。

* You used `*ngIf` to conditionally include or exclude a block of HTML.

   你使用 `*ngIf` 来根据条件包含或排除了一段 HTML。

* You can toggle a CSS style class with a `class` binding.

   你可以用 `class` 绑定来切换 CSS 的样式类。
