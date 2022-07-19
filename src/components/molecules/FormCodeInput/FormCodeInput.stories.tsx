// @ts-nocheck
import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Form } from 'react-final-form';
import {
  composeValidators,
  exactLengthValidator,
  requiredValidator,
} from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Field from '../../atoms/Field/Field';
import Spacer from '../../atoms/Spacer/Spacer';
import FormCodeInput from './FormCodeInput';

storiesOf('Molecules/FormCodeInput', module).add('default', () => {
  const pinCount = number('pinCount', 6);
  return (
    <Form
      onSubmit={action('onSubmit')}
      validate={action('validate (Form)')}
      render={({ form, submitting }) => (
        <>
          <Field
            name="code"
            validate={composeValidators(
              requiredValidator,
              exactLengthValidator(pinCount),
            )}
            component={FormCodeInput}
            pinCount={pinCount}
            label={text('label')}
            onCodeFilled={action('onCodeFilled')}
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
