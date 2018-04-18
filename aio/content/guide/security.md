# Security

# 安全

This page describes Angular's built-in
protections against common web-application vulnerabilities and attacks such as cross-site
scripting attacks. It doesn't cover application-level security, such as authentication (_Who is
this user?_) and authorization (_What can this user do?_).

Web 应用程序的安全涉及到很多方面。针对常见的漏洞和攻击，比如跨站脚本攻击，Angular 提供了一些内置的保护措施。本章将讨论这些内置保护措施，但不会涉及应用级安全，比如用户认证（*这个用户是谁？*）和授权(*这个用户能做什么？*)。

For more information about the attacks and mitigations described below, see [OWASP Guide Project](https://www.owasp.org/index.php/Category:OWASP_Guide_Project).

要了解更多攻防信息，参见[开放式 Web 应用程序安全项目(OWASP)](https://www.owasp.org/index.php/Category:OWASP_Guide_Project)。

You can run the <live-example></live-example> in Stackblitz and download the code from there.

你可以运行<live-example></live-example>，在 Stackblitz 中试用并下载本页的代码。

<h2 id='report-issues'>Reporting vulnerabilities</h2>

<h2 id='report-issues'>举报漏洞</h2>

To report vulnerabilities in Angular itself, email us at [security@angular.io](mailto:security@angular.io).

给我们（[security@angular.io](mailto:security@angular.io)）发邮件，报告 Angular 本身的漏洞。

For more information about how Google handles security issues, see [Google's security
philosophy](https://www.google.com/about/appsecurity/).

要了解关于“谷歌如何处理安全问题”的更多信息，参见[谷歌的安全哲学](https://www.google.com/about/appsecurity/)。

<h2 id='best-practices'>Best practices</h2>

<h2 id='best-practices'>最佳实践</h2>

* **Keep current with the latest Angular library releases.**
We regularly update the Angular libraries, and these updates may fix security defects discovered in
previous versions. Check the Angular [change
log](https://github.com/angular/angular/blob/master/CHANGELOG.md) for security-related updates.

   **及时把 Angular 包更新到最新版本。**
我们会频繁的更新 Angular 库，这些更新可能会修复之前版本中发现的安全漏洞。查看 Angular 的[更新记录](https://github.com/angular/angular/blob/master/CHANGELOG.md)，了解与安全有关的更新。

* **Don't modify your copy of Angular.**
Private, customized versions of Angular tend to fall behind the current version and may not include
important security fixes and enhancements. Instead, share your Angular improvements with the
community and make a pull request.

   **不要修改你的 Angular 副本。**
私有的、定制版的 Angular 往往跟不上最新版本，这可能导致你忽略重要的安全修复与增强。反之，应该在社区共享你对 Angular 所做的改进并创建 Pull Request。

* **Avoid Angular APIs marked in the documentation as “_Security Risk_.”**
For more information, see the [Trusting safe values](guide/security#bypass-security-apis) section of this page.

   **避免使用本文档中带“[*安全风险*](guide/security#bypass-security-apis)”标记的 Angular API。** 
  要了解更多信息，请参阅本章的[信任那些安全的值](guide/security#bypass-security-apis)部分。

<h2 id='xss'>Preventing cross-site scripting (XSS)</h2>

<h2 id='xss'>防范跨站脚本(XSS)攻击</h2>

[Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) enables attackers
to inject malicious code into web pages. Such code can then, for example, steal user data (in
particular, login data) or perform actions to impersonate the user. This is one of the most
common attacks on the web.

[跨站脚本(XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting)允许攻击者将恶意代码注入到页面中。这些代码可以偷取用户数据
（特别是它们的登录数据），还可以冒充用户执行操作。它是 Web 上最常见的攻击方式之一。

To block XSS attacks, you must prevent malicious code from entering the DOM (Document Object Model). For example, if
attackers can trick you into inserting a `<script>` tag in the DOM, they can run arbitrary code on
your website. The attack isn't limited to `<script>` tags&mdash;many elements and properties in the
DOM allow code execution, for example, `<img onerror="...">` and `<a href="javascript:...">`. If
attacker-controlled data enters the DOM, expect security vulnerabilities.

为了防范 XSS 攻击，你必须阻止恶意代码进入 DOM。比如，如果某个攻击者能骗你把 `<script>` 标签插入到 DOM，就可以在你的网站上运行任何代码。
除了 `<script>`，攻击者还可以使用很多 DOM 元素和属性来执行代码，比如 `<img onerror="...">`、`<a href="javascript:...">`。
如果攻击者所控制的数据混进了 DOM，就会导致安全漏洞。

### Angular’s cross-site scripting security model

### Angular 的“跨站脚本安全模型”

To systematically block XSS bugs, Angular treats all values as untrusted by default. When a value
is inserted into the DOM from a template, via property, attribute, style, class binding, or interpolation,
Angular sanitizes and escapes untrusted values.

为了系统性的防范 XSS 问题，Angular 默认把所有值都当做不可信任的。
当值从模板中以属性（Property）、DOM 元素属性（Attribte)、CSS 类绑定或插值表达式等途径插入到 DOM 中的时候，
Angular 将对这些值进行无害化处理（Sanitize），对不可信的值进行编码。

_Angular templates are the same as executable code_: HTML, attributes, and binding expressions
(but not the values bound) in templates are trusted to be safe. This means that applications must
prevent values that an attacker can control from ever making it into the source code of a
template. Never generate template source code by concatenating user input and templates.
To prevent these vulnerabilities, use
the [offline template compiler](guide/security#offline-template-compiler), also known as _template injection_.

**Angular 的模板同样是可执行的**：模板中的 HTML、Attribute 和绑定表达式（还没有绑定到值的时候）会被当做可信任的。
这意味着应用必须防止把可能被攻击者控制的值直接编入模板的源码中。永远不要根据用户的输入和原始模板动态生成模板源码！
使用[离线模板编译器](guide/security#offline-template-compiler)是防范这类“模板注入”漏洞的有效途径。

### Sanitization and security contexts

### 无害化处理与安全环境

_Sanitization_ is the inspection of an untrusted value, turning it into a value that's safe to insert into
the DOM. In many cases, sanitization doesn't change a value at all. Sanitization depends on context:
a value that's harmless in CSS is potentially dangerous in a URL.

无害化处理会审查不可信的值，并将它们转换成可以安全插入到 DOM 的形式。多数情况下，这些值并不会在处理过程中发生任何变化。
无害化处理的方式取决于所在的环境：一个在 CSS 里面无害的值，可能在 URL 里很危险。

Angular defines the following security contexts:

Angular 定义了四个安全环境 - HTML，样式，URL，和资源 URL：

* **HTML** is used when interpreting a value as HTML, for example, when binding to `innerHtml`.

   **HTML**：值需要被解释为 HTML 时使用，比如当绑定到 `innerHTML` 时。

* **Style** is used when binding CSS into the `style` property.

   **样式**：值需要作为 CSS 绑定到 `style` 属性时使用。

* **URL** is used for URL properties, such as `<a href>`.

   **URL**：值需要被用作 URL 属性时使用，比如 `<a href>`。

* **Resource URL** is a URL that will be loaded and executed as code, for example, in `<script src>`.

   **资源 URL**：值需要被当做代码而加载并执行时使用，比如 `<script src>` 中的 URL。

Angular sanitizes untrusted values for HTML, styles, and URLs; sanitizing resource URLs isn't
possible because they contain arbitrary code. In development mode, Angular prints a console warning
when it has to change a value during sanitization.

Angular 会对前三项中种不可信的值进行无害化处理。但 Angular 无法对第四种资源 URL 进行无害化，因为它们可能包含任何代码。在开发模式下，
如果 Angular 在进行无害化处理时需要被迫改变一个值，它就会在控制台上输出一个警告。

### Sanitization example

### 无害化示例

The following template binds the value of `htmlSnippet`, once by interpolating it into an element's
content, and once by binding it to the `innerHTML` property of an element:

下面的例子绑定了 `htmlSnippet` 的值，一次把它放进插值表达式里，另一次把它绑定到元素的 `innerHTML` 属性上。

<code-example path="security/src/app/inner-html-binding.component.html" title="src/app/inner-html-binding.component.html">

</code-example>

Interpolated content is always escaped&mdash;the HTML isn't interpreted and the browser displays
angle brackets in the element's text content.

插值表达式的内容总会被编码 - 其中的 HTML 不会被解释，所以浏览器会在元素的文本内容中显示尖括号。

For the HTML to be interpreted, bind it to an HTML property such as `innerHTML`. But binding
a value that an attacker might control into `innerHTML` normally causes an XSS
vulnerability. For example, code contained in a `<script>` tag is executed:

如果希望这段 HTML 被正常解释，就必须绑定到一个 HTML 属性上，比如 `innerHTML`。但是如果把一个可能被攻击者控制的值绑定到 `innerHTML` 就会导致 XSS 漏洞。
比如，包含在 `<script>` 标签的代码就会被执行：

<code-example path="security/src/app/inner-html-binding.component.ts" linenums="false" title="src/app/inner-html-binding.component.ts (class)" region="class">

</code-example>

Angular recognizes the value as unsafe and automatically sanitizes it, which removes the `<script>`
tag but keeps safe content such as the text content of the `<script>` tag and the `<b>` element.

Angular 认为这些值是不安全的，并自动进行无害化处理。它会移除 `<script>` 标签，但保留安全的内容，比如该片段中的文本内容或 `<b>` 元素。

<figure>
  <img src='generated/images/guide/security/binding-inner-html.png' alt='A screenshot showing interpolated and bound HTML values'>
</figure>

### Avoid direct use of the DOM APIs

### 避免直接使用 DOM API

The built-in browser DOM APIs don't automatically protect you from security vulnerabilities.
For example, `document`, the node available through `ElementRef`, and many third-party APIs
contain unsafe methods. Avoid directly interacting with the DOM and instead use Angular
templates where possible.

浏览器内置的 DOM API 不会自动针对安全漏洞进行防护。比如，`document`（它可以通过 `ElementRef` 访问）以及其它第三方 API 都可能包含不安全的方法。
要避免直接与 DOM 交互，只要可能，就尽量使用 Angular 模板。

### Content security policy

### 内容安全策略

Content Security Policy (CSP) is a defense-in-depth
technique to prevent XSS. To enable CSP, configure your web server to return an appropriate
`Content-Security-Policy` HTTP header. Read more about content security policy at
[An Introduction to Content Security Policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
on the HTML5Rocks website.

[内容安全策略(CSP)](https://developer.mozilla.org/en-)是用来防范 XSS 的纵深防御技术。
要打开 CSP，请配置你的 Web 服务器，让它返回合适的 HTTP 头 `Content_Security_Policy`。
要了解关于内容安全策略的更多信息，请参阅 HTML5Rocks 上的[内容安全策略简介](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)

{@a offline-template-compiler}

### Use the offline template compiler

### 使用离线模板编译器

The offline template compiler prevents a whole class of vulnerabilities called template injection,
and greatly improves application performance. Use the offline template compiler in production
deployments; don't dynamically generate templates. Angular trusts template code, so generating
templates, in particular templates containing user data, circumvents Angular's built-in protections.
For information about dynamically constructing forms in a safe way, see the
[Dynamic Forms](guide/dynamic-form) guide page.

离线模板编译器阻止了一整套被称为“模板注入”的漏洞，并能显著增强应用程序的性能。尽量在产品发布时使用离线模板编译器，
而不要动态生成模板（比如在代码中拼接字符串生成模板）。由于 Angular 会信任模板本身的代码，所以，动态生成的模板 —— 特别是包含用户数据的模板 —— 会绕过 Angular 自带的保护机制。
要了解如何用安全的方式动态创建表单，请参见[动态表单](guide/dynamic-form)一章。

### Server-side XSS protection

### 服务器端 XSS 保护

HTML constructed on the server is vulnerable to injection attacks. Injecting template code into an
Angular application is the same as injecting executable code into the
application: it gives the attacker full control over the application. To prevent this,
use a templating language that automatically escapes values to prevent XSS vulnerabilities on
the server. Don't generate Angular templates on the server side using a templating language; doing this
carries a high risk of introducing template-injection vulnerabilities.

服务器端构造的 HTML 很容易受到注入攻击。当需要在服务器端生成 HTML 时（比如 Angular 应用的初始页面），
  务必使用一个能够自动进行无害化处理以防范 XSS 漏洞的后端模板语言。不要在服务器端使用模板语言生成 Angular 模板，
  这样会带来很高的“模板注入”风险。

<h2 id='bypass-security-apis'>Trusting safe values</h2>

<h2 id='bypass-security-apis'>信任安全值</h2>

Sometimes applications genuinely need to include executable code, display an `<iframe>` from some
URL, or construct potentially dangerous URLs. To prevent automatic sanitization in any of these
situations, you can tell Angular that you inspected a value, checked how it was generated, and made
sure it will always be secure. But *be careful*. If you trust a value that might be malicious, you
are introducing a security vulnerability into your application. If in doubt, find a professional
security reviewer.

有时候，应用程序确实需要包含可执行的代码，比如使用 URL 显示 `<iframe>`，或者构造出有潜在危险的 URL。
    为了防止在这种情况下被自动无害化，你可以告诉 Angular：我已经审查了这个值，检查了它是怎么生成的，并确信它总是安全的。
    但是**千万要小心**！如果你信任了一个可能是恶意的值，就会在应用中引入一个安全漏洞。如果你有疑问，请找一个安全专家复查下。

To mark a value as trusted, inject `DomSanitizer` and call one of the
following methods:

注入 `DomSanitizer` 服务，然后调用下面的方法之一，你就可以把一个值标记为可信任的。

* `bypassSecurityTrustHtml`

* `bypassSecurityTrustScript`

* `bypassSecurityTrustStyle`

* `bypassSecurityTrustUrl`

* `bypassSecurityTrustResourceUrl`

Remember, whether a value is safe depends on context, so choose the right context for
your intended use of the value. Imagine that the following template needs to bind a URL to a
`javascript:alert(...)` call:

记住，一个值是否安全取决于它所在的环境，所以你要为这个值按预定的用法选择正确的环境。假设下面的模板需要把 `javascript.alert(...)` 方法绑定到 URL。

<code-example path="security/src/app/bypass-security.component.html" linenums="false" title="src/app/bypass-security.component.html (URL)" region="URL">

</code-example>

Normally, Angular automatically sanitizes the URL, disables the dangerous code, and
in development mode, logs this action to the console. To prevent
this, mark the URL value as a trusted URL using the `bypassSecurityTrustUrl` call:

通常，Angular 会自动无害化这个 URL 并禁止危险的代码。为了防止这种行为，可以调用 `bypassSecurityTrustUrl` 把这个 URL 值标记为一个可信任的 URL：

<code-example path="security/src/app/bypass-security.component.ts" linenums="false" title="src/app/bypass-security.component.ts (trust-url)" region="trust-url">

</code-example>

<figure>
  <img src='generated/images/guide/security/bypass-security-component.png' alt='A screenshot showing an alert box created from a trusted URL'>
</figure>

If you need to convert user input into a trusted value, use a
controller method. The following template allows users to enter a YouTube video ID and load the
corresponding video in an `<iframe>`. The `<iframe src>` attribute is a resource URL security
context, because an untrusted source can, for example, smuggle in file downloads that unsuspecting users
could execute. So call a method on the controller to construct a trusted video URL, which causes
Angular to allow binding into `<iframe src>`:

如果需要把用户输入转换为一个可信任的值，可以在控制器方法中处理。下面的模板允许用户输入一个 YouTube 视频的 ID，
  然后把相应的视频加载到 `<iframe>` 中。`<iframe src>` 是一个“资源 URL”的安全环境，因为不可信的源码可能作为文件下载到本地，被毫无防备的用户执行。
  所以要调用一个控制器方法来构造一个新的、可信任的视频 URL，然后把它绑定到 `<iframe src>`。

<code-example path="security/src/app/bypass-security.component.html" linenums="false" title="src/app/bypass-security.component.html (iframe)" region="iframe">

</code-example>

<code-example path="security/src/app/bypass-security.component.ts" linenums="false" title="src/app/bypass-security.component.ts (trust-video-url)" region="trust-video-url">

</code-example>

<h2 id='http'>HTTP-level vulnerabilities</h2>

<h2 id='http'>HTTP 级别的漏洞</h2>

Angular has built-in support to help prevent two common HTTP vulnerabilities, cross-site request
forgery (CSRF or XSRF) and cross-site script inclusion (XSSI). Both of these must be mitigated primarily
on the server side, but Angular provides helpers to make integration on the client side easier.

Angular 内置了一些支持来防范两个常见的 HTTP 漏洞：跨站请求伪造（XSRF）和跨站脚本包含（XSSI）。
  这两个漏洞主要在服务器端防范，但是 Angular 也自带了一些辅助特性，可以让客户端的集成变得更容易。

<h3 id='xsrf'>Cross-site request forgery</h3>

<h3 id='xsrf'>跨站请求伪造（XSRF）</h3>

In a cross-site request forgery (CSRF or XSRF), an attacker tricks the user into visiting
a different web page (such as `evil.com`) with malignant code that secretly sends a malicious request
to the application's web server (such as `example-bank.com`).

在跨站请求伪造（XSRF 或 CSFR）中，攻击者欺骗用户，让他们访问一个假冒页面(例如 `evil.com`)，
该页面带有恶意代码，秘密的向你的应用程序服务器发送恶意请求(例如 `example-bank.com`)。

Assume the user is logged into the application at `example-bank.com`.
The user opens an email and clicks a link to `evil.com`, which opens in a new tab.

假设用户已经在 `example-bank.com` 登录。用户打开一个邮件，点击里面的链接，在新页面中打开 `evil.com`。

The `evil.com` page immediately sends a malicious request to `example-bank.com`.
Perhaps it's a request to transfer money from the user's account to the attacker's account.
The browser automatically sends the `example-bank.com` cookies (including the authentication cookie) with this request.

该 `evil.com` 页面立刻发送恶意请求到 `example-bank.com`。这个请求可能是从用户账户转账到攻击者的账户。
与该请求一起，浏览器自动发出 `example-bank.com` 的 cookie。

If the `example-bank.com` server lacks XSRF protection, it can't tell the difference between a legitimate
request from the application and the forged request from `evil.com`.

如果 `example-bank.com` 服务器缺乏 XSRF 保护，就无法辨识请求是从应用程序发来的合法请求还是从 `evil.com` 来的假请求。

To prevent this, the application must ensure that a user request originates from the real
application, not from a different site.
The server and client must cooperate to thwart this attack.

为了防止这种情况，你必须确保每个用户的请求都是从你自己的应用中发出的，而不是从另一个网站发出的。
  客户端和服务器必须合作来抵挡这种攻击。

In a common anti-XSRF technique, the application server sends a randomly
generated authentication token in a cookie.
The client code reads the cookie and adds a custom request header with the token in all subsequent requests.
The server compares the received cookie value to the request header value and rejects the request if the values are missing or don't match.

常见的反 XSRF 技术是服务器随机生成一个用户认证令牌到 cookie 中。
  客户端代码获取这个 cookie，并用它为接下来所有的请求添加自定义请求页头。
  服务器比较收到的 cookie 值与请求页头的值，如果它们不匹配，便拒绝请求。

This technique is effective because all browsers implement the _same origin policy_. Only code from the website
on which cookies are set can read the cookies from that site and set custom headers on requests to that site.
That means only your application can read this cookie token and set the custom header. The malicious code on `evil.com` can't.

这个技术之所以有效，是因为所有浏览器都实现了*同源策略*。只有设置 cookie 的网站的代码可以访问该站的 cookie，并为该站的请求设置自定义页头。
  这就是说，只有你的应用程序可以获取这个 cookie 令牌和设置自定义页头。`evil.com` 的恶意代码不能。

Angular's `HttpClient` has built-in support for the client-side half of this technique. Read about it more in the [HttpClient guide](/guide/http).

Angular 的 `HttpClient` 对这项技术的客户端部分提供了内置的支持要了解更多信息，参见 [HttpClient 部分](/guide/http)。

For information about CSRF at the Open Web Application Security Project (OWASP), see
<a href="https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29">Cross-Site Request Forgery (CSRF)</a> and
<a href="https://www.owasp.org/index.php/CSRF_Prevention_Cheat_Sheet">Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet</a>.
The Stanford University paper
<a href="https://seclab.stanford.edu/websec/csrf/csrf.pdf">Robust Defenses for Cross-Site Request Forgery</a> is a rich source of detail.

到开放式 Web 应用程序安全项目(OWASP)的[这里](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29)
和[这里](https://www.owasp.org/index.php/CSRF_Prevention_Cheat_Sheet)学习更多关于跨站请求伪造（XSRF）的知识。
这个[斯坦福大学论文](https://seclab.stanford.edu/websec/csrf/csrf.pdf)有详尽的细节。

See also Dave Smith's easy-to-understand
<a href="https://www.youtube.com/watch?v=9inczw6qtpY" title="Cross Site Request Funkery Securing Your Angular Apps From Evil Doers">talk on XSRF at AngularConnect 2016</a>.

参见 Dave Smith 在<a href="https://www.youtube.com/watch?v=9inczw6qtpY" target="_blank" title="Cross Site Request Funkery Securing Your Angular Apps From Evil Doers">AngularConnect 2016 关于 XSRF 的演讲</a>。

<h3 id='xssi'>Cross-site script inclusion (XSSI)</h3>

<h3 id='xssi'>跨站脚本包含(XSSI)</h3>

Cross-site script inclusion, also known as JSON vulnerability, can allow an attacker's website to
read data from a JSON API. The attack works on older browsers by overriding native JavaScript
object constructors, and then including an API URL using a `<script>` tag.

跨站脚本包含，也被称为 Json 漏洞，它可以允许一个攻击者的网站从 JSON API 读取数据。这种攻击发生在老的浏览器上，
它重写原生 JavaScript 对象的构造函数，然后使用 `<script>` 标签包含一个 API 的 URL。

This attack is only successful if the returned JSON is executable as JavaScript. Servers can
prevent an attack by prefixing all JSON responses to make them non-executable, by convention, using the
well-known string `")]}',\n"`.

只有在返回的 JSON 能像 JavaScript 一样可以被执行时，这种攻击才会生效。所以服务端会约定给所有 JSON 响应体加上前缀 `")]}',\n"`，来把它们标记为不可执行的，
以防范这种攻击。

Angular's `HttpClient` library recognizes this convention and automatically strips the string
`")]}',\n"` from all responses before further parsing.

Angular 的 `Http` 库会识别这种约定，并在进一步解析之前，自动把字符串 `")]}',\n"` 从所有响应中去掉。

For more information, see the XSSI section of this [Google web security blog
post](https://security.googleblog.com/2011/05/website-security-for-webmasters.html).

要学习更多这方面的知识，请参见[谷歌 Web 安全博客文章](https://security.googleblog.com/2011/05/website-security-for-webmasters.html)的 XSSI 小节。

<h2 id='code-review'>Auditing Angular applications</h2>

<h2 id='code-review'>审计 Angular 应用程序</h2>

Angular applications must follow the same security principles as regular web applications, and
must be audited as such. Angular-specific APIs that should be audited in a security review,
such as the [_bypassSecurityTrust_](guide/security#bypass-security-apis) methods, are marked in the documentation
as security sensitive.

Angular 应用应该遵循和常规 Web 应用一样的安全原则并按照这些原则进行审计。Angular 中某些应该在安全评审中被审计的 API（
比如[_bypassSecurityTrust_](guide/security#bypass-security-apis) API）都在文档中被明确标记为安全性敏感的。
