import { registerForPushNotificationsAsync } from '@/features/notifications/lib/push_notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import useAuthClient from './useAuthClient';

const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  useEffect(() => {
    // send expo push token to server once you have it 
    // ...
    if (expoPushToken) {

    }
  }, [expoPushToken]);

  return { expoPushToken, notification };
}


export const NotificationMutation = () => {
    const client = useAuthClient()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (expoPushToken) => {
            client.post('/notifications/device/', { expoPushToken })
        }
    })

}

export default usePushNotifications;
