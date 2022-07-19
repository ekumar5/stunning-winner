import React from 'react';
import { useTheme } from 'react-native-paper';
import { LogoTypes } from './Logo.props';
import { LogoImage } from './Logo.styles';

/**
 * Shows makeen logo. Depending on theme, dark or light version will be shown.
 *
 * @see {@link https://github.com/DylanVann/react-native-fast-image}
 */
const Logo = ({ style, ...rest }: LogoTypes) => {
  const theme = useTheme();
  const logoSource = theme.dark
    ? require('../../../../assets/images/makeen-logotype-dark-mode.png')
    : require('../../../../assets/images/makeen-logotype.png');

  return (
    <LogoImage
      style={style}
      resizeMode="contain"
      source={logoSource}
      {...rest}
    />
  );
};

export default Logo;
