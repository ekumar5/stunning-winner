import { FieldValidator } from 'final-form';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

type Validator = FieldValidator<any>;

export const composeValidators = (...validators: Validator[]) => (
  value: any,
  allValues: any,
  meta: any,
) =>
  validators.reduce(
    (error, validator) => error || validator(value, allValues, meta),
    undefined,
  );

export const requiredValidator: Validator = (value) =>
  !value ? 'errors:form.required' : undefined;

export const emailValidator: Validator = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'errors:form.invalidEmail'
    : undefined;

type MustMatchFieldValidator = (otherFieldName: string) => Validator;

export const mustMatchFieldValidator: MustMatchFieldValidator = (
  otherFieldName,
) => (value: any, allValues: any) =>
  value !== allValues[otherFieldName]
    ? 'errors:form.fieldsDontMatch'
    : undefined;

type LengthValidator = (length: number) => Validator;

export const minLengthValidator: LengthValidator = (length: number) => (
  value,
) => (value.length < length ? 'errors:form.tooShort' : undefined);

export const exactLengthValidator: LengthValidator = (length) => (value) =>
  value.length < length ? 'errors:form.tooShort' : undefined;

export const phoneValidator: Validator = (value) =>
  !parsePhoneNumberFromString(value)?.isValid()
    ? 'errors:form.badPhoneNumber'
    : undefined;
