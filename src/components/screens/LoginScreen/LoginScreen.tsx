import { useNavigation } from '@react-navigation/native';
import { FORM_ERROR, FormApi, SubmissionErrors } from 'final-form';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import LoginForm from '../../organisms/LoginForm/LoginForm';
import { LoginFormValues } from '../../organisms/LoginForm/LoginForm.props';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const LoginScreen = observer(() => {
  const { navigate } = useNavigation();
  const { t } = useTranslation('login');
  const { user } = useMst();

  const onSubmit = async (
    values: LoginFormValues,
    formApi: FormApi,
    callback: (errors?: SubmissionErrors) => void,
  ) => {
    try {
      const { needsMfa } = await user.login(values);
      if (needsMfa) {
        navigate('VerifyMfa');
      }
    } catch (e) {
      const message = e?.message || t('errors:generic');
      callback({ [FORM_ERROR]: message });
    }
  };

  const onResetPasswordPress = (email: string) =>
    navigate('ResetPassword', { email });

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <FormTemplate<LoginFormValues>
        onSubmit={onSubmit}
        onResetPasswordPress={onResetPasswordPress}
        Component={LoginForm}
        logo
      />
    </ScreenTemplate>
  );
});

export default LoginScreen;
