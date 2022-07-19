import defaultTheme from './default';

const theme: ReactNativePaper.Theme = {
  ...defaultTheme,
  roundness: 16,
  colors: {
    ...defaultTheme.colors,
    primary: '#6200EE',
    accent: '#6200EE',
  },
};

export default theme;
