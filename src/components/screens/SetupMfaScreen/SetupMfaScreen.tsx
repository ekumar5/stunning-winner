import { useNavigation } from '@react-navigation/native';
import { FORM_ERROR, FormApi, SubmissionErrors } from 'final-form';
import { get } from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMst } from '../../../mobx/useMst';
import { MFA_TYPE_PHONE } from '../../../utils/constants';
import Header from '../../molecules/Header/Header';
import SetupMfaForm from '../../organisms/SetupMfaForm/SetupMfaForm';
import { SetupMfaFormValues } from '../../organisms/SetupMfaForm/SetupMfaForm.props';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const SetupMfaScreen = observer(() => {
  const { navigate } = useNavigation();
  const { t } = useTranslation('setupMfa');
  const { mfa } = useMst();

  const onSubmit = async (
    values: SetupMfaFormValues,
    formApi: FormApi,
    callback: (errors?: SubmissionErrors) => void,
  ) => {
    try {
      const { email, phone } = values;

      const value = email ?? phone;

      if (!value) {
        throw new Error('Email or phone is missing');
      }

      await mfa.setupMfa(value);

      navigate('VerifyMfa');
    } catch (e) {
      const message = e?.message || t('errors:generic');
      callback({ [FORM_ERROR]: error });
    }
  };

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <FormTemplate<SetupMfaFormValues>
        Component={SetupMfaForm}
        onSubmit={onSubmit}
        mfaType={MFA_TYPE_PHONE}
        logo
      />
    </ScreenTemplate>
  );
});

export default SetupMfaScreen;
