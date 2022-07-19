import React, { forwardRef } from 'react';
import FormError from '../../atoms/FormError/FormError';
import TextInput from '../../atoms/TextInput/TextInput';
import { FormInputProps } from './FormInput.props';

/**
 * Text input field to be used in a form. This component must be used as a value for `component`
 * prop of a Field.
 *
 * @see Field
 * @see TextInput
 * @see {@link https://final-form.org/docs/react-final-form/types/FieldProps}
 * @see {@link https://callstack.github.io/react-native-paper/text-input.html}
 */
const FormInput = forwardRef<typeof TextInput, FormInputProps>(
  ({ input, meta, compact, errorOnChange, ...rest }: FormInputProps, ref) => (
    <>
      <TextInput
        // @ts-ignore
        ref={ref}
        value={input.value}
        error={meta.touched && meta.error}
        onChangeText={input.onChange}
        // @ts-ignore
        onBlur={input.onBlur}
        // @ts-ignore
        onFocus={input.onFocus}
        {...rest}
      />
      <FormError
        compact={compact}
        visible={errorOnChange ? !!meta.error : !!(meta.touched && meta.error)}
        errorId={meta.error}
      />
    </>
  ),
);

export default FormInput;
