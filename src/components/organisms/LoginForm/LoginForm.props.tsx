import { FormRenderProps } from 'react-final-form';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = FormRenderProps<LoginFormValues> & {
  onResetPasswordPress: (email: string) => void;
};
