import { Notification, NotificationRef } from "@/types/notifications.type";

export const groupNotificationsByDate = (notifications: Notification[]) => {
  const grouped: Record<string, Notification[]> = notifications.reduce(
    (acc, notification) => {
      const date = new Date(notification.created).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    },
    {} as Record<string, Notification[]>
  );

  return Object.entries(grouped).map(([date, items]) => ({
    title: date,
    data: items,
  }));
};

export const parseNotificationRef = (
  notification: Notification
): NotificationRef => {
  return JSON.parse(notification.notification.ref);
};
