# NgModule FAQ

NgModules help organize an application into cohesive blocks of functionality.

NgModules 可以帮你把应用组织成一些紧密相关的代码块。

This page answers the questions many developers ask about NgModule design and implementation.

这里回答的是开发者常问起的关于 NgModule 的设计与实现问题。

## What classes should I add to the `declarations` array?

## 我应该把哪些类加到 *declarations* 中？

Add [declarable](guide/bootstrapping#the-declarations-array) classes&mdash;components, directives, and pipes&mdash;to a `declarations` list.

把[可声明](guide/bootstrapping#the-declarations-array)的类（组件、指令和管道）添加到 `declarations` 列表中。

Declare these classes in _exactly one_ module of the application.
Declare them in a module if they belong to that particular module.

这些类只能在应用程序的*一个并且只有一个*模块中声明。
只有当它们*从属于*某个模块时，才能把在*此*模块中声明它们。

<hr/>

{@a q-declarable}

## What is a _declarable_?

## 什么是*可声明的*？

Declarables are the class types&mdash;components, directives, and pipes&mdash;that
you can add to a module's `declarations` list.
They're the only classes that you can add to `declarations`.

*可声明的*就是组件、指令和管道这些可以被加到模块的 `declarations` 列表中的类。它们也是*所有*能被加到 `declarations` 中的类。

<hr/>

## What classes should I _not_ add to `declarations`?

## 哪些类*不*应该加到 `declarations` 中？

Add only [declarable](guide/bootstrapping#the-declarations-array) classes to an NgModule's `declarations` list.

只有[可声明的](guide/ngmodule-faq#q-declarable)类才能加到模块的 `declarations` 列表中。

Do *not* declare the following:

*不要*声明：

* A class that's already declared in another module, whether an app module, @NgModule, or third-party module.

   已经在其它模块中声明过的类。无论它来自应用自己的模块（@NgModule）还是第三方模块。

* An array of directives imported from another module.
For example, don't declare `FORMS_DIRECTIVES` from `@angular/forms` because the `FormsModule` already declares it.

   从其它模块中导入的指令。例如，不要声明来自 `@angular/forms` 的 FORMS_DIRECTIVES，因为 `FormsModule` 已经声明过它们了。

* Module classes.

   模块类。

* Service classes.

   服务类

* Non-Angular classes and objects, such as
strings, numbers, functions, entity models, configurations, business logic, and helper classes.

   非 Angular 的类和对象，比如：字符串、数字、函数、实体模型、配置、业务逻辑和辅助类。

<hr/>

## Why list the same component in multiple `NgModule` properties?

## 为什么要把同一个组件声明在不同的 *NgModule* 属性中？

`AppComponent` is often listed in both `declarations` and `bootstrap`.
You might see the same component listed in `declarations`, `exports`, and `entryComponents`.

`AppComponent` 经常被同时列在 `declarations` 和 `bootstrap` 中。
另外你还可能看到 `HeroComponent` 被同时列在 `declarations`、`exports` 和 `entryComponent` 中。

While that seems redundant, these properties have different functions.
Membership in one list doesn't imply membership in another list.

这*看起来*是多余的，不过这些函数具有不同的功能，从它出现在一个列表中无法推断出它也应该在另一个列表中。

* `AppComponent` could be declared in this module but not bootstrapped.

   `AppComponent` 可能被声明在此模块中，但可能不是引导组件。

* `AppComponent` could be bootstrapped in this module but declared in a different feature module.

   `AppComponent` 可能在此模块中引导，但可能是由另一个特性模块声明的。

* A component could be imported from another app module (so you can't declare it) and re-exported by this module.

   某个组件可能是从另一个应用模块中导入的（所以你没法声明它）并且被当前模块重新导出。

* A component could be exported for inclusion in an external component's template
as well as dynamically loaded in a pop-up dialog.

   某个组件可能被导出，以便用在外部组件的模板中，也可能同时被一个弹出式对话框加载。

<hr/>

## What does "Can't bind to 'x' since it isn't a known property of 'y'" mean?

## "_Can't bind to 'x' since it isn't a known property of 'y'_"是什么意思？

This error often means that you haven't declared the directive "x"
or haven't imported the NgModule to which "x" belongs.

这个错误通常意味着你或者忘了声明指令“x”，或者你没有导入“x”所属的模块。

<div class="alert is-helpful">

Perhaps you declared "x" in an application sub-module but forgot to export it.
The "x" class isn't visible to other modules until you add it to the `exports` list.

如果“x”其实不是属性，或者是组件的私有属性（比如它不带 `@Input` 或 `@Output` 装饰器），那么你也同样会遇到这个错误。

</div>

<hr/>

## What should I import?

## 我应该导入什么？

Import NgModules whose public (exported) [declarable classes](guide/bootstrapping#the-declarations-array)
you need to reference in this module's component templates.

导入你需要在当前模块的组件模板中使用的那些公开的（被导出的）[可声明类](guide/ngmodule-faq#q-declarable)。

This always means importing `CommonModule` from `@angular/common` for access to
the Angular directives such as `NgIf` and `NgFor`.
You can import it directly or from another NgModule that [re-exports](guide/ngmodule-faq#q-reexport) it.

这意味着要从 `@angular/common` 中导入 `CommonModule` 才能访问 Angular 的内置指令，比如 `NgIf` 和 `NgFor`。
你可以直接导入它或者从[重新导出](guide/ngmodule-faq#q-reexport)过该模块的其它模块中导入它。

Import `FormsModule` from `@angular/forms`
if your components have `[(ngModel)]` two-way binding expressions.

如果你的组件有 `[(ngModel)]` 双向绑定表达式，就要从 `@angular/forms` 中导入 `FormsModule`。

Import _shared_ and _feature_ modules when this module's components incorporate their
components, directives, and pipes.

如果当前模块中的组件包含了*共享*模块和*特性*模块中的组件、指令和管道，就导入这些模块。

Import [BrowserModule](guide/ngmodule-faq#q-browser-vs-common-module) only in the root `AppModule`.

只能在根模块 `AppModule` 中[导入 _BrowserModule_](guide/ngmodule-faq#q-browser-vs-common-module)。

<hr/>

{@a q-browser-vs-common-module}

## Should I import `BrowserModule` or `CommonModule`?

## 我应该导入 *BrowserModule* 还是 *CommonModule*？

The root application module, `AppModule`, of almost every browser application
should import `BrowserModule` from `@angular/platform-browser`.

几乎所有要在浏览器中使用的应用的**根模块**（`AppModule`）都应该从 `@angular/platform-browser` 中导入 `BrowserModule`。

`BrowserModule` provides services that are essential to launch and run a browser app.

`BrowserModule` 提供了启动和运行浏览器应用的那些基本的服务提供者。

`BrowserModule` also re-exports `CommonModule` from `@angular/common`,
which means that components in the `AppModule` module also have access to
the Angular directives every app needs, such as `NgIf` and `NgFor`.

`BrowserModule` 还从 `@angular/common` 中重新导出了 `CommonModule`，这意味着 `AppModule` 中的组件也同样可以访问那些每个应用都需要的 Angular 指令，如 `NgIf` 和 `NgFor`。

Do not import `BrowserModule` in any other module.
*Feature modules* and *lazy-loaded modules* should import `CommonModule` instead.
They need the common directives. They don't need to re-install the app-wide providers.

在其它任何模块中都*不要导入*`BrowserModule`。
*特性模块*和*惰性加载模块*应该改成导入 `CommonModule`。
它们需要通用的指令。它们不需要重新初始化全应用级的提供者。

Importing `CommonModule` also frees feature modules for use on _any_ target platform, not just browsers.

特性模块中导入 `CommonModule` 可以让它能用在任何目标平台上，不仅是浏览器。那些跨平台库的作者应该喜欢这种方式的。

<hr/>

{@a q-reimport}

## What if I import the same module twice?

## 如果我两次导入同一个模块会怎么样？

That's not a problem. When three modules all import Module 'A',
Angular evaluates Module 'A' once, the first time it encounters it, and doesn't do so again.

没有任何问题。当三个模块全都导入模块'A'时，Angular 只会首次遇到时加载一次模块'A'，之后就不会这么做了。

That's true at whatever level `A` appears in a hierarchy of imported NgModules.
When Module 'B' imports Module 'A', Module 'C' imports 'B', and Module 'D' imports `[C, B, A]`,
then 'D' triggers the evaluation of 'C', which triggers the evaluation of 'B', which evaluates 'A'.
When Angular gets to the 'B' and 'A' in 'D', they're already cached and ready to go.

无论 `A` 出现在所导入模块的哪个层级，都会如此。
如果模块'B'导入模块'A'、模块'C'导入模块'B'，模块'D'导入 `[C, B, A]`，那么'D'会触发模块'C'的加载，'C'会触发'B'的加载，而'B'会加载'A'。
当 Angular 在'D'中想要获取'B'和'A'时，这两个模块已经被缓存过了，可以立即使用。

Angular doesn't like NgModules with circular references, so don't let Module 'A' import Module 'B', which imports Module 'A'.

Angular 不允许模块之间出现循环依赖，所以不要让模块'A'导入模块'B'，而模块'B'又导入模块'A'。

<hr/>

{@a q-reexport}

## What should I export?

## 我应该导出什么？

Export [declarable](guide/bootstrapping#the-declarations-array) classes that components in _other_ NgModules
are able to reference in their templates. These are your _public_ classes.
If you don't export a declarable class, it stays _private_, visible only to other components
declared in this NgModule.

导出那些*其它模块*希望在自己的模板中引用的[可声明类](guide/ngmodule-faq#q-declarable)。这些也是你的*公共*类。
如果你不导出某个类，它就是*私有的*，只对当前模块中声明的其它组件可见。

You _can_ export any declarable class&mdash;components, directives, and pipes&mdash;whether
it's declared in this NgModule or in an imported NgModule.

你*可以*导出任何可声明类（组件、指令和管道），而不用管它是声明在当前模块中还是某个导入的模块中。

You _can_ re-export entire imported NgModules, which effectively re-exports all of their exported classes.
An NgModule can even export a module that it doesn't import.

你*可以*重新导出整个导入过的模块，这将导致重新导出它们导出的所有类。重新导出的模块甚至不用先导入。

<hr/>

## What should I *not* export?

## 我*不应该*导出什么？

Don't export the following:

*不要*导出：

* Private components, directives, and pipes that you need only within components declared in this NgModule.
If you don't want another NgModule to see it, don't export it.

   那些你只想在当前模块中声明的那些组件中使用的私有组件、指令和管道。如果你不希望任何模块看到它，就不要导出。

* Non-declarable objects such as services, functions, configurations, and entity models.

   不可声明的对象，比如服务、函数、配置、实体模型等。

* Components that are only loaded dynamically by the router or by bootstrapping.
Such [entry components](guide/ngmodule-faq#q-entry-component-defined) can never be selected in another component's template.
While there's no harm in exporting them, there's also no benefit.

   那些只被路由器或引导函数动态加载的组件。
      比如[入口组件](guide/ngmodule-faq#q-entry-component-defined)可能从来不会在其它组件的模板中出现。
      导出它们没有坏处，但也没有好处。

* Pure service modules that don't have public (exported) declarations.
For example, there's no point in re-exporting `HttpClientModule` because it doesn't export anything.
Its only purpose is to add http service providers to the application as a whole.

   纯服务模块没有公开（导出）的声明。
  例如，没必要重新导出 `HttpClientModule`，因为它不导出任何东西。
  它唯一的用途是一起把 http 的那些服务提供者添加到应用中。

<hr/>

## Can I re-export classes and modules?

## 我可以重新导出类和模块吗？

Absolutely.

毫无疑问！

NgModules are a great way to selectively aggregate classes from other NgModules and
re-export them in a consolidated, convenience module.

模块是从其它模块中选取类并把它们重新导出成统一、便利的新模块的最佳方式。

An NgModule can re-export entire NgModules, which effectively re-exports all of their exported classes.
Angular's own `BrowserModule` exports a couple of NgModules like this:

模块可以重新导出其它模块，这会导致重新导出它们导出的所有类。
Angular 自己的 `BrowserModule` 就重新导出了一组模块，例如：

```typescript

  exports: [CommonModule, ApplicationModule]

```

An NgModule can export a combination of its own declarations, selected imported classes, and imported NgModules.

模块还能导出一个组合，它可以包含自己的声明、某些导入的类以及导入的模块。

Don't bother re-exporting pure service modules.
Pure service modules don't export [declarable](guide/bootstrapping#the-declarations-array) classes that another NgModule could use.
For example, there's no point in re-exporting `HttpClientModule` because it doesn't export anything.
Its only purpose is to add http service providers to the application as a whole.

不要费心去导出纯服务类。
纯服务类的模块不会导出任何可供其它模块使用的[可声明类](guide/ngmodule-faq#q-declarable)。
例如，不用重新导出 `HttpClientModule`，因为它没有导出任何东西。
它唯一的用途是把那些 http 服务提供者一起添加到应用中。

<hr/>

## What is the `forRoot()` method?

## *forRoot()*方法是什么？

The `forRoot()` static method is a convention that makes it easy for developers to configure services and providers that are intended to be singletons. A good example of `forRoot()` is the `RouterModule.forRoot()` method.

静态方法 `forRoot()` 是一个约定，它可以让开发人员更轻松的配置模块的想要单例使用的服务及其提供者。`RouterModule.forRoot()` 就是一个很好的例子。

Apps pass a `Routes` object to `RouterModule.forRoot()` in order to configure the app-wide `Router` service with routes.
`RouterModule.forRoot()` returns a [ModuleWithProviders](api/core/ModuleWithProviders).
You add that result to the `imports` list of the root `AppModule`.

应用把一个 `Routes` 对象传给 `RouterModule.forRoot()`，为的就是使用路由配置全应用级的 `Router` 服务。
`RouterModule.forRoot()` 返回一个[ModuleWithProviders](api/core/ModuleWithProviders)对象。
你把这个结果添加到根模块 `AppModule` 的 `imports` 列表中。

Only call and import a `forRoot()` result in the root application module, `AppModule`.
Avoid importing it in any other module, particularly in a lazy-loaded module. For more
information on `forRoot()` see [the `forRoot()` pattern](guide/singleton-services#the-forroot-pattern) section of the [Singleton Services](guide/singleton-services) guide.

只能在应用的根模块 `AppModule` 中调用并导入 `forRoot()` 的结果。
在其它模块，特别是惰性加载模块中，不要导入它。
要了解关于 `forRoot()` 的更多信息，参见[单例服务](guide/singleton-services)一章的 [the `forRoot()` 模式](guide/singleton-services#the-forroot-pattern)部分。

For a service, instead of using `forRoot()`,  specify `providedIn: 'root'` on the service's `@Injectable()` decorator, which
makes the service automatically available to the whole application and thus singleton by default.

对于服务来说，除了可以使用 `forRoot()` 外，更好的方式是在该服务的 `@Injectable()` 装饰器中指定 `providedIn: 'root'`，它让该服务自动在全应用级可用，这样它也就默认是单例的。

`RouterModule` also offers a `forChild()` static method for configuring the routes of lazy-loaded modules.

`RouterModule` 也提供了静态方法 `forChild()`，用于配置惰性加载模块的路由。

`forRoot()` and `forChild()` are conventional names for methods that
configure services in root and feature modules respectively.

`forRoot()` 和 `forChild()` 都是约定俗成的方法名，它们分别用于在根模块和特性模块中配置服务。

Follow this convention when you write similar modules with configurable service providers.

当你写类似的需要可配置的服务提供者时，请遵循这个约定。

<hr/>

## Why is a service provided in a feature module visible everywhere?

## 为什么服务提供者在特性模块中的任何地方都是可见的？

Providers listed in the `@NgModule.providers` of a bootstrapped module have application scope.
Adding a service provider to `@NgModule.providers` effectively publishes the service to the entire application.

列在引导模块的 `@NgModule.providers` 中的服务提供者具有**全应用级作用域**。
往 `NgModule.providers` 中添加服务提供者将导致该服务被发布到整个应用中。

When you import an NgModule,
Angular adds the module's service providers (the contents of its `providers` list)
to the application root injector.

当你导入一个模块时，Angular 就会把该模块的服务提供者（也就是它的 `providers` 列表中的内容）加入该应用的*根注入器*中。

This makes the provider visible to every class in the application that knows the provider's lookup token, or name.

这会让该提供者对应用中所有知道该提供者令牌（token）的类都可见。

Extensibility through NgModule imports is a primary goal of the NgModule system.
Merging NgModule providers into the application injector
makes it easy for a module library to enrich the entire application with new services.
By adding the `HttpClientModule` once, every application component can make HTTP requests.

通过 NgModule 导入来实现可扩展性是 NgModule 体系的主要设计目标。
把 NgModule 的提供者并入应用程序的注入器可以让库模块使用新的服务来强化应用程序变得更容易。
只要添加一次 `HttpClientModule`，那么应用中的每个组件就都可以发起 Http 请求了。

However, this might feel like an unwelcome surprise if you expect the module's services
to be visible only to the components declared by that feature module.
If the `HeroModule` provides the `HeroService` and the root `AppModule` imports `HeroModule`,
any class that knows the `HeroService` _type_ can inject that service,
not just the classes declared in the `HeroModule`.

不过，如果你期望模块的服务只对那个特性模块内部声明的组件可见，那么这可能会带来一些不受欢迎的意外。
如果 `HeroModule` 提供了一个 `HeroService`，并且根模块 `AppModule` 导入了 `HeroModule`，那么任何知道 `HeroService`*类型*的类都可能注入该服务，而不仅是在 `HeroModule` 中声明的那些类。

To limit access to a service, consider lazy loading the NgModule that provides that service. See [How do I restrict service scope to a module?](guide/ngmodule-faq#service-scope) for more information.

要限制对某个服务的访问，可以考虑惰性加载提供该服务的 NgModule。参见[我要如何把服务的范围限定为某个模块？](guide/ngmodule-faq#service-scope)。

<hr/>

{@a q-lazy-loaded-module-provider-visibility}

## Why is a service provided in a lazy-loaded module visible only to that module?

## 为什么在惰性加载模块中声明的服务提供者只对该模块自身可见？

Unlike providers of the modules loaded at launch,
providers of lazy-loaded modules are *module-scoped*.

和启动时就加载的模块中的提供者不同，惰性加载模块中的提供者是*局限于模块*的。

When the Angular router lazy-loads a module, it creates a new execution context.
That [context has its own injector](guide/ngmodule-faq#q-why-child-injector "Why Angular creates a child injector"),
which is a direct child of the application injector.

当 Angular 路由器惰性加载一个模块时，它创建了一个新的运行环境。
那个环境[拥有自己的注入器](guide/ngmodule-faq#q-why-child-injector "为什么 Angular 会创建子注入器")，它是应用注入器的直属子级。

The router adds the lazy module's providers and the providers of its imported NgModules to this child injector.

路由器把该惰性加载模块的提供者和它导入的模块的提供者添加到这个子注入器中。

These providers are insulated from changes to application providers with the same lookup token.
When the router creates a component within the lazy-loaded context,
Angular prefers service instances created from these providers to the service instances of the application root injector.

这些提供者不会被拥有相同令牌的应用级别提供者的变化所影响。
当路由器在惰性加载环境中创建组件时，Angular 优先使用惰性加载模块中的服务实例，而不是来自应用的根注入器的。

<hr/>

## What if two modules provide the same service?

## 如果两个模块提供了*同一个*服务会怎么样？

When two imported modules, loaded at the same time, list a provider with the same token,
the second module's provider "wins". That's because both providers are added to the same injector.

当同时加载了两个导入的模块，它们都列出了使用同一个令牌的提供者时，后导入的模块会“获胜”，这是因为这两个提供者都被添加到了同一个注入器中。

When Angular looks to inject a service for that token,
it creates and delivers the instance created by the second provider.

当 Angular 尝试根据令牌注入服务时，它使用第二个提供者来创建并交付服务实例。

_Every_ class that injects this service gets the instance created by the second provider.
Even classes declared within the first module get the instance created by the second provider.

*每个*注入了该服务的类获得的都是由第二个提供者创建的实例。
即使是声明在第一个模块中的类，它取得的实例也是来自第二个提供者的。

If NgModule A provides a service for token 'X' and imports an NgModule B
that also provides a service for token 'X', then NgModule A's service definition "wins".

如果模块 A 提供了一个使用令牌'X'的服务，并且导入的模块 B 也用令牌'X'提供了一个服务，那么模块 A 中定义的服务“获胜”了。

The service provided by the root `AppModule` takes precedence over services provided by imported NgModules.
The `AppModule` always wins.

由根 `AppModule` 提供的服务相对于所导入模块中提供的服务有优先权。换句话说：`AppModule` 总会获胜。

<hr/>

{@a service-scope}

## How do I restrict service scope to a module?

## 我应该如何把服务的范围限制到模块中？

When a module is loaded at application launch,
its `@NgModule.providers` have *application-wide scope*;
that is, they are available for injection throughout the application.

如果一个模块在应用程序启动时就加载，它的 `@NgModule.providers` 具有***全应用级作用域***。
它们也可用于整个应用的注入中。

Imported providers are easily replaced by providers from another imported NgModule.
Such replacement might be by design. It could be unintentional and have adverse consequences.

导入的提供者很容易被由其它导入模块中的提供者替换掉。
这虽然是故意这样设计的，但是也可能引起意料之外的结果。

As a general rule, import modules with providers _exactly once_, preferably in the application's _root module_.
That's also usually the best place to configure, wrap, and override them.

作为一个通用的规则，应该*只导入一次*带提供者的模块，最好在应用的*根模块*中。
那里也是配置、包装和改写这些服务的最佳位置。

Suppose a module requires a customized `HttpBackend` that adds a special header for all Http requests.
If another module elsewhere in the application also customizes `HttpBackend`
or merely imports the `HttpClientModule`, it could override this module's `HttpBackend` provider,
losing the special header. The server will reject http requests from this module.

假设模块需要一个定制过的 `HttpBackend`，它为所有的 Http 请求添加一个特别的请求头。
  如果应用中其它地方的另一个模块也定制了 `HttpBackend` 或仅仅导入了 `HttpClientModule`，它就会改写当前模块的 `HttpBackend` 提供者，丢掉了这个特别的请求头。
  这样服务器就会拒绝来自该模块的请求。

To avoid this problem, import the `HttpClientModule` only in the `AppModule`, the application _root module_.

要消除这个问题，就只能在应用的根模块 `AppModule` 中导入 `HttpClientModule`。

If you must guard against this kind of "provider corruption", *don't rely on a launch-time module's `providers`.*

如果你必须防范这种“提供者腐化”现象，那就*不要依赖于“启动时加载”模块的 `providers`*。

Load the module lazily if you can.
Angular gives a [lazy-loaded module](guide/ngmodule-faq#q-lazy-loaded-module-provider-visibility) its own child injector.
The module's providers are visible only within the component tree created with this injector.

只要可能，就让模块惰性加载。
Angular 给了[惰性加载模块](guide/ngmodule-faq#q-lazy-loaded-module-provider-visibility)自己的子注入器。
该模块中的提供者只对由该注入器创建的组件树可见。

If you must load the module eagerly, when the application starts,
*provide the service in a component instead.*

如果你必须在应用程序启动时主动加载该模块，***就改成在组件中提供该服务***。

Continuing with the same example, suppose the components of a module truly require a private, custom `HttpBackend`.

继续看这个例子，假设某个模块的组件真的需要一个私有的、自定义的 `HttpBackend`。

Create a "top component" that acts as the root for all of the module's components.
Add the custom `HttpBackend` provider to the top component's `providers` list rather than the module's `providers`.
Recall that Angular creates a child injector for each component instance and populates the injector
with the component's own providers.

那就创建一个“顶层组件”来扮演该模块中所有组件的根。
把这个自定义的 `HttpBackend` 提供者添加到这个顶层组件的 `providers` 列表中，而不是该模块的 `providers` 中。
回忆一下，Angular 会为每个组件实例创建一个子注入器，并使用组件自己的 `providers` 来配置这个注入器。

When a child of this component asks for the `HttpBackend` service,
Angular provides the local `HttpBackend` service,
not the version provided in the application root injector.
Child components make proper HTTP requests no matter what other modules do to `HttpBackend`.

当该组件的子组件*想要*一个 `HttpBackend` 服务时，Angular 会提供一个局部的 `HttpBackend` 服务，而不是应用的根注入器创建的那个。
子组件将正确发起 http 请求，而不管其它模块对 `HttpBackend` 做了什么。

Be sure to create module components as children of this module's top component.

确保把模块中的组件都创建成这个顶层组件的子组件。

You can embed the child components in the top component's template.
Alternatively, make the top component a routing host by giving it a `<router-outlet>`.
Define child routes and let the router load module components into that outlet.

你可以把这些子组件都嵌在顶层组件的模板中。或者，给顶层组件一个 `<router-outlet>`，让它作为路由的宿主。
定义子路由，并让路由器把模块中的组件加载进该路由出口（outlet）中。

Though you can limit access to a service by providing it in a lazy loaded module or providing it in a component, providing services in a component can lead to multiple instances of those services. Thus, the lazy loading is preferable.

虽然通过在惰性加载模块中或组件中提供某个服务来限制它的访问都是可行的方式，但在组件中提供服务可能导致这些服务出现多个实例。因此，应该优先使用惰性加载的方式。

<hr/>

{@a q-root-component-or-module}

## Should I add application-wide providers to the root `AppModule` or the root `AppComponent`?

## 我应该把全应用级提供者添加到根模块 `AppModule` 中还是根组件 `AppComponent` 中？

 Define application-wide providers by specifying `providedIn: 'root'` on its `@Injectable()` decorator (in the case of services) or at `InjectionToken` construction (in the case where tokens are provided). Providers that are created this way automatically are made available to the entire application and don't need to be listed in any module.

通过在服务的 `@Injectable()` 装饰器中（例如服务）指定 `providedIn: 'root'` 来定义全应用级提供者，或者 `InjectionToken` 的构造器（例如提供令牌的地方），都可以定义全应用级提供者。
通过这种方式创建的服务提供者会自动在整个应用中可用，而不用把它列在任何模块中。

If a provider cannot be configured in this way (perhaps because it has no sensible default value), then register application-wide providers in the root `AppModule`, not in the `AppComponent`.

如果某个提供者不能用这种方式配置（可能因为它没有有意义的默认值），那就在根模块 `AppModule` 中注册这些全应用级服务，而不是在 `AppComponent` 中。

Lazy-loaded modules and their components can inject `AppModule` services;
they can't inject `AppComponent` services.

惰性加载模块及其组件可以注入 `AppModule` 中的服务，却不能注入 `AppComponent` 中的。

Register a service in `AppComponent` providers _only_ if the service must be hidden
from components outside the `AppComponent` tree. This is a rare use case.

*只有*当该服务必须对 `AppComponent` 组件树之外的组件不可见时，才应该把服务注册进 `AppComponent` 的 `providers` 中。
这是一个非常罕见的异常用法。

More generally, [prefer registering providers in NgModules](guide/ngmodule-faq#q-component-or-module) to registering in components.

更一般地说，[优先把提供者注册进模块中](guide/ngmodule-faq#q-component-or-module)，而不是组件中。

<h3 class="no-toc">Discussion</h3>

<h3 class="no-toc">讨论</h3>

Angular registers all startup module providers with the application root injector.
The services that root injector providers create have application scope, which
means they are available to the entire application.

Angular 把所有启动期模块的提供者都注册进了应用的根注入器中。
这些服务是由根注入器中的提供者创建的，并且在整个应用中都可用。
它们具有*应用级作用域*。

Certain services, such as the `Router`, only work when you register them in the application root injector.

某些服务（比如 `Router`）只有当注册进应用的根注入器时才能正常工作。

By contrast, Angular registers `AppComponent` providers with the `AppComponent`'s own injector.
`AppComponent` services are available only to that component and its component tree.
They have component scope.

相反，Angular 使用 `AppComponent` 自己的注入器注册了 `AppComponent` 的提供者。
`AppComponent` 服务只在该组件及其子组件树中才能使用。
它们具有*组件级作用域*。

The `AppComponent`'s injector is a child of the root injector, one down in the injector hierarchy.
For applications that don't use the router, that's almost the entire application.
But in routed applications, routing operates at the root level
where `AppComponent` services don't exist.
This means that lazy-loaded modules can't reach them.

`AppComponent` 的注入器是根注入器的*子级*，注入器层次中的下一级。
这对于没有路由器的应用来说*几乎是*整个应用了。
但对那些带路由的应用，路由操作位于顶层，那里不存在 `AppComponent` 服务。这意味着惰性加载模块不能使用它们。

<hr/>

{@a q-component-or-module}

## Should I add other providers to a module or a component?

## 我应该把其它提供者注册到模块中还是组件中？

Providers should be configured using `@Injectable` syntax. If possible, they should be provided in the application root (`providedIn: 'root'`). Services that are configured this way are lazily loaded if they are only used from a lazily loaded context.

提供者应该使用 `@Injectable` 语法进行配置。只要可能，就应该把它们在应用的根注入器中提供（`providedIn: 'root'`）。
如果它们只被惰性加载的上下文中使用，那么这种方式配置的服务就是惰性加载的。

If it's the consumer's decision whether a provider is available application-wide or not,
then register providers in modules (`@NgModule.providers`) instead of registering in components (`@Component.providers`).

如果要由消费方来决定是否把它作为全应用级提供者，那么就要在模块中（`@NgModule.providers`）注册提供者，而不是组件中（`@Component.providers`）。

Register a provider with a component when you _must_ limit the scope of a service instance
to that component and its component tree.
Apply the same reasoning to registering a provider with a directive.

当你*必须*把服务实例的范围限制到某个组件及其子组件树时，就把提供者注册到该组件中。
指令的提供者也同样照此处理。

For example, an editing component that needs a private copy of a caching service should register
the service with the component.
Then each new instance of the component gets its own cached service instance.
The changes that editor makes in its service don't touch the instances elsewhere in the application.

例如，如果英雄编辑组件需要自己私有的缓存英雄服务实例，那就应该把 `HeroService` 注册进 `HeroEditorComponent` 中。
这样，每个新的 `HeroEditorComponent` 的实例都会得到一份自己的缓存服务实例。
编辑器的改动只会作用于它自己的服务，而不会影响到应用中其它地方的英雄实例。

[Always register _application-wide_ services with the root `AppModule`](guide/ngmodule-faq#q-root-component-or-module),
not the root `AppComponent`.

[总是在根模块 `AppModule` 中注册*全应用级*服务](guide/ngmodule-faq#q-root-component-or-module)，而不要在根组件 `AppComponent` 中。

<hr/>

{@a q-why-bad}

## Why is it bad if a shared module provides a service to a lazy-loaded module?

## 为什么在共享模块中为惰性加载模块提供服务是个馊主意？

### The eagerly loaded scenario

### 急性加载的场景

When an eagerly loaded module provides a service, for example a `UserService`, that service is available application-wide. If the root module provides `UserService` and
imports another module that provides the same `UserService`, Angular registers one of
them in the root app injector (see [What if I import the same module twice?](guide/ngmodule-faq#q-reimport)).

当急性加载的模块提供了服务时，比如 `UserService`，该服务是在全应用级可用的。如果根模块提供了 `UserService`，并导入了另一个也提供了同一个 `UserService` 的模块，Angular 就会把它们中的一个注册进应用的根注入器中（参见[如果两次导入了同一个模块会怎样？](guide/ngmodule-faq#q-reimport)）。

Then, when some component injects `UserService`, Angular finds it in the app root injector,
and delivers the app-wide singleton service. No problem.

然后，当某些组件注入 `UserService` 时，Angular 就会发现它已经在应用的根注入器中了，并交付这个全应用级的单例服务。这样不会出现问题。

### The lazy loaded scenario

### 惰性加载场景

Now consider a lazy loaded module that also provides a service called `UserService`.

现在，考虑一个惰性加载的模块，它也提供了一个名叫 `UserService` 的服务。

When the router lazy loads a module, it creates a child injector and registers the `UserService`
provider with that child injector. The child injector is _not_ the root injector.

当路由器准备惰性加载 `HeroModule` 的时候，它会创建一个子注入器，并且把 `UserService` 的提供者注册到那个子注入器中。子注入器和根注入器是*不同*的。

When Angular creates a lazy component for that module and injects `UserService`,
it finds a `UserService` provider in the lazy module's _child injector_
and creates a _new_ instance of the `UserService`.
This is an entirely different `UserService` instance
than the app-wide singleton version that Angular injected in one of the eagerly loaded components.

当 Angular 创建一个惰性加载的 `HeroComponent` 时，它必须注入一个 `UserService`。
这次，它会从惰性加载模块的*子注入器*中查找 `UserService` 的提供者，并用它创建一个 `UserService` 的新实例。
这个 `UserService` 实例与 Angular 在主动加载的组件中注入的那个全应用级单例对象截然不同。

This scenario causes your app to create a new instance every time, instead of using the singleton.

这个场景导致你的应用每次都创建一个新的服务实例，而不是使用单例的服务。

<!--KW--What does this cause? I wasn't able to get the suggestion of this to work from
the current FAQ:
To demonstrate, run the <live-example name="ngmodule">live example</live-example>.
Modify the `SharedModule` so that it provides the `UserService` rather than the `CoreModule`.
Then toggle between the "Contact" and "Heroes" links a few times.
The username goes bonkers as the Angular creates a new `UserService` instance each time.
I'd like to see the error so I can include it.-->

<hr/>

{@a q-why-child-injector}

## Why does lazy loading create a child injector?

## 为什么惰性加载模块会创建一个子注入器？

Angular adds `@NgModule.providers` to the application root injector, unless the NgModule is lazy-loaded.
For a lazy-loaded NgModule, Angular creates a _child injector_ and adds the module's providers to the child injector.

Angular 会把 `@NgModule.providers` 中的提供者添加到应用的根注入器中……
除非该模块是惰性加载的，这种情况下，Angular 会创建一*子注入器*，并且把该模块的提供者添加到这个子注入器中。

This means that an NgModule behaves differently depending on whether it's loaded during application start
or lazy-loaded later. Neglecting that difference can lead to [adverse consequences](guide/ngmodule-faq#q-why-bad).

这意味着模块的行为将取决于它是在应用启动期间加载的还是后来惰性加载的。如果疏忽了这一点，可能导致[严重后果](guide/ngmodule-faq#q-why-bad)。

Why doesn't Angular add lazy-loaded providers to the app root injector as it does for eagerly loaded NgModules?

为什么 Angular 不能像主动加载模块那样把惰性加载模块的提供者也添加到应用程序的根注入器中呢？为什么会出现这种不一致？

The answer is grounded in a fundamental characteristic of the Angular dependency-injection system.
An injector can add providers _until it's first used_.
Once an injector starts creating and delivering services, its provider list is frozen; no new providers are allowed.

归根结底，这来自于 Angular 依赖注入系统的一个基本特征：
在注入器还没有被第一次使用之前，可以不断为其添加提供者。
一旦注入器已经创建和开始交付服务，它的提供者列表就被冻结了，不再接受新的提供者。

When an applications starts, Angular first configures the root injector with the providers of all eagerly loaded NgModules
_before_ creating its first component and injecting any of the provided services.
Once the application begins, the app root injector is closed to new providers.

当应用启动时，Angular 会首先使用所有主动加载模块中的提供者来配置根注入器，这发生在它创建第一个组件以及注入任何服务之前。
一旦应用开始工作，应用的根注入器就不再接受新的提供者了。

Time passes and application logic triggers lazy loading of an NgModule.
Angular must add the lazy-loaded module's providers to an injector somewhere.
It can't add them to the app root injector because that injector is closed to new providers.
So Angular creates a new child injector for the lazy-loaded module context.

之后，应用逻辑开始惰性加载某个模块。
Angular 必须把这个惰性加载模块中的提供者添加到*某个*注入器中。
但是它无法将它们添加到应用的根注入器中，因为根注入器已经不再接受新的提供者了。
于是，Angular 在惰性加载模块的上下文中创建了一个新的子注入器。

<hr/>

{@a q-is-it-loaded}

## How can I tell if an NgModule or service was previously loaded?

## 我要如何知道一个模块或服务是否已经加载过了？

Some NgModules and their services should be loaded only once by the root `AppModule`.
Importing the module a second time by lazy loading a module could [produce errant behavior](guide/ngmodule-faq#q-why-bad)
that may be difficult to detect and diagnose.

某些模块及其服务只能被根模块 `AppModule` 加载一次。
  在惰性加载模块中再次导入这个模块会[导致错误的行为](guide/ngmodule-faq#q-why-bad)，这个错误可能非常难于检测和诊断。

To prevent this issue, write a constructor that attempts to inject the module or service
from the root app injector. If the injection succeeds, the class has been loaded a second time.
You can throw an error or take other remedial action.

为了防范这种风险，可以写一个构造函数，它会尝试从应用的根注入器中注入该模块或服务。如果这种注入成功了，那就说明这个类是被第二次加载的，你就可以抛出一个错误，或者采取其它挽救措施。

Certain NgModules, such as `BrowserModule`, implement such a guard.
Here is a custom constructor for an NgModule called `GreetingModule`.

某些 NgModule（例如 `BrowserModule`）就实现了那样一个守卫。
下面是一个名叫 `GreetingModule` 的 NgModule 的 自定义构造函数。

<code-example path="ngmodules/src/app/greeting/greeting.module.ts" region="ctor" header="src/app/greeting/greeting.module.ts (Constructor)"></code-example>

<hr/>

{@a q-entry-component-defined}

## What is an `entry component`?

## 什么是*入口组件*？

An entry component is any component that Angular loads _imperatively_ by type.

Angular 根据组件类型*命令式*加载的组件是*入口组件*.

A component loaded _declaratively_ via its selector is _not_ an entry component.

而通过组件选择器*声明式*加载的组件则*不是*入口组件。

Angular loads a component declaratively when
using the component's selector to locate the element in the template.
Angular then creates the HTML representation of the component and inserts it into the DOM at the selected element. These aren't entry components.

Angular 会声明式的加载组件，它使用组件的选择器在模板中定位元素。
然后，Angular 会创建该组件的 HTML 表示，并把它插入 DOM 中所选元素的内部。它们不是入口组件。

The bootstrapped root `AppComponent` is an _entry component_.
True, its selector matches an element tag in `index.html`.
But `index.html` isn't a component template and the `AppComponent`
selector doesn't match an element in any component template.

而用于引导的根 `AppComponent` 则是一个*入口组件*。
虽然它的选择器匹配了 `index.html` 中的一个元素，但是 `index.html` 并不是组件模板，而且 `AppComponent` 选择器也不会在任何组件模板中出现。

Components in route definitions are also _entry components_.
A route definition refers to a component by its _type_.
The router ignores a routed component's selector, if it even has one, and
loads the component dynamically into a `RouterOutlet`.

在路由定义中用到的组件也同样是*入口组件*。
路由定义根据*类型*来引用组件。
路由器会忽略路由组件的选择器（即使它有选择器），并且把该组件动态加载到 `RouterOutlet` 中。

For more information, see [Entry Components](guide/entry-components).

要了解更多，参见[入口组件](guide/entry-components)一章。

<hr/>

## What's the difference between a _bootstrap_ component and an _entry component_?

## *引导组件*和*入口组件*有什么不同？

A bootstrapped component _is_ an [entry component](guide/ngmodule-faq#q-entry-component-defined)
that Angular loads into the DOM during the bootstrap process (application launch).
Other entry components are loaded dynamically by other means, such as with the router.

引导组件是[入口组件](guide/ngmodule-faq#q-entry-component-defined)的一种。
它是被 Angular 的引导（应用启动）过程加载到 DOM 中的入口组件。
其它入口组件则是被其它方式动态加载的，比如被路由器加载。

The `@NgModule.bootstrap` property tells the compiler that this is an entry component _and_
it should generate code to bootstrap the application with this component.

`@NgModule.bootstrap` 属性告诉编译器这是一个入口组件，同时它应该生成一些代码来用该组件引导此应用。

There's no need to list a component in both the `bootstrap` and `entryComponents` lists,
although doing so is harmless.

不需要把组件同时列在 `bootstrap` 和 `entryComponent` 列表中 —— 虽然这样做也没坏处。

For more information, see [Entry Components](guide/entry-components).

要了解更多，参见[入口组件](guide/entry-components)一章。

<hr/>

## When do I add components to _entryComponents_?

## 什么时候我应该把组件加到 `entryComponents` 中？

Most application developers won't need to add components to the `entryComponents`.

大多数应用开发者都不需要把组件添加到 `entryComponents` 中。

Angular adds certain components to _entry components_ automatically.
Components listed in `@NgModule.bootstrap` are added automatically.
Components referenced in router configuration are added automatically.
These two mechanisms account for almost all entry components.

Angular 会自动把恰当的组件添加到*入口组件*中。
列在 `@NgModule.bootstrap` 中的组件会自动加入。
由路由配置引用到的组件会被自动加入。
用这两种机制添加的组件在入口组件中占了绝大多数。

If your app happens to bootstrap or dynamically load a component _by type_ in some other manner,
you must add it to `entryComponents` explicitly.

如果你的应用要用其它手段来*根据类型*引导或动态加载组件，那就得把它显式添加到 `entryComponents` 中。

Although it's harmless to add components to this list,
it's best to add only the components that are truly _entry components_.
Don't include components that [are referenced](guide/ngmodule-faq#q-template-reference)
in the templates of other components.

虽然把组件加到这个列表中也没什么坏处，不过最好还是只添加真正的*入口组件*。
不要添加那些被其它组件的模板[引用过](guide/ngmodule-faq#q-template-reference)的组件。

For more information, see [Entry Components](guide/entry-components).

要了解更多，参见[入口组件](guide/entry-components)一章。

<hr/>

## Why does Angular need _entryComponents_?

## 为什么 Angular 需要*入口组件*？

The reason is _tree shaking_. For production apps you want to load the smallest, fastest code possible. The code should contain only the classes that you actually need.
It should exclude a component that's never used, whether or not that component is declared.

原因在于*摇树优化*。对于产品化应用，你会希望加载尽可能小而快的代码。
代码中应该仅仅包括那些实际用到的类。
它应该排除那些从未用过的组件，无论该组件是否被声明过。

In fact, many libraries declare and export components you'll never use.
If you don't reference them, the tree shaker drops these components from the final code package.

事实上，大多数库中声明和导出的组件你都用不到。
如果你从未引用它们，那么*摇树优化器*就会从最终的代码包中把这些组件砍掉。

If the [Angular compiler](guide/ngmodule-faq#q-angular-compiler) generated code for every declared component, it would defeat the purpose of the tree shaker.

如果[Angular 编译器](guide/ngmodule-faq#q-angular-compiler)为每个声明的组件都生成了代码，那么摇树优化器的作用就没有了。

Instead, the compiler adopts a recursive strategy that generates code only for the components you use.

所以，编译器转而采用一种递归策略，它只为你用到的那些组件生成代码。

The compiler starts with the entry components,
then it generates code for the declared components it [finds](guide/ngmodule-faq#q-template-reference) in an entry component's template,
then for the declared components it discovers in the templates of previously compiled components,
and so on. At the end of the process, the compiler has generated code for every entry component
and every component reachable from an entry component.

编译器从入口组件开始工作，为它在入口组件的模板中[找到的](guide/ngmodule-faq#q-template-reference)那些组件生成代码，然后又为在这些组件中的模板中发现的组件生成代码，以此类推。
当这个过程结束时，它就已经为每个入口组件以及从入口组件可以抵达的每个组件生成了代码。

If a component isn't an _entry component_ or wasn't found in a template,
the compiler omits it.

如果该组件不是*入口组件*或者没有在任何模板中发现过，编译器就会忽略它。

<hr/>

## What kinds of modules should I have and how should I use them?

## 有哪些类型的模块？我应该如何使用它们？

Every app is different. Developers have various levels of experience and comfort with the available choices.
Some suggestions and guidelines appear to have wide appeal.

每个应用都不一样。根据不同程度的经验，开发者会做出不同的选择。下列建议和指导原则广受欢迎。

### `SharedModule`

`SharedModule` is a conventional name for an `NgModule` with the components, directives, and pipes that you use
everywhere in your app. This module should consist entirely of `declarations`,
most of them exported.

为那些可能会在应用中到处使用的组件、指令和管道创建 `SharedModule`。
  这种模块应该只包含 `declarations`，并且应该导出几乎所有 `declarations` 里面的声明。

The `SharedModule` may re-export other widget modules, such as `CommonModule`,
`FormsModule`, and NgModules with the UI controls that you use most widely.

`SharedModule` 可以重新导出其它小部件模块，比如 `CommonModule`、`FormsModule` 和提供你广泛使用的 UI 控件的那些模块。

The `SharedModule` should not have `providers` for reasons [explained previously](guide/ngmodule-faq#q-why-bad).
Nor should any of its imported or re-exported modules have `providers`.

`SharedModule`***不应该***带有 `providers`，原因[在前面解释过了](guide/ngmodule-faq#q-why-bad)。
它的导入或重新导出的模块中也不应该有 `providers`。
如果你要违背这条指导原则，请务必想清楚你在做什么，并要有充分的理由。

Import the `SharedModule` in your _feature_ modules,
both those loaded when the app starts and those you lazy load later.

在任何特性模块中（无论是你在应用启动时主动加载的模块还是之后惰性加载的模块），你都可以随意导入这个 `SharedModule`。

### Feature Modules

### 特性模块

Feature modules are modules you create around specific application business domains, user workflows, and utility collections. They support your app by containing a particular feature,
such as routes, services, widgets, etc. To conceptualize what a feature module might be in your
app, consider that if you would put the files related to a certain functionality, like a search,
in one folder, that the contents of that folder would be a feature module that you might call
your `SearchModule`. It would contain all of the components, routing, and templates that
would make up the search functionality.

特性模块是你围绕特定的应用业务领域创建的模块，比如用户工作流、小工具集等。它们包含指定的特性，并为你的应用提供支持，比如路由、服务、窗口部件等。
要对你的应用中可能会有哪些特性模块有个概念，考虑如果你要把与特定功能（比如搜索）有关的文件放进一个目录下，该目录的内容就可能是一个名叫 `SearchModule` 的特性模块。
它将会包含构成搜索功能的全部组件、路由和模板。

For more information, see [Feature Modules](guide/feature-modules) and
[Module Types](guide/module-types)

要了解更多，参见[特性模块](guide/feature-modules)和[模块的分类](guide/module-types)。

## What's the difference between NgModules and JavaScript Modules?

## 在 NgModule 和 JavaScript 模块之间有什么不同？

In an Angular app, NgModules and JavaScript modules work together.

在 Angular 应用中，NgModule 会和 JavaScript 的模块一起工作。

In modern JavaScript, every file is a module
(see the [Modules](http://exploringjs.com/es6/ch_modules.html) page of the Exploring ES6 website).
Within each file you write an `export` statement to make parts of the module public.

在现代 JavaScript 中，每个文件都是模块（参见[模块](http://exploringjs.com/es6/ch_modules.html)）。
在每个文件中，你要写一个 `export` 语句将模块的一部分公开。

An Angular NgModule is a class with the `@NgModule` decorator&mdash;JavaScript modules
don't have to have the `@NgModule` decorator. Angular's `NgModule` has `imports` and `exports` and they serve a similar purpose.

Angular 模块是一个带有 `@NgModule` 装饰器的类，而 JavaScript 模块则没有。
Angular 的 `NgModule` 有自己的 `imports` 和 `exports` 来达到类似的目的。

You _import_ other NgModules so you can use their exported classes in component templates.
You _export_ this NgModule's classes so they can be imported and used by components of _other_ NgModules.

你可以*导入*其它 NgModules，以便在当前模块的组件模板中使用它们导出的类。
你可以*导出*当前 NgModules 中的类，以便*其它* NgModules 可以导入它们，并用在自己的组件模板中。

For more information, see [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

要了解更多，参见 [JavaScript 模块 vs. NgModules](guide/ngmodule-vs-jsmodule) 一章

<hr/>

{@a q-template-reference}

## How does Angular find components, directives, and pipes in a template?<br>What is a <i><b>template reference</b></i>?

## Angular 如何查找模板中的组件、指令和管道？什么是 ***模板引用*** ？

The [Angular compiler](guide/ngmodule-faq#q-angular-compiler) looks inside component templates
for other components, directives, and pipes. When it finds one, that's a template reference.

[Angular 编译器](guide/ngmodule-faq#q-angular-compiler)在组件模板内查找其它组件、指令和管道。一旦找到了，那就是一个“模板引用”。

The Angular compiler finds a component or directive in a template when it can match the *selector* of that component or directive to some HTML in that template.

Angular 编译器通过在一个模板的 HTML 中匹配组件或指令的**选择器（selector）**，来查找组件或指令。

The compiler finds a pipe if the pipe's *name* appears within the pipe syntax of the template HTML.

编译器通过分析模板 HTML 中的管道语法中是否出现了特定的管道名来查找对应的管道。

Angular only matches selectors and pipe names for classes that are declared by this module
or exported by a module that this module imports.

Angular 只查询两种组件、指令或管道：1）那些在当前模块中声明过的，以及 2）那些被当前模块导入的模块所导出的。

<hr/>

{@a q-angular-compiler}

## What is the Angular compiler?

## 什么是 Angular 编译器？

The Angular compiler converts the application code you write into highly performant JavaScript code.
The `@NgModule` metadata plays an important role in guiding the compilation process.

*Angular 编译器*会把你所编写的应用代码转换成高性能的 JavaScript 代码。
在编译过程中，`@NgModule` 的元数据扮演了很重要的角色。

The code you write isn't immediately executable. For example, components have templates that contain custom elements, attribute directives, Angular binding declarations,
and some peculiar syntax that clearly isn't native HTML.

你写的代码是无法直接执行的。
比如**组件**。
组件有一个模板，其中包含了自定义元素、属性型指令、Angular 绑定声明和一些显然不属于原生 HTML 的古怪语法。

The Angular compiler reads the template markup,
combines it with the corresponding component class code, and emits _component factories_.

*Angular 编译器*读取模板的 HTML，把它和相应的组件类代码组合在一起，并产出*组件工厂*。

A component factory creates a pure, 100% JavaScript representation
of the component that incorporates everything described in its `@Component` metadata:
the HTML, the binding instructions, the attached styles.

组件工厂为组件创建纯粹的、100% JavaScript 的表示形式，它包含了 `@Component` 元数据中描述的一切：HTML、绑定指令、附属的样式等……

Because directives and pipes appear in component templates,
the Angular compiler incorporates them into compiled component code too.

由于**指令**和**管道**都出现在组件模板中，*Angular 编译器**也同样会把它们组合进编译后的组件代码中。

`@NgModule` metadata tells the Angular compiler what components to compile for this module and
how to link this module with other modules.

`@NgModule` 元数据告诉*Angular 编译器*要为当前模块编译哪些组件，以及如何把当前模块和其它模块链接起来。
