# Content projection

# 内容投影

This topic describes how to use content projection to create flexible, reusable components.

本主题描述如何使用内容投影来创建灵活的可复用组件。

<div class="alert is-helpful">

To view or download the example code used in this topic, see the <live-example></live-example>.

要查看或下载本主题中用到的示例代码，请参见<live-example></live-example> 。

</div>

Content projection is a pattern in which you insert, or *project*, the content you want to use inside another component. For example, you could have a `Card` component that accepts content provided by another component.

内容投影是一种模式，你可以在其中插入或*投影*要在另一个组件中使用的内容。例如，你可能有一个 `Card` 组件，它可以接受另一个组件提供的内容。

The following sections describe common implementations of content projection in Angular, including:

以下各节介绍了 Angular 中内容投影的常见实现，包括：

* [Single-slot content projection](#single-slot). With this type of content projection, a component accepts content from a single source.

  [单插槽内容投影](#single-slot)。使用这种类型的内容投影，组件可以从单一来源接受内容。

* [Multi-slot content projection](#multi-slot). In this scenario, a component accepts content from multiple sources.

  [多插槽内容投影](#multi-slot)。在这种情况下，组件可以从多个来源接受内容。

* [Conditional content projection](#conditional). Components that use conditional content projection render content only when specific conditions are met.

  [有条件的内容投影](#conditional)。使用条件内容投影的组件仅在满足特定条件时才渲染内容。

{@a single-slot }
## Single-slot content projection

## 单插槽内容投影

The most basic form of content projection is *single-slot content projection*. Single-slot content projection refers to creating a component into which you can project one component.

内容投影的最基本形式是*单插槽内容投影*。单插槽内容投影是指创建一个组件，你可以在其中投影一个组件。

To create a component that uses single-slot content projection:

要创建使用单插槽内容投影的组件，请执行以下操作：

1. [Create](guide/component-overview) a component.

   [创建](guide/component-overview)一个组件。

1. In the template for your component, add an `ng-content` element where you want the projected content to appear.

   在组件模板中，添加 `ng-content` 元素，让你希望投影的内容出现在其中。

For example, the following component uses an `ng-content` element to display a message.

例如，以下组件使用 `ng-content` 元素来显示消息。

<code-example path="content-projection/src/app/zippy-basic/zippy-basic.component.ts" header="content-projection/src/app/zippy-basic/zippy-basic.component.ts"></code-example>

With the `ng-content` element in place, users of this component can now project their own message into the component. For example:

有了 `ng-content` 元素，该组件的用户现在可以将自己的消息投影到该组件中。例如：

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="single-slot"></code-example>

<div class="alert is-helpful">

The `ng-content` element is a placeholder that does not create a real DOM element. Custom attributes applied to `ng-content` are ignored.

`ng-content` 元素是一个占位符，它不会创建真正的 DOM 元素。`ng-content` 的那些自定义属性将被忽略。

</div>

{@a multi-slot}
## Multi-slot content projection

## 多插槽内容投影

A component can have multiple slots. Each slot can specify a CSS selector that determines which content goes into that slot. This pattern is referred to as *multi-slot content projection*. With this pattern, you must specify where you want the projected content to appear. You accomplish this task by using the `select` attribute of `ng-content`.

一个组件可以具有多个插槽。每个插槽可以指定一个 CSS 选择器，该选择器会决定将哪些内容放入该插槽。该模式称为*多插槽内容投影*。使用此模式，你必须指定希望投影内容出现在的位置。你可以通过使用 `ng-content` 的 `select` 属性来完成此任务。

To create a component that uses multi-slot content projection:

要创建使用多插槽内容投影的组件，请执行以下操作：

1. [Create](guide/component-overview) a component.

   [创建](guide/component-overview)一个组件。

1. In the template for your component, add an `ng-content` element where you want the projected content to appear.

   在组件模板中，添加 `ng-content` 元素，让你希望投影的内容出现在其中。

1. Add a `select` attribute to the `ng-content` elements. Angular supports [selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) for any combination of tag name, attribute, CSS class, and the `:not` pseudo-class.

   将 `select` 属性添加到 `ng-content` 元素。 Angular 使用的[选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)支持标签名、属性、CSS 类和 `:not` 伪类的任意组合。

   For example, the following component uses two  `ng-content` elements.

   例如，以下组件会使用两个 `ng-content` 元素。

   <code-example path="content-projection/src/app/zippy-multislot/zippy-multislot.component.ts" header="content-projection/src/app/zippy-multislot/zippy-multislot.component.ts"></code-example>

Content that uses the `question` attribute is projected into the `ng-content` element with the `select=[question]` attribute.

使用 `question` 属性的内容将投影到带有 `select=[question]` 属性的 `ng-content` 元素。

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="multi-slot"></code-example>

<div class="callout is-helpful">

<header>ng-content without a select attribute</header>

<header>不带 select 属性的 ng-content</header>

If your component includes an `ng-content` element without a `select` attribute, that instance receives all projected components that do not match any of the other `ng-content` elements.

如果你的组件包含不带 `select` 属性的 `ng-content` 元素，则该实例将接收所有与其他 `ng-content` 元素都不匹配的投影组件。

In the preceding example, only the second `ng-content` element defines a `select` attribute. As a result, the first `ng-content` element receives any other content projected into the component.

在前面的示例中，只有第二个 `ng-content` 元素定义了 `select` 属性。结果，第一个 `ng-content` 就会元素接收投影到组件中的任何其他内容。

</div>

{@a conditional }

## Conditional content projection

## 有条件的内容投影

If your component needs to _conditionally_ render content, or render content multiple times, you should configure that component to accept an `ng-template` element that contains the content you want to conditionally render.

如果你的组件需要*有条件地*渲染内容或多次渲染内容，则应配置该组件以接受一个 `ng-template` 元素，其中包含要有条件渲染的内容。

Using an `ng-content` element in these cases is not recommended, because when the consumer of a component supplies the content, that content is _always_ initialized, even if the component does not define an `ng-content` element or if that `ng-content` element is inside of an `ngIf` statement.

在这种情况下，不建议使用 `ng-content` 元素，因为只要组件的使用者提供了内容，即使该组件从未定义 `ng-content` 元素或该 `ng-content` 元素位于 `ngIf` 语句的内部，该内容也总会被初始化。

With an `ng-template` element, you can have your component explicitly render content based on any condition you want, as many times as you want. Angular will not initialize the content of an `ng-template` element until that element is explicitly rendered.

使用 `ng-template` 元素，你可以让组件根据你想要的任何条件显式渲染内容，并可以进行多次渲染。在显式渲染 `ng-template` 元素之前，Angular 不会初始化该元素的内容。

The following steps demonstrate a typical implementation of conditional content projection using `ng-template`.

`ng-template` 进行条件内容投影的典型实现。

1. [Create](guide/component-overview) a component.

   [创建](guide/component-overview)一个组件。

1. In the component that accepts an `ng-template` element, use an `ng-container` element to render that template, such as:

   在接受 `ng-template` 元素的组件中，使用 `ng-container` 元素渲染该模板，例如：

   <code-example path="content-projection/src/app/example-zippy.template.html" header="content-projection/src/app/example-zippy.template.html" region="ng-container">
   </code-example>

   This example uses the `ngTemplateOutlet` directive to render a given `ng-template` element, which you will define in a later step. You can apply an `ngTemplateOutlet` directive to any type of element. This example assigns the directive to an `ng-container` element because the component does not need to render a real DOM element.

   本示例使用 `ngTemplateOutlet` 指令来渲染给定的 `ng-template` 元素，你将在后续步骤中对其进行定义。你可以将 `ngTemplateOutlet` 指令应用于任何类型的元素。本示例就将该指令分配给了 `ng-container` 元素，因为该组件不需要渲染真实的 DOM 元素。

1. Wrap the `ng-container` element in another element, such as a `div` element, and apply your conditional logic.

   将 `ng-container` 元素包装在另一个元素（例如 `div` 元素）中，然后应用条件逻辑。

     <code-example path="content-projection/src/app/example-zippy.template.html"  header="content-projection/src/app/example-zippy.template.html" region="ngif">
     </code-example>

1. In the template where you want to project content, wrap the projected content in an `ng-template` element, such as:

   在要投影内容的模板中，将投影的内容包装在 `ng-template` 元素中，例如：

      <code-example path="content-projection/src/app/app.component.html" region="ng-template">
      </code-example>

   The `ng-template` element defines a block of content that a component can render based on its own logic. A component can get a reference to this template content, or [`TemplateRef`](/api/core/TemplateRef), by using either the [`@ContentChild`](/api/core/ContentChild) or [`@ContentChildren`](/api/core/ContentChildren) decorators. The preceding example creates a custom directive, `appExampleZippyContent`, as an API to mark the `ng-template` for the component's content. With the `TemplateRef`, the component can render the referenced content by using either the [`ngTemplateOutlet`](/api/common/NgTemplateOutlet) directive, or with [`ViewContainerRef.createEmbeddedView`](/api/core/ViewContainerRef#createembeddedview).

   这个 `ng-template` 元素定义了一个组件可以根据其自身逻辑渲染的内容块。组件可以使用 [`@ContentChild`](/api/core/ContentChild) 或 [`@ContentChildren`](/api/core/ContentChildren) 装饰器获得对此模板内容的引用（即 [`TemplateRef`](/api/core/TemplateRef)）。前面的示例创建了一个自定义指令 `appExampleZippyContent` 作为 API，以将 `ng-template` 标记为组件内容。借助这个 `TemplateRef`，组件可以使用 [`ngTemplateOutlet`](/api/common/NgTemplateOutlet)指令或[`ViewContainerRef.createEmbeddedView`](/api/core/ViewContainerRef#createembeddedview)方法来渲染所引用的内容。

1. Create a directive with a selector that matches the custom attribute for your template. In this directive, inject a TemplateRef instance.

   创建一个带有与这个模板的自定义属性相匹配的选择器指令。在此指令中，注入 TemplateRef 实例。

   <code-example path="content-projection/src/app/app.component.ts" header="content-projection/src/app/app.component.ts" region="zippycontentdirective">
   </code-example>

   In the previous step, you added an `ng-template` element with a custom attribute, `appExampleZippyDirective`. This code provides the logic that Angular will use when it encounters that custom attribute. In this case, that logic instructs Angular to instantiate a template reference.

   在上一步中，你已添加了具有自定义属性 `appExampleZippyDirective` 的 `ng-template` 元素。这段代码提供了当 Angular 遇到该自定义属性时要使用的逻辑。在这里，该逻辑指示 Angular 实例化这个模板引用。

1. In the component you want to project content into, use `@ContentChild` to get the template of the project content.

   在你要将内容投影到的组件中，使用 `@ContentChild` 获取此投影内容的模板。

   <code-example path="content-projection/src/app/app.component.ts" header="content-projection/src/app/app.component.ts" region="contentchild">
   </code-example>

   Prior to this step, your application has a component that instantiates a template when certain conditions are met. You've also created a directive that provides a reference to that template. In this last step, the `@ContentChild` decorator instructs Angular to instantiate the template in the designated component.

   在执行此步骤之前，你的应用具有一个组件，它会在满足某些条件时实例化此模板。你还创建了一个指令，该指令能提供对该模板的引用。在最后一步中，`@ContentChild` 装饰器指示 Angular 实例化指定组件中的模板。

   <div class="alert is-helpful">

   In the case of multi-slot content projection, you can use `@ContentChildren` to get a QueryList of projected elements.

   如果是多插槽内容投影，则可以使用 `@ContentChildren` 获取投影元素的查询列表（QueryList）。

   </div>

{@a ngprojectas }

## Projecting content in more complex environments

## 在更复杂的环境中投影内容

As described in [Multi-slot Content Projection](#multi-slot), you typically use either an attribute, element, CSS Class, or some combination of all three to identify where to project your content. For example, in the following HTML template, a paragraph tag uses a custom attribute, `question`, to project content into the `app-zippy-multislot` component.

如[多插槽内容投影](#multi-slot)中所述，你通常会使用属性、元素、CSS 类或这三者的某种组合来标识将内容投影到何处。例如，在以下 HTML 模板中，p 标签会使用自定义属性 `question` 将内容投影到 `app-zippy-multislot` 组件中。

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html"
region="multi-slot"></code-example>

In some cases, you might want to project content as a different element. For example, the content you want to project might be a child of another
element. You can accomplish this by using the `ngProjectAs` attribute.

在某些情况下，你可能希望将内容投影为其他元素。例如，你要投影的内容可能是另一个元素的子元素。你可以用 `ngProjectAs` 属性来完成此操作。

For instance, consider the following HTML snippet:

例如，考虑以下 HTML 代码段：

<code-example path="content-projection/src/app/app.component.html" header="content-projection/src/app/app.component.html" region="ngprojectas">
</code-example>

This example uses an `ng-container` attribute to simulate projecting a component into a more complex structure.

本示例使用 `ng-container` 属性来模拟将组件投影到更复杂的结构中。

<div class="callout is-helpful">

<header>Reminder!</header>
<header>注意！</header>

The `ng-container` element is a logical construct that you can use to group other DOM elements; however, the `ng-container` itself is not rendered in the DOM tree.

`ng-container` 元素是一个逻辑结构，可用于对其他 DOM 元素进行分组；但是，`ng-container` 本身未在 DOM 树中渲染。

</div>

In this example, the content we want to project resides inside another element. To project this content as intended, the template uses the `ngProjectAs` attribute. With `ngProjectAs`, the entire `ng-container` element is projected into a component using the `question` selector.

在这个例子中，我们要投影的内容位于另一个元素内。为了按预期方式投影此内容，此模板使用了 `ngProjectAs` 属性。有了 `ngProjectAs`，就可以用 `question` 选择器将整个 `ng-container` 元素投影到组件中。

