/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '../di/injection_token';
import {Type} from '../type';
import {makeParamDecorator, makePropDecorator} from '../util/decorators';

/**
 * This token can be used to create a virtual provider that will populate the
 * `entryComponents` fields of components and ng modules based on its `useValue`.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) will be added to the `entryComponents` property.
 *
 * @usageNotes
 * ### Example
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on the router configuration which refers
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
 * @experimental
 */
export const ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken<any>('AnalyzeForEntryComponents');

/**
 * Type of the Attribute decorator / constructor function.
 *
 *
 */
export interface AttributeDecorator {
  /**
   * Specifies that a constant attribute value should be injected.
   *
   * The directive can inject constant string literals of host element attributes.
   *
   * @usageNotes
   * ### Example
   *
   * Suppose we have an `<input>` element and want to know its `type`.
   *
   * ```html
   * <input type="text">
   * ```
   *
   * A decorator can inject string literal `text` like so:
   *
   * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
   *
   * ### Example as TypeScript Decorator
   *
   * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
   *
   * ### Example as ES5 annotation
   *
   * ```
   * var MyComponent = function(title) {
   *   ...
   * };
   *
   * MyComponent.annotations = [
   *   new ng.Component({...})
   * ]
   * MyComponent.parameters = [
   *   [new ng.Attribute('title')]
   * ]
   * ```
   *
   *
   */
  (name: string): any;
  new (name: string): Attribute;
}


/**
 * Type of the Attribute metadata.
 */
export interface Attribute { attributeName?: string; }

/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 */
export const Attribute: AttributeDecorator =
    makeParamDecorator('Attribute', (attributeName?: string) => ({attributeName}));

/**
 * Type of the Query metadata.
 */
export interface Query {
  descendants: boolean;
  first: boolean;
  read: any;
  isViewQuery: boolean;
  selector: any;
}

/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 */
export abstract class Query {}

/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * @see `ContentChildren`.
 */
export interface ContentChildrenDecorator {
  /**
   * Configures a content query.
   *
   * You can use ContentChildren to get the `QueryList` of elements or directives from the
   * content DOM. Any time a child element is added, removed, or moved, the query list will be
   * updated, and the changes observable of the query list will emit a new value.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * **Metadata Properties**:
   *
   * * **selector** - the directive type or the name used for querying.
   * * **descendants** - include only direct children or all descendants.
   * * **read** - read a different token from the queried elements.
   *
   * @usageNotes
   * ### Basic Example
   *
   * Here is a simple demonstration of how the `ContentChildren` decorator can be used.
   *
   * {@example core/di/ts/contentChildren/content_children_howto.ts region='HowTo'}
   *
   * ### Tab-pane Example
   *
   * Here is a slightly more realistic example that shows how `ContentChildren` decorators
   * can be used to implement a tab pane component.
   *
   * {@example core/di/ts/contentChildren/content_children_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|Function|string, opts?: {descendants?: boolean, read?: any}): any;
  new (selector: Type<any>|Function|string, opts?: {descendants?: boolean, read?: any}): Query;
}

/**
 * Type of the ContentChildren metadata.
 *
 *
 * @Annotation
 */
export type ContentChildren = Query;

/**
 * ContentChildren decorator and metadata.
 *
 *
 *  @Annotation
 */
export const ContentChildren: ContentChildrenDecorator = makePropDecorator(
    'ContentChildren',
    (selector?: any, data: any = {}) =>
        ({selector, first: false, isViewQuery: false, descendants: false, ...data}),
    Query);

/**
 * Type of the ContentChild decorator / constructor function.
 *
 *
 *
 */
export interface ContentChildDecorator {
  /**
   * Configures a content query.
   *
   * You can use ContentChild to get the first element or the directive matching the selector from
   * the content DOM. If the content DOM changes, and a new child matches the selector,
   * the property will be updated.
   *
   * Content queries are set before the `ngAfterContentInit` callback is called.
   *
   * **Metadata Properties**:
   *
   * * **selector** - the directive type or the name used for querying.
   * * **read** - read a different token from the queried element.
   *
   * @usageNotes
   * ### Example
   *
   * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'}
   *
   * ### Example
   *
   * {@example core/di/ts/contentChild/content_child_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|Function|string, opts?: {read?: any}): any;
  new (selector: Type<any>|Function|string, opts?: {read?: any}): ContentChild;
}

/**
 * Type of the ContentChild metadata.
 *
 * @see `ContentChild`.
 *
 *
 */
export type ContentChild = Query;

/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 */
export const ContentChild: ContentChildDecorator = makePropDecorator(
    'ContentChild', (selector?: any, data: any = {}) =>
                        ({selector, first: true, isViewQuery: false, descendants: true, ...data}),
    Query);

/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * @see `ViewChildren`.
 *
 *
 */
export interface ViewChildrenDecorator {
  /**
   * Configures a view query.
   *
   * You can use ViewChildren to get the `QueryList` of elements or directives from the
   * view DOM. Any time a child element is added, removed, or moved, the query list will be updated,
   * and the changes observable of the query list will emit a new value.
   *
   * View queries are set before the `ngAfterViewInit` callback is called.
   *
   * **Metadata Properties**:
   *
   * * **selector** - the directive type or the name used for querying.
   * * **read** - read a different token from the queried elements.
   *
   * @usageNotes
   *
   * ### Example
   *
   * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'}
   *
   * ### Example
   *
   * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|Function|string, opts?: {read?: any}): any;
  new (selector: Type<any>|Function|string, opts?: {read?: any}): ViewChildren;
}

/**
 * Type of the ViewChildren metadata.
 */
export type ViewChildren = Query;

/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 */
export const ViewChildren: ViewChildrenDecorator = makePropDecorator(
    'ViewChildren', (selector?: any, data: any = {}) =>
                        ({selector, first: false, isViewQuery: true, descendants: true, ...data}),
    Query);

/**
 * Type of the ViewChild decorator / constructor function.
 *
 * ViewChild 的装饰器类型和构造函数
 *
 * @see `ViewChild`.
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
   * * **selector** - the directive type or the name used for querying.
   *
   *   **selector** - 用于查询的指令类型或名字。
   *
   * * **read** - read a different token from the queried elements.
   *
   *   **read** - 从查询到的元素中读取另一个令牌。
   *
   * @usageNotes
   *
   * ### Example
   *
   * ### 例子
   *
   * {@example core/di/ts/viewChild/view_child_howto.ts region='HowTo'}
   *
   * ### Example
   *
   * ### 例子
   *
   * {@example core/di/ts/viewChild/view_child_example.ts region='Component'}
   *
   * @Annotation
   */
  (selector: Type<any>|Function|string, opts?: {read?: any}): any;
  new (selector: Type<any>|Function|string, opts?: {read?: any}): ViewChild;
}

/**
 * Type of the ViewChild metadata.
 *
 * ViewChild 元数据的类型。
 */
export type ViewChild = Query;

/**
 * ViewChild decorator and metadata.
 *
 * ViewChild 装饰器和元数据。
 *
 * @Annotation
 */
export const ViewChild: ViewChildDecorator = makePropDecorator(
    'ViewChild', (selector: any, data: any) =>
                     ({selector, first: true, isViewQuery: true, descendants: true, ...data}),
    Query);
