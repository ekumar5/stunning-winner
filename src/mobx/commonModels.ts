import { types } from 'mobx-state-tree';

export const ApiError = types.model({
  name: types.string,
  message: types.string,
});
