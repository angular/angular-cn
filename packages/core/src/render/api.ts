/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '../di/injection_token';
import {isProceduralRenderer} from '../render3/interfaces/renderer';
import {isLView} from '../render3/interfaces/type_checks';
import {LView, RENDERER} from '../render3/interfaces/view';
import {getCurrentTNode, getLView} from '../render3/state';
import {getComponentLViewByIndex} from '../render3/util/view_utils';
import {noop} from '../util/noop';
import {RendererStyleFlags2, RendererType2} from './api_flags';


export const Renderer2Interceptor = new InjectionToken<Renderer2[]>('Renderer2Interceptor');


/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * 创建并初始化实现 `Renderer2` 基类的自定义渲染器。
 *
 * @publicApi
 */
export abstract class RendererFactory2 {
  /**
   * Creates and initializes a custom renderer for a host DOM element.
   *
   * 为宿主 DOM 元素创建并初始化自定义渲染器。
   *
   * @param hostElement The element to render.
   *
   * 要渲染的元素。
   *
   * @param type The base class to implement.
   *
   * 要实现的基类。
   *
   * @returns The new custom renderer instance.
   *
   * 新的自定义渲染器实例。
   *
   */
  abstract createRenderer(hostElement: any, type: RendererType2|null): Renderer2;
  /**
   * A callback invoked when rendering has begun.
   *
   * 渲染开始时调用的回调。
   *
   */
  abstract begin?(): void;
  /**
   * A callback invoked when rendering has completed.
   *
   * 渲染完成时调用的回调。
   *
   */
  abstract end?(): void;
  /**
   * Use with animations test-only mode. Notifies the test when rendering has completed.
   *
   * 与动画的“仅测试”模式一起使用。渲染完成后通知该测试。
   *
   * @returns The asynchronous result of the developer-defined function.
   *
   * 由开发人员定义函数的异步结果。
   *
   */
  abstract whenRenderingDone?(): Promise<any>;
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
 * @publicApi
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
  destroyNode!: ((node: any) => void)|null;
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
   * @param refChild The existing child node before which `newChild` is inserted.
   *
   * 将会插入在这个新节点之前的现有节点。
   *
   * @param isMove Optional argument which signifies if the current `insertBefore` is a result of a
   *     move. Animation uses this information to trigger move animations. In the past the Animation
   *     would always assume that any `insertBefore` is a move. This is not strictly true because
   *     with runtime i18n it is possible to invoke `insertBefore` as a result of i18n and it should
   *     not trigger an animation move.
   *
   * 可选参数，指示当前的 `insertBefore` 是否是移动的结果。动画使用此信息来触发移动动画。过去，Animation 始终假定任何 `insertBefore` 都是一次移动。但严格来说这是不正确的，因为在支持 i18n 的运行环境中，可以调用 `insertBefore`，而不应触发移动动画。
   *
   */
  abstract insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean): void;
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
   *
   * @param isHostElement Optionally signal to the renderer whether this element is a host element
   * or not
   *
   * 可选值，用于告诉渲染器该元素是否宿主元素
   *
   */
  abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void;
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
   * @param preserveContent Whether the contents of the root element
   * should be preserved, or cleared upon bootstrap (default behavior).
   * Use with `ViewEncapsulation.ShadowDom` to allow simple native
   * content projection via `<slot>` elements.
   *
   * 根元素的内容是应该保留还是在启动期间清除（默认行为）。
   * 和 `ViewEncapsulation.ShadowDom` 联用以支持使用 `<slot>` 元素进行简单的原生内容投影。
   *
   * @returns The root element.
   *
   * 根元素。
   */
  abstract selectRootElement(selectorOrNode: string|any, preserveContent?: boolean): any;
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

  /**
   * @internal
   * @nocollapse
   */
  static __NG_ELEMENT_ID__: () => Renderer2 = () => SWITCH_RENDERER2_FACTORY();
}


export const SWITCH_RENDERER2_FACTORY__POST_R3__ = injectRenderer2;
const SWITCH_RENDERER2_FACTORY__PRE_R3__ = noop;
const SWITCH_RENDERER2_FACTORY: typeof injectRenderer2 = SWITCH_RENDERER2_FACTORY__PRE_R3__;

/** Returns a Renderer2 (or throws when application was bootstrapped with Renderer3) */
function getOrCreateRenderer2(lView: LView): Renderer2 {
  const renderer = lView[RENDERER];
  if (ngDevMode && !isProceduralRenderer(renderer)) {
    throw new Error('Cannot inject Renderer2 when the application uses Renderer3!');
  }
  return renderer as Renderer2;
}

/** Injects a Renderer2 for the current component. */
export function injectRenderer2(): Renderer2 {
  // We need the Renderer to be based on the component that it's being injected into, however since
  // DI happens before we've entered its view, `getLView` will return the parent view instead.
  const lView = getLView();
  const tNode = getCurrentTNode()!;
  const nodeAtIndex = getComponentLViewByIndex(tNode.index, lView);
  return getOrCreateRenderer2(isLView(nodeAtIndex) ? nodeAtIndex : lView);
}
