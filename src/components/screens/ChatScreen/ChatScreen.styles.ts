import { View } from 'react-native';
import { Avatar, Badge, FAB, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styled } from '../../../utils/styled';
import Item from '../../molecules/Item/Item';
import { ItemProps } from '../../molecules/Item/Item.props';

export const EmptyContainer = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 48px;
  margin-top: 48px;
`;

export const EmptyIcon = styled(Icon)`
  margin-bottom: 24px;
`;

export const AvatarImage = styled(Avatar.Image)`
  align-self: center;
  margin-right: 8px;
`;

export const AvatarText = styled(Avatar.Text)`
  align-self: center;
  margin-right: 8px;
`;

export const RightContainer = styled(View)`
  margin-vertical: 6px;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
`;

interface ITextProps {
  color?: string;
}

export const DurationText = styled(Text)<ITextProps>`
  font-size: 12px;
  color: ${(props) => props.color};
`;

export const UnreadBadge = styled(Badge)`
  font-size: 10px;
`;

interface IItemProps extends ItemProps {
  unreadCount?: boolean;
}

export const StyledItem = styled(Item).attrs<IItemProps>(
  ({ theme, unreadCount }) => ({
    titleStyle: {
      marginBottom: 2,
    },
    descriptionStyle: {
      fontSize: 12,
      color: unreadCount ? theme.colors.text : theme.colors.placeholder,
    },
  }),
)`
  padding-horizontal: 20px;
  padding-vertical: 8px;
`;

export const StyledFabIcon = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 8px;
  bottom: 8px;
`;
