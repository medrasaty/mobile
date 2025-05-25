import useAuthClient from "@/hooks/useAuthClient";
import { Notification } from "@/types/notifications.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { readAllNotifications, readNotification } from "../lib/requests";
import useNotifications from "./useNotifications";

function ReadNotificationMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: Notification["id"]) =>
      readNotification(client, notificationId),
    onMutate: (notificationId: Notification["id"]) => {
      /**
       * Optimistically set is_read to true for given notificationId
       */
      queryClient.setQueryData(
        ["notifications"],
        (notification: Notification) => {
          if ((notification.id = notificationId)) {
            return {
              ...notification,
              is_read: true,
            };
          }
          return notification;
        }
      );
    },
  });
}

/**
 * A custom hook that provides a mutation to mark all unread notifications as read.
 *
 * When the mutation is called, it will optimistically update the notifications in the cache
 * by setting `is_read` to `true` for all of them.
 *
 * @returns A `useMutation` result object with a single function `mutate` that calls the mutation.
 */
export default function useReadAllNotificationsMutation() {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => readAllNotifications(client),
    onMutate: () => {
      queryClient.setQueryData(["notifications"], (old: Notification[]) => {
        if (old) {
          return old.map((notification) => ({
            ...notification,
            is_read: true,
          }));
        }
        return old;
      });
    },
  });
}

/**
 * When the user navigates away from the screen, mark all unread notifications as read
 * This is done by calling the `readAllNotifications` mutation and passing the current data
 * as a dependency to the `useFocusEffect` hook. This ensures that the mutation is only
 * called when the screen is being navigated away from, and not when the data changes.
 */
export function useReadAllNotificationEffect() {
  /**
   * read all notification when screen lose focus
   */
  const { mutate: readAllNotifications } = useReadAllNotificationsMutation();
  const { data } = useNotifications();

  // Avoid unnecessary reads if all notifications are read
  const shouldRead = useMemo(
    () => data?.some((notification) => !notification.is_read),
    [data]
  );

  useFocusEffect(
    useCallback(() => {
      if (shouldRead) {
        return () => readAllNotifications();
      }
    }, [data])
  );
}
