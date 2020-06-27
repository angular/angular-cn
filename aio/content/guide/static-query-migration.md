# Static query migration guide
​
# 静态查询（Static Query）迁移指南
​
**Important note for library authors: This migration is especially crucial for library authors to facilitate their users upgrading to version 9 when it becomes available.**

**给库作者的重要提示：这份迁移指南对于库作者非常重要，可以方便他们的用户升级到（Angular 的）版本 9（大约在 2019 年 10 月发布）。**

In version 9, the default setting for `@ViewChild` and `@ContentChild` queries is changing in order to fix buggy and surprising behavior in queries (read more about that [here](#what-does-this-flag-mean)).

在版本 9 中，`@ViewChild` 和 `@ContentChild` 这两个查询的默认设置会改变，以修复查询中的 BUG 和意外行为（详情参阅[此处](#what-does-this-flag-mean)）。

In preparation for this change, in version 8, we are migrating all applications and libraries to explicitly specify the resolution strategy for `@ViewChild` and `@ContentChild` queries.

为了应对这个变化，我们从版本 8 开始就要开始迁移所有应用和库，显式指定 `@ViewChild` 和 `@ContentChild` 查询的解析策略。

Specifically, this migration adds an explicit "static" flag that dictates when that query's results should be assigned.
Adding this flag will ensure your code works the same way when upgrading to version 9.

具体来说，这次迁移会添加一个显式的 “static” 标志，用来指出应该何时对该查询的结果进行赋值。等升级到版本 9 的时候，这个标志可以确保这些代码的工作方式都是一样的。

Before:

之前：

```
// query results sometimes available in `ngOnInit`, sometimes in `ngAfterViewInit` (based on template)
@ViewChild('foo') foo: ElementRef;
```

After:

之后：

```
// query results available in ngOnInit
@ViewChild('foo', {static: true}) foo: ElementRef;

OR

// query results available in ngAfterViewInit
@ViewChild('foo', {static: false}) foo: ElementRef;
```

Starting with version 9, the `static` flag will default to false.
At that time, any `{static: false}` flags can be safely removed, and we will have a schematic that will update your code for you.

从版本 9 开始，`static` 标志将默认为 `false`。那时候，可以安全地删除所有 `{static: false}` 标志，而且我们还会提供一个能帮你更新代码的原理图（schematic）。

Note: this flag only applies to `@ViewChild` and `@ContentChild` queries specifically, as `@ViewChildren` and `@ContentChildren` queries do not have a concept of static and dynamic (they are always resolved as if they are "dynamic").

注意：这个标志只适用于 `@ViewChild` 和 `@ContentChild` 这两个查询，这是因为 `@ViewChildren` 和 `@ContentChildren` 查询都没有静态和动态的概念（它们总是“动态”解析）。

## FAQ

## 常见问题

{@a what-to-do-with-todo}
### What should I do if I see a `/* TODO: add static flag */` comment printed by the schematic?

### 当看到由原理图添加的 `/* TODO: add static flag */` 注释时，我该怎么办？

If you see this comment, it means that the schematic couldn't statically figure out the correct flag. In this case, you'll have to add the correct flag based on your application's behavior.
For more information on how to choose, see the [next question](#how-do-i-choose).

如果你看到这个注释，就意味着原理图无法自己找到恰当的标志。在这种情况下，你必须根据应用的行为添加正确的标志。要了解如何进行选择，请参阅[下一个问题](#how-do-i-choose)。

{@a how-do-i-choose}

### How do I choose which `static` flag value to use: `true` or `false`?

### 如何选择 `static` 标志：`true` 还是 `false`？

In the official API docs, we have always recommended retrieving query results in [`ngAfterViewInit` for view queries](api/core/ViewChild#description) and [`ngAfterContentInit` for content queries](api/core/ContentChild#description).
This is because by the time those lifecycle hooks run, change detection has completed for the relevant nodes and we can guarantee that we have collected all the possible query results.

在官方 API 文档中，我们建议对于[视图查询](api/core/ViewChild#description) 总是在 `ngAfterViewInit` 中获取查询结果，对于[内容查询](https://angular.io/api/core/ContentChild#description) 总是在 `ngAfterContentInit` 中获取查询结果。
这是因为当这些生命周期钩子运行时，相关节点的变更检测已完成，我们可以确信收集到了所有可能的查询结果。

Most applications will want to use `{static: false}` for the same reason. This setting will ensure query matches that are dependent on binding resolution (e.g. results inside `*ngIf`s or `*ngFor`s) will be found by the query.

由于这个原因，大多数应用都应该使用 `{static: false}`。这个设置可以确保找出那些依赖于绑定解析的查询结果（比如 `*ngIf` 或 `*ngFor` 内的查询）。

There are rarer cases where `{static: true}` flag might be necessary (see [answer here](#should-i-use-static-true)).

在某些很少见的情况下，必须使用 `{static: true}` 标志（参见[这里的回答](#should-i-use-static-true)）。

{@a should-i-use-static-true}
### Is there a case where I should use `{static: true}`?

### 什么情况下我应该用 `{static: true}`？

This option was introduced to support creating embedded views on the fly.
If you need access to a `TemplateRef` in a query to create a view dynamically, you won't be able to do so in `ngAfterViewInit`.
Change detection has already run on that view, so creating a new view with the template will cause an `ExpressionHasChangedAfterChecked` error to be thrown.
In this case, you will want to set the `static` flag to `true` and create your view in `ngOnInit`.
In most other cases, the best practice is to use `{static: false}`.

这个选项的引入是为了支持动态创建嵌入式视图。如果你要查询一个 `TemplateRef` 以便动态创建一个视图，将无法在 `ngAfterViewInit` 中这样做。这是因为变量检测已在该视图上运行过，所以这时候使用该模板创建一个新视图就会抛出 `ExpressionHasChangedAfterChecked` 错误。在这种情况下，你要把 `static` 标志设置为 `true`，并在 `ngOnInit` 中创建你的视图。在其它大多数情况下，最好的做法是使用 `{static: false}`。

However, to facilitate the migration to version 8, you may also want to set the `static` flag to `true` if your component code already depends on the query results being available some time **before** `ngAfterViewInit` (for view queries) or `ngAfterContentInit` (for content queries).
For example, if your component relies on the query results being populated in the `ngOnInit` hook or in `@Input` setters, you will need to either set the flag to `true` or re-work your component to adjust to later timing.

为了便于迁移到版本 8 中，如果你的组件代码期望这些查询的结果在 `ngAfterViewInit`（对于视图查询）或 `ngAfterContentInit`（对于内容查询）**之前**的某个时刻就已经可用，可能也要把 `static` 标志设置为 `true`。例如，如果你的组件期望在 `ngOnInit` 钩子或 `@Input` 的 setter 中这些查询结果已经就绪，就要把该标志设置为 `true` 或者改写你的组件以推迟它的执行时间。

Note: Selecting the static option means that query results nested in `*ngIf` or `*ngFor` will not be found by the query.
These results are only retrievable after change detection runs.

注意：把 `static` 设置为 `true` 意味着此查询将不会发现嵌在 `*ngIf` 或 `*ngFor` 中的查询结果。只有在运行过变更检测之后才能取得这些结果。

{@a what-does-this-flag-mean}
### What does this flag mean and why is it necessary?

### 这个标志是什么意思，它有什么必要？

The default behavior for queries has historically been undocumented and confusing, and has also commonly led to issues that are difficult to debug.
In version 9, we would like to make query behavior more consistent and simple to understand.

以前，默认的查询行为一直没有文档记载，这会令人困惑，而且也常导致难以调试的问题。在版本 9 中，我们希望这种查询行为更加一致，也更容易理解。

To explain why, first it's important to understand how queries have worked up until now.

为了解释其原由，首先要弄清楚到目前为止这些查询是如何工作的。

Without the `static` flag, the compiler decided when each query would be resolved on a case-by-case basis.
All `@ViewChild`/`@ContentChild` queries were categorized into one of two buckets at compile time: "static" or "dynamic".
This classification determined when query results would become available to users.

当没有 `static` 标志时，编译器会自行决定每个查询该如何解析。所有的 `@ViewChild` / `@ContentChild` 查询在编译时都会被归类为两种方式之一：“static” 或 “dynamic”。当查询结果可供用户使用时，就会决定该使用何种方式。

- **Static queries** were queries where the result could be determined statically because the result didn't depend on runtime values like bindings.
Results from queries classified as static were available before change detection ran for that view (accessible in `ngOnInit`).

  **静态查询**的查询结果是可以静态确定的，因为其结果并不依赖运行期间的值（比如数据绑定）。静态查询的结果在该视图运行变更检测之前就是可用的（可以在 `ngOnInit` 访问）。

- **Dynamic queries** were queries where the result could NOT be determined statically because the result depended on runtime values (aka bindings).
Results from queries classified as dynamic were not available until after change detection ran for that view (accessible in `ngAfterContentInit` for content queries or `ngAfterViewInit` for view queries).

  **动态查询**是那些无法静态确定结果的查询，因为其结果取决于运行期间的值（比如数据绑定）。动态查询的结果在运行该视图的变更检测之前是不可用的（只能在 `ngAfterContentInit` 中访问内容查询或在 `ngAfterViewInit` 中访问视图查询）。

For example, let's say we have a component, `Comp`. Inside it, we have this query:

例如，假设我们有一个组件 `Comp`。在其中，我们有这样一个查询：

```
@ViewChild(Foo) foo: Foo;
```

and this template:

和这样的模板：

```
<div foo></div>
```

This `Foo` query would be categorized as static because at compile-time it's known that the `Foo` instance on the `<div>` is the correct result for the query.
Because the query result is not dependent on runtime values, we don't have to wait for change detection to run on the template before resolving the query.
Consequently, results can be made available in `ngOnInit`.

这个 `Foo` 查询会被归类为静态查询，这是因为在编译时，就已经知道 `<div>` 上的 `Foo` 实例是正确的查询结果了。由于查询结果并不依赖于运行时的值，所以在解析此查询之前，我们不必等待模板上的变更检测。因此，在 `ngOnInit` 中这些结果就已经可用了。

Let's say the query is the same, but the component template looks like this:

假设查询不变，但组件模板改成了这样：

```
<div foo *ngIf="showing"></div>
```

With that template, the query would be categorized as a dynamic query.
We would need to know the runtime value of `showing` before determining what the correct results are for the query.
As a result, change detection must run first, and results can only be made available in `ngAfterViewInit` or a setter for the query property.

对于该模板，该查询将被归类为动态查询。我们需要知道 `showing` 在运行期间的值以确定该查询的正确结果应该是什么。因此，必须首先运行变更检测，其结果只能在 `ngAfterViewInit` 或该查询属性的 setter 中才能使用。

The effect of this implementation is that adding an `*ngIf` or `*ngFor` anywhere above a query match can change when that query's results become available.

这种实现方式的效果是，在查询匹配的任何父级节点添加 `*ngIf` 或 `*ngFor` 会导致：当查询结果可用之后，其匹配结果也会发生变化。

Keep in mind that these categories only applied to `@ViewChild` and `@ContentChild` queries specifically.
`@ViewChildren` and `@ContentChildren` queries did not have a concept of static and dynamic, so they were always resolved as if they were "dynamic".

请记住，这些类别只能用于 `@ViewChild` 和 `@ContentChild` 这两种查询。而 `@ViewChildren` 和 `@ContentChildren` 查询都没有静态和动态的概念，它们总是“动态”解析。

This strategy of resolving queries at different times based on the location of potential query matches has caused a lot of confusion. Namely:

这种策略会根据查询所在的位置，在不同的时机进行解析，这引起了很大的困惑。即：

* Sometimes query results are available in `ngOnInit`, but sometimes they aren't and it's not clear why (see [21800](https://github.com/angular/angular/issues/21800) or [19872](https://github.com/angular/angular/issues/19872)).

  其查询结果在 `ngOnInit` 中有时可用有时不可用，而且还不清楚为什么（参见 [21800](https://github.com/angular/angular/issues/21800) 或 [19872](https://github.com/angular/angular/issues/19872)）。

* `@ViewChild` queries are resolved at a different time from `@ViewChildren` queries, and `@ContentChild` queries are resolved at a different time from `@ContentChildren` queries.
If a user turns a `@ViewChild` query into a `@ViewChildren` query, their code can break suddenly because the timing has shifted.
 
  `@ViewChild` 查询和 `@ViewChildren` 查询的解析时机不一样，而 `@ContentChild` 查询和 `@ContentChildren` 查询的解析时机也不一样。如果用户把 `@ViewChild` 查询换成 `@ViewChildren` 查询，那么他们的代码就会突然崩溃，因为其解析时机已经变化了。

* Code depending on a query result can suddenly stop working as soon as an `*ngIf` or an `*ngFor` is added to a template.

  一旦往模板中添加了 `*ngIf` 或 `*ngFor`，依赖于查询结果的代码就会突然停止工作。

* A `@ContentChild` query for the same component will resolve at different times in the lifecycle for each usage of the component.
This leads to buggy behavior where using a component with `*ngIf` is broken in subtle ways that aren't obvious to the component author.

  当每次使用该组件时，针对同一个组件的 `@ContentChild` 查询却会在生命周期的不同时机进行解析。这导致了一些错误的行为，即：带 `*ngIf` 的组件会以一种对组件作者来说很隐晦的、微妙的方式被破坏。

In version 9, we plan to simplify the behavior so all queries resolve after change detection runs by default.
The location of query matches in the template cannot affect when the query result will become available and suddenly break your code, and the default behavior is always the same.
This makes the logic more consistent and predictable for users.

在版本 9 中，我们准备简化这种行为：默认情况下，每当运行变更检测之后，都会解析所有查询。
模板中查询的位置不会再影响查询结果何时可用，也不会突然破坏你的代码，其默认行为总是一样的。这样，这种逻辑对于用户来说就更加一致、更加可预测。

That said, if an application does need query results earlier (for example, the query result is needed to create an embedded view), it's possible to add the `{static: true}` flag to explicitly ask for static resolution.
With this flag, users can indicate that they only care about results that are statically available and the query results will be populated before `ngOnInit`.

也就是说，如果一个应用程序确实需要更早拿到查询结果（例如，在创建嵌入式视图时需要这种查询结果），就可以添加 `{static: true}` 标志来明确要求静态解析。有了这个标志，用户就可以表明他们只关心那些静态可用的结果，并且在 `ngOnInit` 之前就会填上查询结果。

{@a view-children-and-content-children}
### Does this change affect `@ViewChildren` or `@ContentChildren` queries?

### 这项变化是否会影响 `@ViewChildren` 或 `@ContentChildren` 查询？

No, this change only affects `@ViewChild` and `@ContentChild` queries specifically.
`@ViewChildren` and `@ContentChildren` queries are already "dynamic" by default and don't support static resolution.

不，这项变化只会影响 `@ViewChild` 和 `@ContentChild` 查询。默认情况下，`@ViewChildren` 和 `@ContentChildren` 查询已经是“动态”的，并且不支持静态解析。

{@a why-specify-static-false}
### ​Why do I have to specify `{static: false}`? Isn't that the default?

### 为什么我还要指定 `{static: false}`？它不是默认值吗？

The goal of this migration is to transition apps that aren't yet on version 9 to a query pattern that is compatible with version 9.
However, most applications use libraries, and it's likely that some of these libraries may not be upgraded to version 8 yet (and thus might not have the proper flags).
Since the application's version of Angular will be used for compilation, if we change the default, the behavior of queries in the library's components will change to the version 8 default and possibly break.
This way, an application's dependencies will behave the same way during the transition as they did in the previous version.

本次迁移的目的是把现在的版本 9 之前的应用转换为与版本 9 兼容的查询模式。然而，大多数应用都会用到库，而其中某些库可能还无法升级到版本 8（因而可能没有指定合适的标志值）。由于应用程序编译时会用到当前的 Angular 版本，所以如果我们修改了默认值，库里组件的查询行为就会变成版本 8 的这个默认值，这可能导致重大变更。而现在这种方式，应用程序的依赖项在转换过程中的行为就和之前的版本是一样的。

In Angular version 9 and later, it will be safe to remove any `{static: false}` flags and we will do this cleanup for you in a schematic.

在 Angular 9 及更高版本中，任意删除 `{static: false}` 标志都是安全的，届时，我们会在原理图中为你完成这个清理工作。

{@a libraries}
###  Can I keep on using Angular libraries that haven’t yet updated to version 8 yet?

### 我还可以继续使用尚未更新到版本 8 的 Angular 库吗？

Yes, absolutely!
Because we have not changed the default query behavior in version 8 (i.e. the compiler still chooses a timing if no flag is set), when your application runs with a library that has not updated to version 8, the library will run the same way it did in version 7.
This guarantees your app will work in version 8 even if libraries take longer to update their code.

绝对没问题！
因为我们没有改变版本 8 中的默认查询行为（比如编译器在没有设置任何标志的情况下仍然会自己选择一个合适的时机），所以当你的应用运行时，如果你的库没有更新到版本 8，该库的运行方式就和版本 7 中是一样的。这样就可以保证你的应用在版本 8 中仍然可以工作，不过这些库的开发者就需要花费更长的时间来修改代码了。

{@a update-library-to-use-static-flag}
###  Can I update my library to version 8 by adding the `static` flag to view queries, while still being compatible with Angular version 7 apps?

### 我可以通过为视图查询添加 `static` 标志来把我的库更新到版本 8，那它还能同时和 Angular 7 应用兼容吗？

Yes, the Angular team's recommendation for libraries is to update to version 8 and add the `static` flag. Angular version 7 apps will continue to work with libraries that have this flag.

是的，Angular 团队对库的建议是更新到版本 8 并添加 `static` 标志。Angular 7 的应用可以继续使用那些带有此标志的库。

However, if you update your library to Angular version 8 and want to take advantage of the new version 8 APIs, or you want more recent dependencies (such as Typescript or RxJS) your library will become incompatible with Angular version 7 apps. If your goal is to make your library compatible with Angular versions 7 and 8, you should not update your lib at all—except for `peerDependencies` in `package.json`.

但是，如果你把你的库更新到 Angular 8，并希望利用新的第 8 版 API，或者你想要新版依赖项（例如 Typescript 或 RxJS），你的库就会变得与 Angular 7 的应用不兼容。如果你的目标是同时与 Angular 7 和 8 兼容，那你就不应该更新你的库，只有 `package.json` 中的 `peerDependencies` 除外。

In general, the most efficient plan is for libraries to adopt a 6 month major version schedule and bump the major version after each Angular update. That way, libraries stay in the same release cadence as Angular.

一般来说，最有效的计划是让库采用 6 个月的主版本计划，并在每次 Angular 升级之后适配主版本。这样，库就可以和 Angular 保持同样的发布节奏了。
