/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
 * @description
 * The `[ngSwitch]` directive on a container specifies an expression to match against.
 * The expressions to match are provided by `ngSwitchCase` directives on views within the container.
 *
 * 容器上的 `[ngSwitch]` 指令指定要匹配的表达式。匹配的表达式由容器内视图上的 `ngSwitchCase` 指令提供。
 *
 * - Every view that matches is rendered.
 *
 *   如果有匹配项，则渲染匹配的视图。
 *
 * - If there are no matches, a view with the `ngSwitchDefault` directive is rendered.
 *
 *   如果没有匹配项，则渲染 `ngSwitchDefault`
 *
 * - Elements within the `[NgSwitch]` statement but outside of any `NgSwitchCase`
 * or `ngSwitchDefault` directive are preserved at the location.
 *
 *     `[NgSwitch]` 语句内任何除 `NgSwitchCase` 或 `ngSwitchDefault` 指令之外的元素都保留在原位。
 *
 * @usageNotes
 *
 * Define a container element for the directive, and specify the switch expression
 * to match against as an attribute:
 *
 * 为指令定义一个容器元素，并指定要匹配的 switch 表达式作为属性：
 *
 * ```
 * <container-element [ngSwitch]="switch_expression">
 * ```
 *
 * Within the container, `*ngSwitchCase` statements specify the match expressions
 * as attributes. Include `*ngSwitchDefault` as the final case.
 *
 * 在容器内， `*ngSwitchCase` 语句将匹配表达式指定为属性。包括用 `*ngSwitchDefault` 作为最后一种情况。
 *
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *    <some-element *ngSwitchCase="match_expression_1">...</some-element>
 * ...
 *    <some-element *ngSwitchDefault>...</some-element>
 * </container-element>
 * ```
 *
 * ### Usage Examples
 *
 * ### 使用范例
 *
 * The following example shows how to use more than one case to display the same view:
 *
 * 下面的示例演示如何使用多个分支来显示同一视图：
 *
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *   <!-- the same view can be shown in more than one case -->
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *   <some-element *ngSwitchCase="match_expression_2">...</some-element>
 *   <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
 *   <!--default case when there are no matches -->
 *   <some-element *ngSwitchDefault>...</some-element>
 * </container-element>
 * ```
 *
 * The following example shows how cases can be nested:
 *
 * 以下示例演示如何嵌套案例：
 *
 * ```
 * <container-element [ngSwitch]="switch_expression">
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
 *
 * @publicApi
 * @see `NgSwitchCase`
 * @see `NgSwitchDefault`
 * @see [Structural Directives](guide/structural-directives)
 *
 * [结构型指令](guide/structural-directives)
 */
@Directive({selector: '[ngSwitch]'})
export class NgSwitch {
  // TODO(issue/24571): remove '!'.
  private _defaultViews!: SwitchView[];
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
  _addCase(): number {
    return this._caseCount++;
  }

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
 * @description
 * Provides a switch case expression to match against an enclosing `ngSwitch` expression.
 * When the expressions match, the given `NgSwitchCase` template is rendered.
 * If multiple match expressions match the switch expression value, all of them are displayed.
 *
 * 提供一个 switch case 表达式来匹配一个封闭的 `ngSwitch` 表达式。当表达式匹配时，将渲染给定的 `NgSwitchCase` 模板。如果多个匹配表达式与开关表达式值相匹配，则会全部显示。
 *
 * @usageNotes
 *
 * Within a switch container, `*ngSwitchCase` statements specify the match expressions
 * as attributes. Include `*ngSwitchDefault` as the final case.
 *
 * 在开关容器中， `*ngSwitchCase` 语句将匹配表达式指定为属性。包括用 `*ngSwitchDefault` 作为最后一种情况。
 *
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *   ...
 *   <some-element *ngSwitchDefault>...</some-element>
 * </container-element>
 * ```
 *
 * Each switch-case statement contains an in-line HTML template or template reference
 * that defines the subtree to be selected if the value of the match expression
 * matches the value of the switch expression.
 *
 * 每个 switch-case 语句包含一个内联 HTML 模板或模板引用，该模板或模板引用定义了 match 表达式的值与 switch 表达式的值匹配时要选择的子树。
 *
 * Unlike JavaScript, which uses strict equality, Angular uses loose equality.
 * This means that the empty string, `""` matches 0.
 *
 * 与 JavaScript 使用严格相等性的方式不同，Angular 使用宽松相等性。这意味着空字符串 `""` 能匹配 0。
 *
 * @publicApi
 * @see `NgSwitch`
 * @see `NgSwitchDefault`
 *
 */
@Directive({selector: '[ngSwitchCase]'})
export class NgSwitchCase implements DoCheck {
  private _view: SwitchView;
  /**
   * Stores the HTML template to be selected on match.
   *
   * 存储要在匹配时选择的 HTML 模板。
   *
   */
  @Input() ngSwitchCase: any;

  constructor(
      viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>,
      @Host() private ngSwitch: NgSwitch) {
    ngSwitch._addCase();
    this._view = new SwitchView(viewContainer, templateRef);
  }

  /**
   * Performs case matching. For internal use only.
   *
   * 执行大小写匹配。仅限内部使用。
   *
   */
  ngDoCheck() {
    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
  }
}

/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Creates a view that is rendered when no `NgSwitchCase` expressions
 * match the `NgSwitch` expression.
 * This statement should be the final case in an `NgSwitch`.
 *
 * 创建一个当没有任何 `NgSwitchCase` 表达式能匹配 `NgSwitch` 表达时要渲染的视图。该语句应该是 `NgSwitch` 的最后一种情况。
 *
 * @publicApi
 * @see `NgSwitch`
 * @see `NgSwitchCase`
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
