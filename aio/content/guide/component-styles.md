# Component styles

# 组件样式

Angular applications are styled with standard CSS. That means you can apply
everything you know about CSS stylesheets, selectors, rules, and media queries
directly to Angular applications.

Angular 应用使用标准的 CSS 来设置样式。这意味着你可以把关于 CSS
的那些知识和技能直接用于 Angular 程序中，例如：样式表、选择器、规则以及媒体查询等。

Additionally, Angular can bundle *component styles*
with components, enabling a more modular design than regular stylesheets.

另外，Angular 还能把*组件样式*捆绑在组件上，以实现比标准样式表更加模块化的设计。

This page describes how to load and apply these component styles.

本章将会讲解如何加载和使用这些*组件样式*。

You can run the <live-example></live-example> in Stackblitz and download the code from there.

你可以运行<live-example></live-example>，在 Stackblitz 中试用并下载本页的代码。

## Using component styles

## 使用组件样式

For every Angular component you write, you may define not only an HTML template,
but also the CSS styles that go with that template,
specifying any selectors, rules, and media queries that you need.

对你编写的每个 Angular 组件来说，除了定义 HTML 模板之外，还要定义用于模板的 CSS 样式、
指定任意的选择器、规则和媒体查询。

One way to do this is to set the `styles` property in the component metadata.
The `styles` property takes an array of strings that contain CSS code.
Usually you give it one string, as in the following example:

实现方式之一，是在组件的元数据中设置 `styles` 属性。
`styles` 属性可以接受一个包含 CSS 代码的字符串数组。
通常你只给它一个字符串就行了，如同下例：

<code-example path="component-styles/src/app/hero-app.component.ts" header="src/app/hero-app.component.ts"></code-example>

## Style scope

## 范围化的样式

<div class="alert is-critical">

The styles specified in `@Component` metadata _apply only within the template of that component_.

在 `@Component` 的元数据中指定的样式只会对该组件的模板生效。

</div>

They are _not inherited_ by any components nested within the template nor by any content projected into the component.

它们既不会被模板中嵌入的组件继承，也不会被通过内容投影（如 ng-content）嵌进来的组件继承。

In this example, the `h1` style applies only to the `HeroAppComponent`,
not to the nested `HeroMainComponent` nor to `<h1>` tags anywhere else in the application.

在这个例子中，`h1` 的样式只对 `HeroAppComponent` 生效，既不会作用于内嵌的 `HeroMainComponent`，也不会作用于应用中其它任何地方的 `<h1>` 标签。

This scoping restriction is a ***styling modularity feature***.

这种范围限制就是所谓的***样式模块化***特性

* You can use the CSS class names and selectors that make the most sense in the context of each component.

   可以使用对每个组件最有意义的 CSS 类名和选择器。

* Class names and selectors are local to the component and don't collide with
  classes and selectors used elsewhere in the application.

   类名和选择器是局限于该组件的，它不会和应用中其它地方的类名和选择器冲突。

* Changes to styles elsewhere in the application don't affect the component's styles.

   组件的样式*不会*因为别的地方修改了样式而被意外改变。

* You can co-locate the CSS code of each component with the TypeScript and HTML code of the component,
  which leads to a neat and tidy project structure.

   你可以让每个组件的 CSS 代码和它的 TypeScript、HTML 代码放在一起，这将促成清爽整洁的项目结构。

* You can change or remove component CSS code without searching through the
  whole application to find where else the code is used.

   将来你可以修改或移除组件的 CSS 代码，而不用遍历整个应用来看它有没有在别处用到。

{@a special-selectors}

## Special selectors

## 特殊的选择器

Component styles have a few special *selectors* from the world of shadow DOM style scoping
(described in the [CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1) page on the
[W3C](https://www.w3.org) site).
The following sections describe these selectors.

组件样式中有一些从影子(Shadow) DOM 样式范围领域（记录在[W3C](https://www.w3.org)的[CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1)中） 引入的特殊*选择器*：

### :host

Use the `:host` pseudo-class selector to target styles in the element that *hosts* the component (as opposed to
targeting elements *inside* the component's template).

使用 `:host` 伪类选择器，用来选择组件*宿主*元素中的元素（相对于组件模板*内部*的元素）。

<code-example path="component-styles/src/app/hero-details.component.css" region="host" header="src/app/hero-details.component.css"></code-example>

The `:host` selector is the only way to target the host element. You can't reach
the host element from inside the component with other selectors because it's not part of the
component's own template. The host element is in a parent component's template.

`:host` 选择是是把宿主元素作为目标的*唯一*方式。除此之外，你将没办法指定它，
因为宿主不是组件自身模板的一部分，而是父组件模板的一部分。

Use the *function form* to apply host styles conditionally by
including another selector inside parentheses after `:host`.

要把宿主样式作为条件，就要像*函数*一样把其它选择器放在 `:host` 后面的括号中。

The next example targets the host element again, but only when it also has the `active` CSS class.

下一个例子再次把宿主元素作为目标，但是只有当它同时带有 `active` CSS 类的时候才会生效。

<code-example path="component-styles/src/app/hero-details.component.css" region="hostfunction" header="src/app/hero-details.component.css"></code-example>

### :host-context

Sometimes it's useful to apply styles based on some condition *outside* of a component's view.
For example, a CSS theme class could be applied to the document `<body>` element, and
you want to change how your component looks based on that.

有时候，基于某些来自组件视图*外部*的条件应用样式是很有用的。
例如，在文档的 `<body>` 元素上可能有一个用于表示样式主题 (theme) 的 CSS 类，你应当基于它来决定组件的样式。

Use the `:host-context()` pseudo-class selector, which works just like the function
form of `:host()`. The `:host-context()` selector looks for a CSS class in any ancestor of the component host element,
up to the document root. The `:host-context()` selector is useful when combined with another selector.

这时可以使用 `:host-context()` 伪类选择器。它也以类似 `:host()` 形式使用。它在当前组件宿主元素的*祖先节点*中查找 CSS 类，
直到文档的根节点为止。在与其它选择器组合使用时，它非常有用。

The following example applies a `background-color` style to all `<h2>` elements *inside* the component, only
if some ancestor element has the CSS class `theme-light`.

在下面的例子中，只有当某个祖先元素有 CSS 类 `theme-light` 时，才会把 `background-color` 样式应用到组件*内部*的所有 `<h2>` 元素中。

<code-example path="component-styles/src/app/hero-details.component.css" region="hostcontext" header="src/app/hero-details.component.css"></code-example>

### (deprecated) `/deep/`, `>>>`, and `::ng-deep`

### 已废弃 `/deep/`、`>>>` 和 `::ng-deep`

Component styles normally apply only to the HTML in the component's own template.

组件样式通常只会作用于组件自身的 HTML 上。

Applying the `::ng-deep` pseudo-class to any CSS rule completely disables view-encapsulation for
that rule. Any style with `::ng-deep` applied becomes a global style. In order to scope the specified style
to the current component and all its descendants, be sure to include the `:host` selector before
`::ng-deep`. If the `::ng-deep` combinator is used without the `:host` pseudo-class selector, the style
can bleed into other components.

把伪类 `::ng-deep` 应用到任何一条 CSS 规则上就会完全禁止对那条规则的视图包装。任何带有 `::ng-deep` 的样式都会变成全局样式。为了把指定的样式限定在当前组件及其下级组件中，请确保在 `::ng-deep` 之前带上 `:host` 选择器。如果 `::ng-deep` 组合器在 `:host` 伪类之外使用，该样式就会污染其它组件。

The following example targets all `<h3>` elements, from the host element down
through this component to all of its child elements in the DOM.

这个例子以所有的 `<h3>` 元素为目标，从宿主元素到当前元素再到 DOM 中的所有子元素：

<code-example path="component-styles/src/app/hero-details.component.css" region="deep" header="src/app/hero-details.component.css"></code-example>

The `/deep/` combinator also has the aliases `>>>`, and `::ng-deep`.

`/deep/` 组合器还有两个别名：`>>>` 和 `::ng-deep`。

<div class="alert is-important">

Use `/deep/`, `>>>` and `::ng-deep` only with *emulated* view encapsulation.
Emulated is the default and most commonly used view encapsulation. For more information, see the
[Controlling view encapsulation](guide/component-styles#view-encapsulation) section.

`/deep/` 和 `>>>` 选择器只能被用在**仿真 (emulated) **模式下。
这种方式是默认值，也是用得最多的方式。
更多信息，见[控制视图封装模式](guide/component-styles#view-encapsulation)一节。

</div>

<div class="alert is-important">

The shadow-piercing descendant combinator is deprecated and [support is being removed from major browsers](https://www.chromestatus.com/features/6750456638341120) and tools.
As such we plan to drop support in Angular (for all 3 of `/deep/`, `>>>` and `::ng-deep`).
Until then `::ng-deep` should be preferred for a broader compatibility with the tools.

CSS 标准中用于 "刺穿 Shadow DOM" 的组合器已经被废弃，并将[这个特性从主流浏览器和工具中移除](https://www.chromestatus.com/features/6750456638341120)。
因此，我们也将在 Angular 中移除对它们的支持（包括 `/deep/`、`>>>` 和 `::ng-deep`）。
目前，建议先统一使用 `::ng-deep`，以便兼容将来的工具。

</div>

{@a loading-styles}

## Loading component styles

## 把样式加载进组件中

There are several ways to add styles to a component:

有几种方式把样式加入组件：

* By setting `styles` or `styleUrls` metadata.

   设置 `styles` 或 `styleUrls` 元数据

* Inline in the template HTML.

   内联在模板的 HTML 中

* With CSS imports.

   通过 CSS 文件导入

The scoping rules outlined earlier apply to each of these loading patterns.

上述作用域规则对所有这些加载模式都适用。

### Styles in component metadata

### 元数据中的样式

You can add a `styles` array property to the `@Component` decorator.

你可以给 `@Component` 装饰器添加一个 `styles` 数组型属性。

Each string in the array defines some CSS for this component.

这个数组中的每一个字符串（通常也只有一个）定义一份 CSS。

<code-example path="component-styles/src/app/hero-app.component.ts" header="src/app/hero-app.component.ts (CSS inline)">
</code-example>

<div class="alert is-critical">

Reminder: these styles apply _only to this component_.
They are _not inherited_ by any components nested within the template nor by any content projected into the component.

注意：这些样式**只对当前组件生效**。
它们**既不会作用于模板中嵌入的任何组件**，也不会作用于投影进来的组件（如 `ng-content` ）。

</div>

The Angular CLI command [`ng generate component`](cli/generate) defines an empty `styles` array when you create the component with the `--inline-style` flag.

当使用 `--inline-styles` 标识创建组件时，Angular CLI 的 [`ng generate component`](cli/generate) 命令就会定义一个空的 `styles` 数组

<code-example language="sh" class="code-shell">
ng generate component hero-app --inline-style
</code-example>

### Style files in component metadata

### 组件元数据中的样式文件

You can load styles from external CSS files by adding a `styleUrls` property
to a component's `@Component` decorator:

你可以通过把外部 CSS 文件添加到 `@Component` 的 `styleUrls` 属性中来加载外部样式。

<code-tabs>
  <code-pane header="src/app/hero-app.component.ts (CSS in file)" path="component-styles/src/app/hero-app.component.1.ts"></code-pane>
  <code-pane header="src/app/hero-app.component.css" path="component-styles/src/app/hero-app.component.css"></code-pane>
</code-tabs>

<div class="alert is-critical">

Reminder: the styles in the style file apply _only to this component_.
They are _not inherited_ by any components nested within the template nor by any content projected into the component.

注意：这些样式**只对当前组件生效**。
它们**既不会作用于模板中嵌入的任何组件**，也不会作用于投影进来的组件（如 `ng-content` ）。

</div>

<div class="alert is-helpful">

  You can specify more than one styles file or even a combination of `styles` and `styleUrls`.

  你可以指定多个样式文件，甚至可以组合使用 `style` 和 `styleUrls` 方式。

</div>

When you use the Angular CLI command [`ng generate component`](cli/generate) without the `--inline-style` flag, it creates an empty styles file for you and references that file in the component's generated `styleUrls`.

当你使用 Angular CLI 的 [`ng generate component`](cli/generate) 命令但不带 `--inline-style` 标志时，CLI 会为你创建一个空白的样式表文件，并且在所生成组件的 `styleUrls` 中引用该文件。

<code-example language="sh" class="code-shell">
ng generate component hero-app
</code-example>

### Template inline styles

### 模板内联样式

You can embed CSS styles directly into the HTML template by putting them
inside `<style>` tags.

你也可以直接在组件的 HTML 模板中写 `<style>` 标签来内嵌 CSS 样式。

<code-example path="component-styles/src/app/hero-controls.component.ts" region="inlinestyles" header="src/app/hero-controls.component.ts">
</code-example>

### Template link tags

### 模板中的 link 标签

You can also write `<link>` tags into the component's HTML template.

你也可以在组件的 HTML 模板中写 `<link>` 标签。

<code-example path="component-styles/src/app/hero-team.component.ts" region="stylelink" header="src/app/hero-team.component.ts">
</code-example>

<div class="alert is-critical">

When building with the CLI, be sure to include the linked style file among the assets to be copied to the server as described in the [CLI wiki](https://github.com/angular/angular-cli/wiki/stories-asset-configuration).
<!-- 2018-10-16: The link above is still the best source for this information. -->

当使用 CLI 进行构建时，要确保这个链接到的样式表文件被复制到了服务器上。参见 [CLI 官方文档](https://github.com/angular/angular-cli/wiki/stories-asset-configuration)。

Once included, the CLI will include the stylesheet, whether the link tag's href URL is relative to the application root or the component file.

只要引用过，CLI 就会计入这个样式表，无论这个 link 标签的 href 指向的 URL 是相对于应用根目录的还是相对于组件文件的。

</div>

### CSS @imports

### CSS @imports 语法

You can also import CSS files into the CSS files using the standard CSS `@import` rule.
For details, see [`@import`](https://developer.mozilla.org/en/docs/Web/CSS/@import)
on the [MDN](https://developer.mozilla.org) site.

你还可以利用标准的 CSS [`@import` 规则](https://developer.mozilla.org/en/docs/Web/CSS/@import)来把其它
  CSS 文件导入到 CSS 文件中。

In this case, the URL is relative to the CSS file into which you're importing.

在*这种*情况下，URL 是相对于你正在导入的 CSS 文件的。

<code-example path="component-styles/src/app/hero-details.component.css" region="import" header="src/app/hero-details.component.css (excerpt)">
</code-example>

### External and global style files

### 外部以及全局样式文件

When building with the CLI, you must configure the `angular.json` to include _all external assets_, including external style files.

当使用 CLI 进行构建时，你必须配置 `angular.json` 文件，使其包含*所有外部资源*（包括外部的样式表文件）。

Register **global** style files in the `styles` section which, by default, is pre-configured with the global `styles.css` file.

在它的 `styles` 区注册这些**全局**样式文件，默认情况下，它会有一个预先配置的全局 `styles.css` 文件。

See the [CLI wiki](https://github.com/angular/angular-cli/wiki/stories-global-styles) to learn more.
<!-- 2018-10-16: The link above is still the best source for this information. -->

要了解更多，参见 [CLI 官方文档](https://github.com/angular/angular-cli/wiki/stories-global-styles)。

### Non-CSS style files

### 非 CSS 样式文件

If you're building with the CLI,
you can write style files in [sass](http://sass-lang.com/), [less](http://lesscss.org/), or [stylus](http://stylus-lang.com/) and specify those files in the `@Component.styleUrls` metadata with the appropriate extensions (`.scss`, `.less`, `.styl`) as in the following example:

如果使用 CLI 进行构建，那么你可以用 [sass](http://sass-lang.com/)、[less](http://lesscss.org/) 或 [stylus](http://stylus-lang.com/) 来编写样式，并使用相应的扩展名（`.scss`、`.less`、`.styl`）把它们指定到 `@Component.styleUrls` 元数据中。例子如下：

<code-example>
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
...
</code-example>

The CLI build process runs the pertinent CSS preprocessor.

CLI 的构建过程会运行相关的预处理器。

When generating a component file with `ng generate component`, the CLI emits an empty CSS styles file (`.css`) by default.
You can configure the CLI to default to your preferred CSS preprocessor
as explained in the [CLI wiki](https://github.com/angular/angular-cli/wiki/stories-css-preprocessors
"CSS Preprocessor integration").
<!-- 2018-10-16: The link above is still the best source for this information. -->

当使用 `ng generate component` 命令生成组件文件时，CLI 会默认生成一个空白的 CSS 样式文件（`.css`）。
你可以配置 CLI，让它默认使用你喜欢的 CSS 预处理器，参见 [CLI 官方文档](https://github.com/angular/angular-cli/wiki/stories-css-preprocessors
                                 "CSS Preprocessor integration") 中的解释。

<div class="alert is-important">

Style strings added to the `@Component.styles` array _must be written in CSS_ because the CLI cannot apply a preprocessor to inline styles.

添加到 `@Component.styles` 数组中的字符串*必须写成 CSS*，因为 CLI 没法对这些内联的样式使用任何 CSS 预处理器。

</div>

{@a view-encapsulation}

## View encapsulation

## 视图封装模式

As discussed earlier, component CSS styles are encapsulated into the component's view and don't
affect the rest of the application.

像上面讨论过的一样，组件的 CSS 样式被封装进了自己的视图中，而不会影响到应用程序的其它部分。

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

   `ShadowDom` 模式使用浏览器原生的 Shadow DOM 实现（参见 [MDN](https://developer.mozilla.org) 上的 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)）来为组件的宿主元素附加一个 Shadow DOM。组件的视图被附加到这个 Shadow DOM 中，组件的样式也被包含在这个 Shadow DOM 中。(译注：不进不出，没有样式能进来，组件样式出不去。)

* `Native` view encapsulation uses a now deprecated version of the browser's native shadow DOM implementation - [learn about the changes](https://hayato.io/2016/shadowdomv1/).

   `Native` 视图包装模式使用浏览器原生 Shadow DOM 的一个废弃实现 —— [参见变化详情](https://hayato.io/2016/shadowdomv1/)。

* `Emulated` view encapsulation (the default) emulates the behavior of shadow DOM by preprocessing
  (and renaming) the CSS code to effectively scope the CSS to the component's view.
  For details, see [Inspecting generated CSS](guide/component-styles#inspect-generated-css) below.

   `Emulated` 模式（**默认值**）通过预处理（并改名）CSS 代码来模拟 Shadow DOM 的行为，以达到把 CSS 样式局限在组件视图中的目的。
  更多信息，见[附录 1](guide/component-styles#inspect-generated-css)。(译注：只进不出，全局样式能进来，组件样式出不去)

* `None` means that Angular does no view encapsulation.
  Angular adds the CSS to the global styles.
  The scoping rules, isolations, and protections discussed earlier don't apply.
  This is essentially the same as pasting the component's styles into the HTML.

   `None` 意味着 Angular 不使用视图封装。
  Angular 会把 CSS 添加到全局样式中。而不会应用上前面讨论过的那些作用域规则、隔离和保护等。
  从本质上来说，这跟把组件的样式直接放进 HTML 是一样的。(译注：能进能出。)

To set the components encapsulation mode, use the `encapsulation` property in the component metadata:

通过组件元数据中的 `encapsulation` 属性来设置组件封装模式：

<code-example path="component-styles/src/app/quest-summary.component.ts" region="encapsulation.native" header="src/app/quest-summary.component.ts"></code-example>

`ShadowDom` view encapsulation only works on browsers that have native support
for shadow DOM (see [Shadow DOM v1](https://caniuse.com/#feat=shadowdomv1) on the
[Can I use](http://caniuse.com) site). The support is still limited,
which is why `Emulated` view encapsulation is the default mode and recommended
in most cases.

`ShadowDom` 模式只适用于提供了原生 Shadow DOM 支持的浏览器（参见 [Can I use](http://caniuse.com/) 上的 [Shadow DOM v1](https://caniuse.com/#feat=shadowdomv1) 部分）。
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
