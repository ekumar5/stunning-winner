import React from 'react';
import { ViewProps } from 'react-native';

export type ScreenTemplateProps = ViewProps & {
  center?: boolean;
  barStyle?: any;
  style?: any;
  children: React.ReactNode;
};
