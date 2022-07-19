import color from 'color';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckboxProps } from './Checkbox.props';
import { Container } from './Checkbox.styles';

/**
 * Renders a checkbox that can be checked and unchecked. This is a controlled component.
 */
const Checkbox = ({ checked, style, size, onPress }: CheckboxProps) => {
  const theme = useTheme();
  const checkedColor = theme.colors.primary;
  const uncheckedColor = color(theme.colors.text)
    .alpha(theme.dark ? 0.7 : 0.54)
    .rgb()
    .string();

  return (
    <Container style={style}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Icon
          size={size}
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          color={checked ? checkedColor : uncheckedColor}
        />
      </TouchableWithoutFeedback>
    </Container>
  );
};

Checkbox.defaultProps = {
  size: 24,
};

export default Checkbox;
