import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import * as Burnt from "burnt";
import { ServerSettings } from "./types";
import {SQKeys} from "./keys";

export default function useServerPreferencesMutation() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: ServerSettings) => {
      // update server settings ( preferecnes )
      return await client.patch(`/preferecnes/`, preferences);
    },

    onMutate: (preferecnes) {
        /**
         * Optimistically update preferecnes
         */
        qc.cancelQueries({ queryKey:  SQKeys.all })

    },
    onSuccess: () => {
        console.log("success");
        
    }
  });
}
