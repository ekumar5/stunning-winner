import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MFA_TYPE_EMAIL, MFA_TYPE_PHONE } from '../../../utils/constants';
import {
  composeValidators,
  emailValidator,
  phoneValidator,
  requiredValidator,
} from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import FormError from '../../atoms/FormError/FormError';
import Spacer from '../../atoms/Spacer/Spacer';
import FormInput from '../../molecules/FormInput/FormInput';
import { SetupMfaFormProps } from './SetupMfaForm.props';
import { StyledText } from './SetupMfaForm.styles';

const SetupMfaForm = ({
  mfaType,
  form,
  valid,
  submitFailed,
  submitting,
  submitError,
}: SetupMfaFormProps) => {
  const { t } = useTranslation('setupMfa');

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      pointerEvents={submitting ? 'none' : 'auto'}>
      <Spacer size={24} />
      <StyledText>
        {t(
          mfaType === MFA_TYPE_EMAIL ? 'explanationEmail' : 'explanationPhone',
        )}
      </StyledText>
      <Spacer size={16} />
      {mfaType === MFA_TYPE_EMAIL && (
        <Field
          testID="email"
          name="email"
          validate={composeValidators(requiredValidator, emailValidator)}
          textContentType="emailAddress"
          autoCompleteType="email"
          label={t('common:emailLabel')}
          autoCapitalize="none"
          component={FormInput}
          returnKeyType={'done'}
          onSubmitEditing={() => form.submit()}
          mode="outlined"
        />
      )}
      {mfaType === MFA_TYPE_PHONE && (
        <Field
          testID="phone"
          name="phone"
          validate={composeValidators(requiredValidator, phoneValidator)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          label={t('common:phoneLabel')}
          component={FormInput}
          returnKeyType={'done'}
          onSubmitEditing={() => form.submit()}
          mode="outlined"
        />
      )}
      <Button
        testID="submit"
        disabled={submitFailed && !valid}
        loading={submitting}
        onPress={form.submit}>
        {t('submitButton')}
      </Button>
      <FormError compact visible={!!submitError} text={submitError} />
    </KeyboardAwareScrollView>
  );
};

SetupMfaForm.defaultProps = {
  mfaType: MFA_TYPE_EMAIL,
};

export default SetupMfaForm;
