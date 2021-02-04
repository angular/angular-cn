/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef, ɵstringify as stringify} from '@angular/core';


/**
 * A structural directive that conditionally includes a template based on the value of
 * an expression coerced to Boolean.
 * When the expression evaluates to true, Angular renders the template
 * provided in a `then` clause, and when  false or null,
 * Angular renders the template provided in an optional `else` clause. The default
 * template for the `else` clause is blank.
 *
 * 本结构型指令用于根据表达式的值（强转为 boolean）是否为真值，来有条件的包含某个模板。当表达式计算为 true 时，Angular 会渲染 `then` 子句中提供的模板，当为 false 或 null 时则渲染可选的 `else` 子句中的模板。`else` 子句的默认模板是空白模板。
 *
 * A [shorthand form](guide/structural-directives#the-asterisk--prefix) of the directive,
 * `*ngIf="condition"`, is generally used, provided
 * as an attribute of the anchor element for the inserted template.
 * Angular expands this into a more explicit version, in which the anchor element
 * is contained in an `<ng-template>` element.
 *
 * 通常使用指令的[简写形式](guide/structural-directives#the-asterisk--prefix) `*ngIf="condition"`，作为插入模板的锚点元素的属性提供。Angular 将其扩展为更明确的版本，其中锚点元素包含在 `<ng-template>` 元素中。
 *
 * Simple form with shorthand syntax:
 *
 * 具有简写语法的简单形式：
 *
 * ```
 * <div *ngIf="condition">Content to render when condition is true.</div>
 * ```
 *
 * Simple form with expanded syntax:
 *
 * 具有扩展语法的简单形式：
 *
 * ```
 * <ng-template [ngIf]="condition"><div>Content to render when condition is
 * true.</div></ng-template>
 * ```
 *
 * Form with an "else" block:
 *
 * 带有 “else” 块的格式：
 *
 * ```
 * <div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>
 * <ng-template #elseBlock>Content to render when condition is false.</ng-template>
 * ```
 *
 * Shorthand form with "then" and "else" blocks:
 *
 * 带 “then” 和 “else” 块的简写形式：
 *
 * ```
 * <div *ngIf="condition; then thenBlock else elseBlock"></div>
 * <ng-template #thenBlock>Content to render when condition is true.</ng-template>
 * <ng-template #elseBlock>Content to render when condition is false.</ng-template>
 * ```
 *
 * Form with storing the value locally:
 *
 * 本地存储值的形式：
 *
 * ```
 * <div *ngIf="condition as value; else elseBlock">{{value}}</div>
 * <ng-template #elseBlock>Content to render when value is null.</ng-template>
 * ```
 *
 * @usageNotes
 *
 * The `*ngIf` directive is most commonly used to conditionally show an inline template,
 * as seen in the following  example.
 * The default `else` template is blank.
 *
 * `*ngIf` 指令通常用于根据条件显示内联模板，就像下面的例子展示的一样。默认的 `else` 模板是空白的。
 *
 * {@example common/ngIf/ts/module.ts region='NgIfSimple'}
 *
 * ### Showing an alternative template using `else`
 *
 * ### 使用 `else` 显示替代模板
 *
 * To display a template when `expression` evaluates to false, use an `else` template
 * binding as shown in the following example.
 * The `else` binding points to an `<ng-template>`  element labeled `#elseBlock`.
 * The template can be defined anywhere in the component view, but is typically placed right after
 * `ngIf` for readability.
 *
 * 要在 `expression` 计算为 false 时显示一个模板，请使用如下所示的 `else` 模板绑定。`else` 绑定指向一个带有 `#elseBlock` 标签的 `<ng-template>`。该模板可以定义在组件视图中的任何地方，但通常放在 `ngIf` 的紧后方，以提高可读性。
 *
 * {@example common/ngIf/ts/module.ts region='NgIfElse'}
 *
 * ### Using an external `then` template
 *
 * ### 使用内部 `then` 模板
 *
 * In the previous example, the then-clause template is specified inline, as the content of the
 * tag that contains the `ngIf` directive. You can also specify a template that is defined
 * externally, by referencing a labeled `<ng-template>` element. When you do this, you can
 * change which template to use at runtime, as shown in the following example.
 *
 * 在前面的例子中，then 子句的模板是内联的，也就是作为 `ngIf` 指令所在标签的内容。你还可以通过引用一个带标签的 `<ng-template>` 元素来指定一个在外部定义的模板。这样就可以让你在运行时更改模板，就像下面的例子所演示的。
 *
 * {@example common/ngIf/ts/module.ts region='NgIfThenElse'}
 *
 * ### Storing a conditional result in a variable
 *
 * ### 把条件结果保存在变量中
 *
 * You might want to show a set of properties from the same object. If you are waiting
 * for asynchronous data, the object can be undefined.
 * In this case, you can use `ngIf` and store the result of the condition in a local
 * variable as shown in the the following example.
 *
 * 比如你想显示同一个对象中的一组属性。如果你在等待异步数据，此对象可能是未定义的。这时候，你可以使用 `ngIf`，并且把此条件结果保存在一个局部变量中，如下例所示。
 *
 * {@example common/ngIf/ts/module.ts region='NgIfAs'}
 *
 * This code uses only one `AsyncPipe`, so only one subscription is created.
 * The conditional statement stores the result of `userStream|async` in the local variable `user`.
 * You can then bind the local `user` repeatedly.
 *
 * 这段代码只使用了一个 `AsyncPipe`，所以只会创建一个订阅。此条件表达式把 `userStream|async` 的结果保存在局部变量 `user` 中。然后你就可以反复绑定这个局部变量 `user` 了。
 *
 * The conditional displays the data only if `userStream` returns a value,
 * so you don't need to use the
 * safe-navigation-operator (`?.`)
 * to guard against null values when accessing properties.
 * You can display an alternative template while waiting for the data.
 *
 * 只有当 `userStream` 返回了值的时候，才会有条件的显示此数据。所以你不用使用安全导航操作符 (`?.`) 来在访问属性时避免空值。你可以在等待数据时显示一个备用模板。
 *
 * ### Shorthand syntax
 *
 * ### 简写语法
 *
 * The shorthand syntax `*ngIf` expands into two separate template specifications
 * for the "then" and "else" clauses. For example, consider the following shorthand statement,
 * that is meant to show a loading page while waiting for data to be loaded.
 *
 * `*ngIf` 的简写语法会把 "then" 和 "else" 子句分别扩展成两个独立的模板。比如，考虑下列简写语句，它要在等待数据加载期间显示一个加载中页面。
 *
 * ```
 * <div class="hero-list" *ngIf="heroes else loading">
 *  ...
 * </div>
 *
 * <ng-template #loading>
 *  <div>Loading...</div>
 * </ng-template>
 * ```
 *
 * You can see that the "else" clause references the `<ng-template>`
 * with the `#loading` label, and the template for the "then" clause
 * is provided as the content of the anchor element.
 *
 * 你可以看到，"else" 子句引用了带有 `#loading` 标签的 `<ng-template>`，而 "then" 子句的模板是作为宿主元素的内容提供的。
 *
 * However, when Angular expands the shorthand syntax, it creates
 * another `<ng-template>` tag, with `ngIf` and `ngIfElse` directives.
 * The anchor element containing the template for the "then" clause becomes
 * the content of this unlabeled `<ng-template>` tag.
 *
 * 不过，当 Angular 扩展此简写语法的时候，它创建了另一个带有 `ngIf` 和 `ngIfElse` 指令的 `<ng-template>`。此宿主元素包含的 "then" 子句的模板变成了无标签的  `<ng-template>` 的内容。
 *
 * ```
 * <ng-template [ngIf]="heroes" [ngIfElse]="loading">
 *  <div class="hero-list">
 *   ...
 *  </div>
 * </ng-template>
 *
 * <ng-template #loading>
 *  <div>Loading...</div>
 * </ng-template>
 * ```
 *
 * The presence of the implicit template object has implications for the nesting of
 * structural directives. For more on this subject, see
 * [Structural Directives](https://angular.io/guide/structural-directives#one-per-element).
 *
 *  隐式模板对象的存在，影响了结构型指令的嵌套规则。欲知详情，参见[结构型指令](https://angular.io/guide/structural-directives#one-per-element)。
 * @ngModule CommonModule
 * @publicApi
 */
@Directive({selector: '[ngIf]'})
export class NgIf<T = unknown> {
  private _context: NgIfContext<T> = new NgIfContext<T>();
  private _thenTemplateRef: TemplateRef<NgIfContext<T>>|null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext<T>>|null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<T>>|null = null;
  private _elseViewRef: EmbeddedViewRef<NgIfContext<T>>|null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<NgIfContext<T>>) {
    this._thenTemplateRef = templateRef;
  }

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   *
   * 布尔表达式，将其作为显示模板的条件进行计算。
   *
   */
  @Input()
  set ngIf(condition: T) {
    this._context.$implicit = this._context.ngIf = condition;
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to true.
   *
   * 当此条件表达式计算为 true 时要显示的模板。
   *
   */
  @Input()
  set ngIfThen(templateRef: TemplateRef<NgIfContext<T>>|null) {
    assertTemplate('ngIfThen', templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   *
   * 当此条件表达式计算为 false 时要显示的模板。
   *
   */
  @Input()
  set ngIfElse(templateRef: TemplateRef<NgIfContext<T>>|null) {
    assertTemplate('ngIfElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef =
              this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef =
              this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
        }
      }
    }
  }

  /** @internal */
  public static ngIfUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `ngIf` input within the template.
   *
   * 为绑定到 `ngIf` 输入属性上的模板确保正确的类型。
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgIf` structural directive renders its template, the type of the expression bound
   * to `ngIf` should be narrowed in some way. For `NgIf`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgIf`.
   *
   * 该静态字段的存在向 Ivy 模板类型检查编译器发出信号，即当 `NgIf` 结构化指令渲染其模板时，应以某种方式窄化 `ngIf`。对于 `NgIf`，绑定表达式本身用于窄化其类型，这允许 TypeScript 的 strictNullChecks 功能与 `NgIf` 一起使用。
   *
   */
  static ngTemplateGuard_ngIf: 'binding';

  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * 为 `NgIf` 将要渲染的模板确保正确的上下文类型。
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   *
   * 该方法用于向 Ivy 模板类型检查编译器发出信号，即 `NgIf` 结构化指令会使用特定的上下文类型渲染其模板。
   *
   */
  static ngTemplateContextGuard<T>(dir: NgIf<T>, ctx: any):
      ctx is NgIfContext<Exclude<T, false|0|''|null|undefined>> {
    return true;
  }
}

/**
 * @publicApi
 */
export class NgIfContext<T = unknown> {
  public $implicit: T = null!;
  public ngIf: T = null!;
}

function assertTemplate(property: string, templateRef: TemplateRef<any>|null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
