import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import SwitchItem from './SwitchItem';

const SwitchItemStory = () => {
  const [state, setState] = useState(false);
  return (
    <SwitchItem
      title={text('title', 'Title of the SwitchItem')}
      description={text('description', 'Description of the SwitchItem')}
      titleNumberOfLines={number('titleNumberOfLines', 1, { min: 1, max: 5 })}
      descriptionNumberOfLines={number('descriptionNumberOfLines', 1, {
        min: 1,
        max: 5,
      })}
      loading={boolean('loading', false)}
      iconLeft={text('iconLeft', '')}
      iconRight={text('iconRight', '')}
      style={styles.item}
      value={state}
      onPress={() => setState(!state)}
      onSwitchPress={() => setState(!state)}
    />
  );
};

const styles = StyleSheet.create({
  item: { width: '100%' },
});

storiesOf('Molecules/SwitchItem', module).add('default', () => {
  return <SwitchItemStory />;
});
