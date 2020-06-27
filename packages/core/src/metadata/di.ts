/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '../di/injection_token';
import {Type} from '../interface/type';
import {makePropDecorator} from '../util/decorators';

/**
 * A DI token that you can use to create a virtual [provider](guide/glossary#provider)
 * that will populate the `entryComponents` field of components and NgModules
 * based on its `useValue` property value.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) are added to the `entryComponents` property.
 *
 * @usageNotes
 *
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on a router configuration that refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @publicApi
 * @deprecated Since 9.0.0. With Ivy, this property is no longer necessary.
 */
export const ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken<any>('AnalyzeForEntryComponents');

/**
 * Type of the `Attribute` decorator / constructor function.
 *
 * @publicApi
 */
export interface AttributeDecorator {
  /**
   * Specifies that a constant attribute value should be injected.
   *
   * The directive can inject constant string literals of host element attributes.
   *
   * @usageNotes
   *
   * Suppose we have an `<input>` element and want to know its `type`.
   *
   * ```html
   * <input type="text">
   * ```
   *
   * A decorator can inject string literal `text` as in the following example.
   *
   * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
   *
   * @publicApi
   */
  (name: string): any;
  new(name: string): Attribute;
}


/**
 * Type of the Attribute metadata.
 *
 * @publicApi
 */
export interface Attribute {
  /**
   * The name of the attribute to be injected into the constructor.
   */
  attributeName?: string;
}

/**
 * Type of the Query metadata.
 *
 * @publicApi
 */
export interface Query {
  descendants: boolean;
  first: boolean;
  read: any;
  isViewQuery: boolean;
  selector: any;
  static?: boolean;
}

/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 *
 * @publicApi
 */
export abstract class Query {}

/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * @see `ContentChildren`.
 * @publicApi
 */
export interface ContentChildrenDecorator {
  /**
   * Parameter decorator that configures a content query.
   *
   * Use to get the `QueryList` of elements or directives from the content DOM.
   * Any time a child element is added, removed, or moved, the query list will be
   * updated, and the changes observable of the query list will emit a new value.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * Does not retrieve elements or directives that are in other components' templates,
   * since a component's template is always a black box to its ancestors.
   *
   * **Metadata Properties**:
   *
   * * **selector** - The directive type or the name used for querying.
   * * **descendants** - True to include all descendants, otherwise include only direct children.
   * * **read** - Used to read a different token from the queried elements.
   *
   * @usageNotes
   *
   * Here is a simple demonstration of how the `ContentChildren` decorator can be used.
   *
   * {@example core/di/ts/contentChildren/content_children_howto.ts region='HowTo'}
   *
   * ### Tab-pane example
   *
   * Here is a slightly more realistic example that shows how `ContentChildren` decorators
   * can be used to implement a tab pane component.
   *
   * {@example core/di/ts/contentChildren/content_children_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|InjectionToken<unknown>|Function|string,
   opts?: {descendants?: boolean, read?: any}): any;
  new(selector: Type<any>|InjectionToken<unknown>|Function|string,
      opts?: {descendants?: boolean, read?: any}): Query;
}

/**
 * Type of the ContentChildren metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export type ContentChildren = Query;

/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export const ContentChildren: ContentChildrenDecorator = makePropDecorator(
    'ContentChildren',
    (selector?: any, data: any = {}) =>
        ({selector, first: false, isViewQuery: false, descendants: false, ...data}),
    Query);

/**
 * Type of the ContentChild decorator / constructor function.
 *
 * @publicApi
 */
export interface ContentChildDecorator {
  /**
   * Parameter decorator that configures a content query.
   *
   * Use to get the first element or the directive matching the selector from the content DOM.
   * If the content DOM changes, and a new child matches the selector,
   * the property will be updated.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * Does not retrieve elements or directives that are in other components' templates,
   * since a component's template is always a black box to its ancestors.
   *
   * **Metadata Properties**:
   *
   * * **selector** - The directive type or the name used for querying.
   * * **read** - Used to read a different token from the queried element.
   * * **static** - True to resolve query results before change detection runs,
   * false to resolve after change detection. Defaults to false.
   *
   * @usageNotes
   *
   * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'}
   *
   * ### Example
   *
   * {@example core/di/ts/contentChild/content_child_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|InjectionToken<unknown>|Function|string,
   opts?: {read?: any, static?: boolean}): any;
  new(selector: Type<any>|InjectionToken<unknown>|Function|string,
      opts?: {read?: any, static?: boolean}): ContentChild;
}

/**
 * Type of the ContentChild metadata.
 *
 * @publicApi
 */
export type ContentChild = Query;

/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
export const ContentChild: ContentChildDecorator = makePropDecorator(
    'ContentChild',
    (selector?: any, data: any = {}) =>
        ({selector, first: true, isViewQuery: false, descendants: true, ...data}),
    Query);

/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * @see `ViewChildren`.
 *
 * @publicApi
 */
export interface ViewChildrenDecorator {
  /**
   * Parameter decorator that configures a view query.
   *
   * Use to get the `QueryList` of elements or directives from the view DOM.
   * Any time a child element is added, removed, or moved, the query list will be updated,
   * and the changes observable of the query list will emit a new value.
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * **Metadata Properties**:
   *
   * * **selector** - The directive type or the name used for querying.
   * * **read** - Used to read a different token from the queried elements.
   *
   * @usageNotes
   *
   * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'}
   *
   * ### Another example
   *
   * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|InjectionToken<unknown>|Function|string, opts?: {read?: any}): any;
  new(selector: Type<any>|InjectionToken<unknown>|Function|string,
      opts?: {read?: any}): ViewChildren;
}

/**
 * Type of the ViewChildren metadata.
 *
 * @publicApi
 */
export type ViewChildren = Query;

/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const ViewChildren: ViewChildrenDecorator = makePropDecorator(
    'ViewChildren',
    (selector?: any, data: any = {}) =>
        ({selector, first: false, isViewQuery: true, descendants: true, ...data}),
    Query);

/**
 * Type of the ViewChild decorator / constructor function.
 *
 * ViewChild 的装饰器类型和构造函数
 *
 * @see `ViewChild`.
 * @publicApi
 */
export interface ViewChildDecorator {
  /**
   * @description
   * Property decorator that configures a view query.
   * The change detector looks for the first element or the directive matching the selector
   * in the view DOM. If the view DOM changes, and a new child matches the selector,
   * the property is updated.
   *
   * 属性装饰器，用于配置一个视图查询。
   * 变更检测器会在视图的 DOM 中查找能匹配上该选择器的第一个元素或指令。
   * 如果视图的 DOM 发生了变化，出现了匹配该选择器的新的子节点，该属性就会被更新。
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * 在调用 `NgAfterViewInit` 回调函数之前就会设置这些视图查询。
   *
   * **Metadata Properties**:
   *
   * **元数据属性**：
   *
   * * **selector** - The directive type or the name used for querying.
   *
   *   **selector** - 用于查询的指令类型或名字。
   *
   * * **read** - Used to read a different token from the queried elements.
   *
   *   **read** - 从查询到的元素中读取另一个令牌。
   *
   * * **static** - True to resolve query results before change detection runs,
   * false to resolve after change detection. Defaults to false.
   *
   * The following selectors are supported.
   *
   * 支持下列选择器：
   *
   *   * Any class with the `@Component` or `@Directive` decorator
   *
   *     任何带有 `@Component` 或 `@Directive` 装饰器的类
   *
   *   * A template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
   * with `@ViewChild('cmp')`)
   *
   *     字符串形式的模板引用变量（比如可以使用 `@ViewChild('cmp')` 来查询 `<my-component #cmp></my-component>`
   *
   *   * Any provider defined in the child component tree of the current component (e.g.
   * `@ViewChild(SomeService) someService: SomeService`)
   *
   *     组件树中任何当前组件的子组件所定义的提供商（比如 `@ViewChild(SomeService) someService: SomeService` ）
   *
   *   * Any provider defined through a string token (e.g. `@ViewChild('someToken') someTokenVal:
   * any`)
   *
   *     任何通过字符串令牌定义的提供商（比如 `@ViewChild('someToken') someTokenVal:
   * any` ）
   *
   *   * A `TemplateRef` (e.g. query `<ng-template></ng-template>` with `@ViewChild(TemplateRef)
   * template;`)
   *
   *     `TemplateRef`（比如可以用 `@ViewChild(TemplateRef) template;` 来查询 `<ng-template></ng-template>`）
   *
   * @usageNotes
   *
   * {@example core/di/ts/viewChild/view_child_example.ts region='Component'}
   *
   * ### Example 2
   *
   * ### 例子
   *
   * {@example core/di/ts/viewChild/view_child_howto.ts region='HowTo'}
   *
   * @Annotation
   */
  (selector: Type<any>|InjectionToken<unknown>|Function|string,
   opts?: {read?: any, static?: boolean}): any;
  new(selector: Type<any>|InjectionToken<unknown>|Function|string,
      opts?: {read?: any, static?: boolean}): ViewChild;
}

/**
 * Type of the ViewChild metadata.
 *
 * ViewChild 元数据的类型。
 *
 * @publicApi
 */
export type ViewChild = Query;

/**
 * ViewChild decorator and metadata.
 *
 * ViewChild 装饰器和元数据。
 *
 * @Annotation
 * @publicApi
 */
export const ViewChild: ViewChildDecorator = makePropDecorator(
    'ViewChild',
    (selector: any, data: any) =>
        ({selector, first: true, isViewQuery: true, descendants: true, ...data}),
    Query);
