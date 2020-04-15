# Navigate the component tree with DI

# 使用 DI 浏览组件树

Application components often need to share information.
You can often use loosely coupled techniques for sharing information,
such as data binding and service sharing,
but sometimes it makes sense for one component to have a direct reference to another component.
You need a direct reference, for instance, to access values or call methods on that component.

应用的组件之间经常需要共享信息。你通常要用松耦合的技术来共享信息，比如数据绑定和服务共享。但是有时候让一个组件直接引用另一个组件还是很有意义的。
例如，你需要通过另一个组件的直接引用来访问其属性或调用其方法。

Obtaining a component reference is a bit tricky in Angular.
Angular components themselves do not have a tree that you can
inspect or navigate programmatically. The parent-child relationship is indirect,
established through the components' [view objects](guide/glossary#view).

在 Angular 中获取组件引用略微有些棘手。
Angular 组件本身并没有一棵可以用编程方式检查或浏览的树。
其父子关系是通过组件的[视图对象](guide/glossary#view)间接建立的。

Each component has a *host view*, and can have additional *embedded views*.
An embedded view in component A is the
host view of component B, which can in turn have embedded view.
This means that there is a [view hierarchy](guide/glossary#view-hierarchy) for each component,
of which that component's host view is the root.

每个组件都有一个*宿主视图*和一些*内嵌视图*。
组件 A 的内嵌视图可以是组件 B 的宿主视图，而组件 B 还可以有它自己的内嵌视图。
这意味着每个组件都有一棵以该组件的宿主视图为根节点的[视图树](guide/glossary#view-hierarchy)。

There is an API for navigating *down* the view hierarchy.
Check out `Query`, `QueryList`, `ViewChildren`, and `ContentChildren`
in the [API Reference](api/).

有一些用于在视图树中*向下*导航的 API。
请到 [API 参考手册](api/)中查看 `Query`、`QueryList`、`ViewChildren` 和 `ContentChildren`。

There is no public API for acquiring a parent reference.
However, because every component instance is added to an injector's container,
you can use Angular dependency injection to reach a parent component.

不存在用于获取父引用的公共 API。
不过，由于每个组件的实例都会添加到注入器的容器中，因此你可以通过 Angular 的依赖注入来访问父组件。

This section describes some techniques for doing that.

本节描述的就是关于这种做法的一些技巧。

{@a find-parent}
{@a known-parent}


### Find a parent component of known type

### 查找已知类型的父组件

You use standard class injection to acquire a parent component whose type you know.

你可以使用标准的类注入形式来获取类型已知的父组件。

In the following example, the parent `AlexComponent` has several children including a `CathyComponent`:

在下面的例子中，父组件 `AlexComponent` 具有一些子组件，包括 `CathyComponent`：

{@a alex}


<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-1" header="parent-finder.component.ts (AlexComponent v.1)"></code-example>



*Cathy* reports whether or not she has access to *Alex*
after injecting an `AlexComponent` into her constructor:

在把 `AlexComponent` 注入到 `CathyComponent` 的构造函数中之后，*Cathy* 可以报告她是否能访问 *Alex*：

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="cathy" header="parent-finder.component.ts (CathyComponent)"></code-example>



Notice that even though the [@Optional](guide/dependency-injection-in-action#optional) qualifier
is there for safety,
the <live-example name="dependency-injection-in-action"></live-example>
confirms that the `alex` parameter is set.

注意，虽然为了安全起见我们用了 [@Optional](guide/dependency-injection-in-action#optional) 限定符，但是<live-example name="dependency-injection-in-action"></live-example>中仍然会确认 `alex` 参数是否有值。

{@a base-parent}


### Unable to find a parent by its base class

### 不能根据父组件的基类访问父组件

What if you *don't* know the concrete parent component class?

如果你*不知道*具体的父组件类怎么办？

A re-usable component might be a child of multiple components.
Imagine a component for rendering breaking news about a financial instrument.
For business reasons, this news component makes frequent calls
directly into its parent instrument as changing market data streams by.

可复用组件可能是多个组件的子组件。想象一个用于呈现相关金融工具的突发新闻的组件。
出于商业原因，当市场上的数据流发生变化时，这些新组件会频繁调用其父组件。

The app probably defines more than a dozen financial instrument components.
If you're lucky, they all implement the same base class whose API your `NewsComponent` understands.


该应用可能定义了十几个金融工具组件。理想情况下，它们全都实现了同一个基类，你的 `NewsComponent` 也能理解其 API。 

<div class="alert is-helpful">



Looking for components that implement an interface would be better.
That's not possible because TypeScript interfaces disappear
from the transpiled JavaScript, which doesn't support interfaces.
There's no artifact to look for.

如果能查找实现了某个接口的组件当然更好。
但那是不可能的。因为 TypeScript 接口在转译后的 JavaScript 中不存在，而 JavaScript 不支持接口。
因此，找无可找。

</div>



This isn't necessarily good design.
This example is examining *whether a component can
inject its parent via the parent's base class*.

这个设计并不怎么好。
该例子是为了验证*组件是否能通过其父组件的基类来注入父组件*。

The sample's `CraigComponent` explores this question. [Looking back](#alex),
you see that the `Alex` component *extends* (*inherits*) from a class named `Base`.

这个例子中的 `CraigComponent` 体现了此问题。[往回看](#alex)，你可以看到 `Alex` 组件*扩展*（*继承*）了基类 `Base`。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-class-signature" header="parent-finder.component.ts (Alex class signature)"></code-example>



The `CraigComponent` tries to inject `Base` into its `alex` constructor parameter and reports if it succeeded.

`CraigComponent` 试图把 `Base` 注入到它的构造函数参数 `alex` 中，并汇报这次注入是否成功了。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="craig" header="parent-finder.component.ts (CraigComponent)"></code-example>



Unfortunately, this doesn't work.
The <live-example name="dependency-injection-in-action"></live-example>
confirms that the `alex` parameter is null.
*You cannot inject a parent by its base class.*


不幸的是，这不行！
<live-example name="dependency-injection-in-action"></live-example> 确认了 `alex` 参数为空。
因此，*你不能通过父组件的基类注入它*。

{@a class-interface-parent}


### Find a parent by its class interface

### 根据父组件的类接口查找它

You can find a parent component with a [class interface](guide/dependency-injection-in-action#class-interface).

你可以通过父组件的[类接口](guide/dependency-injection-in-action#class-interface)来查找它。

The parent must cooperate by providing an *alias* to itself in the name of a class interface token.

该父组件必须合作，以类接口令牌为名，为自己定义一个*别名提供者*。

Recall that Angular always adds a component instance to its own injector;
that's why you could inject *Alex* into *Cathy* [earlier](#known-parent).

回忆一下，Angular 总是会把组件实例添加到它自己的注入器中，因此[以前](#known-parent)你才能把 *Alex* 注入到 *Cathy* 中。

Write an [*alias provider*](guide/dependency-injection-in-action#useexisting)&mdash;a `provide` object literal with a `useExisting`
definition&mdash;that creates an *alternative* way to inject the same component instance
and add that provider to the `providers` array of the `@Component()` metadata for the `AlexComponent`.

编写一个 [*别名提供者*](guide/dependency-injection-in-action#useexisting)（一个 `provide` 对象字面量，其中有一个 `useExisting` 定义），创造了另一种方式来注入同一个组件实例，并把那个提供者添加到 `AlexComponent` `@Component()` 元数据的 `providers` 数组中。

{@a alex-providers}


<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers" header="parent-finder.component.ts (AlexComponent providers)"></code-example>


[Parent](#parent-token) is the provider's class interface token.
The [*forwardRef*](guide/dependency-injection-in-action#forwardref) breaks the circular reference you just created by having the `AlexComponent` refer to itself.

[Parent](#parent-token) 是该提供者的类接口。
[*forwardRef*](guide/dependency-injection-in-action#forwardref) 用于打破循环引用，因为在你刚才这个定义中 `AlexComponent` 引用了自身。

*Carol*, the third of *Alex*'s child components, injects the parent into its `parent` parameter,
the same way you've done it before.

*Alex* 的第三个子组件 *Carol*，把其父组件注入到了自己的 `parent` 参数中 —— 和你以前做过的一样。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="carol-class" header="parent-finder.component.ts (CarolComponent class)"></code-example>



Here's *Alex* and family in action.

下面是 *Alex* 及其家人的运行效果。

<div class="lightbox">
  <img src="generated/images/guide/dependency-injection-in-action/alex.png" alt="Alex in action">
</div>



{@a parent-tree}


### Find a parent in a tree with _@SkipSelf()_

### 使用 `@SkipSelf()` 在树中查找父组件 

Imagine one branch of a component hierarchy: *Alice* -> *Barry* -> *Carol*.
Both *Alice* and *Barry* implement the `Parent' class interface.

想象一下组件树的一个分支：*Alice* -> *Barry* -> *Carol*。
无论 *Alice* 还是 *Barry* 都实现了类接口 `Parent`。

*Barry* is the problem. He needs to reach his parent, *Alice*, and also be a parent to *Carol*.
That means he must both *inject* the `Parent` class interface to get *Alice* and
*provide* a `Parent` to satisfy *Carol*.

*Barry* 很为难。他需要访问他的母亲 *Alice*，同时他自己还是 *Carol* 的父亲。
这意味着他必须同时*注入* `Parent` 类接口来找到 *Alice*，同时还要*提供*一个 `Parent` 来满足 *Carol* 的要求。

Here's *Barry*.

*Barry* 的代码如下。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="barry" header="parent-finder.component.ts (BarryComponent)"></code-example>



*Barry*'s `providers` array looks just like [*Alex*'s](#alex-providers).
If you're going to keep writing [*alias providers*](guide/dependency-injection-in-action#useexisting) like this you should create a [helper function](#provideparent).

*Barry* 的 `providers` 数组看起来和 [*Alex*](#alex-providers) 的一样。
如果你准备继续像这样编写[*别名提供者*](guide/dependency-injection-in-action#useexisting)，就应该创建一个[辅助函数](#provideparent)。

For now, focus on *Barry*'s constructor.

现在，注意看 *Barry* 的构造函数。

<code-tabs>

  <code-pane header="Barry's constructor" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="barry-ctor">

  </code-pane>

  <code-pane header="Carol's constructor" path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="carol-ctor">

  </code-pane>

</code-tabs>


It's identical to *Carol*'s constructor except for the additional `@SkipSelf` decorator.

除增加了 `@SkipSelf` 装饰器之外，它和 *Carol* 的构造函数相同。

`@SkipSelf` is essential for two reasons:

使用 `@SkipSelf` 有两个重要原因：

1. It tells the injector to start its search for a `Parent` dependency in a component *above* itself,
which *is* what parent means.

   它告诉注入器开始从组件树中*高于*自己的位置（也就是父组件）开始搜索 `Parent` 依赖。

2. Angular throws a cyclic dependency error if you omit the `@SkipSelf` decorator.

   如果你省略了 `@SkipSelf` 装饰器，Angular 就会抛出循环依赖错误。

  `Cannot instantiate cyclic dependency! (BethComponent -> Parent -> BethComponent)`

Here's *Alice*, *Barry*, and family in action.

下面是 *Alice*、*Barry* 及其家人的运行效果。

<div class="lightbox">
  <img src="generated/images/guide/dependency-injection-in-action/alice.png" alt="Alice in action">
</div>

{@a parent-token}


###  Parent class interface

### 父类接口

You [learned earlier](guide/dependency-injection-in-action#class-interface) that a class interface is an abstract class used as an interface rather than as a base class.

你[已经学过](guide/dependency-injection-in-action#class-interface)，类接口是一个抽象类，它实际上用做接口而不是基类。

The example defines a `Parent` class interface.

下面的例子定义了一个类接口 `Parent`。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="parent" header="parent-finder.component.ts (Parent class-interface)"></code-example>



The `Parent` class interface defines a `name` property with a type declaration but *no implementation*.
The `name` property is the only member of a parent component that a child component can call.
Such a narrow interface helps decouple the child component class from its parent components.

`Parent` 类接口定义了一个带类型的 `name` 属性，但没有实现它。
这个 `name` 属性是父组件中唯一可供子组件调用的成员。
这样的窄化接口帮助把子组件从它的父组件中解耦出来。

A component that could serve as a parent *should* implement the class interface as the `AliceComponent` does.

一个组件想要作为父组件使用，就*应该*像 `AliceComponent` 那样实现这个类接口。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alice-class-signature" header="parent-finder.component.ts (AliceComponent class signature)"></code-example>



Doing so adds clarity to the code. But it's not technically necessary.
Although `AlexComponent` has a `name` property, as required by its `Base` class,
its class signature doesn't mention `Parent`.

这样做可以增加代码的清晰度，但在技术上并不是必要的。
虽然 `AlexComponent` 像 `Base` 类所要求的一样具有 `name` 属性，但它的类签名中并没有提及 `Parent`。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-class-signature" header="parent-finder.component.ts (AlexComponent class signature)"></code-example>



<div class="alert is-helpful">



`AlexComponent` *should* implement `Parent` as a matter of proper style.
It doesn't in this example *only* to demonstrate that the code will compile and run without the interface.

`AlexComponent` *应该*实现 `Parent` 才是一种正确的风格。
这个例子中之所以没这样做，*只是*为了证明即使没有声明接口，代码也可以编译和运行。

</div>



{@a provideparent}


### `provideParent()` helper function

### `provideParent()` 辅助函数

Writing variations of the same parent *alias provider* gets old quickly,
especially this awful mouthful with a [*forwardRef*](guide/dependency-injection-in-action#forwardref).

你很快就会厌倦为同一个父组件编写*别名提供者*的变体形式，特别是带有 [*forwardRef*](guide/dependency-injection-in-action#forwardref) 的那种。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alex-providers" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>

You can extract that logic into a helper function like the following.

你可以像把这些逻辑抽取到辅助函数中，就像这样。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="provide-the-parent" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>

Now you can add a simpler, more meaningful parent provider to your components.

现在，你可以为组件添加一个更简单、更有意义的父组件提供者。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="alice-providers" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>


You can do better. The current version of the helper function can only alias the `Parent` class interface.
The application might have a variety of parent types, each with its own class interface token.

你还可以做得更好。当前版本的辅助函数只能为类接口 `Parent` 定义别名。
应用可能具有多种父组件类型，每个父组件都有自己的类接口令牌。

Here's a revised version that defaults to `parent` but also accepts an optional second parameter for a different parent class interface.

这是一个修订后的版本，它默认为 `parent`，但是也能接受另一个父类接口作为可选的第二参数。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="provide-parent" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>


And here's how you could use it with a different parent type.

下面是针对不同父组件类型的用法。

<code-example path="dependency-injection-in-action/src/app/parent-finder.component.ts" region="beth-providers" header="dependency-injection-in-action/src/app/parent-finder.component.ts"></code-example>
