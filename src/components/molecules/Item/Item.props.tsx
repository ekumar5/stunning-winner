import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ItemProps = {
  disabled?: boolean;
  testID?: string;
  /**
   * Title text for the list item.
   */
  title: React.ReactNode;
  /**
   * Name of icon to show on the left. Does nothing if `left` prop is specified
   */
  iconLeft?: string;
  /**
   * Name of icon to show on the right. Does nothing if `right` prop is specified
   */
  iconRight?: string;
  /**
   * Whether to show a loading indicator on the left. Does nothing if `left` is specified
   */
  loading?: boolean;
  /**
   * Description text for the list item or callback which returns a React element to display the
   * description.
   */
  description?: React.ReactNode | null;
  /**
   * Callback which returns a React element to display on the left side.
   */
  left?:
    | ((props: {
        color: string;
        style?: {
          marginRight: number;
          marginVertical?: number;
        };
      }) => React.ReactNode)
    | null;
  /**
   * Callback which returns a React element to display on the right side.
   */
  right?:
    | ((props: {
        color: string;
        style?: {
          marginRight: number;
          marginVertical?: number;
        };
      }) => React.ReactNode)
    | null;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Style that is passed to the wrapping TouchableRipple element.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style that is passed to Title element.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Style that is passed to Description element.
   */
  descriptionStyle?: StyleProp<TextStyle>;
  /**
   * Truncate Title text such that the total number of lines does not
   * exceed this number.
   */
  titleNumberOfLines?: number;
  /**
   * Truncate Description text such that the total number of lines does not
   * exceed this number.
   */
  descriptionNumberOfLines?: number;
  /**
   * Ellipsize Mode for the Title
   */
  titleEllipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  /**
   * Ellipsize Mode for the Description
   */
  descriptionEllipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
};
