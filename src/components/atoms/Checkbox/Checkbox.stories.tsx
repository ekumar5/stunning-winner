import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import Checkbox from './Checkbox';

const CheckboxStory = () => {
  const [state, setState] = useState(false);
  return (
    <Checkbox
      size={number('size', 24)}
      checked={state}
      onPress={() => setState(!state)}
    />
  );
};

storiesOf('Atoms/Checkbox', module).add('default', () => {
  return <CheckboxStory />;
});
