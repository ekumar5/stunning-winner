// @ts-nocheck
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet, View } from 'react-native';
import LoginForm from './LoginForm';

storiesOf('Organisms/LoginForm', module).add('default', () => {
  return (
    <View style={styles.formContainer}>
      <Form
        onSubmit={action('onSubmit')}
        validate={action('validate (Form)')}
        render={(formProps) => (
          <>
            <LoginForm
              {...formProps}
              onResetPasswordPress={action('onResetPasswordPress')}
            />
          </>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  formContainer: { flex: 1, width: '80%' },
});
