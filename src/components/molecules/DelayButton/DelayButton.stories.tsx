import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import DelayButton from './DelayButton';

storiesOf('Molecules/DelayButton', module).add('default', () => {
  return (
    <DelayButton onPress={action('onPress')} delay={number('delay', 5)}>
      {text('Label', 'Button')}
    </DelayButton>
  );
});
