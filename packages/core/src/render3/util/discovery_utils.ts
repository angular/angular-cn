/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../../di/injector';
import {assertEqual} from '../../util/assert';
import {assertLView} from '../assert';
import {discoverLocalRefs, getComponentAtNodeIndex, getDirectivesAtNodeIndex, getLContext} from '../context_discovery';
import {NodeInjector} from '../di';
import {buildDebugNode} from '../instructions/lview_debug';
import {LContext} from '../interfaces/context';
import {DirectiveDef} from '../interfaces/definition';
import {TElementNode, TNode, TNodeProviderIndexes} from '../interfaces/node';
import {isLView} from '../interfaces/type_checks';
import {CLEANUP, CONTEXT, DebugNode, FLAGS, LView, LViewFlags, T_HOST, TVIEW, TViewType} from '../interfaces/view';
import {stringifyForError} from './stringify_utils';
import {getLViewParent, getRootContext} from './view_traversal_utils';
import {getTNode, unwrapRNode} from './view_utils';



/**
 * Retrieves the component instance associated with a given DOM element.
 *
 * 检索与给定 DOM 元素关联的组件实例。
 *
 * @usageNotes
 *
 * Given the following DOM structure:
 *
 * 给定以下 DOM 结构：
 *
 * ```html
 * <my-app>
 *   <div>
 *     <child-comp></child-comp>
 *   </div>
 * </my-app>
 * ```
 *
 * Calling `getComponent` on `<child-comp>` will return the instance of `ChildComponent`
 * associated with this DOM element.
 *
 * 在 `<child-comp>` 上调用 `getComponent` 将返回与此 DOM 元素关联的 `ChildComponent`。
 *
 * Calling the function on `<my-app>` will return the `MyApp` instance.
 *
 * 在 `<my-app>` 上调用该函数将返回 `MyApp` 实例。
 *
 * @param element DOM element from which the component should be retrieved.
 *
 * 要从中检索组件的 DOM 元素。
 *
 * @returns Component instance associated with the element or `null` if there
 *    is no component associated with it.
 *
 * 与元素关联的组件实例；如果没有与之关联的组件，则为 `null`
 *
 * @publicApi
 * @globalApi ng
 */
export function getComponent<T>(element: Element): T|null {
  assertDomElement(element);
  const context = loadLContext(element, false);
  if (context === null) return null;

  if (context.component === undefined) {
    context.component = getComponentAtNodeIndex(context.nodeIndex, context.lView);
  }

  return context.component as T;
}


/**
 * If inside an embedded view (e.g. `*ngIf` or `*ngFor`), retrieves the context of the embedded
 * view that the element is part of. Otherwise retrieves the instance of the component whose view
 * owns the element (in this case, the result is the same as calling `getOwningComponent`).
 *
 * 如果在嵌入式视图中（例如 `*ngIf` 或 `*ngFor`），则检索元素所属的嵌入式视图的上下文。否则，检索其视图中拥有该元素的组件的实例（在这种情况下，其结果与调用 `getOwningComponent` 相同）。
 *
 * @param element Element for which to get the surrounding component instance.
 *
 * 要获取外围组件实例的元素。
 *
 * @returns Instance of the component that is around the element or null if the element isn't
 *    inside any component.
 *
 * 元素外围组件的实例；如果元素不在任何组件内，则为 null。
 *
 * @publicApi
 * @globalApi ng
 */
export function getContext<T>(element: Element): T|null {
  assertDomElement(element);
  const context = loadLContext(element, false);
  return context === null ? null : context.lView[CONTEXT] as T;
}

/**
 * Retrieves the component instance whose view contains the DOM element.
 *
 * 检索其视图中包含此 DOM 元素的组件实例。
 *
 * For example, if `<child-comp>` is used in the template of `<app-comp>`
 * (i.e. a `ViewChild` of `<app-comp>`), calling `getOwningComponent` on `<child-comp>`
 * would return `<app-comp>`.
 *
 * 例如，如果 `<child-comp>` 在 `<app-comp>` 的模板中使用（即 `<app-comp>` 的 `ViewChild`），在 `<child-comp>` 上调用 `getOwningComponent` 将返回 `<app-comp>`。
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 *
 * 要为其检索根组件的 DOM 元素、组件或指令实例。
 *
 * @returns Component instance whose view owns the DOM element or null if the element is not
 *    part of a component view.
 *
 * 其视图中拥有 DOM 元素的组件实例；如果该元素不属于组件视图，则为 null。
 *
 * @publicApi
 * @globalApi ng
 */
export function getOwningComponent<T>(elementOrDir: Element|{}): T|null {
  const context = loadLContext(elementOrDir, false);
  if (context === null) return null;

  let lView = context.lView;
  let parent: LView|null;
  ngDevMode && assertLView(lView);
  while (lView[TVIEW].type === TViewType.Embedded && (parent = getLViewParent(lView)!)) {
    lView = parent;
  }
  return lView[FLAGS] & LViewFlags.IsRoot ? null : lView[CONTEXT] as T;
}

/**
 * Retrieves all root components associated with a DOM element, directive or component instance.
 * Root components are those which have been bootstrapped by Angular.
 *
 * 检索与 DOM 元素，指令或组件实例关联的所有根组件。根组件是由 Angular 引导启动的组件。
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 *
 * 要检索其根组件的 DOM 元素、组件或指令实例。
 *
 * @returns Root components associated with the target object.
 *
 * 与目标对象关联的根组件。
 *
 * @publicApi
 * @globalApi ng
 */
export function getRootComponents(elementOrDir: Element|{}): {}[] {
  return [...getRootContext(elementOrDir).components];
}

/**
 * Retrieves an `Injector` associated with an element, component or directive instance.
 *
 * 检索与元素、组件或指令实例关联的 `Injector`。
 *
 * @param elementOrDir DOM element, component or directive instance for which to
 *    retrieve the injector.
 *
 * 要为其获取注入器的 DOM 元素、组件或指令实例。
 *
 * @returns Injector associated with the element, component or directive instance.
 *
 * 与元素、组件或指令实例关联的注入器。
 *
 * @publicApi
 * @globalApi ng
 */
export function getInjector(elementOrDir: Element|{}): Injector {
  const context = loadLContext(elementOrDir, false);
  if (context === null) return Injector.NULL;

  const tNode = context.lView[TVIEW].data[context.nodeIndex] as TElementNode;
  return new NodeInjector(tNode, context.lView);
}

/**
 * Retrieve a set of injection tokens at a given DOM node.
 *
 * @param element Element for which the injection tokens should be retrieved.
 */
export function getInjectionTokens(element: Element): any[] {
  const context = loadLContext(element, false);
  if (context === null) return [];
  const lView = context.lView;
  const tView = lView[TVIEW];
  const tNode = tView.data[context.nodeIndex] as TNode;
  const providerTokens: any[] = [];
  const startIndex = tNode.providerIndexes & TNodeProviderIndexes.ProvidersStartIndexMask;
  const endIndex = tNode.directiveEnd;
  for (let i = startIndex; i < endIndex; i++) {
    let value = tView.data[i];
    if (isDirectiveDefHack(value)) {
      // The fact that we sometimes store Type and sometimes DirectiveDef in this location is a
      // design flaw.  We should always store same type so that we can be monomorphic. The issue
      // is that for Components/Directives we store the def instead the type. The correct behavior
      // is that we should always be storing injectable type in this location.
      value = value.type;
    }
    providerTokens.push(value);
  }
  return providerTokens;
}

/**
 * Retrieves directive instances associated with a given DOM element. Does not include
 * component instances.
 *
 * 检索与给定 DOM 元素关联的指令实例。不包括组件实例。
 *
 * @usageNotes
 *
 * Given the following DOM structure:
 *
 * 给定以下 DOM 结构：
 *
 * ```
 * <my-app>
 *   <button my-button></button>
 *   <my-comp></my-comp>
 * </my-app>
 * ```
 *
 * Calling `getDirectives` on `<button>` will return an array with an instance of the `MyButton`
 * directive that is associated with the DOM element.
 *
 * 在 `<button>` 上调用 `getDirectives` 将返回一个数组，该数组带有与 DOM 元素关联 `MyButton`
 *
 * Calling `getDirectives` on `<my-comp>` will return an empty array.
 *
 * 在 `<my-comp>` 上调用 `getDirectives` 将返回一个空数组。
 *
 * @param element DOM element for which to get the directives.
 *
 * 要为其获取指令的 DOM 元素。
 *
 * @returns Array of directives associated with the element.
 *
 * 与元素关联的指令数组。
 *
 * @publicApi
 * @globalApi ng
 */
export function getDirectives(element: Element): {}[] {
  const context = loadLContext(element)!;

  if (context.directives === undefined) {
    context.directives = getDirectivesAtNodeIndex(context.nodeIndex, context.lView, false);
  }

  // The `directives` in this case are a named array called `LComponentView`. Clone the
  // result so we don't expose an internal data structure in the user's console.
  return context.directives === null ? [] : [...context.directives];
}

/**
 * Returns LContext associated with a target passed as an argument.
 * Throws if a given target doesn't have associated LContext.
 */
export function loadLContext(target: {}): LContext;
export function loadLContext(target: {}, throwOnNotFound: false): LContext|null;
export function loadLContext(target: {}, throwOnNotFound: boolean = true): LContext|null {
  const context = getLContext(target);
  if (!context && throwOnNotFound) {
    throw new Error(
        ngDevMode ? `Unable to find context associated with ${stringifyForError(target)}` :
                    'Invalid ng target');
  }
  return context;
}

/**
 * Retrieve map of local references.
 *
 * The references are retrieved as a map of local reference name to element or directive instance.
 *
 * @param target DOM element, component or directive instance for which to retrieve
 *    the local references.
 */
export function getLocalRefs(target: {}): {[key: string]: any} {
  const context = loadLContext(target, false);
  if (context === null) return {};

  if (context.localRefs === undefined) {
    context.localRefs = discoverLocalRefs(context.lView, context.nodeIndex);
  }

  return context.localRefs || {};
}

/**
 * Retrieves the host element of a component or directive instance.
 * The host element is the DOM element that matched the selector of the directive.
 *
 * 检索组件或指令实例的宿主元素。 宿主元素是与指令的选择器匹配的 DOM 元素。
 *
 * @param componentOrDirective Component or directive instance for which the host
 *     element should be retrieved.
 *
 * 要为其检索宿主元素的组件或指令实例。
 *
 * @returns Host element of the target.
 *
 * 目标的宿主元素。
 *
 * @publicApi
 * @globalApi ng
 */
export function getHostElement(componentOrDirective: {}): Element {
  return getLContext(componentOrDirective)!.native as never as Element;
}

/**
 * Retrieves the rendered text for a given component.
 *
 * This function retrieves the host element of a component and
 * and then returns the `textContent` for that element. This implies
 * that the text returned will include re-projected content of
 * the component as well.
 *
 * @param component The component to return the content text for.
 */
export function getRenderedText(component: any): string {
  const hostElement = getHostElement(component);
  return hostElement.textContent || '';
}

export function loadLContextFromNode(node: Node): LContext {
  if (!(node instanceof Node)) throw new Error('Expecting instance of DOM Element');
  return loadLContext(node)!;
}

/**
 * Event listener configuration returned from `getListeners`.
 *
 * `getListeners` 返回的事件监听器配置。
 *
 * @publicApi
 */
export interface Listener {
  /**
   * Name of the event listener.
   *
   * 事件监听器的名称。
   *
   */
  name: string;
  /**
   * Element that the listener is bound to.
   *
   * 监听器绑定到的元素。
   *
   */
  element: Element;
  /**
   * Callback that is invoked when the event is triggered.
   *
   * 触发事件时调用的回调。
   *
   */
  callback: (value: any) => any;
  /**
   * Whether the listener is using event capturing.
   *
   * 监听器是否正在使用事件捕获。
   *
   */
  useCapture: boolean;
  /**
   * Type of the listener (e.g. a native DOM event or a custom @Output).
   *
   * 监听器的类型（例如，原生 DOM 事件或自定义 @Output）。
   *
   */
  type: 'dom'|'output';
}


/**
 * Retrieves a list of event listeners associated with a DOM element. The list does include host
 * listeners, but it does not include event listeners defined outside of the Angular context
 * (e.g. through `addEventListener`).
 *
 * 检索与 DOM 元素关联的事件监听器的列表。该列表包含宿主监听器，但不包含在 Angular 上下文之外定义的事件监听器（例如，通过 `addEventListener` ）。
 *
 * @usageNotes
 *
 * Given the following DOM structure:
 *
 * 给定以下 DOM 结构：
 *
 * ```
 * <my-app>
 *   <div (click)="doSomething()"></div>
 * </my-app>
 *
 * ```
 * Calling `getListeners` on `<div>` will return an object that looks as follows:
 *
 * 在 `<div>` 上调用 `getListeners` 将返回一个如下所示的对象：
 *
 * ```
 * {
 *   name: 'click',
 *   element: <div>,
 *   callback: () => doSomething(),
 *   useCapture: false
 * }
 * ```
 *
 * @param element Element for which the DOM listeners should be retrieved.
 *
 * 要为其检索 DOM 监听器的元素。
 *
 * @returns Array of event listeners on the DOM element.
 *
 * DOM 元素上的事件监听器数组。
 * @publicApi
 * @globalApi ng
 */
export function getListeners(element: Element): Listener[] {
  assertDomElement(element);
  const lContext = loadLContext(element, false);
  if (lContext === null) return [];

  const lView = lContext.lView;
  const tView = lView[TVIEW];
  const lCleanup = lView[CLEANUP];
  const tCleanup = tView.cleanup;
  const listeners: Listener[] = [];
  if (tCleanup && lCleanup) {
    for (let i = 0; i < tCleanup.length;) {
      const firstParam = tCleanup[i++];
      const secondParam = tCleanup[i++];
      if (typeof firstParam === 'string') {
        const name: string = firstParam;
        const listenerElement = unwrapRNode(lView[secondParam]) as any as Element;
        const callback: (value: any) => any = lCleanup[tCleanup[i++]];
        const useCaptureOrIndx = tCleanup[i++];
        // if useCaptureOrIndx is boolean then report it as is.
        // if useCaptureOrIndx is positive number then it in unsubscribe method
        // if useCaptureOrIndx is negative number then it is a Subscription
        const type =
            (typeof useCaptureOrIndx === 'boolean' || useCaptureOrIndx >= 0) ? 'dom' : 'output';
        const useCapture = typeof useCaptureOrIndx === 'boolean' ? useCaptureOrIndx : false;
        if (element == listenerElement) {
          listeners.push({element, name, callback, useCapture, type});
        }
      }
    }
  }
  listeners.sort(sortListeners);
  return listeners;
}

function sortListeners(a: Listener, b: Listener) {
  if (a.name == b.name) return 0;
  return a.name < b.name ? -1 : 1;
}

/**
 * This function should not exist because it is megamorphic and only mostly correct.
 *
 * See call site for more info.
 */
function isDirectiveDefHack(obj: any): obj is DirectiveDef<any> {
  return obj.type !== undefined && obj.template !== undefined && obj.declaredInputs !== undefined;
}

/**
 * Returns the attached `DebugNode` instance for an element in the DOM.
 *
 * @param element DOM element which is owned by an existing component's view.
 */
export function getDebugNode(element: Element): DebugNode|null {
  let debugNode: DebugNode|null = null;

  const lContext = loadLContextFromNode(element);
  const lView = lContext.lView;
  const nodeIndex = lContext.nodeIndex;
  if (nodeIndex !== -1) {
    const valueInLView = lView[nodeIndex];
    // this means that value in the lView is a component with its own
    // data. In this situation the TNode is not accessed at the same spot.
    const tNode =
        isLView(valueInLView) ? (valueInLView[T_HOST] as TNode) : getTNode(lView[TVIEW], nodeIndex);
    ngDevMode &&
        assertEqual(tNode.index, nodeIndex, 'Expecting that TNode at index is same as index');
    debugNode = buildDebugNode(tNode, lView);
  }

  return debugNode;
}

/**
 * Retrieve the component `LView` from component/element.
 *
 * NOTE: `LView` is a private and should not be leaked outside.
 *       Don't export this method to `ng.*` on window.
 *
 * @param target DOM element or component instance for which to retrieve the LView.
 */
export function getComponentLView(target: any): LView {
  const lContext = loadLContext(target);
  const nodeIndx = lContext.nodeIndex;
  const lView = lContext.lView;
  const componentLView = lView[nodeIndx];
  ngDevMode && assertLView(componentLView);
  return componentLView;
}

/** Asserts that a value is a DOM Element. */
function assertDomElement(value: any) {
  if (typeof Element !== 'undefined' && !(value instanceof Element)) {
    throw new Error('Expecting instance of DOM Element');
  }
}
