import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import CheckboxItem from './CheckboxItem';

const CheckboxItemStory = () => {
  const [state, setState] = useState(false);
  return (
    <CheckboxItem
      title={text('title', 'Title of the CheckboxItem')}
      description={text('description', 'Description of the CheckboxItem')}
      titleNumberOfLines={number('titleNumberOfLines', 1, { min: 1, max: 5 })}
      descriptionNumberOfLines={number('descriptionNumberOfLines', 1, {
        min: 1,
        max: 5,
      })}
      loading={boolean('loading', true)}
      iconLeft={text('iconLeft', 'folder')}
      iconRight={text('iconRight', '')}
      style={styles.item}
      value={state}
      onPress={() => setState(!state)}
    />
  );
};

const styles = StyleSheet.create({
  item: { width: '100%' },
});

storiesOf('Molecules/CheckboxItem', module).add('default', () => {
  return <CheckboxItemStory />;
});
