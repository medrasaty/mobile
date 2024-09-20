import NotificationCard from "@/features/notifications/components/NotificationCard";
import { Notification } from "@/types/notifications.type";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RefreshControl, SectionList, useWindowDimensions } from "react-native";
import { groupNotificationsByDate } from "../lib/utils";

export default function NotificationsList({
  data,
  isFetching,
  onRefresh,
}: {
  data: Notification[];
  isFetching: boolean;
  onRefresh: () => void;
}) {
  const { height } = useWindowDimensions();
  const { t } = useTranslation();
  const theme = useTheme();

  const EmptyComponent = useCallback(
    () => (
      <ThemedView
        style={{
          alignItems: "center",
          marginTop: height / 3,
        }}
      >
        <ThemedText>{t("empty_notifications")}</ThemedText>
      </ThemedView>
    ),
    [height, t]
  );

  const sectionsCallback = useCallback(groupNotificationsByDate, []);

  const sections = useMemo(
    () => sectionsCallback(data),
    [data, groupNotificationsByDate]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <ThemedView
        style={{ padding: 10, backgroundColor: theme.colors.surface }}
      >
        <ThemedText variant="titleLarge">{section.title}</ThemedText>
      </ThemedView>
    ),
    [theme.colors.surface]
  );

  const renderItem = useCallback(
    ({ item }: { item: Notification }) => (
      <NotificationCard key={item.id} notification={item} />
    ),
    []
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListEmptyComponent={EmptyComponent}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={true}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
    />
  );
}
