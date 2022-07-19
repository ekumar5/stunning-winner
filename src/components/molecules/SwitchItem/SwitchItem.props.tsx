import { ItemProps } from '../Item/Item.props';

export type SwitchItemProps = ItemProps & {
  testID?: string | null;
  /**
   * Function to execute on Item press.
   */
  onPress: () => void;
  /**
   * Function to execute on Switch press. If null, will use onPress.
   */
  onSwitchPress?: () => void;
  /**
   * Value of the switch.
   */
  value?: boolean;
};
