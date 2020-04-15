# JavaScript modules vs. NgModules

# JavaScript 模块 vs. NgModule

JavaScript and Angular use modules to organize code, and
though they organize it differently, Angular apps rely on both.

JavaScript 和 Angular 都使用模块来组织代码，虽然它们的组织形式不同，但 Angular 的应用会同时依赖两者。

## JavaScript modules

## JavaScript 模块

In JavaScript, modules are individual files with JavaScript code in them. To make what’s in them available, you write an export statement, usually after the relevant code, like this:

在 JavaScript 中，模块是内含 JavaScript 代码的独立文件。要让其中的东西可用，你要写一个导出语句，通常会放在相应的代码之后，类似这样：

```typescript

export class AppComponent { ... }

```

Then, when you need that file’s code in another file, you import it like this:

然后，当你在其它文件中需要这个文件的代码时，要像这样导入它：

```typescript

import { AppComponent } from './app.component';

```

JavaScript modules help you namespace, preventing accidental global variables.

JavaScript 模块让你能为代码加上命名空间，防止因为全局变量而引起意外。

For more information on JavaScript modules, see [JavaScript/ECMAScript modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/).

要了解 JavaScript 模块的更多知识，参见 [JavaScript/ECMAScript 模块](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)。

## NgModules

<!-- KW-- perMisko: let's discuss. This does not answer the question why it is different. Also, last sentence is confusing.-->

NgModules are classes decorated with `@NgModule`. The `@NgModule` decorator’s `imports` array tells Angular what other NgModules the current module needs. The modules in the `imports` array are different than JavaScript modules because they are NgModules rather than regular JavaScript modules. Classes with an `@NgModule` decorator are by convention kept in their own files, but what makes them an `NgModule` isn’t being in their own file, like JavaScript modules; it’s the presence of `@NgModule` and its metadata.

NgModule 是一些带有 `@NgModule` 装饰器的类。`@NgModule` 装饰器的 `imports` 数组会告诉 Angular 哪些其它的 NgModule 是当前模块所需的。
`imports` 数组中的这些模块与 JavaScript 模块不同，它们都是 NgModule 而不是常规的 JavaScript 模块。
带有 `@NgModule` 装饰器的类通常会习惯性地放在单独的文件中，但单独的文件并不像 JavaScript 模块那样作为必要条件，而是因为它带有 `@NgModule` 装饰器及其元数据。

The `AppModule` generated from the [Angular CLI](cli) demonstrates both kinds of modules in action:

[Angular CLI](cli) 生成的 `AppModule` 实际演示了这两种模块：

```typescript

/* These are JavaScript import statements. Angular doesn’t know anything about these. */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/* The @NgModule decorator lets Angular know that this is an NgModule. */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [     /* These are NgModule imports. */
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

The NgModule classes differ from JavaScript module in the following key ways:

NgModule 类与 JavaScript 模块有下列关键性的不同：

* An NgModule bounds [declarable classes](guide/ngmodule-faq#q-declarable) only.
Declarables are the only classes that matter to the [Angular compiler](guide/ngmodule-faq#q-angular-compiler).

   NgModule 只绑定了[*可声明的类*](guide/ngmodule-faq#q-declarable)，这些可声明的类只是供 [Angular 编译器](guide/ngmodule-faq#q-angular-compiler)用的。

* Instead of defining all member classes in one giant file as in a JavaScript module,
you list the module's classes in the `@NgModule.declarations` list.

   与 JavaScript 类把它所有的成员类都放在一个巨型文件中不同，你要把该模块的类列在它的 `@NgModule.declarations` 列表中。

* An NgModule can only export the [declarable classes](guide/ngmodule-faq#q-declarable)
it owns or imports from other modules. It doesn't declare or export any other kind of class.

   NgModule 只能导出[*可声明的类*](guide/ngmodule-faq#q-declarable)。这可能是它自己拥有的也可能是从其它模块中导入的。它不会声明或导出任何其它类型的类。

* Unlike JavaScript modules, an NgModule can extend the _entire_ application with services
by adding providers to the `@NgModule.providers` list.

   与 JavaScript 模块不同，NgModule 可以通过把服务提供者加到 `@NgModule.providers` 列表中，来用服务扩展*整个*应用。

<hr />

## More on NgModules

## 关于 NgModule 的更多知识

For more information on NgModules, see:

要了解关于 NgModule 的更多知识，参见

* [Bootstrapping](guide/bootstrapping).

   [引导启动](guide/bootstrapping)。

* [Frequently used modules](guide/frequent-ngmodules).

   [常用模块](guide/frequent-ngmodules)。

* [Providers](guide/providers).

   [服务提供者](guide/providers)。
