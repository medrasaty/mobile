import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { HistoryKeys } from "./keys";
import { getHistory } from "./requests";

export default function useHistory(params: any = {}) {
  const client = useAuthClient();

  return useQuery({
    queryKey: HistoryKeys.withParams(params),
    queryFn: async () => await getHistory(client, params),
  });
}
