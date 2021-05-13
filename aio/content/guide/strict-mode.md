# Strict mode

# 严格模式

Angular CLI creates all new workspaces and projects with **strict mode** enabled.

Angular CLI 创建所有新工作区和项目时会弃用**严格模式**。

Strict mode improves maintainability and helps you catch bugs ahead of time.
Additionally, strict mode applications are easier to statically analyze and can help the `ng update` command refactor code more safely and precisely when you are updating to future versions of Angular.

严格模式会增强可维护性，并且帮助你捕获各种 AOT 的 BUG。
另外，严格模式的应用还易于进行静态分析，并且当你未来要升级到 Angular 的未来版本时，能帮助 `ng update` 命令的重构代码更加安全和精确，

Specifically, strict mode does the following:

具体来说， `strict` 标志执行以下操作：

* Enables [`strict` mode in TypeScript](https://www.typescriptlang.org/tsconfig#strict), as well as other strictness flags recommended by the TypeScript team. Specifically, `forceConsistentCasingInFileNames`, `noImplicitReturns`,  `noFallthroughCasesInSwitch`.

  [在 TypeScript 中启用 `strict` 模式](https://www.staging-typescript.org/tsconfig#strict)，以及 TypeScript 团队建议的其他严格性标志。具体而言，包括 `forceConsistentCasingInFileNames`、`noImplicitReturns`、`noFallthroughCasesInSwitch`。

* Turns on strict Angular compiler flags [`strictTemplates`](guide/angular-compiler-options#stricttemplates), [`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters) and [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors).

  打开 Angular 编译器的严格性标志 [`strictTemplates`](guide/angular-compiler-options#stricttemplates)、[`strictInjectionParameters`](guide/angular-compiler-options#strictinjectionparameters) 和 [`strictInputAccessModifiers`](guide/template-typecheck#troubleshooting-template-errors)。

* [Bundle size budgets](guide/build#configuring-size-budgets) have been reduced by ~75%.

  [打包尺寸预算](guide/build#configuring-size-budgets)减少了约 75％。

You can apply these settings at the workspace and project level.

你可以在工作区一级和项目一级应用这些设置。

Using the basic `ng new` command to create a new workspace and application automatically uses strict mode, as in the following command:

使用基本的 `ng new` 命令创建新的工作空间和项目时，会自动使用严格模式，命令如下：

<code-example language="sh">

ng new [project-name]

</code-example>

To create a new application in the strict mode within an existing non-strict workspace, run the following command:

要在现有的非严格工作区内以严格模式创建新应用程序，请运行以下命令：

<code-example language="sh">

ng generate application [project-name] --strict

</code-example>
