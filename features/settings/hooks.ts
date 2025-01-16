import { useServerSettingsQuery } from "./queries";
import useServerSettingsMutation from "./mutations";
import { useSettingStore } from "./store";

/**
 * Main interface for interfacting with settings in the system.
 * @returns
 */
export const useSettings = () => {
  const { data, status, isRefetching } = useServerSettingsQuery();
  const settings = useSettingStore();
  const { mutate: updateServerSettings, isPending: isUpdating } =
    useServerSettingsMutation();

  return {
    settings,
    status,
    isRefetching,
    updateServerSettings,
    isUpdating,
  };
};
