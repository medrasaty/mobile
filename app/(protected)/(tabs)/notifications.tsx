import NotificationCard from "@/features/notifications/components/NotificationCard";
import { Container } from "@/components/styled";
import View, { SafeAreaView } from "@/components/styled/View";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import { Notification } from "@/types/notifications.type";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import React from "react";
import { Button } from "react-native-paper";

import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { isDevice } from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Text>Your Expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      >
        send push notification
      </Button>
    </View>
  );
}
export function HomePage() {
  return (
    <SafeAreaView>
      <Container>
        <NotificationPage />
      </Container>
    </SafeAreaView>
  );
}

function NotificationPage() {
  const q = useNotifications();

  return (
    <>
      {q.isFetching || q.isError ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {q.isFetching && <ActivityIndicator />}
          {q.isError && <Text>solo</Text>}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {q.data && <NotificationsList data={q.data} />}
        </View>
      )}
    </>
  );
}

function NotificationsList({ data }: { data: Notification[] }) {
  const EmptyComponent = () => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>ستظهر الاشعارات في هذا المكان.</Text>
    </View>
  );

  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }) => <NotificationCard notification={item} />}
      ListEmptyComponent={EmptyComponent}
      estimatedItemSize={200}
      overScrollMode="never"
    />
  );
}
