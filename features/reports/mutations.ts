import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { t } from "i18next";

export type SendReportData = {
  object_id: number | string;
  content_type: number | string;
  report_type: number | string;
};

export default function useSendReport() {
  const client = useAuthClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: SendReportData) => {
      return await client.post(`/reports/`, data);
    },
    onSuccess: () => {
      Burnt.alert({
        title: t("success_send_report"),
      });
    },
    onError: (error) => {
      Burnt.alert({
        title: t("failed_send_report"),
      });
      // To be cached by log reporting systems
      console.error(error);
    },
  });
}
