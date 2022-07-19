import React from 'react';
import './rn-addons';
import {
  addDecorator,
  addParameters,
  configure,
  getStorybookUI,
} from '@storybook/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeSwitcher from './ThemeSwitcher';
import { loadStories } from './storyLoader';
import { sortEachDepth } from '../src/utils/sortEachDepth';

configure(() => {
  addParameters({
    options: {
      showRoots: true,
      storySort: sortEachDepth([
        ['Atoms', 'Molecules', 'Organisms', 'Templates', '...'],
        [
          'Logo',
          'Button',
          'Checkbox',
          'TextInput',
          'CodeInput',
          'FormError',
          'Item',
          'CheckboxItem',
          'SwitchItem',
          'ScreenTemplate',
          'WelcomeTemplate',
          '...',
        ],
        ['default', '...'],
      ]),
    },
  });
  addDecorator(withKnobs);
  addDecorator(getStory => <ThemeSwitcher>{getStory()}</ThemeSwitcher>);
  loadStories();
}, module);

const StorybookApp = getStorybookUI({
  asyncStorage: AsyncStorage,
});
export default StorybookApp;
