import { StyleProp, ViewStyle } from 'react-native';

export type CheckboxProps = {
  checked: boolean | undefined;
  style?: StyleProp<ViewStyle>;
  size: number;
  onPress: () => void;
};
