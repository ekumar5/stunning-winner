import { observer } from 'mobx-react-lite';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useMst } from '../mobx/useMst';
import themes from '../theme';
import darkTheme from '../theme/dark';
import defaultTheme from '../theme/default';
import { ContainerProps } from './types';

const ThemeProvider: React.FC<ContainerProps> = observer(({ children }) => {
  const { dark, color, syncWithSystem } = useMst().theme;
  const colorScheme = useColorScheme();
  const systemDark = colorScheme === 'dark';
  let theme = defaultTheme;

  const selectedTheme = themes[color] || {};

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

  const darkMode = (syncWithSystem && systemDark) || (!syncWithSystem && dark);

  if (darkMode) {
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
    <StyledThemeProvider theme={theme || defaultTheme}>
      <PaperProvider theme={theme || defaultTheme} children={children} />
    </StyledThemeProvider>
  );
});

export default ThemeProvider;
