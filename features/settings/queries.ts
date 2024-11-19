import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getPreferences } from "./requests";

export function useServerPreferences() {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["preferecnes"],
    queryFn: async () => getPreferences(client),
  });
}
