import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Button from './Button';

storiesOf('Atoms/Button', module).add('default', () => (
  <Button
    disabled={boolean('disabled', false)}
    onPress={action('onPress')}
    mode={select('mode', ['text', 'outlined', 'contained'], 'contained')}>
    {text('Label', 'Button')}
  </Button>
));
