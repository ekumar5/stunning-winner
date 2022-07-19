import { StyleProp, TextStyle } from 'react-native';

export type FormErrorProps = {
  /**
   * i18n resource id of the text to render.
   */
  errorId?: string;
  /**
   * Text to render if errorId is null
   */
  text?: string;
  /**
   * If enabled, will not render anything when not visible. This disabled animation.
   */
  compact?: boolean;
  /**
   * Whether to display the helper text.
   */
  visible?: boolean;
  /**
   * Whether to apply padding to the helper text.
   */
  padding?: 'none' | 'normal';
  style?: StyleProp<TextStyle>;
};
