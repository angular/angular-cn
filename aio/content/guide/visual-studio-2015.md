# Using Angular with Visual Studio 2015

# Visual Studio 2015 快速上手

{@a top}

Some developers prefer Visual Studio as their Integrated Development Environment (IDE).

有些开发者喜欢用 Visual Studio 作为他们的集成开发环境。

This cookbook describes the steps required to set up and use Angular app files in Visual Studio 2015 within an ASP.NET 4.x project.

本文介绍了在**Visual Studio 2015 的 ASP.NET 4.x 项目中**使用 Angular 应用的各个文件所需的步骤。

<div class="alert is-helpful">

There is no *live example* for this cookbook because it describes Visual Studio, not 
the Angular application itself. It uses the starter Angular application created by the CLI command [`ng new`](cli/new) as an example.

本文中没有*现场演练*，因为它介绍的是 Visual Studio，而不是《快速上手》应用程序本身。它使用 CLI 命令 [`ng new`](cli/new) 创建的 Angular 入门应用作为例子。

</div>

{@a asp-net-4}

## ASP.NET 4.x Project

## ASP.NET 4.x 项目

To set up the Getting Started files with an **ASP.NET 4.x project** in
Visual Studio 2015, follow these steps:

要用 Visual Studio 2015 在**ASP.NET 4.x 项目**中设置**《快速上手》**文件，请遵循如下步骤：

<div class="alert is-helpful">

If you prefer a `File | New Project` experience and are using **ASP.NET Core**, 
then consider the _experimental_
<a href="http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/">ASP.NET Core + Angular template for Visual Studio 2015</a>.
Note that the resulting code does not map to the docs. Adjust accordingly.

如果你希望使用**ASP.NET Core**并体验全新项目，
    参见*预览版*<a href="http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/" target="_blank">ASP.NET Core + Angular 的 Visual Studio 2015 模板</a>。
    注意，最终代码与本文不对应，请适当调节。

</div>

<h2 id='prereq1'>Prerequisite: Node.js</h2>

<h2 id='prereq1'>前提条件: Node.js</h2>

Install **[Node.js® and npm](https://nodejs.org/en/download/)**
if they are not already on your machine.
See [Local Environment Setup](guide/setup-local "Setting up for Local Development") for supported versions and instructions.

如果你的电脑里没有 Node.js®和 npm，请安装**[它们](https://nodejs.org/en/download/)**。
参见[搭建本地开发环境](guide/setup-local "Setting up for Local Development")以了解所支持的版本和安装步骤。

<h2 id='prereq2'>Prerequisite: Visual Studio 2015 Update 3</h2>

<h2 id='prereq2'>前提条件: Visual Studio 2015 Update 3</h2>

The minimum requirement for developing Angular applications with Visual Studio is Update 3.
Earlier versions do not follow the best practices for developing applications with TypeScript.
To view your version of Visual Studio 2015, go to `Help | About Visual Studio`.

使用 Visual Studio 开发 Angular 应用程序的最低要求是 Update 3。
早期版本没有遵循使用 TypeScript 开发应用程序的最佳实践。
要查看你的 Visual Studio 2015 版本号，到 `Help | About Visual Studio`。

If you don't have it, install **[Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs)**.
Or use `Tools | Extensions and Updates` to update to Update 3 directly from Visual Studio 2015.

如果还没有，安装**[Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs)**。或者使用 `Tools | Extensions and Updates` 来直接在 Visual Studio 2015 中更新到 Update 3。

<h2 id='prereq3'>Prerequisite: Configure External Web tools</h2>

<h2 id='prereq3'>前提条件: 配置 External Web tools</h2>

Configure Visual Studio to use the global external web tools instead of the tools that ship with Visual Studio:

配置 Visual Studio 来使用全局 External Web Tools，而非 Visual Studio 默认的工具：

  * Open the **Options** dialog with `Tools` | `Options`.

     到 `Tools` | `Options` 打开 **Options** 对话框

  * In the tree on the left, select `Projects and Solutions` | `External Web Tools`.

     在左边的树中，选择 `Projects and Solutions` | `External Web Tools`。

  * On the right, move the `$(PATH)` entry above the `$(DevEnvDir`) entries. This tells Visual Studio to
    use the external tools (such as npm) found in the global path before using its own version of the external tools.

     在右侧，将 `$(PATH)` 移动到 `$(DevEnvDir`)上面。这样，Visual Stuio 就会在使用自带的外部工具时，优先使用全局路径中的外部工具（比如 npm）。

  * Click OK to close the dialog.

     点击 OK 关闭对话框。

  * Restart Visual Studio for this change to take effect.

     重启 Visual Studio，以让设置变化生效。

Visual Studio now looks first for external tools in the current workspace and 
if it doesn't find them, it looks in the global path. If Visual Studio doesn't 
find them in either location, it will use its own versions of the tools.

Visual Studio 将优先在当前的工作区查找外部工具，如果没有找到，便查找全局路径，如果还没有找到，Visual Studio 就使用自带的工具版本。

<h2 id='prereq4'>Prerequisite: Install TypeScript for Visual Studio 2015</h2>

<h2 id='prereq4'>前提条件: 安装 TypeScript 2.2 for Visual Studio 2015</h2>

While Visual Studio Update 3 ships with TypeScript support out of the box, it currently doesn’t ship with more recent versions of TypeScript, which you need to develop Angular applications.

Visual Studio Update 3 自带 TypeScript 支持，但它的 TypeScript 版本不是开发 Angular 应用所需的最新版 TypeScript。

To install the latest version of TypeScript:

要安装 TypeScript 最新版：

 * Download and install the latest [TypeScript for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48593),

    下载并安装最新版的 **[TypeScript for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48593)**

 * OR install it with npm: `npm install -g typescript@latest`.

    或通过 npm 安装：`npm install -g typescript@latest`。

You can find out more about TypeScript support in Visual Studio **[here](https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/)**.

你可以在**[这里](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)**查看更多 Visual Studio 中 TypeScript 的支持。

At this point, Visual Studio is ready. It’s a good idea to close Visual Studio and 
restart it to make sure everything is clean.

至此，Visual Studio 已经准备好了。重新启动 Visual Studio，这样就可以有一个崭新的开始了。

<h2 id='download'>Step 1: Download the Angular Getting Started app</h2>

<h2 id='download'>
  Step 1: Create a starter Angular app
</h2>

<h2 id='download'>
  第一步：创建一个 Angular 的初学者应用
</h2>

Follow the instructions in [Local Environment Setup](guide/setup-local "Setting up for Local Development") to create a starter Angular app using the CLI command [`ng new`](cli/new). 

 遵循[建立本地环境](guide/setup-local "Setting up for Local Development")中的步骤，使用 CLI 命令 [`ng new`](cli/new) 创建一个 Angular 的初学者应用。

<h2 id='create-project'>Step 2: Create the Visual Studio ASP.NET project</h2>

<h2 id='create-project'>第二步：创建 Visual Studio ASP.net 项目</h2>

Create the ASP.NET 4.x project in the usual way as follows:

按照下列步骤创建 ASP.NET 4.x 项目：

* In Visual Studio, select `File` | `New` | `Project` from the menu.

   在 Visual Studio 中，选择 `File` | `New` | `Project` 菜单。

* In the template tree, select `Templates` | `Visual C#` (or `Visual Basic`) | `Web`.

   在模板树中，选择 `Templates` | `Visual C#`(或 `Visual Basic`) | `Web` 菜单。

* Select the `ASP.NET Web Application` template, give the project a name, and click OK.

   选择 `ASP.NET Web Application` 模板，输入项目名，点击“OK”按钮。

* Select the desired ASP.NET 4.5.2 template and click OK.

   选择自己喜欢的 ASP.NET 4.5.2 模板，点击 OK。

<div class="alert is-helpful">

This cookbook uses the `Empty` template with no added folders, 
no authentication, and no hosting. Pick the template and options appropriate for your project.

本文选择了 `Empty` 模板，它没有添加过任何目录，没有身份验证，没有服务器托管。为你的项目选择合适的模板和选项。

</div>

<h2 id='copy'>
  Step 3: Copy the Angular project files into the ASP.NET project folder
</h2>

<h2 id='copy'>
  第三步: 把这个 Angular 项目中的文件复制到 ASP.NET 项目所在的目录
</h2>

Copy files from the starter Angular app into the folder containing the `.csproj` file.
Include the files in the Visual Studio project as follows:

把 Angular 初学者应用中的文件复制到包含 `.csproj` 文件的目录中。按照下面的步骤把它们加到 Visual Studio 中：

* Click the `Show All Files` button in Solution Explorer to reveal all of the hidden files in the project.

   在 Solution Explorer 中点击 `Show All Files` 按钮，显示项目中所有隐藏文件。

* Right-click on each folder/file to be included in the project and select `Include in Project`.
  Minimally, include the following folder/files:

   右键点击每个目录和文件，选择 `Include in Project`。
  最少要添加下列文件：

  * src/app folder (answer *No*  if asked to search for TypeScript Typings)

     src/app 目录（如果询问是否要搜索 TypeScript 类型，回答 *No*）

  * src/styles.css

  * src/index.html

  * package.json

  * src/tsconfig.json

<h2 id='restore'>Step 4: Restore the required packages</h2>

<h2 id='restore'>第四步: 恢复需要的包 </h2>

Restore the packages required for an Angular application as follows:

按下面的步骤恢复 Angular 应用程序需要的包：

* Right-click on the `package.json` file in Solution Explorer and select `Restore Packages`.
  <br>This uses `npm` to install all of the packages defined in the `package.json` file.
  It may take some time.

   在 Solution Explorer 中右键点击 `package.json`，选择 `Restore Packages`。
  <br>这样，Visual Studio 会使用 `npm` 来安装在 `package.json` 中定义的所有包. 
  这可能需要花一点时间。

* If desired, open the Output window (`View` | `Output`) to watch the npm commands execute.

   如果愿意，打开 Output 窗口(`View` | `Output`)来监控 npm 命令的执行情况。

* Ignore the warnings.

   忽略所有警告。

* When the restore is finished, a message in the bottom message bar of Visual Studio 
  should say: `Installing packages complete`. Be patient. This could take a while.

   当恢复完成后，将会出现一条消息：`Installing packages complete`。耐心点，这相当耗时间。

* Click the `Refresh` icon in Solution Explorer.

   在 Solution Explorer 里，点击 `Refresh` 图标。

* **Do not** include the `node_modules` folder in the project. Let it be a hidden project folder.

   **不要**将 `node_modules` 目录添加到项目中，让它隐藏。

<h2 id='build-and-run'>Step 5: Build and run the app</h2>

<h2 id='build-and-run'>第五步：构建和运行应用</h2>

First, ensure that `src/index.html` is set as the start page.
Right-click `index.html` in Solution Explorer and select option `Set As Start Page`.

首先，确认 `src/index.html` 已被设置为开始页面。
  在 Solution Explorer 中，右键点击 `index.html`，选择选项 `Set As Start Page`。

### To run in VS with F5

### 按 F5 以在 VS 中运行

Most Visual Studio developers like to press the F5 key and see the IIS server come up.
To use the IIS server with the Getting Started app, you must make the following three changes.

大多数 Visual Studio 开发者喜欢按 F5 键来启动 IIS 服务器。
要在这个《快速上手》应用中使用 IIS 服务器，你要做下列修改：

1. In `index.html`, change base href from `<base href="/">` to `<base href="/src/">`.

   在 `index.html` 中，把基地址从 `<base href="/">` 改为 `<base href="/src/">`。

2. Also in `index.html`, change  the scripts to use `/node_modules` with a slash 
instead of `node_modules` without the slash. 

   同样在 `index.html` 中，修改脚本来用带有斜杠的 `/node_modules` 代替不带斜杠的 `node_modules`。
3. In `src/systemjs.config.js`, near the top of the file, 
change the npm `path` to `/node_modules/` with a slash.

   在 `src/systemjs.config.js` 的顶部，把 npm 的 `path` 设置为带斜杠的 `/node_modules/`。

<div class="alert is-important">

After these changes, `npm start` no longer works.
You must choose to configure _either_ for F5 with IIS _or_ for  `npm start` with the lite-server.

做完这些修改之后，`npm start` 不再工作了。你必须选择配置为 IIS + F5，还是 `npm start` + lite-server。

</div>

### For apps that use routing

### 为了使用路由的应用

If your app uses routing, you need to teach the server to always return 
`index.html` when the user asks for an HTML page
for reasons explained in the [Deployment](guide/deployment#fallback) guide.

如果应用要使用路由，就要让服务器在用户要求 HTML 页面时始终返回 `index.html`。
此中原因，在[发布](guide/deployment#fallback)一章中有解释。

Everything seems fine while you move about _within_ the app.
But you'll see the problem right away if you refresh the browser
or paste a link to an app page (called a "deep link") into the browser address bar.

当你在应用*内部*移动时，看起来一切正常。但是如果刷新浏览器，或者在地址栏中输入一个到具体页面的地址（也就是"深链接"）时，问题就来了。

You'll most likely get a *404 - Page Not Found* response from the server
for any address other than `/` or `/index.html`.

你很可能从服务器得到得到*404 - 页面不存在* —— 只有 `/` 或 `/index.html` 例外。

You have to configure the server to return `index.html` for requests to these "unknown" pages.
The `lite-server` development server does out-of-the-box.
If you've switched over to F5 and IIS, you have to configure IIS to do it.
This section walks through the steps to adapt the Getting Started application.

你就要配置服务器，为那些"未知"的页面返回 `index.html`。
`lite-server` 开发服务器内置了这项功能。如果要切换到 F5 + IIS，你就要自己来配置 IIS 实现它了。
接下来看看对快速上手应用做配置的步骤。

#### Configure IIS rewrite rules

#### 配置 IIS 重写规则

Visual Studio ships with IIS Express, which has the rewrite module baked in.
However, if you're using regular IIS you'll have to install the rewrite 
module.

Visual Studio 自带了一个 IIS Express，其中有一个重写（rewrite）模块。
不过，如果使用标准版的 IIS，就要自己去安装这个重写模块了。

Tell Visual Studio how to handle requests for route app pages by adding these
rewrite rules near the bottom of the `web.config`:

通过把下列重写规则添加到 `web.config` 的底部，就可以告诉 Visual Studio 如何处理到应用页面的请求。

<code-example format='.'>
  &lt;system.webServer&gt;
    &lt;rewrite&gt;
      &lt;rules&gt;
        &lt;rule name="Angular Routes" stopProcessing="true"&gt;
          &lt;match url=".*" /&gt;
          &lt;conditions logicalGrouping="MatchAll"&gt;
            &lt;add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /&gt;
            &lt;add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /&gt;
          &lt;/conditions&gt;
          &lt;action type="Rewrite" url="/src/" /&gt;
        &lt;/rule&gt;
      &lt;/rules&gt;
    &lt;/rewrite&gt;
  &lt;/system.webServer&gt;

</code-example>

<div class="alert is-helpful">

The match url, `<match url=".*" />`, will rewrite every request. You'll have to adjust this if 
you want some requests to get through, such as web API requests.

匹配 url `<match url=".*" />` 语句将会重写每一个请求。如果需要直接放行某些请求，比如一些 Web API 请求，你就必须调整它才行。

The URL in `<action type="Rewrite" url="/src/"/>` should 
match the base href in `index.html`.

`<action type="Rewrite" url="/src/"/>` 中的 url 将会匹配 `index.html` 中的基地址（base href）。

</div>

Build and launch the app with debugger by clicking the **Run** button or by pressing `F5`.

点击 **Run** 按钮或者按 `F5` 键，用调试器构建和启动应用。

<div class="alert is-helpful">

It's faster to run without the debugger by pressing `Ctrl-F5`.

按 `Ctrl-F5` 不带调试器的运行应用，速度会更快。

</div>

The default browser opens and displays the Getting Started sample application.

默认浏览器打开并显示《快速上手》例子应用。

Try editing any of the project files. Save and refresh the browser to
see the changes.

尝试编辑任何项目文件，*保存*并刷新浏览器来查看效果。
