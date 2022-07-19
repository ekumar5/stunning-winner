import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import RoomDetailsForm from '../../organisms/RoomDetailsForm/RoomDetailsForm';
import { RoomDetailsFormValues } from '../../organisms/RoomDetailsForm/RoomDetailsForm.props';
import FormTemplate from '../../templates/FormTemplate/FormTemplate';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const CreateRoomScreen = observer(() => {
  const { goBack } = useNavigation();
  const { t } = useTranslation('createRoom');
  const { addChatRoom, getUser } = useMst().chat;

  const onSubmit = (values: RoomDetailsFormValues) => {
    addChatRoom(values.roomName, values.members);
    goBack();
  };

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <FormTemplate<RoomDetailsFormValues>
        onSubmit={onSubmit}
        Component={RoomDetailsForm}
        getUser={getUser}
        mode="create"
      />
    </ScreenTemplate>
  );
});

export default CreateRoomScreen;
