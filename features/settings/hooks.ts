import { useStorageState } from "@/hooks/useStorageState";
import { useState, useEffect } from "react";
import { LocalStorageKeys as Local } from "@/lib/localstorage";
import { DEFAULT_SETTINGS } from "./defaults";
import { useSettingsStore } from "./store";
import { parseSettings } from "./utils";
import { SettingsType } from "./types";

/**
 * Load settings from local storage, set default settings if loaded settings are empty ( first time run the app or has deleted all app data )
 */

type useLoadSettingsAsyncHook = [loaded: boolean, settings: SettingsType];

export function useLoadSettingsAsync(): useLoadSettingsAsyncHook {
  const [[isLoading, settings], setSettings] = useStorageState(Local.settings);
  const setSettingStore = useSettingsStore((state) => state.setSettingStore);

  // check if settings are empty
  if (!settings && !isLoading) {
    // set default settings
    setSettings(JSON.stringify(DEFAULT_SETTINGS));
  }

  // set global settings store value
  useEffect(() => {
    setSettingStore(parseSettings(settings));
  }, [isLoading, settings]);

  return [!isLoading, parseSettings(settings)];
}

export function useUpdateSettings() {
  const [[_isLoading, localSettings], setSettings] = useStorageState(
    Local.settings
  );
  const setSettingStore = useSettingsStore((state) => state.setSettingStore);
  const settingsStore = useSettingsStore((state) => state.settings);
  const update = (settings: SettingsType) => {
    // update both,  global store and local store after mergin them
    setSettingStore({ ...settingsStore, ...settings });
    setSettings(JSON.stringify({ ...settingsStore, ...settings }));
  };

  return update;
}
