import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import TextInput from './TextInput';

const TextInputStory = () => {
  const [state, setState] = useState();
  return (
    <TextInput
      mode={select('mode', ['flat', 'outlined'], 'flat')}
      disabled={boolean('disabled', false)}
      editable={boolean('editable', true)}
      error={boolean('error', false)}
      dense={boolean('dense', false)}
      multiline={boolean('multiline', false)}
      label={text('Label', 'Floating Label')}
      placeholder={text('Placeholder', 'Placeholder Text')}
      style={styles.textInput}
      value={state}
      // @ts-ignore
      onPress={(v) => setState(v)}
    />
  );
};

const styles = StyleSheet.create({
  textInput: { width: 300 },
});

storiesOf('Atoms/TextInput', module).add('default', () => {
  return <TextInputStory />;
});
