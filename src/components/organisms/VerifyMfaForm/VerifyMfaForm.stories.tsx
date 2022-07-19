import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet, View } from 'react-native';
import VerifyMfaForm from './VerifyMfaForm';
import { VerifyMfaFormValues } from './VerifyMfaForm.props';

storiesOf('Organisms/VerifyMfaForm', module).add('default', () => {
  return (
    <View style={styles.formContainer}>
      <Form<VerifyMfaFormValues>
        onSubmit={action('onSubmit')}
        // @ts-ignore
        validate={action('validate (Form)')}
        render={(formProps) => <VerifyMfaForm {...formProps} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  formContainer: { flex: 1, width: '80%' },
});
