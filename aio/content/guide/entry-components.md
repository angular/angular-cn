# Entry components

# 入口组件

An entry component is any component that Angular loads imperatively, (which means you’re not referencing it in the template), by type. You specify an entry component by bootstrapping it in an NgModule, or including it in a routing definition.

从分类上说，入口组件是 Angular 命令式加载的任意组件（也就是说你没有在模板中引用过它），
你可以在 NgModule 中引导它，或把它包含在路由定义中来指定入口组件。

<div class="alert is-helpful">

To contrast the two types of components, there are components which are included in the template, which are declarative. Additionally, there are components which you load imperatively; that is, entry components.

对比一下这两种组件类型：有一类组件被包含在模板中，它们是声明式加载的；另一类组件你会命令式加载它，这就是入口组件。

</div>

There are two main kinds of entry components:

入口组件有两种主要的类型：

* The bootstrapped root component.

   引导用的根组件。

* A component you specify in a route definition.

   在路由定义中指定的组件。

## A bootstrapped entry component

## 引导用的入口组件

The following is an example of specifying a bootstrapped component,
`AppComponent`, in a basic `app.module.ts`:

下面这个例子中指定了一个引导用组件 `AppComponent`，位于基本的 `app.module.ts` 中：

```typescript

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // bootstrapped entry component
})

```

A bootstrapped component is an entry component
that Angular loads into the DOM during the bootstrap process (application launch).
Other entry components are loaded dynamically by other means, such as with the router.

可引导组件是一个入口组件，Angular 会在引导过程中把它加载到 DOM 中。
其它入口组件是在其它时机动态加载的，比如用路由器。

Angular loads a root `AppComponent` dynamically because it's listed by type in `@NgModule.bootstrap`.

Angular 会动态加载根组件 `AppComponent`，是因为它的类型作为参数传给了 `@NgModule.bootstrap` 函数。

<div class="alert is-helpful">

A component can also be bootstrapped imperatively in the module's `ngDoBootstrap()` method.
The `@NgModule.bootstrap` property tells the compiler that this is an entry component and
it should generate code to bootstrap the application with this component.

组件也可以在该模块的 `ngDoBootstrap()` 方法中进行命令式引导。
`@NgModule.bootstrap` 属性告诉编译器，这里是一个入口组件，它应该生成代码，来使用这个组件引导该应用。

</div>

A bootstrapped component is necessarily an entry component because bootstrapping is an imperative process, thus it needs to have an entry component.

引导用的组件必须是入口组件，因为引导过程是命令式的，所以它需要一个入口组件。

## A routed entry component

## 路由到的入口组件

The second kind of entry component occurs in a route definition like
this:

入口组件的第二种类型出现在路由定义中，就像这样：

```typescript

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  }
];

```

A route definition refers to a component by its type with `component: CustomerListComponent`.

路由定义使用组件类型引用了一个组件：`component: CustomerListComponent`。

All router components must be entry components. Because this would require you to add the component in two places (router and `entryComponents`) the Compiler is smart enough to recognize that this is a router definition and automatically add the router component into `entryComponents`.

所有路由组件都必须是入口组件。这需要你把同一个组件添加到两个地方（路由中和 `entryComponents` 中），但编译器足够聪明，可以识别出这里是一个路由定义，因此它会自动把这些路由组件添加到 `entryComponents` 中。

## The `entryComponents` array

## `entryComponents` 数组

Though the `@NgModule` decorator has an `entryComponents` array, most of the time
you won't have to explicitly set any entry components because Angular adds components listed in `@NgModule.bootstrap` and those in route definitions to entry components automatically. Though these two mechanisms account for most entry components, if your app happens to bootstrap or dynamically load a component by type imperatively,
you must add it to `entryComponents` explicitly.

虽然 `@NgModule` 装饰器具有一个 `entryComponents` 数组，但大多数情况下你不用显式设置入口组件，因为 Angular 会自动把 `@NgModule.bootstrap` 中的组件以及路由定义中的组件添加到入口组件中。
虽然这两种机制足够自动添加大多数入口组件，但如果你要用其它方式根据类型来命令式的引导或动态加载某个组件，你就必须把它们显式添加到 `entryComponents` 中了。

### `entryComponents` and the compiler

### `entryComponents` 和编译器

For production apps you want to load the smallest code possible.
The code should contain only the classes that you actually need and
exclude components that are never used. For this reason, the Angular compiler only generates code for components which are reachable from the `entryComponents`; This means that adding more references to `@NgModule.declarations` does not imply that they will necessarily be included in the final bundle.

对于生产环境的应用，你总是希望加载尽可能小的代码。
这些代码应该只包含你实际使用到的类，并且排除那些从未用到的组件。因此，Angular 编译器只会为那些可以从 `entryComponents` 中直接或间接访问到的组件生成代码。
这意味着，仅仅往 `@NgModule.declarations` 中添加更多引用，并不能表达出它们在最终的代码包中是必要的。

In fact, many libraries declare and export components you'll never use.
For example, a material design library will export all components because it doesn’t know which ones you will use. However, it is unlikely that you will use them all.
For the ones you don't reference, the tree shaker drops these components from the final code package.

实际上，很多库声明和导出的组件都是你从未用过的。
比如，Material Design 库会导出其中的所有组件，因为它不知道你会用哪一个。然而，显然你也不打算全都用上。
对于那些你没有引用过的，摇树优化工具就会把这些组件从最终的代码包中摘出去。

If a component isn't an _entry component_ and isn't found in a template,
the tree shaker will throw it away. So, it's best to add only the components that are truly entry components to help keep your app
as trim as possible.

如果一个组件既不是*入口组件*也没有在模板中使用过，摇树优化工具就会把它扔出去。
所以，最好只添加那些真正的入口组件，以便让应用尽可能保持精简。

<hr />

## More on Angular modules

## 关于 Angular 模块的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Types of NgModules](guide/module-types)

   [NgModule 的分类](guide/module-types).

* [Lazy Loading Modules with the Angular Router](guide/lazy-loading-ngmodules).

   [使用 Angular 路由器惰性加载模块](guide/lazy-loading-ngmodules)。

* [Providers](guide/providers).

   [服务提供者](guide/providers)。

* [NgModules FAQ](guide/ngmodule-faq).

   [NgModule 常见问题](guide/ngmodule-faq).
