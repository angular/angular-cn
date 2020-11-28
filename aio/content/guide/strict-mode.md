# Strict mode

# 严格模式

When you create a new workspace or an application you have an option to create them in a strict mode using the `--strict` flag.

创建新工作区或应用程序时，可以选择使用 `--strict` 标志以严格模式创建它们。

Enabling this flag initializes your new workspace or application with a few new settings that improve maintainability, help you catch bugs ahead of time.
Additionally, applications that use these stricter settings are easier to statically analyze, which can help the `ng update` command refactor code more safely and precisely when you are updating to future versions of Angular.

启用此标志将使用一些新设置来初始化新的工作区或应用程序，这些设置可以改善可维护性，帮助你提前发现错误。此外，使用这些更严格设置的应用程序更容易进行静态分析，这可以帮助 `ng update` 命令在更新到 Angular 的将来版本时更安全，更准确地重构代码。

Specifically, the `strict` flag does the following:

具体来说， `strict` 标志执行以下操作：

- Enables [`strict` mode in TypeScript](https://www.staging-typescript.org/tsconfig#strict), as well as other strictness flags recommended by the TypeScript team. Specifically, `forceConsistentCasingInFileNames`, `noImplicitReturns`,  `noFallthroughCasesInSwitch`.

  [在 TypeScript 中](https://www.staging-typescript.org/tsconfig#strict)启用 [`strict`](https://www.staging-typescript.org/tsconfig#strict) 模式，以及 TypeScript 团队建议的其他严格性标志。具体而言，`forceConsistentCasingInFileNames`、`noImplicitReturns`、`noFallthroughCasesInSwitch`。

- Turns on strict Angular compiler flags [`strictTemplates`](guide/angular-compiler-options#stricttemplates), [`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters) and [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors).

  打开 Angular 编译器的严格性标志 [`strictTemplates`](guide/angular-compiler-options#stricttemplates)、[`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters) 和 [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors)。

- [Bundle size budgets](guide/build#configuring-size-budgets) have been reduced by ~75%.

  [打包尺寸预算](guide/build#configuring-size-budgets)减少了约 75％。

You can apply these settings at the workspace and project level.

你可以在工作区一级和项目一级应用这些设置。

To create a new workspace and application using the strict mode, run the following command:

要使用严格模式创建新的工作空间和应用程序，请运行以下命令：

<code-example language="sh" class="code-shell">

ng new [project-name] --strict

</code-example>

To create a new application in the strict mode within an existing non-strict workspace, run the following command:

要在现有的非严格工作空间内以严格模式创建新应用程序，请运行以下命令：

<code-example language="sh" class="code-shell">

ng generate application [project-name] --strict

</code-example>
