# Dynamic queries flag migration

# 动态查询标志的迁移

## What does this migration do?

## 这种迁移是做什么的？

In Angular version 8, a schematic added `static` flags to all `@ViewChild()` and `@ContentChild()` queries.
This was the first step towards changing the default behavior.
With version 9, the default value changes to `static: false` and the flag becomes optional.

在 Angular 的 8 版本中，升级原理图为所有 `@ViewChild()` 和 `@ContentChild()` 查询都添加了 `static` 标志。这是改变默认行为的第一步。在版本 9 中，默认值变成了 `static: false`，该标志变为可选的。

This schematic scans classes in the compilation and for each class, checks if the members have a `@ViewChild()` or `@ContentChild()` query with the `static` flag set to `false`.
If so, the schematic removes the flag, as it now matches the default.

该原理图扫描了编译中的类，并为每个类检查这些成员是否有 `static` 标志设置为 `false` 的 `@ViewChild()` 或 `@ContentChild()` 查询。如果是这样，该原理图会移除该标志，因为它现在是默认值了。

**Before:**

**之前：**

```ts
@ViewChild('foo', {static: false}) foo: ElementRef;

@ViewChild('bar', {static: true}) bar: ElementRef;
```

**After:**

**之后：**

```ts
@ViewChild('foo') foo: ElementRef;

// this query doesn't change because the static value is true
@ViewChild('bar', {static: true}) bar: ElementRef;
```

Note that the flag is not supported in `@ViewChildren()` or `@ContentChildren()` queries, so the schematic will not check these properties.

请注意，`@ViewChildren()` 或 `@ContentChildren()` 查询中不支持该标志，因此该原理图不会检查这些属性。

## Why is this migration necessary?

## 为何这次迁移必不可少？

This schematic performs a code cleanup to remove `static` flags that match the default, as they are no longer necessary.
Functionally, the code change should be a noop.

这个原理图执行代码清理工作来移除与默认值相匹配的 `static` 标志，因为它们不再是必需的。从功能上讲，这种代码更改应该没有影响。

Before version 9, Angular figured out the static or dynamic nature of a query automatically, based on how the template was written.
Looking at templates in this way, however, caused buggy and surprising behavior (see more about that in the [Static Query Migration Guide](guide/static-query-migration#what-does-this-flag-mean)).
As of version 9, Angular uses dynamic queries (`static: false`) by default, which simplifies queries.
Developers can still explicitly set a query to `static: true` if necessary.

在版本 9 之前，Angular 会根据模板的编写方式来自动判定查询应该是静态的还是动态的。然而，以这种方式处理模板会导致错误和意外行为（请参阅[静态查询迁移指南](guide/static-query-migration#what-does-this-flag-mean)中的更多内容）。所以，从版本 9 开始，Angular 默认使用动态查询（ `static: false` ），简化了查询过程。开发人员仍然可以把查询显式设置为 `static: true`。

<div class=" alert is-helpful">

### What is the difference between static and dynamic queries?

### 静态查询和动态查询有什么区别？

The `static` option for `@ViewChild()` and `@ContentChild()` queries determines when the query results become available.

`@ViewChild()` 和 `@ContentChild()` 查询的 `static` 选项决定了其查询结果何时可用。

With static queries (`static: true`), the query resolves once the view has been created, but before change detection runs.
The result, though, will never be updated to reflect changes to your view, such as changes to `ngIf` and `ngFor` blocks.

使用静态查询（ `static: true` ）时，视图刚刚被创建，还没有运行变更检测之前，此查询就会解析。但是，其结果永远不会更新，以反映对视图的更改，例如对 `ngIf` 和 `ngFor` 块的更改。

With dynamic queries (`static: false`), the query resolves after either `ngAfterViewInit()` or `ngAfterContentInit()` for `@ViewChild()` and `@ContentChild()` respectively.
The result will be updated for changes to your view, such as changes to `ngIf` and `ngFor` blocks.

而使用动态查询（ `static: false` ）时，此查询会分别在 `ngAfterViewInit()` 或 `ngAfterContentInit()` 之后进行解析。此结果将随着对视图的更改而更新，例如对 `ngIf` 和 `ngFor` 块的更改。

For more information, see the following entries in the
[Static Query Migration Guide](https://angular.io/guide/static-query-migration):

要了解更多信息，请参见[静态查询迁移指南](https://angular.cn/guide/static-query-migration)中的以下条目：

* [How do I choose which `static` flag value to use: `true` or `false`?](https://angular.io/guide/static-query-migration#how-do-i-choose-which-static-flag-value-to-use-true-or-false)

  [如何选择使用哪个 `static` 标志值： `true` 还是 `false` ？](https://angular.cn/guide/static-query-migration#how-do-i-choose-which-static-flag-value-to-use-true-or-false)

* [Is there a case where I should use `{static: true}`?](https://angular.io/guide/static-query-migration#is-there-a-case-where-i-should-use-static-true)

  [哪些情况下我应该使用 `{static: true}` ？](https://angular.cn/guide/static-query-migration#is-there-a-case-where-i-should-use-static-true)

</div>

## What does this mean for libraries?

## 这对库来说意味着什么？

In order to support applications that are still running with version 8, the safest option for libraries is to retain the `static` flag to keep the resolution timing consistent.

为了支持那些仍在运行版本 8 的应用，库中最安全的选项是保留 `static` 标志，以保持解析时序的一致性。

- *Libraries on version 9 with applications running version 8: *

  *库的版本为 9，应用的版本为 8：*

  The schematic won't run on libraries.
  As long as libraries retain their `static` flags from version 8, they should work with apps on 8.

  该原理图不会在库中运行。只要库从版本 8 开始就保留了 `static` 标志，就同样可以在 8 上运行。

- *Libraries on version 8 with applications running version 9: *

  *应用的版本为 9，库的版本为 8：*

  Libraries will have explicit flags defined.
  The behavior with explicit flags has not changed.

  库中中会定义显式的标志。只要带有显式标志，其行为就不会改变。

### What about applications using non-migrated libraries?

### 那些使用未迁移库的应用呢？

Because this is a code cleanup that is a noop, non-migrated libraries will work the same either way.

因为这只是一个什么也不做的代码清理工作，所以未迁移的库也同样可以工作。
