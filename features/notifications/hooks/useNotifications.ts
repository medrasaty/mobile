import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../lib/requests";
import { useState } from "react";

type useNotificationsParams = {
  is_read?: boolean;
};

export default function useNotifications(params: useNotificationsParams = {}) {
  /**
   * Return list of Notifications for the authenticated user.
   */
  const client = useAuthClient();

  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await getNotifications(client, params),
  });
}

export function useUnreadNotificationsCount() {
  /**
   * return the number of unread notifications, if notifications are not yet loaded , return null
   */

  const q = useNotifications({ is_read: false });

  if (q.isLoading || q.isError) return null;

  return q.data?.length;
}
