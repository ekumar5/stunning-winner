import React from 'react';
import CodeInput from '../../atoms/CodeInput/CodeInput';
import FormError from '../../atoms/FormError/FormError';
import { FormCodeInputProps } from './FormCodeInput.props';

/**
 * Code input field to be used in a form. This component must be used as a value for `component`
 * prop of a Field.
 *
 * @see Field
 * @see CodeInput
 * @see {@link https://final-form.org/docs/react-final-form/types/FieldProps}
 * @see {@link https://github.com/tttstudios/react-native-otp-input}
 */
const FormCodeInput = ({
  input,
  meta,
  compact,
  ...rest
}: FormCodeInputProps) => (
  <>
    <CodeInput code={input.value} onCodeChanged={input.onChange} {...rest} />
    <FormError
      compact={compact}
      visible={!!(meta.touched && meta.error)}
      errorId={meta.error}
    />
  </>
);

FormCodeInput.defaultProps = {
  compact: false,
};

export default FormCodeInput;
