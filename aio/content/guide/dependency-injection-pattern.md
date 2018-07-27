# The Dependency Injection pattern

# 依赖注入（Dependency injection）模式

**Dependency injection** is an important application design pattern.
It's used so widely that almost everyone just calls it _DI_.

**依赖注入**是一个很重要的设计模式。
它使用得非常广泛，以至于几乎每个人都把它简称为 *DI* 。

Angular has its own dependency injection framework, and
you really can't build an Angular application without it.

Angular 有自己的依赖注入框架，离开它，你几乎没办法构建出 Angular 应用。

This page covers what DI is and why it's useful.

本页会告诉你 DI 是什么，以及为什么它很有用。

When you've learned the general pattern, you're ready to turn to
the [Angular Dependency Injection](guide/dependency-injection) guide to see how it works in an Angular app.

当你学会了这种通用的模式之后，就可以转到 [Angular 依赖注入](guide/dependency-injection) 中去看看它在 Angular 应用中的工作原理了。

{@a why-di }

## Why dependency injection?

## 为什么需要依赖注入？

To understand why dependency injection is so important, consider an example without it.
Imagine writing the following code:

要理解为什么依赖注入这么重要，不妨先考虑不使用它的一个例子。想象下列代码：

<code-example path="dependency-injection/src/app/car/car-no-di.ts" region="car" title="src/app/car/car.ts (without DI)">
</code-example>

The `Car` class creates everything it needs inside its constructor.
What's the problem?
The problem is that the `Car` class is brittle, inflexible, and hard to test.

`Car` 类在自己的构造函数中创建了它所需的一切。
这样做有什么问题？
问题在于 `Car` 类是脆弱、不灵活以及难于测试的。

This `Car` needs an engine and tires. Instead of asking for them,
the `Car` constructor instantiates its own copies from
the very specific classes `Engine` and `Tires`.

`Car` 类需要一个引擎 (engine) 和一些轮胎 (tire)，它没有去请求现成的实例，
而是在构造函数中用具体的 `Engine` 和 `Tires` 类实例化出自己的副本。

What if the `Engine` class evolves and its constructor requires a parameter?
That would break the `Car` class and it would stay broken until you rewrote it along the lines of
`this.engine = new Engine(theNewParameter)`.
The `Engine` constructor parameters weren't even a consideration when you first wrote `Car`.
You may not anticipate them even now.
But you'll *have* to start caring because
when the definition of `Engine` changes, the `Car` class must change.
That makes `Car` brittle.

如果 `Engine` 类升级了，它的构造函数要求传入一个参数，这该怎么办？
这个 `Car` 类就被破坏了，在把创建引擎的代码重写为 `this.engine = new Engine(theNewParameter)` 之前，它都是坏的。
当第一次写 `Car` 类时，你不关心 `Engine` 构造函数的参数，现在也不想关心。
但是，当 `Engine` 类的定义发生变化时，就不得不在乎了，`Car` 类也不得不跟着改变。
这就会让 `Car` 类过于脆弱。

What if you want to put a different brand of tires on your `Car`? Too bad.
You're locked into whatever brand the `Tires` class creates. That makes the
`Car` class inflexible.

如果想在 `Car` 上使用不同品牌的轮胎会怎样？太糟了。
你被锁定在 `Tires` 类创建时使用的那个品牌上。这让 `Car` 类缺乏弹性。

Right now each new car gets its own `engine`. It can't share an `engine` with other cars.
While that makes sense for an automobile engine,
surely you can think of other dependencies that should be shared, such as the onboard
wireless connection to the manufacturer's service center. This `Car` lacks the flexibility
to share services that have been created previously for other consumers.

现在，每辆车都有它自己的引擎。它不能和其它车辆共享引擎。
虽然这对于汽车来说还算可以理解，但是设想一下那些应该被共享的依赖，比如用来联系厂家服务中心的车载无线电。
这种车缺乏必要的弹性，无法共享当初给其它消费者创建的车载无线电。

When you write tests for `Car` you're at the mercy of its hidden dependencies.
Is it even possible to create a new `Engine` in a test environment?
What does `Engine` depend upon? What does that dependency depend on?
Will a new instance of `Engine` make an asynchronous call to the server?
You certainly don't want that going on during tests.

当给 `Car` 类写测试的时候，你就会受制于它背后的那些依赖。
能在测试环境中成功创建新的 `Engine` 吗？
`Engine` 自己又依赖什么？那些依赖本身又依赖什么？
`Engine` 的新实例会发起到服务器的异步调用吗？
你当然不想在测试期间这么一层层追下去。

What if the `Car` should flash a warning signal when tire pressure is low?
How do you confirm that it actually does flash a warning
if you can't swap in low-pressure tires during the test?

如果 `Car` 应该在轮胎气压低的时候闪动警示灯该怎么办？
如果没法在测试期间换上一个低气压的轮胎，那该如何确认它能正确的闪警示灯？

You have no control over the car's hidden dependencies.
When you can't control the dependencies, a class becomes difficult to test.

你没法控制这辆车背后隐藏的依赖。
当不能控制依赖时，类就会变得难以测试。

How can you make `Car` more robust, flexible, and testable?

该如何让 `Car` 更强壮、有弹性以及可测试？

{@a ctor-injection}

That's super easy. Change the `Car` constructor to a version with DI:

答案非常简单。把 `Car` 的构造函数改造成使用 DI 的版本：

<code-tabs>

  <code-pane title="src/app/car/car.ts (excerpt with DI)" path="dependency-injection/src/app/car/car.ts" region="car-ctor">
  </code-pane>

  <code-pane title="src/app/car/car.ts (excerpt without DI)" path="dependency-injection/src/app/car/car-no-di.ts" region="car-ctor">
  </code-pane>

</code-tabs>

See what happened? The definition of the dependencies are
now in the constructor.
The `Car` class no longer creates an `engine` or `tires`.
It just consumes them.

发生了什么？现在依赖的定义移到了构造函数中。
  `Car` 类不再创建引擎 `engine` 或者轮胎 `tires`。
  它仅仅“消费”它们。

<div class="alert is-helpful">

This example leverages TypeScript's constructor syntax for declaring
parameters and properties simultaneously.

这个例子又一次借助 TypeScript 的构造器语法来同时定义参数和属性。

</div>

Now you can create a car by passing the engine and tires to the constructor.

现在，通过往构造函数中传入引擎和轮胎来创建一辆车。

<code-example path="dependency-injection/src/app/car/car-creations.ts" region="car-ctor-instantiation" linenums="false">
</code-example>

How cool is that?
The definition of the `engine` and `tire` dependencies are
decoupled from the `Car` class.
You can pass in any kind of `engine` or `tires` you like, as long as they
conform to the general API requirements of an `engine` or `tires`.

酷！引擎和轮胎这两个依赖的定义与 `Car` 类本身解耦了。
只要喜欢，可以传入任何类型的引擎或轮胎，只要它们能满足引擎或轮胎的通用 API 需求。

Now, if someone extends the `Engine` class, that is not `Car`'s problem.

这样一来，如果有人扩展了 `Engine` 类，那就不再是 `Car` 类的烦恼了。

<div class="alert is-helpful">

The _consumer_ of `Car` has the problem. The consumer must update the car creation code to
something like this:

`Car` 的*消费者*也有这个问题。消费者必须修改创建这辆车的代码，就像这样：

<code-example path="dependency-injection/src/app/car/car-creations.ts" region="car-ctor-instantiation-with-param" linenums="false">

</code-example>

The critical point is this: the `Car` class did not have to change.
You'll take care of the consumer's problem shortly.

这里的要点是：`Car` 本身不必变化。下面就来解决消费者的问题。

</div>

The `Car` class is much easier to test now because you are in complete control
of its dependencies.
You can pass mocks to the constructor that do exactly what you want them to do
during each test:

`Car` 类非常容易测试，因为现在你对它的依赖有了完全的控制权。
  在每个测试期间，你可以往构造函数中传入 mock 对象，做想让它们做的事：

<code-example path="dependency-injection/src/app/car/car-creations.ts" region="car-ctor-instantiation-with-mocks" linenums="false">
</code-example>

**You just learned what dependency injection is**.

**刚刚学习了什么是依赖注入**

It's a coding pattern in which a class receives its dependencies from external
sources rather than creating them itself.

它是一种编程模式，可以让类从外部源中获得它的依赖，而不必亲自创建它们。

Cool! But what about that poor consumer?
Anyone who wants a `Car` must now
create all three parts: the `Car`, `Engine`, and `Tires`.
The `Car` class shed its problems at the consumer's expense.
You need something that takes care of assembling these parts.

酷！但是，可怜的消费者怎么办？
  那些希望得到一个 `Car` 的人们现在必须创建所有这三部分了：`Car`、`Engine` 和 `Tires`。
  `Car` 类把它的快乐建立在了消费者的痛苦之上。
  需要某种机制为你把这三个部分装配好。

You _could_ write a giant class to do that:

可以写一个巨型类来做这件事：

<code-example path="dependency-injection/src/app/car/car-factory.ts" title="src/app/car/car-factory.ts">
</code-example>

It's not so bad now with only three creation methods.
But maintaining it will be hairy as the application grows.
This factory is going to become a huge spiderweb of
interdependent factory methods!

现在只需要三个创建方法，这还不算太坏。
但是当应用规模变大之后，维护它将变得惊险重重。
这个工厂类将变成由相互依赖的工厂方法构成的巨型蜘蛛网。

Wouldn't it be nice if you could simply list the things you want to build without
having to define which dependency gets injected into what?

如果能简单的列出想建造的东西，而不用定义该把哪些依赖注入到哪些对象中，那该多好！

This is where the dependency injection framework comes into play.
Imagine the framework had something called an _injector_.
You register some classes with this injector, and it figures out how to create them.

到了依赖注入框架一展身手的时候了！
想象框架中有一个叫做*注入器 (injector)* 的东西。
用这个注入器注册一些类，它会弄明白如何创建它们。

When you need a `Car`, you simply ask the injector to get it for you and you're good to go.

当需要一个 `Car` 时，就简单的找注入器取车就可以了。

<code-example path="dependency-injection/src/app/car/car-injector.ts" region="injector-call" title="src/app/car/car-injector.ts" linenums="false">
</code-example>

Everyone wins. The `Car` knows nothing about creating an `Engine` or `Tires`.
The consumer knows nothing about creating a `Car`.
You don't have a gigantic factory class to maintain.
Both `Car` and consumer simply ask for what they need and the injector delivers.

皆大欢喜。`Car` 不需要知道如何创建 `Engine` 和 `Tires`。
消费者不需要知道如何创建 `Car`。
开发人员不需要维护巨大的工厂类。
`Car` 和消费者只要简单地请求想要什么，注入器就会交付它们。

This is what a **dependency injection framework** is all about.

这就是“**依赖注入框架**”存在的原因。

Now that you know what dependency injection is and appreciate its benefits,
turn to the [Angular Dependency Injection](guide/dependency-injection) guide to see how it is implemented in Angular.

现在，你知道什么是依赖注入以及它有什么优点了吧？那就请到 [Angular 依赖注入](guide/dependency-injection) 中去看看它在 Angular 中是如何实现的。
