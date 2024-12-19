import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerSettings } from "./types";
import * as Burnt from "burnt";
import { SQKeys } from "./keys";
import { useSettingStore } from "./store";
import { updateServerSettingsRequest } from "./requests";

export default function useServerSettingsMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();
  const updateServerSettings = useSettingStore(
    (state) => state.updateServerSettings
  );

  return useMutation({
    mutationFn: async (settings: Partial<ServerSettings>) =>
      updateServerSettingsRequest(client, settings),

    onMutate: (settings) => {
      /**
       * Optimistically update preferecnes query and zustand store
       */
      qc.cancelQueries({ queryKey: SQKeys.all });
      const prevSettings = qc.getQueryData(SQKeys.all);
      qc.setQueryData(SQKeys.all, (oldSettings: ServerSettings | undefined) => {
        if (!oldSettings) return settings;
        // Merge both
        return { ...oldSettings, ...settings };
      });
      updateServerSettings(settings);

      return { prevSettings };
    },
    onSuccess: () => {
      // show success message
      Burnt.toast({
        title: "update settings success",
        haptic: "success",
      });
    },
    onError: (_error, _variables, context) => {
      // rollback to previous settings
      console.log(_error);

      Burnt.toast({
        title: "update settings failed",
        haptic: "error",
      });
      qc.setQueryData(SQKeys.all, context?.prevSettings);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: SQKeys.all });
    },
  });
}
