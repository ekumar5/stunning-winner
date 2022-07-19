import { FormRenderProps } from 'react-final-form';

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export type RegisterFormProps = FormRenderProps<RegisterFormValues>;
