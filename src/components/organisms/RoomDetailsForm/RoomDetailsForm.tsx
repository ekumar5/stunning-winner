// @ts-ignore
import auth, { User } from '@react-native-firebase/auth';
import React, { useRef, useState } from 'react';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  composeValidators,
  requiredValidator,
} from '../../../utils/formValidators';
import Button from '../../atoms/Button/Button';
import Spacer from '../../atoms/Spacer/Spacer';
import FormInput from '../../molecules/FormInput/FormInput';
import { FormInputProps } from '../../molecules/FormInput/FormInput.props';
import FormList from '../../molecules/FormList/FormList';
import { RoomDetailsFormProps } from './RoomDetailsForm.props';
import {
  MembersList,
  MembersListHeading,
  StyledChip,
} from './RoomDetailsForm.styles';

const RoomDetailsForm = ({
  form,
  submitting,
  values,
  getUser,
  mode,
  chatRoom,
}: RoomDetailsFormProps) => {
  const { t } = useTranslation(mode === 'create' ? 'createRoom' : 'editRoom');
  const currentUser = auth().currentUser;
  const [members, setMembers] = useState<User[]>(
    mode === 'edit' && chatRoom ? chatRoom?.members : [currentUser],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<TextInput>(null);

  const addMemberValidator = composeValidators(
    (value: string) =>
      value?.toLowerCase().trim() === currentUser?.email
        ? t('errorOwnEmail')
        : undefined,
    (value: string) =>
      members
        .map((member) => member.email)
        .includes(value?.toLowerCase().trim())
        ? t('errorAlreadyAdded')
        : undefined,
  );

  const addMember = async () => {
    setLoading(true);

    const memberEmail = values.email?.toLowerCase().trim();
    const alreadyInList = members
      .map((member) => member.email)
      .includes(memberEmail);

    if (!!values.email && !alreadyInList) {
      const data = await getUser(memberEmail);
      if (data.length) {
        setMembers([...members, ...data]);
        form?.change('email', undefined);
      }
    }
    setLoading(false);
  };

  const renderMemberName = (user: User) => {
    const removeUser = () => {
      if (user.email === currentUser?.email) {
        return;
      }
      setMembers(members.filter((m) => m !== user));
    };

    return (
      <StyledChip key={`${user.uid}`} icon="account" onClose={removeUser}>
        {user.email}
      </StyledChip>
    );
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      pointerEvents={submitting ? 'none' : 'auto'}>
      <Spacer size={24} />
      <Field<string, FormInputProps>
        name="roomName"
        component={FormInput}
        label={t('roomName')}
        mode="outlined"
        returnKeyType={'next'}
        validate={requiredValidator}
        onSubmitEditing={() => emailRef.current?.focus()}
        initialValue={chatRoom?.name ?? ''}
      />
      <Field<string, FormInputProps>
        name="email"
        component={FormInput}
        label={t('selectPeople')}
        mode="outlined"
        autoCapitalize="none"
        textContentType="emailAddress"
        validate={addMemberValidator}
        errorOnChange
        ref={emailRef}
        onSubmitEditing={addMember}
      />
      <Button onPress={addMember} loading={loading}>
        {t('add')}
      </Button>
      <Spacer size={24} />
      {!!members.length && (
        <MembersListHeading>{t('people')}</MembersListHeading>
      )}
      <MembersList
        name="members"
        // @ts-ignore
        component={FormList}
        listData={members}
        renderItem={renderMemberName}
      />
      <Spacer size={24} />
      <Button onPress={form?.submit} disabled={members.length < 1}>
        {t('createRoom')}
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default RoomDetailsForm;
