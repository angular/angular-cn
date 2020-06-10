# App shell

# 应用外壳

App shell is a way to render a portion of your application via a route at build time.
It can improve the user experience by quickly launching a static rendered page (a skeleton common to all pages) while the browser downloads the full client version and switches to it automatically after the code loads.

应用外壳是一种在构建期间借助路由渲染部分应用的方法。它可以通过快速启动一个静态渲染页面（所有页面的公共骨架）来改善用户体验。与此同时，浏览器会下载完整的客户端版本，并在代码加载后自动切换到完整版。

This gives users a meaningful first paint of your application that appears quickly because the browser can simply render the HTML and CSS without the need to initialize any JavaScript.

这能让用户快速看到应用中第一个有意义的画面，因为浏览器可以很简单地渲染出 HTML 和 CSS，而无需初始化任何 JavaScript。

Learn more in [The App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell).

欲知详情，参见[应用外壳模型](https://developers.google.com/web/fundamentals/architecture/app-shell)。

## Step 1: Prepare the application

## 第 1 步：准备本应用

You can do this with the following CLI command:

可以用下列 CLI 命令来执行本操作：

<code-example language="bash">
ng new my-app --routing
</code-example>

For an existing application, you have to manually add the `RouterModule` and defining a `<router-outlet>` within your application.

对于既有应用，你必须手动添加 `RouterModule` 并在应用中定义 `<router-outlet>`。

## Step 2: Create the app shell

## 第 2 步：创建应用外壳

Use the CLI to automatically create the app shell.

使用 CLI 自动创建一个应用外壳。

<code-example language="bash">
ng generate app-shell
</code-example>

* `client-project` takes the name of your client application.

  `client-project` 是你这个客户端应用的名字。

After running this command you will notice that the `angular.json` configuration file has been updated to add two new targets, with a few other changes.

执行完这个命令，你会发现 `angular.json` 配置文件中已经增加了两个新目标，并做了一些其它更改。

<code-example language="json">
"server": {
  "builder": "@angular-devkit/build-angular:server",
  "options": {
    "outputPath": "dist/my-app-server",
    "main": "src/main.server.ts",
    "tsConfig": "tsconfig.server.json"
  }
},
"app-shell": {
  "builder": "@angular-devkit/build-angular:app-shell",
  "options": {
    "browserTarget": "my-app:build",
    "serverTarget": "my-app:server",
    "route": "shell"
  },
  "configurations": {
    "production": {
      "browserTarget": "my-app:build:production",
      "serverTarget": "my-app:server:production"
    }
  }
}
</code-example>

## Step 3: Verify the app is built with the shell content

## 第 3 步：验证该应用是使用应用外壳的内容构建的

Use the CLI to build the `app-shell` target.

使用 CLI 构建目标 `app-shell`。

<code-example language="bash">
ng run my-app:app-shell
</code-example>

Or to use the production configuration.

或使用产品环境配置。

<code-example language="bash">
ng run my-app:app-shell:production
</code-example>

To verify the build output, open `dist/my-app/index.html`. Look for default text `app-shell works!` to show that the app shell route was rendered as part of the output.

要验证构建的输出，请打开 `dist/my-app/index.html`。寻找默认的文本 `app-shell works!` 就可以验证这个应用外壳路由确实是作为输出的一部分渲染出来的。
