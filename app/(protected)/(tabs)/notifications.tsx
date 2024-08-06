import { Container } from "@/components/styled";
import useNotifications from "@/hooks/notifications/useNotifications";
import { FlashList } from "@shopify/flash-list";
import { ViewProps } from "react-native";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { Notification } from "@/definitions/notifications.type";
import View from "@/components/styled/View";
import { SafeAreaView } from "@/components/styled/View";
import NotificationCard from "@/components/NotificationCard";

export default function HomePage() {
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
