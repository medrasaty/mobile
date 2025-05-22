import React, { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Appbar, Divider, List, useTheme } from "react-native-paper";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";

import Page from "@/components/Page";
import FilterOptionsView from "@/components/FilterOptionsView";
import { ThemedView } from "@/components/ThemedView";
import EmptyView from "@/components/EmptyList";
import ErrorView from "@/components/ErrorView";
import Sheet, { useSheetRef } from "@/components/Sheet";

import { AppBar } from "@/features/navigation/components/AppBar";
import {
  SearchContextProvider,
  SearchContextbar,
  useSearchContext,
} from "@/contexts/SearchContext";

import { useReadAllNotificationEffect } from "@/features/notifications/hooks/useReadNotification";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import NotificationCard from "@/features/notifications/components/NotificationCard";
import { NotificationType, Notification } from "@/types/notifications.type";
import useFilterOptions from "@/hooks/useFilterOptions";
import { path } from "@/lib/routing";
import { router } from "expo-router";

/**
 * Main screen for displaying and managing notifications
 */
const MainNotificationScreen = () => {
  useReadAllNotificationEffect();

  return (
    <SearchContextProvider>
      <Page>
        <NotificationAppbar />
        <NotificationsContent />
      </Page>
    </SearchContextProvider>
  );
};

/**
 * Conditional app bar that switches between search and options mode
 */
export const NotificationAppbar = () => {
  const { isSearch } = useSearchContext();
  return isSearch ? <SearchContextbar /> : <NotificationsActionAppbar />;
};

/**
 * Standard app bar with search and options actions
 */
export const NotificationsActionAppbar = () => {
  const { t } = useTranslation();
  const { setIsSearch } = useSearchContext();
  const sheetRef = useSheetRef();

  return (
    <>
      <AppBar title={t("Notification")}>
        <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => sheetRef.current?.expand()}
        />
      </AppBar>
      <Sheet ref={sheetRef}>
        <List.Item
          title={t("notification.settings")}
          left={props => <List.Icon {...props} icon="settings" />}
          onPress={() => {
            sheetRef.current?.close();
            router.push(path.settings.notifications)
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
  const theme = useTheme();

  const {
    isLoading,
    isRefetching,
    refetch,
    isError,
    error,
    data,
  } = useNotifications();

  // Define filter options
  const { options, currentFilter, onFilterChange } = useFilterOptions([
    { label: t("all"), value: "ALL" },
    { label: t("questions"), value: NotificationType.Question },
    { label: t("answers"), value: NotificationType.Answer },
    { label: t("replies"), value: NotificationType.Reply },
  ]);

  // Memoized render callbacks
  const renderFilterOptions = useCallback(() => (
    <FilterOptionsView
      filterOptions={options}
      currentFilter={currentFilter}
      onFilterChange={onFilterChange}
    />
  ), [options, currentFilter, onFilterChange]);

  const renderItem = useCallback(
    ({ item }: { item: Notification }) => <NotificationCard notification={item} />
    , []
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
      <ThemedView style={{ flex: 1 }}>
        {renderFilterOptions()}
        <EmptyView
          message={t("Loading...")}
          icon="loading"
          iconSize={40}
          fullScreen={true}
        />
      </ThemedView>
    );
  }

  // Show error state
  if (isError) {
    return (
      <ThemedView style={{ flex: 1 }}>
        {renderFilterOptions()}
        <ErrorView
          error={error}
          onRetry={refetch}
        />
      </ThemedView>
    );
  }

  // Show empty state
  if (data?.length === 0 || filteredNotifications.length === 0) {
    return (
      <ThemedView style={{ flex: 1 }}>
        {renderFilterOptions()}
        <EmptyView
          message={t("No notifications")}
          secondaryMessage={t("You don't have any notifications yet")}
          icon="bell-off-outline"
          iconSize={40}
          fullScreen={true}
          padding={24}
        />
      </ThemedView>
    );
  }

  // Show notification list
  return (
    <ThemedView style={{ flex: 1 }}>
      {renderFilterOptions()}
      <FlashList
        data={filteredNotifications}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        estimatedItemSize={120}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </ThemedView>
  );
};

export default MainNotificationScreen;
