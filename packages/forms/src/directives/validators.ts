/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, Input, OnChanges, SimpleChanges, StaticProvider, forwardRef} from '@angular/core';
import {Observable} from 'rxjs';

import {AbstractControl} from '../model';
import {NG_VALIDATORS, Validators} from '../validators';


/** @experimental */
export type ValidationErrors = {
  [key: string]: any
};

/**
 * An interface that can be implemented by classes that can act as validators.
 *
 * 一个接口，实现了它的类可以扮演验证器的角色。
 *
 * ## Usage
 *
 * ## 用法
 *
 * ```typescript
 * @Directive({
 *   selector: '[custom-validator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(c: Control): {[key: string]: any} {
 *     return {"custom": true};
 *   }
 * }
 * ```
 *
 *
 */
export interface Validator {
  validate(c: AbstractControl): ValidationErrors|null;
  registerOnValidatorChange?(fn: () => void): void;
}

/** @experimental */
export interface AsyncValidator extends Validator {
  validate(c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null>;
}

export const REQUIRED_VALIDATOR: StaticProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredValidator),
  multi: true
};

export const CHECKBOX_REQUIRED_VALIDATOR: StaticProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckboxRequiredValidator),
  multi: true
};


/**
 * A Directive that adds the `required` validator to any controls marked with the
 * `required` attribute, via the `NG_VALIDATORS` binding.
 *
 * 该指令会借助 `NG_VALIDATORS` 绑定把 `required` 验证器添加到任何带 `required` 属性的控件上。
 *
 * ### Example
 *
 * ### 例子
 *
 * ```
 * <input name="fullName" ngModel required>
 * ```
 *
 *
 */
@Directive({
  selector:
      ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
  providers: [REQUIRED_VALIDATOR],
  host: {'[attr.required]': 'required ? "" : null'}
})
export class RequiredValidator implements Validator {
  // TODO(issue/24571): remove '!'.
  private _required !: boolean;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  @Input()
  get required(): boolean|string { return this._required; }

  set required(value: boolean|string) {
    this._required = value != null && value !== false && `${value}` !== 'false';
    if (this._onChange) this._onChange();
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.required ? Validators.required(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
}


/**
 * A Directive that adds the `required` validator to checkbox controls marked with the
 * `required` attribute, via the `NG_VALIDATORS` binding.
 *
 * 该指令会借助 `NG_VALIDATORS` 绑定把 `required` 验证器添加到任何带有 `required` 属性的检查框控件上。
 *
 * ### Example
 *
 * ### 例子
 *
 * ```
 * <input type="checkbox" name="active" ngModel required>
 * ```
 *
 * @experimental
 */
@Directive({
  selector:
      'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
  providers: [CHECKBOX_REQUIRED_VALIDATOR],
  host: {'[attr.required]': 'required ? "" : null'}
})
export class CheckboxRequiredValidator extends RequiredValidator {
  validate(c: AbstractControl): ValidationErrors|null {
    return this.required ? Validators.requiredTrue(c) : null;
  }
}

/**
 * Provider which adds `EmailValidator` to `NG_VALIDATORS`.
 *
 * 该提供商用于把 `EmailValidator` 添加到 `NG_VALIDATORS` 中。
 */
export const EMAIL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};

/**
 * A Directive that adds the `email` validator to controls marked with the
 * `email` attribute, via the `NG_VALIDATORS` binding.
 *
 * 该指令会借助 `NG_VALIDATORS` 绑定把 `email` 验证器添加到任何带有 `email` 属性的控件上。
 *
 * ### Example
 *
 * ### 例子
 *
 * ```
 * <input type="email" name="email" ngModel email>
 * <input type="email" name="email" ngModel email="true">
 * <input type="email" name="email" ngModel [email]="true">
 * ```
 *
 * @experimental
 */
@Directive({
  selector: '[email][formControlName],[email][formControl],[email][ngModel]',
  providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator {
  // TODO(issue/24571): remove '!'.
  private _enabled !: boolean;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  @Input()
  set email(value: boolean|string) {
    this._enabled = value === '' || value === true || value === 'true';
    if (this._onChange) this._onChange();
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this._enabled ? Validators.email(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
}

export interface ValidatorFn { (c: AbstractControl): ValidationErrors|null; }

export interface AsyncValidatorFn {
  (c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null>;
}

/**
 * Provider which adds `MinLengthValidator` to `NG_VALIDATORS`.
 *
 * 该提供商用于把 `MinLengthValidator` 添加到 `NG_VALIDATORS` 中。
 *
 * ## Example:
 *
 * ## 例子
 *
 * {@example common/forms/ts/validators/validators.ts region='min'}
 */
export const MIN_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinLengthValidator),
  multi: true
};

/**
 * A directive which installs the `MinLengthValidator` for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `minlength` attribute.
 *
 *
 * 该指令会把 `MinLengthValidator` 验证器安装到任何具有 `minlength` 属性的 `formControlName`、
 * `formControl` 或带 `ngModel` 的控件上。
 */
@Directive({
  selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
  providers: [MIN_LENGTH_VALIDATOR],
  host: {'[attr.minlength]': 'minlength ? minlength : null'}
})
export class MinLengthValidator implements Validator,
    OnChanges {
  // TODO(issue/24571): remove '!'.
  private _validator !: ValidatorFn;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  // TODO(issue/24571): remove '!'.
  @Input() minlength !: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('minlength' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.minlength == null ? null : this._validator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.minLength(parseInt(this.minlength, 10));
  }
}

/**
 * Provider which adds `MaxLengthValidator` to `NG_VALIDATORS`.
 *
 * 该提供商用于把 `MaxLengthValidator` 添加到 `NG_VALIDATORS` 中。
 *
 * ## Example:
 *
 * ## 例子：
 *
 * {@example common/forms/ts/validators/validators.ts region='max'}
 */
export const MAX_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxLengthValidator),
  multi: true
};

/**
 * A directive which installs the `MaxLengthValidator` for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `maxlength` attribute.
 *
 *
 * 该指令会把 `MaxLengthValidator` 验证器安装到任何具有 `minlength` 属性的 `formControlName`、
 * `formControl` 或带 `ngModel` 的控件上。
 */
@Directive({
  selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
  providers: [MAX_LENGTH_VALIDATOR],
  host: {'[attr.maxlength]': 'maxlength ? maxlength : null'}
})
export class MaxLengthValidator implements Validator,
    OnChanges {
  // TODO(issue/24571): remove '!'.
  private _validator !: ValidatorFn;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  // TODO(issue/24571): remove '!'.
  @Input() maxlength !: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('maxlength' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.maxlength != null ? this._validator(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
  }
}


export const PATTERN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PatternValidator),
  multi: true
};


/**
 * A Directive that adds the `pattern` validator to any controls marked with the
 * `pattern` attribute, via the `NG_VALIDATORS` binding. Uses attribute value
 * as the regex to validate Control value against.  Follows pattern attribute
 * semantics; i.e. regex must match entire Control value.
 *
 * 该指令会借助 `NG_VALIDATORS` 绑定来把 `pattern` 验证器添加到任何带有 `pattern` 属性的控件上。
 * 它会使用该属性的值作为正则表达式来验证控件的值。
 * 它会遵循 `pattern` 属性的语义，也就是说，该正则表达式必须匹配整个控件值。
 * 
 * ### Example
 *
 * ### 例子
 *
 * ```
 * <input [name]="fullName" pattern="[a-zA-Z ]*" ngModel>
 * ```
 *
 */
@Directive({
  selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
  providers: [PATTERN_VALIDATOR],
  host: {'[attr.pattern]': 'pattern ? pattern : null'}
})
export class PatternValidator implements Validator,
    OnChanges {
  // TODO(issue/24571): remove '!'.
  private _validator !: ValidatorFn;
  // TODO(issue/24571): remove '!'.
  private _onChange !: () => void;

  // TODO(issue/24571): remove '!'.
  @Input() pattern !: string | RegExp;

  ngOnChanges(changes: SimpleChanges): void {
    if ('pattern' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null { return this._validator(c); }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void { this._validator = Validators.pattern(this.pattern); }
}
