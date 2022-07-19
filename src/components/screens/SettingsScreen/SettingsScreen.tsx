import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, List } from 'react-native-paper';
import { useMst } from '../../../mobx/useMst';
import Header from '../../molecules/Header/Header';
import Item from '../../molecules/Item/Item';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const SettingsScreen = observer(() => {
  const { t } = useTranslation('settings');
  const { navigate } = useNavigation();
  const rootStore = useMst();

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <List.Section>
        <List.Subheader>{t('appearance')}</List.Subheader>
        <Item
          testID="change-language"
          title={t('language')}
          iconLeft="earth"
          iconRight="chevron-right"
          onPress={() => navigate('ChangeLanguage')}
        />
        <Item
          testID="change-theme"
          title={t('theme')}
          iconLeft="brush"
          iconRight="chevron-right"
          onPress={() => navigate('ChangeTheme')}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>{t('profile')}</List.Subheader>
        <Item
          title={t('logOut')}
          onPress={rootStore.logout}
          loading={rootStore.user.loading}
        />
      </List.Section>
    </ScreenTemplate>
  );
});

export default SettingsScreen;
