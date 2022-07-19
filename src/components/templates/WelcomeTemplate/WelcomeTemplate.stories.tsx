import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import WelcomeTemplate from './WelcomeTemplate';

storiesOf('Templates/WelcomeTemplate', module).add('default', () => {
  return (
    <WelcomeTemplate
      onRegister={action('onRegister')}
      onLogin={action('onLogin')}
      imageUrl={text('imageUrl', 'https://picsum.photos/1600/1600')}
    />
  );
});
