# Angular Ivy

# Angular Ivy ['aɪvɪ]（常春藤）

Ivy is the code name for Angular's [next-generation compilation and rendering pipeline](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7).
With the version 9 release of Angular, the new compiler and runtime instructions are used by default instead of the older compiler and runtime, known as View Engine.

Ivy 是 Angular [下一代编译和渲染管道](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7)的代号。
从 Angular 的版本 9 开始，这个新的编译器和运行时指令集就代替了老的编译器和运行时（即视图引擎 View Engine）成为了默认值。

<div class="alert is-helpful">

Learn more about the [Compiler](https://www.youtube.com/watch?v=anphffaCZrQ) and [Runtime](https://www.youtube.com/watch?v=S0o-4yc2n-8) in these videos from our team.

要想了解此[编译器](https://www.youtube.com/watch?v=anphffaCZrQ)和[运行时](https://www.youtube.com/watch?v=S0o-4yc2n-8)的更多信息，请参见我们团队的视频。

</div>

{@a aot-and-ivy}
## AOT and Ivy

## AOT 和 Ivy

AOT compilation with Ivy is faster and should be used by default.
In the `angular.json` workspace configuration file, set the default build options for your project to always use AOT compilation.
When using application internationalization (i18n) with Ivy, [translation merging](guide/i18n#merge) also requires the use of AOT compilation.

使用 Ivy 的 AOT 编译速度更快，应该默认使用。在 `angular.json` 工作区配置文件中，将项目的默认构建选项设置为始终使用 AOT 编译。在 Ivy 中使用应用程序国际化（i18n）时，[翻译合并](guide/i18n#merge)还需要使用 AOT 编译。

<code-example language="json" header="angular.json">

{
  "projects": {
    "my-existing-project": {
      "architect": {
        "build": {
          "options": {
            ...
            "aot": true,
          }
        }
      }
    }
  }
}
</code-example>

## Ivy and libraries

## Ivy 和库

Ivy applications can be built with libraries that were created with the View Engine compiler.
This compatibility is provided by a tool known as the Angular compatibility compiler (`ngcc`).
CLI commands run `ngcc` as needed when performing an Angular build.

可以使用通过 View Engine 编译器创建的库来构建 Ivy 应用程序。此兼容性由称为 Angular 兼容性编译器（ `ngcc` ）的工具提供。CLI 命令在执行 Angular 构建时会根据需要运行 `ngcc`。

For more information on how to publish libraries see [Publishing your Library](guide/creating-libraries#publishing-your-library).

要了解关于如何发布库的知识，参见[发布库](guide/creating-libraries#publishing-your-library)部分。

{@a maintaining-library-compatibility}
### Maintaining library compatibility

### 保持库的兼容性

If you are a library author, you should keep using the View Engine compiler as of version 9.
By having all libraries continue to use View Engine, you will maintain compatibility with default v9 applications that use Ivy, as well as with applications that have opted to continue using View Engine.

如果你是库作者，则应从版本 9 之后继续使用 View Engine 编译器。通过让所有库继续使用 View Engine，你将与使用 Ivy 的默认 v9 应用程序以及已选择的应用程序保持兼容性。

See the [Creating Libraries](guide/creating-libraries) guide for more on how to compile or bundle your Angular library.
When you use the tools integrated into the Angular CLI or `ng-packagr`, your library will always be built the right way automatically.

有关如何编译或打包 Angular 库的更多信息，请参见[创建库](guide/creating-libraries)指南。当你使用 Angular CLI 或 `ng-packagr` 集成的工具时，将始终以正确的方式自动构建你的库。

{@a ivy-and-universal-app-shell}
## Ivy and Universal/App shell

## Ivy 和 Universal / App shell

In version 9, the server builder which is used for [App shell](guide/app-shell) and [Angular Universal](guide/universal) has the `bundleDependencies` option enabled by default.
If you opt-out of bundling dependencies you will need to run the standalone Angular compatibility compiler (`ngcc`). This is needed because otherwise Node will be unable to resolve the Ivy version of the packages.

在版本 9 中，用于 [App Shell](guide/app-shell) 和 [Angular Universal](guide/universal) 的服务器构建器会默认启用 `bundleDependencies` 选项。如果你选择放弃打包依赖项，则需要运行独立的 Angular 兼容性编译器（`ngcc`）。这是必要的，否则 Node 将无法解析 Ivy 版本的程序包。

You can run `ngcc` after each installation of node_modules by adding a `postinstall` [npm script](https://docs.npmjs.com/misc/scripts):

你可以在每次安装 `ngcc` 后通过添加 `postinstall` [npm 脚本](https://docs.npmjs.com/misc/scripts)来运行 `ngcc` ：

<code-example language="json" header="package.json">
{
  "scripts": {
    "postinstall": "ngcc"
  }
}
</code-example>

<div class="alert is-important">

 * The `postinstall` script will run on every installation of `node_modules`, including those performed by `ng update` and `ng add`.
 *Don't use `--create-ivy-entry-points` as this will cause Node not to resolve the Ivy version of the packages correctly.

   不要使用 `--create-ivy-entry-points` 因为这将导致 Node 无法正确解析软件包的 Ivy 版本。

</div>

{@a opting-out-of-angular-ivy}
## Opting out of Ivy in version 9

## 选择性禁用版本 9 中的 Ivy

In version 9, Ivy is the default.
For compatibility with current workflows during the update process, you can choose to opt out of Ivy and continue using the previous compiler, View Engine.

在版本 9 中，Ivy 是默认值。为了在更新过程中与当前工作流兼容，你可以选择性禁用 Ivy，继续使用以前的编译器 View Engine。

<div class="alert is-helpful">

Before disabling Ivy, check out the debugging recommendations in the [Ivy Compatibility Guide](guide/ivy-compatibility#debugging).

在禁用 Ivy 之前，请查看 [Ivy 兼容性指南](guide/ivy-compatibility#debugging)中的调试建议。

</div>

To opt out of Ivy, change the `angularCompilerOptions` in your project's TypeScript configuration, most commonly located at `tsconfig.app.json` at the root of the workspace.

要选择性禁用 Ivy，要在项目的 TypeScript 配置中更改 `angularCompilerOptions`，它通常位于工作区根目录的 `tsconfig.app.json` 中。

The value of the `enableIvy` flag is set to `true` by default, as of version 9.

从版本 9 开始，默认情况下 `enableIvy` 标志的值设置为 `true`。

The following example shows how to set the `enableIvy` option to `false` in order to opt out of Ivy.

以下示例显示了如何将 `enableIvy` 选项设置为 `false` 以便选择性的禁用 Ivy。

<code-example language="json" header="tsconfig.app.json">
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "angularCompilerOptions": {
    "enableIvy": false
  }
}
</code-example>

<div class="alert is-important">

If you disable Ivy, you might also want to reconsider whether to make AOT compilation the default for your application development, as described [above](#aot-and-ivy).

如果禁用 Ivy，则可能还需要重新评估是否将 AOT 编译设置为应用程序开发的默认设置，[如上所述](#aot-and-ivy)。

To revert the compiler default, set the build option `aot: false` in the `angular.json` configuration file.

要恢复编译器的默认设置，请在 `angular.json` 配置文件中设置构建选项 `aot: false`。

</div>

If you disable Ivy and the project uses internationalization, you can also remove the `@angular/localize` runtime component from the project's polyfills file located be default at `src/polyfills.ts`.

如果禁用 Ivy 并且项目使用国际化，则还可以从默认位于 `src/polyfills.ts` 的项目的腻子脚本文件中删除 `@angular/localize` 运行时组件。

To remove, delete the `import '@angular/localize/init';` line from the polyfills file.

要移除它，请删除此腻子脚本文件中的一行 `import '@angular/localize/init';`。

<code-example language="typescript" header="polyfills.ts">
/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
</code-example>

{@a using-ssr-without-angular-ivy}
### Using SSR without Ivy

### 在没有 Ivy 的情况下使用 SSR

If you opt out of Ivy and your application uses  [Angular Universal](guide/universal) to render Angular applications on the server, you must also change the way the server performs bootstrapping.

如果选择性禁用 Ivy，并且你的应用程序使用 [Angular Universal](guide/universal) 在服务器上渲染 Angular 应用程序，则还必须更改服务器执行引导的方式。

The following example shows how you modify the `server.ts` file to provide the `AppServerModuleNgFactory` as the bootstrap module.

下面的示例展示了如何修改 `server.ts` 文件以将 `AppServerModuleNgFactory` 提供为引导模块。

* Import `AppServerModuleNgFactory` from the `app.server.module.ngfactory` virtual file.

  从 `app.server.module.ngfactory` 虚拟文件中导入 `AppServerModuleNgFactory`。

* Set `bootstrap: AppServerModuleNgFactory` in the `ngExpressEngine` call.

  在 `ngExpressEngine` 调用中设置 `bootstrap: AppServerModuleNgFactory`。

<code-example language="typescript" header="server.ts">
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';

import { AppServerModuleNgFactory } from './src/app/app.server.module.ngfactory';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ivy-test/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './src/main.server';
</code-example>
