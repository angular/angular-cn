# Style Precedence

# 样式的优先级

When there are multiple bindings to the same class name or style attribute, Angular uses a set of precedence rules to determine which classes or styles to apply to the element.
These rules specify an order for which style- and class-related bindings have priority.
This styling precedence is as follows, from the most specific with the highest priority to least specific with the lowest priorty:

当存在多个绑定具有相同的类名或样式属性名时，Angular 会使用一组优先级规则来确定要应用于此元素的类或样式。这些规则指定了与样式和类相关的绑定的优先顺序。最有特异性的优先级最高，最宽松的优先级最低，样式优先级如下：

1. Template bindings are the most specific because they apply to the element directly and exclusively, so they have the highest precedence.

   模板绑定是最有特异性的，因为它们直接且排他地应用于此元素，因此它们具有最高的优先级。

  <table width="100%">
    <col width="40%"></col>
    <col width="60%"></col>
    <thead>
      <tr>
        <th>Binding type</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Property binding</td>
        <td><code>&lt;div [class.foo]="hasFoo"&gt;</code><br><code>&lt;div [style.color]="color"&gt;</code></td>
      </tr>
      <tr>
        <td>Map binding</td>
        <td><code>&lt;div [class]="classExpression"&gt;</code><br><code>&lt;div [style]="styleExpression"&gt;</code></td>
      </tr>
      <tr>
        <td>Static value</td>
        <td><code>&lt;div class="foo"&gt;</code><br><code>&lt;div style="color: blue"&gt;</code></td>
      </tr>
    </tbody>
  </table>
1. Directive host bindings are less specific because you can use directives in multiple locations, so they have a lower precedence than template bindings.

   指令的宿主绑定不太有特异性，因为你可以在多个位置使用该指令，因此它们的优先级比模板绑定低。

  <table width="100%">
    <col width="40%"></col>
    <col width="60%"></col>
    <thead>
      <tr>
        <th>Binding type</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Property binding</td>
        <td><code>host: {'[class.foo]': 'hasFoo'}</code><br><code>host: {'[style.color]': 'color'}</code></td>
      </tr>
      <tr>
        <td>Map binding</td>
        <td><code>host: {'[class]': 'classExpr'}</code><br><code>host: {'[style]': 'styleExpr'}</code></td>
      </tr>
      <tr>
        <td>Static value</td>
        <td><code>host: {'class': 'foo'}</code><br><code>host: {'style': 'color: blue'}</code></td>
      </tr>
    </tbody>
  </table>
1. Component host bindings have the lowest precedence.

   组件宿主绑定的优先级最低。

    <table width="100%">
    <col width="40%"></col>
    <col width="60%"></col>
    <thead>
      <tr>
        <th>Binding type</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Property binding</td>
        <td><code>host: {'[class.foo]': 'hasFoo'}</code><br><code>host: {'[style.color]': 'color'}</code></td>
      </tr>
      <tr>
        <td>Map binding</td>
        <td><code>host: {'[class]': 'classExpression'}</code><br><code>host: {'[style]': 'styleExpression'}</code></td>
      </tr>
      <tr>
        <td>Static value</td>
        <td><code>host: {'class': 'foo'}</code><br><code>host: {'style': 'color: blue'}</code></td>
      </tr>
    </tbody>
  </table>

## Precedence and specificity

## 优先级与特异性

In the following example, binding to a specific class, as in `[class.special]`, takes precedence over a generic `[class]` binding.
Similarly, binding to a specific style, as in `[style.color]`, takes precedence over a generic `[style]` binding.

在下面的示例中，与 `[class.special]` 对特定类的绑定优先于一般性的 `[class]` 绑定。同样，到特定样式的绑定（例如 `[style.color]` ）要优先于一般性的 `[style]` 绑定。

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

## Precedence and bindings from different sources

## 来自不同来源的优先级和绑定

Specificity rules also apply to bindings even when they originate from different sources.
An element can have bindings that originate from its own template, from host bindings on matched directives, and from host bindings on matched components.

特异性规则也作用于绑定，即使它们来自不同的来源。元素可以具有源自针对自身模板的绑定、源自其匹配指令的宿主绑定以及源自匹配其组件的宿主绑定。

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

## Precedence of bindings and static attributes

## 绑定和静态 Attribute 的优先级

Bindings take precedence over static attributes because they are dynamic.
In the following case, `class` and `[class]` have similar specificity, but the `[class]` binding takes precedence.

绑定优先于静态属性，因为它们是动态的。在以下情况下，`class` 和 `[class]` 具有相似的特异性，但是 `[class]` 绑定更有优先权。

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>

{@a styling-delegation}

## Delegating to styles with lower precedence

## 用较低的优先级委托到某些样式

Higher precedence styles can defer to lower precedence styles using `undefined` values.
For example, consider the following template:

通过使用 `undefined` 值，较高优先级的样式也可以让位于较低优先级的样式。例如，考虑以下模板：

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

Imagine that the `dirWithHostBinding` directive and the `comp-with-host-binding` component both have a `[style.width]` host binding.

假设 `dirWithHostBinding` 指令和 `comp-with-host-binding` 组件都具有 `[style.width]` 宿主绑定。

<code-example path="attribute-binding/src/app/comp-with-host-binding.component.ts" region="hostbinding" header="src/app/comp-with-host-binding.component.ts and dirWithHostBinding.directive.ts"></code-example>

If `dirWithHostBinding` sets its binding to `undefined`, the `width` property falls back to the value of the `comp-with-host-binding` host binding.

如果 `dirWithHostBinding` 将其绑定设置为 `undefined` ，则 `width` 属性将回退到 `comp-with-host-binding` 宿主绑定的值。

<code-example header="dirWithHostBinding directive">
@HostBinding('style.width')
width = ''; // undefined
</code-example>

<div class="alert is-helpful">

  If `dirWithHostBinding` sets its binding to `null`, Angular removes the `width` property entirely.

  但如果 `dirWithHostBinding` 将其绑定设置为 `null`（只有 undefined 是例外），则 Angular 会完全移除 `width` 属性。

  <code-example header="dirWithHostBinding">
  @HostBinding('style.width')
  width = null;
  </code-example>

</div>
