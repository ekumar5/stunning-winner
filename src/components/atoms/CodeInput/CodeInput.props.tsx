import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CodeInputProps = {
  /**
   * Digits of pins in the OTP
   */
  pinCount: number;
  /**
   * Style of the input fields
   */
  codeInputFieldStyle?: StyleProp<TextStyle>;
  /**
   * Style of highlighted status for input fields
   */
  codeInputHighlightStyle?: StyleProp<TextStyle>;
  /**
   * Callback function
   * Trigger when all fields of the OTP has been filled
   *
   * @param code The verification code
   */
  onCodeFilled?: (code: string) => void;
  /**
   * Callback function
   * Trigger when a field of the OTP is changed
   *
   * @param code The verification code
   */
  onCodeChanged?: (code: string) => void;
  /**
   * If keyboard is automatically brought up when OTP is loaded.
   */
  autoFocusOnLoad?: boolean;
  /**
   * Initial pin code
   */
  code?: string;
  /**
   * Secure input text
   */
  secureTextEntry?: boolean;
  /**
   * Set editable for inputs
   */
  editable?: boolean;
  /**
   * Type of the keyboard
   */
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  /**
   * Placeholder character to fill all inputs when the OTP is empty
   */
  placeholderCharacter?: string;
  /**
   * Placeholder text color of inputs
   */
  placeholderTextColor?: string;
  /**
   * Style of the OTP container view
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The highlight (and cursor on iOS) color of the text input.
   */
  selectionColor?: string;
  /**
   * If inputs are automatically cleared.
   */
  clearInputs?: boolean;

  /**
   * Keyboard appearance. The value can be 'default', 'dark' or 'light'.
   */
  keyboardAppearance?: 'default' | 'dark' | 'light';
};
