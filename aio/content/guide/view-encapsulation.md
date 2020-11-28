# View encapsulation

# 视图封装模式

In Angular, component CSS styles are encapsulated into the component's view and don't
affect the rest of the application.

在 Angular 中，组件的 CSS 样式被封装进了自己的视图中，而不会影响到应用程序的其它部分。

To control how this encapsulation happens on a *per
component* basis, you can set the *view encapsulation mode* in the component metadata.
Choose from the following modes:

通过在组件的元数据上设置*视图封装模式*，你可以分别控制*每个组件*的封装模式。
可选的封装模式一共有如下几种：

* `ShadowDom` view encapsulation uses the browser's native shadow DOM implementation (see
  [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  on the [MDN](https://developer.mozilla.org) site)
  to attach a shadow DOM to the component's host element, and then puts the component
  view inside that shadow DOM. The component's styles are included within the shadow DOM.

   `ShadowDom` 模式使用浏览器原生的 Shadow DOM 实现（参阅 [MDN](https://developer.mozilla.org) 上的 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)）来为组件的宿主元素附加一个 Shadow DOM。组件的视图被附加到这个 Shadow DOM 中，组件的样式也被包含在这个 Shadow DOM 中。(译注：不进不出，没有样式能进来，组件样式出不去。)

* `Emulated` view encapsulation (the default) emulates the behavior of shadow DOM by preprocessing
  (and renaming) the CSS code to effectively scope the CSS to the component's view.
  For details, see [Inspecting generated CSS](guide/view-encapsulation#inspect-generated-css) below.

   `Emulated` 模式（**默认值**）通过预处理（并改名）CSS 代码来模拟 Shadow DOM 的行为，以达到把 CSS 样式局限在组件视图中的目的。
  更多信息，见[附录 1](guide/view-encapsulation#inspect-generated-css)。(译注：只进不出，全局样式能进来，组件样式出不去)

* `None` means that Angular does no view encapsulation.
  Angular adds the CSS to the global styles.
  The scoping rules, isolations, and protections discussed earlier don't apply.
  This is essentially the same as pasting the component's styles into the HTML.

   `None` 意味着 Angular 不使用视图封装。
  Angular 会把 CSS 添加到全局样式中。而不会应用上前面讨论过的那些作用域规则、隔离和保护等。
  从本质上来说，这跟把组件的样式直接放进 HTML 是一样的。(译注：能进能出。)

To set the components encapsulation mode, use the `encapsulation` property in the component metadata:

通过组件元数据中的 `encapsulation` 属性来设置组件封装模式：

<code-example path="component-styles/src/app/quest-summary.component.ts" region="encapsulation.shadow" header="src/app/quest-summary.component.ts"></code-example>

`ShadowDom` view encapsulation only works on browsers that have native support
for shadow DOM (see [Shadow DOM v1](https://caniuse.com/shadowdomv1) on the
[Can I use](https://caniuse.com/) site). The support is still limited,
which is why `Emulated` view encapsulation is the default mode and recommended
in most cases.

`ShadowDom` 模式只适用于提供了原生 Shadow DOM 支持的浏览器（参阅 [Can I use](https://caniuse.com/) 上的 [Shadow DOM v1](https://caniuse.com/shadowdomv1) 部分）。
它仍然受到很多限制，这就是为什么仿真 (`Emulated`) 模式是默认选项，并建议将其用于大多数情况。

{@a inspect-generated-css}

## Inspecting generated CSS

## 查看生成的 CSS

When using emulated view encapsulation, Angular preprocesses
all component styles so that they approximate the standard shadow CSS scoping rules.

当使用默认的仿真模式时，Angular 会对组件的所有样式进行预处理，让它们模仿出标准的 Shadow CSS 作用域规则。

In the DOM of a running Angular application with emulated view
encapsulation enabled, each DOM element has some extra attributes
attached to it:

在启用了仿真模式的 Angular 应用的 DOM 树中，每个 DOM 元素都被加上了一些额外的属性。

<code-example format="">
  &lt;hero-details _nghost-pmm-5>
    &lt;h2 _ngcontent-pmm-5>Mister Fantastic&lt;/h2>
    &lt;hero-team _ngcontent-pmm-5 _nghost-pmm-6>
      &lt;h3 _ngcontent-pmm-6>Team&lt;/h3>
    &lt;/hero-team>
  &lt;/hero-detail>

</code-example>

There are two kinds of generated attributes:

生成出的属性分为两种：

* An element that would be a shadow DOM host in native encapsulation has a
  generated `_nghost` attribute. This is typically the case for component host elements.

   一个元素在原生封装方式下可能是 Shadow DOM 的宿主，在这里被自动添加上一个 `_nghost` 属性。
  这是组件宿主元素的典型情况。

* An element within a component's view has a `_ngcontent` attribute
that identifies to which host's emulated shadow DOM this element belongs.

   组件视图中的每一个元素，都有一个 `_ngcontent` 属性，它会标记出该元素属于哪个宿主的模拟 Shadow DOM。

The exact values of these attributes aren't important. They are automatically
generated and you never refer to them in application code. But they are targeted
by the generated component styles, which are in the `<head>` section of the DOM:

这些属性的具体值并不重要。它们是自动生成的，并且你永远不会在程序代码中直接引用到它们。
但它们会作为生成的组件样式的目标，就像 DOM 的 `<head>` 中一样：

<code-example format="">
  [_nghost-pmm-5] {
    display: block;
    border: 1px solid black;
  }

  h3[_ngcontent-pmm-6] {
    background-color: white;
    border: 1px solid #777;
  }
</code-example>

These styles are post-processed so that each selector is augmented
with `_nghost` or `_ngcontent` attribute selectors.
These extra selectors enable the scoping rules described in this page.

这些就是那些样式被处理后的结果，每个选择器都被增加了 `_nghost` 或 `_ngcontent` 属性选择器。
这些额外的选择器实现了本文所描述的这些作用域规则。
