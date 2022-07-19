import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppStackParamList } from '../../../containers/Navigator';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import RoomDetailsForm from '../../organisms/RoomDetailsForm/RoomDetailsForm';
import { RoomDetailsFormValues } from '../../organisms/RoomDetailsForm/RoomDetailsForm.props';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

export type ChatDetailsRouteProps = RouteProp<AppStackParamList, 'EditRoom'>;

const EditRoomScreen = observer(() => {
  const { goBack } = useNavigation();
  const { t } = useTranslation('editRoom');
  const { chatRoom } = useRoute<ChatDetailsRouteProps>().params;
  const { editChatRoom, getUser } = useMst().chat;

  const onSubmit = (values: RoomDetailsFormValues) => {
    const removeMembers = chatRoom?.members
      .filter(
        ({ uid: id1 }) => !values.members?.some(({ uid: id2 }) => id2 === id1),
      )
      .map(({ displayName, email, uid }) => ({
        uid,
        email,
        displayName,
      }));

    const newMembers = values?.members
      ?.filter(
        ({ uid: id1 }) =>
          !chatRoom?.members?.some(({ uid: id2 }) => id2 === id1),
      )
      .map(({ displayName, email, uid }) => ({
        uid,
        email,
        displayName,
      }));

    editChatRoom(
      chatRoom?.id,
      { newName: values.roomName, oldName: chatRoom.name },
      newMembers,
      removeMembers,
    );
    goBack();
  };

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <FormTemplate<RoomDetailsFormValues>
        onSubmit={onSubmit}
        Component={RoomDetailsForm}
        getUser={getUser}
        mode="edit"
        chatRoom={chatRoom}
      />
    </ScreenTemplate>
  );
});

export default EditRoomScreen;
