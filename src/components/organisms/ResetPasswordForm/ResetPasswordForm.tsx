import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  composeValidators,
  emailValidator,
  requiredValidator,
} from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import FormError from '../../atoms/FormError/FormError';
import Spacer from '../../atoms/Spacer/Spacer';
import FormInput from '../../molecules/FormInput/FormInput';
import { ResetPasswordFormProps } from './ResetPasswordForm.props';
import { ExplanationText } from './ResetPasswordForm.styles';

const ResetPasswordForm = ({
  form,
  valid,
  submitFailed,
  submitting,
  submitError,
}: ResetPasswordFormProps) => {
  const { t } = useTranslation('resetPassword');

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      pointerEvents={submitting ? 'none' : 'auto'}>
      <Spacer size={24} />
      <ExplanationText>{t('explanation')}</ExplanationText>
      <Spacer size={16} />
      <Field
        name="email"
        validate={composeValidators(requiredValidator, emailValidator)}
        textContentType="emailAddress"
        autoCompleteType="email"
        label={t('common:emailLabel')}
        autoCapitalize="none"
        component={FormInput}
        mode="outlined"
        returnKeyType={'done'}
        onSubmitEditing={() => form.submit()}
      />
      <Button
        disabled={submitFailed && !valid}
        loading={submitting}
        onPress={form.submit}>
        {t('submitButton')}
      </Button>
      <FormError compact visible={!!submitError} text={submitError} />
    </KeyboardAwareScrollView>
  );
};
export default ResetPasswordForm;
