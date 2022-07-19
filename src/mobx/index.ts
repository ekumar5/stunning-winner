import { Instance, types } from 'mobx-state-tree';
import { createContext } from 'react';
import Reactotron from 'reactotron-react-native';
import { chatInitialState, ChatModel } from './chat';
import { languageInitialState, LanguageModel } from './language';
import { mfaInitialState, MfaModel } from './mfa';
import { themeInitialState, ThemeModel } from './theme';
import { userInitialState, UserModel } from './user';
import { userSearchInitialState, UserSearchModel } from './userSearch';

export const rootInitialState = {
  user: userInitialState,
  mfa: mfaInitialState,
  language: languageInitialState,
  theme: themeInitialState,
  userSearch: userSearchInitialState,
  chat: chatInitialState,
};

export const RootStoreModel = types
  .model('Root', {
    user: UserModel,
    mfa: MfaModel,
    language: LanguageModel,
    theme: ThemeModel,
    userSearch: UserSearchModel,
    chat: ChatModel,
  })
  .actions((self) => ({
    logout: () => {
      self.user = userInitialState;
      self.mfa = mfaInitialState;
      self.language = languageInitialState;
      self.theme = themeInitialState;
      self.userSearch = userSearchInitialState;
      self.chat = chatInitialState;
    },
  }));

export const rootStore = RootStoreModel.create(rootInitialState);

if (__DEV__ && Reactotron.trackMstNode) {
  Reactotron.trackMstNode(rootStore);
}

export interface RootStore extends Instance<typeof RootStoreModel> {}

export const RootStoreContext = createContext<RootStore | null>(null);

export const Provider = RootStoreContext.Provider;
