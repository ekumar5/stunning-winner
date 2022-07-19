import defaultTheme from './default';

const theme: ReactNativePaper.Theme = {
  ...defaultTheme,
  roundness: 32,
  colors: {
    ...defaultTheme.colors,
    primary: '#00c853',
    accent: '#00c853',
  },
};

export default theme;
