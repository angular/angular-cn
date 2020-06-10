# Ivy compatibility guide

# Ivy 兼容性指南

The Angular team has worked hard to ensure Ivy is as backwards-compatible with the previous rendering engine ("View Engine") as possible.
However, in rare cases, minor changes were necessary to ensure that the Angular's behavior was predictable and consistent, correcting issues in the View Engine implementation.
In order to smooth the transition, we have provided [automated migrations](guide/updating-to-version-9#migrations) wherever possible so your application and library code is migrated automatically by the CLI.
That said, some applications will likely need to apply some manual updates.

Angular 团队一直在努力确保 Ivy 与之前的渲染引擎（“View Engine”）尽可能向后兼容。但是，在极少数情况下，需要做一些小改动才能确保 Angular 的行为是可预测和一致的，以纠正 View Engine 实现中的问题。为了顺利过渡，我们尽可能提供了[自动迁移功能，](guide/updating-to-version-9#migrations)以便 CLI 可以[自动迁移](guide/updating-to-version-9#migrations)你的应用和库代码。也就是说，某些应用可能需要做一些手动更新。

{@a debugging}

## How to debug errors with Ivy

## 如何用 Ivy 调试错误

In version 9, [a few deprecated APIs have been removed](guide/updating-to-version-9#removals) and there are a [few breaking changes](guide/updating-to-version-9#breaking-changes) unrelated to Ivy.
If you're seeing errors after updating to version 9, you'll first want to rule those changes out.

在版本 9 中，[已经删除了一些已弃用的 API，](guide/updating-to-version-9#removals)并且还有[一些](guide/updating-to-version-9#breaking-changes)与 Ivy 无关的[重大变更](guide/updating-to-version-9#breaking-changes)。如果你在升级到版本 9 后遇到错误，你首先要把这些变更排除在外。

To do so, temporarily [turn off Ivy](guide/ivy#opting-out-of-angular-ivy) in your `tsconfig.json` and re-start your app.

为此，请暂时[关闭](guide/ivy#opting-out-of-angular-ivy) `tsconfig.json` [Ivy](guide/ivy#opting-out-of-angular-ivy)并重新启动应用。

If you're still seeing the errors, they are not specific to Ivy. In this case, you may want to consult the [general version 9 guide](guide/updating-to-version-9). If you've opted into any of the stricter type-checking settings that are new with v9, you may also want to check out the [template type-checking guide](guide/template-typecheck).

如果你仍然看到这些错误，那么它们并不是 Ivy 特有的。在这种情况下，你可以查阅[常规的版本 9 指南](guide/updating-to-version-9)。如果你选择启用 v9 中任何新增的更严格的类型检查，你可能还需要查看[模板类型检查指南](guide/template-typecheck)。

If the errors are gone, switch back to Ivy by removing the changes to the `tsconfig.json` and review the list of expected changes below.

如果错误消失了，可以删除对 `tsconfig.json` 的更改，切换回 Ivy，并查看下面的预期更改列表。

{@a payload-size-debugging}

### Payload size debugging

### 有效载荷大小调试

If you notice that the size of your application's main bundle has increased with Ivy, you may want to check the following:

如果你注意到应用的主服务包的大小随着 Ivy 的增加而增加了，你可能需要检查如下内容：

1. Verify that the components and `NgModules` that you want to be lazy loaded are only imported in lazy modules.
Anything that you import outside lazy modules can end up in the main bundle.
See more details in the original issue [here](https://github.com/angular/angular-cli/issues/16146#issuecomment-557559287).

   验证你想要延迟加载的组件和 `NgModules` 是否只在惰性模块中才导入过。你在惰性模块之外导入的东西最终都会出现在主发布包中。原始问题请[点击此处](https://github.com/angular/angular-cli/issues/16146#issuecomment-557559287)查看详情。

1. Check that imported libraries have been marked side-effect-free.
If your app imports from shared libraries that are meant to be free from side effects, add "sideEffects": false to their `package.json`.
This will ensure that the libraries will be properly tree-shaken if they are imported but not directly referenced.
See more details in the original issue [here](https://github.com/angular/angular-cli/issues/16799#issuecomment-580912090).

   检查导入的库是否已标记为无副作用。如果你的应用导入过那些没有副作用的共享库，就把“sideEffects”：false 添加到他们的 `package.json`。如果这些库被导入过但没有被直接引用，那么这将确保这些库被正确摇树优化了。原始问题请[点击此处](https://github.com/angular/angular-cli/issues/16799#issuecomment-580912090)查看详情。

1. Projects not using Angular CLI will see a significant size regression unless they update their minifier settings and set compile-time constants `ngDevMode`, `ngI18nClosureMode` and `ngJitMode` to `false` (for Terser, please set these to `false` via [`global_defs` config option](https://terser.org/docs/api-reference.html#conditional-compilation)).
Please note that these constants are not meant to be used by 3rd party library or application code as they are not part of our public api surface and might change in the future.

   未使用 Angular CLI 的项目会看到一个显著的大小回归，除非他们更新了最小化工具的设置，并把编译时常量 `ngDevMode`，`ngI18nClosureMode` 和 `ngJitMode` 设为了 `false` （对于 Terser，请通过[`global_defs` 配置选项](https://terser.org/docs/api-reference.html#conditional-compilation)把它们设为 `false` ）。请注意，这些常量不能给第三方库或应用代码使用，因为它们不是我们公共 API 的一部分，可能会在将来发生变化。

{@a common-changes}

### Changes you may see

### 你可能会看到变化

* By default, `@ContentChildren` queries will only search direct child nodes in the DOM hierarchy (previously, they would search any nesting level in the DOM as long as another directive wasn't matched above it). See further [details](guide/ivy-compatibility-examples#content-children-descendants).

  默认情况下，`@ContentChildren` 查询只搜索 DOM 层次结构中的直接子节点（以前，只要它没有匹配到另一个指令，它们就会搜索 DOM 中的任何嵌套级别）。详情[参见这里](guide/ivy-compatibility-examples#content-children-descendants)。

* All classes that use Angular DI must have an Angular decorator like `@Directive()` or `@Injectable` (previously, undecorated classes were allowed in AOT mode only or if injection flags were used). See further [details](guide/ivy-compatibility-examples#undecorated-classes).

  所有使用 Angular DI 的类都必须有一个 Angular 装饰器，比如 `@Directive()` 或者 `@Injectable`（以前，只有在 AOT 模式下或者带有注入标志时才能使用未修饰的类）。详情[参见这里](guide/ivy-compatibility-examples#undecorated-classes)。

* Unbound inputs for directives (e.g. name in `<my-comp name="">`) are now set upon creation of the view, before change detection runs (previously, all inputs were set during change detection).

  指令的未绑定输入（例如 `<my-comp name="">` ）现在是在创建视图时设置的，位于运行变更检测之前（以前所有输入都是在变更检测过程中设置的）。

* Static attributes set directly in the HTML of a template will override any conflicting host attributes set by directives or components (previously, static host attributes set by directives / components would override static template attributes if conflicting).

  直接在模板的 HTML 中设置的静态属性会覆盖指令或组件中设置的任何与之冲突的宿主属性（以前，如果有冲突，指令/组件设置的静态宿主属性会覆盖静态的模板属性）。

{@a less-common-changes}

### Less common changes

### 不太常见的变化

* Properties like `host` inside `@Component` and `@Directive` decorators can be inherited (previously, only properties with explicit field decorators like `@HostBinding` would be inherited).

  像 `@Component` 和 `@Directive` 装饰器里面的 `host` 这样的属性可以被继承（之前，只有具有显式字段装饰器的属性，比如 `@HostBinding` 才会被继承）。

* HammerJS support is opt-in through importing the `HammerModule` (previously, it was always included in production bundles regardless of whether the app used HammerJS).

  HammerJS 支持是可选的，如果需要则导入 `HammerModule` （以前，它总是包含在生产包中，而不管应用是否使用了 HammerJS）。

* `@ContentChild` and `@ContentChildren` queries will no longer be able to match their directive's own host node (previously, these queries would match the host node in addition to its content children).

  `@ContentChild` 和 `@ContentChildren` 查询将无法匹配指令自己的宿主节点（以前，这些查询除了内容子节点外，还会匹配宿主节点）。

* If a token is injected with the `@Host` or `@Self` flag, the module injector is not searched for that token (previously, tokens marked with these flags would still search at the module level).

  如果一个令牌是使用 `@Host` 或 `@Self` 标志注入的，则不会在模块注入器中搜索该令牌（以前，有这些标志的令牌仍会在模块级别进行搜索）。

* When accessing multiple local refs with the same name in template bindings, the first is matched (previously, the last instance was matched).

  当在模板绑定中访问同名的多个本地引用时，匹配上的总是第一个引用（以前匹配的是最后一个引用）。

* Directives that are used in an exported module (but not exported themselves) are exported publicly (previously, the compiler would automatically write a private, aliased export that it could use its global knowledge to resolve downstream).

  从本模块导出的其它模块中使用的指令（但这些模块自己没有主动导出过）会被公开导出（之前，编译器会自动编写一个私有的、使用别名的导出，以便利用其中的全局知识解析下游模块）。

* Foreign functions or foreign constants in decorator metadata aren't statically resolvable (previously, you could import a constant or function from another compilation unit, like a library, and use that constant/function in your `@NgModule` definition).

  装饰器元数据中的外部函数或外部常量不能再用静态解析的（之前，你可以从其它编译单元（比如库）中导入一个常量或函数，并在你的 `@NgModule` 定义中使用该常量/函数）。

* Forward references to directive inputs accessed through local refs are no longer supported by default. [details](guide/ivy-compatibility-examples#forward-refs-directive-inputs)

  默认情况下，不再支持通过本地引用来访问指令输入的前向引用。[详情在此](guide/ivy-compatibility-examples#forward-refs-directive-inputs)

* If there is both an unbound class attribute and a `[class]` binding, the classes in the unbound attribute will also be added (previously, the class binding would overwrite classes in the unbound attribute).

  如果同时存在一个未绑定的 class 属性和一个 `[class]` 绑定，那么未绑定的属性中的类也会被添加进去（以前，类绑定会覆盖未绑定属性中的类）。

* It is now an error to assign values to template-only variables like `item` in `ngFor="let item of items"` (previously, the compiler would ignore these assignments).

  现在赋值给一个仅用在模板中的变量会出错，比如 `ngFor="let item of items"` 中的 `item`（以前，编译器会忽略这些赋值）。

* It's no longer possible to overwrite lifecycle hooks with mocks on directive instances for testing (instead, modify the lifecycle hook on the directive type itself).

  不能再在指令实例上使用 Mock 方式来覆盖生命周期钩子（而应该修改指令类型本身的生命周期钩子）。

* Special injection tokens (such as `TemplateRef` or `ViewContainerRef`) return a new instance whenever they are requested (previously, instances of special tokens were shared if requested on the same node). This primarily affects tests that do identity comparison of these objects.

  特殊注入令牌（比如 `TemplateRef` 或 `ViewContainerRef` ）每次都会返回一个新的实例（之前，如果它们在同一个节点上被请求过，就会共享这些特殊令牌的同一个实例）。这主要会影响到那些比较这些对象标识的测试。

* ICU parsing happens at runtime, so only text, HTML tags and text bindings are allowed inside ICU cases (previously, directives were also permitted inside ICUs).

  ICU 解析是在运行时发生的，因此在 ICU 案例中只允许使用文本、HTML 标签和文本绑定（以前，ICU 中也允许使用指令）。

* Adding text bindings into i18n translations that are not present in the source template itself will throw a runtime error (previously, including extra bindings in translations was permitted).

  把文本绑定添加到源模板中不存在的 i18n 会抛出一个运行时错误（以前，允许在翻译中包含额外绑定）。

* Extra HTML tags in i18n translations that are not present in the source template itself will be rendered as plain text (previously, these tags would render as HTML).

  i18n 翻译中的额外 HTML 标签（源模板中不存在的）将渲染为纯文本（以前，这些标签会渲染为 HTML 格式）。

* Providers formatted as `{provide: X}` without a `useValue`, `useFactory`, `useExisting`, or `useClass` property are treated like `{provide: X, useClass: X}` (previously, it defaulted to `{provide: X, useValue: undefined}`).

  格式为 `{provide: X}` 且不带 `useValue`，`useFactory`，`useExisting` 或 `useClass` 属性的服务提供者将被视为 `{provide: X, useClass: X}` （以前被视为 `{provide: X, useValue: undefined}` ）。

* `DebugElement.attributes` returns `undefined` for attributes that were added and then subsequently removed (previously, attributes added and later removed would have a value of `null`).

  `DebugElement.attributes` 为那些已添加过的属性返回 `undefined`，并导致它们被移除（以前，表示添加后再删除的属性的值为 `null` ）。

* `DebugElement.classes` returns `undefined` for classes that were added and then subsequently removed (previously, classes added and later removed would have a value of `false`).

  `DebugElement.classes` 为那些已添加过再删除的类返回 `undefined` （以前，表示添加后再删除的类的值为 `false` ）。

* If selecting the native `<option>` element in a `<select>` where the `<option>`s are created via `*ngFor`, use the `[selected]` property of an `<option>` instead of binding to the `[value]` property of the `<select>` element (previously, you could bind to either.) [details](guide/ivy-compatibility-examples#select-value-binding)

  如果在 `<select>` 中选择原生的 `<option>` 元素，而这个 `<option>` 元素是通过 `*ngFor` 创建的，就使用 `<option>` 的 `[selected]` 属性，而不是绑定到 `<select>` 元素上的 `[value]` 属性（以前，你可以绑定到任何一个。）[详情在此](guide/ivy-compatibility-examples#select-value-binding)

* Embedded views (such as ones created by `*ngFor`) are now inserted in front of anchor DOM comment node (e.g. `<!--ng-for-of-->`) rather than behind it as was the case previously.
In most cases this does not have any impact on rendered DOM.
In some cases (such as animations delaying the removal of an embedded view) any new embedded views will be inserted after the embedded view being animated away.
This difference only last while the animation is active, and might alter the visual appearance of the animation.
Once the animation is finished the resulting rendered DOM is identical to that rendered with View Engine.

  嵌入式视图（比如 `*ngFor` 创建的嵌入式视图）现在会插入到锚点注释节点（例如 `<!--ng-for-of-->` ）的前面，而不是像之前一样插入到后面。在大多数情况下，这对渲染的 DOM 没有任何影响。在某些情况下（比如动画会延迟删除嵌入式视图），任何新的嵌入式视图都会插入在这个被删除的嵌入式视图后面。这种差异只会在动画处于活动状态时存在，并可能会改变动画的视觉外观。动画完成后，渲染出的 DOM 与使用 View Engine 渲染的 DOM 完全相同。
