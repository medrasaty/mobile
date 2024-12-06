import { create } from "zustand";
type SettingsStore = {
    theme: "dark" | "light" | "system";
};

export const useSettingsStore = create<SettingsStore>((set) => ({
    theme: "system" 
})
