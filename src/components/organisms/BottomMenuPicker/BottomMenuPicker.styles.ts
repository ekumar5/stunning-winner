import { View } from 'react-native';
import { styled } from '../../../utils/styled';
import Item from '../../molecules/Item/Item';

export const Container = styled(View)`
  border-radius: 10px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

interface IItemProps {
  font?: string;
}

export const StyledItem = styled(Item).attrs<IItemProps>((p) => ({
  titleStyle: {
    fontSize: 14,
    font: p.font,
  },
}))``;
