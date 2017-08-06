# Browser support

# 浏览器支持

Angular supports most recent browsers. This includes the following specific versions:

Angular 支持大多数常用浏览器，包括下列版本：


<table>

  <tr>

    <th>
      Chrome
    </th>

    <th>
      Firefox
    </th>

    <th>
      Edge
    </th>

    <th>
      IE
    </th>

    <th>
      Safari
    </th>

    <th>
      iOS
    </th>

    <th>
      Android
    </th>

    <th>
      IE Mobile
    </th>

  </tr>

  <tr>

    <td>

      <p>
        latest
      </p>

      <p>
        最新版
      </p>

    </td>

    <td>

      <p>
        latest
      </p>

      <p>
        最新版
      </p>

    </td>

    <td>
      14
    </td>

    <td>
      11
    </td>

    <td>
      10
    </td>

    <td>
      10
    </td>

    <td>
      Nougat (7.0)<br>Marshmallow (6.0)
    </td>

    <td>
      11
    </td>

  </tr>

  <tr>

    <td>

    </td>

    <td>

    </td>

    <td>
      13
    </td>

    <td>
      10
    </td>

    <td>
      9
    </td>

    <td>
      9
    </td>

    <td>
      Lollipop<br>(5.0, 5.1)
    </td>

    <td>

    </td>

  </tr>

  <tr>

    <td>

    </td>

    <td>

    </td>

    <td>

    </td>

    <td>
      9
    </td>

    <td>
      8
    </td>

    <td>
      8
    </td>

    <td>
      KitKat<br>(4.4)
    </td>

    <td>

    </td>

  </tr>

  <tr>

    <td>

    </td>

    <td>

    </td>

    <td>

    </td>

    <td>

    </td>

    <td>
      7
    </td>

    <td>
      7
    </td>

    <td>
      Jelly Bean<br>(4.1, 4.2, 4.3)
    </td>

    <td>

    </td>

  </tr>

</table>



<div class="l-sub-section">



Angular's continuous integration process runs unit tests of the framework on all of these browsers for every pull request,
using <a href="https://saucelabs.com/">SauceLabs</a> and
<a href="https://www.browserstack.com">Browserstack</a>.

Angular 在持续集成过程中，对每一个提交都会使用 <a href="https://saucelabs.com/" target="_blank">SauceLabs</a> 和
<a href="https://www.browserstack.com" target="_blank">Browserstack</a> 在上述所有浏览器上执行单元测试。


</div>



## Polyfills #

## 填充库 (polyfill) #

Angular is built on the latest standards of the web platform.
Targeting such a wide range of browsers is challenging because they do not support all features of modern browsers.

Angular 构建于 Web 平台的最新标准之上。
要支持这么多浏览器是一个不小的挑战，因为它们不支持现代浏览器的所有特性。

You can compensate by loading polyfill scripts ("polyfills") on the host web page (`index.html`)
that implement missing features in JavaScript.

你可以通过在宿主页面 (`index.html`) 中加载填充脚本 (“polyfills”) 来加以弥补，这些脚本实现了浏览器缺失的 JavaScript 特性。


<code-example path="quickstart/src/index.html" region="polyfills" title="quickstart/src/index.html" linenums="false">

</code-example>



A particular browser may require at least one polyfill to run _any_ Angular application.
You may need additional polyfills for specific features.

要运行 Angular 应用，某些浏览器可能需要至少一个填充库。除此之外，如果要支持某些特定的特性，你可能还需要另一些填充库。

The tables below can help you determine which polyfills to load, depending on the browsers you target and the features you use.

下表将帮你决定加载哪些填充库，具体取决于目标浏览器和要用到的特性。


<div class="alert is-important">



The suggested polyfills are the ones that run full Angular applications.
You may need additional polyfills to support features not covered by this list.
Note that polyfills cannot magically transform an old, slow browser into a modern, fast one.

这些建议的填充库是运行完整 Angular 应用所需的。
你可能还会需要另一些的填充库来支持没有出现在此列表中的哪些特性。
注意，这些填充库并没有神奇的魔力来把老旧、慢速的浏览器变成现代、快速的浏览器，它只是填充了 API。


</div>



### Mandatory polyfills ##

### 强制性填充库 ##

These are the polyfills required to run an Angular application on each supported browser:

下表是填充库对每个支持的浏览器都是需要的：


<table>

  <tr style="vertical-align: top">

    <th>

    Browsers (Desktop & Mobile)
    
    浏览器（桌面和移动）
        
    </th>

    <th>

    Polyfills Required
    
    需要的填充库

    </th>

  </tr>

  <tr style="vertical-align: top">

    <td>
      Chrome, Firefox, Edge, Safari 9+
    </td>

    <td>
      None
      
      无
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
      
      [ES6<br>classList](guide/browser-support#classlist) 支持

    </td>

  </tr>

</table>

### Optional browser features to polyfill ##

### 可选浏览器特性的填充库 ##

Some features of Angular may require additional polyfills.

有些 Angular 特性可能需要额外的填充库。

For example, the animations library relies on the standard web animation API, which is only available in Chrome and Firefox today.
You'll need a polyfill to use animations in other browsers.

例如，动画库依赖于标准的 web 动画 API，目前它只在 Chrome 和 Firefox 上可用。你可能需要一个填充库来在其它浏览器上使用动画功能。

Here are the features which may require additional polyfills:

下列特性可能需要更多填充库：


<table>

  <tr style="vertical-align: top">

    <th>
      Feature
      
      特性
      
    </th>

    <th>
      Polyfill
      
      填充库

    </th>

    <th style="width: 50%">
      Browsers (Desktop & Mobile)
      
      浏览器（桌面和移动）
      
    </th>

  </tr>

  <tr style="vertical-align: top">

    <td>
      [Animations](guide/animations)
      
      [动画](guide/animations)
      
    </td>

    <td>


      [Web Animations](guide/browser-support#web-animations)

      [Web 动画](guide/browser-support#web-animations)
    </td>

    <td>

      All but Chrome and Firefox<br>Not supported in IE9
      
      除 Chrome 和 Firefox 外的所有，但不支持 IE9

    </td>

  </tr>

  <tr style="vertical-align: top">

    <td>

    [Date](api/common/DatePipe), [currency](api/common/CurrencyPipe), [decimal](api/common/DecimalPipe) and [percent](api/common/PercentPipe) pipes
    
    [Date](api/common/DatePipe)、[currency](api/common/CurrencyPipe)、[decimal](api/common/DecimalPipe) 和 [percent](api/common/PercentPipe) 管道
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

       [NgClass](api/common/NgClass) on SVG elements
       
       在 SVG 元素上应用 [NgClass](api/common/NgClass)
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
      
      用 [Http](guide/http) 发送和接收二进制数据
      
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
### 建议的填充库 ##
Below are the polyfills which are used to test the framework itself. They are a good starting point for an application.

下表中是用来测试框架本身的填充库，它们是应用程序的优质起点。


<table>

  <tr>

    <th>
        Polyfill
        
        填充库
    </th>

    <th>

        Licence

        授权方式

    </th>

    <th>

        Size*

        大小*

    </th>

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

        公共领域

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

// TODO: Bugfix

\* Figures are for minified and gzipped code, 
computed with the <a href="http://closure-compiler.appspot.com/home" >closure compiler</a>.

\* 这些指标测量的是最小化 (minify) 并且 gzip 过的代码，使用 <a href="http://closure-compiler.appspot.com/home" target="_blank">closure compiler</a>
计算出的结果。