import { useQuery } from "@tanstack/react-query";
import useAuthClient from "../useAuthClient";
import { Notification } from "@/definitions/notifications.type";

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
