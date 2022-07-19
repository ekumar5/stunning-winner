import { FieldRenderProps } from 'react-final-form';
import { ItemProps } from '../Item/Item.props';

export type FormCheckboxProps = FieldRenderProps<string> &
  ItemProps & {
    checkboxStyle: any;
    title: string;
  };
