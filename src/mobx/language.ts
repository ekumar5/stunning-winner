import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const languageInitialState: LanguageSnapshot = {
  selected: 'en',
};

export const LanguageModel = types
  .model('Language', {
    selected: types.string,
  })
  .actions((self) => {
    const reset = () => (self = languageInitialState);
    const setLanguage = (language: string) => {
      self.selected = language;
    };

    return {
      reset,
      setLanguage,
    };
  });

/**
 * Language instance. Also contains actions
 */
export interface Language extends Instance<typeof LanguageModel> {}

/**
 * The data of language
 */
export interface LanguageSnapshot extends SnapshotOut<typeof LanguageModel> {}
