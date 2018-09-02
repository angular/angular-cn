/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AfterViewInit, Directive, EventEmitter, Inject, Input, Optional, Self, forwardRef} from '@angular/core';

import {AbstractControl, FormControl, FormGroup, FormHooks} from '../model';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS} from '../validators';

import {ControlContainer} from './control_container';
import {Form} from './form_interface';
import {NgControl} from './ng_control';
import {NgModel} from './ng_model';
import {NgModelGroup} from './ng_model_group';
import {composeAsyncValidators, composeValidators, removeDir, setUpControl, setUpFormContainer, syncPendingControls} from './shared';

export const formDirectiveProvider: any = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgForm)
};

const resolvedPromise = Promise.resolve(null);

/**
 * @description
 *
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * 创建一个顶级的 `FormGroup` 实例，并把它绑定到一个表单，以跟踪表单的聚合值及其验证状态。
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * 只要你导入了 `FormsModule`，该指令就会默认在所有 `<form>` 标签上生效。你不需要再添加任何特殊的选择器。
 *
 * You can export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * will give you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * 你可以以 `ngForm` 作为 key 把该指令导出到一个局部模板变量（如 `#myForm="ngForm"`）。这是可选的，但很有用。
 * 来自本指令背后的 `FormGroup` 实例的很多属性，都被复制到了指令自身，所以拿到一个对该指令的引用就可以让你访问此表单的聚合值和验证状态，
 * 还有那些用户交互类的属性，比如 `dirty` 和 `touched`。
 *
 * To register child controls with the form, you'll want to use `NgModel` with a
 * `name` attribute.  You can also use `NgModelGroup` if you'd like to create
 * sub-groups within the form.
 *
 * 如果要通过表单注册子控件，你还要使用一个带有 `name` 属性的 `NgModel`。你还可以使用 `NgModelGroup` 在表单中创建子组。
 *
 * You can listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event will be emitted with the original form
 * submission event.
 *
 * 你可以监听该指令的 `ngSubmit` 事件，以便当用户触发了一次表单提交时得到通知。发出 `ngSubmit` 事件时，会携带原始的 DOM 表单提交事件。
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * If you want to import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, you can add `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * 在模板驱动表单中，所有 `<form>` 标签都会自动应用上 `NgForm` 指令。
 * 如果你只想导入 `FormsModule` 而不想把它应用于某些表单中，比如，要想使用 HTML5 验证，你可以添加 `ngNoForm` 属性，
 * 这样标签就不会在 `<form>` 上创建 `NgForm` 指令了。
 * 在响应式表单中，则不需要用 `ngNoForm`，因为 `NgForm` 指令不会自动应用到 `<form>` 标签上，你只要别主动添加 `formGroup` 指令就可以了。
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * * **npm package**: `@angular/forms`
 *
 * * **NgModule**: `FormsModule`
 *
 *
 */
@Directive({
  selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
  providers: [formDirectiveProvider],
  host: {'(submit)': 'onSubmit($event)', '(reset)': 'onReset()'},
  outputs: ['ngSubmit'],
  exportAs: 'ngForm'
})
export class NgForm extends ControlContainer implements Form,
    AfterViewInit {
  public readonly submitted: boolean = false;

  private _directives: NgModel[] = [];

  form: FormGroup;
  ngSubmit = new EventEmitter();

  /**
   * Options for the `NgForm` instance. Accepts the following properties:
   *
   * `NgForm` 实例的选项。接受下列属性：
   *
   * **updateOn**: Serves as the default `updateOn` value for all child `NgModels` below it
   * (unless a child has explicitly set its own value for this in `ngModelOptions`).
   * Potential values: `'change'` | `'blur'` | `'submit'`
   *
   * **updateOn**：为所有子级的 `NgModel` 设置 `updateOn` 的默认值（除非子 `NgModel` 通过 `ngModelOptions` 显式指定了这个值）。
   * 可能的值有：`'change'` | `'blur'` | `'submit'`
   *
   * ```html
   * <form [ngFormOptions]="{updateOn: 'blur'}">
   *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
   * </form>
   * ```
   *
   */
  // TODO(issue/24571): remove '!'.
  @Input('ngFormOptions') options !: {updateOn?: FormHooks};

  constructor(
      @Optional() @Self() @Inject(NG_VALIDATORS) validators: any[],
      @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: any[]) {
    super();
    this.form =
        new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
  }

  ngAfterViewInit() { this._setUpdateStrategy(); }

  get formDirective(): Form { return this; }

  get control(): FormGroup { return this.form; }

  get path(): string[] { return []; }

  get controls(): {[key: string]: AbstractControl} { return this.form.controls; }

  addControl(dir: NgModel): void {
    resolvedPromise.then(() => {
      const container = this._findContainer(dir.path);
      (dir as{control: FormControl}).control =
          <FormControl>container.registerControl(dir.name, dir.control);
      setUpControl(dir.control, dir);
      dir.control.updateValueAndValidity({emitEvent: false});
      this._directives.push(dir);
    });
  }

  getControl(dir: NgModel): FormControl { return <FormControl>this.form.get(dir.path); }

  removeControl(dir: NgModel): void {
    resolvedPromise.then(() => {
      const container = this._findContainer(dir.path);
      if (container) {
        container.removeControl(dir.name);
      }
      removeDir<NgModel>(this._directives, dir);
    });
  }

  addFormGroup(dir: NgModelGroup): void {
    resolvedPromise.then(() => {
      const container = this._findContainer(dir.path);
      const group = new FormGroup({});
      setUpFormContainer(group, dir);
      container.registerControl(dir.name, group);
      group.updateValueAndValidity({emitEvent: false});
    });
  }

  removeFormGroup(dir: NgModelGroup): void {
    resolvedPromise.then(() => {
      const container = this._findContainer(dir.path);
      if (container) {
        container.removeControl(dir.name);
      }
    });
  }

  getFormGroup(dir: NgModelGroup): FormGroup { return <FormGroup>this.form.get(dir.path); }

  updateModel(dir: NgControl, value: any): void {
    resolvedPromise.then(() => {
      const ctrl = <FormControl>this.form.get(dir.path !);
      ctrl.setValue(value);
    });
  }

  setValue(value: {[key: string]: any}): void { this.control.setValue(value); }

  onSubmit($event: Event): boolean {
    (this as{submitted: boolean}).submitted = true;
    syncPendingControls(this.form, this._directives);
    this.ngSubmit.emit($event);
    return false;
  }

  onReset(): void { this.resetForm(); }

  resetForm(value: any = undefined): void {
    this.form.reset(value);
    (this as{submitted: boolean}).submitted = false;
  }

  private _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.form._updateOn = this.options.updateOn;
    }
  }

  /** @internal */
  _findContainer(path: string[]): FormGroup {
    path.pop();
    return path.length ? <FormGroup>this.form.get(path) : this.form;
  }
}
