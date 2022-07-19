// @ts-ignore
import { User } from '@react-native-firebase/auth';
import { FormProps } from 'react-final-form';

export type RoomDetailsFormValues = {
  roomName: string;
  members?: User[];
};

export type RoomDetailsFormProps = FormProps & {
  getUser: (email: string) => Promise<User[]>;
  mode: 'create' | 'edit';
  chatRoom?: { name: string; members: User[] };
};
