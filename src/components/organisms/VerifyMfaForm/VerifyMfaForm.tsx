import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { CODE_LENGTH } from '../../../utils/constants';
import {
  composeValidators,
  exactLengthValidator,
  requiredValidator,
} from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import FormError from '../../atoms/FormError/FormError';
import Spacer from '../../atoms/Spacer/Spacer';
import FormCodeInput from '../../molecules/FormCodeInput/FormCodeInput';
import { VerifyMfaFormProps } from './VerifyMfaForm.props';
import { StyledText } from './VerifyMfaForm.styles';

const VerifyMfaForm = ({
  form,
  valid,
  submitFailed,
  submitting,
  submitError,
}: VerifyMfaFormProps) => {
  const { t } = useTranslation('verifyMfa');

  return (
    <View pointerEvents={submitting ? 'none' : 'auto'}>
      <Spacer size={24} />
      <StyledText>{t('explanationPin')}</StyledText>
      <Spacer size={16} />
      <Field
        name="code"
        testID="code"
        validate={composeValidators(
          requiredValidator,
          exactLengthValidator(CODE_LENGTH),
        )}
        pinCount={CODE_LENGTH}
        label={t('common:codeLabel')}
        component={FormCodeInput}
        mode="outlined"
        onCodeFilled={() => {
          // onCodeFilled is fired before validation
          // delay submit to let validation finish
          setTimeout(form.submit, 100);
        }}
      />
      <Spacer size={16} />
      <Button
        testID="submit"
        disabled={submitFailed && !valid}
        loading={submitting}
        onPress={form.submit}>
        {t('submitButton')}
      </Button>
      <FormError compact visible={!!submitError} text={submitError} />
    </View>
  );
};

VerifyMfaForm.defaultProps = {};

export default VerifyMfaForm;
