# Writing structural directives

# 编写结构型指令

This topic demonstrates how to create a structural directive and provides conceptual information on how directives work, how Angular interprets shorthand, and how to add template guard properties to catch template type errors.

本主题演示如何创建结构型指令，并提供有关指令如何工作、Angular 如何解释简写形式以及如何添加模板守卫属性以捕获模板类型错误的概念性信息。

<div class="alert is-helpful">

For the example app that this page describes, see the <live-example></live-example>.

有关此页面描述的示例应用程序，请参见<live-example></live-example> 。

</div>

For more information on Angular's built-in structural directives, such as `NgIf`, `NgFor`, and `NgSwitch`, see [Built-in directives](guide/built-in-directives).

有关 Angular 的内置结构型指令（如 `NgIf` ， `NgFor` 和 `NgSwitch`）的更多信息，请参见[内置指令](guide/built-in-directives)。

{@a unless}

## Creating a structural directive

## 创建结构型指令

This section guides you through creating an `UnlessDirective` and how to set `condition` values.
The `UnlessDirective` does the opposite of `NgIf`, and `condition` values can be set to `true` or `false`.
`NgIf` displays the template content when the condition is `true`.
`UnlessDirective` displays the content when the condition is `false`.

本节将指导你创建 `UnlessDirective` 以及如何设置 `condition` 值。 `UnlessDirective` 与 `NgIf` 相反，并且 `condition` 值可以设置为 `true` 或 `false` 。 `NgIf` 为 `true` 时显示模板内容；而 `UnlessDirective` 在这个条件为 `false` 时显示内容。

Following is the `UnlessDirective` selector, `appUnless`, applied to the paragraph element.
When `condition` is `false`, the browser displays the sentence.

以下是应用于 p 元素的 `UnlessDirective` 选择器 `appUnless` 当 `condition` 为 `false` ，浏览器将显示该句子。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (appUnless-1)" region="appUnless-1"></code-example>

1. Using the Angular CLI, run the following command, where `unless` is the name of the directive:

   使用 Angular CLI，运行以下命令，其中 `unless` 是伪指令的名称：

   ```bash
   ng generate directive unless
   ```

   Angular creates the directive class and specifies the CSS selector, `appUnless`, that identifies the directive in a template.

   Angular 会创建指令类，并指定 CSS 选择器 `appUnless`，它会在模板中标识指令。

1. Import `Input`, `TemplateRef`, and `ViewContainerRef`.

   导入 `Input`、`TemplateRef` 和 `ViewContainerRef`。

   <code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (skeleton)" region="skeleton"></code-example>

1. Inject `TemplateRef` and `ViewContainerRef` in the directive constructor as private variables.

   在指令的构造函数中将 `TemplateRef` 和 `ViewContainerRef` 注入成私有变量。

   <code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (ctor)" region="ctor"></code-example>

   The `UnlessDirective` creates an [embedded view](api/core/EmbeddedViewRef "API: EmbeddedViewRef") from the Angular-generated `<ng-template>` and inserts that view in a [view container](api/core/ViewContainerRef "API: ViewContainerRef") adjacent to the directive's original `<p>` host element.

   `UnlessDirective` 会通过 Angular 生成的 `<ng-template>` 创建一个[嵌入的视图](api/core/EmbeddedViewRef "API：EmbeddedViewRef")，然后将该视图插入到该指令的原始 `<p>` 宿主元素紧后面的[视图容器](api/core/ViewContainerRef "API：ViewContainerRef")中。

   [`TemplateRef`](api/core/TemplateRef "API: TemplateRef") helps you get to the `<ng-template>` contents and [`ViewContainerRef`](api/core/ViewContainerRef "API: ViewContainerRef") accesses the view container.

   [`TemplateRef`](api/core/TemplateRef "API：TemplateRef")可帮助你获取 `<ng-template>` 的内容，而 [`ViewContainerRef`](api/core/ViewContainerRef "API：ViewContainerRef") 可以访问视图容器。

1. Add an `appUnless` `@Input()` property with a setter.

   添加一个带 setter 的 `@Input()` 属性 `appUnless`。

   <code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (set)" region="set"></code-example>

   Angular sets the `appUnless` property whenever the value of the condition changes.

   每当条件的值更改时，Angular 都会设置 `appUnless` 属性。

   * If the condition is falsy and Angular hasn't created the view previously, the setter causes the view container to create the embedded view from the template.

     如果条件是假值，并且 Angular 以前尚未创建视图，则此 setter 会导致视图容器从模板创建出嵌入式视图。

   * If the condition is truthy and the view is currently displayed, the setter clears the container, which disposes of the view.

     如果条件为真值，并且当前正显示着视图，则此 setter 会清除容器，这会导致销毁该视图。

The complete directive is as follows:

完整的指令如下：

<code-example path="structural-directives/src/app/unless.directive.ts" header="src/app/unless.directive.ts (excerpt)" region="no-docs"></code-example>

### Testing the directive

### 测试指令

In this section, you'll update your application to test the `UnlessDirective`.

在本节中，你将更新你的应用程序，以测试 `UnlessDirective` 。

1. Add a `condition` set to `false` in the `AppComponent`.

   添加一个 `condition` 设置为 `false` 的 `AppComponent` 。

   <code-example path="structural-directives/src/app/app.component.ts" header="src/app/app.component.ts (excerpt)" region="condition"></code-example>

1. Update the template to use the directive.
  Here, `*appUnless` is on two `<p>` tags with opposite `condition` values, one `true` and one `false`.

   更新模板以使用指令。这里，`*appUnless` 位于两个具有相反 `condition` 的 `<p>` 标记上，一个为 `true` ，一个为 `false` 。

   <code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (appUnless)" region="appUnless"></code-example>

   The asterisk is shorthand that marks `appUnless` as a structural directive.
   When the `condition` is falsy, the top (A) paragraph appears and the bottom (B) paragraph disappears.
   When the `condition` is truthy, the top (A) paragraph disappears and the bottom (B) paragraph appears.

   星号是将 `appUnless` 标记为结构型指令的简写形式。如果 `condition` 是假值，则会让顶部段落 A 出现，而底部段落 B 消失。当 `condition` 为真时，顶部段落 A 消失，而底部段落 B 出现。

1. To change and display the value of `condition` in the browser, add markup that displays the status and a button.

   要在浏览器中更改并显示 `condition` 的值，请添加一段标记代码以显示状态和按钮。

   <code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html" region="toggle-info"></code-example>

To verify that the directive works, click the button to change the value of `condition`.

要验证指令是否有效，请单击按钮以更改 `condition` 的值。

  <div class="lightbox">
    <img src='generated/images/guide/structural-directives/unless-anim.gif' alt="UnlessDirective in action">
  </div>

{@a shorthand}
{@a asterisk}

## Structural directive shorthand

## 结构型指令简写形式

The asterisk, `*`,  syntax on a structural directive, such as `*ngIf`, is shorthand that Angular interprets into a longer form.
Angular transforms the asterisk in front of a structural directive into an `<ng-template>` that surrounds the host element and its descendants.

结构型指令（例如 `*ngIf`）上的星号 `*` 语法是 Angular 解释为较长形式的简写形式。 Angular 将结构型指令前面的星号转换为围绕宿主元素及其后代的 `<ng-template>`。

The following is an example of `*ngIf` that displays the hero's name if `hero` exists:

下面是一个 `*ngIf` 的示例，如果 `hero` 存在，则显示英雄的名称：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (asterisk)" region="asterisk"></code-example>

The `*ngIf` directive moves to the `<ng-template>` where it becomes a property binding in square brackets, `[ngIf]`.
The rest of the `<div>`, including its class attribute, moves inside the `<ng-template>`.

`*ngIf` 指令移到了 `<ng-template>` 上，在这里它成为绑定在方括号 `[ngIf]` 中的属性。 `<div>` 的其余部分（包括其 class 属性）移到了 `<ng-template>` 内部。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-template)" region="ngif-template"></code-example>

Angular does not create a real `<ng-template>` element, instead rendering only the `<div>` and a comment node placeholder to the DOM.

Angular 不会创建真正的 `<ng-template>` 元素，只会将 `<div>` 和注释节点占位符渲染到 DOM 中。

```html
<!--bindings={
  "ng-reflect-ng-if": "[object Object]"
}-->
<div _ngcontent-c0>Mr. Nice</div>
```

The following example compares the shorthand use of the asterisk in `*ngFor` with the longhand `<ng-template>` form:

`*ngFor` 中的星号的简写形式与非简写的 `<ng-template>` 形式进行比较：

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (inside-ngfor)" region="inside-ngfor"></code-example>

Here, everything related to the `ngFor` structural directive applies to the `<ng-template>`.
All other bindings and attributes on the element apply to the `<div>` element within the `<ng-template>`.
Other modifiers on the host element, in addition to the `ngFor` string, remain in place as the element moves inside the `<ng-template>`.
In this example, the `[class.odd]="odd"` stays on the `<div>`.

这里，`ngFor` 结构型指令相关的所有内容都应用到了 `<ng-template>` 中。而元素上的所有其他绑定和属性应用到了 `<ng-template>` 中的 `<div>` 元素上。除了 `ngFor` 字符串外，宿主元素上的其他修饰都会保留在 `<ng-template>` 中。在这个例子中，`[class.odd]="odd"` 就留在了 `<div>` 中。

The `let` keyword declares a template input variable that you can reference within the template.
The input variables in this example are `hero`, `i`, and `odd`.
The parser translates `let hero`, `let i`, and `let odd` into variables named `let-hero`, `let-i`, and `let-odd`.
The `let-i` and `let-odd` variables become `let i=index` and `let odd=odd`.
Angular sets `i` and `odd` to the current value of the context's `index` and `odd` properties.

`let` 关键字会声明一个模板输入变量，你可以在模板中引用该变量。在这个例子中，是 `hero`、`i` 和 `odd`。解析器将 `let hero`、`let i` 和 `let odd` 转换为名为 `let-hero`、`let-i` 和 `let-odd` 的变量。 `let-i` 和 `let-odd` 变量变为 `let i=index` 和 `let odd=odd` 。 Angular 会将 `i` 和 `odd` 设置为上下文中 `index` 和 `odd` 属性的当前值。

The parser applies PascalCase to all directives and prefixes them with the directive's attribute name, such as ngFor.
For example, the `ngFor` input properties, `of` and `trackBy`, map to `ngForOf` and `ngForTrackBy`.
As the `NgFor` directive loops through the list, it sets and resets properties of its own context object.
These properties can include, but aren't limited to, `index`, `odd`, and a special property
named `$implicit`.

解析器会将 PascalCase 应用于所有指令，并为它们加上指令的属性名称（例如 ngFor）。比如，`ngFor` 的输入特性 `of` 和 `trackBy` ，会映射为 `ngForOf` 和 `ngForTrackBy` 。当 `NgFor` 指令遍历列表时，它会设置和重置它自己的上下文对象的属性。这些属性可以包括但不限于 `index`、`odd` 和一个名为 `$implicit` 的特殊属性。

Angular sets `let-hero` to the value of the context's `$implicit` property, which `NgFor` has initialized with the hero for the current iteration.

Angular 会将 `let-hero` 设置为上下文的 `$implicit` 属性的值， `NgFor` 已经将其初始化为当前正在迭代的英雄。

For more information, see the [NgFor API](api/common/NgForOf "API: NgFor") and [NgForOf API](api/common/NgForOf) documentation.

有关更多信息，请参见 [NgFor API](api/common/NgForOf "API：NgFor") 和 [NgForOf API](api/common/NgForOf) 文档。

### Creating template fragments with `<ng-template>`

### 用 `<ng-template>` 创建模板片段

Angular's `<ng-template>` element defines a template that doesn't render anything by default.
With `<ng-template>`, you can render the content manually for full control over how the content displays.

Angular 的 `<ng-template>` 元素定义了一个默认情况下不渲染任何内容的模板。使用 `<ng-template>` ，你可以手动渲染内容，以完全控制内容的显示方式。

If there is no structural directive and you wrap some elements in an `<ng-template>`, those elements disappear.
In the following example, Angular does not render the middle "Hip!" in the phrase "Hip! Hip! Hooray!" because of the surrounding `<ng-template>`.

如果没有结构型指令，并且将某些元素包装在 `<ng-template>` 中，则这些元素会消失。在下面的示例中，Angular 不会渲染中间的 “Hip!”，因为它被 `<ng-template>` 包裹着。

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (template-tag)" region="template-tag"></code-example>

<div class="lightbox">
  <img src='generated/images/guide/structural-directives/template-rendering.png' alt="template tag rendering">
</div>

## Structural directive syntax reference

## 结构型指令语法参考

When you write your own structural directives, use the following syntax:

当你编写自己的结构型指令时，请使用以下语法：

```
*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"
```

The following tables describe each portion of the structural directive grammar:

下表描述了结构型指令语法的每个部分：

<table>

  <tr>
    <td><code>prefix</code></td>
    <td>HTML attribute key</td>
  </tr>
  <tr>
    <td><code>prefix</code></td>
    <td>HTML 属性的键名</td>
  </tr>
  <tr>
    <td><code>key</code></td>
    <td>HTML attribute key</td>
  </tr>
  <tr>
    <td><code>key</code></td>
    <td>HTML 属性的键名</td>
  </tr>
  <tr>
    <td><code>local</code></td>
    <td>local variable name used in the template</td>
  </tr>
  <tr>
    <td><code>local</code></td>
    <td>在模板中使用的局部变量名</td>
  </tr>
  <tr>
    <td><code>export</code></td>
    <td>value exported by the directive under a given name</td>
  <tr>
    <td><code>export</code></td>
    <td>该指令以特定名称导出的值</td>
  </tr>
  <tr>
    <td><code>expression</code></td>
    <td>standard Angular expression</td>
  </tr>
  <tr>
    <td><code>expression</code></td>
    <td>标准 Angular 表达式</td>
  </tr>
</table>

<table>
  <tr>
    <th></th>
  </tr>
  <tr>
    <td colspan="3"><code>keyExp = :key ":"? :expression ("as" :local)? ";"? </code></td>
  </tr>
  <tr>
    <td colspan="3"><code>let = "let" :local "=" :export ";"?</code></td>
  </tr>
  <tr>
    <td colspan="3"><code>as = :export "as" :local ";"?</code></td>
  </tr>
</table>

### How Angular translates shorthand

### Angular 如何翻译简写形式

Angular translates structural directive shorthand into the normal binding syntax as follows:

Angular 会将结构型指令的简写形式转换为普通的绑定语法，如下所示：

<table>
  <tr>
    <th>Shorthand</th>
    <th>Translation</th>
  </tr>
  <tr>
    <th>简写形式</th>
    <th>翻译结果</th>
  </tr>
  <tr>
    <td><code>prefix</code> and naked <code>expression</code></td>
    <td><code>[prefix]="expression"</code></td>
  </tr>
  <tr>
    <td><code>prefix</code> 和裸 <code>expression</code></td>
    <td><code>[prefix]="expression"</code></td>
  </tr>
  <tr>
    <td><code>keyExp</code></td>
    <td><code>[prefixKey] "expression"
    (let-prefixKey="export")</code>
    <br />
    Notice that the <code>prefix</code>
    is added to the <code>key</code>
    </td>
  </tr>
  <tr>
    <td><code>keyExp</code></td>
    <td><code>[prefixKey] "expression"
    (let-prefixKey="export")</code>
    <br />
    注意，这个 <code>prefix</code> 已经加到了 <code>key</code> 上。</td>
  </tr>
  <tr>
    <td><code>let</code></td>
    <td><code>let-local="export"</code></td>
  </tr>
</table>

### Shorthand examples

### 简写形式示例

The following table provides shorthand examples:

下表提供了一些简写形式示例：

<table>
  <tr>
    <th>Shorthand</th>
    <th>How Angular interprets the syntax</th>
  </tr>
  <tr>
    <th>简写形式</th>
    <th>Angular 如何解释此语法</th>
  </tr>
  <tr>
    <td><code>*ngFor="let item of [1,2,3]"</code></td>
    <td><code>&lt;ng-template ngFor let-item [ngForOf]="[1,2,3]"&gt;</code></td>
  </tr>
  <tr>
    <td><code>*ngFor="let item of [1,2,3] as items; trackBy: myTrack; index as i"</code></td>
    <td><code>&lt;ng-template ngFor let-item [ngForOf]="[1,2,3]" let-items="ngForOf" [ngForTrackBy]="myTrack" let-i="index"&gt;</code>
    </td>
  </tr>
  <tr>
    <td><code>*ngIf="exp"</code></td>
    <td><code>&lt;ng-template [ngIf]="exp"&gt;</code></td>
  </tr>
  <tr>
    <td><code>*ngIf="exp as value"</code></td>
    <td><code>&lt;ng-template [ngIf]="exp" let-value="ngIf"&gt;</code></td>
  </tr>
</table>

{@a directive-type-checks}

<!-- To do follow up PR: move this section to a more general location because it also applies to attribute directives. -->

## Improving template type checking for custom directives

## 改进自定义指令的模板类型检查

You can improve template type checking for custom directives by adding template guard properties to your directive definition.
These properties help the Angular template type checker find mistakes in the template at compile time, which can avoid runtime errors.
These properties are as follows:

你可以通过将模板守卫属性添加到指令定义中来改进自定义指令的模板类型检查。这些属性可帮助 Angular 的模板类型检查器在编译时发现模板中的错误，从而避免运行时错误。这些属性如下：

* A property `ngTemplateGuard_(someInputProperty)` lets you specify a more accurate type for an input expression within the template.

  `ngTemplateGuard_(someInputProperty)` 属性使你可以为模板中的输入表达式指定更准确的类型。

* The `ngTemplateContextGuard` static property declares the type of the template context.

  静态属性 `ngTemplateContextGuard` 声明了模板上下文的类型。

This section provides examples of both kinds of type-guard property.
For more information, see [Template type checking](guide/template-typecheck "Template type-checking guide").

本节提供了两种类型守卫的示例。欲知详情，请参见[模板类型检查](guide/template-typecheck "模板类型检查指南")。

{@a narrowing-input-types}

### Making in-template type requirements more specific with template guards

### 使用模板守卫使模板中的类型要求更具体

A structural directive in a template controls whether that template is rendered at run time, based on its input expression.
To help the compiler catch template type errors, you should specify as closely as possible the required type of a directive's input expression when it occurs inside the template.

模板中的结构型指令会根据输入表达式来控制是否要在运行时渲染该模板。为了帮助编译器捕获模板类型中的错误，你应该尽可能详细地指定模板内指令的输入表达式所期待的类型。

A type guard function narrows the expected type of an input expression to a subset of types that might be passed to the directive within the template at run time.
You can provide such a function to help the type-checker infer the proper type for the expression at compile time.

类型保护函数会将输入表达式的预期类型缩小为可能在运行时传递给模板内指令的类型的子集。你可以提供这样的功能来帮助类型检查器在编译时为表达式推断正确的类型。

For example, the `NgIf` implementation uses type-narrowing to ensure that the
template is only instantiated if the input expression to `*ngIf` is truthy.
To provide the specific type requirement, the `NgIf` directive defines a [static property `ngTemplateGuard_ngIf: 'binding'`](api/common/NgIf#static-properties).
The `binding` value is a special case for a common kind of type-narrowing where the input expression is evaluated in order to satisfy the type requirement.

例如，`NgIf` 的实现使用类型窄化来确保只有当 `*ngIf` 的输入表达式为真时，模板才会被实例化。为了提供具体的类型要求，`NgIf` 指令定义了一个[静态属性 `ngTemplateGuard_ngIf: 'binding'`](api/common/NgIf#static-properties)。这里的 `binding` 值是一种常见的类型窄化的例子，它会对输入表达式进行求值，以满足类型要求。

To provide a more specific type for an input expression to a directive within the template, add an `ngTemplateGuard_xx` property to the directive, where the suffix to the static property name, `xx`, is the `@Input()` field name.
The value of the property can be either a general type-narrowing function based on its return type, or the string `"binding"`, as in the case of `NgIf`.

要为模板中指令的输入表达式提供更具体的类型，请在指令中添加 `ngTemplateGuard_xx` 属性，其中静态属性名称 `xx` 就是 `@Input()` 字段的名字。该属性的值可以是基于其返回类型的常规类型窄化函数，也可以是字符串，例如 `NgIf` 中的 `"binding"`。

For example, consider the following structural directive that takes the result of a template expression as an input:

例如，考虑以下结构型指令，该指令以模板表达式的结果作为输入：

<code-example language="ts" header="IfLoadedDirective">
export type Loaded<T> = { type: 'loaded', data: T };
export type Loading = { type: 'loading' };
export type LoadingState<T> = Loaded<T> | Loading;
export class IfLoadedDirective<T> {
    @Input('ifLoaded') set state(state: LoadingState<T>) {}
    static ngTemplateGuard_state<T>(dir: IfLoadedDirective<T>, expr: LoadingState<T>): expr is Loaded<T> { return true; };
}

export interface Person {
  name: string;
}

@Component({
  template: `&lt;div *ifLoaded="state">{{ state.data }}&lt;/div>`,
})
export class AppComponent {
  state: LoadingState<Person>;
}
</code-example>

In this example, the `LoadingState<T>` type permits either of two states, `Loaded<T>` or `Loading`. The expression used as the directive’s `state` input is of the umbrella type `LoadingState`, as it’s unknown what the loading state is at that point.

在这个例子中， `LoadingState<T>` 类型允许两个状态之一， `Loaded<T>` 或 `Loading` 。用作指令的 `state` 输入的表达式是宽泛的伞形类型 `LoadingState`，因为还不知道此时的加载状态是什么。

The `IfLoadedDirective` definition declares the static field `ngTemplateGuard_state`, which expresses the narrowing behavior.
Within the `AppComponent` template, the `*ifLoaded` structural directive should render this template only when `state` is actually `Loaded<Person>`.
The type guard allows the type checker to infer that the acceptable type of `state` within the template is a `Loaded<T>`, and further infer that `T` must be an instance of `Person`.

`IfLoadedDirective` 定义声明了静态字段 `ngTemplateGuard_state`，以表示其窄化行为。在 `AppComponent` 模板中，`*ifLoaded` 结构型指令只有当实际的 `state` 是 `Loaded<Person>` 类型时，才会渲染该模板。类型守护允许类型检查器推断出模板中可接受的 `state` 类型是 `Loaded<T>`，并进一步推断出 `T` 必须是一个 `Person` 的实例。

{@a narrowing-context-type}

### Typing the directive's context

### 为指令的上下文指定类型

If your structural directive provides a context to the instantiated template, you can properly type it inside the template by providing a static `ngTemplateContextGuard` function.
The following snippet shows an example of such a function.

如果你的结构型指令要为实例化的模板提供一个上下文，可以通过提供静态的 `ngTemplateContextGuard` 函数在模板中给它提供合适的类型。下面的代码片段展示了该函数的一个例子。

<code-example language="ts" header="myDirective.ts">
@Directive({…})
export class ExampleDirective {
    // Make sure the template checker knows the type of the context with which the
    // template of this directive will be rendered
    static ngTemplateContextGuard(dir: ExampleDirective, ctx: unknown): ctx is ExampleContext { return true; };

    // …
}
</code-example>
