import { useNavigation } from '@react-navigation/native';
import { FORM_ERROR, FormApi, SubmissionErrors } from 'final-form';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import RegisterForm from '../../organisms/RegisterForm/RegisterForm';
import { RegisterFormValues } from '../../organisms/RegisterForm/RegisterForm.props';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const RegisterScreen = observer(() => {
  const { navigate } = useNavigation();
  const { t } = useTranslation('register');
  const { user } = useMst();

  const onSubmit = async (
    values: RegisterFormValues,
    formApi: FormApi,
    callback: (errors?: SubmissionErrors) => void,
  ) => {
    try {
      // @ts-ignore
      const { needsMfaSetup } = await user.register(values);
      if (needsMfaSetup) {
        navigate('SetupMfa');
      }
    } catch (e) {
      const message = e?.message || t('errors:generic');
      callback({ [FORM_ERROR]: message });
    }
  };

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <FormTemplate<RegisterFormValues>
        onSubmit={onSubmit}
        Component={RegisterForm}
        onResetPasswordPress={() => navigate('ResetPassword')}
        logo
      />
    </ScreenTemplate>
  );
});

export default RegisterScreen;
