import React from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ActivityIndicator, Snackbar, Text } from 'react-native-paper';
import {
  DEFAULT_BUTTON_DELAY,
  MFA_VERIFY_TYPE_CODE,
  MFA_VERIFY_TYPE_PUSH,
} from '../../../utils/constants';
import Logo from '../../atoms/Logo/Logo';
import Spacer from '../../atoms/Spacer/Spacer';
import DelayButton from '../../molecules/DelayButton/DelayButton';
import VerifyMfaForm from '../../organisms/VerifyMfaForm/VerifyMfaForm';
import { VerifyMfaFormValues } from '../../organisms/VerifyMfaForm/VerifyMfaForm.props';
import { VerifyMfaTemplateProps } from './VerifyMfaTemplate.props';
import { styles } from './VerifyMfaTemplate.styles';

const VerifyMfaTemplate = ({
  mfaVerifyType,
  onSubmit,
  onResend,
  resendLoading,
  snackbarVisible,
  snackbarText,
  resendDelay,
}: VerifyMfaTemplateProps) => {
  const { t } = useTranslation('verifyMfa');

  return (
    <>
      <Logo style={styles.logo} />
      <View style={styles.container}>
        {mfaVerifyType === MFA_VERIFY_TYPE_CODE && (
          <Form<VerifyMfaFormValues>
            onSubmit={onSubmit}
            render={(formProps) => <VerifyMfaForm {...formProps} />}
          />
        )}
        {mfaVerifyType === MFA_VERIFY_TYPE_PUSH && (
          <>
            <Text style={styles.text}>{t('explanationPush')}</Text>
            <ActivityIndicator style={styles.loader} />
          </>
        )}
        <Spacer size={16} />
        <DelayButton
          onPress={onResend}
          loading={resendLoading}
          delay={resendDelay}
          mode="outlined">
          {t(
            mfaVerifyType === MFA_VERIFY_TYPE_CODE
              ? 'sendCodeAgain'
              : 'sendPushAgain',
          )}
        </DelayButton>
        <Snackbar visible={snackbarVisible} onDismiss={() => {}}>
          {snackbarText}
        </Snackbar>
      </View>
    </>
  );
};

VerifyMfaTemplate.defaultProps = {
  mfaVerifyType: MFA_VERIFY_TYPE_PUSH,
  resendButtonDisabled: false,
  resendDelay: DEFAULT_BUTTON_DELAY,
  snackbarText: null,
  snackbarVisible: false,
};

export default VerifyMfaTemplate;
