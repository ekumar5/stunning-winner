import React from 'react';
import FormError from '../../atoms/FormError/FormError';
import { FormCheckboxProps } from './FormCheckbox.props';
import { StyledCheckbox, StyledItem } from './FormCheckbox.styles';

const FormCheckbox = ({
  input,
  meta,
  style,
  checkboxStyle,
  compact,
  title,
  ...rest
}: FormCheckboxProps) => {
  const toggleCheckbox = () => {
    input.onFocus();
    input.onChange(!input.value);
    input.onBlur();
  };
  return (
    <>
      <StyledItem
        left={() => (
          <StyledCheckbox
            style={checkboxStyle}
            checked={!!input.value}
            onPress={toggleCheckbox}
          />
        )}
        right={null}
        onPress={toggleCheckbox}
        title={title}
        titleNumberOfLines={0}
        style={style}
        {...rest}
      />
      <FormError
        compact={compact}
        visible={!!(meta.touched && meta.error)}
        errorId={meta.error}
      />
    </>
  );
};

FormCheckbox.defaultProps = {
  compact: false,
};

export default FormCheckbox;
