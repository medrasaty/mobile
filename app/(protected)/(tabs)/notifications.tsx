import View from "@/components/styled/View";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import { NotificationType } from "@/types/notifications.type";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Appbar, Text, useTheme } from "react-native-paper";

import FilterOptionsView from "@/components/FilterOptionsView";
import { ThemedView } from "@/components/ThemedView";
import { AppBar } from "@/features/navigation/components/AppBar";
import { useReadAllNotificationEffect } from "@/features/notifications/hooks/useReadNotification";
import NotificationsList from "@/features/notifications/components/NotificationsList";
import Page from "@/components/Page";

export default function NotificationPage() {
  const { t } = useTranslation();
  useReadAllNotificationEffect();

  return (
    <>
      <AppBar title={t("Notification")}>
        <Appbar.Action
          icon={"dots-vertical"}
          onPress={() => alert("looking")}
        />
      </AppBar>
      <Page>
        <Notifications />
      </Page>
    </>
  );
}

function Notifications() {
  const {
    isFetching,
    isLoading,
    refetch,
    isError,
    filteredNotifications,
    setFilter,
    filter,
  } = useNotifications();
  const { t } = useTranslation();

  const filterOptions = useMemo(
    () => [
      { label: t("all"), value: "ALL" },
      { label: t("questions"), value: NotificationType.Question },
      { label: t("answers"), value: NotificationType.Answer },
      { label: t("replies"), value: NotificationType.Reply },
    ],
    []
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Must be wraped inside View*/}
      <ThemedView>
        <FilterOptionsView
          filterOptions={filterOptions}
          currentFilter={filter}
          // @ts-ignore
          onFilterChange={setFilter}
        />
      </ThemedView>

      {isLoading || isError ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoading && <ActivityIndicator />}
          {isError && <Text>Error loading notifications</Text>}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <NotificationsList
            isFetching={isFetching}
            onRefresh={() => refetch()}
            data={filteredNotifications}
          />
        </View>
      )}
    </ThemedView>
  );
}
