# Visual Studio 2015 QuickStart

# Visual Studio 2015 快速上手

{@a top}

Some developers prefer Visual Studio as their Integrated Development Environment (IDE).

有些开发者喜欢用Visual Studio。

This cookbook describes the steps required to set up and use the
Angular QuickStart files in **Visual Studio 2015 within an ASP.NET 4.x project**.

本烹饪宝典介绍了在**Visual Studio 2015的ASP.NET 4.x项目中**，用Angular实现“快速上手”所需的步骤。

<div class="l-sub-section">

There is no *live example* for this cookbook because it describes Visual Studio, not 
the QuickStart application itself.

本烹饪宝典中没有*在线例子*，因为它介绍的是Visual Studio，而不是《快速上手》应用程序本身。

</div>

{@a asp-net-4}

## ASP.NET 4.x Project

## ASP.NET 4.x 项目

To set up the QuickStart files with an **ASP.NET 4.x project** in
Visual Studio 2015, follow these steps:

要用Visual Studio 2015在**ASP.NET 4.x项目**中设置**《快速上手》**文件，请遵循如下步骤：

<div class="l-sub-section">

If you prefer a `File | New Project` experience and are using **ASP.NET Core**, 
then consider the _experimental_
<a href="http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/">ASP.NET Core + Angular template for Visual Studio 2015</a>. 
Note that the resulting code does not map to the docs. Adjust accordingly.   

如果你希望使用**ASP.NET Core**并体验全新项目，
    参见_预览版_<a href="http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/" target="_blank">ASP.NET Core + Angular template for Visual Studio 2015</a>。 
    注意，最终代码与本文不对应，请适当调节。

</div>

<h2 id='prereq1'>Prerequisite: Node.js</h2>

<h2 id='prereq1'>前提条件: Node.js</h2>

Install **[Node.js® and npm](https://nodejs.org/en/download/)**
if they are not already on your machine.

如果你的电脑里没有Node.js®和npm，请安装**[它们](https://nodejs.org/en/download/)**。

<div class="l-sub-section">

**Verify that you are running node version `4.6.x` or greater, and npm `3.x.x` or greater**
by running `node -v` and `npm -v` in a terminal window.
Older versions produce errors.

在终端或者控制台中运行`node -v`和`npm -v`，**请确认你的Node版本为`4.6.x`或更高，npm的版本为`3.x.x`或更高**。老版本会引起错误。

</div>

<h2 id='prereq2'>Prerequisite: Visual Studio 2015 Update 3</h2>

<h2 id='prereq2'>前提条件: Visual Studio 2015 Update 3</h2>

The minimum requirement for developing Angular applications with Visual Studio is Update 3.
Earlier versions do not follow the best practices for developing applications with TypeScript.
To view your version of Visual Studio 2015, go to `Help | About Visual Studio`.

使用Visual Studio开发Angular应用程序的最低要求是Update 3。
早期版本没有遵循使用TypeScript开发应用程序的最佳实践。
要查看你的Visual Studio 2015版本号，到`Help | About Visual Studio`。

If you don't have it, install **[Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs)**.
Or use `Tools | Extensions and Updates` to update to Update 3 directly from Visual Studio 2015.

如果还没有，安装**[Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs)**。或者使用`Tools | Extensions and Updates`来直接在Visual Studio 2015中更新到Update 3。

<h2 id='prereq3'>Prerequisite: Configure External Web tools</h2>

<h2 id='prereq3'>前提条件: 配置External Web tools</h2>

Configure Visual Studio to use the global external web tools instead of the tools that ship with Visual Studio:

配置Visual Studio来使用全局External Web Tools，而非Visual Studio默认的工具：

  * Open the **Options** dialog with `Tools` | `Options`.

     到`Tools` | `Options`打开**Options**对话框

  * In the tree on the left, select `Projects and Solutions` | `External Web Tools`.

     在左边树型项目中，选择`Projects and Solutions` | `External Web Tools`。

  * On the right, move the `$(PATH)` entry above the `$(DevEnvDir`) entries. This tells Visual Studio to
    use the external tools (such as npm) found in the global path before using its own version of the external tools.

     * 在右侧，将`$(PATH)`移动到 `$(DevEnvDir`)上面。这样，Visual Stuio就会在使用自带的外部工具时，优先使用全局路径中的外部工具（比如npm）。

  * Click OK to close the dialog.

     点击OK关闭对话框。

  * Restart Visual Studio for this change to take effect.

     重启Visual Studio，以让设置变化生效。

Visual Studio now looks first for external tools in the current workspace and 
if it doesn't find them, it looks in the global path. If Visual Studio doesn't 
find them in either location, it will use its own versions of the tools.

Visual Studio将优先在当前的工作区查找外部工具，如果没有找到，便查找全局路径，如果还没有找到，Visual Studio就使用自带的工具版本。

<h2 id='prereq4'>Prerequisite: Install TypeScript 2.2 for Visual Studio 2015</h2>

<h2 id='prereq4'>前提条件: 安装TypeScript 2.2 for Visual Studio 2015</h2>

While Visual Studio Update 3 ships with TypeScript support out of the box, it currently doesn’t ship with TypeScript 2.2, 
which you need to develop Angular applications.

Visual Studio Update 3自带TypeScript支持，但是它的TypeScript版本开发Angular应用需要的不是2.2。

To install TypeScript 2.2:

要安装TypeScript 2.2：

 * Download and install **[TypeScript 2.2 for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48593)**

    下载并安装 **[TypeScript 2.2 for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48593)**

 * OR install it with npm: `npm install -g typescript@2.2`.

    或通过npm安装：`npm install -g typescript@2.2`。

You can find out more about TypeScript 2.2 support in Visual studio **[here](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)**.

你可以在**[这儿](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)**查看更多Visual Studio中TypeScript 2.2的支持。

At this point, Visual Studio is ready. It’s a good idea to close Visual Studio and 
restart it to make sure everything is clean.

至此，Visual Studio准备好了。重新启动Visual Stuido，这样我们可以有一个崭新的开始。

<h2 id='download'>Step 1: Download the QuickStart files</h2>

<h2 id='download'>第一步: 现在“快速上手”文件</h2>

[Download the QuickStart source](https://github.com/angular/quickstart)
from GitHub. If you downloaded as a zip file, extract the files.

从GitHub[下载“快速上手”的源代码](https://github.com/angular/quickstart)。如果下载的是一个压缩的zip文件，解压它。

<h2 id='create-project'>Step 2: Create the Visual Studio ASP.NET project</h2>

<h2 id='create-project'>第二步：创建Visual Studio ASP.net项目</h2>

Create the ASP.NET 4.x project in the usual way as follows:

按照下列步骤创建ASP.NET 4.x项目：

* In Visual Studio, select `File` | `New` | `Project` from the menu.

   在Visual Studio中，选择`File` | `New` | `Project`菜单。

* In the template tree, select `Templates` | `Visual C#` (or `Visual Basic`) | `Web`.

   在模板树中，选择`Templates` | `Visual C#`(或`Visual Basic`) | `Web`菜单。

* Select the `ASP.NET Web Application` template, give the project a name, and click OK.

   选择`ASP.NET Web Application`模板，输入项目名，点击“OK”按钮。

* Select the desired ASP.NET 4.5.2 template and click OK.

   选择自己喜欢的ASP.NET 4.5.2模板，点击OK。

<div class="l-sub-section">

This cookbook uses the `Empty` template with no added folders, 
no authentication, and no hosting. Pick the template and options appropriate for your project.

本烹饪宝典选择了`Empty`模板，它没有添加过任何目录，没有身份验证，没有服务器托管。为你的项目选择合适的模板和选项。

</div>

<h2 id='copy'>Step 3: Copy the QuickStart files into the ASP.NET project folder</h2>

<h2 id='copy'>第三步: 把“快速上手”的文件复制到ASP.NET项目所在的目录</h2>

Copy the QuickStart files you downloaded from GitHub into the folder containing the `.csproj` file.
Include the files in the Visual Studio project as follows:

拷贝从GitHub下载的“快速上手”文件到包含`.csproj`文件的目录中。按照下面的步骤把它们加到Visual Studio中：

* Click the `Show All Files` button in Solution Explorer to reveal all of the hidden files in the project.

   在Solution Explorer中点击`Show All Files`按钮，显示项目中所有隐藏文件。

* Right-click on each folder/file to be included in the project and select `Include in Project`.
  Minimally, include the following folder/files:

   右键点击每个目录和文件，选择`Include in Project`。
  最少要添加下列文件：

  * src/app folder (answer *No*  if asked to search for TypeScript Typings)

     src/app目录（如果询问是否要搜索TypeScript类型，回答*No*）

  * src/styles.css

  * src/index.html

  * package.json

  * src/tsconfig.json

<h2 id='restore'>Step 4: Restore the required packages</h2>

<h2 id='restore'> 第四步: 恢复需要的包 </h2>

Restore the packages required for an Angular application as follows:

按下面的步骤恢复Angular应用程序需要的包：

* Right-click on the `package.json` file in Solution Explorer and select `Restore Packages`.
  <br>This uses `npm` to install all of the packages defined in the `package.json` file. 
  It may take some time.

   在Solution Explorer中右键点击`package.json`，选择`Restore Packages`。
  <br>这样，Visual Studio会使用`npm`来安装在`package.json`中定义的所有包. 
  这可能需要花一点时间。

* If desired, open the Output window (`View` | `Output`) to watch the npm commands execute.

   如果愿意，打开Output窗口(`View` | `Output`)来监控npm命令的执行情况。

* Ignore the warnings.

   忽略所有警告。

* When the restore is finished, a message in the bottom message bar of Visual Studio 
  should say: `Installing packages complete`. Be patient. This could take a while.

   当恢复完成后，将会出现一条消息：`Installing packages complete`。耐心点，这相当耗时间。

* Click the `Refresh` icon in Solution Explorer.

   在Solution Explorer里，点击`Refresh`图标。

* **Do not** include the `node_modules` folder in the project. Let it be a hidden project folder.

   **不要**将`node_modules`目录添加到项目中，让它隐藏。

<h2 id='build-and-run'>Step 5: Build and run the app</h2>

<h2 id='build-and-run'>第五步：构建和运行应用</h2>

First, ensure that `src/index.html` is set as the start page.
Right-click `index.html` in Solution Explorer and select option `Set As Start Page`.

首先，确认`src/index.html`已被设置为开始页面。
  在Solution Explorer中，右键点击`index.html`，选择选项`Set As Start Page`。

### To run in VS with F5

### 按 F5 以在 VS 中运行

Most Visual Studio developers like to press the F5 key and see the IIS server come up. 
To use the IIS server with the QuickStart app, you must make the following three changes. 

大多数 Visual Studio 开发者喜欢按 F5 键来启动 IIS 服务器。
要在这个《快速上手》应用中使用 IIS 服务器，我们要做下列修改：

1. In `index.html`, change base href from `<base href="/">` to `<base href="/src/">`.

   在 `index.html` 中，把基地址从 `<base href="/">` 改为 `<base href="/src/">` 。

2. Also in `index.html`, change  the scripts to use `/node_modules` with a slash 
instead of `node_modules` without the slash. 

   同样在`index.html`中，修改脚本来用带有斜杠的`/node_modules`代替不带斜杠的`node_modules`。

3. In `src/systemjs.config.js`, near the top of the file, 
change the npm `path` to `/node_modules/` with a slash.

   在`src/systemjs.config.js`的顶部，把 npm 的 `path` 设置为带斜杠的`/node_modules/`。

<div class="alert is-important">

After these changes, `npm start` no longer works.
You must choose to configure _either_ for F5 with IIS _or_ for  `npm start` with the lite-server.

做完这些修改之后，`npm start`不再工作了。我们必须选择配置为IIS + F5，还是`npm start` + lite-server。

</div>

### For apps that use routing

### 为了使用路由的应用

If your app uses routing, you need to teach the server to always return 
`index.html` when the user asks for an HTML page
for reasons explained in the [Deployment](guide/deployment#fallback) guide.

如果应用要使用路由，就要让服务器在用户要求 HTML 页面时始终返回`index.html`。
此中原因，在[发布](guide/deployment#fallback)一章中有解释。

Everything seems fine while you move about _within_ the app. 
But you'll see the problem right away if you refresh the browser
or paste a link to an app page (called a "deep link") into the browser address bar.

当我们在应用*内部*移动时，看起来一切正常。但是如果刷新浏览器，或者在地址栏中输入一个到具体页面的地址（也就是"深链接"）时，问题就来了。

You'll most likely get a *404 - Page Not Found* response from the server
for any address other than `/` or `/index.html`.

我们很可能从服务器得到得到*404 - 页面不存在* —— 只有 `/` 或 `/index.html` 例外。

You have to configure the server to return `index.html` for requests to these "unknown" pages.
The `lite-server` development server does out-of-the-box.
If you've switched over to F5 and IIS, you have to configure IIS to do it.
This section walks through the steps to adapt the QuickStart application.

我们就要配置服务器，为那些"未知"的页面返回`index.html`。
`lite-server`开发服务器内置了这项功能。如果要切换到 F5 + IIS，我们就要自己来配置IIS实现它了。
接下来我们就看看对快速起步应用做配置的步骤。

#### Configure IIS rewrite rules

#### 配置 IIS 重写规则

Visual Studio ships with IIS Express, which has the rewrite module baked in. 
However, if you're using regular IIS you'll have to install the rewrite 
module.  

Visual Studio 自带了一个 IIS Express，其中有一个重写（rewrite）模块。
不过，如果使用标准版的 IIS ，就要自己去安装这个重写模块了。

Tell Visual Studio how to handle requests for route app pages by adding these 
rewrite rules near the bottom of the `web.config`:

通过把下列重写规则添加到`web.config`的底部，就可以告诉 Visual Studio如何处理到应用页面的请求。

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

<div class="l-sub-section">

The match url, `<match url=".*" />`, will rewrite every request. You'll have to adjust this if 
you want some requests to get through, such as web API requests. 

匹配 url `<match url=".*" />`语句将会重写每一个请求。如果需要直接放行某些请求，比如一些Web API请求，我们就必须调整它才行。

The URL in `<action type="Rewrite" url="/src/"/>` should 
match the base href in `index.html`.

`<action type="Rewrite" url="/src/"/>`中的 url将会匹配`index.html`中的基地址（base href）。

</div>

Build and launch the app with debugger by clicking the **Run** button or by pressing `F5`.

点击**Run**按钮或者按`F5`键，用调试器构建和启动应用。

<div class="l-sub-section">

It's faster to run without the debugger by pressing `Ctrl-F5`.

按`Ctrl-F5`不带调试器的运行应用，速度会更快。

</div>

The default browser opens and displays the QuickStart sample application.

默认浏览器打开并显示《快速上手》例子应用。

Try editing any of the project files. Save and refresh the browser to
see the changes. 


尝试编辑任何项目文件，*保存*并刷新浏览器来查看效果。
