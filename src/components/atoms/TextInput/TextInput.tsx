import React, { forwardRef } from 'react';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { TextInputProps } from './TextInput.props';

/**
 * Wrapper for TextInput from react-native-paper.
 *
 * @see {@link https://callstack.github.io/react-native-paper/text-input.html}
 * @see {@link https://reactnative.dev/docs/textinput#props}
 */
const TextInput = forwardRef<typeof PaperTextInput, TextInputProps>(
  (props, ref) => {
    const theme = useTheme();

    return (
      <PaperTextInput
        // @ts-ignore
        ref={ref}
        selectionColor={theme.colors.primary}
        autoCorrect={false}
        keyboardAppearance={theme.dark ? 'dark' : 'light'}
        {...props}
      />
    );
  },
);

export default TextInput;
