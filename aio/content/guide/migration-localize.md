# `$localize` Global Import Migration

# `$localize` 全局导入的迁移

## What does this schematic do?

## 这个原理图做了什么？

If you're using i18n, this schematic adds an import statement for `@angular/localize` to `polyfills.ts` that will look something like this:

如果你正在使用 i18n，这个原理图会为 `@angular/localize` 添加一个导入 `polyfills.ts` 的语句，就像这样：

```ts
/******************************************************************
 * Load `$localize` - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
```

It also lists `@angular/localize` as a dependency in your app's `package.json` to ensure the import is found.

它还会在应用的 `package.json` 中列出 `@angular/localize` 作为依赖，以确保找到导入。

```json

"dependencies": {
  ...
  "@angular/localize": "...",
  ...
}

```

`@angular/localize` is a new package that supports i18n of messages in Ivy applications.
This package requires a global `$localize` symbol to exist.
The symbol is loaded by importing the `@angular/localize/init` module, which has the side-effect of attaching it to the global scope.

`@angular/localize` 是一个新的包，它在 Ivy 应用中支持信息的 i18n。该包需要一个全局的 `$localize` 符号才能存在。该符号是通过导入 `@angular/localize/init` 模块来加载的，该模块的副作用是将其附加到全局作用域。

## Why is this migration necessary?

## 为何这次迁移是必须的？

Prior to Angular version 9, Angular's internationalization (i18n) system inlined translated messages into the compiled output as part of this template compilation.
This approach required running the template compiler once per target locale, often leading to slow production build times.

在 Angular 第 9 版之前，Angular 的国际化（i18n）系统会把已翻译的消息内联到编译输出中，作为模板编译的一部分。这种方法要求为每个目标本地环境运行一次模板编译器，这通常会导致生产构建时间变慢。

In the new i18n system, the Angular compiler tags i18n messages in the compiled code with a global `$localize` handler.
The inlining of translations then occurs as a post-compilation step for each locale.
Because the application does not need to be built again for each locale, this makes the process much faster.

在新的 i18n 系统中，Angular 编译器使用全局 `$localize` 处理函数在已编译的代码中标记 i18n 消息。然后这些翻译的内联工作会作为每种本地环境的后编译步骤。由于不需要为每个本地环境重复构建应用，所以这会让这个过程更快。

The post-compilation inlining step is optional&mdash;for example during development or if the translations will be inlined at runtime.
Therefore this global `$localize` must be available on the global scope at runtime.
To make `$localize` available on the global scope, each application must now import the `@angular/localize/init` module.
This has the side-effect of attaching a minimal implementation of `$localize` to the global scope.

编译后的内联步骤是可选的 - 比如在开发过程中，或者运行期内联时。因此，这个 `$localize` 在运行时必须在全局范围内可用。为了让全局范围内的 `$localize` 可用，每个应用程序现在都必须导入 `@angular/localize/init` 模块。这就是把 `$localize` 的一个最小实现附加到全局范围带来的副作用。

If this import is missing, you will see an error message like this:

如果缺少这个导入，你会看到如下错误信息：

```
Error: It looks like your application or one of its dependencies is using i18n.
Angular 9 introduced a global `$localize()` function that needs to be loaded.
Please run `ng add @angular/localize` from the Angular CLI.
(For non-CLI projects, add `import '@angular/localize/init';` to your polyfills.ts file)
```

This schematic automatically adds the `@angular/localize/init` import for you
if your app uses Angular's i18n APIs.

如果你的应用使用的是 Angular 的 i18n API，此原理图会自动为你添加 `@angular/localize/init` 的导入。

## Why is my tslint failing?

## 为什么我的 tslint 失败了？

The import of `@angular/localize/init` may cause a tslint error for `no-import-side-effect` because it adds to the global context (that is, a side effect).
To fix this error, add the following to your `tslint.config`:

`@angular/localize/init` 的导入可能会导致 `no-import-side-effect` 的 tslint 错误，因为它会添加全局上下文（也就是副作用）。要修复此错误，请在 `tslint.config` 添加如下 `tslint.config` ：

```json

"no-import-side-effect": [
  true,
  {
    "ignore-module": "(core-js/.*|zone\\.js/.*|@angular/localize/init)$"
  }
]

```


## Do I need to change how I write i18n in my Angular templates?

## 我是否需要改变在 Angular 模板中编写 i18n 的方式？

The template syntax for i18n has not changed, so you will still want to use the `i18n` attribute as you did before.

i18n 的模板语法没有改变，所以你仍要像以前一样使用 `i18n` 属性。
