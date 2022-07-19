import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import hi from './hi.json';
import ro from './ro.json';
import ru from './ru.json';
import tr from './tr.json';
import uk from './uk.json';

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const locales = RNLocalize.getLocales();
    const best = RNLocalize.findBestAvailableLanguage(
      locales.map((l) => l.languageTag),
    );
    return best?.languageTag.split('-')[0];
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: __DEV__,
    resources: { en, es, fr, ru, hi, ro, tr, uk },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n;
