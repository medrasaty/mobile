import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl } from "react-native";
import { Appbar, List } from "react-native-paper";

import EmptyView from "@/components/EmptyList";
import ErrorView from "@/components/ErrorView";
import FilterOptionsView from "@/components/FilterOptionsView";
import Page from "@/components/Page";
import Sheet, { useSheetRef } from "@/components/Sheet";

import { AppBar } from "@/features/navigation/components/AppBar";

import NotificationCard from "@/features/notifications/components/NotificationCard";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import { useReadAllNotificationEffect } from "@/features/notifications/hooks/useReadNotification";
import useFilterOptions from "@/hooks/useFilterOptions";
import { path } from "@/lib/routing";
import { Notification, NotificationType } from "@/types/notifications.type";
import View from "@components/styled/View";
import { router } from "expo-router";

/**
 * Main screen for displaying and managing notifications
 */
const MainNotificationScreen = () => {
  useReadAllNotificationEffect();

  return (
    <Page>
      <NotificationAppbar />
      <NotificationsContent />
    </Page>
  );
};

/**
 * Conditional app bar that switches between search and options mode
 */
export const NotificationAppbar = () => {
  return <NotificationsActionAppbar />;
};

/**
 * Standard app bar with search and options actions
 */
export const NotificationsActionAppbar = () => {
  const { t } = useTranslation();
  const sheetRef = useSheetRef();

  return (
    <>
      <AppBar backAction={false} title={t("Notification")}>
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => sheetRef.current?.expand()}
        />
      </AppBar>
      <Sheet ref={sheetRef}>
        <List.Item
          title={t("notification.settings")}
          left={(props) => <List.Icon {...props} icon="settings" />}
          onPress={() => {
            sheetRef.current?.close();
            router.push(path.settings.notifications);
          }}
        />
      </Sheet>
    </>
  );
};

/**
 * Content component for displaying notifications with filtering
 */
export const NotificationsContent = () => {
  const { t } = useTranslation();

  const { isLoading, isRefetching, refetch, isError, error, data } =
    useNotifications();

  // Define filter options
  const { options, currentFilter, onFilterChange } = useFilterOptions([
    { label: t("all"), value: "ALL" },
    { label: t("questions"), value: NotificationType.Question },
    { label: t("answers"), value: NotificationType.Answer },
    { label: t("replies"), value: NotificationType.Reply },
  ]);

  // Memoized render callbacks
  const renderFilterOptions = useCallback(
    () => (
      <FilterOptionsView
        filterOptions={options}
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />
    ),
    [options, currentFilter, onFilterChange]
  );

  const renderItem = useCallback(
    ({ item }: { item: Notification }) => (
      <NotificationCard notification={item} />
    ),
    []
  );

  // Filter notifications based on selected filter
  const filteredNotifications = useMemo(() => {
    if (!data) return [];
    if (currentFilter === "ALL") return data;
    return data.filter(
      (notification) => notification.notification.type === currentFilter
    );
  }, [data, currentFilter]);

  // Show loading state
  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        {renderFilterOptions()}
        <EmptyView
          message={t("Loading...")}
          icon="loading"
          iconSize={40}
          fullScreen={true}
        />
      </View>
    );
  }

  // Show error state
  if (isError) {
    return (
      <View style={{ flex: 1 }}>
        {renderFilterOptions()}
        <ErrorView error={error} onRetry={refetch} />
      </View>
    );
  }

  // Show empty state
  if (data?.length === 0 || filteredNotifications.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        {renderFilterOptions()}
        <EmptyView
          message={t("No notifications")}
          secondaryMessage={t("You don't have any notifications yet")}
          icon="bell-off-outline"
          iconSize={40}
          fullScreen={true}
          padding={24}
        />
      </View>
    );
  }

  // Show notification list
  return (
    <View style={{ flex: 1 }}>
      {renderFilterOptions()}
      <FlashList
        data={filteredNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={120}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </View>
  );
};

export default MainNotificationScreen;
