# Create a feature component

# 主从组件

At the moment, the `HeroesComponent` displays both the list of heroes and the selected hero's details.

此刻，`HeroesComponent` 同时显示了英雄列表和所选英雄的详情。

Keeping all features in one component as the application grows will not be maintainable.
You'll want to split up large components into smaller sub-components, each focused on a specific task or workflow.

把所有特性都放在同一个组件中，将会使应用“长大”后变得不可维护。
你要把大型组件拆分成小一点的子组件，每个子组件都要集中精力处理某个特定的任务或工作流。

In this page, you'll take the first step in that direction by moving the hero details into a separate, reusable `HeroDetailComponent`.

本页面中，你将迈出第一步 —— 把英雄详情移入一个独立的、可复用的 `HeroDetailComponent`。

The `HeroesComponent` will only present the list of heroes.
The `HeroDetailComponent` will present details of a selected hero.

`HeroesComponent` 将仅仅用来表示英雄列表。
`HeroDetailComponent` 将用来表示所选英雄的详情。

<div class="alert is-helpful">

  For the sample app that this page describes, see the <live-example></live-example>.

  要查看本页所讲的范例程序，参见<live-example></live-example>。

</div>

## Make the `HeroDetailComponent`

## 制作 `HeroDetailComponent`

Use the Angular CLI to generate a new component named `hero-detail`.

使用 Angular CLI 生成一个名叫 `hero-detail` 的新组件。

<code-example language="sh" class="code-shell">
  ng generate component hero-detail
</code-example>

The command scaffolds the following:

这个命令会做这些事：

* Creates a directory `src/app/hero-detail`.

  创建目录 `src/app/hero-detail`。

Inside that directory four files are generated:

在这个目录中会生成四个文件：

* A CSS file for the component styles.

  作为组件样式的 CSS 文件。

* An HTML file for the component template.

  作为组件模板的 HTML 文件。

* A TypeScript file with a component class named `HeroDetailComponent`.

  存放组件类 `HeroDetailComponent` 的 TypeScript 文件。

* A test file for the `HeroDetailComponent` class.

  `HeroDetailComponent` 类的测试文件。

The command also adds the `HeroDetailComponent` as a declaration in the `@NgModule` decorator of the `src/app/app.module.ts` file.

该命令还会把 `HeroDetailComponent` 添加到 `src/app/app.module.ts` 文件中 `@NgModule` 的 `declarations` 列表中。

### Write the template

### 编写模板

Cut the HTML for the hero detail from the bottom of the `HeroesComponent` template and paste it over the generated boilerplate in the `HeroDetailComponent` template.

从 `HeroesComponent` 模板的底部把表示英雄详情的 HTML 代码剪切粘贴到所生成的 `HeroDetailComponent` 模板中。

The pasted HTML refers to a `selectedHero`.
The new `HeroDetailComponent` can present _any_ hero, not just a selected hero.
So replace "selectedHero" with "hero" everywhere in the template.

所粘贴的 HTML 引用了 `selectedHero`。
新的 `HeroDetailComponent` 可以展示*任意*英雄，而不仅仅所选的。因此还要把模板中的所有 `selectedHero` 替换为 `hero`。

When you're done, the `HeroDetailComponent` template should look like this:

完工之后，`HeroDetailComponent` 的模板应该是这样的：

<code-example path="toh-pt3/src/app/hero-detail/hero-detail.component.html" header="src/app/hero-detail/hero-detail.component.html"></code-example>

### Add the `@Input()` hero property

### 添加 `@Input() hero` 属性

The `HeroDetailComponent` template binds to the component's `hero` property
which is of type `Hero`.

`HeroDetailComponent` 模板中绑定了组件中的 `hero` 属性，它的类型是 `Hero`。

Open the `HeroDetailComponent` class file and import the `Hero` symbol.

打开 `HeroDetailComponent` 类文件，并导入 `Hero` 符号。

<code-example path="toh-pt3/src/app/hero-detail/hero-detail.component.ts"
region="import-hero" header="src/app/hero-detail/hero-detail.component.ts (import Hero)">
</code-example>

The `hero` property
[must be an _Input_ property](guide/template-syntax#inputs-outputs "Input and Output properties"),
annotated with the `@Input()` decorator,
because the _external_ `HeroesComponent` [will bind to it](#heroes-component-template) like this.

`hero` 属性[必须是一个带有 `@Input()` 装饰器的输入属性](guide/template-syntax#inputs-outputs "Input and Output properties")，因为*外部的* `HeroesComponent` 组件[将会绑定到它](#heroes-component-template)。就像这样：

<code-example path="toh-pt3/src/app/heroes/heroes.component.html" region="hero-detail-binding">
</code-example>

Amend the `@angular/core` import statement to include the `Input` symbol.

修改 `@angular/core` 的导入语句，导入 `Input` 符号。

<code-example path="toh-pt3/src/app/hero-detail/hero-detail.component.ts" region="import-input" header="src/app/hero-detail/hero-detail.component.ts (import Input)"></code-example>

Add a `hero` property, preceded by the `@Input()` decorator.

添加一个带有 `@Input()` 装饰器的 `hero` 属性。

<code-example path="toh-pt3/src/app/hero-detail/hero-detail.component.ts" header="src/app/hero-detail/hero-detail.component.ts" region="input-hero"></code-example>

That's the only change you should make to the `HeroDetailComponent` class.
There are no more properties. There's no presentation logic.
This component simply receives a hero object through its `hero` property and displays it.

这就是你要对 `HeroDetailComponent` 类做的唯一一项修改。
没有其它属性，也没有展示逻辑。这个组件所做的只是通过 `hero` 属性接收一个英雄对象，并显示它。

## Show the `HeroDetailComponent`

## 显示 `HeroDetailComponent`

The `HeroesComponent` is still a master/detail view.

`HeroesComponent` 仍然是主从视图。

It used to display the hero details on its own, before you cut that portion of the template. Now it will delegate to the `HeroDetailComponent`.

在你从模板中剪切走代码之前，它自己负责显示英雄的详情。现在它要把这个职责委托给 `HeroDetailComponent` 了。

The two components will have a parent/child relationship.
The parent `HeroesComponent` will control the child `HeroDetailComponent`
by sending it a new hero to display whenever
the user selects a hero from the list.

这两个组件将会具有父子关系。
当用户从列表中选择了某个英雄时，父组件 `HeroesComponent` 将通过把要显示的新英雄发送给子组件 `HeroDetailComponent`，来控制子组件。

You won't change the `HeroesComponent` _class_ but you will change its _template_.

你不用修改 `HeroesComponent` *类*，但是要修改它的*模板*。

{@a heroes-component-template}

### Update the `HeroesComponent` template

### 修改 `HeroesComponent` 的模板

The `HeroDetailComponent` selector is `'app-hero-detail'`.
Add an `<app-hero-detail>` element near the bottom of the `HeroesComponent` template, where the hero detail view used to be.

`HeroDetailComponent` 的选择器是 `'app-hero-detail'`。
把 `<app-hero-detail>` 添加到 `HeroesComponent` 模板的底部，以便把英雄详情的视图显示到那里。

Bind the `HeroesComponent.selectedHero` to the element's `hero` property like this.

把 `HeroesComponent.selectedHero` 绑定到该元素的 `hero` 属性，就像这样：

<code-example path="toh-pt3/src/app/heroes/heroes.component.html" region="hero-detail-binding" header="heroes.component.html (HeroDetail binding)">

</code-example>

`[hero]="selectedHero"` is an Angular [property binding](guide/template-syntax#property-binding).

`[hero]="selectedHero"` 是 Angular 的[属性绑定](guide/template-syntax#property-binding)语法。

It's a _one way_ data binding from
the `selectedHero` property of the `HeroesComponent` to the `hero` property of the target element, which maps to the `hero` property of the `HeroDetailComponent`.

这是一种*单向*数据绑定。从 `HeroesComponent` 的 `selectedHero` 属性绑定到目标元素的 `hero` 属性，并映射到了 `HeroDetailComponent` 的 `hero` 属性。

Now when the user clicks a hero in the list, the `selectedHero` changes.
When the `selectedHero` changes, the _property binding_ updates `hero`
and the `HeroDetailComponent` displays the new hero.

现在，当用户在列表中点击某个英雄时，`selectedHero` 就改变了。
当 `selectedHero` 改变时，*属性绑定*会修改 `HeroDetailComponent` 的 `hero` 属性，`HeroDetailComponent` 就会显示这个新的英雄。

The revised `HeroesComponent` template should look like this:

修改后的 `HeroesComponent` 的模板是这样的：

<code-example path="toh-pt3/src/app/heroes/heroes.component.html"
  header="heroes.component.html"></code-example>

The browser refreshes and the app starts working again as it did before.

浏览器刷新，应用又像以前一样开始工作了。

## What changed?

## 有哪些变化？

As [before](tutorial/toh-pt2), whenever a user clicks on a hero name,
the hero detail appears below the hero list.
Now the `HeroDetailComponent` is presenting those details instead of the `HeroesComponent`.

像[以前](tutorial/toh-pt2)一样，一旦用户点击了一个英雄的名字，该英雄的详情就显示在了英雄列表下方。
现在，`HeroDetailComponent` 负责显示那些详情，而不再是 `HeroesComponent`。

Refactoring the original `HeroesComponent` into two components yields benefits, both now and in the future:

把原来的 `HeroesComponent` 重构成两个组件带来了一些优点，无论是现在还是未来：

1. You simplified the `HeroesComponent` by reducing its responsibilities.

   你通过缩减 `HeroesComponent` 的职责简化了该组件。

1. You can evolve the `HeroDetailComponent` into a rich hero editor
without touching the parent `HeroesComponent`.

   你可以把 `HeroDetailComponent` 改进成一个功能丰富的英雄编辑器，而不用改动父组件 `HeroesComponent`。

1. You can evolve the `HeroesComponent` without touching the hero detail view.

   你可以改进 `HeroesComponent`，而不用改动英雄详情视图。

1. You can re-use the `HeroDetailComponent` in the template of some future component.

   将来你可以在其它组件的模板中重复使用 `HeroDetailComponent`。

## Final code review

## 查看最终代码

Here are the code files discussed on this page.

本页讨论的代码文件如下。

<code-tabs>

  <code-pane header="src/app/hero-detail/hero-detail.component.ts" path="toh-pt3/src/app/hero-detail/hero-detail.component.ts">
  </code-pane>

  <code-pane header="src/app/hero-detail/hero-detail.component.html" path="toh-pt3/src/app/hero-detail/hero-detail.component.html">
  </code-pane>

  <code-pane header="src/app/heroes/heroes.component.html" path="toh-pt3/src/app/heroes/heroes.component.html">
  </code-pane>

  <code-pane header="src/app/app.module.ts" path="toh-pt3/src/app/app.module.ts">
  </code-pane>

</code-tabs>

## Summary

## 小结

* You created a separate, reusable `HeroDetailComponent`.

   你创建了一个独立的、可复用的 `HeroDetailComponent` 组件。

* You used a [property binding](guide/template-syntax#property-binding) to give the parent `HeroesComponent` control over the child `HeroDetailComponent`.

   你用[属性绑定](guide/template-syntax#property-binding)语法来让父组件 `HeroesComponent` 可以控制子组件 `HeroDetailComponent`。

* You used the [`@Input` decorator](guide/template-syntax#inputs-outputs)
to make the `hero` property available for binding
by the external `HeroesComponent`.

   你用 [`@Input` 装饰器](guide/template-syntax#inputs-outputs)来让 `hero` 属性可以在外部的 `HeroesComponent` 中绑定。
