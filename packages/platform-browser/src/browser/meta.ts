/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT, ɵDomAdapter as DomAdapter, ɵgetDOM as getDOM} from '@angular/common';
import {Inject, Injectable, ɵɵinject} from '@angular/core';

/**
 * Represents the attributes of an HTML `<meta>` element. The element itself is
 * represented by the internal `HTMLMetaElement`.
 *
 * 表示 HTML `<meta>` 元素的属性。该元素本身由一个内部 `HTMLMetaElement` 表示。
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 *
 * [HTML 元标记](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 *
 * @see `Meta`
 *
 * @publicApi
 */
export type MetaDefinition = {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
}&{
  // TODO(IgorMinar): this type looks wrong
  [prop: string]: string;
};

/**
 * Factory to create a `Meta` service instance for the current DOM document.
 */
export function createMeta() {
  return new Meta(ɵɵinject(DOCUMENT));
}

/**
 * A service for managing HTML `<meta>` tags.
 *
 * 用于管理 HTML `<meta>` 标记的服务。
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * `MetaDefinition` 对象的属性与 HTML `<meta>` 标记的属性一一对应。这些标记定义了文档的元数据，这些元数据对于配置内容安全策略、定义浏览器兼容性和安全设置、设置 HTTP 标头、定义用于社交共享的富内容以及搜索引擎优化（SEO）等都很重要。
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * 要在 document 中标识特定的 `<meta>` 标签，请使用格式为 `"tag_attribute='value string'"` 的属性选择字符串。例如，`"name='description'"` 的 `attrSelector` 值，与一个 `name` 属性值为 `"description"` 的标签匹配。这些选择器可以和 document 的 `querySelector()` 方法一起使用，格式为 `meta[{attrSelector}]`。
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 *
 * [HTML 元标记](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 *
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */
@Injectable({providedIn: 'root', useFactory: createMeta, deps: []})
export class Meta {
  private _dom: DomAdapter;
  constructor(@Inject(DOCUMENT) private _doc: any) {
    this._dom = getDOM();
  }
  /**
   * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * If an existing element is found, it is returned and is not modified in any way.
   *
   * 在当前 HTML 文档中检索或创建特定的 `<meta>`。在搜索现有标签时，Angular 会尝试匹配 `name` 或 `property` 属性值，并验证所有其他属性值是否相等。如果找到现有元素，则将其返回，并且不会进行任何修改。
   *
   * @param tag The definition of a `<meta>` element to match or create.
   *
   * 要匹配或创建的 `<meta>` 元素定义。
   *
   * @param forceCreation True to create a new element without checking whether one already exists.
   *
   * 如果为 True，则只创建新元素而不检查是否已经存在。
   *
   * @returns The existing element with the same attributes and values if found,
   * the new element if no match is found, or `null` if the tag parameter is not defined.
   *
   * 如果找到具有相同属性和值的现有元素，则找到新元素；如果找不到匹配项，则为新元素；如果未定义 tag 参数，则为 `null`
   *
   */
  addTag(tag: MetaDefinition, forceCreation: boolean = false): HTMLMetaElement|null {
    if (!tag) return null;
    return this._getOrCreateElement(tag, forceCreation);
  }

  /**
   * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   *
   * 在当前 HTML 文档中检索或创建一组 `<meta>`。在搜索现有标签时，Angular 会尝试在所提供的 Tag 定义中匹配 `name` 或 `property` 属性值并验证所有其他属性值是否也相等。
   *
   * @param tags An array of tag definitions to match or create.
   *
   * 要匹配或创建的标签定义的数组。
   *
   * @param forceCreation True to create new elements without checking whether they already exist.
   *
   * 如果为 True，则创建新元素而不检查其是否已存在。
   *
   * @returns The matching elements if found, or the new elements.
   *
   * 匹配的元素（如果找到）或新元素。
   *
   */
  addTags(tags: MetaDefinition[], forceCreation: boolean = false): HTMLMetaElement[] {
    if (!tags) return [];
    return tags.reduce((result: HTMLMetaElement[], tag: MetaDefinition) => {
      if (tag) {
        result.push(this._getOrCreateElement(tag, forceCreation));
      }
      return result;
    }, []);
  }

  /**
   * Retrieves a `<meta>` tag element in the current HTML document.
   *
   * 检索当前 HTML 文档中的 `<meta>`
   *
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   *
   * 要匹配的标签属性和值，格式为 `"tag_attribute='value string'"` 。
   *
   * @returns The matching element, if any.
   *
   * 要匹配的元素（如果有）。
   *
   */
  getTag(attrSelector: string): HTMLMetaElement|null {
    if (!attrSelector) return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }

  /**
   * Retrieves a set of `<meta>` tag elements in the current HTML document.
   *
   * 在当前 HTML 文档中检索一组 `<meta>` 标签。
   *
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   *
   * 要匹配的标签属性和值，格式为 `"tag_attribute='value string'"` 。
   *
   * @returns The matching elements, if any.
   *
   * 匹配到的元素（如果有）。
   *
   */
  getTags(attrSelector: string): HTMLMetaElement[] {
    if (!attrSelector) return [];
    const list /*NodeList*/ = this._doc.querySelectorAll(`meta[${attrSelector}]`);
    return list ? [].slice.call(list) : [];
  }

  /**
   * Modifies an existing `<meta>` tag element in the current HTML document.
   *
   * 修改当前 HTML 文档中现有的 `<meta>` 标签元素。
   *
   * @param tag The tag description with which to replace the existing tag content.
   *
   * 用于替换现有标签内容的标签说明。
   *
   * @param selector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   * If not supplied, matches a tag with the same `name` or `property` attribute value as the
   * replacement tag.
   *
   * 要匹配的标签属性和值，以标识现有标签。格式为 `"tag_attribute='value string'"` 字符串。如果没有提供，则改为匹配具有相同 `name` 或 `property` 属性值的标签。
   *
   * @return The modified element.
   *
   * 修改后的元素。
   *
   */
  updateTag(tag: MetaDefinition, selector?: string): HTMLMetaElement|null {
    if (!tag) return null;
    selector = selector || this._parseSelector(tag);
    const meta: HTMLMetaElement = this.getTag(selector)!;
    if (meta) {
      return this._setMetaElementAttributes(tag, meta);
    }
    return this._getOrCreateElement(tag, true);
  }

  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   *
   * 从当前 HTML 文档中删除现有的 `<meta>` 标签元素。
   *
   * @param attrSelector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   *
   * 要匹配的标签属性和值，以标识现有标签。格式为 `"tag_attribute='value string'"` 字符串。
   *
   */
  removeTag(attrSelector: string): void {
    this.removeTagElement(this.getTag(attrSelector)!);
  }

  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   *
   * 从当前 HTML 文档中删除现有的 `<meta>`
   *
   * @param meta The tag definition to match against to identify an existing tag.
   *
   * 需要匹配以标识出现有标签的标签定义。
   *
   */
  removeTagElement(meta: HTMLMetaElement): void {
    if (meta) {
      this._dom.remove(meta);
    }
  }

  private _getOrCreateElement(meta: MetaDefinition, forceCreation: boolean = false):
      HTMLMetaElement {
    if (!forceCreation) {
      const selector: string = this._parseSelector(meta);
      const elem: HTMLMetaElement = this.getTag(selector)!;
      // It's allowed to have multiple elements with the same name so it's not enough to
      // just check that element with the same name already present on the page. We also need to
      // check if element has tag attributes
      if (elem && this._containsAttributes(meta, elem)) return elem;
    }
    const element: HTMLMetaElement = this._dom.createElement('meta') as HTMLMetaElement;
    this._setMetaElementAttributes(meta, element);
    const head = this._doc.getElementsByTagName('head')[0];
    head.appendChild(element);
    return element;
  }

  private _setMetaElementAttributes(tag: MetaDefinition, el: HTMLMetaElement): HTMLMetaElement {
    Object.keys(tag).forEach(
        (prop: string) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
    return el;
  }

  private _parseSelector(tag: MetaDefinition): string {
    const attr: string = tag.name ? 'name' : 'property';
    return `${attr}="${tag[attr]}"`;
  }

  private _containsAttributes(tag: MetaDefinition, elem: HTMLMetaElement): boolean {
    return Object.keys(tag).every(
        (key: string) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
  }

  private _getMetaKeyMap(prop: string): string {
    return META_KEYS_MAP[prop] || prop;
  }
}

/**
 * Mapping for MetaDefinition properties with their correct meta attribute names
 */
const META_KEYS_MAP: {[prop: string]: string;} = {
  httpEquiv: 'http-equiv'
};
