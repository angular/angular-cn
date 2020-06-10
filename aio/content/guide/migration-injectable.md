# Migration for missing `@Injectable()` decorators and incomplete provider definitions

# 迁移缺少 `@Injectable()` 装饰器和不完整的服务提供者定义

### What does this schematic do?

### 这个原理图做了什么？

  1. This schematic adds an `@Injectable()` decorator to classes which are provided in the
     application but are not decorated.

     该原理图会为应用中不带装饰器的服务提供者添加一个 `@Injectable()` 装饰器。

  2. The schematic updates providers which follow the `{provide: SomeToken}` pattern
     to explicitly specify `useValue: undefined`.

     该原理图更新了符合 `{provide: SomeToken}` 模式的提供者，以帮它显式指定 `useValue: undefined`。

**Example for missing `@Injectable()`**

**缺少 `@Injectable()` 的例子**

_Before migration:_

*迁移之前：*

```typescript
export class MyService {...}
export class MyOtherService {...}
export class MyThirdClass {...}
export class MyFourthClass {...}
export class MyFifthClass {...}

@NgModule({
  providers: [
    MyService,
    {provide: SOME_TOKEN, useClass: MyOtherService},
    // The following classes do not need to be decorated because they
    // are never instantiated and just serve as DI tokens.
    {provide: MyThirdClass, useValue: ...},
    {provide: MyFourthClass, useFactory: ...},
    {provide: MyFifthClass, useExisting: ...},
  ]
})
```

_After migration:_

*迁移之后：*

```ts
@Injectable()
export class MyService {...}
@Injectable()
export class MyOtherService {...}
export class MyThirdClass {...}
export class MyFourthClass {...}
export class MySixthClass {...}

...
```

Note that `MyThirdClass`, `MyFourthClass` and `MyFifthClass` do not need to be decorated
with `@Injectable()` because they are never instantiated, but just used as a [DI token][DI_TOKEN].

注意，`MyThirdClass`、`MyFourthClass` 和 `MyFifthClass` 不需要用 `@Injectable()` 进行修饰，因为它们永远不会被实例化，而只是用作[DI 令牌][DI_TOKEN]。

**Example for provider needing `useValue: undefined`**

**需要 `useValue: undefined`** 的提供者例子

This example shows a provider following the `{provide: X}` pattern.
The provider needs to be migrated to a more explicit definition where `useValue: undefined` is specified.

这个例子展示了一个符合 `{provide: X}` 模式的提供者。需要把提供者迁移成一个更明确的定义，其中指定了 `useValue: undefined`。

_Before migration_:

*迁移之前* ：

```typescript
{provide: MyToken}
```
_After migration_:

*迁移完成后* ：

```typescript
{provide: MyToken, useValue: undefined}
```

### Why is adding `@Injectable()` necessary?

### 为什么需要添加 `@Injectable()` ？

In our docs, we've always recommended adding `@Injectable()` decorators to any class that is provided or injected in your application.
However, older versions of Angular did allow injection of a class without the decorator in certain cases, such as AOT mode.
This means if you accidentally omitted the decorator, your application may have continued to work despite missing `@Injectable()` decorators in some places.
This is problematic for future versions of Angular.
Eventually, we plan to strictly require the decorator because doing so enables further optimization of both the compiler and the runtime.
This schematic adds any `@Injectable()` decorators that may be missing to future-proof your app.

在我们的文档中，始终建议把 `@Injectable()` 装饰器添加到应用提供或注入的任何类中。但是，旧版本的 Angular 确实允许在没有装饰器的情况下注入一个类，比如 AOT 模式。这意味着，如果你不小心省略了装饰器，你的应用可能会继续工作，尽管某些地方缺少 `@Injectable()` 装饰器。对于 Angular 的未来版本，这是有问题的。最终，我们计划严格要求装饰器，因为这样可以进一步优化编译器和运行时。这个原理图添加了任何可能缺失的 `@Injectable()` 装饰器，以适应你的应用的未来发展。

### Why is adding `useValue: undefined` necessary?

### 为什么要添加 `useValue: undefined`，有必要吗？

Consider the following pattern:

考虑以下模式：

```typescript
@NgModule({
  providers: [{provide: MyService}]
})
```

Providers using this pattern will behave as if they provide `MyService` as [DI token][DI_TOKEN]
with the value of `undefined`.
This is not the case in Ivy where such providers will be interpreted as if `useClass: MyService` is specified.
This means that these providers will behave differently when updating to version 9 and above.
To ensure that the provider behaves the same as before, the DI value should be explicitly set to `undefined`.

那些使用这个模式的服务提供者会把其行为看作 [DI 令牌][DI_TOKEN] 为 `MyService`，其值为 `undefined`。但在 Ivy 的情况下并非如此，这些提供者会被解释为指定了 `useClass: MyService`。这意味着当升级到版本 9 或更高版本时，这些提供者的行为会有所不同。为了保证提供者的行为和以前一样，DI 的值应该显式设置为 `undefined`。

### When should I be adding `@Injectable()` decorators to classes?

### 我什么时候应该把 `@Injectable()` 装饰器添加到类中？

Any class that is provided must have an `@Injectable()` decorator.
The decorator is necessary for the framework to properly create an instance of that class through DI.

任何提供的类都必须带有 `@Injectable()` 装饰器。该装饰器是框架通过 DI 要正确创建该类实例时所必需的。

However, classes which are already decorated with `@Pipe`, `@Component` or `@Directive` do not need both decorators.
The existing class decorator already instructs the compiler to generate the
needed information.

但是，那些已经用 `@Pipe`，`@Component`，或 `@Directive` 装饰过的类不需要这个装饰器。现有的类装饰器已经指示编译器生成了所需的信息。

### Should I update my library?

### 我应该更新我的库吗？

Yes, if your library has any classes that are meant to be injected, they should be updated with the `@Injectable()` decorator.
In a future version of Angular, a missing `@Injectable()` decorator will always throw an error.

是的，如果你的库中有任何要注入的类，那么都应该使用 `@Injectable()` 装饰器对它们进行更新。在 Angular 的未来版本中，缺少某些 `@Injectable()` 装饰器会抛出一个错误。

Additionally, providers in your library that follow the described `{provide: X}` pattern should be updated to specify an explicit value.
Without explicit value, these providers can behave differently based on the Angular version in applications consuming your library.

此外，应该更新库中符合 `{provide: X}` 模式的提供者，以显式指定一个值。如果没有明确的值，这些提供者可能会在使用你的库的应用中根据 Angular 版本而采取不同的行为。

[DI_TOKEN]: guide/glossary#di-token
