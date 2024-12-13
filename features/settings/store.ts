import { create } from "zustand";
import { SettingsType } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";
type SettingsStore = {
  settings: SettingsType;
  setSettingStore: (settings: SettingsType) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: DEFAULT_SETTINGS,
  setSettingStore: (settings) => {
    // update current settings
    // update local settings ( use storage state )
    set({ settings });
  },
}));
