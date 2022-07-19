import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useMst } from '../../../mobx/useMst';
import Button from '../../atoms/Button/Button';
import Spacer from '../../atoms/Spacer/Spacer';
import Header from '../../molecules/Header/Header';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';
import { styles } from './HomeScreen.styles';

const HomeScreen = observer(() => {
  const rootStore = useMst();
  const { navigate } = useNavigation();
  const { t } = useTranslation('home');

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <View style={styles.container}>
        <Spacer size={8} />
        <Button onPress={() => navigate('Settings')} testID="settings">
          {t('settingsButton')}
        </Button>
        <Spacer size={8} />
        <Button onPress={() => navigate('Chat')} testID="chat">
          {t('chatButton')}
        </Button>
        <Spacer size={8} />
        <Button
          onPress={rootStore.logout}
          loading={rootStore.user?.loading}
          testID="logout">
          {t('logoutButton')}
        </Button>
      </View>
    </ScreenTemplate>
  );
});

export default HomeScreen;
