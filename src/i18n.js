import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localeDetector from 'i18next-browser-languagedetector'
import en from '../public/locales/en.json'
import pt from '../public/locales/pt.json'

const resources = {
  en: {
    translation: en
  },
  'pt-BR': {
    translation: pt
  }
}

i18n
  .use(initReactI18next)
  .use(localeDetector)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator']
    }
  })

export default i18n
