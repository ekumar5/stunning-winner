import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  composeValidators,
  emailValidator,
  minLengthValidator,
  mustMatchFieldValidator,
  requiredValidator,
} from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import FormError from '../../atoms/FormError/FormError';
import Spacer from '../../atoms/Spacer/Spacer';
import FormCheckbox from '../../molecules/FormCheckbox/FormCheckbox';
import FormInput from '../../molecules/FormInput/FormInput';
import { RegisterFormProps } from './RegisterForm.props';

const RegisterForm = ({
  form,
  valid,
  submitFailed,
  submitting,
  submitError,
}: RegisterFormProps) => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { t } = useTranslation('register');

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      pointerEvents={submitting ? 'none' : 'auto'}>
      <Spacer size={24} />
      <Field
        testID="displayName"
        name="name"
        validate={composeValidators(requiredValidator, minLengthValidator(2))}
        textContentType="emailAddress"
        autoCompleteType="email"
        label={t('common:nameLabel')}
        autoCapitalize="none"
        returnKeyType={'next'}
        onSubmitEditing={() => emailRef.current?.focus()}
        blurOnSubmit={false}
        component={FormInput}
        mode="outlined"
      />
      <Field
        testID="email"
        name="email"
        ref={emailRef}
        validate={composeValidators(requiredValidator, emailValidator)}
        textContentType="emailAddress"
        autoCompleteType="email"
        label={t('common:emailLabel')}
        autoCapitalize="none"
        returnKeyType={'next'}
        onSubmitEditing={() => passwordRef.current?.focus()}
        blurOnSubmit={false}
        component={FormInput}
        mode="outlined"
      />
      <Field
        testID="password"
        name="password"
        ref={passwordRef}
        secureTextEntry
        validate={composeValidators(requiredValidator, minLengthValidator(6))}
        textContentType="oneTimeCode"
        autoCompleteType="off"
        label={t('common:passwordLabel')}
        mode="outlined"
        returnKeyType={'next'}
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        blurOnSubmit={false}
        component={FormInput}
      />
      <Field
        testID="confirmPassword"
        name="confirmPassword"
        ref={confirmPasswordRef}
        secureTextEntry
        validate={mustMatchFieldValidator('password')}
        textContentType="oneTimeCode"
        autoCompleteType="off"
        label={t('common:confirmPasswordLabel')}
        mode="outlined"
        returnKeyType={'done'}
        onSubmitEditing={() => form.submit()}
        blurOnSubmit={true}
        component={FormInput}
      />
      <Field
        testID="terms"
        name="terms"
        validate={requiredValidator}
        title={t('acceptAgreement')}
        mode="outlined"
        component={FormCheckbox}
      />
      <Button
        testID="createAccount"
        disabled={submitFailed && !valid}
        loading={submitting}
        onPress={form.submit}>
        {t('submitButton')}
      </Button>
      <FormError compact visible={!!submitError} text={submitError} />
    </KeyboardAwareScrollView>
  );
};

export default RegisterForm;
