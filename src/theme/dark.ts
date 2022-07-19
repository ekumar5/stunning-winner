import color from 'color';

const darkTheme: ReactNativePaper.Theme = {
  dark: true,
  mode: 'adaptive',
  // @ts-ignore. Dark theme here is only used not as a full theme, but just
  // a collection of props that differ
  colors: {
    background: '#121212',
    surface: '#424242',
    error: '#F04984',
    text: '#fff',
    textInverted: '#000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: color('#fff').alpha(0.38).rgb().string(),
    placeholder: color('#fff').alpha(0.54).rgb().string(),
  },
};

export default darkTheme;
