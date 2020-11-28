# Angular Components Overview

# Angular Components 概述

Components are the main building block for Angular applications. Each component consists of:

组件是 Angular 应用的主要构造块。每个组件包括如下部分：

* An HTML template that declares what renders on the page

  一个 HTML 模板，用于声明页面要渲染的内容

* A Typescript class that defines behavior

  一个用于定义行为的 Typescript 类

* A CSS selector that defines how the component is used in a template

  一个 CSS 选择器，用于定义组件在模板中的使用方式

* Optionally, CSS styles applied to the template

  （可选）要应用在模板上的 CSS 样式

This topic describes how to create and configure an Angular component.

本主题描述如何创建和配置 Angular 组件。

<div class="alert is-helpful">

To view or download the example code used in this topic, see the <live-example></live-example>.

要查看或下载本主题中使用的范例代码，请参阅 <live-example></live-example>。

</div>

## Prerequisites

## 先决条件

To create a component, verify that you have met the following prerequisites:

要创建一个组件，请先验证你是否满足以下先决条件：

1. Install the Angular CLI.

   安装 Angular CLI。

1. Create an Angular project.
   If you don't have a project, you can create one using `ng new <project-name>`, where `<project-name>` is the name of your Angular application.

   建立一个 Angular 项目。如果你没有项目，你可以用 `ng new <project-name>` 创建一个项目，其中 `<project-name>` 是你的 Angular 应用的名字。

## Creating a component

## 创建一个组件

The easiest way to create a component is with the Angular CLI. You can also create a component manually.

Angular CLI 是用来创建组件的最简途径。你也可以手动创建一个组件。

### Creating a component using the Angular CLI

### 使用 Angular CLI 创建组件

To create a component using the Angular CLI:

使用 Angular CLI 创建一个组件：

1. From a terminal window, navigate to the directory containing your application.

   在终端窗口中，导航到要放置你应用的目录。

1. Run the `ng generate component <component-name>` command, where `<component-name>` is the name of your new component.

   运行 `ng generate component <component-name>` 命令，其中 `<component-name>` 是新组件的名字。

By default, this command creates the following:

默认情况下，该命令会创建以下内容：

* A folder named after the component

  一个以该组件命名的文件夹

* A component file, `<component-name>.component.ts`

  一个组件文件 `<component-name>.component.ts`

* A template file, `<component-name>.component.html`

  一个模板文件 `<component-name>.component.html`

* A CSS file, `<component-name>.component.css`

  一个 CSS 文件， `<component-name>.component.css`

* A testing specification file, `<component-name>.component.spec.ts`

  测试文件 `<component-name>.component.spec.ts`

Where `<component-name>` is the name of your component.

其中 `<component-name>` 是组件的名称。

<div class="alert is-helpful">

You can change how `ng generate component` creates new components.
For more information, see [ng generate component](cli/generate#component-command) in the Angular CLI documentation.

你可以更改 `ng generate component` 创建新组件的方式。欲知详情，请参阅 Angular CLI 文档中的 [ng generate component](cli/generate#component-command)。

</div>

### Creating a component manually

### 手动创建组件

Although the Angular CLI is the easiest way to create an Angular component, you can also create a component manually.
This section describes how to create the core component file within an existing Angular project.

虽然 Angular CLI 是创建 Angular 组件的最简途径，但你也可以手动创建一个组件。本节将介绍如何在现有的 Angular 项目中创建核心组件文件。

To create a new component manually:

要手动创建一个新组件：

1. Navigate to your Angular project directory.

   导航到你的 Angular 项目目录。

1. Create a new file, `<component-name>.component.ts`.

   创建一个新文件 `<component-name>.component.ts` 。

1. At the top of the file, add the following import statement.

   在文件的顶部，添加下面的 import 语句。

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="import">
   </code-example>

1. After the `import` statement, add a `@Component` decorator.

   在 `import` 语句之后，添加一个 `@Component` 装饰器。

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="decorator-skeleton">
   </code-example>

1. Choose a CSS selector for the component.

   为组件选择一个 CSS 选择器。

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="selector">
   </code-example>

   For more information on choosing a selector, see [Specifying a component's selector](#specifying-a-components-css-selector).

   关于选择选择器的更多信息，参阅[指定组件的选择器](#specifying-a-components-css-selector)。

1. Define the HTML template that the component uses to display information.
   In most cases, this template is a separate HTML file.

   定义组件用以显示信息的 HTML 模板。在大多数情况下，这个模板是一个单独的 HTML 文件。

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="templateUrl">
   </code-example>

   For more information on defining a component's template, see [Defining a component's template](#defining-a-components-template).

   关于定义组件模板的更多信息，请参阅[定义组件的模板](#defining-a-components-template)。

1. Select the styles for the component's template.
   In most cases, you define the styles for your component's template in a separate file.

   为组件的模板选择样式。在大多数情况下，你可以在单独的文件中定义组件模板的样式。

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="decorator">
   </code-example>

1. Add a `class` statement that includes the code for the component.

   添加一个包含该组件代码 `class` 语句。

   <code-example
        path="component-overview/src/app/component-overview/component-overview.component.ts"
        region="class">
   </code-example>

## Specifying a component's CSS selector

## 指定组件的 CSS 选择器

Every component requires a CSS *selector*. A selector instructs Angular to instantiate this component wherever it finds the corresponding tag in template HTML. For example, consider a component `hello-world.component.ts` that defines its selector as `app-hello-world`. This selector instructs Angular to instantiate this component any time the tag `<app-hello-world>` appears in a template.

每个组件都需要一个 CSS *选择器*。选择器会告诉 Angular：当在模板 HTML 中找到相应的标签时，就把该组件实例化在那里。例如，考虑一个组件 `hello-world.component.ts` ，它的选择器定义为 `app-hello-world` 。 当 `<app-hello-world>` 出现在模板中时，这个选择器就会让 Angular 实例化该组件。

Specify a component's selector by adding a `selector` statement to the `@Component` decorator.

在 `@Component` 装饰器中添加一个 `selector` 语句来指定组件的选择器。

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="selector">
</code-example>

## Defining a component's template

## 定义一个组件的模板

A template is a block of HTML that tells Angular how to render the component in your application.
You can define a template for your component in one of two ways: by referencing an external file, or directly within the component.

模板是一段 HTML，它告诉 Angular 如何在应用中渲染组件。你可以通过以下两种方式之一为组件定义模板：引用外部文件，或直接写在组件内部。

To define a template as an external file, add a `templateUrl` property to the `@Component` decorator.

要把模板定义为外部文件，就要把 `templateUrl` 添加到 `@Component` 装饰器中。

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="templateUrl">
</code-example>

To define a template within the component, add a `template` property to the `@Component` decorator that contains the HTML you want to use.

要在组件中定义模板，就要把一个 `template` 属性添加到 `@Component` 中，该属性的内容是要使用的 HTML。

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.1.ts"
    region="template">
</code-example>

If you want your template to span multiple lines, you can use backticks (<code> ` </code>).
For example:

如果你想让你的模板跨越多行，你可以使用反引号（ `` ` `` ）。例如：

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.2.ts"
    region="templatebacktick">
</code-example>

<div class="alert is-helpful">

An Angular component requires a template defined using `template` or `templateUrl`. You cannot have both statements in a component.

Angular 组件需要一个用 `template` 或 `templateUrl` 定义的模板。但你不能在组件中同时拥有这两个语句。

</div>

## Declaring a component's styles

## 声明组件的样式

You can declare component styles uses for its template in one of two ways: by referencing an external file, or directly within the component.

你有以下两种方式来为组件的模板声明样式：引用一个外部文件，或直接写在组件内部。

To declare the styles for a component in a separate file, add a `stylesUrls` property to the `@Component` decorator.

要在单独的文件中声明组件的样式，就要把 `stylesUrls` 属性添加到 `@Component` 装饰器中。

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.ts"
    region="decorator">
</code-example>

To select the styles within the component, add a `styles` property to the `@Component` decorator that contains the styles you want to use.

要想在组件内部声明样式，就要把 `styles` 属性添加到 `@Component`，该属性的内容是你要用的样式。

<code-example
    path="component-overview/src/app/component-overview/component-overview.component.3.ts"
    region="styles">
</code-example>

The `styles` property takes an array of strings that contain the CSS rule declarations.

`styles` 属性接受一个包含 CSS 规则的字符串数组。

## Next steps

## 下一步

* For an architectural overview of components, see [Introduction to components and templates](guide/architecture-components).

  关于组件的体系结构概述，请参阅[组件和模板简介](guide/architecture-components)。

* For additional options you can use when creating a component, see [Component](api/core/Component) in the API Reference.

  关于创建组件时可以使用的其他选项，请参阅“API 参考手册”中的[“组件”](api/core/Component)。

* For more information on styling components, see [Component styles](guide/component-styles).

  要了解关于为组件指定样式的更多信息，请参阅[组件样式](guide/component-styles)。

* For more information on templates, see [Template syntax](guide/template-syntax).

  关于模板的详细信息，请参阅[模板语法](guide/template-syntax)。
