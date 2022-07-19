import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import CodeInput from './CodeInput';

const CodeInputStory = () => {
  const [state, setState] = useState('');
  return (
    <CodeInput
      style={styles.codeInput}
      pinCount={number('pinCount', 4, { min: 2, max: 10 })}
      code={state}
      onCodeChanged={setState}
      onCodeFilled={action('onCodeFilled')}
    />
  );
};

const styles = StyleSheet.create({
  codeInput: { width: '80%' },
});

storiesOf('Atoms/CodeInput', module)
  .add('default', () => {
    return <CodeInputStory />;
  })
  .addParameters({ storyshots: { disable: true } });
