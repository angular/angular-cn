# Optimizing client app size with lightweight injection tokens

# 使用轻量级注入令牌优化客户应用的大小

This page provides a conceptual overview of a dependency injection technique that is recommended for library developers.
Designing your library with *lightweight injection tokens* helps optimize the bundle size of client applications that use your library.

本页面会提供一个概念性的概述，它介绍了一种建议库开发者使用的依赖注入技术。*使用轻量级注入令牌*设计你的库，这有助于优化那些用到你库的客户应用的发布包体积。

You can manage the dependency structure among your components and injectable services to optimize bundle size by using [tree-shakable providers](guide/architecture-services#introduction-to-services-and-dependency-injection).
This normally ensures that if a provided component or service is never actually used by the app, the compiler can eliminate its code from the bundle.

你可以使用[可摇树优化的提供者](guide/architecture-services#introduction-to-services-and-dependency-injection)来管理组件和可注入服务之间的依赖结构，以优化发布包体积。这通常会确保如果提供的组件或服务从未被应用实际使用过，那么编译器就可以从发布包中删除它的代码。

However, due to the way Angular stores injection tokens, it is possible that such an unused component or service can end up in the bundle anyway.
This page describes a dependency-injection design pattern that supports proper tree-shaking by using lightweight injection tokens.

但是，由于 Angular 存储注入令牌的方式，可能会导致未用到的组件或服务最终进入发布包中。本页描述了依赖注入的一种设计模式，它通过使用轻量级注入令牌来支持正确的摇树优化。

The lightweight injection token design pattern is especially important for library developers. It ensures that when an application uses only some of your library's capabilities, the unused code can be eliminated from the client's app bundle.

这种轻量级注入令牌设计模式对于库开发者来说尤其重要。它可以确保当应用只用到了你库中的某些功能时，可以从客户应用的发布包中删除未使用过的代码。

When an application uses your library, there might be some services that your library supplies which the client app doesn't use.
In this case, the app developer should expect that service to be tree-shaken, and not contribute to the size of the compiled app.
Because the application developer cannot know about or remedy a tree-shaking problem in the library, it is the responsibility of the library developer to do so.
To prevent the retention of unused components, your library should use the lightweight injection token design pattern.

当某应用用到了你的库时，你的库中可能会提供一些客户应用未用到的服务。在这种情况下，应用开发人员会期望该服务是可摇树优化的，不让这部分代码增加应用的编译后大小。由于应用开发人员既无法了解也无法解决库的摇树优化问题，因此这是库开发人员的责任。为了防止未使用的组件被保留下来，你的库应该使用轻量级注入令牌这种设计模式。

## When tokens are retained

## 什么时候令牌会被保留

To better explain the condition under which token retention occurs, consider a library that provides a library-card component, which contains a body and can contain an optional header.

为了更好地解释令牌被保留的条件，我们考虑一个提供卡片组件的库，它包含一个卡片体，还可以包含一个可选的卡片头。

```
<lib-card>
  <lib-header>...</lib-header>
</lib-card>
```

In a likely implementation, the `<lib-card>` component uses `@ContentChild()` or `@ContentChildren()` to obtain `<lib-header>` and `<lib-body>`, as in the following.

在一个可能的实现中， `<lib-card>` 组件使用 `@ContentChild()` 或者 `@ContentChildren()` 来获取 `<lib-header>` 和 `<lib-body>` ，如下所示。

```
@Component({
  selector: 'lib-header',
  ...,
})
class LibHeaderComponent {}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent {
  @ContentChild(LibHeaderComponent)
  header: LibHeaderComponent|null = null;
}
```

Because `<lib-header>` is optional, the element can appear in the template in its minimal form,
`<lib-card></lib-card>`.
In this case, `<lib-header>` is not used and you would expect it to be tree-shaken, but that is not what happens.
This is because `LibCardComponent` actually contains two references to the `LibHeaderComponent`.

因为 `<lib-header>` 是可选的，所以元素可以用最小化的形式 `<lib-card></lib-card>` 出现在模板中。在这个例子中，`<lib-header>` 没有用过，你可能期望它会被摇树优化掉，但事实并非如此。这是因为 `LibCardComponent` 实际上包含两个对 `LibHeaderComponent` 引用。

`@ContentChild(LibHeaderComponent) header: LibHeaderComponent;`

* One of these reference is in the *type position*-- that is, it specifies `LibHeaderComponent` as a type: `header: LibHeaderComponent;`.

  其中一个引用位于*类型位置上* - 即，它把 `LibHeaderComponent` 用作了类型： `header: LibHeaderComponent;` 。

* The other reference is in the *value position*-- that is, LibHeaderComponent is the value of the `@ContentChild()` parameter decorator: `@ContentChild(LibHeaderComponent)`.

  另一个引用位于*值的位置* - 即，LibHeaderComponent 是 `@ContentChild()` 参数装饰器的值： `@ContentChild(LibHeaderComponent)` 。

The compiler handles token references in these positions differently.

编译器对这些位置的令牌引用的处理方式也不同。

* The compiler erases *type position* references after conversion from TypeScript, so they have no impact on tree-shaking.

  编译器在从 TypeScript 转换完后会删除这些*类型位置上*的引用，所以它们对于摇树优化没什么影响。

* The compiler must retain *value position*  references at runtime, which prevents the component from being tree-shaken.

  编译器必须在运行时保留*值位置上*的引用，这就会阻止该组件被摇树优化掉。

In the example, the compiler retains the `LibHeaderComponent` token that occurs in the value position, which prevents the referenced component from being tree-shaken, even if the application developer does not actually use `<lib-header>` anywhere.
If `LibHeaderComponent` is large (code, template, and styles), including it unnecessarily can significantly increase the size of the client application.

在这个例子中，编译器保留了 `LibHeaderComponent` 令牌，它出现在了值位置上，这就会防止所引用的组件被摇树优化掉，即使应用开发者实际上没有在任何地方用过 `<lib-header>`。如果 `LibHeaderComponent` 很大（代码、模板和样式），把它包含进来就会不必要地大大增加客户应用的大小。

## When to use the lightweight injection token pattern

## 什么时候使用轻量级注入令牌模式

The tree-shaking problem arises when a component is used as an injection token.
There are two cases when that can happen.

当一个组件被用作注入令牌时，就会出现摇树优化的问题。有两种情况可能会发生。

* The token is used in the value position of a [content query](guide/lifecycle-hooks#using-aftercontent-hooks "See more about using content queries.").

  令牌用在[内容查询](guide/lifecycle-hooks#using-aftercontent-hooks "详细了解如何使用内容查询。")中值的位置上。

* The token is used as a type specifier for constructor injection.

  该令牌用作构造函数注入的类型说明符。

In the following example, both uses of the `OtherComponent` token cause retention of `OtherComponent` (that is, prevent it from being tree-shaken when it is not used).

在下面的例子中，两处对 `OtherComponent` 令牌的使用导致 `OtherComponent` 被保留下来（也就是说，防止它在未用到时被摇树优化掉）。

```
class MyComponent {
  constructor(@Optional() other: OtherComponent) {}

  @ContentChild(OtherComponent)
  other: OtherComponent|null;
}
```

Although tokens used only as type specifiers are removed when converted to JavaScript, all tokens used for dependency injection are needed at runtime.
These effectively change `constructor(@Optional() other: OtherComponent)` to `constructor(@Optional() @Inject(OtherComponent) other)`. The token is now in a value position, and causes the tree shaker to retain the reference.

虽然转换为 JavaScript 时只会删除那些只用作类型说明符的令牌，但在运行时依赖注入需要所有这些令牌。这些工作把 `constructor(@Optional() other: OtherComponent)` 改成了 `constructor(@Optional() @Inject(OtherComponent) other)` 。该令牌现在处于值的位置，并使该摇树优化器保留该引用。

<div class="alert is helpful">

For all services, a library should use [tree-shakable providers](guide/architecture-services#introduction-to-services-and-dependency-injection), providing dependencies at the root level rather than in component constructors.

对于所有服务，库都应该使用[可摇树优化的提供者](guide/architecture-services#introduction-to-services-and-dependency-injection)，在根级而不是组件构造函数中提供依赖。

</div>

## Using lightweight injection tokens

## 使用轻量级注入令牌

The lightweight injection token design pattern consists of using a small abstract class as an injection token, and providing the actual implementation at a later stage.
The abstract class is retained (not tree-shaken), but it is small and has no material impact on the application size.

轻量级注入令牌设计模式包括：使用一个小的抽象类作为注入令牌，并在稍后为它提供实际实现。该抽象类固然会被留下（不会被摇树优化掉），但它很小，对应用程序的大小没有任何重大影响。

The following example shows how this works for the `LibHeaderComponent`.

下例举例说明了这个 `LibHeaderComponent` 的工作原理。

```
abstract class LibHeaderToken {}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeaderComponent}
  ]
  ...,
})
class LibHeaderComponent extends LibHeaderToken {}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent {
  @ContentChild(LibHeaderToken) header: LibHeaderToken|null = null;
}
```

In this example, the `LibCardComponent` implementation no longer refers to `LibHeaderComponent` in either the type position or the value position.
This allows full tree shaking of `LibHeaderComponent` to take place.
The `LibHeaderToken` is retained, but it is only a class declaration, with no concrete implementation. It is small and does not materially impact the application size when retained after compilation.

在这个例子中， `LibCardComponent` 的实现里，`LibHeaderComponent` 既不会出现在类型的位置也不会出现在值的位置。这样就可以让 `LibHeaderComponent` 完全被摇树优化掉。`LibHeaderToken` 被留下了，但它只是一个类声明，没有具体的实现。它很小，并且在编译后保留时对应用程序的大小没有实质影响。

Instead, `LibHeaderComponent` itself implements the abstract `LibHeaderToken` class. You can safely use that token as the provider in the component definition, allowing Angular to correctly inject the concrete type.

不过，`LibHeaderComponent` 本身实现了抽象类 `LibHeaderToken`。你可以放心使用这个令牌作为组件定义中的提供者，让 Angular 能够正确地注入具体类型。

To summarize, the lightweight injection token pattern consists of the following.

总结一下，轻量级注入令牌模式由以下几部分组成。

1. A lightweight injection token that is represented as an abstract class.

   一个轻量级的注入令牌，它表现为一个抽象类。

2. A component definition that implements the abstract class.

   一个实现该抽象类的组件定义。

3. Injection of the lightweight pattern, using ` @ContentChild()` or `@ContentChildren()`.

   注入这种轻量级模式时使用 `@ContentChild()` 或者 `@ContentChildren()`。

4. A provider in the implementation of the lightweight injection token which associates the lightweight injection token with the implementation.

   实现轻量级注入令牌的提供者，它将轻量级注入令牌和它的实现关联起来。

### Use the lightweight injection token for API definition

### 使用轻量级注入令牌进行 API 定义

A component that injects a lightweight injection token might need to invoke a method in the injected class.
Because the token is now an abstract class, and the injectable component implements that class, you must also declare an abstract method in the abstract lightweight injection token class.
The implementation of the method (with all of its code overhead) resides in the injectable component that can be tree-shaken.
This allows the parent to communicate with the child (if it is present) in a type-safe manner.

那些注入了轻量级注入令牌的组件可能要调用注入的类中的方法。因为令牌现在是一个抽象类，并且可注入组件实现了那个抽象类，所以你还必须在作为轻量级注入令牌的抽象类中声明一个抽象方法。该方法的实现代码（及其所有相关代码）都会留在可注入组件中，但这个组件本身仍可被摇树优化。这样就能让父组件以类型安全的方式与子组件（如果存在）进行通信。

For example, the `LibCardComponent` now queries `LibHeaderToken` rather than `LibHeaderComponent`.
The following example shows how the pattern allows `LibCardComponent` to communicate with the `LibHeaderComponent` without actually referring to `LibHeaderComponent`.

例如，`LibCardComponent` 现在要查询 `LibHeaderToken` 而不是 `LibHeaderComponent` 。这个例子展示了该模式如何让 `LibCardComponent` 与 `LibHeaderComponent` 通信，却不用实际引用 `LibHeaderComponent` 。

```
abstract class LibHeaderToken {
  abstract doSomething(): void;
}

@Component({
  selector: 'lib-header',
  providers: [
    {provide: LibHeaderToken, useExisting: LibHeader}
  ]
  ...,
})
class LibHeaderComponent extends LibHeaderToken {
  doSomething(): void {
    // Concrete implementation of `doSomething`
  }
}

@Component({
  selector: 'lib-card',
  ...,
})
class LibCardComponent implement AfterContentInit {
  @ContentChild(LibHeaderToken)
  header: LibHeaderToken|null = null;

  ngAfterContentInit(): void {
    this.header && this.header.doSomething();
  }
}
```

In this example the parent  queries the token to obtain the child component, and stores the resulting component reference if it is present.
Before calling a method in the child, the parent component checks to see if the child component is present.
If the child component has been tree-shaken, there is no runtime reference to it, and no call to its method.

在这个例子中，父组件会查询令牌以获取子组件，并持有结果组件的引用（如果存在）。在调用子组件中的方法之前，父组件会检查子组件是否存在。如果子组件已经被摇树优化掉，那运行期间就没有对它的引用，当然也没有调用它的方法。

### Naming your lightweight injection token

### 为你的轻量级注入令牌命名

Lightweight injection tokens are only useful with components. The Angular style guide suggests that you name components using the "Component" suffix. The example "LibHeaderComponent" follows this convention.

轻量级注入令牌只对组件有用。Angular 风格指南中建议你使用“Component”后缀命名组件。例如“LibHeaderComponent”就遵循这个约定。

To maintain the relationship between the component and its token while still distinguishing between them, the recommended style is to use the component base name with the suffix "Token" to name your lightweight injection tokens: "LibHeaderToken".

为了维护组件及其令牌之间的对应关系，同时又要区分它们，推荐的写法是使用组件基本名加上后缀“Token”来命名你的轻量级注入令牌：“LibHeaderToken”。
