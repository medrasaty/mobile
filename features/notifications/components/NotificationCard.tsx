import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { containerMargins } from "@/constants/styels";
import { Notification, NotificationType } from "@/types/notifications.type";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { Card, IconButton, useTheme } from "react-native-paper";
import { parseNotificationRef } from "../lib/utils";
import { questionDetail } from "@/lib/routing";

const useNotificationStyle = (isRead: boolean) => {
  const theme = useTheme();
  return useMemo(
    () => ({
      backgroundColor: isRead
        ? theme.colors.surface
        : theme.colors.surfaceVariant,
    }),
    [isRead, theme.colors.surface, theme.colors.surfaceVariant]
  );
};

const NotificationCard: React.FC<
  { notification: Notification } & ViewProps
> = ({ notification, ...props }) => {
  const style = useNotificationStyle(notification.is_read);
  const router = useRouter();

  const handleNotificationPress = () => {
    const ref = parseNotificationRef(notification);
    router.push(
      questionDetail({
        questionId: ref.question,
        answerId: ref.answer ?? undefined,
        replyId: ref.reply ?? undefined,
      })
    );
  };

  return (
    <Card
      onPress={handleNotificationPress}
      elevation={0}
      mode="elevated"
      style={[styles.card, style]}
      {...props}
    >
      <ThemedView style={styles.contentLayout}>
        <NotificationTypeAvatar type={notification.notification.type} />
        <ThemedView style={styles.contentContainer}>
          <Title title={notification.notification.title} />
          <Body body={notification.notification.body} />
        </ThemedView>
      </ThemedView>
    </Card>
  );
};

const NotificationTypeAvatar: React.FC<{ type: NotificationType }> = ({
  type,
}) => {
  const iconSize = 30;
  const theme = useTheme();
  const iconColor = useMemo(() => {
    const colors = {
      [NotificationType.Question]: theme.colors.primary,
      [NotificationType.Answer]: theme.colors.primary,
      [NotificationType.Reply]: theme.colors.primary,
      [NotificationType.Other]: theme.colors.secondaryContainer,
    };
    return colors[type] || colors[NotificationType.Other];
  }, [type, theme.colors]);

  const renderIcon = useCallback(() => {
    if (type === NotificationType.Answer) {
      return (
        <MaterialIcons
          color={iconColor}
          name="question-answer"
          size={iconSize}
        />
      );
    }

    const iconMap = {
      [NotificationType.Question]: "crosshairs-question",
      [NotificationType.Reply]: "comment-text-outline",
      [NotificationType.Other]: "format-quote-close",
    };

    const iconName = iconMap[type] || iconMap[NotificationType.Other];

    return (
      <MaterialCommunityIcons
        // @ts-expect-error
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    );
  }, [type, iconColor, iconSize]);

  return <IconButton mode="contained" icon={renderIcon} size={iconSize} />;
};

const Title: React.FC<{ title: string }> = ({ title }) => (
  <ThemedText variant="titleMedium">{title}</ThemedText>
);

const Body: React.FC<{ body: string }> = ({ body }) => (
  <ThemedText variant="bodySmall">{body}</ThemedText>
);

const spacing = 10;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: spacing,
    marginBottom: spacing,
    ...containerMargins,
  },
  contentLayout: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  contentContainer: {
    flex: 1,
    gap: 16,
  },
});

export default NotificationCard;
