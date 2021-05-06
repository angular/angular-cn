# Security

# 安全

This topic describes Angular's built-in
protections against common web-application vulnerabilities and attacks such as cross-site
scripting attacks. It doesn't cover application-level security, such as authentication and authorization.

本主题会讲述 Angular 为防范 Web 应用常见的安全漏洞和攻击（比如跨站脚本攻击）内置的保护措施，但不会涉及应用级安全，比如用户认证（*这个用户是谁？*）和授权(*这个用户能做什么？*)。

For more information about the attacks and mitigations described below, see [OWASP Guide Project](https://www.owasp.org/index.php/Category:OWASP_Guide_Project).

要了解更多攻防信息，参阅[开放式 Web 应用程序安全项目(OWASP)](https://www.owasp.org/index.php/Category:OWASP_Guide_Project)。

You can run the <live-example></live-example> in Stackblitz and download the code from there.

你可以运行<live-example></live-example>，在 Stackblitz 中试用并下载本页的代码。

<div class="callout is-important">

{@a report-issues}
<header>Reporting vulnerabilities</header>

<header>举报漏洞</header>

To report vulnerabilities in Angular itself, email us at [security@angular.io](mailto:security@angular.io).

给我们（[security@angular.io](mailto:security@angular.io)）发邮件，报告 Angular 本身的漏洞。

For more information about how Google handles security issues, see [Google's security
philosophy](https://www.google.com/about/appsecurity/).

要了解关于“谷歌如何处理安全问题”的更多信息，参阅[谷歌的安全哲学](https://www.google.com/about/appsecurity/)。

</div>

<div class="callout is-helpful">

{@a best-practices}
<header>Best practices</header>

<header>最佳实践</header>

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
  
</div>

## Preventing cross-site scripting (XSS)

## 防范跨站脚本(XSS)攻击

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

To systematically block XSS bugs, Angular treats all values as untrusted by default. When a value is inserted into the DOM from a template binding, or interpolation, Angular sanitizes and escapes untrusted values. If a value was already sanitized outside of Angular and is considered safe, you can communicate this to Angular by marking the [value as trusted](#bypass-security-apis).

为了系统性的防范 XSS 问题，Angular 默认把所有值都当做不可信任的。
当值从模板中以属性（Property）、DOM 元素属性（Attribte)、CSS 类绑定或插值等途径插入到 DOM 中的时候，
Angular 将对这些值进行无害化处理（Sanitize），对不可信的值进行编码。如果某个值已经在 Angular 之外进行过无害化处理，可以确信是安全的，你可以[把这个值标记为安全的](#bypass-security-apis)来把这一点通知 Angular。


Unlike values to be used for rendering, Angular templates are considered trusted by default, and should be treated as executable code. Never generate templates by concatenating user input and template syntax. Doing this would enable attackers to [inject arbitrary code](https://en.wikipedia.org/wiki/Code_injection) into your application. To prevent these vulnerabilities, always use the default [AOT template compiler](/guide/security#offline-template-compiler) in production deployments.

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

   **资源 URL**的值需要作为代码进行加载并执行，比如 `<script src>` 中的 URL。

Angular sanitizes untrusted values for HTML, styles, and URLs; sanitizing resource URLs isn't
possible because they contain arbitrary code. In development mode, Angular prints a console warning
when it has to change a value during sanitization.

Angular 会对前三项中种不可信的值进行无害化处理，但不能对第四种资源 URL 进行无害化，因为它们可能包含任何代码。在开发模式下，
如果在进行无害化处理时需要被迫改变一个值，Angular 就会在控制台上输出一个警告。

### Sanitization example

### 无害化范例

The following template binds the value of `htmlSnippet`, once by interpolating it into an element's
content, and once by binding it to the `innerHTML` property of an element:

下面的例子绑定了 `htmlSnippet` 的值，一次把它放进插值里，另一次把它绑定到元素的 `innerHTML` 属性上。

<code-example path="security/src/app/inner-html-binding.component.html" header="src/app/inner-html-binding.component.html"></code-example>

Interpolated content is always escaped&mdash;the HTML isn't interpreted and the browser displays
angle brackets in the element's text content.

插值的内容总会被编码 - 其中的 HTML 不会被解释，所以浏览器会在元素的文本内容中显示尖括号。

For the HTML to be interpreted, bind it to an HTML property such as `innerHTML`. But binding
a value that an attacker might control into `innerHTML` normally causes an XSS
vulnerability. For example, one could execute JavaScript in a following way:

如果希望这段 HTML 被正常解释，就必须绑定到一个 HTML 属性上，比如 `innerHTML`。但是如果把一个可能被攻击者控制的值绑定到 `innerHTML` 就会导致 XSS 漏洞。
比如，某些人可以用这种方式来执行恶意代码：

<code-example path="security/src/app/inner-html-binding.component.ts" header="src/app/inner-html-binding.component.ts (class)" region="class"></code-example>

Angular recognizes the value as unsafe and automatically sanitizes it, which removes the `script` element but keeps safe content such as the `<b>` element.

Angular 认为这些值是不安全的，并自动进行无害化处理。它会移除 `script` 元素，但保留安全的内容，比如该片段中的 `<b>` 元素。

<div class="lightbox">
  <img src='generated/images/guide/security/binding-inner-html.png' alt='A screenshot showing interpolated and bound HTML values'>
</div>

### Direct use of the DOM APIs and explicit sanitization calls

### 避免直接使用 DOM API

Built-in browser DOM APIs don't automatically
browser DOM APIs don't automatically protect you from security vulnerabilities.
For example, `document`, the node available through `ElementRef`, and many third-party APIs
contain unsafe methods. In the same way, if you interact with other libraries that manipulate
the DOM, you likely won't have the same automatic sanitization as with Angular interpolations.
Avoid directly interacting with the DOM and instead use Angular templates where possible.

浏览器内置的 DOM API 不会自动保护你免受安全漏洞的侵害。比如 `document`、通过 `ElementRef` 拿到的节点和很多第三方 API，都可能包含不安全的方法。如果你使用能操纵 DOM 的其它库，也同样无法借助像 Angular 插值那样的自动清理功能。
所以，要避免直接和 DOM 打交道，而是尽可能使用 Angular 模板。

For cases where this is unavoidable, use the built-in Angular sanitization functions.
Sanitize untrusted values with the [DomSanitizer.sanitize](api/platform-browser/DomSanitizer#sanitize)
method and the appropriate `SecurityContext`. That function also accepts values that were
marked as trusted using the `bypassSecurityTrust`... functions, and will not sanitize them,
as [described below](#bypass-security-apis).

浏览器内置的 DOM API 不会自动针对安全漏洞进行防护。比如，`document`（它可以通过 `ElementRef` 访问）以及其它第三方 API 都可能包含不安全的方法。
要避免直接与 DOM 交互，只要可能，就尽量使用 Angular 模板。

{@a bypass-security-apis}

### Trusting safe values

### 信任安全值

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

<code-example path="security/src/app/bypass-security.component.html" header="src/app/bypass-security.component.html (URL)" region="URL"></code-example>

Normally, Angular automatically sanitizes the URL, disables the dangerous code, and
in development mode, logs this action to the console. To prevent
this, mark the URL value as a trusted URL using the `bypassSecurityTrustUrl` call:

通常，Angular 会自动无害化这个 URL 并禁止危险的代码。为了防止这种行为，可以调用 `bypassSecurityTrustUrl` 把这个 URL 值标记为一个可信任的 URL：

<code-example path="security/src/app/bypass-security.component.ts" header="src/app/bypass-security.component.ts (trust-url)" region="trust-url"></code-example>

<div class="lightbox">
  <img src='generated/images/guide/security/bypass-security-component.png' alt='A screenshot showing an alert box created from a trusted URL'>
</div>

If you need to convert user input into a trusted value, use a
component method. The following template allows users to enter a YouTube video ID and load the
corresponding video in an `<iframe>`. The `<iframe src>` attribute is a resource URL security
context, because an untrusted source can, for example, smuggle in file downloads that unsuspecting users
could execute. So call a method on the component to construct a trusted video URL, which causes
Angular to allow binding into `<iframe src>`:

如果需要把用户输入转换为一个可信任的值，可以在组件方法中处理。下面的模板允许用户输入一个 YouTube 视频的 ID，
  然后把相应的视频加载到 `<iframe>` 中。`<iframe src>` 是一个“资源 URL”的安全环境，因为不可信的源码可能作为文件下载到本地，被毫无防备的用户执行。
  所以要调用一个组件方法来构造一个新的、可信任的视频 URL，这样 Angular 就会允许把它绑定到 `<iframe src>`。

<code-example path="security/src/app/bypass-security.component.html" header="src/app/bypass-security.component.html (iframe)" region="iframe"></code-example>

<code-example path="security/src/app/bypass-security.component.ts" header="src/app/bypass-security.component.ts (trust-video-url)" region="trust-video-url"></code-example>

{@a content-security-policy}
### Content security policy

Content Security Policy (CSP) is a defense-in-depth
technique to prevent XSS. To enable CSP, configure your web server to return an appropriate
`Content-Security-Policy`HTTPheader. Read more about content security policy at the 
[Web Fundamentals guide](https://developers.google.com/web/fundamentals/security/csp) on the
Google Developers website.

{@a offline-template-compiler}

### Use the AOT template compiler

The AOT template compiler prevents a whole class of vulnerabilities called template injection,
and greatly improves application performance. The AOT template compiler is the default compiler used by Angular CLI applications, and you should use it in all production deployments.

An alternative to the AOT compiler is the JIT compiler which compiles templates to executable template code within the browser at runtime. Angular trusts template code, so dynamically generating templates and compiling them, in particular templates containing user data, circumvents Angular's built-in protections and is a security anti-pattern. For information about dynamically constructing forms in a safe way, see the [Dynamic Forms](guide/dynamic-form) guide.

{@a server-side-xss}
### Server-side XSS protection

HTML constructed on the server is vulnerable to injection attacks. Injecting template code into an Angular application is the same as injecting executable code into the application: it gives the attacker full control over the application. To prevent this, use a templating language that automatically escapes values to prevent XSS vulnerabilities on the server. Don't generate Angular templates on the server side using a templating language; doing this carries a high risk of introducing template-injection vulnerabilities.

{@a http}
## HTTP-level vulnerabilities

Angular has built-in support to help prevent two common HTTP vulnerabilities, cross-site request
forgery (CSRF or XSRF) and cross-site script inclusion (XSSI). Both of these must be mitigated primarily
on the server side, but Angular provides helpers to make integration on the client side easier.

Angular 内置了一些支持来防范两个常见的 HTTP 漏洞：跨站请求伪造（XSRF）和跨站脚本包含（XSSI）。
这两个漏洞主要在服务器端防范，但是 Angular 也自带了一些辅助特性，可以让客户端的集成变得更容易。

{@a xsrf}
### Cross-site request forgery

### 跨站请求伪造

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

Angular's `HttpClient` has built-in support for the client-side half of this technique. Read about it more in the [HttpClient guide](/guide/http#security-xsrf-protection).

Angular 的 `HttpClient` 对这项技术的客户端部分提供了内置的支持要了解更多信息，参阅 [HttpClient 部分](/guide/http#security-xsrf-protection)。

For information about CSRF at the Open Web Application Security Project (OWASP), see
[Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf) and
[Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
The Stanford University paper
[Robust Defenses for Cross-Site Request Forgery](https://seclab.stanford.edu/websec/csrf/csrf.pdf) is a rich source of detail.

可到 "开放式 Web 应用程序安全项目 (OWASP) " 深入了解 CSRF，参阅[Cross-Site Request Forgery (CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29)
和[Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet](https://www.owasp.org/index.php/CSRF_Prevention_Cheat_Sheet)。
这个斯坦福大学论文 [Robust Defenses for Cross-Site Request Forgery](https://seclab.stanford.edu/websec/csrf/csrf.pdf) 有详尽的细节。

See also Dave Smith's easy-to-understand
[talk on XSRF at AngularConnect 2016](https://www.youtube.com/watch?v=9inczw6qtpY "Cross Site Request Funkery Securing Your Angular Apps From Evil Doers").

参阅 Dave Smith 在<a href="https://www.youtube.com/watch?v=9inczw6qtpY" target="_blank" title="Cross Site Request Funkery Securing Your Angular Apps From Evil Doers">AngularConnect 2016 关于 XSRF 的演讲</a>。

{@a xssi}
### Cross-site script inclusion (XSSI)

### 跨站脚本包含(XSSI)

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

Angular 的 `HttpClient` 库会识别这种约定，并在进一步解析之前，自动把字符串 `")]}',\n"` 从所有响应中去掉。

For more information, see the XSSI section of this [Google web security blog
post](https://security.googleblog.com/2011/05/website-security-for-webmasters.html).

要学习更多这方面的知识，请参阅[谷歌 Web 安全博客文章](https://security.googleblog.com/2011/05/website-security-for-webmasters.html)的 XSSI 小节。

{@a code-review}
## Auditing Angular applications

## 审计 Angular 应用程序

Angular applications must follow the same security principles as regular web applications, and
must be audited as such. Angular-specific APIs that should be audited in a security review,
such as the [_bypassSecurityTrust_](guide/security#bypass-security-apis) methods, are marked in the documentation
as security sensitive.

Angular 应用应该遵循和常规 Web 应用一样的安全原则并按照这些原则进行审计。Angular 中某些应该在安全评审中被审计的 API（
比如[_bypassSecurityTrust_](guide/security#bypass-security-apis) API）都在文档中被明确标记为安全性敏感的。
