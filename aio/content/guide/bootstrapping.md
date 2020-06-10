# Launching your app with a root module

# 启动过程

#### Prerequisites

#### 前提条件

A basic understanding of the following:

对下列知识有基本的了解：

* [JavaScript Modules vs. NgModules](guide/ngmodule-vs-jsmodule).

   [JavaScript 模块与 NgModules](guide/ngmodule-vs-jsmodule)。

<hr />

An NgModule describes how the application parts fit together.
Every application has at least one Angular module, the _root_ module,
which must be present for bootstrapping the application on launch.
By convention and by default, this NgModule is named `AppModule`.

`NgModule` 用于描述应用的各个部分如何组织在一起。
每个应用有至少一个 Angular 模块，*根*模块就是你用来启动此应用的模块。
按照惯例，它通常命名为 `AppModule`。

When you use the [Angular CLI](cli) command `ng new` to generate an app, the default `AppModule` is as follows.

当你使用 [Angular CLI](cli) 命令 `ng new` 生成一个应用时，其默认的 `AppModule` 是这样的：

```typescript

/* JavaScript imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

/* the AppModule class with the @NgModule decorator */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

After the import statements is a class with the
**`@NgModule`** [decorator](guide/glossary#decorator '"Decorator" explained').

在 `import` 语句之后，是一个带有 **`@NgModule`** [装饰器](guide/glossary#decorator '"Decorator" explained')的类。

The `@NgModule` decorator identifies `AppModule` as an `NgModule` class.
`@NgModule` takes a metadata object that tells Angular how to compile and launch the application.

`@NgModule` 装饰器表明 `AppModule` 是一个 `NgModule` 类。
`@NgModule` 获取一个元数据对象，它会告诉 Angular 如何编译和启动本应用。

* **_declarations_**&mdash;this application's lone component.

   **_declarations_** —— 该应用所拥有的组件。

* **_imports_**&mdash;import `BrowserModule` to have browser specific services such as DOM rendering, sanitization, and location.

   **_imports_** —— 导入 `BrowserModule` 以获取浏览器特有的服务，比如 DOM 渲染、无害化处理和位置（location）。

* **_providers_**&mdash;the service providers.

   **_providers_** —— 各种服务提供者。

* **_bootstrap_**&mdash;the _root_ component that Angular creates and inserts
into the `index.html` host web page.

   **_bootstrap_** —— *根*组件，Angular 创建它并插入 `index.html` 宿主页面。

The default application created by the Angular CLI only has one component, `AppComponent`, so it
is in both the `declarations` and the `bootstrap` arrays.

Angular CLI 创建的默认应用只有一个组件 `AppComponent`，所以它会同时出现在 `declarations` 和 `bootstrap` 数组中。

{@a declarations}

## The `declarations` array

## `declarations` 数组

The module's `declarations` array tells Angular which components belong to that module.
As you create more components, add them to `declarations`.

该模块的 `declarations` 数组告诉 Angular 哪些组件属于该模块。
当你创建更多组件时，也要把它们添加到 `declarations` 中。

You must declare every component in exactly one `NgModule` class.
If you use a component without declaring it, Angular returns an
error message.

每个组件都应该（且只能）声明（declare）在一个 `NgModule` 类中。如果你使用了未声明过的组件，Angular 就会报错。

The `declarations` array only takes declarables. Declarables
are components, [directives](guide/attribute-directives) and [pipes](guide/pipes).
All of a module's declarables must be in the `declarations` array.
Declarables must belong to exactly one module. The compiler emits
an error if you try to declare the same class in more than one module.

`declarations` 数组只能接受可声明对象。可声明对象包括组件、[指令](guide/attribute-directives)和[管道](guide/pipes)。
一个模块的所有可声明对象都必须放在 `declarations` 数组中。
可声明对象必须只能属于一个模块，如果同一个类被声明在了多个模块中，编译器就会报错。

These declared classes are visible within the module but invisible
to components in a different module unless they are exported from
this module and the other module imports this one.

这些可声明的类在当前模块中是可见的，但是对其它模块中的组件是不可见的 —— 除非把它们从当前模块导出，
并让对方模块导入本模块。

An example of what goes into a declarations array follows:

下面是哪些类可以添加到 `declarations` 数组中的例子：

```typescript

  declarations: [
    YourComponent,
    YourPipe,
    YourDirective
  ],

```

A declarable can only belong to one module, so only declare it in
one `@NgModule`. When you need it elsewhere,
import the module that has the declarable you need in it.

每个可声明对象都只能属于一个模块，所以只能把它声明在一个 `@NgModule` 中。当你需要在其它模块中使用它时，就要在那里导入包含这个可声明对象的模块。

**Only `@NgModule` references** go in the `imports` array.

**只有 `@NgModule`** 可以出现在 `imports` 数组中。

### Using directives with `@NgModule`

### 通过 `@NgModule` 使用指令

Use the `declarations` array for directives.
To use a directive, component, or pipe in a module, you must do a few things:

使用 `declarations` 数组声明指令。在模块中使用指令、组件或管道的步骤如下：

1. Export it from the file where you wrote it.

   从你编写它的文件中导出它。

2. Import it into the appropriate module.

   把它导入到适当的模块中。

3. Declare it in the `@NgModule` `declarations` array.

   在 `@NgModule` 的 `declarations` 数组中声明它。

Those three steps look like the following. In the file where you create your directive, export it.
The following example, named `ItemDirective` is the default directive structure that the CLI generates in its own file, `item.directive.ts`:

这三步的结果如下所示。在你创建指令的文件中导出它。
下面的例子中，`item.directive.ts` 中的 `ItemDirective` 是 CLI 自动生成的默认指令结构。

<code-example path="bootstrapping/src/app/item.directive.ts" region="directive" header="src/app/item.directive.ts"></code-example>

The key point here is that you have to export it so you can import it elsewhere. Next, import it
into the `NgModule`, in this example `app.module.ts`, with a JavaScript import statement:

重点在于你要先在这里导出它才能在别处导入它。接下来，使用 JavaScript 的 `import` 语句把它导入到 `NgModule` 中（这里是 `app.module.ts`）。

<code-example path="bootstrapping/src/app/app.module.ts" region="directive-import" header="src/app/app.module.ts"></code-example>

And in the same file, add it to the `@NgModule` `declarations` array:

同样在这个文件中，把它添加到 `@NgModule` 的 `declarations` 数组中：

<code-example path="bootstrapping/src/app/app.module.ts" region="declarations" header="src/app/app.module.ts"></code-example>

Now you could use your `ItemDirective` in a component. This example uses `AppModule`, but you'd do it the same way for a feature module. For more about directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives). You'd also use the same technique for [pipes](guide/pipes) and components.

现在，你就可以在组件中使用 `ItemDirective` 了。这个例子中使用的是 `AppModule`，但是在特性模块中你也可以这么做。
要进一步了解指令，参见[属性型指令](guide/attribute-directives)和[结构型指令](guide/structural-directives)。
这些也同样适用于[管道](guide/pipes)和组件。

Remember, components, directives, and pipes belong to one module only. You only need to declare them once in your app because you share them by importing the necessary modules. This saves you time and helps keep your app lean.

记住：组件、指令和管道都只能属于一个模块。你在应用中也只需要声明它们一次，因为你还可以通过导入必要的模块来使用它们。这能节省你的时间，并且帮助你的应用保持精简。

{@a imports}

## The `imports` array

## `imports` 数组

The module's `imports` array appears exclusively in the `@NgModule` metadata object.
It tells Angular about other NgModules that this particular module needs to function properly.

模块的 `imports` 数组只会出现在 `@NgModule` 元数据对象中。
它告诉 Angular 该模块想要正常工作，还需要哪些模块。

This list of modules are those that export components, directives, or pipes
that the component templates in this module reference. In this case, the component is
`AppComponent`, which references components, directives, or pipes in `BrowserModule`,
`FormsModule`, or  `HttpClientModule`.
A component template can reference another component, directive,
or pipe when the referenced class is declared in this module or
the class was imported from another module.

列表中的模块导出了本模块中的各个组件模板中所引用的各个组件、指令或管道。在这个例子中，当前组件是 `AppComponent`，它引用了导出自 `BrowserModule`、`FormsModule` 或 `HttpClientModule` 的组件、指令或管道。
总之，组件的模板中可以引用在当前模块中声明的或从其它模块中导入的组件、指令、管道。

{@a bootstrap-array}

## The `providers` array

## `providers` 数组

The providers array is where you list the services the app needs. When
you list services here, they are available app-wide. You can scope
them when using feature modules and lazy loading. For more information, see
[Providers](guide/providers).

`providers` 数组中列出了该应用所需的服务。当直接把服务列在这里时，它们是全应用范围的。
当你使用特性模块和惰性加载时，它们是范围化的。要了解更多，参见[服务提供者](guide/providers)。

## The `bootstrap` array

## `bootstrap` 数组

The application launches by bootstrapping the root `AppModule`, which is
also referred to as an `entryComponent`.
Among other things, the bootstrapping process creates the component(s) listed in the `bootstrap` array
and inserts each one into the browser DOM.

应用是通过引导根模块 `AppModule` 来启动的，根模块还引用了 `entryComponent`。
此外，引导过程还会创建 `bootstrap` 数组中列出的组件，并把它们逐个插入到浏览器的 DOM 中。

Each bootstrapped component is the base of its own tree of components.
Inserting a bootstrapped component usually triggers a cascade of
component creations that fill out that tree.

每个被引导的组件都是它自己的组件树的根。
插入一个被引导的组件通常触发一系列组件的创建并形成组件树。

While you can put more than one component tree on a host web page,
most applications have only one component tree and bootstrap a single root component.

虽然也可以在宿主页面中放多个组件，但是大多数应用只有一个组件树，并且只从一个根组件开始引导。

This one root component is usually called `AppComponent` and is in the
root module's `bootstrap` array.

这个根组件通常叫做 `AppComponent`，并且位于根模块的 `bootstrap` 数组中。

## More about Angular Modules

## 关于 Angular 模块的更多知识

For more on NgModules you're likely to see frequently in apps,
see [Frequently Used Modules](guide/frequent-ngmodules).

要进一步了解常见的 NgModules 知识，参见 [关于模块的常见问题](guide/frequent-ngmodules)。
