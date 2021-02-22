/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Attribute, Directive, Host, Input, TemplateRef, ViewContainerRef} from '@angular/core';

import {getPluralCategory, NgLocalization} from '../i18n/localization';

import {SwitchView} from './ng_switch';


/**
 * @ngModule CommonModule
 *
 * @usageNotes
 *
 * ```
 * <some-element [ngPlural]="value">
 *   <ng-template ngPluralCase="=0">there is nothing</ng-template>
 *   <ng-template ngPluralCase="=1">there is one</ng-template>
 *   <ng-template ngPluralCase="few">there are a few</ng-template>
 * </some-element>
 * ```
 *
 * @description
 *
 * Adds / removes DOM sub-trees based on a numeric value. Tailored for pluralization.
 *
 * 根据数字值添加/删除 DOM 子树。为支持复数词量身定制。
 *
 * Displays DOM sub-trees that match the switch expression value, or failing that, DOM sub-trees
 * that match the switch expression's pluralization category.
 *
 * 显示与开关表达式值匹配的 DOM 子树，否则显示与开关表达式的复数类别匹配的 DOM 子树。
 *
 * To use this directive you must provide a container element that sets the `[ngPlural]` attribute
 * to a switch expression. Inner elements with a `[ngPluralCase]` will display based on their
 * expression:
 *
 * 要使用此指令，必须提供一个容器元素，该元素将 `[ngPlural]` 属性设置为 switch 表达式。 `[ngPluralCase]` 内部元素将根据其表达式显示：
 *
 * - if `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
 *   matches the switch expression exactly,
 *
 *   如果 `[ngPluralCase]` 设置为以 `=` 开头的值，则仅在该值与 switch 表达式完全匹配时才会显示，
 *
 * - otherwise, the view will be treated as a "category match", and will only display if exact
 *   value matches aren't found and the value maps to its category for the defined locale.
 *
 *   否则，该视图将被视为“类别匹配”，并且仅在未找到精确值匹配且该值映射到已定义语言环境的类别时才会显示。
 *
 * See http://cldr.unicode.org/index/cldr-spec/plural-rules
 *
 * 参见 <http://cldr.unicode.org/index/cldr-spec/plural-rules>
 *
 * @publicApi
 */
@Directive({selector: '[ngPlural]'})
export class NgPlural {
  // TODO(issue/24571): remove '!'.
  private _switchValue!: number;
  // TODO(issue/24571): remove '!'.
  private _activeView!: SwitchView;
  private _caseViews: {[k: string]: SwitchView} = {};

  constructor(private _localization: NgLocalization) {}

  @Input()
  set ngPlural(value: number) {
    this._switchValue = value;
    this._updateView();
  }

  addCase(value: string, switchView: SwitchView): void {
    this._caseViews[value] = switchView;
  }

  private _updateView(): void {
    this._clearViews();

    const cases = Object.keys(this._caseViews);
    const key = getPluralCategory(this._switchValue, cases, this._localization);
    this._activateView(this._caseViews[key]);
  }

  private _clearViews() {
    if (this._activeView) this._activeView.destroy();
  }

  private _activateView(view: SwitchView) {
    if (view) {
      this._activeView = view;
      this._activeView.create();
    }
  }
}

/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Creates a view that will be added/removed from the parent {@link NgPlural} when the
 * given expression matches the plural expression according to CLDR rules.
 *
 * 创建一个视图，当给定表达式根据 CLDR 规则与复数表达式匹配时，将在父视图 {@link NgPlural} 中添加/删除该视图。
 *
 * @usageNotes
 *
 * ```
 * <some-element [ngPlural]="value">
 *   <ng-template ngPluralCase="=0">...</ng-template>
 *   <ng-template ngPluralCase="other">...</ng-template>
 * </some-element>
 *```
 *
 * See {@link NgPlural} for more details and example.
 *
 * 参见 {@link NgPlural} 以了解详情和范例。
 *
 * @publicApi
 */
@Directive({selector: '[ngPluralCase]'})
export class NgPluralCase {
  constructor(
      @Attribute('ngPluralCase') public value: string, template: TemplateRef<Object>,
      viewContainer: ViewContainerRef, @Host() ngPlural: NgPlural) {
    const isANumber: boolean = !isNaN(Number(value));
    ngPlural.addCase(isANumber ? `=${value}` : value, new SwitchView(viewContainer, template));
  }
}
