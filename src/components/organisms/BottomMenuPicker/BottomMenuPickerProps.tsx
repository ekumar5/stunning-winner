import { ItemProps } from '../../molecules/Item/Item.props';

export type BottomMenuItem = ItemProps & {
  id: string;
  title: string;
};

export type BottomMenuPickerProps = {
  data: BottomMenuItem[];
  visible: boolean;
  onDismiss: () => void;
  onItemPress: (id: string) => void;
};
