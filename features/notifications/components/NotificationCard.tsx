import View from "@/components/styled/View";
import useAuthClient from "@/hooks/useAuthClient";
import { Notification } from "@/types/notifications.type";
import { useEffect } from "react";
import { ViewProps } from "react-native";
import { Card, Text } from "react-native-paper";

export default function NotificationCard({
  notification,
}: { notification: Notification } & ViewProps) {
  const client = useAuthClient();
  useEffect(() => {
    // update notification is_read to true when notification is viewd
    client.patch(`/notifications/notifications/${notification.id}/`, {
      is_read: true,
    });
  });

  return (
    <Card elevation={0} style={{ padding: 12 }}>
      <View>
        <Text>{notification.message}</Text>
      </View>
    </Card>
  );
}
