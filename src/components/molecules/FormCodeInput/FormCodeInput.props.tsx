import { FieldRenderProps } from 'react-final-form';
import { CodeInputProps } from '../../atoms/CodeInput/CodeInput.props';

export type FormCodeInputProps = FieldRenderProps<string> &
  CodeInputProps & {
    compact: boolean;
  };
