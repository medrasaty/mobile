import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getNotifications } from "../lib/requests";

type useNotificationsParams = {
  is_read?: boolean;
};

import { NotificationType } from "@/types/notifications.type";
import { useMemo } from "react";

export default function useNotifications() {
  /**
   * return all notifications for active client
   */
  const client = useAuthClient();
  const [filter, setFilter] = useState<NotificationType | "ALL">("ALL");

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await getNotifications(client),
  });

  // filter notifications
  const filteredNotifications = useMemo(() => {
    if (!query.data) return [];
    if (filter === "ALL") return query.data;
    return query.data.filter(
      (notification) => notification.notification.type === filter
    );
  }, [query.data, filter]);

  return {
    ...query,
    filteredNotifications,
    setFilter,
    filter,
  };
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
