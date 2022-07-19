import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet, View } from 'react-native';
import RegisterForm from './RegisterForm';
import { RegisterFormValues } from './RegisterForm.props';

storiesOf('Organisms/RegisterForm', module).add('default', () => {
  return (
    <View style={styles.formContainer}>
      <Form<RegisterFormValues>
        onSubmit={action('onSubmit')}
        // @ts-ignore
        validate={action('validate (Form)')}
        render={(formProps) => <RegisterForm {...formProps} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  formContainer: { flex: 1, width: '80%' },
});
