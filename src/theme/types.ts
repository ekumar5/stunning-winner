import { PlatformOSType } from 'react-native';

export type FontConfig =
  | ({ [platform in PlatformOSType]?: ReactNativePaper.ThemeFonts } & {
      default: ReactNativePaper.ThemeFonts;
    })
  | { [platform in PlatformOSType]: ReactNativePaper.ThemeFonts };

export type Themes = {
  [name: string]: ReactNativePaper.Theme;
};
