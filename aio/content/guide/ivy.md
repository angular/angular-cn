# Opting into Angular Ivy

# 选用 Angular Ivy ['aɪvɪ]（常春藤）

Ivy is the code name for Angular's [next-generation compilation and rendering pipeline](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7). Starting with Angular version 8, you can choose to opt in to start using a preview version of Ivy and help in its continuing development and tuning.

<div class="alert is-helpful">

   To preview Ivy, use `@angular/core@next` version of Angular (8.1.x), rather than `@angular/core@latest` (8.0.x), as it contains all the latest bug fixes and improvements.

</div>

Ivy 是 Angular [下一代编译和渲染管道](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7)的代号。从 Angular 的版本 8 开始，你就可以开始选用 Ivy 了，以帮助它继续开发和调优。


## Using Ivy in a new project

## 在新项目中使用 Ivy


To start a new project with Ivy enabled, use the `--enable-ivy` flag with the [`ng new`](cli/new) command:

要启动基于 Ivy 的新项目，可以在 [`ng new`](cli/new) 命令中使用 `--enable-ivy` 标志：


```sh
ng new shiny-ivy-app --enable-ivy
```

The new project is automatically configured for Ivy. Specifically, the enableIvy option is set to `true` in the project's `tsconfig.app.json` file.

这个新项目已经自动为 Ivy 配置好了。具体来说就是在项目的 `tsconfig.app.json` 文件中，enableIvy 选项已设置为 `true` 。


## Using Ivy in an existing project

## 在现有项目中使用 Ivy


To update an existing project to use Ivy, set the `enableIvy` option in the `angularCompilerOptions` in your project's `tsconfig.app.json`.

要让现有项目使用 Ivy，请在项目的 `tsconfig.app.json` 中的 `angularCompilerOptions` 中设置 `enableIvy` 选项。


```json
{
  "compilerOptions": { ... },
  "angularCompilerOptions": {
    "enableIvy": true
  }
}
```

AOT compilation with Ivy is faster and should be used by default. In the `angular.json` workspace configuration file, set the default build options for your project to always use AOT compilation.

```json
{
  "projects": {
    "my-existing-project": {
      "architect": {
        "build": {
          "options": {
            ...
            "aot": true,
          }
        }
      }
    }
  }
}
```

To stop using the Ivy compiler, set `enableIvy` to `false` in `tsconfig.app.json`, or remove it completely. Also remove `"aot": true` from your default build options if you didn't have it there before.
 

要停止使用 Ivy 编译器，请在 `enableIvy` 中把 `tsconfig.app.json` 设置为 `false` ，或者把它完全删除。

