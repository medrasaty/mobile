import { registerForPushNotificationsAsync } from "@/features/notifications/lib/push_notification";
import { useAuthSession } from "@features/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import * as Device from "expo-device";

import { getDeviceInfo } from "../lib/utils";
import { registerDevice } from "../lib/requests";

export default function usePushNotificationFeature() {
  /**
   *
   */
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  const qc = useQueryClient();
  const user = useAuthSession((state) => state.session?.user);

  const handleRegisterDevice = async () => {
    /**
     * handle registering the device in the server
     */
    if (!user) return;

    const expo_token = await Notifications.getExpoPushTokenAsync();
    if (!expo_token) return;
   
    // get device id
    const deviceInfo = await getDeviceInfo()

    await registerDevice(deviceInfo, expo_token.data);

  };

  useEffect(() => {
    // Don't run on emulator/simulator
    if (Device.isDevice === false) {
      return;
    }

    handleRegisterDevice();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        /**
         * When a push notification is recieved,
         * this function will be fired, you can update the list of notifications , or invalidate notification query
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
  }, [user]);
}