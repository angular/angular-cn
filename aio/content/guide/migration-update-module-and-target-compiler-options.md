# Update `module` and `target` compiler options migration

# 更新 `module` 和 `target` 编译器选项的迁移

## What does this migration do?

## 此迁移有什么作用？

This migration adjusts the [`target`](https://www.typescriptlang.org/v2/en/tsconfig#target) and [`module`](https://www.typescriptlang.org/v2/en/tsconfig#module) settings within the [TypeScript configuration files](guide/typescript-configuration) for the workspace.
The changes to each option vary based on the builder or command that uses the TypeScript configuration file.
Unless otherwise noted, changes are only made if the existing value was not changed since the project was created.
This process helps ensure that intentional changes to the options are kept in place.

此迁移将调整工作区的 [TypeScript 配置文件](guide/typescript-configuration)中的 [`target`](https://www.typescriptlang.org/v2/en/tsconfig#target) 和 [`module`](https://www.typescriptlang.org/v2/en/tsconfig#module) 设置。对每个选项的更改根据使用 TypeScript 配置文件的构建器或命令而有所不同。除非另有说明，否则仅当自创建项目以来未更改过现有值的情况下才进行更改。此过程有助于确保对这些选项进行的更改都是符合意图的。

| TypeScript Configuration File(s) | Changed Property | Existing Value | New Value |
| -------------------------------- | ---------------- | -------------- | --------- |
| TypeScript 配置文件 | 属性变更 | 现有值 | 新值 |
| `<workspace base>/tsconfig.json` | `"module"` | `"esnext"` | `"es2020"` |
| Used in `browser` builder options (`ng build` for applications) | `"module"` | `"esnext"` | `"es2020"` |
| 在 `browser` 构建器选项中使用（用于应用程序的 `ng build`）| `"module"` | `"esnext"` | `"es2020"` |
| Used in `ng-packgr` builder options (`ng build` for libraries) | `"module"` | `"esnext"` | `"es2020"` |
| 在 `ng-packgr` 构建器选项中使用（用于库的 `ng build`）| `"module"` | `"esnext"` | `"es2020"` |
| Used in `karma` builder options (`ng test` for applications) | `"module"` | `"esnext"` | `"es2020"` |
| 在 `karma` 器选项中使用（用于应用程序的 `ng test`）| `"module"` | `"esnext"` | `"es2020"` |
| Used in `server` builder options (universal) | `"module"` | `"commonjs"` | *removed* |
| 在 `server` 构建器选项中使用（通用） | `"module"` | `"commonjs"` | *已移除* |
| Used in `server` builder options (universal) | `"target"` | *any* | `"es2016"` |
| 在 `server` 构建器选项中使用（通用） | `"target"` | *任何* | `"es2016"` |
| Used in `protractor` builder options (`ng e2e` for applications) | `"target"` | `"es5"` | `"es2018"` |
| 在 `protractor` 构建器选项中使用（用于应用程序的 `ng e2e`）| `"target"` | `"es5"` | `"es2018"` |

## Why is this migration necessary?

## 为什么需要此迁移？

This migration provides improvements to the long-term supportability of projects by updating the projects to use recommended best practice compilation options.

此迁移通过更新项目，让它使用建议的最佳实践编译选项，来改善项目的长期支持能力。

For the functionality that executes on Node.js, such as Universal and Protractor, the new settings provide performance and troubleshooting benefits as well.
The minimum Node.js version for the Angular CLI (v10.13) supports features in ES2018 and earlier.
By targeting later ES versions, the compiler transforms less code and can use newer features directly.
Since zone.js does not support native `async` and `await`, the universal builds still target ES2016.

对于要在 Node.js 上执行的功能（例如 Universal 和 Protractor），新设置还提供了性能和故障排除方面的优势。Angular CLI 的最低 Node.js 版本（v10.13）支持 ES2018 及更早版本中的功能。通过瞄准更高版本的 ES，编译器可以转换更少的代码，并且可以直接使用新特性。由于 zone.js 不支持原生 `async` 和 `await` ，因此通用版本仍以 ES2016 为目标。

## Why `"es2020"` instead of `"esnext"`?

## 为什么用 `"es2020"` 代替 `"esnext"` ？

In TypeScript 3.9, the behavior of the TypeScript compiler controlled by `module` is the same with both `"esnext"` and `"es2020"` values.
This behavior can change in the future, because the `"esnext"` option could evolve in a backwards incompatible ways, resulting in build-time or run-time errors during a TypeScript update.
As a result, code can become unstable. Using the `"es2020"` option mitigates this risk.

在 TypeScript 3.9 中，由 `module` 控制的 TypeScript 编译器的行为与 `"esnext"` 和 `"es2020"` 值相同。此行为将来可能会更改，因为 `"esnext"` 选项可能会以向后不兼容的方式发展，从而导致在 TypeScript 更新时导致构建期或运行期错误。其后果是，代码可能变得不稳定。使用 `"es2020"` 选项可减轻此风险。

