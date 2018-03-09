/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const domino = require('domino');

import {ɵBrowserDomAdapter as BrowserDomAdapter, ɵsetRootDomAdapter as setRootDomAdapter} from '@angular/platform-browser';

function _notImplemented(methodName: string) {
  return new Error('This method is not implemented in DominoAdapter: ' + methodName);
}

/**
 * Parses a document string to a Document object.
 */
export function parseDocument(html: string, url = '/') {
  let window = domino.createWindow(html, url);
  let doc = window.document;
  return doc;
}

/**
 * Serializes a document to string.
 */
export function serializeDocument(doc: Document): string {
  return (doc as any).serialize();
}

/**
 * DOM Adapter for the server platform based on https://github.com/fgnass/domino.
 */
export class DominoAdapter extends BrowserDomAdapter {
  static makeCurrent() { setRootDomAdapter(new DominoAdapter()); }

  private static defaultDoc: Document;

  logError(error: string) { console.error(error); }

  log(error: string) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }

  logGroup(error: string) { console.error(error); }

  logGroupEnd() {}

  supportsDOMEvents(): boolean { return false; }
  supportsNativeShadowDOM(): boolean { return false; }

  contains(nodeA: any, nodeB: any): boolean {
    let inner = nodeB;
    while (inner) {
      if (inner === nodeA) return true;
      inner = inner.parent;
    }
    return false;
  }

  createHtmlDocument(): HTMLDocument {
    return parseDocument('<html><head><title>fakeTitle</title></head><body></body></html>');
  }

  getDefaultDocument(): Document {
    if (!DominoAdapter.defaultDoc) {
      DominoAdapter.defaultDoc = domino.createDocument();
    }
    return DominoAdapter.defaultDoc;
  }

  createShadowRoot(el: any, doc: Document = document): DocumentFragment {
    el.shadowRoot = doc.createDocumentFragment();
    el.shadowRoot.parent = el;
    return el.shadowRoot;
  }
  getShadowRoot(el: any): DocumentFragment { return el.shadowRoot; }

  isTextNode(node: any): boolean { return node.nodeType === DominoAdapter.defaultDoc.TEXT_NODE; }
  isCommentNode(node: any): boolean {
    return node.nodeType === DominoAdapter.defaultDoc.COMMENT_NODE;
  }
  isElementNode(node: any): boolean {
    return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
  }
  hasShadowRoot(node: any): boolean { return node.shadowRoot != null; }
  isShadowRoot(node: any): boolean { return this.getShadowRoot(node) == node; }

  getProperty(el: Element, name: string): any {
    if (name === 'href') {
      // Domino tries tp resolve href-s which we do not want. Just return the
      // atribute value.
      return this.getAttribute(el, 'href');
    } else if (name === 'innerText') {
      // Domino does not support innerText. Just map it to textContent.
      return el.textContent;
    }
    return (<any>el)[name];
  }

  setProperty(el: Element, name: string, value: any) {
    if (name === 'href') {
      // Eventhough the server renderer reflects any properties to attributes
      // map 'href' to atribute just to handle when setProperty is directly called.
      this.setAttribute(el, 'href', value);
    } else if (name === 'innerText') {
      // Domino does not support innerText. Just map it to textContent.
      el.textContent = value;
    }
    (<any>el)[name] = value;
  }

  getGlobalEventTarget(doc: Document, target: string): EventTarget|null {
    if (target === 'window') {
      return doc.defaultView;
    }
    if (target === 'document') {
      return doc;
    }
    if (target === 'body') {
      return doc.body;
    }
    return null;
  }

  getBaseHref(doc: Document): string {
    const base = this.querySelector(doc.documentElement, 'base');
    let href = '';
    if (base) {
      href = this.getHref(base);
    }
    // TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
    return href;
  }

  setStyle(element: any, styleName: string, styleValue?: string|null) {
    styleName = styleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    element.style[styleName] = styleValue;
  }
  removeStyle(element: any, styleName: string) {
    // IE requires '' instead of null
    // see https://github.com/angular/angular/issues/7916
    element.style[styleName] = '';
  }
  getStyle(element: any, styleName: string): string {
    return element.style[styleName] || element.style.getPropertyValue(styleName);
  }
  hasStyle(element: any, styleName: string, styleValue?: string): boolean {
    const value = this.getStyle(element, styleName);
    return styleValue ? value == styleValue : value.length > 0;
  }

  dispatchEvent(el: Node, evt: any) {
    el.dispatchEvent(evt);

    // Dispatch the event to the window also.
    const doc = el.ownerDocument || el;
    const win = (doc as any).defaultView;
    if (win) {
      win.dispatchEvent(evt);
    }
  }

  getHistory(): History { throw _notImplemented('getHistory'); }
  getLocation(): Location { throw _notImplemented('getLocation'); }
  getUserAgent(): string { return 'Fake user agent'; }

  supportsWebAnimation(): boolean { return false; }
  performanceNow(): number { return Date.now(); }
  getAnimationPrefix(): string { return ''; }
  getTransitionEnd(): string { return 'transitionend'; }
  supportsAnimation(): boolean { return true; }

  getDistributedNodes(el: any): Node[] { throw _notImplemented('getDistributedNodes'); }

  supportsCookies(): boolean { return false; }
  getCookie(name: string): string { throw _notImplemented('getCookie'); }
  setCookie(name: string, value: string) { throw _notImplemented('setCookie'); }
}
