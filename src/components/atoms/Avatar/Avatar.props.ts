import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AvatarProps = {
  size: number;
  label?: string;
  title?: string;
  uri?: string | null;
  icon?: string;
  color?: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
