/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken, Injector} from '../di';
import {ViewEncapsulation} from '../metadata/view';

/**
 * @deprecated Use `RendererType2` (and `Renderer2`) instead.
 */
export class RenderComponentType {
  constructor(
      public id: string, public templateUrl: string, public slotCount: number,
      public encapsulation: ViewEncapsulation, public styles: Array<string|any[]>,
      public animations: any) {}
}

/**
 * @deprecated Debug info is handeled internally in the view engine now.
 */
export abstract class RenderDebugInfo {
  abstract get injector(): Injector;
  abstract get component(): any;
  abstract get providerTokens(): any[];
  abstract get references(): {[key: string]: any};
  abstract get context(): any;
  abstract get source(): string;
}

/**
 * @deprecated Use the `Renderer2` instead.
 */
export interface DirectRenderer {
  remove(node: any): void;
  appendChild(node: any, parent: any): void;
  insertBefore(node: any, refNode: any): void;
  nextSibling(node: any): any;
  parentElement(node: any): any;
}

/**
 * @deprecated Use the `Renderer2` instead.
 */
export abstract class Renderer {
  abstract selectRootElement(selectorOrNode: string|any, debugInfo?: RenderDebugInfo): any;

  abstract createElement(parentElement: any, name: string, debugInfo?: RenderDebugInfo): any;

  abstract createViewRoot(hostElement: any): any;

  abstract createTemplateAnchor(parentElement: any, debugInfo?: RenderDebugInfo): any;

  abstract createText(parentElement: any, value: string, debugInfo?: RenderDebugInfo): any;

  abstract projectNodes(parentElement: any, nodes: any[]): void;

  abstract attachViewAfter(node: any, viewRootNodes: any[]): void;

  abstract detachView(viewRootNodes: any[]): void;

  abstract destroyView(hostElement: any, viewAllNodes: any[]): void;

  abstract listen(renderElement: any, name: string, callback: Function): Function;

  abstract listenGlobal(target: string, name: string, callback: Function): Function;

  abstract setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;

  abstract setElementAttribute(renderElement: any, attributeName: string, attributeValue: string):
      void;

  /**
   * Used only in debug mode to serialize property changes to dom nodes as attributes.
   */
  abstract setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string):
      void;

  abstract setElementClass(renderElement: any, className: string, isAdd: boolean): void;

  abstract setElementStyle(renderElement: any, styleName: string, styleValue: string): void;

  abstract invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void;

  abstract setText(renderNode: any, text: string): void;

  abstract animate(
      element: any, startingStyles: any, keyframes: any[], duration: number, delay: number,
      easing: string, previousPlayers?: any[]): any;
}

export const Renderer2Interceptor = new InjectionToken<Renderer2[]>('Renderer2Interceptor');

/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link Renderer#setElementProperty setElementProperty} or
 * {@link Renderer#setElementAttribute setElementAttribute} respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 *
 * @deprecated Use `RendererFactory2` instead.
 */
export abstract class RootRenderer {
  abstract renderComponent(componentType: RenderComponentType): Renderer;
}

/**
 * Used by `RendererFactory2` to associate custom rendering data and styles
 * with a rendering implementation.
 *  @experimental
 */
export interface RendererType2 {
  /**
   * A unique identifying string for the new renderer, used when creating
   * unique styles for encapsulation.
   */
  id: string;
  /**
   * The view encapsulation type, which determines how styles are applied to
   * DOM elements. One of
   * - `Emulated` (default): Emulate native scoping of styles.
   * - `Native`: Use the native encapsulation mechanism of the renderer.
   * - `ShadowDom`: Use modern [Shadow
   * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
   * create a ShadowRoot for component's host element.
   * - `None`: Do not provide any template or style encapsulation.
   */
  encapsulation: ViewEncapsulation;
  /**
   * Defines CSS styles to be stored on a renderer instance.
   */
  styles: (string|any[])[];
  /**
   * Defines arbitrary developer-defined data to be stored on a renderer instance.
   * This is useful for renderers that delegate to other renderers.
   */
  data: {[kind: string]: any};
}

/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * @experimental
 */
export abstract class RendererFactory2 {
  /**
   * Creates and initializes a custom renderer for a host DOM element.
   * @param hostElement The element to render.
   * @param type The base class to implement.
   * @returns The new custom renderer instance.
   */
  abstract createRenderer(hostElement: any, type: RendererType2|null): Renderer2;
  /**
   * A callback invoked when rendering has begun.
   */
  abstract begin?(): void;
  /**
   * A callback invoked when rendering has completed.
   */
  abstract end?(): void;
  /**
   * Use with animations test-only mode. Notifies the test when rendering has completed.
   * @returns The asynchronous result of the developer-defined function.
   */
  abstract whenRenderingDone?(): Promise<any>;
}

/**
 * Flags for renderer-specific style modifiers.
 * @experimental
 */
export enum RendererStyleFlags2 {
  /**
   * Marks a style as important.
   */
  Important = 1 << 0,
  /**
   * Marks a style as using dash case naming (this-is-dash-case).
   */
  DashCase = 1 << 1
}

/**
 * Extend this base class to implement custom rendering. By default, Angular
 * renders a template into DOM. You can use custom rendering to intercept
 * rendering calls, or to render to something other than DOM.
 *
 * 扩展此基类以实现自定义渲染器。默认情况下，Angular 会把模板渲染成 DOM。
 * 你可以使用自定义渲染器来拦截渲染类调用，或用于渲染一些非 DOM 的东西。
 *
 * Create your custom renderer using `RendererFactory2`.
 *
 * 使用 `RendererFactory2` 创建你的自定义渲染器。
 *
 * Use a custom renderer to bypass Angular's templating and
 * make custom UI changes that can't be expressed declaratively.
 * For example if you need to set a property or an attribute whose name is
 * not statically known, use the `setProperty()` or
 * `setAttribute()` method.
 *
 * 使用自定义渲染器可以绕过 Angular 的模板机制，并进行无法以声明式语法表达的自定义 UI 变更。
 * 比如，如果你要设置无法静态得知名称的 Property 或 Attribute，可以使用 `setProperty()` 或
 * `setAttribute()` 方法。
 *
 * @experimental
 */
export abstract class Renderer2 {
  /**
   * Use to store arbitrary developer-defined data on a renderer instance,
   * as an object containing key-value pairs.
   * This is useful for renderers that delegate to other renderers.
   *
   * 用于在渲染器实例上以 key-value 对象的形式保存任意自定义数据。
   * 这对于要委托给其它渲染器的渲染器很有用。
   */
  abstract get data(): {[key: string]: any};

  /**
   * Implement this callback to destroy the renderer or the host element.
   *
   * 实现此回调以便销毁渲染器或其宿主元素。
   */
  abstract destroy(): void;
  /**
   * Implement this callback to create an instance of the host element.
   *
   * 实现此回调以便创建宿主元素的实例。
   *
   * @param name An identifying name for the new element, unique within the namespace.
   *
   * 对新元素的标识名，在指定的命名空间内应该是唯一的。
   *
   * @param namespace The namespace for the new element.
   *
   * 新元素的命名空间。
   *
   * @returns The new element.
   *
   * 新元素。
   */
  abstract createElement(name: string, namespace?: string|null): any;
  /**
   * Implement this callback to add a comment to the DOM of the host element.
   *
   * 实现此回调以便向宿主元素的 DOM 中添加一个注释。
   *
   * @param value The comment text.
   *
   * 注释文本。
   *
   * @returns The modified element.
   *
   * 修改后的元素。
   */
  abstract createComment(value: string): any;

  /**
   * Implement this callback to add text to the DOM of the host element.
   *
   * 实现此回调以便向宿主元素的 DOM 中添加文本。
   *
   * @param value The text string.
   *
   * 文本字符串。
   *
   * @returns The modified element.
   *
   * 修改后的元素。
   */
  abstract createText(value: string): any;
  /**
   * If null or undefined, the view engine won't call it.
   * This is used as a performance optimization for production mode.
   *
   * 如果为 null 或 undefined，视图引擎就不会调用它。
   * 用于在产品模式下进行优化。
   */
  // TODO(issue/24571): remove '!'.
  destroyNode !: ((node: any) => void) | null;
  /**
   * Appends a child to a given parent node in the host element DOM.
   *
   * 把子元素追加到宿主元素 DOM 中的指定父节点下。
   *
   * @param parent The parent node.
   *
   * 父节点。
   *
   * @param newChild The new child node.
   *
   * 新的子节点。
   */
  abstract appendChild(parent: any, newChild: any): void;
  /**
   * Implement this callback to insert a child node at a given position in a parent node
   * in the host element DOM.
   *
   * 实现此回调，以便往宿主元素中父节点的指定位置插入一个子节点。
   *
   * @param parent The parent node.
   *
   * 父节点。
   *
   * @param newChild The new child nodes.
   *
   * 新的子节点。
   *
   * @param refChild The existing child node that should precede the new node.
   *
   * 将位于新节点之前的现有节点。
   */
  abstract insertBefore(parent: any, newChild: any, refChild: any): void;
  /**
   * Implement this callback to remove a child node from the host element's DOM.
   *
   * 实现此回调以便从宿主元素的 DOM 中移除一个子节点。
   *
   * @param parent The parent node.
   *
   * 父节点。
   *
   * @param oldChild The child node to remove.
   *
   * 要移除的子节点。
   */
  abstract removeChild(parent: any, oldChild: any): void;
  /**
   * Implement this callback to prepare an element to be bootstrapped
   * as a root element, and return the element instance.
   *
   * 实现此回调以准备将其作为根元素进行引导的元素，返回该元素的实例。
   *
   * @param selectorOrNode The DOM element.
   *
   * DOM 元素。
   *
   * @returns The root element.
   *
   * 根元素。
   */
  abstract selectRootElement(selectorOrNode: string|any): any;
  /**
   * Implement this callback to get the parent of a given node
   * in the host element's DOM.
   *
   * 实现此回调以获得宿主元素的 DOM 中指定节点的父节点。
   *
   * @param node The child node to query.
   *
   * 要查询的子节点。
   *
   * @returns The parent node, or null if there is no parent.
   * For WebWorkers, always returns true.
   * This is because the check is synchronous,
   * and the caller can't rely on checking for null.
   *
   * 它的父节点，如果没有父节点则为 null。
   * 对于 WebWorkers，总是返回 `true`。
   * 这是因为该检查是同步的，该调用者不能依赖于检查 null。
   */
  abstract parentNode(node: any): any;
  /**
   * Implement this callback to get the next sibling node of a given node
   * in the host element's DOM.
   *
   * 实现此回调，以获得宿主元素的 DOM 中指定节点的下一个兄弟节点。
   *
   * @returns The sibling node, or null if there is no sibling.
   * For WebWorkers, always returns a value.
   * This is because the check is synchronous,
   * and the caller can't rely on checking for null.
   *
   * 它的兄弟节点，如果没有兄弟节点则为 null。
   * 对于 WebWorkers，总是返回 `true`。
   * 这是因为该检查是同步的，该调用者不能依赖于检查 null。
   */
  abstract nextSibling(node: any): any;
  /**
   * Implement this callback to set an attribute value for an element in the DOM.
   *
   * 实现此回调以便在 DOM 中设置指定元素的属性值。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param name The attribute name.
   *
   * 属性名。
   *
   * @param value The new value.
   *
   * 新值。
   *
   * @param namespace The namespace.
   *
   * 命名空间。
   */
  abstract setAttribute(el: any, name: string, value: string, namespace?: string|null): void;

  /**
   * Implement this callback to remove an attribute from an element in the DOM.
   *
   * 实现此回调以便从 DOM 中某个元素上移除一个属性。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param name The attribute name.
   *
   * 属性名。
   *
   * @param namespace The namespace.
   *
   * 命名空间。
   */
  abstract removeAttribute(el: any, name: string, namespace?: string|null): void;
  /**
   * Implement this callback to add a class to an element in the DOM.
   *
   * 实现此回调，以便为 DOM 中的某个元素添加一个 CSS 类。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param name The class name.
   *
   * CSS 类名。
   */
  abstract addClass(el: any, name: string): void;

  /**
   * Implement this callback to remove a class from an element in the DOM.
   *
   * 实现此回调，以便从 DOM 中的某个元素上移除一个 CSS 类。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param name The class name.
   *
   * CSS 类名。
   */
  abstract removeClass(el: any, name: string): void;

  /**
   * Implement this callback to set a CSS style for an element in the DOM.
   *
   * 实现此回调函数，以便为 DOM 中的某个元素设置 CSS 样式。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param style The name of the style.
   *
   * 样式名。
   *
   * @param value The new value.
   *
   * 新值。
   *
   * @param flags Flags for style variations. No flags are set by default.
   *
   * 样式的修饰符标志。默认没有任何标志。
   */
  abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void;

  /**
   * Implement this callback to remove the value from a CSS style for an element in the DOM.
   *
   * 实现此回调，以便从 DOM 中某个元素上移除一个 CSS 样式值。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param style The name of the style.
   *
   * 样式名。
   *
   * @param flags Flags for style variations to remove, if set. ???
   *
   * 要移除的样式修饰符标志。
   */
  abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void;

  /**
   * Implement this callback to set the value of a property of an element in the DOM.
   *
   * 实现此回调，以便设置 DOM 中某个元素的属性值。
   *
   * @param el The element.
   *
   * 目标元素。
   *
   * @param name The property name.
   *
   * 属性名。
   *
   * @param value The new value.
   *
   * 新值。
   *
   */
  abstract setProperty(el: any, name: string, value: any): void;

  /**
   * Implement this callback to set the value of a node in the host element.
   *
   * 实现本回调，以便在宿主元素中设置节点的值。
   *
   * @param node The node.
   *
   * 目标节点。
   *
   * @param value The new value.
   *
   * 新值。
   *
   */
  abstract setValue(node: any, value: string): void;

  /**
   * Implement this callback to start an event listener.
   *
   * 实现此回调以启动事件监听器。
   *
   * @param target The context in which to listen for events. Can be
   * the entire window or document, the body of the document, or a specific
   * DOM element.
   *
   * 要监听事件的上下文。可以是整个窗口或文档、文档的 body 或指定的 DOM 元素。
   *
   * @param eventName The event to listen for.
   *
   * 要监听的事件。
   *
   * @param callback A handler function to invoke when the event occurs.
   *
   * 当该事件发生时要执行的处理器函数。
   *
   * @returns An "unlisten" function for disposing of this handler.
   *
   * 一个 "取消监听" 函数，用于解除该处理器。
   */
  abstract listen(
      target: 'window'|'document'|'body'|any, eventName: string,
      callback: (event: any) => boolean | void): () => void;
}
