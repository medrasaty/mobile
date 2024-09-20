import { registerForPushNotificationsAsync } from "@/features/notifications/lib/push_notification";
import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

export default function usePushNotificationFeature() {
  /**
   *
   */
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const queryClient = useQueryClient();

  const registerDevice = () => {
    /**
     * handle registering the device in the server
     */
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((expoPushToken) => {})
      .catch((error) => console.error(error));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        /**
         * When a push notification is recieved,
         * this function will be fired, you can update the list of notifications , or invalidate
         */
        // manually set recieved notification to react query cache
        // queryClient.setQueryData(["notifications"], (oldNotifications) => {
        //     return [notification, ...oldNotifications]
        // })
        console.warn(notification.date);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        /**
         * if the user clicked on the push notification , this function will be fired
         */
        console.warn(response);
      });

    // Clear listeners when the app is closed
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}
