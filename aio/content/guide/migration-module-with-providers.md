# `ModuleWithProviders` Migration

# `ModuleWithProviders` 迁移

## What does this schematic do?

## 这个原理图做了什么？

Some Angular libraries, such as `@angular/router` and `@ngrx/store`, implement APIs that return a type called `ModuleWithProviders` (typically via a method named `forRoot()`).
This type represents an `NgModule` along with additional providers.
Angular version 9 deprecates use of `ModuleWithProviders` without an explicitly generic type, where the generic type refers to the type of the `NgModule`.

一些 Angular 库，比如 `@angular/router` 和 `@ngrx/store`，实现了某些返回 `ModuleWithProviders` 类型的 API（通常是一个名叫 `forRoot()` 的方法）。这种类型代表了一个 `NgModule` 以及其提供者。Angular 9 不推荐使用不带泛型的 `ModuleWithProviders`，泛型类型就是 `NgModule` 的类型。

This schematic will add a generic type to any `ModuleWithProviders` usages that are missing the generic.
In the example below, the type of the `NgModule` is `SomeModule`, so the schematic changes the type to be `ModuleWithProviders<SomeModule>`.

这个原理图会给那些缺少泛型的 `ModuleWithProviders` 用法添加泛型类型。在下面的例子中，`NgModule` 的类型是 `SomeModule`，所以原理图就把类型修改为 `ModuleWithProviders<SomeModule>`。

**Before**

**以前**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config}
      ]
    };
  }
}
```

**After**

**以后**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config }
      ]
    };
  }
}
```

In the rare case that the schematic can't determine the type of `ModuleWithProviders`, you may see the schematic print a TODO comment to update the code manually.

在极少数情况下，原理图无法确定 `ModuleWithProviders` 的类型，你可能会看到原理图打印出一条 TODO 注释来让你手动更新代码。

## Why is this migration necessary?

## 为何这项迁移是必要的？

`ModuleWithProviders` has had the generic type since Angular version 7, but it has been optional.
This has compiled because the `metadata.json` files contained all the metadata.
With Ivy, `metadata.json` files are no longer required, so the framework cannot assume that one with the necessary types has been provided.
Instead, Ivy relies on the generic type for `ModuleWithProviders` to get the correct type information.

自 Angular 7 开始，`ModuleWithProviders` 就有了泛型类型，但它是可选的。即使缺了也可以正常编译，因为 `metadata.json` 文件中包含了所有的元数据。在 Ivy 中，不再需要 `metadata.json` 文件了，所以框架不能再假定已经有了所有必要的类型。相反，Ivy 要依赖 `ModuleWithProviders` 的泛型类型来获取正确的类型信息。

For this reason, Angular version 9 deprecates `ModuleWithProviders` without a generic type.
A future version of Angular will remove the default generic type, making an explicit type required.

出于这个原因，Angular 9 版本不推荐使用不带泛型类型的 `ModuleWithProviders`。Angular 的未来版本会删除默认的泛型类型，并且要求一个明确的类型。

## Should I add the generic type when I add new `ModuleWithProviders` types to my application?

## 当我把新的 `ModuleWithProviders` 类型添加到应用中时，是否应该添加泛型？

Yes, any time your code references the `ModuleWithProviders` type, it should have a generic type that matches the actual `NgModule` that is returned (for example, `ModuleWithProviders<MyModule>`).

是的，任何时候，当你的代码引用了 `ModuleWithProviders` 类型，都要有一个与其返回的实际 `NgModule` 相匹配的泛型类型（例如，`ModuleWithProviders<MyModule>` ）。

## What should I do if the schematic prints a TODO comment?

## 如果此原理图打印出了 TODO 注释，我该怎么办？

The schematic will print a TODO comment in the event that it cannot detect the correct generic for the `ModuleWithProviders` type.
In this case, you'll want to manually add the correct generic to `ModuleWithProviders`. It should match the type of whichever `NgModule` is returned in the `ModuleWithProviders` object.

此原理图会在它无法检测出 `ModuleWithProviders` 类型的正确泛型类型的情况下打印 TODO 注释。在这种情况下，你需要手动为 `ModuleWithProviders` 添加正确的泛型。它应该匹配 `ModuleWithProviders` 对象中返回的那个 `NgModule`。

## What does this mean for libraries?

## 这对库意味着什么？

Libraries should add the generic type to any usages of the `ModuleWithProviders` type.

库应该把泛型类型添加到 `ModuleWithProviders` 类型的任何一次使用中。

## What about applications using non-migrated libraries?

## 那些使用未迁移库的应用呢？

The [Angular compatibility compiler](guide/glossary#ngcc) (`ngcc`) should automatically transform any non-migrated libraries to generate the proper code.

[Angular 兼容性编译器](guide/glossary#ngcc) （ `ngcc` ）会自动转换所有未迁移的库来生成合适的代码。
