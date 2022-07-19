import color from 'color';
import { Platform } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { FontConfig } from './types';

const fontConfig: FontConfig = {
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0179FE',
    accent: '#0179FE',
    background: '#f6f6f6',
    surface: '#fff',
    error: '#F04984',
    text: '#000',
    textInverted: '#fff',
    headerText: '#fff',
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: color('#000').alpha(0.26).rgb().string(),
    placeholder: color('#000').alpha(0.54).rgb().string(),
    backdrop: color('#000').alpha(0.5).rgb().string(),
    notification: '#f50057',
  },
  fonts: Platform.select<ReactNativePaper.ThemeFonts>(fontConfig),
  animation: {
    scale: 1.0,
  },
};

export default theme;
