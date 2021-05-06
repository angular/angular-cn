# Attribute directives

# 属性型指令

With attribute directives, you can change the appearance or behavior of DOM elements and Angular components.

使用属性型指令，可以更改 DOM 元素和 Angular 组件的外观或行为。

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

有关包含本指南中代码片段的有效示例，请参见<live-example></live-example>

</div>

## Building an attribute directive

## 建立属性型指令

This section walks you through creating a highlight directive that sets the background color of the host element to yellow.

本节将引导你创建“突出显示”指令，该指令会将宿主元素的背景色设置为黄色。

1. To create a directive, use the CLI command [`ng generate directive`](cli/generate).

   要创建指令，请使用 CLI 命令 [`ng generate directive`](cli/generate)。

  <code-example language="sh" class="code-shell">
ng generate directive highlight
</code-example>

  The CLI creates `src/app/highlight.directive.ts`, a corresponding test file `src/app/highlight.directive.spec.ts`, and declares the directive class in the `AppModule`.

  CLI 创建 `src/app/highlight.directive.ts` 以及相应的测试文件 `src/app/highlight.directive.spec.ts`，并在 `AppModule` 中声明此指令类。

  The CLI generates the default `src/app/highlight.directive.ts` as follows:

  CLI 生成默认的 `src/app/highlight.directive.ts`，如下所示：

  <code-example path="attribute-directives/src/app/highlight.directive.0.ts" header="src/app/highlight.directive.ts"></code-example>

  The `@Directive()` decorator's configuration property specifies the directive's CSS attribute selector, `[appHighlight]`.

  `@Directive()` 装饰器的配置属性会指定指令的 CSS 属性选择器 `[appHighlight]`。

1. Import `ElementRef` from `@angular/core`.
  `ElementRef` grants direct access to the host DOM element through its `nativeElement` property.

   从 `@angular/core` 导入 `ElementRef`。`ElementRef` 的 `nativeElement` 属性会提供对宿主 DOM 元素的直接访问权限。

1. Add `ElementRef` in the directive's `constructor()` to [inject](guide/dependency-injection) a reference to the host DOM element, the element to which you apply `appHighlight`.

   在指令的 `constructor()` 中添加 `ElementRef` 以[注入](guide/dependency-injection)对宿主 DOM 元素的引用，该元素就是 `appHighlight` 的作用目标。

1. Add logic to the `HighlightDirective` class that sets the background to yellow.

   向 `HighlightDirective` 类中添加逻辑，将背景设置为黄色

   <code-example path="attribute-directives/src/app/highlight.directive.1.ts" header="src/app/highlight.directive.ts"></code-example>

<div class="alert is-helpful">

  Directives _do not_ support namespaces.

  指令*不*支持名称空间。

  <code-example path="attribute-directives/src/app/app.component.avoid.html" header="src/app/app.component.avoid.html (unsupported)" region="unsupported"></code-example>

</div>

{@a apply-directive}
## Applying an attribute directive

## 应用属性型指令

1. To use the `HighlightDirective`, add a `<p>` element to the HTML template with the directive as an attribute.

   要使用 `HighlightDirective`，请将 `<p>` 元素添加到 HTML 模板中，并以伪指令作为属性。

   <code-example path="attribute-directives/src/app/app.component.1.html" header="src/app/app.component.html" region="applied"></code-example>

Angular creates an instance of the `HighlightDirective` class and injects a reference to the `<p>` element into the directive's constructor, which sets the `<p>` element's background style to yellow.

Angualr 会创建 `HighlightDirective` 类的实例，并将 `<p>` 元素的引用注入到该指令的构造函数中，它会将 `<p>` 元素的背景样式设置为黄色。

{@a respond-to-user}

## Handling user events

## 处理用户事件

This section shows you how to detect when a user mouses into or out of the element and to respond by setting or clearing the highlight color.

本节会展示如何检测用户何时将鼠标移入或移出元素以及如何通过设置或清除突出显示颜色来进行响应。

1. Import `HostListener` from '@angular/core'.

   从 '@angular/core' 导入 `HostListener`

   <code-example path="attribute-directives/src/app/highlight.directive.2.ts" header="src/app/highlight.directive.ts (imports)" region="imports"></code-example>

1. Add two event handlers that respond when the mouse enters or leaves, each with the `@HostListener()` decorator.

   添加两个事件处理程序，它们会在鼠标进入或离开时做出响应，每个事件处理程序都带有 `@HostListener()` 装饰器。

   <code-example path="attribute-directives/src/app/highlight.directive.2.ts" header="src/app/highlight.directive.ts (mouse-methods)" region="mouse-methods"></code-example>

   With the `@HostListener()` decorator, you can subscribe to events of the DOM element that hosts an attribute directive, the `<p>` in this case.

   使用 `@HostListener()` 装饰器，你可以订阅本属性型指令宿主 DOM 元素上的事件（在本例中是 `<p>`）。

   The handlers delegate to a helper method, `highlight()`, that sets the color on the host DOM element, `el`.

   处理程序会委托给一个辅助方法 `highlight()`，该方法会设置宿主 DOM 元素 `el` 的颜色。

The complete directive is as follows:

完整的指令如下：

<code-example path="attribute-directives/src/app/highlight.directive.2.ts" header="src/app/highlight.directive.ts"></code-example>

The background color appears when the pointer hovers over the paragraph element and disappears as the pointer moves out.

当指针悬停在 p 元素上时，背景颜色就会出现；而当指针移出时，背景颜色就会消失。

<div class="lightbox">
  <img src="generated/images/guide/attribute-directives/highlight-directive-anim.gif" alt="Second Highlight">
</div>

{@a bindings}
## Passing values into an attribute directive

## 将值传递给属性型指令

This section walks you through setting the highlight color while applying the `HighlightDirective`.

本节将引导你在应用 `HighlightDirective` 时设置突出显示颜色。

1. In `highlight.directive.ts`, import `Input` from `@angular/core`.

   在 `highlight.directive.ts` 中，从 `@angular/core` 导入 `Input`。

   <code-example path="attribute-directives/src/app/highlight.directive.3.ts" header="src/app/highlight.directive.ts (imports)" region="imports"></code-example>

1. Add an `appHighlight` `@Input()` property.

   添加一个 `appHighlight` 的 `@Input()` 属性。

   <code-example path="attribute-directives/src/app/highlight.directive.3.ts" header="src/app/highlight.directive.ts" region="input"></code-example>

   The `@Input()` decorator adds metadata to the class that makes the directive's `appHighlight` property available for binding.

   `@Input()` 装饰器会将元数据添加到此类，以便让该指令的 `appHighlight` 属性可用于绑定。

1. In `app.component.ts`, add a `color` property to the `AppComponent`.

   在 `app.component.ts`，将 `color` 属性添加到 `AppComponent`。

   <code-example path="attribute-directives/src/app/app.component.1.ts" header="src/app/app.component.ts (class)" region="class"></code-example>

1. To simultaneously apply the directive and the color, use property binding with the `appHighlight` directive selector, setting it equal to `color`.

   要同时应用指令和颜色，请通过 `appHighlight` 指令选择器使用属性绑定，将其设置为 `color`。

   <code-example path="attribute-directives/src/app/app.component.html" header="src/app/app.component.html (color)" region="color"></code-example>

   The `[appHighlight]` attribute binding performs two tasks:

   `[appHighlight]` 属性绑定执行两项任务：

   * applies the highlighting directive to the `<p>` element

     将突出显示指令应用于 `<p>` 元素

   * sets the directive's highlight color with a property binding

     通过属性绑定设置指令的突出显示颜色

### Setting the value with user input

### 通过用户输入来设置值

This section guides you through adding radio buttons to bind your color choice to the `appHighlight` directive.

本节指导你添加单选按钮，将你选择的颜色绑定到 `appHighlight` 指令。

1. Add markup to `app.component.html` for choosing a color as follows:

   将标记添加到 `app.component.html` 以选择颜色，如下所示：

   <code-example path="attribute-directives/src/app/app.component.html" header="src/app/app.component.html (v2)" region="v2"></code-example>

1. Revise the `AppComponent.color` so that it has no initial value.

   修改 `AppComponent.color`，使其没有初始值。

   <code-example path="attribute-directives/src/app/app.component.ts" header="src/app/app.component.ts (class)" region="class"></code-example>

1. Serve your application to verify that the user can choose the color with the radio buttons.

   启动本应用的开发服务器，以验证用户可以通过单选按钮选择颜色。

   <div class="lightbox">
       <img src="generated/images/guide/attribute-directives/highlight-directive-v2-anim.gif" alt="Animated gif of the refactored highlight directive changing color according to the radio button the user selects">
   </div>

{@a second-property}


## Binding to a second property

## 绑定到第二个属性

This section guides you through configuring your application so the developer can set the default color.

本节将指导你配置应用程序，以便开发人员可以设置默认颜色。

1. Add a second `Input()` property to `HighlightDirective` called `defaultColor`.

   将第二个 `Input()` 属性 `defaultColor` 添加到 `HighlightDirective`。

   <code-example path="attribute-directives/src/app/highlight.directive.ts" header="src/app/highlight.directive.ts (defaultColor)" region="defaultColor"></code-example>

1. Revise the directive's `onMouseEnter` so that it first tries to highlight with the `highlightColor`, then with the `defaultColor`, and falls back to `red` if both properties are `undefined`.

   修改指令的 `onMouseEnter`，使其首先尝试使用 `highlightColor` 进行突出显示，然后尝试 `defaultColor`，如果两个属性都 `undefined`，则变回 `red`。

   <code-example path="attribute-directives/src/app/highlight.directive.ts" header="src/app/highlight.directive.ts (mouse-enter)" region="mouse-enter"></code-example>

1. To bind to the `AppComponent.color` and fall back to "violet" as the default color, add the following HTML.
   In this case,  the `defaultColor` binding doesn't use square brackets, `[]`, because it is static.

   若要绑定到 `AppComponent.color` 并回退为默认颜色“紫罗兰（violet）”，请添加以下 HTML。在这里，`defaultColor` 绑定没有使用方括号 `[]`，因为它是静态的。

   <code-example path="attribute-directives/src/app/app.component.html" header="src/app/app.component.html (defaultColor)" region="defaultColor"></code-example>

   As with components, you can add multiple directive property bindings to a host element.

   与组件一样，你可以将指令的多个属性绑定添加到宿主元素上。

The default color is red if there is no default color binding.
When the user chooses a color the selected color becomes the active highlight color.

如果没有默认颜色（defaultColor）绑定，则默认为红色。当用户选择一种颜色时，所选的颜色将成为突出显示的颜色。

  <div class="lightbox">
    <img src="generated/images/guide/attribute-directives/highlight-directive-final-anim.gif" alt="Animated gif of final highlight directive that shows red color with no binding and violet with the default color set. When user selects color, the selection takes precedence.">
  </div>

{@a ngNonBindable}

## Deactivating Angular processing with `NgNonBindable`

## 通过 `NgNonBindable` 停用 Angular 处理过程

To prevent expression evaluation in the browser, add `ngNonBindable` to the host element.
`ngNonBindable` deactivates interpolation, directives, and binding in templates.

要防止在浏览器中进行表达式求值，请将 `ngNonBindable` 添加到宿主元素。`ngNonBindable` 会停用模板中的插值、指令和绑定。

In the following example, the expression `{{ 1 + 1 }}` renders just as it does in your code editor, and does not display `2`.

在下面的示例中，表达式 `{{ 1 + 1 }}` 的渲染方式会和在代码编辑器的一样，而不会显示 `2`。

<code-example path="attribute-directives/src/app/app.component.html" linenums="false" header="src/app/app.component.html" region="ngNonBindable"></code-example>

Applying `ngNonBindable` to an element stops binding for that element's child elements.
However, `ngNonBindable` still allows directives to work on the element where you apply `ngNonBindable`.
In the following example, the `appHighlight` directive is still active but Angular does not evaluate the expression `{{ 1 + 1 }}`.

将 `ngNonBindable` 应用于元素将停止对该元素的子元素的绑定。但是，`ngNonBindable` 仍然允许指令在应用 `ngNonBindable` 的元素上工作。在以下示例中，`appHighlight` 指令仍处于活跃状态，但 Angular 不会对表达式 `{{ 1 + 1 }}` 求值。

<code-example path="attribute-directives/src/app/app.component.html" linenums="false" header="src/app/app.component.html" region="ngNonBindable-with-directive"></code-example>

If you apply `ngNonBindable` to a parent element, Angular disables interpolation and binding of any sort, such as property binding or event binding, for the element's children.

如果将 `ngNonBindable` 应用于父元素，则 Angular 会禁用该元素的子元素的任何插值和绑定，例如属性绑定或事件绑定。
