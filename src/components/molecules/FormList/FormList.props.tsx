import { FieldRenderProps } from 'react-final-form';

type DataItem = {
  [otherProp: string]: any;
};

export type FormListProps = FieldRenderProps<any[]> & {
  listData: DataItem[];
  renderItem: (item: DataItem) => any;
};
