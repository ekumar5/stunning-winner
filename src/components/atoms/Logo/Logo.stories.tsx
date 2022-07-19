import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Logo from './Logo';

storiesOf('Atoms/Logo', module).add('default', () => {
  return <Logo />;
});
