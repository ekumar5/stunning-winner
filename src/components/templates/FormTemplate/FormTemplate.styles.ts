import { View } from 'react-native';
import { styled } from '../../../utils/styled';
import Logo from '../../atoms/Logo/Logo';

export const Container = styled(View)`
  flex: 1;
  margin-horizontal: 24px;
`;

export const StyledLogo = styled(Logo)`
  margin-top: 36px;
  margin-bottom: 8px;
`;
