/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DomAdapter, getDOM} from '../dom/dom_adapter';

/**
 * This helper class is used to get hold of an inert tree of DOM elements containing dirty HTML
 * that needs sanitizing.
 * Depending upon browser support we must use one of three strategies for doing this.
 * Support: Safari 10.x -> XHR strategy
 * Support: Firefox -> DomParser strategy
 * Default: InertDocument strategy
 */
export class InertBodyHelper {
  private inertBodyElement: HTMLElement;

  constructor(private defaultDoc: any, private DOM: DomAdapter) {
    const inertDocument = this.DOM.createHtmlDocument();
    this.inertBodyElement = inertDocument.body;

    if (this.inertBodyElement == null) {
      // usually there should be only one body element in the document, but IE doesn't have any, so
      // we need to create one.
      const inertHtml = this.DOM.createElement('html', inertDocument);
      this.inertBodyElement = this.DOM.createElement('body', inertDocument);
      this.DOM.appendChild(inertHtml, this.inertBodyElement);
      this.DOM.appendChild(inertDocument, inertHtml);
    }

    this.DOM.setInnerHTML(
        this.inertBodyElement, '<svg><g onload="this.parentNode.remove()"></g></svg>');
    if (this.inertBodyElement.querySelector && !this.inertBodyElement.querySelector('svg')) {
      // We just hit the Safari 10.1 bug - which allows JS to run inside the SVG G element
      // so use the XHR strategy.
      this.getInertBodyElement = this.getInertBodyElement_XHR;
      return;
    }

    this.DOM.setInnerHTML(
        this.inertBodyElement, '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">');
    if (this.inertBodyElement.querySelector && this.inertBodyElement.querySelector('svg img')) {
      // We just hit the Firefox bug - which prevents the inner img JS from being sanitized
      // so use the DOMParser strategy, if it is available.
      // If the DOMParser is not available then we are not in Firefox (Server/WebWorker?) so we
      // fall through to the default strategy below.
      if (isDOMParserAvailable()) {
        this.getInertBodyElement = this.getInertBodyElement_DOMParser;
        return;
      }
    }

    // None of the bugs were hit so it is safe for us to use the default InertDocument strategy
    this.getInertBodyElement = this.getInertBodyElement_InertDocument;
  }

  /**
   * Get an inert DOM element containing DOM created from the dirty HTML string provided.
   * The implementation of this is determined in the constructor, when the class is instantiated.
   */
  getInertBodyElement: (html: string) => HTMLElement | null;

  /**
   * Use XHR to create and fill an inert body element (on Safari 10.1)
   * See
   * https://github.com/cure53/DOMPurify/blob/a992d3a75031cb8bb032e5ea8399ba972bdf9a65/src/purify.js#L439-L449
   */
  private getInertBodyElement_XHR(html: string) {
    // We add these extra elements to ensure that the rest of the content is parsed as expected
    // e.g. leading whitespace is maintained and tags like `<meta>` do not get hoisted to the
    // `<head>` tag.
    html = '<body><remove></remove>' + html + '</body>';
    try {
      html = encodeURI(html);
    } catch (e) {
      return null;
    }
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    xhr.open('GET', 'data:text/html;charset=utf-8,' + html, false);
    xhr.send(null);
    const body: HTMLBodyElement = xhr.response.body;
    body.removeChild(body.firstChild !);
    return body;
  }

  /**
   * Use DOMParser to create and fill an inert body element (on Firefox)
   * See https://github.com/cure53/DOMPurify/releases/tag/0.6.7
   *
   */
  private getInertBodyElement_DOMParser(html: string) {
    // We add these extra elements to ensure that the rest of the content is parsed as expected
    // e.g. leading whitespace is maintained and tags like `<meta>` do not get hoisted to the
    // `<head>` tag.
    html = '<body><remove></remove>' + html + '</body>';
    try {
      const body = new (window as any)
                       .DOMParser()
                       .parseFromString(html, 'text/html')
                       .body as HTMLBodyElement;
      body.removeChild(body.firstChild !);
      return body;
    } catch (e) {
      return null;
    }
  }

  /**
   * Use an HTML5 `template` element, if supported, or an inert body element created via
   * `createHtmlDocument` to create and fill an inert DOM element.
   * This is the default sane strategy to use if the browser does not require one of the specialised
   * strategies above.
   */
  private getInertBodyElement_InertDocument(html: string) {
    // Prefer using <template> element if supported.
    const templateEl = this.DOM.createElement('template');
    if ('content' in templateEl) {
      this.DOM.setInnerHTML(templateEl, html);
      return templateEl;
    }

    this.DOM.setInnerHTML(this.inertBodyElement, html);

    // Support: IE 9-11 only
    // strip custom-namespaced attributes on IE<=11
    if (this.defaultDoc.documentMode) {
      this.stripCustomNsAttrs(this.inertBodyElement);
    }

    return this.inertBodyElement;
  }

  /**
   * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1'
   * attribute to declare ns1 namespace and prefixes the attribute with 'ns1' (e.g.
   * 'ns1:xlink:foo').
   *
   * This is undesirable since we don't want to allow any of these custom attributes. This method
   * strips them all.
   */
  private stripCustomNsAttrs(el: Element) {
    this.DOM.attributeMap(el).forEach((_, attrName) => {
      if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {
        this.DOM.removeAttribute(el, attrName);
      }
    });
    for (const n of this.DOM.childNodesAsList(el)) {
      if (this.DOM.isElementNode(n)) this.stripCustomNsAttrs(n as Element);
    }
  }
}

/**
 * We need to determine whether the DOMParser exists in the global context.
 * The try-catch is because, on some browsers, trying to access this property
 * on window can actually throw an error.
 *
 * @suppress {uselessCode}
 */
function isDOMParserAvailable() {
  try {
    return !!(window as any).DOMParser;
  } catch (e) {
    return false;
  }
}
