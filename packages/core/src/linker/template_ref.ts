/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ElementRef} from './element_ref';
import {EmbeddedViewRef} from './view_ref';


/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * 代表一个可用来实例化内嵌视图的内嵌模板。
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<ng-template>` element
 * (or directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into
 * the constructor of the directive using the `TemplateRef` Token. Alternatively you can query for
 * the `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * 你可以用两种方式访问 `TemplateRef`。通过一个放在 `<ng-template>` 元素上的指令（或带有 `*` 前缀的指令），
 * 可以用 `TemplateRef` 作为令牌把它的内嵌视图注入到该指令的构造函数中。
 * 你还可以在组件或指令中通过 {@link Query} 来查询 `TemplateRef`。
 *
 * To instantiate Embedded Views based on a Template, use {@link ViewContainerRef#
 * createEmbeddedView}, which will create the View and attach it to the View Container.
 *
 * 要想实例化一个基于模板的内嵌视图，可使用 {@link ViewContainerRef# createEmbeddedView}，该方法会创建一个视图，
 * 并把它挂到所属的视图容器中。
 *
 */
export abstract class TemplateRef<C> {
  /**
   * The location in the View where the Embedded View logically belongs to.
   *
   * 内嵌视图在其所属视图中的位置。
   *
   * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
   * inherit from the contexts of this location.
   *
   * 对于从这个 `TemplateRef` 创建的内嵌视图，其数据绑定和依赖注入的上下文是从当前位置的上下文中继承而来的。
   *
   * Typically new Embedded Views are attached to the View Container of this location, but in
   * advanced use-cases, the View can be attached to a different container while keeping the
   * data-binding and injection context from the original location.
   *
   * 通常，新的内嵌视图会被附加到当前位置的视图容器中，但是在一些高级用例中，该视图可能被附加到别的容器中，
   * 同时还保留原位置的数据绑定和依赖注入上下文。
   *
   */
  // TODO(i): rename to anchor or location
  abstract get elementRef(): ElementRef;

  abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}
