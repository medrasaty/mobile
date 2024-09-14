import useAuthClient from "@/hooks/useAuthClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification } from "../lib/requests";
import { Notification } from "@/types/notifications.type";

function useReadNotification(notification: Notification) {
  /**
   * Send a request to the server to read the specified notification if
   * is_read is false , do nothing otherwise.
   *
   * @param {string} notification_id
   */
}

function ReadNotificationMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: Notification["id"]) =>
      readNotification(client, notificationId),
    onMutate: (notificationId: Notification["id"]) => {
      /**
       * Optimistically set is_read to true for notificationId
       */
      // TODO
    },
  });
}
