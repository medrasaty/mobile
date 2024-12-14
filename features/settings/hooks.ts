import { useStorageState } from "@/hooks/useStorageState";
import { useState, useEffect } from "react";
import { LocalStorageKeys as Local } from "@/lib/localstorage";
import { DEFAULT_SETTINGS } from "./defaults";
import { useLocalSettingsStore } from "./store";
import { parseClientSettings } from "./utils";
import { ClientSettings } from "./types";

/**
 * Load settings from local storage, set default settings if loaded settings are empty ( first time run the app or has deleted all app data )
 */

type useLoadSettingsAsyncHook = [loaded: boolean, settings: ClientSettings];

export function useLoadClientSettingsAsync(): useLoadSettingsAsyncHook {
  const [[isLoading, settings], setSettings] = useStorageState(Local.settings);
  const setSettingStore = useLocalSettingsStore(
    (state) => state.setSettingStore
  );

  // check if settings are empty
  if (!settings && !isLoading) {
    // set default settings
    setSettings(JSON.stringify(DEFAULT_SETTINGS));
  }

  // set global settings store value
  useEffect(() => {
    setSettingStore(parseClientSettings(settings));
  }, [isLoading, settings]);

  return [!isLoading, parseClientSettings(settings)];
}

export function useUpdateClientSettings() {
  /**
   * To make things simple, user can not update settings when offline
   * settings like display full name, email, username, gender are server side settings
   * while theme, language, are client side settings
   * it happend that all of them is stored in the backend,
   * I should not store client side settings in the backend
   * only server side settings will be stored in the backend
   *
   * after you seperated local settings and server settings, how can you handle both of them here ?
   * first: load client settings at launch time ( before hiding splash screen )
   * - how should you load server settings ?
   *     - why should you even load server settings ?
   *        - to prepopulate settings page with options.
   *        - to customize ( change UI ) of profile page. -- shoudl you ?
   *        - that is it
   *
   *
   *     - what is the solution to this problem ?
   *        - split settings into two catagories, client settings ( local settings ) and server settings
   *        - client settings will be loaded at launch time
   *        - server settings will be loaded "later when needed"
   *
   */
  const [[_isLoading, _localSettings], setSettings] = useStorageState(
    Local.settings
  );
  const setSettingStore = useLocalSettingsStore(
    (state) => state.setSettingStore
  );
  const settingsStore = useLocalSettingsStore((state) => state.settings);
  const update = (settings: ClientSettings) => {
    // update both,  global store and local store after mergin them
    const newSettings = { ...settingsStore, ...settings };
    setSettingStore(newSettings);
    setSettings(JSON.stringify(newSettings));
  };

  return update;
}
