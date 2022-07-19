import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useMst } from '../mobx/useMst';
import i18n from '../translations/i18n';
import { ContainerProps } from './types';

const LanguageManager: React.FC<ContainerProps> = observer(({ children }) => {
  const selectedLanguage = useMst().language?.selected;
  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  return children;
});

export default LanguageManager;
