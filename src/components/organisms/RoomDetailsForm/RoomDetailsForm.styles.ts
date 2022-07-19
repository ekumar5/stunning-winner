import { Field } from 'react-final-form';
import { Chip, Text } from 'react-native-paper';
import { styled } from '../../../utils/styled';

export const StyledChip = styled(Chip)`
  margin-horizontal: 2px;
  margin-vertical: 4px;
  padding: 4px;
`;

export const MembersListHeading = styled(Text)`
  font-size: 16px;
  padding-bottom: 2px;
`;

export const MembersList = styled(Field)<string[]>`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;
