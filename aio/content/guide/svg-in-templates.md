# SVG as templates

# SVG 作为模板

You can use SVG files as templates in your Angular applications. When you use an SVG as the template, you are able to use directives and bindings just like with HTML templates. With these features, you can dynamically generate interactive graphics.

你可以在 Angular 应用程序中将 SVG 文件用作模板。当你使用 SVG 作为模板时，就可以像 HTML 模板一样使用指令和绑定。使用这些功能，你可以动态生成交互式图形。

<div class="alert is-helpful">

See the <live-example name="template-syntax"></live-example> for a working example containing the code snippets in this guide.

包含本章代码片段的工作实例参阅<live-example name="template-syntax"></live-example>。

</div>

## SVG syntax example

## SVG 语法示例

The following example shows the syntax for using an SVG as a template.

以下示例显示了将 SVG 用作模板的语法。

<code-example path="template-syntax/src/app/svg.component.ts" header="src/app/svg.component.ts"></code-example>

To see property and event binding in action, add the following code to your `svg.component.svg` file:

要想查看属性和事件绑定的实际效果，请把以下代码添加到你的 `svg.component.svg` 文件中：

<code-example path="template-syntax/src/app/svg.component.svg" header="src/app/svg.component.svg"></code-example>

The example given uses a `click()` event binding and the property binding syntax
(`[attr.fill]="fillColor"`).

这个例子使用了事件绑定语法 `click()` 和属性绑定语法（`[attr.fill]="fillColor"`）。
