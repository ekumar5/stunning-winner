import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { List } from 'react-native-paper';
import { useMst } from '../../../mobx/useMst';
import themes from '../../../theme';
import CheckboxItem from '../../molecules/CheckboxItem/CheckboxItem';
import Header from '../../molecules/Header/Header';
import SwitchItem from '../../molecules/SwitchItem/SwitchItem';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';

const ChangeThemeScreen = observer(() => {
  const { t } = useTranslation('changeTheme');
  const { dark, color, syncWithSystem, setTheme } = useMst().theme;
  const colorScheme = useColorScheme();
  const systemDark = colorScheme === 'dark';
  const darkMode = (syncWithSystem && systemDark) || (!syncWithSystem && dark);

  const renderThemeItem = (theme: string) => {
    const renderLeftIcon = () => (
      <List.Icon icon="circle" color={themes[theme].colors.primary} />
    );
    const onChangeTheme = () => setTheme({ color: theme });

    return (
      <CheckboxItem
        key={theme}
        testID={`change-theme-${theme}`}
        value={color === theme}
        title={t(theme)}
        onPress={onChangeTheme}
        left={renderLeftIcon}
      />
    );
  };

  const onToggleDark = () => setTheme({ dark: !dark });
  const onToggleSystem = () => setTheme({ syncWithSystem: !syncWithSystem });

  return (
    <ScreenTemplate>
      <Header title={t('headerTitle')} />
      <List.Section>
        <SwitchItem
          testID="sync-with-system"
          iconLeft="cached"
          value={syncWithSystem}
          onPress={onToggleSystem}
          title={t('syncWithSystem')}
        />
        <SwitchItem
          testID="dark-mode"
          iconLeft="theme-light-dark"
          disabled={syncWithSystem}
          value={darkMode}
          onPress={onToggleDark}
          title={t('darkMode')}
        />
        <List.Accordion
          left={() => <List.Icon icon="palette" />}
          title={t('theme')}
          testID="accordion"
          description={t(color)}>
          {Object.keys(themes).map(renderThemeItem)}
        </List.Accordion>
      </List.Section>
    </ScreenTemplate>
  );
});

export default ChangeThemeScreen;
