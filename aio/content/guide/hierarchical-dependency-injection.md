# Hierarchical injectors

# 多级注入器


Injectors in Angular have rules that you can leverage to
achieve the desired visibility of injectables in your apps.
By understanding these rules, you can determine in which
NgModule, Component or Directive you should declare a provider.

Angular 中的注入器有一些规则，您可以利用这些规则来在应用程序中获得所需的可注入对象可见性。通过了解这些规则，可以确定应在哪个 NgModule、组件或指令中声明服务提供者。


## Two injector hierarchies

## 两个注入器层次结构

There are two injector hierarchies in Angular:

Angular 中有两个注入器层次结构：


1. `ModuleInjector` hierarchy&mdash;configure a `ModuleInjector`
in this hierarchy using an `@NgModule()` or `@Injectable()` annotation.

   `ModuleInjector` 层次结构 —— 使用 `@NgModule()` 或 `@Injectable()` 注解在此层次结构中配置 `ModuleInjector`。

1. `ElementInjector` hierarchy&mdash;created implicitly at each
DOM element. An `ElementInjector` is empty by default
unless you configure it in the `providers` property on
`@Directive()` or `@Component()`.

   `ElementInjector` 层次结构 —— 在每个 DOM 元素上隐式创建。除非您在 `@Directive()` 或 `@Component()` 的 `providers` 属性中进行配置，否则默认情况下，`ElementInjector` 为空。


{@a register-providers-injectable}

### `ModuleInjector`

The `ModuleInjector` can be configured in one of two ways:

可以通过以下两种方式之一配置 `ModuleInjector` ：


* Using the `@Injectable()` `providedIn` property to
refer to `@NgModule()`, or `root`.

  使用 `@Injectable()` 的 `providedIn` 属性引用 `@NgModule()` 或 `root` 。

* Using the `@NgModule()` `providers` array.

  使用 `@NgModule()` 的 `providers` 数组。


<div class="is-helpful alert">

<h4>Tree-shaking and <code>@Injectable()</code></h4>

<h4>摇树优化与 <code>@Injectable()</code></h4>

Using the `@Injectable()` `providedIn` property is preferable
to the `@NgModule()` `providers`
array because with `@Injectable()` `providedIn`, optimization
tools can perform
tree-shaking, which removes services that your app isn't
using and results in smaller bundle sizes.

使用 `@Injectable()` 的 `providedIn` 属性优于 `@NgModule()` 的 `providers` 数组，因为使用 `@Injectable()` 的 `providedIn` 时，优化工具可以进行摇树优化，从而删除您的应用程序中未使用的服务，以减小捆绑包尺寸。


Tree-shaking is especially useful for a library
because the application which uses the library may not have
a need to inject it. Read more
about [tree-shakable providers](guide/dependency-injection-providers#tree-shakable-providers)
in [DI Providers](guide/dependency-injection-providers).

摇树优化对于库特别有用，因为使用该库的应用程序不需要注入它。在 [DI 提供者中](guide/dependency-injection-providers)了解有关[可摇树优化的提供者](guide/dependency-injection-providers#tree-shakable-providers)的更多信息。


</div>

`ModuleInjector` is configured by the `@NgModule.providers` and
`NgModule.imports` property. `ModuleInjector` is a flattening of
all of the providers arrays which can be reached by following the
`NgModule.imports` recursively.

`ModuleInjector` 由 `@NgModule.providers` 和 `NgModule.imports` 属性配置。 `ModuleInjector` 是可以通过 `NgModule.imports` 递归找到的所有 providers 数组的扁平化。


Child `ModuleInjector`s are created when lazy loading other `@NgModules`.

子 `ModuleInjector` 是在延迟加载其它 `@NgModules` 时创建的。


Provide services with the `providedIn` property of `@Injectable()` as follows:

使用 `@Injectable()` 的 `providedIn` 属性提供服务的方式如下：


```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // <--provides this service in the root ModuleInjector
})
export class ItemService {
  name = 'telephone';
}
```

The `@Injectable()` decorator identifies a service class.
The `providedIn` property configures a specific `ModuleInjector`,
here `root`, which makes the service available in the `root` `ModuleInjector`.

`@Injectable()` 装饰器标识服务类。该 `providedIn` 属性配置指定的 `ModuleInjector`，这里的 `root` 会把让该服务在 `root` `ModuleInjector` 上可用。


#### Platform injector

#### 平台注入器


There are two more injectors above `root`, an
additional `ModuleInjector` and `NullInjector()`.

在 `root` 之上还有两个注入器，一个是额外的 `ModuleInjector`，一个是 `NullInjector()`。


Consider how Angular bootstraps the app with the
following in `main.ts`:

思考下 Angular 要如何通过 `main.ts` 中的如下代码引导应用程序：


```javascript

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {...})

```

The `bootstrapModule()` method creates a child injector of
the platform injector which is configured by the `AppModule`.
This is the `root` `ModuleInjector`.

`bootstrapModule()` 方法会创建一个由 `AppModule` 配置的注入器作为平台注入器的子注入器。也就是 `root` `ModuleInjector`。


The `platformBrowserDynamic()` method creates an injector
configured by a `PlatformModule`, which contains platform-specific
dependencies. This allows multiple apps to share a platform
configuration.
For example, a browser has only one URL bar, no matter how
many apps you have running.
You can configure additional platform-specific providers at the
platform level by supplying `extraProviders` using the `platformBrowser()` function.

`platformBrowserDynamic()` 方法创建一个由 `PlatformModule` 配置的注入器，该注入器包含特定平台的依赖项。这允许多个应用共享同一套平台配置。例如，无论您运行多少个应用程序，浏览器都只有一个 URL 栏。您可以使用 `platformBrowser()` 函数提供 `extraProviders`，从而在平台级别配置特定平台的额外提供者。


The next parent injector in the hierarchy is the `NullInjector()`,
which is the top of the tree. If you've gone so far up the tree
that you are looking for a service in the `NullInjector()`, you'll
get an error unless you've used `@Optional()` because ultimately,
everything ends at the `NullInjector()` and it returns an error or,
in the case of `@Optional()`, `null`. For more information on
`@Optional()`, see the [`@Optional()` section](guide/hierarchical-dependency-injection#optional) of this guide.

层次结构中的下一个父注入器是 `NullInjector()`，它是树的顶部。如果您在树中向上走了很远，以至于要在 `NullInjector()` 中寻找服务，那么除非使用 `@Optional()`，否则将收到错误消息，因为最终所有东西都将以 `NullInjector()` 结束并返回错误，或者对于 `@Optional()`，返回 `null`。有关 `@Optional()` 的更多信息，请参见本指南的 [`@Optional()` 部分](guide/hierarchical-dependency-injection#optional) 。


The following diagram represents the relationship between the
`root` `ModuleInjector` and its parent injectors as the
previous paragraphs describe.

下图展示了前面各段落描述的 `root` `ModuleInjector` 及其父注入器之间的关系。


<div class="lightbox">

  <img src="generated/images/guide/dependency-injection/injectors.svg" alt="NullInjector, ModuleInjector, root injector">

</div>

While the name `root` is a special alias, other `ModuleInjector`s
don't have aliases. You have the option to create `ModuleInjector`s
whenever a dynamically loaded component is created, such as with
the Router, which will create child `ModuleInjector`s.

虽然 `root` 是一个特殊的别名，但其他 `ModuleInjector` 都没有别名。每当创建动态加载组件时，你还会创建 `ModuleInjector`，比如路由器，它还会创建子 `ModuleInjector`。


All requests forward up to the root injector, whether you configured it
with the `bootstrapModule()` method, or registered all providers
with `root` in their own services.

无论是使用 `bootstrapModule()` 的方法配置它，还是将所有提供者都用 `root` 注册到其自己的服务中，所有请求最终都会转发到 `root` 注入器。


<div class="alert is-helpful">

<h4><code>@Injectable()</code> vs. <code>@NgModule()</code></h4>

If you configure an app-wide provider in the `@NgModule()` of
`AppModule`, it overrides one configured for `root` in the
`@Injectable()` metadata. You can do this to configure a
non-default provider of a service that is shared with multiple apps.

如果你在 `AppModule` 的 `@NgModule()` 中配置应用级提供者，它就会覆盖一个在 `@Injectable()` 的 `root` 元数据中配置的提供者。您可以用这种方式，来配置供多个应用共享的服务的非默认提供者。


Here is an example of the case where the component router
configuration includes
a non-default [location strategy](guide/router#location-strategy)
by listing its provider
in the `providers` list of the `AppModule`.

下面的例子中，通过把 [location 策略](guide/router#location-strategy) 的提供者添加到 `AppModule` 的 `providers` 列表中，为路由器配置了非默认的 [location 策略](guide/router#location-strategy)。

<code-example path="dependency-injection-in-action/src/app/app.module.ts" region="providers" header="src/app/app.module.ts (providers)">

</code-example>

</div>

### `ElementInjector`

Angular creates `ElementInjector`s implicitly for each DOM element.

Angular 会为每个 DOM 元素隐式创建 `ElementInjector` 。


Providing a service in the `@Component()` decorator using
its `providers` or `viewProviders`
property configures an `ElementInjector`.
For example, the following `TestComponent` configures the `ElementInjector`
by providing the service as follows:

可以用 `@Component()` 装饰器中的 `providers` 或 `viewProviders` 属性来配置 `ElementInjector` 以提供服务。例如，下面的 `TestComponent` 通过提供此服务来配置 `ElementInjector`：


```ts

@Component({
  ...
  providers: [{ provide: ItemService, useValue: { name: 'lamp' } }]
})
export class TestComponent

```

<div class="alert is-helpful">

**Note:** Please see the
[resolution rules](guide/hierarchical-dependency-injection#resolution-rules)
section to understand the relationship between the `ModuleInjector` tree and
the `ElementInjector` tree.

**注意：**请参阅[解析规则](guide/hierarchical-dependency-injection#resolution-rules)部分，以了解 `ModuleInjector` 树和 `ElementInjector` 树之间的关系。


</div>

When you provide services in a component, that service is available via
the `ElementInjector` at that component instance.
It may also be visible at
child component/directives based on visibility rules described in the [resolution rules](guide/hierarchical-dependency-injection#resolution-rules) section.

在组件中提供服务时，可以通过 `ElementInjector` 在该组件实例处使用该服务。根据[解析规则](guide/hierarchical-dependency-injection#resolution-rules)部分描述的可见性规则，它也同样在子组件/指令处可见。


When the component instance is destroyed, so is that service instance.

当组件实例被销毁时，该服务实例也将被销毁。


#### `@Directive()` and `@Component()`

#### `@Directive()` 和 `@Component()`


A component is a special type of directive, which means that
just as `@Directive()` has a `providers` property, `@Component()` does too.
This means that directives as well as components can configure
providers, using the `providers` property.
When you configure a provider for a component or directive
using the `providers` property,
that provider belongs to the `ElementInjector` of that component or
directive.
Components and directives on the same element share an injector.

组件是一种特殊类型的指令，这意味着 `@Directive()` 具有 `providers` 属性，`@Component()` 也同样如此。
这意味着指令和组件都可以使用 `providers` 属性来配置提供者。当使用 `providers` 属性为组件或指令配置提供者时，该提供程商就属于该组件或指令的 `ElementInjector`。同一元素上的组件和指令共享同一个注入器。


{@a resolution-rules}

## Resolution rules

## 解析规则


When resolving a token for a component/directive, Angular
resolves it in two phases:

当为组件/指令解析令牌时，Angular 分为两个阶段来解析它：


1. Against the `ElementInjector` hierarchy (its parents)

   针对 `ElementInjector` 层次结构（其父级）

1. Against the `ModuleInjector` hierarchy (its parents)

   针对 `ModuleInjector` 层次结构（其父级）


When a component declares a dependency, Angular tries to satisfy that
dependency with its own `ElementInjector`.
If the component's injector lacks the provider, it passes the request
up to its parent component's `ElementInjector`.

当组件声明依赖项时，Angular 会尝试使用它自己的 `ElementInjector` 来满足该依赖。
如果组件的注入器缺少提供者，它将把请求传给其父组件的 `ElementInjector` 。


The requests keep forwarding up until Angular finds an injector that can
handle the request or runs out of ancestor `ElementInjector`s.

这些请求将继续转发，直到 Angular 找到可以处理该请求的注入器或用完祖先 `ElementInjector` 。


If Angular doesn't find the provider in any `ElementInjector`s,
it goes back to the element where the request originated and looks
in the `ModuleInjector` hierarchy.
If Angular still doesn't find the provider, it throws an error.

如果 Angular 在任何 `ElementInjector` 中都找不到提供者，它将返回到发起请求的元素，并在 `ModuleInjector` 层次结构中进行查找。如果 Angular 仍然找不到提供者，它将引发错误。


If you have registered a provider for the same DI token at
different levels, the first one Angular encounters is the one
it uses to resolve the dependency. If, for example, a provider
is registered locally in the component that needs a service,
Angular doesn't look for another provider of the same service.

如果您已在不同级别注册了相同 DI 令牌的提供者，则 Angular 会用遇到的第一个来解析该依赖。例如，如果提供者已经在需要此服务的组件中本地注册了，则 Angular 不会再寻找同一服务的其他提供者。


## Resolution modifiers

## 解析修饰符


Angular's resolution behavior can be modified with `@Optional()`, `@Self()`,
`@SkipSelf()` and `@Host()`. Import each of them from `@angular/core`
and use each in the component class constructor when you inject your service.

可以使用 `@Optional()`，`@Self()`，`@SkipSelf()` 和 `@Host()` 来修饰 Angular 的解析行为。从 `@angular/core` 导入它们，并在注入服务时在组件类构造函数中使用它们。


For a working app showcasing the resolution modifiers that
this section covers, see the <live-example name="resolution-modifiers">resolution modifiers example</live-example>.

有关展示本节介绍的解析修饰符的可运行应用，请参阅<live-example name="resolution-modifiers">解析修饰符范例</live-example>。


### Types of modifiers

### 修饰符的类型


Resolution modifiers fall into three categories:

解析修饰符分为三类：


1. What to do if Angular doesn't find what you're
looking for, that is `@Optional()`

   如果 Angular 找不到您要的东西该怎么办，用 `@Optional()`


2. Where to start looking, that is `@SkipSelf()`

   从哪里开始寻找，用 `@SkipSelf()`


3. Where to stop looking, `@Host()` and `@Self()`

   到哪里停止寻找，用 `@Host()` 和 `@Self()`


By default, Angular always starts at the current `Injector` and keeps
searching all the way up. Modifiers allow you to change the starting
(self) or ending location.

默认情况下，Angular 始终从当前的 `Injector` 开始，并一直向上搜索。修饰符使您可以更改开始（默认是自己）或结束位置。


Additionally, you can combine all of the modifiers except `@Host()` and `@Self()` and of course `@SkipSelf()` and `@Self()`.

另外，您可以组合除 `@Host()` 和 `@Self()` 之外的所有修饰符，当然还有 `@SkipSelf()` 和 `@Self()` 。


{@a optional}

### `@Optional()`

`@Optional()` allows Angular to consider a service you inject to be optional.
This way, if it can't be resolved at runtime, Angular simply
resolves the service as `null`, rather than throwing an error. In
the following example, the service, `OptionalService`, isn't provided in
the service, `@NgModule()`, or component class, so it isn't available
anywhere in the app.

`@Optional()` 允许 Angular 将您注入的服务视为可选服务。这样，如果无法在运行时解析它，Angular 只会将服务解析为 `null`，而不会抛出错误。在下面的示例中，服务 `OptionalService` 没有在 `@NgModule()` 或组件类中提供，所以它没有在应用中的任何地方。


<code-example path="resolution-modifiers/src/app/optional/optional.component.ts" header="resolution-modifiers/src/app/optional/optional.component.ts" region="optional-component">

</code-example>

### `@Self()`

Use `@Self()` so that Angular will only look at the `ElementInjector` for the current component or directive.

使用 `@Self()` 让 Angular 仅查看当前组件或指令的 `ElementInjector` 。


A good use case for `@Self()` is to inject a service but only if it is
available on the current host element. To avoid errors in this situation,
combine `@Self()` with `@Optional()`.

`@Self()` 的一个好例子是要注入某个服务，但只有当该服务在当前宿主元素上可用时才行。为了避免这种情况下出错，请将 `@Self()` 与 `@Optional()` 结合使用。


For example, in the following `SelfComponent`, notice
the injected `LeafService` in
the constructor.

例如，在下面的 `SelfComponent` 中。请注意在构造函数中注入的 `LeafService`。


<code-example path="resolution-modifiers/src/app/self-no-data/self-no-data.component.ts" header="resolution-modifiers/src/app/self-no-data/self-no-data.component.ts" region="self-no-data-component">

</code-example>

In this example, there is a parent provider and injecting the
service will return the value, however, injecting the service
with `@Self()` and `@Optional()` will return `null` because
`@Self()` tells the injector to stop searching in the current
host element.

在这个例子中，有一个父提供者，注入服务将返回该值，但是，使用 `@Self()` 和 `@Optional()` 注入的服务将返回 `null` 因为 `@Self()` 告诉注入器在当前宿主元素上就要停止搜索。


Another example shows the component class with a provider
for `FlowerService`. In this case, the injector looks no further
than the current `ElementInjector` because it finds the `FlowerService` and returns the yellow flower 🌼.

另一个示例显示了具有 `FlowerService` 提供者的组件类。在这个例子中，注入器没有超出当前 `ElementInjector` 就停止了，因为它已经找到了 `FlowerService` 并返回了黄色花朵🌼。


<code-example path="resolution-modifiers/src/app/self/self.component.ts" header="resolution-modifiers/src/app/self/self.component.ts" region="self-component">

</code-example>

### `@SkipSelf()`


`@SkipSelf()` is the opposite of `@Self()`. With `@SkipSelf()`, Angular
starts its search for a service in the parent `ElementInjector`, rather than
in the current one. So if the parent `ElementInjector` were using the value  `🌿`  (fern)
for `emoji` , but you had  `🍁`  (maple leaf) in the component's `providers` array,
Angular would ignore  `🍁`  (maple leaf) and use  `🌿`  (fern).

`@SkipSelf()` 与 `@Self()` 相反。使用 `@SkipSelf()` ，Angular 在父 `ElementInjector` 中而不是当前 `ElementInjector` 中开始搜索服务。因此，如果父 `ElementInjector` 对 `emoji` 使用了值 `🌿`（蕨类），但组件的 `providers` 数组中有 `🍁`（枫叶），则 Angular 将忽略 `🍁`（枫叶），而使用 `🌿`（蕨类）。


To see this in code, assume that the following value for `emoji` is what the parent component were using, as in this service:

要在代码中看到这一点，请先假定 `emoji` 的以下值就是父组件正在使用的值，如本服务所示：


<code-example path="resolution-modifiers/src/app/leaf.service.ts" header="resolution-modifiers/src/app/leaf.service.ts" region="leafservice">

</code-example>

Imagine that in the child component, you had a different value, `🍁` (maple leaf) but you wanted to use the parent's value instead. This is when you'd use `@SkipSelf()`:

想象一下，在子组件中，您有一个不同的值 `🍁`（枫叶），但您想使用父项的值。你就要使用 `@SkipSelf()` ：


<code-example path="resolution-modifiers/src/app/skipself/skipself.component.ts" header="resolution-modifiers/src/app/skipself/skipself.component.ts" region="skipself-component">

</code-example>

In this case, the value you'd get for `emoji` would be `🌿` (fern), not `🍁` (maple leaf).

在这个例子中，您获得的 `emoji` 值将为 `🌿`（蕨类），而不是 `🍁`（枫叶）。


#### `@SkipSelf()` with `@Optional()`

Use `@SkipSelf()` with `@Optional()` to prevent an error if the value is `null`. In the following example, the `Person` service is injected in the constructor. `@SkipSelf()` tells Angular to skip the current injector and `@Optional()` will prevent an error should the `Person` service be `null`.

如果值为 `null` 请同时使用 `@SkipSelf()` 和 `@Optional()` 来防止错误。在下面的示例中，将 `Person` 服务注入到构造函数中。`@SkipSelf()` 告诉 Angular 跳过当前的注入器，如果 `Person` 服务为 `null`，则 `@Optional()` 将防止报错。

``` ts
class Person {
  constructor(@Optional() @SkipSelf() parent: Person) {}
}

```

### `@Host()`

`@Host()` lets you designate a component as the last stop in the injector tree when searching for providers. Even if there is a service instance further up the tree, Angular won't continue looking. Use `@Host()` as follows:

`@Host()` 使您可以在搜索提供者时将当前组件指定为注入器树的最后一站。即使树的更上级有一个服务实例，Angular 也不会继续寻找。使用 `@Host()` 的例子如下：


<code-example path="resolution-modifiers/src/app/host/host.component.ts" header="resolution-modifiers/src/app/host/host.component.ts" region="host-component">

</code-example>

Since `HostComponent` has `@Host()` in its constructor, no
matter what the parent of `HostComponent` might have as a
`flower.emoji` value,
the `HostComponent` will use `🌼` (yellow flower).

由于 `HostComponent` 在其构造函数中具有 `@Host()` ，因此，无论 `HostComponent` 的父级是否可能有 `flower.emoji` 值，该 `HostComponent` 都将使用 `🌼`（黄色花朵）。


## Logical structure of the template

## 模板的逻辑结构


When you provide services in the component class, services are
visible within the `ElementInjector` tree relative to where
and how you provide those services.

在组件类中提供服务时，服务在 `ElementInjector` 树中的可见性是取决于您在何处以及如何提供这些服务。


Understanding the underlying logical structure of the Angular
template will give you a foundation for configuring services
and in turn control their visibility.

了解 Angular 模板的基础逻辑结构将为您配置服务并进而控制其可见性奠定基础。


Components are used in your templates, as in the following example:

组件在模板中使用，如以下示例所示：

```

<app-root>
    <app-child></app-child>
</app-root>

```

<div class="alert is-helpful">

**Note:** Usually, you declare the components and their
templates in separate files. For the purposes of understanding
how the injection system works, it is useful to look at them
from the point of view of a combined logical tree. The term
logical distinguishes it from the render tree (your application
DOM tree). To mark the locations of where the component
templates are located, this guide uses the `<#VIEW>`
pseudo element, which doesn't actually exist in the render tree
and is present for mental model purposes only.

**注意：**通常，您要在单独的文件中声明组件及其模板。为了理解注入系统的工作原理，从组合逻辑树的视角来看它们是很有帮助的。使用术语“逻辑”将其与渲染树（您的应用程序 DOM 树）区分开。为了标记组件模板的位置，本指南使用 `<#VIEW>` 伪元素，该元素实际上不存在于渲染树中，仅用于心智模型中。


</div>

The following is an example of how the `<app-root>` and `<app-child>` view trees are combined into a single logical tree:

下面是如何将 `<app-root>` 和 `<app-child>` 视图树组合为单个逻辑树的示例：

```
<app-root>
  <#VIEW>
    <app-child>
     <#VIEW>
       ...content goes here...
     </#VIEW>
    </app-child>
  <#VIEW>
</app-root>

 ```

Understanding the idea of the `<#VIEW>` demarcation is especially significant when you configure services in the component class.

当您在组件类中配置服务时，了解这种 `<#VIEW>` 划界的思想尤其重要。


## Providing services in `@Component()`

## 在 `@Component()` 中提供服务


How you provide services via an `@Component()` (or `@Directive()`)
decorator determines their visibility. The following sections
demonstrate `providers` and `viewProviders` along with ways to
modify service visibility with `@SkipSelf()` and `@Host()`.

您如何通过 `@Component()` （或 `@Directive()` ）装饰器提供服务决定了它们的可见性。以下各节演示了 `providers` 和 `viewProviders` 以及使用 `@SkipSelf()` 和 `@Host()` 修改服务可见性的方法。


A component class can provide services in two ways:

组件类可以通过两种方式提供服务：


1. with a `providers` array

   使用 `providers` 数组


```typescript=
@Component({
  ...
  providers: [
    {provide: FlowerService, useValue: {emoji: '🌺'}}
  ]
})
```

2. with a `viewProviders` array

   使用 `viewProviders` 数组


```typescript=
@Component({
  ...
  viewProviders: [
    {provide: AnimalService, useValue: {emoji: '🐶'}}
  ]
})
```

To understand how the `providers` and `viewProviders` influence service
visibility differently, the following sections build
a <live-example name="providers-viewproviders"></live-example>
step-by-step and compare the use of `providers` and `viewProviders`
in code and a logical tree.

为了解 `providers` 和 `viewProviders` 对服务可见性的影响有何差异，以下各节将逐步构建一个 <live-example name="providers-viewproviders"></live-example> 并在代码和逻辑树中比较 `providers` 和 `viewProviders` 的作用。


<div class="alert is-helpful">

**NOTE:** In the logical tree, you'll see `@Provide`, `@Inject`, and
`@NgModule`, which are not real HTML attributes but are here to demonstrate
what is going on under the hood.

**注意：**在逻辑树中，你会看到 `@Provide` ， `@Inject` 和 `@NgModule` ，这些不是真正的 HTML 属性，只是为了在这里证明其幕后的原理。


- `@Inject(Token)=>Value` demonstrates that if `Token` is injected at
this location in the logical tree its value would be `Value`.

  `@Inject(Token)=>Value` 表示，如果要将 `Token` 注入逻辑树中的此位置，则它的值为 `Value`。


- `@Provide(Token=Value)` demonstrates that there is a declaration of
`Token` provider with value `Value` at this location in the logical tree.

  `@Provide(Token=Value)` 表示，在逻辑树中的此位置存在一个值为 `Value` 的 `Token` 提供者的声明。


- `@NgModule(Token)` demonstrates that a fallback `NgModule` injector
should be used at this location.

  `@NgModule(Token)` 表示，应在此位置使用后备的 `NgModule` 注入器。


</div>

### Example app structure

### 应用程序结构示例


The example app has a `FlowerService` provided in `root` with an `emoji`
value of `🌺` (red hibiscus).

示例应用程序的 `root` 提供了 `FlowerService`，其 `emoji` 值为 `🌺`（红色芙蓉）。


<code-example path="providers-viewproviders/src/app/flower.service.ts" header="providers-viewproviders/src/app/flower.service.ts" region="flowerservice">

</code-example>

Consider a simple app with only an `AppComponent` and a `ChildComponent`.
The most basic rendered view would look like nested HTML elements such as
the following:

考虑一个只有 `AppComponent` 和 `ChildComponent` 的简单应用程序。最基本的渲染视图看起来就像嵌套的 HTML 元素，例如：


```
<app-root> <!-- AppComponent selector -->
    <app-child> <!-- ChildComponent selector -->
    </app-child>
</app-root>

```

However, behind the scenes, Angular uses a logical view
representation as follows when resolving injection requests:

但是，在幕后，Angular 在解析注入请求时使用如下逻辑视图表示形式：

```

<app-root> <!-- AppComponent selector -->
    <#VIEW>
        <app-child> <!-- ChildComponent selector -->
            <#VIEW>
            </#VIEW>
        </app-child>
    </#VIEW>
</app-root>

 ```

The `<#VIEW>` here represents an instance of a template.
Notice that each component has its own `<#VIEW>`.

此处的 `<#VIEW>` 表示模板的实例。请注意，每个组件都有自己的 `<#VIEW>` 。


Knowledge of this structure can inform how you provide and
inject your services, and give you complete control of service visibility.

了解此结构可以告知您如何提供和注入服务，并完全控制服务的可见性。


Now, consider that `<app-root>` simply injects the `FlowerService`:

现在，考虑 `<app-root>` 只注入了 `FlowerService` ：


<code-example path="providers-viewproviders/src/app/app.component.1.ts" header="providers-viewproviders/src/app/app.component.ts" region="injection">

</code-example>

Add a binding to the `<app-root>` template to visualize the result:

将绑定添加到 `<app-root>` 模板来将结果可视化：


<code-example path="providers-viewproviders/src/app/app.component.html" header="providers-viewproviders/src/app/app.component.html" region="binding-flower">

</code-example>

The output in the view would be:

该视图中的输出为：

```

Emoji from FlowerService: 🌺

```

In the logical tree, this would be represented as follows:

在逻辑树中，这可以表示成如下形式：

```

<app-root @NgModule(AppModule)
        @Inject(FlowerService) flower=>"🌺">
  <#VIEW>

    <p>Emoji from FlowerService: {{flower.emoji}} (🌺)</p>

    <app-child>
      <#VIEW>
      </#VIEW>
     </app-child>
  </#VIEW>
</app-root>

```

When `<app-root>` requests the `FlowerService`, it is the injector's job
to resolve the `FlowerService` token. The resolution of the token happens
in two phases:

当 `<app-root>` 请求 `FlowerService` 时，注入器的工作就是解析 `FlowerService` 令牌。令牌的解析分为两个阶段：


1. The injector determines the starting location in the logical tree and
an ending location of the search. The injector begins with the starting
location and looks for the token at each level in the logical tree. If
the token is found it is returned.

   注入器确定逻辑树中搜索的开始位置和结束位置。注入程序从起始位置开始，并在逻辑树的每个级别上查找令牌。如果找到令牌，则将其返回。


2. If the token is not found, the injector looks for the closest
parent `@NgModule()` to delegate the request to.

   如果未找到令牌，则注入程序将寻找最接近的父 `@NgModule()` 委派该请求。


In the example case, the constraints are:

在这个例子中，约束为：


1. Start with `<#VIEW>` belonging to `<app-root>` and end with `<app-root>`.

   从属于 `<app-root>` 的  `<#VIEW>` 开始，并结束于 `<app-root>` 。

  - Normally the starting point for search is at the point
  of injection. However, in this case `<app-root>`  `@Component`s
  are special in that they also include their own `viewProviders`,
  which is why the search starts at `<#VIEW>` belonging to `<app-root>`.
  (This would not be the case for a directive matched at the same location).

    通常，搜索的起点就是注入点。但是，在这个例子中，`<app-root>` `@Component` 的特殊之处在于它们还包括自己的 `viewProviders`，这就是为什么搜索从 `<app-root>` 的 `<#VIEW>` 开始的原因。（对于匹配同一位置的指令，情况却并非如此）。


  - The ending location just happens to be the same as the component
  itself, because it is the topmost component in this application.

    结束位置恰好与组件本身相同，因为它就是此应用程序中最顶层的组件。


2. The `AppModule` acts as the fallback injector when the
injection token can't be found in the `ElementInjector`s.

   当在 `ElementInjector` 中找不到注入令牌时，就用 `AppModule` 充当后备注入器。


### Using the `providers` array

### 使用 `providers` 数组


Now, in the `ChildComponent` class, add a provider for `FlowerService`
to demonstrate more complex resolution rules in the upcoming sections:

现在，在 `ChildComponent` 类中，为 `FlowerService` 添加一个提供者，以便在接下来的小节中演示更复杂的解析规则：


<code-example path="providers-viewproviders/src/app/child/child.component.1.ts" header="providers-viewproviders/src/app/child.component.ts" region="flowerservice">

</code-example>

Now that the `FlowerService` is provided in the `@Component()` decorator,
when the `<app-child>` requests the service, the injector has only to look
as far as the `<app-child>`'s own `ElementInjector`. It won't have to
continue the search any further through the injector tree.

现在，在 `@Component()` 装饰器中提供了 `FlowerService` ，当 `<app-child>` 请求该服务时，注入器仅需要查找 `<app-child>` 自己的 `ElementInjector` 。不必再通过注入器树继续搜索。


The next step is to add a binding to the `ChildComponent` template.

下一步是将绑定添加到 `ChildComponent` 模板。


<code-example path="providers-viewproviders/src/app/child/child.component.html" header="providers-viewproviders/src/app/child.component.html" region="flower-binding">

</code-example>

To render the new values, add `<app-child>` to the bottom of
the `AppComponent` template so the view also displays the sunflower:

要渲染新的值，请在 `AppComponent` 模板的底部添加 `<app-child>` ，以便其视图也显示向日葵：

```

Child Component
Emoji from FlowerService: 🌻

```

In the logical tree, this would be represented as follows:

在逻辑树中，可以把它表示成这样：

```

<app-root @NgModule(AppModule)
        @Inject(FlowerService) flower=>"🌺">
  <#VIEW>

    <p>Emoji from FlowerService: {{flower.emoji}} (🌺)</p>

    <app-child @Provide(FlowerService="🌻")
               @Inject(FlowerService)=>"🌻"> <!-- search ends here -->
      <#VIEW> <!-- search starts here -->

        <h2>Parent Component</h2>

        <p>Emoji from FlowerService: {{flower.emoji}} (🌻)</p>

      </#VIEW>
     </app-child>
  </#VIEW>
</app-root>

```

When `<app-child>` requests the `FlowerService`, the injector begins
its search at the `<#VIEW>` belonging to `<app-child>` (`<#VIEW>` is
included because it is injected from `@Component()`) and ends with
`<app-child>`. In this case, the `FlowerService` is resolved in the
`<app-child>`'s `providers` array with sunflower 🌻. The injector doesn't
have to look any further in the injector tree. It stops as soon as it
finds the `FlowerService` and never sees the 🌺 (red hibiscus).

当 `<app-child>` 请求 `FlowerService` 时，注入器从 `<app-child>` 的 `<#VIEW>` 开始搜索（包括 `<#VIEW>` ，因为它是从 `@Component()` 注入的），并到 `<app-child>` 结束。在这个例子中， `FlowerService` 在 `<app-child>` 的 `providers` 数组中解析为向日葵🌻。注入器不必在注入器树中进一步查找。一旦找到 `FlowerService` ，它便停止运行，再也看不到🌺（红芙蓉）。


{@a use-view-providers}

### Using the `viewProviders` array

### 使用 `viewProviders` 数组


Use the `viewProviders` array as another way to provide services in the
`@Component()` decorator. Using `viewProviders` makes services
visible in the `<#VIEW>`.

使用 `viewProviders` 数组是在 `@Component()` 装饰器中提供服务的另一种方法。使用 `viewProviders` 使服务在 `<#VIEW>` 中可见。

<div class="is-helpful alert">

The steps are the same as using the `providers` array,
with the exception of using the `viewProviders` array instead.

除了使用 `viewProviders` 数组外，其他步骤与使用 `providers` 数组相同。


For step-by-step instructions, continue with this section. If you can
set it up on your own, skip ahead to [Modifying service availability](guide/hierarchical-dependency-injection#modify-visibility).

有关这些步骤的说明，请继续本节。如果你可以自行设置，请跳至[修改服务可用性](guide/hierarchical-dependency-injection#modify-visibility) 一节。


</div>

The example app features a second service, the `AnimalService` to
demonstrate `viewProviders`.

该示例应用程序具有第二个服务 `AnimalService` 来演示 `viewProviders` 。


First, create an `AnimalService` with an `emoji` property of 🐳 (whale):

首先，创建一个 `AnimalService` 与 `emoji` 的🐳（鲸鱼）属性：


<code-example path="providers-viewproviders/src/app/animal.service.ts" header="providers-viewproviders/src/app/animal.service.ts" region="animal-service">

</code-example>

Following the same pattern as with the `FlowerService`, inject the
`AnimalService` in the `AppComponent` class:

遵循与 `FlowerService` 相同的模式，将 `AnimalService` 注入 `AppComponent` 类：


<code-example path="providers-viewproviders/src/app/app.component.ts" header="providers-viewproviders/src/app/app.component.ts" region="inject-animal-service">

</code-example>

<div class="alert is-helpful">

**Note:** You can leave all the `FlowerService` related code in place
as it will allow a comparison with the `AnimalService`.

**注意：**您可以保留所有与 `FlowerService` 相关的代码，因为它可以与 `AnimalService` 进行比较。


</div>

Add a `viewProviders` array and inject the `AnimalService` in the
`<app-child>` class, too, but give `emoji` a different value. Here,
it has a value of 🐶 (puppy).

添加一个 `viewProviders` 数组，并将 `AnimalService` 也注入到 `<app-child>` 类中，但是给 `emoji` 一个不同的值。在这里，它的值为🐶（小狗）。


<code-example path="providers-viewproviders/src/app/child/child.component.ts" header="providers-viewproviders/src/app/child.component.ts" region="provide-animal-service">

</code-example>

Add bindings to the `ChildComponent` and the `AppComponent` templates.
In the `ChildComponent` template, add the following binding:

将绑定添加到 `ChildComponent` 和 `AppComponent` 模板。在 `ChildComponent` 模板中，添加以下绑定：


<code-example path="providers-viewproviders/src/app/child/child.component.html" header="providers-viewproviders/src/app/child.component.html" region="animal-binding">

</code-example>

Additionally, add the same to the `AppComponent` template:

此外，将其添加到 `AppComponent` 模板：


<code-example path="providers-viewproviders/src/app/app.component.html" header="providers-viewproviders/src/app/app.component.html" region="binding-animal">

</code-example>

Now you should see both values in the browser:

现在，您应该在浏览器中看到两个值：


```

AppComponent
Emoji from AnimalService: 🐳

Child Component
Emoji from AnimalService: 🐶

```

The logic tree for this example of `viewProviders` is as follows:

此 `viewProviders` 示例的逻辑树如下：

```

<app-root @NgModule(AppModule)
        @Inject(AnimalService) animal=>"🐳">
  <#VIEW>
    <app-child>
      <#VIEW
       @Provide(AnimalService="🐶")
       @Inject(AnimalService=>"🐶")>

       <!-- ^^using viewProviders means AnimalService is available in <#VIEW>-->

       <p>Emoji from AnimalService: {{animal.emoji}} (🐶)</p>

      </#VIEW>
     </app-child>
  </#VIEW>
</app-root>

```

Just as with the `FlowerService` example, the `AnimalService` is provided
in the `<app-child>` `@Component()` decorator. This means that since the
injector first looks in the `ElementInjector` of the component, it finds the
`AnimalService` value of 🐶 (puppy). It doesn't need to continue searching the
`ElementInjector` tree, nor does it need to search the `ModuleInjector`.

与 `FlowerService` 示例一样， `<app-child>` `@Component()` 装饰器中提供了 `AnimalService`。这意味着，由于注入器首先在组件的 `ElementInjector` 中查找，因此它将找到 `AnimalService` 的值 🐶（小狗）。它不需要继续搜索 `ElementInjector` 树，也不需要搜索 `ModuleInjector` 。


### `providers` vs. `viewProviders`

### `providers` 与 `viewProviders`


To see the difference between using `providers` and `viewProviders`, add
another component to the example and call it `InspectorComponent`.
`InspectorComponent` will be a child of the `ChildComponent`. In
`inspector.component.ts`, inject the `FlowerService` and `AnimalService` in
the constructor:

为了看清 `providers` 和 `viewProviders` 的差异，请在示例中添加另一个组件，并将其命名为 `InspectorComponent` 。 `InspectorComponent` 将是 `ChildComponent` 的子 `ChildComponent` 。在 `inspector.component.ts` 中，将 `FlowerService` 和 `AnimalService` 注入构造函数中：


<code-example path="providers-viewproviders/src/app/inspector/inspector.component.ts" header="providers-viewproviders/src/app/inspector/inspector.component.ts" region="injection">

</code-example>

You do not need a `providers` or `viewProviders` array. Next, in
`inspector.component.html`, add the same markup from previous components:

您不需要 `providers` 或 `viewProviders` 数组。接下来，在 `inspector.component.html` 中，从以前的组件中添加相同的 html：


<code-example path="providers-viewproviders/src/app/inspector/inspector.component.html" header="providers-viewproviders/src/app/inspector/inspector.component.html" region="binding">

</code-example>

Remember to add the `InspectorComponent` to the `AppModule` `declarations` array.

别忘了将 `InspectorComponent` 添加到 `AppModule` `declarations` 数组。


<code-example path="providers-viewproviders/src/app/app.module.ts" header="providers-viewproviders/src/app/app.module.ts" region="appmodule">

</code-example>

Next, make sure your `child.component.html` contains the following:

接下来，确保您的 `child.component.html` 包含以下内容：


<code-example path="providers-viewproviders/src/app/child/child.component.html" header="providers-viewproviders/src/app/child/child.component.html" region="child-component">

</code-example>

The first two lines, with the bindings, are there from previous steps. The
new parts are  `<ng-content>` and `<app-inspector>`. `<ng-content>` allows
you to project content, and `<app-inspector>` inside the `ChildComponent`
 template makes the `InspectorComponent` a child component of
 `ChildComponent`.

前两行带有绑定，来自之前的步骤。新的部分是 `<ng-content>` 和 `<app-inspector>`。 `<ng-content>` 允许您投影内容， `ChildComponent` 模板中的 `<app-inspector>` 使 `InspectorComponent` 成为 `ChildComponent` 的子组件。


Next, add the following to `app.component.html` to take advantage of content projection.

接下来，将以下内容添加到 `app.component.html` 中以利用内容投影的优势。


<code-example path="providers-viewproviders/src/app/app.component.html" header="providers-viewproviders/src/app/app.component.html" region="content-projection">

</code-example>

The browser now renders the following, omitting the previous examples
for brevity:

现在，浏览器将呈现以下内容，为简洁起见，省略了前面的示例：

```

//...Omitting previous examples. The following applies to this section.

Content projection: This is coming from content. Doesn't get to see
puppy because the puppy is declared inside the view only.

Emoji from FlowerService: 🌻
Emoji from AnimalService: 🐳

Emoji from FlowerService: 🌻
Emoji from AnimalService: 🐶

```

These four bindings demonstrate the difference between `providers`
and `viewProviders`. Since the 🐶 (puppy) is declared inside the <#VIEW>,
it isn't visible to the projected content. Instead, the projected
content sees the 🐳 (whale).

这四个绑定说明了 `providers` 和 `viewProviders` 之间的区别。由于🐶（小狗）在&lt;#VIEW>中声明，因此投影内容不可见。投影的内容中会看到🐳（鲸鱼）。


The next section though, where `InspectorComponent` is a child component
of `ChildComponent`, `InspectorComponent` is inside the `<#VIEW>`, so
when it asks for the `AnimalService`, it sees the 🐶 (puppy).

但是下一部分， `InspectorComponent` 是 `ChildComponent` 的子组件， `InspectorComponent` 在 `<#VIEW>` 内部，因此当它请求 `AnimalService` 时，它会看到🐶（小狗）。


The `AnimalService` in the logical tree would look like this:

逻辑树中的 `AnimalService` 如下所示：


```

<app-root @NgModule(AppModule)
        @Inject(AnimalService) animal=>"🐳">
  <#VIEW>
    <app-child>
      <#VIEW
       @Provide(AnimalService="🐶")
       @Inject(AnimalService=>"🐶")>

       <!-- ^^using viewProviders means AnimalService is available in <#VIEW>-->

       <p>Emoji from AnimalService: {{animal.emoji}} (🐶)</p>

       <app-inspector>

        <p>Emoji from AnimalService: {{animal.emoji}} (🐶)</p>

       </app-inspector>
      </#VIEW>
      <app-inspector>
        <#VIEW>

          <p>Emoji from AnimalService: {{animal.emoji}} (🐳)</p>

        </#VIEW>
      </app-inspector>
     </app-child>
  </#VIEW>
</app-root>

```

The projected content of `<app-inspector>` sees the 🐳 (whale), not
the 🐶 (puppy), because the
🐶 (puppy) is inside the `<app-child>` `<#VIEW>`. The `<app-inspector>` can
only see the 🐶 (puppy)
if it is also within the `<#VIEW>`.

`<app-inspector>` 的投影内容中看到了🐳（鲸鱼），而不是🐶（小狗），因为🐶（小狗）在 `<app-child>` 的 `<#VIEW>` 中。如果 `<app-inspector>` 也位于 `<#VIEW>` 则只能看到🐶（小狗）。


{@a modify-visibility}

## Modifying service visibility

## 修改服务可见性


This section describes how to limit the scope of the beginning and
ending `ElementInjector` using the visibility decorators `@Host()`,
`@Self()`, and `@SkipSelf()`.

本节讲的是如何使用可见性修饰符 `@Host()` ， `@Self()` 和 `@SkipSelf()` 来限制 `ElementInjector` 的开始和结束范围。


### Visibility of provided tokens

### 提供者令牌的可见性


Visibility decorators influence where the search for the injection
token begins and ends in the logic tree. To do this, place
visibility decorators at the point of injection, that is, the
`constructor()`, rather than at a point of declaration.

可见性装饰器影响搜索注入令牌时在逻辑树中开始和结束的位置。为此，要将可见性装饰器放置在注入点，即 `constructor()` ，而不是在声明点。


To alter where the injector starts looking for `FlowerService`, add
`@SkipSelf()` to the `<app-child>` `@Inject` declaration for the
`FlowerService`. This declaration is in the `<app-child>` constructor
as shown in `child.component.ts`:

为了修改该注入器从哪里开始寻找 `FlowerService`，把 `@SkipSelf()` 加到 `<app-child>` 的 `@Inject` 声明 `FlowerService` 中。该声明在 `<app-child>` 构造函数中，如 `child.component.ts` 所示：


```typescript=
  constructor(@SkipSelf() public flower : FlowerService) { }

```

With `@SkipSelf()`, the `<app-child>` injector doesn't look to itself for
the `FlowerService`. Instead, the injector starts looking for the
`FlowerService` at the `<app-root>`'s `ElementInjector`, where it finds
nothing. Then, it goes back to the `<app-child>` `ModuleInjector` and finds
the 🌺 (red hibiscus) value, which is available because the `<app-child>`
`ModuleInjector` and the `<app-root>` `ModuleInjector` are flattened into one
 `ModuleInjector`. Thus, the UI renders the following:

使用 `@SkipSelf()`，`<app-child>` 注入器不会寻找自身来获取 `FlowerService`。相反，喷射器开始在 `<app-root>` 的 `ElementInjector` 中寻找 `FlowerService`，在那里它什么也没找到。
然后，它返回到 `<app-child>` 的 `ModuleInjector` 并找到🌺（红芙蓉）值，这是可用的，因为 `<app-child>` `ModuleInjector` 和 `<app-root>` `ModuleInjector` 被展开成了一个 `ModuleInjector` 。因此，UI 将呈现以下内容：

```

Emoji from FlowerService: 🌺

```

In a logical tree, this same idea might look like this:

在逻辑树中，这种情况可能如下所示：

```

<app-root @NgModule(AppModule)
        @Inject(FlowerService) flower=>"🌺">
  <#VIEW>
    <app-child @Provide(FlowerService="🌻")>
      <#VIEW @Inject(FlowerService, SkipSelf)=>"🌺">

      <!-- With SkipSelf, the injector looks to the next injector up the tree -->

      </#VIEW>
      </app-child>
  </#VIEW>
</app-root>

```

Though `<app-child>` provides the 🌻 (sunflower), the app renders
the 🌺 (red hibiscus) because `@SkipSelf()`  causes the current
injector to skip
itself and look to its parent.

尽管 `<app-child>` 提供了🌻（向日葵），但该应用程序渲染了🌺（红色芙蓉），因为 `@SkipSelf()` 导致当前的注入器跳过了自身并寻找其父级。


If you now add `@Host()` (in addition to the `@SkipSelf()`) to the
`@Inject` of the `FlowerService`, the result will be `null`. This is
because `@Host()` limits the upper bound of the search to the
`<#VIEW>`. Here's the idea in the logical tree:

如果现在将 `@Host()`（以及 `@SkipSelf()` ）添加到了 `FlowerService` 的 `@Inject`，其结果将为 `null` 。这是因为 `@Host()` 将搜索的上限限制为 `<#VIEW>` 。这是在逻辑树中的情况：

```

<app-root @NgModule(AppModule)
        @Inject(FlowerService) flower=>"🌺">
  <#VIEW> <!-- end search here with null-->
    <app-child @Provide(FlowerService="🌻")> <!-- start search here -->
      <#VIEW @Inject(FlowerService, @SkipSelf, @Host, @Optional)=>null>
      </#VIEW>
      </app-parent>
  </#VIEW>
</app-root>

```

Here, the services and their values are the same, but `@Host()`
stops the injector from looking any further than the `<#VIEW>`
for `FlowerService`, so it doesn't find it and returns `null`.

在这里，服务及其值是相同的，但是 `@Host()` 阻止了注入器对 `FlowerService` 进行任何高于 `<#VIEW>` 的查找，因此找不到它并返回 `null` 。


<div class="alert is-helpful">

**Note:** The example app uses `@Optional()` so the app does
not throw an error, but the principles are the same.

**注意：**示例应用程序使用 `@Optional()` 因此该应用程序不会引发错误，但是其原理是一样的。


</div>

### `@SkipSelf()` and `viewProviders`

### `@SkipSelf()` 和 `viewProviders`


The `<app-child>` currently provides the `AnimalService` in
the `viewProviders` array with the value of 🐶 (puppy). Because
the injector has only to look at the `<app-child>`'s `ElementInjector`
for the `AnimalService`, it never sees the 🐳 (whale).

该 `<app-child>` 目前提供在 `viewProviders` 数组中提供了值为 🐶（小狗）的 `AnimalService`。由于注入器只需要查看 `<app-child>` 的 `ElementInjector` 中的 `AnimalService` ，它就不会看到🐳（鲸鱼）。


Just as in the `FlowerService` example, if you add `@SkipSelf()`
to the constructor for the `AnimalService`, the injector won't
look in the current `<app-child>`'s `ElementInjector` for the
`AnimalService`.

就像在 `FlowerService` 示例中一样，如果将 `@SkipSelf()` 添加到 `AnimalService` 的构造函数中，则注入器将不在 `AnimalService` 的当前 `<app-child>` 的 `ElementInjector` 中查找 `AnimalService` 。


```typescript=
export class ChildComponent {

// add @SkipSelf()
  constructor(@SkipSelf() public animal : AnimalService) { }

}

```

Instead, the injector will begin at the `<app-root>`
`ElementInjector`. Remember that the `<app-child>` class
provides the `AnimalService` in the `viewProviders` array
with a value of 🐶 (puppy):

相反，注入器将从 `<app-root>` `ElementInjector` 开始找。请记住， `<app-child>` 类在 `viewProviders` 数组中 `AnimalService` 中提供了🐶（小狗）的值：


```ts

@Component({
  selector: 'app-child',
  ...
  viewProviders:
  [{ provide: AnimalService, useValue: { emoji: '🐶' } }]
})

```

The logical tree looks like this with `@SkipSelf()` in `<app-child>`:

在 `<app-child>` 中使用 `@SkipSelf()` 的逻辑树是这样的：

```

  <app-root @NgModule(AppModule)
          @Inject(AnimalService=>"🐳")>
    <#VIEW><!-- search begins here -->
      <app-child>
        <#VIEW
         @Provide(AnimalService="🐶")
         @Inject(AnimalService, SkipSelf=>"🐳")>

         <!--Add @SkipSelf -->

        </#VIEW>
        </app-child>
    </#VIEW>
  </app-root>

```

With `@SkipSelf()` in the `<app-child>`, the injector begins its
search for the `AnimalService` in the `<app-root>` `ElementInjector`
and finds 🐳 (whale).

在 `<app-child>` 中使用 `@SkipSelf()`，注入器就会在 `<app-root>` 的 `ElementInjector` 中找到 🐳（鲸）。


### `@Host()` and `viewProviders`

### `@Host()` 和 `viewProviders`


If you add `@Host()` to the constructor for `AnimalService`, the
result is 🐶 (puppy) because the injector finds the `AnimalService`
in the `<app-child>` `<#VIEW>`. Here is the `viewProviders` array
in the `<app-child>` class and `@Host()` in the constructor:

如果把 `@Host()` 添加到 `AnimalService` 的构造函数上，结果就是🐶（小狗），因为注入器会在 `<app-child>` 的 `<#VIEW>` 中查找 `AnimalService` 服务。这里是 `<app-child>` 类中的 `viewProviders` 数组和构造函数中的 `@Host()` ：


```typescript=
@Component({
  selector: 'app-child',
  ...
  viewProviders:
  [{ provide: AnimalService, useValue: { emoji: '🐶' } }]

})
export class ChildComponent {
  constructor(@Host() public animal : AnimalService) { }
}

```

`@Host()` causes the injector to look until it encounters the edge of the `<#VIEW>`.

`@Host()` 导致注入器开始查找，直到遇到 `<#VIEW>` 的边缘。


```

  <app-root @NgModule(AppModule)
          @Inject(AnimalService=>"🐳")>
    <#VIEW>
      <app-child>
        <#VIEW
         @Provide(AnimalService="🐶")
         @Inject(AnimalService, @Host=>"🐶")> <!-- @Host stops search here -->
        </#VIEW>
        </app-child>
    </#VIEW>
  </app-root>

```

Add a `viewProviders` array with a third animal, 🦔 (hedgehog), to the
`app.component.ts` `@Component()` metadata:

将带有第三个动物🦔（刺猬）的 `viewProviders` 数组添加到 `app.component.ts` 的 `@Component()` 元数据中：


```typescript

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  viewProviders: [{ provide: AnimalService, useValue: { emoji: '🦔' } }]
})

```

Next, add `@SkipSelf()` along with `@Host()` to the constructor for the
`Animal Service` in `child.component.ts`. Here are `@Host()`
and `@SkipSelf()` in the `<app-child>`
constructor :

接下来，同时把 `@SkipSelf()` 和 `@Host()` 加在 `child.component.ts` 中 `AnimalService` 的构造函数中。这是 `<app-child>` 构造函数中的 `@Host()` 和 `@SkipSelf()`：


```ts

export class ChildComponent {

  constructor(
  @Host() @SkipSelf() public animal : AnimalService) { }

}

```

When `@Host()` and `SkipSelf()` were applied to the `FlowerService`,
which is in the `providers` array, the result was `null` because
`@SkipSelf()` starts its search in the `<app-child>` injector, but
`@Host()` stops searching at `<#VIEW>`&mdash;where there is no
`FlowerService`. In the logical tree, you can see that the
`FlowerService` is visible in `<app-child>`, not its `<#VIEW>`.

将 `@Host()` 和 `SkipSelf()` 应用于 `providers` 数组中的 `FlowerService`，结果为 `null`，因为 `@SkipSelf()` 会在 `<app-child>` 的注入器中开始搜索，但是 `@Host()` 要求它在 `<#VIEW>` 停止搜索 —— 没有 `FlowerService` 。在逻辑树中，您可以看到 `FlowerService` 在 `<app-child>` 中可见，而在 `<#VIEW>` 中不可见。


However, the `AnimalService`, which is provided in the
`AppComponent` `viewProviders` array, is visible.

不过，提供在 `AppComponent` 的 `viewProviders` 数组中的 `AnimalService` ，是可见的。


The logical tree representation shows why this is:

逻辑树表示法说明了为何如此：


```html

<app-root @NgModule(AppModule)
        @Inject(AnimalService=>"🐳")>
  <#VIEW @Provide(AnimalService="🦔")
         @Inject(AnimalService, @SkipSelf, @Host, @Optional)=>"🦔">

    <!-- ^^@SkipSelf() starts here,  @Host() stops here^^ -->

    <app-child>
      <#VIEW @Provide(AnimalService="🐶")
             @Inject(AnimalService, @SkipSelf, @Host, @Optional)=>"🐶">

               <!-- Add @SkipSelf ^^-->

      </#VIEW>
      </app-child>
  </#VIEW>
</app-root>

```

`@SkipSelf()`, causes the injector to start its search for
the `AnimalService` at the `<app-root>`, not the `<app-child>`,
where the request originates, and `@Host()` stops the search
at the `<app-root>` `<#VIEW>`. Since `AnimalService` is
provided via the `viewProviders` array, the injector finds 🦔
(hedgehog) in the `<#VIEW>`.

`@SkipSelf()` 导致注入器从 `<app-root>` 而不是 `<app-child>` 处开始对 `AnimalService` 进行搜索，而 `@Host()` 会在 `<app-root>` 的 `<#VIEW>` 处停止搜索。
由于 `AnimalService` 是通过 `viewProviders` 数组提供的，因此注入程序会在 `<#VIEW>` 找到🦔（刺猬）。


{@a component-injectors}

## `ElementInjector` use case examples

## `ElementInjector` 用例示例


The ability to configure one or more providers at different levels
opens up useful possibilities.
For a look at the following scenarios in a working app, see the <live-example>heroes use case examples</live-example>.

在不同级别配置一个或多个提供者的能力开辟了很有用的可能性。要查看正在运行的应用中的以下情况，请参阅<live-example>英雄示例</live-example>。


### Scenario: service isolation

### 场景：服务隔离

Architectural reasons may lead you to restrict access to a service to the application domain where it belongs.
For example, the guide sample includes a `VillainsListComponent` that displays a list of villains.
It gets those villains from a `VillainsService`.

出于架构方面的考虑，可能会让你决定把一个服务限制到只能在它所属的那个应用域中访问。
比如，这个例子中包括一个用于显示反派列表的 `VillainsListComponent`，它会从 `VillainsService` 中获得反派列表数据。

If you provided `VillainsService` in the root `AppModule`
(where you registered the `HeroesService`),
that would make the `VillainsService` visible everywhere in the
application, including the _Hero_ workflows. If you later
modified the `VillainsService`, you could break something in a
hero component somewhere.

如果你在根模块 `AppModule` 中（也就是你注册 `HeroesService` 的地方）提供 `VillainsService`，就会让应用中的任何地方都能访问到 `VillainsService`，包括针对英雄的工作流。如果你稍后修改了 `VillainsService`，就可能破坏了英雄组件中的某些地方。在根模块 `AppModule` 中提供该服务将会引入此风险。

Instead, you can provide the `VillainsService` in the `providers` metadata of the `VillainsListComponent` like this:

该怎么做呢？你可以在 `VillainsListComponent` 的 `providers` 元数据中提供 `VillainsService`，就像这样：

<code-example path="hierarchical-dependency-injection/src/app/villains-list.component.ts" header="src/app/villains-list.component.ts (metadata)" region="metadata">

</code-example>

By providing `VillainsService` in the `VillainsListComponent` metadata and nowhere else,
the service becomes available only in the `VillainsListComponent` and its sub-component tree.

在 `VillainsListComponent` 的元数据中而不是其它地方提供 `VillainsService` 服务，该服务就会只在 `VillainsListComponent` 及其子组件树中可用。

`VillainService` is a singleton with respect to `VillainsListComponent`
because that is where it is declared. As long as `VillainsListComponent`
does not get destroyed it will be the same instance of `VillainService`
but if there are multilple instances of `VillainsListComponent`, then each
instance of `VillainsListComponent` will have its own instance of `VillainService`.

`VillainService` 对于 `VillainsListComponent` 来说是单例的，因为它就是在这里声明的。只要 `VillainsListComponent` 没有销毁，它就始终是 `VillainService` 的同一个实例。但是对于 `VillainsListComponent` 的多个实例，每个 `VillainsListComponent` 的实例都会有自己的 `VillainService` 实例。

### Scenario: multiple edit sessions


### 场景：多重编辑会话

Many applications allow users to work on several open tasks at the same time.
For example, in a tax preparation application, the preparer could be working on several tax returns,
switching from one to the other throughout the day.

很多应用允许用户同时进行多个任务。
比如，在纳税申报应用中，申报人可以打开多个报税单，随时可能从一个切换到另一个。

This guide demonstrates that scenario with an example in the Tour of Heroes theme.
Imagine an outer `HeroListComponent` that displays a list of super heroes.

本章要示范的场景仍然是基于《英雄指南》的。
想象一个外层的 `HeroListComponent`，它显示一个超级英雄的列表。

To open a hero's tax return, the preparer clicks on a hero name, which opens a component for editing that return.
Each selected hero tax return opens in its own component and multiple returns can be open at the same time.

要打开一个英雄的报税单，申报者点击英雄名，它就会打开一个组件来编辑那个申报单。
每个选中的申报单都会在自己的组件中打开，并且可以同时打开多个申报单。

Each tax return component has the following characteristics:

每个报税单组件都有下列特征：

* Is its own tax return editing session.

   属于它自己的报税单会话。

* Can change a tax return without affecting a return in another component.

   可以修改一个报税单，而不会影响另一个组件中的申报单。

* Has the ability to save the changes to its tax return or cancel them.

   能把所做的修改保存到它的报税单中，或者放弃它们。

<div class="lightbox">

  <img src="generated/images/guide/dependency-injection/hid-heroes-anim.gif" alt="Heroes in action">

</div>

Suppose that the `HeroTaxReturnComponent` had logic to manage and restore changes.
That would be a pretty easy task for a simple hero tax return.
In the real world, with a rich tax return data model, the change management would be tricky.
You could delegate that management to a helper service, as this example does.

假设 `HeroTaxReturnComponent` 还有一些管理并还原这些更改的逻辑。
这对于简单的报税单来说是很容易的。
不过，在现实世界中，报税单的数据模型非常复杂，对这些修改的管理可能不得不投机取巧。
你可以把这种管理任务委托给一个辅助服务，就像这个例子中所做的。

The `HeroTaxReturnService` caches a single `HeroTaxReturn`, tracks changes to that return, and can save or restore it.
It also delegates to the application-wide singleton `HeroService`, which it gets by injection.

报税单服务 `HeroTaxReturnService` 缓存了单条 `HeroTaxReturn`，用于跟踪那个申报单的变更，并且可以保存或还原它。
它还委托给了全应用级的单例服务 `HeroService`，它是通过依赖注入机制取得的。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.service.ts" header="src/app/hero-tax-return.service.ts">

</code-example>

Here is the `HeroTaxReturnComponent` that makes use of `HeroTaxReturnService`.

下面是正在使用 `HeroTaxReturnService` 的 `HeroTaxReturnComponent` 组件。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.component.ts" header="src/app/hero-tax-return.component.ts">

</code-example>

The _tax-return-to-edit_ arrives via the `@Input()` property, which is implemented with getters and setters.
The setter initializes the component's own instance of the `HeroTaxReturnService` with the incoming return.
The getter always returns what that service says is the current state of the hero.
The component also asks the service to save and restore this tax return.

通过 `@Input()` 属性可以得到*要编辑的报税单*，这个属性被实现成了读取器（getter）和设置器（setter）。
设置器根据传进来的报税单初始化了组件自己的 `HeroTaxReturnService` 实例。
读取器总是返回该服务所存英雄的当前状态。
组件也会请求该服务来保存或还原这个报税单。

This won't work if the service is an application-wide singleton.
Every component would share the same service instance, and each component would overwrite the tax return that belonged to another hero.

但如果该服务是一个全应用范围的单例就不行了。
每个组件就都会共享同一个服务实例，每个组件也都会覆盖属于其他英雄的报税单。

To prevent this, configure the component-level injector of `HeroTaxReturnComponent` to provide the service, using the  `providers` property in the component metadata.

要防止这一点，就要在 `HeroTaxReturnComponent` 元数据的 `providers` 属性中配置组件级的注入器，来提供该服务。

<code-example path="hierarchical-dependency-injection/src/app/hero-tax-return.component.ts" header="src/app/hero-tax-return.component.ts (providers)" region="providers">

</code-example>

The `HeroTaxReturnComponent` has its own provider of the `HeroTaxReturnService`.
Recall that every component _instance_ has its own injector.
Providing the service at the component level ensures that _every_ instance of the component gets its own, private instance of the service, and no tax return gets overwritten.

`HeroTaxReturnComponent` 有它自己的 `HeroTaxReturnService` 提供者。
回忆一下，每个组件的*实例*都有它自己的注入器。
在组件级提供服务可以确保组件的*每个*实例都得到一个自己的、私有的服务实例，而报税单也不会再被意外覆盖了。

<div class="alert is-helpful">

The rest of the scenario code relies on other Angular features and techniques that you can learn about elsewhere in the documentation.
You can review it and download it from the <live-example></live-example>.

该场景代码中的其它部分依赖另一些 Angular 的特性和技术，你将会在本文档的其它章节学到。
你可以到<live-example></live-example>查看代码和下载它。

</div>

### Scenario: specialized providers

### 场景：专门的提供者

Another reason to re-provide a service at another level is to substitute a _more specialized_ implementation of that service, deeper in the component tree.

在其它层级重新提供服务的另一个理由，是在组件树的深层中把该服务替换为一个*更专门化的*实现。

Consider a Car component that depends on several services.
Suppose you configured the root injector (marked as A) with _generic_ providers for
`CarService`, `EngineService` and `TiresService`.

考虑一个依赖于一系列服务的 Car 组件。
假设你在根注入器（代号 A）中配置了*通用的*提供者：`CarService`、`EngineService` 和 `TiresService`。

You create a car component (A) that displays a car constructed from these three generic services.

你创建了一个车辆组件（A），它显示一个从另外三个通用服务构造出的车辆。

Then you create a child component (B) that defines its own, _specialized_ providers for `CarService` and `EngineService`
that have special capabilities suitable for whatever is going on in component (B).

然后，你创建一个子组件（B），它为 `CarService` 和 `EngineService` 定义了自己*特有的*提供者，它们具有适用于组件 B 的特有能力。

Component (B) is the parent of another component (C) that defines its own, even _more specialized_ provider for `CarService`.

组件 B 是另一个组件 C 的父组件，而组件 C 又定义了自己的，*更特殊的*`CarService` 提供者。

<div class="lightbox">

  <img src="generated/images/guide/dependency-injection/car-components.png" alt="car components">

</div>

Behind the scenes, each component sets up its own injector with zero, one, or more providers defined for that component itself.

在幕后，每个组件都有自己的注入器，这个注入器带有为组件本身准备的 0 个、1 个或多个提供者。

When you resolve an instance of `Car` at the deepest component (C),
its injector produces an instance of `Car` resolved by injector (C) with an `Engine` resolved by injector (B) and
`Tires` resolved by the root injector (A).

当你在最深层的组件 C 解析 `Car` 的实例时，它使用注入器 C 解析生成了一个 `Car` 的实例，使用注入器 B 解析了 `Engine`，而 `Tires` 则是由根注入器 A 解析的。

<div class="lightbox">

  <img src="generated/images/guide/dependency-injection/injector-tree.png" alt="car injector tree">

</div>

<hr />

## More on dependency injection

## 关于依赖注入的更多知识

For more information on Angular dependency injection, see the [DI Providers](guide/dependency-injection-providers) and [DI in Action](guide/dependency-injection-in-action) guides.

要了解关于 Angular 依赖注入的更多信息，参见 [DI 提供者](guide/dependency-injection-providers)和 [DI 实战](guide/dependency-injection-in-action) 两章。
