/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Directive, DoCheck, Input, ɵRenderFlags, ɵɵallocHostVars, ɵɵclassMap, ɵɵdefineDirective} from '@angular/core';

import {NgClassImpl, NgClassImplProvider} from './ng_class_impl';



/*
 * NgClass (as well as NgStyle) behaves differently when loaded in the VE and when not.
 *
 * If the VE is present (which is for older versions of Angular) then NgClass will inject
 * the legacy diffing algorithm as a service and delegate all styling changes to that.
 *
 * If the VE is not present then NgStyle will normalize (through the injected service) and
 * then write all styling changes to the `[style]` binding directly (through a host binding).
 * Then Angular will notice the host binding change and treat the changes as styling
 * changes and apply them via the core styling instructions that exist within Angular.
 */

// used when the VE is present
export const ngClassDirectiveDef__PRE_R3__ = undefined;

// used when the VE is not present (note the directive will
// never be instantiated normally because it is apart of a
// base class)
export const ngClassDirectiveDef__POST_R3__ = ɵɵdefineDirective({
  type: function() {} as any,
  selectors: null as any,
  hostBindings: function(rf: ɵRenderFlags, ctx: any, elIndex: number) {
    if (rf & ɵRenderFlags.Create) {
      ɵɵallocHostVars(2);
    }
    if (rf & ɵRenderFlags.Update) {
      ɵɵclassMap(ctx.getValue());
    }
  }
});

export const ngClassDirectiveDef = ngClassDirectiveDef__PRE_R3__;

export const ngClassFactoryDef__PRE_R3__ = undefined;
export const ngClassFactoryDef__POST_R3__ = function() {};
export const ngClassFactoryDef = ngClassFactoryDef__PRE_R3__;

/**
 * Serves as the base non-VE container for NgClass.
 *
 * While this is a base class that NgClass extends from, the
 * class itself acts as a container for non-VE code to setup
 * a link to the `[class]` host binding (via the static
 * `ɵdir` property on the class).
 *
 * Note that the `ɵdir` property's code is switched
 * depending if VE is present or not (this allows for the
 * binding code to be set only for newer versions of Angular).
 *
 * @publicApi
 */
export class NgClassBase {
  static ɵdir: any = ngClassDirectiveDef;
  static ɵfac: any = ngClassFactoryDef;

  constructor(protected _delegate: NgClassImpl) {}

  getValue() { return this._delegate.getValue(); }
}

/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```
 *     <some-element [ngClass]="'first second'">...</some-element>
 *
 *     <some-element [ngClass]="['first', 'second']">...</some-element>
 *
 *     <some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>
 *
 *     <some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>
 *
 *     <some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>
 * ```
 *
 * @description
 *
 * Adds and removes CSS classes on an HTML element.
 *
 * 从 HTML 元素上添加和移除 CSS 类。
 *
 * The CSS classes are updated as follows, depending on the type of the expression evaluation:
 *
 * CSS 类会根据表达式求值结果进行更新，更新逻辑取决于结果的类型：
 *
 * - `string` - the CSS classes listed in the string (space delimited) are added,
 *
 *   `string` - 会把列在字符串中的 CSS 类（空格分隔）添加进来，
 *
 * - `Array` - the CSS classes declared as Array elements are added,
 *
 *   `Array` - 会把数组中的各个元素作为 CSS 类添加进来，
 *
 * - `Object` - keys are CSS classes that get added when the expression given in the value
 *              evaluates to a truthy value, otherwise they are removed.
 *
 *   `Object` - 每个 key 都是要处理的 CSS 类，当表达式求值为真的时候则添加，为假则移除。
 *
 * @publicApi
 */
@Directive({selector: '[ngClass]', providers: [NgClassImplProvider]})
export class NgClass extends NgClassBase implements DoCheck {
  constructor(delegate: NgClassImpl) { super(delegate); }

  @Input('class')
  set klass(value: string) { this._delegate.setClass(value); }

  @Input('ngClass')
  set ngClass(value: string|string[]|Set<string>|{[klass: string]: any}) {
    this._delegate.setNgClass(value);
  }

  ngDoCheck() { this._delegate.applyChanges(); }
}
