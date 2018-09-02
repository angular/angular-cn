/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken, ɵisObservable as isObservable, ɵisPromise as isPromise} from '@angular/core';
import {Observable, forkJoin, from} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncValidatorFn, ValidationErrors, Validator, ValidatorFn} from './directives/validators';
import {AbstractControl, FormControl} from './model';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

/**
 * @description
 * An `InjectionToken` for registering additional synchronous validators used with `AbstractControl`s.
 *
 * 一个 `InjectionToken`，用于注册额外的同步验证器，供 `AbstractControl` 使用。
 *
 * @see `NG_ASYNC_VALIDATORS`
 * 
 * @usageNotes
 * 
 * ### Providing a custom validator
 *
 * ### 提供自定义验证器
 * 
 * The following example registers a custom validator directive. Adding the validator to the 
 * existing collection of validators requires the `multi: true` option.
 *
 * 下面的例子注册了一个自定义验证器指令。要把该验证器添加到现存的验证器集合中，需要使用 `multi: true` 选项。
 *
 * ```typescript
 * @Directive({
 *   selector: '[customValidator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(control: AbstractControl): ValidationErrors | null {
 *     return { 'custom': true };
 *   }
 * }
 * ```
 *
 */
export const NG_VALIDATORS = new InjectionToken<Array<Validator|Function>>('NgValidators');

/**
 * @description
 * An `InjectionToken` for registering additional asynchronous validators used with `AbstractControl`s.
 *
 * 一个 `InjectionToken`，用于注册额外的异步验证器，供 `AbstractControl` 使用。
 *
 * @see `NG_VALIDATORS`
 * 
 */
export const NG_ASYNC_VALIDATORS =
    new InjectionToken<Array<Validator|Function>>('NgAsyncValidators');

const EMAIL_REGEXP =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

/**
 * @description
 * Provides a set of built-in validators that can be used by form controls.
 *
 * 提供一组内置验证器，可用于各种表单控件。
 *
 * A validator is a function that processes a `FormControl` or collection of
 * controls and returns an error map or null. A null map means that validation has passed.
 *
 * 验证器就是一个函数，它可以处理单个 `FormControl` 好一组控件，并返回一个错误映射表（map）或 null。null 表示验证已通过了。
 *
 * @see [Form Validation](/guide/form-validation)
 *
 * [表单验证](/guide/form-validation)
 */
export class Validators {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   * The validator exists only as a function and not as a directive.
   *
   * 此验证器要求控件的值大于或等于指定的数字。
   * 它只有函数形式，没有指令形式。
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ### 验证至少为 3
   *
   * ```typescript
   * const control = new FormControl(2, Validators.min(3));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `min` 属性的映射表（map），否则为 `null`。
   */
  static min(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value < min ? {'min': {'min': min, 'actual': control.value}} : null;
    };
  }

  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   * The validator exists only as a function and not as a directive.
   *
   * 此验证器要求控件的值小于等于指定的数字。
   * 它只有函数形式，没有指令形式。
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ### 验证最大为 15
   *
   * ```typescript
   * const control = new FormControl(16, Validators.max(15));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `max` 属性的映射表（map），否则为 `null`。
   *
   */
  static max(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value) && value > max ? {'max': {'max': max, 'actual': control.value}} : null;
    };
  }

  /**
   * @description
   * Validator that requires the control have a non-empty value.
   *
   * 此验证器要求控件具有非空值。
   *
   * @usageNotes
   *
   * ### Validate that the field is non-empty
   *
   * ### 验证该字段不是空的
   *
   * ```typescript
   * const control = new FormControl('', Validators.required);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map with the `required` property
   * if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `required` 属性的映射表（map），否则为 `null`。
   */
  static required(control: AbstractControl): ValidationErrors|null {
    return isEmptyInputValue(control.value) ? {'required': true} : null;
  }

  /**
   * @description
   * Validator that requires the control's value be true. This validator is commonly
   * used for required checkboxes.
   *
   * 此验证器要求控件的值为真。它通常用来验证检查框。
   *
   * @usageNotes
   *
   * ### Validate that the field value is true
   *
   * ### 验证字段值为真
   *
   * ```typescript
   * const control = new FormControl('', Validators.requiredTrue);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map that contains the `required` property
   * set to `true` if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `required` 属性、值为 `true` 的映射表（map），否则为 `null`。
   */
  static requiredTrue(control: AbstractControl): ValidationErrors|null {
    return control.value === true ? null : {'required': true};
  }

  /**
   * @description
   * Validator that requires the control's value pass an email validation test.
   *
   * 此验证器要求控件的值能通过 email 格式验证。
   *
   * @usageNotes
   *
   * ### Validate that the field matches a valid email pattern
   *
   * ### 验证该字段匹配有效的 email 格式。
   *
   * ```typescript
   * const control = new FormControl('bad@', Validators.email);
   *
   * console.log(control.errors); // {email: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `email` 属性的映射表（map），否则为 `null`。
   *
   */
  static email(control: AbstractControl): ValidationErrors|null {
    if (isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }
    return EMAIL_REGEXP.test(control.value) ? null : {'email': true};
  }

  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. This validator is also provided by default if you use the
   * the HTML5 `minlength` attribute.
   *
   * 此验证器要求控件值的长度大于等于所指定的最小长度。当使用 HTML5 的 `minlength` 属性时，此验证器也会生效。
   *
   * @usageNotes
   *
   * ### Validate that the field has a minimum of 3 characters
   *
   * ### 验证该字段至少有 3 个字符
   *
   * ```typescript
   * const control = new FormControl('ng', Validators.minLength(3));
   *
   * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
   * ```
   *
   * ```html
   * <input minlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `minlength` if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `minlength` 属性的映射表（map），否则为 `null`。
   *
   */
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;
      return length < minLength ?
          {'minlength': {'requiredLength': minLength, 'actualLength': length}} :
          null;
    };
  }

  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. This validator is also provided by default if you use the
   * the HTML5 `maxlength` attribute.
   *
   * 此验证器要求控件值的长度小于等于所指定的最大长度。当使用 HTML5 的 `maxlength` 属性时，此验证器也会生效。
   *
   * @usageNotes
   *
   * ### Validate that the field has maximum of 5 characters
   *
   * ### 验证该字段最多具有 5 个字符
   *
   * ```typescript
   * const control = new FormControl('Angular', Validators.maxLength(5));
   *
   * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
   * ```
   *
   * ```html
   * <input maxlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `maxlength` property if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `maxlength` 属性的映射表（map），否则为 `null`。
   */
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      return length > maxLength ?
          {'maxlength': {'requiredLength': maxLength, 'actualLength': length}} :
          null;
    };
  }

  /**
   * @description
   * Validator that requires the control's value to match a regex pattern. This validator is also
   * provided
   * by default if you use the HTML5 `pattern` attribute.
   *
   * 此验证器要求控件的值匹配某个正则表达式。当使用 HTML5 的 `pattern` 属性时，它也会生效。
   *
   * @usageNotes
   *
   * ### Validate that the field only contains letters or spaces
   *
   * ### 验证该字段只包含字母或空格
   *
   * ```typescript
   * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
   *
   * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
   * ```
   *
   * ```html
   * <input pattern="[a-zA-Z ]*">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `pattern` property if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回一个带有 `pattern` 属性的映射表（map），否则为 `null`。
   *
   */
  static pattern(pattern: string|RegExp): ValidatorFn {
    if (!pattern) return Validators.nullValidator;
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') regexStr += '^';

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value: string = control.value;
      return regex.test(value) ? null :
                                 {'pattern': {'requiredPattern': regexStr, 'actualValue': value}};
    };
  }

  /**
   * @description
   * Validator that performs no operation.
   *
   * 此验证器什么也不做。
   */
  static nullValidator(c: AbstractControl): ValidationErrors|null { return null; }

  /**
   * @description
   * Compose multiple validators into a single function that returns the union
   * of the individual error maps for the provided control.
   *
   * 把多个验证器合并成一个函数，它会返回指定控件的各个错误映射表的并集。
   *
   * @returns A validator function that returns an error map with the
   * merged error maps of the validators if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回各个验证器所返回错误对象的一个并集，否则为 `null`。
   *
   */
  static compose(validators: null): null;
  static compose(validators: (ValidatorFn|null|undefined)[]): ValidatorFn|null;
  static compose(validators: (ValidatorFn|null|undefined)[]|null): ValidatorFn|null {
    if (!validators) return null;
    const presentValidators: ValidatorFn[] = validators.filter(isPresent) as any;
    if (presentValidators.length == 0) return null;

    return function(control: AbstractControl) {
      return _mergeErrors(_executeValidators(control, presentValidators));
    };
  }

  /**
   * @description
   * Compose multiple async validators into a single function that returns the union
   * of the individual error objects for the provided control.
   *
   * 把多个异步验证器合并成一个函数，它会返回指定控件的各个错误映射表的并集。
   *
   * @returns A validator function that returns an error map with the
   * merged error objects of the async validators if the validation check fails, otherwise `null`.
   *
   * 如果验证失败，则此验证器函数返回各异步验证器所返回错误对象的一个并集，否则为 `null`。
  */
  static composeAsync(validators: (AsyncValidatorFn|null)[]): AsyncValidatorFn|null {
    if (!validators) return null;
    const presentValidators: AsyncValidatorFn[] = validators.filter(isPresent) as any;
    if (presentValidators.length == 0) return null;

    return function(control: AbstractControl) {
      const observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
      return forkJoin(observables).pipe(map(_mergeErrors));
    };
  }
}

function isPresent(o: any): boolean {
  return o != null;
}

export function toObservable(r: any): Observable<any> {
  const obs = isPromise(r) ? from(r) : r;
  if (!(isObservable(obs))) {
    throw new Error(`Expected validator to return Promise or Observable.`);
  }
  return obs;
}

function _executeValidators(control: AbstractControl, validators: ValidatorFn[]): any[] {
  return validators.map(v => v(control));
}

function _executeAsyncValidators(control: AbstractControl, validators: AsyncValidatorFn[]): any[] {
  return validators.map(v => v(control));
}

function _mergeErrors(arrayOfErrors: ValidationErrors[]): ValidationErrors|null {
  const res: {[key: string]: any} =
      arrayOfErrors.reduce((res: ValidationErrors | null, errors: ValidationErrors | null) => {
        return errors != null ? {...res !, ...errors} : res !;
      }, {});
  return Object.keys(res).length === 0 ? null : res;
}
