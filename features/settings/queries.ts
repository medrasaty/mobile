import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getServerSettings } from "./requests";

export function useServerSettingsQuery() {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["preferecnes"],
    queryFn: async () => getServerSettings(client),
  });
}
