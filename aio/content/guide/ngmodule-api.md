# NgModule API

#### Prerequisites

A basic understanding of the following concepts:

对下列概念有基本的理解：

* [Bootstrapping](guide/bootstrapping).

* [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

<hr />

## Purpose of `@NgModule`

At a high level, NgModules are a way to organize Angular apps
and they accomplish this through the metadata in the `@NgModule`
decorator. The metadata falls
into three categories:

* **Static:** Compiler configuration which tells the compiler about directive selectors and where in templates the directives should be applied through selector matching. This is configured via the `declarations` array.

* **Runtime:** Injector configuration via the `providers` array.

* **Composability/Grouping:** Bringing NgModules together and making them available via the `imports` and `exports` arrays.

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

The following table summarizes the `@NgModule` metadata properties.

下面是`@NgModule`元数据中属性的汇总表：

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

      <ol>

        <li>

            When compiling a template, you need to determine a set of selectors which should be used for triggering their corresponding directives.

        </li>

        <li>
          The template is compiled within the context of an NgModule&mdash;the NgModule within which the template's component is declared&mdash;which determines the set of selectors using the following rules:
          <ul>

            <li>

                All selectors of directives listed in `declarations`.

            </li>

            <li>

                All selectors of directives exported from imported NgModules.

            </li>

          </ul>
        </li>
      </ol>

      Components, directives, and pipes must belong to _exactly_ one module.
      The compiler emits an error if you try to declare the same class in more than one module.

      组件、指令和管道*只能*属于一个模块。
      如果尝试把同一个类声明在多个模块中，编译器就会报告一个错误。

      Don't re-declare a class imported from another module.

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>providers</code>

    </td>

    <td>

      A list of dependency-injection providers.

      依赖注入提供商的列表。

      Angular registers these providers with the NgModule's injector.
      If it is the NgModule used for bootstrapping then it is the root injector.

      These services become available for injection into any component, directive, pipe or service which is a child of this injector.

      A lazy-loaded module has its own injector which
      is typically a child of the application root injector.

      Lazy-loaded services are scoped to the lazy module's injector.
      If a lazy-loaded module also provides the `UserService`,
      any component created within that module's context (such as by router navigation)
      gets the local instance of the service, not the instance in the root application injector.

      Components in external modules continue to receive the instance provided by their injectors.

      For more information on injector hierarchy and scoping, see [Providers](guide/providers).

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>imports</code>

    </td>

    <td>

      A list of modules which should be folded into this module. Folded means it is
      as if all the imported NgModule's exported properties were declared here.

      Specifically, it is as if the list of modules whose exported components, directives, or pipes
      are referenced by the component templates were declared in this module.

      A component template can [reference](guide/ngmodule-faq#q-template-reference) another component, directive, or pipe
      when the reference is declared in this module or if the imported module has exported it.
      For example, a component can use the `NgIf` and `NgFor` directives only if the
      module has imported the Angular `CommonModule` (perhaps indirectly by importing `BrowserModule`).

      You can import many standard directives from the `CommonModule`
      but some familiar directives belong to other modules.
      For example, you can use `[(ngModel)]` only
      after importing the Angular `FormsModule`.

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

      Declarations are private by default.
      If this module does _not_ export `UserComponent`, then only the components within _this_
      module can use `UserComponent`.

      Importing a module does _not_ automatically re-export the imported module's imports.
      Module 'B' can't use `ngIf` just because it imported module 'A' which imported `CommonModule`.
      Module 'B' must import `CommonModule` itself.

      A module can list another module among its `exports`, in which case
      all of that module's public components, directives, and pipes are exported.

      一个模块可以把另一个模块加入自己的`exports`列表中，这时，另一个模块的所有公共组件、指令和管道都会被导出。

      [Re-export](guide/ngmodule-faq#q-reexport) makes module transitivity explicit.
      If Module 'A' re-exports `CommonModule` and Module 'B' imports Module 'A',
      Module 'B' components can use `ngIf` even though 'B' itself didn't import `CommonModule`.

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>bootstrap</code>

    </td>

    <td>

      A list of components that are automatically bootstrapped.

      Usually there's only one component in this list, the _root component_ of the application.

      通常，在这个列表中只有一个组件，也就是应用的*根组件*。

      Angular can launch with multiple bootstrap components,
      each with its own location in the host web page.

      Angular也可以引导多个引导组件，它们每一个都在宿主页面中有自己的位置。

      A bootstrap component is automatically added to `entryComponents`.

    </td>

  </tr>

  <tr>

    <td style="vertical-align: top">

      <code>entryComponents</code>

    </td>

    <td>

      A list of components that can be dynamically loaded into the view.

      By default, an Angular app always has at least one entry component, the root component, `AppComponent`. Its purpose is to serve as a point of entry into the app, that is, you bootstrap it to launch the app.

      Routed components are also _entry components_ because they need to be loaded dynamically.
      The router creates them and drops them into the DOM near a `<router-outlet>`.

      While the bootstrapped and routed components are _entry components_,
      you don't have to add them to a module's `entryComponents` list,
      as they are added implicitly.

      Angular automatically adds components in the module's `bootstrap` and route definitions into the `entryComponents` list.

      That leaves only components bootstrapped using one of the imperative techniques, such as [`ViewComponentRef.createComponent()`](https://angular.io/api/core/ViewContainerRef#createComponent) as undiscoverable.

      Dynamic component loading is not common in most apps beyond the router. If you need to dynamically load components, you must add these components to the `entryComponents` list yourself.

      For more information, see [Entry Components](guide/entry-components).

      要了解更多，参见[入口组件](guide/entry-components)一章。

    </td>

  </tr>

</table>

<hr />

## More on NgModules

You may also be interested in the following:

* [Feature Modules](guide/feature-modules).

* [Entry Components](guide/entry-components).

* [Providers](guide/providers).

* [Types of Feature Modules](guide/module-types).
