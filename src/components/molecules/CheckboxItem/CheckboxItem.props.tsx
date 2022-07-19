import { ItemProps } from '../Item/Item.props';

export type CheckboxItemProps = ItemProps & {
  testID?: string | null;
  /**
   * Function to execute on Item press.
   */
  onPress: () => void;
  /**
   * Function to execute on Checkbox press. If null, will use onPress.
   */
  onCheckboxPress?: () => void;
  /**
   * Value of the Checkbox.
   */
  value?: boolean;
};
