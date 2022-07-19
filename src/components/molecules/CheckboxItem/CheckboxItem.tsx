import React from 'react';
import Item from '../Item/Item';
import { CheckboxItemProps } from './CheckboxItem.props';
import { StyledCheckbox } from './CheckboxItem.styles';

/**
 * Renders an item with a controlled Checkbox on the right
 *
 * @see Checkbox
 * @see {@link https://callstack.github.io/react-native-paper/list-item.html}
 */
const CheckboxItem = ({
  onPress,
  value,
  onCheckboxPress,
  ...rest
}: CheckboxItemProps) => (
  <Item
    right={() => (
      <StyledCheckbox onPress={onCheckboxPress || onPress} checked={value} />
    )}
    onPress={onPress}
    {...rest}
  />
);

CheckboxItem.defaultProps = {
  loading: false,
};

export default CheckboxItem;
