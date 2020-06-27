/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {injectTemplateRef as render3InjectTemplateRef} from '../render3/view_engine_compatibility';
import {noop} from '../util/noop';

import {ElementRef} from './element_ref';
import {EmbeddedViewRef} from './view_ref';


/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * 表示一个内嵌模板，它可用于实例化内嵌的视图。
 * 要想根据模板实例化内嵌的视图，请使用 `ViewContainerRef` 的 `createEmbeddedView()` 方法。
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * 通过把一个指令放在 `<ng-template>` 元素（或一个带 `*` 前缀的指令）上，可以访问 `TemplateRef` 的实例。
 * 内嵌视图的 `TemplateRef` 实例会以 `TemplateRef` 作为令牌，注入到该指令的构造函数中。
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * 你还可以使用 `Query` 来找出与某个组件或指令相关的 `TemplateRef`。
 *
 * @see `ViewContainerRef`
 * @see [Navigate the Component Tree with DI](guide/dependency-injection-navtree)
 *
 * [使用 DI 在组件树中导航](guide/dependency-injection-navtree)
 *
 * @publicApi
 */
export abstract class TemplateRef<C> {
  /**
   * The anchor element in the parent view for this embedded view.
   *
   * 内嵌视图在其所属视图中的位置。
   *
   * The data-binding and injection contexts of embedded views created from this `TemplateRef`
   * inherit from the contexts of this location.
   *
   * 对于从这个 `TemplateRef` 创建的内嵌视图，其数据绑定和依赖注入的上下文是从当前位置的上下文中继承而来的。
   *
   * Typically new embedded views are attached to the view container of this location, but in
   * advanced use-cases, the view can be attached to a different container while keeping the
   * data-binding and injection context from the original location.
   *
   * 通常，新的内嵌视图会被附加到当前位置的视图容器中，但是在一些高级用例中，该视图可能被附加到别的容器中，
   * 同时还保留原位置的数据绑定和依赖注入上下文。
   *
   */
  // TODO(i): rename to anchor or location
  abstract get elementRef(): ElementRef;

  /**
   * Instantiates an embedded view based on this template,
   * and attaches it to the view container.
   *
   * 创建一个视图对象，并把它附着到父视图的视图容器上。
   *
   * @param context The data-binding context of the embedded view, as declared
   * in the `<ng-template>` usage.
   *
   * 这个新视图的上下文环境，继承自所附着的元素。
   *
   * @returns The new embedded view object.
   *
   * 这个新的视图对象。
   *
   */
  abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;

  /**
   * @internal
   * @nocollapse
   */
  static __NG_ELEMENT_ID__:
      () => TemplateRef<any>| null = () => SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef)
}

export const SWITCH_TEMPLATE_REF_FACTORY__POST_R3__ = render3InjectTemplateRef;
const SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__ = noop;
const SWITCH_TEMPLATE_REF_FACTORY: typeof render3InjectTemplateRef =
    SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__;
