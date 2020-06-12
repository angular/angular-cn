# Angular documentation style guide

# Angular 文档风格指南

<!-- formerly Authors Style Guide -->

This style guide is for anyone who contributes to the Angular documentation (this site).
These guidelines should be followed by all authors.
Deviations must be approved by a documentation editor.

本风格指南适用于那些为 Angular 文档（本站）做贡献的人。所有作者都应遵循这些准则。违反之处必须由本文档的编辑批准。

The guidelines described here serve two purposes:

这里描述的指导原则有两个目的：

* To ensure a high-quality, consistent experience for Angular documentation users.

  确保为 Angular 文档用户提供高质量，一致的体验。

* To simplify the writing process for contributing authors.
This guide helps you make decisions about tone, voice, and style.
It also helps you find the right markup quickly.

  简化贡献作者的写作过程。本指南可帮助你做出有关语调、声音和风格的决定。它还可以帮助你快速找到正确的标记（markup）。

<div class="alert is-helpful">

This guide is a *living document*; it changes over time.
We strive for consistency to the extent feasible, but you may find parts of our documentation that don't match this style guide.
When in doubt, **follow this guide rather than imitating existing documents.**

本指南是一份*活文件* ;它随着时间而变化。我们力求在可行的范围内保持一致性，但是你可能会发现我们的文档部分与这个风格指南不符。如有疑问，请**遵循本指南，而不是模仿现有文档。**

</div>

## Scope of these guidelines

## 这些指导原则的范围

We ask all contributing authors to adhere to three aspects of style:

我们要求所有撰文作者坚持以下三个方面：

* **Writing style:** Word usage, grammar, capitalization, and punctuation.
Adherence to Angular's writing guidelines ensures a consistent "voice", helps ensure accuracy of the information, and facilitates use world-wide, by audiences with different backgrounds.

  **写作风格：**单词用法，语法，大小写和标点符号。坚持 Angular 的写作指南可以确保一致的“声音”，有助于确保信息的准确性，并有助于不同背景的观众在世界范围内使用。

* **Markup style:** How to include images, tables, alert boxes, and code snippets.
Angular docs are written in Markdown, with custom extensions for this site. Correct markup ensures a consistent look-and-feel, and is essential for the doc to build and function correctly.

  **标记风格：**如何包含图像，表格，警告框和代码片段。Angular 文档是用 Markdown 编写的，带有该站点的自定义扩展。正确的标记确保了外观的一致性，对于 doc 的正确构建和运行至关重要。

* **Angular coding style:** Coding style for example apps and code snippets.
Code examples are encouraged for demonstrating how to apply the concepts and features discussed.
Angular has a custom framework that enables authors to include code snippets directly from example apps that are automatically tested as part of doc builds.
To contribute example code, you must understand Angular itself and the custom framework for Angular doc examples.

  **Angular 的编码风格：**代码应用和代码片段的编码风格。我们鼓励使用代码示例演示如何应用所讨论的概念和特性。Angular 有一个自定义框架，可让作者直接从示例应用中包含代码片段，这些代码片段会作为 doc builds 的一部分进行自动测试。要提供代码示例代码，你必须要了解 Angular 本身以及 Angular doc examples 的自定义框架。

For each aspect of style, the following table explains where to find the primary guidelines and what this Angular Documentation Style Guide offers.

对于风格的每个方面，下表都解释了在何处查找主要指南以及 Angular Documentation Style Guide 提供的内容。

| Style | Guidelines |
| ----- | ---------- |
| 风格 | 指南 |
| **Writing style** | Primary: [Google Developer Documentation Style Guide](https://developers.google.com/style/)<br />This guide: Specifies any special considerations for Angular docs. |
| **写作风格** | 主要： [Google Developer Documentation Style Guide](https://developers.google.com/style/)  
本指南：指定 Angular 文档的所有特殊注意事项。|
| **Markup style** | Primary: This guide<br />This guide: Specifies guidelines for markup of guides and tutorials, which are written primarily in Markdown. |
| **标记风格** | 小学：本指南  
本指南：指定指南和教程的标记指南，它们主要用 Markdown 编写。|
| **Angular coding style** | Primary: [Angular Style Guide](guide/styleguide "Angular Application Code Style Guide").<br />This guide: How to create, store, and include code examples in guides and tutorials. |
| **Angular 的编码风格** | 主要： [Angular 风格指南](guide/styleguide "Angular 应用代码风格指南")。 
本指南：如何在指南和教程中创建，存储和包含代码示例。|

<div class="alert is-helpful">

Note: Angular API and CLI reference docs are generated from source code and/or related source files, which may have other markup styles and other ways of including code examples.

注意：Angular API 和 CLI 参考文档都是从源代码和/或相关的源文件中生成的，这些文件可能有其它的标记风格，还包括代码示例等。

</div>

## Doc generation and tooling

## Doc 生成和工具

To make changes to the documentation pages and sample code, clone the [Angular github repository](https://github.com/angular/angular "Angular repo") and go to the `aio/` folder.

要修改文档页面和示例代码，克隆[Angular 的 github 存储库](https://github.com/angular/angular "Angular repo")，进入 `aio/` 文件夹。

The [aio/README.md](https://github.com/angular/angular/blob/master/aio/README.md "AIO ReadMe") explains how to install and use the tools to edit and test your changes.

[aio / README.md](https://github.com/angular/angular/blob/master/aio/README.md "AIO ReadMe")解释了如何安装和使用这些工具编辑和测试你的更改。

Here are a few essential commands for guide page authors.

以下是指南页面作者的一些基本命令。

1. `yarn setup` &mdash; installs packages; builds docs, stackblitz, and zips.

   `yarn setup` - 安装包; build docs，stackblitz 和 zip。

1. `yarn docs-watch --watch-only` &mdash; watches for saved content changes and refreshes the browser. The (optional) `--watch-only` flag skips the initial docs rebuild.

   `yarn docs-watch --watch-only` - `yarn docs-watch --watch-only` 保存的内容更改并刷新浏览器。（可选）-- `--watch-only` 标志跳过了初始的 docs rebuild。

1. `yarn start`  &mdash;  starts the doc viewer application so you can see your local changes in the browser.

   `yarn start` - 启动 doc viewer 应用，以便在浏览器中查看本地更改。

1.  http://localhost:4200/  &mdash;  browse to the app running locally.

   [http：// localhost：4200 /](http://localhost:4200/) - 浏览到本地运行的应用。

You can combine `yarn docs-watch` and `yarn start` into one command with `yarn serve-and-sync`.

你可以把 `yarn docs-watch` 和 `yarn start` 成一个带 `yarn serve-and-sync` 命令。

## Guide pages

## 指南页面

 All but a few guide pages are [markdown](https://daringfireball.net/projects/markdown/syntax "markdown") files with an `.md` extension.

 除少量指南外，所有页面都是带有 `.md` 扩展名的[markdown](https://daringfireball.net/projects/markdown/syntax "降价促销")文件。

Every guide page file is stored in the `content/guide` directory. Although the [side navigation](#navigation) panel displays as a hierarchy, the directory is flat with no sub-folders.
The flat folder approach allows us to shuffle the apparent navigation structure without moving page files or redirecting old page URLs.

每个指南页文件都存储在 `content/guide` 目录下。虽然[侧面导航](#navigation)面板显示为层次结构，但目录是扁平的，没有子文件夹。这种平面文件夹方法可以让我们在不移动页面文件或重定向旧页面 URL 的情况下，改进明显的导航结构。

The doc generation process consumes the markdown files in the `content/guide` directory and produces JSON files in the `src/generated/docs/guide` directory, which is also flat. Those JSON files contain a combination of document metadata and HTML content.

doc 生成过程会使用 `content/guide` 目录下的 markdown 文件，并在 `src/generated/docs/guide` 目录下生成 JSON 文件，该目录也是平的。这些 JSON 文件包含文档元数据和 HTML 内容的组合。

The reader requests a page by its Page URL. The doc viewer fetches the corresponding JSON file, interprets it, and renders it as fully-formed HTML page.

读者可以通过网页页面的 URL 请求页面。doc viewer 会抓取相应的 JSON 文件并对其进行解释，并把它渲染为一个完整格式的 HTML 页面。

Page URLs mirror the `content` file structure. The URL for the page of a guide is in the form `guide/{page-name}`. The page for _this_ "Authors Style Guide" is located at `content/guide/docs-style-guide.md` and its URL is `guide/docs-style-guide`.

页面 URL 会镜像 `content` 文件结构。指南页面的网址是 `guide/{page-name}`。*本* “作者风采指南”的页面位于 `content/guide/docs-style-guide.md`，它的 URL 是 `guide/docs-style-guide`。


<div class="alert is-helpful">

_Tutorial_ pages are exactly like guide pages. The only difference is that they reside in `content/tutorial` instead of `content/guide` and have URLs like `tutorial/{page-name}`.

*教程*页和指南页完全一样。唯一的区别是它们驻留在 `content/tutorial` 而非 `content/guide` 并且拥有 `tutorial/{page-name}` 类的 URL。

_API_ pages are generated from Angular source code into the `src/generated/docs/api` directory.
The doc viewer translates URLs that begin `api/` into requests for document JSON files in that directory. This style guide does not discuss creation or maintenance of API pages.

*API*页面是从 Angular 源代码生成到 `src/generated/docs/api` 目录下的。doc viewer 会把那些以 `api/` 开头的 URL 转换成该目录下的 document JSON 文件的请求。本风格指南中没有讨论 API 页面的创建或维护。

_Marketing_ pages are similar to guide pages. They're located in the `content/marketing` directory. While they can be markdown files, they may be static HTML pages or dynamic HTML pages that render with JSON data.

*营销*页面类似于指南页面。它们位于 `content/marketing` 目录中。虽然它们可以是 markdown 文件，但它们可能是静态 HTML 页面，也可能是用 JSON 数据渲染的动态 HTML 页面。

Only a few people are authorized to write marketing pages. This style guide does not discuss creation or maintenance of marketing pages.

只有少数人有权撰写营销页面。本风格指南不讨论营销页面的创建或维护。

</div>

## Markdown and HTML

## Markdown 和 HTML

While documentation guide pages ultimately render as HTML, almost all of them are written in [markdown](https://daringfireball.net/projects/markdown/syntax "markdown").

文档指南页最终渲染为 HTML 格式，而且几乎所有的页面都用[markdown](https://daringfireball.net/projects/markdown/syntax "降价促销")格式编写。

Markdown is easier to read and to edit than HTML. Many editors (including Visual Studio Code) can render markdown as you type it.

Markdown 比 HTML 更容易阅读和编辑。很多编辑器（包括 Visual Studio Code）都可以在你输入的时候渲染 markdown。

From time to time you'll have to step away from markdown and write a portion of the document in HTML. Markdown allows you to mix HTML and markdown in the same document.

你不时要退出降价促销，并用 HTML 写一部分文档。Markdown 允许你把 HTML 和 markdown 混合在一起。

Standard markdown processors don't allow you to put markdown _within_ HTML tags. But the Angular documentation markdown processor **supports markdown within HTML**, as long as you follow one rule:

标准降价处理器不允许你把*内* HTML 标签降价。但 Angular 文档降价处理器只要你遵循一条规则就**支持 HTML 中的 markdown** ：

<div class="alert is-critical">

**Always** follow every opening and closing HTML tag with _a blank line_.

**一定**要用*空行*跟随每个打开和关闭的 HTML 标签。

</div>

```html
<div class="alert is-critical">

  **Always** follow every opening and closing HTML tag with _a blank line_.

</div>
```

<div class="alert is-helpful">

  It is customary but not required to _precede_ the _closing HTML_ tag with a blank line as well.

惯常但不要求*在* *结束 HTML*标记*之前*添加一个空白行。

</div>

## Title

## 标题

Every guide document must have a title.

每份指南都必须有标题。

The title should appear at the top of the physical page.
Begin the title with the markdown `#` character. Alternatively, you can write the equivalent `<h1>`.

标题应该出现在物理页面的顶部。使用 markdown `#` character 开始标题。或者，也可以编写等效的 `<h1>`。

```html
  # Angular documentation style guide
```

**Only one title (`<h1>`) per document!**

**每篇文档只有一个标题（ `<h1>` ）！**

Title text should be in "Sentence case", which means the first word is capitalized and all other words are lower case (unless they are technical terms that are always capitalized, like "Angular").

标题文本应该出现在“句子大小写”中，这意味着第一个单词是大写的，所有其它单词都是小写的（除非它们是总是大写的技术术语，比如“Angular”）。

```html
  # Deprecation policy in Angular
```

**Always follow the title with at least one blank line.**

**始终使用至少一个空行来跟随标题。**

Note that the corresponding left-nav TOC text should be in "title case", which means that you use capital letters to start the first words and all principal words. Use lower case letters for secondary words such as "in", "of", and "the". The TOC title can also be shortened to fit in the column.

注意，相应的 left-nav TOC 文本应该是“titlecase”，这意味着你可以使用大写字母来开始第一个单词和所有主要单词。对于第二个单词，例如“in”，“of”和“the”，请使用小写字母。也可以缩短 TOC 标题以适应该列。

## Sections

## 部分

A typical document is divided into sections.

典型文档分为几个部分。

All heading text should be in "Sentence case", which means the first word is capitalized and all other words are lower case.

所有标题文本都应该出现在“Sentence case”中，这意味着第一个单词是大写的，所有其它的单词都是小写的。

**Always follow the section heading with at least one blank line.**

**务必遵循带有至少一个空白行的标题部分。**

<h2 class="no-toc">
Main section heading
</h2>
There are usually one or more main sections that may be further divided into secondary sections.

Begin a main section heading with the markdown `##` characters. Alternatively, you can write the equivalent `<h2>` HTML tag.

使用 markdown 的 `##` 字符开始一个主要部分标题。或者，你可以编写等效的 `<h2>` HTML 标记。

The main section heading should be followed by a blank line and then the content for that heading.

主要部分的标题后面应该是一个空行，然后是该标题的内容。

```html
  ## Sections

  A typical document is divided into sections.
```

<h3 class="no-toc">
Secondary section heading
</h3>

A secondary section heading is related to a main heading and _falls textually within_ the bounds of that main heading.

第二节标题与一个主标题相关，并*在*该标题的*范围内*以*文本形式出现*。

Begin a secondary heading with the markdown `###` characters. Alternatively, you can write the equivalent `<h3>` HTML tag.

使用 markdown `###` 字符开始第二个标题。或者，你可以编写等效的 `<h3>` HTML 标记。

The secondary heading should be followed by a blank line and then the content for that heading.

第二个标题之后应该是一个空行，然后是该标题的内容。

```html
  ### Secondary section heading

  A secondary section ...
```

#### Additional section headings

#### 附加章节标题

Try to minimize the heading depth, preferably only two. But more headings, such as this one, are permitted if they make sense.

尽量减少航向深度，最好只用两个。但是，如果有更多的标题，比如这个标题，如果有意义，就是允许的。

**N.B.**:  The [Table-of-contents](#table-of-contents) generator only considers main (`<h2>`) and secondary (`<h3>`) headings.

**注意** ： [目录](#table-of-contents)生成器只考虑 main（ `<h2>` ）和 secondary（ `<h3>` ）标题。

```html
  #### Additional section headings

  Try to minimize ...
```

## Table of contents

## 目录

Most pages display a table of contents (TOC). The TOC appears in the right panel when the viewport is wide. When narrow, the TOC appears in an expandable/collapsible region near the top of the page.

大多数页面都会显示一个目录（TOC）。当视口很宽时，TOC 会出现在右侧面板中。当它变窄时，TOC 会出现在靠近页面顶部的可扩展/可折叠区域。

You should not create your own TOC by hand. The TOC is generated automatically from the page's main and secondary section headers.

你不应该手工创建自己的 TOC。TOC 是从页面的 main 和 secondary section 头自动生成的。

To exclude a heading from the TOC, create the heading as an `<h2>` or `<h3>` element with a class called 'no-toc'. You can't do this with markdown.

要从 TOC 中排除标题，就要在标题为“no-toc”的 `<h2>` 或 `<h3>` 元素中创建标题。markdown 你不能这么做。

```html
<h3 class="no-toc">
This heading is not displayed in the TOC
</h3>
```

You can turn off TOC generation for the _entire_ page by writing the title with an `<h1>` tag and the `no-toc` class.

你可以用标签 `<h1>` 标签和 `no-toc` 类来关闭*整个*页面的 TOC 生成。

```html
<h1 class="no-toc">
A guide without a TOC
</h1>
```

## Navigation

## 导航

The navigation links at the top, left, and bottom of the screen are generated from the JSON configuration file, `content/navigation.json`.

屏幕顶部，左侧和底部的导航链接是从 JSON 配置文件的 contents `content/navigation.json`。

The authority to change the `navigation.json` file is limited to a few core team members.
But for a new guide page, you should suggest a navigation title and position in the left-side navigation panel called the "side nav".

修改 `navigation.json` 文件的权限仅限于少数核心团队成员。但是对于一个新的指南页面，你应该在左侧导航面板中推荐一个名为“side nav”的导航标题和位置。

Look for the `SideNav` node in `navigation.json`. The `SideNav` node is an array of navigation nodes. Each node is either an _item_ node for a single document or a _header_ node with child nodes.

在 `navigation.json` 查找 `SideNav` 节点。`SideNav` 节点是一个导航节点数组。每个节点都是单个文档的*项目*节点，或者是带有子节点的*头*节点。

Find the header for your page. For example, a guide page that describes an Angular feature is probably a child of the `Fundamentals` header.

找到你页面的标题。例如，一个描述 Angular 特性的指南页面可能是 `Fundamentals` 头的子代。

```html
{
  "title": "Fundamentals",
  "tooltip": "The fundamentals of Angular",
  "children": [ ... ]
}
```

A _header_ node child can be an _item_ node or another _header_ node. If your guide page belongs under a sub-header, find that sub-header in the JSON.

*头*节点子节点可以是一个*项目*节点，也可以是另一个*头*节点。如果你的指南页属于子标题，请在 JSON 中找到该子标题。

Add an _item_ node for your guide page as a child of the appropriate _header_ node. It probably looks something like this one.

为指南添加一个*item*节点，作为相应*头*节点的子节点。它可能看起来像这样。

```html
{
  "url": "guide/architecture",
  "title": "Architecture",
  "tooltip": "The basic building blocks of Angular applications."
}
```

A navigation node has the following properties:

导航节点具有以下属性：

* `url`- the URL of the guide page (_item node only_).

  `url` - 指南页面的 URL（ *仅限 item 节点* ）。

* `title`- the text displayed in the side nav.

  `title` - 侧边导航栏中显示的文字。

* `tooltip` - text that appears when the reader hovers over the navigation link.

  `tooltip` - 读者将鼠标悬停在导航链接上方时显示的文本。

* `children` - an array of child nodes (_header node only_).

  `children` - 子节点数组（ *仅限标头节点* ）。

* `hidden` - defined and set true if this is a guide page that should _not_ be displayed in the navigation panel. Rarely needed, it is a way to hide the page from navigation while making it available to readers who should know about it. _This_ "Authors Style Guide" is a hidden page.

  `hidden` - 如果这是一个*不*应该在导航面板中显示的指南页面，就定义并设置为 true。很少需要，它是一种隐藏页面导航的方法，同时让那些应该知道它的读者可以访问它。*这个* “作者风格指南”是一个隐藏的页面。

<div class="alert is-critical">

Do not create a node that is both a _header_ and an _item_ node. That is, do not specify the `url` property of a _header_ node.

不要创建既是*头部*又是*项目*节点的节点。也就是说，不要指定*头*节点的 `url` 属性。

</div>

<div class="alert is-critical">

The current guidelines allow for a three-level navigation structure with two header levels. Don't add a third header level.

当前的指南允许三级导航结构，它有两个标题级别。不要添加第三个标题级别。

</div>

## Code snippets

## 代码片段

Guides are rich in examples of working Angular code. Example code can be commands entered in a terminal window, a fragment of TypeScript or HTML, or an entire code file.

本指南中包含很多 Angular 代码的工作示例。示例代码可以是终端窗口中输入的命令，TypeScript 或 HTML 的片段，也可以是整个代码文件。

Whatever the source, the doc viewer renders them as "code snippets", either individually with the [_code-example_](#code-example "code-example") component or as a tabbed collection with the [_code-tabs_](#code-tabs "code-tabs") component.

无论是什么源代码，doc Viewer 都会把它们渲染为“代码片段”，既可以单独使用[*代码示例*](#code-example "代码示例")组件，也可以作为带选项[*卡*](#code-tabs "代码标签")组件的标签式集合。

{@a code-example}

### Code example

### 代码示例

You can display a simple, inline code snippet with the markdown backtick syntax.
Use a single backtick on either side of a term when referring to code or the
name of a file in a sentence.
The following are some examples:

你可以用一个简单的内联代码片段（markdown backtick syntax）来显示它。当引用代码或句子中的文件名时，就在术语的两边使用一个反引号。一些例子如下：

* In the `app.component.ts`, add a `logger()` method.

  在 `app.component.ts`，添加一个 `logger()` 方法。

* The `name` property is `Sally`.

  这个 `name` 属性是 `Sally`。

* Add the component class name to the `declarations` array.

  将组件类名添加到 `declarations` 数组中。

The markdown is as follows:

降价促销如下：

```markdown
* In the `app.component.ts`, add a `logger()` method.
* The <code class="no-auto-link">item</code> property is `true`.
* Add the component class name to the `declarations` array.
```

In certain cases, when you apply backticks around a term, it may auto-link to
the API documentation. If you do not intend the term to be a link, use the following
syntax:

在某些情况下，当你在一个术语周围应用反引号时，它可以自动链接到 API 文档。如果你不打算把这个词当成链接，请使用以下语法：

```html
The <code class="no-auto-link">item</code> property is `true`.
```

For block code snippets, we generally prefer to display code with
the Angular documentation _code-example_ component represented by the `<code-example>` tag.
The `<code-example>` tag has a `header` attribute that you use to identify the file that the example comes from. The header should be used whenever possible to establish the context of the example.
See [Code snippets and code examples](guide/docs-style-guide#code-snippets-and-code-samples) for more details.

对于块代码片段，我们通常更喜欢使用 Angular 文档中的*代码示例*组件（ `<code-example>` 标签）来表示代码。`<code-example>` 标签有一个 `header` 属性，用于标识该例子所来自的文件。应该尽可能使用头来建立这个例子的上下文。有关更多详细信息，请参阅[代码段和代码示例](guide/docs-style-guide#code-snippets-and-code-samples)。

<h3 class="no-toc">Inline code-snippets</h3>

You should source code snippets [from working sample code](#from-code-samples) when possible.
But there are times when an inline snippet is the better choice.

你应尽可能[从](#from-code-samples)代码片段中[获取](#from-code-samples)源代码片段。但有时内联代码片段是更好的选择。

For terminal input and output, put the content between `<code-example>` tags, set the CSS class to `code-shell`, and set the language attribute to `sh` as in this example.

对于终端输入和输出，把内容放在 `<code-example>` 标签之间，把 CSS 类设置为 `code-shell`，并把该属性设置为 `sh` 如本例所示。

<code-example language="sh" class="code-shell">
  npm start
</code-example>

```html
<code-example language="sh" class="code-shell">
  npm start
</code-example>
```

Inline, hand-coded snippets like this one are _not_ testable and, therefore, are intrinsically unreliable.
This example belongs to the small set of pre-approved, inline snippets that includes
user input in a command shell or the _output_ of some process.

这里的内联手写代码片段是*不可*测试的，因此本质上是不可靠的。这个例子属于一小组预先批准的内联片段，它们包括命令 shell 中的用户输入或者某个进程的*输出*。

**Do not write inline code snippets** unless you have a good reason and the editor's permission to do so.
In all other cases, code snippets should be generated automatically from tested code samples.

**不要写内联代码片段，**除非你有充分的理由和编辑的许可。在所有其它情况下，应该从经过测试的代码示例中自动生成代码片段。

For hypothetical examples such as illustrations of configuration options in a JSON file, you should still use The `<code-example>` tag with the `header` attribute to identify the context.

对于假设的例子，例如 JSON 文件中配置选项的插图，你仍然应该使用带有 `header` 属性的 `<code-example>` 标签来标识上下文。

{@a from-code-samples}

<h3 class="no-toc">Code snippets and code samples</h3>

One of the documentation design goals is that guide page code snippets should be examples of real, working code.

文档设计目标之一是，指南页面代码片段应该是实际工作代码的例子。

We meet this goal by displaying code snippets that are derived directly from standalone code samples, written specifically for these guide pages.

我们通过直接从独立代码示例派生的代码片段（专为这些指南页面编写）来实现这一目标。

The author of a guide page is responsible for the code sample that supports that page.
The author must also write end-to-end tests for the sample.

指南页面的作者负责支持该页面的代码示例。作者还必须为该样本编写端到端的测试。

Code samples are located in sub-folders of the `content/examples` directory of the `angular/angular` repository. An example folder name should be the same as the guide page it supports.

代码示例位于 `angular/angular` 存储库的 `angular/angular` `content/examples` 目录的子文件夹中。示例文件夹名称应该与它支持的指南页面相同。

<div class="alert is-helpful">

A guide page might not have its own sample code. It might refer instead to a sample belonging to another page.

指南页面可能没有自己的示例代码。它可能代之以属于另一个页面的样本。

</div>

The Angular CI process runs all end-to-end tests for every Angular PR. Angular re-tests the samples after every new version of a sample and every new version of Angular itself.

Angular CI 流程会为每个 Angular PR 运行所有的端到端测试。Angular 在每个新版本的样本和 Angular 本身的每一个新版本之后重新测试样本。

When possible, every snippet of code on a guide page should be derived from a code sample file. You tell the Angular documentation engine which code file - or fragment of a code file - to display by configuring `<code-example>` attributes.

如果可能，指南页上的每一段代码都应该从代码示例文件中派生出来。你可以通过配置 `<code-example>` 属性来告诉 Angular 文档引擎哪些代码文件（或代码文件的片段）。

#### Code snippet from a file

#### 文件来自一个文件的代码片断

_This_ "Authors Doc Style Guide" has its own sample application, located in the `content/examples/docs-style-guide` folder.

*这个* “Authors Doc Style Guide”有自己的示例应用，它位于 `content/examples/docs-style-guide` 文件夹中。

The following _code-example_ displays the sample's `app.module.ts`.

下列*代码示例*展示了该示例的 `app.module.ts`。

<code-example path="docs-style-guide/src/app/app.module.ts" header="src/app/app.module.ts"></code-example>

Here's the brief markup that produced that lengthy snippet:

这里是制作冗长代码片段的简短标记：

```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  header="src/app/app.module.ts">
</code-example>
```

You identified the snippet's source file by setting the `path` attribute to sample folder's location _within_ `content/examples`.
In this example, that path is  `docs-style-guide/src/app/app.module.ts`.

你通过*在“* `content/examples` 把 `path` 属性设置为 sample 文件夹的位置，来识别出该代码片段的源文件。在这个例子中，该路径是 `docs-style-guide/src/app/app.module.ts`。

You added a header to tell the reader where to find the file by setting the `header` attribute.
Following convention, you set the `header` attribute to the file's location within the sample's root folder.

你添加了一个标题来通过设置 `header` 属性告诉读者在哪里找到该文件。按照惯例，你会把 `header` 属性设置为该文件的根文件夹下的该文件所在的位置。

<div class="alert is-helpful">

Unless otherwise noted, all code snippets in this page are derived from sample source code
located in the `content/examples/docs-style-guide` directory.

除非另有说明，否则本页面中的所有代码片段均来自位于的 `content/examples/docs-style-guide` 目录下的示例源代码。

</div>

<div class="alert is-important">

The doc tooling reports an error if the file identified in the path does not exist **or is _git_-ignored**.

如果路径中标识的文件不存在**或是*git* -ignored，**那么 doc 工具**会报错**。

Most `.js` files are _git_-ignored.
If you want to include an ignored code file in your project and display it in a guide you must _un-ignore_ it.

大多数 `.js` 文件都是*git* -ignored。如果你想在项目中包含一个被忽略的代码文件并把它显示在指南中，你必须*取消*它。

The preferred way to un-ignore a file is to update the `content/examples/.gitignore` like this:

取消忽略某个文件的首选方法是像这样更新一下 `content/examples/.gitignore` ：

<code-example header="content/examples/.gitignore">
  # my-guide
  !my-guide/src/something.js
  !my-guide/more-javascript*.js
</code-example>

</div>

#### Code-example attributes

#### 代码示例属性

You control the _code-example_ output by setting one or more of its attributes:

你通过设置一个或多个属性来控制*代码示例*输出：

* `path`- the path to the file in the `content/examples` folder.

  `path` - `content/examples` 文件夹中该文件的路径。

* `header`- the header of the code listing.

  `header` - 代码清单的标题。

* `region`- displays the source file fragment with that region name; regions are identified by _docregion_ markup in the source file, as explained [below](#region "Displaying a code fragment").

  `region` - 显示带有该地区名的源文件 fragment; *域名*由源文件中的*docregion*标记标识，[如下所述](#region "显示代码片段")。

* `linenums`- value may be `true`, `false`, or a `number`. When not specified, line numbers default to `false` (i.e. no line numbers are displayed). The rarely used `number` option starts line numbering at the given value. `linenums=4` sets the starting line number to 4.

  `linenums` - 值可能是 `true`，`false` 或者是 `number`。未指定时，行号默认为 `false` （即不显示行号）。很少使用的 `number` 选项会在给定的值下开始行编号。`linenums=4`，起始行号为 4。

* `class`- code snippets can be styled with the CSS classes `no-box`, `code-shell`, and `avoid`.

  `class` - code snippets 可以用 CSS 类的 `no-box`，`code-shell` 和 `avoid` 来设置风格。

* `hideCopy`- hides the copy button

  `hideCopy` - 隐藏复制按钮

* `language`- the source code language such as `javascript`, `html`, `css`, `typescript`, `json`, or `sh`. This attribute only works for inline examples.

  `language` - 源代码语言，比如 `javascript`，`html`，`css`，`typescript`，`json` 或 `sh`。该属性仅适用于内联示例。

{@a region}

#### Displaying a code fragment

#### 显示代码片段

Often you want to focus on a fragment of code within a sample code file. In this example, you focus on the `AppModule` class and its `NgModule` metadata.

你可能希望专注于示例代码文件中的代码片段。在这个例子中，你将专注于 `AppModule` 类及其 `NgModule` 元数据。

<code-example
  path="docs-style-guide/src/app/app.module.ts"
  region="class">
</code-example>

First you surround that fragment in the source file with a named _docregion_ as described [below](#source-code-markup).
Then you reference that _docregion_ in the `region` attribute of the `<code-example>` like this

首先，你使用命名的*docregion*在源文件中包围该片段，[如下所述](#source-code-markup)。然后，就像这样，在 `<code-example>` 的 `region` 属性中引用那个*docregion*

```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  region="class">
</code-example>
```

A couple of observations:

几点意见：

1. The `region` value, `"class"`, is the name of the `#docregion` in the source file. Confirm that by looking at `content/examples/docs-style-guide/src/app/app.module.ts`

   `region` 值 `"class"` 是源文件中 `#docregion` 的名字。通过查看 `content/examples/docs-style-guide/src/app/app.module.ts`

1. Omitting the `header` is fine when the source of the fragment is obvious. We just said that this is a fragment of the `app.module.ts` file which was displayed immediately above, in full, with a header.
There's no need to repeat the header.

   当片段的来源很明显时，省略 `header` 是很好的。我们刚刚说过，这是 `app.module.ts` 文件的一个片段，里面是完整的，上面带有一个标题。没有必要重复这个标题。

#### Example of bad code

#### 坏代码的例子

Sometimes you want to display an example of bad code or bad design.

有时，你想要显示一个坏代码或糟糕设计的例子。

You should be careful. Readers don't always read carefully and are likely to copy and paste your example of bad code in their own applications. So don't display bad code often.

你应该小心点读者并不总是仔细阅读过，并且可能会把坏代码的例子复制并粘贴到自己的应用中。所以，不要经常出现错误的代码。

When you do, set the `class` to `avoid`. The code snippet will be framed in bright red to grab the reader's attention.

执行此操作时，请将 `class` 设置为 `avoid`。该代码片段将以鲜红色框起，以引起读者的注意。

Here's the markup for an "avoid" example in the
[_Angular Style Guide_](guide/styleguide#style-05-03 "Style 05-03: components as elements").

这里是[*Angular Style 指南中*](guide/styleguide#style-05-03 "风格 05-03：components as elements elements") “avoid”示例的标记。

```html
<code-example
  path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts"
  region="example"
  header="app/heroes/hero-button/hero-button.component.ts">
</code-example>
```

<code-example path="styleguide/src/05-03/app/heroes/shared/hero-button/hero-button.component.avoid.ts" region="example" header="app/heroes/hero-button/hero-button.component.ts">
</code-example>

{@a code-tabs}

### Code Tabs

### 代码标签

Code tabs display code much like _code examples_ do.  The added advantage is that they can display multiple code samples within a tabbed interface.  Each tab is displayed using _code pane_.

代码选项卡会像*代码示例*那样显示代码。额外的好处是，它们可以在选项卡式界面中显示多个代码示例。使用*代码窗格*显示每个标签页。

#### Code-tabs attributes

#### Code-tabs 属性

* `linenums`: The value can be `true`, `false` or a number indicating the starting line number. If not specified, it defaults to `false`.

  `linenums` ：值可以是 `true`，`false`，也可以是表示起始行号的数字。如果没有指定，默认为 `false`。

#### Code-pane attributes

#### 代码窗格属性

* `path` - a file in the content/examples folder

  `path` - content / examples 文件夹中的一个文件

* `header` - seen in the header of a tab

  `header` - 在标签的标题中看到

* `linenums` - overrides the `linenums` property at the `code-tabs` level for this particular pane. The value can be `true`, `false` or a number indicating the starting line number. If not specified, it defaults to `false`.

  `linenums` （覆盖 `linenums` - 覆盖此特定窗格的 `code-tabs` 级别的 `linenums` 属性。值可以是 `true`，`false`，也可以是表示起始行号的数字。如果没有指定，默认为 `false`。

The next example displays multiple code tabs, each with its own header.
It demonstrates control over display of line numbers at both the `<code-tabs>` and `<code-pane>` levels.

下一个例子显示了多个代码标签，每个标签都有自己的标头。它展示了对 `<code-tabs>` 和 `<code-pane>` 级别的行号显示的控制。

<code-tabs linenums="true">
  <code-pane
    header="app.component.html"
    path="docs-style-guide/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="app.component.ts"
    path="docs-style-guide/src/app/app.component.ts"
    linenums="false">
  </code-pane>
  <code-pane
    header="app.component.css (heroes)"
    path="docs-style-guide/src/app/app.component.css"
    region="heroes">
  </code-pane>
  <code-pane
    header="package.json (scripts)"
    path="docs-style-guide/package.1.json">
  </code-pane>
</code-tabs>

Here's the markup for that example.

这是该例子的标记。

Note how the `linenums` attribute in the `<code-tabs>` explicitly enables numbering for all panes.
The `linenums` attribute in the second pane disables line numbering for _itself only_.

注意 `<code-tabs>` 的 `linenums` 属性如何显式启用所有窗格的编号。第二个窗格中的 `linenums` 属性*只*为*自己*禁用了行号。

```html
<code-tabs linenums="true">
  <code-pane
    header="app.component.html"
    path="docs-style-guide/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="app.component.ts"
    path="docs-style-guide/src/app/app.component.ts"
    linenums="false">
  </code-pane>
  <code-pane
    header="app.component.css (heroes)"
    path="docs-style-guide/src/app/app.component.css"
    region="heroes">
  </code-pane>
  <code-pane
    header="package.json (scripts)"
    path="docs-style-guide/package.1.json">
  </code-pane>
</code-tabs>
```

{@a source-code-markup}

## Source code markup

## 源代码标记

You must add special code snippet markup to sample source code files before they can be displayed by `<code-example>` and `<code-tabs>` components.

在 `<code-example>` 和 `<code-tabs>` 组件显示之前，你必须先为源代码文件示例添加特殊的代码片段标记。

<div class="alert is-helpful">

The sample source code for this page, located in `context/examples/docs-style-guide`, contains examples of every code snippet markup described in this section.

该页面的示例源代码位于 `context/examples/docs-style-guide`，其中包含本节中描述的每个代码片段标记的示例。

</div>

Code snippet markup is always in the form of a comment. Here's the default _docregion_ markup for a TypeScript or JavaScript file:

代码片段标记总是采用注释的形式。这是 TypeScript 或 JavaScript 文件的默认*docregion*标记：

```
// #docregion
... some code ...
// #enddocregion
```

Different file types have different comment syntax so adjust accordingly.

不同的文件类型有不同的注释语法，所以要相应调整

```html
<!-- #docregion -->
... some HTML ...
<!-- #enddocregion -->
```

```
/* #docregion */
... some CSS ...
/* #enddocregion */
```

The doc generation process erases these comments before displaying them in the doc viewer.
It also strips them from stackblitz and sample code downloads.

文档生成过程会先删除这些注释，然后才能在 doc 查看器中显示它们。它还会从 stackblitz 和示例代码下载中删除它们。

<div class="alert is-important">

Code snippet markup is not supported in JSON files because comments are forbidden in JSON files.
See [below](#json-files) for details and workarounds.

JSON 文件中不支持代码片断标记，因为 JSON 文件中的注释是被禁止的。有关详情和解决方法，请参阅[下文](#json-files)。

</div>

#### *#docregion*

The _#docregion_ is the most important kind of code snippet markup.

*#docregion*是最重要的一段代码段标记。

The `<code-example>` and `<code-tabs>` components won't display a source code file unless it has a _#docregion_.

`<code-example>` 和 `<code-tabs>` 组件除非有*#docregion，*否则不会显示源代码文件。

The _#docregion_ comment begins a code snippet region.
Every line of code _after_ that comment belongs in the region _until_ the code fragment processor encounters the end of the file or a closing _#enddocregion_.

*#docregion 的*注释开始于代码片段区域。该注释*后面的*每一行代码都属于该区域，*直到*代码片段处理器遇到该文件的末尾或者结束*#enddocregion 为止*。

<div class="alert is-helpful">

The `src/main.ts` is a simple example of a file with a single _#docregion_ at the top of the file.

`src/main.ts` 是一个文件顶部带有*#docregion*的文件的简单例子。

<code-example
  path="docs-style-guide/src/main.ts"
  header="src/main.ts"></code-example>

</div>

#### Named *#docregions*

#### 命名的 *#docregions*

You'll often display multiple snippets from different fragments within the same file.
You distinguish among them by giving each fragment its own _#docregion name_ as follows.

你经常会在同一个文件中的不同片段中显示多个片段。你可以通过赋予每个片段自己的*#docregion 名称*来区分它们，如下所示。

```
// #docregion region-name
... some code ...
// #enddocregion region-name
```

Remember to refer to this region by name in the `region` attribute of the `<code-example>` or `<code-pane>` as you did in an example above like this:

记得在 `<code-example>` 或 `<code-pane>` 的 `region` 属性中按名称引用这个区域，就像上面的例子一样：

```html
<code-example
  path="docs-style-guide/src/app/app.module.ts"
  region="class"></code-example>
```

The _#docregion_ with no name is the _default region_. Do _not_ set the `region` attribute when referring to the default _#docregion_.

没有名字的*#docregion*是*默认的区域*。*不要*设置 `region` 指的是默认*#docregion*时属性。

#### Nested _#docregions_

#### 嵌套的*#docregions*

You can nest _#docregions_ within _#docregions_

*#docregions*内可以嵌套*#docregions*

```
// #docregion
... some code ...
// #docregion inner-region
... more code ...
// #enddocregion inner-region
... yet more code ...
/// #enddocregion
```

<div class="alert is-helpful">

The `src/app/app.module.ts` file has a good example of a nested region.

`src/app/app.module.ts` 文件中有一个嵌套区域的好例子。

</div>

#### Combining fragments

#### 结合片段

You can combine several fragments from the same file into a single code snippet by defining
multiple _#docregions_ with the _same region name_.

你可以通过定义多个具有*相同区域名称的* *#docregions*，把*同*一个文件中的多个片段组合到一个代码片段中。

Examine the `src/app/app.component.ts` file which defines two nested _#docregions_.

检查那个定义了两个嵌套*#docregions*的 `src/app/app.component.ts` 文件。

The inner, `class-skeleton` region appears twice, once to capture the code that opens the class definition and once to capture the code that closes the class definition.

内部的 `class-skeleton` 区域出现了两次，一次捕获打开类定义的代码，一次捕获关闭类定义的代码。

<code-example>
// #docplaster
...
// #docregion class, class-skeleton
export class AppComponent {
// #enddocregion class-skeleton
  title = 'Authors Style Guide Sample';
  heroes = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
// #docregion class-skeleton
}
// #enddocregion class, class-skeleton
</code-example>

onSelect（hero：Hero）：void {this.selectedHero = hero; } // #docregion class-skeleton} // #enddocregion class，class-skeleton

Here's are the two corresponding code snippets displayed side-by-side.

这里是并排显示的两个相应的代码片段。

<code-tabs>
  <code-pane
    header="app.component.ts (class)"
    path="docs-style-guide/src/app/app.component.ts"
    region="class">
  </code-pane>
  <code-pane
    header="app.component.ts (class-skeleton)"
    path="docs-style-guide/src/app/app.component.ts"
    region="class-skeleton">
  </code-pane>
</code-tabs>

Some observations:

一些意见：

* The `#docplaster` at the top is another bit of code snippet markup. It tells the processor how to join the fragments into a single snippet.

  顶部的 `#docplaster` 是另一段代码片段标记。它告诉处理器如何把片段连成一个片段。

  In this example, we tell the processor to put the fragments together without anything in between - without any "plaster".  Most sample files define this _empty plaster_.

  在这个例子中，我们告诉处理器把碎片放在一起，两者之间没有任何东西 - 没有任何“石膏”。大多数样本文件定义了这个*空白膏药*

  If we neglected to add, `#docplaster`, the processor would insert the _default_ plaster - an ellipsis comment - between the fragments. Try removing the `#docplaster` comment yourself to see the effect.

  如果我们忽略添加 `#docplaster`，处理器就会在片段之间插入一个*默认的* plaster `#docplaster` 省略号注释）。尝试自己删除 `#docplaster` 评论以查看效果。

* One `#docregion` comment mentions **_two_** region names as does an `#enddocregion` comment. This is a convenient way to start (or stop) multiple regions on the same code line. You could have put these comments on separate lines and many authors prefer to do so.

  `#docregion` 一个注释提到了***两个***区域的名字，`#enddocregion` 注释也是如此。这是在同一代码行中启动（或停止）多个区域的便捷方式。你可以把这些注释放在不同的行上，很多作者都喜欢这样做。

#### JSON files

#### JSON 文件

Code snippet markup is not supported for JSON files because comments are forbidden in JSON files.

JSON 文件不支持代码片断标记，因为 JSON 文件中的注释是被禁止的。

You can display an entire JSON file by referring to it in the `src` attribute.
But you can't display JSON fragments because you can't add `#docregion` tags to the file.

你可以在 `src` 属性中引用它来显示一个完整的 JSON 文件。但你无法显示 JSON 片段，因为你无法在文件中添加 `#docregion` 标签。

If the JSON file is too big, you could copy the nodes-of-interest into markdown backticks.

如果 JSON 文件太大，你可以将感兴趣的节点复制到 markdown 反引号中。

Unfortunately, it's easy to mistakenly create invalid JSON that way. The preferred way is to create a JSON partial file with the fragment you want to display.

不幸的是，用这种方式错误地创建无效的 JSON 很容易。首选的方法是使用要显示的片段创建一个 JSON 部分文件。

You can't test this partial file and you'll never use it in the application. But at least your IDE can confirm that it is syntactically correct.

你无法测试这个局部文件，也决不会在应用中使用它。但至少你的 IDE 可以确认它在语法上是正确的。

Here's an example that excerpts certain scripts from `package.json` into a partial file named `package.1.json`.

这是一个从 `package.json` 摘录到某个名为 `package.1.json` 的部分文件的例子。

<code-example
  path="docs-style-guide/package.1.json"
  header="package.json (selected scripts)"></code-example>

```html
<code-example
  path="docs-style-guide/package.1.json"
  header="package.json (selected scripts)"></code-example>
```

#### Partial file naming

#### 部分文件命名

Many guides tell a story. In that story, the app evolves incrementally, often with simplistic or incomplete code along the way.

很多导游会讲故事。在那个故事中，该应用会逐步发展，通常会使用简单或不完整的代码。

To tell that story in code, you'll often need to create partial files or intermediate versions of the final source code file with fragments of code that don't appear in the final app.

要想在代码中讲这个故事，你通常需要使用那些没有出现在最终应用中的代码片段来创建最终源代码文件的部分文件或中间版本。

Such partial and intermediate files need their own names.
Follow the doc sample naming convention. Add a number before the file extension as illustrated here:

这些局部文件和中间文件都需要自己的名字。按照 doc 示例命名约定进行操作。在文件扩展名前加一个数字，如下图所示：

```html
package.1.json
app.component.1.ts
app.component.2.ts
```

You'll find many such files among the samples in the Angular documentation.

在 Angular 的文档中，你可以在样本中找到很多这样的文件。

Remember to exclude these files from stackblitz by listing them in the `stackblitz.json` as illustrated here.

记得把它们写在 `stackblitz.json`，从 stackblitz 中排除这些文件，如下所示。

<code-example
  path="docs-style-guide/stackblitz.json"
  header="stackblitz.json"></code-example>

{@a live-examples}

## Live examples

## 实例

By adding `<live-example>` to the page you generate links that run sample code in the Stackblitz live coding environment and download that code to the reader's file system.

通过在页面中添加 `<live-example>`，你可以生成在 Stackblitz 实时编码环境中运行示例代码的链接，并把它下载到读者的文件系统中。

Live examples (AKA "stackblitz") are defined by one or more `stackblitz.json` files in the root of a code sample folder. Each sample folder usually has a single unnamed definition file, the default `stackblitz.json`.

实例（AKA“stackblitz”）由代码示例文件夹根目录下的一个或多个 `stackblitz.json` 文件定义。每个示例文件夹通常都有一个无名的定义文件，默认是 `stackblitz.json`。

<div class="alert is-helpful">

You can create additional, named definition files in the form `name.stackblitz.json`. See `content/examples/testing` for examples.

你可以通过 `name.stackblitz.json` 格式创建其它的命名定义文件。参见 `content/examples/testing` 中的例子。

The schema for a `stackblitz.json` hasn't been documented yet but looking at the `stackblitz.json` files in the example folders should tell you most of what you need to know.

`stackblitz.json` 的架构还没有被记录下来，但查看示例文件夹中的 `stackblitz.json` 文件可以告诉你大部分需要知道的事情。

</div>

Adding `<live-example></live-example>` to the page generates the two default links.

在页面中添加 `<live-example></live-example>` 可以生成两个默认链接。

<live-example></live-example>

1. a link to the Stackblitz defined by the default `stackblitz.json` file located in the code sample folder with the same name as the guide page.

   指向 stackblitz 的链接，该堆栈是由默认的 `stackblitz.json` 文件定义的，该文件位于代码示例文件夹目录下，其名称与该引导页面同名。

2. a link that downloads that sample.

   下载该示例的链接

Clicking the first link opens the code sample on StackBlitz in a new browser tab.

单击第一个链接可以在新的浏览器选项卡中打开 StackBlitz 上的代码示例。

You can change the appearance and behavior of the live example with attributes and classes.

你可以用属性和类来改变实例的外观和行为。

<h3 class="no-toc">Custom label and tooltip</h3>

Give the live example anchor a custom label and tooltip by setting the `title` attribute.

通过设置 `title` 属性，给 live 参数锚定一个自定义标签和工具提示。

<live-example title="Live Example with title"></live-example>

```html
<live-example title="Live Example with title"></live-example>
```

You can achieve the same effect by putting the label between the `<live-example>` tags:

你可以把标签放在 `<live-example>` 标签之间来达到同样的效果：

<live-example>Live example with content label</live-example>

包含内容标签的实例

```html
<live-example>Live example with content label</live-example>
```

<h3 class="no-toc">Live example from another guide</h3>

To link to a Stackblitz in a folder whose name is not the same as the current guide page, set the `name` attribute to the name of that folder.

要链接到名字与当前指南页不同的文件夹中的 Stackblitz，请把 `name` 属性设置为该文件夹的名字。

<live-example name="router">Live Example from the Router guide</live-example>

“路由器指南”中的“实例”

```html
<live-example name="router">Live Example from the Router guide</live-example>
```

<h3 class="no-toc">Live Example for named Stackblitz</h3>

To link to a Stackblitz defined by a named `stackblitz.json` file, set the `stackblitz` attribute. The following example links to the Stackblitz defined by `second.stackblitz.json` in the current guide's directory.

要链接到一个名叫 `stackblitz.json` 文件，请设置 `stackblitz` 属性。下列例子链接到当前指南目录下的 second.stackblitz.json 定义的 `second.stackblitz.json`。

<live-example stackblitz="second"></live-example>

```html
<live-example stackblitz="second"></live-example>
```

<h3 class="no-toc">Live Example without download</h3>

To skip the download link, add the `noDownload` attribute.

要跳过这个下载链接，`noDownload` 添加 `noDownload` 属性。

<live-example noDownload>Just the Stackblitz</live-example>

就是 Stackblitz

```html
<live-example noDownload>Just the Stackblitz</live-example>
```

<h3 class="no-toc">Live Example with download-only</h3>

To skip the live Stackblitz link and only link to the download, add the `downloadOnly` attribute.

要跳过 Stackblitz 的实时链接，只能链接到下载地址，你可以添加 `downloadOnly` 属性。

<live-example downloadOnly>Download only</live-example>

只下载

```html
<live-example downloadOnly>Download only</live-example>
```

<h3 class="no-toc">Embedded live example</h3>

By default, a live example link opens a Stackblitz in a separate browser tab.
You can embed the Stackblitz within the guide page itself by adding the `embedded` attribute.

默认情况下，实例链接会在单独的浏览器选项卡中打开 Stackblitz。你可以通过 `embedded` 属性在指南页面中嵌入 Stackblitz。

For performance reasons, the Stackblitz does not start right away. The reader sees an image instead. Clicking the image starts the sometimes-slow process of launching the embedded Stackblitz within an iframe on the page.

出于性能原因，Stackblitz 并没有马上启动。读者会看到一幅图像。单击该图片可以启动在页面上的 iframe 中启动嵌入式 Stackblitz 的慢速启动过程。

Here's an embedded live example for this guide.

这里是本指南的嵌入式实例。

```html
<live-example embedded></live-example>
```

<live-example embedded></live-example>

{@a anchors}

## Anchors

## 锚点

Every section header tag is also an anchor point. Another guide page could add a link to this section by writing:

每个 section header 标签都是一个锚点。另一个指南页面可以写一下这个部分的链接：

<div class="alert is-helpful">

See the ["Anchors"](guide/docs-style-guide#anchors "Style Guide - Anchors") section for details.

有关详细信息，请参阅[“锚点”](guide/docs-style-guide#anchors "时尚指南 - 船锚")部分。

</div>

```html
<div class="alert is-helpful">

See the ["Anchors"](guide/docs-style-guide#anchors "Style Guide - Anchors") section for details.

</div>
```

When navigating within the page, you can omit the page URL when specifying the link that [scrolls up](#anchors "Anchors") to the beginning of this section.

在页面中导航时，你可以在指定[滚动](#anchors "锚点")到本节开头的链接时省略页面的 URL。

```html
... the link that [scrolls up](#anchors "Anchors") to ...
```

{@a ugly-anchors}

#### Ugly, long section header anchors

#### 丑陋的长节头锚

It is often a good idea to *lock-in* a good anchor name.

*锁定*一个好的锚名通常是个好主意。

Sometimes the section header text makes for an unattractive anchor. [This one](#ugly-long-section-header-anchors) is pretty bad.

这段 section header 文本有时会产生一个不具吸引力的锚点。[这个](#ugly-long-section-header-anchors)非常糟糕。

```html
[This one](#ugly-long-section-header-anchors) is pretty bad.
```

The greater danger is that **a future rewording of the header text would break** a link to this section.

更大的危险是，**标题文本未来的重写会破坏**本章的链接。

For these reasons, it is often wise to add a custom anchor explicitly, just above the heading or
text to which it applies, using the special `{@a name}` syntax like this.

出于这些原因，明智的做法是使用特殊的 `{@a name}` 语法，明确地添加一个自定义锚点，就在它所应用的标题或文本的上方。

<code-example  language="html">
  &#123;@a ugly-anchors&#125;

  #### Ugly, long section header anchors

  #### 丑陋的长节头锚

</code-example>

Now [link to that custom anchor name](#ugly-anchors) as you did before.

现在就像之前那样[链接到那个自定义锚名称](#ugly-anchors)。

```html
Now [link to that custom anchor name](#ugly-anchors) as you did before.
```

<div class="alert is-helpful">

Alternatively, you can use the HTML `<a>` tag.

或者，你也可以使用 HTML `<a>` 标签。

If you do, be sure to set the `id` attribute - not the `name` attribute! The docs generator will not convert the `name` to the proper link URL.

如果你这样做，一定要设置 `id` 属性 - 而不是 `name` 属性！ docs 生成器不会把这个 `name` 转换成正确的链接 URL。

```html
<a id="anchors"></a>

## Anchors
```

</div>

## Alerts and Calllouts

## 警报和 Calllouts

Alerts and callouts present warnings, extra detail or references to other pages. They can also be used to provide commentary that _enriches_ the reader's understanding of the content being presented.

警报和标注会显示警告，额外的细节或对其它页面的引用。它们还可以用来提供评论，*丰富*读者对正在渲染的内容的理解。

An alert or callout _must not_ contain anything _essential_ to that understanding. Don't put a critical instruction or a tutorial step in a subsection.

警告或标注*不得*含有对理解*至关重要的信息*。不要把一个重要的指令或一个指导步骤放进一个小节中。

### Alerts

### 提醒

Alerts draw attention to short important points. Alerts should not be used for multi-line content (use [callouts](#callouts "callouts") instead).

提示会引起人们的注意。警报不应该用于多行内容（改为使用[标注](#callouts "标注") ）。

<div class="alert is-helpful">

  You'll learn about styles for live examples in the [section below](guide/docs-style-guide#live-examples "Live examples").

你还会从[下面](guide/docs-style-guide#live-examples "实例")的[章节中](guide/docs-style-guide#live-examples "实例")了解实例的风格。

</div>

  Note that at least one blank line must follow both the opening and closing `<div>` tags. A blank line before the closing `</div>` is customary but not required.

请注意，开始和结束的 `<div>` 标记都必须至少有一个空白行。在结束 `</div>` 之前的一个空白行是惯用的但不是必需的。

```html
<div class="alert is-helpful">

You'll learn about styles for live examples in the [section below](guide/docs-style-guide#live-examples "Live examples").

</div>
```

There are three different _urgency levels_ used to style the alerts based on the severity or importance of the content.

根据内容的严重程度或重要性，有三种不同的*紧急程度*用来对警报进行风格设置。

<div class="alert is-critical">

A critical alert.

一个关键的警报

</div>

<div class="alert is-important">

An important alert.

一个重要的警示。

</div>

<div class="alert is-helpful">

A helpful, informational alert.

一个有用的信息警报。

</div>

Here is the markup for these alerts.

这是这些警报的标记。

```html
<div class="alert is-critical">

A critical alert.

</div>

<div class="alert is-important">

An important alert.

</div>

<div class="alert is-helpful">

A helpful, informational alert.

</div>
```

### Callouts

### 标注

Callouts, like alerts, are meant to draw attention to important points. Use a callout when you want a riveting header and multi-line content.

标注（比如警报）就是为了引起人们对重点的注意。如果你想要一个铆接头和多行内容，请使用 callout。

If you have more than two paragraphs, consider creating a new page or making it part of the main content.

如果你有两个以上的段落，考虑创建一个新的页面，或者让它成为主要内容的一部分。

Callouts use the same _urgency levels_ that alerts do.

标注使用与警报相同的*紧急程度*。

<div class="callout is-critical">
<header>A critical point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

**干草叉连帽衫符文系列**，屋顶派对弹出*古代*信使斜挎包信誉卡尔斯蓬乱的特吕弗年代。符号学：符拉西奇（Viroredweven）的“符号学”（Semiotics viral freegan VHS）。Intelligentsia 羽衣甘蓝筹码副四美元吐司

</div>

<div class="callout is-important">
<header>An important point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

**干草叉连帽衫符文系列**，屋顶派对弹出式*古代*信使包信得卡尔斯凌乱的特吕弗。符号学：符拉西奇（Viroredweven）的“符号学”（Semiotics viral freegan VHS）。Intelligentsia 羽衣甘蓝筹码副四美元吐司

</div>

<div class="callout is-helpful">
<header>A helpful or informational point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

**干草叉连帽衫符文系列**，屋顶派对弹出式*古代*信使包信得卡尔斯凌乱的特吕弗。符号学：符拉西奇（Viroredweven）的“符号学”（Semiotics viral freegan VHS）。Intelligentsia 羽衣甘蓝筹码副四美元吐司

</div>

Here is the markup for the first of these callouts.

这是第一个标注中的标记。

```html
<div class="callout is-critical">
<header>A critical point</header>

**Pitchfork hoodie semiotics**, roof party pop-up _paleo_ messenger bag cred Carles tousled Truffaut yr. Semiotics viral freegan VHS, Shoreditch disrupt McSweeney's. Intelligentsia kale chips Vice four dollar toast

</div>
```

Notice that:

注意：

* the callout header text is forced to all upper case

  callout 标题文本强制全部用大写形式写成

* the callout body can be written in markdown

  标注体可以用 markdown 来书写

* a blank line separates the `</header>` tag from the markdown content

  一个空白行用来区分 `</header>` 标记和 markdown 内容

Callouts are meant to grab the user's attention. They are not for casual asides. Please use them sparingly.

标注旨在引起用户的注意。他们不是偶然的旁白。请谨慎使用它们。

## Trees

## 树木

Trees can represent hierarchical data.

树可以表示分层数据。

<div class='filetree'>

  <div class='file'>
    sample-dir
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>

Here is the markup for this file tree.

这是这个文件树的标记。

```html
<div class='filetree'>
    <div class='file'>
        sample-dir
    </div>
    <div class='children'>
        <div class='file'>
          src
        </div>
        <div class='children'>
            <div class='file'>
              app
            </div>
            <div class='children'>
                <div class='file'>
                  app.component.ts
                </div>
                <div class='file'>
                  app.module.ts
                </div>
            </div>
            <div class='file'>
              styles.css
            </div>
            <div class='file'>
              tsconfig.json
            </div>
        </div>
        <div class='file'>
          node_modules ...
        </div>
        <div class='file'>
          package.json
        </div>
    </div>
</div>
```

## Tables

## 表格

Use HTML tables to present tabular data.

使用 HTML 表来表达表格式数据。

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Framework</th>
    <th>Task</th>
    <th>Speed</th>
  </tr>
  <tr>
    <td><code>AngularJS</code></td>
    <td>Routing</td>
    <td>Fast</td>
  </tr>
  <tr>
    <td><code>Angular v2</code></td>
    <td>Routing</td>
    <!-- can use markdown too; remember blank lines -->
    <td>

      *Faster*

    </td>
  </tr>
  <tr>
    <td><code>Angular v4</code></td>
    <td>Routing</td>
    <td>

      **Fastest :)**

    </td>
  </tr>
</table>

Here is the markup for this table.

这是这个表的标记。

```html
<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Framework</th>
    <th>Task</th>
    <th>Speed</th>
  </tr>
  <tr>
    <td><code>AngularJS</code></td>
    <td>Routing</td>
    <td>Fast</td>
  </tr>
  <tr>
    <td><code>Angular v2</code></td>
    <td>Routing</td>
    <!-- can use markdown too; remember blank lines -->
    <td>

      *Faster*

    </td>
  </tr>
  <tr>
    <td><code>Angular v4</code></td>
    <td>Routing</td>
    <td>

      **Fastest :)**

    </td>
  </tr>
</table>
```

## Images

## 图片

<h3 class="no-toc">Image location</h3>

Store images in the `content/images` directory in a folder with the same URL as the guide page.
Images for this "Authors Style Guide" page belong in the `content/images/guide/docs-style-guide` folder.

将 images `content/images` 目录中的 `content/images` 在与该指南页面具有相同 URL 的文件夹中。这个“作者风格指南”页面的 `content/images/guide/docs-style-guide` 属于 `content/images/guide/docs-style-guide` 文件夹。

Angular doc generation copies these image folders to the _runtime_ location, `generated/images`.
Set the image `src` attribute to begin in _that_ directory.

Angular doc generation 会把这些图像文件夹拷贝到*runtime* `generated/images` 的*运行时*位置。将 image `src` 属性设置*为该*目录下的开始。

Here's the `src` attribute for the "flying hero" image belonging to this page.

这是属于这个页面的“飞行英雄”图像的 `src` 属性。

```
src="generated/images/guide/docs-style-guide/flying-hero.png"
```

<h3 class="no-toc">Use the HTML <i>&lt;img&gt;</i> tag</h3>

**Do not use the markdown image syntax, \!\[\.\.\.\]\(\.\.\.\).**

**不要使用降价图像语法！\[...]（...）。**

Images should be specified in an `<img>` tag.

图像应该在 `<img>` 标签中指定。

For accessibility, always set the `alt` attribute with a meaningful description of the image.

为了便于访问，我们总是用一个有意义的图片描述来设置 `alt` 属性。

You should nest the `<img>` tag within a `<div class="lightbox">` tag, which styles the image within a drop-shadow frame. You'll need the editor's permission to skip the `lightbox` class on its `div` encapsulation.

你应该把 `<img>` 标签嵌套在一个 `<div class="lightbox">` 标签中，该标签用来为阴影框内的图像设置风格。你需要编辑的跳过许可 `lightbox` 于它的类 `div` 封装。

Here's a conforming example

这是一个很有道理的例子

<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying hero">
</div>

```html
<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying hero">
</div>
```

_Note that the HTML image element does not have a closing tag._

*请注意，HTML 图片元素没有结束标记。*

<h3 class="no-toc">Image dimensions</h3>

The doc generator reads the image dimensions from the file and adds width and height attributes to the `img` tag automatically. If you want to control the size of the image, supply your own width and height attributes.

doc 生成器从文件中读取图像尺寸，并自动为 `img` 标签添加 width 和 height 属性。如果要控制图像的大小，请提供自己的 width 和 height 属性。

Here's the "flying hero" at a more reasonable scale.

这里是“飞行英雄”，规模更合理。

<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="200">
</div>

```html
<div class="lightbox">
  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="200">
</div>
```

Wide images can be a problem. Most browsers try to rescale the image but wide images may overflow the document in certain viewports.

宽视频可能是个问题。大多数浏览器尝试对图像进行重新缩放，但是在某些视口中，宽图像可能会溢出文档。

**Do not set a width greater than 700px**. If you wish to display a larger image, provide a link to the actual image that the user can click on to see the full size image separately as in this example of `source-map-explorer` output from the "Ahead-of-time Compilation" guide:

**不要设置大于 700px 的宽度**。如果你想显示一个更大的图像，提供一个指向实际图像的链接，用户可以点击它来分别查看全尺寸图像，就像“Ahead-of-time 编译”中 `source-map-explorer` 输出的例子一样。指南：

<a href="generated/images/guide/docs-style-guide/toh-pt6-bundle.png" title="Click to view larger image">
  <div class="lightbox">
    <img src="generated/images/guide/docs-style-guide/toh-pt6-bundle-700w.png" alt="toh-pt6-bundle" width="300px">
  </div>
</a>

<h3 class="no-toc">Image compression</h3>

Large image files can be slow to load, harming the user experience. Always compress the image.
Consider using an image compression web site such as [tinypng](https://tinypng.com/ "tinypng").

大图像文件加载速度慢，损害了用户体验。始终压缩图像。考虑使用图片压缩网站，比如[tinypng](https://tinypng.com/ "tinypng")。

<h3 class="no-toc">Floating images</h3>

You can float the image to the left or right of text by applying the class="left" or class="right" attributes respectively.

你可以通过分别应用 class =“left”或 class =“right”来把图片浮动到文本的左侧或右侧。

<img src="generated/images/guide/docs-style-guide/flying-hero.png"
   alt="flying Angular hero"
   width="200"
   class="left">

![飞 Angular 英雄](generated/images/guide/docs-style-guide/flying-hero.png)

This text wraps around to the right of the floating "flying hero" image.

这段文字环绕着浮动的“飞行英雄”形象的右侧。

Headings and code-examples automatically clear a floating image. If you need to force a piece of text to clear a floating image, add `<br class="clear">` where the text should break.

标题和代码示例会自动清除浮动图像。如果你需要强制一段文字来清除漂浮的图片，你可以添加 `<br class="clear">` 文本中断的地方。

<br class="clear">

The markup for the above example is:

上例中的标记是：

```html
<img src="generated/images/guide/docs-style-guide/flying-hero.png"
   alt="flying Angular hero"
   width="200"
   class="left">

This text wraps around to the right of the floating "flying hero" image.

Headings and code-examples automatically clear a floating image. If you need to force a piece of text to clear a floating image, add `<br class="clear">` where the text should break.

<br class="clear">
```

Note that you generally don't wrap a floating image in a `<figure>` element.

请注意，通常不会在 `<figure>` 元素中包装浮动图像。

#### Floating within a subsection

#### 漂浮在一个小节里面

If you have a floating image inside an alert, callout, or a subsection, it is a good idea to apply the `clear-fix` class to the `div` to ensure that the image doesn't overflow its container. For example:

如果在 alert，callout 或子 section 中都有浮动图像，最好把 `clear-fix` 类应用到 `div` 以确保该图像不会溢出其容器。例如：

<div class="alert is-helpful clear-fix">

  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="100"
    class="right">

![飞 Angular 英雄](generated/images/guide/docs-style-guide/flying-hero.png)

  A subsection with **markdown** formatted text.

带有**markdown**格式文本的子**分区**。

</div>

```html
<div class="alert is-helpful clear-fix">

  <img src="generated/images/guide/docs-style-guide/flying-hero.png"
    alt="flying Angular hero"
    width="100"
    class="right">

  A subsection with **markdown** formatted text.

</div>
```
