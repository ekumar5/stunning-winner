import React from 'react';
import { CodeInputProps } from './CodeInput.props';
import { OTPInputContainer } from './CodeInput.styles';

/**
 * Wrapper for OTPInputView from react-native-otp-input.
 *
 * @see {@link https://github.com/tttstudios/react-native-otp-input}
 */
const CodeInput = ({ style, codeInputFieldStyle, ...rest }: CodeInputProps) => {
  return (
    // @ts-ignore
    <OTPInputContainer
      style={style}
      codeInputFieldStyle={codeInputFieldStyle}
      {...rest}
    />
  );
};

CodeInput.defaultProps = {
  autoFocusOnLoad: true,
};

export default CodeInput;
