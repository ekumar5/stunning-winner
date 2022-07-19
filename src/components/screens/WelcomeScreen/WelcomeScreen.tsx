import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../molecules/Header/Header';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';
import WelcomeTemplate from '../../templates/WelcomeTemplate/WelcomeTemplate';

const WelcomeScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation('welcome');

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <WelcomeTemplate
        onLogin={() => navigate('Login')}
        onRegister={() => navigate('Register')}
      />
    </ScreenTemplate>
  );
};

export default WelcomeScreen;
