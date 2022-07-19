import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet } from 'react-native';
import { requiredValidator } from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import Spacer from '../../atoms/Spacer/Spacer';
import FormCheckbox from './FormCheckbox';
import { FormCheckboxProps } from './FormCheckbox.props';

storiesOf('Molecules/FormCheckbox', module).add('default', () => {
  return (
    <Form<boolean, FormCheckboxProps>
      onSubmit={action('onSubmit')}
      // @ts-ignore
      validate={action('validate (Form)')}
      render={({ form, submitting }) => (
        <>
          <Field
            style={styles.checkbox}
            name="checkbox"
            validate={requiredValidator}
            title={text('title', 'Title')}
            component={FormCheckbox}
          />
          <Spacer size={16} />
          <Button onPress={() => form.submit()} loading={submitting}>
            Submit Form
          </Button>
        </>
      )}
    />
  );
});

const styles = StyleSheet.create({
  checkbox: { width: '100%', padding: 16 },
});
