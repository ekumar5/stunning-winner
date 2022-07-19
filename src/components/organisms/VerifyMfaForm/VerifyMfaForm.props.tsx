import { FormRenderProps } from 'react-final-form';

export type VerifyMfaFormValues = {
  code?: string;
};

export type VerifyMfaFormProps = FormRenderProps<VerifyMfaFormValues>;
