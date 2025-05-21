import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getNotifications } from "../lib/requests";

type useNotificationsParams = {
  is_read?: boolean;
};

import { notificationsKeys } from "../keys";

export default function useNotifications(params: useNotificationsParams = {}) {
  /**
   * return all notifications for active client
   */
  return useQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: async () => await getNotifications(params),
  });
}

export function useUnreadNotificationsCount() {
  /**
   * return the number of unread notifications, if notifications are not yet loaded , return null
   */

  const [count, setCount] = useState(0);

  const q = useNotifications();

  useEffect(() => {
    if (q.isLoading || q.isError) setCount(0);

    if (q.data) {
      // Calculate unread notification count
      const unreadNotifications = q.data?.filter(
        (notification) => !notification.is_read
      );

      setCount(unreadNotifications.length);
    }
  }, [q.data]);

  return count;
}
