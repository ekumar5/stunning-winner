import { Platform } from 'react-native';
import defaultTheme from './default';
import { FontConfig } from './types';

const fontConfig: FontConfig = {
  ios: {
    regular: {
      fontFamily: 'Proxima Nova',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Proxima Nova',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'Proxima Nova',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Proxima Nova',
      fontWeight: 'normal',
    },
  },
  default: {
    regular: {
      fontFamily: 'Proxima-Nova-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Proxima-Nova-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Proxima-Nova-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Proxima-Nova-Regular',
      fontWeight: 'normal',
    },
  },
};

const theme: ReactNativePaper.Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#f54551',
    accent: '#f54551',
  },
  fonts: Platform.select<ReactNativePaper.ThemeFonts>(fontConfig),
};

export default theme;
