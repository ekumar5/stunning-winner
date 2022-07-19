import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ScreenTemplateProps } from './ScreenTemplate.props';
import { styles } from './ScreenTemplate.styles';

const ScreenTemplate = ({
  center,
  barStyle,
  style,
  ...restProps
}: ScreenTemplateProps) => {
  const theme = useTheme();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
      <StatusBar barStyle={barStyle} backgroundColor={theme.colors.primary} />
      <SafeAreaView
        style={[styles.body, center && styles.center, style]}
        {...restProps}
      />
    </>
  );
};

ScreenTemplate.defaultProps = {
  barStyle: 'light-content',
  center: false,
};

export default ScreenTemplate;
