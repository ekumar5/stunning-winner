import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styled } from '../../../utils/styled';

const { width: screenWidth } = Dimensions.get('window');

const logoMargin = 64;

export const LogoImage = styled(FastImage)`
  width: ${screenWidth - logoMargin * 2};
  height: ${(screenWidth - logoMargin * 2) / 5.87};
  margin-horizontal: ${logoMargin};
`;
