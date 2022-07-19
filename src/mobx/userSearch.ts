import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, {
  // @ts-ignore
  QueryDocumentSnapshot,
} from '@react-native-firebase/firestore';
import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { FirebaseUserModel } from './user';

export const userSearchInitialState: UserSearchSnapshot = {
  data: [],
  loading: false,
};

export const UserSearchModel = types
  .model('UserSearch', {
    data: types.array(FirebaseUserModel),
    loading: types.boolean,
  })
  .actions((self) => {
    // @ts-ignore
    const reset = () => (self = userSearchInitialState);
    const searchByEmail = flow(function* (query) {
      self.loading = true;

      const querySnapshot = yield firestore()
        .collection<FirebaseAuthTypes.User>('users')
        .where('email', '==', query)
        .get();

      self.data = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<FirebaseAuthTypes.User>) => doc.data(),
      );
      self.loading = false;
    });
    return {
      reset,
      searchByEmail,
    };
  });

/**
 * UserSearch instance. Also contains actions
 */
export interface UserSearch extends Instance<typeof UserSearchModel> {}

/**
 * The data of userSearch
 */
export interface UserSearchSnapshot
  extends SnapshotOut<typeof UserSearchModel> {}
