# SVG in templates

# 模板中的 SVG

It is possible to use SVG as valid templates in Angular. All of the template syntax below is
applicable to both SVG and HTML. Learn more in the SVG [1.1](https://www.w3.org/TR/SVG11/) and
[2.0](https://www.w3.org/TR/SVG2/) specifications.

可以在 Angular 中可以把 SVG 用作有效模板。下面提及的所有模板语法都适用于 SVG 和 HTML。在 [SVG 1.1](https://www.w3.org/TR/SVG11/)和[2.0](https://www.w3.org/TR/SVG2/) 规范中可以了解更多信息。

<div class="alert is-helpful">

See the <live-example name="template-syntax"></live-example> for a working example containing the code snippets in this guide.

包含本章代码片段的工作实例参阅<live-example name="template-syntax"></live-example>。

</div>

Why would you use SVG as template, instead of simply adding it as image to your application?

为什么要用 SVG 作为模板，而不是简单地把它作为图片添加到你的应用中呢？

When you use an SVG as the template, you are able to use directives and bindings just like with HTML
templates. This means that you will be able to dynamically generate interactive graphics.

当你用 SVG 作为模板时，可以像使用 HTML 模板一样使用指令和绑定。这意味着你可以动态生成交互式图形。

Refer to the sample code snippet below for a syntax example:

相关的语法范例，请参阅下面的范例代码段：

<code-example path="template-syntax/src/app/svg.component.ts" header="src/app/svg.component.ts"></code-example>

Add the following code to your `svg.component.svg` file:

把以下代码添加到你的 `svg.component.svg` 文件中：

<code-example path="template-syntax/src/app/svg.component.svg" header="src/app/svg.component.svg"></code-example>

Here you can see the use of a `click()` event binding and the property binding syntax
(`[attr.fill]="fillColor"`).

你可以看到这里使用了事件绑定语法 `click()` 和属性绑定语法（ `[attr.fill]="fillColor"` ）。
