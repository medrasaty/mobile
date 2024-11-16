import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import * as Burnt from "burnt";

export default function useSendReport() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (objectId: string, contentTypeId: number) => {
      // TODO: implement this request
    },
  });
}
