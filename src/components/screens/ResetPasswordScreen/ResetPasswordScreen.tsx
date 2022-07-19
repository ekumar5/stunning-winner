import { RouteProp, useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { FORM_ERROR, FormApi, SubmissionErrors } from 'final-form';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthStackParamList } from '../../../containers/Navigator';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import ResetPasswordForm from '../../organisms/ResetPasswordForm/ResetPasswordForm';
import { ResetPasswordFormValues } from '../../organisms/ResetPasswordForm/ResetPasswordForm.props';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import GoBackTemplate from '../../templates/GoBackTemplate/GoBackTemplate';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const ResetSteps = {
  RESET_PASSWORD: 0,
  SUCCESS: 1,
};

export type ResetPasswordRouteProps = RouteProp<
  AuthStackParamList,
  'ResetPassword'
>;

const ResetPasswordScreen = observer(() => {
  const { goBack } = useNavigation();
  const route = useRoute<ResetPasswordRouteProps>();
  const { t } = useTranslation('resetPassword');
  const { resetPassword } = useMst().user;
  const [step, setStep] = useState(ResetSteps.RESET_PASSWORD);

  const onSubmit = async (
    values: ResetPasswordFormValues,
    formApi: FormApi,
    callback: (errors?: SubmissionErrors) => void,
  ) => {
    try {
      const { email } = values;
      await resetPassword({ email });
      setStep(ResetSteps.SUCCESS);
    } catch (e) {
      const message = e?.message || t('errors:generic');
      callback({ [FORM_ERROR]: message });
    }
  };
  const email = route.params?.email;

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      {step === ResetSteps.RESET_PASSWORD && (
        <FormTemplate<ResetPasswordFormValues>
          Component={ResetPasswordForm}
          onSubmit={onSubmit}
          initialValues={{ email }}
          logo
        />
      )}
      {step === ResetSteps.SUCCESS && (
        <GoBackTemplate
          title={t('successTitle')}
          message={t('successMessage')}
          buttonTitle={t('common:goBack')}
          onPress={goBack}
        />
      )}
    </ScreenTemplate>
  );
});

export default ResetPasswordScreen;
