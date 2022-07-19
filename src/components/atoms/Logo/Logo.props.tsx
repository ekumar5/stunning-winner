import { LayoutChangeEvent, StyleProp } from 'react-native';
import {
  ImageStyle,
  OnLoadEvent,
  OnProgressEvent,
  ResizeMode,
} from 'react-native-fast-image';

export type LogoTypes = {
  resizeMode?: ResizeMode;
  fallback?: boolean;
  onLoadStart?: () => void;
  onProgress?: (event: OnProgressEvent) => void;
  onLoad?: (event: OnLoadEvent) => void;
  onError?: () => void;
  onLoadEnd?: () => void;
  style?: StyleProp<ImageStyle>;

  /**
   * onLayout function
   *
   * Invoked on mount and layout changes with
   *
   * {nativeEvent: { layout: {x, y, width, height}}}.
   */
  onLayout?: (event: LayoutChangeEvent) => void;

  /**
   * TintColor
   *
   * If supplied, changes the color of all the non-transparent pixels to the given color.
   */
  tintColor?: number | string;

  /**
   * A unique identifier for this element to be used in UI Automation testing scripts.
   */
  testID?: string;
};
