import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { FormRenderProps } from 'react-final-form';
import { StyleSheet } from 'react-native';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import Spacer from '../../atoms/Spacer/Spacer';
import FormInput from '../../molecules/FormInput/FormInput';
import FormTemplate from './FormTemplate';

storiesOf('Templates/FormTemplate', module).add('default', () => {
  const FormComponent = ({ form }: FormRenderProps) => (
    <>
      <Spacer size={16} />
      <Field
        style={styles.textInput}
        name="example"
        label="Example Field"
        component={FormInput}
      />
      <Button onPress={form.submit}>Submit</Button>
    </>
  );

  return (
    <FormTemplate
      onSubmit={action('onSubmit')}
      Component={FormComponent}
      logo
    />
  );
});

const styles = StyleSheet.create({
  textInput: { width: 300 },
});
