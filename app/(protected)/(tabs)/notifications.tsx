import { Container } from "@/components/styled";
import View, { SafeAreaView } from "@/components/styled/View";
import NotificationCard from "@/features/notifications/components/NotificationCard";
import useNotifications from "@/features/notifications/hooks/useNotifications";
import { Notification } from "@/types/notifications.type";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, Appbar, Divider, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { registerForPushNotificationsAsync } from "@/features/notifications/lib/push_notification";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AppBar } from "@/features/navigation/components/AppBar";
import { containerMargins } from "@/constants/styels";

export default function NotificationPage() {
  const { t } = useTranslation();

  return (
    <>
      <AppBar title={t("Notification")}>
        <Appbar.Action
          icon={"dots-vertical"}
          onPress={() => alert("looking")}
        />
      </AppBar>
      <Notifications />
    </>
  );
}

function Notifications() {
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
      // ItemSeparatorComponent={() => <Divider style={containerMargins} />}
      renderItem={({ item }) => <NotificationCard notification={item} />}
      ListEmptyComponent={EmptyComponent}
      estimatedItemSize={200}
      overScrollMode="never"
    />
  );
}
