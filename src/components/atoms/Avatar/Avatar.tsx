import React from 'react';
import { Image, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AvatarProps } from './Avatar.props';
import { AvatarPressableContainer, LabelText } from './Avatar.styles';

const Avatar = ({
  label,
  title,
  uri,
  icon,
  size,
  color,
  labelStyle,
  onPress,
  style,
}: AvatarProps) => {
  const { colors, fonts } = useTheme();

  const labelToRender = title
    ? title
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
    : label;

  const activeColor = color || colors.textInverted;

  const containerStyle = [
    {
      backgroundColor: colors.surface,
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    style,
  ];

  if (icon) {
    return (
      <AvatarPressableContainer onPress={onPress} style={containerStyle}>
        <Icon name={icon} size={size - 16} color={activeColor} />
      </AvatarPressableContainer>
    );
  }

  if (uri) {
    return (
      <Pressable onPress={onPress}>
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      </Pressable>
    );
  }

  return (
    <AvatarPressableContainer onPress={onPress} style={containerStyle}>
      <LabelText style={[fonts.title, { color: activeColor }, labelStyle]}>
        {labelToRender?.charAt(0).toUpperCase()}
        <LabelText style={[fonts.title, { color: activeColor }, labelStyle]}>
          {labelToRender?.charAt(1).toUpperCase()}
        </LabelText>
      </LabelText>
    </AvatarPressableContainer>
  );
};

export default Avatar;
