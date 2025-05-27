import { registerForPushNotificationsAsync } from "@/features/notifications/lib/push_notification";
import { useAuthSession } from "@features/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import * as Device from "expo-device";
import { Platform } from "react-native";

import { getDeviceInfo } from "../lib/utils";
import { registerDevice } from "../lib/requests";
import { useSettingStore } from "@features/settings/store";
import { usePushNotificationStore } from "../store";
import { notificationsKeys } from "../keys";

// Configure notification handler with high priority and proper display options
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true, // Required for backward compatibility
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function usePushNotificationFeature() {
  /**
   *
   */
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  const qc = useQueryClient();
  const user = useAuthSession((state) => state.session?.user);
  const setting_push_notification = useSettingStore(
    (state) => state.push_notification
  );
  const isRegistered = usePushNotificationStore((state) => state.isRegistered);
  const reset = usePushNotificationStore((state) => state.reset);

  const handleRegisterDevice = async () => {
    /**
     * handle registering the device in the server
     */
    if (!user) return;

    const expo_token = await Notifications.getExpoPushTokenAsync();
    if (!expo_token) return;

    // get device info
    const deviceInfo = await getDeviceInfo();

    try {
      await registerDevice(deviceInfo, expo_token.data);
    } catch (error) {
      console.error("Failed to register device:", error);
      return;
    }
  };

  useEffect(() => {
    // Don't run on emulator/simulator
    if (Device.isDevice === false) {
      return;
    }

    if (!setting_push_notification) {
      // if push notifications are disabled in settings, don't register the device
      reset();
      return;
    }

    // Create notification channel for Android with high importance
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.HIGH,
        enableVibrate: true,
        enableLights: true,
        lightColor: '#FF231F7C',
        vibrationPattern: [0, 250, 250, 250],
        showBadge: true,
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      });
    }

    // only register if not registered yet.
    if (!isRegistered) {
      handleRegisterDevice();
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        /**
         * When a push notification is recieved,
         * this function will be fired, you can update the list of notifications,
         * or invalidate notification query
         */
        // Log the received notification
        console.log("Notification received:", notification);

        // Display a customized version of the notification
        Notifications.scheduleNotificationAsync({
          content: {
            title: notification.request.content.title,
            body: notification.request.content.body,
            data: notification.request.content.data,
            sound: 'default',
            badge: 1,
          },
          trigger: {
            seconds: 0,
            channelId: 'default',
          },
        });

        // Invalidate the notifications query to refresh the list
        qc.invalidateQueries({
          queryKey: notificationsKeys.all,
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        /**
         * if the user clicked on the push notification , this function will be fired
         */
        console.log("Notification response received:", response);
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
  }, [user?.id, setting_push_notification]);
}
