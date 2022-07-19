// @ts-nocheck
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import { StyleSheet } from 'react-native';
import { requiredValidator } from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import Spacer from '../../atoms/Spacer/Spacer';
import FormInput from './FormInput';

const styles = StyleSheet.create({
  textInput: { width: 300 },
});

storiesOf('Molecules/FormInput', module).add('default', () => {
  return (
    <Form
      onSubmit={action('onSubmit')}
      validate={action('validate (Form)')}
      render={({ form, submitting }) => (
        <>
          <Field
            name="input"
            validate={requiredValidator}
            component={FormInput}
            mode={select(
              'mode',
              ['flat', 'outlined', 'contained'],
              'contained',
            )}
            disabled={boolean('disabled', false)}
            editable={boolean('editable', true)}
            dense={boolean('dense', false)}
            multiline={boolean('multiline', false)}
            label={text('Label', 'Floating Label')}
            placeholder={text('Placeholder', 'Placeholder Text')}
            style={styles.textInput}
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
