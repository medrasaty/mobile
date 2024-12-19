import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServerSettings } from "./requests";
import useAuthClient from "@/hooks/useAuthClient";
import { SQKeys } from "./keys";
import { useSettingStore } from "./store";
import { ServerSettings, SettingsType } from "./types";
import { useServerSettingsQuery } from "./queries";
import useServerSettingsMutation from "./mutations";

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

export const useSettings = () => {
  const {
    data: serverSettings,
    status,
    isRefetching,
  } = useServerSettingsQuery();
  const { mutate: updateSettings } = useServerSettingsMutation();
  return {
    serverSettings,
    status,
    isRefetching,
    updateSettings,
  };
};
