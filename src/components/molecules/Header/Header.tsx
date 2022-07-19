import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderProps } from './Header.props';
import { styles } from './Header.styles';

const Header = ({ title, topRight }: HeaderProps) => {
  const { colors, fonts } = useTheme();
  const { goBack, canGoBack } = useNavigation();
  const showBackButton = canGoBack();

  return (
    <View style={{ ...styles.mainContainer, backgroundColor: colors.primary }}>
      {showBackButton && (
        <TouchableOpacity onPress={goBack}>
          <Icon size={24} name="arrow-back" color={colors.headerText} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          ...styles.title,
          ...fonts.medium,
          color: colors.headerText,
          paddingLeft: showBackButton ? 32 : 8,
        }}
        numberOfLines={1}>
        {title}
      </Text>
      {topRight && <View style={styles.topIconContainer}>{topRight()}</View>}
    </View>
  );
};

Header.displayName = 'Header';

export default Header;
