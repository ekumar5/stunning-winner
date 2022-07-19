import { FieldRenderProps } from 'react-final-form';
import { TextInputProps } from '../../atoms/TextInput/TextInput.props';

export type FormInputProps = TextInputProps & FieldRenderProps<string>;
