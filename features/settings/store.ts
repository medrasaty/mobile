import { create } from "zustand";
import { ClientSettings } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "settings-storage",
});

type SettingsStore = {
  settings: ClientSettings;
  setSettingStore: (settings: ClientSettings) => void;
};

export const useLocalSettingsStore = create<SettingsStore>((set) => ({
  settings: DEFAULT_SETTINGS,
  setSettingStore: (settings) => {
    // update current settings
    // update local settings ( use storage state )
    set({ settings });
  },
}));
