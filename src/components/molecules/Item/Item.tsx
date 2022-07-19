import React from 'react';
import { ActivityIndicator, List } from 'react-native-paper';
import { ItemProps } from './Item.props';
import { Icon } from './Item.styles';

/**
 * Wrapper for List.Item from react-native-paper.
 *
 * @see {@link https://callstack.github.io/react-native-paper/list-item.html}
 */
const Item = ({
  disabled,
  iconLeft,
  iconRight,
  loading,
  ...rest
}: ItemProps) => {
  let left, right;

  if (iconLeft) {
    left = () => <Icon icon={iconLeft} />;
  }
  if (iconRight) {
    right = () => <Icon icon={iconRight} />;
  }
  if (loading) {
    left = () => <ActivityIndicator />;
  }

  // @ts-ignore
  return <List.Item disabled={disabled} left={left} right={right} {...rest} />;
};

export default Item;
