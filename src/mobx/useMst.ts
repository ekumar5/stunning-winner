import { useContext } from 'react';
import { RootStore, RootStoreContext } from '.';

export const useMst = () => {
  const store = useContext<RootStore | null>(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
