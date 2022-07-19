import { FormApi, SubmissionErrors } from 'final-form';
import { VerifyMfaFormValues } from '../../organisms/VerifyMfaForm/VerifyMfaForm.props';

export type VerifyMfaTemplateProps = {
  mfaVerifyType: 'pin' | 'push';
  onSubmit: (
    values: VerifyMfaFormValues,
    form: FormApi<VerifyMfaFormValues>,
    callback?: (errors?: SubmissionErrors) => void,
  ) => SubmissionErrors | Promise<SubmissionErrors> | void;
  onResend: () => void;
  resendLoading: boolean;
  snackbarVisible: boolean;
  snackbarText?: string | null;
  resendDelay: number;
};
