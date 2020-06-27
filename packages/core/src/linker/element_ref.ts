/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {injectElementRef as render3InjectElementRef} from '../render3/view_engine_compatibility';
import {noop} from '../util/noop';

/**
 * A wrapper around a native element inside of a View.
 *
 * 对视图中某个原生元素的包装器。
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * `ElementRef` 的背后是一个可渲染的具体元素。在浏览器中，它通常是一个 DOM 元素。
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 * 允许直接访问 DOM 会导致你的应用在 XSS 攻击前面更加脆弱。要仔细评审对 `ElementRef` 的代码。欲知详情，参见[安全](http://g.co/ng/security)。
 *
 * @publicApi
 */
// Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
// i.e. users have to ask for what they need. With that, we can build better analysis tools
// and could do better codegen in the future.
export class ElementRef<T = any> {
  /**
   * The underlying native element or `null` if direct access to native elements is not supported
   * (e.g. when the application runs in a web worker).
   *
   * 背后的原生元素，如果不支持直接访问原生元素，则为 `null`（比如：在 Web Worker 环境下运行此应用的时候）。
   *
   * <div class="callout is-critical">
   *   <header>Use with caution</header>
   *   <header>当心！</header>
   *   <p>
   *    Use this API as the last resort when direct access to DOM is needed. Use templating and
   *    data-binding provided by Angular instead. Alternatively you can take a look at {@link
   * Renderer2}
   *    which provides API that can safely be used even when direct access to native elements is not
   *    supported.
   *   </p>
   *   <p>
   *    当需要直接访问 DOM 时，请把本 API 作为最后选择。优先使用 Angular 提供的模板和数据绑定机制。或者你还可以看看 {@link
   * Renderer2}，它提供了可安全使用的 API —— 即使环境没有提供直接访问原生元素的功能。
   *   </p>
   *   <p>
   *    Relying on direct DOM access creates tight coupling between your application and rendering
   *    layers which will make it impossible to separate the two and deploy your application into a
   *    web worker.
   *   </p>
   *   <p>
   *     如果依赖直接访问 DOM 的方式，就可能在应用和渲染层之间产生紧耦合。这将导致无法分开两者，也就无法将应用发布到 Web Worker 中。
   *   </p>
   * </div>
   *
   */
  public nativeElement: T;

  constructor(nativeElement: T) {
    this.nativeElement = nativeElement;
  }

  /**
   * @internal
   * @nocollapse
   */
  static __NG_ELEMENT_ID__: () => ElementRef = () => SWITCH_ELEMENT_REF_FACTORY(ElementRef);
}

export const SWITCH_ELEMENT_REF_FACTORY__POST_R3__ = render3InjectElementRef;
const SWITCH_ELEMENT_REF_FACTORY__PRE_R3__ = noop;
const SWITCH_ELEMENT_REF_FACTORY: typeof render3InjectElementRef =
    SWITCH_ELEMENT_REF_FACTORY__PRE_R3__;
