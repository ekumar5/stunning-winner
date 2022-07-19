import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Item from './Item';

storiesOf('Molecules/Item', module).add('default', () => {
  return (
    <Item
      title={text('title', 'Title of the Item')}
      description={text('description', 'Description of the Item')}
      titleNumberOfLines={number('titleNumberOfLines', 1, { min: 1, max: 5 })}
      descriptionNumberOfLines={number('descriptionNumberOfLines', 1, {
        min: 1,
        max: 5,
      })}
      loading={boolean('loading', false)}
      iconLeft={text('iconLeft', '')}
      style={styles.item}
      iconRight={text('iconRight', '')}
      onPress={action('onPress')}
    />
  );
});

const styles = StyleSheet.create({
  item: { width: '100%' },
});
