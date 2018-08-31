/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef, ɵstringify as stringify} from '@angular/core';


/**
 * Conditionally includes a template based on the value of an `expression`.
 *
 * 根据 `expression` 表达式的值，有条件的包含某个模板。
 *
 * `ngIf` evaluates the `expression` and then renders the `then` or `else` template in its place
 * when expression is truthy or falsy respectively. Typically the:
 *
 * `ngIf` 会对 `expression` 进行求值，如果为真，则在原地渲染 `then` 模板，否则渲染 `else` 模板。通常：
 *
 *  - `then` template is the inline template of `ngIf` unless bound to a different value.
 *
 *    `then` 模板就是 `ngIf` 中内联的模板 —— 除非你指定了另一个值。
 *
 *  - `else` template is blank unless it is bound.
 *
 *    `else` 模板是空白的 —— 除非你另行指定了。
 *
 * ## Most common usage
 *
 * ## 常见用法
 *
 * The most common usage of the `ngIf` directive is to conditionally show the inline template as
 * seen in this example:
 *
 * `ngIf` 指令最常见的用法是根据条件显示其内联模板，比如：
 *
 * {@example common/ngIf/ts/module.ts region='NgIfSimple'}
 *
 * ## Showing an alternative template using `else`
 *
 * ## 通过 `else` 显示另一个模板
 *
 * If it is necessary to display a template when the `expression` is falsy use the `else` template
 * binding as shown. Note that the `else` binding points to a `<ng-template>` labeled `#elseBlock`.
 * The template can be defined anywhere in the component view but is typically placed right after
 * `ngIf` for readability.
 *
 * 如果 `expression` 为假时有必要显示一个模板，就可以用上述的 `else` 模板来进行绑定。
 * 注意，`else` 绑定指向的是一个带有 `#elseBlock` 标签的 `<ng-template>` 元素。
 * 该模板可以定义在此组件视图中的任何地方，但为了提高可读性，通常会放在 `ngIf` 的紧下方。
 *
 * {@example common/ngIf/ts/module.ts region='NgIfElse'}
 *
 * ## Using non-inlined `then` template
 *
 * ## 使用非内联的 `then` 模板
 *
 * Usually the `then` template is the inlined template of the `ngIf`, but it can be changed using
 * a binding (just like `else`). Because `then` and `else` are bindings, the template references can
 * change at runtime as shown in this example.
 *
 * 通常，`then` 模板就是 `ngIf` 的内联模板，不过你也可以通过绑定机制（就像 `else` 那样）来修改它。
 * 因为 `then` 和 `else` 都是绑定，因此可以在运行期间改变这个模板引用 —— 如下例所示。
 *
 * {@example common/ngIf/ts/module.ts region='NgIfThenElse'}
 *
 * ## Storing conditional result in a variable
 *
 * ## 把条件结果保存在变量中
 *
 * A common pattern is that we need to show a set of properties from the same object. If the
 * object is undefined, then we have to use the safe-traversal-operator `?.` to guard against
 * dereferencing a `null` value. This is especially the case when waiting on async data such as
 * when using the `async` pipe as shown in following example:
 *
 * 一种常见的需求模式为：我们要显示来自同一个对象的一组属性。如果该对象是 undefined，那么我们就不得不使用安全遍历操作符 `?.` 来防止引用到空对象。
 * 尤其是在使用 `async` 管道等待异步数据时，例如：
 *
 * ```
 * Hello {{ (userStream|async)?.last }}, {{ (userStream|async)?.first }}!
 * ```
 *
 * There are several inefficiencies in the above example:
 *
 * 上面这个例子中有一系列低效代码：
 *
 *  - We create multiple subscriptions on `userStream`. One for each `async` pipe, or two in the
 *    example above.
 *
 *    我们在 `userStream` 上创建了多个订阅。每个 `async` 管道都有一个，比如上面这个例子中就用了两个。
 *
 *  - We cannot display an alternative screen while waiting for the data to arrive asynchronously.
 *
 *    在等待异步数据到来的时候，我们没法显示一个备用视图（如 loading）。
 *
 *  - We have to use the safe-traversal-operator `?.` to access properties, which is cumbersome.
 *
 *    我们不得不使用安全遍历操作符 `?.` 来访问属性，太繁琐了。
 *
 *  - We have to place the `async` pipe in parenthesis.
 *
 *    我们不得不把 `async` 管道放进圆括号里。
 *
 * A better way to do this is to use `ngIf` and store the result of the condition in a local
 * variable as shown in the the example below:
 *
 * 更好的方式是使用 `ngIf`，并把该条件的结果存到局部变量里，例如：
 *
 * {@example common/ngIf/ts/module.ts region='NgIfAs'}
 *
 * Notice that:
 *
 * 注意：
 *
 *  - We use only one `async` pipe and hence only one subscription gets created.
 *
 *    我们只用了一个 `async` 管道，因此也只会进行一次订阅。
 *
 *  - `ngIf` stores the result of the `userStream|async` in the local variable `user`.
 *
 *    `ngIf` 把 `userStream|async` 的结果保存在了局部变量 `user` 中。
 *
 *  - The local `user` can then be bound repeatedly in a more efficient way.
 *
 *    局部变量 `user` 可以反复绑定 —— 这很高效。
 *
 *  - No need to use the safe-traversal-operator `?.` to access properties as `ngIf` will only
 *    display the data if `userStream` returns a value.
 *
 *    不需要使用安全遍历操作符 `?.` 来访问属性，因为 `ngIf` 只有在 `userStream` 有数据时才会显示内容。
 *
 *  - We can display an alternative template while waiting for the data.
 *
 *    在等待数据到达时，我们可以显示一个代用模板。
 *
 * ### Syntax
 *
 * ### 语法
 *
 * Simple form:
 *
 * 简单形式：
 *
 * - `<div *ngIf="condition">...</div>`
 * - `<ng-template [ngIf]="condition"><div>...</div></ng-template>`
 *
 * Form with an else block:
 *
 * 带有 `else` 块的形式：
 *
 * ```
 * <div *ngIf="condition; else elseBlock">...</div>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * Form with a `then` and `else` block:
 *
 * 带有 `then` 和 `else` 块的形式：
 *
 * ```
 * <div *ngIf="condition; then thenBlock else elseBlock"></div>
 * <ng-template #thenBlock>...</ng-template>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * Form with storing the value locally:
 *
 * 保存到局部变量的形式：
 *
 * ```
 * <div *ngIf="condition as value; else elseBlock">{{value}}</div>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 *
 */
@Directive({selector: '[ngIf]'})
export class NgIf {
  private _context: NgIfContext = new NgIfContext();
  private _thenTemplateRef: TemplateRef<NgIfContext>|null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext>|null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext>|null = null;
  private _elseViewRef: EmbeddedViewRef<NgIfContext>|null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<NgIfContext>) {
    this._thenTemplateRef = templateRef;
  }

  @Input()
  set ngIf(condition: any) {
    this._context.$implicit = this._context.ngIf = condition;
    this._updateView();
  }

  @Input()
  set ngIfThen(templateRef: TemplateRef<NgIfContext>|null) {
    assertTemplate('ngIfThen', templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  @Input()
  set ngIfElse(templateRef: TemplateRef<NgIfContext>|null) {
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
}

export class NgIfContext {
  public $implicit: any = null;
  public ngIf: any = null;
}

function assertTemplate(property: string, templateRef: TemplateRef<any>| null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
