# Setup for local development

# 搭建本地开发环境

{@a develop-locally}

The <live-example name=quickstart>QuickStart live-coding</live-example> example is an Angular _playground_.
It's not where you'd develop a real application.
You [should develop locally](guide/setup#why-locally "Why develop locally") on your own machine ... and that's also how we think you should learn Angular.

<live-example name=quickstart>《快速起步》在线编程</live-example>例子是 Angular 的*游乐场*。
 它不是开发真实应用的地方。 
 你应该在自己的电脑上[本地开发](guide/setup#why-locally "为什么在本地开发？")... 你也应该在本地环境学习 Angular。

Setting up a new project on your machine is quick and easy with the **QuickStart seed**,
maintained [on github](https://github.com/angular/quickstart "Install the github QuickStart repo").

利用 [github 上](https://github.com/angular/quickstart "安装 github 《快速起步》库")的**《快速起步》种子**在你的电脑上搭建一个新项目是很快很容易的。


Make sure you have [node and npm installed](guide/setup#install-prerequisites "What if you don't have node and npm?").

确定你已经安装了 [node和npm](guide/setup#install-prerequisites "如果你没有node和npm？")。

{@a clone}


## Clone

## 克隆

Perform the _clone-to-launch_ steps with these terminal commands.

运行下列命令来执行*克隆并启动*步骤。


<code-example language="sh" class="code-shell">
  git clone https://github.com/angular/quickstart.git quickstart
  cd quickstart
  npm install
  npm start

</code-example>



<div class="alert is-important">



`npm start` fails in _Bash for Windows_ in versions earlier than the Creator's Update (April 2017).

在*Bash for Windows*中`npm start`可能会失败，因为到2017-01为止它还不支持访问网络上的服务器。


</div>



{@a download}


## Download

## 下载
<a href="https://github.com/angular/quickstart/archive/master.zip" title="Download the QuickStart seed repository">Download the QuickStart seed</a>
and unzip it into your project folder. Then perform the remaining steps with these terminal commands.

<a href="https://github.com/angular/quickstart/archive/master.zip" title="下载《快速起步》种子库">下载《快速起步》种子</a>
并解压到你的项目目录中。然后执行下面的命令完成剩余步骤。


<code-example language="sh" class="code-shell">
  cd quickstart
  npm install
  npm start

</code-example>



<div class="alert is-important">



`npm start` fails in _Bash for Windows_ in versions earlier than the Creator's Update (April 2017).

在*Bash for Windows*中`npm start`可能会失败，因为到2017-01为止它还不支持访问网络上的服务器。


</div>



{@a non-essential}



## Delete _non-essential_ files (optional)

## 删除*非必需*文件（可选）

You can quickly delete the _non-essential_ files that concern testing and QuickStart repository maintenance
(***including all git-related artifacts*** such as the `.git` folder and `.gitignore`!).

你可以快速删除一些涉及到测试和维护快速开始版本库的 *非必需* 文件
（***包括所有git相关的文件***如 `.git` 文件夹和 `.gitignore`！）。


<div class="alert is-important">



Do this only in the beginning to avoid accidentally deleting your own tests and git setup!

请只在开始时执行此删除操作，以防你自己的测试和git文件被意外删除！


</div>



Open a terminal window in the project folder and enter the following commands for your environment:

在项目目录下打开一个终端窗口，并根据你的操作系统执行以下命令：

### OS/X (bash)

### OS/X (bash) 命令


<code-example language="sh" class="code-shell">
  xargs rm -rf &lt; non-essential-files.osx.txt
  rm src/app/*.spec*.ts
  rm non-essential-files.osx.txt

</code-example>



### Windows

### Windows 命令


<code-example language="sh" class="code-shell">
  for /f %i in (non-essential-files.txt) do del %i /F /S /Q
  rd .git /s /q
  rd e2e /s /q

</code-example>



{@a seed}



## What's in the QuickStart seed?

## 《快速起步》种子库里都有什么？



The **QuickStart seed** contains the same application as the QuickStart playground.
But its true purpose is to provide a solid foundation for _local_ development.
Consequently, there are _many more files_ in the project folder on your machine,
most of which you can [learn about later](guide/setup-systemjs-anatomy "Setup Anatomy").

**《快速起步》种子** 包含了与《快速起步》游乐场一样的应用，但是，它真正的目的是提供坚实的*本地*开发基础。
所以你的电脑里的项目目录里面有*更多文件*，参见[搭建剖析](guide/setup-systemjs-anatomy "Setup Anatomy")。



{@a app-files}


Focus on the following three TypeScript (`.ts`) files in the **`/src`** folder.

注意**`/src`**目录中以下三个 TypeScript (`.ts`) 文件：


<div class='filetree'>

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
      main.ts
    </div>

  </div>

</div>



<code-tabs>

  <code-pane title="src/app/app.component.ts" path="setup/src/app/app.component.ts">

  </code-pane>

  <code-pane title="src/app/app.module.ts" path="setup/src/app/app.module.ts">

  </code-pane>

  <code-pane title="src/main.ts" path="setup/src/main.ts">

  </code-pane>

</code-tabs>



All guides and cookbooks have _at least these core files_.
Each file has a distinct purpose and evolves independently as the application grows.

所有指南和烹饪书都至少有*这几个核心文件*。每个文件都有独特的用途，并且随着应用的成长各自独立演变。

Files outside `src/` concern building, deploying, and testing your app.
They include configuration files and external dependencies.

`src/` 目录之外的文件为构建、部署和测试app相关的文件，他们只包括配置文件和外部依赖。

Files inside `src/` "belong" to your app.
Add new Typescript, HTML and CSS files inside the `src/` directory, most of them inside `src/app`,
unless told to do otherwise.

`src/` 目录下的文件才“属于”你的app。
除非明确指出，否则教程中添加的 TypeScript，HTML和CSS文件都在`src/`目录下，
大多数在`src/app`目录中。

The following are all in `src/`

`src/`目录文件详情如下：


<style>
  td, th {vertical-align: top}
</style>



<table width="100%">

  <col width="20%">

  </col>

  <col width="80%">

  </col>

  <tr>

    <th>
 
      <p>
        File
      </p>

      <p>
        文件
      </p>

    </th>

    <th>
 
      <p>
        Purpose
      </p>

      <p>
        用途
      </p>

    </th>

  </tr>

  <tr>

    <td>
      <code>app/app.component.ts</code>
    </td>

    <td>


      Defines the same `AppComponent` as the one in the QuickStart playground.
      It is the **root** component of what will become a tree of nested components
      as the application evolves. 定义与《快速起步》游乐场同样的`AppComponent`。
      它是**根**组件，随着应用的演变，它将变成一颗嵌套组件树。
    </td>

  </tr>

  <tr>

    <td>
      <code>app/app.module.ts</code>
    </td>

    <td>


      Defines `AppModule`, the [root module](guide/bootstrapping "AppModule: the root module") that tells Angular how to assemble the application.
      Right now it declares only the `AppComponent`. 
      Soon there will be more components to declare. 

      定义`AppModule`，[根模块](guide/bootstrapping "AppModule: 根模块")为 Angular 描述如何组装应用。
      目前，它只声明了`AppComponent`。
      不久，它将声明更多组件。
    </td>

  </tr>

  <tr>

    <td>
      <code>main.ts</code>
    </td>

    <td>


      Compiles the application with the [JIT compiler](guide/glossary#jit) and
      [bootstraps](guide/bootstrapping#main "bootstrap the application")
      the application's main module (`AppModule`) to run in the browser.
      The JIT compiler is a reasonable choice during the development of most projects and
      it's the only viable choice for a sample running in a _live-coding_ environment like Plunker.
      You'll learn about alternative compiling and [deployment](guide/deployment) options later in the documentation.

      使[即时 (JiT) 编译器](guide/glossary#jit)用编译应用并且在浏览器中[启动](guide/bootstrapping#main "启动应用")并运行应用。
      对于大多数项目的开发，这都是合理的选择。而且它是在像 Plunker 这样的*在线编程*环境中运行例子的唯一选择。
      你将在本文档中学习其他编译和开发选择。

    </td>

  </tr>

</table>



<div class="l-sub-section">



### Next Step

### 下一步

If you're new to Angular, we recommend you follow the [tutorial](tutorial "Tour of Heroes tutorial").

如果你是 Angular 初学者，建议跟着[教程](tutorial "《英雄指南》教程")学习。


</div>

{@a install-prerequisites}



## Appendix: node and npm

## 附录：node 与 npm

Node.js and npm are essential to modern web development with Angular and other platforms.
Node powers client development and build tools.
The _npm_ package manager, itself a _node_ application, installs JavaScript libraries.

Node.js 和 npm 对使用 Angular 和其他平台进行现代网络开发是至关重要的。
Node 驱动客户端开发和构建工具。
*npm* 包管理器本身是 *node* 应用，用于安装 JavaScript 库。

<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
</a> if they're not already installed on your machine.

如果你的电脑没有安装它们，<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="安装 Node.js 和更新 npm">
立刻安装它们</a>。

**Verify that you are running node `v4.x.x` or higher and npm `3.x.x` or higher**
by running the commands `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

在终端/控制器窗口运行命令`node -v`和`npm -v`，来**确认你运行的 node 是`v4.x.x`或更高，npm 为`3.x.x`或更高。**
老版本会产生错误。

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.
You may need [nvm](https://github.com/creationix/nvm) if you already have projects running on your machine that
use other versions of node and npm.

我们推荐使用 [nvm](https://github.com/creationix/nvm) 来管理多版本 node 和 npm。
    如果你的电脑上已经有使用其他版本 node 和 npm 的项目，你可能需要 nvm。


{@a why-locally}



## Appendix: Why develop locally

## 附录：为何在本地开发
  
<live-example title="QuickStart Seed in Plunker">Live coding</live-example> in the browser is a great way to explore Angular.

在浏览器中<live-example title="QuickStart Seed in Plunker">在线编程</live-example>是很好的探索 Angular 的方法。

Links on almost every documentation page open completed samples in the browser.
You can play with the sample code, share your changes with friends, and download and run the code on your own machine.

几乎每章文档里面的链接都在浏览器中打开完整的例子。
你可以用这些代码做实验，或者与朋友共享你的修改，或者下载并在你自己的电脑上运行这些代码。

The [QuickStart](guide/quickstart "Angular QuickStart Playground") shows just the `AppComponent` file.
It creates the equivalent of `app.module.ts` and `main.ts` internally _for the playground only_.
so the reader can discover Angular without distraction.
The other samples are based on the QuickStart seed.

[快速起步](guide/quickstart "Angular 快速起步游乐场")仅仅展示了`AppComponent`文件。
它在内部创建了只为*游乐场*而准备的等价`app.module.ts`和`main.ts`。
所以读者可以在零干扰的情况下探索 Angular。
其他例子是基于 《快速起步》种子的。

As much fun as this is ...

虽然有这么多的乐趣，但是...  

* you can't ship your app in plunker

  你不能在 plunker 里面发布你的应用  
    
* you aren't always online when writing code

  编程时你不可能总是在线  
    
* transpiling TypeScript in the browser is slow

  在浏览器中编译 TypeScript 很慢
  
* the type support, refactoring, and code completion only work in your local IDE

  只有本地 IDE 有类型支持、代码重构和代码自动完成
  
Use the <live-example title="QuickStart Seed in Plunker">live coding</live-example> environment as a _playground_,
a place to try the documentation samples and experiment on your own.
It's the perfect place to reproduce a bug when you want to
<a href="https://github.com/angular/angular/issues/new" title="File a documentation issue">file a documentation issue</a> or
<a href="https://github.com/angular/angular/issues/new" title="File an Angular issue">file an issue with Angular itself</a>.

把<live-example title="QuickStart Seed in Plunker"><i>在线编程</i></live-example>环境当做*游乐场*，一个尝试文档例子和自己做实验的地方。
当你想要<a href="https://github.com/angular/angular.io/issues/new" target="_blank" title="提交关于文档的问题">提交关于文档的问题</a>或者
<a href="https://github.com/angular/angular/issues/new" target="_blank" title="提交关于 Angular 的问题">提交关于 Angular 自身的问题</a>时，
它是重现错误的完美地方。

For real development, we strongly recommend [developing locally](guide/setup#develop-locally).

对于现实项目开发，我们强烈推荐在[本地开发](guide/setup#develop-locally)。
