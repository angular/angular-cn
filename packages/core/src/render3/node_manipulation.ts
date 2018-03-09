/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {assertNotNull} from './assert';
import {callHooks} from './hooks';
import {LContainer, unusedValueExportToPlacateAjd as unused1} from './interfaces/container';
import {LContainerNode, LElementNode, LNode, LNodeFlags, LProjectionNode, LTextNode, LViewNode, unusedValueExportToPlacateAjd as unused2} from './interfaces/node';
import {unusedValueExportToPlacateAjd as unused3} from './interfaces/projection';
import {ProceduralRenderer3, RElement, RNode, RText, isProceduralRenderer, unusedValueExportToPlacateAjd as unused4} from './interfaces/renderer';
import {HookData, LView, LViewOrLContainer, TView, unusedValueExportToPlacateAjd as unused5} from './interfaces/view';
import {assertNodeType} from './node_assert';

const unusedValueToPlacateAjd = unused1 + unused2 + unused3 + unused4 + unused5;

/**
 * Returns the first RNode following the given LNode in the same parent DOM element.
 *
 * This is needed in order to insert the given node with insertBefore.
 *
 * @param node The node whose following DOM node must be found.
 * @param stopNode A parent node at which the lookup in the tree should be stopped, or null if the
 * lookup should not be stopped until the result is found.
 * @returns RNode before which the provided node should be inserted or null if the lookup was
 * stopped
 * or if there is no native node after the given logical node in the same native parent.
 */
function findNextRNodeSibling(node: LNode | null, stopNode: LNode | null): RElement|RText|null {
  let currentNode = node;
  while (currentNode && currentNode !== stopNode) {
    let pNextOrParent = currentNode.pNextOrParent;
    if (pNextOrParent) {
      let pNextOrParentType = pNextOrParent.flags & LNodeFlags.TYPE_MASK;
      while (pNextOrParentType !== LNodeFlags.Projection) {
        const nativeNode = findFirstRNode(pNextOrParent);
        if (nativeNode) {
          return nativeNode;
        }
        pNextOrParent = pNextOrParent.pNextOrParent !;
      }
      currentNode = pNextOrParent;
    } else {
      let currentSibling = currentNode.next;
      while (currentSibling) {
        const nativeNode = findFirstRNode(currentSibling);
        if (nativeNode) {
          return nativeNode;
        }
        currentSibling = currentSibling.next;
      }
      const parentNode = currentNode.parent;
      currentNode = null;
      if (parentNode) {
        const parentType = parentNode.flags & LNodeFlags.TYPE_MASK;
        if (parentType === LNodeFlags.Container || parentType === LNodeFlags.View) {
          currentNode = parentNode;
        }
      }
    }
  }
  return null;
}

/**
 * Get the next node in the LNode tree, taking into account the place where a node is
 * projected (in the shadow DOM) rather than where it comes from (in the light DOM).
 *
 * @param node The node whose next node in the LNode tree must be found.
 * @return LNode|null The next sibling in the LNode tree.
 */
function getNextLNodeWithProjection(node: LNode): LNode|null {
  const pNextOrParent = node.pNextOrParent;

  if (pNextOrParent) {
    // The node is projected
    const isLastProjectedNode =
        (pNextOrParent.flags & LNodeFlags.TYPE_MASK) === LNodeFlags.Projection;
    // returns pNextOrParent if we are not at the end of the list, null otherwise
    return isLastProjectedNode ? null : pNextOrParent;
  }

  // returns node.next because the the node is not projected
  return node.next;
}

/**
 * Find the next node in the LNode tree, taking into account the place where a node is
 * projected (in the shadow DOM) rather than where it comes from (in the light DOM).
 *
 * If there is no sibling node, this function goes to the next sibling of the parent node...
 * until it reaches rootNode (at which point null is returned).
 *
 * @param initialNode The node whose following node in the LNode tree must be found.
 * @param rootNode The root node at which the lookup should stop.
 * @return LNode|null The following node in the LNode tree.
 */
function getNextOrParentSiblingNode(initialNode: LNode, rootNode: LNode): LNode|null {
  let node: LNode|null = initialNode;
  let nextNode = getNextLNodeWithProjection(node);
  while (node && !nextNode) {
    // if node.pNextOrParent is not null here, it is not the next node
    // (because, at this point, nextNode is null, so it is the parent)
    node = node.pNextOrParent || node.parent;
    if (node === rootNode) {
      return null;
    }
    nextNode = node && getNextLNodeWithProjection(node);
  }
  return nextNode;
}

/**
 * Returns the first RNode inside the given LNode.
 *
 * @param node The node whose first DOM node must be found
 * @returns RNode The first RNode of the given LNode or null if there is none.
 */
function findFirstRNode(rootNode: LNode): RElement|RText|null {
  let node: LNode|null = rootNode;
  while (node) {
    const type = node.flags & LNodeFlags.TYPE_MASK;
    let nextNode: LNode|null = null;
    if (type === LNodeFlags.Element) {
      // A LElementNode has a matching RNode in LElementNode.native
      return (node as LElementNode).native;
    } else if (type === LNodeFlags.Container) {
      // For container look at the first node of the view next
      const childContainerData: LContainer = (node as LContainerNode).data;
      nextNode = childContainerData.views.length ? childContainerData.views[0].child : null;
    } else if (type === LNodeFlags.Projection) {
      // For Projection look at the first projected node
      nextNode = (node as LProjectionNode).data.head;
    } else {
      // Otherwise look at the first child
      nextNode = (node as LViewNode).child;
    }

    node = nextNode === null ? getNextOrParentSiblingNode(node, rootNode) : nextNode;
  }
  return null;
}

/**
 * Adds or removes all DOM elements associated with a view.
 *
 * Because some root nodes of the view may be containers, we sometimes need
 * to propagate deeply into the nested containers to remove all elements in the
 * views beneath it.
 *
 * @param container The container to which the root view belongs
 * @param rootNode The view from which elements should be added or removed
 * @param insertMode Whether or not elements should be added (if false, removing)
 * @param beforeNode The node before which elements should be added, if insert mode
 */
export function addRemoveViewFromContainer(
    container: LContainerNode, rootNode: LViewNode, insertMode: true,
    beforeNode: RNode | null): void;
export function addRemoveViewFromContainer(
    container: LContainerNode, rootNode: LViewNode, insertMode: false): void;
export function addRemoveViewFromContainer(
    container: LContainerNode, rootNode: LViewNode, insertMode: boolean,
    beforeNode?: RNode | null): void {
  ngDevMode && assertNodeType(container, LNodeFlags.Container);
  ngDevMode && assertNodeType(rootNode, LNodeFlags.View);
  const parentNode = container.data.renderParent;
  const parent = parentNode ? parentNode.native : null;
  let node: LNode|null = rootNode.child;
  if (parent) {
    while (node) {
      const type = node.flags & LNodeFlags.TYPE_MASK;
      let nextNode: LNode|null = null;
      const renderer = container.view.renderer;
      if (type === LNodeFlags.Element) {
        if (insertMode) {
          isProceduralRenderer(renderer) ?
              renderer.insertBefore(parent, node.native !, beforeNode as RNode | null) :
              parent.insertBefore(node.native !, beforeNode as RNode | null, true);
        } else {
          isProceduralRenderer(renderer) ? renderer.removeChild(parent as RElement, node.native !) :
                                           parent.removeChild(node.native !);
        }
        nextNode = node.next;
      } else if (type === LNodeFlags.Container) {
        // if we get to a container, it must be a root node of a view because we are only
        // propagating down into child views / containers and not child elements
        const childContainerData: LContainer = (node as LContainerNode).data;
        childContainerData.renderParent = parentNode;
        nextNode = childContainerData.views.length ? childContainerData.views[0].child : null;
      } else if (type === LNodeFlags.Projection) {
        nextNode = (node as LProjectionNode).data.head;
      } else {
        nextNode = (node as LViewNode).child;
      }
      if (nextNode === null) {
        node = getNextOrParentSiblingNode(node, rootNode);
      } else {
        node = nextNode;
      }
    }
  }
}

/**
 * Traverses the tree of component views and containers to remove listeners and
 * call onDestroy callbacks.
 *
 * Notes:
 *  - Because it's used for onDestroy calls, it needs to be bottom-up.
 *  - Must process containers instead of their views to avoid splicing
 *  when views are destroyed and re-added.
 *  - Using a while loop because it's faster than recursion
 *  - Destroy only called on movement to sibling or movement to parent (laterally or up)
 *
 *  @param rootView The view to destroy
 */
export function destroyViewTree(rootView: LView): void {
  let viewOrContainer: LViewOrLContainer|null = rootView;

  while (viewOrContainer) {
    let next: LViewOrLContainer|null = null;

    if (viewOrContainer.views && viewOrContainer.views.length) {
      next = viewOrContainer.views[0].data;
    } else if (viewOrContainer.child) {
      next = viewOrContainer.child;
    } else if (viewOrContainer.next) {
      cleanUpView(viewOrContainer as LView);
      next = viewOrContainer.next;
    }

    if (next == null) {
      // If the viewOrContainer is the rootView, then the cleanup is done twice.
      // Without this check, ngOnDestroy would be called twice for a directive on an element.
      while (viewOrContainer && !viewOrContainer !.next && viewOrContainer !== rootView) {
        cleanUpView(viewOrContainer as LView);
        viewOrContainer = getParentState(viewOrContainer, rootView);
      }
      cleanUpView(viewOrContainer as LView || rootView);

      next = viewOrContainer && viewOrContainer.next;
    }
    viewOrContainer = next;
  }
}

/**
 * Inserts a view into a container.
 *
 * This adds the view to the container's array of active views in the correct
 * position. It also adds the view's elements to the DOM if the container isn't a
 * root node of another view (in that case, the view's elements will be added when
 * the container's parent view is added later).
 *
 * @param container The container into which the view should be inserted
 * @param newView The view to insert
 * @param index The index at which to insert the view
 * @returns The inserted view
 */
export function insertView(
    container: LContainerNode, newView: LViewNode, index: number): LViewNode {
  const state = container.data;
  const views = state.views;

  if (index > 0) {
    // This is a new view, we need to add it to the children.
    setViewNext(views[index - 1], newView);
  }

  if (index < views.length && views[index].data.id !== newView.data.id) {
    // View ID change replace the view.
    setViewNext(newView, views[index]);
    views.splice(index, 0, newView);
  } else if (index >= views.length) {
    views.push(newView);
  }

  if (state.nextIndex <= index) {
    state.nextIndex++;
  }

  // If the container's renderParent is null, we know that it is a root node of its own parent view
  // and we should wait until that parent processes its nodes (otherwise, we will insert this view's
  // nodes twice - once now and once when its parent inserts its views).
  if (container.data.renderParent !== null) {
    let beforeNode = findNextRNodeSibling(newView, container);
    if (!beforeNode) {
      let containerNextNativeNode = container.native;
      if (containerNextNativeNode === undefined) {
        containerNextNativeNode = container.native = findNextRNodeSibling(container, null);
      }
      beforeNode = containerNextNativeNode;
    }
    addRemoveViewFromContainer(container, newView, true, beforeNode);
  }

  return newView;
}

/**
 * Removes a view from a container.
 *
 * This method splices the view from the container's array of active views. It also
 * removes the view's elements from the DOM and conducts cleanup (e.g. removing
 * listeners, calling onDestroys).
 *
 * @param container The container from which to remove a view
 * @param removeIndex The index of the view to remove
 * @returns The removed view
 */
export function removeView(container: LContainerNode, removeIndex: number): LViewNode {
  const views = container.data.views;
  const viewNode = views[removeIndex];
  if (removeIndex > 0) {
    setViewNext(views[removeIndex - 1], viewNode.next);
  }
  views.splice(removeIndex, 1);
  destroyViewTree(viewNode.data);
  addRemoveViewFromContainer(container, viewNode, false);
  // Notify query that view has been removed
  container.data.queries && container.data.queries.removeView(removeIndex);
  return viewNode;
}

/**
 * Sets a next on the view node, so views in for loops can easily jump from
 * one view to the next to add/remove elements. Also adds the LView (view.data)
 * to the view tree for easy traversal when cleaning up the view.
 *
 * @param view The view to set up
 * @param next The view's new next
 */
export function setViewNext(view: LViewNode, next: LViewNode | null): void {
  view.next = next;
  view.data.next = next ? next.data : null;
}

/**
 * Determines which LViewOrLContainer to jump to when traversing back up the
 * tree in destroyViewTree.
 *
 * Normally, the view's parent LView should be checked, but in the case of
 * embedded views, the container (which is the view node's parent, but not the
 * LView's parent) needs to be checked for a possible next property.
 *
 * @param state The LViewOrLContainer for which we need a parent state
 * @param rootView The rootView, so we don't propagate too far up the view tree
 * @returns The correct parent LViewOrLContainer
 */
export function getParentState(state: LViewOrLContainer, rootView: LView): LViewOrLContainer|null {
  let node;
  if ((node = (state as LView) !.node) && (node.flags & LNodeFlags.TYPE_MASK) === LNodeFlags.View) {
    // if it's an embedded view, the state needs to go up to the container, in case the
    // container has a next
    return node.parent !.data as any;
  } else {
    // otherwise, use parent view for containers or component views
    return state.parent === rootView ? null : state.parent;
  }
}

/**
 * Removes all listeners and call all onDestroys in a given view.
 *
 * @param view The LView to clean up
 */
function cleanUpView(view: LView): void {
  removeListeners(view);
  executeOnDestroys(view);
}

/** Removes listeners and unsubscribes from output subscriptions */
function removeListeners(view: LView): void {
  const cleanup = view.cleanup !;
  if (cleanup != null) {
    for (let i = 0; i < cleanup.length - 1; i += 2) {
      if (typeof cleanup[i] === 'string') {
        cleanup ![i + 1].removeEventListener(cleanup[i], cleanup[i + 2], cleanup[i + 3]);
        i += 2;
      } else {
        cleanup[i].call(cleanup[i + 1]);
      }
    }
    view.cleanup = null;
  }
}

/** Calls onDestroy hooks for this view */
function executeOnDestroys(view: LView): void {
  const tView = view.tView;
  let destroyHooks: HookData|null;
  if (tView != null && (destroyHooks = tView.destroyHooks) != null) {
    callHooks(view.data, destroyHooks);
  }
}

/**
 * Returns whether a native element should be inserted in the given parent.
 *
 * The native node can be inserted when its parent is:
 * - A regular element => Yes
 * - A component host element =>
 *    - if the `currentView` === the parent `view`: The element is in the content (vs the
 *      template)
 *      => don't add as the parent component will project if needed.
 *    - `currentView` !== the parent `view` => The element is in the template (vs the content),
 *      add it
 * - View element => delay insertion, will be done on `viewEnd()`
 *
 * @param parent The parent in which to insert the child
 * @param currentView The LView being processed
 * @return boolean Whether the child element should be inserted.
 */
export function canInsertNativeNode(parent: LNode, currentView: LView): boolean {
  const parentIsElement = (parent.flags & LNodeFlags.TYPE_MASK) === LNodeFlags.Element;

  return parentIsElement &&
      (parent.view !== currentView || parent.data === null /* Regular Element. */);
}

/**
 * Appends the `child` element to the `parent`.
 *
 * The element insertion might be delayed {@link canInsertNativeNode}
 *
 * @param parent The parent to which to append the child
 * @param child The child that should be appended
 * @param currentView The current LView
 * @returns Whether or not the child was appended
 */
export function appendChild(parent: LNode, child: RNode | null, currentView: LView): boolean {
  if (child !== null && canInsertNativeNode(parent, currentView)) {
    // We only add element if not in View or not projected.
    const renderer = currentView.renderer;
    isProceduralRenderer(renderer) ? renderer.appendChild(parent.native !as RElement, child) :
                                     parent.native !.appendChild(child);
    return true;
  }
  return false;
}

/**
 * Inserts the provided node before the correct element in the DOM.
 *
 * The element insertion might be delayed {@link canInsertNativeNode}
 *
 * @param node Node to insert
 * @param currentView Current LView
 */
export function insertChild(node: LNode, currentView: LView): void {
  const parent = node.parent !;
  if (canInsertNativeNode(parent, currentView)) {
    let nativeSibling: RNode|null = findNextRNodeSibling(node, null);
    const renderer = currentView.renderer;
    isProceduralRenderer(renderer) ?
        renderer.insertBefore(parent.native !, node.native !, nativeSibling) :
        parent.native !.insertBefore(node.native !, nativeSibling, false);
  }
}

/**
 * Appends a projected node to the DOM, or in the case of a projected container,
 * appends the nodes from all of the container's active views to the DOM.
 *
 * @param node The node to process
 * @param currentParent The last parent element to be processed
 * @param currentView Current LView
 */
export function appendProjectedNode(
    node: LElementNode | LTextNode | LContainerNode, currentParent: LViewNode | LElementNode,
    currentView: LView): void {
  if ((node.flags & LNodeFlags.TYPE_MASK) !== LNodeFlags.Container) {
    appendChild(currentParent, (node as LElementNode | LTextNode).native, currentView);
  } else if (canInsertNativeNode(currentParent, currentView)) {
    // The node we are adding is a Container and we are adding it to Element which
    // is not a component (no more re-projection).
    // Alternatively a container is projected at the root of a component's template
    // and can't be re-projected (as not content of any component).
    // Assignee the final projection location in those cases.
    const lContainer = (node as LContainerNode).data;
    lContainer.renderParent = currentParent as LElementNode;
    const views = lContainer.views;
    for (let i = 0; i < views.length; i++) {
      addRemoveViewFromContainer(node as LContainerNode, views[i], true, null);
    }
  }
}
