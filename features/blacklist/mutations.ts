import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import * as Burnt from "burnt";
import { BlackListUser } from "./types";
import { unblockUser } from "./requests";
import { BlackListKyes } from "./queryKeys";

export default function useUnblockUserMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (username: BlackListUser["username"]) =>
      await unblockUser(client, username),
    onSuccess: (_data, username) => {
      // TODO: update blacklist users query
      // show success message
      qc.setQueriesData(
        { queryKey: BlackListKyes.all },
        (oldData: BlackListUser[] | undefined) => {
          if (!oldData) {
            return oldData;
          }
          return oldData.filter((u) => u.username !== username);
        }
      );

      Burnt.toast({
        title: "Success unblock user",
        haptic: "success",
      });
    },
    onError: () => {
      // show error message
      Burnt.toast({
        title: "Failed unblock user",
        haptic: "error",
      });
    },
  });
}
