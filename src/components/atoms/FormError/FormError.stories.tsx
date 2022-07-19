import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextInput from '../TextInput/TextInput';
import FormError from './FormError';

storiesOf('Atoms/FormError', module).add('default', () => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        label="Example Field"
        value="The FormError is shown below this field"
        multiline
        mode="outlined"
        error={boolean('visible', true)}
      />
      <FormError
        compact={boolean('compact', false)}
        visible={boolean('visible', true)}
        errorId={text('errorId', 'errors:form.required')}
        text={text('text', '')}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: { width: 300 },
});
