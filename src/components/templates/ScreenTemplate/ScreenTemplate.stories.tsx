import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenTemplate from './ScreenTemplate';

storiesOf('Templates/ScreenTemplate', module).add('default', () => {
  return (
    <ScreenTemplate
      barStyle={select(
        'barStyle',
        ['light-content', 'dark-content'],
        'light-content',
      )}
      center={boolean('center', false)}>
      <Text style={styles.text}>Example content in the template</Text>
    </ScreenTemplate>
  );
});

const styles = StyleSheet.create({
  text: { backgroundColor: 'red', padding: 32, color: 'white' },
});
