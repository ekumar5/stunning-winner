import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import Button from '../../atoms/Button/Button';
import { WelcomeTemplateProps } from './WelcomeTemplate.props';
import { styles } from './WelcomeTemplate.styles';

const WelcomeTemplate = ({
  imageUrl,
  onRegister,
  onLogin,
}: WelcomeTemplateProps) => {
  const { t } = useTranslation('welcome');

  return (
    <View style={styles.container}>
      <View>
        <FastImage style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.title} testID="welcome">
          {t('title')}
        </Text>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
      </View>
      <View>
        <Button testID="register" onPress={onRegister} style={styles.button}>
          {t('registerButton')}
        </Button>
        <Button onPress={onLogin} mode="text" style={styles.button}>
          {t('loginButton')}
        </Button>
      </View>
    </View>
  );
};

WelcomeTemplate.defaultProps = {
  imageUrl: 'https://picsum.photos/1600/1600',
};

export default WelcomeTemplate;
