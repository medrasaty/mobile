import View from "@/components/styled/View";
import useAuthClient from "@/hooks/useAuthClient";
import { Notification } from "@/types/notifications.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "axios";
import { ViewProps } from "react-native";
import { Card, Text } from "react-native-paper";
import { containerMargins } from "@/constants/styels";
import { ThemedText } from "@/components/ThemedText";

export default function NotificationCard({
  notification,
}: { notification: Notification } & ViewProps) {
  return (
    <Card
      elevation={0}
      style={{
        padding: 12,
        ...containerMargins,
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <ThemedText variant="titleMedium">
        {notification.notification.title}
      </ThemedText>
      <ThemedText variant="bodySmall">
        {notification.notification.body}
      </ThemedText>
    </Card>
  );
}
