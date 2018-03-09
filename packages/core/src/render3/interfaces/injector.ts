/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../../di/injector';
import {ElementRef} from '../../linker/element_ref';
import {TemplateRef} from '../../linker/template_ref';
import {ViewContainerRef} from '../../linker/view_container_ref';

import {LContainerNode, LElementNode} from './node';

export interface LInjector {
  /**
   * We need to store a reference to the injector's parent so DI can keep looking up
   * the injector tree until it finds the dependency it's looking for.
   */
  readonly parent: LInjector|null;

  /**
   * Allows access to the directives array in that node's static data and to
   * the node's flags (for starting directive index and directive size). Necessary
   * for DI to retrieve a directive from the data array if injector indicates
   * it is there.
   */
  readonly node: LElementNode|LContainerNode;

  /**
   * The following bloom filter determines whether a directive is available
   * on the associated node or not. This prevents us from searching the directives
   * array at this level unless it's probable the directive is in it.
   *
   * - bf0: Check directive IDs 0-31  (IDs are % 128)
   * - bf1: Check directive IDs 33-63
   * - bf2: Check directive IDs 64-95
   * - bf3: Check directive IDs 96-127
   *
   * See: https://en.wikipedia.org/wiki/Bloom_filter for more about bloom filters.
   */
  bf0: number;
  bf1: number;
  bf2: number;
  bf3: number;

  /**
   * cbf0 - cbf3 properties determine whether a directive is available through a
   * parent injector. They refer to the merged values of parent bloom filters. This
   * allows us to skip looking up the chain unless it's probable that directive exists
   * up the chain.
   */
  cbf0: number;
  cbf1: number;
  cbf2: number;
  cbf3: number;
  injector: Injector|null;

  /** Stores the TemplateRef so subsequent injections of the TemplateRef get the same instance. */
  templateRef: TemplateRef<any>|null;

  /** Stores the ViewContainerRef so subsequent injections of the ViewContainerRef get the same
   * instance. */
  viewContainerRef: ViewContainerRef|null;

  /** Stores the ElementRef so subsequent injections of the ElementRef get the same instance. */
  elementRef: ElementRef|null;
}

// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const unusedValueExportToPlacateAjd = 1;
