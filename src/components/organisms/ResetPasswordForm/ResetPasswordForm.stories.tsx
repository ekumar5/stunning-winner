import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet, View } from 'react-native';
import ResetPasswordForm from './ResetPasswordForm';
import { ResetPasswordFormValues } from './ResetPasswordForm.props';

storiesOf('Organisms/ResetPasswordForm', module).add('default', () => {
  return (
    <View style={styles.formContainer}>
      <Form<ResetPasswordFormValues>
        onSubmit={action('onSubmit')}
        // @ts-ignore
        validate={action('validate (Form)')}
        render={(formProps) => <ResetPasswordForm {...formProps} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  formContainer: { flex: 1, width: '80%' },
});
