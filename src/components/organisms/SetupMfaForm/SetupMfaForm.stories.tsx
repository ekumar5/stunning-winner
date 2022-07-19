import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet, View } from 'react-native';
import { MFA_TYPE_EMAIL, MFA_TYPE_PHONE } from '../../../utils/constants';
import SetupMfaForm from './SetupMfaForm';
import { SetupMfaFormValues } from './SetupMfaForm.props';

storiesOf('Organisms/SetupMfaForm', module).add('default', () => {
  return (
    <View style={styles.formContainer}>
      <Form<SetupMfaFormValues>
        onSubmit={action('onSubmit')}
        // @ts-ignore
        validate={action('validate (Form)')}
        render={(formProps) => (
          <SetupMfaForm
            {...formProps}
            mfaType={select(
              'mfaType',
              [MFA_TYPE_EMAIL, MFA_TYPE_PHONE],
              MFA_TYPE_EMAIL,
            )}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  formContainer: { flex: 1, width: '80%' },
});
