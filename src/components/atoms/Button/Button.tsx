import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { ButtonProps } from './Button.props';

/**
 * Wrapper for Button from react-native-paper.
 *
 * @see {@link https://callstack.github.io/react-native-paper/button.html}
 */
const Button = ({ loading, onPress, ...rest }: ButtonProps) => (
  <PaperButton
    onPress={loading ? () => {} : onPress}
    loading={loading}
    {...rest}
  />
);

Button.defaultProps = {
  uppercase: false,
  mode: 'contained',
};

export default Button;
