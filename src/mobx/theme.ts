import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const themeInitialState: ThemeSnapshot = {
  dark: false,
  color: 'makeen',
  syncWithSystem: true,
};

export const ThemeModel = types
  .model('Theme', {
    dark: types.boolean,
    color: types.string,
    syncWithSystem: types.boolean,
  })
  .actions((self) => {
    const reset = () => (self = themeInitialState);

    const setTheme: (params: Partial<ThemeSnapshot>) => void = ({
      dark,
      color,
      syncWithSystem,
    }) => {
      if (dark !== undefined) {
        self.dark = dark;
      }
      if (syncWithSystem !== undefined) {
        self.syncWithSystem = syncWithSystem;
      }
      if (color) {
        self.color = color;
      }
    };

    return {
      reset,
      setTheme,
    };
  });

/**
 * Theme instance. Also contains actions
 */
export interface Theme extends Instance<typeof ThemeModel> {}

/**
 * The data of theme
 */
export interface ThemeSnapshot extends SnapshotOut<typeof ThemeModel> {}
