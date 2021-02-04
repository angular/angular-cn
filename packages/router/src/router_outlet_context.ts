/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ComponentFactoryResolver, ComponentRef} from '@angular/core';

import {RouterOutlet} from './directives/router_outlet';
import {ActivatedRoute} from './router_state';


/**
 * Store contextual information about a `RouterOutlet`
 *
 * 存储关于 `RouterOutlet` 的上下文信息
 *
 * @publicApi
 */
export class OutletContext {
  outlet: RouterOutlet|null = null;
  route: ActivatedRoute|null = null;
  resolver: ComponentFactoryResolver|null = null;
  children = new ChildrenOutletContexts();
  attachRef: ComponentRef<any>|null = null;
}

/**
 * Store contextual information about the children (= nested) `RouterOutlet`
 *
 * 存储关于子级（=嵌套）`RouterOutlet` 的上下文信息。
 *
 * @publicApi
 */
export class ChildrenOutletContexts {
  // contexts for child outlets, by name.
  private contexts = new Map<string, OutletContext>();

  /**
   * Called when a `RouterOutlet` directive is instantiated
   *
   * 实例化 `RouterOutlet` 指令时调用。
   *
   */
  onChildOutletCreated(childName: string, outlet: RouterOutlet): void {
    const context = this.getOrCreateContext(childName);
    context.outlet = outlet;
    this.contexts.set(childName, context);
  }

  /**
   * Called when a `RouterOutlet` directive is destroyed.
   * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
   * re-created later.
   *
   * `RouterOutlet` 指令被销毁时调用。我们需要保留上下文，因为此出口可能在 NgIf 内部被销毁，并可能在以后重新创建。
   *
   */
  onChildOutletDestroyed(childName: string): void {
    const context = this.getContext(childName);
    if (context) {
      context.outlet = null;
    }
  }

  /**
   * Called when the corresponding route is deactivated during navigation.
   * Because the component get destroyed, all children outlet are destroyed.
   *
   * 在导航期间停用相应的路由时调用。由于组件被销毁，所有子出口也都被销毁了。
   *
   */
  onOutletDeactivated(): Map<string, OutletContext> {
    const contexts = this.contexts;
    this.contexts = new Map();
    return contexts;
  }

  onOutletReAttached(contexts: Map<string, OutletContext>) {
    this.contexts = contexts;
  }

  getOrCreateContext(childName: string): OutletContext {
    let context = this.getContext(childName);

    if (!context) {
      context = new OutletContext();
      this.contexts.set(childName, context);
    }

    return context;
  }

  getContext(childName: string): OutletContext|null {
    return this.contexts.get(childName) || null;
  }
}
