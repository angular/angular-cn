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

      latest and extended support release (ESR)

      最新版以及扩展支持版本（ESR）

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

      11, 10*, 9* ("compatibility view" mode not supported) 

      11, 10*, 9* (不支持“兼容性视图”)

      *deprecated in v10, see the {@link guide/deprecations#ie-9-10-and-mobile deprecations guide}.

      *在 v10 中弃用，参见<a href="/guide/deprecations#ie-9-10-and-mobile">弃用指南</a>。
    </td>

  </tr>
 <tr>
   <tr> 
    <td>

      IE Mobile*
    </td>

    <td>

      11

      <div>*deprecated in v10, see the {@link guide/deprecations#ie-9-10-and-mobile deprecations guide}.</div>

      <div>*已在 v10 中弃用，参见 {@link guide/deprecations#ie-9-10-and-mobile deprecations guide}.</div>

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

     X (10.0), Pie (9.0), Oreo (8.0), Nougat (7.0)
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
You compensate by loading polyfill scripts ("polyfills") for the browsers that you must support.
The [table below](#polyfill-libs) identifies most of the polyfills you might need.

Angular 构建于 Web 平台的最新标准之上。
要支持这么多浏览器是一个不小的挑战，因为它们不支持现代浏览器的所有特性。
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

In Angular CLI version 8 and higher, applications are built using *differential loading*, a strategy where the CLI builds two separate bundles as part of your deployed application.

在 Angular CLI 版本 8 和更高版本中，应用程序是使用*差异化加载*的方式构建的，*差异化加载*是一种策略，CLI 会构建两个单独的捆绑包作为已部署应用程序的一部分。

* The first bundle contains modern ES2015 syntax, takes advantage of built-in support in modern browsers, ships less polyfills, and results in a smaller bundle size.

  第一个捆绑包中包含现代 ES2015 语法，利用了现代浏览器中的内置支持，减少了 polyfill 的发布，并减小了捆绑包的大小。

* The second bundle contains code in the old ES5 syntax, along with all necessary polyfills. This results in a larger bundle size, but supports older browsers.

  第二个捆绑包中包含旧 ES5 语法中的代码以及所有必要的 polyfill。这会导致更大的捆绑包大小，但支持较旧的浏览器。

This strategy allows you to continue to build your web application to support multiple browsers, but only load the necessary code that the browser needs.
For more information about how this works, see [Differential Loading](guide/deployment#differential-loading) in the [Deployment guide](guide/deployment).

通过此策略，你可以继续构建 Web 应用程序以支持多个浏览器，但仅加载当前浏览器所需的必要代码。有关此工作原理的更多信息，请参见《[部署指南》](guide/deployment)中的“[差异化加载](guide/deployment#differential-loading) ”。

## Enabling polyfills with CLI projects

## 在 CLI 项目中启用腻子脚本

The [Angular CLI](cli) provides support for polyfills.
If you are not using the CLI to create your projects, see [Polyfill instructions for non-CLI users](#non-cli).

[Angular CLI](cli) 提供了对腻子脚本的支持。如果未使用 CLI 创建项目，请参阅[针对非 CLI 用户的腻子脚本说明](#non-cli)。

When you create a project with the `ng new` command, a `src/polyfills.ts` configuration file is created as part of your project folder.
This file incorporates the mandatory and many of the optional polyfills as JavaScript `import` statements.

使用 `ng new` 命令创建项目时，会在项目文件夹中创建一个 `src/polyfills.ts` 配置文件。该文件包含许多强制性和可选腻子脚本的 JavaScript `import` 语句。

* The npm packages for the [_mandatory_ polyfills](#polyfill-libs) (such as `zone.js`) are installed automatically for you when you create your project with `ng new`, and their corresponding `import` statements are already enabled in the `src/polyfills.ts` configuration file.

  使用 `ng new` 创建项目时，会自动为你安装[*强制性*](#polyfill-libs) `zone.js` 的 npm 捆绑包（例如 `zone.js` ），并且它对应的 `import` 语句已在 `src/polyfills.ts` 配置文件中启用。

* If you need an _optional_ polyfill, you must install its npm package, then uncomment or create the corresponding import statement in the `src/polyfills.ts` configuration file.

  如果需要*可选的*腻子脚本，则必须安装其 npm 捆绑包，然后取消注释或在 `src/polyfills.ts` 配置文件中创建相应的 import 语句。

For example, if you need the optional [web animations polyfill](http://caniuse.com/#feat=web-animation), you could install it with `npm`, using the following command (or the `yarn` equivalent):

比如，如果需要可选的 [Web 动画腻子脚本](http://caniuse.com/#feat=web-animation)，则可以使用以下命令来通过 `npm`（或等效的 `yarn` ）安装它：

<code-example language="sh" class="code-shell">
  # install the optional web animations polyfill
  npm install --save web-animations-js
</code-example>

You can then add the import statement in the `src/polyfills.ts` file.
For many polyfills, you can simply un-comment the corresponding `import` statement in the file, as in the following example.

然后你还要在 `src/polyfills.ts` 文件中添加导入语句。
对于大多数腻子脚本，你可以直接在此文件中反注释对应的 `import` 语句，如下所示。

<code-example header="src/polyfills.ts">
  /**

  * Required to support Web Animations `@angular/platform-browser/animations`.

  * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
  **/
  import 'web-animations-js';  // Run `npm install --save web-animations-js`.
</code-example>

If the polyfill you want is not already in `polyfills.ts` file, add the `import` statement by hand.

如果 `polyfills.ts` 文件中没有你想要的腻子脚本，请手动添加 `import` 语句。

{@a polyfill-libs}

### Mandatory polyfills

### 强制性腻子脚本

These are the polyfills required to run an Angular application on each supported browser:

下表中的腻子脚本是每个浏览器中运行 Angular 应用时要用到哪些：

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
      Chrome, Firefox, Edge, <br>
      Safari, Android, IE 10+
    </td>

    <td>

      [ES2015](guide/browser-support#core-es6)

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>
      IE9
    </td>

    <td>

      ES2015<br>[classList](guide/browser-support#classlist)

    </td>

  </tr>

</table>

### Optional browser features to polyfill

### 可选浏览器特性的腻子脚本

Some features of Angular may require additional polyfills.

有些 Angular 特性可能需要额外的腻子脚本。

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

      [AnimationBuilder](api/animations/AnimationBuilder).
      (Standard animation support does not require polyfills.)

      [AnimationBuilder](api/animations/AnimationBuilder)。
      （支持标准动画不需要腻子脚本。）

    </td>

    <td>

      [Web Animations](guide/browser-support#web-animations)

      [Web 动画](guide/browser-support#web-animations)

    </td>

    <td>
      <p>If AnimationBuilder is used, enables scrubbing
      support for IE/Edge and Safari.
      (Chrome and Firefox support this natively).</p>

      <p>如果用到了 AnimationBuilder，还要启用 IE/Edge 和 Safari 的 scrubbing（擦除）支持
      （Chrome 和 Firefox 对此提供了原生支持）</p>
    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

       [NgClass](api/common/NgClass) on SVG elements

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

      [Http](guide/http) when sending and receiving binary data

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

  <tr style="vertical-align: top">

    <td>

      [Router](guide/router) when using
      [hash-based routing](guide/router#location-strategy)

      当使用[基于 hash 的路由](guide/router#location-strategy)时。
    </td>

    <td>

      [ES7/array](guide/browser-support#core-es7-array)

    </td>

    <td>
      IE 11
    </td>

  </tr>

</table>

### Suggested polyfills

### 建议的腻子脚本

The following polyfills are used to test the framework itself. They are a good starting point for an application.

下列腻子脚本是用来测试框架本身的。它们是应用程序的优质起点。

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

      <a id='core-es7-array' href="https://github.com/zloirock/core-js/tree/v2/fn/array">ES7/array</a>

    </td>

    <td>
      MIT
    </td>

    <td>
      0.1KB
    </td>

  </tr>

  <tr>

    <td>

      <a id='core-es6' href="https://github.com/zloirock/core-js">ES2015</a>

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

If you are not using the CLI, add your polyfill scripts directly to the host web page (`index.html`).

如果你不使用 CLI，就要直接把腻子脚本添加到宿主页（`index.html`）中，就像这样：

For example:

比如：

<code-example header="src/index.html" language="html">
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
    // __zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames

    /*

     * in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js

     * with the following flag, it will bypass `zone.js` patch for IE/Edge
     */
    // __Zone_enable_cross_context_check = true;
  &lt;/script>
  &lt;!-- zone.js required by Angular -->
  &lt;script src="node_modules/zone.js/bundles/zone.umd.js">&lt;/script>

  &lt;!-- application polyfills -->
</code-example>
