# Overview of Angular libraries

# Angular 库开发概述

Many applications need to solve the same general problems, such as presenting a unified user interface, presenting data, and allowing data entry.
Developers can create general solutions for particular domains that can be adapted for re-use in different apps.
Such a solution can be built as Angular *libraries* and these libraries can be published and shared as *npm packages*.

许多应用都需要解决一些同样的常见问题，例如提供统一的用户界面、渲染数据，以及允许数据输入。开发人员可以为特定的领域创建一些通用解决方案，以便在不同的应用中重复使用。像这样的解决方案就可以构建成 Angular *库*，这些库可以作为 *npm 包*进行发布和共享。

An Angular library is an Angular [project](guide/glossary#project) that differs from an app in that it cannot run on its own.
A library must be imported and used in an app.

Angular 库是一个 Angular [项目](guide/glossary#project)，它与应用的不同之处在于它本身是不能运行的。必须在某个应用中导入库并使用它。

Libraries extend Angular's base functionality. For example, to add [reactive forms](guide/reactive-forms) to an app, add the library package using `ng add @angular/forms`, then import the `ReactiveFormsModule` from the `@angular/forms` library in your application code.
Similarly, adding the [service worker](guide/service-worker-intro) library to an Angular application is one of the steps for turning an application into a [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) (PWA).
[Angular Material](https://material.angular.io/) is an example of a large, general-purpose library that provides sophisticated, reusable, and adaptable UI components.

这些库扩展了 Angular 的基本功能。例如，要向应用添加[响应式表单](guide/reactive-forms)，请使用 `ng add @angular/forms` 添加该库的 npm 包，再从应用代码中，从 `@angular/forms` 库中导入 `ReactiveFormsModule`。同样，把 [Service Worker](guide/service-worker-intro) 库添加到 Angular 应用中是将应用转换为[渐进式 Web 应用程序](https://developers.google.com/web/progressive-web-apps/)（PWA）的步骤之一。[Angular Material](https://material.angular.io/) 是一个大型通用库的典范，它提供了一些复杂、可重用，兼具高度适应性的 UI 组件。

Any app developer can use these and other libraries that have been published as npm packages by the Angular team or by third parties. See [Using Published Libraries](guide/using-libraries).

任何一位应用开发者都可以使用这样或那样的库，它们都已经由 Angular 团队或第三方发布为 npm 包。参见[使用已发布的库](guide/using-libraries)。

## Creating libraries

## 创建库

If you have developed functionality that is suitable for reuse, you can create your own libraries.
These libraries can be used locally in your workspace, or you can publish them as [npm packages](guide/npm-packages) to share with other projects or other Angular developers.
These packages can be published to the npm registry, a private npm Enterprise registry, or a private package management system that supports npm packages.
See [Creating Libraries](guide/creating-libraries).

如果已经开发出了适合重用的功能，你就可以创建自己的库。这些库可以在你的工作区中本地使用，也可以把它们发布成 [npm 包](guide/npm-packages)，共享给其它项目或其它 Angular 开发者。这些包可以发布到 npm 服务器、一个私有的 npm 企业版服务器，或一个支持 npm 包的私有包管理系统。参见[创建库](guide/creating-libraries)。

Whether you decide to package functionality as a library is an architectural decision, similar to deciding whether a piece of functionality is a component or a service, or deciding on the scope of a component.

是否把一些功能打包成库是一种架构决策，类似于决定一个功能应该做成组件还是服务，或决定一个组件的范围该有多大。

Packaging functionality as a library forces the artifacts in the library to be decoupled from the application's business logic.
This can help to avoid various bad practices or architecture mistakes that can make it difficult to decouple and reuse code in the future.

把功能打包成库会强迫库中的工件与应用的业务逻辑分离。这有助于避免各种不良实践或架构失误，这些失误会导致将来很难解耦和重用代码。

Putting code into a separate library is more complex than simply putting everything in one app.
It requires more of an investment in time and thought for managing, maintaining, and updating the library.
This complexity can pay off, however, when the library is being used in multiple apps.

把代码放到一个单独的库中比简单地把所有内容都放在一个应用中要复杂得多。它需要更多的时间投入，并且需要管理、维护和更新这个库。不过，当把该库用在多个应用中时，这种复杂性就会得到回报。

<div class="alert is-helpful">

Note that libraries are intended to be used by Angular apps.
To add Angular functionality to non-Angular web apps, you can use [Angular custom elements](guide/elements).

注意，这里所说的库是为了供 Angular 应用使用的。
如果想把 Angular 的功能添加到非 Angular 应用中，可以使用 [Angular 自定义元素](guide/elements)。

</div>
