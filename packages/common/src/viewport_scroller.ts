/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ErrorHandler, ɵɵdefineInjectable, ɵɵinject} from '@angular/core';

import {DOCUMENT} from './dom_tokens';



/**
 * Defines a scroll position manager. Implemented by `BrowserViewportScroller`.
 *
 * 定义滚动位置管理器。由 `BrowserViewportScroller` 实现。
 *
 * @publicApi
 */
export abstract class ViewportScroller {
  // De-sugared tree-shakable injection
  // See #23917
  /** @nocollapse */
  static ɵprov = ɵɵdefineInjectable({
    token: ViewportScroller,
    providedIn: 'root',
    factory: () => new BrowserViewportScroller(ɵɵinject(DOCUMENT), window, ɵɵinject(ErrorHandler))
  });

  /**
   * Configures the top offset used when scrolling to an anchor.
   *
   * 配置滚动到锚点时使用的顶部偏移量。
   *
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   * 屏幕坐标中的位置（具有 x 和 y 值的元组）或返回顶部偏移位置的函数。
   *
   */
  abstract setOffset(offset: [number, number]|(() => [number, number])): void;

  /**
   * Retrieves the current scroll position.
   *
   * 检索当前滚动位置。
   *
   * @returns A position in screen coordinates (a tuple with x and y values).
   *
   * 屏幕坐标中的位置（具有 x 和 y 值的元组）。
   *
   */
  abstract getScrollPosition(): [number, number];

  /**
   * Scrolls to a specified position.
   *
   * 滚动到指定位置。
   *
   * @param position A position in screen coordinates (a tuple with x and y values).
   *
   * 屏幕坐标中的位置（具有 x 和 y 值的元组）。
   *
   */
  abstract scrollToPosition(position: [number, number]): void;

  /**
   * Scrolls to an anchor element.
   *
   * 滚动到锚点元素。
   *
   * @param anchor The ID of the anchor element.
   *
   * 锚点元素的 ID。
   *
   */
  abstract scrollToAnchor(anchor: string): void;

  /**
   * Disables automatic scroll restoration provided by the browser.
   * See also [window.history.scrollRestoration
   * info](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration).
   *
   * 禁用浏览器提供的自动滚动恢复功能。另请参见 [window.history.scrollRestoration 信息](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration)。
   *
   */
  abstract setHistoryScrollRestoration(scrollRestoration: 'auto'|'manual'): void;
}

/**
 * Manages the scroll position for a browser window.
 */
export class BrowserViewportScroller implements ViewportScroller {
  private offset: () => [number, number] = () => [0, 0];

  constructor(private document: any, private window: any, private errorHandler: ErrorHandler) {}

  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(offset: [number, number]|(() => [number, number])): void {
    if (Array.isArray(offset)) {
      this.offset = () => offset;
    } else {
      this.offset = offset;
    }
  }

  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition(): [number, number] {
    if (this.supportsScrolling()) {
      return [this.window.pageXOffset, this.window.pageYOffset];
    } else {
      return [0, 0];
    }
  }

  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(position: [number, number]): void {
    if (this.supportsScrolling()) {
      this.window.scrollTo(position[0], position[1]);
    }
  }

  /**
   * Scrolls to an anchor element.
   * @param anchor The ID of the anchor element.
   */
  scrollToAnchor(anchor: string): void {
    if (this.supportsScrolling()) {
      const elSelected =
          this.document.getElementById(anchor) || this.document.getElementsByName(anchor)[0];
      if (elSelected) {
        this.scrollToElement(elSelected);
      }
    }
  }

  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(scrollRestoration: 'auto'|'manual'): void {
    if (this.supportScrollRestoration()) {
      const history = this.window.history;
      if (history && history.scrollRestoration) {
        history.scrollRestoration = scrollRestoration;
      }
    }
  }

  private scrollToElement(el: any): void {
    const rect = el.getBoundingClientRect();
    const left = rect.left + this.window.pageXOffset;
    const top = rect.top + this.window.pageYOffset;
    const offset = this.offset();
    this.window.scrollTo(left - offset[0], top - offset[1]);
  }

  /**
   * We only support scroll restoration when we can get a hold of window.
   * This means that we do not support this behavior when running in a web worker.
   *
   * Lifting this restriction right now would require more changes in the dom adapter.
   * Since webworkers aren't widely used, we will lift it once RouterScroller is
   * battle-tested.
   */
  private supportScrollRestoration(): boolean {
    try {
      if (!this.supportsScrolling()) {
        return false;
      }
      // The `scrollRestoration` property could be on the `history` instance or its prototype.
      const scrollRestorationDescriptor = getScrollRestorationProperty(this.window.history) ||
          getScrollRestorationProperty(Object.getPrototypeOf(this.window.history));
      // We can write to the `scrollRestoration` property if it is a writable data field or it has a
      // setter function.
      return !!scrollRestorationDescriptor &&
          !!(scrollRestorationDescriptor.writable || scrollRestorationDescriptor.set);
    } catch {
      return false;
    }
  }

  private supportsScrolling(): boolean {
    try {
      return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
    } catch {
      return false;
    }
  }
}

function getScrollRestorationProperty(obj: any): PropertyDescriptor|undefined {
  return Object.getOwnPropertyDescriptor(obj, 'scrollRestoration');
}

/**
 * Provides an empty implementation of the viewport scroller.
 */
export class NullViewportScroller implements ViewportScroller {
  /**
   * Empty implementation
   */
  setOffset(offset: [number, number]|(() => [number, number])): void {}

  /**
   * Empty implementation
   */
  getScrollPosition(): [number, number] {
    return [0, 0];
  }

  /**
   * Empty implementation
   */
  scrollToPosition(position: [number, number]): void {}

  /**
   * Empty implementation
   */
  scrollToAnchor(anchor: string): void {}

  /**
   * Empty implementation
   */
  setHistoryScrollRestoration(scrollRestoration: 'auto'|'manual'): void {}
}
