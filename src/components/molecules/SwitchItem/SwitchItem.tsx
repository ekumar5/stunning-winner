import React from 'react';
import { Switch } from 'react-native-paper';
import Item from '../Item/Item';
import { SwitchItemProps } from './SwitchItem.props';
import { Icon } from './SwitchItem.styles';

/**
 * Renders an Item with a controlled Switch on the right
 *
 * @see Item
 * @see {@link https://callstack.github.io/react-native-paper/list-item.html}
 * @see {@link https://callstack.github.io/react-native-paper/switch.html}
 */
const SwitchItem = ({
  onPress,
  value,
  onSwitchPress,
  disabled,
  ...rest
}: SwitchItemProps) => (
  <Item
    disabled={disabled}
    right={() => (
      <Icon>
        <Switch
          disabled={disabled}
          onValueChange={onSwitchPress || onPress}
          value={value}
        />
      </Icon>
    )}
    onPress={onPress}
    {...rest}
  />
);

SwitchItem.defaultProps = {
  loading: false,
};

export default SwitchItem;
