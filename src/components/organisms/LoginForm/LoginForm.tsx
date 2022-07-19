import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
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
import { LoginFormProps } from './LoginForm.props';
import { ResetButton } from './LoginForm.styles';

const LoginForm = ({
  form,
  valid,
  submitFailed,
  submitting,
  submitError,
  values,
  onResetPasswordPress,
}: LoginFormProps) => {
  const passwordRef = useRef<TextInput>(null);
  const { t } = useTranslation('login');

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      pointerEvents={submitting ? 'none' : 'auto'}>
      <Spacer size={24} />
      <Field
        name="email"
        validate={composeValidators(requiredValidator, emailValidator)}
        textContentType="emailAddress"
        autoCompleteType="email"
        label={t('common:emailLabel')}
        autoCapitalize="none"
        component={FormInput}
        mode="outlined"
        returnKeyType={'next'}
        onSubmitEditing={() => passwordRef.current?.focus()}
        blurOnSubmit={false}
      />
      <Field
        name="password"
        ref={passwordRef}
        secureTextEntry
        validate={requiredValidator}
        textContentType="password"
        autoCompleteType="off"
        label={t('common:passwordLabel')}
        mode="outlined"
        component={FormInput}
        returnKeyType={'done'}
        onSubmitEditing={() => form.submit()}
        blurOnSubmit={true}
      />
      <ResetButton
        mode="text"
        onPress={() => onResetPasswordPress(values.email)}>
        {t('resetPasswordButton')}
      </ResetButton>
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

export default LoginForm;
