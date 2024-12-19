import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ar, en } from "./translations";
import { useSettingStore } from "@features/settings/store";

const STORE_LANGUAGE_KEY = "setting.lang";

const DEFAULT_LANGUAGE = "ar";

interface I18nLanguageDetectorModule {
  type: "languageDetector";
  init?(): void;
  detect(): string | readonly string[] | undefined;
  cacheUserLanguage?(lng: string): void;
}

export const LanguageDetector: I18nLanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},
  detect: () => {
    // return language code name ( use mmkv to get it from settings) )
    return "en";
  },
  cacheUserLanguage: (lng: string) => {
    // set language code name
    // TODO
  },
};

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      // get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          // if language was stored before , use thei language int heapp
          return callback(language);
        }
        // fall back to default
        return callback(DEFAULT_LANGUAGE);
      });
    } catch (error) {
      console.error("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      // Save a user's language choice in Async Storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.error(
        "Failed to store user's language choice to AsyncStorage.",
        error
      );
    }
  },
};

const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: DEFAULT_LANGUAGE,
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
