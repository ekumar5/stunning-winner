import OTPInputView from '@twotalltotems/react-native-otp-input';
import { styled } from '../../../utils/styled';

export const OTPInputContainer = styled(OTPInputView).attrs(({ theme }) => ({
  codeInputFieldStyle: {
    width: 30,
    fontSize: 24,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 3,
    color: theme.colors.text,
  },
  codeInputHighlightStyle: {
    borderColor: theme.colors.primary,
  },
}))`
  align-self: center;
  width: 80%;
  height: 45px;
`;
