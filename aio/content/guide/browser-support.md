# Browser support

# 浏览器支持

Angular supports most recent browsers. This includes the following specific versions:

Angular 支持大多数常用浏览器，包括下列版本：

<table>

  <tr>

<th>

      Browser

      浏览器

</th>

<th>

      Supported versions

      支持的版本

</th>

  </tr>

  <tr>

    <td>

      Chrome

    </td>

    <td>

      latest

      最新版

    </td>

  </tr>

  <tr>

    <td>

      Firefox

    </td>

    <td>

      latest

      最新版

    </td>

  </tr>

  <tr>

    <td>

      Edge

    </td>

    <td>

      2 most recent major versions

      最近的两个主版本

    </td>

  </tr>
  <tr> 

    <td>

      IE

    </td>

    <td>

      11<br>10<br>9

    </td>

  </tr>
 <tr>
   <tr> 

    <td>

      IE Mobile

    </td>

    <td>

      11

    </td>

  </tr>
 <tr>

    <td>

      Safari

    </td>

    <td>

      2 most recent major versions

      最近的两个主版本

    </td>

  </tr>
  <tr>

    <td>

      iOS

    </td>

    <td>

      2 most recent major versions

      最近的两个主版本

    </td>

  </tr> 
  <tr>

    <td>

      Android

    </td>

    <td>

      Nougat (7.0)<br>Marshmallow (6.0)<br>Lollipop (5.0, 5.1)<br>KitKat (4.4)

    </td>

  </tr> 

</table>

<div class="alert is-helpful">

Angular's continuous integration process runs unit tests of the framework on all of these browsers for every pull request,
using <a href="https://saucelabs.com/">SauceLabs</a> and
<a href="https://www.browserstack.com">Browserstack</a>.

Angular 在持续集成过程中，对每一个提交都会使用 <a href="https://saucelabs.com/" target="_blank">SauceLabs</a> 和
<a href="https://www.browserstack.com" target="_blank">Browserstack</a> 在上述所有浏览器上执行单元测试。

</div>

## Polyfills

## 腻子脚本 (polyfill)

Angular is built on the latest standards of the web platform.
Targeting such a wide range of browsers is challenging because they do not support all features of modern browsers.

Angular 构建于 Web 平台的最新标准之上。
要支持这么多浏览器是一个不小的挑战，因为它们不支持现代浏览器的所有特性。

You compensate by loading polyfill scripts ("polyfills") for the browsers that you must support.
The [table below](#polyfill-libs) identifies most of the polyfills you might need.

你可以通过加载腻子脚本("polyfills")来为想要支持的浏览器弥补这些特性。
[下表](#polyfill-libs) 列出了可能用到的大多数腻子脚本。

<div class="alert is-important">

The suggested polyfills are the ones that run full Angular applications.
You may need additional polyfills to support features not covered by this list.
Note that polyfills cannot magically transform an old, slow browser into a modern, fast one.

这些建议的腻子脚本是运行完整 Angular 应用所需的。
你可能还会需要另一些的腻子脚本来支持没有出现在此列表中的哪些特性。
注意，这些腻子脚本并没有神奇的魔力来把老旧、慢速的浏览器变成现代、快速的浏览器，它只是填充了 API。

</div>

## Enabling polyfills

## 启用腻子脚本

[Angular CLI](https://github.com/angular/angular-cli/wiki) users enable polyfills through the `src/polyfills.ts` file that
the CLI created with your project.

[Angular CLI](https://github.com/angular/angular-cli/wiki) 的用户可以通过自动创建的 `src/polyfills.ts` 文件来启用这些腻子脚本。

This file incorporates the mandatory and many of the optional polyfills as JavaScript `import` statements.

这个文件把强制的和很多可选的腻子脚本组织成 JavaScript 的 `import` 语句。

The npm packages for the _mandatory_ polyfills (such as `zone.js`) were installed automatically for you when you created your project and their corresponding `import` statements are ready to go. You probably won't touch these.

**强制性** 腻子脚本（如 `zone.js`）的 npm 包在创建项目时就已经自动安装了，相应的 `import` 语句也都加好了。你一般不用动它们。

But if you need an optional polyfill, you'll have to install its npm package.
For example, [if you need the web animations polyfill](http://caniuse.com/#feat=web-animation), you could install it with `npm`, using the following command (or the `yarn` equivalent):

但是如果要用一个可选的腻子脚本，就要通过 `npm` 或 `yarn` 来安装它们的 npm 包了。
比如，[如果你需要 web 动画的腻子脚本](http://caniuse.com/#feat=web-animation)，就要通过下列命令之一来安装它：

<code-example language="sh" class="code-shell">

  # note that the web-animations-js polyfill is only here as an example

  # it isn't a strict requirement of Angular anymore (more below)

  npm install --save web-animations-js
</code-example>

Then open the `polyfills.ts` file and un-comment the corresponding `import` statement as in the following example:

然后打开 `polyfills.ts` 文件，并反注释对应的 `import` 语句，就像这样：

<code-example title="src/polyfills.ts">
  /**

  * Required to support Web Animations `@angular/platform-browser/animations`.

  * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
  **/
  import 'web-animations-js';  // Run `npm install --save web-animations-js`.
</code-example>

If you can't find the polyfill you want in `polyfills.ts`,
add it yourself, following the same pattern:

如果在 `polyfills.ts` 中找不到要使用的腻子脚本，就可以仿照下列模式自行添加它：

1. install the npm package

   安装 npm 包

1. `import` the file in `polyfills.ts`

   在 `polyfills.ts` 中 `import` 这个文件

<div class="alert is-helpful">

Non-CLI users should follow the instructions [below](#non-cli).

不使用 CLI 的用户可以遵循[下列](#non-cli)步骤自行操作。

</div>

{@a polyfill-libs}

### Mandatory polyfills

### 强制性腻子脚本

These are the polyfills required to run an Angular application on each supported browser:

下表中的腻子脚本是每个浏览器都要用到的：

<table>

  <tr style="vertical-align: top">

    <th>

      Browsers (Desktop & Mobile)

      浏览器（桌面和移动）

    </th>

    <th>

      Polyfills Required

      需要的腻子脚本

    </th>

  </tr>

  <tr style="vertical-align: top">

    <td>

      Chrome, Firefox, Edge, Safari 9+

    </td>

    <td>

      [ES7/reflect](guide/browser-support#core-es7-reflect) (JIT only)

      [ES7/reflect](guide/browser-support#core-es7-reflect) (仅 JIT)

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

      Safari 7 & 8, IE10 & 11, Android 4.1+

    </td>

    <td>

      [ES6](guide/browser-support#core-es6)

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

      IE9

    </td>

    <td>

      [ES6<br>classList](guide/browser-support#classlist)

    </td>

  </tr>

</table>

### Optional browser features to polyfill

### 可选浏览器特性的腻子脚本

Some features of Angular may require additional polyfills.

有些 Angular 特性可能需要额外的腻子脚本。

For example, the animations library relies on the standard web animation API, which is only available in Chrome and Firefox today.
(note that the dependency of web-animations-js in Angular is only necessary if `AnimationBuilder` is used.)

例如，动画库依赖于标准的 web 动画 API，目前它只在 Chrome 和 Firefox 上可用。你可能需要一个腻子脚本来在其它浏览器上使用动画功能。

Here are the features which may require additional polyfills:

下列特性可能需要更多腻子脚本：

<table>

  <tr style="vertical-align: top">

    <th>

      Feature

      特性

    </th>

    <th>

      Polyfill

      腻子脚本

    </th>

    <th style="width: 50%">

       Browsers (Desktop & Mobile)

       浏览器（桌面和移动）

    </th>

  </tr>

  <tr style="vertical-align: top">

    <td>

      [JIT compilation](guide/aot-compiler).

      [JIT 编译](guide/aot-compiler)。

      Required to reflect for metadata.

      需要 reflect 来提供元数据。

    </td>

    <td>

      [ES7/reflect](guide/browser-support#core-es7-reflect)

    </td>

    <td>

      All current browsers. Enabled by default.
      Can remove if you always use AOT and only use Angular decorators.

      默认对目前的所有浏览器都启用了。如果总是使用 AOT 模式，并且只使用 Angular 自带的装饰器，那么可以移除它。

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

      [Animations](guide/animations)
      <br>Only if `Animation Builder` is used within the application--standard
      animation support in Angular doesn't require any polyfills (as of NG6).

      [动画](guide/animations)
      <br>只有在应用中用到了 `Animation Builder` 时才需要；Angular 标准的动画支持是不需要任何腻子脚本的（截至 NG6）。

    </td>

    <td>

      [Web Animations](guide/browser-support#web-animations)

      [Web 动画](guide/browser-support#web-animations)

    </td>

    <td>

      <p>If AnimationBuilder is used then the polyfill will enable scrubbing
      support for IE/Edge and Safari (Chrome and Firefox support this natively).</p>

      <p>如果使用了 AnimationBuilder，那么腻子脚本将为 IE/Edge 和 Safari 启用擦除（scrubbing）支持（Chrome 和 Firefox 原生支持此特性）</p>

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

    If you use the following deprecated i18n pipes:

    如果你使用下列已废弃的 i18n 管道：

     [date](api/common/DeprecatedDatePipe), 

     [currency](api/common/DeprecatedCurrencyPipe),

     [decimal](api/common/DeprecatedDecimalPipe), 

     [percent](api/common/DeprecatedPercentPipe)

    </td>

    <td>

      [Intl API](guide/browser-support#intl)

    </td>

    <td>

      All but Chrome, Firefox, Edge, IE11 and Safari 10

      除了 Chrome、Firefox、Edge、IE11 和 Safari 10 外的所有浏览器

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

       [NgClass](api/common/NgClass) 

       on SVG elements

       在 SVG 元素上应用时

    </td>

    <td>

      [classList](guide/browser-support#classlist)

    </td>

    <td>

      IE10, IE11

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

      [Http](guide/http) 

      when sending and receiving binary data

      用 [Http](guide/http) 发送和接收二进制数据时

    </td>

    <td>

      [Typed&nbsp;Array](guide/browser-support#typedarray)<br>

      [Blob](guide/browser-support#blob)<br>

      [FormData](guide/browser-support#formdata)

    </td>

    <td>

      IE 9

    </td>

  </tr>

</table>

### Suggested polyfills ##

### 建议的腻子脚本 ##

Below are the polyfills which are used to test the framework itself. They are a good starting point for an application.

下表中是用来测试框架本身的腻子脚本，它们是应用程序的优质起点。

<table>

  <tr>

    <th>

      Polyfill

      腻子脚本

    </th>

    <th>

      License

      授权方式

    </th>

    <th>

      Size*

      大小*

    </th>

  </tr>

  <tr>

    <td>

      <a id='core-es7-reflect' href="https://github.com/zloirock/core-js/blob/master/es7/reflect.js">ES7/reflect</a>

    </td>

    <td>

      MIT

    </td>

    <td>

      0.5KB

    </td>

  </tr>

  <tr>

    <td>

      <a id='core-es6' href="https://github.com/zloirock/core-js">ES6</a>

    </td>

    <td>

      MIT

    </td>

    <td>

      27.4KB

    </td>

  </tr>

  <tr>

    <td>

      <a id='classlist' href="https://github.com/eligrey/classList.js">classList</a>

    </td>

    <td>

      Public domain

      公共域

    </td>

    <td>

      1KB

    </td>

  </tr>

  <tr>

    <td>

      <a id='intl' href="https://github.com/andyearnshaw/Intl.js">Intl</a>

    </td>

    <td>

      MIT / Unicode license

    </td>

    <td>

      13.5KB

    </td>

  </tr>

  <tr>

    <td>

       <a id='web-animations' href="https://github.com/web-animations/web-animations-js">Web Animations</a>

    </td>

    <td>

      Apache

    </td>

    <td>

      14.8KB

    </td>

  </tr>

  <tr>

    <td>

      <a id='typedarray' href="https://github.com/inexorabletash/polyfill/blob/master/typedarray.js">Typed Array</a>

    </td>

    <td>

      MIT

    </td>

    <td>

      4KB

    </td>

  </tr>

  <tr>

    <td>

       <a id='blob' href="https://github.com/eligrey/Blob.js">Blob</a>

    </td>

    <td>

      MIT

    </td>

    <td>

      1.3KB

    </td>

  </tr>

  <tr>

    <td>

       <a id='formdata' href="https://github.com/francois2metz/html5-formdata">FormData</a>

    </td>

    <td>

      MIT

    </td>

    <td>

      0.4KB

    </td>

  </tr>

</table>

\* Figures are for minified and gzipped code,
computed with the <a href="http://closure-compiler.appspot.com/home">closure compiler</a>.

\* 这里的数据都按最小化并且 gzip 压缩后的版本算，是由<a href="http://closure-compiler.appspot.com/home">closure compiler</a>计算出的。

{@a non-cli}

## Polyfills for non-CLI users

## 非 CLI 的用户的腻子脚本

If you are not using the CLI, you should add your polyfill scripts directly to the host web page (`index.html`), perhaps like this.

如果你不使用 CLI，就要直接把腻子脚本添加到宿主页（`index.html`）中，就像这样：

<code-example title="src/index.html">
  &lt;!-- pre-zone polyfills -->
  &lt;script src="node_modules/core-js/client/shim.min.js">&lt;/script>
  &lt;script src="node_modules/web-animations-js/web-animations.min.js">&lt;/script>
  &lt;script>
    /**

     * you can configure some zone flags which can disable zone interception for some

     * asynchronous activities to improve startup performance - use these options only

     * if you know what you are doing as it could result in hard to trace down bugs..
     */
    // __Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
    // __Zone_disable_on_property = true; // disable patch onProperty such as onclick
    // __zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames

    /*

     * in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js

     * with the following flag, it will bypass `zone.js` patch for IE/Edge
     */
    // __Zone_enable_cross_context_check = true;
  &lt;/script>
  &lt;!-- zone.js required by Angular -->
  &lt;script src="node_modules/zone.js/dist/zone.js">&lt;/script>

  &lt;!-- application polyfills -->
</code-example>
