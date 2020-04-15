# NgModule API

At a high level, NgModules are a way to organize Angular apps
and they accomplish this through the metadata in the `@NgModule`
decorator.
The metadata falls into three categories:

宏观来讲，NgModule 是组织 Angular 应用的一种方式，它们通过 `@NgModule` 装饰器中的元数据来实现这一点。
这些元数据可以分成三类：

* **Static:** Compiler configuration which tells the compiler about directive selectors and where in templates the directives should be applied through selector matching. This is configured via the `declarations` array.

   **静态的：**编译器配置，用于告诉编译器指令的选择器并通过选择器匹配的方式决定要把该指令应用到模板中的什么位置。它是通过 `declarations` 数组来配置的。

* **Runtime:** Injector configuration via the `providers` array.

   **运行时：**通过 `providers` 数组提供给注入器的配置。

* **Composability/Grouping:** Bringing NgModules together and making them available via the `imports` and `exports` arrays.

   **组合/分组：**通过 `imports` 和 `exports` 数组来把多个 NgModule 放在一起，并让它们可用。

```typescript

@NgModule({
  // Static, that is compiler configuration
  declarations: [], // Configure the selectors
  entryComponents: [], // Generate the host factory

  // Runtime, or injector configuration
  providers: [], // Runtime injector configuration

  // Composability / Grouping
  imports: [], // composing NgModules together
  exports: [] // making NgModules available to other parts of the app
})

```

## `@NgModule` metadata

## `@NgModule` 元数据

The following table summarizes the `@NgModule` metadata properties.

下面是 `@NgModule` 元数据中属性的汇总表：

<table>

  <tr>

    <th>

      Property

      属性

    </th>

    <th>

      Description

      说明

    </th>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>declarations</code>

    </td>

    <td>

      A list of [declarable](guide/ngmodule-faq#q-declarable) classes,
      (*components*, *directives*, and *pipes*) that _belong to this module_.

      *属于该模块*的[可声明对象](guide/ngmodule-faq#q-declarable)（*组件*、*指令*和*管道*）的列表。

      <ol>

        <li>

            When compiling a template, you need to determine a set of selectors which should be used for triggering their corresponding directives.

            当编译模板时，你需要确定一组选择器，它们将用于触发相应的指令。

        </li>

        <li>

          The template is compiled within the context of an NgModule&mdash;the NgModule within which the template's component is declared&mdash;which determines the set of selectors using the following rules:

          该模板在 NgModule 环境中编译 —— 模板的组件是在该 NgModule 内部声明的，它会使用如下规则来确定这组选择器：

          <ul>

            <li>

                All selectors of directives listed in `declarations`.

                列在 `declarations` 中的所有指令选择器。

            </li>

            <li>

                All selectors of directives exported from imported NgModules.

                从所导入的 NgModule 中导出的那些指令的选择器。

            </li>

          </ul>

        </li>

      </ol>

      Components, directives, and pipes must belong to _exactly_ one module.
      The compiler emits an error if you try to declare the same class in more than one module. Be careful not to re-declare a class that is imported
      directly or indirectly from another module.

      组件、指令和管道*只能*属于一个模块。
      如果尝试把同一个类声明在多个模块中，编译器就会报告一个错误。
      小心，不要重复声明从其它模块中直接或间接导入的类。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>providers</code>

    </td>

    <td>

      A list of dependency-injection providers.

      依赖注入提供者的列表。

      Angular registers these providers with the NgModule's injector.
      If it is the NgModule used for bootstrapping then it is the root injector.

      Angular 会使用该模块的注入器注册这些提供者。
      如果该模块是启动模块，那就会使用根注入器。

      These services become available for injection into any component, directive, pipe or service which is a child of this injector.

      当需要注入到任何组件、指令、管道或服务时，这些服务对于本注入器的子注入器都是可用的。

      A lazy-loaded module has its own injector which
      is typically a child of the application root injector.

      惰性加载模块有自己的注入器，它通常是应用的根注入器的子注入器。

      Lazy-loaded services are scoped to the lazy module's injector.
      If a lazy-loaded module also provides the `UserService`,
      any component created within that module's context (such as by router navigation)
      gets the local instance of the service, not the instance in the root application injector.

      惰性加载的服务是局限于这个惰性加载模块的注入器中的。
      如果惰性加载模块也提供了 `UserService`，那么在这个模块的上下文中创建的任何组件（比如在路由器导航时），都会获得这个服务的本模块内实例，而不是来自应用的根注入器的实例。

      Components in external modules continue to receive the instance provided by their injectors.

      其它外部模块中的组件也会使用它们自己的注入器提供的服务实例。

      For more information on injector hierarchy and scoping, see [Providers](guide/providers) and the [DI Guide](guide/dependency-injection).

      要深入了解关于多级注入器及其作用域，参见[服务提供者](guide/providers)。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>imports</code>

    </td>

    <td>

      A list of modules which should be folded into this module. Folded means it is
      as if all the imported NgModule's exported properties were declared here.

      要折叠（Folded）进本模块中的其它模块。折叠的意思是从被导入的模块中导出的那些软件资产同样会被声明在这里。

      Specifically, it is as if the list of modules whose exported components, directives, or pipes
      are referenced by the component templates were declared in this module.

      特别是，这里列出的模块，其导出的组件、指令或管道，当在组件模板中被引用时，和本模块自己声明的那些是等价的。

      A component template can [reference](guide/ngmodule-faq#q-template-reference) another component, directive, or pipe
      when the reference is declared in this module or if the imported module has exported it.
      For example, a component can use the `NgIf` and `NgFor` directives only if the
      module has imported the Angular `CommonModule` (perhaps indirectly by importing `BrowserModule`).

      组件模板可以[引用](guide/ngmodule-faq#q-template-reference)其它组件、指令或管道，不管它们是在本模块中声明的，还是从导入的模块中导出的。
      比如，只有当该模块导入了 Angular 的 `CommonModule（也可能从 `BrowserModule` 中间接导入）时，组件才能使用 `NgIf` 和 `NgFor` 指令。

      You can import many standard directives from the `CommonModule`
      but some familiar directives belong to other modules.
      For example, you can use `[(ngModel)]` only
      after importing the Angular `FormsModule`.

      你可以从 `CommonModule` 中导入很多标准指令，不过也有些常用的指令属于其它模块。
      比如，你只有导入了 Angular 的 `FormsModule` 时才能使用 `[(ngModel)]`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>exports</code>

    </td>

    <td>

      A list of declarations&mdash;*component*, *directive*, and *pipe* classes&mdash;that
      an importing module can use.

      可供导入了自己的模块使用的可声明对象（**组件**、**指令**、**管道类**）的列表。

      Exported declarations are the module's _public API_.
      A component in another module can [use](guide/ngmodule-faq#q-template-reference) _this_
      module's `UserComponent` if it imports this module and this module exports `UserComponent`.

      导出的可声明对象就是本模块的*公共 API*。
      只有当其它模块导入了本模块，并且本模块导出了 `UserComponent` 时，其它模块中的组件才能[使用](guide/ngmodule-faq#q-template-reference)*本*模块中的 `UserComponent`。

      Declarations are private by default.
      If this module does _not_ export `UserComponent`, then only the components within _this_
      module can use `UserComponent`.

      默认情况下这些可声明对象都是私有的。
      如果本模块*没有*导出 `UserComponent`，那么就只有*本*模块中的组件才能使用 `UserComponent`。

      Importing a module does _not_ automatically re-export the imported module's imports.
      Module 'B' can't use `ngIf` just because it imported module 'A' which imported `CommonModule`.
      Module 'B' must import `CommonModule` itself.

      导入某个模块*并不会*自动重新导出被导入模块的那些导入。
      模块 B 不会因为它导入了模块 A，而模块 A 导入了 `CommonModule` 而能够使用 `ngIf`。
      模块 B 必须自己导入 `CommonModule`。

      A module can list another module among its `exports`, in which case
      all of that module's public components, directives, and pipes are exported.

      一个模块可以把另一个模块加入自己的 `exports` 列表中，这时，另一个模块的所有公共组件、指令和管道都会被导出。

      [Re-export](guide/ngmodule-faq#q-reexport) makes module transitivity explicit.
      If Module 'A' re-exports `CommonModule` and Module 'B' imports Module 'A',
      Module 'B' components can use `ngIf` even though 'B' itself didn't import `CommonModule`.

      [重新导出](guide/ngmodule-faq#q-reexport)可以让模块被显式传递。
      如果模块 A 重新导出了 `CommonModule`，而模块 B 导入了模块 A，那么模块 B 就可以使用 `ngIf` 了 —— 即使它自己没有导入 `CommonModule`。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>bootstrap</code>

    </td>

    <td>

      A list of components that are automatically bootstrapped.

      要自动启动的组件列表。

      Usually there's only one component in this list, the _root component_ of the application.

      通常，在这个列表中只有一个组件，也就是应用的*根组件*。

      Angular can launch with multiple bootstrap components,
      each with its own location in the host web page.

      Angular 也可以用多个引导组件进行启动，它们每一个在宿主页面中都有自己的位置。

      A bootstrap component is automatically added to `entryComponents`.

      启动组件会自动添加到 `entryComponents` 中。

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>entryComponents</code>

    </td>

    <td>

      A list of components that can be dynamically loaded into the view.

      那些可以动态加载进视图的组件列表。

      By default, an Angular app always has at least one entry component, the root component, `AppComponent`. Its purpose is to serve as a point of entry into the app, that is, you bootstrap it to launch the app.

      默认情况下，Angular 应用至少有一个入口组件，也就是根组件 `AppComponent`。
      它用作进入该应用的入口点，也就是说你通过引导它来启动本应用。

      Routed components are also _entry components_ because they need to be loaded dynamically.
      The router creates them and drops them into the DOM near a `<router-outlet>`.

      路由组件也是*入口组件*，因为你需要动态加载它们。
      路由器创建它们，并把它们扔到 DOM 中的 `<router-outlet>` 附近。

      While the bootstrapped and routed components are _entry components_,
      you don't have to add them to a module's `entryComponents` list,
      as they are added implicitly.

      虽然引导组件和路由组件都是*入口组件*，不过你不用自己把它们加到模块的 `entryComponents` 列表中，因为它们会被隐式添加进去。

      Angular automatically adds components in the module's `bootstrap` and route definitions into the `entryComponents` list.

      Angular 会自动把模块的 `bootstrap` 中的组件和路由定义中的组件添加到 `entryComponents` 列表。

      That leaves only components bootstrapped using one of the imperative techniques, such as [`ViewComponentRef.createComponent()`](https://angular.io/api/core/ViewContainerRef#createComponent) as undiscoverable.

      而那些使用不易察觉的[`ViewComponentRef.createComponent()`](https://angular.cn/api/core/ViewContainerRef#createComponent)的方式进行命令式引导的组件仍然需要添加。

      Dynamic component loading is not common in most apps beyond the router. If you need to dynamically load components, you must add these components to the `entryComponents` list yourself.

      动态组件加载在除路由器之外的大多数应用中都不太常见。如果你需要动态加载组件，就必须自己把那些组件添加到 `entryComponents` 列表中。

      For more information, see [Entry Components](guide/entry-components).

      要了解更多，参见[入口组件](guide/entry-components)一章。

    </td>

  </tr>

</table>

<hr />

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Feature Modules](guide/feature-modules).

   [特性模块](guide/feature-modules)

* [Entry Components](guide/entry-components).

   [入口组件](guide/entry-components)

* [Providers](guide/providers).

   [服务提供者](guide/providers)。

* [Types of Feature Modules](guide/module-types).

   [特性模块的分类](guide/module-types)。
