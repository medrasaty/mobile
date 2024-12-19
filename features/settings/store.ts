import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ClientSettings, Language, ServerSettings } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";
import { MMKV } from "react-native-mmkv";
import { ThemeType } from "@features/theme/types";

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
      setTheme: (theme) => {
        set({ theme });
      },
      setLanguage: (language) => {
        set({ language });
      },
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
