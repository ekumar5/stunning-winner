import React, { useState } from 'react';
import {
  Provider as PaperProvider,
  Switch,
  Text,
  ToggleButton,
} from 'react-native-paper';
import { View } from 'react-native';
import { styles } from './styles';
import defaultTheme from '../../src/theme/default';
import darkTheme from '../../src/theme/dark';
import themes from '../../src/theme';

const ThemeSwitcher = ({ children, ...rest }) => {
  const [{ dark, color }, setTheme] = useState({ color: 'red', dark: false });
  let theme = defaultTheme;

  const selectedTheme = themes[color] || null;

  if (selectedTheme) {
    theme = {
      ...theme,
      ...selectedTheme,
      colors: {
        ...theme.colors,
        ...selectedTheme.colors,
      },
    };
  }

  if (dark) {
    theme = {
      ...theme,
      ...darkTheme,
      colors: {
        ...theme.colors,
        ...darkTheme.colors,
      },
    };
  }
  return (
    <PaperProvider {...rest} theme={theme}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        {children}
        <View style={styles.switch}>
          <ToggleButton.Group
            value={color}
            onValueChange={(newColor) => setTheme({ color: newColor, dark })}>
            {Object.keys(themes).map((themeKey) => (
              <ToggleButton
                icon="square"
                color={themes[themeKey].colors.accent}
                value={themeKey}
              />
            ))}
          </ToggleButton.Group>
          <Text>Dark Mode</Text>
          <Switch
            value={dark}
            onValueChange={() => setTheme({ color, dark: !dark })}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ThemeSwitcher;
