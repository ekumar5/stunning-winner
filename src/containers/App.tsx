import React from 'react';
import { Provider as MobxProvider, rootStore } from '../mobx';
import LanguageManager from './LanguageManager';
import MobxPersistGate from './MobxPersistGate';
import Navigator from './Navigator';
import ThemeProvider from './ThemeProvider';

const App: React.FC = () => (
  <MobxProvider value={rootStore}>
    <MobxPersistGate>
      <LanguageManager>
        <ThemeProvider>
          <Navigator />
        </ThemeProvider>
      </LanguageManager>
    </MobxPersistGate>
  </MobxProvider>
);

export default App;
