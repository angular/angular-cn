/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, DoCheck, Host, Input, TemplateRef, ViewContainerRef} from '@angular/core';

export class SwitchView {
  private _created = false;

  constructor(
      private _viewContainerRef: ViewContainerRef, private _templateRef: TemplateRef<Object>) {}

  create(): void {
    this._created = true;
    this._viewContainerRef.createEmbeddedView(this._templateRef);
  }

  destroy(): void {
    this._created = false;
    this._viewContainerRef.clear();
  }

  enforceState(created: boolean) {
    if (created && !this._created) {
      this.create();
    } else if (!created && this._created) {
      this.destroy();
    }
  }
}

/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```
 *     <container-element [ngSwitch]="switch_expression">
 *       <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *       <some-element *ngSwitchCase="match_expression_2">...</some-element>
 *       <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
 *       <ng-container *ngSwitchCase="match_expression_3">
 *         <!-- use a ng-container to group multiple root nodes -->
 *         <inner-element></inner-element>
 *         <inner-other-element></inner-other-element>
 *       </ng-container>
 *       <some-element *ngSwitchDefault>...</some-element>
 *     </container-element>
 * ```
 * @description
 *
 * Adds / removes DOM sub-trees when the nest match expressions matches the switch expression.
 *
 * 根据内嵌的 match（匹配）表达式（`match_express_*`）与 switch（多路开关）表达式（`switch_expression`）的匹配结果，添加 / 删除 DOM 子树。
 *
 * `NgSwitch` stamps out nested views when their match expression value matches the value of the
 * switch expression.
 *
 * 当 `match` 表达式的值与 `switch` 表达式的值匹配时 `NgSwitch` 就会将其内嵌的视图 "印" 出来。
 *
 * In other words:
 *
 * 换句话说：
 *
 * - you define a container element (where you place the directive with a switch expression on the
 * `[ngSwitch]="..."` attribute)
 *
 *   你定义了一个容器元素（也就是你通过 `[ngSwitch]="..."` 属性来放置 `switch` 表达式的那个元素。
 *
 * - you define inner views inside the `NgSwitch` and place a `*ngSwitchCase` attribute on the view
 * root elements.
 *
 *   你在 `NgSwitch` 中定义了内嵌视图，并把 `*ngSwitchCase` 属性放在了视图的根元素上。
 *
 * Elements within `NgSwitch` but outside of a `NgSwitchCase` or `NgSwitchDefault` directives will
 * be preserved at the location.
 *
 * `NgSwitch` 中位于 `NgSwitchCase` 或 `NgSwitchDefault` 指令之外的那些元素会保留在原地。
 *
 * The `ngSwitchCase` directive informs the parent `NgSwitch` of which view to display when the
 * expression is evaluated.
 * When no matching expression is found on a `ngSwitchCase` view, the `ngSwitchDefault` view is
 * stamped out.
 *
 *
 * 在表达式求值完成之后，`ngSwitchCase` 指令会告诉付指令 `NgSwitch` 要显示哪个视图。
 * 如果 `ngSwitchCase` 中没有找到匹配的表达式，就会显示 `ngSwitchDefault` 视图。
 *
 */
@Directive({selector: '[ngSwitch]'})
export class NgSwitch {
  // TODO(issue/24571): remove '!'.
  private _defaultViews !: SwitchView[];
  private _defaultUsed = false;
  private _caseCount = 0;
  private _lastCaseCheckIndex = 0;
  private _lastCasesMatched = false;
  private _ngSwitch: any;

  @Input()
  set ngSwitch(newValue: any) {
    this._ngSwitch = newValue;
    if (this._caseCount === 0) {
      this._updateDefaultCases(true);
    }
  }

  /** @internal */
  _addCase(): number { return this._caseCount++; }

  /** @internal */
  _addDefault(view: SwitchView) {
    if (!this._defaultViews) {
      this._defaultViews = [];
    }
    this._defaultViews.push(view);
  }

  /** @internal */
  _matchCase(value: any): boolean {
    const matched = value == this._ngSwitch;
    this._lastCasesMatched = this._lastCasesMatched || matched;
    this._lastCaseCheckIndex++;
    if (this._lastCaseCheckIndex === this._caseCount) {
      this._updateDefaultCases(!this._lastCasesMatched);
      this._lastCaseCheckIndex = 0;
      this._lastCasesMatched = false;
    }
    return matched;
  }

  private _updateDefaultCases(useDefault: boolean) {
    if (this._defaultViews && useDefault !== this._defaultUsed) {
      this._defaultUsed = useDefault;
      for (let i = 0; i < this._defaultViews.length; i++) {
        const defaultView = this._defaultViews[i];
        defaultView.enforceState(useDefault);
      }
    }
  }
}

/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 * </container-element>
 *```
 * @description
 *
 * Creates a view that will be added/removed from the parent {@link NgSwitch} when the
 * given expression evaluate to respectively the same/different value as the switch
 * expression.
 *
 * 如果指定的表达式的计算结果和 `switch` 表达式相同，就会在父指令 {@link NgSwitch} 中创建一个视图；如果不同，则移除。
 *
 * Insert the sub-tree when the expression evaluates to the same value as the enclosing switch
 * expression.
 *
 * 当表达式求值的结果与 `switch` 表达式相同，则插入该子树。
 *
 * If multiple match expressions match the switch expression value, all of them are displayed.
 *
 * 如果多个 `match` 表达式都与 `switch` 表达式的结果相匹配，就全都显示它们。
 *
 * See {@link NgSwitch} for more details and example.
 *
 * 参见 {@link NgSwitch} 了解详情并查看例子。
 */
@Directive({selector: '[ngSwitchCase]'})
export class NgSwitchCase implements DoCheck {
  private _view: SwitchView;

  @Input()
  ngSwitchCase: any;

  constructor(
      viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>,
      @Host() private ngSwitch: NgSwitch) {
    ngSwitch._addCase();
    this._view = new SwitchView(viewContainer, templateRef);
  }

  ngDoCheck() { this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase)); }
}

/**
 * @ngModule CommonModule
 * @usageNotes
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *   <some-other-element *ngSwitchDefault>...</some-other-element>
 * </container-element>
 * ```
 *
 * @description
 *
 * Creates a view that is added to the parent {@link NgSwitch} when no case expressions
 * match the switch expression.
 *
 * 当没有任何 `case` 表达式匹配 `switch` 表达式的结果时，就会在父指令 {@link NgSwitch} 中创建一个视图。
 *
 * Insert the sub-tree when no case expressions evaluate to the same value as the enclosing switch
 * expression.
 *
 * 当没有任何一个 `case` 表达式与 `switch` 表达式的求值结果相同时，则插入该子树。
 *
 * See {@link NgSwitch} for more details and example.
 *
 * 参见 {@link NgSwitch} 了解详情并查看例子。
 *
 */
@Directive({selector: '[ngSwitchDefault]'})
export class NgSwitchDefault {
  constructor(
      viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>,
      @Host() ngSwitch: NgSwitch) {
    ngSwitch._addDefault(new SwitchView(viewContainer, templateRef));
  }
}
