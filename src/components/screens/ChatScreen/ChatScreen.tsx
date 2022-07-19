import { useFocusEffect } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import humanizeDuration from 'humanize-duration';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ChatRoom } from '../../../mobx/chat';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';
import {
  AvatarImage,
  AvatarText,
  DurationText,
  EmptyContainer,
  EmptyIcon,
  RightContainer,
  StyledFabIcon,
  StyledItem,
  UnreadBadge,
} from './ChatScreen.styles';

const humanizeDurationOptions = {
  largest: 1,
  language: 'shortEn',
  maxDecimalPoints: 0,
  spacer: '',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
};

const ChatScreen = observer(() => {
  const { colors } = useTheme();
  const { t } = useTranslation('chat');
  const { navigate } = useNavigation();
  const { chatRooms, loading, loadRooms } = useMst().chat;

  useFocusEffect(
    useCallback(() => {
      loadRooms();
    }, []),
  );

  const listEmptyComponent = () => (
    <EmptyContainer>
      <EmptyIcon name="chat" size={150} color={colors.disabled} />
      <Text>{t('empty')}</Text>
    </EmptyContainer>
  );
  const renderChat = ({ item }: ListRenderItemInfo<ChatRoom>) => {
    const { recentMessage, unreadCount, name, avatar, id } = item;
    const duration =
      recentMessage?.createdAt &&
      humanizeDuration(
        +moment() - recentMessage.createdAt,
        humanizeDurationOptions,
      );

    const left = () =>
      avatar ? (
        <AvatarImage size={40} source={{ uri: avatar }} />
      ) : (
        <AvatarText
          label={name ? name.substring(0, 1).toUpperCase() : '?'}
          size={40}
        />
      );

    const right = () => {
      return (
        <RightContainer>
          <DurationText color={colors.placeholder}>{duration}</DurationText>
          {!!unreadCount && <UnreadBadge size={15}>{unreadCount}</UnreadBadge>}
        </RightContainer>
      );
    };

    const onPress = () => navigate('ChatDetails', { roomId: id });

    return (
      <StyledItem
        unreadCount={unreadCount}
        left={left}
        right={right}
        title={name}
        description={recentMessage?.text}
        titleNumberOfLines={1}
        descriptionNumberOfLines={1}
        onPress={onPress}
      />
    );
  };

  const refreshControl = (
    <RefreshControl refreshing={loading} onRefresh={loadRooms} />
  );

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <FlatList
        refreshControl={refreshControl}
        ListEmptyComponent={listEmptyComponent}
        data={chatRooms}
        renderItem={renderChat}
        showsVerticalScrollIndicator={false}
      />
      <StyledFabIcon
        icon="chat"
        label={t('startChat')}
        onPress={() => navigate('CreateRoom')}
      />
    </ScreenTemplate>
  );
});

export default ChatScreen;
