import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styled } from '../../../utils/styled';
import Button from '../../atoms/Button/Button';

export const Container = styled(View)`
  flex: 1;
  margin-horizontal: 24px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: 24px;
`;

export const Message = styled(Text)`
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  margin-top: 16px;
`;
