import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { styled } from '../../../utils/styled';

export const AvatarPressableContainer = styled(Pressable)`
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const LabelText = styled(Text)`
  font-size: 14;
  letter-spacing: 0.39;
`;
