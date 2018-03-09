# Webpack: An Introduction

# Webpack简介

<style>
  h4 {font-size: 17px !important; text-transform: none !important;}
  .syntax { font-family: Consolas, 'Lucida Sans', Courier, sans-serif; color: black; font-size: 85%; }

</style>

[**Webpack**](https://webpack.github.io/) is a popular module bundler,
a tool for bundling application source code in convenient _chunks_
and for loading that code from a server into a browser.

[**Webpack**](https://webpack.github.io/)是一个广受欢迎的模块打包器，
这个工具用来把程序源码打包到一些方便易用的_块_中，以便把这些代码从服务器加载到浏览器中。

It's an excellent alternative to the *SystemJS* approach used elsewhere in the documentation.
This guide offers a taste of Webpack and explains how to use it with Angular applications.

它是我们在文档中到处使用的*SystemJS*的一个优秀替代品。这篇指南会带我们尝尝Webpack的滋味，并解释如何在Angular程序中使用它。

{@a top}

<!--

# Contents

# 目录

* [What is Webpack?](guide/webpack#what-is-webpack)

   [什么是Webpack？](guide/webpack#what-is-webpack)

  * [Entries and outputs](guide/webpack#entries-outputs)

     [入口与输出](guide/webpack#entries-outputs)

  * [Multiple bundles](guide/webpack#multiple-bundles)

     [多重包](guide/webpack#multiple-bundles)

  * [Loaders](guide/webpack#loaders)

     [加载器](guide/webpack#loaders)

  * [Plugins](guide/webpack#plugins)

     [插件](guide/webpack#plugins)

* [Configuring Webpack](guide/webpack#configure-webpack)

   [配置Webpack](guide/webpack#configure-webpack)

  * [Polyfills](guide/webpack#polyfills)

  * [Common configuration](guide/webpack#common-configuration)

     [公共配置](guide/webpack#common-configuration)

  * [Inside `webpack.common.js`](guide/webpack#inside-webpack-commonjs)

     [深入`webpack.common.js`](guide/webpack#inside-webpack-commonjs)

    * [entry](guide/webpack#common-entries)

       [入口](guide/webpack#common-entries)

    * [resolve extension-less imports](guide/webpack#common-resolves)

       [解析无扩展名的导入](guide/webpack#common-resolves)

    * [`module.rules`](guide/webpack#common-rules)

    * [Plugins](guide/webpack#plugins)

       [插件](guide/webpack#plugins)

    * [`CommonsChunkPlugin`](guide/webpack#commons-chunk-plugin)

    * [`HtmlWebpackPlugin`](guide/webpack#html-webpack-plugin)

  * [Environment specific configuration](guide/webpack#environment-configuration)

     [针对特定环境进行配置](guide/webpack#environment-configuration)

  * [Development configuration](guide/webpack#development-configuration)

     [开发环境配置](guide/webpack#development-configuration)

  * [Production configuration](guide/webpack#production-configuration)

     [生产环境配置](guide/webpack#production-configuration)

  * [Test configuration](guide/webpack#test-configuration)

     [测试环境配置](guide/webpack#test-configuration)

* [Trying it out](guide/webpack#try)

   [试一下](guide/webpack#try)

* [Highlights](guide/webpack#highlights)

   [重点](guide/webpack#highlights)

* [Conclusion](guide/webpack#conclusion)

   [总结](guide/webpack#conclusion)

-->

You can also <a href="generated/zips/webpack/webpack.zip" target="_blank">download the final result.</a>

你还可以<a href="generated/zips/webpack/webpack.zip" target="_blank">点这里下载最终结果</a>。

{@a what-is-webpack}

## What is Webpack?

## 什么是Webpack？

Webpack is a powerful module bundler.
A _bundle_ is a JavaScript file that incorporates _assets_ that *belong* together and
should be served to the client in a response to a single file request.
A bundle can include JavaScript, CSS styles, HTML, and almost any other kind of file.

Webpack是一个强力的模块打包器。
所谓_包(bundle)_就是一个JavaScript文件，它把一堆_资源(assets)_合并在一起，以便它们可以在同一个文件请求中发回给客户端。
包中可以包含JavaScript、CSS样式、HTML以及很多其它类型的文件。

Webpack roams over your application source code,
looking for `import` statements, building a dependency graph, and emitting one or more _bundles_.
With plugins and rules, Webpack can preprocess and minify different non-JavaScript files such as TypeScript, SASS, and LESS files.

Webpack会遍历你应用中的所有源码，查找`import`语句，构建出依赖图谱，并产出一个(或多个)_包_。
通过插件和规则，Webpack可以对各种非JavaScript文件进行预处理和最小化(Minify)，比如TypeScript、SASS和LESS文件等。

You determine what Webpack does and how it does it with a JavaScript configuration file, `webpack.config.js`.

我们通过一个JavaScript配置文件`webpack.config.js`来决定Webpack做什么以及如何做。

{@a entries-outputs}

### Entries and outputs

### 入口与输出

You supply Webpack with one or more *entry* files and let it find and incorporate the dependencies that radiate from those entries.
The one entry point file in this example is the application's root file, `src/main.ts`:

我们给Webpack提供一个或多个*入口*文件，来让它查找与合并那些从这些入口点发散出去的依赖。
在下面这个例子中，我们的入口点是该应用的根文件`src/app.ts`：

<code-example path="webpack/config/webpack.common.js" region="one-entry" title="webpack.config.js (single entry)" linenums="false">

</code-example>

Webpack inspects that file and traverses its `import` dependencies recursively.

Webpack探查那个文件，并且递归遍历它的`import`依赖。

<code-example path="webpack/src/app/app.component.ts" region="component" title="src/main.ts" linenums="false">

</code-example>

It sees that you're importing `@angular/core` so it adds that to its dependency list for potential inclusion in the bundle.
It opens the `@angular/core` file and follows _its_ network of `import` statements until it has built the complete dependency graph from `main.ts` down.

这里，Webpack看到我们正在导入`@angular/core`，于是就这个文件加入到它的依赖列表里，为(有可能)把该文件打进包中做准备。
它打开`@angular/core`并追踪由_该文件的_`import`语句构成的网络，直到构建出从`main.ts`往下的整个依赖图谱。

Then it **outputs** these files to the `app.js` _bundle file_ designated in configuration:

然后它把这些文件**输出**到当前配置所指定的_包文件_`app.js`中：

<code-example name="webpack.config.js (single output)" language="javascript">

  output: {
    filename: 'app.js'
  }

</code-example>

This `app.js` output bundle is a single JavaScript file that contains the application source and its dependencies.
You'll load it later with a `<script>` tag in the `index.html`.

这个`app.js`输出包是个单一的JavaScript文件，它包含程序的源码及其所有依赖。
  后面我们将在`index.html`中用`<script>`标签来加载它。

{@a multiple-bundles}

#### Multiple bundles

#### 多重包

You probably don't want one giant bundle of everything.
It's preferable to separate the volatile application app code from comparatively stable vendor code modules.

我们可能不会希望把所有东西打进一个巨型包，而更喜欢把多变的应用代码从相对稳定的第三方提供商模块中分离出来。

Change the configuration so that it has two entry points, `main.ts` and `vendor.ts`:

所以要修改配置，以获得两个入口点：`main.ts`和`vendor.ts`：

<code-example language="javascript">

  entry: {
    app: 'src/app.ts',
    vendor: 'src/vendor.ts'
  },

  output: {
    filename: '[name].js'
  }

</code-example>

Webpack constructs two separate dependency graphs
and emits *two* bundle files, one called `app.js` containing only the application code and
another called `vendor.js` with all the vendor dependencies.

Webpack会构造出两个独立的依赖图谱，并产出*两个*包文件：一个叫做`app.js`，它只包含我们的应用代码；另一个叫做`vendor.js`，它包含所有的提供商依赖。

<div class="l-sub-section">

The `[name]` in the output name is a *placeholder* that a Webpack plugin replaces with the entry names,
`app` and `vendor`. Plugins are [covered later](guide/webpack#commons-chunk-plugin) in the guide.

在输出文件名中出现的`[name]`是一个Webpack的*占位符*，它将被一个Webpack插件替换为入口点的名字，分别是`app`和`vendor`。插件在本章的[稍后部分](guide/webpack#commons-chunk-plugin)讲解。

</div>

To tell Webpack what belongs in the vendor bundle,
add a `vendor.ts` file that only imports the application's third-party modules:

要想告诉Webpack哪些文件属于vendor包，可以添加一个`vendor.ts`文件，它只导入该应用的第三方模块：

<code-example path="webpack/src/vendor.ts" title="src/vendor.ts" linenums="false">

</code-example>

{@a loaders}

### Loaders

### 加载器(Loader)

Webpack can bundle any kind of file: JavaScript, TypeScript, CSS, SASS, LESS, images, HTML, fonts, whatever.
Webpack _itself_ only understands JavaScript files.
Teach it to transform non-JavaScript file into their JavaScript equivalents with *loaders*.
Configure loaders for TypeScript and CSS as follows.

Webpack可以打包任何类型的文件：JavaScript、TypeScript、CSS、SASS、LESS、图片、HTML以及字体文件等等。
但Webpack*本身*只认识JavaScript文件。
我们要通过*加载器*来告诉它如何把这些文件处理成JavaScript文件。
在这里，我们为TypeScript和CSS文件配置了加载器。

<code-example language="javascript">

  rules: [
    {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader'
    },
    {
      test: /\.css$/,
      loaders: 'style-loader!css-loader'
    }
  ]

</code-example>

When Webpack encounters `import` statements like the following,
it applies the `test` RegEx patterns.

当Webpack遇到如下所示的`import`语句时，它就会调用正则表达式的`test`方法。

<code-example language="typescript">

  import { AppComponent } from './app.component.ts';

  import 'uiframework/dist/uiframework.css';

</code-example>

When a pattern matches the filename, Webpack processes the file with the associated loader.

如果一个模式匹配上文件名，Webpack就用它所关联的加载器处理这个文件。

The first `import` file matches the `.ts` pattern so Webpack processes it with the `awesome-typescript-loader`.
The imported file doesn't match the second pattern so its loader is ignored.

第一个`import`文件匹配上了`.ts`模式，于是Webpack就用`awesome-typescript-loader`加载器处理它。
导入的文件没有匹配上第二个模式，于是它的加载器就被忽略了。

The second `import` matches the second `.css` pattern for which you have *two* loaders chained by the (!) character.
Webpack applies chained loaders *right to left*. So it applies
the `css` loader first to flatten CSS `@import` and `url(...)` statements.
Then it applies the `style` loader to append the css inside `<style>` elements on the page.

第二个`import`匹配上了第二个`.css`模式，它有两个用叹号字符(`!`)串联起来的加载器。
Webpack会*从右到左*逐个应用串联的加载器，于是它先应用了`css`加载器(用来平面化CSS的`@import`和`url(...)`语句)，
然后应用了`style`加载器(用来把css追加到页面上的*&lt;style&gt;*元素中)。

{@a plugins}

### Plugins

### 插件

Webpack has a build pipeline with well-defined phases.
Tap into that pipeline with plugins such as the `uglify` minification plugin:

Webpack有一条构建流水线，它被划分成多个经过精心定义的阶段(phase)。
我们可以把插件(比如`uglify`代码最小化插件)挂到流水线上：

<code-example language="javascript">

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]

</code-example>

{@a configure-webpack}

## Configuring Webpack

## 配置Webpack

After that brief orientation, you are ready to build your own Webpack configuration for Angular apps.

经过简短的培训之后，我们准备为Angular应用构建一份自己的Webpack配置了。

Begin by setting up the development environment.

从设置开发环境开始。

Create a new project folder.

创建一个新的项目文件夹。

<code-example language="sh" class="code-shell">

  mkdir angular-webpack
  cd    angular-webpack

</code-example>

Add these files:

添加下列文件：

<code-tabs>

  <code-pane title="package.json" path="webpack/package.webpack.json">

  </code-pane>

  <code-pane title="src/tsconfig.json" path="webpack/src/tsconfig.1.json">

  </code-pane>

  <code-pane title="webpack.config.js" path="webpack/webpack.config.js">

  </code-pane>

  <code-pane title="karma.conf.js" path="webpack/karma.webpack.conf.js">

  </code-pane>

  <code-pane title="config/helpers.js" path="webpack/config/helpers.js">

  </code-pane>

</code-tabs>

<div class="l-sub-section">

Many of these files should be familiar from other Angular documentation guides,
especially the [Typescript configuration](guide/typescript-configuration) and
[npm packages](guide/npm-packages) guides.

这些文件很多都很眼熟，它们在其他文档里已经出现过，特别是[_TypeScript配置_](guide/typescript-configuration)和[_npm包_](guide/npm-packages)这两章里。

Webpack, the plugins, and the loaders are also installed as packages.
They are listed in the updated `packages.json`.

Webpack，包括它的插件以及加载器，也是以npm包的形式安装的，它们也列在了修改后的 package.json 中。

</div>

Open a terminal window and install the npm packages.

打开命令行窗口并安装这些*npm*包

<code-example language="sh" class="code-shell">

  npm install

</code-example>

{@a polyfills}

### Polyfills

### Polyfills 腻子脚本

You'll need polyfills to run an Angular application in most browsers as explained
in the [Browser Support](guide/browser-support) guide.

我们在[_浏览器支持_](guide/browser-support)章节里解释过，Angular应用要能在大多数的浏览器里运行，它还需要一些polyfills。

Polyfills should be bundled separately from the application and vendor bundles.
Add a `polyfills.ts` like this one to the `src/` folder.

Polyfills最好跟应用代码和vendor代码区分开来单独打包，所以我们需要在`src/`文件夹里添加一个`polyfills.ts`文件，代码如下：

<code-example path="webpack/src/polyfills.ts" title="src/polyfills.ts" linenums="false">

</code-example>

<div class="callout is-critical">

<header>

  Loading polyfills

</header>

Load `zone.js` early within `polyfills.ts`, immediately after the other ES6 and metadata shims.

`polyfills.ts`文件里，`zone.js`库须尽早引入，紧跟在ES6 shims和metadata shims之后。

</div>

Because this bundle file will load first, `polyfills.ts` is also a good place to configure the browser environment
for production or development.

由于这个包最先加载，所以`polyfills.ts`非常适合用来配置浏览器环境，如生产环境配置或是开发环境。

{@a common-configuration}

### Common configuration

### 通用配置

Developers typically have separate configurations for development, production, and test environments.
All three have a lot of configuration in common.

开发、生产、测试等不同的环境通常会分开配置，但实际上这些配置也有很多地方是通用的。

Gather the common configuration in a file called `webpack.common.js`.

我们可以把这些通用的配置收归到一个文件，命名为`webpack.common.js`。

<code-example path="webpack/config/webpack.common.js" title="config/webpack.common.js" linenums="false">

</code-example>

{@a inside-webpack-commonjs}

### Inside _webpack.common.js_

### webpack.common.js解读

Webpack is a NodeJS-based tool that reads configuration from a JavaScript commonjs module file.

Webpack是基于NodeJS的一个工具，它能够从一个*commonjs*规范的JavaScript模块文件里读取配置。

The configuration imports dependencies with `require` statements
and exports several objects as properties of a `module.exports` object.

这个配置文件是通过`require`语句导入依赖，然后将多个对象作为`module.exports`对象的属性导出。

* [`entry`](guide/webpack#common-entries)&mdash;the entry-point files that define the bundles.

   [`entries`](guide/webpack#common-entries) - 包体的入口文件。

* [`resolve`](guide/webpack#common-resolves)&mdash;how to resolve file names when they lack extensions.

   [`resolve`](guide/webpack#common-resolves) - 省略扩展名时如何解释文件名。

* [`module.rules`](guide/webpack#common-rules)&mdash; `module` is an object with `rules` for deciding how files are loaded.

   [`module.rules`](guide/webpack#common-rules) - `module`是一个对象，里面的`rules`属性用来决定文件如何加载。

* [`plugins`](guide/webpack#common-plugins)&mdash;creates instances of the plugins.

   [`plugins`](guide/webpack#common-plugins) - 创建插件的实例。

{@a common-entries}

#### _entry_

#### _entry_ 入口

The first export is the `entry` object:

如上所述，第一个导出的对象是*entries*：

<code-example path="webpack/config/webpack.common.js" region="entries" title="config/webpack.common.js" linenums="false">

</code-example>

This `entry` object defines the three bundles:

`entry`对象定义了三个包：

* `polyfills`&mdash;the polyfills needed to run Angular applications in most modern browsers.

   `polyfills` - 使得Angular应用能够运行在大多数的现代浏览器。

* `vendor`&mdash;the third-party dependencies such as Angular, lodash, and bootstrap.css.

   `vendor` - 第三方依赖，如Angular、lodash和bootstrap.css。

* `app`&mdash;the application code.

   `app` - 应用代码。

{@a common-resolves}

#### _resolve_ extension-less imports

#### _resolve_ 无扩展名的文件导入

The app will `import` dozens if not hundreds of JavaScript and TypeScript files.
You could write `import` statements with explicit extensions like this example:

如果你的应用程序只须`import`几十个JavaScript或TypeScript文件，而不是几百个，你可以在`import`语句里完整写上扩展名，如：

<code-example language="typescript">

  import { AppComponent } from './app.component.ts';

</code-example>

But most `import` statements don't mention the extension at all.
Tell Webpack to resolve extension-less file requests by looking for matching files with
`.ts` extension or `.js` extension (for regular JavaScript files and pre-compiled TypeScript files).

但实际上大部分`import`语句都不带扩展名，我们可以告诉Webpack，在查找这些没有扩展名的文件时，自动加上`.ts`或者`.js`扩展名来匹配。

<code-example path="webpack/config/webpack.common.js" region="resolve" title="config/webpack.common.js" linenums="false">

</code-example>

<div class="l-sub-section">

If Webpack should resolve extension-less files for styles and HTML,
add `.css` and `.html` to the list.

如果我们希望Webapck也能解析不带扩展名的样式和HTML文件，在列表里追加`.css`和`.html`即可。

</div>

{@a common-rules}

#### _module.rules_

#### _module.rules_ 规则

Rules tell Webpack which loaders to use for each file, or module:

Rules用来告诉Webpack加载不同文件或模块时该用哪个加载器。

<code-example path="webpack/config/webpack.common.js" region="loaders" title="config/webpack.common.js" linenums="false">

</code-example>

* `awesome-typescript-loader`&mdash;a loader to transpile the Typescript code to ES5, guided by the `tsconfig.json` file.

   `awesome-typescript-loader` - 一个用于把TypeScript代码转译成ES5的加载器，它会由`tsconfig.json`文件提供指导

* `angular2-template-loader`&mdash;loads angular components' template and styles.

   `angular2-template-loader` - 用于加载Angular组件的模板和样式

* `html-loader`&mdash;for component templates.

   `html-loader` - 为组件模板准备的加载器

* images/fonts&mdash;Images and fonts are bundled as well.

   `images/fonts` - 图片和字体文件也能被打包。

* CSS&mdash;the first pattern matches application-wide styles; the second handles
component-scoped styles (the ones specified in a component's `styleUrls` metadata property).

   CSS - 第一个模式匹配应用级样式，第二个模式匹配组件局部样式(就是在组件元数据的`styleUrls`属性中指定的那些)。

<div class="l-sub-section">

The first pattern is for the application-wide styles. It excludes `.css` files within the `src/app` directory
where the component-scoped styles sit. The `ExtractTextPlugin` (described below) applies the `style` and `css`
loaders to these files.

第一个模式是给全局样式使用的，它排除了`/src/app`目录下的`.css`文件，因为那里放着我们的组件局部样式。
它只包含了那些位于`/src/app`及其上级目录的`.css`文件，那里是应用级样式。
`ExtractTextPlugin`(后面会讲到)使用`style`和`css`加载器来处理这些文件。

The second pattern filters for component-scoped styles and loads them as strings via the `raw-loader`,
which is what Angular expects to do with styles specified in a `styleUrls` metadata property.

第二个模式过滤器是给组件局部样式的，并通过`raw`加载器把它们加载成字符串 —— 那是Angular期望通过元数据的`styleUrls`属性来指定样式的形式。

</div>

<div class="l-sub-section">

Multiple loaders can be chained using the array notation.

多重加载器也能使用数组形式串联起来。

</div>

{@a common-plugins}

#### _plugins_

#### _插件_

Finally, create instances of three plugins:

最后，创建三个插件实例：

<code-example path="webpack/config/webpack.common.js" region="plugins" title="config/webpack.common.js" linenums="false">

</code-example>

{@a commons-chunk-plugin}

#### *CommonsChunkPlugin*

#### *CommonsChunkPlugin* 插件

The `app.js` bundle should contain only application code. All vendor code belongs in the `vendor.js` bundle.

`app.js`包应该只包含应用代码。所有第三方代码都应该放进`vendor.js`包中。

Of course the application code imports vendor code.
On its own, Webpack is not smart enough to keep the vendor code out of the `app.js` bundle.
The `CommonsChunkPlugin` does that job.

当然，应用代码中还是要`imports`第三方代码。
Webpack还没有智能到自动把提供商代码排除在`app.js`包之外的程度。
`CommonsChunkPlugin`插件能完成此工作。

<div class="l-sub-section">

The `CommonsChunkPlugin` identifies the hierarchy among three _chunks_: `app` -> `vendor` -> `polyfills`.
Where Webpack finds that `app` has shared dependencies with `vendor`, it removes them from `app`.
It would remove `polyfills` from `vendor` if they shared dependencies, which they don't.

`CommonsChunkPlugin`标记出了三个_块_之间的等级体系：`app` -> `vendor` -> `polyfills`。
当Webpack发现`app`与`vendor`有共享依赖时，就把它们从`app`中移除。
在`vendor`和`polyfills`之间有共享依赖时也同样如此(虽然它们没啥可共享的)。

</div>

{@a html-webpack-plugin}

#### _HtmlWebpackPlugin_

#### _HtmlWebpackPlugin_ 插件

Webpack generates a number of js and CSS files.
You _could_ insert them into the `index.html` _manually_. That would be tedious and error-prone.
Webpack can inject those scripts and links for you with the `HtmlWebpackPlugin`.

Webpack生成了一些js和css文件。
虽然我们_可以手动_把它们插入到`index.html`中，但那样既枯燥又容易出错。
Webpack可以通过`HtmlWebpackPlugin`自动为我们注入那些`script`和`link`标签。

{@a environment-configuration}

### Environment-specific configuration

### 环境相关的配置

The `webpack.common.js` configuration file does most of the heavy lifting.
Create separate, environment-specific configuration files that build on `webpack.common`
by merging into it the peculiarities particular to the target environments.

`webpack.common.js`配置做了大部分繁重的工作。
通过合并它们特有的配置，我们可以基于`webpack.common`为目标环境创建独立的、环境相关的配置文件。

These files tend to be short and simple.

这些文件越小越简单越好。

{@a development-configuration}

### Development configuration

### 开发环境配置

Here is the `webpack.dev.js` development configuration file.

下面是开发环境的而配置文件`webpack.dev.js`：

<code-example path="webpack/config/webpack.dev.js" title="config/webpack.dev.js" linenums="false">

</code-example>

The development build relies on the Webpack development server, configured near the bottom of the file.

开发环境下的构建依赖于Webpack的开发服务器，我们在靠近文件底部的地方配置了它。

Although you tell Webpack to put output bundles in the `dist` folder,
the dev server keeps all bundles in memory; it doesn't write them to disk.
You won't find any files in the `dist` folder, at least not any generated from *this development build*.

虽然我们告诉Webpack把输出包放到`dist`目录，但实际上开发服务器把这些包都放在了内存里，而不会把它们写到硬盘中。
所以在`dist`目录下是找不到任何文件的(至少现在这个开发环境下构建时没有)。

The `HtmlWebpackPlugin`, added in `webpack.common.js`, uses the `publicPath` and the `filename` settings to generate
appropriate `<script>` and `<link>` tags into the `index.html`.

`HtmlWebpackPlugin`(由`webpack.common.js`引入)插件使用了*`publicPath`*和*`filename`*设置，
来向`index.html`中插入适当的&lt;script&gt;和&lt;link&gt;标签。

The CSS styles are buried inside the Javascript bundles by default. The `ExtractTextPlugin` extracts them into
external `.css` files that the `HtmlWebpackPlugin` inscribes as `<link>` tags into the `index.html`.

默认情况下，我们这些CSS样式会被埋没在JavaScript包中。`ExtractTextPlugin`会把它们提取成外部`.css`文件，
这样`HtmlWebpackPlugin`插件就会转而把一个&lt;link&gt;标签写进`index.html`了。Refer to the [Webpack documentation](https://webpack.github.io/docs/) for details on these and 
other configuration options in this file.要了解本文件中这些以及其它配置项的详情，请参阅[Webpack文档](https://webpack.github.io/docs/)。

Refer to the [Webpack documentation](https://webpack.github.io/docs/) for details on these and
other configuration options in this file.

要想了解本文件中的这些配置项和其它配置项的详情，请参阅 [Webpack 官方文档](https://webpack.github.io/docs/)。

Grab the app code at the end of this guide and try:

抓取本指南底部的应用代码，并试一试：

<code-example language="sh" class="code-shell">

  npm start

</code-example>

{@a production-configuration}

### Production configuration

### 产品环境配置

Configuration of a *production* build resembles *development* configuration with a few key changes.

*产品环境*下的配置和*开发环境*下的配置很相似……除了一些关键的改动。

<code-example path="webpack/config/webpack.prod.js" title="config/webpack.prod.js" linenums="false">

</code-example>

You'll deploy the application and its dependencies to a real production server.
You won't deploy the artifacts needed only in development.

我们希望把应用程序及其依赖都部署到一个真实的产品服务器中。
而不希望部署那些只在开发环境下才用得到的依赖。

Put the production output bundle files in the `dist` folder.

把产品环境的输出包放在`dist`目录下。

Webpack generates file names with cache-busting hash.
Thanks to the `HtmlWebpackPlugin`, you don't have to update the `index.html` file when the hash changes.

Webpack生成的文件名中带有“缓存无效哈希(cache-busting hash)”。
感谢`HtmlWebpackPlugin`插件，当这些哈希值变化时，我们不用去更新`index.html`了。

There are additional plugins:

还有一些别的插件：

* *`NoEmitOnErrorsPlugin`&mdash;stops the build if there is an error.

   *`NoEmitOnErrorsPlugin`* - 如果出错就停止构建。*

* *`UglifyJsPlugin`&mdash;minifies the bundles.

   *`UglifyJsPlugin`* - 最小化(minify)生成的包。

* *`ExtractTextPlugin`&mdash;extracts embedded css as external files, adding cache-busting hash to the filename.

   *`ExtractTextPlugin`* - 把内嵌的css抽取成外部文件，并为其文件名添加“缓存无效哈希”。

* *`DefinePlugin`&mdash;use to define environment variables that you can reference within the application.

   *`DefinePlugin`* - 用来定义环境变量，以便我们在自己的程序中引用它。

* *`LoaderOptionsPlugins`&mdash;to override options of certain loaders.

   *`LoaderOptionsPlugins`* - 为特定的加载器提供选项。

Thanks to the `DefinePlugin` and the `ENV` variable defined at top, you can enable Angular production mode like this:

感谢*DefinePlugin*和顶部定义的`ENV`变量，我们就可以像这样启用Angular的产品模式了：

<code-example path="webpack/src/main.ts" region="enable-prod" title="src/main.ts" linenums="false">

</code-example>

Grab the app code at the end of this guide and try:

抓取本指南底部的应用代码，并试一试：

<code-example language="sh" class="code-shell">

  npm run build

</code-example>

{@a test-configuration}

### Test configuration

### 测试环境配置

You don't need much configuration to run unit tests.
You don't need the loaders and plugins that you declared for your development and production builds.
You probably don't need to load and process the application-wide styles files for unit tests and doing so would slow you down;
you'll use the `null` loader for those CSS files.

我们并不需要使用很多配置项来运行单元测试。
也不需要在开发环境和产品环境下引入的那些加载器和插件。
如果有可能拖慢执行速度，甚至都不需要在单元测试中加载和处理应用全局样式文件，所以我们用一个`null`加载器来处理所有CSS。

You could merge the test configuration into the `webpack.common` configuration and override the parts you don't want or need.
But it might be simpler to start over with a completely fresh configuration.

我们可以把测试环境的配置合并到`webpack.common`配置中，并且改写不想要或不需要的部分。
但是从一个全新的配置开始可能更简单。

<code-example path="webpack/config/webpack.test.js" title="config/webpack.test.js" linenums="false">

</code-example>

Reconfigure [Karma](https://karma-runner.github.io/1.0/index.html) to use Webpack to run the tests:

重新配置[Karma](https://karma-runner.github.io/1.0/index.html)，让它使用webpack来运行这些测试：

<code-example path="webpack/config/karma.conf.js" title="config/karma.conf.js" linenums="false">

</code-example>

You don't precompile the TypeScript; Webpack transpiles the Typescript files on the fly, in memory, and feeds the emitted JS directly to Karma.
There are no temporary files on disk.

我们不用预编译TypeScript，Webpack随时在内存中转译我们的TypeScript文件，并且把产出的JS直接反馈给Karma。
硬盘上没有任何临时文件。

The `karma-test-shim` tells Karma what files to pre-load and
primes the Angular test framework with test versions of the providers that every app expects to be pre-loaded.

`karma-test-shim`告诉Karma哪些文件需要预加载，首要的是：带有“测试版提供商”的Angular测试框架是每个应用都希望预加载的。

<code-example path="webpack/config/karma-test-shim.js" title="config/karma-test-shim.js" linenums="false">

</code-example>

Notice that you do _not_ load the application code explicitly.
You tell Webpack to find and load the test files (the files ending in `.spec.ts`).
Each spec file imports all&mdash;and only&mdash;the application source code that it tests.
Webpack loads just _those_ specific application files and ignores the other files that you aren't testing.

注意，我们_并没有_明确加载这些应用代码。
只是告诉Webpack查找并加载我们的测试文件(文件名以`.spec.ts`结尾)。
每个规约(spec)文件都导入了所有(也只有)它测试所需的应用源码。
Webpack只加载_那些_特定的应用文件，而忽略所有其它我们不会测试到的。

Grab the app code at the end of this guide and try:

抓取本指南底部的应用代码，并试一试：

<code-example language="sh" class="code-shell">

  npm test

</code-example>

{@a try}

## Trying it out

## 试一试

Here is the source code for a small application that bundles with the
Webpack techniques covered in this guide.

这里是一个小型应用的全部源码，我们可以用本章中学到的Webpack技术打包它们。

<code-tabs>

  <code-pane title="src/index.html" path="webpack/src/index.html">

  </code-pane>

  <code-pane title="src/main.ts" path="webpack/src/main.ts">

  </code-pane>

  <code-pane title="src/assets/css/styles.css" path="webpack/src/assets/css/styles.css">

  </code-pane>

</code-tabs>

<code-tabs>

  <code-pane title="src/app/app.component.ts" path="webpack/src/app/app.component.ts">

  </code-pane>

  <code-pane title="src/app/app.component.html" path="webpack/src/app/app.component.html">

  </code-pane>

  <code-pane title="src/app/app.component.css" path="webpack/src/app/app.component.css">

  </code-pane>

  <code-pane title="src/app/app.component.spec.ts" path="webpack/src/app/app.component.spec.ts">

  </code-pane>

  <code-pane title="src/app/app.module.ts" path="webpack/src/app/app.module.ts">

  </code-pane>

</code-tabs>

The <code>app.component.html</code> displays this downloadable Angular logo
<a href="assets/images/logos/angular/angular.png">
<img src="assets/images/logos/angular/angular.png" height="40px" title="download Angular logo"></a>.
Create a folder called `images` under the project's `assets` folder, then right-click (Cmd+click on Mac)
on the image and download it to that folder.

<code>app.component.html</code>显示了这个可下载的Angular Logo
<a href="assets/images/logos/angular/angular.png" target="_blank">
<img src="assets/images/logos/angular/angular.png" height="40px" title="download Angular logo"></a>。
在项目的`assets`目录下创建一个名叫`images`的文件夹，然后右键点击（Mac上是Cmd+点击）本图片，并把它下载到`images`文件夹中。

{@a bundle-ts}

Here again are the TypeScript entry-point files that define the `polyfills` and `vendor` bundles.

这里又是TypeScript的入口点文件，它定义了`polyfills`和`vendor`这两个包。

<code-tabs>

  <code-pane title="src/polyfills.ts" path="webpack/src/polyfills.ts">

  </code-pane>

  <code-pane title="src/vendor.ts" path="webpack/src/vendor.ts">

  </code-pane>

</code-tabs>

{@a highlights}

<h3 class="no-toc">Highlights</h3>

<h3 class="no-toc">重点</h3>

* There are no `<script>` or `<link>` tags in the `index.html`.
The `HtmlWebpackPlugin` inserts them dynamically at runtime.

   在`index.html`中没有&lt;script&gt;或&lt;link&gt;标签。
  `HtmlWebpackPlugin`会在运行时动态插入它们。

* The `AppComponent` in `app.component.ts` imports the application-wide css with a simple `import` statement.

   `app.component.ts`中的`AppComponent`类简单的用一个`import`语句导入了应用级css。

* The `AppComponent` itself has its own html template and css file. WebPack loads them with calls to `require()`.
Webpack stashes those component-scoped files in the `app.js` bundle too.
You don't see those calls in the source code;
they're added behind the scenes by the `angular2-template-loader` plug-in.

   `AppComponent`组件本身有它自己的HTML模板和CSS文件。Webpack通过调用`require()`方法加载它们。Webpack还把那些组件内部的文件打包进了`app.js`中。
我们在自己的源码中看不到这些调用，这些工作是由幕后的`angular2-template-loader`插件完成的。

* The `vendor.ts` consists of vendor dependency `import` statements that drive the `vendor.js` bundle.
The application imports these modules too; they'd be duplicated in the `app.js` bundle
if the `CommonsChunkPlugin` hadn't detected the overlap and removed them from `app.js`.

   `vendor.ts`由`import`提供商依赖的语句组成，它最终决定了`vender.js`的内容。
  本应用也导入这些模块，如果没有`CommonsChunkPlugin`插件检测出这种重叠，并且把它们从`app.js`中移除，它们就会同时出现在`app.js`包中。

{@a conclusion}

## Conclusion

## 总结

You've learned just enough Webpack to configurate development, test and production builds
for a small Angular application.

我们学到了刚好够用来在开发、测试、产品环境下构建一个小型Angular应用的Webpack配置知识。

_You could always do more_. Search the web for expert advice and expand your Webpack knowledge.

_但我们还能做得更多_。搜索互联网来获得专家的建议，并扩展你对Webpack的认识。

[Back to top](guide/webpack#top)


[回到顶部](guide/webpack#top)
