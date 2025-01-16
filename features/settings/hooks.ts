import { useServerSettingsQuery } from "./queries";
import useServerSettingsMutation from "./mutations";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { ServerSettings } from "./types";
import { DEFAULT_SERVER_SETTINGS, DEFAULT_SETTINGS } from "./defaults";

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
}

/**
 * Main interface for interfacting with settings in the system.
 * @returns
 */
export const useSettings = () => {
  const {
    data: serverSettings,
    status,
    isRefetching,
  } = useServerSettingsQuery();
  const { mutate: updateServerSettings, isPending: isUpdating } =
    useServerSettingsMutation();

  return {
    serverSettings,
    status,
    isRefetching,
    updateServerSettings,
    isUpdating,
  };
};
