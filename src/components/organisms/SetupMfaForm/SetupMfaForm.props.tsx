import { FormRenderProps } from 'react-final-form';

export type SetupMfaFormValues = {
  email?: string;
  phone?: string;
};

export type SetupMfaFormProps = FormRenderProps<SetupMfaFormValues> & {
  mfaType: 'phone' | 'email';
};
