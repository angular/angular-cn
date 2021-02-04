/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵɵinjectAttribute} from '../render3/instructions/di_attr';
import {makeParamDecorator} from '../util/decorators';


/**
 * Type of the Attribute decorator / constructor function.
 *
 * 属性装饰器/构造函数的类型。
 *
 * @publicApi
 */
export interface AttributeDecorator {
  /**
   * Parameter decorator for a directive constructor that designates
   * a host-element attribute whose value is injected as a constant string literal.
   *
   * 指令构造函数的参数修饰器，用于指定宿主元素属性，其值作为常量字符串文字注入。
   *
   * @usageNotes
   *
   * Suppose we have an `<input>` element and want to know its `type`.
   *
   * 假设我们有一个 `<input>` 元素，并且想知道它的 `type` 。
   *
   * ```html
   * <input type="text">
   * ```
   *
   * The following example uses the decorator to inject the string literal `text` in a directive.
   *
   * 以下示例使用装饰器将字符串文字 `text` 注入指令中。
   *
   * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
   *
   * The following example uses the decorator in a component constructor.
   *
   * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
   *
   */
  (name: string): any;
  new(name: string): Attribute;
}

/**
 * Type of the Attribute metadata.
 *
 * 属性元数据的类型。
 *
 * @publicApi
 */
export interface Attribute {
  /**
   * The name of the attribute whose value can be injected.
   *
   * 可以注入其值的属性的名称。
   *
   */
  attributeName: string;
}

function CREATE_ATTRIBUTE_DECORATOR__PRE_R3__(): AttributeDecorator {
  return makeParamDecorator('Attribute', (attributeName?: string) => ({attributeName}));
}

export function CREATE_ATTRIBUTE_DECORATOR__POST_R3__(): AttributeDecorator {
  return makeParamDecorator(
      'Attribute',
      (attributeName?: string) =>
          ({attributeName, __NG_ELEMENT_ID__: () => ɵɵinjectAttribute(attributeName!)}));
}

const CREATE_ATTRIBUTE_DECORATOR_IMPL = CREATE_ATTRIBUTE_DECORATOR__PRE_R3__;

/**
 * Attribute decorator and metadata.
 *
 * 属性装饰器和元数据。
 *
 * @Annotation
 * @publicApi
 */
export const Attribute: AttributeDecorator = CREATE_ATTRIBUTE_DECORATOR_IMPL();
