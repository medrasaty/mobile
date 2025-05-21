import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Appbar, Divider, List } from "react-native-paper";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";

import Page from "@/components/Page";
import FilterOptionsView from "@/components/FilterOptionsView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
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
import { Notification, NotificationType } from "@/types/notifications.type";
import { groupNotificationsByDate } from "@/features/notifications/lib/utils";
import useFilterOptions from "@/hooks/useFilterOptions";
import View from "@components/styled/View";

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
  return isSearch ? <SearchContextbar /> : <OptionAppbar />;
};

/**
 * Standard app bar with search and options actions
 */
export const OptionAppbar = () => {
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
      
      <Sheet
        ref={sheetRef}
        snapPoints={["25%"]}
        index={0}
      >
        <List.Item
          title={t("Mark all as read")}
          left={props => <List.Icon {...props} icon="check-all" />}
          onPress={() => {
            // Implement mark all as read functionality
            sheetRef.current?.close();
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
  const theme = { colors: { surface: "#f5f5f5" } }; // Use actual theme when available
  
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

  // Group notifications by date
  const sections = useMemo(() => 
    groupNotificationsByDate(data ?? []),
    [data]
  );

  // Filter notifications based on selected filter
  const filteredNotifications = useMemo(() => {
    if (!data) return [];
    if (currentFilter === "ALL") return data;
    return data.filter(
      (notification) => notification.notification.type === currentFilter
    );
  }, [data, currentFilter]);

  // Render section headers
  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={{ padding: 10, backgroundColor: theme.colors.surface }}>
      <ThemedText variant="titleLarge">{section.title}</ThemedText>
    </View>
  );

  // Filter options component
  const renderFilterOptions = () => (
    <FilterOptionsView
      filterOptions={options}
      currentFilter={currentFilter}
      onFilterChange={onFilterChange}
    />
  );

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationCard notification={item} />}
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
