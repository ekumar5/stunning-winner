import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import GoBackTemplate from './GoBackTemplate';

storiesOf('Templates/GoBackTemplate', module).add('default', () => {
  return (
    <GoBackTemplate
      buttonTitle={text('buttonTitle', 'Example Button Title')}
      onPress={action('onPress')}
      title={text('title', 'Example Title')}
      message={text(
        'message',
        'Example Message. Quisque pellentesque non dui et commodo. Nam vel nunc vestibulum,' +
          ' ornare quam et, consectetur diam. Pellentesque at placerat lorem.',
      )}
    />
  );
});
