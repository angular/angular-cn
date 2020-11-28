
{@a attribute-directive}

# Testing Attribute Directives

# 测试属性型指令

An _attribute directive_ modifies the behavior of an element, component or another directive.
Its name reflects the way the directive is applied: as an attribute on a host element.

*属性型指令*会修改元素、组件或其他指令的行为。它的名字反映了该指令的应用方式：作为宿主元素的一个属性。

<div class="alert is-helpful">

  For the sample app that the testing guides describe, see the <live-example name="testing" embedded-style noDownload>sample app</live-example>.

  对于本测试指南中描述的范例应用，参阅<live-example name="testing" embedded-style noDownload>范例应用</live-example>。

  For the tests features in the testing guides, see <live-example name="testing" stackblitz="specs" noDownload>tests</live-example>.

  要了解本测试指南中涉及的测试特性，请参阅<live-example name="testing" stackblitz="specs" noDownload>tests</live-example>。

</div>

## Testing the `HighlightDirective`

## 测试 `HighlightDirective`

The sample application's `HighlightDirective` sets the background color of an element
based on either a data bound color or a default color (lightgray).
It also sets a custom property of the element (`customProperty`) to `true`
for no reason other than to show that it can.

本范例应用的 `HighlightDirective` 会根据数据绑定中的颜色或默认颜色（浅灰）来设置元素的背景色。它还会把该元素的自定义属性（`customProperty`）设置为 `true` ，当然这除了示范本技术之外别无它用。

<code-example path="testing/src/app/shared/highlight.directive.ts" header="app/shared/highlight.directive.ts"></code-example>

It's used throughout the application, perhaps most simply in the `AboutComponent`:

它在整个应用中都用到过，也许最简单的是在 `AboutComponent` 中：

<code-example path="testing/src/app/about/about.component.ts" header="app/about/about.component.ts"></code-example>

Testing the specific use of the `HighlightDirective` within the `AboutComponent` requires only the techniques explored in the ["Nested component tests"](guide/testing-components-scenarios#nested-component-tests) section of [Component testing scenarios](guide/testing-components-scenarios).

要想在 `AboutComponent` 中测试 `HighlightDirective` 的特定用法，只需要浏览[组件测试场景](guide/testing-components-scenarios)中的[“嵌套组件测试”](guide/testing-components-scenarios#nested-component-tests)一节中提到的各种技巧。

<code-example path="testing/src/app/about/about.component.spec.ts" region="tests" header="app/about/about.component.spec.ts"></code-example>

However, testing a single use case is unlikely to explore the full range of a directive's capabilities.
Finding and testing all components that use the directive is tedious, brittle, and almost as unlikely to afford full coverage.

但是，测试单个用例不太可能涉及指令的全部能力。要找到并测试那些使用了该指令的所有组件会很乏味、很脆弱，而且几乎不可能做到完全覆盖。

_Class-only tests_ might be helpful,
but attribute directives like this one tend to manipulate the DOM.
Isolated unit tests don't touch the DOM and, therefore,
do not inspire confidence in the directive's efficacy.

*纯类测试*可能会有一点帮助，但像这种属性型指令往往会操纵 DOM。孤立的单元测试不会触及 DOM，因此也无法给人带来对指令功效的信心。

A better solution is to create an artificial test component that demonstrates all ways to apply the directive.

更好的解决方案是创建一个人工测试组件来演示应用该指令的所有方法。

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="test-component" header="app/shared/highlight.directive.spec.ts (TestComponent)"></code-example>

<div class="lightbox">
  <img src='generated/images/guide/testing/highlight-directive-spec.png' alt="HighlightDirective spec in action">
</div>

<div class="alert is-helpful">

The `<input>` case binds the `HighlightDirective` to the name of a color value in the input box.
The initial value is the word "cyan" which should be the background color of the input box.

这个 `<input>` 用例将 `HighlightDirective` 绑定到输入框中颜色值的名称。初始值是单词“cyan”，应该把它设为输入框的背景颜色。

</div>

Here are some tests of this component:

下面是对该组件的一些测试：

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="selected-tests" header="app/shared/highlight.directive.spec.ts (selected tests)"></code-example>

A few techniques are noteworthy:

一些技巧值得注意：

- The `By.directive` predicate is a great way to get the elements that have this directive _when their element types are unknown_.

  `By.directive` 谓词是一种获取那些*不知道类型*但都附有本指令的元素的好办法。

- The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not">`:not` pseudo-class</a>
  in `By.css('h2:not([highlight])')` helps find `<h2>` elements that _do not_ have the directive.
  `By.css('*:not([highlight])')` finds _any_ element that does not have the directive.

  `By.css('h2:not([highlight])')` 中的 [`:not` 伪类](https://developer.mozilla.org/en-US/docs/Web/CSS/:not)可以帮助你找到那些*没有*该指令的 `<h2>` 元素。`By.css('*:not([highlight])')` 可以找到没有该指令的*任意*元素。

- `DebugElement.styles` affords access to element styles even in the absence of a real browser, thanks to the `DebugElement` abstraction.
  But feel free to exploit the `nativeElement` when that seems easier or more clear than the abstraction.

  `DebugElement.styles` 提供了对元素样式的访问，即使没有真正的浏览器也是如此，这要归功于 `DebugElement` 提供的抽象。但是，如果 `nativeElement` 显得比使用其抽象版本更容易或更清晰，那就把它暴露出来。

- Angular adds a directive to the injector of the element to which it is applied.
  The test for the default color uses the injector of the second `<h2>` to get its `HighlightDirective` instance
  and its `defaultColor`.

  Angular 会在指令宿主元素的注入器中添加上该指令。对默认颜色的测试使用第二个 `<h2>` 上的注入器来获取它的 `HighlightDirective` 实例及其 `defaultColor`。

- `DebugElement.properties` affords access to the artificial custom property that is set by the directive.

  `DebugElement.properties` 允许访问本指令设置的自定义属性。

<hr>
