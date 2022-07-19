import { View } from 'react-native';
import { SystemMessage } from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';
import { styled } from '../../../utils/styled';
import TextInput from '../../atoms/TextInput/TextInput';

export const InputContainer = styled(View)`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled(TextInput)`
  flex: 1;
  margin-horizontal: 8px;
  justify-content: center;
`;

export const RightIcon = styled(View)`
  margin-right: 16px;
  margin-left: 8px;
  border-radius: 30px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const LeftIcon = styled(View)`
  margin-right: 8px;
  margin-left: 16px;
  border-radius: 30px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const StyledText = styled(Text)`
  font-size: 10px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors?.placeholder};
`;

export const StyledSystemMessage = styled(SystemMessage).attrs({
  textStyle: {
    textAlign: 'center',
    marginHorizontal: 8,
  },
})``;
