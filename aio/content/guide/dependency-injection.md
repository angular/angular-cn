@title
依赖注入

@intro
Angular 的依赖注入系统能够即时地创建和交付所依赖的服务。

@description



**Dependency injection** is an important application design pattern.
Angular has its own dependency injection framework, and
you really can't build an Angular application without it.
It's used so widely that almost everyone just calls it _DI_.

**依赖注入**是重要的程序设计模式。
  Angular 有自己的依赖注入框架，离开了它，几乎没法构建 Angular 应用。
  它使用得非常广泛，以至于几乎每个人都会把它简称为 _DI_。

This page covers what DI is, why it's so useful,
and [how to use it](guide/dependency-injection#angular-di) in an Angular app.

本章将学习什么是 DI，它有什么用。
  然后，将学习在 Angular 应用中该[如何使用它](guide/dependency-injection#angular-di)。


# Contents

* [Why dependency injection?](guide/dependency-injection#why-di)

  [为什么需要依赖注入？](guide/dependency-injection#why-di)
  
* [Angular dependency injection](guide/dependency-injection#angular-dependency-injection)

  [Angular的依赖注入](guide/dependency-injection#angular-dependency-injection)

  * [Configuring the injector](guide/dependency-injection#injector-config)
  
    [配置注入器](guide/dependency-injection#injector-config)
  
  * [Registering providers in an `NgModule`](guide/dependency-injection#register-providers-ngmodule)
  
    [在`NgModule`中注册提供商](guide/dependency-injection#register-providers-ngmodule)
    
  * [Registering providers in a component](guide/dependency-injection#register-providers-component)
  
    [在组件中注册提供商](guide/dependency-injection#register-providers-component)
  
  * [When to use `NgModule` versus an application component](guide/dependency-injection#ngmodule-vs-comp)
  
    [什么时候使用`NgModule`？什么时候使用应用组件？](guide/dependency-injection#ngmodule-vs-comp)
  
  * [Preparing the `HeroListComponent` for injection](guide/dependency-injection#prep-for-injection)
  
    [为依赖注入准备`HeroListComponent`](guide/dependency-injection#prep-for-injection)
  
  * [Implicit injector creation](guide/dependency-injection#di-metadata)
  
    [隐式依赖注入](guide/dependency-injection#di-metadata)
  
  * [Singleton services](guide/dependency-injection#singleton-services)
  
    [单例服务](guide/dependency-injection#singleton-services)
  
  * [Testing the component](guide/dependency-injection#testing-the-component)
  
    [测试组件](guide/dependency-injection#testing-the-component)
  
  * [When the service needs a service](guide/dependency-injection#service-needs-service)
  
    [什么时候服务需要另一个服务](guide/dependency-injection#service-needs-service)
  
  * [Why `@Injectable()`?](guide/dependency-injection#injectable)
  
    [为什么要加`@Injectable()`？](guide/dependency-injection#injectable)
    
* [Creating and registering a logger service](guide/dependency-injection#logger-service)

  [创建并注册日志服务](guide/dependency-injection#logger-service)

* [Injector providers](guide/dependency-injection#injector-providers)

  [注入器提供商](guide/dependency-injection#injector-providers)

  * [The `Provider` class and `provide` object literal](guide/dependency-injection#provide)
  
  * [`Provider`类和`provide`对象字面量](guide/dependency-injection#provide)
  
  * [Alternative class providers](guide/dependency-injection#class-provider)
  
    [代用类提供商](guide/dependency-injection#class-provider)
    
  * [Class provider with dependencies](guide/dependency-injection#class-provider-dependencies)
  
    [带有依赖的类提供商](guide/dependency-injection#class-provider-dependencies)
    
  * [Aliased class providers](guide/dependency-injection#aliased-class-providers)
  
    [别名类提供商](guide/dependency-injection#aliased-class-providers)
    
  * [Value providers](guide/dependency-injection#value-provider)
  
    [值提供商](guide/dependency-injection#value-provider)
  
  * [Factory providers](guide/dependency-injection#factory-provider)
  
    [工厂提供商](guide/dependency-injection#factory-provider)
  
* [Dependency injection tokens](guide/dependency-injection#dependency-injection-tokens)

  [依赖注入令牌](guide/dependency-injection#dependency-injection-tokens)

  * [Non-class dependencies](guide/dependency-injection#non-class-dependencies)

    [非“类”依赖](guide/dependency-injection#non-class-dependencies)

  * [`InjectionToken`](guide/dependency-injection#injection-token)

* [Optional dependencies](guide/dependency-injection#optional)

  [可选依赖](guide/dependency-injection#optional)

* [Summary](guide/dependency-injection#summary)

  [总结](guide/dependency-injection#summary)

* [Appendix: Working with injectors directly](guide/dependency-injection#explicit-injector)

  [附录：直接使用注入器](guide/dependency-injection#explicit-injector)


Run the <live-example></live-example>.

运行<live-example></live-example>.



## Why dependency injection?
## 为什么需要依赖注入？

To understand why dependency injection is so important, consider an example without it.
Imagine writing the following code:

要理解为什么依赖注入这么重要，不妨先考虑不使用它的一个例子。想象下列代码：


<code-example path="dependency-injection/src/app/car/car-no-di.ts" region="car" title="src/app/car/car.ts (without DI)">

</code-example>



The `Car` class creates everything it needs inside its constructor.
What's the problem?

`Car`类会在它的构造函数中创建所需的每样东西。
问题何在？

The problem is that the `Car` class is brittle, inflexible, and hard to test.

问题在于，这个`Car`类过于脆弱、缺乏弹性并且难以测试。

This `Car` needs an engine and tires. Instead of asking for them,
the `Car` constructor instantiates its own copies from
the very specific classes `Engine` and `Tires`.

`Car`类需要一个引擎 (engine) 和一些轮胎 (tire)，它没有去请求现成的实例，
而是在构造函数中用具体的`Engine`和`Tires`类实例化出自己的副本。

What if the `Engine` class evolves and its constructor requires a parameter?
That would break the `Car` class and it would stay broken until you rewrote it along the lines of
`this.engine = new Engine(theNewParameter)`.
The `Engine` constructor parameters weren't even a consideration when you first wrote `Car`.
You may not anticipate them even now.
But you'll *have* to start caring because
when the definition of `Engine` changes, the `Car` class must change.
That makes `Car` brittle.

如果`Engine`类升级了，它的构造函数要求传入一个参数，这该怎么办？
这个`Car`类就被破坏了，在把创建引擎的代码重写为`this.engine = new Engine(theNewParameter)`之前，它都是坏的。
当第一次写`Car`类时，我们不关心`Engine`构造函数的参数，现在也不想关心。
但是，当`Engine`类的定义发生变化时，就不得不在乎了，`Car`类也不得不跟着改变。
这就会让`Car`类过于脆弱。

What if you want to put a different brand of tires on your `Car`? Too bad.
You're locked into whatever brand the `Tires` class creates. That makes the
`Car` class inflexible.

如果想在`Car`上使用不同品牌的轮胎会怎样？太糟了。
我们被锁定在`Tires`类创建时使用的那个品牌上。这让`Car`类缺乏弹性。

Right now each new car gets its own `engine`. It can't share an `engine` with other cars.
While that makes sense for an automobile engine,
surely you can think of other dependencies that should be shared, such as the onboard
wireless connection to the manufacturer's service center. This `Car` lacks the flexibility
to share services that have been created previously for other consumers.

现在，每辆车都有它自己的引擎。它不能和其它车辆共享引擎。
虽然这对于汽车来说还算可以理解，但是设想一下那些应该被共享的依赖，比如用来联系厂家服务中心的车载无线电。
我们的车缺乏必要的弹性，无法共享当初给其它消费者创建的车载无线电。

When you write tests for `Car` you're at the mercy of its hidden dependencies.
Is it even possible to create a new `Engine` in a test environment?
What does `Engine` depend upon? What does that dependency depend on?
Will a new instance of `Engine` make an asynchronous call to the server?
You certainly don't want that going on during tests.

当给`Car`类写测试的时候，我们就会受制于它背后的那些依赖。
能在测试环境中成功创建新的`Engine`吗？
`Engine`自己又依赖什么？那些依赖本身又依赖什么？
`Engine`的新实例会发起到服务器的异步调用吗？
我们当然不想在测试期间这么一层层追下去。

What if the `Car` should flash a warning signal when tire pressure is low?
How do you confirm that it actually does flash a warning
if you can't swap in low-pressure tires during the test?

如果`Car`应该在轮胎气压低的时候闪动警示灯该怎么办？
如果没法在测试期间换上一个低气压的轮胎，那该如何确认它能正确的闪警示灯？

You have no control over the car's hidden dependencies.
When you can't control the dependencies, a class becomes difficult to test.

我们没法控制这辆车背后隐藏的依赖。
当不能控制依赖时，类就会变得难以测试。

How can you make `Car` more robust, flexible, and testable?

该如何让`Car`更强壮、有弹性以及可测试？

{@a ctor-injection}
That's super easy. Change the `Car` constructor to a version with DI:

{@a ctor-injection}
答案非常简单。把`Car`的构造函数改造成使用 DI 的版本：


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

发生了什么？我们把依赖的定义移到了构造函数中。
  `Car`类不再创建引擎`engine`或者轮胎`tires`。
  它仅仅“消费”它们。


<div class="l-sub-section">



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

酷！引擎和轮胎这两个依赖的定义与`Car`类本身解耦了。
只要喜欢，可以传入任何类型的引擎或轮胎，只要它们能满足引擎或轮胎的通用 API 需求。

Now, if someone extends the `Engine` class, that is not `Car`'s problem.

这样一来，如果有人扩展了`Engine`类，那就不再是`Car`类的烦恼了。


<div class="l-sub-section">



The _consumer_ of `Car` has the problem. The consumer must update the car creation code to
something like this:

`Car`的_消费者_也有这个问题。消费者必须更新创建这辆车的代码，就像这样：


<code-example path="dependency-injection/src/app/car/car-creations.ts" region="car-ctor-instantiation-with-param" linenums="false">

</code-example>



The critical point is this: the `Car` class did not have to change.
You'll take care of the consumer's problem shortly.

这里的要点是：`Car`本身不必变化。下面就来解决消费者的问题。


</div>



The `Car` class is much easier to test now because you are in complete control
of its dependencies.
You can pass mocks to the constructor that do exactly what you want them to do
during each test:

`Car`类非常容易测试，因为现在我们对它的依赖有了完全的控制权。
  在每个测试期间，我们可以往构造函数中传入 mock 对象，做想让它们做的事：


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
  那些希望得到一个`Car`的人们现在必须创建所有这三部分了：`Car`、`Engine`和`Tires`。
  `Car`类把它的快乐建立在了消费者的痛苦之上。
  需要某种机制为我们把这三个部分装配好。

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
想象框架中有一个叫做_注入器 (injector)_ 的东西。
用这个注入器注册一些类，它会弄明白如何创建它们。

When you need a `Car`, you simply ask the injector to get it for you and you're good to go.

当需要一个`Car`时，就简单的找注入器取车就可以了。


<code-example path="dependency-injection/src/app/car/car-injector.ts" region="injector-call" title="src/app/car/car-injector.ts" linenums="false">

</code-example>



Everyone wins. The `Car` knows nothing about creating an `Engine` or `Tires`.
The consumer knows nothing about creating a `Car`.
You don't have a gigantic factory class to maintain.
Both `Car` and consumer simply ask for what they need and the injector delivers.

皆大欢喜。`Car`不需要知道如何创建`Engine`和`Tires`。
消费者不需要知道如何创建`Car`。
开发人员不需要维护巨大的工厂类。
`Car`和消费者只要简单地请求想要什么，注入器就会交付它们。

This is what a **dependency injection framework** is all about.

这就是“**依赖注入框架**”存在的原因。

Now that you know what dependency injection is and appreciate its benefits,
read on to see how it is implemented in Angular.

现在，我们知道了什么是依赖注入，以及它的优点。再来看看它在 Angular 中是怎么实现的。



## Angular dependency injection
## Angular 依赖注入

Angular ships with its own dependency injection framework. This framework can also be used
as a standalone module by other applications and frameworks.

Angular 附带了自己的依赖注入框架。此框架也能被当做独立模块用于其它应用和框架中。

To see what it can do when building components in Angular,
start with a simplified version of the `HeroesComponent`
that from the [The Tour of Heroes](tutorial/).

要了解Angular构建组件时注入器做了什么，我们先从[英雄指南](tutorial/)中构建的`HeroesComponent`的简化版本开始。


<code-tabs>

  <code-pane title="src/app/heroes/heroes.component.ts" path="dependency-injection/src/app/heroes/heroes.component.1.ts" region="v1">

  </code-pane>

  <code-pane title="src/app/heroes/hero-list.component.ts" path="dependency-injection/src/app/heroes/hero-list.component.1.ts">

  </code-pane>

  <code-pane title="src/app/heroes/hero.ts" path="dependency-injection/src/app/heroes/hero.ts">

  </code-pane>

  <code-pane title="src/app/heroes/mock-heroes.ts" path="dependency-injection/src/app/heroes/mock-heroes.ts">

  </code-pane>

</code-tabs>



The `HeroesComponent` is the root component of the *Heroes* feature area.
It governs all the child components of this area.
This stripped down version has only one child, `HeroListComponent`,
which displays a list of heroes.

`HeroesComponent`是*英雄*特性区域的根组件。它管理区域内所有子组件。
简化后的版本只有一个子组件`HeroListComponent`，用来显示英雄列表。


Right now `HeroListComponent` gets heroes from `HEROES`, an in-memory collection
defined in another file.
That may suffice in the early stages of development, but it's far from ideal.
As soon as you try to test this component or want to get your heroes data from a remote server,
you'll have to change the implementation of `heroes` and
fix every other use of the `HEROES` mock data.

现在`HeroListComponent`从`HEROES`获得英雄数据，是在另一个文件中定义的内存数据集。
  它在开发的早期阶段可能还够用，但离完美就差得远了。
  一旦开始测试此组件，或者想从远端服务器获得英雄数据，就不得不修改`heroes`的实现，
  还要修改每个用到了`HEROES`模拟数据的地方。

It's better to make a service that hides how the app gets hero data.

最好用一个服务把获取英雄数据的代码封装起来。


<div class="l-sub-section">



Given that the service is a
[separate concern](https://en.wikipedia.org/wiki/Separation_of_concerns),
consider writing the service code in its own file.

因为服务是一个[分离关注点](https://en.wikipedia.org/wiki/Separation_of_concerns)，
    建议你把服务代码放到它自己的文件里。

See [this note](guide/dependency-injection#one-class-per-file) for details.

参阅[这一条](guide/dependency-injection#one-class-per-file)来了解详情。


</div>



The following `HeroService` exposes a `getHeroes` method that returns
the same mock data as before, but none of its consumers need to know that.

`HeroService`暴露了`getHeroes`方法，返回跟以前一样的模拟数据，但它的消费者不需要知道这一点。


<code-example path="dependency-injection/src/app/heroes/hero.service.1.ts" title="src/app/heroes/hero.service.ts">

</code-example>





<div class="l-sub-section">



The `@Injectable()` decorator above the service class is
covered [shortly](guide/dependency-injection#injectable).

注意服务类上面这个`@Injectable()`装饰器。[很快](guide/dependency-injection#injectable)会讨论它的用途。


</div>



<div class="l-sub-section">



Of course, this isn't a real service.
If the app were actually getting data from a remote server, the API would have to be
asynchronous, perhaps returning a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
You'd also have to rewrite the way components consume the service.
This is important in general, but not in this example.

我们甚至没有假装这是一个真实的服务。
如果真的从远端服务器获取数据，这个 API 必须是异步的，可能得返回
[ES2015 承诺 (promise)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
需要重新处理组件消费该服务的方式。通常这个很重要，但是目前的故事不需要。


</div>



A service is nothing more than a class in Angular.
It remains nothing more than a class until you register it with an Angular injector.

服务只是 Angular 中的一个类。
有 Angular 注入器注册它之前，没有任何特别之处。


<div id='bootstrap'>

</div>



{@a injector-config}


### Configuring the injector
### 配置注入器

You don't have to create an Angular injector.
Angular creates an application-wide injector for you during the bootstrap process.

不需要创建 Angular 注入器。
Angular 在启动过程中自动为我们创建一个应用级注入器。


<code-example path="dependency-injection/src/main.ts" linenums="false" title="src/main.ts (bootstrap)" region="bootstrap">

</code-example>



You do have to configure the injector by registering the **providers**
that create the services the application requires.
This guide explains what [providers](guide/dependency-injection#providers) are later.

我们必须通过注册**提供商 (provider)** 来配置注入器，这些提供商为应用创建所需服务。
  在本章的稍后部分会解释什么是[提供商](guide/dependency-injection#providers)。


You can either register a provider within an [NgModule](guide/ngmodule) or in application components.

或者在 [NgModule](guide/ngmodule) 中注册提供商，或者在应用组件中。


{@a register-providers-ngmodule}


### Registering providers in an _NgModule_

### 在_NgModule_中注册提供商

Here's the `AppModule` that registers two providers, `UserService` and an `APP_CONFIG` provider,
in its `providers` array.

在`AppModule`的`providers`中注册了两个提供商，`UserService`和`APP_CONFIG`。


<code-example path="dependency-injection/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts (excerpt)" region="ngmodule">

</code-example>



Because the `HeroService` is used _only_ within the `HeroesComponent`
and its subcomponents, the top-level `HeroesComponent` is the ideal
place to register it.

由于`HeroService`*只*会在`HeroesComponent`及其子组件中使用，所以顶层组件`HeroesComponent`是一个合理的注册位置。


{@a register-providers-component}


### Registering providers in a component

### 在组件中注册提供商

Here's a revised `HeroesComponent` that registers the `HeroService` in its `providers` array.

下面是更新的`HerosComponent`，把`HeroService`注册到了它的`providers`数组中。


<code-example path="dependency-injection/src/app/heroes/heroes.component.1.ts" region="full" title="src/app/heroes/heroes.component.ts" linenums="false">

</code-example>



{@a ngmodule-vs-comp}


### When to use _NgModule_ versus an application component

### 该用 NgModule 还是应用组件？

On the one hand, a provider in an `NgModule` is registered in the root injector. That means that every provider
registered within an `NgModule` will be accessible in the _entire application_.

一方面，NgModule 中的提供商是被注册到根注入器。这意味着在 NgModule 中注册的提供商可以被整个应用访问。

On the other hand, a provider registered in an application component is available only on that component and all its children.

另一方面，在应用组件中注册的提供商只在该组件及其子组件中可用。

Here, the `APP_CONFIG` service needs to be available all across the application, so it's
registered in the `AppModule` `@NgModule` `providers` array.
But since the `HeroService` is only used within the *Heroes*
feature area and nowhere else, it makes sense to register it in
the `HeroesComponent`.

这里，`APP_CONFIG`服务需要在应用中到处可用，所以它被注册到了`AppModule` `@NgModule`的`providers`数组。
但是，由于`HeroService`只在*英雄*特性区用到了，其它地方没有用过，因此在`HeroesComponent`中注册它是有道理的。


<div class="l-sub-section">



Also see *"Should I add app-wide providers to the root `AppModule` or the root `AppComponent`?"* in the [NgModule FAQ](cookbook/ngmodule-faq#q-root-component-or-module).
 
参见 [NgModule FAQ](cookbook/ngmodule-faq#q-root-component-or-module) 一章的
  **我该把“全应用级”提供商加到根模块`AppModule`还是根组件`AppComponent`？**



</div>



{@a prep-for-injection}


### Preparing the _HeroListComponent_ for injection
### 为注入准备`HeroListComponent`

The `HeroListComponent` should get heroes from the injected `HeroService`.
Per the dependency injection pattern, the component must ask for the service in its
constructor, [as discussed earlier](guide/dependency-injection#ctor-injection).
It's a small change:

`HeroListComponent`应该从注入的`HeroService`获取英雄数据。
遵照依赖注入模式的要求，组件必须在它的构造函数中请求这些服务，[就像以前解释过的那样](guide/dependency-injection#ctor-injection)。
只是个小改动：


<code-tabs>

  <code-pane title="src/app/heroes/hero-list.component (with DI)" path="dependency-injection/src/app/heroes/hero-list.component.2.ts">

  </code-pane>

  <code-pane title="src/app/heroes/hero-list.component (without DI)" path="dependency-injection/src/app/heroes/hero-list.component.1.ts">

  </code-pane>

</code-tabs>



<div class="l-sub-section">



#### Focus on the constructor
#### 来看看构造函数

Adding a parameter to the constructor isn't all that's happening here.

往构造函数中添加参数并不是这里所发生的一切。


<code-example path="dependency-injection/src/app/heroes/hero-list.component.2.ts" region="ctor" title="src/app/heroes/hero-list.component.ts" linenums="false">

</code-example>



Note that the constructor parameter has the type `HeroService`, and that
the `HeroListComponent` class has an `@Component` decorator
(scroll up to confirm that fact).
Also recall that the parent component (`HeroesComponent`)
has `providers` information for `HeroService`.

注意，构造函数参数的类型是`HeroService`，并且`HeroListComponent`类有一个`@Component`装饰器
（往上翻可以确认）。另外，记得父级组件 (`HeroesComponent`) 有`HeroService`的`providers`信息。

The constructor parameter type, the `@Component` decorator,
and the parent's `providers` information combine to tell the
Angular injector to inject an instance of
`HeroService` whenever it creates a new `HeroListComponent`.

构造函数参数类型、`@Component`装饰器和父级的`providers`信息合起来告诉 Angular 的注入器，
任何新建`HeroListComponent`的时候，注入一个`HeroService`的实例。


</div>



{@a di-metadata}


### Implicit injector creation

### 隐式注入器的创建

You saw how to use an injector to create a new
`Car` earlier in this guide.
You _could_ create such an injector
explicitly:

本章前面的部分我们看到了如何使用注入器来创建一个新`Car`。
你可以像这样显式创建注入器：


<code-example path="dependency-injection/src/app/car/car-injector.ts" region="injector-create-and-call" title="src/app/car/car-injector.ts" linenums="false">

</code-example>



You won't find code like that in the Tour of Heroes or any of the other
documentation samples.
You *could* write code that [explicitly creates an injector](guide/dependency-injection#explicit-injector) if you *had* to,
but it's not always the best choice.
Angular takes care of creating and calling injectors
when it creates components for you&mdash;whether through HTML markup, as in `<hero-list></hero-list>`,
or after navigating to a component with the [router](guide/router).
If you let Angular do its job, you'll enjoy the benefits of automated dependency injection.

无论在《英雄指南》还是其它范例中，都没有出现这样的代码。
在必要时，*可以*写[使用显式注入器的代码](guide/dependency-injection#explicit-injector)，但却很少这样做。
当 Angular 创建组件时 —— 无论通过像`<hero-list></hero-list>`这样的 HTML 标签还是通过[路由](guide/router)导航到组件 —— 它都会自己管理好注入器的创建和调用。
只要让 Angular 做好它自己的工作，我们就能安心享受“自动依赖注入”带来的好处。


{@a singleton-services}


### Singleton services
### 单例服务

Dependencies are singletons within the scope of an injector.
In this guide's example, a single `HeroService` instance is shared among the
`HeroesComponent` and its `HeroListComponent` children.

在一个注入器的范围内，依赖都是单例的。
在这个例子中，`HeroesComponent`和它的子组件`HeroListComponent`共享同一个`HeroService`实例。

However, Angular DI is a hierarchical injection
system, which means that nested injectors can create their own service instances.
For more information, see [Hierarchical Injectors](guide/hierarchical-dependency-injection).

然而，Angular DI 是一个分层的依赖注入系统，这意味着嵌套的注入器可以创建它们自己的服务实例。
要了解更多知识，参见[多级依赖注入器](guide/hierarchical-dependency-injection)一章。


{@a testing-the-component}


### Testing the component
### 测试组件

Earlier you saw that designing a class for dependency injection makes the class easier to test.
Listing dependencies as constructor parameters may be all you need to test application parts effectively.

前面强调过，设计一个适合依赖注入的类，可以让这个类更容易测试。
要有效的测试应用中的一部分，只需要在构造函数的参数中列出依赖。

For example, you can create a new `HeroListComponent` with a mock service that you can manipulate
under test:

例如，新建的`HeroListComponent`实例使用一个模拟 (mock) 服务，以便可以在测试中操纵它：


<code-example path="dependency-injection/src/app/test.component.ts" region="spec" title="src/app/test.component.ts" linenums="false">

</code-example>



<div class="l-sub-section">



Learn more in [Testing](guide/testing).

要学习更多知识，参见[测试](testing/index)。


</div>



{@a service-needs-service}


### When the service needs a service
### 当服务需要别的服务时

The `HeroService` is very simple. It doesn't have any dependencies of its own.

这个`HeroService`非常简单。它本身不需要任何依赖。

What if it had a dependency? What if it reported its activities through a logging service?
You'd apply the same *constructor injection* pattern,
adding a constructor that takes a `Logger` parameter.

如果它也有依赖，该怎么办呢？例如，它需要通过日志服务来汇报自己的活动。
我们同样用*构造函数注入*模式，来添加一个带有`Logger`参数的构造函数。

Here is the revision compared to the original.

下面是在原来的基础上所做的修改：


<code-tabs>

  <code-pane title="src/app/heroes/hero.service (v2)" path="dependency-injection/src/app/heroes/hero.service.2.ts">

  </code-pane>

  <code-pane title="src/app/heroes/hero.service (v1)" path="dependency-injection/src/app/heroes/hero.service.1.ts">

  </code-pane>

</code-tabs>



The constructor now asks for an injected instance of a `Logger` and stores it in a private property called `logger`.
You call that property within the `getHeroes()` method when anyone asks for heroes.

现在，这个构造函数要求注入一个`Logger`类的实例，并把它存到名为`logger`的私有属性中。
  当别人请求英雄数据时，在`getHeroes()`方法中调用这个属性的方法。


{@a injectable}


### Why _@Injectable()_?

### 为什么要用 _@Injectable()_?

**<a href="../api/core/index/Injectable-decorator.html">@Injectable()</a>** marks a class as available to an
injector for instantiation. Generally speaking, an injector reports an
error when trying to instantiate a class that is not marked as
`@Injectable()`.

**<a href="../api/core/index/Injectable-decorator.html">@Injectable()</a>** 标识一个类可以被注入器实例化。
  通常，在试图实例化没有被标识为`@Injectable()`的类时，注入器会报错。


<div class="l-sub-section">



As it happens, you could have omitted `@Injectable()` from the first
version of `HeroService` because it had no injected parameters.
But you must have it now that the service has an injected dependency.
You need it because Angular requires constructor parameter metadata
in order to inject a `Logger`.

碰巧，第一版的`HeroService`省略了`@Injectable()`，那因为它没有注入的参数。
  但是现在必须要有它，因为服务有了一个注入的依赖。
  我们需要它，因为 Angular 需要构造函数参数的元数据来注入一个`Logger`。


</div>



<div class="callout is-helpful">



<header>
  Suggestion: add @Injectable() to every service class
</header>



<header>
  建议：为每个服务类都添加 @Injectable()
</header>



Consider adding `@Injectable()` to every service class, even those that don't have dependencies
and, therefore, do not technically require it. Here's why:

建议为每个服务类都添加`@Injectable()`，包括那些没有依赖严格来说并不需要它的。因为：


<ul style="font-size:inherit">

  <li>
 
    <p>
      <b>Future proofing:</b> No need to remember <code>@Injectable()</code> when you add a dependency later.
    </p>

    <p>
      <b>面向未来:</b> 没有必要记得在后来添加依赖的时候添加 <code>@Injectable()</code>。
    </p>

  </li>

  <li>

    <p>
      <b>Consistency:</b> All services follow the same rules, and you don't have to wonder why a decorator is missing.
    </p>

    <p>
      <b>一致性:</b>所有的服务都遵循同样的规则，不需要考虑为什么某个地方少了一个。
    </p>

  </li>

</ul>



</div>



Injectors are also responsible for instantiating components
like `HeroesComponent`. So why doesn't `HeroesComponent` have
`@Injectable()`?

注入器同时负责实例化像`HerosComponent`这样的组件。为什么不标记`HerosComponent`为`@Injectable()`呢？

You *can* add it if you really want to. It isn't necessary because the
`HeroesComponent` is already marked with `@Component`, and this
decorator class (like `@Directive` and `@Pipe`, which you learn about later)
is a subtype of <a href="../api/core/index/Injectable-decorator.html">@Injectable()</a>.  It is in
fact `@Injectable()` decorators that
identify a class as a target for instantiation by an injector.

我们**可以**添加它。但是没有必要，因为`HerosComponent`已经有`@Component`装饰器了，
  `@Component`（和随后将会学到的`@Directive`和`@Pipe`一样）是 <a href="../api/core/index/Injectable-decorator.html">Injectable</a> 的子类型。
  实际上，正是这些`@Injectable()`装饰器是把一个类标识为注入器实例化的目标。


<div class="l-sub-section">



At runtime, injectors can read class metadata in the transpiled JavaScript code
and use the constructor parameter type information
to determine what things to inject.

在运行时，注入器可以从编译后的 JavaScript 代码中读取类的元数据，
并使用构造函数的参数类型信息来决定注入什么。

Not every JavaScript class has metadata.
The TypeScript compiler discards metadata by default.
If the `emitDecoratorMetadata` compiler option is true 
(as it should be in the `tsconfig.json`),
the compiler adds the metadata to the generated JavaScript 
for _every class with at least one decorator_.

不是每一个 JavaScript 类都有元数据。
TypeScript 编译器默认忽略元数据。
如果`emitDecoratorMetadata`编译器选项为`true`（在`tsconfig.json`中它应该为`true`），
编译器就会在生成的 JavaScript 中，为_每一个至少拥有一个装饰器的类_添加元数据。

While any decorator will trigger this effect, mark the service class with the
<a href="../api/core/index/Injectable-decorator.html">@Injectable()</a> decorator
to make the intent clear.

当然，任何装饰器都会触发这个效果，用 <a href="../api/core/index/Injectable-decorator.html">@Injectable()</a> 来标识服务
只是为了让这一意图更明显。


</div>



<div class="callout is-critical">



<header>
  Always include the parentheses
</header>



<header>
  别忘了带括号
</header>



Always write `@Injectable()`, not just `@Injectable`.
The application will fail mysteriously if you forget the parentheses.

总是使用`@Injectable()`的形式，不能只用`@Injectable`。
如果忘了括号，应用就会神不知鬼不觉的失败！


</div>




## Creating and registering a logger service

## 创建和注册日志服务

Inject a logger into  `HeroService` in two steps:

要把日志服务注入到`HeroService`中需要两步：

1. Create the logger service.

   创建日志服务。

1. Register it with the application.

   把它注册到应用中。

The logger service is quite simple:

这个日志服务很简单：


<code-example path="dependency-injection/src/app/logger.service.ts" title="src/app/logger.service.ts">

</code-example>



You're likely to need the same logger service everywhere in your application,
so put it in the project's `app` folder and
register it in the `providers` array of the application module, `AppModule`.

应用的每个角落都可能需要日志服务，所以把它放到项目的`app`目录，
并在应用模块`AppModule`的元数据`providers`数组里注册它。


<code-example path="dependency-injection/src/app/providers.component.ts" linenums="false" title="src/app/providers.component.ts (excerpt)" region="providers-logger">

</code-example>



If you forget to register the logger, Angular throws an exception when it first looks for the logger:

如果忘了注册这个日志服务，Angular 会在首次查找这个日志服务时，抛出一个异常。


<code-example format="nocode">
  EXCEPTION: No provider for Logger! (HeroListComponent -> HeroService -> Logger)
  (异常：Logger类没有提供商！(HeroListComponent -> HeroService -> Logger))

</code-example>



That's Angular telling you that the dependency injector couldn't find the *provider* for the logger.
It needed that provider to create a `Logger` to inject into a new
`HeroService`, which it needed to
create and inject into a new `HeroListComponent`.

Angular 告诉我们，依赖注入器找不到日志服务的*提供商*。
在创建`HeroListComponent`的新实例时需要创建并注入`HeroService`，
而`HeroService`需要创建并注入一个`Logger`实例，
Angular 需要这个`Logger`实例的提供商来。

The chain of creations started with the `Logger` provider. *Providers* are the subject of the next section.

这个“创建链”始于`Logger`的提供商。这个*提供商*就是下一节的主题 。



## Injector providers
## 注入器的提供商们

A provider *provides* the concrete, runtime version of a dependency value.
The injector relies on **providers** to create instances of the services
that the injector injects into components and other services.

提供商*提供*依赖值的一个具体的、运行时的版本。
注入器依靠**提供商**创建服务的实例，注入器再将服务的实例注入组件或其它服务。

You must register a service *provider* with the injector, or it won't know how to create the service.

必须为注入器注册一个服务的*提供商*，否则它不知道该如何创建该服务。

Earlier you registered the `Logger` service in the `providers` array of the metadata for the `AppModule` like this:

我们在前面通过`AppModule`元数据中的`providers`数组注册过`Logger`服务，就像这样：


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-logger" title="src/app/providers.component.ts">

</code-example>



There are many ways to *provide* something that looks and behaves like a `Logger`.
The `Logger` class itself is an obvious and natural provider.
But it's not the only way.

有很多方式可以*提供*一些实现 `Logger`类的东西。
  `Logger`类本身是一个显而易见而且自然而然的提供商。
  但它不是唯一的选项。

You can configure the injector with alternative providers that can deliver an object that behaves like a `Logger`.
You could provide a substitute class. You could provide a logger-like object.
You could give it a provider that calls a logger factory function.
Any of these approaches might be a good choice under the right circumstances.

可以用其它备选提供商来配置注入器，只要它们能交付一个行为类似于`Logger`的对象就可以了。
可以提供一个替代类。你可以提供一个类似日志的对象。
可以给它一个提供商，让它调用可以创建日志服务的工厂函数。
所有这些方法，只要用在正确的场合，都可能是一个好的选择。

What matters is that the injector has a provider to go to when it needs a `Logger`.

最重要的是，当注入器需要一个`Logger`时，它得先有一个提供商。


<div id='provide'>

</div>



### The *Provider* class and _provide_ object literal

### *Provider*类和一个提供商的字面量


You wrote the `providers` array like this:

像下面一样写`providers`数组：


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-1" title="src/app/providers.component.ts">

</code-example>



This is actually a shorthand expression for a provider registration
using a _provider_ object literal with two properties:

  这其实是用于注册提供商的简写表达式。
  使用的是一个带有两个属性的_提供商_对象字面量：


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-3" title="src/app/providers.component.ts">

</code-example>



The first is the [token](guide/dependency-injection#token) that serves as the key for both locating a dependency value
and registering the provider.

第一个是[令牌 (token)](guide/dependency-injection#token)，它作为键值 (key) 使用，用于定位依赖值和注册提供商。

The second is a provider definition object,
which you can think of as a *recipe* for creating the dependency value.
There are many ways to create dependency values just as there are many ways to write a recipe.

第二个是一个提供商定义对象。
可以把它看做是指导如何创建依赖值的*配方*。
有很多方式创建依赖值…… 也有很多方式可以写配方。


<div id='class-provider'>

</div>



### Alternative class providers

### 备选的类提供商

Occasionally you'll ask a different class to provide the service.
The following code tells the injector
to return a `BetterLogger` when something asks for the `Logger`.

某些时候，我们会请求一个不同的类来提供服务。
下列代码告诉注入器，当有人请求`Logger`时，返回`BetterLogger`。


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-4" title="src/app/providers.component.ts">

</code-example>



{@a class-provider-dependencies}


### Class provider with dependencies

### 带依赖的类提供商

Maybe an `EvenBetterLogger` could display the user name in the log message.
This logger gets the user from the injected `UserService`,
which is also injected at the application level.

假设`EvenBetterLogger`可以在日志消息中显示用户名。
这个日志服务从注入的`UserService`中取得用户，
`UserService`通常也会在应用级注入。


<code-example path="dependency-injection/src/app/providers.component.ts" region="EvenBetterLogger" title="src/app/providers.component.ts" linenums="false">

</code-example>



Configure it like `BetterLogger`.

就像之前在`BetterLogger`中那样配置它。


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-5" title="src/app/providers.component.ts" linenums="false">

</code-example>



{@a aliased-class-providers}


### Aliased class providers

### 别名类提供商

Suppose an old component depends upon an `OldLogger` class.
`OldLogger` has the same interface as the `NewLogger`, but for some reason
you can't update the old component to use it.

假设某个旧组件依赖一个`OldLogger`类。
`OldLogger`和`NewLogger`具有相同的接口，但是由于某些原因，
我们不能升级这个旧组件并使用它。

When the *old* component logs a message with `OldLogger`,
you'd like the singleton instance of `NewLogger` to handle it instead.

当*旧*组件想使用`OldLogger`记录消息时，我们希望改用`NewLogger`的单例对象来记录。

The dependency injector should inject that singleton instance
when a component asks for either the new or the old logger.
The `OldLogger` should be an alias for `NewLogger`.

不管组件请求的是新的还是旧的日志服务，依赖注入器注入的都应该是同一个单例对象。
  也就是说，`OldLogger`应该是`NewLogger`的别名。

You certainly do not want two different `NewLogger` instances in your app.
Unfortunately, that's what you get if you try to alias `OldLogger` to `NewLogger` with `useClass`.

我们当然不会希望应用中有两个不同的`NewLogger`实例。
不幸的是，如果尝试通过`useClass`来把`OldLogger`作为`NewLogger`的别名，就会导致这样的后果。


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6a" title="src/app/providers.component.ts" linenums="false">

</code-example>



The solution: alias with the `useExisting` option.

解决方案：使用`useExisting`选项指定别名。


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-6b" linenums="false">

</code-example>



{@a value-provider}


### Value providers

### 值提供商


Sometimes it's easier to provide a ready-made object rather than ask the injector to create it from a class.

有时，提供一个预先做好的对象会比请求注入器从类中创建它更容易。


<code-example path="dependency-injection/src/app/providers.component.ts" region="silent-logger" title="src/app/providers.component.ts" linenums="false">

</code-example>



Then you register a provider with the `useValue` option,
which makes this object play the logger role.

于是可以通过`useValue`选项来注册提供商，它会让这个对象直接扮演 logger 的角色。


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-7" linenums="false">

</code-example>



See more `useValue` examples in the
[Non-class dependencies](guide/dependency-injection#non-class-dependencies) and
[InjectionToken](guide/dependency-injection#injection-token) sections.

查看更多`useValue`的例子，见[非类依赖](guide/dependency-injection#non-class-dependencies)和 [InjectionToken](guide/dependency-injection#injection-token)部分。


<div id='factory-provider'>

</div>



### Factory providers

### 工厂提供商

Sometimes you need to create the dependent value dynamically,
based on information you won't have until the last possible moment.
Maybe the information changes repeatedly in the course of the browser session.

有时，我们需要动态创建这个依赖值，因为它所需要的信息直到最后一刻才能确定。
也许这个信息会在浏览器的会话中不停地变化。

Suppose also that the injectable service has no independent access to the source of this information.

还假设这个可注入的服务没法通过独立的源访问此信息。

This situation calls for a **factory provider**.

这种情况下，请调用**工厂提供商**。

To illustrate the point, add a new business requirement:
the `HeroService` must hide *secret* heroes from normal users.
Only authorized users should see secret heroes.

下面通过添加新的业务需求来说明这一点：
`HeroService` 必须对普通用户隐藏掉*秘密*英雄。
只有授权用户才能看到秘密英雄。

Like the `EvenBetterLogger`, the `HeroService` needs a fact about the user.
It needs to know if the user is authorized to see secret heroes.
That authorization can change during the course of a single application session,
as when you log in a different user.

就像`EvenBetterLogger`那样，`HeroService`需要了解此用户的身份。
它需要知道，这个用户是否有权看到隐藏英雄。
这个授权可能在单一的应用会话中被改变，例如，改用另一个用户的身份登录时。

Unlike `EvenBetterLogger`, you can't inject the `UserService` into the `HeroService`.
The `HeroService` won't have direct access to the user information to decide
who is authorized and who is not.

与`EvenBetterLogger`不同，不能把`UserService`注入到`HeroService`中。
  `HeroService`无权访问用户信息，来决定谁有授权谁没有授权。


Instead, the `HeroService` constructor takes a boolean flag to control display of secret heroes.

让`HeroService`的构造函数带上一个布尔型的标志，来控制是否显示隐藏的英雄。


<code-example path="dependency-injection/src/app/heroes/hero.service.ts" region="internals" title="src/app/heroes/hero.service.ts (excerpt)" linenums="false">

</code-example>



You can inject the `Logger`, but you can't inject the  boolean `isAuthorized`.
You'll have to take over the creation of new instances of this `HeroService` with a factory provider.

我们可以注入`Logger`，但是不能注入逻辑型的`isAuthorized`。
我们不得不通过通过工厂提供商创建这个`HeroService`的新实例。

A factory provider needs a factory function:

工厂提供商需要一个工厂方法：


<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="factory" title="src/app/heroes/hero.service.provider.ts (excerpt)" linenums="false">

</code-example>



Although the `HeroService` has no access to the `UserService`, the factory function does.

虽然`HeroService`不能访问`UserService`，但是工厂方法可以。

You inject both the `Logger` and the `UserService` into the factory provider
and let the injector pass them along to the factory function:

同时把`Logger`和`UserService`注入到工厂提供商中，并且让注入器把它们传给工厂方法：


<code-example path="dependency-injection/src/app/heroes/hero.service.provider.ts" region="provider" title="src/app/heroes/hero.service.provider.ts (excerpt)" linenums="false">

</code-example>



<div class="l-sub-section">



The `useFactory` field tells Angular that the provider is a factory function
whose implementation is the `heroServiceFactory`.

`useFactory`字段告诉 Angular：这个提供商是一个工厂方法，它的实现是`heroServiceFactory`。

The `deps` property is an array of [provider tokens](guide/dependency-injection#token).
The `Logger` and `UserService` classes serve as tokens for their own class providers.
The injector resolves these tokens and injects the corresponding services into the matching factory function parameters.

`deps`属性是[提供商令牌](guide/dependency-injection#token)数组。
    `Logger`和`UserService`类作为它们自身类提供商的令牌。
    注入器解析这些令牌，把相应的服务注入到工厂函数中相应的参数中去。


</div>



Notice that you captured the factory provider in an exported variable, `heroServiceProvider`.
This extra step makes the factory provider reusable.
You can register the `HeroService` with this variable wherever you need it.

注意，我们在一个导出的变量中捕获了这个工厂提供商：`heroServiceProvider`。
这个额外的步骤让工厂提供商可被复用。
无论哪里需要，都可以使用这个变量注册`HeroService`。

In this sample, you need it only in the `HeroesComponent`,
where it replaces the previous `HeroService` registration in the metadata `providers` array.
Here you see the new and the old implementation side-by-side:

在这个例子中，只在`HeroesComponent`中需要它，
  这里，它代替了元数据`providers`数组中原来的`HeroService`注册。
  对比一下新的和旧的实现：


<code-tabs>

  <code-pane title="src/app/heroes/heroes.component (v3)" path="dependency-injection/src/app/heroes/heroes.component.ts">

  </code-pane>

  <code-pane title="src/app/heroes/heroes.component (v2)" path="dependency-injection/src/app/heroes/heroes.component.1.ts" region="full">

  </code-pane>

</code-tabs>




## Dependency injection tokens
## 依赖注入令牌

When you register a provider with an injector, you associate that provider with a dependency injection token.
The injector maintains an internal *token-provider* map that it references when
asked for a dependency. The token is the key to the map.

当向注入器注册提供商时，实际上是把这个提供商和一个 DI 令牌关联起来了。
注入器维护一个内部的*令牌-提供商*映射表，这个映射表会在请求依赖时被引用到。
令牌就是这个映射表中的键值。

In all previous examples, the dependency value has been a class *instance*, and
the class *type* served as its own lookup key.
Here you get a `HeroService` directly from the injector by supplying the `HeroService` type as the token:

在前面的所有例子中，依赖值都是一个类*实例*，并且类的*类型*作为它自己的查找键值。
在下面的代码中，`HeroService`类型作为令牌，直接从注入器中获取`HeroService` 实例：


<code-example path="dependency-injection/src/app/injector.component.ts" region="get-hero-service" title="src/app/injector.component.ts" linenums="false">

</code-example>



You have similar good fortune when you write a constructor that requires an injected class-based dependency.
When you define a constructor parameter with the `HeroService` class type,
Angular knows to inject the
service associated with that `HeroService` class token:

编写需要基于类的依赖注入的构造函数对我们来说是很幸运的。
只要定义一个`HeroService`类型的构造函数参数，
Angular 就会知道把跟`HeroService`类令牌关联的服务注入进来：


<code-example path="dependency-injection/src/app/heroes/hero-list.component.ts" region="ctor-signature" title="src/app/heroes/hero-list.component.ts">

</code-example>



This is especially convenient when you consider that most dependency values are provided by classes.

这是一个特殊的规约，因为大多数依赖值都是以类的形式提供的。


{@a non-class-dependencies}


### Non-class dependencies

### 非类依赖


<p>
  What if the dependency value isn't a class? Sometimes the thing you want to inject is a
  string, function, or object.
</p>



<p>
  如果依赖值不是一个类呢？有时候想要注入的东西是一个字符串，函数或者对象。
</p>



<p>
  Applications often define configuration objects with lots of small facts
  (like the title of the application or the address of a web API endpoint)
  but these configuration objects aren't always instances of a class.
  They can be object literals such as this one:
</p>



<p>
   应用程序经常为很多很小的因素定义配置对象（例如应用程序的标题或网络API终点的地址）。
  但是这些配置对象不总是类的实例，它们可能是对象，如下面这个：
</p>



<code-example path="dependency-injection/src/app/app.config.ts" region="config" title="src/app/app-config.ts (excerpt)" linenums="false">

</code-example>



What if you'd like to make this configuration object available for injection?
You know you can register an object with a [value provider](guide/dependency-injection#value-provider).

我们想让这个配置对象在注入时可用，而且知道可以使用[值提供商](guide/dependency-injection#value-provider)来注册一个对象。


But what should you use as the token?
You don't have a class to serve as a token.
There is no `AppConfig` class.

但是，这种情况下用什么作令牌呢？
我们没办法找一个类来当作令牌，因为没有`Config`类。


<div class="l-sub-section">



### TypeScript interfaces aren't valid tokens

### TypeScript 接口不是一个有效的令牌

The `HERO_DI_CONFIG` constant has an interface, `AppConfig`. Unfortunately, you
cannot use a TypeScript interface as a token:

`CONFIG`常量有一个接口：`AppConfig`。不幸的是，不能把 TypeScript 接口用作令牌：  


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9-interface" title="src/app/providers.component.ts" linenums="false">

</code-example>



<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-9-ctor-interface" title="src/app/providers.component.ts" linenums="false">

</code-example>



That seems strange if you're used to dependency injection in strongly typed languages, where
an interface is the preferred dependency lookup key.

对于习惯于在强类型的语言中使用依赖注入的开发人员，这会看起来很奇怪，
因为在强类型语言中，接口是首选的用于查找依赖的主键。

It's not Angular's doing. An interface is a TypeScript design-time artifact. JavaScript doesn't have interfaces.
The TypeScript interface disappears from the generated JavaScript.
There is no interface type information left for Angular to find at runtime.

这不是 Angular 的错。接口只是 TypeScript 设计时 (design-time) 的概念。JavaScript 没有接口。
TypeScript 接口不会出现在生成的 JavaScript 代码中。
在运行期，没有接口类型信息可供 Angular 查找。


</div>



{@a injection-token}


### _InjectionToken_

One solution to choosing a provider token for non-class dependencies is
to define and use an <a href="../api/core/index/InjectionToken-class.html"><b>InjectionToken</b></a>.
The definition of such a token looks like this:

解决方案是为非类依赖定义和使用<a href="../api/core/index/InjectionToken-class.html"><b>InjectionToken</b></a>作为提供商令牌。
定义方式是这样的：


<code-example path="dependency-injection/src/app/app.config.ts" region="token" title="src/app/app.config.ts" linenums="false">

</code-example>



The type parameter, while optional, conveys the dependency's type to developers and tooling.
The token description is another developer aid.

类型参数，虽然是可选的，但可以向开发者和开发工具传达类型信息。
而且这个令牌的描述信息也可以为开发者提供帮助。

Register the dependency provider using the `InjectionToken` object:

使用这个`InjectionToken`对象注册依赖的提供商：


<code-example path="dependency-injection/src/app/providers.component.ts" region="providers-9" title="src/app/providers.component.ts" linenums="false">

</code-example>



Now you can inject the configuration object into any constructor that needs it, with
the help of an `@Inject` decorator:

现在，在`@Inject`装饰器的帮助下，这个配置对象可以注入到任何需要它的构造函数中：


<code-example path="dependency-injection/src/app/app.component.2.ts" region="ctor" title="src/app/app.component.ts" linenums="false">

</code-example>



<div class="l-sub-section">



Although the `AppConfig` interface plays no role in dependency injection,
it supports typing of the configuration object within the class.

虽然`AppConfig`接口在依赖注入过程中没有任何作用，但它为该类中的配置对象提供了强类型信息。


</div>



Aternatively, you can provide and inject the configuration object in an ngModule like `AppModule`.

或者在 ngModule 中提供并注入这个配置对象，如`AppModule`。


<code-example path="dependency-injection/src/app/app.module.ts" linenums="false" title="src/app/app.module.ts (ngmodule-providers)" region="ngmodule-providers">

</code-example>



<div id='optional'>

</div>



## Optional dependencies
## 可选依赖

The `HeroService` *requires* a `Logger`, but what if it could get by without
a `logger`?
You can tell Angular that the dependency is optional by annotating the
constructor argument with `@Optional()`:

`HeroService`*需要*一个`Logger`，但是如果想不提供 Logger 也能得到它，该怎么办呢？
可以把构造函数的参数标记为`@Optional()`，告诉 Angular 该依赖是可选的：


<code-example path="dependency-injection/src/app/providers.component.ts" region="import-optional">

</code-example>



<code-example path="dependency-injection/src/app/providers.component.ts" region="provider-10-ctor" linenums="false">

</code-example>



When using `@Optional()`, your code must be prepared for a null value. If you
don't register a `logger` somewhere up the line, the injector will set the
value of `logger` to null.

当使用`@Optional()`时，代码必须准备好如何处理空值。
如果其它的代码没有注册一个 `logger`，注入器会设置该`logger`的值为空 null。



## Summary
## 总结

You learned the basics of Angular dependency injection in this page.
You can register various kinds of providers,
and you know how to ask for an injected object (such as a service) by
adding a parameter to a constructor.

本章，我们学习了 Angular 依赖注入的基础知识。
我们可以注册很多种类的提供商，知道如何通过添加构造函数的参数来请求一个注入对象（例如一个服务）。

Angular dependency injection is more capable than this guide has described.
You can learn more about its advanced features, beginning with its support for
nested injectors, in
[Hierarchical Dependency Injection](guide/hierarchical-dependency-injection).

Angular 依赖注入比前面描述的更能干。
学习更多高级特性，如对嵌套注入器的支持，见[多级依赖注入](guide/hierarchical-dependency-injection)一章。



## Appendix: Working with injectors directly
## 附录：直接使用注入器

Developers rarely work directly with an injector, but
here's an `InjectorComponent` that does.

这里的`InjectorComponent`直接使用了注入器，
但我们很少直接使用它。


<code-example path="dependency-injection/src/app/injector.component.ts" region="injector" title="src/app/injector.component.ts">

</code-example>



An `Injector` is itself an injectable service.

`Injector`本身是可注入的服务。

In this example, Angular injects the component's own `Injector` into the component's constructor.
The component then asks the injected injector for the services it wants in `ngOnInit()`.

在这个例子中，Angular 把组件自身的`Injector`注入到了组件的构造函数中。
然后，组件在`ngOnInit()`中向注入的注入器请求它所需的服务。

Note that the services themselves are not injected into the component.
They are retrieved by calling `injector.get()`.

注意，这些服务本身没有注入到组件，它们是通过调用`injector.get()`获得的。

The `get()` method throws an error if it can't resolve the requested service.
You can call `get()` with a second parameter, which is the value to return if the service
is not found. Angular can't find the service if it's not registered with this or any ancestor injector.

`get()`方法如果不能解析所请求的服务，会抛出异常。
调用`get()`时，还可以使用第二个参数，一旦获取的服务没有在当前或任何祖先注入器中注册过，
就把它作为返回值。


<div class="l-sub-section">



The technique is an example of the
[service locator pattern](https://en.wikipedia.org/wiki/Service_locator_pattern).

刚描述的这项技术是[服务定位器模式](https://en.wikipedia.org/wiki/Service_locator_pattern)的一个范例。

**Avoid** this technique unless you genuinely need it.
It encourages a careless grab-bag approach such as you see here.
It's difficult to explain, understand, and test.
You can't know by inspecting the constructor what this class requires or what it will do.
It could acquire services from any ancestor component, not just its own.
You're forced to spelunk the implementation to discover what it does.

要**避免使用**此技术，除非确实需要它。
它会鼓励鲁莽的方式，就像在这里看到的。
它难以解释、理解和测试。
仅通过阅读构造函数，没法知道这个类需要什么或者它将做什么。
它可以从任何祖先组件中获得服务，而不仅仅是它自己。
会迫使我们深入它的实现，才可能明白它都做了啥。

Framework developers may take this approach when they
must acquire services generically and dynamically.

框架开发人员必须采用通用的或者动态的方式获取服务时，可能采用这个方法。


</div>




## Appendix: Why have one class per file

## 附录：为什么建议每个文件只放一个类

Having multiple classes in the same file is confusing and best avoided.
Developers expect one class per file. Keep them happy.

在同一个文件中有多个类容易造成混淆，最好避免。
开发人员期望每个文件只放一个类。这会让它们开心点。
  
If you combine the `HeroService` class with 
the `HeroesComponent` in the same file,
**define the component last**.
If you define the component before the service,
you'll get a runtime null reference error.

如果我们蔑视这个建议，并且 —— 比如说 —— 把`HeroService`和`HeroesComponent`组合在同一个文件里，
  **就得把组件定义放在最后面！**
  如果把组件定义在了服务的前面，
  在运行时抛出空指针错误。


<div class="l-sub-section">



You actually can define the component first with the help of the `forwardRef()` method as explained
in this [blog post](http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html).
But why flirt with trouble?
Avoid the problem altogether by defining components and services in separate files.

在`forwardRef()`方法的帮助下，实际上也可以先定义组件，
具体说明见这篇[博客](http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html)。
但是为什么要先给自己找麻烦呢？
还是通过在独立的文件中定义组件和服务，完全避免此问题吧。

</div>

