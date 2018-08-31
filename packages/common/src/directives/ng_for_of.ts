/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef, Directive, DoCheck, EmbeddedViewRef, Input, IterableChangeRecord, IterableChanges, IterableDiffer, IterableDiffers, NgIterable, TemplateRef, TrackByFunction, ViewContainerRef, forwardRef, isDevMode} from '@angular/core';

export class NgForOfContext<T> {
  constructor(
      public $implicit: T, public ngForOf: NgIterable<T>, public index: number,
      public count: number) {}

  get first(): boolean { return this.index === 0; }

  get last(): boolean { return this.index === this.count - 1; }

  get even(): boolean { return this.index % 2 === 0; }

  get odd(): boolean { return !this.even; }
}

/**
 * The `NgForOf` directive instantiates a template once per item from an iterable. The context
 * for each instantiated template inherits from the outer context with the given loop variable
 * set to the current item from the iterable.
 *
 * `NgForOf` 指令会为可迭代对象中的每一个条目实例化一个模板。实例化时的上下文环境来自其外部环境，它以当前正在迭代的条目作为循环变量。
 *
 * ### Local Variables
 *
 * ### 局部变量
 *
 * `NgForOf` provides several exported values that can be aliased to local variables:
 *
 * `NgForOf` 导出了一系列值，可以指定别名后作为局部变量使用：
 *
 * - `$implicit: T`: The value of the individual items in the iterable (`ngForOf`).
 *
 *   `$implicit: T`：迭代目标（绑定到`ngForOf`）中每个条目的值。
 *
 * - `ngForOf: NgIterable<T>`: The value of the iterable expression. Useful when the expression is
 * more complex then a property access, for example when using the async pipe (`userStreams |
 * async`).
 *
 *   `ngForOf: NgIterable<T>`：迭代表达式的值。当表达式不局限于访问某个属性时，这会非常有用，比如在使用 `async` 管道时（`userStreams |
 * async`）。
 *
 * - `index: number`: The index of the current item in the iterable.
 *
 *   `index: number`：可迭代对象中当前条目的索引。
 *
 * - `first: boolean`: True when the item is the first item in the iterable.
 *
 *   `first: boolean`：如果当前条目是可迭代对象中的第一个条目则为 `true`。
 *
 * - `last: boolean`: True when the item is the last item in the iterable.
 *
 *   `last: boolean`：如果当前条目是可迭代对象中的最后一个条目则为 `true`。
 *
 * - `even: boolean`: True when the item has an even index in the iterable.
 *
 *   `even: boolean`：如果当前条目在可迭代对象中的索引号为偶数则为 `true`。
 *
 * - `odd: boolean`: True when the item has an odd index in the iterable.
 *
 *   `odd: boolean`：如果当前条目在可迭代对象中的索引号为奇数则为 `true`。
 *
 * ```
 * <li *ngFor="let user of userObservable | async as users; index as i; first as isFirst">
 *    {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
 * </li>
 * ```
 *
 * ### Change Propagation
 *
 * ### 变更的传导机制
 *
 * When the contents of the iterator changes, `NgForOf` makes the corresponding changes to the DOM:
 *
 * 当迭代器的内容变化时，`NgForOf` 会对 DOM 做出相应的修改：
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 *
 *   当新增条目时，就会往 DOM 中添加一个模板实例。
 *
 * * When an item is removed, its template instance is removed from the DOM.
 *
 *   当移除条目时，其对应的模板实例也会被从 DOM 中移除。
 *
 * * When items are reordered, their respective templates are reordered in the DOM.
 *
 *   当条目集被重新排序时，他们对应的模板实例也会在 DOM 中重新排序。
 *
 * * Otherwise, the DOM element for that item will remain the same.
 *
 *   否则，条目对应的 DOM 元素就会保持不变。
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls (such as `<input>` elements which accept user input) that are present. Inserted rows can
 * be animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state
 * such as user input.
 *
 * Angular 使用对象标识符（对象引用）来跟踪迭代器中的添加和删除操作，并把它们同步到 DOM 中。
 * 这对于动画和有状态的控件（如用来接收用户输入的 `<input>` 元素）具有重要意义。添加的行可以带着动画效果进来，删除的行也可以带着动画效果离开。
 * 而未变化的行则会保留那些尚未保存的状态，比如用户的输入。
 *
 * It is possible for the identities of elements in the iterator to change while the data does not.
 * This can happen, for example, if the iterator produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
 * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted). This is an expensive operation and should
 * be avoided if possible.
 *
 * 即使数据没有变化，迭代器中的元素标识符也可能会发生变化。比如，如果迭代器处理的目标是通过 RPC 从服务器取来的，
 * 而 RPC 又重新执行了一次。那么即使数据没有变化，第二次的响应体还是会生成一些具有不同标识符的对象。Angular 将会清除整个 DOM，
 * 并重建它（就仿佛把所有老的元素都删除，并插入所有新元素）。这是很昂贵的操作，应该尽力避免。
 *
 * To customize the default tracking algorithm, `NgForOf` supports `trackBy` option.
 * `trackBy` takes a function which has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * 要想自定义默认的跟踪算法，`NgForOf` 支持 `trackBy` 选项。
 * `trackBy` 接受一个带两个参数（`index` 和 `item`）的函数。
 * 如果给出了 `trackBy`，Angular 就会使用该函数的返回值来跟踪变化。
 *
 * ### Syntax
 *
 * ### 语法
 *
 * - `<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>`
 *
 * With `<ng-template>` element:
 *
 * 具有一个 `<ng-template>` 元素：
 *
 * ```
 * <ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
 *   <li>...</li>
 * </ng-template>
 * ```
 *
 * ### Example
 *
 * ### 范例
 *
 * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
 * example.
 *
 * 参见[在线例子](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview)了解详情。
 *
 */
@Directive({selector: '[ngFor][ngForOf]'})
export class NgForOf<T> implements DoCheck {
  @Input()
  set ngForOf(ngForOf: NgIterable<T>) {
    this._ngForOf = ngForOf;
    this._ngForOfDirty = true;
  }
  @Input()
  set ngForTrackBy(fn: TrackByFunction<T>) {
    if (isDevMode() && fn != null && typeof fn !== 'function') {
      // TODO(vicb): use a log service once there is a public one available
      if (<any>console && <any>console.warn) {
        console.warn(
            `trackBy must be a function, but received ${JSON.stringify(fn)}. ` +
            `See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.`);
      }
    }
    this._trackByFn = fn;
  }

  get ngForTrackBy(): TrackByFunction<T> { return this._trackByFn; }

  // TODO(issue/24571): remove '!'.
  private _ngForOf !: NgIterable<T>;
  private _ngForOfDirty: boolean = true;
  private _differ: IterableDiffer<T>|null = null;
  // TODO(issue/24571): remove '!'.
  private _trackByFn !: TrackByFunction<T>;

  constructor(
      private _viewContainer: ViewContainerRef, private _template: TemplateRef<NgForOfContext<T>>,
      private _differs: IterableDiffers) {}

  @Input()
  set ngForTemplate(value: TemplateRef<NgForOfContext<T>>) {
    // TODO(TS2.1): make TemplateRef<Partial<NgForRowOf<T>>> once we move to TS v2.1
    // The current type is too restrictive; a template that just uses index, for example,
    // should be acceptable.
    if (value) {
      this._template = value;
    }
  }

  ngDoCheck(): void {
    if (this._ngForOfDirty) {
      this._ngForOfDirty = false;
      // React on ngForOf changes only once all inputs have been initialized
      const value = this._ngForOf;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this.ngForTrackBy);
        } catch (e) {
          throw new Error(
              `Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(value)}'. NgFor only supports binding to Iterables such as Arrays.`);
        }
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._ngForOf);
      if (changes) this._applyChanges(changes);
    }
  }

  private _applyChanges(changes: IterableChanges<T>) {
    const insertTuples: RecordViewTuple<T>[] = [];
    changes.forEachOperation(
        (item: IterableChangeRecord<any>, adjustedPreviousIndex: number, currentIndex: number) => {
          if (item.previousIndex == null) {
            const view = this._viewContainer.createEmbeddedView(
                this._template, new NgForOfContext<T>(null !, this._ngForOf, -1, -1), currentIndex);
            const tuple = new RecordViewTuple<T>(item, view);
            insertTuples.push(tuple);
          } else if (currentIndex == null) {
            this._viewContainer.remove(adjustedPreviousIndex);
          } else {
            const view = this._viewContainer.get(adjustedPreviousIndex) !;
            this._viewContainer.move(view, currentIndex);
            const tuple = new RecordViewTuple(item, <EmbeddedViewRef<NgForOfContext<T>>>view);
            insertTuples.push(tuple);
          }
        });

    for (let i = 0; i < insertTuples.length; i++) {
      this._perViewChange(insertTuples[i].view, insertTuples[i].record);
    }

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<NgForOfContext<T>>>this._viewContainer.get(i);
      viewRef.context.index = i;
      viewRef.context.count = ilen;
      viewRef.context.ngForOf = this._ngForOf;
    }

    changes.forEachIdentityChange((record: any) => {
      const viewRef =
          <EmbeddedViewRef<NgForOfContext<T>>>this._viewContainer.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
    });
  }

  private _perViewChange(
      view: EmbeddedViewRef<NgForOfContext<T>>, record: IterableChangeRecord<any>) {
    view.context.$implicit = record.item;
  }
}

class RecordViewTuple<T> {
  constructor(public record: any, public view: EmbeddedViewRef<NgForOfContext<T>>) {}
}

export function getTypeNameForDebugging(type: any): string {
  return type['name'] || typeof type;
}
