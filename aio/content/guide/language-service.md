# Angular Language Service

# Angular 语言服务

The Angular Language Service is a way to get completions, errors, 
hints, and navigation inside your Angular templates whether they 
are external in an HTML file or embedded in annotations/decorators 
in a string. The Angular Language Service autodetects that you are 
opening an Angular file, reads your `tsconfig.json` file, finds all the 
templates you have in your application, and then provides language 
services for any templates that you open.

Angular 语言服务让我们能在模板内获得自动完成、错误检查、给出提示和内部导航等功能，而不用管这些模板位于外部HTML文件中还是内嵌在注解/装饰器的字符串中。
Angular语言服务会自动检测我们要打开的文件（从我们的`tsconfig.json`中读取），找出应用中所需的所有模板，然后为我们打开的这些模板提供语言服务。

## Autocompletion

## 自动完成

Autocompletion can speed up your development time by providing you with 
contextual possibilities and hints as you type. This example shows 
autocomplete in an interpolation. As you type it out, 
you can hit tab to complete.

自动完成可以在输入时为我们提供当前情境下的候选内容和提示，从而提高开发速度。下面这个例子展示了插值表达式中的自动完成功能。当我们进行输入的时候，就可以按tab键来自动完成。

<figure>
  <img src="generated/images/guide/language-service/language-completion.gif" alt="autocompletion">
</figure>

There are also completions within 
elements. Any elements you have as a component selector will 
show up in the completion list.

还有对元素的自动完成。我们定义的任何组件的选择器都会显示在自动完成列表中。

## Error checking

## 错误检查

The Angular Language Service can also forewarn you of mistakes in your code. 
In this example, Angular doesn't know what `orders` is or where it comes from. 

Angular 语言服务还能对代码中存在的错误进行预警。在这个例子中，Angular 不知道什么是`orders`或者它来自哪里。

<figure>
  <img src="generated/images/guide/language-service/language-error.gif" alt="error checking">
</figure>

## Navigation

## 导航

Navigation allows you to hover to 
see where a component, directive, module, etc. is from and then 
click and press F12 to go directly to its definition.

导航可以让我们在鼠标悬浮时看到某个组件、指令、模块等来自哪里，然后可以点击并按 F12 直接跳转到它的定义处。

<figure>
  <img src="generated/images/guide/language-service/language-navigation.gif" alt="navigation">
</figure>


## Angular Language Service in your editor

## 编辑器中的 Angular 语言服务

Angular Language Service is currently available for [Visual Studio Code](https://code.visualstudio.com/) and 
[WebStorm](https://www.jetbrains.com/webstorm). 

Angular 语言服务目前在[Visual Studio Code](https://code.visualstudio.com/)和[WebStorm](https://www.jetbrains.com/webstorm)中都是可用的。

### Visual Studio Code

### Visual Studio Code 中

In Visual Studio Code, install Angular Language Service from the store, 
which is accessible from the bottom icon on the left menu pane. 
You can also use the VS Quick Open (⌘+P) to search for the extension. When you've opened it, 
enter the following command: 

Visual Studio Code 可以从商店中安装语言服务，这个功能就在左侧菜单面板最底下的那个图标。
我们也可以使用 VS 的快速打开（⌘+P）功能来查找这个扩展插件。打开它之后就输入下列命令：

```sh
ext install ng-template
```

Then click the install button to install the Angular Language Service. 

然后点击安装按钮来安装 Angular 语言服务。

### WebStorm

### WebStorm 中

In webstorm, you have to install the language service as a dev dependency. 
When Angular sees this dev dependency, it provides the 
language service inside of WebStorm. Webstorm then gives you 
colorization inside the template and autocomplete in addition to the Angular Language Service.

在 WebStorm 中，我们必须把语言服务安装为一个开发依赖。
当 Angular 看到这个开发依赖时，它就会在 WebStorm 中提供语言服务。除了 Angular 语言服务之外，WebStorm 还会为我们提供模板中的代码高亮和自动完成功能。

Here's the dev dependency 
you need to have in `package.json`:

下面这个开发依赖需要添加到`package.json`中：

```json

devDependencies {
	"@angular/language-service": "^4.0.0"
}
```

Then in the terminal window at the root of your project, 
install the `devDependencies` with `npm` or `yarn`: 

然后，打开终端窗口，在项目根目录下使用`npm`或`yarn`来安装这些`devDependencies`：

```sh
npm install 
```

*OR* 

*或*

```sh
yarn
```

*OR* 

*或*

```sh
yarn install
```


### Sublime Text

### Sublime Text 编辑器

In [Sublime Text](https://www.sublimetext.com/), you first need an extension to allow Typescript. 
Install the latest version of typescript in a local `node_modules` directory:

在[Sublime Text](https://www.sublimetext.com/)中，我们首先需要一个扩展来支持 TypeScript。
把最新版本的 TypeScript 安装到本地的`node_modules`目录下：

```sh
npm install --save-dev typescript
```

Then install the Angular Language Service in the same location:

然后把 Angular 语言服务安装到同一位置：

```sh
npm install --save-dev @angular/language-service
```

Starting with TypeScript 2.3, TypeScript has a language service plugin model that the language service can use. 

从 TypeScript 2.3 开始，TypeScript 提供了一种插件模式的语言服务可以用。

Next, in your user preferences (`Cmd+,` or `Ctrl+,`), add:

接下来，在你的用户首选项中（按`Cmd+,`或`Ctrl+,`）添加：

```json
"typescript-tsdk": "<path to your folder>/node_modules/typescript/lib"
```


## Installing in your project

## 安装到工程中

You can also install Angular Language Service in your project with the 
following `npm` command:

我们还可以使用下列`npm`命令来把 Angular 语言服务安装到工程中：

```sh
npm install --save-dev @angular/language-service
```
Additionally, add the following to the `"compilerOptions"` section of 
your project's `tsconfig.json`.

另外，还要在工程的`tsconfig.json`中添加下列`"compilerOptions"`区域：

```json
  "plugins": [
      {"name": "@angular/language-service"}
  ]
```
Note that this only provides diagnostics and completions in `.ts` 
files. You need a custom sublime plugin (or modifications to the current plugin) 
for completions in HTML files.

注意，这只是提供了`.ts`文件中的诊断与自动完成。我们需要一个自定义的sublime插件（或修改现有插件）来在 HTML 文件中提供自动完成功能。

## How the Language Service works

## 语言服务的工作原理

When you use an editor with a language service, there's an 
editor process which starts a separate language process/service 
to which it speaks through an [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call). 
Any time you type inside of the editor, it sends information to the other process to 
track the state of your project. When you trigger a completion list within a template, the editor process first parses the template into an HTML AST, or [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree). Then the Angular compiler interprets 
what module the template is part of, the scope you're in, and the component selector. Then it figures out where in the template AST your cursor is. When it determines the 
context, it can then determine what the children can be.

当使用带有语言服务的编辑器时，就会有一个编辑器进程，它会启动一个独立的语言服务进程/服务，它们通过[RPC](https://en.wikipedia.org/wiki/Remote_procedure_call)彼此交谈。
当我们在编辑器中输入的时候，它把这些信息发送到另一个进程中，以便追踪工程的状态。
当我们在模板中触发一个自动完成列表时，编辑器进程就会先把这个模板解析成 HTML AST，或者叫[抽象语法树](https://en.wikipedia.org/wiki/Abstract_syntax_tree)。然后，Angular 编译器就会解释模板所属的模块以及模板选择器。然后它找出我们的光标目前正在模板 AST 的什么位置。一旦它确定了情境，就可以决定其子节点可以是什么了。

It's a little more involved if you are in an interpolation. If you have an interpolation of `{{data.---}}` inside a `div` and need the completion list after `data.---`, the compiler can't use the HTML AST to find the answer. The HTML AST can only tell the compiler that there is some text with the characters "`{{data.---}}`". That's when the template parser produces an expression AST, which resides within the template AST. The Angular Language Services then looks at `data.---` within its context and asks the TypeScript Language Service what the members of data are. TypeScript then returns the list of possibilities.


如果是在插值表达式中，还会牵扯到更多东西。如果我们在`div`元素中有一个插值表达式`{{data.---}}`，并且需要在输入了`data.`之后提供自动完成列表，编译器就没办法使用 HTML AST 来找出答案了。
HTML AST只能告诉编译器，有一些具有 "`{{data.---}}`" 特征的文本。也就是说模板解析器会生成表达式的 AST ，并且放在模板的 AST 中。Angular 语言服务然后在这个情境下查找`data.---`，并向 TypeScript 语言服务询问这些数据都有哪些成员。然后 TypeScript 就会返回一个可能的列表。

For more in-depth information, see the 
[Angular Language Service API](https://github.com/angular/angular/blob/master/packages/language-service/src/types.ts)


要了解更多更深入的信息，参见 [Angular 语言服务 API](https://github.com/angular/angular/blob/master/packages/language-service/src/types.ts)





<hr>

## More on Information

## 更多信息

For more information, see [Chuck Jazdzewski's presentation](https://www.youtube.com/watch?v=ez3R0Gi4z5A&t=368s) on the Angular Language 
Service from [ng-conf](https://www.ng-conf.org/) 2017.

要了解更多信息，参见 [ng-conf](https://www.ng-conf.org/) 2017 中 [Chuck Jazdzewski的演讲](https://www.youtube.com/watch?v=ez3R0Gi4z5A&t=368s) 中讲解的 Angular 语言服务。
