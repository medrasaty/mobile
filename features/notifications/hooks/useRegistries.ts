import { Registry } from "@/types/notifications.type";
import { useQuery } from "@tanstack/react-query";
import useAuthClient from "../../../hooks/useAuthClient";

export function useRegistries() {
  const client = useAuthClient();

  const fetchRegistries = async (): Promise<Registry[]> => {
    const response = await client.get("/notifications/registry/");
    return response.data.results;
  };

  return useQuery({
    queryKey: ["questions", "registries"],
    queryFn: fetchRegistries,
  });
}
