import { ReactElement } from 'react';

declare global {
  // global augmentation to add our own colors and fonts to paper's useTheme()
  namespace ReactNativePaper {
    interface ThemeColors {
      textInverted: string;
      onBackground: string;
      headerText: string;
    }

    interface ThemeFonts {
      title?: ThemeFont;
      bold?: ThemeFont;
    }
  }
}

export type ContainerProps = {
  children: ReactElement<any, any>;
};
