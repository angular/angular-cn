/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectorType, ɵɵdefineInjector} from '../di/interface/defs';
import {Provider} from '../di/interface/provider';
import {convertInjectableProviderToFactory} from '../di/util';
import {Type} from '../interface/type';
import {SchemaMetadata} from '../metadata/schema';
import {compileNgModule as render3CompileNgModule} from '../render3/jit/module';
import {makeDecorator, TypeDecorator} from '../util/decorators';
import {NgModuleDef} from './ng_module_def';


/**
 * @publicApi
 */
export type ɵɵNgModuleDefWithMeta<T, Declarations, Imports, Exports> = NgModuleDef<T>;


/**
 * A wrapper around an NgModule that associates it with [providers](guide/glossary#provider
 * "Definition"). Usage without a generic type is deprecated.
 *
 * 对 NgModule 及其相关 [providers](guide/glossary#provider
 * "Definition") 的包装。不带泛型的用法已弃用。
 *
 * @see [Deprecations](guide/deprecations#modulewithproviders-type-without-a-generic)
 *
 * @publicApi
 */
export interface ModuleWithProviders<T> {
  ngModule: Type<T>;
  providers?: Provider[];
}


/**
 * Type of the NgModule decorator / constructor function.
 *
 *
 * NgModule 装饰器和构造函数的类型。
 *
 * @publicApi
 */
export interface NgModuleDecorator {
  /**
   * Decorator that marks a class as an NgModule and supplies configuration metadata.
   *
   * 把一个类标记为 NgModule，并提供配置元数据。
   */
  (obj?: NgModule): TypeDecorator;
  new(obj?: NgModule): NgModule;
}

/**
 * Type of the NgModule metadata.
 *
 * NgModule 元数据的类型。
 *
 * @publicApi
 */
export interface NgModule {
  /**
   * The set of injectable objects that are available in the injector
   * of this module.
   *
   * 在当前模块的注入器中可用的一组可注入对象。
   *
   * @see [Dependency Injection guide](guide/dependency-injection)
   * @see [NgModule guide](guide/providers)
   *
   * @usageNotes
   *
   * Dependencies whose providers are listed here become available for injection
   * into any component, directive, pipe or service that is a child of this injector.
   * The NgModule used for bootstrapping uses the root injector, and can provide dependencies
   * to any part of the app.
   *
   * 在这里列出了提供商的依赖项可用于注入到任何组件、指令、管道或该注入器下的服务。
   * 引导用的 NgModule 使用的是根注入器，可以为应用中的任何部件提供依赖。
   *
   * A lazy-loaded module has its own injector, typically a child of the app root injector.
   * Lazy-loaded services are scoped to the lazy-loaded module's injector.
   * If a lazy-loaded module also provides the `UserService`, any component created
   * within that module's context (such as by router navigation) gets the local instance
   * of the service, not the instance in the root injector.
   * Components in external modules continue to receive the instance provided by their injectors.
   *
   * 惰性加载的模块有自己的注入器，通常它是根注入器的一个子注入器。
   * 惰性加载的服务，其作用范围局限于这个惰性加载模块的注入器。
   * 如果惰性加载模块也提供了 `UserService`，则任何在该模块的上下文中创建的组件（比如通过路由导航）都会获得该服务的一个局部实例，
   * 而不是根注入器中的全局实例。
   * 而外部模块中的组件仍然会使用由它们的注入器提供的实例。
   *
   * ### Example
   *
   * ### 范例
   *
   * The following example defines a class that is injected in
   * the HelloWorld NgModule:
   *
   * 下面的例子定义了一个类，它被注册在 HelloWorld 这个 NgModule 的注入器下：
   *
   * ```
   * class Greeter {
   *    greet(name:string) {
   *      return 'Hello ' + name + '!';
   *    }
   * }
   *
   * @NgModule({
   *   providers: [
   *     Greeter
   *   ]
   * })
   * class HelloWorld {
   *   greeter:Greeter;
   *
   *   constructor(greeter:Greeter) {
   *     this.greeter = greeter;
   *   }
   * }
   * ```
   */
  providers?: Provider[];

  /**
   * The set of components, directives, and pipes ([declarables](guide/glossary#declarable))
   * that belong to this module.
   *
   * 属于该模块的一组组件、指令和管道（统称[可声明对象](guide/glossary#declarable)）。
   *
   * @usageNotes
   *
   * The set of selectors that are available to a template include those declared here, and
   * those that are exported from imported NgModules.
   *
   * 在模板中可用的选择器（selector）包括那些直接声明在这里的可声明对象和导入的那些 NgModule 中所导出的可声明对象。
   *
   * Declarables must belong to exactly one module.
   * The compiler emits an error if you try to declare the same class in more than one module.
   * Be careful not to declare a class that is imported from another module.
   *
   * 可声明对象必须属于也只能属于一个模块。
   * 如果你尝试把同一个类声明在多个模块中，那么编译器就会报错。
   * 要注意不能声明那些从其它模块中导入的类。
   *
   * ### Example
   *
   * ### 范例
   *
   * The following example allows the CommonModule to use the `NgFor`
   * directive.
   *
   * 下面的例子允许 CommonModule 使用 `NgFor` 指令。
   *
   * ```javascript
   * @NgModule({
   *   declarations: [NgFor]
   * })
   * class CommonModule {
   * }
   * ```
   */
  declarations?: Array<Type<any>|any[]>;

  /**
   * The set of NgModules whose exported [declarables](guide/glossary#declarable)
   * are available to templates in this module.
   *
   * 这里列出的 NgModule 所导出的[可声明对象](guide/glossary#declarable)可用在当前模块内的模板中。
   *
   * @usageNotes
   *
   * A template can use exported declarables from any
   * imported module, including those from modules that are imported indirectly
   * and re-exported.
   * For example, `ModuleA` imports `ModuleB`, and also exports
   * it, which makes the declarables from `ModuleB` available
   * wherever `ModuleA` is imported.
   *
   * 模板可以使用来自任何导入模块中所导出的可声明对象，包括它们从别的模块导入后重新导出的。
   * 例如，`ModuleA` 导入了 `ModuleB` 并导出了它，就会让 `ModuleB` 中的可声明对象也同样在那些导入了 `ModuleA` 的模块中可用。
   *
   * ### Example
   *
   * ### 范例
   *
   * The following example allows MainModule to use anything exported by
   * `CommonModule`:
   *
   * 下列例子允许 `MainModule` 使用 `CommonModule` 中导入的任意可声明对象：
   *
   * ```javascript
   * @NgModule({
   *   imports: [CommonModule]
   * })
   * class MainModule {
   * }
   * ```
   *
   */
  imports?: Array<Type<any>|ModuleWithProviders<{}>|any[]>;

  /**
   * The set of components, directives, and pipes declared in this
   * NgModule that can be used in the template of any component that is part of an
   * NgModule that imports this NgModule. Exported declarations are the module's public API.
   *
   * 此 NgModule 中声明的一组组件、指令和管道可以在导入了本模块的模块下任何组件的模板中使用。
   * 导出的这些可声明对象就是该模块的公共 API。
   *
   * A declarable belongs to one and only one NgModule.
   * A module can list another module among its exports, in which case all of that module's
   * public declaration are exported.
   *
   * 可声明对象应该且只能属于一个 NgModule。
   * 一个模块可以列出在它的 `exports` 中列出一些其它模块，这些模块中所有公开的可声明对象也同样会导出。
   *
   * @usageNotes
   *
   * Declarations are private by default.
   * If this ModuleA does not export UserComponent, then only the components within this
   * ModuleA can use UserComponent.
   *
   * 默认情况下，可声明对象是私有的。
   * 如果 ModuleA 不导出 UserComponent，那么只有这个 ModuleA 中的组件才能使用 UserComponent。
   *
   * ModuleA can import ModuleB and also export it, making exports from ModuleB
   * available to an NgModule that imports ModuleA.
   *
   * 导出具有传递性。ModuleA 可以导入 ModuleB 并将其导出，这会让所有 ModuleB 中的导出同样可用在导入了 ModuleA 的那些模块中。
   *
   * ### Example
   *
   * ### 范例
   *
   * The following example exports the `NgFor` directive from CommonModule.
   *
   * 下面的例子导出了来自 `CommonModule` 的 `NgFor` 指令。
   *
   * ```javascript
   * @NgModule({
   *   exports: [NgFor]
   * })
   * class CommonModule {
   * }
   * ```
   */
  exports?: Array<Type<any>|any[]>;

  /**
   * The set of components to compile when this NgModule is defined,
   * so that they can be dynamically loaded into the view.
   *
   * 定义此 NgModule 中要编译的组件集，这样它们才可以动态加载到视图中。
   *
   * For each component listed here, Angular creates a `ComponentFactory`
   * and stores it in the `ComponentFactoryResolver`.
   *
   * 对于在这里列出的每个组件，Angular 都会为其创建一个 `ComponentFactory`，并将其保存到 `ComponentFactoryResolver` 中。
   *
   * Angular automatically adds components in the module's bootstrap
   * and route definitions into the `entryComponents` list. Use this
   * option to add components that are bootstrapped
   * using one of the imperative techniques, such as `ViewContainerRef.createComponent()`.
   *
   * Angular 会自动把模块的 `bootstrap`（引导模块）和路由定义中引用的组件添加到 `entryComponents` 列表中。
   * 该选项用于添加那些需要写代码来创建的组件，比如 `ViewContainerRef.createComponent()`。
   *
   * @see [Entry Components](guide/entry-components)
   * @deprecated Since 9.0.0. With Ivy, this property is no longer necessary.
   */
  entryComponents?: Array<Type<any>|any[]>;

  /**
   * The set of components that are bootstrapped when
   * this module is bootstrapped. The components listed here
   * are automatically added to `entryComponents`.
   *
   * 当该模块引导时需要进行引导的组件。列在这里的所有组件都会自动添加到 `entryComponents` 中。
   */
  bootstrap?: Array<Type<any>|any[]>;

  /**
   * The set of schemas that declare elements to be allowed in the NgModule.
   * Elements and properties that are neither Angular components nor directives
   * must be declared in a schema.
   *
   * 该 NgModule 中允许使用的声明元素的 schema（HTML 架构）。
   * 元素和属性（无论是 Angular 组件还是指令）都必须声明在 schema 中。
   *
   * Allowed value are `NO_ERRORS_SCHEMA` and `CUSTOM_ELEMENTS_SCHEMA`.
   *
   * 允许的取值包括 `NO_ERRORS_SCHEMA` 和 `CUSTOM_ELEMENTS_SCHEMA`。
   *
   * @security When using one of `NO_ERRORS_SCHEMA` or `CUSTOM_ELEMENTS_SCHEMA`
   * you must ensure that allowed elements and properties securely escape inputs.
   *
   * 当使用 `NO_ERRORS_SCHEMA` 或 `CUSTOM_ELEMENTS_SCHEMA` 之一时，你必须确保所允许的元素和属性的所有输入都经过了安全转义。
   */
  schemas?: Array<SchemaMetadata|any[]>;

  /**
   * A name or path that uniquely identifies this NgModule in `getModuleFactory`.
   * If left `undefined`, the NgModule is not registered with
   * `getModuleFactory`.
   *
   * 当前 NgModule 在 `getModuleFactory` 中的名字或唯一标识符。
   * 如果为 `undefined`，则该模块不会被注册进 `getModuleFactory` 中。
   */
  id?: string;

  /**
   * When present, this module is ignored by the AOT compiler.
   * It remains in distributed code, and the JIT compiler attempts to compile it
   * at run time, in the browser.
   * To ensure the correct behavior, the app must import `@angular/compiler`.
   */
  jit?: true;
}

/**
 * @Annotation
 * @publicApi
 */
export const NgModule: NgModuleDecorator = makeDecorator(
  'NgModule', (ngModule: NgModule) => ngModule, undefined, undefined,
  /**
   * Decorator that marks the following class as an NgModule, and supplies
   * configuration metadata for it.
   *
   * 一个装饰器，用于把当前类标记为一个 NgModule，并为之提供配置元数据。
   *
   * * The `declarations` and `entryComponents` options configure the compiler
   * with information about what belongs to the NgModule.
   *
   *   `declarations` 和 `entryComponents` 选项告诉编译器，哪些东西是属于本 NgModule 的。
   *
   * * The `providers` options configures the NgModule's injector to provide
   * dependencies the NgModule members.
   *
   *   `providers` 选项会配置该 NgModule 的注入器，以便为该 NgModule 的所有成员提供依赖项。
   *
   * * The `imports` and `exports` options bring in members from other modules, and make
   * this module's members available to others.
   *
   *   `imports` 选项用于从其它模块中带入成员，`exports` 选项用于把本模块的成员带给其它模块。
   *
   */
  (type: Type<any>, meta: NgModule) => SWITCH_COMPILE_NGMODULE(type, meta));


function preR3NgModuleCompile(moduleType: Type<any>, metadata?: NgModule): void {
  let imports = (metadata && metadata.imports) || [];
  if (metadata && metadata.exports) {
    imports = [...imports, metadata.exports];
  }

  (moduleType as InjectorType<any>).ɵinj = ɵɵdefineInjector({
    factory: convertInjectableProviderToFactory(moduleType, {useClass: moduleType}),
    providers: metadata && metadata.providers,
    imports: imports,
  });
}


export const SWITCH_COMPILE_NGMODULE__POST_R3__ = render3CompileNgModule;
const SWITCH_COMPILE_NGMODULE__PRE_R3__ = preR3NgModuleCompile;
const SWITCH_COMPILE_NGMODULE: typeof render3CompileNgModule = SWITCH_COMPILE_NGMODULE__PRE_R3__;
