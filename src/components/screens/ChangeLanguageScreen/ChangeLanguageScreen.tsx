import ISO6391 from 'iso-639-1';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { List } from 'react-native-paper';
import { useMst } from '../../../mobx/useMst';
import i18n from '../../../translations/i18n';
import CheckboxItem from '../../molecules/CheckboxItem/CheckboxItem';
import Header from '../../molecules/Header/Header';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';
import { AvatarText } from './ChangeLanguageScreen.styles';

const ChangeLanguageScreen = observer(() => {
  const { t } = useTranslation('changeLanguage');
  const { selected: selectedLanguage, setLanguage } = useMst().language;
  const [languages] = useState(() => {
    const supportedLanguages = Object.keys(i18n.services.resourceStore.data);
    const preferredLanguages = RNLocalize.getLocales()
      .map((l) => l.languageCode)
      .filter((l) => supportedLanguages.includes(l));
    return {
      preferred: preferredLanguages,
      other: supportedLanguages.filter((l) => !preferredLanguages.includes(l)),
    };
  });

  const showSubheaders = !!(
    languages.preferred.length && languages.other.length
  );
  const renderLanguage = (language: string) => {
    const onPress = () => setLanguage(language);
    return (
      <CheckboxItem
        key={language}
        testID={`change-language-${language}`}
        left={() => <AvatarText size={32} label={language.toUpperCase()} />}
        title={ISO6391.getNativeName(language)}
        description={ISO6391.getName(language)}
        value={selectedLanguage === language}
        onPress={onPress}
      />
    );
  };

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <ScrollView>
        {!!languages.preferred.length && (
          <List.Section>
            {showSubheaders && <List.Subheader>{t('local')}</List.Subheader>}
            {languages.preferred.map(renderLanguage)}
          </List.Section>
        )}
        <List.Section>
          {showSubheaders && <List.Subheader>{t('other')}</List.Subheader>}
          {languages.other.map(renderLanguage)}
        </List.Section>
      </ScrollView>
    </ScreenTemplate>
  );
});

export default ChangeLanguageScreen;
