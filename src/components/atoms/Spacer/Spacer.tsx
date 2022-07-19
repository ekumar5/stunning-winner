import React from 'react';
import { View as RNView } from 'react-native';
import { SpacerProps } from './Spacer.props';

/**
 * Adds an invisible square View from react-native. Useful for spacing UI.
 */
const Spacer = ({ size, style, ...rest }: SpacerProps) => {
  return <RNView style={[{ width: size, height: size }, style]} {...rest} />;
};

export default Spacer;
