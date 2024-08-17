import useAuthClient from "@/hooks/useAuthClient";
import { Notification } from "@/types/notifications.type";
import { useQuery } from "@tanstack/react-query";

export default function useNotifications() {
  const client = useAuthClient();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<Notification[]> => {
      const response = await client.get("/notifications/notifications/");
      return response.data;
    },
  });
}
