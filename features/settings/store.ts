import { ThemeType } from "@features/theme/types";
import { changeLanguage } from "i18next";
import { Appearance } from "react-native";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "./defaults";
import { ClientSettings, Language, ServerSettings } from "./types";

const SETTINGS_STORAGE_ID = "settings-storage";

const storage = new MMKV({
  id: SETTINGS_STORAGE_ID,
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY ?? "1jdiafj93.",
});

interface SettingsStore extends ClientSettings, ServerSettings {
  setTheme: (theme: ThemeType) => void;
  setLanguage: (language: Language) => void;
  updateServerSettings: (settings: Partial<ServerSettings>) => void;
}

export const useSettingStore = create<SettingsStore>(
  //@ts-ignore FIXME: fix typescript error
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      /**
       * Change theme preference.
       * @param theme
       */
      setTheme: (theme) => {
        // set system color scheme
        Appearance.setColorScheme(theme as "dark" | "light" | null | undefined);

        set({ theme });
      },
      /**
       * change locally stored language and change i18next language.
       * @param language language code name , 'en', 'ar', etc
       */
      setLanguage: (language) => {
        // i18next language
        changeLanguage(language);
        // locally stored
        set({ language });
      },
      /**
       * TODO: write usefull description
       * @param settings
       */
      updateServerSettings: (settings) => {
        set((state) => ({ ...state, ...settings }));
      },
    }),
    {
      name: SETTINGS_STORAGE_ID,
      storage: createJSONStorage(() => ({
        setItem: (key, value) => storage.set(key, value),
        getItem: (key) => storage.getString(key),
        removeItem: (key) => storage.delete(key),
      })),
    }
  )
);
