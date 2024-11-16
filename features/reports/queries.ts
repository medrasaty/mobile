import useAuthClient from "@/hooks/useAuthClient";
import { PaginatedResponse } from "@/types/requests";
import { useQuery } from "@tanstack/react-query";
import { ReportType } from "./types";

export default function useReportTypes(contentTypeId: number) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["report_types", contentTypeId],
    queryFn: async () => {
      const res = await client.get<PaginatedResponse<ReportType>>(
        `/report_types/`,
        {
          params: {
            content_type: contentTypeId,
          },
        }
      );
      return res.data.results;
    },
  });
}
