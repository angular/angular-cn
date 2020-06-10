/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {composeAsyncValidators, composeValidators} from './directives/shared';
import {AsyncValidatorFn, ValidationErrors, ValidatorFn} from './directives/validators';
import {toObservable} from './validators';

/**
 * Reports that a FormControl is valid, meaning that no errors exist in the input value.
 *
 * 表示此 FormControl 有效，也就是说它的输入值中没有错误。
 *
 * @see `status`
 */
export const VALID = 'VALID';

/**
 * Reports that a FormControl is invalid, meaning that an error exists in the input value.
 *
 * 表示此 FormControl 无效，也就是说它的输入值中存在错误。
 *
 * @see `status`
 */
export const INVALID = 'INVALID';

/**
 * Reports that a FormControl is pending, meaning that that async validation is occurring and
 * errors are not yet available for the input value.
 *
 * 表示此 FormControl 处于未决状态，表示正在进行异步验证，还不知道输入值中有没有错误。
 *
 * @see `markAsPending`
 * @see `status`
 */
export const PENDING = 'PENDING';

/**
 * Reports that a FormControl is disabled, meaning that the control is exempt from ancestor
 * calculations of validity or value.
 *
 * 表示此 FormControl 被禁用了，表示该控件不会参与各级祖先对值的有效性的计算。
 *
 * @see `markAsDisabled`
 * @see `status`
 */
export const DISABLED = 'DISABLED';

function _find(control: AbstractControl, path: Array<string|number>|string, delimiter: string) {
  if (path == null) return null;

  if (!Array.isArray(path)) {
    path = path.split(delimiter);
  }
  if (Array.isArray(path) && path.length === 0) return null;

  // Not using Array.reduce here due to a Chrome 80 bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  let controlToFind: AbstractControl|null = control;
  path.forEach((name: string|number) => {
    if (controlToFind instanceof FormGroup) {
      controlToFind = controlToFind.controls.hasOwnProperty(name as string) ?
          controlToFind.controls[name] :
          null;
    } else if (controlToFind instanceof FormArray) {
      controlToFind = controlToFind.at(<number>name) || null;
    } else {
      controlToFind = null;
    }
  });
  return controlToFind;
}

function coerceToValidator(validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|
                           null): ValidatorFn|null {
  const validator =
      (isOptionsObj(validatorOrOpts) ? (validatorOrOpts as AbstractControlOptions).validators :
                                       validatorOrOpts) as ValidatorFn |
      ValidatorFn[] | null;

  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}

function coerceToAsyncValidator(
    asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null,
    validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null): AsyncValidatorFn|
    null {
  const origAsyncValidator =
      (isOptionsObj(validatorOrOpts) ? (validatorOrOpts as AbstractControlOptions).asyncValidators :
                                       asyncValidator) as AsyncValidatorFn |
      AsyncValidatorFn | null;

  return Array.isArray(origAsyncValidator) ? composeAsyncValidators(origAsyncValidator) :
                                             origAsyncValidator || null;
}

export type FormHooks = 'change'|'blur'|'submit';

/**
 * Interface for options provided to an `AbstractControl`.
 *
 * 提供给 `AbstractControl` 的配置项接口。
 *
 * @publicApi
 */
export interface AbstractControlOptions {
  /**
   * @description
   * The list of validators applied to a control.
   *
   * 应用于该控件的验证器列表。
   *
   */
  validators?: ValidatorFn|ValidatorFn[]|null;
  /**
   * @description
   * The list of async validators applied to control.
   *
   * 应用于该控件的异步验证器列表。
   *
   */
  asyncValidators?: AsyncValidatorFn|AsyncValidatorFn[]|null;
  /**
   * @description
   * The event name for control to update upon.
   *
   * 会导致更新控件的事件名称。
   *
   */
  updateOn?: 'change'|'blur'|'submit';
}


function isOptionsObj(validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|
                      null): boolean {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) &&
      typeof validatorOrOpts === 'object';
}


/**
 * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
 *
 * 这是 `FormControl`、`FormGroup` 和 `FormArray` 的基类。
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * 它提供了一些所有控件和控件组共有的行为，比如运行验证器、计算状态和重置状态。
 * 它还定义了一些所有子类共享的属性，如 `value`、`valid` 和 `dirty`。不允许直接实例化它。
 *
 * @see [Forms Guide](/guide/forms)
 *
 * [表单](/guide/forms)
 *
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 *
 * [响应式表单](/guide/reactive-forms)
 *
 * @see [Dynamic Forms Guide](/guide/dynamic-form)
 *
 * [动态表单](/guide/dynamic-form)
 *
 * @publicApi
 */
export abstract class AbstractControl {
  /** @internal */
  // TODO(issue/24571): remove '!'.
  _pendingDirty!: boolean;

  /** @internal */
  // TODO(issue/24571): remove '!'.
  _pendingTouched!: boolean;

  /** @internal */
  _onCollectionChange = () => {};

  /** @internal */
  // TODO(issue/24571): remove '!'.
  _updateOn!: FormHooks;

  // TODO(issue/24571): remove '!'.
  private _parent!: FormGroup|FormArray;
  private _asyncValidationSubscription: any;

  /**
   * The current value of the control.
   *
   * 控件的当前值。
   *
   * * For a `FormControl`, the current value.
   *
   *   对于 `FormControl`，它是当前值。
   *
   * * For an enabled `FormGroup`, the values of enabled controls as an object
   * with a key-value pair for each member of the group.
   *
   *   对于启用状态的 `FormGroup`，它是由组中的每个已启用的成员控件的名称和值组成的对象。
   *
   * * For a disabled `FormGroup`, the values of all controls as an object
   * with a key-value pair for each member of the group.
   *
   *   对于禁用状态的 `FormGroup`，它是由组中的所有成员控件的名称和值组成的对象。
   *
   * * For a `FormArray`, the values of enabled controls as an array.
   *
   *   对于 `FormArray`，它是有所有已启用的控件的值组成的数组。
   *
   */
  public readonly value: any;

  /**
   * Initialize the AbstractControl instance.
   *
   * 初始化这个 AbstractControl 实例。
   *
   * @param validator The function that determines the synchronous validity of this control.
   *
   * 用于决定该控件有效性的同步函数。
   *
   * @param asyncValidator The function that determines the asynchronous validity of this
   * control.
   *
   * 用于决定该控件有效性的异步函数。
   *
   */
  constructor(public validator: ValidatorFn|null, public asyncValidator: AsyncValidatorFn|null) {}

  /**
   * The parent control.
   *
   * 父控件。
   */
  get parent(): FormGroup|FormArray {
    return this._parent;
  }

  /**
   * The validation status of the control. There are four possible
   * validation status values:
   *
   * 控件的有效性状态。有四个可能的值：
   *
   * * **VALID**: This control has passed all validation checks.
   *
   *   **VALID**: 该控件通过了所有有效性检查。
   *
   * * **INVALID**: This control has failed at least one validation check.
   *
   *   **INVALID** 该控件至少有一个有效性检查失败了。
   *
   * * **PENDING**: This control is in the midst of conducting a validation check.
   *
   *   **PENDING**：该控件正在进行有效性检查，处于中间状态。
   *
   * * **DISABLED**: This control is exempt from validation checks.
   *
   *   **DISABLED**：该控件被禁用，豁免了有效性检查。
   *
   * These status values are mutually exclusive, so a control cannot be
   * both valid AND invalid or invalid AND disabled.
   *
   * 这些状态值是互斥的，因此一个控件不可能同时处于有效状态和无效状态或无效状态和禁用状态。
   */
  // TODO(issue/24571): remove '!'.
  public readonly status!: string;

  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * 当控件的 `status` 为 `VALID` 时，它就是 `valid` 的。
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   *
   * 如果该控件通过了所有有效性检查，则为 `true`，否则为 `false`。
   */
  get valid(): boolean {
    return this.status === VALID;
  }

  /**
   * A control is `invalid` when its `status` is `INVALID`.
   *
   * 当控件的 `status` 为 `INVALID` 时，它就是 `invalid` 的。
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   *
   * 如果该控件的一个或多个有效性检查失败了，则为 `true`，否则为 `false`。
   */
  get invalid(): boolean {
    return this.status === INVALID;
  }

  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * 当控件的 `status` 为 `PENDING` 时，它就是 `pending` 的。
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   *
   * 如果该控件正在进行有效性检查，则为 `true`，否则为 `false`。
   */
  get pending(): boolean {
    return this.status == PENDING;
  }

  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * 当控件的 `status` 为 `DISABLED` 时，它就是 `disabled`。
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * 被禁用的控件会豁免有效性检查，并且它的值不会聚合进其祖先控件中。
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control is disabled, false otherwise.
   *
   * 如果该控件被禁用了，则为 `true`，否则为 `false`。
   */
  get disabled(): boolean {
    return this.status === DISABLED;
  }

  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * 如果控件的 `status` 不是 `DISABLED` 时，它就是 `enabled`。
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   *
   * 如果该控件处于 'DISABLED' 之外的任何状态，则为 `true`，否则为 `false`。
   *
   * @see {@link AbstractControl.status}
   *
   */
  get enabled(): boolean {
    return this.status !== DISABLED;
  }

  /**
   * An object containing any errors generated by failing validation,
   * or null if there are no errors.
   *
   * 一个对象，包含由失败的验证所生成的那些错误，如果没出错则为 null。
   */
  // TODO(issue/24571): remove '!'.
  public readonly errors!: ValidationErrors|null;

  /**
   * A control is `pristine` if the user has not yet changed
   * the value in the UI.
   *
   * 如果用户尚未修改 UI 中的值，则该控件是 `pristine`（原始状态）的。
   *
   * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
   * Programmatic changes to a control's value do not mark it dirty.
   *
   * 如果用户尚未修改过 UI 中的值，则为 `true`，与 `dirty` 相反。
   * 以编程的方式修改控件的值不会把它标记为 `dirty`。
   */
  public readonly pristine: boolean = true;

  /**
   * A control is `dirty` if the user has changed the value
   * in the UI.
   *
   * 如果用户修改过 UI 中的值，则控件是 `dirty`（脏） 的。
   *
   * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
   * Programmatic changes to a control's value do not mark it dirty.
   *
   * 如果用户在 UI 中修改过该控件的值，则为 `true`；与 `pristine` 相对。
   * 用编程的方式修改控件的值不会将其标记为 `dirty`。
   */
  get dirty(): boolean {
    return !this.pristine;
  }

  /**
   * True if the control is marked as `touched`.
   *
   * 如果控件被标记为 `touched`（碰过） 则为 `true`。
   *
   * A control is marked `touched` once the user has triggered
   * a `blur` event on it.
   *
   * 一旦用户在控件上触发了 `blur` 事件，则会将其标记为 `touched`。
   */
  public readonly touched: boolean = false;

  /**
   * True if the control has not been marked as touched
   *
   * 如果该控件尚未标记为 `touched`，则为 `true`。
   *
   * A control is `untouched` if the user has not yet triggered
   * a `blur` event on it.
   *
   * 如果用户尚未在控件上触发过 `blur` 事件，则该控件为 `untouched`。
   */
  get untouched(): boolean {
    return !this.touched;
  }

  /**
   * A multicasting observable that emits an event every time the value of the control changes, in
   * the UI or programmatically. It also emits an event each time you call enable() or disable()
   * without passing along {emitEvent: false} as a function argument.
   *
   * 一个多播 Observable（可观察对象），每当控件的值发生变化时，它就会发出一个事件 —— 无论是通过 UI 还是通过程序。每当你调用 `enable()` 或 `disable()`，但没有传入 `{emitEvent: false}` 参数时，它也同样会发出一个事件。
   */
  // TODO(issue/24571): remove '!'.
  public readonly valueChanges!: Observable<any>;

  /**
   * A multicasting observable that emits an event every time the validation `status` of the control
   * recalculates.
   *
   * 一个多播 Observable（可观察对象），每当控件的验证 `status` 被重新计算时，就会发出一个事件。
   *
   * @see {@link AbstractControl.status}
   *
   */
  // TODO(issue/24571): remove '!'.
  public readonly statusChanges!: Observable<any>;

  /**
   * Reports the update strategy of the `AbstractControl` (meaning
   * the event on which the control updates itself).
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   *
   * 报告这个 `AbstractControl` 的更新策略（表示控件用来更新自身状态的事件）。
   * 可能的值有 `'change'` | `'blur'` | `'submit'`，默认值是 `'change'`。
   */
  get updateOn(): FormHooks {
    return this._updateOn ? this._updateOn : (this.parent ? this.parent.updateOn : 'change');
  }

  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing sync validators.
   *
   * 设置该控件上所激活的同步验证器。调用它将会覆盖所有现存的同步验证器。
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  setValidators(newValidator: ValidatorFn|ValidatorFn[]|null): void {
    this.validator = coerceToValidator(newValidator);
  }

  /**
   * Sets the async validators that are active on this control. Calling this
   * overwrites any existing async validators.
   *
   * 设置该控件上所激活的异步验证器。调用它就会覆盖所有现存的异步验证器。
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  setAsyncValidators(newValidator: AsyncValidatorFn|AsyncValidatorFn[]|null): void {
    this.asyncValidator = coerceToAsyncValidator(newValidator);
  }

  /**
   * Empties out the sync validator list.
   *
   * 清空同步验证器列表。
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearValidators(): void {
    this.validator = null;
  }

  /**
   * Empties out the async validator list.
   *
   * 清空异步验证器列表。
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearAsyncValidators(): void {
    this.asyncValidator = null;
  }

  /**
   * Marks the control as `touched`. A control is touched by focus and
   * blur events that do not change the value.
   *
   * @see `markAsUntouched()`
   * @see `markAsDirty()`
   * @see `markAsPristine()`
   *
   * 把该控件标记为 `touched`。控件获得焦点并失去焦点不会修改这个值。与 `markAsDirty` 相对。
   *
   *  @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   *
   * 在应用完此标记后，该配置项会决定控件如何传播变更及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true` 则只标记当前控件。如果为 `false` 或不提供，则标记它所有的直系祖先。默认为 `false`。
   */
  markAsTouched(opts: {onlySelf?: boolean} = {}): void {
    (this as {touched: boolean}).touched = true;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(opts);
    }
  }

  /**
   * Marks the control and all its descendant controls as `touched`.
   * @see `markAsTouched()`
   */
  markAllAsTouched(): void {
    this.markAsTouched({onlySelf: true});

    this._forEachChild((control: AbstractControl) => control.markAllAsTouched());
  }

  /**
   * Marks the control as `untouched`.
   *
   * 把该控件标记为 `untouched`。
   *
   * If the control has any children, also marks all children as `untouched`
   * and recalculates the `touched` status of all parent controls.
   *
   * 如果该控件有任何子控件，还会把所有子控件标记为 `untouched`，并重新计算所有父控件的 `touched` 状态。
   *
   *  @see `markAsTouched()`
   * @see `markAsDirty()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after the marking is applied.
   *
   * 在应用完此标记后，该配置项会决定控件如何传播变更及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true` 则只标记当前控件。如果为 `false` 或不提供，则标记它所有的直系祖先。默认为 `false`。
   *
   */
  markAsUntouched(opts: {onlySelf?: boolean} = {}): void {
    (this as {touched: boolean}).touched = false;
    this._pendingTouched = false;

    this._forEachChild((control: AbstractControl) => {
      control.markAsUntouched({onlySelf: true});
    });

    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }

  /**
   * Marks the control as `dirty`. A control becomes dirty when
   * the control's value is changed through the UI; compare `markAsTouched`.
   *
   * 把控件标记为 `dirty`。当控件通过 UI 修改过时控件会变成 `dirty` 的；与 `markAsTouched` 相对。
   *
   *  @see `markAsTouched()`
   * @see `markAsUntouched()`
   * @see `markAsPristine()`
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   *
   * 在应用完此标记后，该配置项会决定控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true` 则只标记当前控件。如果为 `false` 或不提供，则标记它所有的直系祖先。默认为 `false`。
   *
   */
  markAsDirty(opts: {onlySelf?: boolean} = {}): void {
    (this as {pristine: boolean}).pristine = false;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsDirty(opts);
    }
  }

  /**
   * Marks the control as `pristine`.
   *
   * 把该控件标记为 `pristine`（原始状态）。
   *
   * If the control has any children, marks all children as `pristine`,
   * and recalculates the `pristine` status of all parent
   * controls.
   *
   * 如果该控件有任何子控件，则把所有子控件标记为 `pristine`，并重新计算所有父控件的 `pristine` 状态。
   *
   *  @see `markAsTouched()`
   * @see `markAsUntouched()`
   * @see `markAsDirty()`
   *
   * @param opts Configuration options that determine how the control emits events after
   * marking is applied.
   *
   * 在应用完此标记后，该配置项会决定控件如何传播更改以及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true` 则只标记当前控件。如果为 `false` 或不提供，则标记它所有的直系祖先。默认为 `false`。
   *
   */
  markAsPristine(opts: {onlySelf?: boolean} = {}): void {
    (this as {pristine: boolean}).pristine = true;
    this._pendingDirty = false;

    this._forEachChild((control: AbstractControl) => {
      control.markAsPristine({onlySelf: true});
    });

    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }

  /**
   * Marks the control as `pending`.
   *
   * 把该控件标记为 `pending`（待定）的。
   *
   * A control is pending while the control performs async validation.
   *
   * 当控件正在执行异步验证时，该控件是 `pending` 的。
   *
   *  @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates changes and
   * emits events after marking is applied.
   *
   * 在应用完此标记后，该配置项会决定控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true` 则只标记当前控件。如果为 `false` 或不提供，则标记它所有的直系祖先。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event with the latest status the control is marked pending.
   * When false, no events are emitted.
   *
   *   `emitEvent`：如果为 `true` 或未提供（默认值），则 `statusChanges`（Observable）会发出一个事件，传入控件的最近状态，并把控件标记为 `pending` 状态。
   *   如果为 `false`，则不会发出事件。
   *
   */
  markAsPending(opts: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    (this as {status: string}).status = PENDING;

    if (opts.emitEvent !== false) {
      (this.statusChanges as EventEmitter<any>).emit(this.status);
    }

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsPending(opts);
    }
  }

  /**
   * Disables the control. This means the control is exempt from validation checks and
   * excluded from the aggregate value of any parent. Its status is `DISABLED`.
   *
   * 禁用此控件。这意味着该控件在表单验证检查时会被豁免，并且从其父控件的聚合值中排除它的值。它的状态是 `DISABLED`。
   *
   * If the control has children, all children are also disabled.
   *
   * 如果该控件有子控件，则所有子控件也会被禁用。
   *
   *  @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control is disabled.
   *
   * 在该控件被禁用之后，该配置项决定如何传播更改以及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true`，则只标记当前控件。如果为 `false` 或没有提供，则标记所有直系祖先。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is disabled.
   * When false, no events are emitted.
   *
   *   `emitEvent`：如果为 `true` 或没有提供（默认），则当控件被禁用时，`statusChanges` 和 `valueChanges` 这两个 Observable 都会发出最近的状态和值。
   *   如果为 `false`，则不会发出事件。
   *
   */
  disable(opts: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

    (this as {status: string}).status = DISABLED;
    (this as {errors: ValidationErrors | null}).errors = null;
    this._forEachChild((control: AbstractControl) => {
      control.disable({...opts, onlySelf: true});
    });
    this._updateValue();

    if (opts.emitEvent !== false) {
      (this.valueChanges as EventEmitter<any>).emit(this.value);
      (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    this._updateAncestors({...opts, skipPristineCheck});
    this._onDisabledChange.forEach((changeFn) => changeFn(true));
  }

  /**
   * Enables the control. This means the control is included in validation checks and
   * the aggregate value of its parent. Its status recalculates based on its value and
   * its validators.
   *
   * 启用该控件。这意味着该控件包含在有效性检查中，并会出现在其父控件的聚合值中。它的状态会根据它的值和验证器而重新计算。
   *
   * By default, if the control has children, all children are enabled.
   *
   * 默认情况下，如果该控件具有子控件，则所有子控件都会被启用。
   *
   *  @see {@link AbstractControl.status}
   *
   * @param opts Configure options that control how the control propagates changes and
   * emits events when marked as untouched
   *
   * 当标记为 `untouched` 时，该配置项会决定该控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true`，则只标记当前控件。如果为 `false` 或没有提供，则标记所有直系祖先。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is enabled.
   * When false, no events are emitted.
   *
   *   `emitEvent`：如果为 `true` 或没有提供（默认），则当控件被启用时，`statusChanges` 和 `valueChanges` 这两个 Observable 都会发出最近的状态和值。
   *   如果为 `false`，则不会发出事件。
   */
  enable(opts: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    // If parent has been marked artificially dirty we don't want to re-calculate the
    // parent's dirtiness based on the children.
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

    (this as {status: string}).status = VALID;
    this._forEachChild((control: AbstractControl) => {
      control.enable({...opts, onlySelf: true});
    });
    this.updateValueAndValidity({onlySelf: true, emitEvent: opts.emitEvent});

    this._updateAncestors({...opts, skipPristineCheck});
    this._onDisabledChange.forEach((changeFn) => changeFn(false));
  }

  private _updateAncestors(
      opts: {onlySelf?: boolean, emitEvent?: boolean, skipPristineCheck?: boolean}) {
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) {
        this._parent._updatePristine();
      }
      this._parent._updateTouched();
    }
  }

  /**
   * @param parent Sets the parent of the control
   *
   * 设置该控件的父控件
   */
  setParent(parent: FormGroup|FormArray): void {
    this._parent = parent;
  }

  /**
   * Sets the value of the control. Abstract method (implemented in sub-classes).
   *
   * 设置该控件的值。这是一个抽象方法（由子类实现）。
   */
  abstract setValue(value: any, options?: Object): void;

  /**
   * Patches the value of the control. Abstract method (implemented in sub-classes).
   *
   * 修补（patch）该控件的值。这是一个抽象方法（由子类实现）。
   */
  abstract patchValue(value: any, options?: Object): void;

  /**
   * Resets the control. Abstract method (implemented in sub-classes).
   *
   * 重置控件。这是一个抽象方法（由子类实现）。
   */
  abstract reset(value?: any, options?: Object): void;

  /**
   * Recalculates the value and validation status of the control.
   *
   * 重新计算控件的值和校验状态。
   *
   * By default, it also updates the value and validity of its ancestors.
   *
   * 默认情况下，它还会更新其直系祖先的值和有效性状态。
   *
   * @param opts Configuration options determine how the control propagates changes and emits events
   * after updates and validity checks are applied.
   *
   * 当更新和进行有效性检查之后，该配置项会决定控件如何传播变更并发出事件。
   *
   * * `onlySelf`: When true, only update this control. When false or not supplied,
   * update all direct ancestors. Default is false.
   *
   *   `onlySelf`：如果为 `true`，则只标记当前控件。如果为 `false` 或没有提供，则标记所有直系祖先。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is updated.
   * When false, no events are emitted.
   *
   *   `emitEvent`：如果为 `true` 或没有提供（默认），则当控件被启用时，`statusChanges` 和 `valueChanges` 这两个 Observable 都会发出最近的状态和值。
   *   如果为 `false`，则不会发出事件。
   *
   */
  updateValueAndValidity(opts: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this._setInitialStatus();
    this._updateValue();

    if (this.enabled) {
      this._cancelExistingSubscription();
      (this as {errors: ValidationErrors | null}).errors = this._runValidator();
      (this as {status: string}).status = this._calculateStatus();

      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(opts.emitEvent);
      }
    }

    if (opts.emitEvent !== false) {
      (this.valueChanges as EventEmitter<any>).emit(this.value);
      (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
    }
  }

  /** @internal */
  _updateTreeValidity(opts: {emitEvent?: boolean} = {emitEvent: true}) {
    this._forEachChild((ctrl: AbstractControl) => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({onlySelf: true, emitEvent: opts.emitEvent});
  }

  private _setInitialStatus() {
    (this as {status: string}).status = this._allControlsDisabled() ? DISABLED : VALID;
  }

  private _runValidator(): ValidationErrors|null {
    return this.validator ? this.validator(this) : null;
  }

  private _runAsyncValidator(emitEvent?: boolean): void {
    if (this.asyncValidator) {
      (this as {status: string}).status = PENDING;
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription =
          obs.subscribe((errors: ValidationErrors|null) => this.setErrors(errors, {emitEvent}));
    }
  }

  private _cancelExistingSubscription(): void {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
    }
  }

  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   *
   * 在手动（而不是自动）运行校验之后，设置表单控件上的错误信息。
   *
   * Calling `setErrors` also updates the validity of the parent control.
   *
   * 调用 `setErrors` 还会更新父控件的有效性状态。
   *
   * @usageNotes
   *
   * ### Manually set the errors for a control
   *
   * ### 手动设置控件上的错误信息。
   *
   * ```
   * const login = new FormControl('someLogin');
   * login.setErrors({
   *   notUnique: true
   * });
   *
   * expect(login.valid).toEqual(false);
   * expect(login.errors).toEqual({ notUnique: true });
   *
   * login.setValue('someOtherLogin');
   *
   * expect(login.valid).toEqual(true);
   * ```
   */
  setErrors(errors: ValidationErrors|null, opts: {emitEvent?: boolean} = {}): void {
    (this as {errors: ValidationErrors | null}).errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false);
  }

  /**
   * Retrieves a child control given the control's name or path.
   *
   * 根据指定的控件名称或路径获取子控件。
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   *
   * 一个由点号（`.`）分隔的字符串或 "字符串/数字" 数组定义的控件路径。
   *
   * @usageNotes
   *
   * ### Retrieve a nested control
   *
   * ### 获取嵌套的控件
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * 比如，要获取子控件组 `person` 中的 `name` 控件：
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * - 或 -
   *
   * * `this.form.get(['person', 'name']);`
   */
  get(path: Array<string|number>|string): AbstractControl|null {
    return _find(this, path, '.');
  }

  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * 报告具有指定路径的控件的错误数据。
   *
   * @param errorCode The code of the error to check
   *
   * 所查出的错误的错误码
   *
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * 一个控件名列表，用于指定要如何从当前控件移动到要查询错误的那个控件。
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * 比如，对于下列 `FormGroup`：
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * 从根表单移动到这个 'street' 控件的路径应该是 'address' -> 'street'。
   *
   * It can be provided to this method in one of two formats:
   *
   * 可以用两种格式把它提供给此方法：
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   *
   *    一个表示控件名的字符串数组，比如 `['address', 'street']`
   *
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   *    一个点号分隔的控件名列表构成的单一字符串，比如 `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   *
   * 特定错误的数据，如果该控件不存在或没有错误，则返回 null。
   *
   */
  getError(errorCode: string, path?: Array<string|number>|string): any {
    const control = path ? this.get(path) : this;
    return control && control.errors ? control.errors[errorCode] : null;
  }

  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * 报告指定路径下的控件上是否有指定的错误。
   *
   * @param errorCode The code of the error to check
   *
   * 要获取的数据的错误码
   *
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   *
   * 要检查的控件的路径。如果没有提供该参数，则检查该控件中的错误。
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   *
   * 如果指定路径下的控件有这个错误则返回 `true`，否则返回 `false`。
   */
  hasError(errorCode: string, path?: Array<string|number>|string): boolean {
    return !!this.getError(errorCode, path);
  }

  /**
   * Retrieves the top-level ancestor of this control.
   *
   * 获取该控件的顶级祖先。
   *
   */
  get root(): AbstractControl {
    let x: AbstractControl = this;

    while (x._parent) {
      x = x._parent;
    }

    return x;
  }

  /** @internal */
  _updateControlsErrors(emitEvent: boolean): void {
    (this as {status: string}).status = this._calculateStatus();

    if (emitEvent) {
      (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent);
    }
  }

  /** @internal */
  _initObservables() {
    (this as {valueChanges: Observable<any>}).valueChanges = new EventEmitter();
    (this as {statusChanges: Observable<any>}).statusChanges = new EventEmitter();
  }


  private _calculateStatus(): string {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }

  /** @internal */
  abstract _updateValue(): void;

  /** @internal */
  abstract _forEachChild(cb: Function): void;

  /** @internal */
  abstract _anyControls(condition: Function): boolean;

  /** @internal */
  abstract _allControlsDisabled(): boolean;

  /** @internal */
  abstract _syncPendingControls(): boolean;

  /** @internal */
  _anyControlsHaveStatus(status: string): boolean {
    return this._anyControls((control: AbstractControl) => control.status === status);
  }

  /** @internal */
  _anyControlsDirty(): boolean {
    return this._anyControls((control: AbstractControl) => control.dirty);
  }

  /** @internal */
  _anyControlsTouched(): boolean {
    return this._anyControls((control: AbstractControl) => control.touched);
  }

  /** @internal */
  _updatePristine(opts: {onlySelf?: boolean} = {}): void {
    (this as {pristine: boolean}).pristine = !this._anyControlsDirty();

    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }

  /** @internal */
  _updateTouched(opts: {onlySelf?: boolean} = {}): void {
    (this as {touched: boolean}).touched = this._anyControlsTouched();

    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }

  /** @internal */
  _onDisabledChange: Function[] = [];

  /** @internal */
  _isBoxedValue(formState: any): boolean {
    return typeof formState === 'object' && formState !== null &&
        Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
  }

  /** @internal */
  _registerOnCollectionChange(fn: () => void): void {
    this._onCollectionChange = fn;
  }

  /** @internal */
  _setUpdateStrategy(opts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null): void {
    if (isOptionsObj(opts) && (opts as AbstractControlOptions).updateOn != null) {
      this._updateOn = (opts as AbstractControlOptions).updateOn!;
    }
  }

  /**
   * Check to see if parent has been marked artificially dirty.
   *
   * @internal
   */
  private _parentMarkedDirty(onlySelf?: boolean): boolean {
    const parentDirty = this._parent && this._parent.dirty;
    return !onlySelf && parentDirty && !this._parent._anyControlsDirty();
  }
}

/**
 * Tracks the value and validation status of an individual form control.
 *
 * 跟踪独立表单控件的值和验证状态。
 *
 * This is one of the three fundamental building blocks of Angular forms, along with
 * `FormGroup` and `FormArray`. It extends the `AbstractControl` class that
 * implements most of the base functionality for accessing the value, validation status,
 * user interactions and events. See [usage examples below](#usage-notes).
 *
 * 它和 `FormGroup` 和 `FormArray` 是 Angular 表单的三大基本构造块之一。
 * 它扩展了 `AbstractControl` 类，并实现了关于访问值、验证状态、用户交互和事件的大部分基本功能。
 *
 * @see `AbstractControl`
 * @see [Reactive Forms Guide](guide/reactive-forms)
 *
 * [响应式表单](guide/reactive-forms)
 *
 * @see [Usage Notes](#usage-notes)
 *
 * [注意事项](#usage-notes)
 *
 * @usageNotes
 *
 * ### Initializing Form Controls
 *
 * ### 初始化表单控件
 *
 * Instantiate a `FormControl`, with an initial value.
 *
 * 用一个初始值初始化 `FormControl`。
 *
 * ```ts
 * const control = new FormControl('some value');
 * console.log(control.value);     // 'some value'
 *```
 *
 * The following example initializes the control with a form state object. The `value`
 * and `disabled` keys are required in this case.
 *
 * 下面的例子用一个表单状态对象初始化控件。这里用到的是 `value` 和 `disabled` 键。
 *
 * ```ts
 * const control = new FormControl({ value: 'n/a', disabled: true });
 * console.log(control.value);     // 'n/a'
 * console.log(control.status);    // 'DISABLED'
 * ```
 *
 * The following example initializes the control with a sync validator.
 *
 * 下面的例子使用一个同步验证器初始化了该控件。
 *
 * ```ts
 * const control = new FormControl('', Validators.required);
 * console.log(control.value);      // ''
 * console.log(control.status);     // 'INVALID'
 * ```
 *
 * The following example initializes the control using an options object.
 *
 * 下面的例子使用一个配置对象初始化了该控件。
 *
 * ```ts
 * const control = new FormControl('', {
 *    validators: Validators.required,
 *    asyncValidators: myAsyncValidator
 * });
 * ```
 *
 * ### Configure the control to update on a blur event
 *
 * ### 配置该控件，使其在发生 `blur` 事件时更新
 *
 * Set the `updateOn` option to `'blur'` to update on the blur `event`.
 *
 * 把 `updateOn` 选项设置为 `'blur'`，可以在发生 `blur` 事件时更新。
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'blur' });
 * ```
 *
 * ### Configure the control to update on a submit event
 *
 * ### 配置该控件，使其在发生 `submit` 事件时更新
 *
 * Set the `updateOn` option to `'submit'` to update on a submit `event`.
 *
 * 把 `updateOn` 选项设置为 `'submit'`，可以在发生 `submit` 事件时更新。

 * ```ts
 * const control = new FormControl('', { updateOn: 'submit' });
 * ```
 *
 * ### Reset the control back to an initial value
 *
 * ### 把该控件重置回初始值
 *
 * You reset to a specific form state by passing through a standalone
 * value or a form state object that contains both a value and a disabled state
 * (these are the only two properties that cannot be calculated).
 *
 *
 * 通过传递包含值和禁用状态的独立值或表单状态对象，可以将其重置为特定的表单状态（这是所支持的仅有的两个非计算状态）。
 *
 * ```ts
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 *
 * control.reset('Drew');
 *
 * console.log(control.value); // 'Drew'
 * ```
 *
 * ### Reset the control back to an initial value and disabled
 *
 * ### 把该控件重置回初始值并禁用。
 *
 * ```
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 * console.log(control.status); // 'VALID'
 *
 * control.reset({ value: 'Drew', disabled: true });
 *
 * console.log(control.value); // 'Drew'
 * console.log(control.status); // 'DISABLED'
 * ```
 *
 * @publicApi
 */
export class FormControl extends AbstractControl {
  /** @internal */
  _onChange: Function[] = [];

  /** @internal */
  _pendingValue: any;

  /** @internal */
  _pendingChange: any;

  /**
   * Creates a new `FormControl` instance.
   *
   * 创建新的 `FormControl` 实例。
  *
  * @param formState Initializes the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * 使用一个初始值或定义了初始值和禁用状态的对象初始化该控件。
  *
  * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * 一个同步验证器函数或其数组，或者一个包含验证函数和验证触发器的 `AbstractControlOptions` 对象。
  *
  * @param asyncValidator A single async validator or array of async validator functions
   *
   * 一个异步验证器函数或其数组。
  *
  */
  constructor(
      formState: any = null,
      validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null) {
    super(
        coerceToValidator(validatorOrOpts),
        coerceToAsyncValidator(asyncValidator, validatorOrOpts));
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this.updateValueAndValidity({onlySelf: true, emitEvent: false});
    this._initObservables();
  }

  /**
   * Sets a new value for the form control.
   *
   * 设置该表单控件的新值。
   *
   * @param value The new value for the control.
   *
   * 控件的新值。
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * 当值发生变化时，该配置项决定如何传播变更以及发出事件。
   * 该配置项会传递给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   *
   *   `onlySelf`：如果为 `true`，则每次变更只影响该控件本身，不影响其父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   *
   *   `emitEvent`：如果为 `true` 或未提供（默认），则当控件值变化时，
   *   `statusChanges` 和 `valueChanges` 这两个 Observable 都会以最近的状态和值发出事件。
   *   如果为 `false`，则不会发出事件。
   *
   * * `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
   * `onChange` event to
   * update the view.
   *
   *   `emitModelToViewChange`：如果为 `true` 或未提供（默认），则每次变化都会触发一个 `onChange` 事件以更新视图。
   *
   * * `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
   * `ngModelChange`
   * event to update the model.
   *
   *   `emitViewToModelChange`：如果为 `true` 或未提供（默认），则每次变化都会触发一个 `ngModelChange` 事件以更新模型。
   *
   */
  setValue(value: any, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}): void {
    (this as {value: any}).value = this._pendingValue = value;
    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach(
          (changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
    }
    this.updateValueAndValidity(options);
  }

  /**
   * Patches the value of a control.
   *
   * 修补控件的值。
   *
   * This function is functionally the same as {@link FormControl#setValue setValue} at this level.
   * It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
   * `FormArrays`, where it does behave differently.
   *
   * 在 `FormControl` 这个层次上，该函数的功能和 {@link FormControl#setValue setValue} 完全相同。
   * 但 `FormGroup` 和 `FormArray` 上的 {@link FormGroup#patchValue patchValue} 则具有不同的行为。
   *
   * @see `setValue` for options
   *
   * `setValue` 的配置项
   */
  patchValue(value: any, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}): void {
    this.setValue(value, options);
  }

  /**
   * Resets the form control, marking it `pristine` and `untouched`, and setting
   * the value to null.
   *
   * 重置该表单控件，把它标记为 `pristine` 和 `untouched`，并把它的值设置为 `null`。
   *
   * @param formState Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * 使用初始值或一个包含初始值和禁用状态的对象来重置该控件。
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   *
   * 当值发生变化时，该配置项会决定控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   *
   *   `onlySelf`：如果为 `true` ，则每个变更只会影响当前控件而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   *
   *   `emitEvent`：如果为 `true` 或未提供（默认），则当控件被重置时，
   *   `statusChanges` 和 `valueChanges` 这两个 Observable 都会以最近的状态和值发出事件。
   *   如果为 `false`，则不会发出事件。
   */
  reset(formState: any = null, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    this._pendingChange = false;
  }

  /**
   * @internal
   */
  _updateValue() {}

  /**
   * @internal
   */
  _anyControls(condition: Function): boolean {
    return false;
  }

  /**
   * @internal
   */
  _allControlsDisabled(): boolean {
    return this.disabled;
  }

  /**
   * Register a listener for change events.
   *
   * 注册变更事件的监听器。
   *
   * @param fn The method that is called when the value changes
   *
   * 当值变化时，就会调用该方法。
   */
  registerOnChange(fn: Function): void {
    this._onChange.push(fn);
  }

  /**
   * @internal
   */
  _clearChangeFns(): void {
    this._onChange = [];
    this._onDisabledChange = [];
    this._onCollectionChange = () => {};
  }

  /**
   * Register a listener for disabled events.
   *
   * 注册禁用事件的监听器。
   *
   * @param fn The method that is called when the disabled status changes.
   *
   * 当禁用状态发生变化时，就会调用该方法。
   */
  registerOnDisabledChange(fn: (isDisabled: boolean) => void): void {
    this._onDisabledChange.push(fn);
  }

  /**
   * @internal
   */
  _forEachChild(cb: Function): void {}

  /** @internal */
  _syncPendingControls(): boolean {
    if (this.updateOn === 'submit') {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {onlySelf: true, emitModelToViewChange: false});
        return true;
      }
    }
    return false;
  }

  private _applyFormState(formState: any) {
    if (this._isBoxedValue(formState)) {
      (this as {value: any}).value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({onlySelf: true, emitEvent: false}) :
                           this.enable({onlySelf: true, emitEvent: false});
    } else {
      (this as {value: any}).value = this._pendingValue = formState;
    }
  }
}

/**
 * Tracks the value and validity state of a group of `FormControl` instances.
 *
 * 跟踪一组 `FormControl` 实例的值和有效性状态。
 *
 * A `FormGroup` aggregates the values of each child `FormControl` into one object,
 * with each control name as the key.  It calculates its status by reducing the status values
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` 把每个子 `FormControl` 的值聚合进一个对象，它的 key 是每个控件的名字。
 * 它通过归集其子控件的状态值来计算出自己的状态。
 * 比如，如果组中的任何一个控件是无效的，那么整个组就是无效的。
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormArray`.
 *
 * `FormGroup` 是 Angular 中用来定义表单的三大基本构造块之一，就像 `FormControl`、`FormArray` 一样。
 *
 * When instantiating a `FormGroup`, pass in a collection of child controls as the first
 * argument. The key for each child registers the name for the control.
 *
 * 当实例化 `FormGroup` 时，在第一个参数中传入一组子控件。每个子控件会用控件名把自己注册进去。
 *
 * @usageNotes
 *
 * ### Create a form group with 2 controls
 *
 * ### 创建一个带有两个控件的表单组
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * ### Create a form group with a group-level validator
 *
 * ### 创建一个具有组级验证器的表单组
 *
 * You include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * 你可以用第二个参数传入一些组级验证器或用第三个参数传入一些组级异步验证器。
 * 当你要根据一个以上子控件的值来决定有效性时，这很好用。
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like `FormControl` instances, you choose to pass in
 * validators and async validators as part of an options object.
 *
 * 像 `FormControl` 实例一样，你也可以在配置对象中传入验证器和异步验证器。
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
 * ```
 *
 * ### Set the updateOn property for all controls in a form group
 *
 * ### 为表单组中的所有空间设置 `updateOn` 属性
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * 该选项对象可用来为每个子控件的 `updateOn` 属性设置默认值。
 * 如果在组级把 `updateOn` 设置为 `'blur'`，则所有子控件的默认值也是 `'blur'`，除非这个子控件显式的指定了另一个 `updateOn` 值。
 *
 * ```ts
 * const c = new FormGroup({
 *   one: new FormControl()
 * }, { updateOn: 'blur' });
 * ```
 *
 * @publicApi
 */
export class FormGroup extends AbstractControl {
  /**
   * Creates a new `FormGroup` instance.
   *
   * 创建一个新的 `FormGroup` 实例
  *
  * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
  *
  * 一组子控件。每个子控件的名字就是它注册时用的 `key`。
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * 一个同步验证器函数或其数组，或者一个包含验证函数和验证触发器的 `AbstractControlOptions` 对象。
  *
  * @param asyncValidator A single async validator or array of async validator functions
   *
   * 单个的异步验证器函数或其数组。
  *
  */
  constructor(
      public controls: {[key: string]: AbstractControl},
      validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null) {
    super(
        coerceToValidator(validatorOrOpts),
        coerceToAsyncValidator(asyncValidator, validatorOrOpts));
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  /**
   * Registers a control with the group's list of controls.
   *
   * 向组内的控件列表中注册一个控件。
   *
   * This method does not update the value or validity of the control.
   * Use {@link FormGroup#addControl addControl} instead.
   *
   * 该方法不会更新控件的值或其有效性。
   * 使用 {@link FormGroup#addControl addControl} 代替。
   *
   * @param name The control name to register in the collection
   *
   * 注册到集合中的控件名
   *
   * @param control Provides the control for the given name
   *
   * 提供这个名字对应的控件
   *
   */
  registerControl(name: string, control: AbstractControl): AbstractControl {
    if (this.controls[name]) return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }

  /**
   * Add a control to this group.
   *
   * 往组中添加一个控件。
   *
   * This method also updates the value and validity of the control.
   *
   * 该方法还会更新本空间的值和有效性。
   *
   * @param name The control name to add to the collection
   *
   * 要注册到集合中的控件名
   *
   * @param control Provides the control for the given name
   *
   * 提供与该控件名对应的控件。
   *
   */
  addControl(name: string, control: AbstractControl): void {
    this.registerControl(name, control);
    this.updateValueAndValidity();
    this._onCollectionChange();
  }

  /**
   * Remove a control from this group.
   *
   * 从该组中移除一个控件。
   *
   * @param name The control name to remove from the collection
   *
   * 要从集合中移除的控件名
   *
   */
  removeControl(name: string): void {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete (this.controls[name]);
    this.updateValueAndValidity();
    this._onCollectionChange();
  }

  /**
   * Replace an existing control.
   *
   * 替换现有控件。
   *
   * @param name The control name to replace in the collection
   *
   * 要从集合中替换掉的控件名
   *
   * @param control Provides the control for the given name
   *
   * 提供具有指定名称的控件
   *
   */
  setControl(name: string, control: AbstractControl): void {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {});
    delete (this.controls[name]);
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity();
    this._onCollectionChange();
  }

  /**
   * Check whether there is an enabled control with the given name in the group.
   *
   * 检查组内是否有一个具有指定名字的已启用的控件。
   *
   * Reports false for disabled controls. If you'd like to check for existence in the group
   * only, use {@link AbstractControl#get get} instead.
   *
   * 对于已禁用的控件，返回 `false`。如果你只想检查它是否存在于该组中，请改用 {@link AbstractControl#get get} 代替。
   *
   * @param controlName The control name to check for existence in the collection
   *
   * 要在集合中检查是否存在的控件名
   *
   * @returns false for disabled controls, true otherwise.
   *
   * 对于已禁用的控件返回 `false`，否则返回 `true`。
   */
  contains(controlName: string): boolean {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }

  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * 设置此 `FormGroup` 的值。它接受一个与组结构对应的对象，以控件名作为 key。
   *
   * @usageNotes
   *
   * ### Set the complete value for the form group
   *
   * ### 设置表单组的完整值
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   * ```
   *
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you exclude a value of a control that does exist.
   *
   * 当严格的检查失败时，比如设置了不存在的或被排除出去的控件的值。
   *
   * @param value The new value for the control that matches the structure of the group.
   *
   * 控件的新值，其结构必须和该组的结构相匹配。
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * 当值变化时，此配置项会决定该控件会如何传播变更以及发出事件。该配置项会被传给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   *
   *   `onlySelf`:：如果为 `true`，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   *
   *    `emitEvent`：如果为 `true` 或未提供（默认），则当控件值发生变化时，`statusChanges` 和 `valueChanges` 这两个 `Observable` 分别会以最近的状态和值发出事件。
   * 如果为 `false` 则不发出事件。
   *
   */
  setValue(value: {[key: string]: any}, options: {onlySelf?: boolean, emitEvent?: boolean} = {}):
      void {
    this._checkAllValuesPresent(value);
    Object.keys(value).forEach(name => {
      this._throwIfControlMissing(name);
      this.controls[name].setValue(value[name], {onlySelf: true, emitEvent: options.emitEvent});
    });
    this.updateValueAndValidity(options);
  }

  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * 修补此 `FormGroup` 的值。它接受一个以控件名为 key 的对象，并尽量把它们的值匹配到组中正确的控件上。
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * 它能接受组的超集和子集，而不会抛出错误。
   *
   * @usageNotes
   *
   * ### Patch the value for a form group
   *
   * ### 修补表单组的值
   *
   *  ```
   *  const form = new FormGroup({
   *     first: new FormControl(),
   *     last: new FormControl()
   *  });
   *  console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   *
   * 与该组的结构匹配的对象。
   *
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   *
   * 在修补了该值之后，此配置项会决定控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * true.
   *
   *   `onlySelf`：如果为 `true`，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   *    `emitEvent`：如果为 `true` 或未提供（默认），则当控件值发生变化时，`statusChanges` 和 `valueChanges` 这两个 `Observable` 分别会以最近的状态和值发出事件。
   * 如果为 `false` 则不发出事件。
   * 该配置项会被传给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   */
  patchValue(value: {[key: string]: any}, options: {onlySelf?: boolean, emitEvent?: boolean} = {}):
      void {
    Object.keys(value).forEach(name => {
      if (this.controls[name]) {
        this.controls[name].patchValue(value[name], {onlySelf: true, emitEvent: options.emitEvent});
      }
    });
    this.updateValueAndValidity(options);
  }

  /**
   * Resets the `FormGroup`, marks all descendants are marked `pristine` and `untouched`, and
   * the value of all descendants to null.
   *
   * 重置这个 `FormGroup`，把它的各级子控件都标记为 `pristine` 和 `untouched`，并把它们的值都设置为 `null`。
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * 你可以通过传入一个与表单结构相匹配的以控件名为 key 的 Map，来把表单重置为特定的状态。
   * 其状态可以是一个单独的值，也可以是一个同时具有值和禁用状态的表单状态对象。
   *
   * @param value Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * 使用一个初始值或包含初始值与禁用状态的对象重置该控件。
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   *
   * 当该组被重置时，此配置项会决定该控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   *
   *   `onlySelf`:：如果为 `true`，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   *    `emitEvent`：如果为 `true` 或未提供（默认），则当控件值发生变化时，`statusChanges` 和 `valueChanges` 这两个 `Observable` 分别会以最近的状态和值发出事件。
   * 如果为 `false` 则不发出事件。
   * 该配置项会被传给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ### 重置该表单组的值
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ### 重置该表单组的值以及禁用状态
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(this.form.value);  // {first: 'name', last: 'last name'}
   * console.log(this.form.get('first').status);  // 'DISABLED'
   * ```
   */
  reset(value: any = {}, options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this._forEachChild((control: AbstractControl, name: string) => {
      control.reset(value[name], {onlySelf: true, emitEvent: options.emitEvent});
    });
    this._updatePristine(options);
    this._updateTouched(options);
    this.updateValueAndValidity(options);
  }

  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * 这个 `FormGroup` 的聚合值，包括所有已禁用的控件。
   *
   * Retrieves all values regardless of disabled status.
   * The `value` property is the best way to get the value of the group, because
   * it excludes disabled controls in the `FormGroup`.
   *
   * 获取所有控件的值而不管其禁用状态。
   * `value` 属性是获取组中的值的最佳方式，因为它从 `FormGroup` 中排除了所有已禁用的控件。
   */
  getRawValue(): any {
    return this._reduceChildren(
        {}, (acc: {[k: string]: AbstractControl}, control: AbstractControl, name: string) => {
          acc[name] = control instanceof FormControl ? control.value : (<any>control).getRawValue();
          return acc;
        });
  }

  /** @internal */
  _syncPendingControls(): boolean {
    let subtreeUpdated = this._reduceChildren(false, (updated: boolean, child: AbstractControl) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated) this.updateValueAndValidity({onlySelf: true});
    return subtreeUpdated;
  }

  /** @internal */
  _throwIfControlMissing(name: string): void {
    if (!Object.keys(this.controls).length) {
      throw new Error(`
        There are no form controls registered with this group yet.  If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
    }
    if (!this.controls[name]) {
      throw new Error(`Cannot find form control with name: ${name}.`);
    }
  }

  /** @internal */
  _forEachChild(cb: (v: any, k: string) => void): void {
    Object.keys(this.controls).forEach(k => cb(this.controls[k], k));
  }

  /** @internal */
  _setUpControls(): void {
    this._forEachChild((control: AbstractControl) => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }

  /** @internal */
  _updateValue(): void {
    (this as {value: any}).value = this._reduceValue();
  }

  /** @internal */
  _anyControls(condition: Function): boolean {
    let res = false;
    this._forEachChild((control: AbstractControl, name: string) => {
      res = res || (this.contains(name) && condition(control));
    });
    return res;
  }

  /** @internal */
  _reduceValue() {
    return this._reduceChildren(
        {}, (acc: {[k: string]: AbstractControl}, control: AbstractControl, name: string) => {
          if (control.enabled || this.disabled) {
            acc[name] = control.value;
          }
          return acc;
        });
  }

  /** @internal */
  _reduceChildren(initValue: any, fn: Function) {
    let res = initValue;
    this._forEachChild((control: AbstractControl, name: string) => {
      res = fn(res, control, name);
    });
    return res;
  }

  /** @internal */
  _allControlsDisabled(): boolean {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled;
  }

  /** @internal */
  _checkAllValuesPresent(value: any): void {
    this._forEachChild((control: AbstractControl, name: string) => {
      if (value[name] === undefined) {
        throw new Error(`Must supply a value for form control with name: '${name}'.`);
      }
    });
  }
}

/**
 * Tracks the value and validity state of an array of `FormControl`,
 * `FormGroup` or `FormArray` instances.
 *
 * 跟踪一个控件数组的值和有效性状态，控件可以是 `FormControl`、`FormGroup` 或 `FormArray` 的实例。
 *
 * A `FormArray` aggregates the values of each child `FormControl` into an array.
 * It calculates its status by reducing the status values of its children. For example, if one of
 * the controls in a `FormArray` is invalid, the entire array becomes invalid.
 *
 * `FormArray` 聚合了数组中每个表单控件的值。
 * 它还会根据其所有子控件的状态总结出自己的状态。比如，如果 `FromArray` 中的任何一个控件是无效的，那么整个数组也会变成无效的。
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormGroup`.
 *
 * `FormArray` 是 Angular 表单中定义的三个基本构造块之一，就像 `FormControl` 和 `FormGroup` 一样。
 *
 * @usageNotes
 *
 * ### Create an array of form controls
 *
 * ### 创建表单控件的数组
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy', Validators.minLength(2)),
 *   new FormControl('Drew'),
 * ]);
 *
 * console.log(arr.value);   // ['Nancy', 'Drew']
 * console.log(arr.status);  // 'VALID'
 * ```
 *
 * ### Create a form array with array-level validators
 *
 * ### 创建一个带有数组级验证器的表单数组
 *
 * You include array-level validators and async validators. These come in handy
 * when you want to perform validation that considers the value of more than one child
 * control.
 *
 * 你可以定义数组级的验证器和异步验证器。当你需要根据一个或多个子控件的值来进行有效性验证时，这很有用。
 *
 * The two types of validators are passed in separately as the second and third arg
 * respectively, or together as part of an options object.
 *
 * 这两种类型的验证器分别通过第二个和第三个参数或作为配置对象的一部分传进去。
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy'),
 *   new FormControl('Drew')
 * ], {validators: myValidator, asyncValidators: myAsyncValidator});
 * ```
 *
 * ### Set the updateOn property for all controls in a form array
 *
 *  ### 为表单数组中的所有控件设置 `updateOn` 属性
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * array level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * 该配置对象可以为每个子控件的 `updateOn` 属性设置默认值。
 * 如果在数组级把 `updateOn` 设置为 `'blur'`，则所有子控件的默认值也是 `'blur'`，除非这个子控件显式的指定了另一个 `updateOn` 值。
 *
 * ```ts
 * const arr = new FormArray([
 *    new FormControl()
 * ], {updateOn: 'blur'});
 * ```
 *
 * ### Adding or removing controls from a form array
 *
 * ### 从表单数组中添加或删除控件
 *
 * To change the controls in the array, use the `push`, `insert`, `removeAt` or `clear` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that result in strange and unexpected behavior such
 * as broken change detection.
 *
 * 要改变数组中的控件列表，可以使用 `FormArray` 本身的 `push`、`insert`、`removeAt` 或 `clear` 方法。这些方法能确保表单数组正确的跟踪这些子控件。
 * 不要直接修改实例化 `FormArray` 时传入的那个 `AbstractControl` 数组，否则会导致奇怪的、非预期的行为，比如破坏变更检测机制。
 *
 * @publicApi
 */
export class FormArray extends AbstractControl {
  /**
   * Creates a new `FormArray` instance.
   *
   * 创建一个新的 `FormArray` 实例
  *
  * @param controls An array of child controls. Each child control is given an index
   * where it is registered.
   *
   * 一个子控件数组。在注册后，每个子控件都会有一个指定的索引。
   *
  * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * 一个同步验证器函数或其数组，或者一个包含验证函数和验证触发器的 `AbstractControlOptions` 对象。
   *
  * @param asyncValidator A single async validator or array of async validator functions
   *
   * 单个的异步验证器函数或其数组。
   *
  */
  constructor(
      public controls: AbstractControl[],
      validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null) {
    super(
        coerceToValidator(validatorOrOpts),
        coerceToAsyncValidator(asyncValidator, validatorOrOpts));
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * 获取数组中指定 `index` 处的 `AbstractControl`。
   *
   * @param index Index in the array to retrieve the control
   *
   * 要获取的控件在数组中的索引
   */
  at(index: number): AbstractControl {
    return this.controls[index];
  }

  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * 在数组的末尾插入一个新的 `AbstractControl`。
   *
   * @param control Form control to be inserted
   *
   * 要插入的表单控件
   *
   */
  push(control: AbstractControl): void {
    this.controls.push(control);
    this._registerControl(control);
    this.updateValueAndValidity();
    this._onCollectionChange();
  }

  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * 在数组中的指定 `index` 处插入一个新的 `AbstractControl`。
   *
   * @param index Index in the array to insert the control
   *
   * 要插入该控件的索引序号
   *
   * @param control Form control to be inserted
   *
   * 要插入的表单控件
   *
   */
  insert(index: number, control: AbstractControl): void {
    this.controls.splice(index, 0, control);

    this._registerControl(control);
    this.updateValueAndValidity();
  }

  /**
   * Remove the control at the given `index` in the array.
   *
   * 移除位于数组中的指定 `index` 处的控件。
   *
   * @param index Index in the array to remove the control
   *
   * 要移除的控件在数组中的索引
   *
   */
  removeAt(index: number): void {
    if (this.controls[index]) this.controls[index]._registerOnCollectionChange(() => {});
    this.controls.splice(index, 1);
    this.updateValueAndValidity();
  }

  /**
   * Replace an existing control.
   *
   * 替换现有控件。
   *
   * @param index Index in the array to replace the control
   *
   * 要替换的控件在数组中的索引
   *
   * @param control The `AbstractControl` control to replace the existing control
   *
   * 要用来替换现有控件的 `AbstractControl` 控件
   */
  setControl(index: number, control: AbstractControl): void {
    if (this.controls[index]) this.controls[index]._registerOnCollectionChange(() => {});
    this.controls.splice(index, 1);

    if (control) {
      this.controls.splice(index, 0, control);
      this._registerControl(control);
    }

    this.updateValueAndValidity();
    this._onCollectionChange();
  }

  /**
   * Length of the control array.
   *
   * 控件数组的长度。
   */
  get length(): number {
    return this.controls.length;
  }

  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * 设置此 `FormArray` 的值。它接受一个与控件结构相匹配的数组。
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * 该方法会执行严格检查，如果你视图设置不存在或被排除出去的控件的值，就会抛出错误。
   *
   * @usageNotes
   *
   * ### Set the values for the controls in the form array
   *
   * ### 设置表单数组中各个控件的值
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   *
   * 要传给这些控件的值的数组
   *
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * 当值变化时，此配置项会决定该控件会如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   *
   *   `onlySelf`:：如果为 `true`，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   *    `emitEvent`：如果为 `true` 或未提供（默认），则当控件值发生变化时，`statusChanges` 和 `valueChanges` 这两个 `Observable` 分别会以最近的状态和值发出事件。
   * 如果为 `false` 则不发出事件。
   * 该配置项会被传给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   */
  setValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this._checkAllValuesPresent(value);
    value.forEach((newValue: any, index: number) => {
      this._throwIfControlMissing(index);
      this.at(index).setValue(newValue, {onlySelf: true, emitEvent: options.emitEvent});
    });
    this.updateValueAndValidity(options);
  }

  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * 修补此 `FormArray` 的值。它接受一个与该控件的结构相匹配的数组，并尽量把它们的值匹配到组中正确的控件上。
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * 它能接受数组的超集和子集，而不会抛出错误。
   *
   * @usageNotes
   *
   * ### Patch the values for controls in a form array
   *
   * ### 修补表单数组中各个控件的值
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   *
   * 由各个控件最近的值组成的数组
   *
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * 在修补了该值之后，此配置项会决定控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   *
   *   `onlySelf`:：如果为 `true`，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   *    `emitEvent`：如果为 `true` 或未提供（默认），则当控件值发生变化时，`statusChanges` 和 `valueChanges` 这两个 `Observable` 分别会以最近的状态和值发出事件。
   * 如果为 `false` 则不发出事件。
   * 该配置项会被传给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   */
  patchValue(value: any[], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    value.forEach((newValue: any, index: number) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {onlySelf: true, emitEvent: options.emitEvent});
      }
    });
    this.updateValueAndValidity(options);
  }

  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * 重置这个 `FormArray`，把它的各级子控件都标记为 `pristine` 和 `untouched`，并把它们的值都设置为 `null`。
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * 你可以通过传入一个与表单结构相匹配的状态数组，来把表单重置为特定的状态。
   * 每个状态可以是一个单独的值，也可以是一个同时具有值和禁用状态的表单状态对象。
   *
   * @usageNotes
   *
   * ### Reset the values in a form array
   *
   * ### 重置表单数组中的各个值
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(this.arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ### 重置表单数组中的各个值和第一个控件的禁用状态
   *
   * ```
   * this.arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(this.arr.value);  // ['name', 'last name']
   * console.log(this.arr.get(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   *
   * 各个控件值的数组
   *
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * 当值变化时，此配置项会决定该控件如何传播变更以及发出事件。
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   *
   *   `onlySelf`:：如果为 `true`，则每个变更仅仅影响当前控件，而不会影响父控件。默认为 `false`。
   *
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   *    `emitEvent`：如果为 `true` 或未提供（默认），则当控件值发生变化时，`statusChanges` 和 `valueChanges` 这两个 `Observable` 分别会以最近的状态和值发出事件。
   * 如果为 `false` 则不发出事件。
   * 该配置项会被传给 {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} 方法。
   *
   */
  reset(value: any = [], options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    this._forEachChild((control: AbstractControl, index: number) => {
      control.reset(value[index], {onlySelf: true, emitEvent: options.emitEvent});
    });
    this._updatePristine(options);
    this._updateTouched(options);
    this.updateValueAndValidity(options);
  }

  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * 这个 `FormArray` 的聚合值，包括所有已禁用的控件。
   *
   * Reports all values regardless of disabled status.
   * For enabled controls only, the `value` property is the best way to get the value of the array.
   *
   * 获取所有控件的值而不管其禁用状态。
   * 如果只想获取已启用的控件的值，则最好使用 `value` 属性来获取此数组的值。
   */
  getRawValue(): any[] {
    return this.controls.map((control: AbstractControl) => {
      return control instanceof FormControl ? control.value : (<any>control).getRawValue();
    });
  }

  /**
   * Remove all controls in the `FormArray`.
   *
   * @usageNotes
   * ### Remove all elements from a FormArray
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.length);  // 2
   *
   * arr.clear();
   * console.log(arr.length);  // 0
   * ```
   *
   * It's a simpler and more efficient alternative to removing all elements one by one:
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   *
   * while (arr.length) {
   *    arr.removeAt(0);
   * }
   * ```
   */
  clear(): void {
    if (this.controls.length < 1) return;
    this._forEachChild((control: AbstractControl) => control._registerOnCollectionChange(() => {}));
    this.controls.splice(0);
    this.updateValueAndValidity();
  }

  /** @internal */
  _syncPendingControls(): boolean {
    let subtreeUpdated = this.controls.reduce((updated: boolean, child: AbstractControl) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({onlySelf: true});
    return subtreeUpdated;
  }

  /** @internal */
  _throwIfControlMissing(index: number): void {
    if (!this.controls.length) {
      throw new Error(`
        There are no form controls registered with this array yet.  If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `);
    }
    if (!this.at(index)) {
      throw new Error(`Cannot find form control at index ${index}`);
    }
  }

  /** @internal */
  _forEachChild(cb: Function): void {
    this.controls.forEach((control: AbstractControl, index: number) => {
      cb(control, index);
    });
  }

  /** @internal */
  _updateValue(): void {
    (this as {value: any}).value =
        this.controls.filter((control) => control.enabled || this.disabled)
            .map((control) => control.value);
  }

  /** @internal */
  _anyControls(condition: Function): boolean {
    return this.controls.some((control: AbstractControl) => control.enabled && condition(control));
  }

  /** @internal */
  _setUpControls(): void {
    this._forEachChild((control: AbstractControl) => this._registerControl(control));
  }

  /** @internal */
  _checkAllValuesPresent(value: any): void {
    this._forEachChild((control: AbstractControl, i: number) => {
      if (value[i] === undefined) {
        throw new Error(`Must supply a value for form control at index: ${i}.`);
      }
    });
  }

  /** @internal */
  _allControlsDisabled(): boolean {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }
    return this.controls.length > 0 || this.disabled;
  }

  private _registerControl(control: AbstractControl) {
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
  }
}
