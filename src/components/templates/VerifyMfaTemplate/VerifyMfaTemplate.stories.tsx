import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import {
  MFA_VERIFY_TYPE_CODE,
  MFA_VERIFY_TYPE_PUSH,
} from '../../../utils/constants';
import VerifyMfaTemplate from './VerifyMfaTemplate';

storiesOf('Templates/VerifyMfaTemplate', module).add('code', () => {
  return (
    <VerifyMfaTemplate
      onSubmit={action('onSubmit')}
      onResend={action('onResend')}
      mfaVerifyType={MFA_VERIFY_TYPE_CODE}
      resendDelay={number('resendDelay', 5)}
      resendLoading={boolean('resendLoading', false)}
    />
  );
});

storiesOf('Templates/VerifyMfaTemplate', module).add('push', () => {
  return (
    <VerifyMfaTemplate
      onResend={action('onResend')}
      mfaVerifyType={MFA_VERIFY_TYPE_PUSH}
      resendDelay={number('resendDelay', 5)}
      resendLoading={boolean('resendLoading', false)}
      snackbarText={text('snackbarText', '')}
      snackbarVisible={boolean('snackbarVisible', false)}
      onSubmit={() => {}}
    />
  );
});
