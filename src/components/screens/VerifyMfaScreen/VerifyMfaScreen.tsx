import { FORM_ERROR, FormApi, SubmissionErrors } from 'final-form';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMst } from '../../../mobx/useMst';
import {
  MFA_VERIFY_TYPE_CODE,
  SNACKBAR_DURATION,
} from '../../../utils/constants';
import Header from '../../molecules/Header/Header';
import { VerifyMfaFormValues } from '../../organisms/VerifyMfaForm/VerifyMfaForm.props';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';
import VerifyMfaTemplate from '../../templates/VerifyMfaTemplate/VerifyMfaTemplate';

type Snackbar = {
  snackbarVisible: boolean;
  snackbarText?: string | null;
  error?: boolean;
};

const VerifyMfaScreen = observer(() => {
  const { t } = useTranslation('verifyMfa');
  const { mfa } = useMst();
  const [snackbarState, setSnackbarState] = useState<Snackbar>({
    snackbarVisible: false,
    snackbarText: '',
    error: false,
  });
  const { snackbarVisible, snackbarText } = snackbarState;

  const showSnackbar = (text: string, error: boolean, duration: number) => {
    if (snackbarVisible) {
      return;
    }

    setSnackbarState({
      snackbarVisible: true,
      snackbarText: text,
      error,
    });
    setTimeout(() => {
      setSnackbarState({ snackbarVisible: false, snackbarText: null });
    }, duration);
  };

  const onSubmit = async (
    values: VerifyMfaFormValues,
    formApi: FormApi,
    callback: (errors?: SubmissionErrors) => void,
  ) => {
    try {
      const { code } = values;

      if (!code) {
        throw new Error('Code is required');
      }
      await mfa.verifyMfa(code);
    } catch (e) {
      console.log(e);
      const message = e?.message || t('errors:generic');
      callback({ [FORM_ERROR]: message });
    }
  };

  const onResend = async () => {
    try {
      await mfa.resend();
      showSnackbar(t('resendSuccess'), false, SNACKBAR_DURATION);
    } catch (e) {
      const message = e?.message || t('errors:generic');
      console.log(e);
      showSnackbar(message, true, SNACKBAR_DURATION);
    }
  };

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <VerifyMfaTemplate
        resendLoading={mfa.loading}
        snackbarVisible={snackbarVisible}
        snackbarText={snackbarText}
        // @ts-ignore
        onSubmit={onSubmit}
        onResend={onResend}
        mfaVerifyType={MFA_VERIFY_TYPE_CODE}
      />
    </ScreenTemplate>
  );
});

export default VerifyMfaScreen;
