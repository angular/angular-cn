# `tslib` direct dependency migration

# `tslib` 直接依赖项迁移

## What does this migration do?

## 此迁移有什么用？

If you have any libraries within your workspace, this migration will convert `tslib` peer dependencies to direct dependencies for the libraries.
TypeScript uses the `tslib` package to provide common helper functions used in compiled TypeScript code.
The `tslib` version is also updated to `2.0.0` to support TypeScript 3.9.

如果你的工作空间中有任何库，此迁移会将它们对 `tslib` 的平级依赖转换为直接依赖。TypeScript 使用 `tslib` 包来提供 TypeScript 编译后代码中使用的常用辅助函数。`tslib` 版本也更新为 `2.0.0` 以支持 TypeScript 3.9。

Before:

之前：

```json
{
  "name": "my-lib",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^9.0.0",
    "@angular/core": "^9.0.0",
    "tslib": "^1.12.0"
  }
}
```

After:

之后：

```json
{
  "name": "my-lib",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^9.0.0",
    "@angular/core": "^9.0.0"
  },
  "dependencies": {
    "tslib": "^2.0.0"
  }
}
```

## Why is this migration necessary?

## 为什么需要进行此迁移？

The [`tslib`](https://github.com/Microsoft/tslib) is a runtime library for Typescript.
The version of this library is bound to the version of the TypeScript compiler used to compile a library.
Peer dependencies do not accurately represent this relationship between the runtime and the compiler.
If `tslib` remained declared as a library peer dependency, it would be possible for some Angular workspaces to get into a state where the workspace could not satisfy `tslib` peer dependency requirements for multiple libraries, resulting in build-time or run-time errors.

[`tslib`](https://github.com/Microsoft/tslib) 是 Typescript 的运行时库。该库的版本绑定到了用于编译库的 TypeScript 编译器的版本。平级依赖不能准确表达此运行时库与编译器之间的这种关系。如果 `tslib` 仍然声明为库对等依赖项，则某些 Angular 工作空间可能会出现工作空间无法满足 `tslib` 平级依赖项要求的状态，从而导致构建期或运行期错误。

As of TypeScript 3.9 (used by Angular v10), `tslib` version of 2.x is required to build new applications.
However, older libraries built with previous version of TypeScript and already published to npm might need `tslib` 1.x.
This migration makes it possible for code depending on incompatible versions of the `tslib` runtime library to remain interoperable.

从 TypeScript 3.9（由 Angular v10 使用）开始，需要 `tslib` 版本 2.x 来构建新的应用程序。但是，使用以前的 TypeScript 版本构建并已发布到 npm 的较早的库可能需要 `tslib` 。这种迁移使依赖于 `tslib` 运行时库的某个不兼容版本的代码可以保持互操作性。

## Do I still need `tslib` as a dependency in my workspace `package.json`?

## 我是否仍需要 `tslib` 作为我的工作区 `package.json` 的依赖项？

Yes.
The `tslib` dependency declared in the `package.json` file of the workspace is used to build applications within this workspace, as well as run unit tests for workspace libraries, and is required.

是。`package.json` 文件中声明的 `tslib` 依赖用于在此工作空间内构建应用程序，以及对工作空间中的库进行运行单元测试，这是必要的。
